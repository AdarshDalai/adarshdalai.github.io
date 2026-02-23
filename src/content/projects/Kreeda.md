---
title: "Kreeda"
subtitle: "Kreeda is a digital scorekeeping and sports platform"
image: "project-one.jpg"
techStack: ["React", "TypeScript", "Node.js"]
githubUrl: "https://github.com/AdarshDalai/Kreeda-Web"
liveUrl: "https://project-one.vercel.app"
featured: true
order: 1
---

# 🏏 Kreeda

**A social platform for street sports — where every gully match gets a digital scoreboard.**

Kreeda lets players create teams, schedule matches, track live scores ball-by-ball, run tournaments, and build their sports profiles. Starting with cricket and football, it's built for the way real people actually play — on streets, in parks, anywhere.

---

## 🎯 The Problem

Millions of casual and street-level sports enthusiasts play matches every day with no way to:

- **Track scores** in real time with proper scorecards
- **Build a sports profile** that showcases their playing history
- **Organize teams** with member management, invitations, and roles
- **Resolve scoring disputes** when two scorers disagree on what just happened
- **Share live matches** so friends and family can follow along remotely

Kreeda solves all of this with a purpose-built platform spanning **web**, **Android**, and **iOS**.

---

## 🏗️ Architecture Overview

Kreeda is a **full-stack, multi-platform** system with four independently developed codebases that work together:

```
┌──────────────────────────────────────────────────────────────┐
│                        CLIENTS                               │
│                                                              │
│   ┌────────────────┐  ┌────────────────┐  ┌──────────────┐  │
│   │   kreeda-web   │  │  Android App   │  │   iOS App    │  │
│   │   (Next.js)    │  │                │  │              │  │
│   │                │  │    Kreeda Multiplatform (KMP)     │  │
│   │   React 19     │  │    Jetpack Compose + SwiftUI     │  │
│   │   TypeScript   │  │    Kotlin + Ktor + Koin          │  │
│   └───────┬────────┘  └────────┬───────┘  └──────┬───────┘  │
└───────────┼────────────────────┼──────────────────┼──────────┘
            │    REST / WebSocket│                  │
┌───────────▼────────────────────▼──────────────────▼──────────┐
│                     BACKEND (FastAPI)                         │
│                                                              │
│   ┌─────────────────────────────────────────────────────┐    │
│   │  API Routers → Services → Sport Engines → Models    │    │
│   └────────────┬──────────────────────┬─────────────────┘    │
│                │                      │                      │
│   ┌────────────▼────────┐  ┌──────────▼──────────┐          │
│   │   PostgreSQL 15     │  │     Redis 7         │          │
│   │   (Primary DB)      │  │     (Pub/Sub +      │          │
│   │                     │  │      Caching)       │          │
│   └─────────────────────┘  └─────────────────────┘          │
│                                                              │
│   ┌──────────────────────────────────────┐                   │
│   │   Supabase (Auth + File Storage)     │                   │
│   └──────────────────────────────────────┘                   │
└──────────────────────────────────────────────────────────────┘
```

---

## ⚙️ Tech Stack

### Backend — `Kreeda-Backend`

| Layer | Technology |
|-------|-----------|
| Framework | **FastAPI** (async Python) |
| ORM | **SQLAlchemy 2.0** + asyncpg |
| Database | **PostgreSQL 15** |
| Cache & Pub/Sub | **Redis 7** |
| Auth | **Supabase** (wrapped in swappable abstraction) |
| Migrations | **Alembic** |
| Real-time | **WebSocket** + Redis pub/sub |
| Testing | pytest + httpx + websockets (81 integration tests) |
| Infrastructure | **Docker Compose** |

### Web Frontend — `kreeda-web`

