import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useEditor } from '@/store/editor';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { updateTemplate } from '@/lib/templates';

interface UpdateTemplateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function UpdateTemplateDialog({
  open,
  onOpenChange,
}: UpdateTemplateDialogProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const blocks = useEditor((state) => state.blocks);

  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      
      // Get template ID from URL
      const urlParams = new URLSearchParams(window.location.search);
      const templateId = urlParams.get('template');
      
      if (!templateId) {
        toast.error('Template ID tidak ditemukan');
        return;
      }

      // Update template
      await updateTemplate(
        templateId,
        { blocks }
      );

      toast.success('Template berhasil diupdate');
      onOpenChange(false);
      router.refresh();
    } catch (error: any) {
      console.error('Error updating template:', error);
      toast.error(error.message || 'Gagal mengupdate template');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Template</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Apakah Anda yakin ingin mengupdate template ini? Perubahan ini akan langsung terlihat di website Anda.
          </p>
          
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Batal
            </Button>
            <Button
              onClick={handleUpdate}
              disabled={isLoading}
            >
              {isLoading ? 'Mengupdate...' : 'Update Template'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 