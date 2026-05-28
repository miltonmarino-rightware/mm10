
-- =========================================================
-- 1. PROFILES: prevent role/status escalation via trigger
-- =========================================================
CREATE OR REPLACE FUNCTION public.prevent_profile_privilege_escalation()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.role IS DISTINCT FROM OLD.role OR NEW.status IS DISTINCT FROM OLD.status THEN
    IF NOT public.is_admin() THEN
      NEW.role := OLD.role;
      NEW.status := OLD.status;
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_prevent_profile_privilege_escalation ON public.profiles;
CREATE TRIGGER trg_prevent_profile_privilege_escalation
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.prevent_profile_privilege_escalation();

-- =========================================================
-- 2. PROFILES: restrict SELECT to own row or admin
-- =========================================================
DROP POLICY IF EXISTS "Profiles are viewable by authenticated users" ON public.profiles;
CREATE POLICY "Users can view own profile or admins all"
ON public.profiles FOR SELECT TO authenticated
USING (auth.uid() = id OR public.is_admin());

-- Safe view for cross-user listings (joins, member lists, message threads)
CREATE OR REPLACE VIEW public.public_profiles
WITH (security_invoker = true) AS
SELECT id, full_name, avatar_url, role, country, bio, created_at
FROM public.profiles;

GRANT SELECT ON public.public_profiles TO authenticated, anon;

-- Allow authenticated users to read the safe view rows (bypasses row policy via column scope)
DROP POLICY IF EXISTS "Public profile fields visible to authenticated" ON public.profiles;
CREATE POLICY "Public profile fields visible to authenticated"
ON public.profiles FOR SELECT TO authenticated
USING (true);
-- Note: the broader SELECT remains; sensitive columns are protected by column GRANTs below.

REVOKE SELECT ON public.profiles FROM authenticated, anon;
GRANT SELECT (id, full_name, avatar_url, role, country, bio, status, created_at, updated_at)
  ON public.profiles TO authenticated;
GRANT SELECT (id, email, phone, full_name, avatar_url, role, country, bio, status, created_at, updated_at)
  ON public.profiles TO service_role;
-- Owners need their own email/phone: expose via RPC
CREATE OR REPLACE FUNCTION public.get_my_profile()
RETURNS public.profiles
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT * FROM public.profiles WHERE id = auth.uid(); $$;
REVOKE EXECUTE ON FUNCTION public.get_my_profile() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_my_profile() TO authenticated;

-- =========================================================
-- 3. PAYMENTS
-- =========================================================
GRANT SELECT, INSERT ON public.payments TO authenticated;
GRANT ALL ON public.payments TO service_role;

CREATE POLICY "Users view own payments"
ON public.payments FOR SELECT TO authenticated
USING (user_id = auth.uid() OR public.is_admin());

CREATE POLICY "Users create own payments"
ON public.payments FOR INSERT TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins manage payments"
ON public.payments FOR UPDATE TO authenticated
USING (public.is_admin()) WITH CHECK (public.is_admin());

-- =========================================================
-- 4. SUBSCRIPTIONS
-- =========================================================
GRANT SELECT ON public.subscriptions TO authenticated;
GRANT ALL ON public.subscriptions TO service_role;

CREATE POLICY "Users view own subscriptions"
ON public.subscriptions FOR SELECT TO authenticated
USING (user_id = auth.uid() OR public.is_admin());

CREATE POLICY "Admins manage subscriptions"
ON public.subscriptions FOR ALL TO authenticated
USING (public.is_admin()) WITH CHECK (public.is_admin());

-- =========================================================
-- 5. BOOKINGS
-- =========================================================
CREATE POLICY "Users view own bookings"
ON public.bookings FOR SELECT TO authenticated
USING (user_id = auth.uid() OR public.is_admin());

-- =========================================================
-- 6. BOOKING PARTICIPANTS
-- =========================================================
GRANT SELECT, INSERT, DELETE ON public.booking_participants TO authenticated;
GRANT ALL ON public.booking_participants TO service_role;

CREATE POLICY "Users view own participations"
ON public.booking_participants FOR SELECT TO authenticated
USING (user_id = auth.uid() OR public.is_admin());

CREATE POLICY "Users add own participation"
ON public.booking_participants FOR INSERT TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users remove own participation"
ON public.booking_participants FOR DELETE TO authenticated
USING (user_id = auth.uid());

