# 11. Reunião com o especialista do Google — 14/08/2026

## Antes de tudo: entenda o incentivo

O especialista do Google é um consultor real, com acesso a dados e recursos que você não tem. Ele também é **remunerado pelo crescimento do gasto da conta**. As duas coisas são verdade ao mesmo tempo.

Na prática, ele vai sugerir com alta probabilidade:

- aumentar o orçamento
- ativar correspondência ampla
- migrar ou expandir para Performance Max
- ligar "aplicação automática de recomendações"
- remover o teto de CPC *("está limitando sua entrega")*

**A última é literalmente o que quebrou a conta em 08/08.** Nenhuma dessas deve ser aceita durante o congelamento.

O objetivo da reunião: extrair suporte técnico e os termos do crédito. Não sair com mudanças aplicadas.

---

## Números para levar

Tenha isto à mão. Chegar com dados muda completamente o tom da conversa.

| Período | Cliques | Investimento | Conversões | CPA | CPC |
|---|---|---|---|---|---|
| 09/03 – 30/06 | 534 | R$ 799,63 | **53** | **R$ 15,09** | R$ 1,50 |
| 10–11/08 | 53 | R$ 319,45 | 0 | — | **R$ 6,03** |
| 12/08 em diante | — | — | 2 | — | R$ 3,93 |

**A narrativa em três frases:**

> A campanha entregava CPA de R$ 15. A ação de conversão `Lead_NotaFacil_GTM`, responsável por 42 das 53 conversões, foi removida quando trocamos o formulário do site — e a campanha ficou sem sinal. Em 08/08 o teto de CPC foi removido, e o CPC saltou de R$ 1,86 para R$ 6,03 em dois dias.

Estado atual, já corrigido por você em 13/08: Maximizar cliques, teto R$ 2,00, R$ 30/dia, metas `SUBMIT_LEAD_FORM` + `SIGNUP` biddable, downloads como secundária.

---

## Bloco 1 — Crédito de R$ 600 *(prioridade máxima)*

Sem essas respostas a decisão de PMax fica travada.

- [ ] Qual a **data exata de expiração**?
- [ ] Há **exigência de gasto prévio**? Qual valor e em que prazo?
- [ ] O prazo conta da **concessão** ou da **ativação**?
- [ ] O crédito vale **apenas para PMax** ou pode ser usado em Pesquisa?
- [ ] É possível **prorrogar** se precisarmos de mais 2 semanas?

> Peça por e-mail depois da reunião. Termos de crédito ditos em call se perdem.

**Se o crédito puder ir para Pesquisa, pare por aqui e leve-o para lá.** É o canal com CPA comprovado de R$ 15,09.

---

## Bloco 2 — Perguntas que só eles respondem

### 2.1 O import do GA4

> "A ação `Nota Fácil Downloader (web) generate_lead` registrou **zero** conversões de março a junho, e voltou a atribuir em 12/08. O evento sempre disparou no GA4. O vínculo GA4 ↔ Ads está saudável? Houve algum problema de importação nesse período?"

Isso importa porque decide se vale migrar para uma tag nativa do Ads ([documento 01, Parte B](01-gtm-conversao-lead.md)) ou se o import é confiável.

### 2.2 A estrutura de metas de conversão

> "Nosso funil é: formulário enviado → página de obrigado → clique no download. Configuramos `SUBMIT_LEAD_FORM` e `SIGNUP` como biddable, com `software_activation` principal e os dois downloads como secundária, porque o download é downstream do formulário e contá-lo duplicaria o mesmo usuário. Essa leitura está correta?"

Pergunta técnica legítima, e a resposta revela o nível do especialista.

### 2.3 Conversões otimizadas para leads

> "Queremos ativar Enhanced Conversions for Leads. Coletamos e-mail, nome e telefone no formulário. Podem ajudar na configuração e confirmar o que precisa constar na nossa política de privacidade sob a LGPD?"

### 2.4 Importação de conversões offline

> "Já capturamos o `gclid` no backend a cada lead enviado. Queremos usar Importação de Conversões Offline para contornar a perda por consentimento e enviar só os leads qualificados. Podem revisar nosso plano de implementação e confirmar o formato esperado?"

Aproveite para perguntar:

- [ ] Vale mais a pena o upload via **API** (`ConversionUploadService`) ou via CSV agendado?
- [ ] Offline Conversion Import e Enhanced Conversions podem coexistir na mesma ação, ou geram contagem dupla?
- [ ] Há como estender a janela de 90 dias do `gclid`?
- [ ] **Nosso caso concreto:** o cadastro acontece no site, mas a compra pode ocorrer meses depois, dentro do software. Tivemos **30 compras em 45 dias e nenhuma atribuída**. Qual o caminho recomendado para atribuir receita que ocorre fora da janela de 90 dias?
- [ ] Se enviarmos `Conversion Value` nas compras, quando faz sentido migrar de CPA desejado para **ROAS desejado**?
- [ ] Sob a LGPD, o que precisa constar na política de privacidade para usar o `gclid` dessa forma?

