import React, { useState } from 'react';

const ROLES = [
  { id: 'md',         label: 'Managing Director',  icon: '◆' },
  { id: 'designer',   label: 'Designer',            icon: '✦' },
  { id: 'supervisor', label: 'Supervisor',           icon: '◉' },
];

export default function Login({ onLogin }) {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole]         = useState('md');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin({ name: email.split('@')[0], email, role });
    }, 900);
  };

  return (
    <div style={styles.root}>
      {/* Left Panel */}
      <div style={styles.left}>
        <div style={styles.leftInner}>
          <div style={styles.logoWrap}>
            <span style={styles.logoMark}>JJ</span>
            <span style={styles.logoText}>Studio</span>
          </div>
          <h1 style={styles.tagline}>
            Where every space<br />
            <em>tells a story.</em>
          </h1>
          <p style={styles.sub}>
            The complete design management system for JJ Studio — from client onboarding to final execution.
          </p>
          <div style={styles.decorLine} />
          <div style={styles.stats}>
            {[['48+', 'Active Projects'], ['12', 'Designers'], ['2 mo', 'Avg. Delivery']].map(([val, lbl]) => (
              <div key={lbl} style={styles.stat}>
                <span style={styles.statVal}>{val}</span>
                <span style={styles.statLbl}>{lbl}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={styles.leftPattern} aria-hidden="true">
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{ ...styles.circle, opacity: 0.04 + i * 0.01, width: 80 + i * 60, height: 80 + i * 60, bottom: -20 - i * 24, right: -20 - i * 24 }} />
          ))}
        </div>
      </div>

      {/* Right Panel — Form */}
      <div style={styles.right}>
        <form style={styles.form} onSubmit={handleSubmit} className="anim-fade-up">
          <div style={styles.formHeader}>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, fontSize: '2rem', color: 'var(--charcoal)' }}>Welcome back</h2>
            <p style={{ color: 'var(--stone-400)', fontSize: 14, marginTop: 4 }}>Sign in to your workspace</p>
          </div>

          {/* Role Selector */}
          <div style={styles.roleGrid}>
            {ROLES.map(r => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRole(r.id)}
                style={{
                  ...styles.roleBtn,
                  ...(role === r.id ? styles.roleBtnActive : {}),
                }}
              >
                <span style={{ fontSize: 16 }}>{r.icon}</span>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.05em' }}>{r.label}</span>
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 6 }}>
            <div>
              <label>Email Address</label>
              <input
                className="input"
                type="email"
                placeholder="you@jjstudio.in"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(''); }}
              />
            </div>
            <div>
              <label>Password</label>
              <input
                className="input"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => { setPassword(e.target.value); setError(''); }}
              />
            </div>
          </div>

          {error && <div style={styles.errorMsg}>{error}</div>}

          <button
            type="submit"
            className="btn btn-primary w-full"
            style={{ marginTop: 24, justifyContent: 'center', padding: '12px 24px', fontSize: 14, letterSpacing: '0.05em' }}
            disabled={loading}
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>

          <div style={{ marginTop: 20, textAlign: 'center' }}>
            <span style={{ fontSize: 12, color: 'var(--stone-300)' }}>Forgot password? Contact your admin.</span>
          </div>
        </form>

        <div style={styles.formFooter}>
          <span style={{ fontSize: 11, color: 'var(--stone-300)' }}>JJ Studio Design Management System © 2025</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  root: {
    display: 'flex', height: '100vh', overflow: 'hidden',
  },
  left: {
    flex: '0 0 46%', background: 'var(--charcoal)', position: 'relative',
    display: 'flex', alignItems: 'center', overflow: 'hidden',
  },
  leftInner: {
    padding: '64px 56px', position: 'relative', zIndex: 2,
  },
  logoWrap: {
    display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 48,
  },
  logoMark: {
    fontFamily: 'Cormorant Garamond, serif', fontWeight: 600,
    fontSize: 32, color: 'var(--gold)',
  },
  logoText: {
    fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 300,
    color: 'rgba(249,246,241,0.5)', letterSpacing: '0.25em', textTransform: 'uppercase',
  },
  tagline: {
    fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
    fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: 'var(--cream)',
    lineHeight: 1.2, marginBottom: 20,
  },
  sub: {
    color: 'rgba(249,246,241,0.45)', fontSize: 14, lineHeight: 1.75, maxWidth: 360,
  },
  decorLine: {
    margin: '36px 0', width: 48, height: 1,
    background: 'linear-gradient(90deg, var(--gold), transparent)',
  },
  stats: {
    display: 'flex', gap: 32,
  },
  stat: {
    display: 'flex', flexDirection: 'column', gap: 2,
  },
  statVal: {
    fontFamily: 'Cormorant Garamond, serif', fontSize: 28,
    color: 'var(--gold)', fontWeight: 400,
  },
  statLbl: {
    fontSize: 11, color: 'rgba(249,246,241,0.35)',
    letterSpacing: '0.1em', textTransform: 'uppercase',
  },
  leftPattern: {
    position: 'absolute', bottom: 0, right: 0, zIndex: 1,
  },
  circle: {
    position: 'absolute', borderRadius: '50%',
    border: '1px solid rgba(249,246,241,0.12)',
  },
  right: {
    flex: 1, background: 'var(--warm-white)',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    padding: '48px 64px',
  },
  form: {
    width: '100%', maxWidth: 400,
  },
  formHeader: {
    marginBottom: 28,
  },
  roleGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginBottom: 20,
  },
  roleBtn: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
    padding: '10px 8px', borderRadius: 'var(--radius-md)',
    border: '1.5px solid var(--stone-200)', background: 'var(--warm-white)',
    cursor: 'pointer', transition: 'all 0.2s', color: 'var(--stone-400)',
    fontFamily: 'Inter, sans-serif',
  },
  roleBtnActive: {
    border: '1.5px solid var(--gold)', background: 'rgba(201,169,110,0.08)',
    color: 'var(--gold-dark)',
  },
  errorMsg: {
    marginTop: 12, padding: '10px 14px', borderRadius: 'var(--radius-md)',
    background: 'var(--red-bg)', color: 'var(--red)', fontSize: 13,
  },
  formFooter: {
    marginTop: 40,
  },
};
