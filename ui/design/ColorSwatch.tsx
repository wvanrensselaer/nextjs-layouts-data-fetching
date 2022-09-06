type Props = {
  color: string;
  isSelected?: boolean;
};

export default function ColorSwatch(props: Props) {
  return (
    <span
      style={{
        border: props.isSelected ? "1px solid #121212" : "1px solid #bbb",
        display: "inline-block",
        marginRight: "0.5rem",
        width: "10px",
        height: "10px",
        backgroundColor: props.color,
      }}
    />
  );
}
