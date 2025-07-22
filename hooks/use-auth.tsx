"use client"

import { useState, useEffect, createContext, useContext, type ReactNode } from "react"
import { AuthService } from "@/services/auth.service"
import type { User, LoginRequest, RegisterRequest } from "@/types/api"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isAdmin: boolean
  loading: boolean
  login: (credentials: LoginRequest) => Promise<void>
  register: (userData: RegisterRequest) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
  forgotPassword: (email: string) => Promise<void>
  resetPassword: (token: string, password: string, confirmPassword: string) => Promise<void>
  changePassword: (currentPassword: string, newPassword: string, confirmPassword: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await AuthService.ensureValidToken()
        if (token) {
          const userData = await AuthService.getCurrentUser()
          setUser(userData)
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    initAuth()
  }, [])

  useEffect(() => {
    if (!user) return

    const interval = setInterval(
      async () => {
        try {
          await AuthService.ensureValidToken()
        } catch (error) {
          console.error("Erro ao renovar token:", error)
          await logout()
        }
      },
      5 * 60 * 1000,
    )

    return () => clearInterval(interval)
  }, [user])

  const login = async (credentials: LoginRequest) => {
    try {
      setLoading(true)
      const response = await AuthService.login(credentials)
      setUser(response.user)

      toast({
        title: "Login realizado com sucesso!",
        description: `Bem-vindo, ${response.user.name}!`,
      })

      const redirectPath = getRedirectPath(response.user.userType)
      router.push(redirectPath)
    } catch (error) {
      toast({
        title: "Erro no login",
        description: error instanceof Error ? error.message : "Credenciais inválidas",
        variant: "destructive",
      })
      throw error
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData: RegisterRequest) => {
    try {
      setLoading(true)
      await AuthService.register(userData)

      toast({
        title: "Conta criada com sucesso!",
        description: "Você pode fazer login agora.",
      })

      router.push("/")
    } catch (error) {
      toast({
        title: "Erro no cadastro",
        description: error instanceof Error ? error.message : "Erro ao criar conta",
        variant: "destructive",
      })
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      await AuthService.logout()
    } catch (error) {
      console.error("Erro no logout:", error)
    } finally {
      setUser(null)
      router.push("/")
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado com sucesso.",
      })
    }
  }

  const refreshUser = async () => {
    try {
      const userData = await AuthService.getCurrentUser()
      setUser(userData)
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error)
      await logout()
    }
  }

  const forgotPassword = async (email: string) => {
    try {
      await AuthService.forgotPassword(email)
      toast({
        title: "E-mail enviado!",
        description: "Verifique sua caixa de entrada para redefinir sua senha.",
      })
    } catch (error) {
      toast({
        title: "Erro ao enviar e-mail",
        description: error instanceof Error ? error.message : "Tente novamente mais tarde",
        variant: "destructive",
      })
      throw error
    }
  }

  const resetPassword = async (token: string, password: string, confirmPassword: string) => {
    try {
      await AuthService.resetPassword({ token, password, confirmPassword })
      toast({
        title: "Senha redefinida!",
        description: "Sua senha foi alterada com sucesso. Faça login novamente.",
      })
      router.push("/")
    } catch (error) {
      toast({
        title: "Erro ao redefinir senha",
        description: error instanceof Error ? error.message : "Tente novamente mais tarde",
        variant: "destructive",
      })
      throw error
    }
  }

  const changePassword = async (currentPassword: string, newPassword: string, confirmPassword: string) => {
    try {
      await AuthService.changePassword({ currentPassword, newPassword, confirmPassword })
      toast({
        title: "Senha alterada!",
        description: "Sua senha foi alterada com sucesso.",
      })
    } catch (error) {
      toast({
        title: "Erro ao alterar senha",
        description: error instanceof Error ? error.message : "Tente novamente mais tarde",
        variant: "destructive",
      })
      throw error
    }
  }

  const getRedirectPath = (userType: string) => {
    const paths = {
      cliente: "/dashboard/cliente",
      petshop: "/dashboard/petshop",
      fornecedor: "/dashboard/fornecedor",
      empresa: "/dashboard/empresa",
      administrador: "/dashboard/administrador",
    }
    return paths[userType as keyof typeof paths] || "/dashboard"
  }

  const contextValue: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.userType === "administrador",
    loading,
    login,
    register,
    logout,
    refreshUser,
    forgotPassword,
    resetPassword,
    changePassword,
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export function useAuthState() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await AuthService.ensureValidToken()
        if (token) {
          const userData = await AuthService.getCurrentUser()
          setUser(userData)
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    initAuth()
  }, [])

  const login = async (email: string, password: string, userType: string) => {
    const response = await AuthService.login({ email, password, userType })
    setUser(response.user)
    return response
  }

  const logout = async () => {
    await AuthService.logout()
    setUser(null)
  }

  return {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.userType === "administrador",
    login,
    logout,
    loading,
  }
}
