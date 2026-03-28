import React, { useRef, useEffect, useState } from 'react';

const C = {
  azul:        '#0099CC',   // celeste MIRUDENT
  azulDark:    '#006b8f',   // celeste oscuro
  azulLight:   'rgba(0,153,204,0.07)',
  azulMid:     'rgba(0,153,204,0.15)',
  azulOsc:     '#001E3C',   // azul marino MIRUDENT
  azulOscDark: '#001020',
  azulOscLight:'rgba(0,30,60,0.08)',
  naranja:     '#f97316',
  naranjaDark: '#9a3d00',
  naranjaLight:'rgba(249,115,22,0.08)',
  gris:        '#0f172a',
  grisMid:     '#475569',
  grisLight:   '#64748b',
  white:       '#ffffff',
  offwhite:    '#f8fafc',
  slate:       '#f1f5f9',
  line:        'rgba(15,23,42,0.08)',
};

const services = [
  {
    num: '01',
    title: 'Odontología General',
    shortTitle: 'General',
    tag: 'Preventivo',
    tagline: 'La base de una sonrisa sana.',
    desc: 'Revisiones, limpiezas y empastes para mantener tu salud bucal en óptimo estado.',
    items: ['Limpieza profunda', 'Tratamiento de caries', 'Revisión periódica'],
    img: '/assets/hero-odontologia.webp',
    accent: C.azul,
    accentText: C.azulDark,
    accentLight: C.azulLight,
    modalContent: {
      intro: 'La odontología general es el pilar de la salud bucal. Nuestro enfoque preventivo garantiza que pequeños problemas no se conviertan en grandes tratamientos.',
      details: [
        { title: 'Limpieza Dental Profunda', text: 'Eliminamos sarro y placa bacteriana acumulada usando ultrasonido de última generación. El resultado: encías sanas y dientes más blancos de forma natural.' },
        { title: 'Tratamiento de Caries', text: 'Detectamos y tratamos caries en estadios tempranos con materiales de resina del color de tu diente, logrando resultados estéticos y duraderos.' },
        { title: 'Plan de Revisión Periódica', text: 'Diseñamos un calendario personalizado de revisiones para monitorear tu salud bucal, prevenir patologías y mantener tu sonrisa siempre en su mejor estado.' },
      ],
      extra: 'En MIRUDENT recomendamos revisiones cada 6 meses como medida preventiva esencial.',
    }
  },
  {
    num: '02',
    title: 'Ortodoncia',
    shortTitle: 'Ortodoncia',
    tag: 'Alineación',
    tagline: 'Corregimos con precisión y estética.',
    desc: 'Brackets y alineadores transparentes para corregir la posición dental.',
    items: ['Brackets metálicos', 'Alineadores invisibles', 'Corrección de mordida'],
    img: '/assets/sonrisa.webp',
    accent: C.naranja,
    accentText: C.naranjaDark,
    accentLight: C.naranjaLight,
    modalContent: {
      intro: 'Alinear tus dientes va más allá de la estética: mejora la masticación, el habla y la salud de tus encías a largo plazo.',
      details: [
        { title: 'Brackets Metálicos y Cerámicos', text: 'Sistema clásico y eficaz para correcciones complejas. Los brackets cerámicos ofrecen mayor discreción, fusionándose con el color natural del diente.' },
        { title: 'Alineadores Invisibles', text: 'Férulas transparentes removibles que mueven tus dientes gradualmente. Cómodas, casi invisibles y sin restricciones alimentarias.' },
        { title: 'Corrección de Mordida', text: 'Tratamos mordidas cruzadas, abiertas y profundas que pueden causar desgaste dental y problemas en la articulación mandibular.' },
      ],
      extra: 'Cada tratamiento de ortodoncia comienza con un diagnóstico digital y radiografías panorámicas para un plan 100% personalizado.',
    }
  },
  {
    num: '03',
    title: 'Estética Dental',
    shortTitle: 'Estética',
    tag: 'Transformación',
    tagline: 'Resultados que cambian vidas.',
    desc: 'Blanqueamiento profesional, carillas y diseño de sonrisa con tecnología LED.',
    items: ['Blanqueamiento LED', 'Carillas de porcelana', 'Diseño de sonrisa'],
    img: '/assets/hero-odontologia.webp',
    accent: C.azul,
    accentText: C.azulDark,
    accentLight: C.azulLight,
    modalContent: {
      intro: 'Una sonrisa transformada es una confianza renovada. Nuestros tratamientos estéticos combinan arte y ciencia para crear sonrisas naturales e impactantes.',
      details: [
        { title: 'Blanqueamiento LED Profesional', text: 'Aclaramos tu sonrisa hasta 8 tonos en una sola sesión con tecnología LED activada por peróxido de carbamida de alta concentración, sin sensibilidad post-tratamiento.' },
        { title: 'Carillas de Porcelana', text: 'Láminas ultrafinas de porcelana adheridas a la superficie del diente. Corrigen color, forma y tamaño de forma permanente con un resultado completamente natural.' },
        { title: 'Diseño Digital de Sonrisa', text: 'Visualizamos tu sonrisa final antes de comenzar cualquier tratamiento mediante simulación digital, para que apruebes el resultado antes de que sea realidad.' },
      ],
      extra: 'Todos los tratamientos estéticos incluyen una sesión de planificación gratuita en MIRUDENT.',
    }
  },
];

