import { useState } from 'react'
import { DISCLAIMER_ACCEPTED_KEY } from '../constants/storage'

export default function DisclaimerModal() {
  const [visible, setVisible] = useState(() => !localStorage.getItem(DISCLAIMER_ACCEPTED_KEY))

  if (!visible) return null

  function accept() {
    localStorage.setItem(DISCLAIMER_ACCEPTED_KEY, '1')
    setVisible(false)
  }

  return (
    <div className="fixed inset-0 bg-on-surface/40 backdrop-blur-sm z-[100] flex items-end justify-center">
      <div className="bg-surface rounded-t-2xl w-full max-w-xl shadow-2xl px-8 pt-6 pb-10 flex flex-col gap-5">
        <div className="flex justify-center">
          <div className="w-12 h-1.5 bg-outline-variant/30 rounded-full" />
        </div>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              home_app_logo
            </span>
          </div>
          <h2 className="font-headline font-extrabold text-xl text-on-surface">A quick note</h2>
        </div>

        <div className="space-y-3 text-sm text-on-surface-variant leading-relaxed">
          <p>
            Digital Hearth is a <span className="font-semibold text-on-surface">personal project</span>, hosted on a personal server. It is shared with friends and family as a convenience.
          </p>
          <p>
            I make <span className="font-semibold text-on-surface">no promises about uptime, reliability, or data preservation</span>. Stuff might break. Data could be lost. Don't store anything critical here.
          </p>
          <p>
            By continuing you acknowledge this is provided as-is, with no warranties of any kind.
          </p>
          <p>
            By clicking accept it is implied, <span className="font-semibold text-on-surface">you agree you will not hold Brandon liable for personal heart ache</span>.
          </p>
        </div>

        <button
          onClick={accept}
          className="w-full py-4 rounded-xl bg-primary text-on-primary font-headline font-bold text-base active:scale-[0.98] transition-all"
        >
          Got it, let's go
        </button>
      </div>
    </div>
  )
}
