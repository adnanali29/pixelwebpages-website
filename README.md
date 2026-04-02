# Pixel WebPages - Next.js Application

Modern, high-performance portfolio website built with Next.js 14, TypeScript, Tailwind CSS, and Supabase.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit [http://localhost:3000](http://localhost:3000) to see your site!

## 📋 Features

- ✨ Modern brutalist design with vibrant colors
- ⚡ Server-side rendering with Next.js 14
- 🗄️ Supabase PostgreSQL database
- 🎨 Tailwind CSS v4 for styling
- 📱 Fully responsive design
- 🔒 Type-safe with TypeScript
- 📊 Google Analytics integration
- 📧 Contact form with Formspree

## 🛠️ Tech Stack

- **Framework**: Next.js 16.1.6
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **Database**: Supabase
- **Deployment**: Vercel-ready

## 📁 Project Structure

```
├── app/              # Next.js pages
├── components/       # React components
├── lib/              # Utilities and configs
├── public/           # Static assets
└── .env.local        # Environment variables
```

## 🌐 Pages

- `/` - Home page with hero, features, projects, testimonials
- `/about` - Team members and mission
- `/products` - SaaS products showcase
- `/services` - Services offered
- `/blogs` - Blog posts
- `/contact` - Contact form

## 🔐 Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_FORMSPREE_ID=your_formspree_id
NEXT_PUBLIC_GA_ID=your_google_analytics_id
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 📦 Database

The project uses Supabase with the following tables:
- `projects` - Portfolio projects
- `testimonials` - Client testimonials
- `team_members` - Team information
- `products` - SaaS products
- `services` - Services offered
- `blogs` - Blog posts
- `contact_submissions` - Form submissions
- `admin_settings` - Admin configuration

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import repository in Vercel
3. Add environment variables
4. Deploy!

## 📝 License

© 2025 Pixel WebPages. All rights reserved.

## 🤝 Contributing

Built with ❤️ by the Pixel WebPages team.
