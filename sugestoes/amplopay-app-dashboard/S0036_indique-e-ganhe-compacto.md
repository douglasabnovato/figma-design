# S0036 — Banner "Indique e ganhe" ocupa o topo de uma conta que nem foi ativada
- **Tela:** AmploPay › App › Dashboard · **Versão analisada:** produção (conta nova, 2026-11-10) · recriada em v1
- **Autor:** Claude Code (avaliação heurística) · **Data:** 2026-11-10
- **Origem:** print enviado pelo usuário (app.amplopay.com/panel/dashboard)
- **Severidade:** 3 de 4 · **Base:** H8 Estética minimalista · WCAG 1.1.1 Conteúdo não textual

## Sugestão
Trocar o banner por um card compacto e dispensável na coluna direita, com texto real; dar destaque maior depois da primeira venda.

## Motivo
A promoção disputa a atenção com a tarefa principal (ativar), o pedido de indicação chega cedo demais e o texto dentro da imagem não é lido por leitor de tela nem no celular.

## Alternativas
- A. Card compacto e dispensável na coluna direita (recomendada)
- B. Mostrar só depois da primeira venda
- C. Faixa fina dispensável acima dos indicadores

Prós, contras e justificativa de cada uma: [docs/telas/amplopay-app-dashboard.md](../../docs/telas/amplopay-app-dashboard.md)

## Referências
- Antes: [v1](../../mockups/amplopay-app-dashboard/v1/preview.png) · Depois (proposta): [v2](../../mockups/amplopay-app-dashboard/v2/preview.png) · [protótipo v2](../../prototipos/amplopay-app-dashboard/v2/index.html)
