# វិញ្ញាបនប័ត្របញ្ជាក់កាយសម្បទា — GitHub Pages + Google Sheet

ទំព័រ Web ដាក់លើ **GitHub Pages** (`index.html` + `api.js`) ហើយទិន្នន័យរក្សាទុកក្នុង **Google Sheet** តាមរយៈ **Google Apps Script** (`Code.gs`) ដែលដើរតួជា API។

```
GitHub Pages (index.html + api.js)  ──fetch POST──▶  Apps Script (Code.gs)  ──▶  Google Sheet
```

## ឯកសារ
| ឯកសារ | ដាក់នៅ | ការពិពណ៌នា |
|---|---|---|
| `index.html` | GitHub | ទំព័រ Web (Login, បញ្ជី, Form, វិញ្ញាបនប័ត្រ A4) |
| `api.js` | GitHub | ភ្ជាប់ទៅ Apps Script — **ត្រូវដាក់ API_URL** |
| `Code.gs` | Google Apps Script | Server/API (Login, User, រក្សាទុក/ទាញ/លុប ទិន្នន័យ) |

## ជំហានទី ១ — Google Apps Script (API)
1. បើក Google Sheet → **Extensions → Apps Script**
2. ប្ដូរ `Code.gs` ដោយឯកសារ `Code.gs` នេះ → **Save**
3. **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone** ← *សំខាន់! បើមិនមែន Anyone ទេ GitHub នឹងហៅមិនបាន*
4. ចុច **Deploy** → Authorize → ចម្លង **Web app URL** (បញ្ចប់ដោយ `/exec`)

> បើកែ `Code.gs` ពេលក្រោយ៖ **Deploy → Manage deployments → Edit → Version: New version → Deploy** (URL ដដែល)

## ជំហានទី ២ — ភ្ជាប់ URL (ជ្រើសមួយ)
- **ក. ក្នុង `api.js`** (ល្អបំផុត)៖ `var API_URL = 'https://script.google.com/macros/s/AKfycb.../exec';`
- **ខ. នៅទំព័រ Login**៖ បិទភ្ជាប់ URL ក្នុងប្រអប់ **ភ្ជាប់ទៅ Google Sheet** → ចុច **ភ្ជាប់** (browser នីមួយៗត្រូវធ្វើម្ដង)

## ជំហានទី ៣ — GitHub Pages
1. github.com → **New repository** (ឧ. `physical-test`)
2. **Add file → Upload files** → អូស `index.html`, `api.js`, `README.md` ពី folder `github` → **Commit**
   - ⚠️ ឈ្មោះត្រូវតែ **`index.html`** (អក្សរតូច គ្មានដកឃ្លា) បើមិនដូច្នោះ នឹងចេញ 404
3. **Settings → Pages** → Source: **Deploy from a branch** → Branch: **main** / **(root)** → **Save**
4. រង់ចាំ ១–២ នាទី → Web នៅ `https://<username>.github.io/physical-test/`

> **កុំ upload `Code.gs` ជា Public** ព្រោះវាមានពាក្យសម្ងាត់ដំបូង។ បើចង់ទុកក្នុង repo សូមប្រើ Private repo។

## ចូលប្រើ
- Admin៖ `admin` / `Kep@2301` → សូមប្ដូរពាក្យសម្ងាត់ភ្លាមៗ (ប៊ូតុង **ប្ដូរពាក្យសម្ងាត់**)
- Admin បង្កើត User នៅប៊ូតុង **អ្នកប្រើប្រាស់**
- ភ្លេចពាក្យសម្ងាត់ Admin៖ ក្នុង Apps Script ជ្រើស `resetAdminPassword` → **Run**

## បោះពុម្ព
Paper size **A4** · Margins **None** · Scale **100** · ដោះធីក Headers and footers

## សុវត្ថិភាព
- ពាក្យសម្ងាត់រក្សាជា hash (SHA-256 + salt) ក្នុង Script Properties មិនមែនក្នុង Sheet ឬ GitHub
- គ្រប់សំណើ (លើកលែង login) ត្រូវមាន token ដែលផុតកំណត់ក្រោយ ៦ ម៉ោង
- វាយពាក្យសម្ងាត់ខុស ៥ ដង → ចាក់សោ ៥ នាទី
- `index.html` ក៏នៅតែដំណើរការក្នុង Apps Script ផ្ទាល់ (link `/exec`) ដូចមុន
