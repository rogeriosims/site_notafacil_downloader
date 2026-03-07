# Sistema de Design - Nota Fácil Downloader

Este documento define as diretrizes visuais, paleta de cores, tipografia e padrões de componentes utilizados na interface do **Nota Fácil Downloader**. O objetivo é manter uma experiência de usuário (UX) premium, limpa e profissional.

---

## 1. Princípios de Design
- **Clareza Contábil**: Informações críticas (créditos, erros, valores) devem ser o foco principal.
- **Estética "Enterprise-Grade"**: Uso de espaços em branco, sombras suaves e bordas arredondadas para transmitir segurança e robustez.
- **Feedback Visual**: Uso de micro-interações (hover, pulse) para guiar o usuário.

---

## 2. Paleta de Cores

### Cores Base
| Nome | Hex | Uso |
| :--- | :--- | :--- |
| **Slate 50** | `#F8FAFC` | Cor de fundo principal das páginas. |
| **Slate 800** | `#1E293B` | Texto principal e cabeçalhos. |
| **Slate 900** | `#0F172A` | Fundo do Menu Lateral (Sidebar). |
| **White** | `#FFFFFF` | Fundo de Cards e inputs. |

### Cores de Status e Ação
| Status | Cor | Hex | Significado |
| :--- | :--- | :--- | :--- |
| **Primária** | Blue 500 | `#3B82F6` | Botões principais, ícones de progresso saudável. |
| **Sucesso** | Emerald 500 | `#10B981` | Notas baixadas, sistema online. |
| **Aviso** | Orange 500 | `#F59E0B` | Créditos próximos ao fim, avisos preventivos. |
| **Erro** | Rose/Red 500 | `#EF4444` | Falhas de execução, limite excedido. |
| **Crítico** | Red 900 | `#7F1D1D` | Violações de licença ou erros bloqueantes. |

### Design Premium (Assinatura)
Para elementos exclusivos do plano pago, utiliza-se um gradiente linear:
- **De:** Indigo 600 (`#4F46E5`)
- **Para:** Violet 700 (`#6D28D9`)

---

## 3. Tipografia
O sistema utiliza a fonte padrão do sistema (Inter/Roboto) via NiceGUI/Tailwind:
- **Dashboard Titulo**: `text-3xl font-bold tracking-tight`
- **KPI Values**: `text-4xl font-black tracking-tight`
- **Labels de Categoria**: `text-[11px] font-bold uppercase tracking-[0.15em] opacity-80`
- **Sidebar**: `font-medium`

---

## 4. Componentes e Estilos

### Cards de KPI
- **Bordas**: `rounded-2xl` (16px)
- **Sombra**: `shadow-[0_8px_30px_rgb(0,0,0,0.04)]` (Sombra muito leve e difusa)
- **Efeito Hover**: `scale-[1.02]`, `transition-all duration-300`

### Sidebar (Painel Lateral)
- **Estilo**: Fixa na esquerda, fundo escuro (`bg-slate-900`).
- **Navegação**: Ícones Material Icons (`google-fonts`).
- **Hover Item**: `bg-slate-800` com texto branco.

### Botões
- **Primário**: `bg-blue-600` com texto branco.
- **Upgrade**: Texto em `orange-300` com animação suave.

---

## 5. Iconografia
- **Biblioteca**: [Material Icons](https://fonts.google.com/icons) (Google).
- **Padrão**: Ícones com `bg-colors` suaves (50/100) para cards normais e `backdrop-blur` para cards premium.

---
> **KISS**: O design deve ser mantido simples. Evitar o uso de mais de 3 cores diferentes em uma mesma tela para não sobrecarregar visualmente o usuário.
