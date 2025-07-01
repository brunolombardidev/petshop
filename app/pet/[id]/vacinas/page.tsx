"use client"

import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Syringe, Calendar, CheckCircle, AlertCircle, Plus } from "lucide-react"
import { FloatingButtons } from "@/components/floating-buttons"

// Dados mockados das vacinas
const vacinasData = {
  "1": [
    {
      id: "1",
      nome: "V10 (Déctupla)",
      data: "2024-01-15",
      veterinario: "Dr. Carlos Silva",
      clinica: "Clínica VetCare",
      lote: "VAC2024001",
      proximaDose: "2025-01-15",
      status: "em_dia",
    },
    {
      id: "2",
      nome: "Antirrábica",
      data: "2024-01-15",
      veterinario: "Dr. Carlos Silva",
      clinica: "Clínica VetCare",
      lote: "RAB2024001",
      proximaDose: "2025-01-15",
      status: "em_dia",
    },
    {
      id: "3",
      nome: "Giardíase",
      data: "2023-06-10",
      veterinario: "Dra. Ana Santos",
      clinica: "Pet Hospital",
      lote: "GIA2023001",
      proximaDose: "2024-06-10",
      status: "vencida",
    },
    {
      id: "4",
      nome: "Leishmaniose",
      data: "2023-12-20",
      veterinario: "Dr. Carlos Silva",
      clinica: "Clínica VetCare",
      lote: "LEI2023001",
      proximaDose: "2024-12-20",
      status: "proxima",
    },
  ],
  "2": [
    {
      id: "1",
      nome: "Tríplice Felina",
      data: "2024-01-10",
      veterinario: "Dra. Maria Costa",
      clinica: "Clínica Felina",
      lote: "FEL2024001",
      proximaDose: "2025-01-10",
      status: "em_dia",
    },
    {
      id: "2",
      nome: "Antirrábica",
      data: "2024-01-10",
      veterinario: "Dra. Maria Costa",
      clinica: "Clínica Felina",
      lote: "RAB2024002",
      proximaDose: "2025-01-10",
      status: "em_dia",
    },
  ],
  "3": [
    {
      id: "1",
      nome: "V10 (Déctupla)",
      data: "2023-11-08",
      veterinario: "Dr. Pedro Lima",
      clinica: "Hospital Veterinário",
      lote: "VAC2023002",
      proximaDose: "2024-11-08",
      status: "proxima",
    },
    {
      id: "2",
      nome: "Antirrábica",
      data: "2023-11-08",
      veterinario: "Dr. Pedro Lima",
      clinica: "Hospital Veterinário",
      lote: "RAB2023002",
      proximaDose: "2024-11-08",
      status: "proxima",
    },
  ],
}

const petNames = {
  "1": "Rex",
  "2": "Mimi",
  "3": "Thor",
}

export default function VacinasPage() {
  const router = useRouter()
  const params = useParams()
  const petId = params.id as string

  const vacinas = vacinasData[petId as keyof typeof vacinasData] || []
  const petName = petNames[petId as keyof typeof petNames] || "Pet"

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "em_dia":
        return <Badge className="bg-green-100 text-green-800 border-0">Em dia</Badge>
      case "vencida":
        return <Badge className="bg-red-100 text-red-800 border-0">Vencida</Badge>
      case "proxima":
        return <Badge className="bg-yellow-100 text-yellow-800 border-0">Próxima</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-0">-</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "em_dia":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "vencida":
        return <AlertCircle className="w-5 h-5 text-red-500" />
      case "proxima":
        return <Calendar className="w-5 h-5 text-yellow-500" />
      default:
        return <Calendar className="w-5 h-5 text-gray-400" />
    }
  }

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
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                <Syringe className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-900">Vacinas do {petName}</h1>
                <p className="text-sm text-gray-600">Histórico de vacinação</p>
              </div>
            </div>
          </div>
          <Button className="rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
            <Plus className="w-4 h-4 mr-2" />
            Nova Vacina
          </Button>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Em Dia</p>
                    <p className="text-3xl font-bold">{vacinas.filter((v) => v.status === "em_dia").length}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-500 to-amber-600 text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-100 text-sm">Próximas</p>
                    <p className="text-3xl font-bold">{vacinas.filter((v) => v.status === "proxima").length}</p>
                  </div>
                  <Calendar className="w-8 h-8 text-yellow-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-red-500 to-red-600 text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-red-100 text-sm">Vencidas</p>
                    <p className="text-3xl font-bold">{vacinas.filter((v) => v.status === "vencida").length}</p>
                  </div>
                  <AlertCircle className="w-8 h-8 text-red-200" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lista de Vacinas */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Syringe className="w-5 h-5 text-green-500" />
                Histórico de Vacinas
              </CardTitle>
              <CardDescription>Todas as vacinas aplicadas em {petName}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vacinas.map((vacina) => (
                  <div
                    key={vacina.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      {getStatusIcon(vacina.status)}
                      <div>
                        <h3 className="font-semibold text-gray-900">{vacina.nome}</h3>
                        <p className="text-sm text-gray-600">
                          Aplicada em {new Date(vacina.data).toLocaleDateString("pt-BR")}
                        </p>
                        <p className="text-xs text-gray-500">
                          {vacina.veterinario} - {vacina.clinica}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(vacina.status)}
                      <p className="text-sm text-gray-600 mt-1">
                        Próxima: {new Date(vacina.proximaDose).toLocaleDateString("pt-BR")}
                      </p>
                      <p className="text-xs text-gray-500">Lote: {vacina.lote}</p>
                    </div>
                  </div>
                ))}
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
