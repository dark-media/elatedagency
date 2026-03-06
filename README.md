# Elated Agency

AI-powered OnlyFans management agency. Built with Next.js, Prisma, and NextAuth.js.

## Tech Stack

- **Framework:** Next.js 16 (App Router, TypeScript)
- **Styling:** Tailwind CSS v4
- **Database:** Prisma (SQLite dev / PostgreSQL production)
- **Auth:** NextAuth.js (JWT strategy)
- **Animations:** Framer Motion
- **Email:** Nodemailer (Gmail SMTP)

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your values

# Generate Prisma client & push schema
npx prisma generate
npx prisma db push

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Environment Variables

Copy `.env.example` to `.env` and fill in:

- `DATABASE_URL` — Database connection string
- `NEXTAUTH_SECRET` — Random secret for JWT signing
- `NEXTAUTH_URL` — Your site URL
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` — Email configuration
- `NEXT_PUBLIC_SITE_URL` — Public-facing URL

## Deployment

Deploy to Vercel:

```bash
npm run build
```

For production, switch the Prisma datasource to PostgreSQL and update `DATABASE_URL`.
