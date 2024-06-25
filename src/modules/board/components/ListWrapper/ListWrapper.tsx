import { Card } from "@mantine/core";

interface IListWrapperComponentProps {
  children?: React.ReactNode;
}

export const ListWrapperComponent: React.FC<IListWrapperComponentProps> = ({
  children,
}) => {
  return (
    <Card
      shadow="sm"
      padding="sm"
      radius="md"
      withBorder
      id="list"
      style={{
        minWidth: "250px",
        maxWidth: "250px",
        height: "fit-content",
      }}
    >
      {children}
    </Card>
  );
};