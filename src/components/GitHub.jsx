import { useEffect, useMemo, useState } from 'react'
import { profile } from '../data'

// Live data from GitHub's public API — updates on its own, no redeploy needed.
// Unauthenticated API allows 60 requests/hour per visitor; results are cached per session.

const LANG_COLORS = ['#2455B5', '#568FC7', '#142A4A', '#BBD7EC', '#7FA9D6', '#3A6FC0']
const LEVEL = ['#FFFFFF', '#BBD7EC', '#568FC7', '#2455B5', '#142A4A']

async function cached(key, url) {
  try {
    const hit = sessionStorage.getItem(key)
    if (hit) return JSON.parse(hit)
  } catch { /* storage unavailable */ }
  const res = await fetch(url)
  if (!res.ok) throw new Error(res.status)
  const data = await res.json()
  try { sessionStorage.setItem(key, JSON.stringify(data)) } catch { /* ignore */ }
  return data
}

function timeAgo(iso) {
  const s = (Date.now() - new Date(iso)) / 1000
  const u = [['year', 31536000], ['month', 2592000], ['week', 604800], ['day', 86400], ['hour', 3600], ['minute', 60]]
  for (const [n, sec] of u) if (s >= sec) { const v = Math.floor(s / sec); return `${v} ${n}${v > 1 ? 's' : ''} ago` }
  return 'just now'
}

