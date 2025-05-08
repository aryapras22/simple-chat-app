import Image from 'next/image';

type RoomAvatarType = {
  image_url: string;
  name: string;
};

const RoomAvatar = ({ image_url, name }: RoomAvatarType) => {
  const firstLetter = name.charAt(0).toUpperCase();
  return (
    <>
      <div className="relative h-10 w-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center text-gray-500">
        {image_url ? (
          <Image src={image_url} alt={name} fill className="object-cover" />
        ) : (
          <span className="font-medium">{firstLetter}</span>
        )}
      </div>
    </>
  );
};

export default RoomAvatar;