| Layer | Technology |
|-------|-----------|
| Framework | **Next.js 16** (App Router) |
| UI | **React 19** + TypeScript 5 |
| Styling | **Tailwind CSS 4** + Material Design 3 tokens |
| Auth | JWT (access + refresh) + Google OAuth 2.0 (PKCE) |
| Data Fetching | Generic `apiClient<T>()` with auto token refresh |
| Rendering | ISR for live matches (30s revalidation) |

### Mobile — `Kreeda_Multiplatform`

| Layer | Technology |
|-------|-----------|
| Framework | **Kotlin Multiplatform** (KMP) |
| UI | **Jetpack Compose** (shared) + SwiftUI (iOS entry) |
| Architecture | **Clean Architecture + MVVM** |
| Networking | **Ktor** (multiplatform HTTP client) |
| DI | **Koin** (feature-module pattern) |
| Storage | **Room** (local DB) + DataStore (preferences) |
| Security | EncryptedSharedPreferences (Android) / Keychain (iOS) |
| Navigation | Compose Navigation with type-safe routes |

### Companion App — `Vyayam`

| Layer | Technology |
|-------|-----------|
| Framework | **Jetpack Compose** |
| Architecture | Clean Architecture + MVVM |
| DI | Dagger Hilt |
| Storage | Room + Firebase Firestore |
| Health | **Health Connect SDK** (bidirectional read + write) |
| Testing | JUnit + Mockk + Turbine |

---

## 🔥 Core Features

### 1. Dual-Scorer System with Conflict Resolution

The centerpiece of Kreeda's scoring engine. Each match has **two independent scorers**. When both submit the same event, it's auto-confirmed. When they disagree, a **conflict** is raised with a timed dispute window and community voting.

```
Scorer A submits "4 runs"  ──┐
                              ├── Match? ✅ → Auto-confirmed
Scorer B submits "4 runs"  ──┘

Scorer A submits "4 runs"  ──┐
                              ├── Mismatch? ⚠️ → Conflict raised
Scorer B submits "wide"    ──┘                 → Players vote
                                               → Resolved by majority
```

### 2. Real-Time Live Scoring

- WebSocket connections via Redis pub/sub for instant score updates
- Spectators see ball-by-ball updates in real time
- ISR-powered public live match pages on the web (30-second refresh)
- Full match state tracking: runs, wickets, extras, overs, strike rotation

### 3. Team Management

- Create teams with sport type, logo, and auto-generated join codes
- Role-based membership: Owner, Admin, Captain, Player
- Invitation system: invite by username or share a join code
- Multi-team support — players can belong to multiple teams

### 4. Complete Match Lifecycle

```
Created → Toss Recorded → Playing XI Set → Started → In Progress → Completed
                                                  ↘ Paused ↗
                                                  ↘ Abandoned
```

- Cricket: overs format, toss, batting/bowling order, extras, wicket types
- Football: goals, assists, cards, half-time management

### 5. Social & Profiles

- Player profiles with sport-specific stats (batting avg, bowling economy, goals scored)
- Follow/unfollow system with follower/following counts
- User search and public profile pages
- Block/unblock functionality

### 6. Tournaments *(planned)*

- Tournament creation with registration
- Points table generation
- Bracket/league format support

---

## 🧩 Backend Deep Dive

### API Surface — 60+ Validated Endpoints

| Module | Prefix | Endpoints |
|--------|--------|-----------|
| Auth | `/api/v1/auth/*` | 11 — signup, signin (password/OTP/OAuth), token management, password reset |
| Users | `/api/v1/users/*` | 14 — onboarding, profiles, follows, search, sport profiles, blocking |
| Teams | `/api/v1/teams/*` | 13 — CRUD, members, invitations, join-by-code |
| Matches | `/api/v1/matches/*` | 14 — lifecycle, toss, participants, settings, live listing |
| Scoring | `/api/v1/scoring/*` | 9 — events, confirm/dispute, conflicts, voting, match state |
| Live | `WS /ws/live/{id}` | 1 — real-time WebSocket stream |

### Sport Engine Pattern

The backend uses a **registry-based sport engine** pattern that makes adding new sports straightforward:

