# Good Boy Donation App

Tento projekt je frontendová aplikácia pre nadáciu Good Boy, ktorá umožňuje používateľom jednoducho prispieť na podporu psích útulkov.
Aplikácia je vytvorená pomocou Next.js, React, TypeScript a Ant Design.

---

### Funkcie

- Viackrokový formulár (stepper) pre vytvorenie príspevku:
  - Výber útulku a sumy
  - Zadanie osobných údajov
  - Kontrola údajov a odoslanie príspevku

- Viacjazyčná podpora (Slovenčina a Angličtina) pomocou i18next
- Načítanie dát o útulkoch z API (/api/v1/shelters/results)
- Zobrazenie informácií o projekte a kontaktná stránka
- Prepojenie s backend API pre odosielanie príspevkov

## Použité technológie

- Next.js 15+
- React 19+
- TypeScript
- Ant Design
- i18next
- SCSS Modules

## Inštalácia a spustenie


- Naklonuj repozitár:

        git clone https://github.com/tvoje-repo/goodboy-donation.git
        cd goodboy-donation

- Nainštaluj závislosti:

        npm install
        # or
        yarn install

- Vytvor súbor .env.local v koreňovom adresári projektu a pridaj:

        NEXT_PUBLIC_API_BASE_URL=https://frontend-assignment-api.goodrequest.dev/api/v1/shelters


- Spusti projekt v dev režime:

        npm run dev
        # or
        yarn dev

- Otvor vo svojom prehliadači:

        http://localhost:3000

## Stránky

| Stránka          | Popis                                     |
| ---------------- | ----------------------------------------- |
| `/`              | Hlavná stránka s formulárom pre príspevok |
| `/about-project` | Informácie o projekte                     |
| `/contact`       | Kontaktná stránka                         |
