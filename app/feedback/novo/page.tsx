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
import { ArrowLeft, MessageSquare, Send, AlertTriangle, ThumbsUp, MessageCircle, CheckCircle, User } from "lucide-react"
import { FloatingButtons } from "@/components/floating-buttons"

export default function NovoFeedbackPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    tipo: "",
    assunto: "",
    descricao: "",
    prioridade: "",
    email: "",
    nome: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [ticketNumber, setTicketNumber] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simula o envio do feedback
    const ticket = `#${Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0")}`
    setTicketNumber(ticket)
    setIsSubmitted(true)

    // Reset form after 5 seconds
    setTimeout(() => {
      router.push("/feedback")
    }, 3000)
  }

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case "reclamacao":
        return "from-red-500 to-red-600"
      case "elogio":
        return "from-green-500 to-green-600"
      case "sugestao":
        return "from-blue-500 to-blue-600"
      default:
        return "from-purple-500 to-purple-600"
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-amber-50/30 to-yellow-50/50 flex items-center justify-center">
        <Card className="w-full max-w-md border-0 shadow-2xl bg-white/95 backdrop-blur-sm rounded-2xl">
          <CardContent className="text-center p-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Feedback Enviado!</h2>
            <p className="text-gray-600 mb-4">Seu feedback foi recebido com sucesso.</p>
            <div className="bg-green-50 p-4 rounded-xl mb-4">
              <p className="text-sm text-green-800">
                <strong>Número do Chamado:</strong> {ticketNumber}
                <br />
                <strong>Status:</strong> Em análise
                <br />
                <strong>Prazo de resposta:</strong> 24-48 horas
              </p>
            </div>
            <p className="text-sm text-gray-500">Redirecionando...</p>
          </CardContent>
        </Card>
      </div>
    )
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
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-900">Novo Feedback</h1>
                <p className="text-sm text-gray-600">Envie sua opinião, sugestão ou reclamação</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="px-6 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Tipos de Feedback */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-red-500 to-red-600 text-white rounded-2xl cursor-pointer hover:shadow-xl transition-all duration-200 group">
              <CardContent className="p-6 text-center">
                <AlertTriangle className="w-12 h-12 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-lg mb-2">Reclamação</h3>
                <p className="text-sm text-red-100">Relate problemas ou insatisfações</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl cursor-pointer hover:shadow-xl transition-all duration-200 group">
              <CardContent className="p-6 text-center">
                <ThumbsUp className="w-12 h-12 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-lg mb-2">Elogio</h3>
                <p className="text-sm text-green-100">Compartilhe experiências positivas</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl cursor-pointer hover:shadow-xl transition-all duration-200 group">
              <CardContent className="p-6 text-center">
                <MessageCircle className="w-12 h-12 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-lg mb-2">Sugestão</h3>
                <p className="text-sm text-blue-100">Proponha melhorias e ideias</p>
              </CardContent>
            </Card>
          </div>

          {/* Formulário */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-purple-500" />
                Enviar Feedback
              </CardTitle>
              <CardDescription className="text-gray-600">
                Preencha o formulário abaixo para enviar seu feedback
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="nome" className="text-gray-700 font-medium">
                      Nome Completo
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="nome"
                        required
                        value={formData.nome}
                        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                        className="pl-11 h-12 border-gray-200 focus:border-purple-400 focus:ring-purple-400/20 rounded-xl"
                        placeholder="Seu nome completo"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700 font-medium">
                      E-mail
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="h-12 border-gray-200 focus:border-purple-400 focus:ring-purple-400/20 rounded-xl"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="tipo" className="text-gray-700 font-medium">
                      Tipo de Feedback
                    </Label>
                    <Select
                      value={formData.tipo}
                      onValueChange={(value) => setFormData({ ...formData, tipo: value })}
                      required
                    >
                      <SelectTrigger className="h-12 border-gray-200 focus:border-purple-400 focus:ring-purple-400/20 rounded-xl">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="reclamacao">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-red-500" />
                            Reclamação
                          </div>
                        </SelectItem>
                        <SelectItem value="elogio">
                          <div className="flex items-center gap-2">
                            <ThumbsUp className="w-4 h-4 text-green-500" />
                            Elogio
                          </div>
                        </SelectItem>
                        <SelectItem value="sugestao">
                          <div className="flex items-center gap-2">
                            <MessageCircle className="w-4 h-4 text-blue-500" />
                            Sugestão
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="prioridade" className="text-gray-700 font-medium">
                      Prioridade
                    </Label>
                    <Select
                      value={formData.prioridade}
                      onValueChange={(value) => setFormData({ ...formData, prioridade: value })}
                      required
                    >
                      <SelectTrigger className="h-12 border-gray-200 focus:border-purple-400 focus:ring-purple-400/20 rounded-xl">
                        <SelectValue placeholder="Selecione a prioridade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="baixa">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            Baixa
                          </div>
                        </SelectItem>
                        <SelectItem value="media">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            Média
                          </div>
                        </SelectItem>
                        <SelectItem value="alta">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            Alta
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="assunto" className="text-gray-700 font-medium">
                    Assunto
                  </Label>
                  <Input
                    id="assunto"
                    required
                    value={formData.assunto}
                    onChange={(e) => setFormData({ ...formData, assunto: e.target.value })}
                    className="h-12 border-gray-200 focus:border-purple-400 focus:ring-purple-400/20 rounded-xl"
                    placeholder="Resumo do seu feedback"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descricao" className="text-gray-700 font-medium">
                    Descrição Detalhada
                  </Label>
                  <Textarea
                    id="descricao"
                    required
                    value={formData.descricao}
                    onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                    className="min-h-[120px] border-gray-200 focus:border-purple-400 focus:ring-purple-400/20 rounded-xl resize-none"
                    placeholder="Descreva detalhadamente seu feedback..."
                  />
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
                    className={`flex-1 h-12 bg-gradient-to-r ${formData.tipo ? getTipoColor(formData.tipo) : "from-purple-500 to-purple-600"} hover:shadow-lg text-white rounded-xl transition-all duration-200`}
                  >
                    <Send className="w-4 h-4 mr-2" />
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
    </div>
  )
}
