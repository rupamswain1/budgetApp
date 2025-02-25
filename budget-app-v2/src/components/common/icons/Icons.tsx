const Icons: React.FC<{ Components: React.ElementType; color?: string }> = ({
  Components,
  color = "",
}) => {
  return (
    <Components size={30} color={color} style={{ fontWeight: "bold" }} />
  );
};

export default Icons;
