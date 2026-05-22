-- Phase 2: Row Level Security (RLS)
-- Money Makers Academy Backend

-- 1. Helper Functions
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN (
        SELECT role IN ('admin', 'super_admin')
        FROM public.profiles
        WHERE id = auth.uid()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.is_mentor()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN (
        SELECT role IN ('mentor', 'admin', 'super_admin')
        FROM public.profiles
        WHERE id = auth.uid()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.has_active_sub(p_plan subscription_plan)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.subscriptions
        WHERE user_id = auth.uid()
        AND plan_type = p_plan
        AND status = 'active'
        AND (expires_at IS NULL OR expires_at > NOW())
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.is_student_active()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN public.has_active_sub('POWER_OF_THREE') OR public.has_active_sub('PREMIUM_ALL_ACCESS');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.is_signals_active()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN public.has_active_sub('SIGNALS_ROOM') OR public.has_active_sub('PREMIUM_ALL_ACCESS');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.signals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.signal_reads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.broadcasts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.broadcast_reads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trading_journal ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.museum_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

-- 3. Policies

-- profiles
CREATE POLICY "Profiles are viewable by authenticated users" ON public.profiles
    FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "Admins can update any profile" ON public.profiles
    FOR UPDATE TO authenticated USING (public.is_admin());
CREATE POLICY "Admins can delete profiles" ON public.profiles
    FOR DELETE TO authenticated USING (public.is_admin());

-- courses
CREATE POLICY "Public courses are viewable by everyone" ON public.courses
    FOR SELECT USING (visibility = 'public' AND is_published = true);
CREATE POLICY "Premium courses are viewable by active students or mentors" ON public.courses
    FOR SELECT TO authenticated USING (
        (visibility = 'premium' AND (public.is_student_active() OR public.is_mentor()))
        OR (visibility = 'private' AND public.is_mentor())
    );
CREATE POLICY "Mentors can manage courses" ON public.courses
    FOR ALL TO authenticated USING (public.is_mentor());

-- lessons
CREATE POLICY "Lessons are viewable by those who can see the course" ON public.lessons
    FOR SELECT TO authenticated USING (
        EXISTS (
            SELECT 1 FROM public.modules m
            JOIN public.courses c ON m.course_id = c.id
            WHERE m.id = lessons.module_id
            AND (
                c.visibility = 'public' 
                OR public.is_student_active() 
                OR public.is_mentor()
            )
        )
    );
CREATE POLICY "Mentors can manage lessons" ON public.lessons
    FOR ALL TO authenticated USING (public.is_mentor());

-- signals
CREATE POLICY "Signals are viewable by active signals members or mentors" ON public.signals
    FOR SELECT TO authenticated USING (public.is_signals_active() OR public.is_mentor());
CREATE POLICY "Mentors can manage signals" ON public.signals
    FOR ALL TO authenticated USING (public.is_mentor());

-- broadcasts
CREATE POLICY "Broadcasts are viewable based on target" ON public.broadcasts
    FOR SELECT TO authenticated USING (
        target = 'all'
        OR (target = 'students' AND public.is_student_active())
        OR (target = 'signals_members' AND public.is_signals_active())
        OR (target = 'premium' AND (public.is_student_active() OR public.is_signals_active()))
        OR (target = 'group' AND EXISTS (SELECT 1 FROM public.group_members WHERE group_id = broadcasts.target_group_id AND user_id = auth.uid()))
        OR public.is_mentor()
    );
CREATE POLICY "Mentors can manage broadcasts" ON public.broadcasts
    FOR ALL TO authenticated USING (public.is_mentor());

-- groups
CREATE POLICY "Groups are viewable by members or admins" ON public.groups
    FOR SELECT TO authenticated USING (
        EXISTS (SELECT 1 FROM public.group_members WHERE group_id = groups.id AND user_id = auth.uid())
        OR public.is_admin()
    );
CREATE POLICY "Admins can manage groups" ON public.groups
    FOR ALL TO authenticated USING (public.is_admin());

-- group_members
CREATE POLICY "Group members are viewable by same-group members or admins" ON public.group_members
    FOR SELECT TO authenticated USING (
        EXISTS (SELECT 1 FROM public.group_members gm WHERE gm.group_id = group_members.group_id AND gm.user_id = auth.uid())
        OR public.is_admin()
    );
CREATE POLICY "Admins can manage group members" ON public.group_members
    FOR ALL TO authenticated USING (public.is_admin());
CREATE POLICY "Users can leave groups" ON public.group_members
    FOR DELETE TO authenticated USING (user_id = auth.uid());

-- messages
CREATE POLICY "Users can see their own messages" ON public.messages
    FOR SELECT TO authenticated USING (
        sender_id = auth.uid() 
        OR recipient_id = auth.uid()
        OR (group_id IS NOT NULL AND EXISTS (SELECT 1 FROM public.group_members WHERE group_id = messages.group_id AND user_id = auth.uid()))
    );
CREATE POLICY "Users can insert messages" ON public.messages
    FOR INSERT TO authenticated WITH CHECK (sender_id = auth.uid());
CREATE POLICY "Recipients can mark messages as read" ON public.messages
    FOR UPDATE TO authenticated USING (recipient_id = auth.uid()) WITH CHECK (recipient_id = auth.uid());

-- trading_journal
CREATE POLICY "Users can manage own trading journal" ON public.trading_journal
    FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "Admins can view all trading journals" ON public.trading_journal
    FOR SELECT TO authenticated USING (public.is_admin());

-- booking_slots
CREATE POLICY "Booking slots are viewable by authenticated users" ON public.booking_slots
    FOR SELECT TO authenticated USING (true);
CREATE POLICY "Mentors can manage booking slots" ON public.booking_slots
    FOR ALL TO authenticated USING (public.is_mentor());

-- bookings
CREATE POLICY "Users can see own bookings" ON public.bookings
    FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.is_admin());
CREATE POLICY "Users can insert bookings" ON public.bookings
    FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "Admins can update booking state" ON public.bookings
    FOR UPDATE TO authenticated USING (public.is_admin());
CREATE POLICY "Owners can cancel bookings" ON public.bookings
    FOR UPDATE TO authenticated USING (user_id = auth.uid()) WITH CHECK (status = 'cancelled');

-- museum_entries
CREATE POLICY "Museum entries are viewable by active students or mentors" ON public.museum_entries
    FOR SELECT TO authenticated USING (
        is_public = true 
        OR public.is_student_active() 
        OR public.is_mentor()
    );
CREATE POLICY "Mentors can manage museum entries" ON public.museum_entries
    FOR ALL TO authenticated USING (public.is_mentor());

-- events
CREATE POLICY "Events are viewable by authenticated users" ON public.events
    FOR SELECT TO authenticated USING (true);
CREATE POLICY "Mentors can manage events" ON public.events
    FOR ALL TO authenticated USING (public.is_mentor());

-- event_participants
CREATE POLICY "Event participants are viewable by authenticated users" ON public.event_participants
    FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can join events" ON public.event_participants
    FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

-- ai_sessions, ai_messages, ai_usage
CREATE POLICY "Users can manage own AI data" ON public.ai_sessions
    FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can manage own AI messages" ON public.ai_messages
    FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM public.ai_sessions WHERE id = ai_messages.session_id AND user_id = auth.uid()));
