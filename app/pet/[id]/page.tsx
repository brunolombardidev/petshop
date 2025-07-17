"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, PawPrint, Calendar, Heart, Syringe, FileText, Camera, Edit, Phone, Mail } from "lucide-react"
import { FloatingButtons } from "@/components/floating-buttons"

// Dados mockados dos pets - em uma aplicação real, isso viria de uma API
const petsData = {
  "1": {
    id: "1",
    nome: "Rex",
    raca: "Golden Retriever",
    porte: "Grande",
    sexo: "Macho",
    nascimento: "2019-03-15",
    idade: "5 anos",
    foto: "/placeholder.svg?height=300&width=300",
    observacoes:
      "Rex é um cão muito dócil e brincalhão. Adora nadar e brincar com bola. Tem alergia a frango, por isso usa ração hipoalergênica. É muito sociável com outros cães e crianças.",
    dono: {
      nome: "Maria Silva",
      telefone: "(11) 99999-9999",
      email: "maria@email.com",
    },
    ultimaConsulta: "2024-01-15",
    proximaVacina: "2024-03-15",
  },
  "2": {
    id: "2",
    nome: "Mimi",
    raca: "Gato Persa",
    porte: "Pequeno",
    sexo: "Fêmea",
    nascimento: "2021-07-20",
    idade: "3 anos",
    foto: "/placeholder.svg?height=300&width=300",
    observacoes:
      "Mimi é uma gata muito carinhosa, mas um pouco tímida com estranhos. Gosta de lugares altos e tem o hábito de dormir no sol. Precisa de escovação diária devido ao pelo longo.",
    dono: {
      nome: "João Santos",
      telefone: "(11) 88888-8888",
      email: "joao@email.com",
    },
    ultimaConsulta: "2024-01-10",
    proximaVacina: "2024-04-20",
  },
  "3": {
    id: "3",
    nome: "Thor",
    raca: "Pastor Alemão",
    porte: "Grande",
    sexo: "Macho",
    nascimento: "2017-11-08",
    idade: "7 anos",
    foto: "/placeholder.svg?height=300&width=300",
    observacoes:
      "Thor é um cão muito inteligente e protetor. Foi treinado como cão de guarda. Precisa de exercícios diários intensos. Tem displasia de quadril leve, controlada com medicação.",
    dono: {
      nome: "Ana Costa",
      telefone: "(11) 77777-7777",
      email: "ana@email.com",
    },
    ultimaConsulta: "2023-12-20",
    proximaVacina: "2024-02-08",
  },
}

export default function PetProfilePage() {
  const router = useRouter()
  const params = useParams()
  const petId = params.id as string
  const [activeTab, setActiveTab] = useState("info")

  // Busca os dados do pet
  const pet = petsData[petId as keyof typeof petsData]

  if (!pet) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-amber-50/30 to-yellow-50/50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="text-center p-8">
            <PawPrint className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Pet não encontrado</h2>
            <p className="text-gray-600 mb-4">O pet que você está procurando não existe.</p>
            <Button onClick={() => router.back()}>Voltar</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const getPorteColor = (porte: string) => {
    switch (porte.toLowerCase()) {
      case "pequeno":
        return "bg-green-100 text-green-800"
      case "médio":
        return "bg-yellow-100 text-yellow-800"
      case "grande":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSexoColor = (sexo: string) => {
    return sexo.toLowerCase() === "macho" ? "bg-blue-100 text-blue-800" : "bg-pink-100 text-pink-800"
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
              className="hover:bg-[#D6DD83]/20 rounded-xl"
            >
              <ArrowLeft className="h-5 w-5 text-gray-700" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-bpet-secondary to-bpet-primary rounded-xl flex items-center justify-center shadow-lg">
                <PawPrint className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-900">Perfil do {pet.nome}</h1>
                <p className="text-sm text-gray-600">{pet.raca}</p>
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm" className="rounded-xl bg-transparent">
            <Edit className="w-4 h-4 mr-2" />
            Editar
          </Button>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Card Principal do Pet */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl mb-8">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Foto do Pet */}
                <div className="lg:col-span-1">
                  <div className="relative">
                    <img
                      src={pet.foto || "/placeholder.svg"}
                      alt={pet.nome}
                      className="w-full aspect-square object-cover rounded-2xl shadow-lg"
                    />
                    <Button
                      size="icon"
                      className="absolute bottom-4 right-4 rounded-full bg-white/90 hover:bg-white text-gray-700 shadow-lg"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Informações do Pet */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{pet.nome}</h2>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge className={`${getPorteColor(pet.porte)} border-0`}>{pet.porte}</Badge>
                      <Badge className={`${getSexoColor(pet.sexo)} border-0`}>{pet.sexo}</Badge>
                      <Badge className="bg-purple-100 text-purple-800 border-0">{pet.idade}</Badge>
                    </div>
                  </div>

                  {/* Informações Básicas */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Raça</label>
                        <p className="text-lg font-semibold text-gray-900">{pet.raca}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                          Data de Nascimento
                        </label>
                        <p className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          {new Date(pet.nascimento).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                          Última Consulta
                        </label>
                        <p className="text-lg font-semibold text-gray-900">
                          {new Date(pet.ultimaConsulta).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                          Próxima Vacina
                        </label>
                        <p className="text-lg font-semibold text-gray-900">
                          {new Date(pet.proximaVacina).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Observações */}
                  <div>
                    <label className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2 block">
                      Observações
                    </label>
                    <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl">{pet.observacoes}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informações do Dono */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl mb-8">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                Informações do Tutor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Heart className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Nome</p>
                    <p className="font-semibold text-gray-900">{pet.dono.nome}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Telefone</p>
                    <p className="font-semibold text-gray-900">{pet.dono.telefone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Mail className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">E-mail</p>
                    <p className="font-semibold text-gray-900">{pet.dono.email}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Botões de Ação */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Button
              className="h-20 flex flex-col gap-3 bg-gradient-to-br from-bpet-primary to-bpet-secondary hover:from-bpet-secondary hover:to-bpet-primary text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 group"
              onClick={() => router.push(`/pet/${petId}/vacinas`)}
            >
              <Syringe className="h-8 w-8 group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-lg">Vacinas Tomadas</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col gap-3 border-2 border-[#30B2B0] text-[#145D5F] hover:bg-[#30B2B0]/10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 group bg-transparent"
              onClick={() => router.push(`/pet/${petId}/historico`)}
            >
              <FileText className="h-8 w-8 group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-lg">Histórico Médico</span>
            </Button>
          </div>
        </div>
      </main>

      {/* Botões Flutuantes */}
      <FloatingButtons />
    </div>
  )
}
