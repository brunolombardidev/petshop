"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Package, Upload, Loader2 } from "lucide-react"
import { FloatingButtons } from "@/components/floating-buttons"
import { useProducts } from "@/hooks/use-products"
import type { CreateProductData } from "@/services/product.service"

export default function NovoProductPage() {
  const router = useRouter()
  const { createProduct, loading } = useProducts()

  const [formData, setFormData] = useState<CreateProductData>({
    nome: "",
    descricao: "",
    preco: 0,
    categoria: "",
    imagem: "",
  })

  const [errors, setErrors] = useState<Partial<CreateProductData>>({})

  const categorias = [
    "Ração",
    "Medicamentos",
    "Brinquedos",
    "Acessórios",
    "Higiene",
    "Camas e Casinhas",
    "Coleiras e Guias",
    "Transporte",
    "Aquarismo",
    "Outros",
  ]

  const validateForm = (): boolean => {
    const newErrors: Partial<CreateProductData> = {}

    if (!formData.nome.trim()) {
      newErrors.nome = "Nome é obrigatório"
    }

    if (!formData.descricao.trim()) {
      newErrors.descricao = "Descrição é obrigatória"
    }

    if (formData.preco <= 0) {
      newErrors.preco = "Preço deve ser maior que zero"
    }

    if (!formData.categoria) {
      newErrors.categoria = "Categoria é obrigatória"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      await createProduct(formData)
      router.push("/gestao-produtos")
    } catch (error) {
      // Error is handled by the hook
      console.error("Erro ao criar produto:", error)
    }
  }

  const handleInputChange = (field: keyof CreateProductData, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }))
    }
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
                <h1 className="font-bold text-xl text-gray-900">Novo Produto</h1>
                <p className="text-sm text-gray-600">Cadastre um novo produto ou serviço</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Formulário */}
      <main className="px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl font-bold text-gray-900">Informações do Produto</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nome do Produto */}
                <div className="space-y-2">
                  <Label htmlFor="nome" className="text-sm font-medium text-gray-700">
                    Nome do Produto *
                  </Label>
                  <Input
                    id="nome"
                    type="text"
                    value={formData.nome}
                    onChange={(e) => handleInputChange("nome", e.target.value)}
                    placeholder="Ex: Ração Premium para Cães Adultos"
                    className={`h-12 rounded-xl border-0 bg-gray-50 focus:ring-[#30B2B0]/20 focus:border-[#30B2B0] ${
                      errors.nome ? "ring-2 ring-red-500" : ""
                    }`}
                  />
                  {errors.nome && <p className="text-sm text-red-600">{errors.nome}</p>}
                </div>

                {/* Descrição */}
                <div className="space-y-2">
                  <Label htmlFor="descricao" className="text-sm font-medium text-gray-700">
                    Descrição *
                  </Label>
                  <Textarea
                    id="descricao"
                    value={formData.descricao}
                    onChange={(e) => handleInputChange("descricao", e.target.value)}
                    placeholder="Descreva as características e benefícios do produto..."
                    rows={4}
                    className={`rounded-xl border-0 bg-gray-50 focus:ring-[#30B2B0]/20 focus:border-[#30B2B0] resize-none ${
                      errors.descricao ? "ring-2 ring-red-500" : ""
                    }`}
                  />
                  {errors.descricao && <p className="text-sm text-red-600">{errors.descricao}</p>}
                </div>

                {/* Preço e Categoria */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="preco" className="text-sm font-medium text-gray-700">
                      Preço (R$) *
                    </Label>
                    <Input
                      id="preco"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.preco || ""}
                      onChange={(e) => handleInputChange("preco", Number.parseFloat(e.target.value) || 0)}
                      placeholder="0,00"
                      className={`h-12 rounded-xl border-0 bg-gray-50 focus:ring-[#30B2B0]/20 focus:border-[#30B2B0] ${
                        errors.preco ? "ring-2 ring-red-500" : ""
                      }`}
                    />
                    {errors.preco && <p className="text-sm text-red-600">{errors.preco}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="categoria" className="text-sm font-medium text-gray-700">
                      Categoria *
                    </Label>
                    <Select value={formData.categoria} onValueChange={(value) => handleInputChange("categoria", value)}>
                      <SelectTrigger
                        className={`h-12 rounded-xl border-0 bg-gray-50 focus:ring-[#30B2B0]/20 focus:border-[#30B2B0] ${
                          errors.categoria ? "ring-2 ring-red-500" : ""
                        }`}
                      >
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categorias.map((categoria) => (
                          <SelectItem key={categoria} value={categoria}>
                            {categoria}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.categoria && <p className="text-sm text-red-600">{errors.categoria}</p>}
                  </div>
                </div>

                {/* Upload de Imagem */}
                <div className="space-y-2">
                  <Label htmlFor="imagem" className="text-sm font-medium text-gray-700">
                    URL da Imagem (opcional)
                  </Label>
                  <div className="relative">
                    <Input
                      id="imagem"
                      type="url"
                      value={formData.imagem || ""}
                      onChange={(e) => handleInputChange("imagem", e.target.value)}
                      placeholder="https://exemplo.com/imagem.jpg"
                      className="h-12 rounded-xl border-0 bg-gray-50 focus:ring-[#30B2B0]/20 focus:border-[#30B2B0] pl-12"
                    />
                    <Upload className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  </div>
                  <p className="text-xs text-gray-500">
                    Cole a URL de uma imagem do produto ou deixe em branco para usar uma imagem padrão
                  </p>
                </div>

                {/* Preview da Imagem */}
                {formData.imagem && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Preview da Imagem</Label>
                    <div className="w-32 h-32 rounded-xl overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300">
                      <img
                        src={formData.imagem || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = "/placeholder.svg?height=128&width=128"
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Botões */}
                <div className="flex gap-4 pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    className="flex-1 h-12 rounded-xl border-gray-300 hover:bg-gray-50"
                    disabled={loading}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 h-12 rounded-xl bg-gradient-to-r from-bpet-primary to-bpet-secondary hover:from-bpet-primary/90 hover:to-bpet-secondary/90 text-white font-medium"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Salvando...
                      </>
                    ) : (
                      "Salvar Produto"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Botões Flutuantes */}
      <FloatingButtons />
    </div>
  )
}
