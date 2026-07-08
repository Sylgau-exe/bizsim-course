#!/usr/bin/env node
/* PM League — complete QA suite.
   Run: node tests/qa.js   (requires: npm install jsdom --no-save)
   1. Extracts the simulation engine from public/lab/compete.html
   2. Rival ladder check (8 seeded seasons, passive player)
   3. Leader viability check (6 leadership styles, 5 seeds each)
   4. Virtual players: 6 bot personas playing FULL seasons through the real UI
      (jsdom) with ~20 invariant checks per round — the hallucination monitor.
   Exit code 0 = PASS, 1 = FAIL. */
const fs = require('fs'), path = require('path');
const HTML_PATH = path.join(__dirname, '..', 'public', 'lab', 'compete.html');
const HTML = fs.readFileSync(HTML_PATH, 'utf8');
const engineSrc = HTML.split('/*ENGINE-START*/')[1].split('/*ENGINE-END*/')[0];
const failures = [];
function fail(msg) { failures.push(msg); console.log('❌ ' + msg); }
function ok(msg) { console.log('✅ ' + msg); }

// ---------- 1+2: engine-level harnesses ----------
const E = {}; new Function('exports', engineSrc + `
  exports.makeLeague = makeLeague; exports.lockBaseline = lockBaseline; exports.leagueRound = leagueRound;
  exports.finalScore = finalScore; exports.EVENTS = EVENTS;`)(E);
function goodPlanRaw(P) { const g = id => P.plan.tasks.find(t => t.id === id);
  P.plan.resources.find(r => r.id === 'r6').availability = 100;
  g('qt1').start = 6; g('t3').alloc = 80; g('rt1').start = 5; g('rt2').start = 6;
  g('t4').start = 7; g('qt4').start = 12; g('qt3').start = 16;
  g('t5').start = 14; g('t6').start = 14; g('t6').dur = 2; g('t7').start = 16; g('t7').dur = 1;
  g('qt2').cut = true; g('qt5').start = 17; g('pt2').start = 17; g('ct2').start = 16; }
function engineSeason(seed, leader, deck, evChoices) {
  const G = E.makeLeague(seed); const P = G.player;
  if (leader) P.leader = leader;
  goodPlanRaw(P); E.lockBaseline(P); G.phase = 'execution';
  if (leader === 'coach') { const rt2 = P.plan.tasks.find(t => t.id === 'rt2'); P.progress['rt2'] = rt2.dur; }
  let guard = 0, r = 0;
  while (G.phase !== 'closing' && guard++ < 15) {
    E.leagueRound(G, deck[r % deck.length]); r++;
    if (G.pendingEvent && !G.eventResolved) { G.pendingEvent.options[evChoices[G.pendingEvent.round]].fx(G.player, G.week); G.eventResolved = true; }
  }
  return G;
}
console.log('\n━━━ 1. Rival ladder (8 seeds, passive player) ━━━');
{ const sums = {};
  for (let seed = 1; seed <= 8; seed++) {
    const G = E.makeLeague(seed * 7919); E.lockBaseline(G.player); G.phase = 'execution';
    let guard = 0;
    while (G.phase !== 'closing' && guard++ < 15) { E.leagueRound(G, 'none');
      if (G.pendingEvent && !G.eventResolved) { G.pendingEvent.options[1].fx(G.player, G.week); G.eventResolved = true; } }
    for (const T of G.teams) { const s = E.finalScore(T);
      for (const k of ['budget','schedule','delivery','quality','total']) if (!isFinite(s[k])) fail(`NaN score ${k} on ${T.id} seed ${seed}`);
      sums[T.id] = (sums[T.id] || 0) + s.total; } }
  const avg = Object.fromEntries(Object.entries(sums).map(([k, v]) => [k, Math.round(v / 8)]));
  console.log('   averages:', JSON.stringify(avg));
  if (avg.meridian < Math.max(avg.velocity, avg.corners, avg.granite)) fail('Meridian no longer the benchmark rival — rebalance needed');
  else ok('Meridian is the rival to beat (' + avg.meridian + ')');
  if (avg.you > avg.meridian) fail('Passive player beats Meridian — game is too easy');
  else ok('Passive play loses (' + avg.you + ') — skill matters'); }
