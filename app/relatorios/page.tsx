"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, BarChart3, Search, Download, Calendar, TrendingUp, DollarSign } from "lucide-react"
import { FloatingButtons } from "@/components/floating-buttons"

// Dados mockados dos relatórios
const relatoriosMockados = [
  {
    id: "1",
    titulo: "Vendas Mensais - Dezembro 2024",
    tipo: "vendas",
    dataGeracao: "2024-12-15",
    status: "concluido",
    descricao: "Relatório completo de vendas do mês de dezembro",
    tamanho: "2.3 MB",
  },
  {
    id: "2",
    titulo: "Clientes Ativos - Q4 2024",
    tipo: "clientes",
    dataGeracao: "2024-12-10",
    status: "concluido",
    descricao: "Análise de clientes ativos no último trimestre",
    tamanho: "1.8 MB",
  },
  {
    id: "3",
    titulo: "Produtos Mais Vendidos - 2024",
    tipo: "produtos",
    dataGeracao: "2024-12-08",
    status: "processando",
    descricao: "Ranking dos produtos com maior volume de vendas",
    tamanho: "3.1 MB",
  },
  {
    id: "4",
    titulo: "Análise Financeira - Novembro 2024",
    tipo: "financeiro",
    dataGeracao: "2024-11-30",
    status: "concluido",
    descricao: "Demonstrativo financeiro completo do mês",
    tamanho: "4.2 MB",
  },
  {
    id: "5",
    titulo: "Campanhas de Marketing - Q4 2024",
    tipo: "marketing",
    dataGeracao: "2024-12-01",
    status: "erro",
    descricao: "Performance das campanhas de marketing",
    tamanho: "1.5 MB",
  },
]

export default function RelatoriosPage() {
  const router = useRouter()
  const [relatorios, setRelatorios] = useState(relatoriosMockados)
  const [filtro, setFiltro] = useState("")

  const relatoriosFiltrados = relatorios.filter(
    (relatorio) =>
      relatorio.titulo.toLowerCase().includes(filtro.toLowerCase()) ||
      relatorio.tipo.toLowerCase().includes(filtro.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "concluido":
        return <Badge className="bg-green-100 text-green-800 border-0">Concluído</Badge>
      case "processando":
        return <Badge className="bg-blue-100 text-blue-800 border-0">Processando</Badge>
      case "erro":
        return <Badge className="bg-red-100 text-red-800 border-0">Erro</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-0">-</Badge>
    }
  }

  const getTipoBadge = (tipo: string) => {
    switch (tipo) {
      case "vendas":
        return <Badge className="bg-purple-100 text-purple-800 border-0">Vendas</Badge>
      case "clientes":
        return <Badge className="bg-blue-100 text-blue-800 border-0">Clientes</Badge>
      case "produtos":
        return <Badge className="bg-green-100 text-green-800 border-0">Produtos</Badge>
      case "financeiro":
        return <Badge className="bg-yellow-100 text-yellow-800 border-0">Financeiro</Badge>
      case "marketing":
        return <Badge className="bg-pink-100 text-pink-800 border-0">Marketing</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-0">Outros</Badge>
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
              <div className="w-10 h-10 bg-gradient-to-br from-bpet-secondary to-bpet-primary rounded-xl flex items-center justify-center shadow-lg">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-900">Relatórios</h1>
                <p className="text-sm text-gray-600">Análises e dados do seu negócio</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Campo de Busca */}
      <div className="px-6 py-6">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Buscar relatórios por título ou tipo..."
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
            <Card className="border-0 shadow-lg bg-gradient-to-br from-bpet-secondary to-bpet-primary text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Total de Relatórios</p>
                    <p className="text-3xl font-bold">{relatorios.length}</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-blue-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-bpet-primary to-bpet-secondary text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Concluídos</p>
                    <p className="text-3xl font-bold">{relatorios.filter((r) => r.status === "concluido").length}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-[#D6DD83] to-[#FFBDB6] text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-100 text-sm">Processando</p>
                    <p className="text-3xl font-bold">{relatorios.filter((r) => r.status === "processando").length}</p>
                  </div>
                  <Calendar className="w-8 h-8 text-yellow-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-[#FFBDB6] to-bpet-secondary text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Este Mês</p>
                    <p className="text-3xl font-bold">
                      {relatorios.filter((r) => r.dataGeracao.includes("2024-12")).length}
                    </p>
                  </div>
                  <DollarSign className="w-8 h-8 text-purple-200" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lista de Relatórios */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-500" />
                Relatórios Disponíveis
              </CardTitle>
              <CardDescription className="text-gray-600">
                {relatoriosFiltrados.length} relatório{relatoriosFiltrados.length !== 1 ? "s" : ""} encontrado
                {relatoriosFiltrados.length !== 1 ? "s" : ""}
                {filtro && ` para "${filtro}"`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {relatoriosFiltrados.map((relatorio) => (
                  <Card
                    key={relatorio.id}
                    className="border-0 shadow-lg bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h3 className="font-bold text-xl text-gray-900 mb-1">{relatorio.titulo}</h3>
                          <p className="text-gray-600 text-sm mb-2">{relatorio.descricao}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Calendar className="w-4 h-4" />
                            <span>Gerado em {new Date(relatorio.dataGeracao).toLocaleDateString("pt-BR")}</span>
                            <span className="mx-2">•</span>
                            <span>{relatorio.tamanho}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(relatorio.status)}
                          {relatorio.status === "concluido" && (
                            <Button size="sm" className="rounded-lg bg-[#30B2B0] hover:bg-[#145D5F]">
                              <Download className="w-4 h-4 mr-1" />
                              Download
                            </Button>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">{getTipoBadge(relatorio.tipo)}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {relatoriosFiltrados.length === 0 && (
                <div className="text-center py-12">
                  <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhum relatório encontrado</h3>
                  <p className="text-gray-600">Tente ajustar sua busca ou aguarde novos relatórios serem gerados.</p>
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
