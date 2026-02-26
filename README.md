# Dynamic Product Search API

A backend REST API for a classic vinyl record store, featuring live search and genre filtering powered by a SQLite database. Built and deployed as a full-stack Node.js project.

---

## Overview

A RESTful API built with **Express.js** and **SQLite**, following an MVC architecture with separated route handlers and controller logic. Exposes parameterised `GET` endpoints that construct conditional SQL queries at runtime — supporting exact-match genre filtering and multi-column `LIKE`-based full-text search across `title`, `artist`, and `genre` fields. The Express instance doubles as a static file server for the frontend. Database is provisioned and seeded via standalone Node.js scripts executed as part of the deploy build step.

---

## Features

- Browse the full vinyl catalogue
- Filter products by genre
- Full-text search across title, artist, and genre
- Static frontend served directly by Express
- Auto-provisioned SQLite database on deploy

---

## Tech Stack

- **Runtime:** Node.js (ES Modules)
- **Framework:** Express.js
- **Database:** SQLite via `sqlite` + `sqlite3`
- **Hosting:** Render

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/products` | Returns all products |
| `GET` | `/api/products?genre=rock` | Filters by genre |
| `GET` | `/api/products?search=echo` | Searches by title, artist, or genre |
| `GET` | `/api/products/genres` | Returns all distinct genres |

---

## Project Structure

```
├── controllers/       # Route handler logic
├── routes/            # Express routers
├── db/                # Database connection module
├── public/            # Static frontend assets
├── data.js            # Seed data
├── createTable.js     # DB schema setup script
├── seedTable.js       # DB seeding script
└── server.js          # App entry point
```

---

## What I Learned

### SQLite & Relational Databases
- How to create and manage a SQLite database from scratch using `sqlite3` and the `sqlite` wrapper
- Writing raw SQL for table creation, parameterised queries, and transactions
- Using `BEGIN TRANSACTION` / `COMMIT` / `ROLLBACK` for safe batch inserts

### Express.js & REST API Design
- Structuring an Express app using the **MVC pattern** — separating routes, controllers, and database logic
- Serving a **static frontend** and a **REST API** from the same Express server
- Reading and applying **URL query parameters** (`req.query`) for filtering and search

### Node.js ES Modules
- Using `import`/`export` syntax throughout a Node.js project via `"type": "module"` in `package.json`
- Recreating `__dirname` in ES Module context using `import.meta.url` and `fileURLToPath`

### Dynamic Search Logic
- Building **conditional SQL queries** at runtime based on which query parameters are present
- Using `LIKE` with wildcards for flexible, case-insensitive text search across multiple columns

### Deployment & DevOps (Render)
- Configuring a Node.js app for cloud deployment using environment variables (`process.env.PORT`)
- Using a **build script** to automate database creation and seeding before the server starts
- Writing a `render.yaml` for infrastructure-as-code deployment configuration
- Understanding ephemeral filesystems and how to work around them with a seed-on-deploy strategy

---

## Running Locally

```bash
npm install
npm run build   # Creates and seeds the database
npm start       # Starts the server on http://localhost:8000
```
