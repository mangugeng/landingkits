import { Template, TemplateStatus } from '@/lib/types'
import { createClient } from '@/lib/supabase'
import DynamicBlock from '@/components/blocks/DynamicBlock'
import { Database } from '@/lib/database.types'
import { Block } from '@/store/editor'
import { notFound } from 'next/navigation'

async function getTemplateBySubdomain(subdomain: string): Promise<Template | null> {
  console.log('🔍 Fetching template for subdomain:', subdomain);
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
      console.log('❌ No template found for subdomain:', subdomain);
      return null
    }

    console.log('✅ Template found:', data);

    const template = data as Database['public']['Tables']['templates']['Row']
    const status = template.status as TemplateStatus || 'draft'

    // Jika template masih draft, jangan tampilkan
    if (status === 'draft') {
      console.log('❌ Template is still in draft status');
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
  searchParams,
}: {
  params: { site: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  console.log('🎯 Rendering site page for params:', params);
  console.log('🔍 Search params:', searchParams);

  // Jika ada path yang tidak valid (seperti /docs, /about, dll), redirect ke halaman utama subdomain
  if (Object.keys(searchParams).length > 0) {
    console.log('❌ Invalid path detected, redirecting to main page');
    return notFound();
  }

  const template = await getTemplateBySubdomain(params.site)

  if (!template) {
    console.log('❌ Template not found, showing 404 page');
    return notFound()
  }

  console.log('✅ Rendering template:', template.name);

  return (
    <main className="min-h-screen">
      {template.blocks.map((block: Block, index: number) => (
        <DynamicBlock key={block.id} block={block} />
      ))}
    </main>
  )
} 