console.log('\n━━━ 2. Leader viability (5 seeds each) ━━━');
{ const cfg = {
    commander: { deck:['overtime','teambuild'], ev:{1:1,2:1,3:0,4:0} },
    visionary: { deck:['lunch','quality'], ev:{1:1,2:0,3:1,4:1} },
    servant:   { deck:['quality','none'], ev:{1:1,2:0,3:1,4:1} },
    coach:     { deck:['quality','teambuild'], ev:{1:1,2:0,3:0,4:1} },
    diplomat:  { deck:['quality','lunch'], ev:{1:1,2:1,3:1,4:1} },
    pacesetter:{ deck:['overtime','teambuild'], ev:{1:1,2:0,3:1,4:0} } };
  for (const [L, c] of Object.entries(cfg)) { let tot = 0;
    for (let s = 1; s <= 5; s++) { const G = engineSeason(s * 104729, L, c.deck, c.ev); tot += E.finalScore(G.player).total; }
    const avg = Math.round(tot / 5);
    if (avg < 550) fail(`leader ${L} broken: avg ${avg} < 550`); else ok(`${L.padEnd(11)} avg ${avg}`); } }

// ---------- 3: virtual players through the real UI ----------
console.log('\n━━━ 3. Virtual players (full UI, 6 personas × 2 seeds) ━━━');
let JSDOM; try { ({ JSDOM } = require('jsdom')); } catch (e) { fail('jsdom not installed — run: npm install jsdom --no-save'); report(); }
const PERSONAS = {
  commander: { ev:{1:1,2:1,3:0,4:0}, deck:(T)=> T.morale<45?'teambuild':'overtime', stake:1, report:'accurate' },
  visionary: { ev:{1:0,2:1,3:1,4:1}, deck:(T,r)=> r%2?'quality':'lunch', stake:0, report:'plan' },
  servant:   { ev:{1:1,2:0,3:1,4:1}, deck:(T)=> T.morale<80?'teambuild':'quality', keepQt2:true, stake:0, report:'accurate' },
  coach:     { ev:{1:1,2:0,3:0,4:1}, deck:(T,r)=> r%2?'teambuild':'quality', stake:0, report:'accurate' },
  diplomat:  { ev:{1:1,2:1,3:1,4:2}, deck:(T,r)=> ['poach','lunch','quality'][r%3], stake:1, report:'plan' },
  pacesetter:{ ev:{1:2,2:2,3:2,4:0}, deck:()=>'overtime', midEdit:true, stake:2, report:'spin' } };
const issues = [];
function flag(tag, msg) { const k = tag + ': ' + msg; if (!issues.includes(k)) issues.push(k); }
function goodPlanUI(w) { const P = w.PML.player; const idx = id => P.plan.tasks.findIndex(t => t.id === id);
  const persona = PERSONAS[P.leader];
  P.plan.resources.find(r => r.id === 'r6').availability = 100;
  w.editTask(idx('qt1'),'start',6); w.editTask(idx('t3'),'alloc',80);
  w.editTask(idx('rt1'),'start',5); w.editTask(idx('rt2'),'start',6);
  w.editTask(idx('t4'),'start',7); w.editTask(idx('qt4'),'start',12); w.editTask(idx('qt3'),'start',16);
  w.editTask(idx('t5'),'start',14); w.editTask(idx('t6'),'start',14); w.editTask(idx('t6'),'dur',2);
  w.editTask(idx('t7'),'start',16); w.editTask(idx('t7'),'dur',1);
  if (!persona.keepQt2) w.editTask(idx('qt2'),'cut',true);
  w.editTask(idx('qt5'),'start',17); w.editTask(idx('pt2'),'start',17); w.editTask(idx('ct2'),'start',16); }
function invariants(w, tag) { const G = w.PML;
  for (const T of G.teams) {
    for (const k of ['spent','morale','quality','sponsorSat']) if (!isFinite(T[k])) flag(tag, `non-finite ${k} on ${T.id}`);
    if (T.morale < 0 || T.morale > 100.01) flag(tag, `morale out of range on ${T.id}`);
    if (T.isPlayer && (T.sponsorSat < -0.01 || T.sponsorSat > 100.01)) flag(tag, `player confidence unclamped: ${T.sponsorSat}`);
    if (T.quality < -0.01) flag(tag, `negative quality on ${T.id}`);
    if (T.spent < (T._ls || 0) - 0.01) flag(tag, `spent decreased on ${T.id}`); T._ls = T.spent;
    for (const t of T.plan.tasks) if ((T.progress[t.id] || 0) > t.dur + 0.05) flag(tag, `progress>dur on ${T.id}/${t.id}`);
    if (T.goLive && T.goLive !== T.doneWeek['t7']) flag(tag, `goLive mismatch on ${T.id}`);
    const s = w.eval(`finalScore(PML.teams.find(t=>t.id==="${T.id}"))`);
    for (const k of ['budget','schedule','delivery','quality','total']) if (!isFinite(s[k]) || s[k] < 0) flag(tag, `bad score ${k} on ${T.id}`);
    if ((T.leagueBonus || 0) > 70) flag(tag, `leagueBonus>70 on ${T.id}`); }
  const ranks = G.teams.map(T => T.lastRank).filter(x => x).sort();
  if (ranks.length === 5 && ranks.join(',') !== '1,2,3,4,5') flag(tag, 'rank set broken');
  if (G.week > 20) flag(tag, 'week > 20'); }
