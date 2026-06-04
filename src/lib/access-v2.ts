import type { AccessLevel, AiLimitPolicy, Feature, PlatformUser, PlanType, SubscriptionRow } from '@/types/platform';

const ADMIN_ROLES = new Set(['admin', 'super_admin', 'mentor']);

export const COURSE_PLANS: PlanType[] = ['POWER_OF_THREE', 'PREMIUM_ALL_ACCESS'];
export const SIGNALS_PLANS: PlanType[] = ['SIGNALS_ROOM', 'SIGNALS_BASIC', 'SIGNALS_PLATINUM', 'SIGNALS_PREMIUM', 'PREMIUM_ALL_ACCESS'];
export const MENTORSHIP_PLANS: PlanType[] = ['MENTORSHIP', 'PREMIUM_ALL_ACCESS'];
export const PUBLIC_FEATURES: Feature[] = ['dashboard_access', 'preview_access', 'plans_access', 'checkout_access', 'profile_access'];

export type FeatureAccess = {
  feature: Feature;
  level: AccessLevel;
  allowed: boolean;
  reason: 'public' | 'guest_preview' | 'free_preview' | 'active_subscription' | 'admin_override' | 'limited_trial' | 'locked';
  requiredPlans: PlanType[];
  upgradePlan: PlanType | null;
  previewLimit?: number;
  dailyLimit?: number | null;
};

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
  return activeSubscriptions(user).some(s => plans.includes(s.plan_type));
}

export function isAdmin(user: PlatformUser | null): boolean {
  if (!user) return false;
  return ADMIN_ROLES.has(String(user.profile?.role ?? user.role));
}

export function hasCourseSubscription(user: PlatformUser | null): boolean {
  return hasAnyPlan(user, COURSE_PLANS);
}

export function hasSignalsSubscription(user: PlatformUser | null): boolean {
  return hasAnyPlan(user, SIGNALS_PLANS);
}

export function hasMentorshipSubscription(user: PlatformUser | null): boolean {
  return hasAnyPlan(user, MENTORSHIP_PLANS);
}

export function getPlansForFeature(feature: Feature): PlanType[] {
  switch (feature) {
    case 'course_access':
    case 'group_access':
    case 'journal_access':
    case 'ai_access':
    case 'museum_full_access':
    case 'museum_access':
    case 'messages_access':
      return COURSE_PLANS;
    case 'signals_access':
    case 'broadcasts_access':
      return SIGNALS_PLANS;
    case 'bookings_access':
    case 'mentorship_access':
      return MENTORSHIP_PLANS;
    case 'events_access':
      return ['PREMIUM_ALL_ACCESS'];
    default:
      return [];
  }
}

export function getPrimaryPlanForFeature(feature: Feature): PlanType | null {
  const plans = getPlansForFeature(feature).filter(p => p !== 'PREMIUM_ALL_ACCESS');
  return plans[0] ?? 'PREMIUM_ALL_ACCESS';
}

export function getEntitlements(user: PlatformUser | null): Set<Feature> {
  const entitlements = new Set<Feature>(PUBLIC_FEATURES);

  if (isAdmin(user)) {
    [
      'course_access', 'group_access', 'journal_access', 'ai_access', 'museum_full_access', 'museum_access',
      'signals_access', 'broadcasts_access', 'mentorship_access', 'bookings_access', 'messages_access', 'events_access',
      'admin_access', 'payment_management', 'subscription_management', 'product_management', 'payment_method_management',
    ].forEach(feature => entitlements.add(feature as Feature));
    return entitlements;
  }

  for (const sub of activeSubscriptions(user)) {
    switch (sub.plan_type) {
      case 'POWER_OF_THREE':
        ['course_access', 'group_access', 'journal_access', 'ai_access', 'museum_full_access', 'museum_access', 'messages_access']
          .forEach(feature => entitlements.add(feature as Feature));
        break;
      case 'SIGNALS_ROOM':
      case 'SIGNALS_BASIC':
      case 'SIGNALS_PLATINUM':
      case 'SIGNALS_PREMIUM':
        ['signals_access', 'broadcasts_access', 'ai_access']
          .forEach(feature => entitlements.add(feature as Feature));
        break;
      case 'MENTORSHIP':
        ['mentorship_access', 'bookings_access', 'ai_access']
          .forEach(feature => entitlements.add(feature as Feature));
        break;
      case 'PREMIUM_ALL_ACCESS':
        ['course_access', 'group_access', 'journal_access', 'ai_access', 'museum_full_access', 'museum_access', 'messages_access', 'signals_access', 'broadcasts_access', 'mentorship_access', 'bookings_access', 'events_access']
          .forEach(feature => entitlements.add(feature as Feature));
        break;
      default:
        break;
    }
  }

  return entitlements;
}

