import { Block } from '@/store/editor';

export type TemplateStatus = 'draft' | 'published';

export interface Template {
  id?: string;
  name: string;
  blocks: Block[];
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