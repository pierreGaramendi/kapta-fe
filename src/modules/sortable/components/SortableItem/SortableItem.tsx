import { useSortable } from "@dnd-kit/sortable";
import { useMountStatus } from "../../Multiplecontainer/hooks";
import { Item } from "..";

export const SortableItem = ({ disabled, id, index }: any) => {
  const { setNodeRef, listeners, isDragging, isSorting, transform, transition } = useSortable({
    id,
  });
  const mounted = useMountStatus();
  const mountedWhileDragging = isDragging && !mounted;

  return (
    <Item
      ref={disabled ? undefined : setNodeRef}
      value={id}
      dragging={isDragging}
      sorting={isSorting}
      index={index}
      /* wrapperStyle={wrapperStyle({ index })} */
      transition={transition}
      transform={transform}
      fadeIn={mountedWhileDragging}
      listeners={listeners}
    >
      <div>esto no esta funcionando TODO</div>
    </Item>
  );
};
