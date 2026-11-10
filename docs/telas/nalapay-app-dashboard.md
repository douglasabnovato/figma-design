# Tela: Nalapay › App › Visão geral (dashboard do lojista)

- **Produto:** painel do lojista Nalapay (`app.nalapay.com.br`)
- **Origem:** print enviado pelo usuário em 2026-11-10. Todos os valores, nomes e e-mails foram trocados por dados fictícios.
- **Método:** heurísticas de Nielsen (H1 a H10), WCAG 2.2 AA, leis de UX e boas práticas de dashboards financeiros. Severidade de 1 a 4.
- **Sugestões de origem:** S0020 a S0026, específicas desta tela, e S0014, S0017, S0032 e S0033, aplicadas daqui.

## Versões
| Versão | Data | Mockup (Figma) | Protótipo | Notas |
|---|---|---|---|---|
| v1 · como está | 2026-11-10 | [SVG](../../mockups/nalapay-app-dashboard/v1/nalapay-app-dashboard.svg) · [prévia](../../mockups/nalapay-app-dashboard/v1/preview.png) | — | [NOTAS](../../mockups/nalapay-app-dashboard/v1/NOTAS.md) |
| v2 · melhorada | 2026-11-10 | [SVG](../../mockups/nalapay-app-dashboard/v2/nalapay-app-dashboard.svg) · [prévia](../../mockups/nalapay-app-dashboard/v2/preview.png) | [abrir](../../prototipos/nalapay-app-dashboard/v2/index.html) | [NOTAS](../../mockups/nalapay-app-dashboard/v2/NOTAS.md) |

Comparação: [`comparacoes/v1-v2.html?tela=nalapay-app-dashboard`](../../comparacoes/v1-v2.html?tela=nalapay-app-dashboard)

## Contexto: quem usa e o que precisa
**Quem usa:** o lojista que já vende.

**As três perguntas que ele traz ao abrir o painel:**
1. Quanto vendi e se estou melhor ou pior que antes.
2. Quanto posso sacar.
3. Se tem algo errado: venda recusada, meio de pagamento parado.

A v1 responde só a primeira, e pela metade. Mostra os números, mas sem período e sem comparação.

## Pontos de melhoria, alternativas e justificativas

### 1. Sem filtro de período · S0020 · sev. 3
**Por que importa:**
- **H1** (visibilidade do status): "Aprovado R$ 248 mil" não diz se é do dia, do mês ou de sempre.
- **H4:** o backoffice tem seletor de período e o app não, e o mesmo dado parece diferente nos dois painéis.

| Alternativa | Prós | Contras |
|---|---|---|
| **A. Seletor de período no cabeçalho, com o intervalo escrito no subtítulo** (escolhida) | Padrão de mercado; o subtítulo ("11/10/2026 a 10/11/2026") tira qualquer dúvida. | Mais um controle no topo. |
| B. Abas rápidas (Hoje · 7 dias · 30 dias · Mês) | Um clique para trocar; ótimo no celular. | Não cobre intervalo personalizado. |
| C. Período fixo de "mês atual", com o rótulo no card | Zero controles. | No início do mês os números ficam quase zerados e parecem queda. |

**Recomendação:** **A.** No celular, A vira B.

### 2. Conteúdo estreito numa tela larga · S0021 · sev. 3
**Por que importa:**
- **Densidade de informação:** a coluna de cerca de 740 px no centro deixa mais de 50% da tela vazia em monitores comuns de 1440 px ou mais.
- Ela também espreme o gráfico, que é o bloco que mais precisa de largura.

| Alternativa | Prós | Contras |
|---|---|---|
| **A. Grade de até ~1220 px, com o gráfico ocupando cerca de 60%** (escolhida) | Usa a tela sem esticar demais as linhas de texto. | Em monitores muito largos ainda sobra borda, o que é intencional. |
| B. Layout 100% fluido | Usa toda a tela. | Linhas longas demais e cards esticados em monitores ultralargos. |
| C. Manter 740 px e reorganizar em coluna única | Leitura linear. | Muito scroll, e o gráfico continua pequeno. |

### 3. Meta cortada no topo · S0022 · sev. 3
**Por que importa:**
- **H8:** um elemento cortado ("248K / 1…") parece defeito.
- **H1:** a meta é um dado motivador, mas hoje não dá para ler.

| Alternativa | Prós | Contras |
|---|---|---|
| **A. Selo "Meta do mês" no topo, com texto completo e barra, que abre o detalhe ao clicar** (escolhida) | Lido em qualquer tela; um clique abre o contexto. | Ocupa cerca de 220 px do topo. |
| B. Card "Meta" junto dos indicadores | Mais destaque. | Disputa espaço com os KPIs principais. |
| C. Só um ícone de troféu com tooltip | Mínimo. | A informação fica escondida. |

**No celular:** o rótulo some e fica só o valor com a barra.

### 4. Cartão e boleto com "—" e "Nenhuma transação registrada" · S0023 · sev. 2
**Por que importa:**
- **H10:** o estado vazio não diz se o meio de pagamento está **desativado** ou só **sem vendas**.
- Também perde a chance de oferecer o cartão, que o site promete em D+2.

