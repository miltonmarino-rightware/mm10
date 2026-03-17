import React from 'react';
import { PageTransition, FadeIn } from '@/components/common/PageTransition';
import { User, Palette, Bell, Globe, CreditCard, Shield, Monitor } from 'lucide-react';

const Section: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode; delay?: number }> = ({
  title, icon, children, delay = 0,
}) => (
  <FadeIn delay={delay}>
    <div className="bg-card border border-border rounded-2xl p-5 md:p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 rounded-xl bg-primary/10 text-primary">{icon}</div>
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      </div>
      {children}
    </div>
  </FadeIn>
);

const ToggleRow: React.FC<{ label: string; description: string; defaultOn?: boolean }> = ({
  label, description, defaultOn = false,
}) => {
  const [on, setOn] = React.useState(defaultOn);
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
      <button
        onClick={() => setOn(!on)}
        className={`relative w-11 h-6 rounded-full transition-colors ${on ? 'bg-primary' : 'bg-muted'}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-foreground transition-transform ${
            on ? 'translate-x-5' : ''
          }`}
        />
      </button>
    </div>
  );
};

const InfoRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
    <span className="text-sm text-muted-foreground">{label}</span>
    <span className="text-sm font-medium text-foreground">{value}</span>
  </div>
);

const SettingsPage: React.FC = () => (
  <PageTransition className="flex-1 overflow-y-auto scrollbar-thin">
    <div className="max-w-2xl mx-auto px-4 md:px-8 py-8 space-y-5">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Definições</h1>
        <p className="text-muted-foreground text-sm mt-1">Personaliza a tua experiência no Tarik Forex AI.</p>
      </div>

      <Section title="Perfil" icon={<User size={20} />} delay={0.05}>
        <InfoRow label="Nome" value="Trader" />
        <InfoRow label="Email" value="trader@example.com" />
        <InfoRow label="Membro desde" value="Março 2026" />
      </Section>

      <Section title="Interface" icon={<Monitor size={20} />} delay={0.1}>
        <ToggleRow label="Modo escuro" description="Sempre activo nesta versão" defaultOn />
        <ToggleRow label="Animações" description="Transições e motion design" defaultOn />
        <ToggleRow label="Som de notificação" description="Feedback sonoro ao receber resposta" />
      </Section>

      <Section title="Experiência" icon={<Palette size={20} />} delay={0.15}>
        <ToggleRow label="Respostas compactas" description="Reduzir espaçamento entre mensagens" />
        <ToggleRow label="Sugestões automáticas" description="Mostrar prompts sugeridos" defaultOn />
      </Section>

      <Section title="Notificações" icon={<Bell size={20} />} delay={0.2}>
        <ToggleRow label="Alertas de mercado" description="Receber notificações sobre movimentos relevantes" />
        <ToggleRow label="Updates do produto" description="Novidades e melhorias do Tarik Forex AI" defaultOn />
      </Section>

      <Section title="Idioma" icon={<Globe size={20} />} delay={0.25}>
        <InfoRow label="Idioma actual" value="Português (PT)" />
        <p className="text-xs text-muted-foreground mt-2">Mais idiomas disponíveis em breve.</p>
      </Section>

      <Section title="Plano" icon={<CreditCard size={20} />} delay={0.3}>
        <InfoRow label="Plano actual" value="Free" />
        <InfoRow label="Mensagens restantes" value="∞" />
        <button className="mt-4 w-full py-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary text-sm font-medium hover:bg-primary/20 transition-colors">
          Upgrade para Pro — Em breve
        </button>
      </Section>

      <Section title="Segurança" icon={<Shield size={20} />} delay={0.35}>
        <ToggleRow label="Autenticação 2FA" description="Em breve disponível" />
        <InfoRow label="Última sessão" value="Agora" />
      </Section>
    </div>
  </PageTransition>
);

export default SettingsPage;
