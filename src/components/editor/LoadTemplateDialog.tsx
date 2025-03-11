'use client';

import { useEditorStore } from '@/store/editor';

interface LoadTemplateDialogProps {
  onClose: () => void;
}

const LoadTemplateDialog = ({ onClose }: LoadTemplateDialogProps) => {
  const templates = useEditorStore((state) => state.templates);
  const loadTemplate = useEditorStore((state) => state.loadTemplate);
  const deleteTemplate = useEditorStore((state) => state.deleteTemplate);

  const handleLoad = (templateName: string) => {
    loadTemplate(templateName);
    onClose();
  };

  const handleDelete = (templateName: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus template "${templateName}"?`)) {
      deleteTemplate(templateName);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[480px] max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Muat Template</h2>
        
        {templates.length === 0 ? (
          <p className="text-gray-500">Belum ada template tersimpan</p>
        ) : (
          <div className="space-y-4">
            {templates.map((template) => (
              <div
                key={template.name}
                className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{template.name}</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleLoad(template.name)}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      Muat
                    </button>
                    <button
                      onClick={() => handleDelete(template.name)}
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  Dibuat: {new Date(template.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoadTemplateDialog; 