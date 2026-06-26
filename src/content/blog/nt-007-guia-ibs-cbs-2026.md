---
title: "Nota Técnica 007/2026: Novos Campos de IBS e CBS na NFS-e"
description: "A NT 007 mudou o XML da NFS-e Nacional. Saiba como preencher os novos campos de IBS/CBS e evitar a rejeição de notas no fechamento fiscal."
pubDate: "2026-04-20"
draft: false
tags: ["Nota Técnica 007", "IBS", "CBS", "NFS-e Nacional"]
author: "Rogério - Equipe NotaFácil"
image: "../../assets/blog/imagens/capa_nt_007_guia_ibs_cbs_2026.png"
readingTime: "8 min"
---

**Direto ao Ponto (TL;DR):**  
A Nota Técnica 007/2026 introduziu campos obrigatórios para o IBS e a CBS no layout da NFS-e Nacional. A partir deste mês, notas sem o detalhamento da tributação unificada serão rejeitadas pelo Portal Nacional. A solução para escritórios é automatizar a captura do XML 2.0 para garantir que todos os dados de retenção sejam importados corretamente para o ERP.

## O que é a Nota Técnica 007/2026 e por que ela é crítica?

A **Nota Técnica 007/2026** é o documento oficial que atualizou o layout da NFS-e Nacional para suportar a transição da Reforma Tributária. Ela não é apenas uma mudança técnica; é a base para o novo modelo de crédito financeiro do Brasil. 

Até então, o XML da nota de serviço focava no ISS municipal. Agora, o arquivo precisa carregar as informações do **IBS (Imposto sobre Bens e Serviços)** e da **CBS (Contribuição sobre Bens e Serviços)**. Se o XML que você está baixando (ou digitando) não contempla esses campos, seu cliente perderá o direito ao crédito tributário, gerando um prejuízo financeiro imediato.

## Quais os novos campos obrigatórios no XML da NFS-e?

De acordo com as diretrizes da Receita Federal e do Comitê Gestor da NFS-e, os principais campos que agora exigem atenção total do analista fiscal são:

1.  **Código de Tributação do IBS/CBS:** Identifica se o serviço é tributado, isento ou imune sob a nova regra.
2.  **Base de Cálculo Unificada:** O valor sobre o qual incidirão as alíquotas de transição.
3.  **Retenção na Fonte:** O valor do IBS/CBS que deve ser retido pelo tomador, crucial para a conciliação bancária.

| Campo no XML | Descrição Técnica | Impacto no Fechamento |
| :--- | :--- | :--- |
| `vIBS` | Valor do Imposto sobre Bens e Serviços | Essencial para o cálculo da guia única |
| `vCBS` | Valor da Contribuição sobre Bens e Serviços | Base para o crédito da empresa tomadora |
| `pRetIBS` | Percentual de retenção de IBS | Define o valor líquido a ser pago ao prestador |

## Como o NotaFácil resolve as complexidades da NT 007?

Monitorar as mudanças de layout do governo manualmente é impossível. O **Nota Fácil Downloader** foi atualizado para ler nativamente a versão 2.0 do XML da NFS-e Nacional, garantindo que o seu escritório não pare por causa de mudanças técnicas.

- **Captura do XML Completo:** Ao contrário do PDF, que pode omitir campos técnicos, o Nota Fácil baixa o XML original direto do Portal Nacional com todos os campos da NT 007 preenchidos.
- **Relatórios Prontos para IBS/CBS:** Nosso extrator de Excel já mapeia os novos campos de impostos da Reforma, entregando uma planilha de auditoria pronta para o seu fechamento.
- **Segurança Local Total:** Seus dados de login e certificados A1 permanecem na sua máquina, garantindo que a conformidade com a NT 007 não comprometa a sua conformidade com a LGPD.

## Checklist de Conformidade para Contadores (Março 2026)

*   [ ] Verifique se o seu ERP (Domínio, Alterdata, etc.) já suporta a importação do layout NT 007.
*   [ ] Configure o Nota Fácil para baixar as notas de serviço **tomadas** (recebidas) diariamente.
*   [ ] Audite a primeira semana de fechamento usando o relatório Excel do Nota Fácil para validar os campos de IBS/CBS.
*   [ ] Avise seus clientes que a aceitação de PDFs simples (sem XML) agora representa um risco financeiro.

## FAQ: Perguntas Frequentes sobre a NT 007

- **A NT 007 vale para todos os municípios?**  
  Sim. Todos os municípios que aderiram ao Padrão Nacional devem seguir o layout da NT 007 para garantir a integração com a Receita Federal.
- **Posso ser multado se o XML não tiver os campos de IBS/CBS?**  
  A multa não é direta pela falta do campo, mas pela escrituração incorreta e pela perda de prazos de entrega das novas guias unificadas.
- **Como baixar as notas no novo layout em lote?**  
  A forma mais segura é usar o Nota Fácil Downloader, que faz a consulta via API oficial e traz o arquivo XML 2.0 completo.

---

**Quer automatizar de vez a captura das suas NFS-e no novo padrão NT 007?**  
Baixe agora o NotaFácil franquia 100% grátis para sempre → [https://notafacildownloader.contabilcert.com.br](https://notafacildownloader.contabilcert.com.br/)
