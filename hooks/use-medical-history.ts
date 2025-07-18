"use client"

import { useState, useEffect } from "react"
import {
  medicalHistoryService,
  type MedicalRecord,
  type CreateMedicalRecordRequest,
} from "@/services/medical-history.service"
import { toast } from "@/hooks/use-toast"

export function useMedicalHistory(petId?: string) {
  const [records, setRecords] = useState<MedicalRecord[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadRecords = async (params?: { tipo?: string; dateFrom?: string; dateTo?: string }) => {
    try {
      setLoading(true)
      setError(null)
      const response = await medicalHistoryService.getMedicalRecords({
        petId,
        ...params,
      })
      setRecords(response.data)
    } catch (err) {
      setError("Erro ao carregar histórico médico")
      console.error("Erro ao carregar histórico médico:", err)
    } finally {
      setLoading(false)
    }
  }

  const createRecord = async (data: CreateMedicalRecordRequest) => {
    try {
      setLoading(true)
      const response = await medicalHistoryService.createMedicalRecord(data)
      setRecords((prev) => [response.data, ...prev])
      toast({
        title: "Sucesso!",
        description: "Registro médico criado com sucesso.",
      })
      return response.data
    } catch (err) {
      toast({
        title: "Erro",
        description: "Erro ao criar registro médico. Tente novamente.",
        variant: "destructive",
      })
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deleteRecord = async (id: string) => {
    try {
      setLoading(true)
      await medicalHistoryService.deleteMedicalRecord(id)
      setRecords((prev) => prev.filter((record) => record.id !== id))
      toast({
        title: "Sucesso!",
        description: "Registro médico excluído com sucesso.",
      })
    } catch (err) {
      toast({
        title: "Erro",
        description: "Erro ao excluir registro médico. Tente novamente.",
        variant: "destructive",
      })
      throw err
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadRecords()
  }, [petId])

  return {
    records,
    loading,
    error,
    loadRecords,
    createRecord,
    deleteRecord,
  }
}
