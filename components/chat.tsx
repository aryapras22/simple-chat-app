'use client';
import { useEffect, useRef, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatRooms } from '@/components/chat-rooms';
import { FileIcon, Paperclip, Send, Video, Image } from 'lucide-react';
import { DEFAULT_SENDER } from '@/data/data-handler';
import RoomAvatar from '@/components/room-avatar';
import { Button } from '@/components/ui/button';
import { ChatRoomData } from '@/types/data-types';
import ChatMessages from './chat-bubble/chat-messages';
import { Popover, PopoverContent } from './ui/popover';
import { PopoverTrigger } from '@radix-ui/react-popover';

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

  const handleFileUpload = (type: 'image' | 'video' | 'file') => {
    const input = document.createElement('input');
    input.type = 'file';

    if (type === 'image') {
      input.accept = 'image/*';
    } else if (type === 'video') {
      input.accept = 'video/*';
    } else {
      input.accept = '*/*';
    }

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      // data not saved on db btw
      const fileUrl = URL.createObjectURL(file);

      const comment = {
        id: chats[chats.length - 1].id + 1,
        type: type,
        message: fileUrl,
        sender: DEFAULT_SENDER,
      };

      setChats((chats) => [...chats, comment]);
    };

    input.click();
  };

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
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <Paperclip className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-48 p-2"
                align="end"
                side="top"
                sideOffset={5}
              >
                <div className="flex flex-col gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex justify-start items-center gap-2 w-full"
                    onClick={() => handleFileUpload('image')}
                  >
                    <Image className="h-4 w-4" />
                    <span>Image</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex justify-start items-center gap-2 w-full"
                    onClick={() => handleFileUpload('video')}
                  >
                    <Video className="h-4 w-4" />
                    <span>Video</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex justify-start items-center gap-2 w-full"
                    onClick={() => handleFileUpload('file')}
                  >
                    <FileIcon className="h-4 w-4" />
                    <span>File</span>
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            <Button onClick={handleSendMessage} disabled={!message.trim()}>
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
