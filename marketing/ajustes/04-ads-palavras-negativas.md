# 4. Palavras-chave negativas — correção crítica

**Prioridade:** 🔴 Crítico · **Tempo:** ~15 min · **Sistema:** Google Ads
**Campanha:** `[Pesquisa] - Leads - Nota Fácil` (`23643564211`)
**Grupo de anúncios:** `197913527910` — "Grupo de anúncios 1"

> **Revisado em 13/08.** Correção importante de localização: as negativas estão no **grupo de anúncios**, não na campanha. A revisão 1 mandava procurá-las no lugar errado.

## Problema

As negativas ativas hoje — todas no **grupo de anúncios** `197913527910`, criadas em **05/08 às 15:50** por `teccorpbh@gmail.com`:

| Termo | Correspondência |
|---|---|
| `gratis` | Ampla |
| `gratuito` | Ampla |
| `gratuita` | Ampla |
| `leitor` | Ampla |
| `imprimir` | Ampla |
| `nfe` | Ampla |
| `danfe` | Ampla |
| `baixar xml gratuito` | Frase |

**As três primeiras estão bloqueando os melhores conversores da conta.**

Dados de 09/03 a 30/06 (período com veiculação real):

| Termo de busca | Cliques | Conv. | CPA |
|---|---|---|---|
| busca xml **gratuito** | 3 | 3 | **R$ 2,16** |
| baixar xml em lote **gratuito** | 8 | 3 | **R$ 4,08** |
| baixar xml em lote **grátis** | 14 | 3 | R$ 10,91 |

Contra um CPA médio de campanha de **R$ 15,09**. Os termos de gratuidade convertem de **3 a 7 vezes melhor** que a média.

Isso é coerente com o produto: o Nota Fácil **tem** camada gratuita. Quem busca "grátis" está procurando exatamente o que existe — não é curioso desqualificado, é o público ideal.

### A negativa `gratuito` (ampla) mata os dois melhores CPAs da conta

Uma negativa em correspondência ampla bloqueia qualquer busca que **contenha aquela palavra**. `gratuito` bloqueia `baixar xml em lote gratuito` (CPA R$ 4,08) e `busca xml gratuito` (CPA R$ 2,16).

### `gratis` sem acento é o acidente que salvou o resto

Negativas no Google Ads **não pegam variantes aproximadas** — sem plurais, sem erros de digitação, **sem acentuação**. A negativa `gratis` nunca bloqueou `grátis`.

É por isso que `baixar xml em lote grátis` continuou entrando e convertendo. O erro de digitação foi o que preservou o segmento mais lucrativo.

> ⚠️ Se alguém "corrigir" essa negativa adicionando `grátis` com acento, a conta perde o restante do segmento. **Não faça isso.**

---

## Passo a passo

### 1. Remover as três negativas nocivas

Google Ads → campanha `[Pesquisa] - Leads - Nota Fácil` → **Palavras-chave** → **Palavras-chave negativas** → aba **Grupo de anúncios**

> ⚠️ Elas estão no nível do **grupo de anúncios** `Grupo de anúncios 1`, não da campanha. A aba "Campanha" vem vazia — não conclua que já foram removidas.

Remova:

- [ ] `gratis` (ampla)
- [ ] `gratuito` (ampla)
- [ ] `gratuita` (ampla)

**Mantenha** `baixar xml gratuito` (frase). Esse termo específico teve 19 cliques e 0 conversões — é desperdício real. E por ser frase, ele **não** bloqueia `baixar xml em lote gratuito`, que não contém a sequência contígua "baixar xml gratuito".

### 2. Manter as demais

`leitor`, `imprimir`, `nfe`, `danfe` estão corretas — são intenções de produto diferente (NF-e não é NFS-e). Não mexa.

> **Quase aconteceu de novo.** Uma negativa ampla `baixador` foi criada em 05/08 e removida em 07/08. Ela bloqueava `baixador de xml` — palavra-chave com **6 conversões** e CPA R$ 19,68 no período bom. Foi pega a tempo, mas é o mesmo mecanismo das negativas de gratuidade: uma palavra genérica em correspondência ampla derrubando um termo que converte.
>
> **Regra prática:** antes de adicionar qualquer negativa ampla de uma única palavra, rode o relatório de termos de pesquisa filtrando por ela e confirme que nenhum termo com conversão contém aquela palavra.

### 3. Adicionar as negativas de desperdício real — sempre em EXATA

R$ 148,57 do período foram para termos genéricos sem nenhuma conversão:

| Termo | Cliques | Custo | Conv. |
|---|---|---|---|
| `baixar xml` | 35 | R$ 44,73 | 0 |
| `download xml` | 14 | R$ 18,52 | 0 |
| `baixar nf` | 9 | R$ 11,92 | 0 |
| `nfs` | 10 | R$ 9,26 | 0 |
| `baixar xml em lote` | 6 | R$ 8,69 | 0 |
| `xml` | 5 | R$ 5,10 | 0 |
| `emissor nacional` | 6 | R$ 5,19 | 0 |

> 🔴 **Use correspondência EXATA para todos.** Em frase, `baixar xml` bloquearia `baixar xml em lote grátis` (3 conversões) e `baixar xml em lote gratuito` (3 conversões), porque a sequência "baixar xml" aparece contígua nos dois. Seria repetir o mesmo erro das negativas de gratuidade.

Adicione, uma por linha, em **Correspondência exata**:

```
[baixar xml]
[download xml]
[baixar nf]
[nfs]
[baixar xml em lote]
[xml]
[emissor nacional]
```

### 4. Decisões que exigem julgamento

| Termo | Cliques | Custo | Recomendação |
|---|---|---|---|
| `nfse downloader` | 168 | R$ 234,84 | 🔴 **NUNCA negativar** — 30 conversões, CPA R$ 7,83. É o melhor termo da conta. Aparece como "desperdício" nos últimos 30 dias só porque a conversão está quebrada. |
| `nfse downloader baixar` | 7 | R$ 12,66 | **Não negativar.** Mesma intenção do campeão, amostra pequena demais (7 cliques) para concluir qualquer coisa. |
| `fsist` | 6 | R$ 5,38 | **Opcional.** Marca de concorrente. R$ 5,38 é irrelevante e disputar concorrente pode ser deliberado. Decida conscientemente. |

---

## Depois de aplicar

Rode este comando de verificação em ~7 dias — os termos de gratuidade devem reaparecer no relatório de termos de busca:

> Google Ads → Campanhas → **Insights e relatórios** → **Termos de pesquisa**, filtrando por "grátis" e "gratuito".

Se eles não voltarem, confirme que as negativas foram removidas da **campanha** e não apenas do grupo de anúncios, e verifique se existe alguma **lista de negativas compartilhada** anexada à campanha contendo os mesmos termos.

## Impacto esperado

Reabrir o segmento de gratuidade deve trazer de volta ~9 conversões/trimestre a um CPA entre R$ 2 e R$ 11 — o tráfego mais barato que a conta já registrou. Combinado com a restauração da conversão de lead ([documento 01](01-gtm-conversao-lead.md)), é o que recoloca a campanha na trajetória de CPA R$ 15.
