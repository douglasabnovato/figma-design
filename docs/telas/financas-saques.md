# Tela: Finanças › Saques

- **Produto:** painel do lojista (`amplopay-app`)
- **Rota de referência:** `/finances?lista=saques`
- **Origem:** print de referência enviado em 10/11/2026. Os dados do print (nomes, e-mail, saldos e IDs) foram trocados por **dados fictícios**, porque este repositório é público.
- **Arquivos:**
  - Mockup para o Figma: [`mockups/financas-saques/financas-saques.svg`](../../mockups/financas-saques/financas-saques.svg)
  - Prévia: [`mockups/financas-saques/preview.png`](../../mockups/financas-saques/preview.png)
  - Protótipo clicável: [`prototipos/financas-saques/`](../../prototipos/financas-saques/)

## Objetivo
Mostrar o saldo de cada moeda e o histórico de saques, transferências, conversões e ajustes, deixando claro quanto do saldo está **bloqueado** e não pode ser movimentado.

## Blocos da tela
1. **Cabeçalho:** título "Finanças" e subtítulo.
2. **Alerta de saldo bloqueado.** Aparece só quando há valor bloqueado em alguma moeda. O link leva ao card da moeda.
3. **Saldos por moeda.** Um card por moeda: BRL (Pix), MXN (SPEI) e COP (Nequi / Bre-B).
   - **Disponível** em destaque.
   - **Bloqueado**, **A liberar** e **Reserva do cartão** (os dois últimos só no BRL), e o **Total**.
   - Aviso "retidos" dentro do card quando o bloqueado for maior que zero.
   - Ações: **Depositar**, **Sacar**, **Transferir**.
   - Rodapé específico: MXN mostra "Minha chave CLABE"; COP mostra "Cobrança única — sem chave fixa".
   - O olho ao lado do título oculta todos os valores da tela.
4. **Movimentações.** Abas: Saques (com contador), Transferências internas, Conversões e Ajustes de saldo.
5. **Tabela de saques:**
   - Busca por ID, referência, recebedor ou chave.
   - Filtros de origem, status e período.
   - Colunas: Solicitação, Origem, Recebedor/destino, Valor, Taxa, Total debitado, Data, Status e o olho que abre o detalhe.
   - Paginação.

## Estados
| Elemento | Estados |
|---|---|
| Status do saque | Pago (verde), Processando (âmbar), Recusado (vermelho) |
| Card de moeda | Com saldo; sem saldo (Sacar e Transferir avisam que não há saldo); com bloqueio |
| Tabela | Com linhas; sem resultado para os filtros (botão "Limpar filtros"); aba vazia (mensagem explicativa) |
| Tema | Claro e escuro |

## O que o protótipo simula
- **Sacar (BRL):** valida valor, saldo e chave. Debita valor + taxa de R$ 0,50 e cria a linha como **Processando**. Depois de cerca de 3 s, a linha passa para **Pago**.
- **Depositar:** gera um Pix copia e cola fictício. "Simular pagamento" credita o saldo.
- **Transferir:** move saldo para outra conta, sem taxa, e abre a aba Transferências internas.
- **Detalhe do saque:** gaveta lateral com os dados e a linha do tempo (recebido, enviado ao banco, confirmado ou recusado).
- **Outros controles:** recolher o menu lateral e o submenu Relatórios, alternar o tema e ocultar os valores.
- **Itens de menu fora desta tela:** mostram um aviso.

## Pontos para o revisor opinar
- [ ] O alerta do topo e o aviso dentro do card dizem a mesma coisa. Vale manter os dois?
- [ ] Com um card de cada moeda, MXN e COP zerados ocupam o mesmo espaço do BRL. Colapsar moedas sem saldo?
- [ ] A coluna "Taxa" é quase sempre R$ 0,50. Ela pode virar só um tooltip no "Total debitado"?
- [ ] A aba "Transferências internas" não tem contador, ao contrário das outras.
- [ ] O que acontece com um saque **Recusado**: o valor volta para o saldo? O texto do detalhe assume que sim [A CONFIRMAR].
