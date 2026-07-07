import React, { useState, useEffect, useRef } from 'react';

// ============================================
// BILINGUAL TRANSLATIONS - FRANÇAIS / ENGLISH
// ============================================

const TRANSLATIONS = {
  nav: {
    home: { en: 'Home', fr: 'Accueil', es: 'Inicio', vi: 'Trang chủ' },
    simulations: { en: 'Simulations', fr: 'Simulations', es: 'Simulaciones', vi: 'Mô phỏng' },
    pricing: { en: 'Pricing', fr: 'Tarifs', es: 'Precios', vi: 'Bảng giá' },
    contact: { en: 'Contact', fr: 'Contact', es: 'Contacto', vi: 'Liên hệ' },
    login: { en: 'Log In', fr: 'Connexion', es: 'Iniciar sesión', vi: 'Đăng nhập' },
    logout: { en: 'Logout', fr: 'Déconnexion', es: 'Cerrar sesión', vi: 'Đăng xuất' },
    dashboard: { en: 'Dashboard', fr: 'Tableau de bord', es: 'Panel', vi: 'Bảng điều khiển' },
    getStarted: { en: 'Get Started', fr: 'Commencer', es: 'Comenzar', vi: 'Bắt đầu' },
    startFree: { en: 'Start Free', fr: 'Essai gratuit', es: 'Empieza gratis', vi: 'Dùng thử miễn phí' },
  },
  landing: {
    badge: { en: '🎯 PMP & PMI-ACP Aligned Project Management Training', fr: '🎯 Formation en gestion de projet alignée PMP et PMI-ACP', es: '🎯 Formación en gestión de proyectos alineada con PMP y PMI-ACP', vi: '🎯 Đào tạo quản lý dự án theo chuẩn PMP & PMI-ACP' },
    heroTitle1: { en: 'Master Project Management', fr: 'Maîtrisez la gestion de projet', es: 'Domina la gestión de proyectos', vi: 'Làm chủ quản lý dự án' },
    heroTitle2: { en: 'Through Real-World Simulations', fr: 'par des simulations réalistes', es: 'con simulaciones del mundo real', vi: 'qua các mô phỏng thực tế' },
    heroSubtitle: { en: 'Run projects both ways — predictive (plan-driven) and Agile Scrum — across six industries. Practice scheduling, budgeting, sprints, backlogs, risk and stakeholder management, and build PMP- and PMI-ACP-ready skills without real-world consequences.', fr: 'Menez des projets des deux façons — prédictive (pilotée par le plan) et Agile Scrum — dans six industries. Pratiquez la planification, la budgétisation, les sprints, les backlogs, la gestion des risques et des parties prenantes, et développez des compétences PMP et PMI-ACP sans conséquences réelles.', es: 'Dirige proyectos de las dos maneras — predictiva (guiada por el plan) y Agile Scrum — en seis industrias. Practica cronogramas, presupuestos, sprints, backlogs, gestión de riesgos y de interesados, y desarrolla habilidades listas para PMP y PMI-ACP sin consecuencias reales.', vi: 'Điều hành dự án theo cả hai cách — dự đoán (theo kế hoạch) và Agile Scrum — trong sáu ngành. Luyện lập tiến độ, ngân sách, sprint, backlog, quản lý rủi ro và các bên liên quan, xây dựng kỹ năng sẵn sàng cho PMP và PMI-ACP mà không chịu hậu quả thật.' },
    startTrial: { en: 'Start PM Simulation Free', fr: 'Démarrer une simulation GP gratuite', es: 'Inicia una simulación de GP gratis', vi: 'Bắt đầu mô phỏng QLDA miễn phí' },
    browseSimulations: { en: 'View PM Scenarios', fr: 'Voir les scénarios GP', es: 'Ver escenarios de GP', vi: 'Xem kịch bản QLDA' },
    simulations: { en: 'Simulations', fr: 'Simulations', es: 'Simulaciones', vi: 'Mô phỏng' },
    scenarios: { en: 'Industry Scenarios', fr: 'Scénarios industriels', es: 'Escenarios industriales', vi: 'Kịch bản theo ngành' },
    learners: { en: 'PM Professionals Trained', fr: 'Professionnels GP formés', es: 'Profesionales de GP formados', vi: 'Chuyên gia QLDA đã đào tạo' },
    whyChoose: { en: 'Why Project Managers Choose BizSimHub', fr: 'Pourquoi les gestionnaires de projet choisissent BizSimHub', es: 'Por qué los gerentes de proyecto eligen BizSimHub', vi: 'Vì sao các nhà quản lý dự án chọn BizSimHub' },
    feature1Title: { en: 'PMP & PMI-ACP Aligned Learning', fr: 'Apprentissage aligné PMP et PMI-ACP', es: 'Aprendizaje alineado con PMP y PMI-ACP', vi: 'Học theo chuẩn PMP & PMI-ACP' },
    feature1Desc: { en: 'Practice the triple constraint, risk registers and earned value on predictive projects — then velocity, backlog prioritization, sprint ceremonies and welcoming change on agile ones.', fr: 'Pratiquez la triple contrainte, les registres de risques et la valeur acquise sur des projets prédictifs — puis la vélocité, la priorisation du backlog, les cérémonies de sprint et l\'accueil du changement sur des projets agiles.', es: 'Practica la triple restricción, los registros de riesgos y el valor ganado en proyectos predictivos — luego velocidad, priorización del backlog, ceremonias de sprint y acogida del cambio en los ágiles.', vi: 'Luyện ràng buộc tam giác, sổ đăng ký rủi ro và giá trị thu được trên dự án dự đoán — rồi velocity, ưu tiên backlog, nghi thức sprint và đón nhận thay đổi trên dự án agile.' },
    feature2Title: { en: 'Safe-to-Fail Environment', fr: 'Environnement sans risque', es: 'Entorno seguro para fallar', vi: 'Môi trường an toàn để thất bại' },
    feature2Desc: { en: 'Make scheduling mistakes, blow budgets, and miss deadlines—then learn what went wrong without career consequences.', fr: 'Faites des erreurs de planification, dépassez les budgets, manquez des échéances—puis apprenez ce qui n\'a pas fonctionné sans conséquences.', es: 'Comete errores de planificación, revienta presupuestos y falla fechas — y aprende qué salió mal sin consecuencias para tu carrera.', vi: 'Cứ mắc lỗi lập kế hoạch, vỡ ngân sách, trễ hạn — rồi học điều gì đã sai mà không ảnh hưởng sự nghiệp.' },
    feature3Title: { en: 'Track Your PM Growth', fr: 'Suivez votre progression GP', es: 'Sigue tu crecimiento como PM', vi: 'Theo dõi sự tiến bộ QLDA của bạn' },
    feature3Desc: { en: 'Detailed scoring shows your decision-making patterns across scope, schedule, budget, quality, and team dynamics.', fr: 'Un pointage détaillé montre vos patterns de décision en périmètre, calendrier, budget, qualité et dynamique d\'équipe.', es: 'La puntuación detallada muestra tus patrones de decisión en alcance, cronograma, presupuesto, calidad y dinámica de equipo.', vi: 'Điểm số chi tiết cho thấy khuôn mẫu ra quyết định của bạn về phạm vi, tiến độ, ngân sách, chất lượng và đội nhóm.' },
    feature4Title: { en: 'Eight Industry Libraries', fr: 'Huit bibliothèques industrielles', es: 'Ocho bibliotecas industriales', vi: 'Tám thư viện ngành' },
    feature4Desc: { en: 'IT, banking, entertainment, construction, R&D, automotive, supply chain and marketing — 25 scenarios, each with authentic PM challenges.', fr: 'TI, banque, divertissement, construction, R-D, automobile, chaîne d\u2019approvisionnement et marketing — 25 scénarios, chacun avec des défis GP authentiques.', es: 'TI, banca, entretenimiento, construcción, I+D, automotriz, cadena de suministro y marketing — 25 escenarios, cada uno con desafíos de GP auténticos.', vi: 'CNTT, ngân hàng, giải trí, xây dựng, R&D, ô tô, chuỗi cung ứng và marketing — 25 kịch bản với thách thức QLDA chân thực.' },
    readyToStart: { en: 'Ready to Sharpen Your PM Skills?', fr: 'Prêt à affûter vos compétences GP?', es: '¿Listo para afilar tus habilidades de GP?', vi: 'Sẵn sàng mài giũa kỹ năng QLDA?' },
    joinLearners: { en: 'Join project managers and PM students building real-world decision-making skills.', fr: 'Rejoignez les gestionnaires de projet et étudiants qui développent leurs compétences décisionnelles.', es: 'Únete a los gerentes de proyecto y estudiantes que desarrollan habilidades reales de decisión.', vi: 'Tham gia cùng các nhà quản lý dự án và học viên đang rèn kỹ năng ra quyết định thực tế.' },
    startLearning: { en: 'Start Your First Simulation', fr: 'Démarrer votre première simulation', es: 'Comienza tu primera simulación', vi: 'Bắt đầu mô phỏng đầu tiên' },
    // Founder credentials section (real)
    founderTitle: { en: 'Developed by a PM Professional', fr: 'Développé par un professionnel GP', es: 'Desarrollado por un profesional de GP', vi: 'Phát triển bởi một chuyên gia QLDA' },
    founderName: { en: 'Sylvain Gauthier', fr: 'Sylvain Gauthier', es: 'Sylvain Gauthier', vi: 'Sylvain Gauthier' },
    founderCredentials: { en: 'PMP & ACP Certified | McGill University Course Lecturer | Outstanding Teaching Award 2022', fr: 'Certifié PMP et ACP | Chargé de cours à l\'Université McGill | Prix d\'excellence en enseignement 2022', es: 'Certificado PMP y ACP | Profesor de la Universidad McGill | Premio a la Excelencia Docente 2022', vi: 'Chứng chỉ PMP & ACP | Giảng viên Đại học McGill | Giải thưởng Giảng dạy Xuất sắc 2022' },
    founderBio: { en: 'With 15+ years leading projects for Cirque du Soleil, Formula One, and the Beijing Olympics, I\'ve trained thousands of project managers. BizSimHub brings that real-world experience to you.', fr: 'Avec plus de 15 ans à diriger des projets pour le Cirque du Soleil, la Formule Un et les Jeux olympiques de Pékin, j\'ai formé des milliers de gestionnaires de projet. BizSimHub vous apporte cette expérience concrète.', es: 'Con más de 15 años liderando proyectos para el Cirque du Soleil, la Fórmula Uno y los Juegos Olímpicos de Beijing, he formado a miles de gerentes de proyecto. BizSimHub te trae esa experiencia del mundo real.', vi: 'Với hơn 15 năm dẫn dắt dự án cho Cirque du Soleil, Formula One và Thế vận hội Bắc Kinh, tôi đã đào tạo hàng nghìn nhà quản lý dự án. BizSimHub mang kinh nghiệm thực chiến đó đến với bạn.' },
    // PM outcomes section
    outcomesTitle: { en: 'What You\'ll Practice', fr: 'Ce que vous pratiquerez', es: 'Lo que practicarás', vi: 'Bạn sẽ luyện tập gì' },
    outcome1: { en: 'Schedule Optimization & Deadline Management', fr: 'Optimisation du calendrier et gestion des échéances', es: 'Optimización de cronogramas y gestión de plazos', vi: 'Tối ưu tiến độ & quản lý thời hạn' },
    outcome2: { en: 'Budget Control & Resource Allocation', fr: 'Contrôle budgétaire et allocation des ressources', es: 'Control presupuestario y asignación de recursos', vi: 'Kiểm soát ngân sách & phân bổ nguồn lực' },
    outcome3: { en: 'Risk Identification & Mitigation Strategies', fr: 'Identification des risques et stratégies d\'atténuation', es: 'Identificación de riesgos y estrategias de mitigación', vi: 'Nhận diện rủi ro & chiến lược giảm thiểu' },
    outcome4: { en: 'Stakeholder Communication & Expectation Management', fr: 'Communication avec les parties prenantes et gestion des attentes', es: 'Comunicación con interesados y gestión de expectativas', vi: 'Giao tiếp các bên liên quan & quản lý kỳ vọng' },
    outcome5: { en: 'Team Leadership & Morale Management', fr: 'Leadership d\'équipe et gestion du moral', es: 'Liderazgo de equipo y gestión de la moral', vi: 'Lãnh đạo đội nhóm & quản lý tinh thần' },
    outcome6: { en: 'Scope Control & Change Management', fr: 'Contrôle du périmètre et gestion du changement', es: 'Control del alcance y gestión del cambio', vi: 'Kiểm soát phạm vi & quản lý thay đổi' },
  },
  pricing: {
    title: { en: 'Simple Pricing', fr: 'Tarification simple', es: 'Precios simples', vi: 'Bảng giá đơn giản' },
    subtitle: { en: 'Start free, upgrade when ready', fr: 'Commencez gratuitement, passez au supérieur quand vous êtes prêt', es: 'Empieza gratis, mejora cuando quieras', vi: 'Bắt đầu miễn phí, nâng cấp khi sẵn sàng' },
    mostPopular: { en: 'Most Popular', fr: 'Plus populaire', es: 'Más popular', vi: 'Phổ biến nhất' },
    currentPlan: { en: 'Current Plan', fr: 'Plan actuel', es: 'Plan actual', vi: 'Gói hiện tại' },
    upgradeNow: { en: 'Upgrade Now', fr: 'Passer au supérieur', es: 'Mejorar ahora', vi: 'Nâng cấp ngay' },
    contactSales: { en: 'Contact Sales', fr: 'Contacter les ventes', es: 'Contactar a ventas', vi: 'Liên hệ bán hàng' },
    free: { en: 'Free', fr: 'Gratuit', es: 'Gratis', vi: 'Miễn phí' },
    professional: { en: 'Professional', fr: 'Professionnel', es: 'Profesional', vi: 'Chuyên nghiệp' },
    enterprise: { en: 'Enterprise', fr: 'Entreprise', es: 'Enterprise', vi: 'Doanh nghiệp' },
    freeDesc: { en: 'Perfect for trying out', fr: 'Parfait pour essayer', es: 'Perfecto para probar', vi: 'Hoàn hảo để dùng thử' },
    proDesc: { en: 'For serious learners', fr: 'Pour les apprenants sérieux', es: 'Para estudiantes serios', vi: 'Dành cho người học nghiêm túc' },
    entDesc: { en: 'For teams and institutions', fr: 'Pour les équipes et institutions', es: 'Para equipos e instituciones', vi: 'Dành cho đội nhóm và tổ chức' },
  },
  dashboard: {
    welcome: { en: 'Welcome', fr: 'Bienvenue', es: 'Bienvenido', vi: 'Chào mừng' },
    readyToContinue: { en: 'Ready to continue your learning journey?', fr: 'Prêt à continuer votre parcours d\'apprentissage?', es: '¿Listo para continuar tu camino de aprendizaje?', vi: 'Sẵn sàng tiếp tục hành trình học tập?' },
    quickActions: { en: 'Quick Actions', fr: 'Actions rapides', es: 'Acciones rápidas', vi: 'Thao tác nhanh' },
    playProjectApex: { en: 'Play Project Apex', fr: 'Jouer à Projet Apex', es: 'Jugar Proyecto Apex', vi: 'Chơi Dự án Apex' },
    browseSimulations: { en: 'Browse Simulations', fr: 'Parcourir les simulations', es: 'Explorar simulaciones', vi: 'Duyệt mô phỏng' },
    yourStats: { en: 'Your Stats', fr: 'Vos statistiques', es: 'Tus estadísticas', vi: 'Thống kê của bạn' },
    simulationsPlayed: { en: 'Simulations Played', fr: 'Simulations jouées', es: 'Simulaciones jugadas', vi: 'Mô phỏng đã chơi' },
    bestGrade: { en: 'Best Grade', fr: 'Meilleure note', es: 'Mejor nota', vi: 'Hạng cao nhất' },
    highScore: { en: 'High Score', fr: 'Meilleur score', es: 'Puntaje más alto', vi: 'Điểm cao nhất' },
    recentScores: { en: 'Recent Scores', fr: 'Scores récents', es: 'Puntajes recientes', vi: 'Điểm gần đây' },
    featuredSimulation: { en: 'Featured Simulation', fr: 'Simulation en vedette', es: 'Simulación destacada', vi: 'Mô phỏng nổi bật' },
    noScoresYet: { en: 'No scores yet. Start playing to track your progress!', fr: 'Aucun score pour l\'instant. Commencez à jouer pour suivre vos progrès!', es: 'Aún no hay puntajes. ¡Empieza a jugar para seguir tu progreso!', vi: 'Chưa có điểm nào. Hãy bắt đầu chơi để theo dõi tiến bộ!' },
    projectApexTitle: { en: 'Project Apex', fr: 'Projet Apex', es: 'Proyecto Apex', vi: 'Dự án Apex' },
    projectApexDesc: { en: 'Master project management with our enhanced causal model simulation.', fr: 'Maîtrisez la gestion de projet avec notre simulation à modèle causal amélioré.', es: 'Domina la gestión de proyectos con nuestra simulación de modelo causal mejorado.', vi: 'Làm chủ quản lý dự án với mô phỏng mô hình nhân quả nâng cao.' },
    playNow: { en: 'Play Now →', fr: 'Jouer maintenant →', es: 'Jugar ahora →', vi: 'Chơi ngay →' },
    unknown: { en: 'Unknown', fr: 'Inconnu', es: 'Desconocido', vi: 'Không rõ' },
    recent: { en: 'Recent', fr: 'Récent', es: 'Reciente', vi: 'Gần đây' },
  },
  results: {
    simulationComplete: { en: 'Simulation Complete!', fr: 'Simulation terminée!', es: '¡Simulación completa!', vi: 'Hoàn thành mô phỏng!' },
    overallGrade: { en: 'Overall Grade', fr: 'Note globale', es: 'Nota global', vi: 'Hạng tổng thể' },
    // Mission Recap
    missionRecap: { en: '🎯 Mission Recap', fr: '🎯 Récapitulatif de mission', es: '🎯 Resumen de la misión', vi: '🎯 Nhìn lại nhiệm vụ' },
    missionIntro: { en: 'Here\'s how you performed against the original project brief:', fr: 'Voici votre performance par rapport au mandat initial:', es: 'Así te fue frente al brief original del proyecto:', vi: 'Đây là kết quả của bạn so với bản tóm tắt dự án ban đầu:' },
    target: { en: 'Target:', fr: 'Cible:', es: 'Meta:', vi: 'Mục tiêu:' },
    actual: { en: 'Actual:', fr: 'Réel:', es: 'Real:', vi: 'Thực tế:' },
    deliverFeatures: { en: 'Deliver', fr: 'Livrer', es: 'Entregar', vi: 'Bàn giao' },
    features: { en: 'features', fr: 'fonctionnalités', es: 'funciones', vi: 'tính năng' },
    completeInWeeks: { en: 'Complete in', fr: 'Compléter en', es: 'Completar en', vi: 'Hoàn thành trong' },
    weeks: { en: 'weeks', fr: 'semaines', es: 'semanas', vi: 'tuần' },
    stayUnder: { en: 'Stay under', fr: 'Rester sous', es: 'Mantenerse bajo', vi: 'Giữ dưới' },
    maintainQuality: { en: 'Maintain 70%+ quality', fr: 'Maintenir 70%+ qualité', es: 'Mantener calidad de 70%+', vi: 'Duy trì chất lượng 70%+' },
    keepMorale: { en: 'Keep morale above 50%', fr: 'Garder le moral au-dessus de 50%', es: 'Mantener la moral sobre 50%', vi: 'Giữ tinh thần trên 50%' },
    onTime: { en: 'On time', fr: 'À temps', es: 'A tiempo', vi: 'Đúng hạn' },
    weeksOver: { en: 'weeks over', fr: 'semaines de retard', es: 'semanas de retraso', vi: 'tuần trễ' },
    underBudget: { en: 'under', fr: 'sous le budget', es: 'bajo presupuesto', vi: 'dưới ngân sách' },
    overBudget: { en: 'Over budget', fr: 'Dépassement de budget', es: 'Presupuesto excedido', vi: 'Vượt ngân sách' },
    spent: { en: 'spent', fr: 'dépensé', es: 'gastado', vi: 'đã chi' },
    metStandard: { en: 'Met standard', fr: 'Standard atteint', es: 'Estándar cumplido', vi: 'Đạt chuẩn' },
    belowStandard: { en: 'Below standard', fr: 'Sous le standard', es: 'Bajo el estándar', vi: 'Dưới chuẩn' },
    teamHappy: { en: 'Team is happy', fr: 'Équipe satisfaite', es: 'Equipo contento', vi: 'Đội vui vẻ' },
    teamBurnedOut: { en: 'Team burned out', fr: 'Équipe épuisée', es: 'Equipo agotado', vi: 'Đội kiệt sức' },
    // Score Breakdown
    scoreBreakdown: { en: '📊 Score Breakdown', fr: '📊 Détail du pointage', es: '📊 Desglose del puntaje', vi: '📊 Chi tiết điểm' },
    scope: { en: 'SCOPE', fr: 'PÉRIMÈTRE', es: 'ALCANCE', vi: 'PHẠM VI' },
    schedule: { en: 'SCHEDULE', fr: 'CALENDRIER', es: 'CRONOGRAMA', vi: 'TIẾN ĐỘ' },
    budget: { en: 'BUDGET', fr: 'BUDGET', es: 'PRESUPUESTO', vi: 'NGÂN SÁCH' },
    quality: { en: 'QUALITY', fr: 'QUALITÉ', es: 'CALIDAD', vi: 'CHẤT LƯỢNG' },
    team: { en: 'TEAM', fr: 'ÉQUIPE', es: 'EQUIPO', vi: 'ĐỘI NHÓM' },
    excellent: { en: 'Excellent', fr: 'Excellent', es: 'Excelente', vi: 'Xuất sắc' },
    partial: { en: 'Partial', fr: 'Partiel', es: 'Parcial', vi: 'Một phần' },
    daysLate: { en: 'days late', fr: 'jours de retard', es: 'días de retraso', vi: 'ngày trễ' },
    veryGood: { en: 'Very Good', fr: 'Très bien', es: 'Muy bien', vi: 'Rất tốt' },
    good: { en: 'Good', fr: 'Bon', es: 'Bien', vi: 'Tốt' },
    needsWork: { en: 'Needs work', fr: 'À améliorer', es: 'Por mejorar', vi: 'Cần cải thiện' },
    goodMorale: { en: 'Good morale', fr: 'Bon moral', es: 'Buena moral', vi: 'Tinh thần tốt' },
    lowMorale: { en: 'Low morale', fr: 'Moral bas', es: 'Moral baja', vi: 'Tinh thần thấp' },
    // Performance Analysis
    performanceAnalysis: { en: '📝 Performance Analysis', fr: '📝 Analyse de performance', es: '📝 Análisis de desempeño', vi: '📝 Phân tích hiệu suất' },
    whatWentWell: { en: 'What Went Well', fr: 'Ce qui a bien fonctionné', es: 'Lo que salió bien', vi: 'Điều đã làm tốt' },
    areasForImprovement: { en: 'Areas for Improvement', fr: 'Points à améliorer', es: 'Áreas de mejora', vi: 'Điểm cần cải thiện' },
    pmProTips: { en: 'PM Pro Tips', fr: 'Conseils de pro GP', es: 'Consejos de PM pro', vi: 'Mẹo PM chuyên nghiệp' },
    // Analysis content
    excellentBudget: { en: 'Excellent budget management - stayed within financial constraints', fr: 'Excellente gestion budgétaire - resté dans les limites financières', es: 'Excelente gestión presupuestaria: te mantuviste dentro de las restricciones financieras', vi: 'Quản lý ngân sách xuất sắc — giữ trong giới hạn tài chính' },
    maintainedQuality: { en: 'Maintained high quality standards throughout the project', fr: 'Maintenu des standards de qualité élevés tout au long du projet', es: 'Mantuviste altos estándares de calidad durante todo el proyecto', vi: 'Duy trì chuẩn chất lượng cao suốt dự án' },
    deliveredOnTime: { en: 'Delivered on schedule - strong time management skills', fr: 'Livré dans les délais - bonnes compétences en gestion du temps', es: 'Entregaste a tiempo: buenas habilidades de gestión del tiempo', vi: 'Bàn giao đúng hạn — kỹ năng quản lý thời gian tốt' },
    completedScope: { en: 'Completed all required scope - nothing left behind', fr: 'Complété tout le périmètre requis - rien laissé de côté', es: 'Completaste todo el alcance requerido: nada quedó atrás', vi: 'Hoàn thành toàn bộ phạm vi — không bỏ sót gì' },
    keptMoraleHealthy: { en: 'Kept team morale healthy - good leadership', fr: 'Maintenu un bon moral d\'équipe - bon leadership', es: 'Mantuviste sana la moral del equipo: buen liderazgo', vi: 'Giữ tinh thần đội khỏe mạnh — lãnh đạo tốt' },
    minimalScheduleChanges: { en: 'Minimal schedule changes - provided stability to the team', fr: 'Changements de calendrier minimaux - stabilité pour l\'équipe', es: 'Cambios mínimos de cronograma: diste estabilidad al equipo', vi: 'Ít thay đổi tiến độ — mang lại ổn định cho đội' },
    usedPrototyping: { en: 'Used prototyping to reduce uncertainty - smart risk management', fr: 'Utilisé le prototypage pour réduire l\'incertitude - gestion intelligente des risques', es: 'Usaste prototipos para reducir la incertidumbre: gestión inteligente de riesgos', vi: 'Dùng nguyên mẫu để giảm bất định — quản lý rủi ro thông minh' },
    completedSimulation: { en: 'You completed the simulation - every experience is a learning opportunity!', fr: 'Vous avez complété la simulation - chaque expérience est une opportunité d\'apprentissage!', es: 'Completaste la simulación: ¡cada experiencia es una oportunidad de aprendizaje!', vi: 'Bạn đã hoàn thành mô phỏng — mỗi trải nghiệm là một cơ hội học hỏi!' },
    budgetTip: { en: 'Budget: Consider more careful resource allocation. Track spending weekly and cut non-essential costs early.', fr: 'Budget: Considérez une allocation plus prudente des ressources. Suivez les dépenses hebdomadairement.', es: 'Presupuesto: considera una asignación de recursos más cuidadosa. Controla el gasto semanalmente y recorta pronto los costos no esenciales.', vi: 'Ngân sách: cân nhắc phân bổ nguồn lực cẩn thận hơn. Theo dõi chi tiêu hằng tuần và sớm cắt chi phí không thiết yếu.' },
    scheduleTip: { en: 'Schedule: Try adding buffer time for unknowns. Use the Extend Deadline feature strategically before it\'s too late.', fr: 'Calendrier: Ajoutez du temps tampon pour les imprévus. Utilisez l\'extension de délai stratégiquement.', es: 'Cronograma: agrega margen para imprevistos. Usa la extensión de plazo estratégicamente antes de que sea tarde.', vi: 'Tiến độ: thêm thời gian đệm cho ẩn số. Dùng tính năng gia hạn một cách chiến lược trước khi quá muộn.' },
    scopeTip: { en: 'Scope: Prioritize critical features first. Consider crunch mode or hiring when behind, but watch morale.', fr: 'Périmètre: Priorisez les fonctionnalités critiques. Considérez le mode crunch ou l\'embauche si en retard.', es: 'Alcance: prioriza primero las funciones críticas. Considera el crunch o contratar cuando vayas atrasado, pero cuida la moral.', vi: 'Phạm vi: ưu tiên tính năng then chốt trước. Cân nhắc tăng tốc hoặc tuyển thêm khi chậm, nhưng coi chừng tinh thần.' },
    qualityTip: { en: 'Quality: Schedule regular Quality Reviews. Avoid excessive crunch which degrades quality.', fr: 'Qualité: Planifiez des revues qualité régulières. Évitez le crunch excessif qui dégrade la qualité.', es: 'Calidad: agenda revisiones de calidad regulares. Evita el crunch excesivo que degrada la calidad.', vi: 'Chất lượng: xếp lịch đánh giá chất lượng đều đặn. Tránh tăng tốc quá mức làm giảm chất lượng.' },
    teamTip: { en: 'Team: Hold regular Team Building and 1-on-1 meetings. Avoid back-to-back crunch periods.', fr: 'Équipe: Tenez des réunions de team building et 1-on-1 régulières. Évitez les périodes de crunch consécutives.', es: 'Equipo: haz team building y reuniones 1 a 1 regulares. Evita períodos de crunch consecutivos.', vi: 'Đội nhóm: tổ chức gắn kết và họp 1-1 đều đặn. Tránh các đợt tăng tốc liên tiếp.' },
    planningTip: { en: 'Planning: Too many schedule changes hurt team confidence. Try to set realistic deadlines upfront.', fr: 'Planification: Trop de changements de calendrier nuisent à la confiance. Fixez des échéances réalistes dès le départ.', es: 'Planificación: demasiados cambios de fecha dañan la confianza del equipo. Fija plazos realistas desde el inicio.', vi: 'Lập kế hoạch: đổi thời hạn quá nhiều làm mất niềm tin của đội. Hãy đặt hạn thực tế ngay từ đầu.' },
    outstandingPerformance: { en: 'Outstanding performance! Try a harder scenario to challenge yourself further.', fr: 'Performance exceptionnelle! Essayez un scénario plus difficile pour vous dépasser.', es: '¡Desempeño sobresaliente! Prueba un escenario más difícil para desafiarte más.', vi: 'Thành tích vượt trội! Thử kịch bản khó hơn để thách thức bản thân.' },
    ironTriangle: { en: 'Iron Triangle: When scope is fixed, you can only trade time for money. Consider which constraint matters most to stakeholders.', fr: 'Triangle de fer: Quand le périmètre est fixé, vous ne pouvez qu\'échanger temps contre argent. Considérez quelle contrainte compte le plus.', es: 'Triángulo de hierro: con alcance fijo, solo puedes intercambiar tiempo por dinero. Considera qué restricción importa más a los interesados.', vi: 'Tam giác sắt: khi phạm vi cố định, bạn chỉ có thể đổi thời gian lấy tiền. Cân nhắc ràng buộc nào quan trọng nhất với các bên liên quan.' },
    sustainablePace: { en: 'Sustainable Pace: Crunch mode provides short-term gains but long-term pain. A burned-out team delivers poor quality.', fr: 'Rythme soutenable: Le mode crunch donne des gains à court terme mais des problèmes à long terme. Une équipe épuisée livre de la mauvaise qualité.', es: 'Ritmo sostenible: el crunch da ganancias a corto plazo pero dolor a largo plazo. Un equipo quemado entrega mala calidad.', vi: 'Nhịp độ bền vững: tăng tốc cho lợi ích ngắn hạn nhưng đau dài hạn. Đội kiệt sức giao chất lượng kém.' },
    riskReduction: { en: 'Risk Reduction: Prototyping helps surface problems early when they\'re cheap to fix. Consider it for uncertain projects.', fr: 'Réduction des risques: Le prototypage aide à révéler les problèmes tôt quand ils sont peu coûteux à corriger.', es: 'Reducción de riesgos: el prototipado revela problemas temprano cuando son baratos de corregir. Considéralo en proyectos inciertos.', vi: 'Giảm rủi ro: nguyên mẫu phơi bày vấn đề sớm khi còn rẻ để sửa. Hãy cân nhắc cho các dự án bất định.' },
    technicalDebt: { en: 'Technical Debt: Rushing to complete features without quality leads to rework. Sometimes less scope at higher quality is better.', fr: 'Dette technique: Se précipiter pour compléter les fonctionnalités sans qualité mène à du retravail.', es: 'Deuda técnica: apurarse a completar funciones sin calidad genera retrabajo. A veces menos alcance con más calidad es mejor.', vi: 'Nợ kỹ thuật: vội hoàn thành tính năng mà bỏ chất lượng dẫn đến làm lại. Đôi khi ít phạm vi nhưng chất lượng cao lại tốt hơn.' },
    keyInsightA: { en: 'You\'ve mastered the basics! Focus on optimizing team happiness while maintaining performance.', fr: 'Vous maîtrisez les bases! Concentrez-vous sur le bonheur de l\'équipe tout en maintenant la performance.', es: '¡Dominas lo básico! Enfócate en optimizar la felicidad del equipo manteniendo el desempeño.', vi: 'Bạn đã nắm vững căn bản! Tập trung tối ưu hạnh phúc đội nhóm trong khi giữ hiệu suất.' },
    keyInsightB: { en: 'Good foundation! Work on balancing the triple constraint - time, cost, and scope.', fr: 'Bonne fondation! Travaillez sur l\'équilibre de la triple contrainte - temps, coût et périmètre.', es: '¡Buena base! Trabaja en equilibrar la triple restricción: tiempo, costo y alcance.', vi: 'Nền tảng tốt! Hãy luyện cân bằng ràng buộc tam giác — thời gian, chi phí và phạm vi.' },
    keyInsightC: { en: 'You\'re learning! Try to identify problems earlier and take corrective action sooner.', fr: 'Vous apprenez! Essayez d\'identifier les problèmes plus tôt et d\'agir plus rapidement.', es: '¡Estás aprendiendo! Intenta identificar los problemas antes y actuar más rápido.', vi: 'Bạn đang tiến bộ! Cố gắng nhận diện vấn đề sớm hơn và hành động nhanh hơn.' },
    keyInsightD: { en: 'Every PM has tough projects. Review what went wrong and try a different approach next time.', fr: 'Tout GP a des projets difficiles. Analysez ce qui n\'a pas fonctionné et essayez une approche différente.', es: 'Todo PM tiene proyectos difíciles. Revisa qué salió mal y prueba otro enfoque la próxima vez.', vi: 'PM nào cũng có dự án khó. Xem lại điều gì sai và thử cách khác lần sau.' },
    keyInsight: { en: 'Key Insight:', fr: 'Point clé:', es: 'Punto clave:', vi: 'Điểm mấu chốt:' },
    // Achievements
    achievements: { en: '🏅 Achievements', fr: '🏅 Réalisations', es: '🏅 Logros', vi: '🏅 Thành tựu' },
    // Final Score
    finalScore: { en: 'Final Score', fr: 'Score final', es: 'Puntaje final', vi: 'Điểm cuối' },
    points: { en: 'points', fr: 'points', es: 'puntos', vi: 'điểm' },
    // Actions
    playAgain: { en: '🔄 Play Again', fr: '🔄 Rejouer', es: '🔄 Jugar de nuevo', vi: '🔄 Chơi lại' },
    tryNewIndustry: { en: '🎮 Try New Industry', fr: '🎮 Essayer une autre industrie', es: '🎮 Probar otra industria', vi: '🎮 Thử ngành khác' },
    backToDashboard: { en: '📊 Back to Dashboard', fr: '📊 Retour au tableau de bord', es: '📊 Volver al panel', vi: '📊 Về bảng điều khiển' },
    printReport: { en: '🖨️ Print Report', fr: '🖨️ Imprimer le rapport', es: '🖨️ Imprimir reporte', vi: '🖨️ In báo cáo' },
    copySummary: { en: '📋 Copy Summary', fr: '📋 Copier le résumé', es: '📋 Copiar resumen', vi: '📋 Sao chép tóm tắt' },
    copiedToClipboard: { en: 'Results copied to clipboard!', fr: 'Résultats copiés dans le presse-papiers!', es: '¡Resultados copiados al portapapeles!', vi: 'Đã sao chép kết quả!' },
  },
  footer: {
    product: { en: 'Product', fr: 'Produit', es: 'Producto', vi: 'Sản phẩm' },
    company: { en: 'Company', fr: 'Entreprise', es: 'Empresa', vi: 'Công ty' },
    about: { en: 'About', fr: 'À propos', es: 'Acerca de', vi: 'Giới thiệu' },
    forEducators: { en: 'For Educators', fr: 'Pour les éducateurs', es: 'Para educadores', vi: 'Dành cho nhà giáo dục' },
    madeWith: { en: 'Made with ❤️ in Montreal', fr: 'Fait avec ❤️ à Montréal', es: 'Hecho con ❤️ en Montreal', vi: 'Làm với ❤️ tại Montreal' },
    allRights: { en: 'All rights reserved.', fr: 'Tous droits réservés.', es: 'Todos los derechos reservados.', vi: 'Bảo lưu mọi quyền.' },
  },
  common: {
    comingSoon: { en: 'Coming Soon', fr: 'Bientôt', es: 'Próximamente', vi: 'Sắp ra mắt' },
    back: { en: 'Back', fr: 'Retour', es: 'Volver', vi: 'Quay lại' },
  },
};

const t = (key, lang) => {
  const keys = key.split('.');
  let result = TRANSLATIONS;
  for (const k of keys) {
    result = result?.[k];
  }
  return result?.[lang] || result?.['en'] || key;
};

// ============================================
// MULTILINGUAL HELPERS (EN / FR / ES / VI)
// ============================================
const LANGS = ['en', 'fr', 'es', 'vi'];
const LANG_LABELS = { en: '🇬🇧 EN', fr: '🇫🇷 FR', es: '🇪🇸 ES', vi: '🇻🇳 VI' };
// Inline 4-way string lookup: L(lang, { en, fr, es, vi }) -- falls back to English
const L = (lang, o) => (o[lang] !== undefined ? o[lang] : o.en);
// Suffixed-field lookup on config objects: lf(item, 'name', lang) -> item.nameFr / nameEs / nameVi, EN fallback
const LSUF = { fr: 'Fr', es: 'Es', vi: 'Vi' };
const lf = (obj, base, lang) => {
  if (!obj) return '';
  if (lang === 'en') return obj[base];
  const v = obj[base + LSUF[lang]];
  return (v === undefined || v === null) ? obj[base] : v;
};

// ============================================
// CSS ANIMATION COMPONENTS (No external dependencies)
// ============================================

// Confetti animation component
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
      <rect x="10" y="10" width="100" height="80" rx="4" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2"/>
      
      {/* Grid lines */}
      <g stroke="#e2e8f0" strokeWidth="1">
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
      <svg viewBox="0 0 120 120">
        {/* Background circles */}
        {[0.25, 0.5, 0.75, 1].map((scale, i) => (
          <circle
            key={i}
            cx={centerX}
            cy={centerY}
            r={radius * scale}
            fill="none"
            stroke="#2a2a40"
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
            stroke="#2a2a40"
            strokeWidth="1"
          />
        ))}
        
        {/* Risk area polygon */}
        <polygon
          points={points}
          fill="rgba(99, 102, 241, 0.3)"
          stroke="#6366f1"
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
const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '';

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
  
  // Stripe
  createCheckoutSession: (planId, billingCycle) => 
    api.request('/stripe/create-checkout-session', { method: 'POST', body: JSON.stringify({ planId, billingCycle }) }),
  createPortalSession: () => 
    api.request('/stripe/create-portal-session', { method: 'POST' }),
  getSubscription: () => 
    api.request('/stripe/subscription'),
  
  // Simulations
  recordScore: (simId, scoreData) => 
    api.request('/simulations/scores', { method: 'POST', body: JSON.stringify({ simulationId: simId, ...scoreData }) }),
  getScores: () => 
    api.request('/simulations/scores'),
  getLeaderboard: (simId) => 
    api.request(`/simulations/leaderboard?simulationId=${simId}`),
  getStats: () => 
    Promise.resolve({ stats: { total_plays: 0, unique_players: 0, average_score: 0 } }),
  
  // Admin APIs
  getAdminOverview: () => 
    api.request('/admin/overview'),
  getAdminUsers: (params = {}) => 
    api.request(`/admin/users?${new URLSearchParams(params).toString()}`),
  getAdminAnalytics: () => 
    api.request('/admin/analytics'),
  getAdminRevenue: () => 
    api.request('/admin/revenue'),
  toggleAdmin: (userId, isAdmin) => 
    api.request('/admin/toggle-admin', { method: 'POST', body: JSON.stringify({ userId, isAdmin }) }),
  toggleTester: (userId, isTester) => 
    api.request('/admin/toggle-tester', { method: 'POST', body: JSON.stringify({ userId, isTester }) })
};

// ============================================
// SIMULATIONS CATALOG
// ============================================

const SIMULATIONS = [
  {
    id: 'project-apex',
    title: 'Project Apex',
    subtitle: 'Project Management Simulation',
    description: 'Master the art of project management by navigating real-world challenges. Balance scope, schedule, budget, and team dynamics across multiple industry scenarios.',
    icon: '🎯',
    category: 'Project Management',
    difficulty: 'Intermediate',
    duration: '45-60 min',
    scenarios: 5,
    skills: ['Resource Allocation', 'Risk Management', 'Team Leadership', 'Decision Making'],
    featured: true,
    available: true,
    tier: 'free',
    freePreview: true,
    previewWeeks: 3
  },
  {
    id: 'market-dynamics',
    title: 'Market Dynamics',
    subtitle: 'Strategic Marketing Simulation',
    description: 'Lead a marketing team through product launches, competitive battles, and market shifts.',
    icon: '📈',
    category: 'Marketing',
    difficulty: 'Intermediate',
    duration: '30-45 min',
    scenarios: 4,
    skills: ['Market Analysis', 'Brand Strategy', 'Budget Management'],
    available: false,
    tier: 'pro',
    comingSoon: true
  },
  {
    id: 'supply-chain-crisis',
    title: 'Supply Chain Crisis',
    subtitle: 'Operations Management Simulation',
    description: 'Navigate global supply chain disruptions, manage inventory levels, and optimize logistics.',
    icon: '🚚',
    category: 'Operations',
    difficulty: 'Advanced',
    duration: '60-90 min',
    scenarios: 6,
    skills: ['Logistics Planning', 'Vendor Management', 'Crisis Response'],
    available: false,
    tier: 'pro',
    comingSoon: true
  },
  {
    id: 'startup-journey',
    title: 'Startup Journey',
    subtitle: 'Entrepreneurship Simulation',
    description: 'Build a startup from idea to scale-up. Make critical decisions on funding, hiring, and market entry.',
    icon: '🚀',
    category: 'Entrepreneurship',
    difficulty: 'Advanced',
    duration: '60-90 min',
    scenarios: 5,
    skills: ['Fundraising', 'Team Building', 'Product Strategy'],
    available: false,
    tier: 'pro',
    comingSoon: true
  }
];

const PRICING_PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    priceAnnual: 0,
    period: 'forever',
    description: 'Perfect for trying out',
    features: ['Every scenario — first weeks free', 'All 8 industry libraries', 'Score tracking', 'Community support'],
    cta: 'Current Plan',
    popular: false,
    isOneTime: false
  },
  {
    id: 'pro',
    name: 'Pro Monthly',
    price: 19,
    priceAnnual: 190,
    period: 'month',
    description: 'For active learners',
    features: ['All simulations', 'All 8 industry libraries — 25 scenarios', 'Detailed analytics', 'Certificates', 'Priority support', 'Cancel anytime'],
    cta: 'Subscribe Now',
    popular: false,
    isOneTime: false
  },
  {
    id: 'pro_lifetime',
    name: 'Pro Lifetime',
    price: 149,
    priceAnnual: 149,
    period: 'one-time',
    description: 'Best value - pay once, own forever',
    features: ['All simulations', 'All 8 industry libraries — 25 scenarios', 'Detailed analytics', 'Certificates', 'Priority support', 'Lifetime updates', 'No recurring fees'],
    cta: 'Get Lifetime Access',
    popular: true,
    isOneTime: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 199,
    priceAnnual: 1990,
    period: 'month',
    description: 'For teams and institutions',
    features: ['Everything in Professional', 'Unlimited team members', 'Admin dashboard', 'Custom branding', 'LMS integration', 'Dedicated account manager', 'Custom simulation development'],
    cta: 'Contact Sales',
    popular: false,
    hidden: true,
    isOneTime: false
  }
];

// ============================================
// INDUSTRY CATEGORIES for the scenario-selection screen.
// A scenario joins a category via its `category` field; categories with no
// scenarios are hidden automatically, so new industries can be declared here
// ahead of their first scenario.
const SCENARIO_CATEGORIES = [
  { key: 'apex',          icon: '🎯', en: 'Project Apex',          fr: 'Projet Apex',
    subEn: 'The original flagship — high-uncertainty R&D under the full causal model',
    subFr: 'Le vaisseau amiral original — R-D à haute incertitude sous le modèle causal complet',
    es: 'Proyecto Apex', vi: 'Dự án Apex',
    subEs: 'El buque insignia original — I+D de alta incertidumbre bajo el modelo causal completo',
    subVi: 'Soái hạm nguyên bản — R&D độ bất định cao dưới mô hình nhân quả đầy đủ' },
  { key: 'entertainment', icon: '🎪', en: 'Project Entertainment', fr: 'Projet Divertissement',
    subEn: 'Live shows and creative productions',
    subFr: 'Spectacles et productions créatives',
    es: 'Proyecto Entretenimiento', vi: 'Dự án Giải trí',
    subEs: 'Espectáculos en vivo y producciones creativas',
    subVi: 'Show diễn trực tiếp và sản xuất sáng tạo' },
  { key: 'construction',  icon: '🏗️', en: 'Project Construction',  fr: 'Projet Construction',
    subEn: 'Commercial builds — permits, safety and weather',
    subFr: 'Bâtiments commerciaux — permis, sécurité et météo',
    es: 'Proyecto Construcción', vi: 'Dự án Xây dựng',
    subEs: 'Obras comerciales — permisos, seguridad y clima',
    subVi: 'Công trình thương mại — giấy phép, an toàn và thời tiết' },
  { key: 'it',            icon: '💻', en: 'Project IT',            fr: 'Projet TI',
    subEn: 'Software delivery and technology projects',
    subFr: 'Projets de livraison logicielle et de technologie',
    es: 'Proyecto TI', vi: 'Dự án CNTT',
    subEs: 'Entrega de software y proyectos tecnológicos',
    subVi: 'Bàn giao phần mềm và dự án công nghệ' },
  { key: 'trucks_smr',    icon: '🚚', en: 'Project Automotive',    fr: 'Projet Automobile',
    subEn: 'Sell · Maintain · Repair — IT projects inside a heavy-truck dealership: sales floor, service bays, parts counter and fleet clients',
    subFr: 'Vendre · Entretenir · Réparer — projets TI chez un concessionnaire de camions lourds : plancher de vente, baies de service, comptoir de pièces et clients de flotte',
    es: 'Proyecto Automotriz', vi: 'Dự án Ô tô',
    subEs: 'Vender · Mantener · Reparar — proyectos de TI en un concesionario de camiones pesados: piso de ventas, bahías de servicio, mostrador de repuestos y clientes de flota',
    subVi: 'Bán · Bảo dưỡng · Sửa chữa — dự án CNTT trong đại lý xe tải hạng nặng: sàn bán hàng, khoang dịch vụ, quầy phụ tùng và khách đội xe' },
  { key: 'banking',       icon: '🏦', en: 'Project Banking',       fr: 'Projet Banque',
    subEn: 'Financial services and fintech delivery',
    subFr: 'Services financiers et livraison fintech',
    es: 'Proyecto Banca', vi: 'Dự án Ngân hàng',
    subEs: 'Servicios financieros y entrega fintech',
    subVi: 'Dịch vụ tài chính và bàn giao fintech' },
  { key: 'marketing',     icon: '📣', en: 'Project Marketing',     fr: 'Projet Marketing',
    subEn: 'Campaigns, launches, rebrands and growth delivery',
    subFr: 'Campagnes, lancements, refontes de marque et croissance',
    es: 'Proyecto Marketing', vi: 'Dự án Marketing',
    subEs: 'Campañas, lanzamientos, rebrands y crecimiento',
    subVi: 'Chiến dịch, ra mắt, tái định vị thương hiệu và tăng trưởng' },
  { key: 'supply_chain',  icon: '📦', en: 'Project Supply Chain',  fr: 'Projet Chaîne d\u2019approvisionnement',
    subEn: 'Logistics and supply-chain delivery',
    subFr: 'Logistique et chaîne d\u2019approvisionnement',
    es: 'Proyecto Cadena de Suministro', vi: 'Dự án Chuỗi cung ứng',
    subEs: 'Logística y cadena de suministro',
    subVi: 'Hậu cần và chuỗi cung ứng' }
];

// Methodology badge: every scenario is either predictive (plan-driven) or agile
const MethodologyBadge = ({ scenario, lang }) => {
  const agile = scenario.framework === 'scrum';
  return (
    <span style={{
      display: 'inline-block', padding: '2px 9px', borderRadius: 999,
      fontSize: '0.66rem', fontWeight: 700, letterSpacing: '0.04em',
      textTransform: 'uppercase', whiteSpace: 'nowrap', verticalAlign: 'middle',
      background: agile ? 'rgba(16,185,129,0.15)' : 'rgba(59,130,246,0.15)',
      color: agile ? '#10b981' : '#3b82f6',
      border: `1px solid ${agile ? 'rgba(16,185,129,0.4)' : 'rgba(59,130,246,0.4)'}`
    }}>
      {agile ? (L(lang, { en: '🔁 Agile · Scrum', fr: '🔁 Agile · Scrum', es: '🔁 Agile · Scrum', vi: '🔁 Agile · Scrum' })) : (L(lang, { en: '📋 Predictive', fr: '📋 Prédictif', es: '📋 Predictivo', vi: '📋 Dự đoán' }))}
    </span>
  );
};

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
    category: 'it',
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
        title: 'Changing Requirements',
        description: 'The product owner wants 2 new high-value features. Agile teams welcome change — the question is what you trade away for it.',
        titleFr: 'Exigences changeantes', titleEs: 'Requisitos cambiantes', titleVi: 'Yêu cầu thay đổi',
        descriptionFr: 'Le product owner veut 2 nouvelles fonctionnalités à haute valeur. Les équipes agiles accueillent le changement — la question est ce que vous échangez en retour.', descriptionEs: 'El product owner quiere 2 nuevas funciones de alto valor. Los equipos ágiles acogen el cambio — la pregunta es qué sacrificas a cambio.', descriptionVi: 'Product owner muốn 2 tính năng mới giá trị cao. Đội agile đón nhận thay đổi — câu hỏi là bạn đánh đổi điều gì.',
        icon: '📈',
        // Trigger condition: After week 3, if quality > 80
        triggerCondition: (state) => state.week >= 3 && state.scope.quality > 80,
        options: [
          { id: 'reprioritize', label: 'Absorb by re-prioritising (swap out lowest-value work)', labelFr: 'Absorber en re-priorisant (échanger le travail de moindre valeur)', labelEs: 'Absorber re-priorizando (sacar el trabajo de menor valor)', labelVi: 'Hấp thụ bằng tái ưu tiên (bỏ việc giá trị thấp nhất)', effects: { scope: 0, morale: 3, knowledge: 5, stress: 4 } },
          { id: 'accept', label: 'Accept all changes on top of current scope', labelFr: 'Accepter tous les changements en plus du périmètre actuel', labelEs: 'Aceptar todos los cambios encima del alcance actual', labelVi: 'Nhận mọi thay đổi chồng lên phạm vi hiện tại', effects: { scope: 2, budget: -30000, stress: 15, morale: -5 } },
          { id: 'decline', label: 'Decline and protect the plan (product misses market needs)', labelFr: 'Refuser et protéger le plan (le produit rate les besoins du marché)', labelEs: 'Rechazar y proteger el plan (el producto pierde las necesidades del mercado)', labelVi: 'Từ chối và bảo vệ kế hoạch (sản phẩm hụt nhu cầu thị trường)', effects: { morale: 2, stress: -3, quality: -3 } }
        ]
      },
      { 
        id: 'tech_debt', 
        title: 'Technical Debt Crisis', 
        description: 'QA discovered critical technical debt. Addressing it now prevents larger problems later.',
        titleFr: 'Crise de dette technique', titleEs: 'Crisis de deuda técnica', titleVi: 'Khủng hoảng nợ kỹ thuật',
        descriptionFr: 'L\'assurance qualité a découvert une dette technique critique. La traiter maintenant évite de plus gros problèmes plus tard.', descriptionEs: 'QA descubrió deuda técnica crítica. Atenderla ahora evita problemas mayores después.', descriptionVi: 'QA phát hiện nợ kỹ thuật nghiêm trọng. Xử lý ngay sẽ tránh vấn đề lớn hơn về sau.',
        icon: '🔧',
        // Trigger: Mid-project if quality dropped below 75
        triggerCondition: (state) => state.week >= 4 && state.scope.quality < 75,
        options: [
          { id: 'fix_now', label: 'Full refactor (schedule hit, quality gain)', labelFr: 'Refactorisation complète (impact calendrier, gain qualité)', labelEs: 'Refactor completo (golpe al cronograma, ganancia de calidad)', labelVi: 'Tái cấu trúc toàn bộ (chậm tiến độ, tăng chất lượng)', effects: { schedule: -1, quality: 15, budget: -20000, knowledge: 10 } },
          { id: 'patch', label: 'Quick patch', labelFr: 'Correctif rapide', labelEs: 'Parche rápido', labelVi: 'Vá nhanh', effects: { quality: 5, budget: -8000 } },
          { id: 'defer', label: 'Document for v2 (risk)', labelFr: 'Documenter pour la v2 (risque)', labelEs: 'Documentar para la v2 (riesgo)', labelVi: 'Ghi lại cho v2 (rủi ro)', effects: { quality: -15, stress: 10 } }
        ]
      },
      { 
        id: 'dev_resignation', 
        title: 'Lead Developer Resigns', 
        description: 'Your lead developer accepted a FAANG offer. This will cause knowledge loss.',
        titleFr: 'Démission du développeur principal', titleEs: 'Renuncia el desarrollador líder', titleVi: 'Trưởng nhóm lập trình nghỉ việc',
        descriptionFr: 'Votre développeur principal a accepté une offre d\'un géant techno. Cela causera une perte de connaissances.', descriptionEs: 'Tu desarrollador líder aceptó una oferta de una big tech. Esto causará pérdida de conocimiento.', descriptionVi: 'Trưởng nhóm lập trình của bạn nhận lời mời từ một big tech. Điều này gây thất thoát kiến thức.',
        icon: '🚪',
        // Trigger: If stress is high (>50) after week 5
        triggerCondition: (state) => state.week >= 5 && state.team.stress > 50,
        options: [
          { id: 'counter', label: 'Counter-offer (expensive, retain knowledge)', labelFr: 'Contre-offre (coûteux, retient les connaissances)', labelEs: 'Contraoferta (caro, retiene conocimiento)', labelVi: 'Đưa đề nghị giữ chân (đắt, giữ được kiến thức)', effects: { budget: -45000, morale: 5, knowledge: 0 } },
          { id: 'transition', label: 'Knowledge transfer period', labelFr: 'Période de transfert de connaissances', labelEs: 'Período de transferencia de conocimiento', labelVi: 'Giai đoạn chuyển giao kiến thức', effects: { team: -1, schedule: -1, morale: -5, knowledge: -15, stress: 15 } },
          { id: 'contractor', label: 'Hire contractor (no knowledge loss)', labelFr: 'Embaucher un contractuel (aucune perte de connaissances)', labelEs: 'Contratar un contratista (sin pérdida de conocimiento)', labelVi: 'Thuê nhà thầu (không mất kiến thức)', effects: { budget: -55000, productivity: -0.1 } }
        ]
      },
      { 
        id: 'team_conflict', 
        title: 'Architecture Disagreement', 
        description: 'Senior devs debate microservices vs monolith. Unresolved conflict will hurt productivity.',
        titleFr: 'Désaccord d\'architecture', titleEs: 'Desacuerdo de arquitectura', titleVi: 'Bất đồng kiến trúc',
        descriptionFr: 'Les développeurs seniors débattent microservices vs monolithe. Un conflit non résolu nuira à la productivité.', descriptionEs: 'Los devs senior debaten microservicios vs monolito. Un conflicto sin resolver dañará la productividad.', descriptionVi: 'Các lập trình viên cấp cao tranh luận microservices hay monolith. Mâu thuẫn không giải quyết sẽ hại năng suất.',
        icon: '🔥',
        // Trigger: If team size > 5 and morale < 70
        triggerCondition: (state) => state.team.size > 5 && state.team.morale < 70,
        options: [
          { id: 'mediate', label: 'Architecture review workshop (+knowledge)', labelFr: 'Atelier de revue d\'architecture (+connaissances)', labelEs: 'Taller de revisión de arquitectura (+conocimiento)', labelVi: 'Hội thảo rà soát kiến trúc (+kiến thức)', effects: { budget: -8000, morale: 10, productivity: 0.1, knowledge: 8 } },
          { id: 'decide', label: 'Executive decision (fast, some resentment)', labelFr: 'Décision exécutive (rapide, quelque ressentiment)', labelEs: 'Decisión ejecutiva (rápida, algo de resentimiento)', labelVi: 'Quyết định từ trên xuống (nhanh, có chút bất mãn)', effects: { morale: -10, productivity: 0.05 } },
          { id: 'hybrid', label: 'Hybrid approach (compromise)', labelFr: 'Approche hybride (compromis)', labelEs: 'Enfoque híbrido (compromiso)', labelVi: 'Hướng lai (thỏa hiệp)', effects: { budget: -5000, morale: 5 } }
        ]
      }
    ]
  },

  live_show: {
    id: 'live_show',
    category: 'entertainment',
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
        titleFr: 'Blessure de l\'artiste vedette', titleEs: 'Lesión del artista principal', titleVi: 'Nghệ sĩ chính chấn thương',
        descriptionFr: 'Votre acrobate vedette a subi une blessure mineure. Votre gestion de la situation affectera la confiance de l\'équipe.', descriptionEs: 'Tu acróbata estrella sufrió una lesión menor. Cómo lo manejes afecta la confianza del equipo.', descriptionVi: 'Nghệ sĩ nhào lộn ngôi sao bị chấn thương nhẹ. Cách bạn xử lý ảnh hưởng đến niềm tin của đội.',
        icon: '🤕',
        triggerCondition: (state) => state.week >= 4 && state.team.stress > 40,
        options: [
          { id: 'rest', label: 'Full recovery time (+morale, +trust)', labelFr: 'Temps de récupération complet (+moral, +confiance)', labelEs: 'Tiempo de recuperación completo (+moral, +confianza)', labelVi: 'Cho nghỉ hồi phục đầy đủ (+tinh thần, +niềm tin)', effects: { schedule: -2, quality: 10, morale: 15, stress: -10 } },
          { id: 'modified', label: 'Modified choreography', labelFr: 'Chorégraphie modifiée', labelEs: 'Coreografía modificada', labelVi: 'Chỉnh sửa vũ đạo', effects: { quality: -5, budget: -20000 } },
          { id: 'understudy', label: 'Promote understudy (risky)', labelFr: 'Promouvoir la doublure (risqué)', labelEs: 'Promover al suplente (riesgoso)', labelVi: 'Đôn diễn viên dự bị (rủi ro)', effects: { morale: -10, quality: -10, stress: 10 } }
        ]
      },
      { 
        id: 'creative_conflict', 
        title: 'Creative Vision Clash', 
        description: 'Director and choreographer disagree on Act 3. Unresolved, this will fester.',
        titleFr: 'Conflit de vision créative', titleEs: 'Choque de visión creativa', titleVi: 'Va chạm tầm nhìn sáng tạo',
        descriptionFr: 'Le metteur en scène et le chorégraphe sont en désaccord sur l\'acte 3. Non résolu, cela va s\'envenimer.', descriptionEs: 'El director y el coreógrafo no coinciden en el Acto 3. Sin resolver, esto se enconará.', descriptionVi: 'Đạo diễn và biên đạo bất đồng về Màn 3. Không giải quyết, chuyện sẽ mưng mủ.',
        icon: '🎭',
        triggerCondition: (state) => state.week >= 5 && state.team.morale < 75,
        options: [
          { id: 'director', label: "Back director's vision", effects: { morale: -15, quality: 5, stress: 5 } },
          { id: 'choreographer', label: 'Support choreographer', labelFr: 'Appuyer le chorégraphe', labelEs: 'Apoyar al coreógrafo', labelVi: 'Ủng hộ biên đạo', effects: { morale: -10, quality: 5, stress: 5 } },
          { id: 'workshop', label: 'Creative workshop (+knowledge)', labelFr: 'Atelier créatif (+connaissances)', labelEs: 'Taller creativo (+conocimiento)', labelVi: 'Hội thảo sáng tạo (+kiến thức)', effects: { budget: -30000, schedule: -1, quality: 15, morale: 10, knowledge: 12 } }
        ]
      },
      { 
        id: 'rigging_issue', 
        title: 'Rigging Safety Concern', 
        description: 'Aerial rigging may not meet safety standards. A prototype/tech rehearsal would have caught this earlier.',
        titleFr: 'Inquiétude de sécurité du gréement', titleEs: 'Preocupación de seguridad del rigging', titleVi: 'Lo ngại an toàn hệ thống treo',
        descriptionFr: 'Le gréement aérien pourrait ne pas respecter les normes de sécurité. Un prototype/répétition technique l\'aurait détecté plus tôt.', descriptionEs: 'El rigging aéreo podría no cumplir las normas de seguridad. Un prototipo/ensayo técnico lo habría detectado antes.', descriptionVi: 'Hệ thống treo trên không có thể không đạt chuẩn an toàn. Một buổi nguyên mẫu/diễn tập kỹ thuật đã có thể phát hiện sớm hơn.',
        icon: '⚠️',
        // This event is MITIGATED if prototypes were built
        triggerCondition: (state) => state.week >= 6,
        prototypeModifier: true, // If prototypes built, effects reduced
        options: [
          { id: 'redesign', label: 'Full redesign (safest)', labelFr: 'Refonte complète (le plus sûr)', labelEs: 'Rediseño completo (lo más seguro)', labelVi: 'Thiết kế lại toàn bộ (an toàn nhất)', effects: { budget: -150000, schedule: -2, quality: 15, stress: -10 } },
          { id: 'reinforce', label: 'Reinforce current design', labelFr: 'Renforcer le design actuel', labelEs: 'Reforzar el diseño actual', labelVi: 'Gia cố thiết kế hiện tại', effects: { budget: -60000, quality: 5 } },
          { id: 'simplify', label: 'Simplify aerial sequences', labelFr: 'Simplifier les séquences aériennes', labelEs: 'Simplificar las secuencias aéreas', labelVi: 'Đơn giản hóa các màn trên không', effects: { scope: -1, quality: -10, morale: -10 } }
        ]
      }
    ]
  },

  construction: {
    id: 'construction',
    category: 'construction',
    title: 'Construction',
    subtitle: 'Commercial Building Project',
    icon: '🏗️',
    // v3 Fix 5: difficulty labels now track structural demands, not budget size.
    // Construction runs 16 weeks with 4 interacting events, prototyping AND
    // uncertainty -> Advanced. (Standard = learn mechanics; Advanced = added
    // mechanics/uncertainty; Expert = compounding uncertainty + tight feedback.)
    difficulty: 'Advanced',
    difficultyColor: '#f59e0b',
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
        titleFr: 'Alerte météo sévère', titleEs: 'Alerta de clima severo', titleVi: 'Cảnh báo thời tiết khắc nghiệt',
        descriptionFr: 'Tempête majeure prévue pour 10 jours. Votre choix affecte le calendrier et la sécurité de l\'équipe.', descriptionEs: 'Se pronostica una tormenta mayor de 10 días. Tu elección afecta el cronograma y la seguridad del equipo.', descriptionVi: 'Dự báo bão lớn trong 10 ngày. Lựa chọn của bạn ảnh hưởng cả tiến độ lẫn an toàn của đội.',
        icon: '🌧️',
        triggerCondition: (state) => state.week >= 4 && state.week <= 12,
        options: [
          { id: 'pause', label: 'Pause outdoor work (safe)', labelFr: 'Suspendre les travaux extérieurs (sûr)', labelEs: 'Pausar el trabajo exterior (seguro)', labelVi: 'Tạm dừng việc ngoài trời (an toàn)', effects: { schedule: -2, morale: 5, stress: -5 } },
          { id: 'interior', label: 'Interior work only', labelFr: 'Travaux intérieurs seulement', labelEs: 'Solo trabajo interior', labelVi: 'Chỉ làm phần trong nhà', effects: { schedule: -1, budget: -50000, knowledge: 5 } },
          { id: 'push', label: 'Continue with caution (risky)', labelFr: 'Continuer avec prudence (risqué)', labelEs: 'Continuar con cautela (riesgoso)', labelVi: 'Tiếp tục một cách thận trọng (rủi ro)', effects: { budget: -80000, quality: -5, morale: -10, stress: 15 } }
        ]
      },
      { 
        id: 'permit_issue', 
        title: 'Permit Inspection Failed', 
        description: 'Inspector flagged electrical issues. A prototype/mockup inspection would have caught this earlier.',
        titleFr: 'Échec de l\'inspection de permis', titleEs: 'Inspección de permiso fallida', titleVi: 'Trượt kiểm tra giấy phép',
        descriptionFr: 'L\'inspecteur a signalé des problèmes électriques. Une inspection prototype/maquette l\'aurait détecté plus tôt.', descriptionEs: 'El inspector señaló problemas eléctricos. Una inspección de prototipo/maqueta lo habría detectado antes.', descriptionVi: 'Thanh tra chỉ ra vấn đề hệ thống điện. Kiểm tra nguyên mẫu/mô hình đã có thể phát hiện sớm hơn.',
        icon: '📋',
        triggerCondition: (state) => state.week >= 6,
        prototypeModifier: true,
        options: [
          { id: 'rework', label: 'Full rework (+quality)', labelFr: 'Retravail complet (+qualité)', labelEs: 'Retrabajo completo (+calidad)', labelVi: 'Làm lại toàn bộ (+chất lượng)', effects: { schedule: -2, budget: -120000, quality: 10, knowledge: 8 } },
          { id: 'appeal', label: 'Appeal decision', labelFr: 'Faire appel de la décision', labelEs: 'Apelar la decisión', labelVi: 'Kháng nghị quyết định', effects: { schedule: -1, budget: -30000, stress: 10 } },
          { id: 'expedite', label: 'Hire specialist (expensive)', labelFr: 'Embaucher un spécialiste (coûteux)', labelEs: 'Contratar especialista (caro)', labelVi: 'Thuê chuyên gia (đắt)', effects: { budget: -180000 } }
        ]
      },
      { 
        id: 'safety_incident', 
        title: 'Safety Near-Miss', 
        description: 'Scaffold bracket failed. OSHA will investigate. This affects team morale and stress significantly.',
        titleFr: 'Quasi-accident de sécurité', titleEs: 'Casi accidente', titleVi: 'Suýt xảy ra tai nạn',
        descriptionFr: 'Un support d\'échafaudage a cédé. Les autorités vont enquêter. Cela affecte significativement le moral et le stress de l\'équipe.', descriptionEs: 'Falló un soporte de andamio. Habrá investigación de seguridad laboral. Esto afecta significativamente la moral y el estrés del equipo.', descriptionVi: 'Giá đỡ giàn giáo bị hỏng. Cơ quan an toàn lao động sẽ điều tra. Điều này ảnh hưởng lớn đến tinh thần và mức căng thẳng của đội.',
        icon: '🦺',
        triggerCondition: (state) => state.week >= 5 && state.team.stress > 45,
        options: [
          { id: 'full_audit', label: 'Full safety audit (+trust)', labelFr: 'Audit de sécurité complet (+confiance)', labelEs: 'Auditoría de seguridad completa (+confianza)', labelVi: 'Kiểm toán an toàn toàn diện (+niềm tin)', effects: { schedule: -1, budget: -60000, quality: 10, morale: 15, stress: -15, knowledge: 10 } },
          { id: 'targeted', label: 'Targeted inspection', labelFr: 'Inspection ciblée', labelEs: 'Inspección focalizada', labelVi: 'Kiểm tra có trọng điểm', effects: { budget: -25000, quality: 5 } },
          { id: 'minimal', label: 'Document and continue (risky)', labelFr: 'Documenter et continuer (risqué)', labelEs: 'Documentar y continuar (riesgoso)', labelVi: 'Ghi nhận và tiếp tục (rủi ro)', effects: { quality: -10, morale: -15, stress: 20 } }
        ]
      },
      { 
        id: 'materials_shortage', 
        title: 'Materials Shortage', 
        description: 'Supply chain issue: steel delivery delayed 3 weeks. Prototyping/early ordering would have mitigated this.',
        titleFr: 'Pénurie de matériaux', titleEs: 'Escasez de materiales', titleVi: 'Thiếu vật liệu',
        descriptionFr: 'Problème de chaîne d\'approvisionnement : livraison d\'acier retardée de 3 semaines. Le prototypage/commande anticipée l\'aurait atténué.', descriptionEs: 'Problema de cadena de suministro: la entrega de acero se retrasa 3 semanas. Prototipar/ordenar temprano lo habría mitigado.', descriptionVi: 'Sự cố chuỗi cung ứng: giao thép trễ 3 tuần. Làm nguyên mẫu/đặt hàng sớm đã có thể giảm nhẹ việc này.',
        icon: '📦',
        triggerCondition: (state) => state.week >= 7,
        prototypeModifier: true,
        options: [
          { id: 'wait', label: 'Wait for delivery', labelFr: 'Attendre la livraison', labelEs: 'Esperar la entrega', labelVi: 'Chờ giao hàng', effects: { schedule: -3, morale: -10, stress: 15 } },
          { id: 'alternative', label: 'Source alternative supplier', labelFr: 'Trouver un fournisseur alternatif', labelEs: 'Buscar un proveedor alternativo', labelVi: 'Tìm nhà cung cấp thay thế', effects: { budget: -200000, schedule: -1 } },
          { id: 'redesign', label: 'Redesign with available materials', labelFr: 'Reconcevoir avec les matériaux disponibles', labelEs: 'Rediseñar con materiales disponibles', labelVi: 'Thiết kế lại với vật liệu sẵn có', effects: { budget: -100000, quality: -5, knowledge: 5 } }
        ]
      }
    ]
  },

  // NEW SCENARIO: High-Uncertainty R&D Project
  rd_innovation: {
    id: 'rd_innovation',
    category: 'apex',
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
        titleFr: 'Échec de la technologie centrale', titleEs: 'Falla de la tecnología central', titleVi: 'Công nghệ lõi thất bại',
        descriptionFr: 'L\'approche principale du capteur ne fonctionne pas comme prévu. Des prototypes l\'auraient révélé plus tôt.', descriptionEs: 'El enfoque principal del sensor no funciona como se esperaba. Los prototipos lo habrían revelado antes.', descriptionVi: 'Hướng tiếp cận cảm biến chính không hoạt động như kỳ vọng. Nguyên mẫu đã có thể phơi bày điều này sớm hơn.',
        icon: '💥',
        triggerCondition: (state) => state.week >= 5,
        prototypeModifier: true, // Severity significantly reduced if prototypes built
        options: [
          { id: 'pivot', label: 'Pivot to backup approach', labelFr: 'Pivoter vers l\'approche de secours', labelEs: 'Pivotar al enfoque de respaldo', labelVi: 'Chuyển sang phương án dự phòng', effects: { scope: -2, budget: -200000, knowledge: 15, stress: -10 } },
          { id: 'iterate', label: 'Iterate on current design', labelFr: 'Itérer sur le design actuel', labelEs: 'Iterar sobre el diseño actual', labelVi: 'Cải tiến dần thiết kế hiện tại', effects: { schedule: -3, budget: -150000, quality: -10, stress: 15 } },
          { id: 'parallel', label: 'Run parallel approaches', labelFr: 'Mener des approches en parallèle', labelEs: 'Ejecutar enfoques en paralelo', labelVi: 'Chạy song song nhiều hướng', effects: { budget: -400000, team: 2, stress: 20 } }
        ]
      },
      { 
        id: 'breakthrough', 
        title: 'Unexpected Breakthrough', 
        description: 'A team member discovered a shortcut. How you capitalize on it matters.',
        titleFr: 'Percée inattendue', titleEs: 'Avance inesperado', titleVi: 'Đột phá bất ngờ',
        descriptionFr: 'Un membre de l\'équipe a découvert un raccourci. La façon d\'en tirer parti compte.', descriptionEs: 'Un miembro del equipo descubrió un atajo. Cómo lo capitalices importa.', descriptionVi: 'Một thành viên phát hiện lối tắt. Cách bạn tận dụng nó rất quan trọng.',
        icon: '💡',
        triggerCondition: (state) => state.week >= 6 && state.team.knowledge > 50,
        options: [
          { id: 'focus', label: 'Focus resources on breakthrough', labelFr: 'Concentrer les ressources sur la percée', labelEs: 'Enfocar recursos en el avance', labelVi: 'Dồn nguồn lực cho đột phá', effects: { quality: 15, morale: 15, knowledge: 10, stress: -10 } },
          { id: 'validate', label: 'Build prototype to validate', labelFr: 'Construire un prototype pour valider', labelEs: 'Construir prototipo para validar', labelVi: 'Xây nguyên mẫu để kiểm chứng', effects: { budget: -50000, quality: 10, knowledge: 20 } },
          { id: 'patent', label: 'Document for patent first', labelFr: 'Documenter pour brevet d\'abord', labelEs: 'Documentar para patente primero', labelVi: 'Lập hồ sơ bằng sáng chế trước', effects: { schedule: -1, morale: -5 } }
        ]
      },
      { 
        id: 'competitor_announcement', 
        title: 'Competitor Announcement', 
        description: 'A competitor announced a similar product launching in 8 weeks. Time pressure increases.',
        titleFr: 'Annonce d\'un concurrent', titleEs: 'Anuncio de un competidor', titleVi: 'Đối thủ công bố',
        descriptionFr: 'Un concurrent a annoncé un produit similaire lancé dans 8 semaines. La pression temporelle augmente.', descriptionEs: 'Un competidor anunció un producto similar que se lanza en 8 semanas. La presión de tiempo aumenta.', descriptionVi: 'Đối thủ công bố sản phẩm tương tự ra mắt sau 8 tuần. Áp lực thời gian tăng lên.',
        icon: '⚡',
        triggerCondition: (state) => state.week >= 7,
        options: [
          { id: 'accelerate', label: 'Accelerate timeline (-3 weeks)', labelFr: 'Accélérer le calendrier (−3 semaines)', labelEs: 'Acelerar el cronograma (−3 semanas)', labelVi: 'Đẩy nhanh tiến độ (−3 tuần)', effects: { schedule: -3, stress: 25, morale: -10 } },
          { id: 'differentiate', label: 'Pivot to differentiation (+scope)', labelFr: 'Pivoter vers la différenciation (+périmètre)', labelEs: 'Pivotar a la diferenciación (+alcance)', labelVi: 'Xoay sang khác biệt hóa (+phạm vi)', effects: { scope: 2, budget: -100000, knowledge: 5 } },
          { id: 'stay_course', label: 'Stay the course (quality focus)', labelFr: 'Garder le cap (accent qualité)', labelEs: 'Mantener el rumbo (enfoque en calidad)', labelVi: 'Giữ vững hướng đi (ưu tiên chất lượng)', effects: { quality: 10, morale: 5 } }
        ]
      }
    ]
  },

  // NEW SCENARIO (v3): "Momentum" — FinTech MVP under Scrum.
  // The scoring is deliberately inverted vs. the classic model: there is no
  // fixed-deadline penalty and no "never re-plan" bonus. Re-prioritising is
  // free; failing to deliver VALUE is what costs points.
  momentum_scrum: {
    id: 'momentum_scrum',
    category: 'banking',
    title: 'Momentum',
    subtitle: 'FinTech MVP under Scrum',
    icon: '🏃',
    difficulty: 'Advanced',
    difficultyColor: '#f59e0b',
    description: 'You are Product Owner at a fintech startup. Ship the most valuable payments MVP by the investor demo — you cannot build it all.',
    company: 'Cadence Pay',
    projectName: 'Payments MVP',
    deliverable: 'backlog items',
    pedagogicalFocus: 'agile-scrum',
    hasPrototyping: false,
    hasUncertainty: true, // item-level estimate uncertainty
    framework: 'scrum',
    initial: {
      budget: 650000, // playtest-tuned: 5-person burn over 12 wks ≈ $520-560K -> lands in the 80-100% band
      weeks: 12,
      scope: 14, // backlog item count (display only — scrum plays from the backlog)
      sprintLength: 2,
      teamSize: 5,
      quality: 85,
      morale: 75,
      stress: 20,
      knowledge: 35
    },
    weeklyCostPerPerson: 8000,
    sprints: 6,
    valueTarget: 450, // delivered value for full marks on the 300-pt value component
    pivot: {
      sprint: 3,
      changes: [{ id: 'fraud', value: 95 }, { id: 'fx', value: 30 }],
      retire: 'admin',
      newItem: { id: 'realtime_payouts', name: 'Real-time payouts', nameFr: 'Paiements en temps réel', nameEs: 'Pagos en tiempo real', nameVi: 'Chi trả thời gian thực', points: 8, value: 90, uncertainty: 0.25, rank: 2.5 }
    },
    // Value-weighted product backlog. Total (62 pts / 663 value) far exceeds
    // 6-sprint capacity — choosing what NOT to build is the game.
    backlog: [
      { id: 'ledger',        name: 'Core payment ledger',      nameFr: 'Registre de paiements', nameEs: 'Libro mayor de pagos', nameVi: 'Sổ cái thanh toán lõi',        points: 8, value: 100, uncertainty: 0.1, must: true },
      { id: 'fraud',         name: 'Fraud-check integration',  nameFr: 'Intégration antifraude', nameEs: 'Integración antifraude', nameVi: 'Tích hợp kiểm tra gian lận',       points: 5, value: 80,  uncertainty: 0.4 },
      { id: 'kyc',           name: 'KYC onboarding flow',      nameFr: 'Parcours d’intégration KYC', nameEs: 'Flujo de onboarding KYC', nameVi: 'Luồng định danh KYC',   points: 5, value: 70,  uncertainty: 0.2, must: true },
      { id: 'billing',       name: 'Recurring billing',        nameFr: 'Facturation récurrente', nameEs: 'Facturación recurrente', nameVi: 'Thanh toán định kỳ',       points: 5, value: 65,  uncertainty: 0.2 },
      { id: 'fx',            name: 'Multi-currency support',   nameFr: 'Support multidevises', nameEs: 'Soporte multimoneda', nameVi: 'Hỗ trợ đa tiền tệ',         points: 8, value: 55,  uncertainty: 0.3 },
      { id: 'sso',           name: 'SSO / enterprise login',   nameFr: 'Connexion SSO entreprise', nameEs: 'SSO / acceso empresarial', nameVi: 'SSO / đăng nhập doanh nghiệp',     points: 5, value: 50,  uncertainty: 0.2 },
      { id: 'reporting',     name: 'Merchant reporting',       nameFr: 'Rapports marchands', nameEs: 'Reportes para comercios', nameVi: 'Báo cáo cho đối tác bán hàng',           points: 5, value: 45,  uncertainty: 0.2 },
      { id: 'notifications', name: 'Payment notifications',    nameFr: 'Notifications de paiement', nameEs: 'Notificaciones de pago', nameVi: 'Thông báo giao dịch',    points: 3, value: 40,  uncertainty: 0.1 },
      { id: 'perf',          name: 'Performance hardening',    nameFr: 'Optimisation des performances', nameEs: 'Optimización de rendimiento', nameVi: 'Gia cố hiệu năng', points: 5, value: 38,  uncertainty: 0.3 },
      { id: 'audit',         name: 'Audit log',                nameFr: 'Journal d’audit', nameEs: 'Registro de auditoría', nameVi: 'Nhật ký kiểm toán',              points: 3, value: 35,  uncertainty: 0.1 },
      { id: 'admin',         name: 'Admin dashboard',          nameFr: 'Tableau de bord admin', nameEs: 'Panel de administración', nameVi: 'Bảng quản trị',        points: 3, value: 30,  uncertainty: 0.1 },
      { id: 'docs',          name: 'API documentation',        nameFr: 'Documentation API', nameEs: 'Documentación de API', nameVi: 'Tài liệu API',            points: 2, value: 25,  uncertainty: 0.1 },
      { id: 'sandbox',       name: 'Developer sandbox',        nameFr: 'Bac à sable développeur', nameEs: 'Sandbox para desarrolladores', nameVi: 'Sandbox cho lập trình viên',      points: 3, value: 20,  uncertainty: 0.2 },
      { id: 'darkmode',      name: 'Dark-mode UI',             nameFr: 'Interface mode sombre', nameEs: 'Interfaz en modo oscuro', nameVi: 'Giao diện chế độ tối',        points: 2, value: 10,  uncertainty: 0.1 }
    ],
    ceremonies: ['sprint_planning', 'standup', 'sprint_review', 'retrospective', 'refine_backlog'],
    scoringStrategy: 'scrum' // value 300 / predictability 150 / quality 200 /
                             // responsiveness 150 / team 150 / budget-band 50
  },

  // ============================================
  // TRUCK DEALERSHIP IT SERIES — Groupe TransBoréal
  // A heavy-truck dealership (sales, service & repair bays, parts counter,
  // fleet clients) runs four IT projects: two plan-driven, two Scrum.
  // ============================================

  // TRADITIONAL #1 — plan-driven ERP/DMS rollout (risk & prototyping focus)
  dms_dynamics: {
    id: 'dms_dynamics',
    category: 'trucks_smr',
    title: 'Dealer One',
    subtitle: 'Dealer Management System Rollout',
    icon: '🖥️',
    difficulty: 'Advanced',
    difficultyColor: '#f59e0b',
    description: 'IT Project Manager at a heavy-truck dealership. Replace the aging dealer management system with Microsoft Dynamics 365 across sales, service and parts — without stopping the shop.',
    company: 'Groupe TransBoréal',
    projectName: 'Dealer One — Dynamics 365 DMS',
    deliverable: 'modules',
    pedagogicalFocus: 'risk',
    hasPrototyping: true,  // sandbox pilots & migration dry runs
    hasUncertainty: true,
    initial: {
      budget: 1400000,
      weeks: 16,
      scope: 12,
      teamSize: 10,
      quality: 85,
      morale: 72,
      stress: 25,
      knowledge: 30 // new platform, mixed IT + integrator team
    },
    weeklyCostPerPerson: 7000,
    causalEvents: [
      {
        id: 'data_migration',
        title: 'Legacy Data Nightmare',
        description: 'The 20-year-old DMS database is far dirtier than expected: duplicate customers, orphaned work orders, parts with three different numbers. A sandbox dry run would have surfaced this earlier.',
        titleFr: 'Cauchemar des données héritées', titleEs: 'Pesadilla de datos heredados', titleVi: 'Ác mộng dữ liệu cũ',
        descriptionFr: 'La base de données DMS de 20 ans est bien plus sale que prévu : clients en double, bons de travail orphelins, pièces avec trois numéros différents. Un essai en sandbox l\'aurait révélé plus tôt.', descriptionEs: 'La base de datos del DMS de 20 años está mucho más sucia de lo esperado: clientes duplicados, órdenes de trabajo huérfanas, repuestos con tres números distintos. Un ensayo en sandbox lo habría revelado antes.', descriptionVi: 'Cơ sở dữ liệu DMS 20 năm tuổi bẩn hơn nhiều so với dự kiến: khách hàng trùng lặp, lệnh sửa chữa mồ côi, phụ tùng có ba mã khác nhau. Chạy thử sandbox đã có thể phát hiện sớm hơn.',
        icon: '🗄️',
        triggerCondition: (state) => state.week >= 5,
        prototypeModifier: true,
        options: [
          { id: 'full_cleanse', label: 'Full data cleanse before migrating (+quality, +knowledge)', labelFr: 'Nettoyage complet des données avant migration (+qualité, +connaissances)', labelEs: 'Limpieza completa de datos antes de migrar (+calidad, +conocimiento)', labelVi: 'Làm sạch toàn bộ dữ liệu trước di trú (+chất lượng, +kiến thức)', effects: { schedule: -2, budget: -90000, quality: 12, knowledge: 10, stress: -5 } },
          { id: 'migrate_asis', label: 'Migrate as-is, fix in production (risky)', labelFr: 'Migrer tel quel, corriger en production (risqué)', labelEs: 'Migrar tal cual, arreglar en producción (riesgoso)', labelVi: 'Di trú nguyên trạng, sửa trên production (rủi ro)', effects: { quality: -15, stress: 12 } },
          { id: 'phased', label: 'Phased migration: clean the parts catalog first', labelFr: 'Migration par phases : nettoyer le catalogue de pièces d\'abord', labelEs: 'Migración por fases: limpiar primero el catálogo de repuestos', labelVi: 'Di trú theo giai đoạn: làm sạch danh mục phụ tùng trước', effects: { budget: -40000, schedule: -1, quality: 5, knowledge: 5 } }
        ]
      },
      {
        id: 'counter_revolt',
        title: 'Parts Counter Pushback',
        description: 'Veteran parts-counter staff refuse the new workflows — "the old system was faster." Service writers are starting to side with them.',
        titleFr: 'Résistance du comptoir de pièces', titleEs: 'Resistencia del mostrador de repuestos', titleVi: 'Quầy phụ tùng phản đối',
        descriptionFr: 'Les employés d\'expérience du comptoir refusent les nouveaux flux de travail — « l\'ancien système était plus rapide ». Les conseillers techniques commencent à se ranger de leur côté.', descriptionEs: 'El personal veterano del mostrador rechaza los nuevos flujos — "el sistema viejo era más rápido". Los asesores de servicio empiezan a apoyarlos.', descriptionVi: 'Nhân viên kỳ cựu quầy phụ tùng từ chối quy trình mới — "hệ thống cũ nhanh hơn." Nhân viên tiếp nhận dịch vụ bắt đầu về phe họ.',
        icon: '🧰',
        triggerCondition: (state) => state.week >= 6 && state.team.morale < 70,
        options: [
          { id: 'super_users', label: 'Recruit super-users from the counter (+morale, +knowledge)', labelFr: 'Recruter des super-utilisateurs au comptoir (+moral, +connaissances)', labelEs: 'Reclutar superusuarios del mostrador (+moral, +conocimiento)', labelVi: 'Tuyển super-user từ quầy (+tinh thần, +kiến thức)', effects: { budget: -25000, morale: 12, knowledge: 10, stress: -5 } },
          { id: 'mandate', label: 'Management mandate: use it or else', labelFr: 'Mandat de la direction : utilisez-le, point final', labelEs: 'Mandato de la gerencia: se usa y punto', labelVi: 'Mệnh lệnh cấp trên: phải dùng, không bàn cãi', effects: { morale: -12, stress: 12, productivity: 0.05 } },
          { id: 'delay_golive', label: 'Delay their go-live by one release', labelFr: 'Retarder leur mise en service d\'une version', labelEs: 'Retrasar su go-live un release', labelVi: 'Lùi go-live của họ một bản phát hành', effects: { schedule: -1, morale: 5 } }
        ]
      },
      {
        id: 'integrator_loss',
        title: 'Integrator Pulls Their Lead',
        description: 'The Dynamics integrator reassigns your lead consultant to a bigger client. Sustained schedule pressure made your project the easy one to raid.',
        titleFr: 'L\'intégrateur retire son consultant principal', titleEs: 'El integrador retira a su consultor líder', titleVi: 'Nhà tích hợp rút chuyên gia chính',
        descriptionFr: 'L\'intégrateur Dynamics réaffecte votre consultant principal à un plus gros client. La pression soutenue sur le calendrier a fait de votre projet une cible facile.', descriptionEs: 'El integrador de Dynamics reasigna a tu consultor líder a un cliente más grande. La presión sostenida del cronograma hizo de tu proyecto el blanco fácil.', descriptionVi: 'Nhà tích hợp Dynamics điều chuyên gia chính của bạn sang khách hàng lớn hơn. Áp lực tiến độ kéo dài khiến dự án của bạn thành mục tiêu dễ rút người.',
        icon: '🚪',
        triggerCondition: (state) => state.week >= 7 && state.team.stress > 50,
        options: [
          { id: 'escalate', label: 'Escalate to the partner exec (expensive retention)', labelFr: 'Escalader au dirigeant partenaire (rétention coûteuse)', labelEs: 'Escalar al ejecutivo del socio (retención cara)', labelVi: 'Chuyển lên lãnh đạo đối tác (giữ người tốn kém)', effects: { budget: -60000, knowledge: 0, morale: 3 } },
          { id: 'transfer', label: 'Two-week knowledge transfer to internal IT', labelFr: 'Transfert de connaissances de deux semaines aux TI internes', labelEs: 'Transferencia de conocimiento de dos semanas a TI interna', labelVi: 'Chuyển giao kiến thức hai tuần cho CNTT nội bộ', effects: { schedule: -1, knowledge: -10, stress: 10, morale: -5 } },
          { id: 'replace', label: 'Accept the replacement consultant', labelFr: 'Accepter le consultant remplaçant', labelEs: 'Aceptar al consultor de reemplazo', labelVi: 'Chấp nhận chuyên gia thay thế', effects: { knowledge: -15, quality: -5 } }
        ]
      },
      {
        id: 'warranty_module',
        title: 'OEM Warranty Module Request',
        description: 'The manufacturer announces a new warranty-claims interface. Service management wants it in this rollout. Agile teams welcome change — what do you trade?',
        titleFr: 'Demande de module de garantie du fabricant', titleEs: 'Solicitud de módulo de garantía del fabricante', titleVi: 'Yêu cầu mô-đun bảo hành từ hãng',
        descriptionFr: 'Le fabricant annonce une nouvelle interface de réclamations de garantie. La direction du service la veut dans ce déploiement. Les équipes agiles accueillent le changement — qu\'échangez-vous ?', descriptionEs: 'El fabricante anuncia una nueva interfaz de reclamos de garantía. La gerencia de servicio la quiere en este despliegue. Los equipos ágiles acogen el cambio — ¿qué intercambias?', descriptionVi: 'Hãng sản xuất công bố giao diện yêu cầu bảo hành mới. Quản lý dịch vụ muốn có trong đợt triển khai này. Đội agile đón nhận thay đổi — bạn đánh đổi gì?',
        icon: '📋',
        triggerCondition: (state) => state.week >= 4 && state.scope.quality > 80,
        options: [
          { id: 'reprioritize', label: 'Absorb it by deferring the lowest-value module', labelFr: 'Absorber en reportant le module de moindre valeur', labelEs: 'Absorberlo difiriendo el módulo de menor valor', labelVi: 'Hấp thụ bằng cách hoãn mô-đun giá trị thấp nhất', effects: { scope: 0, morale: 3, knowledge: 5, stress: 4 } },
          { id: 'accept', label: 'Add it on top of the current scope', labelFr: 'L\'ajouter en plus du périmètre actuel', labelEs: 'Agregarlo encima del alcance actual', labelVi: 'Thêm chồng lên phạm vi hiện tại', effects: { scope: 2, budget: -70000, stress: 15, morale: -5 } },
          { id: 'decline', label: 'Decline — next phase (service dept. unhappy)', labelFr: 'Refuser — prochaine phase (service mécontent)', labelEs: 'Rechazar — próxima fase (servicio descontento)', labelVi: 'Từ chối — để giai đoạn sau (bộ phận dịch vụ bất mãn)', effects: { morale: 2, stress: -3, quality: -3 } }
        ]
      }
    ]
  },

  // TRADITIONAL #2 — onboarding-level infrastructure project
  cloud_foundation: {
    id: 'cloud_foundation',
    category: 'trucks_smr',
    title: 'Cloud Shift',
    subtitle: 'Microsoft 365 Migration',
    icon: '☁️',
    difficulty: 'Standard',
    difficultyColor: '#3b82f6',
    description: 'Move the dealership from an on-prem server room to Microsoft 365 — mail, files, Teams and single sign-on — without disrupting the service bays, the parts counter or the sales floor.',
    company: 'Groupe TransBoréal',
    projectName: 'Microsoft 365 & Identity Migration',
    deliverable: 'workstreams',
    pedagogicalFocus: 'mechanics',
    hasPrototyping: false,
    hasUncertainty: false,
    initial: {
      budget: 450000,
      weeks: 10,
      scope: 10,
      teamSize: 6,
      quality: 85,
      morale: 75,
      stress: 20,
      knowledge: 40
    },
    weeklyCostPerPerson: 6000,
    causalEvents: [
      {
        id: 'shadow_it',
        title: 'Shadow IT Discovered',
        description: 'The used-truck sales team has been running its own file-sharing app for a year. Fold it into the migration, or shut it down?',
        titleFr: 'TI fantôme découverte', titleEs: 'Shadow IT descubierto', titleVi: 'Phát hiện CNTT ngầm',
        descriptionFr: 'L\'équipe de vente de camions usagés utilise sa propre application de partage de fichiers depuis un an. L\'intégrer à la migration ou la fermer ?', descriptionEs: 'El equipo de venta de camiones usados lleva un año usando su propia app de compartir archivos. ¿La integras a la migración o la cierras?', descriptionVi: 'Đội bán xe tải cũ đã tự chạy ứng dụng chia sẻ tệp riêng suốt một năm. Gộp vào cuộc di trú, hay đóng nó lại?',
        icon: '🕵️',
        triggerCondition: (state) => state.week >= 3 && state.scope.quality > 80,
        options: [
          { id: 'reprioritize', label: 'Absorb it: migrate their data, swap out low-value work', labelFr: 'Absorber : migrer leurs données, échanger le travail de faible valeur', labelEs: 'Absorberlo: migrar sus datos, sacar trabajo de bajo valor', labelVi: 'Hấp thụ: di trú dữ liệu của họ, bỏ việc giá trị thấp', effects: { scope: 0, morale: 4, knowledge: 5, stress: 4 } },
          { id: 'add_scope', label: 'Add a full extra workstream for it', labelFr: 'Ajouter un volet de travail complet pour cela', labelEs: 'Agregar un frente de trabajo completo para ello', labelVi: 'Thêm hẳn một luồng công việc cho việc đó', effects: { scope: 1, budget: -20000, stress: 10 } },
          { id: 'shut_down', label: 'Shut it down — policy is policy', labelFr: 'La fermer — la politique, c\'est la politique', labelEs: 'Cerrarla — la política es la política', labelVi: 'Đóng nó lại — quy định là quy định', effects: { morale: -8, stress: 5, quality: -3 } }
        ]
      },
      {
        id: 'phishing_scare',
        title: 'Phishing Attack Mid-Migration',
        description: 'A service advisor clicked a fake "password reset" mail during the identity cutover. No breach — this time. Everyone is rattled.',
        titleFr: 'Attaque d\'hameçonnage en pleine migration', titleEs: 'Ataque de phishing en plena migración', titleVi: 'Tấn công phishing giữa cuộc di trú',
        descriptionFr: 'Un conseiller technique a cliqué sur un faux courriel de « réinitialisation de mot de passe » pendant la bascule d\'identité. Pas de brèche — cette fois. Tout le monde est secoué.', descriptionEs: 'Un asesor de servicio hizo clic en un correo falso de "restablecer contraseña" durante el cutover de identidad. Sin brecha — esta vez. Todos están inquietos.', descriptionVi: 'Một nhân viên tư vấn dịch vụ bấm vào email giả "đặt lại mật khẩu" trong lúc chuyển đổi định danh. Không rò rỉ — lần này. Ai nấy đều rúng động.',
        icon: '🎣',
        triggerCondition: (state) => state.week >= 4 && state.team.stress > 35,
        options: [
          { id: 'training_blitz', label: 'Security awareness blitz (+knowledge, +trust)', labelFr: 'Blitz de sensibilisation à la sécurité (+connaissances, +confiance)', labelEs: 'Campaña intensiva de concientización en seguridad (+conocimiento, +confianza)', labelVi: 'Chiến dịch thần tốc nâng cao ý thức bảo mật (+kiến thức, +niềm tin)', effects: { budget: -15000, knowledge: 10, morale: 5, stress: -8 } },
          { id: 'mfa_now', label: 'Force MFA everywhere immediately', labelFr: 'Imposer la MFA partout immédiatement', labelEs: 'Forzar MFA en todas partes de inmediato', labelVi: 'Bắt buộc MFA mọi nơi ngay lập tức', effects: { budget: -10000, quality: 8, morale: -5, stress: 8 } },
          { id: 'ignore', label: 'Log it and move on (risky)', labelFr: 'Consigner et passer à autre chose (risqué)', labelEs: 'Registrarlo y seguir (riesgoso)', labelVi: 'Ghi sổ rồi đi tiếp (rủi ro)', effects: { quality: -8, stress: 5 } }
        ]
      },
      {
        id: 'cutover_failure',
        title: 'Mailbox Cutover Goes Sideways',
        description: 'Half the parts department lost calendar invites in the cutover batch. The counter is blaming missed supplier deliveries on IT.',
        titleFr: 'La bascule des boîtes courriel dérape', titleEs: 'El cutover de buzones sale mal', titleVi: 'Chuyển đổi hộp thư trục trặc',
        descriptionFr: 'La moitié du département des pièces a perdu ses invitations de calendrier dans le lot de bascule. Le comptoir blâme les TI pour les livraisons fournisseurs manquées.', descriptionEs: 'La mitad del departamento de repuestos perdió invitaciones de calendario en el lote del cutover. El mostrador culpa a TI por entregas de proveedores perdidas.', descriptionVi: 'Nửa bộ phận phụ tùng mất lời mời lịch trong lô chuyển đổi. Quầy đổ lỗi cho CNTT về các chuyến giao hàng bị lỡ.',
        icon: '📪',
        triggerCondition: (state) => state.week >= 5 && state.scope.quality < 78,
        options: [
          { id: 'rollback', label: 'Roll back, fix the batch script, redo', labelFr: 'Revenir en arrière, corriger le script de lot, refaire', labelEs: 'Revertir, arreglar el script del lote, rehacer', labelVi: 'Hoàn tác, sửa script lô, làm lại', effects: { schedule: -1, budget: -18000, quality: 10, knowledge: 8 } },
          { id: 'patch_forward', label: 'Patch forward mailbox by mailbox', labelFr: 'Corriger boîte par boîte en avançant', labelEs: 'Parchar buzón por buzón', labelVi: 'Vá dần từng hộp thư', effects: { budget: -8000, quality: 3, stress: 8 } },
          { id: 'helpdesk_surge', label: 'Throw help-desk hours at it', labelFr: 'Y consacrer des heures de soutien technique', labelEs: 'Meterle horas de mesa de ayuda', labelVi: 'Dồn giờ help-desk vào xử lý', effects: { budget: -25000, morale: -3 } }
        ]
      },
      {
        id: 'bay_bandwidth',
        title: 'Shop Bandwidth Bottleneck',
        description: 'Cloud sync is saturating the service bays\u2019 old network — diagnostic laptops are timing out on trucks mid-repair. Mechanics are furious.',
        titleFr: 'Goulot de bande passante de l\'atelier', titleEs: 'Cuello de botella de ancho de banda del taller', titleVi: 'Nghẽn băng thông xưởng',
        descriptionFr: 'La synchronisation infonuagique sature le vieux réseau des baies de service — les portables de diagnostic décrochent en pleine réparation. Les mécaniciens sont furieux.', descriptionEs: 'La sincronización a la nube satura la vieja red de las bahías de servicio — las laptops de diagnóstico se cuelgan a mitad de reparación. Los mecánicos están furiosos.', descriptionVi: 'Đồng bộ đám mây làm nghẽn mạng cũ của khoang dịch vụ — laptop chẩn đoán bị ngắt giữa lúc sửa xe. Thợ máy nổi giận.',
        icon: '🛜',
        triggerCondition: (state) => state.week >= 6,
        options: [
          { id: 'upgrade_link', label: 'Upgrade the shop fibre link', labelFr: 'Mettre à niveau le lien fibre de l\'atelier', labelEs: 'Mejorar el enlace de fibra del taller', labelVi: 'Nâng cấp đường cáp quang của xưởng', effects: { budget: -35000, quality: 5, morale: 5 } },
          { id: 'throttle', label: 'Throttle sync during shop hours', labelFr: 'Limiter la synchronisation pendant les heures d\'atelier', labelEs: 'Limitar la sincronización en horario del taller', labelVi: 'Bóp băng thông đồng bộ trong giờ xưởng làm việc', effects: { quality: -3, stress: 3 } },
          { id: 'schedule_sync', label: 'Night-only sync window (slower rollout)', labelFr: 'Fenêtre de synchronisation de nuit seulement (déploiement plus lent)', labelEs: 'Ventana de sincronización solo nocturna (despliegue más lento)', labelVi: 'Chỉ đồng bộ ban đêm (triển khai chậm hơn)', effects: { schedule: -1, morale: 3 } }
        ]
      }
    ]
  },

  // SCRUM #1 — AI implementation by the IT team (Expert: high estimate uncertainty)
  torque_ai_scrum: {
    id: 'torque_ai_scrum',
    category: 'trucks_smr',
    title: 'Torque AI',
    subtitle: 'AI for Parts & Service under Scrum',
    icon: '🤖',
    difficulty: 'Expert',
    difficultyColor: '#dc2626',
    description: 'Product Owner of the dealership IT squad. Build an AI assistant for parts pricing, TCO and service intelligence — AI estimates are wildly uncertain, and you cannot build it all.',
    company: 'Groupe TransBoréal',
    projectName: 'AI Parts & Service Assistant',
    deliverable: 'backlog items',
    pedagogicalFocus: 'agile-scrum',
    hasPrototyping: false,
    hasUncertainty: true,
    framework: 'scrum',
    initial: {
      budget: 680000,
      weeks: 12,
      scope: 14,
      sprintLength: 2,
      teamSize: 5,
      quality: 85,
      morale: 75,
      stress: 25,
      knowledge: 30
    },
    weeklyCostPerPerson: 9000,
    sprints: 6,
    valueTarget: 520, // playtest-tuned: strong play delivers ~570
    backlog: [
      { id: 'data_pipeline',  name: 'Parts & service data pipeline',      nameFr: 'Pipeline de données pièces et service', nameEs: 'Pipeline de datos de repuestos y servicio', nameVi: 'Đường ống dữ liệu phụ tùng & dịch vụ',    points: 8, value: 100, uncertainty: 0.2,  must: true },
      { id: 'tco_calc',       name: 'Truck TCO calculator',               nameFr: 'Calculateur TCO camion', nameEs: 'Calculadora de TCO de camiones', nameVi: 'Máy tính TCO xe tải',                   points: 5, value: 80,  uncertainty: 0.2 },
      { id: 'price_reco',     name: 'AI parts-pricing recommendations',   nameFr: 'Recommandations IA de prix des pièces', nameEs: 'Recomendaciones de precios de repuestos con IA', nameVi: 'Khuyến nghị giá phụ tùng bằng AI',    points: 5, value: 75,  uncertainty: 0.45 },
      { id: 'warranty_ai',    name: 'Warranty-claim assistant',           nameFr: 'Assistant réclamations de garantie', nameEs: 'Asistente de reclamos de garantía', nameVi: 'Trợ lý yêu cầu bảo hành',       points: 5, value: 65,  uncertainty: 0.35 },
      { id: 'maint_predict',  name: 'Predictive maintenance alerts',      nameFr: 'Alertes de maintenance prédictive', nameEs: 'Alertas de mantenimiento predictivo', nameVi: 'Cảnh báo bảo trì dự đoán',        points: 8, value: 60,  uncertainty: 0.45 },
      { id: 'dms_integration', name: 'DMS integration',                   nameFr: 'Intégration au DMS', nameEs: 'Integración con el DMS', nameVi: 'Tích hợp DMS',                       points: 5, value: 55,  uncertainty: 0.25 },
      { id: 'quote_bot',      name: 'Service-quote chatbot',              nameFr: 'Robot de soumission service', nameEs: 'Chatbot de cotizaciones de servicio', nameVi: 'Chatbot báo giá dịch vụ',              points: 5, value: 50,  uncertainty: 0.3 },
      { id: 'guardrails',     name: 'AI guardrails & governance',         nameFr: 'Garde-fous et gouvernance IA', nameEs: 'Salvaguardas y gobernanza de IA', nameVi: 'Rào chắn & quản trị AI',             points: 3, value: 48,  uncertainty: 0.15, must: true },
      { id: 'margin_dash',    name: 'Parts margin dashboards',            nameFr: 'Tableaux de bord marge pièces', nameEs: 'Tableros de márgenes de repuestos', nameVi: 'Bảng biên lợi nhuận phụ tùng',            points: 3, value: 45,  uncertainty: 0.15 },
      { id: 'doc_ocr',        name: 'Invoice & PO OCR',                   nameFr: 'OCR factures et bons de commande', nameEs: 'OCR de facturas y órdenes de compra', nameVi: 'OCR hóa đơn & đơn đặt hàng',         points: 3, value: 35,  uncertainty: 0.2 },
      { id: 'fleet_report',   name: 'Fleet client reports',               nameFr: 'Rapports clients de flotte', nameEs: 'Reportes para clientes de flota', nameVi: 'Báo cáo khách đội xe',               points: 3, value: 30,  uncertainty: 0.2 },
      { id: 'staff_training', name: 'Staff AI training program',          nameFr: 'Programme de formation IA du personnel', nameEs: 'Programa de capacitación en IA', nameVi: 'Chương trình đào tạo AI cho nhân viên',   points: 2, value: 28,  uncertainty: 0.1 },
      { id: 'tech_kb',        name: 'Mechanic knowledge base (RAG)',      nameFr: 'Base de connaissances mécaniciens (RAG)', nameEs: 'Base de conocimiento para mecánicos (RAG)', nameVi: 'Kho tri thức thợ máy (RAG)',  points: 3, value: 22,  uncertainty: 0.3 },
      { id: 'telemetry',      name: 'Telemetry vanity dashboard',         nameFr: 'Tableau de télémétrie (vitrine)', nameEs: 'Tablero de telemetría de vanidad', nameVi: 'Bảng telemetry phù phiếm',          points: 2, value: 10,  uncertainty: 0.1 }
    ],
    pivot: {
      sprint: 3,
      title: 'Profitability Mandate',
      titleFr: 'Mandat de rentabilité', titleEs: 'Mandato de rentabilidad', titleVi: 'Mệnh lệnh lợi nhuận',
      description: 'After the Sprint 3 demo, administration hands your VP a mandate: improve parts-selling profitability THIS quarter. Pricing AI is now critical (value 75\u219295), predictive maintenance can wait (60\u219235), and they want a parts margin-allocation model. How do you respond?',
      descriptionFr: 'Après la démo du sprint 3, l\u2019administration remet un mandat à votre VP : améliorer la rentabilité de la vente de pièces CE trimestre. L\u2019IA de prix devient critique (valeur 75\u219295), la maintenance prédictive peut attendre (60\u219235), et ils veulent un modèle d\u2019allocation des marges pièces. Comment répondez-vous ?', descriptionEs: 'Tras la demo del Sprint 3, la administración entrega un mandato a tu VP: mejorar la rentabilidad de venta de repuestos ESTE trimestre. La IA de precios ahora es crítica (valor 75→95), el mantenimiento predictivo puede esperar (60→35), y quieren un modelo de asignación de márgenes de repuestos. ¿Cómo respondes?', descriptionVi: 'Sau demo Sprint 3, ban điều hành trao cho VP của bạn một mệnh lệnh: cải thiện lợi nhuận bán phụ tùng NGAY quý này. AI định giá giờ là tối quan trọng (giá trị 75→95), bảo trì dự đoán có thể chờ (60→35), và họ muốn một mô hình phân bổ biên lợi nhuận phụ tùng. Bạn phản ứng thế nào?',
      changes: [{ id: 'price_reco', value: 95 }, { id: 'maint_predict', value: 35 }],
      retire: 'telemetry',
      newItem: { id: 'margin_alloc', name: 'Parts margin-allocation model', nameFr: 'Modèle d\u2019allocation des marges pièces', nameEs: 'Modelo de asignación de márgenes de repuestos', nameVi: 'Mô hình phân bổ biên lợi nhuận phụ tùng', points: 5, value: 85, uncertainty: 0.3, rank: 2.5 }
    },
    ceremonies: ['sprint_planning', 'standup', 'sprint_review', 'retrospective', 'refine_backlog'],
    scoringStrategy: 'scrum'
  },

  // SCRUM #2 — customer-facing software MVP (Advanced)
  fastlane_scrum: {
    id: 'fastlane_scrum',
    category: 'trucks_smr',
    title: 'FastLane',
    subtitle: 'Customer Service Portal under Scrum',
    icon: '🔧',
    difficulty: 'Advanced',
    difficultyColor: '#f59e0b',
    description: 'Product Owner for the dealership\u2019s customer portal: online service booking, repair tracking, fleet tools. Ship the most valuable portal by the launch date — you cannot build it all.',
    company: 'Groupe TransBoréal',
    projectName: 'Service & Fleet Customer Portal',
    deliverable: 'backlog items',
    pedagogicalFocus: 'agile-scrum',
    hasPrototyping: false,
    hasUncertainty: true,
    framework: 'scrum',
    initial: {
      budget: 610000,
      weeks: 12,
      scope: 14,
      sprintLength: 2,
      teamSize: 5,
      quality: 85,
      morale: 78,
      stress: 20,
      knowledge: 38
    },
    weeklyCostPerPerson: 8000,
    sprints: 6,
    valueTarget: 560, // playtest-tuned: strong play delivers ~625
    backlog: [
      { id: 'booking',       name: 'Online service booking',        nameFr: 'Prise de rendez-vous service en ligne', nameEs: 'Reserva de servicio en línea', nameVi: 'Đặt lịch dịch vụ trực tuyến',   points: 8, value: 100, uncertainty: 0.15, must: true },
      { id: 'status_track',  name: 'Live repair status tracking',   nameFr: 'Suivi en direct des réparations', nameEs: 'Seguimiento de reparación en vivo', nameVi: 'Theo dõi sửa chữa trực tiếp',         points: 5, value: 80,  uncertainty: 0.2 },
      { id: 'quote_approve', name: 'Digital quote approval',        nameFr: 'Approbation numérique des soumissions', nameEs: 'Aprobación digital de cotizaciones', nameVi: 'Duyệt báo giá số',   points: 5, value: 70,  uncertainty: 0.2, must: true },
      { id: 'parts_lookup',  name: 'Parts availability lookup',     nameFr: 'Consultation de disponibilité des pièces', nameEs: 'Consulta de disponibilidad de repuestos', nameVi: 'Tra cứu phụ tùng sẵn có', points: 5, value: 62,  uncertainty: 0.25 },
      { id: 'fleet_portal',  name: 'Fleet manager portal',          nameFr: 'Portail gestionnaire de flotte', nameEs: 'Portal de gerentes de flota', nameVi: 'Cổng quản lý đội xe',          points: 8, value: 60,  uncertainty: 0.3 },
      { id: 'invoice_pay',   name: 'Online invoice payment',        nameFr: 'Paiement de factures en ligne', nameEs: 'Pago de facturas en línea', nameVi: 'Thanh toán hóa đơn trực tuyến',           points: 5, value: 55,  uncertainty: 0.2 },
      { id: 'reminders',     name: 'Maintenance reminders',         nameFr: 'Rappels d\u2019entretien', nameEs: 'Recordatorios de mantenimiento', nameVi: 'Nhắc lịch bảo dưỡng',               points: 3, value: 45,  uncertainty: 0.1 },
      { id: 'sms_notif',     name: 'SMS notifications',             nameFr: 'Notifications SMS', nameEs: 'Notificaciones por SMS', nameVi: 'Thông báo SMS',                       points: 3, value: 40,  uncertainty: 0.15 },
      { id: 'loaner',        name: 'Loaner truck reservation',      nameFr: 'Réservation de camion de courtoisie', nameEs: 'Reserva de camión de préstamo', nameVi: 'Đặt xe tải mượn tạm',     points: 3, value: 35,  uncertainty: 0.2 },
      { id: 'profiles',      name: 'Customer profiles',             nameFr: 'Profils clients', nameEs: 'Perfiles de clientes', nameVi: 'Hồ sơ khách hàng',                         points: 3, value: 30,  uncertainty: 0.15 },
      { id: 'chat',          name: 'Live chat with service desk',   nameFr: 'Clavardage avec le service', nameEs: 'Chat en vivo con servicio', nameVi: 'Chat trực tiếp với bộ phận dịch vụ',              points: 3, value: 28,  uncertainty: 0.25 },
      { id: 'reviews',       name: 'Reviews & ratings',             nameFr: 'Avis et évaluations', nameEs: 'Reseñas y calificaciones', nameVi: 'Đánh giá & xếp hạng',                     points: 2, value: 20,  uncertainty: 0.1 },
      { id: 'kiosk',         name: 'Drive-in kiosk mode',           nameFr: 'Mode borne à l\u2019accueil', nameEs: 'Modo kiosco drive-in', nameVi: 'Chế độ kiosk tại chỗ',            points: 3, value: 18,  uncertainty: 0.25 },
      { id: 'darkmode',      name: 'Dark-mode UI',                  nameFr: 'Interface mode sombre', nameEs: 'Interfaz en modo oscuro', nameVi: 'Giao diện chế độ tối',                   points: 2, value: 8,   uncertainty: 0.1 }
    ],
    pivot: {
      sprint: 3,
      title: 'Fleet Account Ultimatum',
      titleFr: 'Ultimatum du compte de flotte', titleEs: 'Ultimátum de la cuenta de flota', titleVi: 'Tối hậu thư của khách đội xe',
      description: 'Your largest fleet customer — 85 trucks — threatens to move their maintenance contracts to a competitor with better fleet tooling. The fleet portal jumps in value (60\u219295), the kiosk can wait, and they demand an SLA dashboard. How do you respond?',
      descriptionFr: 'Votre plus gros client de flotte — 85 camions — menace de transférer ses contrats d\u2019entretien chez un concurrent mieux outillé. Le portail de flotte bondit en valeur (60\u219295), la borne peut attendre, et ils exigent un tableau de bord SLA. Comment répondez-vous ?', descriptionEs: 'Tu mayor cliente de flota — 85 camiones — amenaza con mover sus contratos de mantenimiento a un competidor con mejores herramientas de flota. El portal de flota salta en valor (60→95), el kiosco puede esperar, y exigen un tablero de SLA. ¿Cómo respondes?', descriptionVi: 'Khách đội xe lớn nhất của bạn — 85 xe tải — dọa chuyển hợp đồng bảo dưỡng sang đối thủ có công cụ đội xe tốt hơn. Cổng đội xe vọt giá trị (60→95), kiosk có thể chờ, và họ đòi một bảng SLA. Bạn phản ứng thế nào?',
      changes: [{ id: 'fleet_portal', value: 95 }, { id: 'kiosk', value: 8 }],
      retire: 'reviews',
      newItem: { id: 'fleet_sla', name: 'Fleet SLA dashboard', nameFr: 'Tableau de bord SLA flotte', nameEs: 'Tablero de SLA de flota', nameVi: 'Bảng SLA đội xe', points: 5, value: 85, uncertainty: 0.25, rank: 3.5 }
    },
    ceremonies: ['sprint_planning', 'standup', 'sprint_review', 'retrospective', 'refine_backlog'],
    scoringStrategy: 'scrum'
  },

  // ============================================
  // LIBRARY EXPANSION — 3+ scenarios per industry
  // ============================================

  // APEX #2 — clinical trial (Expert, prototyping = pilot cohort)
  apex_biotech: {
    id: 'apex_biotech',
    category: 'apex',
    title: 'Helix Trial',
    subtitle: 'Phase II Clinical Trial',
    icon: '🧬',
    difficulty: 'Expert',
    difficultyColor: '#dc2626',
    description: 'Program lead at BioNova Therapeutics. Run a Phase II trial for a novel therapy — patient enrollment, regulators and trial science all carry deep uncertainty.',
    company: 'BioNova Therapeutics',
    projectName: 'BNT-204 Phase II Trial',
    deliverable: 'milestones',
    pedagogicalFocus: 'risk',
    hasPrototyping: true, // pilot cohort / dry-run site
    hasUncertainty: true,
    initial: { budget: 1250000, weeks: 14, scope: 10, teamSize: 8, quality: 80, morale: 80, stress: 30, knowledge: 25 },
    weeklyCostPerPerson: 9500,
    causalEvents: [
      {
        id: 'enrollment_shortfall',
        title: 'Enrollment Shortfall',
        description: 'Patient recruitment is 40% behind plan. A pilot cohort would have exposed the eligibility-criteria problem earlier.',
        titleFr: 'Déficit de recrutement', titleEs: 'Déficit de reclutamiento', titleVi: 'Thiếu hụt tuyển bệnh nhân',
        descriptionFr: 'Le recrutement de patients accuse 40 % de retard sur le plan. Une cohorte pilote aurait exposé le problème de critères d\'admissibilité plus tôt.', descriptionEs: 'El reclutamiento de pacientes va 40% detrás del plan. Una cohorte piloto habría expuesto antes el problema de criterios de elegibilidad.', descriptionVi: 'Tuyển bệnh nhân chậm 40% so với kế hoạch. Một nhóm thí điểm đã có thể phơi bày sớm vấn đề tiêu chí tuyển chọn.',
        icon: '🏥',
        triggerCondition: (state) => state.week >= 5,
        prototypeModifier: true,
        options: [
          { id: 'add_sites', label: 'Open two more trial sites (expensive, effective)', labelFr: 'Ouvrir deux centres d\'essai de plus (coûteux, efficace)', labelEs: 'Abrir dos centros de ensayo más (caro, efectivo)', labelVi: 'Mở thêm hai điểm nghiên cứu (đắt, hiệu quả)', effects: { budget: -120000, schedule: -1, knowledge: 8 } },
          { id: 'relax_criteria', label: 'Amend eligibility criteria (regulatory review)', labelFr: 'Modifier les critères d\'admissibilité (révision réglementaire)', labelEs: 'Enmendar criterios de elegibilidad (revisión regulatoria)', labelVi: 'Sửa tiêu chí tuyển chọn (rà soát quy định)', effects: { schedule: -2, quality: -5, stress: 8 } },
          { id: 'push_on', label: 'Continue with smaller cohort (statistical risk)', labelFr: 'Continuer avec une cohorte réduite (risque statistique)', labelEs: 'Continuar con una cohorte menor (riesgo estadístico)', labelVi: 'Tiếp tục với nhóm nhỏ hơn (rủi ro thống kê)', effects: { quality: -12, stress: 10 } }
        ]
      },
      {
        id: 'adverse_event',
        title: 'Serious Adverse Event Report',
        description: 'A participant reports a serious adverse event. Likely unrelated to the therapy — but the protocol and the team\u2019s stress level will decide how this lands.',
        titleFr: 'Rapport d\'événement indésirable grave', titleEs: 'Reporte de evento adverso grave', titleVi: 'Báo cáo biến cố bất lợi nghiêm trọng',
        descriptionFr: 'Un participant signale un événement indésirable grave. Probablement sans lien avec la thérapie — mais le protocole et le niveau de stress de l\'équipe décideront de l\'issue.', descriptionEs: 'Un participante reporta un evento adverso grave. Probablemente no relacionado con la terapia — pero el protocolo y el nivel de estrés del equipo decidirán cómo termina.', descriptionVi: 'Một người tham gia báo cáo biến cố bất lợi nghiêm trọng. Nhiều khả năng không liên quan đến liệu pháp — nhưng đề cương và mức căng thẳng của đội sẽ quyết định kết cục.',
        icon: '⚠️',
        triggerCondition: (state) => state.week >= 6 && state.team.stress > 45,
        options: [
          { id: 'full_review', label: 'Pause dosing, full safety review (+trust)', labelFr: 'Suspendre le dosage, revue de sécurité complète (+confiance)', labelEs: 'Pausar la dosificación, revisión de seguridad completa (+confianza)', labelVi: 'Tạm dừng cấp liều, rà soát an toàn toàn diện (+niềm tin)', effects: { schedule: -2, budget: -60000, quality: 12, morale: 8, stress: -10 } },
          { id: 'targeted', label: 'Targeted causality assessment', labelFr: 'Évaluation de causalité ciblée', labelEs: 'Evaluación de causalidad focalizada', labelVi: 'Đánh giá quan hệ nhân quả có trọng điểm', effects: { budget: -25000, quality: 4, stress: 5 } },
          { id: 'report_only', label: 'Report and continue (risky)', labelFr: 'Signaler et continuer (risqué)', labelEs: 'Reportar y continuar (riesgoso)', labelVi: 'Báo cáo rồi tiếp tục (rủi ro)', effects: { quality: -10, morale: -8, stress: 12 } }
        ]
      },
      {
        id: 'regulator_query',
        title: 'Regulator Information Request',
        description: 'The regulator requests additional stability data mid-trial. How you respond shapes the approval path.',
        titleFr: 'Demande d\'information du régulateur', titleEs: 'Solicitud de información del regulador', titleVi: 'Cơ quan quản lý yêu cầu thông tin',
        descriptionFr: 'Le régulateur demande des données de stabilité supplémentaires en cours d\'essai. Votre réponse façonne le chemin d\'approbation.', descriptionEs: 'El regulador solicita datos de estabilidad adicionales a mitad del ensayo. Tu respuesta define el camino de aprobación.', descriptionVi: 'Cơ quan quản lý yêu cầu thêm dữ liệu ổn định giữa kỳ thử nghiệm. Cách bạn phản hồi định hình con đường phê duyệt.',
        icon: '📋',
        triggerCondition: (state) => state.week >= 8,
        options: [
          { id: 'full_package', label: 'Compile the full data package now', labelFr: 'Compiler le dossier de données complet maintenant', labelEs: 'Compilar el paquete de datos completo ahora', labelVi: 'Tổng hợp trọn bộ dữ liệu ngay', effects: { budget: -45000, schedule: -1, quality: 8, knowledge: 8 } },
          { id: 'minimum', label: 'Answer the minimum asked', labelFr: 'Répondre au minimum demandé', labelEs: 'Responder lo mínimo solicitado', labelVi: 'Trả lời mức tối thiểu được hỏi', effects: { budget: -15000, stress: 5 } },
          { id: 'negotiate_timeline', label: 'Negotiate a post-trial submission', labelFr: 'Négocier une soumission post-essai', labelEs: 'Negociar una entrega post-ensayo', labelVi: 'Thương lượng nộp sau thử nghiệm', effects: { quality: -5, stress: -3 } }
        ]
      }
    ]
  },

  // ENTERTAINMENT #2 — onboarding-level event production
  festival_borealis: {
    id: 'festival_borealis',
    category: 'entertainment',
    title: 'Festival Borealis',
    subtitle: 'Three-Day Music Festival',
    icon: '🎶',
    difficulty: 'Standard',
    difficultyColor: '#3b82f6',
    description: 'Festival director at Borealis Events. Deliver a three-day outdoor music festival — headliners, permits, vendors and 40,000 ticket holders.',
    company: 'Borealis Events',
    projectName: 'Festival Borealis',
    deliverable: 'program elements',
    pedagogicalFocus: 'mechanics',
    hasPrototyping: false,
    hasUncertainty: false,
    initial: { budget: 780000, weeks: 12, scope: 10, teamSize: 12, quality: 85, morale: 78, stress: 20, knowledge: 40 },
    weeklyCostPerPerson: 4500,
    causalEvents: [
      {
        id: 'headliner_cancel',
        title: 'Headliner Cancels',
        description: 'Your Saturday headliner pulls out for a stadium tour. Ticket holders are watching your next move.',
        titleFr: 'Annulation de la tête d\'affiche', titleEs: 'Cancela el cabeza de cartel', titleVi: 'Nghệ sĩ đinh hủy diễn',
        descriptionFr: 'Votre tête d\'affiche du samedi se désiste pour une tournée de stades. Les détenteurs de billets guettent votre prochain geste.', descriptionEs: 'Tu cabeza de cartel del sábado se retira por una gira de estadios. Los compradores de boletos observan tu próximo movimiento.', descriptionVi: 'Nghệ sĩ đinh đêm thứ Bảy rút lui để đi tour sân vận động. Khán giả đã mua vé đang dõi theo nước đi tiếp theo của bạn.',
        icon: '🎤',
        triggerCondition: (state) => state.week >= 5,
        options: [
          { id: 'bigger_name', label: 'Chase a bigger replacement (expensive)', labelFr: 'Courtiser un remplaçant plus gros (coûteux)', labelEs: 'Buscar un reemplazo más grande (caro)', labelVi: 'Săn nghệ sĩ thay thế lớn hơn (đắt đỏ)', effects: { budget: -90000, morale: 8, quality: 8 } },
          { id: 'local_double', label: 'Promote two rising local acts', labelFr: 'Promouvoir deux artistes locaux montants', labelEs: 'Promover dos actos locales en ascenso', labelVi: 'Đôn hai nghệ sĩ địa phương đang lên', effects: { budget: -20000, quality: -3, morale: 3 } },
          { id: 'refund_tier', label: 'Offer partial refunds on Saturday passes', labelFr: 'Offrir des remboursements partiels pour les passes du samedi', labelEs: 'Ofrecer reembolsos parciales en pases del sábado', labelVi: 'Hoàn một phần tiền vé thứ Bảy', effects: { budget: -50000, quality: -5, stress: -5 } }
        ]
      },
      {
        id: 'noise_permit',
        title: 'Noise Permit Challenge',
        description: 'Residents petition the city over the 11pm curfew. The permit hearing is next week.',
        titleFr: 'Contestation du permis de bruit', titleEs: 'Impugnación del permiso de ruido', titleVi: 'Khiếu nại giấy phép tiếng ồn',
        descriptionFr: 'Des résidents pétitionnent la ville au sujet du couvre-feu de 23 h. L\'audience du permis est la semaine prochaine.', descriptionEs: 'Los vecinos presentan una petición a la ciudad por el toque de queda de las 11pm. La audiencia del permiso es la próxima semana.', descriptionVi: 'Cư dân kiến nghị lên thành phố về giờ giới nghiêm 23h. Phiên điều trần giấy phép diễn ra tuần tới.',
        icon: '🏛️',
        triggerCondition: (state) => state.week >= 4,
        options: [
          { id: 'community_deal', label: 'Community deal: free local tickets + 10:30 curfew', labelFr: 'Entente communautaire : billets locaux gratuits + couvre-feu 22 h 30', labelEs: 'Acuerdo comunitario: boletos locales gratis + toque de queda 10:30', labelVi: 'Thỏa thuận cộng đồng: vé miễn phí cho dân địa phương + giới nghiêm 22h30', effects: { budget: -15000, quality: -3, morale: 5, stress: -5 } },
          { id: 'lawyers', label: 'Fight it with lawyers', labelFr: 'Se battre avec des avocats', labelEs: 'Pelearlo con abogados', labelVi: 'Đấu bằng luật sư', effects: { budget: -40000, stress: 10 } },
          { id: 'relocate_stage', label: 'Re-orient the main stage away from town', labelFr: 'Réorienter la scène principale loin de la ville', labelEs: 'Reorientar el escenario principal lejos del pueblo', labelVi: 'Xoay sân khấu chính ra xa khu dân cư', effects: { budget: -30000, schedule: -1, knowledge: 5 } }
        ]
      },
      {
        id: 'sponsor_pullout',
        title: 'Title Sponsor Wobbles',
        description: 'Your title sponsor\u2019s new CMO questions the deal. Sustained team stress has made sponsor reporting sloppy.',
        titleFr: 'Le commanditaire principal vacille', titleEs: 'El patrocinador principal titubea', titleVi: 'Nhà tài trợ chính lung lay',
        descriptionFr: 'Le nouveau chef marketing de votre commanditaire principal remet l\'entente en question. Le stress soutenu de l\'équipe a rendu les rapports aux commanditaires négligés.', descriptionEs: 'El nuevo CMO de tu patrocinador principal cuestiona el acuerdo. El estrés sostenido del equipo volvió descuidados los reportes al patrocinador.', descriptionVi: 'CMO mới của nhà tài trợ chính nghi ngờ thỏa thuận. Căng thẳng kéo dài khiến báo cáo cho nhà tài trợ trở nên cẩu thả.',
        icon: '🤝',
        triggerCondition: (state) => state.week >= 6 && state.team.stress > 40,
        options: [
          { id: 'vip_program', label: 'Build them a VIP activation program', labelFr: 'Leur bâtir un programme d\'activation VIP', labelEs: 'Construirles un programa de activación VIP', labelVi: 'Xây cho họ chương trình kích hoạt VIP', effects: { budget: -35000, quality: 5, morale: 3 } },
          { id: 'renegotiate', label: 'Renegotiate at a lower tier', labelFr: 'Renégocier à un palier inférieur', labelEs: 'Renegociar en un nivel más bajo', labelVi: 'Đàm phán lại ở mức thấp hơn', effects: { budget: -60000, stress: 5 } },
          { id: 'replace', label: 'Shop for a replacement sponsor (risky)', labelFr: 'Magasiner un commanditaire de remplacement (risqué)', labelEs: 'Buscar un patrocinador de reemplazo (riesgoso)', labelVi: 'Đi tìm nhà tài trợ thay thế (rủi ro)', effects: { stress: 12, morale: -5 } }
        ]
      }
    ]
  },

  // CONSTRUCTION #2 — onboarding-level multi-site program
  fitout_chain: {
    id: 'fitout_chain',
    category: 'construction',
    title: 'Retail Fit-Out',
    subtitle: 'Eight-Store Renovation Program',
    icon: '🏬',
    difficulty: 'Standard',
    difficultyColor: '#3b82f6',
    description: 'Program manager at UrbanCore Interiors. Renovate eight retail stores for a national chain — same design, eight different buildings, one hard reopening calendar.',
    company: 'UrbanCore Interiors',
    projectName: 'Chain Refresh Program',
    deliverable: 'stores',
    pedagogicalFocus: 'mechanics',
    hasPrototyping: false,
    hasUncertainty: false,
    initial: { budget: 990000, weeks: 12, scope: 8, teamSize: 14, quality: 85, morale: 74, stress: 22, knowledge: 45 },
    weeklyCostPerPerson: 5000,
    causalEvents: [
      {
        id: 'asbestos_find',
        title: 'Asbestos in Store #3',
        description: 'Demolition crew finds asbestos tiles in the oldest location. Work stops there until you decide.',
        titleFr: 'Amiante au magasin no 3', titleEs: 'Asbesto en la tienda #3', titleVi: 'Amiăng ở cửa hàng số 3',
        descriptionFr: 'L\'équipe de démolition trouve des tuiles d\'amiante dans le plus vieux local. Les travaux y sont arrêtés jusqu\'à votre décision.', descriptionEs: 'La cuadrilla de demolición encuentra losetas de asbesto en el local más antiguo. El trabajo se detiene allí hasta que decidas.', descriptionVi: 'Đội tháo dỡ phát hiện gạch amiăng ở địa điểm cũ nhất. Công việc tại đó dừng lại cho đến khi bạn quyết định.',
        icon: '☣️',
        triggerCondition: (state) => state.week >= 4,
        options: [
          { id: 'full_abatement', label: 'Certified abatement (safe, slow)', labelFr: 'Désamiantage certifié (sûr, lent)', labelEs: 'Remoción certificada (segura, lenta)', labelVi: 'Xử lý amiăng có chứng nhận (an toàn, chậm)', effects: { budget: -70000, schedule: -1, quality: 8, morale: 5 } },
          { id: 'reseal', label: 'Encapsulate and reseal (code-minimal)', labelFr: 'Encapsuler et resceller (conforme au minimum)', labelEs: 'Encapsular y resellar (mínimo de código)', labelVi: 'Bọc kín và niêm phong lại (tối thiểu theo quy chuẩn)', effects: { budget: -20000, quality: -5, stress: 8 } },
          { id: 'resequence', label: 'Push store #3 last, resequence crews', labelFr: 'Repousser le magasin no 3 en dernier, reséquencer les équipes', labelEs: 'Dejar la tienda #3 al final, resecuenciar cuadrillas', labelVi: 'Đẩy cửa hàng số 3 xuống cuối, xếp lại lịch đội thợ', effects: { schedule: -1, knowledge: 8, stress: 5 } }
        ]
      },
      {
        id: 'tenant_conflict',
        title: 'Landlord Access Dispute',
        description: 'Two mall landlords restrict night work hours. Crews are idling and frustrated.',
        titleFr: 'Conflit d\'accès avec les propriétaires', titleEs: 'Disputa de acceso con arrendadores', titleVi: 'Tranh chấp quyền ra vào với chủ nhà',
        descriptionFr: 'Deux propriétaires de centres commerciaux restreignent les heures de travail de nuit. Les équipes tournent au ralenti et s\'impatientent.', descriptionEs: 'Dos arrendadores de centros comerciales restringen las horas de trabajo nocturno. Las cuadrillas están ociosas y frustradas.', descriptionVi: 'Hai chủ trung tâm thương mại hạn chế giờ làm đêm. Các đội thợ ngồi chơi và bực bội.',
        icon: '🔑',
        triggerCondition: (state) => state.week >= 5 && state.team.morale < 72,
        options: [
          { id: 'negotiate_access', label: 'Negotiate weekend access packages', labelFr: 'Négocier des accès de fin de semaine', labelEs: 'Negociar paquetes de acceso de fin de semana', labelVi: 'Thương lượng gói làm việc cuối tuần', effects: { budget: -25000, morale: 6, stress: -4 } },
          { id: 'day_work', label: 'Shift to day work behind hoarding', labelFr: 'Passer au travail de jour derrière palissade', labelEs: 'Pasar a trabajo diurno tras vallado', labelVi: 'Chuyển sang làm ban ngày sau vách quây', effects: { quality: -4, budget: -15000 } },
          { id: 'escalate_client', label: 'Escalate through the chain\u2019s lease team', labelFr: 'Escalader via l\'équipe des baux de la chaîne', labelEs: 'Escalar por el equipo de arrendamientos de la cadena', labelVi: 'Chuyển lên đội hợp đồng thuê của chuỗi', effects: { schedule: -1, stress: 5, knowledge: 5 } }
        ]
      },
      {
        id: 'fixture_delay',
        title: 'Custom Fixtures Stuck in Transit',
        description: 'The signature display fixtures for three stores are delayed five weeks at the port.',
        titleFr: 'Mobilier sur mesure bloqué en transit', titleEs: 'Mobiliario a medida atascado en tránsito', titleVi: 'Nội thất đặt riêng kẹt trên đường',
        descriptionFr: 'Les présentoirs signature de trois magasins sont retardés de cinq semaines au port.', descriptionEs: 'Los exhibidores distintivos de tres tiendas están retrasados cinco semanas en el puerto.', descriptionVi: 'Kệ trưng bày đặc trưng của ba cửa hàng bị kẹt năm tuần ở cảng.',
        icon: '🚢',
        triggerCondition: (state) => state.week >= 6,
        options: [
          { id: 'air_freight', label: 'Air-freight a partial order', labelFr: 'Expédier une commande partielle par avion', labelEs: 'Enviar un pedido parcial por avión', labelVi: 'Chuyển một phần đơn hàng bằng đường hàng không', effects: { budget: -55000 } },
          { id: 'local_fab', label: 'Fabricate substitutes locally', labelFr: 'Fabriquer des substituts localement', labelEs: 'Fabricar sustitutos localmente', labelVi: 'Gia công hàng thay thế tại chỗ', effects: { budget: -35000, quality: -4, knowledge: 6 } },
          { id: 'open_without', label: 'Open with temporary displays', labelFr: 'Ouvrir avec des présentoirs temporaires', labelEs: 'Abrir con exhibidores temporales', labelVi: 'Khai trương với kệ trưng bày tạm', effects: { quality: -8, morale: -5 } }
        ]
      }
    ]
  },

  // IT #2 — datacenter-to-cloud migration (Advanced, prototyping = pilot workloads)
  datacenter_exit: {
    id: 'datacenter_exit',
    category: 'it',
    title: 'Exit Velocity',
    subtitle: 'Datacenter-to-Cloud Migration',
    icon: '🖧',
    difficulty: 'Advanced',
    difficultyColor: '#f59e0b',
    description: 'Migration lead at Meridian Group. Move 40 production workloads out of a datacenter whose lease ends in 14 weeks — pilot waves are your best insurance.',
    company: 'Meridian Group',
    projectName: 'Datacenter Exit Program',
    deliverable: 'migration waves',
    pedagogicalFocus: 'risk',
    hasPrototyping: true, // pilot workload waves
    hasUncertainty: true,
    initial: { budget: 1080000, weeks: 14, scope: 12, teamSize: 8, quality: 85, morale: 74, stress: 28, knowledge: 35 },
    weeklyCostPerPerson: 8000,
    causalEvents: [
      {
        id: 'legacy_dependency',
        title: 'Undocumented Dependency Web',
        description: 'The ERP talks to nine systems nobody documented. A pilot wave would have mapped this earlier.',
        titleFr: 'Toile de dépendances non documentées', titleEs: 'Red de dependencias sin documentar', titleVi: 'Mạng phụ thuộc không tài liệu',
        descriptionFr: 'L\'ERP communique avec neuf systèmes que personne n\'a documentés. Une vague pilote l\'aurait cartographié plus tôt.', descriptionEs: 'El ERP se comunica con nueve sistemas que nadie documentó. Una oleada piloto lo habría mapeado antes.', descriptionVi: 'ERP kết nối với chín hệ thống không ai ghi chép. Một đợt thí điểm đã có thể lập bản đồ sớm hơn.',
        icon: '🕸️',
        triggerCondition: (state) => state.week >= 5,
        prototypeModifier: true,
        options: [
          { id: 'dependency_map', label: 'Full discovery sprint before next wave', labelFr: 'Sprint de découverte complet avant la prochaine vague', labelEs: 'Sprint de descubrimiento completo antes de la próxima oleada', labelVi: 'Sprint khảo sát đầy đủ trước đợt tiếp theo', effects: { schedule: -2, budget: -60000, knowledge: 15, quality: 8 } },
          { id: 'lift_shift', label: 'Lift-and-shift the whole cluster together', labelFr: 'Migrer tout le groupe d\'un bloc (lift-and-shift)', labelEs: 'Migrar todo el clúster junto (lift-and-shift)', labelVi: 'Bê nguyên cả cụm sang (lift-and-shift)', effects: { budget: -90000, quality: -5 } },
          { id: 'wing_it', label: 'Migrate and fix what breaks (risky)', labelFr: 'Migrer et réparer ce qui casse (risqué)', labelEs: 'Migrar y arreglar lo que se rompa (riesgoso)', labelVi: 'Cứ di trú rồi sửa chỗ hỏng (rủi ro)', effects: { quality: -12, stress: 15 } }
        ]
      },
      {
        id: 'cloud_bill_shock',
        title: 'Cloud Bill Shock',
        description: 'The first month\u2019s cloud bill is 2.4x the estimate — oversized instances and forgotten test environments.',
        titleFr: 'Choc de la facture infonuagique', titleEs: 'Shock de la factura de nube', titleVi: 'Sốc hóa đơn đám mây',
        descriptionFr: 'La première facture infonuagique est 2,4 fois l\'estimation — instances surdimensionnées et environnements de test oubliés.', descriptionEs: 'La primera factura de nube es 2.4 veces la estimación — instancias sobredimensionadas y entornos de prueba olvidados.', descriptionVi: 'Hóa đơn đám mây tháng đầu gấp 2,4 lần ước tính — máy chủ quá cỡ và môi trường thử nghiệm bị bỏ quên.',
        icon: '💸',
        triggerCondition: (state) => state.week >= 6,
        options: [
          { id: 'finops', label: 'Stand up FinOps guardrails (+knowledge)', labelFr: 'Mettre en place des garde-fous FinOps (+connaissances)', labelEs: 'Montar salvaguardas FinOps (+conocimiento)', labelVi: 'Dựng rào chắn FinOps (+kiến thức)', effects: { budget: -30000, knowledge: 10, quality: 5 } },
          { id: 'rightsize', label: 'Emergency right-sizing pass', labelFr: 'Passe d\'ajustement d\'urgence des ressources', labelEs: 'Pase de redimensionamiento de emergencia', labelVi: 'Đợt tinh chỉnh tài nguyên khẩn cấp', effects: { budget: -15000, stress: 8 } },
          { id: 'absorb', label: 'Absorb it — optimize after cutover', labelFr: 'Absorber — optimiser après la bascule', labelEs: 'Absorberlo — optimizar después del cutover', labelVi: 'Hấp thụ — tối ưu sau chuyển đổi', effects: { budget: -80000 } }
        ]
      },
      {
        id: 'outage_scare',
        title: 'Mid-Migration Outage',
        description: 'A DNS mistake takes ordering offline for 47 minutes. Executives now question the whole program. Stress made the checklist slip.',
        titleFr: 'Panne en pleine migration', titleEs: 'Caída en plena migración', titleVi: 'Sập hệ thống giữa cuộc di trú',
        descriptionFr: 'Une erreur DNS met les commandes hors ligne pendant 47 minutes. La direction remet maintenant tout le programme en question. Le stress a fait déraper la liste de contrôle.', descriptionEs: 'Un error de DNS deja fuera de línea los pedidos por 47 minutos. Los ejecutivos ahora cuestionan todo el programa. El estrés hizo fallar la checklist.', descriptionVi: 'Một lỗi DNS làm hệ thống đặt hàng ngừng 47 phút. Ban lãnh đạo giờ nghi ngờ cả chương trình. Căng thẳng làm checklist bị bỏ sót.',
        icon: '🔥',
        triggerCondition: (state) => state.week >= 7 && state.team.stress > 45,
        options: [
          { id: 'postmortem', label: 'Blameless post-mortem + cutover rehearsals', labelFr: 'Post-mortem sans blâme + répétitions de bascule', labelEs: 'Post-mortem sin culpas + ensayos de cutover', labelVi: 'Mổ xẻ không đổ lỗi + diễn tập chuyển đổi', effects: { budget: -20000, quality: 10, knowledge: 10, morale: 5, stress: -8 } },
          { id: 'freeze', label: 'Two-week change freeze', labelFr: 'Gel des changements de deux semaines', labelEs: 'Congelamiento de cambios de dos semanas', labelVi: 'Đóng băng thay đổi hai tuần', effects: { schedule: -2, stress: -5 } },
          { id: 'scapegoat', label: 'Reassign the engineer who made the change', labelFr: 'Réaffecter l\'ingénieur qui a fait le changement', labelEs: 'Reasignar al ingeniero que hizo el cambio', labelVi: 'Điều chuyển kỹ sư gây ra thay đổi', effects: { morale: -15, stress: 10, knowledge: -8 } }
        ]
      }
    ]
  },

  // BANKING #2 — core platform replacement under a regulatory clock (Expert)
  core_banking: {
    id: 'core_banking',
    category: 'banking',
    title: 'Ledger Prime',
    subtitle: 'Core Banking Replacement',
    icon: '🏛️',
    difficulty: 'Expert',
    difficultyColor: '#dc2626',
    description: 'Program director at Meridian Trust. Replace the core banking platform before the regulator\u2019s modernization deadline — parallel runs are your only safety net.',
    company: 'Meridian Trust',
    projectName: 'Core Platform Replacement',
    deliverable: 'workstreams',
    pedagogicalFocus: 'risk',
    hasPrototyping: true, // parallel-run rehearsals
    hasUncertainty: true,
    initial: { budget: 2100000, weeks: 16, scope: 12, teamSize: 12, quality: 82, morale: 72, stress: 32, knowledge: 30 },
    weeklyCostPerPerson: 9000,
    causalEvents: [
      {
        id: 'parallel_run_failure',
        title: 'Parallel Run Divergence',
        description: 'The old and new ledgers disagree by $0.03 per thousand transactions. Tiny — and completely unacceptable. Rehearsal runs would have caught the rounding rule earlier.',
        titleFr: 'Divergence de l\'opération en parallèle', titleEs: 'Divergencia en la operación en paralelo', titleVi: 'Sai lệch khi chạy song song',
        descriptionFr: 'L\'ancien et le nouveau grand livre divergent de 0,03 $ par mille transactions. Minuscule — et totalement inacceptable. Des répétitions auraient détecté la règle d\'arrondi plus tôt.', descriptionEs: 'El libro mayor viejo y el nuevo difieren $0.03 por cada mil transacciones. Mínimo — y completamente inaceptable. Los ensayos habrían detectado antes la regla de redondeo.', descriptionVi: 'Sổ cái cũ và mới lệch nhau $0.03 trên mỗi nghìn giao dịch. Nhỏ xíu — và hoàn toàn không thể chấp nhận. Diễn tập đã có thể phát hiện sớm quy tắc làm tròn.',
        icon: '⚖️',
        triggerCondition: (state) => state.week >= 6,
        prototypeModifier: true,
        options: [
          { id: 'root_cause', label: 'Halt cutover, root-cause the rounding engine', labelFr: 'Arrêter la bascule, traquer la cause de l\'arrondi', labelEs: 'Detener el cutover, buscar la causa raíz del redondeo', labelVi: 'Dừng chuyển đổi, truy tận gốc bộ làm tròn', effects: { schedule: -2, budget: -110000, quality: 15, knowledge: 12 } },
          { id: 'reconcile_daily', label: 'Ship with a daily reconciliation patch', labelFr: 'Livrer avec un correctif de rapprochement quotidien', labelEs: 'Entregar con un parche de conciliación diaria', labelVi: 'Bàn giao kèm bản vá đối soát hằng ngày', effects: { budget: -50000, quality: -8, stress: 10 } },
          { id: 'defer_module', label: 'Defer the interest module to phase 2', labelFr: 'Reporter le module d\'intérêts à la phase 2', labelEs: 'Diferir el módulo de intereses a la fase 2', labelVi: 'Hoãn mô-đun lãi suất sang giai đoạn 2', effects: { scope: -1, quality: -3, stress: -5 } }
        ]
      },
      {
        id: 'regulator_audit',
        title: 'Surprise Regulator Checkpoint',
        description: 'The regulator schedules an interim audit of your migration controls in two weeks.',
        titleFr: 'Point de contrôle surprise du régulateur', titleEs: 'Punto de control sorpresa del regulador', titleVi: 'Kiểm tra đột xuất của cơ quan quản lý',
        descriptionFr: 'Le régulateur planifie un audit intérimaire de vos contrôles de migration dans deux semaines.', descriptionEs: 'El regulador agenda una auditoría interina de tus controles de migración en dos semanas.', descriptionVi: 'Cơ quan quản lý lên lịch kiểm toán giữa kỳ các cơ chế kiểm soát di trú của bạn trong hai tuần.',
        icon: '🔍',
        triggerCondition: (state) => state.week >= 8,
        options: [
          { id: 'audit_ready', label: 'Dedicated audit-readiness sprint', labelFr: 'Sprint dédié à la préparation d\'audit', labelEs: 'Sprint dedicado a preparación de auditoría', labelVi: 'Sprint chuyên chuẩn bị kiểm toán', effects: { schedule: -1, budget: -60000, quality: 10, stress: 8 } },
          { id: 'as_is', label: 'Present as-is with honest gaps', labelFr: 'Présenter tel quel avec les lacunes assumées', labelEs: 'Presentar tal cual con brechas honestas', labelVi: 'Trình bày nguyên trạng, thẳng thắn về thiếu sót', effects: { quality: 3, morale: 3, stress: 5 } },
          { id: 'polish_docs', label: 'Polish documentation only (risky)', labelFr: 'Peaufiner la documentation seulement (risqué)', labelEs: 'Solo pulir la documentación (riesgoso)', labelVi: 'Chỉ trau chuốt tài liệu (rủi ro)', effects: { budget: -20000, quality: -5 } }
        ]
      },
      {
        id: 'data_reconciliation',
        title: 'Forty Years of Dirty Accounts',
        description: 'Dormant accounts, duplicate customers, encoding from three prior systems. Quality is slipping under the load.',
        titleFr: 'Quarante ans de comptes sales', titleEs: 'Cuarenta años de cuentas sucias', titleVi: 'Bốn mươi năm tài khoản bẩn',
        descriptionFr: 'Comptes dormants, clients en double, encodage de trois systèmes antérieurs. La qualité glisse sous la charge.', descriptionEs: 'Cuentas inactivas, clientes duplicados, codificación de tres sistemas anteriores. La calidad se resbala bajo la carga.', descriptionVi: 'Tài khoản ngủ đông, khách hàng trùng lặp, mã hóa từ ba hệ thống trước. Chất lượng đang tuột dốc dưới tải.',
        icon: '🗃️',
        triggerCondition: (state) => state.week >= 5 && state.scope.quality < 78,
        options: [
          { id: 'cleanse_team', label: 'Stand up a dedicated data-cleanse team', labelFr: 'Monter une équipe dédiée au nettoyage de données', labelEs: 'Montar un equipo dedicado de limpieza de datos', labelVi: 'Lập đội chuyên làm sạch dữ liệu', effects: { budget: -90000, quality: 12, knowledge: 8 } },
          { id: 'migrate_flagged', label: 'Migrate with flagged exceptions queue', labelFr: 'Migrer avec file d\'exceptions signalées', labelEs: 'Migrar con cola de excepciones marcadas', labelVi: 'Di trú kèm hàng đợi ngoại lệ được đánh dấu', effects: { budget: -30000, quality: 3, stress: 5 } },
          { id: 'archive_dormant', label: 'Archive dormant accounts pre-migration', labelFr: 'Archiver les comptes dormants avant migration', labelEs: 'Archivar cuentas inactivas antes de migrar', labelVi: 'Lưu trữ tài khoản ngủ đông trước di trú', effects: { schedule: -1, quality: 5, knowledge: 5 } }
        ]
      },
      {
        id: 'vendor_slip',
        title: 'Platform Vendor Slips a Release',
        description: 'The vendor delays the payments module release by three weeks. Your stressed team hears it from a press release.',
        titleFr: 'Le fournisseur reporte une version', titleEs: 'El proveedor retrasa un release', titleVi: 'Nhà cung cấp trễ bản phát hành',
        descriptionFr: 'Le fournisseur retarde la version du module de paiements de trois semaines. Votre équipe stressée l\'apprend par communiqué de presse.', descriptionEs: 'El proveedor retrasa tres semanas el release del módulo de pagos. Tu equipo estresado se entera por un comunicado de prensa.', descriptionVi: 'Nhà cung cấp hoãn bản phát hành mô-đun thanh toán ba tuần. Đội đang căng thẳng của bạn biết tin qua thông cáo báo chí.',
        icon: '📦',
        triggerCondition: (state) => state.week >= 9 && state.team.stress > 50,
        options: [
          { id: 'resequence', label: 'Resequence workstreams around the gap', labelFr: 'Reséquencer les volets de travail autour du trou', labelEs: 'Resecuenciar los frentes de trabajo alrededor del hueco', labelVi: 'Xếp lại các luồng việc quanh khoảng trống', effects: { schedule: -1, knowledge: 8, stress: 5 } },
          { id: 'penalty_clause', label: 'Invoke contract penalties (relationship cost)', labelFr: 'Invoquer les pénalités contractuelles (coût relationnel)', labelEs: 'Invocar penalidades del contrato (costo de relación)', labelVi: 'Viện dẫn phạt hợp đồng (tổn hại quan hệ)', effects: { budget: -10000, morale: -5, stress: 8, quality: -3 } },
          { id: 'build_shim', label: 'Build a temporary payments shim', labelFr: 'Construire une passerelle de paiements temporaire', labelEs: 'Construir un adaptador temporal de pagos', labelVi: 'Dựng lớp đệm thanh toán tạm thời', effects: { budget: -80000, quality: -5, knowledge: 10 } }
        ]
      }
    ]
  },

  // BANKING #3 — compliance program on a fixed date (Standard)
  regtech_aml: {
    id: 'regtech_aml',
    category: 'banking',
    title: 'CleanSweep',
    subtitle: 'AML Compliance Program',
    icon: '🧾',
    difficulty: 'Standard',
    difficultyColor: '#3b82f6',
    description: 'Compliance PM at Meridian Trust. Stand up the new anti-money-laundering monitoring program — ten controls, one immovable regulator deadline.',
    company: 'Meridian Trust',
    projectName: 'AML Monitoring Program',
    deliverable: 'controls',
    pedagogicalFocus: 'mechanics',
    hasPrototyping: false,
    hasUncertainty: false,
    initial: { budget: 510000, weeks: 10, scope: 10, teamSize: 6, quality: 85, morale: 76, stress: 22, knowledge: 42 },
    weeklyCostPerPerson: 7000,
    causalEvents: [
      {
        id: 'false_positive_flood',
        title: 'False-Positive Flood',
        description: 'The new transaction-monitoring rules flag 4,000 alerts a day. The review team is drowning.',
        titleFr: 'Déluge de faux positifs', titleEs: 'Inundación de falsos positivos', titleVi: 'Lũ cảnh báo giả',
        descriptionFr: 'Les nouvelles règles de surveillance des transactions génèrent 4 000 alertes par jour. L\'équipe de révision se noie.', descriptionEs: 'Las nuevas reglas de monitoreo de transacciones generan 4.000 alertas al día. El equipo de revisión se ahoga.', descriptionVi: 'Quy tắc giám sát giao dịch mới đánh dấu 4.000 cảnh báo mỗi ngày. Đội rà soát đang chết chìm.',
        icon: '🚨',
        triggerCondition: (state) => state.week >= 5,
        options: [
          { id: 'tune_rules', label: 'Tuning sprint with the analytics team', labelFr: 'Sprint de réglage avec l\'équipe d\'analytique', labelEs: 'Sprint de ajuste con el equipo de analítica', labelVi: 'Sprint tinh chỉnh cùng đội phân tích', effects: { budget: -30000, quality: 10, knowledge: 10 } },
          { id: 'temp_staff', label: 'Contract temporary reviewers', labelFr: 'Embaucher des réviseurs temporaires', labelEs: 'Contratar revisores temporales', labelVi: 'Thuê người rà soát thời vụ', effects: { budget: -45000, stress: -5 } },
          { id: 'raise_thresholds', label: 'Raise alert thresholds (regulatory risk)', labelFr: 'Relever les seuils d\'alerte (risque réglementaire)', labelEs: 'Subir los umbrales de alerta (riesgo regulatorio)', labelVi: 'Nâng ngưỡng cảnh báo (rủi ro pháp lý)', effects: { quality: -10, stress: 8 } }
        ]
      },
      {
        id: 'guidance_update',
        title: 'Regulator Updates Its Guidance',
        description: 'Mid-program, the regulator publishes clarified guidance touching two of your controls. Change arrives whether you like it or not.',
        titleFr: 'Le régulateur met à jour ses lignes directrices', titleEs: 'El regulador actualiza su guía', titleVi: 'Cơ quan quản lý cập nhật hướng dẫn',
        descriptionFr: 'En cours de programme, le régulateur publie des lignes directrices clarifiées touchant deux de vos contrôles. Le changement arrive, que vous le vouliez ou non.', descriptionEs: 'A mitad del programa, el regulador publica una guía aclarada que toca dos de tus controles. El cambio llega te guste o no.', descriptionVi: 'Giữa chương trình, cơ quan quản lý công bố hướng dẫn làm rõ chạm vào hai cơ chế kiểm soát của bạn. Thay đổi cứ đến dù bạn muốn hay không.',
        icon: '📜',
        triggerCondition: (state) => state.week >= 3 && state.scope.quality > 80,
        options: [
          { id: 'reprioritize', label: 'Absorb it: rework the two controls, defer low-value polish', labelFr: 'Absorber : retravailler les deux contrôles, reporter le peaufinage', labelEs: 'Absorberlo: rehacer los dos controles, diferir el pulido de bajo valor', labelVi: 'Hấp thụ: làm lại hai cơ chế kiểm soát, hoãn phần trau chuốt', effects: { scope: 0, morale: 3, knowledge: 6, stress: 4 } },
          { id: 'add_scope', label: 'Add the rework on top of everything', labelFr: 'Ajouter le retravail par-dessus tout le reste', labelEs: 'Agregar el retrabajo encima de todo', labelVi: 'Chồng phần làm lại lên mọi thứ', effects: { scope: 1, budget: -25000, stress: 12 } },
          { id: 'interpret_narrow', label: 'Interpret the guidance narrowly (risky)', labelFr: 'Interpréter les lignes directrices étroitement (risqué)', labelEs: 'Interpretar la guía de forma estrecha (riesgoso)', labelVi: 'Diễn giải hướng dẫn theo nghĩa hẹp (rủi ro)', effects: { quality: -6, stress: -2 } }
        ]
      },
      {
        id: 'analyst_burnout',
        title: 'Analyst Burnout',
        description: 'Your two senior AML analysts are visibly burning out under the alert backlog and the deadline.',
        titleFr: 'Épuisement des analystes', titleEs: 'Burnout de analistas', titleVi: 'Phân tích viên kiệt sức',
        descriptionFr: 'Vos deux analystes AML seniors s\'épuisent visiblement sous l\'arriéré d\'alertes et l\'échéance.', descriptionEs: 'Tus dos analistas AML senior se están quemando visiblemente bajo el backlog de alertas y la fecha límite.', descriptionVi: 'Hai phân tích viên AML kỳ cựu của bạn kiệt sức rõ rệt dưới núi cảnh báo tồn và hạn chót.',
        icon: '🥱',
        triggerCondition: (state) => state.week >= 6 && state.team.stress > 45,
        options: [
          { id: 'rotate_load', label: 'Rotate the alert queue across the team', labelFr: 'Faire tourner la file d\'alertes dans l\'équipe', labelEs: 'Rotar la cola de alertas en el equipo', labelVi: 'Luân phiên hàng đợi cảnh báo trong đội', effects: { morale: 8, stress: -8, knowledge: 5 } },
          { id: 'overtime_pay', label: 'Overtime premiums to push through', labelFr: 'Primes d\'heures supplémentaires pour forcer le passage', labelEs: 'Primas de horas extra para empujar', labelVi: 'Trả phụ trội tăng ca để đẩy cho xong', effects: { budget: -35000, stress: 8, morale: -4 } },
          { id: 'ignore', label: 'They\u2019re professionals — push on', labelFr: 'Ce sont des professionnels — on continue', labelEs: 'Son profesionales — seguir adelante', labelVi: 'Họ là dân chuyên — cứ tiến tới', effects: { morale: -12, stress: 12, quality: -5 } }
        ]
      }
    ]
  },

  // APEX #3 — rapid-prototyping squad under Scrum (Advanced)
  skunkworks_scrum: {
    id: 'skunkworks_scrum',
    category: 'apex',
    title: 'Skunkworks',
    subtitle: 'Drone Demo under Scrum',
    icon: '🚁',
    difficulty: 'Advanced',
    difficultyColor: '#f59e0b',
    description: 'Product Owner of a skunkworks squad. Build the most impressive autonomous-drone demo possible for the investor showcase — you cannot build it all.',
    company: 'Aquila Dynamics',
    projectName: 'Autonomous Drone Showcase',
    deliverable: 'backlog items',
    pedagogicalFocus: 'agile-scrum',
    hasPrototyping: false,
    hasUncertainty: true,
    framework: 'scrum',
    initial: { budget: 650000, weeks: 12, scope: 14, sprintLength: 2, teamSize: 5, quality: 85, morale: 80, stress: 22, knowledge: 32 },
    weeklyCostPerPerson: 9000,
    sprints: 6,
    valueTarget: 620, // playtest-tuned: strong play delivers ~685
    backlog: [
      { id: 'flight_core',    name: 'Stable flight core',            nameFr: 'Noyau de vol stable', nameEs: 'Núcleo de vuelo estable', nameVi: 'Lõi bay ổn định',                 points: 8, value: 100, uncertainty: 0.2,  must: true },
      { id: 'obstacle_avoid', name: 'Obstacle avoidance',            nameFr: 'Évitement d\u2019obstacles', nameEs: 'Evasión de obstáculos', nameVi: 'Né vật cản',         points: 5, value: 80,  uncertainty: 0.45 },
      { id: 'ground_station', name: 'Ground control station',        nameFr: 'Station de contrôle au sol', nameEs: 'Estación de control terrestre', nameVi: 'Trạm điều khiển mặt đất',          points: 5, value: 70,  uncertainty: 0.2,  must: true },
      { id: 'auto_landing',   name: 'Autonomous landing',            nameFr: 'Atterrissage autonome', nameEs: 'Aterrizaje autónomo', nameVi: 'Hạ cánh tự động',               points: 5, value: 65,  uncertainty: 0.35 },
      { id: 'telemetry',      name: 'Live telemetry feed',           nameFr: 'Télémétrie en direct', nameEs: 'Telemetría en vivo', nameVi: 'Luồng telemetry trực tiếp',                points: 3, value: 60,  uncertainty: 0.15 },
      { id: 'swarm_demo',     name: 'Three-drone swarm demo',        nameFr: 'Démo d\u2019essaim à trois drones', nameEs: 'Demo de enjambre de tres drones', nameVi: 'Demo bầy ba drone',  points: 8, value: 55,  uncertainty: 0.45 },
      { id: 'payload_sensor', name: 'Sensor payload module',         nameFr: 'Module de charge utile capteur', nameEs: 'Módulo de carga de sensores', nameVi: 'Mô-đun cụm cảm biến',      points: 5, value: 50,  uncertainty: 0.3 },
      { id: 'sim_env',        name: 'Simulation environment',        nameFr: 'Environnement de simulation', nameEs: 'Entorno de simulación', nameVi: 'Môi trường mô phỏng',         points: 3, value: 45,  uncertainty: 0.2 },
      { id: 'battery_mgmt',   name: 'Smart battery management',      nameFr: 'Gestion intelligente de batterie', nameEs: 'Gestión inteligente de batería', nameVi: 'Quản lý pin thông minh',    points: 3, value: 40,  uncertainty: 0.25 },
      { id: 'video_stream',   name: 'HD video streaming',            nameFr: 'Diffusion vidéo HD', nameEs: 'Streaming de video HD', nameVi: 'Truyền video HD',                  points: 3, value: 38,  uncertainty: 0.2 },
      { id: 'demo_ui',        name: 'Showcase demo UI',              nameFr: 'Interface de démonstration', nameEs: 'Interfaz de demo para showcase', nameVi: 'Giao diện demo trình diễn',          points: 3, value: 30,  uncertainty: 0.15 },
      { id: 'docs',           name: 'Technical documentation',       nameFr: 'Documentation technique', nameEs: 'Documentación técnica', nameVi: 'Tài liệu kỹ thuật',             points: 2, value: 22,  uncertainty: 0.1 },
      { id: 'branding',       name: 'Drone shell branding',          nameFr: 'Habillage de marque du drone', nameEs: 'Branding del casco del dron', nameVi: 'Trang trí vỏ drone',        points: 2, value: 12,  uncertainty: 0.1 },
      { id: 'led_show',       name: 'LED light show',                nameFr: 'Spectacle de DEL', nameEs: 'Show de luces LED', nameVi: 'Trình diễn đèn LED',                    points: 2, value: 10,  uncertainty: 0.1 }
    ],
    pivot: {
      sprint: 3,
      title: 'Defense Partner Interest',
      titleFr: 'Intérêt d\u2019un partenaire de défense', titleEs: 'Interés de un socio de defensa', titleVi: 'Đối tác quốc phòng quan tâm',
      description: 'After the Sprint 3 demo, a defense integrator signals serious interest — if the platform can carry sensors securely. Sensor payload jumps in value (50\u219290), the swarm spectacle matters less (55\u219230), and they require encrypted communications. How do you respond?',
      descriptionFr: 'Après la démo du sprint 3, un intégrateur de défense manifeste un intérêt sérieux — si la plateforme peut transporter des capteurs de façon sécurisée. La charge utile capteur bondit en valeur (50\u219290), le spectacle d\u2019essaim compte moins (55\u219230), et ils exigent des communications chiffrées. Comment répondez-vous ?', descriptionEs: 'Tras la demo del Sprint 3, un integrador de defensa muestra interés serio — si la plataforma puede llevar sensores de forma segura. La carga de sensores salta en valor (50→90), el espectáculo del enjambre importa menos (55→30), y requieren comunicaciones cifradas. ¿Cómo respondes?', descriptionVi: 'Sau demo Sprint 3, một nhà tích hợp quốc phòng tỏ ý quan tâm nghiêm túc — nếu nền tảng mang được cảm biến an toàn. Cụm cảm biến vọt giá trị (50→90), màn bầy drone bớt quan trọng (55→30), và họ yêu cầu liên lạc mã hóa. Bạn phản ứng thế nào?',
      changes: [{ id: 'payload_sensor', value: 90 }, { id: 'swarm_demo', value: 30 }],
      retire: 'led_show',
      newItem: { id: 'secure_comms', name: 'Encrypted communications', nameFr: 'Communications chiffrées', nameEs: 'Comunicaciones cifradas', nameVi: 'Liên lạc mã hóa', points: 5, value: 85, uncertainty: 0.35, rank: 2.5 }
    },
    ceremonies: ['sprint_planning', 'standup', 'sprint_review', 'retrospective', 'refine_backlog'],
    scoringStrategy: 'scrum'
  },

  // ENTERTAINMENT #3 — game studio vertical slice (Advanced)
  gamestudio_scrum: {
    id: 'gamestudio_scrum',
    category: 'entertainment',
    title: 'Pixel Forge',
    subtitle: 'Game Vertical Slice under Scrum',
    icon: '🎮',
    difficulty: 'Advanced',
    difficultyColor: '#f59e0b',
    description: 'Product Owner at an indie game studio. Ship the most convincing vertical slice by the publisher pitch — fun first, features second, and you cannot build it all.',
    company: 'Pixel Forge Studio',
    projectName: 'Vertical Slice — \u201CEmberfall\u201D',
    deliverable: 'backlog items',
    pedagogicalFocus: 'agile-scrum',
    hasPrototyping: false,
    hasUncertainty: true,
    framework: 'scrum',
    initial: { budget: 590000, weeks: 12, scope: 14, sprintLength: 2, teamSize: 5, quality: 85, morale: 82, stress: 20, knowledge: 36 },
    weeklyCostPerPerson: 8000,
    sprints: 6,
    valueTarget: 560,
    backlog: [
      { id: 'core_loop',       name: 'Core gameplay loop',         nameFr: 'Boucle de jeu principale', nameEs: 'Bucle de juego central', nameVi: 'Vòng lặp gameplay lõi',            points: 8, value: 100, uncertainty: 0.25, must: true },
      { id: 'combat',          name: 'Combat system',              nameFr: 'Système de combat', nameEs: 'Sistema de combate', nameVi: 'Hệ thống chiến đấu',                   points: 5, value: 80,  uncertainty: 0.35 },
      { id: 'level_one',       name: 'First playable level',       nameFr: 'Premier niveau jouable', nameEs: 'Primer nivel jugable', nameVi: 'Màn chơi được đầu tiên',              points: 5, value: 70,  uncertainty: 0.2,  must: true },
      { id: 'art_style',       name: 'Signature art style pass',   nameFr: 'Passe de style artistique', nameEs: 'Pase de estilo artístico distintivo', nameVi: 'Lượt hoàn thiện phong cách mỹ thuật đặc trưng',           points: 3, value: 60,  uncertainty: 0.2 },
      { id: 'boss_fight',      name: 'Boss encounter',             nameFr: 'Combat de boss', nameEs: 'Encuentro con jefe', nameVi: 'Trận đấu trùm',                      points: 5, value: 55,  uncertainty: 0.35 },
      { id: 'multiplayer_proto', name: 'Co-op multiplayer prototype', nameFr: 'Prototype multijoueur coop', nameEs: 'Prototipo multijugador co-op', nameVi: 'Nguyên mẫu co-op nhiều người chơi',       points: 8, value: 50,  uncertainty: 0.5 },
      { id: 'audio',           name: 'Adaptive audio & music',     nameFr: 'Audio et musique adaptatifs', nameEs: 'Audio y música adaptativos', nameVi: 'Âm thanh & nhạc thích ứng',         points: 3, value: 45,  uncertainty: 0.2 },
      { id: 'ui_menus',        name: 'UI and menus',               nameFr: 'Interface et menus', nameEs: 'Interfaz y menús', nameVi: 'Giao diện & menu',                  points: 3, value: 40,  uncertainty: 0.15 },
      { id: 'save_system',     name: 'Save system',                nameFr: 'Système de sauvegarde', nameEs: 'Sistema de guardado', nameVi: 'Hệ thống lưu game',               points: 3, value: 38,  uncertainty: 0.2 },
      { id: 'cutscene',        name: 'Intro cinematic',            nameFr: 'Cinématique d\u2019introduction', nameEs: 'Cinemática de introducción', nameVi: 'Đoạn phim mở đầu',    points: 5, value: 35,  uncertainty: 0.3 },
      { id: 'perf_console',    name: 'Console performance pass',   nameFr: 'Optimisation console', nameEs: 'Pase de rendimiento en consolas', nameVi: 'Lượt tối ưu hiệu năng console',                points: 3, value: 30,  uncertainty: 0.25 },
      { id: 'accessibility',   name: 'Accessibility options',      nameFr: 'Options d\u2019accessibilité', nameEs: 'Opciones de accesibilidad', nameVi: 'Tùy chọn trợ năng',       points: 2, value: 28,  uncertainty: 0.1 },
      { id: 'achievements',    name: 'Achievements',               nameFr: 'Succès et trophées', nameEs: 'Logros', nameVi: 'Thành tựu',                  points: 2, value: 15,  uncertainty: 0.1 },
      { id: 'photo_mode',      name: 'Photo mode',                 nameFr: 'Mode photo', nameEs: 'Modo foto', nameVi: 'Chế độ chụp ảnh',                          points: 2, value: 10,  uncertainty: 0.15 }
    ],
    pivot: {
      sprint: 3,
      title: 'Publisher Feedback',
      titleFr: 'Retour de l\u2019éditeur', titleEs: 'Feedback del publisher', titleVi: 'Phản hồi của nhà phát hành',
      description: 'The publisher loved the Sprint 3 build — and wants co-op at the heart of the pitch. The multiplayer prototype jumps in value (50\u219290), the cinematic matters less (35\u219215), and they ask for a dedicated co-op demo level. How do you respond?',
      descriptionFr: 'L\u2019éditeur a adoré la version du sprint 3 — et veut le coop au cœur du pitch. Le prototype multijoueur bondit en valeur (50\u219290), la cinématique compte moins (35\u219215), et ils demandent un niveau démo coop dédié. Comment répondez-vous ?', descriptionEs: 'Al publisher le encantó la build del Sprint 3 — y quiere el co-op en el corazón del pitch. El prototipo multijugador salta en valor (50→90), la cinemática importa menos (35→15), y piden un nivel de demo co-op dedicado. ¿Cómo respondes?', descriptionVi: 'Nhà phát hành mê bản build Sprint 3 — và muốn co-op làm trọng tâm buổi pitch. Nguyên mẫu nhiều người chơi vọt giá trị (50→90), đoạn phim bớt quan trọng (35→15), và họ đề nghị một màn demo co-op riêng. Bạn phản ứng thế nào?',
      changes: [{ id: 'multiplayer_proto', value: 90 }, { id: 'cutscene', value: 15 }],
      retire: 'photo_mode',
      newItem: { id: 'coop_demo', name: 'Co-op demo level', nameFr: 'Niveau démo coopératif', nameEs: 'Nivel de demo co-op', nameVi: 'Màn demo co-op', points: 5, value: 85, uncertainty: 0.4, rank: 3.5 }
    },
    ceremonies: ['sprint_planning', 'standup', 'sprint_review', 'retrospective', 'refine_backlog'],
    scoringStrategy: 'scrum'
  },

  // CONSTRUCTION #3 — construction-tech field app (Advanced)
  sitesync_scrum: {
    id: 'sitesync_scrum',
    category: 'construction',
    title: 'SiteSync',
    subtitle: 'Field App under Scrum',
    icon: '📱',
    difficulty: 'Advanced',
    difficultyColor: '#f59e0b',
    description: 'Product Owner at a construction firm\u2019s tech unit. Ship the field app site crews will actually use — daily reports, punch lists, drawings — before the flagship tower project starts.',
    company: 'UrbanCore Construction',
    projectName: 'SiteSync Field App',
    deliverable: 'backlog items',
    pedagogicalFocus: 'agile-scrum',
    hasPrototyping: false,
    hasUncertainty: true,
    framework: 'scrum',
    initial: { budget: 590000, weeks: 12, scope: 14, sprintLength: 2, teamSize: 5, quality: 85, morale: 76, stress: 22, knowledge: 34 },
    weeklyCostPerPerson: 8000,
    sprints: 6,
    valueTarget: 560,
    backlog: [
      { id: 'daily_reports',  name: 'Daily site reports',           nameFr: 'Rapports de chantier quotidiens', nameEs: 'Reportes diarios de obra', nameVi: 'Báo cáo công trường hằng ngày',      points: 8, value: 100, uncertainty: 0.15, must: true },
      { id: 'punch_list',     name: 'Punch list management',        nameFr: 'Gestion des listes de déficiences', nameEs: 'Gestión de listas de pendientes', nameVi: 'Quản lý danh sách tồn đọng',    points: 5, value: 80,  uncertainty: 0.2 },
      { id: 'drawing_viewer', name: 'Drawing viewer with markup',   nameFr: 'Visionneuse de plans avec annotations', nameEs: 'Visor de planos con anotaciones', nameVi: 'Trình xem bản vẽ có chú thích', points: 5, value: 70,  uncertainty: 0.25, must: true },
      { id: 'safety_forms',   name: 'Digital safety forms',         nameFr: 'Formulaires de sécurité numériques', nameEs: 'Formularios de seguridad digitales', nameVi: 'Biểu mẫu an toàn số',   points: 5, value: 65,  uncertainty: 0.2 },
      { id: 'timesheets',     name: 'Crew timesheets',              nameFr: 'Feuilles de temps des équipes', nameEs: 'Partes de horas de cuadrillas', nameVi: 'Chấm công đội thợ',        points: 3, value: 60,  uncertainty: 0.15 },
      { id: 'photo_docs',     name: 'Photo documentation',          nameFr: 'Documentation photo', nameEs: 'Documentación fotográfica', nameVi: 'Hồ sơ ảnh',                  points: 3, value: 55,  uncertainty: 0.15 },
      { id: 'offline_mode',   name: 'Offline mode with sync',       nameFr: 'Mode hors ligne avec synchronisation', nameEs: 'Modo offline con sincronización', nameVi: 'Chế độ offline có đồng bộ', points: 8, value: 50,  uncertainty: 0.45 },
      { id: 'rfi_tracker',    name: 'RFI tracker',                  nameFr: 'Suivi des demandes d\u2019information', nameEs: 'Seguimiento de RFIs', nameVi: 'Theo dõi RFI', points: 5, value: 45,  uncertainty: 0.25 },
      { id: 'dashboards',     name: 'PM dashboards',                nameFr: 'Tableaux de bord GP', nameEs: 'Tableros de PM', nameVi: 'Bảng điều khiển PM',                  points: 3, value: 40,  uncertainty: 0.2 },
      { id: 'equipment_log',  name: 'Equipment log',                nameFr: 'Registre d\u2019équipement', nameEs: 'Registro de equipos', nameVi: 'Nhật ký thiết bị',          points: 3, value: 38,  uncertainty: 0.2 },
      { id: 'subcontractor_portal', name: 'Subcontractor portal',   nameFr: 'Portail des sous-traitants', nameEs: 'Portal de subcontratistas', nameVi: 'Cổng nhà thầu phụ',           points: 5, value: 35,  uncertainty: 0.3 },
      { id: 'weather_log',    name: 'Automated weather log',        nameFr: 'Journal météo automatisé', nameEs: 'Registro de clima automatizado', nameVi: 'Nhật ký thời tiết tự động',             points: 2, value: 30,  uncertainty: 0.1 },
      { id: 'push_notif',     name: 'Push notifications',           nameFr: 'Notifications poussées', nameEs: 'Notificaciones push', nameVi: 'Thông báo đẩy',               points: 3, value: 28,  uncertainty: 0.15 },
      { id: 'darkmode',       name: 'Dark-mode UI',                 nameFr: 'Interface mode sombre', nameEs: 'Interfaz en modo oscuro', nameVi: 'Giao diện chế độ tối',                points: 2, value: 10,  uncertainty: 0.1 }
    ],
    pivot: {
      sprint: 3,
      title: 'Near-Miss on Tower Site',
      titleFr: 'Incident évité sur le chantier de la tour', titleEs: 'Casi accidente en la obra de la torre', titleVi: 'Suýt tai nạn tại công trường tháp',
      description: 'A serious near-miss on the flagship tower site puts safety compliance under the spotlight. Digital safety forms jump in value (65\u219295), the subcontractor portal can wait (35\u219220), and the safety director demands an incident-reporting module. How do you respond?',
      descriptionFr: 'Un incident évité de justesse sur le chantier de la tour met la conformité sécurité sous les projecteurs. Les formulaires de sécurité bondissent en valeur (65\u219295), le portail des sous-traitants peut attendre (35\u219220), et le directeur sécurité exige un module de déclaration d\u2019incidents. Comment répondez-vous ?', descriptionEs: 'Un casi accidente grave en la obra de la torre insignia pone el cumplimiento de seguridad bajo los reflectores. Los formularios de seguridad saltan en valor (65→95), el portal de subcontratistas puede esperar (35→20), y el director de seguridad exige un módulo de reporte de incidentes. ¿Cómo respondes?', descriptionVi: 'Một vụ suýt tai nạn nghiêm trọng tại công trường tháp chủ lực đặt tuân thủ an toàn vào tâm điểm. Biểu mẫu an toàn số vọt giá trị (65→95), cổng nhà thầu phụ có thể chờ (35→20), và giám đốc an toàn đòi một mô-đun báo cáo sự cố. Bạn phản ứng thế nào?',
      changes: [{ id: 'safety_forms', value: 95 }, { id: 'subcontractor_portal', value: 20 }],
      retire: 'darkmode',
      newItem: { id: 'incident_report', name: 'Incident reporting module', nameFr: 'Module de déclaration d\u2019incidents', nameEs: 'Módulo de reporte de incidentes', nameVi: 'Mô-đun báo cáo sự cố', points: 5, value: 85, uncertainty: 0.2, rank: 3.5 }
    },
    ceremonies: ['sprint_planning', 'standup', 'sprint_review', 'retrospective', 'refine_backlog'],
    scoringStrategy: 'scrum'
  },

  // IT #3 — internal developer platform (Expert: platform work is uncertain)
  devops_scrum: {
    id: 'devops_scrum',
    category: 'it',
    title: 'Pipeline Zero',
    subtitle: 'Developer Platform under Scrum',
    icon: '⚙️',
    difficulty: 'Expert',
    difficultyColor: '#dc2626',
    description: 'Product Owner of the platform team. Build the internal developer platform 200 engineers will live in — platform work hides brutal estimate uncertainty, and you cannot build it all.',
    company: 'Nexus Technologies',
    projectName: 'Internal Developer Platform',
    deliverable: 'backlog items',
    pedagogicalFocus: 'agile-scrum',
    hasPrototyping: false,
    hasUncertainty: true,
    framework: 'scrum',
    initial: { budget: 650000, weeks: 12, scope: 14, sprintLength: 2, teamSize: 5, quality: 85, morale: 74, stress: 26, knowledge: 30 },
    weeklyCostPerPerson: 9000,
    sprints: 6,
    valueTarget: 560,
    backlog: [
      { id: 'ci_pipeline',      name: 'CI/CD pipeline templates',      nameFr: 'Gabarits de pipeline CI/CD', nameEs: 'Plantillas de pipelines CI/CD', nameVi: 'Mẫu pipeline CI/CD',            points: 8, value: 100, uncertainty: 0.2,  must: true },
      { id: 'iac_templates',    name: 'Infrastructure-as-code modules', nameFr: 'Modules d\u2019infrastructure en code', nameEs: 'Módulos de infraestructura como código', nameVi: 'Mô-đun hạ tầng dưới dạng mã', points: 5, value: 80,  uncertainty: 0.3 },
      { id: 'secrets_mgmt',     name: 'Secrets management',            nameFr: 'Gestion des secrets', nameEs: 'Gestión de secretos', nameVi: 'Quản lý secrets',                   points: 5, value: 70,  uncertainty: 0.2,  must: true },
      { id: 'observability',    name: 'Observability stack',           nameFr: 'Pile d\u2019observabilité', nameEs: 'Stack de observabilidad', nameVi: 'Bộ công cụ giám sát hệ thống',            points: 5, value: 65,  uncertainty: 0.3 },
      { id: 'self_service_env', name: 'Self-service environments',     nameFr: 'Environnements en libre-service', nameEs: 'Entornos autoservicio', nameVi: 'Môi trường tự phục vụ',       points: 8, value: 60,  uncertainty: 0.45 },
      { id: 'artifact_registry', name: 'Artifact registry',            nameFr: 'Registre d\u2019artefacts', nameEs: 'Registro de artefactos', nameVi: 'Kho artifact',            points: 3, value: 55,  uncertainty: 0.15 },
      { id: 'canary_deploys',   name: 'Canary deployments',            nameFr: 'Déploiements canaris', nameEs: 'Despliegues canary', nameVi: 'Triển khai canary',                  points: 5, value: 50,  uncertainty: 0.4 },
      { id: 'cost_dashboards',  name: 'Cloud cost dashboards',         nameFr: 'Tableaux de coûts infonuagiques', nameEs: 'Tableros de costos de nube', nameVi: 'Bảng chi phí đám mây',       points: 3, value: 45,  uncertainty: 0.2 },
      { id: 'sso_integration',  name: 'SSO integration',               nameFr: 'Intégration SSO', nameEs: 'Integración SSO', nameVi: 'Tích hợp SSO',                       points: 3, value: 40,  uncertainty: 0.2 },
      { id: 'dev_portal',       name: 'Developer portal',              nameFr: 'Portail développeur', nameEs: 'Portal de desarrolladores', nameVi: 'Cổng lập trình viên',                   points: 5, value: 38,  uncertainty: 0.3 },
      { id: 'runbooks',         name: 'Runbook automation',            nameFr: 'Automatisation des procédures', nameEs: 'Automatización de runbooks', nameVi: 'Tự động hóa runbook',         points: 2, value: 30,  uncertainty: 0.1 },
      { id: 'chatops',          name: 'ChatOps integration',           nameFr: 'Intégration ChatOps', nameEs: 'Integración ChatOps', nameVi: 'Tích hợp ChatOps',                   points: 3, value: 28,  uncertainty: 0.25 },
      { id: 'gpu_pool',         name: 'GPU compute pool',              nameFr: 'Bassin de calcul GPU', nameEs: 'Pool de cómputo GPU', nameVi: 'Cụm tính toán GPU',                  points: 3, value: 22,  uncertainty: 0.35 },
      { id: 'badges',           name: 'Team gamification badges',      nameFr: 'Badges de ludification', nameEs: 'Insignias de gamificación', nameVi: 'Huy hiệu thi đua đội nhóm',                points: 2, value: 10,  uncertainty: 0.1 }
    ],
    pivot: {
      sprint: 3,
      title: 'Audit Mandate',
      titleFr: 'Mandat d\u2019audit', titleEs: 'Mandato de auditoría', titleVi: 'Mệnh lệnh kiểm toán',
      description: 'A competitor\u2019s breach makes headlines and your board orders a security audit. Secrets management jumps in value (70\u219295), self-service environments can wait (60\u219235), and the CISO demands automated compliance scanning in every pipeline. How do you respond?',
      descriptionFr: 'La brèche d\u2019un concurrent fait les manchettes et votre conseil ordonne un audit de sécurité. La gestion des secrets bondit en valeur (70\u219295), les environnements en libre-service peuvent attendre (60\u219235), et le RSSI exige une analyse de conformité automatisée dans chaque pipeline. Comment répondez-vous ?', descriptionEs: 'La brecha de un competidor llega a los titulares y tu directorio ordena una auditoría de seguridad. La gestión de secretos salta en valor (70→95), los entornos autoservicio pueden esperar (60→35), y el CISO exige escaneo de cumplimiento automatizado en cada pipeline. ¿Cómo respondes?', descriptionVi: 'Vụ rò rỉ của đối thủ lên mặt báo và hội đồng của bạn ra lệnh kiểm toán bảo mật. Quản lý secrets vọt giá trị (70→95), môi trường tự phục vụ có thể chờ (60→35), và CISO đòi quét tuân thủ tự động trong mọi pipeline. Bạn phản ứng thế nào?',
      changes: [{ id: 'secrets_mgmt', value: 95 }, { id: 'self_service_env', value: 35 }],
      retire: 'badges',
      newItem: { id: 'compliance_scan', name: 'Automated compliance scanning', nameFr: 'Analyse de conformité automatisée', nameEs: 'Escaneo de cumplimiento automatizado', nameVi: 'Quét tuân thủ tự động', points: 5, value: 85, uncertainty: 0.25, rank: 2.5 }
    },
    ceremonies: ['sprint_planning', 'standup', 'sprint_review', 'retrospective', 'refine_backlog'],
    scoringStrategy: 'scrum'
  },

  // ============================================
  // SUPPLY CHAIN — Boreal Logistics
  // ============================================

  northbridge_dc: {
    id: 'northbridge_dc',
    category: 'supply_chain',
    title: 'NorthBridge DC',
    subtitle: 'Distribution Center Commissioning',
    icon: '🏭',
    difficulty: 'Advanced',
    difficultyColor: '#f59e0b',
    description: 'Program manager at Boreal Logistics. Commission a new automated distribution center — WMS, conveyors, racking and 120 new hires — before the retail contracts kick in.',
    company: 'Boreal Logistics',
    projectName: 'NorthBridge Distribution Center',
    deliverable: 'workstreams',
    pedagogicalFocus: 'risk',
    hasPrototyping: true, // pilot lanes & dry runs
    hasUncertainty: true,
    initial: { budget: 1150000, weeks: 14, scope: 12, teamSize: 12, quality: 85, morale: 74, stress: 26, knowledge: 35 },
    weeklyCostPerPerson: 6000,
    causalEvents: [
      {
        id: 'wms_integration',
        title: 'WMS Won\u2019t Talk to the ERP',
        description: 'The warehouse management system drops every tenth order line from the ERP feed. A pilot lane dry-run would have exposed the mapping bug earlier.',
        titleFr: 'Le WMS ne parle pas à l\'ERP', titleEs: 'El WMS no se comunica con el ERP', titleVi: 'WMS không nói chuyện với ERP',
        descriptionFr: 'Le système de gestion d\'entrepôt perd une ligne de commande sur dix du flux ERP. Un essai en voie pilote aurait exposé le bogue de mappage plus tôt.', descriptionEs: 'El sistema de gestión de almacén pierde una de cada diez líneas de pedido del feed del ERP. Un ensayo en carril piloto habría expuesto antes el bug de mapeo.', descriptionVi: 'Hệ thống quản lý kho làm rơi một trên mười dòng đơn hàng từ luồng ERP. Chạy thử làn thí điểm đã có thể phơi bày lỗi ánh xạ sớm hơn.',
        icon: '🔌',
        triggerCondition: (state) => state.week >= 5,
        prototypeModifier: true,
        options: [
          { id: 'integration_sprint', label: 'Dedicated integration sprint with both vendors', labelFr: 'Sprint d\'intégration dédié avec les deux fournisseurs', labelEs: 'Sprint de integración dedicado con ambos proveedores', labelVi: 'Sprint tích hợp riêng với cả hai nhà cung cấp', effects: { schedule: -1, budget: -70000, quality: 12, knowledge: 10 } },
          { id: 'middleware', label: 'Buy middleware and remap later', labelFr: 'Acheter un intergiciel et remapper plus tard', labelEs: 'Comprar middleware y remapear después', labelVi: 'Mua middleware, ánh xạ lại sau', effects: { budget: -45000, quality: -5 } },
          { id: 'manual_patch', label: 'Manual re-entry crew until fixed (risky)', labelFr: 'Équipe de ressaisie manuelle jusqu\'au correctif (risqué)', labelEs: 'Cuadrilla de recaptura manual hasta arreglarlo (riesgoso)', labelVi: 'Đội nhập liệu thủ công đến khi sửa xong (rủi ro)', effects: { budget: -25000, quality: -10, stress: 12 } }
        ]
      },
      {
        id: 'racking_delay',
        title: 'Racking Steel Stuck at the Border',
        description: 'Your high-bay racking is held in customs for three weeks. The conveyor installers arrive Monday.',
        titleFr: 'Acier des étagères bloqué à la frontière', titleEs: 'Acero de estanterías atascado en la frontera', titleVi: 'Thép kệ chứa kẹt ở biên giới',
        descriptionFr: 'Vos étagères grande hauteur sont retenues aux douanes pendant trois semaines. Les installateurs de convoyeurs arrivent lundi.', descriptionEs: 'Tus estanterías de gran altura quedan retenidas en aduana tres semanas. Los instaladores de transportadores llegan el lunes.', descriptionVi: 'Kệ cao tầng của bạn bị hải quan giữ ba tuần. Đội lắp băng chuyền đến vào thứ Hai.',
        icon: '🚧',
        triggerCondition: (state) => state.week >= 6,
        options: [
          { id: 'resequence_trades', label: 'Resequence trades around the gap', labelFr: 'Reséquencer les corps de métier autour du trou', labelEs: 'Resecuenciar los oficios alrededor del hueco', labelVi: 'Xếp lại thứ tự các tổ thợ quanh khoảng trống', effects: { schedule: -1, knowledge: 8, stress: 5 } },
          { id: 'broker_expedite', label: 'Customs broker + expedite fees', labelFr: 'Courtier en douane + frais d\'accélération', labelEs: 'Agente aduanal + tarifas de urgencia', labelVi: 'Môi giới hải quan + phí khẩn', effects: { budget: -60000 } },
          { id: 'partial_layout', label: 'Commission half the building first', labelFr: 'Mettre en service la moitié du bâtiment d\'abord', labelEs: 'Poner en marcha primero la mitad del edificio', labelVi: 'Vận hành nửa tòa nhà trước', effects: { scope: -1, quality: -4, morale: -4 } }
        ]
      },
      {
        id: 'labor_shortage',
        title: 'Can\u2019t Staff the Night Shift',
        description: 'Only 60% of night-shift roles are filled and your stressed launch team is covering gaps themselves.',
        titleFr: 'Impossible de doter le quart de nuit', titleEs: 'No se puede dotar el turno nocturno', titleVi: 'Không tuyển đủ ca đêm',
        descriptionFr: 'Seulement 60 % des postes de nuit sont pourvus et votre équipe de lancement stressée comble elle-même les trous.', descriptionEs: 'Solo el 60% de los puestos nocturnos están cubiertos y tu estresado equipo de lanzamiento está tapando los huecos.', descriptionVi: 'Chỉ 60% vị trí ca đêm được lấp và đội khai trương đang căng thẳng phải tự trám chỗ trống.',
        icon: '🌙',
        triggerCondition: (state) => state.week >= 7 && state.team.stress > 45,
        options: [
          { id: 'wage_premium', label: 'Night premium + referral bonuses', labelFr: 'Prime de nuit + primes de recommandation', labelEs: 'Prima nocturna + bonos por referidos', labelVi: 'Phụ cấp ca đêm + thưởng giới thiệu', effects: { budget: -80000, morale: 8, stress: -8 } },
          { id: 'staffing_agency', label: 'Staffing agency contract', labelFr: 'Contrat d\'agence de placement', labelEs: 'Contrato con agencia de personal', labelVi: 'Hợp đồng với công ty cung ứng nhân sự', effects: { budget: -55000, knowledge: -5 } },
          { id: 'delay_ramp', label: 'Open with day shift only, ramp later', labelFr: 'Ouvrir avec le quart de jour seulement, monter en charge ensuite', labelEs: 'Abrir solo con turno de día, escalar después', labelVi: 'Khai trương chỉ với ca ngày, tăng dần sau', effects: { schedule: -1, quality: -3, stress: -5 } }
        ]
      }
    ]
  },

  peak_season: {
    id: 'peak_season',
    category: 'supply_chain',
    title: 'Peak Season',
    subtitle: 'Holiday Readiness Program',
    icon: '🚛',
    difficulty: 'Standard',
    difficultyColor: '#3b82f6',
    description: 'Network readiness lead at Boreal Logistics. Ten readiness tracks — carriers, temp staffing, inventory pre-positioning — before the holiday wave hits.',
    company: 'Boreal Logistics',
    projectName: 'Peak Season Readiness',
    deliverable: 'readiness tracks',
    pedagogicalFocus: 'mechanics',
    hasPrototyping: false,
    hasUncertainty: false,
    initial: { budget: 520000, weeks: 10, scope: 10, teamSize: 8, quality: 85, morale: 77, stress: 20, knowledge: 42 },
    weeklyCostPerPerson: 5500,
    causalEvents: [
      {
        id: 'forecast_spike',
        title: 'Retailer Doubles Its Order',
        description: 'Your biggest retail customer doubles its holiday forecast. Change arrives whether you planned it or not.',
        titleFr: 'Le détaillant double sa commande', titleEs: 'El minorista duplica su pedido', titleVi: 'Nhà bán lẻ tăng gấp đôi đơn hàng',
        descriptionFr: 'Votre plus gros client de détail double ses prévisions des Fêtes. Le changement arrive, planifié ou non.', descriptionEs: 'Tu mayor cliente minorista duplica su pronóstico navideño. El cambio llega lo hayas planeado o no.', descriptionVi: 'Khách bán lẻ lớn nhất tăng gấp đôi dự báo mùa lễ. Thay đổi cứ đến dù bạn có hoạch định hay không.',
        icon: '📈',
        triggerCondition: (state) => state.week >= 3 && state.scope.quality > 80,
        options: [
          { id: 'reprioritize', label: 'Absorb it: re-balance capacity, defer low-value tracks', labelFr: 'Absorber : rééquilibrer la capacité, reporter les volets de faible valeur', labelEs: 'Absorberlo: re-balancear capacidad, diferir frentes de bajo valor', labelVi: 'Hấp thụ: cân lại năng lực, hoãn các luồng giá trị thấp', effects: { scope: 0, morale: 4, knowledge: 6, stress: 4 } },
          { id: 'add_capacity', label: 'Lease overflow warehouse space on top of the plan', labelFr: 'Louer de l\'espace d\'entrepôt de débordement en plus du plan', labelEs: 'Arrendar espacio de almacén extra encima del plan', labelVi: 'Thuê thêm kho dự phòng ngoài kế hoạch', effects: { scope: 1, budget: -60000, stress: 10 } },
          { id: 'cap_orders', label: 'Cap their allocation (relationship risk)', labelFr: 'Plafonner leur allocation (risque relationnel)', labelEs: 'Limitar su asignación (riesgo de relación)', labelVi: 'Giới hạn phần phân bổ của họ (rủi ro quan hệ)', effects: { morale: 2, stress: -3, quality: -5 } }
        ]
      },
      {
        id: 'carrier_rate_hike',
        title: 'Carrier Rate Shock',
        description: 'Two national carriers announce peak surcharges 30% above your budget assumptions.',
        titleFr: 'Choc des tarifs de transport', titleEs: 'Shock de tarifas de transportistas', titleVi: 'Sốc cước vận chuyển',
        descriptionFr: 'Deux transporteurs nationaux annoncent des surcharges de pointe 30 % au-dessus de vos hypothèses budgétaires.', descriptionEs: 'Dos transportistas nacionales anuncian recargos de temporada 30% por encima de tus supuestos presupuestarios.', descriptionVi: 'Hai nhà vận chuyển toàn quốc công bố phụ phí cao điểm cao hơn 30% so với giả định ngân sách.',
        icon: '💸',
        triggerCondition: (state) => state.week >= 4,
        options: [
          { id: 'regional_mix', label: 'Blend in regional carriers (+knowledge)', labelFr: 'Intégrer des transporteurs régionaux (+connaissances)', labelEs: 'Combinar transportistas regionales (+conocimiento)', labelVi: 'Kết hợp nhà vận chuyển khu vực (+kiến thức)', effects: { budget: -20000, knowledge: 10, quality: 3 } },
          { id: 'pay_up', label: 'Pay the surcharges', labelFr: 'Payer les surcharges', labelEs: 'Pagar los recargos', labelVi: 'Trả phụ phí', effects: { budget: -70000 } },
          { id: 'shift_dates', label: 'Shift ship dates off-peak (service risk)', labelFr: 'Décaler les expéditions hors pointe (risque de service)', labelEs: 'Mover fechas de envío fuera de pico (riesgo de servicio)', labelVi: 'Dời ngày giao ngoài cao điểm (rủi ro dịch vụ)', effects: { quality: -6, stress: 5 } }
        ]
      },
      {
        id: 'warehouse_flu',
        title: 'Absenteeism Wave',
        description: 'A flu wave hits the main hub the same week as your readiness drills. Overtired supervisors are snapping at the temps.',
        titleFr: 'Vague d\'absentéisme', titleEs: 'Ola de ausentismo', titleVi: 'Làn sóng vắng mặt',
        descriptionFr: 'Une vague de grippe frappe le centre principal la même semaine que vos exercices de préparation. Les superviseurs épuisés s\'en prennent aux temporaires.', descriptionEs: 'Una ola de gripe golpea el hub principal la misma semana de tus simulacros. Los supervisores agotados les gritan a los temporales.', descriptionVi: 'Đợt cúm ập vào hub chính đúng tuần diễn tập. Giám sát viên quá mệt đang gắt gỏng với nhân viên thời vụ.',
        icon: '🤧',
        triggerCondition: (state) => state.week >= 6 && state.team.stress > 40,
        options: [
          { id: 'cross_training', label: 'Cross-train and rotate crews', labelFr: 'Former en polyvalence et faire tourner les équipes', labelEs: 'Capacitación cruzada y rotación de cuadrillas', labelVi: 'Đào tạo chéo và luân chuyển đội', effects: { budget: -20000, morale: 8, knowledge: 8, stress: -6 } },
          { id: 'overtime', label: 'Mandatory overtime', labelFr: 'Heures supplémentaires obligatoires', labelEs: 'Horas extra obligatorias', labelVi: 'Tăng ca bắt buộc', effects: { budget: -35000, morale: -8, stress: 10 } },
          { id: 'slip_drills', label: 'Postpone the readiness drills', labelFr: 'Reporter les exercices de préparation', labelEs: 'Posponer los simulacros de preparación', labelVi: 'Hoãn diễn tập sẵn sàng', effects: { schedule: -1, quality: -4 } }
        ]
      }
    ]
  },

  cleartrack_scrum: {
    id: 'cleartrack_scrum',
    category: 'supply_chain',
    title: 'ClearTrack',
    subtitle: 'Visibility Platform under Scrum',
    icon: '🛰️',
    difficulty: 'Advanced',
    difficultyColor: '#f59e0b',
    description: 'Product Owner at Boreal Logistics. Ship the shipment-visibility platform customers keep asking for — track & trace first, everything else is a trade-off.',
    company: 'Boreal Logistics',
    projectName: 'ClearTrack Visibility Platform',
    deliverable: 'backlog items',
    pedagogicalFocus: 'agile-scrum',
    hasPrototyping: false,
    hasUncertainty: true,
    framework: 'scrum',
    initial: { budget: 590000, weeks: 12, scope: 14, sprintLength: 2, teamSize: 5, quality: 85, morale: 76, stress: 22, knowledge: 34 },
    weeklyCostPerPerson: 8000,
    sprints: 6,
    valueTarget: 560,
    backlog: [
      { id: 'shipment_track', name: 'Real-time shipment tracking',   nameFr: 'Suivi des expéditions en temps réel', nameEs: 'Seguimiento de envíos en tiempo real', nameVi: 'Theo dõi lô hàng thời gian thực',   points: 8, value: 100, uncertainty: 0.15, must: true },
      { id: 'carrier_api',    name: 'Carrier API integrations',      nameFr: 'Intégrations API des transporteurs', nameEs: 'Integraciones de API de transportistas', nameVi: 'Tích hợp API nhà vận chuyển',    points: 5, value: 80,  uncertainty: 0.3,  must: true },
      { id: 'eta_predict',    name: 'Predictive ETAs',               nameFr: 'Heures d\u2019arrivée prédictives', nameEs: 'ETAs predictivos', nameVi: 'ETA dự đoán',    points: 5, value: 70,  uncertainty: 0.4 },
      { id: 'alerts',         name: 'Exception alerts',              nameFr: 'Alertes d\u2019exception', nameEs: 'Alertas de excepciones', nameVi: 'Cảnh báo ngoại lệ',             points: 3, value: 65,  uncertainty: 0.15 },
      { id: 'customer_portal', name: 'Customer portal',              nameFr: 'Portail client', nameEs: 'Portal de clientes', nameVi: 'Cổng khách hàng',                        points: 5, value: 60,  uncertainty: 0.25 },
      { id: 'inventory_view', name: 'Network inventory view',        nameFr: 'Vue d\u2019inventaire réseau', nameEs: 'Vista de inventario de red', nameVi: 'Xem tồn kho toàn mạng lưới',         points: 5, value: 55,  uncertainty: 0.25 },
      { id: 'reroute',        name: 'Dynamic rerouting',             nameFr: 'Réacheminement dynamique', nameEs: 'Reenrutamiento dinámico', nameVi: 'Định tuyến lại linh hoạt',              points: 5, value: 50,  uncertainty: 0.35 },
      { id: 'docs_pod',       name: 'Digital proof of delivery',     nameFr: 'Preuve de livraison numérique', nameEs: 'Prueba de entrega digital', nameVi: 'Bằng chứng giao hàng số',         points: 3, value: 45,  uncertainty: 0.15 },
      { id: 'analytics',      name: 'Performance analytics',         nameFr: 'Analyses de performance', nameEs: 'Analíticas de desempeño', nameVi: 'Phân tích hiệu suất',               points: 3, value: 40,  uncertainty: 0.2 },
      { id: 'mobile_app',     name: 'Driver mobile app',             nameFr: 'Application mobile chauffeur', nameEs: 'App móvil para conductores', nameVi: 'Ứng dụng di động cho tài xế',          points: 5, value: 38,  uncertainty: 0.3 },
      { id: 'carbon_report',  name: 'Carbon footprint reports',      nameFr: 'Rapports d\u2019empreinte carbone', nameEs: 'Reportes de huella de carbono', nameVi: 'Báo cáo dấu chân carbon',    points: 3, value: 35,  uncertainty: 0.25 },
      { id: 'geofence',       name: 'Geofenced yard check-in',       nameFr: 'Enregistrement de cour géorepéré', nameEs: 'Check-in de patio con geocerca', nameVi: 'Check-in bãi xe bằng geofencing',      points: 3, value: 30,  uncertainty: 0.2 },
      { id: 'erp_hooks',      name: 'ERP integration hooks',         nameFr: 'Connecteurs ERP', nameEs: 'Conectores de integración ERP', nameVi: 'Móc tích hợp ERP',                       points: 3, value: 28,  uncertainty: 0.2 },
      { id: 'darkmode',       name: 'Dark-mode UI',                  nameFr: 'Interface mode sombre', nameEs: 'Interfaz en modo oscuro', nameVi: 'Giao diện chế độ tối',                 points: 2, value: 10,  uncertainty: 0.1 }
    ],
    pivot: {
      sprint: 3,
      title: 'Port Disruption',
      titleFr: 'Perturbation portuaire', titleEs: 'Disrupción portuaria', titleVi: 'Gián đoạn cảng',
      description: 'A port strike strands 400 customer containers and the phones are melting. Dynamic rerouting jumps in value (50\u219295), yard geofencing can wait (30\u219215), and the COO demands a disruption control tower. How do you respond?',
      descriptionFr: 'Une grève portuaire immobilise 400 conteneurs de clients et les téléphones explosent. Le réacheminement dynamique bondit en valeur (50\u219295), le géorepérage de cour peut attendre (30\u219215), et le chef de l\u2019exploitation exige une tour de contrôle des perturbations. Comment répondez-vous ?', descriptionEs: 'Una huelga portuaria deja varados 400 contenedores de clientes y los teléfonos arden. El reenrutamiento dinámico salta en valor (50→95), la geocerca de patio puede esperar (30→15), y el COO exige una torre de control de disrupciones. ¿Cómo respondes?', descriptionVi: 'Đình công ở cảng khiến 400 container của khách mắc kẹt và điện thoại reo cháy máy. Định tuyến lại linh hoạt vọt giá trị (50→95), geofencing bãi xe có thể chờ (30→15), và COO đòi một tháp điều hành gián đoạn. Bạn phản ứng thế nào?',
      changes: [{ id: 'reroute', value: 95 }, { id: 'geofence', value: 15 }],
      retire: 'darkmode',
      newItem: { id: 'disruption_tower', name: 'Disruption control tower', nameFr: 'Tour de contrôle des perturbations', nameEs: 'Torre de control de disrupciones', nameVi: 'Tháp điều hành gián đoạn', points: 5, value: 85, uncertainty: 0.3, rank: 2.5 }
    },
    ceremonies: ['sprint_planning', 'standup', 'sprint_review', 'retrospective', 'refine_backlog'],
    scoringStrategy: 'scrum'
  },

  // ============================================
  // MARKETING — Aurora Brands
  // ============================================

  launch_window: {
    id: 'launch_window',
    category: 'marketing',
    title: 'Launch Window',
    subtitle: 'National Product Launch',
    icon: '🚀',
    difficulty: 'Advanced',
    difficultyColor: '#f59e0b',
    description: 'Campaign director at Aurora Brands. Launch a new beverage nationally — brand, media buy, retail rollout — against a fixed launch date. Test markets are your prototypes.',
    company: 'Aurora Brands',
    projectName: 'Solstice Beverage Launch',
    deliverable: 'campaign tracks',
    pedagogicalFocus: 'risk',
    hasPrototyping: true, // test markets & focus groups
    hasUncertainty: true,
    initial: { budget: 890000, weeks: 12, scope: 12, teamSize: 10, quality: 84, morale: 78, stress: 24, knowledge: 35 },
    weeklyCostPerPerson: 6500,
    causalEvents: [
      {
        id: 'focus_group_flop',
        title: 'The Messaging Isn\u2019t Landing',
        description: 'Tracking shows the hero campaign confuses the target demo. A test market would have caught this before the media buy.',
        titleFr: 'Le message ne passe pas', titleEs: 'El mensaje no conecta', titleVi: 'Thông điệp không chạm',
        descriptionFr: 'Le suivi montre que la campagne principale confond la cible. Un marché test l\'aurait détecté avant l\'achat média.', descriptionEs: 'El tracking muestra que la campaña principal confunde al público objetivo. Un mercado de prueba lo habría detectado antes de la compra de medios.', descriptionVi: 'Số liệu cho thấy chiến dịch chủ đạo gây bối rối cho nhóm mục tiêu. Thị trường thử nghiệm đã có thể phát hiện trước khi mua quảng cáo.',
        icon: '🎯',
        triggerCondition: (state) => state.week >= 4,
        prototypeModifier: true,
        options: [
          { id: 'reshoot', label: 'Re-shoot the hero creative', labelFr: 'Retourner la création principale', labelEs: 'Volver a filmar la creatividad principal', labelVi: 'Quay lại ấn phẩm chủ đạo', effects: { budget: -90000, schedule: -1, quality: 12 } },
          { id: 'recut', label: 'Re-cut existing footage with new copy', labelFr: 'Remonter les images existantes avec un nouveau texte', labelEs: 'Reeditar el material existente con nuevo copy', labelVi: 'Dựng lại footage sẵn có với thông điệp mới', effects: { budget: -30000, quality: 5 } },
          { id: 'push_through', label: 'Trust the plan, push through (risky)', labelFr: 'Faire confiance au plan, foncer (risqué)', labelEs: 'Confiar en el plan, empujar (riesgoso)', labelVi: 'Tin kế hoạch, cứ băng qua (rủi ro)', effects: { quality: -12, stress: 10 } }
        ]
      },
      {
        id: 'retailer_pullback',
        title: 'Key Retailer Cuts Shelf Space',
        description: 'Your anchor retailer halves the promised end-cap displays three weeks before launch.',
        titleFr: 'Un détaillant clé réduit l\'espace tablette', titleEs: 'Un minorista clave recorta espacio en estantes', titleVi: 'Nhà bán lẻ chủ chốt cắt kệ trưng bày',
        descriptionFr: 'Votre détaillant pivot réduit de moitié les présentoirs de bout d\'allée promis, trois semaines avant le lancement.', descriptionEs: 'Tu minorista ancla reduce a la mitad las exhibiciones de punta de góndola prometidas tres semanas antes del lanzamiento.', descriptionVi: 'Nhà bán lẻ trụ cột cắt nửa số kệ đầu dãy đã hứa, ba tuần trước ngày ra mắt.',
        icon: '🏪',
        triggerCondition: (state) => state.week >= 6,
        options: [
          { id: 'trade_deal', label: 'Sweeten the trade promotion', labelFr: 'Bonifier la promotion commerciale', labelEs: 'Endulzar la promoción comercial', labelVi: 'Tăng ưu đãi thương mại', effects: { budget: -70000, quality: 5 } },
          { id: 'shift_dtc', label: 'Shift budget to direct-to-consumer', labelFr: 'Basculer le budget vers la vente directe', labelEs: 'Mover presupuesto a venta directa al consumidor', labelVi: 'Chuyển ngân sách sang bán trực tiếp', effects: { budget: -25000, knowledge: 10, quality: 3 } },
          { id: 'accept', label: 'Accept reduced distribution', labelFr: 'Accepter la distribution réduite', labelEs: 'Aceptar la distribución reducida', labelVi: 'Chấp nhận phân phối bị thu hẹp', effects: { quality: -8, morale: -5 } }
        ]
      },
      {
        id: 'influencer_scandal',
        title: 'Spokesperson Scandal',
        description: 'Your launch ambassador is trending for all the wrong reasons. The stressed team is split on how hard to cut ties.',
        titleFr: 'Scandale du porte-parole', titleEs: 'Escándalo del vocero', titleVi: 'Bê bối người phát ngôn',
        descriptionFr: 'Votre ambassadeur de lancement fait les manchettes pour les mauvaises raisons. L\'équipe stressée est divisée sur la rupture à opérer.', descriptionEs: 'Tu embajador de lanzamiento es tendencia por las razones equivocadas. El equipo estresado está dividido sobre qué tan fuerte cortar lazos.', descriptionVi: 'Đại sứ ra mắt của bạn lên xu hướng vì những lý do tồi tệ. Đội đang căng thẳng chia rẽ về mức độ cắt đứt quan hệ.',
        icon: '📵',
        triggerCondition: (state) => state.week >= 7 && state.team.stress > 45,
        options: [
          { id: 'clean_break', label: 'Terminate, restage with creator collective', labelFr: 'Rompre, relancer avec un collectif de créateurs', labelEs: 'Terminar, relanzar con un colectivo de creadores', labelVi: 'Chấm dứt, làm lại với nhóm nhà sáng tạo', effects: { budget: -60000, quality: 8, morale: 5, stress: -6 } },
          { id: 'quiet_pause', label: 'Quietly pause the partnership', labelFr: 'Suspendre discrètement le partenariat', labelEs: 'Pausar discretamente la alianza', labelVi: 'Âm thầm tạm dừng hợp tác', effects: { budget: -15000, quality: -3 } },
          { id: 'ride_it', label: 'Ride it out (risky)', labelFr: 'Laisser passer l\'orage (risqué)', labelEs: 'Aguantar el temporal (riesgoso)', labelVi: 'Cắn răng chịu trận (rủi ro)', effects: { quality: -10, morale: -8, stress: 10 } }
        ]
      },
      {
        id: 'competitor_preempt',
        title: 'Competitor Launches First',
        description: 'A competitor moves its launch two weeks ahead of yours. Change arrives — what do you trade?',
        titleFr: 'Le concurrent lance en premier', titleEs: 'El competidor lanza primero', titleVi: 'Đối thủ ra mắt trước',
        descriptionFr: 'Un concurrent devance son lancement de deux semaines avant le vôtre. Le changement arrive — qu\'échangez-vous ?', descriptionEs: 'Un competidor adelanta su lanzamiento dos semanas antes que el tuyo. El cambio llega — ¿qué intercambias?', descriptionVi: 'Đối thủ đẩy ngày ra mắt lên hai tuần trước bạn. Thay đổi đã đến — bạn đánh đổi gì?',
        icon: '⚡',
        triggerCondition: (state) => state.week >= 5 && state.scope.quality > 80,
        options: [
          { id: 'reprioritize', label: 'Absorb it: sharpen differentiation, drop a low-value track', labelFr: 'Absorber : affûter la différenciation, abandonner un volet de faible valeur', labelEs: 'Absorberlo: afilar la diferenciación, soltar un frente de bajo valor', labelVi: 'Hấp thụ: mài sắc khác biệt, bỏ một luồng giá trị thấp', effects: { scope: 0, morale: 3, knowledge: 6, stress: 4 } },
          { id: 'accelerate', label: 'Pull the launch forward (crunch)', labelFr: 'Devancer le lancement (crunch)', labelEs: 'Adelantar el lanzamiento (crunch)', labelVi: 'Kéo ngày ra mắt lên sớm (tăng tốc)', effects: { schedule: -1, morale: -10, stress: 15, quality: -5 } },
          { id: 'ignore', label: 'Stick to the plan unchanged', labelFr: 'S\'en tenir au plan sans changement', labelEs: 'Mantener el plan sin cambios', labelVi: 'Bám kế hoạch, không đổi gì', effects: { morale: 2, stress: -3, quality: -4 } }
        ]
      }
    ]
  },

  rebrand_rollout: {
    id: 'rebrand_rollout',
    category: 'marketing',
    title: 'Rebrand',
    subtitle: 'Corporate Rebrand Rollout',
    icon: '🎨',
    difficulty: 'Standard',
    difficultyColor: '#3b82f6',
    description: 'Brand PM at Aurora Brands. Roll the new identity across packaging, signage, web and 40 franchise locations — ten tracks, one reveal date.',
    company: 'Aurora Brands',
    projectName: 'Aurora Identity Rollout',
    deliverable: 'rollout tracks',
    pedagogicalFocus: 'mechanics',
    hasPrototyping: false,
    hasUncertainty: false,
    initial: { budget: 460000, weeks: 10, scope: 10, teamSize: 7, quality: 85, morale: 78, stress: 20, knowledge: 45 },
    weeklyCostPerPerson: 5500,
    causalEvents: [
      {
        id: 'logo_leak',
        title: 'The New Logo Leaks',
        description: 'A print vendor posts the unreleased identity on social media. Design Twitter has opinions.',
        titleFr: 'Le nouveau logo fuit', titleEs: 'Se filtra el nuevo logo', titleVi: 'Logo mới bị rò rỉ',
        descriptionFr: 'Un imprimeur publie l\'identité non dévoilée sur les réseaux sociaux. Le Twitter du design a des opinions.', descriptionEs: 'Un proveedor de imprenta publica la identidad inédita en redes sociales. El Twitter del diseño tiene opiniones.', descriptionVi: 'Một nhà in đăng bộ nhận diện chưa công bố lên mạng xã hội. Giới thiết kế trên Twitter bắt đầu bàn tán.',
        icon: '📱',
        triggerCondition: (state) => state.week >= 4,
        options: [
          { id: 'own_it', label: 'Own it: accelerate the teaser campaign', labelFr: 'L\'assumer : accélérer la campagne teaser', labelEs: 'Asumirlo: acelerar la campaña teaser', labelVi: 'Nhận luôn: đẩy nhanh chiến dịch nhá hàng', effects: { budget: -30000, morale: 8, quality: 5, stress: 5 } },
          { id: 'takedowns', label: 'Legal takedowns and silence', labelFr: 'Retraits juridiques et silence', labelEs: 'Retiros legales y silencio', labelVi: 'Gỡ bài bằng pháp lý và im lặng', effects: { budget: -15000, stress: 8 } },
          { id: 'ignore', label: 'Ignore the leak entirely', labelFr: 'Ignorer complètement la fuite', labelEs: 'Ignorar la filtración por completo', labelVi: 'Phớt lờ hoàn toàn vụ rò rỉ', effects: { quality: -5, morale: -3 } }
        ]
      },
      {
        id: 'franchise_resist',
        title: 'Franchisees Push Back',
        description: 'A dozen franchise owners refuse to pay their share of new signage. Morale on the rollout team is dipping.',
        titleFr: 'Résistance des franchisés', titleEs: 'Los franquiciados se resisten', titleVi: 'Bên nhượng quyền phản đối',
        descriptionFr: 'Une douzaine de franchisés refusent de payer leur part de la nouvelle signalisation. Le moral de l\'équipe de déploiement baisse.', descriptionEs: 'Una docena de franquiciados se niega a pagar su parte de la nueva señalización. La moral del equipo de despliegue está bajando.', descriptionVi: 'Chục chủ nhượng quyền từ chối trả phần biển hiệu mới. Tinh thần đội triển khai đang sa sút.',
        icon: '🪧',
        triggerCondition: (state) => state.week >= 5 && state.team.morale < 72,
        options: [
          { id: 'cost_share', label: 'Corporate cost-share program', labelFr: 'Programme de partage des coûts corporatif', labelEs: 'Programa corporativo de costos compartidos', labelVi: 'Chương trình chia sẻ chi phí từ công ty mẹ', effects: { budget: -50000, morale: 8, stress: -5 } },
          { id: 'phased_optin', label: 'Phased opt-in with deadline incentives', labelFr: 'Adhésion par phases avec incitatifs d\'échéance', labelEs: 'Adopción por fases con incentivos por fecha límite', labelVi: 'Tham gia theo giai đoạn với ưu đãi đúng hạn', effects: { budget: -20000, knowledge: 8 } },
          { id: 'mandate', label: 'Enforce the franchise agreement', labelFr: 'Faire respecter le contrat de franchise', labelEs: 'Hacer cumplir el contrato de franquicia', labelVi: 'Thực thi hợp đồng nhượng quyền', effects: { morale: -8, stress: 10, quality: -3 } }
        ]
      },
      {
        id: 'trademark_snag',
        title: 'Trademark Opposition',
        description: 'A regional company files an opposition to the new wordmark in one province. Legal wants direction before the reveal.',
        titleFr: 'Opposition de marque de commerce', titleEs: 'Oposición de marca', titleVi: 'Phản đối nhãn hiệu',
        descriptionFr: 'Une entreprise régionale dépose une opposition au nouveau mot-symbole dans une province. Le juridique veut une orientation avant le dévoilement.', descriptionEs: 'Una empresa regional presenta una oposición a la nueva marca denominativa en una provincia. Legal quiere dirección antes de la revelación.', descriptionVi: 'Một công ty khu vực nộp đơn phản đối nhãn hiệu chữ mới ở một tỉnh. Bộ phận pháp lý cần định hướng trước ngày công bố.',
        icon: '⚖️',
        triggerCondition: (state) => state.week >= 3 && state.scope.quality > 80,
        options: [
          { id: 'reprioritize', label: 'Absorb it: carve out the region, adjust the rollout order', labelFr: 'Absorber : isoler la région, ajuster l\'ordre de déploiement', labelEs: 'Absorberlo: separar la región, ajustar el orden del despliegue', labelVi: 'Hấp thụ: tách khu vực đó, điều chỉnh thứ tự triển khai', effects: { scope: 0, morale: 3, knowledge: 6, stress: 4 } },
          { id: 'settle', label: 'Negotiate a coexistence agreement', labelFr: 'Négocier une entente de coexistence', labelEs: 'Negociar un acuerdo de coexistencia', labelVi: 'Thương lượng thỏa thuận cùng tồn tại', effects: { budget: -40000, stress: -3 } },
          { id: 'fight', label: 'Fight the opposition (risky)', labelFr: 'Contester l\'opposition (risqué)', labelEs: 'Pelear la oposición (riesgoso)', labelVi: 'Đấu lại đơn phản đối (rủi ro)', effects: { budget: -25000, stress: 10, quality: -4 } }
        ]
      }
    ]
  },

  growthlab_scrum: {
    id: 'growthlab_scrum',
    category: 'marketing',
    title: 'GrowthLab',
    subtitle: 'Growth Experiments under Scrum',
    icon: '📣',
    difficulty: 'Expert',
    difficultyColor: '#dc2626',
    description: 'Product Owner of the growth squad at Aurora Brands. Build the growth engine one experiment at a time — marketing experiments hide brutal estimate uncertainty, and you cannot run them all.',
    company: 'Aurora Brands',
    projectName: 'Growth Marketing Engine',
    deliverable: 'backlog items',
    pedagogicalFocus: 'agile-scrum',
    hasPrototyping: false,
    hasUncertainty: true,
    framework: 'scrum',
    initial: { budget: 590000, weeks: 12, scope: 14, sprintLength: 2, teamSize: 5, quality: 85, morale: 78, stress: 24, knowledge: 30 },
    weeklyCostPerPerson: 8000,
    sprints: 6,
    valueTarget: 560,
    backlog: [
      { id: 'attribution',   name: 'Attribution & analytics base',  nameFr: 'Base d\u2019attribution et d\u2019analyses', nameEs: 'Base de atribución y analíticas', nameVi: 'Nền tảng attribution & phân tích', points: 8, value: 100, uncertainty: 0.25, must: true },
      { id: 'landing_ab',    name: 'Landing-page A/B engine',       nameFr: 'Moteur de tests A/B', nameEs: 'Motor A/B de landing pages', nameVi: 'Bộ máy A/B trang đích',                    points: 5, value: 80,  uncertainty: 0.3 },
      { id: 'email_flows',   name: 'Lifecycle email flows',         nameFr: 'Parcours courriel de cycle de vie', nameEs: 'Flujos de email de ciclo de vida', nameVi: 'Chuỗi email vòng đời',      points: 5, value: 70,  uncertainty: 0.2,  must: true },
      { id: 'paid_social',   name: 'Paid social campaigns',         nameFr: 'Campagnes sociales payantes', nameEs: 'Campañas de paid social', nameVi: 'Chiến dịch quảng cáo mạng xã hội',            points: 5, value: 65,  uncertainty: 0.35 },
      { id: 'seo_content',   name: 'SEO content engine',            nameFr: 'Moteur de contenu SEO', nameEs: 'Motor de contenido SEO', nameVi: 'Cỗ máy nội dung SEO',                  points: 5, value: 60,  uncertainty: 0.3 },
      { id: 'referral',      name: 'Referral program',              nameFr: 'Programme de parrainage', nameEs: 'Programa de referidos', nameVi: 'Chương trình giới thiệu',                points: 5, value: 55,  uncertainty: 0.4 },
      { id: 'crm_sync',      name: 'CRM integration',               nameFr: 'Intégration CRM', nameEs: 'Integración con CRM', nameVi: 'Tích hợp CRM',                        points: 3, value: 50,  uncertainty: 0.2 },
      { id: 'influencer',    name: 'Creator partnerships',          nameFr: 'Partenariats avec créateurs', nameEs: 'Alianzas con creadores', nameVi: 'Hợp tác nhà sáng tạo',            points: 3, value: 45,  uncertainty: 0.3 },
      { id: 'video_ads',     name: 'Short-form video ads',          nameFr: 'Publicités vidéo courtes', nameEs: 'Anuncios de video corto', nameVi: 'Quảng cáo video ngắn',               points: 5, value: 40,  uncertainty: 0.35 },
      { id: 'webinars',      name: 'Webinar funnel',                nameFr: 'Entonnoir de webinaires', nameEs: 'Embudo de webinars', nameVi: 'Phễu webinar',                points: 3, value: 35,  uncertainty: 0.2 },
      { id: 'loyalty',       name: 'Loyalty pilot',                 nameFr: 'Pilote de fidélisation', nameEs: 'Piloto de fidelización', nameVi: 'Thí điểm khách hàng thân thiết',                 points: 3, value: 30,  uncertainty: 0.25 },
      { id: 'podcast',       name: 'Brand podcast',                 nameFr: 'Balado de marque', nameEs: 'Podcast de marca', nameVi: 'Podcast thương hiệu',                       points: 3, value: 25,  uncertainty: 0.3 },
      { id: 'swag_store',    name: 'Merch store',                   nameFr: 'Boutique d\u2019articles promotionnels', nameEs: 'Tienda de merch', nameVi: 'Cửa hàng đồ lưu niệm', points: 2, value: 20,  uncertainty: 0.15 },
      { id: 'vanity_dash',   name: 'Vanity metrics dashboard',      nameFr: 'Tableau de métriques de vanité', nameEs: 'Tablero de métricas de vanidad', nameVi: 'Bảng số liệu phù phiếm',         points: 2, value: 10,  uncertainty: 0.1 }
    ],
    pivot: {
      sprint: 3,
      title: 'CAC Crisis',
      titleFr: 'Crise du coût d\u2019acquisition', titleEs: 'Crisis de CAC', titleVi: 'Khủng hoảng CAC',
      description: 'The board reviews acquisition costs and slashes the paid budget. Organic jumps in value — SEO content 60\u219290, paid social drops 65\u219230 — and the CMO demands a conversion-rate optimization push. How do you respond?',
      descriptionFr: 'Le conseil examine les coûts d\u2019acquisition et sabre le budget payant. L\u2019organique bondit en valeur — contenu SEO 60\u219290, social payant chute 65\u219230 — et la directrice marketing exige une poussée d\u2019optimisation du taux de conversion. Comment répondez-vous ?', descriptionEs: 'El directorio revisa los costos de adquisición y recorta el presupuesto pagado. Lo orgánico salta en valor — contenido SEO 60→90, paid social cae 65→30 — y el CMO exige un empuje de optimización de conversión. ¿Cómo respondes?', descriptionVi: 'Hội đồng rà soát chi phí thu hút khách và cắt mạnh ngân sách quảng cáo. Organic vọt giá trị — nội dung SEO 60→90, quảng cáo mạng xã hội tụt 65→30 — và CMO đòi một đợt tối ưu tỷ lệ chuyển đổi. Bạn phản ứng thế nào?',
      changes: [{ id: 'seo_content', value: 90 }, { id: 'paid_social', value: 30 }],
      retire: 'vanity_dash',
      newItem: { id: 'cro_push', name: 'Conversion-rate optimization', nameFr: 'Optimisation du taux de conversion', nameEs: 'Optimización de tasa de conversión', nameVi: 'Tối ưu tỷ lệ chuyển đổi', points: 5, value: 85, uncertainty: 0.3, rank: 2.5 }
    },
    ceremonies: ['sprint_planning', 'standup', 'sprint_review', 'retrospective', 'refine_backlog'],
    scoringStrategy: 'scrum'
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
  dms_dynamics: { budget: 45000, time: 1 },   // Sandbox pilot / migration dry run
  apex_biotech: { budget: 90000, time: 1 },   // Pilot cohort / dry-run site
  datacenter_exit: { budget: 25000, time: 0.5 }, // Pilot workload wave
  core_banking: { budget: 120000, time: 1 },  // Parallel-run rehearsal
  northbridge_dc: { budget: 35000, time: 0.5 }, // Pilot lane dry run
  launch_window: { budget: 30000, time: 0.5 },  // Test market / focus group
};

/*
 * CAUSAL CALCULATIONS
 */

// Calculate stress level based on multiple factors
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
  // v3 baseline discipline: re-planning once or twice is healthy adaptation;
  // only chronic thrash erodes team trust
  if (scheduleChanges <= 2) return { morale: 0, stress: 0 };
  if (scheduleChanges === 3) return { morale: -5, stress: 8 };
  return { morale: -12, stress: 15 }; // 4+ changes
};

// v3 scoring — agile-aligned fixes (see BizSim Review & Agile Expansion, Part 1.4):
// Fix 1: budget scored against a TARGET BAND, not maximal underspend (no hoarding)
// Fix 2: scope scored as DELIVERED VALUE (value-weighted features), not raw count
// Fix 3: "never change the deadline" bonus replaced by BASELINE DISCIPLINE
//        (deliberate re-planning is fine; chronic thrash is not)

// Value-weighted scope: features at the top of the priority list are worth
// more. Delivering N of T features (priority order) yields the cumulative
// value fraction below — "score delivered value, not feature count".
const valueDeliveredFraction = (completed, total) => {
  if (total <= 0) return 0;
  const n = Math.max(0, Math.min(total, completed));
  const w = (i) => 1.6 - (1.2 * i / Math.max(1, total - 1)); // 1.6x -> 0.4x avg value
  let sum = 0, all = 0;
  for (let i = 0; i < total; i++) {
    all += w(i);
    if (i < Math.floor(n)) sum += w(i);
  }
  const frac = n - Math.floor(n);
  if (Math.floor(n) < total) sum += w(Math.floor(n)) * frac;
  return all > 0 ? sum / all : 0;
};

// Budget target band: full marks for landing inside the band; points fall off
// for hoarding (underspend) AND overrun alike.
const budgetBandScore = (spent, total, pts = 200, bandLow = 0.75, bandHigh = 1.0) => {
  const r = total > 0 ? spent / total : 1;
  if (r >= bandLow && r <= bandHigh) return pts;
  const dist = r < bandLow ? (bandLow - r) : (r - bandHigh);
  return Math.max(0, Math.round(pts * (1 - dist * 4)));
};

const calculateScore = (state) => {
  // Band is measured against the PLANNED burn (team x weekly cost x weeks),
  // capped by the authorized budget. Legacy scenarios carry budgets far above
  // their real burn; without this, the 75-100% band was unreachable.
  const planned = state.plannedSpend || state.budget.total;
  const effectiveBudget = Math.min(state.budget.total, planned * 1.25);
  const budgetScore = budgetBandScore(state.budget.spent, effectiveBudget, 200);
  const scheduleScore = state.week <= state.schedule.deadline
    ? 200
    : Math.max(0, 200 - (state.week - state.schedule.deadline) * 40);
  const scopeScore = valueDeliveredFraction(state.scope.completed, state.scope.totalFeatures) * 200;
  const qualityScore = (state.scope.quality / 100) * 200;

  // Team process score (HBP has this as 100 points)
  const avgMorale = state.moraleHistory
    ? state.moraleHistory.reduce((a, b) => a + b, 0) / state.moraleHistory.length
    : state.team.morale;
  const teamProcessScore = (avgMorale / 100) * 100;

  // Baseline discipline: up to 2 deliberate re-plans are free (adaptation);
  // only chronic schedule thrash forfeits the bonus
  const consistencyBonus = state.scheduleChanges <= 2 ? 50 : state.scheduleChanges === 3 ? 25 : 0;

  // Prototype bonus (if applicable and prototypes were built)
  const prototypeBonus = state.prototypesBuilt > 0 ? state.prototypesBuilt * 25 : 0;

  return Math.min(1000, Math.round(budgetScore + scheduleScore + scopeScore + qualityScore + teamProcessScore + consistencyBonus + prototypeBonus));
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

// ============================================
// AGILE ENGINE LAYER (v3)
// Value-weighted backlog + pluggable scoring + Scrum sprint loop.
// The causal core (stress -> morale -> productivity -> rework) is reused as-is.
// ============================================

// ANNA per-framework coaching vocabulary, appended to her prompt
const FRAMEWORK_COACHING = {
  scrum: `This is a SCRUM simulation. Coach with: sprint goal, velocity, "yesterday's weather", carryover, WIP, Definition of Done. Nudge the student to commit to OBSERVED velocity (not hope), to protect the sprint goal during the pivot, and to treat the retrospective as the compounding lever. On over-commitment, name the carryover cost. On gold-plating, ask "what's the most valuable thing not yet started?". Remember: in this scenario re-prioritising is free — failing to deliver value is what costs points.`,
  kanban: `This is a KANBAN simulation. Coach with: WIP limits, pull, cycle time, throughput, bottleneck, aging, class of service. Challenge starting new work when the board is congested ("stop starting, start finishing"); point to the constraint, not the busiest column.`
};

// Retrospective improvements — one pick per sprint, effects compound
const RETRO_IMPROVEMENTS = [
  {
    id: 'test_automation', icon: '🧪',
    name: 'Invest in test automation', nameFr: 'Investir en automatisation des tests', nameEs: 'Invertir en automatización de pruebas', nameVi: 'Đầu tư tự động hóa kiểm thử',
    desc: 'Quality stops eroding week to week and slowly recovers. Fewer escaped defects.',
    descFr: 'La qualité cesse de s’éroder de semaine en semaine et récupère lentement. Moins de défauts échappés.', descEs: 'La calidad deja de erosionarse semana a semana y se recupera lentamente. Menos defectos escapados.', descVi: 'Chất lượng ngừng bào mòn theo tuần và hồi phục dần. Ít lỗi lọt hơn.'
  },
  {
    id: 'sustainable_pace', icon: '🌱',
    name: 'Sustainable-pace working agreement', nameFr: 'Entente de rythme soutenable', nameEs: 'Acuerdo de trabajo de ritmo sostenible', nameVi: 'Thỏa thuận nhịp độ bền vững',
    desc: 'Stress −10 now; future stress build-up is dampened by 15%.',
    descFr: 'Stress −10 immédiatement; l’accumulation future de stress est réduite de 15%.', descEs: 'Estrés −10 ahora; la acumulación futura de estrés se amortigua 15%.', descVi: 'Căng thẳng −10 ngay; tích tụ căng thẳng về sau giảm 15%.'
  },
  {
    id: 'refinement_discipline', icon: '🔍',
    name: 'Backlog refinement discipline', nameFr: 'Discipline de raffinement du backlog', nameEs: 'Disciplina de refinamiento del backlog', nameVi: 'Kỷ luật tinh chỉnh backlog',
    desc: 'Estimate uncertainty halved on all remaining backlog items.',
    descFr: 'Incertitude d’estimation réduite de moitié sur tous les éléments restants.', descEs: 'Incertidumbre de estimación reducida a la mitad en todos los ítems restantes.', descVi: 'Độ bất định ước lượng giảm nửa cho mọi hạng mục còn lại.'
  },
  {
    id: 'team_coaching', icon: '🎓',
    name: 'Pairing & coaching culture', nameFr: 'Culture de pairage et coaching', nameEs: 'Cultura de pairing y coaching', nameVi: 'Văn hóa làm cặp & kèm cặp',
    desc: 'Knowledge +10 now; small permanent velocity boost.',
    descFr: 'Connaissances +10 immédiatement; petit gain permanent de vélocité.', descEs: 'Conocimiento +10 ahora; pequeño impulso permanente de velocidad.', descVi: 'Kiến thức +10 ngay; velocity tăng nhẹ vĩnh viễn.'
  }
];

// Scrum causal events (condition-triggered, like the classic engine)
const SCRUM_EVENTS = {
  the_pivot: {
    id: 'the_pivot', icon: '🔄', type: 'stakeholder_change',
    title: 'Investor Pivot', titleFr: 'Pivot investisseur', titleEs: 'Pivote del inversionista', titleVi: 'Cú xoay trục của nhà đầu tư',
    description: 'After the Sprint 3 demo, your lead investor shifts priorities: fraud protection is now critical (value 80→95), multi-currency can wait (55→30), and they want a new "Real-time payouts" capability. Welcome changing requirements — how do you respond?',
    descriptionFr: 'Après la démo du sprint 3, votre investisseur principal change les priorités : l’antifraude devient critique (valeur 80→95), le multidevises peut attendre (55→30), et il veut une nouvelle capacité « Paiements en temps réel ». Accueillir le changement — comment répondez-vous ?', descriptionEs: 'Tras la demo del Sprint 3, tu inversionista principal cambia las prioridades: la protección antifraude ahora es crítica (valor 80→95), la multimoneda puede esperar (55→30), y quieren una nueva capacidad de "Pagos en tiempo real". Acoge el cambio de requisitos — ¿cómo respondes?', descriptionVi: 'Sau demo Sprint 3, nhà đầu tư chính đổi ưu tiên: chống gian lận giờ là tối quan trọng (giá trị 80→95), đa tiền tệ có thể chờ (55→30), và họ muốn năng lực mới "Chi trả thời gian thực". Đón nhận thay đổi yêu cầu — bạn phản ứng thế nào?',
    options: [
      { id: 'absorb', label: 'Absorb the change: re-rank the backlog and add the new item', labelFr: 'Absorber le changement : reclasser le backlog et ajouter le nouvel élément', labelEs: 'Absorber el cambio: re-ordenar el backlog y agregar el nuevo ítem', labelVi: 'Hấp thụ thay đổi: xếp lại backlog và thêm hạng mục mới', effectsNote: 'Stress +5 · new high-value item enters the backlog · low-value work retired' },
      { id: 'negotiate', label: 'Negotiate a partial re-plan (add item, keep current sprint intact)', labelFr: 'Négocier une re-planification partielle (ajouter l’élément, garder le sprint intact)', labelEs: 'Negociar una re-planificación parcial (agregar el ítem, mantener el sprint actual intacto)', labelVi: 'Thương lượng tái hoạch định một phần (thêm hạng mục, giữ nguyên sprint hiện tại)', effectsNote: 'Stress +8, Morale −3 · new item enters with higher uncertainty' },
      { id: 'refuse', label: 'Protect the original plan and decline the change', labelFr: 'Protéger le plan initial et refuser le changement', labelEs: 'Proteger el plan original y rechazar el cambio', labelVi: 'Bảo vệ kế hoạch gốc và từ chối thay đổi', effectsNote: 'Morale +3 now · but market values shift anyway — planned work is worth less' }
    ]
  },
  velocity_crash: {
    id: 'velocity_crash', icon: '🤒', type: 'capacity',
    title: 'Key Engineer Out', titleFr: 'Ingénieur clé absent', titleEs: 'Baja de un ingeniero clave', titleVi: 'Kỹ sư chủ chốt vắng mặt',
    description: 'Your senior engineer is out for this entire sprint. Sustained high stress made it worse. How do you handle the capacity loss?',
    descriptionFr: 'Votre ingénieur senior est absent pour tout le sprint. Le stress soutenu a aggravé la situation. Comment gérez-vous la perte de capacité ?', descriptionEs: 'Tu ingeniero senior está de baja durante todo este sprint. El estrés alto sostenido lo empeoró. ¿Cómo manejas la pérdida de capacidad?', descriptionVi: 'Kỹ sư cấp cao của bạn vắng trọn sprint này. Căng thẳng cao kéo dài làm mọi thứ tệ hơn. Bạn xử lý hụt năng lực thế nào?',
    options: [
      { id: 'sustain', label: 'Protect the sprint goal: de-scope and hold a sustainable pace', labelFr: 'Protéger l’objectif de sprint : réduire le périmètre, rythme soutenable', labelEs: 'Proteger la meta del sprint: reducir alcance y mantener un ritmo sostenible', labelVi: 'Bảo vệ mục tiêu sprint: giảm phạm vi và giữ nhịp độ bền vững', effectsNote: 'Capacity −20% this sprint · Morale +5, Stress −5' },
      { id: 'crunch', label: 'Crunch to hold the full commitment', labelFr: 'Mode intensif pour tenir l’engagement complet', labelEs: 'Crunch para sostener el compromiso completo', labelVi: 'Tăng tốc để giữ nguyên cam kết', effectsNote: 'Full capacity · Morale −15, Stress +20 · crunch penalty at scoring' }
    ]
  },
  carryover_spiral: {
    id: 'carryover_spiral', icon: '🌀', type: 'process',
    title: 'Carryover Spiral', titleFr: 'Spirale de report', titleEs: 'Espiral de arrastre', titleVi: 'Vòng xoáy dời việc',
    description: 'Two sprints in a row the team failed to finish what it committed to. Unfinished work is piling up and the team feels like it is always failing. Morale −10, Stress +15. Commit to your OBSERVED velocity, not your hoped-for velocity.',
    descriptionFr: 'Deux sprints de suite, l’équipe n’a pas terminé ce qu’elle s’était engagée à livrer. Le travail inachevé s’accumule et l’équipe a l’impression d’échouer en permanence. Moral −10, Stress +15. Engagez-vous sur votre vélocité OBSERVÉE, pas votre vélocité espérée.', descriptionEs: 'Dos sprints seguidos el equipo no terminó lo que comprometió. El trabajo inconcluso se acumula y el equipo siente que siempre falla. Moral −10, Estrés +15. Comprométete con tu velocidad OBSERVADA, no con la deseada.', descriptionVi: 'Hai sprint liên tiếp đội không hoàn thành cam kết. Việc dở dang chất đống và đội cảm thấy mình luôn thất bại. Tinh thần −10, Căng thẳng +15. Hãy cam kết theo velocity QUAN SÁT ĐƯỢC, không phải velocity mơ ước.',
    options: [
      { id: 'acknowledge', label: 'Acknowledge — next sprint, commit to observed velocity', labelFr: 'Compris — au prochain sprint, engagement basé sur la vélocité observée', labelEs: 'Reconocer — el próximo sprint, comprometerse según la velocidad observada', labelVi: 'Ghi nhận — sprint tới, cam kết theo velocity quan sát được', effectsNote: '' }
    ]
  },
  dod_debt: {
    id: 'dod_debt', icon: '🐛', type: 'quality',
    title: 'Definition-of-Done Debt', titleFr: 'Dette de définition de terminé', titleEs: 'Deuda de Definition of Done', titleVi: 'Nợ Definition of Done',
    description: 'Latent defects from earlier "done" work surfaced during the demo. Stakeholders lost some confidence — 15% of this sprint\'s booked value was clawed back. "Done" must mean done.',
    descriptionFr: 'Des défauts latents de travaux « terminés » ont émergé pendant la démo. Les parties prenantes ont perdu confiance — 15% de la valeur comptabilisée ce sprint a été retranchée. « Terminé » doit vouloir dire terminé.', descriptionEs: 'Defectos latentes de trabajo antes marcado como "hecho" aparecieron en la demo. Los interesados perdieron confianza — se restó 15% del valor registrado de este sprint. "Hecho" debe significar hecho.', descriptionVi: 'Lỗi tiềm ẩn từ việc từng được coi là "xong" bung ra trong buổi demo. Các bên liên quan mất niềm tin — 15% giá trị ghi nhận sprint này bị lấy lại. "Xong" phải thật sự là xong.',
    options: [
      { id: 'acknowledge', label: 'Acknowledge — honour the Definition of Done', labelFr: 'Compris — respecter la définition de terminé', labelEs: 'Reconocer — honrar la Definition of Done', labelVi: 'Ghi nhận — tôn trọng Definition of Done', effectsNote: '' }
    ]
  }
};

const SCRUM_INITIAL_VELOCITY_FORECAST = 8; // "yesterday's weather" before sprint 1

const createScrumInitialState = (scenario) => ({
  scenario: scenario.id,
  framework: 'scrum',
  sprint: 1,
  totalSprints: scenario.sprints,
  sprintLength: scenario.initial.sprintLength,
  weekInSprint: 0,
  week: 1,
  totalWeeks: scenario.initial.weeks,
  phase: 'planning', // planning | executing | review | retro (+ currentEvent overlay)
  budget: { total: scenario.initial.budget, spent: 0 },
  team: {
    size: scenario.initial.teamSize,
    morale: scenario.initial.morale,
    productivity: 1.0,
    stress: scenario.initial.stress,
    knowledge: scenario.initial.knowledge
  },
  quality: scenario.initial.quality,
  backlog: scenario.backlog.map((b, i) => ({
    ...b, rank: i, state: 'backlog', donePoints: 0, truePoints: null, carryover: false
  })),
  valueTarget: scenario.valueTarget,
  valueDelivered: 0,
  velocityHistory: [],
  commitHistory: [],
  sprintValueHistory: [],
  sprintPointsDone: 0,
  escapedDefects: 0,
  dodDebtPending: false,
  crunchUsed: 0,
  carryoverStreak: 0,
  meetings: { standup: false },
  actionsUsed: {},
  improvements: [],
  refinedThisSprint: false,
  capacityHit: false,
  pivotHandled: null,
  currentEvent: null,
  queuedEvents: [],
  lastSprintSummary: null,
  moraleHistory: [scenario.initial.morale],
  decisions: [],
  triggeredEvents: [],
  gamePhase: 'playing',
  startTime: Date.now()
});

// Weekly story-point capacity — reuses the classic causal chain
const scrumPointsPerWeek = (state) => {
  const prod = calculateProductivityFromMorale(state.team.productivity, state.team.morale);
  const mistakes = calculateMistakeRate(state.team.knowledge, state.meetings?.standup);
  let pts = state.team.size * prod * (state.team.morale / 100) * (1 - mistakes) * 1.05;
  if (state.improvements.includes('team_coaching')) pts *= 1.04;
  if (state.capacityHit) pts *= 0.8; // velocity-crash sprint, sustainable choice
  return pts;
};

// Scrum scoring strategy — 1000 pts. Deliberate inversion of the classic
// model: no fixed-deadline penalty, no "never re-plan" bonus.
const calculateScrumScoreBreakdown = (state) => {
  const valueScore = Math.min(1, state.valueDelivered / state.valueTarget) * 300;
  const predArr = state.commitHistory.map((c, i) => {
    if (!c) return 1;
    const done = state.velocityHistory[i] || 0;
    return Math.max(0, 1 - Math.abs(done - c) / c);
  });
  const predictability = predArr.length ? predArr.reduce((a, b) => a + b, 0) / predArr.length : 0;
  const predictabilityScore = predictability * 150;
  const qualityScore = Math.max(0, (state.quality / 100) * 200 - state.escapedDefects * 15);
  const pivotPts = state.pivotHandled === 'absorb' ? 100
    : state.pivotHandled === 'negotiate' ? 60
    : state.pivotHandled === 'refuse' ? 20 : 50;
  const pivotDelivered = state.backlog.find(b => b.pivotItem);
  const responsivenessScore = Math.min(150, pivotPts + (pivotDelivered && pivotDelivered.state === 'done' ? 50 : 0));
  const avgMorale = state.moraleHistory.reduce((a, b) => a + b, 0) / state.moraleHistory.length;
  const teamScore = Math.max(0, (avgMorale / 100) * 150 - state.crunchUsed * 12);
  const budgetScore = budgetBandScore(state.budget.spent, state.budget.total, 50, 0.8, 1.0);
  return {
    value: Math.round(valueScore), valueMax: 300,
    predictability: Math.round(predictabilityScore), predictabilityMax: 150,
    quality: Math.round(qualityScore), qualityMax: 200,
    responsiveness: Math.round(responsivenessScore), responsivenessMax: 150,
    team: Math.round(teamScore), teamMax: 150,
    budget: Math.round(budgetScore), budgetMax: 50,
    avgMorale, predictabilityRatio: predictability
  };
};

const calculateScrumScore = (state) => {
  const b = calculateScrumScoreBreakdown(state);
  return b.value + b.predictability + b.quality + b.responsiveness + b.team + b.budget;
};

// Pluggable scoring strategies (Part 4, build step 1)
const SCORING_STRATEGIES = {
  classic: calculateScore,
  scrum: calculateScrumScore
};

const getScenarioScore = (scenario, state) =>
  (SCORING_STRATEGIES[scenario?.scoringStrategy] || calculateScore)(state);

// Enhanced initial state with new fields
const createApexInitialState = (scenario) => ({
  scenario: scenario.id,
  plannedSpend: scenario.initial.teamSize * scenario.weeklyCostPerPerson * scenario.initial.weeks,
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

export default function BizSimHub() {
  // Language state - persisted in localStorage
  const [lang, setLang] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('bizsimhub-lang') || 'en';
    }
    return 'en';
  });
  
  const [currentPage, setCurrentPage] = useState('catalog'); // course edition: no landing page
  const [currentUser, setCurrentUser] = useState(null);
  const [authMode, setAuthMode] = useState('login');
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [resetToken, setResetToken] = useState(null);
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [checkoutLoading, setCheckoutLoading] = useState(null);
  const [userScores, setUserScores] = useState({ scores: [], bestScores: [] });
  const [courseAdmin, setCourseAdmin] = useState(null);
  const [adminExpanded, setAdminExpanded] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [toast, setToast] = useState(null);
  
  // Simulation state
  const [selectedSimulation, setSelectedSimulation] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState(null); // industry category pre-selection
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [gameState, setGameState] = useState(null);
  const [simPhase, setSimPhase] = useState('select');
  
  // NEW: How to Play modal
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  
  // NEW: Paywall modal for free users
  const [showPaywall, setShowPaywall] = useState(false);
  const FREE_TRIAL_WEEKS = 3; // Allow free users to play until week 3
  
  // NEW: Brief tab for HBP-style intro
  const [briefTab, setBriefTab] = useState('brief');
  const [gameTab, setGameTab] = useState('overview');
  
  // Anna AI Advisor state
  const [annaVisible, setAnnaVisible] = useState(false);
  const [actionToast, setActionToast] = useState(null);
  const [annaLoading, setAnnaLoading] = useState(false);
  const [annaAdvice, setAnnaAdvice] = useState('');
  const [annaDebriefLoading, setAnnaDebriefLoading] = useState(false);
  const [annaDebrief, setAnnaDebrief] = useState('');

  // Toast helper
  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Save language preference
  useEffect(() => {
    localStorage.setItem('bizsimhub-lang', lang);
  }, [lang]);

  // Check for password reset token in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('reset_token');
    if (token) {
      setResetToken(token);
      setAuthMode('reset');
      setCurrentPage('auth');
    }
  }, []);

  // Check for existing session on load
  useEffect(() => {
    const checkAuth = async () => {
      const token = api.getToken();
      if (token) {
        try {
          const data = await api.getMe();
          setCurrentUser(data.user);
          setCurrentPage('dashboard');
          loadUserData();
        } catch (e) {
          api.setToken(null);
        }
      }
    };
    checkAuth();
    
    const params = new URLSearchParams(window.location.search);
    
    // Handle Google OAuth token
    const googleToken = params.get('token');
    if (googleToken) {
      api.setToken(googleToken);
      api.getMe().then(data => {
        setCurrentUser(data.user);
        setCurrentPage('dashboard');
        loadUserData();
        showToast('🎉 Successfully signed in with Google!', 'success');
      }).catch(() => {
        api.setToken(null);
        showToast('Authentication failed. Please try again.', 'error');
      });
      
      // Submit to HubSpot for new Google OAuth users
      const isNewUser = params.get('newUser') === 'true';
      const email = params.get('email');
      const name = params.get('name') || '';
      
      if (isNewUser && email) {
        const HUBSPOT_PORTAL_ID = '342933870';
        const HUBSPOT_FORM_GUID = '2bc1e72b-901a-45dd-9ea6-ea442fd0a125';
        
        const hubspotData = {
          fields: [
            { name: 'email', value: email },
            { name: 'firstname', value: name.split(' ')[0] || '' },
            { name: 'lastname', value: name.split(' ').slice(1).join(' ') || '' }
          ],
          context: {
            pageUri: window.location.href,
            pageName: 'Google OAuth Registration'
          }
        };

        fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_GUID}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(hubspotData)
        }).catch(err => console.log('HubSpot tracking:', err));
      }
      
      window.history.replaceState({}, '', window.location.pathname);
    }
    
    // Handle Google OAuth errors
    const authError = params.get('error');
    if (authError) {
      showToast('Google sign-in failed. Please try again.', 'error');
      window.history.replaceState({}, '', window.location.pathname);
    }
    
    // Check for success redirect from Stripe
    if (params.get('session_id')) {
      showToast('🎉 Payment successful! Your subscription is now active.', 'success');
      
      // HubSpot: Track payment conversion
      if (window._hsq) {
        window._hsq.push(['trackCustomBehavioralEvent', {
          name: 'pe_payment_complete',
          properties: { 
            session_id: params.get('session_id'),
            source: params.get('utm_source') || 'direct',
            medium: params.get('utm_medium') || 'organic',
            campaign: params.get('utm_campaign') || 'none'
          }
        }]);
      }
      
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  const loadUserData = async () => {
    try {
      const scoresData = await api.getScores();
      setUserScores(scoresData);
    } catch (e) {
      console.error('Failed to load user data:', e);
    }
  };

  // Auth handlers
  const handleLogin = async (email, password) => {
    setAuthLoading(true);
    setAuthError('');
    try {
      const data = await api.login(email, password);
      api.setToken(data.token);
      setCurrentUser(data.user);
      setCurrentPage('dashboard');
      loadUserData();
    } catch (e) {
      setAuthError(e.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignup = async (name, email, password) => {
    setAuthLoading(true);
    setAuthError('');
    try {
      const data = await api.register(name, email, password);
      api.setToken(data.token);
      setCurrentUser(data.user);
      setCurrentPage('dashboard');
      showToast(L(lang, { en: 'Welcome to BizSim! 🎉', fr: 'Bienvenue sur BizSim ! 🎉', es: '¡Bienvenido a BizSim! 🎉', vi: 'Chào mừng đến với BizSim! 🎉' }), 'success');
    } catch (e) {
      setAuthError(e.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    api.setToken(null);
    setCurrentUser(null);
    setSubscription(null);
    setUserScores({ scores: [], bestScores: [] });
    setCurrentPage('catalog');
  };

  // Stripe handlers
  const handleCheckout = async (planId) => {
    if (!currentUser) {
      setCurrentPage('auth');
      setAuthMode('signup');
      return;
    }
    
    // HubSpot: Track checkout initiation
    if (window._hsq) {
      window._hsq.push(['trackCustomBehavioralEvent', {
        name: 'pe_checkout_started',
        properties: { 
          plan: planId,
          billing_cycle: billingCycle,
          email: currentUser.email
        }
      }]);
    }
    
    setCheckoutLoading(planId);
    try {
      const data = await api.createCheckoutSession(planId, billingCycle);
      window.location.href = data.url;
    } catch (e) {
      showToast('Failed to start checkout. Please try again.', 'error');
    } finally {
      setCheckoutLoading(null);
    }
  };

  const handleManageSubscription = async () => {
    try {
      const data = await api.createPortalSession();
      window.location.href = data.url;
    } catch (e) {
      showToast('Failed to open subscription portal.', 'error');
    }
  };

  // Simulation handlers
  const startSimulation = (simId) => {
    setCategoryFilter(null);
    setSelectedSimulation(SIMULATIONS.find(s => s.id === simId));
    setSimPhase('select');
    setCurrentPage('simulation');
  };

  const startSimulationCategory = (catKey) => {
    setCategoryFilter(catKey);
    setSelectedSimulation(SIMULATIONS.find(s => s.id === 'project-apex'));
    setSimPhase('select');
    setCurrentPage('simulation');
  };

  const selectScenario = (scenario) => {
    setSelectedScenario(scenario);
    setSimPhase('brief');
  };

  const beginSimulation = () => {
    if (selectedScenario.framework === 'scrum') {
      setGameState(createScrumInitialState(selectedScenario));
    } else {
      setGameState(createApexInitialState(selectedScenario));
    }
    setSimPhase('playing');
    // Reset Anna advisor state
    setAnnaVisible(false);
    setGameTab('overview');
    setAnnaAdvice('');
    setAnnaDebrief('');
    setAnnaDebriefLoading(false);
  };

  // ENHANCED ACTION HANDLER with causal effects
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
      hire: { msg: L(lang, { en: '✅ New team member hired! → Morale +3, Stress +8, Knowledge −3', fr: '✅ Nouveau membre embauché ! → Moral +3, Stress +8, Connaissances −3', es: '✅ ¡Nuevo miembro contratado! → Moral +3, Estrés +8, Conocimiento −3', vi: '✅ Đã tuyển thành viên mới! → Tinh thần +3, Căng thẳng +8, Kiến thức −3' }), type: 'success' },
      fire: { msg: L(lang, { en: '⚠️ Team member removed. → Morale −12, Stress +10, Knowledge −8', fr: '⚠️ Membre retiré. → Moral −12, Stress +10, Connaissances −8', es: '⚠️ Miembro del equipo retirado. → Moral −12, Estrés +10, Conocimiento −8', vi: '⚠️ Đã loại thành viên khỏi nhóm. → Tinh thần −12, Căng thẳng +10, Kiến thức −8' }), type: 'warn' },
      quality_review: { msg: L(lang, { en: '✅ Quality review done! → Quality +5, Knowledge +2 ($10K)', fr: '✅ Revue qualité ! → Qualité +5, Connaissances +2 (10K$)', es: '✅ ¡Revisión de calidad realizada! → Calidad +5, Conocimiento +2 ($10K)', vi: '✅ Đã hoàn tất đánh giá chất lượng! → Chất lượng +5, Kiến thức +2 ($10K)' }), type: 'success' },
      crunch: { msg: L(lang, { en: '🔥 Crunch mode! → Progress +0.5, Morale −15, Stress +20 ($15K)', fr: '🔥 Mode intensif ! → Progrès +0.5, Moral −15, Stress +20 (15K$)', es: '🔥 ¡Modo intensivo! → Progreso +0.5, Moral −15, Estrés +20 ($15K)', vi: '🔥 Chế độ tăng tốc! → Tiến độ +0.5, Tinh thần −15, Căng thẳng +20 ($15K)' }), type: 'warn' },
      team_building: { msg: L(lang, { en: '🤝 Team building! → Morale +12, Stress −8 ($8K)', fr: '🤝 Consolidation d\'équipe ! → Moral +12, Stress −8 (8K$)', es: '🤝 ¡Cohesión de equipo! → Moral +12, Estrés −8 ($8K)', vi: '🤝 Gắn kết đội nhóm! → Tinh thần +12, Căng thẳng −8 ($8K)' }), type: 'success' },
      build_prototype: { msg: L(lang, { en: '🔬 Prototype built! → Knowledge +10, reduces future risks', fr: '🔬 Prototype construit ! → Connaissances +10, réduit les risques futurs', es: '🔬 ¡Prototipo construido! → Conocimiento +10, reduce riesgos futuros', vi: '🔬 Đã xây dựng nguyên mẫu! → Kiến thức +10, giảm rủi ro về sau' }), type: 'success' },
      extend_deadline: { msg: L(lang, { en: '📅 Deadline extended +1 week (schedule penalty applies)', fr: '📅 Échéance prolongée +1 semaine (pénalité de calendrier)', es: '📅 Fecha límite extendida +1 semana (aplica penalización de cronograma)', vi: '📅 Gia hạn thời hạn +1 tuần (áp dụng phạt tiến độ)' }), type: 'info' },
      meeting_coaching: { msg: L(lang, { en: '🎓 Coaching session held! → Knowledge +8, Morale +3, Stress −2', fr: '🎓 Session de coaching ! → Connaissances +8, Moral +3, Stress −2', es: '🎓 ¡Sesión de coaching realizada! → Conocimiento +8, Moral +3, Estrés −2', vi: '🎓 Đã tổ chức buổi huấn luyện! → Kiến thức +8, Tinh thần +3, Căng thẳng −2' }), type: 'success' },
      meeting_standup: { msg: L(lang, { en: '📋 Standup meeting held! → Productivity +2%, Coordination +10', fr: '📋 Standup effectué ! → Productivité +2%, Coordination +10', es: '📋 ¡Standup diario realizado! → Productividad +2%, Coordinación +10', vi: '📋 Đã họp standup! → Năng suất +2%, Phối hợp +10' }), type: 'success' },
      meeting_status: { msg: L(lang, { en: '📊 Status review held! → Morale +5, Stress −5, Stakeholder +10', fr: '📊 Revue de statut ! → Moral +5, Stress −5, Parties prenantes +10', es: '📊 ¡Revisión de estado realizada! → Moral +5, Estrés −5, Partes interesadas +10', vi: '📊 Đã họp rà soát tình hình! → Tinh thần +5, Căng thẳng −5, Các bên liên quan +10' }), type: 'success' },
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
        
        // Record score to backend
        if (currentUser) {
          api.recordScore(selectedSimulation.id, {
            scenarioId: selectedScenario.id,
            score: finalScore,
            grade,
            decisionsMade: newState.decisions.length,
            budgetScore: Math.round(Math.max(0, (1 - newState.budget.spent / newState.budget.total)) * 200),
            scheduleScore: Math.round(newState.week <= newState.schedule.deadline ? 200 : Math.max(0, 200 - (newState.week - newState.schedule.deadline) * 40)),
            scopeScore: Math.round((newState.scope.completed / newState.scope.totalFeatures) * 200),
            qualityScore: Math.round((newState.scope.quality / 100) * 200),
            teamProcessScore: Math.round((newState.moraleHistory.reduce((a, b) => a + b, 0) / newState.moraleHistory.length / 100) * 100),
            consistencyBonus: newState.scheduleChanges <= 1 ? 50 : newState.scheduleChanges === 2 ? 25 : 0,
            prototypeBonus: newState.prototypesBuilt * 25,
            prototypesBuilt: newState.prototypesBuilt,
            scheduleChanges: newState.scheduleChanges
          }).then(() => loadUserData()).catch(console.error);
        }
        
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
  // SCRUM HANDLERS — "Momentum" sprint loop
  // (planning -> execution -> review -> retrospective)
  // ============================================

  const scrumForecastVelocity = (gs) =>
    gs.velocityHistory.length ? gs.velocityHistory[gs.velocityHistory.length - 1] : SCRUM_INITIAL_VELOCITY_FORECAST;

  // Apply story points to committed items in rank order; returns new backlog
  const applyScrumPoints = (state, pts) => {
    let remaining = pts, applied = 0;
    const order = state.backlog
      .filter(b => b.state === 'committed')
      .sort((a, b) => a.rank - b.rank)
      .map(b => b.id);
    const backlog = state.backlog.map(b => ({ ...b }));
    for (const id of order) {
      if (remaining <= 0) break;
      const item = backlog.find(b => b.id === id);
      const need = Math.max(0, (item.truePoints != null ? item.truePoints : item.points) - item.donePoints);
      const add = Math.min(need, remaining);
      item.donePoints += add;
      remaining -= add;
      applied += add;
    }
    return { backlog, applied };
  };

  const scrumToggleCommit = (itemId) => {
    setGameState(prev => {
      if (prev.phase !== 'planning') return prev;
      return {
        ...prev,
        backlog: prev.backlog.map(b =>
          b.id === itemId && (b.state === 'backlog' || b.state === 'committed')
            ? { ...b, state: b.state === 'committed' ? 'backlog' : 'committed' }
            : b
        )
      };
    });
  };

  const scrumRefineBacklog = () => {
    if (!gameState || gameState.phase !== 'planning' || gameState.refinedThisSprint) return;
    setGameState(prev => {
      const targets = prev.backlog
        .filter(b => (b.state === 'backlog' || b.state === 'committed') && b.uncertainty > 0.1)
        .sort((a, b) => a.rank - b.rank)
        .slice(0, 3)
        .map(b => b.id);
      return {
        ...prev,
        backlog: prev.backlog.map(b => targets.includes(b.id) ? { ...b, uncertainty: Math.round(b.uncertainty * 50) / 100 } : b),
        refinedThisSprint: true,
        budget: { ...prev.budget, spent: prev.budget.spent + 5000 }
      };
    });
    showToast(L(lang, { en: '🔍 Backlog refined — estimate uncertainty halved on top items ($5K)', fr: '🔍 Backlog raffiné — incertitude réduite de moitié sur les éléments prioritaires (5K$)', es: '🔍 Backlog refinado — incertidumbre de estimación reducida a la mitad en los ítems principales ($5K)', vi: '🔍 Đã tinh chỉnh backlog — độ bất định ước lượng giảm một nửa cho các hạng mục đầu ($5K)' }), 'success');
  };

  const scrumStartSprint = () => {
    if (!gameState) return;
    const committedNow = gameState.backlog.filter(b => b.state === 'committed');
    if (committedNow.length === 0) {
      showToast(L(lang, { en: 'Commit at least one backlog item to start the sprint', fr: 'Engagez au moins un élément du backlog pour démarrer le sprint', es: 'Comprométete con al menos un ítem del backlog para iniciar el sprint', vi: 'Cam kết ít nhất một hạng mục backlog để bắt đầu sprint' }), 'warn');
      return;
    }
    setGameState(prev => {
      // Reveal true size (cone of uncertainty) for newly committed items
      const backlog = prev.backlog.map(b =>
        b.state === 'committed'
          ? { ...b, truePoints: b.truePoints != null ? b.truePoints : Math.max(1, Math.round(b.points * (1 + (Math.random() * 2 - 1) * b.uncertainty))) }
          : b
      );
      const committedPts = prev.backlog.filter(b => b.state === 'committed').reduce((s, b) => s + b.points, 0);
      const newState = {
        ...prev,
        backlog,
        commitHistory: [...prev.commitHistory, committedPts],
        sprintPointsDone: 0,
        weekInSprint: 1,
        phase: 'executing',
        meetings: { standup: false },
        actionsUsed: {}
      };
      // Causal event: sustained high stress late in the project knocks out a key engineer
      if (prev.sprint >= 4 && prev.team.stress > 45 && !prev.triggeredEvents.includes('velocity_crash')) {
        newState.currentEvent = SCRUM_EVENTS.velocity_crash;
        newState.triggeredEvents = [...prev.triggeredEvents, 'velocity_crash'];
      }
      return newState;
    });
  };

  const scrumAction = (type) => {
    if (!gameState || gameState.phase !== 'executing' || gameState.actionsUsed[type]) return;
    setGameState(prev => {
      const ns = { ...prev, team: { ...prev.team }, budget: { ...prev.budget }, actionsUsed: { ...prev.actionsUsed, [type]: true } };
      switch (type) {
        case 'standup':
          ns.meetings = { ...prev.meetings, standup: true };
          break;
        case 'quality_focus':
          ns.budget.spent += 6000;
          ns.quality = Math.min(100, prev.quality + 4);
          ns.team.knowledge = Math.min(100, prev.team.knowledge + 2);
          break;
        case 'crunch': {
          ns.budget.spent += 10000;
          ns.team.morale = Math.max(10, prev.team.morale - 12);
          ns.team.stress = Math.min(100, prev.team.stress + 18);
          ns.crunchUsed = prev.crunchUsed + 1;
          const boosted = applyScrumPoints(ns, 2.5);
          ns.backlog = boosted.backlog;
          ns.sprintPointsDone = prev.sprintPointsDone + boosted.applied;
          break;
        }
        case 'team_building':
          ns.budget.spent += 8000;
          ns.team.morale = Math.min(100, prev.team.morale + 10);
          ns.team.stress = Math.max(0, prev.team.stress - 8);
          break;
        case 'coaching':
          ns.budget.spent += 500 * prev.team.size;
          ns.team.knowledge = Math.min(100, prev.team.knowledge + 8);
          ns.team.morale = Math.min(100, prev.team.morale + 3);
          ns.team.stress = Math.max(0, prev.team.stress - 2);
          break;
        default:
          break;
      }
      return ns;
    });
    const en = lang === 'en';
    const msgs = {
      standup: { msg: L(lang, { en: '📋 Daily standups held — mistakes −30% this week', fr: '📋 Mêlées quotidiennes — erreurs −30% cette semaine', es: '📋 Standups diarios realizados — errores −30% esta semana', vi: '📋 Standup hằng ngày — sai sót −30% tuần này' }), type: 'success' },
      quality_focus: { msg: L(lang, { en: '✅ Definition-of-Done focus — Quality +4, Knowledge +2 ($6K)', fr: '✅ Accent sur la définition de terminé — Qualité +4, Connaissances +2 (6K$)', es: '✅ Enfoque en Definition of Done — Calidad +4, Conocimiento +2 ($6K)', vi: '✅ Tập trung Definition of Done — Chất lượng +4, Kiến thức +2 ($6K)' }), type: 'success' },
      crunch: { msg: L(lang, { en: '🔥 Crunch! +2.5 pts now — Morale −12, Stress +18, scoring penalty ($10K)', fr: '🔥 Mode intensif ! +2,5 pts — Moral −12, Stress +18, pénalité au score (10K$)', es: '🔥 ¡Crunch! +2.5 pts ahora — Moral −12, Estrés +18, penalización de puntaje ($10K)', vi: '🔥 Tăng tốc! +2.5 điểm ngay — Tinh thần −12, Căng thẳng +18, bị trừ điểm ($10K)' }), type: 'warn' },
      team_building: { msg: L(lang, { en: '🤝 Team building — Morale +10, Stress −8 ($8K)', fr: '🤝 Consolidation d’équipe — Moral +10, Stress −8 (8K$)', es: '🤝 Cohesión de equipo — Moral +10, Estrés −8 ($8K)', vi: '🤝 Gắn kết đội nhóm — Tinh thần +10, Căng thẳng −8 ($8K)' }), type: 'success' },
      coaching: { msg: L(lang, { en: '🎓 Coaching session — Knowledge +8, Morale +3, Stress −2', fr: '🎓 Session de coaching — Connaissances +8, Moral +3, Stress −2', es: '🎓 Sesión de coaching — Conocimiento +8, Moral +3, Estrés −2', vi: '🎓 Buổi huấn luyện — Kiến thức +8, Tinh thần +3, Căng thẳng −2' }), type: 'success' }
    };
    if (msgs[type]) showToast(msgs[type].msg, msgs[type].type);
  };

  // Sprint review computation — runs when the last week of the sprint closes
  const scrumCloseSprint = (ns) => {
    const doneNow = [];
    const backlogAfterDone = ns.backlog.map(b => {
      if (b.state === 'committed' && b.donePoints >= (b.truePoints != null ? b.truePoints : b.points) - 0.01) {
        const finished = { ...b, state: 'done', donePoints: b.truePoints != null ? b.truePoints : b.points };
        doneNow.push(finished);
        return finished;
      }
      return b;
    });
    const carryoverIds = backlogAfterDone.filter(b => b.state === 'committed').map(b => b.id);
    const finalBacklog = backlogAfterDone.map(b => b.state === 'committed' ? { ...b, carryover: true } : b);

    // Demo books value — honouring the Definition of Done matters
    const qualityFactor = ns.quality >= 75 ? 1 : ns.quality >= 60 ? 0.9 : 0.8;
    let booked = doneNow.reduce((s, b) => s + b.value, 0) * qualityFactor;
    const queued = [];
    if (ns.dodDebtPending) {
      booked *= 0.85; // latent defects from last sprint surface at this demo
      queued.push('dod_debt');
    }
    const dodDebtPending = ns.quality < 70;
    const escapedDefects = ns.escapedDefects + (dodDebtPending ? 1 : 0);

    const anyCarryover = carryoverIds.length > 0;
    const carryoverStreak = anyCarryover ? ns.carryoverStreak + 1 : 0;
    const team = { ...ns.team };
    if (anyCarryover) {
      team.morale = Math.max(10, team.morale - 4);
      team.stress = Math.min(100, team.stress + 6);
    }
    if (carryoverStreak >= 2 && !ns.triggeredEvents.includes('carryover_spiral')) {
      team.morale = Math.max(10, team.morale - 10);
      team.stress = Math.min(100, team.stress + 15);
      queued.push('carryover_spiral');
    }
    const pv = selectedScenario.pivot;
    if (pv && ns.sprint === pv.sprint && !ns.pivotHandled) queued.push('the_pivot');

    const summary = {
      sprint: ns.sprint,
      committed: ns.commitHistory[ns.commitHistory.length - 1] || 0,
      completedPts: Math.round(ns.sprintPointsDone * 10) / 10,
      doneItems: doneNow.map(b => b.id),
      bookedValue: Math.round(booked),
      qualityFactor,
      carryover: carryoverIds,
      dodPenalty: !!ns.dodDebtPending
    };

    return {
      ...ns,
      backlog: finalBacklog,
      team,
      valueDelivered: Math.round(ns.valueDelivered + booked),
      velocityHistory: [...ns.velocityHistory, Math.round(ns.sprintPointsDone * 10) / 10],
      sprintValueHistory: [...ns.sprintValueHistory, Math.round(booked)],
      escapedDefects,
      dodDebtPending,
      carryoverStreak,
      queuedEvents: queued,
      lastSprintSummary: summary,
      capacityHit: false,
      phase: 'review'
    };
  };

  const scrumAdvanceWeek = () => {
    if (!gameState || gameState.phase !== 'executing' || gameState.currentEvent) return;
    // Course edition: all sprints fully unlocked
    setGameState(prev => {
      const scenario = selectedScenario;
      const weeklyCost = prev.team.size * scenario.weeklyCostPerPerson;

      // Causal chain: commitment pressure -> stress -> morale -> productivity -> rework
      const committedRemaining = prev.backlog
        .filter(b => b.state === 'committed')
        .reduce((s, b) => s + Math.max(0, (b.truePoints != null ? b.truePoints : b.points) - b.donePoints), 0);
      const weeksLeft = prev.sprintLength - prev.weekInSprint + 1;
      const cap = scrumPointsPerWeek(prev);
      let stress = prev.team.stress;
      if (committedRemaining > cap * weeksLeft * 1.1) {
        let bump = Math.min(12, (committedRemaining - cap * weeksLeft) * 1.5);
        if (prev.improvements.includes('sustainable_pace')) bump *= 0.85;
        stress += bump;
      } else if (prev.team.morale > 70) {
        stress -= 3;
      }
      stress = Math.max(0, Math.min(100, stress));
      const morale = Math.max(10, Math.min(100, calculateMoraleFromStress(prev.team.morale, stress) + (Math.random() - 0.5) * 4));

      const interim = { ...prev, team: { ...prev.team, morale, stress } };
      const pts = scrumPointsPerWeek(interim);
      const { backlog, applied } = applyScrumPoints(interim, pts);

      // DoD erosion: quality decays under delivery pressure unless the team
      // invested in test automation (retro) or DoD focus (weekly action)
      const qualityDrift = prev.improvements.includes('test_automation') ? 0.5 : -1.5;
      const quality = Math.max(40, Math.min(100, prev.quality + qualityDrift));

      const ns = {
        ...prev,
        week: prev.week + 1,
        budget: { ...prev.budget, spent: prev.budget.spent + weeklyCost },
        team: { ...prev.team, morale, stress },
        quality,
        backlog,
        sprintPointsDone: prev.sprintPointsDone + applied,
        moraleHistory: [...prev.moraleHistory, morale],
        meetings: { standup: false },
        actionsUsed: {}
      };

      if (prev.weekInSprint < prev.sprintLength) {
        ns.weekInSprint = prev.weekInSprint + 1;
        return ns;
      }
      return scrumCloseSprint(ns);
    });
  };

  // Per-scenario event text: scenarios can override the pivot's title and
  // description while reusing the generic absorb / negotiate / refuse options
  const scrumEventFor = (evId) => {
    const base = SCRUM_EVENTS[evId];
    const pv = selectedScenario.pivot;
    if (evId === 'the_pivot' && pv) {
      return {
        ...base,
        title: pv.title || base.title,
        titleFr: pv.titleFr || base.titleFr,
        description: pv.description || base.description,
        descriptionFr: pv.descriptionFr || base.descriptionFr
      };
    }
    return base;
  };

  const scrumFinishReview = () => {
    setGameState(prev => {
      if (prev.queuedEvents && prev.queuedEvents.length > 0) {
        const next = prev.queuedEvents[0];
        return {
          ...prev,
          currentEvent: scrumEventFor(next),
          queuedEvents: prev.queuedEvents.slice(1),
          triggeredEvents: prev.triggeredEvents.includes(next) ? prev.triggeredEvents : [...prev.triggeredEvents, next]
        };
      }
      return { ...prev, phase: 'retro' };
    });
  };

  const scrumEventChoice = (option) => {
    setGameState(prev => {
      const ev = prev.currentEvent;
      if (!ev) return prev;
      let ns = {
        ...prev,
        currentEvent: null,
        decisions: [...prev.decisions, { eventId: ev.id, choice: option.id, week: prev.week }]
      };

      if (ev.id === 'velocity_crash') {
        if (option.id === 'sustain') {
          ns.capacityHit = true;
          ns.team = { ...prev.team, morale: Math.min(100, prev.team.morale + 5), stress: Math.max(0, prev.team.stress - 5) };
        } else {
          ns.team = { ...prev.team, morale: Math.max(10, prev.team.morale - 15), stress: Math.min(100, prev.team.stress + 20) };
          ns.crunchUsed = prev.crunchUsed + 1;
        }
      }

      if (ev.id === 'the_pivot' && selectedScenario.pivot) {
        const pv = selectedScenario.pivot;
        ns.pivotHandled = option.id;
        // The priorities moved whether you like it or not: values re-rank
        let backlog = prev.backlog.map(b => {
          const change = (pv.changes || []).find(c => c.id === b.id);
          return change ? { ...b, value: change.value } : b;
        });
        const newItem = pv.newItem ? {
          ...pv.newItem, pivotItem: true,
          state: 'backlog', donePoints: 0, truePoints: null, carryover: false
        } : null;
        if (option.id === 'absorb') {
          if (pv.retire) backlog = backlog.map(b => (b.id === pv.retire && b.state === 'backlog') ? { ...b, state: 'retired' } : b);
          if (newItem) backlog = [...backlog, newItem];
          ns.team = { ...prev.team, stress: Math.min(100, prev.team.stress + 5) };
        } else if (option.id === 'negotiate') {
          if (newItem) backlog = [...backlog, { ...newItem, uncertainty: Math.min(0.5, (newItem.uncertainty || 0.25) + 0.1), rank: newItem.rank + 1 }];
          ns.team = { ...prev.team, stress: Math.min(100, prev.team.stress + 8), morale: Math.max(10, prev.team.morale - 3) };
        } else {
          ns.team = { ...prev.team, morale: Math.min(100, prev.team.morale + 3) };
        }
        ns.backlog = backlog;
      }

      // Show next queued event, or continue the loop
      if (ns.queuedEvents && ns.queuedEvents.length > 0) {
        const next = ns.queuedEvents[0];
        ns.currentEvent = scrumEventFor(next);
        ns.queuedEvents = ns.queuedEvents.slice(1);
        ns.triggeredEvents = ns.triggeredEvents.includes(next) ? ns.triggeredEvents : [...ns.triggeredEvents, next];
      } else if (ns.phase === 'review') {
        ns.phase = 'retro';
      }
      return ns;
    });
  };

  const scrumNextSprint = (impId) => {
    setGameState(prev => {
      if (prev.phase !== 'retro') return prev;
      let ns = { ...prev, team: { ...prev.team } };
      if (impId && !prev.improvements.includes(impId)) {
        ns.improvements = [...prev.improvements, impId];
        if (impId === 'sustainable_pace') ns.team.stress = Math.max(0, prev.team.stress - 10);
        if (impId === 'team_coaching') ns.team.knowledge = Math.min(100, prev.team.knowledge + 10);
        if (impId === 'refinement_discipline') {
          ns.backlog = prev.backlog.map(b => ({ ...b, uncertainty: Math.round(b.uncertainty * 50) / 100 }));
        }
      }
      if (prev.sprint >= prev.totalSprints) {
        const finalScore = calculateScrumScore(ns);
        const grade = getGrade(finalScore);
        const bd = calculateScrumScoreBreakdown(ns);
        if (currentUser && selectedSimulation) {
          api.recordScore(selectedSimulation.id, {
            scenarioId: selectedScenario.id,
            score: finalScore,
            grade,
            decisionsMade: ns.decisions.length,
            budgetScore: bd.budget,
            scheduleScore: bd.predictability, // predictability stored in the schedule slot
            scopeScore: bd.value,             // delivered value stored in the scope slot
            qualityScore: bd.quality
          }).then(() => loadUserData()).catch(console.error);
        }
        setSimPhase('ended');
        return { ...ns, gamePhase: 'ended' };
      }
      return {
        ...ns,
        sprint: prev.sprint + 1,
        weekInSprint: 0,
        phase: 'planning',
        refinedThisSprint: false,
        actionsUsed: {},
        meetings: { standup: false }
      };
    });
  };

  // ============================================
  // RENDER COMPONENTS
  // ============================================

  const renderNavbar = (transparent = false) => (
    <nav className={`navbar ${transparent ? 'navbar-transparent' : ''}`}>
      <div className="nav-container">
        <div className="nav-logo" onClick={() => setCurrentPage('catalog')}>
          <span className="logo-icon">🎓</span>
          <span className="logo-text">BizSim<span className="logo-accent">Hub</span></span>
        </div>
        <div className="nav-links">
          {/* Language Toggle */}
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            aria-label="Language"
            style={{
              padding: '6px 10px',
              background: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              borderRadius: '20px',
              color: '#e2e8f0',
              fontSize: '13px',
              fontWeight: '500',
              cursor: 'pointer',
              marginRight: '8px',
              appearance: 'none',
              WebkitAppearance: 'none',
            }}
          >
            {LANGS.map(l => (
              <option key={l} value={l} style={{ color: '#1a1a2e', background: '#ffffff' }}>{LANG_LABELS[l]}</option>
            ))}
          </select>
          <span className="nav-link" style={{ cursor: 'default', color: '#ED1B2F', fontWeight: 700 }}>{L(lang, { en: 'Course & Team Edition', fr: 'Édition cours et équipes', es: 'Edición cursos y equipos', vi: 'Phiên bản khóa học & đội nhóm' })}</span>
          {currentUser && (
            <>
              <button className="nav-link" onClick={() => setCurrentPage('dashboard')}>{t('nav.dashboard', lang)}</button>
              <button className="nav-link" onClick={() => setCurrentPage('catalog')}>{t('nav.simulations', lang)}</button>
              {currentUser.is_admin && (
                <button className="nav-link" onClick={() => setCurrentPage('admin')} title="Admin">⚙️ Admin</button>
              )}
              <div className="nav-user">
                <span className="user-avatar">{currentUser.name?.charAt(0)}</span>
                <span className="user-name">{currentUser.name}</span>
                <button className="nav-link-small" onClick={handleLogout}>{t('nav.logout', lang)}</button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );

  const renderLanding = () => (
    <div className="landing-page">
      {renderNavbar(true)}
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="hero-banner">
          <img src={lang === 'fr' ? '/Bizsimfr.png' : '/herobizsim.png'} alt="JUST LIVE IT! - BizSimHub AI-Powered Business Simulations" />
        </div>
        <div className="hero-content">
          <p className="hero-subtitle">{t('landing.heroSubtitle', lang)}</p>
          <div className="hero-cta">
            <button className="btn-primary-lg" onClick={() => { setCurrentPage('auth'); setAuthMode('signup'); }}>{t('landing.startTrial', lang)}</button>
          </div>
          <div className="hero-stats">
            <div className="stat"><span className="stat-num">25</span><span className="stat-label">{L(lang, { en: 'Scenarios', fr: 'Scénarios', es: 'Escenarios', vi: 'Kịch bản' })}</span></div>
            <div className="stat"><span className="stat-num">8</span><span className="stat-label">{L(lang, { en: 'Industries', fr: 'Industries', es: 'Industrias', vi: 'Ngành' })}</span></div>
            <div className="stat"><span className="stat-num">PMP+ACP</span><span className="stat-label">{L(lang, { en: 'Aligned', fr: 'Aligné', es: 'Alineado', vi: 'Theo chuẩn' })}</span></div>
          </div>
        </div>
      </section>

      <section className="simulations-section">
        <div className="section-container">
          <div className="section-header">
            <h2>{L(lang, { en: 'Practice in 8 Industry Libraries — 25 Scenarios', fr: 'Pratiquez dans 8 bibliothèques industrielles — 25 scénarios', es: 'Practica en 8 bibliotecas industriales — 25 escenarios', vi: 'Luyện tập trong 8 thư viện ngành — 25 kịch bản' })}</h2>
            <p>{L(lang, { en: 'Every library mixes predictive and agile projects, from Standard to Expert difficulty', fr: 'Chaque bibliothèque combine projets prédictifs et agiles, du niveau Standard à Expert', es: 'Cada biblioteca combina proyectos predictivos y ágiles, de dificultad Estándar a Experto', vi: 'Mỗi thư viện kết hợp dự án dự đoán và agile, từ mức Tiêu chuẩn đến Chuyên gia' })}</p>
          </div>
          <div className="sim-grid">
            <div className="sim-card">
              <div className="sim-icon">💻</div>
              <h3>{L(lang, { en: 'Technology', fr: 'Technologie', es: 'Tecnología', vi: 'Công nghệ' })}</h3>
              <div className="sim-category">{L(lang, { en: 'Tech Startup', fr: 'Startup Tech', es: 'Startup tecnológica', vi: 'Startup công nghệ' })}</div>
              <p>{L(lang, { en: 'Launch a SaaS platform while managing technical debt, team scaling, and stakeholder expectations.', fr: 'Lancez une plateforme SaaS tout en gérant la dette technique, la croissance de l\'équipe et les attentes des parties prenantes.', es: 'Lanza una plataforma SaaS mientras gestionas la deuda técnica, el crecimiento del equipo y las expectativas de las partes interesadas.', vi: 'Ra mắt nền tảng SaaS trong khi quản lý nợ kỹ thuật, mở rộng đội ngũ và kỳ vọng của các bên liên quan.' })}</p>
              <div className="sim-meta"><span>{L(lang, { en: 'Standard', fr: 'Standard', es: 'Estándar', vi: 'Tiêu chuẩn' })}</span><span>12 {L(lang, { en: 'weeks', fr: 'semaines', es: 'semanas', vi: 'tuần' })}</span></div>
              <div className="sim-badge-featured">{L(lang, { en: 'Available Now', fr: 'Disponible maintenant', es: 'Disponible ahora', vi: 'Hiện đã có' })}</div>
            </div>
            <div className="sim-card">
              <div className="sim-icon">🎭</div>
              <h3>{L(lang, { en: 'Entertainment', fr: 'Divertissement', es: 'Entretenimiento', vi: 'Giải trí' })}</h3>
              <div className="sim-category">{L(lang, { en: 'Live Show Production', fr: 'Production de spectacle', es: 'Producción de espectáculos', vi: 'Sản xuất show diễn trực tiếp' })}</div>
              <p>{L(lang, { en: 'Produce a touring show managing creative talent, safety requirements, and opening night deadlines.', fr: 'Produisez un spectacle de tournée en gérant les talents créatifs, les exigences de sécurité et les échéances de première.', es: 'Produce un espectáculo itinerante gestionando talento creativo, requisitos de seguridad y la fecha de estreno.', vi: 'Sản xuất một show lưu diễn, quản lý tài năng sáng tạo, yêu cầu an toàn và hạn chót đêm công diễn đầu tiên.' })}</p>
              <div className="sim-meta"><span>{L(lang, { en: 'Advanced', fr: 'Avancé', es: 'Avanzado', vi: 'Nâng cao' })}</span><span>10 {L(lang, { en: 'weeks', fr: 'semaines', es: 'semanas', vi: 'tuần' })}</span></div>
              <div className="sim-badge-featured">{L(lang, { en: 'Available Now', fr: 'Disponible maintenant', es: 'Disponible ahora', vi: 'Hiện đã có' })}</div>
            </div>
            <div className="sim-card">
              <div className="sim-icon">🏗️</div>
              <h3>{L(lang, { en: 'Construction', fr: 'Construction', es: 'Construcción', vi: 'Xây dựng' })}</h3>
              <div className="sim-category">{L(lang, { en: 'Commercial Building', fr: 'Bâtiment commercial', es: 'Edificio comercial', vi: 'Tòa nhà thương mại' })}</div>
              <p>{L(lang, { en: 'Build a 12-story mixed-use development navigating permits, weather, and subcontractor coordination.', fr: 'Construisez un immeuble de 12 étages à usage mixte en naviguant les permis, la météo et la coordination des sous-traitants.', es: 'Construye un desarrollo de uso mixto de 12 pisos sorteando permisos, clima y coordinación de subcontratistas.', vi: 'Xây tòa nhà đa năng 12 tầng, xử lý giấy phép, thời tiết và điều phối nhà thầu phụ.' })}</p>
              <div className="sim-meta"><span>{L(lang, { en: 'Standard', fr: 'Standard', es: 'Estándar', vi: 'Tiêu chuẩn' })}</span><span>14 {L(lang, { en: 'weeks', fr: 'semaines', es: 'semanas', vi: 'tuần' })}</span></div>
              <div className="sim-badge-featured">{L(lang, { en: 'Available Now', fr: 'Disponible maintenant', es: 'Disponible ahora', vi: 'Hiện đã có' })}</div>
            </div>
            <div className="sim-card">
              <div className="sim-icon">🔬</div>
              <h3>{L(lang, { en: 'Research & Development', fr: 'Recherche et développement', es: 'Investigación y Desarrollo', vi: 'Nghiên cứu & Phát triển' })}</h3>
              <div className="sim-category">{L(lang, { en: 'R&D Innovation', fr: 'Innovation R&D', es: 'Innovación I+D', vi: 'Đổi mới R&D' })}</div>
              <p>{L(lang, { en: 'Lead a quantum sensor project with high uncertainty where prototyping is essential to manage risk.', fr: 'Dirigez un projet de capteur quantique à haute incertitude où le prototypage est essentiel pour gérer les risques.', es: 'Dirige un proyecto de sensores cuánticos con alta incertidumbre donde el prototipado es esencial para gestionar el riesgo.', vi: 'Dẫn dắt dự án cảm biến lượng tử với độ bất định cao, nơi việc làm nguyên mẫu là thiết yếu để quản lý rủi ro.' })}</p>
              <div className="sim-meta"><span>{L(lang, { en: 'Expert', fr: 'Expert', es: 'Experto', vi: 'Chuyên gia' })}</span><span>16 {L(lang, { en: 'weeks', fr: 'semaines', es: 'semanas', vi: 'tuần' })}</span></div>
              <div className="sim-badge-featured">{L(lang, { en: 'Available Now', fr: 'Disponible maintenant', es: 'Disponible ahora', vi: 'Hiện đã có' })}</div>
            </div>
            <div className="sim-card">
              <div className="sim-icon">🚚</div>
              <h3>{L(lang, { en: 'Cars & Trucks', fr: 'Autos et camions', es: 'Autos y camiones', vi: 'Ô tô & xe tải' })}</h3>
              <div className="sim-category">{L(lang, { en: 'Truck Dealership IT', fr: 'TI de concessionnaire de camions', es: 'TI de concesionario de camiones', vi: 'CNTT đại lý xe tải' })}</div>
              <p>{L(lang, { en: 'Sell, maintain, repair: roll out a dealer management system, migrate to the cloud, and ship AI and customer-portal MVPs under Scrum.', fr: 'Vendre, entretenir, réparer : déployez un système de gestion, migrez au nuage et livrez des MVP d\u2019IA et de portail client en Scrum.', es: 'Vende, mantén, repara: implementa un sistema de gestión de concesionario, migra a la nube y entrega MVP de IA y portal de clientes con Scrum.', vi: 'Bán, bảo dưỡng, sửa chữa: triển khai hệ thống quản lý đại lý, chuyển lên đám mây và giao MVP AI cùng cổng khách hàng theo Scrum.' })}</p>
              <div className="sim-meta"><span>{L(lang, { en: '4 scenarios', fr: '4 scénarios', es: '4 escenarios', vi: '4 kịch bản' })}</span><span>{L(lang, { en: 'Predictive + Agile', fr: 'Prédictif + Agile', es: 'Predictivo + Ágil', vi: 'Dự đoán + Agile' })}</span></div>
              <div className="sim-badge-featured">{L(lang, { en: 'Available Now', fr: 'Disponible maintenant', es: 'Disponible ahora', vi: 'Hiện đã có' })}</div>
            </div>
            <div className="sim-card">
              <div className="sim-icon">🏦</div>
              <h3>{L(lang, { en: 'Banking', fr: 'Banque', es: 'Banca', vi: 'Ngân hàng' })}</h3>
              <div className="sim-category">{L(lang, { en: 'Financial Services', fr: 'Services financiers', es: 'Servicios financieros', vi: 'Dịch vụ tài chính' })}</div>
              <p>{L(lang, { en: 'Replace a core banking platform against a regulatory clock, stand up AML compliance, and ship a fintech MVP under Scrum.', fr: 'Remplacez une plateforme bancaire centrale sous contrainte réglementaire, implantez la conformité anti-blanchiment et livrez un MVP fintech en Scrum.', es: 'Reemplaza una plataforma bancaria central contra un reloj regulatorio, monta el cumplimiento AML y entrega un MVP fintech con Scrum.', vi: 'Thay thế nền tảng ngân hàng lõi trước hạn chót quy định, xây dựng tuân thủ AML và giao MVP fintech theo Scrum.' })}</p>
              <div className="sim-meta"><span>{L(lang, { en: '3 scenarios', fr: '3 scénarios', es: '3 escenarios', vi: '3 kịch bản' })}</span><span>{L(lang, { en: 'Predictive + Agile', fr: 'Prédictif + Agile', es: 'Predictivo + Ágil', vi: 'Dự đoán + Agile' })}</span></div>
              <div className="sim-badge-featured">{L(lang, { en: 'Available Now', fr: 'Disponible maintenant', es: 'Disponible ahora', vi: 'Hiện đã có' })}</div>
            </div>
            <div className="sim-card">
              <div className="sim-icon">📦</div>
              <h3>{L(lang, { en: 'Supply Chain', fr: 'Chaîne d\u2019approvisionnement', es: 'Cadena de suministro', vi: 'Chuỗi cung ứng' })}</h3>
              <div className="sim-category">{L(lang, { en: 'Logistics & Distribution', fr: 'Logistique et distribution', es: 'Logística y distribución', vi: 'Hậu cần & phân phối' })}</div>
              <p>{L(lang, { en: 'Commission an automated distribution center, survive peak season, and ship a shipment-visibility platform under Scrum.', fr: 'Mettez en service un centre de distribution automatisé, survivez à la haute saison et livrez une plateforme de visibilité en Scrum.', es: 'Pon en marcha un centro de distribución automatizado, sobrevive a la temporada alta y entrega una plataforma de visibilidad de envíos con Scrum.', vi: 'Vận hành trung tâm phân phối tự động, vượt qua mùa cao điểm và giao nền tảng theo dõi lô hàng theo Scrum.' })}</p>
              <div className="sim-meta"><span>{L(lang, { en: '3 scenarios', fr: '3 scénarios', es: '3 escenarios', vi: '3 kịch bản' })}</span><span>{L(lang, { en: 'Predictive + Agile', fr: 'Prédictif + Agile', es: 'Predictivo + Ágil', vi: 'Dự đoán + Agile' })}</span></div>
              <div className="sim-badge-featured">{L(lang, { en: 'Available Now', fr: 'Disponible maintenant', es: 'Disponible ahora', vi: 'Hiện đã có' })}</div>
            </div>
            <div className="sim-card">
              <div className="sim-icon">📣</div>
              <h3>{L(lang, { en: 'Marketing', fr: 'Marketing', es: 'Marketing', vi: 'Marketing' })}</h3>
              <div className="sim-category">{L(lang, { en: 'Campaigns & Growth', fr: 'Campagnes et croissance', es: 'Campañas y crecimiento', vi: 'Chiến dịch & tăng trưởng' })}</div>
              <p>{L(lang, { en: 'Run a national product launch, roll out a corporate rebrand, and build a growth-experiment engine under Scrum.', fr: 'Menez un lancement de produit national, déployez une refonte de marque et construisez un moteur d\u2019expériences de croissance en Scrum.', es: 'Ejecuta un lanzamiento nacional de producto, implementa un rebranding corporativo y construye un motor de experimentos de crecimiento con Scrum.', vi: 'Thực hiện ra mắt sản phẩm toàn quốc, triển khai tái định vị thương hiệu và xây dựng cỗ máy thử nghiệm tăng trưởng theo Scrum.' })}</p>
              <div className="sim-meta"><span>{L(lang, { en: '3 scenarios', fr: '3 scénarios', es: '3 escenarios', vi: '3 kịch bản' })}</span><span>{L(lang, { en: 'Predictive + Agile', fr: 'Prédictif + Agile', es: 'Predictivo + Ágil', vi: 'Dự đoán + Agile' })}</span></div>
              <div className="sim-badge-featured">{L(lang, { en: 'Available Now', fr: 'Disponible maintenant', es: 'Disponible ahora', vi: 'Hiện đã có' })}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Predictive vs Agile section */}
      <section className="methodology-section" style={{ padding: '4rem 2rem', background: 'var(--bg-secondary, var(--bg-primary))' }}>
        <div className="section-container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{L(lang, { en: 'Two Ways to Run Every Project', fr: 'Deux façons de mener chaque projet', es: 'Dos maneras de dirigir cada proyecto', vi: 'Hai cách điều hành mọi dự án' })}</h2>
            <p>{L(lang, { en: 'The only PM simulator where you train both methodologies — and feel why each one wins in its context', fr: 'Le seul simulateur GP où vous pratiquez les deux méthodologies — et ressentez pourquoi chacune gagne dans son contexte', es: 'El único simulador de gestión de proyectos donde entrenas ambas metodologías — y sientes por qué cada una gana en su contexto', vi: 'Trình mô phỏng QLDA duy nhất cho bạn luyện cả hai phương pháp — và cảm nhận vì sao mỗi phương pháp thắng thế trong bối cảnh của nó' })}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
            <div style={{ padding: '1.75rem', background: 'var(--bg-card)', borderRadius: '14px', border: '1px solid rgba(59,130,246,0.4)' }}>
              <h3 style={{ color: '#3b82f6', marginBottom: '0.75rem' }}>📋 {L(lang, { en: 'Predictive (PMP)', fr: 'Prédictif (PMP)', es: 'Predictivo (PMP)', vi: 'Dự đoán (PMP)' })}</h3>
              <p style={{ lineHeight: 1.7 }}>{L(lang, { en: 'Fixed scope, baselines and milestones. Manage the triple constraint, build prototypes to de-risk uncertainty, control quality, and land the plan — 16 scenarios from clinical trials to core banking.', fr: 'Périmètre fixe, références et jalons. Gérez la triple contrainte, prototypez pour réduire l\u2019incertitude, contrôlez la qualité et atterrissez le plan — 16 scénarios, des essais cliniques au système bancaire central.', es: 'Alcance fijo, líneas base e hitos. Gestiona la triple restricción, construye prototipos para mitigar la incertidumbre, controla la calidad y cumple el plan — 16 escenarios, desde ensayos clínicos hasta core banking.', vi: 'Phạm vi cố định, đường cơ sở và cột mốc. Quản lý ràng buộc tam giác, làm nguyên mẫu để giảm bất định, kiểm soát chất lượng và hoàn thành kế hoạch — 16 kịch bản từ thử nghiệm lâm sàng đến ngân hàng lõi.' })}</p>
            </div>
            <div style={{ padding: '1.75rem', background: 'var(--bg-card)', borderRadius: '14px', border: '1px solid rgba(16,185,129,0.4)' }}>
              <h3 style={{ color: '#10b981', marginBottom: '0.75rem' }}>🔁 {L(lang, { en: 'Agile · Scrum (PMI-ACP)', fr: 'Agile · Scrum (PMI-ACP)', es: 'Agile · Scrum (PMI-ACP)', vi: 'Agile · Scrum (PMI-ACP)' })}</h3>
              <p style={{ lineHeight: 1.7 }}>{L(lang, { en: 'Value-ranked backlogs, emergent velocity, sprint ceremonies and mid-project pivots. Deliver the most valuable increment — not the most features — across 9 Scrum scenarios coached in agile vocabulary.', fr: 'Backlogs classés par valeur, vélocité émergente, cérémonies de sprint et pivots en cours de projet. Livrez l\u2019incrément le plus précieux — pas le plus de fonctionnalités — dans 9 scénarios Scrum coachés en vocabulaire agile.', es: 'Backlogs priorizados por valor, velocidad emergente, ceremonias de sprint y pivotes a mitad de proyecto. Entrega el incremento más valioso — no la mayor cantidad de funciones — en 9 escenarios Scrum con coaching en vocabulario ágil.', vi: 'Backlog xếp hạng theo giá trị, velocity hình thành dần, các nghi thức sprint và những cú xoay trục giữa dự án. Giao phần tăng trưởng giá trị nhất — không phải nhiều tính năng nhất — qua 9 kịch bản Scrum với huấn luyện bằng ngôn ngữ agile.' })}</p>
            </div>
          </div>
          <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)' }}>
            {L(lang, { en: '🤖 ANNA, your AI coach, adapts her vocabulary to each methodology — EVM and critical path on predictive projects, velocity and Definition of Done on agile ones. Available in English, French, Spanish and Vietnamese.', fr: '🤖 ANNA, votre coach IA, adapte son vocabulaire à chaque méthodologie — valeur acquise et chemin critique en prédictif, vélocité et définition de terminé en agile. Offerte en français, anglais, espagnol et vietnamien.', es: '🤖 ANNA, tu coach de IA, adapta su vocabulario a cada metodología — EVM y ruta crítica en proyectos predictivos, velocidad y Definition of Done en los ágiles. Disponible en varios idiomas (EN/FR/ES/VI).', vi: '🤖 ANNA, huấn luyện viên AI của bạn, điều chỉnh ngôn ngữ theo từng phương pháp — EVM và đường găng cho dự án dự đoán, velocity và Definition of Done cho dự án agile. Hỗ trợ đa ngôn ngữ (EN/FR/ES/VI).' })}
          </p>
        </div>
      </section>

      {/* PM Outcomes Section */}
      <section className="outcomes-section" style={{ padding: '4rem 2rem', background: 'var(--bg-primary)' }}>
        <div className="section-container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{t('landing.outcomesTitle', lang)}</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '1rem', background: 'var(--bg-card)', borderRadius: '10px', border: '1px solid var(--border)' }}>
              <span style={{ fontSize: '1.5rem' }}>📅</span>
              <span>{t('landing.outcome1', lang)}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '1rem', background: 'var(--bg-card)', borderRadius: '10px', border: '1px solid var(--border)' }}>
              <span style={{ fontSize: '1.5rem' }}>💰</span>
              <span>{t('landing.outcome2', lang)}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '1rem', background: 'var(--bg-card)', borderRadius: '10px', border: '1px solid var(--border)' }}>
              <span style={{ fontSize: '1.5rem' }}>⚠️</span>
              <span>{t('landing.outcome3', lang)}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '1rem', background: 'var(--bg-card)', borderRadius: '10px', border: '1px solid var(--border)' }}>
              <span style={{ fontSize: '1.5rem' }}>👥</span>
              <span>{t('landing.outcome4', lang)}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '1rem', background: 'var(--bg-card)', borderRadius: '10px', border: '1px solid var(--border)' }}>
              <span style={{ fontSize: '1.5rem' }}>🎯</span>
              <span>{t('landing.outcome5', lang)}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '1rem', background: 'var(--bg-card)', borderRadius: '10px', border: '1px solid var(--border)' }}>
              <span style={{ fontSize: '1.5rem' }}>📋</span>
              <span>{t('landing.outcome6', lang)}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Credentials Section */}
      <section className="anna-landing-section" style={{ padding: '4rem 2rem', background: 'var(--bg-secondary)' }}>
        <div className="section-container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
            {L(lang, { en: 'Meet Your AI Coach', fr: 'Rencontrez votre coach IA', es: 'Conoce a tu coach de IA', vi: 'Gặp gỡ huấn luyện viên AI của bạn' })}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '1.5rem' }}>
            {L(lang, { en: 'Powered by Claude AI — Personalized guidance every step of the way', fr: 'Propulsé par Claude AI — Un accompagnement personnalisé à chaque étape', es: 'Impulsado por Claude AI — Orientación personalizada en cada paso', vi: 'Vận hành bởi Claude AI — Hướng dẫn cá nhân hóa trong từng bước' })}
          </p>
          <div style={{ 
            background: 'linear-gradient(135deg, #0f172a 0%, #1a2332 100%)', 
            border: '1px solid rgba(20, 184, 166, 0.25)', 
            borderRadius: '20px', 
            padding: '2.5rem',
            textAlign: 'left',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Top accent bar */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #14b8a6, #06b6d4, #8b5cf6)' }}></div>
            {/* Glow */}
            <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '160px', height: '160px', background: 'radial-gradient(circle, rgba(20,184,166,0.08) 0%, transparent 70%)', pointerEvents: 'none' }}></div>
            
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', flexWrap: 'wrap' }}>
              <img 
                src="/anna-avatar.png" 
                alt="Anna — AI Coach" 
                style={{ 
                  width: '90px', height: '90px', 
                  borderRadius: '50%', 
                  objectFit: 'cover', 
                  objectPosition: 'center top',
                  border: '3px solid rgba(20, 184, 166, 0.4)',
                  boxShadow: '0 4px 20px rgba(20, 184, 166, 0.25)',
                  flexShrink: 0
                }} 
              />
              <div style={{ flex: 1, minWidth: '250px' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '4px', color: '#14b8a6' }}>
                  {L(lang, { en: 'ANNA — Project Management Advisor', fr: 'ANNA — Conseillère en gestion de projet', es: 'ANNA — Asesora en gestión de proyectos', vi: 'ANNA — Cố vấn quản lý dự án' })}
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginBottom: '1rem', fontWeight: 500 }}>
                  {L(lang, { en: 'Your AI-powered coach for every simulation', fr: 'Votre coach IA pour chaque simulation', es: 'Tu coach con IA para cada simulación', vi: 'Huấn luyện viên AI cho mọi phiên mô phỏng' })}
                </p>
                <p style={{ color: '#cbd5e1', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: '1rem' }}>
                  {L(lang, { en: `"Hi, I'm Anna. I'll be right there with you during every simulation — analyzing your project health, flagging risks before they become crises, and connecting your decisions to real PM principles. Think of me as the senior PM mentor you wish you had on every project."`, fr: `« Bonjour, je suis Anna. Je serai à vos côtés pendant chaque simulation — analysant la santé de votre projet, signalant les risques avant qu'ils ne deviennent des crises, et reliant vos décisions aux vrais principes de GP. Pensez à moi comme le mentor GP senior que vous aimeriez avoir sur chaque projet. »`, es: `"Hola, soy Anna. Estaré contigo en cada simulación — analizando la salud de tu proyecto, señalando riesgos antes de que se vuelvan crisis y conectando tus decisiones con principios reales de gestión de proyectos. Piensa en mí como la mentora senior que te habría gustado tener en cada proyecto."`, vi: `"Chào bạn, tôi là Anna. Tôi sẽ đồng hành cùng bạn trong mỗi phiên mô phỏng — phân tích sức khỏe dự án, cảnh báo rủi ro trước khi thành khủng hoảng, và kết nối các quyết định của bạn với những nguyên tắc QLDA thực thụ. Hãy xem tôi như người cố vấn QLDA dày dạn mà bạn luôn ước có trong mỗi dự án."` })}
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{ background: 'rgba(20, 184, 166, 0.12)', color: '#14b8a6', padding: '5px 14px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 500 }}>
                    {L(lang, { en: '📋 Scenario Briefings', fr: '📋 Briefings de scénario', es: '📋 Resúmenes de escenario', vi: '📋 Tóm tắt kịch bản' })}
                  </span>
                  <span style={{ background: 'rgba(20, 184, 166, 0.12)', color: '#14b8a6', padding: '5px 14px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 500 }}>
                    {L(lang, { en: '📊 Weekly Strategic Advice', fr: '📊 Conseils stratégiques hebdo', es: '📊 Consejos estratégicos semanales', vi: '📊 Tư vấn chiến lược hằng tuần' })}
                  </span>
                  <span style={{ background: 'rgba(20, 184, 166, 0.12)', color: '#14b8a6', padding: '5px 14px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 500 }}>
                    {L(lang, { en: '🎓 PMP/PMBOK Insights', fr: '🎓 Liens PMP/PMBOK', es: '🎓 Perspectivas PMP/PMBOK', vi: '🎓 Kiến thức PMP/PMBOK' })}
                  </span>
                  <span style={{ background: 'rgba(20, 184, 166, 0.12)', color: '#14b8a6', padding: '5px 14px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 500 }}>
                    {L(lang, { en: '📝 Post-Project Debriefs', fr: '📝 Bilans post-projet', es: '📝 Análisis post-proyecto', vi: '📝 Tổng kết sau dự án' })}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <p style={{ marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            {L(lang, { en: 'Questions? Reach out at contact@bizsimhub.com', fr: 'Questions? Contactez-nous à contact@bizsimhub.com', es: '¿Preguntas? Escríbenos a contact@bizsimhub.com', vi: 'Có câu hỏi? Liên hệ contact@bizsimhub.com' })}
          </p>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section-landing" style={{ padding: '5rem 2rem', background: 'var(--bg-secondary)' }}>
        <div className="section-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{L(lang, { en: 'Simple Pricing', fr: 'Tarification simple', es: 'Precios simples', vi: 'Bảng giá đơn giản' })}</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>{L(lang, { en: 'Start free, upgrade when ready', fr: 'Commencez gratuitement, passez au supérieur quand vous êtes prêt', es: 'Empieza gratis, mejora cuando quieras', vi: 'Bắt đầu miễn phí, nâng cấp khi sẵn sàng' })}</p>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {/* Free Plan */}
            <div style={{ 
              background: 'var(--bg-card)', 
              border: '1px solid var(--border)', 
              borderRadius: '16px', 
              padding: '2rem', 
              width: '300px',
              textAlign: 'center'
            }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{L(lang, { en: 'Free', fr: 'Gratuit', es: 'Gratis', vi: 'Miễn phí' })}</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.9rem' }}>
                {L(lang, { en: 'Perfect for trying out', fr: 'Parfait pour essayer', es: 'Perfecto para probar', vi: 'Hoàn hảo để dùng thử' })}
              </p>
              <div style={{ fontSize: '3.5rem', fontWeight: '700', marginBottom: '1rem' }}>
                $0 <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/{L(lang, { en: 'forever', fr: 'toujours', es: 'para siempre', vi: 'mãi mãi' })}</span>
              </div>
              <ul style={{ textAlign: 'left', listStyle: 'none', padding: 0, marginBottom: '1.5rem' }}>
                <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border)' }}>✓ 1 simulation (Project Apex)</li>
                <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border)' }}>{L(lang, { en: '✓ Basic scenarios', fr: '✓ Scénarios de base', es: '✓ Escenarios básicos', vi: '✓ Kịch bản cơ bản' })}</li>
                <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border)' }}>{L(lang, { en: '✓ Score tracking', fr: '✓ Suivi des scores', es: '✓ Seguimiento de puntaje', vi: '✓ Theo dõi điểm số' })}</li>
                <li style={{ padding: '0.5rem 0' }}>{L(lang, { en: '✓ Community support', fr: '✓ Support communautaire', es: '✓ Soporte comunitario', vi: '✓ Hỗ trợ cộng đồng' })}</li>
              </ul>
              <button 
                className="btn-secondary btn-full"
                onClick={() => { setCurrentPage('auth'); setAuthMode('signup'); }}
              >
                {L(lang, { en: 'Get Started Free', fr: 'Commencer gratuitement', es: 'Comienza gratis', vi: 'Bắt đầu miễn phí' })}
              </button>
            </div>
            
            {/* Pro Plan */}
            <div style={{ 
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))',
              border: '2px solid var(--accent-primary)', 
              borderRadius: '16px', 
              padding: '2rem', 
              width: '300px',
              textAlign: 'center',
              position: 'relative'
            }}>
              <div style={{ 
                position: 'absolute', 
                top: '-12px', 
                left: '50%', 
                transform: 'translateX(-50%)',
                background: 'var(--accent-primary)',
                color: 'white',
                padding: '4px 16px',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: '600'
              }}>
                {L(lang, { en: 'Most Popular', fr: 'Plus populaire', es: 'Más popular', vi: 'Phổ biến nhất' })}
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{L(lang, { en: 'Professional', fr: 'Professionnel', es: 'Profesional', vi: 'Chuyên nghiệp' })}</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.9rem' }}>
                {L(lang, { en: 'For serious learners', fr: 'Pour les apprenants sérieux', es: 'Para estudiantes serios', vi: 'Dành cho người học nghiêm túc' })}
              </p>
              <div style={{ fontSize: '3.5rem', fontWeight: '700', marginBottom: '1rem' }}>
                $19 <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/{L(lang, { en: 'month', fr: 'mois', es: 'mes', vi: 'tháng' })}</span>
              </div>
              <ul style={{ textAlign: 'left', listStyle: 'none', padding: 0, marginBottom: '1.5rem' }}>
                <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border)' }}>{L(lang, { en: '✓ All simulations', fr: '✓ Toutes les simulations', es: '✓ Todas las simulaciones', vi: '✓ Tất cả mô phỏng' })}</li>
                <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border)' }}>{L(lang, { en: '✓ All scenarios', fr: '✓ Tous les scénarios', es: '✓ Todos los escenarios', vi: '✓ Tất cả kịch bản' })}</li>
                <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border)' }}>{L(lang, { en: '✓ Detailed analytics', fr: '✓ Analyses détaillées', es: '✓ Analíticas detalladas', vi: '✓ Phân tích chi tiết' })}</li>
                <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border)' }}>{L(lang, { en: '✓ Certificates', fr: '✓ Certificats', es: '✓ Certificados', vi: '✓ Chứng chỉ' })}</li>
                <li style={{ padding: '0.5rem 0' }}>{L(lang, { en: '✓ Priority support', fr: '✓ Support prioritaire', es: '✓ Soporte prioritario', vi: '✓ Hỗ trợ ưu tiên' })}</li>
              </ul>
              <button 
                className="btn-primary btn-full"
                onClick={() => { setCurrentPage('auth'); setAuthMode('signup'); }}
              >
                {L(lang, { en: 'Start Free Trial', fr: 'Commencer l\'essai gratuit', es: 'Iniciar prueba gratuita', vi: 'Bắt đầu dùng thử miễn phí' })}
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <span className="logo-icon">🎓</span>
            <span className="logo-text">BizSim<span className="logo-accent">Hub</span></span>
            <p>{t('footer.madeWith', lang)}</p>
            <div className="social-links" style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
              <a href="https://www.linkedin.com/company/sylvain-pmo-consulting" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', fontSize: '20px', transition: 'color 0.2s' }} title="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://x.com/Sylgau" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', fontSize: '20px', transition: 'color 0.2s' }} title="X (Twitter)">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61586908877730" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', fontSize: '20px', transition: 'color 0.2s' }} title="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://www.instagram.com/sylv.ainpmo/" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', fontSize: '20px', transition: 'color 0.2s' }} title="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            </div>
          </div>
          <div className="footer-links">
            <div className="footer-col"><h4>{t('footer.product', lang)}</h4><a href="#" onClick={() => setCurrentPage('catalog')}>{t('nav.simulations', lang)}</a><a href="#">{t('footer.forEducators', lang)}</a></div>
            <div className="footer-col"><h4>{t('footer.company', lang)}</h4><a href="#">{t('footer.about', lang)}</a><a href="/contact.html">{t('nav.contact', lang)}</a></div>
            <div className="footer-col"><h4>Legal</h4><a href="#">Privacy</a><a href="#">Terms</a></div>
          </div>
        </div>
        <div className="footer-bottom"><p>© 2025 BizSimHub. {t('footer.allRights', lang)}</p></div>
      </footer>
    </div>
  );

  const renderAuth = () => (
    <div className="auth-page">
      {renderNavbar()}
      <div className="auth-container">
        <div className="auth-card">
          {/* Forgot Password Mode */}
          {authMode === 'forgot' ? (
            <>
              <h2>{L(lang, { en: 'Reset Password', fr: 'Réinitialiser le mot de passe', es: 'Restablecer contraseña', vi: 'Đặt lại mật khẩu' })}</h2>
              <p className="auth-subtitle">{L(lang, { en: 'Enter your email to receive a reset link', fr: 'Entrez votre courriel pour recevoir un lien', es: 'Ingresa tu correo para recibir un enlace de restablecimiento', vi: 'Nhập email để nhận liên kết đặt lại mật khẩu' })}</p>
              
              {authError && <div className="auth-error">{authError}</div>}
              {authSuccess && <div className="auth-success">{authSuccess}</div>}
              
              <form onSubmit={async (e) => {
                e.preventDefault();
                setAuthLoading(true);
                setAuthError('');
                setAuthSuccess('');
                try {
                  const res = await fetch(`${API_BASE}/auth/forgot-password`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: e.target.email.value })
                  });
                  const data = await res.json();
                  if (res.ok) {
                    setAuthSuccess(L(lang, { en: 'If an account exists, you will receive a reset link shortly.', fr: 'Si un compte existe, vous recevrez un lien sous peu.', es: 'Si existe una cuenta, recibirás un enlace en breve.', vi: 'Nếu tài khoản tồn tại, bạn sẽ sớm nhận được liên kết đặt lại.' }));
                  } else {
                    setAuthError(data.error || 'Failed to send reset email');
                  }
                } catch (err) {
                  setAuthError('Failed to send reset email');
                } finally {
                  setAuthLoading(false);
                }
              }}>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" name="email" placeholder="you@example.com" required />
                </div>
                <button type="submit" className="btn-primary btn-full" disabled={authLoading}>
                  {authLoading ? (L(lang, { en: 'Sending...', fr: 'Envoi...', es: 'Enviando...', vi: 'Đang gửi...' })) : (L(lang, { en: 'Send Reset Link', fr: 'Envoyer le lien', es: 'Enviar enlace', vi: 'Gửi liên kết đặt lại' }))}
                </button>
              </form>
              
              <p className="auth-toggle">
                <button onClick={() => { setAuthMode('login'); setAuthError(''); setAuthSuccess(''); }}>
                  ← {L(lang, { en: 'Back to Sign In', fr: 'Retour à la connexion', es: 'Volver a iniciar sesión', vi: 'Quay lại đăng nhập' })}
                </button>
              </p>
            </>
          ) : authMode === 'reset' ? (
            /* Reset Password Mode (from email link) */
            <>
              <h2>{L(lang, { en: 'Create New Password', fr: 'Créer un nouveau mot de passe', es: 'Crear nueva contraseña', vi: 'Tạo mật khẩu mới' })}</h2>
              <p className="auth-subtitle">{L(lang, { en: 'Enter your new password below', fr: 'Entrez votre nouveau mot de passe', es: 'Ingresa tu nueva contraseña', vi: 'Nhập mật khẩu mới bên dưới' })}</p>
              
              {authError && <div className="auth-error">{authError}</div>}
              {authSuccess && <div className="auth-success">{authSuccess}</div>}
              
              <form onSubmit={async (e) => {
                e.preventDefault();
                const password = e.target.password.value;
                const confirmPassword = e.target.confirmPassword.value;
                
                if (password !== confirmPassword) {
                  setAuthError(L(lang, { en: 'Passwords do not match', fr: 'Les mots de passe ne correspondent pas', es: 'Las contraseñas no coinciden', vi: 'Mật khẩu không khớp' }));
                  return;
                }
                
                setAuthLoading(true);
                setAuthError('');
                try {
                  const res = await fetch(`${API_BASE}/auth/reset-password`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token: resetToken, password })
                  });
                  const data = await res.json();
                  if (res.ok) {
                    setAuthSuccess(L(lang, { en: 'Password reset successful! You can now sign in.', fr: 'Mot de passe réinitialisé! Vous pouvez maintenant vous connecter.', es: '¡Contraseña restablecida! Ya puedes iniciar sesión.', vi: 'Đặt lại mật khẩu thành công! Bạn có thể đăng nhập ngay.' }));
                    setResetToken(null);
                    // Clear URL params
                    window.history.replaceState({}, document.title, window.location.pathname);
                    setTimeout(() => {
                      setAuthMode('login');
                      setAuthSuccess('');
                    }, 2000);
                  } else {
                    setAuthError(data.error || 'Failed to reset password');
                  }
                } catch (err) {
                  setAuthError('Failed to reset password');
                } finally {
                  setAuthLoading(false);
                }
              }}>
                <div className="form-group">
                  <label>{L(lang, { en: 'New Password', fr: 'Nouveau mot de passe', es: 'Nueva contraseña', vi: 'Mật khẩu mới' })}</label>
                  <input type="password" name="password" placeholder="••••••••" required minLength={6} />
                </div>
                <div className="form-group">
                  <label>{L(lang, { en: 'Confirm Password', fr: 'Confirmer le mot de passe', es: 'Confirmar contraseña', vi: 'Xác nhận mật khẩu' })}</label>
                  <input type="password" name="confirmPassword" placeholder="••••••••" required minLength={6} />
                </div>
                <button type="submit" className="btn-primary btn-full" disabled={authLoading}>
                  {authLoading ? (L(lang, { en: 'Resetting...', fr: 'Réinitialisation...', es: 'Restableciendo...', vi: 'Đang đặt lại...' })) : (L(lang, { en: 'Reset Password', fr: 'Réinitialiser', es: 'Restablecer contraseña', vi: 'Đặt lại mật khẩu' }))}
                </button>
              </form>
            </>
          ) : (
            /* Normal Login/Signup Mode */
            <>
              <h2>{authMode === 'login' ? (L(lang, { en: 'Welcome', fr: 'Bienvenue', es: 'Bienvenido', vi: 'Chào mừng' })) : (L(lang, { en: 'Create Account', fr: 'Créer un compte', es: 'Crear cuenta', vi: 'Tạo tài khoản' }))}</h2>
              <p className="auth-subtitle">{authMode === 'login' ? (L(lang, { en: 'Sign in to continue learning', fr: 'Connectez-vous pour continuer', es: 'Inicia sesión para seguir aprendiendo', vi: 'Đăng nhập để tiếp tục học' })) : (L(lang, { en: 'Start your learning journey', fr: 'Commencez votre parcours', es: 'Comienza tu camino de aprendizaje', vi: 'Bắt đầu hành trình học tập của bạn' }))}</p>
              
              {authError && <div className="auth-error">{authError}</div>}
              
              <form onSubmit={(e) => {
                e.preventDefault();
                const form = e.target;
                if (authMode === 'login') {
                  handleLogin(form.email.value, form.password.value);
                } else {
                  handleSignup(form.name.value, form.email.value, form.password.value);
                }
              }}>
                {authMode === 'signup' && (
                  <div className="form-group">
                    <label>{L(lang, { en: 'Full Name', fr: 'Nom complet', es: 'Nombre completo', vi: 'Họ và tên' })}</label>
                    <input type="text" name="name" placeholder="John Doe" required />
                  </div>
                )}
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" name="email" placeholder="you@example.com" required />
                </div>
                <div className="form-group">
                  <label>{L(lang, { en: 'Password', fr: 'Mot de passe', es: 'Contraseña', vi: 'Mật khẩu' })}</label>
                  <input type="password" name="password" placeholder="••••••••" required minLength={6} />
                </div>
                <button type="submit" className="btn-primary btn-full" disabled={authLoading}>
                  {authLoading ? (L(lang, { en: 'Please wait...', fr: 'Patientez...', es: 'Espera un momento...', vi: 'Vui lòng chờ...' })) : authMode === 'login' ? (L(lang, { en: 'Sign In', fr: 'Connexion', es: 'Iniciar sesión', vi: 'Đăng nhập' })) : (L(lang, { en: 'Create Account', fr: 'Créer le compte', es: 'Crear cuenta', vi: 'Tạo tài khoản' }))}
                </button>
              </form>
              
              <p className="auth-toggle">
                {authMode === 'login' ? (L(lang, { en: "Don't have an account? ", fr: "Pas de compte? ", es: '¿No tienes cuenta? ', vi: 'Chưa có tài khoản? ' })) : (L(lang, { en: 'Already have an account? ', fr: 'Déjà un compte? ', es: '¿Ya tienes cuenta? ', vi: 'Đã có tài khoản? ' }))}
                <button onClick={() => { setAuthMode(authMode === 'login' ? 'signup' : 'login'); setAuthError(''); }}>
                  {authMode === 'login' ? (L(lang, { en: 'Sign Up', fr: "S'inscrire", es: 'Registrarse', vi: 'Đăng ký' })) : (L(lang, { en: 'Sign In', fr: 'Connexion', es: 'Iniciar sesión', vi: 'Đăng nhập' }))}
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );

  // ============================================
  // ADMIN DASHBOARD
  // ============================================
  
  const [adminTab, setAdminTab] = useState('overview');
  const [adminSearch, setAdminSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminError, setAdminError] = useState(null);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUserForm, setNewUserForm] = useState({ name: '', email: '', password: '', plan: 'free' });
  
  // Admin data state (fetched from API)
  const [adminData, setAdminData] = useState({
    overview: {
      totalUsers: 0,
      activeUsers: 0,
      totalRevenue: 0,
      monthlyRevenue: 0,
      completionRate: 0,
      avgSessionTime: '0 min',
      newUsersToday: 0,
      activeNow: 0,
      subscriptions: { free: 0, pro: 0, enterprise: 0 },
      recentActivity: []
    },
    users: [],
    revenue: {
      mrr: 0,
      arr: 0,
      growth: 0,
      churnRate: 0,
      ltv: 0,
      subscriptions: { free: 0, professional: 0, enterprise: 0 },
      recentTransactions: []
    },
    analytics: {
      popularSimulations: [],
      weeklyActivity: [
        { day: 'Mon', users: 0, sessions: 0 },
        { day: 'Tue', users: 0, sessions: 0 },
        { day: 'Wed', users: 0, sessions: 0 },
        { day: 'Thu', users: 0, sessions: 0 },
        { day: 'Fri', users: 0, sessions: 0 },
        { day: 'Sat', users: 0, sessions: 0 },
        { day: 'Sun', users: 0, sessions: 0 },
      ],
      gradeDistribution: { A: 0, B: 0, C: 0, D: 0, F: 0 }
    },
    content: {
      simulations: SIMULATIONS.map(s => ({
        id: s.id,
        name: s.title,
        status: s.available ? 'published' : 'draft',
        plays: 0,
        rating: null,
        lastUpdated: new Date().toISOString().split('T')[0]
      }))
    },
    system: {
      uptime: 99.9,
      avgResponseTime: 150,
      errorRate: 0.01,
      activeConnections: 0,
      cpuUsage: 25,
      memoryUsage: 45,
      recentErrors: []
    }
  });
  
  // Fetch admin data when admin page is accessed
  const fetchAdminData = async () => {
    if (!currentUser) return;
    
    setAdminLoading(true);
    setAdminError(null);
    
    try {
      // Fetch all admin data in parallel
      const [overviewRes, usersRes, analyticsRes, revenueRes] = await Promise.allSettled([
        api.getAdminOverview(),
        api.getAdminUsers(),
        api.getAdminAnalytics(),
        api.getAdminRevenue()
      ]);
      
      setAdminData(prev => ({
        ...prev,
        overview: overviewRes.status === 'fulfilled' ? overviewRes.value.overview : prev.overview,
        users: usersRes.status === 'fulfilled' ? usersRes.value.users : prev.users,
        analytics: analyticsRes.status === 'fulfilled' ? analyticsRes.value.analytics : prev.analytics,
        revenue: revenueRes.status === 'fulfilled' ? revenueRes.value.revenue : prev.revenue,
      }));
      
    } catch (error) {
      console.error('Error fetching admin data:', error);
      setAdminError('Failed to load admin data. Please try again.');
    } finally {
      setAdminLoading(false);
    }
  };
  
  // Fetch admin data when entering admin page or changing tabs
  useEffect(() => {
    if (currentPage === 'admin' && currentUser?.is_admin) {
      api.request('/admin/users').then(setCourseAdmin).catch(e => showToast('Admin: ' + e.message, 'error'));
    }
  }, [currentPage, currentUser]);

  // Toggle admin status for a user
  const handleToggleAdmin = async (userId, currentIsAdmin) => {
    try {
      const result = await api.toggleAdmin(userId, !currentIsAdmin);
      if (result.success) {
        // Update local state
        setAdminData(prev => ({
          ...prev,
          users: prev.users.map(u => 
            u.id === userId ? { ...u, isAdmin: !currentIsAdmin } : u
          )
        }));
        showToast(result.message, 'success');
      }
    } catch (error) {
      showToast(error.message || 'Failed to update admin status', 'error');
    }
  };

  // Toggle tester status for a user
  const handleToggleTester = async (userId, currentIsTester) => {
    try {
      const result = await api.toggleTester(userId, !currentIsTester);
      if (result.success) {
        // Update local state
        setAdminData(prev => ({
          ...prev,
          users: prev.users.map(u => 
            u.id === userId ? { ...u, isTester: !currentIsTester } : u
          )
        }));
        showToast(result.message, 'success');
      }
    } catch (error) {
      showToast(error.message || 'Failed to update tester status', 'error');
    }
  };

  // Delete user
  const handleDeleteUser = async (userId, userName) => {
    const confirmed = window.confirm(
      L(lang, { en: `Are you sure you want to delete "${userName}"? This action cannot be undone.`, fr: `Êtes-vous sûr de vouloir supprimer "${userName}"? Cette action est irréversible.`, es: `¿Seguro que deseas eliminar a "${userName}"? Esta acción no se puede deshacer.`, vi: `Bạn có chắc muốn xóa "${userName}"? Hành động này không thể hoàn tác.` }));
    
    if (!confirmed) return;
    
    try {
      const res = await fetch(`${API_BASE}/admin/delete-user`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${api.getToken()}`
        },
        body: JSON.stringify({ userId })
      });
      
      const result = await res.json();
      
      if (res.ok && result.success) {
        // Remove user from local state
        setAdminData(prev => ({
          ...prev,
          users: prev.users.filter(u => u.id !== userId)
        }));
        showToast(L(lang, { en: 'User deleted successfully', fr: 'Utilisateur supprimé', es: 'Usuario eliminado correctamente', vi: 'Đã xóa người dùng' }), 'success');
      } else {
        showToast(result.error || 'Failed to delete user', 'error');
      }
    } catch (error) {
      showToast('Failed to delete user', 'error');
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    
    if (!newUserForm.email || !newUserForm.name) {
      showToast(L(lang, { en: 'Name and email are required', fr: 'Nom et courriel requis', es: 'Nombre y correo son obligatorios', vi: 'Cần nhập tên và email' }), 'error');
      return;
    }
    
    try {
      const res = await fetch(`${API_BASE}/admin/add-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${api.getToken()}`
        },
        body: JSON.stringify(newUserForm)
      });
      
      const result = await res.json();
      
      if (res.ok && result.success) {
        // Add user to local state
        setAdminData(prev => ({
          ...prev,
          users: [result.user, ...prev.users]
        }));
        
        // Show success with temporary password if generated
        if (result.temporaryPassword) {
          showToast(`User created! Temp password: ${result.temporaryPassword}`, 'success');
        } else {
          showToast(L(lang, { en: 'User created successfully', fr: 'Utilisateur créé', es: 'Usuario creado correctamente', vi: 'Đã tạo người dùng' }), 'success');
        }
        
        // Reset form and close modal
        setNewUserForm({ name: '', email: '', password: '', plan: 'free' });
        setShowAddUserModal(false);
        
        // Refresh user list
        fetchAdminUsers();
      } else {
        showToast(result.error || 'Failed to create user', 'error');
      }
    } catch (error) {
      showToast('Failed to create user', 'error');
    }
  };

  const renderAdminDashboard = () => {
    const filteredUsers = adminData.users.filter(u => 
      u.name?.toLowerCase().includes(adminSearch.toLowerCase()) ||
      u.email?.toLowerCase().includes(adminSearch.toLowerCase())
    );

    return (
      <div className="admin-page">
        {renderNavbar()}
        
        {/* Loading overlay */}
        {adminLoading && (
          <div className="admin-loading-overlay">
            <div className="admin-loading-spinner">
              <div className="spinner"></div>
              <p>Loading admin data...</p>
            </div>
          </div>
        )}
        
        {/* Error banner */}
        {adminError && (
          <div className="admin-error-banner">
            <span>⚠️ {adminError}</span>
            <button onClick={fetchAdminData}>Retry</button>
          </div>
        )}
        
        <div className="admin-layout">
          {/* Sidebar */}
          <aside className="admin-sidebar">
            <div className="admin-sidebar-header">
              <span className="admin-logo">⚙️</span>
              <h2>Admin Panel</h2>
            </div>
            <nav className="admin-nav">
              <button className={`admin-nav-btn ${adminTab === 'overview' ? 'active' : ''}`} onClick={() => setAdminTab('overview')}>
                <span>📊</span> Overview
              </button>
              <button className={`admin-nav-btn ${adminTab === 'users' ? 'active' : ''}`} onClick={() => setAdminTab('users')}>
                <span>👥</span> Users
              </button>
              <button className={`admin-nav-btn ${adminTab === 'analytics' ? 'active' : ''}`} onClick={() => setAdminTab('analytics')}>
                <span>📈</span> Analytics
              </button>
              <button className={`admin-nav-btn ${adminTab === 'revenue' ? 'active' : ''}`} onClick={() => setAdminTab('revenue')}>
                <span>💰</span> Revenue
              </button>
              <button className={`admin-nav-btn ${adminTab === 'content' ? 'active' : ''}`} onClick={() => setAdminTab('content')}>
                <span>📚</span> Content
              </button>
              <button className={`admin-nav-btn ${adminTab === 'system' ? 'active' : ''}`} onClick={() => setAdminTab('system')}>
                <span>🔧</span> System
              </button>
            </nav>
            <div className="admin-sidebar-footer">
              <button className="admin-back-btn" onClick={() => setCurrentPage('dashboard')}>
                ← Back to App
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="admin-main">
            {/* Overview Tab */}
            {adminTab === 'overview' && (
              <div className="admin-content">
                <div className="admin-header">
                  <div>
                    <h1>Dashboard Overview</h1>
                    <p>{L(lang, { en: 'Welcome! Here\'s what\'s happening with BizSimHub today.', fr: 'Bienvenue! Voici ce qui se passe avec BizSimHub aujourd\'hui.', es: '¡Bienvenido! Esto es lo que pasa hoy en BizSimHub.', vi: 'Chào mừng! Đây là tình hình BizSimHub hôm nay.' })}</p>
                  </div>
                  <button className="admin-btn refresh-btn" onClick={fetchAdminData} disabled={adminLoading}>
                    {adminLoading ? '↻ Loading...' : '↻ Refresh'}
                  </button>
                </div>

                {/* Key Metrics */}
                <div className="admin-metrics-grid">
                  <div className="admin-metric-card">
                    <div className="metric-icon blue">👥</div>
                    <div className="metric-info">
                      <span className="metric-value">{adminData.overview.totalUsers.toLocaleString()}</span>
                      <span className="metric-label">Total Users</span>
                    </div>
                    <span className="metric-badge green">+{adminData.overview.newUsersToday} today</span>
                  </div>
                  <div className="admin-metric-card">
                    <div className="metric-icon green">💰</div>
                    <div className="metric-info">
                      <span className="metric-value">${adminData.overview.monthlyRevenue.toLocaleString()}</span>
                      <span className="metric-label">Monthly Revenue</span>
                    </div>
                    <span className="metric-badge green">+23% MoM</span>
                  </div>
                  <div className="admin-metric-card">
                    <div className="metric-icon purple">🎯</div>
                    <div className="metric-info">
                      <span className="metric-value">{adminData.overview.completionRate}%</span>
                      <span className="metric-label">Completion Rate</span>
                    </div>
                    <span className="metric-badge neutral">Avg</span>
                  </div>
                  <div className="admin-metric-card">
                    <div className="metric-icon orange">⚡</div>
                    <div className="metric-info">
                      <span className="metric-value">{adminData.overview.activeNow}</span>
                      <span className="metric-label">Active Now</span>
                    </div>
                    <span className="metric-badge blue">Live</span>
                  </div>
                </div>

                {/* Quick Stats Row */}
                <div className="admin-stats-row">
                  <div className="admin-stat-card">
                    <h3>Active Users (30d)</h3>
                    <div className="stat-big">{adminData.overview.activeUsers.toLocaleString()}</div>
                    <div className="stat-bar">
                      <div className="stat-bar-fill" style={{width: `${(adminData.overview.activeUsers / adminData.overview.totalUsers) * 100}%`}}></div>
                    </div>
                    <span className="stat-sub">{Math.round((adminData.overview.activeUsers / adminData.overview.totalUsers) * 100)}% of total users</span>
                  </div>
                  <div className="admin-stat-card">
                    <h3>Avg Session Time</h3>
                    <div className="stat-big">{adminData.overview.avgSessionTime}</div>
                    <span className="stat-sub">Per user session</span>
                  </div>
                  <div className="admin-stat-card">
                    <h3>Total Revenue (All Time)</h3>
                    <div className="stat-big">${adminData.overview.totalRevenue.toLocaleString()}</div>
                    <span className="stat-sub">Since launch</span>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="admin-section">
                  <h3>Recent Activity</h3>
                  <div className="activity-list">
                    <div className="activity-item">
                      <span className="activity-icon">🎉</span>
                      <div className="activity-content">
                        <strong>Michael Brown</strong> completed Project Apex with Grade A
                        <span className="activity-time">5 minutes ago</span>
                      </div>
                    </div>
                    <div className="activity-item">
                      <span className="activity-icon">💳</span>
                      <div className="activity-content">
                        <strong>Lisa Thompson</strong> upgraded to Professional plan
                        <span className="activity-time">23 minutes ago</span>
                      </div>
                    </div>
                    <div className="activity-item">
                      <span className="activity-icon">👤</span>
                      <div className="activity-content">
                        <strong>New user registered:</strong> alex@company.com
                        <span className="activity-time">1 hour ago</span>
                      </div>
                    </div>
                    <div className="activity-item">
                      <span className="activity-icon">🎯</span>
                      <div className="activity-content">
                        <strong>Enterprise Scale</strong> simulation reached 1,500 plays
                        <span className="activity-time">2 hours ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Users Tab */}
            {adminTab === 'users' && (
              <div className="admin-content">
                <div className="admin-header">
                  <h1>User Management</h1>
                  <p>Manage and monitor all platform users</p>
                </div>

                {/* User Stats */}
                <div className="admin-user-stats">
                  <div className="user-stat">
                    <span className="user-stat-value">{adminData.users.filter(u => u.status === 'active').length}</span>
                    <span className="user-stat-label">Active</span>
                  </div>
                  <div className="user-stat">
                    <span className="user-stat-value">{adminData.users.filter(u => u.plan === 'Professional').length}</span>
                    <span className="user-stat-label">Professional</span>
                  </div>
                  <div className="user-stat">
                    <span className="user-stat-value">{adminData.users.filter(u => u.plan === 'Lifetime').length}</span>
                    <span className="user-stat-label">Lifetime</span>
                  </div>
                  <div className="user-stat">
                    <span className="user-stat-value">{adminData.users.filter(u => u.plan === 'Enterprise').length}</span>
                    <span className="user-stat-label">Enterprise</span>
                  </div>
                  <div className="user-stat">
                    <span className="user-stat-value">{adminData.users.filter(u => u.status === 'churned').length}</span>
                    <span className="user-stat-label">Churned</span>
                  </div>
                </div>

                {/* Search & Filter */}
                <div className="admin-toolbar">
                  <div className="search-box">
                    <span>🔍</span>
                    <input 
                      type="text" 
                      placeholder="Search users by name or email..." 
                      value={adminSearch}
                      onChange={(e) => setAdminSearch(e.target.value)}
                    />
                  </div>
                  <div className="toolbar-actions">
                    <select className="admin-select">
                      <option>All Plans</option>
                      <option>Free</option>
                      <option>Professional</option>
                      <option>Lifetime</option>
                      <option>Enterprise</option>
                    </select>
                    <select className="admin-select">
                      <option>All Status</option>
                      <option>Active</option>
                      <option>Inactive</option>
                      <option>Churned</option>
                    </select>
                    <button className="admin-btn primary" onClick={() => setShowAddUserModal(true)}>+ Add User</button>
                  </div>
                </div>

                {/* Users Table */}
                <div className="admin-table-container">
                  {filteredUsers.length > 0 ? (
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>User</th>
                          <th>Plan</th>
                          <th>Status</th>
                          <th>Simulations</th>
                          <th>Last Active</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map(user => (
                          <tr key={user.id}>
                            <td>
                              <div className="user-cell">
                                <div className="user-avatar">{(user.name || user.email || '?').charAt(0).toUpperCase()}</div>
                                <div className="user-info">
                                  <strong>
                                    {user.name || 'Unknown'}
                                    {user.isAdmin && <span className="admin-badge">Admin</span>}
                                    {user.isTester && <span className="tester-badge">Tester</span>}
                                  </strong>
                                  <span>{user.email}</span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className={`plan-badge ${user.isTester ? 'tester' : (user.plan || 'free').toLowerCase()}`}>
                                {user.isTester ? 'Tester' : (user.plan || 'Free')}
                              </span>
                            </td>
                            <td>
                              <span className={`status-badge ${user.status || 'active'}`}>{user.status || 'active'}</span>
                            </td>
                            <td>
                              <span className="sim-count">{user.completions || 0}/{user.simulations || 0}</span>
                              <span className="sim-label">completed</span>
                            </td>
                            <td className="last-active">{user.lastActive || 'Never'}</td>
                            <td>
                              <div className="action-btns">
                                <button className="action-btn" title="View" onClick={() => setSelectedUser(user)}>👁</button>
                                <button 
                                  className={`action-btn ${user.isTester ? 'tester-active' : ''}`} 
                                  title={user.isTester ? 'Remove Tester' : 'Make Tester'}
                                  onClick={() => handleToggleTester(user.id, user.isTester)}
                                >
                                  🧪
                                </button>
                                <button 
                                  className={`action-btn ${user.isAdmin ? 'admin-active' : ''}`} 
                                  title={user.isAdmin ? 'Remove Admin' : 'Make Admin'}
                                  onClick={() => handleToggleAdmin(user.id, user.isAdmin)}
                                >
                                  👑
                                </button>
                                <button className="action-btn danger" title="Delete" onClick={() => handleDeleteUser(user.id, user.name)}>🗑</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="empty-state">
                      <div className="empty-icon">👥</div>
                      <p>{adminSearch ? 'No users match your search' : 'No users yet'}</p>
                    </div>
                  )}
                </div>

                {/* User Detail Modal */}
                {selectedUser && (
                  <div className="admin-modal-overlay" onClick={() => setSelectedUser(null)}>
                    <div className="admin-modal" onClick={e => e.stopPropagation()}>
                      <div className="modal-header">
                        <h2>User Details</h2>
                        <button className="modal-close" onClick={() => setSelectedUser(null)}>×</button>
                      </div>
                      <div className="modal-body">
                        <div className="user-detail-header">
                          <div className="user-avatar large">{(selectedUser.name || selectedUser.email || '?').charAt(0).toUpperCase()}</div>
                          <div>
                            <h3>{selectedUser.name || 'Unknown'}</h3>
                            <p>{selectedUser.email}</p>
                          </div>
                        </div>
                        <div className="user-detail-grid">
                          <div className="detail-item">
                            <label>Plan</label>
                            <span className={`plan-badge ${(selectedUser.plan || 'free').toLowerCase()}`}>{selectedUser.plan || 'Free'}</span>
                          </div>
                          <div className="detail-item">
                            <label>Status</label>
                            <span className={`status-badge ${selectedUser.status || 'active'}`}>{selectedUser.status || 'active'}</span>
                          </div>
                          <div className="detail-item">
                            <label>Admin</label>
                            <span className={`status-badge ${selectedUser.isAdmin ? 'active' : 'inactive'}`}>
                              {selectedUser.isAdmin ? '✓ Yes' : 'No'}
                            </span>
                          </div>
                          <div className="detail-item">
                            <label>Joined</label>
                            <span>{selectedUser.joined || 'N/A'}</span>
                          </div>
                          <div className="detail-item">
                            <label>Last Active</label>
                            <span>{selectedUser.lastActive || 'Never'}</span>
                          </div>
                          <div className="detail-item">
                            <label>Simulations Played</label>
                            <span>{selectedUser.simulations || 0}</span>
                          </div>
                          <div className="detail-item">
                            <label>Completions</label>
                            <span>{selectedUser.completions || 0}</span>
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button 
                          className={`admin-btn ${selectedUser.isAdmin ? 'danger' : 'primary'}`}
                          onClick={() => {
                            handleToggleAdmin(selectedUser.id, selectedUser.isAdmin);
                            setSelectedUser(prev => ({ ...prev, isAdmin: !prev.isAdmin }));
                          }}
                        >
                          {selectedUser.isAdmin ? '👑 Remove Admin' : '👑 Make Admin'}
                        </button>
                        <button className="admin-btn">Send Email</button>
                        <button className="admin-btn danger">Suspend User</button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Add User Modal */}
                {showAddUserModal && (
                  <div className="admin-modal-overlay" onClick={() => setShowAddUserModal(false)}>
                    <div className="admin-modal" onClick={e => e.stopPropagation()}>
                      <div className="modal-header">
                        <h2>Add New User</h2>
                        <button className="modal-close" onClick={() => setShowAddUserModal(false)}>×</button>
                      </div>
                      <form onSubmit={handleAddUser}>
                        <div className="modal-body">
                          <div className="form-group">
                            <label>Name *</label>
                            <input 
                              type="text" 
                              value={newUserForm.name}
                              onChange={e => setNewUserForm(prev => ({ ...prev, name: e.target.value }))}
                              placeholder="John Doe"
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label>Email *</label>
                            <input 
                              type="email" 
                              value={newUserForm.email}
                              onChange={e => setNewUserForm(prev => ({ ...prev, email: e.target.value }))}
                              placeholder="john@example.com"
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label>Password (leave empty for auto-generated)</label>
                            <input 
                              type="text" 
                              value={newUserForm.password}
                              onChange={e => setNewUserForm(prev => ({ ...prev, password: e.target.value }))}
                              placeholder="Auto-generate if blank"
                            />
                          </div>
                          <div className="form-group">
                            <label>Plan</label>
                            <select 
                              value={newUserForm.plan}
                              onChange={e => setNewUserForm(prev => ({ ...prev, plan: e.target.value }))}
                            >
                              <option value="free">Free</option>
                              <option value="pro">Pro ($19/mo)</option>
                              <option value="pro_lifetime">Pro Lifetime ($149)</option>
                              <option value="enterprise">Enterprise</option>
                            </select>
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="admin-btn" onClick={() => setShowAddUserModal(false)}>Cancel</button>
                          <button type="submit" className="admin-btn primary">Create User</button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Analytics Tab */}
            {adminTab === 'analytics' && (
              <div className="admin-content">
                <div className="admin-header">
                  <h1>Analytics</h1>
                  <p>Platform performance and user engagement metrics</p>
                </div>

                {/* Weekly Activity Chart */}
                <div className="admin-chart-section">
                  <h3>Weekly Activity</h3>
                  <div className="bar-chart">
                    {adminData.analytics.weeklyActivity.map((day, i) => (
                      <div key={i} className="bar-group">
                        <div className="bar-container">
                          <div className="bar users" style={{height: `${(day.users / 600) * 100}%`}} title={`${day.users} users`}></div>
                          <div className="bar sessions" style={{height: `${(day.sessions / 1000) * 100}%`}} title={`${day.sessions} sessions`}></div>
                        </div>
                        <span className="bar-label">{day.day}</span>
                      </div>
                    ))}
                  </div>
                  <div className="chart-legend">
                    <span><i className="legend-dot users"></i> Users</span>
                    <span><i className="legend-dot sessions"></i> Sessions</span>
                  </div>
                </div>

                {/* Popular Simulations */}
                <div className="admin-section">
                  <h3>Popular Simulations</h3>
                  {adminData.analytics.popularSimulations?.length > 0 ? (
                    <div className="sim-rankings">
                      {adminData.analytics.popularSimulations.map((sim, i) => (
                        <div key={sim.id || i} className="sim-rank-item">
                          <span className="rank">#{i + 1}</span>
                          <div className="sim-rank-info">
                            <strong>{sim.name}</strong>
                            <div className="sim-rank-stats">
                              <span>🎮 {(sim.plays || 0).toLocaleString()} plays</span>
                              <span>✅ {(sim.completions || 0).toLocaleString()} completions</span>
                              <span>⭐ {sim.avgScore || 0} avg score</span>
                            </div>
                          </div>
                          <div className="completion-rate">
                            {sim.plays > 0 ? Math.round((sim.completions / sim.plays) * 100) : 0}%
                            <span>completion</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-state">
                      <div className="empty-icon">📊</div>
                      <p>No simulation data yet</p>
                    </div>
                  )}
                </div>

                {/* Grade Distribution */}
                <div className="admin-section">
                  <h3>Grade Distribution</h3>
                  <div className="grade-chart">
                    {Object.entries(adminData.analytics.gradeDistribution).map(([grade, pct]) => (
                      <div key={grade} className="grade-bar-item">
                        <span className="grade-label">{grade}</span>
                        <div className="grade-bar-container">
                          <div className={`grade-bar grade-${grade.toLowerCase()}`} style={{width: `${pct}%`}}></div>
                        </div>
                        <span className="grade-pct">{pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Revenue Tab */}
            {adminTab === 'revenue' && (
              <div className="admin-content">
                <div className="admin-header">
                  <h1>Revenue</h1>
                  <p>Financial metrics and subscription analytics</p>
                </div>

                {/* Revenue Metrics */}
                <div className="admin-metrics-grid">
                  <div className="admin-metric-card">
                    <div className="metric-icon green">📈</div>
                    <div className="metric-info">
                      <span className="metric-value">${adminData.revenue.mrr.toLocaleString()}</span>
                      <span className="metric-label">Monthly Recurring Revenue</span>
                    </div>
                    <span className="metric-badge green">+{adminData.revenue.growth}%</span>
                  </div>
                  <div className="admin-metric-card">
                    <div className="metric-icon blue">📊</div>
                    <div className="metric-info">
                      <span className="metric-value">${adminData.revenue.arr.toLocaleString()}</span>
                      <span className="metric-label">Annual Recurring Revenue</span>
                    </div>
                  </div>
                  <div className="admin-metric-card">
                    <div className="metric-icon purple">👤</div>
                    <div className="metric-info">
                      <span className="metric-value">${adminData.revenue.ltv}</span>
                      <span className="metric-label">Customer LTV</span>
                    </div>
                  </div>
                  <div className="admin-metric-card">
                    <div className="metric-icon orange">📉</div>
                    <div className="metric-info">
                      <span className="metric-value">{adminData.revenue.churnRate}%</span>
                      <span className="metric-label">Churn Rate</span>
                    </div>
                  </div>
                </div>

                {/* Subscription Breakdown */}
                <div className="admin-section">
                  <h3>Subscription Breakdown</h3>
                  <div className="subscription-breakdown">
                    {(() => {
                      const total = adminData.overview.totalUsers || 1;
                      const free = adminData.revenue.subscriptions?.free || 0;
                      const pro = adminData.revenue.subscriptions?.professional || 0;
                      const enterprise = adminData.revenue.subscriptions?.enterprise || 0;
                      return (
                        <>
                          <div className="sub-item free">
                            <div className="sub-info">
                              <span className="sub-plan">Free</span>
                              <span className="sub-count">{free.toLocaleString()} users</span>
                            </div>
                            <div className="sub-bar">
                              <div className="sub-bar-fill" style={{width: `${(free / total) * 100}%`}}></div>
                            </div>
                            <span className="sub-pct">{Math.round((free / total) * 100)}%</span>
                          </div>
                          <div className="sub-item professional">
                            <div className="sub-info">
                              <span className="sub-plan">Professional</span>
                              <span className="sub-count">{pro.toLocaleString()} users</span>
                            </div>
                            <div className="sub-bar">
                              <div className="sub-bar-fill" style={{width: `${(pro / total) * 100}%`}}></div>
                            </div>
                            <span className="sub-pct">{Math.round((pro / total) * 100)}%</span>
                          </div>
                          <div className="sub-item enterprise">
                            <div className="sub-info">
                              <span className="sub-plan">Enterprise</span>
                              <span className="sub-count">{enterprise.toLocaleString()} users</span>
                            </div>
                            <div className="sub-bar">
                              <div className="sub-bar-fill" style={{width: `${(enterprise / total) * 100}%`}}></div>
                            </div>
                            <span className="sub-pct">{Math.round((enterprise / total) * 100)}%</span>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>

                {/* Recent Transactions */}
                <div className="admin-section">
                  <h3>Recent Transactions</h3>
                  {adminData.revenue.recentTransactions?.length > 0 ? (
                    <div className="transactions-list">
                      {adminData.revenue.recentTransactions.map(txn => (
                        <div key={txn.id} className={`transaction-item ${txn.status}`}>
                          <div className="txn-info">
                            <strong>{txn.user}</strong>
                            <span>{txn.plan} Plan</span>
                          </div>
                          <div className="txn-amount">${txn.amount}</div>
                          <div className="txn-date">{txn.date}</div>
                          <span className={`txn-status ${txn.status}`}>{txn.status}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-state">
                      <div className="empty-icon">💳</div>
                      <p>No transactions yet</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Content Tab */}
            {adminTab === 'content' && (
              <div className="admin-content">
                <div className="admin-header">
                  <h1>Content Management</h1>
                  <p>Manage simulations, scenarios, and learning content</p>
                </div>

                <div className="admin-toolbar">
                  <div className="search-box">
                    <span>🔍</span>
                    <input type="text" placeholder="Search content..." />
                  </div>
                  <div className="toolbar-actions">
                    <button className="admin-btn primary">+ New Simulation</button>
                  </div>
                </div>

                <div className="content-grid">
                  {adminData.content.simulations.map(sim => (
                    <div key={sim.id} className="content-card">
                      <div className="content-header">
                        <h4>{sim.name}</h4>
                        <span className={`content-status ${sim.status}`}>{sim.status}</span>
                      </div>
                      <div className="content-stats">
                        <span>🎮 {sim.plays.toLocaleString()} plays</span>
                        {sim.rating && <span>⭐ {sim.rating}</span>}
                      </div>
                      <div className="content-meta">
                        Last updated: {sim.lastUpdated}
                      </div>
                      <div className="content-actions">
                        <button className="admin-btn small">Edit</button>
                        <button className="admin-btn small">Preview</button>
                        {sim.status === 'draft' && <button className="admin-btn small primary">Publish</button>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* System Tab */}
            {adminTab === 'system' && (
              <div className="admin-content">
                <div className="admin-header">
                  <h1>System Health</h1>
                  <p>Monitor platform performance and system status</p>
                </div>

                {/* System Metrics */}
                <div className="admin-metrics-grid">
                  <div className="admin-metric-card">
                    <div className="metric-icon green">✅</div>
                    <div className="metric-info">
                      <span className="metric-value">{adminData.system.uptime}%</span>
                      <span className="metric-label">Uptime</span>
                    </div>
                    <span className="metric-badge green">Healthy</span>
                  </div>
                  <div className="admin-metric-card">
                    <div className="metric-icon blue">⚡</div>
                    <div className="metric-info">
                      <span className="metric-value">{adminData.system.avgResponseTime}ms</span>
                      <span className="metric-label">Avg Response Time</span>
                    </div>
                  </div>
                  <div className="admin-metric-card">
                    <div className="metric-icon orange">⚠️</div>
                    <div className="metric-info">
                      <span className="metric-value">{adminData.system.errorRate}%</span>
                      <span className="metric-label">Error Rate</span>
                    </div>
                  </div>
                  <div className="admin-metric-card">
                    <div className="metric-icon purple">🔌</div>
                    <div className="metric-info">
                      <span className="metric-value">{adminData.system.activeConnections}</span>
                      <span className="metric-label">Active Connections</span>
                    </div>
                  </div>
                </div>

                {/* Resource Usage */}
                <div className="admin-section">
                  <h3>Resource Usage</h3>
                  <div className="resource-grid">
                    <div className="resource-item">
                      <div className="resource-header">
                        <span>CPU Usage</span>
                        <span>{adminData.system.cpuUsage}%</span>
                      </div>
                      <div className="resource-bar">
                        <div className="resource-fill cpu" style={{width: `${adminData.system.cpuUsage}%`}}></div>
                      </div>
                    </div>
                    <div className="resource-item">
                      <div className="resource-header">
                        <span>Memory Usage</span>
                        <span>{adminData.system.memoryUsage}%</span>
                      </div>
                      <div className="resource-bar">
                        <div className="resource-fill memory" style={{width: `${adminData.system.memoryUsage}%`}}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Errors */}
                <div className="admin-section">
                  <h3>Recent Errors</h3>
                  <div className="errors-list">
                    {adminData.system.recentErrors.map((err, i) => (
                      <div key={i} className="error-item">
                        <span className="error-time">{err.time}</span>
                        <span className="error-type">{err.type}</span>
                        <span className="error-msg">{err.message}</span>
                        <span className="error-count">×{err.count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="admin-section">
                  <h3>Quick Actions</h3>
                  <div className="system-actions">
                    <button className="admin-btn">🔄 Clear Cache</button>
                    <button className="admin-btn">📊 Export Logs</button>
                    <button className="admin-btn">🔧 Run Diagnostics</button>
                    <button className="admin-btn danger">🚨 Maintenance Mode</button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    );
  };

  const renderDashboard = () => (
    <div className="dashboard-page">
      {renderNavbar()}
      <div className="dashboard-layout">
        <aside className="sidebar">
          <div className="sidebar-section">
            <h3>{t('dashboard.quickActions', lang)}</h3>
            <button className="sidebar-btn" onClick={() => startSimulation('project-apex')}>▶️ {t('dashboard.playProjectApex', lang)}</button>
            {SCENARIO_CATEGORIES.filter(c => Object.values(APEX_SCENARIOS).some(s => s.category === c.key)).map(c => (
              <button key={c.key} className="sidebar-btn" style={{ paddingLeft: '1.9rem', fontSize: '0.85rem' }} onClick={() => startSimulationCategory(c.key)}>
                {c.icon} {L(lang, c)}
              </button>
            ))}
            <button className="sidebar-btn" onClick={() => setCurrentPage('catalog')}>📚 {t('dashboard.browseSimulations', lang)}</button>
          </div>
          <div className="sidebar-section">
            <h3>{t('dashboard.yourStats', lang)}</h3>
            <div className="stat-item"><span>{t('dashboard.simulationsPlayed', lang)}</span><strong>{userScores.scores?.length || 0}</strong></div>
            <div className="stat-item"><span>{t('dashboard.bestGrade', lang)}</span><strong>{userScores.bestScores?.[0]?.grade || '-'}</strong></div>
            <div className="stat-item"><span>{t('dashboard.highScore', lang)}</span><strong>{userScores.bestScores?.[0]?.score || 0}</strong></div>
          </div>
        </aside>
        <main className="dashboard-main">
          <div className="welcome-card">
            <h1>{t('dashboard.welcome', lang)}, {currentUser?.name?.split(' ')[0]}!</h1>
            <p>{t('dashboard.readyToContinue', lang)}</p>
          </div>
          
          <div className="dashboard-section">
            <h2>{L(lang, { en: 'Select a Category', fr: 'Choisissez une catégorie', es: 'Selecciona una categoría', vi: 'Chọn một danh mục' })}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '12px' }}>
              {SCENARIO_CATEGORIES.map(c => {
                const count = Object.values(APEX_SCENARIOS).filter(s => s.category === c.key).length;
                if (count === 0) return null;
                return (
                  <div key={c.key} className="featured-sim-card" onClick={() => startSimulationCategory(c.key)} style={{ cursor: 'pointer' }}>
                    <div className="featured-sim-icon">{c.icon}</div>
                    <div className="featured-sim-content">
                      <h3 style={{ fontSize: '1.02rem' }}>{L(lang, c)}</h3>
                      <p style={{ fontSize: '0.82rem' }}>{count} {count > 1 ? L(lang, { en: 'scenarios', fr: 'scénarios', es: 'escenarios', vi: 'kịch bản' }) : L(lang, { en: 'scenario', fr: 'scénario', es: 'escenario', vi: 'kịch bản' })}</p>
                      <span className="featured-sim-cta">{t('dashboard.playNow', lang)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Performance by category: sparkline, trend, strength & weakness */}
          <div className="dashboard-section">
            <h2>{L(lang, { en: 'Your Performance by Category', fr: 'Votre performance par catégorie', es: 'Tu rendimiento por categoría', vi: 'Thành tích của bạn theo danh mục' })}</h2>
            {(userScores.scores?.length || 0) === 0 ? (
              <p className="no-scores">{t('dashboard.noScoresYet', lang)}</p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '12px' }}>
                {SCENARIO_CATEGORIES.map(c => {
                  const scenarioIds = Object.values(APEX_SCENARIOS).filter(s => s.category === c.key).map(s => s.id);
                  const recs = (userScores.scores || []).filter(r => scenarioIds.includes(r.scenario_id));
                  if (recs.length === 0) return null;
                  const scores = recs.map(r => r.score); // newest first
                  const best = Math.max(...scores);
                  const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
                  const recent = scores[0];
                  const prevAvg = scores.length > 1 ? scores.slice(1).reduce((a, b) => a + b, 0) / (scores.length - 1) : recent;
                  const trend = Math.round(recent - prevAvg);
                  // Normalize score dimensions (classic maxes 200 each; scrum 50/150/300/200)
                  const dims = { budget: [], schedule: [], scope: [], quality: [] };
                  recs.forEach(r => {
                    const cfg = APEX_SCENARIOS[r.scenario_id];
                    const scrum = cfg && cfg.framework === 'scrum';
                    if (r.budget_score != null) dims.budget.push(r.budget_score / (scrum ? 50 : 200));
                    if (r.schedule_score != null) dims.schedule.push(r.schedule_score / (scrum ? 150 : 200));
                    if (r.scope_score != null) dims.scope.push(r.scope_score / (scrum ? 300 : 200));
                    if (r.quality_score != null) dims.quality.push(r.quality_score / 200);
                  });
                  const dimLabels = L(lang, {
                    en: { budget: 'Budget', schedule: 'Schedule & predictability', scope: 'Scope & value', quality: 'Quality' },
                    fr: { budget: 'Budget', schedule: 'Échéancier et prévisibilité', scope: 'Périmètre et valeur', quality: 'Qualité' },
                    es: { budget: 'Presupuesto', schedule: 'Cronograma y predictibilidad', scope: 'Alcance y valor', quality: 'Calidad' },
                    vi: { budget: 'Ngân sách', schedule: 'Tiến độ & dự đoán được', scope: 'Phạm vi & giá trị', quality: 'Chất lượng' }
                  });
                  const dimAvgs = Object.entries(dims)
                    .filter(([, v]) => v.length > 0)
                    .map(([k, v]) => ({ k, pct: Math.round((v.reduce((a, b) => a + b, 0) / v.length) * 100) }))
                    .sort((a, b) => b.pct - a.pct);
                  const strength = dimAvgs[0];
                  const weakness = dimAvgs[dimAvgs.length - 1];
                  const spark = scores.slice(0, 8).reverse();
                  const sparkPts = spark.map((s, i) => `${(i / Math.max(1, spark.length - 1)) * 100},${33 - (Math.min(1000, Math.max(0, s)) / 1000) * 30}`).join(' ');
                  const bestGrade = best >= 900 ? 'A+' : best >= 800 ? 'A' : best >= 700 ? 'B+' : best >= 600 ? 'B' : best >= 500 ? 'C' : best >= 400 ? 'D' : 'F';
                  const gradeColor = best >= 700 ? '#10b981' : best >= 500 ? '#f59e0b' : '#ef4444';
                  return (
                    <div key={c.key} className="featured-sim-card" style={{ cursor: 'pointer', alignItems: 'flex-start' }} onClick={() => startSimulationCategory(c.key)}>
                      <div className="featured-sim-icon">{c.icon}</div>
                      <div className="featured-sim-content" style={{ width: '100%', minWidth: 0 }}>
                        <h3 style={{ fontSize: '0.98rem', display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                          <span>{L(lang, c)}</span>
                          <span style={{ color: gradeColor, whiteSpace: 'nowrap' }}>{bestGrade} · {best}</span>
                        </h3>
                        {spark.length > 1 && (
                          <svg viewBox="0 0 100 36" style={{ width: '100%', height: 34, display: 'block' }} preserveAspectRatio="none">
                            <polyline points={sparkPts} fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
                          </svg>
                        )}
                        <p style={{ fontSize: '0.78rem', margin: '6px 0 2px' }}>
                          {recs.length} {recs.length > 1 ? L(lang, { en: 'attempts', fr: 'essais', es: 'intentos', vi: 'lần thử' }) : L(lang, { en: 'attempt', fr: 'essai', es: 'intento', vi: 'lần thử' })}
                          {' · '}{L(lang, { en: 'avg', fr: 'moy.', es: 'prom.', vi: 'TB' })} {avg}/1000
                          {' · '}{trend >= 15 ? '📈' : trend <= -15 ? '📉' : '➡️'} {trend > 0 ? '+' : ''}{trend}
                        </p>
                        {strength && weakness && strength.k !== weakness.k && (
                          <p style={{ fontSize: '0.78rem', margin: 0 }}>
                            💪 {dimLabels[strength.k]} ({strength.pct}%) · 🎯 {L(lang, { en: 'work on', fr: 'à travailler', es: 'por mejorar', vi: 'cần cải thiện' })}: {dimLabels[weakness.k]} ({weakness.pct}%)
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
                {(() => {
                  const unplayed = SCENARIO_CATEGORIES.filter(c => {
                    const ids = Object.values(APEX_SCENARIOS).filter(s => s.category === c.key).map(s => s.id);
                    return ids.length > 0 && !(userScores.scores || []).some(r => ids.includes(r.scenario_id));
                  });
                  if (unplayed.length === 0) return null;
                  return (
                    <div style={{ gridColumn: '1 / -1', fontSize: '0.8rem', color: 'var(--text-muted, #94a3b8)' }}>
                      {L(lang, { en: 'Not yet explored:', fr: 'Pas encore exploré :', es: 'Aún sin explorar:', vi: 'Chưa khám phá:' })} {unplayed.map(c => `${c.icon} ${L(lang, c)}`).join(' · ')}
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );


  const renderCourseAdmin = () => {
    const A = (o) => L(lang, o);
    const dimLabels = A({
      en: { budget: 'Budget', schedule: 'Schedule & predictability', scope: 'Scope & value', quality: 'Quality' },
      fr: { budget: 'Budget', schedule: 'Échéancier et prévisibilité', scope: 'Périmètre et valeur', quality: 'Qualité' },
      es: { budget: 'Presupuesto', schedule: 'Cronograma y predictibilidad', scope: 'Alcance y valor', quality: 'Calidad' },
      vi: { budget: 'Ngân sách', schedule: 'Tiến độ & dự đoán được', scope: 'Phạm vi & giá trị', quality: 'Chất lượng' }
    });
    const users = courseAdmin?.users || [];
    const allScores = courseAdmin?.scores || [];
    const byUser = {};
    allScores.forEach(r => { (byUser[r.user_id] = byUser[r.user_id] || []).push(r); });
    const analyze = (recs) => {
      const dims = { budget: [], schedule: [], scope: [], quality: [] };
      recs.forEach(r => {
        const cfg = APEX_SCENARIOS[r.scenario_id];
        const scrum = cfg && cfg.framework === 'scrum';
        if (r.budget_score != null) dims.budget.push(r.budget_score / (scrum ? 50 : 200));
        if (r.schedule_score != null) dims.schedule.push(r.schedule_score / (scrum ? 150 : 200));
        if (r.scope_score != null) dims.scope.push(r.scope_score / (scrum ? 300 : 200));
        if (r.quality_score != null) dims.quality.push(r.quality_score / 200);
      });
      return Object.entries(dims)
        .filter(([, v]) => v.length > 0)
        .map(([k, v]) => ({ k, pct: Math.min(100, Math.round((v.reduce((a, b) => a + b, 0) / v.length) * 100)) }))
        .sort((a, b) => b.pct - a.pct);
    };
    const rows = users.map(u => {
      const recs = byUser[u.id] || [];
      const avgs = analyze(recs);
      const best = recs.reduce((m, r) => (r.score > (m ? m.score : -1) ? r : m), null);
      return {
        u, recs, avgs,
        plays: recs.length,
        distinct: new Set(recs.map(r => r.scenario_id)).size,
        avg: recs.length ? Math.round(recs.reduce((a, r) => a + r.score, 0) / recs.length) : 0,
        best,
        last: recs.length ? recs[0].completed_at : null
      };
    });
    const totPlays = allScores.length;
    const avgAll = totPlays ? Math.round(allScores.reduce((a, r) => a + r.score, 0) / totPlays) : 0;
    const fmtDate = (d) => d ? new Date(d).toLocaleDateString(lang === 'en' ? 'en-CA' : lang) : '—';
    const exportCsv = () => {
      const esc = (v) => '"' + String(v == null ? '' : v).replace(/"/g, '""') + '"';
      const head = ['Name', 'Email', 'Registered', 'Completions', 'Distinct scenarios', 'Avg score', 'Best score', 'Best grade', 'Strength', 'Strength %', 'Weakness', 'Weakness %', 'Last activity'];
      const lines = [head.join(',')].concat(rows.map(r => [
        r.u.name, r.u.email, fmtDate(r.u.created_at), r.plays, r.distinct, r.avg,
        r.best ? r.best.score : '', r.best ? r.best.grade : '',
        r.avgs[0] ? dimLabels[r.avgs[0].k] : '', r.avgs[0] ? r.avgs[0].pct : '',
        r.avgs.length ? dimLabels[r.avgs[r.avgs.length - 1].k] : '', r.avgs.length ? r.avgs[r.avgs.length - 1].pct : '',
        fmtDate(r.last)
      ].map(esc).join(',')));
      const blob = new Blob(['\ufeff' + lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'bizsim-users-' + new Date().toISOString().slice(0, 10) + '.csv';
      a.click();
    };
    const card = (label, value) => (
      <div style={{ flex: 1, minWidth: 140, background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1rem 1.25rem', textAlign: 'center' }}>
        <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1a1a2e' }}>{value}</div>
        <div style={{ fontSize: '0.8rem', color: '#5c636a' }}>{label}</div>
      </div>
    );
    const gradeColor = (g) => !g ? '#94a3b8' : g.startsWith('A') ? '#10b981' : g.startsWith('B') ? '#6366f1' : g === 'C' ? '#f59e0b' : '#ef4444';
    return (
      <div className="dashboard-page" style={{ minHeight: '100vh', background: '#f8f9fa' }}>
        {renderNavbar()}
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem 1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: '1.25rem' }}>
            <div>
              <h1 style={{ margin: 0, color: '#1a1a2e', fontSize: '1.6rem' }}>⚙️ {A({ en: 'Admin — Team Monitoring', fr: 'Admin — Suivi des participants', es: 'Admin — Seguimiento de participantes', vi: 'Admin — Theo dõi học viên' })}</h1>
              <p style={{ margin: '4px 0 0', color: '#5c636a', fontSize: '0.9rem' }}>{A({ en: 'Who completed the simulations, their scores, strengths and weaknesses', fr: 'Qui a complété les simulations, leurs scores, forces et faiblesses', es: 'Quién completó las simulaciones, sus puntajes, fortalezas y debilidades', vi: 'Ai đã hoàn thành mô phỏng, điểm số, điểm mạnh và điểm yếu' })}</p>
            </div>
            <button className="btn-primary" onClick={exportCsv}>⬇️ {A({ en: 'Export CSV', fr: 'Exporter CSV', es: 'Exportar CSV', vi: 'Xuất CSV' })}</button>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {card(A({ en: 'Registered users', fr: 'Utilisateurs inscrits', es: 'Usuarios registrados', vi: 'Người dùng đã đăng ký' }), users.length)}
            {card(A({ en: 'Completions', fr: 'Simulations complétées', es: 'Simulaciones completadas', vi: 'Lượt hoàn thành' }), totPlays)}
            {card(A({ en: 'Average score', fr: 'Score moyen', es: 'Puntaje promedio', vi: 'Điểm trung bình' }), avgAll)}
            {card(A({ en: 'Active players', fr: 'Joueurs actifs', es: 'Jugadores activos', vi: 'Người chơi có hoạt động' }), rows.filter(r => r.plays > 0).length)}
          </div>
          {!courseAdmin ? (
            <p style={{ color: '#5c636a' }}>{A({ en: 'Loading…', fr: 'Chargement…', es: 'Cargando…', vi: 'Đang tải…' })}</p>
          ) : (
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: '#f1f5f9', color: '#334155', textAlign: 'left' }}>
                    <th style={{ padding: '10px 14px' }}>{A({ en: 'User', fr: 'Utilisateur', es: 'Usuario', vi: 'Người dùng' })}</th>
                    <th style={{ padding: '10px 8px' }}>{A({ en: 'Completions', fr: 'Complétées', es: 'Completadas', vi: 'Hoàn thành' })}</th>
                    <th style={{ padding: '10px 8px' }}>{A({ en: 'Scenarios', fr: 'Scénarios', es: 'Escenarios', vi: 'Kịch bản' })}</th>
                    <th style={{ padding: '10px 8px' }}>{A({ en: 'Avg', fr: 'Moy.', es: 'Prom.', vi: 'TB' })}</th>
                    <th style={{ padding: '10px 8px' }}>{A({ en: 'Best', fr: 'Meilleur', es: 'Mejor', vi: 'Cao nhất' })}</th>
                    <th style={{ padding: '10px 8px' }}>💪 {A({ en: 'Strength', fr: 'Force', es: 'Fortaleza', vi: 'Điểm mạnh' })}</th>
                    <th style={{ padding: '10px 8px' }}>🎯 {A({ en: 'Weakness', fr: 'Faiblesse', es: 'Debilidad', vi: 'Điểm yếu' })}</th>
                    <th style={{ padding: '10px 8px' }}>{A({ en: 'Last activity', fr: 'Dernière activité', es: 'Última actividad', vi: 'Hoạt động cuối' })}</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(r => (
                    <React.Fragment key={r.u.id}>
                      <tr onClick={() => setAdminExpanded(adminExpanded === r.u.id ? null : r.u.id)}
                          style={{ borderTop: '1px solid #e2e8f0', cursor: r.plays ? 'pointer' : 'default', background: adminExpanded === r.u.id ? '#f8fafc' : 'transparent' }}>
                        <td style={{ padding: '10px 14px' }}>
                          <div style={{ fontWeight: 600, color: '#1a1a2e' }}>{r.plays > 0 ? (adminExpanded === r.u.id ? '▾ ' : '▸ ') : ''}{r.u.name}</div>
                          <div style={{ color: '#64748b', fontSize: '0.78rem' }}>{r.u.email}</div>
                        </td>
                        <td style={{ padding: '10px 8px' }}>{r.plays > 0 ? '✅ ' + r.plays : '—'}</td>
                        <td style={{ padding: '10px 8px' }}>{r.distinct || '—'}</td>
                        <td style={{ padding: '10px 8px', fontWeight: 600 }}>{r.plays ? r.avg : '—'}</td>
                        <td style={{ padding: '10px 8px' }}>{r.best ? <span>{r.best.score} <strong style={{ color: gradeColor(r.best.grade) }}>{r.best.grade}</strong></span> : '—'}</td>
                        <td style={{ padding: '10px 8px', color: '#10b981' }}>{r.avgs[0] ? `${dimLabels[r.avgs[0].k]} (${r.avgs[0].pct}%)` : '—'}</td>
                        <td style={{ padding: '10px 8px', color: '#ef4444' }}>{r.avgs.length > 1 ? `${dimLabels[r.avgs[r.avgs.length - 1].k]} (${r.avgs[r.avgs.length - 1].pct}%)` : '—'}</td>
                        <td style={{ padding: '10px 8px', color: '#64748b' }}>{fmtDate(r.last)}</td>
                      </tr>
                      {adminExpanded === r.u.id && r.plays > 0 && (
                        <tr style={{ background: '#f8fafc' }}>
                          <td colSpan={8} style={{ padding: '12px 14px 16px' }}>
                            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                              <div style={{ minWidth: 260 }}>
                                <div style={{ fontWeight: 700, fontSize: '0.8rem', color: '#334155', marginBottom: 8 }}>{A({ en: 'Performance by dimension', fr: 'Performance par dimension', es: 'Desempeño por dimensión', vi: 'Hiệu suất theo chiều' })}</div>
                                {r.avgs.map(d => (
                                  <div key={d.k} style={{ marginBottom: 6 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#475569' }}>
                                      <span>{dimLabels[d.k]}</span><span>{d.pct}%</span>
                                    </div>
                                    <div style={{ height: 6, background: '#e2e8f0', borderRadius: 3 }}>
                                      <div style={{ height: 6, width: d.pct + '%', borderRadius: 3, background: d.pct >= 70 ? '#10b981' : d.pct >= 45 ? '#f59e0b' : '#ef4444' }} />
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <div style={{ flex: 1, minWidth: 300 }}>
                                <div style={{ fontWeight: 700, fontSize: '0.8rem', color: '#334155', marginBottom: 8 }}>{A({ en: 'History', fr: 'Historique', es: 'Historial', vi: 'Lịch sử' })}</div>
                                {r.recs.slice(0, 10).map((rec, i) => {
                                  const cfg = APEX_SCENARIOS[rec.scenario_id];
                                  return (
                                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: 8, fontSize: '0.8rem', padding: '4px 0', borderBottom: '1px dashed #e2e8f0', color: '#475569' }}>
                                      <span>{cfg ? cfg.icon + ' ' + cfg.title : rec.scenario_id}{cfg && cfg.framework === 'scrum' ? ' 🔁' : ''}</span>
                                      <span>{rec.score} <strong style={{ color: gradeColor(rec.grade) }}>{rec.grade}</strong> · {fmtDate(rec.completed_at)}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderCatalog = () => (
    <div className="catalog-page">
      {renderNavbar()}
      <div className="catalog-container">
        <div className="catalog-header">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(237, 27, 47, 0.08)', color: '#ED1B2F', padding: '6px 16px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1rem' }}>
            🎓 {L(lang, { en: 'BizSim — Course & Team Edition', fr: 'BizSim — Édition cours et équipes', es: 'BizSim — Edición cursos y equipos', vi: 'BizSim — Phiên bản khóa học & đội nhóm' })}
          </div>
          <h1>{L(lang, { en: 'Project Management Simulations', fr: 'Simulations de gestion de projet', es: 'Simulaciones de gestión de proyectos', vi: 'Mô phỏng quản lý dự án' })}</h1>
          <p>{L(lang, { en: 'You are the PM. Choose an industry library — ANNA, your AI coach, guides your decisions.', fr: 'Vous êtes le GP. Choisissez une bibliothèque — ANNA, votre coach IA, guide vos décisions.', es: 'Tú eres el PM. Elige una biblioteca — ANNA, tu coach de IA, guía tus decisiones.', vi: 'Bạn là PM. Chọn một thư viện ngành — ANNA, huấn luyện viên AI, đồng hành cùng quyết định của bạn.' })}</p>
        </div>
        
        <div className="catalog-grid">
          {SCENARIO_CATEGORIES.map(cat => {
            const items = Object.values(APEX_SCENARIOS).filter(s => s.category === cat.key);
            if (items.length === 0) return null;
            const difficulties = [...new Set(items.map(s => s.difficulty))];
            return (
              <div key={cat.key} className="catalog-card">
                <div className="catalog-card-header">
                  <span className="catalog-icon">{cat.icon}</span>
                  <div className="catalog-badges">
                    <span className="badge-featured">{items.length} {items.length > 1 ? L(lang, { en: 'scenarios', fr: 'scénarios', es: 'escenarios', vi: 'kịch bản' }) : L(lang, { en: 'scenario', fr: 'scénario', es: 'escenario', vi: 'kịch bản' })}</span>
                  </div>
                </div>
                <div className="catalog-card-body">
                  <span className="catalog-category">{L(lang, { en: 'Project Management', fr: 'Gestion de projet', es: 'Gestión de proyectos', vi: 'Quản lý dự án' })}</span>
                  <h3>{L(lang, cat)}</h3>
                  <p className="catalog-desc">{L(lang, { en: cat.subEn, fr: cat.subFr, es: cat.subEs, vi: cat.subVi })}</p>
                  <div className="catalog-skills">
                    {items.map(s => <span key={s.id} className="skill-tag">{s.icon} {s.title} {s.framework === 'scrum' ? '🔁' : '📋'}</span>)}
                  </div>
                </div>
                <div className="catalog-card-footer">
                  <div className="catalog-meta">
                    <span>🎯 {difficulties.join(' · ')}</span>
                  </div>
                  <button
                    className="btn-primary btn-full"
                    onClick={() => startSimulationCategory(cat.key)}
                  >
                    {L(lang, { en: 'Open Library →', fr: 'Ouvrir la bibliothèque →', es: 'Abrir biblioteca →', vi: 'Mở thư viện →' })}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );

  const renderPricing = () => (
    <div className="pricing-page">
      {renderNavbar()}
      <div className="pricing-container">
        <div className="pricing-header">
          <h1>{L(lang, { en: 'Simple, Transparent Pricing', fr: 'Tarification simple et transparente', es: 'Precios simples y transparentes', vi: 'Bảng giá đơn giản, minh bạch' })}</h1>
          <p>{L(lang, { en: 'Choose the plan that fits your learning goals', fr: 'Choisissez le plan qui correspond à vos objectifs', es: 'Elige el plan que se ajusta a tus metas de aprendizaje', vi: 'Chọn gói phù hợp với mục tiêu học tập của bạn' })}</p>
        </div>
        <div className="pricing-grid">
          {PRICING_PLANS.filter(plan => !plan.hidden).map(plan => (
            <div key={plan.id} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
              {plan.popular && <div className="popular-badge">{L(lang, { en: 'Best Value', fr: 'Meilleur rapport', es: 'Mejor valor', vi: 'Đáng giá nhất' })}</div>}
              <h3>{plan.name}</h3>
              <p className="plan-desc">{plan.description}</p>
              <div className="plan-price">
                <span className="price">${plan.price}</span>
                <span className="period">
                  {plan.period === 'forever' ? (L(lang, { en: '/forever', fr: '/pour toujours', es: '/para siempre', vi: '/mãi mãi' })) : 
                   plan.period === 'one-time' ? (L(lang, { en: ' one-time', fr: ' unique', es: ' pago único', vi: ' một lần' })) : 
                   (L(lang, { en: '/month', fr: '/mois', es: '/mes', vi: '/tháng' }))}
                </span>
              </div>
              {plan.isOneTime && (
                <div className="savings-badge">
                  {L(lang, { en: '💰 Save $79+ vs 8 months subscription', fr: '💰 Économisez 79$+ vs 8 mois d\'abonnement', es: '💰 Ahorra $79+ vs 8 meses de suscripción', vi: '💰 Tiết kiệm $79+ so với 8 tháng thuê bao' })}
                </div>
              )}
              <ul className="plan-features">
                {plan.features.map(f => <li key={f}>✓ {f}</li>)}
              </ul>
              <button 
                className={`btn-full ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => plan.id !== 'free' && handleCheckout(plan.id)}
                disabled={checkoutLoading === plan.id || plan.id === 'free'}
              >
                {checkoutLoading === plan.id ? (L(lang, { en: 'Loading...', fr: 'Chargement...', es: 'Cargando...', vi: 'Đang tải...' })) : 
                 (lang === 'en' ? plan.cta :
                   plan.id === 'free' ? L(lang, { en: plan.cta, fr: 'Plan actuel', es: 'Plan actual', vi: 'Gói hiện tại' }) :
                   plan.id === 'pro' ? L(lang, { en: plan.cta, fr: 'S\'abonner', es: 'Suscribirse', vi: 'Đăng ký' }) :
                   plan.id === 'pro_lifetime' ? L(lang, { en: plan.cta, fr: 'Obtenir l\'accès à vie', es: 'Obtener acceso de por vida', vi: 'Nhận quyền trọn đời' }) : plan.cta)}
              </button>
            </div>
          ))}
        </div>
        <div className="pricing-footer">
          <p>{L(lang, { en: '🔒 Secure payment powered by Stripe', fr: '🔒 Paiement sécurisé par Stripe', es: '🔒 Pago seguro con Stripe', vi: '🔒 Thanh toán an toàn qua Stripe' })}</p>
          <p>{L(lang, { en: '✉️ Questions? Contact us at support@bizsimhub.com', fr: '✉️ Questions? Contactez-nous à support@bizsimhub.com', es: '✉️ ¿Preguntas? Escríbenos a support@bizsimhub.com', vi: '✉️ Có câu hỏi? Liên hệ support@bizsimhub.com' })}</p>
        </div>
      </div>
    </div>
  );

  // ENHANCED SIMULATION RENDERING
  // ============================================
  // ANNA — AI PROJECT MANAGEMENT ADVISOR
  // ============================================

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

    // SCRUM branch — framework-specific coaching vocabulary (A.3 injection)
    if (scenario.framework === 'scrum') {
      const en = lang === 'en';
      const ANNA_WEEKLY_HEADERS = {
        fr: ['French', 'ÉTAT DU PROJET, PRIORITÉS CLÉS, ATTENTION, PRINCIPE GP'],
        es: ['Spanish', 'ESTADO DEL PROYECTO, PRIORIDADES CLAVE, ATENCIÓN, PRINCIPIO DE GP'],
        vi: ['Vietnamese', 'TÌNH TRẠNG DỰ ÁN, ƯU TIÊN HÀNG ĐẦU, CẦN LƯU Ý, NGUYÊN TẮC QLDA']
      };
      const scrumLangInstruction = en ? '' : `\n\nIMPORTANT: Respond ENTIRELY in ${ANNA_WEEKLY_HEADERS[lang][0]}. Use these exact ${ANNA_WEEKLY_HEADERS[lang][0]} section headers: ${ANNA_WEEKLY_HEADERS[lang][1]}`;
      const scrumSectionFormat = lang !== 'fr' ? `
PROJECT STATUS
2-3 sentences summarizing their position in Scrum terms (velocity vs commitment, sprint goal, value delivered vs target). Be specific about what is working and what is at risk.

TOP PRIORITIES
3-4 specific, actionable recommendations ranked by impact, each one clear sentence referencing actual game mechanics (commit to observed velocity, refine uncertain items before committing, protect the Definition of Done, pick the highest-compounding retro improvement).

WATCH OUT
1-2 risks to avoid this sprint. Reference specific thresholds (quality below 70 books defects and claws back value; two carryover sprints in a row triggers a morale spiral; crunch costs scoring points).

PM INSIGHT
One real Scrum/agile principle that applies right now, connected to the Scrum Guide or Agile Manifesto.

Keep it concise, direct, and encouraging. Use their actual numbers.` : `
ÉTAT DU PROJET
2-3 phrases résumant leur position en termes Scrum (vélocité vs engagement, objectif de sprint, valeur livrée vs cible). Soyez précis sur ce qui fonctionne et ce qui est à risque.

PRIORITÉS CLÉS
3-4 recommandations spécifiques et actionnables classées par impact, chacune en une phrase claire référençant les mécaniques du jeu (s'engager sur la vélocité observée, raffiner les éléments incertains avant de s'engager, protéger la définition de terminé, choisir l'amélioration rétro la plus composée).

ATTENTION
1-2 risques à éviter ce sprint. Référencez les seuils spécifiques (qualité sous 70 génère des défauts et retranche de la valeur; deux sprints de report consécutifs déclenchent une spirale de moral; le mode intensif coûte des points).

PRINCIPE GP
Un vrai principe Scrum/agile qui s'applique maintenant, relié au Guide Scrum ou au Manifeste agile.

Soyez concis, direct et encourageant. Utilisez leurs chiffres réels.`;

      const committedItems = gs.backlog.filter(b => b.state === 'committed');
      const committedPts = committedItems.reduce((s, b) => s + b.points, 0);
      const topBacklog = gs.backlog
        .filter(b => b.state === 'backlog')
        .sort((a, b) => a.rank - b.rank)
        .slice(0, 6);
      const forecast = scrumForecastVelocity(gs);
      const scrumBudgetRemaining = gs.budget.total - gs.budget.spent;

      const scrumPrompt = `You are ANNA, a sharp and experienced agile coach in a PM simulation game. You speak with confidence and warmth — direct, analytical, encouraging, grounded in Scrum and agile delivery practice. ${FRAMEWORK_COACHING.scrum}${scrumLangInstruction}

A student is Product Owner / delivery lead on "${scenario.projectName}" at ${scenario.company} — a Scrum simulation of ${gs.totalSprints} sprints × ${gs.sprintLength} weeks.

CURRENT SITUATION — Sprint ${gs.sprint} of ${gs.totalSprints} (phase: ${gs.phase}):
- Velocity history: ${gs.velocityHistory.length ? gs.velocityHistory.join(', ') + ' pts' : 'none yet'} | Forecast ("yesterday's weather"): ${forecast} pts
- Committed this sprint: ${committedPts} pts${committedItems.length ? ' (' + committedItems.map(b => b.name).join(', ') + ')' : ''}
- Points completed this sprint so far: ${Math.round(gs.sprintPointsDone * 10) / 10}
- Business value delivered: ${gs.valueDelivered} of ${gs.valueTarget} target
- Quality / Definition of Done: ${Math.round(gs.quality)}/100 | Escaped defects: ${gs.escapedDefects}
- Carryover streak: ${gs.carryoverStreak} sprint(s) | Crunches used: ${gs.crunchUsed}
- Team: morale ${Math.round(gs.team.morale)}%, stress ${Math.round(gs.team.stress)}%, knowledge ${Math.round(gs.team.knowledge)}%
- Budget: $${(scrumBudgetRemaining / 1000).toFixed(0)}K remaining of $${(gs.budget.total / 1000).toFixed(0)}K
- Investor pivot: ${gs.pivotHandled ? 'handled (' + gs.pivotHandled + ')' : gs.sprint < 3 ? 'not yet occurred' : 'pending'}
- Retro improvements adopted: ${gs.improvements.join(', ') || 'none'}
- Top of remaining backlog: ${topBacklog.map(b => b.name + ' (' + b.points + ' pts, value ' + b.value + ')').join('; ') || 'empty'}

SCORING (1000 pts): business value 300 · sprint predictability 150 · quality/DoD 200 · responsiveness to change 150 · team health 150 · budget band 50. There is NO deadline penalty and NO bonus for refusing to re-plan.

Provide strategic advice in this exact format (use these exact section headers):
${scrumSectionFormat}`;

      try {
        const response = await fetch('/api/ai-advisor', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: scrumPrompt, max_tokens: 1400 })
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
      return;
    }

    const budgetRemaining = gs.budget.total - gs.budget.spent;
    const budgetPercent = (budgetRemaining / gs.budget.total) * 100;
    const scopePercent = (gs.scope.completed / gs.scope.totalFeatures) * 100;
    const weeksRemaining = gs.schedule.deadline - gs.week + 1;
    const isOverBudget = gs.budget.spent > gs.budget.total;
    const isBehindSchedule = weeksRemaining < (100 - scopePercent) / 10;

    const ANNA_WEEKLY_HEADERS = {
      fr: ['French', 'ÉTAT DU PROJET, PRIORITÉS CLÉS, ATTENTION, PRINCIPE GP'],
      es: ['Spanish', 'ESTADO DEL PROYECTO, PRIORIDADES CLAVE, ATENCIÓN, PRINCIPIO DE GP'],
      vi: ['Vietnamese', 'TÌNH TRẠNG DỰ ÁN, ƯU TIÊN HÀNG ĐẦU, CẦN LƯU Ý, NGUYÊN TẮC QLDA']
    };
    const langInstruction = lang === 'en'
      ? ''
      : `\n\nIMPORTANT: Respond ENTIRELY in ${ANNA_WEEKLY_HEADERS[lang][0]}. Use these exact ${ANNA_WEEKLY_HEADERS[lang][0]} section headers: ${ANNA_WEEKLY_HEADERS[lang][1]}`;

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

    // SCRUM branch — debrief on agile outcomes, not waterfall ones
    if (scenario.framework === 'scrum') {
      const en = lang === 'en';
      const bd = calculateScrumScoreBreakdown(gs);
      const doneItems = gs.backlog.filter(b => b.state === 'done');
      const ANNA_DEBRIEF_HEADERS = {
        fr: ['French', "RÉSUMÉ EXÉCUTIF, POINTS FORTS, AXES D'AMÉLIORATION, LIEN PMP, MOT FINAL"],
        es: ['Spanish', 'RESUMEN EJECUTIVO, LO QUE SALIÓ BIEN, ÁREAS DE CRECIMIENTO, CONEXIÓN PMP, PALABRA FINAL'],
        vi: ['Vietnamese', 'TÓM TẮT TỔNG QUAN, ĐIỂM LÀM TỐT, ĐIỂM CẦN PHÁT TRIỂN, LIÊN HỆ PMP, LỜI KẾT']
      };
      const scrumDebriefLang = en ? '' : `\n\nIMPORTANT: Respond ENTIRELY in ${ANNA_DEBRIEF_HEADERS[lang][0]}. Use these exact ${ANNA_DEBRIEF_HEADERS[lang][0]} section headers: ${ANNA_DEBRIEF_HEADERS[lang][1]}`;
      const scrumDebriefFormat = lang !== 'fr' ? `
EXECUTIVE SUMMARY
A 2-3 sentence assessment of their performance as an agile delivery lead. Reference their grade and what it says about how they prioritised.

WHAT WENT WELL
2-3 specific strengths, tied to Scrum competencies (commitment realism, value-first prioritisation, sustainable pace, handling the pivot).

AREAS FOR GROWTH
2-3 specific improvements with actionable advice (e.g. if predictability was low: commit to observed velocity; if defects escaped: honour the Definition of Done).

PMP CONNECTION
Connect their experience to 2-3 real agile/hybrid concepts from the PMBOK Agile Practice Guide or Scrum Guide (empirical process control, backlog refinement, velocity-based planning, welcoming change).

FINAL WORD
One memorable closing thought specific to their results.

Be concise, educational, and encouraging.` : `
RÉSUMÉ EXÉCUTIF
Une évaluation de 2-3 phrases de leur performance comme responsable de livraison agile. Référencez leur note et ce qu'elle dit de leur priorisation.

POINTS FORTS
2-3 forces spécifiques, liées aux compétences Scrum (réalisme des engagements, priorisation par la valeur, rythme soutenable, gestion du pivot).

AXES D'AMÉLIORATION
2-3 améliorations spécifiques avec conseils actionnables (ex.: si la prévisibilité était faible, s'engager sur la vélocité observée; si des défauts ont échappé, respecter la définition de terminé).

LIEN PMP
Reliez leur expérience à 2-3 concepts agiles/hybrides réels du Guide de pratique agile PMBOK ou du Guide Scrum (contrôle empirique, raffinement du backlog, planification par vélocité, accueil du changement).

MOT FINAL
Une pensée finale mémorable, spécifique à leurs résultats.

Soyez concis, éducatif et encourageant.`;

      const scrumDebriefPrompt = `You are ANNA, a sharp and experienced agile coach giving a final simulation debrief. ${FRAMEWORK_COACHING.scrum}${scrumDebriefLang}

A student just completed "${scenario.projectName}" (Scrum simulation, ${gs.totalSprints} sprints).

FINAL RESULTS:
- Grade: ${grade} | Score: ${finalScore}/1000
- Business value delivered: ${gs.valueDelivered} of ${gs.valueTarget} target (${bd.value}/300 pts)
- Sprint predictability: ${Math.round(bd.predictabilityRatio * 100)}% (${bd.predictability}/150 pts) — velocity ${gs.velocityHistory.join(', ')} vs committed ${gs.commitHistory.join(', ')}
- Quality/DoD: ${Math.round(gs.quality)}/100, ${gs.escapedDefects} escaped defect event(s) (${bd.quality}/200 pts)
- Responsiveness: pivot ${gs.pivotHandled || 'not handled'} (${bd.responsiveness}/150 pts)
- Team health: average morale ${Math.round(bd.avgMorale)}%, ${gs.crunchUsed} crunch(es) (${bd.team}/150 pts)
- Budget: $${(gs.budget.spent / 1000).toFixed(0)}K of $${(gs.budget.total / 1000).toFixed(0)}K (${bd.budget}/50 pts)
- Items shipped: ${doneItems.map(b => b.name).join(', ') || 'none'}
- Retro improvements adopted: ${gs.improvements.join(', ') || 'none'}

Provide a debrief in this format:
${scrumDebriefFormat}`;

      try {
        const response = await fetch('/api/ai-advisor', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: scrumDebriefPrompt, max_tokens: 1200 })
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
      return;
    }

    const budgetOnTarget = gs.budget.spent <= gs.budget.total;
    const scheduleOnTarget = gs.week <= gs.schedule.deadline;
    const scopeComplete = gs.scope.completed >= gs.scope.totalFeatures * 0.95;
    const avgMorale = gs.moraleHistory.reduce((a, b) => a + b, 0) / gs.moraleHistory.length;

    const ANNA_DEBRIEF_HEADERS = {
      fr: ['French', "RÉSUMÉ EXÉCUTIF, POINTS FORTS, AXES D'AMÉLIORATION, LIEN PMP, MOT FINAL"],
      es: ['Spanish', 'RESUMEN EJECUTIVO, LO QUE SALIÓ BIEN, ÁREAS DE CRECIMIENTO, CONEXIÓN PMP, PALABRA FINAL'],
      vi: ['Vietnamese', 'TÓM TẮT TỔNG QUAN, ĐIỂM LÀM TỐT, ĐIỂM CẦN PHÁT TRIỂN, LIÊN HỆ PMP, LỜI KẾT']
    };
    const debriefLangInstruction = lang === 'en'
      ? ''
      : `\n\nIMPORTANT: Respond ENTIRELY in ${ANNA_DEBRIEF_HEADERS[lang][0]}. Use these exact ${ANNA_DEBRIEF_HEADERS[lang][0]} section headers: ${ANNA_DEBRIEF_HEADERS[lang][1]}`;

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

  const renderAnnaAdvice = (text, textColor = '#cbd5e1') => {
    if (!text) return null;
    
    // Clean markdown bold markers from section headers
    const cleaned = text.replace(/\*\*/g, '');
    
    // Split on section headers
    const sectionHeaders = ['PROJECT STATUS', 'TOP PRIORITIES', 'WATCH OUT', 'PM INSIGHT', 'EXECUTIVE SUMMARY', 'WHAT WENT WELL', 'AREAS FOR GROWTH', 'PMP CONNECTION', 'FINAL WORD',
      'ÉTAT DU PROJET', 'PRIORITÉS CLÉS', 'ATTENTION', 'PRINCIPE GP', 'RÉSUMÉ EXÉCUTIF', 'POINTS FORTS', "AXES D'AMÉLIORATION", 'LIEN PMP', 'MOT FINAL',
      'ESTADO DEL PROYECTO', 'PRIORIDADES CLAVE', 'ATENCIÓN', 'PRINCIPIO DE GP', 'RESUMEN EJECUTIVO', 'LO QUE SALIÓ BIEN', 'ÁREAS DE CRECIMIENTO', 'CONEXIÓN PMP', 'PALABRA FINAL',
      'TÌNH TRẠNG DỰ ÁN', 'ƯU TIÊN HÀNG ĐẦU', 'CẦN LƯU Ý', 'NGUYÊN TẮC QLDA', 'TÓM TẮT TỔNG QUAN', 'ĐIỂM LÀM TỐT', 'ĐIỂM CẦN PHÁT TRIỂN', 'LIÊN HỆ PMP', 'LỜI KẾT'];
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
      return <p style={{ color: textColor, lineHeight: 1.7, whiteSpace: 'pre-line', fontSize: '0.92rem' }}>{cleaned}</p>;
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
      'FINAL WORD': '🏁', 'MOT FINAL': '🏁',
      'ESTADO DEL PROYECTO': '📊', 'PRIORIDADES CLAVE': '🎯', 'ATENCIÓN': '⚠️', 'PRINCIPIO DE GP': '💡',
      'RESUMEN EJECUTIVO': '📋', 'LO QUE SALIÓ BIEN': '✅', 'ÁREAS DE CRECIMIENTO': '📈', 'CONEXIÓN PMP': '🎓', 'PALABRA FINAL': '🏁',
      'TÌNH TRẠNG DỰ ÁN': '📊', 'ƯU TIÊN HÀNG ĐẦU': '🎯', 'CẦN LƯU Ý': '⚠️', 'NGUYÊN TẮC QLDA': '💡',
      'TÓM TẮT TỔNG QUAN': '📋', 'ĐIỂM LÀM TỐT': '✅', 'ĐIỂM CẦN PHÁT TRIỂN': '📈', 'LIÊN HỆ PMP': '🎓', 'LỜI KẾT': '🏁'
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
          color: textColor, 
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

  // ============================================
  // SCRUM UI — "Momentum" (sprint loop)
  // ============================================

  const renderScrumGame = () => {
    const gs = gameState;
    const en = lang === 'en';
    const sorted = [...gs.backlog].sort((a, b) => a.rank - b.rank);
    const committed = sorted.filter(b => b.state === 'committed');
    const available = sorted.filter(b => b.state === 'backlog');
    const committedPts = committed.reduce((s, b) => s + b.points, 0);
    const forecast = scrumForecastVelocity(gs);
    const budgetLeft = gs.budget.total - gs.budget.spent;
    const overCommit = committedPts > forecast * 1.25;
    const ev = gs.currentEvent;

    const card = { background: '#fff', border: '1px solid #dee2e6', borderRadius: 12, padding: '1.25rem', marginBottom: '1rem' };
    const btnPrimary = { background: 'linear-gradient(135deg, #ED1B2F 0%, #c41424 100%)', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 22px', fontWeight: 600, cursor: 'pointer', fontSize: '0.95rem' };
    const btnGhost = { background: '#f8f9fa', color: '#495057', border: '1px solid #dee2e6', borderRadius: 8, padding: '8px 14px', fontWeight: 500, cursor: 'pointer', fontSize: '0.85rem' };
    const chip = { display: 'inline-block', padding: '2px 10px', borderRadius: 999, fontSize: '0.75rem', fontWeight: 700 };

    const phaseLabels = {
      planning: L(lang, { en: 'Sprint Planning', fr: 'Planification du sprint', es: 'Planificación del sprint', vi: 'Lập kế hoạch sprint' }),
      executing: L(lang, { en: 'Sprint Execution', fr: 'Exécution du sprint', es: 'Ejecución del sprint', vi: 'Thực thi sprint' }),
      review: L(lang, { en: 'Sprint Review / Demo', fr: 'Revue de sprint / Démo', es: 'Revisión del sprint / Demo', vi: 'Đánh giá sprint / Demo' }),
      retro: L(lang, { en: 'Retrospective', fr: 'Rétrospective', es: 'Retrospectiva', vi: 'Cải tiến sprint' })};

    const statBar = (label, val, color, invert) => (
      <div style={{ marginBottom: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#495057', marginBottom: 3 }}>
          <span>{label}</span><span style={{ fontWeight: 600 }}>{Math.round(val)}%</span>
        </div>
        <div style={{ height: 8, background: '#e9ecef', borderRadius: 4 }}>
          <div style={{ height: 8, width: `${Math.min(100, Math.max(0, val))}%`, background: color, borderRadius: 4, transition: 'width 0.4s' }}></div>
        </div>
      </div>
    );

    const itemRow = (b, clickable) => {
      const isCommitted = b.state === 'committed';
      const truePts = b.truePoints != null ? b.truePoints : null;
      return (
        <div key={b.id}
          onClick={clickable ? () => scrumToggleCommit(b.id) : undefined}
          style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
            border: isCommitted ? '2px solid #ED1B2F' : '1px solid #dee2e6',
            borderRadius: 8, marginBottom: 8, background: isCommitted ? '#fff5f5' : '#fff',
            cursor: clickable ? 'pointer' : 'default'
          }}>
          {clickable && <input type="checkbox" checked={isCommitted} readOnly style={{ accentColor: '#ED1B2F' }} />}
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, color: '#1a1a2e', fontSize: '0.9rem' }}>
              {lf(b, 'name', lang)}
              {b.must && <span style={{ ...chip, background: '#fee2e2', color: '#b91c1c', marginLeft: 8 }}>{L(lang, { en: 'MUST', fr: 'OBLIGATOIRE', es: 'OBLIGATORIO', vi: 'BẮT BUỘC' })}</span>}
              {b.carryover && <span style={{ ...chip, background: '#fef3c7', color: '#b45309', marginLeft: 8 }}>{L(lang, { en: 'CARRYOVER', fr: 'REPORT', es: 'ARRASTRE', vi: 'DỜI LẠI' })}</span>}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#6c757d', marginTop: 2 }}>
              {L(lang, { en: 'Size', fr: 'Taille', es: 'Tamaño', vi: 'Kích cỡ' })}: {truePts != null ? `${truePts} pts` : `${b.points}${b.uncertainty > 0.15 ? ` ±${Math.max(1, Math.round(b.points * b.uncertainty))}` : ''} pts`}
              {' · '}{L(lang, { en: 'Value', fr: 'Valeur', es: 'Valor', vi: 'Giá trị' })}: <strong style={{ color: '#1a1a2e' }}>{b.value}</strong>
              {b.donePoints > 0 && b.state !== 'done' ? ` · ${Math.round(b.donePoints * 10) / 10} pts ${L(lang, { en: 'done', fr: 'faits', es: 'hecho', vi: 'xong' })}` : ''}
            </div>
            {gs.phase === 'executing' && isCommitted && truePts != null && (
              <div style={{ height: 6, background: '#e9ecef', borderRadius: 3, marginTop: 6 }}>
                <div style={{ height: 6, width: `${Math.min(100, (b.donePoints / truePts) * 100)}%`, background: '#10b981', borderRadius: 3, transition: 'width 0.4s' }}></div>
              </div>
            )}
          </div>
        </div>
      );
    };

    const actionBtn = (type, icon, label, sub) => (
      <button key={type} onClick={() => scrumAction(type)} disabled={!!gs.actionsUsed[type]}
        style={{
          ...btnGhost, textAlign: 'left', padding: '10px 12px', width: '100%',
          opacity: gs.actionsUsed[type] ? 0.45 : 1, cursor: gs.actionsUsed[type] ? 'default' : 'pointer'
        }}>
        <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#1a1a2e' }}>{icon} {label}</div>
        <div style={{ fontSize: '0.72rem', color: '#6c757d', marginTop: 2 }}>{sub}</div>
      </button>
    );

    const summary = gs.lastSprintSummary;

    return (
      <div style={{ background: '#f8f9fa', minHeight: '100vh' }}>
        {renderNavbar()}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '1.5rem' }}>

          {/* Header strip */}
          <div style={{ ...card, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <span style={{ fontSize: '1.6rem' }}>🏃</span>
              <div>
                <div style={{ fontWeight: 700, color: '#1a1a2e' }}>{selectedScenario.projectName} · {selectedScenario.company}</div>
                <div style={{ fontSize: '0.8rem', color: '#6c757d' }}>
                  {L(lang, { en: 'Sprint', fr: 'Sprint', es: 'Sprint', vi: 'Sprint' })} {gs.sprint}/{gs.totalSprints}
                  {gs.phase === 'executing' ? ` · ${L(lang, { en: 'Week', fr: 'Semaine', es: 'Semana', vi: 'Tuần' })} ${gs.weekInSprint}/${gs.sprintLength}` : ''}
                  {' · '}<strong style={{ color: '#ED1B2F' }}>{phaseLabels[gs.phase]}</strong>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#10b981' }}>{gs.valueDelivered}</div>
                <div style={{ fontSize: '0.7rem', color: '#6c757d' }}>{L(lang, { en: `value / ${gs.valueTarget} target`, fr: `valeur / cible ${gs.valueTarget}`, es: `valor / objetivo ${gs.valueTarget}`, vi: `giá trị / mục tiêu ${gs.valueTarget}` })}</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.15rem', fontWeight: 700, color: budgetLeft < 0 ? '#ef4444' : '#1a1a2e' }}>${(budgetLeft / 1000).toFixed(0)}K</div>
                <div style={{ fontSize: '0.7rem', color: '#6c757d' }}>{L(lang, { en: 'budget left', fr: 'budget restant', es: 'presupuesto restante', vi: 'ngân sách còn lại' })}</div>
              </div>
              <button style={{ ...btnGhost, borderColor: '#14b8a6', color: '#0f766e', fontWeight: 600 }} onClick={askAnna} disabled={annaLoading}>
                {annaLoading ? '…' : (L(lang, { en: '💬 Ask Anna', fr: '💬 Demander à Anna', es: '💬 Pregunta a Anna', vi: '💬 Hỏi Anna' }))}
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 320px', gap: '1.25rem', alignItems: 'start' }}>
            {/* MAIN PANEL */}
            <div>
              {/* PLANNING */}
              {gs.phase === 'planning' && (
                <div style={card}>
                  <h2 style={{ margin: '0 0 6px', color: '#1a1a2e', fontSize: '1.15rem' }}>🗓 {L(lang, { en: `Sprint ${gs.sprint} Planning`, fr: `Planification du sprint ${gs.sprint}`, es: `Planificación del Sprint ${gs.sprint}`, vi: `Lập kế hoạch Sprint ${gs.sprint}` })}</h2>
                  <p style={{ fontSize: '0.85rem', color: '#6c757d', margin: '0 0 12px' }}>
                    {L(lang, { en: `"Yesterday's weather" says your team can deliver about ${forecast} pts this sprint. Pull the most VALUABLE items — not the most items — and commit close to observed velocity.`, fr: `La « météo d'hier » indique que votre équipe peut livrer environ ${forecast} pts ce sprint. Tirez les éléments les plus PRÉCIEUX — pas le plus d'éléments — et engagez-vous près de la vélocité observée.`, es: `Según el "clima de ayer", tu equipo puede entregar unos ${forecast} pts este sprint. Elige los ítems más VALIOSOS — no la mayor cantidad — y comprométete cerca de la velocidad observada.`, vi: `"Thời tiết hôm qua" cho thấy nhóm bạn có thể hoàn thành khoảng ${forecast} điểm sprint này. Hãy chọn các hạng mục GIÁ TRỊ nhất — không phải nhiều nhất — và cam kết sát với velocity quan sát được.` })}
                  </p>
                  <div style={{
                    padding: '10px 14px', borderRadius: 8, marginBottom: 14, fontSize: '0.88rem', fontWeight: 600,
                    background: overCommit ? '#fef2f2' : '#f0fdf4',
                    color: overCommit ? '#b91c1c' : '#15803d',
                    border: `1px solid ${overCommit ? '#fecaca' : '#bbf7d0'}`
                  }}>
                    {L(lang, { en: 'Committed', fr: 'Engagé', es: 'Comprometido', vi: 'Đã cam kết' })}: {committedPts} pts / {L(lang, { en: 'forecast', fr: 'prévision', es: 'pronóstico', vi: 'dự báo' })} {forecast} pts
                    {overCommit ? (L(lang, { en: ' — over-committing causes carryover, stress and morale loss', fr: ' — sur-engagement = report, stress et perte de moral', es: ' — comprometerse de más causa arrastre, estrés y pérdida de moral', vi: ' — cam kết quá tay gây dời việc, căng thẳng và giảm tinh thần' })) : ''}
                  </div>
                  {[...committed, ...available].map(b => itemRow(b, true))}
                  <div style={{ display: 'flex', gap: 10, marginTop: 14, flexWrap: 'wrap' }}>
                    <button style={{ ...btnGhost, opacity: gs.refinedThisSprint ? 0.45 : 1 }} onClick={scrumRefineBacklog} disabled={gs.refinedThisSprint}>
                      🔍 {L(lang, { en: 'Refine backlog ($5K) — halve uncertainty on top items', fr: 'Raffiner le backlog (5K$) — incertitude réduite de moitié', es: 'Refinar backlog ($5K) — reduce a la mitad la incertidumbre de los ítems principales', vi: 'Tinh chỉnh backlog ($5K) — giảm nửa độ bất định các hạng mục đầu' })}
                    </button>
                    <button style={btnPrimary} onClick={scrumStartSprint}>
                      {L(lang, { en: 'Start Sprint →', fr: 'Démarrer le sprint →', es: 'Iniciar sprint →', vi: 'Bắt đầu sprint →' })}
                    </button>
                  </div>
                </div>
              )}

              {/* EXECUTING */}
              {gs.phase === 'executing' && (
                <div style={card}>
                  <h2 style={{ margin: '0 0 6px', color: '#1a1a2e', fontSize: '1.15rem' }}>⚡ {L(lang, { en: `Sprint ${gs.sprint} — Week ${gs.weekInSprint} of ${gs.sprintLength}`, fr: `Sprint ${gs.sprint} — Semaine ${gs.weekInSprint} de ${gs.sprintLength}`, es: `Sprint ${gs.sprint} — Semana ${gs.weekInSprint} de ${gs.sprintLength}`, vi: `Sprint ${gs.sprint} — Tuần ${gs.weekInSprint}/${gs.sprintLength}` })}</h2>
                  <p style={{ fontSize: '0.85rem', color: '#6c757d', margin: '0 0 12px' }}>
                    {L(lang, { en: `Sprint backlog (true sizes now revealed — the cone of uncertainty). Points done this sprint: ${Math.round(gs.sprintPointsDone * 10) / 10}.`, fr: `Backlog de sprint (tailles réelles révélées — le cône d'incertitude). Points réalisés ce sprint : ${Math.round(gs.sprintPointsDone * 10) / 10}.`, es: `Backlog del sprint (tamaños reales revelados — el cono de incertidumbre). Puntos completados este sprint: ${Math.round(gs.sprintPointsDone * 10) / 10}.`, vi: `Backlog sprint (kích cỡ thật đã lộ diện — nón bất định). Điểm hoàn thành sprint này: ${Math.round(gs.sprintPointsDone * 10) / 10}.` })}
                  </p>
                  {committed.map(b => itemRow(b, false))}
                  {committed.length === 0 && <p style={{ color: '#6c757d', fontSize: '0.85rem' }}>{L(lang, { en: 'Nothing committed this sprint.', fr: 'Rien d’engagé ce sprint.', es: 'Nada comprometido en este sprint.', vi: 'Chưa cam kết gì sprint này.' })}</p>}
                  <h3 style={{ fontSize: '0.9rem', color: '#1a1a2e', margin: '16px 0 8px' }}>{L(lang, { en: 'Weekly actions (each once per week)', fr: 'Actions hebdomadaires (une fois par semaine)', es: 'Acciones semanales (una vez por semana cada una)', vi: 'Hành động hằng tuần (mỗi hành động một lần mỗi tuần)' })}</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 8 }}>
                    {actionBtn('standup', '📋', L(lang, { en: 'Daily standups', fr: 'Mêlées quotidiennes', es: 'Standups diarios', vi: 'Standup hằng ngày' }), L(lang, { en: 'Free · mistakes −30% this week', fr: 'Gratuit · erreurs −30% cette semaine', es: 'Gratis · errores −30% esta semana', vi: 'Miễn phí · sai sót −30% tuần này' }))}
                    {actionBtn('quality_focus', '✅', L(lang, { en: 'DoD / quality focus', fr: 'Accent qualité / DoD', es: 'Enfoque DoD / calidad', vi: 'Tập trung DoD / chất lượng' }), L(lang, { en: '$6K · Quality +4, Knowledge +2', fr: '6K$ · Qualité +4, Connaissances +2', es: '$6K · Calidad +4, Conocimiento +2', vi: '$6K · Chất lượng +4, Kiến thức +2' }))}
                    {actionBtn('coaching', '🎓', L(lang, { en: 'Coaching session', fr: 'Session de coaching', es: 'Sesión de coaching', vi: 'Buổi huấn luyện' }), L(lang, { en: `$${(500 * gs.team.size) / 1000}K · Knowledge +8`, fr: `${(500 * gs.team.size) / 1000}K$ · Connaissances +8`, es: `$${(500 * gs.team.size) / 1000}K · Conocimiento +8`, vi: `$${(500 * gs.team.size) / 1000}K · Kiến thức +8` }))}
                    {actionBtn('team_building', '🤝', L(lang, { en: 'Team building', fr: 'Consolidation d’équipe', es: 'Cohesión de equipo', vi: 'Gắn kết đội nhóm' }), L(lang, { en: '$8K · Morale +10, Stress −8', fr: '8K$ · Moral +10, Stress −8', es: '$8K · Moral +10, Estrés −8', vi: '$8K · Tinh thần +10, Căng thẳng −8' }))}
                    {actionBtn('crunch', '🔥', L(lang, { en: 'Crunch (borrowed velocity)', fr: 'Mode intensif (vélocité empruntée)', es: 'Crunch (velocidad prestada)', vi: 'Tăng tốc (mượn velocity)' }), L(lang, { en: '$10K · +2.5 pts now, Morale −12, score penalty', fr: '10K$ · +2,5 pts, Moral −12, pénalité au score', es: '$10K · +2.5 pts ahora, Moral −12, penalización de puntaje', vi: '$10K · +2.5 điểm ngay, Tinh thần −12, bị trừ điểm' }))}
                  </div>
                  <div style={{ marginTop: 16 }}>
                    <button style={btnPrimary} onClick={scrumAdvanceWeek}>
                      {gs.weekInSprint < gs.sprintLength ? (L(lang, { en: 'Advance Week →', fr: 'Semaine suivante →', es: 'Avanzar semana →', vi: 'Sang tuần tiếp →' })) : (L(lang, { en: 'End Sprint → Review & Demo', fr: 'Fin du sprint → Revue et démo', es: 'Terminar sprint → Revisión y demo', vi: 'Kết thúc sprint → Đánh giá & Demo' }))}
                    </button>
                  </div>
                </div>
              )}

              {/* REVIEW */}
              {gs.phase === 'review' && summary && (
                <div style={card}>
                  <h2 style={{ margin: '0 0 6px', color: '#1a1a2e', fontSize: '1.15rem' }}>🎬 {L(lang, { en: `Sprint ${summary.sprint} Review — Demo Day`, fr: `Revue du sprint ${summary.sprint} — Jour de démo`, es: `Revisión del Sprint ${summary.sprint} — Día de demo`, vi: `Đánh giá Sprint ${summary.sprint} — Ngày demo` })}</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10, margin: '12px 0' }}>
                    <div style={{ background: '#f8f9fa', borderRadius: 8, padding: '10px 12px', textAlign: 'center' }}>
                      <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1a1a2e' }}>{summary.completedPts} / {summary.committed}</div>
                      <div style={{ fontSize: '0.72rem', color: '#6c757d' }}>{L(lang, { en: 'pts completed vs committed', fr: 'pts réalisés vs engagés', es: 'pts completados vs comprometidos', vi: 'điểm hoàn thành so với cam kết' })}</div>
                    </div>
                    <div style={{ background: '#f0fdf4', borderRadius: 8, padding: '10px 12px', textAlign: 'center' }}>
                      <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#15803d' }}>+{summary.bookedValue}</div>
                      <div style={{ fontSize: '0.72rem', color: '#6c757d' }}>{L(lang, { en: 'business value booked', fr: 'valeur d’affaires comptabilisée', es: 'valor de negocio registrado', vi: 'giá trị kinh doanh ghi nhận' })}</div>
                    </div>
                    <div style={{ background: summary.carryover.length ? '#fef3c7' : '#f8f9fa', borderRadius: 8, padding: '10px 12px', textAlign: 'center' }}>
                      <div style={{ fontSize: '1.2rem', fontWeight: 700, color: summary.carryover.length ? '#b45309' : '#1a1a2e' }}>{summary.carryover.length}</div>
                      <div style={{ fontSize: '0.72rem', color: '#6c757d' }}>{L(lang, { en: 'items carried over', fr: 'éléments reportés', es: 'ítems arrastrados', vi: 'hạng mục dời lại' })}</div>
                    </div>
                  </div>
                  {summary.doneItems.length > 0 ? (
                    <p style={{ fontSize: '0.88rem', color: '#495057' }}>
                      ✅ {L(lang, { en: 'Shipped:', fr: 'Livré :', es: 'Entregado:', vi: 'Đã giao:' })} {summary.doneItems.map(id => {
                        const it = gs.backlog.find(b => b.id === id);
                        return it ? (lf(it, 'name', lang)) : id;
                      }).join(', ')}
                    </p>
                  ) : (
                    <p style={{ fontSize: '0.88rem', color: '#b91c1c' }}>{L(lang, { en: 'Nothing reached "done" this sprint — no value booked. Only finished, demo-able work counts.', fr: 'Rien n’a atteint « terminé » ce sprint — aucune valeur comptabilisée. Seul le travail fini et démontrable compte.', es: 'Nada llegó a "hecho" este sprint — sin valor registrado. Solo cuenta el trabajo terminado y demostrable.', vi: 'Không có gì đạt "xong" sprint này — không ghi nhận giá trị. Chỉ công việc hoàn tất, demo được mới tính.' })}</p>
                  )}
                  {summary.qualityFactor < 1 && (
                    <p style={{ fontSize: '0.82rem', color: '#b45309' }}>⚠️ {L(lang, { en: `Quality below standard — stakeholders discounted the demo (value ×${summary.qualityFactor}).`, fr: `Qualité sous la norme — les parties prenantes ont escompté la démo (valeur ×${summary.qualityFactor}).`, es: `Calidad bajo el estándar — los interesados descontaron la demo (valor ×${summary.qualityFactor}).`, vi: `Chất lượng dưới chuẩn — các bên liên quan đánh giá thấp demo (giá trị ×${summary.qualityFactor}).` })}</p>
                  )}
                  {summary.dodPenalty && (
                    <p style={{ fontSize: '0.82rem', color: '#b91c1c' }}>🐛 {L(lang, { en: 'Latent defects from earlier sprints clawed back 15% of booked value.', fr: 'Des défauts latents des sprints précédents ont retranché 15% de la valeur comptabilisée.', es: 'Defectos latentes de sprints anteriores restaron 15% del valor registrado.', vi: 'Lỗi tiềm ẩn từ các sprint trước lấy lại 15% giá trị đã ghi nhận.' })}</p>
                  )}
                  <button style={{ ...btnPrimary, marginTop: 10 }} onClick={scrumFinishReview}>
                    {L(lang, { en: 'Continue → Retrospective', fr: 'Continuer → Rétrospective', es: 'Continuar → Retrospectiva', vi: 'Tiếp tục → Cải tiến sprint' })}
                  </button>
                </div>
              )}

              {/* RETRO */}
              {gs.phase === 'retro' && (
                <div style={card}>
                  <h2 style={{ margin: '0 0 6px', color: '#1a1a2e', fontSize: '1.15rem' }}>🔄 {L(lang, { en: `Sprint ${gs.sprint} Retrospective`, fr: `Rétrospective du sprint ${gs.sprint}`, es: `Retrospectiva del Sprint ${gs.sprint}`, vi: `Cải tiến Sprint ${gs.sprint}` })}</h2>
                  <p style={{ fontSize: '0.85rem', color: '#6c757d', margin: '0 0 12px' }}>
                    {L(lang, { en: 'Pick ONE improvement. Effects compound across the remaining sprints — the retro is your highest-leverage ceremony.', fr: 'Choisissez UNE amélioration. Les effets se composent sur les sprints restants — la rétro est votre cérémonie au plus fort levier.', es: 'Elige UNA mejora. Los efectos se acumulan en los sprints restantes — la retro es tu ceremonia de mayor palanca.', vi: 'Chọn MỘT cải tiến. Hiệu quả cộng dồn qua các sprint còn lại — retro là nghi thức đòn bẩy cao nhất của bạn.' })}
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
                    {RETRO_IMPROVEMENTS.filter(imp => !gs.improvements.includes(imp.id)).map(imp => (
                      <button key={imp.id} onClick={() => scrumNextSprint(imp.id)}
                        style={{ ...btnGhost, textAlign: 'left', padding: '12px 14px' }}>
                        <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#1a1a2e' }}>{imp.icon} {lf(imp, 'name', lang)}</div>
                        <div style={{ fontSize: '0.75rem', color: '#6c757d', marginTop: 4 }}>{lf(imp, 'desc', lang)}</div>
                      </button>
                    ))}
                  </div>
                  {gs.improvements.length > 0 && (
                    <p style={{ fontSize: '0.78rem', color: '#6c757d', marginTop: 10 }}>
                      {L(lang, { en: 'Already adopted:', fr: 'Déjà adoptées :', es: 'Ya adoptadas:', vi: 'Đã áp dụng:' })} {gs.improvements.map(id => {
                        const imp = RETRO_IMPROVEMENTS.find(r => r.id === id);
                        return imp ? (lf(imp, 'name', lang)) : id;
                      }).join(' · ')}
                    </p>
                  )}
                  <button style={{ ...btnPrimary, marginTop: 14 }} onClick={() => scrumNextSprint(null)}>
                    {gs.sprint >= gs.totalSprints
                      ? (L(lang, { en: 'Finish Simulation — Investor Demo 🏁', fr: 'Terminer la simulation — Démo investisseurs 🏁', es: 'Terminar simulación — Demo para inversionistas 🏁', vi: 'Kết thúc mô phỏng — Demo nhà đầu tư 🏁' }))
                      : (L(lang, { en: `Skip → Plan Sprint ${gs.sprint + 1}`, fr: `Passer → Planifier le sprint ${gs.sprint + 1}`, es: `Omitir → Planificar Sprint ${gs.sprint + 1}`, vi: `Bỏ qua → Lập kế hoạch Sprint ${gs.sprint + 1}` }))}
                  </button>
                  {RETRO_IMPROVEMENTS.filter(imp => !gs.improvements.includes(imp.id)).length > 0 && gs.sprint < gs.totalSprints && (
                    <p style={{ fontSize: '0.72rem', color: '#adb5bd', marginTop: 6 }}>
                      {L(lang, { en: 'Picking an improvement also advances to the next sprint.', fr: 'Choisir une amélioration passe aussi au sprint suivant.', es: 'Elegir una mejora también avanza al siguiente sprint.', vi: 'Chọn cải tiến cũng sẽ chuyển sang sprint tiếp theo.' })}
                    </p>
                  )}
                </div>
              )}

              {/* ANNA panel */}
              {annaVisible && (
                <div style={{ ...card, borderColor: '#99f6e4' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    {annaAvatar(36)}
                    <div style={{ fontWeight: 700, color: '#0f766e' }}>ANNA — {L(lang, { en: 'Scrum Coach', fr: 'Coach Scrum', es: 'Coach de Scrum', vi: 'Huấn luyện viên Scrum' })}</div>
                    <button style={{ marginLeft: 'auto', ...btnGhost, padding: '4px 10px' }} onClick={() => setAnnaVisible(false)}>✕</button>
                  </div>
                  {annaLoading
                    ? <p style={{ color: '#6c757d', fontSize: '0.88rem' }}>{L(lang, { en: 'Anna is analysing your sprint…', fr: 'Anna analyse votre sprint…', es: 'Anna está analizando tu sprint…', vi: 'Anna đang phân tích sprint của bạn…' })}</p>
                    : renderAnnaAdvice(annaAdvice, '#1a1a2e')}
                </div>
              )}
            </div>

            {/* SIDEBAR */}
            <div>
              <div style={card}>
                <h3 style={{ margin: '0 0 10px', fontSize: '0.85rem', color: '#6c757d', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{L(lang, { en: 'Value Delivered', fr: 'Valeur livrée', es: 'Valor entregado', vi: 'Giá trị đã giao' })}</h3>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#10b981' }}>{gs.valueDelivered}<span style={{ fontSize: '0.9rem', color: '#adb5bd', fontWeight: 500 }}> / {gs.valueTarget}</span></div>
                <div style={{ height: 10, background: '#e9ecef', borderRadius: 5, margin: '8px 0 4px' }}>
                  <div style={{ height: 10, width: `${Math.min(100, (gs.valueDelivered / gs.valueTarget) * 100)}%`, background: 'linear-gradient(90deg,#10b981,#34d399)', borderRadius: 5, transition: 'width 0.4s' }}></div>
                </div>
                <div style={{ fontSize: '0.72rem', color: '#6c757d' }}>{L(lang, { en: 'Ship value, not features — 300 pts', fr: 'Livrez de la valeur, pas des fonctionnalités — 300 pts', es: 'Entrega valor, no funciones — 300 pts', vi: 'Giao giá trị, không phải tính năng — 300 điểm' })}</div>
              </div>

              <div style={card}>
                <h3 style={{ margin: '0 0 10px', fontSize: '0.85rem', color: '#6c757d', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{L(lang, { en: 'Velocity (done vs committed)', fr: 'Vélocité (fait vs engagé)', es: 'Velocidad (hecho vs comprometido)', vi: 'Velocity (xong so với cam kết)' })}</h3>
                {gs.velocityHistory.length === 0 && <div style={{ fontSize: '0.8rem', color: '#adb5bd' }}>{L(lang, { en: `No history yet — forecast ${forecast} pts`, fr: `Pas encore d'historique — prévision ${forecast} pts`, es: `Sin historial aún — pronóstico ${forecast} pts`, vi: `Chưa có lịch sử — dự báo ${forecast} điểm` })}</div>}
                {gs.velocityHistory.map((v, i) => {
                  const c = gs.commitHistory[i] || 0;
                  const ok = c > 0 && Math.abs(v - c) / c <= 0.15;
                  return (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', padding: '4px 0', borderBottom: '1px solid #f1f3f5' }}>
                      <span style={{ color: '#6c757d' }}>Sprint {i + 1}</span>
                      <span style={{ fontWeight: 600, color: ok ? '#15803d' : '#b45309' }}>{v} / {c} pts</span>
                    </div>
                  );
                })}
              </div>

              <div style={card}>
                <h3 style={{ margin: '0 0 10px', fontSize: '0.85rem', color: '#6c757d', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{L(lang, { en: 'Team & Quality', fr: 'Équipe et qualité', es: 'Equipo y calidad', vi: 'Đội nhóm & chất lượng' })}</h3>
                {statBar(L(lang, { en: 'Morale', fr: 'Moral', es: 'Moral', vi: 'Tinh thần' }), gs.team.morale, gs.team.morale >= 60 ? '#10b981' : '#f59e0b')}
                {statBar('Stress', gs.team.stress, gs.team.stress > 60 ? '#ef4444' : '#3b82f6')}
                {statBar(L(lang, { en: 'Knowledge', fr: 'Connaissances', es: 'Conocimiento', vi: 'Kiến thức' }), gs.team.knowledge, '#8b5cf6')}
                {statBar(L(lang, { en: 'Quality (DoD)', fr: 'Qualité (DoD)', es: 'Calidad (DoD)', vi: 'Chất lượng (DoD)' }), gs.quality, gs.quality >= 75 ? '#10b981' : gs.quality >= 60 ? '#f59e0b' : '#ef4444')}
                <div style={{ fontSize: '0.72rem', color: '#6c757d', marginTop: 4 }}>
                  {L(lang, { en: `Escaped defects: ${gs.escapedDefects} · Crunches: ${gs.crunchUsed}`, fr: `Défauts échappés : ${gs.escapedDefects} · Modes intensifs : ${gs.crunchUsed}`, es: `Defectos escapados: ${gs.escapedDefects} · Crunch: ${gs.crunchUsed}`, vi: `Lỗi lọt: ${gs.escapedDefects} · Tăng tốc: ${gs.crunchUsed}` })}
                </div>
              </div>

              <div style={card}>
                <h3 style={{ margin: '0 0 10px', fontSize: '0.85rem', color: '#6c757d', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Budget</h3>
                <div style={{ fontSize: '0.9rem', color: '#1a1a2e', fontWeight: 600 }}>${(gs.budget.spent / 1000).toFixed(0)}K / ${(gs.budget.total / 1000).toFixed(0)}K</div>
                <div style={{ fontSize: '0.72rem', color: '#6c757d', marginTop: 4 }}>
                  {L(lang, { en: 'Target band: spend 80–100%. Hoarding budget scores nothing here.', fr: 'Bande cible : dépenser 80–100%. Thésauriser ne rapporte rien ici.', es: 'Banda objetivo: gasta 80–100%. Acumular presupuesto no da puntos aquí.', vi: 'Vùng mục tiêu: chi 80–100%. Găm ngân sách không được điểm ở đây.' })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* EVENT MODAL */}
        {ev && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(26,26,46,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
            <div style={{ background: '#fff', borderRadius: 16, maxWidth: 580, width: '100%', padding: '1.75rem', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
              <div style={{ fontSize: '2.2rem' }}>{ev.icon}</div>
              <h2 style={{ margin: '8px 0', color: '#1a1a2e' }}>{lf(ev, 'title', lang)}</h2>
              <p style={{ color: '#495057', fontSize: '0.92rem', lineHeight: 1.6 }}>{lf(ev, 'description', lang)}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 14 }}>
                {ev.options.map(o => (
                  <button key={o.id} onClick={() => scrumEventChoice(o)}
                    style={{ ...btnGhost, textAlign: 'left', padding: '12px 14px', borderColor: '#ced4da' }}>
                    <div style={{ fontWeight: 600, fontSize: '0.88rem', color: '#1a1a2e' }}>{lf(o, 'label', lang)}</div>
                    {o.effectsNote && <div style={{ fontSize: '0.74rem', color: '#6c757d', marginTop: 3 }}>{o.effectsNote}</div>}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Toast */}
        {toast && (
          <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: '#1a1a2e', color: '#fff', padding: '10px 18px', borderRadius: 10, zIndex: 1200, fontSize: '0.9rem', boxShadow: '0 4px 12px rgba(0,0,0,0.25)', maxWidth: '90vw' }}>
            {toast.message}
          </div>
        )}
      </div>
    );
  };

  const renderScrumResults = () => {
    const gs = gameState;
    const en = lang === 'en';
    const finalScore = calculateScrumScore(gs);
    const grade = getGrade(finalScore);
    const bd = calculateScrumScoreBreakdown(gs);
    const isGreatScore = grade.startsWith('A') || grade === 'B+';
    const doneItems = [...gs.backlog].filter(b => b.state === 'done').sort((a, b) => a.rank - b.rank);
    const notBuilt = [...gs.backlog].filter(b => b.state === 'backlog' || b.state === 'committed').sort((a, b) => b.value - a.value);

    const rows = [
      { icon: '💎', label: L(lang, { en: 'Business Value Delivered', fr: 'Valeur d’affaires livrée', es: 'Valor de negocio entregado', vi: 'Giá trị kinh doanh đã giao' }), pts: bd.value, max: bd.valueMax, note: `${gs.valueDelivered} / ${gs.valueTarget}` },
      { icon: '📏', label: L(lang, { en: 'Sprint Predictability', fr: 'Prévisibilité des sprints', es: 'Predictibilidad del sprint', vi: 'Độ dự đoán được của sprint' }), pts: bd.predictability, max: bd.predictabilityMax, note: `${Math.round(bd.predictabilityRatio * 100)}%` },
      { icon: '⭐', label: L(lang, { en: 'Quality / Definition of Done', fr: 'Qualité / Définition de terminé', es: 'Calidad / Definition of Done', vi: 'Chất lượng / Definition of Done' }), pts: bd.quality, max: bd.qualityMax, note: `${Math.round(gs.quality)}/100 · ${gs.escapedDefects} ${L(lang, { en: 'escaped defects', fr: 'défauts échappés', es: 'defectos escapados', vi: 'lỗi lọt' })}` },
      { icon: '🔄', label: L(lang, { en: 'Responsiveness to Change', fr: 'Réactivité au changement', es: 'Respuesta al cambio', vi: 'Khả năng ứng biến với thay đổi' }), pts: bd.responsiveness, max: bd.responsivenessMax, note: L(lang, { en: `Pivot: ${gs.pivotHandled || '—'}`, fr: `Pivot : ${gs.pivotHandled || '—'}`, es: `Pivote: ${gs.pivotHandled || '—'}`, vi: `Xoay trục: ${gs.pivotHandled || '—'}` })},
      { icon: '👥', label: L(lang, { en: 'Team Health (sustainable pace)', fr: 'Santé de l’équipe (rythme soutenable)', es: 'Salud del equipo (ritmo sostenible)', vi: 'Sức khỏe đội nhóm (nhịp độ bền vững)' }), pts: bd.team, max: bd.teamMax, note: `${Math.round(bd.avgMorale)}% ${L(lang, { en: 'avg morale', fr: 'moral moyen', es: 'moral promedio', vi: 'tinh thần TB' })} · ${gs.crunchUsed} crunch` },
      { icon: '💰', label: L(lang, { en: 'Budget Discipline (target band)', fr: 'Discipline budgétaire (bande cible)', es: 'Disciplina presupuestaria (banda objetivo)', vi: 'Kỷ luật ngân sách (vùng mục tiêu)' }), pts: bd.budget, max: bd.budgetMax, note: `$${(gs.budget.spent / 1000).toFixed(0)}K / $${(gs.budget.total / 1000).toFixed(0)}K` }
    ];

    return (
      <div className="sim-ended">
        {isGreatScore && <Confetti />}
        <div className="results-container">
          <div className="results-header">
            <div className="results-animation">
              {isGreatScore ? <SuccessAnimation /> : <div className="trophy-icon">🏆</div>}
            </div>
            <h1>{L(lang, { en: 'Investor Demo Complete', fr: 'Démo investisseurs terminée', es: 'Demo para inversionistas completada', vi: 'Hoàn tất demo nhà đầu tư' })}</h1>
            <p className="results-subtitle">{selectedScenario.projectName} • {selectedScenario.company} • Scrum</p>
            <div className="grade-display">
              <span className="main-grade" style={{ color: grade.startsWith('A') ? '#10b981' : grade.startsWith('B') ? '#ED1B2F' : grade === 'C' ? '#f59e0b' : '#ef4444' }}>{grade}</span>
              <span className="grade-label">{finalScore} / 1000</span>
            </div>
          </div>

          <div className="score-breakdown">
            <h3>{L(lang, { en: 'Scrum Score Breakdown', fr: 'Détail du score Scrum', es: 'Desglose de puntaje Scrum', vi: 'Chi tiết điểm Scrum' })}</h3>
            <p style={{ fontSize: '0.85rem', color: '#6c757d' }}>
              {L(lang, { en: 'This scenario scores agile behaviour: value over volume, predictability over deadline rigidity. Re-prioritising was free — undelivered value is what cost points.', fr: 'Ce scénario note le comportement agile : la valeur plutôt que le volume, la prévisibilité plutôt que la rigidité d’échéance. Re-prioriser était gratuit — c’est la valeur non livrée qui coûte des points.', es: 'Este escenario puntúa el comportamiento ágil: valor sobre volumen, predictibilidad sobre rigidez de plazos. Re-priorizar era gratis — el valor no entregado es lo que costó puntos.', vi: 'Kịch bản này chấm hành vi agile: giá trị hơn khối lượng, dự đoán được hơn cứng nhắc thời hạn. Sắp xếp lại ưu tiên là miễn phí — giá trị không giao mới là thứ mất điểm.' })}
            </p>
            <div className="breakdown-grid">
              {rows.map((r, i) => {
                const pct = Math.round((r.pts / r.max) * 100);
                return (
                  <div key={i} className="breakdown-card">
                    <div className="breakdown-header">
                      <span className="breakdown-icon">{r.icon}</span>
                      <span className="breakdown-title">{r.label}</span>
                    </div>
                    <div className="breakdown-value">{r.pts} / {r.max}</div>
                    <div className="breakdown-bar">
                      <div className="breakdown-fill" style={{ width: `${pct}%`, background: pct >= 75 ? '#10b981' : pct >= 50 ? '#f59e0b' : '#ef4444' }}></div>
                    </div>
                    <span className="breakdown-status">{r.note}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mission-recap">
            <h3>{L(lang, { en: 'Sprint-by-Sprint', fr: 'Sprint par sprint', es: 'Sprint por sprint', vi: 'Theo từng sprint' })}</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ textAlign: 'left', color: '#6c757d' }}>
                    <th style={{ padding: '6px 10px' }}>Sprint</th>
                    <th style={{ padding: '6px 10px' }}>{L(lang, { en: 'Committed', fr: 'Engagé', es: 'Comprometido', vi: 'Đã cam kết' })}</th>
                    <th style={{ padding: '6px 10px' }}>{L(lang, { en: 'Completed', fr: 'Réalisé', es: 'Completado', vi: 'Hoàn thành' })}</th>
                    <th style={{ padding: '6px 10px' }}>{L(lang, { en: 'Value booked', fr: 'Valeur comptabilisée', es: 'Valor registrado', vi: 'Giá trị ghi nhận' })}</th>
                  </tr>
                </thead>
                <tbody>
                  {gs.commitHistory.map((c, i) => (
                    <tr key={i} style={{ borderTop: '1px solid #e9ecef' }}>
                      <td style={{ padding: '6px 10px', fontWeight: 600 }}>{i + 1}</td>
                      <td style={{ padding: '6px 10px' }}>{c} pts</td>
                      <td style={{ padding: '6px 10px' }}>{gs.velocityHistory[i] != null ? `${gs.velocityHistory[i]} pts` : '—'}</td>
                      <td style={{ padding: '6px 10px', color: '#15803d', fontWeight: 600 }}>+{gs.sprintValueHistory[i] || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
              <div>
                <h4 style={{ color: '#15803d', margin: '0 0 6px' }}>✅ {L(lang, { en: 'Shipped', fr: 'Livré', es: 'Entregado', vi: 'Đã giao' })} ({doneItems.length})</h4>
                <p style={{ fontSize: '0.85rem', color: '#495057', lineHeight: 1.6 }}>
                  {doneItems.map(b => `${lf(b, 'name', lang)} (${b.value})`).join(' · ') || (L(lang, { en: 'Nothing shipped', fr: 'Rien de livré', es: 'Nada entregado', vi: 'Chưa giao gì' }))}
                </p>
              </div>
              <div>
                <h4 style={{ color: '#6c757d', margin: '0 0 6px' }}>✂️ {L(lang, { en: 'Deliberately not built', fr: 'Volontairement non construit', es: 'Deliberadamente no construido', vi: 'Chủ động không làm' })} ({notBuilt.length})</h4>
                <p style={{ fontSize: '0.85rem', color: '#868e96', lineHeight: 1.6 }}>
                  {notBuilt.map(b => `${lf(b, 'name', lang)} (${b.value})`).join(' · ') || '—'}
                </p>
              </div>
            </div>
          </div>

          <div className="analysis-section">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              {annaAvatar(36)}
              <h3 style={{ margin: 0 }}>{L(lang, { en: 'Anna’s Debrief', fr: 'Débreffage d’Anna', es: 'Debrief de Anna', vi: 'Tổng kết của Anna' })}</h3>
            </div>
            {annaDebrief
              ? renderAnnaAdvice(annaDebrief, '#1a1a2e')
              : (
                <button className="btn-primary" onClick={() => askAnnaDebrief(finalScore, grade, gs)} disabled={annaDebriefLoading}>
                  {annaDebriefLoading ? (L(lang, { en: 'Anna is writing your debrief…', fr: 'Anna rédige votre débreffage…', es: 'Anna está escribiendo tu debrief…', vi: 'Anna đang viết bản tổng kết…' })) : (L(lang, { en: '💬 Get Anna’s debrief', fr: '💬 Obtenir le débreffage d’Anna', es: '💬 Ver el debrief de Anna', vi: '💬 Xem tổng kết của Anna' }))}
                </button>
              )}
          </div>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', margin: '2rem 0' }}>
            <button className="btn-primary btn-lg" onClick={() => { setSimPhase('select'); setGameState(null); setAnnaDebrief(''); setAnnaAdvice(''); setAnnaVisible(false); }}>
              {L(lang, { en: 'Play Another Scenario', fr: 'Jouer un autre scénario', es: 'Jugar otro escenario', vi: 'Chơi kịch bản khác' })}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderSimulation = () => {
    // Scrum scenarios use their own sprint-loop UI and results screen
    if (gameState && gameState.framework === 'scrum' && simPhase === 'playing') return renderScrumGame();
    if (gameState && gameState.framework === 'scrum' && simPhase === 'ended') return renderScrumResults();

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
            <button className="back-link" onClick={() => setCurrentPage('catalog')}>← {L(lang, { en: 'Back to Library', fr: 'Retour à la bibliothèque', es: 'Volver a la biblioteca', vi: 'Về thư viện' })}</button>
            
            {/* Main Title */}
            <div className="sim-select-header">
              <h1>{L(lang, { en: 'Choose Your Industry', fr: 'Choisissez votre industrie', es: 'Elige tu industria', vi: 'Chọn ngành của bạn' })}</h1>
              <p>{L(lang, { en: 'Each scenario offers unique PM challenges and learning opportunities', fr: 'Chaque scénario offre des défis uniques et des opportunités d\'apprentissage', es: 'Cada escenario ofrece desafíos de gestión de proyectos y oportunidades de aprendizaje únicos', vi: 'Mỗi kịch bản mang đến những thách thức QLDA và cơ hội học tập riêng' })}</p>
            </div>
            
            {/* One labelled section per industry category (empty ones hidden) */}
            {SCENARIO_CATEGORIES.map(cat => {
              if (categoryFilter && cat.key !== categoryFilter) return null;
              const items = Object.values(APEX_SCENARIOS).filter(s => s.category === cat.key);
              if (items.length === 0) return null;
              const group = {
                key: cat.key,
                title: `${cat.icon} ${L(lang, cat)}`,
                subtitle: L(lang, { en: cat.subEn, fr: cat.subFr, es: cat.subEs, vi: cat.subVi }),
                items
              };
              return (
            <div key={group.key} style={{ marginBottom: '2.5rem' }}>
              <div style={{ margin: '0 0 1rem', paddingLeft: '14px', borderLeft: '4px solid #ED1B2F' }}>
                <h2 style={{ margin: 0, fontSize: '1.35rem', color: '#f1f5f9' }}>{group.title}</h2>
                <p style={{ margin: '4px 0 0', fontSize: '0.9rem', color: '#94a3b8' }}>{group.subtitle}</p>
              </div>
            <div className="industry-cards-grid">
              {group.items.map(scenario => {
                const gradientColors = {
                  tech_startup: { from: '#3b82f6', to: '#60a5fa' },
                  live_show: { from: '#ec4899', to: '#f472b6' },
                  construction: { from: '#f59e0b', to: '#fbbf24' },
                  rd_innovation: { from: '#10b981', to: '#34d399' },
                  momentum_scrum: { from: '#8b5cf6', to: '#a78bfa' },
                  dms_dynamics: { from: '#0ea5e9', to: '#38bdf8' },
                  cloud_foundation: { from: '#6366f1', to: '#818cf8' },
                  torque_ai_scrum: { from: '#dc2626', to: '#f87171' },
                  fastlane_scrum: { from: '#0d9488', to: '#2dd4bf' },
                  apex_biotech: { from: '#14b8a6', to: '#5eead4' },
                  festival_borealis: { from: '#ec4899', to: '#f9a8d4' },
                  fitout_chain: { from: '#f97316', to: '#fdba74' },
                  datacenter_exit: { from: '#3b82f6', to: '#93c5fd' },
                  core_banking: { from: '#7c3aed', to: '#a78bfa' },
                  regtech_aml: { from: '#64748b', to: '#94a3b8' },
                  skunkworks_scrum: { from: '#0ea5e9', to: '#7dd3fc' },
                  gamestudio_scrum: { from: '#e11d48', to: '#fb7185' },
                  sitesync_scrum: { from: '#d97706', to: '#fcd34d' },
                  devops_scrum: { from: '#22c55e', to: '#86efac' },
                  northbridge_dc: { from: '#a16207', to: '#facc15' },
                  peak_season: { from: '#0369a1', to: '#7dd3fc' },
                  cleartrack_scrum: { from: '#4f46e5', to: '#a5b4fc' },
                  launch_window: { from: '#db2777', to: '#f9a8d4' },
                  rebrand_rollout: { from: '#9333ea', to: '#d8b4fe' },
                  growthlab_scrum: { from: '#ea580c', to: '#fdba74' }
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
                  },
                  momentum_scrum: {
                    title: 'Momentum',
                    subtitle: 'MVP FinTech en Scrum',
                    description: 'Vous êtes Product Owner dans une startup fintech. Livrez le MVP de paiements le plus précieux avant la démo aux investisseurs — vous ne pouvez pas tout construire.'
                  },
                  dms_dynamics: {
                    title: 'Dealer One',
                    subtitle: 'Déploiement du système de gestion (DMS)',
                    description: 'Gestionnaire de projet TI chez un concessionnaire de camions lourds. Remplacez le vieux système de gestion par Dynamics 365 pour les ventes, le service et les pièces — sans arrêter l\u2019atelier.'
                  },
                  cloud_foundation: {
                    title: 'Cloud Shift',
                    subtitle: 'Migration Microsoft 365',
                    description: 'Faites passer le concessionnaire de la salle de serveurs à Microsoft 365 — courriel, fichiers, Teams et authentification unique — sans perturber les baies de service, le comptoir de pièces ni le plancher de vente.'
                  },
                  torque_ai_scrum: {
                    title: 'Torque AI',
                    subtitle: 'IA pièces et service en Scrum',
                    description: 'Product Owner de l\u2019équipe TI du concessionnaire. Construisez un assistant IA pour le prix des pièces, le TCO et l\u2019intelligence service — les estimations IA sont très incertaines, et vous ne pouvez pas tout construire.'
                  },
                  fastlane_scrum: {
                    title: 'FastLane',
                    subtitle: 'Portail client service en Scrum',
                    description: 'Product Owner du portail client du concessionnaire : rendez-vous en ligne, suivi des réparations, outils de flotte. Livrez le portail le plus précieux avant le lancement — vous ne pouvez pas tout construire.'
                  },
                  apex_biotech: {
                    title: 'Helix Trial',
                    subtitle: 'Essai clinique de phase II',
                    description: 'Responsable de programme chez BioNova Therapeutics. Menez un essai de phase II — recrutement de patients, régulateurs et science de l\u2019essai portent tous une profonde incertitude.'
                  },
                  festival_borealis: {
                    title: 'Festival Borealis',
                    subtitle: 'Festival de musique de trois jours',
                    description: 'Direction du festival chez Borealis Events. Livrez un festival extérieur de trois jours — têtes d\u2019affiche, permis, fournisseurs et 40 000 détenteurs de billets.'
                  },
                  fitout_chain: {
                    title: 'Aménagement détail',
                    subtitle: 'Programme de rénovation de huit magasins',
                    description: 'Gestion de programme chez UrbanCore Interiors. Rénovez huit magasins d\u2019une chaîne nationale — même design, huit bâtiments différents, un calendrier de réouverture immuable.'
                  },
                  datacenter_exit: {
                    title: 'Exit Velocity',
                    subtitle: 'Migration du centre de données au nuage',
                    description: 'Responsable de migration chez Meridian Group. Sortez 40 charges de production d\u2019un centre de données dont le bail expire dans 14 semaines — les vagues pilotes sont votre meilleure assurance.'
                  },
                  core_banking: {
                    title: 'Ledger Prime',
                    subtitle: 'Remplacement du système bancaire central',
                    description: 'Direction de programme chez Meridian Trust. Remplacez la plateforme bancaire centrale avant l\u2019échéance de modernisation du régulateur — les exécutions parallèles sont votre seul filet de sécurité.'
                  },
                  regtech_aml: {
                    title: 'CleanSweep',
                    subtitle: 'Programme de conformité anti-blanchiment',
                    description: 'GP conformité chez Meridian Trust. Mettez en place le nouveau programme de surveillance anti-blanchiment — dix contrôles, une échéance réglementaire immuable.'
                  },
                  skunkworks_scrum: {
                    title: 'Skunkworks',
                    subtitle: 'Démo de drone en Scrum',
                    description: 'Product Owner d\u2019une équipe skunkworks. Construisez la démo de drone autonome la plus impressionnante possible pour la vitrine investisseurs — vous ne pouvez pas tout construire.'
                  },
                  gamestudio_scrum: {
                    title: 'Pixel Forge',
                    subtitle: 'Tranche verticale de jeu en Scrum',
                    description: 'Product Owner dans un studio indépendant. Livrez la tranche verticale la plus convaincante pour le pitch à l\u2019éditeur — le plaisir d\u2019abord, les fonctionnalités ensuite.'
                  },
                  sitesync_scrum: {
                    title: 'SiteSync',
                    subtitle: 'Application de chantier en Scrum',
                    description: 'Product Owner de l\u2019unité techno d\u2019un constructeur. Livrez l\u2019application que les équipes de chantier utiliseront vraiment — rapports quotidiens, déficiences, plans — avant le début du projet phare.'
                  },
                  devops_scrum: {
                    title: 'Pipeline Zero',
                    subtitle: 'Plateforme développeur en Scrum',
                    description: 'Product Owner de l\u2019équipe plateforme. Construisez la plateforme interne où vivront 200 ingénieurs — le travail de plateforme cache une incertitude d\u2019estimation brutale.'
                  },
                  northbridge_dc: {
                    title: 'NorthBridge DC',
                    subtitle: 'Mise en service d\u2019un centre de distribution',
                    description: 'Gestion de programme chez Boreal Logistics. Mettez en service un centre de distribution automatisé — WMS, convoyeurs, rayonnages et 120 embauches — avant l\u2019entrée en vigueur des contrats de détail.'
                  },
                  peak_season: {
                    title: 'Haute saison',
                    subtitle: 'Programme de préparation des Fêtes',
                    description: 'Responsable de la préparation du réseau chez Boreal Logistics. Dix chantiers — transporteurs, personnel temporaire, prépositionnement des stocks — avant la vague des Fêtes.'
                  },
                  cleartrack_scrum: {
                    title: 'ClearTrack',
                    subtitle: 'Plateforme de visibilité en Scrum',
                    description: 'Product Owner chez Boreal Logistics. Livrez la plateforme de visibilité des expéditions que les clients réclament — le suivi d\u2019abord, tout le reste est un arbitrage.'
                  },
                  launch_window: {
                    title: 'Launch Window',
                    subtitle: 'Lancement de produit national',
                    description: 'Direction de campagne chez Aurora Brands. Lancez une nouvelle boisson à l\u2019échelle nationale — marque, achat média, déploiement en magasin — contre une date de lancement fixe.'
                  },
                  rebrand_rollout: {
                    title: 'Refonte de marque',
                    subtitle: 'Déploiement d\u2019identité corporative',
                    description: 'GP de marque chez Aurora Brands. Déployez la nouvelle identité sur l\u2019emballage, l\u2019affichage, le web et 40 franchises — dix chantiers, une date de dévoilement.'
                  },
                  growthlab_scrum: {
                    title: 'GrowthLab',
                    subtitle: 'Expériences de croissance en Scrum',
                    description: 'Product Owner de l\u2019équipe croissance chez Aurora Brands. Construisez le moteur de croissance une expérience à la fois — les expériences marketing cachent une incertitude brutale.'
                  }
                };
                const scenarioTranslationsEs = {
                  tech_startup: { title: 'Startup tecnológica', subtitle: 'Lanzamiento de producto de software', description: 'Eres gerente de proyectos en Nexus Technologies. Entrega una nueva plataforma SaaS mientras gestionas la dinámica del equipo y los desafíos técnicos.' },
                  live_show: { title: 'Entretenimiento en vivo', subtitle: 'Producción de espectáculo itinerante', description: 'Productor ejecutivo en Stellar Productions. Lanza un ambicioso espectáculo itinerante gestionando talento creativo y requisitos de seguridad.' },
                  construction: { title: 'Construcción', subtitle: 'Proyecto de edificio comercial', description: 'Gerente de proyectos en UrbanCore Construction. Construye un edificio de uso mixto de 12 pisos gestionando permisos, clima y seguridad.' },
                  rd_innovation: { title: 'Innovación I+D', subtitle: 'Desarrollo de nueva tecnología', description: 'Dirige un proyecto de I+D de vanguardia con alta incertidumbre. El prototipado es esencial para revelar problemas temprano.' },
                  momentum_scrum: { title: 'Momentum', subtitle: 'MVP fintech con Scrum', description: 'Eres Product Owner en una startup fintech. Entrega el MVP de pagos más valioso antes de la demo para inversionistas — no puedes construirlo todo.' },
                  dms_dynamics: { title: 'Dealer One', subtitle: 'Implementación del sistema de gestión (DMS)', description: 'Gerente de proyectos de TI en un concesionario de camiones pesados. Reemplaza el viejo sistema de gestión con Microsoft Dynamics 365 en ventas, servicio y repuestos — sin detener el taller.' },
                  cloud_foundation: { title: 'Cloud Shift', subtitle: 'Migración a Microsoft 365', description: 'Lleva el concesionario de la sala de servidores a Microsoft 365 — correo, archivos, Teams e inicio de sesión único — sin perturbar las bahías de servicio, el mostrador de repuestos ni el piso de ventas.' },
                  torque_ai_scrum: { title: 'Torque AI', subtitle: 'IA para repuestos y servicio con Scrum', description: 'Product Owner del equipo de TI del concesionario. Construye un asistente de IA para precios de repuestos, TCO e inteligencia de servicio — las estimaciones de IA son salvajemente inciertas y no puedes construirlo todo.' },
                  fastlane_scrum: { title: 'FastLane', subtitle: 'Portal de clientes con Scrum', description: 'Product Owner del portal de clientes del concesionario: reservas de servicio en línea, seguimiento de reparaciones, herramientas de flota. Entrega el portal más valioso para la fecha de lanzamiento — no puedes construirlo todo.' },
                  apex_biotech: { title: 'Helix Trial', subtitle: 'Ensayo clínico de Fase II', description: 'Líder de programa en BioNova Therapeutics. Dirige un ensayo de Fase II para una terapia novedosa — el reclutamiento de pacientes, los reguladores y la ciencia del ensayo cargan incertidumbre profunda.' },
                  festival_borealis: { title: 'Festival Borealis', subtitle: 'Festival de música de tres días', description: 'Director del festival en Borealis Events. Entrega un festival de música al aire libre de tres días — cabezas de cartel, permisos, proveedores y 40.000 boletos vendidos.' },
                  fitout_chain: { title: 'Remodelación retail', subtitle: 'Programa de renovación de ocho tiendas', description: 'Gerente de programa en UrbanCore Interiors. Renueva ocho tiendas para una cadena nacional — el mismo diseño, ocho edificios distintos, un calendario de reapertura rígido.' },
                  datacenter_exit: { title: 'Exit Velocity', subtitle: 'Migración de datacenter a la nube', description: 'Líder de migración en Meridian Group. Mueve 40 cargas de producción fuera de un datacenter cuyo contrato termina en 14 semanas — las oleadas piloto son tu mejor seguro.' },
                  core_banking: { title: 'Ledger Prime', subtitle: 'Reemplazo del core bancario', description: 'Director de programa en Meridian Trust. Reemplaza la plataforma de core bancario antes de la fecha límite de modernización del regulador — las operaciones en paralelo son tu única red de seguridad.' },
                  regtech_aml: { title: 'CleanSweep', subtitle: 'Programa de cumplimiento AML', description: 'PM de cumplimiento en Meridian Trust. Levanta el nuevo programa de monitoreo antilavado — diez controles, una fecha límite regulatoria inamovible.' },
                  skunkworks_scrum: { title: 'Skunkworks', subtitle: 'Demo de drones con Scrum', description: 'Product Owner de un equipo skunkworks. Construye la demo de dron autónomo más impresionante posible para el showcase de inversionistas — no puedes construirlo todo.' },
                  gamestudio_scrum: { title: 'Pixel Forge', subtitle: 'Vertical slice de videojuego con Scrum', description: 'Product Owner en un estudio indie. Entrega la vertical slice más convincente para el pitch al publisher — primero la diversión, después las funciones, y no puedes construirlo todo.' },
                  sitesync_scrum: { title: 'SiteSync', subtitle: 'App de campo con Scrum', description: 'Product Owner en la unidad tecnológica de una constructora. Entrega la app de campo que las cuadrillas realmente usarán — reportes diarios, listas de pendientes, planos — antes de que arranque el proyecto de la torre insignia.' },
                  devops_scrum: { title: 'Pipeline Zero', subtitle: 'Plataforma de desarrollo con Scrum', description: 'Product Owner del equipo de plataforma. Construye la plataforma interna en la que vivirán 200 ingenieros — el trabajo de plataforma esconde una incertidumbre brutal y no puedes construirlo todo.' },
                  northbridge_dc: { title: 'NorthBridge DC', subtitle: 'Puesta en marcha de centro de distribución', description: 'Gerente de programa en Boreal Logistics. Pon en marcha un nuevo centro de distribución automatizado — WMS, transportadores, estanterías y 120 contrataciones — antes de que entren en vigor los contratos minoristas.' },
                  peak_season: { title: 'Temporada alta', subtitle: 'Programa de preparación navideña', description: 'Líder de preparación de red en Boreal Logistics. Diez frentes de preparación — transportistas, personal temporal, preposicionamiento de inventario — antes de que golpee la ola navideña.' },
                  cleartrack_scrum: { title: 'ClearTrack', subtitle: 'Plataforma de visibilidad con Scrum', description: 'Product Owner en Boreal Logistics. Entrega la plataforma de visibilidad de envíos que los clientes piden — primero track & trace, todo lo demás es un trade-off.' },
                  launch_window: { title: 'Launch Window', subtitle: 'Lanzamiento nacional de producto', description: 'Director de campaña en Aurora Brands. Lanza una nueva bebida a nivel nacional — marca, compra de medios, despliegue en retail — contra una fecha fija. Los mercados de prueba son tus prototipos.' },
                  rebrand_rollout: { title: 'Rebrand', subtitle: 'Despliegue de rebranding corporativo', description: 'PM de marca en Aurora Brands. Despliega la nueva identidad en empaques, señalización, web y 40 franquicias — diez frentes, una fecha de revelación.' },
                  growthlab_scrum: { title: 'GrowthLab', subtitle: 'Experimentos de crecimiento con Scrum', description: 'Product Owner del equipo de crecimiento en Aurora Brands. Construye el motor de crecimiento un experimento a la vez — los experimentos de marketing esconden una incertidumbre brutal y no puedes ejecutarlos todos.' },
                };
                const scenarioTranslationsVi = {
                  tech_startup: { title: 'Startup công nghệ', subtitle: 'Ra mắt sản phẩm phần mềm', description: 'Bạn là quản lý dự án tại Nexus Technologies. Bàn giao nền tảng SaaS mới trong khi quản lý đội nhóm và các thách thức kỹ thuật.' },
                  live_show: { title: 'Giải trí trực tiếp', subtitle: 'Sản xuất show lưu diễn', description: 'Nhà sản xuất điều hành tại Stellar Productions. Ra mắt show lưu diễn tham vọng trong khi quản lý tài năng sáng tạo và yêu cầu an toàn.' },
                  construction: { title: 'Xây dựng', subtitle: 'Dự án tòa nhà thương mại', description: 'Quản lý dự án tại UrbanCore Construction. Xây tòa nhà đa năng 12 tầng trong khi xử lý giấy phép, thời tiết và an toàn.' },
                  rd_innovation: { title: 'Đổi mới R&D', subtitle: 'Phát triển công nghệ mới', description: 'Dẫn dắt dự án R&D tiên phong với độ bất định cao. Nguyên mẫu là thiết yếu để phát hiện sớm vấn đề.' },
                  momentum_scrum: { title: 'Momentum', subtitle: 'MVP fintech theo Scrum', description: 'Bạn là Product Owner tại một startup fintech. Giao MVP thanh toán giá trị nhất trước buổi demo nhà đầu tư — bạn không thể làm hết tất cả.' },
                  dms_dynamics: { title: 'Dealer One', subtitle: 'Triển khai hệ thống quản lý đại lý (DMS)', description: 'Quản lý dự án CNTT tại đại lý xe tải hạng nặng. Thay hệ thống quản lý cũ bằng Microsoft Dynamics 365 cho bán hàng, dịch vụ và phụ tùng — mà không dừng xưởng.' },
                  cloud_foundation: { title: 'Cloud Shift', subtitle: 'Di trú Microsoft 365', description: 'Đưa đại lý từ phòng máy chủ tại chỗ lên Microsoft 365 — email, tệp, Teams và đăng nhập một lần — mà không xáo trộn khoang dịch vụ, quầy phụ tùng hay sàn bán hàng.' },
                  torque_ai_scrum: { title: 'Torque AI', subtitle: 'AI cho phụ tùng & dịch vụ theo Scrum', description: 'Product Owner đội CNTT của đại lý. Xây trợ lý AI cho định giá phụ tùng, TCO và phân tích dịch vụ — ước lượng AI cực kỳ bất định, và bạn không thể làm hết.' },
                  fastlane_scrum: { title: 'FastLane', subtitle: 'Cổng dịch vụ khách hàng theo Scrum', description: 'Product Owner của cổng khách hàng đại lý: đặt lịch dịch vụ trực tuyến, theo dõi sửa chữa, công cụ đội xe. Giao cổng giá trị nhất trước ngày ra mắt — bạn không thể làm hết.' },
                  apex_biotech: { title: 'Helix Trial', subtitle: 'Thử nghiệm lâm sàng Giai đoạn II', description: 'Trưởng chương trình tại BioNova Therapeutics. Điều hành thử nghiệm Giai đoạn II cho liệu pháp mới — tuyển bệnh nhân, cơ quan quản lý và khoa học thử nghiệm đều mang độ bất định sâu.' },
                  festival_borealis: { title: 'Festival Borealis', subtitle: 'Lễ hội âm nhạc ba ngày', description: 'Giám đốc lễ hội tại Borealis Events. Tổ chức lễ hội âm nhạc ngoài trời ba ngày — nghệ sĩ đinh, giấy phép, nhà cung cấp và 40.000 khán giả đã mua vé.' },
                  fitout_chain: { title: 'Cải tạo bán lẻ', subtitle: 'Chương trình cải tạo tám cửa hàng', description: 'Quản lý chương trình tại UrbanCore Interiors. Cải tạo tám cửa hàng cho chuỗi toàn quốc — cùng thiết kế, tám tòa nhà khác nhau, một lịch khai trương cứng.' },
                  datacenter_exit: { title: 'Exit Velocity', subtitle: 'Di trú trung tâm dữ liệu lên đám mây', description: 'Trưởng nhóm di trú tại Meridian Group. Chuyển 40 khối lượng production khỏi trung tâm dữ liệu sắp hết hợp đồng sau 14 tuần — các đợt thí điểm là bảo hiểm tốt nhất.' },
                  core_banking: { title: 'Ledger Prime', subtitle: 'Thay thế ngân hàng lõi', description: 'Giám đốc chương trình tại Meridian Trust. Thay nền tảng ngân hàng lõi trước hạn hiện đại hóa của cơ quan quản lý — chạy song song là lưới an toàn duy nhất.' },
                  regtech_aml: { title: 'CleanSweep', subtitle: 'Chương trình tuân thủ AML', description: 'PM tuân thủ tại Meridian Trust. Dựng chương trình giám sát chống rửa tiền mới — mười cơ chế kiểm soát, một hạn chót không thể dời.' },
                  skunkworks_scrum: { title: 'Skunkworks', subtitle: 'Demo drone theo Scrum', description: 'Product Owner của đội skunkworks. Xây bản demo drone tự hành ấn tượng nhất có thể cho buổi trình diễn nhà đầu tư — bạn không thể làm hết.' },
                  gamestudio_scrum: { title: 'Pixel Forge', subtitle: 'Lát cắt dọc game theo Scrum', description: 'Product Owner tại studio game indie. Giao lát cắt dọc thuyết phục nhất trước buổi pitch nhà phát hành — vui trước, tính năng sau, và bạn không thể làm hết.' },
                  sitesync_scrum: { title: 'SiteSync', subtitle: 'Ứng dụng hiện trường theo Scrum', description: 'Product Owner tại đơn vị công nghệ của công ty xây dựng. Giao ứng dụng hiện trường mà đội thợ thực sự dùng — báo cáo hằng ngày, danh sách tồn đọng, bản vẽ — trước khi dự án tòa tháp chủ lực khởi công.' },
                  devops_scrum: { title: 'Pipeline Zero', subtitle: 'Nền tảng lập trình viên theo Scrum', description: 'Product Owner của đội nền tảng. Xây nền tảng nội bộ nơi 200 kỹ sư sẽ làm việc mỗi ngày — việc xây nền tảng giấu độ bất định khốc liệt, và bạn không thể làm hết.' },
                  northbridge_dc: { title: 'NorthBridge DC', subtitle: 'Vận hành trung tâm phân phối', description: 'Quản lý chương trình tại Boreal Logistics. Đưa trung tâm phân phối tự động mới vào vận hành — WMS, băng chuyền, kệ chứa và 120 nhân sự mới — trước khi hợp đồng bán lẻ có hiệu lực.' },
                  peak_season: { title: 'Mùa cao điểm', subtitle: 'Chương trình sẵn sàng mùa lễ', description: 'Trưởng nhóm sẵn sàng mạng lưới tại Boreal Logistics. Mười luồng chuẩn bị — nhà vận chuyển, nhân sự thời vụ, bố trí trước tồn kho — trước khi sóng lễ hội ập đến.' },
                  cleartrack_scrum: { title: 'ClearTrack', subtitle: 'Nền tảng theo dõi theo Scrum', description: 'Product Owner tại Boreal Logistics. Giao nền tảng theo dõi lô hàng mà khách hàng luôn đòi hỏi — track & trace trước, mọi thứ khác đều phải đánh đổi.' },
                  launch_window: { title: 'Launch Window', subtitle: 'Ra mắt sản phẩm toàn quốc', description: 'Giám đốc chiến dịch tại Aurora Brands. Ra mắt thức uống mới toàn quốc — thương hiệu, truyền thông, triển khai bán lẻ — trước một ngày cố định. Thị trường thử nghiệm là nguyên mẫu của bạn.' },
                  rebrand_rollout: { title: 'Rebrand', subtitle: 'Triển khai tái định vị thương hiệu', description: 'PM thương hiệu tại Aurora Brands. Phủ bộ nhận diện mới lên bao bì, biển hiệu, web và 40 cửa hàng nhượng quyền — mười luồng việc, một ngày công bố.' },
                  growthlab_scrum: { title: 'GrowthLab', subtitle: 'Thử nghiệm tăng trưởng theo Scrum', description: 'Product Owner đội tăng trưởng tại Aurora Brands. Xây cỗ máy tăng trưởng từng thử nghiệm một — thử nghiệm marketing giấu độ bất định khốc liệt, và bạn không thể chạy hết.' },
                };

                const trMap = lang === 'fr' ? scenarioTranslations : lang === 'es' ? scenarioTranslationsEs : lang === 'vi' ? scenarioTranslationsVi : null;
                const tr = trMap ? trMap[scenario.id] : null;
                const title = tr ? tr.title : scenario.title;
                const subtitle = tr ? tr.subtitle : scenario.subtitle;
                const description = tr ? tr.description : scenario.description;
                const DIFF_LABELS = {
                  Standard: { en: 'Standard', fr: 'Standard', es: 'Estándar', vi: 'Tiêu chuẩn' },
                  Advanced: { en: 'Advanced', fr: 'Avancé', es: 'Avanzado', vi: 'Nâng cao' },
                  Expert: { en: 'Expert', fr: 'Expert', es: 'Experto', vi: 'Chuyên gia' }
                };
                const difficulty = DIFF_LABELS[scenario.difficulty] ? L(lang, DIFF_LABELS[scenario.difficulty]) : scenario.difficulty;
                
                return (
                  <div key={scenario.id} className="industry-card">
                    {/* Gradient Header */}
                    <div className="industry-card-header" style={{ background: `linear-gradient(135deg, ${colors.from} 0%, ${colors.to} 100%)` }}>
                      <span className="industry-icon">{scenario.icon}</span>
                    </div>
                    
                    {/* Card Body */}
                    <div className="industry-card-body">
                      <h3 style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>{title} <MethodologyBadge scenario={scenario} lang={lang} /></h3>
                      <p className="industry-subtitle" style={{ color: colors.from }}>{subtitle}</p>
                      
                      <div className="industry-challenge">
                        <span className="challenge-label">{L(lang, { en: 'Challenge:', fr: 'Défi:', es: 'Desafío:', vi: 'Thử thách:' })}</span>
                        <p>{description}</p>
                      </div>
                      
                      {/* Meta Info */}
                      <div className="industry-meta">
                        <span>📅 {scenario.initial.weeks} {L(lang, { en: 'weeks', fr: 'semaines', es: 'semanas', vi: 'tuần' })}</span>
                        <span>💰 ${(scenario.initial.budget / 1000000).toFixed(1)}M</span>
                      </div>
                      <div className="industry-meta">
                        <span>👥 {scenario.initial.teamSize} {L(lang, { en: 'team members', fr: 'membres', es: 'miembros del equipo', vi: 'thành viên nhóm' })}</span>
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
                        {L(lang, { en: 'Start Simulation →', fr: 'Démarrer →', es: 'Iniciar simulación →', vi: 'Bắt đầu mô phỏng →' })}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            </div>
              );
            })}

            {/* Bottom Info */}
            <div className="sim-select-footer">
              <p>🎓 {L(lang, { en: 'All scenarios are PMP/PMBOK aligned for certification preparation', fr: 'Tous les scénarios sont alignés PMP/PMBOK pour la préparation à la certification', es: 'Todos los escenarios están alineados con PMP/PMBOK para preparar la certificación', vi: 'Tất cả kịch bản đều theo chuẩn PMP/PMBOK để luyện thi chứng chỉ' })}</p>
              
              <div className="sim-stats-bar">
                <div className="sim-stat">
                  <span className="sim-stat-num">25</span>
                  <span className="sim-stat-label">{L(lang, { en: 'Scenarios', fr: 'Scénarios', es: 'Escenarios', vi: 'Kịch bản' })}</span>
                </div>
                <div className="sim-stat">
                  <span className="sim-stat-num">1000+</span>
                  <span className="sim-stat-label">{L(lang, { en: 'PMs Trained', fr: 'PMs formés', es: 'PMs formados', vi: 'PM đã đào tạo' })}</span>
                </div>
                <div className="sim-stat">
                  <span className="sim-stat-num purple">PMP</span>
                  <span className="sim-stat-label">{L(lang, { en: 'Aligned', fr: 'Aligné', es: 'Alineado', vi: 'Theo chuẩn' })}</span>
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
            context: L(lang, { en: `You are a senior project manager at ${selectedScenario.company}, a fast-growing technology company specializing in cloud-based business solutions. The company has identified a significant market opportunity for a new SaaS platform that will compete with established players.`, fr: `Vous êtes gestionnaire de projet senior chez ${selectedScenario.company}, une entreprise technologique en forte croissance spécialisée dans les solutions d'affaires infonuagiques. L'entreprise a identifié une occasion de marché importante pour une nouvelle plateforme SaaS qui rivalisera avec les acteurs établis.`, es: `Eres gerente de proyectos senior en ${selectedScenario.company}, una empresa tecnológica de rápido crecimiento especializada en soluciones de negocio en la nube. La empresa identificó una oportunidad de mercado significativa para una nueva plataforma SaaS que competirá con jugadores establecidos.`, vi: `Bạn là quản lý dự án cấp cao tại ${selectedScenario.company}, một công ty công nghệ tăng trưởng nhanh chuyên về giải pháp kinh doanh trên đám mây. Công ty đã xác định một cơ hội thị trường lớn cho nền tảng SaaS mới sẽ cạnh tranh với các tay chơi lâu đời.` }),
            challenge: L(lang, { en: `Your CEO has tasked you with assembling and leading a product development team to deliver this platform. Market analysis suggests that competitors are working on similar solutions, putting pressure on you and your team to deliver a high-quality product that can capture market share.`, fr: `Votre PDG vous a confié la constitution et la direction d'une équipe de développement produit pour livrer cette plateforme. L'analyse de marché suggère que des concurrents travaillent sur des solutions similaires, ce qui met la pression sur vous et votre équipe pour livrer un produit de haute qualité capable de conquérir des parts de marché.`, es: `Tu CEO te encargó armar y liderar un equipo de desarrollo de producto para entregar esta plataforma. El análisis de mercado sugiere que los competidores trabajan en soluciones similares, lo que presiona a tu equipo a entregar un producto de alta calidad capaz de capturar cuota de mercado.`, vi: `CEO giao cho bạn lập và dẫn dắt đội phát triển sản phẩm để giao nền tảng này. Phân tích thị trường cho thấy đối thủ đang làm các giải pháp tương tự, tạo áp lực buộc đội bạn giao sản phẩm chất lượng cao có thể chiếm thị phần.` }),
            deliverables: [
              { level: 1, name: L(lang, { en: 'Core Platform', fr: 'Plateforme de base', es: 'Plataforma central', vi: 'Nền tảng lõi' }), desc: L(lang, { en: 'Basic user management, authentication, and data storage', fr: 'Gestion des utilisateurs, authentification et stockage de données', es: 'Gestión básica de usuarios, autenticación y almacenamiento de datos', vi: 'Quản lý người dùng cơ bản, xác thực và lưu trữ dữ liệu' }), tasks: 3 },
              { level: 2, name: L(lang, { en: 'Standard Features', fr: 'Fonctionnalités standard', es: 'Funciones estándar', vi: 'Tính năng tiêu chuẩn' }), desc: L(lang, { en: 'Dashboard, reporting, and API integrations', fr: 'Tableau de bord, rapports et intégrations API', es: 'Dashboard, reportes e integraciones de API', vi: 'Bảng điều khiển, báo cáo và tích hợp API' }), tasks: 4 },
              { level: 3, name: L(lang, { en: 'Advanced Features', fr: 'Fonctionnalités avancées', es: 'Funciones avanzadas', vi: 'Tính năng nâng cao' }), desc: L(lang, { en: 'Analytics, automation, and multi-tenant support', fr: 'Analytique, automatisation et support multi-locataire', es: 'Analíticas, automatización y soporte multi-tenant', vi: 'Phân tích, tự động hóa và hỗ trợ đa khách thuê' }), tasks: 3 },
              { level: 4, name: L(lang, { en: 'Premium Features', fr: 'Fonctionnalités premium', es: 'Funciones premium', vi: 'Tính năng cao cấp' }), desc: L(lang, { en: 'AI-powered insights and enterprise security', fr: 'Analyses par IA et sécurité entreprise', es: 'Insights con IA y seguridad empresarial', vi: 'Phân tích bằng AI và bảo mật doanh nghiệp' }), tasks: 2 }
            ]
          },
          live_show: {
            context: L(lang, { en: `You are the Executive Producer at ${selectedScenario.company}, a world-renowned live entertainment company. The company has greenlit an ambitious new touring show that combines acrobatics, music, and cutting-edge technology.`, fr: `Vous êtes producteur exécutif chez ${selectedScenario.company}, une entreprise de divertissement de renommée mondiale. L'entreprise a donné le feu vert à un nouveau spectacle de tournée ambitieux combinant acrobaties, musique et technologie de pointe.`, es: `Eres el productor ejecutivo en ${selectedScenario.company}, una compañía de entretenimiento en vivo de renombre mundial. La compañía dio luz verde a un ambicioso nuevo espectáculo itinerante que combina acrobacias, música y tecnología de punta.`, vi: `Bạn là nhà sản xuất điều hành tại ${selectedScenario.company}, một công ty giải trí trực tiếp danh tiếng toàn cầu. Công ty đã bật đèn xanh cho một show lưu diễn mới đầy tham vọng kết hợp nhào lộn, âm nhạc và công nghệ tiên tiến.` }),
            challenge: L(lang, { en: `Your artistic director has a bold vision for "${selectedScenario.projectName}" but the technical and creative demands are significant. You must manage a diverse team of performers, technicians, and designers while ensuring safety standards are met and the show is ready for its premiere.`, fr: `Votre directeur artistique a une vision audacieuse pour « ${selectedScenario.projectName} », mais les exigences techniques et créatives sont considérables. Vous devez gérer une équipe diversifiée d'artistes, de techniciens et de concepteurs tout en respectant les normes de sécurité et en préparant le spectacle pour sa première.`, es: `Tu director artístico tiene una visión audaz para "${selectedScenario.projectName}", pero las exigencias técnicas y creativas son significativas. Debes gestionar un equipo diverso de artistas, técnicos y diseñadores garantizando las normas de seguridad y que el show esté listo para su estreno.`, vi: `Giám đốc nghệ thuật có tầm nhìn táo bạo cho "${selectedScenario.projectName}", nhưng yêu cầu kỹ thuật và sáng tạo rất lớn. Bạn phải quản lý đội ngũ đa dạng gồm nghệ sĩ, kỹ thuật viên và nhà thiết kế, vừa bảo đảm chuẩn an toàn vừa kịp cho đêm công diễn đầu tiên.` }),
            deliverables: [
              { level: 1, name: L(lang, { en: 'Foundation Acts', fr: 'Numéros de base', es: 'Actos de base', vi: 'Tiết mục nền' }), desc: L(lang, { en: 'Opening sequence and core ensemble performances', fr: 'Séquence d\'ouverture et numéros d\'ensemble', es: 'Secuencia de apertura y números del ensamble central', vi: 'Màn mở đầu và các tiết mục tập thể chủ chốt' }), tasks: 2 },
              { level: 2, name: L(lang, { en: 'Feature Acts', fr: 'Numéros vedettes', es: 'Actos estelares', vi: 'Tiết mục đinh' }), desc: L(lang, { en: 'Aerial sequences and specialty performances', fr: 'Séquences aériennes et numéros de spécialité', es: 'Secuencias aéreas y números de especialidad', vi: 'Màn trên không và tiết mục đặc biệt' }), tasks: 2 },
              { level: 3, name: L(lang, { en: 'Technical Integration', fr: 'Intégration technique', es: 'Integración técnica', vi: 'Tích hợp kỹ thuật' }), desc: L(lang, { en: 'Lighting, sound, and projection mapping', fr: 'Éclairage, son et projection vidéo', es: 'Iluminación, sonido y video mapping', vi: 'Ánh sáng, âm thanh và trình chiếu mapping' }), tasks: 2 },
              { level: 4, name: L(lang, { en: 'Grand Finale', fr: 'Grand finale', es: 'Gran final', vi: 'Màn kết hoành tráng' }), desc: L(lang, { en: 'Climactic sequence with full cast integration', fr: 'Séquence culminante avec toute la distribution', es: 'Secuencia culminante con todo el elenco', vi: 'Trường đoạn cao trào với toàn bộ dàn diễn viên' }), tasks: 2 }
            ]
          },
          construction: {
            context: L(lang, { en: `You are the Project Manager at ${selectedScenario.company}, a commercial construction company with a strong reputation for quality. The company has won the contract to build a new mixed-use development in a prime urban location.`, fr: `Vous êtes gestionnaire de projet chez ${selectedScenario.company}, une entreprise de construction commerciale réputée pour sa qualité. L'entreprise a remporté le contrat pour construire un nouveau développement à usage mixte dans un emplacement urbain de choix.`, es: `Eres el gerente de proyectos en ${selectedScenario.company}, una constructora comercial con sólida reputación de calidad. La empresa ganó el contrato para construir un nuevo desarrollo de uso mixto en una ubicación urbana privilegiada.`, vi: `Bạn là quản lý dự án tại ${selectedScenario.company}, một công ty xây dựng thương mại có tiếng về chất lượng. Công ty vừa thắng hợp đồng xây khu phức hợp đa năng mới ở vị trí đô thị đắc địa.` }),
            challenge: L(lang, { en: `The "${selectedScenario.projectName}" project involves a 12-story building with retail, office, and residential spaces. You must navigate permitting, weather challenges, subcontractor coordination, and safety requirements while meeting stakeholder expectations.`, fr: `Le projet « ${selectedScenario.projectName} » comprend un bâtiment de 12 étages avec commerces, bureaux et logements. Vous devez composer avec les permis, la météo, la coordination des sous-traitants et les exigences de sécurité tout en répondant aux attentes des parties prenantes.`, es: `El proyecto "${selectedScenario.projectName}" implica un edificio de 12 pisos con espacios comerciales, de oficina y residenciales. Debes navegar permisos, desafíos climáticos, coordinación de subcontratistas y requisitos de seguridad cumpliendo las expectativas de los interesados.`, vi: `Dự án "${selectedScenario.projectName}" gồm tòa nhà 12 tầng với không gian bán lẻ, văn phòng và nhà ở. Bạn phải xoay xở giấy phép, thời tiết, điều phối nhà thầu phụ và yêu cầu an toàn trong khi đáp ứng kỳ vọng các bên liên quan.` }),
            deliverables: [
              { level: 1, name: L(lang, { en: 'Foundation & Parking', fr: 'Fondations et stationnement', es: 'Cimientos y estacionamiento', vi: 'Móng & bãi đỗ xe' }), desc: L(lang, { en: 'Underground parking and structural foundation', fr: 'Stationnement souterrain et fondations structurales', es: 'Estacionamiento subterráneo y cimentación estructural', vi: 'Bãi đỗ ngầm và móng kết cấu' }), tasks: 3 },
              { level: 2, name: L(lang, { en: 'Core Structure', fr: 'Structure principale', es: 'Estructura central', vi: 'Kết cấu chính' }), desc: L(lang, { en: 'Floors 1-6 with retail and office space', fr: 'Étages 1-6 avec commerces et bureaux', es: 'Pisos 1-6 con espacio comercial y de oficinas', vi: 'Tầng 1-6 với mặt bằng bán lẻ và văn phòng' }), tasks: 4 },
              { level: 3, name: L(lang, { en: 'Upper Floors', fr: 'Étages supérieurs', es: 'Pisos superiores', vi: 'Các tầng trên' }), desc: L(lang, { en: 'Floors 7-10 residential units', fr: 'Étages 7-10, unités résidentielles', es: 'Pisos 7-10, unidades residenciales', vi: 'Tầng 7-10, căn hộ ở' }), tasks: 3 },
              { level: 4, name: L(lang, { en: 'Penthouse & Systems', fr: 'Penthouse et systèmes', es: 'Penthouse y sistemas', vi: 'Penthouse & hệ thống' }), desc: L(lang, { en: 'Floors 11-12 and building systems integration', fr: 'Étages 11-12 et intégration des systèmes du bâtiment', es: 'Pisos 11-12 e integración de sistemas del edificio', vi: 'Tầng 11-12 và tích hợp hệ thống tòa nhà' }), tasks: 2 }
            ]
          },
          rd_innovation: {
            context: L(lang, { en: `You are the Lead Project Manager at ${selectedScenario.company}, a cutting-edge research and development laboratory. The company has secured funding to develop a breakthrough quantum sensing technology with applications in medical imaging and security.`, fr: `Vous êtes gestionnaire de projet principal chez ${selectedScenario.company}, un laboratoire de recherche et développement de pointe. L'entreprise a obtenu du financement pour développer une technologie révolutionnaire de détection quantique avec des applications en imagerie médicale et en sécurité.`, es: `Eres el gerente de proyectos líder en ${selectedScenario.company}, un laboratorio de investigación y desarrollo de vanguardia. La empresa aseguró financiamiento para desarrollar una tecnología revolucionaria de detección cuántica con aplicaciones en imagen médica y seguridad.`, vi: `Bạn là quản lý dự án chính tại ${selectedScenario.company}, một phòng thí nghiệm nghiên cứu và phát triển tiên tiến. Công ty đã có nguồn vốn để phát triển công nghệ cảm biến lượng tử đột phá với ứng dụng trong chẩn đoán hình ảnh y tế và an ninh.` }),
            challenge: L(lang, { en: `The "${selectedScenario.projectName}" project is highly innovative with significant technical uncertainty. Your team of scientists and engineers must push the boundaries of current technology while managing the risks inherent in R&D work. Prototyping will be essential to surface problems early.`, fr: `Le projet « ${selectedScenario.projectName} » est hautement innovant avec une incertitude technique importante. Votre équipe de scientifiques et d'ingénieurs doit repousser les limites de la technologie actuelle tout en gérant les risques inhérents à la R-D. Le prototypage sera essentiel pour révéler les problèmes tôt.`, es: `El proyecto "${selectedScenario.projectName}" es altamente innovador con una incertidumbre técnica significativa. Tu equipo de científicos e ingenieros debe empujar los límites de la tecnología actual gestionando los riesgos inherentes al trabajo de I+D. El prototipado será esencial para revelar problemas temprano.`, vi: `Dự án "${selectedScenario.projectName}" mang tính đổi mới cao với độ bất định kỹ thuật lớn. Đội ngũ nhà khoa học và kỹ sư của bạn phải đẩy xa giới hạn công nghệ hiện tại trong khi quản lý rủi ro cố hữu của R&D. Nguyên mẫu sẽ là thiết yếu để phát hiện sớm vấn đề.` }),
            deliverables: [
              { level: 1, name: L(lang, { en: 'Proof of Concept', fr: 'Preuve de concept', es: 'Prueba de concepto', vi: 'Chứng minh khái niệm' }), desc: L(lang, { en: 'Demonstrate basic quantum sensing capability', fr: 'Démontrer la capacité de détection quantique de base', es: 'Demostrar capacidad básica de detección cuántica', vi: 'Chứng minh năng lực cảm biến lượng tử cơ bản' }), tasks: 2 },
              { level: 2, name: L(lang, { en: 'Prototype Alpha', fr: 'Prototype alpha', es: 'Prototipo alfa', vi: 'Nguyên mẫu Alpha' }), desc: L(lang, { en: 'Functional prototype with core features', fr: 'Prototype fonctionnel avec fonctions de base', es: 'Prototipo funcional con funciones centrales', vi: 'Nguyên mẫu hoạt động với tính năng lõi' }), tasks: 3 },
              { level: 3, name: L(lang, { en: 'Prototype Beta', fr: 'Prototype bêta', es: 'Prototipo beta', vi: 'Nguyên mẫu Beta' }), desc: L(lang, { en: 'Refined prototype with improved accuracy', fr: 'Prototype raffiné avec précision améliorée', es: 'Prototipo refinado con precisión mejorada', vi: 'Nguyên mẫu tinh chỉnh với độ chính xác cao hơn' }), tasks: 3 },
              { level: 4, name: L(lang, { en: 'Production Ready', fr: 'Prêt pour production', es: 'Listo para producción', vi: 'Sẵn sàng sản xuất' }), desc: L(lang, { en: 'Manufacturable design with documentation', fr: 'Conception industrialisable avec documentation', es: 'Diseño manufacturable con documentación', vi: 'Thiết kế sản xuất được kèm tài liệu' }), tasks: 2 }
            ]
          }
          ,
          momentum_scrum: {
            context: L(lang, { en: `You are the Product Owner at ${selectedScenario.company}, a fintech startup racing toward a fixed investor demo date. The engineering team is strong and the product backlog is rich — far richer than six sprints can deliver.`, fr: `Vous êtes Product Owner chez ${selectedScenario.company}, une startup fintech qui court vers une date de démo investisseurs fixe. L'équipe d'ingénierie est solide et le backlog produit est riche — bien plus riche que ce que six sprints peuvent livrer.`, es: `Eres el Product Owner en ${selectedScenario.company}, una startup fintech que corre hacia una fecha fija de demo para inversionistas. El equipo de ingeniería es fuerte y el backlog de producto es rico — mucho más rico de lo que seis sprints pueden entregar.`, vi: `Bạn là Product Owner tại ${selectedScenario.company}, một startup fintech đang chạy đua tới ngày demo cố định cho nhà đầu tư. Đội kỹ sư mạnh và backlog sản phẩm rất phong phú — phong phú hơn nhiều so với những gì sáu sprint có thể giao.` }),
            challenge: L(lang, { en: `Your job is not to finish everything — it is to ship the most valuable working product by the demo. Plan each sprint against your OBSERVED velocity, welcome changing requirements mid-project, protect a sustainable pace, and decide ruthlessly what NOT to build. Success is measured in delivered business value, not completed feature count.`, fr: `Votre travail n'est pas de tout terminer — c'est de livrer le produit fonctionnel le plus précieux avant la démo. Planifiez chaque sprint selon votre vélocité OBSERVÉE, accueillez les changements d'exigences en cours de projet, protégez un rythme soutenable, et décidez sans pitié ce qu'il ne faut PAS construire. Le succès se mesure en valeur d'affaires livrée, pas en nombre de fonctionnalités.`, es: `Tu trabajo no es terminarlo todo — es entregar el producto funcional más valioso para la demo. Planifica cada sprint según tu velocidad OBSERVADA, acoge los cambios de requisitos a mitad de proyecto, protege un ritmo sostenible y decide sin piedad qué NO construir. El éxito se mide en valor de negocio entregado, no en cantidad de funciones completadas.`, vi: `Việc của bạn không phải là hoàn thành tất cả — mà là giao sản phẩm chạy được giá trị nhất trước buổi demo. Lập kế hoạch mỗi sprint theo velocity QUAN SÁT ĐƯỢC, đón nhận thay đổi yêu cầu giữa dự án, giữ nhịp độ bền vững, và quyết đoán chọn thứ KHÔNG làm. Thành công đo bằng giá trị kinh doanh đã giao, không phải số tính năng hoàn thành.` }),
            deliverables: [
              { level: 1, name: L(lang, { en: 'Regulatory Must-haves', fr: 'Indispensables réglementaires', es: 'Imprescindibles regulatorios', vi: 'Bắt buộc theo quy định' }), desc: L(lang, { en: 'Core payment ledger and KYC onboarding — the MVP cannot ship without them', fr: 'Registre de paiements et parcours KYC — le MVP ne peut pas être livré sans eux', es: 'Registro de pagos y onboarding KYC — el MVP no puede salir sin ellos', vi: 'Sổ cái thanh toán và định danh KYC — MVP không thể ra mắt nếu thiếu' }), tasks: 2 },
              { level: 2, name: L(lang, { en: 'High-value Differentiators', fr: 'Différenciateurs à haute valeur', es: 'Diferenciadores de alto valor', vi: 'Điểm khác biệt giá trị cao' }), desc: L(lang, { en: 'Fraud checks, recurring billing, payment notifications', fr: 'Antifraude, facturation récurrente, notifications de paiement', es: 'Controles antifraude, facturación recurrente, notificaciones de pago', vi: 'Kiểm tra gian lận, thanh toán định kỳ, thông báo giao dịch' }), tasks: 3 },
              { level: 3, name: L(lang, { en: 'Investor-visible Extras', fr: 'Extras visibles pour les investisseurs', es: 'Extras visibles para inversionistas', vi: 'Phần phụ gây ấn tượng nhà đầu tư' }), desc: L(lang, { en: 'Multi-currency, SSO, merchant reporting', fr: 'Multidevises, SSO, rapports marchands', es: 'Multimoneda, SSO, reportes para comercios', vi: 'Đa tiền tệ, SSO, báo cáo cho đối tác bán hàng' }), tasks: 3 },
              { level: 4, name: L(lang, { en: 'Nice-to-haves (gold-plating traps)', fr: 'Optionnels (pièges de sur-qualité)', es: 'Opcionales (trampas de sobre-ingeniería)', vi: 'Có thì tốt (bẫy mạ vàng)' }), desc: L(lang, { en: 'Admin dashboard, API docs, developer sandbox, dark mode — low value; most should be cut', fr: 'Tableau de bord admin, docs API, bac à sable, mode sombre — faible valeur; la plupart devraient être coupés', es: 'Panel de administración, docs de API, sandbox para desarrolladores, modo oscuro — poco valor; la mayoría debería recortarse', vi: 'Bảng quản trị, tài liệu API, sandbox lập trình, chế độ tối — giá trị thấp; nên cắt phần lớn' }), tasks: 6 }
            ]
          }
          ,
          dms_dynamics: {
            context: L(lang, { en: `You are the IT Project Manager at ${selectedScenario.company}, a heavy-truck dealership: new and used truck sales, service and repair bays, a busy parts counter, and demanding fleet clients. The 20-year-old dealer management system is end-of-life, and the business has committed to Microsoft Dynamics 365.`, fr: `Vous êtes gestionnaire de projet TI chez ${selectedScenario.company}, un concessionnaire de camions lourds : ventes de camions neufs et usagés, baies de service et de réparation, un comptoir de pièces achalandé et des clients de flotte exigeants. Le système de gestion vieux de 20 ans est en fin de vie, et l\u2019entreprise a choisi Microsoft Dynamics 365.`, es: `Eres el gerente de proyectos de TI en ${selectedScenario.company}, un concesionario de camiones pesados: venta de camiones nuevos y usados, bahías de servicio y reparación, un mostrador de repuestos muy activo y clientes de flota exigentes. El sistema de gestión del concesionario, con 20 años de antigüedad, llegó al fin de su vida útil, y la empresa se comprometió con Microsoft Dynamics 365.`, vi: `Bạn là quản lý dự án CNTT tại ${selectedScenario.company}, một đại lý xe tải hạng nặng: bán xe mới và cũ, các khoang dịch vụ sửa chữa, quầy phụ tùng bận rộn và khách hàng đội xe khó tính. Hệ thống quản lý đại lý 20 năm tuổi đã hết vòng đời, và doanh nghiệp đã quyết định chuyển sang Microsoft Dynamics 365.` }),
            challenge: L(lang, { en: `Replace the system the whole dealership runs on — without stopping the shop. Twelve modules across sales, service, parts and finance; dirty legacy data; veteran staff who liked the old screens; an external integrator you don\u2019t control. Sandbox pilots (prototypes) are your best defence against surprises.`, fr: `Remplacez le système sur lequel tourne tout le concessionnaire — sans arrêter l\u2019atelier. Douze modules couvrant ventes, service, pièces et finance; des données héritées sales; des employés d\u2019expérience attachés aux anciens écrans; un intégrateur externe que vous ne contrôlez pas. Les pilotes en environnement d\u2019essai (prototypes) sont votre meilleure défense contre les surprises.`, es: `Reemplaza el sistema del que depende todo el concesionario — sin detener el taller. Doce módulos entre ventas, servicio, repuestos y finanzas; datos heredados sucios; personal veterano apegado a las pantallas antiguas; un integrador externo que no controlas. Los pilotos en sandbox (prototipos) son tu mejor defensa contra las sorpresas.`, vi: `Thay thế hệ thống mà cả đại lý vận hành trên đó — mà không dừng xưởng. Mười hai phân hệ trải khắp bán hàng, dịch vụ, phụ tùng và tài chính; dữ liệu cũ bẩn; nhân viên kỳ cựu quen màn hình cũ; một nhà tích hợp bên ngoài bạn không kiểm soát được. Thí điểm sandbox (nguyên mẫu) là lá chắn tốt nhất trước các bất ngờ.` }),
            deliverables: [
              { level: 1, name: L(lang, { en: 'Core Platform & Data', fr: 'Plateforme et données', es: 'Plataforma y datos', vi: 'Nền tảng & dữ liệu lõi' }), desc: L(lang, { en: 'Environment setup, identity, legacy data migration', fr: 'Environnements, identité, migration des données héritées', es: 'Configuración de entornos, identidad, migración de datos heredados', vi: 'Dựng môi trường, định danh, di trú dữ liệu cũ' }), tasks: 3 },
              { level: 2, name: L(lang, { en: 'Sales & CRM', fr: 'Ventes et CRM', es: 'Ventas y CRM', vi: 'Bán hàng & CRM' }), desc: L(lang, { en: 'Truck inventory, quotes, CRM for new & used sales', fr: 'Inventaire de camions, soumissions, CRM ventes neuf et usagé', es: 'Inventario de camiones, cotizaciones, CRM para ventas nuevas y usadas', vi: 'Tồn kho xe tải, báo giá, CRM bán xe mới và cũ' }), tasks: 3 },
              { level: 3, name: L(lang, { en: 'Service & Parts', fr: 'Service et pièces', es: 'Servicio y repuestos', vi: 'Dịch vụ & phụ tùng' }), desc: L(lang, { en: 'Work orders, bay scheduling, parts counter and inventory', fr: 'Bons de travail, horaire des baies, comptoir et inventaire de pièces', es: 'Órdenes de trabajo, agenda de bahías, mostrador e inventario de repuestos', vi: 'Lệnh sửa chữa, lịch khoang xưởng, quầy và tồn kho phụ tùng' }), tasks: 4 },
              { level: 4, name: L(lang, { en: 'Finance & Reporting', fr: 'Finance et rapports', es: 'Finanzas y reportes', vi: 'Tài chính & báo cáo' }), desc: L(lang, { en: 'Warranty claims, invoicing, management dashboards', fr: 'Réclamations de garantie, facturation, tableaux de bord de gestion', es: 'Reclamos de garantía, facturación, tableros de gestión', vi: 'Yêu cầu bảo hành, hóa đơn, bảng điều hành quản trị' }), tasks: 2 }
            ]
          },
          cloud_foundation: {
            context: L(lang, { en: `You are the IT lead at ${selectedScenario.company}. Everything — mail, files, phone directory, shared drives — lives in an aging on-prem server room behind the parts counter. Leadership wants the dealership on Microsoft 365 with single sign-on before the server warranty lapses.`, fr: `Vous êtes le responsable TI chez ${selectedScenario.company}. Tout — courriel, fichiers, bottin, lecteurs partagés — vit dans une salle de serveurs vieillissante derrière le comptoir de pièces. La direction veut faire passer le concessionnaire à Microsoft 365 avec authentification unique avant l\u2019échéance de la garantie des serveurs.`, es: `Eres el líder de TI en ${selectedScenario.company}. Todo — correo, archivos, directorio telefónico, unidades compartidas — vive en una sala de servidores envejecida detrás del mostrador de repuestos. La dirección quiere el concesionario en Microsoft 365 con inicio de sesión único antes de que venza la garantía de los servidores.`, vi: `Bạn là trưởng CNTT tại ${selectedScenario.company}. Mọi thứ — email, tệp, danh bạ, ổ đĩa chung — nằm trong phòng máy chủ già cỗi sau quầy phụ tùng. Ban lãnh đạo muốn đại lý chuyển lên Microsoft 365 với đăng nhập một lần trước khi bảo hành máy chủ hết hạn.` }),
            challenge: L(lang, { en: `Ten workstreams: mailboxes, files, Teams telephony, identity and MFA, device management, and training for people who fix trucks for a living, not computers. The shop floor cannot lose its diagnostic tools for even an afternoon. A clean, boring cutover is a successful one.`, fr: `Dix chantiers : boîtes courriel, fichiers, téléphonie Teams, identité et MFA, gestion des appareils, et formation pour des gens qui réparent des camions, pas des ordinateurs. L\u2019atelier ne peut pas perdre ses outils de diagnostic même une après-midi. Une bascule propre et sans histoire est une bascule réussie.`, es: `Diez frentes de trabajo: buzones, archivos, telefonía en Teams, identidad y MFA, gestión de dispositivos y capacitación para gente que repara camiones, no computadoras. El taller no puede perder sus herramientas de diagnóstico ni una tarde. Una migración limpia y aburrida es una migración exitosa.`, vi: `Mười luồng công việc: hộp thư, tệp, điện thoại Teams, định danh và MFA, quản lý thiết bị, và đào tạo cho những người sửa xe tải chứ không phải máy tính. Xưởng không thể mất công cụ chẩn đoán dù chỉ một buổi chiều. Một cuộc chuyển đổi sạch sẽ, êm ả chính là thành công.` }),
            deliverables: [
              { level: 1, name: L(lang, { en: 'Identity & Security', fr: 'Identité et sécurité', es: 'Identidad y seguridad', vi: 'Định danh & bảo mật' }), desc: L(lang, { en: 'Single sign-on, MFA, conditional access', fr: 'Authentification unique, MFA, accès conditionnel', es: 'Inicio de sesión único, MFA, acceso condicional', vi: 'Đăng nhập một lần, MFA, truy cập có điều kiện' }), tasks: 3 },
              { level: 2, name: L(lang, { en: 'Mail & Calendar', fr: 'Courriel et calendrier', es: 'Correo y calendario', vi: 'Thư & lịch' }), desc: L(lang, { en: 'Mailbox migration in batches, shared calendars', fr: 'Migration des boîtes par lots, calendriers partagés', es: 'Migración de buzones por lotes, calendarios compartidos', vi: 'Di trú hộp thư theo lô, lịch dùng chung' }), tasks: 2 },
              { level: 3, name: L(lang, { en: 'Files & Collaboration', fr: 'Fichiers et collaboration', es: 'Archivos y colaboración', vi: 'Tệp & cộng tác' }), desc: L(lang, { en: 'Shared drives to SharePoint/OneDrive, Teams rollout', fr: 'Lecteurs partagés vers SharePoint/OneDrive, déploiement de Teams', es: 'Unidades compartidas a SharePoint/OneDrive, despliegue de Teams', vi: 'Chuyển ổ đĩa chung sang SharePoint/OneDrive, triển khai Teams' }), tasks: 3 },
              { level: 4, name: L(lang, { en: 'Devices & Training', fr: 'Appareils et formation', es: 'Dispositivos y capacitación', vi: 'Thiết bị & đào tạo' }), desc: L(lang, { en: 'Shop devices, bay network, staff training', fr: 'Appareils d\u2019atelier, réseau des baies, formation du personnel', es: 'Dispositivos del taller, red de bahías, capacitación del personal', vi: 'Thiết bị xưởng, mạng khoang xưởng, đào tạo nhân viên' }), tasks: 2 }
            ]
          },
          torque_ai_scrum: {
            context: L(lang, { en: `You are the Product Owner of the internal IT squad at ${selectedScenario.company}, a heavy-truck dealership. Administration wants "AI in the business" — parts pricing, truck TCO, service intelligence — and the backlog of ideas is far bigger than six sprints can deliver.`, fr: `Vous êtes Product Owner de l\u2019équipe TI interne chez ${selectedScenario.company}, un concessionnaire de camions lourds. L\u2019administration veut « de l\u2019IA dans l\u2019entreprise » — prix des pièces, TCO des camions, intelligence service — et le carnet d\u2019idées dépasse largement ce que six sprints peuvent livrer.`, es: `Eres el Product Owner del equipo interno de TI en ${selectedScenario.company}, un concesionario de camiones pesados. La administración quiere "IA en el negocio" — precios de repuestos, TCO de camiones, inteligencia de servicio — y el backlog de ideas es mucho más grande de lo que seis sprints pueden entregar.`, vi: `Bạn là Product Owner của đội CNTT nội bộ tại ${selectedScenario.company}, một đại lý xe tải hạng nặng. Ban điều hành muốn "AI trong kinh doanh" — định giá phụ tùng, TCO xe tải, phân tích dịch vụ — và backlog ý tưởng lớn hơn nhiều so với những gì sáu sprint có thể giao.` }),
            challenge: L(lang, { en: `AI work is the ultimate cone of uncertainty: a pricing model can take one sprint or three. Commit to observed velocity, refine your riskiest estimates before committing, protect your Definition of Done — a wrong price recommendation in production destroys trust — and be ready when administration pivots the priorities mid-project. They will.`, fr: `Le travail en IA est le cône d\u2019incertitude ultime : un modèle de prix peut prendre un sprint comme trois. Engagez-vous sur la vélocité observée, raffinez vos estimations les plus risquées avant de vous engager, protégez votre définition de terminé — une mauvaise recommandation de prix en production détruit la confiance — et soyez prêt quand l\u2019administration pivotera les priorités en cours de projet. Elle le fera.`, es: `El trabajo con IA es el cono de incertidumbre definitivo: un modelo de precios puede tomar un sprint o tres. Comprométete según la velocidad observada, refina tus estimaciones más riesgosas antes de comprometerte, protege tu Definition of Done — una recomendación de precio errónea en producción destruye la confianza — y prepárate para cuando la administración pivotee las prioridades a mitad de proyecto. Lo hará.`, vi: `Việc làm AI là nón bất định tột cùng: một mô hình định giá có thể mất một sprint hoặc ba. Cam kết theo velocity quan sát được, tinh chỉnh các ước lượng rủi ro nhất trước khi cam kết, bảo vệ Definition of Done — một khuyến nghị giá sai trên môi trường thật sẽ phá hủy niềm tin — và sẵn sàng khi ban điều hành xoay trục ưu tiên giữa dự án. Họ sẽ làm vậy.` }),
            deliverables: [
              { level: 1, name: L(lang, { en: 'Foundations (must-haves)', fr: 'Fondations (indispensables)', es: 'Cimientos (imprescindibles)', vi: 'Nền móng (bắt buộc)' }), desc: L(lang, { en: 'Data pipeline and AI guardrails — nothing ships without them', fr: 'Pipeline de données et garde-fous IA — rien ne sort sans eux', es: 'Pipeline de datos y salvaguardas de IA — nada sale sin ellos', vi: 'Đường ống dữ liệu và rào chắn AI — không có chúng thì không giao gì được' }), tasks: 2 },
              { level: 2, name: L(lang, { en: 'Profit Engines', fr: 'Moteurs de rentabilité', es: 'Motores de rentabilidad', vi: 'Cỗ máy lợi nhuận' }), desc: L(lang, { en: 'TCO calculator, AI parts pricing, margin dashboards', fr: 'Calculateur TCO, prix des pièces par IA, tableaux de marge', es: 'Calculadora de TCO, precios de repuestos con IA, tableros de márgenes', vi: 'Máy tính TCO, định giá phụ tùng bằng AI, bảng biên lợi nhuận' }), tasks: 3 },
              { level: 3, name: L(lang, { en: 'Service Intelligence', fr: 'Intelligence service', es: 'Inteligencia de servicio', vi: 'Phân tích dịch vụ' }), desc: L(lang, { en: 'Warranty assistant, predictive maintenance, quote bot, DMS integration', fr: 'Assistant garantie, maintenance prédictive, robot de soumission, intégration DMS', es: 'Asistente de garantías, mantenimiento predictivo, bot de cotizaciones, integración con el DMS', vi: 'Trợ lý bảo hành, bảo trì dự đoán, bot báo giá, tích hợp DMS' }), tasks: 4 },
              { level: 4, name: L(lang, { en: 'Nice-to-haves (gold-plating traps)', fr: 'Optionnels (pièges de sur-qualité)', es: 'Opcionales (trampas de sobre-ingeniería)', vi: 'Có thì tốt (bẫy mạ vàng)' }), desc: L(lang, { en: 'OCR, fleet reports, knowledge base, telemetry dashboard — most should be cut', fr: 'OCR, rapports de flotte, base de connaissances, tableau de télémétrie — la plupart devraient être coupés', es: 'OCR, reportes de flota, base de conocimiento, tablero de telemetría — la mayoría debería recortarse', vi: 'OCR, báo cáo đội xe, kho tri thức, bảng telemetry — nên cắt phần lớn' }), tasks: 5 }
            ]
          },
          fastlane_scrum: {
            context: L(lang, { en: `You are the Product Owner for the customer portal at ${selectedScenario.company}. Truck owners wait on hold to book service; fleet managers fax purchase orders; the counter answers "is my truck ready?" forty times a day. The portal launch date is set — the scope is not.`, fr: `Vous êtes Product Owner du portail client chez ${selectedScenario.company}. Les propriétaires de camions attendent au téléphone pour un rendez-vous; les gestionnaires de flotte envoient leurs bons par télécopieur; le comptoir répond « mon camion est-il prêt ? » quarante fois par jour. La date de lancement du portail est fixée — pas le périmètre.`, es: `Eres el Product Owner del portal de clientes en ${selectedScenario.company}. Los dueños de camiones esperan en línea para agendar servicio; los gerentes de flota mandan órdenes por fax; el mostrador responde "¿está listo mi camión?" cuarenta veces al día. La fecha de lanzamiento del portal está fijada — el alcance no.`, vi: `Bạn là Product Owner của cổng khách hàng tại ${selectedScenario.company}. Chủ xe tải chờ máy để đặt lịch dịch vụ; quản lý đội xe fax đơn đặt hàng; quầy trả lời "xe tôi xong chưa?" bốn mươi lần mỗi ngày. Ngày ra mắt cổng đã chốt — phạm vi thì chưa.` }),
            challenge: L(lang, { en: `Ship the most valuable portal by launch: booking and quote approval are non-negotiable, everything else is a trade-off. Fleet customers are your revenue backbone — when the biggest one makes demands mid-project, welcoming the change will beat protecting the plan.`, fr: `Livrez le portail le plus précieux pour le lancement : la prise de rendez-vous et l\u2019approbation des soumissions sont non négociables, tout le reste est un arbitrage. Les clients de flotte sont votre colonne vertébrale de revenus — quand le plus gros exigera des changements en cours de projet, accueillir le changement vaudra mieux que protéger le plan.`, es: `Entrega el portal más valioso posible para el lanzamiento: la reserva de citas y la aprobación de cotizaciones no son negociables, todo lo demás es un trade-off. Los clientes de flota son tu columna vertebral de ingresos — cuando el más grande haga exigencias a mitad de proyecto, acoger el cambio vencerá a proteger el plan.`, vi: `Giao cổng giá trị nhất trước ngày ra mắt: đặt lịch và duyệt báo giá là bất khả xâm phạm, mọi thứ khác đều phải đánh đổi. Khách đội xe là xương sống doanh thu — khi khách lớn nhất ra yêu sách giữa dự án, đón nhận thay đổi sẽ thắng việc bo bo giữ kế hoạch.` }),
            deliverables: [
              { level: 1, name: L(lang, { en: 'Must-haves', fr: 'Indispensables', es: 'Imprescindibles', vi: 'Bắt buộc phải có' }), desc: L(lang, { en: 'Online service booking and digital quote approval', fr: 'Prise de rendez-vous en ligne et approbation numérique des soumissions', es: 'Reserva de servicio en línea y aprobación digital de cotizaciones', vi: 'Đặt lịch dịch vụ trực tuyến và duyệt báo giá số' }), tasks: 2 },
              { level: 2, name: L(lang, { en: 'High-value Self-service', fr: 'Libre-service à haute valeur', es: 'Autoservicio de alto valor', vi: 'Tự phục vụ giá trị cao' }), desc: L(lang, { en: 'Repair status tracking, parts lookup, invoice payment', fr: 'Suivi des réparations, disponibilité des pièces, paiement de factures', es: 'Seguimiento de reparaciones, búsqueda de repuestos, pago de facturas', vi: 'Theo dõi sửa chữa, tra cứu phụ tùng, thanh toán hóa đơn' }), tasks: 3 },
              { level: 3, name: L(lang, { en: 'Fleet Tools', fr: 'Outils de flotte', es: 'Herramientas de flota', vi: 'Công cụ đội xe' }), desc: L(lang, { en: 'Fleet manager portal — your biggest customers are watching', fr: 'Portail gestionnaire de flotte — vos plus gros clients regardent', es: 'Portal de gerentes de flota — tus clientes más grandes están mirando', vi: 'Cổng quản lý đội xe — các khách hàng lớn nhất đang dõi theo' }), tasks: 2 },
              { level: 4, name: L(lang, { en: 'Nice-to-haves (gold-plating traps)', fr: 'Optionnels (pièges de sur-qualité)', es: 'Opcionales (trampas de sobre-ingeniería)', vi: 'Có thì tốt (bẫy mạ vàng)' }), desc: L(lang, { en: 'Chat, reviews, kiosk, dark mode — most should be cut', fr: 'Clavardage, avis, borne, mode sombre — la plupart devraient être coupés', es: 'Chat, reseñas, kiosco, modo oscuro — la mayoría debería recortarse', vi: 'Chat, đánh giá, kiosk, chế độ tối — nên cắt phần lớn' }), tasks: 7 }
            ]
          }
          ,
          apex_biotech: {
            context: L(lang, { en: `You are the program lead at ${selectedScenario.company}. BNT-204 cleared Phase I; the board has funded a 14-week Phase II window before the partnering conference.`, fr: `Vous dirigez le programme chez ${selectedScenario.company}. BNT-204 a réussi la phase I; le conseil a financé une fenêtre de phase II de 14 semaines avant la conférence de partenariat.`, es: `Eres el líder del programa en ${selectedScenario.company}. BNT-204 superó la Fase I; el directorio financió una ventana de 14 semanas para la Fase II antes de la conferencia de socios.`, vi: `Bạn là trưởng chương trình tại ${selectedScenario.company}. BNT-204 đã qua Giai đoạn I; hội đồng quản trị cấp vốn cho cửa sổ 14 tuần Giai đoạn II trước hội nghị đối tác.` }),
            challenge: L(lang, { en: `Trial science, patient enrollment and regulators all carry deep uncertainty. Pilot cohorts (prototypes) surface protocol problems before they cost months.`, fr: `La science de l\u2019essai, le recrutement des patients et les régulateurs portent tous une profonde incertitude. Les cohortes pilotes (prototypes) révèlent les problèmes de protocole avant qu\u2019ils coûtent des mois.`, es: `La ciencia del ensayo, el reclutamiento de pacientes y los reguladores cargan una incertidumbre profunda. Las cohortes piloto (prototipos) revelan problemas de protocolo antes de que cuesten meses.`, vi: `Khoa học thử nghiệm, tuyển bệnh nhân và cơ quan quản lý đều mang độ bất định sâu. Các nhóm thí điểm (nguyên mẫu) phát hiện vấn đề đề cương trước khi chúng ngốn hàng tháng trời.` }),
            deliverables: [
              { level: 1, name: L(lang, { en: 'Protocol & Sites', fr: 'Protocole et sites', es: 'Protocolo y centros', vi: 'Đề cương & điểm nghiên cứu' }), desc: L(lang, { en: 'Final protocol, site activation, ethics approvals', fr: 'Protocole final, activation des sites, approbations éthiques', es: 'Protocolo final, activación de centros, aprobaciones éticas', vi: 'Đề cương cuối, kích hoạt điểm nghiên cứu, phê duyệt đạo đức' }), tasks: 3 },
              { level: 2, name: L(lang, { en: 'Enrollment', fr: 'Recrutement', es: 'Reclutamiento', vi: 'Tuyển bệnh nhân' }), desc: L(lang, { en: 'Patient recruitment and randomization', fr: 'Recrutement et randomisation des patients', es: 'Reclutamiento y aleatorización de pacientes', vi: 'Tuyển và phân nhóm ngẫu nhiên bệnh nhân' }), tasks: 3 },
              { level: 3, name: L(lang, { en: 'Dosing & Monitoring', fr: 'Administration et suivi', es: 'Dosificación y monitoreo', vi: 'Liều & theo dõi' }), desc: L(lang, { en: 'Dosing schedule, safety monitoring, data capture', fr: 'Calendrier de doses, suivi de sécurité, saisie des données', es: 'Esquema de dosis, monitoreo de seguridad, captura de datos', vi: 'Lịch liều, giám sát an toàn, thu thập dữ liệu' }), tasks: 2 },
              { level: 4, name: L(lang, { en: 'Analysis & Readout', fr: 'Analyse et résultats', es: 'Análisis y resultados', vi: 'Phân tích & kết quả' }), desc: L(lang, { en: 'Interim analysis and topline readout', fr: 'Analyse intermédiaire et résultats sommaires', es: 'Análisis interino y lectura de resultados principales', vi: 'Phân tích giữa kỳ và kết quả sơ bộ' }), tasks: 2 }
            ]
          },
          festival_borealis: {
            context: L(lang, { en: `You are the festival director at ${selectedScenario.company}. Forty thousand tickets are sold for a three-day outdoor festival, twelve weeks out.`, fr: `Vous dirigez le festival chez ${selectedScenario.company}. Quarante mille billets sont vendus pour un festival extérieur de trois jours, dans douze semaines.`, es: `Eres el director del festival en ${selectedScenario.company}. Hay cuarenta mil boletos vendidos para un festival al aire libre de tres días, a doce semanas de distancia.`, vi: `Bạn là giám đốc lễ hội tại ${selectedScenario.company}. Bốn mươi nghìn vé đã bán cho lễ hội ngoài trời ba ngày, còn mười hai tuần nữa.` }),
            challenge: L(lang, { en: `Headliners, permits, sponsors, vendors and weather all interlock. Every decision echoes through the team\u2019s stress and the fans\u2019 experience.`, fr: `Têtes d\u2019affiche, permis, commanditaires, fournisseurs et météo s\u2019imbriquent. Chaque décision se répercute sur le stress de l\u2019équipe et l\u2019expérience des festivaliers.`, es: `Cabezas de cartel, permisos, patrocinadores, proveedores y clima se entrelazan. Cada decisión repercute en el estrés del equipo y la experiencia de los fans.`, vi: `Nghệ sĩ đinh, giấy phép, nhà tài trợ, nhà cung cấp và thời tiết đan cài nhau. Mỗi quyết định dội vào mức căng thẳng của đội và trải nghiệm khán giả.` }),
            deliverables: [
              { level: 1, name: L(lang, { en: 'Site & Permits', fr: 'Site et permis', es: 'Sitio y permisos', vi: 'Mặt bằng & giấy phép' }), desc: L(lang, { en: 'Grounds, staging, municipal permits', fr: 'Terrain, scènes, permis municipaux', es: 'Terrenos, escenarios, permisos municipales', vi: 'Khuôn viên, sân khấu, giấy phép địa phương' }), tasks: 3 },
              { level: 2, name: L(lang, { en: 'Program', fr: 'Programmation', es: 'Programa', vi: 'Chương trình' }), desc: L(lang, { en: 'Headliners and supporting lineup', fr: 'Têtes d\u2019affiche et programmation', es: 'Cabezas de cartel y artistas de apoyo', vi: 'Nghệ sĩ đinh và dàn nghệ sĩ phụ' }), tasks: 3 },
              { level: 3, name: L(lang, { en: 'Operations', fr: 'Opérations', es: 'Operaciones', vi: 'Vận hành' }), desc: L(lang, { en: 'Vendors, security, medical, transport', fr: 'Fournisseurs, sécurité, services médicaux, transport', es: 'Proveedores, seguridad, servicios médicos, transporte', vi: 'Nhà cung cấp, an ninh, y tế, vận chuyển' }), tasks: 2 },
              { level: 4, name: L(lang, { en: 'Experience', fr: 'Expérience', es: 'Experiencia', vi: 'Trải nghiệm' }), desc: L(lang, { en: 'Sponsor activations and fan experience', fr: 'Activations commanditaires et expérience des festivaliers', es: 'Activaciones de patrocinadores y experiencia de fans', vi: 'Hoạt động tài trợ và trải nghiệm khán giả' }), tasks: 2 }
            ]
          },
          fitout_chain: {
            context: L(lang, { en: `You are the program manager at ${selectedScenario.company}, renovating eight stores for a national retail chain on one reopening calendar.`, fr: `Vous gérez le programme chez ${selectedScenario.company} : rénovation de huit magasins d\u2019une chaîne nationale sur un seul calendrier de réouverture.`, es: `Eres el gerente del programa en ${selectedScenario.company}, renovando ocho tiendas para una cadena minorista nacional con un solo calendario de reapertura.`, vi: `Bạn là quản lý chương trình tại ${selectedScenario.company}, cải tạo tám cửa hàng cho một chuỗi bán lẻ toàn quốc theo một lịch khai trương chung.` }),
            challenge: L(lang, { en: `Same design, eight different buildings — each with its own landlord, surprises and crews. Sequencing is everything.`, fr: `Même design, huit bâtiments différents — chacun avec son propriétaire, ses surprises et ses équipes. Le séquencement est tout.`, es: `El mismo diseño, ocho edificios distintos — cada uno con su propio arrendador, sorpresas y cuadrillas. La secuenciación lo es todo.`, vi: `Cùng một thiết kế, tám tòa nhà khác nhau — mỗi nơi có chủ nhà, bất ngờ và đội thợ riêng. Trình tự là tất cả.` }),
            deliverables: [
              { level: 1, name: L(lang, { en: 'Demolition & Prep', fr: 'Démolition et préparation', es: 'Demolición y preparación', vi: 'Tháo dỡ & chuẩn bị' }), desc: L(lang, { en: 'Strip-out and remediation across sites', fr: 'Curetage et assainissement des sites', es: 'Desmontaje y remediación en todos los sitios', vi: 'Tháo dỡ và xử lý tại các địa điểm' }), tasks: 2 },
              { level: 2, name: L(lang, { en: 'Core Build', fr: 'Construction', es: 'Construcción principal', vi: 'Thi công chính' }), desc: L(lang, { en: 'Electrical, HVAC, walls and floors', fr: 'Électricité, CVC, cloisons et planchers', es: 'Electricidad, HVAC, muros y pisos', vi: 'Điện, HVAC, tường và sàn' }), tasks: 3 },
              { level: 3, name: L(lang, { en: 'Fixtures & Finish', fr: 'Mobilier et finition', es: 'Mobiliario y acabados', vi: 'Nội thất & hoàn thiện' }), desc: L(lang, { en: 'Custom fixtures, signage, finishes', fr: 'Mobilier sur mesure, enseignes, finitions', es: 'Mobiliario a medida, señalización, acabados', vi: 'Nội thất đặt riêng, biển hiệu, hoàn thiện' }), tasks: 2 },
              { level: 4, name: L(lang, { en: 'Handover', fr: 'Livraison', es: 'Entrega', vi: 'Bàn giao' }), desc: L(lang, { en: 'Inspections, punch lists, store reopenings', fr: 'Inspections, déficiences, réouvertures', es: 'Inspecciones, listas de pendientes, reaperturas de tiendas', vi: 'Nghiệm thu, danh sách tồn đọng, khai trương lại cửa hàng' }), tasks: 1 }
            ]
          },
          datacenter_exit: {
            context: L(lang, { en: `You are the migration lead at ${selectedScenario.company}. The datacenter lease ends in 14 weeks; 40 production workloads must move to the cloud in waves.`, fr: `Vous menez la migration chez ${selectedScenario.company}. Le bail du centre de données expire dans 14 semaines; 40 charges de production doivent migrer au nuage par vagues.`, es: `Eres el líder de migración en ${selectedScenario.company}. El contrato del datacenter termina en 14 semanas; 40 cargas de producción deben moverse a la nube en oleadas.`, vi: `Bạn là trưởng nhóm di trú tại ${selectedScenario.company}. Hợp đồng thuê trung tâm dữ liệu hết hạn sau 14 tuần; 40 khối lượng công việc production phải chuyển lên đám mây theo từng đợt.` }),
            challenge: L(lang, { en: `Undocumented dependencies, cost surprises and cutover risk lurk in every wave. Pilot waves (prototypes) are your best insurance.`, fr: `Dépendances non documentées, surprises de coûts et risques de bascule guettent chaque vague. Les vagues pilotes (prototypes) sont votre meilleure assurance.`, es: `Dependencias sin documentar, sorpresas de costos y riesgo de cutover acechan en cada oleada. Las oleadas piloto (prototipos) son tu mejor seguro.`, vi: `Phụ thuộc không tài liệu, chi phí bất ngờ và rủi ro chuyển đổi rình rập trong từng đợt. Các đợt thí điểm (nguyên mẫu) là bảo hiểm tốt nhất của bạn.` }),
            deliverables: [
              { level: 1, name: L(lang, { en: 'Discovery & Landing Zone', fr: 'Découverte et zone d\u2019accueil', es: 'Descubrimiento y landing zone', vi: 'Khảo sát & landing zone' }), desc: L(lang, { en: 'Dependency mapping, cloud landing zone', fr: 'Cartographie des dépendances, zone d\u2019accueil infonuagique', es: 'Mapeo de dependencias, landing zone en la nube', vi: 'Lập bản đồ phụ thuộc, landing zone đám mây' }), tasks: 3 },
              { level: 2, name: L(lang, { en: 'Early Waves', fr: 'Premières vagues', es: 'Oleadas tempranas', vi: 'Các đợt đầu' }), desc: L(lang, { en: 'Low-risk workloads and pilot lessons', fr: 'Charges à faible risque et leçons pilotes', es: 'Cargas de bajo riesgo y lecciones del piloto', vi: 'Khối lượng rủi ro thấp và bài học thí điểm' }), tasks: 3 },
              { level: 3, name: L(lang, { en: 'Core Systems', fr: 'Systèmes critiques', es: 'Sistemas centrales', vi: 'Hệ thống lõi' }), desc: L(lang, { en: 'ERP, databases, integration clusters', fr: 'ERP, bases de données, grappes d\u2019intégration', es: 'ERP, bases de datos, clústeres de integración', vi: 'ERP, cơ sở dữ liệu, cụm tích hợp' }), tasks: 4 },
              { level: 4, name: L(lang, { en: 'Decommission', fr: 'Mise hors service', es: 'Desmantelamiento', vi: 'Ngừng vận hành' }), desc: L(lang, { en: 'Final cutover and datacenter exit', fr: 'Bascule finale et sortie du centre de données', es: 'Cutover final y salida del datacenter', vi: 'Chuyển đổi cuối và rút khỏi trung tâm dữ liệu' }), tasks: 2 }
            ]
          },
          core_banking: {
            context: L(lang, { en: `You are the program director at ${selectedScenario.company}. The regulator\u2019s modernization deadline makes the core banking replacement unavoidable — and unmovable.`, fr: `Vous dirigez le programme chez ${selectedScenario.company}. L\u2019échéance de modernisation du régulateur rend le remplacement du système central inévitable — et immuable.`, es: `Eres el director del programa en ${selectedScenario.company}. La fecha límite de modernización del regulador hace que el reemplazo del core bancario sea inevitable — e inamovible.`, vi: `Bạn là giám đốc chương trình tại ${selectedScenario.company}. Hạn chót hiện đại hóa của cơ quan quản lý khiến việc thay thế ngân hàng lõi là không thể tránh — và không thể dời.` }),
            challenge: L(lang, { en: `Forty years of accounts, a vendor you don\u2019t control, and a ledger where a $0.03 divergence is a failure. Parallel-run rehearsals (prototypes) are your only safety net.`, fr: `Quarante ans de comptes, un fournisseur que vous ne contrôlez pas, et un registre où un écart de 0,03 $ est un échec. Les répétitions d\u2019exécution parallèle (prototypes) sont votre seul filet.`, es: `Cuarenta años de cuentas, un proveedor que no controlas y un libro mayor donde una divergencia de $0.03 es un fracaso. Los ensayos de operación en paralelo (prototipos) son tu única red de seguridad.`, vi: `Bốn mươi năm tài khoản, một nhà cung cấp bạn không kiểm soát, và một sổ cái nơi lệch $0.03 đã là thất bại. Diễn tập chạy song song (nguyên mẫu) là lưới an toàn duy nhất của bạn.` }),
            deliverables: [
              { level: 1, name: L(lang, { en: 'Foundation', fr: 'Fondations', es: 'Cimientos', vi: 'Nền móng' }), desc: L(lang, { en: 'Platform setup, data model, controls', fr: 'Mise en place, modèle de données, contrôles', es: 'Configuración de plataforma, modelo de datos, controles', vi: 'Dựng nền tảng, mô hình dữ liệu, cơ chế kiểm soát' }), tasks: 3 },
              { level: 2, name: L(lang, { en: 'Migration', fr: 'Migration', es: 'Migración', vi: 'Di trú' }), desc: L(lang, { en: 'Account migration and reconciliation', fr: 'Migration des comptes et rapprochement', es: 'Migración de cuentas y conciliación', vi: 'Di trú tài khoản và đối soát' }), tasks: 3 },
              { level: 3, name: L(lang, { en: 'Parallel Run', fr: 'Exécution parallèle', es: 'Operación en paralelo', vi: 'Chạy song song' }), desc: L(lang, { en: 'Dual-ledger operation and divergence hunting', fr: 'Double registre et chasse aux écarts', es: 'Operación de doble libro mayor y caza de divergencias', vi: 'Vận hành sổ cái kép và truy tìm sai lệch' }), tasks: 3 },
              { level: 4, name: L(lang, { en: 'Cutover', fr: 'Bascule', es: 'Cutover', vi: 'Chuyển đổi' }), desc: L(lang, { en: 'Go-live and regulator sign-off', fr: 'Mise en service et approbation du régulateur', es: 'Salida a producción y aprobación del regulador', vi: 'Go-live và phê duyệt của cơ quan quản lý' }), tasks: 3 }
            ]
          },
          regtech_aml: {
            context: L(lang, { en: `You are the compliance PM at ${selectedScenario.company}. The regulator\u2019s AML deadline is fixed; ten monitoring controls must be operational.`, fr: `Vous êtes GP conformité chez ${selectedScenario.company}. L\u2019échéance anti-blanchiment du régulateur est fixe; dix contrôles de surveillance doivent être opérationnels.`, es: `Eres el PM de cumplimiento en ${selectedScenario.company}. La fecha límite AML del regulador es fija; diez controles de monitoreo deben estar operativos.`, vi: `Bạn là PM tuân thủ tại ${selectedScenario.company}. Hạn chót AML của cơ quan quản lý là cố định; mười cơ chế giám sát phải đi vào vận hành.` }),
            challenge: L(lang, { en: `Alert floods, guidance changes and analyst burnout will test the plan. A control that drowns its reviewers protects no one.`, fr: `Les déluges d\u2019alertes, les changements de directives et l\u2019épuisement des analystes mettront le plan à l\u2019épreuve. Un contrôle qui noie ses réviseurs ne protège personne.`, es: `Inundaciones de alertas, cambios de guía y agotamiento de analistas pondrán a prueba el plan. Un control que ahoga a sus revisores no protege a nadie.`, vi: `Lũ cảnh báo, hướng dẫn thay đổi và phân tích viên kiệt sức sẽ thử thách kế hoạch. Một cơ chế kiểm soát nhấn chìm người rà soát thì chẳng bảo vệ được ai.` }),
            deliverables: [
              { level: 1, name: L(lang, { en: 'Rules & Data', fr: 'Règles et données', es: 'Reglas y datos', vi: 'Quy tắc & dữ liệu' }), desc: L(lang, { en: 'Transaction rules and data feeds', fr: 'Règles transactionnelles et flux de données', es: 'Reglas de transacciones y flujos de datos', vi: 'Quy tắc giao dịch và nguồn dữ liệu' }), tasks: 3 },
              { level: 2, name: L(lang, { en: 'Screening', fr: 'Filtrage', es: 'Filtrado', vi: 'Sàng lọc' }), desc: L(lang, { en: 'Sanctions and watchlist screening', fr: 'Filtrage des sanctions et listes de surveillance', es: 'Filtrado de sanciones y listas de vigilancia', vi: 'Sàng lọc cấm vận và danh sách theo dõi' }), tasks: 3 },
              { level: 3, name: L(lang, { en: 'Case Management', fr: 'Gestion des cas', es: 'Gestión de casos', vi: 'Quản lý hồ sơ' }), desc: L(lang, { en: 'Alert triage and case workflows', fr: 'Triage des alertes et flux de traitement', es: 'Triaje de alertas y flujos de casos', vi: 'Phân loại cảnh báo và quy trình hồ sơ' }), tasks: 2 },
              { level: 4, name: L(lang, { en: 'Reporting', fr: 'Déclarations', es: 'Reportes', vi: 'Báo cáo' }), desc: L(lang, { en: 'Regulatory reporting and audit trail', fr: 'Déclarations réglementaires et piste d\u2019audit', es: 'Reportes regulatorios y pista de auditoría', vi: 'Báo cáo cho cơ quan quản lý và vết kiểm toán' }), tasks: 2 }
            ]
          },
          skunkworks_scrum: {
            context: L(lang, { en: `You are the Product Owner of the skunkworks squad at ${selectedScenario.company}. The investor showcase date is fixed; the demo wish-list is not.`, fr: `Vous êtes Product Owner de l\u2019équipe skunkworks chez ${selectedScenario.company}. La date de la vitrine investisseurs est fixe; la liste de souhaits de la démo ne l\u2019est pas.`, es: `Eres el Product Owner del equipo skunkworks en ${selectedScenario.company}. La fecha del showcase para inversionistas es fija; la lista de deseos de la demo no lo es.`, vi: `Bạn là Product Owner của đội skunkworks tại ${selectedScenario.company}. Ngày trình diễn cho nhà đầu tư đã cố định; danh sách mong muốn của bản demo thì không.` }),
            challenge: L(lang, { en: `Hardware-software estimates are wildly uncertain. Commit to observed velocity, protect what makes the demo credible, and be ready when a new partner bends the priorities mid-project.`, fr: `Les estimations matériel-logiciel sont très incertaines. Engagez-vous sur la vélocité observée, protégez ce qui rend la démo crédible, et soyez prêt quand un nouveau partenaire pliera les priorités en cours de route.`, es: `Las estimaciones hardware-software son salvajemente inciertas. Comprométete según la velocidad observada, protege lo que hace creíble la demo y prepárate para cuando un nuevo socio tuerza las prioridades a mitad de proyecto.`, vi: `Ước lượng phần cứng-phần mềm cực kỳ bất định. Cam kết theo velocity quan sát được, bảo vệ những gì làm bản demo đáng tin, và sẵn sàng khi một đối tác mới bẻ cong ưu tiên giữa dự án.` }),
            deliverables: [
              { level: 1, name: L(lang, { en: 'Must-haves', fr: 'Indispensables', es: 'Imprescindibles', vi: 'Bắt buộc phải có' }), desc: L(lang, { en: 'Stable flight core and ground station', fr: 'Noyau de vol stable et station au sol', es: 'Núcleo de vuelo estable y estación terrestre', vi: 'Lõi bay ổn định và trạm mặt đất' }), tasks: 2 },
              { level: 2, name: L(lang, { en: 'Credibility Features', fr: 'Crédibilité', es: 'Funciones de credibilidad', vi: 'Tính năng tạo uy tín' }), desc: L(lang, { en: 'Obstacle avoidance, autonomous landing, telemetry', fr: 'Évitement d\u2019obstacles, atterrissage autonome, télémétrie', es: 'Evasión de obstáculos, aterrizaje autónomo, telemetría', vi: 'Né vật cản, hạ cánh tự động, telemetry' }), tasks: 3 },
              { level: 3, name: L(lang, { en: 'Wow Factor', fr: 'Effet wow', es: 'Factor sorpresa', vi: 'Yếu tố trầm trồ' }), desc: L(lang, { en: 'Swarm demo, sensor payload, video', fr: 'Essaim, charge utile capteur, vidéo', es: 'Demo de enjambre, carga de sensores, video', vi: 'Demo bầy drone, cụm cảm biến, video' }), tasks: 4 },
              { level: 4, name: L(lang, { en: 'Nice-to-haves (gold-plating traps)', fr: 'Optionnels (pièges de sur-qualité)', es: 'Opcionales (trampas de sobre-ingeniería)', vi: 'Có thì tốt (bẫy mạ vàng)' }), desc: L(lang, { en: 'Branding, LED show, docs — most should be cut', fr: 'Image de marque, spectacle de DEL, documentation — la plupart devraient être coupés', es: 'Branding, show de LED, docs — la mayoría debería recortarse', vi: 'Thương hiệu, trình diễn LED, tài liệu — nên cắt phần lớn' }), tasks: 5 }
            ]
          },
          gamestudio_scrum: {
            context: L(lang, { en: `You are the Product Owner at ${selectedScenario.company}. One vertical slice decides whether \u201CEmberfall\u201D gets funded — the pitch date is fixed.`, fr: `Vous êtes Product Owner chez ${selectedScenario.company}. Une tranche verticale décidera si « Emberfall » sera financé — la date du pitch est fixe.`, es: `Eres el Product Owner en ${selectedScenario.company}. Una sola vertical slice decide si "Emberfall" recibe financiación — la fecha del pitch es fija.`, vi: `Bạn là Product Owner tại ${selectedScenario.company}. Một lát cắt dọc quyết định "Emberfall" có được cấp vốn hay không — ngày pitch đã cố định.` }),
            challenge: L(lang, { en: `Fun is discovered, not planned: combat and co-op estimates hide brutal uncertainty. Ship the slice that proves the game — and welcome the publisher\u2019s mid-project feedback.`, fr: `Le plaisir se découvre, il ne se planifie pas : les estimations du combat et du coop cachent une incertitude brutale. Livrez la tranche qui prouve le jeu — et accueillez les retours de l\u2019éditeur en cours de route.`, es: `La diversión se descubre, no se planifica: las estimaciones de combate y co-op esconden una incertidumbre brutal. Entrega la slice que demuestra el juego — y acoge el feedback del publisher a mitad de proyecto.`, vi: `Sự vui phải được khám phá, không lập kế hoạch được: ước lượng chiến đấu và co-op giấu độ bất định khốc liệt. Giao lát cắt chứng minh trò chơi — và đón nhận phản hồi giữa dự án của nhà phát hành.` }),
            deliverables: [
              { level: 1, name: L(lang, { en: 'Must-haves', fr: 'Indispensables', es: 'Imprescindibles', vi: 'Bắt buộc phải có' }), desc: L(lang, { en: 'Core gameplay loop and first playable level', fr: 'Boucle de jeu principale et premier niveau jouable', es: 'Bucle de juego central y primer nivel jugable', vi: 'Vòng lặp gameplay lõi và màn chơi được đầu tiên' }), tasks: 2 },
              { level: 2, name: L(lang, { en: 'The Fun', fr: 'Le plaisir', es: 'La diversión', vi: 'Chất vui' }), desc: L(lang, { en: 'Combat, boss fight, art style', fr: 'Combat, boss, style artistique', es: 'Combate, jefe final, estilo artístico', vi: 'Chiến đấu, trùm, phong cách mỹ thuật' }), tasks: 3 },
              { level: 3, name: L(lang, { en: 'The Pitch Extras', fr: 'Extras du pitch', es: 'Los extras del pitch', vi: 'Phần phụ cho buổi pitch' }), desc: L(lang, { en: 'Co-op prototype, audio, cinematic', fr: 'Prototype coop, audio, cinématique', es: 'Prototipo co-op, audio, cinemática', vi: 'Nguyên mẫu co-op, âm thanh, đoạn phim' }), tasks: 4 },
              { level: 4, name: L(lang, { en: 'Nice-to-haves (gold-plating traps)', fr: 'Optionnels (pièges de sur-qualité)', es: 'Opcionales (trampas de sobre-ingeniería)', vi: 'Có thì tốt (bẫy mạ vàng)' }), desc: L(lang, { en: 'Achievements, photo mode — most should be cut', fr: 'Succès, mode photo — la plupart devraient être coupés', es: 'Logros, modo foto — la mayoría debería recortarse', vi: 'Thành tựu, chế độ chụp ảnh — nên cắt phần lớn' }), tasks: 5 }
            ]
          },
          sitesync_scrum: {
            context: L(lang, { en: `You are the Product Owner of the tech unit at ${selectedScenario.company}. The flagship tower project starts in 12 weeks — with or without your field app.`, fr: `Vous êtes Product Owner de l\u2019unité techno chez ${selectedScenario.company}. Le projet phare de la tour démarre dans 12 semaines — avec ou sans votre application de chantier.`, es: `Eres el Product Owner de la unidad tecnológica en ${selectedScenario.company}. El proyecto de la torre insignia arranca en 12 semanas — con o sin tu app de campo.`, vi: `Bạn là Product Owner của đơn vị công nghệ tại ${selectedScenario.company}. Dự án tòa tháp chủ lực khởi công sau 12 tuần — dù có hay không có ứng dụng hiện trường của bạn.` }),
            challenge: L(lang, { en: `Site crews abandon software that slows them down. Ship the workflows they touch daily, treat offline mode\u2019s uncertainty honestly, and expect the safety office to change your priorities.`, fr: `Les équipes de chantier abandonnent les logiciels qui les ralentissent. Livrez les flux qu\u2019elles touchent chaque jour, traitez honnêtement l\u2019incertitude du mode hors ligne, et attendez-vous à ce que le bureau sécurité change vos priorités.`, es: `Las cuadrillas de obra abandonan el software que las frena. Entrega los flujos que tocan a diario, trata honestamente la incertidumbre del modo offline y espera que la oficina de seguridad cambie tus prioridades.`, vi: `Đội công trường sẽ bỏ phần mềm làm họ chậm lại. Giao các quy trình họ dùng hằng ngày, trung thực với độ bất định của chế độ offline, và lường trước việc phòng an toàn thay đổi ưu tiên của bạn.` }),
            deliverables: [
              { level: 1, name: L(lang, { en: 'Must-haves', fr: 'Indispensables', es: 'Imprescindibles', vi: 'Bắt buộc phải có' }), desc: L(lang, { en: 'Daily reports and drawing viewer', fr: 'Rapports quotidiens et visionneuse de plans', es: 'Reportes diarios y visor de planos', vi: 'Báo cáo hằng ngày và trình xem bản vẽ' }), tasks: 2 },
              { level: 2, name: L(lang, { en: 'Daily Workflows', fr: 'Flux quotidiens', es: 'Flujos diarios', vi: 'Quy trình hằng ngày' }), desc: L(lang, { en: 'Punch lists, safety forms, timesheets, photos', fr: 'Déficiences, formulaires de sécurité, feuilles de temps, photos', es: 'Listas de pendientes, formularios de seguridad, partes de horas, fotos', vi: 'Danh sách tồn đọng, biểu mẫu an toàn, chấm công, ảnh' }), tasks: 4 },
              { level: 3, name: L(lang, { en: 'Power Features', fr: 'Fonctions avancées', es: 'Funciones avanzadas', vi: 'Tính năng mạnh' }), desc: L(lang, { en: 'Offline mode, RFI tracker, dashboards', fr: 'Mode hors ligne, suivi des demandes, tableaux de bord', es: 'Modo offline, seguimiento de RFIs, tableros', vi: 'Chế độ offline, theo dõi RFI, bảng điều khiển' }), tasks: 3 },
              { level: 4, name: L(lang, { en: 'Nice-to-haves (gold-plating traps)', fr: 'Optionnels (pièges de sur-qualité)', es: 'Opcionales (trampas de sobre-ingeniería)', vi: 'Có thì tốt (bẫy mạ vàng)' }), desc: L(lang, { en: 'Weather log, notifications, dark mode — most should be cut', fr: 'Journal météo, notifications, mode sombre — la plupart devraient être coupés', es: 'Registro de clima, notificaciones, modo oscuro — la mayoría debería recortarse', vi: 'Nhật ký thời tiết, thông báo, chế độ tối — nên cắt phần lớn' }), tasks: 5 }
            ]
          },
          devops_scrum: {
            context: L(lang, { en: `You are the Product Owner of the platform team at ${selectedScenario.company}. Two hundred engineers are waiting for a developer platform that doesn\u2019t fight them.`, fr: `Vous êtes Product Owner de l\u2019équipe plateforme chez ${selectedScenario.company}. Deux cents ingénieurs attendent une plateforme développeur qui ne se batte pas contre eux.`, es: `Eres el Product Owner del equipo de plataforma en ${selectedScenario.company}. Doscientos ingenieros esperan una plataforma de desarrollo que no pelee con ellos.`, vi: `Bạn là Product Owner của đội nền tảng tại ${selectedScenario.company}. Hai trăm kỹ sư đang chờ một nền tảng phát triển không chống lại họ.` }),
            challenge: L(lang, { en: `Platform work hides brutal estimate uncertainty — self-service environments can take one sprint or four. Deliver the paved road first, and expect security to seize the wheel mid-project.`, fr: `Le travail de plateforme cache une incertitude d\u2019estimation brutale — les environnements en libre-service peuvent prendre un sprint comme quatre. Livrez d\u2019abord la voie pavée, et attendez-vous à ce que la sécurité prenne le volant en cours de route.`, es: `El trabajo de plataforma esconde una incertidumbre brutal de estimación — los entornos autoservicio pueden tomar un sprint o cuatro. Entrega primero el camino pavimentado y espera que seguridad tome el volante a mitad de proyecto.`, vi: `Việc xây nền tảng giấu độ bất định ước lượng khốc liệt — môi trường tự phục vụ có thể mất một sprint hoặc bốn. Giao "con đường trải nhựa" trước, và lường trước việc bộ phận bảo mật giành tay lái giữa dự án.` }),
            deliverables: [
              { level: 1, name: L(lang, { en: 'Must-haves', fr: 'Indispensables', es: 'Imprescindibles', vi: 'Bắt buộc phải có' }), desc: L(lang, { en: 'CI/CD templates and secrets management', fr: 'Gabarits CI/CD et gestion des secrets', es: 'Plantillas CI/CD y gestión de secretos', vi: 'Mẫu CI/CD và quản lý secrets' }), tasks: 2 },
              { level: 2, name: L(lang, { en: 'The Paved Road', fr: 'La voie pavée', es: 'El camino pavimentado', vi: 'Con đường trải nhựa' }), desc: L(lang, { en: 'IaC modules, observability, artifact registry', fr: 'Modules IaC, observabilité, registre d\u2019artefacts', es: 'Módulos IaC, observabilidad, registro de artefactos', vi: 'Mô-đun IaC, giám sát hệ thống, kho artifact' }), tasks: 3 },
              { level: 3, name: L(lang, { en: 'Force Multipliers', fr: 'Multiplicateurs', es: 'Multiplicadores de fuerza', vi: 'Nhân tố khuếch đại' }), desc: L(lang, { en: 'Self-service environments, canary deploys, cost dashboards', fr: 'Environnements libre-service, canaris, tableaux de coûts', es: 'Entornos autoservicio, despliegues canary, tableros de costos', vi: 'Môi trường tự phục vụ, triển khai canary, bảng chi phí' }), tasks: 4 },
              { level: 4, name: L(lang, { en: 'Nice-to-haves (gold-plating traps)', fr: 'Optionnels (pièges de sur-qualité)', es: 'Opcionales (trampas de sobre-ingeniería)', vi: 'Có thì tốt (bẫy mạ vàng)' }), desc: L(lang, { en: 'ChatOps, GPU pool, badges — most should be cut', fr: 'ChatOps, bassin GPU, badges — la plupart devraient être coupés', es: 'ChatOps, pool de GPU, insignias — la mayoría debería recortarse', vi: 'ChatOps, cụm GPU, huy hiệu — nên cắt phần lớn' }), tasks: 5 }
            ]
          }
          ,
          northbridge_dc: {
            context: L(lang, { en: `You are the program manager at ${selectedScenario.company}. The new automated distribution center must be live before the retail contracts take effect in 14 weeks.`, fr: `Vous gérez le programme chez ${selectedScenario.company}. Le nouveau centre de distribution automatisé doit être opérationnel avant l\u2019entrée en vigueur des contrats de détail dans 14 semaines.`, es: `Eres el gerente del programa en ${selectedScenario.company}. El nuevo centro de distribución automatizado debe estar operativo antes de que los contratos minoristas entren en vigor en 14 semanas.`, vi: `Bạn là quản lý chương trình tại ${selectedScenario.company}. Trung tâm phân phối tự động mới phải vận hành trước khi các hợp đồng bán lẻ có hiệu lực sau 14 tuần.` }),
            challenge: L(lang, { en: `WMS integration, racking, conveyors and 120 hires all converge on one go-live. Pilot-lane dry runs (prototypes) expose the integration surprises before they stop the building.`, fr: `Intégration WMS, rayonnages, convoyeurs et 120 embauches convergent vers une seule mise en service. Les essais en voie pilote (prototypes) révèlent les surprises d\u2019intégration avant qu\u2019elles n\u2019arrêtent le bâtiment.`, es: `Integración del WMS, estanterías, transportadores y 120 contrataciones convergen en un solo go-live. Los ensayos en carril piloto (prototipos) exponen las sorpresas de integración antes de que detengan el edificio.`, vi: `Tích hợp WMS, kệ chứa, băng chuyền và 120 nhân sự mới cùng đổ về một ngày go-live. Chạy thử làn thí điểm (nguyên mẫu) phơi bày các bất ngờ tích hợp trước khi chúng làm tê liệt tòa nhà.` }),
            deliverables: [
              { level: 1, name: L(lang, { en: 'Building & Systems', fr: 'Bâtiment et systèmes', es: 'Edificio y sistemas', vi: 'Tòa nhà & hệ thống' }), desc: L(lang, { en: 'Racking, conveyors, WMS installation', fr: 'Rayonnages, convoyeurs, installation du WMS', es: 'Estanterías, transportadores, instalación del WMS', vi: 'Kệ chứa, băng chuyền, lắp đặt WMS' }), tasks: 3 },
              { level: 2, name: L(lang, { en: 'Integration', fr: 'Intégration', es: 'Integración', vi: 'Tích hợp' }), desc: L(lang, { en: 'WMS-ERP flows, carrier systems, testing', fr: 'Flux WMS-ERP, systèmes transporteurs, essais', es: 'Flujos WMS-ERP, sistemas de transportistas, pruebas', vi: 'Luồng WMS-ERP, hệ thống nhà vận chuyển, kiểm thử' }), tasks: 3 },
              { level: 3, name: L(lang, { en: 'People', fr: 'Personnel', es: 'Personal', vi: 'Nhân sự' }), desc: L(lang, { en: 'Hiring, training, shift structures', fr: 'Embauche, formation, structure des quarts', es: 'Contratación, capacitación, estructura de turnos', vi: 'Tuyển dụng, đào tạo, cơ cấu ca kíp' }), tasks: 3 },
              { level: 4, name: L(lang, { en: 'Go-Live', fr: 'Mise en service', es: 'Go-live', vi: 'Go-live' }), desc: L(lang, { en: 'Pilot lanes, ramp-up, contract cutover', fr: 'Voies pilotes, montée en charge, bascule des contrats', es: 'Carriles piloto, aceleración, cutover de contratos', vi: 'Làn thí điểm, tăng công suất, chuyển giao hợp đồng' }), tasks: 3 }
            ]
          },
          peak_season: {
            context: L(lang, { en: `You lead network readiness at ${selectedScenario.company}. The holiday wave triples volume every year — this year the network has to bend, not break.`, fr: `Vous dirigez la préparation du réseau chez ${selectedScenario.company}. La vague des Fêtes triple les volumes chaque année — cette année, le réseau doit plier sans casser.`, es: `Diriges la preparación de la red en ${selectedScenario.company}. La ola navideña triplica el volumen cada año — este año la red tiene que doblarse, no romperse.`, vi: `Bạn phụ trách mức sẵn sàng của mạng lưới tại ${selectedScenario.company}. Đợt sóng lễ hội tăng gấp ba sản lượng mỗi năm — năm nay mạng lưới phải uốn cong, không được gãy.` }),
            challenge: L(lang, { en: `Ten readiness tracks with one immovable date. Carrier rates spike, retailers change forecasts, and flu season doesn\u2019t care about your drills.`, fr: `Dix chantiers de préparation, une date immuable. Les tarifs des transporteurs explosent, les détaillants changent leurs prévisions, et la saison de la grippe se moque de vos exercices.`, es: `Diez frentes de preparación con una fecha inamovible. Las tarifas de transporte se disparan, los minoristas cambian pronósticos y la temporada de gripe no respeta tus simulacros.`, vi: `Mười luồng chuẩn bị với một ngày không thể dời. Cước vận chuyển tăng vọt, nhà bán lẻ đổi dự báo, và mùa cúm chẳng quan tâm đến các buổi diễn tập của bạn.` }),
            deliverables: [
              { level: 1, name: L(lang, { en: 'Capacity', fr: 'Capacité', es: 'Capacidad', vi: 'Công suất' }), desc: L(lang, { en: 'Carrier contracts and overflow space', fr: 'Contrats transporteurs et espace de débordement', es: 'Contratos de transportistas y espacio de desborde', vi: 'Hợp đồng vận chuyển và kho dự phòng' }), tasks: 3 },
              { level: 2, name: L(lang, { en: 'Inventory', fr: 'Stocks', es: 'Inventario', vi: 'Tồn kho' }), desc: L(lang, { en: 'Pre-positioning and safety stock', fr: 'Prépositionnement et stocks de sécurité', es: 'Preposicionamiento y stock de seguridad', vi: 'Bố trí trước hàng và tồn kho an toàn' }), tasks: 2 },
              { level: 3, name: L(lang, { en: 'People', fr: 'Personnel', es: 'Personal', vi: 'Nhân sự' }), desc: L(lang, { en: 'Temp staffing and cross-training', fr: 'Personnel temporaire et polyvalence', es: 'Personal temporal y capacitación cruzada', vi: 'Nhân sự thời vụ và đào tạo chéo' }), tasks: 3 },
              { level: 4, name: L(lang, { en: 'Drills', fr: 'Exercices', es: 'Simulacros', vi: 'Diễn tập' }), desc: L(lang, { en: 'Readiness drills and contingency plans', fr: 'Exercices de préparation et plans de contingence', es: 'Simulacros de preparación y planes de contingencia', vi: 'Diễn tập sẵn sàng và phương án dự phòng' }), tasks: 2 }
            ]
          },
          cleartrack_scrum: {
            context: L(lang, { en: `You are the Product Owner at ${selectedScenario.company}. Customers threaten to leave over "where is my shipment?" — the visibility platform is the answer, and the backlog is bigger than six sprints.`, fr: `Vous êtes Product Owner chez ${selectedScenario.company}. Des clients menacent de partir à cause du « où est mon expédition ? » — la plateforme de visibilité est la réponse, et le backlog dépasse six sprints.`, es: `Eres el Product Owner en ${selectedScenario.company}. Los clientes amenazan con irse por el "¿dónde está mi envío?" — la plataforma de visibilidad es la respuesta, y el backlog es más grande que seis sprints.`, vi: `Bạn là Product Owner tại ${selectedScenario.company}. Khách hàng dọa bỏ đi vì câu "lô hàng của tôi đâu?" — nền tảng theo dõi là câu trả lời, và backlog lớn hơn sáu sprint.` }),
            challenge: L(lang, { en: `Carrier integrations and predictive ETAs hide deep uncertainty. Ship tracking first, commit to observed velocity — and when the supply chain itself breaks mid-project, welcome the change.`, fr: `Les intégrations transporteurs et les ETA prédictifs cachent une incertitude profonde. Livrez le suivi d\u2019abord, engagez-vous sur la vélocité observée — et quand la chaîne casse en cours de projet, accueillez le changement.`, es: `Las integraciones con transportistas y los ETA predictivos esconden una incertidumbre profunda. Entrega primero el tracking, comprométete según la velocidad observada — y cuando la propia cadena de suministro se rompa a mitad de proyecto, acoge el cambio.`, vi: `Tích hợp nhà vận chuyển và ETA dự đoán giấu độ bất định sâu. Giao tính năng theo dõi trước, cam kết theo velocity quan sát được — và khi chính chuỗi cung ứng đứt gãy giữa dự án, hãy đón nhận thay đổi.` }),
            deliverables: [
              { level: 1, name: L(lang, { en: 'Must-haves', fr: 'Indispensables', es: 'Imprescindibles', vi: 'Bắt buộc phải có' }), desc: L(lang, { en: 'Real-time tracking and carrier APIs', fr: 'Suivi en temps réel et API transporteurs', es: 'Tracking en tiempo real y APIs de transportistas', vi: 'Theo dõi thời gian thực và API nhà vận chuyển' }), tasks: 2 },
              { level: 2, name: L(lang, { en: 'Customer Value', fr: 'Valeur client', es: 'Valor para el cliente', vi: 'Giá trị cho khách hàng' }), desc: L(lang, { en: 'ETAs, alerts, customer portal', fr: 'ETA, alertes, portail client', es: 'ETAs, alertas, portal de clientes', vi: 'ETA, cảnh báo, cổng khách hàng' }), tasks: 3 },
              { level: 3, name: L(lang, { en: 'Network Intelligence', fr: 'Intelligence réseau', es: 'Inteligencia de red', vi: 'Trí tuệ mạng lưới' }), desc: L(lang, { en: 'Inventory view, rerouting, analytics', fr: 'Vue des stocks, réacheminement, analyses', es: 'Vista de inventario, reenrutamiento, analíticas', vi: 'Xem tồn kho, định tuyến lại, phân tích' }), tasks: 4 },
              { level: 4, name: L(lang, { en: 'Nice-to-haves (gold-plating traps)', fr: 'Optionnels (pièges de sur-qualité)', es: 'Opcionales (trampas de sobre-ingeniería)', vi: 'Có thì tốt (bẫy mạ vàng)' }), desc: L(lang, { en: 'Carbon reports, geofencing, dark mode — most should be cut', fr: 'Rapports carbone, géorepérage, mode sombre — la plupart devraient être coupés', es: 'Reportes de carbono, geocercas, modo oscuro — la mayoría debería recortarse', vi: 'Báo cáo carbon, geofencing, chế độ tối — nên cắt phần lớn' }), tasks: 5 }
            ]
          },
          launch_window: {
            context: L(lang, { en: `You are the campaign director at ${selectedScenario.company}. Solstice launches nationally in 12 weeks — retail commitments, media buys and the date are locked.`, fr: `Vous dirigez la campagne chez ${selectedScenario.company}. Solstice est lancé à l\u2019échelle nationale dans 12 semaines — engagements de détail, achats médias et date sont verrouillés.`, es: `Eres el director de campaña en ${selectedScenario.company}. Solstice se lanza a nivel nacional en 12 semanas — los compromisos minoristas, las compras de medios y la fecha están bloqueados.`, vi: `Bạn là giám đốc chiến dịch tại ${selectedScenario.company}. Solstice ra mắt toàn quốc sau 12 tuần — cam kết bán lẻ, hợp đồng truyền thông và ngày ra mắt đều đã khóa.` }),
            challenge: L(lang, { en: `Twelve campaign tracks converge on launch day. Test markets (prototypes) tell you the truth about your messaging while it\u2019s still cheap to fix — competitors and spokespeople will test everything else.`, fr: `Douze chantiers de campagne convergent vers le jour du lancement. Les marchés tests (prototypes) vous disent la vérité sur votre message pendant qu\u2019il est encore peu coûteux de corriger — les concurrents et les porte-paroles testeront tout le reste.`, es: `Doce frentes de campaña convergen en el día del lanzamiento. Los mercados de prueba (prototipos) te dicen la verdad sobre tu mensaje mientras aún es barato corregirlo — los competidores y los voceros pondrán a prueba todo lo demás.`, vi: `Mười hai luồng chiến dịch hội tụ vào ngày ra mắt. Thị trường thử nghiệm (nguyên mẫu) nói cho bạn sự thật về thông điệp khi sửa còn rẻ — đối thủ và người phát ngôn sẽ thử thách mọi thứ còn lại.` }),
            deliverables: [
              { level: 1, name: L(lang, { en: 'Brand & Creative', fr: 'Marque et création', es: 'Marca y creatividad', vi: 'Thương hiệu & sáng tạo' }), desc: L(lang, { en: 'Positioning, hero creative, packaging', fr: 'Positionnement, création vedette, emballage', es: 'Posicionamiento, creatividad principal, empaques', vi: 'Định vị, ấn phẩm chủ đạo, bao bì' }), tasks: 3 },
              { level: 2, name: L(lang, { en: 'Media', fr: 'Médias', es: 'Medios', vi: 'Truyền thông' }), desc: L(lang, { en: 'Media plan, buys, influencer program', fr: 'Plan média, achats, programme d\u2019influence', es: 'Plan de medios, compras, programa de influencers', vi: 'Kế hoạch truyền thông, booking, chương trình influencer' }), tasks: 3 },
              { level: 3, name: L(lang, { en: 'Retail', fr: 'Détail', es: 'Retail', vi: 'Bán lẻ' }), desc: L(lang, { en: 'Trade promotions, displays, sell-in', fr: 'Promotions commerciales, présentoirs, vente aux détaillants', es: 'Promociones comerciales, exhibiciones, sell-in', vi: 'Khuyến mãi thương mại, trưng bày, sell-in' }), tasks: 3 },
              { level: 4, name: L(lang, { en: 'Launch', fr: 'Lancement', es: 'Lanzamiento', vi: 'Ra mắt' }), desc: L(lang, { en: 'Launch event, PR, measurement', fr: 'Événement de lancement, RP, mesure', es: 'Evento de lanzamiento, PR, medición', vi: 'Sự kiện ra mắt, PR, đo lường' }), tasks: 3 }
            ]
          },
          rebrand_rollout: {
            context: L(lang, { en: `You are the brand PM at ${selectedScenario.company}. The new identity is approved; now it must appear everywhere at once — packaging, web, signage and 40 franchises — on reveal day.`, fr: `Vous êtes GP de marque chez ${selectedScenario.company}. La nouvelle identité est approuvée; elle doit maintenant apparaître partout en même temps — emballage, web, affichage et 40 franchises — le jour du dévoilement.`, es: `Eres el PM de marca en ${selectedScenario.company}. La nueva identidad está aprobada; ahora debe aparecer en todas partes a la vez — empaques, web, señalización y 40 franquicias — el día de la revelación.`, vi: `Bạn là PM thương hiệu tại ${selectedScenario.company}. Bộ nhận diện mới đã được duyệt; giờ nó phải xuất hiện khắp nơi cùng lúc — bao bì, web, biển hiệu và 40 cửa hàng nhượng quyền — vào ngày công bố.` }),
            challenge: L(lang, { en: `A rebrand is a logistics project wearing a design coat: vendors, franchisees, trademark lawyers and one date. Leaks and pushback are events, not disasters — if you planned for them.`, fr: `Une refonte de marque est un projet logistique en habit de design : fournisseurs, franchisés, avocats en marques et une seule date. Fuites et résistance sont des événements, pas des catastrophes — si vous les avez prévus.`, es: `Un rebranding es un proyecto de logística con abrigo de diseño: proveedores, franquiciados, abogados de marcas y una sola fecha. Las filtraciones y el rechazo son eventos, no desastres — si los planificaste.`, vi: `Tái định vị thương hiệu là một dự án hậu cần khoác áo thiết kế: nhà cung cấp, bên nhượng quyền, luật sư nhãn hiệu và một ngày duy nhất. Rò rỉ và phản đối là sự kiện, không phải thảm họa — nếu bạn đã lường trước.` }),
            deliverables: [
              { level: 1, name: L(lang, { en: 'Identity System', fr: 'Système d\u2019identité', es: 'Sistema de identidad', vi: 'Hệ thống nhận diện' }), desc: L(lang, { en: 'Guidelines, assets, templates', fr: 'Normes, actifs, gabarits', es: 'Lineamientos, activos, plantillas', vi: 'Bộ quy chuẩn, tài sản thiết kế, mẫu' }), tasks: 2 },
              { level: 2, name: L(lang, { en: 'Digital', fr: 'Numérique', es: 'Digital', vi: 'Kỹ thuật số' }), desc: L(lang, { en: 'Website, social, email re-skin', fr: 'Site web, réseaux sociaux, courriels', es: 'Sitio web, redes sociales, re-skin de email', vi: 'Website, mạng xã hội, làm mới email' }), tasks: 3 },
              { level: 3, name: L(lang, { en: 'Physical', fr: 'Physique', es: 'Físico', vi: 'Vật lý' }), desc: L(lang, { en: 'Packaging, signage, fleet, uniforms', fr: 'Emballage, affichage, flotte, uniformes', es: 'Empaques, señalización, flota, uniformes', vi: 'Bao bì, biển hiệu, đội xe, đồng phục' }), tasks: 3 },
              { level: 4, name: L(lang, { en: 'Reveal', fr: 'Dévoilement', es: 'Revelación', vi: 'Công bố' }), desc: L(lang, { en: 'Internal launch, franchise rollout, PR', fr: 'Lancement interne, déploiement franchisé, RP', es: 'Lanzamiento interno, despliegue en franquicias, PR', vi: 'Ra mắt nội bộ, triển khai nhượng quyền, PR' }), tasks: 2 }
            ]
          },
          growthlab_scrum: {
            context: L(lang, { en: `You are the Product Owner of the growth squad at ${selectedScenario.company}. Leadership wants compounding growth, not one-off stunts — and the experiment backlog dwarfs six sprints.`, fr: `Vous êtes Product Owner de l\u2019équipe croissance chez ${selectedScenario.company}. La direction veut une croissance composée, pas des coups d\u2019éclat — et le backlog d\u2019expériences dépasse largement six sprints.`, es: `Eres el Product Owner del equipo de crecimiento en ${selectedScenario.company}. La dirección quiere crecimiento compuesto, no golpes de efecto — y el backlog de experimentos empequeñece seis sprints.`, vi: `Bạn là Product Owner của đội tăng trưởng tại ${selectedScenario.company}. Lãnh đạo muốn tăng trưởng kép, không phải chiêu trò một lần — và backlog thử nghiệm vượt xa sáu sprint.` }),
            challenge: L(lang, { en: `Marketing experiments are the purest cone of uncertainty: a referral program can take one sprint or four. Build the measurement foundation first, kill vanity work ruthlessly — and when the board slashes the paid budget mid-project, welcome the change.`, fr: `Les expériences marketing sont le cône d\u2019incertitude à l\u2019état pur : un programme de parrainage peut prendre un sprint comme quatre. Construisez d\u2019abord la base de mesure, éliminez sans pitié le travail de vanité — et quand le conseil sabre le budget payant en cours de projet, accueillez le changement.`, es: `Los experimentos de marketing son el cono de incertidumbre más puro: un programa de referidos puede tomar un sprint o cuatro. Construye primero la base de medición, mata sin piedad el trabajo de vanidad — y cuando el directorio recorte el presupuesto pagado a mitad de proyecto, acoge el cambio.`, vi: `Thử nghiệm marketing là nón bất định thuần khiết nhất: chương trình giới thiệu có thể mất một sprint hoặc bốn. Xây nền đo lường trước, thẳng tay loại việc phù phiếm — và khi hội đồng cắt ngân sách quảng cáo giữa dự án, hãy đón nhận thay đổi.` }),
            deliverables: [
              { level: 1, name: L(lang, { en: 'Must-haves', fr: 'Indispensables', es: 'Imprescindibles', vi: 'Bắt buộc phải có' }), desc: L(lang, { en: 'Attribution foundation and lifecycle email', fr: 'Base d\u2019attribution et courriels de cycle de vie', es: 'Base de atribución y email de ciclo de vida', vi: 'Nền tảng attribution và email vòng đời' }), tasks: 2 },
              { level: 2, name: L(lang, { en: 'Acquisition Engines', fr: 'Moteurs d\u2019acquisition', es: 'Motores de adquisición', vi: 'Cỗ máy thu hút khách' }), desc: L(lang, { en: 'A/B engine, paid social, SEO content', fr: 'Moteur A/B, social payant, contenu SEO', es: 'Motor de A/B, paid social, contenido SEO', vi: 'Bộ máy A/B, quảng cáo mạng xã hội, nội dung SEO' }), tasks: 3 },
              { level: 3, name: L(lang, { en: 'Multipliers', fr: 'Multiplicateurs', es: 'Multiplicadores', vi: 'Nhân tố khuếch đại' }), desc: L(lang, { en: 'Referral, CRM, creators, video', fr: 'Parrainage, CRM, créateurs, vidéo', es: 'Referidos, CRM, creadores, video', vi: 'Giới thiệu, CRM, nhà sáng tạo, video' }), tasks: 4 },
              { level: 4, name: L(lang, { en: 'Nice-to-haves (gold-plating traps)', fr: 'Optionnels (pièges de sur-qualité)', es: 'Opcionales (trampas de sobre-ingeniería)', vi: 'Có thì tốt (bẫy mạ vàng)' }), desc: L(lang, { en: 'Podcast, merch, vanity dashboards — most should be cut', fr: 'Balado, articles promo, tableaux de vanité — la plupart devraient être coupés', es: 'Podcast, merch, tableros de vanidad — la mayoría debería recortarse', vi: 'Podcast, đồ lưu niệm, bảng số liệu phù phiếm — nên cắt phần lớn' }), tasks: 5 }
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
            <button className="back-link" onClick={() => { setSimPhase('select'); setBriefTab('brief'); }}>← {L(lang, { en: 'Back to Scenarios', fr: 'Retour aux scénarios', es: 'Volver a los escenarios', vi: 'Về danh sách kịch bản' })}</button>
            
            <div className="brief-header">
              <div className="brief-icon">{selectedScenario.icon}</div>
              <div>
                <h1 style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>{selectedScenario.projectName} <MethodologyBadge scenario={selectedScenario} lang={lang} /></h1>
                <p className="brief-company">{selectedScenario.company}</p>
              </div>
            </div>

            {/* Anna - AI PM Advisor Introduction */}
            <div className="anna-intro">
              <div className="anna-intro-glow"></div>
              <div className="anna-header">
                {annaAvatar()}
                <div>
                  <div className="anna-name">{L(lang, { en: 'ANNA — Your PM Coach', fr: 'ANNA — Votre Coach GP', es: 'ANNA — Tu coach de gestión de proyectos', vi: 'ANNA — Huấn luyện viên QLDA của bạn' })}</div>
                  <div className="anna-title">{L(lang, { en: 'AI Project Management Advisor', fr: 'Conseillère IA en gestion de projet', es: 'Asesora de gestión de proyectos con IA', vi: 'Cố vấn quản lý dự án bằng AI' })}</div>
                </div>
              </div>
              <div className="anna-speech">
                <p>
                  {L(lang, { en: `Welcome, Project Manager. I'm Anna, and I'll be your advisor throughout this simulation. You're about to take the helm of "${selectedScenario.projectName}" at ${selectedScenario.company} — and I've seen projects like this go both ways.`, fr: `Bienvenue, Gestionnaire de projet. Je suis Anna, et je serai votre conseillère tout au long de cette simulation. Vous êtes sur le point de prendre les commandes de « ${selectedScenario.projectName} » chez ${selectedScenario.company} — et j'ai vu des projets comme celui-ci aller dans les deux sens.`, es: `Bienvenido, gerente de proyectos. Soy Anna y seré tu asesora durante esta simulación. Estás por tomar el timón de "${selectedScenario.projectName}" en ${selectedScenario.company} — y he visto proyectos como este salir bien y salir mal.`, vi: `Chào mừng, Giám đốc dự án. Tôi là Anna, cố vấn của bạn trong suốt phiên mô phỏng này. Bạn sắp cầm lái "${selectedScenario.projectName}" tại ${selectedScenario.company} — và tôi đã thấy những dự án thế này đi theo cả hai hướng.` })}
                </p>
                <div className="anna-highlight">
                  {L(lang, { en: `💡 Remember the triple constraint: scope, schedule, and budget are interconnected. Push one, and the others will push back. The best PMs I've coached find the balance — they don't chase perfection on all three.`, fr: `💡 Rappelez-vous la triple contrainte : périmètre, calendrier et budget sont interconnectés. Poussez l'un, et les autres résisteront. Les meilleurs GP que j'ai coachés trouvent l'équilibre — ils ne recherchent pas la perfection sur les trois.`, es: `💡 Recuerda la triple restricción: alcance, cronograma y presupuesto están interconectados. Presiona uno y los otros presionarán de vuelta. Los mejores PMs que he entrenado encuentran el equilibrio — no persiguen la perfección en los tres.`, vi: `💡 Hãy nhớ ràng buộc tam giác: phạm vi, tiến độ và ngân sách gắn chặt với nhau. Đẩy một cái, những cái còn lại sẽ đẩy ngược. Những PM giỏi nhất tôi từng huấn luyện tìm được điểm cân bằng — họ không theo đuổi sự hoàn hảo ở cả ba.` })}
                </div>
                <p>
                  {L(lang, { en: `I'll be available throughout the simulation — just click "Ask Anna" whenever you need strategic guidance. Read the brief carefully, understand your objectives, and let's deliver this project. You've got this.`, fr: `Je serai disponible tout au long de la simulation — cliquez simplement sur « Demander à Anna » chaque fois que vous avez besoin de conseils stratégiques. Lisez attentivement le dossier, comprenez vos objectifs, et livrons ce projet. Vous êtes capable.`, es: `Estaré disponible durante toda la simulación — haz clic en "Pregunta a Anna" cuando necesites orientación estratégica. Lee el brief con cuidado, entiende tus objetivos y entreguemos este proyecto. Tú puedes.`, vi: `Tôi luôn sẵn sàng trong suốt mô phỏng — chỉ cần nhấn "Hỏi Anna" khi bạn cần định hướng chiến lược. Đọc kỹ bản tóm tắt, hiểu rõ mục tiêu, và cùng nhau hoàn thành dự án này. Bạn làm được.` })}
                </p>
              </div>
            </div>

            {/* HBP-Style Tabs */}
            <div className="brief-tabs">
              <button 
                className={`brief-tab ${briefTab === 'brief' ? 'active' : ''}`}
                onClick={() => setBriefTab('brief')}
              >
                {L(lang, { en: 'Project Brief', fr: 'Dossier du projet', es: 'Brief del proyecto', vi: 'Tóm tắt dự án' })}
              </button>
              <button 
                className={`brief-tab ${briefTab === 'objectives' ? 'active' : ''}`}
                onClick={() => setBriefTab('objectives')}
              >
                {L(lang, { en: 'Scenario Objectives', fr: 'Objectifs du scénario', es: 'Objetivos del escenario', vi: 'Mục tiêu kịch bản' })}
              </button>
              <button 
                className={`brief-tab ${briefTab === 'managing' ? 'active' : ''}`}
                onClick={() => setBriefTab('managing')}
              >
                {L(lang, { en: 'Managing Your Project', fr: 'Gérer votre projet', es: 'Gestionando tu proyecto', vi: 'Quản lý dự án của bạn' })}
              </button>
            </div>

            <div className="brief-tab-content">
              {/* Project Brief Tab */}
              {briefTab === 'brief' && (
                <div className="tab-panel">
                  <h2>{L(lang, { en: 'Project Brief', fr: 'Dossier du projet', es: 'Brief del proyecto', vi: 'Tóm tắt dự án' })}: <span className="highlight">{selectedScenario.title}</span></h2>
                  
                  <p className="brief-paragraph">{brief.context}</p>
                  <p className="brief-paragraph">{brief.challenge}</p>

                  <h3>{L(lang, { en: 'Project Deliverables', fr: 'Livrables du projet', es: 'Entregables del proyecto', vi: 'Sản phẩm bàn giao của dự án' })}</h3>
                  <p>{L(lang, { en: `Your project consists of ${selectedScenario.initial.scope} ${selectedScenario.deliverable} organized into progressive levels. Each level builds on the previous, allowing you to adjust scope mid-course if desired.`, fr: `Votre projet consiste en ${selectedScenario.initial.scope} ${selectedScenario.deliverable} organisés en niveaux progressifs. Chaque niveau s'appuie sur le précédent, vous permettant d'ajuster le périmètre en cours de route si désiré.`, es: `Tu proyecto consta de ${selectedScenario.initial.scope} ${selectedScenario.deliverable} organizados en niveles progresivos. Cada nivel se apoya en el anterior, lo que permite ajustar el alcance a mitad de camino si lo deseas.`, vi: `Dự án của bạn gồm ${selectedScenario.initial.scope} ${selectedScenario.deliverable} sắp xếp theo các cấp độ lũy tiến. Mỗi cấp dựa trên cấp trước, cho phép điều chỉnh phạm vi giữa chừng nếu muốn.` })}</p>
                  
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

              {/* Scenario Objectives Tab — SCRUM version */}
              {briefTab === 'objectives' && selectedScenario.framework === 'scrum' && (
                <div className="tab-panel">
                  <h2>{L(lang, { en: 'Scenario Objectives', fr: 'Objectifs du scénario', es: 'Objetivos del escenario', vi: 'Mục tiêu kịch bản' })}: <span className="highlight">{selectedScenario.title}</span></h2>
                  <p className="brief-paragraph">
                    {L(lang, { en: 'This is an AGILE scenario — the scoring is deliberately different from the other simulations. There is no penalty for re-planning and no bonus for protecting the original plan. You are evaluated on delivering VALUE early, committing realistically, honouring your Definition of Done, and keeping a sustainable pace.', fr: 'Ceci est un scénario AGILE — la notation est délibérément différente des autres simulations. Il n\'y a aucune pénalité pour la re-planification et aucun bonus pour la protection du plan initial. Vous êtes évalué sur la livraison de VALEUR tôt, des engagements réalistes, le respect de votre définition de terminé, et un rythme soutenable.', es: 'Este es un escenario ÁGIL — la puntuación es deliberadamente distinta de las otras simulaciones. No hay penalización por re-planificar ni bono por proteger el plan original. Se te evalúa por entregar VALOR temprano, comprometerte de forma realista, honrar tu Definition of Done y mantener un ritmo sostenible.', vi: 'Đây là kịch bản AGILE — cách chấm điểm cố ý khác các mô phỏng còn lại. Không có phạt khi lập lại kế hoạch, không có thưởng khi bám kế hoạch gốc. Bạn được đánh giá bằng việc giao GIÁ TRỊ sớm, cam kết thực tế, tôn trọng Definition of Done và giữ nhịp độ bền vững.' })}
                  </p>
                  <div className="objectives-section">
                    <h3>{L(lang, { en: 'Scoring — 1000 points', fr: 'Notation — 1000 points', es: 'Puntuación — 1000 puntos', vi: 'Chấm điểm — 1000 điểm' })}</h3>
                    <div className="objective-block">
                      <h4>💎 {L(lang, { en: 'Business Value Delivered', fr: 'Valeur d\'affaires livrée', es: 'Valor de negocio entregado', vi: 'Giá trị kinh doanh đã giao' })}: <span className="highlight">300</span></h4>
                      <p>{L(lang, { en: 'Ship the highest-value increment — not the most items. The backlog holds far more value than six sprints can deliver; choosing what NOT to build is the game.', fr: 'Livrez l\'incrément de plus grande valeur — pas le plus d\'éléments. Le backlog contient bien plus de valeur que six sprints ne peuvent en livrer; choisir ce qu\'il ne faut PAS construire est le jeu.', es: 'Entrega el incremento de mayor valor — no la mayor cantidad de ítems. El backlog contiene mucho más valor del que seis sprints pueden entregar; elegir qué NO construir es el juego.', vi: 'Giao phần tăng trưởng giá trị nhất — không phải nhiều hạng mục nhất. Backlog chứa nhiều giá trị hơn hẳn những gì sáu sprint có thể giao; chọn thứ KHÔNG làm chính là trò chơi.' })}</p>
                    </div>
                    <div className="objective-block">
                      <h4>📏 {L(lang, { en: 'Sprint Predictability', fr: 'Prévisibilité des sprints', es: 'Predictibilidad del sprint', vi: 'Độ dự đoán được của sprint' })}: <span className="highlight">150</span></h4>
                      <p>{L(lang, { en: 'Completed ÷ committed, close to 1.0. Over-committing causes carryover, stress and morale loss; under-committing wastes capacity. Commit to your observed velocity.', fr: 'Réalisé ÷ engagé, proche de 1,0. Le sur-engagement cause reports, stress et perte de moral; le sous-engagement gaspille la capacité. Engagez-vous sur votre vélocité observée.', es: 'Completado ÷ comprometido, cerca de 1.0. Comprometerse de más causa arrastre, estrés y pérdida de moral; comprometerse de menos desperdicia capacidad. Comprométete según tu velocidad observada.', vi: 'Hoàn thành ÷ cam kết, càng gần 1.0 càng tốt. Cam kết quá tay gây dời việc, căng thẳng và giảm tinh thần; cam kết quá ít lãng phí năng lực. Hãy cam kết theo velocity quan sát được.' })}</p>
                    </div>
                    <div className="objective-block">
                      <h4>⭐ {L(lang, { en: 'Quality / Definition of Done', fr: 'Qualité / Définition de terminé', es: 'Calidad / Definition of Done', vi: 'Chất lượng / Definition of Done' })}: <span className="highlight">200</span></h4>
                      <p>{L(lang, { en: 'Quality erodes under delivery pressure. Below 70, latent defects escape and claw back booked value at the next demo — "done" must mean done.', fr: 'La qualité s\'érode sous la pression de livraison. Sous 70, des défauts latents s\'échappent et retranchent de la valeur à la démo suivante — « terminé » doit vouloir dire terminé.', es: 'La calidad se erosiona bajo presión de entrega. Debajo de 70, los defectos latentes escapan y restan valor registrado en la siguiente demo — "hecho" debe significar hecho.', vi: 'Chất lượng bào mòn dưới áp lực giao hàng. Dưới 70, lỗi tiềm ẩn sẽ lọt ra và lấy lại giá trị đã ghi nhận ở buổi demo sau — "xong" phải thật sự là xong.' })}</p>
                    </div>
                    <div className="objective-block">
                      <h4>🔄 {L(lang, { en: 'Responsiveness to Change', fr: 'Réactivité au changement', es: 'Respuesta al cambio', vi: 'Khả năng ứng biến với thay đổi' })}: <span className="highlight">150</span></h4>
                      <p>{L(lang, { en: 'Mid-project, priorities will shift. Absorbing the change by re-prioritising scores best; clinging to the original plan scores worst.', fr: 'En cours de projet, les priorités changeront. Absorber le changement en re-priorisant rapporte le plus; s\'accrocher au plan initial rapporte le moins.', es: 'A mitad de proyecto, las prioridades cambiarán. Absorber el cambio re-priorizando puntúa mejor; aferrarse al plan original puntúa peor.', vi: 'Giữa dự án, ưu tiên sẽ thay đổi. Hấp thụ thay đổi bằng cách sắp xếp lại ưu tiên được điểm cao nhất; bám cứng kế hoạch gốc bị điểm thấp nhất.' })}</p>
                    </div>
                    <div className="objective-block">
                      <h4>👥 {L(lang, { en: 'Team Health (sustainable pace)', fr: 'Santé de l\'équipe (rythme soutenable)', es: 'Salud del equipo (ritmo sostenible)', vi: 'Sức khỏe đội nhóm (nhịp độ bền vững)' })}: <span className="highlight">150</span></h4>
                      <p>{L(lang, { en: 'Average morale, minus a penalty for every crunch. Crunch borrows velocity from future sprints — the causal engine will collect the debt.', fr: 'Moral moyen, moins une pénalité pour chaque mode intensif. Le crunch emprunte de la vélocité aux sprints futurs — le moteur causal collectera la dette.', es: 'Moral promedio, menos una penalización por cada crunch. El crunch toma prestada velocidad de sprints futuros — el motor causal cobrará la deuda.', vi: 'Tinh thần trung bình, trừ điểm phạt cho mỗi lần tăng tốc. Tăng tốc là vay velocity của các sprint sau — cỗ máy nhân quả sẽ đến đòi nợ.' })}</p>
                    </div>
                    <div className="objective-block">
                      <h4>💰 {L(lang, { en: 'Budget Discipline (target band)', fr: 'Discipline budgétaire (bande cible)', es: 'Disciplina presupuestaria (banda objetivo)', vi: 'Kỷ luật ngân sách (vùng mục tiêu)' })}: <span className="highlight">50</span></h4>
                      <p>{L(lang, { en: 'Full marks for spending 80–100% of budget. Hoarding unspent budget scores nothing here.', fr: 'Note maximale pour dépenser 80–100% du budget. Thésauriser le budget ne rapporte rien ici.', es: 'Puntaje completo por gastar 80–100% del presupuesto. Acumular presupuesto sin gastar no puntúa aquí.', vi: 'Điểm tối đa khi chi 80–100% ngân sách. Găm ngân sách không tiêu không được điểm ở đây.' })}</p>
                    </div>
                  </div>
                  <div className="scoring-summary">
                    <h4>📊 {L(lang, { en: 'Total Possible Score: 1000 points', fr: 'Score total possible : 1000 points', es: 'Puntaje máximo posible: 1000 puntos', vi: 'Tổng điểm tối đa: 1000 điểm' })}</h4>
                    <div className="score-breakdown">
                      <span>{L(lang, { en: 'Value', fr: 'Valeur', es: 'Valor', vi: 'Giá trị' })}: 300</span>
                      <span>{L(lang, { en: 'Predictability', fr: 'Prévisibilité', es: 'Predictibilidad', vi: 'Độ dự đoán được' })}: 150</span>
                      <span>{L(lang, { en: 'Quality', fr: 'Qualité', es: 'Calidad', vi: 'Chất lượng' })}: 200</span>
                      <span>{L(lang, { en: 'Responsiveness', fr: 'Réactivité', es: 'Respuesta al cambio', vi: 'Ứng biến' })}: 150</span>
                      <span>{L(lang, { en: 'Team', fr: 'Équipe', es: 'Equipo', vi: 'Đội nhóm' })}: 150</span>
                      <span>Budget: 50</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Scenario Objectives Tab */}
              {briefTab === 'objectives' && selectedScenario.framework !== 'scrum' && (
                <div className="tab-panel">
                  <h2>{L(lang, { en: 'Scenario Objectives', fr: 'Objectifs du scénario', es: 'Objetivos del escenario', vi: 'Mục tiêu kịch bản' })}: <span className="highlight">{selectedScenario.title}</span></h2>
                  
                  <p className="brief-paragraph">
                    {L(lang, { en: 'Management expects you to deliver this project meeting the targets below. You will be evaluated on your ability to balance scope, schedule, budget, quality, and team wellbeing. Meeting all targets demonstrates strong project management capability.', fr: 'La direction s\'attend à ce que vous livriez ce projet en atteignant les objectifs ci-dessous. Vous serez évalué sur votre capacité à équilibrer le périmètre, le calendrier, le budget, la qualité et le bien-être de l\'équipe. Atteindre tous les objectifs démontre une forte capacité de gestion de projet.', es: 'La dirección espera que entregues este proyecto cumpliendo las metas de abajo. Se te evaluará por tu capacidad de equilibrar alcance, cronograma, presupuesto, calidad y bienestar del equipo. Cumplir todas las metas demuestra una sólida capacidad de gestión de proyectos.', vi: 'Ban lãnh đạo kỳ vọng bạn hoàn thành dự án đạt các chỉ tiêu bên dưới. Bạn được đánh giá bằng khả năng cân bằng phạm vi, tiến độ, ngân sách, chất lượng và sức khỏe đội nhóm. Đạt mọi chỉ tiêu chứng tỏ năng lực quản lý dự án vững vàng.' })}
                  </p>

                  <div className="objectives-section">
                    <h3>{L(lang, { en: 'Specific Objectives', fr: 'Objectifs spécifiques', es: 'Objetivos específicos', vi: 'Mục tiêu cụ thể' })}</h3>

                    <div className="objective-block">
                      <h4>{L(lang, { en: 'Target Scope', fr: 'Périmètre cible', es: 'Alcance objetivo', vi: 'Phạm vi mục tiêu' })}: <span className="highlight">{selectedScenario.initial.scope} {selectedScenario.deliverable}</span></h4>
                      <p>
                        {L(lang, { en: 'You will receive up to 200 points for delivering the full scope. Partial completion will result in proportionally fewer points. Exceeding scope expectations may earn bonus points but watch the budget.', fr: 'Vous recevrez jusqu\'à 200 points pour livrer le périmètre complet. Une complétion partielle donnera proportionnellement moins de points. Dépasser les attentes de périmètre peut donner des points bonus mais surveillez le budget.', es: 'Recibirás hasta 200 puntos por entregar el alcance completo. La finalización parcial dará proporcionalmente menos puntos. Superar el alcance puede dar puntos extra, pero cuida el presupuesto.', vi: 'Bạn nhận tối đa 200 điểm khi giao đủ phạm vi. Hoàn thành một phần sẽ được điểm theo tỷ lệ. Vượt phạm vi có thể được điểm thưởng nhưng hãy coi chừng ngân sách.' })}
                      </p>
                    </div>

                    <div className="objective-block">
                      <h4>{L(lang, { en: 'Target Schedule', fr: 'Calendrier cible', es: 'Cronograma objetivo', vi: 'Tiến độ mục tiêu' })}: <span className="highlight">{L(lang, { en: 'Week', fr: 'Semaine', es: 'Semana', vi: 'Tuần' })} {selectedScenario.initial.weeks}</span></h4>
                      <p>
                        {L(lang, { en: 'This schedule allows you to meet stakeholder expectations and market timing. You will receive 200 points for meeting your schedule goal and lose 40 points for each week you exceed the deadline.', fr: 'Ce calendrier vous permet de répondre aux attentes des parties prenantes et au timing du marché. Vous recevrez 200 points si vous respectez votre objectif de calendrier et perdrez 40 points pour chaque semaine de dépassement.', es: 'Este cronograma te permite cumplir las expectativas de los interesados y el timing de mercado. Recibirás 200 puntos por cumplir tu meta de cronograma y perderás 40 puntos por cada semana que excedas la fecha límite.', vi: 'Tiến độ này giúp bạn đáp ứng kỳ vọng các bên liên quan và thời điểm thị trường. Bạn nhận 200 điểm khi đạt mục tiêu tiến độ và mất 40 điểm cho mỗi tuần trễ hạn.' })}
                      </p>
                    </div>

                    <div className="objective-block">
                      <h4>{L(lang, { en: 'Target Budget', fr: 'Budget cible', es: 'Presupuesto objetivo', vi: 'Ngân sách mục tiêu' })}: <span className="highlight">${(selectedScenario.initial.budget / 1000).toFixed(0)}K</span></h4>
                      <p>
                        {L(lang, { en: 'This budget supports the project at planned staffing levels. You will receive up to 200 points for staying within budget. Coming in under budget will maximize your score.', fr: 'Ce budget supporte le projet aux niveaux de dotation prévus. Vous recevrez jusqu\'à 200 points si vous restez dans le budget. Terminer sous le budget maximisera votre score.', es: 'Este presupuesto sostiene el proyecto con la dotación planificada. Recibirás hasta 200 puntos por mantenerte dentro del presupuesto. Terminar por debajo del presupuesto maximizará tu puntaje.', vi: 'Ngân sách này đủ cho dự án ở mức nhân sự theo kế hoạch. Bạn nhận tối đa 200 điểm khi giữ trong ngân sách. Chi dưới ngân sách sẽ tối đa hóa điểm số.' })}
                      </p>
                    </div>

                    <div className="objective-block">
                      <h4>{L(lang, { en: 'Target Quality', fr: 'Qualité cible', es: 'Calidad objetivo', vi: 'Chất lượng mục tiêu' })}: <span className="highlight">{selectedScenario.initial.quality}%+</span></h4>
                      <p>
                        {L(lang, { en: 'Deliver a high-quality product that meets stakeholder standards. Quality is worth 200 points and can be improved through quality reviews and avoiding shortcuts.', fr: 'Livrez un produit de haute qualité qui répond aux standards des parties prenantes. La qualité vaut 200 points et peut être améliorée par des revues de qualité et en évitant les raccourcis.', es: 'Entrega un producto de alta calidad que cumpla los estándares de los interesados. La calidad vale 200 puntos y puede mejorarse con revisiones de calidad y evitando atajos.', vi: 'Giao sản phẩm chất lượng cao đạt chuẩn các bên liên quan. Chất lượng đáng giá 200 điểm và có thể cải thiện qua đánh giá chất lượng và tránh đi tắt.' })}
                      </p>
                    </div>

                    <div className="objective-block">
                      <h4>{L(lang, { en: 'Team Process', fr: 'Processus d\'équipe', es: 'Proceso de equipo', vi: 'Quy trình đội nhóm' })}: <span className="highlight">100 points</span></h4>
                      <p>
                        {L(lang, { en: 'Maintain healthy team dynamics throughout the project. This score reflects average morale, with bonuses for schedule consistency and prototype usage.', fr: 'Maintenez une dynamique d\'équipe saine tout au long du projet. Ce score reflète le moral moyen, avec des bonus pour la cohérence du calendrier et l\'utilisation de prototypes.', es: 'Mantén una dinámica de equipo saludable durante todo el proyecto. Este puntaje refleja la moral promedio, con bonos por consistencia de cronograma y uso de prototipos.', vi: 'Duy trì đội nhóm lành mạnh suốt dự án. Điểm này phản ánh tinh thần trung bình, có thưởng cho tiến độ ổn định và việc dùng nguyên mẫu.' })}
                      </p>
                    </div>
                  </div>

                  <div className="scoring-summary">
                    <h4>📊 {L(lang, { en: 'Total Possible Score: 1000 points', fr: 'Score total possible: 1000 points', es: 'Puntaje máximo posible: 1000 puntos', vi: 'Tổng điểm tối đa: 1000 điểm' })}</h4>
                    <div className="score-breakdown">
                      <span>{L(lang, { en: 'Scope', fr: 'Périmètre', es: 'Alcance', vi: 'Phạm vi' })}: 200</span>
                      <span>{L(lang, { en: 'Schedule', fr: 'Calendrier', es: 'Cronograma', vi: 'Tiến độ' })}: 200</span>
                      <span>{L(lang, { en: 'Budget', fr: 'Budget', es: 'Presupuesto', vi: 'Ngân sách' })}: 200</span>
                      <span>{L(lang, { en: 'Quality', fr: 'Qualité', es: 'Calidad', vi: 'Chất lượng' })}: 200</span>
                      <span>{L(lang, { en: 'Team Process', fr: 'Processus d\'équipe', es: 'Proceso de equipo', vi: 'Quy trình đội nhóm' })}: 100</span>
                      <span>{L(lang, { en: 'Bonuses: up to 100', fr: 'Bonus: jusqu\'à 100', es: 'Bonos: hasta 100', vi: 'Thưởng: tối đa 100' })}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Managing Your Project Tab — SCRUM version */}
              {briefTab === 'managing' && selectedScenario.framework === 'scrum' && (
                <div className="tab-panel">
                  <h2>{L(lang, { en: 'Managing Your Sprints', fr: 'Gérer vos sprints', es: 'Gestionando tus sprints', vi: 'Quản lý các sprint của bạn' })}: <span className="highlight">{selectedScenario.title}</span></h2>
                  <p className="brief-paragraph">
                    {L(lang, { en: 'The unit of play is a SPRINT (2 weeks), not a week. Each sprint runs the full Scrum loop — and the causal engine (stress → morale → productivity → rework) runs underneath it.', fr: 'L\'unité de jeu est un SPRINT (2 semaines), pas une semaine. Chaque sprint déroule la boucle Scrum complète — et le moteur causal (stress → moral → productivité → reprises) fonctionne en dessous.', es: 'La unidad de juego es un SPRINT (2 semanas), no una semana. Cada sprint recorre el ciclo Scrum completo — y el motor causal (estrés → moral → productividad → retrabajo) corre por debajo.', vi: 'Đơn vị chơi là một SPRINT (2 tuần), không phải tuần. Mỗi sprint chạy trọn vòng Scrum — và cỗ máy nhân quả (căng thẳng → tinh thần → năng suất → làm lại) vận hành bên dưới.' })}
                  </p>
                  <div className="managing-section">
                    <h3>{L(lang, { en: '1. The Sprint Loop', fr: '1. La boucle de sprint', es: '1. El ciclo del sprint', vi: '1. Vòng lặp sprint' })}</h3>
                    <div className="causal-relationships">
                      <div className="causal-item">
                        <span className="causal-icon">🗓</span>
                        <div>
                          <strong>{L(lang, { en: 'Sprint Planning', fr: 'Planification du sprint', es: 'Planificación del sprint', vi: 'Lập kế hoạch sprint' })}</strong>
                          <p>{L(lang, { en: 'Pull backlog items until committed points reach your expected velocity ("yesterday\'s weather" — last sprint\'s completed points). This is the key decision each sprint. Refine the backlog first to shrink estimate uncertainty.', fr: 'Tirez des éléments du backlog jusqu\'à ce que les points engagés atteignent votre vélocité attendue (la « météo d\'hier » — les points réalisés au dernier sprint). C\'est la décision clé de chaque sprint. Raffinez d\'abord le backlog pour réduire l\'incertitude des estimations.', es: 'Toma ítems del backlog hasta que los puntos comprometidos alcancen tu velocidad esperada (el "clima de ayer" — los puntos completados del sprint anterior). Esta es la decisión clave de cada sprint. Refina primero el backlog para reducir la incertidumbre de estimación.', vi: 'Kéo hạng mục backlog đến khi điểm cam kết chạm velocity kỳ vọng ("thời tiết hôm qua" — điểm hoàn thành của sprint trước). Đây là quyết định then chốt mỗi sprint. Tinh chỉnh backlog trước để thu hẹp bất định ước lượng.' })}</p>
                        </div>
                      </div>
                      <div className="causal-item">
                        <span className="causal-icon">⚡</span>
                        <div>
                          <strong>{L(lang, { en: 'Execution (2 weeks)', fr: 'Exécution (2 semaines)', es: 'Ejecución (2 semanas)', vi: 'Thực thi (2 tuần)' })}</strong>
                          <p>{L(lang, { en: 'True item sizes are revealed (the cone of uncertainty). The causal engine converts your team state into completed points. Weekly actions: standups, DoD focus, coaching, team building — and crunch, if you must.', fr: 'Les tailles réelles des éléments sont révélées (le cône d\'incertitude). Le moteur causal convertit l\'état de votre équipe en points réalisés. Actions hebdomadaires : mêlées, accent DoD, coaching, consolidation — et le mode intensif, si vous devez.', es: 'Se revelan los tamaños reales de los ítems (el cono de incertidumbre). El motor causal convierte el estado de tu equipo en puntos completados. Acciones semanales: standups, enfoque DoD, coaching, cohesión — y crunch, si no queda otra.', vi: 'Kích cỡ thật của hạng mục lộ diện (nón bất định). Cỗ máy nhân quả chuyển trạng thái đội nhóm thành điểm hoàn thành. Hành động hằng tuần: standup, tập trung DoD, huấn luyện, gắn kết — và tăng tốc, nếu buộc phải.' })}</p>
                        </div>
                      </div>
                      <div className="causal-item">
                        <span className="causal-icon">🎬</span>
                        <div>
                          <strong>{L(lang, { en: 'Sprint Review / Demo', fr: 'Revue de sprint / Démo', es: 'Revisión del sprint / Demo', vi: 'Đánh giá sprint / Demo' })}</strong>
                          <p>{L(lang, { en: 'Only FINISHED items book their business value. Unfinished work carries over — and chronic carryover spirals into morale loss. Stakeholder feedback may re-rank the backlog.', fr: 'Seuls les éléments TERMINÉS comptabilisent leur valeur. Le travail inachevé est reporté — et le report chronique dégénère en perte de moral. Les retours des parties prenantes peuvent reclasser le backlog.', es: 'Solo los ítems TERMINADOS registran su valor de negocio. El trabajo sin terminar se arrastra — y el arrastre crónico espirala en pérdida de moral. El feedback de los interesados puede re-ordenar el backlog.', vi: 'Chỉ hạng mục HOÀN TẤT mới ghi nhận giá trị kinh doanh. Việc dở dang bị dời lại — dời lại kinh niên xoáy thành mất tinh thần. Phản hồi các bên liên quan có thể xếp lại backlog.' })}</p>
                        </div>
                      </div>
                      <div className="causal-item">
                        <span className="causal-icon">🔄</span>
                        <div>
                          <strong>{L(lang, { en: 'Retrospective', fr: 'Rétrospective', es: 'Retrospectiva', vi: 'Cải tiến sprint' })}</strong>
                          <p>{L(lang, { en: 'Pick ONE improvement per sprint. Effects compound across remaining sprints — continuous improvement is your highest-leverage mechanic.', fr: 'Choisissez UNE amélioration par sprint. Les effets se composent sur les sprints restants — l\'amélioration continue est votre mécanique au plus fort levier.', es: 'Elige UNA mejora por sprint. Los efectos se acumulan en los sprints restantes — la mejora continua es tu mecánica de mayor palanca.', vi: 'Chọn MỘT cải tiến mỗi sprint. Hiệu quả cộng dồn qua các sprint còn lại — cải tiến liên tục là cơ chế đòn bẩy cao nhất của bạn.' })}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="managing-section">
                    <h3>{L(lang, { en: '2. Events & The Pivot', fr: '2. Événements et le pivot', es: '2. Eventos y el pivote', vi: '2. Sự kiện & cú xoay trục' })}</h3>
                    <p>{L(lang, { en: 'Events are consequences of your decisions, not dice rolls: sustained high stress can knock out a key engineer; skipping quality lets latent defects surface at a later demo; chronic over-commitment triggers a carryover spiral. And at Sprint 3, the investor WILL pivot — welcome changing requirements.', fr: 'Les événements sont des conséquences de vos décisions, pas des coups de dés : un stress élevé et soutenu peut mettre un ingénieur clé hors service; négliger la qualité laisse des défauts latents émerger à une démo ultérieure; le sur-engagement chronique déclenche une spirale de report. Et au sprint 3, l\'investisseur VA pivoter — accueillez le changement.', es: 'Los eventos son consecuencias de tus decisiones, no tiradas de dados: el estrés alto sostenido puede tumbar a un ingeniero clave; saltarse la calidad deja que defectos latentes aparezcan en una demo posterior; el sobre-compromiso crónico dispara una espiral de arrastre. Y en el Sprint 3, el inversionista VA a pivotar — acoge los cambios de requisitos.', vi: 'Sự kiện là hệ quả từ quyết định của bạn, không phải gieo xúc xắc: căng thẳng cao kéo dài có thể quật ngã kỹ sư chủ chốt; bỏ qua chất lượng để lỗi tiềm ẩn bung ra ở demo sau; cam kết quá tay kinh niên kích hoạt vòng xoáy dời việc. Và ở Sprint 3, nhà đầu tư CHẮC CHẮN xoay trục — hãy đón nhận thay đổi yêu cầu.' })}</p>
                  </div>
                </div>
              )}

              {/* Managing Your Project Tab */}
              {briefTab === 'managing' && selectedScenario.framework !== 'scrum' && (
                <div className="tab-panel">
                  <h2>{L(lang, { en: 'Managing Your Project', fr: 'Gérer votre projet', es: 'Gestionando tu proyecto', vi: 'Quản lý dự án của bạn' })}: <span className="highlight">{selectedScenario.title}</span></h2>
                  
                  <p className="brief-paragraph">
                    {L(lang, { en: 'Each week you will have opportunities to adjust project parameters and make decisions. Understanding the causal relationships in your project will help you make better choices.', fr: 'Chaque semaine, vous aurez l\'opportunité d\'ajuster les paramètres du projet et de prendre des décisions. Comprendre les relations causales dans votre projet vous aidera à faire de meilleurs choix.', es: 'Cada semana tendrás oportunidades de ajustar parámetros del proyecto y tomar decisiones. Entender las relaciones causales de tu proyecto te ayudará a decidir mejor.', vi: 'Mỗi tuần bạn có cơ hội điều chỉnh tham số dự án và ra quyết định. Hiểu các quan hệ nhân quả trong dự án giúp bạn lựa chọn tốt hơn.' })}
                  </p>

                  <div className="managing-section">
                    <h3>{L(lang, { en: '1. The Causal Model', fr: '1. Le modèle causal', es: '1. El modelo causal', vi: '1. Mô hình nhân quả' })}</h3>
                    <p>{L(lang, { en: 'This simulation uses interconnected systems where your decisions have cascading effects:', fr: 'Cette simulation utilise des systèmes interconnectés où vos décisions ont des effets en cascade:', es: 'Esta simulación usa sistemas interconectados donde tus decisiones tienen efectos en cascada:', vi: 'Mô phỏng này dùng các hệ thống liên kết, nơi quyết định của bạn tạo hiệu ứng dây chuyền:' })}</p>
                    
                    <div className="causal-relationships">
                      <div className="causal-item">
                        <span className="causal-icon">😰</span>
                        <div>
                          <strong>{L(lang, { en: 'Stress → Morale → Productivity', fr: 'Stress → Moral → Productivité', es: 'Estrés → Moral → Productividad', vi: 'Căng thẳng → Tinh thần → Năng suất' })}</strong>
                          <p>{L(lang, { en: 'Unrealistic deadlines, overtime, and team changes increase stress. High stress lowers morale, which directly reduces your team\'s output.', fr: 'Les échéances irréalistes, les heures supplémentaires et les changements d\'équipe augmentent le stress. Un stress élevé diminue le moral, ce qui réduit directement la production de votre équipe.', es: 'Los plazos irreales, las horas extra y los cambios de equipo aumentan el estrés. El estrés alto baja la moral, lo que reduce directamente la producción del equipo.', vi: 'Thời hạn phi thực tế, tăng ca và xáo trộn đội nhóm làm tăng căng thẳng. Căng thẳng cao hạ tinh thần, trực tiếp giảm sản lượng của đội.' })}</p>
                        </div>
                      </div>
                      <div className="causal-item">
                        <span className="causal-icon">🧠</span>
                        <div>
                          <strong>{L(lang, { en: 'Knowledge Building', fr: 'Développement des connaissances', es: 'Construcción de conocimiento', vi: 'Tích lũy kiến thức' })}</strong>
                          <p>{L(lang, { en: 'Your team starts with limited project knowledge. Coaching meetings and experience reduce mistake rates over time. Losing team members causes knowledge loss.', fr: 'Votre équipe commence avec des connaissances limitées du projet. Les réunions de coaching et l\'expérience réduisent le taux d\'erreurs avec le temps. Perdre des membres de l\'équipe cause une perte de connaissances.', es: 'Tu equipo empieza con conocimiento limitado del proyecto. Las reuniones de coaching y la experiencia reducen la tasa de errores con el tiempo. Perder miembros del equipo causa pérdida de conocimiento.', vi: 'Đội của bạn khởi đầu với kiến thức dự án hạn chế. Các buổi huấn luyện và kinh nghiệm giảm dần tỷ lệ sai sót. Mất thành viên gây thất thoát kiến thức.' })}</p>
                        </div>
                      </div>
                      <div className="causal-item">
                        <span className="causal-icon">📅</span>
                        <div>
                          <strong>{L(lang, { en: 'Schedule Consistency', fr: 'Cohérence du calendrier', es: 'Consistencia de cronograma', vi: 'Tiến độ ổn định' })}</strong>
                          <p>{L(lang, { en: 'Frequent deadline changes erode team trust. Each change after week 2 incurs morale and stress penalties. Consistency is rewarded with bonus points.', fr: 'Les changements fréquents d\'échéance érodent la confiance de l\'équipe. Chaque changement après la semaine 2 entraîne des pénalités de moral et de stress. La cohérence est récompensée par des points bonus.', es: 'Los cambios frecuentes de fecha erosionan la confianza del equipo. Cada cambio después de la semana 2 acarrea penalizaciones de moral y estrés. La consistencia se premia con puntos extra.', vi: 'Đổi thời hạn liên tục bào mòn niềm tin của đội. Mỗi lần đổi sau tuần 2 bị phạt tinh thần và căng thẳng. Sự ổn định được thưởng điểm.' })}</p>
                        </div>
                      </div>
                      {selectedScenario.hasPrototyping && (
                        <div className="causal-item">
                          <span className="causal-icon">🔬</span>
                          <div>
                            <strong>{L(lang, { en: 'Prototyping Value', fr: 'Valeur du prototypage', es: 'Valor del prototipado', vi: 'Giá trị của nguyên mẫu' })}</strong>
                            <p>{L(lang, { en: 'Building prototypes early surfaces problems before they become expensive. Events that would cause major issues are mitigated by prior prototype work.', fr: 'Construire des prototypes tôt révèle les problèmes avant qu\'ils ne deviennent coûteux. Les événements qui causeraient des problèmes majeurs sont atténués par le travail de prototypage antérieur.', es: 'Construir prototipos temprano revela problemas antes de que se vuelvan caros. Los eventos que causarían problemas graves se mitigan con trabajo previo de prototipos.', vi: 'Làm nguyên mẫu sớm phơi bày vấn đề trước khi chúng trở nên đắt đỏ. Các sự kiện lẽ ra gây hậu quả lớn được giảm nhẹ nhờ nguyên mẫu làm trước.' })}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="managing-section">
                    <h3>{L(lang, { en: '2. Weekly Actions', fr: '2. Actions hebdomadaires', es: '2. Acciones semanales', vi: '2. Hành động hằng tuần' })}</h3>
                    <p>{L(lang, { en: 'Each week you can take several actions to manage your project:', fr: 'Chaque semaine, vous pouvez prendre plusieurs actions pour gérer votre projet:', es: 'Cada semana puedes tomar varias acciones para gestionar tu proyecto:', vi: 'Mỗi tuần bạn có thể thực hiện nhiều hành động để quản lý dự án:' })}</p>
                    
                    <div className="actions-grid">
                      <div className="action-item">
                        <strong>👥 {L(lang, { en: 'Team Management', fr: 'Gestion de l\'équipe', es: 'Gestión del equipo', vi: 'Quản lý đội nhóm' })}</strong>
                        <p>{L(lang, { en: 'Hire or release team members. New hires increase capacity but cause temporary stress and knowledge dilution.', fr: 'Embauchez ou libérez des membres de l\'équipe. Les nouvelles embauches augmentent la capacité mais causent du stress temporaire et une dilution des connaissances.', es: 'Contrata o libera miembros del equipo. Las nuevas contrataciones aumentan la capacidad pero causan estrés temporal y dilución de conocimiento.', vi: 'Tuyển hoặc cho nghỉ thành viên. Người mới tăng năng lực nhưng gây căng thẳng tạm thời và pha loãng kiến thức.' })}</p>
                      </div>
                      <div className="action-item">
                        <strong>📅 {L(lang, { en: 'Schedule Adjustment', fr: 'Ajustement du calendrier', es: 'Ajuste de cronograma', vi: 'Điều chỉnh tiến độ' })}</strong>
                        <p>{L(lang, { en: 'Extend your deadline if needed. Early adjustments are less costly than late ones.', fr: 'Prolongez votre échéance si nécessaire. Les ajustements précoces coûtent moins cher que les tardifs.', es: 'Extiende tu fecha límite si es necesario. Los ajustes tempranos cuestan menos que los tardíos.', vi: 'Gia hạn thời hạn nếu cần. Điều chỉnh sớm ít tốn kém hơn điều chỉnh muộn.' })}</p>
                      </div>
                      <div className="action-item">
                        <strong>🎯 {L(lang, { en: 'Meetings', fr: 'Réunions', es: 'Reuniones', vi: 'Cuộc họp' })}</strong>
                        <p>{L(lang, { en: 'Choose from coaching (builds knowledge), standups (reduces mistakes), or status reviews (stakeholder alignment).', fr: 'Choisissez parmi le coaching (développe les connaissances), les standups (réduit les erreurs) ou les revues de statut (alignement des parties prenantes).', es: 'Elige entre coaching (construye conocimiento), standups (reduce errores) o revisiones de estado (alineación con interesados).', vi: 'Chọn giữa huấn luyện (tích kiến thức), standup (giảm sai sót) hoặc rà soát tình hình (đồng bộ các bên liên quan).' })}</p>
                      </div>
                      <div className="action-item">
                        <strong>⭐ {L(lang, { en: 'Quality Review', fr: 'Revue de qualité', es: 'Revisión de calidad', vi: 'Đánh giá chất lượng' })}</strong>
                        <p>{L(lang, { en: 'Invest time in improving deliverable quality. Costs budget but ensures better outcomes.', fr: 'Investissez du temps pour améliorer la qualité des livrables. Coûte du budget mais assure de meilleurs résultats.', es: 'Invierte tiempo en mejorar la calidad del entregable. Cuesta presupuesto pero asegura mejores resultados.', vi: 'Đầu tư thời gian nâng chất lượng sản phẩm. Tốn ngân sách nhưng bảo đảm kết quả tốt hơn.' })}</p>
                      </div>
                      <div className="action-item">
                        <strong>⚡ {L(lang, { en: 'Crunch Mode', fr: 'Mode intensif', es: 'Modo crunch', vi: 'Chế độ tăng tốc' })}</strong>
                        <p>{L(lang, { en: 'Push the team to work overtime. Increases short-term output at the cost of stress and morale.', fr: 'Poussez l\'équipe à faire des heures supplémentaires. Augmente la production à court terme au prix du stress et du moral.', es: 'Empuja al equipo a hacer horas extra. Aumenta la producción a corto plazo a costa de estrés y moral.', vi: 'Ép đội tăng ca. Tăng sản lượng ngắn hạn nhưng trả giá bằng căng thẳng và tinh thần.' })}</p>
                      </div>
                      {selectedScenario.hasPrototyping && (
                        <div className="action-item">
                          <strong>🔬 {L(lang, { en: 'Build Prototype', fr: 'Construire un prototype', es: 'Construir prototipo', vi: 'Xây nguyên mẫu' })}</strong>
                          <p>{L(lang, { en: 'Invest in early testing to reduce future risks. Costs time and budget but provides significant protection.', fr: 'Investissez dans des tests précoces pour réduire les risques futurs. Coûte du temps et du budget mais offre une protection significative.', es: 'Invierte en pruebas tempranas para reducir riesgos futuros. Cuesta tiempo y presupuesto pero brinda una protección significativa.', vi: 'Đầu tư thử nghiệm sớm để giảm rủi ro về sau. Tốn thời gian và ngân sách nhưng bảo vệ đáng kể.' })}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="managing-section">
                    <h3>{L(lang, { en: '3. Events & Decisions', fr: '3. Événements et décisions', es: '3. Eventos y decisiones', vi: '3. Sự kiện & quyết định' })}</h3>
                    <p>
                      {L(lang, { en: 'Throughout the project, you\'ll encounter events triggered by project conditions—not random chance. For example, high stress may cause team members to leave. Low quality triggers technical debt crises. Your choices in these moments significantly impact project outcomes.', fr: 'Tout au long du projet, vous rencontrerez des événements déclenchés par les conditions du projet — pas par le hasard. Par exemple, un stress élevé peut causer le départ de membres de l\'équipe. Une qualité faible déclenche des crises de dette technique. Vos choix dans ces moments impactent significativement les résultats du projet.', es: 'A lo largo del proyecto encontrarás eventos disparados por las condiciones del proyecto — no por azar. Por ejemplo, el estrés alto puede hacer que miembros del equipo se vayan. La baja calidad dispara crisis de deuda técnica. Tus elecciones en esos momentos impactan significativamente los resultados.', vi: 'Suốt dự án, bạn sẽ gặp các sự kiện do điều kiện dự án kích hoạt — không phải ngẫu nhiên. Ví dụ, căng thẳng cao có thể khiến thành viên rời đi. Chất lượng thấp châm ngòi khủng hoảng nợ kỹ thuật. Lựa chọn của bạn ở những khoảnh khắc đó ảnh hưởng lớn đến kết quả.' })}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="brief-actions">
              <button className="btn-primary btn-lg" onClick={beginSimulation}>{L(lang, { en: 'Begin Simulation →', fr: 'Commencer la simulation →', es: 'Comenzar simulación →', vi: 'Bắt đầu mô phỏng →' })}</button>
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
                {L(lang, { en: `Week ${gameState.week}`, fr: `Semaine ${gameState.week}`, es: `Semana ${gameState.week}`, vi: `Tuần ${gameState.week}` })}
                <span className="sidebar-week-total"> / {gameState.totalWeeks}</span>
              </div>
              
              <div className="sidebar-section-label">{L(lang, { en: 'DECISIONS', fr: 'DÉCISIONS', es: 'DECISIONES', vi: 'QUYẾT ĐỊNH' })}</div>
              <button className={`sidebar-nav-item ${gameTab === 'overview' ? 'active' : ''}`} onClick={() => setGameTab('overview')}>
                <span className="sidebar-nav-icon">📊</span> {L(lang, { en: 'Overview', fr: 'Vue d\'ensemble', es: 'Resumen', vi: 'Tổng quan' })}
              </button>
              <button className={`sidebar-nav-item ${gameTab === 'team' ? 'active' : ''}`} onClick={() => setGameTab('team')}>
                <span className="sidebar-nav-icon">👥</span> {L(lang, { en: 'Team Management', fr: 'Gestion d\'équipe', es: 'Gestión del equipo', vi: 'Quản lý đội nhóm' })}
              </button>
              <button className={`sidebar-nav-item ${gameTab === 'resources' ? 'active' : ''}`} onClick={() => setGameTab('resources')}>
                <span className="sidebar-nav-icon">🎯</span> {L(lang, { en: 'Resource Allocation', fr: 'Allocation des ressources', es: 'Asignación de recursos', vi: 'Phân bổ nguồn lực' })}
              </button>
              <button className={`sidebar-nav-item ${gameTab === 'meetings' ? 'active' : ''}`} onClick={() => setGameTab('meetings')}>
                <span className="sidebar-nav-icon">📅</span> {L(lang, { en: 'Meetings', fr: 'Réunions', es: 'Reuniones', vi: 'Cuộc họp' })}
              </button>
              {scenario.hasPrototyping && (
                <button className={`sidebar-nav-item ${gameTab === 'prototype' ? 'active' : ''}`} onClick={() => setGameTab('prototype')}>
                  <span className="sidebar-nav-icon">🔬</span> {L(lang, { en: 'Prototyping', fr: 'Prototypage', es: 'Prototipado', vi: 'Nguyên mẫu' })}
                </button>
              )}
              
              <div className="sidebar-section-label">{L(lang, { en: 'REPORTS', fr: 'RAPPORTS', es: 'REPORTES', vi: 'BÁO CÁO' })}</div>
              <button className={`sidebar-nav-item ${gameTab === 'health' ? 'active' : ''}`} onClick={() => setGameTab('health')}>
                <span className="sidebar-nav-icon">📈</span> {L(lang, { en: 'Project Health', fr: 'Santé du projet', es: 'Salud del proyecto', vi: 'Sức khỏe dự án' })}
              </button>
              <button className={`sidebar-nav-item ${gameTab === 'risks' ? 'active' : ''}`} onClick={() => setGameTab('risks')}>
                <span className="sidebar-nav-icon">⚠️</span> {L(lang, { en: 'Risks & Stakeholders', fr: 'Risques & parties prenantes', es: 'Riesgos e interesados', vi: 'Rủi ro & các bên liên quan' })}
              </button>
              <button className={`sidebar-nav-item ${gameTab === 'milestones' ? 'active' : ''}`} onClick={() => setGameTab('milestones')}>
                <span className="sidebar-nav-icon">🏗️</span> {L(lang, { en: 'Milestones', fr: 'Jalons', es: 'Hitos', vi: 'Cột mốc' })}
              </button>
              
              <div className="sidebar-actions">
                <button className="btn-anna-sidebar" onClick={askAnna}>
                  {annaAvatar(28)}
                  <span>{L(lang, { en: 'Ask Anna', fr: 'Demander à Anna', es: 'Pregunta a Anna', vi: 'Hỏi Anna' })}</span>
                </button>
                <button className="btn-advance-sidebar" onClick={advanceWeek}>
                  {L(lang, { en: `Advance to Week ${gameState.week + 1}`, fr: `Passer à la semaine ${gameState.week + 1}`, es: `Avanzar a la semana ${gameState.week + 1}`, vi: `Sang tuần ${gameState.week + 1}` })} →
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="game-content">
              
              {/* === OVERVIEW TAB === */}
              {gameTab === 'overview' && (
                <div className="content-section">
                  <h2 className="content-title">📊 {L(lang, { en: 'Quarter Overview', fr: 'Vue d\'ensemble', es: 'Resumen del trimestre', vi: 'Tổng quan quý' })}</h2>
                  
                  {/* KPI Cards */}
                  <div className="kpi-grid">
                    <div className="kpi-card">
                      <div className="kpi-label">{L(lang, { en: 'BUDGET REMAINING', fr: 'BUDGET RESTANT', es: 'PRESUPUESTO RESTANTE', vi: 'NGÂN SÁCH CÒN LẠI' })}</div>
                      <div className="kpi-value">${(budgetRemaining / 1000).toFixed(0)}K</div>
                      <div className="kpi-bar"><div className="kpi-bar-fill" style={{ width: `${budgetPercent}%`, background: budgetPercent > 30 ? '#10b981' : budgetPercent > 15 ? '#f59e0b' : '#ef4444' }}></div></div>
                    </div>
                    <div className="kpi-card">
                      <div className="kpi-label">{L(lang, { en: 'SCHEDULE', fr: 'CALENDRIER', es: 'CRONOGRAMA', vi: 'TIẾN ĐỘ' })}</div>
                      <div className="kpi-value">{weeksRemaining} {L(lang, { en: 'wks left', fr: 'sem.', es: 'sem. restantes', vi: 'tuần còn lại' })}</div>
                      <div className="kpi-bar"><div className="kpi-bar-fill" style={{ width: `${schedulePercent}%`, background: '#3b82f6' }}></div></div>
                    </div>
                    <div className="kpi-card">
                      <div className="kpi-label">{L(lang, { en: 'TEAM MORALE', fr: 'MORAL D\'ÉQUIPE', es: 'MORAL DEL EQUIPO', vi: 'TINH THẦN ĐỘI' })}</div>
                      <div className="kpi-value">{Math.round(gameState.team.morale)}%</div>
                      <div className="kpi-bar"><div className="kpi-bar-fill" style={{ width: `${gameState.team.morale}%`, background: gameState.team.morale > 60 ? '#10b981' : '#f59e0b' }}></div></div>
                    </div>
                    <div className="kpi-card">
                      <div className="kpi-label">{L(lang, { en: 'QUALITY', fr: 'QUALITÉ', es: 'CALIDAD', vi: 'CHẤT LƯỢNG' })}</div>
                      <div className="kpi-value">{gameState.scope.quality >= 90 ? 'A' : gameState.scope.quality >= 80 ? 'B+' : gameState.scope.quality >= 70 ? 'B' : gameState.scope.quality >= 60 ? 'C' : 'D'}</div>
                      <div className="kpi-bar"><div className="kpi-bar-fill" style={{ width: `${gameState.scope.quality}%`, background: '#8b5cf6' }}></div></div>
                    </div>
                    <div className="kpi-card">
                      <div className="kpi-label">{L(lang, { en: 'SCOPE COMPLETE', fr: 'PÉRIMÈTRE COMPLÉTÉ', es: 'ALCANCE COMPLETADO', vi: 'PHẠM VI HOÀN THÀNH' })}</div>
                      <div className="kpi-value">{Math.round(scopePercent)}%</div>
                      <div className="kpi-bar"><div className="kpi-bar-fill" style={{ width: `${scopePercent}%`, background: '#6366f1' }}></div></div>
                    </div>
                    <div className="kpi-card">
                      <div className="kpi-label">{L(lang, { en: 'TEAM SIZE', fr: 'TAILLE D\'ÉQUIPE', es: 'TAMAÑO DEL EQUIPO', vi: 'QUY MÔ ĐỘI' })}</div>
                      <div className="kpi-value">{gameState.team.size}</div>
                      <div className="kpi-subtext">{L(lang, { en: `Stress: ${Math.round(gameState.team.stress)}%`, fr: `Stress: ${Math.round(gameState.team.stress)}%`, es: `Estrés: ${Math.round(gameState.team.stress)}%`, vi: `Căng thẳng: ${Math.round(gameState.team.stress)}%` })}</div>
                    </div>
                  </div>
                  
                  {/* Timeline */}
                  <div className="overview-timeline">
                    <h4>📈 {L(lang, { en: 'Project Timeline', fr: 'Échéancier du projet', es: 'Línea de tiempo del proyecto', vi: 'Dòng thời gian dự án' })}</h4>
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
                        <strong style={{ color: '#14b8a6' }}>Anna</strong> — {L(lang, { en: `Week ${gameState.week} Insight`, fr: `Aperçu semaine ${gameState.week}`, es: `Insight de la semana ${gameState.week}`, vi: `Góc nhìn tuần ${gameState.week}` })}
                      </div>
                    </div>
                    <p className="anna-overview-text">
                      {(() => {
                        // Dynamic analysis based on current metrics
                        const issues = [];
                        const recs = [];
                        
                        // Status line
                        let status = '';
                        {
                          const bk = (budgetRemaining/1000).toFixed(0);
                          const bp = Math.round(budgetPercent);
                          if (budgetPercent < 15) status = L(lang, { en: `Budget is critical at $${bk}K remaining.`, fr: `Le budget est critique à ${bk}K$ restants.`, es: `El presupuesto es crítico: quedan $${bk}K.`, vi: `Ngân sách nguy cấp: còn $${bk}K.` });
                          else if (budgetPercent < 30) status = L(lang, { en: `Budget is getting tight — $${bk}K left (${bp}%).`, fr: `Le budget se resserre — ${bk}K$ restants (${bp}%).`, es: `El presupuesto se ajusta — quedan $${bk}K (${bp}%).`, vi: `Ngân sách đang eo hẹp — còn $${bk}K (${bp}%).` });
                          else status = L(lang, { en: `Budget looks healthy at $${bk}K remaining.`, fr: `Le budget est sain à ${bk}K$ restants.`, es: `El presupuesto se ve sano: quedan $${bk}K.`, vi: `Ngân sách khỏe mạnh: còn $${bk}K.` });
                        }

                        // Morale assessment
                        if (gameState.team.morale < 40) {
                          issues.push(L(lang, { en: `Morale is dangerously low at ${Math.round(gameState.team.morale)}%`, fr: `Le moral est dangereusement bas à ${Math.round(gameState.team.morale)}%`, es: `La moral está peligrosamente baja: ${Math.round(gameState.team.morale)}%`, vi: `Tinh thần thấp nguy hiểm: ${Math.round(gameState.team.morale)}%` }));
                          recs.push(L(lang, { en: 'Run Team Building ($8K) in Resource Allocation to recover morale', fr: 'Lancez Consolidation d\'équipe (8K$) dans Allocation des ressources', es: 'Ejecuta Cohesión de equipo ($8K) en Asignación de recursos para recuperar la moral', vi: 'Chạy Gắn kết đội nhóm ($8K) trong Phân bổ nguồn lực để phục hồi tinh thần' }));
                        } else if (gameState.team.morale < 60) {
                          issues.push(L(lang, { en: `Morale is declining at ${Math.round(gameState.team.morale)}%`, fr: `Le moral décline à ${Math.round(gameState.team.morale)}%`, es: `La moral está bajando: ${Math.round(gameState.team.morale)}%`, vi: `Tinh thần đang giảm: ${Math.round(gameState.team.morale)}%` }));
                          recs.push(L(lang, { en: 'Consider Team Building or a Coaching session', fr: 'Considérez une Consolidation d\'équipe ou un Coaching', es: 'Considera Cohesión de equipo o una sesión de coaching', vi: 'Cân nhắc Gắn kết đội nhóm hoặc một buổi huấn luyện' }));
                        }

                        // Stress
                        if (gameState.team.stress > 70) {
                          issues.push(L(lang, { en: `Team stress at ${Math.round(gameState.team.stress)}% — burnout risk!`, fr: `Stress d'équipe à ${Math.round(gameState.team.stress)}% — risque d'épuisement !`, es: `Estrés del equipo en ${Math.round(gameState.team.stress)}% — ¡riesgo de burnout!`, vi: `Căng thẳng của đội ở ${Math.round(gameState.team.stress)}% — nguy cơ kiệt sức!` }));
                          recs.push(L(lang, { en: 'Avoid Crunch Mode and schedule a Status Review to reduce stress', fr: 'Évitez le Mode intensif et planifiez une Revue de statut', es: 'Evita el modo crunch y agenda una revisión de estado para reducir el estrés', vi: 'Tránh chế độ tăng tốc và xếp lịch rà soát tình hình để giảm căng thẳng' }));
                        }

                        // Scope vs schedule
                        const expectedProgress = (gameState.week / gameState.totalWeeks) * 100;
                        if (scopePercent < expectedProgress - 15) {
                          issues.push(L(lang, { en: `Scope is behind — ${Math.round(scopePercent)}% done vs ${Math.round(expectedProgress)}% expected`, fr: `Le périmètre est en retard — ${Math.round(scopePercent)}% fait vs ${Math.round(expectedProgress)}% attendu`, es: `El alcance está atrasado — ${Math.round(scopePercent)}% hecho vs ${Math.round(expectedProgress)}% esperado`, vi: `Phạm vi đang chậm — ${Math.round(scopePercent)}% xong so với ${Math.round(expectedProgress)}% kỳ vọng` }));
                          recs.push(L(lang, { en: 'Consider hiring or Crunch Mode to catch up (watch morale)', fr: 'Considérez embaucher ou le Mode intensif pour rattraper (surveillez le moral)', es: 'Considera contratar o el modo crunch para recuperar terreno (cuida la moral)', vi: 'Cân nhắc tuyển thêm hoặc tăng tốc để bắt kịp (coi chừng tinh thần)' }));
                        }

                        // Quality
                        if (gameState.scope.quality < 70) {
                          issues.push(L(lang, { en: `Quality at ${Math.round(gameState.scope.quality)}% needs attention`, fr: `La qualité à ${Math.round(gameState.scope.quality)}% nécessite de l'attention`, es: `La calidad en ${Math.round(gameState.scope.quality)}% necesita atención`, vi: `Chất lượng ở ${Math.round(gameState.scope.quality)}% cần chú ý` }));
                          recs.push(L(lang, { en: 'Run a Quality Review ($10K) to improve deliverable quality', fr: 'Effectuez une Revue qualité (10K$) pour améliorer la qualité', es: 'Ejecuta una revisión de calidad ($10K) para mejorar la calidad del entregable', vi: 'Chạy Đánh giá chất lượng ($10K) để nâng chất lượng sản phẩm' }));
                        }

                        // Knowledge
                        if (gameState.team.knowledge < 40) {
                          recs.push(L(lang, { en: 'Schedule One-on-One Coaching to build team knowledge', fr: 'Planifiez un Coaching individuel pour développer les connaissances', es: 'Agenda coaching uno a uno para construir conocimiento del equipo', vi: 'Xếp lịch huấn luyện 1-1 để tích lũy kiến thức cho đội' }));
                        }

                        // All good
                        if (issues.length === 0) {
                          issues.push(L(lang, { en: 'All metrics look solid this week', fr: 'Toutes les métriques sont bonnes cette semaine', es: 'Todas las métricas se ven sólidas esta semana', vi: 'Mọi chỉ số tuần này đều vững' }));
                          if (recs.length === 0) recs.push(L(lang, { en: 'Stay the course — maintain your current strategy', fr: 'Gardez le cap — maintenez votre stratégie actuelle', es: 'Mantén el rumbo — conserva tu estrategia actual', vi: 'Giữ vững hướng đi — duy trì chiến lược hiện tại' }));
                        }

                        return `${status} ${issues.join('. ')}. ${L(lang, { en: 'Recommendation', fr: 'Recommandation', es: 'Recomendación', vi: 'Khuyến nghị' })}: ${recs[0]}.${recs.length > 1 ? ` ${L(lang, { en: 'Also', fr: 'Aussi', es: 'Además', vi: 'Ngoài ra' })}: ${recs.slice(1).join('. ')}.` : ''}`;
                      })()}
                    </p>
                  </div>
                </div>
              )}

              {/* === TEAM MANAGEMENT TAB === */}
              {gameTab === 'team' && (
                <div className="content-section">
                  <h2 className="content-title">👥 {L(lang, { en: 'Team Management', fr: 'Gestion d\'équipe', es: 'Gestión del equipo', vi: 'Quản lý đội nhóm' })}</h2>
                  <p className="content-desc">{L(lang, { en: 'Adjust your team size based on workload', fr: 'Ajustez la taille de votre équipe selon la charge de travail', es: 'Ajusta el tamaño del equipo según la carga de trabajo', vi: 'Điều chỉnh quy mô đội theo khối lượng việc' })}</p>
                  
                  <div className="team-control-card">
                    <div className="team-control-row">
                      <button className="decision-btn" onClick={() => handleAction({ type: 'fire' })} disabled={gameState.team.size <= 2}>− {L(lang, { en: 'Remove', fr: 'Retirer', es: 'Retirar', vi: 'Cho nghỉ' })}</button>
                      <span className="team-count-large">{gameState.team.size}</span>
                      <button className="decision-btn" onClick={() => handleAction({ type: 'hire', cost: scenario.weeklyCostPerPerson * 2 })}>+ {L(lang, { en: 'Hire', fr: 'Embaucher', es: 'Contratar', vi: 'Tuyển' })}</button>
                    </div>
                    <p className="team-cost-note">{L(lang, { en: `Weekly cost per person: $${(scenario.weeklyCostPerPerson / 1000).toFixed(0)}K`, fr: `Coût hebdomadaire par personne: ${(scenario.weeklyCostPerPerson / 1000).toFixed(0)}K$`, es: `Costo semanal por persona: $${(scenario.weeklyCostPerPerson / 1000).toFixed(0)}K`, vi: `Chi phí tuần mỗi người: $${(scenario.weeklyCostPerPerson / 1000).toFixed(0)}K` })}</p>
                  </div>

                  <div className="team-stats-grid">
                    <div className="team-stat-card">
                      <div className="team-stat-label">{L(lang, { en: 'Morale', fr: 'Moral', es: 'Moral', vi: 'Tinh thần' })}</div>
                      <div className="team-stat-value" style={{ color: gameState.team.morale > 60 ? '#10b981' : '#f59e0b' }}>{Math.round(gameState.team.morale)}%</div>
                      <div className="kpi-bar"><div className="kpi-bar-fill" style={{ width: `${gameState.team.morale}%`, background: gameState.team.morale > 60 ? '#10b981' : '#f59e0b' }}></div></div>
                    </div>
                    <div className="team-stat-card">
                      <div className="team-stat-label">{L(lang, { en: 'Stress', fr: 'Stress', es: 'Estrés', vi: 'Căng thẳng' })}</div>
                      <div className="team-stat-value" style={{ color: gameState.team.stress < 40 ? '#10b981' : gameState.team.stress < 60 ? '#f59e0b' : '#ef4444' }}>{Math.round(gameState.team.stress)}%</div>
                      <div className="kpi-bar"><div className="kpi-bar-fill" style={{ width: `${gameState.team.stress}%`, background: gameState.team.stress < 40 ? '#10b981' : gameState.team.stress < 60 ? '#f59e0b' : '#ef4444' }}></div></div>
                    </div>
                    <div className="team-stat-card">
                      <div className="team-stat-label">{L(lang, { en: 'Knowledge', fr: 'Connaissances', es: 'Conocimiento', vi: 'Kiến thức' })}</div>
                      <div className="team-stat-value" style={{ color: '#6366f1' }}>{Math.round(gameState.team.knowledge)}%</div>
                      <div className="kpi-bar"><div className="kpi-bar-fill" style={{ width: `${gameState.team.knowledge}%`, background: '#6366f1' }}></div></div>
                    </div>
                    <div className="team-stat-card">
                      <div className="team-stat-label">{L(lang, { en: 'Productivity', fr: 'Productivité', es: 'Productividad', vi: 'Năng suất' })}</div>
                      <div className="team-stat-value" style={{ color: '#3b82f6' }}>{(effectiveProductivity * 100).toFixed(0)}%</div>
                      <div className="kpi-bar"><div className="kpi-bar-fill" style={{ width: `${effectiveProductivity * 100}%`, background: '#3b82f6' }}></div></div>
                    </div>
                  </div>
                </div>
              )}

              {/* === RESOURCE ALLOCATION TAB === */}
              {gameTab === 'resources' && (
                <div className="content-section">
                  <h2 className="content-title">🎯 {L(lang, { en: 'Resource Allocation', fr: 'Allocation des ressources', es: 'Asignación de recursos', vi: 'Phân bổ nguồn lực' })}</h2>
                  <p className="content-desc">{L(lang, { en: 'Choose where to invest your resources this week', fr: 'Choisissez où investir vos ressources cette semaine', es: 'Elige dónde invertir tus recursos esta semana', vi: 'Chọn nơi đầu tư nguồn lực tuần này' })}</p>
                  
                  {/* Weekly Focus */}
                  <div className="resource-card">
                    <h3>{L(lang, { en: 'Weekly Focus', fr: 'Focus hebdomadaire', es: 'Enfoque semanal', vi: 'Trọng tâm tuần' })}</h3>
                    <div className="focus-sliders">
                      <div className="focus-row">
                        <span className="focus-label">🚀 {L(lang, { en: 'Speed', fr: 'Vitesse', es: 'Velocidad', vi: 'Tốc độ' })}</span>
                        <div className="focus-bar"><div className="focus-fill speed" style={{ width: `${100 - gameState.scope.quality * 0.3}%` }}></div></div>
                        <span className="focus-value">{Math.round(100 - gameState.scope.quality * 0.3)}%</span>
                      </div>
                      <div className="focus-row">
                        <span className="focus-label">⭐ {L(lang, { en: 'Quality', fr: 'Qualité', es: 'Calidad', vi: 'Chất lượng' })}</span>
                        <div className="focus-bar"><div className="focus-fill quality" style={{ width: `${gameState.scope.quality * 0.8}%` }}></div></div>
                        <span className="focus-value">{Math.round(gameState.scope.quality * 0.8)}%</span>
                      </div>
                      <div className="focus-row">
                        <span className="focus-label">💡 {L(lang, { en: 'Innovation', fr: 'Innovation', es: 'Innovación', vi: 'Đổi mới' })}</span>
                        <div className="focus-bar"><div className="focus-fill innovation" style={{ width: `${gameState.team.knowledge * 0.6}%` }}></div></div>
                        <span className="focus-value">{Math.round(gameState.team.knowledge * 0.6)}%</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="resource-card">
                    <h3>{L(lang, { en: 'Actions', fr: 'Actions', es: 'Acciones', vi: 'Hành động' })}</h3>
                    <div className="resource-actions-grid">
                      <button className="resource-action-btn quality" onClick={() => handleAction({ type: 'quality_review', cost: 10000 })}>
                        <span className="resource-action-icon">🔍</span>
                        <div>
                          <strong>{L(lang, { en: 'Quality Review', fr: 'Revue qualité', es: 'Revisión de calidad', vi: 'Đánh giá chất lượng' })}</strong>
                          <p>{L(lang, { en: 'Invest in quality improvement ($10K)', fr: 'Investir dans la qualité (10K$)', es: 'Invierte en mejorar la calidad ($10K)', vi: 'Đầu tư nâng chất lượng ($10K)' })}</p>
                        </div>
                      </button>
                      <button className="resource-action-btn crunch" onClick={() => handleAction({ type: 'crunch', cost: 15000 })}>
                        <span className="resource-action-icon">🔥</span>
                        <div>
                          <strong>{L(lang, { en: 'Crunch Mode', fr: 'Mode intensif', es: 'Modo crunch', vi: 'Chế độ tăng tốc' })}</strong>
                          <p>{L(lang, { en: 'Push overtime for speed ($15K, +stress)', fr: 'Heures supp. pour vitesse (15K$, +stress)', es: 'Impulsa horas extra por velocidad ($15K, +estrés)', vi: 'Tăng ca lấy tốc độ ($15K, +căng thẳng)' })}</p>
                        </div>
                      </button>
                      <button className="resource-action-btn team-build" onClick={() => handleAction({ type: 'team_building', cost: 8000 })}>
                        <span className="resource-action-icon">🤝</span>
                        <div>
                          <strong>{L(lang, { en: 'Team Building', fr: 'Consolidation d\'équipe', es: 'Cohesión de equipo', vi: 'Gắn kết đội nhóm' })}</strong>
                          <p>{L(lang, { en: 'Boost morale and reduce stress ($8K)', fr: 'Améliorer le moral et réduire le stress (8K$)', es: 'Sube la moral y reduce el estrés ($8K)', vi: 'Nâng tinh thần, giảm căng thẳng ($8K)' })}</p>
                        </div>
                      </button>
                      <button className="resource-action-btn schedule" onClick={() => handleAction({ type: 'extend_deadline' })}>
                        <span className="resource-action-icon">📅</span>
                        <div>
                          <strong>{L(lang, { en: 'Extend Deadline +1 Week', fr: 'Prolonger +1 semaine', es: 'Extender fecha límite +1 semana', vi: 'Gia hạn thời hạn +1 tuần' })}</strong>
                          <p>{L(lang, { en: 'More time but schedule penalty', fr: 'Plus de temps mais pénalité de calendrier', es: 'Más tiempo pero con penalización de cronograma', vi: 'Thêm thời gian nhưng bị phạt tiến độ' })}</p>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* === MEETINGS TAB === */}
              {gameTab === 'meetings' && (
                <div className="content-section">
                  <h2 className="content-title">📅 {L(lang, { en: 'Meetings This Week', fr: 'Réunions cette semaine', es: 'Reuniones de esta semana', vi: 'Cuộc họp tuần này' })}</h2>
                  <p className="content-desc">{L(lang, { en: 'Schedule meetings to improve team performance', fr: 'Planifiez des réunions pour améliorer la performance', es: 'Agenda reuniones para mejorar el desempeño del equipo', vi: 'Xếp lịch họp để cải thiện hiệu suất đội' })}</p>
                  
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
                            ? (L(lang, { en: 'Builds team knowledge and reduces error rates', fr: 'Développe les connaissances et réduit les erreurs', es: 'Construye conocimiento del equipo y reduce la tasa de errores', vi: 'Tích lũy kiến thức cho đội và giảm tỷ lệ sai sót' }))
                            : meeting.id === 'standup'
                            ? (L(lang, { en: 'Improves coordination and catches issues early', fr: 'Améliore la coordination et détecte les problèmes tôt', es: 'Mejora la coordinación y detecta problemas temprano', vi: 'Cải thiện phối hợp và phát hiện sớm vấn đề' }))
                            : (L(lang, { en: 'Aligns stakeholders and manages expectations', fr: 'Aligne les parties prenantes et gère les attentes', es: 'Alinea a los interesados y gestiona expectativas', vi: 'Đồng bộ các bên liên quan và quản lý kỳ vọng' }))
                          }</p>
                        </div>
                        <span className="meeting-card-status">{gameState.meetings[meeting.id] ? '✅' : '○'}</span>
                      </button>
                    ))}
                  </div>
                  
                  <div className="meetings-summary">
                    {L(lang, { en: `${Object.values(gameState.meetings).filter(Boolean).length} of ${Object.keys(MEETING_TYPES).length} meetings scheduled this week`, fr: `${Object.values(gameState.meetings).filter(Boolean).length} de ${Object.keys(MEETING_TYPES).length} réunions planifiées cette semaine`, es: `${Object.values(gameState.meetings).filter(Boolean).length} de ${Object.keys(MEETING_TYPES).length} reuniones agendadas esta semana`, vi: `${Object.values(gameState.meetings).filter(Boolean).length}/${Object.keys(MEETING_TYPES).length} cuộc họp đã xếp lịch tuần này` })}
                  </div>
                </div>
              )}

              {/* === PROTOTYPE TAB === */}
              {gameTab === 'prototype' && scenario.hasPrototyping && (
                <div className="content-section">
                  <h2 className="content-title">🔬 {L(lang, { en: 'Prototyping', fr: 'Prototypage', es: 'Prototipado', vi: 'Nguyên mẫu' })}</h2>
                  <p className="content-desc">{L(lang, { en: 'Build prototypes to reduce risk and validate direction', fr: 'Construisez des prototypes pour réduire les risques', es: 'Construye prototipos para reducir el riesgo y validar la dirección', vi: 'Xây nguyên mẫu để giảm rủi ro và kiểm chứng hướng đi' })}</p>
                  
                  <div className="prototype-status">
                    <div className="prototype-count">{gameState.prototypesBuilt || 0} / {gameState.maxPrototypes}</div>
                    <p>{L(lang, { en: 'Prototypes Built', fr: 'Prototypes construits', es: 'Prototipos construidos', vi: 'Nguyên mẫu đã xây' })}</p>
                  </div>
                  
                  {gameState.prototypesBuilt < gameState.maxPrototypes ? (
                    <button className="resource-action-btn proto" onClick={() => handleAction({ type: 'build_prototype' })}>
                      <span className="resource-action-icon">🔬</span>
                      <div>
                        <strong>{L(lang, { en: 'Build Prototype', fr: 'Construire un prototype', es: 'Construir prototipo', vi: 'Xây nguyên mẫu' })}</strong>
                        <p>{L(lang, { en: 'Invest time to validate design and reduce risk', fr: 'Investir du temps pour valider le design et réduire le risque', es: 'Invierte tiempo para validar el diseño y reducir el riesgo', vi: 'Đầu tư thời gian kiểm chứng thiết kế và giảm rủi ro' })}</p>
                      </div>
                    </button>
                  ) : (
                    <div className="prototype-complete">✅ {L(lang, { en: 'All prototypes complete!', fr: 'Tous les prototypes sont terminés!', es: '¡Todos los prototipos completos!', vi: 'Đã hoàn tất mọi nguyên mẫu!' })}</div>
                  )}
                </div>
              )}

              {/* === PROJECT HEALTH TAB === */}
              {gameTab === 'health' && (
                <div className="content-section">
                  <h2 className="content-title">📈 {L(lang, { en: 'Project Health', fr: 'Santé du projet', es: 'Salud del proyecto', vi: 'Sức khỏe dự án' })}</h2>
                  
                  {/* Risk Radar */}
                  <div className="health-radar-card">
                    <h4>📡 {L(lang, { en: 'Risk Radar', fr: 'Radar de risques', es: 'Radar de riesgos', vi: 'Ra-đa rủi ro' })}</h4>
                    <RiskRadar risks={{
                      budget: Math.min(100, budgetPercent + 20),
                      schedule: Math.min(100, (weeksRemaining / gameState.totalWeeks) * 100 + 20),
                      scope: Math.min(100, scopePercent + 10),
                      quality: gameState.scope.quality,
                      team: gameState.team.morale,
                      stakeholder: Math.min(100, (gameState.scope.quality + gameState.team.morale) / 2)
                    }} />
                    <div className="radar-legend">
                      <span className="legend-item good">● {L(lang, { en: 'Safe', fr: 'Sûr', es: 'Seguro', vi: 'An toàn' })}</span>
                      <span className="legend-item warn">● {L(lang, { en: 'Watch', fr: 'Surveiller', es: 'Vigilar', vi: 'Theo dõi' })}</span>
                      <span className="legend-item bad">● {L(lang, { en: 'Risk', fr: 'Risque', es: 'Riesgo', vi: 'Rủi ro' })}</span>
                    </div>
                  </div>
                  
                  {/* Live Metrics */}
                  <div className="health-metrics-card">
                    <h4>📊 {L(lang, { en: 'Live Metrics', fr: 'Métriques en direct', es: 'Métricas en vivo', vi: 'Chỉ số trực tiếp' })}</h4>
                    <div className="metric-row">
                      <span className="metric-name">{L(lang, { en: 'Budget Used', fr: 'Budget utilisé', es: 'Presupuesto usado', vi: 'Ngân sách đã dùng' })}</span>
                      <span className="metric-bar-container"><span className="metric-bar" style={{ width: `${budgetSpentPercent}%`, background: budgetPercent > 30 ? '#f59e0b' : '#ef4444' }}></span></span>
                      <span className="metric-pct">{Math.round(budgetSpentPercent)}%</span>
                    </div>
                    <div className="metric-row">
                      <span className="metric-name">{L(lang, { en: 'Timeline', fr: 'Calendrier', es: 'Línea de tiempo', vi: 'Dòng thời gian' })}</span>
                      <span className="metric-bar-container"><span className="metric-bar" style={{ width: `${schedulePercent}%`, background: '#3b82f6' }}></span></span>
                      <span className="metric-pct">{Math.round(schedulePercent)}%</span>
                    </div>
                    <div className="metric-row">
                      <span className="metric-name">{L(lang, { en: 'Team Morale', fr: 'Moral d\'équipe', es: 'Moral del equipo', vi: 'Tinh thần đội' })}</span>
                      <span className="metric-bar-container"><span className="metric-bar" style={{ width: `${gameState.team.morale}%`, background: gameState.team.morale > 60 ? '#10b981' : '#f59e0b' }}></span></span>
                      <span className="metric-pct">{Math.round(gameState.team.morale)}%</span>
                    </div>
                    <div className="metric-row">
                      <span className="metric-name">{L(lang, { en: 'Quality', fr: 'Qualité', es: 'Calidad', vi: 'Chất lượng' })}</span>
                      <span className="metric-bar-container"><span className="metric-bar" style={{ width: `${gameState.scope.quality}%`, background: '#8b5cf6' }}></span></span>
                      <span className="metric-pct">{gameState.scope.quality >= 80 ? 'B+' : gameState.scope.quality >= 70 ? 'B' : 'C'}</span>
                    </div>
                    <div className="metric-row">
                      <span className="metric-name">{L(lang, { en: 'Knowledge', fr: 'Connaissances', es: 'Conocimiento', vi: 'Kiến thức' })}</span>
                      <span className="metric-bar-container"><span className="metric-bar" style={{ width: `${gameState.team.knowledge}%`, background: '#6366f1' }}></span></span>
                      <span className="metric-pct">{Math.round(gameState.team.knowledge)}%</span>
                    </div>
                  </div>
                </div>
              )}

              {/* === RISKS & STAKEHOLDERS TAB === */}
              {gameTab === 'risks' && (
                <div className="content-section">
                  <h2 className="content-title">⚠️ {L(lang, { en: 'Risks & Stakeholders', fr: 'Risques & parties prenantes', es: 'Riesgos e interesados', vi: 'Rủi ro & các bên liên quan' })}</h2>
                  
                  {/* Active Risks */}
                  <div className="risks-report-card">
                    <h4>{L(lang, { en: 'Active Risks', fr: 'Risques actifs', es: 'Riesgos activos', vi: 'Rủi ro đang hiện hữu' })}</h4>
                    <div className="risk-list">
                      {gameState.team.stress > 60 && (
                        <div className="risk-item high"><span className="risk-level">HIGH</span><span className="risk-text">{L(lang, { en: 'Team burnout risk', fr: 'Risque d\'épuisement', es: 'Riesgo de burnout del equipo', vi: 'Nguy cơ đội kiệt sức' })}</span></div>
                      )}
                      {budgetPercent < 20 && (
                        <div className="risk-item high"><span className="risk-level">HIGH</span><span className="risk-text">{L(lang, { en: 'Budget overrun', fr: 'Dépassement budgétaire', es: 'Sobrecosto de presupuesto', vi: 'Vượt ngân sách' })}</span></div>
                      )}
                      {weeksRemaining <= 2 && scopePercent < 80 && (
                        <div className="risk-item high"><span className="risk-level">HIGH</span><span className="risk-text">{L(lang, { en: 'Schedule slip', fr: 'Glissement de calendrier', es: 'Desliz de cronograma', vi: 'Trượt tiến độ' })}</span></div>
                      )}
                      {gameState.scope.quality < 70 && (
                        <div className="risk-item med"><span className="risk-level">MED</span><span className="risk-text">{L(lang, { en: 'Quality concerns', fr: 'Préoccupations qualité', es: 'Preocupaciones de calidad', vi: 'Lo ngại chất lượng' })}</span></div>
                      )}
                      {gameState.team.knowledge < 50 && (
                        <div className="risk-item low"><span className="risk-level">LOW</span><span className="risk-text">{L(lang, { en: 'Knowledge gaps', fr: 'Lacunes de connaissances', es: 'Brechas de conocimiento', vi: 'Lỗ hổng kiến thức' })}</span></div>
                      )}
                      {gameState.team.stress <= 60 && budgetPercent >= 20 && (weeksRemaining > 2 || scopePercent >= 80) && gameState.scope.quality >= 70 && gameState.team.knowledge >= 50 && (
                        <div className="risk-item none"><span className="risk-text">{L(lang, { en: 'No critical risks identified', fr: 'Aucun risque critique identifié', es: 'No se identifican riesgos críticos', vi: 'Không phát hiện rủi ro nghiêm trọng' })}</span></div>
                      )}
                    </div>
                  </div>
                  
                  {/* Stakeholder Messages */}
                  <div className="stakeholder-report-card">
                    <h4>💬 {L(lang, { en: 'Stakeholder Updates', fr: 'Messages des parties prenantes', es: 'Actualizaciones de interesados', vi: 'Cập nhật từ các bên liên quan' })}</h4>
                    <div className="message-list">
                      {gameState.team.morale < 60 && (
                        <div className="message urgent">
                          <span className="msg-icon">👥</span>
                          <div className="msg-content">
                            <span className="msg-from">{L(lang, { en: 'Team Lead', fr: 'Chef d\'équipe', es: 'Líder del equipo', vi: 'Trưởng nhóm' })}</span>
                            <span className="msg-text">{L(lang, { en: 'Team morale is low. Try Team Building in Resource Allocation.', fr: 'Le moral est bas. Essayez Consolidation d\'équipe dans Allocation des ressources.', es: 'La moral del equipo está baja. Prueba Cohesión de equipo en Asignación de recursos.', vi: 'Tinh thần đội đang thấp. Thử Gắn kết đội nhóm trong Phân bổ nguồn lực.' })}</span>
                          </div>
                          <span className="msg-badge urgent">!</span>
                        </div>
                      )}
                      {budgetPercent < 30 && (
                        <div className="message warning">
                          <span className="msg-icon">💰</span>
                          <div className="msg-content">
                            <span className="msg-from">{L(lang, { en: 'Finance', fr: 'Finance', es: 'Finanzas', vi: 'Tài chính' })}</span>
                            <span className="msg-text">{L(lang, { en: 'Budget running low. Review spending priorities.', fr: 'Budget faible. Révisez les priorités de dépenses.', es: 'El presupuesto se agota. Revisa las prioridades de gasto.', vi: 'Ngân sách sắp cạn. Rà soát ưu tiên chi tiêu.' })}</span>
                          </div>
                        </div>
                      )}
                      {weeksRemaining <= 3 && (
                        <div className="message info">
                          <span className="msg-icon">📅</span>
                          <div className="msg-content">
                            <span className="msg-from">{L(lang, { en: 'Sponsor', fr: 'Commanditaire', es: 'Patrocinador', vi: 'Nhà bảo trợ' })}</span>
                            <span className="msg-text">{L(lang, { en: 'Deadline approaching. Status update requested.', fr: 'Échéance approchante. Mise à jour demandée.', es: 'La fecha límite se acerca. Se solicita actualización de estado.', vi: 'Sắp đến hạn chót. Được yêu cầu báo cáo tình hình.' })}</span>
                          </div>
                        </div>
                      )}
                      {gameState.team.morale >= 60 && budgetPercent >= 30 && weeksRemaining > 3 && (
                        <div className="message success">
                          <span className="msg-icon">✅</span>
                          <div className="msg-content">
                            <span className="msg-from">PMO</span>
                            <span className="msg-text">{L(lang, { en: 'Project on track. Keep up the good work!', fr: 'Projet en bonne voie. Continuez!', es: 'Proyecto en curso normal. ¡Sigue con el buen trabajo!', vi: 'Dự án đúng hướng. Tiếp tục phát huy!' })}</span>
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
                  <h2 className="content-title">🏗️ {L(lang, { en: 'Milestones & Progress', fr: 'Jalons & progrès', es: 'Hitos y progreso', vi: 'Cột mốc & tiến triển' })}</h2>
                  
                  <div className="milestones-report">
                    <div className="milestone-list">
                      <div className={`milestone-item ${gameState.week >= 3 ? 'complete' : gameState.week >= 2 ? 'current' : ''}`}>
                        <span className="milestone-marker">{gameState.week >= 3 ? '✓' : ''}</span>
                        <span className="milestone-name">{L(lang, { en: 'Planning Complete', fr: 'Planification complétée', es: 'Planificación completa', vi: 'Hoàn tất lập kế hoạch' })}</span>
                        <span className="milestone-week">W3</span>
                      </div>
                      <div className={`milestone-item ${gameState.week >= Math.floor(gameState.totalWeeks * 0.5) ? 'complete' : gameState.week >= Math.floor(gameState.totalWeeks * 0.4) ? 'current' : ''}`}>
                        <span className="milestone-marker">{gameState.week >= Math.floor(gameState.totalWeeks * 0.5) ? '✓' : ''}</span>
                        <span className="milestone-name">{L(lang, { en: 'MVP Ready', fr: 'MVP prêt', es: 'MVP listo', vi: 'MVP sẵn sàng' })}</span>
                        <span className="milestone-week">W{Math.floor(gameState.totalWeeks * 0.5)}</span>
                      </div>
                      <div className={`milestone-item ${gameState.week >= Math.floor(gameState.totalWeeks * 0.75) ? 'complete' : gameState.week >= Math.floor(gameState.totalWeeks * 0.65) ? 'current' : ''}`}>
                        <span className="milestone-marker">{gameState.week >= Math.floor(gameState.totalWeeks * 0.75) ? '✓' : ''}</span>
                        <span className="milestone-name">{L(lang, { en: 'Beta Testing', fr: 'Tests bêta', es: 'Pruebas beta', vi: 'Thử nghiệm beta' })}</span>
                        <span className="milestone-week">W{Math.floor(gameState.totalWeeks * 0.75)}</span>
                      </div>
                      <div className={`milestone-item ${gameState.week >= gameState.totalWeeks ? 'complete' : gameState.week >= gameState.totalWeeks - 1 ? 'current' : ''}`}>
                        <span className="milestone-marker">{gameState.week >= gameState.totalWeeks ? '✓' : ''}</span>
                        <span className="milestone-name">{L(lang, { en: 'Launch', fr: 'Lancement', es: 'Lanzamiento', vi: 'Ra mắt' })}</span>
                        <span className="milestone-week">W{gameState.totalWeeks}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress Summary */}
                  <div className="progress-report-card">
                    <h4>📋 {L(lang, { en: `Week ${gameState.week} Summary`, fr: `Résumé semaine ${gameState.week}`, es: `Resumen de la semana ${gameState.week}`, vi: `Tóm tắt tuần ${gameState.week}` })}</h4>
                    <div className="progress-stats">
                      <div className="progress-stat">
                        <span className="progress-label">{L(lang, { en: 'Tasks Done', fr: 'Tâches complétées', es: 'Tareas hechas', vi: 'Việc đã xong' })}</span>
                        <span className="progress-value">{Math.round(scopePercent)}%</span>
                      </div>
                      <div className="progress-stat">
                        <span className="progress-label">{L(lang, { en: 'Meetings', fr: 'Réunions', es: 'Reuniones', vi: 'Cuộc họp' })}</span>
                        <span className="progress-value">{Object.values(gameState.meetings).filter(Boolean).length}/{Object.keys(MEETING_TYPES).length}</span>
                      </div>
                      <div className="progress-stat">
                        <span className="progress-label">{L(lang, { en: 'Actions', fr: 'Actions', es: 'Acciones', vi: 'Hành động' })}</span>
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
                      <div className="anna-panel-role">{L(lang, { en: `Week ${gameState.week} Strategic Briefing`, fr: `Briefing stratégique — Semaine ${gameState.week}`, es: `Briefing estratégico de la semana ${gameState.week}`, vi: `Họp chiến lược tuần ${gameState.week}` })}</div>
                    </div>
                  </div>
                  <button className="anna-close" onClick={() => setAnnaVisible(false)}>✕</button>
                </div>
                <div className="anna-panel-body">
                  {annaLoading ? (
                    <div className="anna-loading">
                      <div className="anna-pulse"></div>
                      <p>{L(lang, { en: 'Anna is analyzing your project...', fr: 'Anna analyse votre projet...', es: 'Anna está analizando tu proyecto...', vi: 'Anna đang phân tích dự án của bạn...' })}</p>
                    </div>
                  ) : (
                    <div className="anna-advice-content">
                      {renderAnnaAdvice(annaAdvice)}
                    </div>
                  )}
                </div>
                <div className="anna-panel-footer">
                  <button className="anna-refresh-btn" onClick={askAnna} disabled={annaLoading}>
                    🔄 {L(lang, { en: 'Refresh Analysis', fr: 'Actualiser l\'analyse', es: 'Actualizar análisis', vi: 'Làm mới phân tích' })}
                  </button>
                  <button className="anna-close-btn" onClick={() => setAnnaVisible(false)}>
                    {L(lang, { en: 'Back to Decisions', fr: 'Retour aux décisions', es: 'Volver a las decisiones', vi: 'Quay lại phần quyết định' })}
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
                  <span className="event-type">⚠️ {L(lang, { en: 'CRITICAL EVENT', fr: 'ÉVÉNEMENT CRITIQUE', es: 'EVENTO CRÍTICO', vi: 'SỰ KIỆN NGHIÊM TRỌNG' })}</span>
                  <h2>{lf(gameState.currentEvent, 'title', lang)}</h2>
                </div>
                
                <div className="event-modal-body">
                  <div className="event-description">
                    <p>{lf(gameState.currentEvent, 'description', lang)}</p>
                  </div>
                  
                  {/* Impact Analysis */}
                  <div className="impact-analysis">
                    <h5>📊 {L(lang, { en: 'Potential Impact:', fr: 'Impact potentiel :', es: 'Impacto potencial:', vi: 'Tác động tiềm tàng:' })}</h5>
                    <div className="impact-cards">
                      <div className="impact-card">
                        <span className="impact-label">{L(lang, { en: 'Budget', fr: 'Budget', es: 'Presupuesto', vi: 'Ngân sách' })}</span>
                        <span className="impact-value warn">{L(lang, { en: 'Variable', fr: 'Variable', es: 'Variable', vi: 'Biến động' })}</span>
                      </div>
                      <div className="impact-card">
                        <span className="impact-label">{L(lang, { en: 'Schedule', fr: 'Calendrier', es: 'Cronograma', vi: 'Tiến độ' })}</span>
                        <span className="impact-value warn">{L(lang, { en: 'At Risk', fr: 'À risque', es: 'En riesgo', vi: 'Có rủi ro' })}</span>
                      </div>
                      <div className="impact-card">
                        <span className="impact-label">{L(lang, { en: 'Team', fr: 'Équipe', es: 'Equipo', vi: 'Đội nhóm' })}</span>
                        <span className="impact-value">{L(lang, { en: 'Depends', fr: 'Selon le choix', es: 'Depende', vi: 'Tùy lựa chọn' })}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decision Options with Consequence Preview */}
                  <div className="event-options-grid">
                    {gameState.currentEvent.options.map((option, idx) => {
                      const colors = ['#10b981', '#f59e0b', '#ef4444', '#6366f1'];
                      const icons = ['✅', '⚠️', '🔥', '💡'];
                      const riskLabels = [L(lang, { en: 'Safe Choice', fr: 'Choix sûr', es: 'Opción segura', vi: 'Lựa chọn an toàn' }), L(lang, { en: 'Moderate Risk', fr: 'Risque modéré', es: 'Riesgo moderado', vi: 'Rủi ro vừa' }), L(lang, { en: 'High Risk', fr: 'Risque élevé', es: 'Riesgo alto', vi: 'Rủi ro cao' }), L(lang, { en: 'Strategic', fr: 'Stratégique', es: 'Estratégico', vi: 'Chiến lược' })];
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
                          <span className="option-label">{lf(option, 'label', lang)}</span>
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
                  <span>⏱️ {L(lang, { en: 'Choose wisely - every decision has consequences!', fr: 'Choisissez judicieusement — chaque décision a des conséquences !', es: 'Elige con cuidado: ¡cada decisión tiene consecuencias!', vi: 'Hãy chọn khôn ngoan — mỗi quyết định đều có hệ quả!' })}</span>
                </div>
              </div>
            </div>
          )}

          {/* Paywall Modal for Free Users */}
          {showPaywall && (
            <div className="event-overlay">
              <div className="event-modal paywall-modal">
                <span className="event-icon">🔒</span>
                <h2>{L(lang, { en: 'You\'re Doing Great!', fr: 'Vous vous débrouillez très bien !', es: '¡Lo estás haciendo genial!', vi: 'Bạn đang làm rất tốt!' })}</h2>
                <p>
                  {gameState.framework === 'scrum'
                    ? L(lang, { en: `You've completed your first sprint — ${gameState.valueDelivered} points of business value are on the board and the team is counting on you!`, fr: `Vous avez complété votre premier sprint — ${gameState.valueDelivered} points de valeur d'affaires sont au tableau et l'équipe compte sur vous !`, es: `Completaste tu primer sprint — ${gameState.valueDelivered} puntos de valor de negocio están en el tablero ¡y el equipo cuenta contigo!`, vi: `Bạn đã hoàn thành sprint đầu tiên — ${gameState.valueDelivered} điểm giá trị kinh doanh đã lên bảng và cả đội đang trông cậy vào bạn!` })
                    : L(lang, { en: `You've completed Week ${FREE_TRIAL_WEEKS} of the simulation. Your project is ${Math.round((gameState.scope.completed / gameState.scope.totalFeatures) * 100)}% complete and the team is counting on you!`, fr: `Vous avez complété la semaine ${FREE_TRIAL_WEEKS} de la simulation. Votre projet est complété à ${Math.round((gameState.scope.completed / gameState.scope.totalFeatures) * 100)}% et l'équipe compte sur vous !`, es: `Completaste la semana ${FREE_TRIAL_WEEKS} de la simulación. Tu proyecto está ${Math.round((gameState.scope.completed / gameState.scope.totalFeatures) * 100)}% completo ¡y el equipo cuenta contigo!`, vi: `Bạn đã hoàn thành Tuần ${FREE_TRIAL_WEEKS} của mô phỏng. Dự án đã xong ${Math.round((gameState.scope.completed / gameState.scope.totalFeatures) * 100)}% và cả đội đang trông cậy vào bạn!` })}
                </p>
                <p className="paywall-hook">
                  <strong>{L(lang, { en: 'Upgrade to Professional', fr: 'Passez à Professionnel', es: 'Mejora a Professional', vi: 'Nâng cấp lên gói Chuyên nghiệp' })}</strong> {L(lang, { en: 'to continue your journey and see how your decisions play out. Will you deliver on time? Will the stakeholders be happy?', fr: 'pour continuer votre parcours et voir où mènent vos décisions. Livrerez-vous à temps ? Les parties prenantes seront-elles satisfaites ?', es: 'para continuar tu camino y ver cómo se desarrollan tus decisiones. ¿Entregarás a tiempo? ¿Estarán contentos los interesados?', vi: 'để tiếp tục hành trình và xem các quyết định của bạn dẫn đến đâu. Bạn có giao đúng hạn? Các bên liên quan có hài lòng?' })}
                </p>
                <div className="paywall-price">
                  <span className="price-tag">$19</span>
                  <span className="price-period">/month</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted, #94a3b8)', marginTop: '-4px' }}>
                  {L(lang, { en: 'or $149 one-time — lifetime access', fr: 'ou 149$ unique — accès à vie', es: 'o $149 pago único — acceso de por vida', vi: 'hoặc $149 một lần — truy cập trọn đời' })}
                </p>
                <div className="paywall-features">
                  <div>✓ {L(lang, { en: 'Unlimited simulation plays', fr: 'Parties illimitées', es: 'Partidas ilimitadas', vi: 'Chơi mô phỏng không giới hạn' })}</div>
                  <div>✓ {L(lang, { en: 'All scenarios unlocked', fr: 'Tous les scénarios débloqués', es: 'Todos los escenarios desbloqueados', vi: 'Mở khóa tất cả kịch bản' })}</div>
                  <div>✓ {L(lang, { en: 'Detailed analytics', fr: 'Analytique détaillée', es: 'Analíticas detalladas', vi: 'Phân tích chi tiết' })}</div>
                  <div>✓ {L(lang, { en: 'Certificates of completion', fr: 'Certificats de réussite', es: 'Certificados de finalización', vi: 'Chứng chỉ hoàn thành' })}</div>
                </div>
                <div className="paywall-actions">
                  <button className="btn-primary paywall-upgrade" onClick={() => { setShowPaywall(false); setCurrentPage('pricing'); }}>
                    {L(lang, { en: 'Upgrade Now →', fr: 'Passer au supérieur →', es: 'Mejorar ahora →', vi: 'Nâng cấp ngay →' })}
                  </button>
                  <button className="btn-secondary paywall-later" onClick={() => { setShowPaywall(false); setSimPhase('select'); setGameState(null); }}>
                    {L(lang, { en: 'Maybe Later', fr: 'Peut-être plus tard', es: 'Quizás después', vi: 'Để sau' })}
                  </button>
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
                  color: grade.startsWith('A') ? '#10b981' : grade.startsWith('B') ? '#6366f1' : grade === 'C' ? '#f59e0b' : '#ef4444'
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
                    {L(lang, { en: 'ANNA — Post-Project Debrief', fr: 'ANNA — Bilan post-projet', es: 'ANNA — Debrief post-proyecto', vi: 'ANNA — Tổng kết sau dự án' })}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                    {L(lang, { en: 'AI Project Management Advisor', fr: 'Conseillère IA en gestion de projet', es: 'Asesora de gestión de proyectos con IA', vi: 'Cố vấn quản lý dự án bằng AI' })}
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
                    <p>{L(lang, { en: 'Anna is preparing your debrief...', fr: 'Anna prépare votre bilan...', es: 'Anna está preparando tu debrief...', vi: 'Anna đang chuẩn bị bản tổng kết...' })}</p>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '20px' }}>
                    <button className="btn-anna-debrief" onClick={() => askAnnaDebrief(finalScore, grade, gameState)}>
                      {annaAvatar()}
                      <span>{L(lang, { en: 'Get Anna\'s Debrief', fr: 'Obtenir le bilan d\'Anna', es: 'Ver el debrief de Anna', vi: 'Xem tổng kết của Anna' })}</span>
                    </button>
                    <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '8px' }}>
                      {L(lang, { en: 'Personalized analysis of your PM performance', fr: 'Analyse personnalisée de votre performance GP', es: 'Análisis personalizado de tu desempeño como PM', vi: 'Phân tích cá nhân hóa hiệu suất PM của bạn' })}
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
              <button className="btn-secondary-lg" onClick={() => setCurrentPage('dashboard')}>
                {t('results.backToDashboard', lang)}
              </button>
            </div>
            
            {/* Print/Save Actions */}
            <div className="results-secondary-actions">
              <button className="btn-print" onClick={() => window.print()}>
                {t('results.printReport', lang)}
              </button>
              <button className="btn-print" onClick={() => {
                const text = L(lang, {
                  en: `BizSimHub Results - ${selectedScenario.projectName}
Grade: ${grade} | Score: ${finalScore}/1000
Scope: ${scopeScore}% | Schedule: ${scheduleOnTarget ? 'On Time' : 'Late'} | Budget: ${budgetOnTarget ? 'On Target' : 'Over'}
Quality: ${qualityScore}% | Team Morale: ${teamScore}%`,
                  fr: `Résultats BizSimHub - ${selectedScenario.projectName}
Note: ${grade} | Score: ${finalScore}/1000
Périmètre: ${scopeScore}% | Calendrier: ${scheduleOnTarget ? 'À temps' : 'En retard'} | Budget: ${budgetOnTarget ? 'Respecté' : 'Dépassé'}
Qualité: ${qualityScore}% | Moral équipe: ${teamScore}%`,
                  es: `Resultados BizSimHub - ${selectedScenario.projectName}
Nota: ${grade} | Puntaje: ${finalScore}/1000
Alcance: ${scopeScore}% | Cronograma: ${scheduleOnTarget ? 'A tiempo' : 'Atrasado'} | Presupuesto: ${budgetOnTarget ? 'En meta' : 'Excedido'}
Calidad: ${qualityScore}% | Moral del equipo: ${teamScore}%`,
                  vi: `Kết quả BizSimHub - ${selectedScenario.projectName}
Hạng: ${grade} | Điểm: ${finalScore}/1000
Phạm vi: ${scopeScore}% | Tiến độ: ${scheduleOnTarget ? 'Đúng hạn' : 'Trễ'} | Ngân sách: ${budgetOnTarget ? 'Trong mức' : 'Vượt'}
Chất lượng: ${qualityScore}% | Tinh thần đội: ${teamScore}%`
                });
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

  return (
    <div className="app">
      <style>{`
        :root {
          --bg-primary: #0a0a0f;
          --bg-secondary: #12121a;
          --bg-card: #1a1a24;
          --bg-elevated: #242430;
          --text-primary: #ffffff;
          --text-secondary: #b4b4c0;
          --text-muted: #6b6b7a;
          --accent-primary: #6366f1;
          --accent-secondary: #8b5cf6;
          --border: #2a2a38;
          --border-hover: #3a3a4a;
          --success: #10b981;
          --warning: #f59e0b;
          --error: #ef4444;
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
        .nav-btn-primary { background: var(--accent-primary); border: none; color: white; padding: 0.6rem 1.25rem; border-radius: 8px; font-weight: 500; transition: opacity 0.2s; }
        .nav-btn-primary:hover { opacity: 0.9; }
        .nav-user { display: flex; align-items: center; gap: 0.75rem; padding-left: 1rem; border-left: 1px solid var(--border); }
        .user-avatar { width: 32px; height: 32px; background: var(--accent-primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 0.9rem; }
        .user-name { font-size: 0.9rem; color: var(--text-secondary); }
        .nav-link-small { background: none; border: none; color: var(--text-muted); font-size: 0.85rem; }
        
        /* Buttons */
        .btn-primary { background: var(--accent-primary); border: none; color: white; padding: 0.75rem 1.5rem; border-radius: 10px; font-weight: 500; font-size: 0.95rem; transition: all 0.2s; }
        .btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }
        .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
        .btn-secondary { background: var(--bg-elevated); border: 1px solid var(--border); color: var(--text-primary); padding: 0.75rem 1.5rem; border-radius: 10px; font-weight: 500; font-size: 0.95rem; transition: all 0.2s; }
        .btn-secondary:hover { border-color: var(--border-hover); background: var(--bg-card); }
        .btn-full { width: 100%; }
        .btn-lg { padding: 1rem 2rem; font-size: 1.1rem; }
        .btn-primary-lg { background: var(--accent-primary); border: none; color: white; padding: 1rem 2rem; border-radius: 12px; font-weight: 600; font-size: 1.1rem; }
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
          filter: drop-shadow(0 20px 40px rgba(99, 102, 241, 0.3));
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
        .hero-badge { display: inline-block; padding: 0.5rem 1rem; background: rgba(99, 102, 241, 0.15); border: 1px solid rgba(99, 102, 241, 0.3); border-radius: 50px; font-size: 0.9rem; color: var(--accent-primary); margin-bottom: 1.5rem; }
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
        .section-badge { display: inline-block; padding: 0.4rem 0.8rem; background: rgba(99, 102, 241, 0.15); border-radius: 4px; font-size: 0.8rem; color: var(--accent-primary); font-weight: 600; margin-bottom: 1rem; }
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
        .sim-badge-featured { background: var(--success); color: white; }
        
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
        .btn-google { width: 100%; padding: 0.85rem; background: var(--bg-elevated); border: 1px solid var(--border); border-radius: 10px; color: var(--text-primary); font-size: 0.95rem; display: flex; align-items: center; justify-content: center; gap: 0.75rem; }
        .google-icon { font-weight: 700; font-size: 1.1rem; }
        .auth-toggle { text-align: center; margin-top: 1.5rem; color: var(--text-muted); font-size: 0.9rem; }
        .auth-toggle button { background: none; border: none; color: var(--accent-primary); font-size: 0.9rem; }
        
        /* Dashboard - LIGHT THEME */
        .dashboard-page { 
          min-height: 100vh; 
          padding-top: 65px; 
          background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%);
          color: #1e293b;
        }
        .dashboard-page .navbar { background: rgba(255, 255, 255, 0.95); border-bottom: 1px solid #e2e8f0; }
        .dashboard-page .nav-link { color: #475569; }
        .dashboard-page .nav-link:hover { color: #1e293b; }
        .dashboard-page .user-name { color: #475569; }
        .dashboard-page .nav-link-small { color: #64748b; }
        
        .dashboard-layout { display: flex; max-width: 1400px; margin: 0 auto; }
        .sidebar { 
          width: 280px; 
          padding: 2rem; 
          border-right: 1px solid #e2e8f0; 
          min-height: calc(100vh - 65px); 
          background: #ffffff;
        }
        .sidebar-section { margin-bottom: 2rem; }
        .sidebar-section h3 { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; color: #64748b; margin-bottom: 1rem; font-weight: 600; }
        .sidebar-btn { 
          width: 100%; 
          padding: 0.85rem 1rem; 
          background: #f8fafc; 
          border: 1px solid #e2e8f0; 
          border-radius: 10px; 
          color: #1e293b; 
          font-size: 0.9rem; 
          text-align: left; 
          margin-bottom: 0.5rem; 
          transition: all 0.2s; 
          font-weight: 500;
        }
        .sidebar-btn:hover { border-color: #6366f1; background: #f0f0ff; }
        .stat-item { display: flex; justify-content: space-between; padding: 0.75rem 0; border-bottom: 1px solid #e2e8f0; font-size: 0.9rem; }
        .stat-item span { color: #64748b; }
        .stat-item strong { color: #1e293b; font-weight: 700; }
        .dashboard-main { flex: 1; padding: 2rem; }
        .welcome-card { 
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%); 
          border: none;
          border-radius: 24px; 
          padding: 2.5rem; 
          margin-bottom: 2rem;
          position: relative;
          overflow: hidden;
          color: white;
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
        .welcome-card h1 { font-size: 1.75rem; margin-bottom: 0.5rem; color: white; position: relative; z-index: 1; }
        .welcome-card p { color: rgba(255,255,255,0.9); position: relative; z-index: 1; }
        .dashboard-section { margin-bottom: 2rem; }
        .dashboard-section h2 { font-size: 1.25rem; margin-bottom: 1rem; color: #1e293b; }
        .scores-list { display: flex; flex-direction: column; gap: 0.5rem; }
        .score-item { 
          background: #ffffff; 
          border: 1px solid #e2e8f0; 
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
        .score-date { font-size: 0.85rem; color: #64748b; }
        .score-result { text-align: right; }
        .score-grade { font-size: 1.5rem; font-weight: 700; color: #4f46e5; margin-right: 0.75rem; }
        .score-points { color: #64748b; font-weight: 500; }
        .no-scores { color: #64748b; font-style: italic; }
        .featured-sim-card { 
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
          border: 1px solid #e2e8f0; 
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
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .featured-sim-card:hover { 
          border-color: #6366f1; 
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(99, 102, 241, 0.15);
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
        .featured-sim-content p { color: #64748b; font-size: 0.9rem; margin-bottom: 0.5rem; }
        .featured-sim-cta { color: #4f46e5; font-size: 0.9rem; font-weight: 600; }
        
        /* Catalog - LIGHT THEME */
        .catalog-page { 
          min-height: 100vh; 
          padding-top: 65px; 
          background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%);
          color: #1e293b;
        }
        .catalog-page .navbar { background: rgba(255, 255, 255, 0.95); border-bottom: 1px solid #e2e8f0; }
        .catalog-page .nav-link { color: #475569; }
        .catalog-page .nav-link:hover { color: #1e293b; }
        .catalog-page .user-name { color: #475569; }
        
        .catalog-container { max-width: 1400px; margin: 0 auto; padding: 2rem; }
        .catalog-header { text-align: center; margin-bottom: 3rem; }
        .catalog-header h1 { font-size: 2.5rem; margin-bottom: 0.5rem; color: #1e293b; }
        .catalog-header p { color: #64748b; }
        .catalog-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(380px, 1fr)); gap: 1.5rem; }
        .catalog-card { 
          background: #ffffff; 
          border: 1px solid #e2e8f0; 
          border-radius: 20px; 
          overflow: hidden; 
          display: flex; 
          flex-direction: column; 
          transition: all 0.3s; 
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .catalog-card:hover { border-color: #6366f1; transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
        .catalog-card.locked { opacity: 0.75; }
        .catalog-card-header { padding: 1.5rem; display: flex; justify-content: space-between; align-items: flex-start; }
        .catalog-icon { font-size: 3rem; }
        .catalog-badges { display: flex; gap: 0.5rem; }
        .badge-featured { padding: 0.25rem 0.6rem; background: #10b981; color: white; border-radius: 4px; font-size: 0.7rem; font-weight: 600; }
        .badge-soon { padding: 0.25rem 0.6rem; background: #f1f5f9; color: #64748b; border-radius: 4px; font-size: 0.7rem; font-weight: 600; }
        .badge-pro { padding: 0.25rem 0.6rem; background: #8b5cf6; color: white; border-radius: 4px; font-size: 0.7rem; font-weight: 600; }
        .catalog-card-body { padding: 0 1.5rem 1.5rem; flex: 1; }
        .catalog-category { font-size: 0.8rem; color: #4f46e5; font-weight: 600; }
        .catalog-card-body h3 { font-size: 1.4rem; margin: 0.25rem 0; color: #1e293b; }
        .catalog-subtitle { color: #475569; font-size: 0.95rem; margin-bottom: 0.75rem; }
        .catalog-desc { color: #64748b; font-size: 0.9rem; line-height: 1.6; margin-bottom: 1rem; }
        .catalog-skills { display: flex; flex-wrap: wrap; gap: 0.4rem; }
        .skill-tag { padding: 0.25rem 0.6rem; background: #f1f5f9; border-radius: 4px; font-size: 0.75rem; color: #475569; font-weight: 500; }
        .catalog-card-footer { padding: 1.25rem 1.5rem; border-top: 1px solid #e2e8f0; background: #f8fafc; }
        .catalog-meta { display: flex; gap: 1rem; font-size: 0.8rem; color: #64748b; margin-bottom: 1rem; }
        .catalog-card-footer button { width: 100%; }
        
        /* Pricing */
        .pricing-page { min-height: 100vh; padding-top: 80px; }
        .pricing-container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
        .pricing-header { text-align: center; margin-bottom: 3rem; }
        .pricing-header h1 { font-size: 2.5rem; margin-bottom: 0.5rem; }
        .pricing-header p { color: var(--text-muted); margin-bottom: 1.5rem; }
        .billing-toggle { display: inline-flex; background: var(--bg-card); border: 1px solid var(--border); border-radius: 10px; padding: 0.25rem; }
        .billing-toggle button { padding: 0.6rem 1.25rem; background: transparent; border: none; color: var(--text-muted); border-radius: 8px; font-size: 0.9rem; transition: all 0.2s; }
        .billing-toggle button.active { background: var(--accent-primary); color: white; }
        .pricing-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
        .pricing-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 20px; padding: 2rem; position: relative; }
        .pricing-card.popular { border-color: var(--accent-primary); }
        .popular-badge { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: var(--accent-primary); color: white; padding: 0.35rem 1rem; border-radius: 20px; font-size: 0.8rem; font-weight: 600; }
        .pricing-card h3 { font-size: 1.5rem; margin-bottom: 0.25rem; }
        .plan-desc { color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.5rem; }
        .plan-price { margin-bottom: 1.5rem; }
        .plan-price .price { font-size: 3rem; font-weight: 700; }
        .plan-price .period { color: var(--text-muted); }
        .plan-features { list-style: none; margin-bottom: 2rem; }
        .plan-features li { padding: 0.5rem 0; color: var(--text-secondary); font-size: 0.95rem; }
        .savings-badge { 
          background: linear-gradient(135deg, #10b981 0%, #059669 100%); 
          color: white; 
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
          background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%);
          color: #1e293b;
        }
        .sim-page .navbar { background: rgba(255, 255, 255, 0.95); border-bottom: 1px solid #e2e8f0; }
        .sim-page .nav-link { color: #475569; }
        .sim-page .nav-link:hover { color: #1e293b; }
        .sim-page .user-name { color: #475569; }
        
        /* NEW: Industry Selection Page - Dark Theme */
        .sim-select-page {
          min-height: 100vh;
          padding-top: 65px;
          background: linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #0f0f1a 100%);
          color: #ffffff;
          position: relative;
          overflow: hidden;
        }
        .sim-select-page .navbar { background: rgba(20, 20, 40, 0.95); border-bottom: 1px solid rgba(99, 102, 241, 0.2); }
        .sim-select-page .nav-link { color: #9ca3af; }
        .sim-select-page .nav-link:hover { color: #ffffff; }
        .sim-select-page .user-name { color: #9ca3af; }
        .sim-select-page .logo-text { color: #ffffff; }
        .sim-select-page .back-link { color: #8b5cf6; }
        
        .sim-select-page .sim-select-container { max-width: 1300px; margin: 0 auto; padding: 2rem; position: relative; z-index: 1; }
        
        .sim-select-page .sim-select-header { text-align: center; margin-bottom: 2.5rem; }
        .sim-select-page .sim-select-header h1 { font-size: 2.5rem; font-weight: 700; color: #ffffff; margin-bottom: 0.5rem; }
        .sim-select-page .sim-select-header p { color: #9ca3af; font-size: 1.1rem; }
        
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
          background: linear-gradient(135deg, #1e1e32 0%, #252540 100%);
          border: 1px solid rgba(99, 102, 241, 0.15);
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: all 0.4s ease;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
        }
        .industry-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 50px rgba(99, 102, 241, 0.2);
          border-color: rgba(99, 102, 241, 0.4);
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
          color: #ffffff;
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
          color: #9ca3af;
          display: block;
          margin-bottom: 0.25rem;
        }
        .industry-challenge p {
          font-size: 0.85rem;
          color: #d1d5db;
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
          color: #6b7280;
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
          color: #ffffff;
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
          color: #9ca3af;
          font-size: 0.95rem;
          margin-bottom: 1.5rem;
        }
        .sim-stats-bar {
          display: inline-flex;
          background: linear-gradient(135deg, #1e1e32 0%, #252540 100%);
          border: 1px solid rgba(99, 102, 241, 0.15);
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
          color: #ffffff;
        }
        .sim-stat-num.purple {
          color: #8b5cf6;
        }
        .sim-stat-label {
          font-size: 0.8rem;
          color: #9ca3af;
        }
        
        .sim-select-container, .brief-container { max-width: 900px; margin: 0 auto; padding: 2rem; }
        .back-link { background: none; border: none; color: #4f46e5; font-family: inherit; font-size: 0.95rem; cursor: pointer; margin-bottom: 2rem; padding: 0; font-weight: 500; }
        .sim-select-header { text-align: center; margin-bottom: 3rem; }
        .sim-select-icon { font-size: 4rem; margin-bottom: 1rem; display: block; }
        .sim-select-header h1 { font-size: 2.5rem; margin-bottom: 0.5rem; color: #1e293b; }
        .sim-select-header p { color: #64748b; }
        .scenarios-title { font-size: 1.25rem; margin-bottom: 1.5rem; color: #475569; }
        .scenarios-grid { display: flex; flex-direction: column; gap: 1rem; }
        .scenario-card { 
          background: linear-gradient(135deg, #ffffff 0%, #fafafa 100%);
          border: 1px solid #e2e8f0; 
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
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .scenario-card:hover { 
          border-color: #6366f1; 
          transform: translateY(-4px) scale(1.01);
          box-shadow: 0 12px 40px rgba(99, 102, 241, 0.15);
        }
        .scenario-card:hover::before { opacity: 1; }
        .scenario-icon { 
          font-size: 2.5rem; 
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          padding: 1rem; 
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.06);
          position: relative;
          z-index: 1;
        }
        .scenario-info { flex: 1; }
        .scenario-info h3 { font-size: 1.2rem; margin-bottom: 0.2rem; color: #1e293b; }
        .scenario-sub { color: #4f46e5; font-size: 0.9rem; margin-bottom: 0.5rem; font-weight: 500; }
        .scenario-desc { color: #64748b; font-size: 0.9rem; margin-bottom: 0.5rem; }
        .scenario-badge { display: inline-block; padding: 0.25rem 0.5rem; background: #eef2ff; border-radius: 4px; font-size: 0.75rem; color: #4f46e5; margin-right: 0.5rem; font-weight: 500; }
        .scenario-meta { text-align: right; font-size: 0.85rem; color: #64748b; }
        .scenario-meta .difficulty { font-weight: 600; display: block; margin-bottom: 0.25rem; }
        
        /* Brief - LIGHT THEME */
        .brief-header { display: flex; align-items: center; gap: 1.5rem; margin-bottom: 2rem; }
        .brief-icon { font-size: 3rem; background: #f8fafc; padding: 1.25rem; border-radius: 18px; border: 1px solid #e2e8f0; }
        .brief-header h1 { font-size: 2rem; margin-bottom: 0.25rem; color: #1e293b; }
        .brief-company { color: #4f46e5; font-weight: 500; }
        .brief-content { 
          background: #ffffff; 
          border: 1px solid #e2e8f0; 
          border-radius: 18px; 
          padding: 2rem; 
          margin-bottom: 2rem; 
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .brief-section { margin-bottom: 1.5rem; }
        .brief-section h3 { font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.1em; color: #4f46e5; margin-bottom: 0.5rem; font-weight: 600; }
        .brief-section p { color: #475569; line-height: 1.7; }
        .mechanics-list { color: #475569; padding-left: 1.5rem; margin-top: 0.5rem; }
        .mechanics-list li { margin-bottom: 0.5rem; }
        .mechanics-list strong { color: #1e293b; }
        .brief-objectives h3 { font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.1em; color: #4f46e5; margin-bottom: 1rem; font-weight: 600; }
        .objectives-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
        .objective { 
          background: #f8fafc; 
          border: 1px solid #e2e8f0;
          border-radius: 12px; 
          padding: 1rem; 
          display: flex; 
          flex-direction: column; 
          gap: 0.25rem; 
          text-align: center; 
        }
        .objective span:first-child { font-size: 1.25rem; }
        .objective strong { font-size: 0.7rem; color: #64748b; font-weight: 600; text-transform: uppercase; }
        .objective span:last-child { font-family: 'JetBrains Mono', monospace; font-weight: 700; color: #1e293b; }
        .brief-actions { display: flex; gap: 1rem; justify-content: center; }
        
        /* HBP-Style Tabbed Brief */
        .brief-container.hbp-style { max-width: 1000px; }
        .brief-tabs {
          display: flex;
          gap: 0;
          border-bottom: 2px solid #e2e8f0;
          margin-bottom: 2rem;
        }
        .brief-tab {
          padding: 1rem 1.5rem;
          background: none;
          border: none;
          font-size: 1rem;
          font-weight: 500;
          color: #64748b;
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
          border: 1px solid #e2e8f0;
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
          border-bottom: 1px solid #e2e8f0;
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
          border: 1px solid #e2e8f0;
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
          color: #64748b;
          font-size: 0.95rem;
          margin: 0;
        }
        .objectives-section { margin-top: 1.5rem; }
        .objective-block {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 1.25rem 1.5rem;
          margin-bottom: 1rem;
        }
        .objective-block h4 { margin-top: 0; }
        .objective-block p {
          color: #64748b;
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
          border: 1px solid #e2e8f0;
          border-radius: 12px;
        }
        .causal-icon { font-size: 1.5rem; }
        .causal-item strong {
          display: block;
          color: #1e293b;
          margin-bottom: 0.25rem;
        }
        .causal-item p {
          color: #64748b;
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
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 1rem 1.25rem;
        }
        .action-item strong {
          display: block;
          color: #1e293b;
          margin-bottom: 0.25rem;
        }
        .action-item p {
          color: #64748b;
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
          border: 1px solid #e2e8f0; 
          border-radius: 24px; 
          padding: 2.5rem; 
          max-width: 600px; 
          width: 100%; 
          max-height: 80vh; 
          overflow-y: auto; 
          box-shadow: 0 25px 50px rgba(0,0,0,0.15);
        }
        .how-to-play-modal h2 { margin-bottom: 1.5rem; color: #1e293b; }
        .how-to-content h3 { color: #4f46e5; font-size: 1rem; margin: 1.5rem 0 0.5rem; }
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
          background: linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #0f0f1a 100%); 
          min-height: 100vh; 
          color: #ffffff;
          position: relative;
          overflow-x: hidden;
        }
        .sim-playing .navbar { background: rgba(20, 20, 40, 0.95); border-bottom: 1px solid rgba(99, 102, 241, 0.2); backdrop-filter: blur(10px); }
        .sim-playing .nav-link { color: #9ca3af; }
        .sim-playing .nav-link:hover { color: #ffffff; }
        .sim-playing .user-name { color: #9ca3af; }
        .sim-playing .logo-text { color: #ffffff; }
        
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
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          top: -200px;
          right: -200px;
          animation-delay: 0s;
        }
        .shape-2 {
          width: 500px;
          height: 500px;
          background: linear-gradient(135deg, #06b6d4 0%, #10b981 100%);
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
          background: linear-gradient(180deg, #131325 0%, #1a1a30 100%);
          border-right: 1px solid rgba(99, 102, 241, 0.15);
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
          border-bottom: 1px solid rgba(99, 102, 241, 0.1);
          margin-bottom: 0.5rem;
        }
        .sidebar-project-icon { font-size: 1.4rem; }
        .sidebar-project-name { font-size: 0.8rem; font-weight: 700; color: #fff; line-height: 1.2; }
        .sidebar-company { font-size: 0.7rem; color: #6b7280; }
        .sidebar-week-badge {
          text-align: center;
          padding: 0.4rem 0.75rem;
          margin: 0 0.75rem 0.75rem;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          border-radius: 8px;
          font-size: 0.82rem;
          font-weight: 700;
          color: #fff;
        }
        .sidebar-week-total { opacity: 0.7; font-weight: 400; }
        .sidebar-section-label {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #6b7280;
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
          color: #9ca3af;
          font-size: 0.82rem;
          cursor: pointer;
          transition: all 0.15s;
          text-align: left;
          border-left: 3px solid transparent;
        }
        .sidebar-nav-item:hover { color: #fff; background: rgba(99, 102, 241, 0.08); }
        .sidebar-nav-item.active {
          color: #818cf8;
          background: rgba(99, 102, 241, 0.12);
          border-left-color: #6366f1;
          font-weight: 600;
        }
        .sidebar-nav-icon { font-size: 0.9rem; width: 20px; text-align: center; flex-shrink: 0; }
        
        .sidebar-actions {
          margin-top: auto;
          padding: 0.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          border-top: 1px solid rgba(99, 102, 241, 0.1);
        }
        .btn-anna-sidebar {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          width: 100%;
          padding: 0.5rem 0.75rem;
          background: linear-gradient(135deg, rgba(20, 184, 166, 0.15), rgba(6, 182, 212, 0.1));
          border: 1px solid rgba(20, 184, 166, 0.3);
          border-radius: 10px;
          color: #14b8a6;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-anna-sidebar:hover {
          background: linear-gradient(135deg, rgba(20, 184, 166, 0.25), rgba(6, 182, 212, 0.2));
          border-color: #14b8a6;
        }
        .btn-anna-sidebar .anna-avatar-img { width: 28px !important; height: 28px !important; }
        .btn-advance-sidebar {
          width: 100%;
          padding: 0.6rem;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          border: none;
          border-radius: 10px;
          color: #fff;
          font-size: 0.82rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-advance-sidebar:hover { transform: translateY(-1px); box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4); }

        /* MAIN CONTENT */
        .game-content {
          padding: 1.5rem 2rem;
          overflow-y: auto;
          max-height: calc(100vh - 60px);
        }
        .content-section { max-width: 900px; }
        .content-title {
          font-size: 1.5rem;
          color: #fff;
          margin-bottom: 0.5rem;
        }
        .content-desc {
          color: #9ca3af;
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
          background: linear-gradient(135deg, #1e1e32 0%, #252540 100%);
          border: 1px solid rgba(99, 102, 241, 0.15);
          border-radius: 14px;
          padding: 1.1rem;
        }
        .kpi-label { font-size: 0.65rem; color: #6b7280; font-weight: 600; letter-spacing: 0.05em; margin-bottom: 0.4rem; }
        .kpi-value { font-size: 1.5rem; font-weight: 700; color: #fff; margin-bottom: 0.5rem; }
        .kpi-bar { height: 5px; background: #2a2a40; border-radius: 3px; overflow: hidden; }
        .kpi-bar-fill { height: 100%; border-radius: 3px; transition: width 0.5s ease; }
        .kpi-subtext { font-size: 0.75rem; color: #6b7280; margin-top: 0.25rem; }
        
        /* Anna Overview Card */
        .anna-overview-card {
          background: linear-gradient(135deg, #0f172a 0%, #1a2332 100%);
          border: 1px solid rgba(20, 184, 166, 0.2);
          border-radius: 14px;
          padding: 1.25rem;
          margin-bottom: 1.5rem;
        }
        .anna-overview-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
          color: #fff;
          font-size: 0.95rem;
        }
        .anna-overview-text {
          color: #94a3b8;
          font-size: 0.88rem;
          line-height: 1.7;
        }
        .anna-overview-card .anna-avatar-img { width: 40px !important; height: 40px !important; }
        
        /* Overview Timeline */
        .overview-timeline {
          background: linear-gradient(135deg, #1e1e32 0%, #252540 100%);
          border: 1px solid rgba(99, 102, 241, 0.15);
          border-radius: 14px;
          padding: 1.25rem;
        }
        .overview-timeline h4 { color: #fff; font-size: 0.95rem; margin-bottom: 0.5rem; }
        .timeline-status-label { font-size: 0.8rem; margin-bottom: 0.75rem; }

        /* Team Control */
        .team-control-card {
          background: linear-gradient(135deg, #1e1e32 0%, #252540 100%);
          border: 1px solid rgba(99, 102, 241, 0.15);
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
        .team-count-large { font-size: 3rem; font-weight: 800; color: #fff; min-width: 80px; }
        .team-cost-note { font-size: 0.8rem; color: #6b7280; }
        
        /* Team Stats Grid */
        .team-stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        .team-stat-card {
          background: linear-gradient(135deg, #1e1e32 0%, #252540 100%);
          border: 1px solid rgba(99, 102, 241, 0.15);
          border-radius: 14px;
          padding: 1.25rem;
        }
        .team-stat-label { font-size: 0.75rem; color: #6b7280; margin-bottom: 0.4rem; font-weight: 600; }
        .team-stat-value { font-size: 1.5rem; font-weight: 700; margin-bottom: 0.5rem; }

        /* Resource Cards */
        .resource-card {
          background: linear-gradient(135deg, #1e1e32 0%, #252540 100%);
          border: 1px solid rgba(99, 102, 241, 0.15);
          border-radius: 14px;
          padding: 1.25rem;
          margin-bottom: 1.25rem;
        }
        .resource-card h3 { font-size: 1rem; color: #8b5cf6; margin-bottom: 1rem; }
        .resource-actions-grid { display: flex; flex-direction: column; gap: 0.75rem; }
        .resource-action-btn {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.25rem;
          background: linear-gradient(135deg, #252540 0%, #1e1e32 100%);
          border: 1px solid #3a3a50;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
          width: 100%;
        }
        .resource-action-btn:hover { border-color: #6366f1; background: rgba(99, 102, 241, 0.08); transform: translateX(4px); }
        .resource-action-icon { font-size: 1.5rem; flex-shrink: 0; }
        .resource-action-btn strong { display: block; color: #fff; font-size: 0.9rem; margin-bottom: 0.2rem; }
        .resource-action-btn p { color: #6b7280; font-size: 0.78rem; margin: 0; }
        .resource-action-btn.quality:hover { border-color: #10b981; }
        .resource-action-btn.crunch:hover { border-color: #ef4444; }
        .resource-action-btn.schedule:hover { border-color: #f59e0b; }
        .resource-action-btn.proto:hover { border-color: #8b5cf6; }
        .resource-action-btn.team-build:hover { border-color: #14b8a6; }

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
        .action-toast.info { background: linear-gradient(135deg, #1e3a5f, #1e3a8a); border: 1px solid #3b82f6; color: #93c5fd; }
        @keyframes toastIn { from { opacity: 0; transform: translateX(-50%) translateY(-10px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
        @keyframes toastOut { from { opacity: 1; } to { opacity: 0; transform: translateX(-50%) translateY(-10px); } }

        /* Meetings */
        .meetings-list { display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1rem; }
        .meeting-card-btn {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.25rem;
          background: linear-gradient(135deg, #1e1e32 0%, #252540 100%);
          border: 1px solid #3a3a50;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
          width: 100%;
        }
        .meeting-card-btn:hover:not(:disabled) { border-color: #6366f1; transform: translateX(4px); }
        .meeting-card-btn.done { border-color: rgba(16, 185, 129, 0.4); background: rgba(16, 185, 129, 0.06); }
        .meeting-card-btn:disabled { cursor: default; }
        .meeting-card-icon { font-size: 1.4rem; flex-shrink: 0; }
        .meeting-card-info { flex: 1; }
        .meeting-card-info strong { display: block; color: #fff; font-size: 0.9rem; margin-bottom: 0.15rem; }
        .meeting-card-info p { color: #6b7280; font-size: 0.78rem; margin: 0; }
        .meeting-card-status { font-size: 1.1rem; color: #6b7280; }
        .meeting-card-btn.done .meeting-card-status { color: #10b981; }
        .meetings-summary { color: #6b7280; font-size: 0.82rem; text-align: center; padding: 0.5rem; }

        /* Prototype */
        .prototype-status { text-align: center; margin-bottom: 1.5rem; }
        .prototype-count { font-size: 3rem; font-weight: 800; color: #8b5cf6; }
        .prototype-status p { color: #6b7280; font-size: 0.85rem; }
        .prototype-complete { text-align: center; color: #10b981; font-weight: 600; padding: 2rem; font-size: 1.1rem; }

        /* Health Report */
        .health-radar-card, .health-metrics-card, .risks-report-card, .stakeholder-report-card, .milestones-report, .progress-report-card {
          background: linear-gradient(135deg, #1e1e32 0%, #252540 100%);
          border: 1px solid rgba(99, 102, 241, 0.15);
          border-radius: 14px;
          padding: 1.25rem;
          margin-bottom: 1.25rem;
        }
        .health-radar-card h4, .health-metrics-card h4, .risks-report-card h4, .stakeholder-report-card h4, .progress-report-card h4 { 
          color: #fff; font-size: 0.95rem; margin-bottom: 1rem; 
        }
        .stat-icon { font-size: 1.2rem; }
        .stat-title {
          font-size: 0.7rem;
          font-weight: 600;
          color: #9ca3af;
          letter-spacing: 0.1em;
        }
        .stat-value {
          font-size: 2rem;
          font-weight: 800;
          color: #ffffff;
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
        .stat-status.neutral { color: #9ca3af; }
        .stat-progress-bar {
          height: 6px;
          background: #2a2a40;
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
          background: linear-gradient(135deg, #1e1e32 0%, #252540 100%);
          border: 1px solid rgba(99, 102, 241, 0.15);
          border-radius: 20px;
          padding: 1.5rem;
          box-shadow: 0 4px 30px rgba(0,0,0,0.3);
        }
        .decisions-panel h3 {
          font-size: 1.1rem;
          color: #8b5cf6;
          margin-bottom: 1.25rem;
        }
        
        .decision-card {
          background: linear-gradient(135deg, #252540 0%, #1e1e32 100%);
          border: 1px solid #3a3a50;
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
          color: #ffffff;
        }
        .decision-desc {
          font-size: 0.8rem;
          color: #9ca3af;
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
          background: linear-gradient(135deg, #3a3a55 0%, #2a2a45 100%);
          border: 1px solid #4a4a60;
          border-radius: 8px;
          color: #ffffff;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }
        .decision-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, #4a4a65 0%, #3a3a55 100%);
          border-color: #6366f1;
        }
        .decision-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .team-count {
          font-size: 1.5rem;
          font-weight: 700;
          color: #ffffff;
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
          background: rgba(99, 102, 241, 0.2);
          color: #8b5cf6;
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
          color: #9ca3af;
          width: 85px;
          flex-shrink: 0;
        }
        .focus-bar {
          flex: 1;
          height: 8px;
          background: #2a2a40;
          border-radius: 4px;
          overflow: hidden;
        }
        .focus-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 0.5s ease;
        }
        .focus-fill.speed { background: linear-gradient(90deg, #3b82f6, #60a5fa); }
        .focus-fill.quality { background: linear-gradient(90deg, #8b5cf6, #a78bfa); }
        .focus-fill.innovation { background: linear-gradient(90deg, #10b981, #34d399); }
        .focus-value {
          font-size: 0.75rem;
          font-weight: 600;
          color: #ffffff;
          width: 35px;
          text-align: right;
        }
        .focus-tip {
          font-size: 0.7rem;
          color: #6b7280;
          padding: 0.5rem;
          background: rgba(99, 102, 241, 0.1);
          border-radius: 6px;
          text-align: center;
        }
        
        /* PROGRESS SUMMARY */
        .progress-summary {
          background: linear-gradient(135deg, #1a1a2e 0%, #252540 100%);
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: 12px;
          padding: 1rem;
          margin-bottom: 1rem;
        }
        .progress-header {
          font-size: 0.85rem;
          font-weight: 600;
          color: #8b5cf6;
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
          color: #6b7280;
          margin-bottom: 0.25rem;
        }
        .progress-value {
          font-size: 1.1rem;
          font-weight: 700;
          color: #ffffff;
        }
        .progress-tip {
          font-size: 0.7rem;
          color: #9ca3af;
          padding: 0.5rem;
          background: rgba(139, 92, 246, 0.1);
          border-radius: 6px;
          text-align: center;
          border-left: 3px solid #8b5cf6;
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
          border: 1px solid #3a3a50;
          background: #1e1e32;
          cursor: pointer;
          transition: all 0.2s;
        }
        .quick-action-btn span:first-child { font-size: 1.25rem; }
        .quick-action-btn span:last-child { font-size: 0.75rem; color: #9ca3af; }
        .quick-action-btn.quality { border-color: rgba(16, 185, 129, 0.3); }
        .quick-action-btn.quality:hover { background: rgba(16, 185, 129, 0.15); border-color: #10b981; }
        .quick-action-btn.crunch { border-color: rgba(239, 68, 68, 0.3); }
        .quick-action-btn.crunch:hover { background: rgba(239, 68, 68, 0.15); border-color: #ef4444; }
        .quick-action-btn.proto { border-color: rgba(139, 92, 246, 0.3); }
        .quick-action-btn.proto:hover { background: rgba(139, 92, 246, 0.15); border-color: #8b5cf6; }
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
          background: #252540;
          border: 1px solid #3a3a50;
          border-radius: 20px;
          color: #d1d5db;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .meeting-chip:hover:not(:disabled) {
          background: #2a2a50;
          border-color: #6366f1;
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
          background: linear-gradient(135deg, #1e1e32 0%, #252540 100%);
          border: 1px solid rgba(99, 102, 241, 0.15);
          border-radius: 16px;
          padding: 1.25rem;
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }
        .status-card h4, .team-panel h4, .metrics-card h4, .stakeholder-card h4, .risks-card h4, .milestones-card h4, .radar-card h4 { 
          font-size: 0.9rem; 
          color: #9ca3af; 
          margin-bottom: 1rem; 
        }
        
        /* RISK RADAR */
        .radar-card {
          background: linear-gradient(135deg, #1e1e32 0%, #252540 100%);
          border: 1px solid rgba(99, 102, 241, 0.15);
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
          width: 140px;
          height: 140px;
        }
        .radar-legend {
          display: flex;
          justify-content: center;
          gap: 1rem;
          font-size: 0.7rem;
        }
        .legend-item { color: #9ca3af; }
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
          border-bottom: 1px solid #2a2a40;
        }
        .status-item:last-child { border-bottom: none; }
        .status-item span { font-size: 0.85rem; color: #9ca3af; }
        .status-value { font-weight: 600; color: #ffffff !important; }
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
          color: #9ca3af;
          width: 80px;
          flex-shrink: 0;
        }
        .metric-bar-container {
          flex: 1;
          height: 6px;
          background: #2a2a40;
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
          color: #ffffff;
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
          background: #252540;
          border-radius: 10px;
          border-left: 3px solid #3a3a50;
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
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .msg-text {
          font-size: 0.8rem;
          color: #d1d5db;
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
        .msg-badge.urgent { background: #ef4444; color: white; }
        
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
          background: #252540;
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
          color: #d1d5db;
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
          background: #252540;
          border-radius: 8px;
          opacity: 0.6;
        }
        .milestone-item.complete { opacity: 1; }
        .milestone-item.current { 
          opacity: 1; 
          border: 1px solid #6366f1;
          background: rgba(99, 102, 241, 0.1);
        }
        .milestone-marker {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #3a3a50;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          color: #10b981;
        }
        .milestone-item.complete .milestone-marker { background: #10b981; }
        .milestone-item.current .milestone-marker { background: #6366f1; border: 2px solid #8b5cf6; }
        .milestone-name {
          flex: 1;
          font-size: 0.8rem;
          color: #d1d5db;
        }
        .milestone-item.complete .milestone-name { color: #10b981; }
        .milestone-week {
          font-size: 0.7rem;
          font-weight: 600;
          color: #6b7280;
        }
        .milestone-item.current .milestone-week { color: #8b5cf6; }
        
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
        .team-bubble.pm { background: linear-gradient(135deg, #8b5cf6, #a78bfa); }
        .team-bubble.other { background: linear-gradient(135deg, #f59e0b, #fbbf24); }
        
        /* ALERT CARD */
        .alert-card.critical {
          background: linear-gradient(135deg, #3a1a1a 0%, #2a1515 100%);
          border-color: rgba(239, 68, 68, 0.4);
        }
        .alert-header {
          font-size: 0.75rem;
          font-weight: 700;
          color: #ef4444;
          letter-spacing: 0.1em;
          margin-bottom: 0.5rem;
        }
        .alert-card h4 { color: #ffffff; margin-bottom: 0.5rem; }
        .alert-card p { font-size: 0.85rem; color: #d1d5db; margin-bottom: 1rem; }
        .alert-respond-btn {
          width: 100%;
          padding: 0.75rem;
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          border: none;
          border-radius: 8px;
          color: white;
          font-weight: 600;
          cursor: pointer;
        }
        
        /* TIMELINE */
        .timeline-panel {
          background: linear-gradient(135deg, #1e1e32 0%, #252540 100%);
          border: 1px solid rgba(99, 102, 241, 0.15);
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
        .timeline-panel h4 { font-size: 0.9rem; color: #9ca3af; margin: 0; }
        .timeline-status {
          font-size: 0.75rem;
          font-weight: 500;
          color: #d1d5db;
        }
        .timeline-bar {
          height: 12px;
          background: #2a2a40;
          border-radius: 6px;
          position: relative;
          margin-bottom: 1rem;
        }
        .timeline-progress {
          height: 100%;
          background: linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%);
          border-radius: 6px;
          transition: width 0.5s ease;
          box-shadow: 0 0 10px rgba(99, 102, 241, 0.4);
        }
        .timeline-marker {
          position: absolute;
          top: -4px;
          width: 20px;
          height: 20px;
          background: #ffffff;
          border: 3px solid #8b5cf6;
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
          color: #6b7280;
        }
        .week-mark.past { color: #9ca3af; }
        .week-mark.current { color: #8b5cf6; font-weight: 700; }
        
        /* ADVANCE BUTTON */
        .btn-advance {
          width: 100%;
          margin-top: 1rem;
          padding: 1rem;
          font-size: 1rem;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          border: none;
          color: white;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);
        }
        .btn-advance:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(99, 102, 241, 0.5);
        }
        
        /* ENHANCED EVENT MODAL */
        .event-modal.enhanced {
          background: linear-gradient(135deg, #1a1a2e 0%, #252540 100%);
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
          background: linear-gradient(135deg, #3a1a1a 0%, #2a1515 100%);
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
          color: #ffffff;
          margin: 0;
        }
        .event-modal-body {
          padding: 1.5rem 2rem;
        }
        .event-description p {
          color: #d1d5db;
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }
        .impact-analysis h5 {
          font-size: 0.85rem;
          color: #9ca3af;
          margin-bottom: 0.75rem;
        }
        .impact-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }
        .impact-card {
          background: #252540;
          border: 1px solid #3a3a50;
          border-radius: 10px;
          padding: 0.75rem;
          text-align: center;
        }
        .impact-label {
          display: block;
          font-size: 0.7rem;
          color: #9ca3af;
          margin-bottom: 0.25rem;
        }
        .impact-value {
          font-size: 0.9rem;
          font-weight: 600;
          color: #ffffff;
        }
        .impact-value.warn { color: #f59e0b; }
        
        .event-options-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
        }
        .event-option-card {
          padding: 1rem;
          background: linear-gradient(135deg, #252540 0%, #1e1e32 100%);
          border: 2px solid #3a3a50;
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
          color: #ffffff;
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
          background: #2a2a40;
          border-radius: 4px;
        }
        .option-consequences span.positive { color: #10b981; background: rgba(16, 185, 129, 0.15); }
        .option-consequences span.negative { color: #ef4444; background: rgba(239, 68, 68, 0.15); }
        
        .event-footer {
          padding: 1rem 2rem;
          background: #1a1a28;
          text-align: center;
          font-size: 0.8rem;
          color: #9ca3af;
        }
        
        .metric-card {
          background: linear-gradient(135deg, #1e1e32 0%, #252540 100%);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(99, 102, 241, 0.15);
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
          box-shadow: 0 12px 40px rgba(99, 102, 241, 0.2);
          border-color: rgba(99, 102, 241, 0.4);
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
          stroke: #2a2a40;
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
          color: #ffffff;
        }
        .gauge-value.large {
          font-size: 1.1rem;
        }
        
        .metric-label {
          font-size: 0.65rem;
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 600;
        }
          font-weight: 600;
          color: #64748b;
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
          background: #94a3b8;
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
          color: white;
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
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(99, 102, 241, 0.15) 100%);
          border-color: rgba(139, 92, 246, 0.4);
        }
        
        /* Game Actions - Enhanced DARK THEME */
        .sim-playing .game-actions { 
          background: linear-gradient(135deg, #1e1e32 0%, #252540 100%);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: 24px; 
          padding: 1.5rem; 
          box-shadow: 0 8px 40px rgba(0,0,0,0.4);
          position: relative;
          z-index: 1;
        }
        .sim-playing .game-actions > h3 { font-size: 1.1rem; margin-bottom: 1.25rem; color: #8b5cf6; }
        .sim-playing .action-section { margin-bottom: 1.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid rgba(99, 102, 241, 0.15); }
        .sim-playing .action-section h4 { font-size: 0.9rem; color: #9ca3af; margin-bottom: 0.75rem; font-weight: 600; }
        .action-row { display: flex; align-items: center; gap: 1rem; }
        .sim-playing .action-btn { 
          padding: 0.6rem 1.25rem; 
          background: linear-gradient(135deg, #252540 0%, #1e1e32 100%); 
          border: 1px solid #3a3a50; 
          border-radius: 10px; 
          color: #ffffff; 
          font-family: inherit; 
          font-weight: 500;
          cursor: pointer; 
          transition: all 0.2s; 
        }
        .sim-playing .action-btn:hover:not(:disabled) { background: linear-gradient(135deg, #2a2a50 0%, #252545 100%); border-color: var(--accent-primary); box-shadow: 0 4px 15px rgba(99, 102, 241, 0.2); }
        .sim-playing .action-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .sim-playing .action-label { font-family: 'JetBrains Mono', monospace; font-weight: 700; min-width: 120px; text-align: center; color: #ffffff; }
        
        /* Meeting Options - Enhanced DARK THEME */
        .meeting-options { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; }
        .sim-playing .meeting-btn { 
          background: linear-gradient(135deg, #252540 0%, #1e1e32 100%);
          border: 2px solid #3a3a50; 
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
          background: linear-gradient(90deg, #6366f1, #8b5cf6);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .sim-playing .meeting-btn:hover:not(:disabled) { 
          border-color: #6366f1; 
          background: linear-gradient(135deg, #2a2a50 0%, #252545 100%);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(99, 102, 241, 0.25);
        }
        .sim-playing .meeting-btn:hover:not(:disabled)::before { opacity: 1; }
        .sim-playing .meeting-btn.active { 
          border-color: #10b981; 
          background: linear-gradient(135deg, #1a3a2e 0%, #1e3a32 100%);
          box-shadow: 0 4px 20px rgba(16, 185, 129, 0.3);
        }
        .sim-playing .meeting-btn.active::before { 
          opacity: 1;
          background: linear-gradient(90deg, #10b981, #059669);
        }
        .sim-playing .meeting-btn:disabled { opacity: 0.7; cursor: default; }
        .meeting-icon { font-size: 1.5rem; }
        .sim-playing .meeting-name { font-weight: 700; font-size: 0.9rem; color: #ffffff; }
        .sim-playing .meeting-desc { font-size: 0.8rem; color: #9ca3af; line-height: 1.4; }
        .sim-playing .meeting-done { color: #10b981; font-size: 0.8rem; font-weight: 700; margin-top: 0.25rem; }
        
        /* Quick Actions - Enhanced DARK THEME */
        .quick-actions { display: flex; gap: 0.75rem; flex-wrap: wrap; }
        .sim-playing .quick-btn { 
          padding: 0.75rem 1.25rem; 
          background: linear-gradient(135deg, #1a3a2e 0%, #1e3a32 100%);
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
          background: linear-gradient(135deg, #1e4035 0%, #224038 100%);
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
          background: linear-gradient(135deg, #2a1a3a 0%, #2e1e3a 100%);
          border-color: rgba(139, 92, 246, 0.3); 
          color: #a78bfa; 
        }
        .sim-playing .quick-btn.proto:hover:not(:disabled) { 
          background: linear-gradient(135deg, #3a2050 0%, #3e2454 100%);
          border-color: #8b5cf6;
          box-shadow: 0 6px 20px rgba(139, 92, 246, 0.3);
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
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          border: none;
          color: white;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);
        }
        .sim-playing .btn-advance:hover { background: linear-gradient(135deg, #5558e8 0%, #7c4fe3 100%); transform: translateY(-2px); box-shadow: 0 6px 25px rgba(99, 102, 241, 0.5); }
        
        /* Event Modal - LIGHT THEME */
        .sim-playing .event-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; z-index: 200; padding: 1rem; backdrop-filter: blur(8px); }
        .sim-playing .event-modal { 
          background: linear-gradient(135deg, #1a1a2e 0%, #252540 100%); 
          border: 1px solid rgba(99, 102, 241, 0.3); 
          border-radius: 24px; 
          padding: 2.5rem; 
          max-width: 520px; 
          width: 100%; 
          text-align: center; 
          box-shadow: 0 25px 80px rgba(0,0,0,0.5), 0 0 60px rgba(99, 102, 241, 0.15);
        }
        .sim-playing .event-icon { font-size: 3.5rem; margin-bottom: 1rem; display: block; }
        .sim-playing .event-modal h2 { font-size: 1.5rem; margin-bottom: 0.75rem; color: #ffffff; }
        .sim-playing .event-modal p { color: #d1d5db; line-height: 1.7; margin-bottom: 2rem; }
        .sim-playing .event-options { display: flex; flex-direction: column; gap: 0.6rem; }
        .sim-playing .event-option { 
          padding: 1rem 1.25rem; 
          background: linear-gradient(135deg, #252540 0%, #1e1e32 100%); 
          border: 2px solid #3a3a50; 
          border-radius: 12px; 
          color: #ffffff; 
          font-family: inherit; 
          font-size: 0.95rem; 
          font-weight: 500;
          cursor: pointer; 
          text-align: left; 
          transition: all 0.3s ease; 
        }
        .sim-playing .event-option:hover { background: linear-gradient(135deg, #2a2a45 0%, #1e1e38 100%); border-color: #6366f1; transform: translateX(6px); box-shadow: 0 4px 20px rgba(99, 102, 241, 0.2); }
        
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
          color: #818cf8 !important;
          font-size: 1.6rem !important;
        }
        .paywall-hook {
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.1));
          border: 1px solid rgba(99, 102, 241, 0.25);
          padding: 1rem;
          border-radius: 12px;
          margin-bottom: 1.5rem !important;
          color: #c7d2fe;
        }
        .paywall-hook strong {
          color: #818cf8;
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
          color: #818cf8;
        }
        .price-period {
          font-size: 1.25rem;
          color: #9ca3af;
        }
        .paywall-features {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
          text-align: left;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
          color: #d1d5db;
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
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%) !important;
          border: none !important;
          border-radius: 12px;
          color: white;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .paywall-upgrade:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(99, 102, 241, 0.4);
        }
        .paywall-later {
          padding: 0.75rem 1.5rem;
          background: transparent !important;
          border: 1px solid rgba(255, 255, 255, 0.15) !important;
          border-radius: 8px;
          color: #9ca3af;
          cursor: pointer;
          font-size: 0.9rem;
        }
        .paywall-later:hover {
          background: rgba(255, 255, 255, 0.05) !important;
          color: #e5e7eb;
        }
        
        /* ============================================ */
        /* ANNA — AI PROJECT MANAGEMENT ADVISOR STYLES  */
        /* ============================================ */
        
        /* Anna Intro on Briefing Page */
        .anna-intro {
          background: linear-gradient(135deg, #0f172a 0%, #1a2332 100%);
          border: 1px solid rgba(20, 184, 166, 0.2);
          border-radius: 16px;
          padding: 32px 36px;
          margin-bottom: 24px;
          color: #e2e8f0;
          position: relative;
          overflow: hidden;
        }
        .anna-intro::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #14b8a6, #06b6d4, #8b5cf6);
        }
        .anna-intro-glow {
          position: absolute;
          top: -60px; right: -60px;
          width: 180px; height: 180px;
          background: radial-gradient(circle, rgba(20, 184, 166, 0.08) 0%, transparent 70%);
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
          border: 2px solid rgba(20, 184, 166, 0.4);
          box-shadow: 0 4px 16px rgba(20, 184, 166, 0.2);
          flex-shrink: 0;
        }
        .anna-name {
          font-size: 1.15rem;
          font-weight: 700;
          color: #14b8a6;
        }
        .anna-title {
          font-size: 0.82rem;
          color: #94a3b8;
          margin-top: 2px;
        }
        .anna-speech {
          font-size: 0.95rem;
          line-height: 1.75;
          color: #cbd5e1;
        }
        .anna-speech strong { color: #f8fafc; }
        .anna-speech p { margin-bottom: 12px; }
        .anna-highlight {
          background: rgba(20, 184, 166, 0.08);
          border-left: 3px solid #14b8a6;
          padding: 12px 16px;
          border-radius: 0 10px 10px 0;
          margin: 16px 0;
          font-style: italic;
          color: #e2e8f0;
          line-height: 1.7;
        }
        
        /* Ask Anna Button in Game */
        .btn-anna {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 14px 20px;
          background: linear-gradient(135deg, rgba(20, 184, 166, 0.12) 0%, rgba(6, 182, 212, 0.08) 100%);
          border: 1px solid rgba(20, 184, 166, 0.3);
          border-radius: 12px;
          color: #14b8a6;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-bottom: 12px;
        }
        .btn-anna:hover {
          background: linear-gradient(135deg, rgba(20, 184, 166, 0.2) 0%, rgba(6, 182, 212, 0.15) 100%);
          border-color: rgba(20, 184, 166, 0.5);
          transform: translateY(-1px);
          box-shadow: 0 4px 20px rgba(20, 184, 166, 0.2);
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
          background: linear-gradient(180deg, #0f1923 0%, #111827 100%);
          border: 1px solid rgba(20, 184, 166, 0.25);
          border-radius: 20px;
          width: 100%;
          max-width: 560px;
          max-height: 85vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5), 0 0 40px rgba(20, 184, 166, 0.08);
          animation: slideUp 0.3s ease;
        }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        
        .anna-panel-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          border-bottom: 1px solid rgba(20, 184, 166, 0.15);
          background: linear-gradient(135deg, rgba(20, 184, 166, 0.06) 0%, transparent 100%);
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
          color: #14b8a6;
          font-size: 1.05rem;
        }
        .anna-panel-role {
          color: #94a3b8;
          font-size: 0.82rem;
          margin-top: 2px;
        }
        .anna-close {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: #94a3b8;
          width: 32px; height: 32px;
          border-radius: 8px;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .anna-close:hover { background: rgba(255,255,255,0.1); color: white; }
        
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
          color: #94a3b8;
        }
        .anna-pulse {
          width: 48px; height: 48px;
          border-radius: 50%;
          background: rgba(20, 184, 166, 0.2);
          animation: annaPulse 1.5s ease-in-out infinite;
        }
        @keyframes annaPulse {
          0%, 100% { transform: scale(1); opacity: 0.5; box-shadow: 0 0 0 0 rgba(20, 184, 166, 0.3); }
          50% { transform: scale(1.15); opacity: 1; box-shadow: 0 0 20px 8px rgba(20, 184, 166, 0.15); }
        }
        
        .anna-panel-footer {
          display: flex;
          gap: 10px;
          padding: 16px 24px;
          border-top: 1px solid rgba(20, 184, 166, 0.1);
          background: rgba(0, 0, 0, 0.2);
        }
        .anna-refresh-btn {
          background: rgba(20, 184, 166, 0.1);
          border: 1px solid rgba(20, 184, 166, 0.2);
          color: #14b8a6;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .anna-refresh-btn:hover { background: rgba(20, 184, 166, 0.2); }
        .anna-refresh-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .anna-close-btn {
          flex: 1;
          background: var(--accent-primary);
          border: none;
          color: white;
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
          background: linear-gradient(135deg, #0f172a 0%, #1a2332 100%);
          border: 1px solid rgba(20, 184, 166, 0.2);
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
          background: linear-gradient(135deg, rgba(20, 184, 166, 0.08) 0%, transparent 100%);
          border-bottom: 1px solid rgba(20, 184, 166, 0.1);
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
          background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%);
          border: none;
          border-radius: 12px;
          color: white;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s;
        }
        .btn-anna-debrief:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(20, 184, 166, 0.35);
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
          background: linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #0f0f1a 100%);
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
          color: #ffffff;
          margin-bottom: 0.25rem;
        }
        .results-subtitle {
          color: #9ca3af;
          font-size: 1rem;
          margin-bottom: 1.5rem;
        }
        
        /* Grade Display */
        .grade-display {
          background: linear-gradient(135deg, #1e1e32 0%, #252540 100%);
          border: 1px solid rgba(99, 102, 241, 0.3);
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
          color: #9ca3af;
          display: block;
          margin-top: 0.5rem;
        }
        
        /* Mission Recap */
        .mission-recap {
          background: linear-gradient(135deg, #1e1e32 0%, #252540 100%);
          border: 1px solid rgba(99, 102, 241, 0.15);
          border-radius: 20px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .mission-recap h3 {
          font-size: 1rem;
          color: #9ca3af;
          margin-bottom: 0.5rem;
        }
        .mission-intro {
          font-size: 0.85rem;
          color: #6b7280;
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
          background: linear-gradient(135deg, #252540 0%, #1e1e32 100%);
          border: 1px solid #3a3a50;
          border-radius: 12px;
          padding: 1rem;
        }
        .objective-header {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          margin-bottom: 0.75rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #3a3a50;
        }
        .objective-icon { font-size: 1rem; }
        .objective-name {
          font-size: 0.75rem;
          font-weight: 600;
          color: #ffffff;
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
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .target-value {
          font-size: 0.8rem;
          color: #9ca3af;
        }
        .result-value {
          font-size: 0.85rem;
          font-weight: 600;
        }
        .result-value.good { color: #10b981; }
        .result-value.bad { color: #ef4444; }
        
        /* Score Breakdown */
        .score-breakdown {
          background: linear-gradient(135deg, #1e1e32 0%, #252540 100%);
          border: 1px solid rgba(99, 102, 241, 0.15);
          border-radius: 20px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .score-breakdown h3 {
          font-size: 1rem;
          color: #9ca3af;
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
          background: linear-gradient(135deg, #252540 0%, #1e1e32 100%);
          border: 1px solid #3a3a50;
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
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .breakdown-value {
          font-size: 1.75rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.5rem;
        }
        .breakdown-bar {
          height: 4px;
          background: #2a2a40;
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
          color: #6b7280;
        }
        
        /* Performance Analysis */
        .analysis-section {
          background: linear-gradient(135deg, #1e1e32 0%, #252540 100%);
          border: 1px solid rgba(99, 102, 241, 0.15);
          border-radius: 20px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .analysis-section h3 {
          font-size: 1rem;
          color: #9ca3af;
          margin-bottom: 1.25rem;
        }
        .analysis-card {
          background: linear-gradient(135deg, #252540 0%, #1e1e32 100%);
          border-radius: 12px;
          padding: 1rem;
          margin-bottom: 1rem;
          border-left: 4px solid #3a3a50;
        }
        .analysis-card:last-child { margin-bottom: 0; }
        .analysis-card.good { border-left-color: #10b981; background: rgba(16, 185, 129, 0.05); }
        .analysis-card.improve { border-left-color: #f59e0b; background: rgba(245, 158, 11, 0.05); }
        .analysis-card.tips { border-left-color: #6366f1; background: rgba(99, 102, 241, 0.05); }
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
          color: #ffffff;
        }
        .analysis-card.good .analysis-title { color: #10b981; }
        .analysis-card.improve .analysis-title { color: #f59e0b; }
        .analysis-card.tips .analysis-title { color: #8b5cf6; }
        .analysis-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .analysis-list li {
          font-size: 0.85rem;
          color: #d1d5db;
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
          color: #6b7280;
        }
        .analysis-card.good .analysis-list li::before { color: #10b981; }
        .analysis-card.improve .analysis-list li::before { color: #f59e0b; }
        .analysis-card.tips .analysis-list li::before { color: #8b5cf6; }
        .analysis-list li strong {
          color: #ffffff;
        }
        
        /* Achievements */
        .achievements-section {
          background: linear-gradient(135deg, #1e1e32 0%, #252540 100%);
          border: 1px solid rgba(99, 102, 241, 0.15);
          border-radius: 20px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .achievements-section h3 {
          font-size: 1rem;
          color: #9ca3af;
          margin-bottom: 1rem;
        }
        .achievements-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          justify-content: center;
        }
        .achievement-badge {
          background: linear-gradient(135deg, #252540 0%, #1e1e32 100%);
          border: 1px solid #3a3a50;
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
          color: #d1d5db;
        }
        .lock-icon {
          font-size: 0.7rem;
          position: absolute;
          top: -4px;
          right: -4px;
        }
        
        /* Final Score Card */
        .final-score-card {
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          border-radius: 16px;
          padding: 1.25rem;
          text-align: center;
          margin-bottom: 1.5rem;
          box-shadow: 0 4px 30px rgba(99, 102, 241, 0.4);
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
          color: #ffffff;
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
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          border: none;
          border-radius: 12px;
          color: white;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);
        }
        .btn-primary-lg:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(99, 102, 241, 0.5);
        }
        .btn-secondary-lg {
          padding: 1rem 2rem;
          background: linear-gradient(135deg, #252540 0%, #1e1e32 100%);
          border: 1px solid #3a3a50;
          border-radius: 12px;
          color: #d1d5db;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s;
        }
        .btn-secondary-lg:hover {
          border-color: #6366f1;
          background: linear-gradient(135deg, #2a2a50 0%, #252545 100%);
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
          border: 1px solid #3a3a50;
          border-radius: 8px;
          color: #9ca3af;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.3s;
        }
        .btn-print:hover {
          border-color: #6366f1;
          color: #ffffff;
          background: rgba(99, 102, 241, 0.1);
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
            border: 2px solid #e5e7eb !important;
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
            border: 1px solid #e5e7eb !important;
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
            color: #6b7280 !important;
          }
          .objectives-grid,
          .breakdown-grid {
            gap: 0.5rem !important;
          }
          .objective-card,
          .breakdown-card {
            background: white !important;
            border: 1px solid #e5e7eb !important;
            padding: 0.75rem !important;
          }
          .objective-name,
          .breakdown-title {
            color: #374151 !important;
          }
          .target-value {
            color: #6b7280 !important;
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
            background: #e5e7eb !important;
          }
          .analysis-card {
            background: white !important;
            border: 1px solid #e5e7eb !important;
            page-break-inside: avoid;
          }
          .analysis-card.good {
            border-left: 4px solid #059669 !important;
          }
          .analysis-card.improve {
            border-left: 4px solid #d97706 !important;
          }
          .analysis-card.tips {
            border-left: 4px solid #4f46e5 !important;
          }
          .analysis-title {
            color: #374151 !important;
          }
          .analysis-card.good .analysis-title { color: #059669 !important; }
          .analysis-card.improve .analysis-title { color: #d97706 !important; }
          .analysis-card.tips .analysis-title { color: #4f46e5 !important; }
          .analysis-list li {
            color: #374151 !important;
            border-bottom-color: #e5e7eb !important;
          }
          .analysis-list li strong {
            color: #111827 !important;
          }
          .final-score-card {
            background: #4f46e5 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            page-break-inside: avoid;
          }
          .achievement-badge {
            background: white !important;
            border: 1px solid #e5e7eb !important;
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
            color: #9ca3af;
            margin-bottom: 0.5rem;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid #e5e7eb;
          }
          
          /* Add print footer */
          .results-container::after {
            content: "Generated by BizSimHub.com - PM Training Simulations";
            display: block;
            text-align: center;
            font-size: 0.7rem;
            color: #9ca3af;
            margin-top: 1rem;
            padding-top: 0.5rem;
            border-top: 1px solid #e5e7eb;
          }
        }
        
        /* Legacy end-card (keep for fallback) */
        .end-card { 
          background: linear-gradient(135deg, #1e1e32 0%, #252540 100%);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(99, 102, 241, 0.3);
          border-radius: 28px; 
          padding: 2.5rem; 
          max-width: 550px; 
          width: 100%; 
          text-align: center; 
          box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 80px rgba(99, 102, 241, 0.1);
          position: relative;
          z-index: 10;
        }
        
        .end-icon { font-size: 3rem; margin-bottom: 1rem; display: block; }
        .end-card h1 { font-size: 1.75rem; margin-bottom: 0.25rem; color: #ffffff; }
        .end-card > p { color: #9ca3af; margin-bottom: 2rem; }
        .score-display { margin-bottom: 2rem; }
        .grade { font-size: 6rem; font-weight: 800; line-height: 1; }
        .score { font-family: 'JetBrains Mono', monospace; font-size: 1.5rem; color: #9ca3af; display: block; }
        .results { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 2rem; text-align: left; }
        .result { 
          padding: 0.85rem 1rem; 
          background: linear-gradient(135deg, #252540 0%, #1e1e32 100%); 
          border-radius: 10px; 
          display: flex; 
          align-items: center; 
          gap: 0.75rem; 
          font-size: 0.95rem; 
          color: #ffffff;
        }
        .result.pass { border-left: 4px solid #10b981; }
        .result.fail { border-left: 4px solid #ef4444; }
        .result.pass span { color: #10b981; font-weight: 700; }
        .result.fail span { color: #ef4444; font-weight: 700; }
        .end-actions { display: flex; flex-direction: column; gap: 0.75rem; }
        .end-actions .btn-primary { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); border: none; color: white; box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4); }
        .end-actions .btn-primary:hover { background: linear-gradient(135deg, #5558e8 0%, #7c4fe3 100%); }
        .end-actions .btn-secondary { background: linear-gradient(135deg, #252540 0%, #1e1e32 100%); border: 1px solid #3a3a50; color: #d1d5db; }
        .end-actions .btn-secondary:hover { background: linear-gradient(135deg, #2a2a50 0%, #252545 100%); border-color: #6366f1; }
        .quick-btn.proto { background: rgba(139, 92, 246, 0.1); border-color: rgba(139, 92, 246, 0.25); color: #c4b5fd; }
        .quick-btn.proto:hover { background: rgba(139, 92, 246, 0.2); }
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
        .event-option:hover { background: rgba(99, 102, 241, 0.15); border-color: var(--accent-primary); transform: translateX(6px); }
        
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
          background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
          color: white;
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
          border-bottom: 1px solid rgba(255,255,255,0.1);
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
          background: rgba(255,255,255,0.1);
          color: white;
        }
        .admin-nav-btn.active {
          background: rgba(99, 102, 241, 0.3);
          color: white;
          border-left: 3px solid #6366f1;
        }
        .admin-nav-btn span { font-size: 1.1rem; }

        .admin-sidebar-footer {
          padding: 1rem 1.5rem;
          border-top: 1px solid rgba(255,255,255,0.1);
        }
        .admin-back-btn {
          width: 100%;
          padding: 0.75rem;
          background: rgba(255,255,255,0.1);
          border: none;
          border-radius: 8px;
          color: rgba(255,255,255,0.8);
          font-size: 0.9rem;
          font-family: inherit;
          cursor: pointer;
          transition: all 0.2s;
        }
        .admin-back-btn:hover { background: rgba(255,255,255,0.2); color: white; }

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
          color: #64748b;
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
          color: #64748b;
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
        .metric-badge.neutral { background: #f1f5f9; color: #64748b; }

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
          color: #64748b;
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
          background: #e2e8f0;
          border-radius: 3px;
          overflow: hidden;
          margin-bottom: 0.5rem;
        }
        .stat-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #6366f1, #8b5cf6);
          border-radius: 3px;
        }
        .stat-sub {
          font-size: 0.8rem;
          color: #94a3b8;
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
          color: #94a3b8;
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
          border: 1px solid #e2e8f0;
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
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          font-size: 0.9rem;
          font-family: inherit;
          background: white;
          cursor: pointer;
        }

        .admin-btn {
          padding: 0.6rem 1.25rem;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          font-size: 0.9rem;
          font-family: inherit;
          background: white;
          cursor: pointer;
          transition: all 0.2s;
        }
        .admin-btn:hover { background: #f8fafc; border-color: #cbd5e1; }
        .admin-btn.primary {
          background: #6366f1;
          color: white;
          border-color: #6366f1;
        }
        .admin-btn.primary:hover { background: #4f46e5; }
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
          border: 3px solid #e2e8f0;
          border-top-color: #6366f1;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin: 0 auto 1rem;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .admin-loading-spinner p {
          color: #64748b;
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
          color: white;
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
          color: #64748b;
          font-size: 0.95rem;
        }
        .empty-state {
          text-align: center;
          padding: 3rem;
          color: #64748b;
        }
        .empty-state .empty-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        .admin-badge {
          display: inline-block;
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color: white;
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
          color: white;
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
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-bottom: 1px solid #e2e8f0;
        }
        .admin-table td {
          padding: 1rem 1.25rem;
          border-bottom: 1px solid #f1f5f9;
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
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
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
          color: #94a3b8;
        }

        .plan-badge {
          display: inline-block;
          padding: 0.25rem 0.6rem;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 500;
        }
        .plan-badge.free { background: #f1f5f9; color: #64748b; }
        .plan-badge.tester { background: #d1fae5; color: #059669; }
        .plan-badge.professional { background: #dbeafe; color: #2563eb; }
        .plan-badge.lifetime { background: #fef3c7; color: #b45309; }
        .plan-badge.enterprise { background: #f3e8ff; color: #7c3aed; }

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
          color: #94a3b8;
          margin-left: 0.25rem;
        }
        .last-active { color: #64748b; }

        .action-btns {
          display: flex;
          gap: 0.5rem;
        }
        .action-btn {
          width: 32px;
          height: 32px;
          border: none;
          border-radius: 8px;
          background: #f1f5f9;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 0.9rem;
        }
        .action-btn:hover { background: #e2e8f0; }
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
          color: #64748b;
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
          border-bottom: 1px solid #e2e8f0;
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
          background: #f1f5f9;
          font-size: 1.25rem;
          cursor: pointer;
        }
        .modal-body { padding: 1.5rem; }
        .modal-footer {
          padding: 1rem 1.5rem;
          border-top: 1px solid #e2e8f0;
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
        .user-detail-header p { margin: 0; color: #64748b; }

        .user-detail-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        .detail-item label {
          display: block;
          font-size: 0.8rem;
          color: #64748b;
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
        .bar.users { background: #6366f1; }
        .bar.sessions { background: #10b981; }
        .bar-label {
          font-size: 0.8rem;
          color: #64748b;
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
        .legend-dot.users { background: #6366f1; }
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
          color: #6366f1;
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
          color: #64748b;
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
          color: #94a3b8;
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
          background: #f1f5f9;
          border-radius: 6px;
          overflow: hidden;
        }
        .grade-bar {
          height: 100%;
          border-radius: 6px;
          transition: width 0.3s ease;
        }
        .grade-bar.grade-a { background: #10b981; }
        .grade-bar.grade-b { background: #6366f1; }
        .grade-bar.grade-c { background: #f59e0b; }
        .grade-bar.grade-d { background: #f97316; }
        .grade-bar.grade-f { background: #ef4444; }
        .grade-pct {
          width: 40px;
          text-align: right;
          font-weight: 500;
          color: #64748b;
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
          color: #64748b;
        }
        .sub-bar {
          flex: 1;
          height: 20px;
          background: #f1f5f9;
          border-radius: 10px;
          overflow: hidden;
        }
        .sub-bar-fill {
          height: 100%;
          border-radius: 10px;
        }
        .sub-item.free .sub-bar-fill { background: #94a3b8; }
        .sub-item.professional .sub-bar-fill { background: #6366f1; }
        .sub-item.enterprise .sub-bar-fill { background: #8b5cf6; }
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
        .txn-info span { font-size: 0.8rem; color: #64748b; }
        .txn-amount {
          font-weight: 700;
          color: #10b981;
        }
        .txn-date {
          font-size: 0.85rem;
          color: #64748b;
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
          color: #64748b;
          margin-bottom: 0.5rem;
        }
        .content-meta {
          font-size: 0.8rem;
          color: #94a3b8;
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
        .resource-header span:first-child { color: #64748b; }
        .resource-header span:last-child { font-weight: 600; color: #1e293b; }
        .resource-bar {
          height: 8px;
          background: #e2e8f0;
          border-radius: 4px;
          overflow: hidden;
        }
        .resource-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 0.3s ease;
        }
        .resource-fill.cpu { background: linear-gradient(90deg, #10b981, #34d399); }
        .resource-fill.memory { background: linear-gradient(90deg, #6366f1, #8b5cf6); }

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
          color: #64748b;
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
      
      {!currentUser ? renderAuth() :
        currentPage === 'simulation' ? renderSimulation() :
        currentPage === 'dashboard' ? renderDashboard() :
        currentPage === 'admin' && currentUser.is_admin ? renderCourseAdmin() : renderCatalog()}
    </div>
  );
}
