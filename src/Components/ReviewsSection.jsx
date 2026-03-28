import React, { useRef, useEffect, useState, useCallback } from 'react';

const C = {
  azul:        '#0099CC',
  azulDark:    '#006b8f',
  azulLight:   '#e0f4fb',
  naranja:     '#f97316',
  naranjaDark: '#9a3d00',
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

const reviews = [
  { initials: 'MR', name: 'María Ramos',    avatarBg: C.azulLight,              avatarColor: C.azulDark,    text: 'Excelente atención, el doctor explicó todo paso a paso. Me hice carillas y quedé absolutamente encantada con el resultado. Lo recomiendo al 100%.' },
  { initials: 'JC', name: 'José Córdova',   avatarBg: 'rgba(249,115,22,0.15)',  avatarColor: C.naranjaDark, text: 'Llevé a mi hijo de 9 años y lo atendieron con mucha paciencia. Las instalaciones son modernas y muy limpias. Los mejores dentistas de Sullana sin duda.' },
  { initials: 'KV', name: 'Karla Vásquez',  avatarBg: C.azulLight,              avatarColor: C.azulDark,    text: 'Llegué con miedo y salí encantada. El blanqueamiento quedó espectacular, no sentí dolor en ningún momento. El equipo es muy profesional.' },
  { initials: 'RL', name: 'Roberto Lara',   avatarBg: 'rgba(249,115,22,0.15)',  avatarColor: C.naranjaDark, text: 'Me pusieron un implante y el proceso fue mucho más sencillo de lo esperado. El resultado es completamente natural. Muy satisfecho con el servicio.' },
  { initials: 'SN', name: 'Sandra Neyra',   avatarBg: C.azulLight,              avatarColor: C.azulDark,    text: 'Primera vez en la clínica y me fui con ganas de volver. Trato muy personalizado, te hacen sentir cómodo y seguro desde el primer momento.' },
  { initials: 'PM', name: 'Pedro Morales',  avatarBg: 'rgba(249,115,22,0.15)',  avatarColor: C.naranjaDark, text: 'Rápida atención, precios justos y resultado excelente. Clínica muy bien equipada. Ya recomendé a toda mi familia. La mejor opción en Sullana.' },
  { initials: 'LT', name: 'Lucía Torres',   avatarBg: C.azulLight,              avatarColor: C.azulDark,    text: 'El diseño de sonrisa cambió mi vida. Siempre tuve complejo con mis dientes y ahora sonrío con confianza. El Dr. Villalta es un artista.' },
  { initials: 'CA', name: 'Carlos Arévalo', avatarBg: 'rgba(249,115,22,0.15)',  avatarColor: C.naranjaDark, text: 'Tenía mucho miedo de la extracción pero no sentí absolutamente nada. La anestesia fue perfecta y la recuperación muy rápida. Excelente profesional.' },
];

const VISIBLE  = 3;
const maxIndex = reviews.length - VISIBLE;

const ReviewCard = ({ r, accent }) => (
  <div style={{
    background: C.white,
    border: `1px solid rgba(15,23,42,0.09)`,
    borderLeft: `3px solid ${accent}`,
    borderRadius: 16,
    padding: '22px 24px',
    display: 'flex', flexDirection: 'column', gap: 14,
    boxShadow: '0 2px 16px rgba(15,23,42,0.04)',
    width: '100%', boxSizing: 'border-box',
  }}>
    <p style={{
      fontFamily: "'Inter', sans-serif", fontSize: '.84rem',
      color: C.grisMid, lineHeight: 1.72, margin: 0,
      fontStyle: 'italic', fontWeight: 400, flex: 1,
    }}>{r.text}</p>
    <div style={{ height: 1, background: C.line }} />
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{
        width: 36, height: 36, borderRadius: '50%',
        background: r.avatarBg, color: r.avatarColor,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Montserrat', sans-serif", fontSize: '.72rem', fontWeight: 900,
        flexShrink: 0,
      }}>{r.initials}</div>
      <div>
        <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '.76rem', fontWeight: 800, color: C.gris }}>{r.name}</div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '.72rem', color: C.azulDark, fontWeight: 500 }}>Paciente</div>
      </div>
    </div>
  </div>
);