-- =========================================================
-- 7. AUDIT LOG (admin-only read)
-- =========================================================
GRANT SELECT ON public.audit_log TO authenticated;
GRANT ALL ON public.audit_log TO service_role;

CREATE POLICY "Admins read audit log"
ON public.audit_log FOR SELECT TO authenticated
USING (public.is_admin());

-- =========================================================
-- 8. EVENT PARTICIPANTS: restrict to own / admin
-- =========================================================
DROP POLICY IF EXISTS "Event participants are viewable by authenticated users" ON public.event_participants;
CREATE POLICY "Users view own event participation"
ON public.event_participants FOR SELECT TO authenticated
USING (user_id = auth.uid() OR public.is_admin());

-- =========================================================
-- 9. FILES: restrict to uploader / admin
-- =========================================================
DROP POLICY IF EXISTS "Files are viewable based on bucket" ON public.files;
CREATE POLICY "Users view own files"
ON public.files FOR SELECT TO authenticated
USING (uploader_id = auth.uid() OR public.is_admin());

-- =========================================================
-- 10. GROUP MEMBERS: select policy
-- =========================================================
GRANT SELECT, INSERT ON public.group_members TO authenticated;
GRANT ALL ON public.group_members TO service_role;

CREATE POLICY "Users view memberships of their groups"
ON public.group_members FOR SELECT TO authenticated
USING (
  user_id = auth.uid()
  OR public.is_admin()
  OR EXISTS (
    SELECT 1 FROM public.group_members gm
    WHERE gm.group_id = group_members.group_id AND gm.user_id = auth.uid()
  )
);

-- =========================================================
-- 11. STORAGE POLICIES (folder = auth.uid())
-- =========================================================

-- attachments: replace broad SELECT
DO $$
BEGIN
  EXECUTE 'DROP POLICY IF EXISTS "Attachments viewable by authenticated" ON storage.objects';
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

CREATE POLICY "attachments_owner_select"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'attachments' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "attachments_owner_insert"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'attachments' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "attachments_owner_delete"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'attachments' AND auth.uid()::text = (storage.foldername(name))[1]);

-- course-materials: authenticated read, admin write
CREATE POLICY "course_materials_auth_read"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'course-materials');

CREATE POLICY "course_materials_admin_write"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'course-materials' AND public.is_admin());

CREATE POLICY "course_materials_admin_update"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'course-materials' AND public.is_admin());

CREATE POLICY "course_materials_admin_delete"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'course-materials' AND public.is_admin());

-- museum: authenticated read, admin write
CREATE POLICY "museum_auth_read"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'museum');

CREATE POLICY "museum_admin_write"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'museum' AND public.is_admin());

CREATE POLICY "museum_admin_update"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'museum' AND public.is_admin());

CREATE POLICY "museum_admin_delete"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'museum' AND public.is_admin());

-- =========================================================
-- 12. FUNCTION SEARCH_PATH + revoke anon EXECUTE
-- =========================================================
ALTER FUNCTION public.handle_subscription_activation() SET search_path = public;
ALTER FUNCTION public.handle_subscription_expiration() SET search_path = public;
ALTER FUNCTION public.update_group_member_count() SET search_path = public;
ALTER FUNCTION public.increment_ai_usage(uuid, date) SET search_path = public;
ALTER FUNCTION public.handle_signal_state_change() SET search_path = public;
ALTER FUNCTION public.is_admin() SET search_path = public;
ALTER FUNCTION public.is_mentor() SET search_path = public;
ALTER FUNCTION public.has_active_sub(text) SET search_path = public;
ALTER FUNCTION public.is_student_active() SET search_path = public;
ALTER FUNCTION public.handle_new_user() SET search_path = public;
ALTER FUNCTION public.update_updated_at_column() SET search_path = public;

REVOKE EXECUTE ON FUNCTION public.is_admin() FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.is_mentor() FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.has_active_sub(text) FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.is_student_active() FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.is_signals_active() FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.increment_ai_usage(uuid, date) FROM anon, public;

GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_mentor() TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_active_sub(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_student_active() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_signals_active() TO authenticated;
GRANT EXECUTE ON FUNCTION public.increment_ai_usage(uuid, date) TO authenticated;
