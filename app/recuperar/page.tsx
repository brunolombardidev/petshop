"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Mail, CheckCircle, AlertCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function RecuperarPage() {
  const { forgotPassword } = useAuth()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)

  const handleRecovery = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes("@")) {
      return
    }

    setIsLoading(true)
    try {
      await forgotPassword(email)
      setIsEmailSent(true)
    } catch (error) {
      // Error já tratado no hook
    } finally {
      setIsLoading(false)
    }
  }

  const isFormValid = email && email.includes("@")

  if (isEmailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#D6DD83]/30 via-[#FFBDB6]/30 to-[#30B2B0]/30 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm rounded-2xl">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">E-mail enviado!</h2>
              <p className="text-gray-600 mb-6">
                Enviamos um link de recuperação para <strong>{email}</strong>. Verifique sua caixa de entrada e spam.
              </p>
              <div className="space-y-3">
                <Link href="/">
                  <Button className="w-full h-12 bg-gradient-to-r from-bpet-primary to-bpet-secondary hover:from-bpet-secondary hover:to-bpet-primary text-white rounded-xl">
                    Voltar ao Login
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={() => setIsEmailSent(false)}
                  className="w-full h-12 border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl"
                >
                  Tentar outro e-mail
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D6DD83]/30 via-[#FFBDB6]/30 to-[#30B2B0]/30 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/">
            <Button variant="ghost" size="icon" className="hover:bg-white/50 rounded-xl">
              <ArrowLeft className="h-5 w-5 text-gray-700" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-bpet-primary to-bpet-secondary rounded-xl flex items-center justify-center shadow-lg">
              <Image src="/bpet-logo.png" alt="BPet Logo" width={24} height={24} className="rounded-lg" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Recuperar Senha</h1>
              <p className="text-sm text-gray-600">Redefina sua senha de acesso</p>
            </div>
          </div>
        </div>

        {/* Card de Recuperação */}
        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm rounded-2xl">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-xl font-bold text-gray-900">Esqueceu sua senha?</CardTitle>
            <CardDescription className="text-gray-600">
              Digite seu e-mail para receber um link de recuperação
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRecovery} className="space-y-6">
              {/* Informação */}
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-blue-900 font-medium">Como funciona?</p>
                  <p className="text-sm text-blue-700">
                    Enviaremos um link seguro para o seu e-mail. Clique no link e defina uma nova senha.
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  E-mail cadastrado
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className="pl-11 h-12 border-gray-200 focus:border-[#30B2B0] focus:ring-[#30B2B0]/20 rounded-xl"
                    required
                  />
                </div>
              </div>

              {/* Botão de Envio */}
              <Button
                type="submit"
                disabled={!isFormValid || isLoading}
                className="w-full h-12 bg-gradient-to-r from-bpet-primary to-bpet-secondary hover:from-bpet-secondary hover:to-bpet-primary text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Enviando...
                  </div>
                ) : (
                  "Enviar Link de Recuperação"
                )}
              </Button>
            </form>

            {/* Voltar ao Login */}
            <div className="mt-6 text-center">
              <span className="text-sm text-gray-600">Lembrou da senha? </span>
              <Link href="/" className="text-sm text-[#30B2B0] hover:text-[#145D5F] font-medium hover:underline">
                Fazer login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
