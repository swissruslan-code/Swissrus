import { useState } from "react";

const FRANQUICIAS = [
  { importe: "300 CHF", nivel: "Prima más alta", ahorro: "Sin descuento", perfil: "Si vas al médico con frecuencia o tienes enfermedades crónicas. Pagas más de prima pero el seguro empieza a cubrir antes." },
  { importe: "500 CHF", nivel: "Prima algo más baja", ahorro: "~8%", perfil: "Buen punto de equilibrio si vas al médico ocasionalmente." },
  { importe: "1.000 CHF", nivel: "Prima reducida", ahorro: "~20%", perfil: "Razonable si eres joven y vas poco al médico." },
  { importe: "1.500 CHF", nivel: "Prima baja", ahorro: "~30%", perfil: "Solo si tienes ahorros para cubrir imprevistos médicos." },
  { importe: "2.000 CHF", nivel: "Prima muy baja", ahorro: "~40%", perfil: "Para gente sana que quiere minimizar el gasto mensual fijo." },
  { importe: "2.500 CHF", nivel: "Prima mínima", ahorro: "Hasta 70%", perfil: "La prima mensual más barata posible, pero pagas tú los primeros 2.500 CHF de gastos médicos al año." },
];

const BASICO_CUBRE = [
  { icono: "🩺", titulo: "Médico de cabecera y especialistas", desc: "Consultas con médicos autorizados en tu cantón de residencia. Para el especialista necesitas derivación del médico general (salvo ginecólogo, pediatra y oftalmólogo)." },
  { icono: "🏥", titulo: "Hospitalización en habitación compartida", desc: "Ingreso en el hospital de tu cantón, en sala común. Incluye tratamiento y alojamiento. Habitación individual o semiprivada es seguro complementario." },
  { icono: "💊", titulo: "Medicamentos con receta", desc: "Solo los medicamentos que aparecen en la lista oficial de especialidades y que el médico te ha recetado." },
  { icono: "🤰", titulo: "Embarazo y parto", desc: "Controles, parto y asesoramiento de lactancia. Sin franquicia ni copago — el seguro paga desde el primer franco." },
  { icono: "💉", titulo: "Vacunas y prevención básica", desc: "Vacunas recomendadas por el gobierno suizo y algunos controles preventivos como la revisión ginecológica anual." },
  { icono: "🦽", titulo: "Rehabilitación prescrita por médico", desc: "Fisioterapia y rehabilitación después de una operación o enfermedad grave, siempre que la haya prescrito el médico." },
];

const BASICO_NO_CUBRE = [
  { icono: "🦷", texto: "Dentista (salvo casos graves de masticación en adultos)" },
  { icono: "👓", texto: "Gafas y lentillas (solo reembolso parcial en menores)" },
  { icono: "🚑", texto: "Ambulancia: solo el 50% hasta 500 CHF/año — el resto lo pagas tú" },
  { icono: "🚁", texto: "Helicóptero de rescate: hasta 5.000 CHF/año — los gastos de búsqueda no cubren" },
  { icono: "🏥", texto: "Habitación individual o semiprivada en hospital" },
  { icono: "🌍", texto: "Tratamientos médicos planificados fuera de Suiza" },
  { icono: "🧠", texto: "Psicoterapia (con excepciones muy limitadas)" },
  { icono: "🌿", texto: "Medicina alternativa (acupuntura, osteopatía, homeopatía...)" },
  { icono: "💪", texto: "Gimnasio, nutricionista, bienestar general" },
];

