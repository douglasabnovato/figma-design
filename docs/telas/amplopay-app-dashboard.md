# Tela: AmploPay › App › Dashboard (conta nova, ainda não ativada)

- **Produto:** painel do produtor AmploPay (`app.amplopay.com/panel/dashboard`)
- **Origem:** print enviado pelo usuário em 2026-11-10, de uma conta criada para estudo. Os dados do print foram trocados por dados fictícios.
- **Método:** heurísticas de Nielsen (H1 a H10), WCAG 2.2 AA e leis de UX. Severidade de 1 (cosmético) a 4 (impede o uso ou abala a confiança).

## Versões
| Versão | Data | Mockup (Figma) | Protótipo | Notas | Sugestões atendidas |
|---|---|---|---|---|---|
| v1 · como está | 2026-11-10 | [SVG](../../mockups/amplopay-app-dashboard/v1/amplopay-app-dashboard.svg) · [prévia](../../mockups/amplopay-app-dashboard/v1/preview.png) | — | [NOTAS](../../mockups/amplopay-app-dashboard/v1/NOTAS.md) | — |
| v2 · melhorada | 2026-11-10 | [SVG](../../mockups/amplopay-app-dashboard/v2/amplopay-app-dashboard.svg) · [prévia](../../mockups/amplopay-app-dashboard/v2/preview.png) | [abrir](../../prototipos/amplopay-app-dashboard/v2/index.html) | [NOTAS](../../mockups/amplopay-app-dashboard/v2/NOTAS.md) | S0035–S0041 (propostas, aguardando aprovação) |

Comparação: [`comparacoes/v1-v2.html?tela=amplopay-app-dashboard`](../../comparacoes/v1-v2.html?tela=amplopay-app-dashboard)

## Contexto: quem usa e o que precisa
**Quem usa:** uma pessoa que acabou de criar a conta, ainda **não ativada**.

**O que precisa nesse momento:**
1. Entender por que não pode vender.
2. Saber o que falta e quanto tempo leva.
3. Concluir a ativação.

O dashboard de hoje é feito para quem **já vende**. Por isso mostra números zerados e uma promoção, e não ajuda a pessoa a dar o primeiro passo. A maior parte das sugestões abaixo vem dessa diferença.

## Pontos de melhoria, alternativas e justificativas

### 1. Faixa "Produtor não está ativo." · S0035 · sev. 4
**O que se vê:**
- Uma faixa vermelha no topo, com um texto sublinhado que parece link.
- Ela não diz **por que** a conta está inativa, **o que fazer** nem **quanto falta**.

**Por que importa:**
- **H9** (ajudar a reconhecer e se recuperar de erros): a mensagem precisa dizer o problema e a saída.
- **H1** (visibilidade do status): a pessoa não sabe em que etapa está.
- O vermelho comunica erro grave, mas a conta não está com problema. Está só incompleta, e isso gera ansiedade sem necessidade.

| Alternativa | Como fica | Prós | Contras |
|---|---|---|---|
| **A. Card de ativação com etapas** (escolhida na v2) | Card no topo com título, etapas numeradas, barra de progresso, botão "Continuar ativação" e "Falar com o suporte". | Diz o que falta, mostra o progresso (efeito de progresso dotado: quem vê que já começou tende a terminar) e leva direto à próxima etapa. | Ocupa mais altura no topo. Some depois da ativação. |
| B. Faixa fina com link para um assistente | A faixa continua, mas em âmbar, com o texto "Faltam 3 etapas para ativar sua conta · Continuar". | Ocupa pouco espaço e serve para todas as telas, não só o dashboard. | Pouco detalhe; o progresso fica escondido no assistente. |
| C. Assistente em tela cheia no primeiro acesso | Ao entrar, a pessoa vai direto para um passo a passo; o dashboard aparece depois. | Foco total; a taxa de conclusão costuma ser maior. | Bloqueia quem só quer conhecer o painel; parece obrigatório demais. |

**Recomendação:** **A no dashboard + B nas outras telas.** O card resolve onde a pessoa mais olha, e a faixa âmbar lembra da ativação nas outras páginas sem assustar.

**A confirmar:**
- quais são as etapas reais da ativação;
- o prazo da análise.

O protótipo usa quatro etapas de exemplo.

### 2. Banner "Indique e ganhe" no topo · S0036 · sev. 3
**O que se vê:**
- Um banner grande, com foto, ocupando a primeira dobra antes do dashboard.
- O texto está **dentro da imagem**.

**Por que importa:**
- **H8** (estética minimalista): uma promoção disputa a atenção com a tarefa principal, que é ativar a conta.
- Pedir indicação de quem ainda não usou o produto vem cedo demais.
- **WCAG 1.1.1:** leitor de tela não lê texto em imagem.
- No celular, o texto fica ilegível.

| Alternativa | Como fica | Prós | Contras |
|---|---|---|---|
| **A. Card compacto na coluna da direita, que pode ser fechado** (escolhida na v2) | Ícone, título "Indique e ganhe 1%", uma frase e o link "Ver meu link de indicação", com um X para dispensar. | Continua visível, mas não compete com a ativação; texto real e acessível. | Menos impacto visual que o banner. |
| B. Mostrar só depois da primeira venda | O banner aparece quando a pessoa já teve sucesso no produto. | É o melhor momento psicológico para indicar (pico de satisfação). | Quem nunca vende nunca vê. |
| C. Faixa fina dispensável acima dos indicadores | Uma linha com o texto e o botão, com X. | Mais destaque que A, sem o peso da imagem. | Continua acima da dobra. |

**Recomendação:** **A agora e B depois.** Card compacto para todos, e destaque maior quando houver a primeira venda.

