'use client';

import { useState } from 'react';
import { useEditorStore } from '@/store/editor';
import SaveTemplateDialog from './SaveTemplateDialog';
import LoadTemplateDialog from './LoadTemplateDialog';

interface ToolbarProps {
  onSave?: () => void;
  onExport?: () => void;
}

const Toolbar = ({ onSave, onExport }: ToolbarProps) => {
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [isLoadDialogOpen, setIsLoadDialogOpen] = useState(false);
  
  const blocks = useEditorStore((state) => state.blocks);
  const previewMode = useEditorStore((state) => state.previewMode);
  const togglePreviewMode = useEditorStore((state) => state.togglePreviewMode);
  const clearCanvas = useEditorStore((state) => state.clearCanvas);

  const handlePreviewToggle = () => {
    togglePreviewMode();
  };

  const handleSave = () => {
    setIsSaveDialogOpen(true);
  };

  const handleLoad = () => {
    setIsLoadDialogOpen(true);
  };

  const handleClear = () => {
    if (confirm('Apakah Anda yakin ingin menghapus semua blok?')) {
      clearCanvas();
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 px-4 py-2 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-blue-600 mr-4">LandingKits</h1>
          <span className="text-sm text-gray-500">Editor</span>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={handleClear}
            className="px-3 py-1.5 bg-gray-100 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200"
          >
            Bersihkan
          </button>

          <button
            onClick={handleLoad}
            className="px-3 py-1.5 bg-gray-100 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200"
          >
            Muat Template
          </button>

          <button
            onClick={handlePreviewToggle}
            className={`px-3 py-1.5 rounded-md text-sm font-medium ${
              previewMode 
                ? 'bg-blue-100 text-blue-700' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {previewMode ? 'Kembali ke Editor' : 'Preview'}
          </button>
          
          <button
            onClick={handleSave}
            className="px-3 py-1.5 bg-gray-100 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200"
          >
            Simpan Template
          </button>
        </div>
      </div>

      {isSaveDialogOpen && (
        <SaveTemplateDialog
          blocks={blocks}
          onClose={() => setIsSaveDialogOpen(false)}
        />
      )}

      {isLoadDialogOpen && (
        <LoadTemplateDialog
          onClose={() => setIsLoadDialogOpen(false)}
        />
      )}
    </>
  );
};

export default Toolbar; 