# Backend Notes: Tasks — Tier Removal

The frontend no longer asks users to choose a tier. Tiers are now calculated automatically from `IntervalDays`:

- `< 7 days` → Short Term
- `< 30 days` → Medium Term
- `>= 30 days` → Long Term

The frontend currently still sends `tier` in create/update requests (derived from `intervalDays`) so the existing API keeps working. Once the backend migration below is done, the frontend will stop sending it.

---

## Changes Needed

### 1. `RecurringTask` model
Remove the `Tier` property:
```csharp
// Remove this line:
public string Tier { get; set; } = null!;
```

### 2. DTOs
- `CreateTaskRequest` — remove `string Tier` parameter
- `UpdateTaskRequest` — remove `string? Tier` parameter
- `TaskResponse` — remove `string Tier` from the record

### 3. `TaskService`
- Remove tier validation (`"short"`, `"medium"`, `"long"` check)
- Remove any tier-based logic (currently none beyond validation)

### 4. Database Migration
Add an EF Core migration to drop the `Tier` column from `RecurringTasks`:
```bash
dotnet ef migrations add RemoveTaskTier
dotnet ef database update
```

The generated migration should include:
```csharp
migrationBuilder.DropColumn(name: "Tier", table: "RecurringTasks");
```

---

## No Other Changes Needed
- `IntervalDays` stays as-is — this is the single source of truth for recurrence
- All other endpoints (Complete, History, List) are unaffected
- Frontend handles the Short/Medium/Long grouping labels entirely in the UI
