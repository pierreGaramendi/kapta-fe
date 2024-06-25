import { DndContext } from "@dnd-kit/core";
import { Draggable } from "./components/Draggable";
import { Droppable } from "./components/Droppable";
import { Card, Text } from "@mantine/core";
import { useDragAndDrop } from "./demo-dnd/useDragAndDrop";

export const DndExample = () => {
  const initialContainers = [
    { id: "A", cards: [{ id: "1", name: "X" }] },
    { id: "B", cards: [{ id: "2", name: "Y" }] },
    { id: "C", cards: [{ id: "3", name: "Z" }] },
  ];
  const { containers, handleDragEnd } = useDragAndDrop(initialContainers);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div id="listas" style={{ display: "flex", flexDirection: "row" }}>
          {containers.map((container: any) => (
            <Droppable key={container.id} id={container.id}>
              {container.cards.map((card: any) => (
                <Draggable id={card.id} parent={container.id}>
                  <Card withBorder shadow="sm" padding="xl" bg="violet">
                    <Text fw={500} size="lg" mt="md">
                      {card.name}
                    </Text>
                  </Card>
                </Draggable>
              ))}
            </Droppable>
          ))}
        </div>
      </div>
    </DndContext>
  );
};
