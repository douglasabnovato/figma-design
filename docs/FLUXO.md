# Fluxo de trabalho com o Figma (plano gratuito)

O plano gratuito do Figma não dá acesso útil ao MCP (cerca de 20 chamadas por mês), e a API do Figma não cria telas. Por isso o fluxo é: **a tela nasce aqui no repositório, em formatos que o Figma importa, e a revisão acontece no GitHub.**

## Passo a passo
1. **Pedido.** Cada tela nova começa com uma demanda (de preferência com o link do ClickUp).
2. **Especificação.** `docs/telas/<tela>.md`: objetivo, blocos, estados, o que o protótipo simula e as perguntas para o revisor.
3. **Mockup.** `mockups/<tela>/<tela>.svg` mais um `preview.png`. Cada grupo do SVG tem um nome (`card-moeda/BRL`, `tabela-saques`...) que vira camada no Figma.
4. **Figma:**
   - Abra um arquivo de design e **arraste o `.svg`** para o canvas.
   - Os textos viram camadas de texto editáveis e os retângulos viram formas.
   - A fonte é **Inter**, que já vem no Figma.
   - Para ajustar alinhamentos, selecione um grupo e use *Shift+A* para criar auto layout.
5. **Volta ao repositório.** Quem editar no Figma exporta o frame em PNG ou SVG e substitui o arquivo em `mockups/<tela>/`. O Git guarda o histórico de cada versão.
6. **Protótipo clicável.** `prototipos/<tela>/` em HTML, CSS e JS puros, sem build. Para abrir, dê dois cliques no `index.html` ou publique pelo GitHub Pages.
7. **Revisão.** Cada tela entra por Pull Request, com a prévia, o link do protótipo e os comentários da equipe.

## Regras
- **O repositório é público:** nada de dados reais de clientes, nomes, e-mails, saldos, chaves ou tokens. Só dados fictícios.
- Tokens do Figma e arquivos `.env` nunca entram no repositório.
