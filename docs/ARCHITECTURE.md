# Architecture Overview — Money Makers Academy

The Money Makers Academy platform is built with a modern, scalable architecture leveraging React on the frontend and Supabase as a comprehensive Backend-as-a-Service (BaaS).

## System Components

| Component | Technology | Responsibility |
| :--- | :--- | :--- |
| **Frontend** | React + Vite | User interface, state management, and client-side routing. |
| **Authentication** | Supabase Auth | User registration, login, and JWT management. |
| **Database** | Supabase Postgres | Relational data storage with Row Level Security (RLS). |
| **Storage** | Supabase Storage | File hosting for avatars, course materials, and trade charts. |
| **Edge Functions** | Deno (Supabase) | Serverless logic for AI chat, payments, and scheduled tasks. |
| **Realtime** | Supabase Realtime | Live updates for messaging and notifications. |

## Data Flow

1.  **Authentication**: Users authenticate via Supabase Auth. A Postgres trigger automatically creates a corresponding entry in the `profiles` table.
2.  **Service Layer**: The frontend communicates with Supabase through a dedicated service layer in `src/services/`, which uses the typed Supabase client.
3.  **Security**: All database access is governed by RLS policies, ensuring users can only access data they are authorized to see based on their role and subscription status.
4.  **AI Integration**: The AI chat feature calls a Supabase Edge Function, which validates the user's rate limits before proxying the request to the Gemini 2.5 Flash API.
5.  **Subscriptions**: Subscriptions are managed in the `subscriptions` table. State transitions (e.g., activation) trigger role updates and group memberships automatically via database triggers.

## Key Design Decisions

- **Manual Payments MVP**: For the initial launch, payments are confirmed manually by an admin, which then activates the user's subscription.
- **Role Promotion**: User roles are dynamic and tied to active subscriptions, allowing for automatic feature gating.
- **External Video Hosting**: While materials are stored in Supabase, primary course videos are hosted on Google Drive to optimize storage costs.
