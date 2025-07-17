"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, Package, DollarSign, Clock, Star, TrendingUp } from "lucide-react"
import { UnifiedHeader } from "@/components/unified-header"
import { FloatingButtons } from "@/components/floating-buttons"

export default function DashboardPetshopPage() {
  const router = useRouter()
  const [user] = useState({
    name: "PetShop VetCare",
    email: "contato@vetcare.com",
    avatar: "/placeholder-logo.png",
    userType: "petshop" as const,
  })

  const estatisticas = {
    agendamentosHoje: 15,
    clientesAtivos: 342,
    faturamentoMes: 28500,
    avaliacaoMedia: 4.8,
  }

  const agendamentosHoje = [
    {
      id: "1",
      cliente: "Maria Silva",
      pet: "Buddy",
      servico: "Consulta Veterinária",
      horario: "09:00",
      status: "confirmado",
    },
    {
      id: "2",
      cliente: "João Santos",
      pet: "Luna",
      servico: "Banho e Tosa",
      horario: "10:30",
      status: "em-andamento",
    },
    {
      id: "3",
      cliente: "Ana Costa",
      pet: "Max",
      servico: "Vacinação",
      horario: "14:00",
      status: "agendado",
    },
  ]

  const produtosMaisVendidos = [
    { nome: "Ração Premium Cães", vendas: 45, receita: 2250 },
    { nome: "Brinquedo Interativo", vendas: 32, receita: 960 },
    { nome: "Shampoo Antipulgas", vendas: 28, receita: 840 },
    { nome: "Coleira Antipulgas", vendas: 25, receita: 750 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50">
      <UnifiedHeader user={user} />

      <main className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard PetShop 🏪</h1>
            <p className="text-gray-600">Gerencie seu negócio e acompanhe o desempenho</p>
          </div>

          {/* Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Agendamentos Hoje</p>
                    <p className="text-3xl font-bold">{estatisticas.agendamentosHoje}</p>
                  </div>
                  <Calendar className="w-8 h-8 text-blue-200" />
                </div>
                <div className="mt-2 flex items-center gap-1 text-blue-100 text-sm">
                  <TrendingUp className="w-3 h-3" />
                  +12% vs ontem
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Clientes Ativos</p>
                    <p className="text-3xl font-bold">{estatisticas.clientesAtivos}</p>
                  </div>
                  <Users className="w-8 h-8 text-green-200" />
                </div>
                <div className="mt-2 flex items-center gap-1 text-green-100 text-sm">
                  <TrendingUp className="w-3 h-3" />
                  +8% este mês
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Faturamento Mês</p>
                    <p className="text-3xl font-bold">R$ {(estatisticas.faturamentoMes / 1000).toFixed(0)}k</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-purple-200" />
                </div>
                <div className="mt-2 flex items-center gap-1 text-purple-100 text-sm">
                  <TrendingUp className="w-3 h-3" />
                  +15% vs mês anterior
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-amber-100 text-sm">Avaliação Média</p>
                    <p className="text-3xl font-bold">{estatisticas.avaliacaoMedia}</p>
                  </div>
                  <Star className="w-8 h-8 text-amber-200" />
                </div>
                <div className="mt-2 flex items-center gap-1 text-amber-100 text-sm">
                  <Star className="w-3 h-3 fill-current" />
                  Baseado em 127 avaliações
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Ações Rápidas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Button
              onClick={() => router.push("/agendamentos/novo")}
              className="h-14 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Novo Agendamento
            </Button>
            <Button
              onClick={() => router.push("/clientes/cadastrar")}
              variant="outline"
              className="h-14 border-2 border-gray-200 hover:bg-gray-50 rounded-xl"
            >
              <Users className="w-5 h-5 mr-2 text-gray-600" />
              Cadastrar Cliente
            </Button>
            <Button
              onClick={() => router.push("/gestao-produtos")}
              variant="outline"
              className="h-14 border-2 border-gray-200 hover:bg-gray-50 rounded-xl"
            >
              <Package className="w-5 h-5 mr-2 text-gray-600" />
              Gerenciar Produtos
            </Button>
            <Button
              onClick={() => router.push("/relatorios")}
              variant="outline"
              className="h-14 border-2 border-gray-200 hover:bg-gray-50 rounded-xl"
            >
              <TrendingUp className="w-5 h-5 mr-2 text-gray-600" />
              Relatórios
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Agendamentos de Hoje */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  Agendamentos de Hoje
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {agendamentosHoje.length} agendamentos para hoje
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {agendamentosHoje.map((agendamento) => (
                  <div key={agendamento.id} className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{agendamento.cliente}</h4>
                        <p className="text-sm text-gray-600">Pet: {agendamento.pet}</p>
                        <p className="text-sm text-gray-600">{agendamento.servico}</p>
                      </div>
                      <div className="text-right">
                        <Badge
                          className={
                            agendamento.status === "confirmado"
                              ? "bg-green-100 text-green-800 border-0"
                              : agendamento.status === "em-andamento"
                                ? "bg-blue-100 text-blue-800 border-0"
                                : "bg-yellow-100 text-yellow-800 border-0"
                          }
                        >
                          {agendamento.status === "confirmado"
                            ? "Confirmado"
                            : agendamento.status === "em-andamento"
                              ? "Em Andamento"
                              : "Agendado"}
                        </Badge>
                        <div className="flex items-center gap-1 mt-1 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          {agendamento.horario}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <Button
                  onClick={() => router.push("/agendamentos")}
                  variant="outline"
                  className="w-full h-12 border-2 border-dashed border-gray-300 hover:border-gray-400 rounded-xl"
                >
                  Ver todos os agendamentos
                </Button>
              </CardContent>
            </Card>

            {/* Produtos Mais Vendidos */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Package className="w-5 h-5 text-purple-500" />
                  Produtos Mais Vendidos
                </CardTitle>
                <CardDescription className="text-gray-600">Top produtos do mês</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {produtosMaisVendidos.map((produto, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-gray-900">{produto.nome}</h4>
                        <p className="text-sm text-gray-600">{produto.vendas} unidades vendidas</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">R$ {produto.receita}</p>
                        <p className="text-xs text-gray-500">receita</p>
                      </div>
                    </div>
                  </div>
                ))}

                <Button
                  onClick={() => router.push("/gestao-produtos")}
                  variant="outline"
                  className="w-full h-12 border-2 border-dashed border-gray-300 hover:border-gray-400 rounded-xl"
                >
                  Ver todos os produtos
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <FloatingButtons />
    </div>
  )
}
