"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, PawPrint, Save } from "lucide-react"
import { FloatingButtons } from "@/components/floating-buttons"
import { usePets } from "@/hooks/use-pets"
import { toast } from "@/hooks/use-toast"

export default function CadastrarPetPage() {
  const router = useRouter()
  const { createPet } = usePets()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    breed: "",
    age: "",
    weight: "",
    color: "",
    gender: "" as "male" | "female" | "",
    isNeutered: false,
    avatar: "",
    medicalInfo: {
      allergies: [] as string[],
      medications: [] as string[],
      conditions: [] as string[],
      veterinarian: "",
      lastCheckup: "",
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.species || !formData.gender) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      })
      return
    }

    try {
      setLoading(true)
      await createPet({
        name: formData.name,
        species: formData.species,
        breed: formData.breed || undefined,
        age: formData.age ? Number.parseInt(formData.age) : undefined,
        weight: formData.weight ? Number.parseFloat(formData.weight) : undefined,
        color: formData.color || undefined,
        gender: formData.gender,
        isNeutered: formData.isNeutered,
        avatar: formData.avatar || undefined,
        medicalInfo: {
          allergies: formData.medicalInfo.allergies.length > 0 ? formData.medicalInfo.allergies : undefined,
          medications: formData.medicalInfo.medications.length > 0 ? formData.medicalInfo.medications : undefined,
          conditions: formData.medicalInfo.conditions.length > 0 ? formData.medicalInfo.conditions : undefined,
          veterinarian: formData.medicalInfo.veterinarian || undefined,
          lastCheckup: formData.medicalInfo.lastCheckup || undefined,
        },
      })
      router.push("/meus-pets")
    } catch (error) {
      console.error("Erro ao cadastrar pet:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleArrayInput = (field: "allergies" | "medications" | "conditions", value: string) => {
    const items = value
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0)
    setFormData((prev) => ({
      ...prev,
      medicalInfo: {
        ...prev.medicalInfo,
        [field]: items,
      },
    }))
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
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
                <PawPrint className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-900">Cadastrar Pet</h1>
                <p className="text-sm text-gray-600">Adicione um novo companheiro</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Formulário */}
      <main className="px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informações Básicas */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900">Informações Básicas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="Nome do pet"
                      className="h-12 rounded-xl"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="species">Espécie *</Label>
                    <Select
                      value={formData.species}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, species: value }))}
                    >
                      <SelectTrigger className="h-12 rounded-xl">
                        <SelectValue placeholder="Selecione a espécie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cão">Cão</SelectItem>
                        <SelectItem value="gato">Gato</SelectItem>
                        <SelectItem value="pássaro">Pássaro</SelectItem>
                        <SelectItem value="peixe">Peixe</SelectItem>
                        <SelectItem value="hamster">Hamster</SelectItem>
                        <SelectItem value="coelho">Coelho</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="breed">Raça</Label>
                    <Input
                      id="breed"
                      value={formData.breed}
                      onChange={(e) => setFormData((prev) => ({ ...prev, breed: e.target.value }))}
                      placeholder="Raça do pet"
                      className="h-12 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">Sexo *</Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value: "male" | "female") => setFormData((prev) => ({ ...prev, gender: value }))}
                    >
                      <SelectTrigger className="h-12 rounded-xl">
                        <SelectValue placeholder="Selecione o sexo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Macho</SelectItem>
                        <SelectItem value="female">Fêmea</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Idade (anos)</Label>
                    <Input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData((prev) => ({ ...prev, age: e.target.value }))}
                      placeholder="Idade"
                      className="h-12 rounded-xl"
                      min="0"
                      max="30"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="weight">Peso (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      step="0.1"
                      value={formData.weight}
                      onChange={(e) => setFormData((prev) => ({ ...prev, weight: e.target.value }))}
                      placeholder="Peso"
                      className="h-12 rounded-xl"
                      min="0"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="color">Cor</Label>
                    <Input
                      id="color"
                      value={formData.color}
                      onChange={(e) => setFormData((prev) => ({ ...prev, color: e.target.value }))}
                      placeholder="Cor do pet"
                      className="h-12 rounded-xl"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="isNeutered"
                    checked={formData.isNeutered}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isNeutered: checked }))}
                  />
                  <Label htmlFor="isNeutered">Pet castrado</Label>
                </div>
              </CardContent>
            </Card>

            {/* Informações Médicas */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900">Informações Médicas (Opcional)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="veterinarian">Veterinário</Label>
                  <Input
                    id="veterinarian"
                    value={formData.medicalInfo.veterinarian}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        medicalInfo: { ...prev.medicalInfo, veterinarian: e.target.value },
                      }))
                    }
                    placeholder="Nome do veterinário"
                    className="h-12 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastCheckup">Último Check-up</Label>
                  <Input
                    id="lastCheckup"
                    type="date"
                    value={formData.medicalInfo.lastCheckup}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        medicalInfo: { ...prev.medicalInfo, lastCheckup: e.target.value },
                      }))
                    }
                    className="h-12 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="allergies">Alergias (separadas por vírgula)</Label>
                  <Textarea
                    id="allergies"
                    value={formData.medicalInfo.allergies.join(", ")}
                    onChange={(e) => handleArrayInput("allergies", e.target.value)}
                    placeholder="Ex: ração de frango, pólen, medicamento X"
                    className="rounded-xl"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="medications">Medicamentos (separados por vírgula)</Label>
                  <Textarea
                    id="medications"
                    value={formData.medicalInfo.medications.join(", ")}
                    onChange={(e) => handleArrayInput("medications", e.target.value)}
                    placeholder="Ex: antibiótico, vitamina, suplemento"
                    className="rounded-xl"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="conditions">Condições Médicas (separadas por vírgula)</Label>
                  <Textarea
                    id="conditions"
                    value={formData.medicalInfo.conditions.join(", ")}
                    onChange={(e) => handleArrayInput("conditions", e.target.value)}
                    placeholder="Ex: diabetes, artrite, problema cardíaco"
                    className="rounded-xl"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Botões */}
            <div className="flex gap-4">
              <Button type="button" variant="outline" onClick={() => router.back()} className="flex-1 h-12 rounded-xl">
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 h-12 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {loading ? (
                  "Salvando..."
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    Cadastrar Pet
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>

      {/* Botões Flutuantes */}
      <FloatingButtons />
    </div>
  )
}
