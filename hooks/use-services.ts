"use client"

import { useState, useEffect, useCallback } from "react"
import { ServiceService } from "@/services/service.service"
import type {
  Service,
  ServiceContract,
  ServiceProvider,
  ServiceCategory,
  ServiceSearch,
  ContractServiceRequest,
} from "@/types/service"

export function useServices() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
    limit: 10,
  })

  const searchServices = useCallback(async (filters: ServiceSearch) => {
    setLoading(true)
    setError(null)
    try {
      const response = await ServiceService.searchServices(filters)
      setServices(response.data)
      setPagination({
        page: response.page,
        totalPages: response.totalPages,
        total: response.total,
        limit: response.limit,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao buscar serviços")
    } finally {
      setLoading(false)
    }
  }, [])

  const getServicesByProvider = useCallback(async (providerId: string, tipo: "petshop" | "fornecedor") => {
    setLoading(true)
    setError(null)
    try {
      const response = await ServiceService.getServicesByProvider(providerId, tipo)
      setServices(response.data)
      setPagination({
        page: response.page,
        totalPages: response.totalPages,
        total: response.total,
        limit: response.limit,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao buscar serviços do provedor")
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    services,
    loading,
    error,
    pagination,
    searchServices,
    getServicesByProvider,
  }
}

export function useServiceProviders() {
  const [providers, setProviders] = useState<ServiceProvider[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
    limit: 10,
  })

  const searchProviders = useCallback(
    async (filters: {
      query?: string
      tipo?: "petshop" | "fornecedor"
      cidade?: string
      estado?: string
      categoria?: string
      avaliacao?: number
      verificado?: boolean
      page?: number
      limit?: number
    }) => {
      setLoading(true)
      setError(null)
      try {
        const response = await ServiceService.searchProviders(filters)
        setProviders(response.data)
        setPagination({
          page: response.page,
          totalPages: response.totalPages,
          total: response.total,
          limit: response.limit,
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao buscar provedores")
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  const validateProviderCard = useCallback(async (qrCode: string) => {
    setLoading(true)
    setError(null)
    try {
      const provider = await ServiceService.validateProviderCard(qrCode)
      return provider
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao validar cartão")
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    providers,
    loading,
    error,
    pagination,
    searchProviders,
    validateProviderCard,
  }
}

export function useServiceContracts() {
  const [contracts, setContracts] = useState<ServiceContract[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
    limit: 10,
  })

  const getMyContracts = useCallback(
    async (filters?: {
      status?: string
      petId?: string
      dataInicio?: string
      dataFim?: string
      page?: number
      limit?: number
    }) => {
      setLoading(true)
      setError(null)
      try {
        const response = await ServiceService.getMyContracts(filters)
        setContracts(response.data)
        setPagination({
          page: response.page,
          totalPages: response.totalPages,
          total: response.total,
          limit: response.limit,
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao buscar contratos")
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  const getReceivedContracts = useCallback(
    async (filters?: {
      status?: string
      clienteId?: string
      dataInicio?: string
      dataFim?: string
      page?: number
      limit?: number
    }) => {
      setLoading(true)
      setError(null)
      try {
        const response = await ServiceService.getReceivedContracts(filters)
        setContracts(response.data)
        setPagination({
          page: response.page,
          totalPages: response.totalPages,
          total: response.total,
          limit: response.limit,
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao buscar contratos recebidos")
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  const contractService = useCallback(async (contractData: ContractServiceRequest) => {
    setLoading(true)
    setError(null)
    try {
      const contract = await ServiceService.contractService(contractData)
      // Atualizar a lista de contratos
      setContracts((prev) => [contract, ...prev])
      return contract
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao contratar serviço")
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const updateContractStatus = useCallback(
    async (id: string, status: "ativo" | "concluido" | "cancelado", observacoes?: string) => {
      setLoading(true)
      setError(null)
      try {
        const updatedContract = await ServiceService.updateContractStatus(id, status, observacoes)
        setContracts((prev) => prev.map((contract) => (contract.id === id ? updatedContract : contract)))
        return updatedContract
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao atualizar status do contrato")
        throw err
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  const rateContract = useCallback(async (id: string, avaliacao: number, comentario?: string) => {
    setLoading(true)
    setError(null)
    try {
      const updatedContract = await ServiceService.rateContract(id, avaliacao, comentario)
      setContracts((prev) => prev.map((contract) => (contract.id === id ? updatedContract : contract)))
      return updatedContract
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao avaliar serviço")
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const cancelContract = useCallback(async (id: string, motivo?: string) => {
    setLoading(true)
    setError(null)
    try {
      const cancelledContract = await ServiceService.cancelContract(id, motivo)
      setContracts((prev) => prev.map((contract) => (contract.id === id ? cancelledContract : contract)))
      return cancelledContract
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao cancelar contrato")
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    contracts,
    loading,
    error,
    pagination,
    getMyContracts,
    getReceivedContracts,
    contractService,
    updateContractStatus,
    rateContract,
    cancelContract,
  }
}

export function useServiceCategories() {
  const [categories, setCategories] = useState<ServiceCategory[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchCategories = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await ServiceService.getCategories()
      setCategories(response)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao buscar categorias")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  return {
    categories,
    loading,
    error,
    fetchCategories,
  }
}

export function useServiceFavorites() {
  const [favorites, setFavorites] = useState<ServiceProvider[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchFavorites = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await ServiceService.getFavoriteProviders()
      setFavorites(response)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao buscar favoritos")
    } finally {
      setLoading(false)
    }
  }, [])

  const addToFavorites = useCallback(
    async (providerId: string, tipo: "petshop" | "fornecedor") => {
      setLoading(true)
      setError(null)
      try {
        await ServiceService.addProviderToFavorites(providerId, tipo)
        await fetchFavorites() // Recarregar lista
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao adicionar aos favoritos")
        throw err
      } finally {
        setLoading(false)
      }
    },
    [fetchFavorites],
  )

  const removeFromFavorites = useCallback(async (providerId: string, tipo: "petshop" | "fornecedor") => {
    setLoading(true)
    setError(null)
    try {
      await ServiceService.removeProviderFromFavorites(providerId, tipo)
      setFavorites((prev) => prev.filter((fav) => fav.id !== providerId))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao remover dos favoritos")
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const checkIsFavorite = useCallback(async (providerId: string, tipo: "petshop" | "fornecedor") => {
    try {
      return await ServiceService.isProviderFavorite(providerId, tipo)
    } catch (err) {
      return false
    }
  }, [])

  useEffect(() => {
    fetchFavorites()
  }, [fetchFavorites])

  return {
    favorites,
    loading,
    error,
    addToFavorites,
    removeFromFavorites,
    checkIsFavorite,
    fetchFavorites,
  }
}
