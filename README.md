<div align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="Logo" width="80" height="80">
  
  <h1 align="center">🎓 DiscoverEd</h1>
  
  <p align="center">
    <strong>A modern, full-stack College Discovery & Comparison Platform built with Next.js</strong>
    <br />
    <br />
    <a href="https://github.com/Anshul253/DiscoverEd/issues">Report Bug</a>
    ·
    <a href="https://github.com/Anshul253/DiscoverEd/issues">Request Feature</a>
  </p>

  <!-- Interactive UI Buttons using Shields.io -->
  <p align="center">
    <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FAnshul253%2FDiscoverEd">
      <img src="https://vercel.com/button" alt="Deploy with Vercel" />
    </a>
    &nbsp; &nbsp;
    <a href="https://discovered.vercel.app">
      <img src="https://img.shields.io/badge/View_Live_Demo-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="View Live Demo" />
    </a>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind" />
    <img src="https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white" alt="Prisma" />
    <img src="https://img.shields.io/badge/SQLite-003B57?style=flat-square&logo=sqlite&logoColor=white" alt="SQLite" />
  </p>
</div>

<hr />

## ✨ Features

* 🔍 **Smart Discovery**: Browse through top engineering colleges with rich, dynamic hero galleries featuring authentic campus photography.
* ⚖️ **Advanced Comparison**: Add colleges to your comparison tray and evaluate them side-by-side based on fees, ratings, and placement statistics.
* 🔖 **Save for Later**: Authenticated users can save their favorite colleges to their personalized dashboard.
* 🔐 **Secure Authentication**: Built-in credential-based authentication using NextAuth.
* ⚡ **Blazing Fast**: Optimized with Next.js 15 App Router, Turbopack, and automatic image optimizations.
* 📱 **Fully Responsive**: A beautiful glassmorphic dark-mode UI that works seamlessly across desktop and mobile devices.

<details>
<summary><b>📸 Click to see a sneak peek of the UI!</b></summary>

*(Add your awesome screenshots here)*
</details>

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (v18 or higher) and `npm` installed.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Anshul253/DiscoverEd.git
   cd DiscoverEd
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables**  
   Create a `.env` file in the root directory and add the necessary variables:
   ```env
   DATABASE_URL="file:./dev.db"
   NEXTAUTH_SECRET="your-super-secret-string"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Initialize the Database**
   ```bash
   npx prisma db push
   npx prisma db seed
   ```

5. **Run the Development Server**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🏗️ Deployment Architecture

DiscoverEd uses a modern full-stack architecture that makes deployment a breeze:
- **Frontend & APIs**: Deployed automatically to [Vercel](https://vercel.com).
- **Database**: When moving to production, migrate the local SQLite database to a managed PostgreSQL provider (like **Render**, Supabase, or Vercel Postgres).

Refer to our [`deployment_guide.md`](./deployment_guide.md) for detailed deployment instructions!

---

<div align="center">
  Built with ❤️ using Next.js
</div>
