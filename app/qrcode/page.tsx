"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { QrCode, Camera, Download, Share2, CheckCircle, XCircle, ArrowLeft, Scan } from "lucide-react"
import { UnifiedHeader } from "@/components/unified-header"
import { FloatingButtons } from "@/components/floating-buttons"

export default function QRCodePage() {
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [user] = useState({
    name: "Maria Silva",
    email: "maria@email.com",
    avatar: "/placeholder-user.jpg",
    userType: "cliente" as const,
  })

  const [scannerAtivo, setScannerAtivo] = useState(false)
  const [resultadoScan, setResultadoScan] = useState<{
    sucesso: boolean
    usuario?: any
    mensagem: string
  } | null>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)

  // QR Code do usuário atual
  const meuQRCode = {
    id: "user_123456",
    codigo: "BPET_USER_123456_MARIA_SILVA",
    dataGeracao: "2024-01-15",
    ativo: true,
    tipo: user.userType,
  }

  const iniciarScanner = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })
      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
      setScannerAtivo(true)
    } catch (error) {
      console.error("Erro ao acessar câmera:", error)
      alert("Erro ao acessar a câmera. Verifique as permissões.")
    }
  }

  const pararScanner = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }
    setScannerAtivo(false)
  }

  const simularScanQRCode = () => {
    // Simular diferentes resultados de scan
    const resultados = [
      {
        sucesso: true,
        usuario: {
          nome: "João Silva",
          email: "joao@email.com",
          tipo: "petshop",
          ativo: true,
          empresa: "PetShop Amigo Fiel",
        },
        mensagem: "Usuário válido encontrado!",
      },
      {
        sucesso: true,
        usuario: {
          nome: "Ana Costa",
          email: "ana@email.com",
          tipo: "cliente",
          ativo: true,
          pets: ["Buddy", "Luna"],
        },
        mensagem: "Cliente válido encontrado!",
      },
      {
        sucesso: false,
        mensagem: "QR Code não pertence a nenhum usuário ativo do sistema.",
      },
    ]

    const resultado = resultados[Math.floor(Math.random() * resultados.length)]
    setResultadoScan(resultado)
    pararScanner()
  }

  const baixarQRCode = () => {
    // Simular download do QR Code
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    canvas.width = 300
    canvas.height = 300

    if (ctx) {
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(0, 0, 300, 300)
      ctx.fillStyle = "#000000"
      ctx.font = "12px Arial"
      ctx.textAlign = "center"
      ctx.fillText("QR Code - " + user.name, 150, 280)

      // Simular padrão QR Code
      for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 20; j++) {
          if (Math.random() > 0.5) {
            ctx.fillRect(i * 12 + 30, j * 12 + 30, 12, 12)
          }
        }
      }
    }

    const link = document.createElement("a")
    link.download = `qrcode-${user.name.replace(/\s+/g, "-").toLowerCase()}.png`
    link.href = canvas.toDataURL()
    link.click()
  }

  const compartilharQRCode = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Meu QR Code B-Pet",
          text: `QR Code de ${user.name} - B-Pet`,
          url: window.location.href,
        })
      } catch (error) {
        console.error("Erro ao compartilhar:", error)
      }
    } else {
      // Fallback para navegadores que não suportam Web Share API
      navigator.clipboard.writeText(window.location.href)
      alert("Link copiado para a área de transferência!")
    }
  }

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [stream])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/50 via-blue-50/30 to-pink-50/50">
      <UnifiedHeader user={user} />

      <main className="px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="hover:bg-white/50 rounded-xl">
              <ArrowLeft className="h-5 w-5 text-gray-700" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <QrCode className="w-8 h-8 text-purple-500" />
                QR Code
              </h1>
              <p className="text-gray-600">Seu código de identificação e scanner</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Meu QR Code */}
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <QrCode className="w-5 h-5 text-purple-500" />
                  Meu QR Code
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Use este código para se identificar nos estabelecimentos parceiros
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* QR Code Visual */}
                <div className="flex justify-center">
                  <div className="w-64 h-64 bg-white border-4 border-gray-200 rounded-2xl flex items-center justify-center shadow-lg">
                    <div className="w-56 h-56 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center">
                      <div className="grid grid-cols-8 gap-1">
                        {Array.from({ length: 64 }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 ${Math.random() > 0.5 ? "bg-gray-900" : "bg-transparent"}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Informações do QR Code */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Status:</span>
                    <Badge className="bg-green-100 text-green-800 border-0">
                      {meuQRCode.ativo ? "Ativo" : "Inativo"}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Tipo:</span>
                    <Badge className="bg-blue-100 text-blue-800 border-0 capitalize">{user.userType}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Gerado em:</span>
                    <span className="text-sm font-medium text-gray-900">
                      {new Date(meuQRCode.dataGeracao).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">ID:</span>
                    <span className="text-sm font-mono text-gray-900">{meuQRCode.id}</span>
                  </div>
                </div>

                {/* Ações */}
                <div className="flex gap-3">
                  <Button
                    onClick={baixarQRCode}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white rounded-xl"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Baixar
                  </Button>
                  <Button
                    onClick={compartilharQRCode}
                    variant="outline"
                    className="flex-1 border-2 border-gray-200 rounded-xl bg-transparent"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Compartilhar
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Scanner QR Code */}
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Camera className="w-5 h-5 text-green-500" />
                  Scanner QR Code
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Escaneie QR codes de outros usuários para verificar se são válidos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {!scannerAtivo ? (
                  <div className="space-y-4">
                    <div className="w-full h-64 bg-gray-100 rounded-2xl flex items-center justify-center">
                      <div className="text-center">
                        <Scan className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-4">Clique no botão abaixo para iniciar o scanner</p>
                        <Button
                          onClick={iniciarScanner}
                          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl"
                        >
                          <Camera className="w-5 h-5 mr-2" />
                          Iniciar Scanner
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative w-full h-64 bg-black rounded-2xl overflow-hidden">
                      <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-48 h-48 border-4 border-white rounded-2xl opacity-50"></div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        onClick={simularScanQRCode}
                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl"
                      >
                        <Scan className="w-4 h-4 mr-2" />
                        Simular Scan
                      </Button>
                      <Button
                        onClick={pararScanner}
                        variant="outline"
                        className="flex-1 border-2 border-gray-200 rounded-xl bg-transparent"
                      >
                        Parar Scanner
                      </Button>
                    </div>
                  </div>
                )}

                <canvas ref={canvasRef} className="hidden" />
              </CardContent>
            </Card>
          </div>

          {/* Instruções */}
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm rounded-2xl mt-8">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">Como usar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Meu QR Code</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Apresente seu QR Code nos estabelecimentos parceiros</li>
                    <li>• Use para identificação rápida e segura</li>
                    <li>• Baixe ou compartilhe quando necessário</li>
                    <li>• Mantenha sempre atualizado</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Scanner</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Escaneie QR codes de outros usuários</li>
                    <li>• Verifique se são usuários válidos do sistema</li>
                    <li>• Use para validar clientes ou fornecedores</li>
                    <li>• Permita acesso à câmera quando solicitado</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Modal de Resultado do Scan */}
      <Dialog open={!!resultadoScan} onOpenChange={() => setResultadoScan(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {resultadoScan?.sucesso ? (
                <CheckCircle className="w-6 h-6 text-green-500" />
              ) : (
                <XCircle className="w-6 h-6 text-red-500" />
              )}
              Resultado do Scan
            </DialogTitle>
            <DialogDescription>{resultadoScan?.mensagem}</DialogDescription>
          </DialogHeader>

          {resultadoScan?.sucesso && resultadoScan.usuario && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-2">Informações do Usuário</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nome:</span>
                    <span className="font-medium">{resultadoScan.usuario.nome}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{resultadoScan.usuario.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tipo:</span>
                    <Badge className="bg-blue-100 text-blue-800 border-0 capitalize">
                      {resultadoScan.usuario.tipo}
                    </Badge>
                  </div>
                  {resultadoScan.usuario.empresa && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Empresa:</span>
                      <span className="font-medium">{resultadoScan.usuario.empresa}</span>
                    </div>
                  )}
                  {resultadoScan.usuario.pets && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pets:</span>
                      <span className="font-medium">{resultadoScan.usuario.pets.join(", ")}</span>
                    </div>
                  )}
                </div>
              </div>

              {(user.userType === "petshop" && resultadoScan.usuario.tipo === "cliente") ||
              (user.userType === "fornecedor" && resultadoScan.usuario.tipo === "petshop") ? (
                <Button
                  onClick={() => {
                    setResultadoScan(null)
                    router.push("/clientes?action=nova-venda&usuario=" + resultadoScan.usuario.nome)
                  }}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl"
                >
                  Efetuar Venda
                </Button>
              ) : null}
            </div>
          )}

          <Button
            onClick={() => setResultadoScan(null)}
            variant="outline"
            className="w-full border-2 border-gray-200 rounded-xl"
          >
            Fechar
          </Button>
        </DialogContent>
      </Dialog>

      <FloatingButtons />
    </div>
  )
}
