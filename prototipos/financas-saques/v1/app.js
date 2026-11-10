/* Protótipo clicável: Finanças > Saques. Todos os dados são fictícios e ficam só na memória do navegador. */
(() => {
  'use strict';

  // ---------- Ícones (mesmos traços do mockup SVG) ----------
  const ICONS = {
    grid: 'M1 1h5v5H1zM8 1h5v5H8zM1 8h5v5H1zM8 8h5v5H8z',
    chart: 'M1 1v12h12M4 9l3-3 2 2 4-4',
    file: 'M3 1h6l3 3v9H3zM9 1v3h3',
    wallet: 'M1 4h12v9H1zM1 4l9-3v3M10 8.5h1',
    cart: 'M1 1h2l2 8h7l1-5H4M6 12.5h.1M11 12.5h.1',
    hook: 'M5 4a2 2 0 1 1 3 1.7L10 9M4 12a2 2 0 1 1 1-3.7h5M12 12a2 2 0 1 1-1-3.7',
    link: 'M6 8l2-2M5 6L3.5 7.5a2 2 0 0 0 3 3L8 9M9 8l1.5-1.5a2 2 0 0 0-3-3L6 5',
    pct: 'M2 12L12 2M3.5 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM10.5 12a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z',
    gift: 'M1 5h12v3H1zM2 8h10v5H2zM7 5v8M7 5C5 1 3 3 4.5 5M7 5c2-4 4-2 2.5 0',
    code: 'M4.5 3L1 7l3.5 4M9.5 3L13 7l-3.5 4',
    chevD: 'M3 5l4 4 4-4', chevR: 'M5 3l4 4-4 4', chevUD: 'M4 5l3-3 3 3M4 9l3 3 3-3',
    panel: 'M1 1h12v12H1zM5 1v12',
    sun: 'M7 4.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM7 .5V2M7 12v1.5M.5 7H2M12 7h1.5M2.4 2.4l1 1M10.6 10.6l1 1M2.4 11.6l1-1M10.6 3.4l1-1',
    moon: 'M12 8.5A5.5 5.5 0 1 1 5.5 2 4.5 4.5 0 0 0 12 8.5z',
    eye: 'M1 7s2.2-4 6-4 6 4 6 4-2.2 4-6 4-6-4-6-4zM7 8.8a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6z',
    eyeOff: 'M1 7s2.2-4 6-4 6 4 6 4-2.2 4-6 4-6-4-6-4zM2 2l10 10',
    warn: 'M7 1.5L13 12.5H1zM7 5.5v3M7 10.5h.01',
    info: 'M7 1a6 6 0 1 1 0 12A6 6 0 0 1 7 1zM7 6.5v3.5M7 4.5h.01',
    search: 'M6 1a5 5 0 1 1 0 10A5 5 0 0 1 6 1zM10 10l3 3',
  };
  const svg = n => `<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="${ICONS[n]}"/></svg>`;
  const paintIcons = (root = document) => root.querySelectorAll('i[data-i]').forEach(el => { el.innerHTML = svg(el.dataset.i); });

  // ---------- Utilidades ----------
  const $ = s => document.querySelector(s);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmt = {
    BRL: v => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
    MXN: v => '$' + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    COP: v => '$ ' + v.toLocaleString('es-CO', { maximumFractionDigits: 0 }),
  };
  const fmtData = d => d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' }) + ', ' + d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  let seed = 7;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const pick = a => a[Math.floor(rnd() * a.length)];
  const hex = n => Array.from({ length: n }, () => '0123456789abcdef'[Math.floor(rnd() * 16)]).join('');
  const b36 = n => Array.from({ length: n }, () => 'abcdefghijklmnopqrstuvwxyz0123456789'[Math.floor(rnd() * 36)]).join('');
  const parseValor = s => Number(String(s).replace(/[^\d,]/g, '').replace(',', '.')) || 0;
  const TAXA = 0.5;

  // ---------- Estado ----------
  const state = {
    ocultar: false,
    tab: 'saques',
    page: 1,
    perPage: 10,
    saldos: {
      BRL: { disponivel: 18420.90, bloqueado: 4250, liberar: 0, reserva: 0 },
      MXN: { disponivel: 0, bloqueado: 0 },
      COP: { disponivel: 0, bloqueado: 0 },
    },
    listas: { saques: [], transferencias: [], conversoes: [], ajustes: [] },
  };

  const NOMES = ['MARIANA COSTA LIMA', 'RAFAEL ALMEIDA SOUZA', 'JULIANA PEREIRA ROCHA', 'BRUNO CARVALHO DIAS', 'LETÍCIA MARTINS GOMES', 'THIAGO RIBEIRO NUNES', 'CAMILA FERREIRA LOPES', 'EDUARDO BARROS MELO', 'PATRÍCIA ARAÚJO REIS', 'GUSTAVO MOREIRA CRUZ', 'ALINE TEIXEIRA CAMPOS', 'FELIPE MONTEIRO VAZ', 'RENATA CORREIA BRITO', 'DIEGO CARDOSO PINTO', 'VANESSA FREITAS MOTA'];
  const CHAVES = ['e-mail', 'celular', 'CPF', 'aleatória'];
  const novoId = () => '#sq_' + b36(12);
  const novoUuid = () => `${hex(8)}-${hex(4)}-4${hex(3)}-${hex(4)}-${hex(12)}`;

  function gerarSaques() {
    const agora = new Date();
    const fixos = [
      ['MARIANA COSTA LIMA', 'e-mail', 60.5, 'Pago', 'Transferência via API'], ['RAFAEL ALMEIDA SOUZA', 'e-mail', 509, 'Pago', 'Transferência via API'],
      ['JULIANA PEREIRA ROCHA', 'celular', 56, 'Pago', 'Transferência via API'], ['BRUNO CARVALHO DIAS', 'CPF', 1200, 'Processando', 'Saque pelo painel'],
      ['LETÍCIA MARTINS GOMES', 'aleatória', 89.9, 'Pago', 'Transferência via API'], ['THIAGO RIBEIRO NUNES', 'e-mail', 340, 'Recusado', 'Transferência via API'],
      ['CAMILA FERREIRA LOPES', 'CPF', 75, 'Pago', 'Transferência via API'], ['EDUARDO BARROS MELO', 'celular', 2150, 'Pago', 'Saque pelo painel'],
    ];
    const lista = [];
    let t = agora.getTime();
    fixos.forEach(([nome, chave, valor, status, origem]) => {
      t -= (8 + Math.floor(rnd() * 30)) * 60000;
      lista.push({ id: novoId(), uuid: novoUuid(), origem, nome, chave, valor, status, data: new Date(t) });
    });
    for (let i = 0; i < 38; i++) {
      t -= (2 + Math.floor(rnd() * 22)) * 3600000;
      const r = rnd();
      lista.push({
        id: novoId(), uuid: novoUuid(), origem: rnd() < 0.8 ? 'Transferência via API' : 'Saque pelo painel',
        nome: pick(NOMES), chave: pick(CHAVES), valor: Math.round((20 + rnd() * 2400) * 100) / 100,
        status: r < 0.88 ? 'Pago' : r < 0.94 ? 'Recusado' : 'Processando', data: new Date(t),
      });
    }
    lista.filter(s => s.status === 'Processando' && s !== lista[3]).forEach(s => { s.status = 'Pago'; });
    return lista;
  }
  state.listas.saques = gerarSaques();
  state.listas.transferencias = [
    { id: '#ti_' + b36(12), uuid: novoUuid(), origem: 'Transferência interna', nome: 'LOJA EXEMPLO FILIAL SUL', chave: 'Conta AmploPay', valor: 1500, status: 'Pago', data: new Date(Date.now() - 3 * 86400000), taxa: 0 },
    { id: '#ti_' + b36(12), uuid: novoUuid(), origem: 'Transferência interna', nome: 'LOJA EXEMPLO FILIAL SUL', chave: 'Conta AmploPay', valor: 820, status: 'Pago', data: new Date(Date.now() - 12 * 86400000), taxa: 0 },
  ];
  const TOTAL_SAQUES_HISTORICO = 1238; // além dos gerados aqui, para o contador parecer real

  // ---------- Cards de saldo ----------
  const MOEDAS = [
    { code: 'BRL', flag: 'BR', nome: 'Real (BRL)', badge: 'Pix' },
    { code: 'MXN', flag: 'MX', nome: 'Peso mexicano (MXN)', badge: 'SPEI' },
    { code: 'COP', flag: 'CO', nome: 'Peso colombiano (COP)', badge: 'Nequi / Bre-B' },
  ];
  const mask = (code, v) => state.ocultar ? '••••••' : fmt[code](v);

  function renderCards() {
    $('#cards').innerHTML = MOEDAS.map(m => {
      const s = state.saldos[m.code];
      const total = s.disponivel + s.bloqueado + (s.liberar || 0) + (s.reserva || 0);
      const rows = [
        `<div class="kv"><span>Bloqueado <i data-i="info" title="Valor retido por análise. Não é liberado automaticamente."></i></span><b class="${s.bloqueado ? 'orange' : ''}">${mask(m.code, s.bloqueado)}</b></div>`,
        m.code === 'BRL' ? `<div class="kv"><span>A liberar</span><b>${mask(m.code, s.liberar)}</b></div><div class="kv"><span>Reserva do cartão</span><b>${mask(m.code, s.reserva)}</b></div>` : '',
        `<div class="kv"><span>Total</span><b>${mask(m.code, total)}</b></div>`,
      ].join('');
      const retido = s.bloqueado ? `<div class="retido warn"><i data-i="warn" style="color:var(--orange)"></i><p style="margin:0"><strong>${mask(m.code, s.bloqueado)} retidos.</strong> Não dá para sacar, converter ou transferir esse valor.</p></div>` : '';
      const foot = m.code === 'MXN' ? `<div class="card-foot"><button type="button" data-acao="clabe">Minha chave CLABE</button></div>`
        : m.code === 'COP' ? `<div class="card-foot"><i data-i="info"></i>Cobrança única — sem chave fixa</div>` : '';
      return `<article class="card" id="card-${m.code}">
        <div class="card-head"><span class="flag">${m.flag}</span><div><strong>${m.nome}</strong><small>${m.code}</small></div><span class="badge">${m.badge}</span></div>
        <div class="label">DISPONÍVEL</div>
        <div class="amount">${mask(m.code, s.disponivel)}</div>
        ${rows}${retido}
        <div class="actions">
          <button class="btn primary" data-acao="depositar" data-moeda="${m.code}">Depositar</button>
          <button class="btn" data-acao="sacar" data-moeda="${m.code}">Sacar</button>
          <button class="btn" data-acao="transferir" data-moeda="${m.code}">Transferir</button>
        </div>${foot}
      </article>`;
    }).join('');
    $('#bannerValor').textContent = mask('BRL', state.saldos.BRL.bloqueado);
    $('#bannerBloqueio').hidden = !state.saldos.BRL.bloqueado;
    paintIcons($('#cards'));
  }

  // ---------- Abas, filtros e tabela ----------
  const TABS = {
    saques: { titulo: 'Saques e transferências', sub: 'Consulte o destino, as taxas e a confirmação de cada pagamento.' },
    transferencias: { titulo: 'Transferências internas', sub: 'Valores movidos entre contas AmploPay, sem taxa.', vazio: 'Nenhuma transferência interna' },
    conversoes: { titulo: 'Conversões', sub: '', vazio: 'Nenhuma conversão ainda', texto: 'Quando você converter saldo entre moedas, a operação aparece aqui com a cotação usada.' },
    ajustes: { titulo: 'Ajustes de saldo', sub: '', vazio: 'Nenhum ajuste de saldo', texto: 'Créditos ou débitos manuais feitos pela equipe AmploPay aparecem aqui com o motivo.' },
  };

  function filtrar() {
    const q = $('#fBusca').value.trim().toLowerCase();
    const origem = $('#fOrigem').value, status = $('#fStatus').value, periodo = $('#fPeriodo').value;
    const inicioHoje = new Date(); inicioHoje.setHours(0, 0, 0, 0);
    return state.listas[state.tab].filter(s => {
      if (q && ![s.id, s.uuid, s.nome, s.chave].some(x => x.toLowerCase().includes(q))) return false;
      if (origem && s.origem !== origem) return false;
      if (status && s.status !== status) return false;
      if (periodo !== '') {
        const limite = new Date(inicioHoje.getTime() - Number(periodo) * 86400000);
        if (s.data < limite) return false;
      }
      return true;
    });
  }

  function renderTabela() {
    const cfg = TABS[state.tab], lista = state.listas[state.tab];
    document.querySelectorAll('#tabs button').forEach(b => b.setAttribute('aria-selected', String(b.dataset.tab === state.tab)));
    $('#countSaques').textContent = (TOTAL_SAQUES_HISTORICO + state.listas.saques.length).toLocaleString('pt-BR');
    const vazio = !lista.length;
    $('#panelSaques').hidden = vazio;
    $('#panelVazio').hidden = !vazio;
    if (vazio) {
      $('#vazioTitulo').textContent = cfg.vazio;
      $('#vazioTexto').textContent = cfg.texto || '';
      return;
    }
    $('#panelSaques .panel-head h3').textContent = cfg.titulo;
    $('#panelSaques .panel-head p').textContent = cfg.sub;

    const rows = filtrar();
    const pages = Math.max(1, Math.ceil(rows.length / state.perPage));
    state.page = Math.min(state.page, pages);
    const ini = (state.page - 1) * state.perPage;
    const slice = rows.slice(ini, ini + state.perPage);
    $('#tbody').innerHTML = slice.length ? slice.map(s => {
      const taxa = s.taxa ?? TAXA;
      return `<tr data-id="${esc(s.id)}" class="${s.novo ? 'novo' : ''}">
        <td><span class="mono">${esc(s.id)}</span><span class="sub">${esc(s.uuid)}</span></td>
        <td><span class="pill">${esc(s.origem)}</span></td>
        <td><strong style="font-weight:500">${esc(s.nome)}</strong><span class="sub">Pix · ${esc(s.chave)}</span></td>
        <td class="strong">${mask('BRL', s.valor)}</td>
        <td class="dim">${mask('BRL', taxa)}</td>
        <td class="strong">${mask('BRL', s.valor + taxa)}</td>
        <td class="dim">${fmtData(s.data)}</td>
        <td><span class="status s-${s.status}">${s.status}</span></td>
        <td><button class="icon-btn" title="Ver detalhe" aria-label="Ver detalhe"><i data-i="eye"></i></button></td>
      </tr>`;
    }).join('') : `<tr class="no-rows"><td colspan="9">Nenhum resultado para esses filtros. <button class="btn" id="limparFiltros" style="margin-left:8px">Limpar filtros</button></td></tr>`;
    lista.forEach(s => { s.novo = false; });

    $('#pagerInfo').textContent = rows.length ? `Mostrando ${ini + 1}–${ini + slice.length} de ${rows.length.toLocaleString('pt-BR')}` : '';
    const nums = [];
    for (let p = 1; p <= pages; p++) if (p === 1 || p === pages || Math.abs(p - state.page) <= 1) nums.push(p); else if (nums[nums.length - 1] !== '…') nums.push('…');
    $('#pagerBtns').innerHTML = `<button class="btn" data-page="${state.page - 1}" ${state.page === 1 ? 'disabled' : ''}>Anterior</button>`
      + nums.map(p => p === '…' ? '<button class="btn" disabled>…</button>' : `<button class="btn ${p === state.page ? 'primary' : ''}" data-page="${p}">${p}</button>`).join('')
      + `<button class="btn" data-page="${state.page + 1}" ${state.page === pages ? 'disabled' : ''}>Próxima</button>`;
    paintIcons($('#tbody'));
  }

  function setTab(tab) {
    state.tab = tab; state.page = 1;
    const url = new URL(location.href); url.searchParams.set('lista', tab); history.replaceState(null, '', url);
    renderTabela();
  }

  // ---------- Drawer ----------
  let drawerAtual = null;
  function abrirDrawer(item) {
    drawerAtual = item;
    const taxa = item.taxa ?? TAXA;
    const passos = [['Solicitação recebida', item.data, '']];
    if (item.status === 'Pago') passos.push(['Enviado ao banco', new Date(item.data.getTime() + 4000), ''], ['Pagamento confirmado', new Date(item.data.getTime() + 9000), '']);
    if (item.status === 'Processando') passos.push(['Aguardando confirmação do banco', null, 'pending']);
    if (item.status === 'Recusado') passos.push(['Recusado pelo banco do recebedor', new Date(item.data.getTime() + 6000), 'fail']);
    $('#drawerBody').innerHTML = `
      <span class="status s-${item.status}">${item.status}</span>
      <dl class="dl">
        <dt>Solicitação</dt><dd class="mono">${esc(item.id)}</dd>
        <dt>Referência</dt><dd>${esc(item.uuid)}</dd>
        <dt>Origem</dt><dd>${esc(item.origem)}</dd>
        <dt>Recebedor</dt><dd>${esc(item.nome)}</dd>
        <dt>Chave</dt><dd>Pix · ${esc(item.chave)}</dd>
        <dt>Valor</dt><dd>${fmt.BRL(item.valor)}</dd>
        <dt>Taxa</dt><dd>${fmt.BRL(taxa)}</dd>
        <dt>Total debitado</dt><dd><strong>${fmt.BRL(item.valor + taxa)}</strong></dd>
        <dt>Data</dt><dd>${fmtData(item.data)}</dd>
      </dl>
      <h3 style="margin-bottom:10px">Linha do tempo</h3>
      <ul class="timeline">${passos.map(([l, d, c]) => `<li class="${c}">${l}<small>${d ? fmtData(d) : 'em andamento'}</small></li>`).join('')}</ul>
      <div style="display:flex;gap:8px">
        <button class="btn primary" data-acao="comprovante" ${item.status !== 'Pago' ? 'disabled' : ''}>Baixar comprovante</button>
        <button class="btn" data-acao="copiar-id">Copiar ID</button>
      </div>
      ${item.status === 'Recusado' ? '<p class="muted small" style="margin-top:12px">O valor e a taxa voltaram para o saldo disponível.</p>' : ''}`;
    $('#overlay').hidden = false;
    $('#drawer').classList.add('open');
    $('#drawer').setAttribute('aria-hidden', 'false');
  }
  function fecharDrawer() {
    drawerAtual = null;
    $('#drawer').classList.remove('open');
    $('#drawer').setAttribute('aria-hidden', 'true');
    $('#overlay').hidden = true;
  }

  // ---------- Modal ----------
  let onSubmit = null;
  function abrirModal({ titulo, corpo, botoes, submit }) {
    $('#modalTitle').textContent = titulo;
    $('#modalBody').innerHTML = corpo;
    $('#modalFoot').innerHTML = botoes;
    onSubmit = submit || null;
    $('#modal').hidden = false;
    paintIcons($('#modal'));
    const first = $('#modalBody input, #modalBody select');
    if (first) first.focus();
  }
  const fecharModal = () => { $('#modal').hidden = true; onSubmit = null; };

  function modalSacar(code) {
    const s = state.saldos[code];
    if (code !== 'BRL' || s.disponivel <= TAXA) {
      return abrirModal({
        titulo: `Sacar ${code}`,
        corpo: `<p class="muted">Você não tem saldo disponível em ${code} para sacar agora.</p>`,
        botoes: '<button type="button" class="btn primary" data-close>Entendi</button>',
      });
    }
    abrirModal({
      titulo: 'Sacar via Pix',
      corpo: `
        <div class="resume small">Disponível para saque: <strong>${fmt.BRL(s.disponivel)}</strong></div>
        <label class="field">Valor<input id="mValor" inputmode="decimal" placeholder="R$ 0,00" autocomplete="off"></label>
        <label class="field">Tipo de chave<select id="mTipo">${CHAVES.map(c => `<option>${c}</option>`).join('')}</select></label>
        <label class="field">Chave Pix<input id="mChave" placeholder="Ex.: financeiro@lojaexemplo.com" autocomplete="off"></label>
        <label class="field">Nome do recebedor<input id="mNome" placeholder="Como aparece no banco" autocomplete="off"></label>
        <div class="resume small" id="mResumo">Taxa ${fmt.BRL(TAXA)} · Total debitado ${fmt.BRL(TAXA)}</div>
        <div class="err" id="mErr"></div>`,
      botoes: '<button type="button" class="btn" data-close>Cancelar</button><button class="btn primary">Confirmar saque</button>',
      submit: () => {
        const valor = parseValor($('#mValor').value), chave = $('#mChave').value.trim(), nome = $('#mNome').value.trim();
        if (valor <= 0) return erro('Informe um valor maior que zero.');
        if (valor + TAXA > s.disponivel) return erro(`O total (${fmt.BRL(valor + TAXA)}) passa do saldo disponível.`);
        if (!chave) return erro('Informe a chave Pix do recebedor.');
        if (!nome) return erro('Informe o nome do recebedor.');
        s.disponivel = Math.round((s.disponivel - valor - TAXA) * 100) / 100;
        const item = { id: novoId(), uuid: novoUuid(), origem: 'Saque pelo painel', nome: nome.toUpperCase(), chave: $('#mTipo').value, valor, status: 'Processando', data: new Date(), novo: true };
        state.listas.saques.unshift(item);
        fecharModal();
        if (state.tab !== 'saques') setTab('saques');
        state.page = 1; renderCards(); renderTabela();
        toast('Saque solicitado. Assim que o banco confirmar, o status muda para Pago.');
        setTimeout(() => {
          item.status = 'Pago'; item.novo = true; renderTabela();
          if (drawerAtual === item) abrirDrawer(item);
          toast(`Saque de ${fmt.BRL(valor)} para ${item.nome} confirmado.`);
        }, 3500);
      },
    });
    $('#mValor').addEventListener('input', () => {
      const v = parseValor($('#mValor').value);
      $('#mResumo').textContent = `Taxa ${fmt.BRL(TAXA)} · Total debitado ${fmt.BRL(v + TAXA)}`;
    });
  }

  function modalDepositar(code) {
    if (code === 'MXN') return modalClabe();
    abrirModal({
      titulo: code === 'BRL' ? 'Depositar via Pix' : 'Depositar via Nequi / Bre-B',
      corpo: `<label class="field">Valor<input id="mValor" inputmode="decimal" placeholder="${code === 'BRL' ? 'R$ 0,00' : '$ 0'}" autocomplete="off"><small>${code === 'BRL' ? 'Geramos um Pix copia e cola válido por 30 minutos.' : 'Cobrança única: gera uma referência nova a cada depósito.'}</small></label><div class="err" id="mErr"></div>`,
      botoes: '<button type="button" class="btn" data-close>Cancelar</button><button class="btn primary">Gerar cobrança</button>',
      submit: () => {
        const valor = parseValor($('#mValor').value);
        if (valor <= 0) return erro('Informe um valor maior que zero.');
        const codigo = code === 'BRL' ? `00020126580014br.gov.bcb.pix0136${novoUuid()}5204000053039865406${valor.toFixed(2)}5802BR` : `BREB-${b36(10).toUpperCase()}`;
        abrirModal({
          titulo: 'Cobrança gerada',
          corpo: `<p class="muted small">Pague ${fmt[code](valor)} usando o código abaixo.</p>
            <div class="copy-box"><span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(codigo)}</span><button type="button" class="btn" data-copiar="${esc(codigo)}">Copiar</button></div>
            <p class="muted small">No protótipo, use “Simular pagamento” para ver o saldo subir.</p>`,
          botoes: '<button type="button" class="btn" data-close>Fechar</button><button class="btn primary">Simular pagamento</button>',
          submit: () => {
            state.saldos[code].disponivel += valor;
            fecharModal(); renderCards();
            toast(`Depósito de ${fmt[code](valor)} recebido.`);
          },
        });
      },
    });
  }

  function modalClabe() {
    const clabe = '646180157000000004';
    abrirModal({
      titulo: 'Minha chave CLABE',
      corpo: `<p class="muted small">Use esta CLABE para receber transferências SPEI em pesos mexicanos.</p>
        <div class="copy-box"><span>${clabe.replace(/(\d{3})(\d{3})(\d{11})(\d)/, '$1 $2 $3 $4')}</span><button type="button" class="btn" data-copiar="${clabe}">Copiar</button></div>
        <dl class="dl"><dt>Banco</dt><dd>STP (exemplo)</dd><dt>Titular</dt><dd>Loja Exemplo</dd></dl>`,
      botoes: '<button type="button" class="btn primary" data-close>Fechar</button>',
    });
  }

  function modalTransferir(code) {
    const s = state.saldos[code];
    if (s.disponivel <= 0) {
      return abrirModal({ titulo: `Transferir ${code}`, corpo: `<p class="muted">Sem saldo disponível em ${code} para transferir.</p>`, botoes: '<button type="button" class="btn primary" data-close>Entendi</button>' });
    }
    abrirModal({
      titulo: 'Transferência interna',
      corpo: `<div class="resume small">Disponível: <strong>${fmt[code](s.disponivel)}</strong> · sem taxa entre contas AmploPay</div>
        <label class="field">Conta de destino<select id="mDestino"><option>LOJA EXEMPLO FILIAL SUL</option><option>LOJA EXEMPLO FILIAL NORTE</option></select></label>
        <label class="field">Valor<input id="mValor" inputmode="decimal" placeholder="R$ 0,00" autocomplete="off"></label>
        <div class="err" id="mErr"></div>`,
      botoes: '<button type="button" class="btn" data-close>Cancelar</button><button class="btn primary">Transferir</button>',
      submit: () => {
        const valor = parseValor($('#mValor').value);
        if (valor <= 0) return erro('Informe um valor maior que zero.');
        if (valor > s.disponivel) return erro('O valor passa do saldo disponível.');
        s.disponivel = Math.round((s.disponivel - valor) * 100) / 100;
        state.listas.transferencias.unshift({ id: '#ti_' + b36(12), uuid: novoUuid(), origem: 'Transferência interna', nome: $('#mDestino').value, chave: 'Conta AmploPay', valor, status: 'Pago', data: new Date(), taxa: 0, novo: true });
        fecharModal(); renderCards(); setTab('transferencias');
        toast(`Transferência de ${fmt[code](valor)} concluída.`);
      },
    });
  }
  const erro = msg => { $('#mErr').textContent = msg; };

  // ---------- Toast ----------
  let toastTimer;
  function toast(msg) {
    const el = $('#toast');
    el.textContent = msg; el.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { el.hidden = true; }, 3200);
  }

  // ---------- Eventos ----------
  document.addEventListener('click', e => {
    const t = e.target;
    const nav = t.closest('[data-nav]');
    if (nav) { e.preventDefault(); return toast(`“${nav.dataset.nav}” não faz parte deste protótipo.`); }
    if (t.closest('[data-close]')) { fecharModal(); fecharDrawer(); return; }
    const copiar = t.closest('[data-copiar]');
    if (copiar) { navigator.clipboard?.writeText(copiar.dataset.copiar).catch(() => {}); return toast('Copiado.'); }
    const acao = t.closest('[data-acao]');
    if (acao) {
      const m = acao.dataset.moeda;
      ({
        depositar: () => modalDepositar(m), sacar: () => modalSacar(m), transferir: () => modalTransferir(m), clabe: modalClabe,
        comprovante: () => toast('No produto, aqui baixa o comprovante em PDF.'),
        'copiar-id': () => { navigator.clipboard?.writeText(drawerAtual.id).catch(() => {}); toast('ID copiado.'); },
      })[acao.dataset.acao]?.();
      return;
    }
    const page = t.closest('[data-page]');
    if (page && !page.disabled) { state.page = Number(page.dataset.page); renderTabela(); return; }
    if (t.closest('#limparFiltros')) { ['#fBusca', '#fOrigem', '#fStatus', '#fPeriodo'].forEach(s => { $(s).value = ''; }); state.page = 1; renderTabela(); return; }
    const tr = t.closest('#tbody tr[data-id]');
    if (tr) { const item = state.listas[state.tab].find(s => s.id === tr.dataset.id); if (item) abrirDrawer(item); }
  });

  $('#overlay').addEventListener('click', fecharDrawer);
  $('#modal').addEventListener('click', e => { if (e.target.id === 'modal') fecharModal(); });
  $('#modalForm').addEventListener('submit', e => { e.preventDefault(); onSubmit?.(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { fecharModal(); fecharDrawer(); } });

  $('#tabs').addEventListener('click', e => { const b = e.target.closest('[data-tab]'); if (b) setTab(b.dataset.tab); });
  ['#fBusca', '#fOrigem', '#fStatus', '#fPeriodo'].forEach(s => $(s).addEventListener('input', () => { state.page = 1; renderTabela(); }));

  $('#toggleRelatorios').addEventListener('click', e => {
    const btn = e.currentTarget, aberto = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!aberto));
    $('#submenuRelatorios').hidden = aberto;
  });
  $('#toggleSidebar').addEventListener('click', () => {
    const app = $('#app');
    app.classList.toggle(window.innerWidth <= 720 ? 'open-mobile' : 'collapsed');
  });
  $('#toggleTheme').addEventListener('click', e => {
    const dark = document.documentElement.dataset.theme !== 'dark';
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    e.currentTarget.querySelector('i').dataset.i = dark ? 'moon' : 'sun';
    paintIcons(e.currentTarget);
  });
  $('#toggleValores').addEventListener('click', e => {
    state.ocultar = !state.ocultar;
    const i = e.currentTarget.querySelector('i');
    i.dataset.i = state.ocultar ? 'eyeOff' : 'eye';
    e.currentTarget.title = state.ocultar ? 'Mostrar valores' : 'Ocultar valores';
    paintIcons(e.currentTarget); renderCards(); renderTabela();
  });
  $('#verDetalhe').addEventListener('click', e => {
    e.preventDefault();
    const card = $('#card-BRL');
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    card.classList.add('flash');
    setTimeout(() => card.classList.remove('flash'), 1600);
  });

  // ---------- Início ----------
  const inicial = new URL(location.href).searchParams.get('lista');
  if (TABS[inicial]) state.tab = inicial;
  paintIcons();
  renderCards();
  renderTabela();
})();
