'use client';

import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useEditorStore } from '@/store/editor';
import BlockRenderer from './BlockRenderer';

const Canvas = () => {
  const blocks = useEditorStore((state) => state.blocks);
  const { setNodeRef, isOver } = useDroppable({
    id: 'canvas',
  });

  return (
    <div className="flex-1 bg-gray-100 p-8 h-screen overflow-y-auto">
      <div
        ref={setNodeRef}
        className={`relative max-w-5xl mx-auto min-h-[calc(100vh-4rem)] bg-white rounded-lg shadow-sm p-8 transition-all duration-200 ${
          isOver ? 'ring-2 ring-blue-500 ring-opacity-50 shadow-lg scale-[1.01]' : ''
        }`}
      >
        {blocks.length === 0 ? (
          <div className={`h-full flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-lg transition-all duration-200 ${
            isOver ? 'border-blue-500 bg-blue-50 bg-opacity-50' : ''
          }`}>
            {isOver ? (
              <div className="text-center">
                <div className="text-blue-500 font-medium text-lg mb-2">
                  Lepaskan untuk menambahkan komponen
                </div>
                <div className="text-blue-400 text-sm">
                  Komponen akan ditambahkan di sini
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-gray-500 font-medium text-lg mb-2">
                  Area Konten
                </div>
                <div className="text-gray-400 text-sm">
                  Drag and drop komponen dari sidebar ke sini
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <SortableContext items={blocks.map((block) => block.id)} strategy={verticalListSortingStrategy}>
              {blocks.map((block) => (
                <BlockRenderer key={block.id} block={block} />
              ))}
            </SortableContext>
            {isOver && (
              <div className="absolute inset-0 border-2 border-blue-500 border-dashed rounded-lg pointer-events-none" />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Canvas; 