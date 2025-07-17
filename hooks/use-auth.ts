"use client"

import { useState, useEffect, useContext, createContext, type ReactNode } from "react"
import type { User, LoginRequest, RegisterRequest } from "@/types/api"
import { AuthService } from "@/services/auth.service"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (credentials: LoginRequest) => Promise<void>
  register: (userData: RegisterRequest) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const isAuthenticated = !!user

  useEffect(() => {
    initializeAuth()
  }, [])

  const initializeAuth = async () => {
    try {
      const token = localStorage.getItem("auth_token")
      if (token) {
        const userData = await AuthService.getCurrentUser()
        setUser(userData)
      }
    } catch (error) {
      console.error("Auth initialization error:", error)
      localStorage.removeItem("auth_token")
      localStorage.removeItem("refresh_token")
      localStorage.removeItem("user_data")
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (credentials: LoginRequest) => {
    try {
      setIsLoading(true)
      const response = await AuthService.login(credentials)

      localStorage.setItem("auth_token", response.token)
      localStorage.setItem("refresh_token", response.refreshToken)
      localStorage.setItem("user_data", JSON.stringify(response.user))
      localStorage.setItem("userType", response.user.userType)

      setUser(response.user)

      toast({
        title: "Login realizado com sucesso!",
        description: `Bem-vindo(a), ${response.user.name}!`,
      })

      router.push("/dashboard")
    } catch (error) {
      console.error("Login error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: RegisterRequest) => {
    try {
      setIsLoading(true)
      const newUser = await AuthService.register(userData)

      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Agora você pode fazer login com suas credenciais.",
      })

      router.push("/")
    } catch (error) {
      console.error("Register error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      await AuthService.logout()
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      localStorage.removeItem("auth_token")
      localStorage.removeItem("refresh_token")
      localStorage.removeItem("user_data")
      localStorage.removeItem("userType")
      setUser(null)
      router.push("/")
    }
  }

  const refreshUser = async () => {
    try {
      const userData = await AuthService.getCurrentUser()
      setUser(userData)
      localStorage.setItem("user_data", JSON.stringify(userData))
    } catch (error) {
      console.error("Refresh user error:", error)
      await logout()
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
