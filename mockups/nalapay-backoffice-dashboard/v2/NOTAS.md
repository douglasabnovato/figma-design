# Nalapay › Backoffice › Dashboard Admin — v2 (melhorada)
- **Data:** 2026-11-10
- **Sugestões atendidas (propostas, aguardando aprovação):**

| Sugestão | O que mudou |
|---|---|
| S0012 | Lucro apurado com a fórmula visível, o alerta "3 contas com custo maior que a taxa" e "Ver detalhamento por conta" |
| S0013 | Grupos Volume, Resultado e Risco, e Saldos na coluna lateral ("posição atual · não depende do período") |
| S0014 | Variação contra o período anterior em todos os indicadores (▲/▼, cor e texto; p.p. na conversão; lógica invertida no custo) |
| S0015 | Ranking com nome completo e ID, ⚠ e nota quando há lucro sem cobrança; o clique abre o detalhe |
| S0016 | Reembolsos e chargebacks com barra até o limite de referência, marca de atenção e selo de status (limites de exemplo) |
| S0017 | Gráfico com eixo Y, grade, datas, tooltip, "hoje (parcial)" e seletor de métrica |
| S0018 | Conteúdo com no mínimo 12 px e cinza `#A1A1AA` sobre `#141417` (cerca de 7:1) |
| S0019 | "29 aguardando aprovação" escrito embaixo de "Produtores" |
| S0033 | ⓘ em cada indicador e o card "Glossário de métricas" |
| S0034 | Moeda (BRL, MXN e COP) e período no cabeçalho, com o intervalo no subtítulo |

- **Também:**
  - O card "Avisos aos lojistas" explica para que serve e tem "+ Publicar aviso".
  - O cabeçalho ganhou os botões "Exportar" e "Ocultar valores".
- **Protótipo:** [`prototipos/nalapay-backoffice-dashboard/v2/`](../../../prototipos/nalapay-backoffice-dashboard/v2/index.html). Ele simula:
  - a moeda e o período, com tudo recalculado;
  - o detalhamento do lucro por conta;
  - o detalhe da conta com a anomalia;
  - o tooltip e a troca de métrica do gráfico;
  - a publicação de aviso;
  - o glossário, o botão de ocultar valores, o tema claro e escuro e o menu recolhível.
- **Gerador:** `node ../gerar-svg.js v2`
