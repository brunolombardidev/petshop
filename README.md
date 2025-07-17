# 🐾 B-Pet - Plataforma de Gestão Pet

B-Pet é uma plataforma completa para gestão de pets, conectando clientes, petshops, fornecedores e empresas em um ecossistema integrado de cuidados e serviços para animais de estimação.

## 🚀 Tecnologias Utilizadas

### Frontend Framework
- **Next.js** `14.2.5` - Framework React para produção
- **React** `18.3.1` - Biblioteca para interfaces de usuário
- **TypeScript** `5.5.4` - Superset tipado do JavaScript

### Styling & UI
- **Tailwind CSS** `3.4.1` - Framework CSS utilitário
- **Radix UI** `1.1.0` - Componentes primitivos acessíveis
- **Lucide React** `0.263.1` - Biblioteca de ícones
- **Class Variance Authority** `0.7.0` - Utilitário para variantes de classe
- **Tailwind Merge** `2.3.0` - Merge inteligente de classes Tailwind
- **clsx** `2.1.1` - Utilitário para classes condicionais

### Formulários & Validação
- **React Hook Form** `7.52.1` - Biblioteca para formulários performáticos
- **Zod** `3.23.8` - Schema de validação TypeScript-first
- **@hookform/resolvers** `3.9.0` - Resolvers para React Hook Form

### Estado & Dados
- **Zustand** `4.5.4` - Gerenciamento de estado leve
- **SWR** `2.2.5` - Fetching de dados com cache
- **React Query** `5.51.1` - Gerenciamento de estado servidor

### Utilitários
- **Date-fns** `3.6.0` - Biblioteca moderna para manipulação de datas
- **React Dropzone** `14.2.3` - Componente para upload de arquivos
- **Sonner** `1.5.0` - Biblioteca de toast notifications

### Desenvolvimento
- **ESLint** `8.57.0` - Linter para JavaScript/TypeScript
- **Prettier** `3.3.2` - Formatador de código
- **PostCSS** `8.4.31` - Ferramenta para transformar CSS
- **Autoprefixer** `10.4.16` - Plugin PostCSS para prefixos CSS

## 📁 Estrutura do Projeto

\`\`\`
src/
├── app/                    # App Router do Next.js
│   ├── (auth)/            # Grupo de rotas de autenticação
│   ├── dashboard/         # Dashboards por tipo de usuário
│   ├── meus-pets/         # Gestão de pets
│   ├── campanhas/         # Sistema de campanhas
│   ├── feedback/          # Sistema de feedback
│   └── ...
├── components/            # Componentes reutilizáveis
│   ├── ui/               # Componentes base (shadcn/ui)
│   └── ...
├── hooks/                # Custom hooks
├── lib/                  # Utilitários e configurações
├── services/             # Serviços de API
├── types/                # Definições de tipos TypeScript
└── styles/               # Arquivos de estilo globais
\`\`\`

## 🎯 Funcionalidades Principais

### 👤 Gestão de Usuários
- Sistema multi-tenant (Cliente, Petshop, Fornecedor, Empresa, Administrador)
- Autenticação JWT com refresh tokens
- Perfis personalizados por tipo de usuário
- Sistema de permissões granular

### 🐕 Gestão de Pets
- Cadastro completo de pets com fotos
- Histórico médico e vacinas
- Lembretes automáticos
- Cartão pet com benefícios

### 🏪 Marketplace
- Catálogo de produtos e serviços
- Sistema de busca avançada
- Avaliações e comentários
- Gestão de estoque

### 💳 Sistema de Benefícios
- Cartão pet com descontos
- Programa de indicações
- Campanhas promocionais
- Relatórios de economia

### 📊 Analytics & Relatórios
- Dashboard personalizado por usuário
- Relatórios de vendas e performance
- Métricas de engajamento
- Exportação de dados

## 🛠️ Instalação e Configuração

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Git

### Instalação

\`\`\`bash
# Clone o repositório
git clone https://github.com/seu-usuario/bpet-frontend.git

# Entre no diretório
cd bpet-frontend

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local

# Execute o projeto em desenvolvimento
npm run dev
\`\`\`

### Variáveis de Ambiente

\`\`\`env
NEXT_PUBLIC_API_URL=https://bpetback.atrativozap.com.br/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

## 🚀 Scripts Disponíveis

\`\`\`bash
npm run dev          # Executa em modo desenvolvimento
npm run build        # Gera build de produção
npm run start        # Executa build de produção
npm run lint         # Executa linting
npm run type-check   # Verifica tipos TypeScript
\`\`\`

## 🔗 Integração com Backend

A aplicação está configurada para integrar com a API REST em:
`https://bpetback.atrativozap.com.br/api`

### Principais Endpoints
- `/auth/*` - Autenticação e autorização
- `/users/*` - Gestão de usuários
- `/pets/*` - CRUD de pets
- `/products/*` - Catálogo de produtos
- `/services/*` - Serviços disponíveis
- `/campaigns/*` - Campanhas promocionais

## 📱 Responsividade

A aplicação é totalmente responsiva, otimizada para:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large Desktop (1440px+)

## 🎨 Design System

Baseado no **shadcn/ui** com customizações:
- Paleta de cores B-Pet
- Componentes reutilizáveis
- Tokens de design consistentes
- Modo escuro/claro

## 🔒 Segurança

- Autenticação JWT
- Sanitização de inputs
- Validação client/server-side
- Headers de segurança
- Rate limiting

## 📈 Performance

- Server-Side Rendering (SSR)
- Static Site Generation (SSG)
- Image optimization
- Code splitting automático
- Lazy loading de componentes

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Equipe

- **Frontend**: Desenvolvido com Next.js e TypeScript
- **Backend**: API REST integrada
- **Design**: Interface moderna e intuitiva

---

**B-Pet** - Cuidando do seu pet com tecnologia 🐾
