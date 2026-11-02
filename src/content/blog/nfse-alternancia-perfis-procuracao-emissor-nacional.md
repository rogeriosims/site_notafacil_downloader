---
title: "Emissor da NFS-e agora permite alternar perfis e procuração"
description: "Desde 1º de novembro, o Emissor Nacional da NFS-e permite atuar por outra empresa sem novo login. Veja quem pode usar, como funciona e o que muda para o contador."
pubDate: "2026-11-01"
draft: false
tags: ["NFS-e Nacional", "Emissor Nacional", "procuração eletrônica", "Portal Nacional", "contabilidade"]
author: "Rogério - Equipe NotaFácil"
image: "../../assets/blog/imagens/capa_alternancia_perfis_nfse.png"
readingTime: "5 min"
---

**Direto ao ponto:** desde 1º de novembro de 2026, os emissores nacionais da NFS-e permitem atuar em nome de outra pessoa ou empresa sem encerrar a sessão. Basta ter procuração eletrônica válida ou vínculo no cadastro do CNPJ. A mudança também alcança as APIs de Emissão e de Distribuição.

---

## O que mudou no Emissor Nacional da NFS-e?

Depois de entrar no Emissor Web, o usuário pode trocar o perfil ativo e operar em nome de quem representa, sem sair e fazer um novo login. O anúncio foi feito pelo [Portal da NFS-e](https://www.gov.br/nfse/pt-br/noticias/nova-funcionalidade-possibilita-representacao-e-alternancia-de-perfis-na-nfs-e) em 31 de outubro.

O passo a passo está no item 11 do [guia do Emissor Web, versão 1.3](https://www.gov.br/nfse/pt-br/biblioteca/documentacao-tecnica/documentacao-atual/guia-emissorpubliconacionalweb_snnfse-ern-v1-3.pdf).

A mesma versão do guia informa que o acesso pelo GOV.BR, antes exclusivo para MEI, agora vale para todos os contribuintes. São aceitas apenas contas de nível prata ou ouro.

---

## Quem pode atuar em nome de outra empresa?

A representação depende de uma procuração eletrônica ou de um vínculo no cadastro do CNPJ:

| Caminho | Quando se aplica | O que é preciso |
| :--- | :--- | :--- |
| **Procuração eletrônica** | Contador ou terceiro atuando por um cliente | Autorização com o serviço específico da NFS-e, cadastrada no Portal de Serviços da Receita Federal |
| **Responsável legal** | CPF que responde legalmente por uma empresa | Vínculo no cadastro do CNPJ |
| **Mesma raiz de CNPJ** | Troca entre estabelecimentos ou empresas com os mesmos 8 primeiros dígitos | Vínculos e permissões identificados pelo sistema no acesso |

Os perfis disponíveis dependem do que consta no cadastro do CNPJ no momento do acesso. Se não houver vínculo válido, o sistema exibe uma mensagem de erro.

---

## Como cadastrar a procuração da NFS-e?

Quem concede os poderes é o cliente, no [Portal de Serviços da Receita Federal](https://servicos.receitafederal.gov.br/):

1. Selecione a opção **Nova Autorização**.
2. Informe o CPF ou CNPJ de quem receberá os poderes.
3. Defina o período de vigência.
4. Selecione o serviço específico da NFS-e.
5. Confirme e assine eletronicamente.

Vale conferir a vigência e os serviços autorizados. O procurador só pode atuar dentro dos limites definidos na autorização.

---

## Como alternar o perfil no Emissor Web?

1. Entre no Emissor Nacional com login e senha, certificado digital ou GOV.BR.
2. No canto superior direito, clique na seta ao lado da sua identificação.
3. Escolha **Procuração/Representação**.
4. Informe o CPF ou CNPJ que deseja representar e clique em **Representar**.

Para voltar a um cliente já acessado, use o quadro **Representações Recentes**, sem digitar o documento de novo.

Com a representação validada, a tela mostra quem está sendo representado, quem está fazendo o acesso e um aviso de atuação em nome de terceiros. Confira esse aviso antes de emitir qualquer nota.

---

## O que muda para o escritório de contabilidade?

A principal mudança é operacional: o contador pode atender vários clientes a partir do próprio acesso, sem depender de um login para cada empresa no Emissor Web.

O escritório também reduz a necessidade de guardar senhas de clientes para essa rotina, já que a autorização é formal, tem vigência e pode ser controlada na Receita Federal.

Para começar, vale organizar três pontos:

- **Levantamento:** quais clientes já concederam a procuração com o serviço da NFS-e.
- **Controle de vigência:** quando cada autorização termina.
- **Orientação da equipe:** conferir o perfil ativo antes de emitir, para não atuar pela empresa errada.

---

## A novidade vale para sistemas e integrações?

Sim. As [APIs de Emissão](https://sefin.nfse.gov.br/SefinNacional/docs/index) e de [Distribuição](https://adn.nfse.gov.br/contribuintes/docs/index.html) também aceitam acesso em nome de terceiros, com base na procuração ou nos vínculos do CNPJ.

A validação é feita pelo certificado digital usado na conexão e pelas assinaturas dos documentos fiscais. Segundo o Portal da NFS-e, o objetivo é facilitar a integração de sistemas próprios e soluções de mercado.

---

## E a captura das notas no fechamento?

A alternância de perfis facilita o acesso, mas a troca ainda é feita cliente por cliente. Em uma carteira grande, baixar as notas de cada empresa continua sendo um trabalho repetitivo.

É aí que entra o Nota Fácil, robô que roda no computador do escritório. Ele baixa em lote o XML e o PDF das notas emitidas e tomadas de toda a carteira, usando o certificado digital ou o login e senha de cada empresa. O certificado não sai da sua máquina.

O plano gratuito processa 100 notas por mês, com CNPJs ilimitados e sem cartão de crédito. Se estiver avaliando a forma de acesso, veja também [certificado A1 ou login e senha na NFS-e](/blog/certificado-a1-ou-login-senha-nfse/).

---

## FAQ

**A alternância de perfis já está disponível?**
Sim. Segundo o Portal da NFS-e, os emissores nacionais oferecem o recurso desde 1º de novembro de 2026.

**O responsável legal precisa de procuração para acessar a própria empresa?**
Não. Quando o CPF está cadastrado como responsável legal, a alternância usa o vínculo existente no cadastro do CNPJ.

**O contador precisa de procuração?**
Para atuar por um cliente sem ser seu responsável legal, sim. A procuração precisa estar válida e incluir o serviço da NFS-e.

**Posso entrar com GOV.BR de nível bronze?**
Não. O Emissor Web aceita apenas os níveis prata e ouro.

**O que acontece com o MEI que entra pelo GOV.BR?**
Ele continua entrando direto no perfil do CNPJ, e não no do CPF.

**Dá para alternar entre matriz e filial?**
Sim, quando os estabelecimentos têm a mesma raiz de CNPJ e os vínculos e permissões cadastrais permitem a troca.

---

**Quer automatizar de vez a captura das suas NFS-e?**
Baixe agora o Nota Fácil, 100% grátis para sempre → [https://notafacildownloader.contabilcert.com.br](https://notafacildownloader.contabilcert.com.br/)
