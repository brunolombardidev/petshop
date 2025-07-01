"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, PawPrint, Heart, Star, Plus } from "lucide-react"
import { FloatingButtons } from "@/components/floating-buttons"

export default function MeusPetsPage() {
  const router = useRouter()

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
              <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-900">Meus Pets</h1>
                <p className="text-sm text-gray-600">Seus companheiros cadastrados</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Botão Novo Pet */}
      <div className="px-6 py-6">
        <div className="max-w-4xl mx-auto">
          <Button
            onClick={() => router.push("/cadastrar-pet")}
            className="h-14 px-8 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Plus className="w-5 h-5 mr-2" />
            Cadastrar Pet
          </Button>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <main className="px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                Seus Pets Cadastrados
              </CardTitle>
              <CardDescription className="text-gray-600">Gerencie as informações dos seus companheiros</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div
                  className="flex flex-col items-center gap-4 p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl hover:shadow-lg transition-all duration-200 cursor-pointer group"
                  onClick={() => router.push("/pet/1")}
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                    <PawPrint className="h-10 w-10 text-white" />
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-gray-900 text-lg">Rex</p>
                    <p className="text-sm text-gray-600">Golden Retriever</p>
                    <div className="flex items-center justify-center gap-1 mt-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-500">5 anos</span>
                    </div>
                  </div>
                </div>

                <div
                  className="flex flex-col items-center gap-4 p-6 bg-gradient-to-r from-pink-50 to-pink-100 rounded-2xl hover:shadow-lg transition-all duration-200 cursor-pointer group"
                  onClick={() => router.push("/pet/2")}
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                    <PawPrint className="h-10 w-10 text-white" />
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-gray-900 text-lg">Mimi</p>
                    <p className="text-sm text-gray-600">Gato Persa</p>
                    <div className="flex items-center justify-center gap-1 mt-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-500">3 anos</span>
                    </div>
                  </div>
                </div>

                <div
                  className="flex flex-col items-center gap-4 p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl hover:shadow-lg transition-all duration-200 cursor-pointer group"
                  onClick={() => router.push("/pet/3")}
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                    <PawPrint className="h-10 w-10 text-white" />
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-gray-900 text-lg">Thor</p>
                    <p className="text-sm text-gray-600">Pastor Alemão</p>
                    <div className="flex items-center justify-center gap-1 mt-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-500">7 anos</span>
                    </div>
                  </div>
                </div>

                {/* Card para adicionar novo pet */}
                <div
                  className="flex flex-col items-center justify-center gap-4 p-6 border-2 border-dashed border-gray-300 rounded-2xl hover:border-orange-400 hover:bg-orange-50 transition-all duration-200 cursor-pointer group"
                  onClick={() => router.push("/cadastrar-pet")}
                >
                  <div className="w-20 h-20 bg-gray-200 group-hover:bg-orange-200 rounded-2xl flex items-center justify-center transition-colors">
                    <Plus className="h-10 w-10 text-gray-400 group-hover:text-orange-500" />
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-gray-600 group-hover:text-orange-600 text-lg">Adicionar Pet</p>
                    <p className="text-sm text-gray-500">Cadastre um novo companheiro</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Botões Flutuantes */}
      <FloatingButtons />
      {/* Espaçamento para botões flutuantes */}
      <div className="pb-20"></div>
    </div>
  )
}
