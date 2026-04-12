import { useState } from "react";

const SECTORES = [
  {
    id: "hosteleria",
    icono: "🍽️",
    nombre: "Hostelería y restauración",
    descripcion: "Uno de los sectores con más españoles en Suiza. Trabajo exigente pero con buenas propinas.",
    salarioBruto: "3.200 – 4.500 CHF/mes",
    salarioNeto: "2.600 – 3.700 CHF/mes",
    salarioAnual: "42.000 – 58.000 CHF/año",
    minHora: "19 – 21 CHF/hora",
    convenio: "Sí, convenio L-GAV (hostelería)",
    decTercero: "Sí, habitual en este sector",
    puestos: [
      { nombre: "Cocinero/a", rango: "3.200 – 4.200 CHF" },
      { nombre: "Camarero/a", rango: "3.200 – 3.800 CHF" },
      { nombre: "Jefe de cocina", rango: "4.500 – 6.500 CHF" },
      { nombre: "Encargado/a de sala", rango: "4.000 – 5.500 CHF" },
    ],
    consejo: "El convenio L-GAV fija salarios mínimos por categoría. Siempre pregunta si el sueldo incluye el 13.º mes — en hostelería es muy común y supone un mes extra de sueldo al año.",
  },
  {
    id: "construccion",
    icono: "🏗️",
    nombre: "Construcción y oficios",
    descripcion: "Sector con salarios regulados por convenio y muy demandado en toda Suiza.",
    salarioBruto: "4.500 – 6.500 CHF/mes",
    salarioNeto: "3.600 – 5.200 CHF/mes",
    salarioAnual: "67.000 – 78.000 CHF/año",
    minHora: "22 – 28 CHF/hora",
    convenio: "Sí, convenio colectivo de construcción (LMV)",
    decTercero: "Sí, incluido en convenio",
    puestos: [
      { nombre: "Albañil", rango: "4.500 – 5.500 CHF" },
      { nombre: "Electricista", rango: "5.000 – 6.500 CHF" },
      { nombre: "Fontanero/a", rango: "4.800 – 6.200 CHF" },
      { nombre: "Encargado de obra", rango: "6.000 – 8.000 CHF" },
    ],
    consejo: "La construcción tiene uno de los convenios más protectores de Suiza. Los salarios varían según la categoría profesional (del 1 al 6). Si tienes formación acreditada, exige que te clasifiquen correctamente.",
  },
  {
    id: "sanidad",
    icono: "⚕️",
    nombre: "Sanidad y enfermería",
    descripcion: "Alta demanda de profesionales españoles, especialmente enfermeros y auxiliares.",
    salarioBruto: "5.000 – 8.000 CHF/mes",
    salarioNeto: "4.000 – 6.400 CHF/mes",
    salarioAnual: "70.000 – 120.000 CHF/año",
    minHora: "28 – 45 CHF/hora",
    convenio: "Sí, según cantón y empleador",
    decTercero: "Depende del empleador",
    puestos: [
      { nombre: "Enfermero/a", rango: "5.000 – 7.000 CHF" },
      { nombre: "Auxiliar de enfermería", rango: "4.200 – 5.500 CHF" },
      { nombre: "Médico adjunto", rango: "8.000 – 12.000 CHF" },
      { nombre: "Fisioterapeuta", rango: "5.500 – 7.500 CHF" },
    ],
    consejo: "Para trabajar como enfermero/a necesitas homologar tu título. El proceso tarda varios meses pero merece la pena — los salarios casi doblan los españoles y las condiciones laborales son muy superiores.",
  },
  {
    id: "limpieza",
    icono: "🧹",
    nombre: "Limpieza y servicios",
    descripcion: "Sector con mucha demanda y convenio colectivo que protege los salarios mínimos.",
    salarioBruto: "3.400 – 4.500 CHF/mes",
    salarioNeto: "2.700 – 3.600 CHF/mes",
    salarioAnual: "38.000 – 50.000 CHF/año",
    minHora: "19 – 23 CHF/hora",
    convenio: "Sí, convenio colectivo de limpieza",
    decTercero: "No siempre",
    puestos: [
      { nombre: "Limpiador/a", rango: "3.400 – 4.000 CHF" },
      { nombre: "Limpieza industrial", rango: "3.800 – 4.500 CHF" },
      { nombre: "Supervisor/a", rango: "4.200 – 5.500 CHF" },
    ],
    consejo: "Es uno de los sectores de entrada más comunes para recién llegados. No se suele exigir idioma al principio, lo que lo hace accesible. El convenio protege bien los derechos laborales.",
  },
  {
    id: "informatica",
    icono: "💻",
    nombre: "Informática e ingeniería",
    descripcion: "Zúrich y Ginebra son dos de los centros tecnológicos más importantes de Europa.",
    salarioBruto: "7.000 – 12.000 CHF/mes",
    salarioNeto: "5.500 – 9.000 CHF/mes",
    salarioAnual: "90.000 – 150.000 CHF/año",
    minHora: "45 – 70 CHF/hora",
    convenio: "No, salarios negociados individualmente",
    decTercero: "Habitual en grandes empresas",
    puestos: [
      { nombre: "Desarrollador/a junior", rango: "7.000 – 9.000 CHF" },
      { nombre: "Desarrollador/a senior", rango: "9.000 – 13.000 CHF" },
      { nombre: "Ingeniero/a de datos", rango: "9.000 – 14.000 CHF" },
      { nombre: "Jefe de proyecto IT", rango: "10.000 – 15.000 CHF" },
    ],
    consejo: "El inglés es suficiente para trabajar en la mayoría de empresas tech de Zúrich. Los salarios son de los más altos de Europa. Empresas como Google, Microsoft, UBS y muchas startups tienen sede aquí.",
  },
  {
    id: "banca",
    icono: "🏦",
    nombre: "Banca y finanzas",
    descripcion: "Ginebra y Zúrich son las capitales financieras de Europa. Salarios muy elevados.",
    salarioBruto: "8.000 – 20.000+ CHF/mes",
    salarioNeto: "6.000 – 14.000 CHF/mes",
    salarioAnual: "100.000 – 250.000+ CHF/año",
    minHora: "50 – 120 CHF/hora",
    convenio: "No, negociación individual",
    decTercero: "Sí, más bonus anuales",
    puestos: [
      { nombre: "Analista financiero", rango: "8.000 – 12.000 CHF" },
      { nombre: "Gestor de banca privada", rango: "10.000 – 18.000 CHF" },
      { nombre: "Trader / Risk Manager", rango: "12.000 – 25.000+ CHF" },
      { nombre: "Director de área", rango: "15.000 – 30.000+ CHF" },
    ],
    consejo: "Requiere formación específica y normalmente inglés y francés o alemán. Los bonos anuales pueden superar el salario base. UBS, Credit Suisse (ahora parte de UBS) y Julius Bär son los grandes empleadores.",
  },
  {
    id: "educacion",
    icono: "📚",
    nombre: "Educación y docencia",
    descripcion: "Los profesores en Suiza están bien pagados y muy valorados socialmente.",
    salarioBruto: "6.500 – 9.500 CHF/mes",
    salarioNeto: "5.200 – 7.500 CHF/mes",
    salarioAnual: "85.000 – 110.000 CHF/año",
    minHora: "40 – 55 CHF/hora",
    convenio: "Sí, fijado por cada cantón",
    decTercero: "No habitual",
    puestos: [
      { nombre: "Maestro/a primaria", rango: "6.500 – 8.000 CHF" },
      { nombre: "Profesor/a secundaria", rango: "7.500 – 9.500 CHF" },
      { nombre: "Profesor/a universidad", rango: "9.000 – 15.000 CHF" },
      { nombre: "Profesor/a de español", rango: "5.000 – 7.000 CHF" },
    ],
    consejo: "Para enseñar en escuelas públicas necesitas homologar tu título y normalmente hablar el idioma del cantón (alemán, francés o italiano). Dar clases de español como lengua extranjera es más accesible.",
  },
  {
    id: "agricultura",
    icono: "🌾",
    nombre: "Agricultura y vendimia",
    descripcion: "Trabajo temporal muy buscado por españoles. No suele exigir idioma ni experiencia.",
    salarioBruto: "2.800 – 3.800 CHF/mes",
    salarioNeto: "2.200 – 3.000 CHF/mes",
    salarioAnual: "Trabajo estacional (3–6 meses)",
    minHora: "18 – 22 CHF/hora",
    convenio: "Sí, convenio agrícola",
    decTercero: "Raro en este sector",
    puestos: [
      { nombre: "Recolector/a de fruta", rango: "2.800 – 3.200 CHF" },
      { nombre: "Vendimiador/a", rango: "3.000 – 3.800 CHF" },
      { nombre: "Trabajador/a agrícola", rango: "2.800 – 3.500 CHF" },
    ],
    consejo: "La vendimia en Valais y Vaud (agosto–octubre) es la opción más popular. Muchas empresas ofrecen alojamiento incluido, lo que permite ahorrar casi todo el sueldo. Es una buena forma de entrar en Suiza por primera vez.",
  },
];

