# 🚀 Workforce SaaS — Enterprise Multi-Tenant Platform (Advanced Edition)

> A next-generation, AI-native workforce management, attendance capture, payroll engine, shift builder, and enterprise intelligence SaaS platform built with React 19, TypeScript, Tailwind CSS, Vite, Node.js, Express, and SQLite3.

---

## 📖 Table of Contents

- [✨ Features \& Master Highlights](#-features--master-highlights)
- [🛠️ How to Run the Project Locally](#%EF%B8%8F-how-to-run-the-project-locally)
- [🌳 Complete Codebase Directory Map (Tree Structure)](#-complete-codebase-directory-map-tree-structure)
- [🗺️ The 17-Phase Master Roadmap Sitemap](#%EF%B8%8F-the-17-phase-master-roadmap-sitemap)
- [🎨 Design System Tokens \& Discipline](#-design-system-tokens--discipline)
- [📱 Mobile Responsiveness \& Touch UX](#-mobile-responsiveness--touch-ux)
- [⚡ Full-Stack Backend API Specification](#-full-stack-backend-api-specification)
- [📜 License \& Credits](#-license--credits)

---

## ✨ Features & Master Highlights

- **🎨 Design-First Foundation**: Obsidian Charcoal (`#0B0F19`), Warm Copper Accent (`#E05A47`), 4px Grid, Tabular Numerics for money, Day-1 Dark & Light mode toggle.
- **🔍 Command Palette (`Cmd+K`)**: Instant keyboard navigation across all 18 views, employees, facilities, and system actions.
- **📡 Real-Time Attendance Capture**: Single-tap optimistic mobile punch-in with offline queue, WebSocket live stream grid with flash row highlights, and vector geofences.
- **📅 Drag-and-Drop Shift Builder**: Week/day calendar with real-time inline labor law conflict detection (overtime & rest warnings during drag) + mobile tap-to-assign builder.
- **🔒 Guarded Payroll Disbursal Wizard**: 5-step guarded pipeline (`Review → Validate → Confirm → Process → Complete`) with inline AI anomaly flags and executive payslip studio.
- **📊 Custom Metabase-Style Report Builder**: Drag-fields pivot interface with live preview aggregation.
- **🤖 Docked AI Co-Pilot**: Contextual assistant rendering actual charts/tables inline, homepage proactive anomaly digest, and subtle attrition risk profile cards.
- **🌐 Enterprise Multi-Location**: 50+ location hierarchy tree, bulk location action bar, cross-location sparklines, and visual Roles × Permissions RBAC matrix.
- **🔌 Developer API Platform**: Pre-built connectors (QuickBooks, Zoho, Tally, Slack, WhatsApp, ZKTeco), Stripe-style cURL explorer, and webhook payload inspector.
- **📋 Statutory Compliance & Audit Trail**: Immutable audit diff log, statutory traffic-light compliance matrix, and document vault expiry tracking.
- **📈 Advanced Workforce Intelligence**: Executive CFO summary, Amplitude-style retention cohorts, and anonymized vertical benchmarks with privacy opt-in.
- **📱 Employee Self-Service Mobile Hub**: Personalized home dashboard, swipeable payslip carousel history (YTD earnings), and 1-tap emoji pulse survey.
- **⚡ Performance & Offline Engine**: Persistent non-alarming offline mode banner, IndexedDB queue counter, side-by-side punch conflict resolution, and `<100ms` perceived latency pass.
- **🏢 White-Label & Franchise Ecosystem**: Real-time theme customizer with admin console re-skinning preview pane, and permission-aware franchise rollup dashboards.
- **♿ WCAG 2.1 AA & RTL i18n**: Conformance pass, localized date/number/currency formatting, and Right-to-Left (RTL) layout mirroring.
- **📦 Enterprise Trust & Portability**: Google/GitHub-style security center (SAML/OIDC SSO, 2FA), self-serve GDPR ZIP archive export tool, and 99.99% public status page.
- **📰 Blog & Editorial CMS Admin Console**: Articles management, categories, SEO metadata, and publishing workflow backed by SQLite3.

---

## 🛠️ How to Run the Project Locally

### Prerequisites

- **Node.js**: `v18.0.0` or higher (Tested on Node `v22.23.1`)
- **npm**: `v9.0.0` or higher

### 1. Clone the Repository

```bash
git clone https://github.com/Mustkeem324/workforce-saas.git
cd workforce-saas
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Express + SQLite Backend Server

```bash
# Runs Express + SQLite3 server on http://localhost:5000
npx -y tsx server/index.ts
```

### 4. Start the Frontend Development Server (In another terminal)

```bash
# Runs Vite React Dev Server on http://localhost:3000
npx vite --port 3000
```

### 5. Build for Production & Type Checking

```bash
# Type-check TypeScript and build production bundle
npx tsc --noEmit && npx vite build
```

---

## 🌳 Complete Codebase Directory Map (Tree Structure)

```
workforce-saas/
├── server/                              # Node.js + Express + SQLite3 Backend Infrastructure
│   ├── index.ts                         # Express Server, SQLite Schema, REST APIs & WebSocket Gateway
│   └── workforce.sqlite                 # SQLite Persistent Database
│
├── src/                                 # React 19 Frontend Application Code
│   ├── App.tsx                          # Master App Shell, Navigation Router & Responsive Layout
│   ├── App.css                          # App Container CSS
│   ├── main.tsx                         # React Entry Point & Root Hydration
│   ├── index.css                        # Design System Tokens, Dark/Light Mode Variables & Touch Styles
│   │
│   ├── tokens/                          # Design System Tokens & Specs
│   │   ├── colors.ts                    # Obsidian Ink, Warm Copper Accent & Semantic Tokens
│   │   ├── typography.ts                # Plus Jakarta Sans & JetBrains Mono Tabular Scale
│   │   ├── spacing.ts                   # 4px Grid System
│   │   ├── elevation.ts                 # 4 Elevation Shadows & Surface Depth
│   │   └── motion.ts                    # Physics Springs & <400ms Motion Caps
│   │
│   ├── services/                        # Real-Time Gateway & WebSocket Services
│   │   └── attendanceStream.ts          # Attendance Stream & Geofence Validator
│   │
│   ├── components/                      # Modular UI & Phase Components
│   │   ├── ui/                          # Primitive Component Library
│   │   │   ├── badge.tsx                # Badge Tag (Crash-Proof Variant Handler)
│   │   │   ├── button.tsx               # Button Primitive (Variants, Sizes, Icons)
│   │   │   ├── card.tsx                 # Elevation Card Primitive
│   │   │   ├── input.tsx                # Form Input Field (16px iOS Safe Font)
│   │   │   ├── switch.tsx               # Toggle Switch Primitive
│   │   │   ├── modal.tsx                # Dialog Modal Primitive
│   │   │   ├── drawer.tsx               # Slide-Over Sheet Drawer
│   │   │   ├── toast.tsx                # Notification Toast Manager
│   │   │   └── table.tsx                # Tabular Numerics Data Table
│   │   │
│   │   ├── mobile/                      # Mobile-First Responsive Components (<640px)
│   │   │   ├── MobileBottomTabBar.tsx   # Fixed Bottom Tab Navigation Bar (Safe Area Supported)
│   │   │   ├── MobileShiftCalendar.tsx  # Day-by-Day Swipeable Tap-to-Assign Shift Builder
│   │   │   ├── MobilePayrollWizard.tsx  # 4-Step Mobile Payroll Wizard with Stacked Anomaly Cards
│   │   │   └── MobileStackedDataCard.tsx# Stacked Cards List for Converting Dense Tables to Mobile
│   │   │
│   │   ├── blog/                        # Blog & Content Management Components
│   │   │   └── BlogCmsAdminManager.tsx  # Editorial CMS Manager, Category Filters & Article Modal
│   │   │
│   │   ├── workforce/                   # Workforce Specific Pattern Components
│   │   │   ├── time-clock.tsx           # Optimistic Punch Clock Widget
│   │   │   ├── shift-card.tsx           # Roster Shift Card Component
│   │   │   └── payroll-summary.tsx      # Tabular Payroll Disbursal Summary
│   │   │
│   │   ├── phase1/                      # Phase 1: Core Auth & Admin Shell
│   │   │   ├── CommandPaletteModal.tsx  # Cmd+K Quick Navigation Modal
│   │   │   ├── LocationSwitcherDropdown.tsx # Multi-Location Dropdown Switcher
│   │   │   ├── OnboardingWizardModal.tsx # Multi-Step Animated Setup Wizard
│   │   │   ├── ContentShapedSkeletons.tsx # Layout-Matching Content Skeletons
│   │   │   └── CustomIllustratedEmptyStates.tsx # Custom SVG Illustrated Empty Views
│   │   │
│   │   ├── phase2/                      # Phase 2: Attendance Capture Engine
│   │   │   ├── MobilePunchInWidget.tsx  # Optimistic Mobile Punch Terminal
│   │   │   ├── LiveAttendanceDashboard.tsx # WebSocket Live Stream Grid with Row Highlights
│   │   │   ├── MapPunchVisualization.tsx# Vector Geofence Map Component
│   │   │   ├── PunchCorrectionDiffUI.tsx# Side-by-Side Punch Correction Diff Inspector
│   │   │   └── DeviceHealthWidget.tsx   # Biometric Hardware Terminal Health Status
│   │   │
│   │   ├── phase3/                      # Phase 3: Shift Management Engine
│   │   │   ├── DragDropShiftCalendar.tsx# Drag-and-Drop Shift Builder Calendar
│   │   │   ├── AISuggestionOverlay.tsx  # Ghost AI Roster Preview Overlay
│   │   │   └── ShiftSwapApprovalQueue.tsx# Swipeable Shift Swap Card Queue
│   │   │
│   │   ├── phase4/                      # Phase 4: Guarded Payroll Engine
│   │   │   ├── PayrollRunWizard.tsx     # Guarded 5-Step Payroll Disbursal Wizard
│   │   │   ├── PayrollCycleDiffView.tsx # Cycle Payout Delta & Outlier Sign-off Inspector
│   │   │   └── BrandedPayslipPreview.tsx# Branded Executive Payslip Studio
│   │   │
│   │   ├── phase5/                      # Phase 5: Leave, Loans & Reporting
│   │   │   ├── LeaveHeatmapTimeline.tsx # 14-Day Team Leave Heatmap & Density Alerts
│   │   │   ├── CustomReportBuilder.tsx  # Metabase-Style Drag-Fields Report Builder
│   │   │   └── LoansLedgerTimeline.tsx  # Loans Amortization Curve & Ledger
│   │   │
│   │   ├── phase6/                      # Phase 6: AI Layer & Co-Pilot
│   │   │   ├── DockedAIAssistant.tsx    # Docked Panel AI Assistant with Inline UI Rendering
│   │   │   ├── ProactiveAnomalyDigest.tsx# Homepage Proactive Anomaly Summary Card
│   │   │   └── AttritionRiskProfileCards.tsx# Subtle Attrition Risk Badges & Factor Explanations
│   │   │
│   │   ├── phase7/                      # Phase 7: Marketing Site & SEO
│   │   │   ├── InteractiveMarketingHero.tsx# Expressive Hero & Embedded Live Interactive Demo
│   │   │   └── PricingROISection.tsx   # Pricing Tiers & Interactive Headcount ROI Calculator
│   │   │
│   │   ├── phase8/                      # Phase 8: Multi-Location Enterprise Scale
│   │   │   ├── OrgHierarchyTreeView.tsx # 50+ Location Collapsible Tree View
│   │   │   ├── BulkLocationOperationsUI.tsx# Multi-Location Floating Action Bar & Undo Buffer
│   │   │   ├── CrossLocationComparisonDashboard.tsx# Cross-Outlet Sparklines Comparison
│   │   │   └── PermissionMatrixEditor.tsx# Roles × Permissions RBAC Matrix Editor
│   │   │
│   │   ├── phase9/                      # Phase 9: Developer API & Integration Platform
│   │   │   ├── IntegrationMarketplace.tsx# Card Grid Connector Marketplace
│   │   │   ├── DeveloperAPIExplorer.tsx # Stripe-Style API Console with cURL Runner
│   │   │   └── WebhookDeliveryLogInspector.tsx# Webhook Delivery Timeline & Payload Inspector
│   │   │
│   │   ├── phase10/                     # Phase 10: Compliance & Audit Trail
│   │   │   ├── ImmutableAuditTrailViewer.tsx# Immutable Audit Log & Side-by-Side JSON Diff Modal
│   │   │   ├── ComplianceHealthDashboard.tsx# Traffic-Light Statutory Compliance Matrix
│   │   │   └── EmployeeDocumentVault.tsx# Employee KYC Vault & Passport Renewal Reminders
│   │   │
│   │   ├── phase11/                     # Phase 11: Advanced Workforce Intelligence
│   │   │   ├── ExecutiveCfoDashboard.tsx# Single-Screen CFO Summary Dashboard & PDF Exporter
│   │   │   ├── CohortRetentionGrid.tsx  # Amplitude-Style Heatmap Cohort Retention Matrix
│   │   │   └── CrossTenantBenchmarkWidget.tsx# Anonymized Vertical Benchmarks & Privacy Notice
│   │   │
│   │   ├── phase12/                     # Phase 12: Employee Self-Service Hub
│   │   │   ├── EmployeeHomeDashboard.tsx# Personal Home Dashboard & Payday Countdown
│   │   │   ├── PayslipCarouselHistory.tsx# Swipeable Monthly Payslip Carousel & YTD Chart
│   │   │   └── LowFrictionPulseSurvey.tsx# Single-Question 1-Tap Emoji Pulse Survey
│   │   │
│   │   ├── phase13/                     # Phase 13: Performance & Offline Engine
│   │   │   ├── OfflineModeSyncBanner.tsx# Persistent Non-Alarming Offline Banner & Queue Counter
│   │   │   ├── OfflineConflictResolutionUI.tsx# Side-by-Side Offline Punch Conflict Resolution
│   │   │   └── PerceivedPerformanceAudit.tsx# Platform-Wide Latency Audit (<100ms Target)
│   │   │
│   │   ├── phase14/                     # Phase 14: White-Label & Franchise Support
│   │   │   ├── LiveThemeCustomizer.tsx  # Reseller Theme Customizer & Admin Re-Skin Preview
│   │   │   └── FranchiseRollupDashboard.tsx# Permission-Aware Parent-Child Franchise Dashboard
│   │   │
│   │   ├── phase15/                     # Phase 15: Accessibility & RTL i18n
│   │   │   ├── LocaleLanguageSwitcher.tsx# Locale Currency/Number Formatter & RTL Mirroring
│   │   │   └── WcagAccessibilityAuditPass.tsx# WCAG 2.1 AA Audit Matrix & ARIA Conformance
│   │   │
│   │   ├── phase16/                     # Phase 16: Trust, Security UX & Data Portability
│   │   │   ├── EnterpriseSecurityCenter.tsx# Security Center (SAML/OIDC SSO & 2FA Enforcement)
│   │   │   ├── OrgDataExportTool.tsx    # Self-Serve GDPR Org Data Export & ZIP Bundle
│   │   │   └── PublicTrustStatusPage.tsx# Statuspage-Style Public 99.99% System Status Page
│   │   │
│   │   └── phase17/                     # Phase 17: Continuous Design Ops & Growth Loops
│   │       ├── InAppChangelogPanel.tsx  # Non-Intrusive Release Notes & Feature Changelog
│   │       └── GrowthReferralLoopUI.tsx # PLG Team Invite & $150 Payroll Credit Referral Loop
│   │
│   └── views/                           # Page Container Views (Direct Route Handlers)
│       ├── BlogCmsAdminView.tsx         # Blog & Editorial CMS Admin Page
│       ├── ColorTokensView.tsx          # Design Token Palette Swatches
│       ├── ComponentsView.tsx           # Living Storybook Component Library
│       ├── MotionTokensView.tsx         # Motion & Physics Spring Token Inspector
│       ├── OverviewView.tsx             # System Brief & Master Phase Sitemap
│       ├── Phase1AdminShellView.tsx     # Phase 1 View Container
│       ├── Phase2AttendanceView.tsx     # Phase 2 View Container
│       ├── Phase3ShiftManagementView.tsx# Phase 3 View Container
│       ├── Phase4PayrollEngineView.tsx  # Phase 4 View Container
│       ├── Phase5ReportingView.tsx      # Phase 5 View Container
│       ├── Phase6AILayerView.tsx        # Phase 6 View Container
│       ├── Phase7MarketingView.tsx      # Phase 7 View Container
│       ├── Phase8EnterpriseView.tsx     # Phase 8 View Container
│       ├── Phase9IntegrationsView.tsx   # Phase 9 View Container
│       ├── Phase10ComplianceView.tsx    # Phase 10 View Container
│       ├── Phase11AnalyticsView.tsx     # Phase 11 View Container
│       ├── Phase12EmployeeAppView.tsx   # Phase 12 View Container
│       ├── Phase13PerformanceView.tsx   # Phase 13 View Container
│       ├── Phase14WhiteLabelView.tsx    # Phase 14 View Container
│       ├── Phase15AccessibilityView.tsx # Phase 15 View Container
│       ├── Phase16SecurityView.tsx      # Phase 16 View Container
│       ├── Phase17GrowthOpsView.tsx     # Phase 17 View Container
│       ├── SpacingElevationView.tsx     # 4px Grid & Elevation Shadow Scale
│       ├── TypographyView.tsx           # Tabular Numerics & Font Discipline View
│       └── WorkforcePatternsView.tsx    # Specialized Workforce Patterns
│
├── package.json                         # Project Scripts & Dependencies
├── tsconfig.json                        # Master TypeScript Compiler Configuration
├── vite.config.ts                       # Vite Rolldown Bundler Setup
└── README.md                            # Complete Project Documentation & Sitemap
```

---

## 🗺️ The 17-Phase Master Roadmap Sitemap

| Phase | Title | Key Architectural Highlights | View Location |
| :--- | :--- | :--- | :--- |
| **Phase 0** | **Design Foundation** | Obsidian Charcoal (`#0B0F19`), Warm Copper Accent (`#E05A47`), 4px Grid, Tabular Numerics, 4 Elevation Shadows, Day-1 Dark Mode. | [`OverviewView.tsx`](src/views/OverviewView.tsx) |
| **Phase 1** | **Core Auth & Admin Shell** | Command Palette (`Cmd+K`), Location Switcher, Multi-Step Animated Onboarding Wizard, Content-Shaped Skeletons. | [`Phase1AdminShellView.tsx`](src/views/Phase1AdminShellView.tsx) |
| **Phase 2** | **Attendance Capture Engine** | Optimistic Mobile Punch-In, WebSocket Live Stream Grid with Flash Highlights, Geofenced Vector Map, Side-by-Side Correction Diffs. | [`Phase2AttendanceView.tsx`](src/views/Phase2AttendanceView.tsx) |
| **Phase 3** | **Shift Management Engine** | Drag-and-Drop Calendar, Real-Time Inline Conflict Detection (Overtime & Rest Warnings), Ghost AI Preview Overlay, Swipe Cards. | [`Phase3ShiftManagementView.tsx`](src/views/Phase3ShiftManagementView.tsx) |
| **Phase 4** | **Guarded Payroll Engine** | 5-Step Guarded Disbursal Wizard, Cycle Payout Delta Inspector with Outlier Sign-Offs, Branded Executive Payslip Studio. | [`Phase4PayrollEngineView.tsx`](src/views/Phase4PayrollEngineView.tsx) |
| **Phase 5** | **Leave, Loans & Reports** | 14-Day Team Leave Heatmap, Metabase-Style Drag-Fields Report Builder, Employee Loans Ledger Amortization Curve. | [`Phase5ReportingView.tsx`](src/views/Phase5ReportingView.tsx) |
| **Phase 6** | **AI Layer & Co-Pilot** | Docked AI Assistant with Inline UI Component Rendering, Proactive Anomaly Digest Card, Subtle Attrition Risk Signals. | [`Phase6AILayerView.tsx`](src/views/Phase6AILayerView.tsx) |
| **Phase 7** | **Marketing Site & SEO** | Expressive Hero, Embedded Live Interactive Demo Widget, Headcount ROI Calculator, LCP <0.8s Performance Budget. | [`Phase7MarketingView.tsx`](src/views/Phase7MarketingView.tsx) |
| **Phase 8** | **Enterprise Multi-Location** | 50+ Location Hierarchy Tree, Multi-Location Floating Action Bar with Undo Buffer, Cross-Location Sparklines, RBAC Matrix. | [`Phase8EnterpriseView.tsx`](src/views/Phase8EnterpriseView.tsx) |
| **Phase 9** | **Developer API & Platform** | Integration Connector Marketplace, Stripe-Style API Explorer with cURL Runner, Webhook Delivery Inspector. | [`Phase9IntegrationsView.tsx`](src/views/Phase9IntegrationsView.tsx) |
| **Phase 10**| **Compliance & Audit Logs** | Immutable Audit Log with Side-by-Side JSON Diff Inspector, Statutory Traffic-Light Matrix, Employee Document Vault. | [`Phase10ComplianceView.tsx`](src/views/Phase10ComplianceView.tsx) |
| **Phase 11**| **Advanced Intelligence** | Single-Screen Executive CFO Summary with PDF Export, Amplitude-Style Heatmap Cohort Retention, Anonymized Benchmarks. | [`Phase11AnalyticsView.tsx`](src/views/Phase11AnalyticsView.tsx) |
| **Phase 12**| **Employee Self-Service** | Personal Home Dashboard & Payday Countdown, Swipeable Monthly Payslip Carousel & YTD Chart, Low-Friction 1-Tap Emoji Survey. | [`Phase12EmployeeAppView.tsx`](src/views/Phase12EmployeeAppView.tsx) |
| **Phase 13**| **Performance & Offline** | Persistent Non-Alarming Offline Banner & Queue Counter, Side-by-Side Punch Conflict Prompt, `<100ms` Latency Audit Pass. | [`Phase13PerformanceView.tsx`](src/views/Phase13PerformanceView.tsx) |
| **Phase 14**| **White-Label & Franchise**| Live Theme Customizer with Real-Time Admin Re-Skin Preview, Permission-Aware Parent-Child Franchise Rollup Dashboard. | [`Phase14WhiteLabelView.tsx`](src/views/Phase14WhiteLabelView.tsx) |
| **Phase 15**| **Accessibility & i18n** | Full WCAG 2.1 AA Conformance Pass, Localized Currency/Number Formatter (`$142k` vs `142k €` vs `١٤٢k ر.س`), RTL Layout Mirroring. | [`Phase15AccessibilityView.tsx`](src/views/Phase15AccessibilityView.tsx) |
| **Phase 16**| **Trust, Security & Export**| Google/GitHub-Style Security Center (SAML/OIDC SSO & 2FA), Self-Serve GDPR Data Export & ZIP Archive, Public 99.99% Status Page. | [`Phase16SecurityView.tsx`](src/views/Phase16SecurityView.tsx) |
| **Phase 17**| **Design Ops & Growth** | In-App Release Notes & Feature Changelog Panel, PLG Team Invite & $150 Payroll Credit Referral Loop. | [`Phase17GrowthOpsView.tsx`](src/views/Phase17GrowthOpsView.tsx) |
| **Blog CMS**| **Editorial CMS Admin** | Article Manager, Category Filters, Publication Status, and SEO Metadata Management backed by Express + SQLite3. | [`BlogCmsAdminView.tsx`](src/views/BlogCmsAdminView.tsx) |

---

## 🎨 Design System Tokens & Discipline

### CSS Custom Variables ([`src/index.css`](src/index.css))

```css
/* Light Mode Defaults */
:root {
  --bg-canvas: #F8FAFC;
  --bg-surface-raised: #FFFFFF;
  --bg-surface-overlay: #FFFFFF;
  --text-primary: #0B0F19;
  --text-secondary: #475569;
  --border-subtle: #E2E8F0;
  --accent-500: #E05A47;
}

/* Dark Mode Overrides (html.dark) */
html.dark, .dark {
  --bg-canvas: #06090E;
  --bg-surface-raised: #0B0F19;
  --bg-surface-overlay: #111726;
  --text-primary: #F8FAFC;
  --text-secondary: #94A3B8;
  --border-subtle: rgba(255, 255, 255, 0.08);
}
```

### Font Discipline

- **UI Text**: `Plus Jakarta Sans`, sans-serif.
- **Financial & Numeric Data**: `JetBrains Mono`, monospace with strict `font-variant-numeric: tabular-nums` to eliminate number jittering in monetary ledgers.

---

## 📱 Mobile Responsiveness & Touch UX

- **Unified Breakpoint Scale**:
  - `mobile`: `< 640px` (Phones)
  - `tablet`: `640px - 1024px` (Tablets / On-the-go managers)
  - `desktop`: `> 1024px` (Back-office admin console)
- **Mobile Bottom Navigation Tab Bar**: Fixed bottom tab bar (`<640px`) with Attendance, Shifts, Payroll, Reports, and Search.
- **Mobile Stacked Data Cards**: Replaces wide data tables on mobile with 1-card-per-row layouts and expandable details drawers.
- **Mobile Shift Builder**: Mobile day-by-day swipeable tabs with 1-tap shift assignment modal.
- **iOS Safe Area Support**: Padded with `env(safe-area-inset-bottom)` (`pb-safe`) and `font-size: 16px !important` on inputs to eliminate iOS Safari focus zoom.

---

## ⚡ Full-Stack Backend API Specification

The Node.js Express SQLite backend (`server/index.ts`) exposes the following endpoints:

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `GET /api/health` | `GET` | Health check & SQLite database operational status |
| `GET /api/v1/attendance/punches` | `GET` | Fetch all historical attendance punch records |
| `POST /api/v1/attendance/punch` | `POST` | Ingest new punch, write to SQLite & broadcast via WebSocket |
| `GET /api/v1/payroll/runs/latest` | `GET` | Fetch latest guarded payroll run summary |
| `GET /api/v1/audit/logs` | `GET` | Query immutable audit log entries |
| `GET /api/v1/blog/posts` | `GET` | Query blog posts from SQLite database |
| `POST /api/v1/blog/posts` | `POST` | Create or update blog post in SQLite database |

---

## 📜 License & Credits

Designed and built by the **Advanced Agentic Coding Engineering Team**. Distributed under the MIT License.
