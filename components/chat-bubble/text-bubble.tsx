type TextBubbleProps = {
  data: string;
};

export const TextBubble = ({ data }: TextBubbleProps) => {
  return (
    <p className="px-3 py-2 break-words whitespace-pre-wrap hyphens-auto">
      {data}
    </p>
  );
};
