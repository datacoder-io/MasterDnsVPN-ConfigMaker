// ==============================================================
// Hardware Wizard — Separate flows for Client & Server
// ==============================================================

const HW_CLIENT_STEPS = [
  {
    id: 'c1', badge: '۱ از ۴', title: '📶 اتصال اینترنت شما',
    fields: [
      { key: 'clientConn', label: 'نوع اتصال اینترنت', options: [
        { v: '4g', t: '📱 موبایل (3G/4G/5G)' },
        { v: 'wifi', t: '📶 وای‌فای خانگی' },
        { v: 'dsl', t: '🔌 ADSL / VDSL' },
        { v: 'fiber', t: '⚡ فیبر نوری' }
      ]},
      { key: 'clientQuality', label: 'کیفیت و پایداری شبکه', options: [
        { v: 'excellent', t: '🟢 عالی — کم‌تأخیر و پایدار' },
        { v: 'good', t: '🔵 خوب — معمولاً پایدار' },
        { v: 'medium', t: '🟡 متوسط — گاهی قطعی و کندی' },
        { v: 'poor', t: '🔴 ضعیف — ناپایدار و پراُفت' }
      ]},
    ]
  },
  {
    id: 'c2', badge: '۲ از ۴', title: '💻 سخت‌افزار دستگاه کلاینت',
    fields: [
      { key: 'clientCpu', label: 'تعداد هسته CPU دستگاه', options: [
        { v: 1, t: '۱ هسته — موبایل ضعیف / سیستم قدیمی' },
        { v: 2, t: '۲ هسته — موبایل متوسط / لپ‌تاپ قدیمی' },
        { v: 4, t: '۴ هسته — لپ‌تاپ / دسکتاپ معمولی' },
        { v: 8, t: '۸+ هسته — دسکتاپ / لپ‌تاپ قوی' }
      ]},
      { key: 'clientRam', label: 'مقدار RAM دستگاه', options: [
        { v: 512, t: '۱ گیگابایت یا کمتر' },
        { v: 2048, t: '۲ تا ۴ گیگابایت' },
        { v: 4096, t: '۴ تا ۸ گیگابایت' },
        { v: 8192, t: '۸+ گیگابایت' }
      ]},
    ]
  },
  {
    id: 'c3', badge: '۳ از ۴', title: '📡 ریزالورها و MTU',
    fields: [
      { key: 'resolverCount', label: 'تعداد ریزالورهای شما', options: [
        { v: 'few', t: '🔹 کم (کمتر از ۱۰)' },
        { v: 'medium', t: '🔸 متوسط (۱۰ تا ۵۰)' },
        { v: 'many', t: '🔶 زیاد (بیش از ۵۰)' }
      ]},
      { key: 'mtuPref', label: 'اولویت MTU', options: [
        { v: 'stable', t: '🛡️ پایداری — MTU پایین، ریزالور بیشتر' },
        { v: 'balanced', t: '⚖️ تعادل — MTU متوسط' },
        { v: 'speed', t: '🚀 سرعت — MTU بالا، ریزالور کمتر' }
      ]},
    ]
  },
  {
    id: 'c4', badge: '۴ از ۴', title: '🎯 نوع استفاده',
    fields: [
      { key: 'useCase', label: 'اصلی‌ترین کاربرد شما', options: [
        { v: 'browse', t: '🌐 مرور وب عادی' },
        { v: 'chat', t: '💬 پیام‌رسان (تلگرام و...)' },
        { v: 'stream', t: '🎬 تماشای ویدیو / استریم' },
        { v: 'download', t: '📥 دانلود فایل‌های بزرگ' },
        { v: 'mixed', t: '🔀 ترکیبی (همه‌کاره)' }
      ]},
      { key: 'encPref', label: 'اولویت رمزنگاری', options: [
        { v: 'light', t: '⚡ سبک (XOR) — سرعت بالا' },
        { v: 'balanced', t: '⚖️ تعادلی (ChaCha20)' },
        { v: 'strong', t: '🔒 قوی (AES-256-GCM) — امنیت بالا' }
      ]},
    ]
  }
];

