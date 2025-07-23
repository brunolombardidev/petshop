"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Check,
  Crown,
  Star,
  Calendar,
  CreditCard,
  Download,
  FileText,
  Gift,
  Shield,
  Zap,
  Users,
  Smartphone,
  Globe,
  HeadphonesIcon,
} from "lucide-react"
import Link from "next/link"

interface Plan {
  id: string
  name: string
  price: number
  originalPrice?: number
  period: "monthly" | "yearly"
  description: string
  features: string[]
  popular?: boolean
  color: string
  icon: React.ComponentType<{ className?: string }>
}

interface Subscription {
  id: string
  planId: string
  planName: string
  status: "active" | "cancelled" | "expired" | "pending"
  startDate: string
  endDate: string
  nextBilling: string
  price: number
  period: "monthly" | "yearly"
}

export default function AssinaturaPage() {
  const [activeTab, setActiveTab] = useState("current")

  // Dados mockados da assinatura atual
  const currentSubscription: Subscription = {
    id: "sub_123",
    planId: "premium",
    planName: "Premium",
    status: "active",
    startDate: "2024-01-15",
    endDate: "2024-12-15",
    nextBilling: "2024-02-15",
    price: 29.9,
    period: "monthly",
  }

  // Planos disponíveis
  const plans: Plan[] = [
    {
      id: "basic",
      name: "Básico",
      price: 9.9,
      period: "monthly",
      description: "Ideal para quem está começando",
      features: [
        "Até 2 pets cadastrados",
        "Histórico médico básico",
        "Lembretes de vacina",
        "Suporte por email",
        "App mobile",
      ],
      color: "from-blue-500 to-blue-600",
      icon: Smartphone,
    },
    {
      id: "premium",
      name: "Premium",
      price: 29.9,
      originalPrice: 39.9,
      period: "monthly",
      description: "O mais popular entre nossos usuários",
      features: [
        "Pets ilimitados",
        "Histórico médico completo",
        "Lembretes inteligentes",
        "Telemedicina veterinária",
        "Relatórios detalhados",
        "Suporte prioritário",
        "Integração com clínicas",
        "Backup na nuvem",
      ],
      popular: true,
      color: "from-purple-500 to-purple-600",
      icon: Crown,
    },
    {
      id: "enterprise",
      name: "Empresarial",
      price: 99.9,
      period: "monthly",
      description: "Para clínicas e petshops",
      features: [
        "Todos os recursos Premium",
        "Gestão de múltiplos usuários",
        "Dashboard administrativo",
        "API personalizada",
        "Treinamento da equipe",
        "Suporte 24/7",
        "Relatórios avançados",
        "Integração com sistemas",
        "Consultoria especializada",
      ],
      color: "from-emerald-500 to-emerald-600",
      icon: Users,
    },
  ]

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  const getStatusColor = (status: Subscription["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "expired":
        return "bg-gray-100 text-gray-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: Subscription["status"]) => {
    switch (status) {
      case "active":
        return "Ativa"
      case "cancelled":
        return "Cancelada"
      case "expired":
        return "Expirada"
      case "pending":
        return "Pendente"
      default:
        return "Desconhecido"
    }
  }

  const calculateDaysRemaining = (endDate: string) => {
    const end = new Date(endDate)
    const now = new Date()
    const diffTime = end.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return Math.max(0, diffDays)
  }

  const calculateProgress = (startDate: string, endDate: string) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const now = new Date()

    const totalTime = end.getTime() - start.getTime()
    const elapsedTime = now.getTime() - start.getTime()

    return Math.min(100, Math.max(0, (elapsedTime / totalTime) * 100))
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-bpet-primary to-[#FFBDB6] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Crown className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Minha Assinatura</h1>
        <p className="text-gray-600">Gerencie sua assinatura e explore nossos planos</p>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px] mx-auto">
          <TabsTrigger value="current">Atual</TabsTrigger>
          <TabsTrigger value="plans">Planos</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
        </TabsList>

        {/* Assinatura Atual */}
        <TabsContent value="current" className="space-y-6">
          <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50/50 rounded-2xl">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl text-gray-900">Plano {currentSubscription.planName}</CardTitle>
                  <CardDescription className="text-gray-600 mt-1">
                    Sua assinatura está ativa e funcionando perfeitamente
                  </CardDescription>
                </div>
                <Badge className={`${getStatusColor(currentSubscription.status)} border-0`}>
                  {getStatusText(currentSubscription.status)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Informações da Assinatura */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                  <CreditCard className="w-8 h-8 text-[#30B2B0] mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">R$ {currentSubscription.price.toFixed(2)}</p>
                  <p className="text-sm text-gray-600">por mês</p>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                  <Calendar className="w-8 h-8 text-[#30B2B0] mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">
                    {calculateDaysRemaining(currentSubscription.endDate)}
                  </p>
                  <p className="text-sm text-gray-600">dias restantes</p>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                  <Shield className="w-8 h-8 text-[#30B2B0] mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">Ativa</p>
                  <p className="text-sm text-gray-600">desde Jan 2024</p>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                  <Zap className="w-8 h-8 text-[#30B2B0] mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">Premium</p>
                  <p className="text-sm text-gray-600">recursos</p>
                </div>
              </div>

              {/* Progresso da Assinatura */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-900">Período da Assinatura</h3>
                  <span className="text-sm text-gray-600">
                    {new Date(currentSubscription.startDate).toLocaleDateString("pt-BR")} -{" "}
                    {new Date(currentSubscription.endDate).toLocaleDateString("pt-BR")}
                  </span>
                </div>
                <Progress
                  value={calculateProgress(currentSubscription.startDate, currentSubscription.endDate)}
                  className="h-2"
                />
                <p className="text-sm text-gray-600">
                  Próxima cobrança em {new Date(currentSubscription.nextBilling).toLocaleDateString("pt-BR")}
                </p>
              </div>

              <Separator />

              {/* Ações */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => handleTabChange("plans")}
                  className="flex-1 bg-gradient-to-r from-bpet-primary to-[#FFBDB6] hover:from-[#FFBDB6] hover:to-bpet-primary text-white rounded-xl h-12"
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Fazer Upgrade
                </Button>
                <Button variant="outline" className="flex-1 rounded-xl h-12 bg-transparent">
                  <FileText className="w-4 h-4 mr-2" />
                  Ver Faturas
                </Button>
                <Button variant="outline" className="flex-1 rounded-xl h-12 bg-transparent">
                  <Download className="w-4 h-4 mr-2" />
                  Baixar Comprovante
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recursos Inclusos */}
          <Card className="border-0 shadow-xl bg-white rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                <Gift className="w-5 h-5 text-[#30B2B0]" />
                Recursos Inclusos no seu Plano
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {plans
                  .find((plan) => plan.id === currentSubscription.planId)
                  ?.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Planos Disponíveis */}
        <TabsContent value="plans" className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Escolha o Plano Ideal</h2>
            <p className="text-gray-600">Encontre o plano que melhor se adapta às suas necessidades</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {plans.map((plan) => {
              const Icon = plan.icon
              const isCurrentPlan = plan.id === currentSubscription.planId

              return (
                <Card
                  key={plan.id}
                  className={`relative border-0 shadow-xl rounded-2xl overflow-hidden ${
                    plan.popular ? "ring-2 ring-[#30B2B0] ring-offset-2" : ""
                  } ${isCurrentPlan ? "bg-gradient-to-br from-green-50 to-emerald-50" : "bg-white"}`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-[#30B2B0] to-[#FFBDB6] text-white text-center py-2 text-sm font-medium">
                      <Star className="w-4 h-4 inline mr-1" />
                      Mais Popular
                    </div>
                  )}

                  {isCurrentPlan && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-center py-2 text-sm font-medium">
                      <Check className="w-4 h-4 inline mr-1" />
                      Plano Atual
                    </div>
                  )}

                  <CardHeader className={`text-center ${plan.popular || isCurrentPlan ? "pt-12" : "pt-6"}`}>
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl text-gray-900">{plan.name}</CardTitle>
                    <CardDescription className="text-gray-600">{plan.description}</CardDescription>
                    <div className="flex items-center justify-center gap-2 mt-4">
                      {plan.originalPrice && (
                        <span className="text-lg text-gray-400 line-through">R$ {plan.originalPrice.toFixed(2)}</span>
                      )}
                      <span className="text-4xl font-bold text-gray-900">R$ {plan.price.toFixed(2)}</span>
                      <span className="text-gray-600">/mês</span>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      className={`w-full h-12 rounded-xl ${
                        isCurrentPlan
                          ? "bg-green-600 hover:bg-green-700"
                          : `bg-gradient-to-r ${plan.color} hover:opacity-90`
                      } text-white`}
                      disabled={isCurrentPlan}
                    >
                      {isCurrentPlan ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Plano Atual
                        </>
                      ) : (
                        <>
                          <Crown className="w-4 h-4 mr-2" />
                          Escolher Plano
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Benefícios Adicionais */}
          <Card className="border-0 shadow-xl bg-gradient-to-br from-[#30B2B0]/5 to-[#FFBDB6]/5 rounded-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-xl text-gray-900">Todos os Planos Incluem</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                    <Smartphone className="w-6 h-6 text-[#30B2B0]" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">App Mobile</h3>
                  <p className="text-sm text-gray-600">iOS e Android</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                    <Globe className="w-6 h-6 text-[#30B2B0]" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Acesso Web</h3>
                  <p className="text-sm text-gray-600">Qualquer dispositivo</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                    <Shield className="w-6 h-6 text-[#30B2B0]" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Segurança</h3>
                  <p className="text-sm text-gray-600">Dados protegidos</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                    <HeadphonesIcon className="w-6 h-6 text-[#30B2B0]" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Suporte</h3>
                  <p className="text-sm text-gray-600">Sempre disponível</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Histórico */}
        <TabsContent value="history" className="space-y-6">
          <Card className="border-0 shadow-xl bg-white rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#30B2B0]" />
                Histórico de Assinaturas
              </CardTitle>
              <CardDescription>Veja todas as suas assinaturas anteriores e atuais</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Assinatura Atual */}
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <Crown className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Plano Premium</h3>
                      <p className="text-sm text-gray-600">
                        {new Date(currentSubscription.startDate).toLocaleDateString("pt-BR")} - Atual
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">R$ {currentSubscription.price.toFixed(2)}/mês</p>
                    <Badge className="bg-green-100 text-green-800 border-0">Ativa</Badge>
                  </div>
                </div>

                {/* Histórico Mockado */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                      <Smartphone className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Plano Básico</h3>
                      <p className="text-sm text-gray-600">15/06/2023 - 14/01/2024</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">R$ 9,90/mês</p>
                    <Badge className="bg-gray-100 text-gray-800 border-0">Finalizada</Badge>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <Link href="/assinatura/historico">
                  <Button variant="outline" className="rounded-xl bg-transparent">
                    <FileText className="w-4 h-4 mr-2" />
                    Ver Histórico Completo
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
