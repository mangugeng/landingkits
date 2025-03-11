'use client';

import { useState } from 'react';
import { useEditorStore, Block } from '@/store/editor';

interface SaveTemplateDialogProps {
  blocks: Block[];
  onClose: () => void;
}

const SaveTemplateDialog = ({ blocks, onClose }: SaveTemplateDialogProps) => {
  const [templateName, setTemplateName] = useState('');
  const saveTemplate = useEditorStore((state) => state.saveTemplate);

  const handleSave = () => {
    if (!templateName.trim()) {
      alert('Nama template tidak boleh kosong');
      return;
    }

    saveTemplate({
      name: templateName,
      blocks,
      createdAt: new Date().toISOString(),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Simpan Template</h2>
        <input
          type="text"
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
          placeholder="Nama template"
          className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveTemplateDialog; 