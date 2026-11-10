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

> **S0006 a S0011** estão reservados para os ajustes propostos para a v2 de Finanças › Saques (contraste, ícones de status, botões desabilitados, ajuda no "Bloqueado", alinhamento de valores e filtros ativos). Eles serão criados quando a v2 for aprovada.

### Avaliação heurística das telas em produção (2026-11-10)
Severidade de 1 (cosmético) a 4 (atrapalha o uso ou a confiança). H1 a H10 são as heurísticas de Nielsen.

| ID | Tela | Título | Sev. | Versão | Situação |
|---|---|---|---|---|---|
| [S0012](nalapay-backoffice-dashboard/S0012_lucro-apurado-sem-explicacao.md) | Nalapay › Backoffice › Dashboard Admin | Card "Lucro apurado" sem explicação do cálculo | 4 | produção | aberta |
| [S0013](nalapay-backoffice-dashboard/S0013_agrupar-kpis.md) | Nalapay › Backoffice › Dashboard Admin | Agrupar os 11 cards de indicadores por assunto | 3 | produção | aberta |
| [S0014](nalapay-backoffice-dashboard/S0014_variacao-periodo-anterior.md) | Nalapay › Backoffice › Dashboard Admin | Mostrar a variação contra o período anterior | 3 | produção | aberta |
| [S0015](nalapay-backoffice-dashboard/S0015_contas-rentaveis-consistencia.md) | Nalapay › Backoffice › Dashboard Admin | Consistência dos dados em "Contas mais rentáveis" | 3 | produção | aberta |
| [S0016](nalapay-backoffice-dashboard/S0016_limite-chargeback.md) | Nalapay › Backoffice › Dashboard Admin | Sinalizar chargebacks e reembolsos perto do limite | 2 | produção | aberta |
| [S0017](nalapay-backoffice-dashboard/S0017_grafico-eixos-tooltip.md) | Nalapay › Backoffice › Dashboard Admin | Eixo Y e tooltip no "Histórico diário" | 2 | produção | aberta |
| [S0018](nalapay-backoffice-dashboard/S0018_texto-pequeno-contraste.md) | Nalapay › Backoffice › Dashboard Admin | Texto secundário pequeno e com pouco contraste no tema escuro | 2 | produção | aberta |
| [S0019](nalapay-backoffice-dashboard/S0019_badge-produtores.md) | Nalapay › Backoffice › Dashboard Admin | Explicar o número no menu "Produtores" | 1 | produção | aberta |
| [S0020](nalapay-app-dashboard/S0020_filtro-periodo.md) | Nalapay › App › Dashboard do lojista | Filtro de período no dashboard do lojista | 3 | produção | aberta |
| [S0021](nalapay-app-dashboard/S0021_largura-layout.md) | Nalapay › App › Dashboard do lojista | Aproveitar a largura da tela | 3 | produção | aberta |
| [S0022](nalapay-app-dashboard/S0022_meta-cortada.md) | Nalapay › App › Dashboard do lojista | Meta de faturamento cortada no topo | 3 | produção | aberta |
| [S0023](nalapay-app-dashboard/S0023_meio-inativo-cta.md) | Nalapay › App › Dashboard do lojista | Cartão e boleto sem transação: oferecer ativação | 2 | produção | aberta |
| [S0024](nalapay-app-dashboard/S0024_lista-transacoes-detalhe.md) | Nalapay › App › Dashboard do lojista | Mais contexto na lista de transações | 2 | produção | aberta |
| [S0025](nalapay-app-dashboard/S0025_titulo-pagina.md) | Nalapay › App › Dashboard do lojista | Título da página igual ao do backoffice | 2 | produção | aberta |
| [S0026](nalapay-app-dashboard/S0026_acao-principal.md) | Nalapay › App › Dashboard do lojista | Qual é a ação principal do lojista no dashboard | 1 | produção | aberta |
| [S0027](amplopay-site/S0027_numero-aprovacao-unico.md) | AmploPay › Site institucional | Um número só para a taxa de aprovação | 3 | produção | aberta |
| [S0028](amplopay-site/S0028_print-do-produto-real.md) | AmploPay › Site institucional | A imagem do painel no site deve corresponder ao produto | 3 | produção | aberta |
| [S0029](amplopay-site/S0029_nota-usdt.md) | AmploPay › Site institucional | Nota do asterisco em "USDT*" | 2 | produção | aberta |
| [S0030](amplopay-site/S0030_grafia-e-formato.md) | AmploPay › Site institucional | Grafia dos parceiros e formato de números | 1 | produção | aberta |
| [S0031](geral/S0031_design-system-multimarca.md) | Todas as superfícies | Um sistema de design com tema por marca | 3 | produção | aberta |
| [S0032](geral/S0032_card-kpi-padrao.md) | Todas as superfícies | Card de indicador padrão para app e backoffice | 2 | produção | aberta |
| [S0033](geral/S0033_glossario-metricas.md) | Todas as superfícies | Glossário de métricas dentro da interface | 2 | produção | aberta |
| [S0034](geral/S0034_padrao-periodo-moeda.md) | Todas as superfícies | Padrão único de período e moeda | 2 | produção | aberta |

