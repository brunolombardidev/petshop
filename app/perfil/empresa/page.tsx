"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Building2, Edit, Save, Camera, Users, TrendingUp, Star } from "lucide-react"
import { FloatingButtons } from "@/components/floating-buttons"

export default function PerfilEmpresaPage() {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [empresaData, setEmpresaData] = useState({
    razaoSocial: "Tech Pet Solutions Ltda",
    nomeFantasia: "TechPet",
    cnpj: "12.345.678/0001-90",
    email: "contato@techpet.com.br",
    telefone: "(11) 3333-4444",
    endereco: "Av. Paulista, 1000",
    cidade: "São Paulo",
    cep: "01310-100",
    responsavel: "João Silva",
    setor: "Tecnologia",
  })

  const handleSave = () => {
    setIsEditing(false)
    alert("Perfil da empresa atualizado com sucesso!")
  }

  const estatisticas = {
    funcionarios: 25,
    parcerias: 8,
    avaliacaoMedia: 4.6,
    anoFundacao: 2020,
  }

  const servicos = [
    {
      id: "1",
      nome: "Sistema de Gestão Pet",
      categoria: "Software",
      status: "Ativo",
      clientes: 150,
    },
    {
      id: "2",
      nome: "App Mobile PetCare",
      categoria: "Aplicativo",
      status: "Desenvolvimento",
      clientes: 0,
    },
    {
      id: "3",
      nome: "Consultoria em TI",
      categoria: "Serviço",
      status: "Ativo",
      clientes: 45,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D6DD83]/20 via-[#FFBDB6]/20 to-[#30B2B0]/20">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-indigo-100 sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="hover:bg-indigo-100 rounded-xl"
            >
              <ArrowLeft className="h-5 w-5 text-gray-700" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-900">Perfil da Empresa</h1>
                <p className="text-sm text-gray-600">Gerencie as informações da sua empresa</p>
              </div>
            </div>
          </div>
          <Button
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white rounded-xl"
          >
            {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
            {isEditing ? "Salvar" : "Editar"}
          </Button>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Card da Empresa */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative">
                  <Avatar className="w-32 h-32">
                    <AvatarImage src="/placeholder-logo.png" />
                    <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white text-2xl">
                      {empresaData.nomeFantasia.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 rounded-full w-10 h-10 bg-indigo-500 hover:bg-indigo-600"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{empresaData.nomeFantasia}</h2>
                  <p className="text-indigo-600 font-medium mb-2">{empresaData.razaoSocial}</p>
                  <p className="text-gray-600 mb-4">{empresaData.email}</p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-2">
                    <Badge className="bg-indigo-100 text-indigo-800 border-0">Empresa Parceira</Badge>
                    <Badge className="bg-green-100 text-green-800 border-0">Verificada</Badge>
                    <Badge className="bg-blue-100 text-blue-800 border-0">Setor: {empresaData.setor}</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Estatísticas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-2xl">
              <CardContent className="p-4 text-center">
                <Users className="w-8 h-8 mx-auto mb-2" />
                <p className="text-2xl font-bold">{estatisticas.funcionarios}</p>
                <p className="text-sm text-indigo-100">Funcionários</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl">
              <CardContent className="p-4 text-center">
                <TrendingUp className="w-8 h-8 mx-auto mb-2" />
                <p className="text-2xl font-bold">{estatisticas.parcerias}</p>
                <p className="text-sm text-blue-100">Parcerias</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-2xl">
              <CardContent className="p-4 text-center">
                <Star className="w-8 h-8 mx-auto mb-2" />
                <p className="text-2xl font-bold">{estatisticas.avaliacaoMedia}</p>
                <p className="text-sm text-yellow-100">Avaliação</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl">
              <CardContent className="p-4 text-center">
                <Building2 className="w-8 h-8 mx-auto mb-2" />
                <p className="text-2xl font-bold">{estatisticas.anoFundacao}</p>
                <p className="text-sm text-green-100">Fundação</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="dados" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 bg-white/80 backdrop-blur-sm rounded-2xl p-1">
              <TabsTrigger value="dados" className="rounded-xl">
                Dados da Empresa
              </TabsTrigger>
              <TabsTrigger value="servicos" className="rounded-xl">
                Serviços
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dados">
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">Informações da Empresa</CardTitle>
                  <CardDescription>Mantenha os dados da sua empresa atualizados</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="razaoSocial">Razão Social</Label>
                      <Input
                        id="razaoSocial"
                        value={empresaData.razaoSocial}
                        onChange={(e) => setEmpresaData({ ...empresaData, razaoSocial: e.target.value })}
                        disabled={!isEditing}
                        className="h-12 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nomeFantasia">Nome Fantasia</Label>
                      <Input
                        id="nomeFantasia"
                        value={empresaData.nomeFantasia}
                        onChange={(e) => setEmpresaData({ ...empresaData, nomeFantasia: e.target.value })}
                        disabled={!isEditing}
                        className="h-12 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cnpj">CNPJ</Label>
                      <Input
                        id="cnpj"
                        value={empresaData.cnpj}
                        onChange={(e) => setEmpresaData({ ...empresaData, cnpj: e.target.value })}
                        disabled={!isEditing}
                        className="h-12 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        id="email"
                        type="email"
                        value={empresaData.email}
                        onChange={(e) => setEmpresaData({ ...empresaData, email: e.target.value })}
                        disabled={!isEditing}
                        className="h-12 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input
                        id="telefone"
                        value={empresaData.telefone}
                        onChange={(e) => setEmpresaData({ ...empresaData, telefone: e.target.value })}
                        disabled={!isEditing}
                        className="h-12 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="responsavel">Responsável</Label>
                      <Input
                        id="responsavel"
                        value={empresaData.responsavel}
                        onChange={(e) => setEmpresaData({ ...empresaData, responsavel: e.target.value })}
                        disabled={!isEditing}
                        className="h-12 rounded-xl"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="servicos">
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">Serviços Oferecidos</CardTitle>
                  <CardDescription>Produtos e serviços da sua empresa</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {servicos.map((servico) => (
                      <div key={servico.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div>
                          <p className="font-medium text-gray-900">{servico.nome}</p>
                          <p className="text-sm text-gray-600">{servico.categoria}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">{servico.clientes} clientes</p>
                          <Badge
                            className={`${
                              servico.status === "Ativo"
                                ? "bg-green-100 text-green-800"
                                : servico.status === "Desenvolvimento"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                            } border-0`}
                          >
                            {servico.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <FloatingButtons />
      <div className="pb-20"></div>
    </div>
  )
}
