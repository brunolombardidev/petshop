"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Smartphone, Mail, ArrowLeft, Settings, Moon, Sun, Bell } from "lucide-react"
import { FloatingButtons } from "@/components/floating-buttons"

export default function ConfiguracoesPage() {
  const router = useRouter()
  const [settings, setSettings] = useState({
    modoEscuro: false,
    notificacoesPush: true,
    notificacoesEmail: true,
    notificacoesSMS: false,
  })

  // Aplicar modo escuro
  useEffect(() => {
    if (settings.modoEscuro) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [settings.modoEscuro])

  const handleSettingChange = (key: string, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D6DD83]/20 via-[#FFBDB6]/20 to-[#30B2B0]/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-blue-100 dark:border-gray-700 sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="hover:bg-[#D6DD83]/20 dark:hover:bg-gray-700 rounded-xl"
            >
              <ArrowLeft className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-bpet-primary to-bpet-secondary rounded-xl flex items-center justify-center shadow-lg">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-900 dark:text-white">Configurações</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Personalize sua experiência no app</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="px-6 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Aparência */}
          <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                {settings.modoEscuro ? (
                  <Moon className="w-5 h-5 text-[#145D5F]" />
                ) : (
                  <Sun className="w-5 h-5 text-[#D6DD83]" />
                )}
                Aparência
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Personalize a aparência do aplicativo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div className="flex items-center gap-3">
                  {settings.modoEscuro ? (
                    <Moon className="w-5 h-5 text-[#145D5F]" />
                  ) : (
                    <Sun className="w-5 h-5 text-[#D6DD83]" />
                  )}
                  <div>
                    <Label htmlFor="modo-escuro" className="text-base font-medium text-gray-900 dark:text-white">
                      Modo Escuro
                    </Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {settings.modoEscuro ? "Interface escura ativada" : "Interface clara ativada"}
                    </p>
                  </div>
                </div>
                <Switch
                  id="modo-escuro"
                  checked={settings.modoEscuro}
                  onCheckedChange={(checked) => handleSettingChange("modoEscuro", checked)}
                />
              </div>

              {settings.modoEscuro && (
                <div className="p-4 bg-[#145D5F] text-white rounded-xl">
                  <p className="text-sm">
                    🌙 <strong>Modo Escuro Ativado!</strong> A interface será exibida com cores escuras para reduzir o
                    cansaço visual.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Notificações */}
          <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Bell className="w-5 h-5 text-blue-500" />
                Notificações
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Configure como você deseja receber notificações
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-[#30B2B0]" />
                  <div>
                    <Label htmlFor="notif-push" className="text-base font-medium text-gray-900 dark:text-white">
                      Notificações Push
                    </Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Receba notificações no dispositivo</p>
                  </div>
                </div>
                <Switch
                  id="notif-push"
                  checked={settings.notificacoesPush}
                  onCheckedChange={(checked) => handleSettingChange("notificacoesPush", checked)}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#145D5F]" />
                  <div>
                    <Label htmlFor="notif-email" className="text-base font-medium text-gray-900 dark:text-white">
                      Notificações por E-mail
                    </Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Receba notificações por e-mail</p>
                  </div>
                </div>
                <Switch
                  id="notif-email"
                  checked={settings.notificacoesEmail}
                  onCheckedChange={(checked) => handleSettingChange("notificacoesEmail", checked)}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-[#FFBDB6]" />
                  <div>
                    <Label htmlFor="notif-sms" className="text-base font-medium text-gray-900 dark:text-white">
                      Notificações por SMS
                    </Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Receba notificações por mensagem de texto
                    </p>
                  </div>
                </div>
                <Switch
                  id="notif-sms"
                  checked={settings.notificacoesSMS}
                  onCheckedChange={(checked) => handleSettingChange("notificacoesSMS", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Informações do App */}
          <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Sobre o App</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex justify-between">
                  <span>Versão:</span>
                  <span className="font-medium">1.0.0</span>
                </div>
                <div className="flex justify-between">
                  <span>Última atualização:</span>
                  <span className="font-medium">15/01/2024</span>
                </div>
                <div className="flex justify-between">
                  <span>Desenvolvido por:</span>
                  <span className="font-medium">PetShop App Team</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Botões Flutuantes */}
      <FloatingButtons />
    </div>
  )
}
