# 16. Auditoria de tags e funil

**Data:** 14/08/2026 · Container `GTM-KHF7CGHF` **versão 15** · código conferido no commit `4c5aa84`

Auditoria de três vias: eventos no código ↔ acionadores do GTM ↔ tags e destinos.

---

## Mapa do funil

```
clique no anúncio  →  /?gclid=...
   └─ BaseLayout:175  grava gclid no sessionStorage          ✅
   └─ banner de consentimento → aceite → GTM carrega          ⚠️ ver F3
        └─ #hero-form preenchido e enviado
             └─ fetch → n8n
                  └─ index.astro:979  push 'lead_cadastro'    🔴 ver F1
                       ├─ trigger 13 → tag 17 (GA4 generate_lead)
                       └─ trigger 13 → tag 26 (Ads conversão)
                  └─ index.astro:985  window.location = /obrigado/
                       └─ botão "Loja"  → push 'download_store' ✅
                       └─ botão ".EXE"  → push 'download_exe'   🔴 ver F2
```

---

## 🔴 F1 — Corrida de navegação na conversão principal

**A falha mais grave da auditoria.**

```js
// src/pages/index.astro:978-985
window.dataLayer.push({ 'event': 'lead_cadastro', 'has_gclid': !!gclid });   // 979
sessionStorage.setItem('notafacil_user_data', ...);                          // 982
form.reset();                                                                // 984
window.location.href = '/obrigado/';                                         // 985  ← sai imediatamente
```

Entre o `push` e a navegação existem duas operações síncronas e instantâneas. O navegador começa a sair da página **milissegundos** depois do evento ser empurrado.

As tags `17` (GA4) e `26` (conversão do Ads) precisam fazer requisição de rede. Se a navegação começar antes, o navegador **cancela as requisições em voo**.

O GA4 costuma sobreviver porque usa `sendBeacon`, que resiste ao unload. **A tag de conversão do Google Ads não tem a mesma garantia.**

> **Implicação de sequenciamento:** não promova a tag `26` (`Site - Formulário de Lead`) a conversão Principal antes de corrigir isto. Ela seria avaliada em condição prejudicada, e você concluiria erradamente que a tag nativa não funciona.

### Correção

```js
// Conversão: lead qualificado gerado.
// eventCallback espera as tags do GTM terminarem antes de sair da página.
var navegou = false;
function irParaObrigado() {
    if (navegou) return;
    navegou = true;
    window.location.href = '/obrigado/';
}

sessionStorage.setItem('notafacil_user_data', JSON.stringify(responseObj));
form.reset();

window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
    'event': 'lead_cadastro',
    'has_gclid': !!gclid,
    'eventCallback': irParaObrigado,
    'eventTimeout': 2000
});

// Rede de segurança: sem consentimento o GTM não carrega e o eventCallback
// nunca dispara. Sem isto, o usuário ficaria preso na página.
setTimeout(irParaObrigado, 2100);
```

⚠️ **O `setTimeout` de segurança não é opcional.** Quem recusa cookies não carrega o GTM, o `eventCallback` nunca é chamado, e o formulário travaria sem ele.

---

## 🟡 F2 — `download_exe` sem acionador *(revisado — severidade reduzida)*

> **Correção de diagnóstico, 14/08.** A versão anterior deste documento afirmava que o link .EXE sofria a mesma corrida de navegação do F1. **Está errado.** Verifiquei os cabeçalhos da URL:
>
> ```
> content-type: application/octet-stream
> content-disposition: attachment; filename="Nota_Facil_Downloader_Setup.exe"
> ```
>
> É **download de arquivo, não navegação**. A página não descarrega, então não há corrida e o acionador de clique tem tempo de disparar. Não é necessário `eventCallback` ali, nem "Aguardar tags" é crítico.

O que resta é uma assimetria de redundância:

| Evento no código | Acionador customEvent | Acionador de clique |
|---|---|---|
| `download_store` | ✅ `25` | ✅ `21` |
| `download_exe` | 🟡 **nenhum** | ✅ `23` |

`obrigado.astro:81` empurra `download_exe` no dataLayer e nada escuta. A medição funciona pelo acionador de clique `23`, mas com **um caminho só**.

> A diferença de conversões (MSXI 6 × EXE 4) provavelmente reflete **preferência real do usuário** — a versão da Loja é apresentada como "Recomendada", com muito mais peso visual. Não há evidência de perda de disparo.

### Correção *(baixa prioridade)*

Criar acionador de evento personalizado `download_exe` e adicioná-lo à tag `24`, mantendo o `23`. Ganho: redundância se o acionador de clique falhar em algum navegador ou se o markup mudar. A ação de conversão está com contagem "Uma", então não há risco de contagem dupla.

---

