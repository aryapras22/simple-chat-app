'use server';
import { ChatRooms } from '@/components/chat-rooms';
import { Loading } from '@/components/loading';
import { getAllData } from '@/data/data-handler';
import { ApiResponse } from '@/types/data-types';
import { Suspense } from 'react';

export default async function HomePage() {
  const data = await getAllData();
  return (
    <Suspense fallback={<Loading />}>
      <HomeContent data={data} />
    </Suspense>
  );
}

function HomeContent({ data }: { data: ApiResponse }) {
  return (
    <div className="flex h-screen bg-white ">
      <div className="w-full md:w-1/3 lg:w-1/4 border-r border-slate-200  overflow-y-auto">
        <div className="p-4">
          <ChatRooms rooms={data.results} />
        </div>
      </div>

      <div className="hidden md:flex flex-1 flex-col items-center justify-center bg-slate-50 ">
        <div className="max-w-md text-center p-6">
          <div className="rounded-full bg-slate-100  p-6 w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-slate-400 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-medium text-slate-900  mb-2">
            No chat selected
          </h2>
          <p className="text-slate-500 ">
            Select a conversation from the sidebar to start chatting or create a
            new one.
          </p>
        </div>
      </div>
    </div>
  );
}
