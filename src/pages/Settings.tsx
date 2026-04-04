import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import SelectSheet from '../components/SelectSheet'
import Toggle from '../components/Toggle'
import { useAuth } from '../contexts/AuthContext'
import { useHousehold } from '../contexts/HouseholdContext'
import { householdService } from '../services/household'
import { WEEK_DAYS } from '../constants/household'
import { notificationService } from '../services/notifications'
import { urlBase64ToUint8Array } from '../utils/encoding'
import { useToast } from '../contexts/ToastContext'

export default function Settings() {
  const { user, logout } = useAuth()
  const { household, members } = useHousehold()
  const navigate = useNavigate()
  const toast = useToast()

  const [weekDaySheetOpen, setWeekDaySheetOpen] = useState(false)
  const [weekResetDay, setWeekResetDay] = useState<string | null>(null)

  const currentWeekDay = weekResetDay ?? household?.weekResetDay ?? 'Monday'

  async function handleWeekDaySelect(day: string) {
    setWeekResetDay(day)
    if (user?.householdId) {
      try {
        await householdService.update(user.householdId, { weekResetDay: day })
      } catch (err) {
        console.error('Failed to update week reset day', err)
        setWeekResetDay(null)
      }
    }
  }

  const [mealReminders, setMealReminders] = useState(true)
  const [taskAssignments, setTaskAssignments] = useState(true)
  const [completedNotifs, setCompletedNotifs] = useState(false)

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

  async function handleCopyInviteCode() {
    if (!household?.joinCode) return
    await navigator.clipboard.writeText(household.joinCode)
    toast.success('Invite code copied to clipboard')
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
          {household && (
            <div className="bg-surface-container-low rounded-xl p-4 flex items-center gap-3 border border-outline-variant/10">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                vpn_key
              </span>
              <div>
                <p className="text-xs text-on-surface-variant font-medium">Join Code</p>
                <p className="font-headline font-extrabold text-lg text-primary tracking-widest">
                  {household.joinCode}
                </p>
              </div>
            </div>
          )}

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

        {/* General Settings */}
        <section className="space-y-4">
          <h2 className="font-headline font-bold text-xl text-on-surface">Household Settings</h2>
          <div className="bg-surface-container rounded-xl overflow-hidden">
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
          </div>
        </section>

        {/* Notification Preferences */}
        <section className="space-y-4">
          <h2 className="font-headline font-bold text-xl text-on-surface">Personal Preferences</h2>
          <div className="space-y-3">
            <div className={`flex items-center justify-between p-4 bg-surface-container-low rounded-xl ${pushPending ? 'opacity-60' : ''}`}>
              <div className="flex flex-col">
                <span className="font-bold text-on-surface">Push Notifications</span>
                <span className="text-xs text-on-surface-variant">Allow alerts on this device</span>
              </div>
              <Toggle checked={pushEnabled} onChange={handlePushToggle} />
            </div>
            {[
              {
                label: 'Meal Prep Reminders',
                sub: 'Alerts 2 hours before scheduled meal',
                checked: mealReminders,
                onChange: setMealReminders,
              },
              {
                label: 'Task Assignments',
                sub: 'When someone assigns you a chore',
                checked: taskAssignments,
                onChange: setTaskAssignments,
              },
              {
                label: 'Completed Tasks',
                sub: 'When a family member finishes a task',
                checked: completedNotifs,
                onChange: setCompletedNotifs,
              },
            ].map(item => (
              <div
                key={item.label}
                className={`flex items-center justify-between p-4 bg-surface-container-low rounded-xl transition-opacity ${!item.checked ? 'opacity-60' : ''}`}
              >
                <div className="flex flex-col">
                  <span className="font-bold text-on-surface">{item.label}</span>
                  <span className="text-xs text-on-surface-variant">{item.sub}</span>
                </div>
                <Toggle checked={item.checked} onChange={item.onChange} />
              </div>
            ))}
          </div>
        </section>

        {/* Security */}
        <section className="space-y-4">
          <h2 className="font-headline font-bold text-xl text-on-surface">Security</h2>
          <div className="bg-surface-container-high rounded-xl p-6 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  lock_person
                </span>
                <div>
                  <p className="font-bold text-on-surface">Privacy Lock</p>
                  <p className="text-sm text-on-surface-variant">Manage your 4-digit household access PIN</p>
                </div>
              </div>
              <button className="w-full bg-primary text-on-primary py-3 rounded-xl font-bold hover:shadow-lg transition-all active:scale-[0.98]">
                Change Access PIN
              </button>
            </div>
          </div>
        </section>

        {/* Danger zone */}
        <section className="pt-2 pb-4">
          <button
            onClick={handleLogout}
            className="w-full p-4 rounded-xl border-2 border-error/20 text-error font-bold flex items-center justify-center gap-2 hover:bg-error/5 transition-colors active:scale-[0.98]"
          >
            <span className="material-symbols-outlined">logout</span>
            Sign Out
          </button>
          <p className="text-center text-xs text-on-surface-variant/60 mt-4 font-medium italic">
            Digital Hearth · {household?.name ?? ''}
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
    </Layout>
  )
}
