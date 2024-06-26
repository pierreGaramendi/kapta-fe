import React, { forwardRef } from "react";
import classNames from "classnames";
import { Handle, Remove } from "../Item";
import styles from "./Container.module.css";
import { ContainerProps } from ".";

export const Container = forwardRef<any, ContainerProps>(({ ...properties }: ContainerProps, ref) => {
  const { children, handleProps, onClick, onRemove, title, style, ...props } = properties;
  const Component = onClick ? "button" : "div";
  return (
    <Component
      {...props}
      ref={ref}
      style={{ ...style } as React.CSSProperties}
      className={classNames(styles.Container, styles.scrollable)}
      onClick={onClick}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className={styles.Header}>
        {title}
        <div className={styles.Actions}>
          <Remove onClick={onRemove} />
          <Handle {...handleProps} />
        </div>
      </div>
      <ul>{children}</ul>
    </Component>
  );
});
