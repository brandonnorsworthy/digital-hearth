# API Contract

This document is the source of truth for the REST API between the React frontend and the ASP.NET Core backend. Both agents work from this file — the backend implements it, the frontend calls it.

**Base URL:** `https://<lan-host>/api`
**Auth:** HttpOnly session cookie set on login. All endpoints except `/auth/login`, `/auth/register`, and `/households/join` require a valid session.
**Content-Type:** `application/json` for all requests and responses.

---

## Data Models

```ts
User         { id, username, householdId }
Household    { id, name, joinCode, weekResetDay }
Member       { id, username, role }           // role: "admin" | "member"
Task         { id, householdId, name, tier, intervalDays, lastCompletedAt, lastCompletedBy, nextDueAt }
                                              // tier: "short" | "medium" | "long"
                                              // lastCompletedAt/By: null if never completed
                                              // nextDueAt: computed (lastCompletedAt ?? createdAt) + intervalDays
Completion   { id, taskId, completedAt, userId, username }
WeeklyMeal   { id, weekOf, name, mealLibraryId, isFromLibrary }
                                              // weekOf: "YYYY-MM-DD" (Monday of that week)
                                              // mealLibraryId: null for one-off entries
LibraryMeal  { id, name, createdBy, createdAt }
```

---

## Auth

### `POST /auth/login`
Log in an existing user.

**Request:**
```json
{ "username": "Sarah", "pin": "1234" }
```
**Response `200`:** Sets HttpOnly session cookie.
```json
{ "id": 1, "username": "Sarah", "householdId": 1 }
```
**Response `401`:** Invalid credentials.

---

### `POST /auth/logout`
Clear the session cookie.

**Response `204`:** No content.

---

### `GET /auth/me`
Return the current session's user. Used on app load to restore session.

**Response `200`:**
```json
{ "id": 1, "username": "Sarah", "householdId": 1 }
```
**Response `401`:** No active session.

---

## Households

### `POST /households`
Create a new household. Also creates and logs in the first user (head of household).

**Request:**
```json
{
  "householdName": "The Mitchell House",
  "username": "Sarah",
  "pin": "1234",
  "weekResetDay": "Monday"
}
```
- `weekResetDay`: optional, defaults to `"Monday"`. Accepts day names: `"Monday"` – `"Sunday"`.

**Response `201`:** Sets HttpOnly session cookie.
```json
{
  "user": { "id": 1, "username": "Sarah", "householdId": 1 },
  "household": { "id": 1, "name": "The Mitchell House", "joinCode": "HEARTH42", "weekResetDay": "Monday" }
}
```

---

### `POST /households/join`
Join an existing household with a join code. Creates and logs in the new user.

**Request:**
```json
{ "username": "James", "pin": "5678", "joinCode": "HEARTH42" }
```
**Response `200`:** Sets HttpOnly session cookie.
```json
{
  "user": { "id": 2, "username": "James", "householdId": 1 },
  "household": { "id": 1, "name": "The Mitchell House", "joinCode": "HEARTH42", "weekResetDay": "Monday" }
}
```
**Response `404`:** Join code not found.
**Response `409`:** Username already taken in this household.

---

### `GET /households/{id}`
Get household details.

**Response `200`:**
```json
{ "id": 1, "name": "The Mitchell House", "joinCode": "HEARTH42", "weekResetDay": "Monday" }
```

---

### `GET /households/{id}/members`
List all members of a household.

**Response `200`:**
```json
[
  { "id": 1, "username": "Sarah", "role": "admin" },
  { "id": 2, "username": "James", "role": "member" }
]
```

---

### `PUT /households/{id}`
Update household settings. Admin only.

**Request:** (all fields optional)
```json
{ "name": "The Mitchell House", "weekResetDay": "Sunday" }
```
**Response `200`:** Updated household object.

---

## Tasks

### `GET /households/{householdId}/tasks`
List all tasks for the household, ordered by `nextDueAt` ascending.

**Response `200`:**
```json
[
  {
    "id": 1,
    "householdId": 1,
    "name": "Water Plants",
    "tier": "short",
    "intervalDays": 7,
    "lastCompletedAt": "2025-03-15T00:00:00Z",
    "lastCompletedBy": "James",
    "nextDueAt": "2025-03-22T00:00:00Z"
  }
]
```

---

### `POST /households/{householdId}/tasks`
Create a new task.

**Request:**
```json
{ "name": "Water Plants", "tier": "short", "intervalDays": 7 }
```
**Response `201`:** Full task object.

---

### `GET /tasks/{id}`
Get a single task by ID.

**Response `200`:** Full task object.
**Response `404`:** Task not found.

---

### `PUT /tasks/{id}`
Update a task.

**Request:** (all fields optional)
```json
{ "name": "Water Plants", "tier": "short", "intervalDays": 14 }
```
**Response `200`:** Updated task object.

---

### `DELETE /tasks/{id}`
Delete a task and its completion history.

**Response `204`:** No content.

---

### `POST /tasks/{id}/complete`
Mark a task complete. Records the current user + timestamp. Resets `nextDueAt` from now.

**Response `200`:** Updated task object with new `lastCompletedAt`, `lastCompletedBy`, and `nextDueAt`.
```json
{
  "id": 1,
  "name": "Water Plants",
  "tier": "short",
  "intervalDays": 7,
  "lastCompletedAt": "2025-03-21T14:30:00Z",
  "lastCompletedBy": "Sarah",
  "nextDueAt": "2025-03-28T14:30:00Z"
}
```

---

### `GET /tasks/{id}/history`
Get the completion audit log for a task, ordered by `completedAt` descending.

