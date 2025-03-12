import { Template, TemplateStatus } from '@/lib/types'
import { createClient } from '@/lib/supabase'
import DynamicBlock from '@/components/blocks/DynamicBlock'
import { Database } from '@/lib/database.types'
import { Block } from '@/store/editor'
import { notFound } from 'next/navigation'

async function getTemplateBySubdomain(subdomain: string): Promise<Template | null> {
  const supabase = createClient()
  
  try {
    const { data, error } = await supabase
      .from('templates')
      .select()
      .eq('subdomain', subdomain)
      .single()

    if (error) {
      console.error('Error fetching template:', error)
      return null
    }

    if (!data) {
      return null
    }

    const template = data as Database['public']['Tables']['templates']['Row']
    const status = template.status as TemplateStatus || 'draft'

    // Jika template masih draft, jangan tampilkan
    if (status === 'draft') {
      return null
    }

    return {
      id: template.id,
      name: template.name,
      blocks: (template.blocks as unknown as Block[]) || [],
      createdAt: template.created_at,
      updatedAt: template.updated_at,
      userId: template.user_id,
      subdomain: template.subdomain,
      status,
      views: template.views || 0
    }
  } catch (error) {
    console.error('Error in getTemplateBySubdomain:', error)
    return null
  }
}

export default async function SitePage({
  params,
}: {
  params: { site: string }
}) {
  const template = await getTemplateBySubdomain(params.site)

  if (!template) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      {template.blocks.map((block: Block, index: number) => (
        <DynamicBlock key={block.id} block={block} />
      ))}
    </main>
  )
} 