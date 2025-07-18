"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, FileText, Plus, X } from "lucide-react"
import { FloatingButtons } from "@/components/floating-buttons"
import { useMedicalHistory } from "@/hooks/use-medical-history"
import { usePet } from "@/hooks/use-pets"

interface HistoryFormData {
  petId: string
  data: string
  tipo: string
  veterinario: string
  clinica: string
  diagnostico: string
  tratamento: string
  medicamentos: string[]
  observacoes: string
  status: string
}

export default function NovoHistoricoPage() {
  const router = useRouter()
  const params = useParams()
  const petId = params.id as string

  const { pet } = usePet(petId)
  const { createHistory } = useMedicalHistory(petId)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newMedicamento, setNewMedicamento] = useState("")
  const [formData, setFormData] = useState<HistoryFormData>({
    petId,
    data: "",
    tipo: "",
    veterinario: "",
    clinica: "",
    diagnostico: "",
    tratamento: "",
    medicamentos: [],
    observacoes: "",
    status: "concluido",
  })

  const handleInputChange = (field: keyof HistoryFormData, value: string | string[]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const addMedicamento = () => {
    if (newMedicamento.trim()) {
      setFormData((prev) => ({
        ...prev,
        medicamentos: [...prev.medicamentos, newMedicamento.trim()],
      }))
      setNewMedicamento("")
    }
  }

  const removeMedicamento = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      medicamentos: prev.medicamentos.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !formData.data ||
      !formData.tipo ||
      !formData.veterinario ||
      !formData.clinica ||
      !formData.diagnostico ||
      !formData.tratamento
    ) {
      return
    }

    setIsSubmitting(true)
    try {
      await createHistory(formData)
      router.push(`/pet/${petId}/historico`)
    } catch (error) {
      console.error("Erro ao criar histórico:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid =
    formData.data &&
    formData.tipo &&
    formData.veterinario &&
    formData.clinica &&
    formData.diagnostico &&
    formData.tratamento

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D6DD83]/20 via-[#FFBDB6]/20 to-[#30B2B0]/20">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-orange-100 sticky top-0 z-50">
        <div className="flex items-center gap-4 px-6 py-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="hover:bg-orange-100 rounded-xl">
            <ArrowLeft className="h-5 w-5 text-gray-700" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-bpet-secondary to-bpet-primary rounded-xl flex items-center justify-center shadow-lg">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-xl text-gray-900">Novo Registro Médico</h1>
              <p className="text-sm text-gray-600">Adicionar ao histórico de {pet?.name || "Pet"}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit}>
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-500" />
                  Informações do Registro
                </CardTitle>
                <CardDescription>Preencha os dados do atendimento médico</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Informações Básicas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="data">Data do Atendimento *</Label>
                    <Input
                      id="data"
                      type="date"
                      value={formData.data}
                      onChange={(e) => handleInputChange("data", e.target.value)}
                      className="h-12"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tipo">Tipo de Atendimento *</Label>
                    <Select value={formData.tipo} onValueChange={(value) => handleInputChange("tipo", value)}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Consulta">Consulta</SelectItem>
                        <SelectItem value="Emergência">Emergência</SelectItem>
                        <SelectItem value="Cirurgia">Cirurgia</SelectItem>
                        <SelectItem value="Exame">Exame</SelectItem>
                        <SelectItem value="Tratamento">Tratamento</SelectItem>
                        <SelectItem value="Vacinação">Vacinação</SelectItem>
                        <SelectItem value="Check-up">Check-up</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="veterinario">Veterinário *</Label>
                    <Input
                      id="veterinario"
                      value={formData.veterinario}
                      onChange={(e) => handleInputChange("veterinario", e.target.value)}
                      placeholder="Ex: Dr. João Silva"
                      className="h-12"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="clinica">Clínica/Hospital *</Label>
                    <Input
                      id="clinica"
                      value={formData.clinica}
                      onChange={(e) => handleInputChange("clinica", e.target.value)}
                      placeholder="Ex: Clínica VetCare"
                      className="h-12"
                      required
                    />
                  </div>
                </div>

                {/* Diagnóstico e Tratamento */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="diagnostico">Diagnóstico *</Label>
                    <Textarea
                      id="diagnostico"
                      value={formData.diagnostico}
                      onChange={(e) => handleInputChange("diagnostico", e.target.value)}
                      placeholder="Descreva o diagnóstico ou motivo da consulta"
                      className="min-h-[100px]"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tratamento">Tratamento Realizado *</Label>
                    <Textarea
                      id="tratamento"
                      value={formData.tratamento}
                      onChange={(e) => handleInputChange("tratamento", e.target.value)}
                      placeholder="Descreva o tratamento, procedimentos ou orientações"
                      className="min-h-[100px]"
                      required
                    />
                  </div>
                </div>

                {/* Medicamentos */}
                <div className="space-y-4">
                  <Label>Medicamentos Prescritos</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newMedicamento}
                      onChange={(e) => setNewMedicamento(e.target.value)}
                      placeholder="Nome do medicamento"
                      className="h-10"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          addMedicamento()
                        }
                      }}
                    />
                    <Button type="button" onClick={addMedicamento} className="h-10 px-4 bg-blue-500 hover:bg-blue-600">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  {formData.medicamentos.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.medicamentos.map((med, index) => (
                        <Badge key={index} className="bg-blue-100 text-blue-800 border-0 pr-1">
                          {med}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-auto p-1 ml-1 hover:bg-blue-200"
                            onClick={() => removeMedicamento(index)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Status e Observações */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="concluido">Concluído</SelectItem>
                        <SelectItem value="em_andamento">Em andamento</SelectItem>
                        <SelectItem value="agendado">Agendado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="observacoes">Observações Adicionais</Label>
                  <Textarea
                    id="observacoes"
                    value={formData.observacoes}
                    onChange={(e) => handleInputChange("observacoes", e.target.value)}
                    placeholder="Observações importantes, recomendações, etc."
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Botões de Ação */}
            <div className="flex justify-between mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="h-12 px-6 border-2 border-gray-200 hover:bg-gray-50 rounded-xl bg-transparent"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Cancelar
              </Button>

              <Button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className="h-12 px-8 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <FileText className="w-5 h-5 mr-2" />
                    Salvar Registro
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>

      <FloatingButtons />
    </div>
  )
}
