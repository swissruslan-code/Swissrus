import { useState } from "react";

const CANTONES = [
  ["ZH","Zúrich"],["BE","Berna"],["LU","Lucerna"],["UR","Uri"],
  ["SZ","Schwyz"],["OW","Obwalden"],["NW","Nidwalden"],["GL","Glaris"],
  ["ZG","Zug"],["FR","Friburgo"],["SO","Soleura"],["BS","Basilea-Ciudad"],
  ["BL","Basilea-Campiña"],["SH","Schaffhausen"],["AR","Appenzell RE"],
  ["AI","Appenzell RI"],["SG","San Galo"],["GR","Grisones"],
  ["AG","Argovia"],["TG","Turgovia"],["TI","Tesino"],["VD","Vaud"],
  ["VS","Valais"],["NE","Neuchâtel"],["GE","Ginebra"],["JU","Jura"],
];

const QUELLENSTEUER = {
  ZH:0.122, BE:0.130, LU:0.105, UR:0.100, SZ:0.095, OW:0.096,
  NW:0.098, GL:0.103, ZG:0.082, FR:0.122, SO:0.112, BS:0.125,
  BL:0.118, SH:0.107, AR:0.100, AI:0.095, SG:0.108, GR:0.112,
  AG:0.110, TG:0.106, TI:0.128, VD:0.135, VS:0.118, NE:0.132,
  GE:0.140, JU:0.138,
};

function getBVG(age) {
  if (age < 25) return { rate: 0, label: "Sin BVG (menor de 25 años)" };
  if (age <= 34) return { rate: 0.035, label: "Tramo 25–34: 3,5%" };
  if (age <= 44) return { rate: 0.050, label: "Tramo 35–44: 5%" };
  if (age <= 54) return { rate: 0.075, label: "Tramo 45–54: 7,5%" };
  return { rate: 0.090, label: "Tramo 55–65: 9%" };
}

function fmt(n) {
  return "CHF " + Math.round(n).toLocaleString("de-CH");
}

