// api/auth/register.js
import bcrypt from 'bcryptjs';
import { UserDB, initializeDatabase } from '../../lib/db.js';
import { generateToken, cors } from '../../lib/auth.js';

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    await initializeDatabase();
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const existing = await UserDB.findByEmail(email.toLowerCase());
    if (existing) {
      return res.status(409).json({ error: 'An account with this email already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await UserDB.create(email.toLowerCase(), passwordHash, name);
    const token = generateToken(user);

    const { password_hash, ...safeUser } = user;
    res.status(201).json({ token, user: safeUser });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
}
