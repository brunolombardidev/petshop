"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, History, Calendar, CreditCard, Download, CheckCircle, XCircle } from "lucide-react"
import { FloatingButtons } from "@/components/floating-buttons"

// Dados mockados do histórico
const historicoCobrancas = [
  {
    id: "1",
    data: "2024-01-15",
    plano: "Premium",
    valor: 29.9,
    status: "pago",
    metodoPagamento: "Cartão de Crédito ****1234",
    faturaUrl: "#",
  },
  {
    id: "2",
    data: "2023-12-15",
    plano: "Premium",
    valor: 29.9,
    status: "pago",
    metodoPagamento: "Cartão de Crédito ****1234",
    faturaUrl: "#",
  },
  {
    id: "3",
    data: "2023-11-15",
    plano: "Premium",
    valor: 29.9,
    status: "pago",
    metodoPagamento: "Cartão de Crédito ****1234",
    faturaUrl: "#",
  },
  {
    id: "4",
    data: "2023-10-15",
    plano: "Básico",
    valor: 9.9,
    status: "pago",
    metodoPagamento: "PIX",
    faturaUrl: "#",
  },
  {
    id: "5",
    data: "2023-09-15",
    plano: "Básico",
    valor: 9.9,
    status: "pendente",
    metodoPagamento: "Cartão de Crédito ****1234",
    faturaUrl: "#",
  },
]

export default function HistoricoAssinaturaPage() {
  const router = useRouter()

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pago":
        return <Badge className="bg-green-100 text-green-800 border-0">Pago</Badge>
      case "pendente":
        return <Badge className="bg-yellow-100 text-yellow-800 border-0">Pendente</Badge>
      case "cancelado":
        return <Badge className="bg-red-100 text-red-800 border-0">Cancelado</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-0">-</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pago":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "pendente":
        return <Calendar className="w-5 h-5 text-yellow-500" />
      case "cancelado":
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return <Calendar className="w-5 h-5 text-gray-400" />
    }
  }

  const totalPago = historicoCobrancas
    .filter((cobranca) => cobranca.status === "pago")
    .reduce((total, cobranca) => total + cobranca.valor, 0)

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
                <History className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-900">Histórico de Assinatura</h1>
                <p className="text-sm text-gray-600">Todas as suas cobranças e faturas</p>
              </div>
            </div>
          </div>
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
                    <p className="text-blue-100 text-sm">Total Pago</p>
                    <p className="text-3xl font-bold">R$ {totalPago.toFixed(2)}</p>
                  </div>
                  <CreditCard className="w-8 h-8 text-blue-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-[#D6DD83] to-[#FFBDB6] text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Faturas Pagas</p>
                    <p className="text-3xl font-bold">{historicoCobrancas.filter((c) => c.status === "pago").length}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-[#FFBDB6] to-bpet-secondary text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-100 text-sm">Pendentes</p>
                    <p className="text-3xl font-bold">
                      {historicoCobrancas.filter((c) => c.status === "pendente").length}
                    </p>
                  </div>
                  <Calendar className="w-8 h-8 text-yellow-200" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lista do Histórico */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <History className="w-5 h-5 text-blue-500" />
                Histórico de Cobranças
              </CardTitle>
              <CardDescription>Todas as suas faturas e pagamentos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {historicoCobrancas.map((cobranca) => (
                  <div
                    key={cobranca.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      {getStatusIcon(cobranca.status)}
                      <div>
                        <h3 className="font-semibold text-gray-900">Plano {cobranca.plano}</h3>
                        <p className="text-sm text-gray-600">{new Date(cobranca.data).toLocaleDateString("pt-BR")}</p>
                        <p className="text-xs text-gray-500">{cobranca.metodoPagamento}</p>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-4">
                      <div>
                        {getStatusBadge(cobranca.status)}
                        <p className="text-lg font-bold text-gray-900 mt-1">R$ {cobranca.valor.toFixed(2)}</p>
                      </div>
                      <Button size="sm" variant="outline" className="rounded-lg bg-transparent">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Botões Flutuantes */}
      <FloatingButtons />
    </div>
  )
}
