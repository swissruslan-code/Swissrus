import { useState } from "react";

const PILARES = [
  {
    num: "1",
    color: "#c0392b",
    nombre: "Pensión pública básica",
    siglas: "AHV / AVS",
    descripcion: "La pensión del Estado. Cubre las necesidades básicas en la jubilación. Todo el mundo que trabaja en Suiza cotiza obligatoriamente.",
    puntos: [
      "Se cotiza obligatoriamente desde los 20 años si trabajas, desde los 21 si no trabajas pero vives en Suiza",
      "La cotización es el 8,7% del salario bruto — mitad el empleado, mitad la empresa",
      "Para cobrar la pensión máxima necesitas haber cotizado 44 años completos",
      "Si has cotizado menos, recibes una pensión proporcional a los años cotizados",
      "Si cotizaste al menos 1 año, Suiza te pagará tu parte al jubilarte, aunque ya estés en España",
      "España y Suiza tienen un convenio bilateral: los años cotizados en España se suman para cumplir el mínimo, pero cada país paga su parte",
    ],
    nota: "Si cotizaste menos de 1 año en Suiza, ese tiempo se suma a España pero Suiza no te paga pensión propia. Si cotizaste más de 1 año, Suiza te pagará una pensión proporcional aunque vivas en España.",
  },
  {
    num: "2",
    color: "#e67e22",
    nombre: "Previsión profesional",
    siglas: "BVG / LPP",
    descripcion: "El fondo de pensiones de empresa. Es obligatorio si ganas más de 22.050 CHF al año. Es el pilar más importante para los españoles que vuelven — y el que más dinero puedes recuperar.",
    puntos: [
      "Obligatorio para empleados que ganan más de 22.050 CHF/año (umbral de entrada 2025)",
      "Hasta los 24 años solo cubre invalidez y fallecimiento, no jubilación",
      "A partir de los 25 años cotizas también para la jubilación",
      "Tanto empleado como empresa cotizen — el porcentaje varía según tu edad (entre 3,5% y 9% cada uno)",
      "El dinero acumulado es tuyo — puedes recuperarlo si vuelves a España, con condiciones",
      "También puedes usarlo antes de jubilarte — pero solo en estos casos concretos:",
      "→ Para comprar o construir tu vivienda principal en Suiza",
      "→ Para amortizar la hipoteca de tu vivienda principal",
      "→ Para participar en una cooperativa de construcción de viviendas",
      "→ Si te haces autónomo en Suiza",
    ],
    nota: "Este es el pilar que más preguntas genera entre los españoles. Hay mucho dinero acumulado que se pierde por no hacer los trámites correctos al volver.",
  },
  {
    num: "3",
    color: "#27ae60",
    nombre: "Ahorro privado",
    siglas: "Pilar 3a y 3b",
    descripcion: "El ahorro voluntario individual. No es obligatorio, pero tiene ventajas fiscales importantes. Tú decides si lo contratas y cuánto aportas.",
    puntos: [
      "Pilar 3a: cuenta de ahorro vinculada, con ventajas fiscales — lo que aportas se deduce de tu declaración de la renta",
      "Pilar 3b: ahorro libre sin condiciones especiales — puedes retirarlo cuando quieras",
      "El límite de aportación al 3a en 2025 es de 7.258 CHF/año si tienes contrato laboral",
      "Solo puedes retirar el 3a en casos concretos: jubilación, compra o construcción de vivienda principal, salida definitiva de Suiza, hacerse autónomo, recompra de años del 2.º pilar, o invalidez total",
      "El 3b puede retirarse en cualquier momento sin condiciones",
    ],
    nota: "El pilar 3a es muy popular entre trabajadores suizos porque reduce directamente la base imponible. Si tienes intención de quedarte varios años en Suiza, vale la pena estudiarlo.",
  },
];

