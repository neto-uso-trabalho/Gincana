import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para TypeScript
export interface User {
  id: string
  username: string
  email: string
  role: string
  created_at: string
}

export interface Team {
  id: string
  name: string
  color: string
}

export interface Game {
  id: string
  name: string
  description?: string
}

export interface Round {
  id: string
  game_id: string
  team_winner_id: string
  participants: string
  round_number: number
  created_at: string
  created_by: string
  teams?: Team
  games?: Game
}
