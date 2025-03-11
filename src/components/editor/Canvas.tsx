'use client';

import { useDroppable } from '@dnd-kit/core';
import { useEditorStore } from '@/store/editor';
import BlockRenderer from './BlockRenderer';

const Canvas = () => {
  const blocks = useEditorStore((state) => state.blocks);
  const previewMode = useEditorStore((state) => state.previewMode);

  const { setNodeRef, isOver, active } = useDroppable({
    id: 'canvas',
  });

  const isTemplateOver = isOver && active?.data?.current?.isTemplate;

  return (
    <div 
      ref={setNodeRef}
      id="canvas" 
      className={`flex-1 bg-gray-50 overflow-y-auto ${previewMode ? 'p-0' : 'p-8'}`}
    >
      <div 
        className={`
          mx-auto transition-colors duration-200 ease-in-out
          ${previewMode 
            ? 'w-full' 
            : `max-w-6xl bg-white shadow-sm border ${isTemplateOver ? 'border-blue-500 border-2' : 'border-gray-200'} min-h-[calc(100vh-8rem)]`
          }
        `}
      >
        {blocks.length === 0 && !previewMode && (
          <div className={`
            flex flex-col items-center justify-center h-[calc(100vh-8rem)] 
            ${isTemplateOver ? 'bg-blue-50' : 'text-gray-400'}
            transition-colors duration-200 ease-in-out
          `}>
            {isTemplateOver ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mb-4 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="text-lg font-medium text-blue-700">Lepaskan untuk menambahkan blok</p>
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="text-lg font-medium">Seret blok dari sidebar ke sini</p>
                <p className="text-sm mt-2">
                  Mulai dengan menambahkan blok untuk membuat landing page Anda
                </p>
              </>
            )}
          </div>
        )}

        {blocks.map((block) => (
          <BlockRenderer 
            key={block.id} 
            block={block} 
            isPreview={previewMode}
          />
        ))}
      </div>
    </div>
  );
};

export default Canvas; 