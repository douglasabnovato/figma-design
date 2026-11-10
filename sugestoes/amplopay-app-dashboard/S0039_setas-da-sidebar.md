# S0039 — Setas da sidebar apontam para a esquerda nos itens fechados
- **Tela:** AmploPay › App › Dashboard · **Versão analisada:** produção (conta nova, 2026-11-10) · recriada em v1
- **Autor:** Claude Code (avaliação heurística) · **Data:** 2026-11-10
- **Origem:** print enviado pelo usuário (app.amplopay.com/panel/dashboard)
- **Severidade:** 2 de 4 · **Base:** H4 Consistência · convenção de interface

## Sugestão
Seta para a direita no item fechado, girando para baixo ao abrir o submenu.

## Motivo
Seta para a esquerda costuma significar "voltar" ou "recolher"; a convenção para abrir submenu é direita → baixo.

## Alternativas
- A. Direita → baixo com animação de giro (recomendada)
- B. Sinais + e −
- C. Sem seta, submenu flutuante ao passar o mouse (ruim no toque e no teclado)

Prós, contras e justificativa de cada uma: [docs/telas/amplopay-app-dashboard.md](../../docs/telas/amplopay-app-dashboard.md)

## Referências
- Antes: [v1](../../mockups/amplopay-app-dashboard/v1/preview.png) · Depois (proposta): [v2](../../mockups/amplopay-app-dashboard/v2/preview.png) · [protótipo v2](../../prototipos/amplopay-app-dashboard/v2/index.html)
