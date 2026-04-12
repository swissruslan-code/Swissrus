import { useState } from "react";

const PERMISOS = [
  {
    letra: "B",
    color: "#c0392b",
    titulo: "Residencia temporal",
    subtitulo: "El permiso más común para españoles",
    duracion: "5 años, renovable",
    para: "Contrato de trabajo de más de 12 meses",
    puntos: [
      "Tienes que registrarte en el ayuntamiento de tu ciudad o pueblo en los primeros 14 días. Es como el empadronamiento en España, pero obligatorio antes de poder hacer cualquier otro trámite",
      "Debes registrarte en el municipio en los primeros 14 días tras llegar a Suiza",
      "Es renovable indefinidamente mientras trabajes",
      "Después de 5 años con permiso B puedes solicitar el permiso C",
      "Tu familia (cónyuge e hijos) puede reagruparse contigo",
    ],
    docs: ["Pasaporte o DNI en vigor", "Contrato de trabajo firmado", "Confirmación de domicilio en Suiza", "Fotos de carnet"],
    nota: "Como ciudadano de la UE/AELE, tienes derecho a trabajar en Suiza gracias al Acuerdo de Libre Circulación de Personas (ALCP). El proceso es más sencillo que para ciudadanos de fuera de la UE.",
  },
  {
    letra: "C",
    color: "#e67e22",
    titulo: "Residencia permanente",
    subtitulo: "La meta después de 5 años",
    duracion: "Ilimitada",
    para: "Tras 5 años continuados con permiso B",
    puntos: [
      "Duración ilimitada — no necesitas renovarlo",
      "Puedes cambiar de trabajo o cantón sin trámites adicionales",
      "Acceso a todos los empleos públicos (excepto algunos que requieren ciudadanía)",
      "Base para solicitar la nacionalidad suiza tras 10 años de residencia",
      "Mucho más fácil acceder a créditos, alquileres y algunos servicios",
    ],
    docs: ["Permiso B vigente", "Prueba de 5 años de residencia continuada", "Pasaporte o DNI", "Sin antecedentes penales graves"],
    nota: "El permiso C te da prácticamente los mismos derechos que un ciudadano suizo, excepto el derecho a voto. Es el objetivo de la mayoría de españoles que se instalan a largo plazo.",
  },
  {
    letra: "G",
    color: "#27ae60",
    titulo: "Trabajador fronterizo",
    subtitulo: "Vives en el extranjero, trabajas en Suiza",
    duracion: "5 años, renovable",
    para: "Resides en Francia, Italia o Alemania y trabajas en Suiza",
    puntos: [
      "Debes regresar regularmente a tu domicilio en el país vecino (normalmente cada semana)",
      "Tu zona de residencia debe estar en la región fronteriza",
      "Fiscalmente, tributas en tu país de residencia (no en Suiza)",
      "Acceso a los mismos derechos laborales que un trabajador residente",
      "No tienes derecho a prestaciones suizas de desempleo",
    ],
    docs: ["DNI o pasaporte", "Prueba de residencia en zona fronteriza", "Contrato de trabajo suizo", "Fotos de carnet"],
    nota: "Si vives en España (no en zona fronteriza con Suiza) este permiso no aplica. Es específico para residentes en las regiones limítrofes de Francia, Italia y Alemania.",
  },
  {
    letra: "L",
    color: "#2980b9",
    titulo: "Residencia de corta duración",
    subtitulo: "Para contratos temporales",
    duracion: "Hasta 12 meses",
    para: "Contratos de trabajo inferiores a 12 meses",
    puntos: [
      "Válido para contratos de menos de 12 meses",
      "Se puede renovar si el contrato se prorroga",
      "Si el contrato supera los 12 meses, debes solicitar el permiso B",
      "Vinculado al empleador — si cambias de trabajo, debes actualizar el permiso",
      "Permite traer a la familia solo en casos excepcionales",
    ],
    docs: ["Pasaporte o DNI", "Contrato de trabajo temporal", "Confirmación de alojamiento"],
    nota: "El permiso L es habitual en hostelería, agricultura y trabajos de temporada. Muchos españoles llegan con un L y después consiguen el B al prolongar su contrato.",
  },
];

