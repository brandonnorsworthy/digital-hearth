import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import SelectSheet from '../components/SelectSheet'
import Toggle from '../components/Toggle'
import { useAuth } from '../contexts/AuthContext'
import { useHousehold } from '../contexts/HouseholdContext'
import { householdService } from '../services/household'
import { WEEK_DAYS } from '../constants/household'
import { notificationService, type UserNotifSettings } from '../services/notifications'
import { authService } from '../services/auth'
import { urlBase64ToUint8Array } from '../utils/encoding'
import { validatePassword } from '../utils/password'
import { useToast } from '../contexts/ToastContext'
import { useTheme } from '../contexts/ThemeContext'

const TASK_REMINDER_HOURS = [
  { value: 0, label: '12:00 AM' },
  { value: 1, label: '1:00 AM' },
  { value: 2, label: '2:00 AM' },
  { value: 3, label: '3:00 AM' },
  { value: 4, label: '4:00 AM' },
  { value: 5, label: '5:00 AM' },
  { value: 6, label: '6:00 AM' },
  { value: 7, label: '7:00 AM' },
  { value: 8, label: '8:00 AM' },
  { value: 9, label: '9:00 AM' },
  { value: 10, label: '10:00 AM' },
  { value: 11, label: '11:00 AM' },
  { value: 12, label: '12:00 PM' },
]

const NOT_SET = 'Not set'
const REMINDER_HOUR_OPTIONS = [NOT_SET, ...TASK_REMINDER_HOURS.map(h => h.label)]

function hourToLabel(hour: number | null): string {
  if (hour === null) return NOT_SET
  return TASK_REMINDER_HOURS.find(h => h.value === hour)?.label ?? NOT_SET
}

function labelToHour(label: string): number | null {
  if (label === NOT_SET) return null
  return TASK_REMINDER_HOURS.find(h => h.label === label)?.value ?? null
}

const DEFAULT_NOTIF_SETTINGS: UserNotifSettings = {
  taskReminderHour: null,
  mediumTermDaysAhead: null,
  mealPlannerNotifs: true,
  shortTermTaskNotifs: true,
  mediumTermTaskNotifs: true,
  longTermTaskNotifs: true,
  taskCompletedNotifs: false,
}

