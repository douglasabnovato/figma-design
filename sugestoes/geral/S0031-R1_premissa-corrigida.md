# S0031-R1 — Correção da premissa
- **Data:** 2026-11-10 · **Quem registrou:** Claude Code
- **Decisão:** em discussão (correção de premissa; a ideia continua de pé)
- **Atendida em:** —

## O que mudou
A S0031 partia de que "as telas de AmploPay e Nalapay têm a mesma estrutura". O print do painel AmploPay mostra que **não têm**:
- **App AmploPay:** identidade laranja, sidebar com Vitrine, Vendas, Financeiro e Clientes, banner promocional e "Jornada de conquistas".
- **App Nalapay:** identidade preta e verde, sidebar com Relatórios, Disputas, Finanças e Webhooks, e uma estrutura de cards diferente.

## O que continua valendo
A proposta de **um sistema de design com tokens por marca** continua útil, agora com outra justificativa:
- Os dois produtos resolvem os mesmos problemas: indicadores, tabelas de transações, saldos e saques. Por isso podem **compartilhar componentes** (card de KPI, selo de status, seletor de período, gaveta de detalhe) mesmo com layouts diferentes.
- Os protótipos v2 deste repositório já usam os mesmos padrões nas três telas: o card de KPI com variação e ⓘ, os selos com ícone, o seletor de período e o tooltip de gráfico.

## A confirmar
Se as duas plataformas têm códigos de frontend separados. Isso muda o esforço de adotar um sistema de design único.
