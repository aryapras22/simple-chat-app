import { ChatRoomData } from '@/types/data-types';
import { RoomCard } from './room-card';
import { Label } from '@radix-ui/react-label';

export const ChatRooms = ({ rooms }: { rooms: ChatRoomData[] }) => {
  return (
    <div>
      <h1>
        <Label className="text-2xl font-semibold">Chats</Label>
      </h1>
      <div className="flex flex-col gap-1">
        {rooms.map((room) => {
          const roomId = room.room.id;
          let name = room.room.name;
          const image_url = room.room.image_url;
          let last_chat = room.comments[room.comments.length - 1];
          const sender = room.room.participant.find(
            (part) => part.id === last_chat.sender
          )?.name;

          if (sender) {
            last_chat.sender = sender;
          }

          if (room.room.participant.length === 2) {
            const room_receiver = room.room.participant.find(
              (part) => part.id === room.room.name
            );
            name = room_receiver?.name || '';
          }

          let message_placeholder = last_chat.message;

          if (last_chat.type === 'image') {
            message_placeholder = `sending an image.`;
          } else if (last_chat.type === 'video') {
            message_placeholder = `sending a video.`;
          } else if (last_chat.type === 'file') {
            message_placeholder = `sending a file.`;
          }

          return (
            <RoomCard
              key={roomId}
              id={roomId}
              name={name}
              image_url={image_url}
              last_chat={last_chat}
              message_placeholder={message_placeholder}
            />
          );
        })}
      </div>
    </div>
  );
};
