import { useEffect, useRef, useState } from 'react'
import { profile, stats, sides, projects, experience, skillGroups, education } from './data'
import { projectArt, NeuralArt, BrowserArt } from './components/Art'
import GitHub from './components/GitHub'

/* ───────── icons ───────── */
const Icon = {
  arrow: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>),
  arrowUpRight: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M7 17 17 7M8 7h9v9" /></svg>),
  download: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 4v11m0 0-4-4m4 4 4-4M5 20h14" /></svg>),
  mail: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4 7 8 6 8-6" /></svg>),
  linkedin: (p) => (<svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4V21H3V9.5Zm7 0h3.8v1.6h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.2c0-1.24-.02-2.84-1.73-2.84-1.73 0-2 1.35-2 2.75V21h-4V9.5Z" /></svg>),
  github: (p) => (<svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" /></svg>),
  copy: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V6a2 2 0 0 1 2-2h9" /></svg>),
  check: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m5 12 5 5 9-10" /></svg>),
  spark: (p) => (<svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z" /></svg>),
}

/* ───────── hooks ───────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add('in'), io.unobserve(e.target))),
      { threshold: 0.12 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function useTypewriter(words, speed = 70, pause = 1600) {
  const [text, setText] = useState('')
  const [i, setI] = useState(0)
  const [del, setDel] = useState(false)
  useEffect(() => {
    const word = words[i % words.length]
    if (!del && text === word) { const t = setTimeout(() => setDel(true), pause); return () => clearTimeout(t) }
    if (del && text === '') { setDel(false); setI((n) => n + 1); return }
    const t = setTimeout(() => setText(del ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)), del ? speed / 2 : speed)
    return () => clearTimeout(t)
  }, [text, del, i, words, speed, pause])
  return text
}

/* ───────── small bits ───────── */
function SectionHead({ eyebrow, title, sub }) {
  return (
    <div className="reveal mb-12 max-w-2xl">
      <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cobalt ring-1 ring-soft">
        <Icon.spark className="h-3 w-3" /> {eyebrow}
      </p>
      <h2 className="font-display text-4xl font-bold tracking-tight text-navy md:text-5xl">{title}</h2>
      {sub && <p className="mt-4 text-lg leading-relaxed text-navy/70">{sub}</p>}
    </div>
  )
}

const Pill = ({ children, strong }) => (
  <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors ${strong ? 'bg-cobalt text-white' : 'bg-ice text-cobalt ring-1 ring-soft hover:bg-cobalt hover:text-white'}`}>
    {children}
  </span>
)

/* ───────── nav ───────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 24)
    f(); window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])
  const links = [['About', '#about'], ['Work', '#work'], ['GitHub', '#github'], ['Experience', '#experience'], ['Skills', '#skills'], ['Contact', '#contact']]
  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <nav className={`mx-auto flex max-w-5xl items-center justify-between rounded-full px-3 py-2 transition-all duration-500 ${scrolled ? 'glass' : 'bg-transparent'}`}>
        <a href="#top" className="flex items-center gap-2 pl-1">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-cobalt font-display text-sm font-bold text-ice">NY</span>
          <span className="hidden font-display font-semibold sm:block">{profile.firstName}</span>
        </a>
        <div className="hidden items-center gap-1 md:flex">
          {links.map(([l, h]) => (
            <a key={h} href={h} className="rounded-full px-4 py-2 text-sm font-medium text-navy/75 transition hover:bg-white hover:text-cobalt">{l}</a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <a href={profile.resume} target="_blank" rel="noreferrer" className="rounded-full bg-navy px-4 py-2 text-sm font-semibold text-ice transition hover:bg-cobalt">Resume</a>
          <button aria-label="Menu" onClick={() => setOpen(!open)} className="grid h-9 w-9 place-items-center rounded-full bg-white md:hidden">
            <span className="space-y-1"><span className="block h-0.5 w-4 bg-navy" /><span className="block h-0.5 w-4 bg-navy" /></span>
          </button>
        </div>
      </nav>
      {open && (
        <div className="glass mx-auto mt-2 flex max-w-5xl flex-col rounded-3xl p-2 md:hidden">
          {links.map(([l, h]) => (
            <a key={h} href={h} onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 font-medium hover:bg-white">{l}</a>
          ))}
        </div>
      )}
    </header>
  )
}

/* ───────── hero ───────── */
function Avatar() {
  const [failed, setFailed] = useState(false)
  if (!profile.photo || failed) {
    return <div className="grid h-24 w-24 shrink-0 place-items-center rounded-3xl bg-gradient-to-br from-cobalt to-steel font-display text-3xl font-bold text-white shadow-lg">NY</div>
  }
  return (
    <div className="h-24 w-24 shrink-0 rounded-3xl bg-gradient-to-br from-cobalt to-steel p-[3px] shadow-lg">
      <img src={profile.photo} alt={profile.name} onError={() => setFailed(true)}
        className="h-full w-full rounded-[1.3rem] object-cover object-top" />
    </div>
  )
}

function Hero() {
  const typed = useTypewriter(profile.taglines)
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 70, y: 30 })
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 })
  }
  return (
    <section id="top" ref={ref} onMouseMove={onMove} className="dot-grid relative flex min-h-screen items-center overflow-hidden pb-20 pt-32">
      <div className="pointer-events-none absolute inset-0 transition-[background] duration-300"
        style={{ background: `radial-gradient(600px circle at ${pos.x}% ${pos.y}%, rgba(86,143,199,0.18), transparent 60%)` }} />
      <div className="blob -right-24 -top-24 h-[480px] w-[480px] bg-soft/70" />
      <div className="blob bottom-0 right-1/3 h-72 w-72 bg-steel/25" style={{ animationDelay: '-6s' }} />
      <div className="blob -left-32 top-1/2 h-80 w-80 bg-soft/50" style={{ animationDelay: '-3s' }} />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-16 px-6 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <div className="reveal mb-6 inline-flex items-center gap-2 rounded-full bg-white/80 py-1.5 pl-2 pr-4 text-sm ring-1 ring-soft">
            <span className="relative grid h-5 w-5 place-items-center"><span className="pulse-dot relative h-2 w-2 rounded-full bg-cobalt" /></span>
            Now: Data Scientist Intern · CSRE, IIT Bombay
          </div>
          <h1 className="reveal font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-navy sm:text-6xl lg:text-7xl">
            Hi, I'm <span className="text-grad">{profile.firstName}</span>.
            <span className="mt-3 block text-3xl font-bold text-navy/85 sm:text-4xl lg:text-5xl">
              I build <span className="text-cobalt">{typed}</span><span className="caret" />
            </span>
          </h1>
          <p className="reveal mt-7 max-w-xl text-lg leading-relaxed text-navy/70">{profile.intro}</p>
          <div className="reveal mt-9 flex flex-wrap items-center gap-3">
            <a href="#work" className="group inline-flex items-center gap-2 rounded-full bg-cobalt px-6 py-3.5 font-semibold text-white shadow-[0_14px_30px_-12px_rgba(36,85,181,.7)] transition hover:-translate-y-0.5 hover:bg-navy">
              View my work <Icon.arrow className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
            <a href={profile.resume} download className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-semibold text-navy ring-1 ring-soft transition hover:-translate-y-0.5 hover:ring-cobalt">
              <Icon.download className="h-4 w-4" /> Resume
            </a>
            <div className="ml-1 flex gap-2">
              <a aria-label="LinkedIn" href={profile.linkedin} target="_blank" rel="noreferrer" className="grid h-12 w-12 place-items-center rounded-full bg-white text-navy ring-1 ring-soft transition hover:bg-cobalt hover:text-white"><Icon.linkedin className="h-5 w-5" /></a>
              {profile.github && <a aria-label="GitHub" href={profile.github} target="_blank" rel="noreferrer" className="grid h-12 w-12 place-items-center rounded-full bg-white text-navy ring-1 ring-soft transition hover:bg-cobalt hover:text-white"><Icon.github className="h-5 w-5" /></a>}
              <a aria-label="Email" href={`mailto:${profile.email}`} className="grid h-12 w-12 place-items-center rounded-full bg-white text-navy ring-1 ring-soft transition hover:bg-cobalt hover:text-white"><Icon.mail className="h-5 w-5" /></a>
            </div>
          </div>
        </div>

        {/* right: layered card composition */}
        <div className="reveal relative mx-auto w-full max-w-md">
          <div className="absolute -inset-6 rotate-6 rounded-[2.5rem] bg-gradient-to-br from-soft to-steel/40" />
          <div className="glass relative rounded-[2rem] p-7">
            <div className="flex items-center gap-4">
              <Avatar />
              <div>
                <p className="font-display text-xl font-bold">{profile.name}</p>
                <p className="text-sm text-navy/70">Full-Stack · AI/ML</p>
                <p className="mt-1 text-xs text-navy/55">{profile.location}</p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {stats.map((s) => (
                <div key={s.label} className="rounded-2xl bg-white/80 p-3 text-center ring-1 ring-soft/70">
                  <p className="font-display text-2xl font-extrabold text-cobalt">{s.value}</p>
                  <p className="mt-0.5 text-[11px] leading-tight text-navy/65">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-2xl bg-navy p-4 text-ice">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-soft">model.train()</span>
                <span className="rounded-full bg-cobalt px-2 py-0.5 text-[10px] font-semibold">epoch 42</span>
              </div>
              <svg viewBox="0 0 200 50" className="mt-2 h-12 w-full">
                <path id="loss" d="M2 6 C 30 10, 40 30, 70 34 S 120 42, 198 44" fill="none" stroke="#568FC7" strokeWidth="2.5" strokeLinecap="round" />
                <circle r="4" fill="#EAF3FA"><animateMotion dur="4s" repeatCount="indefinite"><mpath href="#loss" /></animateMotion></circle>
              </svg>
              <p className="font-mono text-[11px] text-soft">loss ↓ · learning, always</p>
            </div>
          </div>
          {[
            ['PyTorch', '-left-24 -top-4', '0s'],
            ['Next.js', '-right-14 top-[38%]', '-2s'],
            ['Flask', '-left-20 bottom-28', '-4s'],
            ['MongoDB', 'right-6 -bottom-8', '-1s'],
          ].map(([t, cls, d]) => (
            <span key={t} className={`chip-float glass absolute ${cls} hidden rounded-full px-4 py-2 text-sm font-semibold text-cobalt sm:inline-block`} style={{ animationDelay: d }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      <a href="#about" className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs font-medium text-navy/60 md:flex">
        scroll
        <span className="flex h-9 w-5 justify-center rounded-full ring-2 ring-navy/30"><span className="chip-float mt-1.5 h-2 w-1 rounded-full bg-cobalt" /></span>
      </a>
    </section>
  )
}

function Marquee() {
  const items = ['Python', 'PyTorch', 'React', 'Next.js', 'Flask', 'MongoDB', 'Scikit-learn', 'NLP', 'Tailwind CSS', 'REST APIs', 'Java', 'LLMs', 'ESP32', 'Deep Learning']
  const row = [...items, ...items]
  return (
    <div className="marquee overflow-hidden border-y border-soft/70 bg-white/60 py-5">
      <div className="marquee-track gap-10">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap font-display text-xl font-semibold text-navy/80">
            {t} <Icon.spark className="h-3.5 w-3.5 text-steel" />
          </span>
        ))}
      </div>
    </div>
  )
}

/* ───────── two sides ───────── */
function Sides() {
  const [active, setActive] = useState('ai')
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHead eyebrow="What I do" title={<>Two sides, <span className="text-grad">one builder.</span></>}
        sub="I like owning the whole path — from training a model to shipping the product around it." />
      <div className="flex flex-col gap-5 lg:flex-row">
        {sides.map((s) => {
          const on = active === s.key
          return (
            <div key={s.key} onMouseEnter={() => setActive(s.key)}
              className={`reveal relative overflow-hidden rounded-[2rem] p-8 transition-all duration-700 ease-out lg:min-h-[420px] ${on ? 'bg-navy text-ice lg:flex-[1.5]' : 'soft-card lg:flex-1'}`}>
              <div className={`absolute -right-16 -top-16 h-56 w-56 rounded-full transition-colors duration-700 ${on ? 'bg-cobalt/40' : 'bg-ice'}`} />
              <div className="relative flex h-full flex-col">
                <p className={`text-sm font-semibold uppercase tracking-[0.2em] ${on ? 'text-soft' : 'text-cobalt'}`}>{s.key === 'ai' ? '01' : '02'}</p>
                <h3 className="mt-2 font-display text-4xl font-bold">{s.title}</h3>
                <p className={`mt-3 max-w-md leading-relaxed ${on ? 'text-ice/80' : 'text-navy/70'}`}>{s.blurb}</p>
                <div className={`my-6 h-36 max-w-sm rounded-2xl p-3 ${on ? 'bg-white/5' : 'bg-ice'}`}>
                  {s.key === 'ai' ? <NeuralArt /> : <BrowserArt />}
                </div>
                <div className="mt-auto flex flex-wrap gap-2">
                  {s.items.map((t) => (
                    <span key={t} className={`rounded-full px-3 py-1 text-xs font-medium ${on ? 'bg-white/10 text-ice ring-1 ring-white/20' : 'bg-ice text-cobalt ring-1 ring-soft'}`}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

/* ───────── projects ───────── */
function Projects() {
  return (
    <section id="work" className="relative bg-white/50 py-28">
      <div className="dot-grid absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHead eyebrow="Selected work" title={<>Things I've <span className="text-grad">built.</span></>}
          sub="Full-stack platforms, real-time systems and ML pipelines — each one shipped end to end." />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => {
            const Art = projectArt[p.art]
            return (
              <article key={p.name} className={`soft-card reveal group flex flex-col overflow-hidden rounded-[2rem] ${p.featured ? 'md:col-span-2' : ''}`}
                style={{ transitionDelay: `${i * 60}ms` }}>
                <div className={`relative overflow-hidden bg-ice ${p.featured ? 'h-56' : 'h-44'}`}>
                  <Art />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 font-mono text-xs font-semibold text-navy">0{i + 1}</span>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cobalt">{p.kind}</p>
                  <h3 className="mt-2 flex items-center justify-between gap-3 font-display text-2xl font-bold">
                    {p.name}
                    <span className="flex shrink-0 gap-2">
                      {p.live && p.link && (
                        <a href={p.link} target="_blank" rel="noreferrer" aria-label={`${p.name} on GitHub`} className="grid h-10 w-10 place-items-center rounded-full bg-ice text-navy ring-1 ring-soft transition hover:bg-navy hover:text-white">
                          <Icon.github className="h-4 w-4" />
                        </a>
                      )}
                      {(p.live || p.link) && (
                        <a href={p.live || p.link} target="_blank" rel="noreferrer" aria-label={p.live ? `Open ${p.name} live site` : `Open ${p.name}`} className="grid h-10 w-10 place-items-center rounded-full bg-ice text-cobalt transition group-hover:bg-cobalt group-hover:text-white">
                          <Icon.arrowUpRight className="h-4 w-4" />
                        </a>
                      )}
                    </span>
                  </h3>
                  <p className="mt-3 leading-relaxed text-navy/70">{p.description}</p>
                  <ul className={`mt-4 space-y-1.5 text-sm text-navy/80 ${p.featured ? 'sm:grid sm:grid-cols-3 sm:gap-3 sm:space-y-0' : ''}`}>
                    {p.points.map((pt) => (
                      <li key={pt} className="flex gap-2"><Icon.check className="mt-0.5 h-4 w-4 shrink-0 text-cobalt" />{pt}</li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-wrap gap-2 pt-6">
                    {p.tech.map((t) => <Pill key={t}>{t}</Pill>)}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ───────── experience ───────── */
function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-28">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHead eyebrow="Experience" title={<>Where I've <span className="text-grad">learned.</span></>}
            sub="Research labs, open source and community work — each one sharpened how I build." />
        </div>
        <ol className="relative space-y-6 before:absolute before:bottom-4 before:left-[15px] before:top-4 before:w-0.5 before:bg-gradient-to-b before:from-cobalt before:via-steel before:to-soft">
          {experience.map((e) => (
            <li key={e.role + e.org} className="reveal relative pl-12">
              <span className={`absolute left-0 top-7 grid h-8 w-8 place-items-center rounded-full ring-4 ring-ice ${e.now ? 'bg-cobalt' : 'bg-white ring-offset-0'}`}>
                <span className={`relative h-2.5 w-2.5 rounded-full ${e.now ? 'pulse-dot bg-white' : 'bg-steel'}`} />
              </span>
              <div className="soft-card rounded-3xl p-6">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="font-display text-xl font-bold">{e.role}</h3>
                    <p className="text-navy/70">{e.org}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${e.now ? 'bg-cobalt text-white' : 'bg-ice text-cobalt ring-1 ring-soft'}`}>{e.period}</span>
                </div>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-navy/75">
                  {e.points.map((pt) => <li key={pt} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-steel" />{pt}</li>)}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ───────── skills + education ───────── */
function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden bg-white/50 py-28">
      <div className="blob -left-20 top-10 h-72 w-72 bg-soft/50" />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHead eyebrow="Toolkit" title={<>Skills & <span className="text-grad">stack.</span></>} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, i) => (
            <div key={g.title} className="glass reveal rounded-3xl p-6 transition hover:-translate-y-1" style={{ transitionDelay: `${i * 50}ms` }}>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display text-lg font-bold">{g.title}</h3>
                <span className="font-mono text-xs text-navy/50">{String(g.items.length).padStart(2, '0')}</span>
              </div>
              <div className="flex flex-wrap gap-2">{g.items.map((t) => <Pill key={t}>{t}</Pill>)}</div>
            </div>
          ))}
        </div>

        <h3 className="reveal mb-6 mt-20 font-display text-2xl font-bold">Education</h3>
        <div className="grid gap-5 md:grid-cols-[1.4fr_1fr_1fr]">
          {education.map((ed, i) => (
            <div key={ed.title} className={`reveal rounded-3xl p-6 ${i === 0 ? 'bg-gradient-to-br from-cobalt to-navy text-ice' : 'soft-card'}`}>
              <p className={`font-display text-4xl font-extrabold ${i === 0 ? 'text-white' : 'text-cobalt'}`}>{ed.score}</p>
              <p className="mt-4 font-semibold">{ed.title}</p>
              <p className={`text-sm ${i === 0 ? 'text-ice/75' : 'text-navy/65'}`}>{ed.place}</p>
              {ed.period && <p className="mt-3 inline-block rounded-full bg-white/15 px-3 py-1 text-xs">{ed.period}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────── contact ───────── */
function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try { await navigator.clipboard.writeText(profile.email); setCopied(true); setTimeout(() => setCopied(false), 1800) } catch { /* ignore */ }
  }
  return (
    <section id="contact" className="px-4 py-24">
      <div className="reveal relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-navy px-8 py-20 text-center text-ice md:px-16">
        <div className="blob -left-20 -top-20 h-80 w-80 bg-cobalt/50" />
        <div className="blob -bottom-24 -right-10 h-96 w-96 bg-steel/30" style={{ animationDelay: '-5s' }} />
        <div className="dot-grid absolute inset-0 opacity-30" />
        <div className="relative">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-soft">Get in touch</p>
          <h2 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
            Let's build something <span className="text-soft">together.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-ice/75">Internships, collaborations or just a chat about AI and the web — my inbox is open.</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 rounded-full bg-cobalt px-7 py-4 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-steel">
              <Icon.mail className="h-5 w-5" /> Say hello
            </a>
            <button onClick={copy} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-4 font-medium text-ice ring-1 ring-white/20 transition hover:bg-white/20">
              {copied ? <Icon.check className="h-4 w-4" /> : <Icon.copy className="h-4 w-4" />}
              {copied ? 'Copied!' : profile.email}
            </button>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-4 font-medium text-ice ring-1 ring-white/20 transition hover:bg-white/20">
              <Icon.linkedin className="h-4 w-4" /> LinkedIn
            </a>
          </div>
        </div>
      </div>
      <footer className="mx-auto mt-10 flex max-w-6xl flex-col items-center justify-between gap-2 px-4 text-sm text-navy/60 sm:flex-row">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <p>Designed & built with React + Tailwind</p>
      </footer>
    </section>
  )
}

export default function App() {
  useReveal()
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Sides />
        <Projects />
        <GitHub />
        <Experience />
        <Skills />
        <Contact />
      </main>
    </>
  )
}
