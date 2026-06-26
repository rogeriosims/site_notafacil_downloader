---
title: "2 Captchas Por Nota: O Portal Nacional Criou uma Armadilha para Contadores"
description: "O Portal Nacional da NFS-e agora exige um captcha com movimento para cada XML e outro para cada PDF baixado. O processo que levava 2 minutos por nota agora passa de 3. Entenda e veja como sair dessa armadilha."
pubDate: "2026-06-26"
draft: false
tags: ["NFS-e Nacional", "captcha portal nacional", "Portal Nacional NFS-e", "download NFS-e", "automação contábil"]
author: "Rogério - Equipe NotaFácil"
image: "../../assets/blog/imagens/capa_captcha_dois_por_nota.png"
readingTime: "6 min"
---

Resolver um captcha já era ruim. Agora, o Portal Nacional da NFS-e exige **dois captchas por nota fiscal**: um para baixar o XML e outro para baixar o PDF. E não são captchas simples de texto — são desafios visuais **com movimento**, difíceis até para humanos atentos.

O que antes levava **2 minutos por nota** (download + organização) agora passa de **3 minutos por nota**. Parece pouco? Para uma carteira de 80 clientes com 30 notas cada, estamos falando de **40 horas extras de trabalho braçal por fechamento**.

---

## O que mudou exatamente no Portal Nacional?

A Receita Federal implementou o **hCaptcha** — um sistema de verificação visual com desafios dinâmicos que exigem que o usuário identifique, clique e às vezes arraste elementos em movimento. O objetivo declarado é bloquear robôs maliciosos.

O fluxo de download de **cada nota** ficou assim:

1. Você acessa a nota no portal
2. Clica em "Baixar XML" → **aparece captcha com movimento**
3. Resolve o desafio visual → o XML baixa (se não errar)
4. Clica em "Baixar PDF" → **aparece novo captcha com movimento**
5. Resolve o segundo desafio → o PDF baixa
6. Organiza os arquivos na pasta correta
7. Repete para a próxima nota

**Dois captchas por nota. Para cada nota. De cada cliente. Todo mês.**

---

## Por que o hCaptcha é tão difícil?

O hCaptcha implementado no Portal Nacional não é o tipo de verificação que você resolve em segundos. Ele usa desafios com imagens em movimento — como identificar qual imagem "se encaixa" no espaço correto ou clicar em elementos que aparecem e somem.

Três fatores agravam ainda mais o tempo:

**Alta taxa de falha intencional.** O sistema detecta padrões de cliques rápidos e repetitivos — exatamente o comportamento de quem baixa muitas notas seguidas — e aumenta deliberadamente a dificuldade ou invalida a resposta correta, forçando o recomeço.

**Carregamento variável.** Em dias de pico do portal (dias 1 a 10 de cada mês), o carregamento do captcha depende de CDN externos e pode levar mais de 15 segundos só para aparecer.

**Expiração de sessão.** Se o contador demorar mais de 90 segundos entre um captcha e outro, o token de sessão expira e o login precisa ser refeito do zero.

---

## De 2 minutos para 3 minutos por nota: o impacto real

Antes do hCaptcha, o processo de download e organização de **uma nota** levava em média **2 minutos** — considerando o acesso, download do XML, download do PDF e organização na pasta do ERP.

Com o hCaptcha, esse mesmo processo passa de **3 minutos por nota**.

| Escritório | Notas/mês | Antes (2 min/nota) | Depois (3+ min/nota) | Horas extras |
| :--- | :--- | :--- | :--- | :--- |
| Pequeno (20 clientes × 20 notas) | 400 notas | 13,3h | 20h | **+6,7h** |
| Médio (60 clientes × 30 notas) | 1.800 notas | 60h | 90h | **+30h** |
| Grande (120 clientes × 30 notas) | 3.600 notas | 120h | 180h | **+60h** |

Sessenta horas extras de trabalho braçal por fechamento, para um escritório de 120 clientes. **Cada uma delas gasta resolvendo quebra-cabeças com movimento do governo.**

---

## Por que as soluções em nuvem também sofrem?

Muitos contadores pensam que basta usar um sistema SaaS para escapar do captcha. A realidade é diferente.

