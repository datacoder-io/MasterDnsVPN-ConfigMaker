# 🔐 MasterDnsVPN Config Maker

> **ابزار ساخت کانفیگ فارسی برای پروژه [MasterDnsVPN](https://github.com/masterking32/MasterDnsVPN)**

A fully Persian (فارسی) web-based configuration generator for [MasterDnsVPN](https://github.com/masterking32/MasterDnsVPN) — an advanced DNS tunneling VPN for censorship bypass.

[![Live Demo](https://img.shields.io/badge/Live-Demo-6366f1?style=for-the-badge)](https://datacoder-io.github.io/MasterDnsVPN-ConfigMaker)
[![MasterDnsVPN](https://img.shields.io/badge/For-MasterDnsVPN-a78bfa?style=for-the-badge)](https://github.com/masterking32/MasterDnsVPN)
[![Language](https://img.shields.io/badge/Language-Persian%20%7C%20فارسی-22d3ee?style=for-the-badge)]()

---

## ✨ ویژگی‌ها

- 🇮🇷 **رابط کاربری کاملاً فارسی** با فونت وزیرمتن و چیدمان راست‌به‌چپ
- 📘 **توضیح کامل هر پارامتر** — با کلیک روی دکمه "؟" توضیح فارسی + نکات عملکردی می‌بینید
- ⚡ **بج‌های عملکردی** — هر تنظیم با برچسب رنگی سرعت/پایداری/امنیت/CPU/پهنای‌باند
- 🛠️ **ویزارد پیشنهاد خودکار** — بر اساس سخت‌افزار و شبکه، مقادیر بهینه پیشنهاد می‌دهد
- 💻 **کلاینت و سرور جداگانه** — هر کدام ویزارد اختصاصی با سؤالات مناسب دارند
- 📥 **دانلود فایل** — خروجی مستقیم `client_config.toml` یا `server_config.toml`
- 📋 **کپی کلیپ‌بورد** — کانفیگ تولیدشده را مستقیم کپی کنید
- 🔄 **بازگشت به پیش‌فرض** — با یک کلیک همه مقادیر ریست می‌شوند
- 🎨 **طراحی مدرن** — تم تاریک، گلس‌مورفیسم، انیمیشن زمینه

---

## 🛠️ ویزارد سخت‌افزار

### ویزارد کلاینت (۴ مرحله)
| مرحله | سؤالات |
|-------|---------|
| ۱ | نوع اتصال اینترنت + کیفیت شبکه |
| ۲ | تعداد هسته CPU + مقدار RAM دستگاه |
| ۳ | تعداد ریزالورها + اولویت MTU |
| ۴ | نوع استفاده (مرور/پیام‌رسان/استریم/دانلود) + رمزنگاری |

### ویزارد سرور (۳ مرحله)
| مرحله | سؤالات |
|-------|---------|
| ۱ | CPU هسته + RAM + سرعت شبکه سرور |
| ۲ | تعداد کاربران همزمان + نوع ترافیک |
| ۳ | رمزنگاری + DNS بالادستی + وضعیت شبکه کلاینت‌ها |

---

## 🚀 استفاده

### آنلاین (GitHub Pages)
به آدرس زیر بروید:
```
https://datacoder-io.github.io/MasterDnsVPN-ConfigMaker
```

### محلی (Local)
```bash
git clone https://github.com/datacoder-io/MasterDnsVPN-ConfigMaker.git
cd MasterDnsVPN-ConfigMaker
python3 -m http.server 8080
# سپس مرورگر را به http://localhost:8080 باز کنید
```

---

## 📂 ساختار فایل‌ها

```
config-maker/
├── index.html          # ساختار اصلی HTML
├── style.css           # طراحی اصلی (تم تاریک + RTL)
├── wizard.css          # استایل ویزارد سخت‌افزار
├── config-data.js      # تعریف همه پارامترهای کلاینت و سرور
├── field-info-patch.js # توضیحات فارسی کامل برای هر فیلد
├── app.js              # منطق اصلی برنامه + تولید TOML
└── hardware-wizard.js  # ویزارد پیشنهاد خودکار
```

---

## 🔗 لینک‌های مرتبط

- **پروژه اصلی:** [MasterDnsVPN](https://github.com/masterking32/MasterDnsVPN)
- **کانال تلگرام:** [@masterdnsvpn](https://t.me/masterdnsvpn)
- **توسعه‌دهنده اصلی:** [MasterkinG32](https://github.com/masterking32)

---

## ⚠️ سلب مسئولیت

این ابزار صرفاً برای تسهیل تنظیم پروژه MasterDnsVPN ساخته شده و به هیچ وجه جایگزین مستندات رسمی نیست. همیشه در کنار این ابزار، [README اصلی پروژه](https://github.com/masterking32/MasterDnsVPN/blob/main/README.MD) را مطالعه کنید.
