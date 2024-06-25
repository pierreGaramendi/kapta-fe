import React from "react";
import "./NavbarContent.css";
import { SidenavItemCustome } from "./components/SidenavItemCustome/SidenavItemCustome";

export const SidenavContent: React.FC<any> = ({ items }) => {
  return (
    <>
      {items.map((item: any) => (
        <SidenavItemCustome title={item.name} to={`/ws/${item._id}`} key={item._id}>
          {item.boards.map((subitem: any) => (
            <SidenavItemCustome title={subitem.name} to={`/tablero/${subitem._id}`} key={subitem._id}></SidenavItemCustome>
          ))}
        </SidenavItemCustome>
      ))}
    </>
  );
};
