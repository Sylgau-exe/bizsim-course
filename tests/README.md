# PM League QA suite

Complete automated testing of `/public/lab/compete.html`: engine balance
(rival ladder + 6 leadership styles) and 12 full seasons played by virtual
players through the real UI, with an invariant monitor (~20 checks per round)
watching for hallucinations: NaN, impossible states, broken standings,
overbilling, missing UI, save corruption.

## How to trigger

**Automatic** — every push touching `public/lab/compete.html` runs the suite
on GitHub Actions (see the Actions tab; red ✗ = do not share that build).

**Locally / by Claude**
```
npm install jsdom --no-save
node tests/qa.cjs
```
Exit 0 = pass, 1 = fail (with the list of problems).

_CI verified: first automated run triggered July 8, 2026._
