# S0023 — Cartão e boleto sem transação: oferecer ativação
- **Tela:** Nalapay › App › Dashboard do lojista · **Versão analisada:** produção (como estava em 2026-11-10)
- **Autor:** Claude Code (avaliação heurística) · **Data:** 2026-11-10
- **Origem:** print enviado pelo usuário em 2026-11-10 (app.nalapay.com.br, tema claro)
- **Severidade:** 2 de 4 · **Base:** H10 Ajuda · conversão

## Sugestão
Quando o meio de pagamento não estiver ativo, trocar "—" e "Nenhuma transação registrada" por uma chamada para ativar (ex.: "Ativar cartão — receba em D+2").

## Motivo
O estado vazio hoje não ajuda o lojista a fazer nada.

## A confirmar
Confirmar se o meio está inativo ou só sem vendas; os dois estados devem ter textos diferentes.

## Observação
Sem dados reais: nomes, valores e contas do print não foram copiados (repositório público).
