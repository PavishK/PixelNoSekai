# PixelNoSekai

A personal image manager built with **Next.js**, **Prisma**, **Tailwind CSS**, **TypeScript**, and **MySQL**. Store images with notes, organize them, and manage metadata through a clean, responsive UI.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [Getting Started](#getting-started)

   * [Prerequisites](#prerequisites)
   * [Environment Variables](#environment-variables)
   * [Install & Run (Development)](#install--run-development)
   * [Database Setup (Prisma + MySQL)](#database-setup-prisma--mysql)
6. [Prisma Commands](#prisma-commands)
7. [Tailwind CSS](#tailwind-css)
8. [Building & Deployment](#building--deployment)
9. [API Endpoints (Summary)](#api-endpoints-summary)
10. [Security & Notes](#security--notes)
11. [Contributing](#contributing)
12. [License](#license)
13. [Contact](#contact)

---

## Project Overview

PixelNoSekai is a minimal, performant web application to upload and manage images along with notes and simple metadata (title, tags, createdAt, etc.). It uses Next.js for server-side rendering and API routes, Prisma as the ORM to connect to MySQL, Tailwind CSS for styling, and TypeScript across the stack for safer code.

## Features

* Upload images (local or cloud storage integration later)
* Add and edit notes per image
* View image list and single image details
* Search and filter by tags/title
* Pagination and sorting
* User authentication (optional / extensible)
* Admin panel for managing images/users (optional)

## Tech Stack

* Next.js (App Router or Pages Router — choose one)
* Prisma (ORM)
* MySQL (database)
* Tailwind CSS
* TypeScript
* Vercel / Railway / Render / DigitalOcean for deployment (examples below)

## Project Structure (example)

```
/ (root)
├─ prisma/
│  └─ schema.prisma
├─ public/
├─ src/
│  ├─ app/ or pages/    # Next.js routes
│  ├─ components/
│  ├─ lib/              # helpers, db client
│  ├─ prisma/           # prisma client wrapper
│  └─ styles/
├─ .env.local
├─ package.json
└─ README.md
```

## Getting Started

### Prerequisites

* Node.js (v18+ recommended)
* pnpm / npm / yarn
* MySQL database (local or cloud)
* Prisma CLI (`npx prisma` or install globally)

### Environment Variables

Create a `.env.local` file in the project root with at least the following values:

```env
# MySQL
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE_NAME"

# Next.js
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Optional: storage provider credentials (S3, Cloudinary, etc.)
# For local uploads you may not need these initially.
# S3_BUCKET=...
# S3_REGION=...
# S3_ACCESS_KEY_ID=...
# S3_SECRET_ACCESS_KEY=...
```

> Make sure `.env.local` is added to `.gitignore`.

### Install & Run (Development)

```bash
# install deps
npm install
# or
# pnpm install
# or
# yarn

# run dev
npm run dev
# or
# pnpm dev
# yarn dev

# open http://localhost:3000
```

### Database Setup (Prisma + MySQL)

1. Edit `prisma/schema.prisma` to match the MySQL provider and your models (example below).
2. Run migrations to create tables:

```bash
npx prisma migrate dev --name init
# or
pnpm prisma migrate dev --name init
```

3. Generate Prisma client (usually automatic after migrate):

```bash
npx prisma generate
```

## Example `schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model Image {
  id        Int      @id @default(autoincrement())
  title     String?
  filename  String
  url       String
  notes     String?
  tags      String?   // simple comma-separated; or use a Tag model & many-to-many
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

// Optional: a User model if you add auth later
model User {
  id       Int     @id @default(autoincrement())
  email    String  @unique
  name     String?
  password String? // or use external auth
  images   Image[] @relation()
}
```

## Prisma Commands

* `npx prisma migrate dev` — apply dev migration
* `npx prisma migrate deploy` — run migrations in production
* `npx prisma studio` — open a browser GUI to inspect DB
* `npx prisma generate` — regenerate the client

## Tailwind CSS

If you don't already have Tailwind installed, install and configure it:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Add the `content` paths in `tailwind.config.js` and add the base imports into your global CSS:

```css
/* globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Building & Deployment

* For Vercel: push repo to GitHub and connect to Vercel. Set environment variables in Vercel dashboard.
* For Docker: create a Dockerfile and docker-compose with a MySQL service.
* Remember to run Prisma migrations in production: `npx prisma migrate deploy`.

## API Endpoints (Summary)

Examples of routes you might implement:

* `GET /api/images` — list images (with pagination & filters)
* `POST /api/images` — upload image metadata (and file handling)
* `GET /api/images/:id` — get single image details
* `PUT /api/images/:id` — update notes/title/tags
* `DELETE /api/images/:id` — remove image record (and file)

Use Next.js API routes or server actions for these.

## File Uploads

Options:

* Local disk (good for dev)
* S3 / DigitalOcean Spaces / Cloudinary (recommended for production)

When using S3/cloud providers, store the resulting file `url` in the `Image.url` column and only keep light metadata in DB.

## Security & Notes

* Never commit `.env` files.
* If you accept user uploads, validate file types and sizes server-side.
* Sanitize notes & other free text if rendering HTML (use `sanitize-html` or escape output).
* Enable HTTPS in production and restrict DB access to your app only.

## Contributing

PRs welcome. Suggested workflow:

1. Fork repo
2. Create a feature branch
3. Implement & test
4. Open a PR with a clear description

## License

Choose a license (e.g. MIT). Add `LICENSE` file to the repo.

## Contact

Created by You — contact info or link to GitHub profile.