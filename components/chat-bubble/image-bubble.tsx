'use client';

export const ImageBubble = ({ data }: { data: string }) => {
  return (
    <div className="w-full h-full max-w-xl">
      <img
        src={data}
        alt="Image message"
        className="w-full h-full object-contain rounded-lg"
      />
    </div>
  );
};
