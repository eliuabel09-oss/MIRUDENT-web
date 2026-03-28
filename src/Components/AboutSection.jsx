import React, { useEffect, useState, useRef } from 'react';

const C = {
  azul:        '#0099CC',
  azulLight:   '#e0f4fb',
  azulDark:    '#006b8f',
  naranja:     '#f97316',
  naranjaDark: '#9a3d00',
  gris:        '#0f172a',
  grisMid:     '#475569',
  white:       '#ffffff',
};

const StatCounter = ({ endValue, label, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();
  const rafRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) { setIsVisible(true); observer.disconnect(); }
    }, { threshold: 0.1 });
    const cur = domRef.current;
    if (cur) observer.observe(cur);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const end = parseInt(endValue.replace(/[,+ %]/g, ''));
    const duration = 1200;
    const startTime = performance.now();
    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
      else setCount(end);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [isVisible, endValue]);

  return (
    <div ref={domRef} style={{
      background: C.white,
      padding: 'clamp(18px,3vw,28px)',
      borderRadius: '14px',
      border: '1.5px solid rgba(15,23,42,0.07)',
      display: 'flex', flexDirection: 'column', gap: '8px',
      position: 'relative', overflow: 'hidden',
      transition: 'transform .25s, box-shadow .25s',
    }}
    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 12px 32px rgba(0,153,204,0.12)`; }}
    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, ${C.azul}, ${C.naranja})`,
      }} />
      <p aria-label={`${count.toLocaleString()}${suffix} ${label}`}
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: 'clamp(1.6rem,2.5vw,2.2rem)', fontWeight: 800,
          lineHeight: 1, color: C.gris, margin: 0,
          letterSpacing: '-1.5px',
        }}
        aria-live="polite"
      >
        {count.toLocaleString()}<span style={{ color: C.azul }}>{suffix}</span>
      </p>
      <p style={{
        fontFamily: "'Montserrat', sans-serif",
        fontSize: '.7rem', fontWeight: 800,
        color: C.grisMid, margin: 0,
        textTransform: 'uppercase', letterSpacing: '.16em',
      }}>
        {label}
      </p>
    </div>
  );
};

