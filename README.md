# ICONICS'26 Conference Website

Official website for the 5th International Conference on Innovations in Computer Science (ICONICS'26), hosted by NED University of Engineering & Technology, Karachi.

## 🎨 Design Features

- **Dark/Light Theme**: Toggle between dark and light modes
- **Smooth Animations**: Google Antigravity-inspired smoothness using Framer Motion
- **Premium UI**: Sophisticated minimalism with eye-catching micro-interactions
- **Custom Fonts**: Sora (headings), Inter (body), JetBrains Mono (accents)
- **Fully Responsive**: Mobile, tablet, and desktop optimized

## 🚀 Tech Stack

- **React 18** - UI Library
- **Vite 5** - Build Tool
- **Tailwind CSS 3.4** - Styling
- **Framer Motion** - Animations
- **React Router v6** - Routing
- **Lenis** - Smooth Scrolling

## 📦 Installation

```bash
npm install
```

## 🛠️ Development

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

## 🏗️ Build

```bash
npm run build
```

Build output will be in the `dist` folder.

## 🚢 Deploy to Vercel

### Option 1: Via Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Vite and configure settings
6. Click "Deploy"

### Option 2: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

## 📁 Project Structure

```
iconics-2026/
├── public/
│   ├── images/          # All images (speakers, banner, etc.)
│   └── favicon.png      # Add your favicon here
├── src/
│   ├── components/
│   │   ├── common/      # Reusable components
│   │   ├── layout/      # Navbar, Footer, etc.
│   │   ├── home/        # Home page sections
│   │   ├── speakers/    # Speaker components
│   │   └── animations/  # Animation components
│   ├── pages/           # Page components
│   ├── data/            # Static data (speakers, schedule, etc.)
│   ├── contexts/        # React contexts (Theme)
│   ├── hooks/           # Custom hooks
│   ├── App.jsx
│   └── main.jsx
├── vercel.json          # Vercel configuration
└── package.json
```

## 📄 Pages

✅ **Home** - Banner, Hero, About, Stats, Speakers Preview, Important Dates, CTA
✅ **About** - Conference overview, NED University, Past editions
✅ **Speakers** - 9 keynote speakers with detailed modals
✅ **Call for Papers** - 8 research tracks, submission guidelines
✅ **Schedule** - Day 1 & 2 conference timeline
✅ **Registration** - Pricing tiers, payment information
✅ **Committee** - Organizing & technical committees
✅ **Gallery** - Past conference photos (2016, 2018, 2022, 2024)
✅ **Contact** - Contact information and location map

## 🖼️ Images

All images are stored in `public/images/` and accessed via absolute paths:
- Speaker photos (9 speakers)
- Conference banner (Banner-4.png)
- NED University campus photo

## 📝 Important Notes

- **Favicon**: Add your ICONICS logo as `public/favicon.png` (recommended size: 512x512px)
- **Meta Tags**: Update the Vercel URL in `index.html` meta tags after deployment
- **Images**: All images must be in `public/images/` folder for proper deployment

## 🌐 Conference Details

**Date:** December 23-24, 2026
**Venue:** NED University of Engineering & Technology, Karachi, Pakistan
**Email:** secretary@nediconics.com
**Website:** www.nediconics.com

---

Built for ICONICS'26 🎓
