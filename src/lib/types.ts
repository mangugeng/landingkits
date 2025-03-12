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

export interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  imageUrl: string;
  imageAlt: string;
  layout: 'left' | 'right' | 'center';
  backgroundColor: string;
  textColor: string;
  height: 'normal' | 'full';
  ctaColor: string;
  imagePosition: 'left' | 'right' | 'center';
}

export interface NavbarProps {
  logo: string;
  logoAlt: string;
  menuItems: string;
  buttonText?: string;
  buttonLink?: string;
  isPreview?: boolean;
}

export interface HeaderProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  backgroundColor: string;
  textColor: string;
  gradientFrom?: string;
  gradientTo?: string;
}

export interface FeaturesProps {
  title: string;
  description: string;
  features: string;
  layout: 'grid' | 'list';
  columns: '2' | '3' | '4';
}

export interface ContentProps {
  title: string;
  content: string;
  imageUrl?: string;
  imageAlt?: string;
}

export interface StatsProps {
  title: string;
  stats: string;
}

export interface TeamProps {
  title: string;
  description: string;
  members: string;
}

export interface FAQProps {
  sectionTitle?: string;
  sectionDescription?: string;
  items?: string;
  layout?: 'grid' | 'list';
  background?: 'white' | 'gray';
}

export interface TestimonialsProps {
  title: string;
  testimonials: string;
}

export interface LogosProps {
  title: string;
  logos: string;
}

export interface ReviewsProps {
  title: string;
  reviews: string;
}

export interface PricingProps {
  sectionTitle?: string;
  sectionDescription?: string;
  tiers?: string;
  style?: 'light' | 'dark';
}

export interface CTAProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export interface NewsletterProps {
  title: string;
  description: string;
  buttonText: string;
}

export interface ContactProps {
  title: string;
  description: string;
  email: string;
  phone: string;
  address: string;
}

export interface FooterProps {
  logo: string;
  description: string;
  links: string;
  socialLinks: string;
}

export interface SimpleFooterProps {
  copyright: string;
  links: string;
}

export type BlockProps =
  | HeroProps
  | NavbarProps
  | HeaderProps
  | FeaturesProps
  | ContentProps
  | StatsProps
  | TeamProps
  | FAQProps
  | TestimonialsProps
  | LogosProps
  | ReviewsProps
  | PricingProps
  | CTAProps
  | NewsletterProps
  | ContactProps
  | FooterProps
  | SimpleFooterProps;

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