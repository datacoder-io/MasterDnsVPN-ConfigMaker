// ==============================================================
// MasterDnsVPN Config Maker — App Logic
// ==============================================================

const state = { activeTab: 'client', values: { client: {}, server: {} } };

// ─── Helpers ───
function $(sel, ctx = document) { return ctx.querySelector(sel); }
function $$(sel, ctx = document) { return [...ctx.querySelectorAll(sel)]; }

function showToast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 2500);
}

function formatValue(v, type) {
  if (type === 'bool') return v ? 'true' : 'false';
  if (type === 'select') return typeof v === 'string' ? `"${v}"` : v;
  if (typeof v === 'string') {
    const t = v.trim();
    // Already a TOML array — emit raw, no surrounding quotes
    if (t.startsWith('[')) return t;
    return `"${v}"`;
  }
  return v;
}

// ─── Build UI ───
function buildSection(section, configType) {
  const div = document.createElement('div');
  div.className = 'config-section';
  div.id = `section-${section.id}`;

  const chevronSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>';

  div.innerHTML = `
    <div class="section-header" data-section="${section.id}">
      <div class="section-icon ${section.iconClass}">${section.icon}</div>
      <div class="section-info">
        <div class="section-title">${section.title}</div>
        <div class="section-desc">${section.desc}</div>
      </div>
      <div class="section-chevron">${chevronSvg}</div>
    </div>
    <div class="section-body">
      <div class="section-body-inner"></div>
    </div>`;

  const body = $('.section-body-inner', div);
  const fields = section.fields;
  let i = 0;

  while (i < fields.length) {
    const f = fields[i];
    const isFullWidth = f.type === 'text' && (f.key.includes('FORMAT') || f.key.includes('FILE_NAME') || f.key === 'DOMAINS' || f.key === 'DOMAIN' || f.key.includes('UPSTREAM') || f.key.includes('COMPRESSION_TYPES'));
    const nextF = fields[i + 1];
    const canPair = !isFullWidth && nextF && !(nextF.type === 'text' && (nextF.key.includes('FORMAT') || nextF.key.includes('FILE_NAME')));

    if (isFullWidth || f.type === 'bool') {
      body.appendChild(buildFieldRow([f], configType, true));
      i++;
    } else if (canPair && nextF.type !== 'bool') {
      body.appendChild(buildFieldRow([f, nextF], configType, false));
      i += 2;
    } else {
      body.appendChild(buildFieldRow([f], configType, true));
      i++;
    }
  }

  // Click to toggle
  $('.section-header', div).addEventListener('click', () => {
    div.classList.toggle('open');
  });

  return div;
}

function buildFieldRow(fields, configType, fullWidth) {
  const row = document.createElement('div');
  row.className = 'field-row';

  fields.forEach(f => {
    const fd = document.createElement('div');
    fd.className = 'field' + (fullWidth && fields.length === 1 ? ' full-width' : '');
    fd.dataset.key = f.key;
    fd.dataset.configType = configType;
    if (f.showIf) fd.dataset.showIf = f.showIf;

    // Set default
    state.values[configType][f.key] = f.default;

    const perfBadge = f.perf ? `<span class="perf-badge perf-${f.perf}">${perfLabel(f.perf)}</span>` : '';
    const infoBtn = f.info ? `<button class="field-info-btn" data-key="${f.key}" data-config="${configType}">؟</button>` : '';

    let inputHTML = '';
    if (f.type === 'bool') {
      inputHTML = `
        <div class="toggle-wrapper">
          <div class="toggle ${f.default ? 'active' : ''}" data-key="${f.key}" data-config="${configType}"></div>
          <span class="toggle-label">${f.default ? 'فعال' : 'غیرفعال'}</span>
        </div>`;
    } else if (f.type === 'select') {
      const opts = f.options.map(o => `<option value="${o.v}" ${o.v == f.default ? 'selected' : ''}>${o.t}</option>`).join('');
      inputHTML = `<select data-key="${f.key}" data-config="${configType}">${opts}</select>`;
    } else if (f.type === 'password') {
      inputHTML = `<input type="password" data-key="${f.key}" data-config="${configType}" value="${f.default}" autocomplete="off">`;
    } else if (f.type === 'number') {
      const step = f.step || (f.min !== undefined && f.min % 1 !== 0 ? 0.01 : 1);
      inputHTML = `<input type="number" data-key="${f.key}" data-config="${configType}" value="${f.default}" ${f.min !== undefined ? `min="${f.min}"` : ''} ${f.max !== undefined ? `max="${f.max}"` : ''} step="${step}">`;
    } else {
      inputHTML = `<input type="text" data-key="${f.key}" data-config="${configType}" value="${escapeHTML(String(f.default))}">`;
    }

    const clampHTML = f.clamp ? `<div class="field-clamp">محدوده: ${f.clamp}</div>` : '';
    const hintHTML = f.hint ? `<div class="field-hint">${f.hint}</div>` : '';

    fd.innerHTML = `
      <div class="field-top">
        <div class="field-label">
          ${f.label}
          <span class="field-key">${f.key}</span>
          ${perfBadge}
        </div>
        ${infoBtn}
      </div>
      ${hintHTML}
      ${inputHTML}
      ${clampHTML}`;

    row.appendChild(fd);
  });

  return row;
}

