export interface NavItem {
  path: string;
  label: string;
  iconKey: string;
  exact?: boolean;
}

export interface Category {
  id:    string;
  label: string;
  image: string;   // string path only — /assets/categories/...
}

export interface Product {
  id:           string;
  title:        string;
  description:  string;
  modules?:     number;
  duration?:    string;
  progress?:    number;
  category:     string;
  featured?:    boolean;
  thumbnail?:   string;   // string path only — /assets/courses/...
}

export const clientNav: NavItem[] = [
  { path: '/app', label: 'Dashboard', iconKey: 'LayoutDashboard', exact: true },
  { path: '/app/chat', label: 'Chat IA', iconKey: 'MessageSquare' },
  { path: '/app/courses', label: 'Cursos', iconKey: 'GraduationCap' },
  { path: '/app/trades', label: 'Trading Journal', iconKey: 'BarChart3' },
  { path: '/app/broadcasts', label: 'Broadcasts', iconKey: 'Radio' },
  { path: '/app/bookings', label: 'Reservas', iconKey: 'Calendar' },
  { path: '/app/groups', label: 'Grupos', iconKey: 'Users' },
  { path: '/app/messages', label: 'Mensagens', iconKey: 'Mail' },
  { path: '/app/events', label: 'Eventos', iconKey: 'Trophy' },
  { path: '/app/museum', label: 'Museu', iconKey: 'Image' },
  { path: '/app/profile', label: 'Perfil', iconKey: 'User' },
];

export const adminNav: NavItem[] = [
  { path: '/admin', label: 'Dashboard', iconKey: 'LayoutDashboard', exact: true },
  { path: '/admin/payments', label: 'Pagamentos', iconKey: 'CreditCard' },
  { path: '/admin/subscriptions', label: 'Subscrições', iconKey: 'BadgeCheck' },
  { path: '/admin/products', label: 'Produtos', iconKey: 'Package' },
  { path: '/admin/payment-config', label: 'Métodos $', iconKey: 'Wallet' },
  { path: '/admin/students', label: 'Alunos', iconKey: 'Users' },
  { path: '/admin/courses', label: 'Cursos', iconKey: 'GraduationCap' },
  { path: '/admin/broadcasts', label: 'Broadcasts', iconKey: 'Radio' },
  { path: '/admin/trades', label: 'Trading Journal', iconKey: 'BarChart3' },
  { path: '/admin/bookings', label: 'Reservas', iconKey: 'Calendar' },
  { path: '/admin/groups', label: 'Grupos', iconKey: 'Users' },
  { path: '/admin/messages', label: 'Mensagens', iconKey: 'Mail' },
  { path: '/admin/events', label: 'Eventos', iconKey: 'Trophy' },
  { path: '/admin/museum', label: 'Museu', iconKey: 'Image' },
];

export const categories: Category[] = [
{ id: 'all',         label: 'Todos',       image: '/assets/categories/all.jpg'         },
{ id: 'Iniciante',   label: 'Iniciante',   image: '/assets/categories/beginner.jpg'    },
{ id: 'Psicologia',  label: 'Psicologia',  image: '/assets/categories/psychology.jpg'  },
{ id: 'Risco',       label: 'Risco',       image: '/assets/categories/risk.jpg'        },
{ id: 'Estratégia',  label: 'Estratégia',  image: '/assets/categories/strategy.jpg'    },
{ id: 'Performance', label: 'Performance', image: '/assets/categories/performance.jpg' },
];

export const products: Product[] = [
{ id: '1', title: 'Fundamentos do Trading',       description: 'Estrutura de mercado, pares, sessões e os primeiros passos do trader sério.',          modules: 8,  duration: '3h 30m', progress: 0, category: 'Iniciante',   featured: true,  thumbnail: '/assets/courses/fundamentos.jpg'  },
{ id: '2', title: 'Psicologia & Mentalidade',     description: 'Como gerir emoções, eliminar revenge trading e construir disciplina operacional.',      modules: 10, duration: '4h 15m', progress: 0, category: 'Psicologia',  featured: true,  thumbnail: '/assets/courses/psicologia.jpg'   },
{ id: '3', title: 'Gestão de Risco Profissional', description: 'Dimensionamento de posição, drawdown máximo e regras de proteção de capital.',         modules: 7,  duration: '3h',     progress: 0, category: 'Risco',       featured: true,  thumbnail: '/assets/courses/risco.jpg'        },
{ id: '4', title: 'Price Action & Estrutura',     description: 'Leitura de mercado sem indicadores — suporte, resistência, BOS e pontos de entrada.',  modules: 14, duration: '6h 45m', progress: 0, category: 'Estratégia',  featured: true,  thumbnail: '/assets/courses/price-action.jpg' },
{ id: '5', title: 'Execução & Plano de Trading',  description: 'Como construir e seguir um plano com regras claras e processo repetível.',             modules: 9,  duration: '4h',     progress: 0, category: 'Estratégia',  featured: false, thumbnail: '/assets/courses/execucao.jpg'     },
{ id: '6', title: 'Trading Journal Avançado',     description: 'Como analisar o histórico de trades para identificar padrões e melhorar consistência.', modules: 6,  duration: '2h 30m', progress: 0, category: 'Performance', featured: false, thumbnail: '/assets/courses/journal.jpg'      },
];
