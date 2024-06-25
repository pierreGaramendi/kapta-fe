import { Flex, FocusTrap, Input, Text } from "@mantine/core";
import { ListActionsMenuComponent } from "../ListActionsMenu/ListActionsMenuComponent";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { useListStore } from "../../store/ListStore";
interface IListHeaderComponentProps {
  title?: string;
  list_id: string;
}
export const ListHeaderComponent: React.FC<IListHeaderComponentProps> = ({
  title,
  list_id,
}) => {
  const [isEditting, setIsEditing] = useState(false);
  const updateListAnyProp = useListStore(
    (state: any) => state.updateListAnyProp
  );
  const form = useForm({
    mode: "uncontrolled",
    initialValues: { name: title },
  });
  const keyUp = (event: any) => {
    if (event.key === "Escape") {
      setIsEditing(false);
    }
    if (event.key === "Enter") {
      updateListAnyProp(list_id, { name: form.getValues().name });
      setIsEditing(false);
    }
  };

  return (
    <Flex justify="space-between" direction="row">
      {isEditting ? (
        <FocusTrap active={true}>
          <Input
            fw={700}
            onKeyUp={keyUp}
            key={form.key("name")}
            {...form.getInputProps("name")}
            onBlur={() => setIsEditing(false)}
          />
        </FocusTrap>
      ) : (
        <Text size="md" fw={700} onClick={() => setIsEditing(true)}>
          {title}
        </Text>
      )}
      <ListActionsMenuComponent list_id={list_id} />
    </Flex>
  );
};
