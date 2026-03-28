import React from 'react';

const C = {
  azul:    '#0099CC',
  naranja: '#f97316',
  gris:    '#0f172a',
  grisMid: '#475569',
  white:   '#ffffff',
  line:    'rgba(15,23,42,0.08)',
};

const photos = [
  { title: 'Diseño de Sonrisa', sub: 'Carillas de porcelana',  cat: 'Estética',     accent: C.azul,    img: '/assets/sonrisa.webp' },
  { title: 'Blanqueamiento',    sub: 'Resultados naturales',   cat: 'Estética',     accent: C.naranja, img: '/assets/hero-odontologia.webp' },
  { title: 'Ortodoncia',        sub: 'Alineación perfecta',    cat: 'Ortodoncia',   accent: C.azul,    img: '/assets/sonrisa.webp' },
  { title: 'Implantes',         sub: 'Aspecto natural',        cat: 'Restauración', accent: C.naranja, img: '/assets/hero-odontologia.webp' },
  { title: 'Carillas',          sub: 'Estética impecable',     cat: 'Estética',     accent: C.azul,    img: '/assets/sonrisa.webp' },
  { title: 'Limpieza Dental',   sub: 'Higiene profesional',    cat: 'Preventivo',   accent: C.naranja, img: '/assets/hero-odontologia.webp' },
];

