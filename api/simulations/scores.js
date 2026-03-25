// api/simulations/scores.js
import { ScoreDB, initializeDatabase } from '../../lib/db.js';
import { getUserFromRequest, cors } from '../../lib/auth.js';

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    await initializeDatabase();
    const decoded = getUserFromRequest(req);
    if (!decoded) return res.status(401).json({ error: 'Not authenticated' });

    if (req.method === 'GET') {
      const scores = await ScoreDB.getUserScores(decoded.userId);
      return res.json({ scores });
    }

    if (req.method === 'POST') {
      const { scenarioId, score, grade, durationMinutes, decisionsMade,
              budgetScore, scheduleScore, scopeScore, qualityScore, teamScore } = req.body;

      if (!scenarioId || score === undefined) {
        return res.status(400).json({ error: 'scenarioId and score are required' });
      }

      const id = await ScoreDB.create(decoded.userId, scenarioId, {
        score, grade, durationMinutes, decisionsMade,
        budgetScore, scheduleScore, scopeScore, qualityScore, teamScore
      });

      return res.status(201).json({ id, success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Scores error:', error);
    res.status(500).json({ error: 'Failed to process scores' });
  }
}
