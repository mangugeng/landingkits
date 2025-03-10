'use client';

import { ReactNode, useEffect, useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  defaultDropAnimation,
} from '@dnd-kit/core';
import { BlockType } from '@/store/editor';

interface DndProviderProps {
  children: ReactNode;
  onDragEnd: (event: DragEndEvent) => void;
}

const DragOverlayContent = ({ type, label }: { type: string; label: string }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-lg border-2 border-blue-500 cursor-grabbing">
      {label}
    </div>
  );
};

const DndProvider = ({ children, onDragEnd }: DndProviderProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [activeItem, setActiveItem] = useState<{ type: string; label: string } | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const type = active.data.current?.type;
    
    if (type) {
      const labelMap: Record<string, string> = {
        hero: 'Hero Section',
        features: 'Features',
        pricing: 'Pricing',
        testimonials: 'Testimonials',
        cta: 'Call to Action',
        footer: 'Footer',
      };

      setActiveItem({
        type,
        label: labelMap[type] || type,
      });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveItem(null);
    onDragEnd(event);
  };

  if (!isMounted) {
    return <div suppressHydrationWarning>{children}</div>;
  }

  return (
    <DndContext 
      sensors={sensors} 
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {children}
      <DragOverlay dropAnimation={null}>
        {activeItem && (
          <DragOverlayContent type={activeItem.type} label={activeItem.label} />
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default DndProvider; 