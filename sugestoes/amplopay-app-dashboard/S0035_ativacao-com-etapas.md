# S0035 — Faixa "Produtor não está ativo." sem motivo nem saída
- **Tela:** AmploPay › App › Dashboard · **Versão analisada:** produção (conta nova, 2026-11-10) · recriada em v1
- **Autor:** Claude Code (avaliação heurística) · **Data:** 2026-11-10
- **Origem:** print enviado pelo usuário (app.amplopay.com/panel/dashboard)
- **Severidade:** 4 de 4 · **Base:** H9 Recuperar de erros · H1 Visibilidade do status

## Sugestão
Trocar a faixa vermelha por um card de ativação com etapas, barra de progresso e o botão "Continuar ativação"; nas outras telas, uma faixa âmbar fina com o link.

## Motivo
A mensagem atual não diz o motivo, o que fazer nem quanto falta, e o vermelho comunica erro grave numa conta que só está incompleta.

## Alternativas
- A. Card de ativação com etapas no dashboard (recomendada)
- B. Faixa âmbar fina com link para um assistente
- C. Assistente em tela cheia no primeiro acesso

Prós, contras e justificativa de cada uma: [docs/telas/amplopay-app-dashboard.md](../../docs/telas/amplopay-app-dashboard.md)

## A confirmar
Quais são as etapas reais e o prazo da análise.

## Referências
- Antes: [v1](../../mockups/amplopay-app-dashboard/v1/preview.png) · Depois (proposta): [v2](../../mockups/amplopay-app-dashboard/v2/preview.png) · [protótipo v2](../../prototipos/amplopay-app-dashboard/v2/index.html)
