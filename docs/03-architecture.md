# Architecture

## Tech Stack

| Layer | Choice |
|---|---|
| Frontend | React + Vite + Tailwind (bare components for MVP) |
| Backend | ASP.NET Core, controller-based REST |
| ORM | EF Core + Npgsql |
| Database | PostgreSQL |
| Auth | Username + PIN, HttpOnly session cookies |
| Notifications | Web Push (VAPID) via service worker |
| Deployment | Docker Compose, nginx reverse proxy, HTTPS |

---

## High-Level Diagram

```
Browser (PWA)
  └── Service Worker (push notifications)
  └── React + Vite + Tailwind
         |
      HTTPS
         |
      nginx (reverse proxy)
         |
   ASP.NET Core API (controllers)
         |
      EF Core + Npgsql
         |
      PostgreSQL
```

All containers in Docker Compose on the Ubuntu LAN server.

---

## Component Breakdown

**Frontend**
- `AuthContext` — current user + session state
- `HouseholdContext` — active household + members
- Pages: Dashboard, Tasks, Meal Planner, Settings
- Service worker: push subscription + notification handling

**Backend**
- `AuthController` — login, logout, session
- `HouseholdController` — create, join (code), settings
- `TaskController` — CRUD, mark complete, audit log
- `MealController` — weekly planner, meal library
- `NotificationController` — VAPID subscription, opt-out prefs
- Background service — checks overdue tasks, fires push notifications

---

## Data Flow

- **Auth:** POST credentials → server validates → sets HttpOnly cookie → all subsequent requests carry cookie
- **Tasks:** Client loads on navigation — no real-time requirement for MVP
- **Push:** Background job checks task due dates → sends Web Push via VAPID → service worker shows notification
- **Meal planner:** Loaded fresh on page visit, week scoped by `week_of` date

---

## Deployment (Docker Compose)

```yaml
services:
  nginx       # reverse proxy, TLS termination
  api         # ASP.NET Core
  db          # PostgreSQL
```

HTTPS via mkcert for LAN.

---

## Known Risks

| Risk | Mitigation |
|---|---|
| iOS PWA push | Test early (Sprint 2 at latest) — requires HTTPS ✓ and iOS 16.4+ |
| VAPID key rotation | Store keys in env vars, document rotation process |
| PostgreSQL data loss | Docker volume mount + periodic `pg_dump` backup script |

---

## Implementation Roadmap

1. Docker Compose scaffold — nginx + API + Postgres
2. EF Core schema + migrations (all tables up front)
3. Auth — login/logout, session cookie
4. Household create + join code
5. Recurring tasks CRUD + completion + audit log
6. Service worker + VAPID push infrastructure
7. Notification opt-out
8. Meal library CRUD
9. Weekly meal planner + auto-reset
10. Design pass (apply Stitch designs over baseline components)

---

## Open Questions

- Should the join code expire or be permanent? (LAN-only, low risk either way)
- Can `week_reset_day` be changed after household creation, or is it set-once?
