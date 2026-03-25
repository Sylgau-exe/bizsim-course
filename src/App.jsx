import React, { useState, useEffect, useRef } from 'react';

// ============================================
// BILINGUAL TRANSLATIONS — COURSE EDITION
// ============================================

const TRANSLATIONS = {
  nav: {
    home: { en: 'Home', fr: 'Accueil' },
    simulations: { en: 'Simulations', fr: 'Simulations' },
    login: { en: 'Log In', fr: 'Connexion' },
    logout: { en: 'Logout', fr: 'Déconnexion' },
    dashboard: { en: 'Dashboard', fr: 'Tableau de bord' },
  },
  dashboard: {
    welcome: { en: 'Welcome', fr: 'Bienvenue' },
    readyToContinue: { en: 'Ready to continue your learning journey?', fr: 'Prêt à continuer votre parcours d\'apprentissage?' },
    yourProgress: { en: 'Your Progress', fr: 'Votre progression' },
    totalAttempts: { en: 'Total Attempts', fr: 'Total des tentatives' },
    bestScore: { en: 'Best Score', fr: 'Meilleur score' },
    noScoresYet: { en: 'No scores yet — start a simulation!', fr: 'Aucun score — lancez une simulation!' },
    startSimulation: { en: 'Start Simulation', fr: 'Lancer la simulation' },
    continueSimulation: { en: 'Continue Simulation', fr: 'Continuer la simulation' },
    viewLeaderboard: { en: 'View Leaderboard', fr: 'Voir le classement' },
  },
  simulation: {
    selectScenario: { en: 'Select a Scenario', fr: 'Choisissez un scénario' },
    beginSimulation: { en: 'Begin Simulation', fr: 'Commencer la simulation' },
    week: { en: 'Week', fr: 'Semaine' },
    budget: { en: 'Budget', fr: 'Budget' },
    schedule: { en: 'Schedule', fr: 'Calendrier' },
    scope: { en: 'Scope', fr: 'Périmètre' },
    quality: { en: 'Quality', fr: 'Qualité' },
    team: { en: 'Team', fr: 'Équipe' },
    morale: { en: 'Morale', fr: 'Moral' },
    stress: { en: 'Stress', fr: 'Stress' },
    knowledge: { en: 'Knowledge', fr: 'Connaissances' },
    askAnna: { en: 'Ask Anna', fr: 'Demander à Anna' },
    projectBrief: { en: 'Project Brief', fr: 'Dossier du projet' },
    decisions: { en: 'Decisions', fr: 'Décisions' },
    events: { en: 'Events', fr: 'Événements' },
    results: { en: 'Results', fr: 'Résultats' },
    finalScore: { en: 'Final Score', fr: 'Score final' },
    playAgain: { en: 'Play Again', fr: 'Rejouer' },
    backToDashboard: { en: 'Back to Dashboard', fr: 'Retour au tableau de bord' },
    howToPlay: { en: 'How to Play', fr: 'Comment jouer' },
    tryDifferentScenario: { en: 'Try Different Scenario', fr: 'Essayer un autre scénario' },
  },
  auth: {
    welcome: { en: 'Welcome', fr: 'Bienvenue' },
    createAccount: { en: 'Create Account', fr: 'Créer un compte' },
    signIn: { en: 'Sign In', fr: 'Connexion' },
    signUp: { en: 'Sign Up', fr: 'S\'inscrire' },
    fullName: { en: 'Full Name', fr: 'Nom complet' },
    password: { en: 'Password', fr: 'Mot de passe' },
    signInSubtitle: { en: 'Sign in to continue learning', fr: 'Connectez-vous pour continuer' },
    signUpSubtitle: { en: 'Create your account to begin', fr: 'Créez votre compte pour commencer' },
    noAccount: { en: "Don\'t have an account? ", fr: "Pas de compte? " },
    hasAccount: { en: 'Already have an account? ', fr: 'Déjà un compte? ' },
    pleaseWait: { en: 'Please wait...', fr: 'Patientez...' },
  },
  common: {
    loading: { en: 'Loading...', fr: 'Chargement...' },
  }
};

const t = (key, lang) => {
  const keys = key.split('.');
  let val = TRANSLATIONS;
  for (const k of keys) {
    val = val?.[k];
  }
  if (!val) return key;
  return val[lang] || val.en || key;
};


// ============================================
// VISUAL HELPER COMPONENTS
// ============================================

const Confetti = () => {
  const colors = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];
  return (
    <div className="confetti-container">
      {[...Array(50)].map((_, i) => (
        <div 
          key={i} 
          className="confetti-piece"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
            backgroundColor: colors[Math.floor(Math.random() * colors.length)]
          }}
        />
      ))}
    </div>
  );
};

// Success checkmark animation
const SuccessAnimation = () => (
  <div className="success-animation">
    <div className="success-circle">
      <svg className="checkmark" viewBox="0 0 50 50">
        <path d="M14 27 L22 35 L38 16" />
      </svg>
    </div>
  </div>
);

// Sad face animation
const SadAnimation = () => (
  <div className="sad-animation">
    <div className="sad-face">
      <div className="sad-eyes">
        <div className="sad-eye"></div>
        <div className="sad-eye"></div>
      </div>
      <div className="sad-mouth"></div>
    </div>
  </div>
);

// Gantt Chart Mascot - reacts to project health
const GanttMascot = ({ mood = 'normal' }) => (
  <div className={`gantt-mascot ${mood}`}>
    <svg viewBox="0 0 120 100" className="gantt-svg">
      {/* Chart background */}
      <rect x="10" y="10" width="100" height="80" rx="4" fill="#f8fafc" stroke="#343a40" strokeWidth="2"/>
      
      {/* Grid lines */}
      <g stroke="#343a40" strokeWidth="1">
        <line x1="35" y1="10" x2="35" y2="90"/>
        <line x1="60" y1="10" x2="60" y2="90"/>
        <line x1="85" y1="10" x2="85" y2="90"/>
        <line x1="10" y1="30" x2="110" y2="30"/>
        <line x1="10" y1="50" x2="110" y2="50"/>
        <line x1="10" y1="70" x2="110" y2="70"/>
      </g>
      
      {/* Gantt bars */}
      <g className="gantt-bars">
        <rect x="20" y="18" width="45" height="8" rx="2" fill="#3b82f6" className="bar b1"/>
        <rect x="40" y="38" width="50" height="8" rx="2" fill="#8b5cf6" className="bar b2"/>
        <rect x="55" y="58" width="40" height="8" rx="2" fill="#10b981" className="bar b3"/>
        <rect x="70" y="78" width="30" height="8" rx="2" fill="#f59e0b" className="bar b4"/>
      </g>
      
      {/* Deadline line */}
      <line x1="90" y1="10" x2="90" y2="90" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,2" className="deadline"/>
      <text x="92" y="18" fontSize="6" fill="#ef4444" fontWeight="bold" className="deadline-text">DUE</text>
      
      {/* Face */}
      <g className="gantt-face">
        <g className="gantt-eyes">
          <circle cx="45" cy="50" r="4" fill="#1e293b"/>
          <circle cx="65" cy="50" r="4" fill="#1e293b"/>
          <circle cx="46" cy="49" r="1.5" fill="white"/>
          <circle cx="66" cy="49" r="1.5" fill="white"/>
        </g>
        <path className="gantt-mouth" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" fill="none"/>
      </g>
      
      {/* Explosion marks for stressed */}
      <g className="explosion">
        <text x="100" y="25" fontSize="12">💥</text>
        <text x="5" y="80" fontSize="10">⚡</text>
      </g>
    </svg>
    <div className="mascot-tooltip">
      {mood === 'normal' && "Looking good!"}
      {mood === 'concerned' && "Hmm, keep an eye on this..."}
      {mood === 'stressed' && "We might need to talk..."}
      {mood === 'success' && "Nailed it! 🎯"}
    </div>
  </div>
);

