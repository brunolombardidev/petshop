"use client"

import { useState, useCallback } from "react"
import { productService } from "@/services/product.service"
import type { Product, ContractedService } from "@/services/product.service"

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
    limit: 10,
  })

  const fetchProducts = useCallback(
    async (params?: {
      page?: number
      limit?: number
      search?: string
      categoria?: string
    }) => {
      setLoading(true)
      setError(null)
      try {
        const response = await productService.getProducts(params)
        if (response.success && Array.isArray(response.data)) {
          setProducts(response.data)
          // Se a resposta não tem paginação, criar uma estrutura básica
          setPagination({
            page: params?.page || 1,
            totalPages: 1,
            total: response.data.length,
            limit: params?.limit || 10,
          })
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao buscar produtos")
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  const createProduct = useCallback(
    async (productData: {
      nome: string
      descricao: string
      preco: number
      categoria: string
      imagem?: string
    }) => {
      setLoading(true)
      setError(null)
      try {
        const response = await productService.createProduct(productData)
        if (response.success) {
          setProducts((prev) => [response.data, ...prev])
          return response.data
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao criar produto")
        throw err
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  const updateProduct = useCallback(async (id: string, productData: Partial<Product>) => {
    setLoading(true)
    setError(null)
    try {
      const response = await productService.updateProduct(id, productData)
      if (response.success) {
        setProducts((prev) => prev.map((product) => (product.id === id ? response.data : product)))
        return response.data
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao atualizar produto")
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteProduct = useCallback(async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      await productService.deleteProduct(id)
      setProducts((prev) => prev.filter((product) => product.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao excluir produto")
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    products,
    loading,
    error,
    pagination,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  }
}

export function useContractedServices() {
  const [services, setServices] = useState<ContractedService[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
    limit: 10,
  })

  const fetchContractedServices = useCallback(
    async (params?: {
      page?: number
      limit?: number
      status?: string
    }) => {
      setLoading(true)
      setError(null)
      try {
        const response = await productService.getContractedServices(params)
        if (response.success && Array.isArray(response.data)) {
          setServices(response.data)
          // Se a resposta não tem paginação, criar uma estrutura básica
          setPagination({
            page: params?.page || 1,
            totalPages: 1,
            total: response.data.length,
            limit: params?.limit || 10,
          })
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao buscar serviços contratados")
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  return {
    services,
    loading,
    error,
    pagination,
    fetchContractedServices,
  }
}
