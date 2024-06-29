import { useSortable } from "@dnd-kit/sortable";
import { Container } from "../../components";
import { CSS } from "@dnd-kit/utilities";
import { animateLayoutChanges } from "./MultipleContainers.constants";

export function DroppableContainer({ children, disabled, id, items, ...props }: any) {
  const { attributes, isDragging, listeners, setNodeRef, transition, transform } = useSortable({
    id,
    data: {
      type: "container",
      children: items,
    },
    animateLayoutChanges,
  });

  return (
    <Container
      ref={disabled ? undefined : setNodeRef}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.1 : undefined,
      }}
      handleProps={{
        ...attributes,
        ...listeners,
      }}
      {...props}
    >
      {children}
    </Container>
  );
}
