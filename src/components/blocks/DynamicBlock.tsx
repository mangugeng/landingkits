'use client';

import { Block } from '@/store/editor';
import dynamic from 'next/dynamic';

// Import block components dynamically
const blocks = {
  hero: dynamic(() => import('./Hero')),
  features: dynamic(() => import('./Features')),
  pricing: dynamic(() => import('./Pricing')),
  testimonials: dynamic(() => import('./Testimonials')),
  contact: dynamic(() => import('./Contact')),
  // Add more block types as needed
};

interface DynamicBlockProps {
  block: Block;
}

export default function DynamicBlock({ block }: DynamicBlockProps) {
  const BlockComponent = blocks[block.type as keyof typeof blocks];

  if (!BlockComponent) {
    console.warn(`Block type "${block.type}" not found`);
    return null;
  }

  return <BlockComponent {...block.props} />;
} 