const RECUPERAR_PASOS = [
  {
    n: "01", color: "#c0392b",
    titulo: "Darte de baja en el ayuntamiento antes de irte",
    desc: "Antes de salir de Suiza tienes que darte de baja oficialmente en el ayuntamiento donde vives. Sin este paso, el proceso no puede empezar. Guarda el justificante de baja.",
  },
  {
    n: "02", color: "#e67e22",
    titulo: "Contactar con tu caja de pensiones (Pensionskasse)",
    desc: "Informa a la institución donde has cotizado de que vas a abandonar Suiza definitivamente. Ellos te darán un formulario de solicitud de prestación de salida.",
  },
  {
    n: "03", color: "#f39c12",
    titulo: "Presentar solicitud al Fondo de Garantía BVG",
    desc: "El Fondo de Garantía consulta a la Seguridad Social española si estás cotizando o no en España. Esto es clave: si estás trabajando en España y cotizando, no puedes retirar la parte obligatoria del 2.º pilar.",
  },
  {
    n: "04", color: "#27ae60",
    titulo: "Resultado de la consulta",
    desc: "Si NO estás cotizando a la Seguridad Social española, puedes retirar todo el capital. Si SÍ estás cotizando, la parte obligatoria se queda en una cuenta de libre paso en Suiza hasta tu jubilación. La parte sobre-obligatoria sí puedes retirarla.",
  },
  {
    n: "05", color: "#2980b9",
    titulo: "Cobro del capital",
    desc: "Si puedes cobrar, el dinero llega a tu cuenta bancaria. Ojo: tributa en España como rendimiento de capital. Guarda todos los documentos para la declaración de la renta.",
  },
];

const FAQS = [
  {
    q: "¿Puedo recuperar el 2.º pilar si vuelvo a España a trabajar?",
    a: "Depende. Si al volver a España empiezas a trabajar y cotizas a la Seguridad Social española, no puedes retirar la parte obligatoria del 2.º pilar — se queda bloqueada en una cuenta de libre paso en Suiza hasta tu jubilación. La parte sobre-obligatoria (las aportaciones voluntarias extra) sí puedes recuperarla. Si vuelves a España pero NO trabajas ni cotizas, sí puedes retirar todo.",
  },
  {
    q: "¿Qué es la cuenta de libre paso?",
    a: "Cuando cambias de trabajo o dejas de trabajar en Suiza, el dinero del 2.º pilar pasa a una cuenta de libre paso (Freizügigkeitskonto) en un banco suizo. Allí sigue acumulando intereses y espera a que puedas recuperarlo o lo uses para la jubilación. Si no sabes si tienes dinero en alguna cuenta de este tipo, puedes consultarlo en la Central del 2.º Pilar (Zentralstelle 2. Säule).",
  },
  {
    q: "¿Cuánto dinero puedo recuperar del 2.º pilar?",
    a: "Depende de cuánto hayas cotizado y durante cuánto tiempo. Como referencia, alguien que ha trabajado 4 años en hostelería con un sueldo de 3.500 CHF/mes puede acumular entre 10.000 y 20.000 CHF. En sectores mejor pagados o con más años de cotización, la cifra puede ser mucho mayor.",
  },
  {
    q: "¿El dinero del 2.º pilar tributa en España?",
    a: "Sí. Si lo cobras en capital (de golpe), tributa en España como rendimiento de capital con un tipo especial. Si lo cobras como renta mensual al jubilarte, tributa como pensión. Es recomendable consultar con un asesor fiscal antes de decidir cómo cobrarlo.",
  },
  {
    q: "¿Qué pasa si no sé dónde está mi 2.º pilar?",
    a: "Es más común de lo que parece. Si has cambiado de trabajo varias veces, el dinero puede estar repartido entre varias cajas o cuentas de libre paso. Puedes localizar todos tus haberes en la Central del 2.º Pilar en Suiza (Zentralstelle 2. Säule) de forma gratuita.",
  },
  {
    q: "¿Puedo cobrar la pensión suiza del 1.er pilar viviendo en España?",
    a: "Sí. Al llegar a la edad de jubilación, solicitas tu pensión AHV/AVS a la oficina de compensación suiza correspondiente. Suiza te la paga directamente en tu cuenta bancaria española, en francos o en euros según tu preferencia. Tributa en España como pensión pública extranjera.",
  },
];

