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
} from '@dnd-kit/core';
import { useState } from 'react';

interface Props {
  children: ReactNode;
  onDragEnd?: (event: DragEndEvent) => void;
}

const DndProvider = ({ children, onDragEnd }: Props) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [draggedLabel, setDraggedLabel] = useState<string>('');

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
    const label = (event.active.id as string).replace('template-', '');
    setDraggedLabel(label);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    setDraggedLabel('');
    onDragEnd?.(event);
  };

  return (
    <DndContext 
      sensors={sensors} 
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {children}
      <DragOverlay dropAnimation={null} modifiers={[]}>
        {activeId && (
          <div className="p-4 bg-white rounded-lg shadow-xl border-2 border-blue-500 cursor-grabbing select-none">
            {draggedLabel}
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default DndProvider; 