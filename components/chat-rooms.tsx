import React from 'react';
import { RoomCard } from './room-card';
import { mockdata } from '@/data/data-handler';
import { Label } from '@radix-ui/react-label';

const rooms = mockdata.results;

export const ChatRooms = () => {
  return (
    <div>
      <h1>
        <Label className="text-2xl font-semibold">Chats</Label>
      </h1>
      <div className="flex flex-col gap-1">
        {rooms.map((room) => {
          const roomId = room.room.id;
          const name = room.room.name;
          const image_url = room.room.image_url;
          const last_chat = room.comments[room.comments.length - 1];
          return (
            <RoomCard
              key={roomId}
              id={roomId}
              name={name}
              image_url={image_url}
              last_chat={last_chat}
            />
          );
        })}
      </div>
    </div>
  );
};
