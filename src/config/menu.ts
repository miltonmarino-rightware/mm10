export interface NavItem {
  path: string;
  label: string;
  iconKey: string;
  exact?: boolean;
}

export interface Category {
  id: string;
  label: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  modules?: number;
  duration?: string;
  progress?: number;
  category: string;
  featured?: boolean;
  thumbnail?: string;
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
  { id: 'all', label: 'Todos' },
  { id: 'iniciante', label: 'Iniciante' },
  { id: 'intermedio', label: 'Intermédio' },
  { id: 'avancado', label: 'Avançado' },
];

export const products: Product[] = [
  { id: '1', title: 'Forex Fundamentos', description: 'Aprende as bases do mercado Forex', modules: 8, duration: '4h 30m', progress: 65, category: 'Iniciante', featured: true },
  { id: '2', title: 'Price Action Avançado', description: 'Domina price action e estrutura de mercado', modules: 12, duration: '7h 15m', progress: 30, category: 'Avançado', featured: true },
  { id: '3', title: 'Gestão de Risco', description: 'Protege o teu capital como profissional', modules: 6, duration: '3h', progress: 0, category: 'Intermédio', featured: false },
  { id: '4', title: 'Psicologia de Trading', description: 'Controla as emoções e toma decisões racionais', modules: 10, duration: '5h 45m', progress: 0, category: 'Todos', featured: false },
  { id: '5', title: 'Análise Técnica', description: 'Indicadores, padrões e confluências', modules: 14, duration: '8h', progress: 100, category: 'Intermédio', featured: true },
  { id: '6', title: 'Trading com Notícias', description: 'Opera com base em eventos fundamentais', modules: 5, duration: '2h 30m', progress: 0, category: 'Avançado', featured: false },
];
