# Sugestões: base de referências

Toda sugestão feita sobre uma tela fica guardada aqui **para sempre**. Nada é apagado nem reescrito de uma versão para outra. Assim a equipe constrói um histórico do que foi pedido, decidido e aprendido.

## Regras
1. **Uma sugestão = um arquivo novo:** `sugestoes/<tela>/S<NNNN>_<slug>.md`. A numeração é única no repositório inteiro.
2. **O arquivo de uma sugestão nunca é editado nem apagado.**
3. **A resposta também é um arquivo novo**, ao lado da sugestão: `S<NNNN>-R<N>_<slug>.md`, com a decisão (aceita, recusada, adiada ou em discussão), o motivo e a versão da tela que atendeu.
4. Sugestões que valem para várias telas, como regras de design ou textos padrão, ficam em `sugestoes/geral/`.
5. Quem sugere pode ser qualquer pessoa: o revisor pode abrir um PR, abrir uma Issue ou comentar, e o arquivo é criado a partir disso.

## Modelo de sugestão
```markdown
# S<NNNN> — <título curto>
- **Tela:** <tela> · **Versão analisada:** v<N>
- **Autor:** <nome ou papel> · **Data:** AAAA-MM-DD
- **Origem:** PR #<n> / Issue #<n> / reunião / Figma

## Sugestão
<o que mudar>

## Motivo
<por que mudar>

## Referências
<prints, links, outras telas>
```

## Modelo de resposta
```markdown
# S<NNNN>-R<N> — <decisão>
- **Data:** AAAA-MM-DD · **Quem decidiu:** <nome ou papel>
- **Decisão:** aceita | recusada | adiada | em discussão
- **Atendida em:** <tela> v<N> (se aceita)

## Motivo
<por quê>
```

## Índice
| ID | Tela | Título | Versão | Situação |
|---|---|---|---|---|
| [S0001](financas-saques/S0001_alerta-e-aviso-repetidos.md) | Finanças › Saques | Alerta do topo e aviso no card repetem a informação | v1 | aberta |
| [S0002](financas-saques/S0002_colapsar-moedas-sem-saldo.md) | Finanças › Saques | Colapsar cards de moedas sem saldo | v1 | aberta |
| [S0003](financas-saques/S0003_taxa-como-tooltip.md) | Finanças › Saques | Coluna "Taxa" virar tooltip no total | v1 | aberta |
| [S0004](financas-saques/S0004_contador-transferencias.md) | Finanças › Saques | Contador na aba Transferências internas | v1 | aberta |
| [S0005](financas-saques/S0005_saque-recusado-devolve-saldo.md) | Finanças › Saques | Confirmar se saque recusado devolve valor e taxa | v1 | aberta |

> O índice é a única parte que muda: só ganha linhas novas, e a coluna "Situação" é atualizada quando chega uma resposta. A fonte de verdade é sempre o arquivo da sugestão e o da resposta.