const HW_SERVER_STEPS = [
  {
    id: 's1', badge: '۱ از ۳', title: '🖥️ سخت‌افزار سرور',
    fields: [
      { key: 'serverCpu', label: 'تعداد هسته CPU سرور', options: [
        { v: 1, t: '۱ هسته' },
        { v: 2, t: '۲ هسته' },
        { v: 4, t: '۴ هسته' },
        { v: 8, t: '۸+ هسته' }
      ]},
      { key: 'serverRam', label: 'مقدار RAM سرور', options: [
        { v: 512, t: '۵۱۲ مگابایت' },
        { v: 1024, t: '۱ گیگابایت' },
        { v: 2048, t: '۲ گیگابایت' },
        { v: 4096, t: '۴+ گیگابایت' }
      ]},
      { key: 'serverNet', label: 'سرعت شبکه سرور', options: [
        { v: 100, t: '۱۰۰ مگابیت' },
        { v: 500, t: '۵۰۰ مگابیت' },
        { v: 1000, t: '۱ گیگابیت+' }
      ]},
    ]
  },
  {
    id: 's2', badge: '۲ از ۳', title: '👥 بار و تعداد کاربران',
    fields: [
      { key: 'userCount', label: 'تعداد تقریبی کاربران همزمان', options: [
        { v: 1, t: '👤 فقط خودم (۱ نفر)' },
        { v: 5, t: '👥 چند نفر (۲ تا ۵)' },
        { v: 15, t: '👥👥 گروه متوسط (۵ تا ۱۵)' },
        { v: 30, t: '🏢 زیاد (۱۵+)' }
      ]},
      { key: 'serverTraffic', label: 'نوع ترافیک غالب کاربران', options: [
        { v: 'light', t: '💬 سبک (پیام‌رسان، مرور)' },
        { v: 'moderate', t: '🌐 متوسط (مرور + دانلود گاهی)' },
        { v: 'heavy', t: '🎬 سنگین (استریم، دانلود زیاد)' }
      ]},
    ]
  },
  {
    id: 's3', badge: '۳ از ۳', title: '🔐 امنیت و DNS سرور',
    fields: [
      { key: 'serverEncPref', label: 'اولویت رمزنگاری سرور', options: [
        { v: 'light', t: '⚡ سبک (XOR) — حداقل سربار' },
        { v: 'balanced', t: '⚖️ تعادلی (ChaCha20)' },
        { v: 'strong', t: '🔒 قوی (AES-256-GCM)' }
      ]},
      { key: 'serverDnsUpstream', label: 'ریزالور DNS بالادستی', options: [
        { v: 'cf', t: '☁️ Cloudflare (1.1.1.1)' },
        { v: 'google', t: '🔍 Google (8.8.8.8)' },
        { v: 'both', t: '🔀 ترکیبی (Cloudflare + Google)' }
      ]},
      { key: 'serverLossyClients', label: 'آیا کلاینت‌ها شبکه ناپایدار دارند؟', options: [
        { v: false, t: '🟢 نه — شبکه خوب' },
        { v: true, t: '🔴 بله — شبکه lossy و پراُفت' }
      ]},
    ]
  }
];

// Wizard state
const hwState = {};

function resetHwState(mode) {
  if (mode === 'client') {
    Object.assign(hwState, {
      clientConn: '4g', clientQuality: 'excellent',
      clientCpu: 1, clientRam: 512,
      resolverCount: 'few', mtuPref: 'balanced',
      useCase: 'browse', encPref: 'light'
    });
  } else {
    Object.assign(hwState, {
      serverCpu: 1, serverRam: 512, serverNet: 100,
      userCount: 1, serverTraffic: 'light',
      serverEncPref: 'light', serverDnsUpstream: 'cf', serverLossyClients: false
    });
  }
}