```
app/sports/
├── base.py           # Abstract sport engine interface
├── registry.py       # Sport engine registry
├── cricket/          # Cricket-specific rules, validation, state
└── football/         # Football-specific rules, validation, state
```

Each sport engine handles:
- Event validation (is this a legal delivery? valid goal?)
- State computation (current score, overs, innings)
- Match completion detection

### Data Model — 16 SQLAlchemy Models

`User` · `Team` · `TeamMember` · `Match` · `MatchParticipant` · `MatchSettings` · `ScoringEvent` · `ScoreConflict` · `CricketMatchState` · `CricketBallEvent` · `FootballMatchState` · `FootballEvent` · `Tournament` · `Venue` · `Notification` · `SportProfile`

---

## 🌐 Web Frontend Deep Dive

### 102 API Client Functions

Every backend endpoint has a typed TypeScript wrapper in `lib/api/`, powered by a single generic fetch client:

```typescript
// One function handles all API calls with automatic JWT refresh
async function apiClient<T>(endpoint, options): Promise<T>
// On 401 → refresh token → retry original request → seamless UX
```

### App Router Architecture

```
src/app/
├── (app)/              ← Authenticated routes (shared sidebar)
│   ├── dashboard/
│   ├── teams/
│   ├── matches/
│   ├── tournaments/
│   ├── profile/
│   ├── search/
│   └── notifications/
├── auth/               ← Login, signup, OAuth, OTP, onboarding
└── matches/live/       ← Public ISR page (no auth required)
```

Key decisions:
- **Route groups** `(app)/` — shared layout without affecting URLs
- **Edge middleware** — checks auth cookies before page loads (no flash of protected content)
- **React Context** — `AuthProvider` shares user state without prop drilling
- **Cookie-based sessions** — works with Edge middleware, unlike localStorage

---

## 📱 Mobile Deep Dive

### Clean Architecture Layers

```
┌─────────────────────────────────────────┐
│          PRESENTATION (Compose)         │
│   Screens → ViewModels → UiState       │
├─────────────────────────────────────────┤
│          DOMAIN (Pure Kotlin)           │
│   UseCases → Repository Interfaces     │
│   Models (no framework dependencies)   │
├─────────────────────────────────────────┤
│          DATA (Ktor, Room)              │
│   API Services → DTOs → Mappers        │
│   Repository Implementations           │
├─────────────────────────────────────────┤
│          CORE (Shared Infrastructure)   │
│   Session · Network · Storage · DI     │
│   Error Handling · Logging · Config    │
└─────────────────────────────────────────┘
```

### Feature-Module Architecture

Each feature (auth, team, match, scoring) is a self-contained module with its own:
- `data/` — DTOs, API service, mapper, repository impl
- `domain/` — models, repository interface, use cases
- `presentation/` — screens, viewmodel, UI state
- `di/` — Koin module

### Implemented Features (Mobile)

| Feature | Status | Details |
|---------|--------|---------|
| Auth |  Complete | Sign-in, sign-up, Google OAuth, OTP, onboarding |
| Home |  Complete | Dashboard with stats, quick actions, recent matches |
| Profile |  Complete | View/edit profile, sport profiles, follow system |
| Teams |  Complete | CRUD, join by code, invitations, role management |
| Match |  In Progress | Lobby, toss, playing XI |
| Scoring |  Planned | Dual-scorer, WebSocket, conflict resolution |

### Platform-Specific Implementations (`expect` / `actual`)

| Component | Android | iOS |
|-----------|---------|-----|
| Secure Storage | EncryptedSharedPreferences | Keychain |
| Logger | Android Logcat | OSLog |
| Network Monitor | ConnectivityManager | NWPathMonitor |
| App Config | BuildConfig | Bundle |

---

## 🏋️ Vyayam — Workout Tracking Companion

Vyayam is a companion app within the Kreeda ecosystem focused on fitness tracking with a unique differentiator: **bidirectional Health Connect integration**.

