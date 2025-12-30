import { useState, useMemo, useEffect } from "react";

export default function DesignTestingStandards({ formData, updateFormData, back }) {
  const [searchQuery, setSearchQuery] = useState("");

  const standardsMap = {
    "ESD immunity": "IEC 61000-4-2",
    "Radiated RF immunity": "IEC 61000-4-3",
    "EFT/Burst immunity": "IEC 61000-4-4",
    "Surge immunity": "IEC 61000-4-5",
    "Conducted RF immunity": "IEC 61000-4-6",
    "Power-frequency magnetic field immunity": "IEC 61000-4-8",
    "Voltage dips & interruptions immunity": "IEC 61000-4-29",

    "Cold test": "IEC 60068-2-1",
    "Dry heat test": "IEC 60068-2-2",
    "Damp heat (steady state)": "IEC 60068-2-78",
    "Damp heat (cyclic)": "IEC 60068-2-30",
    "Thermal cycling": "IEC 60068-2-14",
    "Temperature shock": "IEC 60068-2-14 / 60068-2-38",
    "Vibration (sinusoidal)": "IEC 60068-2-6",
    "Vibration (random)": "IEC 60068-2-64",
    "Mechanical shock": "IEC 60068-2-27",
    "Free fall": "IEC 60068-2-32",
    "Salt mist / corrosion": "IEC 60068-2-11",
    "Dust & water ingress (IP test)": "IEC 60529",
    "UV / Solar radiation test": "IEC 60068-2-5 / 60068-2-63",
    "Combined environmental test": "IEC 60068-2-53",

    "Insulation resistance test": "IEC 62477-1",
    "Dielectric withstand / Hi-pot test": "IEC 62477-1",
    "Clearances & creepage distance check": "IEC 62477-1 + IEC 60664-1",
    "Leakage current test": "IEC 62477-1",
    "Overcurrent protection verification": "IEC 62477-1",
    "Overvoltage protection verification": "IEC 62477-1",
    "Abnormal operation / single-fault test": "IEC 62477-1",
    "Temperature rise test": "IEC 62477-1",
    "Protective bonding / PE continuity": "IEC 62477-1",
    "Enclosure mechanical protection (IK)": "IEC 62262",
    "Fire hazard assessment": "IEC 60695-10-2 / 60695-11-5",

    "Safety function verification": "IEC 61508",
    "Hardware fault injection": "IEC 61508",
    "Diagnostic coverage validation": "IEC 61508",
    "Safe state / redundancy tests": "IEC 61508",
    "Software self-test verification": "IEC 61508",
    "Lifecycle process audit": "IEC 61508",
  };

  const autoMappedStandards = useMemo(() => {
    const selected = formData.selectedTests || [];
    const mapped = new Set();

    selected.forEach(label => {
      const standard = standardsMap[label];
      if (standard) mapped.add(`${label} → ${standard}`);
    });

    return Array.from(mapped);
  }, [formData.selectedTests]);

  // ⭐⭐⭐ NEW: Auto-check mapped standards by default
  useEffect(() => {
    const current = formData.selectedStandards || [];
    const merged = Array.from(new Set([...current, ...autoMappedStandards]));

    // only update if it actually changes
    if (merged.length !== current.length) {
      updateFormData({ selectedStandards: merged });
    }
  }, [autoMappedStandards]);

  const preferredStandards = [
    "IEC 61000-4-2 — ESD",
    "IEC 61000-4-3 — Radiated RF",
    "IEC 60068-2-1 — Cold Test",
    "IEC 60529 — IP Test",
    "IEC 61508 — Functional Safety",
    "IEC 62477-1 — Power Safety",
    "IEC 60068-2-14 — Thermal Cycling",
    "IEC 60068-2-30 — Damp Heat",
    "IEC 62262 — IK Rating",
    "IEC 60695 — Fire Hazard",
  ];

  const toggleStandard = value => {
    const current = formData.selectedStandards || [];

    updateFormData({
      selectedStandards: current.includes(value)
        ? current.filter(x => x !== value)
        : [...current, value],
    });
  };

  const handleSubmit = async () => {
    const payload = {
      product_id: "P12345",
      test_type: formData.testType,
      test_requirements: formData.selectedTests || [],
      test_standards: formData.selectedStandards || [],
    };

    try {
      const res = await fetch("http://127.0.0.1:8000/submit-tests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      alert("Saved successfully — Record ID: " + data.id);
    } catch (err) {
      console.error(err);
      alert("Save failed — check console");
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Testing Standards</h2>

      {/* AUTO MAPPED */}
      <div style={{ marginTop: 20, border: "1px solid #ddd", padding: 15 }}>
        <h4>Mapped Standards (auto-selected)</h4>

        {autoMappedStandards.length === 0 && (
          <p style={{ color: "gray" }}>No mapped standards — select tests first.</p>
        )}

        {autoMappedStandards.map(std => (
          <label key={std} style={{ display: "block", marginTop: 6 }}>
            <input
              type="checkbox"
              checked={formData.selectedStandards?.includes(std) || false}
              onChange={() => toggleStandard(std)}
            />{" "}
            {std}
          </label>
        ))}
      </div>

      {/* PREFERRED */}
      <div style={{ marginTop: 25, border: "1px solid #ddd", padding: 15 }}>
        <h4>Preferred Standards (optional)</h4>

        <input
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search standards…"
          style={{ padding: 6, width: "100%", marginBottom: 10 }}
        />

        {preferredStandards
          .filter(p => p.toLowerCase().includes(searchQuery.toLowerCase()))
          .map(std => (
            <label key={std} style={{ display: "block", marginTop: 6 }}>
              <input
                type="checkbox"
                checked={formData.selectedStandards?.includes(std) || false}
                onChange={() => toggleStandard(std)}
              />{" "}
              {std}
            </label>
          ))}
      </div>

      {/* SELECTED */}
      {formData.selectedStandards?.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <strong>Selected Standards:</strong>
          <div style={{ marginTop: 10 }}>
            {formData.selectedStandards.map(id => (
              <span
                key={id}
                style={{
                  display: "inline-block",
                  padding: "6px 10px",
                  background: "#eef4ff",
                  marginRight: 6,
                  borderRadius: 8,
                  fontSize: 12,
                }}
              >
                {id}
              </span>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginTop: 30 }}>
        <button onClick={back} style={{ marginRight: 10 }}>
          ← Back
        </button>
        <button onClick={handleSubmit}>Save & Continue</button>
      </div>
    </div>
  );
}
