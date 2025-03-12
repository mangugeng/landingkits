'use client';

import { useEffect, useState } from 'react'
import { useEditor } from '@/store/editor'
import { useToast } from '@/components/ui/use-toast'
import { getTemplates } from '@/lib/templates'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

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
          description: 'Failed to load templates',
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
      title: 'Success',
      description: 'Template loaded successfully',
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Load Template</DialogTitle>
          <DialogDescription>
            Choose a template to load into the editor
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {loading ? (
            <div>Loading templates...</div>
          ) : templates.length === 0 ? (
            <div>No templates found</div>
          ) : (
            templates.map((template) => (
              <div
                key={template.id}
                className="p-4 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer"
                onClick={() => handleLoadTemplate(template)}
              >
                <h3 className="font-medium">{template.name}</h3>
                <p className="text-sm text-gray-500">
                  Created at: {new Date(template.created_at).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
} 