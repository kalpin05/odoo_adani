# Maintenance Management System - Frontend

A modern React-based frontend for a comprehensive maintenance management system built with Vite, Tailwind CSS, and React Router.

## Features

- **Dashboard**: Overview of maintenance requests, statistics, and KPIs
- **Equipment Management**: Track and manage maintenance equipment
- **Work Centers**: Manage production work centers and their configurations
- **Teams**: Organize maintenance teams and technicians
- **Calendar**: View scheduled maintenance activities
- **Reports**: Comprehensive analytics and reporting
- **Authentication**: Secure login and user management

## Tech Stack

- **React 19** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Hook Form** - Form handling with validation
- **Zod** - Schema validation
- **Lucide React** - Beautiful icons

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:5174](http://localhost:5174) in your browser

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── dashboard/       # Dashboard-specific components
│   ├── equipment/       # Equipment management components
│   ├── maintenance/     # Maintenance request components
│   ├── ui/              # Generic UI components
│   └── workcenter/      # Work center components
├── pages/               # Main application pages
├── Layouts/             # Layout components
└── main.jsx            # Application entry point
```

## API Integration

The frontend communicates with a Node.js/Express backend API. All API calls are proxied through Vite's development server to `http://localhost:5000`.

## Authentication

The application uses JWT-based authentication. Login credentials:
- Email: `admin@example.com`
- Password: `Password123!`
