# 🏆 Gincana da Unidade - Manhã de Pentecostes

Sistema de gerenciamento de gincanas para a **Paróquia de São José** em Sobral, Ceará. Uma aplicação web moderna e responsiva para organizar e acompanhar competições entre equipes durante eventos paroquiais.

![Gincanas da Manhã](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow)
![Next.js](https://img.shields.io/badge/Next.js-14.0-black)
![React](https://img.shields.io/badge/React-18.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3-cyan)

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Como Usar](#-como-usar)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Deploy](#-deploy)
- [Contribuição](#-contribuição)
- [Licença](#-licença)
- [Contato](#-contato)

## 🎯 Sobre o Projeto

O **Gincanas da Manhã** é um sistema desenvolvido especialmente para gerenciar competições durante o evento de Pentecostes da Paróquia de São José. O sistema permite:

- Organizar equipes (Vermelho, Lilás e Azul)
- Gerenciar jogos e atividades
- Registrar participantes e resultados
- Acompanhar pontuação em tempo real
- Histórico completo de todas as rodadas

### 🎨 Design

O sistema apresenta uma interface moderna e intuitiva, com:
- Design responsivo para todos os dispositivos
- Cores temáticas das equipes
- Animações suaves e interativas
- Brasão oficial da paróquia
- Gradientes e sombras modernas

## ✨ Funcionalidades

### 🔐 **Sistema de Autenticação**
- [x] Login seguro com usuário e senha
- [x] Cadastro de novos usuários
- [x] Validação de senhas robustas
- [x] Sessão persistente

### 🏃‍♂️ **Gerenciamento de Jogos**
- [x] 16 jogos pré-definidos
- [x] Adicionar jogos personalizados
- [x] Excluir jogos customizados
- [x] Contador de rodadas por jogo

### 👥 **Sistema de Equipes**
- [x] 3 equipes fixas (Vermelho, Lilás, Azul)
- [x] Pontuação automática
- [x] Placar em tempo real
- [x] Cores temáticas

### 📊 **Gerenciamento de Rodadas**
- [x] Registrar participantes
- [x] Definir equipe vencedora
- [x] Histórico completo
- [x] Excluir rodadas incorretas
- [x] Numeração automática

### 🎨 **Interface Moderna**
- [x] Animações no hover e click
- [x] Design responsivo
- [x] Gradientes e sombras
- [x] Feedback visual imediato
- [x] Ícones interativos

## 🛠 Tecnologias

### **Frontend**
- **[Next.js 14](https://nextjs.org/)** - Framework React
- **[React 18](https://reactjs.org/)** - Biblioteca JavaScript
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS

### **UI Components**
- **[shadcn/ui](https://ui.shadcn.com/)** - Componentes reutilizáveis
- **[Radix UI](https://www.radix-ui.com/)** - Primitivos acessíveis
- **[Lucide React](https://lucide.dev/)** - Ícones modernos

### **Armazenamento**
- **localStorage** - Dados locais do navegador
- **Supabase** (configurado) - Banco de dados em nuvem

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**
- **Git**

```bash
# Verificar versões
node --version  # v18.0.0+
npm --version   # 9.0.0+
git --version   # 2.0.0+
```

## 🚀 Instalação

### **1. Clonar o repositório**
```bash
git clone https://github.com/neto-uso-trabalho/Site_Gincana.git
cd gincanas-pentecostes
```

### **2. Instalar dependências**
```bash
npm install
```

### **3. Configurar ambiente**
```bash
# Copiar arquivo de ambiente (opcional)
cp .env.example .env.local
```

### **4. Executar em desenvolvimento**
```bash
npm run dev
```

### **5. Acessar aplicação**
Abra [http://localhost:3000](http://localhost:3000) no navegador.

## 📖 Como Usar

### **1. Primeiro Acesso**
1. Acesse a página inicial
2. Clique em "Não tem uma conta? Criar conta"
3. Preencha os dados e crie sua conta
4. Faça login com suas credenciais

### **2. Gerenciar Jogos**
1. No dashboard, visualize todos os jogos disponíveis
2. Clique em "Adicionar Jogo" para criar novos jogos
3. Clique em um jogo para gerenciar suas rodadas

### **3. Registrar Rodadas**
1. Selecione um jogo
2. Preencha os participantes (separados por vírgula)
3. Escolha a equipe vencedora
4. Clique em "Adicionar Rodada"

### **4. Acompanhar Pontuação**
- O placar é atualizado automaticamente
- Cada vitória = 1 ponto para a equipe
- Visualize o histórico completo de cada jogo

## 📁 Estrutura do Projeto

```
Site_Gincana/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Página principal (Login + Dashboard)
│   │   ├── register/
│   │   │   └── page.tsx          # Página de cadastro
│   │   ├── layout.tsx            # Layout principal
│   │   └── globals.css           # Estilos globais
│   ├── components/
│   │   └── ui/                   # Componentes shadcn/ui
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       └── ...
│   └── lib/
│       ├── utils.ts              # Utilitários
│       ├── supabase.ts           # Configuração Supabase
│       └── auth.ts               # Funções de autenticação
├── public/
│   └── brasao.jpeg               # Brasão da paróquia
├── components.json               # Configuração shadcn/ui
├── tailwind.config.ts            # Configuração Tailwind
├── next.config.js                # Configuração Next.js
├── package.json                  # Dependências
└── README.md                     # Este arquivo
```

## 🎮 Jogos Incluídos

O sistema vem com 16 jogos pré-configurados:

1. **Passa água** - Jogo de coordenação em equipe
2. **Repolho** - Atividade de agilidade
3. **Futebol de Banho** - Esporte adaptado
4. **Pula corda** - Coordenação e ritmo
5. **Passe ou repassa** - Quiz em equipe
6. **Bambolê** - Habilidade individual
7. **Corrida do Balão** - Velocidade e cuidado
8. **Adivinhe a música** - Conhecimento musical
9. **Futebol de Mão** - Esporte adaptado
10. **Corrida de saco** - Corrida tradicional
11. **Corrida de colher e limão** - Equilíbrio
12. **Carrinho de mão** - Trabalho em dupla
13. **Mangueira com balão** - Precisão
14. **Tiro ao alvo no balão** - Pontaria
15. **Grito da paz** - Atividade vocal
16. **Improviso em peça teatral** - Criatividade

## 🤝 Contribuição

Contribuições são sempre bem-vindas! Para contribuir:

1. **Fork** o projeto
2. Crie uma **branch** para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. Abra um **Pull Request**

### **Padrões de Código**
- Use **TypeScript** para tipagem
- Siga os padrões do **ESLint**
- Mantenha componentes **pequenos e reutilizáveis**
- Adicione **comentários** em código complexo

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Contato

**Desenvolvedor**

- 📧 Email: aragao938@gmail.com

---

## 🙏 Agradecimentos

- **Paróquia de São José** pela oportunidade
- **Comunidade Next.js** pelas ferramentas
- **shadcn/ui** pelos componentes
- **Vercel** pela hospedagem gratuita

---

<div align="center">

**Feito com ❤️ para a comunidade da Paróquia de São José**

[⬆ Voltar ao topo](#-gincanas-da-manhã---pentecostes)

