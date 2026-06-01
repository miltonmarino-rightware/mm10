DROP POLICY IF EXISTS "Admins can manage products" ON public.products;
CREATE POLICY "Authenticated admins can manage products"
ON public.products
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can manage methods" ON public.payment_methods_config;
CREATE POLICY "Authenticated admins can manage methods"
ON public.payment_methods_config
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can view notifications" ON public.admin_notifications;
CREATE POLICY "Authenticated admins can view notifications"
ON public.admin_notifications
FOR SELECT
TO authenticated
USING (public.is_admin());