import React from "react";
import useUserWorkspaces from "../../../workspace/hooks/useUserWorkspaces";
import useClickOutside from "../../../hooks/useClickOutside";
import { useAsideStore } from "../../../stores/useAsideStore";
import { SidenavContent } from "../NavbarContent/NavbarContent";

export const Aside: React.FC<{ visible: boolean }> = ({ visible }) => {
  const userId = "user_001";
  const { workspaces } = useUserWorkspaces(userId);
  const toggleAside = useAsideStore((state) => state.toggleAside);
  const handleClickOutside = () => {
    if (visible) {
      toggleAside();
    }
  };
  const items = [
    {
      _id:"/home",
      name:"Home",
      boards:[]
    }
  ]
  const ref = useClickOutside(handleClickOutside);
  return (
    <aside
      ref={ref}
      className={`aside ${visible ? "visible" : ""} flex flex-col`}
    >
      <SidenavContent items={items}></SidenavContent>
      <SidenavContent items={workspaces}></SidenavContent>
    </aside>
  );
};