**Response `200`:**
```json
[
  { "id": 5, "taskId": 1, "completedAt": "2025-03-21T14:30:00Z", "userId": 1, "username": "Sarah" },
  { "id": 3, "taskId": 1, "completedAt": "2025-03-14T09:00:00Z", "userId": 2, "username": "James" }
]
```

---

## Meals

### `GET /households/{householdId}/meals/weekly?weekOf=YYYY-MM-DD`
Get the weekly meal list. `weekOf` is the Monday of the desired week. If omitted, defaults to the current week's Monday.

**Response `200`:**
```json
[
  { "id": 1, "weekOf": "2025-03-17", "name": "Spaghetti Bolognese", "mealLibraryId": 3, "isFromLibrary": true },
  { "id": 2, "weekOf": "2025-03-17", "name": "Homemade Pizza", "mealLibraryId": null, "isFromLibrary": false }
]
```

---

### `POST /households/{householdId}/meals/weekly`
Add a meal to the current week. Either reference a library item or provide a free-text name.

**Request (from library):**
```json
{ "mealLibraryId": 3, "weekOf": "2025-03-17" }
```
**Request (free-text):**
```json
{ "name": "Tacos", "weekOf": "2025-03-17" }
```
**Response `201`:** Full `WeeklyMeal` object.

---

### `DELETE /meals/weekly/{id}`
Remove a meal from the weekly list.

**Response `204`:** No content.

---

### `GET /households/{householdId}/meals/library`
Get the household's saved meal library.

**Response `200`:**
```json
[
  { "id": 3, "name": "Spaghetti Bolognese", "createdBy": "Sarah", "createdAt": "2025-01-01T00:00:00Z" }
]
```

---

### `POST /households/{householdId}/meals/library`
Save a meal to the library.

**Request:**
```json
{ "name": "Spaghetti Bolognese" }
```
**Response `201`:** Full `LibraryMeal` object.

---

### `DELETE /meals/library/{id}`
Remove a meal from the library. Does not affect existing weekly meal entries that referenced it (they retain the name as a snapshot).

**Response `204`:** No content.

---

## Notifications

### `POST /notifications/subscription`
Save a Web Push subscription for the current user's device. Called by the service worker after the user grants permission.

**Request:** Standard [PushSubscription](https://developer.mozilla.org/en-US/docs/Web/API/PushSubscription) serialized object.
```json
{
  "endpoint": "https://fcm.googleapis.com/...",
  "keys": {
    "p256dh": "...",
    "auth": "..."
  }
}
```
**Response `201`:** No body.

---

### `DELETE /notifications/subscription`
Remove the push subscription for the current user's device (unsubscribe from all push).

**Response `204`:** No content.

---

### `GET /households/{householdId}/notifications/preferences`
Get the current user's notification opt-outs. Returns only the task IDs the user has opted out of (default is subscribed to all).

**Response `200`:**
```json
{ "optedOutTaskIds": [3, 7] }
```

---

### `POST /notifications/preferences/opt-out`
Opt the current user out of notifications for a specific task.

**Request:**
```json
{ "taskId": 3 }
```
**Response `201`:** No body.

---

### `DELETE /notifications/preferences/opt-out/{taskId}`
Re-subscribe the current user to notifications for a task (remove the opt-out).

**Response `204`:** No content.

---

## Error Shape

All errors return a consistent body:
```json
{ "error": "Human-readable message" }
```

Common status codes:
- `400` Bad Request — validation failure
- `401` Unauthorized — no session
- `403` Forbidden — session exists but insufficient role
- `404` Not Found
- `409` Conflict — e.g. duplicate username

---

## Notes for Frontend Agent

- **Session restoration:** On app load, call `GET /auth/me`. If `401`, show login. If `200`, hydrate `AuthContext` and `HouseholdContext`.
- **Cookie handling:** All fetch calls must include `credentials: 'include'` so the HttpOnly cookie is sent.
- **EditTask should call `GET /tasks/{id}`** to load a single task for editing, not `GET /households/{id}/tasks`.
- **`nextDueAt` is computed by the backend** — the frontend does not need to calculate it. Use it directly to derive due badge state (`urgent` / `soon` / `ok`).
- **Weekly meal `weekOf`:** Always send the Monday of the current week. Derive it client-side: `date - (date.getDay() + 6) % 7 days`.
- **Suggested service file layout:**
  ```
  src/services/
    api.ts           ← base fetch wrapper (credentials: include, base URL)
    auth.ts          ← login, logout, me
    household.ts     ← get, update, members
    tasks.ts         ← CRUD, complete, history
    meals.ts         ← weekly, library
    notifications.ts ← subscription, preferences
  ```

## Notes for Backend Agent

- **Session:** Use `ISession` / distributed session or a lightweight cookie-based auth middleware. Store `userId` in the session. No JWT needed.
- **`nextDueAt` computation:** `(lastCompletedAt ?? task.CreatedAt) + intervalDays`. Compute on read, do not store.
- **Join code generation:** 6-character alphanumeric, uppercase. Unique per household. No expiry for MVP.
- **Weekly meal auto-reset:** No scheduled job needed — the weekly list is scoped by `weekOf`. Old weeks simply stop being queried. The frontend always queries the current week's Monday.
- **VAPID keys:** Load from environment variables (`VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, `VAPID_SUBJECT`). Use [WebPush](https://github.com/web-push-libs/web-push-csharp) or equivalent .NET library.
- **`week_reset_day` on Household:** Store as an integer (0=Sunday … 6=Saturday) or as a string enum. Frontend sends day names; normalize on ingest.
