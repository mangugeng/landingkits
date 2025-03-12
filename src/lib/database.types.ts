export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      templates: {
        Row: {
          id: string
          name: string
          blocks: Json[]
          created_at: string
          updated_at: string
          user_id: string
          subdomain?: string
          status: string
          views: number
        }
        Insert: {
          id?: string
          name: string
          blocks: Json[]
          created_at?: string
          updated_at?: string
          user_id: string
          subdomain?: string
          status?: string
          views?: number
        }
        Update: {
          id?: string
          name?: string
          blocks?: Json[]
          created_at?: string
          updated_at?: string
          user_id?: string
          subdomain?: string
          status?: string
          views?: number
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 