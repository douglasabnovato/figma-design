/* Protótipo v2 — Dashboard Admin (backoffice Nalapay). Dados fictícios, gerados aqui. */
(() => {
  'use strict';
  const $ = s => document.querySelector(s);
  const esc = window.escHtml;
  let seed = 23; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const MOEDAS = {
    BRL: { f: v => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), k: 1 },
    MXN: { f: v => 'MX$ ' + v.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 }), k: 0.022 },
    COP: { f: v => 'COP$ ' + v.toLocaleString('es-CO', { maximumFractionDigits: 0 }), k: 0.9 },
  };
  const num = v => Math.round(v).toLocaleString('pt-BR');
  const pct = (v, d = 1) => v.toLocaleString('pt-BR', { minimumFractionDigits: d, maximumFractionDigits: d }) + '%';
  const fmtD = d => d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  const fmtDia = d => d.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit' }).replace('.', '');

  const BASE = [0.3, 2.1, 9.8, 7.0, 3.2, 6.1, 4.4, 5.0, 14.6, 13.1, 6.0, 2.2, 0.8, 0.4, 0.6, 0.3, 0.5, 0.9, 0.4, 0.3, 1.3, 2.5, 3.6, 2.1, 1.8, 3.9, 6.8, 12.1, 9.4];
  const hoje = new Date(); hoje.setHours(0, 0, 0, 0);
  const DIAS = Array.from({ length: 180 }, (_, i) => {
    const d = new Date(hoje.getTime() - (179 - i) * 86400000);
    const valor = BASE[i % 29] * 10000 * (0.7 + rnd() * 0.6);
    const vendas = valor / 53.4, tentativas = vendas / (0.40 + rnd() * 0.07);
    return { d, valor, vendas, tentativas, novos: rnd() < 0.55 ? 1 + Math.floor(rnd() * 3) : 0, reemb: rnd() < 0.08 ? 256 : 0, cb: rnd() < 0.08 ? 30.6 : 0 };
  });
  const CONTAS = [
    { id: 10482, nome: 'Conta Alfa Digital Ltda.', cob: 402, taxa: 2810.10, custo: 1605.80 },
    { id: 10311, nome: 'Beta Cursos Online ME', cob: 1980, taxa: 5230.40, custo: 5042.30 },
    { id: 10955, nome: 'Gama Pagamentos Ltda.', cob: 81, taxa: 402.10, custo: 241.20 },
    { id: 11020, nome: 'Daniel Souza (MEI)', cob: 590, taxa: 1520.00, custo: 1397.60 },
    { id: 11107, nome: 'Estúdio Prisma ME', cob: 0, taxa: 58.20, custo: 0, alerta: 'Lucro vem de um ajuste manual de tarifa (fictício) lançado em 02/11, e não de cobranças.' },
    { id: 10777, nome: 'Ômega Treinamentos Ltda.', cob: 1210, taxa: 1240.15, custo: 2311.05 },
    { id: 10650, nome: 'Sigma Store ME', cob: 820, taxa: 610.40, custo: 1148.00 },
    { id: 10599, nome: 'Kappa Digital Eireli', cob: 330, taxa: 392.80, custo: 1160.50 },
  ];
  const state = { periodo: 30, moeda: 'BRL', ocultar: false, metrica: 'valor', avisos: [] };
  const M = () => MOEDAS[state.moeda];
  const money = v => state.ocultar ? '••••••' : M().f(v * M().k);
  const janela = (n, off = 0) => DIAS.slice(DIAS.length - n - off, DIAS.length - off);
  function soma(l) {
    const s = k => l.reduce((a, x) => a + x[k], 0);
    const valor = s('valor'), vendas = s('vendas'), tent = s('tentativas');
    const taxa = valor * 0.00955, custo = valor * 0.01005;
    return { valor, vendas, tent, novos: s('novos'), conv: vendas / tent * 100, ticket: valor / vendas, taxa, custo, lucro: taxa - custo, reemb: s('reemb'), cb: s('cb'), nReemb: l.filter(x => x.reemb).length, nCb: l.filter(x => x.cb).length };
  }
  const delta = (a, b) => (a - b) / b * 100;
  const pill = (d, sufixo = '%', inverso = false) => {
    const bom = inverso ? d <= 0 : d >= 0;
    return `<span class="pill ${bom ? 'up' : 'down'}"><i data-i="${d >= 0 ? 'arrowUp' : 'arrowDown'}"></i>${d >= 0 ? '+' : '−'}${Math.abs(d).toLocaleString('pt-BR', { maximumFractionDigits: 1 })}${sufixo}</span>`;
  };
  const vs = () => `<span>vs. ${state.periodo} dias anteriores</span>`;
  const top = (ic, l, tip, neg) => `<div class="kpi-top"><span class="ic ${neg ? 'neg' : ''}"><i data-i="${ic}"></i></span>${l}<i data-i="info" class="info" title="${esc(tip)}" aria-label="${esc(tip)}"></i></div>`;

  function render() {
    const a = soma(janela(state.periodo)), b = soma(janela(state.periodo, state.periodo));
    const ini = janela(state.periodo)[0].d, fim = hoje;
    $('#subtitulo').textContent = `Desempenho do gateway em ${state.moeda} · ${ini.toLocaleDateString('pt-BR')} a ${fim.toLocaleDateString('pt-BR')} · comparado aos ${state.periodo} dias anteriores`;
    // Volume (S0013, S0014)
    $('#volume').innerHTML = `
      <article class="card kpi">${top('arrowUp', 'Faturamento', 'Volume bruto aprovado no período.')}<strong>${money(a.valor)}</strong><div class="delta">${pill(delta(a.valor, b.valor))}${vs()}</div></article>
      <article class="card kpi">${top('users', 'Novos produtores', 'Contas criadas no período.')}<strong>${num(a.novos)}</strong><div class="delta">${pill(a.novos - b.novos, '')}${vs()}</div></article>
      <article class="card kpi">${top('ticket', 'Ticket médio', 'Faturamento ÷ cobranças aprovadas.')}<strong>${money(a.ticket)}</strong><div class="delta">${pill(delta(a.ticket, b.ticket))}${vs()}</div></article>`;
    // Resultado (S0012)
    const contasNeg = CONTAS.filter(c => c.taxa - c.custo < 0).length;
    $('#resultado').innerHTML = `
      <article class="card kpi">${top('chart', 'Lucro apurado', 'Taxa cobrada dos produtores − custo pago às adquirentes.', a.lucro < 0)}
        <strong class="${a.lucro < 0 ? 'neg' : ''}">${a.lucro < 0 && !state.ocultar ? '−' : ''}${money(Math.abs(a.lucro))}</strong>
        <div class="formula"><span>Taxa cobrada</span><b>${money(a.taxa)}</b><span>− Custo da adquirente</span><b>${money(a.custo)}</b></div>
        ${contasNeg ? `<div class="alerta"><i data-i="warn"></i>${contasNeg} contas com custo maior que a taxa</div>` : ''}
        <a class="link" id="detalhar">Ver detalhamento por conta →</a></article>
      <article class="card kpi">${top('doc', 'Custo da adquirente', 'Valor pago às adquirentes pelas cobranças apuradas.')}<strong>${money(a.custo)}</strong>
        <div class="delta">${pill(delta(a.custo, b.custo), '%', true)}${vs()}</div><p class="extra">Sobre ${num(a.vendas)} cobranças apuradas<br>Média: ${money(a.custo / a.vendas)} por cobrança</p></article>
      <article class="card kpi">${top('pct', 'Taxa de conversão', 'Cobranças aprovadas ÷ cobranças geradas.')}<strong>${pct(a.conv)}</strong>
        <div class="delta">${pill(a.conv - b.conv, ' p.p.')}${vs()}</div><p class="extra">${num(a.vendas)} aprovadas de ${num(a.tent)}</p><div class="bar"><span style="width:${a.conv}%"></span></div></article>`;
    // Risco (S0016) — limite de referência 1% [A CONFIRMAR]
    const risco = (ic, l, v, n, tip) => {
      const p = v / a.valor * 100, w = Math.min(100, p / 1 * 100);
      const st = p >= 0.75 ? '<span class="pill warnp"><i data-i="warn"></i>Atenção</span>' : '<span class="pill up"><i data-i="check"></i>Dentro do limite</span>';
      return `<article class="card kpi"><div class="kpi-top"><span class="ic"><i data-i="${ic}"></i></span>${l}<i data-i="info" class="info" title="${esc(tip)}"></i>${st}</div>
        <strong>${money(v)} <small class="muted" style="font-size:11px;font-weight:400">${n} ocorrência${n === 1 ? '' : 's'}</small></strong>
        <div class="bar"><span style="width:${Math.max(1, w)}%"></span><span class="mark" style="left:75%"></span></div>
        <div class="risk-foot"><span>${pct(p, 2)} do volume · limite de referência 1,00%</span><b>atenção a partir de 0,75%</b></div></article>`;
    };
    $('#risco').innerHTML = risco('undo', 'Reembolsos', a.reemb, a.nReemb, 'Valor devolvido aos compradores no período.') + risco('file', 'Chargebacks', a.cb, a.nCb, 'Contestações abertas pelos portadores de cartão.');
    // Saldos (posição atual)
    $('#saldos').innerHTML = [['Disponível', 41906.77, 'Pode ser sacado agora'], ['Pendente', 0, 'Aguardando compensação'], ['Retido', 0, 'Reserva de cartão a liberar']]
      .map(([l, v, s]) => `<div class="saldo"><div><b>${l}</b><small>${s}</small></div><strong>${money(v)}</strong></div>`).join('');
    // Contas (S0015)
    const rank = [...CONTAS].sort((x, y) => (y.taxa - y.custo) - (x.taxa - x.custo)).slice(0, 5);
    $('#contas').innerHTML = rank.map(c => `<li data-conta="${c.id}" tabindex="0"><span class="ini">${c.nome.split(' ').map(w => w[0]).slice(0, 2).join('')}</span>
      <div class="nm"><b>${esc(c.nome)}</b><small class="${c.alerta ? 'w' : ''}">ID ${c.id} · ${c.cob ? num(c.cob) + ' cobranças' : '0 cobranças no período'}</small></div>
      ${c.alerta ? '<i data-i="warn" class="warn-i" title="Lucro sem cobrança no período"></i>' : ''}<span class="v">${money(c.taxa - c.custo)}</span></li>`).join('')
      + (rank.some(c => c.alerta) ? '<li class="note" style="cursor:default"><i data-i="info"></i>Lucro sem cobrança no período: clique na conta para ver a origem.</li>' : '');
    // Avisos
    $('#avisos').innerHTML = state.avisos.length ? state.avisos.map(x => `<li><b>${esc(x.titulo)}</b><small>Publicado agora · ${esc(x.publico)}</small></li>`).join('')
      : '<li class="vazio">Nenhum aviso publicado. Os lojistas veem os avisos no topo do painel deles.</li>';
    window.pintarIcones($('.content'));
    $('#detalhar').addEventListener('click', detalhar);
    renderChart();
  }

  // ---------- Gráfico (S0017) ----------
  function renderChart() {
    const dados = janela(state.periodo), met = state.metrica;
    const val = p => met === 'valor' ? p.valor * M().k : met === 'vendas' ? p.vendas : p.vendas / p.tentativas * 100;
    $('#chartSub').textContent = met === 'valor' ? `Volume aprovado por dia · ${state.moeda}` : met === 'vendas' ? 'Cobranças aprovadas por dia' : 'Conversão diária (%)';
    const svg = $('#chartSvg'), W = svg.clientWidth || 700, H = 260, L = 78, R = 10, T = 12, B = 26;
    const raw = Math.max(...dados.map(val)), passoY = met === 'conv' ? 25 : Math.pow(10, Math.floor(Math.log10(raw))) * (raw / Math.pow(10, Math.floor(Math.log10(raw))) > 5 ? 2 : 1);
    const max = met === 'conv' ? 100 : Math.ceil(raw / passoY) * passoY;
    const x = i => L + i / (dados.length - 1) * (W - L - R), y = v => T + (1 - v / max) * (H - T - B);
    const pts = dados.map((p, i) => [x(i), y(val(p))]);
    let d = `M${pts[0][0]} ${pts[0][1]}`;
    for (let i = 0; i < pts.length - 1; i++) { const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2; d += ` C${p1[0] + (p2[0] - p0[0]) / 6} ${Math.min(H - B, p1[1] + (p2[1] - p0[1]) / 6)} ${p2[0] - (p3[0] - p1[0]) / 6} ${Math.min(H - B, p2[1] - (p3[1] - p1[1]) / 6)} ${p2[0]} ${p2[1]}`; }
    const lbl = v => met === 'conv' ? v + '%' : met === 'vendas' ? num(v) : (v >= 1000 ? `${state.moeda === 'BRL' ? 'R$' : state.moeda} ${(v / 1000).toLocaleString('pt-BR')} mil` : v);
    const ticks = [0, .25, .5, .75, 1].map(f => f * max), passo = Math.ceil(dados.length / 8);
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.innerHTML = `<defs><linearGradient id="gb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#22c55e" stop-opacity=".45"/><stop offset="1" stop-color="#22c55e" stop-opacity=".02"/></linearGradient></defs>
      ${ticks.map(v => `<line x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}" stroke="var(--grid)"/><text x="${L - 8}" y="${y(v) + 3}" text-anchor="end">${lbl(v)}</text>`).join('')}
      <path d="${d} L${x(dados.length - 1)} ${H - B} L${L} ${H - B} Z" fill="url(#gb)"/><path d="${d}" fill="none" stroke="#22c55e" stroke-width="1.8"/>
      <line x1="${x(dados.length - 1)}" x2="${x(dados.length - 1)}" y1="${T}" y2="${H - B}" stroke="var(--muted)" stroke-dasharray="2 3"/>
      <text x="${x(dados.length - 1) - 4}" y="${T + 10}" text-anchor="end">hoje (parcial)</text>
      ${dados.map((p, i) => i % passo === 0 ? `<text x="${x(i)}" y="${H - 6}" text-anchor="middle">${fmtD(p.d)}</text>` : '').join('')}
      <line id="cur" y1="${T}" y2="${H - B}" stroke="#71717a" stroke-dasharray="3 3" visibility="hidden"/><circle id="pt" r="5" fill="var(--card)" stroke="#22c55e" stroke-width="2" visibility="hidden"/>
      <rect id="hit" x="${L}" y="${T}" width="${W - L - R}" height="${H - T - B}" fill="transparent"/>`;
    const hit = svg.querySelector('#hit'), tip = $('#tip');
    hit.addEventListener('mousemove', e => {
      const r = svg.getBoundingClientRect(), mx = (e.clientX - r.left) * W / r.width;
      const i = Math.max(0, Math.min(dados.length - 1, Math.round((mx - L) / (W - L - R) * (dados.length - 1)))), p = dados[i];
      ['x1', 'x2'].forEach(a => svg.querySelector('#cur').setAttribute(a, x(i))); svg.querySelector('#cur').setAttribute('visibility', 'visible');
      const c = svg.querySelector('#pt'); c.setAttribute('cx', x(i)); c.setAttribute('cy', y(val(p))); c.setAttribute('visibility', 'visible');
      tip.hidden = false; tip.style.left = (x(i) / W * r.width) + 'px'; tip.style.top = (y(val(p)) / H * r.height) + 'px';
      if (x(i) > W * 0.7) tip.style.transform = 'translate(calc(-100% - 12px), -50%)'; else tip.style.transform = '';
      tip.innerHTML = `<span>${fmtDia(p.d)}${i === dados.length - 1 ? ' · parcial' : ''}</span><b>${met === 'valor' ? money(p.valor) : met === 'vendas' ? num(p.vendas) + ' vendas' : pct(p.vendas / p.tentativas * 100)}</b>${num(p.vendas)} vendas · ${pct(p.vendas / p.tentativas * 100, 0)} conversão`;
    });
    hit.addEventListener('mouseleave', () => { tip.hidden = true; svg.querySelector('#cur').setAttribute('visibility', 'hidden'); svg.querySelector('#pt').setAttribute('visibility', 'hidden'); });
  }

  // ---------- Detalhes ----------
  let onSubmit = null;
  function modal(titulo, corpo, acao, submit) {
    $('#modalTitulo').textContent = titulo; $('#modalBody').innerHTML = corpo;
    $('#modalFoot').innerHTML = `<button type="button" class="btn" data-close>${acao ? 'Cancelar' : 'Fechar'}</button>${acao ? `<button class="btn primary">${acao}</button>` : ''}`;
    onSubmit = submit || null; $('#modal').hidden = false; window.pintarIcones($('#modal')); $('#modalBody input, #modalBody textarea')?.focus();
  }
  const fecharModal = () => { $('#modal').hidden = true; onSubmit = null; };
  function detalhar() {
    const linhas = [...CONTAS].sort((a, b) => (a.taxa - a.custo) - (b.taxa - b.custo));
    modal('Lucro apurado por conta', `<p class="muted small">Contas ordenadas do menor para o maior lucro no período. Em vermelho, custo maior que a taxa.</p>
      <table class="t"><thead><tr><th>Conta</th><th class="r">Taxa cobrada</th><th class="r">Custo</th><th class="r">Lucro</th></tr></thead><tbody>
      ${linhas.map(c => { const l = c.taxa - c.custo; return `<tr><td>${esc(c.nome)}<br><small class="muted">ID ${c.id}</small></td><td class="r">${money(c.taxa)}</td><td class="r">${money(c.custo)}</td><td class="r ${l < 0 ? 'neg' : 'pos'}">${l < 0 ? '−' : ''}${money(Math.abs(l))}</td></tr>`; }).join('')}
      </tbody></table><p class="muted small">Sugestão: rever a tabela de taxas das contas em vermelho ou o roteamento de adquirente.</p>`, null);
  }
  function abrirConta(id) {
    const c = CONTAS.find(x => x.id === Number(id)), l = c.taxa - c.custo;
    $('#drawerTitulo').textContent = c.nome;
    $('#drawerBody').innerHTML = `<dl class="dl"><dt>ID</dt><dd>${c.id}</dd><dt>Cobranças no período</dt><dd>${num(c.cob)}</dd><dt>Taxa cobrada</dt><dd>${money(c.taxa)}</dd>
      <dt>Custo da adquirente</dt><dd>${money(c.custo)}</dd><dt>Lucro apurado</dt><dd><b>${money(l)}</b></dd></dl>
      ${c.alerta ? `<div class="note"><i data-i="warn"></i>${esc(c.alerta)}</div><p class="muted small">Proposta de design: quando o lucro não vier de cobranças, mostrar a origem aqui. [A CONFIRMAR com o time quais origens existem.]</p>` : ''}
      <a class="link" data-nav="Perfil da conta">Abrir perfil da conta →</a>`;
    window.pintarIcones($('#drawerBody'));
    $('#overlay').hidden = false; $('#drawer').classList.add('open'); $('#drawer').setAttribute('aria-hidden', 'false');
  }
  const fecharDrawer = () => { $('#overlay').hidden = true; $('#drawer').classList.remove('open'); $('#drawer').setAttribute('aria-hidden', 'true'); };
  let tt; const toast = m => { const el = $('#toast'); el.textContent = m; el.hidden = false; clearTimeout(tt); tt = setTimeout(() => { el.hidden = true; }, 3000); };

  // ---------- Eventos ----------
  document.addEventListener('click', e => {
    const nav = e.target.closest('[data-nav]'); if (nav) { e.preventDefault(); return toast(`“${nav.dataset.nav}” não faz parte deste protótipo.`); }
    if (e.target.closest('[data-close]')) { fecharModal(); fecharDrawer(); return; }
    const li = e.target.closest('#contas li[data-conta]'); if (li) return abrirConta(li.dataset.conta);
    const m = e.target.closest('[data-m]');
    if (m) { state.moeda = m.dataset.m; document.querySelectorAll('[data-m]').forEach(b => b.setAttribute('aria-checked', String(b === m))); render(); }
  });
  $('#contas').addEventListener('keydown', e => { const li = e.target.closest('li[data-conta]'); if (li && e.key === 'Enter') abrirConta(li.dataset.conta); });
  $('#overlay').addEventListener('click', fecharDrawer);
  $('#modal').addEventListener('click', e => { if (e.target.id === 'modal') fecharModal(); });
  $('#modalForm').addEventListener('submit', e => { e.preventDefault(); onSubmit?.(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { fecharModal(); fecharDrawer(); } });
  $('#periodo').addEventListener('change', e => { state.periodo = Number(e.target.value); render(); });
  $('#metrica').addEventListener('change', e => { state.metrica = e.target.value; renderChart(); });
  $('#olho').addEventListener('click', e => { state.ocultar = !state.ocultar; e.currentTarget.querySelector('i').dataset.i = state.ocultar ? 'eyeOff' : 'eye'; window.pintarIcones(e.currentTarget); render(); });
  $('#ranking').addEventListener('click', detalhar);
  $('#glossario').addEventListener('click', () => modal('Glossário de métricas', `<dl class="gl">
    <dt>Lucro apurado</dt><dd>Taxa cobrada dos produtores menos o custo pago às adquirentes, nas cobranças apuradas do período.</dd>
    <dt>Custo da adquirente</dt><dd>Quanto a operação pagou às adquirentes para processar as cobranças.</dd>
    <dt>Taxa de conversão</dt><dd>Cobranças aprovadas ÷ cobranças geradas. A variação aparece em pontos percentuais (p.p.).</dd>
    <dt>Ticket médio</dt><dd>Faturamento ÷ cobranças aprovadas.</dd>
    <dt>Saldo retido</dt><dd>Reserva de cartão que ainda vai ser liberada. Não depende do período.</dd>
    <dt>Chargeback</dt><dd>Contestação aberta pelo portador do cartão junto ao banco emissor.</dd></dl>`, null));
  $('#publicar').addEventListener('click', () => modal('Publicar aviso aos lojistas', `
    <label class="field">Título<input id="aTit" maxlength="80" placeholder="Ex.: Manutenção programada no sábado às 2h"></label>
    <label class="field">Mensagem<textarea id="aMsg" rows="3" placeholder="O que os lojistas precisam saber"></textarea></label>
    <label class="field">Público<select id="aPub"><option>Todos os lojistas</option><option>Só contas BRL</option><option>Só contas MXN e COP</option></select></label>
    <p class="err" id="mErr"></p>`, 'Publicar', () => {
    if (!$('#aTit').value.trim()) { $('#mErr').textContent = 'Informe um título.'; return; }
    state.avisos.unshift({ titulo: $('#aTit').value.trim(), publico: $('#aPub').value }); fecharModal(); render(); toast('Aviso publicado no painel dos lojistas.');
  }));
  $('#recolher').addEventListener('click', () => $('#app').classList.toggle(innerWidth <= 760 ? 'open' : 'collapsed'));
  $('#tema').addEventListener('click', e => { const light = document.documentElement.dataset.theme !== 'light'; document.documentElement.dataset.theme = light ? 'light' : 'dark'; e.currentTarget.querySelector('i').dataset.i = light ? 'moon' : 'sun'; window.pintarIcones(e.currentTarget); renderChart(); });
  addEventListener('resize', () => renderChart());

  window.pintarIcones();
  render();
})();
