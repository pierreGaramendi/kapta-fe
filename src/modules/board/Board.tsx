import { useParams } from "react-router-dom";
import { useBoardById } from "./hooks/useBoardById";
import { Card as CardModel } from "../indexdb/kapta.model";
import { Box, Flex, Text } from "@mantine/core";
import { NewListComponent } from "./components/NewList/NewList";
import { NewCardButtonComponent } from "./components/NewCardButton/NewCardButton";
import { BoardHeaderComponent } from "./components/BoardHeader/BoardHeaderComponent";
import { BoardWrapperComponent } from "./components/BoardWrapper/BoardWrapper";
import { ListWrapperComponent } from "./components/ListWrapper/ListWrapper";
import { ListHeaderComponent } from "./components/ListHeader/ListHeaderComponent";
import { CardWrapperComponent } from "./components/CardWrapper/CardWrapper";
import { useListStore } from "./store/ListStore";
import { useEffect } from "react";
import { sampleListsData } from "../indexdb/initializeDB";

export const Board = () => {
  const { id } = useParams<{ id: string }>();
  const { board } = useBoardById(id || "");
  const initializeStore = useListStore((state: any) => state.initializeStore);
  const lists = useListStore((state: any) => state.lists);

  useEffect(() => {
    initializeStore(sampleListsData);
  }, [initializeStore]);

  return (
    <BoardWrapperComponent>
      <BoardHeaderComponent title={board.name} />
      <div>
        {lists
          .filter((item: any) => !item.archived)
          .map((list: any) => (
            <div key={list._id}>
              <span>{list.name}</span>
              <span>{JSON.stringify(list.archived)}</span>
            </div>
          ))}
      </div>
      <Flex mih={50} mt="md" ml="md" gap="md" direction="row">
        {lists
          .filter((item: any) => !item.archived)
          .map((list: any) => (
            <ListWrapperComponent key={list._id}>
              <ListHeaderComponent title={list.name} list_id={list._id} />
              <Box id="cards-continaer">
                {list.cards.map((card: CardModel) => (
                  <CardWrapperComponent key={card._id}>
                    <Text size="sm" fw={700}>
                      {card.name}
                    </Text>
                  </CardWrapperComponent>
                ))}
              </Box>
              <NewCardButtonComponent listId={list._id} />
            </ListWrapperComponent>
          ))}
        <NewListComponent />
      </Flex>
    </BoardWrapperComponent>
  );
};
