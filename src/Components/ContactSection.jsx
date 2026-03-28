import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const loadFirebase = async () => {
  const [{ signInWithPopup, signOut, getAuth }, { GoogleAuthProvider }, { initializeApp, getApps }] =
    await Promise.all([
      import('firebase/auth'),
      import('firebase/auth'),
      import('firebase/app'),
    ]);
  const firebaseConfig = {
    apiKey: "AIzaSyCWNfQO8BPazz5EcYcCFrOjUDVBRGZIVFA",
    authDomain: "mirudent-dental.firebaseapp.com",
    projectId: "mirudent-dental",
    storageBucket: "mirudent-dental.firebasestorage.app",
    messagingSenderId: "623678383935",
    appId: "1:623678383935:web:81e6b886ea3acc5499d58a",
  };
  const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  return { signInWithPopup, signOut, auth, provider };
};

const EMAILJS_SERVICE_ID  = 'service_0tsmnz9';
const EMAILJS_TEMPLATE_ID = 'template_awb5nho';
const EMAILJS_PUBLIC_KEY  = '0Se0pVuviDQgepZfI';

const C = {
  azul:      '#0099CC',
  azulGlow:  'rgba(0,153,204,0.15)',
  azulLight: 'rgba(0,153,204,0.07)',
  naranja:   '#f97316',
  gris:      '#0f172a',
  grisMid:   '#475569',
  grisLight: '#64748b',
  white:     '#ffffff',
  offwhite:  '#f8fafc',
  line:      'rgba(15,23,42,0.08)',
};

const today = new Date().toISOString().split('T')[0];

const InputGroup = ({ label, required, children, inputId, locked }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
    <label htmlFor={inputId} style={{
      fontFamily: "'Montserrat', sans-serif",
      fontSize: '.7rem', fontWeight: 800,
      letterSpacing: '.18em', textTransform: 'uppercase',
      color: C.grisMid, display: 'flex', alignItems: 'center', gap: '8px',
    }}>
      {label}
      {required && <span style={{ width: 4, height: 4, borderRadius: '50%', background: C.azul, display: 'inline-block' }} />}
      {locked && (
        <span style={{
          fontSize: '.65rem', background: C.azulLight, color: '#006b8f',
          padding: '2px 7px', borderRadius: '100px', fontWeight: 800, letterSpacing: '.08em',
        }}>VERIFICADO</span>
      )}
    </label>
    {React.cloneElement(children, { id: inputId })}
  </div>
);

const TickerSegment = () => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 0, whiteSpace: 'nowrap' }}>
    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '.82rem', fontWeight: 400, color: C.grisMid, letterSpacing: '.01em' }}>
      Estamos listos para atenderte en Sullana. Elige el horario que mejor te convenga y confirmaremos tu solicitud.
    </span>
    <span style={{ display: 'inline-block', width: 4, height: 4, borderRadius: '50%', background: C.naranja, margin: '0 28px', flexShrink: 0 }} />
  </span>
);

const GoogleIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const ContactSection = () => {
  const [user, setUser]               = useState(null);
  const [status, setStatus]           = useState('idle');
  const [authLoading, setAuthLoading] = useState(false);
  const [formData, setFormData]       = useState({ telefono: '', servicio: '', fecha: '', notas: '' });

  const handleGoogleLogin = async () => {
    setAuthLoading(true);
    try {
      const { signInWithPopup, auth, provider } = await loadFirebase();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (err) {
      console.error('Error login:', err);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    const { signOut, auth } = await loadFirebase();
    await signOut(auth);
    setUser(null);
    setStatus('idle');
    setFormData({ telefono: '', servicio: '', fecha: '', notas: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'telefono') {
      const d = value.replace(/\D/g, '');
      if (d.length > 0 && d[0] !== '9') return;
      if (d.length > 9) return;
      setFormData(prev => ({ ...prev, telefono: d }));
      return;
    }
    if (name === 'notas' && value.length > 500) return;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    setStatus('loading');
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          cliente_nombre: user.displayName,
          cliente_email:  user.email,
          cliente_tel:    formData.telefono,
          servicio:       formData.servicio || 'No especificado',
          fecha:          formData.fecha,
          notas:          formData.notas || 'Sin notas',
          fecha_envio:    new Date().toLocaleDateString('es-PE', {
            day: 'numeric', month: 'long', year: 'numeric',
          }),
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      setStatus('success');
      setFormData({ telefono: '', servicio: '', fecha: '', notas: '' });
    } catch (err) {
      console.error('Error EmailJS:', err);
      setStatus('error');
    }
  };

  const inputStyle = {
    width: '100%', boxSizing: 'border-box',
    background: C.offwhite, border: `1.5px solid ${C.line}`,
    borderRadius: '10px', padding: '13px 16px',
    fontFamily: "'Inter', sans-serif",
    fontSize: '.9rem', fontWeight: 400,
    color: C.gris, outline: 'none',
    transition: 'border-color .2s, background .2s, box-shadow .2s',
  };
  const inputLockedStyle = {
    ...inputStyle,
    background: C.azulLight,
    border: `1.5px solid rgba(0,153,204,0.2)`,
    color: C.azul,
    cursor: 'not-allowed',
  };

  return (
    <>
      <style>{`
        @keyframes ticker    { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes fadeUp    { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes gateIn    { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes formIn    { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin      { to{transform:rotate(360deg)} }

        #contacto { background:${C.white}; padding:clamp(40px,6vw,72px) 0 clamp(56px,8vw,96px); overflow:hidden; }
        .ct-wrap  { max-width:820px; margin:0 auto; padding:0 clamp(18px,5vw,48px); }

        .ct-header { margin-bottom:clamp(28px,5vw,48px); animation:fadeUp .55s ease both; }
        .ct-h2 {
          font-family:'Montserrat', sans-serif;
          font-size:clamp(2.4rem,6vw,4.8rem);
          font-weight:900; line-height:1.0;
          color:${C.gris}; margin:0;
          letter-spacing:-3px; text-transform:uppercase;
        }
        .ct-h2 em { font-style:italic; color:${C.azul}; }

        .ct-ticker-wrap { position:relative; margin-top:24px; overflow:hidden; border-top:1px solid ${C.line}; border-bottom:1px solid ${C.line}; padding:11px 0; }
        .ct-ticker-wrap::before,.ct-ticker-wrap::after { content:''; position:absolute; top:0; bottom:0; width:64px; z-index:2; pointer-events:none; }
        .ct-ticker-wrap::before { left:0; background:linear-gradient(to right,${C.white},transparent); }
        .ct-ticker-wrap::after  { right:0; background:linear-gradient(to left,${C.white},transparent); }
        .ct-ticker-inner { display:flex; width:max-content; animation:ticker 28s linear infinite; will-change:transform; }
        .ct-ticker-inner:hover { animation-play-state:paused; }

        .ct-gate { animation:gateIn .45s ease both; border-top:1.5px solid ${C.line}; padding-top:clamp(28px,4vw,44px); display:flex; flex-direction:column; gap:28px; }
        .ct-gate-heading { display:flex; flex-direction:column; gap:6px; max-width:520px; }
        .ct-gate-title {
          font-family:'Montserrat',sans-serif;
          font-size:clamp(1.1rem,2vw,1.4rem);
          font-weight:900; color:${C.gris}; margin:0;
          letter-spacing:-1px; text-transform:uppercase;
        }
        .ct-gate-sub { font-family:'Inter',sans-serif; font-size:.88rem; font-weight:400; color:${C.grisMid}; line-height:1.65; margin:0; }
        .ct-gate-benefits { display:grid; grid-template-columns:1fr 1fr; gap:8px 32px; }
        .ct-gate-benefit { display:flex; align-items:center; gap:8px; font-family:'Inter',sans-serif; font-size:.82rem; font-weight:400; color:${C.grisMid}; }
        .ct-gate-benefit-line { width:16px; height:1.5px; background:${C.azul}; flex-shrink:0; }
        .ct-gate-actions { display:flex; align-items:center; gap:20px; flex-wrap:wrap; }
        .ct-google-btn {
          display:flex; align-items:center; gap:10px; padding:12px 22px;
          background:${C.white}; color:${C.gris};
          font-family:'Montserrat',sans-serif; font-size:.72rem; font-weight:800;
          letter-spacing:.06em; text-transform:uppercase;
          border-radius:8px; border:1.5px solid rgba(15,23,42,0.15);
          cursor:pointer; transition:box-shadow .2s,transform .15s,border-color .2s; white-space:nowrap;
        }
        .ct-google-btn:hover:not(:disabled) { box-shadow:0 4px 16px rgba(0,0,0,0.08); transform:translateY(-1px); border-color:rgba(15,23,42,0.25); }
        .ct-google-btn:disabled { opacity:.6; cursor:not-allowed; }
        .ct-gate-note { font-family:'Inter',sans-serif; font-size:.72rem; font-weight:400; color:${C.grisLight}; margin:0; }

        .ct-form  { display:flex; flex-direction:column; gap:18px; animation:formIn .45s ease both; }
        .ct-row-2 { display:grid; grid-template-columns:1fr 1fr; gap:18px; }
        .ct-user-badge { display:flex; align-items:center; gap:12px; padding:11px 16px; background:${C.azulLight}; border:1.5px solid rgba(0,153,204,0.2); border-radius:10px; }
        .ct-user-badge img { width:32px; height:32px; border-radius:50%; }
        .ct-user-info { flex:1; }
        .ct-user-name  { font-family:'Montserrat',sans-serif; font-size:.76rem; font-weight:800; letter-spacing:-.2px; text-transform:uppercase; color:${C.azul}; margin:0; }
        .ct-user-email { font-family:'Inter',sans-serif; font-size:.72rem; font-weight:400; color:${C.azul}; opacity:.7; margin:0; }
        .ct-logout-btn { font-family:'Montserrat',sans-serif; font-size:.58rem; font-weight:800; letter-spacing:.1em; text-transform:uppercase; color:${C.grisMid}; background:none; border:1.5px solid ${C.line}; border-radius:6px; padding:5px 10px; cursor:pointer; transition:color .2s,border-color .2s; }
        .ct-logout-btn:hover { color:#dc2626; border-color:#fca5a5; }

        input:focus,select:focus,textarea:focus { border-color:${C.azul}!important; background:${C.white}!important; box-shadow:0 0 0 3px ${C.azulGlow}!important; }
        select { cursor:pointer; }

        .ct-submit {
          width:100%; padding:15px; background:${C.gris}; color:${C.white};
          font-family:'Montserrat',sans-serif; font-size:.75rem; font-weight:800;
          letter-spacing:.1em; text-transform:uppercase;
          border-radius:8px; border:none; cursor:pointer;
          transition:background .2s,transform .18s,box-shadow .2s; margin-top:4px;
          display:flex; align-items:center; justify-content:center; gap:8px;
        }
        .ct-submit:hover:not(:disabled) { background:${C.azul}; transform:translateY(-2px); box-shadow:0 8px 24px ${C.azulGlow}; }
        .ct-submit:disabled { opacity:.55; cursor:not-allowed; }

        .ct-success { border-top:1.5px solid ${C.line}; padding-top:clamp(28px,4vw,44px); display:flex; flex-direction:column; gap:20px; }
        .ct-success-title { font-family:'Montserrat',sans-serif; font-size:clamp(1.6rem,3.5vw,2.6rem); font-weight:900; color:${C.gris}; margin:0; letter-spacing:-2px; text-transform:uppercase; line-height:1.05; }
        .ct-success-title em { font-style:italic; color:${C.azul}; }
        .ct-success-sub { font-family:'Inter',sans-serif; font-size:.9rem; font-weight:400; color:${C.grisMid}; margin:0; line-height:1.65; max-width:440px; }
        .ct-success-details { background:${C.offwhite}; border-radius:10px; padding:14px 18px; width:100%; border:1.5px solid ${C.line}; }
        .ct-success-row { display:flex; justify-content:space-between; align-items:center; padding:7px 0; border-bottom:1px solid ${C.line}; }
        .ct-success-row:last-child { border-bottom:none; }
        .ct-success-row span:first-child { font-family:'Montserrat',sans-serif; font-size:.58rem; font-weight:800; letter-spacing:.12em; text-transform:uppercase; color:${C.grisLight}; }
        .ct-success-row span:last-child { font-family:'Inter',sans-serif; font-size:.84rem; font-weight:500; color:${C.gris}; }
        .ct-success-new-btn { font-family:'Montserrat',sans-serif; font-size:.68rem; font-weight:800; letter-spacing:.1em; text-transform:uppercase; color:${C.grisMid}; background:none; border:1.5px solid ${C.line}; border-radius:8px; padding:10px 20px; cursor:pointer; align-self:flex-start; transition:border-color .2s,color .2s; }
        .ct-success-new-btn:hover { border-color:${C.azul}; color:${C.azul}; }
        .ct-feedback-err { padding:12px 16px; border-radius:8px; font-family:'Inter',sans-serif; font-size:.86rem; font-weight:400; line-height:1.55; background:rgba(249,115,22,0.06); color:${C.naranja}; border:1px solid rgba(249,115,22,0.18); }
        .ct-divider { height:1px; background:${C.line}; }

        @media (max-width: 1024px) {
          .ct-h2 { font-size:clamp(2rem,5vw,3.6rem); font-weight:800; letter-spacing:-2px; }
          .ct-gate-title { font-weight:800; }
        }
        @media (max-width: 768px) {
          .ct-h2 { font-size:clamp(1.8rem,6vw,2.8rem); font-weight:800; letter-spacing:-1.5px; }
          .ct-row-2 { grid-template-columns:1fr 1fr; gap:14px; }
          .ct-gate-benefits { grid-template-columns:1fr 1fr; }
          .ct-gate-actions { flex-direction:column; align-items:flex-start; gap:12px; }
          .ct-gate-title { font-weight:700; letter-spacing:-.5px; }
          .ct-success-title { font-weight:800; letter-spacing:-1.5px; }
        }
        @media (max-width: 640px) {
          .ct-h2 { font-size:clamp(1.5rem,7vw,2.2rem); font-weight:700; letter-spacing:-1px; text-transform:none; }
          .ct-h2 em { font-style:italic; }
          .ct-row-2 { grid-template-columns:1fr; gap:14px; }
          .ct-gate-benefits { grid-template-columns:1fr; }
          .ct-gate-actions { flex-direction:column; align-items:flex-start; gap:12px; }
          .ct-gate-title { font-size:clamp(1rem,4vw,1.2rem); font-weight:700; letter-spacing:-.2px; text-transform:none; }
          .ct-success-title { font-size:clamp(1.3rem,5vw,1.8rem); font-weight:700; letter-spacing:-1px; text-transform:none; }
          .ct-submit { font-weight:700; letter-spacing:.05em; }
        }
        @media (max-width: 400px) {
          .ct-h2 { font-size:clamp(1.3rem,6.5vw,1.7rem); font-weight:600; letter-spacing:-.5px; }
          .ct-wrap { padding:0 clamp(14px,4vw,24px); }
          .ct-gate-title { font-size:1rem; font-weight:600; }
          .ct-success-title { font-size:1.3rem; font-weight:600; }
        }
      `}</style>

      <section id="contacto">
        <div className="ct-wrap">
          <div className="ct-header">
            <h2 className="ct-h2">Agenda tu <em>cita</em><br />con nosotros.</h2>
            <div className="ct-ticker-wrap">
              <div className="ct-ticker-inner">
                <TickerSegment /><TickerSegment /><TickerSegment /><TickerSegment />
              </div>
            </div>
          </div>

          {!user && (
            <div className="ct-gate">
              <div className="ct-gate-heading">
                <h3 className="ct-gate-title">Verificación de identidad</h3>
                <p className="ct-gate-sub">
                  Para reservar tu cita necesitamos confirmar quién eres. Solo toma unos segundos con tu cuenta de Google.
                </p>
              </div>
              <div className="ct-gate-benefits">
                {['Reserva en segundos','Sin formularios de spam','Datos verificados por Google','Tu información es privada'].map(b => (
                  <div key={b} className="ct-gate-benefit">
                    <div className="ct-gate-benefit-line" />
                    {b}
                  </div>
                ))}
              </div>
              <div className="ct-gate-actions">
                <button className="ct-google-btn" onClick={handleGoogleLogin} disabled={authLoading}>
                  <GoogleIcon />
                  {authLoading ? 'Conectando...' : 'Continuar con Google'}
                </button>
                <p className="ct-gate-note">No compartimos tu información con terceros.</p>
              </div>
            </div>
          )}

          {user && status !== 'success' && (
            <form className="ct-form" onSubmit={handleSubmit}>
              <div className="ct-user-badge">
                {user.photoURL && <img src={user.photoURL} alt={user.displayName} referrerPolicy="no-referrer" />}
                <div className="ct-user-info">
                  <p className="ct-user-name">{user.displayName}</p>
                  <p className="ct-user-email">{user.email} · verificado</p>
                </div>
                <button type="button" className="ct-logout-btn" onClick={handleLogout}>Cambiar cuenta</button>
              </div>

              <div className="ct-row-2">
                <InputGroup label="Nombre completo" required inputId="ct-nombre" locked>
                  <input type="text" value={user.displayName || ''} readOnly style={inputLockedStyle} />
                </InputGroup>
                <InputGroup label="Teléfono" required inputId="ct-telefono">
                  <input type="tel" name="telefono" value={formData.telefono} onChange={handleInputChange} required placeholder="9XXXXXXXX" style={inputStyle} />
                </InputGroup>
              </div>

              <InputGroup label="Correo electrónico" required inputId="ct-email" locked>
                <input type="email" value={user.email || ''} readOnly style={inputLockedStyle} />
              </InputGroup>

              <div className="ct-divider" />

              <div className="ct-row-2">
                <InputGroup label="Servicio" inputId="ct-servicio">
                  <select name="servicio" value={formData.servicio} onChange={handleInputChange}
                    style={{ ...inputStyle, appearance: 'none',
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2394a3b8' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center' }}>
                    <option value="">Selecciona...</option>
                    <option value="Odontología General">Odontología General</option>
                    <option value="Ortodoncia">Ortodoncia</option>
                    <option value="Estética Dental">Estética Dental</option>
                    <option value="Implantes Dentales">Implantes Dentales</option>
                    <option value="Emergencia Dental">Emergencia Dental</option>
                  </select>
                </InputGroup>
                <InputGroup label="Fecha preferida" required inputId="ct-fecha">
                  <input type="date" name="fecha" min={today} value={formData.fecha} onChange={handleInputChange} required style={inputStyle} />
                </InputGroup>
              </div>

              <InputGroup label="Notas adicionales" inputId="ct-notas">
                <div style={{ position: 'relative' }}>
                  <textarea name="notas" id="ct-notas" value={formData.notas} onChange={handleInputChange} rows={4}
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                    style={{ ...inputStyle, resize: 'none', lineHeight: 1.65 }} />
                  <span style={{ position: 'absolute', bottom: 12, right: 14, fontFamily: "'Inter',sans-serif", fontSize: '.6rem', color: C.grisLight }}>
                    {formData.notas.length}/500
                  </span>
                </div>
              </InputGroup>

              <button type="submit" disabled={status === 'loading'} className="ct-submit">
                {status === 'loading'
                  ? <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: 'spin 1s linear infinite' }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>Enviando...</>
                  : 'Confirmar reservación →'
                }
              </button>

              {status === 'error' && (
                <div className="ct-feedback-err">
                  Error al enviar. Escríbenos por WhatsApp al +51 926 226 443.
                </div>
              )}
            </form>
          )}

          {user && status === 'success' && (
            <div className="ct-success">
              <h3 className="ct-success-title">Tu cita ha sido<br /><em>confirmada</em></h3>
              <p className="ct-success-sub">
                Hemos recibido tu solicitud. El equipo de MIRUDENT se pondrá en contacto contigo a la brevedad para confirmar el horario.
              </p>
              <div className="ct-success-details">
                <div className="ct-success-row"><span>Paciente</span><span>{user.displayName}</span></div>
                <div className="ct-success-row"><span>Contacto</span><span>{user.email}</span></div>
                {formData.servicio && <div className="ct-success-row"><span>Servicio</span><span>{formData.servicio}</span></div>}
              </div>
              <button className="ct-success-new-btn" onClick={() => setStatus('idle')}>Hacer otra reservación →</button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ContactSection;