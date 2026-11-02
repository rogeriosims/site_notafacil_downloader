---
name: release-publicar
description: Publica no site e no n8n uma release já preparada do Nota Fácil Downloader, parando antes do disparo do e-mail. Use quando o release.py do robô acionar esta etapa com um manifesto JSON.
disable-model-invocation: true
---

# Publicar release

Manifesto: $ARGUMENTS

Rodar esta etapa é a confirmação de que a Store aprovou a versão. Roda sem ninguém para responder: **no primeiro erro de conferência, pare e relate**. Não contorne nem force.

Consulte `marketing/releases.md` e pule o que já consta como feito para esta versão. Depois de cada fase, registre nesse arquivo e faça o commit.

Scripts do n8n: `~/.claude/skills/n8n-fluxos/scripts/`. Siga a skill `n8n-fluxos`. Backups em `.backups/n8n/`, pasta fora do Git porque contém segredos. Nunca imprima o valor de token ou chave.

## 1. Conferir

- Exista a branch `release/v<versao>`, com etapa `preparada` no registro.
- Baixe o `.exe` em `https://downloads.contabilcert.com.br/Nota_Facil_Downloader_Setup.exe` para uma pasta nova da área temporária, sem executar, e confirme em `ProductVersion` que é a versão. Apague depois.
- `obrigatoria: true` sem `obrigatoria_confirmada: true`: pare agora, antes de qualquer publicação, e peça o comando com `--confirmar-obrigatoria`.

## 2. Site

1. Integre a branch na `main` com `git merge --ff-only` e rode `npm run build`.
2. Rode `npm run deploy` a partir da `main`.
3. Em produção, confirme: `/atualizacao/` com a nova versão e o link da Store; home com 200; `/api/cadastro` com 204 em `OPTIONS`.

Não faça push.

## 3. App (`SVWDjcZJzAMpck5w`)

Este fluxo é ativo e atende à licença de todos os clientes.

1. Baixe o fluxo e rode `scripts/n8n/patch_licenciamento.py`.
2. Confirme que só o nó `configuracoes` mudou e que `is_mandatory` continua igual ao valor publicado, com as conexões idênticas. Rode `refs.py`.
3. Publique com `publicar.py --base --backup .backups/n8n`.
4. Releia o fluxo e confirme versão, cards e `active: true`. Acompanhe as execuções por até 10 minutos e relate qualquer erro. Sem execução nova, diga que ainda não foi confirmado.

## 4. Comunicado (`8iNFZ03A0rtX9Y1q`)

1. Baixe o fluxo e rode `scripts/n8n/patch_comunicado.py`. Rode `refs.py` e publique com backup.
2. **Pare aqui. Nunca dispare o e-mail.** O gatilho é manual e a decisão é da pessoa.

## 5. Relatório final

Liste o estado de cada canal e o que falta, com estes passos para a pessoa:

1. Rodar `Testar Comunicado` e conferir o e-mail recebido.
2. Conferir a contagem de destinatários.
3. Clicar em `Comunicar Atualização` e mantê-lo aberto até o fim.
4. Rodar a consulta de resultado em `comunicado_envios` para a versão.
5. Abrir o app em uma máquina com versão antiga, se a confirmação do item 3 ficou pendente.
