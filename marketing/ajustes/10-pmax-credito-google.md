# 10. Crédito de R$ 600 e a campanha Performance Max

**Decisão:** aguardar o congelamento · **Lançamento previsto:** a partir de 28/08/2026

## Resposta direta

**Não lance a PMax agora.** Espere os 14 dias, pelo mesmo motivo que vale para todo o resto: a campanha de Pesquisa tem **2 conversões** de histórico na configuração nova e precisa acumular sinal sem interferência.

Lançar PMax hoje criaria três problemas ao mesmo tempo:

1. **Duas campanhas em aprendizado simultâneo.** Nenhuma das duas produz leitura confiável, e não há como saber qual causou o quê.
2. **Disputa pelos mesmos leilões.** PMax serve também na Rede de Pesquisa. Ela competiria com a sua própria campanha pelas mesmas buscas, encarecendo as duas.
3. **Contaminação do sinal de conversão.** PMax alcança YouTube, Display, Discover e Gmail — públicos muito mais frios. Com o plano gratuito como isca, ela tende a trazer cadastros que nunca ativam o software. Esses leads entram na mesma conta e ensinam o algoritmo a buscar mais gente parecida.

O crédito não expira por esperar 14 dias — **desde que o prazo dele seja maior que isso.** É a única informação que falta.

---

## A tarefa de amanhã (14/08)

Obter do especialista, **por escrito**:

- [ ] Data exata de **expiração** do crédito
- [ ] Existe **exigência de gasto prévio**? *(o padrão é "gaste R$ X em Y dias, receba R$ Z")*
- [ ] O crédito vale **só para PMax** ou pode ser usado em Pesquisa?
- [ ] O prazo começa a contar da **ativação** ou da concessão?

### O que fazer com a resposta

| Prazo restante | Decisão |
|---|---|
| **Mais de 30 dias** | Aguardar o congelamento normalmente. Lançar em 28/08. |
| **Entre 20 e 30 dias** | Aguardar. Lançar em 28/08 com orçamento maior para consumir o crédito no tempo restante. |
| **Menos de 20 dias** | Pedir prorrogação ao especialista — costuma ser possível. Se negarem, é decisão de negócio: R$ 600 de crédito valem arriscar o aprendizado da campanha que já provou dar CPA R$ 15? **Minha recomendação é que não valem.** |

> Se o crédito puder ser usado em **Pesquisa**, a conversa acaba: aplique na campanha existente depois do congelamento. É o melhor uso possível — canal comprovado, CPA conhecido, zero risco novo.

---

## Expectativa realista de desempenho

Sendo honesto sobre o encaixe: **PMax não é o canal natural deste produto.**

O Nota Fácil resolve um problema de intenção explícita — o contador precisa baixar XML de NFS-e em lote e vai ao Google procurar. Isso é Pesquisa. Os canais que a PMax adiciona (YouTube, Display, Discover, Gmail) alcançam quem **não** está procurando.

Some-se o plano gratuito, que é um ímã para cadastro sem intenção de uso.

| Cenário | CPA esperado |
|---|---|
| Pesquisa *(comprovado)* | R$ 15,09 |
| PMax lead gen B2B nichado *(estimativa)* | R$ 40 a R$ 80 |

**Mesmo assim vale testar** — é crédito, não dinheiro seu. Só não planeje em cima do resultado, e mate a campanha sem dó se o CPA passar de R$ 80 ou se os leads não ativarem.

> Sem feed do Merchant Center, essa será uma **PMax para geração de leads**. Ela não terá o componente de Shopping, que é onde a PMax costuma brilhar. Se o especialista apresentar cases de PMax, pergunte se são de e-commerce com feed — quase sempre são, e não se aplicam aqui.

---

## Travas obrigatórias no lançamento

Executar tudo isto **antes** de ativar a campanha. Sem exceção.

### 1. Metas de conversão restritas a `SUBMIT_LEAD_FORM`

Na criação da campanha → **Metas de conversão** → usar metas específicas da campanha:

- ✅ Envio de formulário de lead
- ❌ Inscrição *(desmarcar)*

> **Por quê:** `generate_lead` teve 15 eventos em 9 dias contra 5 de `software_activation` — é o sinal de maior volume, e volume é o que uma campanha nova precisa. Deixar SIGNUP ligada faria a PMax otimizar para downloads, que são fáceis e downstream, inflando o resultado aparente.

### 2. Expansão de URL — **desativada**

Configurações → **Expansão da URL final** → **Não enviar tráfego para outros URLs**.

> Com ela ligada, a PMax manda tráfego pago para posts do blog em vez da landing page com formulário. É o erro mais caro e mais comum em PMax de lead gen.

### 3. Exclusões de marca

Configurações → **Exclusões de marca** → adicionar `Nota Fácil`, `Nota Fácil Downloader`, `notafacildownloader`.

> Impede a PMax de comprar cliques de quem já procura sua marca — tráfego que viria de graça pelo orgânico ou mais barato pela Pesquisa.

### 4. Negativas em nível de conta

A PMax não aceita negativas por campanha, mas **respeita a lista de negativas da conta**.

Ferramentas → **Palavras-chave negativas da conta** → adicionar, em exata:

```
[baixar xml]      [download xml]   [baixar nf]
[nfs]             [xml]            [emissor nacional]
[baixar xml em lote]
```

Mais as amplas de intenção errada: `nfe`, `danfe`, `leitor`, `imprimir`.

> ⚠️ **Não adicione as negativas de gratuidade.** Vale para a PMax a mesma lição do [documento 04](04-ads-palavras-negativas.md): `gratuito` bloqueia os melhores conversores da conta.

### 5. Orçamento separado

Nunca compartilhe orçamento com a Pesquisa. Calcule para consumir o crédito no prazo:

```
R$ 600 ÷ dias restantes do crédito = orçamento diário
```

Exemplo: 20 dias restantes → **R$ 30/dia**.

### 6. Ativos — o que preparar durante o congelamento

Pode ser feito entre 15 e 26/08, sem tocar na conta. Crie a campanha como **rascunho** ou monte os arquivos fora.

| Ativo | Quantidade | Origem |
|---|---|---|
| Títulos (30 caracteres) | 5–15 | reaproveitar do RSA atual |
| Títulos longos (90 caracteres) | 5 | copy da landing |
| Descrições (90 caracteres) | 5 | `.agent/SSOT-PRODUTO.md` |
| Imagens 1200×628 | 5 | `src/assets/` |
| Imagens 1200×1200 | 5 | recortes das mesmas |
| Logo 1200×1200 e 1200×300 | 1 de cada | identidade do site |
| Vídeo YouTube | 1 | **importante** — sem vídeo o Google gera um automático, geralmente ruim |
| URL final | 1 | a home, com formulário — nunca um post do blog |

> Consulte `.agent/PRECOS-SSOT.md` antes de escrever qualquer número de plano nos anúncios.

---

## Como avaliar depois de lançar

O indicador que importa não é o CPA da PMax — é a **qualidade do lead**.

```
taxa de ativação = software_activation ÷ generate_lead
```

Compare o número da PMax com o da Pesquisa. Se a PMax trouxer leads que não ativam o software, ela está poluindo a base e o sinal de conversão da conta inteira, mesmo com CPA aparentemente aceitável.

**Critérios de encerramento** — mate a campanha se, após consumir o crédito:

- CPA acima de **R$ 80**, ou
- taxa de ativação menos da metade da Pesquisa, ou
- o CPA da Pesquisa subir mais de 30% no mesmo período *(sinal de canibalização)*