const COMPLEMENTARIOS = [
  {
    nombre: "Ambulancia y rescate",
    desc: "El básico solo paga el 50% hasta 500 CHF/año en ambulancia (enfermedad) y hasta 5.000 CHF/año en rescate. Los gastos de búsqueda y evacuación no están cubiertos en absoluto. Con el complementario, algunas aseguradoras como Helsana cubren hasta 100.000 CHF, otras sin límite. Muy recomendable si haces deporte de montaña o esquí.",
    precio: "~10–20 CHF/mes",
    importante: true,
  },
  {
    nombre: "Hospitalización privada o semiprivada",
    desc: "El básico solo cubre habitación compartida en el hospital de tu cantón. Con este complementario puedes elegir médico, tener habitación individual o semiprivada, y ser atendido en cualquier hospital de Suiza.",
    precio: "~50–150 CHF/mes",
    importante: false,
  },
  {
    nombre: "Dental",
    desc: "El básico no cubre dentista salvo casos muy graves. El complementario cubre revisiones, empastes y ortodoncia. La aseguradora puede pedirte un examen dental antes de aprobar la póliza.",
    precio: "~30–80 CHF/mes",
    importante: false,
  },
  {
    nombre: "Gafas y óptica",
    desc: "Reembolso parcial de gafas, lentillas y cirugías oculares para adultos. Las aseguradoras suelen ofrecer un tope anual de reembolso.",
    precio: "~5–15 CHF/mes",
    importante: false,
  },
  {
    nombre: "Medicina alternativa",
    desc: "Acupuntura, osteopatía, homeopatía, quiropraxia y terapias similares bajo ciertas condiciones. Hay límites de reembolso anuales según aseguradora.",
    precio: "~10–30 CHF/mes",
    importante: false,
  },
  {
    nombre: "Complemento de salario",
    desc: "Si estás de baja por enfermedad, la empresa solo está obligada a pagarte el 80% del sueldo. Con este complementario recibes el 100%. El coste varía según tu edad y nivel de ingresos.",
    precio: "~20–60 CHF/mes",
    importante: false,
  },
  {
    nombre: "Bienestar y prevención",
    desc: "Algunos complementarios incluyen reembolsos parciales del abono del gimnasio, curas termales, nutricionista o servicio de limpieza en casa durante la convalecencia. Varía mucho según aseguradora — consulta siempre las condiciones exactas.",
    precio: "Incluido en packs",
    importante: false,
  },
];

const MODELOS = [
  { nombre: "Modelo estándar", desc: "Puedes ir a cualquier médico o especialista sin pedir permiso previo.", ahorro: "Sin descuento en prima", rec: "Si quieres total libertad de elección.", color: "#888" },
  { nombre: "Médico de cabecera", desc: "Primero vas a tu médico de cabecera y él te deriva al especialista si hace falta. Puedes ir directo a ginecólogo, pediatra u oftalmólogo.", ahorro: "10–15% de descuento", rec: "La opción más popular. Buen equilibrio precio-libertad.", color: "#27ae60" },
  { nombre: "HMO (centro de salud)", desc: "Siempre acudes al mismo centro de salud asignado. Ellos coordinan toda tu atención médica.", ahorro: "15–20% de descuento", rec: "Si vives cerca de un centro HMO y no te importa no elegir médico.", color: "#2980b9" },
  { nombre: "Telmed (consulta telefónica)", desc: "Antes de ir al médico debes llamar a una línea médica que decide si necesitas acudir en persona.", ahorro: "10–15% de descuento", rec: "Para gente práctica que no le importa hacer una llamada previa.", color: "#8e44ad" },
];

