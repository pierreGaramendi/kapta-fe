import { ScrollArea, Button } from "@mantine/core";
import classes from "./Navbar.module.css";
import { useEffect, useState } from "react";
import { composeLinkGroup, composeNavbarItemsFromWorkspacesList } from "./utils/Navbar.utils";
import { SingleNavbarItem, mockdata } from "./mock/Navbar.mock";
import { NavbarHeader } from "./components/NavbarHeader";

export function NavbarNested({ workspaces }: any) {
  const links = mockdata.map((item) => composeLinkGroup(item));
  const [linksState, setLinksState] = useState(links);
  const addElement = (item: any) => {
     console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`',linksState)
    //console.log('vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvwwwwwwwwwwwww',composeLinkGroup(item))
    setLinksState([...linksState, composeLinkGroup(item)]);
  };
  useEffect(() => {
    if (workspaces.length>0) {
      for (const ws of workspaces) {
        let element = composeNavbarItemsFromWorkspacesList(ws)
        addElement(element)
      }
    }
    
  },[workspaces]);
  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <NavbarHeader />
      </div>
      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{linksState}</div>
      </ScrollArea>
      <Button onClick={() => addElement(SingleNavbarItem)}>Click</Button>
    </nav>
  );
}
