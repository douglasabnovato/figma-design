// Gera os mockups do Dashboard do app AmploPay (conta nova, ainda não ativada).
// Uso: node gerar-svg.js v1|v2   (grava em ./v1/ ou ./v2/)
const path = require('path');
const K = require('../../ferramentas/svgkit');
const { t, tr, r, line, circle, g, ico, chip, btn, doc, save } = K;

const V = process.argv[2] || 'v1';
const W = 1440;
const C = {
  text: '#1F2937', muted: '#6B7280', subtle: '#9CA3AF', border: '#E5E7EB', bg: '#FFFFFF', page: '#F9FAFB',
  orange: '#F5A300', orangeDark: '#B45309', orangeBg: '#FFF4DB', orangeBd: '#FCD58A',
  red: '#F43F5E', green: '#16A34A', greenBg: '#DCFCE7', dark: '#18181B',
};
const SB = 200; // largura da sidebar
const X = 240, CW = 1170; // área de conteúdo
const o = [];

// ---------- Sidebar ----------
function sidebar(top, H) {
  const p = [r(0, top, SB, H - top, { fill: C.bg }), line(SB, top, SB, H, C.border)];
  p.push(g('logo',
    `<path d="M20 ${top + 40}l9-16 9 16h-5l-4-7-4 7z" fill="${C.orange}"/>`,
    tr(44, top + 38, [['AMPLO', { w: 700, fill: C.text }], ['PAY', { w: 700, fill: C.orange }]], { size: 15 })));
  p.push(line(0, top + 60, SB, top + 60, C.border));
  p.push(t(16, top + 84, 'PRINCIPAL', { size: 9, w: 500, fill: C.subtle, ls: 0.6 }));
  const items = [['Dashboard', 'home', 0, 1], ['Vitrine', 'store'], ['Vendas', 'bag', 1], ['Financeiro', 'wallet', 1], ['Relatórios', 'file', 1],
    ['Clientes', 'users', 1], ['Produtos', 'box', 1], ['Configurações', 'gear', 1], ['Integrações', 'plug'], ['Indique e ganhe', 'gift']];
  let y = top + 96;
  items.forEach(([label, icon, sub, active]) => {
    const q = [];
    if (active) q.push(r(8, y, SB - 16, 30, { fill: C.orangeBg, rx: 6 }));
    q.push(ico(18, y + 8, icon, active ? C.orange : C.muted));
    q.push(t(40, y + 19.5, label, { size: 12, w: active ? 600 : 400, fill: active ? C.orangeDark : C.text }));
    // v1: seta apontando para a esquerda (como no print); v2: seta para a direita (S0039)
    if (sub) q.push(ico(SB - 30, y + 8, V === 'v1' ? 'chevL' : 'chevR', C.subtle));
    p.push(g(`menu/${label}`, q));
    y += 34;
  });
  p.push(g('desconectar', line(0, H - 44, SB, H - 44, C.border), ico(18, H - 29, 'logout', C.red), t(40, H - 18, 'Desconectar', { size: 12, fill: C.red })));
  return g('sidebar', p);
}

function topbar(top) {
  return g('topbar',
    r(SB, top, W - SB, 56, { fill: C.bg }), line(SB, top + 56, W, top + 56, C.border),
    ico(1258, top + 21, 'moon', C.muted),
    ico(1290, top + 21, 'user', C.muted),
    t(1312, top + 32, 'Loja Exemplo', { size: 12, w: 500 }),
    ico(1398, top + 21, 'chevD', C.muted));
}

function kpis(y, h, items) {
  const gap = 10, w = (CW - gap * 4) / 5;
  return g('indicadores', items.map(([icon, label, value, hint, link], i) => {
    const x = X + i * (w + gap);
    const q = [r(x, y, w, h, { fill: C.bg, stroke: C.border, rx: 10 }),
      r(x + 14, y + 14, 26, 26, { fill: C.orangeBg, rx: 6 }), ico(x + 20, y + 20, icon, C.orange),
      t(x + 48, y + 31, label, { size: 11, fill: C.muted }),
      t(x + 14, y + 64, value, { size: 18, w: 600 })];
    if (hint) q.push(t(x + 14, y + 82, hint, { size: 10, fill: C.subtle }));
    if (link) q.push(t(x + 14, y + (hint ? 98 : 82), link, { size: 10, w: 500, fill: C.orangeDark }), ico(x + 14 + K.tw(link, 10, 500) + 3, y + (hint ? 89 : 73), 'ext', C.orangeDark, 0.65));
    return g(`indicador/${label}`, q);
  }));
}

