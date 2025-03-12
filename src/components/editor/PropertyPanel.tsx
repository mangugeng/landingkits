'use client';

import React from 'react';
import { useEditor } from '@/store/editor';
import { Block } from '@/store/editor';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

interface PropertyConfig {
  type: 'text' | 'color' | 'image' | 'richtext' | 'select';
  label: string;
  key: string;
  options?: { label: string; value: string }[];
}

const blockProperties: Record<Block['type'], PropertyConfig[]> = {
  hero: [
    { type: 'text', label: 'Judul', key: 'title' },
    { type: 'text', label: 'Subtitle', key: 'subtitle' },
    { type: 'text', label: 'Teks CTA', key: 'ctaText' },
    { type: 'text', label: 'Link CTA', key: 'ctaLink' },
    { type: 'image', label: 'Gambar Hero', key: 'imageUrl' },
    { type: 'text', label: 'Alt Text Gambar', key: 'imageAlt' },
    { type: 'select', label: 'Layout', key: 'layout', options: [
      { label: 'Kiri', value: 'left' },
      { label: 'Tengah', value: 'center' },
    ]},
    { type: 'select', label: 'Posisi Gambar', key: 'imagePosition', options: [
      { label: 'Kanan', value: 'right' },
      { label: 'Kiri', value: 'left' },
    ]},
    { type: 'select', label: 'Warna Background', key: 'backgroundColor', options: [
      { label: 'Putih', value: 'bg-white' },
      { label: 'Abu-abu', value: 'bg-gray-50' },
      { label: 'Biru Muda', value: 'bg-blue-50' },
    ]},
    { type: 'select', label: 'Warna Teks', key: 'textColor', options: [
      { label: 'Hitam', value: 'text-gray-900' },
      { label: 'Putih', value: 'text-white' },
      { label: 'Biru', value: 'text-blue-900' },
    ]},
    { type: 'select', label: 'Warna CTA', key: 'ctaColor', options: [
      { label: 'Biru', value: 'bg-blue-600' },
      { label: 'Merah', value: 'bg-red-600' },
      { label: 'Hijau', value: 'bg-green-600' },
    ]},
    { type: 'select', label: 'Tinggi Section', key: 'height', options: [
      { label: 'Normal', value: 'normal' },
      { label: 'Besar', value: 'large' },
    ]},
  ],
  navbar: [
    { type: 'text', label: 'Logo', key: 'logo' },
    { type: 'text', label: 'Button Text', key: 'buttonText' },
    { type: 'text', label: 'Button Link', key: 'buttonLink' },
    { type: 'select', label: 'Style', key: 'transparent', options: [
      { label: 'Solid', value: 'false' },
      { label: 'Transparent', value: 'true' },
    ]},
  ],
  header: [
    { type: 'text', label: 'Judul', key: 'title' },
    { type: 'text', label: 'Subtitle', key: 'subtitle' },
    { type: 'text', label: 'Teks CTA', key: 'ctaText' },
    { type: 'text', label: 'Link CTA', key: 'ctaLink' },
    { type: 'text', label: 'Teks CTA Sekunder', key: 'secondaryCtaText' },
    { type: 'text', label: 'Link CTA Sekunder', key: 'secondaryCtaLink' },
    { type: 'select', label: 'Warna Background', key: 'backgroundColor', options: [
      { label: 'Putih', value: 'bg-white' },
      { label: 'Abu-abu', value: 'bg-gray-50' },
      { label: 'Biru Muda', value: 'bg-blue-50' },
    ]},
    { type: 'select', label: 'Warna Teks', key: 'textColor', options: [
      { label: 'Hitam', value: 'text-gray-900' },
      { label: 'Putih', value: 'text-white' },
      { label: 'Biru', value: 'text-blue-900' },
    ]},
    { type: 'select', label: 'Gradient Dari', key: 'gradientFrom', options: [
      { label: 'Biru Muda', value: 'from-blue-100/20' },
      { label: 'Merah Muda', value: 'from-red-100/20' },
      { label: 'Hijau Muda', value: 'from-green-100/20' },
    ]},
    { type: 'select', label: 'Gradient Ke', key: 'gradientTo', options: [
      { label: 'Putih', value: 'to-white' },
      { label: 'Abu-abu', value: 'to-gray-50' },
      { label: 'Transparan', value: 'to-transparent' },
    ]},
  ],
  features: [
    { type: 'text', label: 'Section Title', key: 'sectionTitle' },
    { type: 'text', label: 'Section Description', key: 'sectionDescription' },
    { type: 'select', label: 'Layout', key: 'layout', options: [
      { label: 'Grid', value: 'grid' },
      { label: 'List', value: 'list' },
    ]},
  ],
  content: [
    { type: 'text', label: 'Title', key: 'title' },
    { type: 'richtext', label: 'Content', key: 'content' },
  ],
  stats: [
    { type: 'text', label: 'Section Title', key: 'sectionTitle' },
    { type: 'text', label: 'Section Description', key: 'sectionDescription' },
    { type: 'select', label: 'Layout', key: 'layout', options: [
      { label: 'Grid', value: 'grid' },
      { label: 'Row', value: 'row' },
    ]},
    { type: 'select', label: 'Background', key: 'background', options: [
      { label: 'White', value: 'white' },
      { label: 'Gray', value: 'gray' },
      { label: 'Blue', value: 'blue' },
    ]},
  ],
  team: [
    { type: 'text', label: 'Section Title', key: 'sectionTitle' },
    { type: 'text', label: 'Section Description', key: 'sectionDescription' },
    { type: 'select', label: 'Layout', key: 'layout', options: [
      { label: 'Grid', value: 'grid' },
      { label: 'List', value: 'list' },
    ]},
  ],
  faq: [
    { type: 'text', label: 'Section Title', key: 'sectionTitle' },
    { type: 'text', label: 'Section Description', key: 'sectionDescription' },
    { type: 'select', label: 'Layout', key: 'layout', options: [
      { label: 'Grid', value: 'grid' },
      { label: 'List', value: 'list' },
    ]},
    { type: 'select', label: 'Background', key: 'background', options: [
      { label: 'White', value: 'white' },
      { label: 'Gray', value: 'gray' },
    ]},
  ],
  testimonials: [
    { type: 'text', label: 'Section Title', key: 'sectionTitle' },
    { type: 'select', label: 'Layout', key: 'layout', options: [
      { label: 'Grid', value: 'grid' },
      { label: 'Carousel', value: 'carousel' },
    ]},
  ],
  logos: [
    { type: 'text', label: 'Section Title', key: 'sectionTitle' },
    { type: 'text', label: 'Section Description', key: 'sectionDescription' },
  ],
  reviews: [
    { type: 'text', label: 'Section Title', key: 'sectionTitle' },
    { type: 'text', label: 'Section Description', key: 'sectionDescription' },
    { type: 'select', label: 'Layout', key: 'layout', options: [
      { label: 'Grid', value: 'grid' },
      { label: 'Carousel', value: 'carousel' },
    ]},
  ],
  pricing: [
    { type: 'text', label: 'Section Title', key: 'sectionTitle' },
    { type: 'text', label: 'Section Description', key: 'sectionDescription' },
    { type: 'select', label: 'Style', key: 'style', options: [
      { label: 'Light', value: 'light' },
      { label: 'Dark', value: 'dark' },
    ]},
  ],
  cta: [
    { type: 'text', label: 'Title', key: 'title' },
    { type: 'text', label: 'Description', key: 'description' },
    { type: 'text', label: 'Button Text', key: 'buttonText' },
    { type: 'text', label: 'Button Link', key: 'buttonLink' },
    { type: 'color', label: 'Background Color', key: 'backgroundColor' },
  ],
  newsletter: [
    { type: 'text', label: 'Title', key: 'title' },
    { type: 'text', label: 'Description', key: 'description' },
    { type: 'text', label: 'Button Text', key: 'buttonText' },
    { type: 'text', label: 'Placeholder', key: 'placeholder' },
    { type: 'select', label: 'Layout', key: 'layout', options: [
      { label: 'Center', value: 'center' },
      { label: 'Left', value: 'left' },
    ]},
    { type: 'select', label: 'Background', key: 'background', options: [
      { label: 'White', value: 'white' },
      { label: 'Gray', value: 'gray' },
      { label: 'Blue', value: 'blue' },
    ]},
  ],
  contact: [
    { type: 'text', label: 'Title', key: 'title' },
    { type: 'text', label: 'Description', key: 'description' },
    { type: 'text', label: 'Submit Text', key: 'submitText' },
  ],
  footer: [
    { type: 'text', label: 'Logo', key: 'logo' },
    { type: 'text', label: 'Copyright Text', key: 'copyrightText' },
    { type: 'select', label: 'Layout', key: 'layout', options: [
      { label: 'Complex', value: 'complex' },
      { label: 'Simple', value: 'simple' },
    ]},
  ],
  simpleFooter: [
    { type: 'text', label: 'Logo', key: 'logo' },
    { type: 'text', label: 'Copyright Text', key: 'copyrightText' },
  ],
};

