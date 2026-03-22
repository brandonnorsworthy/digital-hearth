# Backend Notes — New Designs (Sprint 07)

Notes for the backend team on what's needed to fully support the three new UI designs.

---

## 1. Tasks Page (07a)

The redesigned Tasks page is already fully functional with the existing API. No backend changes needed.

---

## 2. Meal Library Page (07b) + Save-to-Library from Planner

The new `/meals/library` page is implemented. The "save to library" button on manual meal cards in the planner is also implemented, but requires a new backend endpoint to persist the library link on the weekly meal record.

### PATCH /meals/weekly/{id} — ✅ Implemented

The frontend calls this after saving a manual meal to the library to link the records. Fully live.

### Image generation — ✅ Implemented

Images are generated automatically in the background via DALL-E 3 when a meal is added to the library (`POST /households/{id}/meals/library`). The response returns immediately with `imageUrl: null`; the image URL is saved to the DB once generation completes (typically a few seconds). The frontend displays the image on next library load.

A standalone `POST /api/meals/generate-image` endpoint also exists for on-demand regeneration — not yet wired to a UI button but the service method is ready on the frontend.

### Tags — ✅ Implemented

`LibraryMealResponse` now includes `Tags: string[]` and `AddLibraryMealRequest` accepts optional `Tags`. The frontend category chips filter against these tags using the following mapping:

| Chip label | Tag value |
|---|---|
| Vegetarian | `vegetarian` |
| Family Favorites | `family-favorites` |

Tags must be set when saving a meal for the chips to filter correctly — not yet exposed in the UI save flow.

### "Add new recipe" flow
The placeholder card in the library grid currently does nothing. No backend changes needed for MVP.

---

## 3. SelectSheet / Week Start Day (07c)

Already fully implemented end-to-end. The `PATCH /households/{id}` endpoint accepting `{ weekResetDay }` is live and the UI uses it.

No backend changes needed.

---

## Summary

| Feature | Status | Backend work needed |
|---|---|---|
| Tasks page redesign | Done | None |
| Meal library grid + search | Done | None |
| Save manual meal to library | Done end-to-end | — |
| Meal images (DALL-E 3) | Done end-to-end | Add `imageUrl` to `WeeklyMealResponse` |
| Meal library tag filtering | Done end-to-end | Tags must be set on save |
| Meal library "Add new recipe" | Placeholder only | None for MVP |
| SelectSheet (week start day) | Done | None |
