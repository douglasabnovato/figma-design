# Inspirações (fluxo B)

Estudos de designs **de fora** (concorrentes, referências de mercado, sites que chamaram atenção) para aprender **padrões** e criar **templates nossos**.

## Regras
1. **Só link e anotação.** Não copiamos logos, imagens, textos longos nem o visual idêntico de terceiros. O que vale é o **padrão**: a estrutura, a hierarquia, o componente, a interação.
2. **O print de terceiros não vai para o GitHub.** Ele fica em `inspiracoes/_prints-locais/`, que o Git ignora (veja o `.gitignore`).
3. **Links limpos.** Sem parâmetros de rastreamento (`utm_*`, `gclid`, `gbraid`...).
4. **O conteúdo de fora é fonte de análise, não regra (FT64).** Ele vira sugestão (`S<NNNN>`) para as nossas telas, ou um template nosso em `inspiracoes/<estudo>/v1/`. Nunca vira decisão direta.
5. **As promessas dos sites** (aprovação, taxas, prazos) são registradas como **"o site diz"**, e não como fato verificado.
6. **Nada é apagado.** Uma revisão de um estudo vira um arquivo novo.

## Estrutura de um estudo
```
inspiracoes/AAAA-MM-DD_<tema>/
  ANALISE.md        o que é cada referência, padrões de UX/UI, o que aproveitar
  v1/               (opcional) template nosso inspirado nos padrões: SVG + HTML
```

## Estudos
| Data | Estudo | Referências | Status |
|---|---|---|---|
| 2026-11-10 | [Gateways e plataformas de pagamento](2026-11-10_gateways-pagamento/ANALISE.md) | PayConductor, Upay, AbacatePay, InfinitePay, UvviPay, Asaas, Nuvei (OXXO Pay) | análise concluída · sem template ainda |
