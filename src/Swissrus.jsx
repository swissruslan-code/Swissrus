import { useState, useEffect } from "react";

const ERRORES = [
  { icon: "❌", titulo: "Aceptar trabajos mal pagados", desc: "Sin saber los salarios reales, muchos aceptan 20-30% menos de lo que merecen" },
  { icon: "❌", titulo: "Pagar alquileres desorbitados", desc: "Sin conocer el mercado, pierdes miles de CHF en el primer año" },
  { icon: "❌", titulo: "Comprar coches sin saber el mercado", desc: "Los precios en Suiza tienen trampa. La mayoría cae en el mismo error" },
];

const AREAS = [
  { icon: "📋", title: "Permisos de residencia", desc: "B, C, G y L explicados de forma clara.", page: "permisos" },
  { icon: "💼", title: "Empleo", desc: "Portales de trabajo, ETTs y consejos", page: "empleo" },
  { icon: "🏠", title: "Vivienda", desc: "Cómo buscar piso y entender el contrato", page: null },
  { icon: "🚗", title: "Coches", desc: "Comprar, matricular o traer tu coche", page: "coches" },
  { icon: "⚕️", title: "Sanidad", desc: "LAMal, franquicia y cómo ir al médico", page: "sanidad" },
  { icon: "🧮", title: "Calculadora", desc: "26 cantones · Quellensteuer · BVG", page: "calculadora" },
  { icon: "📊", title: "Impuestos", desc: "Quellensteuer, IRPF y declaración", page: null },
  { icon: "🏛️", title: "Pensiones", desc: "Los 3 pilares y recuperar el 2.º", page: "pensiones" },
  { icon: "✈️", title: "Vuelta a España", desc: "Baja consular y trámites al volver", page: null },
];

const STATS = [
  { num: "+100.000", label: "personas interesadas en vivir en Suiza" },
  { num: "26", label: "cantones con info actualizada 2026" },
  { num: "6-8k", label: "CHF salario medio mensual" },
];

