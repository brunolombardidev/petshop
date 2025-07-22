# B-Pet - Sistema de Gestão para Pet Shops

Sistema completo de gestão para pet shops, clientes, fornecedores e empresas do setor pet.

## 🚀 Tecnologias

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Estado**: React Context API
- **Autenticação**: JWT com refresh tokens
- **API**: REST API integrada
- **Build**: Turbopack (desenvolvimento)

## 📋 Pré-requisitos

- Node.js 18.17+ ou superior
- npm 9.0+ ou superior
- Git

## 🔧 Instalação

1. **Clone o repositório**
\`\`\`bash
git clone <repository-url>
cd petshop-app
\`\`\`

2. **Instale as dependências**
\`\`\`bash
npm install
\`\`\`

3. **Configure as variáveis de ambiente**
\`\`\`bash
cp .env.example .env.local
\`\`\`

Edite o arquivo `.env.local` com suas configurações:
\`\`\`env
NEXT_PUBLIC_API_BASE_URL=http://bpetback.atrativozap.com.br/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
\`\`\`

4. **Inicie o servidor de desenvolvimento**
\`\`\`bash
npm run dev
\`\`\`

O aplicativo estará disponível em `http://localhost:3000`

## 🏗️ Scripts Disponíveis

\`\`\`bash
# Desenvolvimento
npm run dev          # Inicia o servidor de desenvolvimento
npm run build        # Cria build de produção
npm run start        # Inicia servidor de produção
npm run lint         # Executa ESLint
npm run type-check   # Verifica tipos TypeScript
\`\`\`

## 📁 Estrutura do Projeto

\`\`\`
petshop-app/
├── app/                    # App Router (Next.js 14)
│   ├── dashboard/         # Dashboards por tipo de usuário
│   ├── campanhas/         # Gestão de campanhas
│   ├── feedback/          # Sistema de feedback
│   ├── servicos/          # Contratação de serviços
│   ├── assinatura/        # Gestão de assinaturas
│   └── ...
├── components/            # Componentes reutilizáveis
│   ├── ui/               # Componentes base (shadcn/ui)
│   └── ...
├── hooks/                # Custom hooks
├── lib/                  # Utilitários e configurações
├── services/             # Serviços de API
├── types/                # Definições de tipos TypeScript
└── public/               # Arquivos estáticos
\`\`\`

## 👥 Tipos de Usuário

O sistema suporta diferentes tipos de usuário:

- **Cliente**: Contrata serviços, gerencia pets
- **Pet Shop**: Oferece serviços, gerencia clientes
- **Fornecedor**: Fornece produtos/serviços para pet shops
- **Empresa**: Gestão empresarial
- **Administrador**: Gestão completa do sistema

## 🔐 Autenticação

- Sistema de login com múltiplos tipos de usuário
- JWT com refresh tokens automático
- Redirecionamento baseado no perfil do usuário
- Recuperação de senha via email

## 💳 Módulos Principais

### 1. **Sistema de Assinaturas**
- Gestão de planos e assinaturas
- Faturas e pagamentos
- Estatísticas para administradores

### 2. **Contratação de Serviços**
- Busca avançada de provedores
- Validação via QR Code
- Sistema de avaliações
- Gestão de contratos

### 3. **Gestão de Campanhas**
- Criação e gestão de campanhas
- Segmentação de público
- Relatórios de performance

### 4. **Sistema de Feedback**
- Coleta de feedback dos usuários
- Análise de satisfação
- Relatórios detalhados

## 🌐 API Integration

O sistema integra com a API REST em:
\`\`\`
http://bpetback.atrativozap.com.br/api
\`\`\`

### Principais Endpoints:
- `/auth/*` - Autenticação
- `/users/*` - Gestão de usuários
- `/assinaturas/*` - Assinaturas e planos
- `/servicos/*` - Serviços e contratações
- `/campanhas/*` - Campanhas de marketing
- `/feedback/*` - Sistema de feedback

## 🎨 Interface

- Design responsivo para desktop e mobile
- Tema claro/escuro
- Componentes acessíveis (WCAG)
- Animações suaves
- Feedback visual em tempo real

## 🔧 Desenvolvimento

### Adicionando Novos Componentes

\`\`\`bash
# Usando shadcn/ui CLI (se disponível)
npx shadcn@latest add [component-name]

# Ou crie manualmente em components/ui/
\`\`\`

### Estrutura de Hooks

\`\`\`typescript
// hooks/use-example.ts
export function useExample() {
  // Lógica do hook
  return {
    // Estado e funções
  }
}
\`\`\`

### Estrutura de Serviços

\`\`\`typescript
// services/example.service.ts
export class ExampleService {
  static async getData() {
    // Chamadas para API
  }
}
\`\`\`

## 🚀 Deploy

### Vercel (Recomendado)
\`\`\`bash
npm run build
# Deploy automático via Git integration
\`\`\`

### Build Manual
\`\`\`bash
npm run build
npm run start
\`\`\`

## 🐛 Troubleshooting

### Problemas Comuns

1. **Erro de variáveis de ambiente**
   - Verifique se `.env.local` existe e está configurado

2. **Erro de build TypeScript**
   - Execute `npm run type-check` para ver erros específicos

3. **Problemas de API**
   - Verifique se a API está acessível
   - Confirme as URLs no `.env.local`

4. **Cache corrompido**
   \`\`\`bash
   rm -rf .next
   npm run dev
   \`\`\`

## 📝 Licença

Este projeto é propriedade da B-Pet e está sob licença proprietária.

## 🤝 Contribuição

Para contribuir com o projeto:

1. Crie uma branch para sua feature
2. Faça commit das mudanças
3. Abra um Pull Request
4. Aguarde review

## 📞 Suporte

Para suporte técnico, entre em contato com a equipe de desenvolvimento.

---

**B-Pet** - Conectando o mundo pet 🐾
