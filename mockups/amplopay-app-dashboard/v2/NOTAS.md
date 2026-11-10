# AmploPay › App › Dashboard — v2 (melhorada)
- **Data:** 2026-11-10
- **Sugestões atendidas (propostas, aguardando aprovação):**

| Sugestão | O que mudou |
|---|---|
| S0035 | A faixa vermelha virou o card "Ative sua conta" com 4 etapas, barra de progresso, "Continuar ativação" e "Falar com o suporte". |
| S0036 | O banner "Indique e ganhe" virou um card compacto na coluna direita, que pode ser fechado, com texto real em vez de imagem. |
| S0037 | O gráfico zerado deu lugar a um estado vazio com "Criar primeiro produto", "Conectar checkout" e o guia de primeiros passos. Os indicadores ganharam "Sem vendas no período". |
| S0038 | Os percentuais passaram para o formato pt-BR ("0,00%"). |
| S0039 | As setas da sidebar apontam para a direita e giram para baixo ao abrir. |
| S0040 | O breadcrumb deu lugar ao subtítulo "Resumo das suas vendas nos últimos 7 dias.", que acompanha o período escolhido. |
| S0041 | A jornada de conquistas ganhou barra de progresso e "Faltam R$ 10.000,00". |

- **Também:**
  - Os métodos de pagamento mostram o selo "Após a ativação" (ou "Ativo").
  - Cada indicador tem um ⓘ com a definição.
  - O filtro de período ficou maior, com seta.
- **A confirmar:**
  - as etapas reais da ativação;
  - o prazo da análise;
  - o nome dos níveis da jornada.
- **Protótipo:** [`prototipos/amplopay-app-dashboard/v2/`](../../../prototipos/amplopay-app-dashboard/v2/index.html). Ele simula as quatro etapas da ativação até a conta ativa, a troca de período, o fechamento do card de indicação, o link de indicação, o guia, o submenu e o tema escuro.
- **Gerador:** `node ../gerar-svg.js v2`
