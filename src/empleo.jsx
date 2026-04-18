const PORTALES = [
{
Los más usados en Suiza",
categoria: " items: [
{ nombre: "jobs.ch", desc: "El portal más grande de Suiza. Todas las profesiones y cant
{ nombre: "Indeed Suiza", desc: "Motor de búsqueda global. Gran volumen de ofertas suiz
{ nombre: "LinkedIn Jobs", desc: "Ideal para perfiles profesionales y networking direct
{ nombre: "jobup.ch", desc: "El mejor para Suiza francesa: Ginebra, Lausana, Vaud.", ur
{ nombre: "jobscout24.ch", desc: "Amplia cobertura nacional con filtros avanzados.", ur
{ nombre: "arbeit.swiss", desc: "Portal oficial del gobierno suizo (RAV). Gratuito y fi
]
},
{
categoria: " Generalistas",
items: [
{ nombre: "jobwinner.ch", desc: "Agregador suizo con ofertas de múltiples fuentes.", ur
{ nombre: "monster.ch", desc: "Portal internacional con presencia sólida en Suiza.", ur
{ nombre: "stepstone.ch", desc: "Fuerte en perfiles cualificados y puestos de dirección
{ nombre: "alpha.ch", desc: "Portal suizo en alemán, fuerte en Suiza germana.", url: "h
{ nombre: "stellen.ch", desc: "Gran volumen de ofertas en Suiza alemana.", url: "https:
{ nombre: "XING Jobs", desc: "LinkedIn alemán. Muy usado en Suiza germana.", url: "http
{ nombre: "Glassdoor Suiza", desc: "Ofertas con salarios reales y reviews de empleados.
{ nombre: "totaljobs.com", desc: "Portal internacional con ofertas en Suiza.", url: "ht
{ nombre: "jobs.nzz.ch", desc: "Portal del diario NZZ, fuerte en perfiles cualificados.
]
},
{
categoria: " Organismos oficiales e internacionales",
items: [
{ nombre: "EURES Europa", desc: "Portal de la UE. Válido con permiso de trabajo europeo
{ nombre: "Naciones Unidas (ONU)", desc: "Vacantes en organismos de la ONU en Ginebra y
{ nombre: "CICR / Cruz Roja", desc: "Carreras en el Comité Internacional de la Cruz Roj
{ nombre: "OMC / WTO", desc: "Vacantes en la Organización Mundial del Comercio.", url:
{ nombre: "Ginebra Internacional", desc: "ONG y organismos internacionales con sede en
]
},
{
categoria: " Tecnología e IT",
items: [
{ nombre: "swissdevjobs.ch", desc: "Especializado en developers e ingenieros IT en Suiz
{ nombre: "technojobs / Suiza", desc: "Perfiles tech con foco en Suiza.", url: "https:/
{ nombre: "Darwin Recruitment", desc: "Headhunting para perfiles tech y finanzas en Sui
]
},
{
categoria: " items: [
Hostelería y trabajo de temporada",
{ nombre: "hotelcareer.com", desc: "Hoteles, restaurantes y turismo en toda Suiza.", ur
{ nombre: "seasonworkers.com", desc: "Trabajo de temporada en estaciones de esquí suiza
]
},
{
Agencias de trabajo temporal (ETT)",
categoria: " items: [
{ nombre: "Adecco Suiza", desc: "Una de las mayores ETT. Industria, logística y oficina
{ nombre: "Manpower Suiza", desc: "Agencia global con fuerte presencia en todos los per
{ nombre: "Robert Walters", desc: "Headhunting senior: finanzas, legal, tech, RRHH.", u
{ nombre: "Swisslinx", desc: "Especialistas en banca y finanzas en Suiza.", url: "https
]
},
{
categoria: " items: [
Salud, ciencia y farmacéutica",
{ nombre: "eurosciencejobs.com", desc: "Investigación, ciencia y pharma en Suiza { nombre: "diversityinresearch.careers", desc: "Farmacéuticas y biotecnología en (Basil
Suiza.
]
},
{
categoria: " items: [
Para expatriados (en inglés)",
{ nombre: "Expatica Jobs", desc: "Diseñado para expatriados. Muchas ofertas en inglés."
{ nombre: "The Local CH", desc: "Portal en inglés para la comunidad extranjera en Suiza
{ nombre: "jobsingeneva.com", desc: "Especializado en Ginebra para perfiles internacion
{ nombre: "jobsinzurich.com", desc: "Especializado en Zúrich para perfiles en inglés.",
{ nombre: "toplanguagejobs.com", desc: "Empleos que requieren idiomas. Útil si hablas e
]
},
];
const CONSEJOS = [
{ icon: " { icon: " { icon: " { icon: " { icon: " { icon: " ", texto: "En Suiza alemana busca también en alemán: 'Krankenpfleger' (enfermero
", texto: "El CV suizo debe ser breve (1-2 páginas), con fechas exactas y carta
", texto: "arbeit.swiss es el portal oficial del gobierno. Si estás desempleado,
", texto: "El 13.º mes es casi estándar en Suiza. Cuéntalo al calcular tu sueldo
", texto: "Para Ginebra y puestos internacionales busca en inglés y francés. La
", texto: "Sin permiso de trabajo válido (B, G, L o C) no puedes trabajar legalm
];
export default function Empleo() {
return (
<div style={{ background: "#0a0a0a", minHeight: "100vh", color: "white", fontFamily: "'Se
<style>{`
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700&display
.emp-hero { padding: 4rem 2rem 3rem; background: linear-gradient(180deg, #0d150d 0%,
.emp-inner { max-width: 1100px; margin: 0 auto; }
.emp-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(39
.emp-title { font-family: 'Oswald', sans-serif; font-size: clamp(2rem, 5vw, 3.8rem);
.emp-title .green { color: #27ae60; }
.emp-sub { font-size: 1rem; color: #777; max-width: 600px; line-height: 1.7; }
.emp-stats { display: flex; gap: 2.5rem; margin-top: 2rem; flex-wrap: wrap; }
.emp-stat-num { font-family: 'Oswald', sans-serif; font-size: 2rem; font-weight: 700;
.emp-stat-label { font-size: 11px; color: #555; text-transform: uppercase; letter-spa
.emp-body { max-width: 1100px; margin: 0 auto; padding: 3rem 2rem 5rem; }
.cat-block { margin-bottom: 2.5rem; }
.cat-title { font-family: 'Oswald', sans-serif; font-size: 13px; font-weight: 700; te
.portales-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; back
.portal-card { background: #0f0f0f; padding: 18px 20px; display: flex; flex-direction
.portal-card:hover { background: #161616; border-bottom-color: #27ae60; }
.portal-nombre { font-family: 'Oswald', sans-serif; font-size: 15px; font-weight: 700
.portal-desc { font-size: 12px; color: #666; line-height: 1.5; flex-grow: 1; }
.portal-footer { display: flex; justify-content: space-between; align-items: center;
.portal-idioma { font-size: 10px; font-weight: 600; color: #444; background: rgba(255
.portal-ir { font-size: 11px; font-weight: 700; color: #27ae60; font-family: 'Oswald'
.portal-card:hover .portal-ir { opacity: 1; }
.consejos-title { font-family: 'Oswald', sans-serif; font-size: 13px; font-weight: 70
.consejos-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; mar
.consejo { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.0
.consejo-icon { font-size: 1.3rem; margin-bottom: 8px; }
.consejo-text { font-size: 12px; color: #666; line-height: 1.6; }
@media (max-width: 900px) { .portales-grid { grid-template-columns: repeat(2, 1fr); }
@media (max-width: 560px) { .portales-grid { grid-template-columns: 1fr; } .consejos-
`}</style>
<div className="emp-hero">
<div className="emp-inner">
<div className="emp-badge"> Directorio de empleo · Suiza</div>
<h1 className="emp-title">Busca trabajo<br />en <span className="green">Suiza</span
<p className="emp-sub">Los mejores portales de empleo suizos, organizados por categ
<div className="emp-stats">
<div><div className="emp-stat-num">30+</div><div className="emp-stat-label">Porta
<div><div className="emp-stat-num">8</div><div className="emp-stat-label">Categor
<div><div className="emp-stat-num">26</div><div className="emp-stat-label">Canton
</div>
</div>
</div>
<div className="emp-body">
{PORTALES.map((grupo) => (
<div key={grupo.categoria} className="cat-block">
<div className="cat-title">{grupo.categoria}</div>
<div className="portales-grid">
{grupo.items.map((p) => (
<a key={p.nombre} href={p.url} target="_blank" rel="noopener noreferrer" clas
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
<div className="consejos-title"> Antes de empezar a buscar</div>
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
