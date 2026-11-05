# PeopleHub – HR Management System (HRMS)

A modern, minimal, and user-friendly SaaS HR Management System concept designed for the **Manzio Creative Studio Pvt Ltd** internship UI/UX design assessment.

Built with **React**, **Vite**, **Lucide Icons**, and modern CSS adhering to strict design system specifications.

---

## 🌟 Live Demo Preview

- **Reference Resolution:** 1440 × 900 (Desktop-first)
- **Design Tokens:**
  - **Primary:** `#5145E5`
  - **Primary Hover:** `#4338CA`
  - **Background Canvas:** `#F8F9FC`
  - **Card Surface:** `#FFFFFF`
  - **Text Primary:** `#20243A`
  - **Text Secondary:** `#747B8C`
  - **Borders:** `#EAECF2`
  - **Typography:** Inter (Google Fonts)
  - **Spatial Grid:** 8px rhythm with 16px soft-radius cards

---

## 📱 Mandatory & Additional Screens

### 1. Dashboard (`/`)
- Personalized greeting: *"Good morning, Sarah!"* with dynamic date indicator.
- **4 Core Metrics:** Total Employees (248), Present Today (219), On Leave (12), Pending Requests (08).
- **Attendance Overview:** Proportional SVG Donut chart breakdown + Mon–Fri 5-day weekly attendance trend.
- **Pending Leave Requests:** Compact table with 1-click **Approve** and **Reject** quick actions.
- **Workforce Activity Stream:** Real-time audit log of approvals, check-ins, and onboarding.
- **Upcoming Company Events:** Thanksgiving Holiday, Work Anniversaries, Townhall meetings.

### 2. Employee Directory (`/employees`)
- Real-time search across names, emails, roles, and employee IDs.
- Department filter (Engineering, Design, HR, Marketing, Finance, Operations) and Status filter.
- Work arrangement badges: **`Hybrid`**, **`Onsite`**, **`Remote`**.
- **Slide-Over Profile Preview Drawer:** View contact info, tenure, direct manager, and skills tags without losing table scroll position.
- **Add Employee Modal:** Functional form to onboard new employees with live state updates.

### 3. Employee Profile (`/employees/EMP001`)
- Deep dive on **Ethan Wilson** (Senior Software Developer).
- Cover banner header with 96px avatar and active status indicator.
- **2-Column Information Matrix:** Personal Info, Employment Details, Leave Balances (Annual, Sick, Casual), and Turnout Rate (98%).
- **Interactive Edit Profile Modal:** Modify title, phone, or location live in state.

### 4. Attendance & Leave Management (`/attendance`)
- **Unified Single-Page Tabbed Architecture:**
  - **Tab A – Attendance Records:** Turnout summary, shift schedule (`09:00 – 18:00`), check-in/out times, check-in method (*Biometric Scanner*, *Web App*, *Mobile GPS*), and late delay badges (`Late (+35m)`).
  - **Tab B – Leave Requests:** Summary cards strictly matching assessment specs (**42 Total**, **08 Pending**, **28 Approved**, **06 Rejected**). Employee leave reasons and remaining balance pills (`14d left`).
  - **Confirmation Dialogs:** Modal confirmation on approve/reject with animated toast feedback.

### 5. Role-Based Access Control Demo
- **1-Click Role Switcher in Header:** Toggle between **Administrator (Sarah Mitchell)** and **Employee Self-Service (Ethan Wilson)**.
- **Employee View:** Personal workday clock-in/out punch card, available leave days, and **`+ Apply for Leave`** application form that submits directly into Sarah's approval queue!

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/alwinsibym/PeopleHub-HR-Suite.git

# Navigate to project folder
cd PeopleHub-HR-Suite

# Install dependencies
npm install

# Start development server
npm run dev
```

Open **`http://localhost:5173/`** in your browser.

---

## 📁 Project Structure

```
PeopleHub-HR-Suite/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css               # Design system tokens, typography, radii, & shadows
    ├── components/
    │   ├── Header.jsx          # Breadcrumbs, role-switcher, search, notifications, profile
    │   └── Sidebar.jsx         # 236px fixed navigation with core & bonus modules
    ├── context/
    │   └── AppContext.jsx      # Centralized reactive store (Admin/Employee state, leaves, clock)
    ├── data/
    │   └── sampleData.js       # Curated realistic HR data (tenure, skills, shifts, reasons)
    └── pages/
        ├── Auth.jsx            # Sign In / Sign Up with 1-click Demo logins
        ├── Dashboard.jsx       # Screen 01: Workforce dashboard & ESS punch card
        ├── Employees.jsx       # Screen 02: Directory & slide-over preview drawer
        ├── EmployeeProfile.jsx # Screen 03: Ethan Wilson profile & edit modal
        ├── AttendanceLeave.jsx # Screen 04: Unified Attendance & Leave management
        ├── Performance.jsx     # Bonus: Quarterly reviews & goal progress
        └── Payroll.jsx         # Bonus: Monthly salary disbursements & payslips
```

---

## 📄 License & Credits
Designed and engineered as an internship assessment concept for **Manzio Creative Studio Pvt Ltd**.
