import React from "react";

import { AsideHeader } from "./components/AsideHeader";
import { AsideItem } from "./components/AsideItem";
import useUserWorkspaces from "../../../workspace/hooks/useUserWorkspaces";
import useClickOutside from "../../../hooks/useClickOutside";
import { useAsideStore } from "../../../stores/useAsideStore";

export const Aside: React.FC<{ visible: boolean }> = ({ visible }) => {
  const userId = "user_001";
  const { workspaces } = useUserWorkspaces(userId);
  const toggleAside = useAsideStore((state) => state.toggleAside);
  const handleClickOutside = () => {
    if (visible) {
      toggleAside();
    }
  };
  const ref = useClickOutside(handleClickOutside);
  return (
    <aside
      ref={ref}
      className={`aside ${visible ? "visible" : ""} flex flex-col`}
    >
      <div>
        <AsideHeader visible={visible} />
        <ul>
          <li>
            <AsideItem label="Home" path="/home">
              <div>icono</div>
            </AsideItem>
          </li>
          <li>
            <AsideItem label="Tablero" path="/tableros">
              <div>icono</div>
            </AsideItem>
          </li>
          {workspaces.map((workspace) => (
            <li key={workspace._id}>
              <h4>{workspace.name}</h4>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};
