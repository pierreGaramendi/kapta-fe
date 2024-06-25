import { Group, Code, Text, Flex } from "@mantine/core";
import Logo from "../../../../assets/kapta.png";

export const NavbarHeader = () => {
  return (
    <Group justify="space-between">
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Flex mih={50} gap="sm" align="center" direction="row">
          <img
            src={Logo}
            alt="Logo"
            style={{ maxWidth: "50px", maxHeight: "50px" }}
          />
          <Text fw={700} size="xl">
            Kapta
          </Text>
        </Flex>
      </div>
      <Code fw={700}>v1.0.0</Code>
    </Group>
  );
};