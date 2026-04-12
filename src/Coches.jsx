import { useState } from "react";

const PASOS_MATRICULACION = [
  {
    num: "01",
    titulo: "Inspección técnica (MFK)",
    desc: "Todo vehículo importado debe pasar la inspección técnica cantonal (MFK). Lleva el coche al centro de inspección de tu cantón. Coste: 80–150 CHF según cantón.",
  },
  {
    num: "02",
    titulo: "Seguro obligatorio",
    desc: "Antes de matricular, necesitas contratar un seguro de responsabilidad civil (RC) con una aseguradora suiza. Es imprescindible para obtener las placas.",
  },
  {
    num: "03",
    titulo: "Registro en la Oficina de Tráfico cantonal",
    desc: "Acude a la Strassenverkehrsamt (o Service des automobiles) de tu cantón con toda la documentación. Recibirás las placas suizas y el permiso de circulación.",
  },
  {
    num: "04",
    titulo: "Pago del impuesto de circulación",
    desc: "Cada cantón cobra un impuesto anual basado en el peso, cilindrada o potencia. Va de 100 CHF a más de 1.000 CHF al año.",
  },
];

const DOCS_IMPORTACION = [
  "Título de propiedad (ficha técnica española o título de circulación)",
  "Pasaporte o DNI + permiso de residencia suizo",
  "Prueba del seguro RC suizo",
  "Factura de compra o prueba de pago de IVA en origen",
  "Certificado de conformidad europeo (CoC) si disponible",
];

const COSTES = [
  { concepto: "Inspección MFK", coste: "80–150 CHF", nota: "Única vez al importar" },
  { concepto: "Tasas de matriculación", coste: "60–120 CHF", nota: "Varía por cantón" },
  { concepto: "Placas de matrícula", coste: "30–50 CHF", nota: "Precio estándar" },
  { concepto: "Seguro RC anual (básico)", coste: "500–900 CHF", nota: "Según conductor y coche" },
  { concepto: "Impuesto de circulación anual", coste: "100–1.000+ CHF", nota: "Según cantón y vehículo" },
  { concepto: "Vigneta autovías", coste: "40 CHF/año", nota: "Obligatoria en autopistas" },
];

const CANALES_TELEGRAM = [
  {
    nombre: "Coches en Suiza",
    handle: "@cochesensuiza",
    url: "https://t.me/cochesensuiza",
    desc: "Compraventa de coches entre particulares en Suiza. Ofertas diarias, precios reales y sin intermediarios.",
    emoji: "🚗",
    color: "#c0392b",
  },
  {
    nombre: "Swissrus",
    handle: "@swissrus_ch",
    url: "https://t.me/swissrus_ch",
    desc: "Canal oficial de la comunidad. Noticias, cambios de ley, ofertas de empleo y consejos para vivir en Suiza.",
    emoji: "🇨🇭",
    color: "#2980b9",
  },
];

const CONSEJOS = [
  {
    icon: "🔍",
    titulo: "Dónde comprar coche en Suiza",
    desc: "Los portales más usados son tutti.ch, AutoScout24.ch y mobile.ch. Para coches de segunda mano entre particulares, el canal de Telegram @cochesensuiza tiene ofertas diarias.",
  },
  {
    icon: "📋",
    titulo: "Traer tu coche desde España",
    desc: "Si el coche lleva más de 6 meses a tu nombre antes de emigrar, puedes importarlo sin pagar IVA suizo (franquicia de mudanza). Tienes hasta 2 años desde tu llegada para solicitarlo.",
  },
  {
    icon: "🔄",
    titulo: "Placas personalizadas o transferibles",
    desc: "En la mayoría de cantones las placas van a la persona, no al coche. Si vendes el vehículo, te quedas con las placas. En Zúrich y algunos otros cantones, puedes reservar tu matrícula.",
  },
  {
    icon: "⚡",
    titulo: "Coches eléctricos e híbridos",
    desc: "Varios cantones ofrecen descuentos en el impuesto de circulación para vehículos eléctricos e híbridos enchufables. En Ginebra y Vaud los descuentos son especialmente generosos.",
  },
  {
    icon: "🅿️",
    titulo: "Aparcamiento en ciudades",
    desc: "Las zonas azules requieren un disco de aparcamiento (disponible en gasolineras y kioscos). En ciudades grandes, los abonos anuales en parkings públicos cuestan 150–400 CHF/mes.",
  },
  {
    icon: "❄️",
    titulo: "Neumáticos de invierno",
    desc: "No son obligatorios por ley, pero sí recomendados. Si tienes un accidente sin neumáticos de invierno en condiciones de nieve, el seguro puede reducir la cobertura. Temporada habitual: octubre–abril.",
  },
];

