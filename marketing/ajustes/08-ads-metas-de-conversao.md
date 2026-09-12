# 8. Corrigir as metas de conversão da campanha

**Prioridade:** 🔴 Crítico · **Tempo:** ~15 min · **Sistema:** Google Ads
**Campanha:** `[Pesquisa] - Leads - Nota Fácil` (`23643564211`)

> Documento criado na revisão 2 (13/08). Substitui o item "marcar Downloads como Principal", que se mostrou ineficaz.

## Por que o ajuste de 12/08 não funcionou

Existem **duas camadas** controlando se uma conversão conta, e mexer só na de baixo não produz efeito:

```
Camada 1 — Meta de conversão da campanha   (categoria: SIGNUP, SUBMIT_LEAD_FORM, PURCHASE…)
           └─ biddable: sim / não          ← decide se a CATEGORIA inteira conta
Camada 2 — Ação de conversão                (Download MSXI, generate_lead…)
           └─ principal / secundária        ← decide quais ações contam DENTRO da categoria
```

Download MSXI e EXE foram marcados como **Principal** na camada 2. Mas a categoria deles, **SIGNUP**, está com `biddable = false` na camada 1. A ação obedece à meta — enquanto a categoria estiver desligada, nada que esteja dentro dela conta.

Estado atual das metas da campanha:

| Categoria | Biddable | Ações ENABLED nessa categoria |
|---|---|---|
| **SUBMIT_LEAD_FORM** | ✅ **true** | `Nota Fácil Downloader (web) generate_lead` |
| SIGNUP | ❌ false | `software_activation`, `Download MSXI`, `Download EXE` |
| PURCHASE | ❌ false | `Nota Fácil Downloader (web) purchase` |
| PAGE_VIEW · ADD_TO_CART · CONTACT · QUALIFIED_LEAD | ❌ false | — |

E a comprovação nos dados: entre 06 e 13/08 os Downloads acumularam **16 conversões em `all_conversions` e zero em `conversions`**.

## O dano colateral

`software_activation` também é SIGNUP. Ele entregou **11 conversões atribuídas ao tráfego pago** entre março e junho e ficou zerado pelo mesmo motivo.

Ativação do software é o melhor sinal de qualidade da conta: só acontece se o lead era real, se o download funcionou e se a pessoa instalou.

> ### ⚠️ Correção — apurado em 13/08
>
> Religar a meta SIGNUP era necessário, mas **não é suficiente para `software_activation` voltar a contar.**
>
> O evento chega ao GA4 pelo Measurement Protocol (nó n8n "G4A - Ativação") **sem `session_id`**, o que produz `sessions: 0`. Sem sessão não há origem de tráfego, e sem origem o import para o Ads não credita campanha nenhuma:
>
> | Período | Eventos no GA4 | Conversões no Ads |
> |---|---|---|
> | 01/07 – 14/08 | 24 | **0** |
>
> A meta religada continua correta — ela precisa estar ligada de todo jeito. Mas o sinal de ativação só volta quando o caminho de medição for consertado, e o caminho certo é **Offline Conversion Import com `gclid`**, não o Measurement Protocol.
>
> Detalhes: [documento 14](14-n8n-measurement-protocol.md) e [documento 13](13-conversoes-offline-gclid.md).
>
> **Consequência prática:** durante o congelamento, `generate_lead` é a única conversão realmente alimentando o lance. Considere isso ao ler os números em 27/08.

---

## Configuração-alvo

Reconstruída a partir da configuração que produziu CPA R$ 15,09 entre março e junho:

| Ação | Categoria | Meta | Ação | Resultado |
|---|---|---|---|---|
| `generate_lead` | SUBMIT_LEAD_FORM | ✅ manter biddable | Principal | otimiza |
| `software_activation` | SIGNUP | 🔧 **ligar biddable** | Principal | otimiza |
| `Download MSXI` | SIGNUP | *(idem)* | 🔧 **voltar a Secundária** | só observação |
| `Download EXE` | SIGNUP | *(idem)* | 🔧 **voltar a Secundária** | só observação |

### Por que os downloads ficam fora da otimização

O download acontece em `/obrigado/`, **depois** do envio do formulário. O mesmo usuário produz 1 lead + 1 download. Contar os dois ensina o algoritmo a pagar duas vezes pela mesma aquisição e infla o CPA aparente para baixo — o pior tipo de erro, porque parece uma melhora.

Eles continuam visíveis em `all_conversions` e nos relatórios. Só não entram no leilão.

---

## Passo a passo

### 1. Reverter os Downloads para Secundária

Google Ads → **Metas** → **Conversões** → **Resumo**

Para `Download MSXI` e `Download EXE`:

- Abrir a ação → **Configurações** → **Ação de conversão principal**
- Alterar para **Secundária** ("Não usar para otimização de lances")
- Salvar

> Isso desfaz o ajuste de 12/08. Ele não causou dano — a categoria estava desligada, então não houve contagem dupla. Mas deixá-lo como está é uma armadilha: no momento em que SIGNUP for religada (passo 2), os downloads passariam a contar junto com os leads.

**A ordem importa: faça este passo antes do próximo.**

### 2. Religar a meta SIGNUP na campanha

Google Ads → **Campanhas** → `[Pesquisa] - Leads - Nota Fácil` → **Configurações** → **Metas de conversão**

- A campanha usa **metas específicas da campanha** (sobrescrevendo as da conta)
- Marque **Inscrição / Signup** entre as metas usadas para otimização
- Confirme que **Envio de formulário de lead** continua marcada
- Deixe as demais categorias desmarcadas
- Salvar

### 3. Conferir o resultado

Ainda em Metas → Conversões, a coluna **"Otimização de lances"** deve ficar assim:

| Ação | Esperado |
|---|---|
| `Nota Fácil Downloader (web) generate_lead` | Principal ✅ |
| `Nota Fácil Downloader (web) software_activation` | Principal ✅ |
| `Download MSXI` | Secundária |
| `Download EXE` | Secundária |
| `Nota Fácil Downloader (web) purchase` | *(indiferente — PURCHASE segue desligada na campanha)* |

---

## Verificação

Aguarde **48 h** e rode a comparação:

> Google Ads → Campanhas → colunas **Conversões** e **Todas as conversões**, segmentado por **Conversões → Ação de conversão**.

O que deve aparecer:

- `generate_lead` contribuindo para **Conversões** *(já acontece desde 12/08)*
- `software_activation` voltando a contribuir para **Conversões**
- Downloads aparecendo **apenas** em "Todas as conversões"

Se `software_activation` continuar zerado após 48 h, o problema é o import do GA4 e não a meta — confirme em Metas → Conversões que a ação está **Ativa** e recebendo dados, e verifique o vínculo GA4 ↔ Ads em Ferramentas → Contas vinculadas.

---

## Depois deste documento

Vá direto para o teto de CPC ([documento 05, seção 5.6](05-ads-estrutura-campanha.md#56-teto-de-cpc-e-estabilidade)) e as negativas ([documento 04](04-ads-palavras-negativas.md)). Os três formam um bloco único: meta certa, freio no lance, tráfego certo.

Depois deles, **congelamento de 14 dias**. Com apenas 2 conversões acumuladas na configuração nova, qualquer mudança adicional reinicia o aprendizado antes de haver o que aprender.