function perfLabel(type) {
  const map = { speed: '⚡ سرعت', stability: '🛡️ پایداری', security: '🔐 امنیت', cpu: '💻 CPU', bandwidth: '📡 پهنای باند' };
  return map[type] || type;
}

function escapeHTML(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ─── Init ───
function init() {
  const clientPanel = $('#panel-client');
  const serverPanel = $('#panel-server');

  CLIENT_SECTIONS.forEach(s => clientPanel.appendChild(buildSection(s, 'client')));
  SERVER_SECTIONS.forEach(s => serverPanel.appendChild(buildSection(s, 'server')));

  // Open first section
  const firstClient = $('.config-section', clientPanel);
  if (firstClient) firstClient.classList.add('open');
  const firstServer = $('.config-section', serverPanel);
  if (firstServer) firstServer.classList.add('open');

  // Bind events
  bindEvents();
  updateVisibility('client');
  updateVisibility('server');
}

function bindEvents() {
  // Tabs
  $$('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.activeTab = btn.dataset.tab;
      $$('.config-panel').forEach(p => p.classList.remove('active'));
      $(`#panel-${state.activeTab}`).classList.add('active');
    });
  });

  // Toggles
  document.addEventListener('click', e => {
    const toggle = e.target.closest('.toggle');
    if (toggle) {
      toggle.classList.toggle('active');
      const key = toggle.dataset.key;
      const cfg = toggle.dataset.config;
      const isActive = toggle.classList.contains('active');
      state.values[cfg][key] = isActive;
      const label = toggle.nextElementSibling;
      if (label) label.textContent = isActive ? 'فعال' : 'غیرفعال';
      updateVisibility(cfg);
    }

    // Info button
    const infoBtn = e.target.closest('.field-info-btn');
    if (infoBtn) {
      const key = infoBtn.dataset.key;
      const cfg = infoBtn.dataset.config;
      const sections = cfg === 'client' ? CLIENT_SECTIONS : SERVER_SECTIONS;
      let field = null;
      for (const s of sections) {
        field = s.fields.find(f => f.key === key);
        if (field) break;
      }
      if (field) showModal(field);
    }
  });

  // Inputs
  document.addEventListener('input', e => {
    const el = e.target;
    if (!el.dataset || !el.dataset.key) return;
    const key = el.dataset.key;
    const cfg = el.dataset.config;
    let val = el.value;
    if (el.type === 'number') val = parseFloat(val);
    state.values[cfg][key] = val;
  });

  document.addEventListener('change', e => {
    const el = e.target;
    if (!el.dataset || !el.dataset.key) return;
    const key = el.dataset.key;
    const cfg = el.dataset.config;
    let val = el.value;
    if (el.type === 'number') val = parseFloat(val);
    if (el.tagName === 'SELECT') {
      val = isNaN(Number(val)) ? val : Number(val);
    }
    state.values[cfg][key] = val;
  });

  // Export
  $('#btn-export').addEventListener('click', exportConfig);
  $('#btn-copy').addEventListener('click', copyConfig);
  $('#btn-reset').addEventListener('click', resetConfig);

  // Modal
  $('#modal-close').addEventListener('click', hideModal);
  $('#modal-overlay').addEventListener('click', e => {
    if (e.target === e.currentTarget) hideModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') hideModal();
  });
}

function updateVisibility(configType) {
  const panel = $(`#panel-${configType}`);
  $$('.field[data-show-if]', panel).forEach(fd => {
    const dep = fd.dataset.showIf;
    const visible = !!state.values[configType][dep];
    fd.style.display = visible ? '' : 'none';
  });
}

