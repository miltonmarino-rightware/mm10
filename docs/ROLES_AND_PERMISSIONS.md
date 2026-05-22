# Roles and Permissions Matrix

The Money Makers Academy platform uses a role-based access control system implemented via Supabase Row Level Security (RLS).

## Roles

| Role | Description |
| :--- | :--- |
| `guest` | Unauthenticated or newly registered user with no subscription. |
| `student` | User with an active `POWER_OF_THREE` or `PREMIUM_ALL_ACCESS` subscription. |
| `signals_member` | User with an active `SIGNALS_ROOM` or `PREMIUM_ALL_ACCESS` subscription. |
| `mentor` | Content creator (Owen de Jesus). Can manage courses, signals, and broadcasts. |
| `admin` | Platform administrator. Inherits mentor capabilities + user management. |
| `super_admin` | Full system access. |

## Permissions Matrix

| Entity | Guest | Student | Signals Member | Mentor/Admin |
| :--- | :--- | :--- | :--- | :--- |
| **Profiles** | Read All | Read All | Read All | Read/Write All |
| **Courses (Public)** | Read | Read | Read | Read/Write |
| **Courses (Premium)** | No | Read | No | Read/Write |
| **Signals** | No | No | Read | Read/Write |
| **Broadcasts** | Read (All) | Read (Students) | Read (Signals) | Read/Write |
| **Groups** | No | Read (Joined) | Read (Joined) | Read/Write |
| **AI Chat** | 5 msgs total | Unlimited | Unlimited | Unlimited |
| **Trading Journal** | No | Own Only | Own Only | Own Only (Admin reads all) |
| **Museum** | Public Only | Read All | No | Read/Write |

## Subscription Plans

1.  **FREE**: Access to public courses and limited AI chat.
2.  **POWER_OF_THREE**: Access to "Power of Three" course and student groups.
3.  **SIGNALS_ROOM**: Access to daily trading signals and signals group.
4.  **MENTORSHIP**: Access to booking slots and mentorship materials.
5.  **PREMIUM_ALL_ACCESS**: Full access to all platform features.
