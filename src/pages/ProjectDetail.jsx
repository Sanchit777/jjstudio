import React, { useState } from 'react';

/* ── Stage Configuration ── */
const STAGES = [
  {
    id: 0, label: 'Onboarding', icon: '◈', done: true,
    tasks: ['Client confirmed & payment received', 'Project created in system'],
  },
  {
    id: 1, label: 'Pre-Requisites & Measurement', icon: '◎', done: true,
    tasks: ['AutoCAD Drawing received', 'Fire Drawing received', 'MEP Drawing received', 'AC Drawing received', 'Measurement assigned: Aditi M.', 'Checklist uploaded ✓'],
  },
  {
    id: 2, label: 'Space Planning / Furniture Layout', icon: '▣', done: true,
    tasks: ['First layout uploaded (v1)', 'Client review (v1 — Minor changes)', 'v2 uploaded', 'Client approved v2'],
    sla: '1 day (Internal)', clientDelay: '5 days', iterations: 2,
  },
  {
    id: 3, label: 'Civil Drawing Set', icon: '▦', active: true,
    tasks: ['Breaking walls drawing — In Progress', 'Construction drawing — Pending', 'Door / Window schedules — Pending', 'Tentative Electrical — Pending'],
    sla: '2 days', assignee: 'Aditi M.',
  },
  {
    id: 4, label: 'Parallel Tracks', icon: '⊞',
    parallel: true,
    tracks: [
      { id: 'ac', label: 'AC Coordination', assignee: 'Riya S.', sla: '15 days', status: 'pending', steps: ['WhatsApp group created', 'Layout sent to vendor', 'Quotation pending', 'Final drawing'] },
      { id: 'mat', label: 'Client Material Finalization', assignee: 'Self (MD)', sla: '10 days', status: 'pending', steps: ['Marble / Flooring', 'Bathroom CP & Sanitary', 'Kitchen layout', 'Automation vendor'] },
      { id: 'concept', label: 'Concept Design', assignee: 'Priya K.', sla: '2 days', status: 'pending', steps: ['First meeting (taste catching)', 'Second meeting (room-wise mood board)', 'Tentative BOQ released'] },
    ],
  },
  {
    id: 5, label: 'In-House Design Meeting', icon: '⚑', locked: true,
    tasks: ['All parallel tracks must be closed first', 'Lead Designer sign-off required'],
  },
  {
    id: 6, label: '3D Rendering (Room-by-Room)', icon: '◐', locked: true,
    rooms: [
      { name: 'Master Bedroom', sla: '2 days', status: 'pending' },
      { name: "Son's Bedroom",  sla: '2 days', status: 'pending' },
      { name: 'Kitchen',        sla: '1.5 days', status: 'pending' },
      { name: 'Living & Dining', sla: '5 days', status: 'pending' },
    ],
  },
  {
    id: 7, label: 'Final Execution & DLR', icon: '◆', locked: true,
    tasks: ['False Ceiling drawings', 'Working drawings', 'Final Electrical', 'Supervisor sign-off & DLR release'],
  },
];

function StepDot({ stage }) {
  if (stage.done)   return <div className="tl-dot tl-dot-done">✓</div>;
  if (stage.active) return <div className="tl-dot tl-dot-active">{stage.id + 1}</div>;
  if (stage.locked) return <div className="tl-dot tl-dot-locked">⊘</div>;
  return <div className="tl-dot tl-dot-pending">{stage.id + 1}</div>;
}

function TaskItem({ text, done }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0' }}>
      <div style={{
        width: 16, height: 16, borderRadius: 4, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10,
        background: done ? 'var(--green)' : 'var(--stone-100)',
        color: done ? '#fff' : 'var(--stone-300)',
        border: done ? 'none' : '1.5px solid var(--stone-200)',
      }}>{done ? '✓' : ''}</div>
      <span style={{ fontSize: 13, color: done ? 'var(--stone-500)' : 'var(--charcoal)' }}>{text}</span>
    </div>
  );
}

function ParallelTrackCard({ track }) {
  const [expanded, setExpanded] = useState(true);
  const statusColors = { pending: 'var(--amber)', done: 'var(--green)', active: 'var(--blue)' };
  return (
    <div className="card" style={{ padding: '14px 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: expanded ? 12 : 0 }} onClick={() => setExpanded(e => !e)}>
        <div>
          <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--charcoal)' }}>{track.label}</div>
          <div style={{ fontSize: 11, color: 'var(--stone-400)', marginTop: 2 }}>Assigned: {track.assignee} · SLA: {track.sla}</div>
        </div>
        <span style={{ fontSize: 11, fontWeight: 600, color: statusColors[track.status], padding: '2px 8px', borderRadius: 99, background: track.status === 'pending' ? 'var(--amber-bg)' : 'var(--green-bg)' }}>
          {track.status === 'pending' ? 'Pending' : 'Done'}
        </span>
      </div>
      {expanded && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {track.steps.map((s, i) => <TaskItem key={i} text={s} done={false} />)}
        </div>
      )}
    </div>
  );
}

