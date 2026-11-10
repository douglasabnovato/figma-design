// Gera os mockups do Dashboard do lojista do app Nalapay. Dados fictícios.
// Uso: node gerar-svg.js v1|v2
const path = require('path');
const K = require('../../ferramentas/svgkit');
const { t, tr, r, line, circle, g, ico, chip, btn, smooth, doc, save, path: P } = K;

const V = process.argv[2] || 'v1';
const W = 1440;
const C = {
  text: '#18181B', muted: '#71717A', subtle: '#A1A1AA', border: '#E7E7E9', bg: '#FFFFFF', side: '#FAFAFA', chip: '#F4F4F5',
  green: '#16A34A', greenMid: '#22C55E', greenBg: '#DCFCE7', greenSoft: '#F0FDF4', red: '#DC2626', redBg: '#FEE2E2',
  amber: '#B45309', amberBg: '#FEF3C7', dark: '#18181B',
};
// Série fictícia de 29 dias (13/10 a 10/11), em R$ mil
const SERIE = [0.4, 1.2, 14.8, 7.1, 6.3, 2.0, 8.9, 5.6, 6.8, 12.9, 3.1, 0.6, 0.3, 0.5, 1.4, 0.4, 0.9, 1.1, 0.5, 0.4, 2.6, 0.9, 3.4, 3.9, 6.2, 7.8, 5.3, 12.6, 6.1];
const DIAS = Array.from({ length: 29 }, (_, i) => { const d = new Date(2026, 9, 13 + i); return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`; });
const SB = 200;
const o = [];

function sidebar(H) {
  const p = [r(0, 0, SB, H, { fill: C.side }), line(SB, 0, SB, H, C.border)];
  p.push(g('logo', `<path d="M20 22l10 12 10-12h-4l-6 7-6-7z" fill="${C.text}"/>`, t(48, 33, 'Nalapay', { size: 14, w: 600 })));
  p.push(t(16, 72, 'Gerenciamento', { size: 10, fill: C.subtle }));
  const menu = [['Dashboard', 'grid', 'active'], ['Relatórios', 'chart', 'open'], ['Entradas via Pix', null, 'sub'], ['Saques', null, 'sub'], ['Todas as transações', null, 'sub'],
    ['Disputas', 'file'], ['Finanças', 'wallet'], ['Checkout', 'cart', 'more'], ['Webhooks', 'hook'], ['Integrações', 'link'], ['Taxas', 'pct'], ['Indique e ganhe', 'gift'], ['API', 'code', 'more']];
  let y = 84;
  menu.forEach(([l, ic, k]) => {
    const q = [];
    if (k === 'active') q.push(r(8, y, SB - 16, 28, { fill: '#EFEFF1', rx: 6 }));
    if (k === 'sub') q.push(t(40, y + 18, l, { size: 12, fill: C.muted }));
    else q.push(ico(16, y + 7, ic, k === 'active' ? C.text : '#52525B'), t(38, y + 18, l, { size: 12, w: k === 'active' ? 600 : 400 }));
    if (k === 'open') q.push(ico(SB - 28, y + 7, 'chevD', C.muted));
    if (k === 'more') q.push(ico(SB - 28, y + 7, 'chevR', C.muted));
    p.push(g(`menu/${l}`, q));
    y += k === 'sub' ? 26 : 30;
  });
  p.push(g('usuario', line(0, H - 60, SB, H - 60, C.border), circle(30, H - 30, 14, '#E4E4E7'), t(30, H - 26, 'LE', { size: 10, w: 600, fill: C.muted, anchor: 'middle' }),
    t(52, H - 33, 'Loja Exemplo', { size: 12, w: 600 }), t(52, H - 19, 'financeiro@lojaexemplo.com', { size: 9.5, fill: C.muted })));
  return g('sidebar', p);
}

function areaChart(x, y, w, h, o2 = {}) {
  const max = o2.max || 16, n = SERIE.length;
  const pts = SERIE.map((v, i) => [x + (i / (n - 1)) * w, y + h - (v / max) * h]);
  const d = smooth(pts);
  const area = `${d} L${x + w} ${y + h} L${x} ${y + h} Z`;
  return { pts, svg: [P(area, { fill: 'url(#gradVerde)' }), P(d, { stroke: C.greenMid, sw: 1.8 })].join('') };
}
const defs = `<linearGradient id="gradVerde" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#22C55E" stop-opacity="0.35"/><stop offset="1" stop-color="#22C55E" stop-opacity="0.02"/></linearGradient>`;

// ======================= V1 =======================
if (V === 'v1') {
  const H = 680;
  o.push(sidebar(H));
  o.push(g('topbar', line(SB, 46, W, 46, C.border), ico(SB + 16, 16, 'panel', '#52525B'), line(SB + 40, 15, SB + 40, 31, C.border),
    t(SB + 52, 27, 'Visão geral', { size: 12 }), ico(1362, 16, 'sun', '#52525B'),
    g('meta-cortada', t(1392, 22, '🏆 248K / 1', { size: 10.5, w: 600 }), r(1392, 28, 60, 3, { fill: C.dark, rx: 1.5 }))));
  const X = 450, CW = 740;
  o.push(g('cabecalho', t(X, 82, 'Resumo (BRL)', { size: 13, w: 500 }), ico(X + 92, 71, 'eyeOff', C.muted), btn(X + CW - 74, 64, 74, 30, 'Depositar', { primary: true, size: 11 })));
  const kp = [['dollar', 'Aprovado', 'R$ 248.390,40'], ['ticket', 'Ticket médio', 'R$ 52,80'], ['copy', 'Transações aprovadas', '4.704'], ['wallet', 'Saldo disponível', 'R$ 18.205,60'], ['pct', 'Conversão geral', '46,9%']];
  const kw = (CW - 32) / 5;
  o.push(g('indicadores', kp.map(([ic, l, v], i) => {
    const x = X + i * (kw + 8), y = 104;
    return g(`indicador/${l}`, r(x, y, kw, 84, { fill: C.bg, stroke: C.border, rx: 8 }), ico(x + 14, y + 14, ic === 'copy' ? 'file' : ic, C.greenMid),
      t(x + 14, y + 44, l, { size: 10, fill: C.text }), t(x + 14, y + 66, v, { size: 13.5, w: 700 }));
  })));
  const cy = 200;
  o.push(g('conversao-por-meio', r(X, cy, CW, 132, { fill: C.bg, stroke: C.border, rx: 8 }),
    t(X + 14, cy + 22, 'Conversão por meio de pagamento', { size: 12.5, w: 500 }), t(X + 14, cy + 38, 'Taxa de aprovação por método de pagamento.', { size: 9.5, fill: C.muted }),
    line(X, cy + 52, X + CW, cy + 52, C.border), line(X + CW / 3, cy + 52, X + CW / 3, cy + 132, C.border), line(X + 2 * CW / 3, cy + 52, X + 2 * CW / 3, cy + 132, C.border),
    [['pix', 'Pix', '47%', 0.47, '4.704 aprovadas de 10.030 transações'], ['card', 'Cartão', '—', 0, 'Nenhuma transação registrada'], ['barcode', 'Boleto', '—', 0, 'Nenhuma transação registrada']].map(([ic, l, v, p, s], i) => {
      const x = X + i * CW / 3 + 14, w = CW / 3 - 28;
      return g(`meio/${l}`, ico(x, cy + 66, ic, i ? C.muted : C.greenMid), t(x + 22, cy + 77, l, { size: 11 }), t(x + w, cy + 79, v, { size: v === '—' ? 14 : 15, w: 500, fill: v === '—' ? C.muted : C.text, anchor: 'end' }),
        r(x, cy + 94, w, 4, { fill: C.chip, rx: 2 }), p ? r(x, cy + 94, w * p, 4, { fill: C.greenMid, rx: 2 }) : '', t(x, cy + 116, s, { size: 8.5, fill: C.muted }));
    })));
  const gy = 346, gw = 430, gh = 300;
  const ch = areaChart(X + 20, gy + 70, gw - 40, gh - 110);
  o.push(g('grafico', r(X, gy, gw, gh, { fill: C.bg, stroke: C.border, rx: 8 }), t(X + 14, gy + 22, 'Gráfico', { size: 12.5, w: 500 }),
    t(X + 14, gy + 38, 'Acompanhe o desempenho das suas vendas com o gráfico abaixo.', { size: 9.5, fill: C.muted }),
    [0, 1, 2, 3].map(i => line(X + 20, gy + 70 + i * 63, X + gw - 20, gy + 70 + i * 63, '#F1F1F3')), ch.svg,
    DIAS.filter((_, i) => i % 2 === 0).map((d, j) => t(X + 20 + (j * 2 / 28) * (gw - 40), gy + gh - 22, d, { size: 7, fill: C.muted, anchor: 'middle' }))));
  const tx = X + gw + 12, tw2 = CW - gw - 12;
  o.push(g('transacoes', r(tx, gy, tw2, gh, { fill: C.bg, stroke: C.border, rx: 8 }), t(tx + 12, gy + 22, 'Transações', { size: 12.5, w: 500 }),
    t(tx + 12, gy + 38, 'Veja as últimas transações realizadas na sua conta.', { size: 9.5, fill: C.muted }),
    [['15:24', '20,00'], ['15:24', '35,00'], ['15:20', '37,00'], ['15:18', '20,00'], ['15:17', '20,00']].map(([h, v], i) => {
      const y = gy + 52 + i * 48;
      return g(`transacao/${i + 1}`, r(tx + 10, y, tw2 - 20, 42, { fill: C.bg, stroke: C.border, rx: 6 }), ico(tx + 20, y + 14, 'box', '#52525B'),
        t(tx + 44, y + 18, 'Venda no Pix', { size: 10, w: 500 }), t(tx + 44, y + 31, `10/11 às ${h}`, { size: 8.5, fill: C.muted }),
        t(tx + tw2 - 20, y + 25, `+R$ ${v}`, { size: 10.5, w: 600, anchor: 'end' }));
    })));
  save(path.join(__dirname, 'v1', 'nalapay-app-dashboard.svg'), doc(W, H, 'Nalapay App - Dashboard v1 (como está)', o, C.bg, defs));
}

// ======================= V2 =======================
if (V === 'v2') {
  const H = 800, X = 236, CW = 1172;
  o.push(sidebar(H));
  // S0022: meta inteira, dentro do topo, com barra e rótulo
  o.push(g('topbar', line(SB, 56, W, 56, C.border), ico(SB + 16, 21, 'panel', '#52525B'), line(SB + 40, 20, SB + 40, 36, C.border),
    t(SB + 52, 32, 'Visão geral', { size: 12, fill: C.muted }), ico(1180, 21, 'sun', '#52525B'),
    g('meta-do-mes', r(1208, 12, 212, 32, { fill: C.chip, rx: 8 }), ico(1218, 21, 'trophy', C.amber),
      t(1238, 26, 'Meta do mês', { size: 9.5, fill: C.muted }), t(1410, 26, 'R$ 248 mil de R$ 1 mi', { size: 9.5, w: 600, anchor: 'end' }),
      r(1238, 32, 172, 4, { fill: '#E4E4E7', rx: 2 }), r(1238, 32, 172 * 0.248, 4, { fill: C.green, rx: 2 }))));
  // S0025 título · S0020 período · S0026 ações
  o.push(g('cabecalho', t(X, 98, 'Visão geral', { size: 22, w: 700 }),
    t(X, 118, 'Resumo das suas vendas em BRL · 11/10/2026 a 10/11/2026', { size: 12, fill: C.muted }),
    g('filtro-periodo', r(X + CW - 474, 82, 156, 36, { fill: C.bg, stroke: C.border, rx: 6 }), ico(X + CW - 462, 93, 'cal', C.muted), t(X + CW - 442, 105, 'Últimos 30 dias', { size: 12 }), ico(X + CW - 340, 93, 'chevD', C.muted)),
    g('ocultar-valores', r(X + CW - 308, 82, 36, 36, { fill: C.bg, stroke: C.border, rx: 6 }), ico(X + CW - 297, 93, 'eye', C.muted)),
    btn(X + CW - 262, 82, 124, 36, 'Depositar', { icon: 'plus' }), btn(X + CW - 128, 82, 128, 36, 'Sacar', { primary: true, icon: 'arrowUp' })));
  // S0032 card de KPI padrão · S0014 variação · S0033 ⓘ
  const kp = [['dollar', 'Aprovado', 'R$ 248.390,40', '+12,4%', 1], ['ticket', 'Ticket médio', 'R$ 52,80', '−3,1%', 0], ['checkC', 'Transações aprovadas', '4.704', '+15,9%', 1],
    ['wallet', 'Saldo disponível', 'R$ 18.205,60', 'Posição atual', 2], ['pct', 'Conversão geral', '46,9%', '+2,3 p.p.', 1]];
  const kw = (CW - 48) / 5, ky = 140;
  o.push(g('indicadores', kp.map(([ic, l, v, d, up], i) => {
    const x = X + i * (kw + 12);
    const c = up === 2 ? chip(x + 16, ky + 76, d, { fill: C.chip, fg: C.muted, size: 9.5, w: 500 })
      : chip(x + 16, ky + 76, d, { fill: up ? C.greenBg : C.redBg, fg: up ? C.green : C.red, size: 9.5, icon: up ? 'arrowUp' : 'arrowDown' });
    return g(`indicador/${l}`, r(x, ky, kw, 112, { fill: C.bg, stroke: C.border, rx: 10 }),
      r(x + 16, ky + 16, 26, 26, { fill: C.greenSoft, rx: 6 }), ico(x + 22, ky + 22, ic, C.green),
      t(x + 50, ky + 33, l, { size: 11.5, fill: C.muted }), ico(x + kw - 28, ky + 22, 'info', C.subtle, 0.85),
      t(x + 16, ky + 66, v, { size: 20, w: 700 }), c.svg,
      up === 2 ? '' : t(x + 16 + c.width + 6, ky + 89.5, 'vs. 30 dias anteriores', { size: 9.5, fill: C.subtle }));
  })));
  // S0023: meios com estados distintos e ativação do cartão
  const cy = 268, ch2 = 128;
  o.push(g('conversao-por-meio', r(X, cy, CW, ch2, { fill: C.bg, stroke: C.border, rx: 10 }),
    t(X + 20, cy + 28, 'Conversão por meio de pagamento', { size: 14, w: 600 }), t(X + 20, cy + 45, 'Aprovadas ÷ tentativas no período.', { size: 11, fill: C.muted }),
    line(X + CW / 3, cy + 60, X + CW / 3, cy + ch2 - 14, C.border), line(X + 2 * CW / 3, cy + 60, X + 2 * CW / 3, cy + ch2 - 14, C.border),
    g('meio/Pix', ico(X + 20, cy + 66, 'pix', C.green), t(X + 42, cy + 77, 'Pix', { size: 12.5, w: 600 }), chip(X + 72, cy + 64, 'Ativo', { fill: C.greenBg, fg: C.green, size: 9 }).svg,
      t(X + CW / 3 - 20, cy + 80, '46,9%', { size: 18, w: 700, anchor: 'end' }),
      r(X + 20, cy + 92, CW / 3 - 40, 6, { fill: C.chip, rx: 3 }), r(X + 20, cy + 92, (CW / 3 - 40) * 0.469, 6, { fill: C.greenMid, rx: 3 }),
      t(X + 20, cy + 114, '4.704 aprovadas de 10.030 tentativas', { size: 10.5, fill: C.muted })),
    g('meio/Cartão', ico(X + CW / 3 + 20, cy + 66, 'card', C.muted), t(X + CW / 3 + 42, cy + 77, 'Cartão', { size: 12.5, w: 600 }),
      chip(X + CW / 3 + 92, cy + 64, 'Não ativado', { fill: C.chip, fg: C.muted, size: 9 }).svg,
      t(X + CW / 3 + 20, cy + 100, 'Receba suas vendas no cartão em D+2.', { size: 11, fill: C.muted }),
      btn(X + 2 * CW / 3 - 156, cy + 84, 136, 30, 'Ativar cartão', { size: 11.5, icon: 'plus' })),
    g('meio/Boleto', ico(X + 2 * CW / 3 + 20, cy + 66, 'barcode', C.muted), t(X + 2 * CW / 3 + 42, cy + 77, 'Boleto', { size: 12.5, w: 600 }),
      chip(X + 2 * CW / 3 + 90, cy + 64, 'Ativo', { fill: C.greenBg, fg: C.green, size: 9 }).svg,
      t(X + CW - 20, cy + 80, '—', { size: 18, w: 500, fill: C.subtle, anchor: 'end' }),
      t(X + 2 * CW / 3 + 20, cy + 104, 'Sem boletos emitidos no período.', { size: 11, fill: C.muted }))));
  // S0017-like no app: eixo Y, grade e tooltip · S0021: mais largo
  const gy = 410, gw = 690, gh = 360, ax = X + 64, aw = gw - 88, ay = gy + 76, ah = gh - 130;
  const chart = areaChart(ax, ay, aw, ah, { max: 16 });
  const tip = chart.pts[27];
  o.push(g('grafico', r(X, gy, gw, gh, { fill: C.bg, stroke: C.border, rx: 10 }),
    t(X + 20, gy + 30, 'Vendas aprovadas por dia', { size: 14, w: 600 }), t(X + 20, gy + 47, 'Valor em R$ · passe o mouse para ver o dia', { size: 11, fill: C.muted }),
    g('legenda', circle(X + gw - 44, gy + 26, 4, C.greenMid), t(X + gw - 34, gy + 30, 'Pix', { size: 11 })),
    [0, 4, 8, 12, 16].map(v => { const yy = ay + ah - (v / 16) * ah; return line(ax, yy, ax + aw, yy, '#F1F1F3') + t(ax - 10, yy + 3.5, v ? `R$ ${v} mil` : 'R$ 0', { size: 9.5, fill: C.muted, anchor: 'end' }); }),
    chart.svg,
    DIAS.map((d, i) => i % 4 === 0 ? t(ax + (i / 28) * aw, ay + ah + 20, d, { size: 9.5, fill: C.muted, anchor: 'middle' }) : ''),
    g('tooltip', line(tip[0], ay, tip[0], ay + ah, '#A1A1AA', { dash: '3 3' }), circle(tip[0], tip[1], 5, C.bg, { stroke: C.green, sw: 2 }),
      r(tip[0] - 170, tip[1] - 12, 156, 60, { fill: C.dark, rx: 8 }), t(tip[0] - 158, tip[1] + 6, 'Seg, 09/11', { size: 10, fill: '#A1A1AA' }),
      t(tip[0] - 158, tip[1] + 24, 'R$ 12.630,00', { size: 13, w: 700, fill: '#FFFFFF' }), t(tip[0] - 158, tip[1] + 39, '239 vendas · Pix', { size: 10, fill: '#D4D4D8' }))));
  // S0024: transações com contexto, status e "Ver todas"
  const tx = X + gw + 14, tw2 = CW - gw - 14;
  const T = [['Curso de Fotografia', 'Mariana C.', '15:24', 'R$ 97,00', 'Aprovada'], ['Planner Digital 2027', 'Rafael A.', '15:24', 'R$ 35,00', 'Aprovada'],
    ['Mentoria em Grupo', 'Juliana P.', '15:20', 'R$ 297,00', 'Pendente'], ['Planner Digital 2027', 'Bruno D.', '15:18', 'R$ 35,00', 'Aprovada'],
    ['Curso de Fotografia', 'Letícia M.', '15:17', 'R$ 97,00', 'Recusada']];
  const ST = { Aprovada: [C.greenBg, C.green, 'check'], Pendente: [C.amberBg, C.amber, 'clock'], Recusada: [C.redBg, C.red, 'x'] };
  o.push(g('transacoes', r(tx, gy, tw2, gh, { fill: C.bg, stroke: C.border, rx: 10 }),
    t(tx + 18, gy + 30, 'Últimas transações', { size: 14, w: 600 }), t(tx + tw2 - 18, gy + 30, 'Ver todas →', { size: 11.5, w: 600, fill: C.green, anchor: 'end' }),
    g('filtros', [['Todas', 1], ['Aprovadas'], ['Pendentes'], ['Recusadas']].reduce((acc, [l, a]) => {
      const c = chip(acc.x, gy + 44, l, { fill: a ? C.dark : C.chip, fg: a ? '#FFFFFF' : C.text, size: 10, w: 500, h: 22 });
      acc.s.push(c.svg); acc.x += c.width + 6; return acc;
    }, { x: tx + 18, s: [] }).s),
    T.map(([prod, cli, h, v, s], i) => {
      const y = gy + 80 + i * 54, [bg, fg, ic] = ST[s];
      const c = chip(0, 0, s, { fill: bg, fg, size: 9, icon: ic });
      return g(`transacao/${i + 1}`, i ? line(tx + 18, y, tx + tw2 - 18, y, C.border) : '',
        r(tx + 18, y + 12, 30, 30, { fill: C.chip, rx: 8 }), ico(tx + 26, y + 20, 'pix', '#52525B'),
        t(tx + 58, y + 24, prod, { size: 12, w: 600 }), t(tx + 58, y + 39, `${cli} · Pix · hoje às ${h}`, { size: 10.5, fill: C.muted }),
        t(tx + tw2 - 18, y + 24, v, { size: 12.5, w: 700, anchor: 'end', fill: s === 'Recusada' ? C.subtle : C.text }),
        `<g transform="translate(${tx + tw2 - 18 - c.width} ${y + 30})">${c.svg}</g>`);
    })));
  save(path.join(__dirname, 'v2', 'nalapay-app-dashboard.svg'), doc(W, H, 'Nalapay App - Dashboard v2 (melhorada)', o, C.bg, defs));
}
