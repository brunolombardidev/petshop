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
  Search,
  Star,
  Phone,
  Clock,
  Gift,
  Percent,
  History,
  QrCode,
  Download,
  Share2,
  Scan,
  Camera,
} from "lucide-react"
import { UnifiedHeader } from "@/components/unified-header"
import { FloatingButtons } from "@/components/floating-buttons"
import Image from "next/image"

export default function CartaoPetPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("todos")

  const [user] = useState({
    name: "Maria Silva",
    email: "maria@email.com",
    avatar: "/placeholder-user.jpg",
    userType: "cliente" as const,
  })

  // Dados do cartão
  const cartaoInfo = {
    numero: "4532 1234 5678 9012",
    titular: "Maria Silva",
    validade: "12/2027",
    plano: "Premium",
    status: "ativo",
    pontos: 2450,
    economiaTotal: 1250.75,
    descontoMedio: 18,
  }

  // Estabelecimentos parceiros
  const estabelecimentos = [
    {
      id: "1",
      nome: "PetShop Amigo Fiel",
      categoria: "petshop",
      desconto: 20,
      endereco: "Rua das Flores, 123 - Vila Madalena",
      telefone: "(11) 3456-7890",
      horario: "08:00 - 18:00",
      avaliacao: 4.8,
      distancia: "0.5 km",
      logo: "/placeholder.svg",
      servicos: ["Banho e Tosa", "Consultas", "Vacinas", "Produtos"],
      promocaoEspecial: "30% OFF na primeira consulta",
    },
    {
      id: "2",
      nome: "Clínica VetCare",
      categoria: "clinica",
      desconto: 15,
      endereco: "Av. Paulista, 456 - Bela Vista",
      telefone: "(11) 2345-6789",
      horario: "24 horas",
      avaliacao: 4.9,
      distancia: "1.2 km",
      logo: "/placeholder.svg",
      servicos: ["Emergência", "Cirurgias", "Exames", "Internação"],
      promocaoEspecial: "Consulta de emergência com desconto",
    },
    {
      id: "3",
      nome: "Pet Food Premium",
      categoria: "alimentacao",
      desconto: 25,
      endereco: "Rua Augusta, 789 - Consolação",
      telefone: "(11) 1234-5678",
      horario: "09:00 - 19:00",
      avaliacao: 4.7,
      distancia: "2.1 km",
      logo: "/placeholder.svg",
      servicos: ["Ração Premium", "Suplementos", "Petiscos", "Delivery"],
      promocaoEspecial: "Frete grátis acima de R$ 100",
    },
    {
      id: "4",
      nome: "Hotel Pet Paradise",
      categoria: "hospedagem",
      desconto: 18,
      endereco: "Rua dos Jardins, 321 - Jardins",
      telefone: "(11) 9876-5432",
      horario: "24 horas",
      avaliacao: 4.6,
      distancia: "3.5 km",
      logo: "/placeholder.svg",
      servicos: ["Hospedagem", "Day Care", "Recreação", "Transporte"],
      promocaoEspecial: "3 diárias pelo preço de 2",
    },
  ]

  // Histórico de uso
  const historicoUso = [
    {
      id: "1",
      data: "2024-01-15",
      estabelecimento: "PetShop Amigo Fiel",
      servico: "Banho e Tosa - Buddy",
      valorOriginal: 80.0,
      desconto: 16.0,
      valorPago: 64.0,
      pontos: 64,
    },
    {
      id: "2",
      data: "2024-01-10",
      estabelecimento: "Pet Food Premium",
      servico: "Ração Premium 15kg",
      valorOriginal: 120.0,
      desconto: 30.0,
      valorPago: 90.0,
      pontos: 90,
    },
    {
      id: "3",
      data: "2024-01-05",
      estabelecimento: "Clínica VetCare",
      servico: "Consulta Veterinária - Luna",
      valorOriginal: 150.0,
      desconto: 22.5,
      valorPago: 127.5,
      pontos: 128,
    },
  ]

  // Filtrar estabelecimentos
  const estabelecimentosFiltrados = estabelecimentos.filter((est) => {
    const matchSearch = est.nome.toLowerCase().includes(searchTerm.toLowerCase())
    const matchCategory = selectedCategory === "todos" || est.categoria === selectedCategory
    return matchSearch && matchCategory
  })

  const getCategoriaIcon = (categoria: string) => {
    switch (categoria) {
      case "petshop":
        return "🏪"
      case "clinica":
        return "🏥"
      case "alimentacao":
        return "🍖"
      case "hospedagem":
        return "🏨"
      default:
        return "🏪"
    }
  }

  const getCategoriaLabel = (categoria: string) => {
    switch (categoria) {
      case "petshop":
        return "Pet Shop"
      case "clinica":
        return "Clínica"
      case "alimentacao":
        return "Alimentação"
      case "hospedagem":
        return "Hospedagem"
      default:
        return categoria
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/50 via-blue-50/30 to-pink-50/50">
      <UnifiedHeader user={user} onNotificationsClick={() => router.push("/notificacoes")} onMenuClick={() => {}} />

      <main className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <CreditCard className="w-8 h-8 text-purple-500" />
              Cartão Pet
            </h1>
            <p className="text-gray-600">Aproveite descontos exclusivos em estabelecimentos parceiros</p>
          </div>

          {/* Cartão Virtual */}
          <Card className="border-0 shadow-2xl bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white rounded-3xl mb-8 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mb-16"></div>
            <CardContent className="p-8 relative z-10">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <Image src="/bpet-logo.png" alt="B-Pet" width={60} height={60} className="object-contain mb-4" />
                  <Badge className="bg-white/20 text-white border-0 mb-2">Plano {cartaoInfo.plano}</Badge>
                  <p className="text-purple-100 text-sm">Cartão de Benefícios Pet</p>
                </div>
                <div className="text-right">
                  <p className="text-purple-100 text-sm mb-1">Status</p>
                  <Badge className="bg-green-400 text-green-900 border-0">
                    {cartaoInfo.status === "ativo" ? "Ativo" : cartaoInfo.status}
                  </Badge>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div>
                  <p className="text-purple-100 text-sm mb-1">Número do Cartão</p>
                  <p className="text-2xl font-mono tracking-wider">{cartaoInfo.numero}</p>
                </div>
                <div className="flex justify-between">
                  <div>
                    <p className="text-purple-100 text-sm mb-1">Titular</p>
                    <p className="font-semibold">{cartaoInfo.titular}</p>
                  </div>
                  <div>
                    <p className="text-purple-100 text-sm mb-1">Válido até</p>
                    <p className="font-semibold">{cartaoInfo.validade}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold">{cartaoInfo.pontos.toLocaleString()}</p>
                  <p className="text-purple-100 text-sm">Pontos</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold">R$ {cartaoInfo.economiaTotal.toFixed(0)}</p>
                  <p className="text-purple-100 text-sm">Economia Total</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold">{cartaoInfo.descontoMedio}%</p>
                  <p className="text-purple-100 text-sm">Desconto Médio</p>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white border-0 flex-1"
                  onClick={() => {}}
                >
                  <QrCode className="w-4 h-4 mr-2" />
                  QR Code
                </Button>
                <Button
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white border-0 flex-1"
                  onClick={() => {}}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Baixar
                </Button>
                <Button
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white border-0 flex-1"
                  onClick={() => {}}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Compartilhar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* QR Code do Usuário */}
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm rounded-2xl mb-8">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <QrCode className="w-5 h-5 text-purple-500" />
                Meu QR Code
              </CardTitle>
              <CardDescription className="text-gray-600">
                Use este código para se identificar nos estabelecimentos parceiros
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-48 h-48 bg-white border-4 border-gray-200 rounded-2xl flex items-center justify-center shadow-lg">
                  <div className="w-40 h-40 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center">
                    <div className="grid grid-cols-6 gap-1">
                      {Array.from({ length: 36 }).map((_, i) => (
                        <div key={i} className={`w-2 h-2 ${Math.random() > 0.5 ? "bg-gray-900" : "bg-transparent"}`} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Como usar seu QR Code</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Apresente nos estabelecimentos parceiros</li>
                      <li>• Ganhe pontos e descontos automaticamente</li>
                      <li>• Identificação rápida e segura</li>
                    </ul>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      onClick={() => router.push("/qrcode")}
                      className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white rounded-xl"
                    >
                      <QrCode className="w-4 h-4 mr-2" />
                      Ver QR Code
                    </Button>
                    <Button
                      onClick={() => router.push("/qrcode")}
                      variant="outline"
                      className="border-2 border-gray-200 rounded-xl"
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Escanear QR Code
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Validar Cliente ou Fornecedor */}
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm rounded-2xl mb-8">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Scan className="w-5 h-5 text-green-500" />
                Validar Cliente ou Fornecedor
              </CardTitle>
              <CardDescription className="text-gray-600">
                Escaneie QR codes para verificar usuários do sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-48 h-48 bg-gray-100 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <Scan className="w-16 h-16 text-gray-400 mx-auto mb-3" />
                    <p className="text-sm text-gray-600">Scanner QR Code</p>
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Verificação de Usuários</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Confirme se é um usuário ativo do B-Pet</li>
                      <li>• Veja informações básicas do usuário</li>
                      <li>• Efetue vendas diretamente pelo sistema</li>
                    </ul>
                  </div>
                  <Button
                    onClick={() => router.push("/qrcode")}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Escanear QR Code
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

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
                          placeholder="Buscar estabelecimentos..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 h-12 border-2 border-gray-200 rounded-xl"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {["todos", "petshop", "clinica", "alimentacao", "hospedagem"].map((categoria) => (
                        <Button
                          key={categoria}
                          variant={selectedCategory === categoria ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedCategory(categoria)}
                          className="rounded-xl"
                        >
                          {categoria === "todos" ? "Todos" : getCategoriaLabel(categoria)}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Lista de Estabelecimentos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {estabelecimentosFiltrados.map((estabelecimento) => (
                  <Card
                    key={estabelecimento.id}
                    className="border-0 shadow-xl bg-white/90 backdrop-blur-sm rounded-2xl hover:shadow-2xl transition-all duration-300"
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center">
                            <span className="text-2xl">{getCategoriaIcon(estabelecimento.categoria)}</span>
                          </div>
                          <div>
                            <CardTitle className="text-lg font-bold text-gray-900">{estabelecimento.nome}</CardTitle>
                            <CardDescription className="text-gray-600">
                              {getCategoriaLabel(estabelecimento.categoria)}
                            </CardDescription>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                <span className="text-sm font-medium">{estabelecimento.avaliacao}</span>
                              </div>
                              <span className="text-gray-300">•</span>
                              <span className="text-sm text-gray-600">{estabelecimento.distancia}</span>
                            </div>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800 border-0 text-lg font-bold">
                          {estabelecimento.desconto}% OFF
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Promoção Especial */}
                      {estabelecimento.promocaoEspecial && (
                        <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-3">
                          <div className="flex items-center gap-2">
                            <Gift className="w-4 h-4 text-orange-500" />
                            <span className="text-sm font-medium text-orange-800">Promoção Especial</span>
                          </div>
                          <p className="text-sm text-orange-700 mt-1">{estabelecimento.promocaoEspecial}</p>
                        </div>
                      )}

                      {/* Informações */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{estabelecimento.endereco}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4" />
                          <span>{estabelecimento.telefone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{estabelecimento.horario}</span>
                        </div>
                      </div>

                      {/* Serviços */}
                      <div>
                        <p className="text-sm font-medium text-gray-900 mb-2">Serviços:</p>
                        <div className="flex flex-wrap gap-1">
                          {estabelecimento.servicos.map((servico, index) => (
                            <Badge key={index} className="bg-blue-100 text-blue-800 border-0 text-xs">
                              {servico}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Ações */}
                      <div className="flex gap-2 pt-2">
                        <Button
                          size="sm"
                          className="flex-1 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white rounded-xl"
                        >
                          <MapPin className="w-4 h-4 mr-1" />
                          Ver no Mapa
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 border-2 border-gray-200 hover:bg-gray-50 rounded-xl bg-transparent"
                        >
                          <Phone className="w-4 h-4 mr-1" />
                          Ligar
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
                    <History className="w-5 h-5 text-green-500" />
                    Histórico de Uso do Cartão
                  </CardTitle>
                  <CardDescription className="text-gray-600">Suas últimas transações e economia gerada</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {historicoUso.map((uso) => (
                    <div key={uso.id} className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                            <Percent className="w-6 h-6 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{uso.estabelecimento}</h4>
                            <p className="text-sm text-gray-600">{uso.servico}</p>
                            <p className="text-sm text-gray-500">{new Date(uso.data).toLocaleDateString("pt-BR")}</p>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-500 line-through">
                                R$ {uso.valorOriginal.toFixed(2)}
                              </span>
                              <Badge className="bg-green-100 text-green-800 border-0 text-xs">
                                -R$ {uso.desconto.toFixed(2)}
                              </Badge>
                            </div>
                            <p className="font-bold text-lg text-gray-900">R$ {uso.valorPago.toFixed(2)}</p>
                            <p className="text-sm text-blue-600">+{uso.pontos} pontos</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {historicoUso.length === 0 && (
                    <div className="text-center py-8">
                      <History className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600">Nenhuma transação encontrada</p>
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
