# Assignment 5

**Name:** abo al magd  
**Group:** Node_C45_Mon&Thurs_8:30pm_(Online)

---

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Features](#features)
- [Getting Started](#getting-started)
- [Environment Configuration](#environment-configuration)
- [API Endpoints](#api-endpoints)

---

## Project Overview

This assignment implements a RESTful backend for managing Users, Posts, and Comments, emphasizing modern project structure, modularity, and database integration. The system provides scalable routing, robust error handling, and layered separation of controller/service/DB logic.

---

## Tech Stack

- **Node.js** with ES Modules
- **Express 5.2** for HTTP API routing
- **Sequelize 6** as the ORM
- **MySQL** as the primary database (`mysql2` driver)
- **dotenv** for environment variable management
- **cross-env** for flexible environment launching

---

## Architecture

```
assignment-5/
├── config/
│   ├── .env.development
│   ├── .env.production
│   └── config.service.js
├── src/
│   ├── DB/
│   │   ├── connection.db.js
│   │   └── model/
│   │       ├── user.model.js
│   │       ├── post.model.js
│   │       ├── comment.model.js
│   │       └── index.js
│   ├── modules/
│   │   ├── users/
│   │   │   ├── index.js
│   │   │   ├── user.controller.js
│   │   │   └── user.service.js
│   │   ├── posts/
│   │   │   ├── index.js
│   │   │   ├── post.controller.js
│   │   │   └── post.service.js
│   │   ├── comments/
│   │   │   ├── index.js
│   │   │   ├── comment.controller.js
│   │   │   └── comment.service.js
│   │   └── index.js
│   ├── app.bootstrap.js
│   └── main.js
├── package.json
└── .gitignore
```

- **Entry Point:** `src/main.js` boots the app via `app.bootstrap.js`.
- **Database Config:** Dynamically loads environment-specific variables (`config/config.service.js`).
- **Model Layer:** Sequelize models for Users, Posts, and Comments.
- **Modular Routing:** Separate Express routers for each resource (users, posts, comments).
- **Controller/Service Pattern:** Each module has both controller (HTTP logic) and service (business/DB logic) files.

---

## Features

- **User Management:** Signup, update, get by ID/email.
- **Posts:** Create, delete, get details, and fetch comment counts per post.
- **Comments:** Bulk creation, update, search, get recent/newest comments on a post.
- **Robust Error Handling:** Standardized JSON errors, production/development diagnostics.
- **Environment-aware:** Easily switch between development and production configs.

---

## Getting Started

1. **Install dependencies:**

   ```sh
   npm install
   ```

2. **Setup environment variables:**  
   Copy `config/.env.development` or `config/.env.production` and update values as needed.

3. **Start the API:**
   - Development:  
     ```sh
     npm run start:dev
     ```
   - Production:  
     ```sh
     npm run start:prod
     ```

---

## Environment Configuration

Edit `config/.env.development` or `config/.env.production`:

- `PORT` – server port (default: 7000)
- `DB_HOST` – MySQL hostname (default: 127.0.0.1)
- `DB_PORT` – MySQL port (default: 3306)
- `DB_USER`, `DB_PASSWORD`, `DB_NAME` – MySQL credentials
- `SALT_ROUND` – bcrypt salt rounds (default: 10)

---

## API Endpoints

### Users

- `POST /users/signup` – Create a new user.
- `PUT /users/:id` – Update or upsert user by ID.
- `GET /users/:id` – Find user by ID.
- `GET /users/by-email?email={email}` – Find user by email.

### Posts

- `POST /posts/` – Create a new post.
- `DELETE /posts/:postId` – Delete a post.
- `GET /posts/details` – List all posts with details.
- `GET /posts/comment-count` – Get comment counts for each post.

### Comments

- `POST /comments/` – Bulk create comments.
- `PATCH /comments/:commentId` – Update a comment.
- `POST /comments/find-or-create` – Find or create a comment.
- `GET /comments/search?word={...}` – Search comments by keyword.
- `GET /comments/newest/:postId` – Get newest comments for a post.
- `GET /comments/details/:id` – Get comment details by ID.

---

## Error Handling

- All endpoints return standardized JSON objects and use HTTP status codes.
- Errors are handled globally and provide more detailed info in development.

---

## Author

abo al magd
