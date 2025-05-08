'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import RoomAvatar from './room-avatar';

type RoomCardProps = {
  id: number;
  name: string;
  image_url: string;
  last_chat: any;
  message_placeholder: string;
  className?: string;
};

export const RoomCard = ({
  id,
  name,
  image_url,
  last_chat,
  message_placeholder,
  className = '',
}: RoomCardProps) => {
  const path = usePathname();
  const style = {
    background: path.startsWith(`/rooms/${id}`) ? 'bg-gray-100' : '',
  };
  return (
    <div
      className={`p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer ${className} ${style.background}`}
    >
      <div className="flex items-center gap-3">
        <RoomAvatar image_url={image_url} name={name} />

        <div className="flex flex-col flex-1 overflow-hidden">
          <Link href={`/rooms/${id}`}>
            <div className="flex items-center justify-between">
              <h3 className="font-medium truncate">{name}</h3>
            </div>

            <p className="text-sm text-gray-600 truncate">
              <span className="font-medium">{last_chat.sender}</span>:{' '}
              {message_placeholder}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};
