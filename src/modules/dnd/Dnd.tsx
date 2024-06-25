import { useState } from "react";
import {
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  DndContext,
  closestCorners,
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
  DragOverlay,
  DropAnimation,
  defaultDropAnimation,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates, arrayMove } from "@dnd-kit/sortable";
import { INITIAL_TASKS } from "./data";
import { BoardSections as BoardSectionsType } from "./types";
import { getTaskById } from "./utils/tasks";
import { findBoardSectionContainer, initializeBoard } from "./utils/board";
import BoardSection from "./components/BoardSection";
import TaskItem from "./components/TaskItem";

export const DndPageDemo = () => {
  const tasks = INITIAL_TASKS;
  const initialBoardSections = initializeBoard(INITIAL_TASKS);
  const [boardSections, setBoardSections] = useState<BoardSectionsType>(initialBoardSections);
  console.log("initialBoardSections", initialBoardSections);
  const [activeTaskId, setActiveTaskId] = useState<null | string>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveTaskId(active.id as string);
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    const activeContainer = findBoardSectionContainer(boardSections, active.id as string);
    const overContainer = findBoardSectionContainer(boardSections, over?.id as string);
    if (!activeContainer || !overContainer || activeContainer === overContainer) {
      return;
    }
    setBoardSections((boardSection) => {
      const activeItems = boardSection[activeContainer];
      const overItems = boardSection[overContainer];

      // Find the indexes for the items
      const activeIndex = activeItems.findIndex((item) => item.id === active.id);
      const overIndex = overItems.findIndex((item) => item.id !== over?.id);

      return {
        ...boardSection,
        [activeContainer]: [
          ...boardSection[activeContainer].filter((item) => item.id !== active.id),
        ],
        [overContainer]: [
          ...boardSection[overContainer].slice(0, overIndex),
          boardSections[activeContainer][activeIndex],
          ...boardSection[overContainer].slice(overIndex, boardSection[overContainer].length),
        ],
      };
    });
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    console.log("active",active)
    console.log("over",over)
    const activeContainer = findBoardSectionContainer(boardSections, active.id as string);
    const overContainer = findBoardSectionContainer(boardSections, over?.id as string);

    if (!activeContainer || !overContainer || activeContainer !== overContainer) {
      return;
    }

    const activeIndex = boardSections[activeContainer].findIndex((task) => task.id === active.id);
    const overIndex = boardSections[overContainer].findIndex((task) => task.id === over?.id);

    if (activeIndex !== overIndex) {
      setBoardSections((boardSection) => ({
        ...boardSection,
        [overContainer]: arrayMove(boardSection[overContainer], activeIndex, overIndex),
      }));
    }

    setActiveTaskId(null);
  };

  const dropAnimation: DropAnimation = {
    ...defaultDropAnimation,
  };

  const task = activeTaskId ? getTaskById(tasks, activeTaskId) : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div id="main" style={{ display: "flex", flexDirection: "row" }}>
        {Object.keys(boardSections).map((boardSectionKey) => (
          <div
            key={boardSectionKey}
            id="list"
            style={{ border: "solid", padding: "20px", margin: "10px" }}
          >
            <BoardSection
              id={boardSectionKey}
              title={boardSectionKey}
              tasks={boardSections[boardSectionKey]}
            />
          </div>
        ))}
        <DragOverlay dropAnimation={dropAnimation}>
          {task ? <TaskItem task={task} /> : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
};