const useInView = (threshold = 0.12) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
};

const ServiceModal = ({ service, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  return (
    <>
      <style>{`
        @keyframes modalFadeIn { from{opacity:0} to{opacity:1} }
        @keyframes modalSlideUp { from{opacity:0;transform:translateY(40px) scale(0.98)} to{opacity:1;transform:translateY(0) scale(1)} }
        .modal-overlay {
          position:fixed; inset:0; z-index:1000;
          background:rgba(15,23,42,0.65); backdrop-filter:blur(6px);
          display:flex; align-items:flex-end;
          animation:modalFadeIn .25s ease;
        }
        @media(min-width:641px){ .modal-overlay{align-items:center;justify-content:center;padding:20px} }
        .modal-box {
          background:${C.white}; width:100%; max-width:740px;
          max-height:92vh; overflow-y:auto;
          border-radius:20px 20px 0 0;
          animation:modalSlideUp .35s cubic-bezier(.22,.61,.36,1);
          position:relative;
        }
        @media(min-width:641px){ .modal-box{border-radius:20px} }
        .modal-img { width:100%; height:220px; object-fit:cover; display:block; border-radius:20px 20px 0 0; }
        @media(min-width:641px){ .modal-img{height:280px} }
        .modal-img-overlay {
          position:absolute; top:0; left:0; right:0; height:220px;
          border-radius:20px 20px 0 0;
          background:linear-gradient(180deg,transparent 40%,${C.gris}cc 100%);
          pointer-events:none;
        }
        @media(min-width:641px){ .modal-img-overlay{height:280px} }
        .modal-img-tag {
          position:absolute; top:18px; left:18px; background:${C.white};
          font-family:'Montserrat',sans-serif; font-size:.7rem; font-weight:800;
          letter-spacing:.14em; text-transform:uppercase; padding:5px 14px; border-radius:100px;
        }
        .modal-close-btn {
          position:absolute; top:14px; right:14px; width:36px; height:36px; border-radius:50%;
          background:rgba(255,255,255,0.9); border:none; cursor:pointer;
          display:flex; align-items:center; justify-content:center;
          font-size:18px; color:${C.gris}; transition:background .2s,transform .2s; z-index:10;
        }
        .modal-close-btn:hover{ background:${C.white}; transform:scale(1.08); }
        .modal-body { padding:clamp(24px,5vw,40px); }
        .modal-num {
          font-family:'Montserrat',sans-serif; font-size:.62rem; font-weight:800;
          letter-spacing:.2em; text-transform:uppercase; margin-bottom:10px; display:block;
        }
        .modal-title {
          font-family:'Montserrat',sans-serif; font-size:clamp(1.6rem,4vw,2.2rem);
          font-weight:900; line-height:1.05; color:${C.gris}; letter-spacing:-1.5px;
          text-transform:uppercase; margin:0 0 14px;
        }
        .modal-intro { font-family:'Inter',sans-serif; font-size:.96rem; line-height:1.75; color:${C.grisMid}; margin:0 0 32px; }
        .modal-divider { height:1.5px; background:${C.line}; margin:0 0 32px; border:none; }
        .modal-detail-item { margin-bottom:28px; }
        .modal-detail-item:last-child{ margin-bottom:0; }
        .modal-detail-header { display:flex; align-items:center; gap:12px; margin-bottom:8px; }
        .modal-detail-dot { width:8px; height:8px; border-radius:50%; flex-shrink:0; }
        .modal-detail-title {
          font-family:'Montserrat',sans-serif; font-size:.8rem; font-weight:800;
          letter-spacing:.06em; text-transform:uppercase; color:${C.gris};
        }
        .modal-detail-text { font-family:'Inter',sans-serif; font-size:.9rem; line-height:1.75; color:${C.grisMid}; padding-left:20px; }
        .modal-extra { margin-top:32px; padding:16px 20px; border-radius:12px; font-family:'Inter',sans-serif; font-size:.85rem; line-height:1.65; font-style:italic; }
        .modal-footer { padding:clamp(16px,3vw,24px) clamp(24px,5vw,40px); border-top:1.5px solid ${C.line}; }
        .modal-cta-btn {
          width:100%; padding:16px 32px; border:none; cursor:pointer; border-radius:6px;
          font-family:'Montserrat',sans-serif; font-size:.78rem; font-weight:800;
          letter-spacing:2px; text-transform:uppercase; color:${C.white};
          transition:transform .2s,box-shadow .2s;
        }
        .modal-cta-btn:hover{ transform:translateY(-2px); }
      `}</style>
      <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
        <div className="modal-box">
          <div style={{ position: 'relative' }}>
            <img src={service.img} alt={service.title} className="modal-img" />
            <div className="modal-img-overlay" />
            <div className="modal-img-tag" style={{ color: service.accentText || service.accent }}>{service.tag}</div>
            <button className="modal-close-btn" onClick={onClose}>✕</button>
          </div>
          <div className="modal-body">
            <span className="modal-num" style={{ color: service.accentText || service.accent }}>{service.num} — {service.tag}</span>
            <h2 className="modal-title">{service.title}</h2>
            <p className="modal-intro">{service.modalContent.intro}</p>
            <hr className="modal-divider" />
            {service.modalContent.details.map((d, i) => (
              <div key={i} className="modal-detail-item">
                <div className="modal-detail-header">
                  <span className="modal-detail-dot" style={{ background: service.accent }} />
                  <span className="modal-detail-title">{d.title}</span>
                </div>
                <p className="modal-detail-text">{d.text}</p>
              </div>
            ))}
            <div className="modal-extra" style={{ background: service.accentLight, color: service.accent }}>
              💡 {service.modalContent.extra}
            </div>
          </div>
          <div className="modal-footer">
            <button
              className="modal-cta-btn"
              style={{ background: service.accent, boxShadow: `0 8px 24px ${service.accent}40` }}
              onClick={() => {
                onClose();
                setTimeout(() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' }), 300);
              }}
            >
              Agendar consulta →
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const ServiceCard = ({ s, i }) => {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={`svc2-card${visible ? ' svc2-visible' : ''}`}
      style={{ '--delay': `${i * 0.1}s`, '--accent': s.accent, '--accentLight': s.accentLight }}
    >
      <div className="svc2-img-wrap">
        <img src={s.img} alt={s.title} />
        <div className="svc2-img-fade" />
        <div className="svc2-num-badge">{s.num}</div>
      </div>
      <div className="svc2-body">
        <div className="svc2-top">
          <div className="svc2-accent-line" />
          <h3 className="svc2-title">{s.title.toUpperCase()}</h3>
          <p className="svc2-tagline">{s.tagline}</p>
          <p className="svc2-desc">{s.desc}</p>
        </div>
        <ul className="svc2-items">
          {s.items.map((item) => (
            <li key={item}>
              <span className="svc2-dot" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const ServicesSection = () => {
  const [headerRef, headerVisible] = useInView(0.2);
  const [activeService, setActiveService] = useState(null);

  return (
    <>
      <style>{`

        #servicios {
          background: ${C.white};
          padding: clamp(80px, 10vw, 120px) 0 clamp(64px, 8vw, 104px);
          overflow: hidden;
        }
        .svc2-wrap {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 clamp(20px, 5vw, 60px);
        }

        /* ── Header ── */
        .svc2-header {
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: end;
          gap: 32px;
          margin-bottom: clamp(40px, 6vw, 72px);
          padding-bottom: clamp(28px, 4vw, 44px);
          border-bottom: 1.5px solid ${C.line};
          opacity: 0; transform: translateY(28px);
          transition: opacity .8s ease, transform .8s ease;
        }
        .svc2-header.svc2-hv { opacity: 1; transform: translateY(0); }

        .svc2-header-eyebrow {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 16px;
        }
        .svc2-header-eyebrow span {
          font-family: 'Montserrat', sans-serif;
          font-size: .62rem; font-weight: 800;
          letter-spacing: .2em; text-transform: uppercase;
          color: ${C.azul};
        }
        .svc2-header-eyebrow::before {
          content: ''; display: block;
          width: 28px; height: 1.5px; background: ${C.azul};
        }

        .svc2-header h2 {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(2.4rem, 5vw, 4rem);
          font-weight: 900; line-height: 1.0;
          color: ${C.gris}; margin: 0;
          letter-spacing: -3px; text-transform: uppercase;
        }
        /* "excelencia" en celeste MIRUDENT */
        .svc2-header h2 em {
          font-style: italic; color: ${C.azul};
        }
        .svc2-header h2 .accent-bar {
          position: relative; display: inline-block; color: ${C.gris};
        }
        .svc2-header h2 .accent-bar::after {
          content: '';
          position: absolute;
          bottom: 10%; left: 0; width: 100%; height: 7px;
          background: ${C.naranja}; opacity: .45; z-index: -1;
        }

        .svc2-header-right {
          display: flex; flex-direction: column;
          align-items: flex-end; gap: 4px;
        }
        .svc2-header-desc {
          font-family: 'Inter', sans-serif;
          font-size: .88rem; color: ${C.grisMid};
          line-height: 1.7; max-width: 260px;
          text-align: right; margin: 0;
        }

        /* ── Grid ── */
        .svc2-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
        }

        /* ── Card ── */
        .svc2-card {
          opacity: 0; transform: translateY(36px);
          transition: opacity .7s ease, transform .7s ease;
          transition-delay: var(--delay, 0s);
          background: ${C.white};
          display: flex; flex-direction: column;
          border: 1.5px solid ${C.line};
          overflow: hidden;
          cursor: default;
          position: relative;
        }
        .svc2-card + .svc2-card { border-left: none; }
        .svc2-visible { opacity: 1; transform: translateY(0); }

        .svc2-img-wrap {
          position: relative; overflow: hidden; height: 240px;
        }
        .svc2-img-wrap img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          transition: transform .8s cubic-bezier(.22,.61,.36,1);
        }
        .svc2-card:hover .svc2-img-wrap img { transform: scale(1.06); }
        .svc2-img-fade {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, transparent 30%, ${C.gris}80 100%);
        }
        .svc2-num-badge {
          position: absolute; bottom: 14px; right: 16px;
          font-family: 'Montserrat', sans-serif;
          font-size: 3rem; font-weight: 900;
          color: rgba(255,255,255,0.15);
          letter-spacing: -3px; line-height: 1; user-select: none;
        }

        .svc2-body {
          padding: clamp(22px, 3vw, 32px);
          display: flex; flex-direction: column; flex: 1;
        }
        .svc2-top { flex: 1; }
        .svc2-accent-line {
          width: 32px; height: 2px; border-radius: 2px;
          background: var(--accent, ${C.azul});
          margin-bottom: 18px;
          transition: width .3s ease;
        }
        .svc2-card:hover .svc2-accent-line { width: 52px; }
        .svc2-title {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(.95rem, 1.5vw, 1.15rem);
          font-weight: 900; line-height: 1.1;
          color: ${C.gris}; margin: 0 0 10px; letter-spacing: -0.5px;
        }
        .svc2-tagline {
          font-family: 'Inter', sans-serif;
          font-size: .78rem; font-weight: 500;
          color: var(--accent, ${C.azul}); margin: 0 0 12px;
        }
        .svc2-desc {
          font-family: 'Inter', sans-serif;
          font-size: .86rem; color: ${C.grisMid}; line-height: 1.7; margin: 0;
        }
        .svc2-items {
          list-style: none; padding: 0; margin: 24px 0;
          display: flex; flex-direction: column; gap: 8px;
          border-top: 1.5px solid ${C.line}; padding-top: 20px;
        }
        .svc2-items li {
          display: flex; align-items: center; gap: 10px;
          font-family: 'Inter', sans-serif;
          font-size: .8rem; color: ${C.grisMid}; font-weight: 500;
        }
        .svc2-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--accent, ${C.azul}); flex-shrink: 0;
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .svc2-grid { grid-template-columns: 1fr 1fr; }
          .svc2-card + .svc2-card { border-left: none; }
          .svc2-card:nth-child(2n+1) { border-left: 1.5px solid ${C.line}; }
          .svc2-card:nth-child(3) { grid-column: span 2; }
          .svc2-card:nth-child(3) .svc2-img-wrap { height: 280px; }
          .svc2-header { grid-template-columns: 1fr; }
          .svc2-header-right { align-items: flex-start; }
          .svc2-header-desc { text-align: left; }
          .svc2-header h2 {
            font-size: clamp(2rem, 4vw, 3rem);
            font-weight: 800; letter-spacing: -2px;
          }
        }
        @media (max-width: 960px) {
          .svc2-grid { grid-template-columns: 1fr 1fr; }
          .svc2-card + .svc2-card { border-left: none; }
          .svc2-card:nth-child(2n+1) { border-left: 1.5px solid ${C.line}; }
          .svc2-card:nth-child(3) { grid-column: span 2; }
          .svc2-card:nth-child(3) .svc2-img-wrap { height: 280px; }
          .svc2-header { grid-template-columns: 1fr; }
          .svc2-header-right { align-items: flex-start; }
          .svc2-header-desc { text-align: left; }
          .svc2-header h2 {
            font-size: clamp(1.8rem, 4vw, 2.6rem);
            font-weight: 800; letter-spacing: -1.5px;
          }
        }
        @media (max-width: 640px) {
          .svc2-grid { grid-template-columns: 1fr; gap: 0; }
          .svc2-card { border-left: 1.5px solid ${C.line} !important; }
          .svc2-card + .svc2-card { border-top: none; }
          .svc2-card:nth-child(3) { grid-column: span 1; }
          .svc2-card { transition-delay: 0s !important; }
          .svc2-img-wrap { height: 200px; }
          .svc2-header h2 {
            font-size: clamp(1.5rem, 6vw, 2rem);
            font-weight: 700; letter-spacing: -1px; text-transform: none;
          }
          .svc2-header h2 em { font-style: italic; }
          .svc2-header-desc { font-size: .82rem; }
          .svc2-title { font-weight: 700; font-size: .9rem; letter-spacing: 0; }
          .svc2-items li { font-size: .78rem; }
        }
        @media (max-width: 400px) {
          .svc2-img-wrap { height: 180px; }
          .svc2-header h2 {
            font-size: clamp(1.3rem, 6.5vw, 1.7rem);
            font-weight: 600; letter-spacing: -.5px;
          }
        }
      `}</style>

      <section id="servicios">
        <div className="svc2-wrap">

          <div ref={headerRef} className={`svc2-header${headerVisible ? ' svc2-hv' : ''}`}>
            <div>
              <h2>
                Cuidado dental<br />
                de <em>excelencia</em><br />
                <span className="accent-bar">en Sullana</span>
              </h2>
            </div>
            <div className="svc2-header-right">
              <p className="svc2-header-desc">
                Soluciones completas con tecnología de punta, adaptadas a cada paciente.
              </p>
            </div>
          </div>

          <div className="svc2-grid">
            {services.map((s, i) => (
              <ServiceCard key={s.num} s={s} i={i} />
            ))}
          </div>

        </div>
      </section>

      {activeService && (
        <ServiceModal service={activeService} onClose={() => setActiveService(null)} />
      )}
    </>
  );
};

export default ServicesSection;