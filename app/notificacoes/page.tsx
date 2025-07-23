"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Bell, AlertTriangle, Info, CheckCircle, Clock, ChevronRight } from "lucide-react"
import { FloatingButtons } from "@/components/floating-buttons"
import { NotificationService } from "@/services/notification.service"
import type { Notification, PaginatedResponse } from "@/types/api"
import { toast } from "@/hooks/use-toast"

export default function NotificacoesPage() {
  const router = useRouter()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [markingAllAsRead, setMarkingAllAsRead] = useState(false)
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
    total: 0,
  })

  // Carregar notificações
  const loadNotifications = async (page = 1) => {
    try {
      setLoading(true)
      const response: PaginatedResponse<Notification> = await NotificationService.getMyNotifications({
        page,
        per_page: 20,
      })

      setNotifications(response.data)
      setPagination({
        current_page: response.current_page,
        total_pages: response.last_page,
        total: response.total,
      })
    } catch (error) {
      console.error("Erro ao carregar notificações:", error)
      toast({
        title: "Erro",
        description: "Não foi possível carregar as notificações",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Marcar todas como lidas
  const handleMarkAllAsRead = async () => {
    try {
      setMarkingAllAsRead(true)
      await NotificationService.markAllAsRead()

      // Atualizar estado local
      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          is_read: true,
          read_at: new Date().toISOString(),
        })),
      )

      toast({
        title: "Sucesso",
        description: "Todas as notificações foram marcadas como lidas",
      })
    } catch (error) {
      console.error("Erro ao marcar todas como lidas:", error)
      toast({
        title: "Erro",
        description: "Não foi possível marcar as notificações como lidas",
        variant: "destructive",
      })
    } finally {
      setMarkingAllAsRead(false)
    }
  }

  // Marcar notificação como lida ao clicar
  const handleNotificationClick = async (notification: Notification) => {
    try {
      if (!notification.is_read) {
        await NotificationService.markAsRead(notification.id)

        // Atualizar estado local
        setNotifications((prev) =>
          prev.map((n) => (n.id === notification.id ? { ...n, is_read: true, read_at: new Date().toISOString() } : n)),
        )
      }

      // Navegar para detalhes se houver action_url
      if (notification.action_url) {
        router.push(notification.action_url)
      } else {
        router.push(`/notificacoes/${notification.id}`)
      }
    } catch (error) {
      console.error("Erro ao marcar notificação como lida:", error)
    }
  }

  // Carregar notificações ao montar o componente
  useEffect(() => {
    loadNotifications()
  }, [])

  const getPrioridadeIcon = (type: string) => {
    switch (type) {
      case "error":
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      case "warning":
        return <Info className="w-4 h-4 text-yellow-500" />
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      default:
        return <Bell className="w-4 h-4 text-blue-500" />
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

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Agora"
    if (diffInMinutes < 60) return `${diffInMinutes} min atrás`

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h atrás`

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d atrás`

    return date.toLocaleDateString("pt-BR")
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
                  <h1 className="font-bold text-xl text-gray-900">Notificações</h1>
                  <p className="text-sm text-gray-600">Carregando...</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="px-6 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Card key={i} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl">
                  <CardContent className="p-6">
                    <div className="animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                      <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
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
                <Bell className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-900">Notificações</h1>
                <p className="text-sm text-gray-600">
                  {pagination.total} {pagination.total === 1 ? "notificação" : "notificações"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Botão Marcar Todas como Lidas */}
      {notifications.some((n) => !n.is_read) && (
        <div className="px-6 py-6">
          <div className="max-w-4xl mx-auto">
            <Button
              onClick={handleMarkAllAsRead}
              disabled={markingAllAsRead}
              className="h-14 px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              {markingAllAsRead ? "Marcando..." : "Marcar Todas como Lidas"}
            </Button>
          </div>
        </div>
      )}

      {/* Conteúdo Principal */}
      <main className="px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Lista de Notificações */}
          <div className="space-y-4">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`border-0 shadow-lg backdrop-blur-sm rounded-2xl cursor-pointer hover:shadow-xl transition-all duration-200 group ${
                    notification.is_read ? "bg-white/60" : "bg-white/90"
                  }`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {getPrioridadeIcon(notification.type)}
                        <div className="flex-1">
                          <h3
                            className={`font-bold text-lg group-hover:text-blue-600 transition-colors ${
                              notification.is_read ? "text-gray-600" : "text-gray-900"
                            }`}
                          >
                            {notification.title}
                          </h3>
                          {notification.protocol && <p className="text-sm text-gray-500">{notification.protocol}</p>}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {!notification.is_read && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                      </div>
                    </div>

                    <p className={`mb-4 line-clamp-2 ${notification.is_read ? "text-gray-600" : "text-gray-700"}`}>
                      {notification.message}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">{getPrioridadeBadge(notification.type)}</div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        {formatTimeAgo(notification.created_at)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
                <CardContent className="text-center p-12">
                  <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Nenhuma notificação</h3>
                  <p className="text-gray-600 mb-6">Você está em dia! Não há notificações no momento.</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Paginação */}
          {pagination.total_pages > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              <Button
                variant="outline"
                onClick={() => loadNotifications(pagination.current_page - 1)}
                disabled={pagination.current_page === 1}
              >
                Anterior
              </Button>
              <span className="flex items-center px-4 text-sm text-gray-600">
                Página {pagination.current_page} de {pagination.total_pages}
              </span>
              <Button
                variant="outline"
                onClick={() => loadNotifications(pagination.current_page + 1)}
                disabled={pagination.current_page === pagination.total_pages}
              >
                Próxima
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Botões Flutuantes */}
      <FloatingButtons />
      {/* Espaçamento para botões flutuantes */}
      <div className="pb-20"></div>
    </div>
  )
}
