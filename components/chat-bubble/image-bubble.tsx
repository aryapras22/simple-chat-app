'use client';
import { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

export const ImageBubble = ({ data }: { data: string }) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const openPreview = () => setIsPreviewOpen(true);
  const closePreview = () => setIsPreviewOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isPreviewOpen &&
        modalRef.current &&
        !imageRef.current?.contains(event.target as Node)
      ) {
        closePreview();
      }
    };

    if (isPreviewOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPreviewOpen]);

  useEffect(() => {
    if (isPreviewOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isPreviewOpen]);

  return (
    <>
      <div className="w-full h-full max-w-xl">
        <img
          src={data}
          alt="Image message"
          className="w-full h-full object-contain rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
          onClick={openPreview}
        />
      </div>

      {isPreviewOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          ref={modalRef}
        >
          <div className="relative max-w-xl max-h-[90vh] w-full">
            <button
              className="absolute top-2 right-2 bg-black/40 hover:bg-black/60 rounded-full p-1 text-white transition-colors z-10"
              onClick={closePreview}
            >
              <X size={24} />
            </button>
            <img
              ref={imageRef}
              src={data}
              alt="Full size image"
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
};
