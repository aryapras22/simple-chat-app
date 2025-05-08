import { memo, useMemo } from 'react';
import { ImageBubble } from './image-bubble';
import { TextBubble } from './text-bubble';
import { VideoBubble } from './video-bubble';
import { FileBubble } from './file-bubble';

type ChatBubbleProps = {
  place: 'left' | 'right';
  sender: string;
  type: 'text' | 'image' | 'video' | 'file';
  data: string;
};

export const ChatBubble = memo(
  ({ place, sender, type, data }: ChatBubbleProps) => {
    const isMediaBubble = type !== 'text';

    const bubbleContent = useMemo(() => {
      switch (type) {
        case 'text':
          return <TextBubble data={data} />;
        case 'image':
          return <ImageBubble data={data} />;
        case 'video':
          return <VideoBubble data={data} />;
        case 'file':
          return <FileBubble data={data} />;
        default:
          return <TextBubble data={data} />;
      }
    }, [type, data]);

    return (
      <div
        className={`flex flex-col  ${
          place === 'right' ? 'items-end' : 'items-start'
        } `}
      >
        <span className="text-xs font-medium text-slate-500  mb-1 ml-2">
          {sender}
        </span>

        <div
          className={`flex items-end ${
            place === 'right' ? 'flex-row-reverse' : 'flex-row'
          }`}
        >
          <div
            className={`max-w-[75%] rounded-xl ${
              isMediaBubble ? 'p-0 overflow-hidden' : 'px-4 py-2'
            } ${
              place === 'right'
                ? `bg-slate-900 text-white  ${
                    !isMediaBubble && 'rounded-tr-none'
                  }`
                : `bg-white border border-slate-200  ${
                    !isMediaBubble && 'rounded-tl-none'
                  } text-slate-900`
            }`}
          >
            {bubbleContent}
          </div>
        </div>
      </div>
    );
  }
);