function card(id, x, y, w, h, ...c) { return g(id, r(x, y, w, h, { fill: C.bg, stroke: C.border, rx: 10 }), ...c); }

// ======================= V1: como está =======================
if (V === 'v1') {
  const H = 760;
  o.push(g('faixa-produtor-inativo', r(0, 0, W, 22, { fill: C.red }),
    t(W / 2, 15, 'Produtor não está ativo.', { size: 11, w: 500, fill: '#FFFFFF', anchor: 'middle' }),
    line(W / 2 - 62, 17, W / 2 + 62, 17, '#FFFFFF')));
  o.push(sidebar(22, H), topbar(22));

  // Banner promocional (a ilustração do print é uma foto; aqui vira um espaço reservado)
  const bx = 420, by = 104, bw = 680, bh = 118;
  o.push(g('banner-indique-e-ganhe',
    r(bx, by, bw, bh, { fill: '#FFFBF2', stroke: C.orange, sw: 2, rx: 10 }),
    `<text x="${bx + 24}" y="${by + 50}" font-family="${K.FONT}" font-size="34" font-weight="800" font-style="italic" fill="${C.dark}">INDIQUE E <tspan fill="${C.orange}">GANHE!!!</tspan></text>`,
    r(bx + 22, by + 62, 300, 20, { fill: C.orangeBg }),
    t(bx + 26, by + 77, 'Indique novos produtores para a AmploPay e', { size: 12, w: 700, fill: C.dark }),
    r(bx + 22, by + 84, 224, 20, { fill: C.orange }),
    t(bx + 26, by + 99, 'receba 1% do volume vendido por eles.', { size: 12, w: 700, fill: C.dark }),
    r(bx + 350, by + 10, 150, bh - 20, { fill: '#F3F4F6', rx: 8, dash: '4 3', stroke: C.subtle }),
    t(bx + 425, by + 62, '[foto ilustrativa]', { size: 10, fill: C.subtle, anchor: 'middle' }),
    t(bx + 520, by + 52, 'Uma forma inteligente', { size: 10, fill: C.muted }),
    t(bx + 520, by + 66, 'de gerar receita recorrente', { size: 10, w: 600, fill: C.text }),
    t(bx + 520, by + 80, 'apenas compartilhando', { size: 10, fill: C.muted }),
    t(bx + 520, by + 94, 'seu link de indicação.', { size: 10, fill: C.muted })));

  const ty = 268;
  o.push(g('cabecalho', t(X, ty, 'Dashboard', { size: 20, w: 700 }), t(X, ty + 16, 'Principal / Dashboard', { size: 10, fill: C.subtle }),
    g('filtro-periodo', r(X + CW - 104, ty - 20, 104, 28, { fill: C.bg, stroke: C.border, rx: 6 }), ico(X + CW - 94, ty - 13, 'cal', C.muted, 0.85), t(X + CW - 76, ty - 2, 'Última semana', { size: 10.5 }))));

  o.push(kpis(304, 92, [['dollar', 'Aprovado', 'R$ 0,00'], ['ticket', 'Ticket médio', 'R$ 0,00'], ['check', 'Transações aprovadas', '0'],
    ['card', 'Saldo disponível', 'R$ 0,00', null, 'Ver saldo Cripto'], ['pct', 'Conversão geral', '0.00%']]));

  // Gráfico zerado
  const gy = 410, gw = 800, gh = 320, ax = X + 50, ay0 = gy + 70, ay1 = gy + gh - 40;
  const mid = (ay0 + ay1) / 2, dias = ['04/11', '05/11', '06/11', '07/11', '08/11', '09/11', '10/11'];
  const step = (gw - 90) / (dias.length - 1);
  o.push(card('resumo-das-transacoes', X, gy, gw, gh,
    t(X + 18, gy + 28, 'Resumo das transações', { size: 13, w: 600 }), t(X + 18, gy + 44, 'Acompanhe o histórico do seu negócio', { size: 10, fill: C.subtle }),
    line(ax, ay0, ax, ay1, C.dark), line(ax, ay1, X + gw - 20, ay1, C.dark),
    t(ax - 8, mid + 3, 'R$ 0', { size: 8, fill: C.muted, anchor: 'end' }),
    line(ax, mid, ax + step * (dias.length - 1), mid, C.orange, { sw: 1.5 }),
    dias.map((d, i) => circle(ax + i * step, mid, 3.5, C.bg, { stroke: C.orange, sw: 1.5 }) + t(ax + i * step, ay1 + 16, d, { size: 8, fill: C.muted, anchor: 'middle' }))));

  // Coluna direita
  const rx = X + gw + 12, rw = CW - gw - 12;
  o.push(card('jornada-de-conquistas', rx, gy, rw, 96,
    t(rx + 16, gy + 26, 'Jornada de conquistas', { size: 12, w: 600 }),
    t(rx + rw - 30, gy + 26, 'Saiba mais', { size: 10, fill: C.orange, anchor: 'end' }), ico(rx + rw - 26, gy + 17, 'ext', C.orange, 0.7),
    t(rx + 16, gy + 52, 'Você está', { size: 10.5, fill: C.muted }), t(rx + rw - 16, gy + 52, 'Sem nível', { size: 10.5, w: 500, anchor: 'end' }),
    line(rx + 16, gy + 62, rx + rw - 16, gy + 62, C.border),
    t(rx + 16, gy + 82, 'Próximo nível', { size: 10.5, fill: C.muted }),
    ico(rx + rw - 128, gy + 72, 'trophy', C.orange, 0.8), t(rx + rw - 16, gy + 82, '10 mil em saques', { size: 10.5, w: 500, anchor: 'end' })));
  const my = gy + 108;
  o.push(card('metodos-de-pagamento', rx, my, rw, 156,
    t(rx + 16, my + 28, 'Métodos de Pagamento', { size: 13, w: 600 }),
    [['pix', 'Pix'], ['barcode', 'Boleto'], ['card', 'Cartão de Crédito']].map(([ic, l], i) => {
      const yy = my + 50 + i * 36;
      return g(`metodo/${l}`, r(rx + 16, yy, 26, 26, { fill: C.orangeBg, rx: 13 }), ico(rx + 22, yy + 6, ic, C.orange),
        t(rx + 52, yy + 11, l, { size: 11 }), t(rx + 52, yy + 24, '0.0% de conversão', { size: 9, fill: C.subtle }),
        t(rx + rw - 16, yy + 17, '0 vendas', { size: 10.5, w: 500, anchor: 'end' }));
    })));

  save(path.join(__dirname, 'v1', 'amplopay-app-dashboard.svg'), doc(W, H, 'AmploPay App - Dashboard v1 (como está)', o, C.page));
}

