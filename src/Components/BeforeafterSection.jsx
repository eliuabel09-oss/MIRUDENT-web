import React, { useRef, useEffect, useState, useCallback } from 'react';

const C = {
  azul:        '#0099CC',              // celeste MIRUDENT
  azulLight:   '#e0f4fb',
  azulDark:    '#006b8f',
  naranja:     '#f97316',              // naranja original — se mantiene
  naranjaDark: '#9a3d00',
  gris:        '#0f172a',
  grisMid:     '#475569',
  white:       '#ffffff',
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

const cases = [
  {
    num: '01',
    label: 'Blanqueamiento dental',
    desc: 'Tonos hasta 8 grados más blancos con tecnología LED profesional. Resultado duradero desde la primera sesión.',
    tag: 'Estética',
    duration: '2 sesiones',
    accent: C.azul,
    accentLight: C.azulLight,
    accentText: C.azulDark,
    beforeImg: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=720&q=72&fit=crop&fm=webp&auto=format',
    afterImg:  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=720&q=72&fit=crop&fm=webp&auto=format',
  },
  {
    num: '02',
    label: 'Ortodoncia con brackets',
    desc: 'Corrección de posición dental y mordida. Tratamiento personalizado con brackets metálicos o estéticos.',
    tag: 'Ortodoncia',
    duration: '12–18 meses',
    accent: C.naranja,
    accentLight: 'rgba(249,115,22,0.12)',
    accentText: C.naranjaDark,
    beforeImg: 'https://images.unsplash.com/photo-1588776814546-daab30f310ce?w=720&q=72&fit=crop&fm=webp&auto=format',
    afterImg:  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=720&q=72&fit=crop&fm=webp&auto=format',
  },
  {
    num: '03',
    label: 'Carillas de porcelana',
    desc: 'Diseño de sonrisa con carillas ultra-delgadas. Resultado natural, inmediato y duradero.',
    tag: 'Diseño de sonrisa',
    duration: '2–3 semanas',
    accent: C.azul,
    accentLight: C.azulLight,
    accentText: C.azulDark,
    beforeImg: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=720&q=72&fit=crop&fm=webp&auto=format',
    afterImg:  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=720&q=72&fit=crop&fm=webp&auto=format',
  },
];

const BigSlider = ({ caso, idx }) => {
  const [pos, setPos]           = useState(50);
  const [dragging, setDragging] = useState(false);
  const [touched, setTouched]   = useState(false);
  const containerRef            = useRef(null);
  const draggingRef             = useRef(false);

  useEffect(() => { setPos(50); setTouched(false); }, [idx]);

  const calcPos = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPos(Math.min(Math.max(((clientX - rect.left) / rect.width) * 100, 2), 98));
    setTouched(true);
  }, []);

  const handleTouchStart = useCallback((e) => {
    draggingRef.current = true;
    setDragging(true);
    calcPos(e.touches[0].clientX);
  }, [calcPos]);

  const handleTouchEnd = useCallback(() => {
    draggingRef.current = false;
    setDragging(false);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onTouchMove = (e) => {
      if (!draggingRef.current) return;
      e.preventDefault();
      calcPos(e.touches[0].clientX);
    };
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    return () => el.removeEventListener('touchmove', onTouchMove);
  }, [calcPos]);

  return (
    <div
      ref={containerRef}
      className="bs-visual"
      onMouseDown={e => { draggingRef.current = true; setDragging(true); calcPos(e.clientX); e.preventDefault(); }}
      onMouseMove={e => { if (dragging) calcPos(e.clientX); }}
      onMouseUp={() => { draggingRef.current = false; setDragging(false); }}
      onMouseLeave={() => { draggingRef.current = false; setDragging(false); }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ cursor: dragging ? 'ew-resize' : 'col-resize' }}
    >
      <div className="bs-side bs-before">
        <img src={caso.beforeImg} alt={`Antes — ${caso.label}`} draggable={false} loading="lazy" />
        <div className="bs-before-tint" />
      </div>

      <div className="bs-side bs-after" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img src={caso.afterImg} alt={`Después — ${caso.label}`} draggable={false} loading="lazy" />
      </div>

      <div className="bs-divider" style={{ left: `${pos}%` }}>
        <div
          className={`bs-handle${dragging ? ' bs-drag' : ''}`}
          style={{ borderColor: caso.accent, boxShadow: `0 0 0 5px ${caso.accentLight}` }}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M8 11H3M19 11h-5M9 8l-5 3 5 3M13 8l5 3-5 3"
              stroke={caso.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      <span className={`bs-lbl bs-lbl-b${pos < 15 ? ' bs-lbl-hide' : ''}`}>Antes</span>
      <span className={`bs-lbl bs-lbl-a${pos > 85 ? ' bs-lbl-hide' : ''}`} style={{ background: caso.accent }}>
        Después
      </span>

      {!touched && (
        <div className="bs-hint">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M7 2l5 5-5 5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Arrastra para comparar
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transform: 'scaleX(-1)' }}>
            <path d="M2 7h10M7 2l5 5-5 5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}
    </div>
  );
};

