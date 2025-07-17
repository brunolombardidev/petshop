"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  Upload,
  CalendarIcon,
  Check,
  PawPrint,
  FileText,
  Stethoscope,
  Shield,
  User,
} from "lucide-react"
import { UnifiedHeader } from "@/components/unified-header"
import { FloatingButtons } from "@/components/floating-buttons"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { cn } from "@/lib/utils"

export default function CadastrarPetPage() {
  const router = useRouter()
  const [etapaAtual, setEtapaAtual] = useState(1)
  const [dataNascimento, setDataNascimento] = useState<Date>()
  const [dataUltimaVacina, setDataUltimaVacina] = useState<Date>()
  const [dataUltimoVermifugo, setDataUltimoVermifugo] = useState<Date>()

  const [user] = useState({
    name: "Maria Silva",
    email: "maria@email.com",
    avatar: "/placeholder-user.jpg",
    userType: "cliente" as const,
  })

  const [formData, setFormData] = useState({
    // Etapa 1 - Informações Básicas
    nome: "",
    especie: "",
    raca: "",
    sexo: "",
    cor: "",
    peso: "",
    dataNascimento: null as Date | null,
    foto: null as File | null,

    // Etapa 2 - Identificação
    microchip: "",
    numeroRegistro: "",
    castrado: "",
    tatuagem: "",

    // Etapa 3 - Dados Veterinários
    veterinarioNome: "",
    veterinarioClinica: "",
    veterinarioTelefone: "",
    veterinarioEmail: "",
    veterinarioEndereco: "",
    ultimaVacina: null as Date | null,
    proximaVacina: null as Date | null,
    ultimoVermifugo: null as Date | null,
    proximoVermifugo: null as Date | null,
    alergias: "",
    medicamentos: "",

    // Etapa 4 - Observações
    comportamento: "",
    alimentacao: "",
    exercicios: "",
    observacoes: "",
    contatoEmergencia: "",
    telefoneEmergencia: "",
  })

  const etapas = [
    {
      numero: 1,
      titulo: "Informações Básicas",
      descricao: "Dados principais do seu pet",
      icone: PawPrint,
    },
    {
      numero: 2,
      titulo: "Identificação",
      descricao: "Microchip e documentação",
      icone: FileText,
    },
    {
      numero: 3,
      titulo: "Dados Veterinários",
      descricao: "Veterinário e histórico médico",
      icone: Stethoscope,
    },
    {
      numero: 4,
      titulo: "Observações",
      descricao: "Comportamento e cuidados especiais",
      icone: Heart,
    },
  ]

  const racasPorEspecie = {
    cao: [
      "Golden Retriever",
      "Labrador",
      "Pastor Alemão",
      "Bulldog",
      "Poodle",
      "Rottweiler",
      "Yorkshire",
      "Shih Tzu",
      "Maltês",
      "Beagle",
      "SRD (Sem Raça Definida)",
    ],
    gato: [
      "Siamês",
      "Persa",
      "Maine Coon",
      "British Shorthair",
      "Ragdoll",
      "Bengal",
      "Sphynx",
      "Russian Blue",
      "Abissínio",
      "SRD (Sem Raça Definida)",
    ],
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleInputChange("foto", file)
    }
  }

  const proximaEtapa = () => {
    if (etapaAtual < 4) {
      setEtapaAtual(etapaAtual + 1)
    }
  }

  const etapaAnterior = () => {
    if (etapaAtual > 1) {
      setEtapaAtual(etapaAtual - 1)
    }
  }

  const handleSubmit = () => {
    // Aqui você implementaria a lógica para salvar o pet
    console.log("Dados do pet:", formData)

    // Simular salvamento
    setTimeout(() => {
      router.push("/meus-pets")
    }, 1000)
  }

  const validarEtapa = (etapa: number) => {
    switch (etapa) {
      case 1:
        return formData.nome && formData.especie && formData.raca && formData.sexo && formData.cor
      case 2:
        return true // Etapa opcional
      case 3:
        return formData.veterinarioNome && formData.veterinarioClinica
      case 4:
        return true // Etapa opcional
      default:
        return false
    }
  }

  const renderEtapa1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <PawPrint className="w-12 h-12 text-pink-500 mx-auto mb-3" />
        <h2 className="text-2xl font-bold text-gray-900">Informações Básicas</h2>
        <p className="text-gray-600">Vamos começar com os dados principais do seu pet</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <Label htmlFor="nome" className="text-sm font-medium text-gray-700">
            Nome do Pet *
          </Label>
          <Input
            id="nome"
            value={formData.nome}
            onChange={(e) => handleInputChange("nome", e.target.value)}
            placeholder="Ex: Buddy, Luna, Max..."
            className="mt-1 h-12 border-2 border-gray-200 rounded-xl"
          />
        </div>

        <div>
          <Label htmlFor="especie" className="text-sm font-medium text-gray-700">
            Espécie *
          </Label>
          <Select value={formData.especie} onValueChange={(value) => handleInputChange("especie", value)}>
            <SelectTrigger className="mt-1 h-12 border-2 border-gray-200 rounded-xl">
              <SelectValue placeholder="Selecione a espécie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cao">Cão</SelectItem>
              <SelectItem value="gato">Gato</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="raca" className="text-sm font-medium text-gray-700">
            Raça *
          </Label>
          <Select
            value={formData.raca}
            onValueChange={(value) => handleInputChange("raca", value)}
            disabled={!formData.especie}
          >
            <SelectTrigger className="mt-1 h-12 border-2 border-gray-200 rounded-xl">
              <SelectValue placeholder="Selecione a raça" />
            </SelectTrigger>
            <SelectContent>
              {formData.especie &&
                racasPorEspecie[formData.especie as keyof typeof racasPorEspecie]?.map((raca) => (
                  <SelectItem key={raca} value={raca}>
                    {raca}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700">Sexo *</Label>
          <RadioGroup
            value={formData.sexo}
            onValueChange={(value) => handleInputChange("sexo", value)}
            className="flex gap-6 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="macho" id="macho" />
              <Label htmlFor="macho">Macho</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="femea" id="femea" />
              <Label htmlFor="femea">Fêmea</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label htmlFor="cor" className="text-sm font-medium text-gray-700">
            Cor *
          </Label>
          <Input
            id="cor"
            value={formData.cor}
            onChange={(e) => handleInputChange("cor", e.target.value)}
            placeholder="Ex: Dourado, Preto, Branco..."
            className="mt-1 h-12 border-2 border-gray-200 rounded-xl"
          />
        </div>

        <div>
          <Label htmlFor="peso" className="text-sm font-medium text-gray-700">
            Peso (kg)
          </Label>
          <Input
            id="peso"
            type="number"
            step="0.1"
            value={formData.peso}
            onChange={(e) => handleInputChange("peso", e.target.value)}
            placeholder="Ex: 25.5"
            className="mt-1 h-12 border-2 border-gray-200 rounded-xl"
          />
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700">Data de Nascimento</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full mt-1 h-12 border-2 border-gray-200 rounded-xl justify-start text-left font-normal",
                  !dataNascimento && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dataNascimento ? format(dataNascimento, "PPP", { locale: ptBR }) : "Selecione a data"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={dataNascimento}
                onSelect={(date) => {
                  setDataNascimento(date)
                  handleInputChange("dataNascimento", date)
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="md:col-span-2">
          <Label className="text-sm font-medium text-gray-700">Foto do Pet</Label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="foto"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-pink-600 hover:text-pink-500 focus-within:outline-none"
                >
                  <span>Carregar uma foto</span>
                  <input
                    id="foto"
                    name="foto"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={handleFileChange}
                  />
                </label>
                <p className="pl-1">ou arraste e solte</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF até 10MB</p>
              {formData.foto && <p className="text-sm text-green-600 font-medium">✓ {formData.foto.name}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderEtapa2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <FileText className="w-12 h-12 text-blue-500 mx-auto mb-3" />
        <h2 className="text-2xl font-bold text-gray-900">Identificação</h2>
        <p className="text-gray-600">Informações de identificação e documentação</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="microchip" className="text-sm font-medium text-gray-700">
            Número do Microchip
          </Label>
          <Input
            id="microchip"
            value={formData.microchip}
            onChange={(e) => handleInputChange("microchip", e.target.value)}
            placeholder="Ex: 982000123456789"
            className="mt-1 h-12 border-2 border-gray-200 rounded-xl"
          />
          <p className="text-xs text-gray-500 mt-1">Número de 15 dígitos encontrado no certificado</p>
        </div>

        <div>
          <Label htmlFor="numeroRegistro" className="text-sm font-medium text-gray-700">
            Número de Registro
          </Label>
          <Input
            id="numeroRegistro"
            value={formData.numeroRegistro}
            onChange={(e) => handleInputChange("numeroRegistro", e.target.value)}
            placeholder="Ex: RG123456"
            className="mt-1 h-12 border-2 border-gray-200 rounded-xl"
          />
          <p className="text-xs text-gray-500 mt-1">Registro em órgão competente (opcional)</p>
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700">Castrado</Label>
          <RadioGroup
            value={formData.castrado}
            onValueChange={(value) => handleInputChange("castrado", value)}
            className="flex gap-6 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sim" id="castrado-sim" />
              <Label htmlFor="castrado-sim">Sim</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nao" id="castrado-nao" />
              <Label htmlFor="castrado-nao">Não</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label htmlFor="tatuagem" className="text-sm font-medium text-gray-700">
            Tatuagem de Identificação
          </Label>
          <Input
            id="tatuagem"
            value={formData.tatuagem}
            onChange={(e) => handleInputChange("tatuagem", e.target.value)}
            placeholder="Código da tatuagem (se houver)"
            className="mt-1 h-12 border-2 border-gray-200 rounded-xl"
          />
        </div>
      </div>
    </div>
  )

  const renderEtapa3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Stethoscope className="w-12 h-12 text-green-500 mx-auto mb-3" />
        <h2 className="text-2xl font-bold text-gray-900">Dados Veterinários</h2>
        <p className="text-gray-600">Informações do veterinário e histórico médico</p>
      </div>

      <div className="space-y-8">
        {/* Dados do Veterinário */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-green-500" />
            Veterinário Responsável
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="veterinarioNome" className="text-sm font-medium text-gray-700">
                Nome do Veterinário *
              </Label>
              <Input
                id="veterinarioNome"
                value={formData.veterinarioNome}
                onChange={(e) => handleInputChange("veterinarioNome", e.target.value)}
                placeholder="Dr. João Silva"
                className="mt-1 h-12 border-2 border-gray-200 rounded-xl"
              />
            </div>

            <div>
              <Label htmlFor="veterinarioClinica" className="text-sm font-medium text-gray-700">
                Clínica/Hospital *
              </Label>
              <Input
                id="veterinarioClinica"
                value={formData.veterinarioClinica}
                onChange={(e) => handleInputChange("veterinarioClinica", e.target.value)}
                placeholder="Clínica VetCare"
                className="mt-1 h-12 border-2 border-gray-200 rounded-xl"
              />
            </div>

            <div>
              <Label htmlFor="veterinarioTelefone" className="text-sm font-medium text-gray-700">
                Telefone
              </Label>
              <Input
                id="veterinarioTelefone"
                value={formData.veterinarioTelefone}
                onChange={(e) => handleInputChange("veterinarioTelefone", e.target.value)}
                placeholder="(11) 99999-9999"
                className="mt-1 h-12 border-2 border-gray-200 rounded-xl"
              />
            </div>

            <div>
              <Label htmlFor="veterinarioEmail" className="text-sm font-medium text-gray-700">
                E-mail
              </Label>
              <Input
                id="veterinarioEmail"
                type="email"
                value={formData.veterinarioEmail}
                onChange={(e) => handleInputChange("veterinarioEmail", e.target.value)}
                placeholder="contato@vetcare.com"
                className="mt-1 h-12 border-2 border-gray-200 rounded-xl"
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="veterinarioEndereco" className="text-sm font-medium text-gray-700">
                Endereço da Clínica
              </Label>
              <Input
                id="veterinarioEndereco"
                value={formData.veterinarioEndereco}
                onChange={(e) => handleInputChange("veterinarioEndereco", e.target.value)}
                placeholder="Rua das Flores, 123 - Centro"
                className="mt-1 h-12 border-2 border-gray-200 rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Histórico de Vacinas */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-500" />
            Histórico de Vacinas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">Data da Última Vacina</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full mt-1 h-12 border-2 border-gray-200 rounded-xl justify-start text-left font-normal",
                      !dataUltimaVacina && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dataUltimaVacina ? format(dataUltimaVacina, "PPP", { locale: ptBR }) : "Selecione a data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dataUltimaVacina}
                    onSelect={(date) => {
                      setDataUltimaVacina(date)
                      handleInputChange("ultimaVacina", date)
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">Data da Próxima Vacina</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full mt-1 h-12 border-2 border-gray-200 rounded-xl justify-start text-left font-normal",
                      !formData.proximaVacina && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.proximaVacina
                      ? format(formData.proximaVacina, "PPP", { locale: ptBR })
                      : "Selecione a data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.proximaVacina}
                    onSelect={(date) => handleInputChange("proximaVacina", date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        {/* Vermifugação */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Vermifugação</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">Último Vermífugo</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full mt-1 h-12 border-2 border-gray-200 rounded-xl justify-start text-left font-normal",
                      !dataUltimoVermifugo && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dataUltimoVermifugo ? format(dataUltimoVermifugo, "PPP", { locale: ptBR }) : "Selecione a data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dataUltimoVermifugo}
                    onSelect={(date) => {
                      setDataUltimoVermifugo(date)
                      handleInputChange("ultimoVermifugo", date)
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">Próximo Vermífugo</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full mt-1 h-12 border-2 border-gray-200 rounded-xl justify-start text-left font-normal",
                      !formData.proximoVermifugo && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.proximoVermifugo
                      ? format(formData.proximoVermifugo, "PPP", { locale: ptBR })
                      : "Selecione a data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.proximoVermifugo}
                    onSelect={(date) => handleInputChange("proximoVermifugo", date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        {/* Alergias e Medicamentos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="alergias" className="text-sm font-medium text-gray-700">
              Alergias Conhecidas
            </Label>
            <Textarea
              id="alergias"
              value={formData.alergias}
              onChange={(e) => handleInputChange("alergias", e.target.value)}
              placeholder="Descreva alergias conhecidas..."
              className="mt-1 border-2 border-gray-200 rounded-xl"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="medicamentos" className="text-sm font-medium text-gray-700">
              Medicamentos em Uso
            </Label>
            <Textarea
              id="medicamentos"
              value={formData.medicamentos}
              onChange={(e) => handleInputChange("medicamentos", e.target.value)}
              placeholder="Liste medicamentos atuais..."
              className="mt-1 border-2 border-gray-200 rounded-xl"
              rows={3}
            />
          </div>
        </div>
      </div>
    </div>
  )

  const renderEtapa4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Heart className="w-12 h-12 text-purple-500 mx-auto mb-3" />
        <h2 className="text-2xl font-bold text-gray-900">Observações</h2>
        <p className="text-gray-600">Informações sobre comportamento e cuidados especiais</p>
      </div>

      <div className="space-y-6">
        <div>
          <Label htmlFor="comportamento" className="text-sm font-medium text-gray-700">
            Comportamento
          </Label>
          <Textarea
            id="comportamento"
            value={formData.comportamento}
            onChange={(e) => handleInputChange("comportamento", e.target.value)}
            placeholder="Descreva o temperamento e comportamento do pet..."
            className="mt-1 border-2 border-gray-200 rounded-xl"
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="alimentacao" className="text-sm font-medium text-gray-700">
            Alimentação
          </Label>
          <Textarea
            id="alimentacao"
            value={formData.alimentacao}
            onChange={(e) => handleInputChange("alimentacao", e.target.value)}
            placeholder="Tipo de ração, horários, restrições alimentares..."
            className="mt-1 border-2 border-gray-200 rounded-xl"
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="exercicios" className="text-sm font-medium text-gray-700">
            Exercícios e Atividades
          </Label>
          <Textarea
            id="exercicios"
            value={formData.exercicios}
            onChange={(e) => handleInputChange("exercicios", e.target.value)}
            placeholder="Rotina de exercícios, brincadeiras favoritas..."
            className="mt-1 border-2 border-gray-200 rounded-xl"
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="observacoes" className="text-sm font-medium text-gray-700">
            Observações Gerais
          </Label>
          <Textarea
            id="observacoes"
            value={formData.observacoes}
            onChange={(e) => handleInputChange("observacoes", e.target.value)}
            placeholder="Outras informações importantes sobre o pet..."
            className="mt-1 border-2 border-gray-200 rounded-xl"
            rows={4}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="contatoEmergencia" className="text-sm font-medium text-gray-700">
              Contato de Emergência
            </Label>
            <Input
              id="contatoEmergencia"
              value={formData.contatoEmergencia}
              onChange={(e) => handleInputChange("contatoEmergencia", e.target.value)}
              placeholder="Nome do contato"
              className="mt-1 h-12 border-2 border-gray-200 rounded-xl"
            />
          </div>

          <div>
            <Label htmlFor="telefoneEmergencia" className="text-sm font-medium text-gray-700">
              Telefone de Emergência
            </Label>
            <Input
              id="telefoneEmergencia"
              value={formData.telefoneEmergencia}
              onChange={(e) => handleInputChange("telefoneEmergencia", e.target.value)}
              placeholder="(11) 99999-9999"
              className="mt-1 h-12 border-2 border-gray-200 rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50/50 via-purple-50/30 to-blue-50/50">
      <UnifiedHeader user={user} />

      <main className="px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-xl">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Cadastrar Pet</h1>
              <p className="text-gray-600">Adicione um novo pet ao seu perfil</p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {etapas.map((etapa, index) => {
                const Icone = etapa.icone
                const isAtual = etapa.numero === etapaAtual
                const isConcluida = etapa.numero < etapaAtual
                const isDisponivel = etapa.numero <= etapaAtual

                return (
                  <div key={etapa.numero} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div
                        className={cn(
                          "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all",
                          isAtual && "bg-pink-500 border-pink-500 text-white",
                          isConcluida && "bg-green-500 border-green-500 text-white",
                          !isAtual && !isConcluida && isDisponivel && "border-gray-300 text-gray-400",
                          !isDisponivel && "border-gray-200 text-gray-300",
                        )}
                      >
                        {isConcluida ? <Check className="w-6 h-6" /> : <Icone className="w-6 h-6" />}
                      </div>
                      <div className="mt-2 text-center">
                        <p
                          className={cn(
                            "text-sm font-medium",
                            isAtual && "text-pink-600",
                            isConcluida && "text-green-600",
                            !isAtual && !isConcluida && "text-gray-500",
                          )}
                        >
                          {etapa.titulo}
                        </p>
                        <p className="text-xs text-gray-500 hidden md:block">{etapa.descricao}</p>
                      </div>
                    </div>
                    {index < etapas.length - 1 && (
                      <div
                        className={cn(
                          "flex-1 h-0.5 mx-4 transition-all",
                          etapa.numero < etapaAtual ? "bg-green-500" : "bg-gray-200",
                        )}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Form Content */}
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm rounded-2xl">
            <CardContent className="p-8">
              {etapaAtual === 1 && renderEtapa1()}
              {etapaAtual === 2 && renderEtapa2()}
              {etapaAtual === 3 && renderEtapa3()}
              {etapaAtual === 4 && renderEtapa4()}
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={etapaAnterior}
              disabled={etapaAtual === 1}
              className="h-12 px-6 border-2 border-gray-200 rounded-xl bg-transparent"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Anterior
            </Button>

            {etapaAtual < 4 ? (
              <Button
                onClick={proximaEtapa}
                disabled={!validarEtapa(etapaAtual)}
                className="h-12 px-6 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-xl"
              >
                Próximo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="h-12 px-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl"
              >
                <Check className="w-5 h-5 mr-2" />
                Cadastrar Pet
              </Button>
            )}
          </div>
        </div>
      </main>

      <FloatingButtons />
    </div>
  )
}
