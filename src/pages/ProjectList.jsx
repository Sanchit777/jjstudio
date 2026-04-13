import React, { useState } from 'react';

const ALL_PROJECTS = [
  { id: 1, client: 'Sharma Residence', type: '3BHK', designer: 'Aditi M.', stage: 3, stageLabel: 'Civil Drawing', progress: 42, daysLeft: 18, clientDelay: 5, status: 'on-track', city: 'Kolkata', value: '₹14L', startDate: '01 Feb 2025' },
  { id: 2, client: 'Mehta Villa',       type: 'Villa', designer: 'Priya K.', stage: 5, stageLabel: 'In-House Meeting', progress: 68, daysLeft: 31, clientDelay: 0, status: 'on-track', city: 'Kolkata', value: '₹38L', startDate: '15 Jan 2025' },
  { id: 3, client: 'Gupta 2BHK',        type: '2BHK', designer: 'Riya S.', stage: 2, stageLabel: 'Space Planning', progress: 22, daysLeft: 4, clientDelay: 12, status: 'delayed', city: 'Kolkata', value: '₹9L', startDate: '10 Mar 2025' },
  { id: 4, client: 'Agarwal Apartment', type: '4BHK', designer: 'Aditi M.', stage: 6, stageLabel: '3D Rendering', progress: 80, daysLeft: 9, clientDelay: 0, status: 'on-track', city: 'Kolkata', value: '₹22L', startDate: '05 Dec 2024' },
  { id: 5, client: 'Bose Penthouse',    type: 'Penthouse', designer: 'Neha R.', stage: 7, stageLabel: 'Final Execution', progress: 91, daysLeft: 3, clientDelay: 0, status: 'on-track', city: 'Kolkata', value: '₹55L', startDate: '01 Nov 2024' },
  { id: 6, client: 'Jain Duplex',       type: 'Duplex', designer: 'Priya K.', stage: 4, stageLabel: 'AC Coordination', progress: 55, daysLeft: 2, clientDelay: 8, status: 'at-risk', city: 'Kolkata', value: '₹28L', startDate: '20 Feb 2025' },
];

const statusMap = {
  'on-track': { label: 'On Track',  cls: 'badge-green' },
  'delayed':  { label: 'Delayed',   cls: 'badge-red',   },
  'at-risk':  { label: 'At Risk',   cls: 'badge-amber' },
};

const STAGE_LABELS = ['', 'Pre-Requisites', 'Space Planning', 'Civil Drawings', 'Parallel Tracks', 'In-House Meeting', '3D Rendering', 'Final Execution'];

