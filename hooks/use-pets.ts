"use client"

import { useState, useEffect } from "react"
import { petService, type Pet, type CreatePetRequest } from "@/services/pet.service"
import { toast } from "@/hooks/use-toast"

export function usePets() {
  const [pets, setPets] = useState<Pet[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadPets = async (params?: { search?: string; especie?: string }) => {
    try {
      setLoading(true)
      setError(null)
      const response = await petService.getPets(params)
      setPets(response.data)
    } catch (err) {
      setError("Erro ao carregar pets")
      console.error("Erro ao carregar pets:", err)
    } finally {
      setLoading(false)
    }
  }

  const createPet = async (data: CreatePetRequest) => {
    try {
      setLoading(true)
      const response = await petService.createPet(data)
      setPets((prev) => [response.data, ...prev])
      toast({
        title: "Sucesso!",
        description: "Pet cadastrado com sucesso.",
      })
      return response.data
    } catch (err) {
      toast({
        title: "Erro",
        description: "Erro ao cadastrar pet. Tente novamente.",
        variant: "destructive",
      })
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deletePet = async (id: string) => {
    try {
      setLoading(true)
      await petService.deletePet(id)
      setPets((prev) => prev.filter((pet) => pet.id !== id))
      toast({
        title: "Sucesso!",
        description: "Pet excluído com sucesso.",
      })
    } catch (err) {
      toast({
        title: "Erro",
        description: "Erro ao excluir pet. Tente novamente.",
        variant: "destructive",
      })
      throw err
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPets()
  }, [])

  return {
    pets,
    loading,
    error,
    loadPets,
    createPet,
    deletePet,
  }
}

export function usePet(id: string) {
  const [pet, setPet] = useState<Pet | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadPet = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await petService.getPetById(id)
      setPet(response.data)
    } catch (err) {
      setError("Erro ao carregar pet")
      console.error("Erro ao carregar pet:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      loadPet()
    }
  }, [id])

  return {
    pet,
    loading,
    error,
    loadPet,
  }
}
