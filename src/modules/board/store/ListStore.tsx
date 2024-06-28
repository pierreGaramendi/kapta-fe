import { create } from "zustand";
import { findIndex, propEq } from "ramda";
export const useListStore = create((set) => ({
  lists: [],
  initializeStore: (initialData: any) =>
    set(() => ({
      lists: initialData,
    })),
  updateCardInBoard: (boardId: string, cardId: string, updates: any) =>
    set((state: any) => ({
      lists: state.boards.map((board: any) => {
        if (board.board_id === boardId) {
          return {
            ...board,
            cards: board.cards.map((card: any) => {
              if (card._id === cardId) {
                return {
                  ...card,
                  ...updates,
                };
              }
              return card;
            }),
          };
        }
        return board;
      }),
    })),
  updateListAnyProp: (listId: string, updates: any) =>
    set((state: any) => {
      const lists = [...state.lists];
      let idxFound = findIndex(propEq(listId, "_id"))(lists);
      lists[idxFound] = {
        ...lists[idxFound],
        ...updates,
      };
      return { lists };
    }),
  addList: (list: any) =>
    set((state: any) => ({ lists: [...state.lists, list] })),

  addCardToList: (listId: string, card: any) =>
    set((state: any) => {
      const lists = [...state.lists];
      let idxFound = findIndex(propEq(listId, "_id"))(lists);
      let cards = lists[idxFound]["cards"]
      cards.push(card)
      lists[idxFound] = {
        ...lists[idxFound],
        ...cards,
      };
      return { lists };
    }),
}));