export default function Calculadora() {
  const [inputVal, setInputVal] = useState("5000");
  const [edad, setEdad] = useState(34);
  const [canton, setCanton] = useState("ZH");
  const [permiso, setPermiso] = useState("BL");
  const [casado, setCasado] = useState(false);
  const [decimoTercero, setDecimoTercero] = useState(false);
  const [resultado, setResultado] = useState(null);

  const bvg = getBVG(edad);

  function calcular() {
    const bruto = parseFloat(inputVal) || 0;
    if (bruto <= 0) return;

    const ahv  = bruto * 0.0530;
    const iv   = bruto * 0.0070;
    const eo   = bruto * 0.0025;
    const alv  = bruto * 0.0110;
    const bvgAmt = bruto * bvg.rate;

    let qs = 0;
    if (permiso === "BL") {
      const tasa = (QUELLENSTEUER[canton] || 0.12) * (casado ? 0.78 : 1);
      qs = bruto * tasa;
    }

    const totalDesc = ahv + iv + eo + alv + bvgAmt + qs;
    const neto = bruto - totalDesc;
    const meses = decimoTercero ? 13 : 12;

    setResultado({
      bruto,
      ahv, iv, eo, alv,
      bvgAmt,
      qs,
      totalDesc,
      neto: Math.round(neto),
      netoAnual: Math.round(neto * meses),
      brutoAnual: Math.round(bruto * meses),
      tasa: Math.round((totalDesc / bruto) * 100),
    });
  }

  const s = {
    page: { fontFamily: "'Segoe UI', Arial, sans-serif", background: "#faf9f7", minHeight: "100vh", padding: "2rem 1rem" },
    wrap: { maxWidth: 680, margin: "0 auto" },
    eyebrow: { fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#c0392b", marginBottom: 6 },
    title: { fontSize: 28, fontWeight: 900, marginBottom: 4, color: "#111" },
    titleEm: { color: "#c0392b", fontStyle: "italic" },
    sub: { fontSize: 13, color: "#999", marginBottom: 28 },
    card: { background: "white", border: "1px solid #e8e8e8", borderRadius: 4, padding: "2rem" },
    label: { display: "block", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", marginBottom: 8 },
    fieldWrap: { marginBottom: 24 },
    bigInput: { width: "100%", fontSize: 32, fontWeight: 800, color: "#111", border: "none", borderBottom: "2px solid #ddd", padding: "4px 0", background: "transparent", outline: "none", fontFamily: "inherit" },
    prefix: { fontSize: 12, color: "#bbb", marginTop: 4 },
    ageNum: { fontSize: 36, fontWeight: 900, textAlign: "center", color: "#111", marginBottom: 6 },
    range: { width: "100%", accentColor: "#c0392b", cursor: "pointer" },
    rangeLabels: { display: "flex", justifyContent: "space-between", fontSize: 11, color: "#bbb", marginTop: 2 },
    badge: { display: "inline-block", marginTop: 8, background: "#fdf3f2", border: "1px solid rgba(192,57,43,0.2)", padding: "4px 10px", fontSize: 12, color: "#c0392b", borderRadius: 2 },
    select: { width: "100%", padding: "10px 12px", border: "1px solid #ddd", borderRadius: 2, fontSize: 14, color: "#111", background: "white", outline: "none", cursor: "pointer" },
    twoCol: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
    toggleGroup: { display: "flex", border: "1px solid #ddd", borderRadius: 2, overflow: "hidden" },
    btn: (active) => ({
      flex: 1, padding: "10px 8px", border: "none", fontSize: 13, fontWeight: active ? 700 : 400,
      background: active ? "#111" : "white", color: active ? "white" : "#777", cursor: "pointer",
      transition: "all 0.15s",
    }),
    calcBtn: { width: "100%", marginTop: 8, padding: "14px", background: "#c0392b", color: "white", border: "none", fontSize: 14, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer", borderRadius: 2 },
    resCard: { marginTop: 20, border: "1px solid #e8e8e8", borderRadius: 4, overflow: "hidden" },
    resHeader: { background: "#111", color: "white", padding: "24px 28px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 12 },
    resLabel: { fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#777", marginBottom: 4 },
    resNeto: { fontSize: 42, fontWeight: 900, color: "white", lineHeight: 1 },
    resAnual: { fontSize: 13, color: "#888", marginTop: 4 },
    tasaBadge: { background: "rgba(192,57,43,0.85)", padding: "10px 16px", textAlign: "center", borderRadius: 2 },
    tasaNum: { fontSize: 28, fontWeight: 900, color: "white", lineHeight: 1 },
    tasaLbl: { fontSize: 10, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 2 },
    desglose: { padding: "20px 28px" },
    desgloseTitle: { fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#bbb", marginBottom: 12 },
    row: { display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f0f0f0", fontSize: 13 },
    rowName: { color: "#555" },
    rowVal: { color: "#c0392b", fontWeight: 600 },
    rowTotal: { display: "flex", justifyContent: "space-between", padding: "10px 0 0", marginTop: 4, borderTop: "2px solid #111", fontSize: 14, fontWeight: 700 },
    nota: { padding: "12px 28px 20px", background: "#faf9f7", borderTop: "1px solid #eee", fontSize: 12, color: "#bbb", lineHeight: 1.5 },
  };

  return (
    <div style={s.page}>
      <div style={s.wrap}>
        <div style={s.eyebrow}>Herramienta gratuita</div>
        <h1 style={s.title}>Calculadora Bruto → <em style={s.titleEm}>Neto</em></h1>
        <p style={s.sub}>26 cantones · BVG real por edad · Quellensteuer 2025</p>

        <div style={s.card}>

          {/* BRUTO */}
          <div style={s.fieldWrap}>
            <label style={s.label}>Salario bruto mensual</label>
            <input
              style={s.bigInput}
              type="text"
              inputMode="numeric"
              value={inputVal}
              placeholder="ej. 5000"
              onChange={e => setInputVal(e.target.value.replace(/[^0-9]/g, ""))}
            />
            <div style={s.prefix}>CHF / mes</div>
          </div>

          {/* EDAD */}
          <div style={s.fieldWrap}>
            <label style={s.label}>Edad</label>
            <div style={s.ageNum}>{edad} años</div>
            <input
              style={s.range}
              type="range"
              min={18} max={65}
              value={edad}
              onChange={e => setEdad(Number(e.target.value))}
            />
            <div style={s.rangeLabels}><span>18</span><span>65</span></div>
            <div style={s.badge}>📊 {bvg.label}</div>
          </div>

          {/* CANTÓN + PERMISO */}
          <div style={s.twoCol}>
            <div style={s.fieldWrap}>
              <label style={s.label}>Cantón</label>
              <select style={s.select} value={canton} onChange={e => setCanton(e.target.value)}>
                {CANTONES.map(([code, name]) => (
                  <option key={code} value={code}>{name} ({code})</option>
                ))}
              </select>
            </div>
            <div style={s.fieldWrap}>
              <label style={s.label}>Permiso</label>
              <div style={s.toggleGroup}>
                {[["BL","B/L"],["C","C"],["G","G"]].map(([v, l]) => (
                  <button key={v} style={s.btn(permiso === v)} onClick={() => setPermiso(v)}>{l}</button>
                ))}
              </div>
            </div>
          </div>

          {/* ESTADO CIVIL + 13º */}
          <div style={s.twoCol}>
            <div style={s.fieldWrap}>
              <label style={s.label}>Estado civil</label>
              <div style={s.toggleGroup}>
                <button style={s.btn(!casado)} onClick={() => setCasado(false)}>Soltero/a</button>
                <button style={s.btn(casado)} onClick={() => setCasado(true)}>Casado/a</button>
              </div>
            </div>
            <div style={s.fieldWrap}>
              <label style={s.label}>¿13.º mes?</label>
              <div style={s.toggleGroup}>
                <button style={s.btn(!decimoTercero)} onClick={() => setDecimoTercero(false)}>No</button>
                <button style={s.btn(decimoTercero)} onClick={() => setDecimoTercero(true)}>Sí</button>
              </div>
            </div>
          </div>

          <button style={s.calcBtn} onClick={calcular}>
            Calcular mi salario neto →
          </button>
        </div>

        {/* RESULTADO */}
        {resultado && (
          <div style={s.resCard}>
            <div style={s.resHeader}>
              <div>
                <div style={s.resLabel}>Neto mensual</div>
                <div style={s.resNeto}>{fmt(resultado.neto)}</div>
                <div style={s.resAnual}>{fmt(resultado.netoAnual)} / año{decimoTercero ? " (13 pagas)" : ""}</div>
              </div>
              <div style={s.tasaBadge}>
                <div style={s.tasaNum}>{resultado.tasa}%</div>
                <div style={s.tasaLbl}>descuentos</div>
              </div>
            </div>

            <div style={s.desglose}>
              <div style={s.desgloseTitle}>Desglose de descuentos</div>
              {[
                [`AHV/AVS — pensión 1.er pilar (5,3%)`, resultado.ahv],
                [`IV/AI — invalidez (0,7%)`, resultado.iv],
                [`EO — maternidad/militar (0,25%)`, resultado.eo],
                [`ALV — seguro de paro (1,1%)`, resultado.alv],
                bvg.rate > 0 ? [`BVG/LPP — pensión 2.º pilar (${(bvg.rate*100).toFixed(1)}%)`, resultado.bvgAmt] : null,
                permiso === "BL" ? [`Quellensteuer — ${canton} (tarifa ${casado?"B":"A"})`, resultado.qs] : null,
              ].filter(Boolean).map(([nombre, val]) => (
                <div key={nombre} style={s.row}>
                  <span style={s.rowName}>{nombre}</span>
                  <span style={s.rowVal}>−{fmt(val)}</span>
                </div>
              ))}
              <div style={s.rowTotal}>
                <span>Total descuentos</span>
                <span>−{fmt(resultado.totalDesc)}</span>
              </div>
            </div>

            <div style={s.nota}>
              ⚠️ Cálculo orientativo. No incluye LAMal (~350–600 CHF/mes). Quellensteuer aproximado; el valor exacto depende del municipio y salario exacto.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
