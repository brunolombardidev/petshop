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

## 🚀 Tecnologias Utilizadas

### Core
- **Node.js 20.0.0** - Runtime JavaScript moderno
- **Next.js 14.2+** - Framework React com App Router
- **React 18.3+** - Biblioteca para interfaces de usuário
- **TypeScript 5.4+** - Linguagem com tipagem estática

### Estilização & UI
- **Tailwind CSS 3.4+** - Framework CSS utilitário
- **shadcn/ui** - Biblioteca de componentes modernos
- **Radix UI 2.0+** - Primitivos de UI acessíveis
- **Lucide React** - Ícones SVG otimizados

### Ferramentas de Desenvolvimento
- **ESLint 8.57+** - Linter para JavaScript/TypeScript
- **PostCSS 8.4+** - Processador CSS
- **Autoprefixer** - Prefixos CSS automáticos

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

3. **Configure as variáveis de ambiente**
\`\`\`bash
cp .env.example .env.local
\`\`\`

4. **Execute o projeto em desenvolvimento**
\`\`\`bash
npm run dev
# ou
yarn dev
\`\`\`

5. **Acesse a aplicação**
\`\`\`
http://localhost:3000
\`\`\`

## 🏗️ Estrutura do Projeto

\`\`\`
b-pet/
├── 📁 app/                    # App Router do Next.js
│   ├── 📁 dashboard/         # Dashboards por tipo de usuário
│   │   ├── 📁 cliente/       # Dashboard do cliente
│   │   ├── 📁 petshop/       # Dashboard do petshop
│   │   ├── 📁 fornecedor/    # Dashboard do fornecedor
│   │   ├── 📁 empresa/       # Dashboard da empresa
│   │   └── 📁 administrador/ # Dashboard do admin
│   ├── 📁 perfil/           # Páginas de perfil unificado
│   ├── 📁 meus-pets/        # Gestão de pets do cliente
│   ├── 📁 cartao-pet/       # Sistema de cartão de descontos
│   ├── 📁 campanhas/        # Campanhas de doação
│   ├── 📁 indicacoes/       # Sistema de indicações
│   ├── 📁 feedback/         # Sistema de feedback
│   ├── 📁 assinatura/       # Gestão de assinaturas
│   ├── 📁 configuracoes/    # Configurações do usuário
│   ├── 📄 page.tsx          # Página de login
│   ├── 📄 cadastro/         # Página de cadastro
│   ├── 📄 recuperar/        # Recuperação de senha
│   ├── 📄 layout.tsx        # Layout principal
│   └── 📄 globals.css       # Estilos globais
├── 📁 components/            # Componentes reutilizáveis
│   ├── 📁 ui/               # Componentes shadcn/ui
│   ├── 📄 floating-buttons.tsx # Botões flutuantes
│   ├── 📄 sidebar-menu.tsx     # Menu lateral
│   └── 📄 unified-header.tsx   # Cabeçalho unificado
├── 📁 hooks/                # Custom hooks
├── 📁 lib/                  # Utilitários e configurações
├── 📁 public/               # Arquivos estáticos
├── 📄 package.json          # Dependências do projeto
├── 📄 tailwind.config.js    # Configuração do Tailwind
├── 📄 tsconfig.json         # Configuração do TypeScript
└── 📄 next.config.mjs       # Configuração do Next.js
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
- Botões flutuantes para acesso rápido
- Experiência otimizada mobile-first

## 🛠️ Scripts Disponíveis

\`\`\`bash
# Desenvolvimento
npm run dev          # Inicia o servidor de desenvolvimento

# Build
npm run build        # Gera build de produção
npm run start        # Inicia servidor de produção

# Qualidade de Código
npm run lint         # Executa ESLint
npm run lint:fix     # Corrige problemas do ESLint automaticamente

# Tipo de Verificação
npm run type-check   # Verifica tipos TypeScript
\`\`\`

## 🎨 Padrões de Design

### Cores Principais
- **Laranja**: `from-orange-500 to-amber-500` - Cor principal da marca
- **Gradientes**: Utilizados em cards e botões para criar profundidade
- **Neutros**: Tons de cinza para texto e backgrounds

### Componentes
- **Cards**: Bordas arredondadas (`rounded-2xl`) com sombras suaves
- **Botões**: Gradientes com hover effects e transições suaves
- **Ícones**: Lucide React para consistência visual

### Layout
- **Grid System**: CSS Grid e Flexbox para layouts responsivos
- **Spacing**: Sistema de espaçamento consistente do Tailwind
- **Typography**: Hierarquia clara com pesos e tamanhos definidos

## 🔧 Configuração de Ambiente

### Variáveis de Ambiente
\`\`\`env
# Exemplo de .env.local
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Banco de Dados (se aplicável)
DATABASE_URL=postgresql://...

# Autenticação (se aplicável)
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
\`\`\`

### Configuração do Editor
Recomendamos usar VS Code com as seguintes extensões:
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- TypeScript Importer
- Prettier - Code formatter
- ESLint

## 📱 Funcionalidades por Tipo de Usuário

### 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Contato

- **Projeto**: B-Pet
- **Repositório**: [https://github.com/seu-usuario/b-pet](https://github.com/seu-usuario/b-pet)

---

Desenvolvido com ❤️ para o universo pet 🐾
