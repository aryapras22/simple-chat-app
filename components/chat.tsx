'use client';
import { useEffect, useRef, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatRooms } from '@/components/chat-rooms';
import { Paperclip, Send } from 'lucide-react';
import { DEFAULT_SENDER } from '@/data/data-handler';
import RoomAvatar from '@/components/room-avatar';
import { Button } from '@/components/ui/button';
import { ChatRoomData } from '@/types/data-types';
import ChatMessages from './chat-bubble/chat-messages';

export const Chat = ({
  room,
  rooms,
}: {
  room: ChatRoomData;
  rooms: ChatRoomData[];
}) => {
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [chats, setChats] = useState(room.comments);
  const room_metadata = room.room;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const comment = {
      id: chats[chats.length - 1].id + 1,
      type: 'text' as 'text',
      message: message,
      sender: DEFAULT_SENDER,
    };
    setChats((chats) => [...chats, comment]);
    setMessage('');
  };

  const HeaderContent = () => {
    if (room_metadata.participant.length > 2) {
      return (
        <>
          <h2 className="text-lg font-medium text-slate-900 ">
            {room?.room.name}
          </h2>
          <p className="text-sm text-slate-500 ">
            {room_metadata.participant.map((part) => part.name).join(', ')}
          </p>
        </>
      );
    } else {
      const room_receiver = room_metadata.participant.find(
        (part) => part.id === room_metadata.name
      );

      return (
        <>
          <h2 className="text-lg font-medium text-slate-900 ">
            {room_receiver?.name}
          </h2>
          <p className="text-sm text-slate-500 ">{room_receiver?.id}</p>
        </>
      );
    }
  };

  return (
    <div className="flex h-screen bg-white ">
      <div className="hidden md:block md:w-1/3 lg:w-1/4 border-r border-slate-200 overflow-y-auto">
        <div className="p-4">
          <ChatRooms rooms={rooms} />
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="border-b border-slate-200 p-4 bg-white ">
          <div className="flex gap-3 items-center ">
            <RoomAvatar
              image_url={room_metadata.image_url}
              name={room_metadata.name}
            />
            <div>
              <HeaderContent />
            </div>
          </div>
        </div>

        <ScrollArea
          type="scroll"
          className="flex-1 overflow-y-auto p-4 bg-slate-50 "
        >
          <ChatMessages
            chats={chats}
            current_active_user={DEFAULT_SENDER}
            room={room}
          />
          <div ref={messagesEndRef} />
        </ScrollArea>

        <div className="border-t border-slate-200  p-4 bg-white ">
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 px-3 py-2 rounded-md text-sm bg-transparent border border-slate-200  focus:outline-none focus:ring-2 focus:ring-slate-400  focus:ring-opacity-50"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button variant={'outline'}>
              <Paperclip className="h-5 w-5" />
            </Button>
            <Button onClick={handleSendMessage} disabled={!message.trim()}>
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
