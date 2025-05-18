# ToDo App Backend

A RESTful API for managing ToDo tasks, built with Node.js, Express, and TypeScript, using MongoDB for data storage. This backend provides CRUD operations, input validation, centralized error handling, and essential security and logging features.

## Features

- **CRUD** endpoints for tasks: Create, Read, Update, Delete
- **Input Validation** with Joi
- **Centralized Error Handling** using http-errors
- **Logging** HTTP requests with Morgan and application events with Winston
- **Security** headers via Helmet, CORS configuration, and rate limiting
- **Environment-based Configuration** using `.env`

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** MongoDB via Mongoose
- **Validation:** Joi
- **Error Handling:** http-errors
- **Logging:** Morgan & Winston
- **Security:** Helmet, CORS, express-rate-limit

## Prerequisites

- Node.js v14 or higher
- npm or yarn
- MongoDB instance (local or MongoDB Atlas)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd todo-app-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Environment Variables**
   Copy `.env.example` to `.env` and update:
   ```env
   MONGO_URI="mongodb://localhost:27017/todo-app"
   PORT=4000
   CORS_ORIGIN="*"
   NODE_ENV=development
   ```

## Scripts

| Command        | Description                       |
| -------------- | --------------------------------- |
| `npm run dev`  | Start server in development mode  |
| `npm run build`| Compile TypeScript to JavaScript  |
| `npm start`    | Run the compiled production code  |

## Project Structure

```
todo-app-backend/
├── src/
│   ├── config/
│   │   ├── corsConfig.ts          # CORS options
│   │   └── rateLimitConfig.ts     # Rate limiter settings
│   ├── middleware/
│   │   ├── errorHandlers.ts       # 404 & error handling
│   │   ├── not-foundMiddleware.ts # 404 handler
│   │   └── validateMiddleware.ts  # Joi validation middleware
│   ├── models/
│   │   └── Task.ts                # Mongoose schema & model
│   ├── validation/
│   │   └── taskSchemas.ts         # Joi schemas for requests
│   ├── services/
│   │   └── tasksService.ts        # Business logic & DB operations
│   ├── controllers/
│   │   └── tasksController.ts     # HTTP request handlers
│   ├── routes/
│   │   ├── tasksRoutes.ts         # Task endpoints routing
│   │   └── index.ts               # Main router
│   ├── app.ts                     # Express app setup
│   └── index.ts                   # Server bootstrap (DB & HTTP)
├── .env.example
├── package.json
└── tsconfig.json
```

## API Endpoints

| Method | Endpoint           | Description               |
| ------ | ------------------ | ------------------------- |
| GET    | `/api/tasks`       | List all tasks            |
| GET    | `/api/tasks/:id`   | Retrieve a task by ID     |
| POST   | `/api/tasks`       | Create a new task         |
| PUT    | `/api/tasks/:id`   | Update a task by ID       |
| DELETE | `/api/tasks/:id`   | Remove a task by ID       |

## Validation

- **Query Params:** pagination and filtering defined in `taskSchemas.ts` (page, pageSize, etc.)
- **Path Params:** task ID must be a 24-character hex string
- **Request Body:** Joi schemas enforce required and optional fields for create/update

## Error Handling

All errors are thrown using `http-errors` in services and caught by a centralized middleware (`errorHandlers.ts`), which logs errors via Winston and returns structured JSON responses.

## Logging

- **Morgan** logs incoming HTTP requests.
- **Winston** captures application-level logs and errors, writing to console and files as configured.

## Security

- **Helmet** adds secure HTTP headers.
- **CORS** configured via environment.
- **Rate Limiting** prevents abuse (100 requests per 15 minutes per IP).
