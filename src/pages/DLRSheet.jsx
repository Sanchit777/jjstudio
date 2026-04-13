import React, { useState } from 'react';

const DRAWING_SETS = [
  {
    id: 'civil', category: 'Civil Drawings', color: 'var(--charcoal)',
    drawings: [
      { id: 1, name: 'Breaking Walls Plan', designer: 'Aditi M.', versions: [
        { v: 1, date: '02 Apr', status: 'inactive', supervisorSigned: true },
        { v: 2, date: '10 Apr', status: 'active', supervisorSigned: true },
      ]},
      { id: 2, name: 'Construction Drawing', designer: 'Aditi M.', versions: [
        { v: 1, date: '02 Apr', status: 'active', supervisorSigned: true },
      ]},
      { id: 3, name: 'Door Schedule', designer: 'Aditi M.', versions: [
        { v: 1, date: '03 Apr', status: 'active', supervisorSigned: false },
      ]},
      { id: 4, name: 'Window Schedule', designer: 'Aditi M.', versions: [
        { v: 1, date: '03 Apr', status: 'pending', supervisorSigned: false },
      ]},
      { id: 5, name: 'Tentative Electrical', designer: 'Aditi M.', versions: [], },
    ]
  },
  {
    id: 'render', category: '3D Renders', color: 'var(--blue)',
    drawings: [
      { id: 6, name: 'Master Bedroom Render', designer: 'Neha R.', versions: [
        { v: 1, date: '08 Apr', status: 'active', supervisorSigned: true },
      ]},
      { id: 7, name: "Living & Dining Render", designer: 'Neha R.', versions: [] },
      { id: 8, name: 'Kitchen Render', designer: 'Neha R.', versions: [] },
    ]
  },
  {
    id: 'working', category: 'Working Drawings', color: 'var(--purple)',
    drawings: [
      { id: 9, name: 'False Ceiling Drawing', designer: 'Riya S.', versions: [] },
      { id: 10, name: 'Final Electrical Layout', designer: 'Aditi M.', versions: [] },
      { id: 11, name: 'Bathroom Working Drawing', designer: 'Priya K.', versions: [] },
      { id: 12, name: 'Kitchen Working Drawing', designer: 'Priya K.', versions: [] },
    ]
  },
];

const vStatusStyle = {
  active:   { bg: 'var(--green-bg)', color: 'var(--green)', label: 'Active' },
  inactive: { bg: 'var(--stone-100)', color: 'var(--stone-400)', label: 'Inactive' },
  pending:  { bg: 'var(--amber-bg)', color: 'var(--amber)', label: 'Pending' },
};

function DrawingRow({ drawing, onSign }) {
  const [showHistory, setShowHistory] = useState(false);
  const latestV = drawing.versions[drawing.versions.length - 1];
  const hasVersions = drawing.versions.length > 0;

  return (
    <>
      <div style={{
        display: 'grid', gridTemplateColumns: '2fr 1fr 0.8fr 0.8fr 1fr 1fr',
        alignItems: 'center', gap: 12, padding: '10px 20px',
        borderBottom: '1px solid var(--stone-100)',
        background: showHistory ? 'var(--parchment)' : 'var(--warm-white)',
        cursor: 'pointer',
      }} onClick={() => drawing.versions.length > 1 && setShowHistory(h => !h)}>
        <div>
          <span style={{ fontSize: 13, color: 'var(--charcoal)', fontWeight: 500 }}>{drawing.name}</span>
          {drawing.versions.length > 1 && (
            <span style={{ marginLeft: 6, fontSize: 10, color: 'var(--stone-400)' }}>
              {showHistory ? '▲ Hide' : `▼ ${drawing.versions.length} versions`}
            </span>
          )}
        </div>
        <span style={{ fontSize: 12, color: 'var(--stone-500)' }}>{drawing.designer}</span>
        <span style={{ fontSize: 12, color: 'var(--stone-400)' }}>
          {hasVersions ? `v${latestV.v}` : '—'}
        </span>
        <span style={{ fontSize: 12, color: 'var(--stone-400)' }}>
          {hasVersions ? latestV.date : 'Not uploaded'}
        </span>
        <div>
          {hasVersions ? (
            <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 10px', borderRadius: 99, background: vStatusStyle[latestV.status].bg, color: vStatusStyle[latestV.status].color }}>
              {vStatusStyle[latestV.status].label}
            </span>
          ) : <span style={{ fontSize: 11, color: 'var(--stone-300)' }}>Awaiting upload</span>}
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {hasVersions && !latestV.supervisorSigned && latestV.status === 'active' && (
            <button className="btn btn-sm btn-primary" onClick={e => { e.stopPropagation(); onSign(drawing.id); }}
              style={{ fontSize: 11, padding: '4px 10px' }}>
              ✎ Sign & Print
            </button>
          )}
          {hasVersions && latestV.supervisorSigned && (
            <span style={{ fontSize: 11, color: 'var(--green)', display: 'flex', alignItems: 'center', gap: 3 }}>✓ Signed</span>
          )}
          {!hasVersions && (
            <button className="btn btn-sm btn-outline" style={{ fontSize: 11, padding: '4px 10px' }}>Upload</button>
          )}
        </div>
      </div>
      {/* Version History */}
      {showHistory && drawing.versions.map(ver => (
        <div key={ver.v} style={{
          display: 'grid', gridTemplateColumns: '2fr 1fr 0.8fr 0.8fr 1fr 1fr',
          alignItems: 'center', gap: 12, padding: '6px 20px 6px 36px',
          borderBottom: '1px solid var(--stone-100)', background: 'var(--cream)',
        }}>
          <span style={{ fontSize: 12, color: 'var(--stone-400)' }}>↳ Version {ver.v}</span>
          <span />
          <span style={{ fontSize: 12, color: 'var(--stone-400)' }}>v{ver.v}</span>
          <span style={{ fontSize: 12, color: 'var(--stone-400)' }}>{ver.date}</span>
          <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 10px', borderRadius: 99, background: vStatusStyle[ver.status].bg, color: vStatusStyle[ver.status].color }}>
            {vStatusStyle[ver.status].label}
          </span>
          <span style={{ fontSize: 11, color: ver.supervisorSigned ? 'var(--green)' : 'var(--stone-300)' }}>
            {ver.supervisorSigned ? '✓ Supervisor signed' : 'Not signed'}
          </span>
        </div>
      ))}
    </>
  );
}

