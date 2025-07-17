"use client"

import { Button } from "@/components/ui/button"
import { Bell, Menu } from "lucide-react"
import Image from "next/image"

interface UnifiedHeaderProps {
  onNotificationsClick: () => void
  onMenuClick: () => void
}

export function UnifiedHeader({ onNotificationsClick, onMenuClick }: UnifiedHeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-bpet-secondary/20 sticky top-0 z-40">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <Image src="/bpet-logo.png" alt="B-Pet" width={40} height={40} className="object-contain" />
          <span className="font-bold text-xl text-bpet-primary">B-Pet</span>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-bpet-secondary/10 rounded-xl relative"
            onClick={onNotificationsClick}
          >
            <Bell className="h-5 w-5 text-bpet-primary" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-bpet-soft rounded-full"></div>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-bpet-secondary/10 rounded-xl relative"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5 text-bpet-primary" />
          </Button>
        </div>
      </div>
    </header>
  )
}
