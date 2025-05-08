import { FileIcon } from 'lucide-react';

export const FileBubble = ({ data }: { data: string }) => {
  const fileName = data.split('/').pop() || 'File';

  return (
    <div className="p-3 flex items-center gap-2">
      <div className="bg-blue-100 p-2 rounded">
        <FileIcon className="h-5 w-5 text-blue-600" />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium truncate max-w-[200px]">
          {fileName}
        </span>
        <a
          href={data}
          download
          className="text-xs text-blue-600 hover:underline"
        >
          Download
        </a>
      </div>
    </div>
  );
};
