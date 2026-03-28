import React, { useState } from 'react';

const C = {
  azul:      '#0099CC',
  azulLight: '#e0f4fb',
  azulDark:  '#006b8f',
  naranja:   '#f97316',
  gris:      '#0f172a',
  grisMid:   '#475569',
  grisLight: '#64748b',
  white:     '#ffffff',
  offwhite:  '#f8fafc',
  line:      'rgba(15,23,42,0.07)',
};

const faqs = [
  { q: '¿Qué nos hace diferentes?',        a: 'Combinamos tecnología digital con odontología mínimamente invasiva. Cada tratamiento está diseñado para tu comodidad y con resultados duraderos.' },
  { q: '¿Atienden niños?',                  a: 'Sí, contamos con atención especializada en odontopediatría. Creamos un ambiente cómodo y amigable para los más pequeños de la familia.' },
  { q: '¿Cuánto dura la ortodoncia?',       a: 'Depende del caso, pero generalmente entre 12 y 24 meses. Realizamos controles mensuales para asegurar el avance correcto.' },
  { q: '¿Duele el blanqueamiento?',         a: 'No. Usamos geles de alta calidad que protegen el esmalte y minimizan la sensibilidad. El procedimiento es seguro y muy cómodo.' },
  { q: '¿Cómo agendar una cita?',           a: 'Por WhatsApp al 926 226 443, por teléfono o mediante nuestro formulario. Respondemos en menos de una hora en horario de atención.' },
  { q: '¿Aceptan tarjetas de crédito?',     a: 'Sí, aceptamos todas las tarjetas y ofrecemos facilidades de pago en tratamientos largos. Nuestros presupuestos son transparentes y sin costos ocultos.' },
  { q: '¿Cuál es el horario?',              a: 'Lunes a Sábado de 8:00 a.m. a 1:00 p.m. y 3:00 p.m. a 8:00 p.m. Atendemos con cita previa en nuestra clínica en Sullana, Piura.' },
  { q: '¿Qué llevar a la primera visita?',  a: 'Solo tu DNI y, si las tienes, radiografías recientes. Nosotros nos encargamos del resto para darte un diagnóstico completo desde el primer día.' },
];

