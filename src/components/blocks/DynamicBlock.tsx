'use client';

import { Block, BlockType, BlockProps } from '@/lib/types';
import dynamic from 'next/dynamic';

// Import block components dynamically
const blocks = {
  hero: dynamic(() => import('./Hero')),
  navbar: dynamic(() => import('./Navbar')),
  header: dynamic(() => import('./Header')),
  features: dynamic(() => import('./Features')),
  content: dynamic(() => import('./Content')),
  stats: dynamic(() => import('./Stats')),
  team: dynamic(() => import('./Team')),
  faq: dynamic(() => import('./FAQ')),
  testimonials: dynamic(() => import('./Testimonials')),
  logos: dynamic(() => import('./Logos')),
  reviews: dynamic(() => import('./Reviews')),
  pricing: dynamic(() => import('./Pricing')),
  cta: dynamic(() => import('./CTA')),
  newsletter: dynamic(() => import('./Newsletter')),
  contact: dynamic(() => import('./Contact')),
  footer: dynamic(() => import('./Footer')),
  simpleFooter: dynamic(() => import('./SimpleFooter')),
} as Record<BlockType, React.ComponentType<BlockProps>>;

interface DynamicBlockProps {
  block: Block;
}

export default function DynamicBlock({ block }: DynamicBlockProps) {
  const BlockComponent = blocks[block.type];

  if (!BlockComponent) {
    console.warn(`Block type "${block.type}" not found`);
    return null;
  }

  return <BlockComponent {...block.props} />;
} 