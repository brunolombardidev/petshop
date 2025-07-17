"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Crown,
  Check,
  X,
  Calendar,
  CreditCard,
  Download,
  FileText,
  TrendingUp,
  Shield,
  AlertCircle,
} from "lucide-react"
import { UnifiedHeader } from "@/components/unified-header"
import { FloatingButtons } from "@/components/floating-buttons"

export default function AssinaturaPage() {
  const router = useRouter()
  const [planoSelecionado, setPlanoSelecionado] = useState<string | null>(null)

  const [user] = useState({
    name: "Maria Silva",
    email: "maria@email.com",
    avatar: "/placeholder-user.jpg",
    userType: "cliente" as const,
  })

  // Assinatura atual
  const assinaturaAtual = {
    plano: "Premium",
    status: "ativa",
    dataInicio: "2023-06-15",
    proximaCobranca: "2024-02-15",
    valor: 49.9,
    desconto: 0,
    metodoPagamento: "Cartão **** 1234",
  }

  // Planos disponíveis
  const planos = [
    {
      id: "basico",
      nome: "Básico",
      preco: 19.9,
      precoAnual: 199.0,
      descricao: "Ideal para quem está começando",
      cor: "from-gray-500 to-gray-600",
      popular: false,
      recursos: [
        "1 pet cadastrado",
        "Cartão pet básico",
        "5% de desconto em parceiros",
        "Lembretes de vacina",
        "Suporte por email",
        "Histórico básico",
      ],
      limitacoes: ["Sem agendamento online", "Sem relatórios avançados", "Sem suporte prioritário"],
    },
    {
      id: "premium",
      nome: "Premium",
      preco: 49.9,
      precoAnual: 499.0,
      descricao: "O mais escolhido pelos nossos usuários",
      cor: "from-blue-500 to-purple-600",
      popular: true,
      recursos: [
        "Até 5 pets cadastrados",
        "Cartão pet premium",
        "15% de desconto em parceiros",
        "Agendamento online",
        "Lembretes personalizados",
        "Relatórios de saúde",
        "Suporte prioritário",
        "Histórico completo",
        "Backup na nuvem",
      ],
      limitacoes: ["Limite de 5 pets"],
    },
    {
      id: "familia",
      nome: "Família",
      preco: 89.9,
      precoAnual: 899.0,
      descricao: "Para famílias com muitos pets",
      cor: "from-purple-500 to-pink-600",
      popular: false,
      recursos: [
        "Pets ilimitados",
        "Cartão pet premium+",
        "25% de desconto em parceiros",
        "Agendamento prioritário",
        "Consultas veterinárias online",
        "Relatórios avançados",
        "Suporte 24/7",
        "Múltiplos usuários",
        "Seguro pet básico",
        "Telemedicina",
      ],
      limitacoes: [],
    },
  ]

  // Histórico de faturas
  const faturas = [
    {
      id: "1",
      data: "2024-01-15",
      valor: 49.9,
      status: "paga",
      metodo: "Cartão **** 1234",
      periodo: "Jan 2024",
    },
    {
      id: "2",
      data: "2023-12-15",
      valor: 49.9,
      status: "paga",
      metodo: "Cartão **** 1234",
      periodo: "Dez 2023",
    },
    {
      id: "3",
      data: "2023-11-15",
      valor: 49.9,
      status: "paga",
      metodo: "Cartão **** 1234",
      periodo: "Nov 2023",
    },
    {
      id: "4",
      data: "2023-10-15",
      valor: 49.9,
      status: "paga",
      metodo: "Cartão **** 1234",
      periodo: "Out 2023",
    },
  ]

  const handleUpgrade = (planoId: string) => {
    setPlanoSelecionado(planoId)
    // Aqui você implementaria a lógica de upgrade
    console.log("Upgrade para:", planoId)
  }

  const handleDowngrade = () => {
    // Aqui você implementaria a lógica de downgrade
    console.log("Downgrade solicitado")
  }

  const handleCancelar = () => {
    // Aqui você implementaria a lógica de cancelamento
    console.log("Cancelamento solicitado")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ativa":
        return "bg-green-100 text-green-800"
      case "cancelada":
        return "bg-red-100 text-red-800"
      case "suspensa":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getFaturaStatusColor = (status: string) => {
    switch (status) {
      case "paga":
        return "bg-green-100 text-green-800"
      case "pendente":
        return "bg-yellow-100 text-yellow-800"
      case "vencida":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/50 via-blue-50/30 to-pink-50/50">
      <UnifiedHeader user={user} />

      <main className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <Crown className="w-8 h-8 text-purple-500" />
              Minha Assinatura
            </h1>
            <p className="text-gray-600">Gerencie seu plano e aproveite todos os benefícios</p>
          </div>

          {/* Status da Assinatura Atual */}
          <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-600 to-blue-700 text-white rounded-2xl mb-8 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="mb-6 md:mb-0">
                  <div className="flex items-center gap-3 mb-2">
                    <Crown className="w-8 h-8" />
                    <h2 className="text-2xl font-bold">Plano {assinaturaAtual.plano}</h2>
                    <Badge className={`${getStatusColor(assinaturaAtual.status)} border-0`}>
                      {assinaturaAtual.status === "ativa" ? "Ativa" : assinaturaAtual.status}
                    </Badge>
                  </div>
                  <p className="text-purple-100 mb-4">
                    Assinatura desde {new Date(assinaturaAtual.dataInicio).toLocaleDateString("pt-BR")}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">
                        Próxima cobrança: {new Date(assinaturaAtual.proximaCobranca).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      <span className="text-sm">{assinaturaAtual.metodoPagamento}</span>
                    </div>
                  </div>
                </div>
                <div className="text-center md:text-right">
                  <p className="text-purple-100 text-sm mb-1">Valor mensal</p>
                  <p className="text-4xl font-bold mb-4">R$ {assinaturaAtual.valor.toFixed(2)}</p>
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="secondary"
                      className="bg-white/20 hover:bg-white/30 text-white border-0"
                      onClick={() => router.push("/assinatura/historico")}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Ver Faturas
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="planos" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg">
              <TabsTrigger value="planos" className="rounded-xl">
                Planos Disponíveis
              </TabsTrigger>
              <TabsTrigger value="faturas" className="rounded-xl">
                Histórico de Faturas
              </TabsTrigger>
            </TabsList>

            <TabsContent value="planos" className="space-y-6">
              {/* Comparação de Planos */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {planos.map((plano) => {
                  const isAtual = plano.nome === assinaturaAtual.plano
                  const economiaAnual = plano.preco * 12 - plano.precoAnual

                  return (
                    <Card
                      key={plano.id}
                      className={`border-0 shadow-xl rounded-2xl overflow-hidden relative transition-all duration-300 ${
                        plano.popular ? "ring-2 ring-purple-500 scale-105" : ""
                      } ${isAtual ? "bg-gradient-to-br from-green-50 to-emerald-50" : "bg-white/90 backdrop-blur-sm"}`}
                    >
                      {plano.popular && (
                        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center py-2 text-sm font-semibold">
                          ⭐ Mais Popular
                        </div>
                      )}

                      {isAtual && (
                        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-center py-2 text-sm font-semibold">
                          ✓ Plano Atual
                        </div>
                      )}

                      <CardHeader className={`${plano.popular || isAtual ? "pt-12" : "pt-6"} pb-4`}>
                        <div className="text-center">
                          <CardTitle className="text-2xl font-bold text-gray-900 mb-2">{plano.nome}</CardTitle>
                          <CardDescription className="text-gray-600 mb-4">{plano.descricao}</CardDescription>
                          <div className="mb-4">
                            <div className="flex items-baseline justify-center gap-1">
                              <span className="text-4xl font-bold text-gray-900">R$ {plano.preco.toFixed(2)}</span>
                              <span className="text-gray-600">/mês</span>
                            </div>
                            <div className="mt-2 text-sm text-gray-600">
                              <p>ou R$ {plano.precoAnual.toFixed(2)}/ano</p>
                              <p className="text-green-600 font-medium">Economize R$ {economiaAnual.toFixed(2)}</p>
                            </div>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-6">
                        {/* Recursos Inclusos */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-500" />
                            Recursos Inclusos
                          </h4>
                          <ul className="space-y-2">
                            {plano.recursos.map((recurso, index) => (
                              <li key={index} className="flex items-center gap-2 text-sm">
                                <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                                <span>{recurso}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Limitações */}
                        {plano.limitacoes.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                              <X className="w-4 h-4 text-red-500" />
                              Não Inclui
                            </h4>
                            <ul className="space-y-2">
                              {plano.limitacoes.map((limitacao, index) => (
                                <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                                  <X className="w-4 h-4 text-red-500 flex-shrink-0" />
                                  <span>{limitacao}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Botão de Ação */}
                        <div className="pt-4">
                          {isAtual ? (
                            <Button disabled className="w-full h-12 bg-green-500 text-white rounded-xl">
                              <Check className="w-5 h-5 mr-2" />
                              Plano Atual
                            </Button>
                          ) : (
                            <Button
                              onClick={() => handleUpgrade(plano.id)}
                              className={`w-full h-12 bg-gradient-to-r ${plano.cor} hover:opacity-90 text-white rounded-xl`}
                            >
                              {plano.preco > assinaturaAtual.valor ? (
                                <>
                                  <TrendingUp className="w-5 h-5 mr-2" />
                                  Fazer Upgrade
                                </>
                              ) : (
                                <>
                                  <Crown className="w-5 h-5 mr-2" />
                                  Selecionar Plano
                                </>
                              )}
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {/* Ações da Assinatura */}
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-blue-500" />
                    Gerenciar Assinatura
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Opções para modificar ou cancelar sua assinatura
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button
                      variant="outline"
                      className="h-12 border-2 border-blue-200 text-blue-600 hover:bg-blue-50 rounded-xl bg-transparent"
                      onClick={() => router.push("/assinatura/alterar-pagamento")}
                    >
                      <CreditCard className="w-5 h-5 mr-2" />
                      Alterar Pagamento
                    </Button>

                    <Button
                      variant="outline"
                      className="h-12 border-2 border-yellow-200 text-yellow-600 hover:bg-yellow-50 rounded-xl bg-transparent"
                      onClick={handleDowngrade}
                    >
                      <TrendingUp className="w-5 h-5 mr-2 rotate-180" />
                      Fazer Downgrade
                    </Button>

                    <Button
                      variant="outline"
                      className="h-12 border-2 border-red-200 text-red-600 hover:bg-red-50 rounded-xl bg-transparent"
                      onClick={handleCancelar}
                    >
                      <X className="w-5 h-5 mr-2" />
                      Cancelar Assinatura
                    </Button>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-blue-900 mb-1">Informações Importantes</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• Upgrades são aplicados imediatamente</li>
                          <li>• Downgrades entram em vigor no próximo ciclo</li>
                          <li>• Cancelamentos podem ser feitos até 24h antes da cobrança</li>
                          <li>• Reembolsos seguem nossa política de 7 dias</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="faturas" className="space-y-6">
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-green-500" />
                    Histórico de Faturas
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Todas as suas faturas e comprovantes de pagamento
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {faturas.map((fatura) => (
                    <div key={fatura.id} className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                            <FileText className="w-6 h-6 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">Fatura {fatura.periodo}</h4>
                            <p className="text-sm text-gray-600">{new Date(fatura.data).toLocaleDateString("pt-BR")}</p>
                            <p className="text-sm text-gray-600">{fatura.metodo}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-bold text-gray-900">R$ {fatura.valor.toFixed(2)}</p>
                            <Badge className={`${getFaturaStatusColor(fatura.status)} border-0`}>
                              {fatura.status === "paga" ? "Paga" : fatura.status}
                            </Badge>
                          </div>

                          <Button
                            size="sm"
                            variant="outline"
                            className="border-2 border-gray-200 hover:bg-gray-50 rounded-lg bg-transparent"
                          >
                            <Download className="w-4 h-4 mr-1" />
                            PDF
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {faturas.length === 0 && (
                    <div className="text-center py-8">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600">Nenhuma fatura encontrada</p>
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
