import React, { useState, useEffect } from 'react';

const C = {
  azul:     '#0099CC',
  azulOsc:  '#001E3C',
  naranja:  '#f97316',
  gris:     '#0f172a',
  grisMid:  '#475569',
  white:    '#ffffff',
  offWhite: '#f1f5f9',
  line:     'rgba(15,23,42,0.08)',
};

const SLIDES = [
  {
    url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1600&q=80',
    alt: 'Dentista atendiendo paciente',
  },
  {
    url: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1600&q=80',
    alt: 'Consultorio dental moderno',
  },
  {
    url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1600&q=80',
    alt: 'Sonrisa saludable odontología',
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setCurrent(prev => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideZoom {
          from { transform: scale(1.06); }
          to   { transform: scale(1); }
        }

        .h-section {
          position: relative;
          min-height: 92vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
        }

        /* ── SLIDES ── */
        .h-slide {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          z-index: 0;
          opacity: 0;
          transition: opacity .9s ease;
        }
        .h-slide.active {
          opacity: 1;
          animation: slideZoom 6s ease both;
        }

        .h-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            108deg,
            rgba(0,8,22,0.92) 0%,
            rgba(0,15,40,0.82) 42%,
            rgba(0,25,55,0.58) 68%,
            rgba(0,30,60,0.28) 100%
          );
          z-index: 1;
        }

        /* ── CONTAINER ── */
        .h-container {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 90px 15% 90px 8%;
        }

        .h-eyebrow {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: 'Montserrat', sans-serif;
          font-size: .63rem;
          font-weight: 800;
          letter-spacing: .22em;
          text-transform: uppercase;
          color: ${C.azul};
          margin-bottom: 16px;
          animation: fadeInUp .5s ease both;
        }

        .h-title {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(2.6rem, 4.5vw, 4.8rem);
          font-weight: 900;
          line-height: 1.05;
          color: ${C.white};
          margin-bottom: 24px;
          letter-spacing: -3px;
          text-transform: uppercase;
          animation: fadeInUp .6s .1s ease both;
        }

        .h-title b {
          color: ${C.azul};
          display: block;
          font-style: italic;
        }

        .h-title span.accent-text {
          position: relative;
          display: inline-block;
          color: ${C.white};
        }
        .h-title span.accent-text::after {
          content: '';
          position: absolute;
          bottom: 15%;
          left: 0;
          width: 100%;
          height: 8px;
          background: ${C.naranja};
          opacity: 0.5;
          z-index: -1;
        }

        .h-description-wrap {
          border-left: 3px solid ${C.azul};
          padding-left: 16px;
          margin-bottom: 35px;
          animation: fadeInUp .7s .25s ease both;
        }

        .h-description {
          font-size: 1rem;
          line-height: 1.7;
          color: rgba(255,255,255,0.68);
          max-width: 480px;
          font-weight: 400;
          margin: 0;
        }
        .h-description strong { color: ${C.white}; font-weight: 600; }

        .h-btn-group {
          display: flex;
          align-items: center;
          gap: 25px;
          animation: fadeInUp .7s .4s ease both;
        }

        .h-btn-main {
          background: ${C.azulOsc};
          color: ${C.white};
          padding: 18px 40px;
          border-radius: 4px;
          font-weight: 800;
          font-family: 'Montserrat', sans-serif;
          text-transform: uppercase;
          font-size: 0.8rem;
          letter-spacing: 2px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
        }
        .h-btn-main:hover {
          background: ${C.azul};
          transform: translateY(-3px);
          box-shadow: 0 12px 25px rgba(0,153,204,0.35);
        }

        .h-link-secondary {
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          font-weight: 600;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: color 0.3s ease;
        }
        .h-link-secondary::after {
          content: '';
          width: 25px; height: 1px;
          background: currentColor;
          display: inline-block;
          transition: width .3s ease;
        }
        .h-link-secondary:hover { color: ${C.white}; }
        .h-link-secondary:hover::after { width: 38px; }

        /* ── SLIDER DOTS ── */
        .h-indicators {
          display: flex;
          gap: 10px;
          margin-top: 55px;
          animation: fadeInUp .7s .55s ease both;
        }
        .h-indicator {
          height: 3px;
          border-radius: 2px;
          background: rgba(255,255,255,0.25);
          cursor: pointer;
          transition: all .4s ease;
          width: 28px;
        }
        .h-indicator.active {
          background: ${C.naranja};
          width: 48px;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1200px) {
          .h-container { padding: 70px 10% 70px 7%; }
        }
        @media (max-width: 1024px) {
          .h-container { padding: 60px 8% 60px 6%; }
          .h-title { font-size: clamp(2.2rem, 4vw, 3.4rem); letter-spacing: -2px; }
        }
        @media (max-width: 768px) {
          .h-section { min-height: auto; }
          .h-container { padding: 50px 6% 50px; }
          .h-title { font-size: clamp(1.8rem, 6vw, 2.6rem); letter-spacing: -1.5px; }
          .h-description { font-size: .95rem; }
          .h-btn-group { flex-wrap: wrap; gap: 16px; }
          .h-btn-main { padding: 15px 32px; }
        }
        @media (max-width: 480px) {
          .h-container { padding: 40px 5% 40px; }
          .h-title { font-size: clamp(1.5rem, 7vw, 2rem); letter-spacing: -1px; text-transform: none; }
          .h-description { font-size: .88rem; }
          .h-btn-group { flex-direction: column; align-items: flex-start; width: 100%; gap: 12px; }
          .h-btn-main { width: 100%; text-align: center; font-size: .75rem; padding: 14px 24px; }
        }
        @media (max-width: 360px) {
          .h-title { font-size: clamp(1.3rem, 7.5vw, 1.6rem); font-weight: 600; }
        }
      `}</style>

      <section className="h-section">

        {/* Slides de fondo */}
        {SLIDES.map((s, i) => (
          <div
            key={i}
            className={`h-slide${i === current ? ' active' : ''}`}
            style={{ backgroundImage: `url('${s.url}')` }}
            aria-label={s.alt}
          />
        ))}
        <div className="h-overlay" />

        <div className="h-container">
          <h1 className="h-title">
            Tu Sonrisa<br />
            <b>Merece lo</b>
            <span className="accent-text">Mejor</span>
          </h1>

          <div className="h-description-wrap">
            <p className="h-description">
              En <strong>MIRUDENT</strong>, nos dedicamos a cuidar tu salud bucal con atención
              personalizada y tecnología moderna en el corazón de <strong>Sullana</strong>.
              Confía en un equipo comprometido con transformar tu sonrisa y brindarte
              la mejor experiencia odontológica.
            </p>
          </div>

          <div className="h-btn-group">
            <a href="#contacto" className="h-btn-main">Agendar Cita</a>
            <a href="#servicios" className="h-link-secondary">Ver especialidades</a>
          </div>

          {/* Slider dots — clickeables */}
          <div className="h-indicators">
            {SLIDES.map((_, i) => (
              <div
                key={i}
                className={`h-indicator${i === current ? ' active' : ''}`}
                onClick={() => setCurrent(i)}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;