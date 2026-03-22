# Backend Testing Plan

## Framework & Libraries

The most popular .NET testing stack:

- **xUnit** — test runner (default for .NET projects, used by ASP.NET Core itself)
- **Moq** — mocking framework for interfaces
- **FluentAssertions** — readable assertion syntax

Test project: `DigitalHearth.Api.Tests` (separate `.csproj` in the solution)

### Test project setup

```xml
<PackageReference Include="xunit" Version="2.9.*" />
<PackageReference Include="xunit.runner.visualstudio" Version="2.8.*" />
<PackageReference Include="Moq" Version="4.20.*" />
<PackageReference Include="FluentAssertions" Version="6.*" />
<PackageReference Include="Microsoft.AspNetCore.Mvc.Testing" Version="10.*" />
```

---

## Test Strategy per Layer

Each vertical has **two kinds of tests**:

| Layer | What's mocked | What's tested |
|-------|--------------|---------------|
| **Service unit tests** | Repository interfaces | Business logic, authorization rules, ServiceResult status codes |
| **Controller unit tests** | Service interfaces | Route wiring, `ToActionResult()` mapping, HTTP status codes |

No database or HTTP server is needed — all dependencies are mocked with Moq.

---

## Verticals

---

### 1. Auth

**Service: `AuthService`**

| Test | Setup | Expected |
|------|-------|----------|
| Login — valid credentials | User exists, BCrypt hash matches | `ServiceResult.Ok` with `MeResponse` |
| Login — user not found | `GetByUsernameAsync` returns null | `ServiceResult.NotFound` or `BadRequest` |
| Login — wrong PIN | User exists, BCrypt mismatch | `ServiceResult.BadRequest` |
| Login — sets auth cookie | Valid credentials | `CurrentUserService.SetUserId` called with correct id |

**Controller: `AuthController`**

| Test | Mock returns | Expected HTTP |
|------|-------------|---------------|
| `POST /api/auth/login` — success | `ServiceResult.Ok(meResponse)` | 200 with body |
| `POST /api/auth/login` — bad creds | `ServiceResult.BadRequest("...")` | 400 |
| `POST /api/auth/logout` | — | 204, `CurrentUserService.Clear()` called |
| `GET /api/auth/me` — authenticated | User in context | 200 with `MeResponse` |
| `GET /api/auth/me` — unauthenticated | No user in context | 401 |

---

### 2. Household

**Service: `HouseholdService`**

| Test | Setup | Expected |
|------|-------|----------|
| Create — valid request | No conflicts | `ServiceResult.Ok` with household + user |
| Create — invalid WeekResetDay string | Bad string passed | `ServiceResult.BadRequest` |
| Create — generates unique join code | `JoinCodeService` called | Join code on response |
| Create — PIN is hashed | Any valid request | Stored `PinHash` != raw PIN |
| Join — valid join code | Household found by code | `ServiceResult.Ok` |
| Join — join code not found | `GetByJoinCodeAsync` returns null | `ServiceResult.NotFound` |
| GetById — user belongs to household | User.HouseholdId matches | `ServiceResult.Ok` |
| GetById — user in different household | HouseholdId mismatch | `ServiceResult.Forbidden` |
| GetMembers — authorized user | User belongs | `ServiceResult.Ok` with member list |
| Update — admin user | Role = "admin" | `ServiceResult.Ok` |
| Update — non-admin user | Role = "member" | `ServiceResult.Forbidden` |
| Update — invalid WeekResetDay | Bad string | `ServiceResult.BadRequest` |

**Controller: `HouseholdController`**

| Test | Mock returns | Expected HTTP |
|------|-------------|---------------|
| `POST /api/households` | `ServiceResult.Ok(...)` | 200 |
| `POST /api/households/join` | `ServiceResult.NotFound` | 404 |
| `GET /api/households/{id}` | `ServiceResult.Ok(...)` | 200 |
| `GET /api/households/{id}` | `ServiceResult.Forbidden` | 403 |
| `GET /api/households/{id}/members` | `ServiceResult.Ok(...)` | 200 |
| `PUT /api/households/{id}` | `ServiceResult.Forbidden` | 403 |

---

### 3. Task

**Service: `TaskService`**

