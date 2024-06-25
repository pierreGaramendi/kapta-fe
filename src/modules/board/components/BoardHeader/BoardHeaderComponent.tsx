import { Box } from "@mantine/core";
import styles from "./BoardHeaderComponent.module.css";
interface IBoardHeaderComponentProps {
  title?: string;
}
export const BoardHeaderComponent: React.FC<IBoardHeaderComponentProps> = ({
  title,
}: any) => {
  return (
    <header className="border">
      <Box p="lg" fw={700} className={styles.blurredBackground}>
        Lists for Board {title}
      </Box>
    </header>
  );
};
