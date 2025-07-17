"use client"

import React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Upload, Heart, Shield, Stethoscope, FileText, Camera, Check } from "lucide-react"
import { UnifiedHeader } from "@/components/unified-header"
import { FloatingButtons } from "@/components/floating-buttons"
import Image from "next/image"

interface PetFormData {
  // Informações Básicas
  nome: string
  especie: string
  raca: string
  sexo: string
  dataNascimento: string
  peso: string
  cor: string
  porte: string
  foto?: File

  // Identificação
  microchip: string
  numeroRegistro: string
  pedigree: boolean
  castrado: boolean
  tatuagem: string

  // Dados Veterinários
  veterinario: string
  clinica: string
  telefoneVeterinario: string
  emailVeterinario: string
  ultimaConsulta: string
  proximaConsulta: string

  // Observações
  observacoes: string
  alergias: string
  medicamentos: string
  comportamento: string
  cuidadosEspeciais: string
}

export default function CadastrarPetPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<PetFormData>({
    nome: "",
    especie: "",
    raca: "",
    sexo: "",
    dataNascimento: "",
    peso: "",
    cor: "",
    porte: "",
    microchip: "",
    numeroRegistro: "",
    pedigree: false,
    castrado: false,
    tatuagem: "",
    veterinario: "",
    clinica: "",
    telefoneVeterinario: "",
    emailVeterinario: "",
    ultimaConsulta: "",
    proximaConsulta: "",
    observacoes: "",
    alergias: "",
    medicamentos: "",
    comportamento: "",
    cuidadosEspeciais: "",
  })
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const [user] = useState({
    name: "Maria Silva",
    email: "maria@email.com",
    avatar: "/placeholder-user.jpg",
    userType: "cliente" as const,
  })

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const stepTitles = ["Informações Básicas", "Identificação", "Dados Veterinários", "Observações Finais"]

  const stepIcons = [Heart, Shield, Stethoscope, FileText]

  const handleInputChange = (field: keyof PetFormData, value: string | boolean | File) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleInputChange("foto", file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.nome && formData.especie && formData.raca && formData.sexo && formData.dataNascimento)
      case 2:
        return true // Campos opcionais
      case 3:
        return !!(formData.veterinario && formData.clinica)
      case 4:
        return true // Campos opcionais
      default:
        return false
    }
  }

  const handleNext = () => {
    if (validateStep(currentStep) && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    if (validateStep(currentStep)) {
      // Aqui você implementaria a lógica de envio
      console.log("Dados do pet:", formData)

      // Simular envio
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirecionar para a página do pet
      router.push("/meus-pets")
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            {/* Upload de Foto */}
            <div className="text-center">
              <div className="relative inline-block">
                <div className="w-32 h-32 rounded-full border-4 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 overflow-hidden">
                  {previewImage ? (
                    <Image
                      src={previewImage || "/placeholder.svg"}
                      alt="Preview"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Camera className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Button size="sm" className="absolute bottom-0 right-0 rounded-full bg-blue-500 hover:bg-blue-600">
                  <Upload className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-sm text-gray-600 mt-2">Clique para adicionar uma foto</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome do Pet *</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => handleInputChange("nome", e.target.value)}
                  placeholder="Ex: Buddy"
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="especie">Espécie *</Label>
                <Select value={formData.especie} onValueChange={(value) => handleInputChange("especie", value)}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Selecione a espécie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cao">Cão</SelectItem>
                    <SelectItem value="gato">Gato</SelectItem>
                    <SelectItem value="passaro">Pássaro</SelectItem>
                    <SelectItem value="peixe">Peixe</SelectItem>
                    <SelectItem value="roedor">Roedor</SelectItem>
                    <SelectItem value="reptil">Réptil</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="raca">Raça *</Label>
                <Input
                  id="raca"
                  value={formData.raca}
                  onChange={(e) => handleInputChange("raca", e.target.value)}
                  placeholder="Ex: Golden Retriever"
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sexo">Sexo *</Label>
                <Select value={formData.sexo} onValueChange={(value) => handleInputChange("sexo", value)}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Selecione o sexo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="macho">Macho</SelectItem>
                    <SelectItem value="femea">Fêmea</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dataNascimento">Data de Nascimento *</Label>
                <Input
                  id="dataNascimento"
                  type="date"
                  value={formData.dataNascimento}
                  onChange={(e) => handleInputChange("dataNascimento", e.target.value)}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="peso">Peso (kg)</Label>
                <Input
                  id="peso"
                  type="number"
                  step="0.1"
                  value={formData.peso}
                  onChange={(e) => handleInputChange("peso", e.target.value)}
                  placeholder="Ex: 25.5"
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cor">Cor</Label>
                <Input
                  id="cor"
                  value={formData.cor}
                  onChange={(e) => handleInputChange("cor", e.target.value)}
                  placeholder="Ex: Dourado"
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="porte">Porte</Label>
                <Select value={formData.porte} onValueChange={(value) => handleInputChange("porte", value)}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Selecione o porte" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mini">Mini</SelectItem>
                    <SelectItem value="pequeno">Pequeno</SelectItem>
                    <SelectItem value="medio">Médio</SelectItem>
                    <SelectItem value="grande">Grande</SelectItem>
                    <SelectItem value="gigante">Gigante</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="microchip">Número do Microchip</Label>
                <Input
                  id="microchip"
                  value={formData.microchip}
                  onChange={(e) => handleInputChange("microchip", e.target.value)}
                  placeholder="Ex: 982000123456789"
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="numeroRegistro">Número de Registro</Label>
                <Input
                  id="numeroRegistro"
                  value={formData.numeroRegistro}
                  onChange={(e) => handleInputChange("numeroRegistro", e.target.value)}
                  placeholder="Ex: RG123456"
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tatuagem">Tatuagem de Identificação</Label>
                <Input
                  id="tatuagem"
                  value={formData.tatuagem}
                  onChange={(e) => handleInputChange("tatuagem", e.target.value)}
                  placeholder="Ex: ABC123"
                  className="h-12"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="pedigree"
                  checked={formData.pedigree}
                  onCheckedChange={(checked) => handleInputChange("pedigree", checked as boolean)}
                />
                <Label htmlFor="pedigree" className="text-sm font-medium">
                  Possui pedigree
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="castrado"
                  checked={formData.castrado}
                  onCheckedChange={(checked) => handleInputChange("castrado", checked as boolean)}
                />
                <Label htmlFor="castrado" className="text-sm font-medium">
                  Pet castrado/esterilizado
                </Label>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="veterinario">Nome do Veterinário *</Label>
                <Input
                  id="veterinario"
                  value={formData.veterinario}
                  onChange={(e) => handleInputChange("veterinario", e.target.value)}
                  placeholder="Ex: Dr. João Silva"
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="clinica">Clínica Veterinária *</Label>
                <Input
                  id="clinica"
                  value={formData.clinica}
                  onChange={(e) => handleInputChange("clinica", e.target.value)}
                  placeholder="Ex: Clínica VetCare"
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefoneVeterinario">Telefone da Clínica</Label>
                <Input
                  id="telefoneVeterinario"
                  value={formData.telefoneVeterinario}
                  onChange={(e) => handleInputChange("telefoneVeterinario", e.target.value)}
                  placeholder="(11) 99999-9999"
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emailVeterinario">Email da Clínica</Label>
                <Input
                  id="emailVeterinario"
                  type="email"
                  value={formData.emailVeterinario}
                  onChange={(e) => handleInputChange("emailVeterinario", e.target.value)}
                  placeholder="contato@vetcare.com"
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ultimaConsulta">Última Consulta</Label>
                <Input
                  id="ultimaConsulta"
                  type="date"
                  value={formData.ultimaConsulta}
                  onChange={(e) => handleInputChange("ultimaConsulta", e.target.value)}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="proximaConsulta">Próxima Consulta</Label>
                <Input
                  id="proximaConsulta"
                  type="date"
                  value={formData.proximaConsulta}
                  onChange={(e) => handleInputChange("proximaConsulta", e.target.value)}
                  className="h-12"
                />
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="observacoes">Observações Gerais</Label>
                <Textarea
                  id="observacoes"
                  value={formData.observacoes}
                  onChange={(e) => handleInputChange("observacoes", e.target.value)}
                  placeholder="Informações importantes sobre o comportamento, personalidade, etc."
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="alergias">Alergias Conhecidas</Label>
                <Textarea
                  id="alergias"
                  value={formData.alergias}
                  onChange={(e) => handleInputChange("alergias", e.target.value)}
                  placeholder="Liste alergias alimentares, medicamentosas ou ambientais"
                  className="min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="medicamentos">Medicamentos em Uso</Label>
                <Textarea
                  id="medicamentos"
                  value={formData.medicamentos}
                  onChange={(e) => handleInputChange("medicamentos", e.target.value)}
                  placeholder="Medicamentos atuais, dosagem e frequência"
                  className="min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="comportamento">Comportamento</Label>
                <Textarea
                  id="comportamento"
                  value={formData.comportamento}
                  onChange={(e) => handleInputChange("comportamento", e.target.value)}
                  placeholder="Descreva o temperamento e comportamento do pet"
                  className="min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cuidadosEspeciais">Cuidados Especiais</Label>
                <Textarea
                  id="cuidadosEspeciais"
                  value={formData.cuidadosEspeciais}
                  onChange={(e) => handleInputChange("cuidadosEspeciais", e.target.value)}
                  placeholder="Cuidados especiais necessários, restrições, etc."
                  className="min-h-[80px]"
                />
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50/50 via-purple-50/30 to-blue-50/50">
      <UnifiedHeader user={user} onNotificationsClick={() => router.push("/notificacoes")} onMenuClick={() => {}} />

      <main className="px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="hover:bg-gray-100 rounded-xl">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Heart className="w-8 h-8 text-pink-500" />
                Cadastrar Novo Pet
              </h1>
              <p className="text-gray-600">Preencha as informações do seu pet</p>
            </div>
          </div>

          {/* Progress */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">
                  Etapa {currentStep} de {totalSteps}: {stepTitles[currentStep - 1]}
                </h3>
                <Badge className="bg-blue-100 text-blue-800 border-0">{Math.round(progress)}% concluído</Badge>
              </div>
              <Progress value={progress} className="h-2 mb-4" />
              <div className="flex justify-between">
                {stepTitles.map((title, index) => {
                  const StepIcon = stepIcons[index]
                  const isActive = index + 1 === currentStep
                  const isCompleted = index + 1 < currentStep

                  return (
                    <div key={index} className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                          isCompleted
                            ? "bg-green-500 text-white"
                            : isActive
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {isCompleted ? <Check className="w-5 h-5" /> : <StepIcon className="w-5 h-5" />}
                      </div>
                      <span
                        className={`text-xs text-center ${isActive ? "text-blue-600 font-medium" : "text-gray-500"}`}
                      >
                        {title}
                      </span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Form */}
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                {React.createElement(stepIcons[currentStep - 1], { className: "w-5 h-5 text-blue-500" })}
                {stepTitles[currentStep - 1]}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {currentStep === 1 && "Informações básicas sobre seu pet"}
                {currentStep === 2 && "Documentos e identificação do pet"}
                {currentStep === 3 && "Informações do veterinário responsável"}
                {currentStep === 4 && "Observações e cuidados especiais"}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">{renderStep()}</CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="h-12 px-6 border-2 border-gray-200 hover:bg-gray-50 rounded-xl bg-transparent"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Anterior
            </Button>

            {currentStep === totalSteps ? (
              <Button
                onClick={handleSubmit}
                disabled={!validateStep(currentStep)}
                className="h-12 px-8 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl"
              >
                <Check className="w-5 h-5 mr-2" />
                Cadastrar Pet
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={!validateStep(currentStep)}
                className="h-12 px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl"
              >
                Próximo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </main>

      <FloatingButtons />
    </div>
  )
}
