type TextBubbleProps = {
  data: string;
};

export const TextBubble = ({ data }: TextBubbleProps) => {
  return <div className="wrap-anywhere min-w-20">{data}</div>;
};
