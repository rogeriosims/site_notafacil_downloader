# 5. Estrutura da campanha e índice de qualidade

**Prioridade:** 🟡 Médio · **Tempo:** 1–2 h · **Sistema:** Google Ads
**Campanha:** `[Pesquisa] - Leads - Nota Fácil` (`23643564211`)

> **Revisado em 13/08.** A seção [5.6](#56-teto-de-cpc-e-estabilidade) foi adicionada e é 🔴 **crítica e imediata** — o teto de CPC foi removido da campanha em 08/08 e é a causa mais direta do CPC atual.
>
> ⚠️ **As demais seções só devem ser executadas 14 dias depois** de concluir [08](08-ads-metas-de-conversao.md), [5.6](#56-teto-de-cpc-e-estabilidade) e [04](04-ads-palavras-negativas.md). Reestruturar grupos zera o histórico de aprendizado.

---

## Correção de leitura sobre o índice de qualidade

Uma primeira análise apontou "27 de 28 palavras-chave com índice de qualidade abaixo de 5". **Esse número está inflado.** A API do Google Ads retorna `0` tanto para "qualidade péssima" quanto para "sem dados suficientes", e as ferramentas contam os dois como zero.

O que existe de índice de qualidade real na conta:

| Palavra-chave | IQ real |
|---|---|
| `baixar notas em lote portal nacional` | **7** |
| `xml em lote` | 3 |
| `baixador de xml` | 3 |
| *as outras 25* | sem dados |

A campeã de conversões, `download nfse` (207 cliques, **34 conversões**, CPA R$ 8,97), aparece com IQ `0` — mas converte melhor que a média da conta. Isso é ausência de dado, não problema de qualidade.

**Conclusão:** não existe crise de índice de qualidade. Existem duas palavras com IQ 3 que merecem atenção, e um volume baixo demais para o Google calcular o resto.

---

## O que de fato precisa mudar

### 5.1 Um único grupo de anúncios com 28 termos heterogêneos

Todo o tráfego passa por `Grupo de anúncios 1`, misturando intenções distintas:

- marca/produto — `nfse downloader`, `download nfse`
- ação genérica — `baixar xml`, `xml em lote`
- portal específico — `portal nacional nfse`, `baixar xml portal nacional nfse`
- automação — `robô para baixar nfse`, `captura automática de nfse`

Um único anúncio precisa falar com os quatro ao mesmo tempo, o que limita a relevância de todos.

**Proposta de divisão:**

| Grupo | Palavras-chave (exata + frase) | Ângulo do anúncio |
|---|---|---|
| `Marca - NFSe Downloader` | `nfse downloader`, `download nfse`, `nfse downloader automation` | nome do produto, download direto |
| `Portal Nacional` | `portal nacional nfse`, `baixar xml portal nacional nfse`, `baixar notas em lote portal nacional` | compatibilidade com o Portal Nacional |
| `Lote e Volume` | `xml em lote`, `baixar notas em lote`, `baixador de xml` | volume, produtividade do escritório |
| `Automação` | `robô para baixar nfse`, `captura automática de nfse`, `capturar nfse automaticamente` | robô, zero trabalho manual |

### 5.2 Termos vencedores que ainda não são palavras-chave

Estes converteram como termo de busca mas não existem como palavra-chave. Adicione em **exata** para ganhar controle de lance:

| Adicionar como exata | Cliques | Conv. | CPA |
|---|---|---|---|
| `[nfse downloader]` | 168 | **30** | R$ 7,83 |
| `[baixar xml em lote gratuito]` | 8 | 3 | R$ 4,08 |
| `[baixar xml em lote grátis]` | 14 | 3 | R$ 10,91 |
| `[busca xml gratuito]` | 3 | 3 | R$ 2,16 |
| `[nfse downloader automation]` | 9 | 2 | R$ 7,59 |

> ✅ **Conferido em 13/08: as cinco já foram adicionadas em exata, e as negativas amplas de gratuidade foram removidas.** Auditoria completa em [documento 09](09-revisao-palavras-chave.md).

#### Pendente: recuperar a segunda maior fonte de conversão

`baixar xml portal nacional nfse` está **pausada** (ampla) e sua variante em frase foi **removida**. Ela entregou **1.350 impressões — a maior de todas as palavras — 94 cliques e 6 conversões** a CPA R$ 21,06.

Com ela desligada, o tema "portal nacional" ficou praticamente descoberto, e as impressões da campanha vêm caindo: 167 → 164 → 101 → **64** entre 10 e 13/08.

**Ação (após o congelamento):** recriar em **frase**, não em ampla:

```
"baixar xml portal nacional nfse"
```

Em ampla ela custou R$ 21,06 por conversão contra R$ 8,97 da campeã em frase — trouxe volume, mas volume caro. Em frase, mantém o tema e aperta a relevância.

### 5.3 Um único anúncio no grupo

`Grupo de anúncios 1` tem **1 RSA** (13 títulos, 4 descrições). O Google não consegue rotacionar nem testar nada com uma criação só.

**Ação:** crie um segundo RSA por grupo, variando o ângulo — se o atual lidera com "automação", o novo lidera com "gratuito / sem cartão". O CTR de 10,59% mostra que a comunicação atual acerta; o segundo anúncio é para descobrir se dá para acertar mais.

### 5.4 Correspondência ampla — ✅ já resolvido

**Conferido em 13/08: não há nenhuma correspondência ampla positiva ativa.** Todas estão pausadas ou removidas. O grupo tem hoje 18 palavras ativas — 6 em exata, 12 em frase.

Resta apenas uma pausa a fazer, e só depois do congelamento:

| Palavra-chave | Cliques | Custo | Conv. | Ação |
|---|---|---|---|---|
| `download xml nfse` (frase) | 28 | **R$ 53,21** | **0** | pausar |

É a maior palavra-chave sem conversão ainda ativa. As demais zeradas gastaram menos de R$ 13 cada e não valem intervenção.

> ⚠️ **Não pause `baixar xml portal nacional nfse`** — ela já está pausada, e essa é justamente a pendência descrita em [5.2](#52-termos-vencedores-que-ainda-não-são-palavras-chave). Ela precisa **voltar**, em frase.

### 5.5 Verba nunca foi o gargalo

| Período | Gasto real/dia |
|---|---|
| 09/03 – 30/06 | **R$ 7** |
| 10–11/08 | R$ 159 |
| 12–13/08 | R$ 50 |

No período lucrativo a campanha gastava R$ 7/dia. O limitador era cobertura de leilão, não dinheiro.

O salto de agosto não foi aumento de alcance — foi o Smart Bidding pagando caro por cegueira, agravado pela remoção do teto de CPC ([5.6](#56-teto-de-cpc-e-estabilidade)). Em 10 e 11/08 a campanha gastou **R$ 159/dia** com o orçamento em R$ 80, dentro da margem de 2x que o Google permite em dias individuais.

**Ação:** mantenha R$ 50/dia e **pare de mexer**. O orçamento foi alterado seis vezes em oito dias — essa oscilação sozinha já impede o algoritmo de estabilizar. Não aumente até ver CPA abaixo de R$ 25 com conversões novas registrando de forma consistente.

> A parcela de impressões perdida por classificação (58,4%) que aparece nos relatórios é dos **últimos 30 dias** — período em que os lances estavam sem sinal. Não use esse número como base de decisão; remeça depois da estabilização.

### 5.6 Estratégia de lance — o que executar agora

> 🔴 **Executar imediatamente, antes do congelamento.** As demais seções deste documento seguem a regra dos 14 dias.

#### A conta em uma frase

A campanha está em **Maximizar Conversões sem CPA desejado**, com **2 conversões de histórico**. Nessa combinação o Google não tem base para calcular quanto vale um clique, então ele chuta alto. É por isso que o CPC saiu de R$ 1,50 para R$ 4,16.

Não é um problema de verba nem de palavra-chave. É estratégia de lance errada para o volume de dados que existe hoje.

#### Por que isso importa tanto

A taxa de conversão da campanha é estável e alta: **9,9%** (53 conversões / 534 cliques no período bom). Com essa taxa fixa, o CPC determina o CPA quase sozinho:

| CPC | Cliques com R$ 50/dia | Conversões/dia *(a 9,9%)* | **CPA** |
|---|---|---|---|
| R$ 1,50 *(histórico)* | 33 | 3,3 | **R$ 15** |
| R$ 2,00 *(alvo)* | 25 | 2,5 | **R$ 20** |
| R$ 4,16 *(hoje)* | 12 | 1,2 | **R$ 42** |

Cada real a mais no clique é quase um real a mais no lead. Derrubar o CPC é a alavanca mais direta que existe nesta conta.

#### A alteração — passo a passo

Google Ads → campanha `[Pesquisa] - Leads - Nota Fácil` → **Configurações** → **Lances**

1. Clique em **Alterar tipo de lance** (ou "Mudar estratégia de lances")
2. Selecione **Cliques** → **Maximizar cliques**
3. Marque **Definir um limite máximo de custo por clique**
4. Digite **`2,00`**
5. Salvar

Só isso. Não mexa em mais nada — nem orçamento, nem palavras-chave, nem status.

> **Por que Maximizar Cliques e não CPA desejado:** o CPA desejado precisa de ~30 conversões para calibrar. Com 2, ele não tem o que calibrar e sufoca a entrega — a campanha para de aparecer e você fica sem dados **e** sem leads. Maximizar Cliques com teto faz o oposto: compra o máximo de tráfego dentro de um custo que você controla, e as conversões se acumulam sozinhas a 9,9%.

> **Por que R$ 2,00 e não R$ 1,80:** R$ 1,80 era o teto até 08/08, mas o leilão ficou mais caro desde então. R$ 2,00 dá folga sem devolver o problema. Se em 5 dias a campanha estiver com menos de 15 cliques/dia, suba para R$ 2,50 — e só isso.

#### Quando trocar de novo — e o gatilho exato

Volte para Maximizar Conversões **somente** quando a campanha acumular **30 conversões** na configuração nova. Confira em Campanhas → coluna **Conversões**, filtrando desde 12/08.

Quando chegar lá, em uma única sessão:

1. **Lances** → **Conversões** → **Maximizar conversões**
2. Marque **Definir um CPA desejado** → digite **`25,00`**

> **Por que R$ 25 e não R$ 15,09:** travar o CPA desejado no valor histórico exato faz o algoritmo recusar leilões que valeriam a pena, e a entrega despenca. Comece ~60% acima e aperte no máximo 20% por ajuste, esperando 7 dias entre eles.

#### Resumo da decisão

| Situação | Estratégia | Parâmetro |
|---|---|---|
| **Hoje** — menos de 30 conversões | Maximizar cliques | teto de CPC **R$ 2,00** |
| Menos de 15 cliques/dia após 5 dias | Maximizar cliques | teto de CPC **R$ 2,50** |
| A partir de 30 conversões | Maximizar conversões | CPA desejado **R$ 25** |
| CPA estável abaixo de R$ 20 por 14 dias | Maximizar conversões | apertar o CPA em 20% |

#### Instabilidade de configuração

Em 8 dias a conta sofreu **seis mudanças de orçamento** (20 → 50 → 80 → 20 → 50 → 80 → 50) e **três ciclos de pausa/reativação**. Cada uma perturba a fase de aprendizado.

Boa parte da instabilidade atribuída à falta de conversão vem daqui. Nenhuma configuração sobreviveu tempo suficiente para produzir leitura.

**Ação:** congelamento de 14 dias após os documentos 08, 04 e esta seção. Sem exceção.

#### Orçamentos órfãos

Quatro orçamentos existem sem campanha vinculada (`reference_count = 0`):

| ID | Nome | Valor |
|---|---|---|
| `15790697236` | [Display] - Remarketing - Nota Fácil | R$ 10 |
| `15435042875` | Display-Contabeis | R$ 30 |
| `15435052796` | [Display] - Segmentação Portal Contábeis | R$ 15 |
| `15420997818` | Campaign #1 | R$ 0,01 |

O primeiro foi criado em **12/08 às 01:08** — uma campanha de remarketing começada e abandonada. Não geram custo, mas confundem a tela de orçamentos. Limpe quando conveniente.

### 5.7 Campanha de Display

| Métrica | 09/03 – 30/06 |
|---|---|
| Impressões | 58.923 |
| Cliques | 287 |
| Custo | R$ 145,91 |
| Conversões | **1** |
| CPA | R$ 145,91 |
| CTR | 0,49% |

CPA quase 10x o da Pesquisa. **Manter pausada.** Se houver interesse em Display no futuro, faça como remarketing para quem visitou e não baixou — não como prospecção fria em portal contábil.

---

## Ordem sugerida

**Imediato, antes do congelamento:**

1. Restaurar o controle de CPC e parar de mexer em orçamento *(5.6)*

**Depois dos 14 dias de congelamento:**

2. Adicionar os termos vencedores como exata *(5.2)* — ganho imediato, risco zero
3. Pausar as amplas *(5.4)*
4. Criar o segundo RSA no grupo atual *(5.3)*
5. Só então dividir em quatro grupos *(5.1)* — é a mudança mais invasiva
6. Reavaliar verba com dados novos *(5.5)*

Faça um item por vez, com pelo menos 5 dias entre eles. O erro que produziu a situação atual foi acumular seis mudanças em oito dias e não conseguir atribuir efeito a nenhuma.
