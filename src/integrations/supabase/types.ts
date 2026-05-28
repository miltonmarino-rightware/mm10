export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      admin_notifications: {
        Row: {
          attempt_count: number
          body_html: string | null
          body_text: string | null
          created_at: string
          failed_at: string | null
          failure_reason: string | null
          id: string
          notification_type: Database["public"]["Enums"]["notification_type"]
          payload: Json | null
          recipient_email: string
          related_payment_id: string | null
          related_user_id: string | null
          scheduled_for: string
          sent_at: string | null
          status: Database["public"]["Enums"]["notification_status"]
          subject: string
        }
        Insert: {
          attempt_count?: number
          body_html?: string | null
          body_text?: string | null
          created_at?: string
          failed_at?: string | null
          failure_reason?: string | null
          id?: string
          notification_type: Database["public"]["Enums"]["notification_type"]
          payload?: Json | null
          recipient_email: string
          related_payment_id?: string | null
          related_user_id?: string | null
          scheduled_for?: string
          sent_at?: string | null
          status?: Database["public"]["Enums"]["notification_status"]
          subject: string
        }
        Update: {
          attempt_count?: number
          body_html?: string | null
          body_text?: string | null
          created_at?: string
          failed_at?: string | null
          failure_reason?: string | null
          id?: string
          notification_type?: Database["public"]["Enums"]["notification_type"]
          payload?: Json | null
          recipient_email?: string
          related_payment_id?: string | null
          related_user_id?: string | null
          scheduled_for?: string
          sent_at?: string | null
          status?: Database["public"]["Enums"]["notification_status"]
          subject?: string
        }
        Relationships: [
          {
            foreignKeyName: "admin_notifications_related_payment_id_fkey"
            columns: ["related_payment_id"]
            isOneToOne: false
            referencedRelation: "payments"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          role: Database["public"]["Enums"]["ai_message_role"]
          session_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["ai_message_role"]
          session_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["ai_message_role"]
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_messages_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "ai_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_sessions: {
        Row: {
          created_at: string
          id: string
          title: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          title?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          title?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_usage: {
        Row: {
          id: string
          message_count: number
          usage_date: string
          user_id: string
        }
        Insert: {
          id?: string
          message_count?: number
          usage_date?: string
          user_id: string
        }
        Update: {
          id?: string
          message_count?: number
          usage_date?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_usage_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_log: {
        Row: {
          action: string
          created_at: string
          entity_id: string | null
          entity_type: string
          id: string
          ip_address: string | null
          new_data: Json | null
          old_data: Json | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          entity_id?: string | null
          entity_type: string
          id?: string
          ip_address?: string | null
          new_data?: Json | null
          old_data?: Json | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          entity_id?: string | null
          entity_type?: string
          id?: string
          ip_address?: string | null
          new_data?: Json | null
          old_data?: Json | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      booking_participants: {
        Row: {
          booking_id: string
          id: string
          joined_at: string
          user_id: string
        }
        Insert: {
          booking_id: string
          id?: string
          joined_at?: string
          user_id: string
        }
        Update: {
          booking_id?: string
          id?: string
          joined_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "booking_participants_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "booking_participants_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      booking_slots: {
        Row: {
          created_at: string
          current_participants: number
          end_time: string
          id: string
          max_participants: number
          mentor_id: string
          mentorship_type: Database["public"]["Enums"]["mentorship_type"]
          price: number
          start_time: string
          state: Database["public"]["Enums"]["booking_state"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          current_participants?: number
          end_time: string
          id?: string
          max_participants?: number
          mentor_id: string
          mentorship_type?: Database["public"]["Enums"]["mentorship_type"]
          price?: number
          start_time: string
          state?: Database["public"]["Enums"]["booking_state"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          current_participants?: number
          end_time?: string
          id?: string
          max_participants?: number
          mentor_id?: string
          mentorship_type?: Database["public"]["Enums"]["mentorship_type"]
          price?: number
          start_time?: string
          state?: Database["public"]["Enums"]["booking_state"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "booking_slots_mentor_id_fkey"
            columns: ["mentor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          created_at: string
          id: string
          notes: string | null
          payment_id: string | null
          slot_id: string
          status: Database["public"]["Enums"]["booking_state"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          notes?: string | null
          payment_id?: string | null
          slot_id: string
          status?: Database["public"]["Enums"]["booking_state"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          notes?: string | null
          payment_id?: string | null
          slot_id?: string
          status?: Database["public"]["Enums"]["booking_state"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "payments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_slot_id_fkey"
            columns: ["slot_id"]
            isOneToOne: false
            referencedRelation: "booking_slots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      broadcast_reads: {
        Row: {
          broadcast_id: string
          id: string
          read_at: string
          user_id: string
        }
        Insert: {
          broadcast_id: string
          id?: string
          read_at?: string
          user_id: string
        }
        Update: {
          broadcast_id?: string
          id?: string
          read_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "broadcast_reads_broadcast_id_fkey"
            columns: ["broadcast_id"]
            isOneToOne: false
            referencedRelation: "broadcasts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "broadcast_reads_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      broadcasts: {
        Row: {
          content: string
          created_at: string
          id: string
          media_url: string | null
          priority: Database["public"]["Enums"]["broadcast_priority"]
          sender_id: string
          target: Database["public"]["Enums"]["broadcast_target"]
          target_group_id: string | null
          title: string
          type: Database["public"]["Enums"]["broadcast_type"]
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          media_url?: string | null
          priority?: Database["public"]["Enums"]["broadcast_priority"]
          sender_id: string
          target?: Database["public"]["Enums"]["broadcast_target"]
          target_group_id?: string | null
          title: string
          type?: Database["public"]["Enums"]["broadcast_type"]
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          media_url?: string | null
          priority?: Database["public"]["Enums"]["broadcast_priority"]
          sender_id?: string
          target?: Database["public"]["Enums"]["broadcast_target"]
          target_group_id?: string | null
          title?: string
          type?: Database["public"]["Enums"]["broadcast_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "broadcasts_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      course_progress: {
        Row: {
          completed_at: string | null
          created_at: string
          id: string
          is_completed: boolean | null
          last_watched_at: string | null
          lesson_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          id?: string
          is_completed?: boolean | null
          last_watched_at?: string | null
          lesson_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          id?: string
          is_completed?: boolean | null
          last_watched_at?: string | null
          lesson_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_published: boolean | null
          thumbnail_url: string | null
          title: string
          updated_at: string
          visibility: Database["public"]["Enums"]["course_visibility"]
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_published?: boolean | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string
          visibility?: Database["public"]["Enums"]["course_visibility"]
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_published?: boolean | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
          visibility?: Database["public"]["Enums"]["course_visibility"]
        }
        Relationships: []
      }
      event_participants: {
        Row: {
          event_id: string
          id: string
          joined_at: string
          user_id: string
        }
        Insert: {
          event_id: string
          id?: string
          joined_at?: string
          user_id: string
        }
        Update: {
          event_id?: string
          id?: string
          joined_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_participants_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_participants_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          created_at: string
          description: string | null
          end_time: string | null
          id: string
          location: string | null
          max_participants: number | null
          start_time: string
          state: Database["public"]["Enums"]["event_state"]
          title: string
          type: Database["public"]["Enums"]["event_type"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          end_time?: string | null
          id?: string
          location?: string | null
          max_participants?: number | null
          start_time: string
          state?: Database["public"]["Enums"]["event_state"]
          title: string
          type: Database["public"]["Enums"]["event_type"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          end_time?: string | null
          id?: string
          location?: string | null
          max_participants?: number | null
          start_time?: string
          state?: Database["public"]["Enums"]["event_state"]
          title?: string
          type?: Database["public"]["Enums"]["event_type"]
          updated_at?: string
        }
        Relationships: []
      }
      files: {
        Row: {
          bucket_name: string
          created_at: string
          file_path: string
          file_size: number | null
          file_type: string | null
          id: string
          name: string
          updated_at: string
          uploader_id: string
        }
        Insert: {
          bucket_name: string
          created_at?: string
          file_path: string
          file_size?: number | null
          file_type?: string | null
          id?: string
          name: string
          updated_at?: string
          uploader_id: string
        }
        Update: {
          bucket_name?: string
          created_at?: string
          file_path?: string
          file_size?: number | null
          file_type?: string | null
          id?: string
          name?: string
          updated_at?: string
          uploader_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "files_uploader_id_fkey"
            columns: ["uploader_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      group_members: {
        Row: {
          group_id: string
          id: string
          joined_at: string
          role: string | null
          user_id: string
        }
        Insert: {
          group_id: string
          id?: string
          joined_at?: string
          role?: string | null
          user_id: string
        }
        Update: {
          group_id?: string
          id?: string
          joined_at?: string
          role?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_members_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      groups: {
        Row: {
          cover_url: string | null
          created_at: string
          description: string | null
          id: string
          member_count: number
          name: string
          type: Database["public"]["Enums"]["group_type"]
          updated_at: string
        }
        Insert: {
          cover_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          member_count?: number
          name: string
          type?: Database["public"]["Enums"]["group_type"]
          updated_at?: string
        }
        Update: {
          cover_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          member_count?: number
          name?: string
          type?: Database["public"]["Enums"]["group_type"]
          updated_at?: string
        }
        Relationships: []
      }
      lessons: {
        Row: {
          content: string | null
          created_at: string
          duration_seconds: number | null
          id: string
          is_preview: boolean | null
          lesson_type: Database["public"]["Enums"]["lesson_type"]
          module_id: string
          order_index: number
          title: string
          updated_at: string
          video_url: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          duration_seconds?: number | null
          id?: string
          is_preview?: boolean | null
          lesson_type?: Database["public"]["Enums"]["lesson_type"]
          module_id: string
          order_index: number
          title: string
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string
          duration_seconds?: number | null
          id?: string
          is_preview?: boolean | null
          lesson_type?: Database["public"]["Enums"]["lesson_type"]
          module_id?: string
          order_index?: number
          title?: string
          updated_at?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lessons_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          created_at: string
          file_url: string | null
          group_id: string | null
          id: string
          is_read: boolean | null
          recipient_id: string | null
          sender_id: string
          type: Database["public"]["Enums"]["message_type"]
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          file_url?: string | null
          group_id?: string | null
          id?: string
          is_read?: boolean | null
          recipient_id?: string | null
          sender_id: string
          type?: Database["public"]["Enums"]["message_type"]
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          file_url?: string | null
          group_id?: string | null
          id?: string
          is_read?: boolean | null
          recipient_id?: string | null
          sender_id?: string
          type?: Database["public"]["Enums"]["message_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      modules: {
        Row: {
          course_id: string
          created_at: string
          description: string | null
          id: string
          order_index: number
          title: string
          updated_at: string
        }
        Insert: {
          course_id: string
          created_at?: string
          description?: string | null
          id?: string
          order_index: number
          title: string
          updated_at?: string
        }
        Update: {
          course_id?: string
          created_at?: string
          description?: string | null
          id?: string
          order_index?: number
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "modules_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      museum_entries: {
        Row: {
          created_at: string
          description: string | null
          id: string
          image_url: string
          is_public: boolean | null
          mentor_id: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          image_url: string
          is_public?: boolean | null
          mentor_id: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string
          is_public?: boolean | null
          mentor_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "museum_entries_mentor_id_fkey"
            columns: ["mentor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          content: string
          created_at: string
          id: string
          is_read: boolean | null
          link: string | null
          title: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          link?: string | null
          title: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          link?: string | null
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_methods_config: {
        Row: {
          account_holder: string
          account_number: string
          created_at: string
          currency: string
          display_name: string
          display_order: number
          icon_name: string | null
          id: string
          instructions: string | null
          is_active: boolean
          method_key: string
          network: string | null
          updated_at: string
        }
        Insert: {
          account_holder: string
          account_number: string
          created_at?: string
          currency?: string
          display_name: string
          display_order?: number
          icon_name?: string | null
          id?: string
          instructions?: string | null
          is_active?: boolean
          method_key: string
          network?: string | null
          updated_at?: string
        }
        Update: {
          account_holder?: string
          account_number?: string
          created_at?: string
          currency?: string
          display_name?: string
          display_order?: number
          icon_name?: string | null
          id?: string
          instructions?: string | null
          is_active?: boolean
          method_key?: string
          network?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          admin_notes: string | null
          amount: number
          approved_at: string | null
          approved_by: string | null
          created_at: string
          currency: string
          id: string
          paid_at: string | null
          payment_method: string | null
          payment_method_id: string | null
          plan_type: string | null
          proof_file_path: string | null
          proof_uploaded_at: string | null
          rejection_reason: string | null
          status: Database["public"]["Enums"]["payment_status"]
          subscription_id: string | null
          transaction_ref: string | null
          updated_at: string
          user_id: string
          user_notes: string | null
        }
        Insert: {
          admin_notes?: string | null
          amount: number
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          currency?: string
          id?: string
          paid_at?: string | null
          payment_method?: string | null
          payment_method_id?: string | null
          plan_type?: string | null
          proof_file_path?: string | null
          proof_uploaded_at?: string | null
          rejection_reason?: string | null
          status?: Database["public"]["Enums"]["payment_status"]
          subscription_id?: string | null
          transaction_ref?: string | null
          updated_at?: string
          user_id: string
          user_notes?: string | null
        }
        Update: {
          admin_notes?: string | null
          amount?: number
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          currency?: string
          id?: string
          paid_at?: string | null
          payment_method?: string | null
          payment_method_id?: string | null
          plan_type?: string | null
          proof_file_path?: string | null
          proof_uploaded_at?: string | null
          rejection_reason?: string | null
          status?: Database["public"]["Enums"]["payment_status"]
          subscription_id?: string | null
          transaction_ref?: string | null
          updated_at?: string
          user_id?: string
          user_notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_payment_method_id_fkey"
            columns: ["payment_method_id"]
            isOneToOne: false
            referencedRelation: "payment_methods_config"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          badge_color: string | null
          badge_text: string | null
          created_at: string
          description: string | null
          display_order: number
          duration_days: number
          features: Json | null
          id: string
          is_active: boolean
          is_featured: boolean
          name: string
          plan_type: Database["public"]["Enums"]["subscription_plan"]
          price_mzn: number | null
          price_usd: number | null
          updated_at: string
        }
        Insert: {
          badge_color?: string | null
          badge_text?: string | null
          created_at?: string
          description?: string | null
          display_order?: number
          duration_days: number
          features?: Json | null
          id?: string
          is_active?: boolean
          is_featured?: boolean
          name: string
          plan_type: Database["public"]["Enums"]["subscription_plan"]
          price_mzn?: number | null
          price_usd?: number | null
          updated_at?: string
        }
        Update: {
          badge_color?: string | null
          badge_text?: string | null
          created_at?: string
          description?: string | null
          display_order?: number
          duration_days?: number
          features?: Json | null
          id?: string
          is_active?: boolean
          is_featured?: boolean
          name?: string
          plan_type?: Database["public"]["Enums"]["subscription_plan"]
          price_mzn?: number | null
          price_usd?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          country: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          phone: string | null
          role: string
          status: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          country?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          phone?: string | null
          role?: string
          status?: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          country?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          role?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      signal_reads: {
        Row: {
          id: string
          read_at: string
          signal_id: string
          user_id: string
        }
        Insert: {
          id?: string
          read_at?: string
          signal_id: string
          user_id: string
        }
        Update: {
          id?: string
          read_at?: string
          signal_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "signal_reads_signal_id_fkey"
            columns: ["signal_id"]
            isOneToOne: false
            referencedRelation: "signals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "signal_reads_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      signals: {
        Row: {
          analysis_text: string | null
          chart_url: string | null
          closed_at: string | null
          created_at: string
          direction: Database["public"]["Enums"]["signal_direction"]
          entry_price: string | null
          id: string
          mentor_id: string
          pair: string
          pips_gained: number | null
          published_at: string | null
          result: Database["public"]["Enums"]["signal_result"]
          state: Database["public"]["Enums"]["signal_state"]
          stop_loss: string | null
          take_profit: string | null
          updated_at: string
        }
        Insert: {
          analysis_text?: string | null
          chart_url?: string | null
          closed_at?: string | null
          created_at?: string
          direction: Database["public"]["Enums"]["signal_direction"]
          entry_price?: string | null
          id?: string
          mentor_id: string
          pair: string
          pips_gained?: number | null
          published_at?: string | null
          result?: Database["public"]["Enums"]["signal_result"]
          state?: Database["public"]["Enums"]["signal_state"]
          stop_loss?: string | null
          take_profit?: string | null
          updated_at?: string
        }
        Update: {
          analysis_text?: string | null
          chart_url?: string | null
          closed_at?: string | null
          created_at?: string
          direction?: Database["public"]["Enums"]["signal_direction"]
          entry_price?: string | null
          id?: string
          mentor_id?: string
          pair?: string
          pips_gained?: number | null
          published_at?: string | null
          result?: Database["public"]["Enums"]["signal_result"]
          state?: Database["public"]["Enums"]["signal_state"]
          stop_loss?: string | null
          take_profit?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "signals_mentor_id_fkey"
            columns: ["mentor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          cancel_at_period_end: boolean | null
          created_at: string
          expires_at: string | null
          id: string
          plan_type: Database["public"]["Enums"]["subscription_plan"]
          starts_at: string | null
          status: Database["public"]["Enums"]["subscription_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          cancel_at_period_end?: boolean | null
          created_at?: string
          expires_at?: string | null
          id?: string
          plan_type: Database["public"]["Enums"]["subscription_plan"]
          starts_at?: string | null
          status?: Database["public"]["Enums"]["subscription_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          cancel_at_period_end?: boolean | null
          created_at?: string
          expires_at?: string | null
          id?: string
          plan_type?: Database["public"]["Enums"]["subscription_plan"]
          starts_at?: string | null
          status?: Database["public"]["Enums"]["subscription_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      trading_journal: {
        Row: {
          chart_url: string | null
          created_at: string
          entry_price: string | null
          exit_price: string | null
          id: string
          lot_size: string | null
          notes: string | null
          pair: string
          profit_loss: number | null
          result: Database["public"]["Enums"]["trade_result"] | null
          stop_loss: string | null
          take_profit: string | null
          trade_date: string
          type: Database["public"]["Enums"]["trade_type"]
          updated_at: string
          user_id: string
        }
        Insert: {
          chart_url?: string | null
          created_at?: string
          entry_price?: string | null
          exit_price?: string | null
          id?: string
          lot_size?: string | null
          notes?: string | null
          pair: string
          profit_loss?: number | null
          result?: Database["public"]["Enums"]["trade_result"] | null
          stop_loss?: string | null
          take_profit?: string | null
          trade_date?: string
          type: Database["public"]["Enums"]["trade_type"]
          updated_at?: string
          user_id: string
        }
        Update: {
          chart_url?: string | null
          created_at?: string
          entry_price?: string | null
          exit_price?: string | null
          id?: string
          lot_size?: string | null
          notes?: string | null
          pair?: string
          profit_loss?: number | null
          result?: Database["public"]["Enums"]["trade_result"] | null
          stop_loss?: string | null
          take_profit?: string | null
          trade_date?: string
          type?: Database["public"]["Enums"]["trade_type"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "trading_journal_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_active_sub: { Args: { p_plan: string }; Returns: boolean }
      increment_ai_usage: {
        Args: { p_date: string; p_user_id: string }
        Returns: undefined
      }
      is_admin: { Args: never; Returns: boolean }
      is_mentor: { Args: never; Returns: boolean }
      is_signals_active: { Args: never; Returns: boolean }
      is_student_active: { Args: never; Returns: boolean }
    }
    Enums: {
      ai_message_role: "user" | "assistant" | "system"
      booking_state:
        | "available"
        | "reserved"
        | "confirmed"
        | "completed"
        | "cancelled"
      broadcast_priority: "normal" | "high" | "urgent"
      broadcast_target:
        | "all"
        | "students"
        | "signals_members"
        | "premium"
        | "group"
      broadcast_type:
        | "signal_buy"
        | "signal_sell"
        | "alert"
        | "news"
        | "video"
        | "audio"
        | "text"
      course_visibility: "public" | "private" | "premium"
      event_state: "upcoming" | "live" | "finished" | "cancelled"
      event_type: "challenge" | "campaign" | "session" | "webinar"
      group_type:
        | "course_group"
        | "signals_group"
        | "mentorship_group"
        | "custom"
      lesson_type: "video" | "pdf" | "audio" | "podcast" | "text" | "image"
      mentorship_type: "ONE_TO_ONE" | "GROUP_SESSION"
      message_type: "text" | "image" | "file"
      notification_status:
        | "queued"
        | "sending"
        | "sent"
        | "failed"
        | "cancelled"
      notification_type:
        | "payment_pending"
        | "payment_approved"
        | "payment_rejected"
        | "subscription_expiring"
        | "subscription_expired"
        | "new_user"
        | "new_booking"
        | "system_alert"
      payment_status: "pending" | "paid" | "failed" | "refunded" | "cancelled"
      signal_direction: "BUY" | "SELL"
      signal_result: "win" | "loss" | "breakeven" | "pending"
      signal_state: "draft" | "published" | "active" | "closed" | "archived"
      subscription_plan:
        | "FREE"
        | "POWER_OF_THREE"
        | "SIGNALS_ROOM"
        | "MENTORSHIP"
        | "PREMIUM_ALL_ACCESS"
        | "SIGNALS_BASIC"
        | "SIGNALS_PLATINUM"
        | "SIGNALS_PREMIUM"
      subscription_status:
        | "inactive"
        | "pending_payment"
        | "active"
        | "grace_period"
        | "expired"
        | "cancelled"
      trade_result: "win" | "loss" | "breakeven"
      trade_type: "buy" | "sell"
      user_role:
        | "guest"
        | "student"
        | "signals_member"
        | "mentor"
        | "admin"
        | "super_admin"
      user_status: "active" | "blocked" | "pending" | "deleted"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      ai_message_role: ["user", "assistant", "system"],
      booking_state: [
        "available",
        "reserved",
        "confirmed",
        "completed",
        "cancelled",
      ],
      broadcast_priority: ["normal", "high", "urgent"],
      broadcast_target: [
        "all",
        "students",
        "signals_members",
        "premium",
        "group",
      ],
      broadcast_type: [
        "signal_buy",
        "signal_sell",
        "alert",
        "news",
        "video",
        "audio",
        "text",
      ],
      course_visibility: ["public", "private", "premium"],
      event_state: ["upcoming", "live", "finished", "cancelled"],
      event_type: ["challenge", "campaign", "session", "webinar"],
      group_type: [
        "course_group",
        "signals_group",
        "mentorship_group",
        "custom",
      ],
      lesson_type: ["video", "pdf", "audio", "podcast", "text", "image"],
      mentorship_type: ["ONE_TO_ONE", "GROUP_SESSION"],
      message_type: ["text", "image", "file"],
      notification_status: ["queued", "sending", "sent", "failed", "cancelled"],
      notification_type: [
        "payment_pending",
        "payment_approved",
        "payment_rejected",
        "subscription_expiring",
        "subscription_expired",
        "new_user",
        "new_booking",
        "system_alert",
      ],
      payment_status: ["pending", "paid", "failed", "refunded", "cancelled"],
      signal_direction: ["BUY", "SELL"],
      signal_result: ["win", "loss", "breakeven", "pending"],
      signal_state: ["draft", "published", "active", "closed", "archived"],
      subscription_plan: [
        "FREE",
        "POWER_OF_THREE",
        "SIGNALS_ROOM",
        "MENTORSHIP",
        "PREMIUM_ALL_ACCESS",
        "SIGNALS_BASIC",
        "SIGNALS_PLATINUM",
        "SIGNALS_PREMIUM",
      ],
      subscription_status: [
        "inactive",
        "pending_payment",
        "active",
        "grace_period",
        "expired",
        "cancelled",
      ],
      trade_result: ["win", "loss", "breakeven"],
      trade_type: ["buy", "sell"],
      user_role: [
        "guest",
        "student",
        "signals_member",
        "mentor",
        "admin",
        "super_admin",
      ],
      user_status: ["active", "blocked", "pending", "deleted"],
    },
  },
} as const
