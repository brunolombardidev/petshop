"use client"

import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ArrowLeft, FileText, Calendar, Stethoscope, Pill, AlertTriangle, Plus, Download, Trash2 } from "lucide-react"
import { FloatingButtons } from "@/components/floating-buttons"
import { useMedicalHistory } from "@/hooks/use-medical-history"
import { usePet } from "@/hooks/use-pets"

export default function HistoricoPage() {
  const router = useRouter()
  const params = useParams()
  const petId = params.id as string

  const { pet } = usePet(petId)
  const { history, isLoading, deleteHistory } = useMedicalHistory(petId)

  const getTipoBadge = (tipo: string) => {
    switch (tipo?.toLowerCase()) {
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
    switch (tipo?.toLowerCase()) {
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

  const handleDeleteHistory = async (historyId: string) => {
    try {
      await deleteHistory(historyId)
    } catch (error) {
      console.error("Erro ao excluir histórico:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#D6DD83]/20 via-[#FFBDB6]/20 to-[#30B2B0]/20">
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
                  <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-32 mt-1 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="px-6 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
                  <CardContent className="p-6">
                    <div className="animate-pulse space-y-4">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    )
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
                <h1 className="font-bold text-xl text-gray-900">Histórico do {pet?.name || "Pet"}</h1>
                <p className="text-sm text-gray-600">Histórico médico completo</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-xl bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
            <Button
              className="rounded-xl bg-gradient-to-r from-bpet-secondary to-bpet-primary hover:from-bpet-primary hover:to-bpet-secondary"
              onClick={() => router.push(`/pet/${petId}/historico/novo`)}
            >
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
                    <p className="text-3xl font-bold">{history.filter((h) => h.type === "Consulta").length}</p>
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
                    <p className="text-3xl font-bold">{history.filter((h) => h.type === "Emergência").length}</p>
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
                    <p className="text-3xl font-bold">{history.filter((h) => h.type === "Cirurgia").length}</p>
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
                    <p className="text-3xl font-bold">{history.length}</p>
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
              <CardDescription>Todos os registros médicos de {pet?.name || "Pet"}</CardDescription>
            </CardHeader>
            <CardContent>
              {history.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhum registro encontrado</h3>
                  <p className="text-gray-600 mb-6">Adicione o primeiro registro médico do seu pet</p>
                  <Button
                    onClick={() => router.push(`/pet/${petId}/historico/novo`)}
                    className="bg-gradient-to-r from-bpet-secondary to-bpet-primary hover:from-bpet-primary hover:to-bpet-secondary text-white rounded-xl"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Novo Registro
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {history.map((registro) => (
                    <div
                      key={registro.id}
                      className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors relative"
                    >
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-4 right-4 text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Excluir Registro</AlertDialogTitle>
                            <AlertDialogDescription>
                              Tem certeza que deseja excluir este registro médico? Esta ação não pode ser desfeita.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteHistory(registro.id)}
                              className="bg-red-500 hover:bg-red-600"
                            >
                              Excluir
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>

                      <div className="flex items-start justify-between mb-4 pr-12">
                        <div className="flex items-center gap-3">
                          {getTipoIcon(registro.type)}
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              {getTipoBadge(registro.type)}
                              {getStatusBadge(registro.status)}
                            </div>
                            <p className="text-sm text-gray-600 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(registro.date).toLocaleDateString("pt-BR")}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Diagnóstico</h4>
                          <p className="text-gray-700">{registro.diagnosis}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Veterinário</h4>
                          <p className="text-gray-700">{registro.veterinarian}</p>
                          {registro.clinic && <p className="text-sm text-gray-600">{registro.clinic}</p>}
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-1">Tratamento</h4>
                        <p className="text-gray-700">{registro.treatment}</p>
                      </div>

                      {registro.medications && registro.medications.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2">Medicamentos</h4>
                          <div className="flex flex-wrap gap-2">
                            {registro.medications.map((med, index) => (
                              <Badge key={index} className="bg-blue-100 text-blue-800 border-0">
                                <Pill className="w-3 h-3 mr-1" />
                                {med}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {registro.observations && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Observações</h4>
                          <p className="text-gray-700">{registro.observations}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Botões Flutuantes */}
      <FloatingButtons />
    </div>
  )
}
