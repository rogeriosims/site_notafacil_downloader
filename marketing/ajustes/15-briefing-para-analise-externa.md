# Briefing para análise externa — Google Ads / Nota Fácil Downloader

> **Propósito:** submeter a outra IA ou consultor a decisão de estratégia de lance em disputa.
> Todos os números foram extraídos da API do Google Ads e do GA4 em **14/08/2026**.
> Distingo explicitamente **medido** de **inferido**. A seção final lista o que revisei durante a análise.

---

## 1. Contexto de negócio

Software desktop (robô) que baixa XML e PDF de NFS-e em lote do Portal Nacional. Público: escritórios de contabilidade no Brasil. Modelo: plano gratuito vitalício de 100 notas/mês, cobrança por volume acima disso.

O funil é: anúncio → landing page → **formulário de cadastro** → página de obrigado → download do instalador → instalação → ativação → eventual compra.

Conversão principal declarada: preenchimento do formulário de lead.

## 2. Identificadores

| Sistema | ID |
|---|---|
| Google Ads | `18004623240` (interno `6399835788`) |
| Campanha em análise | `23643564211` — `[Pesquisa] - Leads - Nota Fácil`, tipo SEARCH |
| Grupo de anúncios | `197913527910` (único) |
| GA4 | propriedade `527459850`, stream `G-40J8HYRSRM` |
| GTM | `GTM-KHF7CGHF`, container `245549997`, versão publicada 15 |

---

## 3. Linha do tempo verificada

Extraída de `change_event` da API, exceto onde indicado.

| Data/hora | Evento | Fonte |
|---|---|---|
| 17/04 | Captura de `gclid` implementada no site | git `fe63d98` |
| 25/06 | **Formulário removido do site** em refactor da landing | git `0ccf2ab` |
| ~25/05 a 05/08 | Campanha praticamente sem veiculação | dados de gasto |
| 05/08 15:50 | Negativas amplas criadas: `gratis`, `gratuito`, `gratuita`, `baixador` | change_event |
| 05/08 16:03 | Teto de CPC definido em **R$ 1,80** | change_event |
| 07/08 23:30 | Negativa `baixador` removida | change_event |
| **08/08 02:29** | **Teto de CPC removido** + estratégia → MAXIMIZE_CONVERSIONS | change_event |
| 11/08 ~22:00 | Formulário restaurado e publicado | build local + HTTP live |
| 12/08 | Primeira conversão desde 25/05 | métricas |
| 13/08 13:09–13:16 | Negativas de gratuidade removidas; 7 negativas exatas criadas | change_event |
| 13/08 13:24 | Estratégia → TARGET_SPEND com teto **R$ 2,00** | change_event |
| 13/08 | Metas de conversão: `SIGNUP` religada como biddable | estado da API |
| **14/08 ~11h** | **Estratégia → MAXIMIZE_CONVERSIONS, teto removido** *(por recomendação de especialista do Google)* | estado da API + curva horária |

---

## 4. Dados de desempenho

### 4.1 Período de referência — 09/03 a 30/06/2026

A única janela com veiculação contínua e medição funcionando.

| Métrica | Valor |
|---|---|
| Cliques | 534 |
| Investimento | R$ 799,63 |
| Conversões | **53** |
| **CPA** | **R$ 15,09** |
| **CPC médio** | **R$ 1,50** |
| CTR | 10,59% |
| **Taxa de conversão** | **9,93%** |

Composição das 53 conversões:

| Ação | Conversões | Situação hoje |
|---|---|---|
| `Lead_NotaFacil_GTM` (WEBPAGE, nativa) | 42 | REMOVED |
| `software_activation` (import GA4) | 11 | ENABLED |

Campanha de Display no mesmo período: 287 cliques, R$ 145,91, **1 conversão**, CPA R$ 145,91, CTR 0,49%. Pausada.

### 4.2 Palavras-chave — 09/03 a 30/06

| Palavra-chave | Corresp. | Cliques | Custo | Conv. | CPA |
|---|---|---|---|---|---|
| `download nfse` | Frase | 207 | R$ 304,89 | **34** | **R$ 8,97** |
| `baixar xml portal nacional nfse` | Ampla | 94 | R$ 126,37 | 6 | R$ 21,06 |
| `baixador de xml` | Frase | 76 | R$ 118,10 | 6 | R$ 19,68 |
| `xml em lote` | Frase | 38 | R$ 86,72 | 6 | R$ 14,45 |
| `download xml nfse` | Frase | 28 | R$ 53,21 | 0 | — |

`baixar xml portal nacional nfse` está **pausada** hoje. Era a maior fonte de impressões (1.350).

