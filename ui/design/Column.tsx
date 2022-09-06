type Props = {
  size: number | "auto";
  children: React.ReactNode;
};

export default function Column({ size, children }: Props) {
  return (
    <div
      style={{
        boxSizing: "border-box",
        flex: size === "auto" ? "1 0 0" : `${(size / 12) * 100}% 0 0`,
        paddingLeft: "0.5rem",
        paddingRight: "0.5rem",
      }}
    >
      {children}
    </div>
  );
}
