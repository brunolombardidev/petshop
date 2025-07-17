"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Heart, TrendingUp, DollarSign, Calendar, Award, PlusCircle } from "lucide-react"
import { UnifiedHeader } from "@/components/unified-header"
import { FloatingButtons } from "@/components/floating-buttons"

export default function DashboardEmpresaPage() {
  const router = useRouter()
  const [user] = useState({
    name: "TechCorp Solutions",
    email: "rh@techcorp.com",
    avatar: "/placeholder-logo.png",
    userType: "empresa" as const,
  })

  const estatisticas = {
    colaboradores: 245,
    colaboradoresComPets: 156,
    beneficiosUtilizados: 89,
    economiaGerada: 45000,
  }

  const beneficiosPopulares = [
    { nome: "Consulta Veterinária", utilizacoes: 45, economia: 6750 },
    { nome: "Vacinação", utilizacoes: 32, economia: 3200 },
    { nome: "Banho e Tosa", utilizacoes: 28, economia: 2240 },
    { nome: "Castração", utilizacoes: 15, economia: 4500 },
  ]

  const colaboradoresRecentes = [
    {
      nome: "Ana Silva",
      departamento: "Marketing",
      pets: 2,
      ultimoUso: "2024-01-15",
      servico: "Consulta Veterinária",
    },
    {
      nome: "Carlos Santos",
      departamento: "TI",
      pets: 1,
      ultimoUso: "2024-01-14",
      servico: "Vacinação",
    },
    {
      nome: "Maria Costa",
      departamento: "RH",
      pets: 3,
      ultimoUso: "2024-01-13",
      servico: "Banho e Tosa",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/50 via-purple-50/30 to-pink-50/50">
      <UnifiedHeader user={user} />

      <main className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Empresarial 🏢</h1>
            <p className="text-gray-600">Gerencie os benefícios pet para seus colaboradores</p>
          </div>

          {/* Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-indigo-100 text-sm">Total Colaboradores</p>
                    <p className="text-3xl font-bold">{estatisticas.colaboradores}</p>
                  </div>
                  <Users className="w-8 h-8 text-indigo-200" />
                </div>
                <div className="mt-2 flex items-center gap-1 text-indigo-100 text-sm">
                  <TrendingUp className="w-3 h-3" />
                  +8 novos este mês
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-pink-500 to-rose-600 text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-pink-100 text-sm">Com Pets</p>
                    <p className="text-3xl font-bold">{estatisticas.colaboradoresComPets}</p>
                  </div>
                  <Heart className="w-8 h-8 text-pink-200" />
                </div>
                <div className="mt-2 flex items-center gap-1 text-pink-100 text-sm">
                  <Heart className="w-3 h-3" />
                  {Math.round((estatisticas.colaboradoresComPets / estatisticas.colaboradores) * 100)}% do total
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-emerald-100 text-sm">Benefícios Utilizados</p>
                    <p className="text-3xl font-bold">{estatisticas.beneficiosUtilizados}</p>
                  </div>
                  <Award className="w-8 h-8 text-emerald-200" />
                </div>
                <div className="mt-2 flex items-center gap-1 text-emerald-100 text-sm">
                  <TrendingUp className="w-3 h-3" />
                  +25% este mês
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-amber-100 text-sm">Economia Gerada</p>
                    <p className="text-3xl font-bold">R$ {(estatisticas.economiaGerada / 1000).toFixed(0)}k</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-amber-200" />
                </div>
                <div className="mt-2 flex items-center gap-1 text-amber-100 text-sm">
                  <DollarSign className="w-3 h-3" />
                  Para colaboradores
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Ações Rápidas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Button
              onClick={() => router.push("/colaboradores/cadastrar")}
              className="h-14 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl"
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              Novo Colaborador
            </Button>
            <Button
              onClick={() => router.push("/beneficios")}
              variant="outline"
              className="h-14 border-2 border-gray-200 hover:bg-gray-50 rounded-xl"
            >
              <Award className="w-5 h-5 mr-2 text-gray-600" />
              Gerenciar Benefícios
            </Button>
            <Button
              onClick={() => router.push("/campanhas")}
              variant="outline"
              className="h-14 border-2 border-gray-200 hover:bg-gray-50 rounded-xl"
            >
              <Calendar className="w-5 h-5 mr-2 text-gray-600" />
              Campanhas
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
            {/* Benefícios Mais Utilizados */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-500" />
                  Benefícios Mais Utilizados
                </CardTitle>
                <CardDescription className="text-gray-600">Top benefícios do mês</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {beneficiosPopulares.map((beneficio, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-gray-900">{beneficio.nome}</h4>
                        <p className="text-sm text-gray-600">{beneficio.utilizacoes} utilizações</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">R$ {beneficio.economia.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">economia gerada</p>
                      </div>
                    </div>
                  </div>
                ))}

                <Button
                  onClick={() => router.push("/beneficios")}
                  variant="outline"
                  className="w-full h-12 border-2 border-dashed border-gray-300 hover:border-gray-400 rounded-xl"
                >
                  Ver todos os benefícios
                </Button>
              </CardContent>
            </Card>

            {/* Colaboradores Ativos */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-indigo-500" />
                  Colaboradores Ativos
                </CardTitle>
                <CardDescription className="text-gray-600">Últimas utilizações de benefícios</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {colaboradoresRecentes.map((colaborador, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-gray-900">{colaborador.nome}</h4>
                        <p className="text-sm text-gray-600">{colaborador.departamento}</p>
                        <p className="text-sm text-gray-600">{colaborador.pets} pet(s)</p>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-blue-100 text-blue-800 border-0 mb-1">{colaborador.servico}</Badge>
                        <p className="text-xs text-gray-500">
                          {new Date(colaborador.ultimoUso).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                <Button
                  onClick={() => router.push("/colaboradores")}
                  variant="outline"
                  className="w-full h-12 border-2 border-dashed border-gray-300 hover:border-gray-400 rounded-xl"
                >
                  Ver todos os colaboradores
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