export default function Swissrus({ onNavigate }) {
  const [visible, setVisible] = useState(false);
  const [emailLeadMagnet, setEmailLeadMagnet] = useState("");

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <div style={{ fontFamily: "'Segoe UI', Arial, sans-serif", background: "#0a0a0a", color: "white", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700&family=Source+Sans+3:wght@300;400;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .hero-bg { position: relative; min-height: 100vh; background: linear-gradient(135deg, #0a0a0a 0%, #1a0505 50%, #0a0a0a 100%); overflow: hidden; display: flex; align-items: center; }
        .hero-bg::before { content: ''; position: absolute; inset: 0; background: url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=80') center/cover; opacity: 0.25; z-index: 0; }
        .hero-bg::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to right, rgba(10,10,10,0.95) 40%, rgba(10,10,10,0.4) 100%); z-index: 1; }
        .hero-content { position: relative; z-index: 2; max-width: 1100px; margin: 0 auto; padding: 6rem 2rem 4rem; width: 100%; }
        .badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(192,57,43,0.2); border: 1px solid rgba(192,57,43,0.5); padding: 6px 14px; border-radius: 100px; font-size: 12px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #e74c3c; margin-bottom: 1.5rem; }
        .hero-title { font-family: 'Oswald', sans-serif; font-size: clamp(2.8rem, 6vw, 5rem); font-weight: 700; line-height: 1.05; letter-spacing: -0.02em; margin-bottom: 1.5rem; text-transform: uppercase; }
        .hero-title .accent { color: #e74c3c; display: block; }
        .hero-sub { font-size: 1.1rem; color: #aaa; line-height: 1.7; max-width: 480px; margin-bottom: 2.5rem; font-weight: 300; }
        .hero-btns { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 3rem; }
        .btn-red { background: #c0392b; color: white; padding: 1rem 2rem; font-family: 'Oswald', sans-serif; font-size: 1rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; border: none; cursor: pointer; text-decoration: none; display: inline-block; transition: all 0.2s; }
        .btn-red:hover { background: #a93226; transform: translateY(-2px); }
        .btn-dark { background: rgba(255,255,255,0.08); color: white; padding: 1rem 2rem; font-family: 'Oswald', sans-serif; font-size: 1rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; border: 1px solid rgba(255,255,255,0.2); cursor: pointer; text-decoration: none; display: inline-block; transition: all 0.2s; }
        .btn-dark:hover { background: rgba(255,255,255,0.15); }
        .btn-green { background: #27ae60; color: white; padding: 1rem 2rem; font-family: 'Oswald', sans-serif; font-size: 1rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; border: none; cursor: pointer; text-decoration: none; display: inline-block; transition: all 0.2s; }
        .btn-green:hover { background: #219a52; }
        .stats-bar { display: flex; gap: 2rem; flex-wrap: wrap; }
        .stat-num { font-family: 'Oswald', sans-serif; font-size: 1.8rem; font-weight: 700; color: #e74c3c; line-height: 1; }
        .stat-label { font-size: 11px; color: #666; text-transform: uppercase; letter-spacing: 0.06em; margin-top: 4px; max-width: 120px; line-height: 1.3; }
        .errores-section { background: white; color: #111; padding: 5rem 2rem; }
        .errores-inner { max-width: 1100px; margin: 0 auto; }
        .section-badge { display: inline-flex; align-items: center; gap: 8px; background: #fdf0ef; border: 1px solid #e74c3c; padding: 5px 12px; border-radius: 100px; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #e74c3c; margin-bottom: 1.2rem; }
        .section-title { font-family: 'Oswald', sans-serif; font-size: clamp(2rem, 4vw, 3rem); font-weight: 700; text-transform: uppercase; line-height: 1.1; margin-bottom: 0.8rem; color: #111; }
        .section-title .accent { color: #e74c3c; }
        .section-sub { font-size: 1rem; color: #777; margin-bottom: 3rem; max-width: 600px; }
        .errores-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-bottom: 2.5rem; }
        .error-card { border: 2px solid #f5f5f5; padding: 1.8rem; border-radius: 4px; transition: border-color 0.2s; }
        .error-card:hover { border-color: #e74c3c; }
        .error-icon { font-size: 1.5rem; margin-bottom: 0.8rem; }
        .error-titulo { font-family: 'Oswald', sans-serif; font-size: 1.1rem; font-weight: 600; color: #111; margin-bottom: 0.5rem; text-transform: uppercase; }
        .error-desc { font-size: 0.88rem; color: #888; line-height: 1.6; }
        .leadmagnet { background: linear-gradient(135deg, #1a0505 0%, #c0392b 100%); padding: 4rem 2rem; position: relative; overflow: hidden; }
        .leadmagnet-inner { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; position: relative; z-index: 1; }
        .leadmagnet-book { background: white; padding: 2rem 1.5rem; border-radius: 8px; text-align: center; max-width: 240px; box-shadow: 0 20px 60px rgba(0,0,0,0.4); transform: rotate(-3deg); }
        .book-emoji { font-size: 3rem; margin-bottom: 0.8rem; }
        .book-title { font-family: 'Oswald', sans-serif; font-size: 1.1rem; color: #111; font-weight: 700; text-transform: uppercase; line-height: 1.3; margin-bottom: 0.5rem; }
        .book-subtitle { font-size: 0.8rem; color: #c0392b; font-weight: 600; }
        .leadmagnet-form input { width: 100%; padding: 1rem 1.2rem; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.3); color: white; font-size: 0.95rem; outline: none; margin-bottom: 12px; border-radius: 2px; }
        .leadmagnet-form input::placeholder { color: rgba(255,255,255,0.4); }
        .coches-section { background: #0f0f0f; padding: 5rem 2rem; }
        .coches-inner { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
        .coches-img { position: relative; border-radius: 4px; overflow: hidden; aspect-ratio: 4/3; }
        .coches-img img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.8); }
        .areas-section { background: #111; padding: 5rem 2rem; }
        .areas-inner { max-width: 1100px; margin: 0 auto; }
        .areas-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.05); margin-top: 2.5rem; }
        .area-card { background: #111; padding: 1.8rem; cursor: pointer; transition: background 0.2s; border-bottom: 2px solid transparent; }
        .area-card:hover { background: #1a1a1a; border-bottom-color: #e74c3c; }
        .area-icon { font-size: 1.8rem; margin-bottom: 0.8rem; }
        .area-title { font-family: 'Oswald', sans-serif; font-size: 1rem; font-weight: 600; text-transform: uppercase; color: white; margin-bottom: 0.3rem; letter-spacing: 0.03em; }
        .area-desc { font-size: 0.82rem; color: #666; line-height: 1.5; }
        .final-cta { background: #0a0a0a; padding: 6rem 2rem; text-align: center; position: relative; overflow: hidden; }
        .final-cta::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at center, rgba(192,57,43,0.15) 0%, transparent 70%); }
        .final-cta-inner { position: relative; z-index: 1; max-width: 700px; margin: 0 auto; }
        .rocket { font-size: 3rem; margin-bottom: 1rem; display: block; }
        .telegram-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 12px; margin: 2rem 0; }
        .telegram-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 1.4rem; text-decoration: none; color: inherit; display: flex; gap: 12px; align-items: flex-start; transition: background 0.2s; }
        .telegram-card:hover { background: rgba(255,255,255,0.08); }
        .ad-banner { background: #f8f8f8; border-top: 3px solid #e74c3c; padding: 1rem 2rem; display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
        footer { background: #050505; border-top: 1px solid rgba(255,255,255,0.05); padding: 2rem; text-align: center; }
        @media (max-width: 768px) {
          .errores-grid { grid-template-columns: 1fr; }
          .leadmagnet-inner { grid-template-columns: 1fr; }
          .coches-inner { grid-template-columns: 1fr; }
          .areas-grid { grid-template-columns: repeat(2, 1fr); }
          .hero-btns { flex-direction: column; }
          .leadmagnet-book { display: none; }
        }
      `}</style>

      <div className="hero-bg">
        <div className="hero-content">
          <div className="badge">🇨🇭 Informacion actualizada 2026</div>
          <h1 className="hero-title" style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(30px)", transition: "all 0.8s ease" }}>
            Antes de venir<br />a Suiza, lee esto
            <span className="accent">Te puede ahorrar<br />miles de euros</span>
          </h1>
          <p className="hero-sub" style={{ opacity: visible ? 1 : 0, transition: "all 0.8s ease 0.2s" }}>
            Trabajo, vivienda, permisos y errores reales que nadie te cuenta. Guia gratuita para hispanohablantes.
          </p>
          <div className="hero-btns" style={{ opacity: visible ? 1 : 0, transition: "all 0.8s ease 0.4s" }}>
            <button className="btn-red" onClick={() => onNavigate && onNavigate("permisos")}>VER GUIA GRATIS</button>
            <button className="btn-dark" onClick={() => onNavigate && onNavigate("calculadora")}>CALCULA CUANTO GANARAS EN SUIZA</button>
          </div>
          <div className="stats-bar" style={{ opacity: visible ? 1 : 0, transition: "all 0.8s ease 0.6s" }}>
            {STATS.map((s, i) => (
              <div key={i}>
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: "#e74c3c", padding: "0.8rem 2rem", textAlign: "center" }}>
        <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
          ⭐ +100.000 personas interesadas en vivir en Suiza &nbsp;|&nbsp; 🇨🇭 Informacion actualizada 2026
        </span>
      </div>

      <div className="errores-section">
        <div className="errores-inner">
          <div className="section-badge">⚠️ Atencion</div>
          <h2 className="section-title">La mayoria <span className="accent">pierde dinero</span><br />al llegar a Suiza</h2>
          <p className="section-sub">Sin la informacion correcta, los primeros meses en Suiza pueden costarte mucho mas de lo necesario.</p>
          <div className="errores-grid">
            {ERRORES.map((e, i) => (
              <div key={i} className="error-card">
                <div className="error-icon">{e.icon}</div>
                <div className="error-titulo">{e.titulo}</div>
                <div className="error-desc">{e.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center" }}>
            <button className="btn-red" onClick={() => onNavigate && onNavigate("permisos")} style={{ borderRadius: 4 }}>
              EVITA ESTOS ERRORES CON INFORMACION REAL
            </button>
          </div>
        </div>
      </div>

      <div className="leadmagnet">
        <div className="leadmagnet-inner">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="leadmagnet-book">
              <div className="book-emoji">📋</div>
              <div className="book-title">7 errores que te pueden hacer perder mas de 3.000 CHF en Suiza</div>
              <div className="book-subtitle">GUIA GRATUITA 2026</div>
            </div>
          </div>
          <div>
            <div className="section-badge" style={{ background: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.3)", color: "white" }}>✉️ Descarga gratis</div>
            <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700, textTransform: "uppercase", lineHeight: 1.1, marginBottom: "1rem", color: "white" }}>
              7 errores que te pueden hacer perder mas de
              <span style={{ color: "#ffd700", display: "block" }}>3.000 CHF en Suiza</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "1.5rem", fontSize: "0.95rem", lineHeight: 1.7 }}>Recibe la guia completa en tu email. Gratuita. Sin spam.</p>
                <div className="leadmagnet-form">
                  <iframe
                    width="100%"
                    height="120"
                    src="https://a325486d.sibforms.com/serve/MUIFAGykwMByyexXVJgESqkNJEDGE1Q_d8cxd50-tYWyuIS_vbtu3cF88WTgLF1guqc3RURsj4wLCmctIOfgQmhYrW0qjJ3SAKjublw_55W-wTqRsjMXg-orSTuwG10E3ZbctpNRcpQySt_2ZPGLvaQOblxrtdQOEh8qd8gKgvmt247vlLIYrMXUoa8R3z1MsWYb1GDSZ3-pcnEZGQ=="
                    frameBorder="0"
                    scrolling="auto"
                    style={{display:"block",marginLeft:"auto",marginRight:"auto",maxWidth:"100%",filter:"invert(1) hue-rotate(180deg)"}}
                  ></iframe>
                </div>




        </div>
      </div>

      <div className="coches-section">
        <div className="coches-inner">
          <div>
            <div className="section-badge" style={{ background: "rgba(192,57,43,0.15)", borderColor: "rgba(192,57,43,0.4)", color: "#e74c3c" }}>🚗 Coches reales en Suiza</div>
            <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 700, textTransform: "uppercase", lineHeight: 1.1, marginBottom: "1rem", color: "white" }}>
              Coches <span style={{ color: "#e74c3c" }}>reales</span> en Suiza<br />(sin humo)
            </h2>
            <p style={{ color: "#888", fontSize: "1rem", lineHeight: 1.7, marginBottom: "2rem" }}>Analizamos coches, precios reales y te decimos si vale la pena o no. Evita comprar mal y perder dinero.</p>
            <button className="btn-red" onClick={() => onNavigate && onNavigate("coches")}>VER COCHES DISPONIBLES</button>
            <div style={{ marginTop: "1.5rem" }}>
              <a href="https://t.me/cochesensuiza" target="_blank" rel="noopener noreferrer" style={{ color: "#e74c3c", textDecoration: "none", fontSize: 13, fontWeight: 600 }}>📲 @cochesensuiza en Telegram</a>
            </div>
          </div>
          <div className="coches-img">
            <img src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80" alt="Coche" />
          </div>
        </div>
      </div>

      <div className="ad-banner">
        <div style={{ fontSize: 9, color: "#bbb", textTransform: "uppercase", letterSpacing: "0.12em" }}>Publicidad</div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 15, fontWeight: 700, color: "#111", textTransform: "uppercase" }}>Tu empresa trabaja con hispanohablantes en Suiza?</div>
          <div style={{ fontSize: 12, color: "#999" }}>Gestoria, seguros, mudanzas — llega a miles de lectores</div>
        </div>
        <a href="mailto:hola@swissrus.ch" style={{ background: "#c0392b", color: "white", padding: "0.6rem 1.4rem", fontSize: 12, fontWeight: 700, textDecoration: "none", textTransform: "uppercase" }}>ANUNCIATE</a>
      </div>

      <div className="areas-section">
        <div className="areas-inner">
          <div className="section-badge" style={{ background: "rgba(192,57,43,0.15)", borderColor: "rgba(192,57,43,0.4)", color: "#e74c3c" }}>📚 Guias completas</div>
          <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700, textTransform: "uppercase", lineHeight: 1.1, color: "white" }}>
            Todo lo que necesitas saber<br /><span style={{ color: "#e74c3c" }}>antes de llegar</span>
          </h2>
          <div className="areas-grid">
            {AREAS.map((a) => (
              <div key={a.title} className="area-card" onClick={() => { if (a.page && onNavigate) onNavigate(a.page); }}>
                <div className="area-icon">{a.icon}</div>
                <div className="area-title">{a.title}</div>
                <div className="area-desc">{a.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="final-cta">
        <div className="final-cta-inner">
          <span className="rocket">🚀</span>
          <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 700, textTransform: "uppercase", lineHeight: 1.1, marginBottom: "1rem" }}>
            Venir a Suiza sin informacion<br /><span style={{ color: "#e74c3c" }}>cuesta dinero</span>
          </h2>
          <p style={{ color: "#aaa", fontSize: "1rem", marginBottom: "2rem", lineHeight: 1.7 }}>Unete a la comunidad de hispanohablantes en Suiza.</p>
          <div className="telegram-grid">
            <a href="https://t.me/cochesensuiza" target="_blank" rel="noopener noreferrer" className="telegram-card">
              <div style={{ fontSize: 28 }}>🚗</div>
              <div>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 15, fontWeight: 600, color: "white", textTransform: "uppercase" }}>Coches en Suiza</div>
                <div style={{ fontSize: 12, color: "#e74c3c", fontWeight: 600, margin: "4px 0" }}>@cochesensuiza</div>
                <div style={{ fontSize: 12, color: "#666" }}>Compraventa entre particulares. Ofertas diarias.</div>
              </div>
            </a>
          </div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: "1rem" }}>
            <button className="btn-red" onClick={() => onNavigate && onNavigate("permisos")}>VER GUIA GRATIS</button>
          </div>
        </div>
      </div>

      <footer>
        <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.8rem", letterSpacing: "0.05em" }}>
          SWISS<span style={{ color: "#e74c3c" }}>RUS</span>
        </div>
        <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "1rem" }}>
          {["Permisos", "Salarios", "Sanidad", "Pensiones", "Coches", "Empleo", "Aviso legal"].map(l => (
            <a key={l} href="#" style={{ fontSize: 12, color: "#555", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.06em" }}>{l}</a>
          ))}
        </div>
        <p style={{ fontSize: 11, color: "#333" }}>2025-2026 Swissrus · Informacion orientativa · Hecho con ❤️ para hispanohablantes en Suiza</p>
      </footer>
    </div>
  );
}
