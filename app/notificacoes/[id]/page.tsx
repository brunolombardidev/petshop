"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Bell, AlertTriangle, Info, CheckCircle, Clock, ExternalLink } from "lucide-react"
import { FloatingButtons } from "@/components/floating-buttons"
import { NotificationService } from "@/services/notification.service"
import type { Notification } from "@/types/api"
import { toast } from "@/hooks/use-toast"

export default function NotificationDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [notification, setNotification] = useState<Notification | null>(null)
  const [loading, setLoading] = useState(true)

  // Carregar detalhes da notificação
  const loadNotification = async () => {
    try {
      setLoading(true)
      const data = await NotificationService.getNotificationById(params.id as string)
      setNotification(data)

      // Marcar como lida se não estiver
      if (!data.is_read) {
        await NotificationService.markAsRead(data.id)
        setNotification((prev) => (prev ? { ...prev, is_read: true, read_at: new Date().toISOString() } : null))
      }
    } catch (error) {
      console.error("Erro ao carregar notificação:", error)
      toast({
        title: "Erro",
        description: "Não foi possível carregar a notificação",
        variant: "destructive",
      })
      router.back()
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (params.id) {
      loadNotification()
    }
  }, [params.id])

  const getPrioridadeIcon = (type: string) => {
    switch (type) {
      case "error":
        return <AlertTriangle className="w-6 h-6 text-red-500" />
      case "warning":
        return <Info className="w-6 h-6 text-yellow-500" />
      case "success":
        return <CheckCircle className="w-6 h-6 text-green-500" />
      default:
        return <Bell className="w-6 h-6 text-blue-500" />
    }
  }

  const getPrioridadeBadge = (type: string) => {
    switch (type) {
      case "error":
        return (
          <Badge variant="destructive" className="bg-red-100 text-red-800">
            Erro
          </Badge>
        )
      case "warning":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Aviso
          </Badge>
        )
      case "success":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Sucesso
          </Badge>
        )
      default:
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            Info
          </Badge>
        )
    }
  }

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-amber-50/30 to-yellow-50/50">
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
                  <Bell className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-xl text-gray-900">Notificação</h1>
                  <p className="text-sm text-gray-600">Carregando...</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="px-6 py-8">
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardContent className="p-8">
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  if (!notification) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-amber-50/30 to-yellow-50/50 flex items-center justify-center">
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
          <CardContent className="text-center p-12">
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Notificação não encontrada</h3>
            <p className="text-gray-600 mb-6">A notificação que você está procurando não existe ou foi removida.</p>
            <Button onClick={() => router.back()}>Voltar</Button>
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
                {getPrioridadeIcon(notification.type)}
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-900">Notificação</h1>
                <p className="text-sm text-gray-600">Detalhes da notificação</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm rounded-2xl">
            <CardContent className="p-8">
              {/* Cabeçalho da Notificação */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  {getPrioridadeIcon(notification.type)}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{notification.title}</h2>
                    {notification.protocol && <p className="text-sm text-gray-500">{notification.protocol}</p>}
                  </div>
                </div>
                {getPrioridadeBadge(notification.type)}
              </div>

              {/* Conteúdo da Notificação */}
              <div className="mb-8">
                <div className="prose max-w-none">
                  <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">{notification.message}</p>
                </div>
              </div>

              {/* Informações Adicionais */}
              <div className="border-t border-gray-200 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Data de Criação</h4>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      {formatDateTime(notification.created_at)}
                    </div>
                  </div>

                  {notification.read_at && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Lida em</h4>
                      <div className="flex items-center gap-2 text-gray-600">
                        <CheckCircle className="w-4 h-4" />
                        {formatDateTime(notification.read_at)}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Ação da Notificação */}
              {notification.action_url && (
                <div className="border-t border-gray-200 pt-6 mt-6">
                  <Button
                    onClick={() => router.push(notification.action_url!)}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Ver Detalhes
                  </Button>
                </div>
              )}
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