// Risk Radar Component - Visual risk assessment
const RiskRadar = ({ risks }) => {
  const { budget, schedule, scope, quality, team, stakeholder } = risks;
  
  // Convert risk values (0-100) to radar coordinates
  const centerX = 60, centerY = 60, radius = 45;
  const angles = [0, 60, 120, 180, 240, 300].map(a => (a - 90) * Math.PI / 180);
  const values = [budget, schedule, scope, quality, team, stakeholder];
  
  const points = values.map((v, i) => {
    const r = (v / 100) * radius;
    return `${centerX + r * Math.cos(angles[i])},${centerY + r * Math.sin(angles[i])}`;
  }).join(' ');
  
  const labels = ['💰', '📅', '📦', '⭐', '👥', '🤝'];
  
  return (
    <div className="risk-radar">
      <svg viewBox="0 0 120 120" width="280" height="280">
        {/* Background circles */}
        {[0.25, 0.5, 0.75, 1].map((scale, i) => (
          <circle
            key={i}
            cx={centerX}
            cy={centerY}
            r={radius * scale}
            fill="none"
            stroke="#dee2e6"
            strokeWidth="1"
          />
        ))}
        
        {/* Axis lines */}
        {angles.map((angle, i) => (
          <line
            key={i}
            x1={centerX}
            y1={centerY}
            x2={centerX + radius * Math.cos(angle)}
            y2={centerY + radius * Math.sin(angle)}
            stroke="#dee2e6"
            strokeWidth="1"
          />
        ))}
        
        {/* Risk area polygon */}
        <polygon
          points={points}
          fill="rgba(99, 102, 241, 0.15)"
          stroke="#4f46e5"
          strokeWidth="2"
        />
        
        {/* Risk dots */}
        {values.map((v, i) => {
          const r = (v / 100) * radius;
          const color = v > 70 ? '#10b981' : v > 40 ? '#f59e0b' : '#ef4444';
          return (
            <circle
              key={i}
              cx={centerX + r * Math.cos(angles[i])}
              cy={centerY + r * Math.sin(angles[i])}
              r="4"
              fill={color}
              stroke="#ffffff"
              strokeWidth="1"
            />
          );
        })}
        
        {/* Labels */}
        {labels.map((label, i) => {
          const r = radius + 12;
          return (
            <text
              key={i}
              x={centerX + r * Math.cos(angles[i])}
              y={centerY + r * Math.sin(angles[i]) + 4}
              textAnchor="middle"
              fontSize="12"
            >
              {label}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

// Weekly Summary Component
const WeeklySummary = ({ week, events, decisions, lang }) => (
  <div className="weekly-summary">
    <div className="summary-header">
      <span className="summary-week">Week {week} Summary</span>
    </div>
    <div className="summary-content">
      {events > 0 && (
        <div className="summary-item">
          <span className="summary-icon">🚨</span>
          <span>{events} event{events > 1 ? 's' : ''} handled</span>
        </div>
      )}
      {decisions > 0 && (
        <div className="summary-item">
          <span className="summary-icon">✅</span>
          <span>{decisions} decision{decisions > 1 ? 's' : ''} made</span>
        </div>
      )}
    </div>
  </div>
);

// ============================================
// API CLIENT
// ============================================

const API_BASE = '/api';

const api = {
  token: null,
  
  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('bsim_token', token);
    } else {
      localStorage.removeItem('bsim_token');
    }
  },
  
  getToken() {
    if (!this.token) {
      this.token = localStorage.getItem('bsim_token');
    }
    return this.token;
  },
  
  async request(endpoint, options = {}) {
    const token = this.getToken();
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers
    };
    
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Request failed');
    }
    
    return data;
  },
  
  // Auth
  register: (name, email, password) => 
    api.request('/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password }) }),
  login: (email, password) => 
    api.request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  getMe: () => 
    api.request('/auth/me'),
  updateProfile: (data) => 
    api.request('/auth/profile', { method: 'PATCH', body: JSON.stringify(data) }),
  

  
  // Simulations
  recordScore: (simId, scoreData) => 
    api.request('/simulations/scores', { method: 'POST', body: JSON.stringify({ simulationId: simId, ...scoreData }) }),
  getScores: () => 
    api.request('/simulations/scores'),
  getLeaderboard: (simId) => 
    api.request(`/simulations/leaderboard?simulationId=${simId}`),
  getStats: () => 
    Promise.resolve({ stats: { total_plays: 0, unique_players: 0, average_score: 0 } }),
  

};

// ============================================

// PROJECT APEX SCENARIOS - ENHANCED WITH HBP MECHANICS
// ============================================

/*
 * HBP-INSPIRED CAUSAL MODEL
 * =========================
 * 
 * Key Relationships (from Harvard Business Publishing simulation):
 * 
 * 1. STRESS DRIVERS:
 *    - Unrealistic schedule (deadline - week remaining < 0) → +stress
 *    - Team changes (hiring/firing) → +stress (transition costs)
 *    - Overtime/crunch mode → +stress
 *    - Low knowledge (early project) → +stress
 * 
 * 2. STRESS → MORALE:
 *    - High stress (>60) → morale decreases
 *    - Morale affects hours worked and engagement
 * 
 * 3. MORALE → PRODUCTIVITY:
 *    - Low morale → fewer productive hours
 *    - Morale < 40 → significant productivity penalty
 * 
 * 4. KNOWLEDGE ACCUMULATION:
 *    - Coaching meetings build knowledge over time
 *    - Knowledge reduces mistake rate
 *    - Team changes cause knowledge loss
 * 
 * 5. COORDINATION NEEDS:
 *    - Larger teams need more coordination (standups)
 *    - Without coordination → higher mistake rate → rework
 * 
 * 6. SCHEDULE CONSISTENCY:
 *    - Changing deadline frequently → morale penalty
 *    - Each change after week 2 → -5 morale, +10 stress
 */

const APEX_SCENARIOS = {
  tech_startup: {
    id: 'tech_startup',
    title: 'Tech Startup',
    subtitle: 'Software Product Launch',
    icon: '💻',
    difficulty: 'Standard',
    difficultyColor: '#3b82f6',
    description: 'You are the Project Manager at Nexus Technologies. Deliver a new SaaS platform while managing team dynamics and technical challenges.',
    company: 'Nexus Technologies',
    projectName: 'SaaS Platform',
    deliverable: 'features',
    // Pedagogical focus: Learn basic mechanics, achievable targets
    pedagogicalFocus: 'mechanics',
    hasPrototyping: false,
    hasUncertainty: false,
    initial: { 
      budget: 500000, 
      weeks: 10, 
      scope: 12, 
      teamSize: 5, 
      quality: 85, 
      morale: 75,
      stress: 20,      // NEW: Starting stress level
      knowledge: 30,   // NEW: Starting knowledge (team familiarity)
    },
    weeklyCostPerPerson: 8000,
    // CAUSAL EVENTS: Triggered by conditions, not random
    causalEvents: [
      { 
        id: 'scope_creep', 
        title: 'Scope Creep Alert', 
        description: 'The product owner wants to add 2 new features. Your response affects both scope and team stress.',
        icon: '📈',
        // Trigger condition: After week 3, if quality > 80
        triggerCondition: (state) => state.week >= 3 && state.scope.quality > 80,
        options: [
          { id: 'accept', label: 'Accept all changes (+2 scope, +stress)', effects: { scope: 2, budget: -30000, stress: 15, morale: -5 } },
          { id: 'negotiate', label: 'Negotiate to add 1 feature', effects: { scope: 1, budget: -15000, stress: 5 } },
          { id: 'decline', label: 'Decline and stay focused (+morale)', effects: { morale: 8, quality: 2, stress: -5 } }
        ]
      },
      { 
        id: 'tech_debt', 
        title: 'Technical Debt Crisis', 
        description: 'QA discovered critical technical debt. Addressing it now prevents larger problems later.',
        icon: '🔧',
        // Trigger: Mid-project if quality dropped below 75
        triggerCondition: (state) => state.week >= 4 && state.scope.quality < 75,
        options: [
          { id: 'fix_now', label: 'Full refactor (schedule hit, quality gain)', effects: { schedule: -1, quality: 15, budget: -20000, knowledge: 10 } },
          { id: 'patch', label: 'Quick patch', effects: { quality: 5, budget: -8000 } },
          { id: 'defer', label: 'Document for v2 (risk)', effects: { quality: -15, stress: 10 } }
        ]
      },
      { 
        id: 'dev_resignation', 
        title: 'Lead Developer Resigns', 
        description: 'Your lead developer accepted a FAANG offer. This will cause knowledge loss.',
        icon: '🚪',
        // Trigger: If stress is high (>50) after week 5
        triggerCondition: (state) => state.week >= 5 && state.team.stress > 50,
        options: [
          { id: 'counter', label: 'Counter-offer (expensive, retain knowledge)', effects: { budget: -45000, morale: 5, knowledge: 0 } },
          { id: 'transition', label: 'Knowledge transfer period', effects: { team: -1, schedule: -1, morale: -5, knowledge: -15, stress: 15 } },
          { id: 'contractor', label: 'Hire contractor (no knowledge loss)', effects: { budget: -55000, productivity: -0.1 } }
        ]
      },
      { 
        id: 'team_conflict', 
        title: 'Architecture Disagreement', 
        description: 'Senior devs debate microservices vs monolith. Unresolved conflict will hurt productivity.',
        icon: '🔥',
        // Trigger: If team size > 5 and morale < 70
        triggerCondition: (state) => state.team.size > 5 && state.team.morale < 70,
        options: [
          { id: 'mediate', label: 'Architecture review workshop (+knowledge)', effects: { budget: -8000, morale: 10, productivity: 0.1, knowledge: 8 } },
          { id: 'decide', label: 'Executive decision (fast, some resentment)', effects: { morale: -10, productivity: 0.05 } },
          { id: 'hybrid', label: 'Hybrid approach (compromise)', effects: { budget: -5000, morale: 5 } }
        ]
      }
    ]
  },

  live_show: {
    id: 'live_show',
    title: 'Live Entertainment',
    subtitle: 'Touring Show Production',
    icon: '🎪',
    difficulty: 'Advanced',
    difficultyColor: '#f59e0b',
    description: 'Executive Producer at Stellar Productions. Launch an ambitious touring show while managing creative talent and safety requirements.',
    company: 'Stellar Productions',
    projectName: 'AURORA - A Journey of Light',
    deliverable: 'acts',
    // Pedagogical focus: People/creative management, high coordination needs
    pedagogicalFocus: 'people',
    hasPrototyping: true,  // Tech rehearsals = prototypes
    hasUncertainty: true,
    initial: { 
      budget: 2500000, 
      weeks: 12, 
      scope: 8, 
      teamSize: 12, 
      quality: 80, 
      morale: 80,
      stress: 25,
      knowledge: 20,  // Lower starting knowledge - creative project
    },
    weeklyCostPerPerson: 6000,
    causalEvents: [
      { 
        id: 'star_injury', 
        title: 'Lead Performer Injury', 
        description: 'Your star acrobat suffered a minor injury. How you handle this affects team trust.',
        icon: '🤕',
        triggerCondition: (state) => state.week >= 4 && state.team.stress > 40,
        options: [
          { id: 'rest', label: 'Full recovery time (+morale, +trust)', effects: { schedule: -2, quality: 10, morale: 15, stress: -10 } },
          { id: 'modified', label: 'Modified choreography', effects: { quality: -5, budget: -20000 } },
          { id: 'understudy', label: 'Promote understudy (risky)', effects: { morale: -10, quality: -10, stress: 10 } }
        ]
      },
      { 
        id: 'creative_conflict', 
        title: 'Creative Vision Clash', 
        description: 'Director and choreographer disagree on Act 3. Unresolved, this will fester.',
        icon: '🎭',
        triggerCondition: (state) => state.week >= 5 && state.team.morale < 75,
        options: [
          { id: 'director', label: "Back director's vision", effects: { morale: -15, quality: 5, stress: 5 } },
          { id: 'choreographer', label: 'Support choreographer', effects: { morale: -10, quality: 5, stress: 5 } },
          { id: 'workshop', label: 'Creative workshop (+knowledge)', effects: { budget: -30000, schedule: -1, quality: 15, morale: 10, knowledge: 12 } }
        ]
      },
      { 
        id: 'rigging_issue', 
        title: 'Rigging Safety Concern', 
        description: 'Aerial rigging may not meet safety standards. A prototype/tech rehearsal would have caught this earlier.',
        icon: '⚠️',
        // This event is MITIGATED if prototypes were built
        triggerCondition: (state) => state.week >= 6,
        prototypeModifier: true, // If prototypes built, effects reduced
        options: [
          { id: 'redesign', label: 'Full redesign (safest)', effects: { budget: -150000, schedule: -2, quality: 15, stress: -10 } },
          { id: 'reinforce', label: 'Reinforce current design', effects: { budget: -60000, quality: 5 } },
          { id: 'simplify', label: 'Simplify aerial sequences', effects: { scope: -1, quality: -10, morale: -10 } }
        ]
      }
    ]
  },

  construction: {
    id: 'construction',
    title: 'Construction',
    subtitle: 'Commercial Building Project',
    icon: '🏗️',
    difficulty: 'Standard',
    difficultyColor: '#3b82f6',
    description: 'Project Manager at UrbanCore Construction. Build a 12-story mixed-use building while managing permits, weather, and safety.',
    company: 'UrbanCore Construction',
    projectName: 'Metropolitan Tower',
    deliverable: 'floors',
    // Pedagogical focus: Risk management, prototyping value
    pedagogicalFocus: 'risk',
    hasPrototyping: true,  // Mockups, inspections = prototypes
    hasUncertainty: true,
    initial: { 
      budget: 8000000, 
      weeks: 16, 
      scope: 12, 
      teamSize: 25, 
      quality: 85, 
      morale: 70,
      stress: 30,
      knowledge: 40,  // Higher starting knowledge - experienced crew
    },
    weeklyCostPerPerson: 4500,
    causalEvents: [
      { 
        id: 'weather_delay', 
        title: 'Severe Weather Alert', 
        description: 'Major storm forecast for 10 days. Your choice affects both schedule and team safety.',
        icon: '🌧️',
        triggerCondition: (state) => state.week >= 4 && state.week <= 12,
        options: [
          { id: 'pause', label: 'Pause outdoor work (safe)', effects: { schedule: -2, morale: 5, stress: -5 } },
          { id: 'interior', label: 'Interior work only', effects: { schedule: -1, budget: -50000, knowledge: 5 } },
          { id: 'push', label: 'Continue with caution (risky)', effects: { budget: -80000, quality: -5, morale: -10, stress: 15 } }
        ]
      },
      { 
        id: 'permit_issue', 
        title: 'Permit Inspection Failed', 
        description: 'Inspector flagged electrical issues. A prototype/mockup inspection would have caught this earlier.',
        icon: '📋',
        triggerCondition: (state) => state.week >= 6,
        prototypeModifier: true,
        options: [
          { id: 'rework', label: 'Full rework (+quality)', effects: { schedule: -2, budget: -120000, quality: 10, knowledge: 8 } },
          { id: 'appeal', label: 'Appeal decision', effects: { schedule: -1, budget: -30000, stress: 10 } },
          { id: 'expedite', label: 'Hire specialist (expensive)', effects: { budget: -180000 } }
        ]
      },
      { 
        id: 'safety_incident', 
        title: 'Safety Near-Miss', 
        description: 'Scaffold bracket failed. OSHA will investigate. This affects team morale and stress significantly.',
        icon: '🦺',
        triggerCondition: (state) => state.week >= 5 && state.team.stress > 45,
        options: [
          { id: 'full_audit', label: 'Full safety audit (+trust)', effects: { schedule: -1, budget: -60000, quality: 10, morale: 15, stress: -15, knowledge: 10 } },
          { id: 'targeted', label: 'Targeted inspection', effects: { budget: -25000, quality: 5 } },
          { id: 'minimal', label: 'Document and continue (risky)', effects: { quality: -10, morale: -15, stress: 20 } }
        ]
      },
      { 
        id: 'materials_shortage', 
        title: 'Materials Shortage', 
        description: 'Supply chain issue: steel delivery delayed 3 weeks. Prototyping/early ordering would have mitigated this.',
        icon: '📦',
        triggerCondition: (state) => state.week >= 7,
        prototypeModifier: true,
        options: [
          { id: 'wait', label: 'Wait for delivery', effects: { schedule: -3, morale: -10, stress: 15 } },
          { id: 'alternative', label: 'Source alternative supplier', effects: { budget: -200000, schedule: -1 } },
          { id: 'redesign', label: 'Redesign with available materials', effects: { budget: -100000, quality: -5, knowledge: 5 } }
        ]
      }
    ]
  },

  // NEW SCENARIO: High-Uncertainty R&D Project
  rd_innovation: {
    id: 'rd_innovation',
    title: 'R&D Innovation',
    subtitle: 'New Technology Development',
    icon: '🔬',
    difficulty: 'Expert',
    difficultyColor: '#dc2626',
    description: 'Lead a cutting-edge R&D project with high uncertainty. Prototyping is essential to surface problems early.',
    company: 'FutureTech Labs',
    projectName: 'Quantum Sensor Array',
    deliverable: 'milestones',
    // Pedagogical focus: Prototyping value in uncertainty
    pedagogicalFocus: 'prototyping',
    hasPrototyping: true,
    hasUncertainty: true,
    initial: { 
      budget: 3000000, 
      weeks: 14, 
      scope: 10, 
      teamSize: 8, 
      quality: 75,  // Lower starting quality - R&D uncertainty
      morale: 85,
      stress: 35,   // Higher stress - cutting edge work
      knowledge: 25, // Low knowledge - novel technology
    },
    weeklyCostPerPerson: 10000,
    causalEvents: [
      { 
        id: 'tech_failure', 
        title: 'Core Technology Failure', 
        description: 'The main sensor approach isn\'t working as expected. Prototypes would have revealed this earlier.',
        icon: '💥',
        triggerCondition: (state) => state.week >= 5,
        prototypeModifier: true, // Severity significantly reduced if prototypes built
        options: [
          { id: 'pivot', label: 'Pivot to backup approach', effects: { scope: -2, budget: -200000, knowledge: 15, stress: -10 } },
          { id: 'iterate', label: 'Iterate on current design', effects: { schedule: -3, budget: -150000, quality: -10, stress: 15 } },
          { id: 'parallel', label: 'Run parallel approaches', effects: { budget: -400000, team: 2, stress: 20 } }
        ]
      },
      { 
        id: 'breakthrough', 
        title: 'Unexpected Breakthrough', 
        description: 'A team member discovered a shortcut. How you capitalize on it matters.',
        icon: '💡',
        triggerCondition: (state) => state.week >= 6 && state.team.knowledge > 50,
        options: [
          { id: 'focus', label: 'Focus resources on breakthrough', effects: { quality: 15, morale: 15, knowledge: 10, stress: -10 } },
          { id: 'validate', label: 'Build prototype to validate', effects: { budget: -50000, quality: 10, knowledge: 20 } },
          { id: 'patent', label: 'Document for patent first', effects: { schedule: -1, morale: -5 } }
        ]
      },
      { 
        id: 'competitor_announcement', 
        title: 'Competitor Announcement', 
        description: 'A competitor announced a similar product launching in 8 weeks. Time pressure increases.',
        icon: '⚡',
        triggerCondition: (state) => state.week >= 7,
        options: [
          { id: 'accelerate', label: 'Accelerate timeline (-3 weeks)', effects: { schedule: -3, stress: 25, morale: -10 } },
          { id: 'differentiate', label: 'Pivot to differentiation (+scope)', effects: { scope: 2, budget: -100000, knowledge: 5 } },
          { id: 'stay_course', label: 'Stay the course (quality focus)', effects: { quality: 10, morale: 5 } }
        ]
      }
    ]
  }
};

// ============================================
// ENHANCED GAME MECHANICS - HBP CAUSAL MODEL
// ============================================

/*
 * MEETING TYPES (replacing simple "boost morale")
 * Based on HBP simulation's three meeting types with distinct effects
 */
const MEETING_TYPES = {
  coaching: {
    id: 'coaching',
    name: 'One-on-One Coaching',
    description: 'Build team knowledge and skills. Best early in project.',
    hoursPerWeek: 2,
    costPerSession: 500, // per team member
    effects: {
      knowledge: 8,      // Primary benefit: builds knowledge
      morale: 3,         // Secondary: some morale boost
      stress: -2,        // Slight stress relief
    },
    icon: '🎓'
  },
  standup: {
    id: 'standup',
    name: 'Daily Standups',
    description: 'Prevent coordination mistakes. Essential for larger teams.',
    hoursPerWeek: 1.25, // 15 min/day × 5 days
    costPerSession: 0,  // No direct cost, just time
    effects: {
      coordination: 10,  // Reduces mistake rate
      productivity: 0.02, // Slight productivity boost from alignment
    },
    icon: '📊'
  },
  status: {
    id: 'status',
    name: 'Status Review',
    description: 'Team alignment and stakeholder communication.',
    hoursPerWeek: 2,
    costPerSession: 300, // room, materials
    effects: {
      morale: 5,        // Team feels heard
      stress: -5,       // Clarity reduces anxiety
      stakeholder: 10,  // Better stakeholder relations
    },
    icon: '📋'
  }
};

/*
 * PROTOTYPING MECHANIC
 * Prototypes cost time/money upfront but reduce severity of uncertainty events
 */
const PROTOTYPE_COST = {
  tech_startup: { budget: 15000, time: 0.5 }, // 0.5 = half a week of reduced progress
  live_show: { budget: 50000, time: 1 },      // Tech rehearsal
  construction: { budget: 80000, time: 1 },   // Mockup/inspection
  rd_innovation: { budget: 100000, time: 1 }, // Lab prototype
};

/*
 * CAUSAL CALCULATIONS
 */


const calculateStress = (state, scenario) => {
  let stress = state.team.stress;
  
  // Factor 1: Schedule pressure (unrealistic deadline)
  const weeksRemaining = state.schedule.deadline - state.week;
  const workRemaining = state.scope.totalFeatures - state.scope.completed;
  const weeklyCapacity = calculateWeeklyCapacity(state.team, state);
  const weeksNeeded = workRemaining / (weeklyCapacity * state.scope.totalFeatures);
  
  if (weeksNeeded > weeksRemaining) {
    // Schedule is unrealistic - add stress proportional to gap
    stress += Math.min(15, (weeksNeeded - weeksRemaining) * 5);
  }
  
  // Factor 2: Recent team changes (hiring/firing causes transition stress)
  // This is handled in action effects
  
  // Factor 3: Low knowledge early in project
  if (state.team.knowledge < 40 && state.week <= 4) {
    stress += 5;
  }
  
  // Factor 4: Crunch/overtime (handled in action effects)
  
  // Natural stress decay if conditions are good
  if (weeksNeeded <= weeksRemaining && state.team.morale > 70) {
    stress -= 3;
  }
  
  return Math.max(0, Math.min(100, stress));
};

// Stress affects morale (HBP: high stress → lower morale)
const calculateMoraleFromStress = (currentMorale, stress) => {
  let moraleDelta = 0;
  
  if (stress > 60) {
    moraleDelta = -((stress - 60) * 0.3); // High stress drains morale
  } else if (stress < 30) {
    moraleDelta = 2; // Low stress allows morale recovery
  }
  
  return Math.max(10, Math.min(100, currentMorale + moraleDelta));
};

// Morale affects productivity (HBP: low morale → fewer hours worked)
const calculateProductivityFromMorale = (baseProductivity, morale) => {
  if (morale >= 80) {
    return baseProductivity * 1.1; // High morale bonus
  } else if (morale >= 60) {
    return baseProductivity;
  } else if (morale >= 40) {
    return baseProductivity * 0.85; // Moderate penalty
  } else {
    return baseProductivity * 0.65; // Severe penalty
  }
};

// Knowledge affects mistake rate (HBP: low knowledge → more rework)
const calculateMistakeRate = (knowledge, hasStandups) => {
  let baseRate = 0.15 - (knowledge * 0.001); // 15% base, reduced by knowledge
  
  // Standups reduce coordination mistakes
  if (hasStandups) {
    baseRate *= 0.7; // 30% reduction
  }
  
  return Math.max(0.02, baseRate); // Minimum 2% mistake rate
};

// Weekly capacity calculation (enhanced)
const calculateWeeklyCapacity = (team, state) => {
  const baseCapacity = team.size * team.productivity;
  const moraleAdjustedProductivity = calculateProductivityFromMorale(team.productivity, team.morale);
  const mistakeRate = calculateMistakeRate(state.team.knowledge, state.meetings?.standup);
  
  // Effective capacity accounts for mistakes (rework)
  const effectiveCapacity = (team.size * moraleAdjustedProductivity * (team.morale / 100)) * (1 - mistakeRate);
  
  // Normalize progress so scenarios complete in roughly their intended duration
  // Dividing by team size prevents large teams from finishing too fast
  // The 0.11 multiplier is tuned for ~10-12 week completion at good morale
  return (effectiveCapacity / team.size) * 0.11;
};

// Calculate weekly progress with enhanced model
const calculateWeeklyProgress = (team, scope, state) => {
  const capacity = calculateWeeklyCapacity(team, state);
  return Math.min(capacity, 1 - (scope.completed / scope.totalFeatures));
};

// Schedule consistency penalty
const calculateScheduleConsistencyPenalty = (scheduleChanges) => {
  if (scheduleChanges <= 1) return { morale: 0, stress: 0 };
  if (scheduleChanges === 2) return { morale: -3, stress: 5 };
  if (scheduleChanges === 3) return { morale: -8, stress: 10 };
  return { morale: -15, stress: 20 }; // 4+ changes
};

// Enhanced scoring (HBP-style with bonus for consistency)
const calculateScore = (state) => {
  const budgetScore = Math.max(0, (1 - state.budget.spent / state.budget.total)) * 200;
  const scheduleScore = state.week <= state.schedule.deadline 
    ? 200 
    : Math.max(0, 200 - (state.week - state.schedule.deadline) * 40);
  const scopeScore = (state.scope.completed / state.scope.totalFeatures) * 200;
  const qualityScore = (state.scope.quality / 100) * 200;
  
  // NEW: Team process score (HBP has this as 100 points)
  const avgMorale = state.moraleHistory 
    ? state.moraleHistory.reduce((a, b) => a + b, 0) / state.moraleHistory.length 
    : state.team.morale;
  const teamProcessScore = (avgMorale / 100) * 100;
  
  // NEW: Bonus for schedule consistency
  const consistencyBonus = state.scheduleChanges <= 1 ? 50 : state.scheduleChanges === 2 ? 25 : 0;
  
  // NEW: Prototype bonus (if applicable and prototypes were built)
  const prototypeBonus = state.prototypesBuilt > 0 ? state.prototypesBuilt * 25 : 0;
  
  return Math.round(budgetScore + scheduleScore + scopeScore + qualityScore + teamProcessScore + consistencyBonus + prototypeBonus);
};

const getGrade = (score) => {
  if (score >= 900) return 'A+';
  if (score >= 800) return 'A';
  if (score >= 700) return 'B+';
  if (score >= 600) return 'B';
  if (score >= 500) return 'C';
  if (score >= 400) return 'D';
  return 'F';
};

// Enhanced initial state with new fields
const createApexInitialState = (scenario) => ({
  scenario: scenario.id,
  week: 1,
  totalWeeks: scenario.initial.weeks,
  budget: { total: scenario.initial.budget, spent: 0 },
  schedule: { 
    deadline: scenario.initial.weeks,
    originalDeadline: scenario.initial.weeks // Track original for consistency
  },
  scope: { 
    totalFeatures: scenario.initial.scope, 
    completed: 0, 
    quality: scenario.initial.quality 
  },
  team: { 
    size: scenario.initial.teamSize, 
    morale: scenario.initial.morale, 
    productivity: 1.0,
    stress: scenario.initial.stress,
    knowledge: scenario.initial.knowledge
  },
  // NEW: Meeting tracking
  meetings: {
    coaching: false,
    standup: false,
    status: false
  },
  // NEW: Schedule change tracking
  scheduleChanges: 0,
  // NEW: Prototype tracking
  prototypesBuilt: 0,
  maxPrototypes: scenario.hasPrototyping ? 3 : 0,
  // NEW: Morale history for team process score
  moraleHistory: [scenario.initial.morale],
  // Decision tracking
  decisions: [],
  triggeredEvents: [], // Track which events have fired
  gamePhase: 'playing',
  currentEvent: null,
  startTime: Date.now()
});

// ============================================
// MAIN APP COMPONENT
// ============================================



// ============================================
// MAIN APP COMPONENT — COURSE EDITION
// ============================================


// ============================================
// AI ADVISOR — Anna (only server-side call needed)
// ============================================

const askAnnaAPI = async (prompt) => {
  const response = await fetch('/api/ai-advisor', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, max_tokens: 1000 })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'AI request failed');
  return data.text;
};


// ============================================
// MAIN APP COMPONENT — NO-DB COURSE EDITION
// ============================================

export default function BizSimCourse() {
  const [lang, setLang] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('bizsim-course-lang') || 'en';
    }
    return 'en';
  });
  
  const [currentPage, setCurrentPage] = useState('home');
  const [toast, setToast] = useState(null);
  
  // Simulation state
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [gameState, setGameState] = useState(null);
  const [simPhase, setSimPhase] = useState('select');
  
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [briefTab, setBriefTab] = useState('brief');
  const [gameTab, setGameTab] = useState('overview');
  
  // Anna AI Advisor state
  const [annaVisible, setAnnaVisible] = useState(false);
  const [actionToast, setActionToast] = useState(null);
  const [annaLoading, setAnnaLoading] = useState(false);
  const [annaAdvice, setAnnaAdvice] = useState('');
  const [annaDebriefLoading, setAnnaDebriefLoading] = useState(false);
  const [annaDebrief, setAnnaDebrief] = useState('');
  
  // Session scores (in-memory only)
  const [sessionScores, setSessionScores] = useState([]);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    localStorage.setItem('bizsim-course-lang', lang);
  }, [lang]);

  const selectScenario = (scenario) => {
    setSelectedScenario(scenario);
    setSimPhase('brief');
    setCurrentPage('simulation');
  };

  const beginSimulation = () => {
    setGameState(createApexInitialState(selectedScenario));
    setSimPhase('playing');
    setAnnaVisible(false);
    setGameTab('overview');
    setAnnaAdvice('');
    setAnnaDebrief('');
    setAnnaDebriefLoading(false);
  };


  const handleAction = (action) => {
    setGameState(prev => {
      const newState = { ...prev };
      const scenario = selectedScenario;
      
      switch (action.type) {
        case 'hire':
          newState.team = { 
            ...prev.team, 
            size: prev.team.size + 1,
            morale: Math.min(100, prev.team.morale + 3),
            stress: prev.team.stress + 8, // Hiring causes transition stress
            knowledge: Math.max(prev.team.knowledge - 3, 10) // Dilutes team knowledge slightly
          };
          newState.budget = { ...prev.budget, spent: prev.budget.spent + action.cost };
          break;
          
        case 'fire':
          newState.team = { 
            ...prev.team, 
            size: Math.max(2, prev.team.size - 1),
            morale: Math.max(0, prev.team.morale - 12), // Firing hurts morale more
            stress: prev.team.stress + 10, // Also stressful
            knowledge: Math.max(prev.team.knowledge - 8, 10) // Knowledge loss
          };
          break;
          
        // NEW: Meeting type actions (replacing simple boost_morale)
        case 'meeting_coaching':
          const coachingCost = MEETING_TYPES.coaching.costPerSession * prev.team.size;
          newState.budget = { ...prev.budget, spent: prev.budget.spent + coachingCost };
          newState.team = { 
            ...prev.team, 
            knowledge: Math.min(100, prev.team.knowledge + MEETING_TYPES.coaching.effects.knowledge),
            morale: Math.min(100, prev.team.morale + MEETING_TYPES.coaching.effects.morale),
            stress: Math.max(0, prev.team.stress + MEETING_TYPES.coaching.effects.stress)
          };
          newState.meetings = { ...prev.meetings, coaching: true };
          break;
          
        case 'meeting_standup':
          newState.team = { 
            ...prev.team, 
            productivity: Math.min(1.5, prev.team.productivity + MEETING_TYPES.standup.effects.productivity)
          };
          newState.meetings = { ...prev.meetings, standup: true };
          break;
          
        case 'meeting_status':
          const statusCost = MEETING_TYPES.status.costPerSession;
          newState.budget = { ...prev.budget, spent: prev.budget.spent + statusCost };
          newState.team = { 
            ...prev.team, 
            morale: Math.min(100, prev.team.morale + MEETING_TYPES.status.effects.morale),
            stress: Math.max(0, prev.team.stress + MEETING_TYPES.status.effects.stress)
          };
          newState.meetings = { ...prev.meetings, status: true };
          break;
          
        case 'quality_review':
          newState.budget = { ...prev.budget, spent: prev.budget.spent + action.cost };
          newState.scope = { ...prev.scope, quality: Math.min(100, prev.scope.quality + 5) };
          newState.team = { ...prev.team, knowledge: Math.min(100, prev.team.knowledge + 2) };
          break;
          
        case 'crunch':
          newState.budget = { ...prev.budget, spent: prev.budget.spent + action.cost };
          newState.scope = { ...prev.scope, completed: prev.scope.completed + 0.5 };
          newState.team = { 
            ...prev.team, 
            morale: Math.max(10, prev.team.morale - 15),
            stress: Math.min(100, prev.team.stress + 20) // Crunch is very stressful
          };
          break;
          
        case 'team_building':
          newState.budget = { ...prev.budget, spent: prev.budget.spent + action.cost };
          newState.team = { 
            ...prev.team, 
            morale: Math.min(100, prev.team.morale + 12),
            stress: Math.max(0, prev.team.stress - 8)
          };
          break;
          
        // NEW: Prototype action
        case 'build_prototype':
          if (scenario.hasPrototyping && prev.prototypesBuilt < prev.maxPrototypes) {
            const protoCost = PROTOTYPE_COST[scenario.id];
            newState.budget = { ...prev.budget, spent: prev.budget.spent + protoCost.budget };
            newState.prototypesBuilt = prev.prototypesBuilt + 1;
            newState.team = { 
              ...prev.team, 
              knowledge: Math.min(100, prev.team.knowledge + 10) // Prototypes build knowledge
            };
            // Slight progress penalty for time spent
            newState.scope = { 
              ...prev.scope, 
              completed: Math.max(0, prev.scope.completed - (protoCost.time * 0.03))
            };
          }
          break;
          
        // NEW: Adjust schedule (with consistency tracking)
        case 'extend_deadline':
          if (prev.week > 2) {
            newState.scheduleChanges = prev.scheduleChanges + 1;
            const penalty = calculateScheduleConsistencyPenalty(newState.scheduleChanges);
            newState.team = {
              ...prev.team,
              morale: Math.max(10, prev.team.morale + penalty.morale),
              stress: Math.min(100, prev.team.stress + penalty.stress)
            };
          }
          newState.schedule = { 
            ...prev.schedule, 
            deadline: prev.schedule.deadline + 1 
          };
          break;
      }
      
      return newState;
    });

    // Toast feedback
    const toasts = {
      hire: { msg: lang === 'en' ? '✅ New team member hired! → Morale +3, Stress +8, Knowledge −3' : '✅ Nouveau membre embauché ! → Moral +3, Stress +8, Connaissances −3', type: 'success' },
      fire: { msg: lang === 'en' ? '⚠️ Team member removed. → Morale −12, Stress +10, Knowledge −8' : '⚠️ Membre retiré. → Moral −12, Stress +10, Connaissances −8', type: 'warn' },
      quality_review: { msg: lang === 'en' ? '✅ Quality review done! → Quality +5, Knowledge +2 ($10K)' : '✅ Revue qualité ! → Qualité +5, Connaissances +2 (10K$)', type: 'success' },
      crunch: { msg: lang === 'en' ? '🔥 Crunch mode! → Progress +0.5, Morale −15, Stress +20 ($15K)' : '🔥 Mode intensif ! → Progrès +0.5, Moral −15, Stress +20 (15K$)', type: 'warn' },
      team_building: { msg: lang === 'en' ? '🤝 Team building! → Morale +12, Stress −8 ($8K)' : '🤝 Consolidation d\'équipe ! → Moral +12, Stress −8 (8K$)', type: 'success' },
      build_prototype: { msg: lang === 'en' ? '🔬 Prototype built! → Knowledge +10, reduces future risks' : '🔬 Prototype construit ! → Connaissances +10, réduit les risques futurs', type: 'success' },
      extend_deadline: { msg: lang === 'en' ? '📅 Deadline extended +1 week (schedule penalty applies)' : '📅 Échéance prolongée +1 semaine (pénalité de calendrier)', type: 'info' },
      meeting_coaching: { msg: lang === 'en' ? '🎓 Coaching session held! → Knowledge +8, Morale +3, Stress −2' : '🎓 Session de coaching ! → Connaissances +8, Moral +3, Stress −2', type: 'success' },
      meeting_standup: { msg: lang === 'en' ? '📋 Standup meeting held! → Productivity +2%, Coordination +10' : '📋 Standup effectué ! → Productivité +2%, Coordination +10', type: 'success' },
      meeting_status: { msg: lang === 'en' ? '📊 Status review held! → Morale +5, Stress −5, Stakeholder +10' : '📊 Revue de statut ! → Moral +5, Stress −5, Parties prenantes +10', type: 'success' },
    };
    const t = toasts[action.type];
    if (t) showToast(t.msg, t.type);
  };

  // ENHANCED WEEK ADVANCEMENT with causal model
  const advanceWeek = () => {
    // Course edition: all weeks fully unlocked
    setGameState(prev => {
      const scenario = selectedScenario;
      const progress = calculateWeeklyProgress(prev.team, prev.scope, prev);
      const weeklyCost = prev.team.size * scenario.weeklyCostPerPerson;
      
      // Calculate new stress based on causal factors
      const newStress = calculateStress(prev, scenario);
      
      // Stress affects morale
      const stressAdjustedMorale = calculateMoraleFromStress(prev.team.morale, newStress);
      
      // Small natural morale drift
      const moraleDrift = (Math.random() - 0.5) * 4;
      
      const newState = {
        ...prev,
        week: prev.week + 1,
        budget: { ...prev.budget, spent: prev.budget.spent + weeklyCost },
        scope: { 
          ...prev.scope, 
          completed: prev.scope.completed + (progress * prev.scope.totalFeatures) 
        },
        team: { 
          ...prev.team, 
          morale: Math.max(10, Math.min(100, stressAdjustedMorale + moraleDrift)),
          stress: newStress
        },
        // Track morale history for team process score
        moraleHistory: [...prev.moraleHistory, stressAdjustedMorale + moraleDrift],
        // Reset weekly meeting flags
        meetings: { coaching: false, standup: false, status: false }
      };
      
      // CHECK FOR CAUSAL EVENTS (condition-based, not random)
      if (prev.week < prev.totalWeeks) {
        const availableEvents = scenario.causalEvents.filter(e => 
          !prev.triggeredEvents.includes(e.id) && 
          e.triggerCondition(newState)
        );
        
        if (availableEvents.length > 0) {
          // Pick the most relevant event (first one that triggers)
          const event = availableEvents[0];
          
          // If event has prototypeModifier and prototypes were built, modify effects
          if (event.prototypeModifier && prev.prototypesBuilt > 0) {
            // Create modified event with reduced severity
            const modifiedEvent = {
              ...event,
              description: event.description + ` (Severity reduced by ${prev.prototypesBuilt} prototype(s))`,
              options: event.options.map(opt => ({
                ...opt,
                effects: Object.fromEntries(
                  Object.entries(opt.effects).map(([key, val]) => {
                    // Reduce negative effects based on prototypes built
                    if (val < 0) {
                      return [key, Math.round(val * (1 - prev.prototypesBuilt * 0.2))];
                    }
                    return [key, val];
                  })
                )
              }))
            };
            newState.currentEvent = modifiedEvent;
          } else {
            newState.currentEvent = event;
          }
          newState.gamePhase = 'event';
          newState.triggeredEvents = [...prev.triggeredEvents, event.id];
        }
      }
      
      // Check for game end
      if (newState.scope.completed >= newState.scope.totalFeatures || newState.week > newState.totalWeeks + 3) {
        const finalScore = calculateScore(newState);
        const grade = getGrade(finalScore);
        
        // Save score in session memory
        setSessionScores(prev => [...prev, {
          scenarioId: selectedScenario.id,
          scenario: selectedScenario.title,
          score: finalScore,
          grade,
          completedAt: new Date().toISOString()
        }]);
        
        setSimPhase('ended');
      }
      
      return newState;
    });
  };

  const handleEventChoice = (option) => {
    setGameState(prev => {
      const effects = option.effects;
      const newState = {
        ...prev,
        gamePhase: 'playing',
        currentEvent: null,
        decisions: [...prev.decisions, { eventId: prev.currentEvent.id, choice: option.id, week: prev.week }]
      };
      
      // Apply all effects
      if (effects.scope) newState.scope = { ...prev.scope, totalFeatures: Math.max(1, prev.scope.totalFeatures + effects.scope) };
      if (effects.budget) newState.budget = { ...prev.budget, spent: prev.budget.spent + Math.abs(effects.budget) };
      if (effects.schedule) newState.schedule = { ...prev.schedule, deadline: Math.max(1, prev.schedule.deadline + effects.schedule) };
      if (effects.morale) newState.team = { ...prev.team, morale: Math.max(5, Math.min(100, prev.team.morale + effects.morale)) };
      if (effects.productivity) newState.team = { ...newState.team, productivity: Math.max(0.4, Math.min(1.6, prev.team.productivity + effects.productivity)) };
      if (effects.quality) newState.scope = { ...newState.scope, quality: Math.max(0, Math.min(100, prev.scope.quality + effects.quality)) };
      if (effects.team) newState.team = { ...newState.team, size: Math.max(2, prev.team.size + effects.team) };
      if (effects.stress) newState.team = { ...newState.team, stress: Math.max(0, Math.min(100, prev.team.stress + effects.stress)) };
      if (effects.knowledge) newState.team = { ...newState.team, knowledge: Math.max(0, Math.min(100, prev.team.knowledge + effects.knowledge)) };
      
      return newState;
    });
  };

  // ============================================
  // RENDER COMPONENTS
  // ============================================


  // ============================================

  // ============================================
  // NAVBAR — McGill Course Theme (no auth)
  // ============================================
  
  const renderNavbar = () => (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0.75rem 2rem',
      background: '#ffffff',
      borderBottom: '1px solid #dee2e6',
      position: 'sticky', top: 0, zIndex: 100,
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
        onClick={() => { setCurrentPage('home'); setSimPhase('select'); setGameState(null); }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: 'linear-gradient(135deg, #ED1B2F 0%, #c41424 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '18px', color: '#fff', fontWeight: 700
        }}>B</div>
        <span style={{ fontWeight: 700, fontSize: '1.1rem', color: '#1a1a2e' }}>BizSim</span>
        <span style={{
          background: '#ED1B2F', color: '#fff', padding: '2px 8px',
          borderRadius: '4px', fontSize: '0.7rem', fontWeight: 600
        }}>YCBS 288</span>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
          style={{
            padding: '6px 12px', borderRadius: '8px', border: '1px solid #dee2e6',
            background: '#f8f9fa', color: '#495057', cursor: 'pointer',
            fontSize: '0.85rem', fontWeight: 500
          }}
        >{lang === 'en' ? 'FR' : 'EN'}</button>
      </div>
    </nav>
  );


  // ============================================
  // HOME — Direct scenario selection
  // ============================================
  
  const renderHome = () => (
    <div style={{ minHeight: '100vh', background: '#ffffff' }}>
      {renderNavbar()}
      
      {/* Hero */}
      <section style={{
        padding: '3rem 2rem', textAlign: 'center',
        background: 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(237, 27, 47, 0.08)', color: '#ED1B2F',
            padding: '6px 16px', borderRadius: '20px', fontSize: '0.85rem',
            fontWeight: 600, marginBottom: '1.5rem'
          }}>
            🎯 YCBS 288 — Strategic Project Leadership
          </div>
          
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.15, marginBottom: '1rem', color: '#1a1a2e' }}>
            {lang === 'en' ? 'Project Management Simulation' : 'Simulation de gestion de projet'}
          </h1>
          
          <p style={{ fontSize: '1.1rem', color: '#495057', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '650px', margin: '0 auto 2rem' }}>
            {lang === 'en' 
              ? 'You are the PM. Balance budget, schedule, scope, quality, and team dynamics across 12 weeks. AI coach Anna is available to guide your decisions.'
              : 'Vous êtes le GP. Équilibrez budget, calendrier, périmètre, qualité et dynamique d\'équipe pendant 12 semaines. L\'IA coach Anna guide vos décisions.'}
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '2rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ED1B2F' }}>4</div>
              <div style={{ color: '#5c636a', fontSize: '0.85rem' }}>{lang === 'en' ? 'Scenarios' : 'Scénarios'}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ED1B2F' }}>12</div>
              <div style={{ color: '#5c636a', fontSize: '0.85rem' }}>{lang === 'en' ? 'Weeks' : 'Semaines'}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ED1B2F' }}>AI</div>
              <div style={{ color: '#5c636a', fontSize: '0.85rem' }}>Coach Anna</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Scenario Cards */}
      <section style={{ padding: '2rem 2rem 3rem', maxWidth: '960px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '1.25rem', color: '#1a1a2e', textAlign: 'center' }}>
          {lang === 'en' ? 'Select a Scenario to Begin' : 'Choisissez un scénario pour commencer'}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          {Object.values(APEX_SCENARIOS).map(s => (
            <div key={s.id} style={{
              background: '#fff', borderRadius: '14px', padding: '1.5rem',
              border: '1px solid #dee2e6', boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              cursor: 'pointer', transition: 'box-shadow 0.2s, transform 0.2s'
            }}
              onClick={() => selectScenario(APEX_SCENARIOS[s.id])}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 20px rgba(237,27,47,0.12)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{s.icon}</div>
              <h3 style={{ fontWeight: 700, color: '#1a1a2e', marginBottom: '4px', fontSize: '1.1rem' }}>{s.title}</h3>
              <p style={{ fontSize: '0.85rem', color: '#5c636a', marginBottom: '8px' }}>{s.subtitle}</p>
              <p style={{ fontSize: '0.8rem', color: '#495057', marginBottom: '12px', lineHeight: 1.5 }}>{s.description.slice(0, 100)}...</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{
                  padding: '3px 12px', borderRadius: '12px',
                  background: s.difficultyColor + '15', color: s.difficultyColor,
                  fontSize: '0.75rem', fontWeight: 600
                }}>{s.difficulty}</span>
                <span style={{ color: '#ED1B2F', fontWeight: 600, fontSize: '0.85rem' }}>
                  {lang === 'en' ? 'Play →' : 'Jouer →'}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Session scores */}
        {sessionScores.length > 0 && (
          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem', color: '#1a1a2e' }}>
              {lang === 'en' ? 'Your Session Results' : 'Résultats de la session'}
            </h3>
            <div style={{
              background: '#fff', borderRadius: '12px', border: '1px solid #dee2e6',
              overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
            }}>
              {sessionScores.map((s, i) => (
                <div key={i} style={{
                  padding: '12px 16px', display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: i < sessionScores.length - 1 ? '1px solid #f1f3f5' : 'none'
                }}>
                  <span style={{ fontWeight: 600, color: '#1a1a2e' }}>{s.scenario}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: 700, color: '#1a1a2e' }}>{s.score}</span>
                    <span style={{
                      padding: '2px 8px', borderRadius: '6px', fontWeight: 700, fontSize: '0.85rem',
                      background: s.grade?.startsWith('A') ? '#d3f9d8' : s.grade?.startsWith('B') ? '#fff3bf' : '#ffe3e3',
                      color: s.grade?.startsWith('A') ? '#2b8a3e' : s.grade?.startsWith('B') ? '#e67700' : '#c92a2a'
                    }}>{s.grade}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
      
      {/* Footer */}
      <footer style={{
        textAlign: 'center', padding: '2rem',
        borderTop: '1px solid #dee2e6', color: '#5c636a', fontSize: '0.85rem'
      }}>
        <p>YCBS 288 — Strategic Project Leadership</p>
        <p style={{ marginTop: '4px' }}>McGill School of Continuing Studies · Instructor: Sylvain Gauthier</p>
      </footer>
    </div>
  );

  const annaAvatar = (size = 48) => (
    <img 
      src="/anna-avatar.png" 
      alt="Anna — PM Advisor" 
      className="anna-avatar-img"
      style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover', objectPosition: 'center top' }}
    />
  );

  const askAnna = async () => {
    if (!gameState || annaLoading) return;
    setAnnaVisible(true);
    setAnnaLoading(true);
    setAnnaAdvice('');

    const gs = gameState;
    const scenario = selectedScenario;
    const budgetRemaining = gs.budget.total - gs.budget.spent;
    const budgetPercent = (budgetRemaining / gs.budget.total) * 100;
    const scopePercent = (gs.scope.completed / gs.scope.totalFeatures) * 100;
    const weeksRemaining = gs.schedule.deadline - gs.week + 1;
    const isOverBudget = gs.budget.spent > gs.budget.total;
    const isBehindSchedule = weeksRemaining < (100 - scopePercent) / 10;

    const langInstruction = lang === 'fr' 
      ? `\n\nIMPORTANT: Respond ENTIRELY in French. Use these exact French section headers: ÉTAT DU PROJET, PRIORITÉS CLÉS, ATTENTION, PRINCIPE GP` 
      : '';

    const sectionFormat = lang === 'fr' ? `
ÉTAT DU PROJET
2-3 phrases résumant leur position actuelle en utilisant la terminologie GP (concepts IPC/IPD, triple contrainte). Soyez précis sur ce qui fonctionne et ce qui est à risque.

PRIORITÉS CLÉS
3-4 recommandations spécifiques et actionnables classées par impact. Chacune doit être une phrase claire avec une action spécifique (ex: "Organisez une session de coaching pour augmenter les connaissances de l'équipe de ${Math.round(gs.team.knowledge)}% — le taux d'erreur diminue significativement au-dessus de 60%"). Référez-vous aux mécaniques du jeu.

ATTENTION
1-2 risques ou pièges à éviter cette semaine. Référencez les seuils spécifiques (ex: "Le moral sous 40% déclenche des événements de roulement").

PRINCIPE GP
Un principe réel de gestion de projet qui s'applique à leur situation actuelle. Rendez-le éducatif et connecté aux concepts PMP/PMBOK.

Soyez concis, direct et encourageant. Utilisez les chiffres spécifiques de leurs données. C'est une simulation éducative, aidez-les à apprendre les principes de GP.` : `
PROJECT STATUS
2-3 sentences summarizing their current position using PM terminology (SPI/CPI concepts, triple constraint). Be specific about what's working and what's at risk.

TOP PRIORITIES
3-4 specific, actionable recommendations ranked by impact. Each should be one clear sentence with a specific action (e.g., "Run a coaching meeting to boost team knowledge from ${Math.round(gs.team.knowledge)}% — error rates drop significantly above 60%"). Reference actual game mechanics.

WATCH OUT
1-2 risks or pitfalls to avoid this week. Reference specific thresholds (e.g., "Morale below 40% triggers turnover events").

PM INSIGHT
One real-world project management principle that applies to their current situation. Make it educational and connected to PMP/PMBOK concepts.

Keep it concise, direct, and encouraging. Use specific numbers from their data. This is an educational simulation so help them learn PM principles.`;

    const prompt = `You are ANNA, a sharp and experienced project management advisor in a PM simulation game. You speak with confidence and warmth — direct, analytical, encouraging, and grounded in PM best practices (PMBOK, Agile, EVM). You are the student's AI coach.${langInstruction}

A student is managing "${scenario.projectName}" at ${scenario.company}. This is a ${scenario.id.replace(/_/g, ' ')} project.

Here is their current situation at Week ${gs.week} of ${gs.totalWeeks}:

PROJECT HEALTH:
- Budget: $${(budgetRemaining / 1000).toFixed(0)}K remaining of $${(gs.budget.total / 1000).toFixed(0)}K total (${Math.round(budgetPercent)}% left) ${isOverBudget ? '⚠️ OVER BUDGET' : ''}
- Scope: ${Math.round(scopePercent)}% complete (${Math.round(gs.scope.completed)} of ${gs.scope.totalFeatures} ${scenario.deliverable})
- Schedule: ${weeksRemaining} weeks remaining until deadline ${isBehindSchedule ? '⚠️ BEHIND SCHEDULE' : ''}
- Quality: ${Math.round(gs.scope.quality)}/100

TEAM STATUS:
- Team Size: ${gs.team.size} members
- Morale: ${Math.round(gs.team.morale)}%
- Stress: ${Math.round(gs.team.stress)}%
- Knowledge: ${Math.round(gs.team.knowledge)}%
- Productivity: ${(gs.team.productivity * 100).toFixed(0)}%

SCHEDULE CHANGES: ${gs.scheduleChanges} deadline extensions made
PROTOTYPES BUILT: ${gs.prototypesBuilt || 0}${scenario.hasPrototyping ? ` of ${gs.maxPrototypes} max` : ''}
EVENTS TRIGGERED: ${gs.triggeredEvents?.length || 0}

Provide strategic advice in this exact format (use these exact section headers):
${sectionFormat}`;

    try {
      const response = await fetch('/api/ai-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, max_tokens: 1000 })
      });
      const data = await response.json();
      if (!response.ok) {
        setAnnaAdvice(`⚠️ Error: ${data.error || 'Unknown error'} (Status ${response.status})`);
      } else {
        setAnnaAdvice(data.text || 'Unable to generate analysis.');
      }
    } catch (err) {
      setAnnaAdvice(`⚠️ Connection error: ${err.message}`);
    }
    setAnnaLoading(false);
  };

  const askAnnaDebrief = async (finalScore, grade, gs) => {
    if (annaDebriefLoading || annaDebrief) return;
    setAnnaDebriefLoading(true);

    const scenario = selectedScenario;
    const budgetOnTarget = gs.budget.spent <= gs.budget.total;
    const scheduleOnTarget = gs.week <= gs.schedule.deadline;
    const scopeComplete = gs.scope.completed >= gs.scope.totalFeatures * 0.95;
    const avgMorale = gs.moraleHistory.reduce((a, b) => a + b, 0) / gs.moraleHistory.length;

    const debriefLangInstruction = lang === 'fr'
      ? `\n\nIMPORTANT: Respond ENTIRELY in French. Use these exact French section headers: RÉSUMÉ EXÉCUTIF, POINTS FORTS, AXES D'AMÉLIORATION, LIEN PMP, MOT FINAL`
      : '';

    const debriefSectionFormat = lang === 'fr' ? `
RÉSUMÉ EXÉCUTIF
Une évaluation de 2-3 phrases de leur performance globale en GP. Référencez leur note et ce qu'elle signifie.

POINTS FORTS
2-3 forces spécifiques démontrées pendant la simulation, liées aux compétences GP.

AXES D'AMÉLIORATION
2-3 domaines spécifiques où ils pourraient s'améliorer, avec des conseils actionnables pour la prochaine fois.

LIEN PMP
Connectez leur expérience à 2-3 domaines de connaissances ou processus PMP/PMBOK réels. Aidez-les à voir comment la simulation correspond au contenu de certification.

MOT FINAL
Une pensée finale mémorable — motivante s'ils ont bien réussi, encourageante s'ils ont eu des difficultés. Gardez-la personnelle et spécifique à leurs résultats.

Soyez concis, éducatif et encourageant. Utilisez la terminologie GP naturellement.` : `
EXECUTIVE SUMMARY
A 2-3 sentence assessment of their overall PM performance. Reference their grade and what it means.

WHAT WENT WELL
2-3 specific strengths shown during the simulation, tied to PM competencies.

AREAS FOR GROWTH  
2-3 specific areas where they could improve, with actionable advice for next time.

PMP CONNECTION
Connect their experience to 2-3 real PMP/PMBOK knowledge areas or processes. Help them see how the simulation maps to certification content.

FINAL WORD
One memorable closing thought — motivating if they did well, encouraging if they struggled. Keep it personal and specific to their results.

Be concise, educational, and encouraging. Use PM terminology naturally.`;

    const prompt = `You are ANNA, a sharp and experienced project management advisor giving a final simulation debrief. You speak with warmth, directness, and genuine insight. Be educational, specific, and memorable.${debriefLangInstruction}

A student just completed the "${scenario.projectName}" PM simulation (${scenario.id.replace(/_/g, ' ')} industry).

FINAL RESULTS:
- Grade: ${grade} | Score: ${finalScore}/1000
- Scope: ${Math.round(gs.scope.completed)} of ${gs.scope.totalFeatures} ${scenario.deliverable} delivered (${Math.round((gs.scope.completed / gs.scope.totalFeatures) * 100)}%)
- Schedule: ${scheduleOnTarget ? 'On time' : `${gs.week - gs.schedule.deadline} weeks late`} (Week ${gs.week} vs deadline Week ${gs.schedule.deadline})
- Budget: $${(gs.budget.spent / 1000).toFixed(0)}K spent of $${(gs.budget.total / 1000).toFixed(0)}K (${budgetOnTarget ? 'Under budget' : 'Over budget'})
- Quality: ${Math.round(gs.scope.quality)}/100
- Average Team Morale: ${Math.round(avgMorale)}%
- Schedule Changes: ${gs.scheduleChanges}
- Events Managed: ${gs.triggeredEvents?.length || 0}
- Prototypes Built: ${gs.prototypesBuilt || 0}

Provide a debrief in this format:
${debriefSectionFormat}`;

    try {
      const response = await fetch('/api/ai-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, max_tokens: 1200 })
      });
      const data = await response.json();
      if (!response.ok) {
        setAnnaDebrief(`⚠️ Error: ${data.error || 'Unknown error'} (Status ${response.status})`);
      } else {
        setAnnaDebrief(data.text || 'Unable to generate debrief.');
      }
    } catch (err) {
      setAnnaDebrief(`⚠️ Connection error: ${err.message}`);
    }
    setAnnaDebriefLoading(false);
  };

  const renderAnnaAdvice = (text) => {
    if (!text) return null;
    
    // Clean markdown bold markers from section headers
    const cleaned = text.replace(/\*\*/g, '');
    
    // Split on section headers
    const sectionHeaders = ['PROJECT STATUS', 'TOP PRIORITIES', 'WATCH OUT', 'PM INSIGHT', 'EXECUTIVE SUMMARY', 'WHAT WENT WELL', 'AREAS FOR GROWTH', 'PMP CONNECTION', 'FINAL WORD',
      'ÉTAT DU PROJET', 'PRIORITÉS CLÉS', 'ATTENTION', 'PRINCIPE GP', 'RÉSUMÉ EXÉCUTIF', 'POINTS FORTS', "AXES D'AMÉLIORATION", 'LIEN PMP', 'MOT FINAL'];
    const regex = new RegExp(`(${sectionHeaders.join('|')})`, 'g');
    const parts = cleaned.split(regex).filter(s => s.trim());
    
    const sections = [];
    for (let i = 0; i < parts.length; i++) {
      if (sectionHeaders.includes(parts[i].trim())) {
        sections.push({
          title: parts[i].trim(),
          body: (parts[i + 1] || '').trim()
        });
        i++; // skip body part
      }
    }
    
    if (sections.length === 0) {
      // Fallback: just render as paragraphs
      return <p style={{ color: '#495057', lineHeight: 1.7, whiteSpace: 'pre-line', fontSize: '0.92rem' }}>{cleaned}</p>;
    }
    
    const headerIcons = {
      'PROJECT STATUS': '📊', 'ÉTAT DU PROJET': '📊',
      'TOP PRIORITIES': '🎯', 'PRIORITÉS CLÉS': '🎯',
      'WATCH OUT': '⚠️', 'ATTENTION': '⚠️',
      'PM INSIGHT': '💡', 'PRINCIPE GP': '💡',
      'EXECUTIVE SUMMARY': '📋', 'RÉSUMÉ EXÉCUTIF': '📋',
      'WHAT WENT WELL': '✅', 'POINTS FORTS': '✅',
      'AREAS FOR GROWTH': '📈', "AXES D'AMÉLIORATION": '📈',
      'PMP CONNECTION': '🎓', 'LIEN PMP': '🎓',
      'FINAL WORD': '🏁', 'MOT FINAL': '🏁'
    };
    
    return sections.map((section, i) => (
      <div key={i} style={{ marginBottom: '20px' }}>
        <h4 style={{ 
          color: '#14b8a6', 
          fontSize: '0.82rem', 
          fontWeight: 700, 
          letterSpacing: '0.06em', 
          marginBottom: '8px', 
          textTransform: 'uppercase',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <span>{headerIcons[section.title] || '▸'}</span>
          {section.title}
        </h4>
        <p style={{ 
          color: '#495057', 
          lineHeight: 1.75, 
          whiteSpace: 'pre-line', 
          fontSize: '0.92rem',
          paddingLeft: '4px'
        }}>
          {section.body}
        </p>
      </div>
    ));
  };



  const renderSimulation = () => {
    if (simPhase === 'select') {
      return (
        <div className="sim-select-page">
          {renderNavbar()}
          
          {/* Background shapes */}
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
          
          <div className="sim-select-container">
            <button className="back-link" onClick={() => setCurrentPage('catalog')}>← {lang === 'en' ? 'Back to Library' : 'Retour à la bibliothèque'}</button>
            
            {/* Main Title */}
            <div className="sim-select-header">
              <h1>{lang === 'en' ? 'Choose Your Industry' : 'Choisissez votre industrie'}</h1>
              <p>{lang === 'en' ? 'Each scenario offers unique PM challenges and learning opportunities' : 'Chaque scénario offre des défis uniques et des opportunités d\'apprentissage'}</p>
            </div>
            
            {/* Industry Cards Grid */}
            <div className="industry-cards-grid">
              {Object.values(APEX_SCENARIOS).map(scenario => {
                const gradientColors = {
                  tech_startup: { from: '#3b82f6', to: '#60a5fa' },
                  live_show: { from: '#ec4899', to: '#f472b6' },
                  construction: { from: '#f59e0b', to: '#fbbf24' },
                  rd_innovation: { from: '#10b981', to: '#34d399' }
                };
                const colors = gradientColors[scenario.id] || gradientColors.tech_startup;
                
                // French translations for scenarios
                const scenarioTranslations = {
                  tech_startup: {
                    title: 'Startup Tech',
                    subtitle: 'Lancement de produit logiciel',
                    description: 'Vous êtes gestionnaire de projet chez Nexus Technologies. Livrez une nouvelle plateforme SaaS tout en gérant la dynamique d\'équipe et les défis techniques.'
                  },
                  live_show: {
                    title: 'Spectacle vivant',
                    subtitle: 'Production de spectacle en tournée',
                    description: 'Producteur exécutif chez Stellar Productions. Lancez un spectacle de tournée ambitieux tout en gérant les talents créatifs et les exigences de sécurité.'
                  },
                  construction: {
                    title: 'Construction',
                    subtitle: 'Projet de bâtiment commercial',
                    description: 'Gestionnaire de projet chez UrbanCore Construction. Construisez un immeuble de 12 étages à usage mixte tout en gérant les permis, les inspections et les sous-traitants.'
                  },
                  rd_innovation: {
                    title: 'Innovation R&D',
                    subtitle: 'Développement de nouvelle technologie',
                    description: 'Dirigez un projet R&D de pointe avec une grande incertitude. Le prototypage est essentiel pour révéler les problèmes tôt.'
                  }
                };
                
                const tr = scenarioTranslations[scenario.id];
                const title = lang === 'fr' && tr ? tr.title : scenario.title;
                const subtitle = lang === 'fr' && tr ? tr.subtitle : scenario.subtitle;
                const description = lang === 'fr' && tr ? tr.description : scenario.description;
                const difficulty = lang === 'fr' ? 
                  (scenario.difficulty === 'Standard' ? 'Standard' : 
                   scenario.difficulty === 'Advanced' ? 'Avancé' : 
                   scenario.difficulty === 'Expert' ? 'Expert' : scenario.difficulty) 
                  : scenario.difficulty;
                
                return (
                  <div key={scenario.id} className="industry-card">
                    {/* Gradient Header */}
                    <div className="industry-card-header" style={{ background: `linear-gradient(135deg, ${colors.from} 0%, ${colors.to} 100%)` }}>
                      <span className="industry-icon">{scenario.icon}</span>
                    </div>
                    
                    {/* Card Body */}
                    <div className="industry-card-body">
                      <h3>{title}</h3>
                      <p className="industry-subtitle" style={{ color: colors.from }}>{subtitle}</p>
                      
                      <div className="industry-challenge">
                        <span className="challenge-label">{lang === 'en' ? 'Challenge:' : 'Défi:'}</span>
                        <p>{description}</p>
                      </div>
                      
                      {/* Meta Info */}
                      <div className="industry-meta">
                        <span>📅 {scenario.initial.weeks} {lang === 'en' ? 'weeks' : 'semaines'}</span>
                        <span>💰 ${(scenario.initial.budget / 1000000).toFixed(1)}M</span>
                      </div>
                      <div className="industry-meta">
                        <span>👥 {scenario.initial.teamSize} {lang === 'en' ? 'team members' : 'membres'}</span>
                      </div>
                      
                      {/* Difficulty Badge */}
                      <div className="industry-badge" style={{ backgroundColor: `${colors.from}20`, color: colors.from }}>
                        {difficulty}
                      </div>
                    </div>
                    
                    {/* Card Footer */}
                    <div className="industry-card-footer">
                      <button 
                        className="industry-start-btn" 
                        style={{ background: `linear-gradient(135deg, ${colors.from} 0%, ${colors.to} 100%)` }}
                        onClick={() => selectScenario(scenario)}
                      >
                        {lang === 'en' ? 'Start Simulation →' : 'Démarrer →'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Bottom Info */}
            <div className="sim-select-footer">
              <p>🎓 {lang === 'en' ? 'All scenarios are PMP/PMBOK aligned for certification preparation' : 'Tous les scénarios sont alignés PMP/PMBOK pour la préparation à la certification'}</p>
              
              <div className="sim-stats-bar">
                <div className="sim-stat">
                  <span className="sim-stat-num">4</span>
                  <span className="sim-stat-label">{lang === 'en' ? 'Industries' : 'Industries'}</span>
                </div>
                <div className="sim-stat">
                  <span className="sim-stat-num">1000+</span>
                  <span className="sim-stat-label">{lang === 'en' ? 'PMs Trained' : 'PMs formés'}</span>
                </div>
                <div className="sim-stat">
                  <span className="sim-stat-num purple">PMP</span>
                  <span className="sim-stat-label">{lang === 'en' ? 'Aligned' : 'Aligné'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (simPhase === 'brief') {
      // Generate scenario-specific brief content
      const getProjectBrief = () => {
        const briefs = {
          tech_startup: {
            context: `You are a senior project manager at ${selectedScenario.company}, a fast-growing technology company specializing in cloud-based business solutions. The company has identified a significant market opportunity for a new SaaS platform that will compete with established players.`,
            challenge: `Your CEO has tasked you with assembling and leading a product development team to deliver this platform. Market analysis suggests that competitors are working on similar solutions, putting pressure on you and your team to deliver a high-quality product that can capture market share.`,
            deliverables: [
              { level: 1, name: 'Core Platform', desc: 'Basic user management, authentication, and data storage', tasks: 3 },
              { level: 2, name: 'Standard Features', desc: 'Dashboard, reporting, and API integrations', tasks: 4 },
              { level: 3, name: 'Advanced Features', desc: 'Analytics, automation, and multi-tenant support', tasks: 3 },
              { level: 4, name: 'Premium Features', desc: 'AI-powered insights and enterprise security', tasks: 2 }
            ]
          },
          live_show: {
            context: `You are the Executive Producer at ${selectedScenario.company}, a world-renowned live entertainment company. The company has greenlit an ambitious new touring show that combines acrobatics, music, and cutting-edge technology.`,
            challenge: `Your artistic director has a bold vision for "${selectedScenario.projectName}" but the technical and creative demands are significant. You must manage a diverse team of performers, technicians, and designers while ensuring safety standards are met and the show is ready for its premiere.`,
            deliverables: [
              { level: 1, name: 'Foundation Acts', desc: 'Opening sequence and core ensemble performances', tasks: 2 },
              { level: 2, name: 'Feature Acts', desc: 'Aerial sequences and specialty performances', tasks: 2 },
              { level: 3, name: 'Technical Integration', desc: 'Lighting, sound, and projection mapping', tasks: 2 },
              { level: 4, name: 'Grand Finale', desc: 'Climactic sequence with full cast integration', tasks: 2 }
            ]
          },
          construction: {
            context: `You are the Project Manager at ${selectedScenario.company}, a commercial construction company with a strong reputation for quality. The company has won the contract to build a new mixed-use development in a prime urban location.`,
            challenge: `The "${selectedScenario.projectName}" project involves a 12-story building with retail, office, and residential spaces. You must navigate permitting, weather challenges, subcontractor coordination, and safety requirements while meeting stakeholder expectations.`,
            deliverables: [
              { level: 1, name: 'Foundation & Parking', desc: 'Underground parking and structural foundation', tasks: 3 },
              { level: 2, name: 'Core Structure', desc: 'Floors 1-6 with retail and office space', tasks: 4 },
              { level: 3, name: 'Upper Floors', desc: 'Floors 7-10 residential units', tasks: 3 },
              { level: 4, name: 'Penthouse & Systems', desc: 'Floors 11-12 and building systems integration', tasks: 2 }
            ]
          },
          rd_innovation: {
            context: `You are the Lead Project Manager at ${selectedScenario.company}, a cutting-edge research and development laboratory. The company has secured funding to develop a breakthrough quantum sensing technology with applications in medical imaging and security.`,
            challenge: `The "${selectedScenario.projectName}" project is highly innovative with significant technical uncertainty. Your team of scientists and engineers must push the boundaries of current technology while managing the risks inherent in R&D work. Prototyping will be essential to surface problems early.`,
            deliverables: [
              { level: 1, name: 'Proof of Concept', desc: 'Demonstrate basic quantum sensing capability', tasks: 2 },
              { level: 2, name: 'Prototype Alpha', desc: 'Functional prototype with core features', tasks: 3 },
              { level: 3, name: 'Prototype Beta', desc: 'Refined prototype with improved accuracy', tasks: 3 },
              { level: 4, name: 'Production Ready', desc: 'Manufacturable design with documentation', tasks: 2 }
            ]
          }
        };
        return briefs[selectedScenario.id] || briefs.tech_startup;
      };

      const brief = getProjectBrief();
      const totalTasks = brief.deliverables.reduce((sum, d) => sum + d.tasks, 0);

      return (
        <div className="sim-page">
          {renderNavbar()}
          <div className="brief-container hbp-style">
            <button className="back-link" onClick={() => { setSimPhase('select'); setBriefTab('brief'); }}>← {lang === 'en' ? 'Back to Scenarios' : 'Retour aux scénarios'}</button>
            
            <div className="brief-header">
              <div className="brief-icon">{selectedScenario.icon}</div>
              <div>
                <h1>{selectedScenario.projectName}</h1>
                <p className="brief-company">{selectedScenario.company}</p>
              </div>
            </div>

            {/* Anna - AI PM Advisor Introduction */}
            <div className="anna-intro">
              <div className="anna-intro-glow"></div>
              <div className="anna-header">
                {annaAvatar()}
                <div>
                  <div className="anna-name">{lang === 'en' ? 'ANNA — Your PM Coach' : 'ANNA — Votre Coach GP'}</div>
                  <div className="anna-title">{lang === 'en' ? 'AI Project Management Advisor' : 'Conseillère IA en gestion de projet'}</div>
                </div>
              </div>
              <div className="anna-speech">
                <p>
                  {lang === 'en' 
                    ? `Welcome, Project Manager. I'm Anna, and I'll be your advisor throughout this simulation. You're about to take the helm of "${selectedScenario.projectName}" at ${selectedScenario.company} — and I've seen projects like this go both ways.`
                    : `Bienvenue, Gestionnaire de projet. Je suis Anna, et je serai votre conseillère tout au long de cette simulation. Vous êtes sur le point de prendre les commandes de « ${selectedScenario.projectName} » chez ${selectedScenario.company} — et j'ai vu des projets comme celui-ci aller dans les deux sens.`
                  }
                </p>
                <div className="anna-highlight">
                  {lang === 'en'
                    ? `💡 Remember the triple constraint: scope, schedule, and budget are interconnected. Push one, and the others will push back. The best PMs I've coached find the balance — they don't chase perfection on all three.`
                    : `💡 Rappelez-vous la triple contrainte : périmètre, calendrier et budget sont interconnectés. Poussez l'un, et les autres résisteront. Les meilleurs GP que j'ai coachés trouvent l'équilibre — ils ne recherchent pas la perfection sur les trois.`
                  }
                </div>
                <p>
                  {lang === 'en'
                    ? `I'll be available throughout the simulation — just click "Ask Anna" whenever you need strategic guidance. Read the brief carefully, understand your objectives, and let's deliver this project. You've got this.`
                    : `Je serai disponible tout au long de la simulation — cliquez simplement sur « Demander à Anna » chaque fois que vous avez besoin de conseils stratégiques. Lisez attentivement le dossier, comprenez vos objectifs, et livrons ce projet. Vous êtes capable.`
                  }
                </p>
              </div>
            </div>

            {/* HBP-Style Tabs */}
            <div className="brief-tabs">
              <button 
                className={`brief-tab ${briefTab === 'brief' ? 'active' : ''}`}
                onClick={() => setBriefTab('brief')}
              >
                {lang === 'en' ? 'Project Brief' : 'Dossier du projet'}
              </button>
              <button 
                className={`brief-tab ${briefTab === 'objectives' ? 'active' : ''}`}
                onClick={() => setBriefTab('objectives')}
              >
                {lang === 'en' ? 'Scenario Objectives' : 'Objectifs du scénario'}
              </button>
              <button 
                className={`brief-tab ${briefTab === 'managing' ? 'active' : ''}`}
                onClick={() => setBriefTab('managing')}
              >
                {lang === 'en' ? 'Managing Your Project' : 'Gérer votre projet'}
              </button>
            </div>

            <div className="brief-tab-content">
              {/* Project Brief Tab */}
              {briefTab === 'brief' && (
                <div className="tab-panel">
                  <h2>{lang === 'en' ? 'Project Brief' : 'Dossier du projet'}: <span className="highlight">{selectedScenario.title}</span></h2>
                  
                  <p className="brief-paragraph">{brief.context}</p>
                  <p className="brief-paragraph">{brief.challenge}</p>

                  <h3>{lang === 'en' ? 'Project Deliverables' : 'Livrables du projet'}</h3>
                  <p>{lang === 'en' 
                    ? `Your project consists of ${selectedScenario.initial.scope} ${selectedScenario.deliverable} organized into progressive levels. Each level builds on the previous, allowing you to adjust scope mid-course if desired.`
                    : `Votre projet consiste en ${selectedScenario.initial.scope} ${selectedScenario.deliverable} organisés en niveaux progressifs. Chaque niveau s'appuie sur le précédent, vous permettant d'ajuster le périmètre en cours de route si désiré.`
                  }</p>
                  
                  <div className="deliverables-list">
                    {brief.deliverables.map((d, i) => (
                      <div key={i} className="deliverable-item">
                        <div className="deliverable-icon">📋</div>
                        <div className="deliverable-content">
                          <strong>LEVEL {d.level}: {d.name.toUpperCase()}</strong>
                          <p>{d.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Scenario Objectives Tab */}
              {briefTab === 'objectives' && (
                <div className="tab-panel">
                  <h2>{lang === 'en' ? 'Scenario Objectives' : 'Objectifs du scénario'}: <span className="highlight">{selectedScenario.title}</span></h2>
                  
                  <p className="brief-paragraph">
                    {lang === 'en' 
                      ? 'Management expects you to deliver this project meeting the targets below. You will be evaluated on your ability to balance scope, schedule, budget, quality, and team wellbeing. Meeting all targets demonstrates strong project management capability.'
                      : 'La direction s\'attend à ce que vous livriez ce projet en atteignant les objectifs ci-dessous. Vous serez évalué sur votre capacité à équilibrer le périmètre, le calendrier, le budget, la qualité et le bien-être de l\'équipe. Atteindre tous les objectifs démontre une forte capacité de gestion de projet.'
                    }
                  </p>

                  <div className="objectives-section">
                    <h3>{lang === 'en' ? 'Specific Objectives' : 'Objectifs spécifiques'}</h3>

                    <div className="objective-block">
                      <h4>{lang === 'en' ? 'Target Scope' : 'Périmètre cible'}: <span className="highlight">{selectedScenario.initial.scope} {selectedScenario.deliverable}</span></h4>
                      <p>
                        {lang === 'en'
                          ? 'You will receive up to 200 points for delivering the full scope. Partial completion will result in proportionally fewer points. Exceeding scope expectations may earn bonus points but watch the budget.'
                          : 'Vous recevrez jusqu\'à 200 points pour livrer le périmètre complet. Une complétion partielle donnera proportionnellement moins de points. Dépasser les attentes de périmètre peut donner des points bonus mais surveillez le budget.'
                        }
                      </p>
                    </div>

                    <div className="objective-block">
                      <h4>{lang === 'en' ? 'Target Schedule' : 'Calendrier cible'}: <span className="highlight">{lang === 'en' ? 'Week' : 'Semaine'} {selectedScenario.initial.weeks}</span></h4>
                      <p>
                        {lang === 'en'
                          ? 'This schedule allows you to meet stakeholder expectations and market timing. You will receive 200 points for meeting your schedule goal and lose 40 points for each week you exceed the deadline.'
                          : 'Ce calendrier vous permet de répondre aux attentes des parties prenantes et au timing du marché. Vous recevrez 200 points si vous respectez votre objectif de calendrier et perdrez 40 points pour chaque semaine de dépassement.'
                        }
                      </p>
                    </div>

                    <div className="objective-block">
                      <h4>{lang === 'en' ? 'Target Budget' : 'Budget cible'}: <span className="highlight">${(selectedScenario.initial.budget / 1000).toFixed(0)}K</span></h4>
                      <p>
                        {lang === 'en'
                          ? 'This budget supports the project at planned staffing levels. You will receive up to 200 points for staying within budget. Coming in under budget will maximize your score.'
                          : 'Ce budget supporte le projet aux niveaux de dotation prévus. Vous recevrez jusqu\'à 200 points si vous restez dans le budget. Terminer sous le budget maximisera votre score.'
                        }
                      </p>
                    </div>

                    <div className="objective-block">
                      <h4>{lang === 'en' ? 'Target Quality' : 'Qualité cible'}: <span className="highlight">{selectedScenario.initial.quality}%+</span></h4>
                      <p>
                        {lang === 'en'
                          ? 'Deliver a high-quality product that meets stakeholder standards. Quality is worth 200 points and can be improved through quality reviews and avoiding shortcuts.'
                          : 'Livrez un produit de haute qualité qui répond aux standards des parties prenantes. La qualité vaut 200 points et peut être améliorée par des revues de qualité et en évitant les raccourcis.'
                        }
                      </p>
                    </div>

                    <div className="objective-block">
                      <h4>{lang === 'en' ? 'Team Process' : 'Processus d\'équipe'}: <span className="highlight">100 points</span></h4>
                      <p>
                        {lang === 'en'
                          ? 'Maintain healthy team dynamics throughout the project. This score reflects average morale, with bonuses for schedule consistency and prototype usage.'
                          : 'Maintenez une dynamique d\'équipe saine tout au long du projet. Ce score reflète le moral moyen, avec des bonus pour la cohérence du calendrier et l\'utilisation de prototypes.'
                        }
                      </p>
                    </div>
                  </div>

                  <div className="scoring-summary">
                    <h4>📊 {lang === 'en' ? 'Total Possible Score: 1000 points' : 'Score total possible: 1000 points'}</h4>
                    <div className="score-breakdown">
                      <span>{lang === 'en' ? 'Scope' : 'Périmètre'}: 200</span>
                      <span>{lang === 'en' ? 'Schedule' : 'Calendrier'}: 200</span>
                      <span>{lang === 'en' ? 'Budget' : 'Budget'}: 200</span>
                      <span>{lang === 'en' ? 'Quality' : 'Qualité'}: 200</span>
                      <span>{lang === 'en' ? 'Team Process' : 'Processus d\'équipe'}: 100</span>
                      <span>{lang === 'en' ? 'Bonuses: up to 100' : 'Bonus: jusqu\'à 100'}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Managing Your Project Tab */}
              {briefTab === 'managing' && (
                <div className="tab-panel">
                  <h2>{lang === 'en' ? 'Managing Your Project' : 'Gérer votre projet'}: <span className="highlight">{selectedScenario.title}</span></h2>
                  
                  <p className="brief-paragraph">
                    {lang === 'en'
                      ? 'Each week you will have opportunities to adjust project parameters and make decisions. Understanding the causal relationships in your project will help you make better choices.'
                      : 'Chaque semaine, vous aurez l\'opportunité d\'ajuster les paramètres du projet et de prendre des décisions. Comprendre les relations causales dans votre projet vous aidera à faire de meilleurs choix.'
                    }
                  </p>

                  <div className="managing-section">
                    <h3>{lang === 'en' ? '1. The Causal Model' : '1. Le modèle causal'}</h3>
                    <p>{lang === 'en' 
                      ? 'This simulation uses interconnected systems where your decisions have cascading effects:'
                      : 'Cette simulation utilise des systèmes interconnectés où vos décisions ont des effets en cascade:'
                    }</p>
                    
                    <div className="causal-relationships">
                      <div className="causal-item">
                        <span className="causal-icon">😰</span>
                        <div>
                          <strong>{lang === 'en' ? 'Stress → Morale → Productivity' : 'Stress → Moral → Productivité'}</strong>
                          <p>{lang === 'en' 
                            ? 'Unrealistic deadlines, overtime, and team changes increase stress. High stress lowers morale, which directly reduces your team\'s output.'
                            : 'Les échéances irréalistes, les heures supplémentaires et les changements d\'équipe augmentent le stress. Un stress élevé diminue le moral, ce qui réduit directement la production de votre équipe.'
                          }</p>
                        </div>
                      </div>
                      <div className="causal-item">
                        <span className="causal-icon">🧠</span>
                        <div>
                          <strong>{lang === 'en' ? 'Knowledge Building' : 'Développement des connaissances'}</strong>
                          <p>{lang === 'en'
                            ? 'Your team starts with limited project knowledge. Coaching meetings and experience reduce mistake rates over time. Losing team members causes knowledge loss.'
                            : 'Votre équipe commence avec des connaissances limitées du projet. Les réunions de coaching et l\'expérience réduisent le taux d\'erreurs avec le temps. Perdre des membres de l\'équipe cause une perte de connaissances.'
                          }</p>
                        </div>
                      </div>
                      <div className="causal-item">
                        <span className="causal-icon">📅</span>
                        <div>
                          <strong>{lang === 'en' ? 'Schedule Consistency' : 'Cohérence du calendrier'}</strong>
                          <p>{lang === 'en'
                            ? 'Frequent deadline changes erode team trust. Each change after week 2 incurs morale and stress penalties. Consistency is rewarded with bonus points.'
                            : 'Les changements fréquents d\'échéance érodent la confiance de l\'équipe. Chaque changement après la semaine 2 entraîne des pénalités de moral et de stress. La cohérence est récompensée par des points bonus.'
                          }</p>
                        </div>
                      </div>
                      {selectedScenario.hasPrototyping && (
                        <div className="causal-item">
                          <span className="causal-icon">🔬</span>
                          <div>
                            <strong>{lang === 'en' ? 'Prototyping Value' : 'Valeur du prototypage'}</strong>
                            <p>{lang === 'en'
                              ? 'Building prototypes early surfaces problems before they become expensive. Events that would cause major issues are mitigated by prior prototype work.'
                              : 'Construire des prototypes tôt révèle les problèmes avant qu\'ils ne deviennent coûteux. Les événements qui causeraient des problèmes majeurs sont atténués par le travail de prototypage antérieur.'
                            }</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="managing-section">
                    <h3>{lang === 'en' ? '2. Weekly Actions' : '2. Actions hebdomadaires'}</h3>
                    <p>{lang === 'en' 
                      ? 'Each week you can take several actions to manage your project:'
                      : 'Chaque semaine, vous pouvez prendre plusieurs actions pour gérer votre projet:'
                    }</p>
                    
                    <div className="actions-grid">
                      <div className="action-item">
                        <strong>👥 {lang === 'en' ? 'Team Management' : 'Gestion de l\'équipe'}</strong>
                        <p>{lang === 'en'
                          ? 'Hire or release team members. New hires increase capacity but cause temporary stress and knowledge dilution.'
                          : 'Embauchez ou libérez des membres de l\'équipe. Les nouvelles embauches augmentent la capacité mais causent du stress temporaire et une dilution des connaissances.'
                        }</p>
                      </div>
                      <div className="action-item">
                        <strong>📅 {lang === 'en' ? 'Schedule Adjustment' : 'Ajustement du calendrier'}</strong>
                        <p>{lang === 'en'
                          ? 'Extend your deadline if needed. Early adjustments are less costly than late ones.'
                          : 'Prolongez votre échéance si nécessaire. Les ajustements précoces coûtent moins cher que les tardifs.'
                        }</p>
                      </div>
                      <div className="action-item">
                        <strong>🎯 {lang === 'en' ? 'Meetings' : 'Réunions'}</strong>
                        <p>{lang === 'en'
                          ? 'Choose from coaching (builds knowledge), standups (reduces mistakes), or status reviews (stakeholder alignment).'
                          : 'Choisissez parmi le coaching (développe les connaissances), les standups (réduit les erreurs) ou les revues de statut (alignement des parties prenantes).'
                        }</p>
                      </div>
                      <div className="action-item">
                        <strong>⭐ {lang === 'en' ? 'Quality Review' : 'Revue de qualité'}</strong>
                        <p>{lang === 'en'
                          ? 'Invest time in improving deliverable quality. Costs budget but ensures better outcomes.'
                          : 'Investissez du temps pour améliorer la qualité des livrables. Coûte du budget mais assure de meilleurs résultats.'
                        }</p>
                      </div>
                      <div className="action-item">
                        <strong>⚡ {lang === 'en' ? 'Crunch Mode' : 'Mode intensif'}</strong>
                        <p>{lang === 'en'
                          ? 'Push the team to work overtime. Increases short-term output at the cost of stress and morale.'
                          : 'Poussez l\'équipe à faire des heures supplémentaires. Augmente la production à court terme au prix du stress et du moral.'
                        }</p>
                      </div>
                      {selectedScenario.hasPrototyping && (
                        <div className="action-item">
                          <strong>🔬 {lang === 'en' ? 'Build Prototype' : 'Construire un prototype'}</strong>
                          <p>{lang === 'en'
                            ? 'Invest in early testing to reduce future risks. Costs time and budget but provides significant protection.'
                            : 'Investissez dans des tests précoces pour réduire les risques futurs. Coûte du temps et du budget mais offre une protection significative.'
                          }</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="managing-section">
                    <h3>{lang === 'en' ? '3. Events & Decisions' : '3. Événements et décisions'}</h3>
                    <p>
                      {lang === 'en'
                        ? 'Throughout the project, you\'ll encounter events triggered by project conditions—not random chance. For example, high stress may cause team members to leave. Low quality triggers technical debt crises. Your choices in these moments significantly impact project outcomes.'
                        : 'Tout au long du projet, vous rencontrerez des événements déclenchés par les conditions du projet — pas par le hasard. Par exemple, un stress élevé peut causer le départ de membres de l\'équipe. Une qualité faible déclenche des crises de dette technique. Vos choix dans ces moments impactent significativement les résultats du projet.'
                      }
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="brief-actions">
              <button className="btn-primary btn-lg" onClick={beginSimulation}>{lang === 'en' ? 'Begin Simulation →' : 'Commencer la simulation →'}</button>
            </div>
          </div>
        </div>
      );
    }

    if (simPhase === 'playing' && gameState) {
      const scenario = selectedScenario;
      const budgetRemaining = gameState.budget.total - gameState.budget.spent;
      const budgetPercent = (budgetRemaining / gameState.budget.total) * 100;
      const budgetSpentPercent = 100 - budgetPercent;
      const scopePercent = (gameState.scope.completed / gameState.scope.totalFeatures) * 100;
      const weeksRemaining = gameState.schedule.deadline - gameState.week + 1;
      const schedulePercent = ((gameState.week - 1) / gameState.totalWeeks) * 100;
      
      // Calculate effective productivity for display
      const effectiveProductivity = calculateProductivityFromMorale(gameState.team.productivity, gameState.team.morale);
      
      // Determine if there's a critical situation
      const hasCriticalEvent = gameState.gamePhase === 'event' && gameState.currentEvent;
      const isScheduleBehind = weeksRemaining <= 2;
      const isBudgetLow = budgetPercent < 25;
      
      return (
        <div className="sim-playing">
          {renderNavbar()}
          
          {/* Floating background shapes */}
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
          
          <div className="game-layout">
            {/* Left Sidebar Navigation */}
            <div className="game-sidebar">
              <div className="sidebar-project">
                <span className="sidebar-project-icon">{scenario.icon}</span>
                <div>
                  <div className="sidebar-project-name">{scenario.projectName}</div>
                  <div className="sidebar-company">{scenario.company}</div>
                </div>
              </div>
              <div className="sidebar-week-badge">
                {lang === 'en' ? `Week ${gameState.week}` : `Semaine ${gameState.week}`}
                <span className="sidebar-week-total"> / {gameState.totalWeeks}</span>
              </div>
              
              <div className="sidebar-section-label">{lang === 'en' ? 'DECISIONS' : 'DÉCISIONS'}</div>
              <button className={`sidebar-nav-item ${gameTab === 'overview' ? 'active' : ''}`} onClick={() => setGameTab('overview')}>
                <span className="sidebar-nav-icon">📊</span> {lang === 'en' ? 'Overview' : 'Vue d\'ensemble'}
              </button>
              <button className={`sidebar-nav-item ${gameTab === 'team' ? 'active' : ''}`} onClick={() => setGameTab('team')}>
                <span className="sidebar-nav-icon">👥</span> {lang === 'en' ? 'Team Management' : 'Gestion d\'équipe'}
              </button>
              <button className={`sidebar-nav-item ${gameTab === 'resources' ? 'active' : ''}`} onClick={() => setGameTab('resources')}>
                <span className="sidebar-nav-icon">🎯</span> {lang === 'en' ? 'Resource Allocation' : 'Allocation des ressources'}
              </button>
              <button className={`sidebar-nav-item ${gameTab === 'meetings' ? 'active' : ''}`} onClick={() => setGameTab('meetings')}>
                <span className="sidebar-nav-icon">📅</span> {lang === 'en' ? 'Meetings' : 'Réunions'}
              </button>
              {scenario.hasPrototyping && (
                <button className={`sidebar-nav-item ${gameTab === 'prototype' ? 'active' : ''}`} onClick={() => setGameTab('prototype')}>
                  <span className="sidebar-nav-icon">🔬</span> {lang === 'en' ? 'Prototyping' : 'Prototypage'}
                </button>
              )}
              
              <div className="sidebar-section-label">{lang === 'en' ? 'REPORTS' : 'RAPPORTS'}</div>
              <button className={`sidebar-nav-item ${gameTab === 'health' ? 'active' : ''}`} onClick={() => setGameTab('health')}>
                <span className="sidebar-nav-icon">📈</span> {lang === 'en' ? 'Project Health' : 'Santé du projet'}
              </button>
              <button className={`sidebar-nav-item ${gameTab === 'risks' ? 'active' : ''}`} onClick={() => setGameTab('risks')}>
                <span className="sidebar-nav-icon">⚠️</span> {lang === 'en' ? 'Risks & Stakeholders' : 'Risques & parties prenantes'}
              </button>
              <button className={`sidebar-nav-item ${gameTab === 'milestones' ? 'active' : ''}`} onClick={() => setGameTab('milestones')}>
                <span className="sidebar-nav-icon">🏗️</span> {lang === 'en' ? 'Milestones' : 'Jalons'}
              </button>
              
              <div className="sidebar-actions">
                <button className="btn-anna-sidebar" onClick={askAnna}>
                  {annaAvatar(28)}
                  <span>{lang === 'en' ? 'Ask Anna' : 'Demander à Anna'}</span>
                </button>
                <button className="btn-advance-sidebar" onClick={advanceWeek}>
                  {lang === 'en' ? `Advance to Week ${gameState.week + 1}` : `Passer à la semaine ${gameState.week + 1}`} →
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="game-content">
              
              {/* === OVERVIEW TAB === */}
              {gameTab === 'overview' && (
                <div className="content-section">
                  <h2 className="content-title">📊 {lang === 'en' ? 'Quarter Overview' : 'Vue d\'ensemble'}</h2>
                  
                  {/* KPI Cards */}
                  <div className="kpi-grid">
                    <div className="kpi-card">
                      <div className="kpi-label">{lang === 'en' ? 'BUDGET REMAINING' : 'BUDGET RESTANT'}</div>
                      <div className="kpi-value">${(budgetRemaining / 1000).toFixed(0)}K</div>
                      <div className="kpi-bar"><div className="kpi-bar-fill" style={{ width: `${budgetPercent}%`, background: budgetPercent > 30 ? '#10b981' : budgetPercent > 15 ? '#f59e0b' : '#ef4444' }}></div></div>
                    </div>
                    <div className="kpi-card">
                      <div className="kpi-label">{lang === 'en' ? 'SCHEDULE' : 'CALENDRIER'}</div>
                      <div className="kpi-value">{weeksRemaining} {lang === 'en' ? 'wks left' : 'sem.'}</div>
                      <div className="kpi-bar"><div className="kpi-bar-fill" style={{ width: `${schedulePercent}%`, background: '#3b82f6' }}></div></div>
                    </div>
                    <div className="kpi-card">
                      <div className="kpi-label">{lang === 'en' ? 'TEAM MORALE' : 'MORAL D\'ÉQUIPE'}</div>
                      <div className="kpi-value">{Math.round(gameState.team.morale)}%</div>
                      <div className="kpi-bar"><div className="kpi-bar-fill" style={{ width: `${gameState.team.morale}%`, background: gameState.team.morale > 60 ? '#10b981' : '#f59e0b' }}></div></div>
                    </div>
                    <div className="kpi-card">
                      <div className="kpi-label">{lang === 'en' ? 'QUALITY' : 'QUALITÉ'}</div>
                      <div className="kpi-value">{gameState.scope.quality >= 90 ? 'A' : gameState.scope.quality >= 80 ? 'B+' : gameState.scope.quality >= 70 ? 'B' : gameState.scope.quality >= 60 ? 'C' : 'D'}</div>
                      <div className="kpi-bar"><div className="kpi-bar-fill" style={{ width: `${gameState.scope.quality}%`, background: '#c41424' }}></div></div>
                    </div>
                    <div className="kpi-card">
                      <div className="kpi-label">{lang === 'en' ? 'SCOPE COMPLETE' : 'PÉRIMÈTRE COMPLÉTÉ'}</div>
                      <div className="kpi-value">{Math.round(scopePercent)}%</div>
                      <div className="kpi-bar"><div className="kpi-bar-fill" style={{ width: `${scopePercent}%`, background: '#ED1B2F' }}></div></div>
                    </div>
                    <div className="kpi-card">
                      <div className="kpi-label">{lang === 'en' ? 'TEAM SIZE' : 'TAILLE D\'ÉQUIPE'}</div>
                      <div className="kpi-value">{gameState.team.size}</div>
                      <div className="kpi-subtext">{lang === 'en' ? `Stress: ${Math.round(gameState.team.stress)}%` : `Stress: ${Math.round(gameState.team.stress)}%`}</div>
                    </div>
                  </div>
                  
                  {/* Timeline */}
                  <div className="overview-timeline">
                    <h4>📈 {lang === 'en' ? 'Project Timeline' : 'Échéancier du projet'}</h4>
                    <div className="timeline-status-label">
                      {weeksRemaining > 3 ? '🟢 On Track' : weeksRemaining > 1 ? '🟡 Approaching Deadline' : '🔴 Critical'}
                    </div>
                    <div className="timeline-bar">
                      <div className="timeline-progress" style={{ width: `${schedulePercent}%` }}></div>
                      <div className="timeline-milestone" style={{ left: `${(3 / gameState.totalWeeks) * 100}%` }} title="Planning">
                        <span className={gameState.week >= 3 ? 'done' : ''}>📋</span>
                      </div>
                      <div className="timeline-milestone" style={{ left: `${(Math.floor(gameState.totalWeeks * 0.5) / gameState.totalWeeks) * 100}%` }} title="MVP">
                        <span className={gameState.week >= Math.floor(gameState.totalWeeks * 0.5) ? 'done' : ''}>🎯</span>
                      </div>
                      <div className="timeline-milestone" style={{ left: `${(Math.floor(gameState.totalWeeks * 0.75) / gameState.totalWeeks) * 100}%` }} title="Beta">
                        <span className={gameState.week >= Math.floor(gameState.totalWeeks * 0.75) ? 'done' : ''}>🧪</span>
                      </div>
                      <div className="timeline-milestone deadline" style={{ left: '100%' }} title="Launch">
                        <span>🚀</span>
                      </div>
                      <div className="timeline-marker current" style={{ left: `${schedulePercent}%` }}></div>
                    </div>
                    <div className="timeline-weeks">
                      {Array.from({ length: gameState.totalWeeks }, (_, i) => (
                        <span key={i} className={`week-mark ${i + 1 === gameState.week ? 'current' : i + 1 < gameState.week ? 'past' : ''}`}>
                          W{i + 1}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Anna — Dynamic Weekly Insight */}
                  <div className="anna-overview-card">
                    <div className="anna-overview-header">
                      {annaAvatar(40)}
                      <div>
                        <strong style={{ color: '#14b8a6' }}>Anna</strong> — {lang === 'en' ? `Week ${gameState.week} Insight` : `Aperçu semaine ${gameState.week}`}
                      </div>
                    </div>
                    <p className="anna-overview-text">
                      {(() => {
                        // Dynamic analysis based on current metrics
                        const issues = [];
                        const recs = [];
                        
                        // Status line
                        let status = '';
                        if (lang === 'en') {
                          if (budgetPercent < 15) status = `Budget is critical at $${(budgetRemaining/1000).toFixed(0)}K remaining.`;
                          else if (budgetPercent < 30) status = `Budget is getting tight — $${(budgetRemaining/1000).toFixed(0)}K left (${Math.round(budgetPercent)}%).`;
                          else status = `Budget looks healthy at $${(budgetRemaining/1000).toFixed(0)}K remaining.`;
                        } else {
                          if (budgetPercent < 15) status = `Le budget est critique à ${(budgetRemaining/1000).toFixed(0)}K$ restants.`;
                          else if (budgetPercent < 30) status = `Le budget se resserre — ${(budgetRemaining/1000).toFixed(0)}K$ restants (${Math.round(budgetPercent)}%).`;
                          else status = `Le budget est sain à ${(budgetRemaining/1000).toFixed(0)}K$ restants.`;
                        }

                        // Morale assessment
                        if (gameState.team.morale < 40) {
                          issues.push(lang === 'en' ? `Morale is dangerously low at ${Math.round(gameState.team.morale)}%` : `Le moral est dangereusement bas à ${Math.round(gameState.team.morale)}%`);
                          recs.push(lang === 'en' ? 'Run Team Building ($8K) in Resource Allocation to recover morale' : 'Lancez Consolidation d\'équipe (8K$) dans Allocation des ressources');
                        } else if (gameState.team.morale < 60) {
                          issues.push(lang === 'en' ? `Morale is declining at ${Math.round(gameState.team.morale)}%` : `Le moral décline à ${Math.round(gameState.team.morale)}%`);
                          recs.push(lang === 'en' ? 'Consider Team Building or a Coaching session' : 'Considérez une Consolidation d\'équipe ou un Coaching');
                        }

                        // Stress
                        if (gameState.team.stress > 70) {
                          issues.push(lang === 'en' ? `Team stress at ${Math.round(gameState.team.stress)}% — burnout risk!` : `Stress d'équipe à ${Math.round(gameState.team.stress)}% — risque d'épuisement !`);
                          recs.push(lang === 'en' ? 'Avoid Crunch Mode and schedule a Status Review to reduce stress' : 'Évitez le Mode intensif et planifiez une Revue de statut');
                        }

                        // Scope vs schedule
                        const expectedProgress = (gameState.week / gameState.totalWeeks) * 100;
                        if (scopePercent < expectedProgress - 15) {
                          issues.push(lang === 'en' ? `Scope is behind — ${Math.round(scopePercent)}% done vs ${Math.round(expectedProgress)}% expected` : `Le périmètre est en retard — ${Math.round(scopePercent)}% fait vs ${Math.round(expectedProgress)}% attendu`);
                          recs.push(lang === 'en' ? 'Consider hiring or Crunch Mode to catch up (watch morale)' : 'Considérez embaucher ou le Mode intensif pour rattraper (surveillez le moral)');
                        }

                        // Quality
                        if (gameState.scope.quality < 70) {
                          issues.push(lang === 'en' ? `Quality at ${Math.round(gameState.scope.quality)}% needs attention` : `La qualité à ${Math.round(gameState.scope.quality)}% nécessite de l'attention`);
                          recs.push(lang === 'en' ? 'Run a Quality Review ($10K) to improve deliverable quality' : 'Effectuez une Revue qualité (10K$) pour améliorer la qualité');
                        }

                        // Knowledge
                        if (gameState.team.knowledge < 40) {
                          recs.push(lang === 'en' ? 'Schedule One-on-One Coaching to build team knowledge' : 'Planifiez un Coaching individuel pour développer les connaissances');
                        }

                        // All good
                        if (issues.length === 0) {
                          issues.push(lang === 'en' ? 'All metrics look solid this week' : 'Toutes les métriques sont bonnes cette semaine');
                          if (recs.length === 0) recs.push(lang === 'en' ? 'Stay the course — maintain your current strategy' : 'Gardez le cap — maintenez votre stratégie actuelle');
                        }

                        return `${status} ${issues.join('. ')}. ${lang === 'en' ? 'Recommendation' : 'Recommandation'}: ${recs[0]}.${recs.length > 1 ? ` ${lang === 'en' ? 'Also' : 'Aussi'}: ${recs.slice(1).join('. ')}.` : ''}`;
                      })()}
                    </p>
                  </div>
                </div>
              )}

              {/* === TEAM MANAGEMENT TAB === */}
              {gameTab === 'team' && (
                <div className="content-section">
                  <h2 className="content-title">👥 {lang === 'en' ? 'Team Management' : 'Gestion d\'équipe'}</h2>
                  <p className="content-desc">{lang === 'en' ? 'Adjust your team size based on workload' : 'Ajustez la taille de votre équipe selon la charge de travail'}</p>
                  
                  <div className="team-control-card">
                    <div className="team-control-row">
                      <button className="decision-btn" onClick={() => handleAction({ type: 'fire' })} disabled={gameState.team.size <= 2}>− {lang === 'en' ? 'Remove' : 'Retirer'}</button>
                      <span className="team-count-large">{gameState.team.size}</span>
                      <button className="decision-btn" onClick={() => handleAction({ type: 'hire', cost: scenario.weeklyCostPerPerson * 2 })}>+ {lang === 'en' ? 'Hire' : 'Embaucher'}</button>
                    </div>
                    <p className="team-cost-note">{lang === 'en' ? `Weekly cost per person: $${(scenario.weeklyCostPerPerson / 1000).toFixed(0)}K` : `Coût hebdomadaire par personne: ${(scenario.weeklyCostPerPerson / 1000).toFixed(0)}K$`}</p>
                  </div>

                  <div className="team-stats-grid">
                    <div className="team-stat-card">
                      <div className="team-stat-label">{lang === 'en' ? 'Morale' : 'Moral'}</div>
                      <div className="team-stat-value" style={{ color: gameState.team.morale > 60 ? '#10b981' : '#f59e0b' }}>{Math.round(gameState.team.morale)}%</div>
                      <div className="kpi-bar"><div className="kpi-bar-fill" style={{ width: `${gameState.team.morale}%`, background: gameState.team.morale > 60 ? '#10b981' : '#f59e0b' }}></div></div>
                    </div>
                    <div className="team-stat-card">
                      <div className="team-stat-label">{lang === 'en' ? 'Stress' : 'Stress'}</div>
                      <div className="team-stat-value" style={{ color: gameState.team.stress < 40 ? '#10b981' : gameState.team.stress < 60 ? '#f59e0b' : '#ef4444' }}>{Math.round(gameState.team.stress)}%</div>
                      <div className="kpi-bar"><div className="kpi-bar-fill" style={{ width: `${gameState.team.stress}%`, background: gameState.team.stress < 40 ? '#10b981' : gameState.team.stress < 60 ? '#f59e0b' : '#ef4444' }}></div></div>
                    </div>
                    <div className="team-stat-card">
                      <div className="team-stat-label">{lang === 'en' ? 'Knowledge' : 'Connaissances'}</div>
                      <div className="team-stat-value" style={{ color: '#ED1B2F' }}>{Math.round(gameState.team.knowledge)}%</div>
                      <div className="kpi-bar"><div className="kpi-bar-fill" style={{ width: `${gameState.team.knowledge}%`, background: '#ED1B2F' }}></div></div>
                    </div>
                    <div className="team-stat-card">
                      <div className="team-stat-label">{lang === 'en' ? 'Productivity' : 'Productivité'}</div>
                      <div className="team-stat-value" style={{ color: '#3b82f6' }}>{(effectiveProductivity * 100).toFixed(0)}%</div>
                      <div className="kpi-bar"><div className="kpi-bar-fill" style={{ width: `${effectiveProductivity * 100}%`, background: '#3b82f6' }}></div></div>
                    </div>
                  </div>
                </div>
              )}

              {/* === RESOURCE ALLOCATION TAB === */}
              {gameTab === 'resources' && (
                <div className="content-section">
                  <h2 className="content-title">🎯 {lang === 'en' ? 'Resource Allocation' : 'Allocation des ressources'}</h2>
                  <p className="content-desc">{lang === 'en' ? 'Choose where to invest your resources this week' : 'Choisissez où investir vos ressources cette semaine'}</p>
                  
                  {/* Weekly Focus */}
                  <div className="resource-card">
                    <h3>{lang === 'en' ? 'Weekly Focus' : 'Focus hebdomadaire'}</h3>
                    <div className="focus-sliders">
                      <div className="focus-row">
                        <span className="focus-label">🚀 {lang === 'en' ? 'Speed' : 'Vitesse'}</span>
                        <div className="focus-bar"><div className="focus-fill speed" style={{ width: `${100 - gameState.scope.quality * 0.3}%` }}></div></div>
                        <span className="focus-value">{Math.round(100 - gameState.scope.quality * 0.3)}%</span>
                      </div>
                      <div className="focus-row">
                        <span className="focus-label">⭐ {lang === 'en' ? 'Quality' : 'Qualité'}</span>
                        <div className="focus-bar"><div className="focus-fill quality" style={{ width: `${gameState.scope.quality * 0.8}%` }}></div></div>
                        <span className="focus-value">{Math.round(gameState.scope.quality * 0.8)}%</span>
                      </div>
                      <div className="focus-row">
                        <span className="focus-label">💡 {lang === 'en' ? 'Innovation' : 'Innovation'}</span>
                        <div className="focus-bar"><div className="focus-fill innovation" style={{ width: `${gameState.team.knowledge * 0.6}%` }}></div></div>
                        <span className="focus-value">{Math.round(gameState.team.knowledge * 0.6)}%</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="resource-card">
                    <h3>{lang === 'en' ? 'Actions' : 'Actions'}</h3>
                    <div className="resource-actions-grid">
                      <button className="resource-action-btn quality" onClick={() => handleAction({ type: 'quality_review', cost: 10000 })}>
                        <span className="resource-action-icon">🔍</span>
                        <div>
                          <strong>{lang === 'en' ? 'Quality Review' : 'Revue qualité'}</strong>
                          <p>{lang === 'en' ? 'Invest in quality improvement ($10K)' : 'Investir dans la qualité (10K$)'}</p>
                        </div>
                      </button>
                      <button className="resource-action-btn crunch" onClick={() => handleAction({ type: 'crunch', cost: 15000 })}>
                        <span className="resource-action-icon">🔥</span>
                        <div>
                          <strong>{lang === 'en' ? 'Crunch Mode' : 'Mode intensif'}</strong>
                          <p>{lang === 'en' ? 'Push overtime for speed ($15K, +stress)' : 'Heures supp. pour vitesse (15K$, +stress)'}</p>
                        </div>
                      </button>
                      <button className="resource-action-btn team-build" onClick={() => handleAction({ type: 'team_building', cost: 8000 })}>
                        <span className="resource-action-icon">🤝</span>
                        <div>
                          <strong>{lang === 'en' ? 'Team Building' : 'Consolidation d\'équipe'}</strong>
                          <p>{lang === 'en' ? 'Boost morale and reduce stress ($8K)' : 'Améliorer le moral et réduire le stress (8K$)'}</p>
                        </div>
                      </button>
                      <button className="resource-action-btn schedule" onClick={() => handleAction({ type: 'extend_deadline' })}>
                        <span className="resource-action-icon">📅</span>
                        <div>
                          <strong>{lang === 'en' ? 'Extend Deadline +1 Week' : 'Prolonger +1 semaine'}</strong>
                          <p>{lang === 'en' ? 'More time but schedule penalty' : 'Plus de temps mais pénalité de calendrier'}</p>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* === MEETINGS TAB === */}
              {gameTab === 'meetings' && (
                <div className="content-section">
                  <h2 className="content-title">📅 {lang === 'en' ? 'Meetings This Week' : 'Réunions cette semaine'}</h2>
                  <p className="content-desc">{lang === 'en' ? 'Schedule meetings to improve team performance' : 'Planifiez des réunions pour améliorer la performance'}</p>
                  
                  <div className="meetings-list">
                    {Object.values(MEETING_TYPES).map(meeting => (
                      <button 
                        key={meeting.id}
                        className={`meeting-card-btn ${gameState.meetings[meeting.id] ? 'done' : ''}`}
                        onClick={() => handleAction({ type: `meeting_${meeting.id}` })}
                        disabled={gameState.meetings[meeting.id]}
                      >
                        <span className="meeting-card-icon">{meeting.icon}</span>
                        <div className="meeting-card-info">
                          <strong>{meeting.name}</strong>
                          <p>{meeting.id === 'coaching' 
                            ? (lang === 'en' ? 'Builds team knowledge and reduces error rates' : 'Développe les connaissances et réduit les erreurs')
                            : meeting.id === 'standup'
                            ? (lang === 'en' ? 'Improves coordination and catches issues early' : 'Améliore la coordination et détecte les problèmes tôt')
                            : (lang === 'en' ? 'Aligns stakeholders and manages expectations' : 'Aligne les parties prenantes et gère les attentes')
                          }</p>
                        </div>
                        <span className="meeting-card-status">{gameState.meetings[meeting.id] ? '✅' : '○'}</span>
                      </button>
                    ))}
                  </div>
                  
                  <div className="meetings-summary">
                    {lang === 'en' 
                      ? `${Object.values(gameState.meetings).filter(Boolean).length} of ${Object.keys(MEETING_TYPES).length} meetings scheduled this week` 
                      : `${Object.values(gameState.meetings).filter(Boolean).length} de ${Object.keys(MEETING_TYPES).length} réunions planifiées cette semaine`}
                  </div>
                </div>
              )}

              {/* === PROTOTYPE TAB === */}
              {gameTab === 'prototype' && scenario.hasPrototyping && (
                <div className="content-section">
                  <h2 className="content-title">🔬 {lang === 'en' ? 'Prototyping' : 'Prototypage'}</h2>
                  <p className="content-desc">{lang === 'en' ? 'Build prototypes to reduce risk and validate direction' : 'Construisez des prototypes pour réduire les risques'}</p>
                  
                  <div className="prototype-status">
                    <div className="prototype-count">{gameState.prototypesBuilt || 0} / {gameState.maxPrototypes}</div>
                    <p>{lang === 'en' ? 'Prototypes Built' : 'Prototypes construits'}</p>
                  </div>
                  
                  {gameState.prototypesBuilt < gameState.maxPrototypes ? (
                    <button className="resource-action-btn proto" onClick={() => handleAction({ type: 'build_prototype' })}>
                      <span className="resource-action-icon">🔬</span>
                      <div>
                        <strong>{lang === 'en' ? 'Build Prototype' : 'Construire un prototype'}</strong>
                        <p>{lang === 'en' ? 'Invest time to validate design and reduce risk' : 'Investir du temps pour valider le design et réduire le risque'}</p>
                      </div>
                    </button>
                  ) : (
                    <div className="prototype-complete">✅ {lang === 'en' ? 'All prototypes complete!' : 'Tous les prototypes sont terminés!'}</div>
                  )}
                </div>
              )}

              {/* === PROJECT HEALTH TAB === */}
              {gameTab === 'health' && (
                <div className="content-section">
                  <h2 className="content-title">📈 {lang === 'en' ? 'Project Health' : 'Santé du projet'}</h2>
                  
                  {/* Risk Radar */}
                  <div className="health-radar-card">
                    <h4>📡 {lang === 'en' ? 'Risk Radar' : 'Radar de risques'}</h4>
                    <RiskRadar risks={{
                      budget: Math.min(100, budgetPercent + 20),
                      schedule: Math.min(100, (weeksRemaining / gameState.totalWeeks) * 100 + 20),
                      scope: Math.min(100, scopePercent + 10),
                      quality: gameState.scope.quality,
                      team: gameState.team.morale,
                      stakeholder: Math.min(100, (gameState.scope.quality + gameState.team.morale) / 2)
                    }} />
                    <div className="radar-legend">
                      <span className="legend-item good">● {lang === 'en' ? 'Safe' : 'Sûr'}</span>
                      <span className="legend-item warn">● {lang === 'en' ? 'Watch' : 'Surveiller'}</span>
                      <span className="legend-item bad">● {lang === 'en' ? 'Risk' : 'Risque'}</span>
                    </div>
                  </div>
                  
                  {/* Live Metrics */}
                  <div className="health-metrics-card">
                    <h4>📊 {lang === 'en' ? 'Live Metrics' : 'Métriques en direct'}</h4>
                    <div className="metric-row">
                      <span className="metric-name">{lang === 'en' ? 'Budget Used' : 'Budget utilisé'}</span>
                      <span className="metric-bar-container"><span className="metric-bar" style={{ width: `${budgetSpentPercent}%`, background: budgetPercent > 30 ? '#f59e0b' : '#ef4444' }}></span></span>
                      <span className="metric-pct">{Math.round(budgetSpentPercent)}%</span>
                    </div>
                    <div className="metric-row">
                      <span className="metric-name">{lang === 'en' ? 'Timeline' : 'Calendrier'}</span>
                      <span className="metric-bar-container"><span className="metric-bar" style={{ width: `${schedulePercent}%`, background: '#3b82f6' }}></span></span>
                      <span className="metric-pct">{Math.round(schedulePercent)}%</span>
                    </div>
                    <div className="metric-row">
                      <span className="metric-name">{lang === 'en' ? 'Team Morale' : 'Moral d\'équipe'}</span>
                      <span className="metric-bar-container"><span className="metric-bar" style={{ width: `${gameState.team.morale}%`, background: gameState.team.morale > 60 ? '#10b981' : '#f59e0b' }}></span></span>
                      <span className="metric-pct">{Math.round(gameState.team.morale)}%</span>
                    </div>
                    <div className="metric-row">
                      <span className="metric-name">{lang === 'en' ? 'Quality' : 'Qualité'}</span>
                      <span className="metric-bar-container"><span className="metric-bar" style={{ width: `${gameState.scope.quality}%`, background: '#c41424' }}></span></span>
                      <span className="metric-pct">{gameState.scope.quality >= 80 ? 'B+' : gameState.scope.quality >= 70 ? 'B' : 'C'}</span>
                    </div>
                    <div className="metric-row">
                      <span className="metric-name">{lang === 'en' ? 'Knowledge' : 'Connaissances'}</span>
                      <span className="metric-bar-container"><span className="metric-bar" style={{ width: `${gameState.team.knowledge}%`, background: '#ED1B2F' }}></span></span>
                      <span className="metric-pct">{Math.round(gameState.team.knowledge)}%</span>
                    </div>
                  </div>
                </div>
              )}

              {/* === RISKS & STAKEHOLDERS TAB === */}
              {gameTab === 'risks' && (
                <div className="content-section">
                  <h2 className="content-title">⚠️ {lang === 'en' ? 'Risks & Stakeholders' : 'Risques & parties prenantes'}</h2>
                  
                  {/* Active Risks */}
                  <div className="risks-report-card">
                    <h4>{lang === 'en' ? 'Active Risks' : 'Risques actifs'}</h4>
                    <div className="risk-list">
                      {gameState.team.stress > 60 && (
                        <div className="risk-item high"><span className="risk-level">HIGH</span><span className="risk-text">{lang === 'en' ? 'Team burnout risk' : 'Risque d\'épuisement'}</span></div>
                      )}
                      {budgetPercent < 20 && (
                        <div className="risk-item high"><span className="risk-level">HIGH</span><span className="risk-text">{lang === 'en' ? 'Budget overrun' : 'Dépassement budgétaire'}</span></div>
                      )}
                      {weeksRemaining <= 2 && scopePercent < 80 && (
                        <div className="risk-item high"><span className="risk-level">HIGH</span><span className="risk-text">{lang === 'en' ? 'Schedule slip' : 'Glissement de calendrier'}</span></div>
                      )}
                      {gameState.scope.quality < 70 && (
                        <div className="risk-item med"><span className="risk-level">MED</span><span className="risk-text">{lang === 'en' ? 'Quality concerns' : 'Préoccupations qualité'}</span></div>
                      )}
                      {gameState.team.knowledge < 50 && (
                        <div className="risk-item low"><span className="risk-level">LOW</span><span className="risk-text">{lang === 'en' ? 'Knowledge gaps' : 'Lacunes de connaissances'}</span></div>
                      )}
                      {gameState.team.stress <= 60 && budgetPercent >= 20 && (weeksRemaining > 2 || scopePercent >= 80) && gameState.scope.quality >= 70 && gameState.team.knowledge >= 50 && (
                        <div className="risk-item none"><span className="risk-text">{lang === 'en' ? 'No critical risks identified' : 'Aucun risque critique identifié'}</span></div>
                      )}
                    </div>
                  </div>
                  
                  {/* Stakeholder Messages */}
                  <div className="stakeholder-report-card">
                    <h4>💬 {lang === 'en' ? 'Stakeholder Updates' : 'Messages des parties prenantes'}</h4>
                    <div className="message-list">
                      {gameState.team.morale < 60 && (
                        <div className="message urgent">
                          <span className="msg-icon">👥</span>
                          <div className="msg-content">
                            <span className="msg-from">{lang === 'en' ? 'Team Lead' : 'Chef d\'équipe'}</span>
                            <span className="msg-text">{lang === 'en' ? 'Team morale is low. Try Team Building in Resource Allocation.' : 'Le moral est bas. Essayez Consolidation d\'équipe dans Allocation des ressources.'}</span>
                          </div>
                          <span className="msg-badge urgent">!</span>
                        </div>
                      )}
                      {budgetPercent < 30 && (
                        <div className="message warning">
                          <span className="msg-icon">💰</span>
                          <div className="msg-content">
                            <span className="msg-from">{lang === 'en' ? 'Finance' : 'Finance'}</span>
                            <span className="msg-text">{lang === 'en' ? 'Budget running low. Review spending priorities.' : 'Budget faible. Révisez les priorités de dépenses.'}</span>
                          </div>
                        </div>
                      )}
                      {weeksRemaining <= 3 && (
                        <div className="message info">
                          <span className="msg-icon">📅</span>
                          <div className="msg-content">
                            <span className="msg-from">{lang === 'en' ? 'Sponsor' : 'Commanditaire'}</span>
                            <span className="msg-text">{lang === 'en' ? 'Deadline approaching. Status update requested.' : 'Échéance approchante. Mise à jour demandée.'}</span>
                          </div>
                        </div>
                      )}
                      {gameState.team.morale >= 60 && budgetPercent >= 30 && weeksRemaining > 3 && (
                        <div className="message success">
                          <span className="msg-icon">✅</span>
                          <div className="msg-content">
                            <span className="msg-from">PMO</span>
                            <span className="msg-text">{lang === 'en' ? 'Project on track. Keep up the good work!' : 'Projet en bonne voie. Continuez!'}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* === MILESTONES TAB === */}
              {gameTab === 'milestones' && (
                <div className="content-section">
                  <h2 className="content-title">🏗️ {lang === 'en' ? 'Milestones & Progress' : 'Jalons & progrès'}</h2>
                  
                  <div className="milestones-report">
                    <div className="milestone-list">
                      <div className={`milestone-item ${gameState.week >= 3 ? 'complete' : gameState.week >= 2 ? 'current' : ''}`}>
                        <span className="milestone-marker">{gameState.week >= 3 ? '✓' : ''}</span>
                        <span className="milestone-name">{lang === 'en' ? 'Planning Complete' : 'Planification complétée'}</span>
                        <span className="milestone-week">W3</span>
                      </div>
                      <div className={`milestone-item ${gameState.week >= Math.floor(gameState.totalWeeks * 0.5) ? 'complete' : gameState.week >= Math.floor(gameState.totalWeeks * 0.4) ? 'current' : ''}`}>
                        <span className="milestone-marker">{gameState.week >= Math.floor(gameState.totalWeeks * 0.5) ? '✓' : ''}</span>
                        <span className="milestone-name">{lang === 'en' ? 'MVP Ready' : 'MVP prêt'}</span>
                        <span className="milestone-week">W{Math.floor(gameState.totalWeeks * 0.5)}</span>
                      </div>
                      <div className={`milestone-item ${gameState.week >= Math.floor(gameState.totalWeeks * 0.75) ? 'complete' : gameState.week >= Math.floor(gameState.totalWeeks * 0.65) ? 'current' : ''}`}>
                        <span className="milestone-marker">{gameState.week >= Math.floor(gameState.totalWeeks * 0.75) ? '✓' : ''}</span>
                        <span className="milestone-name">{lang === 'en' ? 'Beta Testing' : 'Tests bêta'}</span>
                        <span className="milestone-week">W{Math.floor(gameState.totalWeeks * 0.75)}</span>
                      </div>
                      <div className={`milestone-item ${gameState.week >= gameState.totalWeeks ? 'complete' : gameState.week >= gameState.totalWeeks - 1 ? 'current' : ''}`}>
                        <span className="milestone-marker">{gameState.week >= gameState.totalWeeks ? '✓' : ''}</span>
                        <span className="milestone-name">{lang === 'en' ? 'Launch' : 'Lancement'}</span>
                        <span className="milestone-week">W{gameState.totalWeeks}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress Summary */}
                  <div className="progress-report-card">
                    <h4>📋 {lang === 'en' ? `Week ${gameState.week} Summary` : `Résumé semaine ${gameState.week}`}</h4>
                    <div className="progress-stats">
                      <div className="progress-stat">
                        <span className="progress-label">{lang === 'en' ? 'Tasks Done' : 'Tâches complétées'}</span>
                        <span className="progress-value">{Math.round(scopePercent)}%</span>
                      </div>
                      <div className="progress-stat">
                        <span className="progress-label">{lang === 'en' ? 'Meetings' : 'Réunions'}</span>
                        <span className="progress-value">{Object.values(gameState.meetings).filter(Boolean).length}/{Object.keys(MEETING_TYPES).length}</span>
                      </div>
                      <div className="progress-stat">
                        <span className="progress-label">{lang === 'en' ? 'Actions' : 'Actions'}</span>
                        <span className="progress-value">{gameState.weeklyActions || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Action Toast */}
          {actionToast && (
            <div className={`action-toast ${actionToast.type}`}>
              {actionToast.message}
            </div>
          )}

          {/* Anna AI Advisor Panel */}
          {annaVisible && (
            <div className="anna-overlay" onClick={() => setAnnaVisible(false)}>
              <div className="anna-panel" onClick={e => e.stopPropagation()}>
                <div className="anna-panel-header">
                  <div className="anna-panel-identity">
                    {annaAvatar()}
                    <div>
                      <div className="anna-panel-name">ANNA</div>
                      <div className="anna-panel-role">{lang === 'en' ? `Week ${gameState.week} Strategic Briefing` : `Briefing stratégique — Semaine ${gameState.week}`}</div>
                    </div>
                  </div>
                  <button className="anna-close" onClick={() => setAnnaVisible(false)}>✕</button>
                </div>
                <div className="anna-panel-body">
                  {annaLoading ? (
                    <div className="anna-loading">
                      <div className="anna-pulse"></div>
                      <p>{lang === 'en' ? 'Anna is analyzing your project...' : 'Anna analyse votre projet...'}</p>
                    </div>
                  ) : (
                    <div className="anna-advice-content">
                      {renderAnnaAdvice(annaAdvice)}
                    </div>
                  )}
                </div>
                <div className="anna-panel-footer">
                  <button className="anna-refresh-btn" onClick={askAnna} disabled={annaLoading}>
                    🔄 {lang === 'en' ? 'Refresh Analysis' : 'Actualiser l\'analyse'}
                  </button>
                  <button className="anna-close-btn" onClick={() => setAnnaVisible(false)}>
                    {lang === 'en' ? 'Back to Decisions' : 'Retour aux décisions'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Event Modal with CSS Animation */}
          {gameState.gamePhase === 'event' && gameState.currentEvent && (
            <div className="event-overlay">
              <div className="event-modal enhanced">
                <div className="event-modal-header critical">
                  <span className="event-type">⚠️ CRITICAL EVENT</span>
                  <h2>{gameState.currentEvent.title}</h2>
                </div>
                
                <div className="event-modal-body">
                  <div className="event-description">
                    <p>{gameState.currentEvent.description}</p>
                  </div>
                  
                  {/* Impact Analysis */}
                  <div className="impact-analysis">
                    <h5>📊 Potential Impact:</h5>
                    <div className="impact-cards">
                      <div className="impact-card">
                        <span className="impact-label">Budget</span>
                        <span className="impact-value warn">Variable</span>
                      </div>
                      <div className="impact-card">
                        <span className="impact-label">Schedule</span>
                        <span className="impact-value warn">At Risk</span>
                      </div>
                      <div className="impact-card">
                        <span className="impact-label">Team</span>
                        <span className="impact-value">Depends</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decision Options with Consequence Preview */}
                  <div className="event-options-grid">
                    {gameState.currentEvent.options.map((option, idx) => {
                      const colors = ['#10b981', '#f59e0b', '#ef4444', '#ED1B2F'];
                      const icons = ['✅', '⚠️', '🔥', '💡'];
                      const riskLabels = ['Safe Choice', 'Moderate Risk', 'High Risk', 'Strategic'];
                      return (
                        <button 
                          key={option.id} 
                          className="event-option-card enhanced" 
                          onClick={() => handleEventChoice(option)}
                          style={{ borderColor: colors[idx % 4] }}
                        >
                          <div className="option-header">
                            <span className="option-icon">{icons[idx % 4]}</span>
                            <span className="option-risk" style={{ color: colors[idx % 4] }}>{riskLabels[idx % 4]}</span>
                          </div>
                          <span className="option-label">{option.label}</span>
                          <div className="option-consequences">
                            {option.effects && (
                              <>
                                {option.effects.budget && <span className={option.effects.budget > 0 ? 'negative' : 'positive'}>💰 {option.effects.budget > 0 ? '-' : '+'}${Math.abs(option.effects.budget / 1000)}K</span>}
                                {option.effects.morale && <span className={option.effects.morale < 0 ? 'negative' : 'positive'}>😊 {option.effects.morale > 0 ? '+' : ''}{option.effects.morale}%</span>}
                                {option.effects.quality && <span className={option.effects.quality < 0 ? 'negative' : 'positive'}>⭐ {option.effects.quality > 0 ? '+' : ''}{option.effects.quality}%</span>}
                              </>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
                
                <div className="event-footer">
                  <span>⏱️ Choose wisely - every decision has consequences!</span>
                </div>
              </div>
            </div>
          )}

        </div>
      );
    }


    if (simPhase === 'ended' && gameState) {
      const finalScore = calculateScore(gameState);
      const grade = getGrade(finalScore);
      const budgetOnTarget = gameState.budget.spent <= gameState.budget.total;
      const scheduleOnTarget = gameState.week <= gameState.schedule.deadline;
      const scopeComplete = gameState.scope.completed >= gameState.scope.totalFeatures * 0.95;
      const qualityGood = gameState.scope.quality >= 75;
      const isGreatScore = grade.startsWith('A') || grade === 'B+';
      const isPoorScore = grade === 'F' || grade === 'D';
      
      // Calculate individual scores for breakdown
      const scopeScore = Math.round((gameState.scope.completed / gameState.scope.totalFeatures) * 100);
      const scheduleScore = scheduleOnTarget ? 100 - ((gameState.week - gameState.schedule.deadline) * 10) : Math.max(50, 100 - (gameState.week - gameState.schedule.deadline) * 15);
      const budgetScore = Math.round(budgetOnTarget ? 100 - ((gameState.budget.spent / gameState.budget.total - 0.8) * 50) : Math.max(40, 100 - ((gameState.budget.spent / gameState.budget.total - 1) * 100)));
      const qualityScore = Math.round(gameState.scope.quality);
      const teamScore = Math.round(gameState.moraleHistory.reduce((a, b) => a + b, 0) / gameState.moraleHistory.length);
      
      // Achievements
      const achievements = [
        { id: 'budget', name: 'Budget Master', icon: '💰', desc: 'Under budget', unlocked: budgetOnTarget && gameState.budget.spent < gameState.budget.total * 0.9 },
        { id: 'stakeholder', name: 'Stakeholder Pro', icon: '🤝', desc: 'High satisfaction', unlocked: qualityGood && scheduleOnTarget },
        { id: 'scope', name: 'Scope Guardian', icon: '🎯', desc: '100% scope', unlocked: scopeComplete },
        { id: 'crisis', name: 'Crisis Handler', icon: '🚨', desc: 'Managed events', unlocked: gameState.eventHistory?.length >= 2 },
        { id: 'perfect', name: 'Perfect Score', icon: '⭐', desc: 'All green', unlocked: budgetOnTarget && scheduleOnTarget && scopeComplete && qualityGood },
        { id: 'speed', name: 'Speed Demon', icon: '⚡', desc: 'Early finish', unlocked: gameState.week < gameState.schedule.deadline - 1 },
      ];
      
      return (
        <div className="sim-ended">
          {/* CSS Confetti animation for great scores */}
          {isGreatScore && <Confetti />}
          
          {/* Floating shapes */}
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
          
          <div className="results-container">
            {/* Header */}
            <div className="results-header">
              <div className="results-animation">
                {isGreatScore ? (
                  <SuccessAnimation />
                ) : isPoorScore ? (
                  <SadAnimation />
                ) : (
                  <div className="trophy-icon">🏆</div>
                )}
              </div>
              <h1>{t('results.simulationComplete', lang)}</h1>
              <p className="results-subtitle">{selectedScenario.projectName} • {selectedScenario.company}</p>
              
              {/* Main Grade */}
              <div className="grade-display">
                <span className="main-grade" style={{
                  color: grade.startsWith('A') ? '#10b981' : grade.startsWith('B') ? '#ED1B2F' : grade === 'C' ? '#f59e0b' : '#ef4444'
                }}>{grade}</span>
                <span className="grade-label">{t('results.overallGrade', lang)}</span>
              </div>
            </div>
            
            {/* Mission Recap - Original Objectives vs Results */}
            <div className="mission-recap">
              <h3>{t('results.missionRecap', lang)}</h3>
              <p className="mission-intro">{t('results.missionIntro', lang)}</p>
              
              <div className="objectives-grid">
                <div className="objective-card">
                  <div className="objective-header">
                    <span className="objective-icon">📦</span>
                    <span className="objective-name">{t('results.scope', lang)}</span>
                  </div>
                  <div className="objective-target">
                    <span className="target-label">{t('results.target', lang)}</span>
                    <span className="target-value">{t('results.deliverFeatures', lang)} {gameState.scope.totalFeatures} {t('results.features', lang)}</span>
                  </div>
                  <div className="objective-result">
                    <span className="result-label">{t('results.actual', lang)}</span>
                    <span className={`result-value ${scopeComplete ? 'good' : 'bad'}`}>
                      {Math.round(gameState.scope.completed)} {t('results.features', lang)} ({scopeScore}%)
                    </span>
                  </div>
                </div>
                
                <div className="objective-card">
                  <div className="objective-header">
                    <span className="objective-icon">📅</span>
                    <span className="objective-name">{t('results.schedule', lang)}</span>
                  </div>
                  <div className="objective-target">
                    <span className="target-label">{t('results.target', lang)}</span>
                    <span className="target-value">{t('results.completeInWeeks', lang)} {gameState.totalWeeks} {t('results.weeks', lang)}</span>
                  </div>
                  <div className="objective-result">
                    <span className="result-label">{t('results.actual', lang)}</span>
                    <span className={`result-value ${scheduleOnTarget ? 'good' : 'bad'}`}>
                      {scheduleOnTarget ? t('results.onTime', lang) : `${Math.abs(gameState.totalWeeks - gameState.week + (gameState.scheduleChanges || 0))} ${t('results.weeksOver', lang)}`}
                    </span>
                  </div>
                </div>
                
                <div className="objective-card">
                  <div className="objective-header">
                    <span className="objective-icon">💰</span>
                    <span className="objective-name">{t('results.budget', lang)}</span>
                  </div>
                  <div className="objective-target">
                    <span className="target-label">{t('results.target', lang)}</span>
                    <span className="target-value">{t('results.stayUnder', lang)} ${(gameState.budget.total / 1000).toFixed(0)}K</span>
                  </div>
                  <div className="objective-result">
                    <span className="result-label">{t('results.actual', lang)}</span>
                    <span className={`result-value ${budgetOnTarget ? 'good' : 'bad'}`}>
                      ${(gameState.budget.spent / 1000).toFixed(0)}K {t('results.spent', lang)} ({budgetOnTarget ? `${Math.round(100 - (gameState.budget.spent / gameState.budget.total) * 100)}% ${t('results.underBudget', lang)}` : t('results.overBudget', lang)})
                    </span>
                  </div>
                </div>
                
                <div className="objective-card">
                  <div className="objective-header">
                    <span className="objective-icon">⭐</span>
                    <span className="objective-name">{t('results.quality', lang)}</span>
                  </div>
                  <div className="objective-target">
                    <span className="target-label">{t('results.target', lang)}</span>
                    <span className="target-value">{t('results.maintainQuality', lang)}</span>
                  </div>
                  <div className="objective-result">
                    <span className="result-label">{t('results.actual', lang)}</span>
                    <span className={`result-value ${qualityGood ? 'good' : 'bad'}`}>
                      {qualityScore}% ({qualityGood ? t('results.metStandard', lang) : t('results.belowStandard', lang)})
                    </span>
                  </div>
                </div>
                
                <div className="objective-card">
                  <div className="objective-header">
                    <span className="objective-icon">👥</span>
                    <span className="objective-name">{t('results.team', lang)}</span>
                  </div>
                  <div className="objective-target">
                    <span className="target-label">{t('results.target', lang)}</span>
                    <span className="target-value">{t('results.keepMorale', lang)}</span>
                  </div>
                  <div className="objective-result">
                    <span className="result-label">{t('results.actual', lang)}</span>
                    <span className={`result-value ${teamScore >= 50 ? 'good' : 'bad'}`}>
                      {teamScore}% ({teamScore >= 50 ? t('results.teamHappy', lang) : t('results.teamBurnedOut', lang)})
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Score Breakdown Cards */}
            <div className="score-breakdown">
              <h3>{t('results.scoreBreakdown', lang)}</h3>
              <div className="breakdown-grid">
                <div className="breakdown-card">
                  <div className="breakdown-header">
                    <span className="breakdown-icon">📦</span>
                    <span className="breakdown-title">{t('results.scope', lang)}</span>
                  </div>
                  <div className="breakdown-value">{scopeScore}%</div>
                  <div className="breakdown-bar">
                    <div className="breakdown-fill" style={{ width: `${scopeScore}%`, background: scopeScore >= 80 ? '#10b981' : '#f59e0b' }}></div>
                  </div>
                  <span className="breakdown-status">{scopeComplete ? t('results.excellent', lang) : t('results.partial', lang)}</span>
                </div>
                
                <div className="breakdown-card">
                  <div className="breakdown-header">
                    <span className="breakdown-icon">📅</span>
                    <span className="breakdown-title">{t('results.schedule', lang)}</span>
                  </div>
                  <div className="breakdown-value">{Math.min(100, Math.max(0, scheduleScore))}%</div>
                  <div className="breakdown-bar">
                    <div className="breakdown-fill" style={{ width: `${Math.min(100, Math.max(0, scheduleScore))}%`, background: scheduleOnTarget ? '#10b981' : '#ef4444' }}></div>
                  </div>
                  <span className="breakdown-status">{scheduleOnTarget ? t('results.onTime', lang) : `${gameState.week - gameState.schedule.deadline} ${t('results.daysLate', lang)}`}</span>
                </div>
                
                <div className="breakdown-card">
                  <div className="breakdown-header">
                    <span className="breakdown-icon">💰</span>
                    <span className="breakdown-title">{t('results.budget', lang)}</span>
                  </div>
                  <div className="breakdown-value">{Math.min(100, Math.max(0, budgetScore))}%</div>
                  <div className="breakdown-bar">
                    <div className="breakdown-fill" style={{ width: `${Math.min(100, Math.max(0, budgetScore))}%`, background: budgetOnTarget ? '#10b981' : '#ef4444' }}></div>
                  </div>
                  <span className="breakdown-status">{budgetOnTarget ? `${Math.round((1 - gameState.budget.spent / gameState.budget.total) * 100)}% ${t('results.underBudget', lang)}` : t('results.overBudget', lang)}</span>
                </div>
                
                <div className="breakdown-card">
                  <div className="breakdown-header">
                    <span className="breakdown-icon">⭐</span>
                    <span className="breakdown-title">{t('results.quality', lang)}</span>
                  </div>
                  <div className="breakdown-value">{qualityScore}%</div>
                  <div className="breakdown-bar">
                    <div className="breakdown-fill" style={{ width: `${qualityScore}%`, background: qualityGood ? '#10b981' : '#f59e0b' }}></div>
                  </div>
                  <span className="breakdown-status">{qualityGood ? t('results.veryGood', lang) : t('results.needsWork', lang)}</span>
                </div>
                
                <div className="breakdown-card">
                  <div className="breakdown-header">
                    <span className="breakdown-icon">👥</span>
                    <span className="breakdown-title">{t('results.team', lang)}</span>
                  </div>
                  <div className="breakdown-value">{teamScore}%</div>
                  <div className="breakdown-bar">
                    <div className="breakdown-fill" style={{ width: `${teamScore}%`, background: teamScore >= 60 ? '#10b981' : '#f59e0b' }}></div>
                  </div>
                  <span className="breakdown-status">{teamScore >= 60 ? t('results.goodMorale', lang) : t('results.lowMorale', lang)}</span>
                </div>
              </div>
            </div>
            
            {/* Performance Analysis */}
            <div className="analysis-section">
              <h3>{t('results.performanceAnalysis', lang)}</h3>
              
              {/* What Went Well */}
              <div className="analysis-card good">
                <div className="analysis-header">
                  <span className="analysis-icon">✅</span>
                  <span className="analysis-title">{t('results.whatWentWell', lang)}</span>
                </div>
                <ul className="analysis-list">
                  {budgetOnTarget && <li>{t('results.excellentBudget', lang)}</li>}
                  {qualityGood && <li>{t('results.maintainedQuality', lang)}</li>}
                  {scheduleOnTarget && <li>{t('results.deliveredOnTime', lang)}</li>}
                  {scopeComplete && <li>{t('results.completedScope', lang)}</li>}
                  {teamScore >= 60 && <li>{t('results.keptMoraleHealthy', lang)}</li>}
                  {gameState.scheduleChanges <= 1 && <li>{t('results.minimalScheduleChanges', lang)}</li>}
                  {gameState.prototypesBuilt > 0 && <li>{t('results.usedPrototyping', lang)}</li>}
                  {!budgetOnTarget && !qualityGood && !scheduleOnTarget && !scopeComplete && teamScore < 60 && (
                    <li>{t('results.completedSimulation', lang)}</li>
                  )}
                </ul>
              </div>
              
              {/* Areas for Improvement */}
              <div className="analysis-card improve">
                <div className="analysis-header">
                  <span className="analysis-icon">💡</span>
                  <span className="analysis-title">{t('results.areasForImprovement', lang)}</span>
                </div>
                <ul className="analysis-list">
                  {!budgetOnTarget && <li>{t('results.budgetTip', lang)}</li>}
                  {!scheduleOnTarget && <li>{t('results.scheduleTip', lang)}</li>}
                  {!scopeComplete && <li>{t('results.scopeTip', lang)}</li>}
                  {!qualityGood && <li>{t('results.qualityTip', lang)}</li>}
                  {teamScore < 60 && <li>{t('results.teamTip', lang)}</li>}
                  {gameState.scheduleChanges > 2 && <li>{t('results.planningTip', lang)}</li>}
                  {budgetOnTarget && qualityGood && scheduleOnTarget && scopeComplete && teamScore >= 60 && (
                    <li>{t('results.outstandingPerformance', lang)}</li>
                  )}
                </ul>
              </div>
              
              {/* PM Tips */}
              <div className="analysis-card tips">
                <div className="analysis-header">
                  <span className="analysis-icon">🎓</span>
                  <span className="analysis-title">{t('results.pmProTips', lang)}</span>
                </div>
                <ul className="analysis-list">
                  {!scheduleOnTarget && !budgetOnTarget && (
                    <li>{t('results.ironTriangle', lang)}</li>
                  )}
                  {teamScore < 50 && (
                    <li>{t('results.sustainablePace', lang)}</li>
                  )}
                  {gameState.prototypesBuilt === 0 && selectedScenario?.hasPrototyping && (
                    <li>{t('results.riskReduction', lang)}</li>
                  )}
                  {!qualityGood && scopeComplete && (
                    <li>{t('results.technicalDebt', lang)}</li>
                  )}
                  <li><strong>{t('results.keyInsight', lang)}</strong> {
                    grade.startsWith('A') ? t('results.keyInsightA', lang) :
                    grade.startsWith('B') ? t('results.keyInsightB', lang) :
                    grade === 'C' ? t('results.keyInsightC', lang) :
                    t('results.keyInsightD', lang)
                  }</li>
                </ul>
              </div>
            </div>
            
            {/* Achievements */}
            <div className="achievements-section">
              <h3>{t('results.achievements', lang)}</h3>
              <div className="achievements-grid">
                {achievements.map(achievement => (
                  <div key={achievement.id} className={`achievement-badge ${achievement.unlocked ? 'unlocked' : 'locked'}`}>
                    <span className="achievement-icon">{achievement.icon}</span>
                    <span className="achievement-name">{achievement.name}</span>
                    {!achievement.unlocked && <span className="lock-icon">🔒</span>}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Anna AI Debrief */}
            <div className="anna-debrief-section">
              <div className="anna-debrief-header">
                {annaAvatar()}
                <div>
                  <div style={{ fontWeight: 700, color: '#14b8a6', fontSize: '1.1rem' }}>
                    {lang === 'en' ? 'ANNA — Post-Project Debrief' : 'ANNA — Bilan post-projet'}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                    {lang === 'en' ? 'AI Project Management Advisor' : 'Conseillère IA en gestion de projet'}
                  </div>
                </div>
              </div>
              <div className="anna-debrief-body">
                {annaDebrief ? (
                  <div className="anna-advice-content">
                    {renderAnnaAdvice(annaDebrief)}
                  </div>
                ) : annaDebriefLoading ? (
                  <div className="anna-loading">
                    <div className="anna-pulse"></div>
                    <p>{lang === 'en' ? 'Anna is preparing your debrief...' : 'Anna prépare votre bilan...'}</p>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '20px' }}>
                    <button className="btn-anna-debrief" onClick={() => askAnnaDebrief(finalScore, grade, gameState)}>
                      {annaAvatar()}
                      <span>{lang === 'en' ? 'Get Anna\'s Debrief' : 'Obtenir le bilan d\'Anna'}</span>
                    </button>
                    <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '8px' }}>
                      {lang === 'en' ? 'Personalized analysis of your PM performance' : 'Analyse personnalisée de votre performance GP'}
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Final Score */}
            <div className="final-score-card">
              <span className="final-label">{t('results.finalScore', lang)}</span>
              <span className="final-value">{finalScore}</span>
              <span className="final-max">/ 1000 {t('results.points', lang)}</span>
            </div>
            
            {/* Actions */}
            <div className="results-actions">
              <button className="btn-primary-lg" onClick={beginSimulation}>
                {t('results.playAgain', lang)}
              </button>
              <button className="btn-secondary-lg" onClick={() => { setSimPhase('select'); setGameState(null); }}>
                {t('results.tryNewIndustry', lang)}
              </button>
              <button className="btn-secondary-lg" onClick={() => setCurrentPage('home')}>
                {t('results.backToDashboard', lang)}
              </button>
            </div>
            
            {/* Print/Save Actions */}
            <div className="results-secondary-actions">
              <button className="btn-print" onClick={() => window.print()}>
                {t('results.printReport', lang)}
              </button>
              <button className="btn-print" onClick={() => {
                const text = lang === 'fr' 
                  ? `Résultats BizSimHub - ${selectedScenario.projectName}
Note: ${grade} | Score: ${finalScore}/1000
Périmètre: ${scopeScore}% | Calendrier: ${scheduleOnTarget ? 'À temps' : 'En retard'} | Budget: ${budgetOnTarget ? 'Respecté' : 'Dépassé'}
Qualité: ${qualityScore}% | Moral équipe: ${teamScore}%`
                  : `BizSimHub Results - ${selectedScenario.projectName}
Grade: ${grade} | Score: ${finalScore}/1000
Scope: ${scopeScore}% | Schedule: ${scheduleOnTarget ? 'On Time' : 'Late'} | Budget: ${budgetOnTarget ? 'On Target' : 'Over'}
Quality: ${qualityScore}% | Team Morale: ${teamScore}%`;
                navigator.clipboard.writeText(text);
                alert(t('results.copiedToClipboard', lang));
              }}>
                {t('results.copySummary', lang)}
              </button>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  // ============================================
  // STYLES
  // ============================================



  // ============================================
  // MAIN RETURN
  // ============================================
  
  return (
    <div className="app">
      <style>{`
        :root {
          --bg-primary: #ffffff;
          --bg-secondary: #f8f9fa;
          --bg-card: #ffffff;
          --bg-elevated: #f8f9fa;
          --text-primary: #1a1a2e;
          --text-secondary: #495057;
          --text-muted: #5c636a;
          --accent-primary: #ED1B2F;
          --accent-secondary: #c41424;
          --border: #dee2e6;
          --border-hover: #ced4da;
          --success: #2b8a3e;
          --warning: #e67700;
          --error: #c92a2a;
        }
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: var(--bg-primary);
          color: var(--text-primary);
          line-height: 1.6;
        }
        
        .app { min-height: 100vh; }
        
        button { cursor: pointer; font-family: inherit; }
        
        /* Navbar */
        .navbar { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 1rem 2rem; background: rgba(10, 10, 15, 0.9); backdrop-filter: blur(20px); border-bottom: 1px solid var(--border); }
        .navbar-transparent { background: transparent; border-bottom: none; }
        .nav-container { max-width: 1400px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; }
        .nav-logo { display: flex; align-items: center; gap: 0.5rem; cursor: pointer; }
        .logo-icon { font-size: 1.5rem; }
        .logo-text { font-size: 1.25rem; font-weight: 700; }
        .logo-accent { color: #3b82f6; }
        .nav-links { display: flex; align-items: center; gap: 1rem; }
        .nav-link { background: none; border: none; color: var(--text-secondary); font-size: 0.95rem; padding: 0.5rem 1rem; transition: color 0.2s; }
        .nav-link:hover { color: var(--text-primary); }
        .nav-btn-primary { background: var(--accent-primary); border: none; color: #ffffff; padding: 0.6rem 1.25rem; border-radius: 8px; font-weight: 500; transition: opacity 0.2s; }
        .nav-btn-primary:hover { opacity: 0.9; }
        .nav-user { display: flex; align-items: center; gap: 0.75rem; padding-left: 1rem; border-left: 1px solid var(--border); }
        .user-avatar { width: 32px; height: 32px; background: var(--accent-primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 0.9rem; }
        .user-name { font-size: 0.9rem; color: var(--text-secondary); }
        .nav-link-small { background: none; border: none; color: var(--text-muted); font-size: 0.85rem; }
        
        /* Buttons */
        .btn-primary { background: var(--accent-primary); border: none; color: #ffffff; padding: 0.75rem 1.5rem; border-radius: 10px; font-weight: 500; font-size: 0.95rem; transition: all 0.2s; }
        .btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }
        .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
        .btn-secondary { background: var(--bg-elevated); border: 1px solid var(--border); color: var(--text-primary); padding: 0.75rem 1.5rem; border-radius: 10px; font-weight: 500; font-size: 0.95rem; transition: all 0.2s; }
        .btn-secondary:hover { border-color: var(--border-hover); background: var(--bg-card); }
        .btn-full { width: 100%; }
        .btn-lg { padding: 1rem 2rem; font-size: 1.1rem; }
        .btn-primary-lg { background: var(--accent-primary); border: none; color: #ffffff; padding: 1rem 2rem; border-radius: 12px; font-weight: 600; font-size: 1.1rem; }
        .btn-secondary-lg { background: transparent; border: 1px solid var(--border); color: var(--text-primary); padding: 1rem 2rem; border-radius: 12px; font-weight: 500; font-size: 1.1rem; }
        
        /* Toast */
        .toast { position: fixed; bottom: 2rem; right: 2rem; padding: 1rem 1.5rem; border-radius: 12px; background: var(--bg-card); border: 1px solid var(--border); z-index: 1000; animation: slideIn 0.3s ease; }
        .toast.success { border-color: var(--success); }
        .toast.error { border-color: var(--error); }
        @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        
        /* Landing Page */
        .landing-page { min-height: 100vh; }
        .hero { min-height: auto; display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; overflow: hidden; padding: 100px 2rem 3rem; }
        .hero-bg { display: none; }
        .hero-banner { width: 100%; max-width: 1200px; border-radius: 16px; overflow: hidden; margin-bottom: 2.5rem; box-shadow: 0 20px 60px rgba(0,0,0,0.5); }
        .hero-banner img { width: 100%; height: auto; display: block; }
        .hero-content { position: relative; text-align: center; padding: 0 2rem; max-width: 700px; z-index: 2; }
        .hero-animation { display: none; }
        /* CSS Rocket Animation */
        .rocket-container {
          position: relative;
          width: 200px;
          height: 200px;
        }
        .rocket {
          font-size: 6rem;
          animation: rocketFloat 3s ease-in-out infinite;
          filter: drop-shadow(0 20px 40px rgba(237, 27, 47, 0.3));
          display: block;
          text-align: center;
        }
        @keyframes rocketFloat {
          0%, 100% { transform: translateY(0) rotate(-45deg); }
          50% { transform: translateY(-20px) rotate(-45deg); }
        }
        .rocket-trail {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          width: 40px;
          height: 80px;
          background: linear-gradient(to bottom, #f59e0b, #ef4444, transparent);
          border-radius: 50%;
          filter: blur(10px);
          opacity: 0.8;
          animation: trailPulse 0.5s ease-in-out infinite alternate;
        }
        @keyframes trailPulse {
          0% { height: 60px; opacity: 0.6; }
          100% { height: 100px; opacity: 1; }
        }
        @media (min-width: 1200px) {
          .hero-banner { max-width: 1200px; }
        }
        .hero-badge { display: inline-block; padding: 0.5rem 1rem; background: rgba(237, 27, 47, 0.15); border: 1px solid rgba(237, 27, 47, 0.3); border-radius: 50px; font-size: 0.9rem; color: var(--accent-primary); margin-bottom: 1.5rem; }
        .hero-title { font-size: 4rem; font-weight: 800; line-height: 1.1; margin-bottom: 1.5rem; }
        .gradient-text { background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .hero-subtitle { font-size: 1.25rem; color: var(--text-secondary); max-width: 600px; margin: 0 auto 2rem; line-height: 1.7; }
        .hero-cta { display: flex; gap: 1rem; justify-content: center; margin-bottom: 3rem; }
        .hero-stats { display: flex; gap: 3rem; justify-content: center; }
        .stat { text-align: center; }
        .stat-num { display: block; font-size: 2.5rem; font-weight: 700; color: var(--accent-primary); }
        .stat-label { font-size: 0.9rem; color: var(--text-muted); }
        
        /* Featured Section */
        .featured-section, .simulations-section { padding: 5rem 2rem; }
        .section-container { max-width: 1200px; margin: 0 auto; }
        .section-header { text-align: center; margin-bottom: 3rem; }
        .section-badge { display: inline-block; padding: 0.4rem 0.8rem; background: rgba(237, 27, 47, 0.15); border-radius: 4px; font-size: 0.8rem; color: var(--accent-primary); font-weight: 600; margin-bottom: 1rem; }
        .section-header h2 { font-size: 2.5rem; margin-bottom: 0.5rem; }
        .section-header p { color: var(--text-muted); font-size: 1.1rem; }
        .featured-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 24px; padding: 3rem; display: flex; gap: 3rem; align-items: center; }
        .featured-icon { font-size: 5rem; background: var(--bg-elevated); padding: 2rem; border-radius: 24px; }
        .featured-content h3 { font-size: 1.75rem; margin-bottom: 1rem; }
        .featured-content p { color: var(--text-secondary); margin-bottom: 1.5rem; line-height: 1.7; }
        .featured-tags { display: flex; gap: 0.5rem; margin-bottom: 1.5rem; }
        .featured-tags span { padding: 0.4rem 0.8rem; background: var(--bg-elevated); border-radius: 6px; font-size: 0.85rem; color: var(--text-muted); }
        
        /* Sim Grid */
        .sim-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; }
        .sim-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 20px; padding: 1.5rem; position: relative; transition: all 0.3s; }
        .sim-card:hover { border-color: var(--border-hover); transform: translateY(-4px); }
        .sim-card.coming-soon { opacity: 0.6; }
        .sim-icon { font-size: 2.5rem; margin-bottom: 1rem; }
        .sim-category { font-size: 0.8rem; color: var(--accent-primary); font-weight: 500; margin-bottom: 0.25rem; }
        .sim-card h3 { font-size: 1.25rem; margin-bottom: 0.25rem; }
        .sim-card p { color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1rem; }
        .sim-meta { display: flex; gap: 1rem; font-size: 0.8rem; color: var(--text-muted); }
        .sim-badge-soon, .sim-badge-featured { position: absolute; top: 1rem; right: 1rem; padding: 0.3rem 0.6rem; border-radius: 4px; font-size: 0.7rem; font-weight: 600; }
        .sim-badge-soon { background: var(--bg-elevated); color: var(--text-muted); }
        .sim-badge-featured { background: var(--success); color: #ffffff; }
        
        /* Footer */
        .footer { background: var(--bg-secondary); padding: 4rem 2rem 1rem; }
        .footer-container { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; padding-bottom: 3rem; border-bottom: 1px solid var(--border); }
        .footer-brand p { color: var(--text-muted); margin-top: 0.5rem; font-size: 0.9rem; }
        .footer-links { display: flex; gap: 4rem; }
        .footer-col h4 { font-size: 0.9rem; margin-bottom: 1rem; color: var(--text-muted); }
        .footer-col a { display: block; color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.5rem; text-decoration: none; }
        .footer-bottom { text-align: center; padding-top: 1.5rem; }
        .footer-bottom p { color: var(--text-muted); font-size: 0.85rem; }
        
        /* Auth Page */
        .auth-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding-top: 80px; }
        .auth-container { width: 100%; max-width: 420px; padding: 2rem; }
        .auth-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 24px; padding: 2.5rem; }
        .auth-card h2 { font-size: 1.75rem; margin-bottom: 0.5rem; }
        .auth-subtitle { color: var(--text-muted); margin-bottom: 2rem; }
        .auth-error { background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); color: #fca5a5; padding: 0.75rem 1rem; border-radius: 8px; margin-bottom: 1.5rem; font-size: 0.9rem; }
        .auth-success { background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); color: #6ee7b7; padding: 0.75rem 1rem; border-radius: 8px; margin-bottom: 1.5rem; font-size: 0.9rem; }
        .forgot-password-link { background: none; border: none; color: var(--accent-primary); font-size: 0.85rem; padding: 0; margin-top: 0.5rem; cursor: pointer; display: block; text-align: right; }
        .forgot-password-link:hover { text-decoration: underline; }
        .form-group { margin-bottom: 1.25rem; }
        .form-group label { display: block; font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 0.5rem; }
        .form-group input { width: 100%; padding: 0.85rem 1rem; background: var(--bg-elevated); border: 1px solid var(--border); border-radius: 10px; color: var(--text-primary); font-size: 1rem; }
        .form-group input:focus { outline: none; border-color: var(--accent-primary); }
        .form-group select { width: 100%; padding: 0.85rem 1rem; background: var(--bg-elevated); border: 1px solid var(--border); border-radius: 10px; color: var(--text-primary); font-size: 1rem; cursor: pointer; }
        .form-group select:focus { outline: none; border-color: var(--accent-primary); }
        .auth-divider { text-align: center; margin: 1.5rem 0; color: var(--text-muted); font-size: 0.9rem; }
        
        .google-icon { font-weight: 700; font-size: 1.1rem; }
        .auth-toggle { text-align: center; margin-top: 1.5rem; color: var(--text-muted); font-size: 0.9rem; }
        .auth-toggle button { background: none; border: none; color: var(--accent-primary); font-size: 0.9rem; }
        
        /* Dashboard - LIGHT THEME */
        .dashboard-page { 
          min-height: 100vh; 
          padding-top: 65px; 
          background: linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%);
          color: #1e293b;
        }
        .dashboard-page .navbar { background: rgba(255, 255, 255, 0.95); border-bottom: 1px solid #dee2e6; }
        .dashboard-page .nav-link { color: #475569; }
        .dashboard-page .nav-link:hover { color: #1e293b; }
        .dashboard-page .user-name { color: #475569; }
        .dashboard-page .nav-link-small { color: #495057; }
        
        .dashboard-layout { display: flex; max-width: 1400px; margin: 0 auto; }
        .sidebar { 
          width: 280px; 
          padding: 2rem; 
          border-right: 1px solid #343a40; 
          min-height: calc(100vh - 65px); 
          background: #ffffff;
        }
        .sidebar-section { margin-bottom: 2rem; }
        .sidebar-section h3 { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; color: #495057; margin-bottom: 1rem; font-weight: 600; }
        .sidebar-btn { 
          width: 100%; 
          padding: 0.85rem 1rem; 
          background: #f8fafc; 
          border: 1px solid #343a40; 
          border-radius: 10px; 
          color: #1e293b; 
          font-size: 0.9rem; 
          text-align: left; 
          margin-bottom: 0.5rem; 
          transition: all 0.2s; 
          font-weight: 500;
        }
        .sidebar-btn:hover { border-color: #ED1B2F; background: #f0f0ff; }
        .stat-item { display: flex; justify-content: space-between; padding: 0.75rem 0; border-bottom: 1px solid #dee2e6; font-size: 0.9rem; }
        .stat-item span { color: #495057; }
        .stat-item strong { color: #1e293b; font-weight: 700; }
        .dashboard-main { flex: 1; padding: 2rem; }
        .welcome-card { 
          background: linear-gradient(135deg, #ED1B2F 0%, #c41424 50%, #a855f7 100%); 
          border: none;
          border-radius: 24px; 
          padding: 2.5rem; 
          margin-bottom: 2rem;
          position: relative;
          overflow: hidden;
          color: #ffffff;
        }
        .welcome-card::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 60%);
          animation: shimmer 8s ease-in-out infinite;
        }
        @keyframes shimmer {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-20%, 20%); }
        }
        .welcome-card h1 { font-size: 1.75rem; margin-bottom: 0.5rem; color: #1a1a2e; position: relative; z-index: 1; }
        .welcome-card p { color: rgba(255,255,255,0.9); position: relative; z-index: 1; }
        .dashboard-section { margin-bottom: 2rem; }
        .dashboard-section h2 { font-size: 1.25rem; margin-bottom: 1rem; color: #1e293b; }
        .scores-list { display: flex; flex-direction: column; gap: 0.5rem; }
        .score-item { 
          background: #ffffff; 
          border: 1px solid #343a40; 
          border-radius: 16px; 
          padding: 1rem 1.25rem; 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
          transition: all 0.3s ease;
        }
        .score-item:hover {
          transform: translateX(4px);
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          border-color: #c7d2fe;
        }
        .score-scenario { font-weight: 600; color: #1e293b; text-transform: capitalize; }
        .score-date { font-size: 0.85rem; color: #495057; }
        .score-result { text-align: right; }
        .score-grade { font-size: 1.5rem; font-weight: 700; color: #b91425; margin-right: 0.75rem; }
        .score-points { color: #495057; font-weight: 500; }
        .no-scores { color: #495057; font-style: italic; }
        .featured-sim-card { 
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
          border: 1px solid #343a40; 
          border-radius: 20px; 
          padding: 1.5rem; 
          display: flex; 
          gap: 1.5rem; 
          cursor: pointer; 
          transition: all 0.4s ease; 
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
          position: relative;
          overflow: hidden;
        }
        .featured-sim-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(237, 27, 47, 0.08) 0%, rgba(196, 20, 36, 0.08) 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .featured-sim-card:hover { 
          border-color: #ED1B2F; 
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(237, 27, 47, 0.15);
        }
        .featured-sim-card:hover::before { opacity: 1; }
        .featured-sim-icon { 
          font-size: 2.5rem; 
          background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%);
          padding: 1rem; 
          border-radius: 16px;
          position: relative;
          z-index: 1;
        }
        .featured-sim-content { position: relative; z-index: 1; }
        .featured-sim-content h3 { margin-bottom: 0.25rem; color: #1e293b; }
        .featured-sim-content p { color: #495057; font-size: 0.9rem; margin-bottom: 0.5rem; }
        .featured-sim-cta { color: #b91425; font-size: 0.9rem; font-weight: 600; }
        
        /* Catalog - LIGHT THEME */
        .catalog-page { 
          min-height: 100vh; 
          padding-top: 65px; 
          background: linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%);
          color: #1e293b;
        }
        .catalog-page .navbar { background: rgba(255, 255, 255, 0.95); border-bottom: 1px solid #dee2e6; }
        .catalog-page .nav-link { color: #475569; }
        .catalog-page .nav-link:hover { color: #1e293b; }
        .catalog-page .user-name { color: #475569; }
        
        .catalog-container { max-width: 1400px; margin: 0 auto; padding: 2rem; }
        .catalog-header { text-align: center; margin-bottom: 3rem; }
        .catalog-header h1 { font-size: 2.5rem; margin-bottom: 0.5rem; color: #1e293b; }
        .catalog-header p { color: #495057; }
        .catalog-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(380px, 1fr)); gap: 1.5rem; }
        .catalog-card { 
          background: #ffffff; 
          border: 1px solid #343a40; 
          border-radius: 20px; 
          overflow: hidden; 
          display: flex; 
          flex-direction: column; 
          transition: all 0.3s; 
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .catalog-card:hover { border-color: #ED1B2F; transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
        .catalog-card.locked { opacity: 0.75; }
        .catalog-card-header { padding: 1.5rem; display: flex; justify-content: space-between; align-items: flex-start; }
        .catalog-icon { font-size: 3rem; }
        .catalog-badges { display: flex; gap: 0.5rem; }
        .badge-featured { padding: 0.25rem 0.6rem; background: #10b981; color: #ffffff; border-radius: 4px; font-size: 0.7rem; font-weight: 600; }
        .badge-soon { padding: 0.25rem 0.6rem; background: #e9ecef; color: #5c636a; border-radius: 4px; font-size: 0.7rem; font-weight: 600; }
        .badge-pro { padding: 0.25rem 0.6rem; background: #c41424; color: #ffffff; border-radius: 4px; font-size: 0.7rem; font-weight: 600; }
        .catalog-card-body { padding: 0 1.5rem 1.5rem; flex: 1; }
        .catalog-category { font-size: 0.8rem; color: #b91425; font-weight: 600; }
        .catalog-card-body h3 { font-size: 1.4rem; margin: 0.25rem 0; color: #1e293b; }
        .catalog-subtitle { color: #475569; font-size: 0.95rem; margin-bottom: 0.75rem; }
        .catalog-desc { color: #495057; font-size: 0.9rem; line-height: 1.6; margin-bottom: 1rem; }
        .catalog-skills { display: flex; flex-wrap: wrap; gap: 0.4rem; }
        .skill-tag { padding: 0.25rem 0.6rem; background: #f1f3f5; border-radius: 4px; font-size: 0.75rem; color: #475569; font-weight: 500; }
        .catalog-card-footer { padding: 1.25rem 1.5rem; border-top: 1px solid #343a40; background: #f8fafc; }
        .catalog-meta { display: flex; gap: 1rem; font-size: 0.8rem; color: #495057; margin-bottom: 1rem; }
        .catalog-card-footer button { width: 100%; }
        
        /* Pricing */
        .pricing-page { min-height: 100vh; padding-top: 80px; }
        .pricing-container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
        .pricing-header { text-align: center; margin-bottom: 3rem; }
        .pricing-header h1 { font-size: 2.5rem; margin-bottom: 0.5rem; }
        .pricing-header p { color: var(--text-muted); margin-bottom: 1.5rem; }
        .billing-toggle { display: inline-flex; background: var(--bg-card); border: 1px solid var(--border); border-radius: 10px; padding: 0.25rem; }
        .billing-toggle button { padding: 0.6rem 1.25rem; background: transparent; border: none; color: var(--text-muted); border-radius: 8px; font-size: 0.9rem; transition: all 0.2s; }
        .billing-toggle button.active { background: var(--accent-primary); color: #ffffff; }
        .pricing-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
        .pricing-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 20px; padding: 2rem; position: relative; }
        .pricing-card.popular { border-color: var(--accent-primary); }
        .popular-badge { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: var(--accent-primary); color: #ffffff; padding: 0.35rem 1rem; border-radius: 20px; font-size: 0.8rem; font-weight: 600; }
        .pricing-card h3 { font-size: 1.5rem; margin-bottom: 0.25rem; }
        .plan-desc { color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.5rem; }
        .plan-price { margin-bottom: 1.5rem; }
        .plan-price .price { font-size: 3rem; font-weight: 700; }
        .plan-price .period { color: var(--text-muted); }
        .plan-features { list-style: none; margin-bottom: 2rem; }
        .plan-features li { padding: 0.5rem 0; color: var(--text-secondary); font-size: 0.95rem; }
        .savings-badge { 
          background: linear-gradient(135deg, #10b981 0%, #059669 100%); 
          color: #ffffff; 
          padding: 0.5rem 1rem; 
          border-radius: 8px; 
          font-size: 0.85rem; 
          font-weight: 600; 
          margin-bottom: 1rem;
          text-align: center;
        }
        .pricing-footer {
          text-align: center;
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid var(--border);
        }
        .pricing-footer p {
          color: var(--text-muted);
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
        }
        
        /* Simulation Pages - LIGHT THEME */
        .sim-page { 
          min-height: 100vh; 
          padding-top: 65px; 
          background: #ffffff;
          color: #1e293b;
        }
        .sim-page .navbar { background: rgba(255, 255, 255, 0.95); border-bottom: 1px solid #dee2e6; }
        .sim-page .nav-link { color: #475569; }
        .sim-page .nav-link:hover { color: #1e293b; }
        .sim-page .user-name { color: #475569; }
        
        /* NEW: Industry Selection Page - Dark Theme */
        .sim-select-page {
          min-height: 100vh;
          padding-top: 65px;
          background: linear-gradient(135deg, #ffffff 0%, #1a1a2e 50%, #ffffff 100%);
          color: #1a1a2efff;
          position: relative;
          overflow: hidden;
        }
        .sim-select-page .navbar { background: rgba(20, 20, 40, 0.95); border-bottom: 1px solid rgba(237, 27, 47, 0.2); }
        .sim-select-page .nav-link { color: #495057; }
        .sim-select-page .nav-link:hover { color: #1a1a2efff; }
        .sim-select-page .user-name { color: #495057; }
        .sim-select-page .logo-text { color: #1a1a2efff; }
        .sim-select-page .back-link { color: #c41424; }
        
        .sim-select-page .sim-select-container { max-width: 1300px; margin: 0 auto; padding: 2rem; position: relative; z-index: 1; }
        
        .sim-select-page .sim-select-header { text-align: center; margin-bottom: 2.5rem; }
        .sim-select-page .sim-select-header h1 { font-size: 2.5rem; font-weight: 700; color: #1a1a2efff; margin-bottom: 0.5rem; }
        .sim-select-page .sim-select-header p { color: #495057; font-size: 1.1rem; }
        
        /* Industry Cards Grid */
        .industry-cards-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin-bottom: 3rem;
        }
        @media (max-width: 1200px) {
          .industry-cards-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 700px) {
          .industry-cards-grid { grid-template-columns: 1fr; }
        }
        
        /* Industry Card */
        .industry-card {
          background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
          border: 1px solid rgba(237, 27, 47, 0.15);
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: all 0.4s ease;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
        }
        .industry-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 50px rgba(237, 27, 47, 0.2);
          border-color: rgba(237, 27, 47, 0.4);
        }
        
        /* Card Header with Gradient */
        .industry-card-header {
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .industry-icon {
          font-size: 3.5rem;
          filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
        }
        
        /* Card Body */
        .industry-card-body {
          padding: 1.25rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .industry-card-body h3 {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1a1a2efff;
          margin-bottom: 0.25rem;
        }
        .industry-subtitle {
          font-size: 0.9rem;
          font-weight: 500;
          margin-bottom: 1rem;
        }
        .industry-challenge {
          margin-bottom: 1rem;
          flex: 1;
        }
        .challenge-label {
          font-size: 0.8rem;
          color: #495057;
          display: block;
          margin-bottom: 0.25rem;
        }
        .industry-challenge p {
          font-size: 0.85rem;
          color: #495057;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        /* Meta Info */
        .industry-meta {
          display: flex;
          gap: 1rem;
          font-size: 0.8rem;
          color: #495057;
          margin-bottom: 0.5rem;
        }
        
        /* Difficulty Badge */
        .industry-badge {
          display: inline-block;
          padding: 0.35rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          margin-top: 0.75rem;
          width: fit-content;
        }
        
        /* Card Footer */
        .industry-card-footer {
          padding: 1rem 1.25rem 1.25rem;
        }
        .industry-start-btn {
          width: 100%;
          padding: 0.85rem 1.5rem;
          border: none;
          border-radius: 10px;
          color: #1a1a2efff;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        }
        .industry-start-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.4);
        }
        
        /* Footer Info */
        .sim-select-footer {
          text-align: center;
        }
        .sim-select-footer > p {
          color: #495057;
          font-size: 0.95rem;
          margin-bottom: 1.5rem;
        }
        .sim-stats-bar {
          display: inline-flex;
          background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
          border: 1px solid rgba(237, 27, 47, 0.15);
          border-radius: 16px;
          padding: 1rem 2.5rem;
          gap: 3rem;
        }
        .sim-stat {
          text-align: center;
        }
        .sim-stat-num {
          display: block;
          font-size: 1.75rem;
          font-weight: 700;
          color: #1a1a2efff;
        }
        .sim-stat-num.purple {
          color: #c41424;
        }
        .sim-stat-label {
          font-size: 0.8rem;
          color: #495057;
        }
        
        .sim-select-container, .brief-container { max-width: 900px; margin: 0 auto; padding: 2rem; }
        .back-link { background: none; border: none; color: #b91425; font-family: inherit; font-size: 0.95rem; cursor: pointer; margin-bottom: 2rem; padding: 0; font-weight: 500; }
        .sim-select-header { text-align: center; margin-bottom: 3rem; }
        .sim-select-icon { font-size: 4rem; margin-bottom: 1rem; display: block; }
        .sim-select-header h1 { font-size: 2.5rem; margin-bottom: 0.5rem; color: #1e293b; }
        .sim-select-header p { color: #495057; }
        .scenarios-title { font-size: 1.25rem; margin-bottom: 1.5rem; color: #475569; }
        .scenarios-grid { display: flex; flex-direction: column; gap: 1rem; }
        .scenario-card { 
          background: linear-gradient(135deg, #ffffff 0%, #fafafa 100%);
          border: 1px solid #343a40; 
          border-radius: 20px; 
          padding: 1.5rem; 
          display: flex; 
          gap: 1.5rem; 
          align-items: flex-start; 
          text-align: left; 
          cursor: pointer; 
          transition: all 0.4s ease; 
          font-family: inherit; 
          color: #1e293b; 
          width: 100%; 
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
          position: relative;
          overflow: hidden;
        }
        .scenario-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(237, 27, 47, 0.05) 0%, rgba(196, 20, 36, 0.05) 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .scenario-card:hover { 
          border-color: #ED1B2F; 
          transform: translateY(-4px) scale(1.01);
          box-shadow: 0 12px 40px rgba(237, 27, 47, 0.15);
        }
        .scenario-card:hover::before { opacity: 1; }
        .scenario-icon { 
          font-size: 2.5rem; 
          background: linear-gradient(135deg, #f8fafc 0%, #212529 100%);
          padding: 1rem; 
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.06);
          position: relative;
          z-index: 1;
        }
        .scenario-info { flex: 1; }
        .scenario-info h3 { font-size: 1.2rem; margin-bottom: 0.2rem; color: #1e293b; }
        .scenario-sub { color: #b91425; font-size: 0.9rem; margin-bottom: 0.5rem; font-weight: 500; }
        .scenario-desc { color: #495057; font-size: 0.9rem; margin-bottom: 0.5rem; }
        .scenario-badge { display: inline-block; padding: 0.25rem 0.5rem; background: #eef2ff; border-radius: 4px; font-size: 0.75rem; color: #b91425; margin-right: 0.5rem; font-weight: 500; }
        .scenario-meta { text-align: right; font-size: 0.85rem; color: #495057; }
        .scenario-meta .difficulty { font-weight: 600; display: block; margin-bottom: 0.25rem; }
        
        /* Brief - LIGHT THEME */
        .brief-header { display: flex; align-items: center; gap: 1.5rem; margin-bottom: 2rem; }
        .brief-icon { font-size: 3rem; background: #f8fafc; padding: 1.25rem; border-radius: 18px; border: 1px solid #343a40; }
        .brief-header h1 { font-size: 2rem; margin-bottom: 0.25rem; color: #1e293b; }
        .brief-company { color: #b91425; font-weight: 500; }
        .brief-content { 
          background: #ffffff; 
          border: 1px solid #343a40; 
          border-radius: 18px; 
          padding: 2rem; 
          margin-bottom: 2rem; 
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .brief-section { margin-bottom: 1.5rem; }
        .brief-section h3 { font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.1em; color: #b91425; margin-bottom: 0.5rem; font-weight: 600; }
        .brief-section p { color: #475569; line-height: 1.7; }
        .mechanics-list { color: #475569; padding-left: 1.5rem; margin-top: 0.5rem; }
        .mechanics-list li { margin-bottom: 0.5rem; }
        .mechanics-list strong { color: #1e293b; }
        .brief-objectives h3 { font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.1em; color: #b91425; margin-bottom: 1rem; font-weight: 600; }
        .objectives-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
        .objective { 
          background: #f8fafc; 
          border: 1px solid #343a40;
          border-radius: 12px; 
          padding: 1rem; 
          display: flex; 
          flex-direction: column; 
          gap: 0.25rem; 
          text-align: center; 
        }
        .objective span:first-child { font-size: 1.25rem; }
        .objective strong { font-size: 0.7rem; color: #495057; font-weight: 600; text-transform: uppercase; }
        .objective span:last-child { font-family: 'JetBrains Mono', monospace; font-weight: 700; color: #1e293b; }
        .brief-actions { display: flex; gap: 1rem; justify-content: center; }
        
        /* HBP-Style Tabbed Brief */
        .brief-container.hbp-style { max-width: 1000px; }
        .brief-tabs {
          display: flex;
          gap: 0;
          border-bottom: 2px solid #343a40;
          margin-bottom: 2rem;
        }
        .brief-tab {
          padding: 1rem 1.5rem;
          background: none;
          border: none;
          font-size: 1rem;
          font-weight: 500;
          color: #495057;
          cursor: pointer;
          border-bottom: 3px solid transparent;
          margin-bottom: -2px;
          transition: all 0.2s;
        }
        .brief-tab:hover { color: #1e293b; }
        .brief-tab.active {
          color: #2563eb;
          border-bottom-color: #2563eb;
        }
        .brief-tab-content {
          background: #ffffff;
          border: 1px solid #343a40;
          border-radius: 18px;
          padding: 2.5rem;
          margin-bottom: 2rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .tab-panel h2 {
          font-size: 1.75rem;
          color: #1e293b;
          margin-bottom: 1.5rem;
        }
        .tab-panel h2 .highlight { color: #2563eb; }
        .tab-panel h3 {
          font-size: 1.25rem;
          color: #1e293b;
          margin: 2rem 0 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #dee2e6;
        }
        .tab-panel h4 {
          font-size: 1.1rem;
          color: #1e293b;
          margin: 1.5rem 0 0.5rem;
        }
        .tab-panel h4 .highlight { color: #2563eb; font-weight: 600; }
        .brief-paragraph {
          color: #475569;
          line-height: 1.8;
          margin-bottom: 1.25rem;
          font-size: 1rem;
        }
        .deliverables-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 1.5rem;
        }
        .deliverable-item {
          display: flex;
          gap: 1rem;
          padding: 1rem 1.25rem;
          background: #f8fafc;
          border: 1px solid #343a40;
          border-radius: 12px;
        }
        .deliverable-icon { font-size: 1.5rem; opacity: 0.7; }
        .deliverable-content strong {
          display: block;
          color: #1e293b;
          font-size: 0.9rem;
          margin-bottom: 0.25rem;
        }
        .deliverable-content p {
          color: #495057;
          font-size: 0.95rem;
          margin: 0;
        }
        .objectives-section { margin-top: 1.5rem; }
        .objective-block {
          background: #f8fafc;
          border: 1px solid #343a40;
          border-radius: 12px;
          padding: 1.25rem 1.5rem;
          margin-bottom: 1rem;
        }
        .objective-block h4 { margin-top: 0; }
        .objective-block p {
          color: #495057;
          margin: 0;
          font-size: 0.95rem;
          line-height: 1.6;
        }
        .scoring-summary {
          background: linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%);
          border: 1px solid #c7d2fe;
          border-radius: 12px;
          padding: 1.5rem;
          margin-top: 2rem;
        }
        .scoring-summary h4 { margin: 0 0 1rem; color: #4338ca; }
        .score-breakdown {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }
        .score-breakdown span {
          background: white;
          padding: 0.5rem 0.75rem;
          border-radius: 8px;
          font-size: 0.85rem;
          color: #4338ca;
          font-weight: 500;
        }
        .managing-section { margin-bottom: 2rem; }
        .causal-relationships {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 1rem;
        }
        .causal-item {
          display: flex;
          gap: 1rem;
          padding: 1rem 1.25rem;
          background: #f8fafc;
          border: 1px solid #343a40;
          border-radius: 12px;
        }
        .causal-icon { font-size: 1.5rem; }
        .causal-item strong {
          display: block;
          color: #1e293b;
          margin-bottom: 0.25rem;
        }
        .causal-item p {
          color: #495057;
          font-size: 0.9rem;
          margin: 0;
          line-height: 1.5;
        }
        .actions-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          margin-top: 1rem;
        }
        .action-item {
          background: #f8fafc;
          border: 1px solid #343a40;
          border-radius: 12px;
          padding: 1rem 1.25rem;
        }
        .action-item strong {
          display: block;
          color: #1e293b;
          margin-bottom: 0.25rem;
        }
        .action-item p {
          color: #495057;
          font-size: 0.9rem;
          margin: 0;
        }
        @media (max-width: 768px) {
          .brief-tabs { flex-wrap: wrap; }
          .brief-tab { flex: 1; text-align: center; padding: 0.75rem; font-size: 0.9rem; }
          .actions-grid { grid-template-columns: 1fr; }
        }
        
        /* How to Play Modal - LIGHT THEME */
        .how-to-play-modal { 
          background: #ffffff; 
          border: 1px solid #343a40; 
          border-radius: 24px; 
          padding: 2.5rem; 
          max-width: 600px; 
          width: 100%; 
          max-height: 80vh; 
          overflow-y: auto; 
          box-shadow: 0 25px 50px rgba(0,0,0,0.15);
        }
        .how-to-play-modal h2 { margin-bottom: 1.5rem; color: #1e293b; }
        .how-to-content h3 { color: #b91425; font-size: 1rem; margin: 1.5rem 0 0.5rem; }
        .how-to-content p, .how-to-content ul { color: #475569; font-size: 0.95rem; line-height: 1.7; }
        .how-to-content ul { padding-left: 1.5rem; }
        .how-to-content li { margin-bottom: 0.5rem; }
        .how-to-content strong { color: #1e293b; }
        
        /* ==========================================
           LIGHT THEME FOR SIMULATION GAMEPLAY
           ========================================== */
        
        /* Game Playing - LIGHT THEME */
        .sim-playing { 
          padding: 1.5rem; 
          background: linear-gradient(135deg, #ffffff 0%, #1a1a2e 50%, #ffffff 100%); 
          min-height: 100vh; 
          color: #1a1a2efff;
          position: relative;
          overflow-x: hidden;
        }
        .sim-playing .navbar { background: rgba(20, 20, 40, 0.95); border-bottom: 1px solid rgba(237, 27, 47, 0.2); backdrop-filter: blur(10px); }
        .sim-playing .nav-link { color: #495057; }
        .sim-playing .nav-link:hover { color: #1a1a2efff; }
        .sim-playing .user-name { color: #495057; }
        .sim-playing .logo-text { color: #1a1a2efff; }
        
        /* Floating Background Shapes */
        .floating-shapes {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 0;
        }
        .shape {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.15;
          animation: float 25s ease-in-out infinite;
        }
        .shape-1 {
          width: 600px;
          height: 600px;
          background: linear-gradient(135deg, #ED1B2F 0%, #c41424 100%);
          top: -200px;
          right: -200px;
          animation-delay: 0s;
        }
        .shape-2 {
          width: 500px;
          height: 500px;
          background: linear-gradient(135deg, #0891b2 0%, #10b981 100%);
          bottom: 0%;
          left: -150px;
          animation-delay: -8s;
        }
        .shape-3 {
          width: 400px;
          height: 400px;
          background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%);
          top: 50%;
          right: 10%;
          animation-delay: -16s;
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, -40px) scale(1.05); }
          66% { transform: translate(-30px, 30px) scale(0.95); }
        }

        /* NEW GAME LAYOUT - Sidebar + Content */
        .game-layout {
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 0;
          max-width: 1400px;
          margin: 0 auto;
          padding-top: 60px;
          min-height: calc(100vh - 60px);
          position: relative;
          z-index: 1;
        }
        @media (max-width: 900px) {
          .game-layout { grid-template-columns: 1fr; }
        }
        
        /* SIDEBAR */
        .game-sidebar {
          background: linear-gradient(180deg, #ffffff 0%, #ffffff 100%);
          border-right: 1px solid rgba(237, 27, 47, 0.15);
          padding: 1rem 0;
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 60px;
          height: calc(100vh - 60px);
          overflow-y: auto;
        }
        .sidebar-project {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.5rem 1rem 0.75rem;
          border-bottom: 1px solid rgba(237, 27, 47, 0.1);
          margin-bottom: 0.5rem;
        }
        .sidebar-project-icon { font-size: 1.4rem; }
        .sidebar-project-name { font-size: 0.8rem; font-weight: 700; color: #1a1a2e; line-height: 1.2; }
        .sidebar-company { font-size: 0.7rem; color: #495057; }
        .sidebar-week-badge {
          text-align: center;
          padding: 0.4rem 0.75rem;
          margin: 0 0.75rem 0.75rem;
          background: linear-gradient(135deg, #ED1B2F 0%, #c41424 100%);
          border-radius: 8px;
          font-size: 0.82rem;
          font-weight: 700;
          color: #ffffff;
        }
        .sidebar-week-total { opacity: 0.8; font-weight: 400; }
        .sidebar-section-label {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #495057;
          padding: 0.75rem 1rem 0.35rem;
        }
        .sidebar-nav-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          width: 100%;
          padding: 0.55rem 1rem;
          background: none;
          border: none;
          color: #495057;
          font-size: 0.82rem;
          cursor: pointer;
          transition: all 0.15s;
          text-align: left;
          border-left: 3px solid transparent;
        }
        .sidebar-nav-item:hover { color: #1a1a2e; background: rgba(237, 27, 47, 0.08); }
        .sidebar-nav-item.active {
          color: #ff3347;
          background: rgba(237, 27, 47, 0.12);
          border-left-color: #ED1B2F;
          font-weight: 600;
        }
        .sidebar-nav-icon { font-size: 0.9rem; width: 20px; text-align: center; flex-shrink: 0; }
        
        .sidebar-actions {
          margin-top: auto;
          padding: 0.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          border-top: 1px solid rgba(237, 27, 47, 0.1);
        }
        .btn-anna-sidebar {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          width: 100%;
          padding: 0.5rem 0.75rem;
          background: linear-gradient(135deg, rgba(13, 122, 110, 0.15), rgba(6, 182, 212, 0.1));
          border: 1px solid rgba(13, 122, 110, 0.3);
          border-radius: 10px;
          color: #0d7a6e;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-anna-sidebar:hover {
          background: linear-gradient(135deg, rgba(13, 122, 110, 0.25), rgba(6, 182, 212, 0.2));
          border-color: #0d7a6e;
        }
        .btn-anna-sidebar .anna-avatar-img { width: 28px !important; height: 28px !important; }
        .btn-advance-sidebar {
          width: 100%;
          padding: 0.6rem;
          background: linear-gradient(135deg, #ED1B2F 0%, #c41424 100%);
          border: none;
          border-radius: 10px;
          color: #ffffff;
          font-size: 0.82rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-advance-sidebar:hover { transform: translateY(-1px); box-shadow: 0 4px 15px rgba(237, 27, 47, 0.4); }

        /* MAIN CONTENT */
        .game-content {
          padding: 1.5rem 2rem;
          overflow-y: auto;
          max-height: calc(100vh - 60px);
          background: #ffffff;
        }
        .content-section { max-width: 900px; }
        .content-title {
          font-size: 1.5rem;
          color: #1a1a2e;
          margin-bottom: 0.5rem;
        }
        .content-desc {
          color: #495057;
          font-size: 0.9rem;
          margin-bottom: 1.5rem;
        }
        
        /* KPI Grid */
        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        @media (max-width: 700px) { .kpi-grid { grid-template-columns: repeat(2, 1fr); } }
        .kpi-card {
          background: #ffffff;
          border: 1px solid #e9ecef;
          border-radius: 14px;
          padding: 1.1rem;
          box-shadow: 0 1px 4px rgba(0,0,0,0.06);
        }
        .kpi-label { font-size: 0.65rem; color: #495057; font-weight: 600; letter-spacing: 0.05em; margin-bottom: 0.4rem; }
        .kpi-value { font-size: 1.5rem; font-weight: 700; color: #1a1a2e; margin-bottom: 0.5rem; }
        .kpi-bar { height: 5px; background: #dee2e6; border-radius: 3px; overflow: hidden; }
        .kpi-bar-fill { height: 100%; border-radius: 3px; transition: width 0.5s ease; }
        .kpi-subtext { font-size: 0.75rem; color: #495057; margin-top: 0.25rem; }
        
        /* Anna Overview Card */
        .anna-overview-card {
          background: linear-gradient(135deg, #f0fdf9 0%, #e8faf5 100%);
          border: 1px solid rgba(13, 122, 110, 0.2);
          border-radius: 14px;
          padding: 1.25rem;
          margin-bottom: 1.5rem;
        }
        .anna-overview-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
          color: #1a1a2e;
          font-size: 0.95rem;
        }
        .anna-overview-text {
          color: #5c636a;
          font-size: 0.88rem;
          line-height: 1.7;
        }
        .anna-overview-card .anna-avatar-img { width: 40px !important; height: 40px !important; }
        
        /* Overview Timeline */
        .overview-timeline {
          background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
          border: 1px solid rgba(237, 27, 47, 0.15);
          border-radius: 14px;
          padding: 1.25rem;
        }
        .overview-timeline h4 { color: #1a1a2e; font-size: 0.95rem; margin-bottom: 0.5rem; }
        .timeline-status-label { font-size: 0.8rem; margin-bottom: 0.75rem; }

        /* Team Control */
        .team-control-card {
          background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
          border: 1px solid rgba(237, 27, 47, 0.15);
          border-radius: 14px;
          padding: 2rem;
          text-align: center;
          margin-bottom: 1.5rem;
        }
        .team-control-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .team-count-large { font-size: 3rem; font-weight: 800; color: #1a1a2e; min-width: 80px; }
        .team-cost-note { font-size: 0.8rem; color: #495057; }
        
        /* Team Stats Grid */
        .team-stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        .team-stat-card {
          background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
          border: 1px solid rgba(237, 27, 47, 0.15);
          border-radius: 14px;
          padding: 1.25rem;
        }
        .team-stat-label { font-size: 0.75rem; color: #495057; margin-bottom: 0.4rem; font-weight: 600; }
        .team-stat-value { font-size: 1.5rem; font-weight: 700; margin-bottom: 0.5rem; }

        /* Resource Cards */
        .resource-card {
          background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
          border: 1px solid rgba(237, 27, 47, 0.15);
          border-radius: 14px;
          padding: 1.25rem;
          margin-bottom: 1.25rem;
        }
        .resource-card h3 { font-size: 1rem; color: #c41424; margin-bottom: 1rem; }
        .resource-actions-grid { display: flex; flex-direction: column; gap: 0.75rem; }
        .resource-action-btn {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.25rem;
          background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
          border: 1px solid #dee2e6;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
          width: 100%;
        }
        .resource-action-btn:hover { border-color: #ED1B2F; background: rgba(237, 27, 47, 0.08); transform: translateX(4px); }
        .resource-action-icon { font-size: 1.5rem; flex-shrink: 0; }
        .resource-action-btn strong { display: block; color: #1a1a2e; font-size: 0.9rem; margin-bottom: 0.2rem; }
        .resource-action-btn p { color: #495057; font-size: 0.78rem; margin: 0; }
        .resource-action-btn.quality:hover { border-color: #10b981; }
        .resource-action-btn.crunch:hover { border-color: #ef4444; }
        .resource-action-btn.schedule:hover { border-color: #f59e0b; }
        .resource-action-btn.proto:hover { border-color: #c41424; }
        .resource-action-btn.team-build:hover { border-color: #0d7a6e; }

        /* Action Toast */
        .action-toast {
          position: fixed;
          top: 72px;
          left: 50%;
          transform: translateX(-50%);
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          font-size: 0.88rem;
          font-weight: 600;
          z-index: 200;
          animation: toastIn 0.3s ease, toastOut 0.3s ease 2.7s forwards;
          box-shadow: 0 8px 30px rgba(0,0,0,0.4);
          white-space: nowrap;
        }
        .action-toast.success { background: linear-gradient(135deg, #065f46, #064e3b); border: 1px solid #10b981; color: #6ee7b7; }
        .action-toast.warn { background: linear-gradient(135deg, #78350f, #713f12); border: 1px solid #f59e0b; color: #fde68a; }
        .action-toast.info { background: linear-gradient(135deg, #eff6ff, #dbeafe); border: 1px solid #3b82f6; color: #93c5fd; }
        @keyframes toastIn { from { opacity: 0; transform: translateX(-50%) translateY(-10px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
        @keyframes toastOut { from { opacity: 1; } to { opacity: 0; transform: translateX(-50%) translateY(-10px); } }

        /* Meetings */
        .meetings-list { display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1rem; }
        .meeting-card-btn {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.25rem;
          background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
          border: 1px solid #dee2e6;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
          width: 100%;
        }
        .meeting-card-btn:hover:not(:disabled) { border-color: #ED1B2F; transform: translateX(4px); }
        .meeting-card-btn.done { border-color: rgba(16, 185, 129, 0.4); background: rgba(16, 185, 129, 0.06); }
        .meeting-card-btn:disabled { cursor: default; }
        .meeting-card-icon { font-size: 1.4rem; flex-shrink: 0; }
        .meeting-card-info { flex: 1; }
        .meeting-card-info strong { display: block; color: #1a1a2e; font-size: 0.9rem; margin-bottom: 0.15rem; }
        .meeting-card-info p { color: #495057; font-size: 0.78rem; margin: 0; }
        .meeting-card-status { font-size: 1.1rem; color: #495057; }
        .meeting-card-btn.done .meeting-card-status { color: #10b981; }
        .meetings-summary { color: #495057; font-size: 0.82rem; text-align: center; padding: 0.5rem; }

        /* Prototype */
        .prototype-status { text-align: center; margin-bottom: 1.5rem; }
        .prototype-count { font-size: 3rem; font-weight: 800; color: #c41424; }
        .prototype-status p { color: #495057; font-size: 0.85rem; }
        .prototype-complete { text-align: center; color: #10b981; font-weight: 600; padding: 2rem; font-size: 1.1rem; }

        /* Health Report */
        .health-radar-card, .health-metrics-card, .risks-report-card, .stakeholder-report-card, .milestones-report, .progress-report-card {
          background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
          border: 1px solid rgba(237, 27, 47, 0.15);
          border-radius: 14px;
          padding: 1.25rem;
          margin-bottom: 1.25rem;
        }
        .health-radar-card h4, .health-metrics-card h4, .risks-report-card h4, .stakeholder-report-card h4, .progress-report-card h4 { 
          color: #1a1a2e; font-size: 0.95rem; margin-bottom: 1rem; 
        }
        .stat-icon { font-size: 1.2rem; }
        .stat-title {
          font-size: 0.7rem;
          font-weight: 600;
          color: #495057;
          letter-spacing: 0.1em;
        }
        .stat-value {
          font-size: 2rem;
          font-weight: 800;
          color: #1a1a2efff;
          line-height: 1.1;
          margin-bottom: 0.25rem;
        }
        .stat-status {
          font-size: 0.8rem;
          margin-bottom: 0.75rem;
        }
        .stat-status.good { color: #10b981; }
        .stat-status.warn { color: #f59e0b; }
        .stat-status.bad { color: #ef4444; }
        .stat-status.neutral { color: #495057; }
        .stat-progress-bar {
          height: 6px;
          background: #dee2e6;
          border-radius: 3px;
          overflow: hidden;
        }
        .stat-progress-fill {
          height: 100%;
          border-radius: 3px;
          transition: width 0.5s ease;
        }
        
        /* MAIN CONTENT - Two Column */
        .game-main {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }
        @media (max-width: 900px) {
          .game-main { grid-template-columns: 1fr; }
        }
        
        /* DECISIONS PANEL */
        .decisions-panel {
          background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
          border: 1px solid rgba(237, 27, 47, 0.15);
          border-radius: 20px;
          padding: 1.5rem;
          box-shadow: 0 4px 30px rgba(0,0,0,0.3);
        }
        .decisions-panel h3 {
          font-size: 1.1rem;
          color: #c41424;
          margin-bottom: 1.25rem;
        }
        
        .decision-card {
          background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
          border: 1px solid #dee2e6;
          border-radius: 12px;
          padding: 1rem;
          margin-bottom: 1rem;
        }
        .decision-header {
          margin-bottom: 0.5rem;
        }
        .decision-title {
          font-size: 0.9rem;
          font-weight: 600;
          color: #1a1a2efff;
        }
        .decision-desc {
          font-size: 0.8rem;
          color: #495057;
          margin-bottom: 0.75rem;
        }
        .decision-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          justify-content: center;
        }
        .decision-btn {
          padding: 0.5rem 1rem;
          background: linear-gradient(135deg, #ffffff 0%, #f1f3f5 100%);
          border: 1px solid #dee2e6;
          border-radius: 8px;
          color: #1a1a2e;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .decision-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          border-color: #ED1B2F;
          color: #ED1B2F;
        }
        .decision-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .team-count {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1a1a2efff;
          min-width: 50px;
          text-align: center;
        }
        
        /* Decision Header with Badge */
        .decision-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }
        .decision-badge {
          font-size: 0.65rem;
          font-weight: 600;
          padding: 0.2rem 0.5rem;
          background: rgba(237, 27, 47, 0.2);
          color: #c41424;
          border-radius: 4px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        /* FOCUS SLIDERS */
        .focus-sliders {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }
        .focus-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .focus-label {
          font-size: 0.75rem;
          color: #495057;
          width: 85px;
          flex-shrink: 0;
        }
        .focus-bar {
          flex: 1;
          height: 8px;
          background: #dee2e6;
          border-radius: 4px;
          overflow: hidden;
        }
        .focus-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 0.5s ease;
        }
        .focus-fill.speed { background: linear-gradient(90deg, #3b82f6, #60a5fa); }
        .focus-fill.quality { background: linear-gradient(90deg, #c41424, #ff6b7a); }
        .focus-fill.innovation { background: linear-gradient(90deg, #10b981, #34d399); }
        .focus-value {
          font-size: 0.75rem;
          font-weight: 600;
          color: #1a1a2efff;
          width: 35px;
          text-align: right;
        }
        .focus-tip {
          font-size: 0.7rem;
          color: #495057;
          padding: 0.5rem;
          background: rgba(237, 27, 47, 0.1);
          border-radius: 6px;
          text-align: center;
        }
        
        /* PROGRESS SUMMARY */
        .progress-summary {
          background: linear-gradient(135deg, #1a1a2e 0%, #f8f9fa 100%);
          border: 1px solid rgba(237, 27, 47, 0.2);
          border-radius: 12px;
          padding: 1rem;
          margin-bottom: 1rem;
        }
        .progress-header {
          font-size: 0.85rem;
          font-weight: 600;
          color: #c41424;
          margin-bottom: 0.75rem;
        }
        .progress-stats {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }
        .progress-stat {
          text-align: center;
        }
        .progress-label {
          display: block;
          font-size: 0.65rem;
          color: #495057;
          margin-bottom: 0.25rem;
        }
        .progress-value {
          font-size: 1.1rem;
          font-weight: 700;
          color: #1a1a2efff;
        }
        .progress-tip {
          font-size: 0.7rem;
          color: #495057;
          padding: 0.5rem;
          background: rgba(196, 20, 36, 0.1);
          border-radius: 6px;
          text-align: center;
          border-left: 3px solid #c41424;
        }
        
        /* QUICK ACTIONS GRID */
        .quick-action-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.5rem;
        }
        .quick-action-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          padding: 0.75rem;
          border-radius: 10px;
          border: 1px solid #dee2e6;
          background: #ffffff;
          cursor: pointer;
          transition: all 0.2s;
        }
        .quick-action-btn span:first-child { font-size: 1.25rem; }
        .quick-action-btn span:last-child { font-size: 0.75rem; color: #495057; }
        .quick-action-btn.quality { border-color: rgba(16, 185, 129, 0.3); }
        .quick-action-btn.quality:hover { background: rgba(16, 185, 129, 0.15); border-color: #10b981; }
        .quick-action-btn.crunch { border-color: rgba(239, 68, 68, 0.3); }
        .quick-action-btn.crunch:hover { background: rgba(239, 68, 68, 0.15); border-color: #ef4444; }
        .quick-action-btn.proto { border-color: rgba(196, 20, 36, 0.3); }
        .quick-action-btn.proto:hover { background: rgba(196, 20, 36, 0.15); border-color: #c41424; }
        .quick-action-btn.schedule { border-color: rgba(245, 158, 11, 0.3); }
        .quick-action-btn.schedule:hover { background: rgba(245, 158, 11, 0.15); border-color: #f59e0b; }
        
        /* MEETINGS GRID */
        .meetings-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .meeting-chip {
          padding: 0.5rem 0.75rem;
          background: #f8f9fa;
          border: 1px solid #dee2e6;
          border-radius: 20px;
          color: #495057;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .meeting-chip:hover:not(:disabled) {
          background: #ced4da;
          border-color: #ED1B2F;
        }
        .meeting-chip.done {
          background: rgba(16, 185, 129, 0.2);
          border-color: #10b981;
          color: #10b981;
        }
        .meeting-chip:disabled { opacity: 0.6; cursor: default; }
        
        /* INFO PANEL */
        .info-panel {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          max-height: calc(100vh - 280px);
          overflow-y: auto;
        }
        .status-card, .team-panel, .alert-card, .metrics-card, .stakeholder-card, .risks-card, .milestones-card {
          background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
          border: 1px solid rgba(237, 27, 47, 0.15);
          border-radius: 16px;
          padding: 1.25rem;
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }
        .status-card h4, .team-panel h4, .metrics-card h4, .stakeholder-card h4, .risks-card h4, .milestones-card h4, .radar-card h4 { 
          font-size: 0.9rem; 
          color: #495057; 
          margin-bottom: 1rem; 
        }
        
        /* RISK RADAR */
        .radar-card {
          background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
          border: 1px solid rgba(237, 27, 47, 0.15);
          border-radius: 16px;
          padding: 1rem;
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }
        .risk-radar {
          display: flex;
          justify-content: center;
          margin-bottom: 0.5rem;
        }
        .risk-radar svg {
          width: 260px;
          height: 260px;
        }
        .radar-legend {
          display: flex;
          justify-content: center;
          gap: 1rem;
          font-size: 0.7rem;
        }
        .legend-item { color: #495057; }
        .legend-item.good { color: #10b981; }
        .legend-item.warn { color: #f59e0b; }
        .legend-item.bad { color: #ef4444; }
        
        .status-items {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .status-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem 0;
          border-bottom: 1px solid #dee2e6;
        }
        .status-item:last-child { border-bottom: none; }
        .status-item span { font-size: 0.85rem; color: #495057; }
        .status-value { font-weight: 600; color: #1a1a2efff !important; }
        .status-value.bad { color: #ef4444 !important; }
        
        /* METRICS CARD */
        .metric-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }
        .metric-row:last-child { margin-bottom: 0; }
        .metric-name {
          font-size: 0.75rem;
          color: #495057;
          width: 80px;
          flex-shrink: 0;
        }
        .metric-bar-container {
          flex: 1;
          height: 6px;
          background: #dee2e6;
          border-radius: 3px;
          overflow: hidden;
        }
        .metric-bar {
          height: 100%;
          border-radius: 3px;
          transition: width 0.5s ease;
        }
        .metric-pct {
          font-size: 0.75rem;
          font-weight: 600;
          color: #1a1a2efff;
          width: 35px;
          text-align: right;
        }
        .metric-pct.bad { color: #ef4444; }
        
        /* STAKEHOLDER MESSAGES */
        .message-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .message {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 0.75rem;
          background: #f8f9fa;
          border-radius: 10px;
          border-left: 3px solid #dee2e6;
          position: relative;
        }
        .message.urgent { border-left-color: #ef4444; background: rgba(239, 68, 68, 0.1); }
        .message.warning { border-left-color: #f59e0b; background: rgba(245, 158, 11, 0.1); }
        .message.info { border-left-color: #3b82f6; }
        .message.success { border-left-color: #10b981; background: rgba(16, 185, 129, 0.1); }
        .msg-icon { font-size: 1.25rem; }
        .msg-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }
        .msg-from {
          font-size: 0.7rem;
          font-weight: 600;
          color: #495057;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .msg-text {
          font-size: 0.8rem;
          color: #495057;
          line-height: 1.4;
        }
        .msg-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          font-weight: 700;
        }
        .msg-badge.urgent { background: #ef4444; color: #ffffff; }
        
        /* RISKS CARD */
        .risk-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .risk-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.6rem 0.75rem;
          background: #f8f9fa;
          border-radius: 8px;
        }
        .risk-level {
          font-size: 0.65rem;
          font-weight: 700;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .risk-item.high .risk-level { background: rgba(239, 68, 68, 0.2); color: #ef4444; }
        .risk-item.med .risk-level { background: rgba(245, 158, 11, 0.2); color: #f59e0b; }
        .risk-item.low .risk-level { background: rgba(59, 130, 246, 0.2); color: #3b82f6; }
        .risk-item.none { justify-content: center; }
        .risk-item.none .risk-text { color: #10b981; font-style: italic; }
        .risk-text {
          font-size: 0.8rem;
          color: #495057;
        }
        
        /* MILESTONES CARD */
        .milestone-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .milestone-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.6rem 0.75rem;
          background: #f8f9fa;
          border-radius: 8px;
          opacity: 0.8;
        }
        .milestone-item.complete { opacity: 1; }
        .milestone-item.current { 
          opacity: 1; 
          border: 1px solid #ED1B2F;
          background: rgba(237, 27, 47, 0.1);
        }
        .milestone-marker {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #adb5bd;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          color: #10b981;
        }
        .milestone-item.complete .milestone-marker { background: #10b981; }
        .milestone-item.current .milestone-marker { background: #ED1B2F; border: 2px solid #c41424; }
        .milestone-name {
          flex: 1;
          font-size: 0.8rem;
          color: #495057;
        }
        .milestone-item.complete .milestone-name { color: #10b981; }
        .milestone-week {
          font-size: 0.7rem;
          font-weight: 600;
          color: #495057;
        }
        .milestone-item.current .milestone-week { color: #c41424; }
        
        /* TEAM BUBBLES */
        .team-bubbles {
          display: flex;
          justify-content: space-around;
          gap: 0.5rem;
        }
        .team-bubble {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 0.75rem;
        }
        .team-bubble span { font-size: 0.7rem; }
        .team-bubble small { font-size: 0.65rem; opacity: 0.8; }
        .team-bubble.dev { background: linear-gradient(135deg, #3b82f6, #60a5fa); }
        .team-bubble.qa { background: linear-gradient(135deg, #10b981, #34d399); }
        .team-bubble.pm { background: linear-gradient(135deg, #c41424, #ff6b7a); }
        .team-bubble.other { background: linear-gradient(135deg, #f59e0b, #fbbf24); }
        
        /* ALERT CARD */
        .alert-card.critical {
          background: linear-gradient(135deg, #3a1a1a 0%, #fef2f2 100%);
          border-color: rgba(239, 68, 68, 0.4);
        }
        .alert-header {
          font-size: 0.75rem;
          font-weight: 700;
          color: #ef4444;
          letter-spacing: 0.1em;
          margin-bottom: 0.5rem;
        }
        .alert-card h4 { color: #1a1a2efff; margin-bottom: 0.5rem; }
        .alert-card p { font-size: 0.85rem; color: #495057; margin-bottom: 1rem; }
        .alert-respond-btn {
          width: 100%;
          padding: 0.75rem;
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          border: none;
          border-radius: 8px;
          color: #ffffff;
          font-weight: 600;
          cursor: pointer;
        }
        
        /* TIMELINE */
        .timeline-panel {
          background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
          border: 1px solid rgba(237, 27, 47, 0.15);
          border-radius: 16px;
          padding: 1.25rem;
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }
        .timeline-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        .timeline-panel h4 { font-size: 0.9rem; color: #495057; margin: 0; }
        .timeline-status {
          font-size: 0.75rem;
          font-weight: 500;
          color: #495057;
        }
        .timeline-bar {
          height: 12px;
          background: #dee2e6;
          border-radius: 6px;
          position: relative;
          margin-bottom: 1rem;
        }
        .timeline-progress {
          height: 100%;
          background: linear-gradient(90deg, #ED1B2F 0%, #c41424 100%);
          border-radius: 6px;
          transition: width 0.5s ease;
          box-shadow: 0 0 10px rgba(237, 27, 47, 0.4);
        }
        .timeline-marker {
          position: absolute;
          top: -4px;
          width: 20px;
          height: 20px;
          background: #ffffff;
          border: 3px solid #c41424;
          border-radius: 50%;
          transform: translateX(-50%);
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          z-index: 10;
        }
        .timeline-milestone {
          position: absolute;
          top: -8px;
          transform: translateX(-50%);
          z-index: 5;
        }
        .timeline-milestone span {
          font-size: 1rem;
          opacity: 0.4;
          transition: all 0.3s;
        }
        .timeline-milestone span.done {
          opacity: 1;
        }
        .timeline-milestone.deadline span {
          opacity: 1;
          font-size: 1.1rem;
        }
        .timeline-weeks {
          display: flex;
          justify-content: space-between;
        }
        .week-mark {
          font-size: 0.65rem;
          color: #495057;
        }
        .week-mark.past { color: #495057; }
        .week-mark.current { color: #c41424; font-weight: 700; }
        
        /* ADVANCE BUTTON */
        .btn-advance {
          width: 100%;
          margin-top: 1rem;
          padding: 1rem;
          font-size: 1rem;
          background: linear-gradient(135deg, #ED1B2F 0%, #c41424 100%);
          border: none;
          color: #ffffff;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 4px 20px rgba(237, 27, 47, 0.4);
        }
        .btn-advance:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(237, 27, 47, 0.5);
        }
        
        /* ENHANCED EVENT MODAL */
        .event-modal.enhanced {
          background: linear-gradient(135deg, #1a1a2e 0%, #f8f9fa 100%);
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: 24px;
          padding: 0;
          max-width: 600px;
          overflow: hidden;
          box-shadow: 0 25px 80px rgba(0,0,0,0.5), 0 0 60px rgba(239, 68, 68, 0.1);
        }
        .event-modal-header {
          padding: 1.5rem 2rem;
          text-align: center;
        }
        .event-modal-header.critical {
          background: linear-gradient(135deg, #3a1a1a 0%, #fef2f2 100%);
          border-bottom: 1px solid rgba(239, 68, 68, 0.2);
        }
        .event-type {
          font-size: 0.75rem;
          font-weight: 700;
          color: #ef4444;
          letter-spacing: 0.15em;
          display: block;
          margin-bottom: 0.5rem;
        }
        .event-modal-header h2 {
          font-size: 1.5rem;
          color: #1a1a2efff;
          margin: 0;
        }
        .event-modal-body {
          padding: 1.5rem 2rem;
        }
        .event-description p {
          color: #495057;
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }
        .impact-analysis h5 {
          font-size: 0.85rem;
          color: #495057;
          margin-bottom: 0.75rem;
        }
        .impact-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }
        .impact-card {
          background: #f8f9fa;
          border: 1px solid #dee2e6;
          border-radius: 10px;
          padding: 0.75rem;
          text-align: center;
        }
        .impact-label {
          display: block;
          font-size: 0.7rem;
          color: #495057;
          margin-bottom: 0.25rem;
        }
        .impact-value {
          font-size: 0.9rem;
          font-weight: 600;
          color: #1a1a2efff;
        }
        .impact-value.warn { color: #f59e0b; }
        
        .event-options-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
        }
        .event-option-card {
          padding: 1rem;
          background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
          border: 2px solid #dee2e6;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: left;
        }
        .event-option-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }
        .event-option-card.enhanced {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .option-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .option-icon {
          font-size: 1.25rem;
        }
        .option-risk {
          font-size: 0.65rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .option-label {
          font-size: 0.9rem;
          font-weight: 500;
          display: block;
          color: #1a1a2efff;
        }
        .option-consequences {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 0.25rem;
        }
        .option-consequences span {
          font-size: 0.7rem;
          padding: 0.2rem 0.4rem;
          background: #dee2e6;
          border-radius: 4px;
        }
        .option-consequences span.positive { color: #10b981; background: rgba(16, 185, 129, 0.15); }
        .option-consequences span.negative { color: #ef4444; background: rgba(239, 68, 68, 0.15); }
        
        .event-footer {
          padding: 1rem 2rem;
          background: #ffffff;
          text-align: center;
          font-size: 0.8rem;
          color: #495057;
        }
        
        .metric-card {
          background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(237, 27, 47, 0.15);
          border-radius: 20px;
          padding: 0.75rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.35rem;
          position: relative;
          transition: all 0.3s ease;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
        }
        .metric-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(237, 27, 47, 0.2);
          border-color: rgba(237, 27, 47, 0.4);
        }
        
        .gauge-container {
          position: relative;
          width: 72px;
          height: 72px;
        }
        .gauge-container.mini {
          width: 65px;
          height: 65px;
        }
        
        .gauge {
          width: 100%;
          height: 100%;
          transform: rotate(-90deg);
        }
        
        .gauge-bg {
          fill: none;
          stroke: #dee2e6;
          stroke-width: 7;
        }
        
        .gauge-fill {
          fill: none;
          stroke-width: 7;
          stroke-linecap: round;
          transition: stroke-dasharray 0.6s ease, stroke 0.3s ease;
          filter: drop-shadow(0 0 6px currentColor);
        }
        
        .gauge-content {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1px;
        }
        
        .gauge-icon {
          font-size: 1.1rem;
          line-height: 1;
        }
        .gauge-icon.large {
          font-size: 1.6rem;
        }
        
        .gauge-value {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          font-weight: 700;
          color: #1a1a2efff;
        }
        .gauge-value.large {
          font-size: 1.1rem;
        }
        
        .metric-label {
          font-size: 0.65rem;
          color: #495057;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 600;
        }
          font-weight: 600;
          color: #495057;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .team-display, .proto-display {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          gap: 2px;
        }
        
        /* Status Glow Effects */
        .status-glow {
          position: absolute;
          bottom: -2px;
          left: 50%;
          transform: translateX(-50%);
          width: 35px;
          height: 3px;
          border-radius: 2px;
        }
        .status-glow.good {
          background: #10b981;
          box-shadow: 0 0 10px #10b981, 0 0 20px rgba(16, 185, 129, 0.5);
          animation: glow-good 2s ease-in-out infinite;
        }
        .status-glow.warn {
          background: #f59e0b;
          box-shadow: 0 0 10px #f59e0b, 0 0 20px rgba(245, 158, 11, 0.5);
          animation: glow-warn 1.5s ease-in-out infinite;
        }
        .status-glow.bad {
          background: #ef4444;
          box-shadow: 0 0 10px #ef4444, 0 0 20px rgba(239, 68, 68, 0.5);
          animation: glow-bad 1s ease-in-out infinite;
        }
        .status-glow.neutral {
          background: #5c636a;
          box-shadow: 0 0 6px rgba(148, 163, 184, 0.3);
        }
        
        @keyframes glow-good {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; box-shadow: 0 0 15px #10b981, 0 0 30px rgba(16, 185, 129, 0.6); }
        }
        @keyframes glow-warn {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; box-shadow: 0 0 15px #f59e0b, 0 0 30px rgba(245, 158, 11, 0.6); }
        }
        @keyframes glow-bad {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; box-shadow: 0 0 15px #ef4444, 0 0 30px rgba(239, 68, 68, 0.6); }
        }
        
        /* ========== GANTT MASCOT ========== */
        .gantt-mascot {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 100;
          transition: all 0.3s ease;
        }
        .gantt-svg {
          width: 100px;
          height: 85px;
          filter: drop-shadow(0 4px 12px rgba(0,0,0,0.15));
          transition: transform 0.3s ease;
        }
        .gantt-mascot:hover .gantt-svg {
          transform: scale(1.1);
        }
        .gantt-mascot:hover .mascot-tooltip {
          opacity: 1;
          transform: translateX(0);
        }
        .mascot-tooltip {
          position: absolute;
          bottom: 100%;
          right: 0;
          background: rgba(0,0,0,0.85);
          color: #1a1a2e;
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 500;
          white-space: nowrap;
          margin-bottom: 8px;
          opacity: 0;
          transform: translateX(10px);
          transition: all 0.3s ease;
          pointer-events: none;
        }
        .mascot-tooltip::after {
          content: '';
          position: absolute;
          bottom: -6px;
          right: 20px;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 6px solid rgba(0,0,0,0.85);
        }
        
        /* Gantt bars animation */
        .gantt-mascot .bar {
          transition: all 0.5s ease;
        }
        
        /* Normal state */
        .gantt-mascot.normal .gantt-mouth { d: path("M50 60 Q55 65 60 60"); }
        .gantt-mascot.normal .explosion { opacity: 0; }
        
        /* Concerned state */
        .gantt-mascot.concerned .bar.b1 { width: 55px; }
        .gantt-mascot.concerned .bar.b2 { width: 60px; x: 35px; }
        .gantt-mascot.concerned .bar.b3 { width: 50px; }
        .gantt-mascot.concerned .gantt-mouth { d: path("M48 62 Q55 60 62 62"); }
        .gantt-mascot.concerned .explosion { opacity: 0; }
        .gantt-mascot.concerned .gantt-svg { animation: mascotWobble 2s ease-in-out infinite; }
        
        /* Stressed state */
        .gantt-mascot.stressed .bar {
          animation: barChaos 0.3s infinite;
        }
        .gantt-mascot.stressed .bar.b1 { width: 70px; fill: #ef4444; }
        .gantt-mascot.stressed .bar.b2 { width: 75px; x: 30px; fill: #ef4444; animation-delay: -0.1s; }
        .gantt-mascot.stressed .bar.b3 { width: 60px; fill: #f59e0b; animation-delay: -0.2s; }
        .gantt-mascot.stressed .bar.b4 { width: 40px; fill: #ef4444; }
        .gantt-mascot.stressed .gantt-mouth { d: path("M48 64 Q55 58 62 64"); }
        .gantt-mascot.stressed .deadline { animation: deadlinePanic 0.2s infinite; stroke: #ef4444; }
        .gantt-mascot.stressed .deadline-text { animation: deadlinePanic 0.2s infinite; }
        .gantt-mascot.stressed .explosion { opacity: 1; animation: explode 0.3s infinite; }
        .gantt-mascot.stressed .gantt-eyes circle:not([fill="white"]) { animation: eyePanic 0.3s infinite; }
        .gantt-mascot.stressed .gantt-svg { animation: mascotShake 0.2s infinite; }
        
        /* Success state */
        .gantt-mascot.success .bar { fill: #10b981; }
        .gantt-mascot.success .gantt-mouth { d: path("M46 58 Q55 68 64 58"); }
        .gantt-mascot.success .deadline { stroke: #10b981; }
        .gantt-mascot.success .deadline-text { fill: #10b981; }
        .gantt-mascot.success .explosion { opacity: 0; }
        .gantt-mascot.success .gantt-svg { animation: mascotBounce 1s ease-in-out infinite; }
        
        @keyframes barChaos {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(3px); }
        }
        @keyframes deadlinePanic {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(2px); }
        }
        @keyframes explode {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        @keyframes eyePanic {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(1px); }
        }
        @keyframes mascotWobble {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }
        @keyframes mascotShake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-2px); }
          75% { transform: translateX(2px); }
        }
        @keyframes mascotBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        /* Hide on mobile for space */
        @media (max-width: 600px) {
          .gantt-mascot { display: none; }
        }
        
        .proto-card {
          background: linear-gradient(135deg, rgba(196, 20, 36, 0.2) 0%, rgba(237, 27, 47, 0.15) 100%);
          border-color: rgba(196, 20, 36, 0.4);
        }
        
        /* Game Actions - Enhanced DARK THEME */
        .sim-playing .game-actions { 
          background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(237, 27, 47, 0.2);
          border-radius: 24px; 
          padding: 1.5rem; 
          box-shadow: 0 8px 40px rgba(0,0,0,0.4);
          position: relative;
          z-index: 1;
        }
        .sim-playing .game-actions > h3 { font-size: 1.1rem; margin-bottom: 1.25rem; color: #c41424; }
        .sim-playing .action-section { margin-bottom: 1.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid rgba(237, 27, 47, 0.15); }
        .sim-playing .action-section h4 { font-size: 0.9rem; color: #495057; margin-bottom: 0.75rem; font-weight: 600; }
        .action-row { display: flex; align-items: center; gap: 1rem; }
        .sim-playing .action-btn { 
          padding: 0.6rem 1.25rem; 
          background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%); 
          border: 1px solid #dee2e6; 
          border-radius: 10px; 
          color: #1a1a2efff; 
          font-family: inherit; 
          font-weight: 500;
          cursor: pointer; 
          transition: all 0.2s; 
        }
        .sim-playing .action-btn:hover:not(:disabled) { background: linear-gradient(135deg, #ced4da 0%, #f1f3f5 100%); border-color: var(--accent-primary); box-shadow: 0 4px 15px rgba(237, 27, 47, 0.2); }
        .sim-playing .action-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .sim-playing .action-label { font-family: 'JetBrains Mono', monospace; font-weight: 700; min-width: 120px; text-align: center; color: #1a1a2efff; }
        
        /* Meeting Options - Enhanced DARK THEME */
        .meeting-options { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; }
        .sim-playing .meeting-btn { 
          background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
          border: 2px solid #dee2e6; 
          border-radius: 16px; 
          padding: 1rem; 
          text-align: left; 
          cursor: pointer; 
          transition: all 0.3s ease; 
          display: flex; 
          flex-direction: column; 
          gap: 0.25rem;
          position: relative;
          overflow: hidden;
        }
        .sim-playing .meeting-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #ED1B2F, #c41424);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .sim-playing .meeting-btn:hover:not(:disabled) { 
          border-color: #ED1B2F; 
          background: linear-gradient(135deg, #ced4da 0%, #f1f3f5 100%);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(237, 27, 47, 0.25);
        }
        .sim-playing .meeting-btn:hover:not(:disabled)::before { opacity: 1; }
        .sim-playing .meeting-btn.active { 
          border-color: #10b981; 
          background: linear-gradient(135deg, #ecfdf5 0%, #ecfdf5 100%);
          box-shadow: 0 4px 20px rgba(16, 185, 129, 0.3);
        }
        .sim-playing .meeting-btn.active::before { 
          opacity: 1;
          background: linear-gradient(90deg, #10b981, #059669);
        }
        .sim-playing .meeting-btn:disabled { opacity: 0.7; cursor: default; }
        .meeting-icon { font-size: 1.5rem; }
        .sim-playing .meeting-name { font-weight: 700; font-size: 0.9rem; color: #1a1a2efff; }
        .sim-playing .meeting-desc { font-size: 0.8rem; color: #495057; line-height: 1.4; }
        .sim-playing .meeting-done { color: #10b981; font-size: 0.8rem; font-weight: 700; margin-top: 0.25rem; }
        
        /* Quick Actions - Enhanced DARK THEME */
        .quick-actions { display: flex; gap: 0.75rem; flex-wrap: wrap; }
        .sim-playing .quick-btn { 
          padding: 0.75rem 1.25rem; 
          background: linear-gradient(135deg, #ecfdf5 0%, #ecfdf5 100%);
          border: 2px solid rgba(16, 185, 129, 0.3); 
          border-radius: 12px; 
          color: #10b981; 
          font-family: inherit; 
          font-weight: 600;
          cursor: pointer; 
          transition: all 0.3s ease; 
          font-size: 0.9rem;
          position: relative;
          overflow: hidden;
        }
        .sim-playing .quick-btn::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: rgba(16, 185, 129, 0.2);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: width 0.4s ease, height 0.4s ease;
        }
        .sim-playing .quick-btn:hover:not(:disabled)::after {
          width: 200px;
          height: 200px;
        }
        .sim-playing .quick-btn:hover:not(:disabled) { 
          background: linear-gradient(135deg, #ecfdf5 0%, #ecfdf5 100%);
          border-color: #10b981;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(16, 185, 129, 0.3);
        }
        .sim-playing .quick-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .sim-playing .quick-btn.crunch { 
          background: linear-gradient(135deg, #3a1a1a 0%, #3a1e1e 100%);
          border-color: rgba(239, 68, 68, 0.3); 
          color: #ef4444; 
        }
        .sim-playing .quick-btn.crunch:hover:not(:disabled) { 
          background: linear-gradient(135deg, #4a2020 0%, #4a2424 100%);
          border-color: #ef4444;
          box-shadow: 0 6px 20px rgba(239, 68, 68, 0.3);
        }
        .sim-playing .quick-btn.proto { 
          background: linear-gradient(135deg, #faf5ff 0%, #faf5ff 100%);
          border-color: rgba(196, 20, 36, 0.3); 
          color: #ff6b7a; 
        }
        .sim-playing .quick-btn.proto:hover:not(:disabled) { 
          background: linear-gradient(135deg, #3a2050 0%, #3e2454 100%);
          border-color: #c41424;
          box-shadow: 0 6px 20px rgba(196, 20, 36, 0.3);
        }
        .sim-playing .quick-btn.schedule { 
          background: linear-gradient(135deg, #3a2a1a 0%, #3a2e1e 100%);
          border-color: rgba(245, 158, 11, 0.3); 
          color: #fbbf24; 
        }
        .sim-playing .quick-btn.schedule:hover:not(:disabled) { 
          background: linear-gradient(135deg, #4a3520 0%, #4a3924 100%);
          border-color: #f59e0b;
          box-shadow: 0 6px 20px rgba(245, 158, 11, 0.3);
        }
        
        .sim-playing .warning-banner { 
          background: linear-gradient(135deg, #3a2a1a 0%, #3a2e1e 100%); 
          border: 2px solid rgba(245, 158, 11, 0.4); 
          border-radius: 10px; 
          padding: 0.75rem 1rem; 
          color: #fbbf24; 
          font-size: 0.9rem; 
          font-weight: 500;
          margin-bottom: 1rem; 
        }
        
        .sim-playing .btn-advance { 
          width: 100%; 
          margin-top: 1rem; 
          padding: 1rem; 
          font-size: 1rem; 
          background: linear-gradient(135deg, #ED1B2F 0%, #c41424 100%);
          border: none;
          color: #ffffff;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 4px 20px rgba(237, 27, 47, 0.4);
        }
        .sim-playing .btn-advance:hover { background: linear-gradient(135deg, #5558e8 0%, #7c4fe3 100%); transform: translateY(-2px); box-shadow: 0 6px 25px rgba(237, 27, 47, 0.5); }
        
        /* Event Modal - LIGHT THEME */
        .sim-playing .event-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; z-index: 200; padding: 1rem; backdrop-filter: blur(8px); }
        .sim-playing .event-modal { 
          background: linear-gradient(135deg, #1a1a2e 0%, #f8f9fa 100%); 
          border: 1px solid rgba(237, 27, 47, 0.3); 
          border-radius: 24px; 
          padding: 2.5rem; 
          max-width: 520px; 
          width: 100%; 
          text-align: center; 
          box-shadow: 0 25px 80px rgba(0,0,0,0.5), 0 0 60px rgba(237, 27, 47, 0.15);
        }
        .sim-playing .event-icon { font-size: 3.5rem; margin-bottom: 1rem; display: block; }
        .sim-playing .event-modal h2 { font-size: 1.5rem; margin-bottom: 0.75rem; color: #1a1a2efff; }
        .sim-playing .event-modal p { color: #495057; line-height: 1.7; margin-bottom: 2rem; }
        .sim-playing .event-options { display: flex; flex-direction: column; gap: 0.6rem; }
        .sim-playing .event-option { 
          padding: 1rem 1.25rem; 
          background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%); 
          border: 2px solid #dee2e6; 
          border-radius: 12px; 
          color: #1a1a2efff; 
          font-family: inherit; 
          font-size: 0.95rem; 
          font-weight: 500;
          cursor: pointer; 
          text-align: left; 
          transition: all 0.3s ease; 
        }
        .sim-playing .event-option:hover { background: linear-gradient(135deg, #e9ecef 0%, #f8f9fa 100%); border-color: #ED1B2F; transform: translateX(6px); box-shadow: 0 4px 20px rgba(237, 27, 47, 0.2); }
        
        /* CSS Alert Bell Animation */
        .alert-bell {
          position: absolute;
          top: -40px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          box-shadow: 0 4px 30px rgba(239, 68, 68, 0.5);
          animation: bellRing 0.5s ease-in-out infinite alternate;
          z-index: 10;
          border: 3px solid rgba(255,255,255,0.2);
        }
        @keyframes bellRing {
          0% { transform: translateX(-50%) rotate(-10deg); }
          100% { transform: translateX(-50%) rotate(10deg); }
        }
        .sim-playing .event-modal {
          position: relative;
          overflow: visible;
        }
        
        /* Paywall Modal Styles */
        .paywall-modal {
          max-width: 440px !important;
        }
        .paywall-modal .event-icon {
          font-size: 4rem;
          margin-bottom: 0.5rem;
        }
        .paywall-modal h2 {
          color: #ff3347 !important;
          font-size: 1.6rem !important;
        }
        .paywall-hook {
          background: linear-gradient(135deg, rgba(237, 27, 47, 0.15), rgba(196, 20, 36, 0.1));
          border: 1px solid rgba(237, 27, 47, 0.25);
          padding: 1rem;
          border-radius: 12px;
          margin-bottom: 1.5rem !important;
          color: #c7d2fe;
        }
        .paywall-hook strong {
          color: #ff3347;
        }
        .paywall-price {
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 0.25rem;
          margin-bottom: 1rem;
        }
        .price-tag {
          font-size: 3rem;
          font-weight: 800;
          color: #ff3347;
        }
        .price-period {
          font-size: 1.25rem;
          color: #495057;
        }
        .paywall-features {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
          text-align: left;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
          color: #495057;
        }
        .paywall-features div {
          padding: 0.25rem 0;
        }
        .paywall-actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .paywall-upgrade {
          padding: 1rem 2rem !important;
          font-size: 1.1rem !important;
          font-weight: 600;
          background: linear-gradient(135deg, #ED1B2F 0%, #c41424 100%) !important;
          border: none !important;
          border-radius: 12px;
          color: #ffffff;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .paywall-upgrade:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(237, 27, 47, 0.4);
        }
        .paywall-later {
          padding: 0.75rem 1.5rem;
          background: transparent !important;
          border: 1px solid rgba(0, 0, 0, 0.12) !important;
          border-radius: 8px;
          color: #495057;
          cursor: pointer;
          font-size: 0.9rem;
        }
        .paywall-later:hover {
          background: rgba(0, 0, 0, 0.04) !important;
          color: #343a40;
        }
        
        /* ============================================ */
        /* ANNA — AI PROJECT MANAGEMENT ADVISOR STYLES  */
        /* ============================================ */
        
        /* Anna Intro on Briefing Page */
        .anna-intro {
          background: linear-gradient(135deg, #f0fdf9 0%, #e8faf5 100%);
          border: 1px solid rgba(13, 122, 110, 0.2);
          border-radius: 16px;
          padding: 32px 36px;
          margin-bottom: 24px;
          color: #343a40;
          position: relative;
          overflow: hidden;
        }
        .anna-intro::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #0d7a6e, #0891b2, #c41424);
        }
        .anna-intro-glow {
          position: absolute;
          top: -60px; right: -60px;
          width: 180px; height: 180px;
          background: radial-gradient(circle, rgba(13, 122, 110, 0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .anna-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 20px;
        }
        .anna-header .anna-avatar-img {
          width: 56px !important; height: 56px !important;
          border: 2px solid rgba(13, 122, 110, 0.4);
          box-shadow: 0 4px 16px rgba(13, 122, 110, 0.2);
          flex-shrink: 0;
        }
        .anna-name {
          font-size: 1.15rem;
          font-weight: 700;
          color: #0d7a6e;
        }
        .anna-title {
          font-size: 0.82rem;
          color: #5c636a;
          margin-top: 2px;
        }
        .anna-speech {
          font-size: 0.95rem;
          line-height: 1.75;
          color: #495057;
        }
        .anna-speech strong { color: #1a1a2e; }
        .anna-speech p { margin-bottom: 12px; }
        .anna-highlight {
          background: rgba(13, 122, 110, 0.06);
          border-left: 3px solid #0d7a6e;
          padding: 12px 16px;
          border-radius: 0 10px 10px 0;
          margin: 16px 0;
          font-style: italic;
          color: #343a40;
          line-height: 1.7;
        }
        
        /* Ask Anna Button in Game */
        .btn-anna {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 14px 20px;
          background: linear-gradient(135deg, rgba(13, 122, 110, 0.12) 0%, rgba(6, 182, 212, 0.08) 100%);
          border: 1px solid rgba(13, 122, 110, 0.3);
          border-radius: 12px;
          color: #0d7a6e;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-bottom: 12px;
        }
        .btn-anna:hover {
          background: linear-gradient(135deg, rgba(13, 122, 110, 0.2) 0%, rgba(6, 182, 212, 0.15) 100%);
          border-color: rgba(13, 122, 110, 0.5);
          transform: translateY(-1px);
          box-shadow: 0 4px 20px rgba(13, 122, 110, 0.2);
        }
        .btn-anna .anna-avatar-img {
          width: 36px !important; height: 36px !important;
          flex-shrink: 0;
        }
        
        /* Anna Overlay Panel */
        .anna-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 250;
          padding: 1rem;
          backdrop-filter: blur(6px);
          animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        
        .anna-panel {
          background: linear-gradient(180deg, #f8f9fa 0%, #f8f9fa 100%);
          border: 1px solid rgba(13, 122, 110, 0.25);
          border-radius: 20px;
          width: 100%;
          max-width: 560px;
          max-height: 85vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5), 0 0 40px rgba(13, 122, 110, 0.08);
          animation: slideUp 0.3s ease;
        }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        
        .anna-panel-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          border-bottom: 1px solid rgba(13, 122, 110, 0.15);
          background: linear-gradient(135deg, rgba(13, 122, 110, 0.06) 0%, transparent 100%);
        }
        .anna-panel-identity {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .anna-panel-identity .anna-avatar-img {
          width: 44px !important; height: 44px !important;
        }
        .anna-panel-name {
          font-weight: 700;
          color: #0d7a6e;
          font-size: 1.05rem;
        }
        .anna-panel-role {
          color: #5c636a;
          font-size: 0.82rem;
          margin-top: 2px;
        }
        .anna-close {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(0,0,0,0.08);
          color: #5c636a;
          width: 32px; height: 32px;
          border-radius: 8px;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .anna-close:hover { background: rgba(0,0,0,0.08); color: #495057; }
        
        .anna-panel-body {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
        }
        
        .anna-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          padding: 40px 20px;
          color: #5c636a;
        }
        .anna-pulse {
          width: 48px; height: 48px;
          border-radius: 50%;
          background: rgba(13, 122, 110, 0.2);
          animation: annaPulse 1.5s ease-in-out infinite;
        }
        @keyframes annaPulse {
          0%, 100% { transform: scale(1); opacity: 0.5; box-shadow: 0 0 0 0 rgba(13, 122, 110, 0.3); }
          50% { transform: scale(1.15); opacity: 1; box-shadow: 0 0 20px 8px rgba(13, 122, 110, 0.15); }
        }
        
        .anna-panel-footer {
          display: flex;
          gap: 10px;
          padding: 16px 24px;
          border-top: 1px solid rgba(13, 122, 110, 0.1);
          background: rgba(0, 0, 0, 0.2);
        }
        .anna-refresh-btn {
          background: rgba(13, 122, 110, 0.1);
          border: 1px solid rgba(13, 122, 110, 0.2);
          color: #0d7a6e;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .anna-refresh-btn:hover { background: rgba(13, 122, 110, 0.2); }
        .anna-refresh-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .anna-close-btn {
          flex: 1;
          background: var(--accent-primary);
          border: none;
          color: #ffffff;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .anna-close-btn:hover { opacity: 0.9; }
        
        /* Anna Debrief on Results Page */
        .anna-debrief-section {
          background: linear-gradient(135deg, #f0fdf9 0%, #e8faf5 100%);
          border: 1px solid rgba(13, 122, 110, 0.2);
          border-radius: 16px;
          padding: 0;
          margin-top: 24px;
          overflow: hidden;
        }
        .anna-debrief-header {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 24px 28px;
          background: linear-gradient(135deg, rgba(13, 122, 110, 0.08) 0%, transparent 100%);
          border-bottom: 1px solid rgba(13, 122, 110, 0.1);
        }
        .anna-debrief-header .anna-avatar-img {
          width: 48px !important; height: 48px !important;
          flex-shrink: 0;
        }
        .anna-debrief-body {
          padding: 24px 28px;
        }
        .btn-anna-debrief {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 14px 28px;
          background: linear-gradient(135deg, #0d7a6e 0%, #0d9488 100%);
          border: none;
          border-radius: 12px;
          color: #1a1a2e;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s;
        }
        .btn-anna-debrief:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(13, 122, 110, 0.35);
        }
        .btn-anna-debrief .anna-avatar-img {
          width: 32px !important; height: 32px !important;
        }
        
        /* End Screen - LIGHT THEME with CSS Animations */
        .sim-ended { 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          min-height: 100vh; 
          padding: 2rem; 
          background: linear-gradient(135deg, #ffffff 0%, #1a1a2e 50%, #ffffff 100%);
          position: relative;
          overflow: hidden;
        }
        
        /* CSS Confetti */
        .confetti-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 100;
          overflow: hidden;
        }
        .confetti-piece {
          position: absolute;
          width: 10px;
          height: 10px;
          top: -20px;
          animation: confettiFall linear forwards;
        }
        .confetti-piece:nth-child(odd) { border-radius: 50%; }
        .confetti-piece:nth-child(even) { border-radius: 2px; transform: rotate(45deg); }
        @keyframes confettiFall {
          0% { top: -20px; opacity: 1; transform: rotate(0deg) translateX(0); }
          100% { top: 110vh; opacity: 0; transform: rotate(720deg) translateX(100px); }
        }
        
        /* CSS Success Checkmark */
        .success-animation {
          width: 100px;
          height: 100px;
          margin: 0 auto;
        }
        .success-circle {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: scaleIn 0.5s ease-out;
          box-shadow: 0 10px 40px rgba(16, 185, 129, 0.4);
        }
        @keyframes scaleIn {
          0% { transform: scale(0); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        .checkmark {
          width: 50px;
          height: 50px;
          stroke: white;
          stroke-width: 4;
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
          animation: drawCheck 0.6s ease-out 0.3s forwards;
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
        }
        @keyframes drawCheck {
          to { stroke-dashoffset: 0; }
        }
        
        /* CSS Sad Face Animation */
        .sad-animation {
          width: 100px;
          height: 100px;
          margin: 0 auto;
        }
        .sad-face {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: linear-gradient(135deg, #fecaca 0%, #ef4444 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          animation: sadBounce 1s ease-in-out infinite;
          box-shadow: 0 10px 40px rgba(239, 68, 68, 0.3);
        }
        @keyframes sadBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .sad-eyes {
          display: flex;
          gap: 20px;
          margin-bottom: 8px;
        }
        .sad-eye {
          width: 12px;
          height: 12px;
          background: white;
          border-radius: 50%;
          position: relative;
        }
        .sad-eye::after {
          content: '';
          position: absolute;
          width: 6px;
          height: 6px;
          background: #1e293b;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .sad-mouth {
          width: 30px;
          height: 15px;
          border: 4px solid white;
          border-top: none;
          border-radius: 0 0 30px 30px;
          transform: rotate(180deg);
        }
        
        /* End animation container */
        .end-animation, .results-animation {
          margin-bottom: 1rem;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100px;
        }
        .trophy-icon {
          font-size: 4rem;
          animation: bounce 1s ease infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        /* NEW RESULTS CONTAINER */
        .results-container {
          max-width: 800px;
          width: 100%;
          padding: 2rem;
          position: relative;
          z-index: 10;
          animation: slideUp 0.5s ease-out;
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .results-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        .results-header h1 {
          font-size: 2rem;
          color: #1a1a2efff;
          margin-bottom: 0.25rem;
        }
        .results-subtitle {
          color: #495057;
          font-size: 1rem;
          margin-bottom: 1.5rem;
        }
        
        /* Grade Display */
        .grade-display {
          background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
          border: 1px solid rgba(237, 27, 47, 0.3);
          border-radius: 20px;
          padding: 1.5rem 3rem;
          display: inline-block;
        }
        .main-grade {
          font-size: 5rem;
          font-weight: 800;
          line-height: 1;
          display: block;
        }
        .grade-label {
          font-size: 0.85rem;
          color: #495057;
          display: block;
          margin-top: 0.5rem;
        }
        
        /* Mission Recap */
        .mission-recap {
          background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
          border: 1px solid rgba(237, 27, 47, 0.15);
          border-radius: 20px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .mission-recap h3 {
          font-size: 1rem;
          color: #495057;
          margin-bottom: 0.5rem;
        }
        .mission-intro {
          font-size: 0.85rem;
          color: #495057;
          margin-bottom: 1.25rem;
        }
        .objectives-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 0.75rem;
        }
        @media (max-width: 800px) {
          .objectives-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 500px) {
          .objectives-grid { grid-template-columns: 1fr; }
        }
        .objective-card {
          background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
          border: 1px solid #dee2e6;
          border-radius: 12px;
          padding: 1rem;
        }
        .objective-header {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          margin-bottom: 0.75rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #dee2e6;
        }
        .objective-icon { font-size: 1rem; }
        .objective-name {
          font-size: 0.75rem;
          font-weight: 600;
          color: #1a1a2efff;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .objective-target, .objective-result {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          margin-bottom: 0.5rem;
        }
        .objective-result { margin-bottom: 0; }
        .target-label, .result-label {
          font-size: 0.65rem;
          color: #495057;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .target-value {
          font-size: 0.8rem;
          color: #495057;
        }
        .result-value {
          font-size: 0.85rem;
          font-weight: 600;
        }
        .result-value.good { color: #10b981; }
        .result-value.bad { color: #ef4444; }
        
        /* Score Breakdown */
        .score-breakdown {
          background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
          border: 1px solid rgba(237, 27, 47, 0.15);
          border-radius: 20px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .score-breakdown h3 {
          font-size: 1rem;
          color: #495057;
          margin-bottom: 1.25rem;
        }
        .breakdown-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1rem;
        }
        @media (max-width: 700px) {
          .breakdown-grid { grid-template-columns: repeat(2, 1fr); }
        }
        
        .breakdown-card {
          background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
          border: 1px solid #dee2e6;
          border-radius: 12px;
          padding: 1rem;
          text-align: center;
        }
        .breakdown-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          margin-bottom: 0.5rem;
        }
        .breakdown-icon { font-size: 1rem; }
        .breakdown-title {
          font-size: 0.75rem;
          color: #495057;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .breakdown-value {
          font-size: 1.75rem;
          font-weight: 700;
          color: #1a1a2efff;
          margin-bottom: 0.5rem;
        }
        .breakdown-bar {
          height: 4px;
          background: #dee2e6;
          border-radius: 2px;
          margin-bottom: 0.5rem;
        }
        .breakdown-fill {
          height: 100%;
          border-radius: 2px;
          transition: width 0.5s ease;
        }
        .breakdown-status {
          font-size: 0.7rem;
          color: #495057;
        }
        
        /* Performance Analysis */
        .analysis-section {
          background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
          border: 1px solid rgba(237, 27, 47, 0.15);
          border-radius: 20px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .analysis-section h3 {
          font-size: 1rem;
          color: #495057;
          margin-bottom: 1.25rem;
        }
        .analysis-card {
          background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
          border-radius: 12px;
          padding: 1rem;
          margin-bottom: 1rem;
          border-left: 4px solid #dee2e6;
        }
        .analysis-card:last-child { margin-bottom: 0; }
        .analysis-card.good { border-left-color: #10b981; background: rgba(16, 185, 129, 0.05); }
        .analysis-card.improve { border-left-color: #f59e0b; background: rgba(245, 158, 11, 0.05); }
        .analysis-card.tips { border-left-color: #ED1B2F; background: rgba(237, 27, 47, 0.05); }
        .analysis-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }
        .analysis-icon { font-size: 1.1rem; }
        .analysis-title {
          font-size: 0.9rem;
          font-weight: 600;
          color: #1a1a2efff;
        }
        .analysis-card.good .analysis-title { color: #10b981; }
        .analysis-card.improve .analysis-title { color: #f59e0b; }
        .analysis-card.tips .analysis-title { color: #c41424; }
        .analysis-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .analysis-list li {
          font-size: 0.85rem;
          color: #495057;
          line-height: 1.6;
          padding: 0.5rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          padding-left: 1.25rem;
          position: relative;
        }
        .analysis-list li:last-child { border-bottom: none; }
        .analysis-list li::before {
          content: '•';
          position: absolute;
          left: 0;
          color: #495057;
        }
        .analysis-card.good .analysis-list li::before { color: #10b981; }
        .analysis-card.improve .analysis-list li::before { color: #f59e0b; }
        .analysis-card.tips .analysis-list li::before { color: #c41424; }
        .analysis-list li strong {
          color: #1a1a2efff;
        }
        
        /* Achievements */
        .achievements-section {
          background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
          border: 1px solid rgba(237, 27, 47, 0.15);
          border-radius: 20px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .achievements-section h3 {
          font-size: 1rem;
          color: #495057;
          margin-bottom: 1rem;
        }
        .achievements-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          justify-content: center;
        }
        .achievement-badge {
          background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
          border: 1px solid #dee2e6;
          border-radius: 10px;
          padding: 0.75rem 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          position: relative;
        }
        .achievement-badge.unlocked {
          border-color: #10b981;
          background: rgba(16, 185, 129, 0.1);
        }
        .achievement-badge.locked {
          opacity: 0.5;
        }
        .achievement-icon { font-size: 1.25rem; }
        .achievement-name {
          font-size: 0.8rem;
          font-weight: 500;
          color: #495057;
        }
        .lock-icon {
          font-size: 0.7rem;
          position: absolute;
          top: -4px;
          right: -4px;
        }
        
        /* Final Score Card */
        .final-score-card {
          background: linear-gradient(135deg, #ED1B2F 0%, #c41424 100%);
          border-radius: 16px;
          padding: 1.25rem;
          text-align: center;
          margin-bottom: 1.5rem;
          box-shadow: 0 4px 30px rgba(237, 27, 47, 0.4);
        }
        .final-label {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.8);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          display: block;
        }
        .final-value {
          font-size: 3rem;
          font-weight: 800;
          color: #1a1a2efff;
        }
        .final-max {
          font-size: 1rem;
          color: rgba(255,255,255,0.7);
        }
        
        /* Results Actions */
        .results-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        .btn-primary-lg {
          padding: 1rem 2rem;
          background: linear-gradient(135deg, #ED1B2F 0%, #c41424 100%);
          border: none;
          border-radius: 12px;
          color: #ffffff;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 4px 20px rgba(237, 27, 47, 0.4);
        }
        .btn-primary-lg:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(237, 27, 47, 0.5);
        }
        .btn-secondary-lg {
          padding: 1rem 2rem;
          background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
          border: 1px solid #dee2e6;
          border-radius: 12px;
          color: #495057;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s;
        }
        .btn-secondary-lg:hover {
          border-color: #ED1B2F;
          background: linear-gradient(135deg, #ced4da 0%, #f1f3f5 100%);
        }
        
        /* Secondary Actions (Print/Share) */
        .results-secondary-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-top: 1rem;
        }
        .btn-print {
          padding: 0.75rem 1.5rem;
          background: transparent;
          border: 1px solid #dee2e6;
          border-radius: 8px;
          color: #495057;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.3s;
        }
        .btn-print:hover {
          border-color: #ED1B2F;
          color: #fffffffff;
          background: rgba(237, 27, 47, 0.1);
        }
        
        /* Print Styles */
        @media print {
          body {
            background: white !important;
            color: black !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .app {
            background: white !important;
          }
          .sim-end {
            background: white !important;
            padding: 0 !important;
          }
          .floating-shapes, 
          .navbar,
          .results-actions,
          .results-secondary-actions,
          .btn-print,
          .btn-primary-lg,
          .btn-secondary-lg {
            display: none !important;
          }
          .results-container {
            max-width: 100% !important;
            padding: 0 !important;
          }
          .results-header {
            margin-bottom: 1rem !important;
          }
          .results-header h1 {
            color: #1a1a2e !important;
            font-size: 1.5rem !important;
          }
          .results-subtitle {
            color: #666 !important;
          }
          .grade-display {
            background: #f3f4f6 !important;
            border: 2px solid #343a40 !important;
            padding: 1rem 2rem !important;
          }
          .main-grade {
            font-size: 3rem !important;
          }
          .grade-label {
            color: #666 !important;
          }
          .mission-recap,
          .score-breakdown,
          .analysis-section,
          .achievements-section {
            background: #f9fafb !important;
            border: 1px solid #343a40 !important;
            page-break-inside: avoid;
            margin-bottom: 1rem !important;
            padding: 1rem !important;
          }
          .mission-recap h3,
          .score-breakdown h3,
          .analysis-section h3,
          .achievements-section h3 {
            color: #374151 !important;
            font-size: 0.9rem !important;
          }
          .mission-intro,
          .section-intro {
            color: #495057 !important;
          }
          .objectives-grid,
          .breakdown-grid {
            gap: 0.5rem !important;
          }
          .objective-card,
          .breakdown-card {
            background: white !important;
            border: 1px solid #343a40 !important;
            padding: 0.75rem !important;
          }
          .objective-name,
          .breakdown-title {
            color: #374151 !important;
          }
          .target-value {
            color: #495057 !important;
          }
          .result-value.good {
            color: #059669 !important;
          }
          .result-value.bad {
            color: #dc2626 !important;
          }
          .breakdown-value {
            font-size: 1.25rem !important;
          }
          .breakdown-bar {
            background: #343a40 !important;
          }
          .analysis-card {
            background: white !important;
            border: 1px solid #343a40 !important;
            page-break-inside: avoid;
          }
          .analysis-card.good {
            border-left: 4px solid #059669 !important;
          }
          .analysis-card.improve {
            border-left: 4px solid #d97706 !important;
          }
          .analysis-card.tips {
            border-left: 4px solid #b91425 !important;
          }
          .analysis-title {
            color: #374151 !important;
          }
          .analysis-card.good .analysis-title { color: #059669 !important; }
          .analysis-card.improve .analysis-title { color: #d97706 !important; }
          .analysis-card.tips .analysis-title { color: #b91425 !important; }
          .analysis-list li {
            color: #374151 !important;
            border-bottom-color: #343a40 !important;
          }
          .analysis-list li strong {
            color: #f8f9fa !important;
          }
          .final-score-card {
            background: #b91425 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            page-break-inside: avoid;
          }
          .achievement-badge {
            background: white !important;
            border: 1px solid #343a40 !important;
          }
          .achievement-badge.locked {
            opacity: 0.5 !important;
          }
          
          /* Add print header */
          .results-container::before {
            content: "BizSimHub - Performance Report";
            display: block;
            text-align: center;
            font-size: 0.75rem;
            color: #495057;
            margin-bottom: 0.5rem;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid #343a40;
          }
          
          /* Add print footer */
          .results-container::after {
            content: "Generated by BizSimHub.com - PM Training Simulations";
            display: block;
            text-align: center;
            font-size: 0.7rem;
            color: #495057;
            margin-top: 1rem;
            padding-top: 0.5rem;
            border-top: 1px solid #343a40;
          }
        }
        
        /* Legacy end-card (keep for fallback) */
        .end-card { 
          background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(237, 27, 47, 0.3);
          border-radius: 28px; 
          padding: 2.5rem; 
          max-width: 550px; 
          width: 100%; 
          text-align: center; 
          box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 80px rgba(237, 27, 47, 0.1);
          position: relative;
          z-index: 10;
        }
        
        .end-icon { font-size: 3rem; margin-bottom: 1rem; display: block; }
        .end-card h1 { font-size: 1.75rem; margin-bottom: 0.25rem; color: #1a1a2efff; }
        .end-card > p { color: #495057; margin-bottom: 2rem; }
        .score-display { margin-bottom: 2rem; }
        .grade { font-size: 6rem; font-weight: 800; line-height: 1; }
        .score { font-family: 'JetBrains Mono', monospace; font-size: 1.5rem; color: #495057; display: block; }
        .results { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 2rem; text-align: left; }
        .result { 
          padding: 0.85rem 1rem; 
          background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%); 
          border-radius: 10px; 
          display: flex; 
          align-items: center; 
          gap: 0.75rem; 
          font-size: 0.95rem; 
          color: #1a1a2efff;
        }
        .result.pass { border-left: 4px solid #10b981; }
        .result.fail { border-left: 4px solid #ef4444; }
        .result.pass span { color: #10b981; font-weight: 700; }
        .result.fail span { color: #ef4444; font-weight: 700; }
        .end-actions { display: flex; flex-direction: column; gap: 0.75rem; }
        .end-actions .btn-primary { background: linear-gradient(135deg, #ED1B2F 0%, #c41424 100%); border: none; color: #ffffff; box-shadow: 0 4px 20px rgba(237, 27, 47, 0.4); }
        .end-actions .btn-primary:hover { background: linear-gradient(135deg, #5558e8 0%, #7c4fe3 100%); }
        .end-actions .btn-secondary { background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%); border: 1px solid #dee2e6; color: #495057; }
        .end-actions .btn-secondary:hover { background: linear-gradient(135deg, #ced4da 0%, #f1f3f5 100%); border-color: #ED1B2F; }
        .quick-btn.proto { background: rgba(196, 20, 36, 0.1); border-color: rgba(196, 20, 36, 0.25); color: #c4b5fd; }
        .quick-btn.proto:hover { background: rgba(196, 20, 36, 0.2); }
        .quick-btn.schedule { background: rgba(245, 158, 11, 0.1); border-color: rgba(245, 158, 11, 0.25); color: #fcd34d; }
        .quick-btn.schedule:hover { background: rgba(245, 158, 11, 0.2); }
        
        .warning-banner { background: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 10px; padding: 0.75rem 1rem; color: #fcd34d; font-size: 0.9rem; margin-bottom: 1rem; }
        
        .btn-advance { width: 100%; margin-top: 1rem; padding: 1rem; font-size: 1rem; }
        
        /* Event Modal - base styles (overridden by .sim-playing for light theme) */
        .event-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.85); display: flex; align-items: center; justify-content: center; z-index: 200; padding: 1rem; backdrop-filter: blur(4px); }
        .event-modal { background: var(--bg-card); border: 1px solid var(--border); border-radius: 24px; padding: 2.5rem; max-width: 480px; width: 100%; text-align: center; }
        .event-icon { font-size: 3.5rem; margin-bottom: 1rem; display: block; }
        .event-modal h2 { font-size: 1.5rem; margin-bottom: 0.75rem; }
        .event-modal p { color: var(--text-secondary); line-height: 1.7; margin-bottom: 2rem; }
        .event-options { display: flex; flex-direction: column; gap: 0.6rem; }
        .event-option { padding: 1rem 1.25rem; background: var(--bg-elevated); border: 1px solid var(--border); border-radius: 12px; color: var(--text-primary); font-family: inherit; font-size: 0.95rem; cursor: pointer; text-align: left; transition: all 0.2s; }
        .event-option:hover { background: rgba(237, 27, 47, 0.15); border-color: var(--accent-primary); transform: translateX(6px); }
        
        /* End Screen styles moved to light theme section above */
        
        @media (max-width: 768px) {
          .hero-title { font-size: 2.75rem; }
          .hero-cta { flex-direction: column; }
          .featured-card { flex-direction: column; text-align: center; }
          .sidebar { display: none; }
          .dashboard-main { margin-left: 0; }
          .catalog-grid { grid-template-columns: 1fr; }
          .objectives-grid { grid-template-columns: repeat(2, 1fr); }
          .game-dashboard { grid-template-columns: repeat(2, 1fr); }
          .action-row { flex-wrap: wrap; justify-content: center; }
          .meeting-options { grid-template-columns: 1fr; }
          .quick-actions { flex-direction: column; }
        }

        /* ========== ADMIN DASHBOARD STYLES ========== */
        .admin-link {
          font-size: 1.2rem !important;
          padding: 0.25rem 0.5rem !important;
          opacity: 0.7;
          transition: opacity 0.2s;
        }
        .admin-link:hover { opacity: 1; }

        .admin-page {
          min-height: 100vh;
          background: #f8fafc;
        }

        .admin-layout {
          display: flex;
          min-height: calc(100vh - 65px);
        }

        /* Admin Sidebar */
        .admin-sidebar {
          width: 260px;
          background: linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%);
          color: #1a1a2e;
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 65px;
          height: calc(100vh - 65px);
        }

        .admin-sidebar-header {
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          border-bottom: 1px solid rgba(0,0,0,0.08);
        }
        .admin-sidebar-header .admin-logo { font-size: 1.5rem; }
        .admin-sidebar-header h2 { font-size: 1.1rem; font-weight: 700; margin: 0; }

        .admin-nav {
          flex: 1;
          padding: 1rem 0;
        }

        .admin-nav-btn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.85rem 1.5rem;
          background: transparent;
          border: none;
          color: rgba(255,255,255,0.7);
          font-size: 0.95rem;
          font-family: inherit;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
        }
        .admin-nav-btn:hover {
          background: rgba(0,0,0,0.08);
          color: #1a1a2e;
        }
        .admin-nav-btn.active {
          background: rgba(237, 27, 47, 0.3);
          color: #ffffff;
          border-left: 3px solid #ED1B2F;
        }
        .admin-nav-btn span { font-size: 1.1rem; }

        .admin-sidebar-footer {
          padding: 1rem 1.5rem;
          border-top: 1px solid rgba(0,0,0,0.08);
        }
        .admin-back-btn {
          width: 100%;
          padding: 0.75rem;
          background: rgba(0,0,0,0.08);
          border: none;
          border-radius: 8px;
          color: rgba(255,255,255,0.8);
          font-size: 0.9rem;
          font-family: inherit;
          cursor: pointer;
          transition: all 0.2s;
        }
        .admin-back-btn:hover { background: rgba(255,255,255,0.2); color: #1a1a2e; }

        /* Admin Main Content */
        .admin-main {
          flex: 1;
          overflow-y: auto;
          padding: 2rem;
        }

        .admin-content {
          max-width: 1400px;
          margin: 0 auto;
        }

        .admin-header {
          margin-bottom: 2rem;
        }
        .admin-header h1 {
          font-size: 1.75rem;
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 0.5rem;
        }
        .admin-header p {
          color: #495057;
          margin: 0;
        }

        /* Admin Metrics Grid */
        .admin-metrics-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
          margin-bottom: 2rem;
        }

        .admin-metric-card {
          background: white;
          border-radius: 16px;
          padding: 1.25rem;
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.08);
          position: relative;
        }

        .metric-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
        }
        .metric-icon.blue { background: #dbeafe; }
        .metric-icon.green { background: #dcfce7; }
        .metric-icon.purple { background: #f3e8ff; }
        .metric-icon.orange { background: #ffedd5; }

        .metric-info {
          flex: 1;
        }
        .metric-value {
          display: block;
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e293b;
        }
        .metric-label {
          font-size: 0.85rem;
          color: #495057;
        }

        .metric-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          padding: 0.25rem 0.5rem;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 600;
        }
        .metric-badge.green { background: #dcfce7; color: #16a34a; }
        .metric-badge.blue { background: #dbeafe; color: #2563eb; }
        .metric-badge.neutral { background: #212529; color: #495057; }

        /* Admin Stats Row */
        .admin-stats-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          margin-bottom: 2rem;
        }

        .admin-stat-card {
          background: white;
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.08);
        }
        .admin-stat-card h3 {
          font-size: 0.9rem;
          color: #495057;
          font-weight: 500;
          margin: 0 0 0.75rem;
        }
        .stat-big {
          font-size: 2rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 0.5rem;
        }
        .stat-bar {
          height: 6px;
          background: #343a40;
          border-radius: 3px;
          overflow: hidden;
          margin-bottom: 0.5rem;
        }
        .stat-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #ED1B2F, #c41424);
          border-radius: 3px;
        }
        .stat-sub {
          font-size: 0.8rem;
          color: #5c636a;
        }

        /* Admin Section */
        .admin-section {
          background: white;
          border-radius: 16px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.08);
        }
        .admin-section h3 {
          font-size: 1rem;
          font-weight: 600;
          color: #1e293b;
          margin: 0 0 1rem;
        }

        /* Activity List */
        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .activity-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 0.75rem;
          background: #f8fafc;
          border-radius: 10px;
        }
        .activity-icon { font-size: 1.25rem; }
        .activity-content {
          flex: 1;
          font-size: 0.9rem;
          color: #475569;
        }
        .activity-content strong { color: #1e293b; }
        .activity-time {
          display: block;
          font-size: 0.8rem;
          color: #5c636a;
          margin-top: 0.25rem;
        }

        /* Admin Toolbar */
        .admin-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .search-box {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: white;
          border: 1px solid #343a40;
          border-radius: 10px;
          padding: 0.6rem 1rem;
          min-width: 300px;
        }
        .search-box input {
          border: none;
          outline: none;
          font-size: 0.9rem;
          flex: 1;
          font-family: inherit;
        }

        .toolbar-actions {
          display: flex;
          gap: 0.75rem;
        }

        .admin-select {
          padding: 0.6rem 1rem;
          border: 1px solid #343a40;
          border-radius: 10px;
          font-size: 0.9rem;
          font-family: inherit;
          background: white;
          cursor: pointer;
        }

        .admin-btn {
          padding: 0.6rem 1.25rem;
          border: 1px solid #343a40;
          border-radius: 10px;
          font-size: 0.9rem;
          font-family: inherit;
          background: white;
          cursor: pointer;
          transition: all 0.2s;
        }
        .admin-btn:hover { background: #f8fafc; border-color: #495057; }
        .admin-btn.primary {
          background: #ED1B2F;
          color: #ffffff;
          border-color: #ED1B2F;
        }
        .admin-btn.primary:hover { background: #b91425; }
        .admin-btn.danger {
          color: #dc2626;
          border-color: #fecaca;
        }
        .admin-btn.danger:hover { background: #fef2f2; }
        .admin-btn.small { padding: 0.4rem 0.75rem; font-size: 0.8rem; }
        
        /* Admin Loading & Error States */
        .admin-loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(4px);
        }
        .admin-loading-spinner {
          text-align: center;
        }
        .admin-loading-spinner .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid #343a40;
          border-top-color: #ED1B2F;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin: 0 auto 1rem;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .admin-loading-spinner p {
          color: #495057;
          font-size: 0.9rem;
        }
        .admin-error-banner {
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #dc2626;
          padding: 0.75rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 0;
        }
        .admin-error-banner button {
          background: #dc2626;
          color: #1a1a2e;
          border: none;
          padding: 0.4rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.85rem;
        }
        .admin-error-banner button:hover {
          background: #b91c1c;
        }
        .refresh-btn {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .refresh-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.5rem;
        }
        .admin-header h1 {
          font-size: 1.75rem;
          color: #1e293b;
          margin-bottom: 0.25rem;
        }
        .admin-header p {
          color: #495057;
          font-size: 0.95rem;
        }
        .empty-state {
          text-align: center;
          padding: 3rem;
          color: #495057;
        }
        .empty-state .empty-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        .admin-badge {
          display: inline-block;
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color: #1a1a2e;
          font-size: 0.65rem;
          font-weight: 600;
          padding: 0.15rem 0.4rem;
          border-radius: 4px;
          margin-left: 0.5rem;
          vertical-align: middle;
          text-transform: uppercase;
        }
        .tester-badge {
          display: inline-block;
          background: linear-gradient(135deg, #10b981, #059669);
          color: #ffffff;
          font-size: 0.65rem;
          font-weight: 600;
          padding: 0.15rem 0.4rem;
          border-radius: 4px;
          margin-left: 0.5rem;
          vertical-align: middle;
          text-transform: uppercase;
        }
        .action-btn.admin-active {
          background: #fef3c7;
          border-color: #f59e0b;
        }
        .action-btn.admin-active:hover {
          background: #fde68a;
        }
        .action-btn.tester-active {
          background: #d1fae5;
          border-color: #10b981;
        }
        .action-btn.tester-active:hover {
          background: #a7f3d0;
        }

        /* Admin Table */
        .admin-table-container {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.08);
        }

        .admin-table {
          width: 100%;
          border-collapse: collapse;
        }
        .admin-table th {
          text-align: left;
          padding: 1rem 1.25rem;
          background: #f8fafc;
          font-size: 0.8rem;
          font-weight: 600;
          color: #495057;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-bottom: 1px solid #dee2e6;
        }
        .admin-table td {
          padding: 1rem 1.25rem;
          border-bottom: 1px solid #212529;
          font-size: 0.9rem;
        }
        .admin-table tr:hover { background: #fafbfc; }

        .user-cell {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .user-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ED1B2F, #c41424);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 0.9rem;
        }
        .user-avatar.large {
          width: 64px;
          height: 64px;
          font-size: 1.5rem;
        }
        .user-info strong {
          display: block;
          color: #1e293b;
        }
        .user-info span {
          font-size: 0.8rem;
          color: #5c636a;
        }

        .plan-badge {
          display: inline-block;
          padding: 0.25rem 0.6rem;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 500;
        }
        .plan-badge.free { background: #212529; color: #495057; }
        .plan-badge.tester { background: #d1fae5; color: #059669; }
        .plan-badge.professional { background: #dbeafe; color: #2563eb; }
        .plan-badge.lifetime { background: #fef3c7; color: #b45309; }
        .plan-badge.enterprise { background: #f3e8ff; color: #a01020; }

        .status-badge {
          display: inline-block;
          padding: 0.25rem 0.6rem;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 500;
        }
        .status-badge.active { background: #dcfce7; color: #16a34a; }
        .status-badge.inactive { background: #fef3c7; color: #d97706; }
        .status-badge.lifetime { background: #fef3c7; color: #b45309; }
        .status-badge.churned { background: #fee2e2; color: #dc2626; }

        .sim-count {
          font-weight: 600;
          color: #1e293b;
        }
        .sim-label {
          font-size: 0.75rem;
          color: #5c636a;
          margin-left: 0.25rem;
        }
        .last-active { color: #495057; }

        .action-btns {
          display: flex;
          gap: 0.5rem;
        }
        .action-btn {
          width: 32px;
          height: 32px;
          border: none;
          border-radius: 8px;
          background: #212529;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 0.9rem;
        }
        .action-btn:hover { background: #343a40; }
        .action-btn.danger:hover { background: #fee2e2; }

        /* User Stats */
        .admin-user-stats {
          display: flex;
          gap: 2rem;
          margin-bottom: 1.5rem;
          padding: 1rem;
          background: white;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.08);
        }
        .user-stat {
          text-align: center;
        }
        .user-stat-value {
          display: block;
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e293b;
        }
        .user-stat-label {
          font-size: 0.8rem;
          color: #495057;
        }

        /* Admin Modal */
        .admin-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
        }
        .admin-modal {
          background: white;
          border-radius: 20px;
          max-width: 500px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid #dee2e6;
        }
        .modal-header h2 {
          margin: 0;
          font-size: 1.25rem;
        }
        .modal-close {
          width: 32px;
          height: 32px;
          border: none;
          border-radius: 8px;
          background: #212529;
          font-size: 1.25rem;
          cursor: pointer;
        }
        .modal-body { padding: 1.5rem; }
        .modal-footer {
          padding: 1rem 1.5rem;
          border-top: 1px solid #343a40;
          display: flex;
          gap: 0.75rem;
          justify-content: flex-end;
        }

        .user-detail-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        .user-detail-header h3 { margin: 0; }
        .user-detail-header p { margin: 0; color: #495057; }

        .user-detail-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        .detail-item label {
          display: block;
          font-size: 0.8rem;
          color: #495057;
          margin-bottom: 0.25rem;
        }
        .detail-item span {
          font-weight: 500;
          color: #1e293b;
        }

        /* Bar Chart */
        .bar-chart {
          display: flex;
          align-items: flex-end;
          gap: 1rem;
          height: 200px;
          padding: 1rem 0;
        }
        .bar-group {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }
        .bar-container {
          flex: 1;
          width: 100%;
          display: flex;
          gap: 4px;
          align-items: flex-end;
          justify-content: center;
        }
        .bar {
          width: 20px;
          border-radius: 4px 4px 0 0;
          transition: height 0.3s ease;
        }
        .bar.users { background: #ED1B2F; }
        .bar.sessions { background: #10b981; }
        .bar-label {
          font-size: 0.8rem;
          color: #495057;
        }
        .chart-legend {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          margin-top: 1rem;
        }
        .legend-dot {
          display: inline-block;
          width: 12px;
          height: 12px;
          border-radius: 3px;
          margin-right: 0.5rem;
        }
        .legend-dot.users { background: #ED1B2F; }
        .legend-dot.sessions { background: #10b981; }

        /* Sim Rankings */
        .sim-rankings {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .sim-rank-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: #f8fafc;
          border-radius: 12px;
        }
        .rank {
          font-size: 1.1rem;
          font-weight: 700;
          color: #ED1B2F;
          min-width: 40px;
        }
        .sim-rank-info { flex: 1; }
        .sim-rank-info strong {
          display: block;
          color: #1e293b;
          margin-bottom: 0.25rem;
        }
        .sim-rank-stats {
          display: flex;
          gap: 1rem;
          font-size: 0.8rem;
          color: #495057;
        }
        .completion-rate {
          text-align: right;
          font-size: 1.25rem;
          font-weight: 700;
          color: #10b981;
        }
        .completion-rate span {
          display: block;
          font-size: 0.7rem;
          font-weight: 400;
          color: #5c636a;
        }

        /* Grade Chart */
        .grade-chart {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .grade-bar-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .grade-label {
          width: 30px;
          font-weight: 700;
          color: #1e293b;
        }
        .grade-bar-container {
          flex: 1;
          height: 24px;
          background: #212529;
          border-radius: 6px;
          overflow: hidden;
        }
        .grade-bar {
          height: 100%;
          border-radius: 6px;
          transition: width 0.3s ease;
        }
        .grade-bar.grade-a { background: #10b981; }
        .grade-bar.grade-b { background: #ED1B2F; }
        .grade-bar.grade-c { background: #f59e0b; }
        .grade-bar.grade-d { background: #f97316; }
        .grade-bar.grade-f { background: #ef4444; }
        .grade-pct {
          width: 40px;
          text-align: right;
          font-weight: 500;
          color: #495057;
        }

        /* Subscription Breakdown */
        .subscription-breakdown {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .sub-item {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .sub-info {
          min-width: 150px;
        }
        .sub-plan {
          display: block;
          font-weight: 600;
          color: #1e293b;
        }
        .sub-count {
          font-size: 0.8rem;
          color: #495057;
        }
        .sub-bar {
          flex: 1;
          height: 20px;
          background: #212529;
          border-radius: 10px;
          overflow: hidden;
        }
        .sub-bar-fill {
          height: 100%;
          border-radius: 10px;
        }
        .sub-item.free .sub-bar-fill { background: #5c636a; }
        .sub-item.professional .sub-bar-fill { background: #ED1B2F; }
        .sub-item.enterprise .sub-bar-fill { background: #c41424; }
        .sub-pct {
          min-width: 50px;
          text-align: right;
          font-weight: 600;
          color: #1e293b;
        }

        /* Transactions */
        .transactions-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .transaction-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem 1rem;
          background: #f8fafc;
          border-radius: 10px;
        }
        .transaction-item.failed { background: #fef2f2; }
        .txn-info { flex: 1; }
        .txn-info strong { display: block; color: #1e293b; }
        .txn-info span { font-size: 0.8rem; color: #495057; }
        .txn-amount {
          font-weight: 700;
          color: #10b981;
        }
        .txn-date {
          font-size: 0.85rem;
          color: #495057;
          min-width: 100px;
        }
        .txn-status {
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 500;
        }
        .txn-status.succeeded { background: #dcfce7; color: #16a34a; }
        .txn-status.failed { background: #fee2e2; color: #dc2626; }

        /* Content Grid */
        .content-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1rem;
        }
        .content-card {
          background: white;
          border-radius: 16px;
          padding: 1.25rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.08);
        }
        .content-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.75rem;
        }
        .content-header h4 { margin: 0; color: #1e293b; }
        .content-status {
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 500;
        }
        .content-status.published { background: #dcfce7; color: #16a34a; }
        .content-status.draft { background: #fef3c7; color: #d97706; }
        .content-status.review { background: #dbeafe; color: #2563eb; }
        .content-stats {
          display: flex;
          gap: 1rem;
          font-size: 0.85rem;
          color: #495057;
          margin-bottom: 0.5rem;
        }
        .content-meta {
          font-size: 0.8rem;
          color: #5c636a;
          margin-bottom: 1rem;
        }
        .content-actions {
          display: flex;
          gap: 0.5rem;
        }

        /* Resource Usage */
        .resource-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }
        .resource-item { }
        .resource-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
        }
        .resource-header span:first-child { color: #495057; }
        .resource-header span:last-child { font-weight: 600; color: #1e293b; }
        .resource-bar {
          height: 8px;
          background: #343a40;
          border-radius: 4px;
          overflow: hidden;
        }
        .resource-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 0.3s ease;
        }
        .resource-fill.cpu { background: linear-gradient(90deg, #10b981, #34d399); }
        .resource-fill.memory { background: linear-gradient(90deg, #ED1B2F, #c41424); }

        /* Errors List */
        .errors-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .error-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem;
          background: #fef2f2;
          border-radius: 8px;
          font-size: 0.85rem;
        }
        .error-time {
          font-family: monospace;
          color: #495057;
        }
        .error-type {
          font-weight: 600;
          color: #dc2626;
          min-width: 80px;
        }
        .error-msg {
          flex: 1;
          color: #475569;
        }
        .error-count {
          font-weight: 600;
          color: #dc2626;
        }

        .system-actions {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        /* Admin Responsive */
        @media (max-width: 1200px) {
          .admin-metrics-grid { grid-template-columns: repeat(2, 1fr); }
          .admin-stats-row { grid-template-columns: 1fr; }
        }
        @media (max-width: 900px) {
          .admin-layout { flex-direction: column; }
          .admin-sidebar {
            width: 100%;
            height: auto;
            position: relative;
            top: 0;
          }
          .admin-nav {
            display: flex;
            overflow-x: auto;
            padding: 0.5rem;
          }
          .admin-nav-btn {
            padding: 0.5rem 1rem;
            white-space: nowrap;
          }
          .admin-sidebar-footer { display: none; }
        }
        @media (max-width: 600px) {
          .admin-metrics-grid { grid-template-columns: 1fr; }
          .admin-toolbar { flex-direction: column; }
          .search-box { min-width: 100%; }
          .toolbar-actions { width: 100%; justify-content: space-between; }
        }
      `}</style>
      
      {toast && <div className={`toast ${toast.type}`}>{toast.message}</div>}
      
      {currentPage === 'home' && renderHome()}
      {currentPage === 'simulation' && renderSimulation()}
    </div>
  );
}
