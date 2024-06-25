import { Card } from "@mantine/core";

interface ICardWrapperComponentProps {
  children?: React.ReactNode;
}
export const CardWrapperComponent: React.FC<ICardWrapperComponentProps> = ({
  children,
}) => {
  return (
    <Card
      style={{ cursor: "pointer" }}
      bg="rgba(0, 0, 0, .3)"
      shadow="sm"
      padding="sm"
      radius="md"
      withBorder
      id="card"
      mt="sm"
    >
      {children}
    </Card>
  );
};
