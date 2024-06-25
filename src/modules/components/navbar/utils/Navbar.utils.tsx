import { IconChalkboard } from "@tabler/icons-react";
import { Workspace } from "../../../indexdb/kapta.model";
import { LinksGroup } from "../components/NavbarLinksGroup/NavbarLinksGroup";

export const composeLinkGroup = (item: any) => {
  return <LinksGroup {...item} key={item.label} />;
};

export const composeNavbarItemsFromWorkspacesList = (workspace: Workspace) => {
  let newNavbarItem: any = {
    label: "Workspace 1",
    icon: IconChalkboard,
    initiallyOpened: true,
    links: [],
  };
  newNavbarItem.label = workspace.name;
  newNavbarItem.icon = IconChalkboard;
  newNavbarItem.initiallyOpened = true;
  for (const board of workspace.boards) {
    let newSubItemNavbar = { label: board.name, link: `/tablero/${board._id}` };
    newNavbarItem.links.push(newSubItemNavbar);
  }
  return newNavbarItem
};

/* {
  "_id":"workspace_001",
  "name":"Workspace 1",
  "description":"Description for Workspace 1",
  "boards":[
     {
        "_id":"board_001",
        "name":"Project A",
        "description":"Board for Project A",
        "workspace_id":"workspace_001",
        "lists":[],
        "members":[]
     }
  ],
  "members":[]
}



  {
    label: "Workspace 1",
    icon: IconChalkboard,
    initiallyOpened: true,
    links: [
      { label: "Tablero 1", link: "/tableros" },
      { label: "Tablero 2", link: "/" },
    ],
  }
*/
