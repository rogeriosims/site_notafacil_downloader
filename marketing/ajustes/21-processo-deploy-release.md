# Documento de Ajuste 21 — Processo de Deploy de Release

**Data:** 1 de Novembro de 2026  
**Status:** proposta. Nenhum fluxo do n8n foi alterado.  
**Contexto:** uma release chega ao cliente por cinco canais, hoje publicados à mão e sem ordem definida.

## 1. Os canais e onde cada um é publicado

| Canal | Onde | O que muda a cada release |
|---|---|---|
| Instalador `.exe` | `downloads.contabilcert.com.br` | O arquivo. Já entra no ar assim que é enviado. |
| Microsoft Store | Partner Center | Pacote, com certificação de duração variável. |
| Site | `src/pages/atualizacao.astro`, `npm run deploy` | Página de atualização. |
| Aviso e atualização no app | Fluxo `Nota Facil Licenciamento` (`SVWDjcZJzAMpck5w`), nó `configuracoes` | `current_version`, `message`, `html_banners`. |
| E-mail | Fluxo `FolowUp e Comunicação` (`8iNFZ03A0rtX9Y1q`), gatilho manual `Comunicar Atualização` | HTML, assunto e público. |

**Atenção ao `current_version`:** o nó tem `is_mandatory = true` e `update_url` apontando para o `.exe`. Pelos nomes dos campos, subir a versão deve exigir a atualização de toda a base e levar também quem usa a Store para o `.exe`. Confirmar esse comportamento no código do app antes da primeira execução deste processo.

## Como executar

Copie `scripts/release/release.py` e um `release.json` (modelo em `release.example.json`) para o projeto do robô:

```bash
python release.py preparar release.json   # acione /release-preparar: nada é publicado
python release.py publicar release.json   # depois da aprovação da Store: acione /release-publicar
```

Atualização obrigatória exige `--confirmar-obrigatoria`. O disparo do e-mail continua manual. O andamento fica em `marketing/releases.md`.

## 2. Ordem do deploy

Cada fase só começa quando a anterior foi conferida.

### Fase 1 — Preparar (nada chega ao cliente)

- [ ] Copy, e-mail e card vindos do repositório do robô, da branch da release.
- [ ] Página `/atualizacao/` alterada, com `npm run build` e conferência em `npm run preview`.
- [ ] Preços e posicionamento conferidos com `.agent/PRECOS-SSOT.md` e `.agent/SSOT-PRODUTO.md`.
- [ ] Card em `marketing/vX.Y.Z-card-n8n.json`, como **array**, porque o app lê uma lista.
- [ ] E-mail sem marcadores pendentes: `{{ link_download }}` não é expressão válida no n8n.
- [ ] Links do e-mail abertos um a um.

### Fase 2 — Portão de liberação

- [ ] Store aprovou a versão.
- [ ] `.exe` publicado é a versão certa: baixar e conferir `ProductVersion`, sem executar.
- [ ] Sem fala de "em certificação" em nenhuma peça.

### Fase 3 — Site

- [ ] Commit na branch de deploy e `npm run deploy`.
- [ ] Conferir `/atualizacao/` em produção: versão certa e os dois botões funcionando.

O site vem antes do app e do e-mail porque os dois apontam para essa página.

### Fase 4 — App (`Nota Facil Licenciamento`)

Fluxo ativo, ligado à licença de todos os clientes. Seguir a skill `n8n-fluxos`.

- [ ] Baixar o fluxo publicado e aplicar a mudança por script de patch, com `assert` no valor anterior.
- [ ] Alterar apenas `current_version`, `message` e `html_banners` do nó `configuracoes`.
- [ ] Rodar `refs.py` e publicar com `publicar.py`, que guarda o backup.
- [ ] Conferir as três execuções seguintes e abrir o app em uma máquina com a versão antiga.

### Fase 5 — E-mail (`FolowUp e Comunicação`)

- [ ] Assunto e HTML atualizados.
- [ ] Envio de teste só para um endereço interno, conferido em um cliente de e-mail real.
- [ ] Contagem de destinatários conferida antes do disparo.
- [ ] Disparo pelo gatilho manual, acompanhado até o fim.
- [ ] Execução revisada e envios conferidos no painel do Brevo.

### Fase 6 — Registrar

- [ ] Registrar data, versão, IDs de execução e número de envios em `marketing/releases.md`.
- [ ] Commit dos scripts de patch, com a linha `Workflow: <id>`.

## 3. Como voltar atrás

| Canal | Reversão |
|---|---|
| Site | Reverter o commit e rodar `npm run deploy`. |
| Licenciamento | Republicar o backup de `publicar.py`. Baixar `current_version` não desinstala quem já atualizou. |
| `.exe` | Republicar o instalador anterior e guardar uma cópia antes de cada release. |
| E-mail | **Não há reversão.** Só cabe um novo e-mail de correção. Por isso o teste da Fase 5 é obrigatório. |

## 4. Correções no fluxo de e-mail antes do próximo envio

Encontradas na leitura do fluxo publicado em 01/11/2026 (`updatedAt` 12/10/2026).

| Prioridade | Problema | Efeito | Correção |
|---|---|---|---|
| Bloqueia | Sem filtro de `status` ou `plano` em `BuscaDados` e `Filtra_sem_email` | Envia a toda a base com atividade recente, não apenas a assinantes | Definir o público e filtrar |
| Bloqueia | `followup_tag != 'nao_enviar'` em SQL descarta `followup_tag` nulo | Clientes sem tag podem não receber nada | Conferir a contagem no banco; usar `IS DISTINCT FROM` se for o caso |
| Bloqueia | Falha no nó do Brevo interrompe o loop e não há registro de envios | Reenviar repete o e-mail para quem já recebeu | Tratar o erro e gravar envios por versão, em tabela separada |
| Bloqueia | Sem modo de teste | Testar exige alterar o fluxo à mão | Criar um gatilho com destinatário interno fixo |
| Alta | `last_seen` de até 60 dias exclui quem está parado há mais tempo ou não tem data | Clientes sem uso recente ficam sem o aviso | Decidir se a regra se mantém |
| Alta | Assunto e HTML ficam fixos nos nós | Risco de enviar o título da versão anterior; hoje há uma nota lembrando disso | Centralizar versão e assunto em um nó de configuração |
| Média | O link principal do e-mail da v3.5.2 tem um `{` antes de `https` | Botão possivelmente quebrado no e-mail publicado | Corrigir ao trocar o HTML |
| Média | `Envia E-mail Plunk1` e `HTML Email Atualização1` não têm entrada | Confusão sobre qual caminho é usado | Remover |
| Média | Comunicado e follow-up no mesmo fluxo | Mexer em um arrisca o outro | Separar em fluxos próprios |

## 5. Segurança

Há segredos gravados como texto nos nós: token do Chatwoot e `Authorization` do Plunk em `FolowUp e Comunicação`, além de `hmackey` e chaves de API em `configuracoes` no Licenciamento.

- Mover para credenciais do n8n ou variáveis de ambiente.
- Trocar o token do Chatwoot, que apareceu em texto puro no log de uma sessão do Claude Code em 01/11/2026.
