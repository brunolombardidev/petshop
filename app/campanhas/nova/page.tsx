"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Heart, Save, Camera } from "lucide-react"
import { FloatingButtons } from "@/components/floating-buttons"

export default function NovaCampanhaPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    categoria: "",
    meta: "",
    dataInicio: "",
    dataFim: "",
    observacoes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simular criação da campanha
    console.log("Campanha criada:", formData)
    alert("Campanha criada com sucesso!")
    router.push("/campanhas")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D6DD83]/20 via-[#FFBDB6]/20 to-[#30B2B0]/20">
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
              <div className="w-10 h-10 bg-gradient-to-br from-bpet-primary to-[#FFBDB6] rounded-xl flex items-center justify-center shadow-lg">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-900">Nova Campanha</h1>
                <p className="text-sm text-gray-600">Crie uma campanha de doação</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                Informações da Campanha
              </CardTitle>
              <CardDescription className="text-gray-600">Preencha os dados da sua campanha de doação</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Imagem da Campanha */}
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="w-full h-48 bg-gradient-to-br from-bpet-primary to-[#FFBDB6] rounded-2xl flex items-center justify-center shadow-lg">
                      <Heart className="w-16 h-16 text-white" />
                    </div>
                    <Button
                      type="button"
                      size="icon"
                      className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-gray-700 shadow-lg"
                    >
                      <Camera className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="titulo" className="text-gray-700 font-medium">
                      Título da Campanha *
                    </Label>
                    <Input
                      id="titulo"
                      required
                      value={formData.titulo}
                      onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                      className="h-12 border-gray-200 focus:border-[#30B2B0] focus:ring-[#30B2B0]/20 rounded-xl"
                      placeholder="Ex: Resgate de Animais Abandonados"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="categoria" className="text-gray-700 font-medium">
                      Categoria *
                    </Label>
                    <Select
                      value={formData.categoria}
                      onValueChange={(value) => setFormData({ ...formData, categoria: value })}
                      required
                    >
                      <SelectTrigger className="h-12 border-gray-200 focus:border-[#30B2B0] focus:ring-[#30B2B0]/20 rounded-xl">
                        <SelectValue placeholder="Selecione a categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="resgate">Resgate</SelectItem>
                        <SelectItem value="saude">Saúde</SelectItem>
                        <SelectItem value="alimentacao">Alimentação</SelectItem>
                        <SelectItem value="abrigo">Abrigo</SelectItem>
                        <SelectItem value="castracao">Castração</SelectItem>
                        <SelectItem value="adocao">Adoção</SelectItem>
                        <SelectItem value="emergencia">Emergência</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="meta" className="text-gray-700 font-medium">
                      Meta de Arrecadação (R$) *
                    </Label>
                    <Input
                      id="meta"
                      type="number"
                      required
                      value={formData.meta}
                      onChange={(e) => setFormData({ ...formData, meta: e.target.value })}
                      className="h-12 border-gray-200 focus:border-[#30B2B0] focus:ring-[#30B2B0]/20 rounded-xl"
                      placeholder="5000"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dataInicio" className="text-gray-700 font-medium">
                      Data de Início *
                    </Label>
                    <Input
                      id="dataInicio"
                      type="date"
                      required
                      value={formData.dataInicio}
                      onChange={(e) => setFormData({ ...formData, dataInicio: e.target.value })}
                      className="h-12 border-gray-200 focus:border-[#30B2B0] focus:ring-[#30B2B0]/20 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dataFim" className="text-gray-700 font-medium">
                      Data de Término *
                    </Label>
                    <Input
                      id="dataFim"
                      type="date"
                      required
                      value={formData.dataFim}
                      onChange={(e) => setFormData({ ...formData, dataFim: e.target.value })}
                      className="h-12 border-gray-200 focus:border-[#30B2B0] focus:ring-[#30B2B0]/20 rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descricao" className="text-gray-700 font-medium">
                    Descrição da Campanha *
                  </Label>
                  <Textarea
                    id="descricao"
                    required
                    value={formData.descricao}
                    onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                    className="min-h-[120px] border-gray-200 focus:border-[#30B2B0] focus:ring-[#30B2B0]/20 rounded-xl resize-none"
                    placeholder="Descreva os objetivos e necessidades da campanha..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="observacoes" className="text-gray-700 font-medium">
                    Observações Adicionais
                  </Label>
                  <Textarea
                    id="observacoes"
                    value={formData.observacoes}
                    onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                    className="min-h-[100px] border-gray-200 focus:border-[#30B2B0] focus:ring-[#30B2B0]/20 rounded-xl resize-none"
                    placeholder="Informações complementares, formas de contato, etc..."
                  />
                </div>

                <div className="p-4 bg-[#FFBDB6]/20 rounded-xl">
                  <h3 className="font-medium text-[#145D5F] mb-2">Política de Campanhas</h3>
                  <p className="text-sm text-[#145D5F]/80">
                    Todas as campanhas são revisadas antes de serem publicadas. Certifique-se de fornecer informações
                    precisas e comprovação das necessidades quando solicitado.
                  </p>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    onClick={() => router.back()}
                    variant="outline"
                    className="flex-1 h-12 rounded-xl"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 h-12 bg-gradient-to-r from-bpet-primary to-[#FFBDB6] hover:from-[#FFBDB6] hover:to-bpet-primary text-white rounded-xl"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Criar Campanha
                  </Button>
                </div>
              </form>
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
