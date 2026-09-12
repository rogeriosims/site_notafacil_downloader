# Plano Cronológico — Nota Fácil Downloader

> **Revisão 3** — 13/08/2026. Substitui a ordenação por prioridade das revisões anteriores.
> Congelamento em curso: **13/08 → 27/08/2026**.

## Identificadores

| Sistema | Identificador |
|---|---|
| Google Ads | `18004623240` *(customer interno `6399835788`)* |
| Campanha Pesquisa | `23643564211` · orçamento `15416244878` |
| Grupo de anúncios | `197913527910` |
| GA4 | propriedade `527459850` · `G-40J8HYRSRM` |
| GTM | `6342867810` / `245549997` — `GTM-KHF7CGHF` v13 |

---

## ✅ CONCLUÍDO — 13/08

Estado conferido na API. Nada aqui precisa de nova ação.

| Ajuste | Estado verificado |
|---|---|
| Meta `SUBMIT_LEAD_FORM` biddable | ✅ `true` |
| Meta `SIGNUP` biddable | ✅ `true` — religada |
| `software_activation` Principal | ✅ voltou a contar |
| Download MSXI / EXE Secundárias | ✅ revertidas |
| Estratégia de lance | ✅ Maximizar cliques |
| Teto de CPC | ✅ **R$ 2,00** |
| Negativas de gratuidade removidas | ✅ as três |
| Negativas de desperdício em exata | ✅ as sete |
| Termos vencedores como palavra-chave | ✅ os cinco |
| Correspondência ampla ativa | ✅ nenhuma |

**Orçamento alterado para R$ 30/dia** (não estava no plano, mas é aceitável — com teto de R$ 2,00 rende 15–20 cliques/dia, contra ~5/dia do período lucrativo).

> **A partir daqui, o entregável é a disciplina.** A conta sofreu 6 mudanças de orçamento e 3 ciclos de pausa/reativação em 8 dias. Nenhuma configuração sobreviveu tempo suficiente para produzir leitura.

---

## 📅 14/08 — QUINTA — Reunião com o especialista do Google

**Não altere nada na conta antes, durante ou logo depois da reunião.**

Agenda completa, com as perguntas a fazer e o que recusar: **[documento 11](11-reuniao-google-agenda.md)**.

Os três pontos que não podem faltar:

1. **Termos exatos do crédito de R$ 600** — data de expiração e exigência de gasto, por escrito
2. **Por que o import `generate_lead` do GA4 marcou 0 conversões de março a junho** e voltou a atribuir em 12/08
3. **Pedir que a equipe de otimização do Google NÃO toque na conta** durante o congelamento

---

## 🧊 15/08 a 26/08 — CONGELAMENTO

### Proibido no Google Ads

- ❌ Mudar orçamento
- ❌ Pausar ou reativar campanha
- ❌ Trocar estratégia de lance ou teto de CPC
- ❌ Adicionar, pausar ou remover palavras-chave
- ❌ Criar campanha nova — **inclusive a de PMax**
- ❌ Aplicar recomendações do Google

### Permitido — não afeta o leilão

Estes são trabalhos de GTM, GA4 e site. Podem ser feitos à vontade nesse período.

| Quando | Tarefa | Documento | Tempo |
|---|---|---|---|
| 🔴 **HOJE** | **Commitar e publicar o formulário** — existe só no working tree; um checkout limpo o derruba | [13](13-conversoes-offline-gclid.md) | 15 min |
| 🔴 **HOJE** | Rotacionar o `api_secret` do Measurement Protocol — foi exposto em texto puro | [14](14-n8n-measurement-protocol.md) | 10 min |
| 🔴 **HOJE** | Bloquear `tagassistant.google.com` na tag `17` — 10 leads falsos de teste | [14](14-n8n-measurement-protocol.md) | 10 min |
| **Esta semana** ⏳ | Verificar no n8n os leads com `gclid` de 15–25/05 — a janela de 90 dias está fechando | [13](13-conversoes-offline-gclid.md) | 15 min |
| 15/08 | Gatilho de dataLayer para `download_exe` | [02](02-gtm-gatilho-download-exe.md) | 10 min |
| 15/08 | Excluir as tags mortas `14` e `26` | [01, Parte A](01-gtm-conversao-lead.md) | 5 min |
| 18/08 | Eventos GA4 de download + corrigir variável `URL - gclid` | [03](03-gtm-eventos-ga4.md) | 20 min |
| 18/08 | Criar a ação de conversão offline como **Secundária** | [13](13-conversoes-offline-gclid.md) | 10 min |
| 20/08 | Consent Mode avançado + Enhanced Conversions | [07](07-consent-mode-e-enhanced-conversions.md) | 45 min |
| 18/08 | Verificar qual identificador a página do n8n dentro do app recebe | [13](13-conversoes-offline-gclid.md) | 15 min |
| 20–25/08 | Montar o fluxo de upload offline no n8n — cruzando o `gclid` pelo e-mail | [13](13-conversoes-offline-gclid.md) | 2 h |
| 22/08 | Separar dados de site e app no GA4 | [06](06-ga4-propriedade-e-eventos.md) | 30 min |
| 25/08 | Preparar criativos e textos da PMax *(sem publicar)* | [10](10-pmax-credito-google.md) | 1 h |

### Acompanhamento — só observar, não agir

#### Registro

