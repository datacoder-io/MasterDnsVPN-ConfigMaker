// ==============================================================
// MasterDnsVPN Config Maker — Configuration Data (Persian)
// ==============================================================

const CLIENT_SECTIONS = [
  {
    id: "tunnel", icon: "🔐", iconClass: "icon-security",
    title: "هویت تانل و امنیت",
    desc: "دامنه تانل، رمزنگاری و کلید اشتراکی",
    fields: [
      {
        key: "DOMAINS", label: "دامنه‌های تانل", type: "text", default: '["v.domain.com"]',
        hint: "باید با مقدار DOMAIN سرور یکسان باشد",
        info: "دامنه‌هایی که کلاینت برای ساخت کوئری DNS استفاده می‌کند. حداقل یک دامنه لازم است و همه باید توسط یک سرور مدیریت شوند.",
        perf: "speed", perfTip: "دامنه‌های کوتاه‌تر فضای بیشتری برای داده باقی می‌گذارند و سرعت را بهتر می‌کنند."
      },
      {
        key: "DATA_ENCRYPTION_METHOD", label: "روش رمزنگاری", type: "select", default: 1,
        options: [{v:0,t:"بدون رمزنگاری (0)"},{v:1,t:"XOR (1)"},{v:2,t:"ChaCha20 (2)"},{v:3,t:"AES-128-GCM (3)"},{v:4,t:"AES-192-GCM (4)"},{v:5,t:"AES-256-GCM (5)"}],
        hint: "باید با سرور یکسان باشد",
        info: "روش رمزنگاری پیلود تانل.<br><strong>XOR</strong>: سبک و سریع ولی امنیت کمتر.<br><strong>ChaCha20</strong>: تعادل خوب سرعت و امنیت.<br><strong>AES-GCM</strong>: امنیت بالا ولی سربار بیشتر.",
        perf: "security", perfTip: "AES-256-GCM امن‌ترین ولی سنگین‌ترین. XOR سبک‌ترین ولی کم‌امنیت‌ترین."
      },
      {
        key: "ENCRYPTION_KEY", label: "کلید رمزنگاری", type: "password", default: "",
        hint: "باید با محتوای فایل encrypt_key.txt سرور یکسان باشد",
        info: "کلید اشتراکی. بدون این کلید صحیح، اتصال برقرار نمی‌شود. این کلید را از سرور کپی کنید.",
        perf: "security"
      }
    ]
  },
  {
    id: "proxy", icon: "🧦", iconClass: "icon-proxy",
    title: "پراکسی محلی",
    desc: "آدرس و پورت پراکسی محلی کلاینت",
    fields: [
      {
        key: "PROTOCOL_TYPE", label: "نوع پروتکل", type: "select", default: "SOCKS5",
        options: [{v:"SOCKS5",t:"SOCKS5 — حالت پراکسی عادی"},{v:"TCP",t:"TCP — تانل خام"}],
        hint: "برای مرورگر و اپ‌ها SOCKS5 مناسب‌تر است",
        info: "SOCKS5 برای استفاده عادی با مرورگر و تلگرام. TCP برای تانل مستقیم TCP."
      },
      {
        key: "LISTEN_IP", label: "آدرس شنود", type: "text", default: "127.0.0.1",
        hint: "127.0.0.1 فقط محلی، 0.0.0.0 برای اشتراک شبکه",
        info: "اگر فقط خودتان استفاده می‌کنید 127.0.0.1 کافیست. برای اشتراک با دستگاه‌های دیگر 0.0.0.0 بگذارید و حتماً SOCKS5_AUTH را فعال کنید.",
        perf: "security", perfTip: "اگر 0.0.0.0 می‌گذارید حتماً احراز هویت فعال کنید!"
      },
      {
        key: "LISTEN_PORT", label: "پورت شنود", type: "number", default: 18000, min: 1, max: 65535,
        hint: "پورتی که کلاینت روی آن گوش می‌دهد"
      },
      {
        key: "SOCKS5_AUTH", label: "احراز هویت SOCKS5", type: "bool", default: false,
        hint: "محافظت از پراکسی محلی",
        info: "اگر پراکسی را در شبکه به اشتراک می‌گذارید، حتماً فعال کنید."
      },
      {
        key: "SOCKS5_USER", label: "نام کاربری", type: "text", default: "master_dns_vpn", showIf: "SOCKS5_AUTH" },
      {
        key: "SOCKS5_PASS", label: "رمز عبور", type: "password", default: "master_dns_vpn", showIf: "SOCKS5_AUTH" }
    ]
  },
  {
    id: "localdns", icon: "📛", iconClass: "icon-dns",
    title: "سرویس DNS محلی",
    desc: "DNS محلی اختیاری با کش و ذخیره‌سازی",
    fields: [
      { key: "LOCAL_DNS_ENABLED", label: "فعال‌سازی DNS محلی", type: "bool", default: false,
        info: "وقتی فعال باشد، کلاینت یک سرور DNS محلی اجرا می‌کند. این کار تأخیر DNS را کم و از سرقت DNS جلوگیری می‌کند.",
        perf: "speed", perfTip: "فعال‌سازی باعث کاهش تأخیر DNS و بهبود تجربه مرور می‌شود." },
      { key: "LOCAL_DNS_IP", label: "آدرس DNS محلی", type: "text", default: "127.0.0.1", showIf: "LOCAL_DNS_ENABLED" },
      { key: "LOCAL_DNS_PORT", label: "پورت DNS محلی", type: "number", default: 53, min: 1, max: 65535, showIf: "LOCAL_DNS_ENABLED" },
      { key: "LOCAL_DNS_CACHE_MAX_RECORDS", label: "حداکثر رکوردهای کش", type: "number", default: 10000, min: 1,
        showIf: "LOCAL_DNS_ENABLED", perf: "speed", perfTip: "مقدار بیشتر = حافظه بیشتر ولی hit-rate بالاتر" },
      { key: "LOCAL_DNS_CACHE_TTL_SECONDS", label: "TTL کش (ثانیه)", type: "number", default: 14400, min: 1,
        showIf: "LOCAL_DNS_ENABLED" },
      { key: "LOCAL_DNS_PENDING_TIMEOUT_SECONDS", label: "تایم‌اوت درخواست معلق (ثانیه)", type: "number", default: 300, min: 1, showIf: "LOCAL_DNS_ENABLED" },
      { key: "DNS_RESPONSE_FRAGMENT_TIMEOUT_SECONDS", label: "تایم‌اوت بازسازی فرگمنت (ثانیه)", type: "number", default: 60, min: 1, max: 600, clamp: "[1, 600]", showIf: "LOCAL_DNS_ENABLED" },
      { key: "LOCAL_DNS_CACHE_PERSIST_TO_FILE", label: "ذخیره کش روی دیسک", type: "bool", default: true, showIf: "LOCAL_DNS_ENABLED" },
      { key: "LOCAL_DNS_CACHE_FLUSH_INTERVAL_SECONDS", label: "فاصله ذخیره کش (ثانیه)", type: "number", default: 60, min: 1, showIf: "LOCAL_DNS_ENABLED" }
    ]
  },
  {
    id: "resolver", icon: "⚡", iconClass: "icon-resolver",
    title: "ریزالور، تکرار بسته و سلامت",
    desc: "استراتژی انتخاب ریزالور، تکرار بسته و failover",
    fields: [
      { key: "RESOLVER_BALANCING_STRATEGY", label: "استراتژی توزیع بار", type: "select", default: 0,
        options: [{v:0,t:"Round Robin (0)"},{v:1,t:"تصادفی (1)"},{v:2,t:"Round Robin (2)"},{v:3,t:"کمترین از‌دست‌رفتگی (3)"},{v:4,t:"کمترین تأخیر (4)"}],
        info: "حالت‌های 3 و 4 از بازخورد لحظه‌ای استفاده می‌کنند و معمولاً عملکرد بهتری دارند.",
        perf: "speed", perfTip: "حالت 3 یا 4 برای شبکه‌های ناپایدار بهترند." },
      { key: "PACKET_DUPLICATION_COUNT", label: "تکرار بسته عادی", type: "number", default: 2, min: 1, max: 8, clamp: "[1, 8]",
        info: "هر بسته خروجی چند بار تکرار شود. مقدار بالاتر = مقاومت بیشتر در برابر از‌دست‌رفتگی ولی مصرف پهنای باند بیشتر.",
        perf: "bandwidth", perfTip: "افزایش = پهنای باند بیشتر ولی پایداری بالاتر. برای شبکه خوب 1 کافیست." },
      { key: "SETUP_PACKET_DUPLICATION_COUNT", label: "تکرار بسته راه‌اندازی", type: "number", default: 2, min: 1, max: 8, clamp: "[PACKET_DUPLICATION_COUNT, 8]",
        info: "بسته‌های اولیه اتصال (SYN) بیشتر تکرار می‌شوند تا اتصال سریع‌تر برقرار شود." },
      { key: "STREAM_RESOLVER_FAILOVER_RESEND_THRESHOLD", label: "آستانه failover ریزالور", type: "number", default: 3, min: 1, max: 128, clamp: "[1, 128]",
        info: "اگر یک stream بعد از این تعداد ارسال مجدد روی یک ریزالور جواب نگرفت، ریزالور عوض می‌شود." },
      { key: "STREAM_RESOLVER_FAILOVER_COOLDOWN", label: "cooldown تعویض ریزالور (ثانیه)", type: "number", default: 8, min: 0.1, max: 120, clamp: "[0.1, 120]" },
      { key: "RECHECK_INACTIVE_SERVERS_ENABLED", label: "بررسی مجدد ریزالورهای غیرفعال", type: "bool", default: true,
        info: "ریزالورهایی که در تست MTU رد شدند، در پس‌زمینه دوباره بررسی می‌شوند.",
        perf: "stability", perfTip: "فعال نگه دارید تا ریزالورهای بهبودیافته خودکار برگردند." },
      { key: "RECHECK_INACTIVE_INTERVAL_SECONDS", label: "فاصله چرخه بررسی (ثانیه)", type: "number", default: 60, min: 60, max: 86400, clamp: "[60, 86400]", showIf: "RECHECK_INACTIVE_SERVERS_ENABLED" },
      { key: "RECHECK_SERVER_INTERVAL_SECONDS", label: "فاصله بررسی هر ریزالور (ثانیه)", type: "number", default: 3, min: 1, max: 600, clamp: "[1, 600]", showIf: "RECHECK_INACTIVE_SERVERS_ENABLED" },
      { key: "RECHECK_BATCH_SIZE", label: "اندازه بچ بررسی", type: "number", default: 5, min: 1, max: 1024, clamp: "[1, 1024]", showIf: "RECHECK_INACTIVE_SERVERS_ENABLED" },
      { key: "AUTO_DISABLE_TIMEOUT_SERVERS", label: "غیرفعال‌سازی خودکار ریزالورهای تایم‌اوت", type: "bool", default: true,
        info: "اگر ریزالوری فقط تایم‌اوت بدهد، خودکار غیرفعال می‌شود.",
        perf: "stability" },
      { key: "AUTO_DISABLE_TIMEOUT_WINDOW_SECONDS", label: "پنجره مشاهده تایم‌اوت (ثانیه)", type: "number", default: 90, min: 1, max: 86400, clamp: "[1, 86400]", showIf: "AUTO_DISABLE_TIMEOUT_SERVERS" },
      { key: "AUTO_DISABLE_MIN_OBSERVATIONS", label: "حداقل مشاهدات لازم", type: "number", default: 8, min: 1, max: 10000, clamp: "[1, 10000]", showIf: "AUTO_DISABLE_TIMEOUT_SERVERS" },
      { key: "AUTO_DISABLE_CHECK_INTERVAL_SECONDS", label: "فاصله ارزیابی (ثانیه)", type: "number", default: 4, min: 0.25, max: 600, clamp: "[0.25, 600]", showIf: "AUTO_DISABLE_TIMEOUT_SERVERS" },
      { key: "BASE_ENCODE_DATA", label: "رمزگذاری Base برچسب‌ها", type: "bool", default: false,
        hint: "معمولاً false نگه دارید مگر ریزالور خاصی نیاز داشته باشد" }
    ]
  },
  {
    id: "compression", icon: "🗜️", iconClass: "icon-compression",
    title: "فشرده‌سازی",
    desc: "فشرده‌سازی آپلود و دانلود",
    fields: [
      { key: "UPLOAD_COMPRESSION_TYPE", label: "فشرده‌سازی آپلود", type: "select", default: 0,
        options: [{v:0,t:"خاموش (0)"},{v:1,t:"ZSTD (1)"},{v:2,t:"LZ4 (2)"},{v:3,t:"ZLIB (3)"}],
        info: "ZSTD بهترین نسبت فشرده‌سازی. LZ4 سریع‌ترین. ZLIB سازگاری بالا.",
        perf: "speed", perfTip: "LZ4 سریع‌ترین، ZSTD بهترین فشرده‌سازی، هر دو انتخاب خوبی هستند." },
      { key: "DOWNLOAD_COMPRESSION_TYPE", label: "فشرده‌سازی دانلود", type: "select", default: 0,
        options: [{v:0,t:"خاموش (0)"},{v:1,t:"ZSTD (1)"},{v:2,t:"LZ4 (2)"},{v:3,t:"ZLIB (3)"}] },
      { key: "COMPRESSION_MIN_SIZE", label: "حداقل اندازه برای فشرده‌سازی", type: "number", default: 120, min: 1,
        hint: "بسته‌های کوچک‌تر از این مقدار فشرده نمی‌شوند",
        perf: "speed", perfTip: "مقدار خیلی کم باعث سربار بی‌فایده می‌شود." }
    ]
  },
  {
    id: "mtu", icon: "🧪", iconClass: "icon-mtu",
    title: "کشف MTU",
    desc: "تنظیمات تست و کشف MTU ریزالورها",
    fields: [
      { key: "MIN_UPLOAD_MTU", label: "حداقل MTU آپلود", type: "number", default: 40, min: 0,
        info: "حداقل MTU قابل قبول برای آپلود. ریزالورهایی با MTU کمتر حذف می‌شوند.",
        perf: "stability", perfTip: "مقدار پایین‌تر = ریزالور بیشتر ولی سرعت کمتر. مقدار بالاتر = سرعت بیشتر ولی ریزالور کمتر." },
      { key: "MIN_DOWNLOAD_MTU", label: "حداقل MTU دانلود", type: "number", default: 100, min: 0 },
      { key: "MAX_UPLOAD_MTU", label: "حداکثر MTU آپلود", type: "number", default: 150, min: 0,
        info: "سقف جستجوی MTU. باید >= MIN باشد.",
        perf: "speed", perfTip: "مقدار بالاتر = سرعت بالقوه بیشتر ولی تست کندتر و ریزالور کمتر." },
      { key: "MAX_DOWNLOAD_MTU", label: "حداکثر MTU دانلود", type: "number", default: 500, min: 0 },
      { key: "MTU_TEST_RETRIES", label: "تعداد تلاش تست MTU", type: "number", default: 2, min: 1,
        perf: "stability", perfTip: "بیشتر = دقت بالاتر ولی شروع کندتر." },
      { key: "MTU_TEST_TIMEOUT", label: "تایم‌اوت تست MTU (ثانیه)", type: "number", default: 2, min: 0.5 },
      { key: "MTU_TEST_PARALLELISM", label: "تست موازی MTU", type: "number", default: 32, min: 1,
        perf: "speed", perfTip: "مقدار بالاتر = شروع سریع‌تر ولی فشار بیشتر روی شبکه." },
      { key: "SAVE_MTU_SERVERS_TO_FILE", label: "ذخیره نتایج MTU در فایل", type: "bool", default: false },
      { key: "MTU_SERVERS_FILE_NAME", label: "نام فایل خروجی", type: "text", default: "masterdnsvpn_success_test_{time}.log", showIf: "SAVE_MTU_SERVERS_TO_FILE" },
      { key: "MTU_SERVERS_FILE_FORMAT", label: "فرمت خروجی", type: "text", default: "{IP} - UP: {UP_MTU} DOWN: {DOWN-MTU}", showIf: "SAVE_MTU_SERVERS_TO_FILE" },
      { key: "MTU_USING_SECTION_SEPARATOR_TEXT", label: "جداکننده بخش", type: "text", default: "", showIf: "SAVE_MTU_SERVERS_TO_FILE" },
      { key: "MTU_REMOVED_SERVER_LOG_FORMAT", label: "فرمت لاگ حذف ریزالور", type: "text", default: "Resolver {IP} removed at {TIME} due to {CAUSE}", showIf: "SAVE_MTU_SERVERS_TO_FILE" },
      { key: "MTU_ADDED_SERVER_LOG_FORMAT", label: "فرمت لاگ اضافه شدن ریزالور", type: "text", default: "Resolver {IP} added back at {TIME} (UP {UP_MTU}, DOWN {DOWN_MTU})", showIf: "SAVE_MTU_SERVERS_TO_FILE" }
    ]
  },
  {
    id: "workers", icon: "🧵", iconClass: "icon-workers",
    title: "ورکرها، صف‌ها و تایمرها",
    desc: "تعداد ورکرها، اندازه صف‌ها و تایم‌اوت‌ها",
    fields: [
      { key: "TUNNEL_READER_WORKERS", label: "ورکر خواننده تانل", type: "number", default: 2, min: 1,
        perf: "cpu", perfTip: "بیشتر = ظرفیت بالاتر ولی مصرف CPU بیشتر." },
      { key: "TUNNEL_WRITER_WORKERS", label: "ورکر نویسنده تانل", type: "number", default: 2, min: 1, perf: "cpu" },
      { key: "TUNNEL_PROCESS_WORKERS", label: "ورکر پردازش تانل", type: "number", default: 2, min: 1, perf: "cpu" },
      { key: "TUNNEL_PACKET_TIMEOUT_SECONDS", label: "تایم‌اوت بسته تانل (ثانیه)", type: "number", default: 10, min: 0.5, max: 120, clamp: "[0.5, 120]" },
      { key: "DISPATCHER_IDLE_POLL_INTERVAL_SECONDS", label: "فاصله نظرسنجی دیسپچر (ثانیه)", type: "number", default: 0.020, min: 0.001, max: 1, clamp: "[0.001, 1]", step: 0.001,
        perf: "cpu", perfTip: "کمتر = تأخیر کمتر ولی CPU بیشتر. 0.02 تعادل خوبی است." },
      { key: "TX_CHANNEL_SIZE", label: "اندازه کانال TX", type: "number", default: 8192, min: 64, max: 65536, clamp: "[64, 65536]" },
      { key: "RX_CHANNEL_SIZE", label: "اندازه کانال RX", type: "number", default: 12288, min: 64, max: 65536, clamp: "[64, 65536]" },
      { key: "RESOLVER_UDP_CONNECTION_POOL_SIZE", label: "اندازه pool اتصال UDP", type: "number", default: 128, min: 1, max: 1024, clamp: "[1, 1024]" },
      { key: "STREAM_QUEUE_INITIAL_CAPACITY", label: "ظرفیت اولیه صف stream", type: "number", default: 256, min: 1 },
      { key: "ORPHAN_QUEUE_INITIAL_CAPACITY", label: "ظرفیت اولیه صف orphan", type: "number", default: 64, min: 1 },
      { key: "DNS_RESPONSE_FRAGMENT_STORE_CAPACITY", label: "ظرفیت ذخیره فرگمنت DNS", type: "number", default: 512, min: 1 },
      { key: "SOCKS_UDP_ASSOCIATE_READ_TIMEOUT_SECONDS", label: "تایم‌اوت خواندن UDP ASSOCIATE", type: "number", default: 30, min: 1, max: 3600, clamp: "[1, 3600]" },
      { key: "CLIENT_TERMINAL_STREAM_RETENTION_SECONDS", label: "نگهداری stream پایان‌یافته (ثانیه)", type: "number", default: 45, min: 1, max: 3600, clamp: "[1, 3600]" },
      { key: "CLIENT_CANCELLED_SETUP_RETENTION_SECONDS", label: "نگهداری setup لغوشده (ثانیه)", type: "number", default: 120, min: 1, max: 3600, clamp: "[1, 3600]" },
      { key: "SESSION_INIT_RETRY_BASE_SECONDS", label: "تأخیر پایه تلاش مجدد session", type: "number", default: 1, min: 0.1 },
      { key: "SESSION_INIT_RETRY_STEP_SECONDS", label: "گام افزایشی تلاش مجدد", type: "number", default: 1, min: 0.1 },
      { key: "SESSION_INIT_RETRY_LINEAR_AFTER", label: "خطی شدن بعد از تلاش", type: "number", default: 5, min: 1 },
      { key: "SESSION_INIT_RETRY_MAX_SECONDS", label: "حداکثر تأخیر تلاش مجدد", type: "number", default: 60, min: 1 },
      { key: "SESSION_INIT_BUSY_RETRY_INTERVAL_SECONDS", label: "تأخیر تلاش مجدد SESSION_BUSY", type: "number", default: 60, min: 1, max: 3600, clamp: "[1, 3600]" }
    ]
  },
  {
    id: "ping", icon: "📡", iconClass: "icon-ping",
    title: "پینگ / Keepalive",
    desc: "کنترل فاصله ارسال پینگ بسته به فعالیت",
    fields: [
      { key: "PING_AGGRESSIVE_INTERVAL_SECONDS", label: "فاصله پینگ تهاجمی (ثانیه)", type: "number", default: 0.2, min: 0.01, step: 0.01,
        info: "وقتی ترافیک فعال و سنگین است. مقدار کمتر = پاسخ‌دهی بهتر.",
        perf: "speed", perfTip: "کمتر = سریع‌تر ولی مصرف پهنای باند بیشتر." },
      { key: "PING_LAZY_INTERVAL_SECONDS", label: "فاصله پینگ آرام (ثانیه)", type: "number", default: 0.75, min: 0.01, step: 0.01 },
      { key: "PING_COOLDOWN_INTERVAL_SECONDS", label: "فاصله پینگ cooldown (ثانیه)", type: "number", default: 2, min: 0.1 },
      { key: "PING_COLD_INTERVAL_SECONDS", label: "فاصله پینگ سرد (ثانیه)", type: "number", default: 15, min: 1 },
      { key: "PING_WARM_THRESHOLD_SECONDS", label: "آستانه گرم (ثانیه)", type: "number", default: 5, min: 0.1 },
      { key: "PING_COOL_THRESHOLD_SECONDS", label: "آستانه خنک (ثانیه)", type: "number", default: 15, min: 0.1 },
      { key: "PING_COLD_THRESHOLD_SECONDS", label: "آستانه سرد (ثانیه)", type: "number", default: 30, min: 0.1 }
    ]
  },
  {
    id: "arq", icon: "🔄", iconClass: "icon-arq",
    title: "ARQ و بسته‌بندی",
    desc: "ارسال مجدد داده، کنترل و محدودیت‌های بافر",
    fields: [
      { key: "MAX_PACKETS_PER_BATCH", label: "حداکثر بسته در هر بچ", type: "number", default: 5, min: 1, max: 64, clamp: "[1, 64]",
        perf: "speed", perfTip: "بیشتر = بهره‌وری بالاتر ولی تأخیر افزایش می‌یابد." },
      { key: "ARQ_WINDOW_SIZE", label: "اندازه پنجره ARQ", type: "number", default: 600, min: 1,
        info: "تعداد بسته‌های ارسال‌نشده‌ای که بدون ACK در صف باقی می‌مانند. بزرگ‌تر = توان بالاتر ولی حافظه بیشتر.",
        perf: "speed", perfTip: "برای شبکه پرتأخیر مقدار بزرگ‌تر بگذارید." },
      { key: "ARQ_INITIAL_RTO_SECONDS", label: "RTO اولیه داده (ثانیه)", type: "number", default: 1, min: 0.05 },
      { key: "ARQ_MAX_RTO_SECONDS", label: "حداکثر RTO داده (ثانیه)", type: "number", default: 5, min: 0.5 },
      { key: "ARQ_CONTROL_INITIAL_RTO_SECONDS", label: "RTO اولیه کنترل (ثانیه)", type: "number", default: 0.5, min: 0.05 },
      { key: "ARQ_CONTROL_MAX_RTO_SECONDS", label: "حداکثر RTO کنترل (ثانیه)", type: "number", default: 3, min: 0.5 },
      { key: "ARQ_MAX_CONTROL_RETRIES", label: "حداکثر تلاش کنترل", type: "number", default: 300, min: 5 },
      { key: "ARQ_INACTIVITY_TIMEOUT_SECONDS", label: "تایم‌اوت عدم‌فعالیت ARQ (ثانیه)", type: "number", default: 1800, min: 30 },
      { key: "ARQ_DATA_PACKET_TTL_SECONDS", label: "TTL بسته داده (ثانیه)", type: "number", default: 2400, min: 30 },
      { key: "ARQ_CONTROL_PACKET_TTL_SECONDS", label: "TTL بسته کنترل (ثانیه)", type: "number", default: 1200, min: 30 },
      { key: "ARQ_MAX_DATA_RETRIES", label: "حداکثر تلاش داده", type: "number", default: 1200, min: 60 },
      { key: "ARQ_DATA_NACK_MAX_GAP", label: "حداکثر شکاف NACK", type: "number", default: 64, min: 0,
        info: "0 یعنی NACK غیرفعال. مقدار کوچک فقط شکاف‌های نزدیک را درخواست ارسال مجدد می‌کند." },
      { key: "ARQ_DATA_NACK_INITIAL_DELAY_SECONDS", label: "تأخیر اولیه NACK (ثانیه)", type: "number", default: 0.4, min: 0.1, max: 30, clamp: "[0.1, 30]" },
      { key: "ARQ_DATA_NACK_REPEAT_SECONDS", label: "تکرار NACK (ثانیه)", type: "number", default: 1, min: 0.1, max: 30, clamp: "[0.1, 30]" },
      { key: "ARQ_TERMINAL_DRAIN_TIMEOUT_SECONDS", label: "تایم‌اوت تخلیه پایانی (ثانیه)", type: "number", default: 120, min: 10 },
      { key: "ARQ_TERMINAL_ACK_WAIT_TIMEOUT_SECONDS", label: "تایم‌اوت انتظار ACK پایانی (ثانیه)", type: "number", default: 90, min: 5 }
    ]
  },
  {
    id: "logging", icon: "🪵", iconClass: "icon-logging",
    title: "لاگ‌گذاری",
    desc: "سطح نمایش لاگ",
    fields: [
      { key: "LOG_LEVEL", label: "سطح لاگ", type: "select", default: "INFO",
        options: [{v:"DEBUG",t:"DEBUG — همه جزئیات"},{v:"INFO",t:"INFO — اطلاعات عمومی"},{v:"WARN",t:"WARN — هشدارها"},{v:"ERROR",t:"ERROR — فقط خطاها"}],
        info: "DEBUG برای عیب‌یابی. INFO برای استفاده عادی. ERROR برای حداقل لاگ.",
        perf: "cpu", perfTip: "DEBUG مصرف CPU و دیسک بالایی دارد. INFO توصیه می‌شود." }
    ]
  }
];

