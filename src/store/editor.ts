import { create } from 'zustand';

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

export interface Block {
  id: string;
  type: BlockType;
  props: Record<string, any>;
}

interface EditorState {
  blocks: Block[];
  selectedBlockId: string | null;
  addBlock: (type: BlockType) => void;
  removeBlock: (id: string) => void;
  updateBlock: (id: string, props: Record<string, any>) => void;
  reorderBlocks: (startIndex: number, endIndex: number) => void;
  setSelectedBlock: (id: string | null) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  blocks: [],
  selectedBlockId: null,

  addBlock: (type) => {
    set((state) => ({
      blocks: [
        ...state.blocks,
        {
          id: Math.random().toString(36).substr(2, 9),
          type,
          props: {},
        },
      ],
    }));
  },

  removeBlock: (id) => {
    set((state) => ({
      blocks: state.blocks.filter((block) => block.id !== id),
      selectedBlockId: state.selectedBlockId === id ? null : state.selectedBlockId,
    }));
  },

  updateBlock: (id, props) => {
    set((state) => ({
      blocks: state.blocks.map((block) =>
        block.id === id ? { ...block, props: { ...block.props, ...props } } : block
      ),
    }));
  },

  reorderBlocks: (startIndex, endIndex) => {
    set((state) => {
      const blocks = [...state.blocks];
      const [removed] = blocks.splice(startIndex, 1);
      blocks.splice(endIndex, 0, removed);
      return { blocks };
    });
  },

  setSelectedBlock: (id) => {
    set({ selectedBlockId: id });
  },
})); 