const GallerySection = () => (
  <>
    <style>{`
      #galeria {
        background: ${C.white};
        padding: clamp(48px,7vw,88px) 0 clamp(60px,8vw,100px);
        overflow: hidden;
      }
      .gl-wrap { max-width: 1240px; margin: 0 auto; padding: 0 clamp(18px,5vw,56px); }

      .gl-header {
        display: grid; grid-template-columns: 1fr 1fr;
        gap: 32px; align-items: end;
        margin-bottom: clamp(40px,6vw,64px);
        padding-bottom: clamp(24px,3vw,40px);
        border-bottom: 1.5px solid ${C.line};
      }
      .gl-h2 {
        font-family: 'Montserrat', sans-serif;
        font-size: clamp(2rem,4vw,3.4rem);
        font-weight: 900; line-height: 1.05;
        color: ${C.gris}; margin: 0;
        letter-spacing: -2.5px; text-transform: uppercase;
      }
      .gl-h2 em { font-style: italic; color: ${C.azul}; }
      .gl-sub {
        font-family: 'Inter', sans-serif;
        font-size: clamp(.88rem,1.1vw,.96rem); font-weight: 400;
        color: ${C.grisMid}; line-height: 1.75; margin: 0;
        max-width: 400px; align-self: end; justify-self: end;
      }

      .gl-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        column-gap: 10px; row-gap: 10px;
        grid-template-areas: "a b c" "a d c" "e d f" "e .  f";
      }
      .gl-item {
        position: relative; overflow: hidden; cursor: pointer;
        border-radius: 12px;
        transition: transform .5s cubic-bezier(.16,1,.3,1);
      }
      .gl-item:nth-child(1) { grid-area: a; height: 480px; }
      .gl-item:nth-child(2) { grid-area: b; height: 280px; }
      .gl-item:nth-child(3) { grid-area: c; height: 480px; }
      .gl-item:nth-child(4) { grid-area: d; height: 360px; }
      .gl-item:nth-child(5) { grid-area: e; height: 310px; }
      .gl-item:nth-child(6) { grid-area: f; height: 310px; }
      .gl-item:hover { transform: scale(1.025) !important; z-index: 2; }
      .gl-item img { width: 100%; height: 100%; object-fit: cover; object-position: center; display: block; transition: transform .7s ease; }
      .gl-item:hover img { transform: scale(1.05); }
      .gl-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(15,23,42,0.65) 0%, transparent 50%); opacity: 0; transition: opacity .4s ease; }
      .gl-item:hover .gl-overlay { opacity: 1; }
      .gl-accent-line { display: none; }
      .gl-info { position: absolute; bottom: 0; left: 0; right: 0; padding: 20px 18px; z-index: 4; opacity: 0; transform: translateY(8px); transition: opacity .4s ease, transform .4s ease; }
      .gl-item:hover .gl-info { opacity: 1; transform: translateY(0); }
      .gl-cat { font-family: 'Montserrat', sans-serif; font-size: .68rem; font-weight: 800; letter-spacing: .18em; text-transform: uppercase; color: rgba(255,255,255,0.92); display: block; margin-bottom: 5px; }
      .gl-title { font-family: 'Montserrat', sans-serif; font-size: clamp(.9rem,1.4vw,1.05rem); font-weight: 900; color: ${C.white}; line-height: 1.15; margin: 0 0 3px; letter-spacing: -.5px; text-transform: uppercase; }
      .gl-subtitle { font-family: 'Inter', sans-serif; font-size: .72rem; font-weight: 400; color: rgba(255,255,255,0.7); }

      .gl-carousel {
        display: none;
        overflow-x: auto; scroll-snap-type: x mandatory;
        -webkit-overflow-scrolling: touch; gap: 12px;
        margin: 0 calc(-1 * clamp(18px,5vw,56px));
        padding: 0 clamp(18px,5vw,32px) 16px;
        scrollbar-width: none; -ms-overflow-style: none;
      }
      .gl-carousel::-webkit-scrollbar { display: none; }
      .gl-carousel-item {
        scroll-snap-align: start;
        flex: 0 0 72vw; max-width: 280px; min-width: 220px;
        height: 300px; position: relative; overflow: hidden;
        border-radius: 16px; cursor: pointer;
        box-shadow: 0 6px 24px rgba(15,23,42,0.12);
      }
      .gl-carousel-item img { width: 100%; height: 100%; object-fit: cover; display: block; }
      .gl-carousel-item .gl-overlay { opacity: 1; }
      .gl-carousel-item .gl-info { opacity: 1; transform: translateY(0); }

      .gl-scroll-hint {
        display: none; align-items: center; gap: 8px;
        justify-content: center; margin-top: 14px;
        font-family: 'Inter', sans-serif;
        font-size: .72rem; font-weight: 400; color: ${C.grisMid};
      }
      .gl-scroll-hint svg { opacity: .5; animation: hint-slide 1.5s ease-in-out infinite; }
      @keyframes hint-slide { 0%,100%{transform:translateX(0)} 50%{transform:translateX(5px)} }

      @media (max-width: 1024px) {
        .gl-header { grid-template-columns: 1fr; }
        .gl-sub { justify-self: start; max-width: 100%; }
        .gl-h2 { font-weight: 800; letter-spacing: -2px; }
        .gl-item:nth-child(1) { height: 420px; }
        .gl-item:nth-child(3) { height: 420px; }
        .gl-item:nth-child(4) { height: 320px; }
        .gl-item:nth-child(5) { height: 270px; }
        .gl-item:nth-child(6) { height: 270px; }
      }
      @media (max-width: 860px) {
        .gl-header { grid-template-columns: 1fr; }
        .gl-sub { justify-self: start; max-width: 100%; }
        .gl-h2 { font-size: clamp(1.5rem, 5vw, 2.2rem); font-weight: 700; letter-spacing: -1.5px; }
        .gl-grid { display: none; }
        .gl-carousel { display: flex; }
        .gl-scroll-hint { display: flex; }
      }
      @media (max-width: 480px) {
        .gl-carousel-item { flex: 0 0 80vw; }
        .gl-h2 { font-size: clamp(1.3rem, 6vw, 1.7rem); font-weight: 700; letter-spacing: -1px; text-transform: none; }
        .gl-h2 em { font-style: italic; }
        .gl-sub { font-size: .82rem; }
        .gl-carousel-item .gl-title { font-size: .9rem; font-weight: 700; letter-spacing: -.2px; text-transform: none; }
        .gl-carousel-item .gl-cat { font-size: .65rem; }
      }
      @media (max-width: 360px) {
        .gl-carousel-item { flex: 0 0 86vw; height: 260px; }
        .gl-h2 { font-size: clamp(1.2rem, 6vw, 1.5rem); font-weight: 600; letter-spacing: -.5px; }
      }
    `}</style>

    <section id="galeria">
      <div className="gl-wrap">
        <div className="gl-header">
          <div><h2 className="gl-h2">Galería de <em>sonrisas</em></h2></div>
          <p className="gl-sub">
            Transformaciones reales de pacientes en Sullana. Cada sonrisa cuenta una historia de confianza, dedicación y excelencia clínica.
          </p>
        </div>

        <div className="gl-grid">
          {photos.map((p, i) => (
            <div key={i} className="gl-item">
              <img src={p.img} alt={p.title} loading="lazy" />
              <div className="gl-overlay" />
              <div className="gl-accent-line" style={{ background: p.accent }} />
              <div className="gl-info">
                <span className="gl-cat">{p.cat}</span>
                <h3 className="gl-title">{p.title}</h3>
                <p className="gl-subtitle">{p.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="gl-carousel">
          {photos.map((p, i) => (
            <div key={i} className="gl-carousel-item">
              <img src={p.img} alt={p.title} loading="lazy" />
              <div className="gl-overlay" />
              <div className="gl-accent-line" style={{ background: p.accent }} />
              <div className="gl-info">
                <span className="gl-cat">{p.cat}</span>
                <h3 className="gl-title">{p.title}</h3>
                <p className="gl-subtitle">{p.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="gl-scroll-hint">
          Desliza para ver más
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </section>
  </>
);

export default GallerySection;