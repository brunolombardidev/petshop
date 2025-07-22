"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft, Search, SlidersHorizontal } from "lucide-react"
import { UnifiedHeader } from "@/components/unified-header"
import { FloatingButtons } from "@/components/floating-buttons"
import { ServiceProviderCard } from "@/components/service-provider-card"
import { ServiceContractModal } from "@/components/service-contract-modal"
import { useServiceProviders, useServiceCategories } from "@/hooks/use-services"
import type { ServiceProvider } from "@/types/service"

export default function BuscarServicosPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { providers, loading, searchProviders, pagination } = useServiceProviders()
  const { categories } = useServiceCategories()

  const [user] = useState({
    name: "Maria Silva",
    email: "maria@email.com",
    avatar: "/placeholder-user.jpg",
    userType: "cliente" as const,
  })

  // Estados de filtros
  const [query, setQuery] = useState(searchParams.get("q") || "")
  const [categoria, setCategoria] = useState(searchParams.get("categoria") || "")
  const [cidade, setCidade] = useState(searchParams.get("cidade") || "")
  const [estado, setEstado] = useState(searchParams.get("estado") || "")
  const [tipo, setTipo] = useState<"petshop" | "fornecedor" | "">(
    (searchParams.get("tipo") as "petshop" | "fornecedor") || "",
  )
  const [avaliacao, setAvaliacao] = useState<number | undefined>(
    searchParams.get("avaliacao") ? Number(searchParams.get("avaliacao")) : undefined,
  )
  const [verificado, setVerificado] = useState<boolean | undefined>(
    searchParams.get("verificado") === "true" ? true : undefined,
  )
  const [ordenarPor, setOrdenarPor] = useState<"nome" | "avaliacao" | "distancia">("nome")
  const [showFilters, setShowFilters] = useState(false)

  // Modal de contratação
  const [contractModal, setContractModal] = useState<{
    isOpen: boolean
    provider: ServiceProvider | null
  }>({
    isOpen: false,
    provider: null,
  })

  // Buscar ao carregar a página
  useEffect(() => {
    handleSearch()
  }, [])

  const handleSearch = async (page = 1) => {
    const filters = {
      query: query || undefined,
      tipo: tipo || undefined,
      cidade: cidade || undefined,
      estado: estado || undefined,
      categoria: categoria || undefined,
      avaliacao: avaliacao || undefined,
      verificado: verificado,
      page,
      limit: 12,
    }

    await searchProviders(filters)

    // Atualizar URL
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        params.set(key, String(value))
      }
    })
    router.replace(`/servicos/buscar?${params.toString()}`, { scroll: false })
  }

  const handleViewProfile = (provider: ServiceProvider) => {
    const profileUrl =
      provider.tipo === "petshop" ? `/perfil/petshop?id=${provider.id}` : `/perfil/fornecedor?id=${provider.id}`
    router.push(profileUrl)
  }

  const handleContractService = (provider: ServiceProvider) => {
    setContractModal({
      isOpen: true,
      provider,
    })
  }

  const clearFilters = () => {
    setQuery("")
    setCategoria("")
    setCidade("")
    setEstado("")
    setTipo("")
    setAvaliacao(undefined)
    setVerificado(undefined)
    setOrdenarPor("nome")
    handleSearch()
  }

  const estados = [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50">
      <UnifiedHeader user={user} onNotificationsClick={() => router.push("/notificacoes")} onMenuClick={() => {}} />

      <main className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="hover:bg-blue-100 rounded-xl">
              <ArrowLeft className="h-5 w-5 text-gray-700" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Buscar Serviços</h1>
              <p className="text-gray-600">Encontre os melhores provedores de serviços para pets</p>
            </div>
          </div>

          {/* Barra de Busca Principal */}
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Buscar por nome, serviço, especialidade..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    className="pl-12 h-12 border-gray-200 rounded-xl"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    className="h-12 px-4 border-2 border-gray-200 rounded-xl"
                  >
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    Filtros
                  </Button>
                  <Button
                    onClick={() => handleSearch()}
                    className="h-12 px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Buscar
                  </Button>
                </div>
              </div>

              {/* Filtros Expandidos */}
              {showFilters && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Provedor</label>
                      <Select value={tipo} onValueChange={(value: "petshop" | "fornecedor" | "") => setTipo(value)}>
                        <SelectTrigger className="h-10 border-gray-200 rounded-xl">
                          <SelectValue placeholder="Todos os tipos" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos os tipos</SelectItem>
                          <SelectItem value="petshop">Pet Shops</SelectItem>
                          <SelectItem value="fornecedor">Fornecedores</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
                      <Select value={categoria} onValueChange={setCategoria}>
                        <SelectTrigger className="h-10 border-gray-200 rounded-xl">
                          <SelectValue placeholder="Todas as categorias" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todas as categorias</SelectItem>
                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.nome}>
                              {cat.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Cidade</label>
                      <Input
                        type="text"
                        placeholder="Digite a cidade"
                        value={cidade}
                        onChange={(e) => setCidade(e.target.value)}
                        className="h-10 border-gray-200 rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                      <Select value={estado} onValueChange={setEstado}>
                        <SelectTrigger className="h-10 border-gray-200 rounded-xl">
                          <SelectValue placeholder="Todos os estados" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos os estados</SelectItem>
                          {estados.map((uf) => (
                            <SelectItem key={uf} value={uf}>
                              {uf}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Avaliação Mínima</label>
                      <Select
                        value={avaliacao?.toString() || "all"}
                        onValueChange={(value) => setAvaliacao(value === "all" ? undefined : Number(value))}
                      >
                        <SelectTrigger className="h-10 border-gray-200 rounded-xl">
                          <SelectValue placeholder="Qualquer avaliação" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Qualquer avaliação</SelectItem>
                          <SelectItem value="4">4+ estrelas</SelectItem>
                          <SelectItem value="3">3+ estrelas</SelectItem>
                          <SelectItem value="2">2+ estrelas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Verificação</label>
                      <Select
                        value={verificado === undefined ? "all" : verificado.toString()}
                        onValueChange={(value) => setVerificado(value === "all" ? undefined : value === "true")}
                      >
                        <SelectTrigger className="h-10 border-gray-200 rounded-xl">
                          <SelectValue placeholder="Todos" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos</SelectItem>
                          <SelectItem value="true">Apenas verificados</SelectItem>
                          <SelectItem value="false">Não verificados</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Ordenar por</label>
                      <Select
                        value={ordenarPor}
                        onValueChange={(value: "nome" | "avaliacao" | "distancia") => setOrdenarPor(value)}
                      >
                        <SelectTrigger className="h-10 border-gray-200 rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="nome">Nome</SelectItem>
                          <SelectItem value="avaliacao">Avaliação</SelectItem>
                          <SelectItem value="distancia">Distância</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-end">
                      <Button
                        variant="outline"
                        onClick={clearFilters}
                        className="h-10 w-full border-2 border-gray-200 rounded-xl bg-transparent"
                      >
                        Limpar Filtros
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Resultados */}
          <div className="mb-6">
            <div className="flex justify-between items-center">
              <p className="text-gray-600">
                {loading
                  ? "Buscando..."
                  : `${pagination.total} resultado${pagination.total !== 1 ? "s" : ""} encontrado${pagination.total !== 1 ? "s" : ""}`}
                {query && ` para "${query}"`}
              </p>
              {pagination.totalPages > 1 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">
                    Página {pagination.page} de {pagination.totalPages}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Lista de Provedores */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Skeleton className="w-16 h-16 rounded-xl" />
                      <div className="flex-1 space-y-3">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-full" />
                        <div className="flex gap-2">
                          <Skeleton className="h-6 w-16" />
                          <Skeleton className="h-6 w-20" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : providers.length === 0 ? (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {query ? "Nenhum resultado encontrado" : "Nenhum provedor disponível"}
              </h3>
              <p className="text-gray-600 mb-6">
                {query
                  ? "Tente ajustar sua busca ou remover alguns filtros."
                  : "Não há provedores de serviços cadastrados no momento."}
              </p>
              {query && (
                <Button
                  onClick={clearFilters}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl"
                >
                  Limpar Filtros
                </Button>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {providers.map((provider) => (
                  <ServiceProviderCard
                    key={provider.id}
                    provider={provider}
                    onViewProfile={handleViewProfile}
                    onContractService={handleContractService}
                    showContractButton={user.userType === "cliente"}
                  />
                ))}
              </div>

              {/* Paginação */}
              {pagination.totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      onClick={() => handleSearch(pagination.page - 1)}
                      disabled={pagination.page === 1}
                      className="border-2 border-gray-200 rounded-xl"
                    >
                      Anterior
                    </Button>

                    {[...Array(Math.min(5, pagination.totalPages))].map((_, index) => {
                      const page = index + 1
                      const isCurrentPage = page === pagination.page

                      return (
                        <Button
                          key={page}
                          variant={isCurrentPage ? "default" : "outline"}
                          onClick={() => handleSearch(page)}
                          className={`w-10 h-10 rounded-xl ${
                            isCurrentPage
                              ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                              : "border-2 border-gray-200"
                          }`}
                        >
                          {page}
                        </Button>
                      )
                    })}

                    <Button
                      variant="outline"
                      onClick={() => handleSearch(pagination.page + 1)}
                      disabled={pagination.page === pagination.totalPages}
                      className="border-2 border-gray-200 rounded-xl"
                    >
                      Próxima
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Modal de Contratação */}
      <ServiceContractModal
        isOpen={contractModal.isOpen}
        onClose={() => setContractModal({ isOpen: false, provider: null })}
        provider={contractModal.provider!}
        onSuccess={() => {
          // Pode mostrar uma notificação de sucesso
          console.log("Serviço contratado com sucesso!")
        }}
      />

      <FloatingButtons />
    </div>
  )
}