const PASOS = [
  { num: "01", titulo: "Encuentra trabajo", desc: "Sin contrato firmado no puedes solicitar el permiso. La oferta de trabajo es el primer paso." },
  { num: "02", titulo: "Busca alojamiento", desc: "Necesitas una dirección suiza para registrarte. Muchos empleadores ayudan con esto al principio." },
  { num: "03", titulo: "Regístrate en el ayuntamiento", desc: "Tienes 14 días desde tu llegada para ir al ayuntamiento de tu ciudad o pueblo y registrarte. Lleva el DNI o pasaporte, el contrato de trabajo y la confirmación de donde vas a vivir. Sin este paso no puedes hacer nada más." },
  { num: "04", titulo: "Solicita el permiso", desc: "El municipio tramita el permiso con la oficina cantonal de migración. Recibirás el documento físico en semanas." },
  { num: "05", titulo: "Contrata el seguro médico", desc: "Obligatorio desde el primer día. Tienes 3 meses para contratarlo, pero cubre desde tu fecha de llegada." },
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
};

function PermisoCard({ p, expanded, onToggle }) {
  return (
    <div
      onClick={onToggle}
      style={{
        border: `1px solid ${expanded ? p.color : "#e8e8e8"}`,
        borderRadius: 4,
        background: "white",
        marginBottom: 12,
        overflow: "hidden",
        cursor: "pointer",
        transition: "border-color 0.2s, box-shadow 0.2s",
        boxShadow: expanded ? `0 4px 20px rgba(0,0,0,0.08)` : "none",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 20, padding: "1.5rem 2rem" }}>
        <div style={{
          width: 56, height: 56, borderRadius: 2,
          background: p.color, color: "white",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 28, fontWeight: 900, flexShrink: 0,
        }}>{p.letra}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#111", marginBottom: 2 }}>{p.titulo}</div>
          <div style={{ fontSize: 13, color: "#888", fontFamily: "'Segoe UI', sans-serif" }}>{p.subtitulo}</div>
        </div>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div style={{ fontSize: 12, color: p.color, fontWeight: 700, fontFamily: "'Segoe UI', sans-serif", textTransform: "uppercase", letterSpacing: "0.06em" }}>{p.duracion}</div>
          <div style={{ fontSize: 11, color: "#bbb", fontFamily: "'Segoe UI', sans-serif", marginTop: 2 }}>
            {expanded ? "▲ cerrar" : "▼ ver más"}
          </div>
        </div>
      </div>

      {/* Expandido */}
      {expanded && (
        <div style={{ borderTop: `2px solid ${p.color}`, padding: "1.5rem 2rem", background: "#fefefe" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 20 }}>
            {/* Para quién */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#bbb", fontFamily: "'Segoe UI', sans-serif", marginBottom: 8 }}>Para quién</div>
              <div style={{ fontSize: 14, color: "#444", fontFamily: "'Segoe UI', sans-serif", lineHeight: 1.6 }}>{p.para}</div>
            </div>
            {/* Documentos */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#bbb", fontFamily: "'Segoe UI', sans-serif", marginBottom: 8 }}>Documentos necesarios</div>
              <ul style={{ margin: 0, paddingLeft: 16 }}>
                {p.docs.map(d => (
                  <li key={d} style={{ fontSize: 13, color: "#555", fontFamily: "'Segoe UI', sans-serif", marginBottom: 4, lineHeight: 1.5 }}>{d}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Puntos clave */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#bbb", fontFamily: "'Segoe UI', sans-serif", marginBottom: 10 }}>Puntos clave</div>
            {p.puntos.map(pt => (
              <div key={pt} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}>
                <span style={{ color: p.color, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>→</span>
                <span style={{ fontSize: 14, color: "#444", fontFamily: "'Segoe UI', sans-serif", lineHeight: 1.5 }}>{pt}</span>
              </div>
            ))}
          </div>

          {/* Nota */}
          <div style={{ background: "#f8f4f3", border: `1px solid rgba(${p.color === "#c0392b" ? "192,57,43" : "0,0,0"},0.1)`, padding: "12px 16px", borderRadius: 2 }}>
            <span style={{ fontSize: 12, color: "#666", fontFamily: "'Segoe UI', sans-serif", lineHeight: 1.6 }}>💡 {p.nota}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Permisos() {
  const [expanded, setExpanded] = useState("B");

  return (
    <div style={s.page}>
      {/* HERO */}
      <div style={s.hero}>
        <div style={s.heroInner}>
          <div style={s.eyebrow}>Documentación · Swissrus</div>
          <h1 style={s.heroTitle}>
            Permisos de <em style={s.heroTitleEm}>residencia</em>
          </h1>
          <p style={s.heroSub}>
            Como ciudadano español tienes derecho a vivir y trabajar en Suiza. Aquí tienes los 4 tipos de permiso explicados de forma clara, con todo lo que necesitas saber antes de llegar.
          </p>
        </div>
      </div>

      {/* PERMISOS */}
      <div style={s.section}>
        <div style={s.secEyebrow}>Los 4 permisos</div>
        <h2 style={s.secTitle}>¿Qué permiso <em style={s.secTitleEm}>necesitas?</em></h2>
        <p style={s.secSub}>Haz clic en cada permiso para ver todos los detalles, documentos y requisitos.</p>

        {PERMISOS.map(p => (
          <PermisoCard
            key={p.letra}
            p={p}
            expanded={expanded === p.letra}
            onToggle={() => setExpanded(expanded === p.letra ? null : p.letra)}
          />
        ))}
      </div>

      {/* DIVIDER */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 2rem" }}>
        <hr style={{ border: "none", borderTop: "1px solid #e8e8e8" }} />
      </div>

      {/* PASOS */}
      <div style={s.section}>
        <div style={s.secEyebrow}>Proceso paso a paso</div>
        <h2 style={s.secTitle}>Cómo registrarse <em style={s.secTitleEm}>al llegar</em></h2>
        <p style={s.secSub}>El proceso desde que aterrizas hasta que tienes el permiso físico en la mano.</p>

        <div style={{ position: "relative" }}>
          {PASOS.map((paso, i) => (
            <div key={paso.num} style={{
              display: "flex", gap: 24, marginBottom: 0,
              position: "relative",
            }}>
              {/* Línea vertical */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 2,
                  background: i === 0 ? "#c0392b" : "#111",
                  color: "white", display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 13, fontWeight: 800,
                  fontFamily: "'Segoe UI', sans-serif", flexShrink: 0,
                }}>{paso.num}</div>
                {i < PASOS.length - 1 && (
                  <div style={{ width: 1, flex: 1, minHeight: 32, background: "#e0e0e0", margin: "4px 0" }} />
                )}
              </div>
              {/* Contenido */}
              <div style={{ paddingBottom: i < PASOS.length - 1 ? 24 : 0, paddingTop: 10 }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#111", marginBottom: 4 }}>{paso.titulo}</div>
                <div style={{ fontSize: 14, color: "#666", fontFamily: "'Segoe UI', sans-serif", lineHeight: 1.6 }}>{paso.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AVISO */}
      <div style={{ background: "#111", color: "white", padding: "3rem 2rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
          <div style={{ fontSize: 32 }}>⚠️</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 8 }}>Importante: seguro médico obligatorio desde el día 1</div>
            <div style={{ fontSize: 14, color: "#aaa", lineHeight: 1.7, fontFamily: "'Segoe UI', sans-serif", maxWidth: 600 }}>
              En cuanto te registras en Suiza, el seguro médico LAMal es obligatorio. Tienes 3 meses para contratarlo, pero cubre desde tu fecha de llegada. Si lo contratas tarde, pagas igualmente desde el inicio. Usa <strong style={{ color: "white" }}>priminfo.ch</strong> para comparar precios por cantón.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
