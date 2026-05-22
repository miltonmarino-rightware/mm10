# Deployment Guide — Money Makers Academy Backend

This document outlines the steps to deploy the backend infrastructure for the Money Makers Academy platform.

## 1. Database Migrations

Apply the migrations in the `supabase/migrations/` folder in order:

1.  `001_schema.sql`: Creates all tables, enums, and triggers.
2.  `002_rls.sql`: Enables Row Level Security and sets up access policies.
3.  `003_storage.sql`: Sets up storage policies for buckets.
4.  `004_realtime.sql`: Enables realtime for messages, notifications, etc.

You can apply these via the Supabase Dashboard SQL Editor or using the Supabase CLI:
```bash
supabase db push
```

## 2. Storage Buckets

The following buckets must be created manually in the Supabase Dashboard (Storage section) with the specified visibility:

| Bucket Name | Visibility | Max Size | Allowed MIME Types |
| :--- | :--- | :--- | :--- |
| `avatars` | Public | 2MB | `image/*` |
| `course-thumbnails` | Public | 5MB | `image/*` |
| `course-materials` | Private | 50MB | `pdf`, `audio/*` |
| `museum` | Private | 10MB | `image/*` |
| `broadcast-media` | Public | 10MB | `image/*`, `audio/*` |
| `group-covers` | Public | 5MB | `image/*` |
| `trade-charts` | Private | 5MB | `image/*` |
| `signal-charts` | Public | 5MB | `image/*` |
| `attachments` | Private | 20MB | Any |

## 3. Edge Functions

Deploy the edge functions located in `supabase/functions/`:

```bash
supabase functions deploy chat-ai
supabase functions deploy payment-webhook
supabase functions deploy cron-demote-expired
```

### Required Secrets

Set the following secrets in Supabase:

```bash
supabase secrets set GEMINI_API_KEY=your_gemini_api_key
```

## 4. Environment Variables

Ensure your frontend has the following variables in `.env`:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 5. Verification (Smoke Tests)

1.  **Auth**: Sign up a new user. Verify a row is created in `profiles`.
2.  **AI Chat**: Send a message to the AI. Verify it responds and usage is tracked.
3.  **Realtime**: Open two tabs and send a message in a group. Verify it appears instantly.
4.  **RLS**: Try to access a premium course with a 'student' role but no active subscription. It should be blocked.
