
-- 1. Profiles: drop overly permissive SELECT
DROP POLICY IF EXISTS "Public profile fields visible to authenticated" ON public.profiles;

-- 2. payment_methods_config: restrict reads to authenticated users
DROP POLICY IF EXISTS "Anyone can read active methods" ON public.payment_methods_config;
CREATE POLICY "Authenticated can read active methods"
  ON public.payment_methods_config FOR SELECT
  TO authenticated
  USING (is_active = true);

-- 3. Storage: attachments - drop the always-true SELECT policy
DROP POLICY IF EXISTS "Attachments are accessible by sender, recipient or group member" ON storage.objects;

-- 4. Storage: course-materials - require active student/premium subscription
DROP POLICY IF EXISTS "course_materials_auth_read" ON storage.objects;
CREATE POLICY "course_materials_subscribed_read"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'course-materials'
    AND (is_admin() OR is_mentor() OR is_student_active())
  );

-- 5. Storage: museum - restrict to admins/mentors
DROP POLICY IF EXISTS "museum_auth_read" ON storage.objects;
CREATE POLICY "museum_admin_mentor_read"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'museum'
    AND (is_admin() OR is_mentor())
  );

-- 6. signals: SELECT only for active signals subscribers / admin / mentor
CREATE POLICY "Signals visible to subscribers"
  ON public.signals FOR SELECT
  TO authenticated
  USING (is_admin() OR is_mentor() OR is_signals_active());

CREATE POLICY "Mentors manage signals"
  ON public.signals FOR ALL
  TO authenticated
  USING (is_admin() OR is_mentor())
  WITH CHECK (is_admin() OR is_mentor());

-- 7. broadcasts: SELECT by target audience
CREATE POLICY "Broadcasts visible by target"
  ON public.broadcasts FOR SELECT
  TO authenticated
  USING (
    is_admin()
    OR target = 'all'
    OR (target_group_id IS NOT NULL AND EXISTS (
      SELECT 1 FROM public.group_members gm
      WHERE gm.group_id = broadcasts.target_group_id
        AND gm.user_id = auth.uid()
    ))
  );
CREATE POLICY "Admins manage broadcasts"
  ON public.broadcasts FOR ALL
  TO authenticated
  USING (is_admin() OR is_mentor())
  WITH CHECK (is_admin() OR is_mentor());

-- 8. broadcast_reads: user-scoped
CREATE POLICY "Users manage own broadcast reads"
  ON public.broadcast_reads FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- 9. signal_reads: user-scoped
CREATE POLICY "Users manage own signal reads"
  ON public.signal_reads FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- 10. groups: visible to authenticated; admins manage
CREATE POLICY "Groups visible to authenticated"
  ON public.groups FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins manage groups"
  ON public.groups FOR ALL TO authenticated
  USING (is_admin()) WITH CHECK (is_admin());

-- 11. modules: visible to authenticated (lesson gating is enforced at materials/UI level)
CREATE POLICY "Modules visible to authenticated"
  ON public.modules FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins manage modules"
  ON public.modules FOR ALL TO authenticated
  USING (is_admin()) WITH CHECK (is_admin());

-- 12. lessons: previews public to authed; full content needs subscription
CREATE POLICY "Lessons visible by access"
  ON public.lessons FOR SELECT TO authenticated
  USING (is_preview = true OR is_admin() OR is_mentor() OR is_student_active());
CREATE POLICY "Admins manage lessons"
  ON public.lessons FOR ALL TO authenticated
  USING (is_admin()) WITH CHECK (is_admin());

-- 13. course_progress: user-scoped
CREATE POLICY "Users manage own course progress"
  ON public.course_progress FOR ALL TO authenticated
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- 14. museum_entries: public entries visible; private only to admins/mentors
CREATE POLICY "Museum entries visible by visibility"
  ON public.museum_entries FOR SELECT TO authenticated
  USING (is_public = true OR is_admin() OR is_mentor() OR mentor_id = auth.uid());
CREATE POLICY "Admins manage museum entries"
  ON public.museum_entries FOR ALL TO authenticated
  USING (is_admin() OR is_mentor() OR mentor_id = auth.uid())
  WITH CHECK (is_admin() OR is_mentor() OR mentor_id = auth.uid());

-- 15. group_members: admins can insert/remove; users can self-leave (already exists)
CREATE POLICY "Admins manage group members"
  ON public.group_members FOR INSERT TO authenticated
  WITH CHECK (is_admin() OR user_id = auth.uid());

-- 16. Revoke EXECUTE on SECURITY DEFINER helper functions from anon
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM anon, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.is_mentor() FROM anon, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.is_student_active() FROM anon, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.is_signals_active() FROM anon, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.has_active_sub(text) FROM anon, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.get_my_profile() FROM anon, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.increment_ai_usage(uuid, date) FROM anon, PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_mentor() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_student_active() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_signals_active() TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_active_sub(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_my_profile() TO authenticated;
GRANT EXECUTE ON FUNCTION public.increment_ai_usage(uuid, date) TO authenticated;
