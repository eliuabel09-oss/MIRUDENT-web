import React from 'react';

const C = {
  azul:     '#0099CC',   // celeste MIRUDENT (navbar "Centro Odontológico")
  azulOsc:  '#001E3C',   // azul marino MIRUDENT
  naranja:  '#f97316',
  gris:     '#0f172a',
  grisMid:  '#475569',
  white:    '#ffffff',
  offWhite: '#f1f5f9',
  line:     'rgba(15,23,42,0.08)',
};

const HeroSection = () => {
  return (
    <>
      <style>{`

        .h-section {
          position: relative;
          background: linear-gradient(180deg, ${C.offWhite} 0%, ${C.white} 80%);
          padding: 70px 15% 0px 15%;
          min-height: 85vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
        }

        .h-bg-accent {
          position: absolute;
          top: 5%;
          right: 0;
          width: 38%;
          height: 85%;
          background: rgba(0, 153, 204, 0.05);
          z-index: 1;
          border-radius: 120px 0 0 120px;
        }

        .h-container {
          max-width: 1400px;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
          z-index: 2;
        }

        .h-title {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(2.8rem, 5vw, 4.2rem);
          font-weight: 900;
          line-height: 1.05;
          color: ${C.gris};
          margin-bottom: 24px;
          letter-spacing: -3px;
          text-transform: uppercase;
        }

        /* "Merece lo" en celeste MIRUDENT */
        .h-title b {
          color: ${C.azul};
          display: block;
        }

        .h-title span.accent-text {
          position: relative;
          display: inline-block;
          color: ${C.gris};
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

        .h-description {
          font-size: 1rem;
          line-height: 1.7;
          color: ${C.grisMid};
          max-width: 480px;
          margin-bottom: 35px;
          font-weight: 400;
        }

        .h-description strong {
          color: ${C.gris};
          font-weight: 600;
        }

        .h-btn-group {
          display: flex;
          align-items: center;
          gap: 25px;
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
          box-shadow: 0 12px 25px rgba(0, 153, 204, 0.25);
        }

        .h-link-secondary {
          color: ${C.grisMid};
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
          width: 25px;
          height: 1px;
          background: ${C.grisMid};
          display: inline-block;
        }

        .h-link-secondary:hover {
          color: ${C.azul};
        }

        .h-visual {
          position: relative;
          display: flex;
          justify-content: center;
          align-self: flex-end;
        }

        .h-image-wrapper {
          position: relative;
        }

        .h-image-container {
          position: relative;
          width: 100%;
          max-width: 420px;
          z-index: 5;
          padding-right: 15px;
          padding-bottom: 15px;
        }

        .h-main-img {
          width: 100%;
          aspect-ratio: 0.85;
          object-fit: cover;
          border-radius: 60px 0 0 0;
          display: block;
          position: relative;
          z-index: 2;
        }

        /* Borde decorativo en celeste MIRUDENT */
        .h-image-container::after {
          content: '';
          position: absolute;
          top: 25px;
          right: 0;
          bottom: 0;
          left: 35px;
          background: ${C.azul};
          border-radius: 0 0 8px 0;
          z-index: 1;
        }

        /* ── 1200px ── */
        @media (max-width: 1200px) {
          .h-section { padding: 60px 8% 0 8%; }
          .h-container { gap: 40px; }
        }

        /* ── Tablet grande 1024px ── */
        @media (max-width: 1024px) {
          .h-section { padding: 50px 6% 0 6%; min-height: 80vh; }
          .h-container { grid-template-columns: 1fr 1fr; gap: 32px; }
          .h-image-container { max-width: 360px; }
          .h-title {
            font-size: clamp(2rem, 3.8vw, 2.8rem);
            font-weight: 800;
            letter-spacing: -2px;
          }
          .h-btn-main { font-weight: 700; }
        }

        /* ── Tablet 768px ── */
        @media (max-width: 768px) {
          .h-section { padding: 40px 5% 0 5%; min-height: auto; }
          .h-container { grid-template-columns: 1fr; text-align: center; gap: 0; }
          .h-bg-accent { display: none; }
          .h-description { margin: 0 auto 28px; max-width: 100%; font-size: .95rem; }
          .h-btn-group { justify-content: center; margin-bottom: 36px; flex-wrap: wrap; gap: 16px; }
          .h-visual { justify-content: center; }
          .h-image-container { max-width: 300px; margin: 0 auto; }
          .h-title {
            font-size: clamp(1.8rem, 6vw, 2.4rem);
            font-weight: 700;
            letter-spacing: -1.5px;
          }
          .h-btn-main {
            font-weight: 700;
            letter-spacing: 1.5px;
            padding: 15px 32px;
          }
          .h-link-secondary { font-weight: 500; }
        }

        /* ── Móvil 480px ── */
        @media (max-width: 480px) {
          .h-section { padding: 28px 4% 0 4%; }
          .h-title {
            font-size: clamp(1.5rem, 7vw, 2rem);
            font-weight: 700;
            letter-spacing: -1px;
            text-transform: none;
          }
          .h-title b { font-weight: 700; }
          .h-description { font-size: .88rem; margin-bottom: 22px; }
          .h-btn-group { flex-direction: column; align-items: center; width: 100%; gap: 12px; }
          .h-btn-main {
            width: 100%; text-align: center;
            font-weight: 600;
            letter-spacing: 1px;
            font-size: .75rem;
            padding: 14px 24px;
          }
          .h-link-secondary { font-size: .8rem; font-weight: 500; }
          .h-image-container { max-width: 260px; }
        }

        /* ── Móvil pequeño 360px ── */
        @media (max-width: 360px) {
          .h-title { font-size: clamp(1.3rem, 7.5vw, 1.6rem); font-weight: 600; }
          .h-image-container { max-width: 230px; }
        }
      `}</style>

      <section className="h-section">
        <div className="h-bg-accent" />

        <div className="h-container">

          <div className="h-content">
            <h1 className="h-title">
              Tu Sonrisa<br />
              <b>Merece lo</b>
              <span className="accent-text">Mejor</span>
            </h1>

            <p className="h-description">
              En <strong>MIRUDENT</strong>, nos dedicamos a cuidar tu salud bucal con atención personalizada y tecnología moderna en el corazón de <strong>Sullana</strong>.
              <br /><br />
              Confía en un equipo comprometido con transformar tu sonrisa y brindarte la mejor experiencia odontológica.
            </p>

            <div className="h-btn-group">
              <a href="#contacto" className="h-btn-main">Agendar Cita</a>
              <a href="#servicios" className="h-link-secondary">Ver especialidades</a>
            </div>
          </div>

          <div className="h-visual">
            <div className="h-image-wrapper">
              <div className="h-image-container">
                <img
                  src="/assets/hero-odontologia.webp"
                  alt="MIRUDENT - Centro Odontológico Sullana"
                  className="h-main-img"
                  fetchpriority="high"
                  decoding="sync"
                  loading="eager"
                  width="420"
                  height="494"
                />
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default HeroSection;