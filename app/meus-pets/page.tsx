"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
import { ArrowLeft, Plus, PawPrint, Calendar, Weight, Palette, Trash2, Edit, Heart, Activity } from "lucide-react"
import { FloatingButtons } from "@/components/floating-buttons"
import { usePets } from "@/hooks/use-pets"
import { Skeleton } from "@/components/ui/skeleton"

export default function MeusPetsPage() {
  const router = useRouter()
  const { pets, loading, deletePet } = usePets()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id)
      await deletePet(id)
    } catch (error) {
      console.error("Erro ao deletar pet:", error)
    } finally {
      setDeletingId(null)
    }
  }

  const getSpeciesIcon = (species: string) => {
    switch (species.toLowerCase()) {
      case "cão":
      case "cachorro":
        return "🐕"
      case "gato":
        return "🐱"
      case "pássaro":
        return "🐦"
      case "peixe":
        return "🐠"
      case "hamster":
        return "🐹"
      case "coelho":
        return "🐰"
      default:
        return "🐾"
    }
  }

  const getGenderColor = (gender: string) => {
    return gender === "male" ? "bg-blue-100 text-blue-800" : "bg-pink-100 text-pink-800"
  }

  const getGenderLabel = (gender: string) => {
    return gender === "male" ? "Macho" : "Fêmea"
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-amber-50/30 to-yellow-50/50">
        <header className="bg-white shadow-sm border-b border-orange-100 sticky top-0 z-50">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="hover:bg-orange-100 rounded-xl">
                <ArrowLeft className="h-5 w-5 text-gray-700" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
                  <PawPrint className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-xl text-gray-900">Meus Pets</h1>
                  <p className="text-sm text-gray-600">Gerencie seus companheiros</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="px-6 py-8">
          <div className="max-w-4xl mx-auto space-y-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Skeleton className="w-20 h-20 rounded-2xl" />
                    <div className="flex-1 space-y-3">
                      <Skeleton className="h-6 w-48" />
                      <div className="flex gap-2">
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-6 w-20" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    )
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
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
                <PawPrint className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-900">Meus Pets</h1>
                <p className="text-sm text-gray-600">Gerencie seus companheiros</p>
              </div>
            </div>
          </div>
          <Button
            onClick={() => router.push("/meus-pets/cadastrar")}
            className="h-12 px-6 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Plus className="w-5 h-5 mr-2" />
            Novo Pet
          </Button>
        </div>
      </header>

      {/* Estatísticas */}
      <div className="px-6 py-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Total de Pets</p>
                  <p className="text-3xl font-bold">{pets.length}</p>
                </div>
                <PawPrint className="w-12 h-12 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Castrados</p>
                  <p className="text-3xl font-bold">{pets.filter((pet) => pet.isNeutered).length}</p>
                </div>
                <Heart className="w-12 h-12 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Espécies</p>
                  <p className="text-3xl font-bold">{new Set(pets.map((pet) => pet.species)).size}</p>
                </div>
                <Activity className="w-12 h-12 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Lista de Pets */}
      <main className="px-6 pb-8">
        <div className="max-w-4xl mx-auto">
          {pets.length === 0 ? (
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardContent className="text-center p-12">
                <PawPrint className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Nenhum pet cadastrado</h3>
                <p className="text-gray-600 mb-6">Que tal cadastrar seu primeiro companheiro?</p>
                <Button
                  onClick={() => router.push("/meus-pets/cadastrar")}
                  className="h-12 px-8 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Cadastrar Pet
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {pets.map((pet, index) => {
                let cardGradient = ""
                if (index % 3 === 0) {
                  cardGradient = "bg-gradient-to-br from-orange-400 to-amber-500"
                } else if (index % 3 === 1) {
                  cardGradient = "bg-gradient-to-br from-blue-400 to-blue-500"
                } else {
                  cardGradient = "bg-gradient-to-br from-purple-400 to-purple-500"
                }

                return (
                  <Card
                    key={pet.id}
                    className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl hover:shadow-xl transition-all duration-200 cursor-pointer group"
                    onClick={() => router.push(`/pet/${pet.id}`)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        {/* Avatar do Pet */}
                        <div
                          className={`w-20 h-20 ${cardGradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform text-4xl`}
                        >
                          {pet.avatar ? (
                            <img
                              src={pet.avatar || "/placeholder.svg"}
                              alt={pet.name}
                              className="w-full h-full object-cover rounded-2xl"
                            />
                          ) : (
                            getSpeciesIcon(pet.species)
                          )}
                        </div>

                        {/* Informações do Pet */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                                {pet.name}
                              </h3>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge className="bg-orange-100 text-orange-800 border-0">{pet.species}</Badge>
                                {pet.breed && <Badge className="bg-gray-100 text-gray-800 border-0">{pet.breed}</Badge>}
                                <Badge className={`border-0 ${getGenderColor(pet.gender)}`}>
                                  {getGenderLabel(pet.gender)}
                                </Badge>
                              </div>
                            </div>

                            {/* Botões de Ação */}
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  router.push(`/pet/${pet.id}/editar`)
                                }}
                                className="hover:bg-blue-100 rounded-xl"
                              >
                                <Edit className="w-4 h-4 text-blue-600" />
                              </Button>

                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={(e) => e.stopPropagation()}
                                    className="hover:bg-red-100 rounded-xl"
                                    disabled={deletingId === pet.id}
                                  >
                                    <Trash2 className="w-4 h-4 text-red-600" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Tem certeza que deseja excluir {pet.name}? Esta ação não pode ser desfeita.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDelete(pet.id)}
                                      className="bg-red-600 hover:bg-red-700"
                                    >
                                      Excluir
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>

                          {/* Detalhes do Pet */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            {pet.age && (
                              <div className="flex items-center gap-2 text-gray-600">
                                <Calendar className="w-4 h-4" />
                                <span>{pet.age} anos</span>
                              </div>
                            )}
                            {pet.weight && (
                              <div className="flex items-center gap-2 text-gray-600">
                                <Weight className="w-4 h-4" />
                                <span>{pet.weight} kg</span>
                              </div>
                            )}
                            {pet.color && (
                              <div className="flex items-center gap-2 text-gray-600">
                                <Palette className="w-4 h-4" />
                                <span>{pet.color}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-2 text-gray-600">
                              <Heart className="w-4 h-4" />
                              <span>{pet.isNeutered ? "Castrado" : "Não castrado"}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </main>

      {/* Botões Flutuantes */}
      <FloatingButtons />
    </div>
  )
}
