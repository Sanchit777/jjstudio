import React, { useState } from 'react';

const VENDORS = [
  {
    id: 1, category: 'Kitchen', name: 'Sleek Modular Kitchens', contact: '+91 98300 11111',
    quotation: '₹3,20,000', submitted: '08 Apr', status: 'under-review',
    notes: 'Includes 10-year warranty on carcase. Delivery: 45 days.',
    pros: ['Established brand', '10yr warranty', 'Variety of shutters'],
    cons: ['Higher price', 'Longer lead time'],
  },
  {
    id: 2, category: 'Kitchen', name: 'Häfele Studio Kolkata', contact: '+91 98300 22222',
    quotation: '₹2,85,000', submitted: '09 Apr', status: 'selected',
    notes: 'German hardware included. Delivery: 30 days.',
    pros: ['German hardware', 'Faster delivery', 'Better finish quality'],
    cons: ['Less warranty (5yr)', 'Premium per accessory'],
  },
  {
    id: 3, category: 'Kitchen', name: 'Local Carpenter (Rahul)', contact: '+91 98300 33333',
    quotation: '₹1,60,000', submitted: '10 Apr', status: 'rejected',
    notes: 'Custom work. Timeline uncertain.',
    pros: ['Cheapest option', 'Fully custom'],
    cons: ['No warranty', 'Uncertain timeline', 'Low-quality hardware'],
  },
  {
    id: 4, category: 'AC', name: 'Daikin Authorised Dealer', contact: '+91 98300 44444',
    quotation: '₹1,40,000', submitted: '05 Apr', status: 'selected',
    notes: '5 AC units. 5-year AMC included.',
    pros: ['Brand product', '5yr AMC', 'Reliable'],
    cons: ['Slightly expensive'],
  },
  {
    id: 5, category: 'Automation', name: 'Schneider Home Control', contact: '+91 98300 55555',
    quotation: '₹2,20,000', submitted: '11 Apr', status: 'pending-quote',
    notes: 'Awaiting final scope from client.',
    pros: ['Reputed brand'],
    cons: ['Quote incomplete'],
  },
];

const statusStyle = {
  'selected':      { bg: 'var(--green-bg)', color: 'var(--green)', label: '✓ Selected' },
  'under-review':  { bg: 'var(--blue-bg)', color: 'var(--blue)', label: '▶ Under Review' },
  'rejected':      { bg: 'var(--red-bg)', color: 'var(--red)', label: '✕ Rejected' },
  'pending-quote': { bg: 'var(--amber-bg)', color: 'var(--amber)', label: '· Pending Quote' },
};

const CATEGORIES = ['All', 'Kitchen', 'AC', 'Automation'];

export default function VendorHub({ onNavigate, user }) {
  const [cat, setCat] = useState('All');
  const [expanded, setExpanded] = useState(null);

  const filtered = VENDORS.filter(v => cat === 'All' || v.category === cat);

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
            { label: 'Client Checklist', icon: '✅', page: 'checklist' },
            { label: 'Vendor Hub', icon: '🏪', active: true },
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
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, fontSize: '1.6rem' }}>Vendor Coordination Hub</h2>
            <p style={{ fontSize: 12, color: 'var(--stone-400)', marginTop: 2 }}>Kitchen · AC · Automation · Quotation Comparison</p>
          </div>
          <button className="btn btn-primary btn-sm">+ Add Vendor</button>
        </div>

        <div style={{ padding: '20px 32px 40px' }}>
          {/* Filter tabs */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setCat(c)} className="btn btn-sm" style={{
                background: cat === c ? 'var(--charcoal)' : 'transparent',
                color: cat === c ? '#fff' : 'var(--stone-500)',
                border: `1.5px solid ${cat === c ? 'var(--charcoal)' : 'var(--stone-200)'}`,
                borderRadius: 'var(--radius-full)',
              }}>{c}</button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {filtered.map(v => {
              const st = statusStyle[v.status];
              const isOpen = expanded === v.id;
              return (
                <div key={v.id} className="card" style={{ overflow: 'hidden', border: v.status === 'selected' ? '1.5px solid var(--green-bg)' : '1px solid var(--stone-100)' }}>
                  <div style={{ padding: '16px 20px', display: 'flex', gap: 14, alignItems: 'flex-start', cursor: 'pointer' }} onClick={() => setExpanded(isOpen ? null : v.id)}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <span style={{ fontWeight: 600, fontSize: 14, color: 'var(--charcoal)' }}>{v.name}</span>
                        <span style={{ fontSize: 10, padding: '1px 8px', borderRadius: 99, background: 'var(--stone-100)', color: 'var(--stone-400)', fontWeight: 600 }}>{v.category}</span>
                        <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 99, background: st.bg, color: st.color }}>{st.label}</span>
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--stone-400)', marginTop: 4 }}>
                        {v.contact} · Quote submitted: {v.submitted}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 24, color: 'var(--charcoal)', lineHeight: 1 }}>{v.quotation}</div>
                      <div style={{ fontSize: 10, color: 'var(--stone-400)' }}>Quoted amount</div>
                    </div>
                    <span style={{ fontSize: 13, color: 'var(--stone-300)', padding: '4px 0', flexShrink: 0 }}>{isOpen ? '▲' : '▼'}</span>
                  </div>

                  {isOpen && (
                    <div style={{ padding: '0 20px 16px', borderTop: '1px solid var(--stone-100)', paddingTop: 12 }}>
                      <p style={{ fontSize: 13, color: 'var(--stone-500)', marginBottom: 12 }}>{v.notes}</p>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        <div>
                          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--green)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Pros</div>
                          {v.pros.map((p, i) => <div key={i} style={{ fontSize: 12, color: 'var(--stone-500)', marginBottom: 3 }}>✓ {p}</div>)}
                        </div>
                        <div>
                          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--red)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Cons</div>
                          {v.cons.map((c, i) => <div key={i} style={{ fontSize: 12, color: 'var(--stone-500)', marginBottom: 3 }}>✕ {c}</div>)}
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                        {v.status !== 'selected' && <button className="btn btn-primary btn-sm">✓ Select This Vendor</button>}
                        {v.status !== 'rejected' && <button className="btn btn-outline btn-sm" style={{ color: 'var(--red)', borderColor: 'var(--red)' }}>✕ Reject</button>}
                        <button className="btn btn-ghost btn-sm">📄 View Full Quote</button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
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
