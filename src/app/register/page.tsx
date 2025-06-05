"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

// Função de validação de senha (sem dependências externas)
function validatePassword(password: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push("A senha deve ter pelo menos 8 caracteres")
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("A senha deve ter pelo menos 1 letra maiúscula")
  }

  if (!/[0-9]/.test(password)) {
    errors.push("A senha deve ter pelo menos 1 número")
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push("A senha deve ter pelo menos 1 caractere especial")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors([])
    setLoading(true)

    // Validações
    const newErrors: string[] = []

    if (!formData.username.trim()) {
      newErrors.push("Nome de usuário é obrigatório")
    }

    if (!formData.email.trim()) {
      newErrors.push("Email é obrigatório")
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.push("As senhas não coincidem")
    }

    const passwordValidation = validatePassword(formData.password)
    if (!passwordValidation.isValid) {
      newErrors.push(...passwordValidation.errors)
    }

    if (newErrors.length > 0) {
      setErrors(newErrors)
      setLoading(false)
      return
    }

    // Simular criação de usuário (por enquanto apenas localStorage)
    try {
      // Verificar se usuário já existe
      const existingUsers = JSON.parse(localStorage.getItem("gincana_users") || "[]")
      const userExists = existingUsers.some(
        (user: any) => user.username === formData.username || user.email === formData.email,
      )

      if (userExists) {
        setErrors(["Nome de usuário ou email já existe"])
        setLoading(false)
        return
      }

      // Adicionar novo usuário
      const newUser = {
        id: Date.now().toString(),
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password, // Em produção, isso seria hasheado
        role: "user",
        created_at: new Date().toISOString(),
      }

      existingUsers.push(newUser)
      localStorage.setItem("gincana_users", JSON.stringify(existingUsers))

      setSuccess(true)
    } catch (error) {
      setErrors(["Erro interno. Tente novamente."])
    }

    setLoading(false)
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-red-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-24 h-24 rounded-full flex items-center justify-center shadow-lg border-4 border-white overflow-hidden">
              <img src="/brasao-paroquia.png" alt="Brasão da Paróquia" className="w-full h-full object-cover" />
            </div>
            <CardTitle className="text-2xl font-bold text-green-600">Usuário Criado!</CardTitle>
            <CardDescription>Sua conta foi criada com sucesso.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/">
              <Button className="w-full">Fazer Login</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-red-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-24 h-24 rounded-full flex items-center justify-center shadow-lg border-4 border-white overflow-hidden">
            <img src="/brasao-paroquia.png" alt="Brasão da Paróquia" className="w-full h-full object-cover" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">Criar Conta</CardTitle>
            <CardDescription className="text-center mt-2">
              Gincana da Unidade - Paróquia de São José
              <br />
              Sobral - Ceará
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Nome de Usuário</Label>
              <Input
                id="username"
                type="text"
                placeholder="Digite seu nome de usuário"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Digite seu email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <div className="text-xs text-gray-600">
                Mínimo 8 caracteres, 1 maiúscula, 1 número, 1 caractere especial
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirme sua senha"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
              />
            </div>

            {errors.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                {errors.map((error, index) => (
                  <p key={index} className="text-red-600 text-sm">
                    {error}
                  </p>
                ))}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Criando..." : "Criar Conta"}
            </Button>

            <div className="text-center">
              <Link href="/" className="text-sm text-blue-600 hover:underline">
                Já tem uma conta? Fazer login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
