/* Protótipo v2 — Visão geral do lojista Nalapay. Dados fictícios, gerados aqui. */
(() => {
  'use strict';
  const $ = s => document.querySelector(s);
  const esc = window.escHtml;
  const brl = v => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const num = v => v.toLocaleString('pt-BR');
  const pct = v => v.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + '%';
  const fmtD = d => d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  const fmtDia = d => d.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit' }).replace('.', '');
  let seed = 11; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

  // 90 dias fictícios com o mesmo "desenho" do print (picos e vales)
  const BASE = [0.4, 1.2, 14.8, 7.1, 6.3, 2.0, 8.9, 5.6, 6.8, 12.9, 3.1, 0.6, 0.3, 0.5, 1.4, 0.4, 0.9, 1.1, 0.5, 0.4, 2.6, 0.9, 3.4, 3.9, 6.2, 7.8, 5.3, 12.6, 6.1];
  const hoje = new Date(); hoje.setHours(0, 0, 0, 0);
  const DIAS = Array.from({ length: 120 }, (_, i) => {
    const d = new Date(hoje.getTime() - (119 - i) * 86400000);
    const v = (BASE[(i + 120 - 29 * 5) % 29] * (0.75 + rnd() * 0.5)) * 1000;
    const tent = Math.round(v / 52.8 / 0.47);
    return { d, valor: Math.round(v * 100) / 100, vendas: Math.round(v / 52.8), tentativas: tent };
  });

  const state = { periodo: 30, ocultar: false, saldo: 18205.60, filtro: '', meta: 1000000 };
  const mask = s => state.ocultar ? '••••••' : s;

  function janela(n, offset = 0) { return DIAS.slice(DIAS.length - n - offset, DIAS.length - offset); }
  function soma(lista) {
    const valor = lista.reduce((a, x) => a + x.valor, 0), vendas = lista.reduce((a, x) => a + x.vendas, 0), tent = lista.reduce((a, x) => a + x.tentativas, 0);
    return { valor, vendas, tent, ticket: vendas ? valor / vendas : 0, conv: tent ? (vendas / tent) * 100 : 0 };
  }

  // ---------- Cabeçalho e meta (S0020, S0022, S0025) ----------
  function renderHead() {
    const atual = janela(state.periodo);
    $('#subtitulo').textContent = `Resumo das suas vendas em BRL · ${atual[0].d.toLocaleDateString('pt-BR')} a ${atual[atual.length - 1].d.toLocaleDateString('pt-BR')}`;
    const mes = DIAS.filter(x => x.d.getMonth() === hoje.getMonth()).reduce((a, x) => a + x.valor, 0) + 228000;
    $('#metaTxt').textContent = state.ocultar ? '••••' : `R$ ${Math.round(mes / 1000)} mil de R$ 1 mi`;
    $('#metaBar').style.width = Math.min(100, mes / state.meta * 100) + '%';
  }

  // ---------- Indicadores (S0032, S0014, S0033) ----------
  function renderKpis() {
    const a = soma(janela(state.periodo)), b = soma(janela(state.periodo, state.periodo));
    const delta = (x, y) => y ? ((x - y) / y) * 100 : 0;
    const k = [
      ['dollar', 'Aprovado', brl(a.valor), delta(a.valor, b.valor), 'Soma das vendas aprovadas no período.'],
      ['ticket', 'Ticket médio', brl(a.ticket), delta(a.ticket, b.ticket), 'Aprovado ÷ número de vendas aprovadas.'],
      ['checkC', 'Transações aprovadas', num(a.vendas), delta(a.vendas, b.vendas), 'Quantidade de vendas aprovadas.'],
      ['wallet', 'Saldo disponível', brl(state.saldo), null, 'Valor que pode ser sacado agora. Não depende do período.'],
      ['pct', 'Conversão geral', pct(a.conv), a.conv - b.conv, 'Vendas aprovadas ÷ tentativas de pagamento.', true],
    ];
    $('#kpis').innerHTML = k.map(([ic, l, v, d, tip, pp]) => {
      let badge;
      if (d === null) badge = '<span class="pill neutral">Posição atual</span>';
      else {
        const up = d >= 0, txt = (up ? '+' : '−') + Math.abs(d).toLocaleString('pt-BR', { maximumFractionDigits: 1 }) + (pp ? ' p.p.' : '%');
        badge = `<span class="pill ${up ? 'up' : 'down'}"><i data-i="${up ? 'arrowUp' : 'arrowDown'}"></i>${txt}</span><span>vs. ${state.periodo} dias anteriores</span>`;
      }
      return `<article class="kpi"><div class="kpi-top"><span class="ic"><i data-i="${ic}"></i></span>${l}<i data-i="info" class="info" title="${esc(tip)}" aria-label="${esc(tip)}"></i></div>
        <strong>${mask(v)}</strong><div class="delta">${badge}</div></article>`;
    }).join('');
    window.pintarIcones($('#kpis'));
  }

  // ---------- Meios de pagamento (S0023) ----------
  const meios = { cartao: 'inativo' };
  function renderMeios() {
    const a = soma(janela(state.periodo));
    const cartao = meios.cartao === 'ativo'
      ? `<div class="meio-top"><i data-i="card"></i><b>Cartão</b><span class="pill up">Ativo</span><span class="val dim">—</span></div><p>Ativado agora. As vendas no cartão aparecem aqui.</p>`
      : meios.cartao === 'analise'
        ? `<div class="meio-top"><i data-i="card"></i><b>Cartão</b><span class="pill pend">Em análise</span></div><p>Recebemos o pedido. Avisamos por e-mail quando for aprovado.</p>`
        : `<div class="meio-top"><i data-i="card"></i><b>Cartão</b><span class="pill neutral">Não ativado</span></div>
           <div class="meio-row"><p>Receba suas vendas no cartão em D+2.</p><button class="btn sm" id="ativarCartao"><i data-i="plus"></i>Ativar cartão</button></div>`;
    $('#meios').innerHTML = `
      <div class="meio"><div class="meio-top"><i data-i="pix"></i><b>Pix</b><span class="pill up">Ativo</span><span class="val">${pct(a.conv)}</span></div>
        <div class="bar"><span style="width:${a.conv}%"></span></div><p>${num(a.vendas)} aprovadas de ${num(a.tent)} tentativas</p></div>
      <div class="meio">${cartao}</div>
      <div class="meio"><div class="meio-top"><i data-i="barcode"></i><b>Boleto</b><span class="pill up">Ativo</span><span class="val dim">—</span></div><p>Sem boletos emitidos no período.</p></div>`;
    window.pintarIcones($('#meios'));
    $('#ativarCartao')?.addEventListener('click', modalCartao);
  }

  // ---------- Gráfico com eixos e tooltip ----------
  function renderChart() {
    const dados = janela(state.periodo);
    const svg = $('#chartSvg'), W = svg.clientWidth || 640, H = 280, L = 64, R = 12, T = 10, B = 28;
    const max = Math.ceil(Math.max(...dados.map(x => x.valor)) / 4000) * 4000 || 4000;
    const x = i => L + (i / (dados.length - 1)) * (W - L - R), y = v => T + (1 - v / max) * (H - T - B);
    const pts = dados.map((p, i) => [x(i), y(p.valor)]);
    let d = `M${pts[0][0]} ${pts[0][1]}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
      d += ` C${p1[0] + (p2[0] - p0[0]) / 6} ${Math.min(H - B, p1[1] + (p2[1] - p0[1]) / 6)} ${p2[0] - (p3[0] - p1[0]) / 6} ${Math.min(H - B, p2[1] - (p3[1] - p1[1]) / 6)} ${p2[0]} ${p2[1]}`;
    }
    const ticks = [0, 0.25, 0.5, 0.75, 1].map(f => f * max);
    const passo = Math.ceil(dados.length / 8);
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.innerHTML = `<defs><linearGradient id="gv" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#22c55e" stop-opacity=".35"/><stop offset="1" stop-color="#22c55e" stop-opacity=".02"/></linearGradient></defs>
      ${ticks.map(v => `<line x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}" stroke="var(--grid)"/><text x="${L - 8}" y="${y(v) + 3}" text-anchor="end">${v ? 'R$ ' + (v / 1000).toLocaleString('pt-BR') + ' mil' : 'R$ 0'}</text>`).join('')}
      <path d="${d} L${x(dados.length - 1)} ${H - B} L${L} ${H - B} Z" fill="url(#gv)"/>
      <path d="${d}" fill="none" stroke="#22c55e" stroke-width="1.8"/>
      ${dados.map((p, i) => i % passo === 0 ? `<text x="${x(i)}" y="${H - 8}" text-anchor="middle">${fmtD(p.d)}</text>` : '').join('')}
      <line id="cursor" y1="${T}" y2="${H - B}" stroke="#a1a1aa" stroke-dasharray="3 3" visibility="hidden"/>
      <circle id="ponto" r="5" fill="var(--bg)" stroke="#16a34a" stroke-width="2" visibility="hidden"/>
      <rect x="${L}" y="${T}" width="${W - L - R}" height="${H - T - B}" fill="transparent" id="hit"/>`;
    const tip = $('#tip'), hit = svg.querySelector('#hit');
    hit.addEventListener('mousemove', e => {
      const r = svg.getBoundingClientRect(), mx = (e.clientX - r.left) * (W / r.width);
      const i = Math.max(0, Math.min(dados.length - 1, Math.round(((mx - L) / (W - L - R)) * (dados.length - 1))));
      const p = dados[i];
      svg.querySelector('#cursor').setAttribute('x1', x(i)); svg.querySelector('#cursor').setAttribute('x2', x(i));
      svg.querySelector('#cursor').setAttribute('visibility', 'visible');
      const c = svg.querySelector('#ponto'); c.setAttribute('cx', x(i)); c.setAttribute('cy', y(p.valor)); c.setAttribute('visibility', 'visible');
      tip.hidden = false; tip.style.left = (x(i) / W * r.width) + 'px'; tip.style.top = (y(p.valor) / H * r.height) + 'px';
      tip.innerHTML = `<span>${fmtDia(p.d)}</span><b>${mask(brl(p.valor))}</b>${num(p.vendas)} vendas · Pix`;
    });
    hit.addEventListener('mouseleave', () => { tip.hidden = true; svg.querySelector('#cursor').setAttribute('visibility', 'hidden'); svg.querySelector('#ponto').setAttribute('visibility', 'hidden'); });
  }

  // ---------- Transações (S0024) ----------
  const PROD = [['Curso de Fotografia', 97], ['Planner Digital 2027', 35], ['Mentoria em Grupo', 297], ['E-book Receitas Fit', 27], ['Comunidade Pro', 49.9]];
  const CLI = ['Mariana C.', 'Rafael A.', 'Juliana P.', 'Bruno D.', 'Letícia M.', 'Thiago R.', 'Camila F.', 'Eduardo B.'];
  const STS = ['Aprovada', 'Aprovada', 'Pendente', 'Aprovada', 'Recusada', 'Aprovada', 'Aprovada', 'Pendente', 'Aprovada', 'Aprovada'];
  let t0 = Date.now();
  const TX = STS.map((s, i) => { const [p, v] = PROD[i % PROD.length]; t0 -= (2 + Math.floor(rnd() * 9)) * 60000; return { id: 'tx_' + (9050 - i), prod: p, valor: v, cli: CLI[i % CLI.length], status: s, data: new Date(t0) }; });
  const ST = { Aprovada: ['up', 'check'], Pendente: ['pend', 'clock'], Recusada: ['down', 'x'] };
  function renderTx() {
    const lista = TX.filter(x => !state.filtro || x.status === state.filtro).slice(0, 6);
    $('#tx').innerHTML = lista.length ? lista.map(x => `<li data-id="${x.id}" class="${x.status === 'Recusada' ? 'strike' : ''}" tabindex="0">
      <span class="tic"><i data-i="pix"></i></span>
      <div class="mid"><b>${esc(x.prod)}</b><small>${esc(x.cli)} · Pix · hoje às ${x.data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</small></div>
      <div class="right"><b>${mask(brl(x.valor))}</b><span class="pill ${ST[x.status][0]}"><i data-i="${ST[x.status][1]}"></i>${x.status}</span></div></li>`).join('')
      : '<li class="empty-li">Nenhuma transação com esse status hoje.</li>';
    window.pintarIcones($('#tx'));
  }
  function abrirTx(id) {
    const x = TX.find(t => t.id === id);
    $('#drawerBody').innerHTML = `<span class="pill ${ST[x.status][0]}"><i data-i="${ST[x.status][1]}"></i>${x.status}</span>
      <dl class="dl"><dt>Produto</dt><dd>${esc(x.prod)}</dd><dt>Cliente</dt><dd>${esc(x.cli)} (dados mascarados)</dd><dt>Método</dt><dd>Pix</dd>
      <dt>Valor</dt><dd><b>${brl(x.valor)}</b></dd><dt>Data</dt><dd>${x.data.toLocaleString('pt-BR')}</dd><dt>ID</dt><dd>${x.id}</dd></dl>
      ${x.status === 'Recusada' ? '<p class="muted small">O pagamento não foi concluído pelo cliente ou foi recusado pelo banco.</p>' : ''}
      ${x.status === 'Pendente' ? '<p class="muted small">Aguardando o pagamento do Pix. O código expira em 30 minutos.</p>' : ''}`;
    window.pintarIcones($('#drawerBody'));
    $('#overlay').hidden = false; $('#drawer').classList.add('open'); $('#drawer').setAttribute('aria-hidden', 'false');
  }
  const fecharDrawer = () => { $('#overlay').hidden = true; $('#drawer').classList.remove('open'); $('#drawer').setAttribute('aria-hidden', 'true'); };

  // ---------- Modais ----------
  let onSubmit = null;
  function modal(titulo, corpo, acao, submit) {
    $('#modalTitulo').textContent = titulo; $('#modalBody').innerHTML = corpo;
    $('#modalFoot').innerHTML = `<button type="button" class="btn" data-close>${acao ? 'Cancelar' : 'Fechar'}</button>${acao ? `<button class="btn primary">${acao}</button>` : ''}`;
    onSubmit = submit || null; $('#modal').hidden = false; window.pintarIcones($('#modal'));
    $('#modalBody input, #modalBody select')?.focus();
  }
  const fecharModal = () => { $('#modal').hidden = true; onSubmit = null; };
  const erro = m => { $('#mErr').textContent = m; };
  const valorDe = s => Number(String(s).replace(/[^\d,]/g, '').replace(',', '.')) || 0;

  function modalSacar() {
    modal('Sacar via Pix', `<div class="resume">Disponível para saque: <b>${brl(state.saldo)}</b> · taxa R$ 0,50</div>
      <label class="field">Valor<input id="mValor" inputmode="decimal" placeholder="R$ 0,00"></label>
      <label class="field">Chave Pix cadastrada<select id="mChave"><option>CNPJ · 12.345.678/0001-99</option><option>E-mail · financeiro@lojaexemplo.com</option></select></label>
      <p class="err" id="mErr"></p>`, 'Confirmar saque', () => {
      const v = valorDe($('#mValor').value);
      if (v <= 0) return erro('Informe um valor maior que zero.');
      if (v + 0.5 > state.saldo) return erro('O valor mais a taxa passa do saldo disponível.');
      state.saldo -= v + 0.5; fecharModal(); renderKpis(); toast(`Saque de ${brl(v)} solicitado. Cai na conta em alguns segundos.`);
    });
  }
  function modalDepositar() {
    modal('Depositar via Pix', `<label class="field">Valor<input id="mValor" inputmode="decimal" placeholder="R$ 0,00"></label><p class="err" id="mErr"></p>`, 'Gerar Pix', () => {
      const v = valorDe($('#mValor').value);
      if (v <= 0) return erro('Informe um valor maior que zero.');
      const cod = '00020126580014br.gov.bcb.pix0136' + Math.random().toString(16).slice(2, 14) + '5204000053039865406' + v.toFixed(2);
      modal('Pix gerado', `<p class="muted">Pague ${brl(v)} com o código abaixo. Válido por 30 minutos.</p><div class="copy"><span>${cod}</span><button type="button" class="btn sm" data-copiar="${cod}"><i data-i="copy"></i>Copiar</button></div>`, 'Simular pagamento', () => {
        state.saldo += v; fecharModal(); renderKpis(); toast(`Depósito de ${brl(v)} recebido.`);
      });
    });
  }
  function modalCartao() {
    modal('Ativar cartão de crédito', `<p class="muted">Para vender no cartão, a Nalapay precisa de algumas informações sobre o seu negócio.</p>
      <ol class="steps"><li>Confirme o segmento e o faturamento médio.</li><li>Aceite as taxas do cartão (D+2).</li><li>Aguarde a análise. Avisamos por e-mail.</li></ol>
      <label class="field">Faturamento médio mensal<select id="mFat"><option>Até R$ 50 mil</option><option>R$ 50 mil a R$ 200 mil</option><option>Acima de R$ 200 mil</option></select></label>`,
      'Solicitar ativação', () => {
        meios.cartao = 'analise'; fecharModal(); renderMeios(); toast('Pedido enviado. O cartão entrou em análise.');
        setTimeout(() => { meios.cartao = 'ativo'; renderMeios(); toast('Cartão ativado!'); }, 3500);
      });
  }
  function modalMeta() {
    modal('Meta do mês', `<p class="muted">Faturamento aprovado no mês corrente, comparado com a meta de R$ 1 milhão.</p>
      <div class="resume">${$('#metaTxt').textContent} · ${$('#metaBar').style.width.replace('.', ',').replace(/(\d+,\d)\d*%/, '$1%')}</div>
      <p class="muted small">Ao atingir a meta, você recebe a placa de premiação.</p>`, null);
  }
  let tt;
  const toast = m => { const el = $('#toast'); el.textContent = m; el.hidden = false; clearTimeout(tt); tt = setTimeout(() => { el.hidden = true; }, 3200); };

  // ---------- Eventos ----------
  document.addEventListener('click', e => {
    const nav = e.target.closest('[data-nav]');
    if (nav) { e.preventDefault(); return toast(`“${nav.dataset.nav}” não faz parte deste protótipo.`); }
    if (e.target.closest('[data-close]')) { fecharModal(); fecharDrawer(); return; }
    const cp = e.target.closest('[data-copiar]'); if (cp) { navigator.clipboard?.writeText(cp.dataset.copiar).catch(() => {}); return toast('Copiado.'); }
    const f = e.target.closest('[data-f]');
    if (f) { state.filtro = f.dataset.f; document.querySelectorAll('[data-f]').forEach(b => b.setAttribute('aria-pressed', String(b === f))); return renderTx(); }
    const li = e.target.closest('#tx li[data-id]'); if (li) abrirTx(li.dataset.id);
  });
  $('#tx').addEventListener('keydown', e => { const li = e.target.closest('li[data-id]'); if (li && e.key === 'Enter') abrirTx(li.dataset.id); });
  $('#overlay').addEventListener('click', fecharDrawer);
  $('#modal').addEventListener('click', e => { if (e.target.id === 'modal') fecharModal(); });
  $('#modalForm').addEventListener('submit', e => { e.preventDefault(); onSubmit?.(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { fecharModal(); fecharDrawer(); } });
  $('#periodo').addEventListener('change', e => { state.periodo = Number(e.target.value); renderAll(); });
  $('#olho').addEventListener('click', e => {
    state.ocultar = !state.ocultar; e.currentTarget.querySelector('i').dataset.i = state.ocultar ? 'eyeOff' : 'eye';
    e.currentTarget.title = state.ocultar ? 'Mostrar valores' : 'Ocultar valores'; window.pintarIcones(e.currentTarget); renderAll();
  });
  $('#sacar').addEventListener('click', modalSacar);
  $('#depositar').addEventListener('click', modalDepositar);
  $('#meta').addEventListener('click', modalMeta);
  $('#relatorios').addEventListener('click', e => { const a = e.currentTarget.getAttribute('aria-expanded') === 'true'; e.currentTarget.setAttribute('aria-expanded', String(!a)); $('#subRel').hidden = a; });
  $('#recolher').addEventListener('click', () => $('#app').classList.toggle(innerWidth <= 760 ? 'open' : 'collapsed'));
  $('#tema').addEventListener('click', e => {
    const dark = document.documentElement.dataset.theme !== 'dark'; document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    e.currentTarget.querySelector('i').dataset.i = dark ? 'moon' : 'sun'; window.pintarIcones(e.currentTarget);
  });
  addEventListener('resize', () => renderChart());

  function renderAll() { renderHead(); renderKpis(); renderMeios(); renderChart(); renderTx(); }
  window.pintarIcones();
  renderAll();
})();
