# Final Small Adjustments and Thoughts

### All pages
- [ ] reduce the amount of pointless api calls
- [x] refactor app to move out all local components to proper component files instead of having them defined in the same file as the page, this will make the code cleaner and easier to read.
- [x] when you pull down it should give a refresh indicator and refresh the page

### Dashboard
- [ ] on the dashbaord there is a button called View Meal Planner, i think the button should look like the view all tasks button at the bottom'
- [ ] tasks at a glance dont show correct completed status, maybe completed status should be moved out to a util function so it can be reused from the task page

### Settings page

- [ ] organize settings between "Household Settings" (settings that affect the whole household like start day and goal meals per week) and "Personal Preferences" (settings that are specifically about notifications)
- [ ] When you click invite code and it copies it should give you a toast saying "invite code copied to clipboard"

- [ ] new setting under start day which is goal number of meals per week (household setting), this would just be a number input and it would be used in the meal planner notification to say "you have X meals planned for the week, your goal is Y meals per week"

- [ ] new setting under goal meals per week, which is the time of daily task reminder notification, 0am - 12pm, this would be a time input where user selects what time of day they want to receive a daily task notification reminder about the tasks for the day.

- [ ] new setting, notifaciton preferences for how soon of notification for medium term task reminders 1 - 7 days, this would be a number input where user selects how many days in advance they want to receive the medium term task reminder notification.

- [ ] settings / notification preferences
  a. push notifications enabled
  b. weekly meal planner notifications
    ex: "36 hours before your marked week start day(household setting) it would send a notification with the meals planned for the week and any meals that are missing. Like "only 2/5 meals are planned for the week!"
  on / off
  c. short term task reminder notifications
    ex: a notification at {time selected in the settings} every day that reminds you of the tasks you have for the day. It would say something like "You have 3 tasks for today."
    on / off
  d. medium term task reminder notifications
    ex: a notification that goes out at the time selected in the settings that reminds you of any medium term tasks that are coming up soon. It would say something like "You have 2 medium term tasks coming up this week."
    another notification "You have 1 medium term task due in 3 days"
    on / off
  e. long term task reminder notifications
    ex: a notification that goes out at the time selected in the settings that reminds you of any long term tasks that are coming up soon. It would say something like "You have 1 long term task coming up."
    another notification "You have 1 long term task due in a week"
    on / off
  f. task marked completed by someone else notification
    on / off

- [ ] User setting for security to change their pin should be implemented and working.

## Meal Planner Page

- [ ] need the ability to look at the upcoming week to plan and go back to the current week, thinking a arrow on the top navigation
- [ ] there should be a confirmation modal when you click to delete a manual entry meal from the meals for the week list.

## Meal Library Page

- [ ] users should have the ability to click a favorite button next to meals which is user specific so individuals in a single house could have different favorite meals. on the front end the favorited meals should show up at the top of the meal library list and have a little favorite icon next to them. this would be a boolean property on the meal model called "isFavorited" or something. there should also be a new filter for "favorites" so users could filter to just see their favorited meals in the meal library if they wanted.
- [ ] there should be a confirmation modal when you click to delete a meal from the meal library list.


#### After everything above

- [ ] moved out component files should have acompanying skeleton files for loading states