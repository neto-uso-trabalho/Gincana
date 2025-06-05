import bcrypt from "bcryptjs"

// Validação de senha
export function validatePassword(password: string): { isValid: boolean; errors: string[] } {
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

// Hash da senha
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12
  return await bcrypt.hash(password, saltRounds)
}

// Verificar senha
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash)
}
