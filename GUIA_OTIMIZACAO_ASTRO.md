# Guia Definitivo de Otimização no Astro + Cloudflare

Este documento centraliza todos os aprendizados, configurações e processos adotados no **Nota Fácil Downloader** para alcançarmos notas máximas (100) no Google PageSpeed Insights (Lighthouse) nos pilares de **Desempenho, Acessibilidade, Práticas Recomendadas e SEO**, tanto para Desktop quanto para Mobile.

Serve como roteiro absoluto para replicação em novos projetos utilizando **Astro, TailwindCSS e Cloudflare**.

---

## 1. Desempenho (Performance)
O objetivo principal é reduzir o LCP (Largest Contentful Paint), o FCP (First Contentful Paint) e o TBT (Total Blocking Time).

### 1.1 Eliminação do CSS "Render Blocking"
Por padrão, o Astro extrai seu CSS compilado para um link externo (`/_astro/estilo.css`), obrigando o navegador a fazer o download antes de desenhar a tela, penalizando FCP/LCP.

**Solução:** Injetar todo o CSS internamente (inline).
* **Arquivo:** `astro.config.mjs`
* **Configuração:**
```javascript
export default defineConfig({
  build: {
    format: 'directory',
    inlineStylesheets: 'always' // OBRIGA O ASTRO A INSERIR TODO O CSS NA TAG <STYLE> DO HTML
  }
});
```

### 1.2 Isolamento de Scripts de Terceiros (GTM, Analytics, Pixels)
Tags externas travam a thread principal (Main Thread) e explodem o Tempo de Bloqueio (TBT) no mobile.

**Solução:** Executar essas requisições em uma Worker-Thread simultânea usando o **Partytown**.
* **Arquivo:** `astro.config.mjs`
* **Configuração:** Adicionar `@astrojs/partytown`.
```javascript
import partytown from '@astrojs/partytown';

export default defineConfig({
  integrations: [
    partytown({ config: { forward: ['dataLayer.push'] } })
  ]
});
```
* **No `BaseLayout.astro` ou `<head>`:** Trocar `type="text/javascript"` por `type="text/partytown"` nas tags de tracking.
```html
<script type="text/partytown" is:inline>
  // Código GTM
</script>
```

### 1.3 Carregamento Assíncrono de Fontes
Nunca bloqueie a tela esperando fontes personalizadas.

