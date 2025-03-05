import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-yellow-500">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter text-black sm:text-5xl">Ready to Start Your Project?</h2>
            <p className="max-w-[900px] text-black md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Contact us today for a free consultation and quote. Let's build something great together.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Link href="/contact">
              <Button size="lg" className="bg-black text-white hover:bg-gray-800">
                Get Free Consultation
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button size="lg" variant="outline" className="border-black text-black hover:bg-black/10">
                View Our Projects
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