- **READ** heart rate, SpO2, steps from Health Connect
- **WRITE** workouts back — so they appear in Google Fit, Samsung Health, and every connected app
- 200+ exercise library with set/rep tracking
- Advanced analytics with progress visualizations
- Local-first with Firebase cloud sync

---

## 🧪 Testing & Quality

### Backend
- **81 integration tests** across 10 test files
- **13 smoke test operations** (85% pass rate)
- **60+ API endpoints validated**
- End-to-end workflows: complete cricket match with dual-scorer, team invitation flows

### Web
- TypeScript strict mode — full type-checking on build
- ESLint with Next.js recommended config

### Mobile
- `BaseViewModel` with `launchSafe` — all coroutine errors are caught and typed
- `Result<T>` wrapper — no raw exceptions leak to the UI
- `DispatcherProvider` — all coroutines testable with `TestDispatcher`

---

## 🔐 Security

| Aspect | Implementation |
|--------|---------------|
| Authentication | Supabase Auth with JWT (access + refresh tokens) |
| Token Storage | Encrypted platform keystores (Keychain / EncryptedSharedPreferences / HTTP-only cookies) |
| API Security | Bearer token auth, automatic 401 → refresh → retry |
| Network | HTTPS only, certificate pinning in production |
| Session | Edge middleware route protection (web), SessionManager (mobile) |
| Data | Sensitive data never logged; Room encryption for local storage |

---

## 🚀 How It All Works Together

1. **A player signs up** via the mobile app or web — Supabase handles auth, the backend creates their profile
2. **They create a team** — auto-generated join code, invite friends by username or share the code
3. **A match is scheduled** — pick sport, format (e.g., 10-over cricket), invite an opposing team
4. **Toss is recorded** — winner decides to bat or bowl
5. **Two scorers are assigned** — both independently submit ball-by-ball events
6. **Events are validated** — the sport engine checks legality, the dual-scorer system checks agreement
7. **Live updates stream** — WebSocket pushes every confirmed event to all connected spectators
8. **Conflicts are resolved** — disagreements trigger a vote among players
9. **Match completes** — full scorecard generated, player stats updated, profiles enriched
10. **The cycle repeats** — teams play more matches, build history, climb leaderboards

---

## 📊 Project Stats

| Metric | Value |
|--------|-------|
| Backend API Endpoints | 60+ |
| Web Frontend Routes | 15+ |
| Mobile Screens Built | 12+ |
| SQLAlchemy Models | 16 |
| TypeScript API Functions | 102 |
| Integration Tests | 81 |
| Mobile Use Cases | 30+ |
| Supported Sports | Cricket, Football |
| Platforms | Web, Android, iOS |

---

## 🛠️ Development Setup

### Backend
```bash
cp .env.example .env          # Add Supabase credentials
docker compose up --build     # PostgreSQL + Redis + FastAPI
docker compose run --rm web alembic upgrade head  # Apply migrations
```

### Web
```bash
cd kreeda-web
npm install
npm run dev                   # http://localhost:3000
```

### Mobile
```bash
cd Kreeda_Multiplatform
./gradlew :composeApp:assembleDebug   # Android
# Open iosApp/ in Xcode for iOS
```

---

## 📬 Links

| Resource | URL |
|----------|-----|
| Backend Repo | [github.com/AdarshKumarDalai/kreeda-backend](https://github.com/AdarshKumarDalai/kreeda-backend) |
| Web App Repo | [github.com/AdarshKumarDalai/kreeda-web](https://github.com/AdarshKumarDalai/kreeda-web) |
| Mobile App Repo | [github.com/AdarshKumarDalai/Kreeda_Multiplatform](https://github.com/AdarshKumarDalai/Kreeda_Multiplatform) |

---

*Built by [Adarsh Kumar Dalai](https://github.com/AdarshKumarDalai) — because every gully match deserves a proper scorecard.* 🏏⚽

