"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Tag, Search, Plus, Package, Edit, Trash2, Eye } from "lucide-react"
import { FloatingButtons } from "@/components/floating-buttons"

// Dados mockados dos produtos
const produtosMockados = [
  {
    id: "1",
    nome: "Ração Premium Golden 15kg",
    categoria: "Alimentação",
    preco: 89.9,
    desconto: 15,
    status: "ativo",
    descricao: "Ração super premium para cães adultos",
  },
  {
    id: "2",
    nome: "Brinquedo Kong Classic",
    categoria: "Brinquedos",
    preco: 35.5,
    desconto: 10,
    status: "ativo",
    descricao: "Brinquedo resistente para cães",
  },
  {
    id: "3",
    nome: "Shampoo Antipulgas 500ml",
    categoria: "Higiene",
    preco: 24.9,
    desconto: 0,
    status: "inativo",
    descricao: "Shampoo medicinal antipulgas",
  },
  {
    id: "4",
    nome: "Coleira Antipulgas Seresto",
    categoria: "Medicamentos",
    preco: 156.0,
    desconto: 5,
    status: "ativo",
    descricao: "Coleira antipulgas de longa duração",
  },
]

export default function GestaoProdutosPage() {
  const router = useRouter()
  const [produtos, setProdutos] = useState(produtosMockados)
  const [filtro, setFiltro] = useState("")

  const produtosFiltrados = produtos.filter(
    (produto) =>
      produto.nome.toLowerCase().includes(filtro.toLowerCase()) ||
      produto.categoria.toLowerCase().includes(filtro.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ativo":
        return <Badge className="bg-green-100 text-green-800 border-0">Ativo</Badge>
      case "inativo":
        return <Badge className="bg-red-100 text-red-800 border-0">Inativo</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-0">-</Badge>
    }
  }

  const getDescontoBadge = (desconto: number) => {
    if (desconto === 0) {
      return <Badge className="bg-gray-100 text-gray-800 border-0">Sem desconto</Badge>
    } else if (desconto <= 5) {
      return <Badge className="bg-blue-100 text-blue-800 border-0">{desconto}% OFF</Badge>
    } else if (desconto <= 15) {
      return <Badge className="bg-green-100 text-green-800 border-0">{desconto}% OFF</Badge>
    } else {
      return <Badge className="bg-purple-100 text-purple-800 border-0">{desconto}% OFF</Badge>
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
              <div className="w-10 h-10 bg-gradient-to-br from-bpet-primary to-bpet-secondary rounded-xl flex items-center justify-center shadow-lg">
                <Tag className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-900">Gestão de Produtos</h1>
                <p className="text-sm text-gray-600">Gerencie seu catálogo de produtos</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Botão Novo Produto */}
      <div className="px-6 py-6">
        <div className="max-w-6xl mx-auto flex justify-center">
          <Button
            onClick={() => router.push("/gestao-produtos/novo")}
            className="h-14 px-8 py-3 rounded-xl bg-gradient-to-r from-bpet-primary to-bpet-secondary hover:from-bpet-secondary hover:to-bpet-primary text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Plus className="w-5 h-5 mr-2" />
            Novo Produto
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
              placeholder="Buscar produtos por nome ou categoria..."
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
                    <p className="text-blue-100 text-sm">Total de Produtos</p>
                    <p className="text-3xl font-bold">{produtos.length}</p>
                  </div>
                  <Package className="w-8 h-8 text-blue-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-bpet-primary to-bpet-secondary text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Produtos Ativos</p>
                    <p className="text-3xl font-bold">{produtos.filter((p) => p.status === "ativo").length}</p>
                  </div>
                  <Tag className="w-8 h-8 text-green-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-[#D6DD83] to-[#FFBDB6] text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-100 text-sm">Com Desconto</p>
                    <p className="text-3xl font-bold">{produtos.filter((p) => p.desconto > 0).length}</p>
                  </div>
                  <Tag className="w-8 h-8 text-yellow-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-[#FFBDB6] to-bpet-secondary text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-red-100 text-sm">Produtos Inativos</p>
                    <p className="text-3xl font-bold">{produtos.filter((p) => p.status === "inativo").length}</p>
                  </div>
                  <Package className="w-8 h-8 text-red-200" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lista de Produtos */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Package className="w-5 h-5 text-purple-500" />
                Catálogo de Produtos
              </CardTitle>
              <CardDescription className="text-gray-600">
                {produtosFiltrados.length} produto{produtosFiltrados.length !== 1 ? "s" : ""} encontrado
                {produtosFiltrados.length !== 1 ? "s" : ""}
                {filtro && ` para "${filtro}"`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {produtosFiltrados.map((produto) => (
                  <Card
                    key={produto.id}
                    className="border-0 shadow-lg bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <CardContent className="p-0">
                      <div className="flex">
                        {/* Imagem do produto */}
                        <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                          <Package className="w-12 h-12 text-white" />
                        </div>

                        {/* Informações do produto */}
                        <div className="flex-1 p-6">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="font-bold text-xl text-gray-900 mb-1">{produto.nome}</h3>
                              <p className="text-purple-600 font-medium text-sm">{produto.categoria}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-3xl font-bold text-gray-900">R$ {produto.preco.toFixed(2)}</p>
                              {produto.desconto > 0 && (
                                <p className="text-sm text-gray-500 line-through">
                                  R$ {(produto.preco / (1 - produto.desconto / 100)).toFixed(2)}
                                </p>
                              )}
                            </div>
                          </div>

                          <p className="text-gray-600 text-sm mb-4">{produto.descricao}</p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {getStatusBadge(produto.status)}
                              {getDescontoBadge(produto.desconto)}
                            </div>

                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="rounded-lg hover:bg-purple-50 bg-transparent"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="rounded-lg hover:bg-purple-50 bg-transparent"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
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

              {produtosFiltrados.length === 0 && (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhum produto encontrado</h3>
                  <p className="text-gray-600">Tente ajustar sua busca ou adicione novos produtos ao catálogo.</p>
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
