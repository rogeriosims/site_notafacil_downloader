# 7. Consent Mode avançado e Enhanced Conversions

**Prioridade:** 🟠 Alto · **Tempo:** ~45 min · **Sistemas:** Site (código) + GTM + Google Ads

## Problema

A proporção entre cliques do Ads e sessões do GA4 é de **3,3 para 1** — cerca de **70% do tráfego pago é invisível** no Analytics.

Parte disso é inevitável e esperado sob LGPD. Mas a implementação atual perde mais do que precisa.

### Como está hoje (Consent Mode *básico*)

`src/components/CookieConsent.astro` só injeta o `gtm.js` **depois** do aceite explícito:

```js
acceptBtn.addEventListener('click', function () {
    saveConsent(true);
    notifyConsentMode(true);
    loadGTM();          // ← container só carrega aqui
    hideBanner(banner);
});
```

Quem recusa ou ignora o banner **nunca carrega o container**. Para o Google, essa visita simplesmente não existe: sem cookie, sem ping, sem nada. Não há dado nenhum para modelar.

### Como deveria estar (Consent Mode *avançado*)

O container carrega **sempre**, mas com todo armazenamento negado por padrão. Sem consentimento ele envia apenas *pings sem cookie* — sinais anônimos, sem identificador persistente — que o Google usa para **modelagem de conversões**.

> **Isso continua em conformidade com a LGPD.** Nenhum cookie é gravado antes do aceite e nenhum dado pessoal é transmitido. O que muda é que o Google passa a saber que *houve* uma visita anônima, o que permite estimar estatisticamente as conversões perdidas. É o modo que o próprio Google recomenda para operações sob GDPR/LGPD.

---

## Parte A — Migrar para Consent Mode avançado

### 1. Adicionar redação de dados e repasse de URL

Em `src/layouts/BaseLayout.astro`, no bloco de consentimento padrão (linha ~89), acrescente duas linhas **depois** do `gtag('consent', 'default', ...)`:

```js
gtag('consent', 'default', {
  'analytics_storage': 'denied',
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'wait_for_update': 500
});

// Consent Mode avançado: sem cookies, o gclid trafega pela URL e
// os identificadores de anúncio são redigidos antes do envio.
gtag('set', 'ads_data_redaction', true);
gtag('set', 'url_passthrough', true);
```

### 2. Carregar o GTM independentemente do aceite

Em `src/components/CookieConsent.astro`, dentro de `init()`:

```js
    var consent = getConsent();

    if (consent !== null) {
        // A ordem importa: o consent update precisa entrar no dataLayer ANTES
        // do container subir, senão as tags avaliam o estado antigo (negado).
        notifyConsentMode(consent.analytics);
        loadGTM();
        hideBanner(banner);
        return;
    }

    // Sem resposta ainda: sobe o container em estado negado (Consent Mode
    // avançado). Nenhum cookie é gravado — apenas pings anônimos que
    // alimentam a modelagem de conversões do Google.
    loadGTM();
```

E remova o `loadGTM()` do `acceptBtn`, que passa a apenas atualizar o consentimento:

```js
    acceptBtn.addEventListener('click', function () {
        saveConsent(true);
        notifyConsentMode(true);
        hideBanner(banner);
    });
```

O `necessaryBtn` não muda — `notifyConsentMode(false)` mantém tudo negado, e o container continua em modo cookieless.

### 3. Ativar o repasse de URL no Vinculador de Conversões

A tag `12 · Ads - Vinculador de Conversões` está com `enableUrlPassthrough: false`, o que anula parte do ganho.

GTM → **Tags** → `Ads - Vinculador de Conversões` → **Configurações adicionais** → marque **Ativar transmissão de URL**. Salvar.

### 4. CSP — nada a fazer

Todos os domínios necessários (`googletagmanager.com`, `google-analytics.com`, `googleadservices.com`, `googleads.g.doubleclick.net`) **já estão** nas diretivas `script-src` e `connect-src` do CSP em `BaseLayout.astro:100`. Nenhuma alteração é necessária.

### 5. Validar

```bash
npm run build && npm run preview
```

Abra o site em aba anônima, **sem** aceitar o banner, e confirme no DevTools:

