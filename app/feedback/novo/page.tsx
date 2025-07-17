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
import { ArrowLeft, MessageSquare, Save, Star } from "lucide-react"
import { FloatingButtons } from "@/components/floating-buttons"

export default function NovoFeedbackPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    titulo: "",
    empresa: "",
    categoria: "",
    avaliacao: 0,
    mensagem: "",
    recomenda: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simular criação do feedback
    console.log("Feedback criado:", formData)
    alert("Feedback enviado com sucesso!")
    router.push("/feedback")
  }

  const renderStarSelector = () => {
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setFormData({ ...formData, avaliacao: i + 1 })}
            className="focus:outline-none"
          >
            <Star
              className={`w-8 h-8 transition-colors ${
                i < formData.avaliacao ? "text-yellow-400 fill-current" : "text-gray-300 hover:text-yellow-300"
              }`}
            />
          </button>
        ))}
        <span className="ml-2 text-sm text-gray-600">
          {formData.avaliacao > 0 ? `${formData.avaliacao}/5` : "Selecione uma nota"}
        </span>
      </div>
    )
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
              <div className="w-10 h-10 bg-gradient-to-br from-bpet-secondary to-bpet-primary rounded-xl flex items-center justify-center shadow-lg">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-900">Novo Feedback</h1>
                <p className="text-sm text-gray-600">Compartilhe sua experiência</p>
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
                <MessageSquare className="w-5 h-5 text-blue-500" />
                Sua Avaliação
              </CardTitle>
              <CardDescription className="text-gray-600">
                Conte-nos sobre sua experiência com produtos ou serviços
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="titulo" className="text-gray-700 font-medium">
                      Título do Feedback *
                    </Label>
                    <Input
                      id="titulo"
                      required
                      value={formData.titulo}
                      onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                      className="h-12 border-gray-200 focus:border-[#30B2B0] focus:ring-[#30B2B0]/20 rounded-xl"
                      placeholder="Ex: Excelente atendimento na clínica"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="empresa" className="text-gray-700 font-medium">
                      Empresa/Estabelecimento *
                    </Label>
                    <Input
                      id="empresa"
                      required
                      value={formData.empresa}
                      onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                      className="h-12 border-gray-200 focus:border-[#30B2B0] focus:ring-[#30B2B0]/20 rounded-xl"
                      placeholder="Nome da empresa"
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
                        <SelectItem value="atendimento">Atendimento</SelectItem>
                        <SelectItem value="produto">Produto</SelectItem>
                        <SelectItem value="servico">Serviço</SelectItem>
                        <SelectItem value="entrega">Entrega</SelectItem>
                        <SelectItem value="preco">Preço</SelectItem>
                        <SelectItem value="qualidade">Qualidade</SelectItem>
                        <SelectItem value="instalacoes">Instalações</SelectItem>
                        <SelectItem value="geral">Geral</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">Avaliação Geral *</Label>
                  {renderStarSelector()}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mensagem" className="text-gray-700 font-medium">
                    Sua Experiência *
                  </Label>
                  <Textarea
                    id="mensagem"
                    required
                    value={formData.mensagem}
                    onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                    className="min-h-[150px] border-gray-200 focus:border-[#30B2B0] focus:ring-[#30B2B0]/20 rounded-xl resize-none"
                    placeholder="Descreva detalhadamente sua experiência..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recomenda" className="text-gray-700 font-medium">
                    Você recomendaria?
                  </Label>
                  <Select
                    value={formData.recomenda}
                    onValueChange={(value) => setFormData({ ...formData, recomenda: value })}
                  >
                    <SelectTrigger className="h-12 border-gray-200 focus:border-[#30B2B0] focus:ring-[#30B2B0]/20 rounded-xl">
                      <SelectValue placeholder="Selecione uma opção" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sim">Sim, recomendaria</SelectItem>
                      <SelectItem value="talvez">Talvez recomendaria</SelectItem>
                      <SelectItem value="nao">Não recomendaria</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="p-4 bg-[#30B2B0]/20 rounded-xl">
                  <h3 className="font-medium text-[#145D5F] mb-2">Política de Feedbacks</h3>
                  <p className="text-sm text-[#145D5F]/80">
                    Seu feedback será analisado antes da publicação. Mantenha um tom respeitoso e forneça informações
                    úteis para outros usuários.
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
                    className="flex-1 h-12 bg-gradient-to-r from-bpet-secondary to-bpet-primary hover:from-bpet-primary hover:to-bpet-secondary text-white rounded-xl"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Enviar Feedback
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
