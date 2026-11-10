# Nalapay › App › Visão geral — v2 (melhorada)
- **Data:** 2026-11-10
- **Sugestões atendidas (propostas, aguardando aprovação):**

| Sugestão | O que mudou |
|---|---|
| S0020 | Seletor de período no cabeçalho e o intervalo escrito no subtítulo |
| S0021 | Grade de até ~1220 px, com o gráfico ocupando cerca de 60% |
| S0022 | Selo "Meta do mês" completo, com barra; o clique abre o detalhe |
| S0023 | Selos Ativo, Não ativado e Em análise por meio de pagamento, e o botão "Ativar cartão" |
| S0024 | Transações com produto, cliente mascarado, horário, status com ícone, filtros e "Ver todas"; o clique abre o detalhe |
| S0025 | Título "Visão geral" e subtítulo com moeda e período |
| S0026 | "Sacar" em destaque e "Depositar" secundário (proposta, a confirmar) |
| S0014 / S0032 | Card de indicador padrão, com variação contra o período anterior (▲ ou ▼, cor e texto) |
| S0033 | ⓘ com a definição de cada indicador |
| S0017 | Gráfico com eixo Y, grade, legenda e tooltip por dia |

- **Também:** botão para ocultar os valores e "Posição atual" no saldo.
- **Protótipo:** [`prototipos/nalapay-app-dashboard/v2/`](../../../prototipos/nalapay-app-dashboard/v2/index.html). Ele simula:
  - o período (7, 30 ou 90 dias), com os indicadores e as variações recalculados;
  - o tooltip do gráfico;
  - os filtros das transações e a gaveta de detalhe;
  - o saque, com validação de saldo;
  - o depósito por Pix;
  - a ativação do cartão até ele ficar ativo;
  - a meta, o botão de ocultar valores, o tema escuro e o menu recolhível.
- **Gerador:** `node ../gerar-svg.js v2`
