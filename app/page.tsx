"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, EyeOff, Heart, Shield, Users, Mail, Lock, User, Building } from "lucide-react"
import Image from "next/image"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simular login
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Redirecionar baseado no tipo de usuário
    switch (formData.userType) {
      case "cliente":
        router.push("/dashboard/cliente")
        break
      case "petshop":
        router.push("/dashboard/petshop")
        break
      case "fornecedor":
        router.push("/dashboard/fornecedor")
        break
      case "empresa":
        router.push("/dashboard/empresa")
        break
      case "administrador":
        router.push("/dashboard/administrador")
        break
      default:
        router.push("/dashboard")
    }

    setIsLoading(false)
  }

  const isFormValid = formData.email && formData.password && formData.userType

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D6DD83]/30 via-[#FFBDB6]/30 to-[#30B2B0]/30 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-bpet-primary to-bpet-secondary rounded-2xl flex items-center justify-center shadow-lg mb-4">
            <Image src="/bpet-logo.png" alt="BPet Logo" width={40} height={40} className="rounded-lg" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Bem-vindo ao BPet</h1>
          <p className="text-gray-600">Conectando pets, donos e profissionais</p>
        </div>

        {/* Card de Login */}
        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm rounded-2xl">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-bold text-gray-900">Entrar</CardTitle>
            <CardDescription className="text-gray-600">Acesse sua conta para continuar</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Tipo de Usuário */}
              <div className="space-y-2">
                <Label htmlFor="userType" className="text-sm font-medium text-gray-700">
                  Eu sou:
                </Label>
                <Select
                  value={formData.userType}
                  onValueChange={(value) => handleInputChange("userType", value)}
                  required
                >
                  <SelectTrigger className="h-12 border-gray-200 focus:border-[#30B2B0] focus:ring-[#30B2B0]/20 rounded-xl">
                    <SelectValue placeholder="Selecione o tipo de usuário" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cliente">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Cliente (Dono de Pet)
                      </div>
                    </SelectItem>
                    <SelectItem value="petshop">
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4" />
                        Petshop/Clínica
                      </div>
                    </SelectItem>
                    <SelectItem value="fornecedor">
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4" />
                        Fornecedor
                      </div>
                    </SelectItem>
                    <SelectItem value="empresa">
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4" />
                        Empresa
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  E-mail
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="seu@email.com"
                    className="pl-11 h-12 border-gray-200 focus:border-[#30B2B0] focus:ring-[#30B2B0]/20 rounded-xl"
                    required
                  />
                </div>
              </div>

              {/* Senha */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Senha
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    placeholder="••••••••"
                    className="pl-11 pr-11 h-12 border-gray-200 focus:border-[#30B2B0] focus:ring-[#30B2B0]/20 rounded-xl"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Lembrar e Recuperar */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    id="remember"
                    type="checkbox"
                    className="rounded border-gray-300 text-[#30B2B0] focus:ring-[#30B2B0]/20"
                  />
                  <Label htmlFor="remember" className="text-sm text-gray-600">
                    Lembrar de mim
                  </Label>
                </div>
                <Button
                  type="button"
                  variant="link"
                  onClick={() => router.push("/recuperar")}
                  className="text-[#30B2B0] hover:text-[#145D5F] p-0 h-auto"
                >
                  Esqueceu a senha?
                </Button>
              </div>

              {/* Botão de Login */}
              <Button
                type="submit"
                disabled={!isFormValid || isLoading}
                className="w-full h-12 bg-gradient-to-r from-bpet-primary to-bpet-secondary hover:from-bpet-secondary hover:to-bpet-primary text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Entrando...
                  </div>
                ) : (
                  "Entrar"
                )}
              </Button>
            </form>

            {/* Divisor */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">ou</span>
              </div>
            </div>

            {/* Botão de Cadastro */}
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/cadastro")}
              className="w-full h-12 border-2 border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl font-medium"
            >
              Criar nova conta
            </Button>
          </CardContent>
        </Card>

        {/* Recursos */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-gradient-to-br from-[#D6DD83] to-[#FFBDB6] rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs text-gray-600">Cuidado Total</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-gradient-to-br from-[#FFBDB6] to-[#30B2B0] rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs text-gray-600">Segurança</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-gradient-to-br from-[#30B2B0] to-[#D6DD83] rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs text-gray-600">Comunidade</span>
          </div>
        </div>
      </div>
    </div>
  )
}
