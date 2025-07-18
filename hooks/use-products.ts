"use client"

import { useState } from "react"
import {
  productService,
  type Product,
  type CreateProductData,
  type ContractedService,
} from "@/services/product.service"
import { toast } from "@/hooks/use-toast"

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = async (params?: {
    page?: number
    limit?: number
    search?: string
    categoria?: string
  }) => {
    try {
      setLoading(true)
      setError(null)
      const response = await productService.getProducts(params)

      if (response.success && response.data) {
        setProducts(response.data)
      } else {
        throw new Error(response.message || "Erro ao carregar produtos")
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro desconhecido"
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

  const createProduct = async (data: CreateProductData) => {
    try {
      setLoading(true)
      const response = await productService.createProduct(data)

      if (response.success) {
        toast({
          title: "Sucesso",
          description: "Produto criado com sucesso!",
        })
        return response.data
      } else {
        throw new Error(response.message || "Erro ao criar produto")
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro desconhecido"
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      })
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deleteProduct = async (id: string) => {
    try {
      setLoading(true)
      const response = await productService.deleteProduct(id)

      if (response.success) {
        setProducts((prev) => prev.filter((product) => product.id !== id))
        toast({
          title: "Sucesso",
          description: "Produto excluído com sucesso!",
        })
      } else {
        throw new Error(response.message || "Erro ao excluir produto")
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro desconhecido"
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      })
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    products,
    loading,
    error,
    fetchProducts,
    createProduct,
    deleteProduct,
  }
}

export function useContractedServices() {
  const [services, setServices] = useState<ContractedService[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchContractedServices = async (params?: {
    page?: number
    limit?: number
    status?: string
  }) => {
    try {
      setLoading(true)
      setError(null)
      const response = await productService.getContractedServices(params)

      if (response.success && response.data) {
        setServices(response.data)
      } else {
        throw new Error(response.message || "Erro ao carregar serviços contratados")
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro desconhecido"
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

  return {
    services,
    loading,
    error,
    fetchContractedServices,
  }
}
