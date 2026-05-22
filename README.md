# Money Makers Academy Platform

Forex trading education platform in Mozambique.

## Backend Implementation

The backend is powered by Supabase. All infrastructure code is located in the `supabase/` directory.

### Quick Start

1.  **Clone the repo**
2.  **Install dependencies**: `npm install`
3.  **Setup Supabase**:
    - Create a new project at [supabase.com](https://supabase.com).
    - Apply migrations in `supabase/migrations/`.
    - Create storage buckets as listed in `docs/DEPLOYMENT.md`.
    - Deploy edge functions in `supabase/functions/`.
4.  **Configure Environment**:
    - Copy `.env.example` to `.env`.
    - Fill in `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.

### Documentation

- [Architecture](./docs/ARCHITECTURE.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)
- [Roles and Permissions](./docs/ROLES_AND_PERMISSIONS.md)

## Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS, shadcn/ui
- **Backend**: Supabase (Postgres, Auth, Storage, Edge Functions, Realtime)
- **AI**: Gemini 2.5 Flash via Supabase Edge Functions
