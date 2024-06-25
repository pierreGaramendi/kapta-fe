import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface SidenavItemProps {
  title: string;
  to?: string;
  children?: any
}

export const SidenavItemCustome: React.FC<SidenavItemProps> = ({
  title,
  to,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  const toggleOpen = () => {
    console.log('bodommmmmmmmmmmmm',children)
    if (children !== null) {
      
      if ((children === undefined) || (children.length === 0)) {
        
        navigate(to || "/");
      }
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="sidenav-item-container">
      <div className="sidenav-item-custome">
        <div className="sidenav-title-custome" onClick={toggleOpen}>
          {title}
        </div>
        <div className={`sidenav-children-custome ${isOpen ? "open" : ""}`}>
          {children}
        </div>
      </div>
      <div className="sidenav-separator"></div>
    </div>
  );
};
