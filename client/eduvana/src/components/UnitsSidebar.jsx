import React from "react";
import "./UnitsSidebar.css";

function UnitsSidebar({ units, selectedUnitId, onUnitClick }) {
  return (
    <div className="units-sidebar">
      <h2>Units</h2>
      <ul>
        {units.map((unit) => (
          <li 
            key={unit.id}
            className={unit.id === selectedUnitId ? "selected" : ""}
            onClick={() => onUnitClick(unit.id)}
          >
            {unit.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UnitsSidebar;