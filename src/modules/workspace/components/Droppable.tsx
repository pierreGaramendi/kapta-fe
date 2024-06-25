import { useDroppable } from "@dnd-kit/core";

export const Droppable = (props: any) => {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });

  const style = {
    color: isOver ? "green" : undefined,
    border: "solid",
    minWidth: "300px",
    minHeight: "200px",
    padding: "20px",
  };

  return (
    <div ref={setNodeRef} style={style} id={props.id}>
      {props.children}
    </div>
  );
};
