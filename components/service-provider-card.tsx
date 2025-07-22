"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, MapPin, Clock, Heart, Eye, ShoppingCart, Verified, Building, User } from "lucide-react"
import type { ServiceProvider } from "@/types/service"
import { useServiceFavorites } from "@/hooks/use-services"

interface ServiceProviderCardProps {
  provider: ServiceProvider
  onViewProfile: (provider: ServiceProvider) => void
  onContractService: (provider: ServiceProvider) => void
  showContractButton?: boolean
}

export function ServiceProviderCard({
  provider,
  onViewProfile,
  onContractService,
  showContractButton = true,
}: ServiceProviderCardProps) {
  const { addToFavorites, removeFromFavorites, checkIsFavorite } = useServiceFavorites()
  const [isFavorite, setIsFavorite] = useState(false)
  const [favoriteLoading, setFavoriteLoading] = useState(false)

  // Verificar se é favorito ao carregar
  useState(() => {
    checkIsFavorite(provider.id, provider.tipo).then(setIsFavorite)
  })

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation()
    setFavoriteLoading(true)

    try {
      if (isFavorite) {
        await removeFromFavorites(provider.id, provider.tipo)
        setIsFavorite(false)
      } else {
        await addToFavorites(provider.id, provider.tipo)
        setIsFavorite(true)
      }
    } catch (error) {
      console.error("Erro ao alterar favorito:", error)
    } finally {
      setFavoriteLoading(false)
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ))
  }

  const getProviderTypeLabel = (tipo: string) => {
    switch (tipo) {
      case "petshop":
        return "Pet Shop"
      case "fornecedor":
        return "Fornecedor"
      default:
        return tipo
    }
  }

  const getProviderTypeIcon = (tipo: string) => {
    switch (tipo) {
      case "petshop":
        return <Building className="w-4 h-4" />
      case "fornecedor":
        return <User className="w-4 h-4" />
      default:
        return <Building className="w-4 h-4" />
    }
  }

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl hover:shadow-xl transition-all duration-200 group">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          {/* Avatar do Provedor */}
          <div className="relative">
            <Avatar className="w-16 h-16">
              <AvatarImage src={provider.foto || "/placeholder.svg"} alt={provider.nome} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-lg">
                {provider.nome.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            {/* Badge de Verificação */}
            {provider.verificado && (
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <Verified className="w-3 h-3 text-white" />
              </div>
            )}
          </div>

          {/* Informações do Provedor */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                  {provider.nome}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    {getProviderTypeIcon(provider.tipo)}
                    <span className="ml-1">{getProviderTypeLabel(provider.tipo)}</span>
                  </Badge>
                  {!provider.ativo && (
                    <Badge variant="secondary" className="text-xs">
                      Inativo
                    </Badge>
                  )}
                </div>
              </div>

              {/* Botão de Favorito */}
              <Button
                size="sm"
                variant="ghost"
                onClick={handleToggleFavorite}
                disabled={favoriteLoading}
                className="p-2 hover:bg-red-50 rounded-xl"
              >
                <Heart className={`w-4 h-4 ${isFavorite ? "text-red-500 fill-current" : "text-gray-400"}`} />
              </Button>
            </div>

            {/* Avaliação */}
            {provider.avaliacao && (
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">{renderStars(provider.avaliacao)}</div>
                <span className="text-sm font-medium text-gray-700">{provider.avaliacao.toFixed(1)}</span>
                {provider.totalAvaliacoes && (
                  <span className="text-xs text-gray-500">({provider.totalAvaliacoes} avaliações)</span>
                )}
              </div>
            )}

            {/* Localização */}
            {(provider.cidade || provider.estado) && (
              <div className="flex items-center gap-1 text-gray-600 mb-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">
                  {provider.cidade}
                  {provider.cidade && provider.estado && ", "}
                  {provider.estado}
                </span>
              </div>
            )}

            {/* Especialidades */}
            {provider.especialidades && provider.especialidades.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {provider.especialidades.slice(0, 3).map((especialidade, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {especialidade}
                  </Badge>
                ))}
                {provider.especialidades.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{provider.especialidades.length - 3} mais
                  </Badge>
                )}
              </div>
            )}

            {/* Horário de Funcionamento */}
            {provider.horarioFuncionamento && (
              <div className="flex items-center gap-1 text-gray-600 mb-3">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{provider.horarioFuncionamento}</span>
              </div>
            )}

            {/* Serviços Disponíveis */}
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                <strong>{provider.servicos.length}</strong> serviço{provider.servicos.length !== 1 ? "s" : ""}{" "}
                disponível{provider.servicos.length !== 1 ? "eis" : ""}
              </p>

              {/* Mostrar alguns serviços */}
              {provider.servicos.length > 0 && (
                <div className="mt-2 space-y-1">
                  {provider.servicos.slice(0, 2).map((servico) => (
                    <div key={servico.id} className="flex justify-between items-center text-sm">
                      <span className="text-gray-700 truncate">{servico.nome}</span>
                      <span className="text-green-600 font-medium ml-2">R$ {servico.preco.toFixed(2)}</span>
                    </div>
                  ))}
                  {provider.servicos.length > 2 && (
                    <p className="text-xs text-gray-500">+{provider.servicos.length - 2} outros serviços</p>
                  )}
                </div>
              )}
            </div>

            {/* Ações */}
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onViewProfile(provider)}
                className="flex-1 border-2 border-gray-200 hover:bg-gray-50 rounded-xl"
              >
                <Eye className="w-4 h-4 mr-1" />
                Ver Perfil
              </Button>

              {showContractButton && provider.ativo && provider.servicos.length > 0 && (
                <Button
                  size="sm"
                  onClick={() => onContractService(provider)}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl"
                >
                  <ShoppingCart className="w-4 h-4 mr-1" />
                  Contratar
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
