"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Search, CreditCard, PawPrint, Tag, Home, UserPlus } from "lucide-react"

type UserType = "cliente" | "petshop" | "fornecedor" | "empresa" | "administrador"

export function FloatingButtons() {
  const router = useRouter()
  const [userType, setUserType] = useState<UserType>("cliente")

  useEffect(() => {
    // Pega o tipo de usuário do localStorage
    const typeFromStorage = localStorage.getItem("userType") as UserType
    if (typeFromStorage) {
      setUserType(typeFromStorage)
    }
  }, [])

  const handleDashboard = () => {
    router.push(`/dashboard?tipo=${userType}`)
  }

  const handleSearch = () => {
    router.push(`/busca?tipo=${userType}`)
  }

  const handleValidarCartao = () => {
    router.push("/cartao-pet")
  }

  const handlePets = () => {
    router.push("/meus-pets")
  }

  const handleGestaoProdutos = () => {
    router.push("/gestao-produtos")
  }

  const handleCadastrarColaborador = () => {
    router.push("/colaboradores/cadastrar")
  }

  return (
    <div className="fixed bottom-2 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex items-center bg-white rounded-full shadow-2xl border border-gray-200 p-2">
        {/* Botão Dashboard - Para todos os usuários */}
        <Button
          onClick={handleDashboard}
          variant="ghost"
          size="icon"
          className="w-12 h-12 hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-110"
        >
          <Home className="h-6 w-6 text-gray-700" />
        </Button>

        {/* Botão Busca - Para todos os usuários */}
        <Button
          onClick={handleSearch}
          variant="ghost"
          size="icon"
          className="w-12 h-12 hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-110"
        >
          <Search className="h-6 w-6 text-gray-700" />
        </Button>

        {/* Botão Validar Cartão - Para todos exceto Empresa */}
        {userType !== "empresa" && (
          <Button
            onClick={handleValidarCartao}
            variant="ghost"
            size="icon"
            className="w-12 h-12 hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-110"
          >
            <CreditCard className="h-6 w-6 text-gray-700" />
          </Button>
        )}

        {/* Botão Meus Pets - Apenas para Cliente */}
        {userType === "cliente" && (
          <Button
            onClick={handlePets}
            variant="ghost"
            size="icon"
            className="w-12 h-12 hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-110"
          >
            <PawPrint className="h-6 w-6 text-gray-700" />
          </Button>
        )}

        {/* Botão Gestão de Produtos - Apenas para Petshop e Fornecedor */}
        {(userType === "petshop" || userType === "fornecedor") && (
          <Button
            onClick={handleGestaoProdutos}
            variant="ghost"
            size="icon"
            className="w-12 h-12 hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-110"
          >
            <Tag className="h-6 w-6 text-gray-700" />
          </Button>
        )}

        {/* Botão Cadastrar Colaborador - Apenas para Empresa */}
        {userType === "empresa" && (
          <Button
            onClick={handleCadastrarColaborador}
            variant="ghost"
            size="icon"
            className="w-12 h-12 hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-110"
          >
            <UserPlus className="h-6 w-6 text-gray-700" />
          </Button>
        )}
      </div>
    </div>
  )
}
