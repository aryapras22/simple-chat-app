import { ChatRoomData, Comment } from '@/types/data-types';
import { ChatBubble } from './chat-bubble';
import { memo } from 'react';

const ChatMessages = memo(
  ({
    chats,
    current_active_user,
    room,
  }: {
    chats: Comment[];
    current_active_user: string;
    room: ChatRoomData;
  }) => {
    return (
      <div className="flex flex-col space-y-1">
        {chats.map((chat, index) => {
          const isCurrentUser = chat.sender === current_active_user;
          const place = isCurrentUser ? 'right' : 'left';

          const isPreviousSameSender =
            index > 0 && chats[index - 1].sender === chat.sender;

          let showSenderName = isPreviousSameSender ? '' : chat.sender;
          const senderName = room.room.participant.find(
            (part) => part.id === chat.sender
          )?.name;
          if (senderName) {
            showSenderName = isPreviousSameSender ? '' : senderName;
          }

          return (
            <ChatBubble
              key={chat.id}
              place={place}
              sender={showSenderName}
              type={chat.type as 'text' | 'image' | 'video' | 'file'}
              data={chat.message}
            />
          );
        })}
      </div>
    );
  }
);

export default ChatMessages;
