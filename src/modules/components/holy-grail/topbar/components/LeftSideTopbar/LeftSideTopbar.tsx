import { ActionIcon, Avatar, Button, Flex, Group, Menu, Modal, Text, TextInput, Textarea, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus, IconSettings, IconMessageCircle, IconPhoto } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import useUserStore from "../../../../../stores/userStore";

export const LeftSideTopbar = () => {
  const { user } = useUserStore();
  const insertWorkspace = (id: any, ws: any) => {
    return { succes: true };
  };

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      description: "",
    },
    validate: {
      name: (value: any) => (value.length <= 0 ? "Name must have at least 2 letters" : null),
    },
  });
  const handleOnSubmit = async (form: any) => {
    const newWorkspace = {
      _id: `workspace_${Date.now()}`,
      name: form.name,
      description: form.description,
      boards: [],
      members: [user?._id],
    };

    try {
      const result = await insertWorkspace(user?._id || "", newWorkspace);
      if (result.success) {
        /* setMessage(result.message); */
        close();
      } else {
        /* setMessage(`Failed to add workspace: ${result.message}`); */
      }
    } catch (error: any) {
      console.error("Error adding workspace", error);
    }
  };
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Modal opened={opened} onClose={close} centered withCloseButton={false}>
        <Text fw={700} size="xl">
          Nuevo Espacio de Trabajo
        </Text>
        <Text>Impulsa tu productividad facilitándoles a todos el acceso a los tableros en una única ubicación.</Text>
        <form onSubmit={form.onSubmit(handleOnSubmit)}>
          <TextInput
            mt="md"
            label="Nombre del Espacio de Trabajo"
            placeholder="Importaciones SAC"
            key={form.key("name")}
            {...form.getInputProps("name")}
          />
          <Textarea
            mt="md"
            label="Descripción del Espacio de trabajo"
            placeholder="Nuestro equipo lo organiza todo aquí."
            minRows={4}
            key={form.key("description")}
            {...form.getInputProps("description")}
          />
          <Group justify="center" mt="xl">
            <Button type="submit" mt="sm">
              Submit
            </Button>
          </Group>
        </form>
      </Modal>
      <Flex mih={50} gap="xs" justify="center" align="center" direction="row" wrap="wrap">
        <Menu withArrow>
          <Menu.Target>
            <ActionIcon color="violet" variant="filled" size="lg" aria-label="Settings">
              <IconPlus style={{ width: "70%", height: "70%" }} stroke={1.5} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>Crea elemento</Menu.Label>
            <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>Crear Tablero</Menu.Item>
            <Menu.Item onClick={open} leftSection={<IconMessageCircle style={{ width: rem(14), height: rem(14) }} />}>
              Crear Espacio de Trabajo
            </Menu.Item>
            <Menu.Item leftSection={<IconPhoto style={{ width: rem(14), height: rem(14) }} />}>
              Empezar desde una plantilla
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
        <Avatar
          /* src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80" */
          alt="it's me"
          color="violet"
          variant="gradient"
        >
          AA
        </Avatar>
      </Flex>
    </>
  );
};
