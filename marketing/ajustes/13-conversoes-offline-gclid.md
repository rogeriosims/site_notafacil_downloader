# 13. Importação de Conversões Offline via gclid

**Prioridade:** 🟠 Alto · **Montagem:** durante o congelamento · **Ativação plena:** após 27/08

## Por que isto existe

Surgiu da pergunta "dá para reaproveitar a inteligência anterior às alterações?". A resposta sobre o aprendizado do lance é não — mas a investigação revelou que **a infraestrutura para o melhor caminho de medição já está no ar**, só não está sendo usada.

## O que já existe hoje

| Onde | O quê |
|---|---|
| `src/layouts/BaseLayout.astro:175-177` | grava o `gclid` da URL no `sessionStorage` |
| `src/pages/index.astro:908` | recupera o `gclid` do `sessionStorage` ou da URL |
| `src/pages/index.astro:916` | envia o `gclid` no payload do lead para o n8n |
| Google Ads | 3 ações de upload offline **removidas**, todas com janela de 90 dias |

```js
// BaseLayout.astro:175
const gclid = urlParams.get('gclid');
if (gclid) {
  sessionStorage.setItem('gclid', gclid);
}
```

```js
// index.astro:910
const payload = {
  action: 'register',
  nome, email, whatsapp, cnpj,
  gclid: gclid        // ← vai para o n8n a cada lead
};
```

**O dado está sendo coletado e enviado. Só não está voltando para o Google Ads.**

---

## Por que este caminho é superior aos outros dois

| | Tag GTM | Import GA4 | **Offline via gclid** |
|---|---|---|---|
| Depende de cookie | sim | sim | **não** |
| Depende de consentimento | sim | duplo filtro | **não** *(veja ressalva)* |
| Depende do container carregar | sim | sim | **não** |
| Latência | minutos | 24–72 h | do lote |
| Permite qualificar o lead | não | não | **sim** |

O `gclid` chega na **URL** de todo clique pago. Lê-lo e enviá-lo ao seu próprio backend junto com um formulário que a pessoa preencheu deliberadamente é tratamento de dado em primeira parte — não depende da infraestrutura de cookies que o consentimento bloqueia.

> ⚠️ **Ressalva de LGPD.** Não depender tecnicamente de consentimento não dispensa transparência. O uso do `gclid` para medição de conversão **precisa constar na política de privacidade**. Confirme com o especialista do Google e, se possível, com quem cuida do jurídico. Isso não é opinião jurídica.

### O ganho que ninguém mais dá: qualificação

Como o upload parte do **seu** banco, você pode enviar só os leads que valem:

- lead que virou ativação do software → envia
- lead com e-mail descartável ou CNPJ inválido → **não envia**
- lead que virou cliente pagante → envia com valor

O algoritmo passa a otimizar para o lead que vira cliente, não para quem preenche formulário. É o pulo de qualidade mais relevante disponível nesta conta — e o único que resolve o risco de lead ruim da PMax descrito no [documento 10](10-pmax-credito-google.md).

---

## A página do n8n dentro do software muda a escala disto

O robô carrega uma página servida pelo n8n. Isso não serve para *capturar* o gclid — aquela webview nunca viu um anúncio — mas serve para algo melhor: **cruzar**.

```
1. clique no anúncio    →  gclid na URL         →  sessionStorage
2. formulário enviado   →  n8n grava { nome, email, whatsapp, cnpj, gclid }
3. usuário instala o robô
4. página do n8n carrega dentro do app, identificando o usuário
5. n8n busca o gclid pelo e-mail              ← o elo que falta
6. evento do produto vira conversão offline no Ads
```

O passo 5 é uma consulta ao seu próprio banco. O e-mail é a chave certa: por decisão de produto o cadastro nunca é editado, então não muda depois de gravado.

> **Verificar antes de implementar:** o que a página do n8n dentro do app recebe como identificador. Se já recebe e-mail, CNPJ ou chave de licença, o resto é um `lookup`.

### 🔴 O que isso NÃO destrava — corrigido em 13/08

Uma versão anterior deste documento afirmava que as **30 compras** de 01/07 a 14/08 poderiam ser atribuídas pelo cruzamento. **Está errado.** O site passou um período sem formulário.

Histórico verificado no git:

| Período | Formulário | gclid | Commit |
|---|---|---|---|
| até 17/04 | ✅ | ❌ | captura de gclid só entrou em `fe63d98` |
| **17/04 → 25/06** | ✅ | ✅ | **única janela com os dois** |
| **25/06 → ~11/08** | ❌ **removido** | ❌ | `0ccf2ab` — "reorganiza componentes da landing page" |
| ~11/08 → hoje | ✅ | ✅ | build local de 11/08, **não commitado** |

