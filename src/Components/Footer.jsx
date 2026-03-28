import React from 'react';
import { IconInstagram, IconFacebook, IconWhatsapp, IconArrowRight } from './Icons';

const Footer = () => {
  return (
    <footer className="relative bg-[#001E3C] pt-16 pb-10 overflow-hidden font-sans">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#0099CC]/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/4" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#00BFFF]/5 rounded-full blur-3xl pointer-events-none translate-y-1/4 -translate-x-1/4" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">

        {/* BLOQUE SUPERIOR: Navegación y Marca */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 mb-16 items-start">

          {/* Columna 1 — Marca */}
          <div className="space-y-6 flex flex-col items-center md:items-start text-center md:text-left sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="h-14 w-14 rounded-full border-2 border-[#0099CC]/40 overflow-hidden bg-white p-1 shadow-lg">
                <img
                  src="./assets/mirudent.webp"
                  alt="Logo MIRUDENT"
                  width="48"
                  height="48"
                  loading="lazy"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-left">
                <p className="text-lg font-bold text-white leading-none m-0">MIRUDENT</p>
                <p className="text-[#00BFFF] text-[10px] font-semibold tracking-wider uppercase mt-1">
                  Centro Odontológico
                </p>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
              Dedicados a cuidar tu sonrisa con atención personalizada, tecnología moderna y un equipo comprometido con tu salud bucal.
            </p>
            <div className="flex gap-3 justify-center md:justify-start">
              <SocialBtn Icon={IconInstagram} href="https://instagram.com" label="Síguenos en Instagram" />
              <SocialBtn Icon={IconFacebook}  href="https://www.facebook.com/profile.php?id=100093917114373" label="Síguenos en Facebook" />
              <SocialBtn Icon={IconWhatsapp}  href="https://wa.me/51926226443" label="Escríbenos por WhatsApp" />
            </div>
          </div>

          {/* Columna 2 — Navegación */}
          <div className="flex flex-col items-center sm:items-start md:items-center">
            <div className="w-fit text-left">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-6 m-0">Navegación</p>
              <ul className="space-y-4 list-none p-0">
                <FooterLink href="#servicios" text="Servicios" />
                <FooterLink href="#nosotros"  text="Nosotros" />
                <FooterLink href="#galeria"   text="Galería" />
                <FooterLink href="#contacto"  text="Contacto" />
              </ul>
            </div>
          </div>

          {/* Columna 3 — Servicios */}
          <div className="flex flex-col items-center sm:items-start md:items-end">
            <div className="w-fit">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-6 text-center sm:text-left md:text-right m-0">Servicios</p>
              <ul className="space-y-4 list-none p-0">
                <FooterLink href="#services" text="Odontología General" align="md:justify-end" orange />
                <FooterLink href="#services" text="Ortodoncia"          align="md:justify-end" orange />
                <FooterLink href="#services" text="Estética Dental"     align="md:justify-end" orange />
                <FooterLink href="#services" text="Implantes Dentales"  align="md:justify-end" orange />
                <FooterLink href="#services" text="Blanqueamiento"      align="md:justify-end" orange />
              </ul>
            </div>
          </div>
        </div>

        {/* SECCIÓN INTERMEDIA: MAPA + CONTACTO */}
        <div className="grid grid-cols-1 lg:grid-cols-3 border-t border-white/10 pt-10 pb-8 gap-8 items-center">

          {/* Datos de contacto */}
          <div className="lg:col-span-1 space-y-8 order-2 lg:order-1">
            <ContactStripItem
              label="Dirección"
              text="José de Lama 785, Sullana 20103"
              subtext="Ver en Google Maps"
              link="https://www.google.com/maps/search/?api=1&query=Jose+de+Lama+785+Sullana+Piura"
            />
            <ContactStripItem
              label="Teléfono / WhatsApp"
              text="+51 926 226 443"
              subtext="Enviar mensaje"
              link="https://wa.me/51926226443"
            />
            <ContactStripItem
              label="Horario"
              text="Lun–Sáb · 8 a.m.–1 p.m. y 3–8 p.m."
              subtext="Domingo cerrado"
            />
          </div>

          {/* Mapa Interactivo */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="group relative h-64 md:h-80 w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl transition-all duration-500 hover:border-[#0099CC]/50">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.0!2d-80.6890!3d-4.9050!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zSm9zw6kgZGUgTGFtYSA3ODUsIFN1bGxhbmEgMjAxMDM!5e0!3m2!1ses-419!2spe!4v1711580000001!5m2!1ses-419!2spe"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación MIRUDENT Centro Odontológico"
                className="grayscale-[40%] brightness-[0.8] contrast-[1.2] group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
              ></iframe>
              <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10 rounded-2xl"></div>
            </div>
          </div>
        </div>

        {/* BARRA FINAL */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-[10px] md:text-xs text-center md:text-left">
            © 2026 MIRUDENT Centro Odontológico · Todos los derechos reservados. | José de Lama 785, Sullana, Piura.
          </p>
          <p className="text-white/20 text-[10px] text-center">
            Desarrollado con tecnología de vanguardia.
          </p>
        </div>

      </div>
    </footer>
  );
};

/* ─── Componentes Auxiliares ─── */

const SocialBtn = ({ Icon, href, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    aria-label={label}
    className="w-10 h-10 md:w-9 md:h-9 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:bg-[#0099CC] hover:border-[#0099CC] hover:text-white transition-all shadow-sm"
  >
    <Icon width={18} height={18} />
  </a>
);

const FooterLink = ({ href, text, align = 'justify-start', orange = false }) => (
  <li>
    <a href={href} className={`group flex items-center gap-2 text-sm text-white/75 hover:text-white transition-all ${align}`}>
      <IconArrowRight
        width={14} height={14}
        className={`opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 ${orange ? 'text-[#F28C28]' : 'text-[#0099CC]'}`}
      />
      <span className="group-hover:translate-x-1 transition-transform">{text}</span>
    </a>
  </li>
);

const ContactStripItem = ({ label, text, subtext, link }) => (
  <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left group">
    <span className="text-[10px] font-semibold uppercase tracking-widest text-[#0099CC]">{label}</span>
    {link ? (
      <a href={link} target="_blank" rel="noreferrer" className="flex flex-col">
        <span className="text-sm text-white/90 font-medium group-hover:text-white transition-colors">{text}</span>
        {subtext && (
          <span className="text-[10px] text-[#F28C28] font-bold underline decoration-dotted mt-1 uppercase">
            {subtext}
          </span>
        )}
      </a>
    ) : (
      <div className="flex flex-col">
        <span className="text-sm text-white/80 font-medium">{text}</span>
        {subtext && (
          <span className="text-[10px] text-white/40 mt-1 uppercase tracking-wide">{subtext}</span>
        )}
      </div>
    )}
  </div>
);

export default Footer;