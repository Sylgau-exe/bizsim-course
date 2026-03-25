// api/simulations/leaderboard.js
import { ScoreDB, initializeDatabase } from '../../lib/db.js';
import { cors } from '../../lib/auth.js';

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    await initializeDatabase();
    const limit = parseInt(req.query.limit) || 20;
    const leaderboard = await ScoreDB.getLeaderboard(Math.min(limit, 50));
    res.json({ leaderboard });
  } catch (error) {
    console.error('Leaderboard error:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
}
