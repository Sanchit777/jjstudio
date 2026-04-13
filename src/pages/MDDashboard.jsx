import React from 'react';

/* ── reusable sub-components ── */
const Icon = ({ name }) => {
  const icons = {
    home: '⌂', projects: '▦', clients: '◈', settings: '⚙', logout: '→',
    alert: '⚠', clock: '◷', check: '✓', lock: '⊘', trend: '↗',
    bell: '◉', user: '◎',
  };
  return <span aria-hidden="true">{icons[name] || '·'}</span>;
};

const PROJECTS = [
  { id: 1, client: 'Sharma Residence', type: '3BHK', designer: 'Aditi M.', stage: 3, stageLabel: 'Civil Drawing', progress: 42, daysLeft: 18, clientDelay: 5, status: 'on-track', city: 'Kolkata', value: '₹14L' },
  { id: 2, client: 'Mehta Villa',       type: 'Villa', designer: 'Priya K.', stage: 5, stageLabel: 'In-House Meeting', progress: 68, daysLeft: 31, clientDelay: 0, status: 'on-track', city: 'Kolkata', value: '₹38L' },
  { id: 3, client: 'Gupta 2BHK',        type: '2BHK', designer: 'Riya S.', stage: 2, stageLabel: 'Space Planning', progress: 22, daysLeft: 4, clientDelay: 12, status: 'delayed', city: 'Kolkata', value: '₹9L' },
  { id: 4, client: 'Agarwal Apartment', type: '4BHK', designer: 'Aditi M.', stage: 6, stageLabel: '3D Rendering', progress: 80, daysLeft: 9, clientDelay: 0, status: 'on-track', city: 'Kolkata', value: '₹22L' },
  { id: 5, client: 'Bose Penthouse',    type: 'Penthouse', designer: 'Neha R.', stage: 7, stageLabel: 'Final Execution', progress: 91, daysLeft: 3, clientDelay: 0, status: 'on-track', city: 'Kolkata', value: '₹55L' },
  { id: 6, client: 'Jain Duplex',       type: 'Duplex', designer: 'Priya K.', stage: 4, stageLabel: 'AC Coordination', progress: 55, daysLeft: 2, clientDelay: 8, status: 'at-risk', city: 'Kolkata', value: '₹28L' },
];

const STAGES = ['Onboarding','Pre-Requisites','Space Planning','Civil Drawings','Parallel Tracks','In-House Meeting','3D Rendering','Final Execution'];

const statusMap = {
  'on-track': { label: 'On Track',  cls: 'badge-green' },
  'delayed':  { label: 'Delayed',   cls: 'badge-red'   },
  'at-risk':  { label: 'At Risk',   cls: 'badge-amber' },
};

function KpiCard({ value, sub, icon, accent }) {
  return (
    <div className="card card-pad flex" style={{ gap: 16, alignItems: 'flex-start' }}>
      <div style={{
        width: 42, height: 42, borderRadius: 'var(--radius-md)', flexShrink: 0,
        background: accent || 'var(--stone-100)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
      }}>{icon}</div>
      <div>
        <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 30, lineHeight: 1, color: 'var(--charcoal)' }}>{value}</div>
        <div style={{ fontSize: 12, color: 'var(--stone-400)', marginTop: 3 }}>{sub}</div>
      </div>
    </div>
  );
}

