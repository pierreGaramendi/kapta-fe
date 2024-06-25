import { Button, CloseButton, FocusTrap, Group, Textarea } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { useListStore } from "../../store/ListStore";
import { isNotEmpty, useForm } from "@mantine/form";

interface INewCardButtonComponent {
  listId: string;
}

export const NewCardButtonComponent: React.FC<
  INewCardButtonComponent
> = ({ listId }) => {
  const [isCreating, setIsCreating] = useState(false);
  const addCardToList = useListStore((state: any) => state.addCardToList);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
    },
    validate: {
      name: isNotEmpty("Nombre de la Tarjeta es requerido"),
    },
  });
  const handleOnSubmit = (formValues: any) => {
    console.log('joyraaaaaaaaaaaaaaaaaa')
    const newCard = {
      _id: `card_${Date.now()}`,
      name: formValues.name,
      description: "",
      assigned_to: [],
      members: [],
      due_date: "",
      position: 1,
      labels: [],
      comments: [],
      log: [],
    };
    
    addCardToList(listId, newCard);
    form.reset();
    setIsCreating(false);
  };

  return (
    <>
      {isCreating ? (
        <>
          <form onSubmit={form.onSubmit(handleOnSubmit)}>
            <FocusTrap active={true}>
              <Textarea
                mt="sm"
                autosize
                placeholder="Escribe el titulo para tu nueva tarjeta..."
                key={form.key("name")}
                {...form.getInputProps("name")}
              />
            </FocusTrap>
            <Group justify="flex-end" mt="md">
              <CloseButton onClick={() => setIsCreating(false)} />
              <Button type="submit">Guardar</Button>
            </Group>
          </form>
        </>
      ) : (
        <Button
          mt="sm"
          color="violet"
          variant="default"
          fullWidth
          size="compact-md"
          fz="sm"
          onClick={() => setIsCreating(true)}
        >
          <IconPlus size={18} /> Añadir tarjeta
        </Button>
      )}
    </>
  );
};
