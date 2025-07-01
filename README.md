# B-Pet 🐾

Uma plataforma completa para gestão de pets, conectando clientes, petshops, fornecedores e parceiros em um ecossistema integrado.

## 📋 Sobre o Projeto

B-Pet é uma aplicação web moderna desenvolvida para facilitar a gestão e cuidado de animais de estimação. A plataforma oferece diferentes dashboards e funcionalidades específicas para cada tipo de usuário, criando uma experiência personalizada e eficiente.

### 👥 Tipos de Usuário

- **Cliente** - Donos de pets que podem gerenciar seus animais, agendar serviços e acompanhar histórico médico
- **Petshop** - Estabelecimentos que oferecem serviços e produtos para pets
- **Fornecedor** - Empresas que fornecem produtos para petshops
- **Parceiro** - Profissionais que oferecem serviços especializados
- **Empresa** - Organizações corporativas com benefícios pet
- **Administrador** - Gestão completa da plataforma

## 🚀 Tecnologias Utilizadas

### Core
- **Node.js 20.0.0** - Runtime JavaScript
- **Next.js 14.2+** - Framework React com App Router
- **React 18.3+** - Biblioteca para interfaces de usuário
- **TypeScript 5.4+** - Linguagem com tipagem estática

### Estilização & UI
- **Tailwind CSS 3.4+** - Framework CSS utilitário
- **shadcn/ui** - Biblioteca de componentes modernos
- **Radix UI 2.0+** - Primitivos de UI acessíveis
- **Lucide React** - Biblioteca de ícones SVG

### Ferramentas de Desenvolvimento
- **ESLint** - Linter para JavaScript/TypeScript
- **PostCSS** - Processador CSS
- **Autoprefixer** - Prefixos CSS automáticos

## 📦 Instalação

### Pré-requisitos
- Node.js 20.0.0 ou superior
- npm ou yarn

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

3. **Execute o projeto em modo de desenvolvimento**
\`\`\`bash
npm run dev
# ou
yarn dev
\`\`\`

4. **Acesse a aplicação**
Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## 🏗️ Estrutura do Projeto

\`\`\`
📁 b-pet/
├── 📁 app/                     # App Router do Next.js
│   ├── 📁 dashboard/          # Dashboards por tipo de usuário
│   │   ├── 📁 cliente/        # Dashboard do cliente
│   │   ├── 📁 petshop/        # Dashboard do petshop
│   │   ├── 📁 fornecedor/     # Dashboard do fornecedor
│   │   ├── 📁 parceiro/       # Dashboard do parceiro
│   │   ├── 📁 empresa/        # Dashboard da empresa
│   │   └── 📁 administrador/  # Dashboard do admin
│   ├── 📁 meus-pets/          # Gestão de pets
│   ├── 📁 perfil/             # Páginas de perfil
│   ├── 📁 cartao-pet/         # Cartão de descontos
│   ├── 📁 campanhas/          # Campanhas de doação
│   ├── 📁 feedback/           # Sistema de feedback
│   └── 📄 page.tsx            # Página de login
├── 📁 components/             # Componentes reutilizáveis
│   ├── 📁 ui/                 # Componentes shadcn/ui
│   ├── 📄 sidebar-menu.tsx    # Menu lateral
│   ├── 📄 floating-buttons.tsx # Botões flutuantes
│   └── 📄 unified-header.tsx  # Cabeçalho unificado
├── 📁 hooks/                  # Custom hooks
├── 📁 lib/                    # Utilitários
├── 📁 public/                 # Assets estáticos
└── 📁 styles/                 # Estilos globais
\`\`\`

## ✨ Funcionalidades Principais

### 🏠 Dashboards Personalizados
- Dashboard específico para cada tipo de usuário
- Métricas e KPIs relevantes
- Acesso rápido às funcionalidades principais

### 🐕 Gestão de Pets
- Cadastro e perfil completo dos pets
- Histórico médico e vacinas
- Agendamento de serviços

### 💳 Cartão Pet
- Sistema de descontos e benefícios
- Validação de clientes e fornecedores
- Programa de fidelidade

### 📱 Interface Responsiva
- Design adaptável para todos os dispositivos
- Botões flutuantes para acesso rápido
- Navegação intuitiva

### 🔍 Sistema de Busca
- Busca avançada de usuários
- Filtros por tipo e localização
- Resultados em tempo real

### 📊 Relatórios e Analytics
- Métricas de uso da plataforma
- Relatórios de vendas e serviços
- Dashboard administrativo completo

## 🛠️ Scripts Disponíveis

\`\`\`bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar em produção
npm run start

# Linting
npm run lint

# Verificação de tipos
npm run type-check
\`\`\`

## 🎨 Padrões de Design

### Cores Principais
- **Primária**: Azul (#3B82F6)
- **Secundária**: Verde (#10B981)
- **Accent**: Laranja (#F59E0B)
- **Neutros**: Cinzas (#6B7280, #9CA3AF, #D1D5DB)

### Componentes
- Uso consistente do shadcn/ui
- Ícones da biblioteca Lucide React
- Tipografia responsiva com Tailwind CSS

## 🔧 Configuração de Ambiente

### Variáveis de Ambiente
Crie um arquivo `.env.local` na raiz do projeto:

\`\`\`env
# Configurações da aplicação
NEXT_PUBLIC_APP_NAME=B-Pet
NEXT_PUBLIC_APP_VERSION=1.0.0

# URLs da API (quando implementada)
# NEXT_PUBLIC_API_URL=http://localhost:3001
\`\`\`

## 📱 Responsividade

A aplicação é totalmente responsiva e otimizada para:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large Desktop (1440px+)

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Desenvolvido por

**Bruno Lombardi**
- GitHub: [@brunolombardidev](https://github.com/brunolombardidev)

---

<div align="center">
  <p>Feito com ❤️ para o mundo pet 🐾</p>
</div>
