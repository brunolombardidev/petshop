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
import { ArrowLeft, Syringe } from "lucide-react"
import { FloatingButtons } from "@/components/floating-buttons"
import { useVaccinations } from "@/hooks/use-vaccinations"
import { usePet } from "@/hooks/use-pets"

interface VaccinationFormData {
  petId: string
  nome: string
  data: string
  veterinario: string
  clinica: string
  lote: string
  proximaDose: string
  status: string
  observacoes: string
}

export default function NovaVacinaPage() {
  const router = useRouter()
  const params = useParams()
  const petId = params.id as string

  const { pet } = usePet(petId)
  const { createVaccination } = useVaccinations(petId)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<VaccinationFormData>({
    petId,
    nome: "",
    data: "",
    veterinario: "",
    clinica: "",
    lote: "",
    proximaDose: "",
    status: "em_dia",
    observacoes: "",
  })

  const handleInputChange = (field: keyof VaccinationFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.nome || !formData.data || !formData.veterinario || !formData.clinica || !formData.proximaDose) {
      return
    }

    setIsSubmitting(true)
    try {
      await createVaccination(formData)
      router.push(`/pet/${petId}/vacinas`)
    } catch (error) {
      console.error("Erro ao criar vacina:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = formData.nome && formData.data && formData.veterinario && formData.clinica && formData.proximaDose

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D6DD83]/20 via-[#FFBDB6]/20 to-[#30B2B0]/20">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-orange-100 sticky top-0 z-50">
        <div className="flex items-center gap-4 px-6 py-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="hover:bg-orange-100 rounded-xl">
            <ArrowLeft className="h-5 w-5 text-gray-700" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-bpet-primary to-bpet-secondary rounded-xl flex items-center justify-center shadow-lg">
              <Syringe className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-xl text-gray-900">Nova Vacina</h1>
              <p className="text-sm text-gray-600">Registrar vacina para {pet?.name || "Pet"}</p>
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
                  <Syringe className="w-5 h-5 text-green-500" />
                  Informações da Vacina
                </CardTitle>
                <CardDescription>Preencha os dados da vacinação</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Informações da Vacina */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome da Vacina *</Label>
                    <Select value={formData.nome} onValueChange={(value) => handleInputChange("nome", value)}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Selecione a vacina" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="V8 (Óctupla)">V8 (Óctupla)</SelectItem>
                        <SelectItem value="V10 (Déctupla)">V10 (Déctupla)</SelectItem>
                        <SelectItem value="V12 (Duodécupla)">V12 (Duodécupla)</SelectItem>
                        <SelectItem value="Antirrábica">Antirrábica</SelectItem>
                        <SelectItem value="Tríplice Felina">Tríplice Felina</SelectItem>
                        <SelectItem value="Quádrupla Felina">Quádrupla Felina</SelectItem>
                        <SelectItem value="Quíntupla Felina">Quíntupla Felina</SelectItem>
                        <SelectItem value="Leucemia Felina">Leucemia Felina</SelectItem>
                        <SelectItem value="Giardíase">Giardíase</SelectItem>
                        <SelectItem value="Leishmaniose">Leishmaniose</SelectItem>
                        <SelectItem value="Gripe Canina">Gripe Canina</SelectItem>
                        <SelectItem value="Outra">Outra</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="data">Data da Aplicação *</Label>
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

                  <div className="space-y-2">
                    <Label htmlFor="lote">Lote da Vacina</Label>
                    <Input
                      id="lote"
                      value={formData.lote}
                      onChange={(e) => handleInputChange("lote", e.target.value)}
                      placeholder="Ex: VAC2024001"
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="proximaDose">Próxima Dose *</Label>
                    <Input
                      id="proximaDose"
                      type="date"
                      value={formData.proximaDose}
                      onChange={(e) => handleInputChange("proximaDose", e.target.value)}
                      className="h-12"
                      required
                    />
                  </div>
                </div>

                {/* Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="em_dia">Em dia</SelectItem>
                        <SelectItem value="proxima">Próxima</SelectItem>
                        <SelectItem value="vencida">Vencida</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Observações */}
                <div className="space-y-2">
                  <Label htmlFor="observacoes">Observações</Label>
                  <Textarea
                    id="observacoes"
                    value={formData.observacoes}
                    onChange={(e) => handleInputChange("observacoes", e.target.value)}
                    placeholder="Observações sobre a vacinação, reações, etc."
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
                    <Syringe className="w-5 h-5 mr-2" />
                    Registrar Vacina
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
