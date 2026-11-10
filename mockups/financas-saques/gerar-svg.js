// Gera o mockup SVG da tela Finanças > Saques, pensado para importar no Figma.
// Cada <g id="..."> vira uma camada nomeada no Figma.
const fs = require('fs');
const out = process.argv[2];

const W = 1440, H = 1400;
const C = {
  bg: '#FFFFFF', side: '#FAFAFA', border: '#E7E7E9', text: '#18181B', muted: '#71717A',
  subtle: '#A1A1AA', chip: '#F4F4F5', orange: '#EA580C', warnBg: '#FFF7ED', warnBd: '#FED7AA',
  green: '#15803D', greenBg: '#DCFCE7', greenBd: '#86EFAC', amber: '#B45309', amberBg: '#FEF3C7',
  amberBd: '#FCD34D', red: '#B91C1C', redBg: '#FEE2E2', redBd: '#FCA5A5', dark: '#18181B',
};
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const t = (x, y, s, o = {}) => {
  const { size = 12, w = 400, fill = C.text, anchor = 'start', family = 'Inter, Segoe UI, Arial, sans-serif' } = o;
  return `<text x="${x}" y="${y}" font-family="${family}" font-size="${size}" font-weight="${w}" fill="${fill}"${anchor !== 'start' ? ` text-anchor="${anchor}"` : ''}>${esc(s)}</text>`;
};
const r = (x, y, w, h, o = {}) => {
  const { fill = 'none', stroke, rx = 0, sw = 1 } = o;
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}"${stroke ? ` stroke="${stroke}" stroke-width="${sw}"` : ''}/>`;
};
const line = (x1, y1, x2, y2, c = C.border) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}"/>`;
const g = (id, ...c) => `<g id="${id}">${c.join('')}</g>`;
const ico = (x, y, d, c = C.text) => `<path transform="translate(${x} ${y})" d="${d}" fill="none" stroke="${c}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>`;

// Ícones 14x14 (traço)
const I = {
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
  sun: 'M7 4.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM7 0.5v1.5M7 12v1.5M0.5 7H2M12 7h1.5M2.4 2.4l1 1M10.6 10.6l1 1M2.4 11.6l1-1M10.6 3.4l1-1',
  eye: 'M1 7s2.2-4 6-4 6 4 6 4-2.2 4-6 4-6-4-6-4zM7 8.8a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6z',
  warn: 'M7 1.5L13 12.5H1zM7 5.5v3M7 10.5h.01',
  info: 'M7 1a6 6 0 1 1 0 12A6 6 0 0 1 7 1zM7 6.5v3.5M7 4.5h.01',
  search: 'M6 1a5 5 0 1 1 0 10A5 5 0 0 1 6 1zM10 10l3 3',
};

const o = [];

// ---------- Sidebar ----------
const side = [r(0, 0, 232, H, { fill: C.side }), line(232, 0, 232, H)];
side.push(g('logo',
  `<path d="M20 22l10 12 10-12-4 0-6 7-6-7z" fill="${C.text}"/>`,
  t(48, 33, 'AmploPay', { size: 14, w: 600 })));
side.push(t(16, 76, 'Gerenciamento', { size: 10, fill: C.subtle }));
const menu = [
  ['Dashboard', I.grid], ['Relatórios', I.chart, 'open'],
  ['Entradas via Pix', null, 'sub'], ['Saques', null, 'sub'], ['Todas as transações', null, 'sub'],
  ['Disputas', I.file], ['Finanças', I.wallet, 'active'], ['Checkout', I.cart, 'more'],
  ['Webhooks', I.hook], ['Integrações', I.link], ['Taxas', I.pct], ['Indique e ganhe', I.gift],
  ['API', I.code, 'more'],
];
let my = 88;
menu.forEach(([label, icon, kind]) => {
  const items = [];
  if (kind === 'active') items.push(r(8, my, 216, 28, { fill: '#EFEFF1', rx: 6 }));
  if (kind === 'sub') {
    items.push(t(40, my + 18, label, { size: 12, fill: C.muted }));
  } else {
    items.push(ico(16, my + 7, icon, kind === 'active' ? C.text : '#52525B'));
    items.push(t(38, my + 18, label, { size: 12, w: kind === 'active' ? 600 : 400 }));
  }
  if (kind === 'open') items.push(ico(204, my + 7, I.chevD, C.muted));
  if (kind === 'more') items.push(ico(204, my + 7, I.chevR, C.muted));
  side.push(g(`menu/${label}`, ...items));
  my += kind === 'sub' ? 26 : 30;
});
side.push(g('usuario',
  line(0, H - 64, 232, H - 64),
  `<circle cx="30" cy="${H - 32}" r="14" fill="#E4E4E7"/>`,
  t(24, H - 28, 'LE', { size: 10, w: 600, fill: C.muted }),
  t(52, H - 35, 'Loja Exemplo', { size: 12, w: 600 }),
  t(52, H - 20, 'financeiro@lojaexemplo.com', { size: 10, fill: C.muted }),
  ico(204, H - 39, I.chevUD, C.muted)));