const BeforeAfterSection = () => {
  const [active, setActive] = useState(0);
  const [hRef, hVis]        = useInView(0.1);
  const caso                = cases[active];

  return (
    <>
      <style>{`

        #transformaciones {
          background: ${C.gris};
          overflow: hidden;
        }

        .ba-layout {
          display: grid;
          grid-template-columns: 360px 1fr;
          min-height: clamp(560px, 70vh, 780px);
        }

        /* ══ COLUMNA TEXTO ══ */
        .ba-col-text {
          display: flex; flex-direction: column; justify-content: center;
          padding: clamp(48px,6vw,80px) clamp(32px,4vw,56px);
          border-right: 1px solid rgba(255,255,255,0.07);
          position: relative; z-index: 2;
          opacity: 0; transform: translateX(-28px);
          transition: opacity .8s ease, transform .8s ease;
        }
        .ba-col-text.ba-vis { opacity: 1; transform: translateX(0); }

        .ba-h2 {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(1.8rem, 2.8vw, 2.6rem);
          font-weight: 900;
          line-height: 1.05;
          color: ${C.white};
          margin: 0 0 20px;
          letter-spacing: -2px;
          text-transform: uppercase;
        }
        /* "MIRUDENT" / "Sullana" en celeste */
        .ba-h2 em { font-style: italic; color: ${C.azul}; }

        .ba-intro {
          font-family: 'Inter', sans-serif;
          font-size: .9rem; color: rgba(255,255,255,0.45);
          line-height: 1.75; margin: 0 0 36px;
          font-weight: 400;
        }

        /* Selector vertical */
        .ba-selector { display: flex; flex-direction: column; gap: 4px; margin-bottom: 40px; }

        .ba-sel-item {
          display: flex; align-items: center; gap: 14px;
          padding: 14px 16px; border-radius: 12px;
          background: transparent; border: 1px solid transparent;
          cursor: pointer; transition: all .22s ease; text-align: left;
        }
        .ba-sel-item:hover {
          background: rgba(255,255,255,0.05);
          border-color: rgba(255,255,255,0.08);
        }
        /* Activo celeste (casos 01 y 03) */
        .ba-sel-item.active {
          background: rgba(0,153,204,0.15);
          border-color: rgba(0,153,204,0.35);
        }
        /* Activo naranja (caso 02) */
        .ba-sel-item.active-orange {
          background: rgba(249,115,22,0.12);
          border-color: rgba(249,115,22,0.3);
        }

        .ba-sel-num {
          font-family: 'Montserrat', sans-serif;
          font-size: .58rem; font-weight: 900;
          letter-spacing: .12em; color: rgba(255,255,255,0.3);
          flex-shrink: 0; width: 24px; transition: color .2s;
        }
        .ba-sel-item.active .ba-sel-num,
        .ba-sel-item.active-orange .ba-sel-num { color: rgba(255,255,255,0.6); }
        .ba-sel-info { flex: 1; }
        .ba-sel-name {
          font-family: 'Montserrat', sans-serif;
          font-size: .78rem; font-weight: 800;
          letter-spacing: -.2px; text-transform: uppercase;
          color: rgba(255,255,255,0.5); margin-bottom: 2px; transition: color .2s;
        }
        .ba-sel-item.active .ba-sel-name,
        .ba-sel-item.active-orange .ba-sel-name { color: ${C.white}; }
        .ba-sel-dur {
          font-family: 'Inter', sans-serif;
          font-size: .72rem; color: rgba(255,255,255,0.28);
          font-weight: 400;
        }
        .ba-sel-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: transparent; flex-shrink: 0; transition: background .2s;
        }
        .ba-sel-item.active .ba-sel-dot        { background: ${C.azul}; }
        .ba-sel-item.active-orange .ba-sel-dot { background: ${C.naranja}; }

        /* ══ COLUMNA SLIDER ══ */
        .ba-col-slider {
          position: relative; display: flex; flex-direction: column;
        }

        .bs-visual {
          flex: 1; position: relative;
          overflow: hidden;
          touch-action: pan-y;
          user-select: none;
          min-height: clamp(560px, 70vh, 780px);
          cursor: col-resize;
        }
        .bs-side { position: absolute; inset: 0; }
        .bs-side img {
          width: 100%; height: 100%;
          object-fit: cover; object-position: center top;
          pointer-events: none; display: block;
        }
        .bs-before-tint {
          position: absolute; inset: 0;
          background: rgba(15,23,42,0.18);
          mix-blend-mode: multiply;
        }

        .bs-divider {
          position: absolute; inset: 0 auto;
          width: 2px; background: white;
          transform: translateX(-50%);
          pointer-events: none;
          filter: drop-shadow(0 0 6px rgba(0,0,0,0.4));
        }
        .bs-handle {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 46px; height: 46px; border-radius: 50%;
          background: white; border: 2.5px solid;
          display: flex; align-items: center; justify-content: center;
          pointer-events: auto; cursor: ew-resize;
          touch-action: none;
          transition: transform .15s ease;
        }
        .bs-handle.bs-drag { transform: translate(-50%, -50%) scale(1.1); }

        .bs-lbl {
          position: absolute; top: 20px;
          font-family: 'Montserrat', sans-serif;
          font-size: .6rem; font-weight: 800;
          letter-spacing: .1em; text-transform: uppercase;
          padding: 5px 14px; border-radius: 100px;
          pointer-events: none;
          transition: opacity .25s;
        }
        .bs-lbl-b { left: 18px; background: rgba(0,0,0,0.5); color: white; }
        .bs-lbl-a { right: 18px; color: white; }
        .bs-lbl-hide { opacity: 0 !important; }

        /* Footer desktop */
        .ba-case-footer {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 40px 32px 28px;
          background: linear-gradient(to top, rgba(15,23,42,0.85) 0%, transparent 100%);
          display: flex; align-items: flex-end; justify-content: space-between; gap: 16px;
          pointer-events: none;
        }
        .ba-case-label {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(.9rem,1.5vw,1.1rem);
          font-weight: 900; color: ${C.white};
          letter-spacing: -0.5px; margin-bottom: 4px;
          text-transform: uppercase;
        }
        .ba-case-desc {
          font-family: 'Inter', sans-serif;
          font-size: .8rem; color: rgba(255,255,255,0.55); line-height: 1.55;
          max-width: 380px; font-weight: 400;
        }
        .ba-case-tag {
          font-family: 'Montserrat', sans-serif;
          font-size: .6rem; font-weight: 800;
          letter-spacing: .1em; text-transform: uppercase;
          padding: 5px 12px; border-radius: 100px;
          white-space: nowrap; flex-shrink: 0;
        }

        /* Footer móvil */
        .ba-case-footer-mobile {
          display: none;
          padding: 14px 20px;
          background: ${C.gris};
          border-top: 1px solid rgba(255,255,255,0.07);
          align-items: center; justify-content: space-between; gap: 12px;
          flex-wrap: wrap;
        }

        .bs-hint {
          position: absolute; bottom: 80px; left: 50%;
          transform: translateX(-50%);
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(0,0,0,0.52); backdrop-filter: blur(8px);
          color: rgba(255,255,255,0.9);
          font-family: 'Inter', sans-serif;
          font-size: .7rem; font-weight: 500; letter-spacing: .04em;
          padding: 8px 18px; border-radius: 100px;
          white-space: nowrap; pointer-events: none;
          animation: bshint 2s ease-in-out infinite;
        }
        @keyframes bshint { 0%,100%{opacity:1} 50%{opacity:.5} }

        /* ══ RESPONSIVE ══ */
        @media (max-width: 1024px) {
          .ba-layout { grid-template-columns: 300px 1fr; }
          .ba-col-text { padding: clamp(40px,5vw,60px) clamp(24px,3vw,40px); }
          .ba-h2 { font-weight: 800; letter-spacing: -1.5px; font-size: clamp(1.6rem, 2.5vw, 2.2rem); }
          .ba-sel-name { font-weight: 700; }
          .ba-case-label { font-weight: 800; }
        }

        @media (max-width: 960px) {
          .ba-layout { grid-template-columns: 1fr; min-height: unset; }
          .ba-col-text {
            border-right: none;
            border-bottom: 1px solid rgba(255,255,255,0.07);
            padding: clamp(36px,6vw,52px) clamp(20px,5vw,40px) clamp(24px,4vw,36px);
          }
          .ba-selector { flex-direction: row; flex-wrap: wrap; gap: 8px; }
          .ba-sel-item { flex: 1 1 auto; min-width: 0; padding: 10px 14px; }
          .bs-visual { min-height: clamp(260px, 55vw, 460px); }
          .ba-case-footer { display: none; }
          .ba-case-footer-mobile { display: flex; }
          .bs-hint { bottom: 14px; }
          .ba-h2 { font-size: clamp(1.5rem, 4vw, 2rem); font-weight: 700; letter-spacing: -1px; margin-bottom: 14px; }
          .ba-intro { font-size: .85rem; margin-bottom: 24px; }
          .ba-sel-name { font-weight: 700; font-size: .74rem; }
          .ba-case-label { font-weight: 700; font-size: .9rem; }
        }

        @media (max-width: 640px) {
          .ba-h2 { font-size: clamp(1.3rem, 5.5vw, 1.7rem); font-weight: 700; letter-spacing: -.5px; text-transform: none; margin-bottom: 10px; }
          .ba-h2 em { font-style: italic; }
          .ba-intro { font-size: .82rem; margin-bottom: 18px; }
          .ba-selector { gap: 6px; }
          .ba-sel-name { font-size: .7rem; font-weight: 600; letter-spacing: 0; text-transform: none; }
          .ba-sel-num  { font-size: .55rem; font-weight: 700; }
          .ba-case-label { font-size: .82rem; font-weight: 700; letter-spacing: 0; text-transform: none; }
          .ba-case-desc  { font-size: .75rem; }
          .ba-case-tag   { font-size: .55rem; font-weight: 700; }
          .bs-hint { font-size: .62rem; padding: 6px 12px; }
        }

        @media (max-width: 540px) {
          .ba-sel-dur { display: none; }
          .bs-visual { min-height: clamp(220px, 65vw, 360px); }
          .ba-h2 { font-size: clamp(1.2rem, 5vw, 1.5rem); font-weight: 600; }
        }

        @media (max-width: 380px) {
          .ba-sel-item { padding: 8px 10px; }
          .bs-visual { min-height: clamp(200px, 70vw, 320px); }
          .ba-h2 { font-size: 1.15rem; }
          .ba-intro { font-size: .78rem; }
        }
      `}</style>

      <section id="transformaciones">
        <div className="ba-layout">

          {/* ══ COLUMNA IZQUIERDA — texto ══ */}
          <div ref={hRef} className={`ba-col-text${hVis ? ' ba-vis' : ''}`}>
            <h2 className="ba-h2">
              Pacientes<br />
              de <em>Sullana</em><br />
              que ya cambiaron
            </h2>

            <p className="ba-intro">
              Arrastra el divisor para ver la transformación. Cada caso es un
              paciente real atendido en <em style={{ fontStyle: 'normal', color: C.azul }}>MIRUDENT</em>.
            </p>

            <div className="ba-selector">
              {cases.map((c, i) => {
                const isActive = active === i;
                const isOrange = c.accent === C.naranja;
                return (
                  <button
                    key={i}
                    className={`ba-sel-item${isActive ? (isOrange ? ' active-orange' : ' active') : ''}`}
                    onClick={() => setActive(i)}
                  >
                    <span className="ba-sel-num">{c.num}</span>
                    <div className="ba-sel-info">
                      <div className="ba-sel-name">{c.label}</div>
                      <div className="ba-sel-dur">{c.duration}</div>
                    </div>
                    <div className="ba-sel-dot" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* ══ COLUMNA DERECHA — slider ══ */}
          <div className="ba-col-slider">
            <BigSlider caso={caso} idx={active} />

            {/* Footer desktop */}
            <div className="ba-case-footer">
              <div>
                <div className="ba-case-label">{caso.label}</div>
                <div className="ba-case-desc">{caso.desc}</div>
              </div>
              <span className="ba-case-tag" style={{ background: caso.accentLight, color: caso.accentText }}>
                {caso.tag}
              </span>
            </div>

            {/* Footer móvil */}
            <div className="ba-case-footer-mobile">
              <div style={{ flex: 1 }}>
                <div className="ba-case-label">{caso.label}</div>
                <div className="ba-case-desc">{caso.desc}</div>
              </div>
              <span className="ba-case-tag" style={{ background: caso.accentLight, color: caso.accentText }}>
                {caso.tag}
              </span>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default BeforeAfterSection;