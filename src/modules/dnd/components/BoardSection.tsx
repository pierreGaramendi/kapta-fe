import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Task } from "../types";
import TaskItem from "./TaskItem";
import SortableTaskItem from "./SortableTaskItem";

type BoardSectionProps = {
  id: string;
  title: string;
  tasks: Task[];
};

const BoardSection = ({ id, title, tasks }: BoardSectionProps) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <>
      <div id="list_title">{title}</div>
      <SortableContext
        id={id}
        items={tasks}
        strategy={verticalListSortingStrategy}
      >
        <div id="list_body" ref={setNodeRef}>
          {tasks.map((task) => (
            <SortableTaskItem id={task.id}>
              <TaskItem task={task} />
            </SortableTaskItem>
          ))}
        </div>
      </SortableContext>
    </>
  );
};

export default BoardSection;
