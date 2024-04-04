import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

function HoursCalculator({ teachingHours }: { teachingHours: number }) {
  const [totalHours, setTotalHours] = useState(0);
  const [extraHours, setExtraHours] = useState(0);
  const [activeTab, setActiveTab] = useState<"weekly" | "annual">("weekly");

  useEffect(() => {
    if (activeTab === "weekly") {
      setTotalHours(teachingHours + Math.ceil(teachingHours * 0.2));
      setExtraHours(Math.ceil(teachingHours * 0.2));
    } else {
      setTotalHours((teachingHours + Math.ceil(teachingHours * 0.2)) * 37);
      setExtraHours(Math.ceil(teachingHours * 0.2) * 37);
    }
  }, [teachingHours, activeTab]);

  const handleTabChange = (tab: "weekly" | "annual") => {
    setActiveTab(tab);
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <div
        className="btn-group border border-secondary p-1 mt-4 bg-secondary"
        role="group"
      >
        <Button
          variant={
            activeTab === "weekly"
              ? "light rounded px-3"
              : "secondary rounded px-3"
          }
          onClick={() => handleTabChange("weekly")}
        >
          Semanal
        </Button>
        <Button
          variant={
            activeTab === "annual"
              ? "light rounded px-4 mx-1"
              : "secondary rounded px-4 mx-1"
          }
          onClick={() => handleTabChange("annual")}
        >
          Anual
        </Button>
      </div>
      <div className="d-flex justify-content-around w-100">
        <div className="my-5 py-2 px-5 border rounded">
          <p className="m-1">Horas Totales:</p>
          <h1 className="m-1">{totalHours}</h1>
        </div>
        <div className="my-5 py-2 px-5 border rounded">
          <p className="m-1">Horas Lectivas:</p>
          <h1 className="m-1">
            {activeTab === "weekly" ? teachingHours : teachingHours * 37}
          </h1>
        </div>
        <div className="my-5 py-2 px-5 border rounded">
          <p className="m-1">Horas Complementarias:</p>{" "}
          <h1 className="m-1">{extraHours}</h1>
        </div>
      </div>
    </div>
  );
}

export default HoursCalculator;
