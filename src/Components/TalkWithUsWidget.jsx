import React, { useState, useEffect, useRef } from 'react';
import { IconClose, IconHeadset, IconRobot, IconMic, IconMicFill, IconChat, IconWhatsapp, IconSend } from './Icons';

const KB = {
  clinica: {
    nombre:    'MIRUDENT Centro Odontológico',
    direccion: 'José de Lama 785, Sullana 20103, Piura',
    telefono:  '+51 926 226 443',
    whatsapp:  'https://wa.me/51926226443',
    horario:   'Lunes a Sábado, 8 a.m.–1 p.m. y 3–8 p.m. Domingo cerrado.',
    email:     'mirudent@gmail.com',
  },

  equipo: [
    {
      nombre: 'Dr. Álvaro Villalta',
      rol: 'Director · Odontólogo General',
      cop: 'COP 12345',
      especialidad: 'Rehabilitación oral, estética dental e implantes. Fundador de la clínica con 5 años en Sullana.',
      keys: ['villalta', 'doctor', 'dr', 'director', 'quien atiende', 'quién atiende', 'medico', 'médico'],
    },
    {
      nombre: 'Dra. María Castro',
      rol: 'Ortodoncista',
      cop: 'COP 67890',
      especialidad: 'Ortodoncia y ortopedia maxilar. Experta en brackets estéticos y alineadores invisibles. 8 años de experiencia.',
      keys: ['castro', 'ortodoncista', 'ortodoncia especialista'],
    },
    {
      nombre: 'Dra. Laura Pérez',
      rol: 'Estética Dental',
      cop: 'COP 11223',
      especialidad: 'Diseño de sonrisa, carillas de porcelana y blanqueamiento profesional. 6 años de experiencia.',
      keys: ['pérez', 'perez', 'estetica especialista', 'diseño de sonrisa especialista'],
    },
  ],

  servicios: [
    {
      nombre: 'Odontología General',
      keys: ['general', 'limpieza', 'caries', 'revision', 'revisión', 'chequeo', 'extraccion', 'extracción', 'muela', 'dolor muela', 'empaste', 'fluorización'],
      descripcion: 'Revisiones periódicas, limpiezas profundas con ultrasonido, tratamiento de caries con resina del color del diente, extracciones y fluorización.',
      precio: 'Consulta desde S/ 40. Limpieza desde S/ 80.',
      duracion: '30–60 min según el tratamiento.',
      detalle: 'Recomendamos revisiones cada 6 meses como medida preventiva esencial.',
    },
    {
      nombre: 'Ortodoncia',
      keys: ['ortodoncia', 'brackets', 'frenos', 'invisalign', 'alineador', 'alineadores', 'dientes torcidos', 'mordida', 'bracket cerámica'],
      descripcion: 'Brackets metálicos y cerámicos para correcciones complejas. Alineadores invisibles removibles. Corrección de mordidas cruzadas, abiertas y profundas.',
      precio: 'Desde S/ 2,500 el tratamiento completo. Evaluación gratuita el primer mes.',
      duracion: '12 a 24 meses. Controles mensuales.',
      detalle: 'Cada tratamiento comienza con un diagnóstico digital y radiografías panorámicas. A cargo de la Dra. María Castro.',
    },
    {
      nombre: 'Estética Dental',
      keys: ['estetica', 'estética', 'carillas', 'diseño de sonrisa', 'diseño sonrisa', 'remodelado', 'bonding', 'resina estetica', 'smile design', 'porcelana'],
      descripcion: 'Diseño digital de sonrisa, carillas ultrafinas de porcelana, bonding estético y remodelado. Visualizamos tu sonrisa antes de comenzar.',
      precio: 'Carillas desde S/ 350 por unidad. Bonding desde S/ 120.',
      duracion: '1–2 sesiones según el caso.',
      detalle: 'Todos los tratamientos estéticos incluyen una sesión de planificación gratuita. A cargo de la Dra. Laura Pérez.',
    },
    {
      nombre: 'Blanqueamiento Dental',
      keys: ['blanqueamiento', 'blanquear', 'dientes amarillos', 'manchas', 'blanco', 'led', 'aclarar', 'aclaramiento'],
      descripcion: 'Blanqueamiento profesional LED en consultorio. Aclaramos hasta 8 tonos en una sola sesión, sin sensibilidad post-tratamiento.',
      precio: 'En consultorio S/ 250. Kit en casa S/ 130.',
      duracion: '60–90 min en consultorio. Una sola sesión.',
      detalle: 'No produce sensibilidad. El resultado es visible desde la primera sesión.',
    },
    {
      nombre: 'Implantes Dentales',
      keys: ['implante', 'implantes', 'pieza perdida', 'diente perdido', 'corona', 'prótesis', 'protesis', 'titanio'],
      descripcion: 'Implantes de titanio que reemplazan raíces y coronas perdidas. Resultado completamente natural y permanente.',
      precio: 'Desde S/ 2,200 por implante completo (titanio + corona).',
      duracion: '2–4 meses para el proceso completo.',
      detalle: 'La recuperación es rápida y el resultado es indistinguible de un diente natural.',
    },
    {
      nombre: 'Endodoncia',
      keys: ['endodoncia', 'nervio', 'pulpa', 'muela del juicio', 'canal', 'conducto', 'tratamiento de conducto'],
      descripcion: 'Tratamiento de conducto para eliminar infección interna y preservar el diente natural.',
      precio: 'Desde S/ 300 por pieza según complejidad.',
      duracion: '1–2 sesiones de 60–90 min.',
      detalle: 'Anestesia de alta calidad. No se siente absolutamente nada durante el procedimiento.',
    },
    {
      nombre: 'Periodoncia',
      keys: ['encia', 'encía', 'encias', 'encías', 'periodonto', 'sangrado', 'movilidad dental', 'piorrea', 'curetaje'],
      descripcion: 'Tratamiento de enfermedades de las encías: curetaje, raspado radicular y cirugía periodontal.',
      precio: 'Evaluación periodontal S/ 50. Curetaje desde S/ 150.',
      duracion: 'Varía según diagnóstico.',
      detalle: 'Las encías sanas son la base de cualquier tratamiento estético o restaurador.',
    },
  ],

  faq: [
    {
      keys: ['duele', 'dolor intenso', 'me duele mucho', 'dolor fuerte', 'hinchazón', 'inflamado'],
      urgencia: true,
      respuesta: 'Si tienes dolor dental intenso o hinchazón, puede ser una urgencia. Llama ahora al **+51 926 226 443** o escríbenos por WhatsApp para atención prioritaria.',
    },
    {
      keys: ['emergencia', 'urgencia', 'urgente', 'diente roto', 'diente fracturado', 'golpe', 'accidente', 'absceso'],
      urgencia: true,
      respuesta: 'Eso suena a una emergencia dental. Llama de inmediato al **+51 926 226 443**. Si hay hinchazón facial intensa, acude también a urgencias médicas.',
    },
    {
      keys: ['precio', 'cuanto', 'cuánto', 'costo', 'cuesta', 'tarifa', 'valor', 'cobran', 'precios'],
      respuesta: 'Nuestros precios según tratamiento:\n• Consulta general: desde S/ 40\n• Limpieza profunda: desde S/ 80\n• Blanqueamiento LED: S/ 250 consultorio / S/ 130 en casa\n• Estética y carillas: desde S/ 120\n• Ortodoncia completa: desde S/ 2,500\n• Implantes: desde S/ 2,200\n• Endodoncia: desde S/ 300\n\n¿Te interesa saber el precio de algún tratamiento en específico?',
    },
    {
      keys: ['ubicacion', 'ubicación', 'donde', 'dónde', 'direccion', 'dirección', 'como llegar', 'llegar', 'queda', 'están'],
      respuesta: 'Estamos en **José de Lama 785, Sullana 20103, Piura**. Escríbenos al WhatsApp y te enviamos la ubicación exacta en Google Maps.',
    },
    {
      keys: ['horario', 'hora', 'abren', 'cierran', 'atienden', 'disponible', 'cuando atienden'],
      respuesta: 'Atendemos de **Lunes a Sábado**, de **8 a.m. a 1 p.m. y de 3 a 8 p.m.** Los domingos permanecemos cerrados. Escríbenos y coordinamos el horario que mejor te convenga.',
    },
    {
      keys: ['telefono', 'teléfono', 'numero', 'número', 'whatsapp', 'llamar', 'contacto', 'comunicar', 'escribir'],
      respuesta: 'Puedes contactarnos por:\n• **WhatsApp / Teléfono:** +51 926 226 443\n\nRespondemos en menos de una hora en horario de atención.',
    },
    {
      keys: ['seguros', 'seguro', 'cobertura', 'eps', 'essalud'],
      respuesta: 'Por el momento no trabajamos con EPS directamente. Puedes solicitar una boleta para reembolso con tu aseguradora. ¿Necesitas más información?',
    },
    {
      keys: ['niños', 'niño', 'bebe', 'bebé', 'infantil', 'hijo', 'pequeño', 'edad minima', 'odontopediatría'],
      respuesta: 'Sí atendemos niños con mucha paciencia. La primera visita se recomienda cuando aparece el primer diente. ¿Cuántos años tiene el niño?',
    },
    {
      keys: ['pago', 'tarjeta', 'efectivo', 'transferencia', 'yape', 'plin', 'cuotas', 'financiamiento'],
      respuesta: 'Aceptamos todas las tarjetas de crédito y débito, efectivo, Yape y Plin. En tratamientos largos ofrecemos facilidades de pago. Nuestros presupuestos son transparentes, sin costos ocultos.',
    },
    {
      keys: ['primera vez', 'primera visita', 'que llevar', 'qué llevar', 'documentos', 'preparacion', 'preparación'],
      respuesta: 'Solo necesitas tu **DNI** y, si las tienes, radiografías recientes. Nosotros nos encargamos del diagnóstico completo desde el primer día.',
    },
    {
      keys: ['cuanto tiempo', 'cuánto tiempo', 'demora', 'dura', 'tarda'],
      respuesta: 'Depende del tratamiento:\n• Revisión general: 30 min\n• Limpieza: 45–60 min\n• Blanqueamiento LED: 60–90 min\n• Ortodoncia: 12–24 meses con controles mensuales\n• Implantes: 2–4 meses proceso completo\n\n¿De qué tratamiento quieres saber más?',
    },
    {
      keys: ['diferencia', 'que los hace diferentes', 'por que elegirlos', 'por qué elegirlos', 'mejor', 'confiable'],
      respuesta: 'En MIRUDENT combinamos tecnología digital con odontología mínimamente invasiva. Cada tratamiento es diseñado para tu comodidad y con resultados duraderos. Contamos con 3 especialistas certificados con COP registrado, atendiendo en Sullana.',
    },
  ],

  saludos:    ['hola', 'buenas', 'buenos días', 'buenos dias', 'buenas tardes', 'buenas noches', 'hey', 'ola', 'saludos', 'buen día'],
  despedidas: ['gracias', 'hasta luego', 'chau', 'adiós', 'adios', 'bye', 'nos vemos', 'listo', 'ok gracias', 'muchas gracias', 'hasta pronto'],
};

