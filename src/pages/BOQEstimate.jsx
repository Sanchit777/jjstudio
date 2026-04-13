import React, { useState } from 'react';

const LINE_ITEMS = [
  { id: 1, category: 'Civil Work', description: 'Demolition, Brick, Plaster, Waterproofing', area: 'Full Flat', unit: 'Lump sum', qty: 1, rate: 180000, status: 'confirmed' },
  { id: 2, category: 'False Ceiling', description: 'GI Grid + Gypsum Board, POP finishing', area: '1800 sqft', unit: 'sqft', qty: 1800, rate: 90, status: 'confirmed' },
  { id: 3, category: 'Electrical', description: 'Complete electrical rewiring, modular switches (Legrand)', area: 'Full Flat', unit: 'Lump sum', qty: 1, rate: 145000, status: 'confirmed' },
  { id: 4, category: 'Flooring – Marble', description: 'Italian Marble – Living & Master (1200x1200)', area: '800 sqft', unit: 'sqft', qty: 800, rate: 350, status: 'confirmed' },
  { id: 5, category: 'Flooring – Tile', description: 'Vitrified tiles – Bedrooms (600x600)', area: '600 sqft', unit: 'sqft', qty: 600, rate: 120, status: 'confirmed' },
  { id: 6, category: 'Kitchen', description: 'Modular kitchen – Häfele hardware, acrylic shutters', area: 'Kitchen', unit: 'Lump sum', qty: 1, rate: 285000, status: 'confirmed' },
  { id: 7, category: 'Joinery / Wardrobes', description: '3 full wardrobes, TV unit, crockery unit', area: 'Bedrooms + Living', unit: 'Lump sum', qty: 1, rate: 220000, status: 'tentative' },
  { id: 8, category: 'Bathrooms', description: 'CP – Jaquar Lyric, Sanitary – Kohler, tiles, waterproofing', area: '3 Bathrooms', unit: 'Per bathroom', qty: 3, rate: 65000, status: 'tentative' },
  { id: 9, category: 'AC System', description: '5 AC units – Daikin + conduit + controller', area: 'Full Flat', unit: 'Lump sum', qty: 1, rate: 140000, status: 'confirmed' },
  { id: 10, category: 'Painting', description: 'Asian Paints Royale – all rooms + exterior', area: 'Full Flat', unit: 'Lump sum', qty: 1, rate: 85000, status: 'confirmed' },
  { id: 11, category: 'Automation', description: 'Home automation – 20 points (Schneider)', area: 'Full Flat', unit: 'Lump sum', qty: 1, rate: 220000, status: 'optional' },
  { id: 12, category: 'Design Fees', description: 'Studio design fee (3BHK)', area: '—', unit: 'Lump sum', qty: 1, rate: 150000, status: 'confirmed' },
];

const statusStyle = {
  confirmed: { bg: 'var(--green-bg)', color: 'var(--green)', label: 'Confirmed' },
  tentative: { bg: 'var(--amber-bg)', color: 'var(--amber)', label: 'Tentative' },
  optional:  { bg: 'var(--purple-bg)', color: 'var(--purple)', label: 'Optional' },
};