function RoomCard({ room }) {
  const statusColor = { pending: 'var(--stone-100)', done: 'var(--green-bg)', review: 'var(--amber-bg)' };
  return (
    <div style={{ border: '1.5px solid var(--stone-200)', borderRadius: 'var(--radius-md)', padding: '12px 14px', background: statusColor[room.status] || 'var(--stone-100)' }}>
      <div style={{ fontWeight: 500, fontSize: 13 }}>{room.name}</div>
      <div style={{ fontSize: 11, color: 'var(--stone-400)', marginTop: 2 }}>SLA: {room.sla}</div>
      <div style={{ fontSize: 11, color: 'var(--stone-300)', marginTop: 6 }}>No uploads yet</div>
    </div>
  );
}

function StageCard({ stage }) {
  const [open, setOpen] = useState(stage.active || stage.done);
  return (
    <div style={{ display: 'flex', gap: 16, position: 'relative' }}>
      {/* connector */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <StepDot stage={stage} />
        <div style={{ flex: 1, width: 1.5, background: 'var(--stone-200)', marginTop: 4 }} />
      </div>

      {/* content */}
      <div style={{ flex: 1, paddingBottom: 24 }}>
        <div
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', paddingBottom: open ? 12 : 0 }}
          onClick={() => !stage.locked && setOpen(o => !o)}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ fontWeight: 600, fontSize: 14, color: stage.locked ? 'var(--stone-300)' : 'var(--charcoal)' }}>{stage.label}</div>
            {stage.active && <span className="badge badge-amber" style={{ fontSize: 10 }}>Active</span>}
            {stage.done  && <span className="badge badge-green" style={{ fontSize: 10 }}>Complete</span>}
            {stage.locked && <span className="badge badge-stone" style={{ fontSize: 10 }}>🔒 Locked</span>}
            {stage.parallel && <span className="badge badge-blue" style={{ fontSize: 10 }}>4 Parallel Tracks</span>}
          </div>
          {!stage.locked && (
            <span style={{ fontSize: 13, color: 'var(--stone-300)' }}>{open ? '▲' : '▼'}</span>
          )}
        </div>

        {/* Metadata strip */}
        {open && (stage.sla || stage.clientDelay || stage.assignee) && (
          <div style={{ display: 'flex', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
            {stage.sla        && <span style={chip}><span>⏱</span> Internal SLA: {stage.sla}</span>}
            {stage.clientDelay && <span style={{ ...chip, background: 'var(--amber-bg)', color: 'var(--amber)' }}><span>◷</span> Client held: {stage.clientDelay}</span>}
            {stage.assignee   && <span style={chip}><span>✦</span> {stage.assignee}</span>}
            {stage.iterations && <span style={chip}><span>↺</span> {stage.iterations} iterations</span>}
          </div>
        )}

        {open && !stage.parallel && !stage.rooms && stage.tasks && (
          <div className="card" style={{ padding: '10px 16px' }}>
            {stage.tasks.map((t, i) => <TaskItem key={i} text={t} done={stage.done || (stage.active && i === 0)} />)}
          </div>
        )}

        {open && stage.parallel && stage.tracks && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
            {stage.tracks.map(t => <ParallelTrackCard key={t.id} track={t} />)}
          </div>
        )}

        {open && stage.rooms && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 10 }}>
            {stage.rooms.map(r => <RoomCard key={r.name} room={r} />)}
          </div>
        )}
      </div>
    </div>
  );
}

const chip = {
  display: 'inline-flex', alignItems: 'center', gap: 4,
  fontSize: 11, background: 'var(--stone-100)', color: 'var(--stone-500)',
  padding: '3px 10px', borderRadius: 99,
};

