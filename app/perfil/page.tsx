"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  User,
  Building,
  Package,
  Edit,
  Save,
  X,
  Camera,
  Star,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Clock,
  Truck,
  Users,
  PawPrint,
  Gift,
  Heart,
  ArrowLeft,
} from "lucide-react"
import { FloatingButtons } from "@/components/floating-buttons"

type UserType = "cliente" | "petshop" | "fornecedor" | "empresa" | "administrador"

export default function UnifiedPerfilPage() {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [userType, setUserType] = useState<UserType>("cliente")

  // Estados para diferentes tipos de perfil
  const [clienteData, setClienteData] = useState({
    nome: "Maria Silva",
    email: "maria.silva@email.com",
    cpf: "123.456.789-00",
    nascimento: "1985-03-15",
    telefone: "(11) 99999-9999",
    celular: "(11) 98888-8888",
    cep: "01234-567",
    logradouro: "Rua das Flores, 123",
    numero: "123",
    complemento: "Apto 45",
    bairro: "Centro",
    cidade: "São Paulo",
    estado: "SP",
    pais: "Brasil",
  })

  const [empresaData, setEmpresaData] = useState({
    nomeFantasia: "PetShop Amigo Fiel",
    cnpj: "12.345.678/0001-90",
    area: "Petshop e Clínica Veterinária",
    descritivo:
      "Há mais de 15 anos cuidando dos seus pets com amor e dedicação. Oferecemos serviços completos de banho e tosa, consultas veterinárias, cirurgias e uma grande variedade de produtos para seu melhor amigo.",
    telefone: "(11) 3333-4444",
    email: "contato@amigofiel.com",
    responsavel: "João Silva",
    redesSociais: "@petshopamigofiel",
    horarioFuncionamento: "Segunda a Sábado: 8h às 18h",
    cep: "01234-567",
    logradouro: "Rua das Flores, 123",
    numero: "123",
    complemento: "Loja 1",
    bairro: "Centro",
    cidade: "São Paulo",
    estado: "SP",
    pais: "Brasil",
  })

  const [editData, setEditData] = useState<any>({})

  useEffect(() => {
    // Pega o tipo de usuário do localStorage
    const typeFromStorage = localStorage.getItem("userType") as UserType
    if (typeFromStorage) {
      setUserType(typeFromStorage)
      // Inicializa os dados de edição baseado no tipo
      if (typeFromStorage === "cliente") {
        setEditData(clienteData)
      } else {
        setEditData(empresaData)
      }
    } else {
      router.push("/")
    }
  }, [])

  const handleSave = () => {
    if (userType === "cliente") {
      setClienteData(editData)
    } else {
      setEmpresaData(editData)
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    if (userType === "cliente") {
      setEditData(clienteData)
    } else {
      setEditData(empresaData)
    }
    setIsEditing(false)
  }

  const getProfileIcon = () => {
    switch (userType) {
      case "cliente":
        return <User className="w-5 h-5 text-white" />
      case "petshop":
        return <Building className="w-5 h-5 text-white" />
      case "fornecedor":
        return <Package className="w-5 h-5 text-white" />
      case "empresa":
        return <Building className="w-5 h-5 text-white" />
      case "administrador":
        return <User className="w-5 h-5 text-white" />
      default:
        return <User className="w-5 h-5 text-white" />
    }
  }

  const getProfileColor = () => {
    switch (userType) {
      case "cliente":
        return "from-pink-400 to-pink-500"
      case "petshop":
        return "from-blue-400 to-blue-500"
      case "fornecedor":
        return "from-purple-400 to-purple-500"
      case "empresa":
        return "from-indigo-400 to-indigo-500"
      case "administrador":
        return "from-orange-400 to-orange-500"
      default:
        return "from-gray-400 to-gray-500"
    }
  }

  const getCurrentData = () => {
    return userType === "cliente" ? clienteData : empresaData
  }

  const renderPersonalInfo = () => {
    const currentData = getCurrentData()

    if (userType === "cliente") {
      return (
        <>
          {/* Informações Pessoais */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <User className="w-5 h-5 text-pink-500" />
                Informações Pessoais
              </CardTitle>
              <CardDescription className="text-gray-600">Seus dados pessoais</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nome" className="text-gray-700 font-medium">
                    Nome Completo
                  </Label>
                  {isEditing ? (
                    <Input
                      id="nome"
                      value={editData.nome || ""}
                      onChange={(e) => setEditData({ ...editData, nome: e.target.value })}
                      className="h-12 border-gray-200 focus:border-pink-400 focus:ring-pink-400/20 rounded-xl"
                    />
                  ) : (
                    <div className="h-12 flex items-center px-3 bg-gray-50 rounded-xl">
                      <span className="text-gray-900">{currentData.nome}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cpf" className="text-gray-700 font-medium">
                    CPF
                  </Label>
                  {isEditing ? (
                    <Input
                      id="cpf"
                      value={editData.cpf || ""}
                      onChange={(e) => setEditData({ ...editData, cpf: e.target.value })}
                      className="h-12 border-gray-200 focus:border-pink-400 focus:ring-pink-400/20 rounded-xl"
                    />
                  ) : (
                    <div className="h-12 flex items-center px-3 bg-gray-50 rounded-xl">
                      <span className="text-gray-900">{currentData.cpf}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="nascimento" className="text-gray-700 font-medium">
                    Data de Nascimento
                  </Label>
                  {isEditing ? (
                    <Input
                      id="nascimento"
                      type="date"
                      value={editData.nascimento || ""}
                      onChange={(e) => setEditData({ ...editData, nascimento: e.target.value })}
                      className="h-12 border-gray-200 focus:border-pink-400 focus:ring-pink-400/20 rounded-xl"
                    />
                  ) : (
                    <div className="h-12 flex items-center px-3 bg-gray-50 rounded-xl">
                      <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-900">
                        {new Date(currentData.nascimento).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informações de Contato */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Phone className="w-5 h-5 text-pink-500" />
                Informações de Contato
              </CardTitle>
              <CardDescription className="text-gray-600">Seus dados de contato</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium">
                    E-mail
                  </Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={editData.email || ""}
                      onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                      className="h-12 border-gray-200 focus:border-pink-400 focus:ring-pink-400/20 rounded-xl"
                    />
                  ) : (
                    <div className="h-12 flex items-center px-3 bg-gray-50 rounded-xl">
                      <Mail className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-900">{currentData.email}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="celular" className="text-gray-700 font-medium">
                    Celular
                  </Label>
                  {isEditing ? (
                    <Input
                      id="celular"
                      value={editData.celular || ""}
                      onChange={(e) => setEditData({ ...editData, celular: e.target.value })}
                      className="h-12 border-gray-200 focus:border-pink-400 focus:ring-pink-400/20 rounded-xl"
                    />
                  ) : (
                    <div className="h-12 flex items-center px-3 bg-gray-50 rounded-xl">
                      <Phone className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-900">{currentData.celular}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="telefone" className="text-gray-700 font-medium">
                    Telefone Fixo
                  </Label>
                  {isEditing ? (
                    <Input
                      id="telefone"
                      value={editData.telefone || ""}
                      onChange={(e) => setEditData({ ...editData, telefone: e.target.value })}
                      className="h-12 border-gray-200 focus:border-pink-400 focus:ring-pink-400/20 rounded-xl"
                    />
                  ) : (
                    <div className="h-12 flex items-center px-3 bg-gray-50 rounded-xl">
                      <Phone className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-900">{currentData.telefone}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )
    } else {
      // Para empresas, petshops, fornecedores
      return (
        <>
          {/* Sobre a Empresa */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                {userType === "petshop" && <Building className="w-5 h-5 text-blue-500" />}
                {userType === "fornecedor" && <Package className="w-5 h-5 text-purple-500" />}
                {userType === "empresa" && <Building className="w-5 h-5 text-indigo-500" />}
                {userType === "petshop" && "Sobre Nós"}
                {userType === "fornecedor" && "Sobre Nossa Empresa"}
                {userType === "empresa" && "Sobre Nossa Empresa"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Textarea
                  value={editData.descritivo || ""}
                  onChange={(e) => setEditData({ ...editData, descritivo: e.target.value })}
                  className="min-h-[120px] border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl resize-none"
                  placeholder="Descreva sua empresa..."
                />
              ) : (
                <p className="text-gray-700 leading-relaxed">{currentData.descritivo}</p>
              )}
            </CardContent>
          </Card>

          {/* Informações da Empresa */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                {userType === "petshop" && <Building className="w-5 h-5 text-blue-500" />}
                {userType === "fornecedor" && <Package className="w-5 h-5 text-purple-500" />}
                {userType === "empresa" && <Building className="w-5 h-5 text-indigo-500" />}
                {userType === "petshop" && "Informações da Empresa"}
                {userType === "fornecedor" && "Informações da Empresa"}
                {userType === "empresa" && "Informações Corporativas"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nomeFantasia" className="text-gray-700 font-medium">
                    {userType === "empresa" ? "Razão Social" : "Nome Fantasia"}
                  </Label>
                  {isEditing ? (
                    <Input
                      id="nomeFantasia"
                      value={editData.nomeFantasia || ""}
                      onChange={(e) => setEditData({ ...editData, nomeFantasia: e.target.value })}
                      className="h-12 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl"
                    />
                  ) : (
                    <div className="h-12 flex items-center px-3 bg-gray-50 rounded-xl">
                      <span className="text-gray-900">{currentData.nomeFantasia}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cnpj" className="text-gray-700 font-medium">
                    CNPJ
                  </Label>
                  {isEditing ? (
                    <Input
                      id="cnpj"
                      value={editData.cnpj || ""}
                      onChange={(e) => setEditData({ ...editData, cnpj: e.target.value })}
                      className="h-12 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl"
                    />
                  ) : (
                    <div className="h-12 flex items-center px-3 bg-gray-50 rounded-xl">
                      <span className="text-gray-900">{currentData.cnpj}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="area" className="text-gray-700 font-medium">
                    Área de Atuação
                  </Label>
                  {isEditing ? (
                    <Input
                      id="area"
                      value={editData.area || ""}
                      onChange={(e) => setEditData({ ...editData, area: e.target.value })}
                      className="h-12 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl"
                    />
                  ) : (
                    <div className="h-12 flex items-center px-3 bg-gray-50 rounded-xl">
                      <span className="text-gray-900">{currentData.area}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="responsavel" className="text-gray-700 font-medium">
                    {userType === "empresa" ? "Responsável RH" : "Responsável"}
                  </Label>
                  {isEditing ? (
                    <Input
                      id="responsavel"
                      value={editData.responsavel || ""}
                      onChange={(e) => setEditData({ ...editData, responsavel: e.target.value })}
                      className="h-12 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl"
                    />
                  ) : (
                    <div className="h-12 flex items-center px-3 bg-gray-50 rounded-xl">
                      <span className="text-gray-900">{currentData.responsavel}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="horario" className="text-gray-700 font-medium">
                    {userType === "fornecedor" ? "Horário de Atendimento" : "Horário de Funcionamento"}
                  </Label>
                  {isEditing ? (
                    <Input
                      id="horario"
                      value={editData.horarioFuncionamento || ""}
                      onChange={(e) => setEditData({ ...editData, horarioFuncionamento: e.target.value })}
                      className="h-12 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl"
                    />
                  ) : (
                    <div className="h-12 flex items-center px-3 bg-gray-50 rounded-xl">
                      <Clock className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-900">{currentData.horarioFuncionamento}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="redes" className="text-gray-700 font-medium">
                    Redes Sociais
                  </Label>
                  {isEditing ? (
                    <Input
                      id="redes"
                      value={editData.redesSociais || ""}
                      onChange={(e) => setEditData({ ...editData, redesSociais: e.target.value })}
                      className="h-12 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl"
                    />
                  ) : (
                    <div className="h-12 flex items-center px-3 bg-gray-50 rounded-xl">
                      <span className="text-gray-900">{currentData.redesSociais}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informações de Contato */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Phone className="w-5 h-5 text-blue-500" />
                Informações de Contato
              </CardTitle>
              <CardDescription className="text-gray-600">Dados de contato da empresa</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium">
                    E-mail
                  </Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={editData.email || ""}
                      onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                      className="h-12 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl"
                    />
                  ) : (
                    <div className="h-12 flex items-center px-3 bg-gray-50 rounded-xl">
                      <Mail className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-900">{currentData.email}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefone" className="text-gray-700 font-medium">
                    Telefone
                  </Label>
                  {isEditing ? (
                    <Input
                      id="telefone"
                      value={editData.telefone || ""}
                      onChange={(e) => setEditData({ ...editData, telefone: e.target.value })}
                      className="h-12 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl"
                    />
                  ) : (
                    <div className="h-12 flex items-center px-3 bg-gray-50 rounded-xl">
                      <Phone className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-900">{currentData.telefone}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )
    }
  }

  const currentData = getCurrentData()

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
              <div
                className={`w-10 h-10 bg-gradient-to-br ${getProfileColor()} rounded-xl flex items-center justify-center shadow-lg`}
              >
                {getProfileIcon()}
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-900">Perfil</h1>
                <p className="text-sm text-gray-600">Gerencie seus dados pessoais</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Botão Editar Perfil - Logo abaixo do header */}
      <div className="px-6 py-6">
        <div className="max-w-4xl mx-auto flex justify-center">
          {!isEditing ? (
            <Button
              onClick={() => setIsEditing(true)}
              className={`rounded-xl bg-gradient-to-r px-8 py-3 ${
                userType === "cliente"
                  ? "from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700"
                  : userType === "petshop"
                    ? "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                    : userType === "fornecedor"
                      ? "from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
                      : "from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700"
              }`}
            >
              <Edit className="w-4 h-4 mr-2" />
              Editar Perfil
            </Button>
          ) : (
            <div className="flex gap-4">
              <Button onClick={handleCancel} variant="outline" className="rounded-xl px-6 py-3">
                <X className="w-4 h-4 mr-2" />
                Cancelar
              </Button>
              <Button
                onClick={handleSave}
                className="rounded-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 px-6 py-3"
              >
                <Save className="w-4 h-4 mr-2" />
                Salvar
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Conteúdo Principal */}
      <main className="px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Card Principal do Perfil */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden">
            {/* Cover/Banner */}
            <div className={`h-32 bg-gradient-to-r ${getProfileColor()} relative`}>
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute top-4 right-4">
                <Badge className="bg-white/90 text-gray-700 border-0 px-3 py-1">
                  {userType === "cliente" && <Heart className="w-4 h-4 mr-1" />}
                  {userType === "petshop" && <Star className="w-4 h-4 mr-1" />}
                  {userType === "fornecedor" && <Star className="w-4 h-4 mr-1" />}
                  {userType === "empresa" && <Building className="w-4 h-4 mr-1" />}
                  {userType === "cliente" && "Pet Lover"}
                  {userType === "petshop" && "4.8 ⭐"}
                  {userType === "fornecedor" && "4.7 ⭐"}
                  {userType === "empresa" && "Empresa Parceira"}
                </Badge>
              </div>
            </div>

            {/* Foto/Logo e Info Principal */}
            <CardContent className="relative px-8 pb-8">
              <div className="flex flex-col md:flex-row items-start gap-6 -mt-16">
                {/* Foto/Logo */}
                <div className="relative">
                  <div
                    className={`w-32 h-32 rounded-2xl border-4 border-white shadow-xl overflow-hidden bg-gradient-to-br ${getProfileColor()} flex items-center justify-center`}
                  >
                    {getProfileIcon()}
                  </div>
                  {isEditing && (
                    <Button
                      size="icon"
                      className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-gray-700 shadow-lg"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                {/* Informações Principais */}
                <div className="flex-1 mt-4 md:mt-16">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900">
                        {userType === "cliente" ? currentData.nome : currentData.nomeFantasia}
                      </h2>
                      <p className="text-gray-600 flex items-center gap-2 mt-1">
                        {userType === "cliente" ? (
                          <>
                            <Mail className="w-4 h-4" />
                            {currentData.email}
                          </>
                        ) : (
                          <>
                            <Building className="w-4 h-4" />
                            {currentData.area}
                          </>
                        )}
                      </p>
                      <p className="text-gray-600 flex items-center gap-2 mt-1">
                        <MapPin className="w-4 h-4" />
                        {currentData.cidade}, {currentData.estado}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 mt-4 md:mt-0">
                      {userType === "cliente" && (
                        <>
                          <Badge className="bg-pink-100 text-pink-800 border-0 px-4 py-2">
                            <Heart className="w-4 h-4 mr-2" />
                            Pet Lover
                          </Badge>
                          <Badge className="bg-purple-100 text-purple-800 border-0 px-4 py-2">
                            <Star className="w-4 h-4 mr-2" />
                            Cliente Premium
                          </Badge>
                        </>
                      )}
                      {userType === "petshop" && (
                        <>
                          <Badge className="bg-green-100 text-green-800 border-0 px-4 py-2">
                            <Clock className="w-4 h-4 mr-2" />
                            Aberto
                          </Badge>
                          <Badge className="bg-blue-100 text-blue-800 border-0 px-4 py-2">Verificado ✓</Badge>
                        </>
                      )}
                      {userType === "fornecedor" && (
                        <>
                          <Badge className="bg-green-100 text-green-800 border-0 px-4 py-2">
                            <Truck className="w-4 h-4 mr-2" />
                            Entrega Rápida
                          </Badge>
                          <Badge className="bg-purple-100 text-purple-800 border-0 px-4 py-2">Fornecedor Premium</Badge>
                        </>
                      )}
                      {userType === "empresa" && (
                        <>
                          <Badge className="bg-green-100 text-green-800 border-0 px-4 py-2">
                            <Users className="w-4 h-4 mr-2" />
                            247 Colaboradores
                          </Badge>
                          <Badge className="bg-indigo-100 text-indigo-800 border-0 px-4 py-2">
                            Empresa Verificada ✓
                          </Badge>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Estatísticas */}
                  <div className="grid grid-cols-3 gap-6 p-4 bg-gray-50 rounded-xl">
                    {userType === "cliente" && (
                      <>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">3</p>
                          <p className="text-sm text-gray-600">Pets Cadastrados</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">24</p>
                          <p className="text-sm text-gray-600">Serviços Utilizados</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">1,250</p>
                          <p className="text-sm text-gray-600">Pontos Acumulados</p>
                        </div>
                      </>
                    )}
                    {userType === "petshop" && (
                      <>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">456</p>
                          <p className="text-sm text-gray-600">Clientes</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">789</p>
                          <p className="text-sm text-gray-600">Pets Atendidos</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">89</p>
                          <p className="text-sm text-gray-600">Produtos</p>
                        </div>
                      </>
                    )}
                    {userType === "fornecedor" && (
                      <>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">234</p>
                          <p className="text-sm text-gray-600">Clientes Ativos</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">156</p>
                          <p className="text-sm text-gray-600">Produtos</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">12k</p>
                          <p className="text-sm text-gray-600">Alcance Mensal</p>
                        </div>
                      </>
                    )}
                    {userType === "empresa" && (
                      <>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">1,456</p>
                          <p className="text-sm text-gray-600">Pets Assistidos</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">R$ 45.2k</p>
                          <p className="text-sm text-gray-600">Investimento Mensal</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">87%</p>
                          <p className="text-sm text-gray-600">Satisfação</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informações Pessoais/Empresariais */}
          {renderPersonalInfo()}

          {/* Endereço */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <MapPin
                  className={`w-5 h-5 ${
                    userType === "cliente"
                      ? "text-pink-500"
                      : userType === "petshop"
                        ? "text-blue-500"
                        : userType === "fornecedor"
                          ? "text-purple-500"
                          : "text-indigo-500"
                  }`}
                />
                {userType === "cliente" ? "Endereço" : "Localização"}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {userType === "cliente" ? "Informações de localização" : "Endereço da empresa"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="cep" className="text-gray-700 font-medium">
                    CEP
                  </Label>
                  {isEditing ? (
                    <Input
                      id="cep"
                      value={editData.cep || ""}
                      onChange={(e) => setEditData({ ...editData, cep: e.target.value })}
                      className="h-12 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl"
                    />
                  ) : (
                    <div className="h-12 flex items-center px-3 bg-gray-50 rounded-xl">
                      <span className="text-gray-900">{currentData.cep}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cidade" className="text-gray-700 font-medium">
                    Cidade
                  </Label>
                  {isEditing ? (
                    <Input
                      id="cidade"
                      value={editData.cidade || ""}
                      onChange={(e) => setEditData({ ...editData, cidade: e.target.value })}
                      className="h-12 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl"
                    />
                  ) : (
                    <div className="h-12 flex items-center px-3 bg-gray-50 rounded-xl">
                      <span className="text-gray-900">{currentData.cidade}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="logradouro" className="text-gray-700 font-medium">
                    {userType === "cliente" ? "Logradouro" : "Endereço Completo"}
                  </Label>
                  {isEditing ? (
                    <Input
                      id="logradouro"
                      value={editData.logradouro || ""}
                      onChange={(e) => setEditData({ ...editData, logradouro: e.target.value })}
                      className="h-12 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl"
                    />
                  ) : (
                    <div className="h-12 flex items-center px-3 bg-gray-50 rounded-xl">
                      <span className="text-gray-900">{currentData.logradouro}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bairro" className="text-gray-700 font-medium">
                    Bairro
                  </Label>
                  {isEditing ? (
                    <Input
                      id="bairro"
                      value={editData.bairro || ""}
                      onChange={(e) => setEditData({ ...editData, bairro: e.target.value })}
                      className="h-12 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl"
                    />
                  ) : (
                    <div className="h-12 flex items-center px-3 bg-gray-50 rounded-xl">
                      <span className="text-gray-900">{currentData.bairro}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estado" className="text-gray-700 font-medium">
                    Estado
                  </Label>
                  {isEditing ? (
                    <Input
                      id="estado"
                      value={editData.estado || ""}
                      onChange={(e) => setEditData({ ...editData, estado: e.target.value })}
                      className="h-12 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl"
                    />
                  ) : (
                    <div className="h-12 flex items-center px-3 bg-gray-50 rounded-xl">
                      <span className="text-gray-900">{currentData.estado}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Meus Pets - Apenas para clientes */}
          {userType === "cliente" && (
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <Heart className="w-5 h-5 text-red-500" />
                      Meus Pets
                    </CardTitle>
                    <CardDescription className="text-gray-600">Seus companheiros cadastrados</CardDescription>
                  </div>
                  <Button onClick={() => router.push("/meus-pets")} variant="outline" className="rounded-xl">
                    Ver Todos
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl hover:shadow-lg transition-all duration-200 cursor-pointer group"
                    onClick={() => router.push("/pet/1")}
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                      <PawPrint className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Rex</p>
                      <p className="text-sm text-gray-600">Golden Retriever</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-xs text-gray-500">5 anos</span>
                      </div>
                    </div>
                  </div>

                  <div
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-pink-50 to-pink-100 rounded-2xl hover:shadow-lg transition-all duration-200 cursor-pointer group"
                    onClick={() => router.push("/pet/2")}
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                      <PawPrint className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Mimi</p>
                      <p className="text-sm text-gray-600">Gato Persa</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-xs text-gray-500">3 anos</span>
                      </div>
                    </div>
                  </div>

                  <div
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl hover:shadow-lg transition-all duration-200 cursor-pointer group"
                    onClick={() => router.push("/pet/3")}
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                      <PawPrint className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Thor</p>
                      <p className="text-sm text-gray-600">Pastor Alemão</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-xs text-gray-500">7 anos</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Benefícios Pet - Apenas para empresas */}
          {userType === "empresa" && (
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Gift className="w-5 h-5 text-indigo-500" />
                  Benefícios Pet Oferecidos
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Planos e benefícios para os pets dos colaboradores
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                        <PawPrint className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">Plano Básico</p>
                        <p className="text-sm text-gray-600">156 colaboradores</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">Consultas veterinárias e descontos em produtos</p>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-100 rounded-2xl">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                        <PawPrint className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">Plano Premium</p>
                        <p className="text-sm text-gray-600">78 colaboradores</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">Cobertura completa + emergências 24h</p>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-100 rounded-2xl">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center">
                        <PawPrint className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">Plano Família</p>
                        <p className="text-sm text-gray-600">13 colaboradores</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">Cobertura estendida para múltiplos pets</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      {/* Botões Flutuantes */}
      <FloatingButtons />

      {/* Espaçamento para botões flutuantes */}
      <div className="pb-20"></div>
    </div>
  )
}