export function hasEntitlement(user: PlatformUser | null, feature: Feature): boolean {
  return getEntitlements(user).has(feature);
}

export function getAiLimitPolicy(user: PlatformUser | null): AiLimitPolicy {
  if (isAdmin(user)) return { dailyLimit: null, reason: 'admin_unlimited', upsellPlan: null };
  if (hasCourseSubscription(user) || hasMentorshipSubscription(user) || hasPlan(user, 'PREMIUM_ALL_ACCESS')) return { dailyLimit: null, reason: 'subscriber_unlimited', upsellPlan: null };
  if (hasPlan(user, 'SIGNALS_PREMIUM')) return { dailyLimit: 5, reason: 'signals_daily', upsellPlan: 'POWER_OF_THREE' };
  if (hasPlan(user, 'SIGNALS_PLATINUM')) return { dailyLimit: 3, reason: 'signals_daily', upsellPlan: 'POWER_OF_THREE' };
  if (hasPlan(user, 'SIGNALS_BASIC') || hasPlan(user, 'SIGNALS_ROOM')) return { dailyLimit: 2, reason: 'signals_daily', upsellPlan: 'POWER_OF_THREE' };
  if (user) return { dailyLimit: 3, reason: 'free_daily', upsellPlan: 'POWER_OF_THREE' };
  return { dailyLimit: 1, reason: 'guest_preview', upsellPlan: 'POWER_OF_THREE' };
}

export function getFeatureAccess(user: PlatformUser | null, feature: Feature): FeatureAccess {
  const requiredPlans = getPlansForFeature(feature);
  const upgradePlan = getPrimaryPlanForFeature(feature);

  if (PUBLIC_FEATURES.includes(feature)) {
    return { feature, level: 'full', allowed: true, reason: 'public', requiredPlans, upgradePlan: null };
  }

  if (isAdmin(user)) {
    return { feature, level: 'admin', allowed: true, reason: 'admin_override', requiredPlans, upgradePlan: null };
  }

  if (feature === 'ai_access') {
    const policy = getAiLimitPolicy(user);
    return {
      feature,
      level: policy.dailyLimit === null ? 'full' : 'limited',
      allowed: true,
      reason: policy.dailyLimit === null ? 'active_subscription' : 'limited_trial',
      requiredPlans,
      upgradePlan: policy.upsellPlan,
      dailyLimit: policy.dailyLimit,
    };
  }

  if (feature === 'museum_preview_access') {
    const full = hasCourseSubscription(user) || hasPlan(user, 'PREMIUM_ALL_ACCESS');
    return {
      feature,
      level: full ? 'full' : 'preview',
      allowed: true,
      reason: full ? 'active_subscription' : (user ? 'free_preview' : 'guest_preview'),
      requiredPlans: COURSE_PLANS,
      upgradePlan: 'POWER_OF_THREE',
      previewLimit: user ? 5 : 3,
    };
  }

  if (requiredPlans.length > 0 && hasAnyPlan(user, requiredPlans)) {
    return { feature, level: 'full', allowed: true, reason: 'active_subscription', requiredPlans, upgradePlan: null };
  }

  if (feature === 'signals_access' || feature === 'broadcasts_access') {
    return { feature, level: 'preview', allowed: true, reason: user ? 'free_preview' : 'guest_preview', requiredPlans, upgradePlan: 'SIGNALS_BASIC', previewLimit: 2 };
  }

  return { feature, level: 'none', allowed: false, reason: 'locked', requiredPlans, upgradePlan };
}

/** Full access only. Use getFeatureAccess() for preview/limited states. */
export function hasAccess(user: PlatformUser | null, feature: Feature): boolean {
  const access = getFeatureAccess(user, feature);
  return access.allowed && (access.level === 'full' || access.level === 'admin');
}
