// Tipos base da API
export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Tipos de usuário
export type UserType = "cliente" | "petshop" | "fornecedor" | "empresa" | "administrador"

// Auth types
export interface LoginRequest {
  email: string
  password: string
  userType: UserType
}

export interface LoginResponse {
  token: string
  refreshToken: string
  user: User
}

export interface RegisterRequest {
  email: string
  password: string
  userType: UserType
  name: string
  phone?: string
  document?: string // CPF ou CNPJ
}

// User types
export interface User {
  id: string
  email: string
  name: string
  userType: UserType
  phone?: string
  document?: string
  avatar?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  profile?: ClientProfile | CompanyProfile | PetshopProfile | SupplierProfile
}

export interface ClientProfile {
  id: string
  userId: string
  cpf: string
  birthDate?: string
  address?: Address
}

export interface CompanyProfile {
  id: string
  userId: string
  cnpj: string
  companyName: string
  fantasyName?: string
  area?: string
  description?: string
  responsible?: string
  socialMedia?: string
  logo?: string
  address?: Address
}

export interface PetshopProfile {
  id: string
  userId: string
  cnpj: string
  companyName: string
  fantasyName?: string
  description?: string
  services?: string[]
  workingHours?: string
  logo?: string
  address?: Address
}

export interface SupplierProfile {
  id: string
  userId: string
  cnpj: string
  companyName: string
  fantasyName?: string
  description?: string
  categories?: string[]
  logo?: string
  address?: Address
}

export interface Address {
  id: string
  cep: string
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  country: string
}

// Pet types
export interface Pet {
  id: string
  name: string
  species: string
  breed?: string
  age?: number
  weight?: number
  color?: string
  gender: "male" | "female"
  isNeutered: boolean
  ownerId: string
  avatar?: string
  medicalInfo?: PetMedicalInfo
  createdAt: string
  updatedAt: string
}

export interface PetMedicalInfo {
  id: string
  petId: string
  allergies?: string[]
  medications?: string[]
  conditions?: string[]
  veterinarian?: string
  lastCheckup?: string
  vaccinations?: Vaccination[]
}

export interface Vaccination {
  id: string
  name: string
  date: string
  nextDue?: string
  veterinarian?: string
  batch?: string
}

// Product types
export interface Product {
  id: string
  name: string
  description?: string
  category: string
  subcategory?: string
  brand?: string
  price: number
  stock: number
  images?: string[]
  specifications?: Record<string, any>
  supplierId?: string
  petshopId?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

// Service types
export interface Service {
  id: string
  name: string
  description?: string
  category: string
  price: number
  duration: number // em minutos
  petshopId: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

// Appointment types
export interface Appointment {
  id: string
  petId: string
  serviceId: string
  petshopId: string
  clientId: string
  scheduledDate: string
  status: "scheduled" | "confirmed" | "in_progress" | "completed" | "cancelled"
  notes?: string
  price?: number
  createdAt: string
  updatedAt: string
  pet?: Pet
  service?: Service
  petshop?: User
}

// Review types
export interface Review {
  id: string
  rating: number
  comment?: string
  clientId: string
  targetId: string // petshop, supplier, or service ID
  targetType: "petshop" | "supplier" | "service"
  appointmentId?: string
  createdAt: string
  updatedAt: string
  client?: User
}

// Notification types
export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: "info" | "warning" | "success" | "error"
  isRead: boolean
  data?: Record<string, any>
  createdAt: string
}

// Report types
export interface ReportData {
  period: string
  totalRevenue?: number
  totalAppointments?: number
  totalClients?: number
  totalProducts?: number
  growthRate?: number
  topServices?: Array<{ name: string; count: number }>
  topProducts?: Array<{ name: string; sales: number }>
}
