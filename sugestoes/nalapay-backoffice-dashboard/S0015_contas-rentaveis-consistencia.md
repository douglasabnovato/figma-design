# S0015 — Consistência dos dados em "Contas mais rentáveis"
- **Tela:** Nalapay › Backoffice › Dashboard Admin · **Versão analisada:** produção (como estava em 2026-11-10)
- **Autor:** Claude Code (avaliação heurística) · **Data:** 2026-11-10
- **Origem:** print enviado pelo usuário em 2026-11-10 (backoffice.nalapay.com.br, tema escuro)
- **Severidade:** 3 de 4 · **Base:** H2 Correspondência com o mundo real

## Sugestão
Mostrar o nome completo (ou razão social) e um link para a conta. Revisar contas que aparecem com zero cobranças e lucro positivo no mesmo período.

## Motivo
Nomes abreviados dificultam identificar a conta; lucro sem cobrança parece erro de dado.

## A confirmar
Confirmar se o lucro de uma conta sem cobranças no período vem de outra origem (ajuste, taxa fixa) e, se vier, dizer isso na tela.

## Observação
Sem dados reais: nomes, valores e contas do print não foram copiados (repositório público).
