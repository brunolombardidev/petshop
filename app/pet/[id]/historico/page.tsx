"use client"

import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, FileText, Calendar, Stethoscope, Pill, AlertTriangle, Plus, Download } from "lucide-react"
import { FloatingButtons } from "@/components/floating-buttons"

// Dados mockados do histórico médico
const historicoData = {
  "1": [
    {
      id: "1",
      data: "2024-01-15",
      tipo: "Consulta",
      veterinario: "Dr. Carlos Silva",
      clinica: "Clínica VetCare",
      diagnostico: "Check-up de rotina",
      tratamento: "Aplicação de vacinas V10 e antirrábica",
      medicamentos: ["Vermífugo", "Antipulgas"],
      observacoes: "Animal saudável, peso ideal. Recomendado manter atividade física regular.",
      status: "concluido",
    },
    {
      id: "2",
      data: "2023-11-20",
      tipo: "Emergência",
      veterinario: "Dra. Ana Santos",
      clinica: "Pet Hospital",
      diagnostico: "Intoxicação alimentar leve",
      tratamento: "Hidratação e medicação",
      medicamentos: ["Soro fisiológico", "Antiemético"],
      observacoes: "Recuperação completa em 48h. Orientado sobre alimentação adequada.",
      status: "concluido",
    },
    {
      id: "3",
      data: "2023-08-10",
      tipo: "Cirurgia",
      veterinario: "Dr. Pedro Lima",
      clinica: "Hospital Veterinário",
      diagnostico: "Remoção de corpo estranho",
      tratamento: "Cirurgia para remoção de bola de tênis do estômago",
      medicamentos: ["Antibiótico", "Anti-inflamatório", "Analgésico"],
      observacoes: "Cirurgia bem-sucedida. Recuperação pós-operatória sem complicações.",
      status: "concluido",
    },
  ],
  "2": [
    {
      id: "1",
      data: "2024-01-10",
      tipo: "Consulta",
      veterinario: "Dra. Maria Costa",
      clinica: "Clínica Felina",
      diagnostico: "Check-up anual",
      tratamento: "Vacinação e exame geral",
      medicamentos: ["Vermífugo felino"],
      observacoes: "Gata saudável, pelagem em ótimo estado. Manter escovação diária.",
      status: "concluido",
    },
    {
      id: "2",
      data: "2023-09-15",
      tipo: "Tratamento",
      veterinario: "Dra. Maria Costa",
      clinica: "Clínica Felina",
      diagnostico: "Dermatite alérgica",
      tratamento: "Tratamento tópico e mudança de ração",
      medicamentos: ["Pomada antialérgica", "Ração hipoalergênica"],
      observacoes: "Melhora significativa após 2 semanas de tratamento.",
      status: "concluido",
    },
  ],
  "3": [
    {
      id: "1",
      data: "2023-12-20",
      tipo: "Consulta",
      veterinario: "Dr. Pedro Lima",
      clinica: "Hospital Veterinário",
      diagnostico: "Acompanhamento displasia de quadril",
      tratamento: "Ajuste na medicação e fisioterapia",
      medicamentos: ["Anti-inflamatório", "Condroitina"],
      observacoes: "Quadro estável. Continuar com exercícios de baixo impacto.",
      status: "em_andamento",
    },
    {
      id: "2",
      data: "2023-06-15",
      tipo: "Exame",
      veterinario: "Dr. Pedro Lima",
      clinica: "Hospital Veterinário",
      diagnostico: "Raio-X de quadril",
      tratamento: "Diagnóstico de displasia leve",
      medicamentos: [],
      observacoes: "Iniciado tratamento conservador com medicação e fisioterapia.",
      status: "concluido",
    },
  ],
}

const petNames = {
  "1": "Rex",
  "2": "Mimi",
  "3": "Thor",
}

