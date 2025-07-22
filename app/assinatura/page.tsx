"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Check,
  X,
  Plus,
  Edit,
  Trash2,
  Download,
  CreditCard,
  Users,
  TrendingUp,
  AlertCircle,
  Star,
  FileText,
  DollarSign,
} from "lucide-react"
import { UnifiedHeader } from "@/components/unified-header"
import { useAuth } from "@/hooks/use-auth"
import { useSubscription, usePlans, useInvoices, useSubscriptionStats } from "@/hooks/use-subscription"
import { SubscriptionService, type Plan } from "@/services/subscription.service"
import { toast } from "@/hooks/use-toast"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export default function AssinaturaPage() {
  const { user } = useAuth()
  const {
    subscription,
    loading: subscriptionLoading,
    changePlan,
    cancelSubscription,
    reactivateSubscription,
    createSubscription,
  } = useSubscription()
  const { plans, loading: plansLoading, createPlan, updatePlan, deletePlan, togglePlanStatus } = usePlans()
  const { invoices, loading: invoicesLoading, downloadInvoice } = useInvoices()
  const { stats, loading: statsLoading } = useSubscriptionStats()

  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const [isCreatePlanOpen, setIsCreatePlanOpen] = useState(false)
  const [isEditPlanOpen, setIsEditPlanOpen] = useState(false)
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null)
  const [canChangePlan, setCanChangePlan] = useState({ canChange: true, reason: "", nextChangeDate: "" })

  const isAdmin = user?.role === "admin"

  // Verificar se pode alterar plano
  useEffect(() => {
    if (subscription && !isAdmin) {
      SubscriptionService.canChangePlan()
        .then(setCanChangePlan)
        .catch(() => {})
    }
  }, [subscription, isAdmin])

  const handleCreateSubscription = async (planId: string) => {
    try {
      await createSubscription(planId)
    } catch (error) {
      // Error já tratado no hook
    }
  }

  const handleChangePlan = async (newPlanId: string) => {
    if (!canChangePlan.canChange) {
      toast({
        title: "Não é possível alterar o plano",
        description: canChangePlan.reason,
        variant: "destructive",
      })
      return
    }

    try {
      await changePlan(newPlanId)
    } catch (error) {
      // Error já tratado no hook
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const formatDate = (date: string) => {
    return format(new Date(date), "dd/MM/yyyy", { locale: ptBR })
  }

  const getStatusBadge = (status: string) => {
    const statusMap = {
      active: { label: "Ativo", color: "bg-green-100 text-green-800" },
      cancelled: { label: "Cancelado", color: "bg-red-100 text-red-800" },
      expired: { label: "Expirado", color: "bg-gray-100 text-gray-800" },
      pending: { label: "Pendente", color: "bg-yellow-100 text-yellow-800" },
      paid: { label: "Pago", color: "bg-green-100 text-green-800" },
      failed: { label: "Falhou", color: "bg-red-100 text-red-800" },
    }

    const statusInfo = statusMap[status as keyof typeof statusMap] || statusMap.pending
    return <Badge className={`${statusInfo.color} border-0`}>{statusInfo.label}</Badge>
  }

  // Componente para criar/editar plano
  const PlanForm = ({
    plan,
    onSave,
    onClose,
  }: { plan?: Plan | null; onSave: (planData: any) => void; onClose: () => void }) => {
    const [formData, setFormData] = useState({
      name: plan?.name || "",
      description: plan?.description || "",
      price: plan?.price || 0,
      duration: plan?.duration || 30,
      features: plan?.features?.join("\n") || "",
      isActive: plan?.isActive ?? true,
      isPopular: plan?.isPopular || false,
      maxUsers: plan?.maxUsers || 0,
      maxPets: plan?.maxPets || 0,
      maxServices: plan?.maxServices || 0,
    })

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      onSave({
        ...formData,
        features: formData.features.split("\n").filter((f) => f.trim()),
        maxUsers: formData.maxUsers || undefined,
        maxPets: formData.maxPets || undefined,
        maxServices: formData.maxServices || undefined,
      })
      onClose()
    }

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Nome do Plano</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="price">Preço (R$)</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number.parseFloat(e.target.value) })}
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="duration">Duração (dias)</Label>
            <Input
              id="duration"
              type="number"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: Number.parseInt(e.target.value) })}
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
              <Label htmlFor="isActive">Plano Ativo</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="isPopular"
                checked={formData.isPopular}
                onCheckedChange={(checked) => setFormData({ ...formData, isPopular: checked })}
              />
              <Label htmlFor="isPopular">Plano Popular</Label>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="maxUsers">Máx. Usuários</Label>
            <Input
              id="maxUsers"
              type="number"
              value={formData.maxUsers}
              onChange={(e) => setFormData({ ...formData, maxUsers: Number.parseInt(e.target.value) })}
              placeholder="Ilimitado"
            />
          </div>
          <div>
            <Label htmlFor="maxPets">Máx. Pets</Label>
            <Input
              id="maxPets"
              type="number"
              value={formData.maxPets}
              onChange={(e) => setFormData({ ...formData, maxPets: Number.parseInt(e.target.value) })}
              placeholder="Ilimitado"
            />
          </div>
          <div>
            <Label htmlFor="maxServices">Máx. Serviços</Label>
            <Input
              id="maxServices"
              type="number"
              value={formData.maxServices}
              onChange={(e) => setFormData({ ...formData, maxServices: Number.parseInt(e.target.value) })}
              placeholder="Ilimitado"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="features">Recursos (um por linha)</Label>
          <Textarea
            id="features"
            value={formData.features}
            onChange={(e) => setFormData({ ...formData, features: e.target.value })}
            rows={5}
            placeholder="Recurso 1&#10;Recurso 2&#10;Recurso 3"
          />
        </div>

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">{plan ? "Atualizar" : "Criar"} Plano</Button>
        </div>
      </form>
    )
  }

  if (!user) {
    return <div>Carregando...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <UnifiedHeader
        user={{
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          userType: user.role as any,
        }}
        title="Assinaturas"
        subtitle="Gerencie planos e assinaturas"
      />

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue={isAdmin ? "stats" : "my-subscription"} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            {isAdmin && <TabsTrigger value="stats">Estatísticas</TabsTrigger>}
            <TabsTrigger value="my-subscription">Minha Assinatura</TabsTrigger>
            <TabsTrigger value="plans">Planos</TabsTrigger>
            <TabsTrigger value="invoices">Faturas</TabsTrigger>
          </TabsList>

          {/* Estatísticas (Admin) */}
          {isAdmin && (
            <TabsContent value="stats" className="space-y-6">
              {statsLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {[...Array(4)].map((_, i) => (
                    <Card key={i}>
                      <CardContent className="p-6">
                        <Skeleton className="h-4 w-20 mb-2" />
                        <Skeleton className="h-8 w-16" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : stats ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">Total de Assinaturas</p>
                            <p className="text-2xl font-bold">{stats.totalSubscriptions}</p>
                          </div>
                          <Users className="h-8 w-8 text-blue-600" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">Assinaturas Ativas</p>
                            <p className="text-2xl font-bold text-green-600">{stats.activeSubscriptions}</p>
                          </div>
                          <Check className="h-8 w-8 text-green-600" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">Receita Total</p>
                            <p className="text-2xl font-bold text-green-600">{formatCurrency(stats.totalRevenue)}</p>
                          </div>
                          <DollarSign className="h-8 w-8 text-green-600" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">Receita Mensal</p>
                            <p className="text-2xl font-bold text-blue-600">{formatCurrency(stats.monthlyRevenue)}</p>
                          </div>
                          <TrendingUp className="h-8 w-8 text-blue-600" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Distribuição de Planos</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {stats.planDistribution.map((plan, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-4 h-4 bg-blue-600 rounded-full" />
                              <span className="font-medium">{plan.planName}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <span className="text-sm text-gray-600">{plan.count} assinaturas</span>
                              <Badge variant="outline">{plan.percentage.toFixed(1)}%</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Erro ao carregar estatísticas</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          )}

          {/* Minha Assinatura */}
          <TabsContent value="my-subscription" className="space-y-6">
            {subscriptionLoading ? (
              <Card>
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-48 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
              </Card>
            ) : subscription ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {subscription.plan?.name}
                        {subscription.plan?.isPopular && <Star className="h-5 w-5 text-yellow-500" />}
                      </CardTitle>
                      <CardDescription>{subscription.plan?.description}</CardDescription>
                    </div>
                    {getStatusBadge(subscription.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Preço</p>
                      <p className="text-lg font-bold">{formatCurrency(subscription.price)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Início</p>
                      <p className="text-lg">{formatDate(subscription.startDate)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Vencimento</p>
                      <p className="text-lg">{formatDate(subscription.endDate)}</p>
                    </div>
                  </div>

                  {subscription.plan?.features && (
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-2">Recursos Inclusos</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {subscription.plan.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-600" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 pt-4">
                    {subscription.status === "active" ? (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive">Cancelar Assinatura</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Cancelar Assinatura</AlertDialogTitle>
                            <AlertDialogDescription>
                              Tem certeza que deseja cancelar sua assinatura? Você perderá acesso aos recursos premium.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Não, manter</AlertDialogCancel>
                            <AlertDialogAction onClick={() => cancelSubscription()}>Sim, cancelar</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    ) : (
                      <Button onClick={() => reactivateSubscription()}>Reativar Assinatura</Button>
                    )}
                  </div>

                  {!canChangePlan.canChange && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-yellow-600" />
                        <p className="text-sm text-yellow-800">
                          {canChangePlan.reason}
                          {canChangePlan.nextChangeDate && (
                            <span className="block mt-1">
                              Próxima alteração disponível em: {formatDate(canChangePlan.nextChangeDate)}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Nenhuma assinatura ativa</h3>
                  <p className="text-gray-600 mb-4">Escolha um plano para começar a usar todos os recursos.</p>
                  <Button onClick={() => document.querySelector('[data-value="plans"]')?.click()}>
                    Ver Planos Disponíveis
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Planos */}
          <TabsContent value="plans" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Planos Disponíveis</h2>
                <p className="text-gray-600">Escolha o plano ideal para suas necessidades</p>
              </div>
              {isAdmin && (
                <Dialog open={isCreatePlanOpen} onOpenChange={setIsCreatePlanOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Criar Plano
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Criar Novo Plano</DialogTitle>
                      <DialogDescription>Preencha os dados do novo plano de assinatura</DialogDescription>
                    </DialogHeader>
                    <PlanForm onSave={createPlan} onClose={() => setIsCreatePlanOpen(false)} />
                  </DialogContent>
                </Dialog>
              )}
            </div>

            {plansLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <Card key={i}>
                    <CardContent className="p-6">
                      <Skeleton className="h-6 w-32 mb-2" />
                      <Skeleton className="h-4 w-full mb-4" />
                      <Skeleton className="h-8 w-20 mb-4" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans
                  .filter((plan) => plan.isActive || isAdmin)
                  .map((plan) => (
                    <Card key={plan.id} className={`relative ${plan.isPopular ? "border-2 border-blue-500" : ""}`}>
                      {plan.isPopular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <Badge className="bg-blue-500 text-white">
                            <Star className="h-3 w-3 mr-1" />
                            Mais Popular
                          </Badge>
                        </div>
                      )}

                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-2">
                            {plan.name}
                            {!plan.isActive && <Badge variant="secondary">Inativo</Badge>}
                          </CardTitle>
                          {isAdmin && (
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => {
                                  setEditingPlan(plan)
                                  setIsEditPlanOpen(true)
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="ghost" onClick={() => togglePlanStatus(plan.id)}>
                                {plan.isActive ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button size="sm" variant="ghost">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Excluir Plano</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Tem certeza que deseja excluir o plano "{plan.name}"? Esta ação não pode ser
                                      desfeita.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => deletePlan(plan.id)}>Excluir</AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          )}
                        </div>
                        <CardDescription>{plan.description}</CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold">{formatCurrency(plan.price)}</div>
                          <div className="text-sm text-gray-600">por {plan.duration} dias</div>
                        </div>

                        {plan.features && plan.features.length > 0 && (
                          <div className="space-y-2">
                            {plan.features.map((feature, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                                <span className="text-sm">{feature}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {(plan.maxUsers || plan.maxPets || plan.maxServices) && (
                          <div className="border-t pt-4 space-y-1">
                            {plan.maxUsers && (
                              <div className="text-sm text-gray-600">Máx. {plan.maxUsers} usuários</div>
                            )}
                            {plan.maxPets && <div className="text-sm text-gray-600">Máx. {plan.maxPets} pets</div>}
                            {plan.maxServices && (
                              <div className="text-sm text-gray-600">Máx. {plan.maxServices} serviços</div>
                            )}
                          </div>
                        )}

                        {!isAdmin && plan.isActive && (
                          <div className="pt-4">
                            {subscription?.planId === plan.id ? (
                              <Button disabled className="w-full">
                                <Check className="h-4 w-4 mr-2" />
                                Plano Atual
                              </Button>
                            ) : subscription ? (
                              <Button
                                onClick={() => handleChangePlan(plan.id)}
                                disabled={!canChangePlan.canChange}
                                className="w-full"
                              >
                                Alterar para este Plano
                              </Button>
                            ) : (
                              <Button onClick={() => handleCreateSubscription(plan.id)} className="w-full">
                                Assinar Agora
                              </Button>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
              </div>
            )}

            {/* Dialog para editar plano */}
            <Dialog open={isEditPlanOpen} onOpenChange={setIsEditPlanOpen}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Editar Plano</DialogTitle>
                  <DialogDescription>Atualize os dados do plano de assinatura</DialogDescription>
                </DialogHeader>
                <PlanForm
                  plan={editingPlan}
                  onSave={(data) => editingPlan && updatePlan(editingPlan.id, data)}
                  onClose={() => {
                    setIsEditPlanOpen(false)
                    setEditingPlan(null)
                  }}
                />
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* Faturas */}
          <TabsContent value="invoices" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Faturas</h2>
              <p className="text-gray-600">Histórico de pagamentos e faturas</p>
            </div>

            {invoicesLoading ? (
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-3 w-24" />
                        </div>
                        <Skeleton className="h-8 w-20" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : invoices.length > 0 ? (
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Vencimento</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {invoices.map((invoice) => (
                        <TableRow key={invoice.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{invoice.description}</p>
                              <p className="text-sm text-gray-600">{formatDate(invoice.createdAt)}</p>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{formatCurrency(invoice.amount)}</TableCell>
                          <TableCell>{formatDate(invoice.dueDate)}</TableCell>
                          <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => downloadInvoice(invoice.id, `fatura-${invoice.id}.pdf`)}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Nenhuma fatura encontrada</h3>
                  <p className="text-gray-600">Suas faturas aparecerão aqui quando disponíveis.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
