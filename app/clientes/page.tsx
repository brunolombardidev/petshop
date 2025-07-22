"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Search, Heart, Phone, MapPin, ShoppingCart, ArrowLeft, CheckCircle } from "lucide-react"
import { UnifiedHeader } from "@/components/unified-header"
import { FloatingButtons } from "@/components/floating-buttons"

export default function ClientesPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [user] = useState({
    name: "PetShop VetCare",
    email: "contato@vetcare.com",
    avatar: "/placeholder-logo.png",
    userType: "petshop" as const,
  })

  const [searchTerm, setSearchTerm] = useState("")
  const [filtroStatus, setFiltroStatus] = useState("todos")
  const [mostrarNovaVenda, setMostrarNovaVenda] = useState(false)
  const [clienteSelecionado, setClienteSelecionado] = useState<any>(null)
  const [novaVenda, setNovaVenda] = useState({
    petId: "",
    servicos: [] as string[],
    produtos: [] as string[],
    observacoes: "",
    desconto: 0,
    total: 0,
  })

  const clientes = [
    {
      id: "1",
      nome: "Maria Silva",
      email: "maria@email.com",
      telefone: "(11) 99999-1234",
      endereco: "Rua das Flores, 123 - Vila Madalena",
      pets: [
        { id: "1", nome: "Buddy", especie: "Cão", raca: "Golden Retriever" },
        { id: "2", nome: "Luna", especie: "Gato", raca: "Siamês" },
      ],
      ultimaVisita: "2024-01-15",
      totalGasto: 850.5,
      status: "ativo",
      avaliacaoMedia: 4.8,
    },
    {
      id: "2",
      nome: "João Santos",
      email: "joao@email.com",
      telefone: "(11) 88888-5678",
      endereco: "Av. Paulista, 456 - Bela Vista",
      pets: [{ id: "3", nome: "Max", especie: "Cão", raca: "Labrador" }],
      ultimaVisita: "2024-01-10",
      totalGasto: 420.0,
      status: "ativo",
      avaliacaoMedia: 4.5,
    },
    {
      id: "3",
      nome: "Ana Costa",
      email: "ana@email.com",
      telefone: "(11) 77777-9012",
      endereco: "Rua Augusta, 789 - Consolação",
      pets: [
        { id: "4", nome: "Mimi", especie: "Gato", raca: "Persa" },
        { id: "5", nome: "Thor", especie: "Cão", raca: "Pastor Alemão" },
      ],
      ultimaVisita: "2024-01-05",
      totalGasto: 1200.75,
      status: "inativo",
      avaliacaoMedia: 4.9,
    },
  ]

  const servicos = [
    { id: "1", nome: "Consulta Veterinária", preco: 120.0 },
    { id: "2", nome: "Banho e Tosa", preco: 80.0 },
    { id: "3", nome: "Vacinação", preco: 60.0 },
    { id: "4", nome: "Castração", preco: 300.0 },
    { id: "5", nome: "Exame de Sangue", preco: 150.0 },
  ]

  const produtos = [
    { id: "1", nome: "Ração Premium 15kg", preco: 120.0 },
    { id: "2", nome: "Brinquedo Interativo", preco: 35.0 },
    { id: "3", nome: "Coleira Antipulgas", preco: 45.0 },
    { id: "4", nome: "Shampoo Medicinal", preco: 25.0 },
  ]

  const clientesFiltrados = clientes.filter((cliente) => {
    const matchSearch =
      cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchStatus = filtroStatus === "todos" || cliente.status === filtroStatus
    return matchSearch && matchStatus
  })

  const calcularTotal = () => {
    let total = 0

    novaVenda.servicos.forEach((servicoId) => {
      const servico = servicos.find((s) => s.id === servicoId)
      if (servico) total += servico.preco
    })

    novaVenda.produtos.forEach((produtoId) => {
      const produto = produtos.find((p) => p.id === produtoId)
      if (produto) total += produto.preco
    })

    const desconto = (total * novaVenda.desconto) / 100
    return total - desconto
  }

  const handleNovaVenda = (cliente: any) => {
    setClienteSelecionado(cliente)
    setMostrarNovaVenda(true)
  }

  const handleFinalizarVenda = () => {
    const total = calcularTotal()

    // Simular salvamento da venda
    console.log("Nova venda:", {
      cliente: clienteSelecionado,
      ...novaVenda,
      total,
    })

    alert(`Venda realizada com sucesso! Total: R$ ${total.toFixed(2)}`)

    // Reset
    setNovaVenda({
      petId: "",
      servicos: [],
      produtos: [],
      observacoes: "",
      desconto: 0,
      total: 0,
    })
    setMostrarNovaVenda(false)
    setClienteSelecionado(null)
  }

  const toggleServico = (servicoId: string) => {
    setNovaVenda((prev) => ({
      ...prev,
      servicos: prev.servicos.includes(servicoId)
        ? prev.servicos.filter((id) => id !== servicoId)
        : [...prev.servicos, servicoId],
    }))
  }

  const toggleProduto = (produtoId: string) => {
    setNovaVenda((prev) => ({
      ...prev,
      produtos: prev.produtos.includes(produtoId)
        ? prev.produtos.filter((id) => id !== produtoId)
        : [...prev.produtos, produtoId],
    }))
  }

  // Verificar se deve abrir modal de nova venda automaticamente
  useEffect(() => {
    const action = searchParams.get("action")
    const usuario = searchParams.get("usuario")

    if (action === "nova-venda" && usuario) {
      const cliente = clientes.find((c) => c.nome === usuario)
      if (cliente) {
        handleNovaVenda(cliente)
      }
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50">
      <UnifiedHeader user={user} />

      <main className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="hover:bg-white/50 rounded-xl">
              <ArrowLeft className="h-5 w-5 text-gray-700" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Users className="w-8 h-8 text-blue-500" />
                Clientes
              </h1>
              <p className="text-gray-600">Gerencie seus clientes e realize vendas</p>
            </div>
          </div>

          {/* Filtros */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      placeholder="Buscar clientes..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-12 border-2 border-gray-200 rounded-xl"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={filtroStatus === "todos" ? "default" : "outline"}
                    onClick={() => setFiltroStatus("todos")}
                    className="rounded-xl"
                  >
                    Todos
                  </Button>
                  <Button
                    variant={filtroStatus === "ativo" ? "default" : "outline"}
                    onClick={() => setFiltroStatus("ativo")}
                    className="rounded-xl"
                  >
                    Ativos
                  </Button>
                  <Button
                    variant={filtroStatus === "inativo" ? "default" : "outline"}
                    onClick={() => setFiltroStatus("inativo")}
                    className="rounded-xl"
                  >
                    Inativos
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lista de Clientes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {clientesFiltrados.map((cliente) => (
              <Card key={cliente.id} className="border-0 shadow-xl bg-white/90 backdrop-blur-sm rounded-2xl">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-900">{cliente.nome}</CardTitle>
                      <CardDescription className="text-gray-600">{cliente.email}</CardDescription>
                    </div>
                    <Badge
                      className={
                        cliente.status === "ativo"
                          ? "bg-green-100 text-green-800 border-0"
                          : "bg-gray-100 text-gray-800 border-0"
                      }
                    >
                      {cliente.status === "ativo" ? "Ativo" : "Inativo"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Informações de Contato */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{cliente.telefone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{cliente.endereco}</span>
                    </div>
                  </div>

                  {/* Pets */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Heart className="w-4 h-4 text-pink-500" />
                      Pets ({cliente.pets.length})
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {cliente.pets.map((pet) => (
                        <Badge key={pet.id} className="bg-pink-100 text-pink-800 border-0">
                          {pet.nome} ({pet.especie})
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Estatísticas */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">R$ {cliente.totalGasto.toFixed(0)}</p>
                      <p className="text-xs text-gray-500">Total Gasto</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">
                        {new Date(cliente.ultimaVisita).toLocaleDateString("pt-BR")}
                      </p>
                      <p className="text-xs text-gray-500">Última Visita</p>
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="flex gap-2 pt-4">
                    <Button
                      onClick={() => handleNovaVenda(cliente)}
                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Nova Venda
                    </Button>
                    <Button
                      onClick={() => router.push(`/clientes/${cliente.id}`)}
                      variant="outline"
                      className="flex-1 border-2 border-gray-200 rounded-xl"
                    >
                      Ver Detalhes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {clientesFiltrados.length === 0 && (
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardContent className="p-12 text-center">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhum cliente encontrado</h3>
                <p className="text-gray-600">Tente ajustar os filtros de busca</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      {/* Modal Nova Venda */}
      <Dialog open={mostrarNovaVenda} onOpenChange={setMostrarNovaVenda}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShoppingCart className="w-6 h-6 text-green-500" />
              Nova Venda - {clienteSelecionado?.nome}
            </DialogTitle>
            <DialogDescription>Selecione os serviços e produtos para esta venda</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Seleção do Pet */}
            <div className="space-y-2">
              <Label>Pet</Label>
              <Select
                value={novaVenda.petId}
                onValueChange={(value) => setNovaVenda((prev) => ({ ...prev, petId: value }))}
              >
                <SelectTrigger className="h-11 border-gray-200 rounded-xl">
                  <SelectValue placeholder="Selecione o pet" />
                </SelectTrigger>
                <SelectContent>
                  {clienteSelecionado?.pets.map((pet: any) => (
                    <SelectItem key={pet.id} value={pet.id}>
                      {pet.nome} ({pet.especie} - {pet.raca})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Tabs defaultValue="servicos" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="servicos">Serviços</TabsTrigger>
                <TabsTrigger value="produtos">Produtos</TabsTrigger>
              </TabsList>

              <TabsContent value="servicos" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {servicos.map((servico) => (
                    <Card
                      key={servico.id}
                      className={`cursor-pointer transition-all ${
                        novaVenda.servicos.includes(servico.id)
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => toggleServico(servico.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-900">{servico.nome}</h4>
                            <p className="text-lg font-bold text-green-600">R$ {servico.preco.toFixed(2)}</p>
                          </div>
                          {novaVenda.servicos.includes(servico.id) && (
                            <CheckCircle className="w-6 h-6 text-green-500" />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="produtos" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {produtos.map((produto) => (
                    <Card
                      key={produto.id}
                      className={`cursor-pointer transition-all ${
                        novaVenda.produtos.includes(produto.id)
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => toggleProduto(produto.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-900">{produto.nome}</h4>
                            <p className="text-lg font-bold text-blue-600">R$ {produto.preco.toFixed(2)}</p>
                          </div>
                          {novaVenda.produtos.includes(produto.id) && <CheckCircle className="w-6 h-6 text-blue-500" />}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            {/* Desconto e Observações */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Desconto (%)</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={novaVenda.desconto}
                  onChange={(e) => setNovaVenda((prev) => ({ ...prev, desconto: Number(e.target.value) }))}
                  className="h-11 border-gray-200 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label>Total</Label>
                <div className="h-11 px-3 border border-gray-200 rounded-xl flex items-center bg-gray-50">
                  <span className="text-2xl font-bold text-green-600">R$ {calcularTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Observações</Label>
              <textarea
                value={novaVenda.observacoes}
                onChange={(e) => setNovaVenda((prev) => ({ ...prev, observacoes: e.target.value }))}
                placeholder="Observações sobre a venda..."
                className="w-full h-24 px-3 py-2 border border-gray-200 rounded-xl resize-none"
              />
            </div>

            {/* Resumo da Venda */}
            {(novaVenda.servicos.length > 0 || novaVenda.produtos.length > 0) && (
              <Card className="border-2 border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-lg text-green-800">Resumo da Venda</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {novaVenda.servicos.length > 0 && (
                    <div>
                      <h5 className="font-semibold text-green-800 mb-1">Serviços:</h5>
                      {novaVenda.servicos.map((servicoId) => {
                        const servico = servicos.find((s) => s.id === servicoId)
                        return servico ? (
                          <div key={servicoId} className="flex justify-between text-sm">
                            <span>{servico.nome}</span>
                            <span>R$ {servico.preco.toFixed(2)}</span>
                          </div>
                        ) : null
                      })}
                    </div>
                  )}

                  {novaVenda.produtos.length > 0 && (
                    <div>
                      <h5 className="font-semibold text-green-800 mb-1">Produtos:</h5>
                      {novaVenda.produtos.map((produtoId) => {
                        const produto = produtos.find((p) => p.id === produtoId)
                        return produto ? (
                          <div key={produtoId} className="flex justify-between text-sm">
                            <span>{produto.nome}</span>
                            <span>R$ {produto.preco.toFixed(2)}</span>
                          </div>
                        ) : null
                      })}
                    </div>
                  )}

                  {novaVenda.desconto > 0 && (
                    <div className="flex justify-between text-sm text-red-600 border-t pt-2">
                      <span>Desconto ({novaVenda.desconto}%)</span>
                      <span>
                        -R${" "}
                        {((calcularTotal() / (1 - novaVenda.desconto / 100)) * (novaVenda.desconto / 100)).toFixed(2)}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between text-lg font-bold text-green-800 border-t pt-2">
                    <span>Total</span>
                    <span>R$ {calcularTotal().toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Botões */}
            <div className="flex gap-3">
              <Button
                onClick={handleFinalizarVenda}
                disabled={!novaVenda.petId || (novaVenda.servicos.length === 0 && novaVenda.produtos.length === 0)}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Finalizar Venda
              </Button>
              <Button
                onClick={() => setMostrarNovaVenda(false)}
                variant="outline"
                className="flex-1 border-2 border-gray-200 rounded-xl"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <FloatingButtons />
    </div>
  )
}
