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
import { ArrowLeft, User, Edit, Save, Camera, Heart, ShoppingBag, Star } from "lucide-react"
import { FloatingButtons } from "@/components/floating-buttons"

export default function PerfilClientePage() {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState({
    nome: "Maria Silva Santos",
    email: "maria.silva@email.com",
    telefone: "(11) 99999-9999",
    cpf: "123.456.789-00",
    endereco: "Rua das Flores, 123",
    cidade: "São Paulo",
    cep: "01234-567",
    dataNascimento: "1985-03-15",
    genero: "Feminino",
  })

  const handleSave = () => {
    setIsEditing(false)
    // Simular salvamento
    alert("Perfil atualizado com sucesso!")
  }

  const estatisticas = {
    petsRegistrados: 3,
    comprasRealizadas: 15,
    avaliacaoMedia: 4.8,
    pontosFidelidade: 1250,
  }

  const comprasRecentes = [
    {
      id: "1",
      data: "15/12/2024",
      estabelecimento: "PetShop Vida Animal",
      valor: 89.9,
      status: "Entregue",
    },
    {
      id: "2",
      data: "10/12/2024",
      estabelecimento: "Clínica Veterinária Central",
      valor: 150.0,
      status: "Concluído",
    },
    {
      id: "3",
      data: "05/12/2024",
      estabelecimento: "PetShop Premium",
      valor: 45.5,
      status: "Entregue",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D6DD83]/20 via-[#FFBDB6]/20 to-[#30B2B0]/20">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-pink-100 sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="hover:bg-pink-100 rounded-xl">
              <ArrowLeft className="h-5 w-5 text-gray-700" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-900">Perfil do Cliente</h1>
                <p className="text-sm text-gray-600">Gerencie suas informações pessoais</p>
              </div>
            </div>
          </div>
          <Button
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white rounded-xl"
          >
            {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
            {isEditing ? "Salvar" : "Editar"}
          </Button>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Card do Perfil */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative">
                  <Avatar className="w-32 h-32">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback className="bg-gradient-to-br from-pink-500 to-pink-600 text-white text-2xl">
                      {userData.nome
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 rounded-full w-10 h-10 bg-pink-500 hover:bg-pink-600"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{userData.nome}</h2>
                  <p className="text-pink-600 font-medium mb-4">{userData.email}</p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-2">
                    <Badge className="bg-pink-100 text-pink-800 border-0">Cliente Premium</Badge>
                    <Badge className="bg-green-100 text-green-800 border-0">Verificado</Badge>
                    <Badge className="bg-blue-100 text-blue-800 border-0">Membro desde 2023</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Estatísticas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-2xl">
              <CardContent className="p-4 text-center">
                <Heart className="w-8 h-8 mx-auto mb-2" />
                <p className="text-2xl font-bold">{estatisticas.petsRegistrados}</p>
                <p className="text-sm text-pink-100">Pets</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl">
              <CardContent className="p-4 text-center">
                <ShoppingBag className="w-8 h-8 mx-auto mb-2" />
                <p className="text-2xl font-bold">{estatisticas.comprasRealizadas}</p>
                <p className="text-sm text-blue-100">Compras</p>
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
                <Star className="w-8 h-8 mx-auto mb-2" />
                <p className="text-2xl font-bold">{estatisticas.pontosFidelidade}</p>
                <p className="text-sm text-green-100">Pontos</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="dados" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 bg-white/80 backdrop-blur-sm rounded-2xl p-1">
              <TabsTrigger value="dados" className="rounded-xl">
                Dados Pessoais
              </TabsTrigger>
              <TabsTrigger value="historico" className="rounded-xl">
                Histórico
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dados">
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">Informações Pessoais</CardTitle>
                  <CardDescription>Mantenha seus dados sempre atualizados</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome Completo</Label>
                      <Input
                        id="nome"
                        value={userData.nome}
                        onChange={(e) => setUserData({ ...userData, nome: e.target.value })}
                        disabled={!isEditing}
                        className="h-12 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        id="email"
                        type="email"
                        value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        disabled={!isEditing}
                        className="h-12 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input
                        id="telefone"
                        value={userData.telefone}
                        onChange={(e) => setUserData({ ...userData, telefone: e.target.value })}
                        disabled={!isEditing}
                        className="h-12 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cpf">CPF</Label>
                      <Input
                        id="cpf"
                        value={userData.cpf}
                        onChange={(e) => setUserData({ ...userData, cpf: e.target.value })}
                        disabled={!isEditing}
                        className="h-12 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endereco">Endereço</Label>
                      <Input
                        id="endereco"
                        value={userData.endereco}
                        onChange={(e) => setUserData({ ...userData, endereco: e.target.value })}
                        disabled={!isEditing}
                        className="h-12 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cidade">Cidade</Label>
                      <Input
                        id="cidade"
                        value={userData.cidade}
                        onChange={(e) => setUserData({ ...userData, cidade: e.target.value })}
                        disabled={!isEditing}
                        className="h-12 rounded-xl"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="historico">
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">Histórico de Compras</CardTitle>
                  <CardDescription>Suas últimas transações</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {comprasRecentes.map((compra) => (
                      <div key={compra.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div>
                          <p className="font-medium text-gray-900">{compra.estabelecimento}</p>
                          <p className="text-sm text-gray-600">{compra.data}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">R$ {compra.valor.toFixed(2)}</p>
                          <Badge
                            className={`${
                              compra.status === "Entregue"
                                ? "bg-green-100 text-green-800"
                                : compra.status === "Concluído"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-yellow-100 text-yellow-800"
                            } border-0`}
                          >
                            {compra.status}
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
