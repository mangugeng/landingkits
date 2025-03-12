import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { nanoid } from 'nanoid';
import { Block, BlockType, BlockProps } from '@/lib/types';

export interface EditorTemplate {
  name: string;
  blocks: Block[];
  created_at: string;
  updated_at: string;
  user_id: string;
  subdomain?: string;
  custom_domain?: string;
  status: 'draft' | 'published';
  is_public: boolean;
  description?: string;
  views: number;
}

// Fungsi untuk mendapatkan properti default berdasarkan tipe blok
const getDefaultProps = (type: BlockType): BlockProps => {
  switch (type) {
    case 'hero':
      return {
        title: 'Bangun Landing Page Impian Anda',
        subtitle: 'Buat landing page yang menarik dalam hitungan menit dengan builder drag-and-drop kami. Tanpa perlu coding.',
        ctaText: 'Mulai Sekarang',
        ctaLink: '#',
        imageUrl: '/images/hero-1.jpg',
        imageAlt: 'Hero image - Workspace modern dengan laptop',
        layout: 'left',
        backgroundColor: 'bg-white',
        textColor: 'text-gray-900',
        height: 'normal',
        ctaColor: 'bg-blue-600',
        imagePosition: 'right',
      };
    case 'navbar':
      return {
        logo: '/images/logo.svg',
        logoAlt: 'LandingKits Logo',
        menuItems: JSON.stringify([
          { label: 'Beranda', link: '#' },
          { label: 'Fitur', link: '#features' },
          { label: 'Harga', link: '#pricing' },
          { label: 'Kontak', link: '#contact' },
        ]),
        buttonText: 'Mulai Sekarang',
        buttonLink: '#',
      };
    case 'header':
      return {
        title: 'Transform your business with our solutions',
        subtitle: 'We help companies of all sizes accelerate their growth with innovative technology solutions.',
        ctaText: 'Get started',
        ctaLink: '#',
        secondaryCtaText: 'Learn more',
        secondaryCtaLink: '#',
        backgroundColor: 'bg-white',
        textColor: 'text-gray-900',
        gradientFrom: 'from-blue-100/20',
        gradientTo: 'to-white',
      };
    case 'features':
      return {
        title: 'Fitur Unggulan',
        description: 'Beberapa fitur terbaik yang kami tawarkan',
        features: JSON.stringify([
          { 
            title: 'Mudah Digunakan',
            description: 'Platform kami dirancang untuk intuitif dan ramah pengguna.',
            imageUrl: '/images/feature-1.jpg'
          },
          {
            title: 'Dapat Disesuaikan',
            description: 'Sesuaikan setiap aspek landing page Anda dengan brand Anda.',
            imageUrl: '/images/feature-2.jpg'
          }
        ]),
        layout: 'grid',
        columns: '2'
      };
    case 'content':
      return {
        title: 'Judul Konten',
        content: 'Isi konten Anda di sini',
        imageUrl: '/placeholder.jpg',
        imageAlt: 'Content image',
      };
    case 'stats':
      return {
        title: 'Statistik Kami',
        stats: JSON.stringify([
          { label: 'Pengguna Aktif', value: '10,000+' },
          { label: 'Transaksi', value: '1M+' },
          { label: 'Rating', value: '4.9/5' },
        ]),
      };
    case 'team':
      return {
        title: 'Tim Kami',
        description: 'Kenali tim hebat di belakang layar',
        members: JSON.stringify([
          { name: 'John Doe', role: 'CEO', imageUrl: '/images/team-1.jpg' },
          { name: 'Jane Smith', role: 'CTO', imageUrl: '/images/team-2.jpg' },
        ]),
      };
    case 'faq':
      return {
        title: 'Pertanyaan Umum',
        faqs: JSON.stringify([
          { question: 'Pertanyaan 1?', answer: 'Jawaban 1' },
          { question: 'Pertanyaan 2?', answer: 'Jawaban 2' },
        ]),
      };
    case 'testimonials':
      return {
        title: 'Testimoni Pelanggan',
        testimonials: JSON.stringify([
          { name: 'Sarah Johnson', text: 'Platform ini sangat membantu kami dalam membangun landing page dengan cepat dan profesional.', role: 'Marketing Manager', company: 'Tech Corp', imageUrl: '/images/testimonial-1.jpg' },
          { name: 'Michael Chen', text: 'Fitur drag and drop yang intuitif membuat pembuatan landing page menjadi sangat mudah.', role: 'Founder', company: 'Startup Inc', imageUrl: '/images/testimonial-2.jpg' },
        ]),
      };
    case 'logos':
      return {
        title: 'Dipercaya Oleh',
        logos: JSON.stringify([
          { name: 'Company A', imageUrl: '/logo1.png' },
          { name: 'Company B', imageUrl: '/logo2.png' },
        ]),
      };
    case 'reviews':
      return {
        title: 'Ulasan Pengguna',
        reviews: JSON.stringify([
          { name: 'User 1', rating: 5, text: 'Review 1' },
          { name: 'User 2', rating: 4, text: 'Review 2' },
        ]),
      };
    case 'pricing':
      return {
        title: 'Pilihan Paket',
        description: 'Pilih paket yang sesuai dengan kebutuhan Anda',
        plans: JSON.stringify([
          { name: 'Basic', price: '99k', features: ['Fitur 1', 'Fitur 2'] },
          { name: 'Pro', price: '199k', features: ['Fitur 1', 'Fitur 2', 'Fitur 3'] },
        ]),
      };
    case 'cta':
      return {
        title: 'Mulai Sekarang',
        description: 'Bergabung dengan ribuan pengguna lainnya',
        buttonText: 'Daftar',
        buttonLink: '#',
      };
    case 'newsletter':
      return {
        title: 'Berlangganan Newsletter',
        description: 'Dapatkan update terbaru dari kami',
        buttonText: 'Berlangganan',
      };
    case 'contact':
      return {
        title: 'Hubungi Kami',
        description: 'Kami siap membantu Anda',
        email: 'contact@example.com',
        phone: '+62123456789',
        address: 'Jl. Contoh No. 123',
      };
    case 'footer':
      return {
        logo: '/logo.png',
        description: 'Deskripsi singkat perusahaan',
        links: JSON.stringify([
          { title: 'Perusahaan', items: [
            { label: 'Tentang', link: '#' },
            { label: 'Karir', link: '#' },
          ]},
          { title: 'Produk', items: [
            { label: 'Fitur', link: '#' },
            { label: 'Harga', link: '#' },
          ]},
        ]),
        socialLinks: JSON.stringify([
          { platform: 'twitter', link: '#' },
          { platform: 'facebook', link: '#' },
          { platform: 'instagram', link: '#' },
        ]),
      };
    case 'simpleFooter':
      return {
        copyright: '© 2024 Company Name. All rights reserved.',
        links: JSON.stringify([
          { label: 'Privacy', link: '#' },
          { label: 'Terms', link: '#' },
        ]),
      };
    default:
      return {};
  }
};

