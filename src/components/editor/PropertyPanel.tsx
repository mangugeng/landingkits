'use client';

import React from 'react';
import { useEditorStore, Block } from '@/store/editor';

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
  const selectedBlockId = useEditorStore((state) => state.selectedBlockId);
  const blocks = useEditorStore((state) => state.blocks);
  const updateBlockProps = useEditorStore((state) => state.updateBlockProps);
  const removeBlock = useEditorStore((state) => state.removeBlock);

  const selectedBlock = blocks.find((block) => block.id === selectedBlockId);

  if (!selectedBlock) {
    return (
      <div className="w-80 bg-gray-50 border-l border-gray-200 p-4">
        <p className="text-gray-500 text-center">Pilih blok untuk mengedit properti</p>
      </div>
    );
  }

  const properties = blockProperties[selectedBlock.type] || [];

  const handlePropertyChange = (key: string, value: string) => {
    updateBlockProps(selectedBlock.id, { [key]: value });
  };

  return (
    <div className="w-80 bg-gray-50 border-l border-gray-200 p-4 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Edit {selectedBlock.type}</h3>
        <button
          onClick={() => removeBlock(selectedBlock.id)}
          className="text-red-500 hover:text-red-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div className="space-y-4">
        {properties.map((prop) => (
          <div key={prop.key}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {prop.label}
            </label>
            {prop.type === 'select' && prop.options ? (
              <select
                value={String(selectedBlock.props[prop.key] || '')}
                onChange={(e) => handlePropertyChange(prop.key, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Pilih opsi</option>
                {prop.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : prop.type === 'color' ? (
              <input
                type="color"
                value={String(selectedBlock.props[prop.key] || '#000000')}
                onChange={(e) => handlePropertyChange(prop.key, e.target.value)}
                className="w-full h-10 p-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            ) : (
              <input
                type={prop.type === 'richtext' ? 'text' : prop.type}
                value={String(selectedBlock.props[prop.key] || '')}
                onChange={(e) => handlePropertyChange(prop.key, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder={`Masukkan ${prop.label.toLowerCase()}`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyPanel;