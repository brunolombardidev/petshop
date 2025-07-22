"use client"

import { useState, useEffect } from "react"
import { toast } from "@/hooks/use-toast"

export interface MedicalHistory {
  id: string
  petId: string
  date: string
  type: "consultation" | "surgery" | "exam" | "medication"
  description: string
  veterinarian?: string
  clinic?: string
  notes?: string
  attachments?: string[]
  cost?: number
  nextAppointment?: string
  createdAt: string
  updatedAt: string
}

export interface CreateMedicalHistoryRequest {
  petId: string
  date: string
  type: "consultation" | "surgery" | "exam" | "medication"
  description: string
  veterinarian?: string
  clinic?: string
  notes?: string
  cost?: number
  nextAppointment?: string
}

export function useMedicalHistory(petId?: string) {
  const [medicalHistory, setMedicalHistory] = useState<MedicalHistory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchMedicalHistory = async () => {
    try {
      setLoading(true)
      setError(null)

      // Simulação de dados - substituir pela chamada real da API
      const mockHistory: MedicalHistory[] = [
        {
          id: "1",
          petId: petId || "1",
          date: "2024-01-15",
          type: "consultation",
          description: "Consulta de rotina - checkup geral",
          veterinarian: "Dr. João Silva",
          clinic: "Clínica Veterinária Central",
          notes: "Pet em ótimo estado de saúde. Recomendado retorno em 6 meses.",
          cost: 150.0,
          nextAppointment: "2024-07-15",
          createdAt: "2024-01-15T10:00:00Z",
          updatedAt: "2024-01-15T10:00:00Z",
        },
        {
          id: "2",
          petId: petId || "1",
          date: "2023-12-10",
          type: "exam",
          description: "Exame de sangue completo",
          veterinarian: "Dra. Maria Santos",
          clinic: "Laboratório VetLab",
          notes: "Todos os parâmetros dentro da normalidade",
          cost: 80.0,
          attachments: ["/exame-sangue-rex.pdf"],
          createdAt: "2023-12-10T14:30:00Z",
          updatedAt: "2023-12-10T14:30:00Z",
        },
        {
          id: "3",
          petId: petId || "1",
          date: "2023-11-20",
          type: "medication",
          description: "Vermífugo - Drontal Plus",
          veterinarian: "Dr. João Silva",
          clinic: "Clínica Veterinária Central",
          notes: "Administrado vermífugo. Próxima dose em 3 meses.",
          cost: 25.0,
          nextAppointment: "2024-02-20",
          createdAt: "2023-11-20T09:15:00Z",
          updatedAt: "2023-11-20T09:15:00Z",
        },
      ]

      // Filtrar por petId se fornecido
      const filteredHistory = petId ? mockHistory.filter((record) => record.petId === petId) : mockHistory

      setMedicalHistory(filteredHistory)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao carregar histórico médico"
      setError(errorMessage)
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const createMedicalRecord = async (data: CreateMedicalHistoryRequest) => {
    try {
      // Simulação - substituir pela chamada real da API
      const newRecord: MedicalHistory = {
        id: Date.now().toString(),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      setMedicalHistory((prev) => [newRecord, ...prev])

      toast({
        title: "Sucesso",
        description: "Registro médico adicionado com sucesso!",
      })

      return newRecord
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro ao adicionar registro médico"
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      })
      throw error
    }
  }

  const updateMedicalRecord = async (id: string, data: Partial<MedicalHistory>) => {
    try {
      setMedicalHistory((prev) =>
        prev.map((record) => (record.id === id ? { ...record, ...data, updatedAt: new Date().toISOString() } : record)),
      )

      toast({
        title: "Sucesso",
        description: "Registro médico atualizado com sucesso!",
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro ao atualizar registro médico"
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      })
      throw error
    }
  }

  const deleteMedicalRecord = async (id: string) => {
    try {
      setMedicalHistory((prev) => prev.filter((record) => record.id !== id))

      toast({
        title: "Sucesso",
        description: "Registro médico removido com sucesso!",
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro ao remover registro médico"
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      })
      throw error
    }
  }

  const getRecordsByType = (type: MedicalHistory["type"]) => {
    return medicalHistory.filter((record) => record.type === type)
  }

  const getRecordsByDateRange = (startDate: string, endDate: string) => {
    return medicalHistory.filter((record) => {
      const recordDate = new Date(record.date)
      const start = new Date(startDate)
      const end = new Date(endDate)
      return recordDate >= start && recordDate <= end
    })
  }

  const getUpcomingAppointments = () => {
    const today = new Date()
    return medicalHistory
      .filter((record) => record.nextAppointment)
      .filter((record) => new Date(record.nextAppointment!) > today)
      .sort((a, b) => new Date(a.nextAppointment!).getTime() - new Date(b.nextAppointment!).getTime())
  }

  useEffect(() => {
    fetchMedicalHistory()
  }, [petId])

  return {
    medicalHistory,
    loading,
    error,
    refetch: fetchMedicalHistory,
    createMedicalRecord,
    updateMedicalRecord,
    deleteMedicalRecord,
    getRecordsByType,
    getRecordsByDateRange,
    getUpcomingAppointments,
  }
}
