// api/pmo.js — consolidated R&D port of Casestudypmo's state/auth/admin endpoints
// (single function to stay under the Vercel function limit; ?fn=state|auth|admin)
// Isolated tables: rd_pmo_state / rd_pmo_users / rd_pmo_activity_log
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.POSTGRES_URL);
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin2026';

function cors(res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-User-Name, X-Admin-Token');
}

let ready = false;
async function ensureTables() {
    if (ready) return;
    await sql`CREATE TABLE IF NOT EXISTS rd_pmo_state (
        tenant_id VARCHAR(120) PRIMARY KEY,
        team_display_name VARCHAR(255),
        team_password VARCHAR(255),
        projects JSONB DEFAULT '[]',
        people JSONB DEFAULT '[]',
        assignments JSONB DEFAULT '{}',
        triage_items JSONB DEFAULT '[]',
        criteria_weights JSONB DEFAULT '{}',
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_by VARCHAR(255)
    )`;
    await sql`CREATE TABLE IF NOT EXISTS rd_pmo_users (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(120), last_name VARCHAR(120),
        email VARCHAR(255) UNIQUE, team_id VARCHAR(120),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;
    await sql`CREATE TABLE IF NOT EXISTS rd_pmo_activity_log (
        id SERIAL PRIMARY KEY, tenant_id VARCHAR(120), action VARCHAR(120),
        details JSONB, user_name VARCHAR(255), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;
    const teams = await sql`SELECT COUNT(*) as cnt FROM rd_pmo_state`;
    if (parseInt(teams[0].cnt) === 0) {
        for (const [tid, name] of [['team-alpha','Alpha'],['team-bravo','Bravo'],['team-charlie','Charlie'],['team-delta','Delta']]) {
            await sql`INSERT INTO rd_pmo_state (tenant_id, team_display_name, team_password) VALUES (${tid}, ${name}, 'lab2026')`;
        }
    }
    ready = true;
}

async function handleState(req, res) {
    const tenantId = req.query.tenant || 'default';
    if (req.method === 'GET') {
        const result = await sql`
            SELECT projects, people, assignments, triage_items, criteria_weights, updated_at, updated_by
            FROM rd_pmo_state WHERE tenant_id = ${tenantId}`;
        if (result.length === 0) {
            await sql`INSERT INTO rd_pmo_state (tenant_id, projects, people, assignments, triage_items, criteria_weights)
                VALUES (${tenantId}, '[]', '[]', '{}', '[]', '{}')`;
            return res.status(200).json({ projects: [], people: [], assignments: {}, triageItems: [], criteriaWeights: {}, updatedAt: new Date().toISOString(), updatedBy: null });
        }
        const row = result[0];
        return res.status(200).json({
            projects: row.projects || [], people: row.people || [], assignments: row.assignments || {},
            triageItems: row.triage_items || [], criteriaWeights: row.criteria_weights || {},
            updatedAt: row.updated_at, updatedBy: row.updated_by });
    }
    if (req.method === 'POST') {
        const state = req.body;
        const userName = req.headers['x-user-name'] || null;
        const result = await sql`
            UPDATE rd_pmo_state SET
                projects = ${JSON.stringify(state.projects || [])},
                people = ${JSON.stringify(state.people || {})},
                assignments = ${JSON.stringify(state.assignments || {})},
                triage_items = ${JSON.stringify(state.triageItems || [])},
                criteria_weights = ${JSON.stringify(state.criteriaWeights || {})},
                updated_at = NOW(), updated_by = ${userName}
            WHERE tenant_id = ${tenantId} RETURNING updated_at`;
        await sql`INSERT INTO rd_pmo_activity_log (tenant_id, action, details, user_name)
            VALUES (${tenantId}, 'state_update', ${JSON.stringify({ projectCount: (state.projects || []).length })}, ${userName})`;
        return res.status(200).json({ success: true, updatedAt: result[0]?.updated_at });
    }
    return res.status(405).json({ error: 'Method not allowed' });
}

async function handleAuth(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    const { action } = req.body;
    if (action === 'list-teams') {
        const teams = await sql`SELECT tenant_id, team_display_name, (team_password IS NOT NULL) as is_active FROM rd_pmo_state ORDER BY tenant_id`;
        return res.status(200).json({ teams });
    }
    if (action === 'register') {
        const { firstName, lastName, email, teamId } = req.body;
        if (!firstName || !lastName || !email || !teamId) return res.status(400).json({ error: 'All fields are required' });
        const team = await sql`SELECT tenant_id, team_display_name FROM rd_pmo_state WHERE tenant_id = ${teamId}`;
        if (team.length === 0) return res.status(400).json({ error: 'Team not found' });
        const existing = await sql`SELECT id FROM rd_pmo_users WHERE email = ${email.toLowerCase().trim()}`;
        if (existing.length > 0) return res.status(400).json({ error: 'This email is already registered. Use Login instead.' });
        const count = await sql`SELECT COUNT(*) as cnt FROM rd_pmo_users WHERE team_id = ${teamId}`;
        if (parseInt(count[0].cnt) >= 6) return res.status(400).json({ error: 'This team is full (max 6 members). Choose another team.' });
        const result = await sql`INSERT INTO rd_pmo_users (first_name, last_name, email, team_id)
            VALUES (${firstName.trim()}, ${lastName.trim()}, ${email.toLowerCase().trim()}, ${teamId})
            RETURNING id, first_name, last_name, email, team_id`;
        return res.status(200).json({ success: true, user: result[0], teamName: team[0].team_display_name, message: 'Registration successful! You can now log in.' });
    }
    if (action === 'login') {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });
        const user = await sql`SELECT u.id, u.first_name, u.last_name, u.email, u.team_id, s.team_display_name, s.team_password
            FROM rd_pmo_users u JOIN rd_pmo_state s ON s.tenant_id = u.team_id
            WHERE u.email = ${email.toLowerCase().trim()}`;
        if (user.length === 0) return res.status(400).json({ error: 'Email not found. Register first.' });
        if (!user[0].team_password) return res.status(400).json({ error: 'Your team password has not been set yet. Ask your instructor.' });
        if (user[0].team_password !== password) return res.status(400).json({ error: 'Incorrect password' });
        return res.status(200).json({ success: true, user: { id: user[0].id, firstName: user[0].first_name, lastName: user[0].last_name, email: user[0].email, teamId: user[0].team_id, teamName: user[0].team_display_name } });
    }
    if (action === 'plan-login') {
        const { team, password } = req.body;
        if (!team || !password) return res.status(400).json({ error: 'Team name and password are required' });
        const result = await sql`SELECT tenant_id, team_display_name, team_password FROM rd_pmo_state WHERE LOWER(team_display_name) = LOWER(${team.trim()})`;
        if (result.length === 0) return res.status(400).json({ error: 'Team not found. Check your team name.' });
        if (!result[0].team_password) return res.status(400).json({ error: 'Team password not set yet. Ask your instructor.' });
        if (result[0].team_password !== password) return res.status(400).json({ error: 'Incorrect password.' });
        return res.status(200).json({ success: true, teamId: result[0].tenant_id, teamName: result[0].team_display_name });
    }
    return res.status(400).json({ error: 'Unknown action' });
}

