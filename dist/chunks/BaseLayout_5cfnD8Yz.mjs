import { a as createComponent, m as maybeRenderHead, b as renderTemplate, c as createAstro, r as renderComponent, h as renderSlot, d as addAttribute, i as renderHead, u as unescapeHTML } from './astro/server_Dj9BpUyK.mjs';
import 'piccolore';
/* empty css                          */
import 'clsx';

const $$Header = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<header class="fixed top-0 w-full z-50 glass border-b border-white/5"> <nav class="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center"> <a href="/" class="flex items-center gap-2 group" aria-label="Página inicial Nota Fácil"> <div class="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 transition-transform group-hover:scale-105"> <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path> </svg> </div> <span class="text-white font-black text-lg sm:text-2xl tracking-tighter">Nota Fácil<span class="text-blue-500">.</span></span> </a> <div class="hidden md:flex gap-8 text-slate-300 text-sm font-semibold"> <a href="/#" class="hover:text-blue-400 transition italic">A Realidade</a> <a href="/#solucao" class="hover:text-blue-400 transition italic">A Solução</a> <a href="/#enterprise" class="hover:text-blue-400 transition italic">Enterprise</a> <a href="/#planos" class="hover:text-blue-400 transition italic">Planos</a> <a href="/#faq" class="hover:text-blue-400 transition italic">FAQ</a> <a href="/blog" class="hover:text-blue-400 transition font-black text-blue-300 ml-4">Blog Fiscal</a> </div> <a href="/#hero" class="bg-blue-600 hover:bg-blue-500 text-white px-5 sm:px-6 py-3 sm:py-2.5 rounded-xl text-[10px] sm:text-xs font-black shadow-lg shadow-blue-500/20 transition active:scale-95 uppercase tracking-widest">
Download
</a> </nav> </header>`;
}, "C:/Users/Rogerio/Documents/Projetos/site_notafacil_downloader/src/components/Header.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<footer class="pt-16 pb-8 bg-slate-900 border-t border-slate-800"> <div class="container mx-auto px-6"> <!-- Eco-sistema --> <div class="flex flex-col lg:flex-row justify-between items-start gap-12 mb-12 border-b border-slate-800 pb-12"> <!-- Branding --> <div class="max-w-sm"> <a href="/" class="flex items-center gap-2 group"> <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30 transition-transform group-hover:scale-105"> <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path> </svg> </div> <span class="text-white font-black text-xl tracking-tighter">Nota Fácil<span class="text-blue-500">.</span></span> </a> <p class="mt-6 text-slate-400 text-sm font-medium leading-relaxed">O Nota Fácil Downloader é um projeto original <a href="https://tecnologiacorporativa.com.br" target="_blank" class="text-blue-400 font-bold hover:text-blue-300 transition-colors">Tecnologia Corporativa</a>. Nossa missão é entregar soluções em T.I. e automação impecáveis para o seu dia a dia.</p> <a href="https://tecnologiacorporativa.com.br" target="_blank" class="inline-flex items-center gap-2 mt-6 text-xs font-bold text-slate-400 hover:text-white transition-colors bg-slate-800/50 hover:bg-slate-800 px-4 py-2.5 rounded-lg border border-slate-700/50"> <i data-lucide="external-link" class="w-3 h-3"></i> tecnologiacorporativa.com.br
</a> </div> <!-- Outras Soluções --> <div class="lg:min-w-[480px]"> <h3 class="text-slate-200 font-bold mb-6 flex items-center gap-2 uppercase tracking-wide text-xs"> <i data-lucide="layers" class="w-4 h-4 text-blue-500"></i>
Conheça Outras Soluções
</h3> <div class="flex flex-col gap-4"> <a href="https://rockethub.com.br" target="_blank" class="group flex items-start gap-4 p-3 -m-3 rounded-2xl hover:bg-slate-800 transition-all border border-transparent hover:border-slate-700"> <div class="mt-1 w-10 h-10 rounded-xl shrink-0 bg-slate-800 group-hover:bg-emerald-500/10 flex items-center justify-center transition-colors border border-slate-700 group-hover:border-emerald-500/20 shadow-sm"> <i data-lucide="bot" class="w-5 h-5 text-slate-400 group-hover:text-emerald-400 transition-colors"></i> </div> <div> <span class="block text-slate-200 font-bold text-sm group-hover:text-white transition-colors flex items-center gap-2">RocketHub <i data-lucide="external-link" class="w-3 h-3 text-slate-600 group-hover:text-emerald-500 transition-colors"></i></span> <span class="block text-xs text-slate-400 mt-1.5 leading-relaxed">Plataforma de atendimento omnichannel e I.A.</span> </div> </a> <a href="https://notafacildownloader.contabilcert.com.br" target="_blank" class="group flex items-start gap-4 p-3 -m-3 rounded-2xl hover:bg-slate-800 transition-all border border-transparent hover:border-slate-700"> <div class="mt-1 w-10 h-10 rounded-xl shrink-0 bg-slate-800 group-hover:bg-orange-500/10 flex items-center justify-center transition-colors border border-slate-700 group-hover:border-orange-500/20 shadow-sm"> <i data-lucide="receipt" class="w-5 h-5 text-slate-400 group-hover:text-orange-400 transition-colors"></i> </div> <div> <span class="block text-slate-200 font-bold text-sm group-hover:text-white transition-colors flex items-center gap-2">Nota Fácil Emissor <i data-lucide="external-link" class="w-3 h-3 text-slate-600 group-hover:text-orange-500 transition-colors"></i></span> <span class="block text-xs text-slate-400 mt-1.5 leading-relaxed">Emissor de NFS-e voltado para contabilidades com emissão via WhatsApp e site para clientes.</span> </div> </a> <a href="https://contabilcert.com.br" target="_blank" class="group flex items-start gap-4 p-3 -m-3 rounded-2xl hover:bg-slate-800 transition-all border border-transparent hover:border-slate-700"> <div class="mt-1 w-10 h-10 rounded-xl shrink-0 bg-slate-800 group-hover:bg-indigo-500/10 flex items-center justify-center transition-colors border border-slate-700 group-hover:border-indigo-500/20 shadow-sm"> <i data-lucide="shield-check" class="w-5 h-5 text-slate-400 group-hover:text-indigo-400 transition-colors"></i> </div> <div> <span class="block text-slate-200 font-bold text-sm group-hover:text-white transition-colors flex items-center gap-2">ContabilCert <i data-lucide="external-link" class="w-3 h-3 text-slate-600 group-hover:text-indigo-500 transition-colors"></i></span> <span class="block text-xs text-slate-400 mt-1.5 leading-relaxed">Gerenciamento de renovações de certificados digitais. Remunere sua carteira ganhando comissão por cada renovação.</span> </div> </a> </div> </div> </div> <!-- Direitos e Badges --> <div class="flex flex-col md:flex-row justify-between items-center gap-6"> <div class="flex items-center gap-2 grayscale brightness-75"> <span class="font-bold text-slate-300">Nota Fácil &copy; 2026</span> </div> <div class="flex flex-wrap justify-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center"> <span>Compatível com Windows 7+</span> <span class="hidden md:inline">•</span> <span>Processamento 100% Local</span> <span class="hidden md:inline">•</span> <span>Adequado à LGPD</span> </div> </div> </div> </footer>`;
}, "C:/Users/Rogerio/Documents/Projetos/site_notafacil_downloader/src/components/Footer.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://notafacildownloader.contabilcert.com.br");
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const {
    title = "Nota F\xE1cil Downloader | Automa\xE7\xE3o de NFS-e Nacional",
    description = "O software desktop que baixa XML e PDF em lote, organiza nas suas pastas e gera planilhas de confer\xEAncia.",
    canonical = Astro2.site ? new URL(Astro2.url.pathname, Astro2.site).href : Astro2.url.href,
    bodyClass = "bg-slate-50 text-slate-900 overflow-x-hidden",
    image = new URL("/assets/print.png", Astro2.site || "https://nota-facil.github.io").href,
    ogType = "website",
    articleDate,
    customSchema
  } = Astro2.props;
  const defaultSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "Nota F\xE1cil Downloader",
        "operatingSystem": "Windows 10+",
        "applicationCategory": "BusinessApplication",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "BRL"
        },
        "description": "Rob\xF4 desktop de automa\xE7\xE3o para escrit\xF3rios cont\xE1beis: efetua download em lote de XML e PDF da NFS-e do Portal Nacional, organiza diret\xF3rios para ERPs e gera relat\xF3rios Excel com suporte a Certificado A1.",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "ratingCount": "128"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Nota F\xE1cil"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "O plano gratuito \xE9 s\xF3 por alguns dias?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "N\xE3o! O plano Free \xE9 gratuito para sempre. Ele renova automaticamente a cota de 100 notas na contagem mensal."
            }
          },
          {
            "@type": "Question",
            "name": "Meus certificados digitais est\xE3o seguros?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Seguran\xE7a absoluta. O Nota F\xE1cil \xE9 uma aplica\xE7\xE3o desktop que roda localmente na sua m\xE1quina de borda e nunca transporta ou sobe seus arquivos para nuvem de terceiros."
            }
          }
        ]
      }
    ]
  });
  const finalSchema = customSchema || defaultSchema;
  return renderTemplate(_a || (_a = __template([`<html lang="pt-BR" class="scroll-smooth"> <head><!-- Google Tag Manager --><script type="text/partytown">
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-KHF7CGHF');
    <\/script><!-- End Google Tag Manager --><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://unpkg.com https://cdn.jsdelivr.net https://www.youtube-nocookie.com https://static.doubleclick.net https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://unpkg.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://www.googletagmanager.com https://www.google-analytics.com https://img.youtube.com https://i.ytimg.com; frame-src 'self' https://www.youtube-nocookie.com https://www.googletagmanager.com; connect-src 'self' https://www.google-analytics.com https://n8n.rockethub.com.br https://cloudflareinsights.com;"><title>`, '</title><meta name="description"', '><meta name="keywords" content="Download NFS-e Nacional, rob\xF4 baixar xml nfse portal nacional, automa\xE7\xE3o cont\xE1bil, baixar pdf nfse em lote, sistema para contador nfse, captura xml nfse"><meta name="author" content="Nota F\xE1cil (nota-facil.github.io)"><meta name="robots" content="index, follow"><link rel="canonical"', '><!-- Open Graph / Meta --><meta property="og:title"', '><meta property="og:description"', '><meta property="og:type"', '><meta property="og:url"', '><meta property="og:image"', '><meta property="og:image:alt"', '><meta property="og:locale" content="pt_BR"><meta property="og:site_name" content="Nota F\xE1cil Downloader">', '<link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="mask-icon" href="/favicon.svg" color="#2563eb"><meta name="theme-color" content="#2563eb"><!-- Twitter / X Meta --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"', '><meta name="twitter:description"', '><meta name="twitter:image"', `><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><!-- Fonte do Google ass\xEDncrona para n\xE3o bloquear renderiza\xE7\xE3o (FCP/LCP) --><link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" onload="this.onload=null;this.media='all'" media="print">`, `<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"></noscript><!-- AOS --><link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" media="print" onload="this.media='all'"><!-- Scripts / Libraries (deferred & content-hashed) --><script src="https://unpkg.com/lucide@0.454.0/dist/umd/lucide.min.js" defer><\/script><script src="https://unpkg.com/aos@2.3.1/dist/aos.js" defer><\/script><script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.14.0/dist/sweetalert2.all.min.js" defer><\/script><script src="https://unpkg.com/imask@7.6.1/dist/imask.min.js" defer><\/script><!-- Schema.org / JSON-LD Otimizado para SEO e AEO --><script type="application/ld+json">`, "<\/script>", "</head> <body", '> <!-- Google Tag Manager (noscript) --> <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KHF7CGHF" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript> <!-- End Google Tag Manager (noscript) --> ', " <main> ", " </main> ", " <script>\n      document.addEventListener('DOMContentLoaded', () => {\n        if (typeof AOS !== 'undefined') AOS.init({ duration: 800, once: true, offset: 50 });\n        if (typeof lucide !== 'undefined') lucide.createIcons();\n      });\n    <\/script> </body> </html>"])), title, addAttribute(description, "content"), addAttribute(canonical, "href"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(ogType, "content"), addAttribute(canonical, "content"), addAttribute(image, "content"), addAttribute(title, "content"), articleDate && renderTemplate`<meta property="article:published_time"${addAttribute(articleDate, "content")}>`, addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(image, "content"), maybeRenderHead(), unescapeHTML(finalSchema), renderHead(), addAttribute(bodyClass, "class"), renderComponent($$result, "Header", $$Header, {}), renderSlot($$result, $$slots["default"]), renderComponent($$result, "Footer", $$Footer, {}));
}, "C:/Users/Rogerio/Documents/Projetos/site_notafacil_downloader/src/layouts/BaseLayout.astro", void 0);

export { $$BaseLayout as $ };
