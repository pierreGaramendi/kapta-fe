import { ActionIcon, Menu } from "@mantine/core";
import { IconTrash, IconDotsVertical } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import NotificationComponent from "../../../components/Notification/Notification";
import { useListStore } from "../../store/ListStore";

interface IListActionsMenuComponentProps {
  list_id: string;
}

export const ListActionsMenuComponent: React.FC<
  IListActionsMenuComponentProps
> = ({ list_id }) => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const updateListAnyProp = useListStore(
    (state: any) => state.updateListAnyProp
  );
  const handleUpdate = () => {
    toggle();
    updateListAnyProp(list_id, { archived: true });
  };

  return (
    <>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <ActionIcon
            variant="outline"
            size="md"
            aria-label="Settings"
            color="violet"
          >
            <IconDotsVertical size={18} stroke={1.5} color="violet" />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Acciones</Menu.Label>
          <Menu.Item
            color="red"
            onClick={handleUpdate}
            leftSection={<IconTrash size={16} />}
          >
            Archivar Lista
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <NotificationComponent opened={opened} close={close} />
    </>
  );
};