export default function Pensiones() {
  const [pilarActivo, setPilarActivo] = useState("1");
  const [faqAbierta, setFaqAbierta] = useState(null);
  const pilar = PILARES.find(p => p.num === pilarActivo);

  const s = {
    page: { fontFamily: "'Segoe UI', Arial, sans-serif", background: "#faf9f7", minHeight: "100vh" },

    hero: { background: "linear-gradient(135deg, #0d1b2a 0%, #1a1a2e 100%)", color: "white", padding: "5rem 2rem 4rem" },
    heroInner: { maxWidth: 960, margin: "0 auto" },
    eyebrow: { fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#e67e22", marginBottom: 12 },
    heroTitle: { fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: 16 },
    heroEm: { color: "#e67e22", fontStyle: "italic" },
    heroSub: { fontSize: 16, color: "#aaa", lineHeight: 1.7, maxWidth: 600, fontWeight: 300 },
    heroStats: { display: "flex", gap: 32, marginTop: 32, flexWrap: "wrap" },
    stat: { borderLeft: "3px solid #e67e22", paddingLeft: 16 },
    statNum: { fontFamily: "Georgia, serif", fontSize: 24, fontWeight: 900, color: "white", lineHeight: 1 },
    statLabel: { fontSize: 11, color: "#888", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 4 },

    section: { maxWidth: 960, margin: "0 auto", padding: "4rem 2rem" },
    secEyebrow: { fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#e67e22", marginBottom: 8 },
    secTitle: { fontFamily: "Georgia, serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 900, marginBottom: 8, color: "#111" },
    secEm: { color: "#e67e22", fontStyle: "italic" },
    secSub: { fontSize: 14, color: "#888", marginBottom: 28, lineHeight: 1.6 },

    pilarTabs: { display: "flex", gap: 0, marginBottom: 0, border: "1px solid #e8e8e8", borderRadius: "4px 4px 0 0", overflow: "hidden" },
    pilarTab: (active, color) => ({
      flex: 1, padding: "1rem", textAlign: "center", cursor: "pointer", border: "none",
      background: active ? color : "white",
      color: active ? "white" : "#555",
      fontWeight: active ? 800 : 400,
      fontSize: 14, transition: "all 0.15s",
      borderRight: "1px solid #e8e8e8",
    }),
    pilarCard: (color) => ({
      background: "white", border: `1px solid #e8e8e8`, borderTop: `3px solid ${color}`,
      borderRadius: "0 0 4px 4px", padding: "2rem", marginBottom: 0,
    }),
    pilarHeader: { display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 20 },
    pilarNum: (color) => ({
      width: 48, height: 48, borderRadius: 2, background: color, color: "white",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 900, flexShrink: 0,
    }),
    pilarNombre: { fontFamily: "Georgia, serif", fontSize: 18, fontWeight: 900, color: "#111", marginBottom: 2 },
    pilarSiglas: (color) => ({ fontSize: 12, fontWeight: 700, color, textTransform: "uppercase", letterSpacing: "0.06em" }),
    pilarDesc: { fontSize: 14, color: "#666", lineHeight: 1.6, marginBottom: 20 },
    pilarPuntos: { marginBottom: 20 },
    pilarPunto: { display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" },
    pilarFlecha: (color) => ({ color, fontWeight: 700, flexShrink: 0, marginTop: 1, fontSize: 14 }),
    pilarPuntoTexto: { fontSize: 14, color: "#444", lineHeight: 1.5 },
    pilarNota: (color) => ({
      background: "#fafafa", border: `1px solid ${color}30`,
      borderLeft: `3px solid ${color}`, padding: "12px 16px",
      fontSize: 13, color: "#555", lineHeight: 1.6,
    }),

    white: { background: "white", borderTop: "1px solid #eee", borderBottom: "1px solid #eee" },

    pasosList: { listStyle: "none", padding: 0, margin: 0 },
    paso: { display: "flex", gap: 16, marginBottom: 0, alignItems: "stretch" },
    pasoLeft: { display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 },
    pasoNum: (c) => ({ width: 36, height: 36, borderRadius: 2, background: c, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, flexShrink: 0 }),
    pasoLinea: { width: 1, flex: 1, background: "#e8e8e8", margin: "4px 0" },
    pasoBody: { paddingBottom: 24, paddingTop: 6 },
    pasoTitulo: { fontSize: 15, fontWeight: 800, color: "#111", marginBottom: 4 },
    pasoDesc: { fontSize: 13, color: "#666", lineHeight: 1.6 },

    alertaVerde: { background: "#f0faf5", border: "1px solid #27ae6030", padding: "16px 20px", borderRadius: 4, marginTop: 24, fontSize: 14, color: "#555", lineHeight: 1.7 },
    alertaRoja: { background: "#fdf3f2", border: "1px solid rgba(192,57,43,0.2)", padding: "16px 20px", borderRadius: 4, marginTop: 12, fontSize: 14, color: "#c0392b", lineHeight: 1.7 },

    faqItem: { background: "white", border: "1px solid #e8e8e8", marginBottom: 8, borderRadius: 4, overflow: "hidden" },
    faqQ: (open) => ({ padding: "1rem 1.5rem", fontSize: 14, fontWeight: 700, color: "#111", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", background: open ? "#f8f8f8" : "white" }),
    faqA: { padding: "0 1.5rem 1rem", fontSize: 14, color: "#555", lineHeight: 1.7 },

    dark: { background: "#111", color: "white", padding: "3rem 2rem" },
    darkInner: { maxWidth: 960, margin: "0 auto", display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" },
    darkTitle: { fontSize: 16, fontWeight: 800, marginBottom: 8 },
    darkText: { fontSize: 14, color: "#aaa", lineHeight: 1.7, maxWidth: 640 },
  };

  return (
    <div style={s.page}>

      {/* HERO */}
      <div style={s.hero}>
        <div style={s.heroInner}>
          <div style={s.eyebrow}>Pensiones · Swissrus 2025–2026</div>
          <h1 style={s.heroTitle}>Los 3 pilares de la <em style={s.heroEm}>jubilación</em></h1>
          <p style={s.heroSub}>
            El sistema de pensiones suizo funciona de forma muy distinta al español. Entenderlo bien puede suponer miles de francos más en tu bolsillo cuando vuelvas.
          </p>
          <div style={s.heroStats}>
            <div style={s.stat}>
              <div style={s.statNum}>3 pilares</div>
              <div style={s.statLabel}>Sistema de pensiones</div>
            </div>
            <div style={s.stat}>
              <div style={s.statNum}>44 años</div>
              <div style={s.statLabel}>Para pensión máxima</div>
            </div>
            <div style={s.stat}>
              <div style={s.statNum}>2.º pilar</div>
              <div style={s.statLabel}>Lo puedes recuperar</div>
            </div>
          </div>
        </div>
      </div>

      {/* LOS 3 PILARES */}
      <div style={s.section}>
        <div style={s.secEyebrow}>El sistema suizo</div>
        <h2 style={s.secTitle}>Los <em style={s.secEm}>3 pilares</em> explicados</h2>
        <p style={s.secSub}>Cada trabajador en Suiza cotiza a los tres pilares. Cada uno tiene un papel distinto y unas reglas distintas.</p>

        <div style={s.pilarTabs}>
          {PILARES.map(p => (
            <button key={p.num} style={s.pilarTab(pilarActivo === p.num, p.color)} onClick={() => setPilarActivo(p.num)}>
              {p.num}er Pilar — {p.siglas}
            </button>
          ))}
        </div>

        {pilar && (
          <div style={s.pilarCard(pilar.color)}>
            <div style={s.pilarHeader}>
              <div style={s.pilarNum(pilar.color)}>{pilar.num}</div>
              <div>
                <div style={s.pilarNombre}>{pilar.nombre}</div>
                <div style={s.pilarSiglas(pilar.color)}>{pilar.siglas}</div>
              </div>
            </div>
            <div style={s.pilarDesc}>{pilar.descripcion}</div>
            <div style={s.pilarPuntos}>
              {pilar.puntos.map((pt, i) => (
                <div key={i} style={s.pilarPunto}>
                  <span style={s.pilarFlecha(pilar.color)}>→</span>
                  <span style={s.pilarPuntoTexto}>{pt}</span>
                </div>
              ))}
            </div>
            <div style={s.pilarNota(pilar.color)}>💡 {pilar.nota}</div>
          </div>
        )}
      </div>

      {/* RECUPERAR EL 2.º PILAR */}
      <div style={s.white}>
        <div style={s.section}>
          <div style={s.secEyebrow}>Para cuando vuelvas a España</div>
          <h2 style={s.secTitle}>Cómo recuperar el <em style={s.secEm}>2.º pilar</em></h2>
          <p style={s.secSub}>
            Es el trámite más importante y el que más dinero puede representar. Hay que hacerlo bien y en el orden correcto.
          </p>

          <div style={s.alertaRoja}>
            ⚠️ <strong>Atención:</strong> Si vuelves a España y empiezas a trabajar cotizando a la Seguridad Social, <strong>no podrás retirar la parte obligatoria del 2.º pilar</strong>. Se queda bloqueada en Suiza hasta tu jubilación. La parte sobre-obligatoria (aportaciones extra) sí puedes recuperarla. Planifica esto antes de volver.
          </div>

          <div style={{ marginTop: 32 }}>
            <ul style={s.pasosList}>
              {RECUPERAR_PASOS.map((p, i) => (
                <li key={p.n} style={s.paso}>
                  <div style={s.pasoLeft}>
                    <div style={s.pasoNum(p.color)}>{p.n}</div>
                    {i < RECUPERAR_PASOS.length - 1 && <div style={s.pasoLinea} />}
                  </div>
                  <div style={s.pasoBody}>
                    <div style={s.pasoTitulo}>{p.titulo}</div>
                    <div style={s.pasoDesc}>{p.desc}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div style={s.alertaVerde}>
            💡 <strong>¿No sabes si tienes dinero en alguna caja de pensiones de Suiza?</strong> Es muy común olvidar cuentas al cambiar de trabajo. Puedes consultar todos tus haberes gratuitamente en la <strong>Central del 2.º Pilar (Zentralstelle 2. Säule)</strong> en Suiza. Ellos localizan el dinero aunque lleve años sin moverse.
          </div>
        </div>
      </div>

      {/* PREGUNTAS FRECUENTES */}
      <div style={s.section}>
        <div style={s.secEyebrow}>Preguntas frecuentes</div>
        <h2 style={s.secTitle}>Lo que más <em style={s.secEm}>preguntan</em></h2>
        <p style={s.secSub}>Las dudas más habituales sobre pensiones para españoles en Suiza.</p>
        {FAQS.map((f, i) => (
          <div key={i} style={s.faqItem}>
            <div style={s.faqQ(faqAbierta === i)} onClick={() => setFaqAbierta(faqAbierta === i ? null : i)}>
              <span>{f.q}</span>
              <span style={{ fontSize: 20, color: "#e67e22", flexShrink: 0, marginLeft: 12 }}>{faqAbierta === i ? "−" : "+"}</span>
            </div>
            {faqAbierta === i && <div style={s.faqA}>{f.a}</div>}
          </div>
        ))}
      </div>

      {/* AVISO FINAL */}
      <div style={s.dark}>
        <div style={s.darkInner}>
          <div style={{ fontSize: 32 }}>⚖️</div>
          <div>
            <div style={s.darkTitle}>Este tema es complejo — busca asesoramiento</div>
            <p style={s.darkText}>
              El sistema de pensiones suizo tiene muchas particularidades y cada caso es diferente. Si tienes años cotizados en Suiza y estás pensando en volver, es muy recomendable consultar con un asesor especializado antes de tomar decisiones. Un error en el momento de retirar el 2.º pilar puede costar miles de francos.
            </p>
            <p style={{ fontSize: 14, color: "#888", marginTop: 12, lineHeight: 1.6 }}>
              Recursos oficiales: <strong style={{ color: "white" }}>ahv-iv.ch</strong> (1.er pilar) · <strong style={{ color: "white" }}>e-bvg.ch</strong> (2.º pilar) · <strong style={{ color: "white" }}>mites.gob.es/mundo/consejerias/suiza</strong> (Consejería de Empleo de España en Suiza)
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
