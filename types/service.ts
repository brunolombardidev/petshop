export interface Service {
  id: string
  nome: string
  descricao: string
  preco: number
  categoria: string
  duracao?: number // em minutos
  disponivel: boolean
  petshopId: string
  fornecedorId?: string
  imagens?: string[]
  requisitos?: string[]
  createdAt: string
  updatedAt: string
  petshop?: {
    id: string
    nome: string
    email: string
    telefone?: string
    endereco?: string
    avaliacao?: number
  }
  fornecedor?: {
    id: string
    nome: string
    email: string
    telefone?: string
    endereco?: string
    avaliacao?: number
  }
}

export interface ServiceContract {
  id: string
  servicoId: string
  clienteId: string
  petshopId?: string
  fornecedorId?: string
  petId?: string // Para contratos de clientes
  status: "pendente" | "ativo" | "concluido" | "cancelado"
  dataContratacao: string
  dataInicio?: string
  dataFim?: string
  valor: number
  observacoes?: string
  avaliacaoCliente?: number
  comentarioCliente?: string
  avaliacaoFornecedor?: number
  comentarioFornecedor?: string
  createdAt: string
  updatedAt: string
  servico?: Service
  cliente?: {
    id: string
    nome: string
    email: string
    telefone?: string
  }
  pet?: {
    id: string
    nome: string
    especie: string
    raca?: string
  }
  petshop?: {
    id: string
    nome: string
    email: string
    telefone?: string
  }
  fornecedor?: {
    id: string
    nome: string
    email: string
    telefone?: string
  }
}

export interface ContractServiceRequest {
  servicoId: string
  petId?: string // Obrigatório para clientes
  observacoes?: string
  dataInicio?: string
}

export interface ServiceCategory {
  id: string
  nome: string
  descricao?: string
  icone?: string
  cor?: string
  ativo: boolean
}

export interface ServiceProvider {
  id: string
  nome: string
  tipo: "petshop" | "fornecedor"
  email: string
  telefone?: string
  endereco?: string
  cidade?: string
  estado?: string
  avaliacao?: number
  totalAvaliacoes?: number
  servicos: Service[]
  especialidades?: string[]
  horarioFuncionamento?: string
  foto?: string
  ativo: boolean
  verificado: boolean
  createdAt: string
}

export interface ServiceSearch {
  query?: string
  categoria?: string
  cidade?: string
  estado?: string
  precoMin?: number
  precoMax?: number
  avaliacao?: number
  disponivel?: boolean
  tipo?: "petshop" | "fornecedor"
  ordenarPor?: "preco" | "avaliacao" | "distancia" | "nome"
  ordem?: "asc" | "desc"
  page?: number
  limit?: number
}

export interface ServiceStats {
  totalServicos: number
  servicosAtivos: number
  totalContratos: number
  contratosAtivos: number
  faturamentoTotal: number
  faturamentoMensal: number
  avaliacaoMedia: number
  categoriasMaisContratadas: Array<{
    categoria: string
    total: number
  }>
  provedoresMaisContratados: Array<{
    id: string
    nome: string
    tipo: "petshop" | "fornecedor"
    total: number
  }>
}