const PropertyPanel: React.FC = () => {
  const selectedBlock = useEditor((state) => state.selectedBlock);
  const updateBlock = useEditor((state) => state.updateBlock);
  const removeBlock = useEditor((state) => state.removeBlock);

  if (!selectedBlock) {
    return null;
  }

  const handleChange = (key: string, value: any) => {
    updateBlock(selectedBlock.id, {
      ...selectedBlock,
      props: {
        ...selectedBlock.props,
        [key]: value,
      },
    });
  };

  return (
    <div className="w-[300px] border-l bg-white p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Properties</h2>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => removeBlock(selectedBlock.id)}
        >
          Delete
        </Button>
      </div>
      <div className="space-y-4">
        {Object.entries(selectedBlock.props).map(([key, value]) => {
          if (typeof value === 'boolean') {
            return (
              <div key={key} className="flex items-center justify-between">
                <Label htmlFor={key} className="capitalize">
                  {key}
                </Label>
                <Switch
                  id={key}
                  checked={value}
                  onCheckedChange={(checked) => handleChange(key, checked)}
                />
              </div>
            );
          }

          if (typeof value === 'string') {
            const isLongText = value.length > 100;
            const InputComponent = isLongText ? Textarea : Input;

            return (
              <div key={key} className="space-y-2">
                <Label htmlFor={key} className="capitalize">
                  {key}
                </Label>
                <InputComponent
                  id={key}
                  value={value}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className={cn(isLongText && 'min-h-[100px]')}
                />
              </div>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
};

export default PropertyPanel;