function buildHardwareWizard() {
  const overlay = document.createElement('div');
  overlay.className = 'hw-overlay';
  overlay.id = 'hw-overlay';
  overlay.innerHTML = `
    <div class="hw-modal">
      <button class="modal-close" id="hw-close">&times;</button>
      <div class="hw-header">
        <div class="hw-header-icon" id="hw-icon">🛠️</div>
        <div>
          <h2 id="hw-title">پیشنهاد خودکار تنظیمات</h2>
          <p class="hw-subtitle" id="hw-subtitle"></p>
        </div>
      </div>
      <div class="hw-steps" id="hw-steps-container"></div>
    </div>`;
  document.body.appendChild(overlay);

  overlay.querySelector('#hw-close').addEventListener('click', closeHW);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeHW(); });
}

function renderWizardSteps(mode) {
  const steps = mode === 'client' ? HW_CLIENT_STEPS : HW_SERVER_STEPS;
  const container = document.getElementById('hw-steps-container');
  container.innerHTML = '';

  // Update header
  const icon = document.getElementById('hw-icon');
  const title = document.getElementById('hw-title');
  const subtitle = document.getElementById('hw-subtitle');
  if (mode === 'client') {
    icon.textContent = '💻';
    title.textContent = 'پیشنهاد تنظیمات کلاینت';
    subtitle.textContent = 'مشخصات شبکه و نوع استفاده خود را وارد کنید';
  } else {
    icon.textContent = '🖥️';
    title.textContent = 'پیشنهاد تنظیمات سرور';
    subtitle.textContent = 'مشخصات سخت‌افزار و بار سرور را وارد کنید';
  }

  // Build each step
  steps.forEach((step, idx) => {
    const div = document.createElement('div');
    div.className = 'hw-step' + (idx === 0 ? ' active' : '');
    div.dataset.step = String(idx + 1);

    let fieldsHTML = '';
    step.fields.forEach(f => {
      const optsHTML = f.options.map((o, oi) =>
        `<button class="hw-opt-btn${oi === 0 ? ' selected' : ''}" data-hw-key="${f.key}" data-hw-val="${o.v}">${o.t}</button>`
      ).join('');
      fieldsHTML += `<div class="hw-field"><label>${f.label}</label><div class="hw-options">${optsHTML}</div></div>`;
    });

    const prevBtn = idx > 0 ? `<button class="hw-prev-btn" data-go="${idx}">→ مرحله قبل</button>` : '<span></span>';
    const nextBtn = idx < steps.length - 1
      ? `<button class="hw-next-btn" data-go="${idx + 2}">مرحله بعد ←</button>`
      : `<button class="hw-apply-btn hw-apply-trigger">✨ اعمال پیشنهادات</button>`;

    div.innerHTML = `
      <div class="hw-step-badge">${step.badge}</div>
      <h3>${step.title}</h3>
      ${fieldsHTML}
      <div class="hw-nav">${prevBtn}${nextBtn}</div>`;

    container.appendChild(div);
  });

  // Results step
  const resDiv = document.createElement('div');
  resDiv.className = 'hw-step';
  resDiv.dataset.step = 'results';
  resDiv.innerHTML = `
    <div class="hw-step-badge">✅ نتیجه</div>
    <h3>📊 تنظیمات پیشنهادی اعمال شد!</h3>
    <div class="hw-results" id="hw-results"></div>
    <div class="hw-nav">
      <button class="hw-prev-btn" data-go="1">→ شروع مجدد</button>
      <button class="hw-done-btn hw-done-trigger">بستن ✓</button>
    </div>`;
  container.appendChild(resDiv);

  // Bind option clicks
  container.querySelectorAll('.hw-opt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.hw-options');
      parent.querySelectorAll('.hw-opt-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      let val = btn.dataset.hwVal;
      if (val === 'true') val = true;
      else if (val === 'false') val = false;
      else if (!isNaN(Number(val)) && val !== '') val = Number(val);
      hwState[btn.dataset.hwKey] = val;
    });
  });

  // Bind nav
  container.querySelectorAll('.hw-next-btn, .hw-prev-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.go;
      container.querySelectorAll('.hw-step').forEach(s => s.classList.remove('active'));
      container.querySelector(`[data-step="${target}"]`).classList.add('active');
    });
  });

  // Bind apply
  container.querySelector('.hw-apply-trigger').addEventListener('click', () => {
    const changes = mode === 'client' ? applyClientRecommendations() : applyServerRecommendations();
    showHWResults(changes);
    container.querySelectorAll('.hw-step').forEach(s => s.classList.remove('active'));
    container.querySelector('[data-step="results"]').classList.add('active');
  });

  // Bind done
  container.querySelector('.hw-done-trigger').addEventListener('click', closeHW);
}

