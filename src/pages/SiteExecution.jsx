import React, { useState } from 'react';

const MILESTONES = [
  {
    id: 1, phase: 'Civil', label: 'Civil Work Started on Site', date: '05 Apr', done: true,
    note: 'Demolition of partition walls complete. Supervisor: Rajesh K.',
    substeps: ['Wall breaking complete', 'Shuttering done', 'Concrete poured', 'Curing in progress'],
    doneCount: 4,
  },
  {
    id: 2, phase: 'Civil', label: 'Brick & Plaster Work', date: '12 Apr', done: true,
    note: 'All new walls raised and plastered.',
    substeps: ['Brick laying', 'Plaster – bedroom', 'Plaster – living', 'Plaster – kitchen'],
    doneCount: 4,
  },
  {
    id: 3, phase: 'AC', label: 'AC Work Started on Site', date: '14 Apr', done: true,
    note: 'Conduit laying complete. Outdoor unit placed.',
    substeps: ['Conduit laying', 'Indoor unit brackets', 'Gas pipe run', 'Outdoor unit placed'],
    doneCount: 3,
  },
  {
    id: 4, phase: 'Marble', label: 'Marble / Flooring Laid', date: '20 Apr', done: false,
    note: '',
    substeps: ['Living floor done', 'Bedroom floor done', 'Kitchen floor done', 'Bathroom tile done'],
    doneCount: 0,
  },
  {
    id: 5, phase: 'False Ceiling', label: 'False Ceiling - GI Frame', date: '22 Apr', done: false,
    note: '',
    substeps: ['Living room frame', 'Bedrooms frame', 'Kitchen frame', 'Board fixed'],
    doneCount: 0,
  },
  {
    id: 6, phase: 'Electrical', label: 'Electrical Wiring Complete', date: '25 Apr', done: false,
    note: '',
    substeps: ['Main panel done', 'Bedroom wiring', 'Common area wiring', 'Fan/light points'],
    doneCount: 0,
  },
  {
    id: 7, phase: 'Joinery', label: 'Carpentry / Joinery Work', date: '01 May', done: false,
    note: '',
    substeps: ['Wardrobes', 'Kitchen cabinets', 'TV unit', 'Bathroom vanity'],
    doneCount: 0,
  },
  {
    id: 8, phase: 'Handover', label: 'Final Walkthrough & Handover', date: '15 May', done: false,
    note: '',
    substeps: ['Snag list reviewed', 'Touch-up work done', 'Cleaning done', 'Keys handed'],
    doneCount: 0,
  },
];

const PHASE_COLORS = {
  Civil: 'var(--charcoal)', AC: 'var(--blue)', Marble: 'var(--gold)',
  'False Ceiling': 'var(--purple)', Electrical: 'var(--amber)', Joinery: 'var(--green)', Handover: 'var(--gold-dark)',
};