interface EditorState {
  blocks: Block[];
  selectedBlock: Block | null;
  previewMode: boolean;
  templates: EditorTemplate[];
  setBlocks: (blocks: Block[]) => void;
  addBlock: (block: Block) => void;
  removeBlock: (id: string) => void;
  reorderBlocks: (oldIndex: number, newIndex: number) => void;
  updateBlock: (id: string, props: Record<string, any>) => void;
  setSelectedBlock: (id: string | null) => void;
  togglePreviewMode: () => void;
  saveTemplate: (template: EditorTemplate) => void;
  loadTemplate: (name: string) => void;
  deleteTemplate: (name: string) => void;
  clearCanvas: () => void;
  selectBlock: (block: Block | null) => void;
  moveBlock: (fromIndex: number, toIndex: number) => void;
}

const useEditor = create(
  persist<EditorState>(
    (set) => ({
      blocks: [],
      selectedBlock: null,
      previewMode: false,
      templates: [],

      setBlocks: (blocks) => set({ blocks }),

      addBlock: (block) =>
        set((state) => ({ blocks: [...state.blocks, block] })),

      removeBlock: (id) =>
        set((state) => ({
          blocks: state.blocks.filter((block) => block.id !== id),
          selectedBlock: state.selectedBlock?.id === id ? null : state.selectedBlock,
        })),

      reorderBlocks: (oldIndex, newIndex) =>
        set((state) => {
          const blocks = [...state.blocks];
          const [removed] = blocks.splice(oldIndex, 1);
          blocks.splice(newIndex, 0, removed);
          return { blocks };
        }),

      updateBlock: (id, props) =>
        set((state) => ({
          blocks: state.blocks.map((block) =>
            block.id === id ? { ...block, props: { ...block.props, ...props } } : block
          ),
        })),

      setSelectedBlock: (id: string | null) => 
        set((state) => ({ 
          selectedBlock: id ? state.blocks.find(block => block.id === id) || null : null 
        })),

      togglePreviewMode: () => set((state) => ({ previewMode: !state.previewMode })),

      saveTemplate: (template) =>
        set((state) => {
          const existingIndex = state.templates.findIndex(t => t.name === template.name);
          const newTemplates = [...state.templates];
          
          if (existingIndex !== -1) {
            newTemplates[existingIndex] = template;
          } else {
            newTemplates.push(template);
          }

          newTemplates.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

          return { templates: newTemplates };
        }),

      loadTemplate: (name) =>
        set((state) => {
          const template = state.templates.find((t) => t.name === name);
          if (!template) return state;

          const newBlocks = template.blocks.map((block) => ({
            ...block,
            id: nanoid(),
          }));

          return {
            blocks: newBlocks,
            selectedBlock: null,
          };
        }),

      deleteTemplate: (name) =>
        set((state) => ({
          templates: state.templates.filter((t) => t.name !== name),
        })),

      clearCanvas: () => set({ blocks: [], selectedBlock: null }),

      selectBlock: (block) => set({ selectedBlock: block }),

      moveBlock: (fromIndex, toIndex) =>
        set((state) => {
          const blocks = [...state.blocks];
          const [removed] = blocks.splice(fromIndex, 1);
          blocks.splice(toIndex, 0, removed);
          return { blocks };
        }),
    }),
    {
      name: 'editor-storage',
      partialize: (state) => ({ 
        blocks: state.blocks,
        templates: state.templates 
      }),
    }
  )
);

export { useEditor }; 