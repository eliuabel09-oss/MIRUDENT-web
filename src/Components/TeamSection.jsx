import React, { useRef, useEffect, useState } from 'react';

const C = {
  azul:        '#0099CC',
  azulLight:   '#e0f4fb',
  azulDark:    '#006b8f',
  naranja:     '#f97316',
  naranjaLight:'rgba(249,115,22,0.10)',
  gris:        '#0f172a',
  grisMid:     '#475569',
  grisLight:   '#64748b',
  white:       '#ffffff',
  offwhite:    '#f8fafc',
  line:        'rgba(15,23,42,0.07)',
};

const useInView = (threshold = 0.1) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVisible(true);
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
};

const doctors = [
  {
    initials: 'AV',
    name: 'Dr. Álvaro Villalta',
    role: 'Director · Odontólogo General',
    cop: 'COP 12345',
    exp: '5 años en Sullana',
    bio: 'Especialista en rehabilitación oral y estética dental. Fundador de la clínica, comprometido con transformar la salud bucal de cada paciente.',
    tags: ['Rehabilitación', 'Estética', 'Implantes'],
    accent: C.azul,
    accentLight: C.azulLight,
    img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80&fit=crop&crop=face',
  },
  {
    initials: 'MC',
    name: 'Dra. María Castro',
    role: 'Ortodoncista',
    cop: 'COP 67890',
    exp: '8 años de experiencia',
    bio: 'Especialista en ortodoncia y ortopedia maxilar. Experta en brackets estéticos y alineadores invisibles para todas las edades.',
    tags: ['Brackets', 'Invisalign', 'Ortopedia'],
    accent: C.naranja,
    accentLight: C.naranjaLight,
    img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80&fit=crop&crop=face',
  },
  {
    initials: 'LP',
    name: 'Dra. Laura Pérez',
    role: 'Estética Dental',
    cop: 'COP 11223',
    exp: '6 años de experiencia',
    bio: 'Experta en diseño de sonrisa, carillas de porcelana y blanqueamiento profesional con resultados naturales y duraderos.',
    tags: ['Carillas', 'Blanqueamiento', 'Diseño de sonrisa'],
    accent: C.azul,
    accentLight: C.azulLight,
    img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&q=80&fit=crop&crop=face',
  },
];

const TeamSection = () => {
  const [active, setActive] = useState(1);
  const [hRef, hVis]        = useInView(0.1);

  useEffect(() => {
    const t = setInterval(() => {
      setActive(prev => (prev + 1) % doctors.length);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <style>{`

        #equipo {
          background: ${C.white};
          padding: clamp(80px,10vw,120px) 0 0;
          overflow: hidden;
        }
        .tm-wrap { max-width: 1200px; margin: 0 auto; padding: 0 clamp(18px,5vw,56px); }

        .tm-hdr {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 40px; align-items: end;
          margin-bottom: clamp(40px,5vw,64px);
          padding-bottom: clamp(28px,4vw,48px);
          border-bottom: 1.5px solid ${C.line};
          opacity: 0; transform: translateY(24px);
          transition: opacity .7s ease, transform .7s ease;
        }
        .tm-hdr.tm-hv { opacity: 1; transform: translateY(0); }

        .tm-hdr h2 {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(2rem,4vw,3.4rem);
          font-weight: 900; line-height: 1.05;
          color: ${C.gris}; margin: 0;
          letter-spacing: -2.5px; text-transform: uppercase;
        }
        .tm-hdr h2 em { font-style: italic; color: ${C.azul}; }
        .tm-hdr-desc {
          font-family: 'Inter', sans-serif;
          font-size: clamp(.88rem,1.2vw,.98rem); font-weight: 400;
          color: ${C.grisMid}; line-height: 1.75; margin: 0; align-self: flex-end;
        }

        .tm-gallery {
          display: flex; gap: 12px;
          height: clamp(480px, 58vw, 680px);
          align-items: stretch;
        }
        .tm-panel {
          position: relative; border-radius: 20px;
          overflow: hidden; cursor: pointer; flex-shrink: 0;
          transition: flex .6s cubic-bezier(.16,1,.3,1);
          flex: 1;
        }
        .tm-panel.tm-active { flex: 4; cursor: default; }
        .tm-panel-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover; object-position: center top;
          transition: transform .7s ease; display: block;
        }
        .tm-panel:hover .tm-panel-img { transform: scale(1.04); }
        .tm-panel.tm-active .tm-panel-img { transform: scale(1); }
        .tm-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(10,15,30,0.92) 0%, rgba(10,15,30,0.5) 45%, rgba(10,15,30,0.15) 100%);
          transition: background .5s ease;
        }
        .tm-panel:not(.tm-active) .tm-overlay { background: rgba(10,15,30,0.62); }

        .tm-panel-mini {
          position: absolute; inset: 0;
          display: flex; flex-direction: column;
          align-items: center; justify-content: flex-end;
          padding: 0 12px 28px; opacity: 1;
          transition: opacity .35s ease;
        }
        .tm-panel.tm-active .tm-panel-mini { opacity: 0; pointer-events: none; }
        .tm-mini-initials {
          font-family: 'Montserrat', sans-serif;
          font-size: 1.3rem; font-weight: 900;
          letter-spacing: -1px; color: white; margin-bottom: 8px;
        }
        .tm-mini-role {
          font-family: 'Montserrat', sans-serif;
          font-size: .68rem; font-weight: 800;
          letter-spacing: .12em; text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          writing-mode: vertical-rl; text-orientation: mixed;
          transform: rotate(180deg); margin-bottom: 12px;
        }
        .tm-mini-dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,0.4); }

        .tm-panel-full {
          position: absolute; inset: 0;
          display: flex; flex-direction: column;
          justify-content: flex-end;
          padding: clamp(24px,3vw,40px);
          opacity: 0; transition: opacity .4s ease .15s; pointer-events: none;
        }
        .tm-panel.tm-active .tm-panel-full { opacity: 1; pointer-events: auto; }

        .tm-full-badges { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 14px; }
        .tm-full-badge {
          font-family: 'Montserrat', sans-serif;
          font-size: .56rem; font-weight: 800;
          letter-spacing: .1em; text-transform: uppercase;
          padding: 4px 10px; border-radius: 100px; backdrop-filter: blur(6px);
        }
        .tm-full-badge-cop { background: rgba(255,255,255,0.15); color: rgba(255,255,255,0.9); border: 1px solid rgba(255,255,255,0.2); }
        .tm-full-badge-exp { border: 1px solid rgba(255,255,255,0.15); }

        .tm-full-name {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(1.4rem,2.5vw,2rem);
          font-weight: 900; color: white;
          line-height: 1.05; letter-spacing: -1.5px;
          text-transform: uppercase; margin-bottom: 4px;
        }
        .tm-full-role {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(.68rem,1vw,.78rem); font-weight: 800;
          letter-spacing: .08em; text-transform: uppercase; margin-bottom: 14px;
        }
        .tm-full-bio {
          font-family: 'Inter', sans-serif;
          font-size: clamp(.78rem,.95vw,.86rem); font-weight: 400;
          color: rgba(255,255,255,0.6); line-height: 1.65;
          margin-bottom: 18px; max-width: 420px;
        }
        .tm-full-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 20px; }
        .tm-full-tag {
          font-family: 'Montserrat', sans-serif;
          font-size: .7rem; font-weight: 800;
          letter-spacing: .08em; text-transform: uppercase;
          padding: 4px 10px; border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.2);
          color: rgba(255,255,255,0.75);
          backdrop-filter: blur(4px); background: rgba(255,255,255,0.08);
        }

        @media (max-width: 1024px) {
          .tm-hdr { gap: 24px; }
          .tm-gallery { height: clamp(420px, 52vw, 600px); }
          .tm-hdr h2 { font-weight: 800; letter-spacing: -2px; }
        }

        @media (max-width: 860px) {
          .tm-hdr { grid-template-columns: 1fr; gap: 16px; }
          .tm-hdr h2 { font-size: clamp(1.6rem, 4vw, 2.4rem); font-weight: 700; letter-spacing: -1.5px; }
          .tm-gallery { flex-direction: column; height: auto; gap: 10px; }
          .tm-panel { flex: none !important; height: 120px; border-radius: 16px; }
          .tm-panel.tm-active { height: clamp(380px, 72vw, 520px); }
          .tm-panel-mini { flex-direction: row; align-items: center; padding: 0 20px; justify-content: flex-start; gap: 14px; }
          .tm-mini-role { writing-mode: horizontal-tb; transform: none; font-size: .7rem; margin-bottom: 0; }
          .tm-mini-initials { margin-bottom: 0; font-size: 1.1rem; }
          .tm-mini-dot { display: none; }
          .tm-panel-full { padding: 20px; }
          .tm-full-bio { display: none; }
          .tm-full-name { font-weight: 800; letter-spacing: -1px; }
          .tm-full-role { font-weight: 700; letter-spacing: .04em; }
        }

        @media (max-width: 540px) {
          #equipo { padding: 64px 0 0; }
          .tm-hdr h2 { font-size: clamp(1.3rem, 5.5vw, 1.8rem); font-weight: 700; letter-spacing: -1px; text-transform: none; }
          .tm-hdr h2 em { font-style: italic; }
          .tm-hdr-desc { font-size: .84rem; }
          .tm-gallery { gap: 8px; }
          .tm-panel { border-radius: 12px; height: 100px; }
          .tm-panel.tm-active { height: clamp(340px, 80vw, 460px); }
          .tm-full-name { font-size: 1.1rem; font-weight: 700; letter-spacing: -.5px; text-transform: none; }
          .tm-full-role { font-size: .65rem; font-weight: 600; letter-spacing: .02em; text-transform: none; }
          .tm-full-tag { font-size: .7rem; font-weight: 700; }
          .tm-full-badge { font-size: .66rem; }
          .tm-mini-initials { font-size: 1rem; }
          .tm-mini-role { font-size: .66rem; }
        }

        @media (max-width: 380px) {
          .tm-hdr h2 { font-size: clamp(1.2rem, 5.5vw, 1.5rem); font-weight: 600; }
          .tm-panel { height: 88px; }
          .tm-panel.tm-active { height: clamp(300px, 85vw, 420px); }
          .tm-mini-initials { font-size: .95rem; }
          .tm-full-name { font-size: 1rem; font-weight: 600; }
        }
      `}</style>

      <section id="equipo">
        <div className="tm-wrap">

          <div ref={hRef} className={`tm-hdr${hVis ? ' tm-hv' : ''}`}>
            <div>
              <h2>Nuestros <em>Profesionales</em><br />a tu servicio</h2>
            </div>
            <p className="tm-hdr-desc">
              Cada tratamiento es realizado por profesionales con formación especializada,
              número de colegiatura y experiencia clínica comprobada en Sullana.
            </p>
          </div>

          <div className="tm-gallery">
            {doctors.map((doc, i) => {
              const isActive = active === i;
              return (
                <div
                  key={i}
                  className={`tm-panel${isActive ? ' tm-active' : ''}`}
                  onClick={() => !isActive && setActive(i)}
                >
                  <img className="tm-panel-img" src={doc.img} alt={doc.name} loading="lazy" />
                  <div className="tm-overlay" />

                  <div className="tm-panel-mini">
                    <div className="tm-mini-initials">0{i + 1}</div>
                    <div className="tm-mini-role" style={{ color: doc.accent }}>{doc.role}</div>
                    <div className="tm-mini-dot" style={{ background: doc.accent }} />
                  </div>

                  <div className="tm-panel-full">
                    <div className="tm-full-badges">
                      <span className="tm-full-badge tm-full-badge-cop">{doc.cop}</span>
                      <span className="tm-full-badge tm-full-badge-exp"
                        style={{ background: `${doc.accent}30`, color: 'rgba(255,255,255,0.85)', borderColor: `${doc.accent}50` }}>
                        {doc.exp}
                      </span>
                    </div>
                    <div className="tm-full-name">{doc.name}</div>
                    <div className="tm-full-role" style={{ color: doc.accent }}>{doc.role}</div>
                    <p className="tm-full-bio">{doc.bio}</p>
                    <div className="tm-full-tags">
                      {doc.tags.map((tag, j) => (
                        <span key={j} className="tm-full-tag">{tag}</span>
                      ))}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>
    </>
  );
};

export default TeamSection;