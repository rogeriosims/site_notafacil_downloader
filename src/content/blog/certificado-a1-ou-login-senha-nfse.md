---
title: "Certificado A1 ou Login e Senha para Baixar NFS-e?"
description: "Os dois métodos de acesso ao Portal Nacional não são equivalentes: um passa por captcha e o outro não. Entenda a diferença técnica e escolha o caminho certo para cada cliente da carteira."
pubDate: "2026-08-11"
draft: false
tags: ["NFS-e Nacional", "certificado digital A1", "Portal Nacional", "automação contábil", "segurança fiscal"]
author: "Rogério - Equipe NotaFácil"
readingTime: "6 min"
---

**Direto ao ponto:** o certificado digital A1 acessa a NFS-e pela API oficial, sem captcha no caminho. O login e senha depende de navegação no portal, onde a verificação visual existe. Os dois funcionam, mas o certificado é o caminho mais rápido e estável — e a maioria dos escritórios já tem os certificados dos clientes instalados sem saber que pode usá-los assim.

---

## Os dois métodos são realmente equivalentes?

Não são. A diferença não está na tela de login: está em **como cada um conversa com o Portal Nacional**.

O acesso por **certificado digital A1** usa a API oficial — um canal criado para comunicação entre sistemas. Você se identifica pelo certificado e consulta os documentos diretamente. Não há tela, não há botão, não há desafio visual.

O acesso por **login e senha** usa a interface web, a mesma que uma pessoa usaria. E é aí que mora o captcha: como o portal não consegue distinguir uma automação legítima de um robô malicioso, ele aplica a verificação visual a todo mundo.

Essa distinção explica por que dois clientes da mesma carteira podem ter velocidades de processamento bem diferentes.

---

## Qual a diferença prática no fechamento?

| | Certificado A1 | Login e Senha |
| :--- | :--- | :--- |
| **Canal de acesso** | API oficial | Navegação no portal |
| **Captcha** | Não se aplica | Sim, resolvido automaticamente |
| **Digitação de senha** | Não | A cada cadastro |
| **Velocidade por nota** | Maior | Menor |
| **Quem costuma ter** | Empresas já certificadas | MEIs e empresas menores |
| **Custo para o cliente** | Emissão do certificado | Nenhum |

Na prática, quanto mais clientes da carteira você conseguir migrar para o acesso por certificado, mais rápido e previsível fica o seu fechamento.

---

## E se meu cliente não tem certificado digital?

Aí o login e senha resolve — e resolve bem. Não é um método inferior, é um método diferente.

Muitos MEIs e empresas de menor porte não têm certificado A1 e não faz sentido exigir essa despesa só para viabilizar o download das notas. Para esses casos, o robô navega no portal com as credenciais, resolve os captchas automaticamente e executa exatamente a mesma rotina de captura em lote.

O resultado final é idêntico: XML, PDF e planilha consolidada, organizados nas pastas do ERP. O que muda é o caminho até lá.

---

## Preciso escolher um método para a carteira inteira?

Não, e esse é o ponto que costuma surpreender. Os dois métodos convivem na mesma execução.

Você cadastra cada empresa com o acesso que ela tem: as certificadas vão por A1, as demais vão por login e senha. Ao rodar o lote, o robô usa o caminho correto para cada CNPJ, sem que você precise separar as execuções.

Isso importa porque nenhuma carteira real é homogênea. O escritório típico tem clientes de portes diferentes, em estágios diferentes de digitalização.

---

## O certificado fica seguro nesse processo?

Essa é a pergunta mais importante do tema, e a resposta depende inteiramente da arquitetura da ferramenta.

Plataformas em nuvem precisam do certificado **no servidor delas** para funcionar. Isso significa que a chave privada dos seus clientes sai da sua infraestrutura e passa a depender da segurança de terceiros — um risco que recai sobre você, não sobre o fornecedor.

O Nota Fácil é um software desktop. Ele **lê os certificados A1 já instalados no repositório do Windows** da própria máquina do escritório. Você apenas seleciona qual empresa quer cadastrar pelo certificado. A chave privada não é copiada, não é enviada e não sai do computador.

A mesma lógica vale para as credenciais de login: ficam armazenadas apenas localmente.

---

## Checklist para organizar os acessos da carteira

- [ ] Liste quais clientes já possuem certificado A1 válido
- [ ] Verifique se esses certificados estão instalados no repositório do Windows da máquina que roda o robô
- [ ] Cadastre por certificado todas as empresas possíveis — é o caminho mais rápido
- [ ] Cadastre por login e senha as empresas sem certificado
- [ ] Confira as datas de validade antes do fechamento, para evitar surpresa no meio do lote
- [ ] Rode tudo em uma execução só

---

## Como o Nota Fácil resolve isso

O robô atende os dois métodos na mesma rotina. Para as empresas com certificado, a coleta usa a API oficial e dispensa qualquer verificação visual. Para as demais, o motor anti-captcha assume a navegação e resolve os desafios sem intervenção.

Se um certificado estiver vencido, o robô não interrompe o trabalho: ele registra o alerta e segue processando o restante da carteira, entregando no fim um relatório do que precisa de atenção.

Todos os planos, inclusive o gratuito de 100 notas por mês, permitem CNPJs ilimitados e aceitam os dois métodos de acesso.

---

## FAQ

**Certificado A3 também funciona?**
O A3 fica em token ou cartão e exige presença física da mídia, o que inviabiliza rotinas automáticas em lote. O A1, por ficar instalado na máquina, é o formato adequado para automação.

**Preciso digitar a senha do certificado a cada execução?**
Não. O robô lê o certificado já instalado no repositório do Windows, sem redigitar senha a cada cliente.

**O que acontece se o certificado vencer no meio do lote?**
O robô sinaliza o CNPJ afetado e continua com os demais. Você recebe o alerta no relatório final.

**Login e senha é menos seguro?**
As credenciais ficam armazenadas apenas no seu computador, como o certificado. A diferença entre os métodos é de velocidade e de canal de acesso, não de exposição de dados.

**Consigo trocar o método de acesso de um cliente depois?**
Sim. Se o cliente passar a ter certificado, basta alterar o cadastro daquela empresa.

**Isso funciona no plano gratuito?**
Sim. Os dois métodos estão disponíveis em todos os planos, incluindo o Free de 100 notas mensais.

---

**Quer automatizar de vez a captura das suas NFS-e?**
Baixe agora o Nota Fácil, 100% grátis para sempre → [https://notafacildownloader.contabilcert.com.br](https://notafacildownloader.contabilcert.com.br/)
