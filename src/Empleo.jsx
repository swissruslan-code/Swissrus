const PORTALES = [
  {
    categoria: "⭐ Los más usados en Suiza",
    items: [
      { nombre: "jobs.ch", desc: "El portal más grande de Suiza. Todas las profesiones y cantones.", url: "https://www.jobs.ch", idioma: "DE / FR / EN" },
      { nombre: "Indeed Suiza", desc: "Motor de búsqueda global. Gran volumen de ofertas suizas.", url: "https://ch.indeed.com", idioma: "DE / FR / EN" },
      { nombre: "LinkedIn Jobs", desc: "Ideal para perfiles profesionales y networking directo con empresas.", url: "https://www.linkedin.com/jobs", idioma: "EN / DE / FR" },
      { nombre: "jobup.ch", desc: "El mejor para Suiza francesa: Ginebra, Lausana, Vaud.", url: "https://www.jobup.ch", idioma: "FR / DE" },
      { nombre: "jobscout24.ch", desc: "Amplia cobertura nacional con filtros avanzados.", url: "https://www.jobscout24.ch", idioma: "DE / FR / EN" },
      { nombre: "arbeit.swiss", desc: "Portal oficial del gobierno suizo (RAV). Gratuito y fiable.", url: "https://www.arbeit.swiss", idioma: "DE / FR / IT / EN" },
    ],
  },
  {
    categoria: "🔍 Generalistas",
    items: [
      { nombre: "jobwinner.ch", desc: "Agregador suizo con ofertas de múltiples fuentes.", url: "https://www.jobwinner.ch", idioma: "FR / DE" },
      { nombre: "monster.ch", desc: "Portal internacional con presencia sólida en Suiza.", url: "https://www.monster.ch", idioma: "DE / FR / EN" },
      { nombre: "stepstone.ch", desc: "Fuerte en perfiles cualificados y puestos de dirección.", url: "https://www.stepstone.ch", idioma: "DE / FR / EN" },
      { nombre: "alpha.ch", desc: "Portal suizo en alemán, fuerte en Suiza germana.", url: "https://www.alpha.ch", idioma: "DE" },
      { nombre: "stellen.ch", desc: "Gran volumen de ofertas en Suiza alemana.", url: "https://www.stellen.ch", idioma: "DE" },
      { nombre: "XING Jobs", desc: "LinkedIn alemán. Muy usado en Suiza germana.", url: "https://www.xing.com/jobs", idioma: "DE" },
      { nombre: "Glassdoor Suiza", desc: "Ofertas con salarios reales y reviews de empleados.", url: "https://www.glassdoor.com/Jobs/Switzerland", idioma: "EN / DE" },
      { nombre: "totaljobs.com", desc: "Portal internacional con ofertas en Suiza.", url: "https://www.totaljobs.com", idioma: "EN" },
      { nombre: "jobs.nzz.ch", desc: "Portal del diario NZZ, fuerte en perfiles cualificados.", url: "https://jobs.nzz.ch", idioma: "DE" },
    ],
  },
  {
    categoria: "🌐 Organismos oficiales e internacionales",
    items: [
      { nombre: "EURES Europa", desc: "Portal de la UE. Válido con permiso de trabajo europeo.", url: "https://eures.europa.eu", idioma: "Multi" },
      { nombre: "Naciones Unidas (ONU)", desc: "Vacantes en organismos de la ONU en Ginebra y Berna.", url: "https://careers.un.org", idioma: "EN / FR" },
      { nombre: "CICR / Cruz Roja", desc: "Carreras en el Comité Internacional de la Cruz Roja.", url: "https://www.icrc.org/en/careers", idioma: "EN / FR" },
      { nombre: "OMC / WTO", desc: "Vacantes en la Organización Mundial del Comercio.", url: "https://www.wto.org/english/thewto_e/vacan_e/vacan_e.htm", idioma: "EN / FR" },
      { nombre: "Ginebra Internacional", desc: "ONG y organismos internacionales con sede en Ginebra.", url: "https://www.genevainternational.org/jobs", idioma: "EN / FR" },
    ],
  },
  {
    categoria: "💻 Tecnología e IT",
    items: [
      { nombre: "swissdevjobs.ch", desc: "Especializado en developers e ingenieros IT en Suiza.", url: "https://swissdevjobs.ch", idioma: "EN" },
      { nombre: "technojobs / Suiza", desc: "Perfiles tech con foco en Suiza.", url: "https://www.technojobs.co.uk/switzerland", idioma: "EN" },
      { nombre: "Darwin Recruitment", desc: "Headhunting para perfiles tech y finanzas en Suiza.", url: "https://www.darwinrecruitment.com", idioma: "EN" },
    ],
  },
  {
    categoria: "🏨 Hostelería y trabajo de temporada",
    items: [
      { nombre: "hotelcareer.com", desc: "Hoteles, restaurantes y turismo en toda Suiza.", url: "https://www.hotelcareer.com", idioma: "DE / FR / EN" },
      { nombre: "seasonworkers.com", desc: "Trabajo de temporada en estaciones de esquí suizas.", url: "https://www.seasonworkers.com", idioma: "EN" },
    ],
  },
  {
    categoria: "🏢 Agencias de trabajo temporal (ETT)",
    items: [
      { nombre: "Adecco Suiza", desc: "Una de las mayores ETT. Industria, logística y oficinas.", url: "https://www.adecco.ch", idioma: "DE / FR / EN" },
      { nombre: "Manpower Suiza", desc: "Agencia global con fuerte presencia en todos los perfiles.", url: "https://www.manpower.ch", idioma: "DE / FR / EN" },
      { nombre: "Robert Walters", desc: "Headhunting senior: finanzas, legal, tech, RRHH.", url: "https://www.robertwalters.ch", idioma: "EN / DE / FR" },
      { nombre: "Swisslinx", desc: "Especialistas en banca y finanzas en Suiza.", url: "https://www.swisslinx.com", idioma: "EN" },
    ],
  },
  {
    categoria: "🔬 Salud, ciencia y farmacéutica",
    items: [
      { nombre: "eurosciencejobs.com", desc: "Investigación, ciencia y pharma en Suiza y Europa.", url: "https://www.eurosciencejobs.com", idioma: "EN" },
      { nombre: "diversityinresearch.careers", desc: "Farmacéuticas y biotecnología en Suiza (Basilea, Zúrich).", url: "https://diversityinresearch.careers", idioma: "EN" },
    ],
  },
  {
    categoria: "✈️ Para expatriados (en inglés)",
    items: [
      { nombre: "Expatica Jobs", desc: "Diseñado para expatriados. Muchas ofertas en inglés.", url: "https://www.expatica.com/ch/working/job-search/", idioma: "EN" },
      { nombre: "The Local CH", desc: "Portal en inglés para la comunidad extranjera en Suiza.", url: "https://www.thelocal.ch/jobs", idioma: "EN" },
      { nombre: "jobsingeneva.com", desc: "Especializado en Ginebra para perfiles internacionales.", url: "https://www.jobsingeneva.com", idioma: "EN / FR" },
      { nombre: "jobsinzurich.com", desc: "Especializado en Zúrich para perfiles en inglés.", url: "https://www.jobsinzurich.com", idioma: "EN" },
      { nombre: "toplanguagejobs.com", desc: "Empleos que requieren idiomas. Útil si hablas español.", url: "https://www.toplanguagejobs.com", idioma: "EN / Multi" },
    ],
  },
];

