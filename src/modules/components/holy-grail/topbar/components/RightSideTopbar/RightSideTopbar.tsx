import { ActionIcon } from "@mantine/core";
import { IconMenu2 } from "@tabler/icons-react";
import { useAsideStore } from "../../../../../stores/useAsideStore";

export const RightSideTopbar = () => {
    const toggleAside = useAsideStore((state) => state.toggleAside);
  return (
    <>
      <ActionIcon
        className="toggle-btn"
        onClick={toggleAside}
        color="violet"
        variant="filled"
        size="lg"
        aria-label="Settings"
      >
        <IconMenu2 style={{ width: "70%", height: "70%" }} stroke={1.5} />
      </ActionIcon>
    </>
  );
};
