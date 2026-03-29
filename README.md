# Real Estate Management Platform — Fullstack Challenge

![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.x-38bdf8?style=for-the-badge&logo=tailwind-css)
![Prisma](https://img.shields.io/badge/Prisma-7.5-2d3748?style=for-the-badge&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16.x-336791?style=for-the-badge&logo=postgresql)

A high-performance, full-stack real estate listing management application designed for brokers and agents. Built with **Next.js 16 (App Router)**, **Prisma ORM (v7)**, and **React 19**, focusing on scalability, security, and a premium user experience.

---

## 🌟 Key Features

- **🔐 Robust Authentication**: Secure user authentication using **NextAuth.js** with Credentials provider and bcrypt password hashing.
- **🏡 Property Management**: Full CRUD capabilities for property listings, including detailed metadata (beds, baths, suburb, property type, price indexing).
- **🏗️ Role-Based Access Control**:
  - **Admins**: Full control over all listings, access to internal notes, and owner's contact information.
  - **Agents**: Manage their assigned listings and contribute to the property database.
- **🚀 Advanced Search & Filters**: High-performance querying using database indices on price, suburb, property type, and beds.
- **🪄 Premium UI/UX**:
  - Built with **Tailwind CSS 4** for futuristic styling.
  - Fluid animations via **Framer Motion**.
  - Accessible components from **Radix UI** and **Shadcn**.
  - Optimized images and modern typography via `next/font`.

---

## 🛠️ Tech Stack

| Domain | Technology |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript |
| **UI Components** | Radix UI, Shadcn, Lucide |
| **Styling** | Tailwind CSS 4, Framer Motion |
| **Database** | PostgreSQL |
| **ORM** | Prisma 7.5 |
| **Auth** | NextAuth.js |

---

## 🚀 Getting Started

### 1. Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (Version 20 or higher)
- [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/) (Local or Managed instance like Neon/Supabase)

### 2. Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd fullstack-mid
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory and configure the following variables:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/db_name?schema=public"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_secure_random_string"
ADMIN_EMAIL="admin@broker.com"
```

### 4. Database Setup (Prisma)

Synchronize the database schema and generate the Prisma Client:

```bash
# Push schema to the database
npx prisma db push

# Generate Prisma Client
npx prisma generate
```

### 5. Seed Initial Data

Populate the database with test users and listings as defined in `prisma/seed.ts`:

```bash
npx prisma db seed
```

---

## 🖥️ Running the Application

Start the development server:

```bash
npm run dev
```

The application will be accessible at [http://localhost:3000](http://localhost:3000).

---

## 🔑 Default Credentials (Development Only)

After running the seed script, you can log in with the following accounts (Password for all: `password123`):

| Role | Email |
| :--- | :--- |
| **Admin Manager** | `admin@broker.com` |
| **Sarah Broker** (Agent) | `sarah@broker.com` |
| **John Realtor** (Agent) | `john@broker.com` |
| **Guest User** | `guest@broker.com` |

---

## 📂 Project Structure (Key Directories)

- `app/` - Next.js App Router (Pages, API Routes, Layouts)
- `components/` - Reusable UI components (Shadcn, Custom)
- `lib/` - Shared utilities, database connection (`db.tsx`)
- `prisma/` - Database schema, migrations, and seed script
- `public/` - Static assets

---

