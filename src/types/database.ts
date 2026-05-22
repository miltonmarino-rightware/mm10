export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          role: 'guest' | 'student' | 'signals_member' | 'mentor' | 'admin' | 'super_admin'
          status: 'active' | 'blocked' | 'pending' | 'deleted'
          bio: string | null
          phone: string | null
          country: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'guest' | 'student' | 'signals_member' | 'mentor' | 'admin' | 'super_admin'
          status?: 'active' | 'blocked' | 'pending' | 'deleted'
          bio?: string | null
          phone?: string | null
          country?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'guest' | 'student' | 'signals_member' | 'mentor' | 'admin' | 'super_admin'
          status?: 'active' | 'blocked' | 'pending' | 'deleted'
          bio?: string | null
          phone?: string | null
          country?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          plan_type: 'FREE' | 'POWER_OF_THREE' | 'SIGNALS_ROOM' | 'MENTORSHIP' | 'PREMIUM_ALL_ACCESS'
          status: 'inactive' | 'pending_payment' | 'active' | 'grace_period' | 'expired' | 'cancelled'
          starts_at: string | null
          expires_at: string | null
          cancel_at_period_end: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          plan_type: 'FREE' | 'POWER_OF_THREE' | 'SIGNALS_ROOM' | 'MENTORSHIP' | 'PREMIUM_ALL_ACCESS'
          status?: 'inactive' | 'pending_payment' | 'active' | 'grace_period' | 'expired' | 'cancelled'
          starts_at?: string | null
          expires_at?: string | null
          cancel_at_period_end?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          plan_type?: 'FREE' | 'POWER_OF_THREE' | 'SIGNALS_ROOM' | 'MENTORSHIP' | 'PREMIUM_ALL_ACCESS'
          status?: 'inactive' | 'pending_payment' | 'active' | 'grace_period' | 'expired' | 'cancelled'
          starts_at?: string | null
          expires_at?: string | null
          cancel_at_period_end?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      payments: {
        Row: {
          id: string
          user_id: string
          subscription_id: string | null
          amount: number
          currency: string
          status: 'pending' | 'paid' | 'failed' | 'refunded' | 'cancelled'
          transaction_ref: string | null
          payment_method: string | null
          paid_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          subscription_id?: string | null
          amount: number
          currency?: string
          status?: 'pending' | 'paid' | 'failed' | 'refunded' | 'cancelled'
          transaction_ref?: string | null
          payment_method?: string | null
          paid_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          subscription_id?: string | null
          amount?: number
          currency?: string
          status?: 'pending' | 'paid' | 'failed' | 'refunded' | 'cancelled'
          transaction_ref?: string | null
          payment_method?: string | null
          paid_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      courses: {
        Row: {
          id: string
          title: string
          description: string | null
          thumbnail_url: string | null
          visibility: 'public' | 'private' | 'premium'
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          thumbnail_url?: string | null
          visibility?: 'public' | 'private' | 'premium'
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          thumbnail_url?: string | null
          visibility?: 'public' | 'private' | 'premium'
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      modules: {
        Row: {
          id: string
          course_id: string
          title: string
          description: string | null
          order_index: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          course_id: string
          title: string
          description?: string | null
          order_index: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          course_id?: string
          title?: string
          description?: string | null
          order_index?: number
          created_at?: string
          updated_at?: string
        }
      }
      lessons: {
        Row: {
          id: string
          module_id: string
          title: string
          content: string | null
          video_url: string | null
          lesson_type: 'video' | 'pdf' | 'audio' | 'podcast' | 'text' | 'image'
          duration_seconds: number | null
          order_index: number
          is_preview: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          module_id: string
          title: string
          content?: string | null
          video_url?: string | null
          lesson_type?: 'video' | 'pdf' | 'audio' | 'podcast' | 'text' | 'image'
          duration_seconds?: number | null
          order_index: number
          is_preview?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          module_id?: string
          title?: string
          content?: string | null
          video_url?: string | null
          lesson_type?: 'video' | 'pdf' | 'audio' | 'podcast' | 'text' | 'image'
          duration_seconds?: number | null
          order_index?: number
          is_preview?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      course_progress: {
        Row: {
          id: string
          user_id: string
          lesson_id: string
          is_completed: boolean
          completed_at: string | null
          last_watched_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          lesson_id: string
          is_completed?: boolean
          completed_at?: string | null
          last_watched_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          lesson_id?: string
          is_completed?: boolean
          completed_at?: string | null
          last_watched_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      signals: {
        Row: {
          id: string
          mentor_id: string
          pair: string
          direction: 'BUY' | 'SELL'
          entry_price: string | null
          stop_loss: string | null
          take_profit: string | null
          analysis_text: string | null
          chart_url: string | null
          state: 'draft' | 'published' | 'active' | 'closed' | 'archived'
          result: 'win' | 'loss' | 'breakeven' | 'pending'
          pips_gained: number | null
          published_at: string | null
          closed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          mentor_id: string
          pair: string
          direction: 'BUY' | 'SELL'
          entry_price?: string | null
          stop_loss?: string | null
          take_profit?: string | null
          analysis_text?: string | null
          chart_url?: string | null
          state?: 'draft' | 'published' | 'active' | 'closed' | 'archived'
          result?: 'win' | 'loss' | 'breakeven' | 'pending'
          pips_gained?: number | null
          published_at?: string | null
          closed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          mentor_id?: string
          pair?: string
          direction?: 'BUY' | 'SELL'
          entry_price?: string | null
          stop_loss?: string | null
          take_profit?: string | null
          analysis_text?: string | null
          chart_url?: string | null
          state?: 'draft' | 'published' | 'active' | 'closed' | 'archived'
          result?: 'win' | 'loss' | 'breakeven' | 'pending'
          pips_gained?: number | null
          published_at?: string | null
          closed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      signal_reads: {
        Row: {
          id: string
          user_id: string
          signal_id: string
          read_at: string
        }
        Insert: {
          id?: string
          user_id: string
          signal_id: string
          read_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          signal_id?: string
          read_at?: string
        }
      }
      broadcasts: {
        Row: {
          id: string
          sender_id: string
          title: string
          content: string
          media_url: string | null
          type: 'signal_buy' | 'signal_sell' | 'alert' | 'news' | 'video' | 'audio' | 'text'
          priority: 'normal' | 'high' | 'urgent'
          target: 'all' | 'students' | 'signals_members' | 'premium' | 'group'
          target_group_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          sender_id: string
          title: string
          content: string
          media_url?: string | null
          type?: 'signal_buy' | 'signal_sell' | 'alert' | 'news' | 'video' | 'audio' | 'text'
          priority?: 'normal' | 'high' | 'urgent'
          target?: 'all' | 'students' | 'signals_members' | 'premium' | 'group'
          target_group_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          sender_id?: string
          title?: string
          content?: string
          media_url?: string | null
          type?: 'signal_buy' | 'signal_sell' | 'alert' | 'news' | 'video' | 'audio' | 'text'
          priority?: 'normal' | 'high' | 'urgent'
          target?: 'all' | 'students' | 'signals_members' | 'premium' | 'group'
          target_group_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      broadcast_reads: {
        Row: {
          id: string
          user_id: string
          broadcast_id: string
          read_at: string
        }
        Insert: {
          id?: string
          user_id: string
          broadcast_id: string
          read_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          broadcast_id?: string
          read_at?: string
        }
      }
      groups: {
        Row: {
          id: string
          name: string
          description: string | null
          cover_url: string | null
          type: 'course_group' | 'signals_group' | 'mentorship_group' | 'custom'
          member_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          cover_url?: string | null
          type?: 'course_group' | 'signals_group' | 'mentorship_group' | 'custom'
          member_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          cover_url?: string | null
          type?: 'course_group' | 'signals_group' | 'mentorship_group' | 'custom'
          member_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      group_members: {
        Row: {
          id: string
          group_id: string
          user_id: string
          role: string | null
          joined_at: string
        }
        Insert: {
          id?: string
          group_id: string
          user_id: string
          role?: string | null
          joined_at?: string
        }
        Update: {
          id?: string
          group_id?: string
          user_id?: string
          role?: string | null
          joined_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          sender_id: string
          recipient_id: string | null
          group_id: string | null
          content: string
          type: 'text' | 'image' | 'file'
          file_url: string | null
          is_read: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          sender_id: string
          recipient_id?: string | null
          group_id?: string | null
          content: string
          type?: 'text' | 'image' | 'file'
          file_url?: string | null
          is_read?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          sender_id?: string
          recipient_id?: string | null
          group_id?: string | null
          content?: string
          type?: 'text' | 'image' | 'file'
          file_url?: string | null
          is_read?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      booking_slots: {
        Row: {
          id: string
          mentor_id: string
          start_time: string
          end_time: string
          price: number
          mentorship_type: 'ONE_TO_ONE' | 'GROUP_SESSION'
          max_participants: number
          current_participants: number
          state: 'available' | 'reserved' | 'confirmed' | 'completed' | 'cancelled'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          mentor_id: string
          start_time: string
          end_time: string
          price?: number
          mentorship_type?: 'ONE_TO_ONE' | 'GROUP_SESSION'
          max_participants?: number
          current_participants?: number
          state?: 'available' | 'reserved' | 'confirmed' | 'completed' | 'cancelled'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          mentor_id?: string
          start_time?: string
          end_time?: string
          price?: number
          mentorship_type?: 'ONE_TO_ONE' | 'GROUP_SESSION'
          max_participants?: number
          current_participants?: number
          state?: 'available' | 'reserved' | 'confirmed' | 'completed' | 'cancelled'
          created_at?: string
          updated_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          user_id: string
          slot_id: string
          payment_id: string | null
          status: 'available' | 'reserved' | 'confirmed' | 'completed' | 'cancelled'
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          slot_id: string
          payment_id?: string | null
          status?: 'available' | 'reserved' | 'confirmed' | 'completed' | 'cancelled'
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          slot_id?: string
          payment_id?: string | null
          status?: 'available' | 'reserved' | 'confirmed' | 'completed' | 'cancelled'
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      booking_participants: {
        Row: {
          id: string
          booking_id: string
          user_id: string
          joined_at: string
        }
        Insert: {
          id?: string
          booking_id: string
          user_id: string
          joined_at?: string
        }
        Update: {
          id?: string
          booking_id?: string
          user_id?: string
          joined_at?: string
        }
      }
      events: {
        Row: {
          id: string
          title: string
          description: string | null
          type: 'challenge' | 'campaign' | 'session' | 'webinar'
          state: 'upcoming' | 'live' | 'finished' | 'cancelled'
          start_time: string
          end_time: string | null
          location: string | null
          max_participants: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          type: 'challenge' | 'campaign' | 'session' | 'webinar'
          state?: 'upcoming' | 'live' | 'finished' | 'cancelled'
          start_time: string
          end_time?: string | null
          location?: string | null
          max_participants?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          type?: 'challenge' | 'campaign' | 'session' | 'webinar'
          state?: 'upcoming' | 'live' | 'finished' | 'cancelled'
          start_time?: string
          end_time?: string | null
          location?: string | null
          max_participants?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      event_participants: {
        Row: {
          id: string
          event_id: string
          user_id: string
          joined_at: string
        }
        Insert: {
          id?: string
          event_id: string
          user_id: string
          joined_at?: string
        }
        Update: {
          id?: string
          event_id?: string
          user_id?: string
          joined_at?: string
        }
      }
      trading_journal: {
        Row: {
          id: string
          user_id: string
          pair: string
          type: 'buy' | 'sell'
          entry_price: string | null
          exit_price: string | null
          stop_loss: string | null
          take_profit: string | null
          lot_size: string | null
          result: 'win' | 'loss' | 'breakeven' | null
          profit_loss: number | null
          notes: string | null
          chart_url: string | null
          trade_date: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          pair: string
          type: 'buy' | 'sell'
          entry_price?: string | null
          exit_price?: string | null
          stop_loss?: string | null
          take_profit?: string | null
          lot_size?: string | null
          result?: 'win' | 'loss' | 'breakeven' | null
          profit_loss?: number | null
          notes?: string | null
          chart_url?: string | null
          trade_date?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          pair?: string
          type?: 'buy' | 'sell'
          entry_price?: string | null
          exit_price?: string | null
          stop_loss?: string | null
          take_profit?: string | null
          lot_size?: string | null
          result?: 'win' | 'loss' | 'breakeven' | null
          profit_loss?: number | null
          notes?: string | null
          chart_url?: string | null
          trade_date?: string
          created_at?: string
          updated_at?: string
        }
      }
      museum_entries: {
        Row: {
          id: string
          mentor_id: string
          title: string
          description: string | null
          image_url: string
          is_public: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          mentor_id: string
          title: string
          description?: string | null
          image_url: string
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          mentor_id?: string
          title?: string
          description?: string | null
          image_url?: string
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      ai_sessions: {
        Row: {
          id: string
          user_id: string
          title: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      ai_messages: {
        Row: {
          id: string
          session_id: string
          role: 'user' | 'assistant' | 'system'
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          session_id: string
          role: 'user' | 'assistant' | 'system'
          content: string
          created_at?: string
        }
        Update: {
          id?: string
          session_id?: string
          role?: 'user' | 'assistant' | 'system'
          content?: string
          created_at?: string
        }
      }
      ai_usage: {
        Row: {
          id: string
          user_id: string
          usage_date: string
          message_count: number
        }
        Insert: {
          id?: string
          user_id: string
          usage_date?: string
          message_count?: number
        }
        Update: {
          id?: string
          user_id?: string
          usage_date?: string
          message_count?: number
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          type: 'broadcast' | 'signal' | 'booking' | 'message' | 'event' | 'system'
          title: string
          content: string
          link: string | null
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: 'broadcast' | 'signal' | 'booking' | 'message' | 'event' | 'system'
          title: string
          content: string
          link?: string | null
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: 'broadcast' | 'signal' | 'booking' | 'message' | 'event' | 'system'
          title?: string
          content?: string
          link?: string | null
          is_read?: boolean
          created_at?: string
        }
      }
      files: {
        Row: {
          id: string
          uploader_id: string
          name: string
          file_path: string
          file_type: string | null
          file_size: number | null
          bucket_name: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          uploader_id: string
          name: string
          file_path: string
          file_type?: string | null
          file_size?: number | null
          bucket_name: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          uploader_id?: string
          name?: string
          file_path?: string
          file_type?: string | null
          file_size?: number | null
          bucket_name?: string
          created_at?: string
          updated_at?: string
        }
      }
      audit_log: {
        Row: {
          id: string
          user_id: string | null
          action: string
          entity_type: string
          entity_id: string | null
          old_data: Json | null
          new_data: Json | null
          ip_address: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          action: string
          entity_type: string
          entity_id?: string | null
          old_data?: Json | null
          new_data?: Json | null
          ip_address?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          action?: string
          entity_type?: string
          entity_id?: string | null
          old_data?: Json | null
          new_data?: Json | null
          ip_address?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_mentor: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_student_active: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_signals_active: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      increment_ai_usage: {
        Args: {
          p_user_id: string
          p_date: string
        }
        Returns: void
      }
    }
    Enums: {
      user_role: 'guest' | 'student' | 'signals_member' | 'mentor' | 'admin' | 'super_admin'
      user_status: 'active' | 'blocked' | 'pending' | 'deleted'
      subscription_plan: 'FREE' | 'POWER_OF_THREE' | 'SIGNALS_ROOM' | 'MENTORSHIP' | 'PREMIUM_ALL_ACCESS'
      subscription_status: 'inactive' | 'pending_payment' | 'active' | 'grace_period' | 'expired' | 'cancelled'
      payment_status: 'pending' | 'paid' | 'failed' | 'refunded' | 'cancelled'
      course_visibility: 'public' | 'private' | 'premium'
      lesson_type: 'video' | 'pdf' | 'audio' | 'podcast' | 'text' | 'image'
      signal_direction: 'BUY' | 'SELL'
      signal_state: 'draft' | 'published' | 'active' | 'closed' | 'archived'
      signal_result: 'win' | 'loss' | 'breakeven' | 'pending'
      broadcast_type: 'signal_buy' | 'signal_sell' | 'alert' | 'news' | 'video' | 'audio' | 'text'
      broadcast_priority: 'normal' | 'high' | 'urgent'
      broadcast_target: 'all' | 'students' | 'signals_members' | 'premium' | 'group'
      group_type: 'course_group' | 'signals_group' | 'mentorship_group' | 'custom'
      message_type: 'text' | 'image' | 'file'
      booking_state: 'available' | 'reserved' | 'confirmed' | 'completed' | 'cancelled'
      mentorship_type: 'ONE_TO_ONE' | 'GROUP_SESSION'
      event_type: 'challenge' | 'campaign' | 'session' | 'webinar'
      event_state: 'upcoming' | 'live' | 'finished' | 'cancelled'
      trade_type: 'buy' | 'sell'
      trade_result: 'win' | 'loss' | 'breakeven'
      notification_type: 'broadcast' | 'signal' | 'booking' | 'message' | 'event' | 'system'
      ai_message_role: 'user' | 'assistant' | 'system'
    }
  }
}
