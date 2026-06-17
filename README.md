# Next.js Portfolio Platform

A complete personal portfolio platform built with the Next.js App Router, TypeScript, Tailwind CSS, local JSON file storage, protected admin pages, and server-side API routes.

## Features

- Public portfolio homepage with hero, about, skills, projects, experience, education, and contact sections.
- Protected `/admin` dashboard for editing all portfolio data.
- Username/password login at `/admin/login`.
- HttpOnly cookie session authentication.
- JSON storage in the local `/data` folder, with automatic file creation if files are missing.
- Image uploads to `/public/uploads/images`.
- Resume PDF uploads to `/public/uploads/resume`.
- Server-side API routes for create, update, delete, uploads, login, logout, and session checks.

## Setup

Install dependencies:

```bash
npm install
```

Create `.env.local` from `.env.example`:

```env
ADMIN_USERNAME=vikassoni2018@gmail.com
ADMIN_PASSWORD=your-password-here
SESSION_SECRET=generate-a-long-random-secret
```

Use a strong `SESSION_SECRET`, at least 24 characters. Do not commit `.env.local`.

Run the development server:

```bash
npm run dev
```

Open:

- Public portfolio: `http://localhost:3000`
- Admin login: `http://localhost:3000/admin/login`

## Data Files

Portfolio data is stored in:

- `data/profile.json`
- `data/projects.json`
- `data/skills.json`
- `data/experience.json`
- `data/education.json`

Uploaded files are stored in:

- `public/uploads/images`
- `public/uploads/resume`

## Deployment Note

This project intentionally uses JSON files and local filesystem uploads instead of a database. Deploy it on a Node.js server or VPS where the filesystem is writable and persistent.

Vercel and other serverless deployments may not persist JSON file changes or uploaded files between deployments/runtime instances. For those platforms, use a database and object storage instead.

## API Overview

Public reads:

- `GET /api/profile`
- `GET /api/projects`
- `GET /api/skills`
- `GET /api/experience`
- `GET /api/education`

Protected writes:

- `PUT /api/profile`
- `POST /api/projects`
- `PUT /api/projects/:id`
- `DELETE /api/projects/:id`
- `POST /api/skills`
- `PUT /api/skills/:id`
- `DELETE /api/skills/:id`
- `POST /api/experience`
- `PUT /api/experience/:id`
- `DELETE /api/experience/:id`
- `POST /api/education`
- `PUT /api/education/:id`
- `DELETE /api/education/:id`
- `POST /api/upload/image`
- `POST /api/upload/resume`

Auth:

- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/session`

## Production

Build and start:

```bash
npm run build
npm run start
```
