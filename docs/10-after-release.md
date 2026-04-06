# 1.1 adjustments

- [x] On meal planner you should beable to click it for the week to like mark it as coooked or completed so it goes into a like disabled state as a reminder of what you have made already. it should be based on a confirmation popup
- [x] If you try to remove a meal after a week has already started there should be a confirmation popup that says "This week has already started, are you sure you want to remove this meal?"
- [x] height of the current week pill indicator should be consistent with previous and future week pills, currently its a little shorter than the other pills which makes ui jump
- [x] On a add new task screen, add a checkbox to indicate one time task, turn frequency schedule into just a due date selector if its a one time task, if its not a one time task then show the frequency schedule options like normal
- [x] One time tasks should not have a completetion history when editing
- [x] editing a task should include the same one time task checkbox and logic as creating a new task
- [x] bug: current start day is sunday but the week view shows sunday as the end day of the week
- [x] when opening meal library from a future week you should beable to add the meal to the week selected
- [x] if you are the household admin you should beable to kick a member, this would soft delete that persons account
- [x] editing goal meals per week as member not admin still leaves the input as the input put in instead of resetting to previous, probably just change this to readonly for members and only show the current goal meals per week without the ability to edit it, since its not something they can change anyway

# 2.0 features

- [ ] need favicon and pwa icon
- [ ] adding recipe support to meal library
- [ ] should have a service worker detect non-mobile users, and show a message that says "This app is designed for mobile use, please switch to a mobile device for the best experience" or something like that. There should also be a guide on how to set it up as a pwa on their phone so it can be used as a app
- [ ] show all filter toggle that shows all hidden tasks that are hidden because theres no need to show a complete task for 6 months
- [ ] there should be a responsive screen that when a user seems to be on a desktop, service worker could probably detect it, we should display a message that says "This app is designed for mobile use, please switch to a mobile device for the best experience" or something like that. There should also be a guide on how to set it up as a pwa on their phone so it can be used as a app
- [ ] on the meal library page, underneath the filter the pills next to favorites would be tags of the household, so you can click a add new tag button but it also lists all tags you have to filter by item.
- [ ] allow users to upload their own images