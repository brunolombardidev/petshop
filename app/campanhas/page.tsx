"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Heart, Search, Plus, Calendar, DollarSign, Target, Trash2, Check, X } from "lucide-react"
import { FloatingButtons } from "@/components/floating-buttons"
import { campaignService, type Campaign } from "@/services/campaign.service"
import { useAuthState } from "@/hooks/use-auth"
import { toast } from "@/hooks/use-toast"

export default function CampanhasPage() {
  const router = useRouter()
  const { isAdmin } = useAuthState()
  const [campanhas, setCampanhas] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [filtro, setFiltro] = useState("")
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [approvingId, setApprovingId] = useState<string | null>(null)
  const [denyingId, setDenyingId] = useState<string | null>(null)
  const [denyReason, setDenyReason] = useState("")
  const [showDenyDialog, setShowDenyDialog] = useState(false)
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null)

  useEffect(() => {
    loadCampanhas()
  }, [])

  const loadCampanhas = async () => {
    try {
      setLoading(true)
      const response = await campaignService.getCampaigns({
        page: 1,
        limit: 100,
      })
      setCampanhas(response.data)
    } catch (error) {
      console.error("Erro ao carregar campanhas:", error)
      toast({
        title: "Erro",
        description: "Erro ao carregar campanhas. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id)
      await campaignService.deleteCampaign(id)
      setCampanhas(campanhas.filter((campanha) => campanha.id !== id))
      toast({
        title: "Sucesso!",
        description: "Campanha excluída com sucesso.",
      })
    } catch (error) {
      console.error("Erro ao excluir campanha:", error)
      toast({
        title: "Erro",
        description: "Erro ao excluir campanha. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setDeletingId(null)
    }
  }

  const handleApprove = async (id: string) => {
    try {
      setApprovingId(id)
      await campaignService.approveCampaign(id)
      setCampanhas(
        campanhas.map((campanha) => (campanha.id === id ? { ...campanha, status: "aprovada" as const } : campanha)),
      )
      toast({
        title: "Sucesso!",
        description: "Campanha aprovada com sucesso.",
      })
    } catch (error) {
      console.error("Erro ao aprovar campanha:", error)
      toast({
        title: "Erro",
        description: "Erro ao aprovar campanha. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setApprovingId(null)
    }
  }

  const handleDeny = async () => {
    if (!selectedCampaignId) return

    try {
      setDenyingId(selectedCampaignId)
      await campaignService.denyCampaign(selectedCampaignId, denyReason)
      setCampanhas(
        campanhas.map((campanha) =>
          campanha.id === selectedCampaignId
            ? { ...campanha, status: "negada" as const, motivoNegacao: denyReason }
            : campanha,
        ),
      )
      toast({
        title: "Sucesso!",
        description: "Campanha negada com sucesso.",
      })
      setShowDenyDialog(false)
      setDenyReason("")
      setSelectedCampaignId(null)
    } catch (error) {
      console.error("Erro ao negar campanha:", error)
      toast({
        title: "Erro",
        description: "Erro ao negar campanha. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setDenyingId(null)
    }
  }

  const openDenyDialog = (campaignId: string) => {
    setSelectedCampaignId(campaignId)
    setShowDenyDialog(true)
  }

  const campanhasFiltradas = campanhas.filter(
    (campanha) =>
      campanha.titulo.toLowerCase().includes(filtro.toLowerCase()) ||
      campanha.categoria.toLowerCase().includes(filtro.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ativa":
      case "aprovada":
        return <Badge className="bg-green-100 text-green-800 border-0">Ativa</Badge>
      case "pendente":
        return <Badge className="bg-yellow-100 text-yellow-800 border-0">Pendente</Badge>
      case "concluida":
        return <Badge className="bg-blue-100 text-blue-800 border-0">Concluída</Badge>
      case "negada":
        return <Badge className="bg-red-100 text-red-800 border-0">Negada</Badge>
      case "pausada":
        return <Badge className="bg-gray-100 text-gray-800 border-0">Pausada</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-0">-</Badge>
    }
  }

  const getCategoriaBadge = (categoria: string) => {
    switch (categoria) {
      case "resgate":
        return <Badge className="bg-red-100 text-red-800 border-0">Resgate</Badge>
      case "saude":
        return <Badge className="bg-green-100 text-green-800 border-0">Saúde</Badge>
      case "alimentacao":
        return <Badge className="bg-orange-100 text-orange-800 border-0">Alimentação</Badge>
      case "abrigo":
        return <Badge className="bg-blue-100 text-blue-800 border-0">Abrigo</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-0">Geral</Badge>
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#D6DD83]/20 via-[#FFBDB6]/20 to-[#30B2B0]/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bpet-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando campanhas...</p>
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
                    <p className="text-3xl font-bold">
                      {campanhas.filter((c) => c.status === "ativa" || c.status === "aprovada").length}
                    </p>
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
                Campanhas
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
                        <div className="w-full lg:w-48 h-32 bg-gradient-to-br from-bpet-primary to-[#FFBDB6] rounded-xl flex items-center justify-center overflow-hidden">
                          {campanha.imagem ? (
                            <img
                              src={campanha.imagem || "/placeholder.svg"}
                              alt={campanha.titulo}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Heart className="w-12 h-12 text-white" />
                          )}
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
                              {campanha.userName && (
                                <p className="text-sm text-gray-500 mb-2">Por: {campanha.userName}</p>
                              )}
                            </div>
                            <div className="text-right flex flex-col items-end gap-2">
                              <p className="text-sm text-gray-500 mb-1">
                                <Calendar className="w-4 h-4 inline mr-1" />
                                {new Date(campanha.dataInicio).toLocaleDateString("pt-BR")} até{" "}
                                {new Date(campanha.dataFim).toLocaleDateString("pt-BR")}
                              </p>

                              {/* Botões de Admin */}
                              {isAdmin && (
                                <div className="flex gap-2 mt-2">
                                  {campanha.status === "pendente" && (
                                    <>
                                      <Button
                                        size="sm"
                                        onClick={() => handleApprove(campanha.id)}
                                        disabled={approvingId === campanha.id}
                                        className="bg-green-600 hover:bg-green-700 text-white"
                                      >
                                        <Check className="w-4 h-4 mr-1" />
                                        {approvingId === campanha.id ? "Aprovando..." : "Aprovar"}
                                      </Button>
                                      <Button
                                        size="sm"
                                        onClick={() => openDenyDialog(campanha.id)}
                                        disabled={denyingId === campanha.id}
                                        className="bg-orange-600 hover:bg-orange-700 text-white"
                                      >
                                        <X className="w-4 h-4 mr-1" />
                                        Negar
                                      </Button>
                                    </>
                                  )}
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button variant="destructive" size="sm" disabled={deletingId === campanha.id}>
                                        <Trash2 className="w-4 h-4 mr-1" />
                                        {deletingId === campanha.id ? "Excluindo..." : "Excluir"}
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          Tem certeza que deseja excluir a campanha "{campanha.titulo}"? Esta ação não
                                          pode ser desfeita.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                        <AlertDialogAction
                                          onClick={() => handleDelete(campanha.id)}
                                          className="bg-red-600 hover:bg-red-700"
                                        >
                                          Excluir
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </div>
                              )}
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

                          {/* Motivo de negação */}
                          {campanha.status === "negada" && campanha.motivoNegacao && (
                            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl">
                              <p className="text-sm text-red-800">
                                <strong>Motivo da negação:</strong> {campanha.motivoNegacao}
                              </p>
                            </div>
                          )}
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

      {/* Dialog para negar campanha */}
      <Dialog open={showDenyDialog} onOpenChange={setShowDenyDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Negar Campanha</DialogTitle>
            <DialogDescription>Informe o motivo da negação desta campanha.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="denyReason">Motivo da Negação</Label>
              <Textarea
                id="denyReason"
                value={denyReason}
                onChange={(e) => setDenyReason(e.target.value)}
                placeholder="Descreva o motivo da negação..."
                className="mt-2"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDenyDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleDeny} disabled={!denyReason.trim() || denyingId === selectedCampaignId}>
              {denyingId === selectedCampaignId ? "Negando..." : "Negar Campanha"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Botões Flutuantes */}
      <FloatingButtons />
      {/* Espaçamento para botões flutuantes */}
      <div className="pb-20"></div>
    </div>
  )
}