const CONSEJOS = [
  { icon: "🇩🇪", texto: "En Suiza alemana busca también en alemán: 'Krankenpfleger' (enfermero), 'Ingenieur', 'Verkäufer'. Muchas ofertas no se traducen al inglés." },
  { icon: "📄", texto: "El CV suizo debe ser breve (1–2 páginas), con fechas exactas y carta de motivación. Sin foto en muchos sectores." },
  { icon: "🏛️", texto: "arbeit.swiss es el portal oficial del gobierno. Si estás desempleado y registrado en el RAV, úsalo obligatoriamente." },
  { icon: "💰", texto: "El 13.º mes es casi estándar en Suiza. Cuéntalo al calcular tu sueldo real anual (usa la Calculadora de Swissrus)." },
  { icon: "🌍", texto: "Para Ginebra y puestos internacionales busca en inglés y francés. La mayoría de ONG exigen inglés fluido." },
  { icon: "📋", texto: "Sin permiso de trabajo válido (B, G, L o C) no puedes trabajar legalmente. Consigue el permiso antes de empezar." },
];

export default function Empleo() {
  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "white", fontFamily: "'Segoe UI', Arial, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700&display=swap');
        .emp-hero { padding: 4rem 2rem 3rem; background: linear-gradient(180deg, #0d150d 0%, #0a0a0a 100%); }
        .emp-inner { max-width: 1100px; margin: 0 auto; }
        .emp-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(39,174,96,0.1); border: 1px solid rgba(39,174,96,0.2); padding: 6px 14px; border-radius: 2px; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #27ae60; margin-bottom: 20px; }
        .emp-title { font-family: 'Oswald', sans-serif; font-size: clamp(2rem, 5vw, 3.8rem); font-weight: 700; line-height: 1.1; margin: 0 0 16px; }
        .emp-title .green { color: #27ae60; }
        .emp-sub { font-size: 1rem; color: #777; max-width: 600px; line-height: 1.7; margin: 0; }
        .emp-stats { display: flex; gap: 2.5rem; margin-top: 2rem; flex-wrap: wrap; }
        .emp-stat-num { font-family: 'Oswald', sans-serif; font-size: 2rem; font-weight: 700; color: white; line-height: 1; }
        .emp-stat-label { font-size: 11px; color: #555; text-transform: uppercase; letter-spacing: 0.08em; margin-top: 4px; }
        .emp-body { max-width: 1100px; margin: 0 auto; padding: 3rem 2rem 5rem; }
        .cat-block { margin-bottom: 2.5rem; }
        .cat-title { font-family: 'Oswald', sans-serif; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: #444; margin-bottom: 10px; padding-bottom: 8px; border-bottom: 1px solid #1a1a1a; }
        .portales-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: #111; }
        .portal-card { background: #0f0f0f; padding: 18px 20px; display: flex; flex-direction: column; gap: 8px; text-decoration: none; color: inherit; border-bottom: 2px solid transparent; transition: all 0.15s; }
        .portal-card:hover { background: #161616; border-bottom-color: #27ae60; }
        .portal-nombre { font-family: 'Oswald', sans-serif; font-size: 15px; font-weight: 700; color: white; }
        .portal-desc { font-size: 12px; color: #666; line-height: 1.5; flex-grow: 1; }
        .portal-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 4px; }
        .portal-idioma { font-size: 10px; font-weight: 600; color: #444; background: rgba(255,255,255,0.03); border: 1px solid #1e1e1e; padding: 2px 6px; border-radius: 2px; }
        .portal-ir { font-size: 11px; font-weight: 700; color: #27ae60; font-family: 'Oswald', sans-serif; opacity: 0.5; transition: opacity 0.15s; letter-spacing: 0.04em; }
        .portal-card:hover .portal-ir { opacity: 1; }
        .consejos-title { font-family: 'Oswald', sans-serif; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: #444; margin: 3rem 0 1rem; padding-bottom: 8px; border-bottom: 1px solid #1a1a1a; }
        .consejos-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 12px; }
        .consejo { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 16px; border-radius: 2px; }
        .consejo-icon { font-size: 1.3rem; margin-bottom: 8px; }
        .consejo-text { font-size: 12px; color: #666; line-height: 1.6; }
        @media (max-width: 900px) { .portales-grid { grid-template-columns: repeat(2, 1fr); } .consejos-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px) { .portales-grid { grid-template-columns: 1fr; } .consejos-grid { grid-template-columns: 1fr; } }
      `}</style>

      <div className="emp-hero">
        <div className="emp-inner">
          <div className="emp-badge">💼 Directorio de empleo · Suiza</div>
          <h1 className="emp-title">Busca trabajo<br />en <span className="green">Suiza</span></h1>
          <p className="emp-sub">Los mejores portales de empleo suizos, organizados por categoría. Desde generalistas hasta organismos internacionales.</p>
          <div className="emp-stats">
            <div><div className="emp-stat-num">30+</div><div className="emp-stat-label">Portales</div></div>
            <div><div className="emp-stat-num">8</div><div className="emp-stat-label">Categorías</div></div>
            <div><div className="emp-stat-num">26</div><div className="emp-stat-label">Cantones</div></div>
          </div>
        </div>
      </div>

      <div className="emp-body">
        {PORTALES.map((grupo) => (
          <div key={grupo.categoria} className="cat-block">
            <div className="cat-title">{grupo.categoria}</div>
            <div className="portales-grid">
              {grupo.items.map((p) => (
                <a key={p.nombre} href={p.url} target="_blank" rel="noopener noreferrer" className="portal-card">
                  <div className="portal-nombre">{p.nombre}</div>
                  <div className="portal-desc">{p.desc}</div>
                  <div className="portal-footer">
                    <span className="portal-idioma">{p.idioma}</span>
                    <span className="portal-ir">Ir al portal →</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}

        <div className="consejos-title">📌 Antes de empezar a buscar</div>
        <div className="consejos-grid">
          {CONSEJOS.map((c, i) => (
            <div key={i} className="consejo">
              <div className="consejo-icon">{c.icon}</div>
              <div className="consejo-text">{c.texto}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