// ======================= V2: melhorada =======================
if (V === 'v2') {
  const H = 840;
  o.push(sidebar(0, H), topbar(0));

  // S0040: título com subtítulo descritivo no lugar do breadcrumb
  const ty = 98;
  o.push(g('cabecalho', t(X, ty, 'Dashboard', { size: 22, w: 700 }),
    t(X, ty + 20, 'Resumo das suas vendas nos últimos 7 dias.', { size: 12, fill: C.muted }),
    g('filtro-periodo', r(X + CW - 150, ty - 22, 150, 34, { fill: C.bg, stroke: C.border, rx: 6 }), ico(X + CW - 138, ty - 12, 'cal', C.muted),
      t(X + CW - 118, ty, 'Últimos 7 dias', { size: 12 }), ico(X + CW - 26, ty - 12, 'chevD', C.muted))));

  // S0035: card de ativação com etapas e progresso
  const ay = 140, ah = 150;
  const steps = [['Dados da conta', 'Concluído', 'done'], ['Empresa e documentos', 'Em andamento', 'now'], ['Conta para saque', 'Pendente', ''], ['Análise AmploPay', 'Depois do envio', '']];
  const sx = X + 24, sw = (CW - 48) / 4;
  o.push(g('ativacao-da-conta',
    r(X, ay, CW, ah, { fill: '#FFFDF7', stroke: C.orangeBd, rx: 12 }),
    r(X + 24, ay + 22, 36, 36, { fill: C.orangeBg, rx: 10 }), ico(X + 35, ay + 33, 'rocket', C.orangeDark),
    t(X + 72, ay + 36, 'Ative sua conta para começar a vender', { size: 15, w: 700 }),
    t(X + 72, ay + 54, 'Faltam 3 etapas. Enquanto a conta não for ativada, as vendas e os saques ficam bloqueados.', { size: 12, fill: C.muted }),
    btn(X + CW - 196, ay + 24, 172, 36, 'Continuar ativação', { fill: C.orange, fg: C.dark }),
    t(X + CW - 110, ay + 76, 'Falar com o suporte', { size: 11, w: 500, fill: C.orangeDark, anchor: 'middle' }),
    r(X + 24, ay + 88, CW - 48, 6, { fill: '#F3E8D0', rx: 3 }), r(X + 24, ay + 88, (CW - 48) * 0.25, 6, { fill: C.orange, rx: 3 }),
    steps.map(([l, s, st], i) => {
      const x = sx + i * sw, cy = ay + 122;
      const col = st === 'done' ? C.green : st === 'now' ? C.orange : C.subtle;
      return g(`etapa/${i + 1} ${l}`,
        st === 'done' ? circle(x + 10, cy, 10, C.green) + ico(x + 3, cy - 7, 'check', '#FFFFFF', 1, 2)
          : circle(x + 10, cy, 9, C.bg, { stroke: col, sw: 2 }) + t(x + 10, cy + 4, String(i + 1), { size: 10, w: 700, fill: col, anchor: 'middle' }),
        t(x + 28, cy - 2, l, { size: 12, w: st === 'now' ? 700 : 500, fill: st ? C.text : C.muted }),
        t(x + 28, cy + 13, s, { size: 10.5, fill: col === C.subtle ? C.muted : col }));
    })));

  // S0038: formatos pt-BR · S0037: indicadores dizem que não há vendas
  o.push(kpis(308, 96, [['dollar', 'Aprovado', 'R$ 0,00', 'Sem vendas no período'], ['ticket', 'Ticket médio', 'R$ 0,00', 'Sem vendas no período'],
    ['check', 'Transações aprovadas', '0', 'Sem vendas no período'], ['card', 'Saldo disponível', 'R$ 0,00', null, 'Ver saldo em cripto'], ['pct', 'Conversão geral', '0,00%', 'Sem vendas no período']]));

  // S0037: estado vazio com próximo passo
  const gy = 420, gw = 780, gh = 390;
  const ex = X + gw / 2;
  o.push(card('resumo-das-transacoes', X, gy, gw, gh,
    t(X + 20, gy + 30, 'Resumo das transações', { size: 14, w: 600 }), t(X + 20, gy + 48, 'Valor aprovado por dia', { size: 11, fill: C.muted }),
    [0, 1, 2, 3].map(i => line(X + 20, gy + 90 + i * 60, X + gw - 20, gy + 90 + i * 60, '#F1F2F4')),
    g('estado-vazio',
      r(ex - 270, gy + 112, 540, 244, { fill: C.bg }),
      circle(ex, gy + 150, 30, C.orangeBg), ico(ex - 14, gy + 136, 'chart', C.orangeDark, 2, 1.2),
      t(ex, gy + 208, 'Nenhuma venda nos últimos 7 dias', { size: 15, w: 600, anchor: 'middle' }),
      t(ex, gy + 230, 'Depois da ativação, crie um produto ou conecte o seu checkout.', { size: 12, fill: C.muted, anchor: 'middle' }),
      t(ex, gy + 247, 'As vendas aparecem aqui em tempo real.', { size: 12, fill: C.muted, anchor: 'middle' }),
      btn(ex - 182, gy + 270, 176, 38, 'Criar primeiro produto', { primary: true, icon: 'plus' }),
      btn(ex + 6, gy + 270, 176, 38, 'Conectar checkout', { icon: 'plug' }),
      t(ex, gy + 336, 'Ver guia de primeiros passos', { size: 11, w: 500, fill: C.orangeDark, anchor: 'middle' }))));

  // Coluna direita
  const rx = X + gw + 14, rw = CW - gw - 14;
  // S0041: jornada com barra de progresso
  o.push(card('jornada-de-conquistas', rx, gy, rw, 128,
    ico(rx + 16, gy + 18, 'trophy', C.orange), t(rx + 38, gy + 29, 'Jornada de conquistas', { size: 13, w: 600 }),
    t(rx + rw - 16, gy + 29, 'Saiba mais', { size: 11, w: 500, fill: C.orangeDark, anchor: 'end' }),
    t(rx + 16, gy + 56, 'Nível atual: Sem nível', { size: 11.5, fill: C.muted }),
    t(rx + rw - 16, gy + 56, 'Próximo: 10 mil em saques', { size: 11.5, w: 600, anchor: 'end' }),
    r(rx + 16, gy + 68, rw - 32, 8, { fill: '#F3F4F6', rx: 4 }), r(rx + 16, gy + 68, 2, 8, { fill: C.orange, rx: 1 }),
    t(rx + 16, gy + 96, 'R$ 0,00 de R$ 10.000,00 em saques', { size: 11, fill: C.muted }),
    t(rx + 16, gy + 113, 'Faltam R$ 10.000,00 para o primeiro nível.', { size: 11, w: 500 })));
  // Métodos com status explícito
  const my = gy + 140;
  o.push(card('metodos-de-pagamento', rx, my, rw, 152,
    t(rx + 16, my + 28, 'Métodos de pagamento', { size: 13, w: 600 }),
    [['pix', 'Pix'], ['barcode', 'Boleto'], ['card', 'Cartão de crédito']].map(([ic, l], i) => {
      const yy = my + 46 + i * 34;
      const c = chip(rx + rw - 16 - 124, yy + 4, 'Após a ativação', { fill: '#F3F4F6', fg: C.muted, icon: 'lock', size: 9.5 });
      return g(`metodo/${l}`, r(rx + 16, yy, 26, 26, { fill: C.orangeBg, rx: 13 }), ico(rx + 22, yy + 6, ic, C.orange),
        t(rx + 52, yy + 11, l, { size: 11.5, w: 500 }), t(rx + 52, yy + 24, '0,0% de conversão · 0 vendas', { size: 10, fill: C.muted }), c.svg);
    })));
  // S0036: Indique e ganhe compacto e dispensável
  const iy = my + 164;
  o.push(card('indique-e-ganhe', rx, iy, rw, 86,
    r(rx + 16, iy + 18, 32, 32, { fill: C.orangeBg, rx: 8 }), ico(rx + 25, iy + 27, 'gift', C.orangeDark),
    t(rx + 58, iy + 30, 'Indique e ganhe 1%', { size: 13, w: 700 }),
    t(rx + 58, iy + 47, 'Receba 1% do volume vendido pelos', { size: 11, fill: C.muted }),
    t(rx + 58, iy + 62, 'produtores que você indicar.', { size: 11, fill: C.muted }),
    t(rx + 58, iy + 78, 'Ver meu link de indicação', { size: 11, w: 600, fill: C.orangeDark }),
    ico(rx + rw - 28, iy + 14, 'x', C.subtle, 0.85)));

  save(path.join(__dirname, 'v2', 'amplopay-app-dashboard.svg'), doc(W, H, 'AmploPay App - Dashboard v2 (melhorada)', o, C.page));
}
