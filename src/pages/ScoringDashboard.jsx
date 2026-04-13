import React, { useState } from 'react';

/* ── Mock Data ── */
const DESIGNERS = [
  {
    id: 1, name: 'Aditi M.', role: 'Lead Designer', avatar: 'A',
    score: 87, trend: '+4',
    activeProjects: 3,
    stats: {
      tasksAssigned: 24, tasksDone: 21, tasksOverdue: 3,
      firstShotRate: 78,   // % drawings approved in 1st revision
      avgRevisions: 1.4,
      avgSLAAdherence: 92, // % of tasks finished within SLA
      avgDaysVsSLA: '+0.3d', // +ve = over SLA, -ve = under
      clientDelayBlame: 2, // times client delayed their work
      drawingsReleased: 18,
    },
    daily: [
      { task: 'Breaking wall drawing – Sharma', due: 'Today', status: 'done' },
      { task: 'Civil set – Agarwal Apt', due: 'Today', status: 'in-progress' },
      { task: 'Door schedule – Bose Penthouse', due: 'Tomorrow', status: 'pending' },
      { task: 'Working drawings – Mehta Villa', due: 'Overdue', status: 'overdue' },
    ],
    history: [
      { week: 'Apr W1', firstShot: 80, sla: 95 },
      { week: 'Apr W2', firstShot: 75, sla: 88 },
      { week: 'Mar W4', firstShot: 70, sla: 82 },
      { week: 'Mar W3', firstShot: 85, sla: 93 },
    ],
  },
  {
    id: 2, name: 'Priya K.', role: 'Concept Designer', avatar: 'P',
    score: 74, trend: '-2',
    activeProjects: 2,
    stats: {
      tasksAssigned: 18, tasksDone: 13, tasksOverdue: 5,
      firstShotRate: 55,
      avgRevisions: 2.8,
      avgSLAAdherence: 71,
      avgDaysVsSLA: '+1.2d',
      clientDelayBlame: 4,
      drawingsReleased: 11,
    },
    daily: [
      { task: 'Mood board – Gupta 2BHK', due: 'Today', status: 'in-progress' },
      { task: 'Concept v2 – Jain Duplex', due: 'Overdue', status: 'overdue' },
      { task: 'First meeting notes – Sharma', due: 'Tomorrow', status: 'pending' },
    ],
    history: [
      { week: 'Apr W1', firstShot: 55, sla: 71 },
      { week: 'Apr W2', firstShot: 60, sla: 74 },
      { week: 'Mar W4', firstShot: 50, sla: 68 },
      { week: 'Mar W3', firstShot: 65, sla: 80 },
    ],
  },
  {
    id: 3, name: 'Riya S.', role: 'AC Coordinator', avatar: 'R',
    score: 91, trend: '+6',
    activeProjects: 2,
    stats: {
      tasksAssigned: 14, tasksDone: 14, tasksOverdue: 0,
      firstShotRate: 90,
      avgRevisions: 1.1,
      avgSLAAdherence: 98,
      avgDaysVsSLA: '-0.5d',
      clientDelayBlame: 1,
      drawingsReleased: 12,
    },
    daily: [
      { task: 'AC quotation – Sharma', due: 'Today', status: 'done' },
      { task: 'Vendor group – Jain Duplex', due: 'Today', status: 'done' },
      { task: 'Drawing close – Agarwal Apt', due: 'Tomorrow', status: 'pending' },
    ],
    history: [
      { week: 'Apr W1', firstShot: 90, sla: 98 },
      { week: 'Apr W2', firstShot: 88, sla: 96 },
      { week: 'Mar W4', firstShot: 85, sla: 94 },
      { week: 'Mar W3', firstShot: 92, sla: 99 },
    ],
  },
  {
    id: 4, name: 'Neha R.', role: '3D Render Artist', avatar: 'N',
    score: 82, trend: '+1',
    activeProjects: 1,
    stats: {
      tasksAssigned: 20, tasksDone: 17, tasksOverdue: 3,
      firstShotRate: 68,
      avgRevisions: 1.9,
      avgSLAAdherence: 84,
      avgDaysVsSLA: '+0.7d',
      clientDelayBlame: 5,
      drawingsReleased: 14,
    },
    daily: [
      { task: 'Master bedroom render – Bose', due: 'Today', status: 'in-progress' },
      { task: 'Kitchen 3D – Agarwal', due: 'Overdue', status: 'overdue' },
      { task: 'Living render v2 – Bose', due: '15 Apr', status: 'pending' },
    ],
    history: [
      { week: 'Apr W1', firstShot: 68, sla: 84 },
      { week: 'Apr W2', firstShot: 72, sla: 86 },
      { week: 'Mar W4', firstShot: 65, sla: 80 },
      { week: 'Mar W3', firstShot: 70, sla: 83 },
    ],
  },
];