CREATE POLICY "Users can view own AI usage" ON public.ai_usage
    FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Admins can view all AI data" ON public.ai_sessions FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "Admins can view all AI messages" ON public.ai_messages FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "Admins can view all AI usage" ON public.ai_usage FOR SELECT TO authenticated USING (public.is_admin());

-- notifications
CREATE POLICY "Users can manage own notifications" ON public.notifications
    FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- files
CREATE POLICY "Files are viewable based on bucket" ON public.files
    FOR SELECT TO authenticated USING (true); -- Simplified, bucket policies handle actual storage access
CREATE POLICY "Users can upload files" ON public.files
    FOR INSERT TO authenticated WITH CHECK (uploader_id = auth.uid());

-- payments, subscriptions
CREATE POLICY "Users can see own payments and subscriptions" ON public.payments
    FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.is_admin());
CREATE POLICY "Users can see own subscriptions" ON public.subscriptions
    FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.is_admin());
CREATE POLICY "Admins can manage payments and subscriptions" ON public.payments
    FOR ALL TO authenticated USING (public.is_admin());
CREATE POLICY "Admins can manage subscriptions" ON public.subscriptions
    FOR ALL TO authenticated USING (public.is_admin());

-- audit_log
CREATE POLICY "Admins can view audit log" ON public.audit_log
    FOR SELECT TO authenticated USING (public.is_admin());
