"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Users, Trophy, Plus, X } from "lucide-react"
import Link from "next/link"

// Tipos para TypeScript
interface User {
  id: string
  username: string
  email: string
  role: string
  created_at: string
  password: string
}

interface Team {
  id: string
  name: string
  color: string
}

interface Game {
  id: string
  name: string
  description?: string
  isCustom?: boolean
}

interface Round {
  id: string
  game_id: string
  team_winner_id: string
  participants: string
  round_number: number
  created_at: string
  created_by: string
  team_name?: string
  team_color?: string
  game_name?: string
}

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // Buscar usuários do localStorage
      const users = JSON.parse(localStorage.getItem("gincana_users") || "[]")
      const user = users.find((u: User) => u.username === username.trim())

      if (!user || user.password !== password) {
        setError("Usuário ou senha incorretos")
        setLoading(false)
        return
      }

      // Login bem-sucedido
      setCurrentUser(user)
      setIsLoggedIn(true)
    } catch (error) {
      setError("Erro interno. Tente novamente.")
    }

    setLoading(false)
  }

  if (isLoggedIn && currentUser) {
    return <Dashboard currentUser={currentUser} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-red-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-24 h-24 rounded-full flex items-center justify-center shadow-lg border-4 border-white overflow-hidden">
            <img src="/brasao.jpeg" alt="Brasão da Paróquia" className="w-full h-full object-cover" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">Gincana da Unidade</CardTitle>
            <CardDescription className="text-center mt-2">
              Manhã de Pentecostes - Paróquia de São José
              <br />
              Sobral - Ceará
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Usuário</Label>
              <Input
                id="username"
                type="text"
                placeholder="Digite seu usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </Button>

            <div className="text-center">
              <Link href="/register" className="text-sm text-blue-600 hover:underline">
                Não tem uma conta? Criar conta
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

function Dashboard({ currentUser }: { currentUser: User }) {
  const [selectedGame, setSelectedGame] = useState<string | null>(null)
  const [teams, setTeams] = useState<Team[]>([])
  const [games, setGames] = useState<Game[]>([])
  const [rounds, setRounds] = useState<Round[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddGameModal, setShowAddGameModal] = useState(false)
  const [newGameName, setNewGameName] = useState("")

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    // Dados padrão das equipes
    const defaultTeams: Team[] = [
      { id: "1", name: "Vermelho", color: "bg-red-500" },
      { id: "2", name: "Lilás", color: "bg-purple-500" },
      { id: "3", name: "Azul", color: "bg-blue-500" },
    ]

    // Dados padrão dos jogos
    const defaultGames: Game[] = [
      { id: "1", name: "Passa água", isCustom: false },
      { id: "2", name: "Repolho", isCustom: false },
      { id: "3", name: "Futebol de Banho", isCustom: false },
      { id: "4", name: "Pula corda", isCustom: false },
      { id: "5", name: "Passe ou repassa", isCustom: false },
      { id: "6", name: "Bambolê", isCustom: false },
      { id: "7", name: "Corrida do Balão", isCustom: false },
      { id: "8", name: "Adivinhe a música", isCustom: false },
      { id: "9", name: "Futebol de Mão", isCustom: false },
      { id: "10", name: "Corrida de saco", isCustom: false },
      { id: "11", name: "Corrida de colher e limão", isCustom: false },
      { id: "12", name: "Carrinho de mão", isCustom: false },
      { id: "13", name: "Mangueira com balão", isCustom: false },
      { id: "14", name: "Tiro ao alvo no balão", isCustom: false },
      { id: "15", name: "Grito da paz", isCustom: false },
      { id: "16", name: "Improviso em peça teatral", isCustom: false },
    ]

    // Carregar jogos customizados do localStorage
    const customGames = JSON.parse(localStorage.getItem("gincana_custom_games") || "[]")
    const allGames = [...defaultGames, ...customGames]

    // Carregar rodadas do localStorage
    const savedRounds = JSON.parse(localStorage.getItem("gincana_rounds") || "[]")

    // Enriquecer rodadas com dados das equipes e jogos
    const enrichedRounds = savedRounds.map((round: Round) => {
      const team = defaultTeams.find((t) => t.id === round.team_winner_id)
      const game = allGames.find((g) => g.id === round.game_id)
      return {
        ...round,
        team_name: team?.name,
        team_color: team?.color,
        game_name: game?.name,
      }
    })

    setTeams(defaultTeams)
    setGames(allGames)
    setRounds(enrichedRounds)
    setLoading(false)
  }

  const addNewGame = () => {
    if (!newGameName.trim()) return

    const newGame: Game = {
      id: Date.now().toString(),
      name: newGameName.trim(),
      isCustom: true,
    }

    // Salvar no localStorage
    const customGames = JSON.parse(localStorage.getItem("gincana_custom_games") || "[]")
    customGames.push(newGame)
    localStorage.setItem("gincana_custom_games", JSON.stringify(customGames))

    setNewGameName("")
    setShowAddGameModal(false)
    loadData()
  }

  const deleteCustomGame = (gameId: string) => {
    if (!confirm("Tem certeza que deseja excluir este jogo? Todas as rodadas serão perdidas.")) {
      return
    }

    // Remover o jogo customizado
    const customGames = JSON.parse(localStorage.getItem("gincana_custom_games") || "[]")
    const updatedGames = customGames.filter((game: Game) => game.id !== gameId)
    localStorage.setItem("gincana_custom_games", JSON.stringify(updatedGames))

    // Remover todas as rodadas deste jogo
    const savedRounds = JSON.parse(localStorage.getItem("gincana_rounds") || "[]")
    const updatedRounds = savedRounds.filter((round: Round) => round.game_id !== gameId)
    localStorage.setItem("gincana_rounds", JSON.stringify(updatedRounds))

    loadData()
  }

  const calculateScore = (teamName: string) => {
    return rounds.filter((round) => round.team_name === teamName).length * 10
  }

  const getGameRounds = (gameName: string) => {
    return rounds.filter((round) => round.game_name === gameName)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-red-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-2 border-white overflow-hidden">
                <img src="/brasao.jpeg" alt="Brasão da Paróquia" className="w-full h-full object-cover" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Gincana da Unidade</h1>
                <p className="text-sm text-gray-600">Bem-vindo, {currentUser.username}!</p>
              </div>
            </div>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Placar das Equipes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {teams.map((team) => (
            <Card
              key={team.id}
              className="
                text-center
                transition-all duration-300 ease-in-out
                transform hover:scale-105 hover:shadow-xl
                hover:shadow-blue-500/10
                cursor-pointer
                relative overflow-hidden
                before:absolute before:inset-0 before:bg-gradient-to-br 
                before:from-white/50 before:to-transparent 
                before:translate-y-[100%] before:transition-transform 
                before:duration-500 hover:before:translate-y-0
              "
            >
              <CardHeader className="pb-3 relative z-10">
                <div
                  className={`
                  w-16 h-16 ${team.color} rounded-full mx-auto flex items-center justify-center mb-2
                  transition-all duration-300 ease-in-out
                  transform hover:scale-110 hover:rotate-12
                  shadow-lg hover:shadow-xl
                `}
                >
                  <Users className="w-8 h-8 text-white transition-transform duration-300 hover:scale-110" />
                </div>
                <CardTitle className="text-xl transition-colors duration-200">Equipe {team.name}</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <div
                  className="
                  text-3xl font-bold text-gray-900
                  transition-all duration-300 ease-in-out
                  hover:scale-110 hover:text-blue-600
                "
                >
                  {calculateScore(team.name)}
                </div>
                <p className="text-sm text-gray-600 transition-colors duration-200">pontos</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Lista de Jogos */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Trophy className="w-5 h-5" />
                <span className="text-xl font-semibold">Jogos da Gincana</span>
              </div>
              <Button
                onClick={() => setShowAddGameModal(true)}
                className="
    bg-green-600 hover:bg-green-700 text-white
    transition-all duration-300 ease-in-out
    transform hover:scale-105 hover:shadow-lg
    active:scale-95 active:shadow-sm
    hover:shadow-green-500/25
    relative overflow-hidden
    before:absolute before:inset-0 before:bg-gradient-to-r 
    before:from-green-400/20 before:to-emerald-400/20 
    before:translate-x-[-100%] before:transition-transform 
    before:duration-500 hover:before:translate-x-0
  "
                size="sm"
              >
                <Plus className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:rotate-90" />
                <span className="relative z-10">Adicionar Jogo</span>
              </Button>
            </div>
            <CardDescription>Clique em um jogo para gerenciar participantes e resultados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {games.map((game, index) => {
                const gameRounds = getGameRounds(game.name)
                return (
                  <div key={game.id} className="relative group">
                    <Button
                      variant={selectedGame === game.name ? "default" : "outline"}
                      className={`
            h-auto p-4 text-left justify-start w-full
            transition-all duration-300 ease-in-out
            transform hover:scale-105 hover:shadow-lg
            active:scale-95 active:shadow-sm
            ${
              selectedGame === game.name
                ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                : "hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700"
            }
            relative overflow-hidden
            before:absolute before:inset-0 before:bg-gradient-to-r 
            before:from-blue-400/20 before:to-purple-400/20 
            before:translate-x-[-100%] before:transition-transform 
            before:duration-500 hover:before:translate-x-0
          `}
                      onClick={() => setSelectedGame(selectedGame === game.name ? null : game.name)}
                    >
                      <div className="relative z-10">
                        <div className="font-medium transition-colors duration-200">{game.name}</div>
                        <div className="text-sm opacity-75 transition-opacity duration-200 group-hover:opacity-100">
                          Jogo #{index + 1}
                          {gameRounds.length > 0 && (
                            <span className="ml-2 text-green-600 font-semibold animate-pulse">
                              ({gameRounds.length} rodadas)
                            </span>
                          )}
                          {game.isCustom && <span className="ml-2 text-blue-600 font-semibold">(Personalizado)</span>}
                        </div>
                      </div>
                    </Button>
                    {game.isCustom && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteCustomGame(game.id)}
                        className="
              absolute top-2 right-2 h-6 w-6 p-0 
              bg-red-500 hover:bg-red-600 text-white border-red-500
              transition-all duration-200 ease-in-out
              transform hover:scale-110 active:scale-90
              opacity-0 group-hover:opacity-100
              hover:shadow-lg hover:shadow-red-500/25
            "
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Gerenciamento do Jogo Selecionado */}
        {selectedGame && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>{selectedGame}</CardTitle>
              <CardDescription>Gerencie os participantes e resultados deste jogo</CardDescription>
            </CardHeader>
            <CardContent>
              <GameManager
                gameName={selectedGame}
                teams={teams}
                games={games}
                rounds={rounds}
                currentUser={currentUser}
                onUpdateRounds={loadData}
              />
            </CardContent>
          </Card>
        )}
      </main>

      {/* Modal Adicionar Novo Jogo - CORRIGIDO */}
      {showAddGameModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Adicionar Novo Jogo</h2>
                <Button variant="outline" size="sm" onClick={() => setShowAddGameModal(false)} className="h-8 w-8 p-0">
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-gray-600 mb-4">Digite o nome do novo jogo para a gincana</p>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="gameName">Nome do Jogo</Label>
                  <Input
                    id="gameName"
                    placeholder="Ex: Cabo de Guerra"
                    value={newGameName}
                    onChange={(e) => setNewGameName(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addNewGame()}
                    className="mt-1"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={addNewGame}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    disabled={!newGameName.trim()}
                  >
                    Adicionar
                  </Button>
                  <Button variant="outline" onClick={() => setShowAddGameModal(false)} className="flex-1">
                    Cancelar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function GameManager({
  gameName,
  teams,
  games,
  rounds,
  currentUser,
  onUpdateRounds,
}: {
  gameName: string
  teams: Team[]
  games: Game[]
  rounds: Round[]
  currentUser: User
  onUpdateRounds: () => void
}) {
  const [newRound, setNewRound] = useState({
    teamId: "",
    participants: "",
  })
  const [loading, setLoading] = useState(false)

  const gameRounds = rounds.filter((round) => round.game_name === gameName)
  const currentGame = games.find((game) => game.name === gameName)

  const addRound = () => {
    if (!newRound.teamId || !newRound.participants.trim() || !currentGame) return

    setLoading(true)

    const newRoundData: Round = {
      id: Date.now().toString(),
      game_id: currentGame.id,
      team_winner_id: newRound.teamId,
      participants: newRound.participants.trim(),
      round_number: gameRounds.length + 1,
      created_at: new Date().toISOString(),
      created_by: currentUser.id,
    }

    // Salvar no localStorage
    const savedRounds = JSON.parse(localStorage.getItem("gincana_rounds") || "[]")
    savedRounds.push(newRoundData)
    localStorage.setItem("gincana_rounds", JSON.stringify(savedRounds))

    setNewRound({ teamId: "", participants: "" })
    onUpdateRounds()
    setLoading(false)
  }

  const deleteRound = (roundId: string) => {
    if (!confirm("Tem certeza que deseja excluir esta rodada?")) {
      return
    }

    const savedRounds = JSON.parse(localStorage.getItem("gincana_rounds") || "[]")
    const updatedRounds = savedRounds.filter((round: Round) => round.id !== roundId)
    localStorage.setItem("gincana_rounds", JSON.stringify(updatedRounds))
    onUpdateRounds()
  }

  return (
    <div className="space-y-6">
      {/* Adicionar Nova Rodada */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium mb-4">Adicionar Nova Rodada</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="participants">Participantes (separados por vírgula)</Label>
            <Input
              id="participants"
              placeholder="João, Maria, Pedro..."
              value={newRound.participants}
              onChange={(e) => setNewRound({ ...newRound, participants: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="winner">Equipe Vencedora</Label>
            <select
              id="winner"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={newRound.teamId}
              onChange={(e) => setNewRound({ ...newRound, teamId: e.target.value })}
            >
              <option value="">Selecione a equipe vencedora</option>
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  Equipe {team.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <Button
          onClick={addRound}
          className="
    mt-4 bg-black hover:bg-gray-800 text-white
    transition-all duration-300 ease-in-out
    transform hover:scale-105 hover:shadow-lg
    active:scale-95 active:shadow-sm
    hover:shadow-gray-800/25
    relative overflow-hidden
    before:absolute before:inset-0 before:bg-gradient-to-r 
    before:from-gray-600/20 before:to-gray-700/20 
    before:translate-x-[-100%] before:transition-transform 
    before:duration-500 hover:before:translate-x-0
  "
          disabled={loading || !newRound.teamId || !newRound.participants.trim()}
        >
          <span className="relative z-10">{loading ? "Adicionando..." : "Adicionar Rodada"}</span>
        </Button>
      </div>

      {/* Histórico de Rodadas */}
      {gameRounds.length > 0 && (
        <div>
          <h3 className="font-medium mb-4">Histórico de Rodadas</h3>
          <div className="space-y-3">
            {gameRounds.map((round) => (
              <div key={round.id} className="bg-white p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Rodada {round.round_number}</span>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded text-sm text-white ${round.team_color || "bg-gray-500"}`}>
                      Vencedor: Equipe {round.team_name}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteRound(round.id)}
                      className="
    h-8 w-8 p-0 bg-black hover:bg-gray-800 text-white border-black 
    transition-all duration-200 ease-in-out
    transform hover:scale-110 active:scale-90
    hover:shadow-lg hover:shadow-gray-800/25
  "
                    >
                      ×
                    </Button>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <strong>Participantes:</strong> {round.participants}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {gameRounds.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Trophy className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Nenhuma rodada registrada ainda.</p>
          <p className="text-sm">Adicione a primeira rodada acima!</p>
        </div>
      )}
    </div>
  )
}