## 🔴 F3 — Vinculador de Conversões sem transmissão de URL

```
Tag 12 · Ads - Vinculador de Conversões
enableUrlPassthrough: false     🔴
```

Com o Consent Mode negando `ad_storage`, o cookie `_gcl_aw` não é gravado. A transmissão de URL é o mecanismo que faz o `gclid` viajar **na URL** entre páginas quando não há cookie.

Desligada, você perde a ligação clique → conversão exatamente para quem recusou cookies — que é a maioria.

**Correção:** GTM → Tags → `Ads - Vinculador de Conversões` → Configurações adicionais → marcar **Ativar transmissão de URL**.

Combina diretamente com o Consent Mode avançado do [documento 07](07-consent-mode-e-enhanced-conversions.md).

---

## 🟠 F4 — Enhanced Conversions não está na tag de conversão

A variável `20 · Duv - Dados do Usuario` existe, mas está ligada **apenas à tag `18`** (GA4 base). A tag `26`, que é a conversão de lead do Google Ads, **não a usa**.

Ou seja: conversões otimizadas para leads não estão configuradas onde importam.

**Correção:** tag `26` → **Configurações de conversões otimizadas** → marcar *Fornecer dados fornecidos pelo usuário* → selecionar `Duv - Dados do Usuario`.

E trocar o modo **AUTO** por seletores manuais, que são mais confiáveis com formulário enviado por `fetch`:

| Campo | Seletor |
|---|---|
| E-mail | `#email_profissional` |
| Nome | `#nome_completo` |

---

## 🟠 F5 — Tráfego de teste contado como lead

10 eventos `generate_lead` vieram de `tagassistant.google.com`. Não existe acionador de bloqueio em nenhuma tag.

Isso contamina a única conversão que alimenta o lance.

**Correção:** criar acionador de bloqueio com `{{Referrer}}` contém `tagassistant.google.com` e aplicá-lo às tags `17` e `26`.

---

## 🟠 F6 — Downloads invisíveis no GA4

Tags `22` e `24` são do tipo `awct` — conversão do Ads apenas. Não existe tag de evento GA4 para download nenhum.

No GA4: `download_store`, `download_exe` e `download_recorrente` = **zero ocorrências**. O funil do site é invisível no Analytics.

Detalhado no [documento 03](03-gtm-eventos-ga4.md).

---

## 🟠 F7 — `download_recorrente` é evento órfão

`index.astro:970` empurra o evento. Não existe acionador nem tag.

Não contar como conversão no Ads está **correto e é intencional** — é cliente existente, não aquisição. Mas hoje ele também não gera visibilidade nenhuma. Merece uma tag GA4, sem conversão.

---

## 🟡 F8 — Variável `URL - gclid` malformada

```
Chave da consulta: gclid{{Click ID}}     🔴 deveria ser apenas: gclid
```

Procura um parâmetro chamado `gclid` + o valor de Click ID. Nenhuma tag a referencia hoje, então o impacto é zero — mas é armadilha para quem for usá-la.

---

## ✅ O que está correto

Para não gerar retrabalho:

| Item | Estado |
|---|---|
| Acionador `13` escuta `lead_cadastro` | ✅ casa exatamente com o código |
| Tag `26` reapontada para conversão viva | ✅ rótulo `EEFCCIm03-EcEIj_oolD` |
| Tag `14` (morta) removida | ✅ |
| Acionador `25` + tag `22` para `download_store` | ✅ padrão correto, é o modelo a copiar |
| Tags base GA4 e Ads no gatilho de inicialização | ✅ |
| Consent Mode negando tudo por padrão | ✅ conforme LGPD |
| Contagem das ações de download | ✅ todas "Uma" |

---

## Ordem de execução

Só o F1 exige alteração de código e novo deploy. O resto é GTM e painel do Ads.

| # | Falha | Onde | Tempo |
|---|---|---|---|
| 1 | **F1** — corrida na conversão de lead | código + deploy | 20 min |
| 2 | **F3** — transmissão de URL no vinculador | GTM | 2 min |
| 3 | **F5** — bloquear Tag Assistant | GTM | 5 min |
| 4 | **F2** — acionador e corrida do `download_exe` | GTM + código | 20 min |
| 5 | **F4** — Enhanced Conversions na tag `26` | GTM | 10 min |
| 6 | **F6** — eventos GA4 de download | GTM | 20 min |
| 7 | **F7** — tag GA4 do `download_recorrente` | GTM | 5 min |
| 8 | **F8** — corrigir variável `URL - gclid` | GTM | 1 min |

> **F1 antes de tudo.** Enquanto ele existir, qualquer medição da conversão de lead está subestimada — inclusive a validação da tag nativa que precisa acontecer antes da troca de conversão Principal descrita no [documento 01](01-gtm-conversao-lead.md).