export default function ProjectList({ user, onLogout, onOpenProject, onNavigate }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [showNew, setShowNew] = useState(false);

  const filtered = ALL_PROJECTS.filter(p => {
    const matchSearch = p.client.toLowerCase().includes(search.toLowerCase()) || p.designer.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || p.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div style={S.root}>
      {/* Sidebar */}
      <aside style={S.sidebar}>
        <div style={S.sidebarLogo}>
          <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, color: 'var(--gold)', fontWeight: 600 }}>JJ</span>
          <span style={{ fontFamily: 'Inter', fontSize: 11, color: 'rgba(249,246,241,0.35)', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 300 }}>Studio</span>
        </div>
        <nav style={S.nav}>
          {[
            { label: 'MD Dashboard',     icon: '⌂',  onClick: () => onNavigate('dashboard') },
            { label: 'All Projects',     icon: '▦',  active: true },
            { label: 'Designer Scoring', icon: '◈',  onClick: () => onNavigate('scoring') },
            { label: 'DLR Sheet',        icon: '📋', onClick: () => onNavigate('dlr') },
            { label: 'Supervisor Portal',icon: '◉',  onClick: () => onNavigate('supervisor') },
            { label: 'Site Execution',   icon: '🏗',  onClick: () => onNavigate('site') },
            { label: 'Client Checklist', icon: '✅', onClick: () => onNavigate('checklist') },
            { label: 'Vendor Hub',       icon: '🏪', onClick: () => onNavigate('vendor') },
            { label: 'BOQ Estimate',     icon: '💰', onClick: () => onNavigate('boq') },
          ].map(item => (
            <button key={item.label} style={{ ...S.navItem, ...(item.active ? S.navItemActive : {}) }} onClick={item.onClick}>
              <span>{item.icon}</span><span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div style={S.sidebarFooter}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: 'var(--cream)', fontWeight: 500 }}>{user?.name}</div>
            <div style={{ fontSize: 10, color: 'rgba(249,246,241,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{user?.role}</div>
          </div>
          <button className="btn-icon" onClick={onLogout} style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(249,246,241,0.45)' }}>→</button>
        </div>
      </aside>

      {/* Main */}
      <main style={S.main}>
        <header style={S.header}>
          <div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, fontSize: '1.8rem' }}>All Projects</h2>
            <p style={{ fontSize: 13, color: 'var(--stone-400)', marginTop: 2 }}>{ALL_PROJECTS.length} active projects</p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowNew(true)}>+ New Project</button>
        </header>

        <div style={{ padding: '20px 32px 40px' }}>
          {/* Search & Filter */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 20, alignItems: 'center' }}>
            <input className="input" placeholder="Search client, designer…" value={search} onChange={e => setSearch(e.target.value)} style={{ maxWidth: 280 }} />
            <div style={{ display: 'flex', gap: 6 }}>
              {['all', 'on-track', 'at-risk', 'delayed'].map(f => (
                <button key={f} onClick={() => setFilter(f)} className="btn btn-sm"
                  style={{
                    background: filter === f ? 'var(--charcoal)' : 'transparent',
                    color: filter === f ? '#fff' : 'var(--stone-500)',
                    border: `1.5px solid ${filter === f ? 'var(--charcoal)' : 'var(--stone-200)'}`,
                    borderRadius: 'var(--radius-full)',
                  }}>
                  {f === 'all' ? 'All' : f === 'on-track' ? 'On Track' : f === 'at-risk' ? 'At Risk' : 'Delayed'}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
            {filtered.map((p, i) => {
              const st = statusMap[p.status];
              return (
                <div
                  key={p.id}
                  className={`card card-pad anim-fade-up anim-delay-${Math.min(i + 1, 4)}`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => onOpenProject(p)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 15, color: 'var(--charcoal)' }}>{p.client}</div>
                      <div style={{ fontSize: 11, color: 'var(--stone-400)', marginTop: 2 }}>{p.type} · {p.city} · Started {p.startDate}</div>
                    </div>
                    <span className={`badge ${st.cls}`}>{st.label}</span>
                  </div>

                  <div style={{ marginBottom: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                      <span style={{ color: 'var(--stone-500)' }}>Stage {p.stage}: {p.stageLabel}</span>
                      <span style={{ fontWeight: 600, color: 'var(--charcoal)' }}>{p.progress}%</span>
                    </div>
                    <div className="progress-track"><div className="progress-fill" style={{ width: `${p.progress}%` }} /></div>
                  </div>

                  <div style={{ display: 'flex', gap: 12 }}>
                    <div style={S.metaChip}>
                      <span style={{ fontSize: 11 }}>✦</span>
                      <span>{p.designer}</span>
                    </div>
                    {p.clientDelay > 0 && (
                      <div style={{ ...S.metaChip, background: 'var(--amber-bg)', color: 'var(--amber)' }}>
                        <span>⏱</span>
                        <span>+{p.clientDelay}d client hold</span>
                      </div>
                    )}
                    <div style={{ ...S.metaChip, marginLeft: 'auto' }}>
                      <span style={{ fontWeight: 600 }}>{p.value}</span>
                    </div>
                  </div>
                  <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--stone-100)', display: 'flex', gap: 6 }}>
                    {STAGE_LABELS.slice(1).map((s, idx) => (
                      <div key={s} title={s} style={{
                        flex: 1, height: 4, borderRadius: 2,
                        background: idx + 1 < p.stage ? 'var(--gold)' : idx + 1 === p.stage ? 'var(--charcoal)' : 'var(--stone-100)',
                      }} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* New Project Modal */}
      {showNew && <NewProjectModal onClose={() => setShowNew(false)} />}
    </div>
  );
}

function NewProjectModal({ onClose }) {
  const [form, setForm] = useState({ client: '', type: '3BHK', phone: '', lead: '', address: '' });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div style={S.overlay} onClick={onClose}>
      <div className="card" style={S.modal} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, fontSize: '1.6rem' }}>Onboard New Client</h3>
          <button className="btn-icon" onClick={onClose}>✕</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="grid-2">
            <div><label>Client Name</label><input className="input" placeholder="Sharma Family" value={form.client} onChange={e => set('client', e.target.value)} /></div>
            <div><label>Phone</label><input className="input" placeholder="+91 98765 43210" value={form.phone} onChange={e => set('phone', e.target.value)} /></div>
          </div>
          <div className="grid-2">
            <div>
              <label>Property Type</label>
              <select className="input" value={form.type} onChange={e => set('type', e.target.value)}>
                {['1BHK','2BHK','3BHK','4BHK','Villa','Duplex','Penthouse','Office'].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label>Lead Designer</label>
              <select className="input" value={form.lead} onChange={e => set('lead', e.target.value)}>
                <option value="">Assign…</option>
                {['Aditi M.', 'Priya K.', 'Riya S.', 'Neha R.'].map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
          </div>
          <div><label>Site Address</label><input className="input" placeholder="123, Park Street, Kolkata" value={form.address} onChange={e => set('address', e.target.value)} /></div>
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 24, justifyContent: 'flex-end' }}>
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={onClose}>Confirm & Start Project →</button>
        </div>
      </div>
    </div>
  );
}

const S = {
  root: { display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--cream)' },
  sidebar: { width: 220, background: 'var(--charcoal)', display: 'flex', flexDirection: 'column', flexShrink: 0 },
  sidebarLogo: { padding: '28px 24px 20px', display: 'flex', alignItems: 'baseline', gap: 8, borderBottom: '1px solid rgba(255,255,255,0.07)' },
  nav: { flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: 4 },
  navItem: { display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 'var(--radius-md)', background: 'transparent', border: 'none', cursor: 'pointer', color: 'rgba(249,246,241,0.45)', fontSize: 13, fontFamily: 'Inter', transition: 'all 0.2s', width: '100%', textAlign: 'left' },
  navItemActive: { background: 'rgba(201,169,110,0.15)', color: 'var(--gold-light)' },
  sidebarFooter: { padding: '16px 16px 20px', borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', gap: 10 },
  main: { flex: 1, overflowY: 'auto' },
  header: { padding: '28px 32px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--stone-100)', position: 'sticky', top: 0, background: 'var(--cream)', zIndex: 10 },
  metaChip: { display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--stone-500)', background: 'var(--stone-100)', padding: '3px 8px', borderRadius: 'var(--radius-full)' },
  overlay: { position: 'fixed', inset: 0, background: 'rgba(26,23,20,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 },
  modal: { width: '100%', maxWidth: 560, padding: 32, margin: 16 },
};
