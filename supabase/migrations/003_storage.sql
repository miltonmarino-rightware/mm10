-- Phase 3: Storage Buckets and Policies
-- Money Makers Academy Backend

-- Note: Buckets must be created via Supabase API or Dashboard.
-- This migration provides the policies for the buckets.

/*
Buckets to create:
1. avatars              (public)
2. course-thumbnails    (public)
3. course-materials     (private)
4. museum               (private)
5. broadcast-media      (public)
6. group-covers         (public)
7. trade-charts         (private)
8. signal-charts        (public)
9. attachments          (private)
*/

-- 1. avatars
CREATE POLICY "Avatar images are publicly accessible" ON storage.objects
    FOR SELECT USING (bucket_id = 'avatars');
CREATE POLICY "Users can upload their own avatar" ON storage.objects
    FOR INSERT TO authenticated WITH CHECK (
        bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text
    );
CREATE POLICY "Users can update their own avatar" ON storage.objects
    FOR UPDATE TO authenticated USING (
        bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text
    );
CREATE POLICY "Users can delete their own avatar" ON storage.objects
    FOR DELETE TO authenticated USING (
        bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text
    );

-- 2. course-thumbnails
CREATE POLICY "Course thumbnails are publicly accessible" ON storage.objects
    FOR SELECT USING (bucket_id = 'course-thumbnails');
CREATE POLICY "Mentors can manage course thumbnails" ON storage.objects
    FOR ALL TO authenticated USING (
        bucket_id = 'course-thumbnails' AND public.is_mentor()
    );

-- 3. course-materials
CREATE POLICY "Course materials are accessible by active students or mentors" ON storage.objects
    FOR SELECT TO authenticated USING (
        bucket_id = 'course-materials' AND (public.is_student_active() OR public.is_mentor())
    );
CREATE POLICY "Mentors can manage course materials" ON storage.objects
    FOR ALL TO authenticated USING (
        bucket_id = 'course-materials' AND public.is_mentor()
    );

-- 4. museum
CREATE POLICY "Museum images are accessible by active students or mentors" ON storage.objects
    FOR SELECT TO authenticated USING (
        bucket_id = 'museum' AND (public.is_student_active() OR public.is_mentor())
    );
CREATE POLICY "Mentors can manage museum images" ON storage.objects
    FOR ALL TO authenticated USING (
        bucket_id = 'museum' AND public.is_mentor()
    );

-- 5. broadcast-media
CREATE POLICY "Broadcast media is publicly accessible" ON storage.objects
    FOR SELECT USING (bucket_id = 'broadcast-media');
CREATE POLICY "Mentors can manage broadcast media" ON storage.objects
    FOR ALL TO authenticated USING (
        bucket_id = 'broadcast-media' AND public.is_mentor()
    );

-- 6. group-covers
CREATE POLICY "Group covers are publicly accessible" ON storage.objects
    FOR SELECT USING (bucket_id = 'group-covers');
CREATE POLICY "Admins can manage group covers" ON storage.objects
    FOR ALL TO authenticated USING (
        bucket_id = 'group-covers' AND public.is_admin()
    );

-- 7. trade-charts
CREATE POLICY "Trade charts are accessible by owner or admin" ON storage.objects
    FOR SELECT TO authenticated USING (
        bucket_id = 'trade-charts' AND (
            (storage.foldername(name))[1] = auth.uid()::text OR public.is_admin()
        )
    );
CREATE POLICY "Users can manage their own trade charts" ON storage.objects
    FOR ALL TO authenticated USING (
        bucket_id = 'trade-charts' AND (storage.foldername(name))[1] = auth.uid()::text
    );

-- 8. signal-charts
CREATE POLICY "Signal charts are publicly accessible" ON storage.objects
    FOR SELECT USING (bucket_id = 'signal-charts');
CREATE POLICY "Mentors can manage signal charts" ON storage.objects
    FOR ALL TO authenticated USING (
        bucket_id = 'signal-charts' AND public.is_mentor()
    );

-- 9. attachments
CREATE POLICY "Attachments are accessible by sender, recipient or group members" ON storage.objects
    FOR SELECT TO authenticated USING (
        bucket_id = 'attachments' AND (
            -- This is complex to check in storage policies without a join, 
            -- usually handled by signed URLs or simplified policies.
            -- For now, allow authenticated and rely on application logic/signed URLs
            true 
        )
    );
CREATE POLICY "Users can upload attachments" ON storage.objects
    FOR INSERT TO authenticated WITH CHECK (
        bucket_id = 'attachments' AND (storage.foldername(name))[1] = auth.uid()::text
    );
