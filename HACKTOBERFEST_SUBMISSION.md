---
title: "Cogniva — AI-Powered Adaptive Learning Workspace Built for a Friend"
published: false
description: "A Hacktoberfest 2026 Weekend Challenge submission: Cogniva is an open-source intelligent study companion featuring Pomodoro focus timers, SM-2 spaced-repetition flashcards, adaptive quizzes, learning analytics, gamification, and an AI study co-pilot — built for a friend preparing for CS university exams."
tags: hacktoberfest, react, typescript, ai
cover_image: ""
---

*This is a submission for the [Hacktoberfest Weekend Challenge: Build for a Friend](https://dev.to/challenges/hacktoberfest-weekend-2026-10-01)*

---

## What I Built

**Cogniva** is a full-featured, offline-first **Intelligent Learning Workspace** — a PWA built with React, TypeScript, and Tailwind CSS.

I built it for my friend who is preparing for CS university exams (Data Structures, DBMS, Operating Systems, Computer Networks). They were juggling five different apps — a timer, Anki, a notes app, YouTube, and a spreadsheet to track progress — and still feeling overwhelmed. Cogniva replaces all of them with a single cohesive workspace.

live deployed link: https://lakshchinchmalatpure.github.io/HacktroberFest_dev_challenge/

### Core Features

| Feature | Description |
|---|---|
| 🎯 **Pomodoro Focus Timer** | Circular visual countdown, session tagging, audio feedback cues, and automatic XP rewards |
| 🃏 **SM-2 Flashcards** | Spaced-repetition cards with 4-state mastery tracking (`new → learning → review → mastered`) using the SuperMemo-2 algorithm |
| 📝 **Adaptive Quizzes** | Multi-format assessments (Multiple Choice, True/False, Multi-Answer) generated per subject and topic |
| 📊 **Learning Analytics** | Weekly study time distribution, quiz accuracy trendlines, and a 30-day activity heatmap built with Recharts |
| 🤖 **Cogniva AI Co-Pilot** | An AI study assistant that explains concepts (e.g., deadlocks), diagnoses quiz mistakes, generates personalized 7-day study plans, and triggers quiz/flashcard creation with one click |
| 🏆 **Gamification** | XP, levels, streaks, streak-risk alerts, and achievement badges to keep motivation high |
| 📅 **Study Planner** | Calendar-style weekly schedule with task management |
| 🌙 **Dark / Light Mode** | Full theme support with a smooth toggle |
| 📶 **Offline-First PWA** | Service Worker registration + Web App Manifest for installable offline use |

The demo workspace is pre-seeded with a user profile ("Alex Morgan") enrolled in 5 subjects, realistic flashcard libraries, and preset quiz question banks — so anyone can click "Try Demo" and immediately experience the full product.

---

## Demo

> 🚀 **Live App:** [http://localhost:5173](http://localhost:5173) *(local dev — see repo to run)*

To run locally:

```bash
git clone https://github.com/LakshChinchmalatpure/HacktroberFest_dev_challenge
cd cogniva
npm install
npm run dev
```

Then open `http://localhost:5173` and click **"Try Demo"** to enter the full workspace as Alex Morgan.

**Key screens to explore:**
- `/app` — Dashboard with KPI stats, streak alerts, activity heatmap, and AI Co-Pilot button
- `/app/focus` — Pomodoro timer with session tagging
- `/app/flashcards` — SM-2 review queue and card generator
- `/app/quizzes` — Adaptive quiz engine with explanations and accuracy tracking
- `/app/analytics` — Charts: weekly study hours, accuracy trends, subject breakdown
- `/app/achievements` — XP, levels, and badge wall

---

## Code

```
📦 cogniva/
├── src/
│   ├── components/
│   │   ├── ai/              # AIChatDrawer — contextual AI study assistant
│   │   ├── dashboard/       # StatCard, ActivityHeatmap, AdaptiveInsightCard, QuickActions
│   │   ├── flashcards/      # FlashcardReview, CardGenerator, MasteryBadge
│   │   ├── gamification/    # XP bar, LevelBadge, AchievementsGrid
│   │   ├── landing/         # Hero, FeatureGrid, ProductPreview
│   │   ├── planner/         # Weekly calendar task manager
│   │   ├── pomodoro/        # PomodoroTimer (SVG circular progress + audio)
│   │   └── quiz/            # QuizRunner, OptionCard, ResultsSummary
│   ├── services/
│   │   ├── aiService.ts     # AI Co-Pilot logic: chat, flashcard gen, quiz gen
│   │   └── spacedRepetition.ts  # SM-2 algorithm implementation
│   ├── store/
│   │   └── useAppStore.ts   # Zustand global state (user, subjects, cards, sessions)
│   ├── lib/
│   │   ├── pwa.ts           # Service Worker registration
│   │   ├── sound.ts         # Web Audio API sound effects (timer bells, completion)
│   │   └── utils.ts         # XP/level calculations, time formatters
│   ├── pages/               # DashboardPage, FocusPage, FlashcardsPage, QuizzesPage,
│   │                        #   AnalyticsPage, PlannerPage, AchievementsPage, SettingsPage
│   └── data/
│       ├── presetFlashcards.ts  # Seeded CS flashcard library
│       └── presetQuestions.ts   # Seeded quiz question bank
├── public/
│   ├── manifest.json        # PWA Web App Manifest
│   └── sw.js                # Service Worker for offline-first caching
└── index.html               # Meta, OG tags, Google Fonts (Inter + Outfit), PWA links
```

---

## How I Built It

### Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 19 + TypeScript 6 |
| **Build Tool** | Vite 8 |
| **Styling** | Tailwind CSS 3 + custom design tokens |
| **State Management** | Zustand 5 — single store for user profile, subjects, flashcards, sessions |
| **Animations** | Framer Motion 14 — page transitions, card flips, drawer slides |
| **Charts** | Recharts 3 — Area charts, Bar charts, Radar charts for analytics |
| **Routing** | React Router DOM 7 |
| **Sound** | Web Audio API (oscillators + gain nodes) via `sound.ts` — no external lib |
| **PWA** | Service Worker + Web App Manifest for offline-first installability |
| **Linting** | Oxlint |

### Open-Source AI Integration

The **AI Co-Pilot** (`src/services/aiService.ts`) is architected around an **open, swappable AI backend**. The service is model-agnostic by design:

1. **Prompt-classified intent engine** — The assistant parses user messages and routes them to specialized response generators (concept explanation, quiz generation, mistake diagnosis, study plan creation).

2. **SM-2 Spaced Repetition** (`src/services/spacedRepetition.ts`) — A clean open-source implementation of the [SuperMemo-2 algorithm](https://www.supermemo.com/en/blog/application-of-a-computer-to-improve-the-results-obtained-in-working-with-the-supermemo-method). This is the same algorithm powering Anki — implemented from scratch with 4-state mastery progression.

3. **Adaptive Recommendation Engine** (`AdaptiveInsightCard`) — Identifies weak topics by correlating quiz attempt history with incorrect answer patterns. This powers the "one-click remedial session" feature.

4. **Resilient Fallback Architecture** — The AI service first checks a curated preset knowledge base (seeded flashcards and quiz questions for CS subjects). If no preset matches, a dynamic template generator produces subject-aware, difficulty-scaled content. This means the app works *completely offline* without any API key.

The architecture is designed so that replacing the fallback generator with a real open-weight LLM (e.g., **Gemma 3**, **Mistral 7B**, or **LLaMA 3** via Ollama) requires only changing one method in `aiService.ts` — the interface contract stays identical.

---

## Why Does Open Innovation Matter?

For my friend, closed AI APIs were a non-starter for two reasons: **cost** and **privacy**. Study notes and quiz mistakes are personal data — they should not be logged by a SaaS provider.

Open innovation made three things possible that closed APIs would not have allowed:

1. **Privacy-first design.** All intelligence runs locally. The SM-2 algorithm, the adaptive topic detection, the study plan generation — none of it phones home. Every recommendation is computed client-side from the user's own data. A closed API would require shipping flashcard content and quiz results to a remote server.

2. **Offline-first by default.** Because the AI layer uses open algorithms (SM-2, template-based generation), the app works fully offline. A closed LLM API dependency would break the entire learning loop whenever there is no internet — exactly when my friend is on a train or in an exam prep room with spotty connectivity.

3. **Extensibility without lock-in.** The `aiService.ts` interface makes it trivial to plug in **Gemma via Ollama**, **Mistral via LM Studio**, or any other open-weight model running locally. The community can swap in any model and the rest of the app continues working. That composability is only possible when the AI layer is open.

Open source is what allowed Cogniva to be a *real* tool for a real person, not a demo that requires an API key and a credit card.

---

## My Agent Session

This entire platform was engineered iteratively using **Antigravity IDE** (powered by Google DeepMind). The agent assisted with architecture planning, SM-2 spaced repetition algorithmic implementation, component tree generation, dark-mode glassmorphic UI design, analytics charts, and PWA integration.

{% agent_session cogniva-building-the-ai-powered-adaptive-learning-workspace-jpz068 %}

> 🔗 **Interactive Session Transcript:** [View Agent Session on DEV](https://dev.to/agent_sessions/cogniva-building-the-ai-powered-adaptive-learning-workspace-jpz068)

---

## Prize Categories

- 🏆 **Hacktoberfest Best Overall** — Full-stack open-source learning platform with AI integration
- 🤖 **Best Use of Open-Source AI** — SM-2 spaced repetition + open-weight LLM-ready architecture
- 🎨 **Best Design / UX** — Dark-mode glassmorphism, Framer Motion animations, Recharts analytics
- 📱 **Best PWA** — Offline-first Service Worker, Web App Manifest, installable on mobile

---

> Built with ❤️ during Hacktoberfest 2026 Weekend Challenge.
> *Cogniva — Focus deeper. Learn smarter. Improve continuously.*
