// Small animated illustrations used on cards — pure SVG/CSS, no images needed.

export function RouteArt() {
  return (
    <div className="relative h-full w-full">
      <svg viewBox="0 0 400 200" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="streets" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" fill="none" stroke="#BBD7EC" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="400" height="200" fill="url(#streets)" />
        <rect x="70" y="30" width="70" height="40" rx="8" fill="#BBD7EC" opacity=".45" />
        <rect x="250" y="120" width="90" height="50" rx="8" fill="#BBD7EC" opacity=".45" />
        <path id="route" d="M40 150 C 110 150, 110 90, 190 95 S 290 40, 360 50"
          fill="none" stroke="#2455B5" strokeWidth="3" strokeLinecap="round" strokeDasharray="2 9" />
        <circle cx="40" cy="150" r="7" fill="#fff" stroke="#2455B5" strokeWidth="3" />
        <circle cx="360" cy="50" r="9" fill="#2455B5" />
        <circle cx="360" cy="50" r="16" fill="#2455B5" opacity=".18" />
        <circle r="8" fill="#142A4A">
          <animateMotion dur="5s" repeatCount="indefinite" rotate="auto">
            <mpath href="#route" />
          </animateMotion>
        </circle>
      </svg>
      <div className="glass absolute bottom-4 right-4 rounded-2xl px-4 py-3 text-xs">
        <p className="font-semibold text-navy">Order #1042</p>
        <p className="mt-0.5 flex items-center gap-1.5 text-cobalt">
          <span className="h-1.5 w-1.5 rounded-full bg-cobalt" /> Out for delivery
        </p>
      </div>
      <div className="glass absolute left-16 top-4 max-w-[190px] rounded-2xl rounded-tl-sm px-3 py-2 text-xs text-navy">
        Hi! Where's my order? <span className="text-cobalt">· AI support</span>
      </div>
    </div>
  )
}

export function EcgArt() {
  const d = 'M0 60 L60 60 L70 52 L80 60 L95 60 L102 20 L110 95 L118 60 L140 60 L152 48 L165 60 L200 60 L260 60 L270 52 L280 60 L295 60 L302 20 L310 95 L318 60 L340 60 L352 48 L365 60 L400 60'
  return (
    <div className="relative h-full w-full">
      <svg viewBox="0 0 400 120" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        {[20, 40, 60, 80, 100].map((y) => (
          <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="#BBD7EC" strokeWidth=".6" />
        ))}
        <path d={d} fill="none" stroke="#BBD7EC" strokeWidth="2" />
        <path d={d} className="ecg-path" fill="none" stroke="#2455B5" strokeWidth="2.5" strokeLinejoin="round" />
      </svg>
      <div className="glass absolute right-4 top-4 rounded-2xl px-3 py-2 text-xs">
        <p className="text-navy/70">Heart rate</p>
        <p className="font-display text-lg font-bold text-cobalt">72 <span className="text-xs font-medium">bpm</span></p>
      </div>
    </div>
  )
}

export function WaveArt() {
  const bars = [0.5, 0.8, 0.4, 1, 0.6, 0.9, 0.3, 0.7, 1, 0.5, 0.8, 0.4, 0.9, 0.6, 0.35, 0.75]
  return (
    <div className="relative flex h-full w-full items-center justify-center gap-1.5 px-6">
      {bars.map((h, i) => (
        <span
          key={i}
          className="bar w-2 rounded-full"
          style={{ height: `${h * 70}%`, background: i % 3 === 0 ? '#2455B5' : i % 3 === 1 ? '#568FC7' : '#BBD7EC', animationDelay: `${i * 0.08}s` }}
        />
      ))}
      <div className="glass absolute bottom-3 left-3 rounded-xl px-3 py-1.5 text-xs text-navy">
        <span className="font-semibold text-cobalt">Analysing</span> answer…
      </div>
    </div>
  )
}

export function EyeArt() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <svg viewBox="0 0 120 120" className="h-[78%]">
        <circle cx="60" cy="60" r="54" fill="none" stroke="#BBD7EC" strokeWidth="1.5" strokeDasharray="3 6" className="spin-slow" />
        <circle cx="60" cy="60" r="40" fill="#BBD7EC" opacity=".55" />
        <circle cx="60" cy="60" r="26" fill="#568FC7" opacity=".7" />
        <circle cx="60" cy="60" r="12" fill="#142A4A" />
        <circle cx="54" cy="54" r="4" fill="#fff" />
        <g className="scan"><rect x="12" y="59" width="96" height="2" rx="1" fill="#2455B5" /></g>
      </svg>
      <div className="absolute bottom-3 left-3 flex gap-1.5 text-[10px] font-semibold">
        {['CNV', 'DME', 'Drusen', 'Normal'].map((c, i) => (
          <span key={c} className={`rounded-full px-2 py-0.5 ${i === 3 ? 'bg-cobalt text-white' : 'bg-white/80 text-navy'}`}>{c}</span>
        ))}
      </div>
    </div>
  )
}

export function NeuralArt() {
  const layers = [[30, 70, 110], [20, 55, 90, 125], [45, 95]]
  const xs = [30, 110, 190]
  const lines = []
  layers.forEach((col, li) => {
    if (li === layers.length - 1) return
    col.forEach((y1) => layers[li + 1].forEach((y2) => lines.push([xs[li], y1, xs[li + 1], y2])))
  })
  return (
    <svg viewBox="0 0 220 145" className="h-full w-full">
      {lines.map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#568FC7" strokeOpacity=".35" strokeWidth="1">
          <animate attributeName="stroke-opacity" values=".15;.8;.15" dur="3s" begin={`${(i % 7) * 0.35}s`} repeatCount="indefinite" />
        </line>
      ))}
      {layers.map((col, li) => col.map((y) => (
        <circle key={`${li}-${y}`} cx={xs[li]} cy={y} r="8" fill={li === 2 ? '#2455B5' : '#fff'} stroke="#2455B5" strokeWidth="2" />
      )))}
    </svg>
  )
}

export function BrowserArt() {
  return (
    <div className="h-full w-full overflow-hidden rounded-xl border border-soft bg-white text-[10px]">
      <div className="flex items-center gap-1.5 border-b border-soft bg-ice px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-soft" /><span className="h-2 w-2 rounded-full bg-steel" /><span className="h-2 w-2 rounded-full bg-cobalt" />
        <span className="ml-2 flex-1 rounded-full bg-white px-2 py-0.5 text-navy/60">api/orders</span>
      </div>
      <div className="grid grid-cols-[1fr_1.4fr] gap-2 p-3">
        <div className="space-y-1.5">
          <div className="h-2 w-4/5 rounded bg-soft" /><div className="h-2 w-3/5 rounded bg-ice" />
          <div className="h-2 w-full rounded bg-ice" /><div className="h-6 w-2/3 rounded-md bg-cobalt" />
        </div>
        <pre className="rounded-md bg-navy p-2 font-mono leading-relaxed text-ice">{`GET /orders
200 OK
{ "status":
  "shipped" }`}</pre>
      </div>
    </div>
  )
}

export const projectArt = { cart: RouteArt, ecg: EcgArt, wave: WaveArt, eye: EyeArt }