| Test | Setup | Expected |
|------|-------|----------|
| List — returns tasks ordered by NextDueAt | 3 tasks with different dates | Ordered ascending |
| List — user not in household | HouseholdId mismatch | `ServiceResult.Forbidden` |
| Create — valid IntervalDays > 0 | HouseholdId matches | `ServiceResult.Ok` with task |
| Create — IntervalDays = 0 | Zero passed | `ServiceResult.BadRequest` |
| Create — IntervalDays negative | Negative passed | `ServiceResult.BadRequest` |
| Update — task belongs to household | HouseholdId matches user | `ServiceResult.Ok` |
| Update — task in different household | Mismatch | `ServiceResult.Forbidden` |
| Update — partial (only Name) | Name provided, no IntervalDays | Only Name updated |
| Update — partial (only IntervalDays) | IntervalDays provided, no Name | Only interval updated |
| Delete — task belongs to household | HouseholdId matches | `ServiceResult.Ok` |
| Delete — task not found | `GetByIdAsync` null | `ServiceResult.NotFound` |
| Complete — sets LastCompletedAt | Valid task | `LastCompletedAt` is near UtcNow |
| Complete — sets LastCompletedByUserId | Valid task | Matches current user id |
| Complete — creates TaskCompletion record | Valid task | `AddCompletionAsync` called |
| GetHistory — task found | Valid task | Returns ordered list |
| GetHistory — task not found | `GetByIdAsync` null | `ServiceResult.NotFound` |
| NextDueAt — never completed | `LastCompletedAt` is null | `CreatedAt + IntervalDays` |
| NextDueAt — previously completed | `LastCompletedAt` is set | `LastCompletedAt + IntervalDays` |

**Controller: `TaskController`**

| Test | Mock returns | Expected HTTP |
|------|-------------|---------------|
| `GET /api/households/{id}/tasks` | `ServiceResult.Ok(...)` | 200 |
| `POST /api/households/{id}/tasks` | `ServiceResult.BadRequest` | 400 |
| `PUT /api/tasks/{id}` | `ServiceResult.Ok(...)` | 200 |
| `DELETE /api/tasks/{id}` | `ServiceResult.Ok` | 204 |
| `POST /api/tasks/{id}/complete` | `ServiceResult.Forbidden` | 403 |
| `GET /api/tasks/{id}/history` | `ServiceResult.NotFound` | 404 |

---

### 4. Meal

**Service: `MealService`**

| Test | Setup | Expected |
|------|-------|----------|
| GetWeekly — explicit weekOf | Valid date string | Returns meals for that week |
| GetWeekly — no weekOf provided | Household has WeekResetDay set | Calculates current week correctly |
| GetWeekly — user not in household | HouseholdId mismatch | `ServiceResult.Forbidden` |
| AddWeekly — with MealLibraryId | Library meal found | Uses library name, sets FK |
| AddWeekly — with Name only | No MealLibraryId | Creates with provided name |
| AddWeekly — neither Name nor MealLibraryId | Both null | `ServiceResult.BadRequest` |
| AddWeekly — MealLibraryId not found | `GetLibraryByIdAsync` null | `ServiceResult.NotFound` |
| LinkToLibrary — weekly meal found | Valid ids | `ServiceResult.Ok` with updated meal |
| LinkToLibrary — weekly meal not found | `GetWeeklyByIdAsync` null | `ServiceResult.NotFound` |
| DeleteWeekly — meal found | Valid id | `ServiceResult.Ok` |
| DeleteWeekly — meal not found | `GetWeeklyByIdAsync` null | `ServiceResult.NotFound` |
| GetLibrary — user in household | HouseholdId matches | `ServiceResult.Ok` |
| GetLibrary — user not in household | Mismatch | `ServiceResult.Forbidden` |
| AddToLibrary — valid request | HouseholdId matches | `ServiceResult.Ok` with library entry |
| AddToLibrary — background image task fires | Valid request | `Task.Run` invoked (or image service called) |
| DeleteFromLibrary — meal found | Valid id, user in household | `ServiceResult.Ok` |
| DeleteFromLibrary — meal not found | `GetLibraryByIdAsync` null | `ServiceResult.NotFound` |
| DeleteFromLibrary — user in different household | HouseholdId mismatch | `ServiceResult.Forbidden` |