No último commit (`691600a`, 26/06) não existe **um único `<form>`** em todo o site, e `gclid` aparece zero vezes em `index.astro`. O usuário ia direto ao download.

**Quem instalou entre 25/06 e 11/08 nunca se cadastrou.** Sem registro não há gclid, e sem gclid não há chave de cruzamento. Essas conversões são irrecuperáveis — não é questão de janela de 90 dias, é ausência de dado na origem.

### O que isso destrava — daqui para frente

| Evento do app | 01/07 – 14/08 | Conversões no Ads |
|---|---|---|
| `paywall_view` | 132 | — |
| `purchase` | 30 | **0** |
| `software_activation` | 24 | **0** |
| `begin_checkout` | 18 | — |

Esses números medem o **tamanho do funil**, não o que dá para recuperar. Servem como estimativa do que passa a ser mensurável quando o cadastro estiver estável e o cruzamento montado.

As três travas, em ordem de resolução:

1. **Formulário precisa estar no ar e versionado** — ver alerta abaixo
2. Os eventos chegam ao GA4 sem sessão — [documento 14](14-n8n-measurement-protocol.md)
3. A meta `PURCHASE` está com `biddable = false` na campanha — [documento 08](08-ads-metas-de-conversao.md)

Com as três resolvidas, cada compra vira conversão **com `gclid` e com valor**, permitindo migrar de "otimizar por lead" para **otimizar por receita**.

---

## 🔴 Risco estrutural: o formulário não está versionado

O formulário atual existe **apenas no working tree e no build local**. Não está commitado.

E o `wrangler.json` publica a pasta `dist/` — ou seja, **a produção reflete o build da máquina de quem faz o deploy, não o conteúdo do repositório.**

| Cenário | Resultado |
|---|---|
| `git checkout` limpo em outra máquina | formulário some |
| CI/CD que builda a partir do git | formulário some |
| Alguém commita por cima da branch | formulário some |

**Foi exatamente assim que ele desapareceu:** um commit de reorganização da landing page o removeu em 25/06, e ninguém percebeu por seis semanas. O ativo mais crítico do funil ficou fora do ar mais de um mês.

### Ação — antes de qualquer outra coisa deste documento

1. Commitar as alterações de `src/pages/index.astro` na branch `redesign-landing-page`
2. Fazer `npm run build` e conferir que `dist/index.html` contém `hero-form` e `gclid`
3. Deploy
4. Confirmar em produção: abrir o site, enviar um cadastro de teste, verificar que o payload com `gclid` chega ao n8n

> **Sugestão de proteção:** um teste simples no build que falhe se `hero-form` ou `gclid` sumirem de `dist/index.html`. Três linhas de script evitam a repetição de uma falha que custou seis semanas de aquisição.

### O limite real — é de plataforma

A janela do gclid é de **90 dias a partir do clique**:

| Evento | Distância típica do clique | Cabe na janela? |
|---|---|---|
| `software_activation` | horas ou dias | ✅ sim |
| `limit_reached` | semanas | ✅ geralmente |
| `purchase` | pode levar meses | ⚠️ só se dentro de 90 dias |

Compra que acontece 4 meses depois do clique **não tem como** ser atribuída ao anúncio no Google Ads. Não é falha de implementação — é como a plataforma funciona.

**Mesmo assim, grave o gclid junto de toda compra.** As que couberem na janela viram conversão; as que não couberem viram análise de LTV por canal de origem, que responde a pergunta diferente e igualmente valiosa: *quanto vale, no fim, um cliente que veio de anúncio?*

### Enviando valor junto

Quando `purchase` entrar no upload, mande o valor:

```csv
Google Click ID,Conversion Name,Conversion Time,Conversion Value,Conversion Currency
Cj0KCQjw...,Compra (offline),2026-08-14 10:32:00,89.90,BRL
```

Com valor preenchido, a estratégia de lance pode um dia migrar para **ROAS desejado** em vez de CPA. Isso é assunto para depois de 30+ conversões de compra acumuladas — mas só é possível se o valor começar a ser enviado desde já.

> Consulte `.agent/PRECOS-SSOT.md` para o valor correto de cada plano. Não estime nem arredonde.

---

## Parte A — Recuperação retroativa *(provavelmente não compensa)*

A janela de importação é de **90 dias a partir do clique**. Em 13/08/2026, isso cobre cliques desde **15/05/2026**.

A campanha praticamente parou em 25/05 — sobra uma faixa de ~10 dias.

**Faça só esta verificação:**

