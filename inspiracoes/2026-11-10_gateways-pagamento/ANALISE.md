# Estudo: gateways e plataformas de pagamento (2026-11-10)

- **Pedido:** do usuário, para entender as ferramentas do mercado e descrever o design UX/UI de cada uma.
- **Como foi feito:**
  - Cada página foi aberta no navegador em 2026-11-10, sem parâmetros de rastreamento.
  - Li o texto e o visual da primeira dobra. Não aceitei nenhum banner de cookies.
- **Aviso:** os números (aprovação, taxas, prazos) são **o que cada site diz**. Não foram verificados.
- **Uso:** fonte de análise (FT64). Nada aqui é regra nem demanda. Para virar trabalho, passa pelo Chat PM.

## Referências
| # | Ferramenta | Página estudada |
|---|---|---|
| 1 | PayConductor | https://payconductor.ai/pt/ |
| 2 | Upay | https://www.upaybrasil.com.br/solucoes/infoproduto |
| 3 | AbacatePay | https://www.abacatepay.com/blog/plataforma-de-pagamento-para-infoprodutos e a home https://www.abacatepay.com/ |
| 4 | InfinitePay | https://www.infinitepay.io/lp/checkout-integrado |
| 5 | UvviPay | https://uvvipay.com.br/api-de-pagamento |
| 6 | Asaas | https://www.asaas.com/api-de-pagamentos |
| 7 | Nuvei (OXXO Pay) | https://www.nuvei.com/br/postagens/oxxo-pay |

## Parte 1: o que é cada ferramenta

| Ferramenta | O que é | Público | O que o site destaca |
|---|---|---|---|
| **PayConductor** | Orquestrador de pagamentos com IA. Fica acima de vários gateways e adquirentes e escolhe a rota de cada transação em tempo real. | Marketplaces, e-commerce, SaaS, ingressos e gateways | Agentes de IA para roteamento, recuperação de venda negada, antifraude, monitoramento, custo e análise de recusas. Configuração de fluxos por conversa (Concierge). Ganho de aprovação e redução de custo em faixas percentuais. |
| **Upay** | Gateway com foco em infoprodutos. | Infoprodutores e lançamentos | Estabilidade em pico de lançamento, Pix D+0, cartão e boleto D+2, venda em moeda estrangeira, antifraude para produto digital, suporte especializado. |
| **AbacatePay** | Gateway simples, com preço público. A página estudada é um artigo-checklist para escolher plataforma. | Startups, e-commerce e infoprodutores (CNPJ, MEI incluso) | Pix com taxa fixa baixa e sem mensalidade, boleto com taxa só quando pago, cartão sob consulta com taxa conforme o prazo. Painel com MRR e churn. Integração por IA (`llms.txt`) e SDKs. Calculadora de taxas. Diz o que não oferece (área de membros, afiliados). |
| **InfinitePay** | Checkout por link de pagamento via API, de uma conta digital com maquininha. | Lojas e infoprodutores que vendem no próprio site | Pix sem taxa, crédito parcelado, Apple Pay e Google Pay, uma chamada POST para gerar o link, webhook com nova tentativa, antifraude incluso, recebimento rápido. |
| **UvviPay** | Infraestrutura de pagamentos para desenvolvedores: API, split, recorrência, Pix Automático, subcontas, tokenização e whitelabel. | Plataformas, marketplaces, SaaS e devs | Onboarding técnico em 4 passos, sandbox, SDKs, **servidor MCP** para assistentes de IA, PCI DSS e LGPD. Também tem link de pagamento, POS e Tap to Pay. |
| **Asaas** | Banking as a Service + gateway, com a parte regulatória por conta dela. | Médias e grandes empresas e quem quer oferecer serviços financeiros com a própria marca | API, checkout pronto, split, conta escrow, sandbox, antecipação, nota fiscal automática, régua de cobrança, plugins sem código. |
| **Nuvei (OXXO Pay)** | Artigo sobre o OXXO Pay, pagamento **em dinheiro** em lojas OXXO no México. A Nuvei é um processador global. | Quem vende para o México | O cliente recebe um código (14 dígitos ou código de barras) e paga em dinheiro numa loja OXXO. A confirmação sai em tempo real ou em até 1 dia útil, conforme a integração. Alcança quem não tem conta bancária. |