| Data | Impr. | Cliques | Custo | CPC | Conv. | CPA |
|---|---|---|---|---|---|---|
| 10/08 | 167 | 26 | R$ 159,49 | R$ 6,13 | 0 | — |
| 11/08 | 164 | 27 | R$ 159,96 | R$ 5,92 | 0 | — |
| 12/08 | 101 | 19 | R$ 74,58 | R$ 3,93 | **2** | R$ 37,29 |
| 13/08 | 108 | 10 | R$ 35,58 | R$ 3,56 | **3** | **R$ 11,86** |
| 14/08 *(até 10h)* | 37 | 1 | R$ 1,88 | R$ 1,88 | 0 | — |

Composição das conversões: `generate_lead` 2 + 2 · `software_activation` 0 + 1.

✅ **O teto de CPC funcionou** — de R$ 6,13 para R$ 1,88 em quatro dias.
✅ **`software_activation` voltou a atribuir** em 13/08, primeira vez desde junho. Corrige a previsão do [documento 14](14-n8n-measurement-protocol.md).

#### ⚠️ Risco em observação: volume caindo

Com CPC de R$ 1,88 e R$ 30/dia, a campanha poderia comprar ~16 cliques. Está comprando 1 a 10. **Não é limite de verba, é de leilão.**

Três causas somadas, todas de 13/08: teto mais baixo, sete negativas exatas novas, e `baixar xml portal nacional nfse` pausada — que era a maior fonte de impressões.

> **A única exceção ao congelamento, já prevista:** se até **17/08** os cliques continuarem abaixo de **8/dia**, suba o teto para **R$ 2,50**. Nada além disso.
>
> Não antecipe. A queda pode ser apenas as negativas filtrando tráfego improdutivo — o que é o resultado desejado, não um problema.

#### O que anotar a cada 3 dias

| Métrica | Alvo |
|---|---|
| Cliques/dia | 8 ou mais |
| CPC médio | ≤ R$ 2,00 |
| Conversões acumuladas desde 12/08 | chegar a 30 até 27/08 |
| CPA | ≤ R$ 25 |

---

## 📅 27/08 — DIA 14 — Leitura dos resultados

Levante os números do período 13/08 → 27/08 e compare:

| Métrica | Referência mar–jun | Alvo em 27/08 |
|---|---|---|
| CPC médio | R$ 1,50 | ≤ R$ 2,00 |
| Taxa de conversão | 9,9% | ≥ 7% |
| CPA | R$ 15,09 | ≤ R$ 25 |
| Conversões acumuladas | — | ≥ 30 |

### Decisão A — se atingiu 30 conversões e CPA ≤ R$ 25

Trocar a estratégia de lance, em uma única sessão:

1. **Lances** → **Conversões** → **Maximizar conversões**
2. **Definir um CPA desejado** → `25,00`

### Decisão B — se ficou abaixo de 30 conversões

Manter Maximizar cliques com teto de R$ 2,00 e **prorrogar por mais 14 dias**. Volume insuficiente não se resolve trocando de estratégia.

### Decisão C — se o CPA passou de R$ 40

Não é problema de lance. Revisar em ordem: os termos de busca que entraram, a taxa de conversão da landing page, e se `generate_lead` continua registrando.

---

## 📅 28/08 em diante — Um item por vez, 5 dias entre cada

| Ordem | Ação | Documento |
|---|---|---|
| 1 | Recriar `"baixar xml portal nacional nfse"` em **frase** | [09](09-revisao-palavras-chave.md) |
| 2 | Pausar `download xml nfse` — R$ 53,21, zero conversões | [09](09-revisao-palavras-chave.md) |
| 3 | Avaliar o volume da conversão offline e decidir a promoção a Principal | [13](13-conversoes-offline-gclid.md) |
| 4 | Criar o 2º RSA no grupo atual | [05 § 5.3](05-ads-estrutura-campanha.md) |
| 5 | Lançar a campanha PMax com o crédito | [10](10-pmax-credito-google.md) |
| 6 | Dividir em 4 grupos temáticos | [05 § 5.1](05-ads-estrutura-campanha.md) |
| 7 | Migrar a conversão de lead para tag nativa *(se a offline não a substituir)* | [01, Parte B](01-gtm-conversao-lead.md) |

> Se a importação offline se provar (item 3), ela pode tornar o item 7 desnecessário — ela mede melhor que qualquer tag no navegador. Decida em 27/08 com os dados na mão.

> **Um por vez, com 5 dias de intervalo.** O erro que produziu a situação atual foi acumular seis mudanças em oito dias e não conseguir atribuir efeito a nenhuma.

---

## Resposta rápida às três perguntas

### Estamos prontos para os 14 dias?

**Sim.** Tudo que era pré-requisito está aplicado e verificado. O congelamento começa hoje, 13/08, e termina em 27/08.

### O crédito de R$ 600 em PMax também espera?

**Sim — mas com uma tarefa amanhã.** Lançar PMax agora colocaria duas campanhas em aprendizado ao mesmo tempo, disputando os mesmos leilões, sem forma de saber o que causou o quê. O crédito não some por esperar 14 dias.

**O que fazer amanhã:** obter do especialista a data exata de expiração e a exigência de gasto. Se o prazo for menor que 30 dias, avise — aí a conversa muda. Detalhes e as travas obrigatórias no [documento 10](10-pmax-credito-google.md).

### O que ver com o especialista do Google?

[Documento 11](11-reuniao-google-agenda.md) — agenda completa, com os números para levar, as perguntas que só eles respondem, e a lista do que recusar. Resumo: eles são remunerados por gasto da conta e vão empurrar aumento de verba, correspondência ampla e migração para PMax. Extraia o suporte técnico e o crédito; recuse o resto durante o congelamento.
