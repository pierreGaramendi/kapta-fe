import { useState } from "react";
import { find, propEq } from "ramda";

export const useDragAndDrop = (initialContainers: any) => {
  const [containers, setContainers] = useState(initialContainers);

  const removeCard = (idContainer: string, cardId: string) => {
    setContainers((prevContainers: any) =>
      prevContainers.map((container: any) =>
        container.id === idContainer
          ? {
              ...container,
              cards: container.cards.filter((card: any) => card.id !== cardId),
            }
          : container
      )
    );
  };

  const addCard = (idContainer: string, newCard: any) => {
    setContainers((prevContainers: any) =>
      prevContainers.map((container: any) =>
        container.id === idContainer
          ? { ...container, cards: [...container.cards, newCard] }
          : container
      )
    );
  };

  const handleDragEnd = (event: any) => {
    const containerIdOrigin = event.active.data.current.parent;
    const cardId = event.active.id;
    const containerIdDestination = event.over.id;

    if (containerIdOrigin === containerIdDestination) {
      return;
    }

    const containerSelf: any = find(propEq(containerIdOrigin, "id"))(
      containers
    );
    const cardSelf = find(propEq(cardId, "id"))(containerSelf.cards);
    removeCard(containerIdOrigin, cardId);
    addCard(containerIdDestination, cardSelf);
  };

  return {
    containers,
    handleDragEnd,
  };
};