export default function Settings() {
  const { user, logout } = useAuth()
  const { household, members, reload } = useHousehold()
  const navigate = useNavigate()
  const toast = useToast()

  const [weekDaySheetOpen, setWeekDaySheetOpen] = useState(false)
  const [reminderHourSheetOpen, setReminderHourSheetOpen] = useState(false)
  const [weekResetDay, setWeekResetDay] = useState<string | null>(null)
  const [goalMeals, setGoalMeals] = useState<string>('')
  const [confirmLogoutOpen, setConfirmLogoutOpen] = useState(false)

  const currentWeekDay = weekResetDay ?? household?.weekResetDay ?? 'Monday'

  useEffect(() => {
    if (household?.goalMealsPerWeek != null) {
      setGoalMeals(String(household.goalMealsPerWeek))
    }
  }, [household?.goalMealsPerWeek])

  async function handleWeekDaySelect(day: string) {
    setWeekResetDay(day)
    if (user?.householdId) {
      try {
        await householdService.update(user.householdId, { weekResetDay: day })
        reload()
      } catch (err) {
        console.error('Failed to update week reset day', err)
        setWeekResetDay(null)
      }
    }
  }

  const isPwa = window.matchMedia('(display-mode: standalone)').matches || (navigator as { standalone?: boolean }).standalone === true

  const [pushEnabled, setPushEnabled] = useState(false)
  const [pushPending, setPushPending] = useState(false)

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return
    navigator.serviceWorker.ready.then(async (reg) => {
      const sub = await reg.pushManager.getSubscription()
      setPushEnabled(sub !== null)
    })
  }, [])

  async function handlePushToggle(enable: boolean) {
    if (pushPending) return
    setPushPending(true)
    try {
      const reg = await navigator.serviceWorker.ready
      if (enable) {
        const { publicKey } = await notificationService.vapidPublicKey()
        const sub = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(publicKey),
        })
        await notificationService.subscribe(sub.toJSON())
        setPushEnabled(true)
      } else {
        const sub = await reg.pushManager.getSubscription()
        if (sub) {
          await sub.unsubscribe()
          await notificationService.unsubscribe()
        }
        setPushEnabled(false)
      }
    } catch (err) {
      console.error('Push toggle failed', err)
    } finally {
      setPushPending(false)
    }
  }

  async function handleGoalMealsBlur() {
    if (!user?.householdId) return
    const value = goalMeals.trim()
    const parsed = value === '' ? null : Math.min(14, Math.max(1, Number(value)))
    setGoalMeals(parsed != null ? String(parsed) : '')
    try {
      await householdService.update(user.householdId, { goalMealsPerWeek: parsed })
      reload()
    } catch (err) {
      console.error('Failed to update goal meals per week', err)
    }
  }

  // Notification settings
  const [notifSettings, setNotifSettings] = useState<UserNotifSettings>(DEFAULT_NOTIF_SETTINGS)
  const [mediumDaysInput, setMediumDaysInput] = useState<string>('')
  const notifSettingsLoaded = useRef(false)

  useEffect(() => {
    notificationService.getUserNotifSettings()
      .then(settings => {
        setNotifSettings(settings)
        setMediumDaysInput(settings.mediumTermDaysAhead != null ? String(settings.mediumTermDaysAhead) : '')
        notifSettingsLoaded.current = true
      })
      .catch(err => console.error('Failed to load notif settings', err))
  }, [])

  async function saveNotifSettings(updated: UserNotifSettings) {
    try {
      await notificationService.updateUserNotifSettings(updated)
    } catch (err) {
      console.error('Failed to save notif settings', err)
    }
  }

  function handleNotifToggle(key: keyof UserNotifSettings, value: boolean) {
    const updated = { ...notifSettings, [key]: value }
    setNotifSettings(updated)
    saveNotifSettings(updated)
  }

  async function handleReminderHourSelect(label: string) {
    const hour = labelToHour(label)
    const updated = { ...notifSettings, taskReminderHour: hour }
    setNotifSettings(updated)
    await saveNotifSettings(updated)
  }

  async function handleMediumDaysBlur() {
    const value = mediumDaysInput.trim()
    const parsed = value === '' ? null : Math.min(7, Math.max(1, Number(value)))
    const updated = { ...notifSettings, mediumTermDaysAhead: parsed }
    setNotifSettings(updated)
    await saveNotifSettings(updated)
  }

  async function handleCopyInviteCode() {
    if (!household?.joinCode) return
    const link = `${window.location.origin}/join?code=${household.joinCode}`
    await navigator.clipboard.writeText(link)
    toast.success('Invite link copied to clipboard')
  }

  const { isDark, toggle: toggleDark } = useTheme()

  const isAdmin = members.find(m => m.username === user?.username)?.role === 'admin'
  const [regeneratingCode, setRegeneratingCode] = useState(false)

  async function handleRegenerateJoinCode() {
    if (!user?.householdId) return
    setRegeneratingCode(true)
    try {
      await householdService.regenerateJoinCode(user.householdId)
      reload()
      toast.success('New invite code generated')
    } catch {
      toast.error('Failed to regenerate invite code')
    } finally {
      setRegeneratingCode(false)
    }
  }

  const [changePinOpen, setChangePinOpen] = useState(false)
  const [currentPin, setCurrentPin] = useState('')
  const [newPin, setNewPin] = useState('')
  const [confirmPin, setConfirmPin] = useState('')
  const [changePinError, setChangePinError] = useState<string | null>(null)
  const [changePinLoading, setChangePinLoading] = useState(false)

  function openChangePinModal() {
    setCurrentPin('')
    setNewPin('')
    setConfirmPin('')
    setChangePinError(null)
    setChangePinOpen(true)
  }

  async function handleChangePinSubmit(e: { preventDefault(): void }) {
    e.preventDefault()
    setChangePinError(null)
    const passwordError = validatePassword(newPin)
    if (passwordError) {
      setChangePinError(passwordError)
      return
    }
    if (newPin !== confirmPin) {
      setChangePinError('Passwords do not match.')
      return
    }
    setChangePinLoading(true)
    try {
      await authService.changePassword(currentPin, newPin)
      setChangePinOpen(false)
      toast.success('Password updated successfully')
    } catch {
      setChangePinError('Current password is incorrect.')
    } finally {
      setChangePinLoading(false)
    }
  }

  async function handleLogout() {
    try {
      await logout()
    } catch {
      // Clear client-side session regardless of API response
    }
    navigate('/')
  }

  return (
    <Layout title="Household Settings">
      <div className="pt-6 px-6 space-y-10 max-w-2xl mx-auto pb-4">

        {/* Members */}
        <section className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-headline font-bold text-xl text-on-surface">Household Members</h2>
            <button
              onClick={handleCopyInviteCode}
              className="text-primary font-semibold text-sm flex items-center gap-1 bg-primary-container/30 px-4 py-2 rounded-full hover:bg-primary-container/50 transition-colors active:scale-95"
            >
              <span className="material-symbols-outlined text-lg">share</span>
              Invite Code
            </button>
          </div>

          {/* Join code banner */}
          {household && (() => {
            const expiresAt = new Date(household.joinCodeExpiresAt)
            const isExpired = expiresAt <= new Date()
            const expiresLabel = isExpired
              ? 'Expired'
              : `Expires ${expiresAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at ${expiresAt.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`
            return (
              <div className={`rounded-xl p-4 flex items-center gap-3 border ${isExpired ? 'bg-error/5 border-error/20' : 'bg-surface-container-low border-outline-variant/10'}`}>
                <span className={`material-symbols-outlined ${isExpired ? 'text-error' : 'text-primary'}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                  vpn_key
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-on-surface-variant font-medium">Join Code</p>
                  <p className={`font-headline font-extrabold text-lg tracking-widest ${isExpired ? 'text-error/60 line-through' : 'text-primary'}`}>
                    {household.joinCode}
                  </p>
                  <p className={`text-xs font-medium mt-0.5 ${isExpired ? 'text-error' : 'text-on-surface-variant'}`}>
                    {expiresLabel}
                  </p>
                </div>
                {isAdmin && (
                  <button
                    onClick={handleRegenerateJoinCode}
                    disabled={regeneratingCode}
                    className="shrink-0 flex items-center gap-1 text-xs font-bold text-primary bg-primary-container/30 px-3 py-1.5 rounded-full hover:bg-primary-container/50 transition-colors active:scale-95 disabled:opacity-50"
                  >
                    <span className="material-symbols-outlined text-sm">refresh</span>
                    New Code
                  </button>
                )}
              </div>
            )
          })()}

          <div className="space-y-3">
            {members.map(member => {
              const isMe = member.username === user?.username
              return (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/10"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center">
                      <span className="font-headline font-bold text-on-secondary-container text-lg">
                        {member.username[0]}
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-on-surface">{member.username}</p>
                      <p className="text-sm text-on-surface-variant capitalize">
                        {member.role === 'admin' ? 'Household Admin' : 'Member'}
                      </p>
                    </div>
                  </div>
                  {isMe && (
                    <span className="text-xs font-bold px-2 py-1 bg-primary-container text-on-primary-container rounded-md">
                      YOU
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        {/* Household Settings */}
        <section className="space-y-4">
          <h2 className="font-headline font-bold text-lg text-on-surface">Household Settings</h2>
          <div className="bg-surface-container rounded-lg overflow-hidden">
            <button
              onClick={() => setWeekDaySheetOpen(true)}
              className="w-full p-4 flex items-center justify-between hover:bg-surface-container-high transition-colors cursor-pointer border-b border-outline-variant/10"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">calendar_month</span>
                <span className="font-medium">Week Start Day</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-on-surface-variant text-sm">{currentWeekDay}</span>
                <span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
              </div>
            </button>
            <div className="w-full p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">restaurant</span>
                <span className="font-medium">Goal Meals Per Week</span>
              </div>
              <input
                type="number"
                min={1}
                max={14}
                value={goalMeals}
                onChange={e => setGoalMeals(e.target.value)}
                onBlur={handleGoalMealsBlur}
                placeholder="—"
                className="w-16 text-right bg-surface-container-high rounded-lg px-3 py-1.5 text-on-surface font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
              />
            </div>
          </div>

          {/* Image generation usage meter */}
          {household && (
            <div className="bg-surface-container rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-base">auto_awesome</span>
                  <span className="font-medium text-sm">Image Generation This Month</span>
                </div>
                <span className="text-sm font-bold text-on-surface">
                  {household.monthlyImageBudget != null ? `${household.imageGenThisMonth} / ${household.monthlyImageBudget}` : `${household.imageGenThisMonth} / ∞`}
                </span>
              </div>
              {household.monthlyImageBudget === 0 ? (
                <p className="text-xs text-on-surface-variant italic">
                  Contact Brandon for an image generation budget increase.
                </p>
              ) : household.monthlyImageBudget != null ? (
                <>
                  <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        household.imageGenThisMonth >= household.monthlyImageBudget
                          ? 'bg-error'
                          : household.imageGenThisMonth / household.monthlyImageBudget > 0.8
                            ? 'bg-tertiary'
                            : 'bg-primary'
                      }`}
                      style={{ width: `${Math.min(100, (household.imageGenThisMonth / household.monthlyImageBudget) * 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-on-surface-variant">
                    {`Resets on ${new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`}
                  </p>
                </>
              ) : (
                <>
                  <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                    <div className="h-full w-full bg-primary/20 rounded-full" />
                  </div>
                  <p className="text-xs text-on-surface-variant">
                    {`Unlimited — resets on ${new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`}
                  </p>
                </>
              )}
            </div>
          )}
        </section>

        {/* Personal Preferences */}
        <section className="space-y-4">
          <h2 className="font-headline font-bold text-xl text-on-surface">Personal Preferences</h2>

          {/* Dark mode toggle */}
          <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl">
            <div className="flex flex-col pl-2">
              <span className="font-bold text-on-surface">Dark Mode</span>
              <span className="text-xs text-on-surface-variant">Switch to a darker color scheme</span>
            </div>
            <Toggle checked={isDark} onChange={toggleDark} />
          </div>

          {/* Push toggle */}
          {isPwa ? (
            <div className={`flex items-center justify-between p-4 bg-surface-container-low rounded-xl ${pushPending ? 'opacity-60' : ''}`}>
              <div className="flex flex-col pl-2">
                <span className="font-bold text-on-surface">Push Notifications</span>
                <span className="text-xs text-on-surface-variant">Allow alerts on this device</span>
              </div>
              <Toggle checked={pushEnabled} onChange={handlePushToggle} />
            </div>
          ) : (
            <div className="flex items-center gap-3 p-4 bg-secondary-container/40 rounded-xl border border-outline-variant/20">
              <span className="material-symbols-outlined text-secondary shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                install_mobile
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="font-bold text-on-surface text-sm">Push Notifications Unavailable</span>
                <span className="text-xs text-on-surface-variant leading-relaxed">
                  Add Digital Hearth to your home screen to enable push notifications.
                </span>
              </div>
            </div>
          )}

          {/* Reminder time + medium term days */}
          <div className="bg-surface-container rounded-lg overflow-hidden">
            <div className="p-4 flex items-center justify-between border-b border-outline-variant/10">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">schedule</span>
                <div>
                  <p className="font-medium">Daily Reminder Time</p>
                  <p className="text-xs text-on-surface-variant">Time to send daily task reminders</p>
                </div>
              </div>
              <button
                onClick={() => setReminderHourSheetOpen(true)}
                className="flex items-center gap-2 text-on-surface-variant text-sm"
              >
                <span>{hourToLabel(notifSettings.taskReminderHour)}</span>
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">pending_actions</span>
                <div>
                  <p className="font-medium">Medium Term Alert</p>
                  <p className="text-xs text-on-surface-variant">Days ahead for medium task reminders (1–7)</p>
                </div>
              </div>
              <input
                type="number"
                min={1}
                max={7}
                value={mediumDaysInput}
                onChange={e => setMediumDaysInput(e.target.value)}
                onBlur={handleMediumDaysBlur}
                placeholder="—"
                className="w-16 text-right bg-surface-container-high rounded-lg px-3 py-1.5 text-on-surface font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
              />
            </div>
          </div>

          {/* Notification type toggles */}
          <div className="space-y-3">
            {([
              {
                key: 'mealPlannerNotifs' as const,
                label: 'Meal Planner',
                sub: '36 hrs before week start if meals are missing',
              },
              {
                key: 'shortTermTaskNotifs' as const,
                label: 'Short Term Tasks',
                sub: 'Daily reminder of tasks due today',
              },
              {
                key: 'mediumTermTaskNotifs' as const,
                label: 'Medium Term Tasks',
                sub: 'Reminder when tasks are coming up soon',
              },
              {
                key: 'longTermTaskNotifs' as const,
                label: 'Long Term Tasks',
                sub: 'Reminder when long term tasks are approaching',
              },
              {
                key: 'taskCompletedNotifs' as const,
                label: 'Task Completed',
                sub: 'When a household member completes a task',
              },
            ] as const).map(item => (
              <div
                key={item.key}
                className={`flex items-center justify-between p-4 bg-surface-container-low rounded-xl transition-opacity ${!notifSettings[item.key] ? 'opacity-60' : ''}`}
              >
                <div className="flex flex-col pl-2">
                  <span className="font-bold text-on-surface">{item.label}</span>
                  <span className="text-xs text-on-surface-variant">{item.sub}</span>
                </div>
                <Toggle
                  checked={notifSettings[item.key]}
                  onChange={v => handleNotifToggle(item.key, v)}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Security */}
        <section className="space-y-4">
          <h2 className="font-headline font-bold text-xl text-on-surface">Security</h2>
          <div className="bg-surface-container-high rounded-lg p-6 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  lock_person
                </span>
                <div>
                  <p className="font-bold text-on-surface">Privacy Lock</p>
                  <p className="text-sm text-on-surface-variant">Manage your household access password</p>
                </div>
              </div>
              <button
                onClick={openChangePinModal}
                className="w-full bg-primary text-on-primary py-3 rounded-xl font-bold hover:shadow-lg transition-all active:scale-[0.98]"
              >
                Change Password
              </button>
            </div>
          </div>
        </section>

        {/* Danger zone */}
        <section className="pt-2 pb-4">
          <button
            onClick={() => setConfirmLogoutOpen(true)}
            className="w-full p-4 rounded-xl border-2 border-error/20 text-error font-bold flex items-center justify-center gap-2 hover:bg-error/5 transition-colors active:scale-[0.98]"
          >
            <span className="material-symbols-outlined">logout</span>
            Sign Out
          </button>
          <p className="text-center text-xs text-on-surface-variant/60 mt-4 font-medium italic">
            Digital Hearth · {household?.name ?? ''} · v{__APP_VERSION__}
          </p>
        </section>

      </div>
      {weekDaySheetOpen && (
        <SelectSheet
          title="Select Week Start Day"
          options={WEEK_DAYS}
          value={currentWeekDay}
          onSelect={handleWeekDaySelect}
          onClose={() => setWeekDaySheetOpen(false)}
        />
      )}
      {reminderHourSheetOpen && (
        <SelectSheet
          title="Daily Reminder Time"
          options={REMINDER_HOUR_OPTIONS}
          value={hourToLabel(notifSettings.taskReminderHour)}
          onSelect={handleReminderHourSelect}
          onClose={() => setReminderHourSheetOpen(false)}
        />
      )}
      {changePinOpen && (
        <div
          className="fixed inset-0 bg-on-surface/20 backdrop-blur-sm z-60 flex items-end justify-center"
          onClick={() => setChangePinOpen(false)}
        >
          <div
            className="bg-surface rounded-t-xl w-full max-w-xl shadow-2xl flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-12 h-1.5 bg-outline-variant/30 rounded-full" />
            </div>
            <div className="px-8 pt-4 pb-6 flex items-center justify-between">
              <h3 className="font-headline text-2xl font-bold text-on-surface">Change Password</h3>
              <button
                onClick={() => setChangePinOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors"
              >
                <span className="material-symbols-outlined text-on-surface-variant">close</span>
              </button>
            </div>
            <form onSubmit={handleChangePinSubmit} className="px-8 pb-10 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="current-pin" className="text-sm font-semibold text-on-surface-variant ml-1">Current Password</label>
                <input
                  id="current-pin"
                  type="password"
                  autoComplete="current-password"
                  value={currentPin}
                  onChange={e => setCurrentPin(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="bg-surface-container-high border-none rounded-xl px-4 py-3.5 text-on-surface font-medium placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="new-pin" className="text-sm font-semibold text-on-surface-variant ml-1">New Password</label>
                <input
                  id="new-pin"
                  type="password"
                  autoComplete="new-password"
                  value={newPin}
                  onChange={e => setNewPin(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="bg-surface-container-high border-none rounded-xl px-4 py-3.5 text-on-surface font-medium placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="confirm-pin" className="text-sm font-semibold text-on-surface-variant ml-1">Confirm New Password</label>
                <input
                  id="confirm-pin"
                  type="password"
                  autoComplete="new-password"
                  value={confirmPin}
                  onChange={e => setConfirmPin(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="bg-surface-container-high border-none rounded-xl px-4 py-3.5 text-on-surface font-medium placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
              {changePinError && (
                <p className="text-sm text-error font-medium text-center">{changePinError}</p>
              )}
              <button
                type="submit"
                disabled={changePinLoading}
                className="w-full py-4 rounded-xl bg-linear-to-r from-primary to-primary-dim text-on-primary font-headline font-bold text-base shadow-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-1 disabled:opacity-60"
              >
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {changePinLoading ? 'progress_activity' : 'lock_reset'}
                </span>
                {changePinLoading ? 'Updating…' : 'Update Password'}
              </button>
            </form>
          </div>
        </div>
      )}
      {confirmLogoutOpen && (
        <div
          className="fixed inset-0 bg-on-surface/20 backdrop-blur-sm z-60 flex items-end justify-center"
          onClick={() => setConfirmLogoutOpen(false)}
        >
          <div
            className="bg-surface rounded-t-xl w-full max-w-xl shadow-2xl p-8 flex flex-col gap-5"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-center">
              <div className="w-12 h-1.5 bg-outline-variant/30 rounded-full" />
            </div>
            <div className="flex flex-col gap-1 text-center">
              <h3 className="font-headline text-xl font-bold text-on-surface">Sign Out?</h3>
              <p className="text-sm text-on-surface-variant">
                You'll need your username and password to sign back in.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleLogout}
                className="w-full py-3.5 rounded-xl bg-error text-on-error font-bold active:scale-[0.98] transition-all"
              >
                Sign Out
              </button>
              <button
                onClick={() => setConfirmLogoutOpen(false)}
                className="w-full py-3.5 rounded-xl bg-surface-container font-bold text-on-surface active:scale-[0.98] transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}
