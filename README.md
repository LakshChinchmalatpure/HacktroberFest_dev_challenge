<div align="center">

<img src="public/logo.svg" alt="Cogniva Logo" width="72" height="72" />

# Cogniva

### Your Intelligent Learning Workspace

**Focus deeper · Learn smarter · Improve continuously**

[![Hacktoberfest 2026](https://img.shields.io/badge/Hacktoberfest-2026-orange?style=for-the-badge&logo=dev.to)](https://dev.to/challenges/hacktoberfest-weekend-2026-10-01)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![PWA](https://img.shields.io/badge/PWA-Offline--First-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)

[Live Demo](#getting-started) · [Features](#features) · [Tech Stack](#tech-stack) · [Contributing](#contributing)

</div>

---

## Overview

Cogniva is a full-featured, **offline-first Progressive Web App** that consolidates every tool a CS student needs into a single, cohesive workspace. It replaces the chaos of juggling five separate apps — a timer, Anki, a notes tool, YouTube, and a tracking spreadsheet — with one intelligent, adaptive platform.

Built for Hacktoberfest 2026 as a gift for a friend preparing for CS university exams across five subjects: **Data Structures, DBMS, Operating Systems, Computer Networks, and Discrete Mathematics**.

---

> 🚀 **Live Demo:** [https://lakshchinchmalatpure.github.io/HacktroberFest_dev_challenge/](https://lakshchinchmalatpure.github.io/HacktroberFest_dev_challenge/)  
> 🤖 **Interactive Agent Session:** [View Full Transcript on DEV](https://dev.to/agent_sessions/cogniva-building-the-ai-powered-adaptive-learning-workspace-jpz068)

---

## Features

| Module | Capability |
|--------|-----------|
| 🎯 **Pomodoro Focus** | Circular SVG countdown timer, session tagging by subject, Web Audio API feedback cues, and automatic XP rewards on completion |
| 🃏 **SM-2 Flashcards** | Spaced-repetition deck with 4-state mastery progression (`new → learning → review → mastered`) powered by the SuperMemo-2 algorithm |
| 📝 **Adaptive Quizzes** | Multi-format assessments — Multiple Choice, True/False, Multi-Answer — generated per subject and topic with per-question explanations |
| 📊 **Learning Analytics** | Weekly study-time distribution, quiz accuracy trendlines, subject breakdown radar charts, and a 30-day activity heatmap |
| 🤖 **AI Co-Pilot** | Conversational study assistant: explains concepts (e.g., Coffman Conditions), diagnoses quiz mistakes, generates personalized 7-day study plans, and triggers quiz/card creation in one click |
| 🏆 **Gamification** | XP economy, level system, streak tracking, streak-risk alerts, and a badge wall to sustain long-term motivation |
| 📅 **Study Planner** | Calendar-style weekly schedule with subject-tagged task management |
| 🌙 **Dark / Light Mode** | System-aware theme with smooth toggle and full dark-mode support throughout |
| 📶 **Offline-First PWA** | Service Worker caching + Web App Manifest — installable on desktop and mobile, works without internet |

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **UI Framework** | React 19 | Component rendering with concurrent features |
| **Language** | TypeScript 6 | End-to-end type safety |
| **Build Tool** | Vite 8 | Sub-second HMR, optimised production bundles |
| **Styling** | Tailwind CSS 3 | Utility-first with custom design token layer |
| **State** | Zustand 5 | Lightweight global store (user, subjects, flashcards, sessions) |
| **Animations** | Framer Motion 14 | Page transitions, card flips, drawer slides |
| **Charts** | Recharts 3 | Area, Bar, Radar, and heatmap visualisations |
| **Routing** | React Router DOM 7 | Nested layout routing |
| **Sound** | Web Audio API | Oscillator-based timer bells — zero external dependencies |
| **PWA** | Service Worker + Manifest | Offline caching, installability |
| **Linting** | Oxlint | Fast Rust-based linter |

---

## Architecture

```
src/
├── components/
│   ├── ai/                  # AIChatDrawer — AI co-pilot UI
│   ├── dashboard/           # StatCard, ActivityHeatmap, AdaptiveInsightCard
│   ├── flashcards/          # Review queue, card generator, mastery badge
│   ├── gamification/        # XP bar, level badge, achievements grid
│   ├── landing/             # Hero, FeatureGrid, ProductPreview
│   ├── planner/             # Weekly calendar task manager
│   ├── pomodoro/            # Circular timer (SVG) + audio
│   └── quiz/                # Quiz runner, option cards, results summary
├── services/
│   ├── aiService.ts         # Model-agnostic AI layer: chat, card gen, quiz gen
│   └── spacedRepetition.ts  # SM-2 algorithm implementation
├── store/
│   └── useAppStore.ts       # Zustand store — single source of truth
├── lib/
│   ├── pwa.ts               # Service Worker registration
│   ├── sound.ts             # Web Audio API sound engine
│   └── utils.ts             # XP/level calculations, time formatters
├── pages/                   # Route-level page components
└── data/
    ├── presetFlashcards.ts  # Seeded CS flashcard knowledge base
    └── presetQuestions.ts   # Seeded quiz question bank
```

### AI Service Design

The `aiService.ts` module is intentionally **model-agnostic**. It implements:

- **Intent routing** — classifies user messages into concept explanation, quiz generation, mistake diagnosis, or study-plan generation
- **SM-2 engine** — open-source SuperMemo-2 implementation with 4-state mastery
- **Adaptive recommendation** — correlates quiz errors with weak topics for targeted remedial sessions
- **Resilient fallback** — curated preset knowledge base → dynamic template generator → (pluggable) open-weight LLM

Swapping in a local LLM (Gemma 3, Mistral 7B, LLaMA 3 via Ollama) requires only changing the inference call inside `aiService.ts`. The rest of the application is completely unchanged.

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/LakshChinchmalatpure/HacktroberFest_dev_challenge
cd HacktroberFest_dev_challenge

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and click **"Try Demo"** to enter the full workspace pre-seeded with a student profile, 5 subjects, a flashcard library, and a quiz question bank.

### Other Commands

```bash
npm run build      # Production build (TypeScript check + Vite bundle)
npm run preview    # Preview the production build locally
npm run lint       # Run Oxlint
```

---

## Screens

| Route | Description |
|-------|-------------|
| `/` | Landing page with feature overview |
| `/app` | Dashboard — KPI stats, streak alert, activity heatmap |
| `/app/focus` | Pomodoro timer with session tagging |
| `/app/flashcards` | SM-2 review queue and card generator |
| `/app/quizzes` | Adaptive quiz engine with accuracy tracking |
| `/app/analytics` | Study analytics charts and heatmap |
| `/app/planner` | Weekly study schedule |
| `/app/achievements` | XP, level, and badge wall |
| `/app/settings` | Theme, preferences, AI provider config |

---

## Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## License

Distributed under the **MIT License**. See `LICENSE` for details.

---

<div align="center">

Built with ❤️ for **Hacktoberfest 2026**

*Cogniva — Focus deeper. Learn smarter. Improve continuously.*

</div>