> No n8n, consulte quantos registros de lead têm `gclid` preenchido entre **15/05 e 25/05/2026**.

| Resultado | Decisão |
|---|---|
| Menos de 5 leads | Não compensa. Siga para a Parte B. |
| 5 ou mais | Vale o upload — são conversões reais que nunca foram contadas. Use a Parte B e faça um lote retroativo antes de 15/08, quando os mais antigos saem da janela. |

> ⏳ **A janela fecha sozinha.** Cada dia que passa, um dia a mais sai dos 90. Se for fazer, faça esta semana.

---

## Parte B — O fluxo permanente

### 1. Criar a ação de conversão

Google Ads → **Metas** → **Conversões** → **+ Nova ação** → **Importar** → **Outras fontes de dados ou CRM** → **Monitorar conversões de cliques**

| Campo | Valor |
|---|---|
| Nome | `Lead Qualificado (offline)` |
| Categoria | **Envio de formulário de lead** |
| Valor | sem valor, por enquanto |
| Contagem | **Uma** |
| Janela de clique | 90 dias |
| Ação principal | 🔴 **Secundária** — por enquanto |

> **Secundária no início** pelo mesmo motivo do [documento 01](01-gtm-conversao-lead.md): ela precisa provar que registra antes de assumir o leilão. E promovê-la durante o congelamento quebraria o congelamento.

### 2. Montar o upload no n8n

Fluxo mínimo, agendado diariamente:

```
Gatilho diário
  └─ consulta leads criados nas últimas 24 h com gclid preenchido
      └─ filtra os qualificados (regra sua — ver abaixo)
          └─ monta o CSV / chamada de API
              └─ envia ao Google Ads
```

Formato do arquivo, se optar por upload manual via CSV:

```csv
Parameters:TimeZone=America/Sao_Paulo
Google Click ID,Conversion Name,Conversion Time,Conversion Value,Conversion Currency
Cj0KCQjw...,Lead Qualificado (offline),2026-08-14 10:32:00,0,BRL
```

Regras que quebram o upload em silêncio:

- `Conversion Time` **posterior** ao clique e dentro dos 90 dias
- Nome da conversão **idêntico** ao criado no passo 1, incluindo acentos
- Fuso horário declarado na primeira linha
- `gclid` inteiro, sem truncar — eles são longos

> Via API (`ConversionUploadService.UploadClickConversions`) é mais robusto que CSV e evita erro de digitação no nome. Se o n8n já fala com a API do Google Ads para outra coisa, prefira esse caminho.

### 3. Definir o critério de qualificação

Comece simples e aperte depois:

| Fase | Enviar quando |
|---|---|
| **Início** *(até 27/08)* | todo lead com `gclid` — só para validar o fluxo |
| Depois | lead cujo CNPJ é válido e o e-mail não é descartável |
| Maduro | lead que gerou `software_activation` |

> Não comece pelo critério mais apertado. Se quase nada for enviado, você não consegue distinguir "critério rigoroso" de "fluxo quebrado".

### 4. Validar

Google Ads → Metas → Conversões → `Lead Qualificado (offline)`. Após o primeiro lote, o status sai de "Nenhuma conversão recente".

Diagnóstico dos erros mais comuns:

| Sintoma | Causa provável |
|---|---|
| "gclid não encontrado" | clique fora dos 90 dias, ou gclid truncado |
| Upload aceito, zero conversões | nome da conversão diferente do cadastrado |
| Tudo rejeitado | fuso horário ausente ou formato de data errado |

### 5. Promover a Principal — **só depois de 27/08**

Quando o fluxo estiver rodando e o volume for comparável ao de `generate_lead`, decida a arquitetura final. As duas medem o mesmo lead — mantê-las ambas como Principal duplicaria a contagem.

| Cenário | Configuração |
|---|---|
| Offline com volume ≥ `generate_lead` | offline **Principal**, `generate_lead` **Secundária** |
| Offline com volume menor | investigar antes de trocar — provavelmente o filtro está apertado demais ou faltam gclids |

> As duas mudanças na **mesma sessão**, como em todo o resto deste plano.

---

## Onde isto entra no cronograma

| Quando | O quê |
|---|---|
| **Esta semana** | verificar no n8n quantos leads com gclid existem entre 15 e 25/05 *(a janela está fechando)* |
| 18/08 | criar a ação de conversão como Secundária |
| 20–25/08 | montar o fluxo no n8n e rodar o primeiro lote |
| Após 27/08 | avaliar volume e decidir a promoção a Principal |

Montar não afeta o leilão — por isso cabe dentro do congelamento. Só a **promoção a Principal** precisa esperar.
