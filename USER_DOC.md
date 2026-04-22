# dev-tracker — Uživatelská a technická dokumentace

---

| Kategorie     | Detaily projektu                                             |
|-------------|-----------------------------------------------------|
| **Autor**   | Jakub César                                         |
| **Datum**   | 2026-04-08                                          |
| **Stack**   | React 19 · Vite 7 · SCSS · Recharts · Custom router |

---

## Obsah

1. [Úvod a Vize](#1-úvod-a-vize)
2. [Instalace a Setup](#2-instalace-a-setup)
3. [Průvodce moduly](#3-průvodce-moduly)
    - 3.1 [Projects (Dashboard)](#31-projects-dashboard)
    - 3.2 [Project Detail & Timer](#32-project-detail--timer)
    - 3.3 [To-Do](#33-to-do)
    - 3.4 [Analytics](#34-analytics)
4. [Architektura dat](#4-architektura-dat)
    - 4.1 [SessionTimerContext](#41-sessiontimercontext)
    - 4.2 [LocalStorage persistence](#42-localstorage-persistence)
    - 4.3 [Custom Router](#43-custom-router)
5. [Standardy vývoje](#5-standardy-vývoje)
6. [Troubleshooting](#6-troubleshooting)

---

## 1. Úvod a Vize

**dev-tracker** je Single Page Application navržená pro vývojáře a studenty, kteří chtějí mít přehled o svých projektech, úkolech a čase stráveném vývojem — vše na jednom místě, bez nutnosti přepínat mezi desítkami nástrojů.

### Proč tato aplikace existuje?

Moderní vývojář každý den žongluje s projekty, backlogem, pull requesty a deadliny. Klasické nástroje jako Jira nebo Notion jsou výkonné, ale těžkopádné pro osobní use case. **dev-tracker řeší tři konkrétní bolesti:**

| Problém | Řešení v dev-tracker |
|---|---|
| Context switching mezi projekty | Centralizovaný dashboard se všemi projekty |
| Ztráta přehledu o čase stráveném vývojem | Integrovaný session timer s historií |
| Rozptýlené úkoly bez prioritizace | Dedikovaný To-Do modul se statusy a prioritami |
| Nulová vizibilita do vlastní produktivity | Analytics s týdenním grafem aktivity |

### Cílová skupina

Primárně určeno pro **individuální vývojáře** nebo **studenty**, kteří potřebují lehký, lokálně běžící nástroj bez cloudové závislosti.

---

## 2. Instalace a Setup

### Prerekvizity

Před spuštěním se ujistěte, že máte nainstalováno:

| Nástroj | Minimální verze | Účel |
|---|---|---|
| **Node.js** | 18.x LTS nebo vyšší | Runtime prostředí |
| **npm** | 9.x nebo vyšší | Správa závislostí |
| **Git** | libovolná | Klonování repozitáře |


### Instalace krok za krokem

**1. Klonujte repozitář:**

```bash
git clone https://gitlab.fel.cvut.cz/cesarjak/devtracker-web-application.git
cd devtracker-web-application
```

**2. Nainstalujte závislosti:**

```bash
npm install
```

**3. Spusťte vývojový server:**

```bash
npm run dev
```

Aplikace bude dostupná na `http://localhost:5173` (výchozí port Vite).

### Dostupné npm skripty

| Skript | Příkaz | Popis |
|---|---|---|
| Development | `npm run dev` | Spustí Vite dev server s HMR |
| Production build | `npm run build` | Zkompiluje aplikaci do `/dist` |
| Preview buildu | `npm run preview` | Lokálně zobrazí production build |
| Linting | `npm run lint` | Spustí ESLint kontrolu kódu |

### Klíčové závislosti

```json
{
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "react-markdown": "^10.1.0",
  "recharts": "^3.8.1"
}
```

> **Upozornění:** Aplikace nevyužívá `react-router-dom` — routing je implementován **vlastní třídou `Router`** (viz sekce [4.3](#43-custom-router)). Neinstalujte `react-router-dom`, mohlo by dojít ke konfliktům.

---

## 3. Průvodce moduly

Aplikace se skládá ze čtyř hlavních obrazovek, přístupných přes boční navigační panel (desktop) nebo horní lištu (mobil).

### 3.1 Projects (Dashboard)

**Cesta:** `/`  
**Soubor:** `src/pages/Projects.jsx`  
**Hook:** `useProject`

Hlavní přehledová obrazovka zobrazuje všechny vaše projekty jako karty (`ProjectCard`). Každý projekt je reprezentován v `localStorage` jako objekt s těmito atributy:

| Atribut | Typ | Popis |
|---|---|---|
| `id` | `number` | Automaticky generované unikátní ID (max existujícího + 1) |
| `title` | `string` | Název projektu |
| `description` | `string` | Krátký popis (max 100 znaků) |
| `wiki` | `string` | Detailní dokumentace v Markdown formátu |
| `date` | `Date` | Datum vytvoření |
| `lastEdited` | `Date` | Datum poslední úpravy |
| `sessionTime` | `number` | Délka poslední session (v sekundách) |
| `totalTime` | `number` | Celkový nasbíraný čas napříč všemi sessions (v sekundách) |
| `sessions` | `Array<{date, time}>` | Historie všech pracovních sessions |

**Jak vytvořit projekt:**

1. Klikněte na tlačítko **Create** (ikona `+`) v pravém horním rohu.
2. Vyplňte formulář v modálním okně (`ProjectForm`) — název je povinný.
3. Potvrďte. Projekt se okamžitě uloží do `localStorage`.

**Jak smazat projekt:**

Na každé projektové kartě (`ProjectCard`) je k dispozici tlačítko s ikonou koše. Smazání je **nevratné** — projekt včetně celé historie sessions bude odstraněn.

---

### 3.2 Project Detail & Timer

**Cesta:** `/projects/:name`  
**Soubor:** `src/pages/ProjectDetail.jsx`  
**Hook:** `useProjectDetail`, `useSessionTimer` (z `SessionTimerContext`)

Po kliknutí na projektovou kartu se otevře detail projektu. Tato obrazovka je nejbohatší na funkcionalitu.

#### Sekce Description

Krátký textový popis projektu. V režimu editace (tlačítko **Edit Project**) je k dispozici jednořádkový input s **limitem 100 znaků**, který zobrazuje čítač `X/100`. Překročení limitu je vizuálně signalizováno třídou `.limit`.

#### Sekce Wiki

Rozšířená dokumentace projektu. Podporuje plný **Markdown syntax** (nadpisy, seznamy, kódové bloky, tučné písmo atd.) díky komponentě `react-markdown`. V režimu čtení je wiki renderována jako HTML, v režimu editace je k dispozici `<textarea>` pro přímou úpravu.

#### ProjectTimer

Nejdůležitější část Project Detailu. Timer zobrazuje:

- **Session:** Čas aktuálně běžící session (formát `HH:MM:SS`)
- **Total:** Celkový nasbíraný čas projektu napříč všemi sessions

```
[ Session: 00:12:34 ]  [ Total: 02:45:10 ]
[ Start Session ]  →  po spuštění →  [ Stop Session ]
```

**Workflow timerů:**

1. Stiskněte **Start Session** — timer se spustí a čas začne narůstat.
2. Navigujte na jiné stránky (To-Do, Analytics) — **timer stále běží na pozadí** díky `SessionTimerContext`.
3. Vraťte se zpět do Project Detailu a stiskněte **Stop Session**.
4. Naměřený čas je automaticky přičten k `totalTime` projektu a uložen jako nová položka v poli `sessions`.

---

### 3.3 To-Do

**Cesta:** `/to-do`  
**Soubor:** `src/pages/Todo.jsx`  
**Hook:** `useTasks`

Jednoduchý task manager pro správu denních vývojářských úkolů. Každý úkol má tyto atributy:

| Atribut | Typ | Možné hodnoty |
|---|---|---|
| `id` | `number` | Automaticky generované |
| `title` | `string` | Libovolný text |
| `status` | `string` | `"Todo"` nebo `"Done"` |
| `priority` | `string` | Definováno ve `TaskForm` |

**Statistiky (StatsCard):**

V horní části stránky jsou zobrazeny dvě agregované metriky vypočítané přímo v hooku `useTasks`:

- **COMPLETED:** Počet dokončených úkolů ve formátu `X/Y` (hotové/celkem)
- **DONE:** Procentuální vyjádření dokončení, výpočet: `Math.round((done / total) * 100)`

**Akce nad úkoly:**

| Akce | Popis |
|---|---|
| Zaškrtnutí checkboxu | Přepíná status mezi `"Todo"` a `"Done"` (volání `toggleDone`) |
| Ikona koše | Smaže úkol (`deleteTask`) |
| Tlačítko Create | Otevře modál s formulářem (`TaskForm`) |

---

### 3.4 Analytics

**Cesta:** `/analytics`  
**Soubor:** `src/pages/Analytics.jsx`  
**Hook:** `useAnalytics(projects)`

Přehledová obrazovka pro vizualizaci vývojářské aktivity v aktuálním týdnu.

#### Týdenní graf (BarChart)

Sloupcový graf vykreslený pomocí **Recharts** zobrazuje denní aktivitu od pondělí do neděle aktuálního týdne. Hook `useAnalytics` provádí tuto logiku:

1. Vypočítá datum pondělí aktuálního týdne.
2. Pro každý den (Po–Ne) vytvoří entry s inicializovanými `seconds: 0`.
3. Projde všechny sessions všech projektů a podle `session.date` přiřadí sekundy k odpovídajícímu dni.
4. Vrátí `weeklyData` jako pole pro komponentu `BarChart`.

#### Statistické karty

| Karta | Hodnota | Zdroj |
|---|---|---|
| **Total Time** | Celkový čas ve formátu `H:MM:SS` | Součet `p.totalTime` všech projektů |
| **Last Edited** | Název naposledy editovaného projektu | Projekt s nejvyšší hodnotou `lastEdited` |

---

## 4. Architektura dat

### 4.1 SessionTimerContext

**Soubor:** `src/context/SessionTimerContext.jsx`

`SessionTimerContext` je globální React Context, který umožňuje timerové session přežít navigaci mezi stránkami. Provider (`SessionTimerProvider`) obklopuje celou aplikaci v `App.jsx`:

```jsx
<SessionTimerProvider>
  <div className="layout">
    <Sidebar />
    <main className="content">
      <Component />
    </main>
  </div>
</SessionTimerProvider>
```

**Rozhraní kontextu (Context API):**

```js
{
  isActive: boolean,        // Je timer právě aktivní?
  time: number,             // Uplynulé sekundy od start()
  activeProjectId: number | null, // ID projektu, pro který timer běží
  start: (projectId) => void,     // Spustí timer pro daný projekt
  stop: () => number              // Zastaví timer, vrátí naměřené sekundy
}
```

**Implementační detail — proč `useRef` místo `useState` pro startovní čas:**

Timer neukládá startovní čas do state (`useState`), ale do `useRef`. To je záměr — změna `ref` nezpůsobuje re-render komponenty. Aktuální čas se počítá jako rozdíl `Date.now() - startRef.current` každou sekundu v `setInterval`. Tímto přístupem je timer odolný vůči akumulaci driftů, které by nastaly při prostém inkrementování čítače.

**Konzumace v komponentě:**

```js
import { useSessionTimer } from "../context/SessionTimerContext.jsx";

const { isActive, time, activeProjectId, start, stop } = useSessionTimer();
```

---

### 4.2 LocalStorage persistence

**Soubor:** `src/utils/localStorage.js`

Aplikace nepoužívá žádný backend. Veškerá data jsou persistována v `window.localStorage` prohlížeče přes singleton třídu `LocalStorage`:

```js
storage.setObject("projects", projectsArray); // Serializace přes JSON.stringify
storage.getObject("projects");                // Deserializace přes JSON.parse
storage.remove("projects");                   // Smazání klíče
```

**Klíče v localStorage:**

| Klíč | Typ dat | Hook, který spravuje |
|---|---|---|
| `projects` | `Array<Project>` | `useProject` |
| `tasks` | `Array<Task>` | `useTasks` |

Oba hooky (`useProject`, `useTasks`) persistují data přes `useEffect`, který se spouští vždy při změně příslušného state:

```js
useEffect(() => {
  storage.setObject("projects", projects);
}, [projects]);
```

> **Upozornění:** Smazání dat z prohlížeče (vymazání localStorage, private mode) způsobí **trvalou ztrátu všech projektů a úkolů**. Aplikace v aktuální verzi nenabízí export ani zálohu dat.

---

### 4.3 Custom Router

**Soubor:** `src/router/router.js`, `src/router/routes.js`

Aplikace implementuje vlastní client-side router bez závislosti na `react-router-dom`. Třída `Router` pracuje s `window.history.pushState` a `popstate` eventem.

**Definice routes** (`src/router/routes.js`):

```js
export const routes = [
  { path: "/",              component: Projects,      label: "Projects",  nav: true  },
  { path: "/to-do",         component: Todo,          label: "To-Do",     nav: true  },
  { path: "/analytics",     component: Analytics,     label: "Analytics", nav: true  },
  { path: "/projects/:name", component: ProjectDetail, nav: false },
];
```

Routes s `nav: true` jsou automaticky zobrazovány v `Sidebar` a `MobileNavBar`. Router podporuje **parametrizované cesty** (`:name`), které extrahuje pomocí regulárního výrazu a zpřístupní přes `router.getParams()`.

**Navigace v kódu:**

```js
import router from "../router/index.js";
router.navigate("/to-do");
```

---

## 5. Standardy vývoje

### Komentáře a JSDoc

Pro dokumentaci komponent a hooků používejte JSDoc anotace. Každá exportovaná funkce nebo komponenta by měla mít popis parametrů:

```js
/**
 * Hook pro správu projektů. Persistuje data do localStorage.
 * @returns {{ projects: Project[], addProject: Function, deleteProject: Function, updateProject: Function, getProjectById: Function, addSession: Function }}
 */
export const useProject = () => { ... };
```

```jsx
/**
 * Zobrazí timer pro pracovní session projektu.
 * @param {boolean} isActive - Je session právě aktivní?
 * @param {number} time - Uplynulé sekundy aktuální session.
 * @param {number} totalTime - Celkový nasbíraný čas projektu v sekundách.
 * @param {Function} start - Callback pro spuštění session.
 * @param {Function} stop - Callback pro zastavení session.
 */
const ProjectTimer = ({ isActive, time, totalTime, start, stop }) => { ... };
```

### Přidávání nových stránek (Routes)

1. Vytvořte novou komponentu v `src/pages/NovýModul.jsx`.
2. Přidejte route do `src/router/routes.js`:
   ```js
   { path: "/novy-modul", component: NovýModul, label: "Nový Modul", icon: ICONS.VÁMI_ZVOLENÁ_IKONA, nav: true }
   ```
3. Přidejte odpovídající SVG ikonu do `src/assets/icons/` a exportujte ji v `src/constants/icons.js`.

### Přidávání nových ikon

Ikony jsou SVG soubory spravované centrálně přes konstantu `ICONS`:

```js
// src/constants/icons.js
import NováIkona from '../assets/icons/NováIkona.svg';

export const ICONS = {
  // ...stávající ikony...
  NOVÁ_IKONA: NováIkona,
};
```

### Konvence pojmenování

| Typ souboru | Konvence | Příklad |
|---|---|---|
| React komponenta | PascalCase | `ProjectCard.jsx` |
| Hook | camelCase s prefixem `use` | `useProject.js` |
| Utility | camelCase | `formatDate.js` |
| SCSS partial | kebab-case s podtržítkem | `_project-card.scss` |
| Konstanta | SCREAMING_SNAKE_CASE | `ICONS.DASHBOARD` |

### Struktura SCSS

Styly jsou organizovány dle SCSS architektury do těchto složek:

```
src/styles/
├── abstracts/     # Proměnné, reset
├── base/          # globální styly
├── components/    # Styly pro jednotlivé komponenty
├── forms/         # Styly pro formuláře
├── layouts/       # Layout struktury (sidebar, content)
├── pages/         # Page-specific styly
└── main.scss      # Entry point, importuje vše výše
```