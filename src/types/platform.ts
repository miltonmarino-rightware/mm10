import type { Database } from '@/integrations/supabase/types';

export type AppRole = Database['public']['Enums']['user_role'];
export type PlanType = Database['public']['Enums']['subscription_plan'];

export type ProfileRow = Database['public']['Tables']['profiles']['Row'];
export type SubscriptionRow = Database['public']['Tables']['subscriptions']['Row'];

export type Feature =
  | 'course_access'
  | 'signals_access'
  | 'journal_access'
  | 'museum_access'
  | 'group_access'
  | 'mentorship_access'
  | 'admin_access'
  | 'payment_management'
  | 'subscription_management'
  | 'product_management'
  | 'payment_method_management';

export interface PlatformUser {
  id: string;
  name: string;
  email: string;
  role: AppRole | 'client';
  avatar?: string;
  profile: ProfileRow | null;
  subscriptions: SubscriptionRow[];
}

// ---- Legacy domain types (kept for mock UI screens) ----
export interface Course {
  id: string; title: string; description: string; thumbnail: string;
  modules: number; duration: string; progress?: number; category: string; featured?: boolean;
}
export interface Trade {
  id: string; pair: string; type: 'buy' | 'sell';
  result: 'win' | 'loss' | 'breakeven'; pips: number; date: string;
  notes?: string; lotSize?: number;
}
export interface Broadcast {
  id: string; title: string; content: string;
  type: 'text' | 'audio' | 'video' | 'alert';
  priority: 'normal' | 'high' | 'urgent';
  date: string; targetGroup?: string; read?: boolean;
}
export interface Signal {
  id: string; pair: string; direction: 'buy' | 'sell';
  entry: string; tp: string; sl: string;
  status: 'active' | 'hit_tp' | 'hit_sl' | 'cancelled'; date: string;
}
export interface Booking {
  id: string; studentId: string; studentName: string;
  date: string; time: string; duration: number;
  status: 'pending' | 'approved' | 'rejected' | 'completed' | 'no-show' | 'cancelled';
  notes?: string; topic?: string;
}
export interface Group {
  id: string; name: string; description?: string;
  members: number; lastMessage?: string; createdAt: string;
}
export interface PlatformEvent {
  id: string; title: string; description: string;
  date: string; endDate?: string;
  status: 'active' | 'upcoming' | 'ended';
  type: 'challenge' | 'event' | 'campaign' | 'session';
  participants?: number; prize?: string;
}
export interface MuseumItem {
  id: string; title: string; description: string;
  imageUrl: string; result: string; date: string;
  category: string; pair?: string; pips?: number;
}
export interface Student {
  id: string; name: string; email: string; avatar?: string;
  joinDate: string; coursesCompleted: number;
  tradesLogged: number; lastActive: string; group?: string;
}
