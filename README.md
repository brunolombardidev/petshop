# B-Pet - Plataforma Completa para o Universo Pet 🐾

Uma plataforma moderna e completa que conecta tutores de pets, petshops, fornecedores e empresas em um ecossistema integrado para o cuidado e bem-estar animal.

## 📋 Sobre o Projeto

O **B-Pet** é uma aplicação web desenvolvida para revolucionar a forma como pessoas e empresas interagem no universo pet. A plataforma oferece soluções personalizadas para diferentes tipos de usuários, desde tutores que querem cuidar melhor de seus pets até empresas que desejam oferecer benefícios pet para seus colaboradores.

### 👥 Tipos de Usuário

- **🏠 Cliente**: Tutores de pets que buscam serviços e produtos
- **🏪 Petshop**: Estabelecimentos que oferecem produtos e serviços
- **📦 Fornecedor**: Empresas que fornecem produtos para petshops
- **🏢 Empresa**: Organizações que oferecem benefícios pet aos colaboradores
- **⚙️ Administrador**: Gestores da plataforma

## 🚀 Tecnologias e Dependências

### Core Framework
- **Next.js**: `14.2.15` - Framework React com App Router
- **React**: `^18.3.1` - Biblioteca para interfaces de usuário
- **React DOM**: `^18.3.1` - Renderização React para web
- **TypeScript**: `^5.6.3` - Linguagem com tipagem estática

### Estilização e UI
- **Tailwind CSS**: `^3.4.1` - Framework CSS utilitário
- **PostCSS**: `^8.4.49` - Processador CSS
- **Autoprefixer**: `^10.4.20` - Prefixos CSS automáticos
- **clsx**: `^2.1.1` - Utilitário para classes condicionais
- **tailwind-merge**: `^2.5.4` - Merge de classes Tailwind
- **tailwindcss-animate**: `^1.0.7` - Animações Tailwind

### Componentes UI (Radix UI)
- **@radix-ui/react-accordion**: `^1.2.1`
- **@radix-ui/react-alert-dialog**: `^1.1.2`
- **@radix-ui/react-aspect-ratio**: `^1.1.0`
- **@radix-ui/react-avatar**: `^1.1.1`
- **@radix-ui/react-checkbox**: `^1.1.2`
- **@radix-ui/react-collapsible**: `^1.1.1`
- **@radix-ui/react-context-menu**: `^2.2.2`
- **@radix-ui/react-dialog**: `^1.1.2`
- **@radix-ui/react-dropdown-menu**: `^2.1.2`
- **@radix-ui/react-hover-card**: `^1.1.2`
- **@radix-ui/react-label**: `^2.1.0`
- **@radix-ui/react-menubar**: `^1.1.2`
- **@radix-ui/react-navigation-menu**: `^1.2.1`
- **@radix-ui/react-popover**: `^1.1.2`
- **@radix-ui/react-progress**: `^1.1.0`
- **@radix-ui/react-radio-group**: `^1.2.1`
- **@radix-ui/react-scroll-area**: `^1.2.0`
- **@radix-ui/react-select**: `^2.1.2`
- **@radix-ui/react-separator**: `^1.1.0`
- **@radix-ui/react-slider**: `^1.2.1`
- **@radix-ui/react-slot**: `^1.1.0`
- **@radix-ui/react-switch**: `^1.1.1`
- **@radix-ui/react-tabs**: `^1.1.1`
- **@radix-ui/react-toast**: `^1.2.2`
- **@radix-ui/react-toggle**: `^1.1.0`
- **@radix-ui/react-toggle-group**: `^1.1.0`
- **@radix-ui/react-tooltip**: `^1.1.3`

### Ícones e Gráficos
- **lucide-react**: `^0.454.0` - Ícones SVG otimizados
- **recharts**: `^2.13.3` - Biblioteca de gráficos React

### Utilitários e Validação
- **class-variance-authority**: `^0.7.0` - Variantes de componentes
- **cmdk**: `^1.0.0` - Command palette
- **date-fns**: `^4.1.0` - Manipulação de datas
- **embla-carousel-react**: `^8.3.0` - Carousel/slider
- **input-otp**: `^1.4.1` - Input para códigos OTP
- **react-day-picker**: `8.10.1` - Seletor de datas
- **react-hook-form**: `^7.53.2` - Gerenciamento de formulários
- **react-resizable-panels**: `^2.1.4` - Painéis redimensionáveis
- **sonner**: `^1.7.0` - Notificações toast
- **vaul**: `^1.0.0` - Drawer component

