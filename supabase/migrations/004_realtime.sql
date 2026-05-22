-- Phase 6: Realtime Configuration
-- Money Makers Academy Backend

-- Enable Realtime for specific tables
-- This is done by adding the tables to the 'supabase_realtime' publication

-- First, check if the publication exists, if not create it (though Supabase usually has it)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
        CREATE PUBLICATION supabase_realtime;
    END IF;
END $$;

-- Add tables to the publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE public.signals;
ALTER PUBLICATION supabase_realtime ADD TABLE public.broadcasts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.group_members;
ALTER PUBLICATION supabase_realtime ADD TABLE public.booking_slots;
