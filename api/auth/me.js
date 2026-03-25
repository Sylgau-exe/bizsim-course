// api/auth/me.js
import { UserDB, initializeDatabase } from '../../lib/db.js';
import { getUserFromRequest, cors } from '../../lib/auth.js';

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    await initializeDatabase();
    const decoded = getUserFromRequest(req);
    if (!decoded) return res.status(401).json({ error: 'Not authenticated' });

    const user = await UserDB.findById(decoded.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const { password_hash, ...safeUser } = user;
    res.json({ user: safeUser });
  } catch (error) {
    console.error('Me error:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
}
