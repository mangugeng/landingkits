'use client';

import { useState } from 'react';
import { useEditorStore, Block } from '@/store/editor';
import { Template, TemplateStatus } from '@/lib/types';
import { saveTemplate, updateTemplateDomain } from '@/lib/templates';
import { toast } from 'react-hot-toast';

interface SaveTemplateDialogProps {
  blocks: Block[];
  onClose: () => void;
  template?: Template;
}

const SaveTemplateDialog = ({ blocks, onClose, template }: SaveTemplateDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: template?.name || '',
    description: template?.description || '',
    status: template?.status || 'draft' as TemplateStatus,
    subdomain: template?.subdomain || '',
    customDomain: template?.customDomain || '',
    isPublic: template?.isPublic || false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      toast.error('Nama template tidak boleh kosong');
      return;
    }

    try {
      setIsLoading(true);

      // Save template
      const savedTemplate = await saveTemplate({
        id: template?.id,
        name: formData.name,
        description: formData.description,
        blocks,
        status: formData.status,
        isPublic: formData.isPublic
      });

      // If domains are provided, update them
      if (formData.subdomain || formData.customDomain) {
        await updateTemplateDomain(savedTemplate.id, {
          subdomain: formData.subdomain || null,
          customDomain: formData.customDomain || null
        });
      }

      toast.success(template ? 'Template berhasil diperbarui' : 'Template berhasil disimpan');
      onClose();
    } catch (error) {
      console.error('Error saving template:', error);
      toast.error(error.message || 'Gagal menyimpan template');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[500px] max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">
          {template ? 'Edit Template' : 'Simpan Template Baru'}
        </h2>

        <div className="space-y-4">
          {/* Nama Template */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Template
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nama template"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deskripsi
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Deskripsi template"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          {/* Subdomain */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subdomain
            </label>
            <div className="flex items-center">
              <input
                type="text"
                name="subdomain"
                value={formData.subdomain}
                onChange={handleChange}
                placeholder="nama-template"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="px-3 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md text-gray-500">
                .landingkits.com
              </span>
            </div>
          </div>

          {/* Custom Domain */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Custom Domain
            </label>
            <input
              type="text"
              name="customDomain"
              value={formData.customDomain}
              onChange={handleChange}
              placeholder="www.yourdomain.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Visibility */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isPublic"
              name="isPublic"
              checked={formData.isPublic}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="isPublic" className="ml-2 block text-sm text-gray-700">
              Template dapat dilihat publik
            </label>
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
            disabled={isLoading}
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50"
          >
            {isLoading ? 'Menyimpan...' : 'Simpan'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveTemplateDialog; 