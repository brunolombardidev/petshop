"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Heart, Search, Plus, Calendar, DollarSign, Target } from "lucide-react"
import { FloatingButtons } from "@/components/floating-buttons"

// Dados mockados das campanhas
const campanhasMockadas = [
  {
    id: "1",
    titulo: "Resgate de Animais Abandonados",
    descricao: "Campanha para arrecadar fundos para resgate e cuidados médicos de animais abandonados.",
    meta: 5000,
    arrecadado: 3250,
    dataInicio: "2024-01-01",
    dataFim: "2024-03-01",
    status: "Ativa",
    categoria: "Resgate",
  },
  {
    id: "2",
    titulo: "Castração Gratuita",
    descricao: "Programa de castração gratuita para pets de famílias carentes.",
    meta: 3000,
    arrecadado: 2800,
    dataInicio: "2023-12-01",
    dataFim: "2024-02-01",
    status: "Ativa",
    categoria: "Saúde",
  },
  {
    id: "3",
    titulo: "Natal dos Pets sem Lar",
    descricao: "Campanha especial de Natal para arrecadar ração e medicamentos.",
    meta: 2000,
    arrecadado: 2000,
    dataInicio: "2023-11-01",
    dataFim: "2023-12-25",
    status: "Concluída",
    categoria: "Alimentação",
  },
]

export default function CampanhasPage() {
  const router = useRouter()
  const [campanhas, setCampanhas] = useState(campanhasMockadas)
  const [filtro, setFiltro] = useState("")

  const campanhasFiltradas = campanhas.filter(
    (campanha) =>
      campanha.titulo.toLowerCase().includes(filtro.toLowerCase()) ||
      campanha.categoria.toLowerCase().includes(filtro.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Ativa":
        return <Badge className="bg-green-100 text-green-800 border-0">Ativa</Badge>
      case "Concluída":
        return <Badge className="bg-blue-100 text-blue-800 border-0">Concluída</Badge>
      case "Pausada":
        return <Badge className="bg-yellow-100 text-yellow-800 border-0">Pausada</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-0">-</Badge>
    }
  }

  const getCategoriaBadge = (categoria: string) => {
    switch (categoria) {
      case "Resgate":
        return <Badge className="bg-red-100 text-red-800 border-0">Resgate</Badge>
      case "Saúde":
        return <Badge className="bg-green-100 text-green-800 border-0">Saúde</Badge>
      case "Alimentação":
        return <Badge className="bg-orange-100 text-orange-800 border-0">Alimentação</Badge>
      case "Abrigo":
        return <Badge className="bg-blue-100 text-blue-800 border-0">Abrigo</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-0">Geral</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D6DD83]/20 via-[#FFBDB6]/20 to-[#30B2B0]/20">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="hover:bg-blue-100 rounded-xl">
              <ArrowLeft className="h-5 w-5 text-gray-700" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-bpet-primary to-[#FFBDB6] rounded-xl flex items-center justify-center shadow-lg">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-900">Campanhas</h1>
                <p className="text-sm text-gray-600">Campanhas de doação para pets</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Botão Nova Campanha */}
      <div className="px-6 py-6">
        <div className="max-w-6xl mx-auto flex justify-center">
          <Button
            onClick={() => router.push("/campanhas/nova")}
            className="h-14 px-8 py-3 rounded-xl bg-gradient-to-r from-bpet-primary to-[#FFBDB6] hover:from-[#FFBDB6] hover:to-bpet-primary text-white shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Plus className="w-5 h-5 mr-2" />
            Nova Campanha
          </Button>
        </div>
      </div>

      {/* Campo de Busca */}
      <div className="px-6 py-6">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Buscar campanhas por título ou categoria..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="pl-12 h-14 text-lg border-0 bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl focus:ring-[#30B2B0]/20 focus:border-[#30B2B0]"
            />
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <main className="px-6 pb-8">
        <div className="max-w-6xl mx-auto">
          {/* Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-bpet-primary to-[#FFBDB6] text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-red-100 text-sm">Total de Campanhas</p>
                    <p className="text-3xl font-bold">{campanhas.length}</p>
                  </div>
                  <Heart className="w-8 h-8 text-red-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-bpet-primary to-bpet-secondary text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Campanhas Ativas</p>
                    <p className="text-3xl font-bold">{campanhas.filter((c) => c.status === "Ativa").length}</p>
                  </div>
                  <Target className="w-8 h-8 text-green-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-bpet-secondary to-[#D6DD83] text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Total Arrecadado</p>
                    <p className="text-3xl font-bold">
                      R$ {campanhas.reduce((sum, c) => sum + c.arrecadado, 0).toLocaleString()}
                    </p>
                  </div>
                  <DollarSign className="w-8 h-8 text-blue-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-[#D6DD83] to-bpet-primary text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Meta Total</p>
                    <p className="text-3xl font-bold">
                      R$ {campanhas.reduce((sum, c) => sum + c.meta, 0).toLocaleString()}
                    </p>
                  </div>
                  <Target className="w-8 h-8 text-purple-200" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lista de Campanhas */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                Suas Campanhas
              </CardTitle>
              <CardDescription className="text-gray-600">
                {campanhasFiltradas.length} campanha{campanhasFiltradas.length !== 1 ? "s" : ""} encontrada
                {campanhasFiltradas.length !== 1 ? "s" : ""}
                {filtro && ` para "${filtro}"`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {campanhasFiltradas.map((campanha) => (
                  <Card
                    key={campanha.id}
                    className="border-0 shadow-lg bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row gap-6">
                        {/* Imagem da campanha */}
                        <div className="w-full lg:w-48 h-32 bg-gradient-to-br from-bpet-primary to-[#FFBDB6] rounded-xl flex items-center justify-center">
                          <Heart className="w-12 h-12 text-white" />
                        </div>

                        {/* Informações da campanha */}
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4">
                            <div>
                              <h3 className="font-bold text-xl text-gray-900 mb-2">{campanha.titulo}</h3>
                              <p className="text-gray-600 text-sm mb-3">{campanha.descricao}</p>
                              <div className="flex items-center gap-2 mb-3">
                                {getCategoriaBadge(campanha.categoria)}
                                {getStatusBadge(campanha.status)}
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-500 mb-1">
                                <Calendar className="w-4 h-4 inline mr-1" />
                                {new Date(campanha.dataInicio).toLocaleDateString("pt-BR")} até{" "}
                                {new Date(campanha.dataFim).toLocaleDateString("pt-BR")}
                              </p>
                            </div>
                          </div>

                          {/* Progresso da campanha */}
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">Progresso da Meta</span>
                              <span className="text-sm font-medium text-gray-900">
                                R$ {campanha.arrecadado.toLocaleString()} / R$ {campanha.meta.toLocaleString()}
                              </span>
                            </div>
                            <Progress value={(campanha.arrecadado / campanha.meta) * 100} className="h-3" />
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-gray-500">
                                {((campanha.arrecadado / campanha.meta) * 100).toFixed(1)}% concluído
                              </span>
                              <span className="text-xs text-gray-500">
                                Faltam R$ {(campanha.meta - campanha.arrecadado).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {campanhasFiltradas.length === 0 && (
                <div className="text-center py-12">
                  <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhuma campanha encontrada</h3>
                  <p className="text-gray-600">Tente ajustar sua busca ou crie uma nova campanha.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Botões Flutuantes */}
      <FloatingButtons />
      {/* Espaçamento para botões flutuantes */}
      <div className="pb-20"></div>
    </div>
  )
}
