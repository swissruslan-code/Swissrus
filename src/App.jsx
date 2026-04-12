import { useState } from "react";
import Home from "./Swissrus";
import Calculadora from "./Calculadora";
import Permisos from "./Permisos";
import Salarios from "./Salarios";
import Sanidad from "./Sanidad";
import Pensiones from "./Pensiones";
import Coches from "./Coches";

const NAV = [
  { id: "home",        label: "Inicio" },
  { id: "permisos",    label: "Permisos" },
  { id: "salarios",    label: "Salarios" },
  { id: "calculadora", label: "Calculadora" },
  { id: "sanidad",     label: "Sanidad" },
  { id: "pensiones",   label: "Pensiones" },
  { id: "coches",      label: "Coches 🚗" },
];

export default function App() {
  const [pagina, setPagina] = useState("home");

  const navegar = (id) => {
    setPagina(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}>
      {/* NAVBAR GLOBAL */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 999,
        background: "rgba(250,249,247,0.97)", backdropFilter: "blur(8px)",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 2rem", height: 56,
      }}>
        <div
          onClick={() => navegar("home")}
          style={{ fontFamily: "Georgia, serif", fontSize: "1.3rem", fontWeight: 700, cursor: "pointer", color: "#1a1a1a" }}
        >
          Swiss<span style={{ color: "#c0392b" }}>rus</span>
        </div>

        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {NAV.map(n => (
            <button
              key={n.id}
              onClick={() => navegar(n.id)}
              style={{
                padding: "6px 12px", border: "none", borderRadius: 2,
                background: pagina === n.id ? (n.id === "calculadora" ? "#c0392b" : "#111") : "transparent",
                color: pagina === n.id ? "white" : "#555",
                fontSize: 13, fontWeight: pagina === n.id ? 700 : 400,
                cursor: "pointer", transition: "all 0.15s",
              }}
            >
              {n.label}
            </button>
          ))}
        </div>
      </nav>

      {/* CONTENIDO — empuja hacia abajo para no quedar detrás del nav */}
      <div style={{ paddingTop: 56 }}>
        {pagina === "home"        && <Home        onNavigate={navegar} />}
        {pagina === "calculadora" && <Calculadora />}
        {pagina === "permisos"    && <Permisos    />}
        {pagina === "salarios"    && <Salarios    />}
        {pagina === "sanidad"     && <Sanidad     />}
        {pagina === "pensiones"   && <Pensiones   />}
        {pagina === "coches"      && <Coches      />}
      </div>
    </div>
  );
}