> Esta é a pergunta de maior valor da reunião. É o caminho de medição que não depende de cookie, de consentimento nem do container carregar — e teria evitado boa parte do problema que estamos consertando. Detalhes em [documento 13](13-conversoes-offline-gclid.md).

### 2.5 Measurement Protocol com `sessions: 0`

Leve este dado — é concreto e eles conseguem investigar do lado deles:

> "Enviamos eventos do nosso app desktop por Measurement Protocol para o fluxo `G-40J8HYRSRM`. Eles chegam ao GA4, mas com **`sessions = 0`** e origem `(not set)`. Resultado: `software_activation` teve **24 eventos no GA4 e 0 conversões no Ads** entre 01/07 e 14/08, embora a ação esteja ativa e a meta SIGNUP esteja biddable."

- [ ] Confirmam que a causa é ausência de `session_id` e `client_id` no payload?
- [ ] Há alguma forma de atribuir eventos de Measurement Protocol **sem** o `client_id` da sessão web?
- [ ] O limite de 72 h do `timestamp_micros` tem exceção para importação de eventos de servidor?

> Entre março e junho essa mesma ação rendeu 11 conversões. Pergunte se houve alguma mudança no comportamento do Measurement Protocol ou no vínculo GA4 ↔ Ads nesse período.

### 2.6 Resíduo das ações removidas

> "Temos 6 ações de conversão de lead removidas acumuladas na conta. Alguma delas ainda interfere no aprendizado ou nos relatórios?"

### 2.5 Potencial real do nicho

> "Qual a parcela de impressões disponível para termos como `download nfse` e `nfse downloader` no Brasil? Estamos em 24,7% — quanto disso é realisticamente alcançável e a que custo?"

---

## Bloco 3 — Se eles propuserem PMax

Não recuse de saída. Peça que justifiquem:

- [ ] "Qual o CPA de referência para **geração de leads B2B nichado** no Brasil, sem feed de produto?"
- [ ] "Que percentual do tráfego de uma PMax lead gen vem de Pesquisa versus Display e YouTube?"
- [ ] "Os cases que vocês têm são de e-commerce com Merchant Center? Como se aplicam a um software B2B?"
- [ ] "Como evitamos que a PMax canibalize a campanha de Pesquisa nos mesmos termos?"

E declare a posição:

> "Vamos testar com o crédito, mas só depois de 27/08. A Pesquisa tem 2 conversões de histórico e precisa acumular sinal antes de colocarmos uma segunda campanha no mesmo leilão."

As travas de lançamento estão no [documento 10](10-pmax-credito-google.md) — leve a lista e confirme cada uma com eles.

---

## Bloco 4 — O que recusar

Educadamente, mas sem abrir.

| Se propuserem | Resposta |
|---|---|
| Aumentar o orçamento | "Não antes de 27/08. Com 2 conversões, mais verba só amplifica um lance sem referência." |
| Correspondência ampla | "Ampla precisa de Smart Bidding com histórico. Temos 2 conversões. Reavaliamos depois." |
| **Remover o teto de CPC** | "Foi exatamente isso em 08/08 que levou o CPC de R$ 1,86 para R$ 6,03. O teto fica." |
| Aplicação automática de recomendações | "Queremos desligada. Podem confirmar que está?" |
| Migrar a Pesquisa para PMax | "A Pesquisa entrega CPA R$ 15,09. Não migramos o que funciona." |
| Segmentação otimizada / expansão de público | "Não durante o congelamento." |

### Duas verificações para fazer com eles na tela

- [ ] **Ferramentas → Recomendações → Aplicação automática:** confirmar que está **desligada**. Se estiver ligada, o Google aplica mudanças sozinho e o congelamento não existe.
- [ ] Pedir que registrem em nota na conta: **congelamento até 27/08, equipe de otimização não deve intervir.**

---

## Bloco 5 — O que pedir

Coisas que eles conseguem e você não:

- [ ] Prorrogação ou flexibilização do crédito
- [ ] Auditoria da estrutura de conversão *(a pergunta 2.2)*
- [ ] Suporte técnico para Enhanced Conversions
- [ ] Dados de referência do setor: CPC médio e taxa de conversão para software contábil no Brasil
- [ ] Revisão do índice de qualidade — o painel deles mostra os componentes que a API não expõe

---

## Depois da reunião

1. **Não aplique nada no mesmo dia.** Se algo fizer sentido, anote e execute depois de 27/08.
2. Peça o resumo por e-mail, principalmente os termos do crédito.
3. Confira o [histórico de alterações](https://ads.google.com) da conta em 15/08 — se aparecer alguma mudança que você não fez, foi o Google. Reverta e reclame.

> **A checagem do item 3 não é paranoia.** Esta conta já sofreu 6 mudanças de orçamento e 3 ciclos de pausa em 8 dias. Saber exatamente quem mexeu em quê é o que vai permitir, em 27/08, dizer com segurança o que funcionou.
