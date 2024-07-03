import React, { useEffect } from "react";
import classNames from "classnames";
import type { DraggableSyntheticListeners } from "@dnd-kit/core";
import type { Transform } from "@dnd-kit/utilities";
import styles from "./Item.module.css";
import { Card, Text } from "@mantine/core";

export interface Props {
  children?: React.ReactNode;
  dragOverlay?: boolean;
  color?: string;
  disabled?: boolean;
  dragging?: boolean;
  height?: number;
  index?: number;
  fadeIn?: boolean;
  transform?: Transform | null;
  listeners?: DraggableSyntheticListeners;
  sorting?: boolean;
  style?: React.CSSProperties;
  transition?: string | null;
/*   wrapperStyle?: React.CSSProperties; */
  value: React.ReactNode;
  onRemove?(): void;
  renderItem?(args: {
    dragOverlay: boolean;
    dragging: boolean;
    sorting: boolean;
    index: number | undefined;
    fadeIn: boolean;
    listeners: DraggableSyntheticListeners;
    ref: React.Ref<HTMLElement>;
    style: React.CSSProperties | undefined;
    transform: Props["transform"];
    transition: Props["transition"];
    value: Props["value"];
  }): React.ReactElement;
}

export const Item = React.memo(
  React.forwardRef<HTMLLIElement, Props>(({ ...properties }, ref) => {
    const {
      children,
      color,
      dragOverlay,
      dragging,
      disabled,
      fadeIn,
      height,
      index,
      listeners,
      onRemove,
      sorting,
      transition,
      transform,
      value,
      ...props
    } = properties;
    useEffect(() => {
      if (!dragOverlay) {
        return;
      }

      document.body.style.cursor = "grabbing";

      return () => {
        document.body.style.cursor = "";
      };
    }, [dragOverlay]);
    const stylesItem = {
      transition: [transition].filter(Boolean).join(", "),
      "--translate-x": transform ? `${Math.round(transform.x)}px` : undefined,
      "--translate-y": transform ? `${Math.round(transform.y)}px` : undefined,
      "--scale-x": transform?.scaleX ? `${transform.scaleX}` : undefined,
      "--scale-y": transform?.scaleY ? `${transform.scaleY}` : undefined,
      "--index": index,
      "--color": color,
    } as React.CSSProperties;
    return (
      <li
        className={classNames(
          styles.Wrapper,
          fadeIn && styles.fadeIn,
          sorting && styles.sorting,
          dragOverlay && styles.dragOverlay
        )}
        style={stylesItem}
        ref={ref}
      >
        <div
          className={classNames(dragging && styles.dragging, dragOverlay && styles.dragOverlay, disabled && styles.disabled)}
          data-cypress="draggable-item"
          {...listeners}
          {...props}
          style={{ width: "100%", marginBottom: "15px" }}
        >
          {/* {children} */}
          <Card shadow="sm" padding="lg" radius="md" withBorder color="lime.5" bg="dark.4">
            <Text size="sm" c="gray" fw={700}>
              {value} Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla sint nobis commodi harum voluptatem! Quis
              nobis enim id necessitatibus. Unde id ut minima at quae reiciendis eum quia incidunt ab!
            </Text>
          </Card>
        </div>
      </li>
    );
  })
);