const GASTOS = [
  { concepto: "Alquiler piso compartido (habitación)", ciudad: "Zúrich", precio: "800 – 1.200 CHF" },
  { concepto: "Alquiler piso compartido (habitación)", ciudad: "Ginebra", precio: "850 – 1.300 CHF" },
  { concepto: "Alquiler piso compartido (habitación)", ciudad: "Berna / Basilea", precio: "650 – 950 CHF" },
  { concepto: "Seguro médico (franquicia 2.500 CHF)", ciudad: "Media Suiza", precio: "280 – 380 CHF" },
  { concepto: "Transporte mensual (abono)", ciudad: "Zúrich", precio: "90 – 110 CHF" },
  { concepto: "Alimentación mensual", ciudad: "Media Suiza", precio: "400 – 600 CHF" },
  { concepto: "Teléfono móvil", ciudad: "Media Suiza", precio: "20 – 40 CHF" },
  { concepto: "TV y radio (obligatorio)", ciudad: "Toda Suiza", precio: "28 CHF/mes" },
];

const s = {
  page: { fontFamily: "'Segoe UI', Arial, sans-serif", background: "#faf9f7", minHeight: "100vh" },
  hero: { background: "linear-gradient(135deg, #111 0%, #1a1a2e 100%)", color: "white", padding: "5rem 2rem 4rem" },
  heroInner: { maxWidth: 960, margin: "0 auto" },
  eyebrow: { fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#c0392b", marginBottom: 12 },
  heroTitle: { fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: 16, letterSpacing: "-0.02em" },
  heroEm: { color: "#c0392b", fontStyle: "italic" },
  heroSub: { fontSize: 16, color: "#aaa", lineHeight: 1.7, maxWidth: 580, fontWeight: 300 },
  heroStats: { display: "flex", gap: 32, marginTop: 32, flexWrap: "wrap" },
  stat: { borderLeft: "3px solid #c0392b", paddingLeft: 16 },
  statNum: { fontFamily: "Georgia, serif", fontSize: 28, fontWeight: 900, color: "white", lineHeight: 1 },
  statLabel: { fontSize: 11, color: "#888", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 4 },

  section: { maxWidth: 960, margin: "0 auto", padding: "4rem 2rem" },
  secEyebrow: { fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#c0392b", marginBottom: 8 },
  secTitle: { fontFamily: "Georgia, serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 900, marginBottom: 8, color: "#111" },
  secEm: { color: "#c0392b", fontStyle: "italic" },
  secSub: { fontSize: 14, color: "#888", marginBottom: 32, lineHeight: 1.6 },

  tabs: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 },
  tab: (active) => ({
    padding: "8px 16px", border: "1px solid #ddd", borderRadius: 2,
    background: active ? "#111" : "white", color: active ? "white" : "#555",
    fontSize: 13, fontWeight: active ? 700 : 400, cursor: "pointer",
    transition: "all 0.15s",
  }),

  card: { background: "white", border: "1px solid #e8e8e8", borderRadius: 4, overflow: "hidden" },
  cardHeader: { background: "#111", color: "white", padding: "1.5rem 2rem", display: "flex", alignItems: "center", gap: 16 },
  cardIcon: { fontSize: 32 },
  cardTitle: { fontFamily: "Georgia, serif", fontSize: 20, fontWeight: 900 },
  cardDesc: { fontSize: 13, color: "#aaa", marginTop: 4, lineHeight: 1.5 },

  cardBody: { padding: "1.5rem 2rem" },
  twoCol: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 },
  metaBlock: {},
  metaLabel: { fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#bbb", marginBottom: 6 },
  metaVal: { fontSize: 15, fontWeight: 700, color: "#111" },
  metaValRed: { fontSize: 18, fontWeight: 900, color: "#c0392b", fontFamily: "Georgia, serif" },

  puestosTitle: { fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#bbb", marginBottom: 12 },
  puestoRow: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #f0f0f0" },
  puestoNombre: { fontSize: 14, color: "#444" },
  puestoRango: { fontSize: 14, fontWeight: 700, color: "#c0392b" },

  consejo: { background: "#fdf9f5", border: "1px solid rgba(192,57,43,0.15)", padding: "14px 16px", marginTop: 20, borderRadius: 2 },
  consejoText: { fontSize: 13, color: "#555", lineHeight: 1.6 },

  gastoTable: { width: "100%", borderCollapse: "collapse", background: "white", border: "1px solid #e8e8e8" },
  gastoRow: { borderBottom: "1px solid #f0f0f0" },
  gastoTh: { padding: "10px 16px", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#aaa", textAlign: "left", background: "#f8f8f8" },
  gastoTd: { padding: "12px 16px", fontSize: 14, color: "#444" },
  gastoTdPrice: { padding: "12px 16px", fontSize: 14, fontWeight: 700, color: "#c0392b", textAlign: "right" },

  aviso: { background: "#111", color: "white", padding: "3rem 2rem" },
  avisoInner: { maxWidth: 960, margin: "0 auto", display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" },
  avisoTitle: { fontSize: 16, fontWeight: 800, marginBottom: 8 },
  avisoText: { fontSize: 14, color: "#aaa", lineHeight: 1.7, maxWidth: 640 },
};

export default function Salarios() {
  const [activo, setActivo] = useState("hosteleria");
  const sector = SECTORES.find(s => s.id === activo);

  return (
    <div style={s.page}>
      {/* HERO */}
      <div style={s.hero}>
        <div style={s.heroInner}>
          <div style={s.eyebrow}>Mercado laboral · Swissrus 2025–2026</div>
          <h1 style={s.heroTitle}>
            Salarios en <em style={s.heroEm}>Suiza</em> por sector
          </h1>
          <p style={s.heroSub}>
            Cifras reales y actualizadas. Bruto, neto, convenios y lo que nadie te cuenta antes de llegar.
          </p>
          <div style={s.heroStats}>
            <div style={s.stat}>
              <div style={s.statNum}>6.500 CHF</div>
              <div style={s.statLabel}>Salario medio bruto/mes</div>
            </div>
            <div style={s.stat}>
              <div style={s.statNum}>No existe</div>
              <div style={s.statLabel}>Salario mínimo nacional</div>
            </div>
            <div style={s.stat}>
              <div style={s.statNum}>19–23 CHF</div>
              <div style={s.statLabel}>Mínimo por hora (cantones)</div>
            </div>
            <div style={s.stat}>
              <div style={s.statNum}>10–20%</div>
              <div style={s.statLabel}>Descuentos sobre el bruto</div>
            </div>
          </div>
        </div>
      </div>

      {/* AVISO SALARIO MÍNIMO */}
      <div style={{ background: "#fdf3f2", borderBottom: "1px solid rgba(192,57,43,0.15)", padding: "1rem 2rem" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", fontSize: 13, color: "#c0392b" }}>
          ⚠️ <strong>Importante:</strong> Suiza no tiene salario mínimo nacional. Algunos cantones como Ginebra, Neuchâtel o Basilea-Ciudad sí fijan un mínimo por hora (entre 19 y 23 CHF). En el resto, el salario lo fija el convenio del sector o el acuerdo con la empresa.
        </div>
      </div>

      {/* SALARIOS POR SECTOR */}
      <div style={s.section}>
        <div style={s.secEyebrow}>Salarios por sector</div>
        <h2 style={s.secTitle}>¿Cuánto se gana en <em style={s.secEm}>tu sector?</em></h2>
        <p style={s.secSub}>Selecciona tu sector para ver salarios brutos, netos, puestos habituales y consejos prácticos.</p>

        {/* TABS */}
        <div style={s.tabs}>
          {SECTORES.map(sec => (
            <button key={sec.id} style={s.tab(activo === sec.id)} onClick={() => setActivo(sec.id)}>
              {sec.icono} {sec.nombre.split(" ")[0]}
            </button>
          ))}
        </div>

        {/* TARJETA SECTOR */}
        {sector && (
          <div style={s.card}>
            <div style={s.cardHeader}>
              <div style={s.cardIcon}>{sector.icono}</div>
              <div>
                <div style={s.cardTitle}>{sector.nombre}</div>
                <div style={s.cardDesc}>{sector.descripcion}</div>
              </div>
            </div>
            <div style={s.cardBody}>
              <div style={s.twoCol}>
                <div>
                  <div style={s.metaLabel}>Salario bruto mensual</div>
                  <div style={s.metaValRed}>{sector.salarioBruto}</div>
                </div>
                <div>
                  <div style={s.metaLabel}>Salario neto mensual (aprox.)</div>
                  <div style={s.metaValRed}>{sector.salarioNeto}</div>
                </div>
                <div>
                  <div style={s.metaLabel}>Salario anual bruto</div>
                  <div style={s.metaVal}>{sector.salarioAnual}</div>
                </div>
                <div>
                  <div style={s.metaLabel}>Precio por hora</div>
                  <div style={s.metaVal}>{sector.minHora}</div>
                </div>
                <div>
                  <div style={s.metaLabel}>¿Tiene convenio colectivo?</div>
                  <div style={s.metaVal}>{sector.convenio}</div>
                </div>
                <div>
                  <div style={s.metaLabel}>13.º mes</div>
                  <div style={s.metaVal}>{sector.decTercero}</div>
                </div>
              </div>

              <div style={s.puestosTitle}>Puestos habituales</div>
              {sector.puestos.map(p => (
                <div key={p.nombre} style={s.puestoRow}>
                  <span style={s.puestoNombre}>{p.nombre}</span>
                  <span style={s.puestoRango}>{p.rango}</span>
                </div>
              ))}

              <div style={s.consejo}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#c0392b" }}>💡 Consejo: </span>
                <span style={s.consejoText}>{sector.consejo}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* GASTOS FIJOS */}
      <div style={{ background: "white", borderTop: "1px solid #eee", borderBottom: "1px solid #eee" }}>
        <div style={s.section}>
          <div style={s.secEyebrow}>Gastos mensuales</div>
          <h2 style={s.secTitle}>¿Cuánto cuesta <em style={s.secEm}>vivir en Suiza?</em></h2>
          <p style={s.secSub}>Para entender si un salario es bueno, hay que ponerlo en contexto. Estos son los gastos fijos más habituales.</p>

          <table style={s.gastoTable}>
            <thead>
              <tr>
                <th style={s.gastoTh}>Gasto</th>
                <th style={s.gastoTh}>Zona</th>
                <th style={{ ...s.gastoTh, textAlign: "right" }}>Coste mensual</th>
              </tr>
            </thead>
            <tbody>
              {GASTOS.map((g, i) => (
                <tr key={i} style={s.gastoRow}>
                  <td style={s.gastoTd}>{g.concepto}</td>
                  <td style={{ ...s.gastoTd, color: "#999" }}>{g.ciudad}</td>
                  <td style={s.gastoTdPrice}>{g.precio}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: 16, padding: "12px 16px", background: "#f8f8f8", border: "1px solid #eee", fontSize: 13, color: "#888" }}>
            💡 Con un sueldo de camarero en Zúrich (~3.200 CHF neto) y viviendo en piso compartido, es realista ahorrar entre 800 y 1.200 CHF al mes.
          </div>
        </div>
      </div>

      {/* AVISO FINAL */}
      <div style={s.aviso}>
        <div style={s.avisoInner}>
          <div style={{ fontSize: 32 }}>🧮</div>
          <div>
            <div style={s.avisoTitle}>Calcula tu sueldo exacto</div>
            <p style={s.avisoText}>
              Los salarios que ves aquí son orientativos. Tu sueldo neto real depende de tu cantón, tu edad, si estás casado/a y el tipo de permiso. Usa nuestra calculadora para saber exactamente cuánto te quedará en el bolsillo.
            </p>
            <a href="/calculadora" style={{ display: "inline-block", marginTop: 16, padding: "12px 24px", background: "#c0392b", color: "white", fontSize: 13, fontWeight: 700, textDecoration: "none", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Ir a la calculadora →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
