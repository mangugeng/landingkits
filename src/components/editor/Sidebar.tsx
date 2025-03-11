'use client';

import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { blockGroups } from '@/constants/blockGroups';

const Sidebar = () => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Komponen</h2>
      
      {blockGroups.map((group) => (
        <div key={group.id} className="mb-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">{group.label}</h3>
          <div className="space-y-2">
            {group.blocks.map((block) => (
              <DraggableBlockItem
                key={block.type}
                type={block.type}
                label={block.label}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

interface DraggableBlockItemProps {
  type: string;
  label: string;
}

const DraggableBlockItem = ({ type, label }: DraggableBlockItemProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `template-${type}`,
    data: {
      type,
      isTemplate: true,
    },
  });

  const style = transform ? {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? '0.3' : '1',
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className={`
        p-3 bg-gray-50 rounded-lg select-none cursor-grab
        hover:bg-gray-100
        ${isDragging ? 'opacity-30 pointer-events-none' : ''}
      `}
    >
      <div className="text-sm font-medium text-gray-700">{label}</div>
    </div>
  );
};

export default Sidebar; 