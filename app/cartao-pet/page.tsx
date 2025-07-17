"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CreditCard,
  MapPin,
  Star,
  Clock,
  Phone,
  Heart,
  Gift,
  Percent,
  Calendar,
  Search,
  QrCode,
  Share2,
  Wallet,
  TrendingUp,
  Award,
  Users,
  ShoppingBag,
} from "lucide-react"
import { UnifiedHeader } from "@/components/unified-header"
import { FloatingButtons } from "@/components/floating-buttons"
import Image from "next/image"

export default function CartaoPetPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategoria, setFilterCategoria] = useState("todos")

  const [user] = useState({
    name: "Maria Silva",
    email: "maria@email.com",
    avatar: "/placeholder-user.jpg",
    userType: "cliente" as const,
  })

  // Dados do cartão
  const cartaoInfo = {
    numero: "**** **** **** 1234",
    titular: "Maria Silva",
    validade: "12/2027",
    status: "ativo",
    saldo: 450.0,
    pontos: 1250,
    nivel: "Gold",
    proximoNivel: "Platinum",
    pontosProximoNivel: 2500,
  }

  // Estatísticas
  const estatisticas = {
    economiaTotal: 1850.5,
    servicosUtilizados: 24,
    estabelecimentosFavoritos: 8,
    descontosObtidos: 15,
  }

  // Estabelecimentos parceiros
  const estabelecimentos = [
    {
      id: "1",
      nome: "PetShop VetCare",
      categoria: "veterinario",
      endereco: "Rua das Flores, 123 - Centro",
      telefone: "(11) 99999-1234",
      email: "contato@vetcare.com",
      desconto: 15,
      avaliacao: 4.8,
      distancia: 0.8,
      foto: "/placeholder.jpg",
      servicos: ["Consulta", "Vacinação", "Cirurgia"],
      horario: "Seg-Sex: 8h-18h, Sáb: 8h-12h",
      especialidades: ["Clínica Geral", "Cirurgia", "Dermatologia"],
    },
    {
      id: "2",
      nome: "PetSpa Premium",
      categoria: "estetica",
      endereco: "Av. Principal, 456 - Jardins",
      telefone: "(11) 88888-5678",
      email: "contato@petspa.com",
      desconto: 20,
      avaliacao: 4.9,
      distancia: 1.2,
      foto: "/placeholder.jpg",
      servicos: ["Banho", "Tosa", "Hidratação"],
      horario: "Seg-Sáb: 9h-19h",
      especialidades: ["Tosa Criativa", "Spa Relaxante", "Tratamentos"],
    },
    {
      id: "3",
      nome: "Pet Store Max",
      categoria: "loja",
      endereco: "Shopping Center, Loja 45",
      telefone: "(11) 77777-9012",
      email: "vendas@petstoremax.com",
      desconto: 10,
      avaliacao: 4.6,
      distancia: 2.1,
      foto: "/placeholder.jpg",
      servicos: ["Ração", "Brinquedos", "Acessórios"],
      horario: "Seg-Dom: 10h-22h",
      especialidades: ["Rações Premium", "Brinquedos Importados", "Acessórios"],
    },
    {
      id: "4",
      nome: "Hotel Pet Paradise",
      categoria: "hotel",
      endereco: "Rua Tranquila, 789 - Vila Verde",
      telefone: "(11) 66666-3456",
      email: "reservas@petparadise.com",
      desconto: 25,
      avaliacao: 4.7,
      distancia: 3.5,
      foto: "/placeholder.jpg",
      servicos: ["Hospedagem", "Day Care", "Recreação"],
      horario: "24h",
      especialidades: ["Suítes Premium", "Recreação", "Cuidados Especiais"],
    },
    {
      id: "5",
      nome: "Adestramento Pro",
      categoria: "adestramento",
      endereco: "Parque dos Pets, s/n",
      telefone: "(11) 55555-7890",
      email: "treino@adestramentopro.com",
      desconto: 30,
      avaliacao: 4.9,
      distancia: 1.8,
      foto: "/placeholder.jpg",
      servicos: ["Adestramento", "Socialização", "Comportamento"],
      horario: "Seg-Sex: 7h-17h, Sáb: 8h-12h",
      especialidades: ["Obediência Básica", "Correção Comportamental", "Socialização"],
    },
  ]

  // Histórico de uso
  const historicoUso = [
    {
      id: "1",
      data: "2024-01-15",
      estabelecimento: "PetShop VetCare",
      servico: "Consulta Veterinária",
      valor: 120.0,
      desconto: 18.0,
      valorPago: 102.0,
      pontos: 51,
    },
    {
      id: "2",
      data: "2024-01-10",
      estabelecimento: "PetSpa Premium",
      servico: "Banho e Tosa",
      valor: 80.0,
      desconto: 16.0,
      valorPago: 64.0,
      pontos: 32,
    },
    {
      id: "3",
      data: "2024-01-05",
      estabelecimento: "Pet Store Max",
      servico: "Ração Premium 15kg",
      valor: 150.0,
      desconto: 15.0,
      valorPago: 135.0,
      pontos: 67,
    },
  ]

  // Filtrar estabelecimentos
  const estabelecimentosFiltrados = estabelecimentos.filter((est) => {
    const matchNome = est.nome.toLowerCase().includes(searchTerm.toLowerCase())
    const matchCategoria = filterCategoria === "todos" || est.categoria === filterCategoria
    return matchNome && matchCategoria
  })

  const getCategoriaLabel = (categoria: string) => {
    const labels = {
      veterinario: "Veterinário",
      estetica: "Estética",
      loja: "Pet Shop",
      hotel: "Hotel",
      adestramento: "Adestramento",
    }
    return labels[categoria as keyof typeof labels] || categoria
  }

  const getCategoriaColor = (categoria: string) => {
    const colors = {
      veterinario: "bg-green-100 text-green-800",
      estetica: "bg-pink-100 text-pink-800",
      loja: "bg-blue-100 text-blue-800",
      hotel: "bg-purple-100 text-purple-800",
      adestramento: "bg-orange-100 text-orange-800",
    }
    return colors[categoria as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const getNivelColor = (nivel: string) => {
    const colors = {
      Bronze: "from-amber-600 to-amber-700",
      Silver: "from-gray-400 to-gray-600",
      Gold: "from-yellow-400 to-yellow-600",
      Platinum: "from-purple-400 to-purple-600",
      Diamond: "from-blue-400 to-blue-600",
    }
    return colors[nivel as keyof typeof colors] || "from-gray-400 to-gray-600"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50">
      <UnifiedHeader user={user} />

      <main className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <CreditCard className="w-8 h-8 text-blue-500" />
              Cartão Pet
            </h1>
            <p className="text-gray-600">Seu cartão de benefícios para pets com descontos exclusivos</p>
          </div>

          {/* Cartão Virtual */}
          <Card className="border-0 shadow-2xl bg-gradient-to-br from-blue-600 to-purple-700 text-white rounded-3xl mb-8 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>

            <CardContent className="p-8">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="w-6 h-6" />
                    <span className="text-lg font-semibold">B-Pet Card</span>
                  </div>
                  <Badge className={`bg-gradient-to-r ${getNivelColor(cartaoInfo.nivel)} text-white border-0`}>
                    {cartaoInfo.nivel}
                  </Badge>
                </div>
                <div className="text-right">
                  <p className="text-sm opacity-80">Saldo Disponível</p>
                  <p className="text-2xl font-bold">R$ {cartaoInfo.saldo.toFixed(2)}</p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-3xl font-mono tracking-wider mb-2">{cartaoInfo.numero}</p>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-sm opacity-80">Titular</p>
                    <p className="font-semibold">{cartaoInfo.titular}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm opacity-80">Válido até</p>
                    <p className="font-semibold">{cartaoInfo.validade}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-sm opacity-80">Pontos</p>
                    <p className="text-xl font-bold">{cartaoInfo.pontos.toLocaleString()}</p>
                  </div>
                  <div className="w-px h-8 bg-white/30"></div>
                  <div>
                    <p className="text-sm opacity-80">Para {cartaoInfo.proximoNivel}</p>
                    <p className="text-sm">{cartaoInfo.pontosProximoNivel - cartaoInfo.pontos} pontos</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-0">
                    <QrCode className="w-4 h-4 mr-1" />
                    QR Code
                  </Button>
                  <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-0">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Economia Total</p>
                    <p className="text-2xl font-bold">R$ {estatisticas.economiaTotal.toFixed(0)}</p>
                  </div>
                  <Wallet className="w-8 h-8 text-green-200" />
                </div>
                <div className="mt-2 flex items-center gap-1 text-green-100 text-sm">
                  <TrendingUp className="w-3 h-3" />
                  Este ano
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Serviços Utilizados</p>
                    <p className="text-2xl font-bold">{estatisticas.servicosUtilizados}</p>
                  </div>
                  <ShoppingBag className="w-8 h-8 text-blue-200" />
                </div>
                <div className="mt-2 flex items-center gap-1 text-blue-100 text-sm">
                  <Award className="w-3 h-3" />
                  Este ano
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Estabelecimentos</p>
                    <p className="text-2xl font-bold">{estatisticas.estabelecimentosFavoritos}</p>
                  </div>
                  <Users className="w-8 h-8 text-purple-200" />
                </div>
                <div className="mt-2 flex items-center gap-1 text-purple-100 text-sm">
                  <Heart className="w-3 h-3" />
                  Favoritos
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm">Descontos</p>
                    <p className="text-2xl font-bold">{estatisticas.descontosObtidos}</p>
                  </div>
                  <Percent className="w-8 h-8 text-orange-200" />
                </div>
                <div className="mt-2 flex items-center gap-1 text-orange-100 text-sm">
                  <Gift className="w-3 h-3" />
                  Utilizados
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="estabelecimentos" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg">
              <TabsTrigger value="estabelecimentos" className="rounded-xl">
                Estabelecimentos Parceiros
              </TabsTrigger>
              <TabsTrigger value="historico" className="rounded-xl">
                Histórico de Uso
              </TabsTrigger>
            </TabsList>

            <TabsContent value="estabelecimentos" className="space-y-6">
              {/* Filtros */}
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          placeholder="Buscar estabelecimento..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 h-12 border-2 border-gray-200 rounded-xl"
                        />
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <select
                        value={filterCategoria}
                        onChange={(e) => setFilterCategoria(e.target.value)}
                        className="h-12 px-4 border-2 border-gray-200 rounded-xl bg-white"
                      >
                        <option value="todos">Todas as categorias</option>
                        <option value="veterinario">Veterinário</option>
                        <option value="estetica">Estética</option>
                        <option value="loja">Pet Shop</option>
                        <option value="hotel">Hotel</option>
                        <option value="adestramento">Adestramento</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Lista de Estabelecimentos */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {estabelecimentosFiltrados.map((estabelecimento) => (
                  <Card
                    key={estabelecimento.id}
                    className="border-0 shadow-xl bg-white/90 backdrop-blur-sm rounded-2xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
                    onClick={() => router.push(`/estabelecimento/${estabelecimento.id}`)}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start gap-4">
                        <Image
                          src={estabelecimento.foto || "/placeholder.svg"}
                          alt={estabelecimento.nome}
                          width={60}
                          height={60}
                          className="rounded-xl object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <CardTitle className="text-lg font-bold text-gray-900">{estabelecimento.nome}</CardTitle>
                            <Badge className="bg-red-100 text-red-800 border-0 font-bold">
                              -{estabelecimento.desconto}%
                            </Badge>
                          </div>
                          <Badge className={`${getCategoriaColor(estabelecimento.categoria)} border-0 mb-2`}>
                            {getCategoriaLabel(estabelecimento.categoria)}
                          </Badge>
                          <div className="flex items-center gap-1 mb-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium">{estabelecimento.avaliacao}</span>
                            <span className="text-sm text-gray-500">• {estabelecimento.distancia}km</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{estabelecimento.endereco}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{estabelecimento.horario}</span>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-900 mb-2">Serviços:</p>
                        <div className="flex flex-wrap gap-1">
                          {estabelecimento.servicos.slice(0, 3).map((servico, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {servico}
                            </Badge>
                          ))}
                          {estabelecimento.servicos.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{estabelecimento.servicos.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 h-9 border-2 border-blue-200 text-blue-600 hover:bg-blue-50 rounded-lg bg-transparent"
                          onClick={(e) => {
                            e.stopPropagation()
                            window.open(`tel:${estabelecimento.telefone}`)
                          }}
                        >
                          <Phone className="w-4 h-4 mr-1" />
                          Ligar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 h-9 border-2 border-green-200 text-green-600 hover:bg-green-50 rounded-lg bg-transparent"
                          onClick={(e) => {
                            e.stopPropagation()
                            router.push(`/agendamento/${estabelecimento.id}`)
                          }}
                        >
                          <Calendar className="w-4 h-4 mr-1" />
                          Agendar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {estabelecimentosFiltrados.length === 0 && (
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
                  <CardContent className="p-12 text-center">
                    <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhum estabelecimento encontrado</h3>
                    <p className="text-gray-600">Tente ajustar os filtros de busca</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="historico" className="space-y-6">
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-500" />
                    Histórico de Uso
                  </CardTitle>
                  <CardDescription className="text-gray-600">Suas últimas utilizações do cartão pet</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {historicoUso.map((uso) => (
                    <div key={uso.id} className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">{uso.estabelecimento}</h4>
                          <p className="text-sm text-gray-600">{uso.servico}</p>
                          <p className="text-xs text-gray-500">{new Date(uso.data).toLocaleDateString("pt-BR")}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm text-gray-500 line-through">R$ {uso.valor.toFixed(2)}</span>
                            <Badge className="bg-green-100 text-green-800 border-0">
                              -R$ {uso.desconto.toFixed(2)}
                            </Badge>
                          </div>
                          <p className="font-bold text-green-600">R$ {uso.valorPago.toFixed(2)}</p>
                          <p className="text-xs text-blue-600">+{uso.pontos} pontos</p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {historicoUso.length === 0 && (
                    <div className="text-center py-8">
                      <Clock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600">Nenhum uso registrado ainda</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <FloatingButtons />
    </div>
  )
}
