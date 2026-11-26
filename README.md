# EquipShare - Equipment Rental Platform

EquipShare is a full-stack community-driven equipment rental platform where owners can list their equipment for rent and customers can browse, book, and rent equipment. The platform includes secure online payments, role-based dashboards, and administrative management.

**Live Site URL:** [https://equipshare-client-geu9.vercel.app](https://equipshare-client-geu9.vercel.app)

## Key Features

- 🔐 **Secure Authentication:** Email/Password and Google login powered by BetterAuth and MongoDB, with JWT-protected Express APIs.
- 👥 **Role-Based Access Control (RBAC):** Distinct dashboards and permissions for Customers, Equipment Owners, and Admins.
- 📅 **Equipment Management:** Owners can list equipment with images (imgbb), manage their inventory, and approve rental requests.
- 🔍 **Advanced Search & Filtering:** Server-side search, category filtering, rental type filtering, and sorting on the All Equipment page.
- 💳 **Secure Payments:** Integrated Stripe Payment Gateway for seamless rental bookings and transactions.
- 📊 **Dashboard Analytics:** Visual charts and statistics for Admin and Owner dashboards.
- 🌗 **Dark/Light Mode:** A seamless theme toggling experience across the application.
- 📱 **Fully Responsive:** Mobile-first design ensuring the platform works perfectly on all devices.

## Tech Stack

- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS, ShadCN UI, Framer Motion
- **Backend:** Express JS, TypeScript, MongoDB (MongoDB Driver), JWT
- **Authentication:** BetterAuth (MongoDB Adapter)
- **Payment Gateway:** Stripe
- **Image Hosting:** imgBB API

## NPM Packages Used

### Client Side

- `next`, `react`, `react-dom`
- `better-auth`, `mongodb`
- `framer-motion` (for animations)
- `lucide-react` (for icons)
- `recharts` (for dashboard analytics)
- `tailwindcss`, `shadcn/ui` components

### Server Side

- `express`, `cors`, `dotenv`
- `mongodb` (native driver)
- `jsonwebtoken` (for JWT authentication)
- `stripe` (for payment processing)
- `tsx`, `typescript` (for development)

## Admin Credentials

- **Email:** test1@example.com
- **Password:** (your password)

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up `.env.local` with required environment variables
4. Run the development server: `npm run dev`
