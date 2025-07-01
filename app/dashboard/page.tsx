"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  PawPrint,
  Users,
  Package,
  TrendingUp,
  Clock,
  Star,
  DollarSign,
  ShoppingCart,
  Target,
  UserPlus,
  UserCheck,
  MessageSquare,
  Heart,
  Gift,
  Building,
  Wrench,
  Coins,
  Users2,
  ShoppingBag,
  MapPin,
  Bell,
  Menu,
} from "lucide-react"
import { SidebarMenu } from "@/components/sidebar-menu"
import { FloatingButtons } from "@/components/floating-buttons"

type UserType = "cliente" | "petshop" | "fornecedor" | "empresa" | "administrador"

export default function UnifiedDashboardPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [userType, setUserType] = useState<UserType>("cliente")

  useEffect(() => {
    // Pega o tipo de usuário dos parâmetros da URL ou localStorage
    const typeFromUrl = searchParams.get("tipo") as UserType
    const typeFromStorage = localStorage.getItem("userType") as UserType

    if (typeFromUrl) {
      setUserType(typeFromUrl)
      localStorage.setItem("userType", typeFromUrl)
    } else if (typeFromStorage) {
      setUserType(typeFromStorage)
    } else {
      // Se não houver tipo definido, redireciona para login
      router.push("/")
    }
  }, [searchParams, router])

  const handleNotifications = () => {
    router.push("/notificacoes")
  }

  const handleSearch = () => {
    router.push(`/busca?tipo=${userType}`)
  }

  const handleDashboard = () => {
    router.push(`/dashboard?tipo=${userType}`)
  }

  const handleValidarCartao = () => {
    router.push("/validar-cartao")
  }

  const handleGestaoProdutos = () => {
    router.push("/gestao-produtos")
  }

  const handlePets = () => {
    router.push("/meus-pets")
  }

  const getDashboardTitle = () => {
    switch (userType) {
      case "cliente":
        return "Olá, Maria! 👋"
      case "petshop":
        return "Dashboard Petshop 🏪"
      case "fornecedor":
        return "Dashboard Fornecedor 📦"
      case "empresa":
        return "Dashboard Empresarial 🏢"
      case "administrador":
        return "Dashboard Administrador 🔧"
      default:
        return "Dashboard"
    }
  }

  const getDashboardSubtitle = () => {
    switch (userType) {
      case "cliente":
        return "Como estão seus pets hoje?"
      case "petshop":
        return "Gerencie seu petshop com eficiência"
      case "fornecedor":
        return "Gerencie suas vendas e produtos"
      case "empresa":
        return "Gerencie benefícios e colaboradores"
      case "administrador":
        return "Gerencie todo o sistema"
      default:
        return "Bem-vindo ao seu painel de controle"
    }
  }

  const renderStatsCards = () => {
    switch (userType) {
      case "cliente":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-5">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-100">Meus Pets</CardTitle>
                <PawPrint className="h-5 w-5 text-blue-200" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">3</div>
                <p className="text-xs text-blue-200">Cadastrados</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-green-100">Minhas Indicações</CardTitle>
                <Users2 className="h-5 w-5 text-green-200" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">8</div>
                <p className="text-xs text-green-200">Amigos indicados</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-amber-100">Serviços Utilizados</CardTitle>
                <Wrench className="h-5 w-5 text-amber-200" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">24</div>
                <p className="text-xs text-amber-200">Este ano</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-purple-100">Valor Total</CardTitle>
                <DollarSign className="h-5 w-5 text-purple-200" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">R$ 2.8k</div>
                <p className="text-xs text-purple-200">Em serviços</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-teal-500 to-cyan-600 text-white rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-teal-100">Economia Total</CardTitle>
                <Gift className="h-5 w-5 text-teal-200" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">R$ 450</div>
                <p className="text-xs text-teal-200">Em descontos</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-500 to-blue-600 text-white rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-indigo-100">Custos Pagos</CardTitle>
                <Coins className="h-5 w-5 text-indigo-200" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">R$ 2.35k</div>
                <p className="text-xs text-indigo-200">Valor efetivo</p>
              </CardContent>
            </Card>
          </div>
        )

      case "petshop":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-5">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-100">Público-alvo</CardTitle>
                <Target className="h-5 w-5 text-blue-200" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">8.5k</div>
                <p className="text-xs text-blue-200">Alcance mensal</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-green-100">Meus Clientes</CardTitle>
                <Users className="h-5 w-5 text-green-200" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">456</div>
                <p className="text-xs text-green-200">Cadastrados</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-amber-100">Pets Clientes</CardTitle>
                <PawPrint className="h-5 w-5 text-amber-200" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">789</div>
                <p className="text-xs text-amber-200">Cadastrados</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-purple-100">Total Serviços</CardTitle>
                <Package className="h-5 w-5 text-purple-200" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">89</div>
                <p className="text-xs text-purple-200">Disponíveis</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-teal-500 to-cyan-600 text-white rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-teal-100">Vendas Mês</CardTitle>
                <ShoppingCart className="h-5 w-5 text-teal-200" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">245</div>
                <p className="text-xs text-teal-200 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  Este mês
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-500 to-blue-600 text-white rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-indigo-100">Receitas Mês</CardTitle>
                <DollarSign className="h-5 w-5 text-indigo-200" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">R$ 15.2k</div>
                <p className="text-xs text-indigo-200 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +18% vs anterior
                </p>
              </CardContent>
            </Card>
          </div>
        )

      case "fornecedor":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-5">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-100">Público-alvo</CardTitle>
                <Target className="h-5 w-5 text-blue-200" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">12k</div>
                <p className="text-xs text-blue-200">Alcance mensal</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-green-100">Meus Clientes</CardTitle>
                <Users className="h-5 w-5 text-green-200" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">234</div>
                <p className="text-xs text-green-200">Ativos</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-amber-100">Minhas Indicações</CardTitle>
                <Users2 className="h-5 w-5 text-amber-200" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">45</div>
                <p className="text-xs text-amber-200">Realizadas</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-purple-100">Total Serviços</CardTitle>
                <Package className="h-5 w-5 text-purple-200" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">156</div>
                <p className="text-xs text-purple-200">Disponíveis</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-teal-500 to-cyan-600 text-white rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-teal-100">Vendas Mês</CardTitle>
                <ShoppingCart className="h-5 w-5 text-teal-200" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">1,456</div>
                <p className="text-xs text-teal-200 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  Este mês
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-500 to-blue-600 text-white rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-indigo-100">Receitas Mês</CardTitle>
                <DollarSign className="h-5 w-5 text-indigo-200" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">R$ 32.8k</div>
                <p className="text-xs text-indigo-200 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +25% vs anterior
                </p>
              </CardContent>
            </Card>
          </div>
        )

      case "empresa":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-5">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-100">Colaboradores</CardTitle>
                <Users className="h-5 w-5 text-blue-200" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">247</div>
                <p className="text-xs text-blue-200 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +12 este mês
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-green-100">Total Pets</CardTitle>
                <PawPrint className="h-5 w-5 text-green-200" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">1,456</div>
                <p className="text-xs text-green-200">Dos colaboradores</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-amber-100">Serviços Utilizados</CardTitle>
                <Wrench className="h-5 w-5 text-amber-200" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">2,847</div>
                <p className="text-xs text-amber-200">Este ano</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-purple-100">Valor Total</CardTitle>
                <DollarSign className="h-5 w-5 text-purple-200" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">R$ 53.9k</div>
                <p className="text-xs text-purple-200">Em benefícios</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-teal-500 to-cyan-600 text-white rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-teal-100">Economia Total</CardTitle>
                <Gift className="h-5 w-5 text-teal-200" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">R$ 8.7k</div>
                <p className="text-xs text-teal-200 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  Economia obtida
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-500 to-blue-600 text-white rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-indigo-100">Custos Pagos</CardTitle>
                <Coins className="h-5 w-5 text-indigo-200" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">R$ 45.2k</div>
                <p className="text-xs text-indigo-200">Valor efetivo</p>
              </CardContent>
            </Card>
          </div>
        )

      case "administrador":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-5">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-amber-100">Receita no Mês</CardTitle>
                <DollarSign className="h-5 w-5 text-amber-200" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">R$ 125k</div>
                <p className="text-xs text-amber-200 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +32% vs mês anterior
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-100">Total de Indicações</CardTitle>
                <UserPlus className="h-5 w-5 text-blue-200" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">1,247</div>
                <p className="text-xs text-blue-200">Todas as indicações</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-500 to-amber-600 text-white rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-yellow-100">Indicações Aguardando</CardTitle>
                <Clock className="h-5 w-5 text-yellow-200" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">89</div>
                <p className="text-xs text-yellow-200">Pendentes de aprovação</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-green-100">Total de Usuários</CardTitle>
                <Users className="h-5 w-5 text-green-200" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">8,456</div>
                <p className="text-xs text-green-200 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  Plataforma
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-teal-500 to-cyan-600 text-white rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-teal-100">Usuários Ativos</CardTitle>
                <UserCheck className="h-5 w-5 text-teal-200" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">7,892</div>
                <p className="text-xs text-teal-200">Últimos 30 dias</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-red-500 to-pink-600 text-white rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-red-100">Usuários Inativos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">564</div>
                <p className="text-xs text-red-200">Mais de 30 dias</p>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return null
    }
  }

  const renderMainContent = () => {
    switch (userType) {
      case "cliente":
        return (
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-orange-500" />
                Últimas Compras
              </CardTitle>
              <CardDescription className="text-gray-600">Suas compras mais recentes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border-l-4 border-blue-500">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                      <ShoppingBag className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Ração Premium 15kg</p>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        PetShop Amigo Fiel
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-500 text-white mb-1">Entregue</Badge>
                    <p className="text-sm font-medium text-blue-600 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Ontem
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-100 rounded-xl border-l-4 border-green-500">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                      <Heart className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Consulta Veterinária - Mimi</p>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        Clínica VetCare
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-blue-500 text-white mb-1">Concluído</Badge>
                    <p className="text-sm font-medium text-green-600 flex items-center gap-1">
                      <Clock className="w-3 h-3" />2 dias atrás
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case "petshop":
      case "fornecedor":
        return (
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-orange-500" />
                Vendas Recentes
              </CardTitle>
              <CardDescription className="text-gray-600">Últimas vendas realizadas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border-l-4 border-blue-500">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                      <Package className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Ração Premium 15kg</p>
                      <p className="text-sm text-gray-600">
                        Cliente: {userType === "petshop" ? "Maria Silva" : "PetShop Amigo Fiel"}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-500 text-white mb-1">Entregue</Badge>
                    <p className="text-sm font-medium text-blue-600">R$ 89,90</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-100 rounded-xl border-l-4 border-green-500">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                      <Package className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {userType === "petshop" ? "Banho e Tosa - Rex" : "Kit Higiene Pet"}
                      </p>
                      <p className="text-sm text-gray-600">
                        Cliente: {userType === "petshop" ? "João Santos" : "Clínica VetCare"}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <Star className="w-3 h-3 text-gray-300" />
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-blue-500 text-white mb-1">
                      {userType === "petshop" ? "Concluído" : "Em trânsito"}
                    </Badge>
                    <p className="text-sm font-medium text-green-600">R$ 45,{userType === "petshop" ? "00" : "50"}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case "empresa":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Building className="w-5 h-5 text-orange-500" />
                  Resumo Mensal
                </CardTitle>
                <CardDescription className="text-gray-600">Principais métricas do mês</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
                    <div>
                      <p className="font-semibold text-gray-900">Novos Colaboradores</p>
                      <p className="text-sm text-gray-600">Cadastrados este mês</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">12</p>
                      <p className="text-xs text-blue-500">+20% vs mês anterior</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-100 rounded-xl">
                    <div>
                      <p className="font-semibold text-gray-900">Utilização de Benefícios</p>
                      <p className="text-sm text-gray-600">Taxa de uso mensal</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">87%</p>
                      <p className="text-xs text-green-500">Excelente engajamento</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-orange-100 rounded-xl">
                    <div>
                      <p className="font-semibold text-gray-900">Satisfação Geral</p>
                      <p className="text-sm text-gray-600">Avaliação dos colaboradores</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-orange-600">4.8</p>
                      <p className="text-xs text-orange-500">⭐⭐⭐⭐⭐</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">Ações Rápidas</CardTitle>
                <CardDescription className="text-gray-600">Acesso rápido às principais funcionalidades</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button className="h-24 flex flex-col gap-3 bg-gradient-to-br from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 group">
                    <UserPlus className="h-7 w-7 group-hover:scale-110 transition-transform" />
                    <span className="font-semibold text-center">Cadastrar Colaborador</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-24 flex flex-col gap-3 border-2 border-blue-200 text-blue-600 hover:bg-blue-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 group"
                  >
                    <Users className="h-7 w-7 group-hover:scale-110 transition-transform" />
                    <span className="font-semibold text-center">Gerenciar Colaboradores</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "administrador":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-orange-500" />
                  Indicações Recentes
                </CardTitle>
                <CardDescription className="text-gray-600">Últimas indicações recebidas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border-l-4 border-blue-500">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                        <UserPlus className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Nova indicação - PetShop</p>
                        <p className="text-sm text-gray-600">Indicado por: Maria Silva - PetShop Vida Animal</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className="bg-blue-100 text-blue-800 text-xs">PetShop</Badge>
                          <span className="text-xs text-gray-500">Comissão: R$ 150,00</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-yellow-500 text-white mb-1">Aguardando</Badge>
                      <p className="text-sm font-medium text-blue-600">Há 2 min</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-100 rounded-xl border-l-4 border-green-500">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                        <UserPlus className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Indicação aprovada - Cliente</p>
                        <p className="text-sm text-gray-600">Indicado por: João Santos - Cliente Premium</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className="bg-pink-100 text-pink-800 text-xs">Cliente</Badge>
                          <span className="text-xs text-gray-500">Comissão: R$ 50,00</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-green-500 text-white mb-1">Concluída</Badge>
                      <p className="text-sm font-medium text-green-600">Há 5 min</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-orange-500" />
                  Feedbacks Recentes
                </CardTitle>
                <CardDescription className="text-gray-600">Últimos feedbacks recebidos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-100 rounded-xl border-l-4 border-green-500">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Feedback Positivo</p>
                        <p className="text-sm text-gray-600">Cliente: Ana Costa - "Excelente atendimento!"</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-green-500 text-white mb-1">5 Estrelas</Badge>
                      <p className="text-sm font-medium text-green-600">Há 3 min</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-amber-100 rounded-xl border-l-4 border-yellow-500">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Sugestão de Melhoria</p>
                        <p className="text-sm text-gray-600">PetShop: Cão & Gato - "Melhorar sistema de agendamento"</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <Star className="w-3 h-3 text-gray-300" />
                          <Star className="w-3 h-3 text-gray-300" />
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-yellow-500 text-white mb-1">3 Estrelas</Badge>
                      <p className="text-sm font-medium text-yellow-600">Há 12 min</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-amber-50/30 to-yellow-50/50">
      {/* Menu Lateral */}
      <SidebarMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} userType={userType} />

      {/* Conteúdo Principal */}
      <main className="px-6 py-6">
        <div className="max-w-7xl mx-auto">
          {/* Header integrado */}
          <div className="flex items-center justify-between mb-6 bg-white rounded-2xl shadow-sm border border-orange-100 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
                <PawPrint className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                B-Pet
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-orange-100 rounded-xl relative"
                onClick={handleNotifications}
              >
                <Bell className="h-5 w-5 text-gray-700" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-orange-100 rounded-xl relative"
                onClick={() => setIsMenuOpen(true)}
              >
                <Menu className="h-5 w-5 text-gray-700" />
              </Button>
            </div>
          </div>
          <div className="mb-5">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">{getDashboardTitle()}</h1>
            <p className="text-gray-600">{getDashboardSubtitle()}</p>
          </div>

          {/* Cards de Estatísticas */}
          {renderStatsCards()}

          {/* Conteúdo Principal */}
          <div className="grid grid-cols-1 gap-5">{renderMainContent()}</div>
        </div>
      </main>

      {/* Botões Flutuantes */}
      <FloatingButtons />
    </div>
  )
}
