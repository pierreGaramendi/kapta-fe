interface IBoardWrapperComponentkProps {
  children?: React.ReactNode;
}

export const BoardWrapperComponent: React.FC<IBoardWrapperComponentkProps> = ({
  children,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        height: "100%",
        width: "-webkit-fill-available",
        backgroundImage:
          "url(https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2400x1600/2795589724bc7b6f3d76faa9b84d4527/photo-1587327903256-2265e70b5660.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {children}
    </div>
  );
};