const FAQS = [
  { q: "¿Es obligatorio desde el primer día?", a: "Tienes 3 meses para contratarlo desde que te registras en Suiza, pero la cobertura es retroactiva desde tu fecha de llegada. Si no lo contratas tú en ese plazo, el cantón te asigna uno automáticamente — sin posibilidad de elegir — y te cobra con efecto retroactivo." },
  { q: "¿Cuánto cuesta aproximadamente?", a: "Depende del cantón, tu edad y la franquicia elegida. Orientativamente: un adulto de 30 años en Zúrich con franquicia de 2.500 CHF paga unos 280–350 CHF/mes. Con franquicia mínima de 300 CHF puede llegar a 450–550 CHF/mes. Ginebra y Vaud son los cantones más caros." },
  { q: "¿Puedo cambiar de aseguradora?", a: "Sí, una vez al año. Hay que avisar antes del 30 de noviembre para que el cambio sea efectivo el 1 de enero del año siguiente. Si tu aseguradora sube las primas, tienes hasta el 31 de diciembre para cancelar con efecto inmediato." },
  { q: "¿Cómo funciona cuando voy al médico?", a: "Vas al médico, te atienden y recibes la factura por correo en casa. La mandas a tu aseguradora y ellos te pagan la parte que les corresponde, según tu franquicia. Una vez alcanzada la franquicia, pagas el 10% del resto con un máximo de 700 CHF anuales de copago." },
  { q: "¿Y si no puedo pagar la prima?", a: "Si tus ingresos son bajos, el cantón puede darte una reducción de prima. Vale la pena solicitarla si cobras menos de unos 4.000 CHF netos al mes. Cada cantón tiene sus propios criterios — infórmate directamente con el tuyo." },
  { q: "¿Cubre los accidentes de trabajo?", a: "No, si trabajas más de 8 horas semanales con el mismo empleador, los accidentes laborales los cubre tu empresa con un seguro separado obligatorio. El LAMal solo cubre accidentes si trabajas menos de 8 horas semanales o eres autónomo sin esa cobertura." },
  { q: "¿Sirve la Tarjeta Sanitaria Europea española?", a: "Solo si eres turista o estás de paso. En cuanto fijas tu residencia en Suiza y te registras, tienes la obligación de contratar el LAMal. La TSE no sustituye al seguro suizo para residentes." },
];

