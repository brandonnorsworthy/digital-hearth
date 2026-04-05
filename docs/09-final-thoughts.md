# Final Small Adjustments and Thoughts

### All pages
- [~] reduce the amount of pointless api calls — skipped, double requests are React Strict Mode dev behaviour, not a real issue
- [x] refactor app to move out all local components to proper component files instead of having them defined in the same file as the page, this will make the code cleaner and easier to read.
- [x] when you pull down it should give a refresh indicator and refresh the page
- [x] at this point app is completely stable, front end needs full striping for tests
- [x] backend refactor to vertically slice the repositories by entity
- [x] backend testing for all routes and services, except open ai stuff

### Dashboard
- [x] on the dashbaord there is a button called View Meal Planner, i think the button should look like the view all tasks button at the bottom'
- [x] tasks at a glance dont show correct completed status, maybe completed status should be moved out to a util function so it can be reused from the task page

### Settings page

- [x] organize settings between "Household Settings" (settings that affect the whole household like start day and goal meals per week) and "Personal Preferences" (settings that are specifically about notifications)
- [x] When you click invite code and it copies it should give you a toast saying "invite code copied to clipboard"

- [x] new setting under start day which is goal number of meals per week (household setting), this would just be a number input and it would be used in the meal planner notification to say "you have X meals planned for the week, your goal is Y meals per week"

- [x] new setting under goal meals per week, which is the time of daily task reminder notification, 0am - 12pm, this would be a time input where user selects what time of day they want to receive a daily task notification reminder about the tasks for the day.

- [x] new setting, notifaciton preferences for how soon of notification for medium term task reminders 1 - 7 days, this would be a number input where user selects how many days in advance they want to receive the medium term task reminder notification.

- [x] settings / notification preferences
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

- [x] User setting for security to change their pin should be implemented and working.

## Meal Planner Page

- [x] need the ability to look at the upcoming week to plan and go back to the current week, thinking a arrow on the top navigation
- [x] there should be a confirmation modal when you click to delete a manual entry meal from the meals for the week list.

## Meal Library Page

- [x] users should have the ability to click a favorite button next to meals which is user specific so individuals in a single house could have different favorite meals. on the front end the favorited meals should show up at the top of the meal library list and have a little favorite icon next to them. this would be a boolean property on the meal model called "isFavorited" or something. there should also be a new filter for "favorites" so users could filter to just see their favorited meals in the meal library if they wanted.
- [x] there should be a confirmation modal when you click to delete a meal from the meal library list.


## Task page

- [x] all incomplete tasks should have the same styling on the task page, (still in respective sections)
- [x] all complete tasks should have the same styling on the task page, (still in respective sections)

### Final Steps

- [x] make sure everything works in a container
- [x] deploy to local linux server
- [x] configure nginx to reverse proxy to the backend and frontend
frontend: digitalhearth.zcog.net
3021 frontend

backend: api.digitalhearth.zcog.net
3020 api
- [x] aws route 53 configured

### after deployment notes

- [x] logging is too verbose its logging every ef query
- [x] image generation seems to be broken
- [x] want dark mode
- [x] setting page, push notifications is grayed out if not on pwa making it confusing should have a alert that say you need to download it to use push notifications
- [x] need to replace common components with skeletons for loading so stuff doesnt pop in
- [x] you can click a incomplete task to edit it, should not beable to click to edit
- [x] tasks over 6 months should have max due time of 1 month

### other stuff

- [x] when in dark mode the example task of the edit task screen is super light and hard to see
- [x] in the meal library add a new recipe button doesnt work, should support adding a new recipe without adding it to the week. it should be moved to the top of the search results
- [x] budget per month for image generation per household
- [x] when a image is regenerated there should be a new token with the meal for image token to help bust any caching, this means that creating a image would need to set a image token aswell
- [x] move image data to a dedicated table for the token, image guid, image data, if it was ai generated, created at, and updated at
- [x] upgrade security, database ids, should be uuid instead of int to make it harder to brute force guess ids, especially for things like user ids, and household ids, task ids, meal ids, etc
- [x] dont have an account? create a household button on the login page that takes you to a create household page where you can create an account and household at the same time, this would just be a form with email, password, confirm password, household name, and then it would create the household and account at the same time and log you in.
- [x] confirmation are you sure you want to log out
- [x] when deleting a task are you sure you want to delete like the meal library delete
- [x] text on the setting thing is a little to far left
- [x] rounding on stuff like goal meals per week div is too rounded
- [x] i think the icons on the meal library on top of the image when in dark mode are too light
- [ ] more dashboard verbs for larger variety
- [ ] pin code should be converted to passwords with 1 capital, 1 lowercase, 1 number, 12 characters and 1 special character to make it more secure
- [ ] somehow to increment versioning for every commit, version should be visible on login and bottom of settings page
- [ ] if household have no image generation budget per month ex: 0, it should say "Contact Brandon for a image generation budget" or something, instead of Resets on x 1st

### After everything above

- [ ] weekly meal page, in the from your library should show 10 results max
- [ ] should have a service worker detect non-mobile users, and show a message that says "This app is designed for mobile use, please switch to a mobile device for the best experience" or something like that. There should also be a guide on how to set it up as a pwa on their phone so it can be used as a app
- [ ] Household tasks screen should have some content if there are no tasks, instead of just being blank, maybe a button to add a task
- [ ] from your library on the meal planner page should show a message if there are no meals in the library instead of just being blank, maybe a button to add a meal
- [ ] tasks at a glance should show "no current tasks" or something if household has no tasks, instead of just being blank
- [ ] should have a background pill or something to indicate the current week so you dont get lost going forward or backward
- [ ] join code should be longer to make harder to brute force guess
- [ ] join code invites should expire after 24 hours
- [ ] user pin codes should be longer to make harder to brute force guess
- [ ] moved out component files should have acompanying skeleton files for loading states
- [ ] I want a few variable phrases on the dashboard instead of only "2 things need attention" a few more quips would be fun
- [ ] opening a task to edit on the task library page should have a section at the bottom saying last completed by with a arrow to open all history on that task, this would be a new page that shows a list of all the completion history for that task, who completed it and when
- [ ] have a few more placeholder meal suggestions in the input box for new meals instead of just "merry me chicken"
- [ ] make a initial agreement pop up that just goes into local storage or something wether it has been shown that says, this is completely a personal project, hosted on my person server, and i do not make any promises about resiliency or data loss.
- [ ] the short term - weekly tag should be removed same with, medium term - monthly tag, and long term - yearly tag
- [ ] with auditing push subscriptions, we should track last successful push notification and if its over a week we should automatically delete that subscription from the database
- [ ] there should be a responsive screen that when a user seems to be on a desktop, we should display a message that says "This app is designed for mobile use, please switch to a mobile device for the best experience" or something like that. There should also be a guide on how to set it up as a pwa on their phone so it can be used as a app
- [ ] loading components should have skeletons
- [ ] show all filter toggle that shows all hidden tasks that are hidden because theres no need to show a complete task for 6 months
- [ ] on the meal library page, underneath the filter the pills next to favorites would be tags of the household, so you can click a add new tag button but it also lists all tags you have to filter by item.
- [ ] allow users to upload their own images