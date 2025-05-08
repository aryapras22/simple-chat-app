'use client';
import React from 'react';
import { ChatRooms } from '@/components/chat-rooms';
import { useParams } from 'next/navigation';
import { Paperclip, Send } from 'lucide-react';
import { mockdata } from '@/data/data-handler';
import RoomAvatar from '@/components/room-avatar';
import { Button } from '@/components/ui/button';

const ChatRoom = () => {
  const { slug } = useParams();
  const roomId = Number(slug);

  const room = mockdata.results.find((room) => room.room.id === roomId) || {
    room: {
      id: roomId,
      name: 'Unknown Room',
      image_url: '',
      participant: [],
    },
  };

  const room_metadata = room.room;

  return (
    <div className="flex h-screen bg-white dark:bg-slate-950">
      <div className="hidden md:block md:w-1/3 lg:w-1/4 border-r border-slate-200 dark:border-slate-800 overflow-y-auto">
        <div className="p-4">
          <ChatRooms />
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="border-b border-slate-200 h-18 dark:border-slate-800 p-4 bg-white dark:bg-slate-950">
          <div className="flex gap-3 items-center ">
            <RoomAvatar
              image_url={room_metadata.image_url}
              name={room_metadata.name}
            />
            <div>
              <h2 className="text-lg font-medium text-slate-900 dark:text-slate-50">
                {room?.room.name}
              </h2>
              {room_metadata.participant.length > 2 && (
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {room_metadata.participant
                    .map((part) => part.name)
                    .join(', ')}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 bg-slate-50 dark:bg-slate-900">
          <div className="py-20 text-slate-500 dark:text-slate-400 text-center">
            Chat content for room {roomId}
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-950">
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 px-3 py-2 rounded-md text-sm bg-transparent border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-400 focus:ring-opacity-50"
              placeholder="Type your message..."
            />
            <Button
              variant={'outline'}
              className="p-2 rounded-md text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Paperclip className="h-5 w-5" />
            </Button>
            <Button className="p-2 rounded-md bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 transition-colors">
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
