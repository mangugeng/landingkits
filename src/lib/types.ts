import { Block as EditorBlock } from '@/store/editor';

export type TemplateStatus = 'draft' | 'published';

export interface Template {
  id: string;
  user_id: string;
  name: string;
  blocks: Block[];
  subdomain?: string;
  custom_domain?: string;
  status: TemplateStatus;
  is_public: boolean;
  description?: string;
  created_at: string;
  updated_at: string;
  views: number;
}

export interface Block {
  id: string;
  type: BlockType;
  props: BlockProps;
}

export interface BlockProps {
  [key: string]: any;
}

export type BlockType = 
  | 'hero' 
  | 'navbar'
  | 'header'
  | 'features' 
  | 'content'
  | 'stats'
  | 'team'
  | 'faq'
  | 'testimonials'
  | 'logos'
  | 'reviews' 
  | 'pricing'
  | 'cta'
  | 'newsletter'
  | 'contact'
  | 'footer'
  | 'simpleFooter';

export interface User {
  id: string;
  email?: string;
  user_metadata?: {
    [key: string]: any;
  };
  app_metadata?: {
    [key: string]: any;
  };
  created_at?: string;
  updated_at?: string;
} 