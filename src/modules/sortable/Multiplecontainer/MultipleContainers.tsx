import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  closestCenter,
  pointerWithin,
  rectIntersection,
  CollisionDetection,
  DndContext,
  DragOverlay,
  getFirstCollision,
  UniqueIdentifier,
} from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { Item, Container } from "../components";
import { useSensorsCustome } from "./hooks";
import {
  dropAnimation,
  TRASH_ID,
  PLACEHOLDER_ID,
  empty,
  getNextContainerId,
  measuringConfig,
} from "./MultipleContainers.constants";
import { Trash } from "../components/Trash/Trash";
import { SortableItem } from "../components/SortableItem/SortableItem";
import { DroppableContainer } from "./DroppableContainer";
import styles from "./MultipleContainers.module.css";

export function MultipleContainers({ fullList, onlyList, onlyListIds }: any) {
  const [items, setItems] = useState<any>(fullList);
  const [containers, setContainers] = useState(onlyListIds);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const lastOverId = useRef<UniqueIdentifier | null>(null);
  const recentlyMovedToNewContainer = useRef(false);
  const isSortingContainer = activeId ? containers.includes(activeId) : false;
  const collisionDetectionStrategy: CollisionDetection = useCallback(
    (args) => {
      if (activeId && activeId in items) {
        return closestCenter({
          ...args,
          droppableContainers: args.droppableContainers.filter((container) => container.id in items),
        });
      }

      // Start by finding any intersecting droppable
      const pointerIntersections = pointerWithin(args);
      const intersections =
        pointerIntersections.length > 0
          ? // If there are droppables intersecting with the pointer, return those
            pointerIntersections
          : rectIntersection(args);
      let overId = getFirstCollision(intersections, "id");

      if (overId != null) {
        if (overId === TRASH_ID) {
          // If the intersecting droppable is the trash, return early
          // Remove this if you're not using trashable functionality in your app
          return intersections;
        }

        if (overId in items) {
          const containerItems = items[overId];

          // If a container is matched and it contains items (columns 'A', 'B', 'C')
          if (containerItems.length > 0) {
            // Return the closest droppable within that container
            overId = closestCenter({
              ...args,
              droppableContainers: args.droppableContainers.filter(
                (container) => container.id !== overId && containerItems.includes(container.id)
              ),
            })[0]?.id;
          }
        }

        lastOverId.current = overId;

        return [{ id: overId }];
      }

      // When a draggable item moves to a new container, the layout may shift
      // and the `overId` may become `null`. We manually set the cached `lastOverId`
      // to the id of the draggable item that was moved to the new container, otherwise
      // the previous `overId` will be returned which can cause items to incorrectly shift positions
      if (recentlyMovedToNewContainer.current) {
        lastOverId.current = activeId;
      }

      // If no droppable is matched, return the last match
      return lastOverId.current ? [{ id: lastOverId.current }] : [];
    },
    [activeId, items]
  );

  const [clonedItems, setClonedItems] = useState<any | null>(null);
  const { sensors } = useSensorsCustome();

  const findContainer = (id: UniqueIdentifier) => {
    if (id in items) {
      return id;
    }

    return Object.keys(items).find((key) => items[key].includes(id));
  };

  const getIndex = (id: UniqueIdentifier) => {
    const container = findContainer(id);

    if (!container) {
      return -1;
    }

    const index = items[container].indexOf(id);

    return index;
  };

  const onDragCancel = () => {
    if (clonedItems) {
      // Reset items to their original state in case items have been
      // Dragged across containers
      setItems(clonedItems);
    }
    setActiveId(null);
    setClonedItems(null);
  };

  const onDragStart = ({ active }: any) => {
    setActiveId(active.id);
    setClonedItems(items);
  };

  useEffect(() => {
    requestAnimationFrame(() => {
      recentlyMovedToNewContainer.current = false;
    });
  }, [items]);

  //console.log("containers ", containers);

  const findListName = (id: string) => {
    const found = onlyList.find((list: any) => list._id === id);
    return found?.name ?? id;
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetectionStrategy}
      measuring={measuringConfig}
      onDragStart={onDragStart}
      onDragOver={({ active, over }) => {
        const overId = over?.id;
        if (overId == null || overId === TRASH_ID || active.id in items) {
          return;
        }
        const overContainer = findContainer(overId);
        const activeContainer = findContainer(active.id);
        if (!overContainer || !activeContainer) {
          return;
        }
        if (activeContainer !== overContainer) {
          setItems((items: any) => {
            const activeItems = items[activeContainer];
            const overItems = items[overContainer];
            const overIndex = overItems.indexOf(overId);
            const activeIndex = activeItems.indexOf(active.id);
            let newIndex: number;
            if (overId in items) {
              newIndex = overItems.length + 1;
            } else {
              const isBelowOverItem =
                over && active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height;
              const modifier = isBelowOverItem ? 1 : 0;
              newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
            }
            recentlyMovedToNewContainer.current = true;
            return {
              ...items,
              [activeContainer]: items[activeContainer].filter((item: any) => item !== active.id),
              [overContainer]: [
                ...items[overContainer].slice(0, newIndex),
                items[activeContainer][activeIndex],
                ...items[overContainer].slice(newIndex, items[overContainer].length),
              ],
            };
          });
        }
      }}
      onDragEnd={({ active, over }) => {
        if (active.id in items && over?.id) {
          setContainers((containers: any) => {
            const activeIndex = containers.indexOf(active.id);
            const overIndex = containers.indexOf(over.id);

            return arrayMove(containers, activeIndex, overIndex);
          });
        }
        const activeContainer = findContainer(active.id);
        if (!activeContainer) {
          setActiveId(null);
          return;
        }
        const overId = over?.id;
        if (overId == null) {
          setActiveId(null);
          return;
        }
        if (overId === TRASH_ID) {
          setItems((items: any) => ({
            ...items,
            [activeContainer]: items[activeContainer].filter((id: any) => id !== activeId),
          }));
          setActiveId(null);
          return;
        }
        if (overId === PLACEHOLDER_ID) {
          const newContainerId = getNextContainerId(items);
          setContainers((containers: any) => [...containers, newContainerId]);
          setItems((items: any) => ({
            ...items,
            [activeContainer]: items[activeContainer].filter((id: any) => id !== activeId),
            [newContainerId]: [active.id],
          }));
          setActiveId(null);
          return;
        }
        const overContainer = findContainer(overId);
        if (overContainer) {
          const activeIndex = items[activeContainer].indexOf(active.id);
          const overIndex = items[overContainer].indexOf(overId);
          if (activeIndex !== overIndex) {
            setItems((items: any) => ({
              ...items,
              [overContainer]: arrayMove(items[overContainer], activeIndex, overIndex),
            }));
          }
        }
        setActiveId(null);
      }}
      onDragCancel={onDragCancel}
    >
      <div style={{ display: "flex", flexDirection: "row", maxHeight: "100%" }}>
        <SortableContext items={[...containers, PLACEHOLDER_ID]} strategy={horizontalListSortingStrategy}>
          {containers.map((containerId: any) => (
            <DroppableContainer
              key={containerId}
              id={containerId}
              title={findListName(containerId)}
              items={items[containerId]}
              onRemove={() => handleRemoveList(containerId)}
            >
              <SortableContext items={items[containerId]} strategy={verticalListSortingStrategy}>
                {items[containerId].map((value: any, index: any) => {
                  return (
                    <SortableItem
                      disabled={isSortingContainer}
                      key={value}
                      id={value}
                      index={index}
                      containerId={containerId}
                      getIndex={getIndex}
                    />
                  );
                })}
              </SortableContext>
            </DroppableContainer>
          ))}
          {
            <div className={styles.NewContainer} id={PLACEHOLDER_ID} onClick={handleAddColumn}>
              + Add column
            </div>
          }
        </SortableContext>
      </div>
      {createPortal(
        <DragOverlay dropAnimation={dropAnimation}>
          {activeId
            ? containers.includes(activeId)
              ? renderContainerDragOverlay(activeId)
              : renderSortableItemDragOverlay(activeId)
            : null}
        </DragOverlay>,
        document.body
      )}
      {activeId && !containers.includes(activeId) ? <Trash id={TRASH_ID} /> : null}
    </DndContext>
  );

  function renderSortableItemDragOverlay(id: UniqueIdentifier) {
    //console.log("blanco fijo");
    return <Item value={id} dragOverlay />;
  }

  function renderContainerDragOverlay(containerId: any) {
    return (
      <Container title={findListName(containerId)} style={{ height: "100%" }}>
        {items[containerId].map((item: any, index: any) => (
          <Item key={item} value={item} />
        ))}
      </Container>
    );
  }

  function handleRemoveList(containerID: UniqueIdentifier) {
    setContainers((containers: any) => containers.filter((id: string) => id !== containerID));
  }

  function handleAddColumn() {
    const newContainerId = getNextContainerId(items);
    //console.log("newContainerId:    ", newContainerId);
    setContainers((containers: any) => [...containers, newContainerId]);
    setItems((items: any) => ({
      ...items,
      [newContainerId]: [],
    }));
  }
}
