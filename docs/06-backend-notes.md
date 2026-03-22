# Backend Notes

Responses to frontend questions, plus my own requests.

---

## Responses to Frontend Notes

### Environment & Setup

The API is running locally at **`http://localhost:5125`**. Point your `.env.local` at:
```
VITE_API_URL=http://localhost:5125
```

---

### CORS

Already configured. The API allows:
- Origins: `http://localhost:5173` and `http://192.168.5.100:5173`
- `AllowCredentials()` — yes
- `AllowAnyHeader()`, `AllowAnyMethod()`

If you need to add another origin (e.g. a different LAN IP), let me know and I'll add it to `appsettings.json`.

---

### Session / Cookie

- **`SameSite=Lax`** — this works for same-host/different-port (localhost:5173 → localhost:5125), which covers local dev. For LAN access (192.168.5.100:5173 → 192.168.5.100:8080), same deal — same host, different port, Lax applies.
- **`SecurePolicy=None`** — no HTTPS required, cookie is sent over HTTP. If we ever add nginx + TLS, this will need to change to `Always`.
- **`GET /auth/me`** returns `{ id, username, householdId }` — confirmed.

---

### API Response Clarifications

**`POST /auth/logout`** — 204, no body. Confirmed.

**`GET /households/{id}/tasks`** — sorted by `nextDueAt` ascending server-side. You can group by tier client-side without re-sorting. Confirmed.

**`POST /tasks/{id}/complete`** — returns the full updated `Task` object including new `lastCompletedAt`, `lastCompletedBy` (username string), and computed `nextDueAt`. Confirmed.

**`POST /households/{householdId}/meals/weekly` (free-text)** — yes, returns a valid `WeeklyMeal` with `mealLibraryId: null` and `isFromLibrary: false`. Confirmed.

**`GET /households/{householdId}/meals/library`** — sorted by `createdAt` descending (newest first). Just pushed this fix.

---

### Push Notifications

Added `GET /notifications/vapid-public-key` → returns `{ publicKey: "..." }`. Using the endpoint over a build-time env var is the right call — easier to rotate.

iOS Safari Web Push hasn't been tested yet. According to the architecture doc, this is flagged as an early risk — targeting Sprint 2 at the latest. Will flag when I'm ready to test.

---

### Error Shape

Fixed. Validation errors (400) now return `{ "error": "..." }` instead of ASP.NET's default `ProblemDetails` format. All non-2xx responses follow the contract shape.

---

### Nice to Have

`GET /tasks/{id}` — reasonable ask. I'll add it, it's trivial. Will note it in the contract when done.

---

## Responses to Frontend Notes (round 2)

### All confirmations — noted, thanks.

### `.env.local` port correction — this is your login bug

Your setup section at the bottom has `VITE_API_URL=http://localhost:8080`. **The API is running on `5125`, not `8080`.** That means every fetch is going to the wrong port, getting no response or an HTML error, and the app is falling back to the login screen with a generic "invalid credentials" message.

Fix your `.env.local`:
```
VITE_API_URL=http://localhost:5125
```

Then restart Vite (`Ctrl+C` → `npm run dev`) — env vars don't hot-reload. Login should work after that. I've verified both accounts respond correctly at `5125`:
- `Brandon` / `1337` ✓
- `Madison` / `0325` ✓

---

## My Requests / Questions for Frontend

### 1. `weekOf` is always a Monday — confirm client-side derivation

The API filters weekly meals by exact `weekOf` date match. If the client ever sends a non-Monday date (e.g. today's date), it will return an empty list instead of the current week. The contract says to derive Monday client-side:

```ts
const today = new Date();
const offset = (today.getDay() + 6) % 7;
today.setDate(today.getDate() - offset);
// today is now Monday
```

Please confirm this is in place in `meals.ts` before we test meal planning end-to-end.

### 2. `POST /households` and `POST /households/join` — session cookie on response

Both endpoints set the HttpOnly session cookie in the response and return `{ user, household }`. Make sure the app hydrates both `AuthContext` and `HouseholdContext` from that single response rather than making a follow-up `GET /auth/me` call — the data is already there.

### 3. Username is globally unique (not per-household)

The frontend login sends only `username + pin` — no household identifier. To support that, I made usernames globally unique across all households. This means two different households cannot have a member with the same username. For a LAN household app this should be fine, but wanted to flag it in case you want a "which household?" step on the login screen later.

### 4. `credentials: 'include'` on every fetch

Just confirming — every request in your service files uses `credentials: 'include'`, including the unauthenticated ones (`/auth/login`, `/households`, `/households/join`)? The session cookie is set on those responses, so they need it too.

### 5. VAPID key env var for the service worker

When we get to push notifications, the service worker will need the VAPID public key to call `pushManager.subscribe()`. It can fetch it from `GET /notifications/vapid-public-key` on load, or you can bake it in as `VITE_VAPID_PUBLIC_KEY`. Either works — your call on which fits your service worker setup better.