const ReviewsSection = () => {
  const [hRef, hVis]          = useInView(0.1);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused]   = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 699px)');
    const check = (e) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener('change', check);
    return () => mq.removeEventListener('change', check);
  }, []);

  const max = isMobile ? reviews.length - 1 : maxIndex;
  const next = useCallback(() => setCurrent(c => c >= max ? 0 : c + 1), [max]);
  const prev = useCallback(() => setCurrent(c => c <= 0 ? max : c - 1), [max]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 4000);
    return () => clearInterval(t);
  }, [paused, next]);

  const touchStartX = useRef(null);
  const onTouchStart = isMobile ? undefined : e => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd   = isMobile ? undefined : e => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    touchStartX.current = null;
  };

  return (
    <>
      <style>{`
        #resenas { background:${C.white}; overflow:hidden; padding-top:clamp(80px,10vw,120px); }

        .rv-split {
          display:grid; grid-template-columns:420px 1fr;
          min-height:clamp(560px,68vw,720px);
        }
        .rv-img-col { position:relative; overflow:hidden; }
        .rv-img-col img { width:100%; height:100%; object-fit:cover; object-position:center top; display:block; }
        .rv-img-col::after {
          content:''; position:absolute; inset:0;
          background:linear-gradient(to right,transparent 70%,${C.white} 100%);
          pointer-events:none;
        }
        .rv-img-shape {
          position:absolute; top:0; right:-1px; bottom:0; width:80px;
          background:${C.white}; clip-path:ellipse(80px 55% at 100% 50%);
        }

        .rv-content-col {
          display:flex; flex-direction:column;
          padding:clamp(48px,6vw,80px) clamp(28px,4vw,56px) clamp(32px,4vw,56px);
          justify-content:center; min-width:0;
        }

        .rv-hdr { margin-bottom:clamp(28px,4vw,40px); opacity:0; transform:translateY(20px); transition:opacity .7s,transform .7s; }
        .rv-hdr.rv-hv { opacity:1; transform:translateY(0); }
        .rv-hdr h2 {
          font-family:'Montserrat',sans-serif;
          font-size:clamp(1.8rem,3vw,2.8rem); font-weight:900; line-height:1.05;
          color:${C.gris}; margin:0 0 14px; letter-spacing:-2px; text-transform:uppercase;
        }
        .rv-hdr h2 em { font-style:italic; color:${C.azul}; }
        .rv-hdr-desc {
          font-family:'Inter',sans-serif; font-size:.9rem; color:${C.grisMid};
          line-height:1.72; margin:0; font-weight:400; max-width:520px;
        }
        .rv-hdr-desc strong { color:${C.gris}; font-weight:600; }

        .rv-carousel-wrap { position:relative; flex:1; }
        .rv-track-mask { overflow:hidden; margin:0 -6px; padding:6px 6px 20px; }
        .rv-track {
          display:flex; gap:14px;
          transition:transform .55s cubic-bezier(.16,1,.3,1);
          will-change:transform;
        }
        .rv-card-wrap { flex:0 0 calc((100% - 28px) / 3); min-width:0; }

        .rv-fade-wrap { position:relative; width:100%; }
        .rv-fade-card { position:absolute; top:0; left:0; right:0; opacity:0; transition:opacity .5s ease; pointer-events:none; }
        .rv-fade-card.rv-fade-active { opacity:1; position:relative; pointer-events:auto; }

        .rv-controls { display:flex; align-items:center; justify-content:space-between; margin-top:20px; }
        .rv-dots { display:flex; gap:0; align-items:center; }
        .rv-dot {
          width:44px; height:44px;
          border:none; cursor:pointer; background:transparent;
          padding:0; position:relative; flex-shrink:0;
        }
        .rv-dot::after {
          content:''; position:absolute; top:50%; left:50%;
          transform:translate(-50%,-50%);
          height:6px; width:6px; border-radius:100px;
          background:${C.line};
          transition:width .35s cubic-bezier(.16,1,.3,1),background .3s;
        }
        .rv-dot.rv-dot-active::after { width:22px; background:${C.azul}; }
        .rv-arrows { display:flex; gap:8px; }
        .rv-arrow {
          width:40px; height:40px; border-radius:50%;
          background:${C.white}; border:1.5px solid ${C.line};
          display:flex; align-items:center; justify-content:center;
          cursor:pointer; transition:all .2s;
        }
        .rv-arrow:hover { background:${C.azul}; border-color:${C.azul}; }
        .rv-arrow:hover svg path { stroke:${C.white}; }
        .rv-arrow svg path { stroke:${C.grisMid}; transition:stroke .2s; }
        .rv-progress-bar { height:2px; background:${C.line}; border-radius:2px; margin-top:14px; overflow:hidden; }
        .rv-progress-fill { height:100%; background:${C.azul}; border-radius:2px; transform-origin:left; animation:rv-progress 4s linear infinite; }
        .rv-progress-fill.paused { animation-play-state:paused; }
        @keyframes rv-progress { from{transform:scaleX(0)} to{transform:scaleX(1)} }

        @media (max-width:1024px) {
          .rv-split { grid-template-columns:320px 1fr; }
          .rv-card-wrap { flex:0 0 calc((100% - 28px) / 3); }
        }
        @media (max-width:960px) {
          .rv-split { grid-template-columns:1fr; }
          .rv-img-col { height:clamp(240px,50vw,360px); }
          .rv-img-shape { display:none; }
          .rv-img-col::after { background:linear-gradient(to bottom,transparent 60%,${C.white} 100%); }
          .rv-content-col { padding:clamp(32px,5vw,48px) clamp(20px,5vw,40px); }
          .rv-card-wrap { flex:0 0 calc((100% - 14px) / 2); }
          .rv-hdr h2 { font-weight:800; letter-spacing:-1.5px; }
        }
        @media (max-width:700px) {
          .rv-desktop-carousel { display:none; }
          .rv-mobile-fade { display:block; }
          .rv-hdr h2 { font-size:clamp(1.3rem,5.5vw,1.7rem); font-weight:700; letter-spacing:-.5px; text-transform:none; }
          .rv-hdr h2 em { font-style:italic; }
          .rv-hdr-desc { font-size:.84rem; }
          .rv-arrows { display:none; }
          .rv-controls { justify-content:center; }
          .rv-content-col { padding:clamp(28px,5vw,40px) clamp(16px,4vw,28px); }
        }
        @media (min-width:701px) {
          .rv-desktop-carousel { display:block; }
          .rv-mobile-fade { display:none; }
        }
        @media (max-width:400px) {
          .rv-hdr h2 { font-size:clamp(1.2rem,5.5vw,1.5rem); font-weight:600; }
          .rv-content-col { padding:24px 16px; }
        }
      `}</style>

      <section id="resenas">
        <div className="rv-split">

          <div className="rv-img-col">
            <img src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&q=72&fit=crop&fm=webp&auto=format" loading="lazy" decoding="async" width="600" height="720" alt="Paciente satisfecho en clínica Villalta" />
            <div className="rv-img-shape" />
          </div>

          <div
            className="rv-content-col"
            onMouseEnter={() => !isMobile && setPaused(true)}
            onMouseLeave={() => !isMobile && setPaused(false)}
          >
            <div ref={hRef} className={`rv-hdr${hVis ? ' rv-hv' : ''}`}>
              <h2>Nuestros pacientes<br /><em>nos hablan</em></h2>
              <p className="rv-hdr-desc">
                En <strong>Clínica MIRUDENT | Odontología Especializada</strong>, tu salud dental está en las mejores manos. La confianza de nuestros pacientes nos impulsa a brindar siempre el mayor profesionalismo en Sullana.
              </p>
            </div>

            <div className="rv-desktop-carousel rv-carousel-wrap">
              <div className="rv-track-mask" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
                <div className="rv-track" style={{ transform: `translateX(calc(-${current} * (100% / ${VISIBLE}) - ${current} * 14px / ${VISIBLE}))` }}>
                  {reviews.map((r, i) => (
                    <div key={i} className="rv-card-wrap">
                      <ReviewCard r={r} accent={i % 2 === 0 ? C.azul : C.naranja} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="rv-progress-bar">
                <div className={`rv-progress-fill${paused ? ' paused' : ''}`} key={current} />
              </div>
              <div className="rv-controls">
                <div className="rv-dots">
                  {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                    <button key={i} className={`rv-dot${current === i ? ' rv-dot-active' : ''}`} onClick={() => setCurrent(i)} aria-label={`Reseña ${i + 1}`} />
                  ))}
                </div>
                <div className="rv-arrows">
                  <button className="rv-arrow" onClick={prev} aria-label="Anterior">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11 14l-5-5 5-5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                  <button className="rv-arrow" onClick={next} aria-label="Siguiente">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M7 4l5 5-5 5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="rv-mobile-fade rv-carousel-wrap">
              <div style={{ position: 'relative', width: '100%' }}>
                {reviews.map((r, i) => (
                  <div key={i} style={{
                    position: i === current ? 'relative' : 'absolute',
                    top: 0, left: 0, right: 0,
                    opacity: i === current ? 1 : 0,
                    transition: 'opacity .5s ease',
                    pointerEvents: i === current ? 'auto' : 'none',
                    width: '100%',
                  }}>
                    <ReviewCard r={r} accent={i % 2 === 0 ? C.azul : C.naranja} />
                  </div>
                ))}
              </div>
              <div className="rv-progress-bar" style={{ marginTop: 14 }}>
                <div className="rv-progress-fill" key={current} />
              </div>
              <div className="rv-controls">
                <div className="rv-dots">
                  {reviews.map((_, i) => (
                    <button key={i} className={`rv-dot${current === i ? ' rv-dot-active' : ''}`} onClick={() => setCurrent(i)} aria-label={`Reseña ${i + 1}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ReviewsSection;