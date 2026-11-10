# Tela: Nalapay › Backoffice › Dashboard Admin

- **Produto:** backoffice administrativo Nalapay (`backoffice.nalapay.com.br`), em tema escuro
- **Origem:** print enviado pelo usuário em 2026-11-10. **Todos os números, contas e nomes foram trocados por dados fictícios.** O print tinha dados reais da operação, e o repositório é público.
- **Método:** heurísticas de Nielsen (H1 a H10), WCAG 2.2 AA e boas práticas de dashboards financeiros e operacionais. Severidade de 1 a 4.
- **Sugestões de origem:** S0012 a S0019, desta tela, e S0033 e S0034, gerais.

## Versões
| Versão | Data | Mockup (Figma) | Protótipo | Notas |
|---|---|---|---|---|
| v1 · como está | 2026-11-10 | [SVG](../../mockups/nalapay-backoffice-dashboard/v1/nalapay-backoffice-dashboard.svg) · [prévia](../../mockups/nalapay-backoffice-dashboard/v1/preview.png) | — | [NOTAS](../../mockups/nalapay-backoffice-dashboard/v1/NOTAS.md) |
| v2 · melhorada | 2026-11-10 | [SVG](../../mockups/nalapay-backoffice-dashboard/v2/nalapay-backoffice-dashboard.svg) · [prévia](../../mockups/nalapay-backoffice-dashboard/v2/preview.png) | [abrir](../../prototipos/nalapay-backoffice-dashboard/v2/index.html) | [NOTAS](../../mockups/nalapay-backoffice-dashboard/v2/NOTAS.md) |

Comparação: [`comparacoes/v1-v2.html?tela=nalapay-backoffice-dashboard`](../../comparacoes/v1-v2.html?tela=nalapay-backoffice-dashboard)

## Contexto: quem usa e o que precisa
**Quem usa:** o administrador do gateway, ou seja, o time financeiro e de operações.

**As perguntas que ele traz ao abrir o painel:**
1. Estamos crescendo? (volume)
2. Estamos ganhando dinheiro? (resultado)
3. Tem risco? (reembolsos e chargebacks)
4. Quanto dinheiro está parado? (saldos)
5. Quais contas puxam o resultado para cima e quais puxam para baixo?

A v1 traz os 11 números, mas **sem ordem, sem comparação e sem explicação**. O único número negativo, o lucro, aparece sem nenhum contexto.

## Pontos de melhoria, alternativas e justificativas

### 1. "Lucro apurado" negativo sem explicação · S0012 · sev. 4
**Por que importa:**
- **H1** e **H10:** um lucro negativo é o dado mais importante da tela, e hoje aparece igual aos outros.
- O administrador não sabe **por que** está negativo, **quais contas** causam isso nem se o dado está certo.

| Alternativa | Prós | Contras |
|---|---|---|
| **A. Card com a fórmula visível, o alerta e o link "Ver detalhamento por conta"** (escolhida) | Explica o número na hora: taxa cobrada − custo da adquirente. O alerta aponta quantas contas dão prejuízo, e o detalhamento lista essas contas. | O card fica mais alto que os outros. |
| B. Tooltip ⓘ com a fórmula | Mantém os cards iguais. | A explicação fica escondida justamente no dado mais crítico. |
| C. Alerta fixo no topo da página quando o lucro ficar negativo | Máximo destaque. | Vira ruído se o negativo for esperado em algum período, como uma campanha. |

**Recomendação:** **A**, com **C** opcional depois que o time definir quando o negativo é anormal.

**No protótipo:** o detalhamento ordena as contas do menor para o maior lucro e destaca em vermelho as que têm custo maior que a taxa.

**A confirmar:** se o cálculo está certo nos períodos em que o valor fica negativo.

### 2. Onze cards sem hierarquia · S0013 · sev. 3
**Por que importa:**
- **H8** e a **lei da proximidade:** cards relacionados precisam estar juntos.
- Hoje, "Lucro" fica ao lado de "Novos produtores", e "Ticket médio" ao lado de "Custo da adquirente".

| Alternativa | Prós | Contras |
|---|---|---|
| **A. Quatro grupos com título: Volume, Resultado, Risco e Saldos** (escolhida) | Cada grupo responde uma pergunta. Saldos vai para a coluna lateral, porque não depende do período. | Mais altura total. |
| B. Abas (Visão geral, Financeiro, Risco) | Tela curta. | Esconde informação: o admin quer ver tudo de uma vez. |
| C. Três KPIs principais em destaque e o resto em "Mais indicadores" | Foco total. | Depende de escolher os "três principais", e isso é decisão do negócio. |

### 3. Sem comparação com o período anterior · S0014 · sev. 3
**O que muda:** um selo ▲/▼ com o percentual e o texto "vs. 30 dias anteriores".
- **Conversão:** a variação aparece em **p.p.**
- **Custo:** usa a lógica invertida, em que subir é ruim e fica vermelho.

**Alternativas avaliadas:**
- **B. minigráficos:** mais pesados no tema escuro.
- **C. meta por indicador:** exige configuração.

