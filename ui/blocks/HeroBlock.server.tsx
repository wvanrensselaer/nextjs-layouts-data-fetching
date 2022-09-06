type Props = {
  color: string;
};

export default function HeroBlock({ color }: Props) {
  return (
    <div
      style={{
        backgroundColor: color,
        borderRadius: "4px",
        height: "4rem",
        padding: "1rem",
      }}
    >
      Hero
    </div>
  );
}