### Ferramentas de Desenvolvimento
- **ESLint**: `^8.57.1` - Linter para JavaScript/TypeScript
- **eslint-config-next**: `14.2.15` - Configuração ESLint para Next.js
- **@types/node**: `^20.17.6` - Tipos TypeScript para Node.js
- **@types/react**: `^18.3.12` - Tipos TypeScript para React
- **@types/react-dom**: `^18.3.1` - Tipos TypeScript para React DOM

### Runtime
- **Node.js**: `20.0.0+` - Runtime JavaScript

## 📦 Instalação

### Pré-requisitos
- Node.js 20.0.0 ou superior
- npm 10.0.0+ ou yarn
- Git

### Passos para instalação

1. **Clone o repositório**
\`\`\`bash
git clone https://github.com/seu-usuario/b-pet.git
cd b-pet
\`\`\`

2. **Instale as dependências**
\`\`\`bash
npm install
# ou
yarn install
\`\`\`

3. **Execute o projeto em desenvolvimento**
\`\`\`bash
npm run dev
# ou
yarn dev
\`\`\`

4. **Acesse a aplicação**
\`\`\`
http://localhost:3000
\`\`\`

## 🛠️ Scripts Disponíveis

\`\`\`bash
# Desenvolvimento
npm run dev          # Inicia o servidor de desenvolvimento

# Build
npm run build        # Gera build de produção
npm run start        # Inicia servidor de produção

# Qualidade de Código
npm run lint         # Executa ESLint
\`\`\`

## 🏗️ Estrutura do Projeto

\`\`\`
b-pet/
├── 📁 app/                    # App Router do Next.js
│   ├── 📁 dashboard/         # Dashboards por tipo de usuário
│   ├── 📁 perfil/           # Páginas de perfil unificado
│   ├── 📁 meus-pets/        # Gestão de pets do cliente
│   ├── 📁 cartao-pet/       # Sistema de cartão de descontos
│   ├── 📁 campanhas/        # Campanhas de doação
│   ├── 📁 indicacoes/       # Sistema de indicações
│   ├── 📁 feedback/         # Sistema de feedback
│   ├── 📁 assinatura/       # Gestão de assinaturas
│   ├── 📁 configuracoes/    # Configurações do usuário
│   └── 📁 gestao-produtos/  # Gestão de produtos
├── 📁 components/            # Componentes reutilizáveis
│   └── 📁 ui/               # Componentes shadcn/ui
├── 📁 hooks/                # Custom hooks
├── 📁 lib/                  # Utilitários e configurações
├── 📁 services/             # Serviços de API
├── 📁 types/                # Definições de tipos TypeScript
└── 📁 public/               # Arquivos estáticos
\`\`\`

## ✨ Funcionalidades Principais

### 🎯 Dashboards Personalizados
- Interface específica para cada tipo de usuário
- Métricas e KPIs relevantes
- Navegação intuitiva e responsiva

### 🐕 Gestão de Pets
- Cadastro completo de pets
- Histórico médico e vacinas
- Perfil detalhado com fotos

### 💳 Sistema de Cartão Pet
- Cartão de descontos exclusivo
- Validação de clientes e fornecedores
- Benefícios personalizados

### ❤️ Campanhas de Doação
- Criação e gestão de campanhas
- Sistema de arrecadação
- Transparência nos resultados

### 👥 Sistema de Indicações
- Programa de referência
- Comissões automáticas
- Acompanhamento de status

### 📱 Interface Responsiva
- Design adaptável para todos os dispositivos
- Experiência otimizada mobile-first
- Componentes acessíveis

## 🎨 Padrões de Design

### Cores Principais
- **Laranja**: Cor principal da marca
- **Gradientes**: Utilizados em cards e botões
- **Neutros**: Tons de cinza para texto e backgrounds

### Componentes
- **Cards**: Bordas arredondadas com sombras suaves
- **Botões**: Gradientes com hover effects
- **Ícones**: Lucide React para consistência visual

## 📄 Licença

Este projeto está sob a licença MIT.

---

Desenvolvido com ❤️ para o universo pet 🐾
