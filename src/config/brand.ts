export const brandConfig = {
id:          'money-makers',
name:        'Money Makers',
tagline:     'Where Traders Come To Win',
description: 'A academia premium que forma traders disciplinados, estratégicos e consistentes. Psicologia, gestão de risco e execução para o mercado real.',
copyright:   'Money Makers',
mentorName:  'Money Makers',

logo:        '/assets/brand/logo.jpeg',
logoAlt:     'Money Makers',

colors: {
primary:    '228 54% 22%',
background: '228 73% 10%',
foreground: '0 0% 100%',
muted:      '228 20% 70%',
accent:     '228 50% 16%',
},

fonts: {
heading:   "'Inter', sans-serif",
body:      "'Inter', sans-serif",
mono:      "'JetBrains Mono', monospace",
serif:     "'Instrument Serif', serif",
importUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap',
},

demoHint: {
adminEmail: 'admin@moneymakers.com',
label:      'Demo: usa admin@moneymakers.com para admin ou qualquer email para membro',
} as { adminEmail: string; label: string } | null,
} as const;

export type BrandConfig = typeof brandConfig;