function popupCycle(w, tag) { for (const k of ['guide','charter','plan','reports','changes','standings','scout']) {
  try { w.openPopup(k); const m = w.document.querySelector('.modal');
    if (!m || m.innerHTML.length < 100) flag(tag, `popup ${k} empty`);
    if (/undefined|NaN|\[object Object\]/.test(m.textContent)) flag(tag, `popup ${k} shows undefined/NaN`);
    w.closePopup(); } catch (e) { flag(tag, `popup ${k} threw: ${e.message}`); } } }
function newGame() { return new Promise(res => {
  const dom = new JSDOM(HTML, { runScripts:'dangerously', url:'https://x.test/', pretendToBeVisual:true,
    beforeParse(win) { win.localStorage.clear(); win.localStorage.setItem('bsim_token','t');
      win.fetch = () => Promise.resolve({ json: () => Promise.resolve({ user: { is_admin:true } }) }); } });
  const w = dom.window; w.__errs = []; w.addEventListener('error', e => w.__errs.push(e.message));
  setTimeout(() => res(w), 250); }); }
async function playSeason(leader, seed) { const tag = leader + '/s' + seed; const w = await newGame();
  w.showInterstitial = cb => cb(); const persona = PERSONAS[leader];
  try { w.acceptCharter(); w.pickLeader(leader); w.PML.rngState = seed;
    w.openPopup('plan'); goodPlanUI(w); w.closePopup();
    w.doEndWeek();
    let r = 0, guard = 0;
    while (w.PML.phase !== 'closing' && guard++ < 25) {
      if (w.PML.pendingEvent && !w.PML.eventResolved) {
        if (!w.document.querySelector('.leader-back')) flag(tag, 'event scene not rendered');
        w.decide(persona.ev[w.PML.pendingEvent.round]); continue; }
      if (w.PML.pendingStakeId) {
        if (!w.document.querySelector('.leader-back')) flag(tag, 'stakeholder scene not rendered');
        w.stakeDecide(persona.stake || 0); continue; }
      if (w.PML.pendingReport) {
        w.doEndWeek();
        if (!w.document.querySelector('.modal')) flag(tag, 'report popup not rendered');
        w.sendReport(persona.report || 'accurate'); continue; }
      if (w.PML.player.ended) { w.doEndWeek(); continue; }
      w.doEndWeek(); if (w.PML.phase !== 'execution') continue;
      let t = persona.deck(w.PML.player, r); if (leader === 'diplomat' && t === 'overtime') t = 'lunch';
      w.runRoundWith(t); r++;
      if (persona.midEdit && r === 2) { const i = w.PML.player.plan.tasks.findIndex(x => x.id === 'qt3'); w.editTask(i, 'start', Math.max(w.PML.week + 1, 15)); }
      invariants(w, tag); if (r === 3) popupCycle(w, tag); }
    if (w.PML.phase !== 'closing') flag(tag, 'never reached closing');
    w.openPopup('final'); const m = w.document.querySelector('.modal');
    if (!m || !m.textContent.includes('What kind of PM were you')) flag(tag, 'verdict missing');
    if (w.localStorage.getItem('pml_save')) flag(tag, 'save not cleared at closing');
    if (w.__errs.length) flag(tag, 'JS errors: ' + w.__errs.join(' | '));
    const s = w.eval('finalScore(PML.player)');
    console.log(`   ${tag.padEnd(20)} total=${String(s.total).padStart(4)} ${s.grade} goLive=${w.PML.player.goLive}`);
  } catch (e) { flag(tag, 'CRASH: ' + e.message); } }
async function report() {
  console.log('\n━━━ RESULT ━━━');
  issues.forEach(i => fail(i));
  if (!issues.length) ok('virtual players: 0 invariant violations, 0 JS errors');
  if (failures.length) { console.log(`\n🔴 QA FAILED — ${failures.length} problem(s). Fix before sharing this build.`); process.exit(1); }
  console.log('\n🟢 QA PASSED — engine, balance and full-UI seasons all clean.'); process.exit(0); }
(async () => { for (const L of Object.keys(PERSONAS)) for (const seed of [11717, 424243]) await playSeason(L, seed); await report(); })();