// ──── Client Recommendations ────
function applyClientRecommendations() {
  const h = hwState;
  const changes = [];
  const qMap = { excellent: 1, good: 0.8, medium: 0.5, poor: 0.3 };
  const q = qMap[h.clientQuality] || 0.5;
  const isLossy = q <= 0.5;
  const isMobile = h.clientConn === '4g';
  const isStream = h.useCase === 'stream';
  const isDownload = h.useCase === 'download';
  const isMixed = h.useCase === 'mixed';
  const isChat = h.useCase === 'chat';

  // Encryption
  const encMap = { light: 1, balanced: 2, strong: 5 };
  setVal('client', 'DATA_ENCRYPTION_METHOD', encMap[h.encPref] || 1);
  changes.push({ cat: '🔐', text: `رمزنگاری: ${h.encPref === 'light' ? 'XOR' : h.encPref === 'balanced' ? 'ChaCha20' : 'AES-256-GCM'}` });

  // Packet duplication
  let dup = 1;
  if (isLossy) dup = 4;
  else if (q <= 0.8) dup = 2;
  if (isMobile) dup = Math.max(dup, 3);
  setVal('client', 'PACKET_DUPLICATION_COUNT', dup);
  setVal('client', 'SETUP_PACKET_DUPLICATION_COUNT', Math.min(dup + 1, 8));
  changes.push({ cat: '📡', text: `تکرار بسته: ${dup}× (راه‌اندازی: ${Math.min(dup + 1, 8)}×)` });

  // Resolver strategy
  let strat = 0;
  if (isLossy) strat = 3;
  else if (h.resolverCount === 'many') strat = 4;
  else if (h.resolverCount === 'medium') strat = 3;
  setVal('client', 'RESOLVER_BALANCING_STRATEGY', strat);
  const stratNames = { 0: 'Round Robin', 1: 'تصادفی', 3: 'کمترین اُفت', 4: 'کمترین تأخیر' };
  changes.push({ cat: '⚡', text: `استراتژی ریزالور: ${stratNames[strat]}` });

  // Failover
  if (isLossy) {
    setVal('client', 'STREAM_RESOLVER_FAILOVER_RESEND_THRESHOLD', 2);
    setVal('client', 'STREAM_RESOLVER_FAILOVER_COOLDOWN', 4);
    changes.push({ cat: '🔄', text: 'failover سریع (آستانه: 2، cooldown: 4 ثانیه)' });
  } else {
    setVal('client', 'STREAM_RESOLVER_FAILOVER_RESEND_THRESHOLD', 3);
    setVal('client', 'STREAM_RESOLVER_FAILOVER_COOLDOWN', 8);
  }

  // MTU
  const mtuProfiles = {
    stable: { minUp: 25, minDn: 50, maxUp: 60, maxDn: 200 },
    balanced: { minUp: 40, minDn: 100, maxUp: 150, maxDn: 500 },
    speed: { minUp: 60, minDn: 120, maxUp: 220, maxDn: 700 }
  };
  const mtu = mtuProfiles[h.mtuPref] || mtuProfiles.balanced;
  setVal('client', 'MIN_UPLOAD_MTU', mtu.minUp);
  setVal('client', 'MIN_DOWNLOAD_MTU', mtu.minDn);
  setVal('client', 'MAX_UPLOAD_MTU', mtu.maxUp);
  setVal('client', 'MAX_DOWNLOAD_MTU', mtu.maxDn);
  changes.push({ cat: '🧪', text: `MTU: آپلود ${mtu.minUp}-${mtu.maxUp} / دانلود ${mtu.minDn}-${mtu.maxDn}` });

  // MTU test — parallelism capped by CPU cores (heavy parallel = CPU spike)
  const cpuCoresForMTU = h.clientCpu || 1;
  let para = h.resolverCount === 'many' ? 64 : (h.resolverCount === 'medium' ? 32 : 16);
  // Don't thrash low-core devices with too many parallel tests
  if (cpuCoresForMTU <= 2) para = Math.min(para, 16);
  if (cpuCoresForMTU <= 1) para = Math.min(para, 8);
  setVal('client', 'MTU_TEST_PARALLELISM', para);
  setVal('client', 'MTU_TEST_RETRIES', isLossy ? 3 : 2);
  setVal('client', 'MTU_TEST_TIMEOUT', isLossy ? 3 : 2);
  changes.push({ cat: '🧪', text: `تست MTU موازی: ${para} (CPU: ${cpuCoresForMTU} هسته)` });

  // Workers — based on CPU AND resolver count
  const cpuCores = h.clientCpu || 1;
  const ramMB    = h.clientRam || 512;
  // Base worker count from CPU (leave 1 core free for OS/app)
  let maxWorkers = Math.max(1, cpuCores - 1);
  // Also consider resolver count (more resolvers = more I/O concurrency needed)
  let rw = h.resolverCount === 'many' ? Math.min(maxWorkers, 4)
         : h.resolverCount === 'medium' ? Math.min(maxWorkers, 3)
         : Math.min(maxWorkers, 2);
  rw = Math.max(rw, 2); // always at least 2
  if (isStream || isDownload) rw = Math.min(Math.max(rw, 3), maxWorkers + 1);
  setVal('client', 'TUNNEL_READER_WORKERS', rw);
  setVal('client', 'TUNNEL_WRITER_WORKERS', rw);
  setVal('client', 'TUNNEL_PROCESS_WORKERS', Math.max(2, rw - 1));
  changes.push({ cat: '🧵', text: `ورکرها: خواندن/نوشتن ${rw} / پردازش ${Math.max(2, rw - 1)} (CPU: ${cpuCores} هسته)` });

  // Channels — based on RAM
  let txSz, rxSz;
  if (ramMB <= 512) {
    txSz = 4096;  rxSz = 4096;   // Low RAM: keep buffers small
  } else if (ramMB <= 2048) {
    txSz = 8192;  rxSz = 8192;
  } else {
    txSz = 8192;  rxSz = 12288;  // Default
  }
  // Boost for heavy use cases if RAM allows
  if ((isStream || isDownload || isMixed) && ramMB >= 2048) { txSz = 16384; rxSz = 16384; }
  if (isChat && ramMB <= 2048) { txSz = 4096; rxSz = 4096; }
  setVal('client', 'TX_CHANNEL_SIZE', txSz);
  setVal('client', 'RX_CHANNEL_SIZE', rxSz);
  changes.push({ cat: '📦', text: `بافر: TX=${txSz} / RX=${rxSz} (RAM: ${ramMB >= 1024 ? ramMB/1024 + ' GB' : ramMB + ' MB'})` });

  // UDP pool — balance resolver count with available RAM
  let poolSz = h.resolverCount === 'many' ? 64 : (h.resolverCount === 'medium' ? 128 : 256);
  // On low RAM, reduce pool size to avoid file-descriptor exhaustion
  if (ramMB <= 512)  poolSz = Math.min(poolSz, 32);
  if (ramMB <= 2048) poolSz = Math.min(poolSz, 64);
  setVal('client', 'RESOLVER_UDP_CONNECTION_POOL_SIZE', poolSz);

  // Compression
  if (isStream || isDownload || isMixed) {
    setVal('client', 'UPLOAD_COMPRESSION_TYPE', 2);
    setVal('client', 'DOWNLOAD_COMPRESSION_TYPE', 2);
    changes.push({ cat: '🗜️', text: 'فشرده‌سازی: LZ4 (سریع برای حجم بالا)' });
  } else if (isLossy || isMobile) {
    setVal('client', 'UPLOAD_COMPRESSION_TYPE', 1);
    setVal('client', 'DOWNLOAD_COMPRESSION_TYPE', 1);
    changes.push({ cat: '🗜️', text: 'فشرده‌سازی: ZSTD (بهترین نسبت برای لینک ضعیف)' });
  } else {
    setVal('client', 'UPLOAD_COMPRESSION_TYPE', 0);
    setVal('client', 'DOWNLOAD_COMPRESSION_TYPE', 0);
    changes.push({ cat: '🗜️', text: 'فشرده‌سازی: خاموش (شبکه خوب)' });
  }

  // ARQ
  if (isLossy) {
    setVal('client', 'ARQ_WINDOW_SIZE', 1000);
    setVal('client', 'ARQ_DATA_NACK_MAX_GAP', 64);
    setVal('client', 'ARQ_MAX_DATA_RETRIES', 1500);
    setVal('client', 'ARQ_MAX_RTO_SECONDS', 6);
    changes.push({ cat: '🔄', text: 'ARQ تهاجمی: پنجره=1000، NACK=64، تلاش=1500' });
  } else if (isStream || isDownload) {
    setVal('client', 'ARQ_WINDOW_SIZE', 800);
    setVal('client', 'ARQ_DATA_NACK_MAX_GAP', 48);
    setVal('client', 'ARQ_MAX_DATA_RETRIES', 1200);
    changes.push({ cat: '🔄', text: 'ARQ متوسط: پنجره=800، NACK=48' });
  } else {
    setVal('client', 'ARQ_WINDOW_SIZE', 600);
    setVal('client', 'ARQ_DATA_NACK_MAX_GAP', 32);
  }

  // Ping
  if (isStream) {
    setVal('client', 'PING_AGGRESSIVE_INTERVAL_SECONDS', 0.15);
    setVal('client', 'PING_LAZY_INTERVAL_SECONDS', 0.5);
    setVal('client', 'PING_COOLDOWN_INTERVAL_SECONDS', 1.5);
    changes.push({ cat: '📡', text: 'پینگ سریع (مناسب استریم)' });
  } else if (isChat) {
    setVal('client', 'PING_AGGRESSIVE_INTERVAL_SECONDS', 0.3);
    setVal('client', 'PING_LAZY_INTERVAL_SECONDS', 1);
    setVal('client', 'PING_COOLDOWN_INTERVAL_SECONDS', 3);
    changes.push({ cat: '📡', text: 'پینگ متعادل (مناسب پیام‌رسان)' });
  } else if (isLossy) {
    setVal('client', 'PING_AGGRESSIVE_INTERVAL_SECONDS', 0.2);
    setVal('client', 'PING_LAZY_INTERVAL_SECONDS', 0.75);
  }

  // Dispatcher poll interval — lower CPU = higher interval to avoid spinning
  const cpuCoresForDisp = h.clientCpu || 1;
  let pollInterval = 0.020; // default 20ms
  if (cpuCoresForDisp <= 1) pollInterval = 0.050;         // weak CPU: 50ms
  else if (cpuCoresForDisp <= 2) pollInterval = 0.030;    // low CPU: 30ms
  else if (isStream || isDownload) pollInterval = 0.010;  // strong CPU + heavy use: 10ms
  setVal('client', 'DISPATCHER_IDLE_POLL_INTERVAL_SECONDS', pollInterval);
  changes.push({ cat: '⚙️', text: `دیسپچر: ${pollInterval * 1000}ms (CPU: ${cpuCoresForDisp} هسته)` });

  return changes;
}

