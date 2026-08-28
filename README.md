# Posso?

A mobile-first food companion for pregnant women in Portugal.

> **"Posso comer isto?"** · **"O que posso comer hoje?"**

Posso? helps users understand whether a food is appropriate during pregnancy, discover
and create recipes, plan meals, and build shopping lists — adapted to Portuguese eating
habits and products.

## Core principles

- **Portugal first** (`pt-PT`), architected for future internationalisation.
- **Deterministic food safety** — a reviewed, source-cited rules engine. **Never guesses.**
- **No generative AI** in the core product. Safety and recommendations are explainable and testable.
- **Privacy by design** — pregnancy data is treated as sensitive.

## Architecture

Monorepo with a pure, framework-free domain layer and an offline-first on-device catalogue.

```
posso/
├── apps/mobile/          Expo + Expo Router (React Native, TypeScript)
├── packages/
│   ├── domain/           Pure TS: food-safety engine, recommender, nutrition, pregnancy math
│   ├── types/            Shared entities + DTOs
│   ├── validation/       Zod schemas
│   └── content/          Reviewed catalogue seed (food-safety rules + sources)
├── functions/            Cloud Functions (later phases)
└── firestore/            Rules, indexes, tests
```

- **Catalogue** (foods, safety rules, recipes) syncs from Firestore into an on-device
  **SQLite (FTS5)** replica → fast, offline, cheap food checks.
- **User data** (profile, favourites, plans, lists) stays live in Firestore.
- Firebase projects: `posso-dev` and `posso-prod` (never mixed).

## Stack

React Native · Expo · Expo Router · TypeScript · Zustand (UI state) · TanStack Query
(server state) · Zod · React Native Firebase (Auth, Firestore, Storage, Analytics,
Crashlytics) · expo-sqlite + Drizzle.

## Status

Bootstrapping — Phase 0 (foundation). See the project board for the backlog.

---

Do not fabricate medical, nutritional, or food-safety information. All safety content is
human-reviewed and source-cited.