Plataformas que operam via **scraping da interface web do portal** esbarram no mesmo hCaptcha que paralisa o trabalho humano. Quando a plataforma em nuvem trava em um captcha com movimento, ela leva a operação de **toda a carteira de clientes junto**.

Além disso, sistemas que tentam resolver captchas de forma automatizada a partir de um único IP de servidor correm risco de **bloqueio permanente pela Receita Federal** — interrompendo o serviço de todos os seus clientes de uma vez.

---

## As duas rotas do Nota Fácil: robô e API

O Nota Fácil Downloader resolve o problema por dois caminhos diferentes, dependendo do tipo de acesso do cliente:

### Rota 1 — API com Certificado Digital A1 (a mais rápida)
Para clientes que possuem Certificado Digital A1, o robô se comunica diretamente com a **API oficial da Receita Federal**. Nessa rota, o captcha **simplesmente não existe** — a API não apresenta desafios visuais para autenticações certificadas. A carteira inteira é baixada em minutos, sem nenhuma interação humana.

### Rota 2 — Motor Ghost com resolução automática de captcha
Para clientes que usam login e senha do Gov.br (MEIs, empresas menores), o **Motor Ghost** resolve os captchas automaticamente em segundo plano — incluindo os desafios com movimento. O auxiliar fiscal não precisa fazer nada. O robô trabalha enquanto a equipe se dedica ao trabalho contábil de valor.

Em ambas as rotas, o processamento ocorre **100% localmente no seu computador ou servidor**. O Certificado A1 nunca sai da máquina. Nenhum dado sobe para servidores de terceiros.

---

## O que você recebe além do download sem captcha

Ao eliminar o tempo perdido em captchas, o Nota Fácil entrega automaticamente:

- **Planilha Mestra com Dashboard de Inteligência Fiscal:** painel visual com faturamento bruto, serviços tomados e tributos retidos (ISS, PIS, COFINS, CSLL, IRRF, INSS) gerado automaticamente em Excel
- **Auditoria Cromática:** notas canceladas (rosa), substituídas (amarelo) e extemporâneas (azul) marcadas na planilha para identificação imediata
- **Organização por Competência Real:** arquivos salvos e renomeados no mês fiscal correto, blindando a DCTFWeb e o SPED
- **Relatório Consolidado Multi-Empresas:** toda a carteira em um único arquivo Excel por competência

---

## Checklist: seu escritório está na armadilha do captcha?

Marque os itens que se aplicam:

- [ ] Minha equipe passa mais de 2 horas por fechamento baixando notas manualmente
- [ ] Já tivemos notas faltando no fechamento por erro humano ou cansaço
- [ ] O auxiliar fiscal reclama de captcha que não funciona ou portal lento
- [ ] Nosso sistema atual trava com frequência no fechamento
- [ ] Ainda não usamos Certificado A1 para automação da carteira

Se você marcou 2 ou mais, sua operação está pagando o custo invisível do hCaptcha.

---

## FAQ

**O hCaptcha com movimento bloqueia o Motor Ghost do Nota Fácil?**  
Não. O Motor Ghost foi desenvolvido para resolver desafios visuais dinâmicos de forma automática, incluindo captchas com movimento. O auxiliar fiscal não precisa intervir.

**E para clientes com Certificado A1?**  
Pela rota de API, o captcha não existe. A comunicação é direta com o servidor da Receita Federal via certificado — sem interface visual, sem desafios.

**Quantas notas consigo baixar de uma vez?**  
Toda a carteira em uma única operação. O robô processa os CNPJs em sequência, sem limite de volume (exceto no plano gratuito, que cobre até 100 notas/mês).

**Preciso de servidor ou computador dedicado?**  
Não. O Nota Fácil é um aplicativo desktop para Windows. Você instala em qualquer máquina do escritório e pode agendar as varreduras para rodar em segundo plano, inclusive durante a madrugada.

**O processo é legal e seguro perante a Receita Federal?**  
Sim. Ambas as rotas — API com certificado e Motor Ghost com login — utilizam os mesmos mecanismos de acesso que um contador utilizaria manualmente, só que automatizados. O processamento é local e não viola a LGPD.

---

**Cansado de resolver captcha com movimento para cada nota fiscal?**  
Baixe agora o Nota Fácil com franquia 100% grátis para sempre → [https://notafacildownloader.contabilcert.com.br](https://notafacildownloader.contabilcert.com.br/)
