import React, { useState } from 'react';

const ACTIVE_DRAWINGS = [
  { id: 1, name: 'Breaking Walls Plan', category: 'Civil', version: 'v2', date: '10 Apr', signed: true, signedDate: '11 Apr' },
  { id: 2, name: 'Construction Drawing', category: 'Civil', version: 'v1', date: '02 Apr', signed: true, signedDate: '03 Apr' },
  { id: 3, name: 'Door Schedule', category: 'Civil', version: 'v1', date: '03 Apr', signed: false, signedDate: null },
  { id: 6, name: 'Master Bedroom Render', category: '3D Render', version: 'v1', date: '08 Apr', signed: true, signedDate: '09 Apr' },
];

const CATEGORY_COLORS = {
  'Civil': 'var(--charcoal)',
  '3D Render': 'var(--blue)',
  'Working Drawing': 'var(--purple)',
};

export default function SupervisorPortal({ onNavigate, user }) {
  const [drawings, setDrawings] = useState(ACTIVE_DRAWINGS);
  const [showSign, setShowSign] = useState(null);
  const [sigName, setSigName] = useState('');
  const [confirmed, setConfirmed] = useState({});

  const handleSign = (id) => {
    setDrawings(prev => prev.map(d => d.id === id ? { ...d, signed: true, signedDate: 'Today' } : d));
    setConfirmed(c => ({ ...c, [id]: true }));
    setShowSign(null);
    setSigName('');
  };

  const pending = drawings.filter(d => !d.signed);
  const signed  = drawings.filter(d => d.signed);

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
            { label: 'Supervisor Portal', icon: '◉', active: true },
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
          <div style={{ fontSize: 10, color: 'rgba(249,246,241,0.4)', textTransform: 'uppercase' }}>{user?.role}</div>
        </div>
      </aside>

      <main style={{ flex: 1, overflowY: 'auto', background: 'var(--cream)' }}>
        <div style={S.header}>
          <div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, fontSize: '1.6rem' }}>Supervisor Portal</h2>
            <p style={{ fontSize: 12, color: 'var(--stone-400)', marginTop: 2 }}>All active drawings ready for site release</p>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            {[
              { val: pending.length, label: 'Pending Sign-off', color: 'var(--amber)' },
              { val: signed.length, label: 'Signed', color: 'var(--green)' },
            ].map(k => (
              <div key={k.label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 26, color: k.color, lineHeight: 1 }}>{k.val}</div>
                <div style={{ fontSize: 11, color: 'var(--stone-400)' }}>{k.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: '16px 32px 40px' }}>
          {/* Protocol reminder */}
          <div style={{ padding: '12px 16px', background: 'var(--amber-bg)', borderRadius: 'var(--radius-md)', marginBottom: 20, fontSize: 12, color: 'var(--amber)', border: '1px solid rgba(196,132,42,0.15)' }}>
            <strong>Sign-off Protocol:</strong> Come to office → Sign below → Take physical prints → Return old version before receiving new version.
          </div>

          {/* Pending sign-offs */}
          {pending.length > 0 && (
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--stone-400)', marginBottom: 12 }}>Awaiting Your Signature</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {pending.map(d => (
                  <div key={d.id} className="card" style={{ padding: '16px 20px', border: '1.5px solid var(--amber-bg)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ width: 8, height: 8, borderRadius: '50%', background: CATEGORY_COLORS[d.category] || 'var(--stone-300)' }} />
                          <span style={{ fontWeight: 600, fontSize: 14, color: 'var(--charcoal)' }}>{d.name}</span>
                          <span style={{ fontSize: 11, color: 'var(--stone-400)', background: 'var(--stone-100)', padding: '1px 8px', borderRadius: 99 }}>{d.version}</span>
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--stone-400)', marginTop: 4 }}>{d.category} · Uploaded {d.date}</div>
                      </div>
                      <button className="btn btn-gold" style={{ fontSize: 12 }} onClick={() => setShowSign(d.id)}>
                        ✎ Sign & Collect Print
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Signed drawings */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--stone-400)', marginBottom: 12 }}>Signed & At Site</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {signed.map(d => (
                <div key={d.id} className="card" style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 14, border: '1px solid var(--green-bg)', background: 'var(--warm-white)' }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--green-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--green)', fontSize: 14, flexShrink: 0 }}>✓</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 500, fontSize: 13, color: 'var(--charcoal)' }}>{d.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--stone-400)' }}>{d.category} · {d.version} · Signed on {d.signedDate}</div>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 99, background: 'var(--green-bg)', color: 'var(--green)' }}>At Site</span>
                  {confirmed[d.id] && (
                    <span style={{ fontSize: 10, color: 'var(--green)', marginLeft: 4 }}>Just signed ✓</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Sign Modal */}
      {showSign && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(26,23,20,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div className="card" style={{ width: 420, padding: 32 }}>
            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, fontSize: '1.5rem', marginBottom: 8 }}>Confirm Receipt</h3>
            <p style={{ fontSize: 13, color: 'var(--stone-400)', marginBottom: 24 }}>
              By signing, you confirm you have received the physical prints for <strong>{drawings.find(d => d.id === showSign)?.name}</strong> and will take them to site.
            </p>
            <label>Your Name (Digital Signature)</label>
            <input className="input" placeholder="Type your full name" value={sigName} onChange={e => setSigName(e.target.value)} />
            <div style={{ display: 'flex', gap: 10, marginTop: 20, justifyContent: 'flex-end' }}>
              <button className="btn btn-ghost" onClick={() => setShowSign(null)}>Cancel</button>
              <button className="btn btn-primary" disabled={!sigName} onClick={() => handleSign(showSign)}>Confirm & Sign</button>
            </div>
          </div>
        </div>
      )}
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