// ──── Server Recommendations ────
function applyServerRecommendations() {
  const h = hwState;
  const changes = [];
  const cpuF = h.serverCpu >= 8 ? 4 : (h.serverCpu >= 4 ? 2 : 1);
  const ramF = h.serverRam >= 4096 ? 4 : (h.serverRam >= 2048 ? 2 : 1);
  const isHeavy = h.serverTraffic === 'heavy';
  const isMultiUser = h.userCount >= 5;
  const isLossy = h.serverLossyClients === true;

  // Encryption
  const encMap = { light: 1, balanced: 2, strong: 5 };
  setVal('server', 'DATA_ENCRYPTION_METHOD', encMap[h.serverEncPref] || 1);
  changes.push({ cat: '🔐', text: `رمزنگاری: ${h.serverEncPref === 'light' ? 'XOR' : h.serverEncPref === 'balanced' ? 'ChaCha20' : 'AES-256-GCM'}` });

  // DNS Upstream
  const dnsMap = {
    cf: '["1.1.1.1:53", "1.0.0.1:53"]',
    google: '["8.8.8.8:53", "8.8.4.4:53"]',
    both: '["1.1.1.1:53", "1.0.0.1:53", "8.8.8.8:53", "8.8.4.4:53"]'
  };
  setVal('server', 'DNS_UPSTREAM_SERVERS', dnsMap[h.serverDnsUpstream] || dnsMap.cf);
  changes.push({ cat: '📛', text: `DNS بالادستی: ${h.serverDnsUpstream === 'cf' ? 'Cloudflare' : h.serverDnsUpstream === 'google' ? 'Google' : 'ترکیبی'}` });

  // UDP readers/workers
  let udpR = Math.max(2, cpuF);
  let dnsW = Math.max(4, cpuF * 2);
  if (isMultiUser) { udpR = Math.max(udpR, 3); dnsW = Math.max(dnsW, 6); }
  if (isHeavy) { udpR = Math.max(udpR, 4); dnsW = Math.max(dnsW, 8); }
  setVal('server', 'UDP_READERS', udpR);
  setVal('server', 'DNS_REQUEST_WORKERS', dnsW);
  changes.push({ cat: '🧵', text: `خوانندگان UDP: ${udpR} / ورکر DNS: ${dnsW}` });

  // Deferred workers
  let defW = Math.max(2, cpuF);
  if (isMultiUser) defW = Math.max(defW, 3);
  setVal('server', 'DEFERRED_SESSION_WORKERS', defW);

  // Max concurrent
  let maxReq = 4096;
  if (ramF >= 2) maxReq = 8192;
  if (ramF >= 4) maxReq = 16384;
  if (isMultiUser && isHeavy) maxReq = Math.min(maxReq * 2, 32768);
  setVal('server', 'MAX_CONCURRENT_REQUESTS', maxReq);
  changes.push({ cat: '📥', text: `حداکثر درخواست همزمان: ${maxReq.toLocaleString('fa-IR')}` });

  // Deferred queue
  let defQueue = 2048;
  if (ramF >= 2) defQueue = 4096;
  if (isMultiUser) defQueue = Math.min(defQueue * 2, 14336);
  setVal('server', 'DEFERRED_SESSION_QUEUE_LIMIT', defQueue);

  // Socket buffer
  let sockBuf = 4194304;
  if (h.serverRam >= 2048) sockBuf = 8388608;
  if (h.serverRam >= 4096 && isHeavy) sockBuf = 16777216;
  setVal('server', 'SOCKET_BUFFER_SIZE', sockBuf);
  changes.push({ cat: '📦', text: `بافر سوکت: ${(sockBuf / 1048576).toFixed(0)} مگابایت` });

  // Session timeout
  let sesTimeout = 300;
  if (h.userCount >= 15) sesTimeout = 180;
  setVal('server', 'SESSION_TIMEOUT_SECONDS', sesTimeout);
  changes.push({ cat: '🍪', text: `تایم‌اوت Session: ${sesTimeout} ثانیه` });

  // DNS cache
  let dnsCacheMax = 10000;
  if (ramF >= 2) dnsCacheMax = 50000;
  if (ramF >= 4) dnsCacheMax = 100000;
  setVal('server', 'DNS_CACHE_MAX_RECORDS', dnsCacheMax);
  changes.push({ cat: '📛', text: `کش DNS: ${dnsCacheMax.toLocaleString('fa-IR')} رکورد` });

  // Control duplication for lossy clients
  if (isLossy) {
    setVal('server', 'PACKET_BLOCK_CONTROL_DUPLICATION', 3);
    setVal('server', 'MAX_PACKETS_PER_BATCH', 12);
    changes.push({ cat: '🔄', text: 'تکرار بلوک کنترل: 3× (برای کلاینت‌های lossy)' });
  } else {
    setVal('server', 'PACKET_BLOCK_CONTROL_DUPLICATION', 1);
    setVal('server', 'MAX_PACKETS_PER_BATCH', 10);
  }

  // ARQ tuning
  if (isLossy || isHeavy) {
    setVal('server', 'ARQ_WINDOW_SIZE', 1000);
    setVal('server', 'ARQ_DATA_NACK_MAX_GAP', 64);
    setVal('server', 'ARQ_MAX_DATA_RETRIES', 1500);
    changes.push({ cat: '🔄', text: 'ARQ تهاجمی: پنجره=1000 (بازیابی قوی)' });
  }

  // SOCKS connect timeout
  let connectTimeout = 120;
  if (h.userCount >= 15) connectTimeout = 60;
  setVal('server', 'SOCKS_CONNECT_TIMEOUT', connectTimeout);

  // Fragment stores
  if (isMultiUser) {
    setVal('server', 'SOCKS5_FRAGMENT_STORE_CAPACITY', 2048);
    setVal('server', 'DNS_FRAGMENT_STORE_CAPACITY', 1024);
  }

  // Cleanup
  if (h.userCount >= 15) {
    setVal('server', 'SESSION_CLEANUP_INTERVAL_SECONDS', 15);
    setVal('server', 'CLOSED_SESSION_RETENTION_SECONDS', 300);
    changes.push({ cat: '🧹', text: 'پاکسازی سریع‌تر (مناسب تعداد بالا)' });
  }

  return changes;
}

