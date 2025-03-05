import { HeroSection } from "@/components/hero-section"
import { ServicesPreview } from "@/components/services-preview"
import { TestimonialsSection } from "@/components/testimonials-section"
import { StatsSection } from "@/components/stats-section"
import { CTASection } from "@/components/cta-section"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <HeroSection />
      <ServicesPreview />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  )
}

