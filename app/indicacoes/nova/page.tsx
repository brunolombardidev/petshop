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
import { ArrowLeft, UserPlus, Save, Users, Store, Package, Building } from "lucide-react"
import { FloatingButtons } from "@/components/floating-buttons"
import { indicationService, type CreateIndicationRequest } from "@/services/indication.service"
import { toast } from "@/hooks/use-toast"

export default function NovaIndicacaoPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<CreateIndicationRequest>({
    nomeIndicado: "",
    emailIndicado: "",
    telefoneIndicado: "",
    tipoIndicacao: "cliente",
    observacoes: "",
    empresaRamo: "",
    empresaTamanho: "",
    petshopEspecialidade: "",
    fornecedorProdutos: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await indicationService.createIndication(formData)
      toast({
        title: "Sucesso!",
        description: "Indicação enviada com sucesso! Aguarde a análise.",
      })
      router.push("/indicacoes")
    } catch (error) {
      console.error("Erro ao criar indicação:", error)
      toast({
        title: "Erro",
        description: "Erro ao enviar indicação. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const getComissaoInfo = (tipo: string) => {
    switch (tipo) {
      case "cliente":
        return { valor: "R$ 50,00", descricao: "Por cliente aprovado que realizar primeira compra" }
      case "petshop":
        return { valor: "R$ 150,00", descricao: "Por petshop aprovado que se cadastrar na plataforma" }
      case "fornecedor":
        return { valor: "R$ 200,00", descricao: "Por fornecedor aprovado que realizar primeira venda" }
      case "empresa":
        return { valor: "R$ 300,00", descricao: "Por empresa aprovada que contratar benefícios" }
      default:
        return { valor: "-", descricao: "Selecione um tipo para ver a comissão" }
    }
  }

  const renderCamposEspecificos = () => {
    switch (formData.tipoIndicacao) {
      case "empresa":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="empresaRamo" className="text-gray-700 font-medium">
                Ramo de Atividade
              </Label>
              <Input
                id="empresaRamo"
                value={formData.empresaRamo || ""}
                onChange={(e) => setFormData({ ...formData, empresaRamo: e.target.value })}
                className="h-12 border-gray-200 focus:border-[#30B2B0] focus:ring-[#30B2B0]/20 rounded-xl"
                placeholder="Ex: Tecnologia, Saúde, Educação..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="empresaTamanho" className="text-gray-700 font-medium">
                Tamanho da Empresa
              </Label>
              <Select
                value={formData.empresaTamanho || ""}
                onValueChange={(value) => setFormData({ ...formData, empresaTamanho: value })}
              >
                <SelectTrigger className="h-12 border-gray-200 focus:border-[#30B2B0] focus:ring-[#30B2B0]/20 rounded-xl">
                  <SelectValue placeholder="Selecione o tamanho" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="micro">Micro (até 9 funcionários)</SelectItem>
                  <SelectItem value="pequena">Pequena (10-49 funcionários)</SelectItem>
                  <SelectItem value="media">Média (50-249 funcionários)</SelectItem>
                  <SelectItem value="grande">Grande (250+ funcionários)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )

      case "petshop":
        return (
          <div className="space-y-2">
            <Label htmlFor="petshopEspecialidade" className="text-gray-700 font-medium">
              Especialidades
            </Label>
            <Input
              id="petshopEspecialidade"
              value={formData.petshopEspecialidade || ""}
              onChange={(e) => setFormData({ ...formData, petshopEspecialidade: e.target.value })}
              className="h-12 border-gray-200 focus:border-[#30B2B0] focus:ring-[#30B2B0]/20 rounded-xl"
              placeholder="Ex: Veterinária, Banho e Tosa, Pet Shop..."
            />
          </div>
        )

      case "fornecedor":
        return (
          <div className="space-y-2">
            <Label htmlFor="fornecedorProdutos" className="text-gray-700 font-medium">
              Principais Produtos
            </Label>
            <Input
              id="fornecedorProdutos"
              value={formData.fornecedorProdutos || ""}
              onChange={(e) => setFormData({ ...formData, fornecedorProdutos: e.target.value })}
              className="h-12 border-gray-200 focus:border-[#30B2B0] focus:ring-[#30B2B0]/20 rounded-xl"
              placeholder="Ex: Ração, Medicamentos, Brinquedos..."
            />
          </div>
        )

      default:
        return null
    }
  }

  const getIconByType = (tipo: string) => {
    switch (tipo) {
      case "cliente":
        return <Users className="w-6 h-6" />
      case "petshop":
        return <Store className="w-6 h-6" />
      case "fornecedor":
        return <Package className="w-6 h-6" />
      case "empresa":
        return <Building className="w-6 h-6" />
      default:
        return <UserPlus className="w-6 h-6" />
    }
  }

  const comissaoInfo = getComissaoInfo(formData.tipoIndicacao)

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
              <div className="w-10 h-10 bg-gradient-to-br from-bpet-primary to-bpet-secondary rounded-xl flex items-center justify-center shadow-lg">
                <UserPlus className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-900">Nova Indicação</h1>
                <p className="text-sm text-gray-600">Indique e ganhe comissões</p>
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
                <UserPlus className="w-5 h-5 text-blue-500" />
                Informações da Indicação
              </CardTitle>
              <CardDescription className="text-gray-600">
                Preencha os dados da pessoa ou empresa que você deseja indicar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="nomeIndicado" className="text-gray-700 font-medium">
                      Nome do Indicado *
                    </Label>
                    <Input
                      id="nomeIndicado"
                      required
                      value={formData.nomeIndicado}
                      onChange={(e) => setFormData({ ...formData, nomeIndicado: e.target.value })}
                      className="h-12 border-gray-200 focus:border-[#30B2B0] focus:ring-[#30B2B0]/20 rounded-xl"
                      placeholder="Nome completo ou razão social"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emailIndicado" className="text-gray-700 font-medium">
                      E-mail *
                    </Label>
                    <Input
                      id="emailIndicado"
                      type="email"
                      required
                      value={formData.emailIndicado}
                      onChange={(e) => setFormData({ ...formData, emailIndicado: e.target.value })}
                      className="h-12 border-gray-200 focus:border-[#30B2B0] focus:ring-[#30B2B0]/20 rounded-xl"
                      placeholder="email@exemplo.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telefoneIndicado" className="text-gray-700 font-medium">
                      Telefone *
                    </Label>
                    <Input
                      id="telefoneIndicado"
                      required
                      value={formData.telefoneIndicado}
                      onChange={(e) => setFormData({ ...formData, telefoneIndicado: e.target.value })}
                      className="h-12 border-gray-200 focus:border-[#30B2B0] focus:ring-[#30B2B0]/20 rounded-xl"
                      placeholder="(11) 99999-9999"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="tipoIndicacao" className="text-gray-700 font-medium">
                      Tipo de Indicação *
                    </Label>
                    <Select
                      value={formData.tipoIndicacao}
                      onValueChange={(value: "cliente" | "petshop" | "fornecedor" | "empresa") =>
                        setFormData({ ...formData, tipoIndicacao: value })
                      }
                      required
                    >
                      <SelectTrigger className="h-12 border-gray-200 focus:border-[#30B2B0] focus:ring-[#30B2B0]/20 rounded-xl">
                        <SelectValue placeholder="Selecione o tipo de indicação" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cliente">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            Cliente
                          </div>
                        </SelectItem>
                        <SelectItem value="petshop">
                          <div className="flex items-center gap-2">
                            <Store className="w-4 h-4" />
                            PetShop
                          </div>
                        </SelectItem>
                        <SelectItem value="fornecedor">
                          <div className="flex items-center gap-2">
                            <Package className="w-4 h-4" />
                            Fornecedor
                          </div>
                        </SelectItem>
                        <SelectItem value="empresa">
                          <div className="flex items-center gap-2">
                            <Building className="w-4 h-4" />
                            Empresa
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Campos específicos por tipo */}
                  {renderCamposEspecificos()}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="observacoes" className="text-gray-700 font-medium">
                    Observações
                  </Label>
                  <Textarea
                    id="observacoes"
                    value={formData.observacoes || ""}
                    onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                    className="min-h-[100px] border-gray-200 focus:border-[#30B2B0] focus:ring-[#30B2B0]/20 rounded-xl resize-none"
                    placeholder="Informações adicionais sobre o indicado..."
                  />
                </div>

                {/* Informações de Comissão */}
                {formData.tipoIndicacao && (
                  <div className="p-4 bg-gradient-to-r from-[#30B2B0]/10 to-[#145D5F]/10 rounded-xl border-l-4 border-[#30B2B0]">
                    <div className="flex items-center gap-3 mb-2">
                      {getIconByType(formData.tipoIndicacao)}
                      <h3 className="font-medium text-[#145D5F]">Comissão por esta indicação</h3>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-[#145D5F]/80">{comissaoInfo.descricao}</p>
                      <div className="bg-[#30B2B0] text-white px-3 py-1 rounded-lg font-bold">{comissaoInfo.valor}</div>
                    </div>
                  </div>
                )}

                <div className="p-4 bg-[#FFBDB6]/20 rounded-xl">
                  <h3 className="font-medium text-[#145D5F] mb-2">Como funciona o programa de indicações?</h3>
                  <ul className="text-sm text-[#145D5F]/80 space-y-1">
                    <li>• Sua indicação será analisada em até 48 horas</li>
                    <li>• Entraremos em contato com o indicado para apresentar nossos serviços</li>
                    <li>• A comissão será paga após a primeira transação do indicado</li>
                    <li>• Você receberá atualizações sobre o status da sua indicação</li>
                  </ul>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    onClick={() => router.back()}
                    variant="outline"
                    className="flex-1 h-12 rounded-xl"
                    disabled={loading}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 h-12 bg-gradient-to-r from-bpet-primary to-bpet-secondary hover:from-bpet-secondary hover:to-bpet-primary text-white rounded-xl"
                    disabled={loading}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {loading ? "Enviando..." : "Enviar Indicação"}
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
