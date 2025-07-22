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
import { ArrowLeft, Syringe, Calendar, CheckCircle, AlertCircle, Plus, Trash2 } from "lucide-react"
import { FloatingButtons } from "@/components/floating-buttons"
import { useVaccinations } from "@/hooks/use-vaccinations"
import { usePet } from "@/hooks/use-pets"

export default function VacinasPage() {
  const router = useRouter()
  const params = useParams()
  const petId = params.id as string

  const { pet } = usePet(petId)
  const { vaccinations, isLoading, deleteVaccination } = useVaccinations(petId)

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

  const handleDeleteVaccination = async (vaccinationId: string) => {
    try {
      await deleteVaccination(vaccinationId)
    } catch (error) {
      console.error("Erro ao excluir vacina:", error)
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
                <div className="w-10 h-10 bg-gradient-to-br from-bpet-primary to-bpet-secondary rounded-xl flex items-center justify-center shadow-lg">
                  <Syringe className="w-5 h-5 text-white" />
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
              <div className="w-10 h-10 bg-gradient-to-br from-bpet-primary to-bpet-secondary rounded-xl flex items-center justify-center shadow-lg">
                <Syringe className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-900">Vacinas do {pet?.name || "Pet"}</h1>
                <p className="text-sm text-gray-600">Histórico de vacinação</p>
              </div>
            </div>
          </div>
          <Button
            className="rounded-xl bg-gradient-to-r from-bpet-primary to-bpet-secondary hover:from-bpet-secondary hover:to-bpet-primary"
            onClick={() => router.push(`/pet/${petId}/vacinas/nova`)}
          >
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
            <Card className="border-0 shadow-lg bg-gradient-to-br from-bpet-primary to-bpet-secondary text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Em Dia</p>
                    <p className="text-3xl font-bold">{vaccinations.filter((v) => v.status === "em_dia").length}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-[#D6DD83] to-[#FFBDB6] text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-100 text-sm">Próximas</p>
                    <p className="text-3xl font-bold">{vaccinations.filter((v) => v.status === "proxima").length}</p>
                  </div>
                  <Calendar className="w-8 h-8 text-yellow-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-[#FFBDB6] to-bpet-secondary text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-red-100 text-sm">Vencidas</p>
                    <p className="text-3xl font-bold">{vaccinations.filter((v) => v.status === "vencida").length}</p>
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
              <CardDescription>Todas as vacinas aplicadas em {pet?.name || "Pet"}</CardDescription>
            </CardHeader>
            <CardContent>
              {vaccinations.length === 0 ? (
                <div className="text-center py-12">
                  <Syringe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhuma vacina registrada</h3>
                  <p className="text-gray-600 mb-6">Adicione a primeira vacina do seu pet</p>
                  <Button
                    onClick={() => router.push(`/pet/${petId}/vacinas/nova`)}
                    className="bg-gradient-to-r from-bpet-primary to-bpet-secondary hover:from-bpet-secondary hover:to-bpet-primary text-white rounded-xl"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Nova Vacina
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {vaccinations.map((vacina) => (
                    <div
                      key={vacina.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors relative"
                    >
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Excluir Vacina</AlertDialogTitle>
                            <AlertDialogDescription>
                              Tem certeza que deseja excluir o registro desta vacina? Esta ação não pode ser desfeita.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteVaccination(vacina.id)}
                              className="bg-red-500 hover:bg-red-600"
                            >
                              Excluir
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>

                      <div className="flex items-center gap-4 pr-12">
                        {getStatusIcon(vacina.status)}
                        <div>
                          <h3 className="font-semibold text-gray-900">{vacina.name}</h3>
                          <p className="text-sm text-gray-600">
                            Aplicada em {new Date(vacina.applicationDate).toLocaleDateString("pt-BR")}
                          </p>
                          {vacina.veterinarian && (
                            <p className="text-xs text-gray-500">
                              {vacina.veterinarian} - {vacina.clinic}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        {getStatusBadge(vacina.status)}
                        {vacina.nextDose && (
                          <p className="text-sm text-gray-600 mt-1">
                            Próxima: {new Date(vacina.nextDose).toLocaleDateString("pt-BR")}
                          </p>
                        )}
                        {vacina.batch && <p className="text-xs text-gray-500">Lote: {vacina.batch}</p>}
                      </div>
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