const Star = (p) => (<svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" /></svg>)
const Fork = (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}><circle cx="6" cy="5" r="2" /><circle cx="18" cy="5" r="2" /><circle cx="12" cy="19" r="2" /><path d="M6 7v2a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V7M12 12v5" /></svg>)
const Repo = (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 4.5A2.5 2.5 0 0 1 7.5 2H19v16H7.5A2.5 2.5 0 0 0 5 20.5v-16Z" /><path d="M5 20.5A2.5 2.5 0 0 0 7.5 23H19v-5" /></svg>)
const GhIcon = (p) => (<svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" /></svg>)

const pretty = (name) => name.replace(/[_-]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

export default function GitHub() {
  const user = profile.githubUser
  const [repos, setRepos] = useState(null)
  const [contrib, setContrib] = useState(null)
  const [event, setEvent] = useState(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    cached(`gh-repos-${user}`, `https://api.github.com/users/${user}/repos?per_page=100&sort=updated`)
      .then(setRepos).catch(() => setFailed(true))
    cached(`gh-contrib-${user}`, `https://github-contributions-api.jogruber.de/v4/${user}?y=last`)
      .then(setContrib).catch(() => setContrib(false))
    cached(`gh-events-${user}`, `https://api.github.com/users/${user}/events/public?per_page=30`)
      .then((ev) => setEvent(ev.find((e) => e.type === 'PushEvent') || ev[0] || false))
      .catch(() => setEvent(false))
  }, [user])

  const own = useMemo(() => (repos || []).filter((r) => !r.fork), [repos])

  const pinned = useMemo(() => {
    if (!repos) return profile.pinnedRepos.map((name) => ({ name, placeholder: true }))
    const byName = Object.fromEntries(repos.map((r) => [r.name.toLowerCase(), r]))
    const picked = profile.pinnedRepos.map((n) => byName[n.toLowerCase()]).filter(Boolean)
    return picked.length ? picked : own.slice(0, 6)
  }, [repos, own])

  const langs = useMemo(() => {
    const c = {}
    own.forEach((r) => r.language && (c[r.language] = (c[r.language] || 0) + 1))
    const total = Object.values(c).reduce((a, b) => a + b, 0) || 1
    return Object.entries(c).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([name, n]) => ({ name, pct: Math.round((n / total) * 100) }))
  }, [own])

  const stars = own.reduce((a, r) => a + r.stargazers_count, 0)

  const weeks = useMemo(() => {
    if (!contrib?.contributions) return []
    const days = contrib.contributions
    const pad = new Date(days[0].date).getDay()
    const cells = [...Array(pad).fill(null), ...days]
    const out = []
    for (let i = 0; i < cells.length; i += 7) out.push(cells.slice(i, i + 7))
    return out
  }, [contrib])
  const yearTotal = contrib?.total ? Object.values(contrib.total).reduce((a, b) => a + b, 0) : null

  return (
    <section id="github" className="mx-auto max-w-6xl px-6 py-28">
      <div className="reveal mb-12 flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cobalt ring-1 ring-soft">
            <GhIcon className="h-3.5 w-3.5" /> Open source
          </p>
          <h2 className="font-display text-4xl font-bold tracking-tight text-navy md:text-5xl">Code, <span className="text-grad">in the wild.</span></h2>
          <p className="mt-4 text-lg leading-relaxed text-navy/70">Live from my GitHub — what I'm building, committing and learning right now.</p>
        </div>
        <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-navy px-5 py-3 font-semibold text-ice transition hover:-translate-y-0.5 hover:bg-cobalt">
          <GhIcon className="h-5 w-5" /> @{user}
        </a>
      </div>

      {/* stats row */}
      <div className="reveal mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          [repos ? own.length : '—', 'Public repos'],
          [yearTotal ?? '—', 'Contributions this year'],
          [repos ? stars : '—', 'Stars earned'],
          [langs.length || '—', 'Languages used'],
        ].map(([v, l]) => (
          <div key={l} className="glass rounded-3xl p-5">
            <p className="font-display text-3xl font-extrabold text-cobalt">{v}</p>
            <p className="mt-1 text-sm text-navy/65">{l}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        {/* contribution graph */}
        <div className="soft-card reveal overflow-hidden rounded-[2rem] p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-lg font-bold">Contribution activity</h3>
            <span className="text-xs text-navy/60">Last 12 months</span>
          </div>
          {weeks.length ? (
            <>
              <div className="overflow-x-auto pb-2">
                <div className="flex w-max gap-[2px]">
                  {weeks.map((w, i) => (
                    <div key={i} className="flex flex-col gap-[2px]">
                      {w.map((d, j) => d ? (
                        <span key={j} title={`${d.count} contributions on ${d.date}`}
                          className="h-[9px] w-[9px] rounded-[3px] ring-1 ring-soft/60 transition hover:scale-150"
                          style={{ background: LEVEL[d.level] }} />
                      ) : <span key={j} className="h-[9px] w-[9px]" />)}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-3 flex items-center justify-end gap-1.5 text-xs text-navy/60">
                Less {LEVEL.map((c) => <span key={c} className="h-[9px] w-[9px] rounded-[3px] ring-1 ring-soft/60" style={{ background: c }} />)} More
              </div>
            </>
          ) : (
            <div className="grid h-32 place-items-center rounded-2xl bg-ice text-sm text-navy/60">
              {contrib === false ? <a className="text-cobalt underline" href={profile.github} target="_blank" rel="noreferrer">See activity on GitHub</a> : 'Loading activity…'}
            </div>
          )}

          {event && (
            <div className="mt-5 flex items-center gap-3 rounded-2xl bg-ice px-4 py-3 text-sm">
              <span className="relative grid h-5 w-5 place-items-center"><span className="pulse-dot relative h-2 w-2 rounded-full bg-cobalt" /></span>
              <span className="text-navy/75">
                Latest: {event.type === 'PushEvent' ? 'pushed to' : 'activity in'}{' '}
                <a href={`https://github.com/${event.repo.name}`} target="_blank" rel="noreferrer" className="font-semibold text-cobalt hover:underline">{event.repo.name.split('/')[1]}</a>
                {' · '}{timeAgo(event.created_at)}
              </span>
            </div>
          )}
        </div>

        {/* languages */}
        <div className="soft-card reveal rounded-[2rem] p-6">
          <h3 className="mb-5 font-display text-lg font-bold">Top languages</h3>
          {langs.length ? (
            <>
              <div className="mb-6 flex h-3 overflow-hidden rounded-full bg-ice">
                {langs.map((l, i) => <span key={l.name} style={{ width: `${l.pct}%`, background: LANG_COLORS[i] }} />)}
              </div>
              <ul className="space-y-3">
                {langs.map((l, i) => (
                  <li key={l.name} className="flex items-center gap-3 text-sm">
                    <span className="h-3 w-3 rounded-full" style={{ background: LANG_COLORS[i] }} />
                    <span className="flex-1 font-medium">{l.name}</span>
                    <span className="font-mono text-navy/60">{l.pct}%</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs text-navy/55">Share of my own public repos by main language.</p>
            </>
          ) : (
            <div className="grid h-40 place-items-center rounded-2xl bg-ice text-sm text-navy/60">{failed ? 'GitHub is busy — try again soon.' : 'Loading languages…'}</div>
          )}
        </div>
      </div>

      {/* pinned repos */}
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {pinned.map((r) => (
          <a key={r.name} href={r.html_url || `${profile.github}/${r.name}`} target="_blank" rel="noreferrer"
            className="soft-card group flex flex-col rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-ice text-cobalt transition group-hover:bg-cobalt group-hover:text-white"><Repo className="h-5 w-5" /></span>
              <span className="text-xs font-semibold text-cobalt opacity-0 transition group-hover:opacity-100">View repo →</span>
            </div>
            <h4 className="mt-4 font-display text-lg font-bold">{pretty(r.name)}</h4>
            <p className="mt-1 line-clamp-2 flex-1 text-sm text-navy/65">
              {r.placeholder ? 'Loading…' : r.description || `Updated ${timeAgo(r.pushed_at)}`}
            </p>
            {!r.placeholder && (
              <div className="mt-4 flex items-center gap-4 text-xs text-navy/65">
                {r.language && <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-cobalt" />{r.language}</span>}
                <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5" />{r.stargazers_count}</span>
                <span className="flex items-center gap-1"><Fork className="h-3.5 w-3.5" />{r.forks_count}</span>
              </div>
            )}
          </a>
        ))}
        <a href={`${profile.github}?tab=repositories`} target="_blank" rel="noreferrer"
          className="grid place-items-center rounded-3xl border-2 border-dashed border-soft p-6 text-center transition hover:border-cobalt hover:bg-white">
          <div>
            <p className="font-display text-3xl font-extrabold text-cobalt">{repos ? `+${Math.max(own.length - pinned.length, 0)}` : '+'}</p>
            <p className="mt-1 font-semibold">more repositories</p>
            <p className="text-sm text-navy/60">Explore everything on GitHub →</p>
          </div>
        </a>
      </div>
    </section>
  )
}
