---
title: "Painel Fiscal: como fechar a carteira de NFS-e em uma tela"
description: "O Painel Fiscal classifica cada empresa em Pronta, Atenção, Bloqueada ou Sem movimento e exporta uma planilha de até 7 abas para conferir o fechamento."
pubDate: "2026-09-18"
image: "../../assets/blog/imagens/capa_painel_fiscal.png"
draft: false
tags: ["Painel Fiscal", "planilha de fechamento", "NFS-e Nacional", "contabilidade", "notas extemporâneas", "Nota Fácil Downloader"]
author: "Rogério - Equipe NotaFácil"
readingTime: "6 min"
---

**Direto ao ponto:** o Painel Fiscal do Nota Fácil Downloader mostra, na competência que você escolher, em que pé está cada empresa da carteira: **Pronta**, **Atenção**, **Bloqueada** ou **Sem movimento**. Em um clique, ele exporta a planilha de fechamento, com resumo fiscal, notas, cancelamentos, substituições e eventos. O robô baixa e organiza, e o painel aponta onde olhar primeiro. *Publicado e atualizado em 18/09/2026.*

---

## O que é o Painel Fiscal do Nota Fácil?

É a tela de fechamento do robô. Em vez de listar empresas como simples cadastros, ele analisa a carteira pela **competência contábil ativa**, por exemplo 08/2026.

Você troca de mês com as setas ao lado do seletor de competência, e os indicadores, alertas e totais são recalculados. Duas ações ficam no topo: **Recalcular** os indicadores e **Exportar consolidada**, que gera o fechamento de todas as empresas de uma vez.

---

## Como o painel classifica cada empresa?

Cada empresa cai automaticamente em um de quatro estados:

| Estado | Quando aparece |
| --- | --- |
| **Pronta** (verde) | Sincronização concluída no período, sem saltos de numeração e sem falhas |
| **Atenção** (amarelo) | Divergência de retenção, cancelamento extemporâneo, salto na numeração das emitidas ou tentativa pendente na fila |
| **Bloqueada** (vermelho) | Falha permanente ativa: usuário ou senha inválidos, certificado vencido ou ausente, licença bloqueada |
| **Sem movimento** (cinza) | Nenhuma nota emitida ou tomada no período |

Um detalhe evita falso alarme: se a competência ainda está antes do seu **prazo de fechamento**, a empresa sem notas aparece como **"Aguardando"**, e não como "Sem movimento".

---

## O que o card de cada empresa mostra?

- **Identificação:** razão social, CNPJ, código interno e o tipo de acesso, com [C] para certificado digital e [L] para usuário e senha.
- **Volumes e valores:** notas emitidas com o faturamento bruto, notas tomadas com o valor das despesas e o total de impostos retidos, federais e ISS.
- **Conciliação de 3 vias:** notas encontradas no portal, notas no disco e notas com erro.
- **Saltos de numeração:** o painel aponta lacunas, como "faltam notas entre o nº 104 e 109".

Cada card traz três atalhos: **Sincronizar agora**, que faz a busca retroativa até a data atual e captura as extemporâneas; **Exportar Excel individual**; e **Abrir pasta**, que leva ao Windows Explorer, onde XML e PDF estão organizados.

---

## O que vem na planilha de fechamento?

A planilha usa fórmulas nativas do Excel (SUMIFS e COUNTIFS), então a conferência pode ser refeita por você. Ela tem até 7 abas:

1. **Resumo Fiscal:** faturamento bruto, despesas com serviços tomados, ISS próprio e retido, PIS, COFINS, CSLL, IRRF e INSS retidos, os 5 maiores clientes e fornecedores e um painel de riscos.
2. **Notas Fiscais:** o espelho completo, com número, chave de acesso, datas de emissão e de competência, partes envolvidas, valores, impostos, enquadramento e o campo "Extemporânea?".
3. **Emitidas** e 4. **Tomadas:** as duas pontas separadas, para a escrita fiscal e para contas a pagar e a receber.
5. **Cancelamentos:** número, chave, data e motivo. Cancelamento de nota antiga que ocorre no mês corrente entra com a marca de *cancelamento extemporâneo*.
6. **Substituições:** a nota antiga e a nova, com a chave vinculada e o motivo.
7. **Eventos:** o registro dos eventos da Receita, como cartas de correção e pedidos de cancelamento.

As cores ajudam a bater o olho: rosa para canceladas, amarelo para substituídas e azul para extemporâneas.

---

## Como a planilha ajuda com notas extemporâneas?

O painel de riscos do Resumo Fiscal separa os alertas. Nas emitidas, aponta o risco de apuração retroativa de receita. Nas tomadas, lembra a possível necessidade de retificar a DCTFWeb e a EFD-Reinf.

O arquivo da nota também ganha o sufixo `_extemporanea_MM-YYYY`, e a coluna "Extemporânea?" permite filtrar tudo de uma vez.

---

## E a visão de toda a carteira?

Ao exportar a consolidada, o sistema gera o **Painel Geral**, com uma linha por empresa: CNPJ, razão social, regime tributário, quantidade e valor de emitidas e tomadas, retenções federais, ISS retido, quantidade de canceladas e o status de fechamento. É a conferência de 50, 100 ou 500 clientes em uma única tela.

---

## Perguntas frequentes

**O Painel Fiscal substitui o meu ERP?**
Não. Ele captura, organiza e sinaliza para conferência. A escrituração e a apuração seguem no seu sistema.

**O que significa "Aguardando"?**
Que a competência ainda está antes do seu prazo de fechamento. Antes dele, uma empresa sem notas não é tratada como "Sem movimento".

**Os dados saem da minha máquina?**
Não. O robô roda no seu computador, e as pastas e planilhas ficam no seu disco.

**Como um "salto de numeração" é detectado?**
O painel aponta lacunas na sequência das notas emitidas no período, por exemplo "faltam notas entre o nº 104 e 109", para você conferir.

---

**Quer automatizar de vez a captura das suas NFS-e?**
Baixe agora o Nota Fácil, franquia 100% grátis para sempre → [https://notafacildownloader.contabilcert.com.br](https://notafacildownloader.contabilcert.com.br/)
