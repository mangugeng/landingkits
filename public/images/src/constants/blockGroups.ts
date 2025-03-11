import { BlockType } from '@/store/editor';

export interface BlockGroup {
  id: string;
  label: string;
  blocks: Array<{
    type: BlockType;
    label: string;
  }>;
}

export const blockGroups: BlockGroup[] = [
  {
    id: 'hero',
    label: 'Header & Hero',
    blocks: [
      { type: 'hero', label: 'Hero Section' },
      { type: 'navbar', label: 'Navigation Bar' },
      { type: 'header', label: 'Simple Header' },
    ]
  },
  {
    id: 'content',
    label: 'Content Blocks',
    blocks: [
      { type: 'features', label: 'Features Grid' },
      { type: 'content', label: 'Content Section' },
      { type: 'stats', label: 'Statistics' },
      { type: 'team', label: 'Team Members' },
      { type: 'faq', label: 'FAQ Section' },
    ]
  },
  {
    id: 'social',
    label: 'Social Proof',
    blocks: [
      { type: 'testimonials', label: 'Testimonials' },
      { type: 'logos', label: 'Client Logos' },
      { type: 'reviews', label: 'Customer Reviews' },
    ]
  },
  {
    id: 'conversion',
    label: 'Conversion',
    blocks: [
      { type: 'cta', label: 'Call to Action' },
      { type: 'pricing', label: 'Pricing Tables' },
      { type: 'newsletter', label: 'Newsletter Signup' },
      { type: 'contact', label: 'Contact Form' },
    ]
  },
  {
    id: 'footer',
    label: 'Footer',
    blocks: [
      { type: 'footer', label: 'Footer Complex' },
      { type: 'simpleFooter', label: 'Footer Simple' },
    ]
  }
]; 