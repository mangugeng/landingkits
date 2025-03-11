'use client';

import { DragEndEvent } from '@dnd-kit/core';
import { useEditorStore } from '@/store/editor';
import Sidebar from '@/components/editor/Sidebar';
import Canvas from '@/components/editor/Canvas';
import PropertyPanel from '@/components/editor/PropertyPanel';
import Toolbar from '@/components/editor/Toolbar';
import DndProvider from '@/components/editor/DndProvider';

export default function EditorPage() {
  const addBlock = useEditorStore((state) => state.addBlock);
  const reorderBlocks = useEditorStore((state) => state.reorderBlocks);
  const blocks = useEditorStore((state) => state.blocks);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    // Handle dropping a template block
    if (active.data.current?.isTemplate && over.id === 'canvas') {
      const type = active.data.current.type;
      addBlock(type);
      return;
    }

    // Handle reordering blocks
    if (!active.data.current?.isTemplate && over.id !== 'canvas') {
      const oldIndex = blocks.findIndex((block) => block.id === active.id);
      const newIndex = blocks.findIndex((block) => block.id === over.id);
      
      if (oldIndex !== -1 && newIndex !== -1) {
        reorderBlocks(oldIndex, newIndex);
      }
    }
  };

  return (
    <DndProvider onDragEnd={handleDragEnd}>
      <Toolbar />
      <div className="flex h-screen pt-14">
        <Sidebar />
        <Canvas />
        <PropertyPanel />
      </div>
    </DndProvider>
  );
} 