### Camadas
| Camada | Ferramentas | Relação com AmploPay e Nalapay |
|---|---|---|
| Orquestração (acima dos gateways) | PayConductor | Possível fornecedor; concorrente indireto do argumento "múltiplas adquirentes" |
| Gateway para infoprodutor | Upay, AbacatePay, InfinitePay | Concorrentes diretos |
| Infraestrutura / BaaS | UvviPay, Asaas | Concorrentes em clientes maiores e técnicos (split, subcontas, whitelabel) |
| Método local internacional | Nuvei (OXXO) | Relevante para a Nalapay, que opera MXN e COP |

### Tendências
1. **Integração com IA como diferencial:** `llms.txt`, servidor MCP e configuração por chat.
2. **Preço simples e público** na primeira dobra.
3. **"Comece em 3 ou 4 passos"** como padrão de onboarding.
4. **Painel com métricas de negócio** (MRR, churn), e não só uma lista de transações.
5. **Pix Automático, recorrência e split** como recursos básicos para SaaS e marketplace.

## Parte 2: design UX/UI

### 1. PayConductor: "IA premium"
- **Visual:** fundo branco com brilho lilás desfocado, ícones 3D roxo-azulados flutuando, título grande centralizado e botão principal roxo.
- **Padrões:**
  - diagrama de linhas do logo para os provedores;
  - cards de "atividade ao vivo" dos agentes;
  - simulação de chat;
  - "3 etapas";
  - FAQ;
  - CTA "Agendar demonstração".
- **UX:** torna concreto um conceito abstrato (orquestração) com diagrama e exemplos de conversa.
- **Ponto fraco:** as animações de entrada atrasam o conteúdo.
- **Aproveitar:** o card de atividade ao vivo no dashboard e a configuração de regras por conversa no backoffice.

### 2. Upay: "parceiro do lançamento"
- **Visual:** branco com roxo vibrante, selo-pílula acima do título e WhatsApp flutuante.
- **Padrões:**
  - um checkout e um mini-dashboard de exemplo **na própria landing**;
  - uma tabela "com a Upay × gateways genéricos";
  - CTA duplo (criar conta / especialista).
- **UX:** a mensagem fala da dor do nicho (o lançamento).
- **Ponto fraco:** muito texto genérico e nenhum número de taxa.
- **Aproveitar:** a comparação lado a lado e o produto real na landing (combina com a S0028-R1).

### 3. AbacatePay: "dev-friendly e transparente"
- **Visual:** cinza muito claro, verde-abacate no CTA, menu em pílula flutuante e tom informal.
- **Padrões:**
  - um **dashboard interativo embutido** (receita, MRR, churn, filtro de período em pílulas);
  - uma **calculadora de taxa efetiva**;
  - um bloco "copie o llms.txt";
  - depoimentos;
  - FAQ curto.
- **UX:** a transparência vira interface: a calculadora responde antes da pergunta. Dizer o que o produto **não faz** aumenta a confiança.
- **Ponto fraco:** o tom muito informal pode não servir para clientes corporativos.
- **Aproveitar:** a calculadora, o painel com MRR e churn, o filtro em pílulas (alternativa B da S0020) e a seção "o que não fazemos".

### 4. InfinitePay: "checkout que converte"
- **Visual:** branco com verde-limão nos botões e no destaque do título, mockup do checkout ao lado do título e selo de promessa curta.
- **Padrões:**
  - demonstrações por método (QR Pix, cartão, carteira digital com "aprovado");
  - um checkout completo de exemplo;
  - um **bloco de código com abas Request / Response / Webhook** e botão copiar.
- **UX:** fala com o lojista (o resultado) e com o dev (o código) na mesma página.
- **Ponto fraco:** o verde-limão exige texto escuro para ter contraste.
- **Aproveitar:** as abas de código na documentação e os estados do checkout como referência para os protótipos.

