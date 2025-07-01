"use client"

import { Button } from "@/components/ui/button"
import { PawPrint, Bell, Menu } from "lucide-react"

interface UnifiedHeaderProps {
  onNotificationsClick: () => void
  onMenuClick: () => void
}

export function UnifiedHeader({ onNotificationsClick, onMenuClick }: UnifiedHeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-orange-100 sticky top-0 z-40">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
            <PawPrint className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
            B-Pet
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-orange-100 rounded-xl relative"
            onClick={onNotificationsClick}
          >
            <Bell className="h-5 w-5 text-gray-700" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-orange-100 rounded-xl relative" onClick={onMenuClick}>
            <Menu className="h-5 w-5 text-gray-700" />
          </Button>
        </div>
      </div>
    </header>
  )
}
