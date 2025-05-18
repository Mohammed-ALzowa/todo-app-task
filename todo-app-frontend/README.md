# Task Management Application

A modern, responsive task management application built with Next.js, Redux Toolkit, and Material UI. This application allows users to create, read, update, and delete tasks with a clean and intuitive interface.

## Features

- **Server-Side Rendering (SSR)** for improved performance and SEO
- **Complete CRUD operations** for task management
- **Drag and drop** functionality to reorder tasks
- **Responsive Design** that works on desktop and mobile devices
- **Task Status Tracking** with visual indicators for completed tasks
- **Success Feedback** via modal dialog when tasks are completed
- **Material UI Components** for a modern and consistent UI

## Technologies Used

- **Next.js 14+** (App Router)
- **Redux Toolkit** for state management
- **Material UI** for UI components
- **@hello-pangea/dnd** for drag and drop functionality
- **Axios** for HTTP requests
- **TypeScript** for type safety

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. **Clone the repository** (replace with your URL):
   ```bash
   git clone https://github.com/yourusername/task-management-app.git
   cd task-management-app/todo-app-frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Setup environment variables**:
   Copy `.env.example` to `.env` and update:
   ```env
   NEXT_PUBLIC_BASE_URL=http://localhost:5000/api
   ```

## Available Scripts

- `npm run dev` - Start the development server with hot-reload
- `npm run build` - Build the application for production
- `npm run start` - Start the production server

## Project Structure

```
todo-app-frontend/
├── app/                    # Next.js App Router pages and layouts
│   ├── page.tsx            # Home page listing tasks
│   ├── tasks/[id]/page.tsx # Task details and edit page
│   └── layout.tsx          # Root layout with Providers
├── src/
│   ├── lib/
│   │   └── api.ts          # Axios instance
│   ├── store/
│   │   ├── index.ts        # Redux store configuration
│   │   └── tasksSlice.ts   # Tasks slice and async thunks
│   ├── store/hooks.ts      # Typed hooks for Redux
│   └── components/         # React components
│       ├── TaskList.tsx
│       ├── TaskItem.tsx
│       └── TaskForm.tsx
├── public/                 # Public assets
├── .env.example            # Environment variable example
├── next.config.js          # Next.js configuration
└── package.json
```

