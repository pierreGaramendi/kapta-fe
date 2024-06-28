import { MultipleContainers } from "./examples/Sortable/MultipleContainers";
import { rectSortingStrategy } from "@dnd-kit/sortable";

export const SortablePage = () => {
  return (
      <MultipleContainers itemCount={5} strategy={rectSortingStrategy} />
  );
};
