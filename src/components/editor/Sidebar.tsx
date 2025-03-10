'use client';

import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { BlockType } from '@/store/editor';
import { useEffect, useState } from 'react';
import { blockGroups } from '@/constants/blockGroups';

interface BlockItemProps {
  type: BlockType;
  label: string;
}

const BlockItem = ({ type, label }: BlockItemProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `template-${type}`,
    data: {
      type,
      isTemplate: true,
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
      }
    : undefined;

  if (!isMounted) {
    return (
      <div className="p-4 mb-2 bg-white rounded-lg shadow cursor-move hover:shadow-md transition-shadow" suppressHydrationWarning>
        {label}
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`p-4 mb-2 bg-white rounded-lg shadow transition-all ${
        isDragging ? 'opacity-30 cursor-grabbing' : 'cursor-grab hover:shadow-md'
      }`}
      style={style}
    >
      {label}
    </div>
  );
};

const Sidebar = () => {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
    return blockGroups.reduce((acc, group) => ({
      ...acc,
      [group.id]: true
    }), {});
  });

  const toggleGroup = (groupId: string) => {
    setOpenGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  return (
    <div className="w-64 bg-gray-50 p-4 border-r border-gray-200 h-screen overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Komponen</h2>
      <div className="space-y-4">
        {blockGroups.map((group) => (
          <div key={group.id} className="space-y-2">
            <button
              onClick={() => toggleGroup(group.id)}
              className="flex items-center justify-between w-full text-left text-sm font-medium text-gray-900 hover:text-gray-600"
            >
              <span>{group.label}</span>
              <svg
                className={`h-5 w-5 transform transition-transform ${
                  openGroups[group.id] ? 'rotate-180' : ''
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {openGroups[group.id] && (
              <div className="pl-2 space-y-2">
                {group.blocks.map((block) => (
                  <BlockItem key={block.type} {...block} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar; 