"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PawPrint, Mail, Lock, ArrowRight, User, Building, Package, Users } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userType, setUserType] = useState("")

  const handleLogin = () => {
    if (!userType) {
      alert("Por favor, selecione o tipo de usuário")
      return
    }

    // Salva o tipo de usuário no localStorage
    localStorage.setItem("userType", userType)

    // Redireciona para o dashboard unificado com o tipo de usuário
    router.push(`/dashboard?tipo=${userType}`)
  }

  const handleRegister = () => {
    router.push("/cadastro")
  }

  const getUserTypeIcon = (type: string) => {
    switch (type) {
      case "cliente":
        return <User className="w-4 h-4" />
      case "petshop":
        return <Building className="w-4 h-4" />
      case "fornecedor":
        return <Package className="w-4 h-4" />
      case "empresa":
        return <Users className="w-4 h-4" />
      default:
        return null
    }
  }

  const getUserTypeColor = (type: string) => {
    switch (type) {
      case "cliente":
        return "text-pink-600"
      case "petshop":
        return "text-blue-600"
      case "fornecedor":
        return "text-purple-600"
      case "empresa":
        return "text-indigo-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-orange-200/30 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-amber-200/30 rounded-full blur-xl"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-yellow-200/30 rounded-full blur-xl"></div>

      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center pb-8 pt-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg">
              <PawPrint className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
            B-Pet
          </CardTitle>
          <CardDescription className="text-gray-600 text-base mt-2">
            Conectando você ao melhor cuidado pet
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 px-8 pb-8">
          {/* Seletor de Tipo de Usuário */}
          <div className="space-y-2">
            <Select value={userType} onValueChange={setUserType}>
              <SelectTrigger className="h-12 border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-xl">
                <div className="flex items-center gap-2">
                  {userType && getUserTypeIcon(userType)}
                  <SelectValue placeholder="Selecione o tipo de usuário" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cliente">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-pink-600" />
                    <span>Cliente</span>
                  </div>
                </SelectItem>
                <SelectItem value="petshop">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-blue-600" />
                    <span>Petshop</span>
                  </div>
                </SelectItem>
                <SelectItem value="fornecedor">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-purple-600" />
                    <span>Fornecedor</span>
                  </div>
                </SelectItem>
                <SelectItem value="empresa">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-indigo-600" />
                    <span>Empresa</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Campo de Email */}
          <div className="space-y-2">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                id="email"
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-11 h-12 border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-xl"
              />
            </div>
          </div>

          {/* Campo de Senha */}
          <div className="space-y-2">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-11 h-12 border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-xl"
              />
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="space-y-4 pt-4">
            <Button
              onClick={handleLogin}
              disabled={!userType}
              className={`w-full h-12 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group ${
                userType
                  ? "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {userType ? (
                <>
                  <span className="flex items-center gap-2">
                    {getUserTypeIcon(userType)}
                    Entrar como {userType.charAt(0).toUpperCase() + userType.slice(1)}
                  </span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              ) : (
                "Selecione o tipo de usuário"
              )}
            </Button>
            <Button
              onClick={handleRegister}
              variant="outline"
              className="w-full h-12 border-2 border-orange-200 text-orange-600 hover:bg-orange-50 font-semibold rounded-xl transition-all duration-200"
            >
              Criar conta
            </Button>
          </div>

          {/* Link de Recuperação */}
          <div className="text-center pt-4">
            <p className="text-sm text-gray-500">
              Esqueceu sua senha?
              <button
                onClick={() => router.push("/recuperar")}
                className="text-orange-600 hover:text-orange-700 font-medium ml-1 hover:underline"
              >
                Recuperar
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
