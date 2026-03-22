export default function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div
      role="switch"
      aria-checked={checked}
      className={`toggle-track ${checked ? 'checked' : ''}`}
      onClick={() => onChange(!checked)}
    >
      <div className="toggle-thumb" />
    </div>
  )
}