const normalize = (str) =>
  str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const detectIntent = (input) => {
  const t = normalize(input);
  for (const faq of KB.faq) {
    if (faq.urgencia && faq.keys.some(k => t.includes(normalize(k)))) return { type: 'faq', data: faq };
  }
  for (const doc of KB.equipo) {
    if (doc.keys.some(k => t.includes(normalize(k)))) return { type: 'equipo', data: doc };
  }
  if (KB.saludos.some(s => t.includes(normalize(s))))    return { type: 'saludo' };
  if (KB.despedidas.some(d => t.includes(normalize(d)))) return { type: 'despedida' };
  for (const srv of KB.servicios) {
    if (srv.keys.some(k => t.includes(normalize(k)))) return { type: 'servicio', data: srv };
  }
  for (const faq of KB.faq) {
    if (faq.keys.some(k => t.includes(normalize(k)))) return { type: 'faq', data: faq };
  }
  if (['cita', 'agendar', 'reservar', 'turno', 'quiero ir', 'quiero atenderme', 'cuando puedo', 'consulta'].some(k => t.includes(k))) {
    return { type: 'agendar' };
  }
  return { type: 'desconocido' };
};

const generateResponse = (input, step, userData) => {
  if (step === 'collecting_name') {
    const nombre = input.trim().split(' ')[0];
    return {
      text: `Mucho gusto, **${nombre}**. ¿A qué número de WhatsApp o teléfono podemos contactarte?`,
      nextStep: 'collecting_phone',
      updatedData: { name: input.trim() },
    };
  }
  if (step === 'collecting_phone') {
    return {
      text: `Perfecto. He registrado tus datos:\n• **Nombre:** ${userData.name}\n• **Teléfono:** ${input}\n\nUn miembro del equipo de MIRUDENT te escribirá pronto para confirmar tu cita. ¡Hasta pronto!`,
      nextStep: 'finished',
      updatedData: { phone: input.trim() },
    };
  }
  if (step === 'awaiting_confirmation') {
    const t = normalize(input);
    if (['si', 'sí', 'claro', 'ok', 'dale', 'bueno', 'quiero', 'yes', 'por favor', 'adelante', 'obvio', 'seguro'].some(k => t.includes(k))) {
      return { text: 'Perfecto. ¿Cuál es tu nombre completo?', nextStep: 'collecting_name' };
    }
    return {
      text: 'Entendido, no hay problema. Si en algún momento quieres agendar o tienes alguna pregunta, aquí estaré. También puedes escribirnos directamente al **+51 926 226 443**.',
      nextStep: 'idle',
    };
  }

  const intent = detectIntent(input);

  switch (intent.type) {
    case 'saludo':
      return {
        text: 'Hola, bienvenido a **MIRUDENT Centro Odontológico**. Soy el asistente virtual de la clínica. Puedo ayudarte con información sobre servicios, precios, horarios, nuestro equipo o agendar una cita. ¿En qué te puedo ayudar?',
        nextStep: 'idle',
      };
    case 'despedida':
      return {
        text: 'Fue un placer atenderte. Recuerda que puedes escribirnos cuando quieras al **+51 926 226 443**. ¡Hasta pronto!',
        nextStep: 'idle',
      };
    case 'equipo': {
      const d = intent.data;
      return {
        text: `**${d.nombre}** — ${d.rol}\n\n${d.especialidad}\n\n**Colegiatura:** ${d.cop}\n\n¿Te gustaría agendar una consulta con ${d.nombre.split(' ')[0]}?`,
        nextStep: 'awaiting_confirmation',
      };
    }
    case 'servicio': {
      const s = intent.data;
      return {
        text: `**${s.nombre}**\n\n${s.descripcion}\n\n**Precio:** ${s.precio}\n**Duración:** ${s.duracion}\n\n${s.detalle}\n\n¿Te gustaría agendar una consulta?`,
        nextStep: 'awaiting_confirmation',
      };
    }
    case 'faq':
      return { text: intent.data.respuesta, nextStep: 'idle' };
    case 'agendar':
      return {
        text: 'Con gusto te ayudo a agendar. Atendemos de **Lunes a Sábado**, de **8 a.m. a 1 p.m. y de 3 a 8 p.m.** ¿Te gustaría que coordinemos tu visita ahora?',
        nextStep: 'awaiting_confirmation',
      };
    default:
      return {
        text: 'Puedo ayudarte con información sobre nuestros **servicios**, **precios**, **equipo médico**, **horarios** o **agendar una cita**. También puedes llamarnos directamente al **+51 926 226 443**. ¿Qué necesitas?',
        nextStep: 'idle',
      };
  }
};

