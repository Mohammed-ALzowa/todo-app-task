# ToDo Web App Workspace

This repository contains both the **frontend** and **backend** applications for the ToDo Web App, organized as separate projects within a workspace.

## Projects

1. **Backend** (`todo-app-backend/`):  
   - RESTful API built with Node.js, Express, and TypeScript  
   - MongoDB for data storage (via Mongoose)  
   - Features: CRUD endpoints, input validation (Joi), centralized error handling, logging (Morgan & Winston), security (Helmet, CORS, rate limiting)  
   - README: `to_do_app_backend/README.md`  

2. **Frontend** (`todo-app-frontend/`):  
   - Next.js (App Router) with TypeScript  
   - State management with Redux Toolkit  
   - Axios for API requests  
   - Drag & Drop via @hello-pangea/dnd  
   - UI built with Material UI  
   - README: `to_do_app_frontend/README.md`  

## Prerequisites

- Node.js 18.x or later (for both frontend and backend)  
- npm or yarn  
- MongoDB instance (local or Atlas)  

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd ToDo-Web-App-Task
```

### 2. Install dependencies

```bash
# Backend
cd todo-app-backend
npm install

# Frontend
cd ../todo-app-frontend
npm install
```

### 3. Configure Environment Variables

- **Backend**: Copy `to_do_app_backend/.env.example` to `to_do_app_backend/.env` and update values.  
- **Frontend**: Copy `to_do_app_frontend/.env.example` to `to_do_app_frontend/.env` and update `NEXT_PUBLIC_BASE_URL`.

### 4. Run the Applications

You can run both projects in separate terminals:

```bash
# Terminal 1: Backend
cd todo-app-backend
npm run dev

# Terminal 2: Frontend
cd todo-app-frontend
npm run dev
```

- Backend API: http://localhost:4000/api/tasks  
- Frontend App: http://localhost:3000  

## Scripts

| Project  | Command             | Description                      |
| -------- | ------------------- | -------------------------------- |
| Backend  | `npm run dev`       | Start backend in development     |
|          | `npm run build`     | Build backend for production     |
|          | `npm start`         | Run production server            |
| Frontend | `npm run dev`       | Start frontend in development    |
|          | `npm run build`     | Build frontend for production    |
|          | `npm run start`     | Run production server            |

## Structure

```
ToDo-Web-App-Task/
├── todo-app-backend/
│   ├── src/
│   ├── .env.example
│   └── README.md
└── todo-app-frontend/
    ├── src/
    ├── .env.example
    └── README.md
```

## Contributing

Contributions, issues, and feature requests are welcome. Please refer to each subproject's README for details.

