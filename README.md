# Guia de Treinamento — Cadastro de Pessoa | Famol Móveis e Eletros

Um guia interativo e elegante para o treinamento da equipe de Crédito da Famol Móveis e Eletros. Esta aplicação foi desenvolvida para apresentar, passo a passo, o fluxo completo de Cadastro de Pessoa Física, Jurídica e Estrangeira. 

Construída para parecer uma apresentação de slides de alto padrão, ela permite navegação rápida via teclado e possui micro-interações fluidas.

## 🚀 Tecnologias Utilizadas

Este projeto foi gerado com **Next.js** (App Router) e faz uso das seguintes tecnologias:

- **[Next.js](https://nextjs.org/)** (v15+) — Framework React com App Router e Server/Client Components.
- **[Tailwind CSS v4](https://tailwindcss.com/)** — Framework utilitário de CSS focado em performance, configurado com variáveis modernas, gradients refinados e suporte a *dark mode*.
- **[Framer Motion](https://motion.dev/)** — Biblioteca de animação para React (via `motion/react`), garantindo transições de página e micro-interações elegantes e profissionais.
- **[Lucide React](https://lucide.dev/)** — Ícones minimalistas e bonitos em toda a interface.
- **[TypeScript](https://www.typescriptlang.org/)** — Tipagem estática para maior segurança e escalabilidade.

## ✨ Funcionalidades

- **Apresentação em Slides Interativos**: Navegação semelhante ao PowerPoint ou Keynote.
- **Navegação por Teclado**: 
  - Avançar: `Enter`, `Seta para Direita`, `Espaço` ou `Page Down`
  - Voltar: `Seta para Esquerda`, `Backspace` ou `Page Up`
  - Ir para o Ínicio: `Home`
  - Ir para o Final: `End`
- **Design UI/UX Premium**: Sistema de cores estilizado (`oklch`), paleta sofisticada baseada em "Azul Marinho" e "Laranja", sombras dinâmicas, texturas que remetem a papel (`paper-grain`) e fontes elegantes (**Fraunces** e **Inter**).

## 📦 Como Rodar o Projeto Localmente

### Pré-requisitos
- Node.js versão **18.18.0** ou superior.

### Instalação

1. Clone ou extraia o repositório em sua máquina.
2. Instale as dependências executando:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

4. Abra o navegador e acesse [http://localhost:3000](http://localhost:3000).

## 📂 Estrutura de Arquivos Principal

- `app/page.tsx`: Componente principal que gerencia o estado dos slides, controles de teclado, barra de progresso e layout de toda a apresentação.
- `app/layout.tsx`: Configurações globais de SEO (Metadados da aplicação) e injeção do sistema de fontes elegantes (`Fraunces` e `Inter`).
- `app/globals.css`: Variáveis CSS customizadas, utilitários do Tailwind v4 (incluindo sombreamento, backgrounds dinâmicos) e design system.

## 🛠️ Build de Produção

Para otimizar a aplicação para o ambiente de produção, execute:

```bash
npm run build
```

Em seguida, para testar a versão construída:

```bash
npm run start
```
