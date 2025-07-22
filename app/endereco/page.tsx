"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { MapPin, Plus, Edit, Trash2, Home, Building, ArrowLeft } from "lucide-react"
import { UnifiedHeader } from "@/components/unified-header"
import { FloatingButtons } from "@/components/floating-buttons"

export default function EnderecoPage() {
  const router = useRouter()
  const [user] = useState({
    name: "Maria Silva",
    email: "maria@email.com",
    avatar: "/placeholder-user.jpg",
    userType: "cliente" as const,
  })

  const [enderecos, setEnderecos] = useState([
    {
      id: "1",
      tipo: "residencial",
      nome: "Casa",
      cep: "01234-567",
      rua: "Rua das Flores, 123",
      complemento: "Apto 45",
      bairro: "Vila Madalena",
      cidade: "São Paulo",
      estado: "SP",
      principal: true,
    },
    {
      id: "2",
      tipo: "comercial",
      nome: "Trabalho",
      cep: "04567-890",
      rua: "Av. Paulista, 1000",
      complemento: "Sala 1205",
      bairro: "Bela Vista",
      cidade: "São Paulo",
      estado: "SP",
      principal: false,
    },
  ])

  const [novoEndereco, setNovoEndereco] = useState({
    tipo: "residencial",
    nome: "",
    cep: "",
    rua: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
  })

  const [editandoId, setEditandoId] = useState<string | null>(null)
  const [mostrarFormulario, setMostrarFormulario] = useState(false)

  const handleSalvarEndereco = () => {
    if (editandoId) {
      // Editar endereço existente
      setEnderecos(
        enderecos.map((end) =>
          end.id === editandoId ? { ...novoEndereco, id: editandoId, principal: end.principal } : end,
        ),
      )
      setEditandoId(null)
    } else {
      // Adicionar novo endereço
      const id = Date.now().toString()
      setEnderecos([
        ...enderecos,
        {
          ...novoEndereco,
          id,
          principal: enderecos.length === 0,
        },
      ])
    }

    setNovoEndereco({
      tipo: "residencial",
      nome: "",
      cep: "",
      rua: "",
      complemento: "",
      bairro: "",
      cidade: "",
      estado: "",
    })
    setMostrarFormulario(false)
  }

  const handleEditarEndereco = (endereco: any) => {
    setNovoEndereco(endereco)
    setEditandoId(endereco.id)
    setMostrarFormulario(true)
  }

  const handleExcluirEndereco = (id: string) => {
    setEnderecos(enderecos.filter((end) => end.id !== id))
  }

  const handleDefinirPrincipal = (id: string) => {
    setEnderecos(
      enderecos.map((end) => ({
        ...end,
        principal: end.id === id,
      })),
    )
  }

  const buscarCEP = async (cep: string) => {
    if (cep.length === 8) {
      // Simular busca de CEP
      setNovoEndereco((prev) => ({
        ...prev,
        rua: "Rua Exemplo, 123",
        bairro: "Centro",
        cidade: "São Paulo",
        estado: "SP",
      }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50">
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
                <MapPin className="w-8 h-8 text-blue-500" />
                Meus Endereços
              </h1>
              <p className="text-gray-600">Gerencie seus endereços de entrega e cobrança</p>
            </div>
          </div>

          {/* Botão Adicionar */}
          <div className="mb-6">
            <Button
              onClick={() => setMostrarFormulario(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl"
            >
              <Plus className="w-5 h-5 mr-2" />
              Adicionar Endereço
            </Button>
          </div>

          {/* Formulário */}
          {mostrarFormulario && (
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm rounded-2xl mb-6">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">
                  {editandoId ? "Editar Endereço" : "Novo Endereço"}
                </CardTitle>
                <CardDescription className="text-gray-600">Preencha as informações do endereço</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tipo">Tipo de Endereço</Label>
                    <select
                      id="tipo"
                      value={novoEndereco.tipo}
                      onChange={(e) => setNovoEndereco((prev) => ({ ...prev, tipo: e.target.value }))}
                      className="w-full h-11 px-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-blue-500/20"
                    >
                      <option value="residencial">Residencial</option>
                      <option value="comercial">Comercial</option>
                      <option value="outro">Outro</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome do Endereço</Label>
                    <Input
                      id="nome"
                      value={novoEndereco.nome}
                      onChange={(e) => setNovoEndereco((prev) => ({ ...prev, nome: e.target.value }))}
                      placeholder="Ex: Casa, Trabalho, etc."
                      className="h-11 border-gray-200 rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cep">CEP</Label>
                    <Input
                      id="cep"
                      value={novoEndereco.cep}
                      onChange={(e) => {
                        const cep = e.target.value.replace(/\D/g, "")
                        setNovoEndereco((prev) => ({ ...prev, cep: cep.replace(/(\d{5})(\d{3})/, "$1-$2") }))
                        if (cep.length === 8) buscarCEP(cep)
                      }}
                      placeholder="00000-000"
                      className="h-11 border-gray-200 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="rua">Rua/Avenida</Label>
                    <Input
                      id="rua"
                      value={novoEndereco.rua}
                      onChange={(e) => setNovoEndereco((prev) => ({ ...prev, rua: e.target.value }))}
                      placeholder="Rua das Flores, 123"
                      className="h-11 border-gray-200 rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="complemento">Complemento</Label>
                  <Input
                    id="complemento"
                    value={novoEndereco.complemento}
                    onChange={(e) => setNovoEndereco((prev) => ({ ...prev, complemento: e.target.value }))}
                    placeholder="Apto, Bloco, Sala, etc."
                    className="h-11 border-gray-200 rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bairro">Bairro</Label>
                    <Input
                      id="bairro"
                      value={novoEndereco.bairro}
                      onChange={(e) => setNovoEndereco((prev) => ({ ...prev, bairro: e.target.value }))}
                      placeholder="Centro"
                      className="h-11 border-gray-200 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cidade">Cidade</Label>
                    <Input
                      id="cidade"
                      value={novoEndereco.cidade}
                      onChange={(e) => setNovoEndereco((prev) => ({ ...prev, cidade: e.target.value }))}
                      placeholder="São Paulo"
                      className="h-11 border-gray-200 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="estado">Estado</Label>
                    <Input
                      id="estado"
                      value={novoEndereco.estado}
                      onChange={(e) => setNovoEndereco((prev) => ({ ...prev, estado: e.target.value }))}
                      placeholder="SP"
                      className="h-11 border-gray-200 rounded-xl"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleSalvarEndereco}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl"
                  >
                    {editandoId ? "Salvar Alterações" : "Adicionar Endereço"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setMostrarFormulario(false)
                      setEditandoId(null)
                      setNovoEndereco({
                        tipo: "residencial",
                        nome: "",
                        cep: "",
                        rua: "",
                        complemento: "",
                        bairro: "",
                        cidade: "",
                        estado: "",
                      })
                    }}
                    className="border-2 border-gray-200 rounded-xl"
                  >
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Lista de Endereços */}
          <div className="space-y-4">
            {enderecos.map((endereco) => (
              <Card key={endereco.id} className="border-0 shadow-xl bg-white/90 backdrop-blur-sm rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        {endereco.tipo === "residencial" ? (
                          <Home className="w-6 h-6 text-blue-600" />
                        ) : (
                          <Building className="w-6 h-6 text-blue-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-gray-900">{endereco.nome}</h3>
                          {endereco.principal && (
                            <Badge className="bg-green-100 text-green-800 border-0 text-xs">Principal</Badge>
                          )}
                          <Badge className="bg-blue-100 text-blue-800 border-0 text-xs capitalize">
                            {endereco.tipo}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p>{endereco.rua}</p>
                          {endereco.complemento && <p>{endereco.complemento}</p>}
                          <p>
                            {endereco.bairro} - {endereco.cidade}/{endereco.estado}
                          </p>
                          <p>CEP: {endereco.cep}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {!endereco.principal && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDefinirPrincipal(endereco.id)}
                          className="border-2 border-gray-200 rounded-xl"
                        >
                          Definir como Principal
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditarEndereco(endereco)}
                        className="border-2 border-gray-200 rounded-xl"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleExcluirEndereco(endereco.id)}
                        className="border-2 border-red-200 text-red-600 hover:bg-red-50 rounded-xl"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {enderecos.length === 0 && (
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardContent className="p-12 text-center">
                <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhum endereço cadastrado</h3>
                <p className="text-gray-600 mb-4">Adicione seu primeiro endereço para facilitar suas compras</p>
                <Button
                  onClick={() => setMostrarFormulario(true)}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Adicionar Endereço
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <FloatingButtons />
    </div>
  )
}