export default function HistoricoPage() {
  const router = useRouter()
  const params = useParams()
  const petId = params.id as string

  const historico = historicoData[petId as keyof typeof historicoData] || []
  const petName = petNames[petId as keyof typeof petNames] || "Pet"

  const getTipoBadge = (tipo: string) => {
    switch (tipo.toLowerCase()) {
      case "consulta":
        return <Badge className="bg-blue-100 text-blue-800 border-0">Consulta</Badge>
      case "emergência":
        return <Badge className="bg-red-100 text-red-800 border-0">Emergência</Badge>
      case "cirurgia":
        return <Badge className="bg-purple-100 text-purple-800 border-0">Cirurgia</Badge>
      case "exame":
        return <Badge className="bg-green-100 text-green-800 border-0">Exame</Badge>
      case "tratamento":
        return <Badge className="bg-yellow-100 text-yellow-800 border-0">Tratamento</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-0">{tipo}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "concluido":
        return <Badge className="bg-green-100 text-green-800 border-0">Concluído</Badge>
      case "em_andamento":
        return <Badge className="bg-yellow-100 text-yellow-800 border-0">Em andamento</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-0">-</Badge>
    }
  }

  const getTipoIcon = (tipo: string) => {
    switch (tipo.toLowerCase()) {
      case "consulta":
        return <Stethoscope className="w-5 h-5 text-blue-500" />
      case "emergência":
        return <AlertTriangle className="w-5 h-5 text-red-500" />
      case "cirurgia":
        return <FileText className="w-5 h-5 text-purple-500" />
      case "exame":
        return <FileText className="w-5 h-5 text-green-500" />
      case "tratamento":
        return <Pill className="w-5 h-5 text-yellow-500" />
      default:
        return <FileText className="w-5 h-5 text-gray-400" />
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
              <div className="w-10 h-10 bg-gradient-to-br from-bpet-secondary to-bpet-primary rounded-xl flex items-center justify-center shadow-lg">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-900">Histórico do {petName}</h1>
                <p className="text-sm text-gray-600">Histórico médico completo</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-xl bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
            <Button className="rounded-xl bg-gradient-to-r from-bpet-secondary to-bpet-primary hover:from-bpet-primary hover:to-bpet-secondary">
              <Plus className="w-4 h-4 mr-2" />
              Novo Registro
            </Button>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-bpet-secondary to-bpet-primary text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Consultas</p>
                    <p className="text-3xl font-bold">{historico.filter((h) => h.tipo === "Consulta").length}</p>
                  </div>
                  <Stethoscope className="w-8 h-8 text-blue-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-[#FFBDB6] to-bpet-secondary text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-red-100 text-sm">Emergências</p>
                    <p className="text-3xl font-bold">{historico.filter((h) => h.tipo === "Emergência").length}</p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-red-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-bpet-primary to-[#D6DD83] text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Cirurgias</p>
                    <p className="text-3xl font-bold">{historico.filter((h) => h.tipo === "Cirurgia").length}</p>
                  </div>
                  <FileText className="w-8 h-8 text-purple-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-[#D6DD83] to-bpet-secondary text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Total</p>
                    <p className="text-3xl font-bold">{historico.length}</p>
                  </div>
                  <FileText className="w-8 h-8 text-green-200" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lista do Histórico */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-500" />
                Histórico Médico Completo
              </CardTitle>
              <CardDescription>Todos os registros médicos de {petName}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {historico.map((registro) => (
                  <div key={registro.id} className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {getTipoIcon(registro.tipo)}
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            {getTipoBadge(registro.tipo)}
                            {getStatusBadge(registro.status)}
                          </div>
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(registro.data).toLocaleDateString("pt-BR")}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Diagnóstico</h4>
                        <p className="text-gray-700">{registro.diagnostico}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Veterinário</h4>
                        <p className="text-gray-700">{registro.veterinario}</p>
                        <p className="text-sm text-gray-600">{registro.clinica}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-1">Tratamento</h4>
                      <p className="text-gray-700">{registro.tratamento}</p>
                    </div>

                    {registro.medicamentos.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Medicamentos</h4>
                        <div className="flex flex-wrap gap-2">
                          {registro.medicamentos.map((med, index) => (
                            <Badge key={index} className="bg-blue-100 text-blue-800 border-0">
                              <Pill className="w-3 h-3 mr-1" />
                              {med}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Observações</h4>
                      <p className="text-gray-700">{registro.observacoes}</p>
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