**Note:** `ImageGenerationService` (OpenAI) is excluded from unit tests per the plan.

**Controller: `MealController`**

| Test | Mock returns | Expected HTTP |
|------|-------------|---------------|
| `GET /api/households/{id}/meals/weekly` | `ServiceResult.Ok(...)` | 200 |
| `POST /api/households/{id}/meals/weekly` | `ServiceResult.BadRequest` | 400 |
| `PATCH /api/meals/weekly/{id}` | `ServiceResult.Ok(...)` | 200 |
| `DELETE /api/meals/weekly/{id}` | `ServiceResult.NotFound` | 404 |
| `GET /api/households/{id}/meals/library` | `ServiceResult.Ok(...)` | 200 |
| `POST /api/households/{id}/meals/library` | `ServiceResult.Ok(...)` | 200 |
| `DELETE /api/meals/library/{id}` | `ServiceResult.Forbidden` | 403 |

---

### 5. Notification

**Service: `NotificationService`**

| Test | Setup | Expected |
|------|-------|----------|
| Subscribe — new endpoint | No existing sub for that endpoint | `AddSubscriptionAsync` called |
| Subscribe — existing endpoint | Sub exists for endpoint | Old deleted, new created |
| Unsubscribe — has subscriptions | List not empty | All deleted |
| Unsubscribe — no subscriptions | Empty list | `ServiceResult.Ok` (no error) |
| GetPreferences — user in household | HouseholdId matches | Returns opted-out task id list |
| GetPreferences — user not in household | Mismatch | `ServiceResult.Forbidden` |
| OptOut — not already opted out | `IsOptedOutAsync` false | `AddPreferenceAsync` called |
| OptOut — already opted out | `IsOptedOutAsync` true | `ServiceResult.BadRequest` (or idempotent Ok) |
| RemoveOptOut — preference exists | `GetPreferenceAsync` returns record | `DeletePreferenceAsync` called |
| RemoveOptOut — preference not found | `GetPreferenceAsync` null | `ServiceResult.NotFound` |

**Controller: `NotificationController`**

| Test | Mock returns | Expected HTTP |
|------|-------------|---------------|
| `GET /api/notifications/vapid-public-key` | Configured key | 200 with key |
| `POST /api/notifications/subscription` | `ServiceResult.Ok` | 201 |
| `DELETE /api/notifications/subscription` | `ServiceResult.Ok` | 204 |
| `GET /api/households/{id}/notifications/preferences` | `ServiceResult.Forbidden` | 403 |
| `POST /api/notifications/preferences/opt-out` | `ServiceResult.Ok` | 201 |
| `DELETE /api/notifications/preferences/opt-out/{taskId}` | `ServiceResult.NotFound` | 404 |

---

## Helper Utilities Needed

These will be shared across test files:

- **`UserFixtures`** — factory methods for `User` objects (admin, member, in-household, out-of-household)
- **`HouseholdFixtures`** — factory for `Household` with WeekResetDay variants
- **`TaskFixtures`** — factory for `RecurringTask` with various completion states
- **`MealFixtures`** — factory for `WeeklyMeal` and `MealLibrary` entities
- **`ServiceResultExtensions`** — if not already on the type, helpers for asserting result status

---

## Out of Scope

- `ImageGenerationService` — external OpenAI API, skip per plan
- `PushNotificationService` — external WebPush delivery, skip
- `TaskDueCheckerService` — background service, integration-level concern
- Database integration tests — no real DB needed for this pass

---

## Progress Tracker

### Auth
- [x] `AuthService` unit tests
- [x] `AuthController` unit tests

### Household
- [x] `HouseholdService` unit tests
- [x] `HouseholdController` unit tests

### Task
- [x] `TaskService` unit tests
- [x] `TaskController` unit tests

### Meal
- [x] `MealService` unit tests
- [x] `MealController` unit tests

### Notification
- [x] `NotificationService` unit tests
- [x] `NotificationController` unit tests

### Infrastructure
- [x] Create `DigitalHearth.Api.Tests` project and add to solution
- [x] Add xUnit + Moq + FluentAssertions packages
- [x] Create fixture helper classes
