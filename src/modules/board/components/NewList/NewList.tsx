import { Box, Card, CloseButton, FocusTrap } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { Button, Group, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useListStore } from "../../store/ListStore";

export const NewListComponent = () => {
  const { id } = useParams<{ id: string }>();
  const [creating, SetCreating] = useState(false);
  const addList = useListStore((state: any) => state.addList);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
    },
    validate: {
      name: isNotEmpty("Nombre de Lista es requerido"),
    },
  });
  const handleOnSubmit = (formValues: any) => {
    const newList = {
      _id: `list_${Date.now()}`,
      board_id: id,
      name: formValues.name,
      archived: false,
      position: 0,
      cards: [],
    };
    addList(newList);
    form.reset();
    SetCreating(false);
  };
  return (
    <Box>
      {creating ? (
        <Card
          bg="rgba(0, 0, 0, .3)"
          shadow="sm"
          padding="sm"
          radius="md"
          withBorder
          id="card"
          style={{ minWidth: "250px" }}
        >
          <form onSubmit={form.onSubmit(handleOnSubmit)}>
            <FocusTrap active={true}>
              <TextInput
                withAsterisk
                label="Nombre de la Nueva Lista"
                placeholder="Waiting, Done, etc"
                key={form.key("name")}
                {...form.getInputProps("name")}
              />
            </FocusTrap>
            <Group justify="flex-end" mt="md">
              <CloseButton onClick={() => SetCreating(false)} />
              <Button type="submit">Guardar</Button>
            </Group>
          </form>
        </Card>
      ) : (
        <Button
          style={{ minWidth: "250px" }}
          fullWidth
          leftSection={<IconPlus size={14} />}
          variant="default"
          onClick={() => SetCreating(true)}
        >
          Crear Lista
        </Button>
      )}
    </Box>
  );
};
