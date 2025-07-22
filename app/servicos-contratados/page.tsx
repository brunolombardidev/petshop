"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Search, FileText, Calendar, DollarSign, User, Package, Filter } from "lucide-react"
import { FloatingButtons } from "@/components/floating-buttons"
import { useContractedServices } from "@/hooks/use-products"

export default function ServicosContratadosPage() {
  const router = useRouter()
  const { services, loading, fetchContractedServices } = useContractedServices()

  const [busca, setBusca] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("todos")

  useEffect(() => {
    fetchContractedServices({
      status: statusFilter === "todos" ? undefined : statusFilter,
      limit: 50,
    })
  }, [statusFilter])

  const filteredServices = services.filter((service) => {
    if (!busca) return true
    const searchTerm = busca.toLowerCase()
    return (
      service.servico.nome.toLowerCase().includes(searchTerm) ||
      service.cliente.nome.toLowerCase().includes(searchTerm) ||
      service.servico.categoria.toLowerCase().includes(searchTerm)
    )
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
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

  // Estatísticas
  const stats = {
    total: services.length,
    ativos: services.filter((s) => s.status === "ativo").length,
    concluidos: services.filter((s) => s.status === "concluido").length,
    cancelados: services.filter((s) => s.status === "cancelado").length,
    valorTotal: services.reduce((acc, s) => acc + s.valor, 0),
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
              className="hover:bg-[#D6DD83]/20 rounded-xl"
            >
              <ArrowLeft className="h-5 w-5 text-gray-700" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-bpet-primary to-bpet-secondary rounded-xl flex items-center justify-center shadow-lg">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-900">Serviços Contratados</h1>
                <p className="text-sm text-gray-600">Acompanhe seus serviços contratados</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Cards de Estatísticas */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
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
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <Package className="w-5 h-5 text-green-600" />
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
                  <Calendar className="w-5 h-5 text-blue-600" />
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
                  <User className="w-5 h-5 text-red-600" />
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
                <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Valor Total</p>
                  <p className="text-lg font-bold text-gray-900">{formatPrice(stats.valorTotal)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Buscar por serviço, cliente, categoria..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-12 h-12 border-0 bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl focus:ring-[#30B2B0]/20 focus:border-[#30B2B0]"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48 h-12 border-0 bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl focus:ring-[#30B2B0]/20 focus:border-[#30B2B0]">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Status</SelectItem>
                <SelectItem value="ativo">Ativos</SelectItem>
                <SelectItem value="concluido">Concluídos</SelectItem>
                <SelectItem value="cancelado">Cancelados</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Lista de Serviços */}
      <main className="px-6 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <p className="text-gray-600">
              {loading
                ? "Carregando..."
                : `${filteredServices.length} serviço${filteredServices.length !== 1 ? "s" : ""} encontrado${filteredServices.length !== 1 ? "s" : ""}`}
              {busca && ` para "${busca}"`}
            </p>
          </div>

          {loading ? (
            // Loading Skeletons
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
          ) : filteredServices.length === 0 ? (
            // Estado vazio
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {busca ? "Nenhum serviço encontrado" : "Nenhum serviço contratado"}
              </h3>
              <p className="text-gray-600">
                {busca
                  ? "Tente ajustar sua busca ou remover alguns filtros."
                  : "Quando você tiver serviços contratados, eles aparecerão aqui."}
              </p>
            </div>
          ) : (
            // Lista de Serviços
            <div className="space-y-4">
              {filteredServices.map((servico, index) => {
                let cardGradient = ""
                if (index % 3 === 0) {
                  cardGradient = "bg-gradient-to-br from-bpet-secondary to-bpet-primary"
                } else if (index % 3 === 1) {
                  cardGradient = "bg-gradient-to-br from-[#D6DD83] to-[#FFBDB6]"
                } else {
                  cardGradient = "bg-gradient-to-br from-bpet-primary to-bpet-secondary"
                }

                return (
                  <Card
                    key={servico.id}
                    className={`border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl hover:shadow-xl transition-all duration-200 cursor-pointer group ${cardGradient}`}
                    onClick={() => {
                      // Implementar navegação para detalhes do serviço
                      console.log("Ver detalhes do serviço:", servico.id)
                    }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        {/* Ícone do Serviço */}
                        <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                          <Package className="w-8 h-8 text-white" />
                        </div>

                        {/* Informações do Serviço */}
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                                {servico.servico.nome}
                              </h3>
                              <p className="text-sm text-gray-600">Cliente: {servico.cliente.nome}</p>
                            </div>
                            <Badge className={`border-0 ${getStatusColor(servico.status)}`}>
                              {getStatusLabel(servico.status)}
                            </Badge>
                          </div>

                          <p className="text-gray-700 mb-4 line-clamp-2">{servico.servico.descricao}</p>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Calendar className="w-4 h-4" />
                              <div>
                                <p className="text-sm">Contratado em:</p>
                                <p className="text-xs text-gray-500">
                                  {new Date(servico.dataContratacao).toLocaleDateString("pt-BR")}
                                </p>
                              </div>
                            </div>

                            {servico.dataVencimento && (
                              <div className="flex items-center gap-2 text-gray-600">
                                <Calendar className="w-4 h-4" />
                                <div>
                                  <p className="text-sm">Vencimento:</p>
                                  <p className="text-xs text-gray-500">
                                    {new Date(servico.dataVencimento).toLocaleDateString("pt-BR")}
                                  </p>
                                </div>
                              </div>
                            )}

                            <div className="flex items-center gap-2 text-gray-600">
                              <User className="w-4 h-4" />
                              <div>
                                <p className="text-sm">Contato:</p>
                                <p className="text-xs text-gray-500">{servico.cliente.email}</p>
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-between items-center">
                            <Badge className="bg-blue-100 text-blue-800 border-0">{servico.servico.categoria}</Badge>
                            <span className="text-2xl font-bold text-gray-900">{formatPrice(servico.valor)}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </main>

      {/* Botões Flutuantes */}
      <FloatingButtons />
    </div>
  )
}