function ProjectRow({ p, onOpenProject }) {
  const st = statusMap[p.status];
  const [r, g, b] = p.status === 'on-track' ? [74,124,94] : p.status === 'delayed' ? [155,58,47] : [196,132,42];
  return (
    <div
      className="card"
      style={{ padding: '14px 20px', cursor: 'pointer', display: 'grid', gridTemplateColumns: '2fr 1.2fr 1fr 1fr 1fr 0.8fr', alignItems: 'center', gap: 12 }}
      onClick={() => onOpenProject(p)}
    >
      <div>
        <div style={{ fontWeight: 500, fontSize: 14, color: 'var(--charcoal)' }}>{p.client}</div>
        <div style={{ fontSize: 11, color: 'var(--stone-400)', marginTop: 2 }}>{p.type} · {p.city}</div>
      </div>
      <div>
        <div style={{ fontSize: 12, color: 'var(--stone-500)' }}>{p.stageLabel}</div>
        <div style={{ marginTop: 5 }}>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${p.progress}%` }} />
          </div>
          <div style={{ fontSize: 10, color: 'var(--stone-400)', marginTop: 2 }}>{p.progress}%</div>
        </div>
      </div>
      <div style={{ fontSize: 13, color: 'var(--stone-500)' }}>{p.designer}</div>
      <div style={{ fontSize: 13 }}>
        {p.clientDelay > 0
          ? <span style={{ color: 'var(--amber)', fontWeight: 500 }}>⏱ +{p.clientDelay}d client</span>
          : <span style={{ color: 'var(--green)', fontSize: 12 }}>✓ On time</span>}
      </div>
      <div style={{ fontSize: 13, color: 'var(--stone-500)' }}>{p.value}</div>
      <span className={`badge ${st.cls}`}>{st.label}</span>
    </div>
  );
}

export default function MDDashboard({ user, onLogout, onNavigate, onOpenProject }) {
  const delayed  = PROJECTS.filter(p => p.status === 'delayed').length;
  const atRisk   = PROJECTS.filter(p => p.status === 'at-risk').length;
  const onTrack  = PROJECTS.filter(p => p.status === 'on-track').length;

  return (
    <div style={S.root}>
      {/* ── Sidebar ── */}
      <aside style={S.sidebar}>
        <div style={S.sidebarLogo}>
          <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, color: 'var(--gold)', fontWeight: 600 }}>JJ</span>
          <span style={{ fontFamily: 'Inter', fontSize: 11, color: 'rgba(249,246,241,0.35)', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 300 }}>Studio</span>
        </div>

        <nav style={S.nav}>
          {[
            { icon: '⌂',  label: 'MD Dashboard',     active: true },
            { icon: '▦',  label: 'All Projects',      onClick: () => onNavigate('projects') },
            { icon: '◈',  label: 'Designer Scoring',  onClick: () => onNavigate('scoring') },
            { icon: '📋', label: 'DLR Sheet',         onClick: () => onNavigate('dlr') },
            { icon: '◉',  label: 'Supervisor Portal', onClick: () => onNavigate('supervisor') },
            { icon: '🏗',  label: 'Site Execution',    onClick: () => onNavigate('site') },
            { icon: '✅', label: 'Client Checklist',  onClick: () => onNavigate('checklist') },
            { icon: '🏪', label: 'Vendor Hub',        onClick: () => onNavigate('vendor') },
            { icon: '💰', label: 'BOQ Estimate',      onClick: () => onNavigate('boq') },
          ].map(item => (
            <button
              key={item.label}
              style={{ ...S.navItem, ...(item.active ? S.navItemActive : {}) }}
              onClick={item.onClick}
            >
              <span style={{ fontSize: 13 }}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div style={S.sidebarFooter}>
          <div style={S.userPill}>
            <div style={S.avatar}>{user?.name?.[0]?.toUpperCase()}</div>
            <div>
              <div style={{ fontSize: 12, color: 'var(--cream)', fontWeight: 500 }}>{user?.name}</div>
              <div style={{ fontSize: 10, color: 'rgba(249,246,241,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Managing Director</div>
            </div>
          </div>
          <button className="btn-icon" onClick={onLogout} style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(249,246,241,0.45)' }} title="Sign out">→</button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main style={S.main}>
        {/* Header */}
        <header style={S.header}>
          <div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, fontSize: '1.8rem', color: 'var(--charcoal)' }}>MD Overview</h2>
            <p style={{ fontSize: 13, color: 'var(--stone-400)', marginTop: 2 }}>All live projects across the studio — April 2025</p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-outline btn-sm" onClick={() => onNavigate('projects')}>All Projects</button>
            <button className="btn btn-primary btn-sm" onClick={() => onNavigate('projects')}>+ New Project</button>
          </div>
        </header>

        <div style={{ padding: '0 32px 32px' }}>
          {/* KPI Strip */}
          <div className="grid-4 anim-fade-up" style={{ marginBottom: 24 }}>
            <KpiCard value={PROJECTS.length} sub="Total Active Projects" icon="▦" accent="rgba(44,37,33,0.08)" />
            <KpiCard value={onTrack}  sub="On Track"    icon="✓" accent="var(--green-bg)" />
            <KpiCard value={atRisk}   sub="At Risk"     icon="⚠" accent="var(--amber-bg)" />
            <KpiCard value={delayed}  sub="Delayed (client)" icon="◷" accent="var(--red-bg)" />
          </div>

          {/* Bottleneck Alerts */}
          {(delayed + atRisk > 0) && (
            <div className="card anim-fade-up anim-delay-1" style={{ marginBottom: 24, padding: '16px 20px', border: '1px solid var(--amber-bg)', background: 'var(--amber-bg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 16 }}>⚠</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--amber)' }}>Attention Required</div>
                  <div style={{ fontSize: 12, color: 'var(--stone-500)', marginTop: 2 }}>
                    <strong>Gupta 2BHK</strong> — Client delayed Space Planning by 12 days. &nbsp;·&nbsp;
                    <strong>Jain Duplex</strong> — AC Coordination approaching deadline in 2 days.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Stage funnel */}
          <div className="card anim-fade-up anim-delay-2" style={{ padding: 24, marginBottom: 24 }}>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--stone-400)', marginBottom: 16 }}>Projects by Stage</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {STAGES.slice(1).map((s, i) => {
                const count = PROJECTS.filter(p => p.stage === i + 1).length;
                return (
                  <div key={s} style={{
                    flex: 1, minWidth: 80, textAlign: 'center',
                    padding: '10px 8px', borderRadius: 'var(--radius-md)',
                    background: count > 0 ? 'var(--parchment)' : 'var(--stone-100)',
                    border: count > 0 ? '1px solid var(--stone-200)' : '1px solid transparent',
                  }}>
                    <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 26, color: count > 0 ? 'var(--gold-dark)' : 'var(--stone-300)' }}>{count}</div>
                    <div style={{ fontSize: 10, color: 'var(--stone-400)', lineHeight: 1.3, marginTop: 2 }}>{s}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Project Table */}
          <div className="anim-fade-up anim-delay-3">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--stone-400)' }}>Live Projects</div>
              <div style={{ fontSize: 11, color: 'var(--stone-300)' }}>Click any row to open project →</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {/* Column Headers */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr 1fr 1fr 1fr 0.8fr', gap: 12, padding: '0 20px 6px', fontSize: 10, color: 'var(--stone-400)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                <span>Client</span><span>Stage / Progress</span><span>Designer</span><span>Client Delay</span><span>Value</span><span>Status</span>
              </div>
              {PROJECTS.map(p => <ProjectRow key={p.id} p={p} onOpenProject={onOpenProject} />)}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const S = {
  root: {
    display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--cream)',
  },
  sidebar: {
    width: 220, background: 'var(--charcoal)', display: 'flex', flexDirection: 'column',
    flexShrink: 0, overflow: 'hidden',
  },
  sidebarLogo: {
    padding: '28px 24px 20px', display: 'flex', alignItems: 'baseline', gap: 8,
    borderBottom: '1px solid rgba(255,255,255,0.07)',
  },
  nav: {
    flex: 1, padding: '10px 10px', display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto',
  },
  navItem: {
    display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px',
    borderRadius: 'var(--radius-md)', background: 'transparent',
    border: 'none', cursor: 'pointer', color: 'rgba(249,246,241,0.45)',
    fontSize: 12, fontFamily: 'Inter, sans-serif', transition: 'all 0.2s', textAlign: 'left', width: '100%',
  },
  navItemActive: {
    background: 'rgba(201,169,110,0.15)', color: 'var(--gold-light)',
  },
  sidebarFooter: {
    padding: '16px 16px 20px', borderTop: '1px solid rgba(255,255,255,0.07)',
    display: 'flex', alignItems: 'center', gap: 10,
  },
  userPill: {
    flex: 1, display: 'flex', alignItems: 'center', gap: 10,
  },
  avatar: {
    width: 32, height: 32, borderRadius: '50%',
    background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: '#fff', fontSize: 13, fontWeight: 600, flexShrink: 0,
  },
  main: {
    flex: 1, overflowY: 'auto',
  },
  header: {
    padding: '28px 32px 20px', display: 'flex', justifyContent: 'space-between',
    alignItems: 'flex-start', borderBottom: '1px solid var(--stone-100)',
    position: 'sticky', top: 0, background: 'var(--cream)', zIndex: 10,
  },
};
