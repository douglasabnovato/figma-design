# S0037 — Indicadores e gráfico zerados sem orientação
- **Tela:** AmploPay › App › Dashboard · **Versão analisada:** produção (conta nova, 2026-11-10) · recriada em v1
- **Autor:** Claude Code (avaliação heurística) · **Data:** 2026-11-10
- **Origem:** print enviado pelo usuário (app.amplopay.com/panel/dashboard)
- **Severidade:** 3 de 4 · **Base:** H10 Ajuda · H8 Estética minimalista

## Sugestão
Mostrar um estado vazio com o próximo passo ("Criar primeiro produto", "Conectar checkout", guia) e, nos indicadores, "Sem vendas no período".

## Motivo
Um gráfico em linha reta no zero ocupa espaço sem informar e pode parecer erro; o estado vazio é o melhor lugar para ensinar a começar.

## Alternativas
- A. Estado vazio com chamada para ação (recomendada)
- B. Dados de exemplo com selo "Exemplo" (arriscado em produto financeiro)
- C. Esconder os blocos sem dados até a primeira venda

Prós, contras e justificativa de cada uma: [docs/telas/amplopay-app-dashboard.md](../../docs/telas/amplopay-app-dashboard.md)

## Referências
- Antes: [v1](../../mockups/amplopay-app-dashboard/v1/preview.png) · Depois (proposta): [v2](../../mockups/amplopay-app-dashboard/v2/preview.png) · [protótipo v2](../../prototipos/amplopay-app-dashboard/v2/index.html)
