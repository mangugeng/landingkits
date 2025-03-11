'use client';

import { ReactNode } from 'react';
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  defaultDropAnimationSideEffects,
} from '@dnd-kit/core';
import { useState } from 'react';
import { useEditorStore } from '@/store/editor';

interface Props {
  children: ReactNode;
  onDragEnd?: (event: DragEndEvent) => void;
}

const DndProvider = ({ children, onDragEnd }: Props) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [draggedType, setDraggedType] = useState<string | null>(null);
  const previewMode = useEditorStore((state) => state.previewMode);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 5,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 100,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
    if (event.active.data.current?.isTemplate) {
      setDraggedType(event.active.data.current.type);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    setDraggedType(null);
    onDragEnd?.(event);
  };

  if (previewMode) {
    return <>{children}</>;
  }

  return (
    <DndContext 
      sensors={sensors} 
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {children}
      <DragOverlay
        dropAnimation={{
          duration: 150,
          sideEffects: defaultDropAnimationSideEffects({
            styles: {
              active: {
                opacity: '0.4',
              },
            },
          }),
        }}
        modifiers={[]}
      >
        {activeId && draggedType && (
          <div className="p-3 bg-white rounded-lg shadow-lg border-2 border-blue-500 w-64 pointer-events-none">
            <div className="text-sm font-medium text-gray-700">
              {draggedType.charAt(0).toUpperCase() + draggedType.slice(1)}
            </div>
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default DndProvider; 