o.push(g('sidebar', ...side));

// ---------- Topbar ----------
o.push(g('topbar',
  line(232, 56, W, 56),
  ico(252, 21, I.panel, '#52525B'),
  line(278, 20, 278, 36),
  t(290, 32, 'Visão geral', { size: 12, fill: C.muted }),
  ico(362, 21, I.chevR, C.subtle),
  t(380, 32, 'Finanças', { size: 12, w: 500 }),
  ico(1310, 21, I.sun, '#52525B'),
  g('meta-faturamento',
    t(1342, 26, '🏆 R$ 609K / 1M', { size: 11, w: 600 }),
    r(1342, 33, 80, 4, { fill: C.chip, rx: 2 }),
    r(1342, 33, 49, 4, { fill: C.dark, rx: 2 }))));

// ---------- Conteúdo ----------
const X = 316, CW = 1040;
o.push(g('cabecalho',
  t(X, 96, 'Finanças', { size: 22, w: 600 }),
  t(X, 118, 'Saldo de cada moeda e o histórico de saques, transferências, conversões e ajustes.', { size: 12, fill: C.muted })));

o.push(g('alerta-saldo-bloqueado',
  r(X, 136, CW, 56, { fill: C.warnBg, stroke: C.warnBd, rx: 8 }),
  ico(X + 16, 150, I.warn, C.orange),
  `<text x="${X + 40}" y="161" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="12" fill="${C.muted}"><tspan font-weight="600" fill="${C.text}">Parte do seu saldo está bloqueada</tspan> — R$ 4.250,00 em BRL. Valor bloqueado entra no total, mas não pode ser sacado, convertido ou transferido,</text>`,
  t(X + 40, 178, 'e não é liberado automaticamente. Veja o detalhe no card da moeda.', { size: 12, fill: C.muted })));

o.push(g('saldos-titulo',
  t(X, 230, 'Saldos por moeda', { size: 15, w: 600 }),
  t(X, 248, 'Cada moeda tem saldo próprio. Os valores não se somam e não são convertidos automaticamente entre si.', { size: 11, fill: C.muted }),
  ico(X + CW - 16, 226, I.eye, '#52525B')));

