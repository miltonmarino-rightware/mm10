import {
  LayoutDashboard, MessageSquare, GraduationCap, BarChart3, Radio,
  Calendar, Users, Trophy, Image, User, Mail, Shield, TrendingUp,
  HelpCircle, Target, Zap, Award, ArrowRight, Brain,
  CreditCard, BadgeCheck, Package, Wallet,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  LayoutDashboard, MessageSquare, GraduationCap, BarChart3, Radio,
  Calendar, Users, Trophy, Image, User, Mail, Shield, TrendingUp,
  HelpCircle, Target, Zap, Award, ArrowRight, Brain,
  CreditCard, BadgeCheck, Package, Wallet,
};

export function resolveIcon(key: string): LucideIcon {
  return ICON_MAP[key] || MessageSquare;
}
