"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CreditCard, QrCode, Scan, CheckCircle, PawPrint } from "lucide-react"
import { FloatingButtons } from "@/components/floating-buttons"

export default function CartaoPetPage() {
  const router = useRouter()
  const [metodo, setMetodo] = useState<"qr" | "numero" | null>(null)
  const [numeroCartao, setNumeroCartao] = useState("")
  const [validado, setValidado] = useState(false)

  const handleValidarNumero = () => {
    if (numeroCartao.length >= 10) {
      setValidado(true)
      setTimeout(() => {
        setValidado(false)
        setNumeroCartao("")
        setMetodo(null)
      }, 3000)
    }
  }

  const handleScanQR = () => {
    // Simula o scan do QR Code
    setValidado(true)
    setTimeout(() => {
      setValidado(false)
      setMetodo(null)
    }, 3000)
  }

  if (validado) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-amber-50/30 to-yellow-50/50 flex items-center justify-center">
        <Card className="w-full max-w-md border-0 shadow-2xl bg-white/95 backdrop-blur-sm rounded-2xl">
          <CardContent className="text-center p-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Cartão Validado!</h2>
            <p className="text-gray-600 mb-4">O cartão pet foi validado com sucesso.</p>
            <div className="bg-green-50 p-4 rounded-xl">
              <p className="text-sm text-green-800">
                <strong>Cliente:</strong> Maria Silva
                <br />
                <strong>Pet:</strong> Rex - Golden Retriever
                <br />
                <strong>Plano:</strong> Premium
                <br />
                <strong>Status:</strong> Ativo
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
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
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-900">Cartão Pet</h1>
                <p className="text-sm text-gray-600">Seu Cartão de Descontos Pet</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Visualização do Cartão */}
      <div className="px-6 py-6">
        <div className="max-w-md mx-auto">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white shadow-2xl">
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-amber-500 rounded-lg flex items-center justify-center">
                  <PawPrint className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-lg">B-Pet</span>
              </div>
            </div>
            <div className="mb-6">
              <p className="text-xl font-mono tracking-widest">4532 1234 5678 9012</p>
            </div>
            <div>
              <p className="font-semibold">Nome do Cliente</p>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <main className="px-6 py-8">
        <div className="max-w-2xl mx-auto">
          {!metodo ? (
            <div className="space-y-6">
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-gray-900">Validar um Cliente ou Fornecedor</CardTitle>
                  <CardDescription className="text-gray-600">
                    Escolha o método de validação mais conveniente
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    onClick={() => setMetodo("qr")}
                    className="w-full h-20 flex flex-col gap-3 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 group"
                  >
                    <QrCode className="h-8 w-8 group-hover:scale-110 transition-transform" />
                    <span className="font-semibold text-lg">Escanear QR Code</span>
                  </Button>

                  <Button
                    onClick={() => setMetodo("numero")}
                    variant="outline"
                    className="w-full h-20 flex flex-col gap-3 border-2 border-blue-200 text-blue-600 hover:bg-blue-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 group"
                  >
                    <CreditCard className="h-8 w-8 group-hover:scale-110 transition-transform" />
                    <span className="font-semibold text-lg">Inserir Número do Cartão</span>
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : metodo === "qr" ? (
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-900">Escanear QR Code</CardTitle>
                <CardDescription className="text-gray-600">
                  Posicione a câmera sobre o QR Code do cartão
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div className="w-64 h-64 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto border-4 border-dashed border-gray-300">
                  <div className="text-center">
                    <Scan className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Câmera ativa</p>
                    <p className="text-sm text-gray-400">Aponte para o QR Code</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button
                    onClick={handleScanQR}
                    className="w-full h-12 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl"
                  >
                    Simular Scan (Demo)
                  </Button>

                  <Button onClick={() => setMetodo(null)} variant="outline" className="w-full h-12 rounded-xl">
                    Voltar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-900">Número do Cartão</CardTitle>
                <CardDescription className="text-gray-600">Digite o número do cartão pet do cliente</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Número do Cartão Pet</label>
                  <Input
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    value={numeroCartao}
                    onChange={(e) => setNumeroCartao(e.target.value)}
                    className="h-14 text-lg text-center border-2 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl"
                    maxLength={19}
                  />
                </div>

                <div className="space-y-4">
                  <Button
                    onClick={handleValidarNumero}
                    disabled={numeroCartao.length < 10}
                    className="w-full h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl disabled:opacity-50"
                  >
                    Validar Cartão
                  </Button>

                  <Button onClick={() => setMetodo(null)} variant="outline" className="w-full h-12 rounded-xl">
                    Voltar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      {/* Botões Flutuantes */}
      <FloatingButtons />
    </div>
  )
}
