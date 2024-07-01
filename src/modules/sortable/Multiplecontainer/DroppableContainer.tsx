import { useSortable } from "@dnd-kit/sortable";
import { Container } from "../components";
import { CSS } from "@dnd-kit/utilities";
import { animateLayoutChanges } from "./MultipleContainers.constants";

export function DroppableContainer({ children, disabled, id, items, ...props }: any) {
  const sortableConfig = { id, data: { type: "container", children: items }, animateLayoutChanges };
  const { attributes, isDragging, listeners, setNodeRef, transition, transform } = useSortable(sortableConfig);
  const stylesForContainer = { transition, transform: CSS.Translate.toString(transform), opacity: isDragging ? 0.5 : undefined };
  return (
    <Container
      ref={disabled ? undefined : setNodeRef}
      style={stylesForContainer}
      handleProps={{ ...attributes, ...listeners }}
      {...props}
    >
      {children}
    </Container>
  );
}
