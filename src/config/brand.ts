export const brandConfig = {
  id:          'tarik-forex',
  name:        'Tarik Forex AI',
  tagline:     'Domina o Forex com Inteligência Artificial',
  description: 'A plataforma premium de trading que combina IA avançada, mentoria directa, cursos exclusivos e análise de performance. Tudo o que precisas num só lugar.',
  copyright:   'Tarik Forex AI',
  mentorName:  'Tarik',

  logo:        '/assets/brand/logo.jpeg',
  logoAlt:     'Tarik Forex AI',

  colors: {
    primary:    '152 55% 46%',
    background: '220 16% 3.5%',
    foreground: '210 20% 93%',
    muted:      '215 12% 48%',
    accent:     '152 30% 16%',
  },

  fonts: {
    heading:   "'Inter', sans-serif",
    body:      "'Inter', sans-serif",
    importUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap',
  },

  demoHint: {
    adminEmail: 'admin@tarik.com',
    label:      'Demo: usa admin@tarik.com para admin ou qualquer email para cliente',
  } as { adminEmail: string; label: string } | null,
} as const;

export type BrandConfig = typeof brandConfig;