const s = {
  page: { fontFamily: "'Georgia', 'Times New Roman', serif", background: "#faf9f7", minHeight: "100vh" },
  hero: { background: "linear-gradient(135deg, #111 0%, #1a1a2e 100%)", color: "white", padding: "5rem 2rem 4rem" },
  heroInner: { maxWidth: 900, margin: "0 auto" },
  eyebrow: { fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#c0392b", marginBottom: 12, fontFamily: "'Segoe UI', sans-serif" },
  heroTitle: { fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: 16, letterSpacing: "-0.02em" },
  heroTitleEm: { color: "#c0392b", fontStyle: "italic" },
  heroSub: { fontSize: 16, color: "#aaa", lineHeight: 1.7, maxWidth: 600, fontFamily: "'Segoe UI', sans-serif", fontWeight: 300 },
  section: { maxWidth: 900, margin: "0 auto", padding: "4rem 2rem" },
  secEyebrow: { fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#c0392b", marginBottom: 8, fontFamily: "'Segoe UI', sans-serif" },
  secTitle: { fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 900, marginBottom: 8, letterSpacing: "-0.02em", color: "#111" },
  secTitleEm: { color: "#c0392b", fontStyle: "italic" },
  secSub: { fontSize: 14, color: "#888", marginBottom: 36, fontFamily: "'Segoe UI', sans-serif", lineHeight: 1.6 },
  divider: { maxWidth: 900, margin: "0 auto", padding: "0 2rem" },
  dividerLine: { border: "none", borderTop: "1px solid rgba(0,0,0,0.1)" },
};

function AdBanner({ variant = "horizontal" }) {
  if (variant === "box") {
    return (
      <div style={{
        border: "1px dashed #ddd",
        background: "#fdf9f8",
        borderRadius: 4,
        padding: "1.5rem",
        textAlign: "center",
        marginBottom: 32,
        position: "relative",
      }}>
        <div style={{ fontSize: 10, color: "#bbb", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8, fontFamily: "'Segoe UI', sans-serif" }}>
          Publicidad
        </div>
        <div style={{ fontSize: 15, color: "#999", fontFamily: "'Segoe UI', sans-serif" }}>
          ¿Tu empresa quiere llegar a españoles en Suiza?<br />
          <a href="mailto:hola@swissrus.ch" style={{ color: "#c0392b", textDecoration: "none", fontWeight: 600 }}>
            Anúnciate aquí →
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      border: "1px solid #e8e4e0",
      background: "linear-gradient(135deg, #fff 0%, #fdf9f8 100%)",
      borderRadius: 4,
      padding: "1.2rem 1.5rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 16,
      margin: "2rem 0",
      flexWrap: "wrap",
    }}>
      <div style={{ fontSize: 10, color: "#bbb", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "'Segoe UI', sans-serif", flexShrink: 0 }}>
        Pub
      </div>
      <div style={{ flex: 1, minWidth: 180 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#111", fontFamily: "Georgia, serif", marginBottom: 2 }}>
          ¿Compras o vendes un coche en Suiza?
        </div>
        <div style={{ fontSize: 12, color: "#888", fontFamily: "'Segoe UI', sans-serif" }}>
          Publica tu anuncio en @cochesensuiza — gratis para particulares
        </div>
      </div>
      <a
        href="https://t.me/cochesensuiza"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          background: "#c0392b", color: "white", padding: "0.5rem 1.2rem",
          borderRadius: 2, fontSize: 12, fontWeight: 700, textDecoration: "none",
          fontFamily: "'Segoe UI', sans-serif", whiteSpace: "nowrap", flexShrink: 0,
        }}
      >
        Ver anuncios →
      </a>
    </div>
  );
}

export default function Coches() {
  const [openPaso, setOpenPaso] = useState(null);

  return (
    <div style={s.page}>
      {/* HERO */}
      <div style={s.hero}>
        <div style={s.heroInner}>
          <div style={s.eyebrow}>Movilidad en Suiza</div>
          <h1 style={s.heroTitle}>
            Coches en <em style={s.heroTitleEm}>Suiza</em>
          </h1>
          <p style={s.heroSub}>
            Comprar, importar o matricular tu coche. Todo lo que necesitas saber sin perder tiempo en burocracia innecesaria.
          </p>
        </div>
      </div>

      {/* CANALES TELEGRAM */}
      <div style={s.section}>
        <div style={s.secEyebrow}>Comunidad</div>
        <h2 style={s.secTitle}>Canales de <em style={s.secTitleEm}>Telegram</em></h2>
        <p style={s.secSub}>Únete a la comunidad. Ofertas, consejos y novedades directamente en tu móvil.</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, marginBottom: 32 }}>
          {CANALES_TELEGRAM.map((canal) => (
            <a
              key={canal.handle}
              href={canal.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                background: "white",
                border: "1px solid rgba(0,0,0,0.09)",
                borderRadius: 4,
                padding: "1.8rem",
                textDecoration: "none",
                color: "inherit",
                transition: "box-shadow 0.2s, transform 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: "50%",
                  background: canal.color, display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 22, flexShrink: 0,
                }}>
                  {canal.emoji}
                </div>
                <div>
                  <div style={{ fontFamily: "Georgia, serif", fontSize: 16, fontWeight: 700, color: "#111" }}>
                    {canal.nombre}
                  </div>
                  <div style={{ fontSize: 12, color: canal.color, fontFamily: "'Segoe UI', sans-serif", fontWeight: 600 }}>
                    {canal.handle}
                  </div>
                </div>
              </div>
              <p style={{ fontSize: 13, color: "#666", fontFamily: "'Segoe UI', sans-serif", lineHeight: 1.6, marginBottom: 16 }}>
                {canal.desc}
              </p>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                background: canal.color, color: "white",
                padding: "0.45rem 1rem", borderRadius: 2,
                fontSize: 12, fontWeight: 700, fontFamily: "'Segoe UI', sans-serif",
              }}>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.008 9.456c-.148.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.08 14.514l-2.948-.924c-.64-.203-.654-.64.136-.947l11.527-4.443c.533-.194 1.001.13.767.048z"/>
                </svg>
                Unirse al canal
              </div>
            </a>
          ))}
        </div>

        {/* AD BANNER */}
        <AdBanner variant="horizontal" />
      </div>

      <div style={s.divider}><hr style={s.dividerLine} /></div>

      {/* PASOS MATRICULACIÓN */}
      <div style={s.section}>
        <div style={s.secEyebrow}>Proceso paso a paso</div>
        <h2 style={s.secTitle}>Importar o matricular <em style={s.secTitleEm}>tu coche</em></h2>
        <p style={s.secSub}>Si traes un coche desde España o lo compras de segunda mano, estos son los pasos para matricularlo en Suiza.</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 0, border: "1px solid rgba(0,0,0,0.09)", background: "white" }}>
          {PASOS_MATRICULACION.map((paso, i) => (
            <div
              key={paso.num}
              style={{
                borderBottom: i < PASOS_MATRICULACION.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none",
                padding: "1.4rem 1.6rem",
                cursor: "pointer",
                background: openPaso === i ? "#fdf3f2" : "white",
                transition: "background 0.15s",
              }}
              onClick={() => setOpenPaso(openPaso === i ? null : i)}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{
                  fontFamily: "Georgia, serif", fontSize: 11, fontWeight: 900,
                  color: "#c0392b", letterSpacing: "0.05em", flexShrink: 0,
                }}>
                  {paso.num}
                </div>
                <div style={{ fontFamily: "Georgia, serif", fontSize: 16, fontWeight: 700, color: "#111", flex: 1 }}>
                  {paso.titulo}
                </div>
                <div style={{ fontSize: 12, color: "#bbb", transition: "transform 0.2s", transform: openPaso === i ? "rotate(180deg)" : "none" }}>▼</div>
              </div>
              {openPaso === i && (
                <p style={{ margin: "1rem 0 0 2.5rem", fontSize: 14, color: "#555", fontFamily: "'Segoe UI', sans-serif", lineHeight: 1.7 }}>
                  {paso.desc}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div style={s.divider}><hr style={s.dividerLine} /></div>

      {/* DOCUMENTACIÓN */}
      <div style={s.section}>
        <div style={s.secEyebrow}>Documentación</div>
        <h2 style={s.secTitle}>Qué necesitas <em style={s.secTitleEm}>llevar</em></h2>
        <p style={s.secSub}>Para registrar un vehículo importado en la oficina de tráfico cantonal.</p>

        <div style={{ background: "white", border: "1px solid rgba(0,0,0,0.09)", padding: "1.6rem 2rem" }}>
          {DOCS_IMPORTACION.map((doc, i) => (
            <div key={i} style={{
              display: "flex", gap: 12, alignItems: "flex-start",
              padding: "0.8rem 0",
              borderBottom: i < DOCS_IMPORTACION.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none",
            }}>
              <span style={{ color: "#c0392b", fontSize: 14, marginTop: 2, flexShrink: 0 }}>✓</span>
              <span style={{ fontSize: 14, color: "#444", fontFamily: "'Segoe UI', sans-serif", lineHeight: 1.5 }}>{doc}</span>
            </div>
          ))}
        </div>

        {/* AD BOX */}
        <div style={{ marginTop: 32 }}>
          <AdBanner variant="box" />
        </div>
      </div>

      <div style={s.divider}><hr style={s.dividerLine} /></div>

      {/* COSTES */}
      <div style={s.section}>
        <div style={s.secEyebrow}>Presupuesto</div>
        <h2 style={s.secTitle}>Costes de <em style={s.secTitleEm}>matriculación</em></h2>
        <p style={s.secSub}>Estimación orientativa. Los precios varían entre cantones.</p>

        <div style={{ border: "1px solid rgba(0,0,0,0.09)", background: "white" }}>
          {COSTES.map((c, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "1.2rem 1.6rem", gap: 16, flexWrap: "wrap",
              borderBottom: i < COSTES.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none",
              background: i % 2 === 0 ? "white" : "#fdfcfb",
            }}>
              <div>
                <div style={{ fontFamily: "Georgia, serif", fontSize: 15, fontWeight: 700, color: "#111" }}>{c.concepto}</div>
                <div style={{ fontSize: 12, color: "#aaa", fontFamily: "'Segoe UI', sans-serif", marginTop: 2 }}>{c.nota}</div>
              </div>
              <div style={{ fontFamily: "Georgia, serif", fontSize: 18, fontWeight: 700, color: "#c0392b", flexShrink: 0 }}>
                {c.coste}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={s.divider}><hr style={s.dividerLine} /></div>

      {/* CONSEJOS */}
      <div style={s.section}>
        <div style={s.secEyebrow}>Guía práctica</div>
        <h2 style={s.secTitle}>Consejos <em style={s.secTitleEm}>útiles</em></h2>
        <p style={s.secSub}>Lo que nadie te cuenta sobre tener coche en Suiza.</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
          {CONSEJOS.map((c, i) => (
            <div key={i} style={{
              background: "white", border: "1px solid rgba(0,0,0,0.09)",
              padding: "1.6rem", borderRadius: 2,
            }}>
              <div style={{ fontSize: 24, marginBottom: 10 }}>{c.icon}</div>
              <div style={{ fontFamily: "Georgia, serif", fontSize: 15, fontWeight: 700, color: "#111", marginBottom: 8 }}>
                {c.titulo}
              </div>
              <p style={{ fontSize: 13, color: "#666", fontFamily: "'Segoe UI', sans-serif", lineHeight: 1.65 }}>
                {c.desc}
              </p>
            </div>
          ))}
        </div>

        {/* FINAL AD BANNER */}
        <div style={{ marginTop: 40 }}>
          <AdBanner variant="horizontal" />
        </div>
      </div>
    </div>
  );
}
