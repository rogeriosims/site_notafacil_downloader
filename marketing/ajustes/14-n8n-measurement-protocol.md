# 14. Auditoria do nó n8n "G4A - Ativação"

**Data:** 13/08/2026 · **Veredito:** funcionando tecnicamente, **inútil para conversão**

## 🔴 Ação imediata: rotacionar o `api_secret`

O segredo `XbuTz3GKSSS8ghnJ-FELNQ` foi compartilhado em texto puro e está hardcoded na URL do nó.

Com ele, qualquer pessoa injeta eventos arbitrários na propriedade `527459850` — inclusive `software_activation` e `purchase`, que alimentam decisões de lance. Não permite *ler* dados, mas permite *corromper*.

1. GA4 → **Admin** → **Fluxos de dados** → o fluxo → **Protocol Measurement API secrets**
2. Criar um novo segredo
3. Atualizar o n8n
4. **Apagar o antigo**
5. Mover para **credencial do n8n** (Header Auth ou variável de ambiente), não deixar na URL

---

## O defeito principal

```
GA4 recebe os eventos.  →  Mas com sessions = 0.
Sem sessão → sem origem de tráfego → sem atribuição → 0 conversões no Ads.
```

| Evento via MP | Eventos GA4 | **Sessões** | Conversões no Ads |
|---|---|---|---|
| `paywall_view` | 132 | **0** | — |
| `purchase` | 30 | **0** | 0 |
| `software_activation` | 24 | **0** | **0** |
| `begin_checkout` | 18 | **0** | — |

*Período: 01/07 a 14/08/2026*

`software_activation` chegou a render **11 conversões** entre março e junho, e ficou zerado de julho até 12/08.

> ### ⚠️ Correção — apurado em 14/08
>
> **Em 13/08 o `software_activation` registrou 1 conversão** — a primeira desde junho. E o `sessions: 0` continua lá (5 eventos, 0 sessões entre 12 e 14/08).
>
> Ou seja: a conclusão de que "com `sessions: 0` ela nunca vai atribuir" estava **forte demais**. O que faltava era religar a meta `SIGNUP`, feito em 13/08 — e o GA4 aparentemente consegue atribuir no nível de **usuário** mesmo sem montar a sessão, ou trata-se de conversão modelada.
>
> Com uma única ocorrência não dá para determinar o mecanismo. O que muda na prática:
>
> - O caminho atual **não está morto** — corrigir a meta foi suficiente para ele voltar a produzir
> - O `sessions: 0` continua sendo um defeito real, que degrada relatórios de origem no GA4 e provavelmente reduz a taxa de atribuição
> - O caminho do `gclid` ([documento 13](13-conversoes-offline-gclid.md)) segue sendo o mais robusto, mas deixa de ser urgente
>
> **Acompanhe:** se `software_activation` mantiver 1 conversão a cada ~3 ativações, o caminho é aceitável. Se voltar a zerar, o defeito de sessão é o culpado e aí vale corrigir o payload.

> ⚠️ **O Measurement Protocol responde `204 No Content` mesmo para payload inválido.** Ele não valida nada em produção. É por isso que a falha ficou invisível.

### Por que `sessions = 0`

Para o GA4 associar um evento do Measurement Protocol a uma sessão, o payload precisa de:

| Campo | Obrigatório | Você tem? |
|---|---|---|
| `client_id` | sim | ❌ não coletado |
| `params.session_id` | sim, para atribuir | ❌ não coletado |
| `params.engagement_time_msec` | sim, para contar engajamento | ❌ |
| `timestamp_micros` dentro de **72 h** | se for retroativo | ⚠️ verificar |

O payload que o site envia ao n8n é:

```js
// index.astro:910
{ action: 'register', nome, email, whatsapp, cnpj, gclid }
```

**Não há `client_id` nem `session_id`.** O dado necessário para costurar o evento do robô à sessão web nunca foi coletado. Sem alterar a origem, nenhum ajuste no nó resolve.

---

## Correção estratégica: o mecanismo está errado para o objetivo

Para registrar conversão no Google Ads, o caminho atual tem três elos e quebra no primeiro:

```
robô  →  Measurement Protocol  →  GA4  →  import para o Ads
         ↑ quebra aqui (sem session_id)
```

Você já coleta o `gclid`. Ele faz o mesmo trabalho em **um** elo:

```
robô  →  Google Ads Offline Conversion Import (gclid)
```

| | MP → GA4 → Ads *(atual)* | Offline com gclid |
|---|---|---|
| Elos até o Ads | 3 | **1** |
| Precisa `client_id` / `session_id` | sim — **e você não coleta** | não |
| Depende de consentimento | sim, duplo filtro | **não** |
| Latência | até 96 h somadas | do lote |
| Permite qualificar o lead | não | **sim** |
| Conversões atribuídas em 45 dias | **0** | — |

**Recomendação: separe os dois usos.**

| Objetivo | Mecanismo |
|---|---|
| Conversão no Google Ads | **Offline Conversion Import com `gclid`** → [documento 13](13-conversoes-offline-gclid.md) |
| Analytics de produto no GA4 | Measurement Protocol corrigido → Parte B abaixo |

Não são concorrentes. O primeiro alimenta o leilão; o segundo dá visibilidade de funil. Hoje o MP está tentando fazer os dois e não faz nenhum.

---

## Parte A — Corrigir o nó *(higiene, independente do resto)*

### 1. Validar no endpoint de debug antes de qualquer coisa

Troque temporariamente a URL para:

```
https://www.google-analytics.com/debug/mp/collect?measurement_id=G-40J8HYRSRM&api_secret=NOVO_SEGREDO
```