| Alternativa | Prós | Contras |
|---|---|---|
| **A. Selos de estado (Ativo, Não ativado, Em análise) e o botão "Ativar cartão" quando ele não estiver ativo** (escolhida) | Diferencia os estados, e a oferta aparece no momento certo. | Precisa do estado real de cada meio vindo da API. |
| B. Esconder os meios não ativados | Tela mais limpa. | O lojista nem descobre que pode ativar. |
| C. Banner de venda cruzada ("Venda também no cartão") | Mais chamativo. | Parece propaganda e se repete. |

**No protótipo:** "Ativar cartão" passa por "Em análise" e depois fica "Ativo".

### 5. Transações sem contexto · S0024 · sev. 2
**Por que importa:**
- **H6** (reconhecer em vez de lembrar): todas as linhas dizem "Venda no Pix".
- O lojista não sabe **o que** vendeu, **para quem** nem **se deu certo**.

| Alternativa | Prós | Contras |
|---|---|---|
| **A. Produto, cliente mascarado, método, horário, valor, status com ícone, filtros rápidos e "Ver todas"** (escolhida) | Responde as três perguntas na própria lista; o clique abre o detalhe. | Linha mais alta. |
| B. Tabela compacta com colunas | Mais itens visíveis. | Ruim em largura estreita. |
| C. Agrupar por produto ("Curso X · 12 vendas hoje") | Visão de resumo. | Perde a venda individual, que é o que o lojista procura quando um cliente reclama. |

**Privacidade:** o cliente aparece mascarado ("Mariana C."), conforme a LGPD e o princípio da minimização.

### 6. Sem título na página · S0025 · sev. 2
**Por que importa:**
- **H4:** o backoffice tem título e subtítulo, e o app tem só "Resumo (BRL)".
- Um título claro também ajuda o leitor de tela (WCAG 2.4.6, cabeçalhos e rótulos).

| Alternativa | Prós | Contras |
|---|---|---|
| **A. "Visão geral" + subtítulo com moeda e período** (escolhida) | É igual ao item do breadcrumb e informa o período. | — |
| B. "Dashboard" | Igual ao menu lateral. | "Visão geral" já aparece no breadcrumb, e usar dois nomes confunde. |
| C. Saudação ("Olá, Loja Exemplo") | Mais caloroso. | Não informa nada. |

### 7. Qual é a ação principal · S0026 · sev. 1 · [A CONFIRMAR]
**Por que importa:**
- **H7** (eficiência): a ação mais frequente deve ter o destaque.
- Para o lojista, sacar costuma ser mais frequente que depositar [HIPÓTESE].

| Alternativa | Prós | Contras |
|---|---|---|
| **A. "Sacar" em destaque e "Depositar" como secundário** (escolhida, como proposta) | Segue a hipótese de uso. | Precisa ser confirmado com dados de uso. |
| B. Os dois com o mesmo peso | Neutro. | Nada ganha destaque. |
| C. Ações dentro do card "Saldo disponível" | Fica perto do dado a que se referem. | Menos visíveis. |

### 8. Indicadores sem comparação nem definição · S0014, S0032, S0033 · sev. 3
**O que muda:** cada card ganha a **variação contra o período anterior**, com ▲ ou ▼, cor **e** texto, como pede a WCAG 1.4.1, e um **ⓘ com a definição**. O "Saldo disponível" leva o selo "Posição atual", porque não depende do período.

| Alternativa | Prós | Contras |
|---|---|---|
| **A. Selo de variação + "vs. 30 dias anteriores"** (escolhida) | Leitura imediata do desempenho. | Precisa de cálculo do período anterior. |
| B. Minigráfico (sparkline) em cada card | Mostra a tendência. | Mais pesado visualmente; difícil de ler em números pequenos. |
| C. Meta por indicador | Orienta para um objetivo. | Exige configuração pelo lojista. |

**Conversão:** a variação aparece em **p.p.** (pontos percentuais), e não em %, para não confundir.

### 9. Gráfico sem eixo nem valor por dia · S0017, aplicada aqui · sev. 2
**O que muda:**
- eixo Y em "R$ mil";
- linhas de grade;
- datas a cada 4 dias;
- **tooltip** com o dia da semana, o valor e o número de vendas;
- legenda.

**Alternativa considerada:** barras por dia. Elas mostram melhor os valores individuais, mas a curva mostra melhor a **tendência**, que é a pergunta principal. Barras ficam como opção para o período de 7 dias [ideia para a v3].

## O que não mudou e por quê
- **A sidebar e a identidade** continuam iguais (lei de Jakob, familiaridade).
- **Os cinco indicadores** continuam na mesma ordem.
- **O verde Nalapay** continua como cor de destaque, sempre acompanhado de ícone ou texto.

## Como medir se melhorou
[A CONFIRMAR: se o produto mede isso]
- Ativações de cartão vindas do dashboard.
- Cliques em "Ver todas" e nas transações.
- Chamados ao suporte com o tema "não sei de que período é esse valor".
