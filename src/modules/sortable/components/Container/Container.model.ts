export interface ContainerProps {
  children: React.ReactNode;
  title?: string;
  style?: React.CSSProperties;
  handleProps?: React.HTMLAttributes<any>;
  onClick?(): void;
  onRemove?(): void;
}
