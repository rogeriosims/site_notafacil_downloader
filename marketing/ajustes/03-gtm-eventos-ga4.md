# 3. Eventos GA4 de download e de retorno

**Prioridade:** 🟠 Alto · **Tempo:** ~20 min · **Sistema:** Google Tag Manager

## Problema

Todas as tags de download no container são do tipo `awct` — **conversão do Google Ads apenas**. Não existe nenhuma tag de evento GA4 para downloads.

Consequência: no GA4 da propriedade `527459850`, os eventos `download_store`, `download_exe` e `download_recorrente` têm **0 ocorrências**. O funil do site é invisível no Analytics — dá para ver a sessão chegar e o lead ser gerado, mas o download some.

> O evento `lead_download` (6 ocorrências) que aparece no GA4 **não vem do site** — vem do aplicativo desktop. Não confunda os dois.

Há também um evento morto: `src/pages/index.astro:970` empurra `download_recorrente` quando um cadastro existente pede novo download. Não existe gatilho nem tag para ele. Não contar isso como conversão no Ads é **correto e intencional** (está comentado no código) — mas hoje ele também não gera nenhuma visibilidade.

---

## Passo a passo

### 1. Criar os três gatilhos que faltam

Dois já existem (`25 · download_store` e o `download_exe` do documento anterior). Falta só o de retorno.

GTM → **Acionadores** → **Novo**

| Campo | Valor |
|---|---|
| Nome | `download_recorrente` |
| Tipo | **Evento personalizado** |
| Nome do evento | `download_recorrente` |

### 2. Criar as tags de evento GA4

Crie **três** tags com esta configuração base:

- **Tipo:** Google Analytics → **Evento do GA4**
- **ID de métricas:** `G-40J8HYRSRM`

| Nome da tag | Nome do evento | Acionador |
|---|---|---|
| `GA4 - Evento - Download Store` | `download_store` | `download_store` (ID `25`) |
| `GA4 - Evento - Download EXE` | `download_exe` | `download_exe` |
| `GA4 - Evento - Download Recorrente` | `download_recorrente` | `download_recorrente` |

Em cada uma, adicione um parâmetro de evento para permitir análise agregada:

| Nome do parâmetro | Valor |
|---|---|
| `metodo_download` | `store` / `exe` / `recorrente` |

> **Não marque essas tags como conversão do Ads.** As conversões de download já existem via tags `22` e `24`. Estas aqui são só para medição no GA4.

### 3. Publicar

**Enviar** → `Adiciona eventos GA4 de download (store, exe, recorrente)` → **Publicar**.

### 4. Registrar os parâmetros como dimensões personalizadas

Sem esse passo, `metodo_download` chega ao GA4 mas não aparece em nenhum relatório.

GA4 → **Administrador** → **Definições personalizadas** → **Criar dimensão personalizada**

| Campo | Valor |
|---|---|
| Nome da dimensão | `Método de download` |
| Escopo | **Evento** |
| Parâmetro do evento | `metodo_download` |

> Dimensões personalizadas só valem para dados **a partir da criação** — não são retroativas.

### 5. Marcar os eventos-chave

GA4 → **Administrador** → **Eventos principais** → **Marcar como evento principal**

| Evento | Marcar? | Motivo |
|---|---|---|
| `download_store` | ✅ Sim | conversão de negócio real |
| `download_exe` | ✅ Sim | conversão de negócio real |
| `download_recorrente` | ❌ **Não** | cliente existente, não é aquisição |

> ⚠️ Os eventos só aparecem nessa lista **depois de ocorrerem ao menos uma vez**. Se não estiverem listados, dispare cada um manualmente pelo site e volte em algumas horas.

⚠️ **Não importe esses eventos-chave como conversão no Google Ads.** Os downloads já contam via tags `22`/`24`. Importar de novo geraria contagem dupla — foi assim que a conta acumulou 6 ações de lead redundantes.

---

## Bônus: corrigir a variável `URL - gclid`

Ao auditar o container encontrei a variável `19 · URL - gclid` malformada:

```
Tipo:            Variável de URL
Componente:      Consulta
Chave da consulta:  gclid{{Click ID}}     ← 🔴 errado
```

Alguém inseriu a variável `{{Click ID}}` dentro do campo de chave da consulta. Ela procura um parâmetro literalmente chamado `gclid` + o valor de Click ID, em vez de `gclid`.

**Correção:** GTM → **Variáveis** → `URL - gclid` → apague o campo e deixe apenas:

```
Chave da consulta:  gclid
```

> A variável não é referenciada por nenhuma tag hoje, então o impacto atual é zero — mas deixá-la quebrada é uma armadilha para quem for usá-la depois. O `gclid` que o site realmente usa vem do `sessionStorage`, gravado pelo script final de `BaseLayout.astro`.

---

## Verificação

GA4 → **Relatórios** → **Tempo real**, com o site aberto em outra aba. Dispare um download e confirme que o evento aparece em até 30 segundos com o parâmetro `metodo_download` preenchido.

Se não aparecer: confirme que aceitou os cookies (sem consentimento não há GTM, logo não há evento) e que a versão do container foi publicada, não apenas salva.