// ──── Helpers ────
function setVal(configType, key, value) {
  // Update state
  state.values[configType][key] = value;

  const panel = document.getElementById(`panel-${configType}`);
  if (!panel) return;

  // Try toggle (boolean fields) first
  const toggle = panel.querySelector(`.toggle[data-key="${key}"][data-config="${configType}"]`);
  if (toggle) {
    if (value) toggle.classList.add('active');
    else toggle.classList.remove('active');
    const lbl = toggle.nextElementSibling;
    if (lbl && lbl.classList.contains('toggle-label')) {
      lbl.textContent = value ? 'فعال' : 'غیرفعال';
    }
    return;
  }

  // Try select
  const sel = panel.querySelector(`select[data-key="${key}"][data-config="${configType}"]`);
  if (sel) {
    sel.value = value;
    return;
  }

  // Try any input (text, number, password)
  const inp = panel.querySelector(`input[data-key="${key}"][data-config="${configType}"]`);
  if (inp) {
    inp.value = value;
  }
}

function showHWResults(changes) {
  const container = document.getElementById('hw-results');
  container.innerHTML = changes.map(c =>
    `<div class="hw-result-item"><span class="hw-result-cat">${c.cat}</span>${c.text}</div>`
  ).join('') +
  `<div class="hw-result-note">💡 مقادیر پیشنهادی در فرم اعمال شدند. هر مقداری را می‌توانید دستی هم تغییر دهید.</div>`;
}

function openHW() {
  const mode = state.activeTab;
  resetHwState(mode);
  renderWizardSteps(mode);
  document.getElementById('hw-overlay').classList.add('show');
}

function closeHW() {
  document.getElementById('hw-overlay').classList.remove('show');
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  buildHardwareWizard();
  const bar = document.querySelector('.export-bar');
  const wizBtn = document.createElement('button');
  wizBtn.className = 'wizard-btn';
  wizBtn.id = 'btn-wizard';
  wizBtn.title = 'پیشنهاد خودکار تنظیمات';
  wizBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z"/></svg>`;
  wizBtn.addEventListener('click', openHW);
  bar.insertBefore(wizBtn, bar.firstChild);
});
