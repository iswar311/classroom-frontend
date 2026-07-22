<div align="center">
  <br />
  <img src="public/readme/readme-hero.webp" alt="Project Banner">
  <br />

  <div>
<img src="https://img.shields.io/badge/-React-61DAFB?style=for-the-badge&logo=React&logoColor=black" />
<img src="https://img.shields.io/badge/-Refine-42D7C3?style=for-the-badge&logo=Refine&logoColor=white" />
<img src="https://img.shields.io/badge/-Tailwind-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
<img src="https://img.shields.io/badge/-TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white" /> <br/>
<img src="https://img.shields.io/badge/-PostgreSQL-4169E1?style=for-the-badge&logo=PostgreSQL&logoColor=white" />
<img src="https://img.shields.io/badge/-NeonDB-00E599?style=for-the-badge&logo=Neon&logoColor=black" />
<img src="https://img.shields.io/badge/-Drizzle- C5F74F?style=for-the-badge&logo=Drizzle&logoColor=black" />
<img src="https://img.shields.io/badge/-Better--Auth-000?style=for-the-badge&logo=Auth0&logoColor=white" /> <br/>
<img src="https://img.shields.io/badge/-Cloudinary-3448C5?style=for-the-badge&logo=Cloudinary&logoColor=white" />
<img src="https://img.shields.io/badge/-Arcjet-34388F?style=for-the-badge&logo=Arcjet&logoColor=white" />
<img src="https://img.shields.io/badge/-Site24x7-26CD66?style=for-the-badge&logo=Site24x7&logoColor=white" />
<img src="https://img.shields.io/badge/-CodeRabbit-FC5D13?style=for-the-badge&logo=CodeRabbit&logoColor=white" />
  </div>

  <h3 align="center">(Frontend) University Dashboard Management</h3>
</div>

## 📋 <a name="table">Table of Contents</a>

1. ✨ [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)

## <a name="introduction">✨ Introduction</a>

A high-performance PERN stack (PostgreSQL, Express, React, Node.js) academic hub. This multi-role system (Admin, Teacher, Student) utilizes a decoupled architecture where an Express/Node.js backend serves a modular React frontend powered by Refine. By leveraging PostgreSQL (Neon) with Drizzle ORM, it ensures type-safe data integrity for class management, automated scheduling, and real-time analytics. Secure access is managed via Better-Auth and Arcjet, providing a robust, controlled-access environment for campus operations.

This repository contains the frontend application only and works with the matching backend in `classroom-backend`.

### Project details

- Multi-role dashboards for Admin, Teacher, and Student roles
- Refine-powered pages for classes, subjects, departments, users, and analytics
- Cloudinary media upload integration for profile and asset handling
- Secure login and signup flows with customer-facing UX
- Reusable shadcn/ui + Tailwind CSS components for responsive design

## <a name="tech-stack">⚙️ Tech Stack</a>

### Frontend Stack

- **React**
- **Refine**
- **shadcn/ui**
- **Tailwind CSS**
- **TypeScript**
- **Zod**

### Dev Tools

- **CodeRabbit**
- **Site24x7**

## <a name="features">🔋 Features</a>

- Multi-role access control for Admin, Teacher, and Student dashboards
- Central class, subject, department, and user management
- Cloudinary media uploads for profiles and assets
- Secure authentication and route protection
- Responsive UI built with Refine, Tailwind CSS, and shadcn/ui

## <a name="quick-start">🤸 Quick Start</a>

**Prerequisites**

- Git
- Node.js
- npm

**Cloning the Repository**

```bash
git clone https://github.com/iswar311/classroom-frontend.git
cd classroom-frontend
```

**Installation**

```bash
npm install
```

**Set Up Environment Variables**

Create a `.env` file in the root:

```env
VITE_BACKEND_BASE_URL="http://localhost:8000/api/"
VITE_CLOUDINARY_CLOUD_NAME=
VITE_CLOUDINARY_UPLOAD_PRESET=
VITE_CLOUDINARY_UPLOAD_URL=
```

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Learn More about Refine

This frontend app is built with Refine. Learn more at [https://refine.dev/docs](https://refine.dev/docs).