export default function Sanidad() {
  const [faqAbierta, setFaqAbierta] = useState(null);

  const s = {
    page: { fontFamily: "'Segoe UI', Arial, sans-serif", background: "#faf9f7", minHeight: "100vh" },
    hero: { background: "linear-gradient(135deg, #0a1628 0%, #1a2a1a 100%)", color: "white", padding: "5rem 2rem 4rem" },
    heroInner: { maxWidth: 960, margin: "0 auto" },
    eyebrow: { fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#27ae60", marginBottom: 12 },
    heroTitle: { fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: 16 },
    heroEm: { color: "#27ae60", fontStyle: "italic" },
    heroSub: { fontSize: 16, color: "#aaa", lineHeight: 1.7, maxWidth: 600, fontWeight: 300 },

    alerta: { background: "#c0392b", padding: "1rem 2rem" },
    alertaInner: { maxWidth: 960, margin: "0 auto", fontSize: 14, lineHeight: 1.6, display: "flex", gap: 10, alignItems: "flex-start", color: "white" },

    section: { maxWidth: 960, margin: "0 auto", padding: "4rem 2rem" },
    secEyebrow: { fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#27ae60", marginBottom: 8 },
    secTitle: { fontFamily: "Georgia, serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 900, marginBottom: 8, color: "#111" },
    secEm: { color: "#27ae60", fontStyle: "italic" },
    secSub: { fontSize: 14, color: "#888", marginBottom: 28, lineHeight: 1.6 },

    grid2: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 },
    card: { background: "white", border: "1px solid #e8e8e8", padding: "1.2rem", borderRadius: 4 },
    cardIcon: { fontSize: 22, marginBottom: 8 },
    cardTitle: { fontSize: 14, fontWeight: 700, color: "#111", marginBottom: 4 },
    cardDesc: { fontSize: 12, color: "#666", lineHeight: 1.5 },

    noGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 8 },
    noItem: { background: "#fdf3f2", border: "1px solid rgba(192,57,43,0.15)", padding: "10px 14px", fontSize: 13, color: "#c0392b", borderRadius: 2, display: "flex", gap: 10, alignItems: "flex-start" },

    complGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 },
    complCard: { background: "white", border: "1px solid #e8e8e8", borderTop: "3px solid #27ae60", padding: "1.2rem", borderRadius: 4 },
    complNombre: { fontSize: 14, fontWeight: 800, color: "#111", marginBottom: 6 },
    complDesc: { fontSize: 12, color: "#666", lineHeight: 1.5, marginBottom: 10 },
    complPrecio: { fontSize: 12, fontWeight: 700, color: "#27ae60" },

    franqGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12 },
    franqCard: (i) => ({ background: "white", border: "1px solid #e8e8e8", borderTop: `3px solid ${i === 0 ? "#c0392b" : i === 5 ? "#27ae60" : "#ddd"}`, padding: "1.2rem", borderRadius: 4 }),
    franqImporte: { fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 900, color: "#111", marginBottom: 2 },
    franqNivel: { fontSize: 11, color: "#999", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 },
    franqAhorro: { fontSize: 13, fontWeight: 700, color: "#27ae60", marginBottom: 8 },
    franqPerfil: { fontSize: 12, color: "#666", lineHeight: 1.5 },

    modelosGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: 12 },
    modeloCard: (color) => ({ background: "white", border: `1px solid ${color}30`, borderTop: `3px solid ${color}`, padding: "1.2rem", borderRadius: 4 }),
    modeloNombre: (color) => ({ fontSize: 14, fontWeight: 800, color, marginBottom: 6 }),
    modeloDesc: { fontSize: 12, color: "#555", lineHeight: 1.5, marginBottom: 10 },
    modeloAhorro: { fontSize: 12, fontWeight: 700, color: "#27ae60", marginBottom: 4 },
    modeloRec: { fontSize: 11, color: "#999", fontStyle: "italic", lineHeight: 1.4 },

    faqItem: { background: "white", border: "1px solid #e8e8e8", marginBottom: 8, borderRadius: 4, overflow: "hidden" },
    faqQ: (open) => ({ padding: "1rem 1.5rem", fontSize: 14, fontWeight: 700, color: "#111", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", background: open ? "#f8f8f8" : "white" }),
    faqA: { padding: "0 1.5rem 1rem", fontSize: 14, color: "#555", lineHeight: 1.7 },

    pasos: { listStyle: "none", padding: 0, margin: 0 },
    paso: { display: "flex", gap: 16, marginBottom: 20, alignItems: "flex-start" },
    pasoNum: (c) => ({ width: 34, height: 34, borderRadius: 2, background: c, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, flexShrink: 0, marginTop: 2 }),
    pasoTitulo: { fontSize: 15, fontWeight: 800, color: "#111", marginBottom: 3 },
    pasoDesc: { fontSize: 13, color: "#666", lineHeight: 1.6 },

    divider: { maxWidth: 960, margin: "0 auto", padding: "0 2rem" },
    hr: { border: "none", borderTop: "1px solid #e8e8e8" },
    white: { background: "white", borderTop: "1px solid #eee", borderBottom: "1px solid #eee" },
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
          <div style={s.eyebrow}>Sanidad · Swissrus 2025–2026</div>
          <h1 style={s.heroTitle}>El seguro médico en <em style={s.heroEm}>Suiza</em></h1>
          <p style={s.heroSub}>
            En Suiza no hay Seguridad Social como en España. Cada persona contrata su propio seguro médico privado. Es obligatorio, cuesta dinero y hay que entenderlo bien antes de llegar.
          </p>
        </div>
      </div>

      {/* ALERTA */}
      <div style={s.alerta}>
        <div style={s.alertaInner}>
          <span style={{ fontSize: 20 }}>⚠️</span>
          <div>
            <strong>Obligatorio desde que te registras.</strong> Tienes 3 meses para contratarlo pero la cobertura cubre desde tu llegada. Si no lo contratas tú, el cantón te asigna uno sin que puedas elegir y te cobra retroactivamente. No lo dejes para después.
          </div>
        </div>
      </div>

      {/* QUÉ CUBRE EL BÁSICO */}
      <div style={s.section}>
        <div style={s.secEyebrow}>Seguro básico (LAMal)</div>
        <h2 style={s.secTitle}>¿Qué cubre el <em style={s.secEm}>seguro básico?</em></h2>
        <p style={s.secSub}>Todas las aseguradoras ofrecen exactamente la misma cobertura básica — lo que cambia es el precio. Esto es lo que cubre:</p>
        <div style={s.grid2}>
          {BASICO_CUBRE.map(c => (
            <div key={c.titulo} style={s.card}>
              <div style={s.cardIcon}>{c.icono}</div>
              <div style={s.cardTitle}>{c.titulo}</div>
              <div style={s.cardDesc}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 28 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#c0392b", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.06em" }}>❌ Lo que NO cubre el seguro básico</div>
          <div style={s.noGrid}>
            {BASICO_NO_CUBRE.map(item => (
              <div key={item.texto} style={s.noItem}>
                <span>{item.icono}</span><span>{item.texto}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, padding: "10px 14px", background: "#fdf9f5", border: "1px solid rgba(192,57,43,0.15)", fontSize: 13, color: "#888", borderRadius: 2 }}>
            ⚠️ Ojo con la ambulancia y el helicóptero: el seguro básico solo paga una parte. En zonas de montaña o para actividades de riesgo, el seguro complementario de rescate es muy recomendable.
          </div>
        </div>
      </div>

      {/* SEGUROS COMPLEMENTARIOS */}
      <div style={s.white}>
        <div style={s.section}>
          <div style={s.secEyebrow}>Seguros complementarios (LCA)</div>
          <h2 style={s.secTitle}>Los <em style={s.secEm}>complementarios</em> más útiles</h2>
          <p style={s.secSub}>Son opcionales, pero cubren lagunas importantes del básico. Puedes contratarlos con la misma aseguradora o con otra diferente.</p>
          <div style={s.complGrid}>
            {COMPLEMENTARIOS.map(c => (
              <div key={c.nombre} style={s.complCard}>
                <div style={s.complNombre}>{c.nombre}</div>
                <div style={s.complDesc}>{c.desc}</div>
                <div style={s.complPrecio}>Precio aprox: {c.precio}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, padding: "10px 14px", background: "#f0faf5", border: "1px solid #27ae6030", fontSize: 13, color: "#555", borderRadius: 2 }}>
            💡 A diferencia del seguro básico, las aseguradoras sí pueden rechazarte un complementario o cobrarte más según tu estado de salud. Contrátalo cuanto antes — es más fácil aprobarlo cuando estás sano.
          </div>
        </div>
      </div>

      {/* FRANQUICIA */}
      <div style={s.section}>
        <div style={s.secEyebrow}>La franquicia</div>
        <h2 style={s.secTitle}>Elige bien tu <em style={s.secEm}>franquicia</em></h2>
        <p style={s.secSub}>La franquicia es lo que pagas tú antes de que el seguro empiece a pagar. A más franquicia, menos prima mensual, pero más pagas si te pones enfermo.</p>
        <div style={s.franqGrid}>
          {FRANQUICIAS.map((f, i) => (
            <div key={f.importe} style={s.franqCard(i)}>
              <div style={s.franqImporte}>{f.importe}</div>
              <div style={s.franqNivel}>{f.nivel}</div>
              <div style={s.franqAhorro}>{f.ahorro} en prima mensual</div>
              <div style={s.franqPerfil}>{f.perfil}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 14, padding: "10px 14px", background: "#f8f8f8", border: "1px solid #eee", fontSize: 13, color: "#666", borderRadius: 2 }}>
          Una vez alcanzada tu franquicia, sigues pagando el 10% de cada factura médica, con un máximo de 700 CHF al año para adultos. A partir de ahí el seguro paga el 100%.
        </div>
      </div>

      {/* MODELOS */}
      <div style={s.white}>
        <div style={s.section}>
          <div style={s.secEyebrow}>Modelos de seguro</div>
          <h2 style={s.secTitle}>¿Qué <em style={s.secEm}>modelo</em> eliges?</h2>
          <p style={s.secSub}>Si aceptas ciertas restricciones sobre cómo accedes al médico, pagas menos de prima cada mes.</p>
          <div style={s.modelosGrid}>
            {MODELOS.map(m => (
              <div key={m.nombre} style={s.modeloCard(m.color)}>
                <div style={s.modeloNombre(m.color)}>{m.nombre}</div>
                <div style={s.modeloDesc}>{m.desc}</div>
                <div style={s.modeloAhorro}>💰 {m.ahorro}</div>
                <div style={s.modeloRec}>👤 {m.rec}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CÓMO CONTRATAR */}
      <div style={s.section}>
        <div style={s.secEyebrow}>Paso a paso</div>
        <h2 style={s.secTitle}>Cómo <em style={s.secEm}>contratarlo</em></h2>
        <p style={s.secSub}>Más sencillo de lo que parece. En cuatro pasos tienes el seguro listo.</p>
        <ul style={s.pasos}>
          {[
            { n: "01", c: "#c0392b", t: "Compara precios por cantón", d: "Entra en priminfo.admin.ch (web oficial del gobierno suizo). Pon tu cantón, tu edad y la franquicia que quieres. Los precios varían mucho entre cantones y aseguradoras." },
            { n: "02", c: "#e67e22", t: "Elige aseguradora y modelo", d: "Todas cubren exactamente lo mismo en básico. Elige la más barata para tu situación o una con buenas valoraciones de atención al cliente. El modelo de médico de cabecera suele ser el mejor equilibrio." },
            { n: "03", c: "#27ae60", t: "Rellena el formulario online", d: "La mayoría permiten contratarlo online en 10 minutos. Necesitas tu dirección suiza, fecha de nacimiento y número de permiso de residencia." },
            { n: "04", c: "#2980b9", t: "Guarda tu tarjeta de seguro", d: "Te enviarán una tarjeta de seguro. Llévala siempre encima — cualquier médico o urgencias te la pedirán." },
          ].map(p => (
            <li key={p.n} style={s.paso}>
              <div style={s.pasoNum(p.c)}>{p.n}</div>
              <div>
                <div style={s.pasoTitulo}>{p.t}</div>
                <div style={s.pasoDesc}>{p.d}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* FAQ */}
      <div style={s.white}>
        <div style={s.section}>
          <div style={s.secEyebrow}>Preguntas frecuentes</div>
          <h2 style={s.secTitle}>Lo que más <em style={s.secEm}>preguntan</em></h2>
          <p style={s.secSub}>Las dudas más habituales de españoles recién llegados a Suiza.</p>
          {FAQS.map((f, i) => (
            <div key={i} style={s.faqItem}>
              <div style={s.faqQ(faqAbierta === i)} onClick={() => setFaqAbierta(faqAbierta === i ? null : i)}>
                <span>{f.q}</span>
                <span style={{ fontSize: 20, color: "#c0392b", flexShrink: 0, marginLeft: 12 }}>{faqAbierta === i ? "−" : "+"}</span>
              </div>
              {faqAbierta === i && <div style={s.faqA}>{f.a}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* COMPARADORES */}
      <div style={s.dark}>
        <div style={s.darkInner}>
          <div style={{ fontSize: 32 }}>🔍</div>
          <div>
            <div style={s.darkTitle}>Dónde comparar y contratar</div>
            <p style={s.darkText}>
              Usa <strong style={{ color: "white" }}>priminfo.admin.ch</strong> para ver los precios oficiales por cantón. Es la web del gobierno suizo y la más fiable. Para comparar más opciones y contratar online, <strong style={{ color: "white" }}>comparis.ch</strong> y <strong style={{ color: "white" }}>moneyland.ch</strong> son los más completos.
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
              {[
                { n: "priminfo.admin.ch", url: "https://www.priminfo.admin.ch", desc: "Oficial" },
                { n: "comparis.ch", url: "https://www.comparis.ch/versicherung", desc: "Comparador" },
                { n: "moneyland.ch", url: "https://www.moneyland.ch", desc: "Independiente" },
              ].map(l => (
                <a key={l.n} href={l.url} target="_blank" rel="noopener noreferrer"
                  style={{ padding: "10px 16px", background: "rgba(255,255,255,0.1)", color: "white", fontSize: 13, fontWeight: 700, textDecoration: "none", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 2 }}>
                  {l.n} <span style={{ fontSize: 11, color: "#888", fontWeight: 400 }}>— {l.desc}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
