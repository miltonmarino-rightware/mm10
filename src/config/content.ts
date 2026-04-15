export const contentConfig = {
  landing: {
    badge: 'Plataforma Premium de Trading',
    heroTitle: 'Domina o Forex com',
    heroTitleHighlight: 'Inteligência Artificial',
    heroDescription: 'A plataforma premium de trading que combina IA avançada, mentoria directa, cursos exclusivos e análise de performance. Tudo o que precisas num só lugar.',
    ctaPrimary: 'Começar Agora',
    ctaSecondary: 'Saber Mais',
    featuresTitle: 'Tudo numa plataforma',
    featuresDescription: 'Ferramentas profissionais de trading, educação premium e comunidade — tudo num ambiente premium.',
    features: [
      { iconKey: 'MessageSquare', title: 'Chat IA Forex', desc: 'Assistente de IA especializado em Forex e trading' },
      { iconKey: 'GraduationCap', title: 'Cursos Premium', desc: 'Conteúdo exclusivo para dominar os mercados' },
      { iconKey: 'BarChart3', title: 'Trading Journal', desc: 'Analisa as tuas operações com insights de IA' },
      { iconKey: 'TrendingUp', title: 'Sinais & Broadcasts', desc: 'Recebe sinais e alertas do mentor em tempo real' },
      { iconKey: 'Users', title: 'Comunidade', desc: 'Grupos, turmas e desafios de trading' },
      { iconKey: 'Shield', title: 'Mentoria Directa', desc: 'Agenda reuniões com o mentor para mentoria personalizada' },
    ],
  },

  about: {
    title: 'Sobre o Tarik Forex AI',
    description: 'Plataforma premium de trading que combina inteligência artificial, mentoria directa e educação de excelência.',
    pillars: [
      { iconKey: 'Target', title: 'Missão', desc: 'Democratizar o acesso a educação de trading de qualidade com ferramentas de IA avançadas.' },
      { iconKey: 'Zap', title: 'Tecnologia', desc: 'IA especializada em Forex, análise de mercado e coaching personalizado de performance.' },
      { iconKey: 'Award', title: 'Compromisso', desc: 'Transparência total, uso responsável e foco no desenvolvimento sustentável do trader.' },
    ],
    disclaimer: {
      title: '⚠️ Uso Responsável',
      lines: [
        'O Tarik Forex AI é uma ferramenta educacional e de apoio. Não constitui aconselhamento financeiro.',
        'Trading envolve risco significativo de perda de capital. Opera apenas com capital que podes perder.',
      ],
    },
    ctaLabel: 'Começar Agora',
  },

  dashboard: {
    clientTitle: 'Dashboard',
    clientSubtitle: 'Bem-vindo à tua plataforma de trading',
    adminTitle: 'Painel Admin',
    adminSubtitle: 'Visão geral da plataforma',
    stats: [
      { key: 'courses', label: 'Cursos Activos',    defaultValue: '—', iconKey: 'GraduationCap' },
      { key: 'trades',  label: 'Trades Registados', defaultValue: '—', iconKey: 'BarChart3'     },
      { key: 'winRate', label: 'Win Rate',           defaultValue: '—', iconKey: 'TrendingUp'   },
      { key: 'booking', label: 'Próxima Reunião',    defaultValue: '—', iconKey: 'Calendar'     },
    ],
    quickActions: [
      { key: 'chat',     label: 'Chat IA',          path: '/app/chat',     iconKey: 'Radio',         desc: 'Fala com o assistente de IA' },
      { key: 'courses',  label: 'Cursos',           path: '/app/courses',  iconKey: 'GraduationCap', desc: 'Continua a aprender'         },
      { key: 'trades',   label: 'Trading Journal',  path: '/app/trades',   iconKey: 'BarChart3',     desc: 'Regista as tuas operações'   },
      { key: 'bookings', label: 'Reservar Reunião', path: '/app/bookings', iconKey: 'Calendar',      desc: 'Agenda com o mentor'         },
    ],
    broadcastsHeading:   'Broadcasts Recentes',
    broadcastsViewAll:   'Ver todos',
    quickActionsHeading: 'Acções Rápidas',
    priorityLabels: {
      normal: 'Normal',
      high:   'Alta',
      urgent: 'Urgente',
    },
  },

  auth: {
    loginTitle: 'Bem-vindo de volta',
    loginSubtitle: 'Entra na tua conta Tarik Forex AI',
    loginButton: 'Entrar',
    registerTitle: 'Criar conta',
    registerSubtitle: 'Começa a tua jornada no Forex',
    registerButton: 'Criar conta',
    resetTitle: 'Recuperar password',
    resetSubtitle: 'Indica o teu email para receber instruções',
    resetButton: 'Enviar instruções',
    resetSuccessTitle: 'Email enviado',
    resetSuccessMessage: 'Se o email existir na nossa base de dados, receberás instruções para redefinir a password.',
    forgotPassword: 'Esqueceste a password?',
    noAccount: 'Não tens conta?',
    hasAccount: 'Já tens conta?',
    createAccountLink: 'Criar conta',
    loginLink: 'Entrar',
    backToLogin: 'Voltar ao login',
    passwordMinLength: 'A password deve ter pelo menos 6 caracteres.',
    invalidCredentials: 'Credenciais inválidas. Tenta novamente.',
    registerError: 'Erro ao criar conta. Tenta novamente.',
  },

  nav: {
    login: 'Entrar',
    register: 'Começar',
    settings: 'Definições',
    about: 'Sobre',
    newConversation: 'Nova Conversa',
    noSessions: 'Sem sessões ainda',
    viewAsClient: 'Ver como cliente',
    adminPanel: 'Painel Admin',
  },

  header: {
    adminLabel: 'Admin Panel',
  },

  chat: {
    emptyTitle: 'Como posso ajudar no teu trading hoje?',
    emptySubtitle: 'Análise técnica, gestão de risco ou conceitos fundamentais de Forex.',
    prompts: [
      { text: 'Explica o que é Forex', iconKey: 'HelpCircle' },
      { text: 'Como gerir risco numa conta pequena?', iconKey: 'Shield' },
      { text: 'O que é um par de moedas?', iconKey: 'TrendingUp' },
      { text: 'Como funciona alavancagem?', iconKey: 'BarChart3' },
      { text: 'Quais são os erros mais comuns no trading?', iconKey: 'MessageSquare' },
    ],
    loadingMessage: 'A carregar conversa...',
  },

  settings: {
    title: 'Definições',
    subtitle: 'Personaliza a tua experiência no Tarik Forex AI.',
    upgradeLabel: 'Upgrade para Pro — Em breve',
  },

  notFound: {
    title: 'Página não encontrada',
    description: 'A página que procuras não existe ou foi movida.',
    homeButton: 'Ir para o início',
    backButton: 'Voltar',
  },

  copyright: '© {year} Tarik Forex AI. Todos os direitos reservados.',
  footerCopyright: '© {year} Tarik Forex AI',
} as const;

export type ContentConfig = typeof contentConfig;