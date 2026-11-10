# S0038 — Percentuais com ponto ("0.00%") e moeda com vírgula
- **Tela:** AmploPay › App › Dashboard · **Versão analisada:** produção (conta nova, 2026-11-10) · recriada em v1
- **Autor:** Claude Code (avaliação heurística) · **Data:** 2026-11-10
- **Origem:** print enviado pelo usuário (app.amplopay.com/panel/dashboard)
- **Severidade:** 2 de 4 · **Base:** H4 Consistência e padrões

## Sugestão
Usar um formatador único (Intl.NumberFormat) com o idioma da conta para moeda, número e percentual.

## Motivo
O separador decimal no Brasil é a vírgula; a mistura parece descuido e se repete em telas novas se for corrigida campo a campo.

## Alternativas
- A. Formatador único pelo idioma da conta (recomendada)
- B. Corrigir campo a campo
- C. Formatar pelo idioma do navegador

Prós, contras e justificativa de cada uma: [docs/telas/amplopay-app-dashboard.md](../../docs/telas/amplopay-app-dashboard.md)

## Referências
- Antes: [v1](../../mockups/amplopay-app-dashboard/v1/preview.png) · Depois (proposta): [v2](../../mockups/amplopay-app-dashboard/v2/preview.png) · [protótipo v2](../../prototipos/amplopay-app-dashboard/v2/index.html)
