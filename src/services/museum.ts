import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/database';

type MuseumEntry = Database['public']['Tables']['museum_entries']['Row'];

export const museumService = {
  list: async () => {
    const { data, error } = await supabase
      .from('museum_entries')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as MuseumEntry[];
  },

  create: async (entry: Database['public']['Tables']['museum_entries']['Insert']) => {
    const { data, error } = await supabase
      .from('museum_entries')
      .insert(entry)
      .select()
      .single();
    
    if (error) throw error;
    return data as MuseumEntry;
  },

  uploadImage: async (file: File) => {
    const fileName = `${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from('museum')
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('museum')
      .getPublicUrl(fileName);

    return publicUrl;
  }
};
