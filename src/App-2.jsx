import { useState } from "react";
import Home from "./Swissrus";
import Calculadora from "./Calculadora";
import Permisos from "./Permisos";
import Salarios from "./Salarios";
import Sanidad from "./Sanidad";
import Pensiones from "./Pensiones";
import Coches from "./Coches";
import Empleo from "./Empleo";

const NAV = [
  { id: "home",         label: "Inicio" },
  { id: "permisos",    label: "Permisos" },
  { id: "salarios",    label: "Salarios" },
  { id: "calculadora", label: "Calculadora" },
  { id: "sanidad",     label: "Sanidad" },
  { id: "pensiones",   label: "Pensiones" },
  { id: "coches",      label: "Coches 🚗" },
  { id: "empleo",      label: "Empleo 💼" },
];

export default function App() {
  const [pagina, setPagina] = useState("home");

  const navegar = (id) => {
    setPagina(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 999,
        background: "rgba(250,249,247,0.97)", backdropFilter: "blur(8px)",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 2rem", height: 56,
      }}>
        <div
          onClick={() => navegar("home")}
          style={{ fontFamily: "Georgia, serif", fontSize: "1.3rem", fontWeight: 700, cursor: "pointer", color: "#1a1a1a", flexShrink: 0 }}
        >
          Swiss<span style={{ color: "#c0392b" }}>rus</span>
        </div>
        <div style={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "flex-end" }}>
          {NAV.map(n => (
            <button
              key={n.id}
              type="button"
              onClick={() => navegar(n.id)}
              style={{
                padding: "6px 10px", border: "none", borderRadius: 2,
                background: pagina === n.id
                  ? n.id === "calculadora" ? "#c0392b"
                  : n.id === "empleo" ? "#27ae60"
                  : "#111"
                  : "transparent",
                color: pagina === n.id ? "white" : "#555",
                fontSize: 12, fontWeight: pagina === n.id ? 700 : 400,
                cursor: "pointer", transition: "all 0.15s", whiteSpace: "nowrap",
              }}
            >
              {n.label}
            </button>
          ))}
        </div>
      </nav>
      <div style={{ paddingTop: 56 }}>
        {pagina === "home"        && <Home onNavigate={navegar} />}
        {pagina === "calculadora" && <Calculadora />}
        {pagina === "permisos"    && <Permisos />}
        {pagina === "salarios"    && <Salarios />}
        {pagina === "sanidad"     && <Sanidad />}
        {pagina === "pensiones"   && <Pensiones />}
        {pagina === "coches"      && <Coches />}
        {pagina === "empleo"      && <Empleo />}
      </div>
    </div>
  );
}
