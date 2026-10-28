# Documento de Ajuste 20 — Nova Grade de Planos: Turbo, Pro, Enterprise e Grid 3x2

**Data:** 28 de Outubro de 2026  
**Responsável:** Rogério Moura / Equipe NotaFácil  
**Contexto:** Sincronização entre as regras de precificação/franquia do aplicativo desktop e a landing page do site, além de otimização de layout e experiência visual da tabela de preços.

---

## 1. Motivação da Mudança

1. **Alinhamento com o App Desktop:**
   - O aplicativo desktop recebeu a faixa intermediária de **3.000 notas/mês** para atender escritórios que estouram as 1.500 notas do plano intermediário, mas ainda não demandam as 5.000 notas do Scale.
   - O plano intermediário de 1.500 notas foi renomeado de **"Crescimento"** para **"Pro"**.
   - O novo plano de 3.000 notas foi batizado de **"Turbo"**.
   - Foi criado o plano **"Enterprise"** para grandes escritórios, grupos contábeis e BPOs com demanda acima de 5.000 notas/mês, direcionando para atendimento consultivo via WhatsApp.

2. **Problema de UX no Grid de 5 Colunas:**
   - Na primeira tentativa de colocar 5 planos lado a lado (`Free`, `Starter`, `Pro`, `Turbo`, `Scale`), cada card ficou excessivamente estreito (~220px úteis).
   - O preço quebrava feio (`R$` em cima e o número embaixo) e os CTAs longos (*"INSTALAR E ASSINAR NO APP"*) ocupavam até 3 linhas, quebrando a simetria com o card Free (*"COMEÇAR GRÁTIS"*).

---

## 2. A Nova Estrutura da Grade (3x2)

A decisão foi adotar um **grid simétrico de 3 cards por linha** (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl`), dando ~360px de respiro para cada card.

### Linha 1 (Degraus Iniciais e Destaque):
| Plano | Franquia | Preço | Custo/nota | Selo | Frase do Card | CTA |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Free** | 100 notas/mês | Grátis | – | Grátis para sempre | *“Veja o robô baixar suas notas enquanto você toma um café”* | Começar grátis |
| **Starter** | 500 notas/mês | R$ 39,90/mês | R$ 0,080 | – | *“Nunca mais perca uma tarde no portal”* | Assinar no app |
| **Pro** | 1.500 notas/mês | R$ 89,90/mês | R$ 0,060 | **Mais escolhido** *(destaque visual)* | *“Feche o mês sem correria”* | Assinar no app |

### Linha 2 (Alta Demanda e Escala):
| Plano | Franquia | Preço | Custo/nota | Selo | Frase do Card | CTA |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Turbo** | 3.000 notas/mês | R$ 139,90/mês | R$ 0,047 | **Novo** | *“Cresça a carteira sem contratar ninguém”* | Assinar no app |
| **Scale** | 5.000 notas/mês | R$ 199,90/mês | R$ 0,040 | **Melhor custo por nota** | *“Seu escritório no piloto automático”* | Assinar no app |
| **Enterprise** | +5.000 notas/mês | Sob medida | Personalizado | **Sob Medida** | *“Demanda personalizada para o tamanho da sua operação”* | Falar com suporte |

---

## 3. Melhorias de UI Implementadas

1. **Preços sem quebra (`whitespace-nowrap`):**
   - Símbolo `R$` em tamanho proporcional, valor numérico em `text-4xl` e periodicidade na mesma linha horizontal.
2. **CTAs Simétricos em Linha Única:**
   - Botões com exatamente a mesma altura (`py-4`), fontes legíveis e textos objetivos: `Começar grátis`, `Assinar no app` e `Falar com suporte` (com ícone do WhatsApp).
3. **Bloco Explicativo "Como Funciona a Assinatura":**
   - Transparência sobre o modelo pré-pago mensal via faturas do Asaas (Pix/Boleto/Cartão);
   - Regra de tolerância: contas sem fatura paga retornam ao Free (100 notas/mês) sem bloqueio total do robô;
   - Regra de upgrade: feito no app com pró-rata imediata da franquia; downgrade no ciclo seguinte;
   - Ausência de pacotes avulsos de notas.

---

## 4. Arquivos Sincronizados

- [`.agent/PRECOS-SSOT.md`](../../.agent/PRECOS-SSOT.md): Tabela de preços, regras comerciais e cálculo de ROI.
- [`src/pages/index.astro`](../../src/pages/index.astro): Bloco `#planos`, grid 3x2 e lógica da calculadora de economia.
- [`src/pages/llms.txt.ts`](../../src/pages/llms.txt.ts): Tabela de preços e frases para mecanismos de IA e busca.
