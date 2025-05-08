import React from 'react';

export const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-4">
      <div className="flex items-center justify-center">
        <div className="h-12 w-12 rounded-full border-4 border-slate-200 border-t-slate-900 animate-spin"></div>
      </div>
      <div className="text-center">
        <h2 className="text-xl font-medium text-slate-900">Loading</h2>
        <p className="text-sm text-slate-500">
          Please wait while we load your content...
        </p>
      </div>
    </div>
  );
};
