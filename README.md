# Nota Fácil Downloader - Arquitetura de Conversão & LLM Visibility 🚀

Este repositório não é apenas um site estático. É uma **Landing Page de Alta Conversão com Blog Integrado**, orquestrada para dominar o nicho contábil (NFS-e Nacional, Reforma Tributária 2026). Utilizando **Astro SSG** e **Tailwind CSS**, a arquitetura também embute um robusto sistema de multi-agentes de inteligência artificial na pasta `.agent`.

---

## 🤖 Ecossistema de IA e Automação (Pasta `.agent`)

Para escalar conteúdo com extrema qualidade técnica e SEO voltado para LLMs (AEO/GEO), o repositório conta com **Agentes Especializados** que você pode invocar (via Claude, Gemini ou plataformas compatíveis) entregando diretamente os prompts localizados na pasta `.agent/`:

1. **`redator.md` (Redator Contábil Sênior):**
   * Prompt master responsável por ler o contexto do produto e criar posts quinzenais/semanais para a pasta `src/content/blog`.
   * **Superpoder:** Ele também comanda ferramentas internas de IA (ex: DALL-E / Gemini Imagen) para gerar as ilustrações de **Capa do Blog** localmente e salvá-las no projeto (`/public/blog/imagens`).
   * Foca nas pautas quentes: NT 007, Malha Fina NFS-e 2026, Erros do Portal Nacional.

2. **`especialista-astro.md` (Arquiteto Frontend):**
   * Agente técnico focado em manter a base de código impecável, exigindo rigor em *Core Web Vitals* (LCP < 1.8s), SEO on-page, e estrutura limpa sem Javascript desnecessário (SSR/Estático).

3. **`contexto-produto.md` (Source of Truth):**
   * Manifesto do produto. É injetado nos demais agentes para que toda redação conheça perfeitamente as funcionalidades do robô (Download XML/PDF em Lote, anti-captcha, suporte para login com A1 sem limites de CNPJ).

---

## 🛠️ Stack Tecnológico

*   **Framework:** [Astro 5x/6x](https://astro.build/) - Geração de Páginas Estáticas (SSG) hipervelozes e Content Collections nativos.
*   **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first e design system customizado (UI premium, texturas Grid, blur/glassmorphism).
*   **Rastreamento Global:** Google Tag Manager em malha fina nativa (SSR Bypass com diretiva `is:inline`).
*   **SEO Automático:** XML Sitemaps dinâmicos gerados no ciclo de build.

---

## 📝 Blog & Content Collections

A arquitetura de blog vive na pasta `src/content/blog` utilizando **Markdown (.md)** puro. Nenhuma base de dados (MySQL/Postgres) é exigida; o Astro resolve o mapeamento e compila páginas otimizadas no tempo de build.

### Como Publicar (via IA ou Manualmente):
1. Adicione a **Capa do Artigo** gerada ou escolhida na pasta `public/assets/blog/`.
2. Crie um arquivo em `src/content/blog/titulo-do-post.md`.
3. Preencha o metadado (Frontmatter) no cabeçalho do arquivo:
```markdown
---
title: "Título matador do artigo"
description: "Meta preview contendo a palavra chave atrativa para o contador."
pubDate: 2026-03-07
author: "Nota Fácil"
image: "/assets/blog/capa-post.jpg"
tags: ["NFS-e", "Contabilidade"]
---
[Seu Conteúdo começa aqui]
```

---

## ⚙️ Otimizações de Conversion e SEO Implementadas

*   **Sitemap 100% Autônomo:** Configurado via integração oficial `@astrojs/sitemap`. Ele varre as rotas `/` e cada página gerada do diretório `/blog` vinculando-as ao domínio de produção da empresa (`notafacildownloader.contabilcert.com.br`).
*   **Controle de Crawlers (`robots.txt`):** Arquivo raiz indexando os percursos oficiais do sitemap para aceleração orgânica de IA e Google Bots.
*   **Auditoria de Mídia (IFrame Loading):** O vídeo core (Trailer do YouTube) obedece à injeção forçada de `&vq=hd720&hl=pt-br`, burlando resoluções padrão do browser para exibir interface límpida de primeira viagem.
*   **UX Premium / Layout Design:** FAQ em estrutura Grid modular responsiva; suporte redesenhado como Floating Card de luxo; micro-interações nativas implementadas via **AOS**.
*   **Tracking Master (GTM-KHF7CGHF):** Implementação cross-browser do Iframe/Script GTM base aderindo às exigências restritas de renderização estática do Astro.

---

## 💻 Como Rodar (Dev / Localhost)

1. Clone o repósitório.
2. Instale os módulos nativos (Garanta que esteja rodando um Node LTS):
```bash
npm install
```
3. Suba a aplicação de desenvolvimento (hot-reload ativado):
```bash
npm run dev
# Acesse http://localhost:4321
```

---

## 🚀 Como Fazer Deploy / Publicação (CI/CD)

### Vercel (Recomendado - 1 Clique)
1. Conecte o repositório na conta da **Vercel**.
2. Ele identificará o FrameWork Preset como **"Astro"** magicamente.
3. Configure as varíaveis (se aplicável), clique em **Deploy**. A cada push main ele reconstrói toda a plataforma (+ Blog Articles) e gera os caches na CDN global.

### GitHub Pages (Com Astro Actions)
1. Navegue até a raiz de configurações do seu repositório GitHub -> Pages.
2. Troque o Source para **GitHub Actions**. O própio assistente perguntará se quer deployar o "Astro SSG Template".
3. Feito, as actions farão o build do diretório `/dist` da versão estática instantâneamente fornecendo o subdomínio live.

---
_Acelerando infraestruturas e dominando o fechamento fiscal das automações do Brasil._
