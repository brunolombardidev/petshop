"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, TrendingUp, Users, DollarSign, ShoppingCart, Truck, AlertCircle } from "lucide-react"
import { UnifiedHeader } from "@/components/unified-header"
import { FloatingButtons } from "@/components/floating-buttons"

export default function DashboardFornecedorPage() {
  const router = useRouter()
  const [user] = useState({
    name: "Distribuidora PetMax",
    email: "vendas@petmax.com",
    avatar: "/placeholder-logo.png",
    userType: "fornecedor" as const,
  })

  const estatisticas = {
    pedidosPendentes: 23,
    clientesAtivos: 156,
    faturamentoMes: 125000,
    produtosCatalogo: 450,
  }

  const pedidosRecentes = [
    {
      id: "PED-001",
      cliente: "PetShop VetCare",
      valor: 2850,
      status: "pendente",
      data: "2024-01-15",
      itens: 12,
    },
    {
      id: "PED-002",
      cliente: "Clínica Animal Care",
      valor: 1200,
      status: "processando",
      data: "2024-01-14",
      itens: 8,
    },
    {
      id: "PED-003",
      cliente: "PetShop Amigo Fiel",
      valor: 3400,
      status: "enviado",
      data: "2024-01-13",
      itens: 15,
    },
  ]

  const produtosEmFalta = [
    { nome: "Ração Premium Cães 15kg", estoque: 5, minimo: 20 },
    { nome: "Brinquedo Corda", estoque: 2, minimo: 15 },
    { nome: "Shampoo Antipulgas 500ml", estoque: 8, minimo: 25 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-amber-50/30 to-yellow-50/50">
      <UnifiedHeader user={user} />

      <main className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Fornecedor 📦</h1>
            <p className="text-gray-600">Gerencie seus produtos, pedidos e relacionamento com clientes</p>
          </div>

          {/* Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm">Pedidos Pendentes</p>
                    <p className="text-3xl font-bold">{estatisticas.pedidosPendentes}</p>
                  </div>
                  <ShoppingCart className="w-8 h-8 text-orange-200" />
                </div>
                <div className="mt-2 flex items-center gap-1 text-orange-100 text-sm">
                  <TrendingUp className="w-3 h-3" />
                  +5 novos hoje
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Clientes Ativos</p>
                    <p className="text-3xl font-bold">{estatisticas.clientesAtivos}</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-200" />
                </div>
                <div className="mt-2 flex items-center gap-1 text-blue-100 text-sm">
                  <TrendingUp className="w-3 h-3" />
                  +12% este mês
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Faturamento Mês</p>
                    <p className="text-3xl font-bold">R$ {(estatisticas.faturamentoMes / 1000).toFixed(0)}k</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-200" />
                </div>
                <div className="mt-2 flex items-center gap-1 text-green-100 text-sm">
                  <TrendingUp className="w-3 h-3" />
                  +18% vs mês anterior
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Produtos Catálogo</p>
                    <p className="text-3xl font-bold">{estatisticas.produtosCatalogo}</p>
                  </div>
                  <Package className="w-8 h-8 text-purple-200" />
                </div>
                <div className="mt-2 flex items-center gap-1 text-purple-100 text-sm">
                  <Package className="w-3 h-3" />
                  15 novos este mês
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Ações Rápidas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Button
              onClick={() => router.push("/pedidos/novo")}
              className="h-14 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-xl"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Novo Pedido
            </Button>
            <Button
              onClick={() => router.push("/gestao-produtos")}
              variant="outline"
              className="h-14 border-2 border-gray-200 hover:bg-gray-50 rounded-xl"
            >
              <Package className="w-5 h-5 mr-2 text-gray-600" />
              Gerenciar Produtos
            </Button>
            <Button
              onClick={() => router.push("/clientes")}
              variant="outline"
              className="h-14 border-2 border-gray-200 hover:bg-gray-50 rounded-xl"
            >
              <Users className="w-5 h-5 mr-2 text-gray-600" />
              Clientes
            </Button>
            <Button
              onClick={() => router.push("/relatorios")}
              variant="outline"
              className="h-14 border-2 border-gray-200 hover:bg-gray-50 rounded-xl"
            >
              <TrendingUp className="w-5 h-5 mr-2 text-gray-600" />
              Relatórios
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pedidos Recentes */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-orange-500" />
                  Pedidos Recentes
                </CardTitle>
                <CardDescription className="text-gray-600">Últimos pedidos recebidos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {pedidosRecentes.map((pedido) => (
                  <div key={pedido.id} className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{pedido.id}</h4>
                        <p className="text-sm text-gray-600">{pedido.cliente}</p>
                        <p className="text-sm text-gray-600">{pedido.itens} itens</p>
                      </div>
                      <div className="text-right">
                        <Badge
                          className={
                            pedido.status === "pendente"
                              ? "bg-yellow-100 text-yellow-800 border-0"
                              : pedido.status === "processando"
                                ? "bg-blue-100 text-blue-800 border-0"
                                : "bg-green-100 text-green-800 border-0"
                          }
                        >
                          {pedido.status === "pendente"
                            ? "Pendente"
                            : pedido.status === "processando"
                              ? "Processando"
                              : "Enviado"}
                        </Badge>
                        <p className="text-sm font-bold text-green-600 mt-1">R$ {pedido.valor.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Truck className="w-3 h-3" />
                      {new Date(pedido.data).toLocaleDateString("pt-BR")}
                    </div>
                  </div>
                ))}

                <Button
                  onClick={() => router.push("/pedidos")}
                  variant="outline"
                  className="w-full h-12 border-2 border-dashed border-gray-300 hover:border-gray-400 rounded-xl"
                >
                  Ver todos os pedidos
                </Button>
              </CardContent>
            </Card>

            {/* Produtos em Falta */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  Produtos em Falta
                </CardTitle>
                <CardDescription className="text-gray-600">Produtos com estoque baixo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {produtosEmFalta.map((produto, index) => (
                  <div key={index} className="p-4 bg-red-50 rounded-xl border-l-4 border-red-500">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-gray-900">{produto.nome}</h4>
                        <p className="text-sm text-gray-600">Mínimo: {produto.minimo} unidades</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-red-600">{produto.estoque}</p>
                        <p className="text-xs text-red-500">em estoque</p>
                      </div>
                    </div>
                  </div>
                ))}

                <Button
                  onClick={() => router.push("/gestao-produtos?filter=baixo-estoque")}
                  className="w-full h-12 bg-red-500 hover:bg-red-600 text-white rounded-xl"
                >
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Reabastecer Produtos
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <FloatingButtons />
    </div>
  )
}
