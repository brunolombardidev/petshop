"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, Camera, Save, Shield } from "lucide-react"
import { FloatingButtons } from "@/components/floating-buttons"

export default function PerfilPage() {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    nome: "Maria Silva",
    email: "maria.silva@email.com",
    telefone: "(11) 99999-9999",
    endereco: "Rua das Flores, 123 - São Paulo, SP",
    dataNascimento: "1985-03-15",
    cpf: "123.456.789-00",
    tipoUsuario: "Cliente",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = () => {
    // Aqui você implementaria a lógica para salvar os dados
    console.log("Dados salvos:", formData)
    setIsEditing(false)
  }

  const getTipoUsuarioBadge = (tipo: string) => {
    switch (tipo.toLowerCase()) {
      case "cliente":
        return <Badge className="bg-blue-100 text-blue-800 border-0">Cliente</Badge>
      case "petshop":
        return <Badge className="bg-purple-100 text-purple-800 border-0">Petshop</Badge>
      case "empresa":
        return <Badge className="bg-green-100 text-green-800 border-0">Empresa</Badge>
      case "fornecedor":
        return <Badge className="bg-orange-100 text-orange-800 border-0">Fornecedor</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-0">{tipo}</Badge>
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
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-bpet-primary to-bpet-secondary rounded-xl flex items-center justify-center shadow-lg">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-900">Meu Perfil</h1>
                <p className="text-sm text-gray-600">Gerencie suas informações pessoais</p>
              </div>
            </div>
          </div>
          <Button
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            className="rounded-xl bg-gradient-to-r from-bpet-primary to-bpet-secondary hover:from-bpet-secondary hover:to-bpet-primary"
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4 mr-2" />
                Salvar
              </>
            ) : (
              "Editar Perfil"
            )}
          </Button>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Card Principal do Perfil */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Avatar e Informações Básicas */}
                <div className="lg:w-1/3">
                  <div className="text-center">
                    <div className="relative inline-block">
                      <Avatar className="w-32 h-32 mx-auto mb-4">
                        <AvatarImage src="/placeholder-user.jpg" alt={formData.nome} />
                        <AvatarFallback className="text-2xl bg-gradient-to-br from-bpet-primary to-bpet-secondary text-white">
                          {formData.nome
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <Button
                        size="icon"
                        className="absolute bottom-4 right-4 rounded-full bg-white/90 hover:bg-white text-gray-700 shadow-lg"
                      >
                        <Camera className="w-4 h-4" />
                      </Button>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{formData.nome}</h2>
                    {getTipoUsuarioBadge(formData.tipoUsuario)}
                  </div>

                  {/* Estatísticas */}
                  <div className="mt-8 space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <span className="text-gray-600">Membro desde</span>
                      <span className="font-semibold text-gray-900">Jan 2024</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <span className="text-gray-600">Pets cadastrados</span>
                      <span className="font-semibold text-gray-900">3</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <span className="text-gray-600">Consultas realizadas</span>
                      <span className="font-semibold text-gray-900">12</span>
                    </div>
                  </div>
                </div>

                {/* Formulário de Dados */}
                <div className="lg:w-2/3">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="nome" className="text-sm font-medium text-gray-700">
                          Nome Completo
                        </Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            id="nome"
                            type="text"
                            value={formData.nome}
                            onChange={(e) => handleInputChange("nome", e.target.value)}
                            disabled={!isEditing}
                            className="pl-10 h-12 border-gray-200 focus:border-bpet-primary focus:ring-bpet-primary/20 rounded-xl disabled:bg-gray-50"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                          E-mail
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            disabled={!isEditing}
                            className="pl-10 h-12 border-gray-200 focus:border-bpet-primary focus:ring-bpet-primary/20 rounded-xl disabled:bg-gray-50"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="telefone" className="text-sm font-medium text-gray-700">
                          Telefone
                        </Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            id="telefone"
                            type="tel"
                            value={formData.telefone}
                            onChange={(e) => handleInputChange("telefone", e.target.value)}
                            disabled={!isEditing}
                            className="pl-10 h-12 border-gray-200 focus:border-bpet-primary focus:ring-bpet-primary/20 rounded-xl disabled:bg-gray-50"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="dataNascimento" className="text-sm font-medium text-gray-700">
                          Data de Nascimento
                        </Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            id="dataNascimento"
                            type="date"
                            value={formData.dataNascimento}
                            onChange={(e) => handleInputChange("dataNascimento", e.target.value)}
                            disabled={!isEditing}
                            className="pl-10 h-12 border-gray-200 focus:border-bpet-primary focus:ring-bpet-primary/20 rounded-xl disabled:bg-gray-50"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="endereco" className="text-sm font-medium text-gray-700">
                        Endereço
                      </Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="endereco"
                          type="text"
                          value={formData.endereco}
                          onChange={(e) => handleInputChange("endereco", e.target.value)}
                          disabled={!isEditing}
                          className="pl-10 h-12 border-gray-200 focus:border-bpet-primary focus:ring-bpet-primary/20 rounded-xl disabled:bg-gray-50"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cpf" className="text-sm font-medium text-gray-700">
                        CPF
                      </Label>
                      <div className="relative">
                        <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="cpf"
                          type="text"
                          value={formData.cpf}
                          disabled
                          className="pl-10 h-12 border-gray-200 bg-gray-50 rounded-xl"
                        />
                      </div>
                      <p className="text-xs text-gray-500">O CPF não pode ser alterado</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Configurações de Segurança */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-500" />
                Segurança da Conta
              </CardTitle>
              <CardDescription>Gerencie a segurança da sua conta</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <h3 className="font-semibold text-gray-900">Alterar Senha</h3>
                    <p className="text-sm text-gray-600">Última alteração há 3 meses</p>
                  </div>
                  <Button variant="outline" className="rounded-xl bg-transparent">
                    Alterar
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <h3 className="font-semibold text-gray-900">Autenticação em Duas Etapas</h3>
                    <p className="text-sm text-gray-600">Adicione uma camada extra de segurança</p>
                  </div>
                  <Button variant="outline" className="rounded-xl bg-transparent">
                    Configurar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Botões Flutuantes */}
      <FloatingButtons />
    </div>
  )
}
