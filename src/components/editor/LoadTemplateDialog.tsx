'use client';

import { useEffect, useState } from 'react'
import { useEditor } from '@/store/editor'
import { useToast } from '@/components/ui/use-toast'
import { getTemplates, deleteTemplate, updateTemplate } from '@/lib/templates'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Pencil, Trash2 } from 'lucide-react'

interface LoadTemplateDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function LoadTemplateDialog({
  open,
  onOpenChange,
}: LoadTemplateDialogProps) {
  const [templates, setTemplates] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newName, setNewName] = useState('')
  const { toast } = useToast()
  const setBlocks = useEditor((state) => state.setBlocks)

  useEffect(() => {
    async function loadTemplates() {
      try {
        const data = await getTemplates()
        setTemplates(data)
      } catch (error) {
        console.error('Error loading templates:', error)
        toast({
          title: 'Error',
          description: 'Gagal memuat template',
          variant: 'destructive',
        })
      } finally {
        setLoading(false)
      }
    }

    if (open) {
      loadTemplates()
    }
  }, [open, toast])

  const handleLoadTemplate = (template: any) => {
    setBlocks(template.blocks)
    onOpenChange(false)
    toast({
      title: 'Berhasil',
      description: 'Template berhasil dimuat',
    })
  }

  const handleDelete = async (templateId: string) => {
    try {
      await deleteTemplate(templateId)
      setTemplates(templates.filter(t => t.id !== templateId))
      toast({
        title: 'Berhasil',
        description: 'Template berhasil dihapus',
      })
    } catch (error) {
      console.error('Error deleting template:', error)
      toast({
        title: 'Error',
        description: 'Gagal menghapus template',
        variant: 'destructive',
      })
    }
  }

  const handleRename = async (templateId: string) => {
    if (!newName.trim()) {
      toast({
        title: 'Error',
        description: 'Nama template tidak boleh kosong',
        variant: 'destructive',
      })
      return
    }

    try {
      await updateTemplate(templateId, { name: newName })
      setTemplates(templates.map(t => 
        t.id === templateId ? { ...t, name: newName } : t
      ))
      setEditingId(null)
      setNewName('')
      toast({
        title: 'Berhasil',
        description: 'Nama template berhasil diubah',
      })
    } catch (error) {
      console.error('Error renaming template:', error)
      toast({
        title: 'Error',
        description: 'Gagal mengubah nama template',
        variant: 'destructive',
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white dark:bg-gray-900 sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-white">Muat Template</DialogTitle>
          <DialogDescription className="text-gray-500 dark:text-gray-400">
            Pilih template yang ingin dimuat ke editor
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {loading ? (
            <div className="text-center text-gray-500 dark:text-gray-400">Memuat template...</div>
          ) : templates.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400">Tidak ada template</div>
          ) : (
            templates.map((template) => (
              <div
                key={template.id}
                className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {editingId === template.id ? (
                  <div className="flex items-center space-x-2">
                    <Input
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="Nama template baru"
                      className="flex-1"
                      autoFocus
                    />
                    <Button
                      onClick={() => handleRename(template.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Simpan
                    </Button>
                    <Button
                      onClick={() => {
                        setEditingId(null)
                        setNewName('')
                      }}
                      variant="outline"
                    >
                      Batal
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div 
                      className="flex-1 cursor-pointer"
                      onClick={() => handleLoadTemplate(template)}
                    >
                      <h3 className="font-medium text-gray-900 dark:text-white">{template.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Dibuat: {new Date(template.created_at).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        onClick={() => {
                          setEditingId(template.id)
                          setNewName(template.name)
                        }}
                        size="sm"
                        variant="ghost"
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 h-8 w-8 p-0"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => handleDelete(template.id)}
                        size="sm"
                        variant="ghost"
                        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-200 h-8 w-8 p-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
} 