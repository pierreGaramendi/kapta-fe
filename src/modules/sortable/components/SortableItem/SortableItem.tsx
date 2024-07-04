import { useSortable } from "@dnd-kit/sortable";
import { useMountStatus } from "../../Multiplecontainer/hooks";
import { Item } from "..";

export const SortableItem = ({ disabled, id, index, content }: any) => {
  const { setNodeRef, listeners, isDragging, isSorting, transform, transition } = useSortable({
    id,
  });
  const mounted = useMountStatus();
  const mountedWhileDragging = isDragging && !mounted;
  console.log("content:               ",content)
  return (
    <Item
      ref={disabled ? undefined : setNodeRef}
      value={id}
      dragging={isDragging}
      sorting={isSorting}
      index={index}
      transition={transition}
      transform={transform}
      fadeIn={mountedWhileDragging}
      listeners={listeners}
      content={content}
    />
  );
};
