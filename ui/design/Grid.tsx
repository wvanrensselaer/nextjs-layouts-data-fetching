type Props = {
  children: React.ReactNode;
};

export default function Grid({ children }: Props) {
  return (
    <div
      style={{
        marginLeft: "-0.5rem",
        marginRight: "-0.5rem",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {children}
    </div>
  );
}
