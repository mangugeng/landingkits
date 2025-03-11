'use client';

import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useEditorStore, Block } from '@/store/editor';
import dynamic from 'next/dynamic';
import type { CSSProperties } from 'react';

// Dynamically import block components
const Hero = dynamic(() => import('@/components/blocks/Hero'));
const Navbar = dynamic(() => import('@/components/blocks/Navbar'));
const Header = dynamic(() => import('@/components/blocks/Header'));
const Features = dynamic(() => import('@/components/blocks/Features'));
const Content = dynamic(() => import('@/components/blocks/Content'));
const Stats = dynamic(() => import('@/components/blocks/Stats'));
const Team = dynamic(() => import('@/components/blocks/Team'));
const FAQ = dynamic(() => import('@/components/blocks/FAQ'));
const Testimonials = dynamic(() => import('@/components/blocks/Testimonials'));
const Logos = dynamic(() => import('@/components/blocks/Logos'));
const Reviews = dynamic(() => import('@/components/blocks/Reviews'));
const Pricing = dynamic(() => import('@/components/blocks/Pricing'));
const CTA = dynamic(() => import('@/components/blocks/CTA'));
const Newsletter = dynamic(() => import('@/components/blocks/Newsletter'));
const Contact = dynamic(() => import('@/components/blocks/Contact'));
const Footer = dynamic(() => import('@/components/blocks/Footer'));
const SimpleFooter = dynamic(() => import('@/components/blocks/SimpleFooter'));

interface BlockRendererProps {
  block: Block;
  isPreview?: boolean;
}

const BlockRenderer = ({ block, isPreview = false }: BlockRendererProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const selectedBlockId = useEditorStore((state) => state.selectedBlockId);
  const setSelectedBlock = useEditorStore((state) => state.setSelectedBlock);
  const removeBlock = useEditorStore((state) => state.removeBlock);
  const previewMode = useEditorStore((state) => state.previewMode);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: block.id,
    disabled: previewMode || isPreview,
  });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? '0.3' : '1',
    position: isDragging ? 'relative' as const : undefined,
    zIndex: isDragging ? 999 : undefined,
  };

  const isSelected = selectedBlockId === block.id;

  const handleSelect = () => {
    if (!previewMode) {
      setSelectedBlock(block.id);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!previewMode) {
      removeBlock(block.id);
    }
  };

  // Render the appropriate component based on block type
  const renderBlockComponent = () => {
    switch (block.type) {
      case 'hero':
        return <Hero {...block.props} />;
      case 'navbar':
        return <Navbar {...block.props} isPreview={isPreview} />;
      case 'header':
        return <Header {...block.props} />;
      case 'features':
        return <Features {...block.props} />;
      case 'content':
        return <Content {...block.props} />;
      case 'stats':
        return <Stats {...block.props} />;
      case 'team':
        return <Team {...block.props} />;
      case 'faq':
        return <FAQ {...block.props} />;
      case 'testimonials':
        return <Testimonials {...block.props} />;
      case 'logos':
        return <Logos {...block.props} />;
      case 'reviews':
        return <Reviews {...block.props} />;
      case 'pricing':
        return <Pricing {...block.props} />;
      case 'cta':
        return <CTA {...block.props} />;
      case 'newsletter':
        return <Newsletter {...block.props} />;
      case 'contact':
        return <Contact {...block.props} />;
      case 'footer':
        return <Footer {...block.props} />;
      case 'simpleFooter':
        return <SimpleFooter {...block.props} />;
      default:
        return <div>Blok tidak dikenali: {block.type}</div>;
    }
  };

  if (previewMode || isPreview) {
    return renderBlockComponent();
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        relative group transition-all duration-200
        ${isSelected ? 'ring-2 ring-blue-500' : ''} 
        ${isDragging ? 'opacity-30 cursor-grabbing shadow-2xl scale-105' : ''}
      `}
      onClick={handleSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {renderBlockComponent()}

      {/* Drag handle */}
      {(isHovered || isSelected) && !previewMode && (
        <div className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 p-2">
          <div className="w-8 h-8 bg-white rounded-lg shadow-md flex items-center justify-center cursor-move">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
        </div>
      )}

      {/* Control overlay */}
      {(isHovered || isSelected) && !previewMode && (
        <div className="absolute top-0 right-0 p-2 z-10 flex space-x-2">
          <button
            className="bg-red-500 text-white p-1 rounded hover:bg-red-600 transition-colors"
            onClick={handleDelete}
            title="Hapus blok"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      )}

      {/* Block type label */}
      {(isHovered || isSelected) && !previewMode && (
        <div className="absolute top-0 left-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-br">
          {block.type}
        </div>
      )}
    </div>
  );
};

export default BlockRenderer; 