### 3. Tudo zerado e gráfico em linha reta · S0037 · sev. 3
**O que se vê:**
- Cinco indicadores em zero.
- Um gráfico com uma linha reta em R$ 0, cheio de pontos.
- Métodos de pagamento com "0 vendas".

**Por que importa:**
- **H10** (ajuda): um estado vazio é o melhor lugar para ensinar o próximo passo.
- **H8:** um gráfico sem dados ocupa espaço sem informar nada.
- A linha reta pode até parecer erro de carregamento.

| Alternativa | Como fica | Prós | Contras |
|---|---|---|---|
| **A. Estado vazio com chamada para ação** (escolhida na v2) | Ícone, "Nenhuma venda nos últimos 7 dias", uma frase e os botões "Criar primeiro produto", "Conectar checkout" e "Ver guia de primeiros passos". | Transforma o espaço vazio em orientação; os botões levam às duas formas de começar. | Precisa de um texto por situação: conta inativa, ativa sem vendas e período sem vendas. |
| B. Dados de exemplo com o selo "Exemplo" | O gráfico mostra uma curva fictícia, esmaecida, com o selo. | Mostra o valor do painel antes de haver vendas. | Pode confundir quem não lê o selo, e em produto financeiro isso é arriscado. |
| C. Esconder os blocos sem dados | Só a ativação e um checklist até a primeira venda. | Tela limpa e focada. | A pessoa não conhece o painel que vai usar. |

**Recomendação:** **A.** Em produto financeiro, dado fictício na tela real é arriscado (B), e esconder tudo atrasa o aprendizado (C).

**Complemento:** cada indicador ganha a dica "Sem vendas no período" e um ⓘ com a definição. Isso prepara o S0033 (glossário).

### 4. "0.00%" com ponto e "R$ 0,00" com vírgula · S0038 · sev. 2
**Por que importa:**
- **H4** (consistência).
- No Brasil, o separador decimal é a vírgula. "0.00%" parece uma tela traduzida ou feita às pressas.

| Alternativa | Prós | Contras |
|---|---|---|
| **A. Um formatador único `pt-BR` (`Intl.NumberFormat`) para moeda, número e percentual** (escolhida) | Resolve todas as telas de uma vez e evita a volta do erro. | Exige trocar as chamadas espalhadas pelo código. |
| B. Corrigir campo a campo | Rápido nos pontos visíveis. | O erro volta em telas novas. |
| C. Formatar conforme o idioma do navegador | Serve para contas no México e na Colômbia. | Mistura formatos se a conta for BRL e o navegador estiver em inglês. |

**Recomendação:** **A**, com o idioma da **conta** (e não do navegador) como base. Isso já prepara MXN e COP.

### 5. Setas da sidebar apontando para a esquerda · S0039 · sev. 2
**Por que importa:**
- **H4** e convenção de interface: a seta para a esquerda costuma significar "voltar" ou "recolher painel".
- Num item fechado que abre um submenu, a convenção é seta para a direita, que gira para baixo ao abrir.

| Alternativa | Prós | Contras |
|---|---|---|
| **A. Seta para a direita que gira para baixo ao abrir** (escolhida) | É o padrão mais reconhecido, e o giro mostra o estado. | — |
| B. Sinal + e − | Muito claro. | Visual mais pesado. |
| C. Sem seta, com submenu flutuante ao passar o mouse | Sidebar limpa. | Ruim no toque e na navegação por teclado. |

### 6. Breadcrumb "Principal / Dashboard" · S0040 · sev. 1
**Por que importa:**
- **H8:** numa página de primeiro nível, o breadcrumb só repete o título.

| Alternativa | Prós | Contras |
|---|---|---|
| **A. Trocar por um subtítulo que descreve a tela e o período** (escolhida): "Resumo das suas vendas nos últimos 7 dias." | Informa o período ativo, o que também ajuda na H1. | O subtítulo muda com o filtro, e isso precisa ser implementado. |
| B. Remover o breadcrumb e não colocar nada | Simples. | Perde a chance de mostrar o período. |
| C. Manter só nas páginas internas, como Vendas › Detalhe | Mantém a orientação onde ela é útil. | — (combina com A) |

**Recomendação:** **A + C.**

### 7. "Jornada de conquistas" sem progresso · S0041 · sev. 1
**Por que importa:**
- Gamificação funciona quando a pessoa **vê o quanto falta**. É o efeito de gradiente de meta: quanto mais perto, mais esforço.
- "Sem nível" e "10 mil em saques", sem barra, não motivam.

| Alternativa | Prós | Contras |
|---|---|---|
| **A. Barra de progresso com "R$ 0,00 de R$ 10.000,00" e "Faltam R$ 10.000,00"** (escolhida) | Mostra a distância e se atualiza a cada saque. | — |
| B. Trilha com todos os níveis e o atual destacado | Mostra o caminho inteiro e o prêmio de cada nível. | Ocupa mais espaço. |
| C. Esconder até o primeiro saque | Evita mostrar uma meta distante para quem nem começou. | Perde o efeito de motivação desde o início. |

**Recomendação:** **A no card e B na página "Saiba mais".**

## O que não mudou e por quê
- **Os cinco indicadores** continuam no mesmo lugar. A pessoa vai usá-los quando vender, e mudá-los de lugar quebraria a familiaridade (lei de Jakob).
- **A identidade visual** continua: laranja AmploPay, cards brancos e cantos arredondados.

## Como medir se melhorou
[A CONFIRMAR: se o produto já mede isso]
- Percentual de contas novas que concluem a ativação em até 7 dias.
- Tempo entre a criação da conta e a primeira venda.
- Chamados ao suporte com o assunto "conta inativa".
