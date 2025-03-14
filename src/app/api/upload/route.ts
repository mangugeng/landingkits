import { NextResponse } from 'next/server'
import { uploadImage } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const path = formData.get('path') as string

    if (!file || !path) {
      return NextResponse.json(
        { error: 'File dan path diperlukan' },
        { status: 400 }
      )
    }

    const publicUrl = await uploadImage(file, path)

    if (!publicUrl) {
      return NextResponse.json(
        { error: 'Gagal mengupload gambar' },
        { status: 500 }
      )
    }

    // Redirect kembali ke halaman admin setelah berhasil
    return NextResponse.redirect(new URL('/admin/upload', request.url))
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan internal server' },
      { status: 500 }
    )
  }
} 