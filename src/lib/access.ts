import type { Feature, PlatformUser, PlanType, SubscriptionRow } from '@/types/platform';

const ADMIN_ROLES = new Set(['admin', 'super_admin', 'mentor']);

function isActive(sub: SubscriptionRow): boolean {
  if (sub.status !== 'active') return false;
  if (!sub.expires_at) return true;
  return new Date(sub.expires_at).getTime() > Date.now();
}

export function activeSubscriptions(user: PlatformUser | null): SubscriptionRow[] {
  if (!user) return [];
  return user.subscriptions.filter(isActive);
}

export function hasPlan(user: PlatformUser | null, plan: PlanType): boolean {
  return activeSubscriptions(user).some(s => s.plan_type === plan);
}

export function isAdmin(user: PlatformUser | null): boolean {
  if (!user) return false;
  return ADMIN_ROLES.has(String(user.profile?.role ?? user.role));
}

/**
 * Feature-based access resolver. Subscription + role aware.
 * Backend RLS remains the real security layer — this controls UX gating.
 */
export function hasAccess(user: PlatformUser | null, feature: Feature): boolean {
  if (!user) return false;
  if (isAdmin(user)) return true;

  const subs = activeSubscriptions(user);
  const has = (plan: PlanType) => subs.some(s => s.plan_type === plan);

  const studentActive = has('POWER_OF_THREE') || has('PREMIUM_ALL_ACCESS');
  const signalsActive = has('SIGNALS_ROOM') || has('PREMIUM_ALL_ACCESS');
  const mentorshipActive = has('MENTORSHIP') || has('PREMIUM_ALL_ACCESS');

  switch (feature) {
    case 'course_access':
    case 'group_access':
    case 'museum_access':
      return studentActive;
    case 'signals_access':
      return signalsActive;
    case 'mentorship_access':
      return mentorshipActive;
    case 'journal_access':
      return subs.length > 0; // any active subscriber
    case 'admin_access':
    case 'payment_management':
    case 'subscription_management':
    case 'product_management':
    case 'payment_method_management':
      return false;
    default:
      return false;
  }
}
