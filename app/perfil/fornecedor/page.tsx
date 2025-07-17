"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Truck, Edit, Save, Camera, Package, TrendingUp, Star } from "lucide-react"
import { FloatingButtons } from "@/components/floating-buttons"

export default function PerfilFornecedorPage() {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [fornecedorData, setFornecedorData] = useState({
    razaoSocial: "Fornecedor Premium Pet Ltda",
    nomeFantasia: "Premium Pet Supply",
    cnpj: "98.765.432/0001-10",
    email: "vendas@premiumpet.com.br",
    telefone: "(11) 2222-3333",
    endereco: "Rua dos Fornecedores, 500",
    cidade: "São Paulo",
    cep: "04567-890",
    responsavel: "Carlos Oliveira",
    categoria: "Ração e Acessórios",
  })

  const handleSave = () => {
    setIsEditing(false)
    alert("Perfil do fornecedor atualizado com sucesso!")
  }

  const estatisticas = {
    produtos: 150,
    pedidos: 1250,
    avaliacaoMedia: 4.7,
    tempoMercado: 8,
  }

  const produtos = [
    {
      id: "1",
      nome: "Ração Premium Cães Adultos",
      categoria: "Ração",
      estoque: 500,
      preco: 89.9,
      status: "Disponível",
    },
    {
      id: "2",
      nome: "Brinquedo Interativo",
      categoria: "Brinquedos",
      estoque: 0,
      preco: 45.5,
      status: "Esgotado",
    },
    {
      id: "3",
      nome: "Coleira Antipulgas",
      categoria: "Acessórios",
      estoque: 200,
      preco: 25.9,
      status: "Disponível",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D6DD83]/20 via-[#FFBDB6]/20 to-[#30B2B0]/20">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="hover:bg-purple-100 rounded-xl"
            >
              <ArrowLeft className="h-5 w-5 text-gray-700" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-900">Perfil do Fornecedor</h1>
                <p className="text-sm text-gray-600">Gerencie as informações do seu negócio</p>
              </div>
            </div>
          </div>
          <Button
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl"
          >
            {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
            {isEditing ? "Salvar" : "Editar"}
          </Button>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Card do Fornecedor */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative">
                  <Avatar className="w-32 h-32">
                    <AvatarImage src="/placeholder-logo.png" />
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-purple-600 text-white text-2xl">
                      {fornecedorData.nomeFantasia.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 rounded-full w-10 h-10 bg-purple-500 hover:bg-purple-600"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{fornecedorData.nomeFantasia}</h2>
                  <p className="text-purple-600 font-medium mb-2">{fornecedorData.razaoSocial}</p>
                  <p className="text-gray-600 mb-4">{fornecedorData.email}</p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-2">
                    <Badge className="bg-purple-100 text-purple-800 border-0">Fornecedor Premium</Badge>
                    <Badge className="bg-green-100 text-green-800 border-0">Verificado</Badge>
                    <Badge className="bg-blue-100 text-blue-800 border-0">{fornecedorData.categoria}</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Estatísticas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl">
              <CardContent className="p-4 text-center">
                <Package className="w-8 h-8 mx-auto mb-2" />
                <p className="text-2xl font-bold">{estatisticas.produtos}</p>
                <p className="text-sm text-purple-100">Produtos</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl">
              <CardContent className="p-4 text-center">
                <TrendingUp className="w-8 h-8 mx-auto mb-2" />
                <p className="text-2xl font-bold">{estatisticas.pedidos}</p>
                <p className="text-sm text-blue-100">Pedidos</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-2xl">
              <CardContent className="p-4 text-center">
                <Star className="w-8 h-8 mx-auto mb-2" />
                <p className="text-2xl font-bold">{estatisticas.avaliacaoMedia}</p>
                <p className="text-sm text-yellow-100">Avaliação</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl">
              <CardContent className="p-4 text-center">
                <Truck className="w-8 h-8 mx-auto mb-2" />
                <p className="text-2xl font-bold">{estatisticas.tempoMercado}</p>
                <p className="text-sm text-green-100">Anos</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="dados" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 bg-white/80 backdrop-blur-sm rounded-2xl p-1">
              <TabsTrigger value="dados" className="rounded-xl">
                Dados do Fornecedor
              </TabsTrigger>
              <TabsTrigger value="produtos" className="rounded-xl">
                Produtos
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dados">
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">Informações do Fornecedor</CardTitle>
                  <CardDescription>Mantenha os dados do seu negócio atualizados</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="razaoSocial">Razão Social</Label>
                      <Input
                        id="razaoSocial"
                        value={fornecedorData.razaoSocial}
                        onChange={(e) => setFornecedorData({ ...fornecedorData, razaoSocial: e.target.value })}
                        disabled={!isEditing}
                        className="h-12 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nomeFantasia">Nome Fantasia</Label>
                      <Input
                        id="nomeFantasia"
                        value={fornecedorData.nomeFantasia}
                        onChange={(e) => setFornecedorData({ ...fornecedorData, nomeFantasia: e.target.value })}
                        disabled={!isEditing}
                        className="h-12 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cnpj">CNPJ</Label>
                      <Input
                        id="cnpj"
                        value={fornecedorData.cnpj}
                        onChange={(e) => setFornecedorData({ ...fornecedorData, cnpj: e.target.value })}
                        disabled={!isEditing}
                        className="h-12 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        id="email"
                        type="email"
                        value={fornecedorData.email}
                        onChange={(e) => setFornecedorData({ ...fornecedorData, email: e.target.value })}
                        disabled={!isEditing}
                        className="h-12 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input
                        id="telefone"
                        value={fornecedorData.telefone}
                        onChange={(e) => setFornecedorData({ ...fornecedorData, telefone: e.target.value })}
                        disabled={!isEditing}
                        className="h-12 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="categoria">Categoria</Label>
                      <Input
                        id="categoria"
                        value={fornecedorData.categoria}
                        onChange={(e) => setFornecedorData({ ...fornecedorData, categoria: e.target.value })}
                        disabled={!isEditing}
                        className="h-12 rounded-xl"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="produtos">
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">Catálogo de Produtos</CardTitle>
                  <CardDescription>Produtos disponíveis em seu catálogo</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {produtos.map((produto) => (
                      <div key={produto.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div>
                          <p className="font-medium text-gray-900">{produto.nome}</p>
                          <p className="text-sm text-gray-600">{produto.categoria}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">R$ {produto.preco.toFixed(2)}</p>
                          <p className="text-sm text-gray-600">Estoque: {produto.estoque}</p>
                          <Badge
                            className={`${
                              produto.status === "Disponível"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            } border-0`}
                          >
                            {produto.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <FloatingButtons />
      <div className="pb-20"></div>
    </div>
  )
}
