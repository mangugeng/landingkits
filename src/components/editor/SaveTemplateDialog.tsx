'use client';

import { useState } from 'react';
import { useEditor } from '@/store/editor';
import { useToast } from '@/components/ui/use-toast';
import { saveTemplate } from '@/lib/templates';
import { useAuth } from '@/hooks/useAuth';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SaveTemplateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SaveTemplateDialog({
  open,
  onOpenChange,
}: SaveTemplateDialogProps) {
  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  const blocks = useEditor((state) => state.blocks);
  const { user } = useAuth();

  const handleSave = async () => {
    if (!name.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a template name',
        variant: 'destructive',
      });
      return;
    }

    if (!user) {
      toast({
        title: 'Error',
        description: 'You must be logged in to save templates',
        variant: 'destructive',
      });
      return;
    }

    setSaving(true);
    try {
      await saveTemplate(
        name,
        blocks,
        user.id
      );
      onOpenChange(false);
      setName('');
      toast({
        title: 'Success',
        description: 'Template saved successfully',
      });
    } catch (error) {
      console.error('Error saving template:', error);
      toast({
        title: 'Error',
        description: 'Failed to save template',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save Template</DialogTitle>
          <DialogDescription>
            Enter a name for your template to save it
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Template name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="flex justify-end">
            <Button onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : 'Save Template'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 