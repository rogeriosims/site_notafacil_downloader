# 17. Roteiro de teste — Consent Mode avançado e conversão de lead

**Alterações a validar** *(commit pendente, ainda não publicado)*:

| Arquivo | Mudança |
|---|---|
| `src/layouts/BaseLayout.astro` | `ads_data_redaction` e `url_passthrough` ativados |
| `src/components/CookieConsent.astro` | GTM passa a carregar **sempre**, em estado negado |
| `src/pages/index.astro` | `eventCallback` antes de navegar para `/obrigado/` |

> ⚠️ **Teste tudo em `npm run preview` antes de publicar.** O deploy leva a produção junto — não há ambiente de staging separado.

---

## Preparação

```bash
npm run build && npm run preview
```

Abra `http://localhost:4321/` em **janela anônima** e o DevTools (`F12`) já na aba **Network**, com o filtro de texto vazio.

> Janela anônima é essencial: `localStorage` guarda a resposta anterior ao banner. Sem ela, o banner não reaparece e você testa o caminho errado. Use uma janela anônima nova a cada teste.

---

## Teste 1 — Container sobe sem consentimento *(a mudança principal)*

**Objetivo:** provar que o GTM carrega mesmo sem aceite, mas sem gravar cookie.

1. Abra a home em janela anônima
2. **NÃO clique em nada no banner**
3. Na aba **Network**, filtre por `gtm.js`

**Esperado:**

| Verificação | Resultado |
|---|---|
| `gtm.js?id=GTM-KHF7CGHF` aparece com status **200** | ✅ o container subiu |
| Aba **Application → Cookies → localhost** | **nenhum** cookie `_ga` ou `_gcl_*` |

> 🔴 **Se aparecer cookie `_ga` antes do aceite, pare e me avise.** Esse é o único cenário que traria risco de LGPD. Todo o resto é ajustável depois.

4. Ainda sem aceitar, filtre a Network por `collect`
5. Abra uma requisição para `google-analytics.com/g/collect` e veja a query string

**Esperado:** o parâmetro **`gcs=G100`**.

```
gcs=G100   → consentimento negado    (é o esperado aqui)
gcs=G111   → consentimento concedido
```

`G100` é a prova de que o ping sem cookie está saindo — exatamente o sinal que antes era descartado e que alimenta a modelagem de conversões.

---

## Teste 2 — Aceite muda o estado

1. Na mesma janela, clique em **Aceitar Todos**
2. Volte para **Application → Cookies**

**Esperado:** agora **aparecem** os cookies `_ga` e `_ga_40J8HYRSRM`.

3. Na Network, procure uma requisição `collect` **posterior** ao clique

**Esperado:** `gcs=G111`.

Se G100 antes e G111 depois, o Consent Mode está funcionando nos dois estados.

---

## Teste 3 — "Só Essenciais" continua negando

1. **Janela anônima nova**
2. Clique em **Só Essenciais**
3. **Application → Cookies**

**Esperado:** **nenhum** cookie `_ga`. O container está carregado, mas o armazenamento segue negado. Requisições continuam com `gcs=G100`.

---

## Teste 4 — A conversão de lead espera as tags *(a correção do F1)*

Este é o teste mais importante. Ele valida que a navegação para `/obrigado/` não cancela mais a conversão.

1. **Janela anônima nova**, DevTools aberto na aba **Network**
2. Marque **Preserve log** ⚠️ — sem isso o log é apagado na navegação e você não vê nada
3. **Aceite os cookies**
4. Preencha o formulário com dados de teste e envie

**Observe a sequência na Network:**

| Ordem | Requisição | O que é |
|---|---|---|
| 1 | `n8n.rockethub.com.br/webhook/...` | o cadastro em si |
| 2 | `google-analytics.com/g/collect` com `en=generate_lead` | evento GA4 |
| 3 | `googleads.g.doubleclick.net/pagead/viewthroughconversion/18004623240` | **conversão do Ads** |
| 4 | `/obrigado/` | a navegação |

🔴 **O item 3 tem que aparecer ANTES do item 4.** É exatamente isso que a correção garante. Antes dela, a navegação acontecia junto com o push e cancelava a requisição.

**Também observe:** deve haver um atraso perceptível de **até 2 segundos** entre clicar em enviar e a página trocar. Esse atraso é o `eventCallback` esperando as tags. É o comportamento correto, não lentidão.

---

## Teste 5 — O formulário não trava sem GTM

Valida a rede de segurança. Se o GTM não carregar, o `eventCallback` nunca dispara — o `setTimeout` precisa navegar mesmo assim.

1. **Janela anônima nova**
2. DevTools → aba **Network** → **Add blocking pattern** *(ou use um bloqueador de anúncios)*
3. Bloqueie `*googletagmanager.com*`
4. Recarregue, aceite os cookies, preencha e envie o formulário

**Esperado:** a página vai para `/obrigado/` em **cerca de 2 segundos**.

🔴 **Se travar na home, a rede de segurança falhou.** Seria uma regressão grave — usuário com bloqueador de anúncios não conseguiria completar o cadastro.

---

## Teste 6 — Preview do GTM *(opcional, mais completo)*

1. GTM → **Visualizar** → informe `http://localhost:4321/`
2. Aceite os cookies no site
3. Preencha e envie o formulário

**Esperado no Tag Assistant:**

- Evento `lead_cadastro` na linha do tempo
- `GA4 - Evento - Lead Cadastro` em **Tags Fired**
- `Google Ads - Lead Formulário` em **Tags Fired**
- Nenhuma tag disparando duas vezes

> ⚠️ Cada envio de formulário neste teste **conta como lead real** no GA4 e no Google Ads. Já temos 10 conversões contaminadas por testes de Preview. Enquanto o bloqueio de `tagassistant.google.com` do [documento 16, F5](16-auditoria-tags-e-funil.md) não existir, faça no máximo um envio.

---

## Checklist final antes de publicar

- [ ] T1 — `gtm.js` carrega sem aceite, **sem** cookie `_ga`
- [ ] T1 — requisições com `gcs=G100` antes do aceite
- [ ] T2 — cookie `_ga` aparece após aceitar, `gcs=G111`
- [ ] T3 — "Só Essenciais" não grava cookie
- [ ] T4 — conversão do Ads dispara **antes** da navegação
- [ ] T5 — formulário navega mesmo com `googletagmanager.com` bloqueado

Com os seis itens marcados:

```bash
npm run deploy
```

---

## Depois de publicar

**Nas primeiras 24 h:**

1. Repita os testes 1 e 4 **em produção**, na URL real
2. GA4 → **Relatórios → Tempo real**: confirme que `generate_lead` aparece
3. Google Ads → Metas → Conversões: `Site - Formulário de Lead` deve sair de zero

**Em 3 a 5 dias:**

Compare o volume de `Site - Formulário de Lead` com o de `generate_lead`. Se a nativa alcançar a importada, ela está pronta para virar Principal — a troca descrita no [documento 01](01-gtm-conversao-lead.md), sempre com as duas mudanças na mesma sessão.

**Em 14 dias:**

A proporção cliques/sessões deve cair de 3,3:1. É o indicador de que a modelagem do Consent Mode avançado começou a preencher a lacuna. Não espere que chegue a 1:1 — parte da perda é estrutural.
