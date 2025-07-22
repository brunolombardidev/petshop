"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Bell, Menu, Search } from "lucide-react"
import Image from "next/image"

export interface UnifiedHeaderProps {
  user: {
    name: string
    email: string
    avatar?: string
    userType: "cliente" | "petshop" | "fornecedor" | "empresa" | "administrador"
  }
  onNotificationsClick?: () => void
  onMenuClick?: () => void
  onSearchClick?: () => void
  showSearch?: boolean
  title?: string
  subtitle?: string
}

export function UnifiedHeader({
  user,
  onNotificationsClick,
  onMenuClick,
  onSearchClick,
  showSearch = true,
  title,
  subtitle,
}: UnifiedHeaderProps) {
  const [notificationCount] = useState(3)

  const getUserTypeBadge = (userType: string) => {
    const badges = {
      cliente: { label: "Cliente", color: "bg-blue-100 text-blue-800" },
      petshop: { label: "Petshop", color: "bg-purple-100 text-purple-800" },
      fornecedor: { label: "Fornecedor", color: "bg-green-100 text-green-800" },
      empresa: { label: "Empresa", color: "bg-orange-100 text-orange-800" },
      administrador: { label: "Admin", color: "bg-red-100 text-red-800" },
    }

    const badge = badges[userType as keyof typeof badges] || badges.cliente
    return <Badge className={`${badge.color} border-0 text-xs`}>{badge.label}</Badge>
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 md:px-6 py-3">
        {/* Logo e Título */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <Image src="/bpet-logo.png" alt="B-Pet" width={40} height={40} className="object-contain" />
            {title && (
              <div className="hidden md:block">
                <h1 className="font-bold text-lg text-gray-900">{title}</h1>
                {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
              </div>
            )}
          </div>
        </div>

        {/* Ações do Header */}
        <div className="flex items-center gap-3">
          {/* Busca */}
          {showSearch && (
            <Button variant="ghost" size="icon" className="hover:bg-gray-100 rounded-xl" onClick={onSearchClick}>
              <Search className="h-5 w-5 text-gray-600" />
            </Button>
          )}

          {/* Notificações */}
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-gray-100 rounded-xl relative"
            onClick={onNotificationsClick}
          >
            <Bell className="h-5 w-5 text-gray-600" />
            {notificationCount > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-medium">
                  {notificationCount > 9 ? "9+" : notificationCount}
                </span>
              </div>
            )}
          </Button>

          {/* Perfil do Usuário */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block text-right">
              <p className="font-medium text-gray-900 text-sm">{user.name}</p>
              <div className="flex items-center justify-end gap-2">
                <p className="text-xs text-gray-600">{user.email}</p>
                {getUserTypeBadge(user.userType)}
              </div>
            </div>

            <Avatar className="w-10 h-10 border-2 border-gray-200">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Menu Mobile */}
          <Button variant="ghost" size="icon" className="md:hidden hover:bg-gray-100 rounded-xl" onClick={onMenuClick}>
            <Menu className="h-5 w-5 text-gray-600" />
          </Button>
        </div>
      </div>
    </header>
  )
}
