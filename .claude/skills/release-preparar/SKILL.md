---
name: release-preparar
description: Prepara página, card e e-mail de uma release do Nota Fácil Downloader, sem publicar nada. Use quando o release.py do robô acionar esta etapa com um manifesto JSON.
disable-model-invocation: true
---

# Preparar release

Manifesto: $ARGUMENTS

O manifesto autoriza ler só os arquivos `copy`, `email` e `card` nele citados, inclusive fora desta pasta. Não leia mais nada de outros projetos. Roda sem ninguém para responder: em qualquer dúvida, pare e relate.

**Aqui não há deploy, nem escrita no n8n, nem push.**

1. Se a árvore do Git não estiver limpa, pare. Crie `release/v<versao>` a partir da `main`.
2. Leia a copy, inclusive os avisos do topo: eles mandam no texto.
3. Copie o e-mail para `marketing/emails/v<versao>.html` e o card para `marketing/v<versao>-card-n8n.json`.
   - Troque `{{ link_download }}` por `https://notafacildownloader.contabilcert.com.br/atualizacao/`.
   - O card precisa ser um **array**, com o card da versão primeiro. Mantenha os outros banners ainda válidos.
4. Reescreva `src/pages/atualizacao.astro` para a versão:
   - mantenha o botão principal da Microsoft Store e o `.exe` secundário com o alerta;
   - siga `.agent/PRECOS-SSOT.md` e `.agent/SSOT-PRODUTO.md`;
   - não cite fornecedor de CAPTCHA, saldo ou custo;
   - não publique números de teste interno, como comparações entre API e portal, salvo pedido expresso.
5. Rode `npm run build`. Confirme que a página gerada contém a nova versão e não a anterior, exceto em comentários.
6. Faça o commit na branch, em Conventional Commits, pt-BR, sem acentuação.
7. Acrescente a linha da versão em `marketing/releases.md`, com a etapa `preparada`, e faça o commit.
8. Termine com: branch, arquivos, frases da copy que você alterou e por quê, e o comando seguinte: `python release.py publicar release.json`.
