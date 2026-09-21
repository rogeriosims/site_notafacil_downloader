---
title: "Nota Fácil v3.5.0: o que muda no download de NFS-e"
description: "A v3.5.0 refaz o período exato pedido quando uma busca falha, detecta o Portal Nacional fora do ar em 1 segundo e protege o banco contra queda de energia."
pubDate: "2026-09-18"
draft: false
tags: ["Nota Fácil Downloader", "NFS-e Nacional", "novidades", "automação contábil", "Portal Nacional", "certificado A3", "notas canceladas", "painel fiscal", "notas extemporâneas"]
author: "Rogério - Equipe NotaFácil"
readingTime: "6 min"
---

**Direto ao ponto:** a versão 3.5.0 do Nota Fácil Downloader refaz o período exato que você pediu quando uma busca falha, percebe o Portal Nacional fora do ar em menos de 1 segundo, aceita certificado A3 (token USB), classifica cada empresa da carteira no Painel Fiscal e separa canceladas e substituídas em pastas próprias. *Publicado e atualizado em 18/09/2026.*

---

## O que muda para quem está na versão 3.3.9?

A 3.5.0 reúne as melhorias das versões 3.4.x e da própria 3.5.0. No dia a dia do fechamento, ficou assim:

| Situação | O que o robô faz agora |
| --- | --- |
| Busca de meses anteriores falha por instabilidade | Reagenda e refaz **o período que você pediu** |
| Portal Nacional fora do ar | Detecta em menos de 1 s, marca "Portal indisponível" e tenta de novo |
| Empresa com usuário ou senha inválidos | É pulada no lote diário, sem gastar navegador nem cota de captcha |
| Cancelamento de nota que você nunca baixou | Busca a nota original na Sefin Nacional e salva com marca d'água |
| Notas canceladas e substituídas | Podem ir para subpastas próprias (opção), longe das notas válidas |
| Fechamento em andamento | O Painel Fiscal classifica cada empresa (Pronta, Atenção, Bloqueada, Sem movimento) e mostra "Aguardando" até o seu prazo |
| Nota compartilhada entre dois clientes seus | Guarda XML e PDF na pasta de cada empresa |
| Queda de energia corrompe o banco | Testa o banco ao abrir e o reconstrói sozinho |

---

## O que acontece quando uma busca de meses anteriores falha?

Se você pedir, por exemplo, de 01/03 a 08/09 e a busca falhar por um soluço de rede, o robô refaz exatamente esse período. Cada execução guarda o que buscou, e o retry o repassa, seja o automático ou os botões "Forçar agora" e "Executar todos". O novo painel **Retentativas** mostra a fila, o período de cada empresa e permite disparar ou cancelar.

As tentativas seguem 1, 5, 10, 20 e 30 minutos. Se esgotarem, a empresa não é abandonada: o lote do dia seguinte tenta do zero.

---

## E quando o Portal Nacional sai do ar?

Quando o portal exibe a tela de indisponibilidade, o robô percebe em menos de 1 segundo, sem esperar os tempos limite. A detecção vale antes e depois do login e no download do XML. O robô registra "Portal indisponível" e agenda a nova tentativa.

Para lentidão passageira, há um recarregamento automático, o equivalente a apertar F5, antes de dar a execução por perdida.

---

## Como ficam as notas compartilhadas entre clientes e as canceladas?

Quando prestador e tomador são clientes seus, o XML e o PDF vão para a pasta das duas empresas. Se chega o cancelamento de uma nota que nunca foi baixada, o robô busca a original na Sefin Nacional e a salva com a marca d'água "CANCELADA" ou "SUBSTITUÍDA", conforme o status real.

---

## Dá para separar canceladas e substituídas em pastas próprias?

Sim. É uma opção que você liga nas configurações: o robô passa a gravar as notas canceladas e as substituídas em subpastas dedicadas, e as pastas regulares ficam só com as notas válidas.

Isso reduz o risco de importar um documento anulado no ERP por engano e simplifica a conferência do fechamento. A separação se soma a dois sinais que já existem: a marca d'água no PDF e as cores da planilha, rosa para canceladas e amarelo para substituídas.

A opção vem desligada por padrão, então a estrutura atual das suas pastas não muda sozinha.

---

## O que o Painel Fiscal mostra sobre o fechamento?

O Painel Fiscal classifica cada empresa da carteira em quatro estados: **Pronta**, **Atenção**, **Bloqueada** e **Sem movimento**. O amarelo de Atenção acende com cancelamentos extemporâneos, divergência de retenção, saltos na numeração das notas emitidas e tentativas pendentes. Para cada empresa, ele mostra quantas notas o robô encontrou, quantas já estavam no disco e quantas deram erro.

Ele respeita o seu prazo de fechamento: até o dia definido, a competência sem notas aparece como "Aguardando", e não como "Sem movimento", o que evita falso alarme no meio do mês.

A sinalização continua na planilha: coluna "Extemporânea?", cores por status e o sufixo `_extemporanea_MM-YYYY` no nome do arquivo. Nas notas tomadas, o alerta lembra a possível retificação na EFD-Reinf e na DCTFWeb. Guia completo: [Painel Fiscal: como fechar a carteira de NFS-e em uma tela](/blog/painel-fiscal-planilha-fechamento-nfse/).

---

## Meu histórico corre risco se a energia cair?

Ao abrir, o robô faz um teste de integridade do banco. Se detectar corrupção, como após um desligamento forçado do Windows, ele arquiva a base original numa pasta de backup e reconstrói a base antes de abrir a tela.

Bancos de versões anteriores são migrados com segurança na atualização, e o histórico da carteira é mantido.

---

## O robô funciona com certificado A3 (token USB)?

Sim. A coleta pela API oficial aceita o A3 (token USB ou cartão com leitora), além do A1 em arquivo .pfx. A chave do A3 continua dentro do token, o que combina com a proposta de o certificado nunca ir para servidor de terceiros.

São dois requisitos no Windows:

1. **Gerenciador oficial do token instalado**, como o SafeSign Identity Client 64 bits (GD Starsign, Certmídia, Burti) ou o SafeNet Authentication Client. O driver genérico do Windows não assina com SHA-256 no TLS 1.2 que a API Nacional exige.
2. **Cadeia da ICP-Brasil** instalada no repositório de certificados do Windows (`certmgr.msc`).

Se aparecer "Não foi possível criar um canal seguro para SSL/TLS" depois de digitar o PIN, o sintoma é minidriver ausente ou cadeia incompleta. Instale o gerenciador, registre o certificado e reinicie os serviços `SCardSvr` e `CertPropSvc`.

---

## Como atualizar para a v3.5.0?

- **Microsoft Store:** a atualização chega automaticamente, em segundo plano.
- **Instalador .exe:** baixe o instalador da v3.5.0 e execute. Ele substitui o executável e preserva empresas, dados e configurações.

---

## Perguntas frequentes

**A opção "Iniciar com o Windows" mudou?**
Sim. O robô agora se religa por uma tarefa que confere a cada 15 minutos, o que funciona também em contas Administrador sem elevação. Ele liga em até 15 minutos após o boot, e não no instante do login.

**Dá para cadastrar a carteira inteira de uma vez?**
Sim. A importação por planilha Excel traz um modelo .xlsx e valida CNPJs, senhas de acesso e regimes tributários.

---

**Quer automatizar de vez a captura das suas NFS-e?**
Baixe agora o Nota Fácil, franquia 100% grátis para sempre → [https://notafacildownloader.contabilcert.com.br](https://notafacildownloader.contabilcert.com.br/)
