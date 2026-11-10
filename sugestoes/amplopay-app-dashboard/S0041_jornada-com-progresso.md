# S0041 — "Jornada de conquistas" sem barra de progresso
- **Tela:** AmploPay › App › Dashboard · **Versão analisada:** produção (conta nova, 2026-11-10) · recriada em v1
- **Autor:** Claude Code (avaliação heurística) · **Data:** 2026-11-10
- **Origem:** print enviado pelo usuário (app.amplopay.com/panel/dashboard)
- **Severidade:** 1 de 4 · **Base:** H1 Visibilidade do status · efeito de gradiente de meta

## Sugestão
Mostrar uma barra de progresso até o próximo nível, com "R$ 0,00 de R$ 10.000,00" e "Faltam R$ 10.000,00"; a trilha completa dos níveis fica em "Saiba mais".

## Motivo
Gamificação motiva quando a pessoa vê o quanto falta; "Sem nível" e a meta sem barra não dão essa referência.

## Alternativas
- A. Barra de progresso com valor que falta (recomendada)
- B. Trilha com todos os níveis
- C. Esconder até o primeiro saque

Prós, contras e justificativa de cada uma: [docs/telas/amplopay-app-dashboard.md](../../docs/telas/amplopay-app-dashboard.md)

## A confirmar
O nome dos níveis e as metas de cada um.

## Referências
- Antes: [v1](../../mockups/amplopay-app-dashboard/v1/preview.png) · Depois (proposta): [v2](../../mockups/amplopay-app-dashboard/v2/preview.png) · [protótipo v2](../../prototipos/amplopay-app-dashboard/v2/index.html)