export default function ProjectDetail({ user, project, onBack }) {
  const p = project || {
    client: 'Sharma Residence', type: '3BHK', designer: 'Aditi M.',
    stageLabel: 'Civil Drawing', progress: 42, clientDelay: 5,
    status: 'on-track', city: 'Kolkata', value: '₹14L', startDate: '01 Feb 2025',
  };

  const statusMap = {
    'on-track': 'badge-green', 'delayed': 'badge-red', 'at-risk': 'badge-amber',
  };

  return (
    <div style={S.root}>
      {/* Topbar */}
      <header style={S.topbar}>
        <button className="btn btn-ghost btn-sm" onClick={onBack}>← Back to Projects</button>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, fontSize: '1.5rem', color: 'var(--charcoal)' }}>{p.client}</h2>
            <p style={{ fontSize: 12, color: 'var(--stone-400)' }}>{p.type} · {p.city} · Started {p.startDate}</p>
          </div>
          <span className={`badge ${statusMap[p.status]}`}>{p.status}</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={chip}><span>✦</span> {p.designer}</div>
          <div style={chip}><span>◷</span> {p.progress}% complete</div>
          <div style={{ ...chip, fontWeight: 600 }}>{p.value}</div>
        </div>
      </header>

      <div style={S.body}>
        {/* Left: Timeline */}
        <div style={S.timeline}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--stone-400)', marginBottom: 24, paddingLeft: 50 }}>Project Journey</div>
          {STAGES.map(stage => <StageCard key={stage.id} stage={stage} />)}
        </div>

        {/* Right: Sidebar info */}
        <div style={S.rightPanel}>
          {/* SLA overview */}
          <div className="card card-pad" style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--stone-400)', marginBottom: 14 }}>Timeline Overview</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Target Completion', val: '60 days', ok: true },
                { label: 'Days Elapsed',      val: '32 days', ok: true },
                { label: 'Designer Time',     val: '20 days', ok: true },
                { label: 'Client Delays',     val: '5 days',  ok: false },
                { label: 'Days Remaining',    val: '~18 days',ok: true },
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                  <span style={{ color: 'var(--stone-400)' }}>{row.label}</span>
                  <span style={{ fontWeight: 600, color: row.ok ? 'var(--charcoal)' : 'var(--amber)' }}>{row.val}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 14 }}>
              <div className="progress-track"><div className="progress-fill" style={{ width: `${p.progress}%` }} /></div>
            </div>
          </div>

          {/* Designer chip */}
          <div className="card card-pad" style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--stone-400)', marginBottom: 14 }}>Team Assigned</div>
            {[
              { name: 'Aditi M.',  role: 'Lead Designer (Layout + Civil)' },
              { name: 'Priya K.',  role: 'Concept Design' },
              { name: 'Riya S.',   role: 'AC Coordination' },
              { name: '—',         role: '3D Rendering (unassigned)' },
            ].map(m => (
              <div key={m.name} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: m.name === '—' ? 'var(--stone-100)' : 'linear-gradient(135deg, var(--gold), var(--gold-dark))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: m.name === '—' ? 'var(--stone-300)' : '#fff', fontSize: 11, fontWeight: 600, flexShrink: 0 }}>
                  {m.name[0]}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--charcoal)' }}>{m.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--stone-400)' }}>{m.role}</div>
                </div>
              </div>
            ))}
            <button className="btn btn-outline w-full btn-sm" style={{ marginTop: 6, justifyContent: 'center' }}>Reassign Role</button>
          </div>

          {/* Alerts */}
          {p.clientDelay > 0 && (
            <div className="card" style={{ padding: '14px 16px', border: '1px solid var(--amber-bg)', background: 'var(--amber-bg)', marginBottom: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--amber)', marginBottom: 4 }}>⚠ Client Holding</div>
              <div style={{ fontSize: 12, color: 'var(--stone-500)' }}>Client has delayed Space Planning by {p.clientDelay} days. Send a follow-up reminder.</div>
              <button className="btn btn-sm" style={{ marginTop: 10, background: 'var(--amber)', color: '#fff', border: 'none' }}>Send Reminder</button>
            </div>
          )}

          {/* Quick actions */}
          <div className="card card-pad">
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--stone-400)', marginBottom: 12 }}>Quick Actions</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <button className="btn btn-outline w-full" style={{ justifyContent: 'flex-start', gap: 8 }}>📁 Upload Drawing</button>
              <button className="btn btn-outline w-full" style={{ justifyContent: 'flex-start', gap: 8 }}>✓ Mark Stage Complete</button>
              <button className="btn btn-outline w-full" style={{ justifyContent: 'flex-start', gap: 8 }}>↺ Change Stage / Reassign</button>
              <button className="btn btn-outline w-full" style={{ justifyContent: 'flex-start', gap: 8 }}>📋 Generate DLR Print</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const S = {
  root: { display: 'flex', flexDirection: 'column', height: '100vh', background: 'var(--cream)', overflow: 'hidden' },
  topbar: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '16px 32px', borderBottom: '1px solid var(--stone-100)',
    background: 'var(--warm-white)', flexShrink: 0, flexWrap: 'wrap', gap: 12,
  },
  body: {
    flex: 1, display: 'flex', overflow: 'hidden',
  },
  timeline: {
    flex: 1, overflowY: 'auto', padding: '28px 32px',
  },
  rightPanel: {
    width: 300, borderLeft: '1px solid var(--stone-100)', padding: '24px 20px',
    overflowY: 'auto', flexShrink: 0, background: 'var(--warm-white)',
  },
};
