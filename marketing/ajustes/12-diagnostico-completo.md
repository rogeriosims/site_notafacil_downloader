# Diagnóstico Completo — o "porquê" de cada ajuste

> **Documento de referência.** Para saber *o que fazer e quando*, use o
> **[Plano Cronológico](00-plano-cronologico.md)**. Este aqui explica o raciocínio por trás dele.
>
> Levantado em 12–13/08/2026 a partir de dados vivos do Google Ads, GA4, GTM e do histórico de
> alterações da conta.

## Identificadores

| Sistema | Identificador |
|---|---|
| Google Ads | `18004623240` *(customer interno `6399835788`)* |
| Campanha Pesquisa | `23643564211` · orçamento `15416244878` |
| Grupo de anúncios | `197913527910` — "Grupo de anúncios 1" |
| GA4 (propriedade) | `527459850` · measurement ID `G-40J8HYRSRM` |
| GTM | `6342867810` / `245549997` — `GTM-KHF7CGHF`, versão **13** |

---

## O que mudou desde a revisão 1

Três descobertas alteram o plano. Duas delas invalidam recomendações anteriores.

### 🔴 1. O item 1 não teve efeito — e o motivo não é o que eu supus

Marcar Download MSXI e EXE como "Principal" **não fez essas conversões contarem**. Os dados confirmam:

| Data | Ação | `conversions` | `all_conversions` |
|---|---|---|---|
| 06/08 | Download MSXI | **0** | 7 |
| 10/08 | Download MSXI | **0** | 3 |
| 11/08 | Download EXE | **0** | 3 |
| 13/08 | Download EXE | **0** | 1 |

A causa é a camada de **metas de conversão da campanha**, que eu não havia inspecionado:

| Categoria da meta | Biddable na campanha |
|---|---|
| SUBMIT_LEAD_FORM | ✅ **True** |
| SIGNUP | ❌ False |
| PURCHASE, PAGE_VIEW, ADD_TO_CART, CONTACT, QUALIFIED_LEAD | ❌ False |

Download MSXI e EXE são da categoria **SIGNUP**, que **não é biddable nesta campanha**. O ajuste no nível da ação é irrelevante enquanto a categoria estiver desligada — a meta manda, a ação obedece.

> **Efeito colateral que passou despercebido:** `software_activation` também é SIGNUP. Ele rendeu **11 conversões** entre março e junho e hoje está zerado pelo mesmo motivo. A conta perdeu o sinal de ativação real do software, que é uma conversão de negócio legítima — não uma duplicata de funil.

### 🟢 2. A conversão de lead já voltou sozinha

Em **12/08 a campanha registrou 2 conversões** — as primeiras desde 25/05. Vieram de `Nota Fácil Downloader (web) generate_lead`, o import do GA4, que é SUBMIT_LEAD_FORM e portanto biddable.

No GA4, `generate_lead` disparou **15 vezes entre 05 e 13/08**. O formulário funciona, a tag `17` funciona, o import atribui.

> Isso rebaixa a urgência do documento 01. A campanha **não está mais cega**. Recriar a conversão nativa deixa de ser emergência e vira decisão de qualidade de medição — com sequenciamento seguro, detalhado no [documento 01](01-gtm-conversao-lead.md).

### 🔴 3. O CPC não explodiu só por falta de sinal

O histórico de alterações mostra uma causa mais direta. Em **08/08 às 02:29** o teto de CPC foi **removido** (`targetSpend.cpcBidCeilingMicros`: R$ 1,80 → nenhum), junto com a migração para MAXIMIZE_CONVERSIONS.

| Data | CPC médio |
|---|---|
| até 07/08 *(teto de R$ 1,80 ativo)* | R$ 1,86 |
| 10/08 | **R$ 6,13** |
| 11/08 | **R$ 5,92** |
| 12/08 | R$ 3,93 |
| 13/08 | R$ 4,12 |