const scoreColor = (s) => s >= 85 ? 'var(--green)' : s >= 70 ? 'var(--amber)' : 'var(--red)';
const scoreLabel = (s) => s >= 85 ? 'Excellent' : s >= 70 ? 'Good' : 'Needs Improvement';

const taskStatusStyle = {
  done:        { bg: 'var(--green-bg)',  color: 'var(--green)',  label: '✓ Done' },
  'in-progress':{ bg: 'var(--blue-bg)', color: 'var(--blue)',   label: '▶ In Progress' },
  pending:     { bg: 'var(--stone-100)', color: 'var(--stone-400)', label: '· Pending' },
  overdue:     { bg: 'var(--red-bg)',   color: 'var(--red)',    label: '⚠ Overdue' },
};

/* ── Mini bar ── */
function MiniBar({ value, max = 100, color }) {
  return (
    <div style={{ width: '100%', height: 4, background: 'var(--stone-100)', borderRadius: 99, marginTop: 4 }}>
      <div style={{ width: `${(value / max) * 100}%`, height: '100%', background: color || 'var(--gold)', borderRadius: 99, transition: 'width 0.5s ease' }} />
    </div>
  );
}

/* ── Score Ring (simple CSS) ── */
function ScoreRing({ score }) {
  const c = scoreColor(score);
  const deg = (score / 100) * 360;
  return (
    <div style={{
      width: 64, height: 64, borderRadius: '50%', flexShrink: 0,
      background: `conic-gradient(${c} 0deg ${deg}deg, var(--stone-100) ${deg}deg 360deg)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative',
    }}>
      <div style={{
        width: 46, height: 46, borderRadius: '50%', background: 'var(--warm-white)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 700, fontSize: 15, color: c, fontFamily: 'Inter',
      }}>{score}</div>
    </div>
  );
}

/* ── Detail Panel ── */
function DesignerDetail({ d }) {
  return (
    <div style={{ flex: 1, padding: '24px 28px', overflowY: 'auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
        <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 20, fontWeight: 700 }}>{d.avatar}</div>
        <div>
          <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', fontWeight: 400 }}>{d.name}</h3>
          <div style={{ fontSize: 12, color: 'var(--stone-400)' }}>{d.role} · {d.activeProjects} active projects</div>
        </div>
        <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
          <div style={{ fontSize: 11, color: 'var(--stone-400)', marginBottom: 4 }}>Performance Score</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <ScoreRing score={d.score} />
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: scoreColor(d.score) }}>{scoreLabel(d.score)}</div>
              <div style={{ fontSize: 11, color: d.trend.startsWith('+') ? 'var(--green)' : 'var(--red)' }}>{d.trend} this week</div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
        {[
          { label: 'First-Shot Rate', val: `${d.stats.firstShotRate}%`, sub: 'drawings approved in 1st revision', color: d.stats.firstShotRate >= 75 ? 'var(--green)' : d.stats.firstShotRate >= 60 ? 'var(--amber)' : 'var(--red)' },
          { label: 'Avg Revisions', val: `${d.stats.avgRevisions}x`, sub: 'per drawing (lower is better)', color: d.stats.avgRevisions <= 1.5 ? 'var(--green)' : d.stats.avgRevisions <= 2.5 ? 'var(--amber)' : 'var(--red)' },
          { label: 'SLA Adherence', val: `${d.stats.avgSLAAdherence}%`, sub: 'tasks completed within SLA', color: d.stats.avgSLAAdherence >= 85 ? 'var(--green)' : 'var(--amber)' },
          { label: 'Tasks Done', val: `${d.stats.tasksDone}/${d.stats.tasksAssigned}`, sub: 'this month', color: 'var(--charcoal)' },
          { label: 'Overdue Tasks', val: d.stats.tasksOverdue, sub: 'pending beyond deadline', color: d.stats.tasksOverdue === 0 ? 'var(--green)' : 'var(--red)' },
          { label: 'Drawings Released', val: d.stats.drawingsReleased, sub: 'approved & sent to site', color: 'var(--charcoal)' },
        ].map(k => (
          <div key={k.label} className="card" style={{ padding: '14px 16px' }}>
            <div style={{ fontSize: 11, color: 'var(--stone-400)', marginBottom: 4 }}>{k.label}</div>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 26, color: k.color, lineHeight: 1 }}>{k.val}</div>
            <div style={{ fontSize: 10, color: 'var(--stone-300)', marginTop: 4 }}>{k.sub}</div>
            <MiniBar value={typeof k.val === 'string' && k.val.includes('%') ? parseInt(k.val) : 70} color={k.color} />
          </div>
        ))}
      </div>

      {/* Today's Task Sheet */}
      <div className="card" style={{ padding: '16px 20px', marginBottom: 20 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--stone-400)', marginBottom: 14 }}>Today's Task Sheet</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {d.daily.map((t, i) => {
            const st = taskStatusStyle[t.status];
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 12px', borderRadius: 'var(--radius-md)', background: 'var(--parchment)' }}>
                <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 10px', borderRadius: 99, background: st.bg, color: st.color, whiteSpace: 'nowrap' }}>{st.label}</span>
                <span style={{ flex: 1, fontSize: 13, color: 'var(--charcoal)' }}>{t.task}</span>
                <span style={{ fontSize: 11, color: t.due === 'Overdue' ? 'var(--red)' : 'var(--stone-400)', whiteSpace: 'nowrap' }}>{t.due}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Weekly Trend */}
      <div className="card" style={{ padding: '16px 20px' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--stone-400)', marginBottom: 14 }}>Weekly Trend</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {d.history.map((h, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '70px 1fr 42px 1fr 42px', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 11, color: 'var(--stone-400)' }}>{h.week}</span>
              <div style={{ height: 5, borderRadius: 99, background: 'var(--stone-100)', overflow: 'hidden' }}>
                <div style={{ width: `${h.firstShot}%`, height: '100%', background: 'var(--gold)', borderRadius: 99 }} />
              </div>
              <span style={{ fontSize: 10, color: 'var(--stone-400)', textAlign: 'right' }}>{h.firstShot}%</span>
              <div style={{ height: 5, borderRadius: 99, background: 'var(--stone-100)', overflow: 'hidden' }}>
                <div style={{ width: `${h.sla}%`, height: '100%', background: 'var(--green)', borderRadius: 99 }} />
              </div>
              <span style={{ fontSize: 10, color: 'var(--stone-400)', textAlign: 'right' }}>{h.sla}%</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--stone-400)' }}>
            <div style={{ width: 12, height: 4, borderRadius: 99, background: 'var(--gold)' }} /> First-Shot Rate
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--stone-400)' }}>
            <div style={{ width: 12, height: 4, borderRadius: 99, background: 'var(--green)' }} /> SLA Adherence
          </div>
        </div>
      </div>

      {/* Avg SLA vs Actual */}
      <div className="card" style={{ padding: '14px 20px', marginTop: 16, display: 'flex', gap: 24 }}>
        <div>
          <div style={{ fontSize: 11, color: 'var(--stone-400)' }}>Avg Time vs SLA</div>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 24, color: d.stats.avgDaysVsSLA.startsWith('-') ? 'var(--green)' : 'var(--amber)' }}>{d.stats.avgDaysVsSLA}</div>
          <div style={{ fontSize: 10, color: 'var(--stone-300)' }}>{d.stats.avgDaysVsSLA.startsWith('-') ? 'Finishing early on average' : 'Running over SLA on average'}</div>
        </div>
        <div style={{ borderLeft: '1px solid var(--stone-100)', paddingLeft: 24 }}>
          <div style={{ fontSize: 11, color: 'var(--stone-400)' }}>Client Delays Impacting Work</div>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 24, color: 'var(--stone-500)' }}>{d.stats.clientDelayBlame}x</div>
          <div style={{ fontSize: 10, color: 'var(--stone-300)' }}>times client held this designer's work</div>
        </div>
      </div>
    </div>
  );
}

export default function ScoringDashboard({ onBack, onNavigate, user }) {
  const [selected, setSelected] = useState(DESIGNERS[0]);

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
            { label: 'All Projects',     icon: '▦',  onClick: () => onNavigate('projects') },
            { label: 'Designer Scoring', icon: '◈',  active: true },
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
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Designer List */}
        <div style={S.list}>
          <div style={{ padding: '24px 16px 12px', borderBottom: '1px solid var(--stone-100)' }}>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, fontSize: '1.5rem', color: 'var(--charcoal)' }}>Designer Scoring</h2>
            <p style={{ fontSize: 12, color: 'var(--stone-400)', marginTop: 2 }}>Click to view full breakdown</p>
          </div>
          <div style={{ padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: 8, overflowY: 'auto' }}>
            {DESIGNERS.map(d => (
              <div
                key={d.id}
                onClick={() => setSelected(d)}
                style={{
                  padding: '14px 14px', borderRadius: 'var(--radius-lg)', cursor: 'pointer', transition: 'all 0.2s',
                  background: selected?.id === d.id ? 'var(--parchment)' : 'transparent',
                  border: `1.5px solid ${selected?.id === d.id ? 'var(--stone-200)' : 'transparent'}`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14, fontWeight: 700, flexShrink: 0 }}>{d.avatar}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--charcoal)' }}>{d.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--stone-400)' }}>{d.role}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, color: scoreColor(d.score) }}>{d.score}</div>
                    <div style={{ fontSize: 10, color: d.trend.startsWith('+') ? 'var(--green)' : 'var(--red)' }}>{d.trend}</div>
                  </div>
                </div>
                <div style={{ marginTop: 10 }}>
                  {/* 3-metric quick bar */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
                    {[
                      { label: 'First Shot', val: d.stats.firstShotRate + '%' },
                      { label: 'SLA', val: d.stats.avgSLAAdherence + '%' },
                      { label: 'Overdue', val: d.stats.tasksOverdue },
                    ].map(m => (
                      <div key={m.label} style={{ textAlign: 'center', padding: '4px 0', background: 'var(--stone-100)', borderRadius: 6 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--charcoal)' }}>{m.val}</div>
                        <div style={{ fontSize: 9, color: 'var(--stone-400)' }}>{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detail */}
        <div style={{ flex: 1, overflowY: 'auto', borderLeft: '1px solid var(--stone-100)', background: 'var(--warm-white)' }}>
          {selected ? <DesignerDetail d={selected} /> : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--stone-300)' }}>Select a designer to view details</div>
          )}
        </div>
      </div>
    </div>
  );
}

const S = {
  root: { display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--cream)' },
  sidebar: { width: 220, background: 'var(--charcoal)', display: 'flex', flexDirection: 'column', flexShrink: 0 },
  sidebarLogo: { padding: '28px 24px 20px', display: 'flex', alignItems: 'baseline', gap: 8, borderBottom: '1px solid rgba(255,255,255,0.07)' },
  nav: { flex: 1, padding: '10px 10px', display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto' },
  navItem: { display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px', borderRadius: 'var(--radius-md)', background: 'transparent', border: 'none', cursor: 'pointer', color: 'rgba(249,246,241,0.45)', fontSize: 12, fontFamily: 'Inter', transition: 'all 0.2s', width: '100%', textAlign: 'left' },
  navItemActive: { background: 'rgba(201,169,110,0.15)', color: 'var(--gold-light)' },
  sidebarFooter: { padding: '16px 16px 20px', borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', gap: 10 },
  list: { width: 260, borderRight: '1px solid var(--stone-100)', display: 'flex', flexDirection: 'column', overflowY: 'hidden', background: 'var(--cream)' },
};
