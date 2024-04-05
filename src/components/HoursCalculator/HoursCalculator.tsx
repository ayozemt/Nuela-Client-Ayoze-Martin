import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "./HoursCalculator.css";

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
      <div className="d-flex justify-content-center w-100 px-4">
        <div className="cuadro mx-2 my-5 p-2 rounded bg-white">
          <p className="horas m-1 text-secondary">Horas Totales:</p>
          <h2 className="m-1">{totalHours} horas</h2>
        </div>
        <div className="cuadro mx-2 my-5 p-2 rounded bg-white">
          <p className="horas m-1 text-secondary">Horas Lectivas:</p>
          <h2 className="m-1">
            {activeTab === "weekly" ? teachingHours : teachingHours * 37} horas
          </h2>
        </div>
        <div className="cuadro mx-2 my-5 p-2 rounded bg-white">
          <p className="horas m-1 text-secondary">Horas Complementarias:</p>
          <h2 className="m-1">{extraHours} horas</h2>
        </div>
      </div>
    </div>
  );
}

export default HoursCalculator;
