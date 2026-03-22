open ai meal prompt

for this final feature, when a user adds a meal to their library, we want to generate an image for that meal using the open ai image generation api. The prompt we are using is as follows:

```
A professionally styled food photograph of {{dish}}, arranged neatly on a matte dark ceramic plate, placed on a dark matte stone surface.

Lit with soft directional natural light from the left, creating gentle shadows and a moody, cinematic atmosphere.

The baby {{dish}} are the focal point, subject in sharp focus.

Color grading is rich, natural, slightly desaturated with deep contrast, dark tones emphasized.

85mm lens, f/2.8, high resolution, editorial food photography, ultra-detailed, sharp focus, professional studio quality, 1:1 aspect ratio
```

additionally there should be a new controller endpoint to test the image generation system with a single parameter being that of a meal name which gets placed into the prompt, returning the generated image url in the response. This will be used for testing and development purposes to ensure the image generation is working correctly before we implement it into the meal library saving flow.

this will also require a update to the meal library data model to include a field to save the image into the database, and an update to the meal library page to display the generated image for each meal in the library.

---

## Status: Implemented (backend)

The backend is fully implemented:

- **Two-stage generation** — GPT-4o-mini first generates a detailed food photography prompt from the meal name, which is then passed to DALL-E 3 for the actual image.
- **Non-blocking** — image generation runs in the background after the meal is saved, so the save request returns immediately. `imageUrl` will be `null` initially and populated once generation completes.
- **`ImageUrl` field** added to `MealLibrary` model with migration applied.
- **Test endpoint** — `POST /api/meals/generate-image` with body `{ "mealName": "..." }` returns `{ "imageUrl": "..." }`.
- **Weekly meals** — `GET /api/households/{id}/meals/weekly` now includes `imageUrl` from the linked library entry where available.

Frontend still needs to display the image on the meal library page.