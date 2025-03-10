'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Block, useEditorStore, BlockProps } from '@/store/editor';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const components = {
  hero: dynamic(() => import('@/components/blocks/Hero')),
  navbar: dynamic(() => import('@/components/blocks/Navbar')),
  header: dynamic(() => import('@/components/blocks/Header')),
  features: dynamic(() => import('@/components/blocks/Features')),
  content: dynamic(() => import('@/components/blocks/Content')),
  stats: dynamic(() => import('@/components/blocks/Stats')),
  team: dynamic(() => import('@/components/blocks/Team')),
  faq: dynamic(() => import('@/components/blocks/FAQ')),
  testimonials: dynamic(() => import('@/components/blocks/Testimonials')),
  logos: dynamic(() => import('@/components/blocks/Logos')),
  reviews: dynamic(() => import('@/components/blocks/Reviews')),
  pricing: dynamic(() => import('@/components/blocks/Pricing')),
  cta: dynamic(() => import('@/components/blocks/CTA')),
  newsletter: dynamic(() => import('@/components/blocks/Newsletter')),
  contact: dynamic(() => import('@/components/blocks/Contact')),
  footer: dynamic(() => import('@/components/blocks/Footer')),
  simpleFooter: dynamic(() => import('@/components/blocks/SimpleFooter')),
};

interface BlockRendererProps {
  block: Block;
}

const BlockRenderer = ({ block }: BlockRendererProps) => {
  const [isNew, setIsNew] = useState(true);
  const [showCode, setShowCode] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: block.id,
    data: {
      type: block.type,
      isTemplate: false,
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsNew(false), 50);
    return () => clearTimeout(timer);
  }, []);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: [
      transition,
      'opacity 200ms ease-in-out',
      'transform 200ms cubic-bezier(0.18, 0.67, 0.6, 1.22)',
    ].join(', '),
    opacity: isDragging ? 0.5 : 1,
    scale: isNew ? '0.8' : '1',
  };

  const Component = components[block.type];

  if (!Component) {
    return null;
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`relative group mb-4 ${isDragging ? 'z-50' : ''}`}
      onClick={() => useEditorStore.getState().setSelectedBlock(block.id)}
    >
      <div className="absolute -left-4 top-4 flex flex-col gap-2 z-10">
        <div
          {...listeners}
          className="w-8 h-8 bg-gray-100 rounded-lg opacity-0 group-hover:opacity-100 cursor-move flex items-center justify-center hover:bg-gray-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowCode(!showCode);
          }}
          className="w-8 h-8 bg-gray-100 rounded-lg opacity-0 group-hover:opacity-100 flex items-center justify-center hover:bg-gray-200"
          title={showCode ? "Hide Code" : "View Code"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
          </svg>
        </button>
      </div>

      <div className={`overflow-hidden border border-gray-200 rounded-lg shadow-sm transition-all duration-200 ${
        useEditorStore.getState().selectedBlockId === block.id ? 'ring-2 ring-blue-500' : ''
      }`}>
        <div className="relative">
          <div className={showCode ? 'opacity-25' : ''}>
            <Component {...(block.props as BlockProps)} />
          </div>
          {showCode && (
            <div className="absolute inset-0 bg-white/90 backdrop-blur-sm p-4 overflow-auto">
              <pre className="text-sm font-mono">
                <code>{JSON.stringify(block.props, null, 2)}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlockRenderer; 