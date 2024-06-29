import { forwardRef } from "react";
import { IconArrowsMove } from "@tabler/icons-react";
import { Action, ActionProps } from "../Action";

export const Handle = forwardRef<HTMLButtonElement, ActionProps>((props, ref) => {
  return (
    <Action ref={ref} cursor="grab" {...props}>
      <IconArrowsMove />
    </Action>
  );
});
