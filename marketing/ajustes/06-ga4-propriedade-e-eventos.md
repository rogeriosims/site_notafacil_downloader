# 6. Separar dados de site e aplicativo no GA4

**Prioridade:** 🟡 Médio · **Tempo:** ~30 min · **Sistema:** Google Analytics 4
**Propriedade:** `527459850` — "Nota Fácil Downloader"

## Problema

A propriedade recebe dados de **duas origens distintas** sem separação: o site de marketing e o robô desktop. O relatório de aquisição mostra o sintoma:

| Origem / Mídia | Sessões | Conversões |
|---|---|---|
| (direct) / (none) | 80 | 0 |
| contabeis.com.br / referral | 51 | 0 |
| google / organic | 38 | 0 |
| google / cpc | 34 | 0 |
| **(not set) / (not set)** | **14** | **17** |
| **(data not available)** | **6** | **8** |

**25 das 25 conversões vêm das duas linhas sem origem identificável** — são do aplicativo desktop, que envia eventos sem contexto de campanha.

Eventos que pertencem ao aplicativo, não ao site:

| Evento | Ocorrências (30 d) |
|---|---|
| `paywall_view` | 26 |
| `software_activation` | 9 |
| `purchase` | 8 |
| `lead_download` | 6 |
| `limit_reached` | 1 |

Enquanto isso, os eventos reais do site (`download_store`, `download_exe`, `lead_cadastro`) registram **zero** — tratado no [documento 03](03-gtm-eventos-ga4.md).

### Por que isso importa

Qualquer relatório de "conversão por canal" nessa propriedade é falso. O site aparece com 0 conversões e o app com 25 sem origem. Não dá para responder "o tráfego pago gera ativação?" — que é justamente a pergunta que decide a verba.

---

## Opção A — Fluxos de dados separados *(recomendada)*

Mantém uma propriedade só, mas torna a origem explícita e filtrável.

### 1. Verificar os fluxos existentes

GA4 → **Administrador** → **Fluxos de dados**. Provavelmente há um só, de web, com o measurement ID `G-40J8HYRSRM`.

### 2. Criar um fluxo dedicado ao aplicativo

**Fluxos de dados** → **Adicionar fluxo** → **Web** → nomeie `Nota Fácil Downloader - App Desktop`.

> Use um fluxo *Web* mesmo sendo desktop: o robô envia via Measurement Protocol, não via SDK de app nativo. Anote o novo measurement ID e o **API secret** (Administrador → Fluxo → Protocolo de medição → Criar).

### 3. Repontar o robô para o novo fluxo

No código do aplicativo desktop, troque o measurement ID e o API secret usados nas chamadas ao Measurement Protocol pelos do fluxo novo.

> Esse ajuste é no repositório do robô, não neste. Registre a tarefa lá.

### 4. Marcar a origem em todo evento do app

Enquanto o robô não for repontado, adicione um parâmetro em cada evento enviado por ele:

```json
{ "origem_dados": "app_desktop" }
```

Registre como dimensão personalizada (Administrador → Definições personalizadas), escopo **Evento**, parâmetro `origem_dados`. Isso permite segmentar os relatórios imediatamente, sem esperar a mudança no robô.

---

## Opção B — Propriedade separada

Mais limpa conceitualmente, mais trabalhosa: crie uma propriedade GA4 nova só para o app.

**Vantagem:** isolamento total, relatórios do site 100% confiáveis.
**Custo:** perde a visão unificada da jornada (anúncio → download → ativação → compra), que é justamente o que dá valor ao `software_activation` importado no Ads.

> **Recomendo a Opção A.** A ligação entre clique pago e ativação do software é o ativo mais valioso dessa conta — `software_activation` já entregou **11 conversões atribuídas ao tráfego pago** entre março e junho. Separar em duas propriedades quebra esse elo.

---

## Higiene de eventos-chave

GA4 → **Administrador** → **Eventos principais**. Confira o alinhamento com o Google Ads:

| Evento | Principal no GA4? | Importado no Ads? | Correto? |
|---|---|---|---|
| `generate_lead` | ✅ | ✅ `7576800610` (principal) | ⚠️ ver abaixo |
| `purchase` | ✅ | ✅ `7549045812` (principal) | ✅ |
| `software_activation` | ✅ | ✅ `7585906769` (principal) | ✅ |
| `paywall_view` | — | `7585906787` (oculta) | ✅ deixe oculta |
| `begin_checkout` | — | `7586270394` (oculta) | ✅ deixe oculta |

### ⚠️ `generate_lead` deve permanecer Principal — por enquanto

> **Revisado em 13/08.** A revisão 1 mandava rebaixar esta ação para Secundária. **Não faça isso agora.**

`Nota Fácil Downloader (web) generate_lead` (`7576800610`) é hoje a **única** conversão que alimenta o Smart Bidding — foi ela que registrou as 2 conversões de 12/08, as primeiras desde maio. Rebaixá-la deixaria a campanha sem sinal de lead.

O rebaixamento só faz sentido **se e quando** a Parte B do [documento 01](01-gtm-conversao-lead.md) for executada, criando uma conversão nativa do Ads para o mesmo evento. Nesse caso as duas mudanças vão juntas, na mesma sessão:

1. `Lead - Cadastro Formulario` (nativa) → **Principal**
2. `Nota Fácil Downloader (web) generate_lead` → **Secundária**

Enquanto isso não acontecer, não há contagem dupla: as tags `14` e `26` do GTM apontam para ações **removidas** e não registram nada.

### A ação a corrigir é outra

O ajuste urgente do lado do Ads é a categoria **SIGNUP**, desligada na campanha, que zerou `software_activation` — 11 conversões atribuídas ao pago entre março e junho. Ver [documento 08](08-ads-metas-de-conversao.md).

---

## Verificação

1. GA4 → **Explorar** → exploração livre com dimensão `Origem/Mídia` e métrica `Eventos principais`. As linhas `(not set)` devem sumir ou ficar identificáveis por `origem_dados`.
2. Google Ads → Metas → Conversões: confirme que só **uma** ação de lead está como Principal.
