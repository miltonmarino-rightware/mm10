import React, { useState } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogOut, Shield, ChevronLeft, MessageSquare } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { useBusinessConfig } from '@/hooks/useBusinessConfig';
import { resolveIcon } from '@/lib/icons';
import type { NavItem } from '@/config/business';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { brand, content, menu } = useBusinessConfig();

  const isAdmin = user?.role === 'admin';
  const navItems = isAdmin ? menu.adminNav : menu.clientNav;

  const isActiveCheck = (item: NavItem) =>
    item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path);

  const handleLogout = () => { logout(); navigate('/'); };

  const canGoBack = location.key !== 'default';

  const SidebarNav = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 flex items-center gap-3 mb-2 border-b border-border/60">
        <div className="w-10 h-10 rounded-xl overflow-hidden border border-primary/20 glow-primary-sm shrink-0">
          <img src={brand.logo} alt={brand.logoAlt} className="w-full h-full object-cover" />
        </div>
        <div className="min-w-0">
          <span className="font-semibold text-foreground text-sm block truncate tracking-tight">{brand.name}</span>
          {isAdmin && (
            <span className="text-[9px] font-mono uppercase tracking-[0.18em] text-primary flex items-center gap-1 mt-0.5">
              <Shield size={9} /> Admin Mode
            </span>
          )}
        </div>
      </div>

      <p className="px-6 pt-4 pb-2 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground/70">
        {isAdmin ? 'Management' : 'Terminal'}
      </p>
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto scrollbar-thin">
        {navItems.map(item => {
          const active = isActiveCheck(item);
          const Icon = resolveIcon(item.iconKey);
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                active
                  ? 'bg-primary/10 text-primary shadow-sm'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              )}
            >
              <Icon size={18} className={active ? 'text-primary' : ''} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {isAdmin && (
        <div className="px-3 pb-2">
          <Link to="/app" onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-muted-foreground hover:text-foreground hover:bg-secondary transition-all">
            <MessageSquare size={14} /> {content.nav.viewAsClient}
          </Link>
        </div>
      )}
      {!isAdmin && user?.email?.toLowerCase().includes('admin') && (
        <div className="px-3 pb-2">
          <Link to="/admin" onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-primary/70 hover:text-primary hover:bg-primary/5 transition-all">
            <Shield size={14} /> {content.nav.adminPanel}
          </Link>
        </div>
      )}

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-primary text-xs font-bold shrink-0">
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{user?.name}</p>
            <p className="text-[11px] text-muted-foreground truncate">{user?.email}</p>
          </div>
          <button onClick={handleLogout} className="p-1.5 text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-colors">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-[100dvh] bg-background text-foreground overflow-hidden">
      <aside className="hidden lg:flex w-64 border-r border-border bg-[hsl(var(--sidebar-background))] shrink-0 flex-col">
        <SidebarNav />
      </aside>

      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-background/70 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-y-0 left-0 z-50 w-72 bg-[hsl(var(--sidebar-background))] border-r border-border flex flex-col lg:hidden"
            >
              <button onClick={() => setSidebarOpen(false)}
                className="absolute top-3 right-3 p-2 rounded-lg hover:bg-secondary text-muted-foreground transition-colors">
                <X size={20} />
              </button>
              <SidebarNav />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <main className="flex-1 flex flex-col min-w-0 relative">
        <header className="h-14 border-b border-border flex items-center justify-between px-4 lg:px-6 bg-background/80 backdrop-blur-md sticky top-0 z-30 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg"
            >
              <Menu size={22} />
            </button>
            {canGoBack && (
              <button
                onClick={() => navigate(-1)}
                className="p-2 -ml-1 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-all active:scale-95"
                title="Voltar"
              >
                <ChevronLeft size={20} />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse-soft" />
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              {isAdmin ? content.header.adminLabel : brand.name}
            </span>
          </div>
          <div className="w-8 lg:hidden" />
        </header>

        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
