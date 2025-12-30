export default function DesignTestingRequirements({
  formData,
  updateFormData,
  next,
}) {
  const testTypes = [
    "Pre-Compliance Test",
    "Final Testing / Compliance Testing",
    "ILC (Inter-Laboratory Comparison)",
  ];

  const sections = {
    "A. EMC Tests": [
      "ESD immunity",
      "Radiated RF immunity",
      "EFT/Burst immunity",
      "Surge immunity",
      "Conducted RF immunity",
      "Power-frequency magnetic field immunity",
      "Voltage dips & interruptions immunity",
    ],

    "B. Environmental Tests": [
      "Cold test",
      "Dry heat test",
      "Damp heat (steady state)",
      "Damp heat (cyclic)",
      "Thermal cycling",
      "Temperature shock",
      "Vibration (sinusoidal)",
      "Vibration (random)",
      "Mechanical shock",
      "Free fall",
      "Salt mist / corrosion",
      "Dust & water ingress (IP test)",
      "UV / Solar radiation test",
      "Combined environmental test",
    ],

    "C. Safety Tests": [
      "Insulation resistance test",
      "Dielectric withstand / Hi-pot test",
      "Clearances & creepage check",
      "Leakage current test",
      "Overcurrent protection verification",
      "Overvoltage protection verification",
      "Abnormal operation / single-fault test",
      "Temperature rise test",
      "Protective bonding / PE continuity",
      "Enclosure mechanical protection (IK)",
      "Fire hazard assessment",
    ],

    "D. Functional Safety Tests": [
      "Safety function verification",
      "Hardware fault injection",
      "Diagnostic coverage validation",
      "Safe state / redundancy tests",
      "Software self-test verification",
      "Lifecycle process audit",
    ],
  };

  const toggleTest = (value) => {
    updateFormData({
      selectedTests: formData.selectedTests.includes(value)
        ? formData.selectedTests.filter((x) => x !== value)
        : [...formData.selectedTests, value],
    });
  };

  return (
    <div>
      <h2>Testing Requirements</h2>

      <div style={{ padding: 12, border: "1px solid #ccc", marginTop: 10 }}>
        <strong>Select Test Type</strong>

        {testTypes.map((t) => (
          <label key={t} style={{ display: "block", marginTop: 6 }}>
            <input
              type="radio"
              name="testType"
              checked={formData.testType === t}
              onChange={() => updateFormData({ testType: t })}
            />{" "}
            {t}
          </label>
        ))}
      </div>

      <div style={{ marginTop: 16 }}>
        {Object.entries(sections).map(([section, items]) => (
          <div
            key={section}
            style={{ marginTop: 12, padding: 10, border: "1px solid #eee" }}
          >
            <h4>{section}</h4>

            {items.map((item) => (
              <label key={item} style={{ display: "block" }}>
                <input
                  type="checkbox"
                  checked={formData.selectedTests.includes(item)}
                  onChange={() => toggleTest(item)}
                />{" "}
                {item}
              </label>
            ))}
          </div>
        ))}
      </div>

      <button style={{ marginTop: 16 }} onClick={next}>
        Next →
      </button>
    </div>
  );
}
