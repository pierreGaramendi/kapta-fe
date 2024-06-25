import { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./components/SortableItem";
import { findIndex, propEq } from "ramda";

export function SortableTest() {
  const { items, sensors, handleDragEnd } = useSortable([
    { id: 1 },
    { id: 2 },
    { id: 3 },
  ]);
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map((item: any) => (
          <SortableItem key={item.id} id={item.id} />
        ))}
      </SortableContext>
    </DndContext>
  );
}

export const useSortable = (initialItems: any) => {
  const [items, setItems] = useState(initialItems);
  const sensors = useSensors(useSensor(PointerSensor));
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setItems((items: any) => {
        const oldIndex = findIndex(propEq(active.id, "id"))(items);
        const newIndex = findIndex(propEq(over.id, "id"))(items);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };
  return { items, sensors, handleDragEnd };
};
