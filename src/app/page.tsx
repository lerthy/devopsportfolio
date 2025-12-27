import Hero from '@/components/Hero'
import JourneyTimeline from '@/components/JourneyTimeline'
import RecommendationsWall from '@/components/RecommendationsWall'
import MiniTerminal from '@/components/MiniTerminal'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import ThemeToggle from '@/components/ThemeToggle'

export default function Home() {
  return (
    <main className="min-h-screen">
      <ThemeToggle />
      <Hero />
      <JourneyTimeline />
      <RecommendationsWall />
      <MiniTerminal />
      <ContactSection />
      <Footer />
    </main>
  )
}