export default function BOQEstimate({ onNavigate, user }) {
  const [items, setItems] = useState(LINE_ITEMS);
  const [showOptional, setShowOptional] = useState(true);
  const [released, setReleased] = useState(false);

  const visible = showOptional ? items : items.filter(i => i.status !== 'optional');
  const total = visible.reduce((sum, i) => sum + i.qty * i.rate, 0);
  const confirmed = items.filter(i => i.status === 'confirmed').reduce((s, i) => s + i.qty * i.rate, 0);
  const tentative = items.filter(i => i.status === 'tentative').reduce((s, i) => s + i.qty * i.rate, 0);
  const optional  = items.filter(i => i.status === 'optional').reduce((s, i) => s + i.qty * i.rate, 0);

  const fmt = (n) => '₹' + n.toLocaleString('en-IN');

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
            { label: 'Vendor Hub', icon: '🏪', page: 'vendor' },
            { label: 'BOQ Estimate', icon: '💰', active: true },
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

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header */}
        <div style={S.header}>
          <div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, fontSize: '1.6rem' }}>Tentative BOQ & Cost Estimate</h2>
            <p style={{ fontSize: 12, color: 'var(--stone-400)', marginTop: 2 }}>Sharma Residence · 3BHK · Generated after Concept Approval</p>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--stone-500)', textTransform: 'none', letterSpacing: 0, cursor: 'pointer' }}>
              <input type="checkbox" checked={showOptional} onChange={e => setShowOptional(e.target.checked)} /> Include optional items
            </label>
            {released
              ? <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--green)', display: 'flex', alignItems: 'center', gap: 4 }}>✓ Released to Client</span>
              : <button className="btn btn-gold" style={{ fontSize: 13 }} onClick={() => setReleased(true)}>📤 Release to Client</button>}
          </div>
        </div>

        {/* Summary cards */}
        <div style={{ padding: '16px 24px 0', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, background: 'var(--cream)' }}>
          {[
            { label: 'Project Total', val: fmt(total), color: 'var(--charcoal)' },
            { label: 'Confirmed Items', val: fmt(confirmed), color: 'var(--green)' },
            { label: 'Tentative Items', val: fmt(tentative), color: 'var(--amber)' },
            { label: 'Optional Items', val: fmt(optional), color: 'var(--purple)' },
          ].map(k => (
            <div key={k.label} className="card" style={{ padding: '12px 16px' }}>
              <div style={{ fontSize: 20, fontFamily: 'Cormorant Garamond, serif', color: k.color, lineHeight: 1 }}>{k.val}</div>
              <div style={{ fontSize: 11, color: 'var(--stone-400)', marginTop: 4 }}>{k.label}</div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px 32px' }}>
          <div className="card" style={{ overflow: 'hidden', padding: 0 }}>
            {/* Column header */}
            <div style={{ display: 'grid', gridTemplateColumns: '0.5fr 1.5fr 2fr 1fr 0.8fr 0.8fr 0.8fr 0.8fr', gap: 8, padding: '10px 16px', background: 'var(--parchment)', fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--stone-400)', borderBottom: '1px solid var(--stone-100)' }}>
              <span>#</span><span>Category</span><span>Description</span><span>Area</span><span>Unit</span><span>Qty</span><span>Rate</span><span>Amount</span>
            </div>
            {visible.map((item, i) => {
              const st = statusStyle[item.status];
              return (
                <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '0.5fr 1.5fr 2fr 1fr 0.8fr 0.8fr 0.8fr 0.8fr', gap: 8, padding: '10px 16px', borderBottom: '1px solid var(--stone-100)', alignItems: 'center', background: i % 2 === 0 ? 'var(--warm-white)' : 'var(--cream)' }}>
                  <span style={{ fontSize: 11, color: 'var(--stone-400)' }}>{item.id}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--charcoal)' }}>{item.category}</div>
                    <span style={{ fontSize: 10, fontWeight: 600, padding: '1px 6px', borderRadius: 99, background: st.bg, color: st.color }}>{st.label}</span>
                  </div>
                  <span style={{ fontSize: 12, color: 'var(--stone-500)' }}>{item.description}</span>
                  <span style={{ fontSize: 12, color: 'var(--stone-400)' }}>{item.area}</span>
                  <span style={{ fontSize: 12, color: 'var(--stone-400)' }}>{item.unit}</span>
                  <span style={{ fontSize: 12, color: 'var(--stone-400)' }}>{item.qty}</span>
                  <span style={{ fontSize: 12, color: 'var(--stone-400)' }}>{item.qty === 1 ? fmt(item.rate) : `${fmt(item.rate)}/u`}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--charcoal)' }}>{fmt(item.qty * item.rate)}</span>
                </div>
              );
            })}
            {/* Total row */}
            <div style={{ display: 'grid', gridTemplateColumns: '0.5fr 1.5fr 2fr 1fr 0.8fr 0.8fr 0.8fr 0.8fr', gap: 8, padding: '14px 16px', background: 'var(--charcoal)', alignItems: 'center' }}>
              <span />
              <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 16, color: 'var(--cream)', gridColumn: 'span 5' }}>GRAND TOTAL (TENTATIVE)</span>
              <span />
              <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, color: 'var(--gold)', fontWeight: 400 }}>{fmt(total)}</span>
            </div>
          </div>
          <div style={{ marginTop: 12, fontSize: 11, color: 'var(--stone-300)', fontStyle: 'italic' }}>
            * This is a tentative estimate. Final amounts may vary based on material selections, site conditions, and client decisions. GST extra as applicable.
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
  header: { padding: '20px 24px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--stone-100)', background: 'var(--cream)', flexShrink: 0 },
};
