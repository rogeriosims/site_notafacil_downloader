# 2. Gatilho de dataLayer para `download_exe`

**Prioridade:** 🟠 Alto · **Tempo:** ~10 min · **Sistema:** Google Tag Manager

## Problema

Os dois botões de download da página `/obrigado/` são tratados de forma assimétrica no GTM:

| Evento | Gatilho linkClick | Gatilho customEvent | Conversões (30 d) |
|---|---|---|---|
| `download_store` | `21` ✅ | `25` ✅ | **14** |
| `download_exe` | `23` ✅ | 🔴 **não existe** | **3** |

O código empurra os dois eventos no dataLayer:

```js
// src/pages/obrigado.astro:59  — Microsoft Store
onclick="openStoreModal(); window.dataLayer.push({'event': 'download_store'});"

// src/pages/obrigado.astro:81  — instalador .exe
onclick="window.dataLayer.push({'event': 'download_exe'});"
```

Mas a tag `24 · Download EXE` só escuta o gatilho `23`, do tipo **clique em link**, filtrado por
`{{Click URL}} contains https://notafacildownloader.contabilcert.com.br/instalar-nota-facil`.

Como esse link **navega para fora da página**, existe uma corrida entre o disparo da tag e a saída do navegador. O gatilho `23` também está com **"Aguardar tags" desativado** (`wait_for_tags: false`), o que remove a única proteção contra essa corrida.

O `download_store` não sofre disso porque o `ms-windows-store://` abre um protocolo externo sem descarregar a página — e ainda tem o gatilho de dataLayer como rede de segurança.

A proporção 14:3 é consistente com perda de disparos, não com preferência real dos usuários.

---

## Passo a passo

### 1. Criar o gatilho

GTM → **Acionadores** → **Novo**

| Campo | Valor |
|---|---|
| Nome | `download_exe` |
| Tipo | **Evento personalizado** |
| Nome do evento | `download_exe` |
| Este acionador é ativado em | **Todos os eventos personalizados** |

Salvar.

> Espelha exatamente o gatilho `25 · download_store` que já existe e funciona.

### 2. Adicionar o gatilho à tag existente

**Tags** → `Download EXE` (ID `24`) → **Acionamento** → **+**

Marque o gatilho `download_exe` recém-criado. A tag deve ficar com **dois** acionadores:

- `Download EXE` (clique em link, ID `23`) — mantenha
- `download_exe` (evento personalizado) — novo

Salvar.

> **Por que manter os dois:** o gatilho de clique cobre cliques que não passam pelo `onclick` (abrir em nova aba, clique com botão do meio, atalhos de teclado). A ação de conversão `Download EXE` (`7669178869`) está com contagem **Uma**, então não há risco de contagem dupla — o Ads deduplica dentro da mesma sessão.

### 3. Reforçar o gatilho de clique

**Acionadores** → `Download EXE` (ID `23`) → ative **Aguardar tags** com tempo limite de `2000` ms e **Verificar validação**.

Isso segura a navegação por até 2 segundos enquanto a tag dispara. Faça o mesmo em `21 · Download MSXI` por consistência.

### 4. Validar no Preview

**Visualizar** → `https://notafacildownloader.contabilcert.com.br/obrigado/`

⚠️ Aceite os cookies primeiro — sem consentimento o container não carrega.

> A página `/obrigado/` lê `sessionStorage.notafacil_user_data`. Acessando direto, ela funciona mas mostra a saudação genérica. Para um teste fiel, passe pelo formulário da home.

Clique em **BAIXAR ARQUIVO .EXE** e confirme:

- [ ] Evento `download_exe` na linha do tempo
- [ ] Tag `Download EXE` em **Tags Fired**
- [ ] A tag dispara **uma única vez** (não duas)

Repita com **OBTER NA LOJA OFICIAL** e confirme que `Download MSXI` continua disparando normalmente.

### 5. Publicar

**Enviar** → `Adiciona gatilho dataLayer download_exe e aguardar-tags nos cliques` → **Publicar**.

---

## Verificação

Após ~7 dias, compare a proporção MSXI vs EXE em Google Ads → Metas → Conversões. A distância deve encolher de forma perceptível. Se `Download EXE` continuar próximo de zero, o problema não era a corrida de navegação — investigue se o botão está visível para o tráfego pago (teste em mobile, que é onde a maioria dos cliques cai).
