import type { Feature, PlatformUser, PlanType, SubscriptionRow } from '@/types/platform';

const ADMIN_ROLES = new Set(['admin', 'super_admin', 'mentor']);

export const COURSE_PLANS: PlanType[] = ['POWER_OF_THREE', 'PREMIUM_ALL_ACCESS'];
export const SIGNALS_PLANS: PlanType[] = ['SIGNALS_ROOM', 'SIGNALS_BASIC', 'SIGNALS_PLATINUM', 'SIGNALS_PREMIUM', 'PREMIUM_ALL_ACCESS'];
export const MENTORSHIP_PLANS: PlanType[] = ['MENTORSHIP', 'PREMIUM_ALL_ACCESS'];

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

export function hasAnyPlan(user: PlatformUser | null, plans: PlanType[]): boolean {
  const active = activeSubscriptions(user);
  return active.some(s => plans.includes(s.plan_type));
}

export function isAdmin(user: PlatformUser | null): boolean {
  if (!user) return false;
  return ADMIN_ROLES.has(String(user.profile?.role ?? user.role));
}

export function getPlansForFeature(feature: Feature): PlanType[] {
  switch (feature) {
    case 'course_access':
    case 'group_access':
    case 'journal_access':
    case 'museum_access':
      return COURSE_PLANS;
    case 'signals_access':
      return SIGNALS_PLANS;
    case 'mentorship_access':
      return MENTORSHIP_PLANS;
    default:
      return [];
  }
}

export function getPrimaryPlanForFeature(feature: Feature): PlanType | null {
  const plans = getPlansForFeature(feature).filter(p => p !== 'PREMIUM_ALL_ACCESS');
  return plans[0] ?? null;
}

/**
 * Feature-based access resolver. Subscription + role aware.
 * Backend RLS remains the real security layer — this controls UX gating.
 */
export function hasAccess(user: PlatformUser | null, feature: Feature): boolean {
  if (!user) return false;
  if (isAdmin(user)) return true;

  switch (feature) {
    case 'course_access':
    case 'group_access':
    case 'journal_access':
    case 'museum_access':
      return hasAnyPlan(user, COURSE_PLANS);
    case 'signals_access':
      return hasAnyPlan(user, SIGNALS_PLANS);
    case 'mentorship_access':
      return hasAnyPlan(user, MENTORSHIP_PLANS);
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
