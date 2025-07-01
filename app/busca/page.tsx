"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, PawPrint, MapPin, Star, Phone, Mail, Building, Package, User, Users } from "lucide-react"
import { FloatingButtons } from "@/components/floating-buttons"

// Dados mockados dos usuários do sistema
const usuariosData = {
  clientes: [
    {
      id: "1",
      nome: "Ana Costa Silva",
      tipo: "cliente",
      endereco: "Rua das Palmeiras, 456 - Jardins",
      cidade: "São Paulo",
      telefone: "(11) 9999-1234",
      email: "ana.costa@email.com",
      avaliacao: 4.9,
      especialidades: ["Cliente Premium", "Pets: 3 Cães"],
      foto: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "2",
      nome: "Carlos Eduardo Santos",
      tipo: "cliente",
      endereco: "Av. Brigadeiro, 789 - Centro",
      cidade: "São Paulo",
      telefone: "(11) 9888-5678",
      email: "carlos.santos@email.com",
      avaliacao: 4.7,
      especialidades: ["Cliente Regular", "Pets: 2 Gatos"],
      foto: "/placeholder.svg?height=80&width=80",
    },
  ],
  petshops: [
    {
      id: "1",
      nome: "PetShop Amigo Fiel",
      tipo: "petshop",
      endereco: "Rua das Flores, 123 - Centro",
      cidade: "São Paulo",
      telefone: "(11) 3333-4444",
      email: "contato@amigofiel.com",
      avaliacao: 4.8,
      especialidades: ["Banho e Tosa", "Veterinária", "Pet Shop"],
      foto: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "2",
      nome: "Clínica VetCare",
      tipo: "petshop",
      endereco: "Av. Paulista, 456 - Bela Vista",
      cidade: "São Paulo",
      telefone: "(11) 5555-6666",
      email: "atendimento@vetcare.com",
      avaliacao: 4.9,
      especialidades: ["Veterinária", "Cirurgia", "Emergência 24h"],
      foto: "/placeholder.svg?height=80&width=80",
    },
  ],
  fornecedores: [
    {
      id: "1",
      nome: "Distribuidora Pet Brasil",
      tipo: "fornecedor",
      endereco: "Rod. Anhanguera, km 25 - Osasco",
      cidade: "São Paulo",
      telefone: "(11) 4444-5555",
      email: "vendas@petbrasil.com",
      avaliacao: 4.7,
      especialidades: ["Ração", "Medicamentos", "Equipamentos"],
      foto: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "2",
      nome: "Mega Pet Suprimentos",
      tipo: "fornecedor",
      endereco: "Av. Industrial, 1500 - Guarulhos",
      cidade: "São Paulo",
      telefone: "(11) 6666-7777",
      email: "comercial@megapet.com",
      avaliacao: 4.5,
      especialidades: ["Brinquedos", "Acessórios", "Higiene"],
      foto: "/placeholder.svg?height=80&width=80",
    },
  ],
  empresas: [
    {
      id: "1",
      nome: "Corporação Pet Solutions",
      tipo: "empresa",
      endereco: "Av. Faria Lima, 2000 - Itaim Bibi",
      cidade: "São Paulo",
      telefone: "(11) 3000-9000",
      email: "contato@petsolutions.com.br",
      avaliacao: 4.8,
      especialidades: ["Soluções Corporativas", "Benefícios Pet", "Consultoria"],
      foto: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "2",
      nome: "Empresa Vida Animal Ltda",
      tipo: "empresa",
      endereco: "Rua Vergueiro, 3500 - Vila Mariana",
      cidade: "São Paulo",
      telefone: "(11) 2500-8000",
      email: "admin@vidaanimal.com.br",
      avaliacao: 4.6,
      especialidades: ["Planos de Saúde Pet", "Seguros", "Telemedicina"],
      foto: "/placeholder.svg?height=80&width=80",
    },
  ],
}

