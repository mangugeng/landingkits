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
          custom_domain?: string
          status: string
          is_public: boolean
          description?: string
          views: number
          thumbnail?: string
        }
        Insert: {
          id?: string
          name: string
          blocks: Json[]
          created_at?: string
          updated_at?: string
          user_id: string
          subdomain?: string
          custom_domain?: string
          status?: string
          is_public?: boolean
          description?: string
          views?: number
          thumbnail?: string
        }
        Update: {
          id?: string
          name?: string
          blocks?: Json[]
          created_at?: string
          updated_at?: string
          user_id?: string
          subdomain?: string
          custom_domain?: string
          status?: string
          is_public?: boolean
          description?: string
          views?: number
          thumbnail?: string
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