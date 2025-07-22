"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DollarSign, TrendingUp, TrendingDown, Plus, Download, ArrowLeft, PieChart, BarChart3 } from "lucide-react"
import { UnifiedHeader } from "@/components/unified-header"
import { FloatingButtons } from "@/components/floating-buttons"

export default function ReceitasDespesasPage() {
  const router = useRouter()

  const [user] = useState({
    name: "PetShop VetCare",
    email: "contato@vetcare.com",
    avatar: "/placeholder-logo.png",
    userType: "petshop" as const,
  })

  const [filtroMes, setFiltroMes] = useState("2024-01")
  const [filtroCategoria, setFiltroCategoria] = useState("todas")
  const [mostrarNovaTransacao, setMostrarNovaTransacao] = useState(false)
  const [tipoTransacao, setTipoTransacao] = useState<"receita" | "despesa">("receita")

  const [novaTransacao, setNovaTransacao] = useState({
    tipo: "receita" as "receita" | "despesa",
    categoria: "",
    descricao: "",
    valor: 0,
    data: new Date().toISOString().split("T")[0],
    cliente: "",
    formaPagamento: "",
  })

  // Dados mockados
  const transacoes = [
    {
      id: "1",
      tipo: "receita",
      categoria: "Serviços",
      descricao: "Consulta Veterinária - Buddy",
      valor: 120.0,
      data: "2024-01-15",
      cliente: "Maria Silva",
      formaPagamento: "Cartão",
    },
    {
      id: "2",
      tipo: "receita",
      categoria: "Produtos",
      descricao: "Ração Premium 15kg",
      valor: 85.0,
      data: "2024-01-14",
      cliente: "João Santos",
      formaPagamento: "PIX",
    },
    {
      id: "3",
      tipo: "despesa",
      categoria: "Fornecedores",
      descricao: "Compra de medicamentos",
      valor: 450.0,
      data: "2024-01-13",
      cliente: "",
      formaPagamento: "Boleto",
    },
    {
      id: "4",
      tipo: "despesa",
      categoria: "Operacional",
      descricao: "Conta de luz",
      valor: 280.0,
      data: "2024-01-12",
      cliente: "",
      formaPagamento: "Débito",
    },
    {
      id: "5",
      tipo: "receita",
      categoria: "Serviços",
      descricao: "Banho e Tosa - Luna",
      valor: 60.0,
      data: "2024-01-11",
      cliente: "Ana Costa",
      formaPagamento: "Dinheiro",
    },
  ]

  const categorias = {
    receita: ["Serviços", "Produtos", "Consultorias", "Outros"],
    despesa: ["Fornecedores", "Operacional", "Pessoal", "Marketing", "Outros"],
  }

  const formasPagamento = ["Dinheiro", "PIX", "Cartão", "Débito", "Boleto", "Transferência"]

  // Cálculos
  const totalReceitas = transacoes.filter((t) => t.tipo === "receita").reduce((sum, t) => sum + t.valor, 0)

  const totalDespesas = transacoes.filter((t) => t.tipo === "despesa").reduce((sum, t) => sum + t.valor, 0)

  const lucroLiquido = totalReceitas - totalDespesas

  const receitasPorCategoria = transacoes
    .filter((t) => t.tipo === "receita")
    .reduce(
      (acc, t) => {
        acc[t.categoria] = (acc[t.categoria] || 0) + t.valor
        return acc
      },
      {} as Record<string, number>,
    )

  const despesasPorCategoria = transacoes
    .filter((t) => t.tipo === "despesa")
    .reduce(
      (acc, t) => {
        acc[t.categoria] = (acc[t.categoria] || 0) + t.valor
        return acc
      },
      {} as Record<string, number>,
    )

  const handleNovaTransacao = (tipo: "receita" | "despesa") => {
    setTipoTransacao(tipo)
    setNovaTransacao((prev) => ({ ...prev, tipo, categoria: "" }))
    setMostrarNovaTransacao(true)
  }

  const handleSalvarTransacao = () => {
    console.log("Nova transação:", novaTransacao)
    alert("Transação salva com sucesso!")

    // Reset
    setNovaTransacao({
      tipo: "receita",
      categoria: "",
      descricao: "",
      valor: 0,
      data: new Date().toISOString().split("T")[0],
      cliente: "",
      formaPagamento: "",
    })
    setMostrarNovaTransacao(false)
  }

  const transacoesFiltradas = transacoes.filter((transacao) => {
    const matchCategoria = filtroCategoria === "todas" || transacao.categoria === filtroCategoria
    const matchMes = transacao.data.startsWith(filtroMes)
    return matchCategoria && matchMes
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/50 via-blue-50/30 to-purple-50/50">
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
                <DollarSign className="w-8 h-8 text-green-500" />
                Receitas e Despesas
              </h1>
              <p className="text-gray-600">Controle financeiro completo do seu negócio</p>
            </div>
          </div>

          {/* Resumo Financeiro */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Total Receitas</p>
                    <p className="text-3xl font-bold">R$ {totalReceitas.toFixed(2)}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-200" />
                </div>
                <div className="mt-2 flex items-center gap-1 text-green-100 text-sm">
                  <TrendingUp className="w-3 h-3" />
                  +12% vs mês anterior
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-red-500 to-pink-600 text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-red-100 text-sm">Total Despesas</p>
                    <p className="text-3xl font-bold">R$ {totalDespesas.toFixed(2)}</p>
                  </div>
                  <TrendingDown className="w-8 h-8 text-red-200" />
                </div>
                <div className="mt-2 flex items-center gap-1 text-red-100 text-sm">
                  <TrendingDown className="w-3 h-3" />
                  +5% vs mês anterior
                </div>
              </CardContent>
            </Card>

            <Card
              className={`border-0 shadow-lg ${lucroLiquido >= 0 ? "bg-gradient-to-br from-blue-500 to-indigo-600" : "bg-gradient-to-br from-orange-500 to-red-600"} text-white rounded-2xl`}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Lucro Líquido</p>
                    <p className="text-3xl font-bold">R$ {lucroLiquido.toFixed(2)}</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-blue-200" />
                </div>
                <div className="mt-2 flex items-center gap-1 text-blue-100 text-sm">
                  {lucroLiquido >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {lucroLiquido >= 0 ? "Lucro" : "Prejuízo"} este mês
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Ações Rápidas */}
          <div className="flex gap-4 mb-6">
            <Button
              onClick={() => handleNovaTransacao("receita")}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl"
            >
              <Plus className="w-5 h-5 mr-2" />
              Nova Receita
            </Button>
            <Button
              onClick={() => handleNovaTransacao("despesa")}
              className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white rounded-xl"
            >
              <Plus className="w-5 h-5 mr-2" />
              Nova Despesa
            </Button>
            <Button variant="outline" className="border-2 border-gray-200 rounded-xl bg-transparent">
              <Download className="w-5 h-5 mr-2" />
              Exportar Relatório
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Transações */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm rounded-2xl">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-bold text-gray-900">Transações Recentes</CardTitle>
                    <div className="flex gap-2">
                      <Select value={filtroMes} onValueChange={setFiltroMes}>
                        <SelectTrigger className="w-40 h-9 border-gray-200 rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2024-01">Janeiro 2024</SelectItem>
                          <SelectItem value="2023-12">Dezembro 2023</SelectItem>
                          <SelectItem value="2023-11">Novembro 2023</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
                        <SelectTrigger className="w-40 h-9 border-gray-200 rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="todas">Todas</SelectItem>
                          <SelectItem value="Serviços">Serviços</SelectItem>
                          <SelectItem value="Produtos">Produtos</SelectItem>
                          <SelectItem value="Fornecedores">Fornecedores</SelectItem>
                          <SelectItem value="Operacional">Operacional</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {transacoesFiltradas.map((transacao) => (
                    <div key={transacao.id} className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                              transacao.tipo === "receita" ? "bg-green-100" : "bg-red-100"
                            }`}
                          >
                            {transacao.tipo === "receita" ? (
                              <TrendingUp className="w-6 h-6 text-green-600" />
                            ) : (
                              <TrendingDown className="w-6 h-6 text-red-600" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{transacao.descricao}</h4>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Badge className="bg-blue-100 text-blue-800 border-0 text-xs">
                                {transacao.categoria}
                              </Badge>
                              <span>•</span>
                              <span>{new Date(transacao.data).toLocaleDateString("pt-BR")}</span>
                              {transacao.cliente && (
                                <>
                                  <span>•</span>
                                  <span>{transacao.cliente}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className={`text-2xl font-bold ${
                              transacao.tipo === "receita" ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {transacao.tipo === "receita" ? "+" : "-"}R$ {transacao.valor.toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-500">{transacao.formaPagamento}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Gráficos e Resumos */}
            <div className="space-y-6">
              {/* Receitas por Categoria */}
              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-green-500" />
                    Receitas por Categoria
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Object.entries(receitasPorCategoria).map(([categoria, valor]) => (
                    <div key={categoria} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{categoria}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-500 rounded-full"
                            style={{ width: `${(valor / totalReceitas) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-green-600">R$ {valor.toFixed(0)}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Despesas por Categoria */}
              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-red-500" />
                    Despesas por Categoria
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Object.entries(despesasPorCategoria).map(([categoria, valor]) => (
                    <div key={categoria} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{categoria}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-red-500 rounded-full"
                            style={{ width: `${(valor / totalDespesas) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-red-600">R$ {valor.toFixed(0)}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Modal Nova Transação */}
      <Dialog open={mostrarNovaTransacao} onOpenChange={setMostrarNovaTransacao}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {tipoTransacao === "receita" ? (
                <TrendingUp className="w-6 h-6 text-green-500" />
              ) : (
                <TrendingDown className="w-6 h-6 text-red-500" />
              )}
              Nova {tipoTransacao === "receita" ? "Receita" : "Despesa"}
            </DialogTitle>
            <DialogDescription>
              Registre uma nova {tipoTransacao === "receita" ? "receita" : "despesa"} no sistema
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Categoria</Label>
              <Select
                value={novaTransacao.categoria}
                onValueChange={(value) => setNovaTransacao((prev) => ({ ...prev, categoria: value }))}
              >
                <SelectTrigger className="h-11 border-gray-200 rounded-xl">
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categorias[tipoTransacao].map((categoria) => (
                    <SelectItem key={categoria} value={categoria}>
                      {categoria}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Descrição</Label>
              <Input
                value={novaTransacao.descricao}
                onChange={(e) => setNovaTransacao((prev) => ({ ...prev, descricao: e.target.value }))}
                placeholder="Descrição da transação"
                className="h-11 border-gray-200 rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Valor (R$)</Label>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={novaTransacao.valor}
                  onChange={(e) => setNovaTransacao((prev) => ({ ...prev, valor: Number(e.target.value) }))}
                  className="h-11 border-gray-200 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label>Data</Label>
                <Input
                  type="date"
                  value={novaTransacao.data}
                  onChange={(e) => setNovaTransacao((prev) => ({ ...prev, data: e.target.value }))}
                  className="h-11 border-gray-200 rounded-xl"
                />
              </div>
            </div>

            {tipoTransacao === "receita" && (
              <div className="space-y-2">
                <Label>Cliente</Label>
                <Input
                  value={novaTransacao.cliente}
                  onChange={(e) => setNovaTransacao((prev) => ({ ...prev, cliente: e.target.value }))}
                  placeholder="Nome do cliente"
                  className="h-11 border-gray-200 rounded-xl"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label>Forma de Pagamento</Label>
              <Select
                value={novaTransacao.formaPagamento}
                onValueChange={(value) => setNovaTransacao((prev) => ({ ...prev, formaPagamento: value }))}
              >
                <SelectTrigger className="h-11 border-gray-200 rounded-xl">
                  <SelectValue placeholder="Selecione a forma de pagamento" />
                </SelectTrigger>
                <SelectContent>
                  {formasPagamento.map((forma) => (
                    <SelectItem key={forma} value={forma}>
                      {forma}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleSalvarTransacao}
                disabled={!novaTransacao.categoria || !novaTransacao.descricao || !novaTransacao.valor}
                className={`flex-1 ${
                  tipoTransacao === "receita"
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                    : "bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700"
                } text-white rounded-xl`}
              >
                Salvar {tipoTransacao === "receita" ? "Receita" : "Despesa"}
              </Button>
              <Button
                onClick={() => setMostrarNovaTransacao(false)}
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
