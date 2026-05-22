import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/database';

type Course = Database['public']['Tables']['courses']['Row'];
type Module = Database['public']['Tables']['modules']['Row'];
type Lesson = Database['public']['Tables']['lessons']['Row'];
type Progress = Database['public']['Tables']['course_progress']['Row'];

export const courseService = {
  list: async () => {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Course[];
  },

  get: async (id: string) => {
    const { data, error } = await supabase
      .from('courses')
      .select(`
        *,
        modules:modules(
          *,
          lessons:lessons(*)
        )
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  listProgress: async (userId: string) => {
    const { data, error } = await supabase
      .from('course_progress')
      .select('*')
      .eq('user_id', userId);
    
    if (error) throw error;
    return data as Progress[];
  },

  markComplete: async (userId: string, lesson_id: string) => {
    const { data, error } = await supabase
      .from('course_progress')
      .upsert({
        user_id: userId,
        lesson_id: lesson_id,
        is_completed: true,
        completed_at: new Date().toISOString()
      })
      .select()
      .single();
    
    if (error) throw error;
    return data as Progress;
  }
};
