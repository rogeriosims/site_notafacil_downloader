# 19. Proxy Same-Origin no Cloudflare Worker (`/api/cadastro`) e Redução do Instalador EXE

**Data:** 22/10/2026  
**Contexto:** Erro de CORS/Firewall no formulário de cadastro do Hero e sobrecarga de suporte causada por versões manuais (.EXE) desatualizadas.

---

## 1. O Problema do CORS e Bloqueio de Rede no Cadastro

### Sintoma
Ao submeter o formulário de ativação na Landing Page (`#hero-form`), clientes em determinados ambientes (especialmente escritórios contábeis) recebiam o seguinte erro no console do navegador:

```text
/#ativar:1 Access to fetch at 'https://n8n.rockethub.com.br/webhook/17e601cd-2655-410f-b8af-4ffffd07bec0' 
from origin 'https://notafacildownloader.contabilcert.com.br' has been blocked by CORS policy: 
Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.
POST https://n8n.rockethub.com.br/webhook/17e601cd-2655-410f-b8af-4ffffd07bec0 net::ERR_FAILED
TypeError: Failed to fetch
```

### Causa Raiz
1. O formulário enviava uma requisição `POST` com cabeçalho `Content-Type: application/json` diretamente para um domínio de terceiro (`n8n.rockethub.com.br`), localizado em servidor externo na Alemanha (`194.163.172.123`).
2. Por não ser um *simple header*, o navegador era obrigado a enviar uma requisição prévia de pré-voo (`OPTIONS`).
3. Em computadores de escritórios contábeis, é padrão a presença de:
   - **Firewalls corporativos e filtros de DNS** (Fortinet, SonicWall, Sophos, Pi-hole);
   - **Antivírus corporativos com inspeção web** (Kaspersky Endpoint, Trend Micro);
   - **Extensões de privacidade e adblockers** (uBlock Origin, Brave Shields).
4. Esses mecanismos bloqueiam ativamente conexões diretas a URLs contendo `/webhook/` ou domínios não corporativos desconhecidos. Quando a conexão é abortada no cliente (`net::ERR_FAILED`), o navegador não recebe resposta HTTP e o Chrome acusa genericamente a falta de headers CORS.

---

## 2. A Solução Implementada: Proxy Same-Origin via Cloudflare Worker

### Arquitetura
Implementamos um worker na borda da Cloudflare (`src/worker.js`) configurado no `wrangler.json`:

```text
Cliente (Navegador)
       │
       ▼ [POST /api/cadastro — Same-Origin, SEM PREFLIGHT CORS]
Cloudflare Worker (notafacildownloader.contabilcert.com.br)
       │
       ▼ [Fetch interno server-to-server]
Webhook n8n (https://n8n.rockethub.com.br/webhook/...)
```

### Benefícios
1. **Zero CORS:** A requisição é disparada para `https://notafacildownloader.contabilcert.com.br/api/cadastro`. Como a origem é rigorosamente idêntica à página onde o usuário está, o navegador não executa pré-voo e não há restrição de CORS.
2. **Imune a Bloqueios de Rede:** O cliente já carregou o site `notafacildownloader.contabilcert.com.br`. Firewalls e adblockers não bloqueiam chamadas internas para a mesma aplicação.
3. **Redundância com Fallback:** Em `src/pages/index.astro`, o envio tenta a rota `/api/cadastro`. Caso ocorra qualquer falha no proxy, é feito fallback automático para o webhook direto do n8n.
4. **Proteção da Infraestrutura:** O webhook interno do n8n não fica mais exposto publicamente no código client-side do formulário.

---

## 3. Decisão de Produto: Redução de Destaque do Instalador .EXE

### Motivo
Clientes que instalam o Nota Fácil via instalador tradicional `.EXE`:
* **Não recebem atualizações automáticas** em segundo plano.
* Quando o governo ou o Portal Nacional alteram regras de CAPTCHA, schemas ou rotas (como ocorrido na v3.5.1 e v3.5.2), o cliente que usa `.EXE` fica preso em versões antigas com falhas, gerando volume excessivo de chamados no suporte.
* A versão da **Microsoft Store (MSIX)** é homologada, auditada pela Microsoft, não exibe alertas do Windows SmartScreen e atualiza sozinha sem intervenção humana.

### Mudanças na Interface
1. **Página de Sucesso/Download (`/obrigado/`):**
   - A versão da **Microsoft Store** passou a ocupar o destaque central principal, enfatizando *"Atualizações Automáticas"* e *"Recomendada"*.
   - O instalador `.EXE` deixou de ser um card concorrente de igual peso e passou a ser apenas um link de rodapé discreto, explicitamente sinalizado como **"Não recomendado: requer reinstalação manual a cada atualização do governo"**.
2. **Página de Atualização (`/atualizacao/`):**
   - O botão da Microsoft Store é o CTA de largura total.
   - O download do `.EXE` fica como opção secundária discreta apenas para máquinas com restrição corporativa de Loja.
3. **Página Inicial (`/`):**
   - Ajustada a cópia para enfatizar a instalação oficial e segura pela Loja com atualizações automáticas.
