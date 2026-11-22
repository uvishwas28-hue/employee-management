# Employee Management System

A React + Vite application for managing employees, departments, attendance, and reports.

## Features

- Dashboard overview with key employee stats
- Employee directory with search and filters
- Add, view, edit, and delete employee records
- Department catalog with headcount summary
- Daily attendance tracking per employee
- Summary reports for workforce and attendance
- Preloaded with 20 sample employees
- Data persisted in browser `localStorage`

## Pages

1. **Dashboard** - Overview with key stats and recent employees
2. **Employees** - Browse, search, and manage all employees
3. **Add Employee** - Create a new employee record
4. **Employee Details** - View full details and attendance history
5. **Edit Employee** - Update an existing employee record
6. **Departments** - View department catalog and employee counts
7. **Attendance** - Mark and review employee attendance
8. **Reports** - Summary reports by status, department, and attendance

## Prerequisites

- Node.js 18+ (recommended)
- npm

## Run locally

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal (usually http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Notes

- Employee data is stored in browser `localStorage` under the key `employee-management.employees`.
- Sample data is loaded on first run (20 employees). Clear the key in browser storage to reset to the initial dataset.