### 4.3 Termos de busca de melhor CPA — 09/03 a 30/06

| Termo | Cliques | Conv. | CPA |
|---|---|---|---|
| `nfse downloader` | 168 | **30** | R$ 7,83 |
| `busca xml gratuito` | 3 | 3 | **R$ 2,16** |
| `baixar xml em lote gratuito` | 8 | 3 | **R$ 4,08** |
| `baixar xml em lote grátis` | 14 | 3 | R$ 10,91 |
| `nfse downloader automation` | 9 | 2 | R$ 7,59 |

> Termos com intenção de gratuidade convertem 1,4x a 7x melhor que a média da conta. Coerente com o plano gratuito ser o produto de entrada.

### 4.4 Desempenho por hora — 09/03 a 30/06

| Faixa | Cliques | Conv. | Taxa |
|---|---|---|---|
| 8h–12h | 308 | 22 | 7,1% |
| **13h–18h** | 226 | **31** | **13,7%** |

Por dia da semana a distribuição é plana (99 a 115 cliques); sexta tem a maior conversão (13). **Não há dado de fim de semana nem de madrugada** — a programação nunca permitiu veiculação nessas faixas.

### 4.5 Série diária recente — agosto de 2026

| Data | Impr. | Cliques | Custo | **CPC** | Conv. | Configuração de lance |
|---|---|---|---|---|---|---|
| 05/08 | 6 | 1 | R$ 1,98 | R$ 1,98 | 0 | teto R$ 1,80 |
| 06/08 | 217 | 18 | R$ 33,24 | **R$ 1,85** | 0 | teto R$ 1,80 |
| 07/08 | 179 | 12 | R$ 22,48 | **R$ 1,87** | 0 | teto R$ 1,80 |
| 10/08 | 167 | 26 | R$ 159,49 | **R$ 6,13** | 0 | sem teto, MaxConv |
| 11/08 | 164 | 27 | R$ 159,96 | **R$ 5,92** | 0 | sem teto, MaxConv |
| 12/08 | 101 | 19 | R$ 74,58 | R$ 3,93 | **2** | sem teto, MaxConv |
| 13/08 | 108 | 10 | R$ 35,58 | R$ 3,56 | **3** | misto — teto R$ 2,00 a partir de 13h24 |
| 14/08 | 92 | 8 | R$ 45,29 | **R$ 5,66** | 0 | misto — MaxConv sem teto a partir de ~11h |

> ⚠️ **Leitura crítica de 05–07/08:** CPC baixo com zero conversões. Isso **não** indica tráfego ruim — nesse período a conversão de lead estava quebrada (formulário fora do ar até 11/08). Ausência de conversão ali é ausência de medição, não de resultado.

### 4.6 O experimento natural de 14/08

Mesma campanha, mesmo dia, mesmas palavras-chave, mesma demanda. Única variável alterada: estratégia de lance, entre 10h e 12h.

| Hora | Impr. | Cliques | Custo | CPC |
|---|---|---|---|---|
| 8h | 15 | 0 | — | — |
| 9h | 15 | 1 | R$ 1,88 | R$ 1,88 |
| 10h | 17 | 3 | R$ 5,66 | R$ 1,89 |
| 11h | 10 | 0 | — | — |
| 12h | 27 | 2 | R$ 22,49 | R$ 11,25 |
| 13h | 4 | 0 | — | — |
| 14h | 1 | 1 | R$ 12,49 | R$ 12,49 |

```
antes (8h–11h)   4 cliques · R$ 7,54  · CPC R$ 1,88
depois (12h–14h) 3 cliques · R$ 34,98 · CPC R$ 11,66      → 6,2x
```

Dia fechado: 8 cliques, R$ 45,29 — **estourou o orçamento diário de R$ 30**, dentro da margem de 2x que o Google permite.

---

## 5. Configuração atual — 14/08

### Campanha
| Parâmetro | Valor |
|---|---|
| Estratégia | `MAXIMIZE_CONVERSIONS` |
| Teto de CPC | **nenhum** (`0`) |
| CPA desejado | **nenhum** (`0`) |
| Orçamento diário | R$ 30 |
| Programação | seg–sex, 6h–21h *(sem fim de semana)* |
| Status | ENABLED |

### Palavras-chave
21 positivas ativas: 6 exatas, 15 em frase, **0 amplas**. 12 negativas, sendo 7 exatas de desperdício comprovado e 5 amplas de intenção divergente (`nfe`, `danfe`, `leitor`, `imprimir` + `"baixar xml gratuito"` em frase).

### Metas de conversão da campanha
`SUBMIT_LEAD_FORM` = biddable · `SIGNUP` = biddable · demais 7 categorias = não biddable.

