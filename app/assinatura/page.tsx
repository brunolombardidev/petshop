"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CreditCard, Crown, Zap, Star, Shield, Calendar } from "lucide-react"
import { FloatingButtons } from "@/components/floating-buttons"

export default function AssinaturaPage() {
  const router = useRouter()

  // Simular dados do plano do usuário
  const [planoAtual] = useState({
    nome: "Premium",
    tipo: "premium",
    preco: "R$ 29,90/mês",
    recursos: ["Agendamentos ilimitados", "Histórico completo", "Suporte prioritário", "Relatórios avançados"],
    dataVencimento: "2024-02-15",
  })

  const [dadosCartao, setDadosCartao] = useState({
    numero: "",
    nome: "",
    validade: "",
    cvv: "",
  })

  const getPlanoIcon = (tipo: string) => {
    switch (tipo) {
      case "premium":
        return <Crown className="w-5 h-5 text-yellow-500" />
      case "pro":
        return <Zap className="w-5 h-5 text-blue-500" />
      case "basico":
        return <Star className="w-5 h-5 text-gray-500" />
      default:
        return <Star className="w-5 h-5 text-gray-500" />
    }
  }

  const getPlanoColor = (tipo: string) => {
    switch (tipo) {
      case "premium":
        return "from-yellow-400 to-yellow-500"
      case "pro":
        return "from-blue-400 to-blue-500"
      case "basico":
        return "from-gray-400 to-gray-500"
      default:
        return "from-gray-400 to-gray-500"
    }
  }

  const handleSalvarCartao = () => {
    // Simular salvamento dos dados do cartão
    console.log("Dados do cartão salvos:", dadosCartao)
    alert("Dados do cartão atualizados com sucesso!")
  }

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
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-900">Assinatura</h1>
                <p className="text-sm text-gray-600">Gerencie sua assinatura e forma de pagamento</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="px-6 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Plano Atual */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                {getPlanoIcon(planoAtual.tipo)}
                Plano Atual
              </CardTitle>
              <CardDescription className="text-gray-600">Gerencie sua assinatura e recursos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Informações do Plano */}
              <div className={`p-6 bg-gradient-to-r ${getPlanoColor(planoAtual.tipo)} rounded-2xl text-white`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getPlanoIcon(planoAtual.tipo)}
                    <div>
                      <h3 className="text-2xl font-bold">{planoAtual.nome}</h3>
                      <p className="text-sm opacity-90">{planoAtual.preco}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    Ativo
                  </Badge>
                </div>

                <div className="space-y-2">
                  <p className="text-sm opacity-90">Recursos inclusos:</p>
                  <ul className="space-y-1">
                    {planoAtual.recursos.map((recurso, index) => (
                      <li key={index} className="text-sm flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        {recurso}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20">
                  <p className="text-sm opacity-90">
                    Próxima cobrança: {new Date(planoAtual.dataVencimento).toLocaleDateString("pt-BR")}
                  </p>
                </div>
              </div>

              {/* Ações do Plano */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  onClick={() => router.push("/planos")}
                  variant="outline"
                  className="h-12 rounded-xl border-gray-200 hover:bg-gray-50"
                >
                  Alterar Plano
                </Button>
                <Button
                  onClick={() => router.push("/planos/historico")}
                  variant="outline"
                  className="h-12 rounded-xl border-gray-200 hover:bg-gray-50"
                >
                  Histórico de Pagamentos
                </Button>
              </div>

              {/* Informações Adicionais */}
              <div className="p-4 bg-blue-50 rounded-xl">
                <div className="flex items-start gap-3">
                  <Crown className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-900">Benefícios Premium</p>
                    <p className="text-sm text-blue-700">
                      Aproveite todos os recursos avançados do seu plano Premium, incluindo suporte prioritário e
                      relatórios detalhados.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Forma de Pagamento */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-green-500" />
                Forma de Pagamento
              </CardTitle>
              <CardDescription className="text-gray-600">Gerencie os dados do seu cartão de crédito</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="numero" className="text-gray-700 font-medium">
                    Número do Cartão
                  </Label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="numero"
                      placeholder="0000 0000 0000 0000"
                      value={dadosCartao.numero}
                      onChange={(e) => setDadosCartao({ ...dadosCartao, numero: e.target.value })}
                      className="pl-11 h-12 border-gray-200 focus:border-green-400 focus:ring-green-400/20 rounded-xl"
                      maxLength={19}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nome" className="text-gray-700 font-medium">
                    Nome no Cartão
                  </Label>
                  <Input
                    id="nome"
                    placeholder="Nome como no cartão"
                    value={dadosCartao.nome}
                    onChange={(e) => setDadosCartao({ ...dadosCartao, nome: e.target.value })}
                    className="h-12 border-gray-200 focus:border-green-400 focus:ring-green-400/20 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="validade" className="text-gray-700 font-medium">
                    Validade
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="validade"
                      placeholder="MM/AA"
                      value={dadosCartao.validade}
                      onChange={(e) => setDadosCartao({ ...dadosCartao, validade: e.target.value })}
                      className="pl-11 h-12 border-gray-200 focus:border-green-400 focus:ring-green-400/20 rounded-xl"
                      maxLength={5}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cvv" className="text-gray-700 font-medium">
                    CVV
                  </Label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="cvv"
                      placeholder="000"
                      value={dadosCartao.cvv}
                      onChange={(e) => setDadosCartao({ ...dadosCartao, cvv: e.target.value })}
                      className="pl-11 h-12 border-gray-200 focus:border-green-400 focus:ring-green-400/20 rounded-xl"
                      maxLength={4}
                      type="password"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  onClick={handleSalvarCartao}
                  className="w-full h-12 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl"
                >
                  Salvar Dados do Cartão
                </Button>
              </div>

              {/* Informações de Segurança */}
              <div className="p-4 bg-green-50 rounded-xl">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-900">Segurança Garantida</p>
                    <p className="text-sm text-green-700">
                      Todos os dados do cartão são criptografados e protegidos seguindo os mais altos padrões de
                      segurança.
                    </p>
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
