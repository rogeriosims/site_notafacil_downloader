---
title: "IBS e CBS na NFS-e Nacional: Guia de Conferência para 2026"
description: "Aprenda a auditar os novos campos de IBS e CBS na NFS-e Nacional para garantir o creditamento correto e evitar multas na Reforma Tributária."
pubDate: "2026-03-17"
draft: false
tags: ["Reforma Tributária", "IBS", "CBS", "NFS-e Nacional", "Compliance"]
author: "Equipe NotaFácil"
image: "/blog/imagens/capa_guia_ibs_cbs_2026.png"
readingTime: "8 min"
---

A Reforma Tributária deixou de ser uma promessa e tornou-se a realidade cotidiana dos escritórios contábeis em 2026. Com a entrada em vigor do **IBS (Imposto sobre Bens e Serviços)** e da **CBS (Contribuição sobre Bens e Serviços)**, a conferência da NFS-e Nacional tornou-se um processo de alta criticidade.

Se o seu escritório ainda trata a nota de serviço como apenas um valor total a ser lançado, você está correndo riscos elevados de autuação e, pior, fazendo seu cliente perder dinheiro em créditos não aproveitados.

## O que mudou no XML da NFS-e Nacional?

Com a Nota Técnica 007/2026, o layout da NFS-e Nacional foi expandido para acomodar a complexidade da transição tributária. Agora, além dos campos tradicionais de ISSQN (para municípios que ainda não migraram totalmente), temos blocos específicos para:

1. **Alíquotas de IBS e CBS:** Que variam conforme o regime da empresa e a localização do prestador/tomador.
2. **Base de Cálculo Reduzida:** Regimes diferenciados para educação, saúde e outros setores protegidos pela Lei Complementar.
3. **Eventos de Manifestação:** Onde o tomador confirma a operação para liberar o crédito.

## Checklist de Conferência: O que Auditar?

Para garantir que o fechamento fiscal não seja um pesadelo, sua equipe deve focar em três pontos principais:

### 1. Rastreabilidade do Crédito
Verifique se os campos `<IBS>` e `<CBS>` estão preenchidos corretamente no XML. Lembre-se: o PDF (DANFSE) é apenas um resumo. O direito ao crédito jurídico reside exclusivamente nos dados estruturados do XML. Se a nota foi emitida sem esses blocos por erro do prestador, o tomador não poderá se creditar.

### 2. Local da Prestação (Divergência de Alíquotas)
O IBS é um imposto baseado no **destino**. Conferir se o código do município do tomador está correto é vital. Um erro aqui pode gerar um recolhimento para o ente federativo errado, disparando alertas de malha fina automática.

### 3. Retenções na Fonte
A técnica de "Splitting" (divisão automática do pagamento) está sendo implementada gradualmente. Entender se o imposto já foi retido no ato do pagamento ou se deve ser apurado na guia mensal é a nova fronteira da escrita fiscal.

## A Importância da Automação na Conferência

Auditar 10 notas por mês manualmente é possível. Auditar 500 ou 1.000 é inviável e perigoso. É aqui que ferramentas de captura ativa como o **Nota Fácil Downloader** se pagam sozinhas. 

Ao baixar o XML original diretamente do Portal Nacional, você elimina o erro humano de digitação e garante que o dado que está no seu sistema contábil é exatamente o mesmo que está na base do Fisco.

---

**Evite a Malha Fina da Reforma Tributária.**  
Pare de coletar PDFs e comece a gerir dados fiscais de verdade.  
Acesse o Nota Fácil (Grátis até 100 notas/mês) → [https://notafacildownloader.contabilcert.com.br](https://notafacildownloader.contabilcert.com.br)