### Ações de conversão ativas

| Ação | Tipo | Categoria | Principal | Contagem |
|---|---|---|---|---|
| `generate_lead` | Import GA4 | SUBMIT_LEAD_FORM | **Sim** | MANY_PER_CLICK |
| `software_activation` | Import GA4 | SIGNUP | **Sim** | ONE_PER_CLICK |
| `Site - Formulário de Lead` | WEBPAGE nativa | SUBMIT_LEAD_FORM | Não | ONE_PER_CLICK |
| `Download MSXI` / `Download EXE` | WEBPAGE | SIGNUP | Não | ONE_PER_CLICK |

**Conversões acumuladas na configuração atual: 5** (2 em 12/08, 3 em 13/08).

---

## 6. Defeitos de medição conhecidos

Relevantes porque o algoritmo de lance aprende a partir desse sinal.

| Defeito | Evidência | Efeito |
|---|---|---|
| Perda por consentimento | proporção cliques/sessões de **3,3:1** | ~70% do tráfego pago invisível ao GA4 |
| Eventos do app sem sessão | `software_activation`, `purchase`, `paywall_view` com **`sessions = 0`** no GA4 | atribuição degradada; 30 compras em 45 dias, 0 atribuídas |
| Tráfego de teste contado | 10 eventos `generate_lead` com referrer `tagassistant.google.com` | infla a conversão principal |
| Contagem permissiva | `generate_lead` é `MANY_PER_CLICK` | mesmo clique pode contar mais de uma vez |

**Consequência:** a conversão que hoje alimenta o lance é parcial (perde 70%) e contaminada (testes + contagem múltipla).

---

## 7. A decisão em disputa

### Posição do especialista do Google
> "O clique vai trazer curiosos que podem ou não preencher o formulário de lead, que é a conversão hoje. Maximizar Conversões é o ideal, pois vai atrás de quem preenche."

Implementado em 14/08: MAXIMIZE_CONVERSIONS sem CPA desejado e sem teto de CPC.

### Minha recomendação
Voltar a **Maximizar Cliques com teto de CPC de R$ 2,00**, com gatilho de saída definido: migrar para Maximizar Conversões com CPA desejado de R$ 25 **ao atingir 30 conversões acumuladas**.

### Fundamentação

**a) Aritmética de partida a frio.** Com orçamento fixo de R$ 30/dia:

| | Max. Cliques | Max. Conversões |
|---|---|---|
| CPC observado | R$ 1,88 | R$ 11,66 |
| Cliques/dia | 16 | 2,6 |
| Conversões/dia a 9,93% | 1,6 | 0,26 |
| **Dias até 30 conversões** | **~19** | **~115** |

Maximizar Conversões precisa de volume de conversão para calibrar (referência pública do Google: ~30/mês). Na configuração atual leva ~4 meses para acumulá-lo, pagando o dobro por conversão durante todo o percurso. É um laço que se sustenta: CPC alto → poucos cliques → poucas conversões → modelo não calibra.

**b) Ponto de equilíbrio.** Como `CPA = CPC ÷ taxa de conversão`, para MaxConv a R$ 11,66 empatar com MaxCliques a R$ 1,88, a taxa precisa subir de 9,93% para **26,4%** — 2,7x. É a barra que a tese do especialista precisa superar.

**c) A qualificação já está sendo feita por outro mecanismo.** As 7 negativas exatas adicionadas em 13/08 vieram de 5 meses de relatório de termos de busca e bloqueiam R$ 103,41 de desperdício comprovado. O algoritmo tem 5 pontos de dado; as negativas têm 5 meses. Hoje a triagem de "curiosos" está vindo das negativas, não do lance.

**d) Qualidade do sinal.** Ver seção 6. Maximizar Conversões otimiza para um alvo que perde 70% dos casos e inclui tráfego de teste.

**e) Custo de reverter é baixo.** Maximizar Cliques é estratégia mecânica, sem modelo a preservar. A campanha ficou ~1 dia em MaxConv.

### Steelman da posição oposta

Argumentos legítimos a favor de manter MaxConv, que outra IA deve pesar:

1. **A direção está correta.** Otimizar por conversão é o destino certo; eu concordo com isso e o plano prevê a migração.
2. **Cliques mais caros podem ser mais qualificados.** Não há, ainda, dado suficiente para refutar. A amostra pós-troca é de 3 cliques.
3. **Sinais amplos do Google.** Mesmo sem histórico próprio, o algoritmo usa sinais de categoria, dispositivo, horário e intenção. Pode dar a partida melhor que a projeção linear sugere.
4. **O especialista tem benchmark entre contas** que não está disponível aqui.
5. **A campanha nunca rodou MaxConv com medição funcionando.** Em 10–11/08, quando rodou sem teto, a conversão de lead estava quebrada. A comparação histórica é imperfeita.

