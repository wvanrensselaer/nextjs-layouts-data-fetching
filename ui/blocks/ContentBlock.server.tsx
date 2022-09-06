type Props = {
  content: string;
};

export default function ContentBlock({ content }: Props) {
  return <div>{content}</div>;
}
