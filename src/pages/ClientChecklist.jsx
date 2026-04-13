import React, { useState } from 'react';

const CLIENT_ITEMS = [
  {
    id: 'marble', label: 'Marble / Flooring', icon: '◈', deadline: '20 Apr',
    status: 'done', note: 'Statuario White selected — Anjali Marble, Kolkata.',
    required: 'Required before rendering floor accurately',
  },
  {
    id: 'cp', label: 'CP Fittings (Taps/Shower)', icon: '◉', deadline: '20 Apr',
    status: 'done', note: 'Jaquar Lyric series — confirmed.',
    required: 'Required before bathroom render',
  },
  {
    id: 'sanitary', label: 'Sanitary Fittings (WC/Basin)', icon: '◎', deadline: '20 Apr',
    status: 'pending', note: '',
    required: 'Required before bathroom render',
  },
  {
    id: 'kitchen', label: 'Kitchen Vendor / Design', icon: '◆', deadline: '22 Apr',
    status: 'in-progress', note: 'Visiting 2 more vendors — Sleek & Häfele.',
    required: 'Required before kitchen working drawings',
  },
  {
    id: 'automation', label: 'Home Automation', icon: '◐', deadline: '25 Apr',
    status: 'pending', note: '',
    required: 'Optional — Schneider or local vendor',
  },
  {
    id: 'av', label: 'Audio / Video System', icon: '▦', deadline: '25 Apr',
    status: 'pending', note: '',
    required: 'Optional — coordinate with AV vendor',
  },
  {
    id: 'bathroom_tile', label: 'Bathroom Tiles (Photo proof)', icon: '▣', deadline: '18 Apr',
    status: 'done', note: 'Photos received 12 Apr — Kajaria 600x1200 Grey.',
    required: '🔒 Unlocks bathroom 3D render',
  },
];

const MATERIAL_MATRIX = [
  { room: 'Master Bedroom', marble: 'done', tile: 'done', paint: 'pending', furniture: 'in-progress' },
  { room: "Son's Bedroom", marble: 'pending', tile: 'pending', paint: 'pending', furniture: 'pending' },
  { room: 'Kitchen', marble: 'done', tile: 'in-progress', paint: 'pending', furniture: 'pending' },
  { room: 'Living & Dining', marble: 'done', tile: 'done', paint: 'pending', furniture: 'in-progress' },
  { room: 'Master Bathroom', marble: 'done', tile: 'done', paint: 'done', furniture: 'done' },
];

const statusStyle = {
  done:        { bg: 'var(--green-bg)', color: 'var(--green)', label: '✓ Done', dot: 'var(--green)' },
  'in-progress':{ bg: 'var(--blue-bg)', color: 'var(--blue)',  label: '▶ In Progress', dot: 'var(--blue)' },
  pending:     { bg: 'var(--stone-100)', color: 'var(--stone-400)', label: '· Pending', dot: 'var(--stone-200)' },
};

function MatrixCell({ status }) {
  const s = statusStyle[status] || statusStyle.pending;
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 12, height: 12, borderRadius: '50%', background: s.dot }} title={s.label} />
    </div>
  );
}

export default function ClientChecklist({ onNavigate, user }) {
  const [items, setItems] = useState(CLIENT_ITEMS);
  const [note, setNote] = useState({});

  const setStatus = (id, status) => setItems(prev => prev.map(i => i.id === id ? { ...i, status } : i));
  const done = items.filter(i => i.status === 'done').length;

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
            { label: 'Site Execution', icon: '🏗', page: 'site' },
            { label: 'Client Checklist', icon: '✅', active: true },
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
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, fontSize: '1.6rem' }}>Client Action Checklist</h2>
            <p style={{ fontSize: 12, color: 'var(--stone-400)', marginTop: 2 }}>Sharma Residence · Given after Mood Board approval</p>
          </div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 26, color: 'var(--green)', lineHeight: 1 }}>{done}/{items.length}</div>
              <div style={{ fontSize: 11, color: 'var(--stone-400)' }}>Completed</div>
            </div>
            <div style={{ width: 80 }}>
              <div className="progress-track"><div className="progress-fill" style={{ width: `${(done / items.length) * 100}%` }} /></div>
            </div>
          </div>
        </div>

        <div style={{ padding: '20px 32px 40px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
            {items.map(item => {
              const st = statusStyle[item.status];
              return (
                <div key={item.id} className="card" style={{ padding: '16px 20px', border: item.status === 'done' ? '1px solid var(--green-bg)' : '1px solid var(--stone-100)' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    <div style={{ width: 38, height: 38, borderRadius: 'var(--radius-md)', background: st.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>{item.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <span style={{ fontWeight: 600, fontSize: 14, color: 'var(--charcoal)' }}>{item.label}</span>
                        <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 99, background: st.bg, color: st.color }}>{st.label}</span>
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--stone-400)', marginTop: 3 }}>
                        Deadline: <strong>{item.deadline}</strong> · <em style={{ color: 'var(--blue)' }}>{item.required}</em>
                      </div>
                      {item.note && <div style={{ fontSize: 12, color: 'var(--stone-500)', marginTop: 6, padding: '4px 10px', background: 'var(--parchment)', borderRadius: 4 }}>{item.note}</div>}
                    </div>
                    <div style={{ display: 'flex', gap: 6 }}>
                      {(['pending','in-progress','done']).map(s => (
                        <button key={s} onClick={() => setStatus(item.id, s)}
                          style={{ fontSize: 10, padding: '3px 8px', borderRadius: 99, cursor: 'pointer', border: `1px solid ${item.status === s ? statusStyle[s].color : 'var(--stone-200)'}`, background: item.status === s ? statusStyle[s].bg : 'transparent', color: item.status === s ? statusStyle[s].color : 'var(--stone-400)', transition: 'all 0.15s' }}>
                          {s === 'pending' ? 'Pending' : s === 'in-progress' ? 'In Progress' : 'Done'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Material Finalization Matrix */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--stone-400)', marginBottom: 14 }}>Material Finalization Matrix (Room-wise)</div>
            <div className="card" style={{ overflow: 'auto', padding: 0 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: 'var(--parchment)' }}>
                    {['Room', 'Marble/Floor', 'Tile', 'Paint', 'Furniture/Joinery'].map(h => (
                      <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--stone-400)', borderBottom: '1px solid var(--stone-100)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {MATERIAL_MATRIX.map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--stone-100)' }}>
                      <td style={{ padding: '10px 16px', fontWeight: 500, color: 'var(--charcoal)', fontSize: 13 }}>{row.room}</td>
                      <td style={{ padding: '10px 16px' }}><MatrixCell status={row.marble} /></td>
                      <td style={{ padding: '10px 16px' }}><MatrixCell status={row.tile} /></td>
                      <td style={{ padding: '10px 16px' }}><MatrixCell status={row.paint} /></td>
                      <td style={{ padding: '10px 16px' }}><MatrixCell status={row.furniture} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ padding: '10px 16px', display: 'flex', gap: 16, borderTop: '1px solid var(--stone-100)' }}>
                {Object.entries(statusStyle).map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--stone-400)' }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: v.dot }} />{v.label}
                  </div>
                ))}
              </div>
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