export default function DLRSheet({ onNavigate, user, project }) {
  const [signed, setSigned] = useState({});
  const p = project || { client: 'Sharma Residence', type: '3BHK' };

  const handleSign = (id) => setSigned(s => ({ ...s, [id]: true }));

  const allDrawings = DRAWING_SETS.flatMap(s => s.drawings);
  const totalReleased = allDrawings.filter(d => d.versions.some(v => v.status === 'active')).length;
  const totalPending  = allDrawings.length - totalReleased;

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
            { label: 'DLR Sheet', icon: '📋', active: true },
            { label: 'Supervisor Portal', icon: '◉', page: 'supervisor' },
            { label: 'Site Execution', icon: '🏗', page: 'site' },
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
          <div style={{ fontSize: 10, color: 'rgba(249,246,241,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{user?.role}</div>
        </div>
      </aside>

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header */}
        <div style={S.header}>
          <div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, fontSize: '1.6rem' }}>DLR Sheet — Drawing List & Release</h2>
            <p style={{ fontSize: 12, color: 'var(--stone-400)', marginTop: 2 }}>{p.client} · {p.type}</p>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            {[
              { val: allDrawings.length, label: 'Total Drawings' },
              { val: totalReleased, label: 'Released', color: 'var(--green)' },
              { val: totalPending, label: 'Pending', color: 'var(--amber)' },
            ].map(k => (
              <div key={k.label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 26, color: k.color || 'var(--charcoal)', lineHeight: 1 }}>{k.val}</div>
                <div style={{ fontSize: 11, color: 'var(--stone-400)' }}>{k.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Alert */}
        <div style={{ padding: '12px 24px 0', background: 'var(--cream)' }}>
          <div style={{ padding: '10px 16px', background: 'var(--amber-bg)', borderRadius: 'var(--radius-md)', fontSize: 12, color: 'var(--amber)' }}>
            ⚠ Protocol: Supervisor must physically return the previous drawing set before the new version is released to site.
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px 32px' }}>
          {DRAWING_SETS.map(set => (
            <div key={set.id} style={{ marginBottom: 24 }}>
              {/* Category header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <div style={{ width: 3, height: 16, borderRadius: 99, background: set.color }} />
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--stone-400)' }}>{set.category}</span>
              </div>
              <div className="card" style={{ overflow: 'hidden', padding: 0 }}>
                {/* Column headers */}
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 0.8fr 0.8fr 1fr 1fr', gap: 12, padding: '8px 20px', background: 'var(--parchment)', fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--stone-400)', borderBottom: '1px solid var(--stone-100)' }}>
                  <span>Drawing Name</span><span>Designer</span><span>Version</span><span>Date</span><span>Status</span><span>Action</span>
                </div>
                {set.drawings.map(d => (
                  <DrawingRow key={d.id} drawing={{ ...d, versions: signed[d.id] ? d.versions.map((v, i) => i === d.versions.length - 1 ? { ...v, supervisorSigned: true } : v) : d.versions }} onSign={handleSign} />
                ))}
              </div>
            </div>
          ))}
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
  header: { padding: '24px 32px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--stone-100)', background: 'var(--cream)', flexShrink: 0 },
};