const cards = [
  { code: 'BR', name: 'Real (BRL)', sub: 'BRL', badge: 'Pix', amount: 'R$ 18.420,90',
    rows: [['Bloqueado', 'R$ 4.250,00', C.orange, true], ['A liberar', 'R$ 0,00'], ['Reserva do cartão', 'R$ 0,00'], ['Total', 'R$ 22.670,90']],
    alert: true },
  { code: 'MX', name: 'Peso mexicano (MXN)', sub: 'MXN', badge: 'SPEI', amount: '$0.00',
    rows: [['Bloqueado', '$0.00', null, true], ['Total', '$0.00']], footer: ['Minha chave CLABE', 'link'] },
  { code: 'CO', name: 'Peso colombiano (COP)', sub: 'COP', badge: 'Nequi / Bre-B', amount: '$ 0',
    rows: [['Bloqueado', '$ 0', null, true], ['Total', '$ 0']], footer: ['Cobrança única — sem chave fixa', 'info'] },
];
const CY = 264, CARD_W = 336, CARD_H = 364;
cards.forEach((c, i) => {
  const cx = X + i * (CARD_W + 16), p = [];
  p.push(r(cx, CY, CARD_W, CARD_H, { fill: C.bg, stroke: C.border, rx: 10 }));
  p.push(`<circle cx="${cx + 36}" cy="${CY + 36}" r="16" fill="${C.chip}"/>`);
  p.push(t(cx + 36, CY + 40, c.code, { size: 10, w: 600, anchor: 'middle' }));
  p.push(t(cx + 62, CY + 33, c.name, { size: 12, w: 600 }));
  p.push(t(cx + 62, CY + 48, c.sub, { size: 10, fill: C.subtle }));
  const bw = c.badge.length * 6 + 16;
  p.push(r(cx + CARD_W - 20 - bw, CY + 22, bw, 18, { fill: C.chip, rx: 9 }));
  p.push(t(cx + CARD_W - 20 - bw / 2, CY + 34, c.badge, { size: 9, w: 600, anchor: 'middle' }));
  p.push(t(cx + 20, CY + 88, 'DISPONÍVEL', { size: 9, w: 500, fill: C.subtle }));
  p.push(t(cx + 20, CY + 118, c.amount, { size: 26, w: 700 }));
  p.push(line(cx + 20, CY + 136, cx + CARD_W - 20, CY + 136));
  let ry = CY + 160;
  c.rows.forEach(([k, v, col, inf]) => {
    p.push(t(cx + 20, ry, k, { size: 10, fill: C.muted }));
    if (inf) p.push(`<path transform="translate(${cx + 20 + k.length * 5.4 + 4} ${ry - 9}) scale(0.75)" d="${I.info}" fill="none" stroke="${C.subtle}" stroke-width="1.4" stroke-linecap="round"/>`);
    p.push(t(cx + CARD_W - 20, ry, v, { size: 11, w: 500, fill: col || C.text, anchor: 'end' }));
    ry += 22;
  });
  let by = ry + 10;
  if (c.alert) {
    p.push(g('aviso-retido',
      r(cx + 20, ry + 4, CARD_W - 40, 44, { fill: C.warnBg, stroke: C.warnBd, rx: 6 }),
      ico(cx + 30, ry + 13, I.warn, C.orange),
      `<text x="${cx + 50}" y="${ry + 23}" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="10" fill="${C.muted}"><tspan font-weight="700" fill="${C.text}">R$ 4.250,00 retidos.</tspan> Não dá para sacar, converter ou</text>`,
      t(cx + 50, ry + 37, 'transferir esse valor.', { size: 10, fill: C.muted })));
    by = ry + 64;
  }
  const bwid = 93;
  ['Depositar', 'Sacar', 'Transferir'].forEach((b, j) => {
    const bx = cx + 20 + j * (bwid + 8.5);
    p.push(g(`botao/${b}`,
      r(bx, by, bwid, 34, { fill: j === 0 ? C.dark : C.bg, stroke: j === 0 ? null : C.border, rx: 6 }),
      t(bx + bwid / 2, by + 21, b, { size: 12, w: 500, fill: j === 0 ? '#FFFFFF' : C.text, anchor: 'middle' })));
  });
  if (c.footer) {
    const [txt, kind] = c.footer, fy = by + 64;
    if (kind === 'link') p.push(t(cx + CARD_W / 2, fy, txt, { size: 12, w: 600, anchor: 'middle' }));
    else p.push(ico(cx + 70, fy - 11, I.info, C.subtle), t(cx + CARD_W / 2 + 8, fy, txt, { size: 10, fill: C.muted, anchor: 'middle' }));
  }
  o.push(g(`card-moeda/${c.sub}`, ...p));
});

