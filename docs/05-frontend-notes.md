# Frontend Notes

Questions, blockers, and requests for the backend developer.

---

## Responses to Backend Notes (06-backend-notes.md)

### 1. `weekOf` Monday derivation — confirmed
`getCurrentWeekOf()` in `src/utils/meals.ts` uses `(today.getDay() + 6) % 7` — identical to your formula. Every call to `mealService.weeklyList()` and `mealService.addWeekly()` passes this value. We're good.

### 2. Household create/join — context hydration
Noted. When we build the household creation and join screens, both `AuthContext` and `HouseholdContext` will be hydrated directly from the `{ user, household }` response rather than making a follow-up `GET /auth/me`. No redundant round-trip.

### 3. Globally unique usernames
Understood and fine for MVP. No "which household?" step needed on login — the username alone is enough to identify the user. We'll document this constraint if we ever revisit multi-household support.

### 4. `credentials: 'include'` on every fetch — confirmed
All requests go through a single base wrapper in `src/services/api.ts` that hardcodes `credentials: 'include'`. This includes `/auth/login`, `POST /households`, and `POST /households/join` — the cookie will be captured on those responses.

### 5. VAPID key — using the endpoint
We'll fetch from `GET /notifications/vapid-public-key` at push subscription time. Added `notificationService.vapidPublicKey()` to `src/services/notifications.ts`. We'll call it just before `pushManager.subscribe()` in the service worker sprint.

---

## Environment & Setup

**The frontend needs a `VITE_API_URL` to point at the API.** Please share the base URL and port the API runs on locally so we can document it (e.g. `http://192.168.4.100:5000`). We'll put it in `.env.local`.

---

## CORS

The frontend runs on a different port than the API during development (Vite defaults to `:5173`). The API needs to allow:

- **Origin:** `http://localhost:5173` (and the LAN IP equivalent)
- **Credentials:** `true` — the session cookie must be included on cross-origin requests
- **Methods:** `GET, POST, PUT, DELETE`
- **Headers:** `Content-Type`

Without `AllowCredentials()` + a specific origin (not wildcard), the HttpOnly cookie won't be sent and every request will 401.

---

## Session / Cookie

- The frontend uses `credentials: 'include'` on every fetch, so the HttpOnly cookie will be sent automatically once set.
- On app load we call `GET /auth/me`. If it returns `200` we restore the session silently. If `401` we show the login screen. Please make sure this endpoint returns the full `{ id, username, householdId }` shape — we depend on `householdId` to scope all subsequent requests.
- **SameSite cookie policy:** if the API and frontend are on different origins (different ports count), the cookie needs `SameSite=None; Secure` or `SameSite=Lax` with a matching host. Please confirm what policy the API sets so we can check it matches the dev setup.

---

## API Responses We Need Clarified

### `POST /auth/logout`
- The contract says `204`. Confirmed — no body needed, we just clear local state.

### `GET /households/{id}/tasks` — ordering
- Contract says ordered by `nextDueAt` ascending. The frontend groups by tier (short / medium / long) after receiving the list, so ordering within tier doesn't matter much — but please confirm the sort is server-side so we don't need to re-sort.

### `POST /tasks/{id}/complete` — response shape
- We update the task in local state from the response, so the full updated `Task` object (including new `nextDueAt`, `lastCompletedAt`, `lastCompletedBy`) must be returned. Please confirm.

### `POST /households/{householdId}/meals/weekly` — free-text vs library
- When we send `{ name, weekOf }` (no `mealLibraryId`), does the API still return a valid `WeeklyMeal` with `isFromLibrary: false` and `mealLibraryId: null`? We render based on `isFromLibrary` to show the right icon.

### `GET /households/{householdId}/meals/library` — sort order
- We render library items as horizontal scroll chips. Is there a consistent sort order (e.g. `createdAt` desc)? Doesn't need to change, just want to know what to expect.

---

## Push Notifications (Future Sprint)

When we get to push notifications, we'll need:

1. **VAPID public key** exposed via an endpoint (or baked into the build as an env var `VITE_VAPID_PUBLIC_KEY`). Endpoint is cleaner for key rotation. Something like `GET /notifications/vapid-public-key` returning `{ publicKey: "..." }` would work.
2. Confirmation of which browser/OS combos you've tested Web Push on — iOS Safari is the one most likely to cause pain.

---

## Error Shape

We're expecting `{ "error": "..." }` on all non-2xx responses as per the contract. Please make sure validation errors (400) also follow this shape rather than the default ASP.NET validation problem format, otherwise our error messages will be blank.

---

## Nice to Have (Not Blocking)

- A `GET /tasks/{id}` single-task endpoint would let the EditTask page load without fetching the full household task list. Not critical for MVP but would clean things up.

---

## Setup — `.env.local` Required Before Testing

The frontend needs a `.env.local` file in the project root to know where the API lives. Without it, every fetch goes to `localhost:5173/api/...` (Vite itself), returns HTML instead of JSON, and the app will always land on the login screen with no useful error.

Create `digital-hearth/.env.local` (not committed to git):

```
VITE_API_URL=http://localhost:5125
```

For LAN testing from another device, swap in the server's IP:

```
VITE_API_URL=http://192.168.5.100:5125
```

After creating the file, Vite needs a restart (`Ctrl+C` then `npm run dev`) to pick it up — env vars are baked in at dev server start, not hot-reloaded.

---

## LAN / Phone Testing

To test from a phone or other device on the LAN, two backend changes are needed:

**1. Bind the API to all interfaces** (not just localhost)

Right now `netstat` shows the API only listening on `127.0.0.1:5125` and `[::1]:5125`. Devices on the LAN can't reach it. The API needs to bind to `0.0.0.0:5125`. In ASP.NET this is either:

```json
// appsettings.Development.json
"Urls": "http://0.0.0.0:5125"
```
or the `--urls http://0.0.0.0:5125` flag when running.

**2. Add the LAN origin to CORS**

The machine's LAN IP is `192.168.4.100` (confirmed from Vite network output). Add `http://192.168.4.100:5173` to the allowed CORS origins.

Once both are done, update `.env.local` to point at the LAN IP so the phone's browser can reach the API:

```
VITE_API_URL=http://192.168.4.100:5125
```
