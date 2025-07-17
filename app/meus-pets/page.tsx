"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Search, Filter, Plus, Phone, PawPrint, Stethoscope, Shield, Clock } from "lucide-react"
import { UnifiedHeader } from "@/components/unified-header"
import { FloatingButtons } from "@/components/floating-buttons"
import Image from "next/image"

export default function MeusPetsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterEspecie, setFilterEspecie] = useState("todos")
  const [filterIdade, setFilterIdade] = useState("todos")

  const [user] = useState({
    name: "Maria Silva",
    email: "maria@email.com",
    avatar: "/placeholder-user.jpg",
    userType: "cliente" as const,
  })

  // Dados mockados dos pets
  const pets = [
    {
      id: "1",
      nome: "Buddy",
      especie: "Cão",
      raca: "Golden Retriever",
      idade: 3,
      peso: 28.5,
      cor: "Dourado",
      sexo: "Macho",
      castrado: true,
      microchip: "982000123456789",
      foto: "/placeholder.jpg",
      veterinario: {
        nome: "Dr. Carlos Mendes",
        clinica: "Clínica VetCare",
        telefone: "(11) 99999-1234",
        email: "carlos@vetcare.com",
      },
      proximaVacina: "2024-02-15",
      proximaConsulta: "2024-01-25",
      ultimoCheckup: "2023-12-10",
      observacoes: "Pet muito ativo e sociável. Gosta de brincar no parque.",
      vacinas: [
        { nome: "V10", data: "2023-12-01", proxima: "2024-12-01" },
        { nome: "Antirrábica", data: "2023-11-15", proxima: "2024-11-15" },
      ],
      medicamentos: [{ nome: "Antipulgas", ultimaAplicacao: "2024-01-01", proxima: "2024-02-01" }],
    },
    {
      id: "2",
      nome: "Luna",
      especie: "Gato",
      raca: "Siamês",
      idade: 2,
      peso: 4.2,
      cor: "Seal Point",
      sexo: "Fêmea",
      castrado: true,
      microchip: "982000987654321",
      foto: "/placeholder.jpg",
      veterinario: {
        nome: "Dra. Ana Santos",
        clinica: "Pet Clinic",
        telefone: "(11) 88888-5678",
        email: "ana@petclinic.com",
      },
      proximaVacina: "2024-03-10",
      proximaConsulta: "2024-02-05",
      ultimoCheckup: "2023-11-20",
      observacoes: "Gata independente, prefere ambientes calmos.",
      vacinas: [
        { nome: "Tríplice Felina", data: "2023-11-20", proxima: "2024-11-20" },
        { nome: "Antirrábica", data: "2023-10-15", proxima: "2024-10-15" },
      ],
      medicamentos: [{ nome: "Vermífugo", ultimaAplicacao: "2023-12-15", proxima: "2024-03-15" }],
    },
    {
      id: "3",
      nome: "Max",
      especie: "Cão",
      raca: "Labrador",
      idade: 5,
      peso: 32.0,
      cor: "Chocolate",
      sexo: "Macho",
      castrado: false,
      microchip: "982000456789123",
      foto: "/placeholder.jpg",
      veterinario: {
        nome: "Dr. Pedro Lima",
        clinica: "Animal Care",
        telefone: "(11) 77777-9012",
        email: "pedro@animalcare.com",
      },
      proximaVacina: "2024-04-20",
      proximaConsulta: "2024-01-30",
      ultimoCheckup: "2023-10-05",
      observacoes: "Cão calmo e obediente. Ideal para famílias com crianças.",
      vacinas: [{ nome: "V8", data: "2023-10-05", proxima: "2024-10-05" }],
      medicamentos: [],
    },
  ]

  // Filtrar pets
  const petsFiltrados = pets.filter((pet) => {
    const matchNome = pet.nome.toLowerCase().includes(searchTerm.toLowerCase())
    const matchEspecie = filterEspecie === "todos" || pet.especie.toLowerCase() === filterEspecie
    const matchIdade =
      filterIdade === "todos" ||
      (filterIdade === "filhote" && pet.idade <= 1) ||
      (filterIdade === "adulto" && pet.idade > 1 && pet.idade <= 7) ||
      (filterIdade === "senior" && pet.idade > 7)

    return matchNome && matchEspecie && matchIdade
  })

  // Estatísticas
  const estatisticas = {
    totalPets: pets.length,
    caes: pets.filter((p) => p.especie === "Cão").length,
    gatos: pets.filter((p) => p.especie === "Gato").length,
    proximasVacinas: pets.filter((p) => {
      const proximaVacina = new Date(p.proximaVacina)
      const hoje = new Date()
      const diasRestantes = Math.ceil((proximaVacina.getTime() - hoje.getTime()) / (1000 * 3600 * 24))
      return diasRestantes <= 30 && diasRestantes > 0
    }).length,
  }

  const getIdadeCategoria = (idade: number) => {
    if (idade <= 1) return "Filhote"
    if (idade <= 7) return "Adulto"
    return "Senior"
  }

  const getDiasProximaVacina = (dataVacina: string) => {
    const proximaVacina = new Date(dataVacina)
    const hoje = new Date()
    const diasRestantes = Math.ceil((proximaVacina.getTime() - hoje.getTime()) / (1000 * 3600 * 24))
    return diasRestantes
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50/50 via-purple-50/30 to-blue-50/50">
      <UnifiedHeader user={user} />

      <main className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                <Heart className="w-8 h-8 text-pink-500" />
                Meus Pets
              </h1>
              <p className="text-gray-600">Gerencie todos os seus pets em um só lugar</p>
            </div>
            <Button
              onClick={() => router.push("/meus-pets/cadastrar")}
              className="mt-4 md:mt-0 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-xl shadow-lg"
            >
              <Plus className="w-5 h-5 mr-2" />
              Cadastrar Pet
            </Button>
          </div>

          {/* Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-pink-500 to-rose-600 text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-pink-100 text-sm">Total de Pets</p>
                    <p className="text-3xl font-bold">{estatisticas.totalPets}</p>
                  </div>
                  <Heart className="w-8 h-8 text-pink-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Cães</p>
                    <p className="text-3xl font-bold">{estatisticas.caes}</p>
                  </div>
                  <PawPrint className="w-8 h-8 text-blue-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Gatos</p>
                    <p className="text-3xl font-bold">{estatisticas.gatos}</p>
                  </div>
                  <PawPrint className="w-8 h-8 text-purple-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-amber-100 text-sm">Vacinas Próximas</p>
                    <p className="text-3xl font-bold">{estatisticas.proximasVacinas}</p>
                  </div>
                  <Shield className="w-8 h-8 text-amber-200" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filtros */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      placeholder="Buscar por nome do pet..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-12 border-2 border-gray-200 rounded-xl"
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <Select value={filterEspecie} onValueChange={setFilterEspecie}>
                    <SelectTrigger className="w-40 h-12 border-2 border-gray-200 rounded-xl">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Espécie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todas</SelectItem>
                      <SelectItem value="cão">Cães</SelectItem>
                      <SelectItem value="gato">Gatos</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filterIdade} onValueChange={setFilterIdade}>
                    <SelectTrigger className="w-40 h-12 border-2 border-gray-200 rounded-xl">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Idade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todas</SelectItem>
                      <SelectItem value="filhote">Filhote</SelectItem>
                      <SelectItem value="adulto">Adulto</SelectItem>
                      <SelectItem value="senior">Senior</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lista de Pets */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {petsFiltrados.map((pet) => {
              const diasVacina = getDiasProximaVacina(pet.proximaVacina)
              const vacinaUrgente = diasVacina <= 7 && diasVacina > 0

              return (
                <Card
                  key={pet.id}
                  className="border-0 shadow-xl bg-white/90 backdrop-blur-sm rounded-2xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
                  onClick={() => router.push(`/pet/${pet.id}`)}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Image
                          src={pet.foto || "/placeholder.svg"}
                          alt={pet.nome}
                          width={80}
                          height={80}
                          className="rounded-full object-cover border-4 border-white shadow-lg"
                        />
                        {vacinaUrgente && (
                          <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                            <Shield className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                          {pet.nome}
                          <Badge
                            className={`${pet.sexo === "Macho" ? "bg-blue-100 text-blue-800" : "bg-pink-100 text-pink-800"} border-0`}
                          >
                            {pet.sexo}
                          </Badge>
                        </CardTitle>
                        <CardDescription className="text-gray-600">
                          {pet.raca} • {pet.idade} anos • {getIdadeCategoria(pet.idade)}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Informações Básicas */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Peso</p>
                        <p className="font-semibold">{pet.peso} kg</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Cor</p>
                        <p className="font-semibold">{pet.cor}</p>
                      </div>
                    </div>

                    {/* Status de Castração */}
                    <div className="flex items-center gap-2">
                      <Badge
                        className={`${pet.castrado ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"} border-0`}
                      >
                        {pet.castrado ? "Castrado" : "Não Castrado"}
                      </Badge>
                      {pet.microchip && <Badge className="bg-blue-100 text-blue-800 border-0">Microchipado</Badge>}
                    </div>

                    {/* Próximos Eventos */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Shield className={`w-4 h-4 ${vacinaUrgente ? "text-red-500" : "text-green-500"}`} />
                        <span className="text-gray-600">Próxima vacina:</span>
                        <span className={`font-semibold ${vacinaUrgente ? "text-red-600" : "text-gray-900"}`}>
                          {new Date(pet.proximaVacina).toLocaleDateString("pt-BR")}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Stethoscope className="w-4 h-4 text-blue-500" />
                        <span className="text-gray-600">Próxima consulta:</span>
                        <span className="font-semibold text-gray-900">
                          {new Date(pet.proximaConsulta).toLocaleDateString("pt-BR")}
                        </span>
                      </div>
                    </div>

                    {/* Veterinário */}
                    <div className="bg-gray-50 rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Stethoscope className="w-4 h-4 text-blue-500" />
                        <span className="font-semibold text-gray-900">Veterinário</span>
                      </div>
                      <p className="text-sm font-medium text-gray-900">{pet.veterinario.nome}</p>
                      <p className="text-sm text-gray-600">{pet.veterinario.clinica}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-600">{pet.veterinario.telefone}</span>
                        </div>
                      </div>
                    </div>

                    {/* Ações Rápidas */}
                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 h-9 border-2 border-blue-200 text-blue-600 hover:bg-blue-50 rounded-lg bg-transparent"
                        onClick={(e) => {
                          e.stopPropagation()
                          router.push(`/pet/${pet.id}/vacinas`)
                        }}
                      >
                        <Shield className="w-4 h-4 mr-1" />
                        Vacinas
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 h-9 border-2 border-green-200 text-green-600 hover:bg-green-50 rounded-lg bg-transparent"
                        onClick={(e) => {
                          e.stopPropagation()
                          router.push(`/pet/${pet.id}/historico`)
                        }}
                      >
                        <Clock className="w-4 h-4 mr-1" />
                        Histórico
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Estado vazio */}
          {petsFiltrados.length === 0 && (
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardContent className="p-12 text-center">
                <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {searchTerm || filterEspecie !== "todos" || filterIdade !== "todos"
                    ? "Nenhum pet encontrado"
                    : "Você ainda não tem pets cadastrados"}
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm || filterEspecie !== "todos" || filterIdade !== "todos"
                    ? "Tente ajustar os filtros de busca"
                    : "Cadastre seu primeiro pet para começar a usar todos os recursos"}
                </p>
                <Button
                  onClick={() => router.push("/meus-pets/cadastrar")}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-xl"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Cadastrar Pet
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <FloatingButtons />
    </div>
  )
}
