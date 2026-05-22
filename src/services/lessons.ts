import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/database';

type Lesson = Database['public']['Tables']['lessons']['Row'];

export const lessonService = {
  get: async (id: string) => {
    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Lesson;
  },

  getSignedUrl: async (filePath: string) => {
    const { data, error } = await supabase.storage
      .from('course-materials')
      .createSignedUrl(filePath, 3600); // 1 hour

    if (error) throw error;
    return data.signedUrl;
  }
};
