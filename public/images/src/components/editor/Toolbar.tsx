'use client';

import { useState } from 'react';
import { useEditorStore } from '@/store/editor';

const Toolbar = () => {
  const [isPreview, setIsPreview] = useState(false);
  const blocks = useEditorStore((state) => state.blocks);

  const handleSave = () => {
    // Simpan ke localStorage untuk sementara
    localStorage.setItem('editorBlocks', JSON.stringify(blocks));
    alert('Template berhasil disimpan!');
  };

  const handleExport = () => {
    const data = JSON.stringify(blocks, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'landing-page-template.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 px-4 py-2 z-50">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsPreview(!isPreview)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isPreview ? (
              <>
                <span className="mr-2">✏️</span>
                Edit Mode
              </>
            ) : (
              <>
                <span className="mr-2">👁️</span>
                Preview
              </>
            )}
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleExport}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <span className="mr-2">📤</span>
            Export
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <span className="mr-2">💾</span>
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toolbar; 