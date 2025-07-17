"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Package, Upload, Save } from "lucide-react"
import { FloatingButtons } from "@/components/floating-buttons"

export default function NovoProdutoPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    nome: "",
    categoria: "",
    preco: "",
    desconto: "",
    descricao: "",
    status: "ativo",
    codigo: "",
    estoque: "",
    peso: "",
    dimensoes: "",
    marca: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você implementaria a lógica para salvar o produto
    console.log("Dados do produto:", formData)
    // Redirecionar de volta para a lista de produtos
    router.push("/gestao-produtos")
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
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                <Package className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-900">Novo Produto</h1>
                <p className="text-sm text-gray-600">Adicione um novo produto ao catálogo</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Informações Básicas */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Package className="w-5 h-5 text-purple-500" />
                  Informações Básicas
                </CardTitle>
                <CardDescription className="text-gray-600">Dados principais do produto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="nome" className="text-sm font-medium text-gray-700">
                      Nome do Produto *
                    </Label>
                    <Input
                      id="nome"
                      type="text"
                      value={formData.nome}
                      onChange={(e) => handleInputChange("nome", e.target.value)}
                      placeholder="Ex: Ração Premium Golden 15kg"
                      className="h-12 border-0 bg-gray-50 rounded-xl focus:ring-2 focus:ring-purple-400/20"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="codigo" className="text-sm font-medium text-gray-700">
                      Código do Produto *
                    </Label>
                    <Input
                      id="codigo"
                      type="text"
                      value={formData.codigo}
                      onChange={(e) => handleInputChange("codigo", e.target.value)}
                      placeholder="Ex: RAC001"
                      className="h-12 border-0 bg-gray-50 rounded-xl focus:ring-2 focus:ring-purple-400/20"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="categoria" className="text-sm font-medium text-gray-700">
                      Categoria *
                    </Label>
                    <Select value={formData.categoria} onValueChange={(value) => handleInputChange("categoria", value)}>
                      <SelectTrigger className="h-12 border-0 bg-gray-50 rounded-xl focus:ring-2 focus:ring-purple-400/20">
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="alimentacao">Alimentação</SelectItem>
                        <SelectItem value="brinquedos">Brinquedos</SelectItem>
                        <SelectItem value="higiene">Higiene</SelectItem>
                        <SelectItem value="medicamentos">Medicamentos</SelectItem>
                        <SelectItem value="acessorios">Acessórios</SelectItem>
                        <SelectItem value="camas">Camas e Casinhas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="marca" className="text-sm font-medium text-gray-700">
                      Marca
                    </Label>
                    <Input
                      id="marca"
                      type="text"
                      value={formData.marca}
                      onChange={(e) => handleInputChange("marca", e.target.value)}
                      placeholder="Ex: Golden"
                      className="h-12 border-0 bg-gray-50 rounded-xl focus:ring-2 focus:ring-purple-400/20"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descricao" className="text-sm font-medium text-gray-700">
                    Descrição *
                  </Label>
                  <Textarea
                    id="descricao"
                    value={formData.descricao}
                    onChange={(e) => handleInputChange("descricao", e.target.value)}
                    placeholder="Descreva as características e benefícios do produto..."
                    className="min-h-[100px] border-0 bg-gray-50 rounded-xl focus:ring-2 focus:ring-purple-400/20 resize-none"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Preço e Estoque */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">Preço e Estoque</CardTitle>
                <CardDescription className="text-gray-600">Informações comerciais do produto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="preco" className="text-sm font-medium text-gray-700">
                      Preço (R$) *
                    </Label>
                    <Input
                      id="preco"
                      type="number"
                      step="0.01"
                      value={formData.preco}
                      onChange={(e) => handleInputChange("preco", e.target.value)}
                      placeholder="0,00"
                      className="h-12 border-0 bg-gray-50 rounded-xl focus:ring-2 focus:ring-purple-400/20"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="desconto" className="text-sm font-medium text-gray-700">
                      Desconto (%)
                    </Label>
                    <Input
                      id="desconto"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.desconto}
                      onChange={(e) => handleInputChange("desconto", e.target.value)}
                      placeholder="0"
                      className="h-12 border-0 bg-gray-50 rounded-xl focus:ring-2 focus:ring-purple-400/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="estoque" className="text-sm font-medium text-gray-700">
                      Quantidade em Estoque *
                    </Label>
                    <Input
                      id="estoque"
                      type="number"
                      min="0"
                      value={formData.estoque}
                      onChange={(e) => handleInputChange("estoque", e.target.value)}
                      placeholder="0"
                      className="h-12 border-0 bg-gray-50 rounded-xl focus:ring-2 focus:ring-purple-400/20"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Especificações Técnicas */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">Especificações Técnicas</CardTitle>
                <CardDescription className="text-gray-600">Informações adicionais do produto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="peso" className="text-sm font-medium text-gray-700">
                      Peso (kg)
                    </Label>
                    <Input
                      id="peso"
                      type="number"
                      step="0.01"
                      value={formData.peso}
                      onChange={(e) => handleInputChange("peso", e.target.value)}
                      placeholder="0,00"
                      className="h-12 border-0 bg-gray-50 rounded-xl focus:ring-2 focus:ring-purple-400/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dimensoes" className="text-sm font-medium text-gray-700">
                      Dimensões (cm)
                    </Label>
                    <Input
                      id="dimensoes"
                      type="text"
                      value={formData.dimensoes}
                      onChange={(e) => handleInputChange("dimensoes", e.target.value)}
                      placeholder="Ex: 30x20x15"
                      className="h-12 border-0 bg-gray-50 rounded-xl focus:ring-2 focus:ring-purple-400/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status" className="text-sm font-medium text-gray-700">
                      Status *
                    </Label>
                    <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                      <SelectTrigger className="h-12 border-0 bg-gray-50 rounded-xl focus:ring-2 focus:ring-purple-400/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ativo">Ativo</SelectItem>
                        <SelectItem value="inativo">Inativo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Imagem do Produto */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">Imagem do Produto</CardTitle>
                <CardDescription className="text-gray-600">Adicione uma imagem para o produto</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-purple-400 transition-colors">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Clique para fazer upload ou arraste a imagem aqui</p>
                  <p className="text-sm text-gray-500">PNG, JPG ou JPEG até 5MB</p>
                  <Button type="button" variant="outline" className="mt-4 rounded-xl bg-transparent">
                    Selecionar Arquivo
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Botões de Ação */}
            <div className="flex justify-center gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="h-14 px-8 py-3 rounded-xl border-gray-300 hover:bg-gray-50"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="h-14 px-8 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Save className="w-5 h-5 mr-2" />
                Salvar Produto
              </Button>
            </div>
          </form>
        </div>
      </main>

      {/* Botões Flutuantes */}
      <FloatingButtons />
      {/* Espaçamento para botões flutuantes */}
      <div className="pb-20"></div>
    </div>
  )
}
