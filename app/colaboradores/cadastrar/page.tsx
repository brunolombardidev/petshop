"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, UserPlus, Save, Users, Building, Mail } from "lucide-react"
import { FloatingButtons } from "@/components/floating-buttons"

export default function CadastrarColaboradorPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    departamento: "",
    cargo: "",
    dataAdmissao: "",
    salario: "",
    temPets: false,
    quantidadePets: "",
    observacoes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simular cadastro do colaborador
    console.log("Colaborador cadastrado:", formData)
    alert("Colaborador cadastrado com sucesso!")
    router.push("/colaboradores")
  }

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
                <UserPlus className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-900">Cadastrar Colaborador</h1>
                <p className="text-sm text-gray-600">Adicione um novo colaborador à empresa</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-500" />
                Dados do Colaborador
              </CardTitle>
              <CardDescription className="text-gray-600">Preencha as informações do novo colaborador</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Informações Pessoais */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-500" />
                    Informações Pessoais
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="nome" className="text-gray-700 font-medium">
                        Nome Completo *
                      </Label>
                      <Input
                        id="nome"
                        required
                        value={formData.nome}
                        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                        className="h-12 border-gray-200 focus:border-[#30B2B0] focus:ring-[#30B2B0]/20 rounded-xl"
                        placeholder="Nome completo do colaborador"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cpf" className="text-gray-700 font-medium">
                        CPF *
                      </Label>
                      <Input
                        id="cpf"
                        required
                        value={formData.cpf}
                        onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                        className="h-12 border-gray-200 focus:border-[#30B2B0] focus:ring-[#30B2B0]/20 rounded-xl"
                        placeholder="000.000.000-00"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-700 font-medium">
                        E-mail *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="h-12 border-gray-200 focus:border-[#30B2B0] focus:ring-[#30B2B0]/20 rounded-xl"
                        placeholder="email@empresa.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="telefone" className="text-gray-700 font-medium">
                        Telefone *
                      </Label>
                      <Input
                        id="telefone"
                        required
                        value={formData.telefone}
                        onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                        className="h-12 border-gray-200 focus:border-[#30B2B0] focus:ring-[#30B2B0]/20 rounded-xl"
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                  </div>
                </div>

                {/* Informações Profissionais */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Building className="w-5 h-5 text-purple-500" />
                    Informações Profissionais
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="departamento" className="text-gray-700 font-medium">
                        Departamento *
                      </Label>
                      <Select
                        value={formData.departamento}
                        onValueChange={(value) => setFormData({ ...formData, departamento: value })}
                        required
                      >
                        <SelectTrigger className="h-12 border-gray-200 focus:border-[#30B2B0] focus:ring-[#30B2B0]/20 rounded-xl">
                          <SelectValue placeholder="Selecione o departamento" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rh">Recursos Humanos</SelectItem>
                          <SelectItem value="ti">Tecnologia da Informação</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="vendas">Vendas</SelectItem>
                          <SelectItem value="financeiro">Financeiro</SelectItem>
                          <SelectItem value="operacoes">Operações</SelectItem>
                          <SelectItem value="juridico">Jurídico</SelectItem>
                          <SelectItem value="administrativo">Administrativo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cargo" className="text-gray-700 font-medium">
                        Cargo *
                      </Label>
                      <Input
                        id="cargo"
                        required
                        value={formData.cargo}
                        onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                        className="h-12 border-gray-200 focus:border-[#30B2B0] focus:ring-[#30B2B0]/20 rounded-xl"
                        placeholder="Ex: Analista, Gerente, Coordenador..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dataAdmissao" className="text-gray-700 font-medium">
                        Data de Admissão *
                      </Label>
                      <Input
                        id="dataAdmissao"
                        type="date"
                        required
                        value={formData.dataAdmissao}
                        onChange={(e) => setFormData({ ...formData, dataAdmissao: e.target.value })}
                        className="h-12 border-gray-200 focus:border-[#30B2B0] focus:ring-[#30B2B0]/20 rounded-xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="salario" className="text-gray-700 font-medium">
                        Salário (R$)
                      </Label>
                      <Input
                        id="salario"
                        type="number"
                        value={formData.salario}
                        onChange={(e) => setFormData({ ...formData, salario: e.target.value })}
                        className="h-12 border-gray-200 focus:border-[#30B2B0] focus:ring-[#30B2B0]/20 rounded-xl"
                        placeholder="0,00"
                      />
                    </div>
                  </div>
                </div>

                {/* Informações sobre Pets */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-green-500" />
                    Informações sobre Pets
                  </h3>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <Label htmlFor="temPets" className="text-base font-medium text-gray-900">
                        Possui Pets?
                      </Label>
                      <p className="text-sm text-gray-600">Colaborador possui animais de estimação</p>
                    </div>
                    <Switch
                      id="temPets"
                      checked={formData.temPets}
                      onCheckedChange={(checked) => setFormData({ ...formData, temPets: checked })}
                    />
                  </div>

                  {formData.temPets && (
                    <div className="space-y-2">
                      <Label htmlFor="quantidadePets" className="text-gray-700 font-medium">
                        Quantidade de Pets
                      </Label>
                      <Input
                        id="quantidadePets"
                        type="number"
                        min="1"
                        value={formData.quantidadePets}
                        onChange={(e) => setFormData({ ...formData, quantidadePets: e.target.value })}
                        className="h-12 border-gray-200 focus:border-[#30B2B0] focus:ring-[#30B2B0]/20 rounded-xl"
                        placeholder="Número de pets"
                      />
                    </div>
                  )}
                </div>

                <div className="p-4 bg-[#30B2B0]/20 rounded-xl">
                  <h3 className="font-medium text-[#145D5F] mb-2">Benefícios Disponíveis</h3>
                  <p className="text-sm text-[#145D5F]/80">
                    Colaboradores com pets terão acesso automático aos benefícios pet da empresa, incluindo descontos em
                    consultas veterinárias, medicamentos e serviços especializados.
                  </p>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    onClick={() => router.back()}
                    variant="outline"
                    className="flex-1 h-12 rounded-xl"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 h-12 bg-gradient-to-r from-bpet-primary to-bpet-secondary hover:from-bpet-secondary hover:to-bpet-primary text-white rounded-xl"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Cadastrar Colaborador
                  </Button>
                </div>
              </form>
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
