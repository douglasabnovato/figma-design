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
docs/                     especificações das telas e o fluxo de trabalho
```

> **Nada é apagado.** Versões antigas e sugestões ficam guardadas para formar uma base de referências. Veja [docs/FLUXO.md](docs/FLUXO.md).

## Telas
| Tela | Versão atual | Mockup (Figma) | Protótipo | Especificação | Sugestões |
|---|---|---|---|---|---|
| Finanças › Saques | v1 | [SVG](mockups/financas-saques/v1/financas-saques.svg) · [prévia](mockups/financas-saques/v1/preview.png) | [abrir](prototipos/financas-saques/v1/index.html) | [spec](docs/telas/financas-saques.md) | [S0001–S0005](sugestoes/README.md) |

O passo a passo completo está em [docs/FLUXO.md](docs/FLUXO.md).

## Conexão com o Figma
A integração com o Figma é configurada localmente por quem mantém o repositório.
Os links dos arquivos e frames de referência ficam em `docs/`.
Tokens e credenciais do Figma **nunca** entram no repositório.

## Como revisar
1. Abra uma **Issue** para pedir uma tela nova ou registrar um ajuste.
2. Cada mockup ou protótipo novo chega por **Pull Request**, com o link do frame no Figma e uma captura da tela.
3. Comente direto no PR. Cada comentário vira um arquivo em `sugestoes/`. Quando a revisão terminar, o PR é aprovado e entra na `main`.
4. Os ajustes chegam como uma **versão nova** (`v2`, `v3`...), e a anterior continua no repositório.