export default function SiteExecution({ onNavigate, user }) {
  const [milestones, setMilestones] = useState(MILESTONES);
  const done = milestones.filter(m => m.done).length;

  const toggle = (id) => setMilestones(prev => prev.map(m => m.id === id ? { ...m, done: !m.done } : m));

  return (
    <div style={S.root}>
      <aside style={S.sidebar}>
        <div style={S.logo}>
          <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, color: 'var(--gold)', fontWeight: 600 }}>JJ</span>
          <span style={{ fontFamily: 'Inter', fontSize: 11, color: 'rgba(249,246,241,0.35)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Studio</span>
        </div>
        <nav style={S.nav}>
          {[
            { label: 'MD Dashboard', icon: '⌂', page: 'dashboard' },
            { label: 'All Projects', icon: '▦', page: 'projects' },
            { label: 'Designer Scoring', icon: '◈', page: 'scoring' },
            { label: 'DLR Sheet', icon: '📋', page: 'dlr' },
            { label: 'Supervisor Portal', icon: '◉', page: 'supervisor' },
            { label: 'Site Execution', icon: '🏗', active: true },
            { label: 'Client Checklist', icon: '✅', page: 'checklist' },
            { label: 'Vendor Hub', icon: '🏪', page: 'vendor' },
            { label: 'BOQ Estimate', icon: '💰', page: 'boq' },
          ].map(item => (
            <button key={item.label} style={{ ...S.navItem, ...(item.active ? S.navActive : {}) }} onClick={() => !item.active && onNavigate(item.page)}>
              <span>{item.icon}</span><span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div style={S.foot}>
          <div style={{ fontSize: 12, color: 'var(--cream)' }}>{user?.name}</div>
          <div style={{ fontSize: 10, color: 'rgba(249,246,241,0.4)', textTransform: 'uppercase' }}>{user?.role}</div>
        </div>
      </aside>

      <main style={{ flex: 1, overflowY: 'auto', background: 'var(--cream)' }}>
        <div style={S.header}>
          <div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, fontSize: '1.6rem' }}>Site Execution Tracker</h2>
            <p style={{ fontSize: 12, color: 'var(--stone-400)', marginTop: 2 }}>Sharma Residence · 3BHK · Target: 15 May 2025</p>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 26, color: 'var(--green)', lineHeight: 1 }}>{done}/{milestones.length}</div>
              <div style={{ fontSize: 11, color: 'var(--stone-400)' }}>Milestones done</div>
            </div>
            <div style={{ width: 100 }}>
              <div className="progress-track" style={{ height: 7 }}>
                <div className="progress-fill" style={{ width: `${(done / milestones.length) * 100}%` }} />
              </div>
            </div>
          </div>
        </div>

        <div style={{ padding: '24px 32px 40px' }}>
          {/* Timeline */}
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: 20, top: 0, bottom: 40, width: 2, background: 'var(--stone-200)', borderRadius: 99 }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {milestones.map((m, i) => {
                const phaseColor = PHASE_COLORS[m.phase] || 'var(--charcoal)';
                return (
                  <div key={m.id} style={{ display: 'flex', gap: 20 }}>
                    {/* Dot */}
                    <div style={{ flexShrink: 0, display: 'flex', alignItems: 'flex-start', paddingTop: 2 }}>
                      <div style={{
                        width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: m.done ? 'var(--green)' : 'var(--warm-white)', color: m.done ? '#fff' : 'var(--stone-300)',
                        border: m.done ? 'none' : '2px solid var(--stone-200)', fontSize: 14, zIndex: 2, position: 'relative',
                        cursor: 'pointer', transition: 'all 0.2s', flexShrink: 0,
                      }} onClick={() => toggle(m.id)} title="Click to toggle">
                        {m.done ? '✓' : i + 1}
                      </div>
                    </div>

                    {/* Card */}
                    <div className="card card-pad" style={{ flex: 1, border: m.done ? '1px solid var(--green-bg)' : '1px solid var(--stone-100)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                        <div>
                          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                            <div style={{ width: 3, height: 14, borderRadius: 99, background: phaseColor }} />
                            <span style={{ fontWeight: 600, fontSize: 14, color: 'var(--charcoal)' }}>{m.label}</span>
                            <span style={{ fontSize: 10, color: phaseColor, fontWeight: 600, background: `${phaseColor}15`, padding: '1px 8px', borderRadius: 99 }}>{m.phase}</span>
                          </div>
                          <div style={{ fontSize: 12, color: 'var(--stone-400)', marginTop: 3 }}>Target: {m.date}</div>
                          {m.note && <div style={{ fontSize: 12, color: 'var(--stone-500)', marginTop: 6 }}>{m.note}</div>}
                        </div>
                        <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 99, background: m.done ? 'var(--green-bg)' : 'var(--stone-100)', color: m.done ? 'var(--green)' : 'var(--stone-400)' }}>
                          {m.done ? '✓ Complete' : 'Pending'}
                        </span>
                      </div>
                      {/* Sub-steps */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 6 }}>
                        {m.substeps.map((s, si) => (
                          <div key={si} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: si < m.doneCount ? 'var(--stone-500)' : 'var(--stone-300)' }}>
                            <div style={{ width: 14, height: 14, borderRadius: 3, background: si < m.doneCount ? 'var(--green)' : 'var(--stone-100)', border: si < m.doneCount ? 'none' : '1.5px solid var(--stone-200)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#fff', flexShrink: 0 }}>
                              {si < m.doneCount ? '✓' : ''}
                            </div>
                            {s}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const S = {
  root: { display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--cream)' },
  sidebar: { width: 220, background: 'var(--charcoal)', display: 'flex', flexDirection: 'column', flexShrink: 0 },
  logo: { padding: '28px 24px 20px', display: 'flex', alignItems: 'baseline', gap: 8, borderBottom: '1px solid rgba(255,255,255,0.07)' },
  nav: { flex: 1, padding: '12px 12px', display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto' },
  navItem: { display: 'flex', alignItems: 'center', gap: 8, padding: '7px 12px', borderRadius: 'var(--radius-md)', background: 'transparent', border: 'none', cursor: 'pointer', color: 'rgba(249,246,241,0.45)', fontSize: 12, fontFamily: 'Inter', transition: 'all 0.2s', width: '100%', textAlign: 'left' },
  navActive: { background: 'rgba(201,169,110,0.15)', color: 'var(--gold-light)' },
  foot: { padding: '16px 16px 20px', borderTop: '1px solid rgba(255,255,255,0.07)' },
  header: { padding: '24px 32px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--stone-100)', background: 'var(--cream)' },
};