### O que eu não consigo justificar de forma alguma
Rodar Maximizar Conversões **sem CPA desejado**, numa conta com 5 conversões. Isso remove qualquer limite superior para o custo por conversão. Um clique custou R$ 12,49 hoje.

---

## 8. Critérios de falsificação

Para tornar a disputa decidível sem depender de autoridade:

| Medida em 20/08 | Conclusão |
|---|---|
| Taxa de conversão **> 26,4%** | Especialista certo. Manter MaxConv. |
| Taxa entre 15% e 26,4% | Inconclusivo. Estender e reavaliar. |
| Taxa **< 15%** | Tese não se sustenta nesta conta. Reverter. |
| CPC médio > R$ 8 por 3 dias | Reverter independentemente da taxa. |

⚠️ **Poder estatístico:** com ~6 cliques/dia, até 20/08 haverá ~36 cliques. A ~10% de taxa esperam-se 3–4 conversões. **Isso é insuficiente para separar 10% de 26% com confiança.** O teste de CPC é conclusivo; o de taxa de conversão não será. Outra IA deve considerar se existe desenho melhor sob essa restrição de verba.

---

## 9. Restrições e fatos adicionais relevantes

- **Crédito de R$ 331,93 expira em 20/08.** Origem: promoção do Google de R$ 600 declarada como "para campanhas Performance Max". **Não verificado** se é restrito a PMax ou aplicável à conta toda. Com R$ 30/dia e fim de semana bloqueado, restam ~4 dias úteis = ~R$ 120 de consumo projetado. O crédito provavelmente será perdido.
- **Programação bloqueia fim de semana**, sem nenhum dado histórico que sustente ou refute a restrição.
- **`baixar xml portal nacional nfse` está pausada** — 1.350 impressões e 6 conversões no período de referência, maior fonte de impressões da conta.
- **Site:** formulário restaurado e publicado desde 11/08, verificado por HTTP em produção. Captura `gclid` e envia ao backend (n8n) a cada cadastro.
- **Existe caminho não implementado:** importação de conversões offline via `gclid`, que contornaria a perda por consentimento e permitiria otimizar por receita em vez de lead. Janela de atribuição: 90 dias a partir do clique.

---

## 10. Correções feitas durante esta análise

Registradas para calibrar a confiança em quem escreveu este briefing.

| Afirmação inicial | Correção | Causa do erro |
|---|---|---|
| "Downloads como Secundárias são a causa raiz do zero conversões" | A causa era a meta `SIGNUP` não-biddable na campanha | não inspecionei a camada de metas antes de concluir |
| "A conversão de lead está morta, recriar com urgência" | O import `generate_lead` voltou a atribuir em 12/08 sozinho | analisei janela de 30 dias sem checar o estado corrente |
| "27 de 28 palavras com IQ abaixo de 5" | A API devolve `0` também para "sem dados"; só existem 3 IQ reais (7, 5, 3) | aceitei o output da ferramenta sem validar a semântica do campo |
| "`software_activation` não voltará a atribuir com `sessions = 0`" | Atribuiu 1 conversão em 13/08 | conclusão forte demais a partir de ausência de dado |
| "As 30 compras podem ser atribuídas cruzando o `gclid` por e-mail" | Impossível: o site ficou sem formulário de 25/06 a 11/08, logo não há cadastro nem `gclid` para essa coorte | não incorporei uma informação que o próprio usuário havia dado |
| "Falta publicar o formulário" | Já estava publicado desde 11/08 | assumi sem verificar produção |

**Padrão dos erros:** conclusões apressadas a partir de dados parciais, sem verificar a camada seguinte ou o estado corrente. As afirmações de **seção 4 (dados medidos)** foram extraídas diretamente da API e conferidas; as de **seção 7 (interpretação)** carregam o risco acima.

---

## 11. Pergunta para o analista externo

Dada a restrição de **R$ 30/dia**, **5 conversões de histórico**, **sinal de conversão que perde ~70% por consentimento** e **crédito expirando em 20/08**:

1. Maximizar Conversões sem CPA desejado é defensável nesta conta?
2. Se não, a correção mínima é definir CPA desejado ou reverter para Maximizar Cliques com teto?
3. Existe desenho de teste com poder estatístico útil sob R$ 30/dia? *(Nota: duplicar a campanha não funciona — o Google desdupica por Ad Rank e a campanha de lance maior tomaria as impressões.)*
4. A ordem de prioridade proposta — corrigir medição antes de otimizar lance — está correta, ou há ganho maior em outro lugar?
