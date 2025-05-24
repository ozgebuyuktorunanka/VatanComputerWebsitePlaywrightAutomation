        playwright-project/
        │
        ├── .github/                  # (Opsiyonel) GitHub Actions için
        │
        ├── configs/                  # Ortam bazlı config dosyaları
        │   ├── env.dev.ts
        │   ├── env.staging.ts
        │   └── env.prod.ts
        │
        ├── playwright.config.ts      # Playwright global yapılandırması
        │
        ├── tests/                    # Test dosyaları
        │   ├── flows/                # Test senaryoları (E2E, smoke vb.)
        │   └── regression/           # Regression testleri
        │
        ├── pages/                    # Page Object Model yapısı
        │   ├── login.page.ts
        │   ├── dashboard.page.ts
        │   └── index.ts              # Barrel file
        │
        ├── utils/                    # Yardımcı fonksiyonlar
        │   ├── api.helper.ts
        │   ├── test.helper.ts
        │   └── index.ts              # Barrel file
        │
        ├── data/                     # Test verileri (JSON, CSV vs.)
        │   └── user.data.ts
        │
        ├── fixtures/                 # Ortak kullanılacak test fixtures
        │   └── global.setup.ts
        │
        ├── reports/                  # Test raporları (HTML, JSON)
        │
        ├── .env                      # Ortam değişkenleri
        ├── package.json
        └── README.md
