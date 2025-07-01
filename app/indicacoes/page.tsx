"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Users, Search, Plus, UserPlus, Edit, Trash2, Eye } from "lucide-react"
import { FloatingButtons } from "@/components/floating-buttons"

// Dados mockados das indicações
const indicacoesMockadas = [
  {
    id: "1",
    nome: "Maria Silva Santos",
    email: "maria.silva@email.com",
    tipo: "Cliente",
    status: "Concluída",
    comissao: 50.0,
    dataIndicacao: "15/12/2024",
  },
  {
    id: "2",
    nome: "PetShop Vida Animal",
    email: "contato@petshopvida.com",
    tipo: "Petshop",
    status: "Aguardando",
    comissao: 0.0,
    dataIndicacao: "20/12/2024",
  },
  {
    id: "3",
    nome: "Fornecedor Premium Ltda",
    email: "vendas@fornecedorpremium.com",
    tipo: "Fornecedor",
    status: "Concluída",
    comissao: 100.0,
    dataIndicacao: "10/12/2024",
  },
  {
    id: "4",
    nome: "Empresa Tech Pet",
    email: "rh@techpet.com.br",
    tipo: "Empresa",
    status: "Aguardando",
    comissao: 0.0,
    dataIndicacao: "22/12/2024",
  },
]

export default function IndicacoesPage() {
  const router = useRouter()
  const [indicacoes, setIndicacoes] = useState(indicacoesMockadas)
  const [filtro, setFiltro] = useState("")

  const indicacoesFiltradas = indicacoes.filter(
    (indicacao) =>
      indicacao.nome.toLowerCase().includes(filtro.toLowerCase()) ||
      indicacao.tipo.toLowerCase().includes(filtro.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Concluída":
        return <Badge className="bg-green-100 text-green-800 border-0">Concluída</Badge>
      case "Aguardando":
        return <Badge className="bg-yellow-100 text-yellow-800 border-0">Aguardando</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-0">-</Badge>
    }
  }

  const getTipoBadge = (tipo: string) => {
    switch (tipo) {
      case "Cliente":
        return <Badge className="bg-pink-100 text-pink-800 border-0">Cliente</Badge>
      case "Petshop":
        return <Badge className="bg-blue-100 text-blue-800 border-0">Petshop</Badge>
      case "Fornecedor":
        return <Badge className="bg-purple-100 text-purple-800 border-0">Fornecedor</Badge>
      case "Empresa":
        return <Badge className="bg-indigo-100 text-indigo-800 border-0">Empresa</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-0">-</Badge>
    }
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
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <UserPlus className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-900">Indicações</h1>
                <p className="text-sm text-gray-600">Gerencie suas indicações de usuários</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Botão Nova Indicação */}
      <div className="px-6 py-6">
        <div className="max-w-6xl mx-auto">
          <Button className="h-14 px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
            <Plus className="w-5 h-5 mr-2" />
            Nova Indicação
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
              placeholder="Buscar indicações por nome ou tipo..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="pl-12 h-14 text-lg border-0 bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl focus:ring-2 focus:ring-blue-400/20 focus:border-blue-400"
            />
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <main className="px-6 pb-8">
        <div className="max-w-6xl mx-auto">
          {/* Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Total de Indicações</p>
                    <p className="text-3xl font-bold">{indicacoes.length}</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Concluídas</p>
                    <p className="text-3xl font-bold">{indicacoes.filter((p) => p.status === "Concluída").length}</p>
                  </div>
                  <UserPlus className="w-8 h-8 text-green-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-100 text-sm">Aguardando</p>
                    <p className="text-3xl font-bold">{indicacoes.filter((p) => p.status === "Aguardando").length}</p>
                  </div>
                  <UserPlus className="w-8 h-8 text-yellow-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm">Comissão Total (R$)</p>
                    <p className="text-3xl font-bold">
                      {indicacoes.reduce((sum, p) => sum + p.comissao, 0).toFixed(0)}
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-orange-200" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lista de Indicações */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-blue-500" />
                Suas Indicações
              </CardTitle>
              <CardDescription className="text-gray-600">
                {indicacoesFiltradas.length} indicaç{indicacoesFiltradas.length !== 1 ? "ões" : "ão"} encontrada
                {indicacoesFiltradas.length !== 1 ? "s" : ""}
                {filtro && ` para "${filtro}"`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {indicacoesFiltradas.map((indicacao) => (
                  <Card
                    key={indicacao.id}
                    className="border-0 shadow-lg bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <CardContent className="p-0">
                      <div className="flex">
                        {/* Avatar da indicação */}
                        <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                          <UserPlus className="w-12 h-12 text-white" />
                        </div>

                        {/* Informações da indicação */}
                        <div className="flex-1 p-6">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="font-bold text-xl text-gray-900 mb-1">{indicacao.nome}</h3>
                              <p className="text-blue-600 font-medium text-sm">{indicacao.email}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-500 mb-1">Indicado em {indicacao.dataIndicacao}</p>
                              {indicacao.comissao > 0 && (
                                <p className="text-2xl font-bold text-green-600">+R$ {indicacao.comissao.toFixed(2)}</p>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {getTipoBadge(indicacao.tipo)}
                              {getStatusBadge(indicacao.status)}
                            </div>

                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline" className="rounded-lg hover:bg-blue-50">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline" className="rounded-lg hover:bg-blue-50">
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

              {indicacoesFiltradas.length === 0 && (
                <div className="text-center py-12">
                  <UserPlus className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhuma indicação encontrada</h3>
                  <p className="text-gray-600">Tente ajustar sua busca ou faça uma nova indicação.</p>
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
