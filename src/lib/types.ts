import { Block as EditorBlock } from '@/store/editor';

export type TemplateStatus = 'draft' | 'published';

export interface Template {
  id: string;
  name: string;
  blocks: EditorBlock[];
  status: TemplateStatus;
  subdomain?: string;
  customDomain?: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  isPublic?: boolean;
  description?: string;
  thumbnail?: string;
  views: number;
}

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