- [ ] **Network:** `gtm.js` carrega (status 200) mesmo sem aceite
- [ ] **Application → Cookies:** **nenhum** cookie `_ga` ou `_gcl_*` gravado
- [ ] **Network:** requisições para `google-analytics.com/g/collect` contendo `gcs=G100` (sinal de consentimento negado)

Depois aceite o banner e confirme que os cookies `_ga` aparecem e o parâmetro passa a `gcs=G111`.

> Se aparecerem cookies **antes** do aceite, o Consent Mode não está sendo respeitado — pare e revise a ordem dos scripts. Esse é o único cenário que traria risco de LGPD.

---

## Parte B — Enhanced Conversions para leads

Recupera conversões que se perderam por falta de cookie, usando o e-mail do formulário como identificador (com hash SHA-256 gerado **no navegador**, antes do envio).

O formulário `#hero-form` já coleta nome, e-mail e CNPJ — a matéria-prima existe. A variável `20 · Duv - Dados do Usuario` (tipo *Dados fornecidos pelo usuário*, modo **AUTO**) também já existe, mas hoje está ligada **apenas** à tag GA4 base (`18`). A tag de conversão do Ads não a usa.

### 1. Ativar no Google Ads

Google Ads → **Metas** → **Conversões** → **Configurações** → **Conversões otimizadas**

- Aceite os termos de serviço
- Método: **Gerenciador de tags do Google**

### 2. Ligar a variável à tag de conversão

> Execute **depois** do [documento 01](01-gtm-conversao-lead.md), quando a tag `14` já apontar para a conversão nova.

GTM → **Tags** → `Google Ads - Lead Nota Fácil` (`14`) → **Configurações de conversões otimizadas**

- Marque **Fornecer dados fornecidos pelo usuário**
- Selecione a variável `Duv - Dados do Usuario`

### 3. Trocar o modo AUTO por seletores manuais

O modo automático varre a página procurando campos de e-mail e telefone. Funciona, mas é frágil — o formulário está dentro de um bloco com classes utilitárias do Tailwind e o envio é via `fetch`, sem recarregar a página.

GTM → **Variáveis** → `Duv - Dados do Usuario` → mude de **Automático** para **Seletores CSS manuais**:

| Campo | Seletor | Elemento em `index.astro` |
|---|---|---|
| E-mail | `#email_profissional` | linha 84 |
| Telefone | `#whatsapp` | linha 87 |
| Nome | `#nome_completo` | linha 82 |

Seletores conferidos contra `src/pages/index.astro` (formulário `#hero-form`, linha 81) em 12/08/2026.

> ⚠️ O telefone precisa estar em **formato E.164** (`+5531999999999`) para o Google aceitar. O campo `#whatsapp` usa máscara visual (`(31) 99999-9999`, `minlength="15"`), então o valor bruto **não** serve. Ou você normaliza antes do envio, ou deixa só e-mail e nome — o e-mail sozinho já entrega a maior parte do ganho. Não vale a pena mandar telefone malformado: o Google descarta em silêncio.

> ⚠️ Se algum desses `id` mudar no HTML, a variável volta vazia **sem erro visível** e as conversões otimizadas param de funcionar sem aviso. Ao mexer no formulário, revalide pelo Preview do GTM.

### 4. Validar

No Preview do GTM, envie o formulário e clique na tag `Google Ads - Lead Nota Fácil` → aba **Dados fornecidos pelo usuário**. Os campos devem aparecer preenchidos e **com hash** — se você vir o e-mail em texto puro, pare e revise.

### 5. Atualizar a política de privacidade

`/politica-de-privacidade/` precisa mencionar que dados de contato são enviados ao Google **de forma pseudonimizada (hash)** para medição de conversões. É requisito dos termos de conversões otimizadas e da LGPD.

---

## Impacto esperado

| Ajuste | Ganho estimado |
|---|---|
| Consent Mode avançado | recupera parte dos ~70% hoje invisíveis, via modelagem |
| Enhanced Conversions | +5% a 15% de conversões registradas *(faixa típica do Google para leads)* |

Os dois atuam sobre a **mesma** lacuna de atribuição, então os ganhos não se somam de forma linear. O efeito combinado real só aparece após ~30 dias de acúmulo — e, como toda mudança desta série, só deve ser medido depois que a conversão de lead estiver registrando de novo.
