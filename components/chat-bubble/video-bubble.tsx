'use client';

export const VideoBubble = ({ data }: { data: string }) => {
  return (
    <div className="w-full h-full max-w-xl">
      <video src={data} controls className="min-w-52 min-h-32 rounded-lg" />
    </div>
  );
};
