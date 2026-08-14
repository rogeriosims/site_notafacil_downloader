---
title: "XML não abre? Como Gerar o PDF da NFS-e (DANFSE)"
description: "O cliente pede a nota em PDF e você só tem o XML. Entenda a diferença entre os dois arquivos e veja como gerar o DANFSE em lote sem depender do Portal Nacional."
pubDate: "2026-08-11"
draft: false
tags: ["NFS-e Nacional", "DANFSE", "XML para PDF", "Portal Nacional", "automação contábil"]
author: "Rogério - Equipe NotaFácil"
readingTime: "6 min"
---

**Direto ao ponto:** o XML não abre no navegador porque não é um documento visual — é o arquivo com validade fiscal. A versão legível é o DANFSE, em PDF. Dá para gerar o PDF a partir do XML localmente, em lote, sem voltar ao Portal Nacional e sem enfrentar um captcha por documento.

---

## Por que o XML abre todo bagunçado na tela?

Porque ele não foi feito para ser lido por pessoas. O XML é um arquivo estruturado, com etiquetas que os sistemas usam para interpretar cada informação da nota: prestador, tomador, valores, retenções, alíquotas.

Quando você abre um XML no navegador ou no Bloco de Notas, vê o conteúdo bruto — linhas com marcações. Está tudo certo com o arquivo; ele só não é um documento de leitura.

E aqui está o ponto que gera confusão no dia a dia: **o XML é o documento com valor fiscal**. O PDF é apenas a representação visual dele.

---

## Qual a diferença entre XML e DANFSE?

O DANFSE é o Documento Auxiliar da NFS-e — a folha que o cliente reconhece como "a nota". Ele existe para ser impresso, enviado por e-mail e arquivado por quem não vai processar o arquivo em sistema.

| | XML | DANFSE (PDF) |
| :--- | :--- | :--- |
| **O que é** | Arquivo fiscal oficial | Representação visual |
| **Serve para** | Escrituração, importação no ERP, auditoria | Leitura, envio ao cliente, arquivo físico |
| **Validade fiscal** | Sim | Não substitui o XML |
| **Guarda obrigatória** | Sim, pelo prazo legal | Complementar |
| **Legível por pessoas** | Não | Sim |

A regra prática: **guarde sempre o XML e gere o PDF quando precisar mostrar a nota para alguém.**

---

## Por que gerar o PDF pelo portal é um problema?

Porque cada PDF é mais uma requisição ao Portal Nacional — e hoje cada requisição passa por verificação.

O fluxo manual fica assim: você localiza a nota, resolve um captcha para baixar o XML, resolve outro captcha para baixar o PDF. São dois desafios visuais por documento.

Multiplique por uma carteira de 60 clientes com 30 notas cada e você tem 3.600 captchas em um único fechamento. Só para obter arquivos que já poderiam ter sido gerados a partir do XML que você tem em mãos.

Há ainda a dependência de disponibilidade: se o portal estiver instável — o que costuma acontecer justamente nos primeiros dias do mês —, a geração do PDF trava junto.

---

## Dá para gerar o PDF sem acessar o portal?

Sim. O XML contém todos os dados necessários para montar o documento visual: identificação das partes, discriminação do serviço, valores, tributos e retenções.

Se você já baixou o XML, não precisa pedir o PDF ao governo. Um software que interpreta o arquivo consegue renderizar o DANFSE localmente, em milissegundos, sem rede e sem captcha.

Essa diferença aparece principalmente em três situações:

- **Reenvio ao cliente.** Ele apagou o e-mail e pede a nota de novo, meses depois. Você gera do XML arquivado, na hora.
- **Portal fora do ar.** A instabilidade do governo deixa de bloquear a entrega do seu trabalho.
- **Lote grande.** Gerar 500 PDFs localmente leva segundos; pelo portal, seriam 500 captchas.

---

## Como o Nota Fácil resolve isso

O Nota Fácil baixa o XML e **gera o PDF localmente a partir dele**, sem nova consulta ao Portal Nacional. O motor renderiza os documentos direto na sua máquina, em milissegundos.

Na mesma execução, o robô ainda organiza os arquivos na estrutura de pastas que o seu ERP exige — separados por competência e por CNPJ — e consolida uma planilha com os dados extraídos das notas: valores, retenções, prestadores e tomadores.

Ou seja: um lote entrega o XML para escriturar, o PDF para enviar ao cliente e a planilha para conferir. Sem abrir nota por nota.

Para empresas com certificado A1, a coleta usa a API oficial e não passa por captcha. Para as que só têm login e senha, o robô navega no portal e resolve os desafios automaticamente.

---

## Checklist de organização dos arquivos

- [ ] Guarde o XML como documento principal, pelo prazo legal exigido
- [ ] Gere o PDF sob demanda, a partir do XML — não o trate como arquivo insubstituível
- [ ] Separe as pastas por competência e por CNPJ, no formato que o ERP importa
- [ ] Filtre notas canceladas e substituídas antes da escrituração
- [ ] Mantenha uma planilha consolidada da competência para conferência rápida

---

## FAQ

**Posso descartar o XML se eu tiver o PDF?**
Não. O XML é o documento com validade fiscal e deve ser guardado pelo prazo legal. O PDF é uma representação visual e não o substitui.

**O PDF gerado localmente tem a mesma validade do baixado no portal?**
Ambos são documentos auxiliares, sem valor fiscal próprio — o que vale é o XML. O DANFSE serve para leitura e envio, e o conteúdo é o mesmo porque vem do mesmo arquivo.

**Preciso estar conectado à internet para gerar o PDF?**
Não, se o XML já estiver na sua máquina. A renderização é local.

**Consigo gerar PDFs de notas antigas?**
Sim. Enquanto você tiver o XML arquivado, o PDF pode ser gerado a qualquer momento.

**O que acontece com notas canceladas?**
O robô identifica e filtra notas canceladas e substituídas, para que não entrem na escrituração por engano.

**Isso funciona no plano gratuito?**
Sim. O plano Free processa 100 notas por mês, com CNPJs ilimitados e sem cartão de crédito.

---

**Quer automatizar de vez a captura das suas NFS-e?**
Baixe agora o Nota Fácil, 100% grátis para sempre → [https://notafacildownloader.contabilcert.com.br](https://notafacildownloader.contabilcert.com.br/)
