// api/admin/users.js — HR/instructor monitoring endpoint (course edition)
import { sql } from '@vercel/postgres';
import { getUserFromRequest, cors } from '../../lib/auth.js';
import { initializeDatabase } from '../../lib/db.js';

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    await initializeDatabase();
    const decoded = getUserFromRequest(req);
    if (!decoded) return res.status(401).json({ error: 'Not authenticated' });

    const meRes = await sql`SELECT id, email, is_admin FROM bizsim_users WHERE id = ${decoded.userId}`;
    const me = meRes.rows[0];
    const adminEmail = (process.env.ADMIN_EMAIL || '').toLowerCase();
    const isAdmin = me && (me.is_admin === true || (adminEmail && me.email === adminEmail));
    if (!isAdmin) return res.status(403).json({ error: 'Admin access required' });

    const users = await sql`SELECT id, email, name, created_at FROM bizsim_users ORDER BY created_at DESC`;
    const scores = await sql`
      SELECT user_id, scenario_id, score, grade, budget_score, schedule_score, scope_score, quality_score, decisions_made, completed_at
      FROM bizsim_scores ORDER BY completed_at DESC`;
    res.json({ users: users.rows, scores: scores.rows });
  } catch (error) {
    console.error('Admin users error:', error);
    res.status(500).json({ error: 'Failed to load admin data' });
  }
}
