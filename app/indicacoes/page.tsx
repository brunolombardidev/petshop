"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ArrowLeft, UserPlus, Search, Plus, Calendar, DollarSign, TrendingUp, Trash2 } from "lucide-react"
import { FloatingButtons } from "@/components/floating-buttons"
import { indicationService, type Indication } from "@/services/indication.service"
import { useAuthState } from "@/hooks/use-auth"
import { toast } from "@/hooks/use-toast"

export default function IndicacoesPage() {
  const router = useRouter()
  const { isAdmin } = useAuthState()
  const [indicacoes, setIndicacoes] = useState<Indication[]>([])
  const [loading, setLoading] = useState(true)
  const [filtro, setFiltro] = useState("")
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    loadIndicacoes()
  }, [])

  const loadIndicacoes = async () => {
    try {
      setLoading(true)
      const response = await indicationService.getIndications({
        page: 1,
        limit: 100,
      })
      setIndicacoes(response.data)
    } catch (error) {
      console.error("Erro ao carregar indicações:", error)
      toast({
        title: "Erro",
        description: "Erro ao carregar indicações. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id)
      await indicationService.deleteIndication(id)
      setIndicacoes(indicacoes.filter((indicacao) => indicacao.id !== id))
      toast({
        title: "Sucesso!",
        description: "Indicação excluída com sucesso.",
      })
    } catch (error) {
      console.error("Erro ao excluir indicação:", error)
      toast({
        title: "Erro",
        description: "Erro ao excluir indicação. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setDeletingId(null)
    }
  }

  const indicacoesFiltradas = indicacoes.filter(
    (indicacao) =>
      indicacao.nomeIndicado.toLowerCase().includes(filtro.toLowerCase()) ||
      indicacao.tipoIndicacao.toLowerCase().includes(filtro.toLowerCase()) ||
      indicacao.status.toLowerCase().includes(filtro.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "aprovada":
        return <Badge className="bg-green-100 text-green-800 border-0">Aprovada</Badge>
      case "pendente":
        return <Badge className="bg-yellow-100 text-yellow-800 border-0">Pendente</Badge>
      case "rejeitada":
        return <Badge className="bg-red-100 text-red-800 border-0">Rejeitada</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-0">-</Badge>
    }
  }

  const getTipoBadge = (tipo: string) => {
    switch (tipo) {
      case "cliente":
        return <Badge className="bg-blue-100 text-blue-800 border-0">Cliente</Badge>
      case "petshop":
        return <Badge className="bg-purple-100 text-purple-800 border-0">PetShop</Badge>
      case "fornecedor":
        return <Badge className="bg-orange-100 text-orange-800 border-0">Fornecedor</Badge>
      case "empresa":
        return <Badge className="bg-indigo-100 text-indigo-800 border-0">Empresa</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-0">Outros</Badge>
    }
  }

  const estatisticas = {
    totalIndicacoes: indicacoes.length,
    aprovadas: indicacoes.filter((i) => i.status === "aprovada").length,
    pendentes: indicacoes.filter((i) => i.status === "pendente").length,
    comissaoTotal: indicacoes.filter((i) => i.status === "aprovada").reduce((sum, i) => sum + i.comissao, 0),
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#D6DD83]/20 via-[#FFBDB6]/20 to-[#30B2B0]/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bpet-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando indicações...</p>
        </div>
      </div>
    )
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
              <div className="w-10 h-10 bg-gradient-to-br from-bpet-primary to-bpet-secondary rounded-xl flex items-center justify-center shadow-lg">
                <UserPlus className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-900">Indicações</h1>
                <p className="text-sm text-gray-600">Gerencie suas indicações e ganhe comissões</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Botão Nova Indicação */}
      <div className="px-6 py-6">
        <div className="max-w-6xl mx-auto flex justify-center">
          <Button
            onClick={() => router.push("/indicacoes/nova")}
            className="h-14 px-8 py-3 rounded-xl bg-gradient-to-r from-bpet-primary to-bpet-secondary hover:from-bpet-secondary hover:to-bpet-primary text-white shadow-lg hover:shadow-xl transition-all duration-200"
          >
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
              placeholder="Buscar indicações por nome, tipo ou status..."
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
            <Card className="border-0 shadow-lg bg-gradient-to-br from-bpet-primary to-bpet-secondary text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Total de Indicações</p>
                    <p className="text-3xl font-bold">{estatisticas.totalIndicacoes}</p>
                  </div>
                  <UserPlus className="w-8 h-8 text-blue-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-bpet-secondary to-[#D6DD83] text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Aprovadas</p>
                    <p className="text-3xl font-bold">{estatisticas.aprovadas}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-[#D6DD83] to-[#FFBDB6] text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-100 text-sm">Pendentes</p>
                    <p className="text-3xl font-bold">{estatisticas.pendentes}</p>
                  </div>
                  <Calendar className="w-8 h-8 text-yellow-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-[#FFBDB6] to-bpet-primary text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Comissão Total</p>
                    <p className="text-3xl font-bold">R$ {estatisticas.comissaoTotal.toFixed(0)}</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-purple-200" />
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
                {indicacoesFiltradas.length} indicação{indicacoesFiltradas.length !== 1 ? "ões" : ""} encontrada
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
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row gap-4">
                        {/* Ícone da indicação */}
                        <div className="w-16 h-16 bg-gradient-to-br from-bpet-primary to-bpet-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                          <UserPlus className="w-8 h-8 text-white" />
                        </div>

                        {/* Informações da indicação */}
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3">
                            <div>
                              <h3 className="font-bold text-xl text-gray-900 mb-1">{indicacao.nomeIndicado}</h3>
                              <p className="text-sm text-gray-600 mb-2">{indicacao.emailIndicado}</p>
                              <p className="text-sm text-gray-600 mb-3">{indicacao.telefoneIndicado}</p>
                              <div className="flex items-center gap-2 mb-2">
                                {getTipoBadge(indicacao.tipoIndicacao)}
                                {getStatusBadge(indicacao.status)}
                              </div>
                            </div>
                            <div className="text-right flex flex-col items-end gap-2">
                              <p className="text-sm text-gray-500 mb-1">
                                <Calendar className="w-4 h-4 inline mr-1" />
                                Indicado em {new Date(indicacao.dataIndicacao).toLocaleDateString("pt-BR")}
                              </p>
                              {indicacao.dataAprovacao && (
                                <p className="text-sm text-gray-500 mb-2">
                                  Aprovado em {new Date(indicacao.dataAprovacao).toLocaleDateString("pt-BR")}
                                </p>
                              )}
                              {indicacao.status === "aprovada" && (
                                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-lg text-sm font-medium">
                                  <DollarSign className="w-4 h-4 inline mr-1" />
                                  R$ {indicacao.comissao.toFixed(2)}
                                </div>
                              )}
                              {/* Botão Delete - Apenas para Admin */}
                              {isAdmin && (
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button
                                      variant="destructive"
                                      size="sm"
                                      className="mt-2"
                                      disabled={deletingId === indicacao.id}
                                    >
                                      <Trash2 className="w-4 h-4 mr-1" />
                                      {deletingId === indicacao.id ? "Excluindo..." : "Excluir"}
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Tem certeza que deseja excluir a indicação de "{indicacao.nomeIndicado}"? Esta
                                        ação não pode ser desfeita.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => handleDelete(indicacao.id)}
                                        className="bg-red-600 hover:bg-red-700"
                                      >
                                        Excluir
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              )}
                            </div>
                          </div>

                          {indicacao.observacoes && (
                            <div className="bg-gray-50 p-3 rounded-xl">
                              <p className="text-sm text-gray-700">
                                <strong>Observações:</strong> {indicacao.observacoes}
                              </p>
                            </div>
                          )}
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