**Correções de premissa:** [S0028-R1](amplopay-site/S0028-R1_premissa-corrigida.md) · [S0031-R1](geral/S0031-R1_premissa-corrigida.md). O painel AmploPay tem layout e identidade próprios, diferentes do app Nalapay.

**Propostas nas versões v2 (aguardando aprovação):** S0012–S0019 → [backoffice Nalapay v2](../mockups/nalapay-backoffice-dashboard/v2/NOTAS.md) · S0020–S0026 → [app Nalapay v2](../mockups/nalapay-app-dashboard/v2/NOTAS.md) · S0014, S0017 e S0032–S0034 aplicadas nas duas.

### Painel AmploPay, conta nova (2026-11-10)
| ID | Tela | Título | Sev. | Versão | Situação |
|---|---|---|---|---|---|
| [S0035](amplopay-app-dashboard/S0035_ativacao-com-etapas.md) | AmploPay › App › Dashboard | Faixa "Produtor não está ativo." sem motivo nem saída | 4 | v1 | proposta na v2 |
| [S0036](amplopay-app-dashboard/S0036_indique-e-ganhe-compacto.md) | AmploPay › App › Dashboard | Banner "Indique e ganhe" ocupa o topo de uma conta que nem foi ativada | 3 | v1 | proposta na v2 |
| [S0037](amplopay-app-dashboard/S0037_estado-vazio-com-acao.md) | AmploPay › App › Dashboard | Indicadores e gráfico zerados sem orientação | 3 | v1 | proposta na v2 |
| [S0038](amplopay-app-dashboard/S0038_formato-numerico-ptbr.md) | AmploPay › App › Dashboard | Percentuais com ponto ("0.00%") e moeda com vírgula | 2 | v1 | proposta na v2 |
| [S0039](amplopay-app-dashboard/S0039_setas-da-sidebar.md) | AmploPay › App › Dashboard | Setas da sidebar apontam para a esquerda nos itens fechados | 2 | v1 | proposta na v2 |
| [S0040](amplopay-app-dashboard/S0040_subtitulo-no-lugar-do-breadcrumb.md) | AmploPay › App › Dashboard | Breadcrumb "Principal / Dashboard" repete o título | 1 | v1 | proposta na v2 |
| [S0041](amplopay-app-dashboard/S0041_jornada-com-progresso.md) | AmploPay › App › Dashboard | "Jornada de conquistas" sem barra de progresso | 1 | v1 | proposta na v2 |

> O índice é a única parte que muda: só ganha linhas novas, e a coluna "Situação" é atualizada quando chega uma resposta. A fonte de verdade é sempre o arquivo da sugestão e o da resposta.
