"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Heart, Search, Plus, Eye, Edit, Trash2 } from "lucide-react"
import { FloatingButtons } from "@/components/floating-buttons"

// Dados mockados das campanhas
const campanhasMockadas = [
  {
    id: "1",
    titulo: "Resgate de Cães Abandonados - Zona Sul",
    descricao:
      "Campanha para resgatar e cuidar de 15 cães encontrados abandonados na região da Zona Sul. Precisamos de recursos para alimentação, medicamentos e castração.",
    meta: 5000.0,
    arrecadado: 2350.0,
    status: "Ativa",
    dataCriacao: "15/12/2024",
    organizador: "ONG Patinhas Carentes",
  },
  {
    id: "2",
    titulo: "Cirurgia de Emergência - Gato Atropelado",
    descricao:
      "Um gato foi encontrado atropelado e precisa de cirurgia urgente. A operação custa R$ 1.200 e o animal não tem tutor.",
    meta: 1200.0,
    arrecadado: 850.0,
    status: "Aguardando",
    dataCriacao: "20/12/2024",
    organizador: "Clínica Veterinária Vida",
  },
  {
    id: "3",
    titulo: "Ração para Abrigo Municipal",
    descricao:
      "O abrigo municipal está sem ração para alimentar os 80 animais abrigados. Precisamos urgentemente de recursos para comprar alimento.",
    meta: 3000.0,
    arrecadado: 3000.0,
    status: "Concluída",
    dataCriacao: "10/12/2024",
    organizador: "Prefeitura Municipal",
  },
  {
    id: "4",
    titulo: "Vacinação em Massa - Comunidade Rural",
    descricao:
      "Campanha de vacinação antirrábica para pets de famílias carentes da zona rural. Meta é vacinar 200 animais gratuitamente.",
    meta: 2500.0,
    arrecadado: 1100.0,
    status: "Aguardando",
    dataCriacao: "22/12/2024",
    organizador: "Associação Rural Unidos",
  },
]

export default function CampanhasPage() {
  const router = useRouter()
  const [campanhas, setCampanhas] = useState(campanhasMockadas)
  const [filtro, setFiltro] = useState("")

  const campanhasFiltradas = campanhas.filter(
    (campanha) =>
      campanha.titulo.toLowerCase().includes(filtro.toLowerCase()) ||
      campanha.organizador.toLowerCase().includes(filtro.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Ativa":
        return <Badge className="bg-green-100 text-green-800 border-0">Ativa</Badge>
      case "Aguardando":
        return <Badge className="bg-yellow-100 text-yellow-800 border-0">Aguardando</Badge>
      case "Concluída":
        return <Badge className="bg-blue-100 text-blue-800 border-0">Concluída</Badge>
      case "Rejeitada":
        return <Badge className="bg-red-100 text-red-800 border-0">Rejeitada</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-0">-</Badge>
    }
  }

  const getProgressPercentage = (arrecadado: number, meta: number) => {
    return Math.min((arrecadado / meta) * 100, 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-amber-50/30 to-yellow-50/50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-orange-100 sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="hover:bg-orange-100 rounded-xl"
            >
              <ArrowLeft className="h-5 w-5 text-gray-700" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
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
        <div className="max-w-6xl mx-auto">
          <Button className="h-14 px-8 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200">
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
              placeholder="Buscar campanhas por título ou organizador..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="pl-12 h-14 text-lg border-0 bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl focus:ring-2 focus:ring-pink-400/20 focus:border-pink-400"
            />
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <main className="px-6 pb-8">
        <div className="max-w-6xl mx-auto">
          {/* Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-pink-100 text-sm">Total de Campanhas</p>
                    <p className="text-3xl font-bold">{campanhas.length}</p>
                  </div>
                  <Heart className="w-8 h-8 text-pink-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Ativas</p>
                    <p className="text-3xl font-bold">{campanhas.filter((c) => c.status === "Ativa").length}</p>
                  </div>
                  <Heart className="w-8 h-8 text-green-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-100 text-sm">Aguardando</p>
                    <p className="text-3xl font-bold">{campanhas.filter((c) => c.status === "Aguardando").length}</p>
                  </div>
                  <Heart className="w-8 h-8 text-yellow-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Arrecadado Total (R$)</p>
                    <p className="text-3xl font-bold">
                      {campanhas.reduce((sum, c) => sum + c.arrecadado, 0).toFixed(0)}k
                    </p>
                  </div>
                  <Heart className="w-8 h-8 text-blue-200" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lista de Campanhas */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Heart className="w-5 h-5 text-pink-500" />
                Campanhas de Doação
              </CardTitle>
              <CardDescription className="text-gray-600">
                {campanhasFiltradas.length} campanha{campanhasFiltradas.length !== 1 ? "s" : ""} encontrada
                {campanhasFiltradas.length !== 1 ? "s" : ""}
                {filtro && ` para "${filtro}"`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campanhasFiltradas.map((campanha) => (
                  <Card
                    key={campanha.id}
                    className="border-0 shadow-lg bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <CardContent className="p-0">
                      <div className="flex">
                        {/* Imagem da campanha */}
                        <div className="w-32 h-32 bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center">
                          <Heart className="w-12 h-12 text-white" />
                        </div>

                        {/* Informações da campanha */}
                        <div className="flex-1 p-6">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="font-bold text-xl text-gray-900 mb-1">{campanha.titulo}</h3>
                              <p className="text-pink-600 font-medium text-sm">{campanha.organizador}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-500 mb-1">Criada em {campanha.dataCriacao}</p>
                              <p className="text-2xl font-bold text-green-600">
                                R$ {campanha.arrecadado.toFixed(0)} / R$ {campanha.meta.toFixed(0)}
                              </p>
                            </div>
                          </div>

                          <p className="text-gray-700 text-sm mb-3 line-clamp-2">{campanha.descricao}</p>

                          {/* Barra de progresso */}
                          <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                            <div
                              className="bg-gradient-to-r from-pink-500 to-pink-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${getProgressPercentage(campanha.arrecadado, campanha.meta)}%` }}
                            ></div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {getStatusBadge(campanha.status)}
                              <span className="text-sm text-gray-600">
                                {getProgressPercentage(campanha.arrecadado, campanha.meta).toFixed(0)}% da meta
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline" className="rounded-lg hover:bg-pink-50">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline" className="rounded-lg hover:bg-pink-50">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
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