**Por que A:** é a leitura mais rápida e funciona com cor **e** texto (WCAG 1.4.1).

### 4. "Contas mais rentáveis" com dados estranhos · S0015 · sev. 3
**Por que importa:**
- **H2** (correspondência com o mundo real): nomes abreviados ("D.", "Ep") não identificam a conta.
- Uma conta com **0 cobranças e lucro positivo** parece erro.

| Alternativa | Prós | Contras |
|---|---|---|
| **A. Nome completo, ID, o clique abre o detalhe, e um ⚠ com nota quando houver lucro sem cobrança** (escolhida) | Identifica a conta e explica a anomalia sem esconder o dado. | Precisa saber a origem do lucro, como um ajuste ou taxa fixa. |
| B. Esconder contas com 0 cobranças do ranking | Ranking limpo. | Esconde exatamente o que precisa ser investigado. |
| C. Mostrar também as 5 **menos** rentáveis | Equilíbrio, porque mostra quem dá prejuízo. | Mais espaço. Hoje isso fica no detalhamento do lucro. |

**A confirmar:** quais origens de lucro existem além de cobrança. O protótipo usa "ajuste manual de tarifa" como exemplo fictício.

### 5. Chargebacks e reembolsos sem referência de limite · S0016 · sev. 2
**Por que importa:**
- **H1** e **H5:** "0,01%" sozinho não diz se é bom ou ruim.
- Os programas de monitoramento das bandeiras têm limites, e passar deles gera multa [A CONFIRMAR: o limite que a operação usa].

| Alternativa | Prós | Contras |
|---|---|---|
| **A. Barra até o limite de referência, marca de atenção e selo "Dentro do limite" ou "Atenção"** (escolhida) | Leitura imediata do risco. O selo usa ícone e texto, não só cor. | O limite precisa ser configurável. |
| B. Só mudar a cor do valor | Simples. | Depende só da cor (WCAG 1.4.1). |
| C. Alerta por e-mail ao passar do limite | Proativo. | Não substitui a leitura na tela. Complementa. |

**No protótipo:** limite de 1,00% e atenção a partir de 0,75%, ambos **valores de exemplo**.

### 6. Gráfico sem eixo nem tooltip · S0017 · sev. 2
**O que muda:**
- eixo Y em moeda;
- linhas de grade;
- datas;
- tooltip com o dia, o valor, as vendas e a conversão;
- o marcador "hoje (parcial)", que já existia e foi mantido;
- seletor de **métrica** (volume, vendas, conversão).

**Alternativa considerada:** gráfico empilhado Pix + Cartão. Ele fica para quando o cartão tiver volume [ideia para a v3].

### 7. Texto pequeno e com pouco contraste · S0018 · sev. 2
**Por que importa:** **WCAG 1.4.3** (contraste de 4,5:1) e **1.4.4** (redimensionar texto). Os textos de apoio tinham cerca de 7 px a 10 px em cinza escuro sobre preto.

| Alternativa | Prós | Contras |
|---|---|---|
| **A. Mínimo de 12 px no conteúdo e 10,5 px nos rótulos de apoio, com cinza `#A1A1AA` sobre `#141417` (cerca de 7:1)** (escolhida) | Legível e acessível. | A tela fica mais alta. |
| B. Mesmo tamanho, só clarear o cinza | Menos mudança de layout. | O tamanho continua pequeno demais. |
| C. Oferecer tema claro | Contraste fácil. | Não resolve o tema escuro. No protótipo, os dois temas existem. |

### 8. Badge "29" sem significado · S0019 · sev. 1
**O que muda:** o badge vira "● 29 aguardando aprovação", embaixo de "Produtores".

**Alternativas:**
- tooltip no número;
- deixar só o número com rótulo acessível.

**Por que A:** o texto visível ajuda quem não passa o mouse por cima.

**A confirmar:** o que o número conta.

### 9. Moeda e período (S0034) e glossário (S0033)
- **Moeda:** um controle segmentado BRL, MXN e COP. A v1 tinha só BRL e MXN, e o COP aparece no app dos lojistas.
- **Período:** um seletor de período. No subtítulo, o intervalo e a base de comparação.
- **Glossário:** um card "Glossário de métricas" e um ⓘ em cada indicador.

### 10. Avisos
O card "Avisos" mostrava só "Nenhum aviso cadastrado.". Agora explica o que é um aviso ("os lojistas veem no topo do painel") e tem a ação "+ Publicar aviso".
- **H10:** o estado vazio ensina.
- **H7:** a ação fica no mesmo lugar.

## O que não mudou e por quê
- **O tema escuro, o verde de destaque e a estrutura da sidebar** continuam (lei de Jakob).
- **Os mesmos 11 indicadores** continuam. Nenhum foi removido, só reorganizado.

## Como medir se melhorou
[A CONFIRMAR]
- Tempo para responder "por que o lucro caiu?".
- Uso do detalhamento por conta.
- Contas com prejuízo identificadas por semana.
