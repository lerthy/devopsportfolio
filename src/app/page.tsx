import Hero from '@/components/Hero'
import JourneyTimeline from '@/components/JourneyTimeline'
import RecommendationsWall from '@/components/RecommendationsWall'
import Footer from '@/components/Footer'
import ThemeToggle from '@/components/ThemeToggle'

export default function Home() {
  return (
    <main className="min-h-screen">
      <ThemeToggle />
      <Hero />
      <JourneyTimeline />
      <RecommendationsWall />
      <Footer />
    </main>
  )
}