const RichText = ({ text }) => (
  <>
    {text.split('\n').map((line, i, arr) => {
      const segs = line.split(/\*\*(.+?)\*\*/g);
      return (
        <span key={i}>
          {segs.map((seg, j) =>
            j % 2 === 1
              ? <strong key={j} style={{ fontWeight: 700 }}>{seg}</strong>
              : seg
          )}
          {i < arr.length - 1 && <br />}
        </span>
      );
    })}
  </>
);

const QUICK_CHIPS = [
  { label: 'Servicios',      text: 'Hola, ¿qué servicios ofrecen?' },
  { label: 'Precios',        text: '¿Cuánto cuestan los tratamientos?' },
  { label: 'Agendar cita',   text: 'Quiero agendar una cita' },
  { label: 'Nuestro equipo', text: '¿Quiénes son los doctores?' },
  { label: 'Ubicación',      text: '¿Dónde están ubicados?' },
  { label: 'Es urgente',     text: 'Tengo dolor dental urgente' },
];

const TalkWithUsWidget = () => {
  const [isOpen, setIsOpen]           = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages]       = useState([]);
  const [inputValue, setInputValue]   = useState('');
  const [isTyping, setIsTyping]       = useState(false);
  const [step, setStep]               = useState('idle');
  const [userData, setUserData]       = useState({ name: '', phone: '' });
  const [showChips, setShowChips]     = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        setMessages([{
          text: 'Hola, bienvenido a **MIRUDENT Centro Odontológico**. Soy tu asistente virtual. Puedo ayudarte con servicios, precios, nuestro equipo o agendar una cita. ¿En qué puedo ayudarte hoy?',
          sender: 'ai',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }]);
      }, 400);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isTyping, isVoiceMode]);

  const speak = (text) => {
    const clean = text.replace(/\*\*/g, '').replace(/\n•/g, ',');
    const msg = new SpeechSynthesisUtterance(clean);
    msg.lang = 'es-PE';
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(msg);
  };

  const handleSend = (text) => {
    if (!text.trim()) return;
    setShowChips(false);
    setMessages(prev => [...prev, {
      text, sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }]);
    setInputValue('');
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const { text: resText, nextStep, updatedData } = generateResponse(text, step, userData);
      if (updatedData) setUserData(prev => ({ ...prev, ...updatedData }));
      setStep(nextStep || 'idle');
      const aiMsg = {
        text: resText, sender: 'ai',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, aiMsg]);
      if (isVoiceMode) speak(resText);
    }, 700 + Math.random() * 400);
  };

  const toggleVoice = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Tu navegador no es compatible con reconocimiento de voz.');
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'es-PE';
    recognition.continuous = false;
    recognition.interimResults = false;
    if (!isListening) {
      setIsListening(true);
      recognition.start();
      recognition.onresult = (e) => { setIsListening(false); handleSend(e.results[0][0].transcript); };
      recognition.onerror  = () => setIsListening(false);
      recognition.onend    = () => setIsListening(false);
    } else {
      recognition.stop();
      setIsListening(false);
    }
  };

  const S = {
    btn: (open) => ({
      width: 56, height: 56, borderRadius: '50%',
      border: 'none', cursor: 'pointer',
      background: open ? '#002B4E' : '#f97316',
      boxShadow: '0 8px 32px rgba(0,0,0,0.22)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      transition: 'background .25s, transform .2s',
      transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
      position: 'relative',
    }),
    window: {
      position: 'absolute', bottom: 68, right: 0,
      width: 'min(380px, calc(100vw - 2rem))',
      height: 'min(560px, 70vh)',
      borderRadius: 20,
      background: '#fff',
      boxShadow: '0 24px 80px rgba(0,0,0,0.18)',
      border: '1px solid rgba(0,0,0,0.06)',
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
      animation: 'chatIn .25s ease',
    },
    header: {
      background: '#0f172a',
      padding: '14px 18px',
      display: 'flex', alignItems: 'center', gap: 12,
      flexShrink: 0,
    },
    iconBtn: (active) => ({
      width: 32, height: 32, borderRadius: 8, border: 'none',
      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: active ? '#f97316' : 'rgba(255,255,255,0.08)',
      color: active ? '#fff' : 'rgba(255,255,255,0.5)',
      transition: 'background .2s, color .2s',
    }),
    chip: {
      padding: '5px 11px', borderRadius: 20,
      border: '1px solid #e2e8f0', background: '#fff',
      color: '#334155', fontSize: '0.71rem', fontWeight: 500,
      cursor: 'pointer', transition: 'all .15s',
      fontFamily: "'Inter', sans-serif",
    },
  };

  return (
    <div style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 100, fontFamily: "'Inter', sans-serif" }}>

      <button onClick={() => setIsOpen(o => !o)} aria-label="Abrir chat" style={S.btn(isOpen)}>
        {isOpen
          ? <IconClose width={24} height={24} style={{ color: '#fff' }} />
          : <>
              <IconHeadset width={24} height={24} style={{ color: '#fff' }} />
              <span style={{
                position: 'absolute', top: 2, right: 2,
                width: 12, height: 12, borderRadius: '50%',
                background: '#0099CC', border: '2px solid #f97316',
              }} />
            </>
        }
      </button>

      {isOpen && (
        <div style={S.window}>
          <div style={S.header}>
            <div style={{
              width: 38, height: 38, borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <IconRobot width={19} height={19} style={{ color: '#0099CC' }} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, color: '#fff', fontWeight: 700, fontSize: '0.86rem', fontFamily: "'Montserrat', sans-serif" }}>Asistente MIRUDENT</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 5px #4ade80' }} />
                <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>En línea</span>
              </div>
            </div>
            <button onClick={() => setIsVoiceMode(v => !v)} style={S.iconBtn(isVoiceMode)} title={isVoiceMode ? 'Cambiar a texto' : 'Cambiar a voz'}>
              {isVoiceMode ? <IconMicFill width={15} height={15} /> : <IconChat width={15} height={15} />}
            </button>
            <a href="https://wa.me/51926226443" target="_blank" rel="noreferrer"
              style={{ ...S.iconBtn(false), color: '#4ade80', textDecoration: 'none' }} title="Abrir WhatsApp">
              <IconWhatsapp width={16} height={16} />
            </a>
          </div>

          {isVoiceMode ? (
            <div style={{
              flex: 1, background: '#f8fafc',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              padding: '2rem 1.5rem', textAlign: 'center', gap: 20,
            }}>
              <div style={{
                width: 88, height: 88, borderRadius: '50%',
                background: isListening ? '#f97316' : '#e2e8f0',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background .3s, transform .3s',
                transform: isListening ? 'scale(1.1)' : 'scale(1)',
                boxShadow: isListening ? '0 0 0 12px rgba(249,115,22,0.15)' : 'none',
              }}>
                <IconMic width={34} height={34} style={{ color: isListening ? '#fff' : '#94a3b8', transition: 'color .3s' }} />
              </div>
              <div>
                <p style={{ margin: 0, fontWeight: 700, color: '#0f172a', fontSize: '0.95rem' }}>
                  {isListening ? 'Escuchando...' : '¿En qué puedo ayudarte?'}
                </p>
                <p style={{ margin: '6px 0 0', fontSize: '0.75rem', color: '#94a3b8', lineHeight: 1.6 }}>
                  Prueba diciendo: "Hola", "¿cuánto cuesta la limpieza?" o "Quiero agendar una cita".
                </p>
              </div>
              <button onClick={toggleVoice} style={{
                padding: '10px 28px', borderRadius: 12,
                background: isListening ? '#0f172a' : '#f97316',
                color: '#fff', border: 'none', cursor: 'pointer',
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '0.78rem', fontWeight: 800,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                transition: 'background .2s',
              }}>
                {isListening ? 'Detener' : 'Hablar ahora'}
              </button>
              {messages.length > 0 && (
                <div style={{
                  width: '100%', padding: '12px 16px',
                  background: '#fff', borderRadius: 12,
                  border: '1px solid #e2e8f0',
                  fontSize: '0.78rem', color: '#475569', lineHeight: 1.6,
                  textAlign: 'left', maxHeight: 90, overflow: 'hidden',
                }}>
                  <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#0099CC', display: 'block', marginBottom: 4 }}>
                    Última respuesta
                  </span>
                  <RichText text={messages[messages.length - 1].text.slice(0, 120) + (messages[messages.length - 1].text.length > 120 ? '…' : '')} />
                </div>
              )}
            </div>
          ) : (
            <>
              <div ref={scrollRef} style={{
                flex: 1, overflowY: 'auto',
                padding: '14px 12px',
                background: '#f8fafc',
                display: 'flex', flexDirection: 'column', gap: 10,
              }}>
                {messages.map((msg, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    animation: 'msgIn .2s ease',
                  }}>
                    <div style={{
                      maxWidth: '86%',
                      padding: '10px 13px',
                      borderRadius: msg.sender === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                      background: msg.sender === 'user' ? '#0099CC' : '#fff',
                      color: msg.sender === 'user' ? '#fff' : '#1e293b',
                      fontSize: '0.82rem', lineHeight: 1.65,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                      border: msg.sender === 'ai' ? '1px solid rgba(0,0,0,0.06)' : 'none',
                    }}>
                      <RichText text={msg.text} />
                      <span style={{ display: 'block', marginTop: 4, fontSize: '0.68rem', opacity: 0.6, textAlign: 'right', letterSpacing: '0.04em' }}>
                        {msg.time}
                      </span>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <div style={{
                      padding: '10px 14px', borderRadius: '16px 16px 16px 4px',
                      background: '#fff', border: '1px solid rgba(0,0,0,0.06)',
                      display: 'flex', gap: 5, alignItems: 'center',
                    }}>
                      {[0, 1, 2].map(n => (
                        <span key={n} style={{
                          width: 7, height: 7, borderRadius: '50%', background: '#cbd5e1',
                          display: 'inline-block',
                          animation: `bounce .9s ease ${n * 0.18}s infinite`,
                        }} />
                      ))}
                    </div>
                  </div>
                )}

                {showChips && messages.length > 0 && !isTyping && (
                  <div style={{ marginTop: 4, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {QUICK_CHIPS.map(chip => (
                      <button key={chip.label} onClick={() => handleSend(chip.text)} style={S.chip}
                        onMouseEnter={e => { e.currentTarget.style.background = '#e0f4fb'; e.currentTarget.style.borderColor = '#0099CC'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = '#e2e8f0'; }}>
                        {chip.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div style={{
                padding: '10px 12px', background: '#fff',
                borderTop: '1px solid #f1f5f9',
                display: 'flex', gap: 8, flexShrink: 0,
              }}>
                <input
                  type="text"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(inputValue); } }}
                  placeholder="Escribe tu mensaje..."
                  style={{
                    flex: 1, background: '#f8fafc',
                    border: '1.5px solid #e2e8f0', borderRadius: 12,
                    padding: '10px 13px', fontSize: '0.84rem', color: '#1e293b',
                    outline: 'none', fontFamily: "'Inter', sans-serif",
                    transition: 'border-color .2s',
                  }}
                  onFocus={e => e.target.style.borderColor = '#0099CC'}
                  onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                />
                <button onClick={toggleVoice} title="Hablar" style={{
                  width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                  background: isListening ? '#f97316' : '#f1f5f9',
                  border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background .2s',
                }}>
                  <IconMic width={17} height={17} style={{ color: isListening ? '#fff' : '#64748b' }} />
                </button>
                <button onClick={() => handleSend(inputValue)} disabled={!inputValue.trim()} style={{
                  width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                  background: inputValue.trim() ? '#0099CC' : '#e2e8f0',
                  border: 'none', cursor: inputValue.trim() ? 'pointer' : 'default',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background .2s, transform .15s',
                }}
                  onMouseEnter={e => { if (inputValue.trim()) e.currentTarget.style.transform = 'scale(1.06)'; }}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                  <IconSend width={17} height={17} style={{ color: inputValue.trim() ? '#fff' : '#94a3b8' }} />
                </button>
              </div>
            </>
          )}
        </div>
      )}

      <style>{`
        @keyframes chatIn { from{opacity:0;transform:translateY(12px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes msgIn  { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
      `}</style>
    </div>
  );
};

export default TalkWithUsWidget;