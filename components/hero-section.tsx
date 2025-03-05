import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl xl:text-6xl/none">
                The Best Construction Service
              </h1>
              <p className="max-w-[600px] text-gray-300 md:text-xl">
                Building your dreams with precision, quality, and innovation. Trust our expert team to deliver
                exceptional construction services.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/contact">
                <Button size="lg" className="bg-yellow-500 text-black hover:bg-yellow-400">
                  Get Free Consultation
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  View Our Projects
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative h-[300px] lg:h-[400px] xl:h-[500px] overflow-hidden rounded-xl">
            <Image
              src="/placeholder.svg?height=500&width=800"
              alt="Construction site with modern equipment"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}

