import React, { useState, useEffect } from "react";

function HoursCalculator({ teachingHours }: { teachingHours: number }) {
  const [totalHours, setTotalHours] = useState(0);
  const [extraHours, setExtraHours] = useState(0);
  const [activeTab, setActiveTab] = useState<"weekly" | "annual">("weekly");

  useEffect(() => {
    if (activeTab === "weekly") {
      setExtraHours(teachingHours * 0.2);
      setTotalHours(teachingHours + teachingHours * 0.2);
    } else {
      setTotalHours(teachingHours * 37);
      setExtraHours(teachingHours * 0.2 * 37);
    }
  }, [teachingHours, activeTab]);

  const handleTabChange = (tab: "weekly" | "annual") => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div>
        <button onClick={() => handleTabChange("weekly")}>Semanal</button>
        <button onClick={() => handleTabChange("annual")}>Anual</button>
      </div>
      <div>
        <div>Horas Totales: {totalHours}</div>
        <div>Horas Lectivas: {teachingHours}</div>
        <div>Horas Complementarias: {extraHours}</div>
      </div>
    </div>
  );
}

export default HoursCalculator;
