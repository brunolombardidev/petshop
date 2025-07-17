"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Calendar, MapPin, Bell, PlusCircle, Star, Clock, DollarSign } from "lucide-react"
import { FloatingButtons } from "@/components/floating-buttons"
import { UnifiedHeader } from "@/components/unified-header"

export default function DashboardClientePage() {
  const router = useRouter()
  const [user] = useState({
    name: "Maria Silva",
    email: "maria@email.com",
    avatar: "/placeholder-user.jpg",
    userType: "cliente" as const,
  })

  // Dados mockados
  const proximosAgendamentos = [
    {
      id: "1",
      servico: "Consulta Veterinária",
      petshop: "Clínica VetCare",
      data: "2024-01-20",
      hora: "14:00",
      pet: "Buddy",
      status: "confirmado",
    },
    {
      id: "2",
      servico: "Banho e Tosa",
      petshop: "PetSpa Premium",
      data: "2024-01-22",
      hora: "10:30",
      pet: "Luna",
      status: "pendente",
    },
  ]

  const meusPets = [
    {
      id: "1",
      nome: "Buddy",
      especie: "Cão",
      raca: "Golden Retriever",
      idade: 3,
      proximaVacina: "2024-02-15",
    },
    {
      id: "2",
      nome: "Luna",
      especie: "Gato",
      raca: "Siamês",
      idade: 2,
      proximaVacina: "2024-03-10",
    },
  ]

  const estatisticas = {
    totalPets: meusPets.length,
    agendamentosEsteAno: 12,
    gastosTotais: 1850.0,
    proximasVacinas: 2,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D6DD83]/20 via-[#FFBDB6]/20 to-[#30B2B0]/20">
      {/* Header Unificado */}
      <UnifiedHeader user={user} />

      {/* Conteúdo Principal */}
      <main className="px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Olá, {user.name.split(" ")[0]}! 👋</h1>
            <p className="text-gray-600">
              Bem-vindo ao seu painel de controle. Aqui você pode gerenciar seus pets e agendamentos.
            </p>
          </div>

          {/* Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-bpet-primary to-bpet-secondary text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Meus Pets</p>
                    <p className="text-3xl font-bold">{estatisticas.totalPets}</p>
                  </div>
                  <Heart className="w-8 h-8 text-blue-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-bpet-secondary to-[#D6DD83] text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Agendamentos 2024</p>
                    <p className="text-3xl font-bold">{estatisticas.agendamentosEsteAno}</p>
                  </div>
                  <Calendar className="w-8 h-8 text-green-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-[#D6DD83] to-[#FFBDB6] text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-100 text-sm">Gastos Totais</p>
                    <p className="text-3xl font-bold">R$ {estatisticas.gastosTotais.toFixed(0)}</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-yellow-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-[#FFBDB6] to-bpet-primary text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Próximas Vacinas</p>
                    <p className="text-3xl font-bold">{estatisticas.proximasVacinas}</p>
                  </div>
                  <Bell className="w-8 h-8 text-purple-200" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Ações Rápidas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Button
              onClick={() => router.push("/meus-pets/cadastrar")}
              className="h-16 bg-gradient-to-r from-bpet-primary to-bpet-secondary hover:from-bpet-secondary hover:to-bpet-primary text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <PlusCircle className="w-6 h-6" />
                <span className="font-medium">Cadastrar Pet</span>
              </div>
            </Button>

            <Button
              onClick={() => router.push("/busca")}
              variant="outline"
              className="h-16 border-2 border-gray-200 hover:bg-gray-50 rounded-2xl"
            >
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-gray-600" />
                <span className="font-medium text-gray-700">Buscar Serviços</span>
              </div>
            </Button>

            <Button
              onClick={() => router.push("/cartao-pet")}
              variant="outline"
              className="h-16 border-2 border-gray-200 hover:bg-gray-50 rounded-2xl"
            >
              <div className="flex items-center gap-3">
                <Star className="w-6 h-6 text-gray-600" />
                <span className="font-medium text-gray-700">Cartão Pet</span>
              </div>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Próximos Agendamentos */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  Próximos Agendamentos
                </CardTitle>
                <CardDescription className="text-gray-600">Seus agendamentos nos próximos dias</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {proximosAgendamentos.map((agendamento) => (
                  <div key={agendamento.id} className="p-4 bg-gray-50 rounded-xl border-l-4 border-blue-500">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{agendamento.servico}</h4>
                        <p className="text-sm text-gray-600">{agendamento.petshop}</p>
                      </div>
                      <Badge
                        className={
                          agendamento.status === "confirmado"
                            ? "bg-green-100 text-green-800 border-0"
                            : "bg-yellow-100 text-yellow-800 border-0"
                        }
                      >
                        {agendamento.status === "confirmado" ? "Confirmado" : "Pendente"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(agendamento.data).toLocaleDateString("pt-BR")}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {agendamento.hora}
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        {agendamento.pet}
                      </div>
                    </div>
                  </div>
                ))}

                {proximosAgendamentos.length === 0 && (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600">Nenhum agendamento próximo</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Meus Pets */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-pink-500" />
                  Meus Pets
                </CardTitle>
                <CardDescription className="text-gray-600">Visão geral dos seus pets</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {meusPets.map((pet) => (
                  <div
                    key={pet.id}
                    className="p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => router.push(`/pet/${pet.id}`)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                          <Heart className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{pet.nome}</h4>
                          <p className="text-sm text-gray-600">
                            {pet.raca} • {pet.idade} anos
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Próxima vacina</p>
                        <p className="text-sm font-medium text-blue-600">
                          {new Date(pet.proximaVacina).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                <Button
                  onClick={() => router.push("/meus-pets")}
                  variant="outline"
                  className="w-full h-12 border-2 border-dashed border-gray-300 hover:border-gray-400 rounded-xl"
                >
                  <PlusCircle className="w-5 h-5 mr-2 text-gray-500" />
                  Ver todos os pets
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Botões Flutuantes */}
      <FloatingButtons />
    </div>
  )
}
