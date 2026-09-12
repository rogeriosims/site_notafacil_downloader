# 1. Consolidar a conversão de lead (Ads + GTM)

**Prioridade:** 🟡 Médio · **Tempo:** ~30 min · **Sistemas:** Google Ads + Google Tag Manager

> **Revisado em 13/08.** Este documento era 🔴 Crítico na revisão 1, sob a premissa de que a conversão de lead estava morta. **Ela não está mais.** Leia a seção seguinte antes de executar qualquer coisa.

## Situação atual

Em **12/08 a campanha registrou 2 conversões** — as primeiras desde 25/05. Vieram de `Nota Fácil Downloader (web) generate_lead`, o import do GA4.

O caminho que funciona hoje:

```
formulário enviado
  └─ dataLayer.push({event: 'lead_cadastro'})      index.astro:979
      └─ gatilho 13 · Formulário Processado         {{_event}} equals lead_cadastro
          ├─ tag 17 · GA4 - Evento - Lead Cadastro  → envia generate_lead ao GA4  ✅
          │   └─ import GA4 → Ads                   → 2 conversões em 12/08       ✅
          ├─ tag 14 · Google Ads - Lead Nota Fácil  → ação REMOVED                ❌ morta
          └─ tag 26 · Cadastro formulario           → ação REMOVED (7717875969)   ❌ morta
```

No GA4, `generate_lead` disparou **15 vezes entre 05 e 13/08**. Formulário, gatilho, tag e import estão todos de pé.

> **A campanha não está cega.** Este documento deixou de ser emergência e virou decisão de qualidade de medição.

## O que ainda precisa de ajuste

1. **Duas tags mortas** (`14` e `26`) disparando para ações removidas a cada lead. Não causam erro visível, mas poluem o container e são armadilha para a próxima pessoa que abrir o GTM.
2. **O caminho via import do GA4 mede menos** que uma tag nativa do Ads.

### Nativa vs import do GA4

| | Tag nativa do Ads | Import do GA4 *(atual)* |
|---|---|---|
| Perda por consentimento | só o `ad_storage` | **duplo filtro:** GA4 + Ads |
| Latência | minutos | 24–72 h |
| Enhanced Conversions | suporte direto | limitado |
| Histórico nesta conta | **42 conversões** (mar–jun) | 0 (mar–jun) · 2 (12/08) |

A nativa mede mais. Mas a diferença de março a junho não é comparação limpa — o import provavelmente ainda não estava vinculado. O ganho real é desconhecido, e o caminho atual **funciona**.

---

## Decisão

**Recomendo executar**, mas sem pressa e com sequenciamento que nunca deixa a campanha sem sinal.

**Se preferir não executar:** faça apenas a Parte A (excluir as tags mortas) e pare. É higiene pura, risco zero, 5 minutos. O import do GA4 segue medindo.

---

## Parte A — Excluir as tags mortas *(faça sempre)*

GTM → **Tags**:

- `Cadastro formulario` (ID `26`) → ⋮ → **Excluir**
- `Google Ads - Lead Nota Fácil` (ID `14`) → ⋮ → **Excluir**

Ambas apontam para ações de conversão removidas. Nenhuma das duas produz efeito hoje.

> Se você for executar a Parte B, **não exclua a tag `14`** — ela será reaproveitada. Exclua só a `26`.

Publicar: **Enviar** → `Remove tags de conversao de lead apontando para acoes removidas`.

---

## Parte B — Migrar para conversão nativa *(opcional)*

> ⚠️ **Não execute durante o congelamento de 14 dias.** Trocar a fonte de conversão reinicia o aprendizado. Faça depois que a campanha estabilizar com a configuração dos documentos 08, 05 e 04.

### 1. Criar a ação no Google Ads — como **Secundária**

Ads → **Metas** → **Conversões** → **+ Nova ação** → **Site** → **Adicionar manualmente usando código**

| Campo | Valor |
|---|---|
| Categoria | **Envio de formulário de lead** |
| Nome | `Lead - Cadastro Formulario` |
| Valor | Não usar valor |
| Contagem | **Uma** |
| Janela de clique | 30 dias |
| Ação principal | 🔴 **Secundária** — por enquanto |
| Atribuição | Baseada em dados |

**Por que Secundária agora:** ela precisa provar que dispara antes de assumir o leilão. Como Secundária ela aparece em `all_conversions` sem interferir no Smart Bidding — nem duplicando o import, nem arriscando um vazio se algo estiver errado.

Copie o **rótulo de conversão** ao final.

### 2. Reapontar a tag `14`

GTM → **Tags** → `Google Ads - Lead Nota Fácil`:

- **ID da conversão:** `18004623240` *(sem o prefixo `AW-`)*
- **Rótulo:** o novo, do passo 1
- **Vinculador de conversões:** ativado
- **Acionamento:** manter `Formulário Processado - Cadastro` — não alterar
- Renomear para `Google Ads - Lead Cadastro [acao: Lead - Cadastro Formulario]`

> O nome carrega a dependência. Se a ação for removida de novo, quem abrir o container vê imediatamente o que quebrou — foi a falta disso que deixou duas tags mortas no ar por dois meses.

### 3. Validar no Preview

**Visualizar** → carregue a home → ⚠️ **aceite os cookies** (sem consentimento o GTM não carrega e o Preview fica vazio) → envie o formulário.

- [ ] evento `lead_cadastro` na linha do tempo
- [ ] `Google Ads - Lead Cadastro [...]` em **Tags Fired**
- [ ] `GA4 - Evento - Lead Cadastro` em **Tags Fired**
- [ ] `Cadastro formulario` ausente (excluída na Parte A)
- [ ] nenhuma tag do Ads disparando duas vezes

Publicar.

### 4. Observar por 5 dias

Ads → Metas → Conversões. A ação nova deve acumular volume em "Todas as conversões".

Compare com `generate_lead` no mesmo período:

- **Nativa ≥ import** → siga para o passo 5
- **Nativa < import** → algo está errado na tag; **não troque**. Investigue antes.
- **Nativa em zero** → não publicou, ou o rótulo está errado. Revise o passo 2.

### 5. A troca — em uma única sessão

Só depois que o passo 4 confirmar volume:

1. `Lead - Cadastro Formulario` → **Principal**
2. `Nota Fácil Downloader (web) generate_lead` → **Secundária**

> 🔴 **As duas mudanças juntas, na mesma sessão.** Se só a primeira for feita, cada lead conta duas vezes e o Smart Bidding aprende com volume inflado. Se só a segunda, a campanha fica sem sinal de lead.

---

## Higiene: 6 ações de lead removidas na conta

`Lead_NotaFacil_GTM`, `Cadastro formulario`, `Enviar formulário de lead`, `Enviar formulário de lead (1)`, `Lead_NotaFacil_GTM`… O padrão indica que a conversão vinha sendo recriada sem reapontar as tags do GTM.

Ações removidas não podem ser excluídas de vez e não atrapalham. O que evita a repetição é a convenção de nome do passo 2 — a tag do GTM carregando o nome da ação a que pertence.
