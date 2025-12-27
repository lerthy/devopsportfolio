# Journey Map CV Website

A modern, interactive CV website for Lerdi Salihi, built with Next.js, Tailwind CSS, and Framer Motion.

## Features

- 🗺️ Interactive journey map timeline showcasing career and education milestones
- 🎨 Beautiful animations with Framer Motion
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🌙 Dark mode support ("production mode")
- 🎯 Interactive stops with detailed cards
- ⚡ Smooth scrolling and transitions

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # React components
├── data/            # Journey stops data
└── lib/             # Utility functions
```

## Customization

- Update journey stops in `src/data/journeyData.ts`
- Modify social links in `src/components/Hero.tsx` and `src/components/Footer.tsx`
- Add your PDF CV to `public/cv.pdf`
- Customize colors in `tailwind.config.js`

## License

MIT

