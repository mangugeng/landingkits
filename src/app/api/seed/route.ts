import { seedTenants } from '@/lib/seed'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    await seedTenants()
    return NextResponse.json({ message: 'Seeding completed successfully' })
  } catch (error) {
    console.error('Error during seeding:', error)
    return NextResponse.json(
      { error: 'Failed to seed database' },
      { status: 500 }
    )
  }
} 