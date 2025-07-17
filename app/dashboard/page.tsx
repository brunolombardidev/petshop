"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
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
import Image from "next/image"

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
            <Card className="border-0 shadow-lg bg-gradient-to-br from-bpet-secondary to-bpet-primary text-white rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/90">Meus Pets</CardTitle>
                <Heart className="h-5 w-5 text-white/80" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">3</div>
                <p className="text-xs text-white/80">Cadastrados</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-bpet-secondary to-bpet-primary text-white rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/90">Minhas Indicações</CardTitle>
                <Users2 className="h-5 w-5 text-white/80" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">8</div>
                <p className="text-xs text-white/80">Amigos indicados</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-bpet-secondary to-bpet-primary text-white rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/90">Serviços Utilizados</CardTitle>
                <Wrench className="h-5 w-5 text-white/80" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">24</div>
                <p className="text-xs text-white/80">Este ano</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-bpet-secondary to-bpet-primary text-white rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/90">Valor Total</CardTitle>
                <DollarSign className="h-5 w-5 text-white/80" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">R$ 2.8k</div>
                <p className="text-xs text-white/80">Em serviços</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-bpet-secondary to-bpet-primary text-white rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/90">Economia Total</CardTitle>
                <Gift className="h-5 w-5 text-white/80" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">R$ 450</div>
                <p className="text-xs text-white/80">Em descontos</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-bpet-secondary to-bpet-primary text-white rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/90">Custos Pagos</CardTitle>
                <Coins className="h-5 w-5 text-white/80" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">R$ 2.35k</div>
                <p className="text-xs text-white/80">Valor efetivo</p>
              </CardContent>
            </Card>
          </div>
        )

      case "petshop":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-5">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-bpet-secondary to-bpet-primary text-white rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/90">Público-alvo</CardTitle>
                <Target className="h-5 w-5 text-white/80" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">8.5k</div>
                <p className="text-xs text-white/80">Alcance mensal</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-bpet-secondary to-bpet-primary text-white rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/90">Meus Clientes</CardTitle>
                <Users className="h-5 w-5 text-white/80" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">456</div>
                <p className="text-xs text-white/80">Cadastrados</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-bpet-secondary to-bpet-primary text-white rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/90">Pets Clientes</CardTitle>
                <Heart className="h-5 w-5 text-white/80" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">789</div>
                <p className="text-xs text-white/80">Cadastrados</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-bpet-secondary to-bpet-primary text-white rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/90">Total Serviços</CardTitle>
                <Package className="h-5 w-5 text-white/80" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">89</div>
                <p className="text-xs text-white/80">Disponíveis</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-bpet-secondary to-bpet-primary text-white rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/90">Vendas Mês</CardTitle>
                <ShoppingCart className="h-5 w-5 text-white/80" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">245</div>
                <p className="text-xs text-white/80 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  Este mês
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-bpet-secondary to-bpet-primary text-white rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/90">Receitas Mês</CardTitle>
                <DollarSign className="h-5 w-5 text-white/80" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">R$ 15.2k</div>
                <p className="text-xs text-white/80 flex items-center gap-1">
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
            <Card className="border-0 shadow-lg bg-gradient-to-br from-bpet-secondary to-bpet-primary text-white rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/90">Público-alvo</CardTitle>
                <Target className="h-5 w-5 text-white/80" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">12k</div>
                <p className="text-xs text-white/80">Alcance mensal</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-bpet-secondary to-bpet-primary text-white rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/90">Meus Clientes</CardTitle>
                <Users className="h-5 w-5 text-white/80" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">234</div>
                <p className="text-xs text-white/80">Ativos</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-bpet-secondary to-bpet-primary text-white rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/90">Minhas Indicações</CardTitle>
                <Users2 className="h-5 w-5 text-white/80" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">45</div>
                <p className="text-xs text-white/80">Realizadas</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-bpet-secondary to-bpet-primary text-white rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/90">Total Serviços</CardTitle>
                <Package className="h-5 w-5 text-white/80" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">156</div>
                <p className="text-xs text-white/80">Disponíveis</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-bpet-secondary to-bpet-primary text-white rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/90">Vendas Mês</CardTitle>
                <ShoppingCart className="h-5 w-5 text-white/80" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">1,456</div>
                <p className="text-xs text-white/80 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  Este mês
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-bpet-secondary to-bpet-primary text-white rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/90">Receitas Mês</CardTitle>
                <DollarSign className="h-5 w-5 text-white/80" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">R$ 32.8k</div>
                <p className="text-xs text-white/80 flex items-center gap-1">
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
            <Card className="border-0 shadow-lg bg-gradient-to-br from-bpet-secondary to-bpet-primary text-white rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/90">Colaboradores</CardTitle>
                <Users className="h-5 w-5 text-white/80" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">247</div>
                <p className="text-xs text-white/80 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +12 este mês
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-bpet-secondary to-bpet-primary text-white rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/90">Total Pets</CardTitle>
                <Heart className="h-5 w-5 text-white/80" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">1,456</div>
                <p className="text-xs text-white/80">Dos colaboradores</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-bpet-secondary to-bpet-primary text-white rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/90">Serviços Utilizados</CardTitle>
                <Wrench className="h-5 w-5 text-white/80" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">2,847</div>
                <p className="text-xs text-white/80">Este ano</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-bpet-secondary to-bpet-primary text-white rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/90">Valor Total</CardTitle>
                <DollarSign className="h-5 w-5 text-white/80" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">R$ 53.9k</div>
                <p className="text-xs text-white/80">Em benefícios</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-bpet-secondary to-bpet-primary text-white rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/90">Economia Total</CardTitle>
                <Gift className="h-5 w-5 text-white/80" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">R$ 8.7k</div>
                <p className="text-xs text-white/80 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  Economia obtida
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-bpet-secondary to-bpet-primary text-white rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/90">Custos Pagos</CardTitle>
                <Coins className="h-5 w-5 text-white/80" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">R$ 45.2k</div>
                <p className="text-xs text-white/80">Valor efetivo</p>
              </CardContent>
            </Card>
          </div>
        )

      case "administrador":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-5">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-bpet-secondary to-bpet-primary text-white rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/90">Receita no Mês</CardTitle>
                <DollarSign className="h-5 w-5 text-white/80" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">R$ 125k</div>
                <p className="text-xs text-white/80 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +32% vs mês anterior
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-bpet-secondary to-bpet-primary text-white rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/90">Total de Indicações</CardTitle>
                <UserPlus className="h-5 w-5 text-white/80" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">1,247</div>
                <p className="text-xs text-white/80">Todas as indicações</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-bpet-secondary to-bpet-primary text-white rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/90">Indicações Aguardando</CardTitle>
                <Clock className="h-5 w-5 text-white/80" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">89</div>
                <p className="text-xs text-white/80">Pendentes de aprovação</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-bpet-secondary to-bpet-primary text-white rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/90">Total de Usuários</CardTitle>
                <Users className="h-5 w-5 text-white/80" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">8,456</div>
                <p className="text-xs text-white/80 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  Plataforma
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-bpet-secondary to-bpet-primary text-white rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/90">Usuários Ativos</CardTitle>
                <UserCheck className="h-5 w-5 text-white/80" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">7,892</div>
                <p className="text-xs text-white/80">Últimos 30 dias</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-bpet-secondary to-bpet-primary text-white rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/90">Usuários Inativos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">564</div>
                <p className="text-xs text-white/80">Mais de 30 dias</p>
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
                <ShoppingBag className="w-5 h-5 text-bpet-primary" />
                Últimas Compras
              </CardTitle>
              <CardDescription className="text-gray-600">Suas compras mais recentes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-bpet-secondary/10 to-bpet-secondary/20 rounded-xl border-l-4 border-bpet-secondary">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-bpet-secondary rounded-xl flex items-center justify-center">
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
                    <Badge className="bg-bpet-accent text-white mb-1">Entregue</Badge>
                    <p className="text-sm font-medium text-bpet-secondary flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Ontem
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-bpet-secondary/10 to-bpet-secondary/20 rounded-xl border-l-4 border-bpet-secondary">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-bpet-accent rounded-xl flex items-center justify-center">
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
                    <Badge className="bg-bpet-secondary text-white mb-1">Concluído</Badge>
                    <p className="text-sm font-medium text-bpet-accent flex items-center gap-1">
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
                <ShoppingCart className="w-5 h-5 text-bpet-primary" />
                Vendas Recentes
              </CardTitle>
              <CardDescription className="text-gray-600">Últimas vendas realizadas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-bpet-secondary/10 to-bpet-secondary/20 rounded-xl border-l-4 border-bpet-secondary">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-bpet-secondary rounded-xl flex items-center justify-center">
                      <Package className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Ração Premium 15kg</p>
                      <p className="text-sm text-gray-600">
                        Cliente: {userType === "petshop" ? "Maria Silva" : "PetShop Amigo Fiel"}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-3 h-3 text-bpet-accent fill-current" />
                        <Star className="w-3 h-3 text-bpet-accent fill-current" />
                        <Star className="w-3 h-3 text-bpet-accent fill-current" />
                        <Star className="w-3 h-3 text-bpet-accent fill-current" />
                        <Star className="w-3 h-3 text-bpet-accent fill-current" />
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-bpet-accent text-white mb-1">Entregue</Badge>
                    <p className="text-sm font-medium text-bpet-secondary">R$ 89,90</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-bpet-secondary/10 to-bpet-secondary/20 rounded-xl border-l-4 border-bpet-secondary">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-bpet-accent rounded-xl flex items-center justify-center">
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
                        <Star className="w-3 h-3 text-bpet-accent fill-current" />
                        <Star className="w-3 h-3 text-bpet-accent fill-current" />
                        <Star className="w-3 h-3 text-bpet-accent fill-current" />
                        <Star className="w-3 h-3 text-bpet-accent fill-current" />
                        <Star className="w-3 h-3 text-gray-300" />
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-bpet-secondary text-white mb-1">
                      {userType === "petshop" ? "Concluído" : "Em trânsito"}
                    </Badge>
                    <p className="text-sm font-medium text-bpet-accent">R$ 45,{userType === "petshop" ? "00" : "50"}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case "empresa":
        return (
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Building className="w-5 h-5 text-bpet-primary" />
                Resumo Mensal
              </CardTitle>
              <CardDescription className="text-gray-600">Principais métricas do mês</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-bpet-secondary/10 to-bpet-secondary/20 rounded-xl">
                  <div>
                    <p className="font-semibold text-gray-900">Novos Colaboradores</p>
                    <p className="text-sm text-gray-600">Cadastrados este mês</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-bpet-secondary">12</p>
                    <p className="text-xs text-bpet-secondary">+20% vs mês anterior</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-bpet-secondary/10 to-bpet-secondary/20 rounded-xl">
                  <div>
                    <p className="font-semibold text-gray-900">Utilização de Benefícios</p>
                    <p className="text-sm text-gray-600">Taxa de uso mensal</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-bpet-secondary">87%</p>
                    <p className="text-xs text-bpet-secondary">Excelente engajamento</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-bpet-secondary/10 to-bpet-secondary/20 rounded-xl">
                  <div>
                    <p className="font-semibold text-gray-900">Satisfação Geral</p>
                    <p className="text-sm text-gray-600">Avaliação dos colaboradores</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-bpet-secondary">4.8</p>
                    <p className="text-xs text-bpet-secondary">⭐⭐⭐⭐⭐</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case "administrador":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-bpet-primary" />
                  Indicações Recentes
                </CardTitle>
                <CardDescription className="text-gray-600">Últimas indicações recebidas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-bpet-secondary/10 to-bpet-secondary/20 rounded-xl border-l-4 border-bpet-secondary">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-bpet-secondary rounded-xl flex items-center justify-center">
                        <UserPlus className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Nova indicação - PetShop</p>
                        <p className="text-sm text-gray-600">Indicado por: Maria Silva - PetShop Vida Animal</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className="bg-bpet-secondary/20 text-bpet-secondary text-xs">PetShop</Badge>
                          <span className="text-xs text-gray-500">Comissão: R$ 150,00</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-bpet-accent text-white mb-1">Aguardando</Badge>
                      <p className="text-sm font-medium text-bpet-secondary">Há 2 min</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-bpet-secondary/10 to-bpet-secondary/20 rounded-xl border-l-4 border-bpet-secondary">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-bpet-accent rounded-xl flex items-center justify-center">
                        <UserPlus className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Indicação aprovada - Cliente</p>
                        <p className="text-sm text-gray-600">Indicado por: João Santos - Cliente Premium</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className="bg-bpet-soft/20 text-bpet-soft text-xs">Cliente</Badge>
                          <span className="text-xs text-gray-500">Comissão: R$ 50,00</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-bpet-accent text-white mb-1">Concluída</Badge>
                      <p className="text-sm font-medium text-bpet-accent">Há 5 min</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-bpet-primary" />
                  Feedbacks Recentes
                </CardTitle>
                <CardDescription className="text-gray-600">Últimos feedbacks recebidos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-bpet-secondary/10 to-bpet-secondary/20 rounded-xl border-l-4 border-bpet-secondary">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-bpet-accent rounded-xl flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Feedback Positivo</p>
                        <p className="text-sm text-gray-600">Cliente: Ana Costa - "Excelente atendimento!"</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-3 h-3 text-bpet-accent fill-current" />
                          <Star className="w-3 h-3 text-bpet-accent fill-current" />
                          <Star className="w-3 h-3 text-bpet-accent fill-current" />
                          <Star className="w-3 h-3 text-bpet-accent fill-current" />
                          <Star className="w-3 h-3 text-bpet-accent fill-current" />
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-bpet-accent text-white mb-1">5 Estrelas</Badge>
                      <p className="text-sm font-medium text-bpet-accent">Há 3 min</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-bpet-secondary/10 to-bpet-secondary/20 rounded-xl border-l-4 border-bpet-secondary">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-bpet-soft rounded-xl flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Sugestão de Melhoria</p>
                        <p className="text-sm text-gray-600">PetShop: Cão & Gato - "Melhorar sistema de agendamento"</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-3 h-3 text-bpet-accent fill-current" />
                          <Star className="w-3 h-3 text-bpet-accent fill-current" />
                          <Star className="w-3 h-3 text-bpet-accent fill-current" />
                          <Star className="w-3 h-3 text-gray-300" />
                          <Star className="w-3 h-3 text-gray-300" />
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-bpet-soft text-white mb-1">3 Estrelas</Badge>
                      <p className="text-sm font-medium text-bpet-soft">Há 12 min</p>
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
    <div className="min-h-screen bg-gradient-to-br from-bpet-secondary/10 via-bpet-accent/10 to-bpet-soft/10">
      {/* Menu Lateral */}
      <SidebarMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} userType={userType} />

      {/* Conteúdo Principal */}
      <main className="px-6 py-6">
        <div className="max-w-7xl mx-auto">
          {/* Header integrado */}
          <div className="flex items-center justify-between mb-6 bg-white rounded-2xl shadow-sm border border-bpet-secondary/20 px-6 py-4">
            <div className="flex items-center gap-3">
              <Image src="/bpet-logo.png" alt="B-Pet" width={40} height={40} className="object-contain" />
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-bpet-secondary/10 rounded-xl relative"
                onClick={handleNotifications}
              >
                <Bell className="h-5 w-5 text-bpet-primary" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-bpet-soft rounded-full"></div>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-bpet-secondary/10 rounded-xl relative"
                onClick={() => setIsMenuOpen(true)}
              >
                <Menu className="h-5 w-5 text-bpet-primary" />
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