**Solução:** Utilizar `rel="preload"` acompanhado de font-display `swap`.
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=...&display=swap" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=...&display=swap&font-display=swap" />
```

### 1.4 Imagens Core e Prevenção de CLS (Cumulative Layout Shift)
Layout Shift ocorre quando itens renderizados por JavaScript (como Iframes de vídeo) ou blocos baseados em porcentagem empurram o conteúdo tela abaixo.

* **Dica Ouro (Vídeos):** NUNCA carregue diretamente of iframe do YouTube. Substitua-o por uma `<img>` JPG super leve servida **localmente**. No clique, troque a imagem pelo iframe com autoplay.
* **Dica Ouro (Backgrounds Absolutos):** Se for fixar itens absolutos (bolhas e brilhos decorativos no Tailwind), use posições nominais fixas (ex: `-top-32 -left-32` invés de `top-[-10%]`), pois unidades em `%` forçam reflow se a tela dimensionar.
* **Tamanhos e Prioridades:** Configure o Fetch Priority explicitamente no topo da dobra:
```html
<img src="/assets/hero-bg.jpg" fetchpriority="high" loading="eager" alt="...">
```

### 1.5 Controle e Limpeza de Bibliotecas Externas (CDNs)
* Sempre declare imports de CDNs (unpkg, cdnjs) com o atributo `defer`.
* Verifique scripts duplicados: jamais carregue uma biblioteca bruta (ex: `imask.js`) ao invés do seu derivado minificado `.min.js`.

---

## 2. Acessibilidade (A11y)

### 2.1 Alvos de Toque (Touch Targets) no Celular
A pontuação de Acessibilidade frequentemente é prejudicada por botões minúsculos ou sem espaçamento adequado no layout Mobile.
* Elementos clicáveis (*<button>*, *<a>*) devem ter no mínimo **48x48 pixels de target tátil**.
* Refine os paddings apenas para Mobile em menus ou navegações globais. Ex:
`px-5 py-3 sm:py-2.5` *(Engorda o botão para dedos grandes em smartphones sem deformar no desktop)*

### 2.2 Hierarquia Semântica e Cores
* **Cores (Contraste Text-to-Background):** Garantir taxa de 4.5:1. Quando o fundo escurece (`bg-slate-900`), troque subtextos cor `text-slate-500` por cores mais vivas e legíveis, como `text-slate-400` ou `text-slate-300`.
* **Semântica (Tags H):** Nunca pule uma linha de cabeçalho unicamente pelo tamanho da letra (do H2 para o H4). Use apenas para hierarquia lógica do texto (H1 para título geral, H2 para subseção, e obrigatoriamente H3 dentro de H2) usando o Tailwind para dar a cara visual desejada sem afetar a árvore HTML.
* **Aria-Labels:** Onde existirem links ocultos, apenas contendo ícones com SVGs visuais (Logs das marcas) adicione imediatamente a descrição legível via screen-reader: `<a href="/" aria-label="Voltar à tela original">...</a>`

---

## 3. Práticas Recomendadas e Segurança Corporativa (Best Practices)

### 3.1 Content-Security-Policy (CSP) Restritivo
Para barrar injeções XSS violentas e manter selo 100/100, devemos colocar um porteiro super-restrito que diz exatamente quais domínios podem ou não rodar as coisas ali dentro:
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.youtube-nocookie.com; ... ">
```

### 3.2 Impeça Rastros (Third-Party Cookies)
Muitas aplicações de terceiros (O painel do YouTube) embutem cookies que sangram fora do seu controle de privacidade (LGPD).
**Solução:** Sempre injete vídeos do YouTube substituindo o domínio raiz pelo canal higienizado livre-de-cookies:
*De: `youtube.com/embed/...`* -> **Para:** `www.youtube-nocookie.com/embed/...`

---

## 4. Nuvem & Infra: O Pipeline Cloudflare
Cravando todos os ganhos e resolvendo as arestas via painel da Edge (Cloudflare):

1. **Gestão de Robots Automatizada (Erro "Content-Signal"):** A Cloudflare injeta proteções de scraping IA que disparam alertas estranhos em auditores de SEO e Lighthouse (Ex: alerta em `robots.txt`). **Desligue:** *"Manage robots.txt"* e em "Configurações de Bots" da Cloudflare se quiser o console visualmente limpo.
2. **Compressão Superior:** Habilitar formatação **"Brotli"** *(Network -> Optimization)*.
3. **HTTP Strict Transport Security (HSTS):** Forçar tráfego Criptografado eterno *(SSL/TLS -> Edge Certificates)*. Ligue ativando Max Age 6 Meses e o **"No-Sniff Header"** do Chrome. (Opcionalmente, deixe *Include subdomains* / *Preload* DELIGADOS se houver temor de travamento de IPs desprotegidos antigos).
4. **Desabilite Over-Optimization Antigas:** "Rocket Loader" costuma ser um tiro no pé fatal para bibliotecas assíncronas em Astro, suspendendo eventos DOMLoaded. É primordial **DESLIGÁ-LO** e permitir que a estratégia embutida de Partytown e Inline Styles do Vite tomem a dianteira pura.

Com a implantação rigorosa desse checklist, o ecossistema Astro, livre de overhead por Javascript bruto, entrega tempos totais de processamento (TBT) em `~0ms`, disparando as métricas de Varejo de SEO para as primeiras posições.

----
*Guia criado durante a otimização monumental do sistema Nota Fácil Downloader (Desktop).*
