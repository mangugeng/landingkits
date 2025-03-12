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
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { TemplateStatus } from '@/lib/types';

interface SaveTemplateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SaveTemplateDialog({
  open,
  onOpenChange,
}: SaveTemplateDialogProps) {
  const [name, setName] = useState('');
  const [subdomain, setSubdomain] = useState('');
  const [customDomain, setCustomDomain] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [status, setStatus] = useState<TemplateStatus>('draft');
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  const blocks = useEditor((state) => state.blocks);
  const { user } = useAuth();

  const validateInputs = () => {
    if (!name.trim()) {
      toast({
        title: 'Error',
        description: 'Mohon masukkan nama template',
        variant: 'destructive',
      });
      return false;
    }

    if (subdomain && !/^[a-z0-9-]+$/.test(subdomain)) {
      toast({
        title: 'Error',
        description: 'Subdomain hanya boleh berisi huruf kecil, angka, dan tanda hubung',
        variant: 'destructive',
      });
      return false;
    }

    if (customDomain && !/^[a-z0-9-]+\.[a-z]+$/.test(customDomain)) {
      toast({
        title: 'Error',
        description: 'Format custom domain tidak valid',
        variant: 'destructive',
      });
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    if (!validateInputs()) return;

    if (!user) {
      toast({
        title: 'Error',
        description: 'Anda harus login untuk menyimpan template',
        variant: 'destructive',
      });
      return;
    }

    setSaving(true);
    try {
      await saveTemplate(
        name,
        blocks,
        user.id,
        subdomain,
        customDomain,
        status,
        isPublic,
        description
      );
      onOpenChange(false);
      setName('');
      setSubdomain('');
      setCustomDomain('');
      setDescription('');
      setIsPublic(false);
      setStatus('draft');
      toast({
        title: 'Berhasil',
        description: 'Template berhasil disimpan',
      });
    } catch (error: any) {
      console.error('Error saving template:', error);
      toast({
        title: 'Error',
        description: error.message || 'Gagal menyimpan template',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white dark:bg-gray-900 sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-white">Simpan Template</DialogTitle>
          <DialogDescription className="text-gray-500 dark:text-gray-400">
            Masukkan informasi template yang akan disimpan
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-900 dark:text-white">Nama Template</Label>
            <Input
              id="name"
              placeholder="Nama template"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white dark:bg-gray-800"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-900 dark:text-white">Deskripsi</Label>
            <Textarea
              id="description"
              placeholder="Deskripsi template"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-white dark:bg-gray-800"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subdomain" className="text-gray-900 dark:text-white">Subdomain</Label>
            <Input
              id="subdomain"
              placeholder="contoh: landing-page-saya"
              value={subdomain}
              onChange={(e) => setSubdomain(e.target.value.toLowerCase())}
              className="bg-white dark:bg-gray-800"
            />
            <p className="text-xs text-gray-500">Hanya huruf kecil, angka, dan tanda hubung (-)</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="customDomain" className="text-gray-900 dark:text-white">Custom Domain</Label>
            <Input
              id="customDomain"
              placeholder="contoh: landing.domain-saya.com"
              value={customDomain}
              onChange={(e) => setCustomDomain(e.target.value.toLowerCase())}
              className="bg-white dark:bg-gray-800"
            />
            <p className="text-xs text-gray-500">Format: domain.com atau subdomain.domain.com</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="public" className="text-gray-900 dark:text-white">Publik</Label>
              <div className="text-[0.8rem] text-gray-500 dark:text-gray-400">
                Template dapat dilihat oleh pengguna lain
              </div>
            </div>
            <Switch
              id="public"
              checked={isPublic}
              onCheckedChange={setIsPublic}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="status" className="text-gray-900 dark:text-white">Status</Label>
              <div className="text-[0.8rem] text-gray-500 dark:text-gray-400">
                Pilih status template
              </div>
            </div>
            <Switch
              id="status"
              checked={status === 'published'}
              onCheckedChange={(checked) => setStatus(checked ? 'published' : 'draft')}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button 
            onClick={handleSave} 
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {saving ? 'Menyimpan...' : 'Simpan Template'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 