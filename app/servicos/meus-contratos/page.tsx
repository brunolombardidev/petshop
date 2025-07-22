"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  ArrowLeft,
  Search,
  Calendar,
  DollarSign,
  PawPrint,
  Star,
  Clock,
  User,
  Building,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"
import { UnifiedHeader } from "@/components/unified-header"
import { FloatingButtons } from "@/components/floating-buttons"
import { useServiceContracts } from "@/hooks/use-services"
import type { ServiceContract } from "@/types/service"

export default function MeusContratosPage() {
  const router = useRouter()
  const { contracts, loading, getMyContracts, updateContractStatus, rateContract, cancelContract } =
    useServiceContracts()

  const [user] = useState({
    name: "Maria Silva",
    email: "maria@email.com",
    avatar: "/placeholder-user.jpg",
    userType: "cliente" as const,
  })

  // Estados de filtros
  const [busca, setBusca] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("todos")
  const [petFilter, setPetFilter] = useState<string>("todos")

  // Modal de avaliação
  const [avaliacaoModal, setAvaliacaoModal] = useState<{
    isOpen: boolean
    contract: ServiceContract | null
  }>({
    isOpen: false,
    contract: null,
  })
  const [avaliacao, setAvaliacao] = useState(5)
  const [comentario, setComentario] = useState("")

  // Modal de cancelamento
  const [cancelModal, setCancelModal] = useState<{
    isOpen: boolean
    contract: ServiceContract | null
  }>({
    isOpen: false,
    contract: null,
  })
  const [motivoCancelamento, setMotivoCancelamento] = useState("")

  useEffect(() => {
    fetchContracts()
  }, [statusFilter, petFilter])

  const fetchContracts = async () => {
    const filters: any = {}
    if (statusFilter !== "todos") filters.status = statusFilter
    if (petFilter !== "todos") filters.petId = petFilter

    await getMyContracts(filters)
  }

  const filteredContracts = contracts.filter((contract) => {
    if (!busca) return true
    const searchTerm = busca.toLowerCase()
    return (
      contract.servico?.nome.toLowerCase().includes(searchTerm) ||
      contract.petshop?.nome.toLowerCase().includes(searchTerm) ||
      contract.fornecedor?.nome.toLowerCase().includes(searchTerm) ||
      contract.pet?.nome.toLowerCase().includes(searchTerm)
    )
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pendente":
        return "bg-yellow-100 text-yellow-800"
      case "ativo":
        return "bg-green-100 text-green-800"
      case "concluido":
        return "bg-blue-100 text-blue-800"
      case "cancelado":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pendente":
        return "Pendente"
      case "ativo":
        return "Ativo"
      case "concluido":
        return "Concluído"
      case "cancelado":
        return "Cancelado"
      default:
        return status
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pendente":
        return <Clock className="w-4 h-4" />
      case "ativo":
        return <CheckCircle className="w-4 h-4" />
      case "concluido":
        return <CheckCircle className="w-4 h-4" />
      case "cancelado":
        return <XCircle className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  const handleAvaliar = async () => {
    if (!avaliacaoModal.contract) return

    try {
      await rateContract(avaliacaoModal.contract.id, avaliacao, comentario)
      setAvaliacaoModal({ isOpen: false, contract: null })
      setAvaliacao(5)
      setComentario("")
    } catch (error) {
      console.error("Erro ao avaliar:", error)
    }
  }

  const handleCancelar = async () => {
    if (!cancelModal.contract) return

    try {
      await cancelContract(cancelModal.contract.id, motivoCancelamento)
      setCancelModal({ isOpen: false, contract: null })
      setMotivoCancelamento("")
    } catch (error) {
      console.error("Erro ao cancelar:", error)
    }
  }

  const renderStars = (rating: number, interactive = false, onRate?: (rating: number) => void) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        } ${interactive ? "cursor-pointer hover:text-yellow-400" : ""}`}
        onClick={interactive && onRate ? () => onRate(i + 1) : undefined}
      />
    ))
  }

  // Estatísticas
  const stats = {
    total: contracts.length,
    pendentes: contracts.filter((c) => c.status === "pendente").length,
    ativos: contracts.filter((c) => c.status === "ativo").length,
    concluidos: contracts.filter((c) => c.status === "concluido").length,
    cancelados: contracts.filter((c) => c.status === "cancelado").length,
    valorTotal: contracts.reduce((acc, c) => acc + c.valor, 0),
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/50 via-blue-50/30 to-purple-50/50">
      <UnifiedHeader user={user} onNotificationsClick={() => router.push("/notificacoes")} onMenuClick={() => {}} />

      <main className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="hover:bg-green-100 rounded-xl">
              <ArrowLeft className="h-5 w-5 text-gray-700" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Meus Contratos</h1>
              <p className="text-gray-600">Acompanhe seus serviços contratados</p>
            </div>
          </div>

          {/* Cards de Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Building className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Pendentes</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.pendentes}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Ativos</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.ativos}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Concluídos</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.concluidos}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                    <XCircle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Cancelados</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.cancelados}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Valor Total</p>
                    <p className="text-lg font-bold text-gray-900">R$ {stats.valorTotal.toFixed(2)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filtros */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Buscar por serviço, provedor, pet..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className="pl-12 h-12 border-gray-200 rounded-xl"
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-48 h-12 border-gray-200 rounded-xl">
                      <SelectValue placeholder="Filtrar por status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos os Status</SelectItem>
                      <SelectItem value="pendente">Pendentes</SelectItem>
                      <SelectItem value="ativo">Ativos</SelectItem>
                      <SelectItem value="concluido">Concluídos</SelectItem>
                      <SelectItem value="cancelado">Cancelados</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lista de Contratos */}
          <div className="mb-6">
            <p className="text-gray-600">
              {loading
                ? "Carregando..."
                : `${filteredContracts.length} contrato${filteredContracts.length !== 1 ? "s" : ""} encontrado${filteredContracts.length !== 1 ? "s" : ""}`}
              {busca && ` para "${busca}"`}
            </p>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, index) => (
                <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Skeleton className="w-16 h-16 rounded-xl" />
                      <div className="flex-1 space-y-3">
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <Skeleton className="h-6 w-48" />
                            <Skeleton className="h-4 w-32" />
                          </div>
                          <Skeleton className="h-6 w-20" />
                        </div>
                        <Skeleton className="h-4 w-full" />
                        <div className="flex justify-between items-center">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-6 w-24" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredContracts.length === 0 ? (
            <div className="text-center py-12">
              <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {busca ? "Nenhum contrato encontrado" : "Nenhum contrato realizado"}
              </h3>
              <p className="text-gray-600 mb-6">
                {busca
                  ? "Tente ajustar sua busca ou remover alguns filtros."
                  : "Quando você contratar serviços, eles aparecerão aqui."}
              </p>
              <Button
                onClick={() => router.push("/servicos/buscar")}
                className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white rounded-xl"
              >
                Buscar Serviços
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredContracts.map((contract) => (
                <Card
                  key={contract.id}
                  className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl hover:shadow-xl transition-all duration-200"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {/* Avatar do Provedor */}
                      <Avatar className="w-16 h-16">
                        <AvatarImage
                          src={contract.petshop?.avatar || contract.fornecedor?.avatar}
                          alt={contract.petshop?.nome || contract.fornecedor?.nome}
                        />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-lg">
                          {(contract.petshop?.nome || contract.fornecedor?.nome || "").substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      {/* Informações do Contrato */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">{contract.servico?.nome}</h3>
                            <p className="text-sm text-gray-600">
                              {contract.petshop?.nome || contract.fornecedor?.nome}
                            </p>
                          </div>
                          <Badge className={`border-0 flex items-center gap-1 ${getStatusColor(contract.status)}`}>
                            {getStatusIcon(contract.status)}
                            {getStatusLabel(contract.status)}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-gray-600">
                            <PawPrint className="w-4 h-4" />
                            <div>
                              <p className="text-sm">Pet:</p>
                              <p className="text-xs text-gray-500">
                                {contract.pet?.nome} ({contract.pet?.especie})
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <div>
                              <p className="text-sm">Contratado em:</p>
                              <p className="text-xs text-gray-500">
                                {new Date(contract.dataContratacao).toLocaleDateString("pt-BR")}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-gray-600">
                            <DollarSign className="w-4 h-4" />
                            <div>
                              <p className="text-sm">Valor:</p>
                              <p className="text-xs text-gray-500">R$ {contract.valor.toFixed(2)}</p>
                            </div>
                          </div>
                        </div>

                        {/* Observações */}
                        {contract.observacoes && (
                          <div className="mb-4 p-3 bg-gray-50 rounded-xl">
                            <p className="text-sm text-gray-700">
                              <strong>Observações:</strong> {contract.observacoes}
                            </p>
                          </div>
                        )}

                        {/* Avaliação */}
                        {contract.avaliacaoCliente && (
                          <div className="mb-4 p-3 bg-yellow-50 rounded-xl">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-sm font-medium text-gray-700">Sua avaliação:</span>
                              <div className="flex items-center gap-1">{renderStars(contract.avaliacaoCliente)}</div>
                            </div>
                            {contract.comentarioCliente && (
                              <p className="text-sm text-gray-600">{contract.comentarioCliente}</p>
                            )}
                          </div>
                        )}

                        {/* Ações */}
                        <div className="flex gap-2 pt-2">
                          {contract.status === "concluido" && !contract.avaliacaoCliente && (
                            <Button
                              size="sm"
                              onClick={() => setAvaliacaoModal({ isOpen: true, contract })}
                              className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white rounded-xl"
                            >
                              <Star className="w-4 h-4 mr-1" />
                              Avaliar
                            </Button>
                          )}

                          {(contract.status === "pendente" || contract.status === "ativo") && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setCancelModal({ isOpen: true, contract })}
                              className="border-2 border-red-200 text-red-600 hover:bg-red-50 rounded-xl"
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Cancelar
                            </Button>
                          )}

                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              const profileUrl = contract.petshop
                                ? `/perfil/petshop?id=${contract.petshop.id}`
                                : `/perfil/fornecedor?id=${contract.fornecedor?.id}`
                              router.push(profileUrl)
                            }}
                            className="border-2 border-gray-200 hover:bg-gray-50 rounded-xl"
                          >
                            <User className="w-4 h-4 mr-1" />
                            Ver Perfil
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Modal de Avaliação */}
      <Dialog
        open={avaliacaoModal.isOpen}
        onOpenChange={(open) => !open && setAvaliacaoModal({ isOpen: false, contract: null })}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Avaliar Serviço</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">Como foi o serviço?</Label>
              <div className="flex items-center justify-center gap-1 py-2">
                {renderStars(avaliacao, true, setAvaliacao)}
              </div>
            </div>

            <div>
              <Label htmlFor="comentario" className="text-sm font-medium text-gray-700 mb-2 block">
                Comentário (opcional)
              </Label>
              <Textarea
                id="comentario"
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                placeholder="Conte como foi sua experiência..."
                className="min-h-[100px] border-gray-200 rounded-xl resize-none"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setAvaliacaoModal({ isOpen: false, contract: null })}
                className="flex-1 border-2 border-gray-200 rounded-xl"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleAvaliar}
                className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white rounded-xl"
              >
                Avaliar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Cancelamento */}
      <Dialog
        open={cancelModal.isOpen}
        onOpenChange={(open) => !open && setCancelModal({ isOpen: false, contract: null })}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Cancelar Contrato</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Tem certeza que deseja cancelar este contrato? Esta ação não pode ser desfeita.
            </p>

            <div>
              <Label htmlFor="motivo" className="text-sm font-medium text-gray-700 mb-2 block">
                Motivo do cancelamento (opcional)
              </Label>
              <Textarea
                id="motivo"
                value={motivoCancelamento}
                onChange={(e) => setMotivoCancelamento(e.target.value)}
                placeholder="Informe o motivo do cancelamento..."
                className="min-h-[100px] border-gray-200 rounded-xl resize-none"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setCancelModal({ isOpen: false, contract: null })}
                className="flex-1 border-2 border-gray-200 rounded-xl"
              >
                Voltar
              </Button>
              <Button
                onClick={handleCancelar}
                className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl"
              >
                Cancelar Contrato
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <FloatingButtons />
    </div>
  )
}
