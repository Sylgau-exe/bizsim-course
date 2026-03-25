// lib/db.js - Database helper for course edition
import { sql } from '@vercel/postgres';

export async function initializeDatabase() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS bizsim_users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        is_admin BOOLEAN DEFAULT FALSE
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS bizsim_scores (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES bizsim_users(id) ON DELETE CASCADE,
        scenario_id VARCHAR(100) NOT NULL,
        score INTEGER NOT NULL,
        grade VARCHAR(5),
        duration_minutes INTEGER,
        decisions_made INTEGER,
        completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        budget_score INTEGER,
        schedule_score INTEGER,
        scope_score INTEGER,
        quality_score INTEGER,
        team_score INTEGER
      )
    `;

    await sql`CREATE INDEX IF NOT EXISTS idx_bizsim_users_email ON bizsim_users(email)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_bizsim_scores_user ON bizsim_scores(user_id)`;
    
    return { success: true };
  } catch (error) {
    console.error('Database initialization error:', error);
    return { success: false, error: error.message };
  }
}

export const UserDB = {
  async create(email, passwordHash, name) {
    const result = await sql`
      INSERT INTO bizsim_users (email, password_hash, name)
      VALUES (${email}, ${passwordHash}, ${name})
      RETURNING *
    `;
    return result.rows[0];
  },

  async findByEmail(email) {
    const result = await sql`SELECT * FROM bizsim_users WHERE email = ${email}`;
    return result.rows[0] || null;
  },

  async findById(id) {
    const result = await sql`SELECT * FROM bizsim_users WHERE id = ${id}`;
    return result.rows[0] || null;
  },

  async getAll() {
    const result = await sql`SELECT id, email, name, created_at, is_admin FROM bizsim_users ORDER BY created_at DESC`;
    return result.rows;
  },

  async delete(id) {
    await sql`DELETE FROM bizsim_users WHERE id = ${id}`;
  },

  async toggleAdmin(id, isAdmin) {
    const result = await sql`
      UPDATE bizsim_users SET is_admin = ${isAdmin}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id} RETURNING *
    `;
    return result.rows[0];
  }
};

export const ScoreDB = {
  async create(userId, scenarioId, scoreData) {
    const result = await sql`
      INSERT INTO bizsim_scores (
        user_id, scenario_id, score, grade,
        duration_minutes, decisions_made,
        budget_score, schedule_score, scope_score, quality_score, team_score
      ) VALUES (
        ${userId}, ${scenarioId}, ${scoreData.score}, ${scoreData.grade},
        ${scoreData.durationMinutes || null}, ${scoreData.decisionsMade || null},
        ${scoreData.budgetScore || null}, ${scoreData.scheduleScore || null},
        ${scoreData.scopeScore || null}, ${scoreData.qualityScore || null},
        ${scoreData.teamScore || null}
      )
      RETURNING id
    `;
    return result.rows[0]?.id;
  },

  async getUserScores(userId) {
    const result = await sql`
      SELECT * FROM bizsim_scores 
      WHERE user_id = ${userId} 
      ORDER BY completed_at DESC
    `;
    return result.rows;
  },

  async getLeaderboard(limit = 20) {
    const result = await sql`
      SELECT u.id as user_id, u.name, s.scenario_id, MAX(s.score) as best_score, 
             MAX(s.grade) as best_grade, COUNT(*) as attempts
      FROM bizsim_scores s
      JOIN bizsim_users u ON s.user_id = u.id
      GROUP BY u.id, u.name, s.scenario_id
      ORDER BY best_score DESC
      LIMIT ${limit}
    `;
    return result.rows;
  }
};