Esse endpoint retorna `validationMessages` com os erros reais. O de produção não retorna nada.

```json
{ "validationMessages": [
  { "fieldPath": "events[0].params.session_id",
    "description": "Measurement protocol hits without session_id...",
    "validationCode": "VALUE_INVALID" }
]}
```

> Rode o debug **toda vez** que mudar o payload. É a única forma de saber se funcionou.

### 2. Adicionar tratamento de erro

O `connections` do nó está vazio (`"main": [[]]`) — nada acontece depois, sucesso ou falha. Com `retryOnFail: true` e nenhuma saída, um erro persistente some sem aviso.

Adicione uma saída de erro que grave em log ou notifique. `fullResponse: true` já está correto e ajuda aqui.

### 3. Manter o `api_secret` fora da URL

Use credencial do n8n. A URL do nó fica visível em export, log e captura de tela — como acabou de acontecer.

---

## Parte B — Corrigir o MP para analytics *(opcional, mas só assim ele serve)*

Se quiser visibilidade do funil do robô dentro do GA4, o dado precisa ser coletado na origem.

### 1. Capturar `client_id` e `session_id` no formulário

Em `src/pages/index.astro`, junto do `gclid` já existente:

```js
// Lê o client_id do cookie _ga  →  formato GA1.1.XXXXXXXXX.YYYYYYYYY
function getGaClientId() {
  const m = document.cookie.match(/_ga=GA\d\.\d\.(\d+\.\d+)/);
  return m ? m[1] : null;
}

// Lê o session_id do cookie _ga_<CONTAINER>  →  o 3º campo é o session_id
function getGaSessionId() {
  const m = document.cookie.match(/_ga_40J8HYRSRM=GS\d\.\d\.(\d+)/);
  return m ? m[1] : null;
}

const payload = {
  action: 'register',
  nome, email, whatsapp, cnpj,
  gclid: gclid,
  ga_client_id: getGaClientId(),      // novo
  ga_session_id: getGaSessionId()     // novo
};
```

> ⚠️ Os cookies `_ga` só existem **após o aceite** do banner. Para quem recusa, os dois campos vêm `null` — e é exatamente por isso que o caminho do `gclid` é superior para conversão: ele não depende disso.
>
> Confirme o nome do cookie no DevTools; o sufixo segue o measurement ID mas vale conferir.

### 2. Payload correto do Measurement Protocol

```json
{
  "client_id": "{{ $json.ga_client_id }}",
  "timestamp_micros": "{{ $json.activation_timestamp_micros }}",
  "non_personalized_ads": false,
  "events": [{
    "name": "software_activation",
    "params": {
      "session_id": "{{ $json.ga_session_id }}",
      "engagement_time_msec": "100",
      "origem_dados": "app_desktop"
    }
  }]
}
```

Regras que quebram em silêncio:

- **`timestamp_micros` no máximo 72 h atrás.** Ativação mais antiga que isso é descartada. Sem `client_id` válido e dentro da janela, não há atribuição.
- `session_id` e `engagement_time_msec` são o par que faz o GA4 criar/associar a sessão. Faltando qualquer um, volta a `sessions: 0`.
- Nome do evento: máximo 40 caracteres, só letras, números e `_`.

### 3. Enviar para um fluxo de dados separado

Conforme o [documento 06](06-ga4-propriedade-e-eventos.md): os eventos do robô estão indo para o **measurement ID do site** (`G-40J8HYRSRM`), o que torna qualquer relatório de conversão por canal não confiável.

Crie um fluxo dedicado ao app e troque o `measurement_id` e o `api_secret` do nó para os novos. O parâmetro `origem_dados` acima é o paliativo enquanto isso não acontece.

---

## 🟡 Achado colateral: tráfego de teste contaminando os leads

```
generate_lead · tagassistant.google.com / referral · 10 eventos · 3 sessões
```

**Dez `generate_lead` vieram do Tag Assistant** entre 01/07 e 14/08 — são testes de formulário feitos no modo Preview do GTM, contados como leads reais.

Isso infla a única conversão que hoje alimenta o lance da campanha.

**Correção:** criar um filtro de dados no GA4.

GA4 → **Admin** → **Filtros de dados** → **Criar filtro** → **Tráfego interno interno**

Ou, mais direto para este caso, adicionar uma condição de bloqueio na tag `17 · GA4 - Evento - Lead Cadastro` no GTM:

| Tipo | Condição |
|---|---|
| Acionador de bloqueio | `{{Referrer}}` contém `tagassistant.google.com` |

> Ao testar formulários em Preview daqui em diante, saiba que cada envio conta como lead até esse bloqueio existir.

---

## Resumo do que fazer

| Prioridade | Ação | Quando |
|---|---|---|
| 🔴 | Rotacionar o `api_secret` e tirar da URL | **hoje** |
| 🔴 | Bloquear `tagassistant.google.com` na tag `17` | hoje — cabe no congelamento |
| 🟠 | Implementar Offline Conversion Import com `gclid` | [doc 13](13-conversoes-offline-gclid.md) — durante o congelamento |
| 🟡 | Corrigir o payload do MP com `client_id` + `session_id` | opcional, só se quiser o funil no GA4 |
| 🟡 | Mover os eventos do robô para fluxo de dados próprio | [doc 06](06-ga4-propriedade-e-eventos.md) |

**Não promova `software_activation` a conversão principal esperando que ela volte a funcionar.** Ela está em `SIGNUP`, que você religou ontem — mas com `sessions: 0` ela não vai atribuir nada. O caminho que resolve é o do `gclid`.