const SERVER_SECTIONS = [
  {
    id: "s-policy", icon: "🌐", iconClass: "icon-policy",
    title: "سیاست تانل",
    desc: "دامنه، پروتکل و فشرده‌سازی مجاز",
    fields: [
      { key: "DOMAIN", label: "دامنه‌های تانل", type: "text", default: '["v.domain.com"]',
        hint: "باید با DOMAINS کلاینت یکسان باشد",
        info: "دامنه‌هایی که سرور مدیریت می‌کند. باید با تنظیم DNS و مقدار DOMAINS کلاینت مطابقت داشته باشد." },
      { key: "PROTOCOL_TYPE", label: "نوع پروتکل", type: "select", default: "SOCKS5",
        options: [{v:"SOCKS5",t:"SOCKS5 — کلاینت مقصد را انتخاب می‌کند"},{v:"TCP",t:"TCP — مقصد ثابت"}],
        info: "SOCKS5: مثل یک پراکسی عادی، کلاینت مقصد را مشخص می‌کند.<br>TCP: همه اتصالات به FORWARD_IP:FORWARD_PORT ارسال می‌شوند." },
      { key: "SUPPORTED_UPLOAD_COMPRESSION_TYPES", label: "فشرده‌سازی آپلود مجاز", type: "text", default: "[0, 1, 2, 3]",
        hint: "لیست JSON شماره‌ها: 0=OFF, 1=ZSTD, 2=LZ4, 3=ZLIB" },
      { key: "SUPPORTED_DOWNLOAD_COMPRESSION_TYPES", label: "فشرده‌سازی دانلود مجاز", type: "text", default: "[0, 1, 2, 3]" }
    ]
  },
  {
    id: "s-udp", icon: "📥", iconClass: "icon-udp",
    title: "شنونده UDP و ظرفیت ورودی",
    desc: "پورت، ورکرها و اندازه بافر سوکت",
    fields: [
      { key: "UDP_HOST", label: "آدرس شنود UDP", type: "text", default: "0.0.0.0" },
      { key: "UDP_PORT", label: "پورت UDP", type: "number", default: 53, min: 1, max: 65535,
        info: "معمولاً 53 برای DNS. اگر پورت 53 اشغال است بخش troubleshoot را ببینید." },
      { key: "UDP_READERS", label: "تعداد خوانندگان UDP", type: "number", default: 2, min: 1,
        perf: "cpu", perfTip: "بیشتر = ظرفیت بالاتر ولی مصرف CPU بیشتر." },
      { key: "DNS_REQUEST_WORKERS", label: "ورکر پردازش درخواست DNS", type: "number", default: 4, min: 1, perf: "cpu" },
      { key: "MAX_CONCURRENT_REQUESTS", label: "حداکثر درخواست‌های همزمان", type: "number", default: 12288, min: 1,
        info: "صف درخواست‌ها. اگر پر شود بسته‌ها دور ریخته می‌شوند.",
        perf: "stability", perfTip: "مقدار بالاتر = جذب burst بهتر ولی حافظه بیشتر." },
      { key: "SOCKET_BUFFER_SIZE", label: "اندازه بافر سوکت (بایت)", type: "number", default: 8388608, min: 1024,
        perf: "speed", perfTip: "8 مگابایت برای بیشتر سرورها مناسب است. روی VPS ضعیف می‌توانید کم کنید." },
      { key: "MAX_PACKET_SIZE", label: "حداکثر اندازه بسته", type: "number", default: 65535, min: 512 },
      { key: "DROP_LOG_INTERVAL_SECONDS", label: "فاصله لاگ drop (ثانیه)", type: "number", default: 2, min: 0.1 }
    ]
  },
  {
    id: "s-deferred", icon: "🧠", iconClass: "icon-deferred",
    title: "Deferred Session Runtime",
    desc: "ورکرها و صف‌های پردازش تأخیری در هر session",
    fields: [
      { key: "DEFERRED_SESSION_WORKERS", label: "ورکر session تأخیری", type: "number", default: 2, min: 1,
        perf: "cpu", perfTip: "بیشتر = ظرفیت بالاتر ولی CPU بیشتر." },
      { key: "DEFERRED_SESSION_QUEUE_LIMIT", label: "محدودیت صف session تأخیری", type: "number", default: 4096, min: 256, max: 14336, clamp: "[256, 14336]",
        perf: "stability", perfTip: "بالاتر = تحمل burst بیشتر." },
      { key: "SESSION_ORPHAN_QUEUE_INITIAL_CAPACITY", label: "ظرفیت اولیه صف orphan", type: "number", default: 128, min: 4, max: 4096, clamp: "[4, 4096]" },
      { key: "STREAM_QUEUE_INITIAL_CAPACITY", label: "ظرفیت اولیه صف stream", type: "number", default: 256, min: 8, max: 65536 },
      { key: "DNS_FRAGMENT_STORE_CAPACITY", label: "ظرفیت ذخیره فرگمنت DNS", type: "number", default: 512, min: 16, max: 16384, clamp: "[16, 16384]" },
      { key: "SOCKS5_FRAGMENT_STORE_CAPACITY", label: "ظرفیت ذخیره فرگمنت SOCKS5", type: "number", default: 1024, min: 16, max: 16384, clamp: "[16, 16384]" }
    ]
  },
  {
    id: "s-session", icon: "🍪", iconClass: "icon-session",
    title: "چرخه عمر Session و Cookie نامعتبر",
    desc: "تایم‌اوت، پاکسازی و ردیابی cookie نامعتبر",
    fields: [
      { key: "INVALID_COOKIE_WINDOW_SECONDS", label: "پنجره cookie نامعتبر (ثانیه)", type: "number", default: 2, min: 0.1,
        info: "پنجره زمانی که تعداد cookie نامعتبر شمارش می‌شود. بعد از آستانه، سرور رفتار اضطراری می‌گیرد.",
        perf: "security" },
      { key: "INVALID_COOKIE_ERROR_THRESHOLD", label: "آستانه خطای cookie", type: "number", default: 10, min: 1 },
      { key: "SESSION_TIMEOUT_SECONDS", label: "تایم‌اوت عدم‌فعالیت session (ثانیه)", type: "number", default: 300, min: 1 },
      { key: "SESSION_CLEANUP_INTERVAL_SECONDS", label: "فاصله پاکسازی (ثانیه)", type: "number", default: 30, min: 1 },
      { key: "CLOSED_SESSION_RETENTION_SECONDS", label: "نگهداری session بسته‌شده (ثانیه)", type: "number", default: 600, min: 1 },
      { key: "SESSION_INIT_REUSE_TTL_SECONDS", label: "TTL استفاده مجدد init (ثانیه)", type: "number", default: 600, min: 1, max: 86400 },
      { key: "RECENTLY_CLOSED_STREAM_TTL_SECONDS", label: "TTL stream اخیراً بسته‌شده (ثانیه)", type: "number", default: 600, min: 1, max: 86400 },
      { key: "RECENTLY_CLOSED_STREAM_CAP", label: "سقف رکوردهای stream بسته‌شده", type: "number", default: 2000, min: 1, max: 1000000 },
      { key: "TERMINAL_STREAM_RETENTION_SECONDS", label: "نگهداری stream پایانی (ثانیه)", type: "number", default: 45, min: 1, max: 86400 }
    ]
  },
  {
    id: "s-dnsup", icon: "📛", iconClass: "icon-dns",
    title: "DNS Upstream تانل",
    desc: "ریزالورهای بالادستی برای DNS-over-Tunnel",
    fields: [
      { key: "DNS_UPSTREAM_SERVERS", label: "سرورهای DNS بالادستی", type: "text", default: '["1.1.1.1:53", "1.0.0.1:53"]',
        hint: "فرمت JSON مثل: [\"1.1.1.1:53\", \"8.8.8.8:53\"]",
        info: "وقتی کلاینت درخواست DNS از طریق تانل ارسال می‌کند، سرور از این ریزالورها پاسخ می‌گیرد." },
      { key: "DNS_UPSTREAM_TIMEOUT", label: "تایم‌اوت upstream (ثانیه)", type: "number", default: 4, min: 0.1 },
      { key: "DNS_INFLIGHT_WAIT_TIMEOUT_SECONDS", label: "تایم‌اوت انتظار inflight (ثانیه)", type: "number", default: 15, min: 0.1, max: 120, clamp: "[0.1, 120]" },
      { key: "DNS_FRAGMENT_ASSEMBLY_TIMEOUT", label: "تایم‌اوت بازسازی فرگمنت (ثانیه)", type: "number", default: 300, min: 1 },
      { key: "DNS_CACHE_MAX_RECORDS", label: "حداکثر رکوردهای کش DNS", type: "number", default: 50000, min: 1 },
      { key: "DNS_CACHE_TTL_SECONDS", label: "TTL کش DNS (ثانیه)", type: "number", default: 300, min: 1 }
    ]
  },
  {
    id: "s-forward", icon: "🌐", iconClass: "icon-forward",
    title: "فوروارد و SOCKS5 خارجی",
    desc: "اتصال مستقیم یا زنجیره‌ای از طریق پراکسی بالادستی",
    fields: [
      { key: "SOCKS_CONNECT_TIMEOUT", label: "تایم‌اوت اتصال (ثانیه)", type: "number", default: 120, min: 1 },
      { key: "USE_EXTERNAL_SOCKS5", label: "استفاده از SOCKS5 خارجی", type: "bool", default: false,
        info: "اگر فعال باشد، سرور ابتدا به یک پراکسی SOCKS5 بالادستی وصل می‌شود و بعد مقصد نهایی را باز می‌کند. برای استفاده عادی نیازی به فعال‌سازی نیست." },
      { key: "SOCKS5_AUTH", label: "احراز هویت SOCKS5 بالادستی", type: "bool", default: false, showIf: "USE_EXTERNAL_SOCKS5" },
      { key: "SOCKS5_USER", label: "نام کاربری", type: "text", default: "admin", showIf: "USE_EXTERNAL_SOCKS5" },
      { key: "SOCKS5_PASS", label: "رمز عبور", type: "password", default: "123456", showIf: "USE_EXTERNAL_SOCKS5" },
      { key: "FORWARD_IP", label: "آدرس IP فوروارد", type: "text", default: "",
        info: "در حالت TCP: مقصد نهایی. در SOCKS5 + External: آدرس پراکسی بالادستی." },
      { key: "FORWARD_PORT", label: "پورت فوروارد", type: "number", default: 0, min: 0, max: 65535 }
    ]
  },
  {
    id: "s-security", icon: "🔐", iconClass: "icon-security",
    title: "امنیت",
    desc: "رمزنگاری و فایل کلید",
    fields: [
      { key: "DATA_ENCRYPTION_METHOD", label: "روش رمزنگاری", type: "select", default: 1,
        options: [{v:0,t:"بدون رمزنگاری (0)"},{v:1,t:"XOR (1)"},{v:2,t:"ChaCha20 (2)"},{v:3,t:"AES-128-GCM (3)"},{v:4,t:"AES-192-GCM (4)"},{v:5,t:"AES-256-GCM (5)"}],
        hint: "باید با کلاینت یکسان باشد",
        perf: "security", perfTip: "AES-256 امن‌ترین ولی سنگین‌ترین. XOR سبک‌ترین." },
      { key: "ENCRYPTION_KEY_FILE", label: "مسیر فایل کلید", type: "text", default: "encrypt_key.txt",
        info: "مسیر نسبی یا مطلق فایل کلید. اگر فایل وجود نداشته باشد، سرور هنگام شروع آن را می‌سازد." }
    ]
  },
  {
    id: "s-arq", icon: "🔄", iconClass: "icon-arq",
    title: "ARQ، بسته‌بندی و TTL کنترل",
    desc: "پارامترهای قابلیت اطمینان و بسته‌بندی سمت سرور",
    fields: [
      { key: "MAX_PACKETS_PER_BATCH", label: "حداکثر بسته در هر بچ", type: "number", default: 10, min: 1, max: 64, clamp: "[1, 64]" },
      { key: "PACKET_BLOCK_CONTROL_DUPLICATION", label: "تکرار بلوک کنترل", type: "number", default: 1, min: 1, max: 16, clamp: "[1, 16]",
        info: "اگر بیشتر از 1 باشد، آخرین بلوک کنترل چند ترن تکرار می‌شود. روی لینک‌های lossy به بقای ACK/CLOSE/RST کمک می‌کند.",
        perf: "stability", perfTip: "مقدار 2-3 برای شبکه‌های lossy مفید است." },
      { key: "STREAM_SETUP_ACK_TTL_SECONDS", label: "TTL ACK راه‌اندازی (ثانیه)", type: "number", default: 400, min: 1, max: 86400 },
      { key: "STREAM_RESULT_PACKET_TTL_SECONDS", label: "TTL بسته نتیجه (ثانیه)", type: "number", default: 300, min: 1, max: 86400 },
      { key: "STREAM_FAILURE_PACKET_TTL_SECONDS", label: "TTL بسته شکست (ثانیه)", type: "number", default: 120, min: 1, max: 86400 },
      { key: "ARQ_WINDOW_SIZE", label: "اندازه پنجره ARQ", type: "number", default: 600, min: 1, max: 16384, clamp: "[1, 16384]" },
      { key: "ARQ_INITIAL_RTO_SECONDS", label: "RTO اولیه (ثانیه)", type: "number", default: 1, min: 0.05, max: 60, clamp: "[0.05, 60]" },
      { key: "ARQ_MAX_RTO_SECONDS", label: "حداکثر RTO (ثانیه)", type: "number", default: 5, min: 0.5, max: 120 },
      { key: "ARQ_CONTROL_INITIAL_RTO_SECONDS", label: "RTO اولیه کنترل (ثانیه)", type: "number", default: 0.5, min: 0.05, max: 60, clamp: "[0.05, 60]" },
      { key: "ARQ_CONTROL_MAX_RTO_SECONDS", label: "حداکثر RTO کنترل (ثانیه)", type: "number", default: 3, min: 0.5, max: 120 },
      { key: "ARQ_MAX_CONTROL_RETRIES", label: "حداکثر تلاش کنترل", type: "number", default: 300, min: 5, max: 5000, clamp: "[5, 5000]" },
      { key: "ARQ_INACTIVITY_TIMEOUT_SECONDS", label: "تایم‌اوت عدم‌فعالیت (ثانیه)", type: "number", default: 1800, min: 30, max: 86400 },
      { key: "ARQ_DATA_PACKET_TTL_SECONDS", label: "TTL بسته داده (ثانیه)", type: "number", default: 2400, min: 30, max: 86400 },
      { key: "ARQ_CONTROL_PACKET_TTL_SECONDS", label: "TTL بسته کنترل (ثانیه)", type: "number", default: 1200, min: 30, max: 86400 },
      { key: "ARQ_MAX_DATA_RETRIES", label: "حداکثر تلاش داده", type: "number", default: 1200, min: 60, max: 100000, clamp: "[60, 100000]" },
      { key: "ARQ_DATA_NACK_MAX_GAP", label: "حداکثر شکاف NACK", type: "number", default: 64, min: 0, max: 32 },
      { key: "ARQ_DATA_NACK_INITIAL_DELAY_SECONDS", label: "تأخیر اولیه NACK (ثانیه)", type: "number", default: 0.4, min: 0.1, max: 30, clamp: "[0.1, 30]" },
      { key: "ARQ_DATA_NACK_REPEAT_SECONDS", label: "تکرار NACK (ثانیه)", type: "number", default: 1, min: 0.1, max: 30, clamp: "[0.1, 30]" },
      { key: "ARQ_TERMINAL_DRAIN_TIMEOUT_SECONDS", label: "تایم‌اوت تخلیه پایانی (ثانیه)", type: "number", default: 120, min: 10, max: 3600 },
      { key: "ARQ_TERMINAL_ACK_WAIT_TIMEOUT_SECONDS", label: "تایم‌اوت انتظار ACK پایانی (ثانیه)", type: "number", default: 90, min: 5, max: 3600 }
    ]
  },
  {
    id: "s-logging", icon: "🪵", iconClass: "icon-logging",
    title: "لاگ‌گذاری",
    desc: "سطح نمایش لاگ سرور",
    fields: [
      { key: "LOG_LEVEL", label: "سطح لاگ", type: "select", default: "INFO",
        options: [{v:"DEBUG",t:"DEBUG — همه جزئیات"},{v:"INFO",t:"INFO — اطلاعات عمومی"},{v:"WARN",t:"WARN — هشدارها"},{v:"ERROR",t:"ERROR — فقط خطاها"}],
        perf: "cpu", perfTip: "DEBUG مصرف منابع بالایی دارد." }
    ]
  }
];
