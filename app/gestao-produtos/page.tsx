"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
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
import { ArrowLeft, Search, Package, Plus, Edit, Trash2, Eye, Loader2, FileText } from "lucide-react"
import { FloatingButtons } from "@/components/floating-buttons"
import { useProducts } from "@/hooks/use-products"
import { useAuth } from "@/hooks/use-auth"

export default function GestaoProductsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useAuth()
  const { products, loading, fetchProducts, deleteProduct } = useProducts()

  const [busca, setBusca] = useState("")
  const [deletingId, setDeletingId] = useState<string | null>(null)

  // Determina se deve mostrar o botão de serviços contratados
  const showContractedServicesButton = user?.tipo === "petshop" || user?.tipo === "fornecedor"

  useEffect(() => {
    fetchProducts({
      search: busca || undefined,
      limit: 50,
    })
  }, [busca])

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id)
      await deleteProduct(id)
    } catch (error) {
      console.error("Erro ao excluir produto:", error)
    } finally {
      setDeletingId(null)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  const getCategoryColor = (categoria: string) => {
    const colors: Record<string, string> = {
      Ração: "bg-green-100 text-green-800",
      Medicamentos: "bg-red-100 text-red-800",
      Brinquedos: "bg-yellow-100 text-yellow-800",
      Acessórios: "bg-blue-100 text-blue-800",
      Higiene: "bg-purple-100 text-purple-800",
      "Camas e Casinhas": "bg-indigo-100 text-indigo-800",
      "Coleiras e Guias": "bg-pink-100 text-pink-800",
      Transporte: "bg-orange-100 text-orange-800",
      Aquarismo: "bg-cyan-100 text-cyan-800",
    }
    return colors[categoria] || "bg-gray-100 text-gray-800"
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
                <Package className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-900">Gestão de Produtos</h1>
                <p className="text-sm text-gray-600">Gerencie seus produtos e serviços</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {showContractedServicesButton && (
              <Button
                onClick={() => router.push("/servicos-contratados")}
                variant="outline"
                className="rounded-xl border-[#30B2B0] text-[#30B2B0] hover:bg-[#30B2B0]/10"
              >
                <FileText className="w-4 h-4 mr-2" />
                Serviços Contratados
              </Button>
            )}
            <Button
              onClick={() => router.push("/gestao-produtos/novo")}
              className="rounded-xl bg-gradient-to-r from-bpet-primary to-bpet-secondary hover:from-bpet-primary/90 hover:to-bpet-secondary/90 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Novo Produto
            </Button>
          </div>
        </div>
      </header>

      {/* Barra de Busca */}
      <div className="px-6 py-6">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Buscar produtos por nome, categoria..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-12 h-14 text-lg border-0 bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl focus:ring-[#30B2B0]/20 focus:border-[#30B2B0]"
            />
          </div>
        </div>
      </div>

      {/* Lista de Produtos */}
      <main className="px-6 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-gray-600">
              {loading
                ? "Carregando..."
                : `${products.length} produto${products.length !== 1 ? "s" : ""} encontrado${products.length !== 1 ? "s" : ""}`}
              {busca && ` para "${busca}"`}
            </p>
          </div>

          {loading ? (
            // Loading Skeletons
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <Skeleton className="w-full h-48 rounded-xl" />
                      <div className="space-y-2">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                      </div>
                      <div className="flex justify-between items-center">
                        <Skeleton className="h-6 w-20" />
                        <Skeleton className="h-8 w-24" />
                      </div>
                      <div className="flex gap-2">
                        <Skeleton className="h-10 flex-1" />
                        <Skeleton className="h-10 w-10" />
                        <Skeleton className="h-10 w-10" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : products.length === 0 ? (
            // Estado vazio
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {busca ? "Nenhum produto encontrado" : "Nenhum produto cadastrado"}
              </h3>
              <p className="text-gray-600 mb-6">
                {busca
                  ? "Tente ajustar sua busca ou remover alguns filtros."
                  : "Comece cadastrando seu primeiro produto ou serviço."}
              </p>
              {!busca && (
                <Button
                  onClick={() => router.push("/gestao-produtos/novo")}
                  className="rounded-xl bg-gradient-to-r from-bpet-primary to-bpet-secondary hover:from-bpet-primary/90 hover:to-bpet-secondary/90 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Cadastrar Primeiro Produto
                </Button>
              )}
            </div>
          ) : (
            // Grid de Produtos
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((produto, index) => {
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
                    key={produto.id}
                    className={`border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl hover:shadow-xl transition-all duration-200 group ${cardGradient}`}
                  >
                    <CardContent className="p-6">
                      {/* Imagem do Produto */}
                      <div className="w-full h-48 bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl mb-4 overflow-hidden group-hover:scale-105 transition-transform">
                        {produto.imagem ? (
                          <img
                            src={produto.imagem || "/placeholder.svg"}
                            alt={produto.nome}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.src = "/placeholder.svg?height=192&width=300"
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="w-16 h-16 text-white" />
                          </div>
                        )}
                      </div>

                      {/* Informações do Produto */}
                      <div className="space-y-3">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-2">
                            {produto.nome}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-2 mt-1">{produto.descricao}</p>
                        </div>

                        <div className="flex items-center justify-between">
                          <Badge className={`border-0 ${getCategoryColor(produto.categoria)}`}>
                            {produto.categoria}
                          </Badge>
                          <span className="text-xl font-bold text-gray-900">{formatPrice(produto.preco)}</span>
                        </div>

                        {/* Status */}
                        <div className="flex items-center justify-between">
                          <Badge
                            className={`border-0 ${produto.ativo ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                          >
                            {produto.ativo ? "Ativo" : "Inativo"}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {new Date(produto.createdAt).toLocaleDateString("pt-BR")}
                          </span>
                        </div>

                        {/* Botões de Ação */}
                        <div className="flex gap-2 pt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 rounded-xl border-gray-300 hover:bg-gray-50 bg-transparent"
                            onClick={() => {
                              // Implementar visualização detalhada
                              console.log("Ver detalhes:", produto.id)
                            }}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Ver
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-xl border-blue-300 text-blue-600 hover:bg-blue-50 bg-transparent"
                            onClick={() => {
                              // Implementar edição
                              console.log("Editar produto:", produto.id)
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="rounded-xl border-red-300 text-red-600 hover:bg-red-50 bg-transparent"
                                disabled={deletingId === produto.id}
                              >
                                {deletingId === produto.id ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  <Trash2 className="w-4 h-4" />
                                )}
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="rounded-2xl">
                              <AlertDialogHeader>
                                <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Tem certeza que deseja excluir o produto "{produto.nome}"? Esta ação não pode ser
                                  desfeita.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="rounded-xl">Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(produto.id)}
                                  className="rounded-xl bg-red-600 hover:bg-red-700"
                                >
                                  Excluir
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
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
