// Tipos base para API
export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data: T
  errors?: Record<string, string[]>
}

export interface PaginatedResponse<T> {
  data: T[]
  current_page: number
  last_page: number
  per_page: number
  total: number
  from: number
  to: number
}

// Tipos de usuário
export interface User {
  id: string
  name: string
  email: string
  userType: "cliente" | "petshop" | "fornecedor" | "empresa" | "administrador"
  user_type: "cliente" | "petshop" | "fornecedor" | "empresa" | "administrador"
  document?: string
  phone?: string
  company_name?: string
  avatar?: string
  status: "active" | "inactive"
  email_verified_at?: string
  created_at: string
  updated_at: string
}

export interface UserProfile {
  id: string
  userId: string
  document?: string
  address?: Address
  preferences?: UserPreferences
}

export interface Address {
  id: string
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface UserPreferences {
  notifications: boolean
  emailMarketing: boolean
  theme: "light" | "dark" | "system"
  language: string
}

// Tipos de autenticação
export interface LoginRequest {
  email: string
  password: string
  userType: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
  userType: string
  document?: string
  phone?: string
  companyName?: string
}

export interface LoginResponse {
  user: User
  access_token: string
  refresh_token: string
  token_type: string
  expires_in: number
}

// Tipos de cliente
export interface Client {
  id: string
  name: string
  email: string
  phone?: string
  document?: string
  birth_date?: string
  status: "active" | "inactive"
  address?: {
    street: string
    number: string
    complement?: string
    neighborhood: string
    city: string
    state: string
    zip_code: string
  }
  created_at: string
  updated_at: string
}

// Tipos de Pet
export interface Pet {
  id: string
  name: string
  species: string
  breed?: string
  birth_date?: string
  weight?: number
  color?: string
  gender: "male" | "female"
  status: "active" | "inactive"
  owner_id: string
  owner?: Client
  avatar?: string
  microchip?: string
  created_at: string
  updated_at: string
}

export interface MedicalRecord {
  id: string
  petId: string
  veterinarianId?: string
  date: string
  type: "consultation" | "surgery" | "exam" | "treatment"
  description: string
  diagnosis?: string
  treatment?: string
  medications?: string
  notes?: string
  attachments?: string[]
  createdAt: string
  updatedAt: string
}

export interface Vaccination {
  id: string
  petId: string
  veterinarianId?: string
  vaccineName: string
  manufacturer?: string
  batchNumber?: string
  applicationDate: string
  nextDueDate?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

// Tipos de Serviço
export interface Service {
  id: string
  name: string
  description?: string
  category: string
  price: number
  duration?: number
  providerId: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface ServiceProvider {
  id: string
  userId: string
  user?: User
  businessName: string
  description?: string
  address?: Address
  phone?: string
  email?: string
  website?: string
  socialMedia?: Record<string, string>
  operatingHours?: OperatingHours[]
  services?: Service[]
  rating?: number
  reviewCount?: number
  isVerified: boolean
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface OperatingHours {
  dayOfWeek: number // 0-6 (domingo-sábado)
  openTime: string
  closeTime: string
  isOpen: boolean
}

// Tipos de Contrato
export interface ServiceContract {
  id: string
  clientId: string
  client?: User
  providerId: string
  provider?: ServiceProvider
  serviceId: string
  service?: Service
  petId: string
  pet?: Pet
  status: "pendente" | "confirmado" | "em_andamento" | "concluido" | "cancelado" | "rejeitado"
  scheduledDate?: string
  completedDate?: string
  price: number
  observations?: string
  clientNotes?: string
  providerNotes?: string
  rating?: number
  review?: string
  createdAt: string
  updatedAt: string
}

// Tipos de Assinatura
export interface Plan {
  id: string
  name: string
  description: string
  type: "basico" | "premium" | "enterprise" | "personalizado"
  price: number
  billingCycle: "mensal" | "trimestral" | "semestral" | "anual"
  features: PlanFeature[]
  maxUsers?: number
  maxPets?: number
  maxContracts?: number
  isActive: boolean
  isPopular?: boolean
  createdAt: string
  updatedAt: string
}

export interface PlanFeature {
  id: string
  name: string
  description?: string
  isIncluded: boolean
  limit?: number
}

export interface Subscription {
  id: string
  userId: string
  planId: string
  status: "active" | "inactive" | "cancelled" | "expired"
  startDate: string
  endDate: string
  autoRenew: boolean
  paymentMethod?: string
  createdAt: string
  updatedAt: string
  plan?: SubscriptionPlan
}

export interface SubscriptionPlan {
  id: string
  name: string
  description?: string
  price: number
  duration: number // em dias
  features: string[]
  isActive: boolean
  createdAt: string
  updatedAt: string
}

// Tipos de Campanha
export interface Campaign {
  id: string
  title: string
  description: string
  type: "discount" | "promotion" | "announcement"
  status: "active" | "inactive" | "scheduled"
  start_date: string
  end_date?: string
  target_audience?: string
  discount_percentage?: number
  discount_amount?: number
  image?: string
  created_by: string
  created_at: string
  updated_at: string
}

// Tipos de Feedback
export interface Feedback {
  id: string
  title: string
  message: string
  type: "suggestion" | "complaint" | "compliment" | "bug_report"
  status: "pending" | "in_progress" | "resolved" | "closed"
  priority: "low" | "medium" | "high"
  user_id: string
  user?: User
  response?: string
  responded_by?: string
  responded_at?: string
  created_at: string
  updated_at: string
}

// Tipos de Notificação
export interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  is_read: boolean
  read_at?: string
  action_url?: string
  protocol?: string
  user_id: string
  created_at: string
  updated_at: string
}

// Tipos de Estatística
export interface DashboardStats {
  totalUsers: number
  totalPets: number
  totalContracts: number
  totalRevenue: number
  activeSubscriptions: number
  pendingContracts: number
  completedContracts: number
  canceledContracts: number
  averageRating: number
  monthlyGrowth: number
}

export interface UserStats {
  totalPets: number
  totalContracts: number
  completedContracts: number
  pendingContracts: number
  totalSpent: number
  averageRating: number
  joinDate: string
  lastActivity: string
}

// Tipos de busca e filtros
export interface SearchFilters {
  query?: string
  category?: string
  location?: string
  priceMin?: number
  priceMax?: number
  rating?: number
  isVerified?: boolean
  sortBy?: "relevance" | "price" | "rating" | "distance" | "newest"
  sortOrder?: "asc" | "desc"
}

export interface SearchResult<T> {
  items: T[]
  total: number
  page: number
  limit: number
  hasNext: boolean
  hasPrev: boolean
  filters: SearchFilters
}

// Tipos de configuração
export interface UserSettings {
  id: string
  userId: string
  notifications: NotificationSettings
  privacy: PrivacySettings
  preferences: UserPreferences
  createdAt: string
  updatedAt: string
}

export interface NotificationSettings {
  email: boolean
  push: boolean
  sms: boolean
  marketing: boolean
  contractUpdates: boolean
  paymentReminders: boolean
  systemUpdates: boolean
}

export interface PrivacySettings {
  profileVisibility: "public" | "private" | "contacts"
  showEmail: boolean
  showPhone: boolean
  allowMessages: boolean
  allowReviews: boolean
}

// Tipos de erro
export interface ApiError {
  code: string
  message: string
  details?: Record<string, any>
  timestamp: string
}

// Tipos de validação
export interface ValidationError {
  field: string
  message: string
  code: string
}

export interface FormErrors {
  [key: string]: string | string[]
}

// Tipos de Produto
export interface Product {
  id: string
  name: string
  description?: string
  category: string
  brand?: string
  price: number
  stock: number
  sku?: string
  images?: string[]
  isActive: boolean
  sellerId: string
  createdAt: string
  updatedAt: string
}

// Tipos de indicação
export interface Indication {
  id: string
  referrer_id: string
  referrer?: User
  referred_name: string
  referred_email: string
  referred_phone?: string
  status: "pending" | "approved" | "rejected"
  commission_amount?: number
  commission_paid?: boolean
  notes?: string
  created_at: string
  updated_at: string
}
