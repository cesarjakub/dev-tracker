# dev-tracker

Jednoduchý a efektivní nástroj pro sledování vývoje projektů, úkolů a času.

## Cíl projektu
Hlavním cílem aplikace je poskytnout vývojářům přehledné rozhraní pro:
* Správu projektů a jejich detailů.
* Sledování času stráveného na úkolech (ProjectTimer).
* Vizualizaci progresu pomocí grafů (Analytics).
* Organizaci denních úkolů (Todo).

## Technologie
* **Framework:** React (Vite)
* **Styling:** SCSS (v adresáři `styles`)
* **Ikony:** SVG (vlastní set v `assets/icons`)

## Struktura projektu
* `/src/api` – Komunikace s backendem/daty.
* `/src/components` – Znovupoužitelné UI komponenty (tlačítka, karty, modály).
* `/src/hooks` – Vlastní logika (např. `useProject`, `useTasks`).
* `/src/pages` – Hlavní pohledy aplikace (Dashboard, Analytics, atd.).
* `/src/context` – Globální správa stavu (časovač relace).

## Spuštění projektu
1. Instalace závislostí: `npm install`
2. Spuštění vývojového serveru: `npm run dev`
3. Build pro produkci: `npm run build`