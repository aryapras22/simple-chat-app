'use server';

import { Chat } from '@/components/chat';
import { Loading } from '@/components/loading';
import { getAllData, getData } from '@/data/data-handler';
import { Suspense } from 'react';

export default async function ChatRoomPage({ params }: { params: any }) {
  return (
    <Suspense fallback={<Loading />}>
      <ChatContent params={params} />
    </Suspense>
  );
}

async function ChatContent({ params }: { params: any }) {
  const { slug } = await params;
  const id = Number(slug);
  const room = await getData(id);
  const rooms = await getAllData();
  return <Chat room={room} rooms={rooms.results} />;
}
