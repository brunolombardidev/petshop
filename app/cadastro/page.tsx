"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeft,
  ArrowRight,
  PawPrint,
  Mail,
  Lock,
  User,
  Building,
  MapPin,
  Phone,
  Calendar,
  Package,
  Users,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"

type UserType = "cliente" | "petshop" | "fornecedor" | "empresa"

interface Step1Data {
  email: string
  senha: string
  confirmaSenha: string
  tipo: UserType | ""
}

interface ClienteData {
  nome: string
  cpf: string
  nascimento: string
  telefoneFixo: string
  celular: string
  cep: string
  logradouro: string
  numero: string
  complemento: string
  bairro: string
  cidade: string
  estado: string
  pais: string
  fotoUrl: string
}

interface EmpresaData {
  cnpj: string
  nomeFantasia: string
  area: string
  descritivo: string
  telefone: string
  email: string
  responsavel: string
  redesSociais: string
  logotipo: string
  cep: string
  logradouro: string
  numero: string
  complemento: string
  bairro: string
  cidade: string
  estado: string
  pais: string
}

export default function CadastroPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [step1Data, setStep1Data] = useState<Step1Data>({
    email: "",
    senha: "",
    confirmaSenha: "",
    tipo: "",
  })
  const [clienteData, setClienteData] = useState<ClienteData>({
    nome: "",
    cpf: "",
    nascimento: "",
    telefoneFixo: "",
    celular: "",
    cep: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    pais: "Brasil",
    fotoUrl: "",
  })
  const [empresaData, setEmpresaData] = useState<EmpresaData>({
    cnpj: "",
    nomeFantasia: "",
    area: "",
    descritivo: "",
    telefone: "",
    email: "",
    responsavel: "",
    redesSociais: "",
    logotipo: "",
    cep: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    pais: "Brasil",
  })

  const getUserTypeIcon = (type: string) => {
    switch (type) {
      case "cliente":
        return <User className="w-4 h-4" />
      case "petshop":
        return <Building className="w-4 h-4" />
      case "fornecedor":
        return <Package className="w-4 h-4" />
      case "empresa":
        return <Users className="w-4 h-4" />
      default:
        return null
    }
  }

  const getUserTypeColor = (type: string) => {
    switch (type) {
      case "cliente":
        return "text-pink-600"
      case "petshop":
        return "text-blue-600"
      case "fornecedor":
        return "text-purple-600"
      case "empresa":
        return "text-indigo-600"
      default:
        return "text-gray-600"
    }
  }

  const handleStep1Next = () => {
    if (step1Data.email && step1Data.senha && step1Data.confirmaSenha && step1Data.tipo) {
      if (step1Data.senha === step1Data.confirmaSenha) {
        setStep(2)
      } else {
        alert("As senhas não coincidem!")
      }
    } else {
      alert("Preencha todos os campos!")
    }
  }

  const handleFinish = () => {
    console.log("Dados do cadastro:", {
      step1Data,
      step2Data: step1Data.tipo === "cliente" ? clienteData : empresaData,
    })

    // Salva o tipo de usuário no localStorage
    localStorage.setItem("userType", step1Data.tipo)

    // Redireciona para o dashboard unificado
    router.push("/dashboard")
  }

  const renderStep1 = () => (
    <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
      <CardHeader className="text-center pb-6">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg">
            <PawPrint className="w-8 h-8 text-white" />
          </div>
        </div>
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
          Criar Conta
        </CardTitle>
        <CardDescription className="text-gray-600 text-base mt-2">Etapa 1 de 2 - Informações básicas</CardDescription>
        <Progress value={50} className="mt-4 h-2" />
      </CardHeader>
      <CardContent className="space-y-6 px-8 pb-8">
        <div className="space-y-2">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              id="email"
              type="email"
              placeholder="Digite seu e-mail"
              value={step1Data.email}
              onChange={(e) => setStep1Data({ ...step1Data, email: e.target.value })}
              className="pl-11 h-12 border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-xl"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              id="senha"
              type="password"
              placeholder="Digite sua senha"
              value={step1Data.senha}
              onChange={(e) => setStep1Data({ ...step1Data, senha: e.target.value })}
              className="pl-11 h-12 border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-xl"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              id="confirmaSenha"
              type="password"
              placeholder="Confirme sua senha"
              value={step1Data.confirmaSenha}
              onChange={(e) => setStep1Data({ ...step1Data, confirmaSenha: e.target.value })}
              className="pl-11 h-12 border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-xl"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Select
            value={step1Data.tipo}
            onValueChange={(value: UserType) => setStep1Data({ ...step1Data, tipo: value })}
          >
            <SelectTrigger className="h-12 border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-xl">
              <div className="flex items-center gap-2">
                {step1Data.tipo && getUserTypeIcon(step1Data.tipo)}
                <SelectValue placeholder="Selecione o tipo de usuário" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cliente">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-pink-600" />
                  <span>Cliente</span>
                </div>
              </SelectItem>
              <SelectItem value="petshop">
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-blue-600" />
                  <span>Petshop</span>
                </div>
              </SelectItem>
              <SelectItem value="fornecedor">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-purple-600" />
                  <span>Fornecedor</span>
                </div>
              </SelectItem>
              <SelectItem value="empresa">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-indigo-600" />
                  <span>Empresa</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Informação sobre tipos de usuário */}
        {step1Data.tipo && (
          <div className="p-4 bg-gray-50 rounded-xl">
            <div className={`flex items-center gap-2 ${getUserTypeColor(step1Data.tipo)} mb-2`}>
              {getUserTypeIcon(step1Data.tipo)}
              <span className="font-semibold">{step1Data.tipo.charAt(0).toUpperCase() + step1Data.tipo.slice(1)}</span>
            </div>
            <p className="text-sm text-gray-600">
              {step1Data.tipo === "cliente" &&
                "Acesse serviços para seus pets, encontre petshops e gerencie seus cuidados."}
              {step1Data.tipo === "petshop" && "Gerencie seu negócio, clientes, agendamentos e produtos."}
              {step1Data.tipo === "fornecedor" && "Administre vendas, produtos e relacionamento com petshops."}
              {step1Data.tipo === "empresa" && "Gerencie benefícios pet para seus colaboradores."}
            </p>
          </div>
        )}

        <div className="flex gap-4 pt-6">
          <Button
            onClick={() => router.push("/")}
            variant="outline"
            className="flex-1 h-12 border-2 border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <Button
            onClick={handleStep1Next}
            className="flex-1 h-12 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Próximo
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const renderClienteStep = () => (
    <Card className="w-full max-w-4xl shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
      <CardHeader className="text-center pb-6">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg">
            <User className="w-8 h-8 text-white" />
          </div>
        </div>
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
          Informações Pessoais
        </CardTitle>
        <CardDescription className="text-gray-600 text-base mt-2">Etapa 2 de 2 - Complete seu perfil</CardDescription>
        <Progress value={100} className="mt-4 h-2" />
      </CardHeader>
      <CardContent className="space-y-6 px-8 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="nome" className="text-gray-700 font-medium">
              Nome Completo
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                id="nome"
                placeholder="Seu nome completo"
                value={clienteData.nome}
                onChange={(e) => setClienteData({ ...clienteData, nome: e.target.value })}
                className="pl-11 h-12 border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-xl"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="cpf" className="text-gray-700 font-medium">
              CPF
            </Label>
            <Input
              id="cpf"
              placeholder="000.000.000-00"
              value={clienteData.cpf}
              onChange={(e) => setClienteData({ ...clienteData, cpf: e.target.value })}
              className="h-12 border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nascimento" className="text-gray-700 font-medium">
              Data de Nascimento
            </Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                id="nascimento"
                type="date"
                value={clienteData.nascimento}
                onChange={(e) => setClienteData({ ...clienteData, nascimento: e.target.value })}
                className="pl-11 h-12 border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-xl"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="celular" className="text-gray-700 font-medium">
              Celular
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                id="celular"
                placeholder="(11) 99999-9999"
                value={clienteData.celular}
                onChange={(e) => setClienteData({ ...clienteData, celular: e.target.value })}
                className="pl-11 h-12 border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-xl"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="cep" className="text-gray-700 font-medium">
              CEP
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                id="cep"
                placeholder="00000-000"
                value={clienteData.cep}
                onChange={(e) => setClienteData({ ...clienteData, cep: e.target.value })}
                className="pl-11 h-12 border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-xl"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="cidade" className="text-gray-700 font-medium">
              Cidade
            </Label>
            <Input
              id="cidade"
              placeholder="Nome da cidade"
              value={clienteData.cidade}
              onChange={(e) => setClienteData({ ...clienteData, cidade: e.target.value })}
              className="h-12 border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-xl"
            />
          </div>
        </div>
        <div className="flex gap-4 pt-6">
          <Button
            onClick={() => setStep(1)}
            variant="outline"
            className="flex-1 h-12 border-2 border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <Button
            onClick={handleFinish}
            className="flex-1 h-12 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Finalizar Cadastro
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const renderEmpresaStep = () => (
    <Card className="w-full max-w-4xl shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
      <CardHeader className="text-center pb-6">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Building className="w-8 h-8 text-white" />
          </div>
        </div>
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
          Informações da {step1Data.tipo}
        </CardTitle>
        <CardDescription className="text-gray-600 text-base mt-2">
          Etapa 2 de 2 - Complete o perfil da empresa
        </CardDescription>
        <Progress value={100} className="mt-4 h-2" />
      </CardHeader>
      <CardContent className="space-y-6 px-8 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="cnpj" className="text-gray-700 font-medium">
              CNPJ
            </Label>
            <Input
              id="cnpj"
              placeholder="00.000.000/0000-00"
              value={empresaData.cnpj}
              onChange={(e) => setEmpresaData({ ...empresaData, cnpj: e.target.value })}
              className="h-12 border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nomeFantasia" className="text-gray-700 font-medium">
              Nome Fantasia
            </Label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                id="nomeFantasia"
                placeholder="Nome da empresa"
                value={empresaData.nomeFantasia}
                onChange={(e) => setEmpresaData({ ...empresaData, nomeFantasia: e.target.value })}
                className="pl-11 h-12 border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-xl"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="telefone" className="text-gray-700 font-medium">
              Telefone
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                id="telefone"
                placeholder="(11) 3333-3333"
                value={empresaData.telefone}
                onChange={(e) => setEmpresaData({ ...empresaData, telefone: e.target.value })}
                className="pl-11 h-12 border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-xl"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="responsavel" className="text-gray-700 font-medium">
              Responsável
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                id="responsavel"
                placeholder="Nome do responsável"
                value={empresaData.responsavel}
                onChange={(e) => setEmpresaData({ ...empresaData, responsavel: e.target.value })}
                className="pl-11 h-12 border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-xl"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="cepEmpresa" className="text-gray-700 font-medium">
              CEP
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                id="cepEmpresa"
                placeholder="00000-000"
                value={empresaData.cep}
                onChange={(e) => setEmpresaData({ ...empresaData, cep: e.target.value })}
                className="pl-11 h-12 border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-xl"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="cidadeEmpresa" className="text-gray-700 font-medium">
              Cidade
            </Label>
            <Input
              id="cidadeEmpresa"
              placeholder="Nome da cidade"
              value={empresaData.cidade}
              onChange={(e) => setEmpresaData({ ...empresaData, cidade: e.target.value })}
              className="h-12 border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-xl"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="descritivo" className="text-gray-700 font-medium">
            Descritivo da Empresa
          </Label>
          <Textarea
            id="descritivo"
            placeholder="Descreva sua empresa, serviços oferecidos..."
            value={empresaData.descritivo}
            onChange={(e) => setEmpresaData({ ...empresaData, descritivo: e.target.value })}
            className="min-h-[100px] border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-xl resize-none"
          />
        </div>
        <div className="flex gap-4 pt-6">
          <Button
            onClick={() => setStep(1)}
            variant="outline"
            className="flex-1 h-12 border-2 border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <Button
            onClick={handleFinish}
            className="flex-1 h-12 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Finalizar Cadastro
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-orange-200/30 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-amber-200/30 rounded-full blur-xl"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-yellow-200/30 rounded-full blur-xl"></div>

      {step === 1 && renderStep1()}
      {step === 2 && step1Data.tipo === "cliente" && renderClienteStep()}
      {step === 2 && step1Data.tipo !== "cliente" && step1Data.tipo !== "" && renderEmpresaStep()}
    </div>
  )
}
