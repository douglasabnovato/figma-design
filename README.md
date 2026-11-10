# figma-design

Mockups e protótipos de frontend conectados ao Figma, para a equipe AmploPay revisar e iterar.

## Objetivo
- Servir de ponte entre os arquivos do Figma e código de frontend.
- Concentrar mockups (telas estáticas) e protótipos (telas navegáveis) que a equipe revisa antes de irem para os produtos.

## Estrutura
```
mockups/<tela>/v<N>/      telas estáticas (SVG para o Figma + prévia PNG), uma pasta por versão
prototipos/<tela>/v<N>/   protótipos navegáveis (HTML/CSS/JS), uma pasta por versão
sugestoes/                base de referências: uma sugestão por arquivo, nunca apagada
comparacoes/v1-v2.html    antes × depois de cada tela (deslizar, lado a lado, protótipo)
inspiracoes/              estudos de designs de fora (só links e padrões, nada copiado)
docs/                     especificações e análises das telas e o fluxo de trabalho
ferramentas/              svgkit.js (gera os SVGs) e preview.ps1 (gera as prévias PNG)
```

> **Nada é apagado.** Versões antigas e sugestões ficam guardadas para formar uma base de referências. Veja [docs/FLUXO.md](docs/FLUXO.md).

## Telas
| Tela | Versão atual | Mockup (Figma) | Protótipo | Especificação | Sugestões |
|---|---|---|---|---|---|
| Finanças › Saques | v1 | [SVG](mockups/financas-saques/v1/financas-saques.svg) · [prévia](mockups/financas-saques/v1/preview.png) | [abrir](prototipos/financas-saques/v1/index.html) | [spec](docs/telas/financas-saques.md) | [S0001–S0005](sugestoes/README.md) |
| AmploPay › App › Dashboard (conta nova) | v2 | [v1](mockups/amplopay-app-dashboard/v1/amplopay-app-dashboard.svg) · [v2](mockups/amplopay-app-dashboard/v2/amplopay-app-dashboard.svg) · [comparar](comparacoes/v1-v2.html?tela=amplopay-app-dashboard) | [v2](prototipos/amplopay-app-dashboard/v2/index.html) | [análise](docs/telas/amplopay-app-dashboard.md) | [S0035–S0041](sugestoes/README.md) |
| Nalapay › App › Visão geral | v2 | [v1](mockups/nalapay-app-dashboard/v1/nalapay-app-dashboard.svg) · [v2](mockups/nalapay-app-dashboard/v2/nalapay-app-dashboard.svg) · [comparar](comparacoes/v1-v2.html?tela=nalapay-app-dashboard) | [v2](prototipos/nalapay-app-dashboard/v2/index.html) | [análise](docs/telas/nalapay-app-dashboard.md) | [S0020–S0026](sugestoes/README.md) |
| Nalapay › Backoffice › Dashboard Admin | v2 | [v1](mockups/nalapay-backoffice-dashboard/v1/nalapay-backoffice-dashboard.svg) · [v2](mockups/nalapay-backoffice-dashboard/v2/nalapay-backoffice-dashboard.svg) · [comparar](comparacoes/v1-v2.html?tela=nalapay-backoffice-dashboard) | [v2](prototipos/nalapay-backoffice-dashboard/v2/index.html) | [análise](docs/telas/nalapay-backoffice-dashboard.md) | [S0012–S0019](sugestoes/README.md) |

Nas telas com v1 e v2, a **v1 é a recriação do que está em produção** (com dados fictícios) e a **v2 é a proposta**. As sugestões atendidas estão em `mockups/<tela>/v2/NOTAS.md`.

O passo a passo completo está em [docs/FLUXO.md](docs/FLUXO.md).

## Inspirações
| Data | Estudo | Referências |
|---|---|---|
| 2026-11-10 | [Gateways e plataformas de pagamento](inspiracoes/2026-11-10_gateways-pagamento/ANALISE.md) | PayConductor, Upay, AbacatePay, InfinitePay, UvviPay, Asaas, Nuvei (OXXO Pay) |

Regras dos estudos: [inspiracoes/README.md](inspiracoes/README.md).

## Conexão com o Figma
A integração com o Figma é configurada localmente por quem mantém o repositório.
Os links dos arquivos e frames de referência ficam em `docs/`.
Tokens e credenciais do Figma **nunca** entram no repositório.

## Como revisar
1. Abra uma **Issue** para pedir uma tela nova ou registrar um ajuste.
2. Cada mockup ou protótipo novo chega por **Pull Request**, com o link do frame no Figma e uma captura da tela.
3. Comente direto no PR. Cada comentário vira um arquivo em `sugestoes/`. Quando a revisão terminar, o PR é aprovado e entra na `main`.
4. Os ajustes chegam como uma **versão nova** (`v2`, `v3`...), e a anterior continua no repositório.
