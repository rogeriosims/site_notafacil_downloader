# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## O que é este repositório

Landing page + blog de marketing do **Nota Fácil Downloader** (robô desktop de download de NFS-e). Astro 5 puro em modo SSG, Tailwind v4, deploy em Cloudflare. Não há backend, banco de dados nem framework de UI client-side — todo o site é HTML estático gerado no build.

Conteúdo, copy e commits são em **pt-BR**.

## Comandos

```bash
npm run dev       # servidor local em http://localhost:4321
npm run build     # gera dist/
npm run preview   # serve dist/ localmente
npm run deploy    # wrangler deploy (Cloudflare, publica dist/ conforme wrangler.json)
```

Não existe suíte de testes nem linter configurados. A validação prática de uma mudança é `npm run build` (o schema das Content Collections e o `astro:assets` falham o build quando o frontmatter ou o caminho de imagem estão errados) seguido de `npm run preview`.

## Arquitetura

### Camada de páginas

- `src/layouts/BaseLayout.astro` é o único `<head>` do site. Concentra CSP, Consent Mode v2, Open Graph/Twitter, canonical, JSON-LD e o carregamento das libs de CDN. Toda página passa por ele.
- `src/pages/index.astro` é a landing principal (~600 linhas, com calculadora de ROI e modal de download em `<script is:inline>`).
- As demais páginas na raiz de `src/pages/` (`robo-baixar-nfse`, `baixar-xml-nfse`, `automacao-nfse-contabilidade`, etc.) são **páginas de pSEO**: cada uma é uma landing autônoma otimizada para uma palavra-chave, com o markup Tailwind inline. Elas compartilham só o `BaseLayout`, não componentes de seção — duplicação de markup entre elas é intencional.
- `src/components/` tem apenas Header, Footer e CookieConsent (o que aparece em todas as páginas).

### Blog e Content Collections

- Schema em `src/content.config.ts` (loader `glob` sobre `src/content/blog/**/*.md`).
- **O campo `image` usa o helper `image()` do Astro**, então o frontmatter precisa de um caminho *relativo ao arquivo .md*, não uma URL de `/public`:
  ```yaml
  image: "../../assets/blog/imagens/capa_exemplo.png"
  ```
  As imagens vivem em `src/assets/blog/imagens/` para passarem pelo pipeline de otimização do `astro:assets`. O README ainda descreve o padrão antigo (`/public/assets/blog/`) — está desatualizado; siga o schema.
- O slug da URL é `post.id` (nome do arquivo), consumido por `src/pages/blog/[slug].astro`.
- Atenção à divergência atual: `blog/index.astro` e `[slug].astro` **não** filtram `draft: true`, enquanto os endpoints `llms*.txt.ts` filtram. Ao mexer nessa área, alinhe os dois lados.

### Endpoints de contexto para LLMs

`src/pages/llms.txt.ts` e `src/pages/llms-full.txt.ts` são rotas de API que geram texto puro no build a partir da collection `blog` (padrão llmstxt.org). O `llms.txt` contém **copy de produto e tabela de preços hardcoded** — esses valores precisam bater com `.agent/PRECOS-SSOT.md` e `.agent/SSOT-PRODUTO.md`. O `BaseLayout` anuncia os dois arquivos via `<link rel="ai-context">`.

O charset UTF-8 desses arquivos depende de `public/_headers` (o Cloudflare Pages não infere corretamente). Não remova esse arquivo.

### Tracking e consentimento (LGPD)

O fluxo é intencionalmente restritivo e fácil de quebrar:

1. `BaseLayout` roda um `gtag('consent', 'default', ...)` com **tudo negado** antes de qualquer outro script.
2. `CookieConsent.astro` só injeta o `gtm.js` (GTM-KHF7CGHF) e dispara `consent update` **depois** do aceite explícito.
3. Não existe o `<noscript>` iframe do GTM — removido de propósito.

Eventos de conversão são empurrados direto no `dataLayer` via `onclick` nos CTAs (`download_store`, `download_exe`). O `gclid` da URL é guardado em `sessionStorage` pelo script final do `BaseLayout`.

### CSP

Há um `<meta http-equiv="Content-Security-Policy">` restritivo em `BaseLayout.astro`. **Qualquer domínio externo novo** (script, fonte, imagem, iframe, fetch) precisa ser adicionado à diretiva correspondente ali, senão o recurso é silenciosamente bloqueado no browser mas funciona no build. Vídeos do YouTube usam obrigatoriamente `youtube-nocookie.com`.

### Estilos

Tailwind v4 via plugin do Vite — **não existe `tailwind.config.mjs`**. Tema e utilitários customizados (`.glass`, `.hero-gradient`, `.text-gradient`, `.card-premium`) ficam em `src/styles/global.css`, usando `@theme` e `@plugin`. `design_system.md` documenta a paleta e os padrões de componente.

### Build e deploy

`astro.config.mjs` fixa três decisões que afetam qualquer página nova:

- `site` = domínio de produção — URLs canônicas, sitemap e os endpoints llms derivam dele.
- `trailingSlash: 'always'` — **todo link interno precisa terminar com `/`** (`/blog/`, `/atualizacao/`). Sem a barra, o Cloudflare redireciona e a métrica de SEO/conversão sofre.
- `inlineStylesheets: 'always'` — o CSS é inlinado no HTML de propósito (LCP). Não troque para arquivo externo.

Redirects de borda ficam em `public/_redirects`. O sitemap é gerado automaticamente por `@astrojs/sitemap`.

## A pasta `.agent/`

Contém prompts de agentes especializados (redator de blog, especialista Astro, marketing) e — mais importante — os **arquivos SSOT**:

- `.agent/PRECOS-SSOT.md` — fonte única de preços. Nunca invente, estime ou arredonde valores de plano; leia esse arquivo antes de escrever qualquer número em página, post ou endpoint LLM.
- `.agent/SSOT-PRODUTO.md` — posicionamento, ICP, lexicon ("local", "borda", "zero-cloud") e objeções. Define o que o produto **não** é (não é ERP, não é emissor de nota, não é SaaS em nuvem).
- `.agent/contexto-produto.md` — descrição funcional do robô.

Ao alterar copy de venda, mantenha a consistência com esses arquivos e replique a mudança nos lugares que duplicam a informação: `index.astro`, as páginas de pSEO e `llms.txt.ts`.

## Referências internas

- `GUIA_OTIMIZACAO_ASTRO.md` — checklist de performance/A11y/CSP que sustenta o alvo de 100/100 no Lighthouse, incluindo o que desligar no painel Cloudflare (Rocket Loader, Manage robots.txt).
- `design_system.md` — paleta, tipografia e componentes.
- Arquivos legados na raiz (`index.html`, `obrigado.html`, `roteiro.md`, `briefing.md`) são resquícios pré-migração; a versão viva é a de `src/pages/`.

## Convenções de commit

Conventional Commits com escopo e descrição em pt-BR sem acentuação, como no histórico:

```
feat(marketing): adiciona templates de email para onboarding
style(llm): force UTF-8 charset header for llms.txt
```
