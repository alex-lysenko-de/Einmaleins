# 🧮 Einmaleins – Interaktives Mathe-Lernspiel

Ein spielerisches Lernprogramm für Grundschulkinder zum Üben des kleinen Einmaleins (2 × 2 bis 9 × 9).

🌐 **[Jetzt spielen → alex-lysenko-de.github.io/einmaleins](https://alex-lysenko-de.github.io/einmaleins/#/)**

---

## 🎮 Spielmodi

### 🃏 Finde das Paar
Wähle selbst: Aufgabe und Antwort
Beantworte Multiplikationsaufgaben richtig, um einem Monster Schaden zuzufügen – bevor es dich besiegt! Für jede Einmaleins-Reihe (2–9) wartet ein anderes Monster, darunter Alien Grumpy, Zombie Karl, Drachen Zola und weitere.


### 👾 Rückwärts
Sieh die Antwort – finde die Aufgabe! (Reverse)

### ⚡ Quiz 
Kannst du es ohne Hilfe?
Beantworte alle Aufgaben einer Reihe so schnell wie möglich hintereinander und sieh, wie gut du abschneidest.

---

## ✨ Features

- 🎯 Alle Einmaleins-Reihen von **2 bis 9**
- 🖼️ Visuelle Hilfen: Äpfel-Animationen und Reihen-/Spalten-Darstellung zum Verstehen der Multiplikation
- 🎵 Soundeffekte und Audiobegleitung
- 🎉 Konfetti-Animationen bei Erfolg
- 📱 Responsive Design – funktioniert auf Desktop und Mobilgeräten
- 🔀 Hash-basiertes Routing (keine Serverkonfiguration nötig)
- 📲 **Progressive Web App (PWA)** – installierbar auf dem Startbildschirm (iOS & Android)
- 🌍 **Sprache: Deutsch** – die gesamte Benutzeroberfläche ist auf Deutsch
- ✈️ **Offline-fähig** – das Spiel funktioniert vollständig ohne Internetverbindung
- 🔄 **Automatische Updates** – beim Start mit Internetverbindung aktualisiert sich die App selbstständig

---

## 🛠️ Technologien

- **[Vue 3](https://vuejs.org/)** – Composition API, `<script setup>`
- **[Vue Router](https://router.vuejs.org/)** – Hash History für GitHub Pages
- **[Vite](https://vitejs.dev/)** – Build-Tool und Dev-Server
- **[vite-plugin-pwa](https://vite-pwa-org.netlify.app/)** – Service Worker, Offline-Cache und automatische Updates
- **[Tailwind CSS](https://tailwindcss.com/)** – Utility-first CSS-Framework

---

## 🚀 Lokale Entwicklung

```bash
# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev

# Produktions-Build erstellen
npm run build
```

---

## 📁 Projektstruktur

```
src/
├── game/
│   ├── audio/        # Audio-Engine
│   ├── data/         # Level- und Monster-Definitionen
│   ├── engine/       # Spiellogik (GameEngine)
│   ├── mechanics/    # Karten, Aufgaben, Kampf, Buckets
│   ├── modes/        # Memory-Modus
│   └── state/        # Reaktiver Spielzustand
├── ui/
│   ├── components/   # Spielkomponenten (Karten, Fortschritt, Monster, …)
│   ├── menu/         # Spielauswahl und Level-Picker
│   └── screens/      # Vollbild-Ansichten (Menü, Spiel, Sieg, …)
├── composables/      # Vue Composables (useGame, useMemory, useExam, …)
└── router/           # Vue Router Konfiguration
```

---

## 🚢 Deployment (GitHub Pages)

Die App wird automatisch bei jedem Push auf den `main`-Branch gebaut und auf GitHub Pages veröffentlicht.

**Ablauf (`.github/workflows/deploy.yml`):**
1. GitHub Actions führt `npm install && npm run build` aus
2. Das `dist/`-Verzeichnis wird über `peaceiris/actions-gh-pages` in den Branch `gh-pages` deployed
3. GitHub Pages liefert den Inhalt von `gh-pages` unter `https://alex-lysenko-de.github.io/einmaleins/`

**Wichtige Hinweise zum PWA-Setup:**

- `public/manifest.json` — wird manuell gepflegt und unverändert nach `dist/` kopiert
- `src/sw.js` — Quell-Service-Worker; wird von `vite-plugin-pwa` (Strategie `injectManifest`) beim Build verarbeitet und als `dist/sw.js` ausgegeben. **Darf nicht in `public/` liegen**, da sonst das Plugin die Asset-Manifest-Injection (`self.__WB_MANIFEST`) nicht vornimmt und alle gehashten Vite-Assets nicht vorgecacht werden.
- `src/registerSW.js` — registriert den SW manuell und löst automatisch einen Seiten-Reload aus, wenn eine neue SW-Version aktiviert wird (`controllerchange`-Event)

---

## 📄 Lizenz

MIT