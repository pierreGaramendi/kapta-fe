import { useSortable } from "@dnd-kit/sortable";
import { useMountStatus } from "./hooks";
import { Item } from "../../components";

export const SortableItem = ({
  disabled,
  id,
  index,
  handle,
  containerId,
  getIndex,
  wrapperStyle,
}: any) => {
  const {
    setNodeRef,
    setActivatorNodeRef,
    listeners,
    isDragging,
    isSorting,
    transform,
    transition,
  } = useSortable({
    id,
  });
  // yyy console.log(disabled, id, index, handle, containerId, getIndex, wrapperStyle);
  const mounted = useMountStatus();
  const mountedWhileDragging = isDragging && !mounted;

  return (
    <Item
      ref={disabled ? undefined : setNodeRef}
      value={id}
      dragging={isDragging}
      sorting={isSorting}
      handle={handle}
      handleProps={handle ? { ref: setActivatorNodeRef } : undefined}
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