### 5. UvviPay: "API sóbria"
- **Visual:** fundo claro com textura leve, verde-água nos botões e bloco de código escuro logo abaixo do título.
- **Padrões:**
  - um **mega-menu com descrição por item**;
  - "da conta à produção em 4 passos";
  - cards técnicos;
  - selos PCI e LGPD;
  - "para quem é" numerado.
- **UX:** organizada e previsível, para o público dev.
- **Ponto fraco:** pouco diferencial visual.
- **Aproveitar:** o mega-menu descritivo, os passos até a produção (combina com a S0035) e o MCP como diferencial técnico.

### 6. Asaas: "instituição confiável"
- **Visual:** azul forte em blocos grandes, foto de pessoa real e botões brancos sobre o azul.
- **Padrões:**
  - um **diagrama "como funciona um gateway"**;
  - abas de recursos (Split, Escrow, Sandbox);
  - grade de integrações;
  - "fale com especialista" em todos os blocos.
- **UX:** educa antes de vender.
- **Ponto fraco:** CTAs repetidos e menu quebrando em duas linhas na largura testada.
- **Aproveitar:** o diagrama do fluxo de pagamento (onboarding e glossário, S0033) e as abas para economizar espaço.

### 7. Nuvei: "editorial global"
- **Visual:** blog corporativo com título serifado em azul-marinho, foto de destaque e breadcrumb.
- **Padrões:** artigo com subtítulos em forma de pergunta, passo a passo numerado e newsletter.
- **UX:** conteúdo de SEO e educação.
- **Pontos fracos:**
  - a tradução tem falhas;
  - o banner de cookies está em outro idioma.
- **Aproveitar:**
  - o passo a passo do OXXO como referência para um **checkout em MXN** (código de referência, validade e instrução de pagamento em loja);
  - "rejeitar todos" com o mesmo peso de "aceitar todos" no banner de cookies.

### Comparação visual
| | Cor de destaque | Tom | Mostra o produto | Mostra preço | Código na página |
|---|---|---|---|---|---|
| PayConductor | roxo e lilás | futurista, B2B | diagrama e chat | não | não |
| Upay | roxo | nicho infoproduto | checkout e dashboard | não | não |
| AbacatePay | verde | informal, dev | dashboard e calculadora | sim | llms.txt |
| InfinitePay | verde-limão | direto, conversão | checkout completo | Pix sem taxa | sim, com abas |
| UvviPay | verde-água | técnico | não | não | sim, no topo |
| Asaas | azul | institucional | diagrama | não | não |
| Nuvei | azul-marinho | editorial | não | não | não |
| *AmploPay (site)* | *laranja* | *"quem fatura alto"* | *print do dashboard* | *não ("personalizadas")* | *não* |

## O que levar para as nossas telas (candidatos a sugestão)
São ideias, ainda **sem número S**. Viram `S<NNNN>` quando o usuário escolher.
1. **Calculadora de "quanto você recebe"**, no site AmploPay e no painel. Base: AbacatePay.
2. **Página para desenvolvedores** com código em abas (Request / Response / Webhook) e integração por IA (`llms.txt` ou MCP). Base: InfinitePay, AbacatePay e UvviPay.
3. **Dashboard real e interativo no site.** Base: AbacatePay e Upay. Combina com a S0028-R1.
4. **Onboarding em etapas visíveis**, até a primeira venda. Base: UvviPay e InfinitePay. Combina com a S0035.
5. **Card de atividade ao vivo** no dashboard ("venda recuperada", "saque pago"). Base: PayConductor.
6. **Diagrama do fluxo de pagamento** no glossário e no onboarding. Base: Asaas.
7. **Checkout MXN com OXXO** na Nalapay, com código de referência, validade e instruções [A CONFIRMAR suporte]. Base: Nuvei.
8. **Painel com métricas de recorrência** (MRR, churn) para infoprodutor com assinatura. Base: AbacatePay.

## Próximo passo possível
Montar um **template nosso** em `inspiracoes/2026-11-10_gateways-pagamento/v1/`, como uma landing ou página de desenvolvedores AmploPay, combinando os padrões acima com a identidade AmploPay e dados fictícios. Só com o ok do usuário.
