# 9. Revisão das palavras-chave aplicadas

**Data da conferência:** 13/08/2026 · **Campanha:** `23643564211` · **Grupo:** `197913527910`

Auditoria do que foi efetivamente aplicado, conferido contra o estado vivo da conta.

---

## Veredito

**As negativas foram aplicadas corretamente e por completo.** Nenhum erro de correspondência, nenhuma armadilha reintroduzida. Os cinco termos vencedores entraram como exata. Há **um ajuste importante pendente** e uma redundância inofensiva.

---

## ✅ Negativas — execução correta

### Removidas, como recomendado

| Termo | Correspondência | Efeito |
|---|---|---|
| `gratis` | Ampla | 🔓 desbloqueia o segmento de gratuidade |
| `gratuito` | Ampla | 🔓 desbloqueia `busca xml gratuito` (CPA R$ 2,16) e `baixar xml em lote gratuito` (CPA R$ 4,08) |
| `gratuita` | Ampla | 🔓 — |

### Adicionadas — **todas em exata**, exatamente como pedido

| Termo | Desperdício que bloqueia *(mar–jun)* |
|---|---|
| `[baixar xml]` | 35 cliques · R$ 44,73 · 0 conv. |
| `[download xml]` | 14 cliques · R$ 18,52 · 0 conv. |
| `[baixar nf]` | 9 cliques · R$ 11,92 · 0 conv. |
| `[nfs]` | 10 cliques · R$ 9,26 · 0 conv. |
| `[baixar xml em lote]` | 6 cliques · R$ 8,69 · 0 conv. |
| `[xml]` | 5 cliques · R$ 5,10 · 0 conv. |
| `[emissor nacional]` | 6 cliques · R$ 5,19 · 0 conv. |

**Total bloqueado: R$ 103,41** de gasto improdutivo, sem tocar em nenhum termo que converte.

### Conferência de colisões — nenhuma encontrada

O risco real desta operação era uma negativa nova derrubar um termo vencedor. Verifiquei cada par:

| Negativa | Poderia derrubar | Derruba? |
|---|---|---|
| `[baixar xml em lote]` exata | `baixar xml em lote grátis` · `baixar xml em lote gratuito` | ❌ Não — exata só bloqueia a consulta idêntica |
| `[baixar xml]` exata | `baixar xml nfse` (palavra-chave ativa) | ❌ Não |
| `[download xml]` exata | `download xml nfse` (palavra-chave ativa) | ❌ Não |
| `"baixar xml gratuito"` frase | `baixar xml em lote gratuito` | ❌ Não — "em lote" quebra a sequência contígua |
| `[emissor nacional]` exata | `emissor nacional nfse download` | ❌ Não — e essa palavra já está removida |

> **Foi exatamente por isso que a exata era obrigatória.** Qualquer uma dessas em correspondência de frase teria derrubado pelo menos um termo com conversão.

### Mantidas, corretamente

`leitor`, `imprimir`, `nfe`, `danfe` (amplas) e `"baixar xml gratuito"` (frase). Todas seguem válidas — intenção de produto diferente ou desperdício comprovado.

---

## ✅ Palavras-chave vencedoras — todas as cinco entraram

| Palavra-chave | Correspondência | Histórico *(mar–jun)* |
|---|---|---|
| `[nfse downloader]` | Exata | 168 cliques · **30 conv.** · CPA R$ 7,83 |
| `[baixar xml em lote grátis]` | Exata | 14 cliques · 3 conv. · CPA R$ 10,91 |
| `[baixar xml em lote gratuito]` | Exata | 8 cliques · 3 conv. · CPA R$ 4,08 |
| `[busca xml gratuito]` | Exata | 3 cliques · 3 conv. · CPA R$ 2,16 |
| `[nfse downloader automation]` | Exata | 9 cliques · 2 conv. · CPA R$ 7,59 |

Com as negativas de gratuidade removidas, os três termos de gratuidade voltam a poder servir.

---

## 🔴 Pendência: uma palavra-chave pausada que converte

`baixar xml portal nacional nfse` está **PAUSADA** (ampla) e sua variante em frase está **REMOVIDA**. É a segunda maior fonte de conversão do período bom:

| Métrica | Valor |
|---|---|
| Impressões | **1.350** — a maior de todas as palavras |
| Cliques | 94 |
| Conversões | **6** |
| CPA | R$ 21,06 |

CPA acima da média de R$ 15,09, mas ainda lucrativo — e era a principal fonte de volume da campanha. Com ela desligada, o tema "portal nacional" ficou coberto apenas por `portal nacional nfse` (1 clique no período inteiro) e `download nfse portal nacional` (nenhum).

Isso é visível nos dados recentes — as impressões estão caindo:

| Data | Impressões |
|---|---|
| 10/08 | 167 |
| 11/08 | 164 |
| 12/08 | 101 |
| 13/08 | **64** |

**Ação recomendada — mas só após o congelamento:** recriar como **frase**, não ampla:

```
"baixar xml portal nacional nfse"
```

> **Frase e não ampla:** em ampla ela custou R$ 21,06 por conversão contra R$ 8,97 da campeã em frase. A ampla trouxe volume, mas volume mais caro. Em frase, mantém o tema e aperta a relevância.
>
> **Por que esperar o congelamento:** adicionar palavra-chave durante o período de aprendizado adiciona uma variável. Anote e execute junto com o item 5.2 do [documento 05](05-ads-estrutura-campanha.md).

---

## 🟡 Observações menores

### `busca xml gratuito` está duplicada

Existe em **frase** (`431111919327`) e em **exata** (`431111919487`).

Não causa dano — o Google resolve no leilão, a exata tem precedência para a consulta idêntica e a frase captura variações. Pode deixar como está. Se preferir enxugar, remova a versão em frase.

### Candidata a pausa: `download xml nfse`

| Métrica | Valor |
|---|---|
| Cliques | 28 |
| Custo | **R$ 53,21** |
| Conversões | **0** |

É a maior palavra-chave sem nenhuma conversão que segue ativa. As outras zeradas gastaram menos de R$ 13 cada e não valem intervenção.

**Ação:** pausar — **após o congelamento**, junto com o item 5.4 do documento 05.

### Índice de qualidade melhorou

`xml em lote` subiu de **3 para 5**. Os índices reais da conta agora são:

| Palavra-chave | IQ |
|---|---|
| `baixar notas em lote portal nacional` | 7 |
| `xml em lote` | **5** *(era 3)* |
| `baixador de xml` | 3 |

As demais seguem sem dado suficiente para o Google calcular — o que a API reporta como `0` e as ferramentas interpretam erroneamente como qualidade zero.

### Nenhuma correspondência ampla ativa

Todas as amplas positivas estão **pausadas ou removidas**. O item 5.4 do documento 05 ("pausar as amplas") já está cumprido — atualizei aquele documento.

O grupo tem hoje **18 palavras-chave ativas**: 6 em exata, 12 em frase, nenhuma em ampla. É uma configuração saudável para uma campanha reconstruindo histórico.

---

## Resumo do que fazer

| Quando | Ação |
|---|---|
| **Agora** | Nada nas palavras-chave. Só a estratégia de lance ([doc 05 § 5.6](05-ads-estrutura-campanha.md#56-estratégia-de-lance--o-que-executar-agora)) e as metas de conversão ([doc 08](08-ads-metas-de-conversao.md)). |
| Após 14 dias | Recriar `"baixar xml portal nacional nfse"` em frase |
| Após 14 dias | Pausar `download xml nfse` |
| Opcional | Remover a duplicata em frase de `busca xml gratuito` |
