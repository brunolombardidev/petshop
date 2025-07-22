"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, PawPrint, DollarSign, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import type { ServiceProvider, Service } from "@/types/service"
import { useServiceContracts } from "@/hooks/use-services"
import { usePets } from "@/hooks/use-pets"
import { toast } from "@/hooks/use-toast"

interface ServiceContractModalProps {
  isOpen: boolean
  onClose: () => void
  provider: ServiceProvider
  onSuccess: () => void
}

export function ServiceContractModal({ isOpen, onClose, provider, onSuccess }: ServiceContractModalProps) {
  const { contractService } = useServiceContracts()
  const { pets, fetchPets } = usePets()

  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [selectedPet, setSelectedPet] = useState<string>("")
  const [dataInicio, setDataInicio] = useState<Date>()
  const [observacoes, setObservacoes] = useState("")
  const [loading, setLoading] = useState(false)

  // Carregar pets do usuário
  useEffect(() => {
    if (isOpen) {
      fetchPets()
    }
  }, [isOpen, fetchPets])

  // Reset form quando modal abre/fecha
  useEffect(() => {
    if (!isOpen) {
      setSelectedService(null)
      setSelectedPet("")
      setDataInicio(undefined)
      setObservacoes("")
    }
  }, [isOpen])

  const handleServiceSelect = (serviceId: string) => {
    const service = provider.servicos.find((s) => s.id === serviceId)
    setSelectedService(service || null)
  }

  const handleSubmit = async () => {
    if (!selectedService || !selectedPet) {
      toast({
        title: "Campos obrigatórios",
        description: "Selecione um serviço e um pet para continuar.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      await contractService({
        servicoId: selectedService.id,
        petId: selectedPet,
        observacoes: observacoes || undefined,
        dataInicio: dataInicio ? dataInicio.toISOString() : undefined,
      })

      toast({
        title: "Serviço contratado!",
        description: `${selectedService.nome} foi contratado com sucesso.`,
      })

      onSuccess()
      onClose()
    } catch (error) {
      console.error("Erro ao contratar serviço:", error)
    } finally {
      setLoading(false)
    }
  }

  const isFormValid = selectedService && selectedPet

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <PawPrint className="w-5 h-5 text-blue-600" />
            Contratar Serviço
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações do Provedor */}
          <Card className="border-2 border-blue-100 bg-blue-50/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={provider.foto || "/placeholder.svg"} alt={provider.nome} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    {provider.nome.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-gray-900">{provider.nome}</h3>
                  <p className="text-sm text-gray-600">
                    {provider.cidade && provider.estado && `${provider.cidade}, ${provider.estado}`}
                  </p>
                  {provider.avaliacao && (
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-sm text-yellow-600">★</span>
                      <span className="text-sm text-gray-600">
                        {provider.avaliacao.toFixed(1)} ({provider.totalAvaliacoes} avaliações)
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Seleção de Serviço */}
          <div className="space-y-3">
            <Label className="text-base font-semibold text-gray-900">Selecione o Serviço *</Label>

            <div className="grid gap-3">
              {provider.servicos
                .filter((s) => s.disponivel)
                .map((service) => (
                  <Card
                    key={service.id}
                    className={`cursor-pointer transition-all duration-200 ${
                      selectedService?.id === service.id
                        ? "border-2 border-blue-500 bg-blue-50/50"
                        : "border border-gray-200 hover:border-blue-300 hover:bg-blue-50/30"
                    }`}
                    onClick={() => handleServiceSelect(service.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-gray-900">{service.nome}</h4>
                            {selectedService?.id === service.id && <CheckCircle className="w-5 h-5 text-blue-600" />}
                          </div>

                          <p className="text-sm text-gray-600 mb-2">{service.descricao}</p>

                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              <span className="font-medium text-green-600">R$ {service.preco.toFixed(2)}</span>
                            </div>

                            {service.duracao && (
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{service.duracao} min</span>
                              </div>
                            )}

                            <Badge variant="outline" className="text-xs">
                              {service.categoria}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>

            {provider.servicos.filter((s) => s.disponivel).length === 0 && (
              <div className="text-center py-8">
                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">Nenhum serviço disponível no momento.</p>
              </div>
            )}
          </div>

          {/* Seleção de Pet */}
          <div className="space-y-3">
            <Label htmlFor="pet" className="text-base font-semibold text-gray-900">
              Selecione o Pet *
            </Label>

            <Select value={selectedPet} onValueChange={setSelectedPet}>
              <SelectTrigger className="h-12 border-gray-200 rounded-xl">
                <SelectValue placeholder="Escolha qual pet receberá o serviço" />
              </SelectTrigger>
              <SelectContent>
                {pets.map((pet) => (
                  <SelectItem key={pet.id} value={pet.id}>
                    <div className="flex items-center gap-2">
                      <PawPrint className="w-4 h-4" />
                      <span>
                        {pet.name} - {pet.species}
                      </span>
                      {pet.breed && <span className="text-gray-500">({pet.breed})</span>}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {pets.length === 0 && (
              <p className="text-sm text-amber-600 bg-amber-50 p-3 rounded-xl">
                <AlertCircle className="w-4 h-4 inline mr-2" />
                Você precisa cadastrar pelo menos um pet para contratar serviços.
              </p>
            )}
          </div>

          {/* Data de Início (Opcional) */}
          <div className="space-y-3">
            <Label className="text-base font-semibold text-gray-900">Data de Início (Opcional)</Label>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full h-12 justify-start text-left font-normal border-gray-200 rounded-xl bg-transparent"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dataInicio ? (
                    format(dataInicio, "PPP", { locale: ptBR })
                  ) : (
                    <span className="text-gray-500">Selecione uma data</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dataInicio}
                  onSelect={setDataInicio}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Observações */}
          <div className="space-y-3">
            <Label htmlFor="observacoes" className="text-base font-semibold text-gray-900">
              Observações (Opcional)
            </Label>

            <Textarea
              id="observacoes"
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              placeholder="Adicione informações importantes sobre o serviço, horários preferenciais, cuidados especiais com o pet, etc."
              className="min-h-[100px] border-gray-200 rounded-xl resize-none"
              maxLength={500}
            />

            <p className="text-xs text-gray-500 text-right">{observacoes.length}/500 caracteres</p>
          </div>

          {/* Resumo do Contrato */}
          {selectedService && selectedPet && (
            <Card className="border-2 border-green-100 bg-green-50/50">
              <CardContent className="p-4">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Resumo do Contrato
                </h4>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Serviço:</span>
                    <span className="font-medium">{selectedService.nome}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Pet:</span>
                    <span className="font-medium">{pets.find((p) => p.id === selectedPet)?.name}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Valor:</span>
                    <span className="font-bold text-green-600">R$ {selectedService.preco.toFixed(2)}</span>
                  </div>

                  {dataInicio && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Data de Início:</span>
                      <span className="font-medium">{format(dataInicio, "dd/MM/yyyy", { locale: ptBR })}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Ações */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 h-12 border-2 border-gray-200 rounded-xl bg-transparent"
              disabled={loading}
            >
              Cancelar
            </Button>

            <Button
              onClick={handleSubmit}
              disabled={!isFormValid || loading || pets.length === 0}
              className="flex-1 h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Contratando...
                </div>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Contratar Serviço
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
