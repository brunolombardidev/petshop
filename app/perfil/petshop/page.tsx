"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Store, MapPin, Star, Users, Package, Save, Camera } from "lucide-react"
import { FloatingButtons } from "@/components/floating-buttons"

export default function PerfilPetshopPage() {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    nome: "PetShop VetCare",
    email: "contato@vetcare.com",
    telefone: "(11) 99999-9999",
    endereco: "Rua das Flores, 123",
    cidade: "São Paulo",
    estado: "SP",
    cep: "01234-567",
    descricao: "Petshop especializado em cuidados veterinários e produtos premium para pets.",
    horarioFuncionamento: "Segunda a Sexta: 8h às 18h\nSábado: 8h às 16h\nDomingo: Fechado",
    especialidades: ["Veterinária", "Banho e Tosa", "Pet Shop", "Vacinação"],
    aceitaConvenio: true,
    entregaDomicilio: true,
    agendamentoOnline: true,
  })

  const estatisticas = {
    clientesAtivos: 342,
    avaliacaoMedia: 4.8,
    totalAvaliacoes: 127,
    servicosRealizados: 1456,
    produtosVendidos: 2847,
  }

  const avaliacoesRecentes = [
    {
      id: "1",
      cliente: "Maria Silva",
      avaliacao: 5,
      comentario: "Excelente atendimento! Meu pet foi muito bem cuidado.",
      data: "2024-01-15",
      servico: "Consulta Veterinária",
    },
    {
      id: "2",
      cliente: "João Santos",
      avaliacao: 4,
      comentario: "Bom serviço de banho e tosa. Recomendo!",
      data: "2024-01-14",
      servico: "Banho e Tosa",
    },
    {
      id: "3",
      cliente: "Ana Costa",
      avaliacao: 5,
      comentario: "Produtos de qualidade e preço justo.",
      data: "2024-01-13",
      servico: "Compra de Produtos",
    },
  ]

  const handleSave = () => {
    // Simular salvamento
    console.log("Dados salvos:", formData)
    setIsEditing(false)
    alert("Perfil atualizado com sucesso!")
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D6DD83]/20 via-[#FFBDB6]/20 to-[#30B2B0]/20">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="hover:bg-blue-100 rounded-xl">
              <ArrowLeft className="h-5 w-5 text-gray-700" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-bpet-primary to-bpet-secondary rounded-xl flex items-center justify-center shadow-lg">
                <Store className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-900">Perfil do PetShop</h1>
                <p className="text-sm text-gray-600">Gerencie as informações do seu estabelecimento</p>
              </div>
            </div>
          </div>
          <Button
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            className="bg-gradient-to-r from-bpet-primary to-bpet-secondary hover:from-bpet-secondary hover:to-bpet-primary text-white rounded-xl"
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4 mr-2" />
                Salvar
              </>
            ) : (
              "Editar Perfil"
            )}
          </Button>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-bpet-primary to-bpet-secondary text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Clientes Ativos</p>
                    <p className="text-3xl font-bold">{estatisticas.clientesAtivos}</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-bpet-secondary to-[#D6DD83] text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Avaliação</p>
                    <p className="text-3xl font-bold">{estatisticas.avaliacaoMedia}</p>
                  </div>
                  <Star className="w-8 h-8 text-green-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-[#D6DD83] to-[#FFBDB6] text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-100 text-sm">Avaliações</p>
                    <p className="text-3xl font-bold">{estatisticas.totalAvaliacoes}</p>
                  </div>
                  <Star className="w-8 h-8 text-yellow-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-[#FFBDB6] to-bpet-primary text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Serviços</p>
                    <p className="text-3xl font-bold">{estatisticas.servicosRealizados}</p>
                  </div>
                  <Package className="w-8 h-8 text-purple-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-bpet-primary to-bpet-secondary text-white rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-indigo-100 text-sm">Produtos</p>
                    <p className="text-3xl font-bold">{estatisticas.produtosVendidos}</p>
                  </div>
                  <Package className="w-8 h-8 text-indigo-200" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="informacoes" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-white rounded-2xl shadow-sm border border-gray-200">
              <TabsTrigger value="informacoes" className="rounded-xl">
                Informações
              </TabsTrigger>
              <TabsTrigger value="avaliacoes" className="rounded-xl">
                Avaliações
              </TabsTrigger>
              <TabsTrigger value="configuracoes" className="rounded-xl">
                Configurações
              </TabsTrigger>
            </TabsList>

            {/* Aba Informações */}
            <TabsContent value="informacoes">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Informações Básicas */}
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <Store className="w-5 h-5 text-blue-500" />
                      Informações Básicas
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Foto do Estabelecimento */}
                    <div className="flex justify-center">
                      <div className="relative">
                        <div className="w-32 h-32 bg-gradient-to-br from-bpet-primary to-bpet-secondary rounded-2xl flex items-center justify-center shadow-lg">
                          <Store className="w-16 h-16 text-white" />
                        </div>
                        {isEditing && (
                          <Button
                            type="button"
                            size="icon"
                            className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-gray-700 shadow-lg"
                          >
                            <Camera className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="nome" className="text-gray-700 font-medium">
                          Nome do Estabelecimento
                        </Label>
                        <Input
                          id="nome"
                          value={formData.nome}
                          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                          disabled={!isEditing}
                          className="h-12 border-gray-200 focus:border-[#30B2B0] focus:ring-[#30B2B0]/20 rounded-xl"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email" className="text-gray-700 font-medium">
                            E-mail
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            disabled={!isEditing}
                            className="h-12 border-gray-200 focus:border-[#30B2B0] focus:ring-[#30B2B0]/20 rounded-xl"
                          />
                        </div>

                        <div>
                          <Label htmlFor="telefone" className="text-gray-700 font-medium">
                            Telefone
                          </Label>
                          <Input
                            id="telefone"
                            value={formData.telefone}
                            onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                            disabled={!isEditing}
                            className="h-12 border-gray-200 focus:border-[#30B2B0] focus:ring-[#30B2B0]/20 rounded-xl"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="descricao" className="text-gray-700 font-medium">
                          Descrição
                        </Label>
                        <Textarea
                          id="descricao"
                          value={formData.descricao}
                          onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                          disabled={!isEditing}
                          className="min-h-[100px] border-gray-200 focus:border-[#30B2B0] focus:ring-[#30B2B0]/20 rounded-xl resize-none"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Endereço e Contato */}
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-green-500" />
                      Endereço e Contato
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="endereco" className="text-gray-700 font-medium">
                        Endereço
                      </Label>
                      <Input
                        id="endereco"
                        value={formData.endereco}
                        onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                        disabled={!isEditing}
                        className="h-12 border-gray-200 focus:border-[#30B2B0] focus:ring-[#30B2B0]/20 rounded-xl"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="cidade" className="text-gray-700 font-medium">
                          Cidade
                        </Label>
                        <Input
                          id="cidade"
                          value={formData.cidade}
                          onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                          disabled={!isEditing}
                          className="h-12 border-gray-200 focus:border-[#30B2B0] focus:ring-[#30B2B0]/20 rounded-xl"
                        />
                      </div>

                      <div>
                        <Label htmlFor="estado" className="text-gray-700 font-medium">
                          Estado
                        </Label>
                        <Input
                          id="estado"
                          value={formData.estado}
                          onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                          disabled={!isEditing}
                          className="h-12 border-gray-200 focus:border-[#30B2B0] focus:ring-[#30B2B0]/20 rounded-xl"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="cep" className="text-gray-700 font-medium">
                        CEP
                      </Label>
                      <Input
                        id="cep"
                        value={formData.cep}
                        onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
                        disabled={!isEditing}
                        className="h-12 border-gray-200 focus:border-[#30B2B0] focus:ring-[#30B2B0]/20 rounded-xl"
                      />
                    </div>

                    <div>
                      <Label htmlFor="horario" className="text-gray-700 font-medium">
                        Horário de Funcionamento
                      </Label>
                      <Textarea
                        id="horario"
                        value={formData.horarioFuncionamento}
                        onChange={(e) => setFormData({ ...formData, horarioFuncionamento: e.target.value })}
                        disabled={!isEditing}
                        className="min-h-[100px] border-gray-200 focus:border-[#30B2B0] focus:ring-[#30B2B0]/20 rounded-xl resize-none"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Aba Avaliações */}
            <TabsContent value="avaliacoes">
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    Avaliações dos Clientes
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {avaliacoesRecentes.length} avaliações recentes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {avaliacoesRecentes.map((avaliacao) => (
                      <div key={avaliacao.id} className="p-6 bg-gray-50 rounded-2xl">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold text-gray-900">{avaliacao.cliente}</h4>
                            <p className="text-sm text-gray-600">{avaliacao.servico}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 mb-1">{renderStars(avaliacao.avaliacao)}</div>
                            <p className="text-sm text-gray-500">
                              {new Date(avaliacao.data).toLocaleDateString("pt-BR")}
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{avaliacao.comentario}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Aba Configurações */}
            <TabsContent value="configuracoes">
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Package className="w-5 h-5 text-purple-500" />
                    Configurações do Estabelecimento
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <Label htmlFor="convenio" className="text-base font-medium text-gray-900">
                          Aceita Convênio
                        </Label>
                        <p className="text-sm text-gray-600">Aceitar pagamentos via convênio empresarial</p>
                      </div>
                      <Switch
                        id="convenio"
                        checked={formData.aceitaConvenio}
                        onCheckedChange={(checked) => setFormData({ ...formData, aceitaConvenio: checked })}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <Label htmlFor="entrega" className="text-base font-medium text-gray-900">
                          Entrega a Domicílio
                        </Label>
                        <p className="text-sm text-gray-600">Oferecer serviço de entrega em domicílio</p>
                      </div>
                      <Switch
                        id="entrega"
                        checked={formData.entregaDomicilio}
                        onCheckedChange={(checked) => setFormData({ ...formData, entregaDomicilio: checked })}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <Label htmlFor="agendamento" className="text-base font-medium text-gray-900">
                          Agendamento Online
                        </Label>
                        <p className="text-sm text-gray-600">Permitir agendamentos através do aplicativo</p>
                      </div>
                      <Switch
                        id="agendamento"
                        checked={formData.agendamentoOnline}
                        onCheckedChange={(checked) => setFormData({ ...formData, agendamentoOnline: checked })}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-gray-700 font-medium mb-3 block">Especialidades</Label>
                    <div className="flex flex-wrap gap-2">
                      {formData.especialidades.map((especialidade, index) => (
                        <Badge key={index} className="bg-[#30B2B0]/20 text-[#145D5F] border-0">
                          {especialidade}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Botões Flutuantes */}
      <FloatingButtons />
    </div>
  )
}