// ---------- Movimentações ----------
const MY = CARD_H + CY + 36; // 664
o.push(t(X, MY, 'Movimentações', { size: 15, w: 600 }));
const tabs = [['Saques', '1.284'], ['Transferências internas', ''], ['Conversões', '0'], ['Ajustes de saldo', '0']];
const tb = [r(X, MY + 14, CW, 38, { fill: C.chip, rx: 8 })];
let tx = X + 4;
tabs.forEach(([l, n], i) => {
  const w = (l.length + n.length) * 6.1 + (n ? 34 : 24);
  if (i === 0) tb.push(r(tx, MY + 18, w, 30, { fill: C.bg, stroke: C.border, rx: 6 }));
  tb.push(`<text x="${tx + 12}" y="${MY + 37}" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="12" font-weight="500" fill="${C.text}">${esc(l)}${n ? `<tspan fill="${C.muted}" font-weight="400">  ${n}</tspan>` : ''}</text>`);
  tx += w + 4;
});
o.push(g('abas-movimentacoes', ...tb));

const TY = MY + 68; // topo do card da tabela
const cols = [['Solicitação', 336], ['Origem', 516], ['Recebedor / destino', 660], ['Valor', 880], ['Taxa', 972], ['Total debitado', 1040], ['Data', 1144], ['Status', 1232]];
const rows = [
  ['#sq_7f3k29ab1xq0', '3f9a1c2e-58d1-4b7a-9e0c', 'Transferência via API', 'MARIANA COSTA LIMA', 'Pix · e-mail', 'R$ 60,50', 'R$ 61,00', '10/11/26, 13:51', 'Pago'],
  ['#sq_7f3k1mz08hq2', '9b2e7d40-1c6a-4f8e-a3b1', 'Transferência via API', 'RAFAEL ALMEIDA SOUZA', 'Pix · e-mail', 'R$ 509,00', 'R$ 509,50', '10/11/26, 13:43', 'Pago'],
  ['#sq_7f3k0q4rtw91', 'c41d8a93-2e7f-4b05-8d6c', 'Transferência via API', 'JULIANA PEREIRA ROCHA', 'Pix · celular', 'R$ 56,00', 'R$ 56,50', '10/11/26, 13:43', 'Pago'],
  ['#sq_7f3jz8c2ne4p', '1a7f3b62-9d0e-4c18-b5a7', 'Saque pelo painel', 'BRUNO CARVALHO DIAS', 'Pix · CPF', 'R$ 1.200,00', 'R$ 1.200,50', '10/11/26, 13:20', 'Processando'],
  ['#sq_7f3jy61bvk7d', 'e8c05f14-73a2-4d9b-9f21', 'Transferência via API', 'LETÍCIA MARTINS GOMES', 'Pix · aleatória', 'R$ 89,90', 'R$ 90,40', '10/11/26, 12:58', 'Pago'],
  ['#sq_7f3jx2hd9s0m', '5d3a9e7b-0f4c-48e2-a6d3', 'Transferência via API', 'THIAGO RIBEIRO NUNES', 'Pix · e-mail', 'R$ 340,00', 'R$ 340,50', '10/11/26, 12:31', 'Recusado'],
  ['#sq_7f3jw7pq3f8a', '72b1e4c9-6a5d-4f30-8c7e', 'Transferência via API', 'CAMILA FERREIRA LOPES', 'Pix · CPF', 'R$ 75,00', 'R$ 75,50', '10/11/26, 11:47', 'Pago'],
  ['#sq_7f3jv0mx5c2r', 'af6c2d18-4b9e-4e7a-91f5', 'Saque pelo painel', 'EDUARDO BARROS MELO', 'Pix · celular', 'R$ 2.150,00', 'R$ 2.150,50', '10/11/26, 11:02', 'Pago'],
];
const ROW_H = 52, HEAD_Y = TY + 118, TABLE_H = 118 + 36 + rows.length * ROW_H + 52;
const tbl = [r(X, TY, CW, TABLE_H, { fill: C.bg, stroke: C.border, rx: 10 })];
tbl.push(t(X + 20, TY + 28, 'Saques e transferências', { size: 13, w: 600 }));
tbl.push(t(X + 20, TY + 46, 'Consulte o destino, as taxas e a confirmação de cada pagamento.', { size: 11, fill: C.muted }));
const fy = TY + 62;
tbl.push(g('filtro/busca', r(X + 20, fy, 500, 36, { fill: C.bg, stroke: C.border, rx: 6 }), ico(X + 32, fy + 11, I.search, C.subtle), t(X + 54, fy + 22, 'ID, referência, recebedor ou chave', { size: 12, fill: C.subtle })));
[['Todas as origens', 532, 150], ['Todos os status', 694, 150], ['Todo o período', 856, 164]].forEach(([l, dx, w]) => {
  tbl.push(g(`filtro/${l}`, r(X + dx, fy, w, 36, { fill: C.bg, stroke: C.border, rx: 6 }), t(X + dx + 12, fy + 22, l, { size: 12 }), ico(X + dx + w - 26, fy + 11, I.chevD, C.muted)));
});
tbl.push(line(X, HEAD_Y, X + CW, HEAD_Y));
cols.forEach(([l, x]) => tbl.push(t(x, HEAD_Y + 23, l, { size: 11, w: 500, fill: C.muted })));
tbl.push(line(X, HEAD_Y + 36, X + CW, HEAD_Y + 36));
const st = { Pago: [C.greenBg, C.greenBd, C.green], Processando: [C.amberBg, C.amberBd, C.amber], Recusado: [C.redBg, C.redBd, C.red] };
rows.forEach((rw, i) => {
  const y = HEAD_Y + 36 + i * ROW_H, [id, uuid, origem, nome, chave, valor, total, data, status] = rw, p = [];
  p.push(t(336, y + 22, id, { size: 10, w: 600, family: 'JetBrains Mono, monospace' }));
  p.push(t(336, y + 37, uuid + '…', { size: 9, fill: C.subtle }));
  const ow = origem.length * 5.2 + 18;
  p.push(r(516, y + 16, ow, 20, { fill: C.bg, stroke: C.border, rx: 10 }));
  p.push(t(516 + ow / 2, y + 29.5, origem, { size: 9, anchor: 'middle' }));
  p.push(t(660, y + 22, nome, { size: 11, w: 500 }));
  p.push(t(660, y + 37, chave, { size: 9, fill: C.subtle }));
  p.push(t(880, y + 30, valor, { size: 11, w: 600 }));
  p.push(t(972, y + 30, 'R$ 0,50', { size: 11, fill: C.muted }));
  p.push(t(1040, y + 30, total, { size: 11, w: 600 }));
  p.push(t(1144, y + 30, data, { size: 10, fill: C.muted }));
  const [bg, bd, fg] = st[status], sw = status.length * 5.8 + 16;
  p.push(r(1232, y + 16, sw, 20, { fill: bg, stroke: bd, rx: 10 }));
  p.push(t(1232 + sw / 2, y + 29.5, status, { size: 10, w: 600, fill: fg, anchor: 'middle' }));
  p.push(ico(1330, y + 19, I.eye, '#52525B'));
  if (i < rows.length - 1) p.push(line(X, y + ROW_H, X + CW, y + ROW_H));
  tbl.push(g(`linha/${id}`, ...p));
});
const PY = HEAD_Y + 36 + rows.length * ROW_H;
const pg = [line(X, PY, X + CW, PY), t(X + 20, PY + 31, 'Mostrando 1–8 de 1.284 saques', { size: 11, fill: C.muted })];
let px = X + CW - 20;
[['Próxima', 70], ['161', 34], ['…', 28], ['3', 28], ['2', 28], ['1', 28], ['Anterior', 76]].forEach(([l, w]) => {
  px -= w;
  const active = l === '1';
  pg.push(r(px, PY + 12, w, 28, { fill: active ? C.dark : C.bg, stroke: active ? null : C.border, rx: 6 }));
  pg.push(t(px + w / 2, PY + 30, l, { size: 11, w: 500, fill: active ? '#FFFFFF' : C.text, anchor: 'middle' }));
  px -= 6;
});
tbl.push(g('paginacao', ...pg));
o.push(g('tabela-saques', ...tbl));

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<g id="Financas - Saques (1440)">
${r(0, 0, W, H, { fill: C.bg })}
${o.join('\n')}
</g>
</svg>
`;
fs.writeFileSync(out, svg, 'utf8');
console.log('ok', out, svg.length, 'bytes; altura da tabela termina em', TY + TABLE_H);
