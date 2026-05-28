import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/database';

type Group = Database['public']['Tables']['groups']['Row'];

export const groupService = {
  listMine: async (userId: string) => {
    const { data, error } = await supabase
      .from('group_members')
      .select(`
        group:groups(*)
      `)
      .eq('user_id', userId);
    
    if (error) throw error;
    return (data as unknown as Array<{ group: Group }>).map(d => d.group);
  },

  getMembers: async (groupId: string) => {
    const { data, error } = await supabase
      .from('group_members')
      .select(`
        *,
        profile:profiles(id, full_name, avatar_url, role)
      `)
      .eq('group_id', groupId);
    
    if (error) throw error;
    return data;
  },

  get: async (id: string) => {
    const { data, error } = await supabase
      .from('groups')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Group;
  }
};