const AboutSection = () => {
  const stats = [
    { value: "5",   label: "Años en Sullana",    suffix: "" },
    { value: "800", label: "Pacientes atendidos", suffix: "+" },
    { value: "100", label: "Satisfacción",        suffix: "%" },
    { value: "3",   label: "Especialidades",      suffix: "" },
  ];

  const badges = [
    "Especialistas Certificados",
    "Tecnología Avanzada",
    "Trato Personalizado",
    "Bioseguridad",
    "Sullana, Piura",
  ];

  return (
    <>
      <style>{`
        #nosotros {
          padding: clamp(64px,8vw,96px) 0 clamp(20px,3vw,36px);
          background: #ffffff;
          position: relative; overflow: hidden;
          font-family: 'Inter', sans-serif;
        }
        .ab-wrap {
          max-width: 1280px; margin: 0 auto;
          padding: 0 clamp(18px,5vw,40px);
        }
        .ab-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(40px,6vw,80px);
          align-items: start;
        }

        .ab-imgs { position: relative; margin-top: 60px; padding-bottom: 80px; }
        .ab-img-main {
          position: relative;
          width: 85%;
          height: clamp(340px,44vw,540px);
        }
        .ab-img-main-overlay {
          position: absolute; inset: 0;
          background: rgba(0,153,204,0.08);
          z-index: 2; mix-blend-mode: multiply;
          border-radius: 4px 48px 80px 4px;
        }
        .ab-img-main img {
          width: 100%; height: 100%;
          object-fit: cover;
          border-radius: 4px 48px 80px 4px;
          box-shadow: 0 32px 72px rgba(0,0,0,0.16);
          display: block;
        }
        .ab-img-secondary {
          position: absolute;
          bottom: -10px; right: -8px; z-index: 3;
          width: 68%;
          height: clamp(200px,28vw,340px);
        }
        .ab-img-secondary img {
          width: 100%; height: 100%;
          object-fit: cover;
          border-radius: 48px 4px 4px 48px;
          border: 5px solid white;
          box-shadow: 0 20px 52px rgba(0,0,0,0.18);
          display: block;
        }

        .ab-text { display: flex; flex-direction: column; gap: 28px; }

        .ab-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          align-self: flex-start;
        }
        .ab-eyebrow::before {
          content: ''; width: 22px; height: 1.5px;
          background: ${C.naranja}; flex-shrink: 0;
        }
        .ab-eyebrow-txt {
          font-family: 'Montserrat', sans-serif;
          font-size: .7rem; font-weight: 800;
          letter-spacing: .2em; text-transform: uppercase;
          color: ${C.naranjaDark};
        }

        .ab-h2 {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(2rem,4vw,3.4rem);
          font-weight: 900; line-height: 1.05;
          color: ${C.gris}; margin: 0;
          letter-spacing: -2.5px; text-transform: uppercase;
        }
        .ab-h2 em { font-style: italic; color: ${C.azul}; }
        .ab-h2-sub {
          display: block;
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(1.2rem,2vw,1.8rem);
          font-weight: 800; font-style: italic;
          color: ${C.grisMid}; margin-top: 6px;
          letter-spacing: -1px;
        }

        .ab-body { display: flex; flex-direction: column; gap: 14px; max-width: 480px; }
        .ab-body p {
          font-family: 'Inter', sans-serif;
          font-size: clamp(.9rem,1.1vw,.98rem);
          color: ${C.grisMid}; line-height: 1.82; margin: 0;
        }
        .ab-body p strong { color: ${C.gris}; font-weight: 600; }

        .ab-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

        .ab-imgs-mobile {
          display: none; position: relative;
          height: clamp(260px,72vw,360px);
          margin: 8px 0 48px;
        }
        .ab-imgs-mobile .ab-img-main { width: 80%; height: 100%; }
        .ab-imgs-mobile .ab-img-secondary { bottom: -20px; right: 0; width: 58%; height: 62%; }

        .ab-badges {
          font-family: 'Inter', sans-serif;
          font-size: .82rem; font-weight: 400;
          color: #64748b; line-height: 2;
        }

        @media (max-width: 1024px) {
          .ab-grid { gap: clamp(20px,4vw,40px); }
          .ab-img-main { width: 90%; height: clamp(300px,40vw,480px); }
          .ab-h2 { font-weight: 800; letter-spacing: -2px; }
          .ab-h2-sub { font-weight: 700; }
        }

        @media (max-width: 900px) {
          .ab-grid { grid-template-columns: 1fr; gap: 0; }
          .ab-imgs { display: none; }
          .ab-imgs-mobile { display: block; }
          .ab-text { gap: 24px; }
          .ab-body { max-width: 100%; }
          .ab-h2 { font-weight: 800; letter-spacing: -1.5px; }
          .ab-h2-sub { font-weight: 700; letter-spacing: -.5px; }
        }

        @media (max-width: 600px) {
          .ab-h2 {
            font-size: clamp(1.5rem, 6vw, 2rem);
            font-weight: 700; letter-spacing: -1px; text-transform: none;
          }
          .ab-h2 em { font-style: italic; }
          .ab-h2-sub { font-size: 1rem; font-weight: 600; letter-spacing: -.2px; }
          .ab-eyebrow-txt { font-weight: 700; }
          .ab-stats { grid-template-columns: 1fr 1fr; gap: 9px; }
          .ab-imgs-mobile { height: clamp(200px,72vw,280px); }
          .ab-imgs-mobile .ab-img-secondary { height: 55%; }
          .ab-badges { font-size: .78rem; }
        }

        @media (max-width: 380px) {
          .ab-h2 { font-size: clamp(1.3rem, 6.5vw, 1.6rem); font-weight: 600; letter-spacing: -.5px; }
          .ab-h2-sub { font-size: .9rem; font-weight: 600; }
          .ab-stats { grid-template-columns: 1fr 1fr; gap: 8px; }
        }
      `}</style>

      <section id="nosotros">
        <div className="ab-wrap">
          <div className="ab-grid">

            <div className="ab-imgs">
              <div className="ab-img-main">
                <div className="ab-img-main-overlay" />
                <img src="/assets/hero-odontologia.webp" loading="lazy" decoding="async" width="480" height="500" alt="Clínica Villalta" />
              </div>
              <div className="ab-img-secondary">
                <img src="/assets/sonrisa.webp" loading="lazy" decoding="async" width="320" height="300" alt="Equipo Villalta" />
              </div>
            </div>

            <div className="ab-text">

              <div className="ab-eyebrow">
                <span className="ab-eyebrow-txt">Sobre Villalta</span>
              </div>

              <h2 className="ab-h2">
                Tecnología y <em>cuidado humano</em>
                <span className="ab-h2-sub">en cada sonrisa</span>
              </h2>

              <div className="ab-body">
                <p>
                  En <strong>Villalta</strong>, combinamos tecnología dental de última generación con un trato cálido y cercano para brindarte resultados excepcionales en Sullana.
                </p>
                <p>
                  Nuestro equipo está dedicado a hacer cada visita cómoda y personalizada, construyendo relaciones duraderas basadas en la confianza y la excelencia clínica.
                </p>
              </div>

              <div className="ab-imgs-mobile">
                <div className="ab-img-main">
                  <div className="ab-img-main-overlay" />
                  <img src="/assets/hero-odontologia.webp" loading="lazy" decoding="async" width="480" height="500" alt="Clínica Villalta" />
                </div>
                <div className="ab-img-secondary">
                  <img src="/assets/sonrisa.webp" loading="lazy" decoding="async" width="320" height="300" alt="Equipo Villalta" />
                </div>
              </div>

              <div className="ab-stats">
                {stats.map((s, i) => (
                  <StatCounter key={i} endValue={s.value} label={s.label} suffix={s.suffix} />
                ))}
              </div>

              <div className="ab-badges">
                {badges.map((b, i) => (
                  <span key={b}>
                    {b}
                    {i < badges.length - 1 && (
                      <span style={{
                        display: 'inline-block',
                        width: 4, height: 4, borderRadius: '50%',
                        background: C.azul, opacity: .5,
                        margin: '0 10px', verticalAlign: 'middle',
                      }} aria-hidden="true" />
                    )}
                  </span>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSection;