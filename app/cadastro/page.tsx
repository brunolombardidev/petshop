"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, ArrowLeft, User, Building, Truck, Users, Shield } from "lucide-react"
import { toast } from "@/hooks/use-toast"

// Tipos para o formulário
interface BaseFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
  phone: string
  document: string
  address: {
    street: string
    number: string
    complement: string
    neighborhood: string
    city: string
    state: string
    zipCode: string
  }
}

interface ClientFormData extends BaseFormData {
  userType: "cliente"
  birthDate: string
}

interface PetshopFormData extends BaseFormData {
  userType: "petshop"
  companyName: string
  cnpj: string
  businessHours: string
  services: string[]
}

interface SupplierFormData extends BaseFormData {
  userType: "fornecedor"
  companyName: string
  cnpj: string
  businessArea: string
  products: string[]
}

interface CompanyFormData extends BaseFormData {
  userType: "empresa"
  companyName: string
  cnpj: string
  businessArea: string
  employeeCount: string
}

type FormData = ClientFormData | PetshopFormData | SupplierFormData | CompanyFormData

// Estado do formulário com campos opcionais
interface FormState {
  name?: string
  email?: string
  password?: string
  confirmPassword?: string
  phone?: string
  document?: string
  userType?: "cliente" | "petshop" | "fornecedor" | "empresa"
  birthDate?: string
  companyName?: string
  cnpj?: string
  businessHours?: string
  services?: string[]
  businessArea?: string
  products?: string[]
  employeeCount?: string
  address?: {
    street?: string
    number?: string
    complement?: string
    neighborhood?: string
    city?: string
    state?: string
    zipCode?: string
  }
}

export default function CadastroPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    document: "",
    userType: "cliente",
    birthDate: "",
    companyName: "",
    cnpj: "",
    businessHours: "",
    services: [],
    businessArea: "",
    products: [],
    employeeCount: "",
    address: {
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
      zipCode: "",
    },
  })

  const userTypes = [
    { value: "cliente", label: "Cliente", icon: User, description: "Pessoa física que busca serviços para pets" },
    {
      value: "petshop",
      label: "Petshop",
      icon: Building,
      description: "Estabelecimento que oferece serviços para pets",
    },
    {
      value: "fornecedor",
      label: "Fornecedor",
      icon: Truck,
      description: "Empresa que fornece produtos para petshops",
    },
    { value: "empresa", label: "Empresa", icon: Users, description: "Empresa que busca parcerias corporativas" },
  ]

  const handleInputChange = (field: keyof FormState, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleArrayChange = (field: keyof FormState, value: string[]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleAddressChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value,
      },
    }))
  }

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services?.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...(prev.services || []), service],
    }))
  }

  const handleProductToggle = (product: string) => {
    setFormData((prev) => ({
      ...prev,
      products: prev.products?.includes(product)
        ? prev.products.filter((p) => p !== product)
        : [...(prev.products || []), product],
    }))
  }

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!formData.userType
      case 2:
        return !!(formData.name && formData.email && formData.password && formData.confirmPassword && formData.phone)
      case 3:
        if (formData.userType === "cliente") {
          return !!(formData.document && formData.birthDate)
        } else {
          return !!(formData.companyName && formData.cnpj && formData.document)
        }
      case 4:
        return !!(
          formData.address?.street &&
          formData.address?.number &&
          formData.address?.neighborhood &&
          formData.address?.city &&
          formData.address?.state &&
          formData.address?.zipCode
        )
      case 5:
        return acceptTerms
      default:
        return false
    }
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 5))
    } else {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios antes de continuar.",
        variant: "destructive",
      })
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    if (!validateStep(5)) {
      toast({
        title: "Erro",
        description: "Por favor, aceite os termos de uso para continuar.",
        variant: "destructive",
      })
      return
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      // Simular chamada da API
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Sucesso!",
        description: "Conta criada com sucesso! Verifique seu email para ativar a conta.",
      })

      router.push("/")
    } catch (error) {
      console.error("Erro ao criar conta:", error)
      toast({
        title: "Erro",
        description: "Erro ao criar conta. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Escolha o tipo de conta</h2>
              <p className="text-gray-600">Selecione a opção que melhor descreve você</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userTypes.map((type) => {
                const Icon = type.icon
                return (
                  <Card
                    key={type.value}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                      formData.userType === type.value
                        ? "ring-2 ring-[#30B2B0] bg-[#30B2B0]/5"
                        : "hover:ring-1 hover:ring-gray-300"
                    }`}
                    onClick={() => handleInputChange("userType", type.value)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div
                          className={`p-3 rounded-xl ${
                            formData.userType === type.value ? "bg-[#30B2B0] text-white" : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{type.label}</h3>
                          <p className="text-sm text-gray-600">{type.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Informações básicas</h2>
              <p className="text-gray-600">Preencha seus dados pessoais</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo *</Label>
                <Input
                  id="name"
                  value={formData.name || ""}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Seu nome completo"
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefone *</Label>
                <Input
                  id="phone"
                  value={formData.phone || ""}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="(11) 99999-9999"
                  className="h-12"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email || ""}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="seu@email.com"
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password || ""}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    placeholder="Sua senha"
                    className="h-12 pr-12"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-12 w-12"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar senha *</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword || ""}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    placeholder="Confirme sua senha"
                    className="h-12 pr-12"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-12 w-12"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {formData.userType === "cliente" ? "Dados pessoais" : "Dados da empresa"}
              </h2>
              <p className="text-gray-600">
                {formData.userType === "cliente"
                  ? "Informações adicionais sobre você"
                  : "Informações sobre sua empresa"}
              </p>
            </div>

            {formData.userType === "cliente" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="document">CPF *</Label>
                  <Input
                    id="document"
                    value={formData.document || ""}
                    onChange={(e) => handleInputChange("document", e.target.value)}
                    placeholder="000.000.000-00"
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthDate">Data de nascimento *</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={formData.birthDate || ""}
                    onChange={(e) => handleInputChange("birthDate", e.target.value)}
                    className="h-12"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Nome da empresa *</Label>
                    <Input
                      id="companyName"
                      value={formData.companyName || ""}
                      onChange={(e) => handleInputChange("companyName", e.target.value)}
                      placeholder="Nome da sua empresa"
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cnpj">CNPJ *</Label>
                    <Input
                      id="cnpj"
                      value={formData.cnpj || ""}
                      onChange={(e) => handleInputChange("cnpj", e.target.value)}
                      placeholder="00.000.000/0000-00"
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="document">CPF do responsável *</Label>
                    <Input
                      id="document"
                      value={formData.document || ""}
                      onChange={(e) => handleInputChange("document", e.target.value)}
                      placeholder="000.000.000-00"
                      className="h-12"
                    />
                  </div>

                  {formData.userType === "petshop" && (
                    <div className="space-y-2">
                      <Label htmlFor="businessHours">Horário de funcionamento</Label>
                      <Input
                        id="businessHours"
                        value={formData.businessHours || ""}
                        onChange={(e) => handleInputChange("businessHours", e.target.value)}
                        placeholder="Ex: Seg-Sex 8h-18h, Sáb 8h-12h"
                        className="h-12"
                      />
                    </div>
                  )}

                  {(formData.userType === "fornecedor" || formData.userType === "empresa") && (
                    <div className="space-y-2">
                      <Label htmlFor="businessArea">Área de atuação</Label>
                      <Select
                        value={formData.businessArea || ""}
                        onValueChange={(value) => handleInputChange("businessArea", value)}
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Selecione a área" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="alimentacao">Alimentação</SelectItem>
                          <SelectItem value="higiene">Higiene e Beleza</SelectItem>
                          <SelectItem value="brinquedos">Brinquedos</SelectItem>
                          <SelectItem value="medicamentos">Medicamentos</SelectItem>
                          <SelectItem value="acessorios">Acessórios</SelectItem>
                          <SelectItem value="servicos">Serviços</SelectItem>
                          <SelectItem value="outros">Outros</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {formData.userType === "empresa" && (
                    <div className="space-y-2">
                      <Label htmlFor="employeeCount">Número de funcionários</Label>
                      <Select
                        value={formData.employeeCount || ""}
                        onValueChange={(value) => handleInputChange("employeeCount", value)}
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1-10 funcionários</SelectItem>
                          <SelectItem value="11-50">11-50 funcionários</SelectItem>
                          <SelectItem value="51-200">51-200 funcionários</SelectItem>
                          <SelectItem value="201-500">201-500 funcionários</SelectItem>
                          <SelectItem value="500+">Mais de 500 funcionários</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>

                {formData.userType === "petshop" && (
                  <div className="space-y-4">
                    <Label>Serviços oferecidos</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        "Banho e Tosa",
                        "Veterinário",
                        "Hotel",
                        "Daycare",
                        "Adestramento",
                        "Fisioterapia",
                        "Acupuntura",
                        "Cirurgia",
                        "Vacinação",
                        "Microchipagem",
                        "Castração",
                        "Outros",
                      ].map((service) => (
                        <div key={service} className="flex items-center space-x-2">
                          <Checkbox
                            id={service}
                            checked={formData.services?.includes(service) || false}
                            onCheckedChange={() => handleServiceToggle(service)}
                          />
                          <Label htmlFor={service} className="text-sm">
                            {service}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {formData.userType === "fornecedor" && (
                  <div className="space-y-4">
                    <Label>Produtos fornecidos</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        "Ração",
                        "Petiscos",
                        "Brinquedos",
                        "Coleiras",
                        "Camas",
                        "Medicamentos",
                        "Shampoos",
                        "Acessórios",
                        "Equipamentos",
                        "Outros",
                      ].map((product) => (
                        <div key={product} className="flex items-center space-x-2">
                          <Checkbox
                            id={product}
                            checked={formData.products?.includes(product) || false}
                            onCheckedChange={() => handleProductToggle(product)}
                          />
                          <Label htmlFor={product} className="text-sm">
                            {product}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Endereço</h2>
              <p className="text-gray-600">Onde você está localizado?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="zipCode">CEP *</Label>
                <Input
                  id="zipCode"
                  value={formData.address?.zipCode || ""}
                  onChange={(e) => handleAddressChange("zipCode", e.target.value)}
                  placeholder="00000-000"
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">Estado *</Label>
                <Select
                  value={formData.address?.state || ""}
                  onValueChange={(value) => handleAddressChange("state", value)}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Selecione o estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SP">São Paulo</SelectItem>
                    <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                    <SelectItem value="MG">Minas Gerais</SelectItem>
                    <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                    <SelectItem value="PR">Paraná</SelectItem>
                    <SelectItem value="SC">Santa Catarina</SelectItem>
                    <SelectItem value="BA">Bahia</SelectItem>
                    <SelectItem value="GO">Goiás</SelectItem>
                    <SelectItem value="PE">Pernambuco</SelectItem>
                    <SelectItem value="CE">Ceará</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">Cidade *</Label>
                <Input
                  id="city"
                  value={formData.address?.city || ""}
                  onChange={(e) => handleAddressChange("city", e.target.value)}
                  placeholder="Sua cidade"
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="neighborhood">Bairro *</Label>
                <Input
                  id="neighborhood"
                  value={formData.address?.neighborhood || ""}
                  onChange={(e) => handleAddressChange("neighborhood", e.target.value)}
                  placeholder="Seu bairro"
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="street">Rua *</Label>
                <Input
                  id="street"
                  value={formData.address?.street || ""}
                  onChange={(e) => handleAddressChange("street", e.target.value)}
                  placeholder="Nome da rua"
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="number">Número *</Label>
                <Input
                  id="number"
                  value={formData.address?.number || ""}
                  onChange={(e) => handleAddressChange("number", e.target.value)}
                  placeholder="123"
                  className="h-12"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="complement">Complemento</Label>
                <Input
                  id="complement"
                  value={formData.address?.complement || ""}
                  onChange={(e) => handleAddressChange("complement", e.target.value)}
                  placeholder="Apartamento, sala, etc."
                  className="h-12"
                />
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Termos e condições</h2>
              <p className="text-gray-600">Revise e aceite nossos termos para finalizar</p>
            </div>

            <Card className="p-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#30B2B0]" />
                  Resumo da conta
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Tipo de conta:</span>
                    <span className="ml-2 font-medium">
                      {userTypes.find((t) => t.value === formData.userType)?.label}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Nome:</span>
                    <span className="ml-2 font-medium">{formData.name}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Email:</span>
                    <span className="ml-2 font-medium">{formData.email}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Telefone:</span>
                    <span className="ml-2 font-medium">{formData.phone}</span>
                  </div>
                  {formData.userType !== "cliente" && (
                    <div className="md:col-span-2">
                      <span className="text-gray-600">Empresa:</span>
                      <span className="ml-2 font-medium">{formData.companyName}</span>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="terms"
                      checked={acceptTerms}
                      onCheckedChange={(checked) => setAcceptTerms(checked === true)}
                    />
                    <div className="text-sm">
                      <Label htmlFor="terms" className="cursor-pointer">
                        Eu aceito os{" "}
                        <a href="#" className="text-[#30B2B0] hover:underline">
                          Termos de Uso
                        </a>{" "}
                        e a{" "}
                        <a href="#" className="text-[#30B2B0] hover:underline">
                          Política de Privacidade
                        </a>
                      </Label>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                    <p>
                      Ao criar sua conta, você concorda em receber comunicações da BPET sobre produtos, serviços e
                      promoções. Você pode cancelar a inscrição a qualquer momento.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )

      default:
        return null
    }
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
            <div>
              <h1 className="font-bold text-xl text-gray-900">Criar conta</h1>
              <p className="text-sm text-gray-600">
                Etapa {currentStep} de 5 - {Math.round((currentStep / 5) * 100)}% concluído
              </p>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 h-1">
          <div
            className="bg-gradient-to-r from-[#30B2B0] to-[#FFBDB6] h-1 transition-all duration-300"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          />
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
            <CardContent className="p-8">{renderStepContent()}</CardContent>
          </Card>

          {/* Botões de navegação */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-8 py-3 rounded-xl bg-transparent"
            >
              Voltar
            </Button>

            {currentStep < 5 ? (
              <Button
                onClick={nextStep}
                className="px-8 py-3 bg-gradient-to-r from-[#30B2B0] to-[#FFBDB6] hover:from-[#FFBDB6] hover:to-[#30B2B0] text-white rounded-xl"
              >
                Próximo
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={loading || !acceptTerms}
                className="px-8 py-3 bg-gradient-to-r from-[#30B2B0] to-[#FFBDB6] hover:from-[#FFBDB6] hover:to-[#30B2B0] text-white rounded-xl"
              >
                {loading ? "Criando conta..." : "Criar conta"}
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
