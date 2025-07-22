"use client"

import { useState, useEffect } from "react"
import { toast } from "@/hooks/use-toast"

export interface Pet {
  id: string
  name: string
  species: string
  breed?: string
  age?: number
  weight?: number
  color?: string
  gender: "male" | "female"
  ownerId: string
  avatar?: string
  isActive: boolean
  birthDate?: string
  microchipId?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface CreatePetRequest {
  name: string
  species: string
  breed?: string
  age?: number
  weight?: number
  color?: string
  gender: "male" | "female"
  birthDate?: string
  microchipId?: string
  notes?: string
}

export function usePets() {
  const [pets, setPets] = useState<Pet[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPets = async () => {
    try {
      setLoading(true)
      setError(null)

      // Simulação de dados - substituir pela chamada real da API
      const mockPets: Pet[] = [
        {
          id: "1",
          name: "Rex",
          species: "Cão",
          breed: "Golden Retriever",
          age: 3,
          weight: 25.5,
          color: "Dourado",
          gender: "male",
          ownerId: "user1",
          avatar: "/placeholder-user.jpg",
          isActive: true,
          birthDate: "2021-03-15",
          microchipId: "123456789",
          notes: "Pet muito dócil e brincalhão",
          createdAt: "2021-03-20T10:00:00Z",
          updatedAt: "2024-01-15T14:30:00Z",
        },
        {
          id: "2",
          name: "Mimi",
          species: "Gato",
          breed: "Persa",
          age: 2,
          weight: 4.2,
          color: "Branco",
          gender: "female",
          ownerId: "user1",
          avatar: "/placeholder-user.jpg",
          isActive: true,
          birthDate: "2022-07-10",
          notes: "Gata muito carinhosa",
          createdAt: "2022-07-15T09:00:00Z",
          updatedAt: "2024-01-10T16:20:00Z",
        },
      ]

      setPets(mockPets)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao carregar pets"
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

  const createPet = async (data: CreatePetRequest) => {
    try {
      // Simulação - substituir pela chamada real da API
      const newPet: Pet = {
        id: Date.now().toString(),
        ...data,
        ownerId: "current-user",
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      setPets((prev) => [newPet, ...prev])

      toast({
        title: "Sucesso",
        description: "Pet cadastrado com sucesso!",
      })

      return newPet
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro ao cadastrar pet"
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      })
      throw error
    }
  }

  const updatePet = async (id: string, data: Partial<Pet>) => {
    try {
      setPets((prev) =>
        prev.map((pet) => (pet.id === id ? { ...pet, ...data, updatedAt: new Date().toISOString() } : pet)),
      )

      toast({
        title: "Sucesso",
        description: "Pet atualizado com sucesso!",
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro ao atualizar pet"
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      })
      throw error
    }
  }

  const deletePet = async (id: string) => {
    try {
      setPets((prev) => prev.filter((pet) => pet.id !== id))

      toast({
        title: "Sucesso",
        description: "Pet removido com sucesso!",
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro ao remover pet"
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      })
      throw error
    }
  }

  const getPetById = (id: string) => {
    return pets.find((pet) => pet.id === id)
  }

  const getPetsBySpecies = (species: string) => {
    return pets.filter((pet) => pet.species.toLowerCase() === species.toLowerCase())
  }

  const getActivePets = () => {
    return pets.filter((pet) => pet.isActive)
  }

  useEffect(() => {
    fetchPets()
  }, [])

  return {
    pets,
    loading,
    error,
    refetch: fetchPets,
    createPet,
    updatePet,
    deletePet,
    getPetById,
    getPetsBySpecies,
    getActivePets,
  }
}
