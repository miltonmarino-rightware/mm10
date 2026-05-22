import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/database';

type Trade = Database['public']['Tables']['trading_journal']['Row'];
type TradeInsert = Database['public']['Tables']['trading_journal']['Insert'];

export const tradingService = {
  list: async (userId: string) => {
    const { data, error } = await supabase
      .from('trading_journal')
      .select('*')
      .eq('user_id', userId)
      .order('trade_date', { ascending: false });
    
    if (error) throw error;
    return data as Trade[];
  },

  create: async (trade: TradeInsert) => {
    const { data, error } = await supabase
      .from('trading_journal')
      .insert(trade)
      .select()
      .single();
    
    if (error) throw error;
    return data as Trade;
  },

  update: async (id: string, updates: Partial<Trade>) => {
    const { data, error } = await supabase
      .from('trading_journal')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Trade;
  },

  delete: async (id: string) => {
    const { error } = await supabase
      .from('trading_journal')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  getStats: async (userId: string) => {
    const { data, error } = await supabase
      .from('trading_journal')
      .select('result, profit_loss')
      .eq('user_id', userId);
    
    if (error) throw error;

    const stats = {
      totalTrades: data.length,
      wins: data.filter(t => t.result === 'win').length,
      losses: data.filter(t => t.result === 'loss').length,
      breakevens: data.filter(t => t.result === 'breakeven').length,
      totalProfit: data.reduce((acc, t) => acc + (Number(t.profit_loss) || 0), 0),
      winRate: data.length > 0 ? (data.filter(t => t.result === 'win').length / data.length) * 100 : 0
    };

    return stats;
  }
};
