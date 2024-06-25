import { Dialog, Flex, Text } from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";
import { useEffect } from "react";
interface INotificationComponentProps {
  opened: any;
  close: any;
}
const NotificationComponent: React.FC<INotificationComponentProps> = ({
  opened,
  close,
}) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      close();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [opened]);
  return (
    <Dialog
      opened={opened}
      withCloseButton
      onClose={close}
      size="lg"
      radius="md"
      bg="teal"
    >
      <Flex gap="md" justify="flex-start" align="center" direction="row">
        <IconCircleCheck color="white" size={40} />
        <Text>Lista Archivada</Text>
      </Flex>
    </Dialog>
  );
};

export default NotificationComponent;