// ─── Modal ───
function showModal(field) {
  const overlay = $('#modal-overlay');
  $('#modal-icon').textContent = '💡';
  $('#modal-title').textContent = field.label;

  let body = `<p>${field.info || ''}</p>`;
  body += `<div style="margin-top:10px"><strong>کلید:</strong> <code>${field.key}</code></div>`;
  if (field.clamp) body += `<div style="margin-top:6px"><strong>محدوده مجاز:</strong> <code>${field.clamp}</code></div>`;
  if (field.hint) body += `<div style="margin-top:6px; color: var(--text-muted)">💡 ${field.hint}</div>`;
  if (field.perfTip) body += `<div class="modal-perf">📊 <strong>تأثیر عملکردی:</strong> ${field.perfTip}</div>`;

  $('#modal-body').innerHTML = body;
  overlay.classList.add('show');
}

function hideModal() {
  $('#modal-overlay').classList.remove('show');
}

// ─── Generate TOML ───
function generateTOML(configType) {
  const sections = configType === 'client' ? CLIENT_SECTIONS : SERVER_SECTIONS;
  const vals = state.values[configType];
  const lines = [];

  const header = configType === 'client'
    ? '# MasterDnsVPN Client Configuration\n# Generated by MasterDnsVPN Config Maker\n'
    : '# MasterDnsVPN Server Configuration\n# Generated by MasterDnsVPN Config Maker\n';
  lines.push(header);

  sections.forEach(section => {
    lines.push(`# --- ${section.title} ---`);
    section.fields.forEach(f => {
      // Skip hidden fields
      if (f.showIf && !vals[f.showIf]) return;

      let v = vals[f.key];
      if (v === undefined || v === null) v = f.default;
      const formatted = formatValue(v, f.type);
      lines.push(`${f.key} = ${formatted}`);
    });
    lines.push('');
  });

  if (configType === 'server') {
    lines.push('CONFIG_VERSION = "10"');
    lines.push('');
  }

  return lines.join('\n');
}

function exportConfig() {
  const configType = state.activeTab;
  const toml = generateTOML(configType);
  const filename = configType === 'client' ? 'client_config.toml' : 'server_config.toml';
  const blob = new Blob([toml], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
  showToast(`✅ فایل ${filename} دانلود شد`);
}

function copyConfig() {
  const toml = generateTOML(state.activeTab);
  // Try modern clipboard API first, fallback to textarea method
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(toml).then(() => {
      showToast('📋 کانفیگ در کلیپ‌بورد کپی شد');
    }).catch(() => {
      fallbackCopy(toml);
    });
  } else {
    fallbackCopy(toml);
  }
}

function fallbackCopy(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.cssText = 'position:fixed;left:-9999px;top:-9999px;opacity:0';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  try {
    const ok = document.execCommand('copy');
    showToast(ok ? '📋 کانفیگ در کلیپ‌بورد کپی شد' : '❌ خطا در کپی کردن');
  } catch (e) {
    showToast('❌ خطا در کپی کردن');
  }
  document.body.removeChild(textarea);
}

function resetConfig() {
  const configType = state.activeTab;
  const sections = configType === 'client' ? CLIENT_SECTIONS : SERVER_SECTIONS;
  const panel = $(`#panel-${configType}`);

  sections.forEach(section => {
    section.fields.forEach(f => {
      state.values[configType][f.key] = f.default;

      if (f.type === 'bool') {
        // Find the toggle div
        const toggle = panel.querySelector(`.toggle[data-key="${f.key}"][data-config="${configType}"]`);
        if (toggle) {
          if (f.default) toggle.classList.add('active');
          else toggle.classList.remove('active');
          const label = toggle.nextElementSibling;
          if (label) label.textContent = f.default ? 'فعال' : 'غیرفعال';
        }
      } else if (f.type === 'select') {
        const sel = panel.querySelector(`select[data-key="${f.key}"][data-config="${configType}"]`);
        if (sel) sel.value = f.default;
      } else {
        const inp = panel.querySelector(`input[data-key="${f.key}"][data-config="${configType}"]`);
        if (inp) inp.value = f.default;
      }
    });
  });

  updateVisibility(configType);
  showToast('🔄 مقادیر به پیش‌فرض بازگشتند');
}

// ─── Start ───
document.addEventListener('DOMContentLoaded', init);
