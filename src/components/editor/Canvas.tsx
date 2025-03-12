'use client';

import { useDroppable } from '@dnd-kit/core';
import { useEditor } from '@/store/editor';
import BlockRenderer from './BlockRenderer';

const Canvas = () => {
  const { setNodeRef } = useDroppable({
    id: 'canvas',
  });
  const blocks = useEditor((state) => state.blocks);

  return (
    <div
      ref={setNodeRef}
      className="flex-1 h-full bg-gray-100 p-4 overflow-y-auto"
    >
      <div className="max-w-5xl mx-auto space-y-4">
        {blocks.map((block) => (
          <BlockRenderer key={block.id} block={block} />
        ))}
        {blocks.length === 0 && (
          <div className="h-[200px] rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
            <p className="text-gray-500">Drag and drop blocks here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Canvas; 