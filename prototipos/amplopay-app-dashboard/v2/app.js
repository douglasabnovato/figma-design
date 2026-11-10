/* Protótipo v2 — Dashboard AmploPay (conta nova). Dados fictícios, só na memória. */
(() => {
  'use strict';
  const $ = s => document.querySelector(s);
  const esc = window.escHtml;

  const state = {
    periodo: '7',
    ativa: false,
    emAnalise: false,
    etapas: [
      { id: 'conta', nome: 'Dados da conta', feito: true },
      { id: 'empresa', nome: 'Empresa e documentos', feito: false },
      { id: 'saque', nome: 'Conta para saque', feito: false },
      { id: 'analise', nome: 'Análise AmploPay', feito: false },
    ],
  };
  const PERIODOS = { 1: 'hoje', 7: 'nos últimos 7 dias', 30: 'nos últimos 30 dias', 90: 'nos últimos 90 dias' };
  const pct = v => v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%';
  const brl = v => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  // ---------- Ativação (S0035) ----------
  function renderAtivacao() {
    const feitos = state.etapas.filter(e => e.feito).length;
    const atual = state.etapas.find(e => !e.feito);
    $('#ativacao').hidden = state.ativa;
    if (state.ativa) return;
    const faltam = state.etapas.length - feitos;
    $('#ativacaoTitulo').textContent = state.emAnalise ? 'Sua conta está em análise' : 'Ative sua conta para começar a vender';
    $('#ativacaoTexto').textContent = state.emAnalise
      ? 'Recebemos tudo. A equipe AmploPay vai analisar os dados e avisar você por e-mail. Enquanto isso, você já pode criar seus produtos.'
      : `Falta${faltam > 1 ? 'm' : ''} ${faltam} etapa${faltam > 1 ? 's' : ''}. Enquanto a conta não for ativada, as vendas e os saques ficam bloqueados.`;
    $('#continuar').textContent = state.emAnalise ? 'Simular aprovação' : 'Continuar ativação';
    $('#barra').firstElementChild.style.width = (feitos / state.etapas.length * 100) + '%';
    $('#barra').setAttribute('aria-valuenow', feitos);
    $('#barra').setAttribute('aria-label', `${feitos} de ${state.etapas.length} etapas concluídas`);
    $('#etapas').innerHTML = state.etapas.map((e, i) => {
      const cls = e.feito ? 'done' : e === atual ? 'now' : '';
      const sub = e.feito ? 'Concluído' : e === atual ? (e.id === 'analise' ? 'Em análise' : 'Em andamento') : e.id === 'analise' ? 'Depois do envio' : 'Pendente';
      const clicavel = e === atual && e.id !== 'analise';
      return `<li class="${cls}"><button type="button" data-etapa="${e.id}" ${clicavel ? '' : 'disabled'}>
        <span class="dot">${e.feito ? '<i data-i="check"></i>' : i + 1}</span><span><strong>${e.nome}</strong><small>${sub}</small></span></button></li>`;
    }).join('');
    window.pintarIcones($('#etapas'));
  }

  function proximaEtapa() {
    if (state.emAnalise) return aprovar();
    const atual = state.etapas.find(e => !e.feito);
    if (atual.id === 'empresa') return modalEmpresa();
    if (atual.id === 'saque') return modalSaque();
  }

  function modalEmpresa() {
    abrirModal('Empresa e documentos', `
      <label class="field">CNPJ ou CPF<input id="fDoc" inputmode="numeric" placeholder="00.000.000/0001-00" autocomplete="off"></label>
      <label class="field">Razão social ou nome completo<input id="fNome" placeholder="Loja Exemplo Ltda." autocomplete="off"></label>
      <div class="field">Documento com foto do responsável<div class="upload" id="fUpload" tabindex="0" role="button">Clique para anexar (protótipo: simula o envio)</div></div>
      <p class="err" id="mErr"></p>`, 'Salvar e continuar', () => {
      if ($('#fDoc').value.replace(/\D/g, '').length < 11) return erro('Informe um CPF ou CNPJ válido.');
      if (!$('#fNome').value.trim()) return erro('Informe o nome ou a razão social.');
      if (!$('#fUpload').classList.contains('ok')) return erro('Anexe o documento com foto.');
      concluir('empresa', 'Empresa e documentos salvos.');
    });
    $('#fUpload').addEventListener('click', e => { e.currentTarget.classList.add('ok'); e.currentTarget.textContent = '✓ documento-responsavel.jpg anexado'; });
  }

  function modalSaque() {
    abrirModal('Conta para saque', `
      <label class="field">Tipo de chave Pix<select id="fTipo"><option>CNPJ</option><option>CPF</option><option>E-mail</option><option>Celular</option><option>Aleatória</option></select></label>
      <label class="field">Chave Pix<input id="fChave" placeholder="financeiro@lojaexemplo.com" autocomplete="off"><small>A chave precisa estar no mesmo CPF ou CNPJ da conta.</small></label>
      <p class="err" id="mErr"></p>`, 'Enviar para análise', () => {
      if (!$('#fChave').value.trim()) return erro('Informe a chave Pix.');
      concluir('saque', 'Tudo enviado. Sua conta entrou em análise.');
      state.emAnalise = true;
      renderAtivacao();
    });
  }

  function concluir(id, msg) {
    state.etapas.find(e => e.id === id).feito = true;
    fecharModal(); renderAtivacao(); toast(msg);
  }
  function aprovar() {
    state.etapas.forEach(e => { e.feito = true; });
    state.ativa = true; state.emAnalise = false;
    renderAtivacao(); renderMetodos(); renderVazio();
    toast('Conta ativada! Pix, boleto e cartão já estão liberados.');
  }

  // ---------- Indicadores (S0038: formatos pt-BR) ----------
  function renderKpis() {
    const sem = `Sem vendas ${PERIODOS[state.periodo]}`;
    const k = [
      ['dollar', 'Aprovado', brl(0), sem, 'Soma das vendas aprovadas no período.'],
      ['ticket', 'Ticket médio', brl(0), sem, 'Valor aprovado dividido pelo número de vendas aprovadas.'],
      ['check', 'Transações aprovadas', '0', sem, 'Quantidade de vendas aprovadas no período.'],
      ['card', 'Saldo disponível', brl(0), null, 'Valor que já pode ser sacado. Não depende do período.'],
      ['pct', 'Conversão geral', pct(0), sem, 'Vendas aprovadas divididas por todas as tentativas de pagamento.'],
    ];
    $('#kpis').innerHTML = k.map(([ic, l, v, h, tip]) => `<article class="kpi">
      <div class="kpi-label"><span><i data-i="${ic}"></i></span>${l}<i data-i="info" title="${esc(tip)}" aria-label="${esc(tip)}"></i></div>
      <strong>${v}</strong>${h ? `<small>${h}</small>` : '<a class="link" data-nav="Saldo em cripto">Ver saldo em cripto <i data-i="ext"></i></a>'}</article>`).join('');
    window.pintarIcones($('#kpis'));
  }

  function renderVazio() {
    $('#vazioTitulo').textContent = `Nenhuma venda ${PERIODOS[state.periodo]}`;
    $('#vazioTexto').textContent = state.ativa
      ? 'Sua conta está ativa. Crie um produto ou conecte o seu checkout para começar a vender.'
      : 'Depois da ativação, crie um produto ou conecte o seu checkout. As vendas aparecem aqui em tempo real.';
  }

  function renderMetodos() {
    const m = [['pix', 'Pix'], ['barcode', 'Boleto'], ['card', 'Cartão de crédito']];
    $('#metodos').innerHTML = m.map(([ic, l]) => `<li><span class="m-icon"><i data-i="${ic}"></i></span>
      <div><b>${l}</b><small>${pct(0).replace(',00', ',0')} de conversão · 0 vendas</small></div>
      ${state.ativa ? '<span class="pill ok"><i data-i="check"></i>Ativo</span>' : '<span class="pill"><i data-i="lock"></i>Após a ativação</span>'}</li>`).join('');
    window.pintarIcones($('#metodos'));
  }

  // ---------- Modal e toast ----------
  let onSubmit = null;
  function abrirModal(titulo, corpo, acao, submit) {
    $('#modalTitulo').textContent = titulo;
    $('#modalBody').innerHTML = corpo;
    $('#modalFoot').innerHTML = `<button type="button" class="btn" data-close>Cancelar</button>${acao ? `<button class="btn orange">${acao}</button>` : ''}`;
    onSubmit = submit || null;
    $('#modal').hidden = false;
    window.pintarIcones($('#modal'));
    $('#modalBody input, #modalBody select')?.focus();
  }
  const fecharModal = () => { $('#modal').hidden = true; onSubmit = null; };
  const erro = m => { $('#mErr').textContent = m; };
  let tt;
  const toast = m => { const el = $('#toast'); el.textContent = m; el.hidden = false; clearTimeout(tt); tt = setTimeout(() => { el.hidden = true; }, 3200); };

  // ---------- Eventos ----------
  document.addEventListener('click', e => {
    const nav = e.target.closest('[data-nav]');
    if (nav) { e.preventDefault(); return toast(`“${nav.dataset.nav}” não faz parte deste protótipo.`); }
    if (e.target.closest('[data-close]')) return fecharModal();
    const et = e.target.closest('[data-etapa]');
    if (et && !et.disabled) return proximaEtapa();
    const grp = e.target.closest('.group > .item');
    if (grp) {
      const aberto = grp.getAttribute('aria-expanded') === 'true';
      grp.setAttribute('aria-expanded', String(!aberto));
      grp.nextElementSibling.hidden = aberto;
    }
    const cp = e.target.closest('[data-copiar]');
    if (cp) { navigator.clipboard?.writeText(cp.dataset.copiar).catch(() => {}); toast('Link copiado.'); }
  });
  $('#continuar').addEventListener('click', proximaEtapa);
  $('#modalForm').addEventListener('submit', e => { e.preventDefault(); onSubmit?.(); });
  $('#modal').addEventListener('click', e => { if (e.target.id === 'modal') fecharModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') fecharModal(); });
  $('#periodo').addEventListener('change', e => {
    state.periodo = e.target.value;
    $('#subtitulo').textContent = `Resumo das suas vendas ${PERIODOS[state.periodo]}.`;
    renderKpis(); renderVazio();
  });
  $('#fecharIndique').addEventListener('click', () => { $('#indique').hidden = true; toast('Ok, você encontra o link em “Indique e ganhe”, no menu.'); });
  $('#verLink').addEventListener('click', () => {
    const link = 'https://amplopay.com.br/r/loja-exemplo';
    abrirModal('Seu link de indicação', `<p class="muted">Compartilhe com outros produtores. Você recebe 1% do volume que eles venderem.</p>
      <div class="copy"><span>${link}</span><button type="button" class="btn" data-copiar="${link}"><i data-i="copy"></i>Copiar</button></div>`, null);
  });
  $('#guia').addEventListener('click', () => abrirModal('Primeiros passos', `<ol class="guide">
      <li><b>Ative a conta:</b> dados da empresa, documento e chave Pix.</li>
      <li><b>Crie um produto:</b> nome, preço e forma de entrega.</li>
      <li><b>Conecte o checkout</b> ou use o checkout AmploPay.</li>
      <li><b>Faça uma venda de teste</b> e acompanhe aqui no dashboard.</li></ol>`, null));
  $('#tema').addEventListener('click', e => {
    const dark = document.documentElement.dataset.theme !== 'dark';
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    e.currentTarget.querySelector('i').dataset.i = dark ? 'sun' : 'moon';
    window.pintarIcones(e.currentTarget);
  });

  window.pintarIcones();
  renderAtivacao(); renderKpis(); renderMetodos(); renderVazio();
})();
