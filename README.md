# 🧮 Einmaleins – Interaktives Mathe-Lernspiel

Ein spielerisches Lernprogramm für Grundschulkinder zum Üben des kleinen Einmaleins (2 × 2 bis 9 × 9).

🌐 **[Jetzt spielen → alex-lysenko-de.github.io/einmaleins](https://alex-lysenko-de.github.io/einmaleins/#/)**

---

## 🎮 Spielmodi

### 👾 Kampf gegen Monster
Beantworte Multiplikationsaufgaben richtig, um einem Monster Schaden zuzufügen – bevor es dich besiegt! Für jede Einmaleins-Reihe (2–9) wartet ein anderes Monster, darunter Alien Grumpy, Zombie Karl, Drachen Zola und weitere.

### 🃏 Memory-Spiel
Finde passende Kartenpaare (Aufgabe + Ergebnis) und trainiere dabei gleichzeitig dein Gedächtnis und die Rechenfertigkeiten.

### ⚡ Schnelltest
Beantworte alle Aufgaben einer Reihe so schnell wie möglich hintereinander und sieh, wie gut du abschneidest.

---

## ✨ Features

- 🎯 Alle Einmaleins-Reihen von **2 bis 9**
- 🖼️ Visuelle Hilfen: Äpfel-Animationen und Reihen-/Spalten-Darstellung zum Verstehen der Multiplikation
- 🎵 Soundeffekte und Audiobegleitung
- 🎉 Konfetti-Animationen bei Erfolg
- 📱 Responsive Design – funktioniert auf Desktop und Mobilgeräten
- 🔀 Hash-basiertes Routing (keine Serverkonfiguration nötig)

---

## 🛠️ Technologien

- **[Vue 3](https://vuejs.org/)** – Composition API, `<script setup>`
- **[Vue Router](https://router.vuejs.org/)** – Hash History für GitHub Pages
- **[Vite](https://vitejs.dev/)** – Build-Tool und Dev-Server

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

## 📄 Lizenz

MIT