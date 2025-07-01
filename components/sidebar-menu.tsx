"use client"
import { Button } from "@/components/ui/button"
import { X, User, BarChart3, MessageSquare, Settings, Crown, UserPlus, LogOut, Heart } from "lucide-react"
import { useRouter } from "next/navigation"

interface SidebarMenuProps {
  isOpen: boolean
  onClose: () => void
  userType: "cliente" | "petshop" | "fornecedor" | "empresa" | "administrador"
}

export function SidebarMenu({ isOpen, onClose, userType }: SidebarMenuProps) {
  const router = useRouter()

  const handleProfileClick = () => {
    // Redireciona para o perfil unificado
    router.push("/perfil")
    onClose()
  }

  const handleIndicationsClick = () => {
    router.push("/indicacoes")
    onClose()
  }

  const handleCampaignsClick = () => {
    router.push("/campanhas")
    onClose()
  }

  const handleReportsClick = () => {
    router.push("/relatorios")
    onClose()
  }

  const handleFeedbackClick = () => {
    router.push("/feedback")
    onClose()
  }

  const handleSettingsClick = () => {
    router.push("/configuracoes")
    onClose()
  }

  const handleLogout = () => {
    // Redireciona para a página de login
    router.push("/")
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-[9998] transition-opacity duration-300" onClick={onClose} />

      {/* Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-[220px] max-w-[220px] bg-white shadow-2xl z-[9999] transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header do Menu */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Menu</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-gray-100 rounded-xl">
            <X className="h-6 w-6 text-gray-700" />
          </Button>
        </div>

        {/* Menu Items */}
        <div className="p-6 space-y-2">
          <Button
            onClick={handleProfileClick}
            variant="ghost"
            className="w-full justify-start h-12 text-left hover:bg-orange-50 rounded-xl"
          >
            <User className="h-5 w-5 mr-3 text-gray-600" />
            <span className="text-gray-900 font-medium">Ver Perfil</span>
          </Button>

          <Button
            onClick={() => {
              router.push("/assinatura")
              onClose()
            }}
            variant="ghost"
            className="w-full justify-start h-12 text-left hover:bg-orange-50 rounded-xl"
          >
            <Crown className="h-5 w-5 mr-3 text-gray-600" />
            <span className="text-gray-900 font-medium">Assinatura</span>
          </Button>

          <Button
            onClick={handleIndicationsClick}
            variant="ghost"
            className="w-full justify-start h-12 text-left hover:bg-orange-50 rounded-xl"
          >
            <UserPlus className="h-5 w-5 mr-3 text-gray-600" />
            <span className="text-gray-900 font-medium">Indicações</span>
          </Button>

          <Button
            onClick={handleCampaignsClick}
            variant="ghost"
            className="w-full justify-start h-12 text-left hover:bg-orange-50 rounded-xl"
          >
            <Heart className="h-5 w-5 mr-3 text-gray-600" />
            <span className="text-gray-900 font-medium">Campanhas</span>
          </Button>

          <Button
            onClick={handleFeedbackClick}
            variant="ghost"
            className="w-full justify-start h-12 text-left hover:bg-orange-50 rounded-xl"
          >
            <MessageSquare className="h-5 w-5 mr-3 text-gray-600" />
            <span className="text-gray-900 font-medium">Feedback</span>
          </Button>

          <Button
            onClick={handleReportsClick}
            variant="ghost"
            className="w-full justify-start h-12 text-left hover:bg-orange-50 rounded-xl"
          >
            <BarChart3 className="h-5 w-5 mr-3 text-gray-600" />
            <span className="text-gray-900 font-medium">Relatórios</span>
          </Button>

          <Button
            onClick={handleSettingsClick}
            variant="ghost"
            className="w-full justify-start h-12 text-left hover:bg-orange-50 rounded-xl"
          >
            <Settings className="h-5 w-5 mr-3 text-gray-600" />
            <span className="text-gray-900 font-medium">Configurações</span>
          </Button>

          {/* Separador */}
          <div className="border-t border-gray-200 my-3"></div>

          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full justify-start h-12 text-left hover:bg-red-50 rounded-xl group"
          >
            <LogOut className="h-5 w-5 mr-3 text-gray-600 group-hover:text-red-600" />
            <span className="text-gray-900 font-medium group-hover:text-red-600">Sair</span>
          </Button>
        </div>
      </div>
    </>
  )
}
