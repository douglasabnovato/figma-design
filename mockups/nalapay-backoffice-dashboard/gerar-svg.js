// Gera os mockups do Dashboard Admin do backoffice Nalapay (tema escuro). Dados fictícios.
// Uso: node gerar-svg.js v1|v2
const path = require('path');
const K = require('../../ferramentas/svgkit');
const { t, tr, r, line, circle, g, ico, chip, btn, smooth, doc, save, path: P } = K;

const V = process.argv[2] || 'v1';
const W = 1440;
const C = {
  page: '#0B0B0D', side: '#0F0F12', card: '#141417', border: '#26262B', text: '#F4F4F5', muted: '#A1A1AA', low: '#6B6B73',
  green: '#22C55E', greenBg: '#0F2A1A', red: '#F87171', redBg: '#2C1212', amber: '#FBBF24', amberBg: '#2A210B', chip: '#1F1F23', white: '#FFFFFF',
};
const SERIE = [0.3, 2.1, 9.8, 7.0, 3.2, 6.1, 4.4, 5.0, 14.6, 13.1, 6.0, 2.2, 0.8, 0.4, 0.6, 0.3, 0.5, 0.9, 0.4, 0.3, 1.3, 2.5, 3.6, 2.1, 1.8, 3.9, 6.8, 12.1, 9.4];
const DIAS = Array.from({ length: 29 }, (_, i) => { const d = new Date(2026, 9, 13 + i); return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`; });
const defs = `<linearGradient id="gradVerde" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#22C55E" stop-opacity="0.45"/><stop offset="1" stop-color="#22C55E" stop-opacity="0.02"/></linearGradient>`;
const SB = 200;
const o = [];

function sidebar(H) {
  const p = [r(0, 0, SB, H, { fill: C.side }), line(SB, 0, SB, H, C.border)];
  p.push(g('logo', `<path d="M18 20l10 12 10-12h-4l-6 7-6-7z" fill="${C.text}"/>`, t(46, 31, 'NalaPay', { size: 13, w: 600, fill: C.text })));
  const secs = [['PRINCIPAL', [['Dashboard', 'grid', 'active']]], ['GESTÃO', [['Produtores', 'users', 'badge']]], ['OPERAÇÃO', [['Financeiro', 'receipt', 'more']]],
    ['PLATAFORMA', [['Integrações', 'gear'], ['Anúncios', 'mega']]], ['ADMINISTRAÇÃO', [['Configurações', 'gear', 'more']]]];
  let y = 62;
  secs.forEach(([s, items]) => {
    p.push(line(10, y - 8, SB - 10, y - 8, '#1E1E22'), t(12, y + 4, s, { size: V === 'v1' ? 7 : 10, w: 600, fill: V === 'v1' ? C.low : C.muted, ls: 0.5 }));
    y += 14;
    items.forEach(([l, ic, k]) => {
      const q = [];
      if (k === 'active') q.push(r(8, y, SB - 16, 26, { fill: '#1C1C20', rx: 6 }));
      q.push(ico(16, y + 6, ic, C.muted), t(38, y + 17, l, { size: V === 'v1' ? 10.5 : 12.5, w: k === 'active' ? 600 : 400, fill: C.text }));
      if (k === 'badge') {
        if (V === 'v1') q.push(circle(SB - 42, y + 13, 7, C.green), t(SB - 42, y + 16, '29', { size: 7, w: 700, fill: '#052E16', anchor: 'middle' }));
        else q.push(circle(42, y + 30, 3, C.amber), t(50, y + 33.5, '29 aguardando aprovação', { size: 10, w: 500, fill: C.amber }));
      }
      if (k === 'more' || k === 'badge') q.push(ico(SB - 26, y + 6, 'chevR', C.muted, 0.85));
      p.push(g(`menu/${l}`, q));
      y += (k === 'badge' && V === 'v2') ? 44 : 30;
    });
    y += 14;
  });
  p.push(g('usuario', line(0, H - 58, SB, H - 58, C.border), r(10, H - 46, 26, 26, { fill: '#1F1F23', rx: 6 }), t(23, H - 29, 'AE', { size: 9, w: 600, fill: C.muted, anchor: 'middle' }),
    t(44, H - 35, 'ADMIN EXEMPLO', { size: V === 'v1' ? 8.5 : 11, w: 700, fill: C.text }), t(44, H - 22, 'admin@exemplo.com', { size: V === 'v1' ? 7 : 10, fill: C.muted }),
    t(14, H - 6, V === 'v1' ? '↪ Desconectar' : '', { size: 7, fill: C.red })));
  return g('sidebar', p);
}
function card(id, x, y, w, h, ...c) { return g(id, r(x, y, w, h, { fill: C.card, stroke: C.border, rx: 8 }), ...c); }
function area(x, y, w, h, max) {
  const n = SERIE.length, pts = SERIE.map((v, i) => [x + (i / (n - 1)) * w, y + h - (v / max) * h]);
  const d = smooth(pts);
  return { pts, svg: P(`${d} L${x + w} ${y + h} L${x} ${y + h} Z`, { fill: 'url(#gradVerde)' }) + P(d, { stroke: C.green, sw: 1.8 }) };
}

// ======================= V1 =======================
if (V === 'v1') {
  const H = 780, X = 320, MW = 742, RX = X + MW + 10, RW = 248;
  o.push(sidebar(H));
  o.push(g('topbar', ico(SB + 16, 12, 'panel', C.muted), t(SB + 40, 23, 'Dashboard', { size: 9.5, fill: C.text })));
  o.push(g('cabecalho', t(X, 56, 'Dashboard Admin', { size: 15, w: 600, fill: C.text }), t(X, 70, 'Veja o resumo do desempenho do seu gateway!', { size: 8, fill: C.low }),
    g('periodo', r(RX + RW - 132, 40, 132, 24, { fill: C.card, stroke: C.border, rx: 5 }), ico(RX + RW - 124, 45, 'cal', C.muted, 0.75), t(RX + RW - 110, 56, '11 out 2026 - 10 nov 2026', { size: 7.5, w: 600, fill: C.text }))));
  o.push(g('resumo', t(X, 98, 'Resumo', { size: 10, w: 600, fill: C.text }), ico(X + 46, 89, 'eyeOff', C.muted, 0.75),
    r(X + MW - 64, 86, 64, 18, { fill: C.chip, rx: 4 }), r(X + MW - 62, 88, 28, 14, { fill: C.green, rx: 3 }), t(X + MW - 48, 98, 'BRL', { size: 6.5, w: 700, fill: '#052E16', anchor: 'middle' }), t(X + MW - 17, 98, 'MXN', { size: 6.5, fill: C.muted, anchor: 'middle' })));
  const cw = (MW - 20) / 3, kp = (x, y, w, ic, l, v, s, col) => card(`indicador/${l}`, x, y, w, 66,
    r(x + 10, y + 10, 20, 20, { fill: C.chip, rx: 4 }), ico(x + 14, y + 14, ic, C.muted, 0.85),
    t(x + 38, y + 18, l, { size: 7, fill: C.muted }), t(x + 38, y + 37, v, { size: 14, w: 700, fill: col || C.text }), t(x + 38, y + 52, s, { size: 6.5, fill: C.low }));
  const rows = [
    [['users', 'Novos produtores', '37', 'Contas criadas no período'], ['arrowUp', 'Faturamento', 'R$ 1.284.730,10', 'Volume bruto no período'], ['chart', 'Lucro apurado', '-R$ 642,30', '23.410 de 23.410 cobranças apuradas', C.red]],
    [['doc', 'Custo da adquirente', 'R$ 12.906,45', '23.410 de 23.410 cobranças apuradas'], ['pct', 'Taxa de conversão', '43,1%', '23.412 de 54.320 cobranças'], ['ticket', 'Ticket médio', 'R$ 53,40', 'Por cobrança aprovada']],
  ];
  rows.forEach((row, ri) => row.forEach((k, i) => o.push(kp(X + i * (cw + 10), 112 + ri * 76, cw, ...k))));
  const hw = (MW - 10) / 2;
  o.push(kp(X, 264, hw, 'undo', 'Reembolsos', 'R$ 512,00', '0,01% · 2 ocorrências'), kp(X + hw + 10, 264, hw, 'file', 'Chargebacks', 'R$ 61,20', '0,01% · 2 ocorrências'));
  [['wallet', 'Saldo pendente', 'R$ 0,00', 'Posição atual da carteira'], ['card', 'Saldo retido', 'R$ 0,00', 'Reservas de cartão aguardando liberação'], ['wallet', 'Saldo disponível', 'R$ 41.906,77', 'Posição atual da carteira']]
    .forEach((k, i) => o.push(kp(X + i * (cw + 10), 340, cw, ...k)));
  o.push(t(X, 420, 'Saldos atuais, independentes do período selecionado.', { size: 6.5, fill: C.low }));
  o.push(card('mais-indicadores', X, 430, MW, 30, t(X + 10, 449, 'Mais indicadores', { size: 8, w: 600, fill: C.text }), ico(X + MW - 22, 439, 'chevD', C.muted, 0.75)));
  const gy = 470, gh = 290, ch = area(X + 14, gy + 70, MW - 28, gh - 84, 15);
  o.push(card('historico-diario', X, gy, MW, gh, t(X + 10, gy + 20, 'Histórico diário', { size: 9, w: 600, fill: C.text }),
    t(X + 10, gy + 33, 'Volume aprovado por dia, por método de pagamento · BRL', { size: 7, fill: C.muted }),
    r(X + MW - 124, gy + 12, 112, 22, { fill: C.card, stroke: C.border, rx: 4 }), t(X + MW - 116, gy + 26, 'Vendas', { size: 7.5, fill: C.text }), ico(X + MW - 28, gy + 17, 'chevD', C.muted, 0.7),
    t(X + MW - 20, gy + 54, 'parcial', { size: 6, fill: C.low, anchor: 'end' }), line(X + MW - 14, gy + 58, X + MW - 14, gy + gh - 14, C.muted, { dash: '2 2' }), ch.svg));
  // Coluna direita
  const contas = [['Conta Alfa Digital', '402 cobranças', 'R$ 1.204,30', 'CA'], ['Beta Cursos', '1.980 cobranças', 'R$ 188,10', 'BC'], ['GAMA PAGAMENTOS LTDA', '81 cobranças', 'R$ 160,90', 'GP'], ['D. Souza', '590 cobranças', 'R$ 122,40', 'D'], ['Ep', '0 cobranças', 'R$ 58,20', 'E']];
  o.push(card('contas-mais-rentaveis', RX, 80, RW, 336, ico(RX + 10, 89, 'trophy', C.text, 0.8), t(RX + 26, 99, 'Contas mais rentáveis', { size: 8.5, w: 700, fill: C.text }),
    t(RX + 10, 113, 'Por lucro apurado no período: taxa cobrada menos custo da', { size: 7, fill: C.muted }), t(RX + 10, 123, 'adquirente.', { size: 7, fill: C.muted }),
    contas.map(([n, c, v, ini], i) => { const y = 140 + i * 47; return g(`conta/${i + 1}`, t(RX + 12, y + 18, String(i + 1), { size: 7, fill: C.muted }),
      circle(RX + 34, y + 15, 9, C.green), t(RX + 34, y + 18, ini, { size: 6.5, w: 700, fill: '#052E16', anchor: 'middle' }),
      t(RX + 50, y + 6, n, { size: 8, w: 600, fill: C.text }), t(RX + 50, y + 17, c, { size: 6.5, fill: C.muted }), t(RX + 50, y + 29, v, { size: 8, w: 700, fill: C.green })); }),
    r(RX + 10, 382, RW - 20, 22, { fill: C.card, stroke: C.border, rx: 4 }), t(RX + RW / 2, 397, 'Ver todas', { size: 7.5, w: 600, fill: C.text, anchor: 'middle' })));
  o.push(card('avisos', RX, 426, RW, 110, ico(RX + 10, 435, 'mega', C.text, 0.8), t(RX + 26, 445, 'Avisos', { size: 8.5, w: 700, fill: C.text }),
    t(RX + 10, 459, 'O que os lojistas estão vendo no painel deles.', { size: 7, fill: C.muted }),
    r(RX + 10, 468, RW - 20, 28, { fill: C.card, stroke: C.border, rx: 4 }), t(RX + 18, 486, 'Nenhum aviso cadastrado.', { size: 7.5, fill: C.muted }),
    r(RX + 10, 504, RW - 20, 22, { fill: C.card, stroke: C.border, rx: 4 }), t(RX + RW / 2, 519, 'Ver todos os avisos', { size: 7.5, w: 600, fill: C.text, anchor: 'middle' })));
  o.push(card('conversao-e-representatividade', RX, 546, RW, 128, t(RX + 10, 564, 'Conversão e representatividade', { size: 8.5, w: 700, fill: C.text }),
    t(RX + 10, 577, 'Conversão e participação do volume em BRL.', { size: 6.5, fill: C.muted }),
    t(RX + 10, 600, 'Conversão geral', { size: 7, fill: C.muted }), t(RX + RW - 10, 602, '43,1%', { size: 13, w: 700, fill: C.text, anchor: 'end' }), t(RX + 10, 612, '23.412 de 54.320 cobranças', { size: 6.5, fill: C.low }),
    t(RX + 10, 634, 'Pix', { size: 7.5, w: 600, fill: C.text }), t(RX + RW - 10, 634, 'R$ 1.284.730,10 · 100% do volume', { size: 6.5, fill: C.muted, anchor: 'end' }),
    r(RX + 10, 642, RW - 60, 4, { fill: C.chip, rx: 2 }), r(RX + 10, 642, (RW - 60) * 0.43, 4, { fill: C.green, rx: 2 }), t(RX + RW - 10, 647, '43,1%', { size: 7, w: 600, fill: C.text, anchor: 'end' }),
    t(RX + 10, 662, '23.412 aprovadas de 54.320 geradas · 3 estornadas depois', { size: 6, fill: C.low })));
  o.push(card('receita-da-operacao', RX, 684, RW, 60, ico(RX + 10, 693, 'link', C.text, 0.8), t(RX + 26, 703, 'Receita da operação', { size: 8.5, w: 700, fill: C.text }),
    t(RX + 10, 718, 'Consulte os relatórios detalhados da operação.', { size: 7, fill: C.muted })));
  save(path.join(__dirname, 'v1', 'nalapay-backoffice-dashboard.svg'), doc(W, H, 'Nalapay Backoffice - Dashboard Admin v1 (como está)', o, C.page, defs));
}

// ======================= V2 =======================
if (V === 'v2') {
  const H = 1012, X = 236, LW = 800, RX = X + LW + 16, RW = 1416 - RX;
  o.push(sidebar(H));
  o.push(g('topbar', line(SB, 56, W, 56, C.border), ico(SB + 16, 21, 'panel', C.muted), line(SB + 40, 20, SB + 40, 36, C.border), t(SB + 52, 32, 'Dashboard', { size: 12, fill: C.muted })));
  // Cabeçalho com moeda, período e ocultar (S0034)
  o.push(g('cabecalho', t(X, 98, 'Dashboard Admin', { size: 22, w: 700, fill: C.text }),
    t(X, 120, 'Desempenho do gateway em BRL · 11/10/2026 a 10/11/2026 · comparado aos 30 dias anteriores', { size: 12, fill: C.muted }),
    g('moeda', r(1416 - 468, 80, 152, 36, { fill: C.chip, rx: 8 }), r(1416 - 464, 84, 48, 28, { fill: C.green, rx: 6 }), t(1416 - 440, 102.5, 'BRL', { size: 11.5, w: 700, fill: '#052E16', anchor: 'middle' }),
      t(1416 - 390, 102.5, 'MXN', { size: 11.5, fill: C.muted, anchor: 'middle' }), t(1416 - 342, 102.5, 'COP', { size: 11.5, fill: C.muted, anchor: 'middle' })),
    g('periodo', r(1416 - 304, 80, 176, 36, { fill: C.card, stroke: C.border, rx: 6 }), ico(1416 - 292, 91, 'cal', C.muted), t(1416 - 272, 103, 'Últimos 30 dias', { size: 12, fill: C.text }), ico(1416 - 150, 91, 'chevD', C.muted)),
    g('ocultar', r(1416 - 116, 80, 36, 36, { fill: C.card, stroke: C.border, rx: 6 }), ico(1416 - 105, 91, 'eye', C.muted)),
    btn(1416 - 72, 80, 72, 36, 'Exportar', { fill: C.chip, fg: C.text, size: 11.5 })));
  const secao = (y, titulo, nota) => g(`secao/${titulo}`, t(X, y, titulo.toUpperCase(), { size: 10.5, w: 700, fill: C.muted, ls: 0.8 }), nota ? t(X + K.tw(titulo.toUpperCase(), 10.5, 700) + 18, y, nota, { size: 11, fill: C.low === '#6B6B73' ? '#8B8B94' : C.low }) : '');
  // KPI padrão: rótulo + ⓘ, valor, variação
  function kpi(id, x, y, w, h, ic, l, v, d, up, extra = [], col) {
    const c = d ? chip(x + 16, y + 76, d, { fill: up === 1 ? C.greenBg : up === 0 ? C.redBg : C.chip, fg: up === 1 ? C.green : up === 0 ? C.red : C.muted, size: 10, icon: up === 1 ? 'arrowUp' : up === 0 ? 'arrowDown' : null }) : null;
    return card(id, x, y, w, h, r(x + 16, y + 16, 26, 26, { fill: C.chip, rx: 6 }), ico(x + 22, y + 22, ic, C.muted),
      t(x + 50, y + 33, l, { size: 12, fill: C.muted }), ico(x + w - 30, y + 22, 'info', C.low === '#6B6B73' ? '#8B8B94' : C.low, 0.9),
      t(x + 16, y + 66, v, { size: 21, w: 700, fill: col || C.text }), c ? c.svg : '', c && up !== 2 ? t(x + 16 + c.width + 8, y + 89.5, 'vs. 30 dias anteriores', { size: 10.5, fill: '#8B8B94' }) : '', extra);
  }
  const cw = (LW - 24) / 3;
  // VOLUME (S0013, S0014)
  o.push(secao(160, 'Volume'));
  o.push(kpi('indicador/Faturamento', X, 172, cw, 112, 'arrowUp', 'Faturamento', 'R$ 1.284.730,10', '+8,2%', 1));
  o.push(kpi('indicador/Novos produtores', X + cw + 12, 172, cw, 112, 'users', 'Novos produtores', '37', '+12', 1));
  o.push(kpi('indicador/Ticket médio', X + 2 * (cw + 12), 172, cw, 112, 'ticket', 'Ticket médio', 'R$ 53,40', '−1,9%', 0));
  // RESULTADO (S0012)
  o.push(secao(312, 'Resultado'));
  const ly = 324, lh = 166;
  o.push(card('indicador/Lucro apurado', X, ly, cw, lh, r(X + 16, ly + 16, 26, 26, { fill: C.redBg, rx: 6 }), ico(X + 22, ly + 22, 'chart', C.red),
    t(X + 50, ly + 33, 'Lucro apurado', { size: 12, fill: C.muted }), ico(X + cw - 30, ly + 22, 'info', '#8B8B94', 0.9),
    t(X + 16, ly + 66, '−R$ 642,30', { size: 21, w: 700, fill: C.red }),
    t(X + 16, ly + 90, 'Taxa cobrada', { size: 11, fill: C.muted }), t(X + cw - 16, ly + 90, 'R$ 12.264,15', { size: 11, fill: C.text, anchor: 'end' }),
    t(X + 16, ly + 107, '− Custo da adquirente', { size: 11, fill: C.muted }), t(X + cw - 16, ly + 107, 'R$ 12.906,45', { size: 11, fill: C.text, anchor: 'end' }),
    line(X + 16, ly + 115, X + cw - 16, ly + 115, C.border),
    ico(X + 16, ly + 124, 'warn', C.amber, 0.85), t(X + 34, ly + 135, '3 contas com custo maior que a taxa', { size: 10.5, fill: C.amber }),
    t(X + 16, ly + 154, 'Ver detalhamento por conta →', { size: 11, w: 600, fill: C.green })));
  o.push(kpi('indicador/Custo da adquirente', X + cw + 12, ly, cw, lh, 'doc', 'Custo da adquirente', 'R$ 12.906,45', '+11,0%', 0,
    [t(X + cw + 28, ly + 124, 'Sobre 23.410 cobranças apuradas', { size: 10.5, fill: '#8B8B94' }), t(X + cw + 28, ly + 141, 'Média: R$ 0,55 por cobrança', { size: 10.5, fill: '#8B8B94' })]));
  o.push(kpi('indicador/Taxa de conversão', X + 2 * (cw + 12), ly, cw, lh, 'pct', 'Taxa de conversão', '43,1%', '+1,4 p.p.', 1,
    [t(X + 2 * (cw + 12) + 16, ly + 124, '23.412 aprovadas de 54.320', { size: 10.5, fill: '#8B8B94' }), r(X + 2 * (cw + 12) + 16, ly + 136, cw - 32, 6, { fill: C.chip, rx: 3 }), r(X + 2 * (cw + 12) + 16, ly + 136, (cw - 32) * 0.431, 6, { fill: C.green, rx: 3 })]));
  // RISCO (S0016)
  o.push(secao(518, 'Risco'));
  const hw = (LW - 12) / 2;
  const risco = (x, id, ic, l, v, p, n) => card(id, x, 530, hw, 118, r(x + 16, 546, 26, 26, { fill: C.chip, rx: 6 }), ico(x + 22, 552, ic, C.muted),
    t(x + 50, 563, l, { size: 12, fill: C.muted }), chip(x + hw - 136, 548, 'Dentro do limite', { fill: C.greenBg, fg: C.green, size: 10, icon: 'check' }).svg,
    t(x + 16, 596, v, { size: 21, w: 700, fill: C.text }), t(x + 16 + K.tw(v, 21, 700) + 12, 596, `${n} ocorrências`, { size: 11, fill: C.muted }),
    r(x + 16, 612, hw - 32, 6, { fill: C.chip, rx: 3 }), r(x + 16, 612, Math.max(4, (hw - 32) * p / 1.0), 6, { fill: C.green, rx: 3 }), line(x + 16 + (hw - 32) * 0.75, 608, x + 16 + (hw - 32) * 0.75, 622, C.amber),
    t(x + 16, 636, `${p.toFixed(2).replace('.', ',')}% do volume · limite de referência 1,00%`, { size: 10.5, fill: '#8B8B94' }), t(x + hw - 16, 636, 'atenção a partir de 0,75%', { size: 10.5, fill: C.amber, anchor: 'end' }));
  o.push(risco(X, 'indicador/Reembolsos', 'undo', 'Reembolsos', 'R$ 512,00', 0.01, 2), risco(X + hw + 12, 'indicador/Chargebacks', 'file', 'Chargebacks', 'R$ 61,20', 0.01, 2));
  // Histórico diário (S0017)
  const gy = 668, gh = 292, ax = X + 70, aw = LW - 92, ay = gy + 70, ah = gh - 112, ch = area(ax, ay, aw, ah, 16), tip = ch.pts[9];
  o.push(card('historico-diario', X, gy, LW, gh, t(X + 18, gy + 30, 'Histórico diário', { size: 14, w: 600, fill: C.text }),
    t(X + 18, gy + 48, 'Volume aprovado por dia · BRL', { size: 11, fill: C.muted }),
    g('legenda', circle(X + LW - 226, gy + 26, 4, C.green), t(X + LW - 216, gy + 30, 'Pix', { size: 11, fill: C.text })),
    r(X + LW - 180, gy + 14, 162, 30, { fill: C.card, stroke: C.border, rx: 6 }), t(X + LW - 168, gy + 33, 'Métrica: Vendas', { size: 11.5, fill: C.text }), ico(X + LW - 40, gy + 22, 'chevD', C.muted),
    [0, 4, 8, 12, 16].map(v => { const yy = ay + ah - (v / 16) * ah; return line(ax, yy, ax + aw, yy, '#1E1E22') + t(ax - 10, yy + 3.5, v ? `R$ ${v * 10} mil` : 'R$ 0', { size: 10, fill: C.muted, anchor: 'end' }); }),
    ch.svg, DIAS.map((d, i) => i % 4 === 0 ? t(ax + (i / 28) * aw, ay + ah + 20, d, { size: 10, fill: C.muted, anchor: 'middle' }) : ''),
    g('parcial', line(ax + aw, ay, ax + aw, ay + ah, C.muted, { dash: '2 3' }), t(ax + aw - 4, ay + 10, 'hoje (parcial)', { size: 10, fill: C.muted, anchor: 'end' })),
    g('tooltip', line(tip[0], ay, tip[0], ay + ah, '#71717A', { dash: '3 3' }), circle(tip[0], tip[1], 5, C.card, { stroke: C.green, sw: 2 }),
      r(tip[0] + 12, tip[1] - 6, 168, 62, { fill: '#F4F4F5', rx: 8 }), t(tip[0] + 24, tip[1] + 12, 'Qui, 22/10', { size: 10, fill: '#52525B' }),
      t(tip[0] + 24, tip[1] + 30, 'R$ 131.040,00', { size: 13, w: 700, fill: '#18181B' }), t(tip[0] + 24, tip[1] + 45, '2.452 vendas · 47% conversão', { size: 10, fill: '#52525B' }))));
  // Coluna direita: SALDOS (posição atual)
  o.push(t(RX, 160, 'SALDOS', { size: 10.5, w: 700, fill: C.muted, ls: 0.8 }), t(RX + 62, 160, 'posição atual · não depende do período', { size: 11, fill: '#8B8B94' }));
  o.push(card('saldos', RX, 172, RW, 150,
    [['Disponível', 'R$ 41.906,77', C.text, 'Pode ser sacado agora'], ['Pendente', 'R$ 0,00', C.muted, 'Aguardando compensação'], ['Retido', 'R$ 0,00', C.muted, 'Reserva de cartão a liberar']].map(([l, v, c, s], i) => {
      const y = 172 + 16 + i * 44;
      return g(`saldo/${l}`, i ? line(RX + 16, y - 6, RX + RW - 16, y - 6, C.border) : '', t(RX + 16, y + 14, l, { size: 12.5, w: 600, fill: C.text }), t(RX + 16, y + 30, s, { size: 10.5, fill: C.muted }),
        t(RX + RW - 16, y + 22, v, { size: i ? 14 : 18, w: 700, fill: c, anchor: 'end' }));
    })));
  // Contas mais rentáveis (S0015)
  const cy = 338;
  const contas = [['Conta Alfa Digital Ltda.', 'ID 10482 · 402 cobranças', 'R$ 1.204,30'], ['Beta Cursos Online ME', 'ID 10311 · 1.980 cobranças', 'R$ 188,10'],
    ['Gama Pagamentos Ltda.', 'ID 10955 · 81 cobranças', 'R$ 160,90'], ['Daniel Souza (MEI)', 'ID 11020 · 590 cobranças', 'R$ 122,40'], ['Estúdio Prisma ME', 'ID 11107 · 0 cobranças no período', 'R$ 58,20', 1]];
  o.push(card('contas-mais-rentaveis', RX, cy, RW, 424, ico(RX + 16, cy + 18, 'trophy', C.amber), t(RX + 38, cy + 29, 'Contas mais rentáveis', { size: 14, w: 600, fill: C.text }),
    t(RX + 16, cy + 48, 'Lucro apurado no período = taxa cobrada − custo.', { size: 11, fill: C.muted }),
    contas.map(([n, s, v, alerta], i) => {
      const y = cy + 64 + i * 56;
      return g(`conta/${i + 1}`, i ? line(RX + 16, y, RX + RW - 16, y, C.border) : '', t(RX + 20, y + 32, String(i + 1), { size: 11, w: 600, fill: C.muted }),
        r(RX + 36, y + 14, 30, 30, { fill: C.chip, rx: 8 }), t(RX + 51, y + 33, n.split(' ').map(w => w[0]).slice(0, 2).join(''), { size: 10.5, w: 700, fill: C.text, anchor: 'middle' }),
        t(RX + 76, y + 26, n, { size: 12.5, w: 600, fill: C.text }), t(RX + 76, y + 42, s, { size: 10.5, fill: alerta ? C.amber : C.muted }),
        alerta ? ico(RX + RW - 118, y + 20, 'warn', C.amber, 0.85) : '', t(RX + RW - 16, y + 32, v, { size: 12.5, w: 700, fill: C.green, anchor: 'end' }));
    }),
    r(RX + 16, cy + 64 + 5 * 56 + 4, RW - 32, 36, { fill: C.amberBg, rx: 6 }), ico(RX + 26, cy + 64 + 5 * 56 + 15, 'info', C.amber, 0.9),
    t(RX + 46, cy + 64 + 5 * 56 + 26, 'Lucro sem cobrança no período: confira a origem.', { size: 10.5, fill: C.amber }),
    t(RX + RW / 2, cy + 408, 'Ver ranking completo →', { size: 11.5, w: 600, fill: C.green, anchor: 'middle' })));
  // Avisos + glossário (S0033)
  const ay2 = 778;
  o.push(card('avisos', RX, ay2, RW, 102, ico(RX + 16, ay2 + 18, 'mega', C.muted), t(RX + 38, ay2 + 29, 'Avisos aos lojistas', { size: 14, w: 600, fill: C.text }),
    t(RX + 16, ay2 + 52, 'Nenhum aviso publicado. Os lojistas veem os avisos', { size: 11, fill: C.muted }), t(RX + 16, ay2 + 67, 'no topo do painel deles.', { size: 11, fill: C.muted }),
    t(RX + 16, ay2 + 88, '+ Publicar aviso', { size: 11.5, w: 600, fill: C.green })));
  o.push(card('glossario', RX, 892, RW, 100, ico(RX + 16, 910, 'info', C.muted), t(RX + 38, 921, 'Glossário de métricas', { size: 14, w: 600, fill: C.text }),
    t(RX + 16, 944, 'Lucro apurado · Custo da adquirente · Conversão', { size: 11, fill: C.muted }), t(RX + 16, 960, 'Saldo retido · Chargeback · Ticket médio', { size: 11, fill: C.muted }),
    t(RX + 16, 980, 'Abrir glossário →', { size: 11.5, w: 600, fill: C.green })));
  save(path.join(__dirname, 'v2', 'nalapay-backoffice-dashboard.svg'), doc(W, H, 'Nalapay Backoffice - Dashboard Admin v2 (melhorada)', o, C.page, defs));
}
