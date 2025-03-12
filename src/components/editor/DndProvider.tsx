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
  DragOverEvent,
} from '@dnd-kit/core';
import { useState } from 'react';
import { useEditor } from '@/store/editor';

interface Props {
  children: ReactNode;
}

const DndProvider = ({ children }: Props) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const addBlock = useEditor((state) => state.addBlock);
  const moveBlock = useEditor((state) => state.moveBlock);
  const blocks = useEditor((state) => state.blocks);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && over.id === 'canvas') {
      const isTemplate = active.data.current?.isTemplate;
      if (isTemplate) {
        const template = active.data.current?.template;
        addBlock(template);
      }
    }

    setActiveId(null);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) return;

    const isTemplate = active.data.current?.isTemplate;
    if (isTemplate) return;

    const overId = over.id as string;
    if (overId === activeId) return;

    const oldIndex = blocks.findIndex((block) => block.id === activeId);
    const newIndex = blocks.findIndex((block) => block.id === overId);

    if (oldIndex !== -1 && newIndex !== -1) {
      moveBlock(oldIndex, newIndex);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      {children}
    </DndContext>
  );
};

export default DndProvider; 