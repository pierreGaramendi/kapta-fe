import { DropAnimation, UniqueIdentifier, defaultDropAnimationSideEffects } from "@dnd-kit/core";
import { AnimateLayoutChanges, defaultAnimateLayoutChanges } from "@dnd-kit/sortable";

export const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.5",
      },
    },
  }),
};

export const animateLayoutChanges: AnimateLayoutChanges = (args) =>
  {return defaultAnimateLayoutChanges({ ...args, wasDragging: true });}

export const TRASH_ID = "void";
export const PLACEHOLDER_ID = "placeholder";
export const empty: UniqueIdentifier[] = [];

export const getColor = (id: UniqueIdentifier) => {
  switch (String(id)[0]) {
    case "A":
      return "#7193f1";
    case "B":
      return "#ffda6c";
    case "C":
      return "#00bcd4";
    case "D":
      return "#ef769f";
  }

  return undefined;
};

export const getNextContainerId = (items: any) => {
  const containerIds = Object.keys(items);
  const lastContainerId = containerIds[containerIds.length - 1];
  return String.fromCharCode(lastContainerId.charCodeAt(0) + 1);
};


const findContainer = (id: UniqueIdentifier, items: any) => {
  if (id in items) {
    return id;
  }

  return Object.keys(items).find((key) => items[key].includes(id));
};

export const getIndex = (id: UniqueIdentifier,items:any) => {
  const container = findContainer(id, items);

  if (!container) {
    return -1;
  }

  const index = items[container].indexOf(id);

  return index;
};