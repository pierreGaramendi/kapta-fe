import { Action, ActionProps } from "../Action";
import { IconCircleXFilled } from "@tabler/icons-react";
export function Remove(props: ActionProps) {
  return (
    <Action {...props}>
      <IconCircleXFilled></IconCircleXFilled>
    </Action>
  );
}
