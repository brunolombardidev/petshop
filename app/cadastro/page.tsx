"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, ArrowLeft, Heart, Mail, Lock, User, Building, Phone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function CadastroPage() {
  const { register, loading } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    userType: "",
    document: "", // CPF ou CNPJ
    companyName: "", // Para empresas
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validações
    if (formData.password !== formData.confirmPassword) {
      return
    }

    if (!acceptTerms) {
      return
    }

    try {
      await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        userType: formData.userType as any,
        document: formData.document,
      })
    } catch (error) {
      // Error já tratado no hook
    }
  }

  const isCompanyType = ["petshop", "fornecedor", "empresa"].includes(formData.userType)

  const isFormValid =
    formData.name &&
    formData.email &&
    formData.password &&
    formData.confirmPassword &&
    formData.userType &&
    formData.document &&
    (isCompanyType ? formData.companyName : true) &&
    acceptTerms &&
    formData.password === formData.confirmPassword

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
              <h1 className="text-2xl font-bold text-gray-900">Criar Conta</h1>
              <p className="text-sm text-gray-600">Junte-se à nossa comunidade</p>
            </div>
          </div>
        </div>

        {/* Card de Cadastro */}
        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm rounded-2xl">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-xl font-bold text-gray-900">Cadastro</CardTitle>
            <CardDescription className="text-gray-600">Preencha os dados para criar sua conta</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              {/* Tipo de Usuário */}
              <div className="space-y-2">
                <Label htmlFor="userType" className="text-sm font-medium text-gray-700">
                  Eu sou: *
                </Label>
                <Select
                  value={formData.userType}
                  onValueChange={(value) => handleInputChange("userType", value)}
                  required
                >
                  <SelectTrigger className="h-11 border-gray-200 focus:border-[#30B2B0] focus:ring-[#30B2B0]/20 rounded-xl">
                    <SelectValue placeholder="Selecione o tipo de usuário" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cliente">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Cliente (Dono de Pet)
                      </div>
                    </SelectItem>
                    <SelectItem value="petshop">
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4" />
                        Petshop/Clínica
                      </div>
                    </SelectItem>
                    <SelectItem value="fornecedor">
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4" />
                        Fornecedor
                      </div>
                    </SelectItem>
                    <SelectItem value="empresa">
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4" />
                        Empresa
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Nome */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  {isCompanyType ? "Nome do Responsável *" : "Nome Completo *"}
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Seu nome completo"
                    className="pl-10 h-11 border-gray-200 focus:border-[#30B2B0] focus:ring-[#30B2B0]/20 rounded-xl"
                    required
                  />
                </div>
              </div>

              {/* Nome da Empresa (apenas para empresas) */}
              {isCompanyType && (
                <div className="space-y-2">
                  <Label htmlFor="companyName" className="text-sm font-medium text-gray-700">
                    Nome da Empresa *
                  </Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="companyName"
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange("companyName", e.target.value)}
                      placeholder="Nome da empresa"
                      className="pl-10 h-11 border-gray-200 focus:border-[#30B2B0] focus:ring-[#30B2B0]/20 rounded-xl"
                      required
                    />
                  </div>
                </div>
              )}

              {/* CPF/CNPJ */}
              <div className="space-y-2">
                <Label htmlFor="document" className="text-sm font-medium text-gray-700">
                  {isCompanyType ? "CNPJ *" : "CPF *"}
                </Label>
                <Input
                  id="document"
                  type="text"
                  value={formData.document}
                  onChange={(e) => handleInputChange("document", e.target.value)}
                  placeholder={isCompanyType ? "00.000.000/0000-00" : "000.000.000-00"}
                  className="h-11 border-gray-200 focus:border-[#30B2B0] focus:ring-[#30B2B0]/20 rounded-xl"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  E-mail *
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="seu@email.com"
                    className="pl-10 h-11 border-gray-200 focus:border-[#30B2B0] focus:ring-[#30B2B0]/20 rounded-xl"
                    required
                  />
                </div>
              </div>

              {/* Telefone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  Telefone
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="(11) 99999-9999"
                    className="pl-10 h-11 border-gray-200 focus:border-[#30B2B0] focus:ring-[#30B2B0]/20 rounded-xl"
                  />
                </div>
              </div>

              {/* Senha */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Senha *
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    placeholder="••••••••"
                    className="pl-10 pr-10 h-11 border-gray-200 focus:border-[#30B2B0] focus:ring-[#30B2B0]/20 rounded-xl"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirmar Senha */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                  Confirmar Senha *
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    placeholder="••••••••"
                    className="pl-10 pr-10 h-11 border-gray-200 focus:border-[#30B2B0] focus:ring-[#30B2B0]/20 rounded-xl"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="text-sm text-red-600">As senhas não coincidem</p>
                )}
              </div>

              {/* Termos de Uso */}
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" checked={acceptTerms} onCheckedChange={setAcceptTerms} />
                <Label htmlFor="terms" className="text-sm text-gray-600">
                  Aceito os{" "}
                  <Link href="/termos" className="text-[#30B2B0] hover:text-[#145D5F] underline">
                    termos de uso
                  </Link>{" "}
                  e{" "}
                  <Link href="/privacidade" className="text-[#30B2B0] hover:text-[#145D5F] underline">
                    política de privacidade
                  </Link>
                </Label>
              </div>

              {/* Botão de Cadastro */}
              <Button
                type="submit"
                disabled={!isFormValid || loading}
                className="w-full h-11 bg-gradient-to-r from-bpet-primary to-bpet-secondary hover:from-bpet-secondary hover:to-bpet-primary text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Criando conta...
                  </div>
                ) : (
                  "Criar Conta"
                )}
              </Button>
            </form>

            {/* Já tem conta */}
            <div className="mt-6 text-center">
              <span className="text-sm text-gray-600">Já tem uma conta? </span>
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
