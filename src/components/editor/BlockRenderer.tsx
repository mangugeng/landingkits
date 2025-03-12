'use client';

import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Block, useEditor } from '@/store/editor';
import dynamic from 'next/dynamic';
import type { CSSProperties } from 'react';
import { BlockType, BlockProps, HeroProps, NavbarProps, HeaderProps, FeaturesProps, ContentProps, StatsProps, TeamProps, FAQProps, TestimonialsProps, LogosProps, ReviewsProps, PricingProps, CTAProps, NewsletterProps, ContactProps, FooterProps, SimpleFooterProps } from '@/lib/types';
import Hero from '../blocks/Hero';
import Navbar from '../blocks/Navbar';
import Header from '../blocks/Header';
import Features from '../blocks/Features';
import Content from '../blocks/Content';
import Stats from '../blocks/Stats';
import Team from '../blocks/Team';
import FAQ from '../blocks/FAQ';
import Testimonials from '../blocks/Testimonials';
import Logos from '../blocks/Logos';
import Reviews from '../blocks/Reviews';
import Pricing from '../blocks/Pricing';
import CTA from '../blocks/CTA';
import Newsletter from '../blocks/Newsletter';
import Contact from '../blocks/Contact';
import Footer from '../blocks/Footer';
import SimpleFooter from '../blocks/SimpleFooter';

// Dynamically import block components
const HeroComponent = dynamic(() => import('@/components/blocks/Hero'));
const NavbarComponent = dynamic(() => import('@/components/blocks/Navbar'));
const HeaderComponent = dynamic(() => import('@/components/blocks/Header'));
const FeaturesComponent = dynamic(() => import('@/components/blocks/Features'));
const ContentComponent = dynamic(() => import('@/components/blocks/Content'));
const StatsComponent = dynamic(() => import('@/components/blocks/Stats'));
const TeamComponent = dynamic(() => import('@/components/blocks/Team'));
const FAQComponent = dynamic(() => import('@/components/blocks/FAQ'));
const TestimonialsComponent = dynamic(() => import('@/components/blocks/Testimonials'));
const LogosComponent = dynamic(() => import('@/components/blocks/Logos'));
const ReviewsComponent = dynamic(() => import('@/components/blocks/Reviews'));
const PricingComponent = dynamic(() => import('@/components/blocks/Pricing'));
const CTAComponent = dynamic(() => import('@/components/blocks/CTA'));
const NewsletterComponent = dynamic(() => import('@/components/blocks/Newsletter'));
const ContactComponent = dynamic(() => import('@/components/blocks/Contact'));
const FooterComponent = dynamic(() => import('@/components/blocks/Footer'));
const SimpleFooterComponent = dynamic(() => import('@/components/blocks/SimpleFooter'));

interface BlockRendererProps {
  block: Block;
  isPreview?: boolean;
}

export default function BlockRenderer({ block, isPreview = false }: BlockRendererProps) {
  const renderBlock = () => {
    switch (block.type) {
      case 'hero':
        return <HeroComponent {...(block.props as HeroProps)} />;
      case 'navbar':
        return <NavbarComponent {...(block.props as NavbarProps)} isPreview={isPreview} />;
      case 'header':
        return <HeaderComponent {...(block.props as HeaderProps)} />;
      case 'features':
        return <FeaturesComponent {...(block.props as FeaturesProps)} />;
      case 'content':
        return <ContentComponent {...(block.props as ContentProps)} />;
      case 'stats':
        return <StatsComponent {...(block.props as StatsProps)} />;
      case 'team':
        return <TeamComponent {...(block.props as TeamProps)} />;
      case 'faq':
        return <FAQComponent {...(block.props as FAQProps)} />;
      case 'testimonials':
        return <TestimonialsComponent {...(block.props as TestimonialsProps)} />;
      case 'logos':
        return <LogosComponent {...(block.props as LogosProps)} />;
      case 'reviews':
        return <ReviewsComponent {...(block.props as ReviewsProps)} />;
      case 'pricing':
        return <PricingComponent {...(block.props as PricingProps)} />;
      case 'cta':
        return <CTAComponent {...(block.props as CTAProps)} />;
      case 'newsletter':
        return <NewsletterComponent {...(block.props as NewsletterProps)} />;
      case 'contact':
        return <ContactComponent {...(block.props as ContactProps)} />;
      case 'footer':
        return <FooterComponent {...(block.props as FooterProps)} />;
      case 'simpleFooter':
        return <SimpleFooterComponent {...(block.props as SimpleFooterProps)} />;
      default:
        return <div>Blok tidak dikenali: {block.type}</div>;
    }
  };

  return renderBlock();
} 