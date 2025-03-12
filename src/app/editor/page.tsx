'use client';

import { DragEndEvent } from '@dnd-kit/core';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import Sidebar from '@/components/editor/Sidebar';
import Canvas from '@/components/editor/Canvas';
import PropertyPanel from '@/components/editor/PropertyPanel';
import Toolbar from '@/components/editor/Toolbar';
import DndProvider from '@/components/editor/DndProvider';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useEditorStore } from '@/store/editor';

export default function EditorPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const addBlock = useEditorStore((state) => state.addBlock);
  const reorderBlocks = useEditorStore((state) => state.reorderBlocks);
  const blocks = useEditorStore((state) => state.blocks);
  const previewMode = useEditorStore((state) => state.previewMode);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
          const currentPath = window.location.pathname;
          router.push(`/login?redirectTo=${encodeURIComponent(currentPath)}`);
          return;
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error checking session:', error);
        router.push('/login');
      }
    };

    checkSession();
  }, [router]);

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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Memuat editor...</p>
        </div>
      </div>
    );
  }

  return (
    <DndProvider onDragEnd={handleDragEnd}>
      <Toolbar />
      <div className="flex h-screen pt-14">
        {!previewMode && <Sidebar />}
        <SortableContext 
          items={blocks.map(block => block.id)}
          strategy={verticalListSortingStrategy}
        >
          <Canvas />
        </SortableContext>
        {!previewMode && <PropertyPanel />}
      </div>
    </DndProvider>
  );
} 