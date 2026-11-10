# figma-design

Mockups e protótipos de frontend conectados ao Figma, para a equipe AmploPay revisar e iterar.

## Objetivo
- Servir de ponte entre os arquivos do Figma e código de frontend.
- Concentrar mockups (telas estáticas) e protótipos (telas navegáveis) que a equipe revisa antes de irem para os produtos.

## Estrutura
```
mockups/      telas estáticas exportadas ou geradas a partir do Figma
prototipos/   protótipos navegáveis (HTML/React) das telas
docs/         notas de design, decisões e links para os arquivos do Figma
```

## Telas
| Tela | Mockup (Figma) | Protótipo | Especificação |
|---|---|---|---|
| Finanças › Saques | [SVG](mockups/financas-saques/financas-saques.svg) · [prévia](mockups/financas-saques/preview.png) | [abrir](prototipos/financas-saques/index.html) | [spec](docs/telas/financas-saques.md) |

O passo a passo completo está em [docs/FLUXO.md](docs/FLUXO.md).

## Conexão com o Figma
A integração com o Figma é configurada localmente por quem mantém o repositório.
Os links dos arquivos e frames de referência ficam em `docs/`.
Tokens e credenciais do Figma **nunca** entram no repositório.

## Como revisar
1. Abra uma **Issue** para pedir uma tela nova ou registrar um ajuste.
2. Cada mockup ou protótipo novo chega por **Pull Request**, com o link do frame no Figma e uma captura da tela.
3. Comente direto no PR. Quando a revisão terminar, o PR é aprovado e entra na `main`.