const AccordionItem = ({ item, index, open, onToggle, isFirst, mobile }) => (
  <div style={{ borderBottom: `1.5px solid ${C.line}`, overflow: 'hidden',
    ...(isFirst ? { borderTop: `1.5px solid ${C.line}` } : {}) }}>
    <button
      onClick={() => onToggle(index)}
      style={{
        width: '100%', display: 'flex',
        alignItems: 'center', justifyContent: 'space-between',
        gap: '16px',
        padding: 'clamp(13px,2vw,18px) 0',
        background: 'none', border: 'none', cursor: 'pointer',
        textAlign: 'left',
      }}
    >
      <span style={{
        fontFamily: "'Montserrat', sans-serif",
        fontSize: mobile ? 'clamp(.78rem,3.5vw,.88rem)' : 'clamp(.82rem,1vw,.92rem)',
        fontWeight: open ? (mobile ? 700 : 800) : (mobile ? 600 : 700),
        color: open ? C.gris : C.grisMid,
        lineHeight: 1.4,
        letterSpacing: mobile ? '0' : '-.2px',
        textTransform: mobile ? 'none' : 'uppercase',
        transition: 'color .2s',
      }}>
        {item.q}
      </span>
      <span style={{
        width: 22, height: 22, borderRadius: '50%',
        border: `1.5px solid ${open ? C.azul : C.line}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
        color: open ? C.azul : C.grisLight,
        fontSize: '1rem', lineHeight: 1,
        transition: 'border-color .2s, color .2s, transform .25s',
        transform: open ? 'rotate(45deg)' : 'rotate(0)',
      }}>+</span>
    </button>
    <div style={{
      maxHeight: open ? '200px' : '0',
      opacity:   open ? 1 : 0,
      overflow:  'hidden',
      transition: 'max-height .35s ease, opacity .3s ease',
    }}>
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 'clamp(.82rem,.95vw,.9rem)',
        fontWeight: 400,
        color: C.grisMid, lineHeight: 1.8,
        margin: '0 0 16px', paddingRight: '32px',
      }}>
        {item.a}
      </p>
    </div>
  </div>
);

const FAQSection = () => {
  const [openL, setOpenL] = useState(null);
  const [openR, setOpenR] = useState(null);
  const [openM, setOpenM] = useState(null);

  return (
    <>
      <style>{`

        #faq {
          background: ${C.white};
          padding: clamp(32px,4vw,52px) 0;
          overflow: hidden;
        }
        .faq-wrap {
          max-width: 1200px; margin: 0 auto;
          padding: 0 clamp(18px,5vw,56px);
        }

        .faq-header {
          margin-bottom: clamp(24px,3vw,40px);
          padding-bottom: clamp(18px,2.5vw,32px);
          border-bottom: 1.5px solid ${C.line};
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 24px; align-items: end;
        }

        .faq-h2 {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(1.8rem,3.5vw,3rem);
          font-weight: 900; line-height: 1.05;
          color: ${C.gris}; margin: 0;
          letter-spacing: -2px; text-transform: uppercase;
        }
        .faq-h2 em { font-style: italic; color: ${C.azul}; }
        .faq-sub {
          font-family: 'Inter', sans-serif;
          font-size: clamp(.86rem,1vw,.94rem); font-weight: 400;
          color: ${C.grisMid}; line-height: 1.75; margin: 0;
          justify-self: end; max-width: 340px;
        }

        .faq-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 0 clamp(32px,5vw,72px); }
        .faq-single { display: none; }

        @media (max-width: 900px) {
          .faq-header { grid-template-columns: 1fr; gap: 12px; }
          .faq-sub { justify-self: start; max-width: 100%; }
          .faq-h2 {
            font-size: clamp(1.6rem, 4vw, 2.4rem);
            font-weight: 800;
            letter-spacing: -1.5px;
          }
          .faq-cols { gap: 0 clamp(20px,3vw,40px); }
        }

        @media (max-width: 720px) {
          .faq-header { grid-template-columns: 1fr; gap: 12px; }
          .faq-sub { justify-self: start; max-width: 100%; }
          .faq-h2 {
            font-size: clamp(1.3rem, 5.5vw, 1.8rem);
            font-weight: 700;
            letter-spacing: -1px;
            text-transform: none;
          }
          .faq-h2 em { font-style: italic; }
          .faq-sub { font-size: .82rem; }
          .faq-cols   { display: none; }
          .faq-single { display: block; }
        }

        @media (max-width: 400px) {
          .faq-h2 {
            font-size: clamp(1.2rem, 5.5vw, 1.5rem);
            font-weight: 600;
            letter-spacing: -.5px;
          }
        }
      `}</style>

      <section id="faq">
        <div className="faq-wrap">

          <div className="faq-header">
            <h2 className="faq-h2">
              Todo lo que<br />
              necesitas <em>saber</em>
            </h2>
            <p className="faq-sub">
              Resolvemos tus dudas sobre nuestros servicios para que tu visita sea lo más cómoda posible.
            </p>
          </div>

          <div className="faq-cols">
            <div>
              {faqs.slice(0,4).map((item, i) => (
                <AccordionItem key={i} item={item} index={i}
                  open={openL === i} isFirst={i === 0}
                  onToggle={idx => setOpenL(openL === idx ? null : idx)} />
              ))}
            </div>
            <div>
              {faqs.slice(4).map((item, i) => (
                <AccordionItem key={i} item={item} index={i}
                  open={openR === i} isFirst={i === 0}
                  onToggle={idx => setOpenR(openR === idx ? null : idx)} />
              ))}
            </div>
          </div>

          <div className="faq-single">
            {faqs.map((item, i) => (
              <AccordionItem key={i} item={item} index={i}
                open={openM === i} isFirst={i === 0} mobile
                onToggle={idx => setOpenM(openM === idx ? null : idx)} />
            ))}
          </div>

        </div>
      </section>
    </>
  );
};

export default FAQSection;