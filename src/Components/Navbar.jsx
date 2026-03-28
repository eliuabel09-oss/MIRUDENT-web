import React, { useState, useEffect } from 'react';
import {
  IconTime, IconMapPin, IconPhone,
  IconWhatsapp, IconClose, IconMenu,
} from './Icons';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio',    href: '/'          },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Nosotros',  href: '#nosotros'  },
    { name: 'Galería',   href: '#galeria'   },
    { name: 'Contacto',  href: '#contacto'  },
  ];

  return (
    <>
      {/* ── FILA 1: Logo + info de contacto ── */}
      <div
        className="hidden md:block"
        style={{ background: '#ffffff', borderBottom: '1px solid #d0eaf7' }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-[72px]">

          {/* Logo */}
          <a href="/" className="flex items-center gap-3 no-underline flex-shrink-0">
            <div
              style={{ width: 54, height: 54, border: '2px solid #0099CC', background: '#e8f6fc', borderRadius: '50%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <img
                src="./assets/mirudent.webp"
                alt="MIRUDENT Logo"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                width="50" height="50"
                loading="eager"
                decoding="sync"
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 900, color: '#001E3C', letterSpacing: '-.01em' }}>
                MIRUDENT
              </span>
              <span style={{ fontSize: '9.5px', fontWeight: 700, textTransform: 'uppercase', color: '#0099CC', letterSpacing: '0.2em', marginTop: 3 }}>
                Centro Odontológico
              </span>
            </div>
          </a>

          {/* Info central */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(12px, 2.5vw, 36px)', flexWrap: 'nowrap' }}>
            <span className="hidden lg:flex" style={{ alignItems: 'center', gap: 7, color: '#475569', fontSize: '0.85rem', display: 'flex' }}>
              <IconMapPin width={15} height={15} />
              <span className="hidden xl:inline">José de Lama 785, Sullana</span>
              <span className="xl:hidden">Sullana</span>
            </span>
            <a
              href="https://wa.me/51926226443"
              target="_blank"
              rel="noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 7, color: '#475569', fontSize: '0.85rem', textDecoration: 'none' }}
            >
              <IconWhatsapp width={15} height={15} />
              +51 926 226 443
            </a>
            <span className="hidden lg:flex" style={{ alignItems: 'center', gap: 7, color: '#475569', fontSize: '0.85rem', display: 'flex' }}>
              <IconTime width={15} height={15} />
              <span className="hidden xl:inline">Lun – Sáb: 8:00am – 1:00pm y 3:00 – 8:00pm</span>
              <span className="xl:hidden">Lun–Sáb 8am–1pm / 3–8pm</span>
            </span>
          </div>

        </div>
      </div>

      {/* ── FILA 2: Nav links + CTA ── */}
      <nav
        className={`sticky top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white'
        }`}
        style={{ borderBottom: '1px solid #d0eaf7' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>

            {/* Logo móvil */}
            <a href="/" className="flex md:hidden items-center gap-2 no-underline">
              <div style={{ width: 40, height: 40, border: '2px solid #0099CC', background: '#e8f6fc', borderRadius: '50%', overflow: 'hidden' }}>
                <img src="./assets/mirudent.webp" alt="MIRUDENT" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="eager" />
              </div>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', fontWeight: 900, color: '#001E3C' }}>MIRUDENT</span>
            </a>

            {/* Links desktop */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="no-underline"
                  style={{ padding: '8px 18px', borderRadius: 8, fontSize: '0.9rem', fontWeight: 500, color: '#3a3a3a', transition: 'all .18s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#0099CC'; e.currentTarget.style.background = '#e8f6fc'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#3a3a3a'; e.currentTarget.style.background = 'transparent'; }}
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Botón WhatsApp pill — desktop */}
            <a
              href="https://wa.me/51926226443"
              target="_blank"
              rel="noreferrer"
              className="hidden md:flex items-center gap-2 no-underline"
              style={{
                background: '#001E3C',
                color: '#ffffff',
                padding: '11px 22px',
                borderRadius: 100,
                fontSize: '0.88rem',
                fontWeight: 600,
                transition: 'background .2s, transform .15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#0099CC'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#001E3C'; e.currentTarget.style.transform = 'none'; }}
            >
              <IconWhatsapp width={17} height={17} />
              +51 926 226 443
            </a>

            {/* Hamburguesa móvil */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg"
              style={{ color: '#001E3C' }}
              aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isOpen}
            >
              {isOpen ? <IconClose width={24} height={24} /> : <IconMenu width={24} height={24} />}
            </button>

          </div>
        </div>

        {/* Menú móvil */}
        <div
          className="md:hidden overflow-hidden transition-all duration-300 bg-white"
          style={{ maxHeight: isOpen ? '480px' : '0', borderTop: isOpen ? '1px solid #d0eaf7' : 'none' }}
        >
          <div className="px-5 pt-3 pb-6 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block no-underline"
                style={{ padding: '12px 14px', borderRadius: 12, fontSize: '1rem', fontWeight: 500, color: '#001E3C' }}
              >
                {link.name}
              </a>
            ))}
            <div style={{ paddingTop: 16 }}>
              <a
                href="https://wa.me/51926226443"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 no-underline"
                style={{ background: '#001E3C', color: '#ffffff', padding: '13px', borderRadius: 12, fontSize: '0.9rem', fontWeight: 600 }}
              >
                <IconWhatsapp width={18} height={18} />
                +51 926 226 443
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;