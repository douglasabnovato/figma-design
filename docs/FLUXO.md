# Fluxo de trabalho com o Figma (plano gratuito)

O plano gratuito do Figma não dá acesso útil ao MCP (cerca de 20 chamadas por mês), e a API do Figma não cria telas. Por isso o fluxo é: **a tela nasce aqui no repositório, em formatos que o Figma importa, e a revisão acontece no GitHub.**

## Regra principal: nada é apagado
Este repositório é uma **base de referências**:
- Toda versão de tela e toda sugestão ficam guardadas.
- Uma versão nova é sempre uma **pasta nova** (`v2`, `v3`...). A versão anterior **não é editada, substituída nem apagada**.
- Toda sugestão é um **arquivo novo** em `sugestoes/`, e a resposta a ela também (veja [sugestoes/README.md](../sugestoes/README.md)).

## Estrutura
```
docs/telas/<tela>.md                     especificação viva + tabela de versões
mockups/<tela>/v<N>/<tela>.svg           mockup importável no Figma
mockups/<tela>/v<N>/preview.png          prévia para o PR
mockups/<tela>/v<N>/NOTAS.md             o que mudou e quais sugestões atendeu
prototipos/<tela>/v<N>/index.html        protótipo clicável daquela versão
sugestoes/<tela>/S<NNNN>_<slug>.md       uma sugestão por arquivo
sugestoes/<tela>/S<NNNN>-R<N>_<slug>.md  resposta/decisão sobre a sugestão
```

## Passo a passo
1. **Pedido.** Cada tela nova começa com uma demanda (de preferência com o link do ClickUp).
2. **Especificação.** `docs/telas/<tela>.md`: objetivo, blocos, estados e a tabela de versões.
3. **Mockup v1.** SVG mais `preview.png` em `mockups/<tela>/v1/`. Cada grupo do SVG tem um nome (`card-moeda/BRL`, `tabela-saques`...) que vira camada no Figma.
4. **Figma:**
   - Arraste o `.svg` para o canvas de um arquivo de design.
   - Os textos viram camadas editáveis, na fonte **Inter**.
   - Para alinhar, selecione um grupo e use *Shift+A* para criar auto layout.
   - Dica: no Figma, mantenha uma página por versão ("v1", "v2"...) para guardar o histórico lá também.
5. **Sugestões.** Cada comentário do revisor, seja no PR, no Figma ou numa reunião, vira um arquivo `S<NNNN>` em `sugestoes/<tela>/`.
6. **Nova versão.** Quando houver ajustes, cria-se `v<N+1>` em `mockups/` e em `prototipos/`, com um `NOTAS.md` dizendo quais sugestões foram atendidas. A resposta a cada sugestão vira um arquivo `S<NNNN>-R<N>`. Se a edição foi feita no Figma, exporte o frame para a pasta da **nova** versão.
7. **Protótipo clicável.** HTML, CSS e JS puros, sem build. Para abrir, dê dois cliques no `index.html` ou publique pelo GitHub Pages.
8. **Revisão.** Cada versão entra por Pull Request, com a prévia, o link do protótipo e as sugestões novas.

## Regras
- **O repositório é público:** nada de dados reais de clientes, nomes, e-mails, saldos, chaves ou tokens. Só dados fictícios.
- Tokens do Figma e arquivos `.env` nunca entram no repositório.
- Não apagar nem sobrescrever versões ou sugestões. Se algo estiver errado, crie um arquivo novo que corrija.
