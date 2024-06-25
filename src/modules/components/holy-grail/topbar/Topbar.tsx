import React from "react";
import styles from "./Topbar.module.css";
import { LeftSideTopbar } from "./components/LeftSideTopbar/LeftSideTopbar";
import { RightSideTopbar } from "./components/RightSideTopbar/RightSideTopbar";

const Topbar: React.FC = () => {
  return (
    <header className={styles.topbar}>
      <RightSideTopbar />

      <div>
        <input type="text" placeholder="buscar..." />
      </div>

      <LeftSideTopbar />
    </header>
  );
};

export default Topbar;