export default function BuscaPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tipoUsuario = searchParams.get("tipo") || "cliente"
  const [filtro, setFiltro] = useState("")
  const [usuariosFiltrados, setUsuariosFiltrados] = useState<any[]>([])

  // Define quais usuários cada tipo pode ver
  const getUsuariosPermitidos = () => {
    switch (tipoUsuario) {
      case "cliente":
      case "empresa":
        return usuariosData.petshops
      case "petshop":
        return usuariosData.fornecedores
      case "fornecedor":
        return usuariosData.petshops
      case "administrador":
        // Administrador pode ver todos os tipos
        return [
          ...usuariosData.clientes,
          ...usuariosData.petshops,
          ...usuariosData.fornecedores,
          ...usuariosData.empresas,
        ]
      default:
        return []
    }
  }

  const getTituloPage = () => {
    switch (tipoUsuario) {
      case "cliente":
        return "Buscar Petshops"
      case "empresa":
        return "Buscar Petshops Parceiros"
      case "petshop":
        return "Buscar Fornecedores"
      case "fornecedor":
        return "Buscar Petshops Clientes"
      case "administrador":
        return "Buscar Usuários"
      default:
        return "Buscar"
    }
  }

  const getPlaceholder = () => {
    switch (tipoUsuario) {
      case "cliente":
        return "Buscar petshops, clínicas, serviços..."
      case "empresa":
        return "Buscar petshops parceiros..."
      case "petshop":
        return "Buscar fornecedores, produtos..."
      case "fornecedor":
        return "Buscar petshops clientes..."
      case "administrador":
        return "Buscar clientes, petshops, fornecedores, empresas..."
      default:
        return "Buscar..."
    }
  }

  useEffect(() => {
    const usuarios = getUsuariosPermitidos()
    if (filtro.trim() === "") {
      setUsuariosFiltrados(usuarios)
    } else {
      const filtrados = usuarios.filter(
        (usuario) =>
          usuario.nome.toLowerCase().includes(filtro.toLowerCase()) ||
          usuario.endereco.toLowerCase().includes(filtro.toLowerCase()) ||
          usuario.especialidades.some((esp: string) => esp.toLowerCase().includes(filtro.toLowerCase())),
      )
      setUsuariosFiltrados(filtrados)
    }
  }, [filtro, tipoUsuario])

  const getIconeEspecialidade = (especialidade: string) => {
    if (especialidade.includes("Veterinária") || especialidade.includes("Cirurgia")) {
      return <PawPrint className="w-3 h-3" />
    }
    if (especialidade.includes("Pet Shop") || especialidade.includes("Ração") || especialidade.includes("Produtos")) {
      return <Package className="w-3 h-3" />
    }
    if (especialidade.includes("Cliente") || especialidade.includes("Pets")) {
      return <User className="w-3 h-3" />
    }
    if (especialidade.includes("Corporativas") || especialidade.includes("Empresa")) {
      return <Users className="w-3 h-3" />
    }
    return <Building className="w-3 h-3" />
  }

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case "cliente":
        return "bg-pink-100 text-pink-800"
      case "petshop":
        return "bg-blue-100 text-blue-800"
      case "fornecedor":
        return "bg-purple-100 text-purple-800"
      case "empresa":
        return "bg-indigo-100 text-indigo-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
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
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
                <Search className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-900">{getTituloPage()}</h1>
                <p className="text-sm text-gray-600">Encontre os melhores parceiros</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Campo de Busca */}
      <div className="px-6 py-6">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder={getPlaceholder()}
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="pl-12 h-14 text-lg border-0 bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl focus:ring-2 focus:ring-orange-400/20 focus:border-orange-400"
            />
          </div>
        </div>
      </div>

      {/* Resultados */}
      <main className="px-6 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <p className="text-gray-600">
              {usuariosFiltrados.length} resultado{usuariosFiltrados.length !== 1 ? "s" : ""} encontrado
              {usuariosFiltrados.length !== 1 ? "s" : ""}
              {filtro && ` para "${filtro}"`}
            </p>
          </div>

          <div className="space-y-4">
            {usuariosFiltrados.map((usuario) => (
              <Card
                key={usuario.id}
                className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl hover:shadow-xl transition-all duration-200 cursor-pointer group"
                onClick={() => {
                  // Aqui você pode implementar a navegação para o perfil do usuário
                  console.log("Clicou no usuário:", usuario.nome)
                }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Foto/Avatar */}
                    <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                      <Building className="w-10 h-10 text-white" />
                    </div>

                    {/* Informações */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                            {usuario.nome}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < Math.floor(usuario.avaliacao) ? "text-yellow-500 fill-current" : "text-gray-300"
                                  }`}
                                />
                              ))}
                              <span className="text-sm text-gray-600 ml-1">{usuario.avaliacao}</span>
                            </div>
                          </div>
                        </div>
                        <Badge className={`border-0 capitalize ${getTipoColor(usuario.tipo)}`}>{usuario.tipo}</Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <div>
                            <p className="text-sm">{usuario.endereco}</p>
                            <p className="text-xs text-gray-500">{usuario.cidade}</p>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Phone className="w-4 h-4" />
                            <span className="text-sm">{usuario.telefone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Mail className="w-4 h-4" />
                            <span className="text-sm">{usuario.email}</span>
                          </div>
                        </div>
                      </div>

                      {/* Especialidades */}
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Especialidades:</p>
                        <div className="flex flex-wrap gap-2">
                          {usuario.especialidades.map((especialidade: string, index: number) => (
                            <Badge key={index} className="bg-blue-100 text-blue-800 border-0 flex items-center gap-1">
                              {getIconeEspecialidade(especialidade)}
                              {especialidade}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {usuariosFiltrados.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhum resultado encontrado</h3>
              <p className="text-gray-600">
                Tente ajustar sua busca ou remover alguns filtros para encontrar mais resultados.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Botões Flutuantes */}
      <FloatingButtons />
    </div>
  )
}
