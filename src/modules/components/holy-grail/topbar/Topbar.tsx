import React from "react";
import { useAsideStore } from "../../../stores/useAsideStore";

const Topbar: React.FC = () => {
  const toggleAside = useAsideStore((state) => state.toggleAside);
  return (
    <header className="topbar">
      <button className="toggle-btn" onClick={toggleAside}>
        Menu icono
      </button>
      <div><input type="text" value="buscar" /></div>
      <div>Avatar</div>
    </header>
  );
};

export default Topbar;
