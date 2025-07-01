"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PawPrint, Mail, Lock, ArrowLeft, ArrowRight, Shield, CheckCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function RecuperarPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState("")
  const [codigo, setCodigo] = useState("")
  const [novaSenha, setNovaSenha] = useState("")
  const [confirmaNovaSenha, setConfirmaNovaSenha] = useState("")

  const handleStep1Next = () => {
    if (!email) {
      alert("Por favor, digite seu e-mail")
      return
    }
    // Simular envio do código
    console.log("Enviando código para:", email)
    setStep(2)
  }

  const handleStep2Next = () => {
    if (!codigo) {
      alert("Por favor, digite o código recebido")
      return
    }
    // Simular validação do código
    console.log("Validando código:", codigo)
    setStep(3)
  }

  const handleFinish = () => {
    if (!novaSenha || !confirmaNovaSenha) {
      alert("Por favor, preencha todos os campos")
      return
    }
    if (novaSenha !== confirmaNovaSenha) {
      alert("As senhas não coincidem!")
      return
    }
    // Simular alteração da senha
    console.log("Nova senha definida com sucesso")
    alert("Senha alterada com sucesso!")
    router.push("/")
  }

  const renderStep1 = () => (
    <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
      <CardHeader className="text-center pb-6">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg">
            <PawPrint className="w-8 h-8 text-white" />
          </div>
        </div>
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
          Recuperar Senha
        </CardTitle>
        <CardDescription className="text-gray-600 text-base mt-2">Etapa 1 de 3 - Digite seu e-mail</CardDescription>
        <Progress value={33} className="mt-4 h-2" />
      </CardHeader>
      <CardContent className="space-y-6 px-8 pb-8">
        <div className="text-center mb-6">
          <p className="text-gray-600">Digite o e-mail cadastrado em sua conta para receber o código de recuperação.</p>
        </div>

        <div className="space-y-2">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              id="email"
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-11 h-12 border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-xl"
            />
          </div>
        </div>

        <div className="flex gap-4 pt-6">
          <Button
            onClick={() => router.push("/")}
            variant="outline"
            className="flex-1 h-12 border-2 border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <Button
            onClick={handleStep1Next}
            disabled={!email}
            className={`flex-1 h-12 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 ${
              email
                ? "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Enviar Código
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const renderStep2 = () => (
    <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
      <CardHeader className="text-center pb-6">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
        </div>
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
          Código de Verificação
        </CardTitle>
        <CardDescription className="text-gray-600 text-base mt-2">
          Etapa 2 de 3 - Digite o código recebido
        </CardDescription>
        <Progress value={66} className="mt-4 h-2" />
      </CardHeader>
      <CardContent className="space-y-6 px-8 pb-8">
        <div className="text-center mb-6">
          <p className="text-gray-600">Enviamos um código de verificação para:</p>
          <p className="font-semibold text-orange-600 mt-1">{email}</p>
          <p className="text-sm text-gray-500 mt-2">Verifique sua caixa de entrada e spam.</p>
        </div>

        <div className="space-y-2">
          <div className="relative">
            <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              id="codigo"
              type="text"
              placeholder="Digite o código de 6 dígitos"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              className="pl-11 h-12 border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-xl text-center tracking-widest"
              maxLength={6}
            />
          </div>
        </div>

        <div className="text-center">
          <button className="text-orange-600 hover:text-orange-700 font-medium hover:underline text-sm">
            Não recebeu o código? Reenviar
          </button>
        </div>

        <div className="flex gap-4 pt-6">
          <Button
            onClick={() => setStep(1)}
            variant="outline"
            className="flex-1 h-12 border-2 border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <Button
            onClick={handleStep2Next}
            disabled={!codigo || codigo.length !== 6}
            className={`flex-1 h-12 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 ${
              codigo && codigo.length === 6
                ? "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Verificar
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const renderStep3 = () => (
    <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
      <CardHeader className="text-center pb-6">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
        </div>
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          Nova Senha
        </CardTitle>
        <CardDescription className="text-gray-600 text-base mt-2">Etapa 3 de 3 - Defina sua nova senha</CardDescription>
        <Progress value={100} className="mt-4 h-2" />
      </CardHeader>
      <CardContent className="space-y-6 px-8 pb-8">
        <div className="text-center mb-6">
          <p className="text-gray-600">Agora você pode definir uma nova senha para sua conta.</p>
        </div>

        <div className="space-y-2">
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              id="novaSenha"
              type="password"
              placeholder="Digite sua nova senha"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              className="pl-11 h-12 border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-xl"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              id="confirmaNovaSenha"
              type="password"
              placeholder="Confirme sua nova senha"
              value={confirmaNovaSenha}
              onChange={(e) => setConfirmaNovaSenha(e.target.value)}
              className="pl-11 h-12 border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-xl"
            />
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-xl">
          <p className="text-sm text-blue-700">
            <strong>Dica:</strong> Use uma senha forte com pelo menos 8 caracteres, incluindo letras, números e
            símbolos.
          </p>
        </div>

        <div className="flex gap-4 pt-6">
          <Button
            onClick={() => setStep(2)}
            variant="outline"
            className="flex-1 h-12 border-2 border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <Button
            onClick={handleFinish}
            disabled={!novaSenha || !confirmaNovaSenha}
            className={`flex-1 h-12 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 ${
              novaSenha && confirmaNovaSenha
                ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Finalizar
            <CheckCircle className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-orange-200/30 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-amber-200/30 rounded-full blur-xl"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-yellow-200/30 rounded-full blur-xl"></div>

      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
    </div>
  )
}
