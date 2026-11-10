# S0012 — Card "Lucro apurado" sem explicação do cálculo
- **Tela:** Nalapay › Backoffice › Dashboard Admin · **Versão analisada:** produção (como estava em 2026-11-10)
- **Autor:** Claude Code (avaliação heurística) · **Data:** 2026-11-10
- **Origem:** print enviado pelo usuário em 2026-11-10 (backoffice.nalapay.com.br, tema escuro)
- **Severidade:** 4 de 4 · **Base:** H1 Visibilidade do status · H10 Ajuda

## Sugestão
O card de lucro pode mostrar valor negativo sem dizer por quê. Mostrar a fórmula num tooltip (taxa cobrada − custo da adquirente) e um link para o detalhamento por adquirente.

## Motivo
Um número negativo sem contexto gera desconfiança e pergunta ao suporte; o administrador não sabe se é dado real ou erro.

## A confirmar
Confirmar com o time se o cálculo está correto no período em que o valor aparece negativo.

## Observação
Sem dados reais: nomes, valores e contas do print não foram copiados (repositório público).
