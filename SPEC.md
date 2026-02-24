# SwitchWithAI - AI-Powered Job Application Tracker

## Project Overview
- **Project Name**: SwitchWithAI
- **Type**: Full-stack Web Application
- **Core Functionality**: Job search, ATS-optimized resume customization, and application tracking
- **Target Users**: Job seekers looking to streamline their job search process

---

## UI/UX Specification

### Layout Structure

**Pages:**
1. **Dashboard** - Overview of all job applications
2. **Job Search** - Search and scrape jobs from multiple sources
3. **Resume Builder** - Create and customize resumes with ATS scoring
4. **Applications** - Track and manage all job applications

**Responsive Breakpoints:**
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Visual Design

**Color Palette:**
- Background: `#0a0a0f` (deep night)
- Surface: `#12121a` (card background)
- Surface Elevated: `#1a1a24` (hover states)
- Primary: `#6366f1` (indigo)
- Primary Hover: `#818cf8`
- Accent: `#22d3ee` (cyan)
- Success: `#10b981` (green)
- Warning: `#f59e0b` (amber)
- Danger: `#ef4444` (red)
- Text Primary: `#f8fafc`
- Text Secondary: `#94a3b8`
- Text Muted: `#64748b`
- Border: `#1e293b`

**Typography:**
- Font Family: `'Outfit', sans-serif` (headings), `'DM Sans', sans-serif` (body)
- Headings: 
  - H1: 2.5rem, weight 700
  - H2: 1.75rem, weight 600
  - H3: 1.25rem, weight 600
- Body: 1rem, weight 400
- Small: 0.875rem

**Spacing System:**
- Base unit: 4px
- xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px, 2xl: 48px

**Visual Effects:**
- Card shadows: `0 4px 24px rgba(0, 0, 0, 0.4)`
- Border radius: 12px (cards), 8px (buttons), 6px (inputs)
- Glass effect: `backdrop-filter: blur(12px); background: rgba(18, 18, 26, 0.8)`
- Gradient accents: `linear-gradient(135deg, #6366f1, #22d3ee)`

### Components

**Navigation:**
- Sidebar navigation (desktop), bottom nav (mobile)
- Active state: gradient background with glow effect
- Icons with labels

**Cards:**
- Job cards with company logo, title, location, salary, date
- Status badges (Applied, Interview, Offer, Rejected)
- Hover: subtle lift with border glow

**Buttons:**
- Primary: gradient background, white text
- Secondary: transparent with border
- Ghost: text only with hover background
- States: hover (brightness 1.1), active (scale 0.98), disabled (opacity 0.5)

**Forms:**
- Dark inputs with border
- Focus: cyan glow border
- Labels above inputs

**Progress Indicators:**
- ATS Score: circular progress with percentage
- Application funnel: horizontal bar chart

---

## Functionality Specification

### Core Features

#### 1. Job Search & Scraping
- Search jobs by keyword, location, experience level
- Filter by: date posted, job type, remote/onsite
- Sources: LinkedIn, Indeed, Glassdoor (simulated via API)
- Save jobs to tracking list

#### 2. ATS Score Analyzer
- Parse job descriptions to extract keywords
- Compare resume against job requirements
- Score: 0-100% match rate
- Highlight matching and missing keywords
- Target: 70-80% match recommendation

#### 3. Resume Customization
- Upload base resume (text/JSON format)
- AI-powered keyword optimization
- Auto-generate tailored resume versions per job
- Preview and download customized resumes

#### 4. Job Application Tracker
- Kanban board view (Applied → Interview → Offer → Rejected)
- Add notes, follow-up dates, salary info
- Statistics dashboard: total applications, response rate, interview rate

#### 5. Application Status Workflow
- Status: Saved → Applied → Screening → Interview → Offer → Rejected
- Timeline view of application history
- Reminder system for follow-ups

### User Interactions
- Drag-and-drop for status changes
- One-click apply with auto-generated resume
- Bulk actions (mark as applied, delete)

### Data Handling
- Local storage for demo (no backend)
- JSON structure for jobs, resumes, applications

---

## Acceptance Criteria

1. ✅ Dashboard shows application statistics with visual charts
2. ✅ Job search returns results from multiple sources
3. ✅ ATS score displays percentage with keyword breakdown
4. ✅ Resume can be customized per job with keyword optimization
5. ✅ Application tracker supports drag-and-drop status updates
6. ✅ Responsive design works on mobile and desktop
7. ✅ Dark theme with glass morphism effects
8. ✅ All interactions feel smooth with animations