A guarda foi retirada exatamente no momento em que não havia dado de conversão para substituí-la. Não foi só cegueira — foi cegueira **sem freio**.

### 🟠 4. Instabilidade de configuração

Em 8 dias, por `teccorpbh@gmail.com`:

| Data/hora | Alteração |
|---|---|
| 05/08 15:50 | negativas criadas: `baixador`, `gratis`, `gratuito`, `gratuita`, `"baixar xml gratuito"` |
| 05/08 16:03 | teto de CPC definido em R$ 1,80 |
| 05/08 16:04 → 16:05 | orçamento 20 → 50 → 80 |
| 05/08 17:03 | campanha reativada |
| 07/08 23:30 | negativa `baixador` removida |
| 08/08 02:24 | campanha reativada · orçamento 20 → 50 |
| 08/08 02:29 | **teto de CPC removido** |
| 11/08 22:40 | campanha pausada |
| 12/08 00:38 | orçamento 80 → 50 |
| 12/08 01:08 | novo orçamento R$ 10 criado — "[Display] - Remarketing" |

**Seis mudanças de orçamento e três ciclos de pausa/reativação em oito dias.** Cada uma perturba a fase de aprendizado do Smart Bidding. Boa parte da instabilidade atribuída à falta de conversão vem daqui.

> A negativa `baixador`, criada em 05/08 e removida em 07/08, teria bloqueado `baixador de xml` — palavra-chave com **6 conversões** no período bom. Removida a tempo.

---

## Configuração-alvo das conversões

O modelo que produziu CPA R$ 15,09 entre março e junho, reconstruído a partir dos dados:

| Ação | Categoria | Meta biddable | Ação principal | Conta? |
|---|---|---|---|---|
| lead *(import GA4 ou nativa)* | SUBMIT_LEAD_FORM | ✅ manter | ✅ | ✅ otimiza |
| `software_activation` | SIGNUP | 🔧 **religar** | ✅ | ✅ otimiza |
| Download MSXI | SIGNUP | — | 🔧 **voltar a Secundária** | ❌ observação |
| Download EXE | SIGNUP | — | 🔧 **voltar a Secundária** | ❌ observação |

**Por que os downloads ficam de fora:** o download acontece em `/obrigado/`, **depois** do formulário. O mesmo usuário gera 1 lead + 1 download. Contar os dois infla o volume e ensina o algoritmo a pagar duas vezes pela mesma aquisição.

**Por que `software_activation` entra:** ativar o software é um evento independente e posterior, que só ocorre se o lead era real. É o melhor sinal de qualidade que a conta tem — e já provou entregar 11 conversões atribuídas ao pago.

---

## Ordem de execução

Mudou-se para o **[Plano Cronológico](00-plano-cronologico.md)**, organizado por data em vez de prioridade.

Situação em 13/08: todos os ajustes críticos de Ads foram aplicados e verificados. A conta está em **congelamento de 14 dias, até 27/08**.

---

## Correções de diagnósticos anteriores

Três afirmações minhas anteriores não se sustentaram. Registradas aqui para que ninguém as reaplique:

1. **"Downloads como Secundárias são a causa raiz."** Errado. A causa é a meta SIGNUP desligada na campanha. E os downloads *devem mesmo* ficar fora da otimização — são downstream do lead.
2. **"A conversão de lead está morta e precisa ser recriada com urgência."** Já não está: o import `generate_lead` voltou a atribuir em 12/08.
3. **"27 de 28 palavras com índice de qualidade abaixo de 5."** Número inflado — a API devolve `0` também para "sem dados". Só existem três IQ reais na conta: 7, 3 e 3.

E uma que **se confirmou e segue válida**: as negativas `gratis` / `gratuito` / `gratuita` bloqueiam os melhores conversores da conta (CPA de R$ 2,16 a R$ 10,91, contra média de R$ 15,09). Foram criadas em 05/08 e estão no **grupo de anúncios**, não na campanha — ver [documento 04](04-ads-palavras-negativas.md).