async function handleAdmin(req, res) {
    if (req.headers['x-admin-token'] !== ADMIN_PASSWORD) return res.status(401).json({ error: 'Unauthorized' });
    if (req.method === 'GET') {
        const teams = await sql`SELECT s.tenant_id, s.team_display_name, s.team_password, s.updated_at,
                COALESCE(jsonb_array_length(s.projects), 0) as project_count
            FROM rd_pmo_state s ORDER BY s.tenant_id`;
        const users = await sql`SELECT id, first_name, last_name, email, team_id, created_at FROM rd_pmo_users ORDER BY team_id, created_at`;
        return res.status(200).json({ teams, users });
    }
    if (req.method === 'POST') {
        const { action } = req.body;
        if (action === 'set-password') {
            const { teamId, password } = req.body;
            if (!teamId || !password) return res.status(400).json({ error: 'Team ID and password required' });
            if (password.length < 4) return res.status(400).json({ error: 'Password must be at least 4 characters' });
            await sql`UPDATE rd_pmo_state SET team_password = ${password} WHERE tenant_id = ${teamId}`;
            return res.status(200).json({ success: true, message: `Password set for ${teamId}` });
        }
        if (action === 'set-name') {
            const { teamId, name } = req.body;
            if (!teamId || !name) return res.status(400).json({ error: 'Team ID and name required' });
            await sql`UPDATE rd_pmo_state SET team_display_name = ${name.trim()} WHERE tenant_id = ${teamId}`;
            return res.status(200).json({ success: true, message: `Name updated for ${teamId}` });
        }
        if (action === 'remove-user') {
            const { userId } = req.body;
            if (!userId) return res.status(400).json({ error: 'User ID required' });
            await sql`DELETE FROM rd_pmo_users WHERE id = ${userId}`;
            return res.status(200).json({ success: true, message: 'User removed' });
        }
        if (action === 'reset-team') {
            const { teamId } = req.body;
            if (!teamId) return res.status(400).json({ error: 'Team ID required' });
            await sql`UPDATE rd_pmo_state SET projects = '[]'::jsonb, people = '[]'::jsonb,
                assignments = '{}'::jsonb, triage_items = '[]'::jsonb, criteria_weights = '{}'::jsonb,
                updated_at = NOW(), updated_by = 'admin-reset' WHERE tenant_id = ${teamId}`;
            return res.status(200).json({ success: true, message: `Team ${teamId} data reset` });
        }
        return res.status(400).json({ error: 'Unknown action' });
    }
    return res.status(405).json({ error: 'Method not allowed' });
}

export default async function handler(req, res) {
    cors(res);
    if (req.method === 'OPTIONS') return res.status(200).end();
    try {
        await ensureTables();
        const fn = req.query.fn;
        if (fn === 'state') return await handleState(req, res);
        if (fn === 'auth') return await handleAuth(req, res);
        if (fn === 'admin') return await handleAdmin(req, res);
        return res.status(400).json({ error: 'Missing or unknown fn (state|auth|admin)' });
    } catch (error) {
        console.error('PMO API error:', error);
        return res.status(500).json({ error: 'PMO API failure' });
    }
}
