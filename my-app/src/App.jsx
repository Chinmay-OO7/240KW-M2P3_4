import { useState } from "react";
import DesignTestingRequirements from "./services/Design/DesignTestingRequirements";
import DesignTestingStandards from "./services/Design/DesignTestingStandards";

export default function App() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    testType: "",
    selectedTests: [],
    selectedRegions: [],
    selectedStandards: [],
  });

  const updateFormData = (updates) =>
    setFormData((prev) => ({ ...prev, ...updates }));

  return (
    <div style={{ padding: "24px", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>Design Testing — Temporary Test Flow</h1>

      {step === 1 && (
        <DesignTestingRequirements
          formData={formData}
          updateFormData={updateFormData}
          next={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <DesignTestingStandards
          formData={formData}
          updateFormData={updateFormData}
          back={() => setStep(1)}
          submit={() => {
            console.log("FINAL DATA →", formData);
            alert("Data ready — check console. Next: connect backend!");
          }}
        />
      )}
    </div>
  );
}
