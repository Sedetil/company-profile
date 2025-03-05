import { Hammer, Building2, Ruler, Truck, HardHat, Wrench } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Map of icon names to Lucide icon components
const iconMap = {
  Building2: Building2,
  Hammer: Hammer,
  Ruler: Ruler,
  Truck: Truck,
  HardHat: HardHat,
  Wrench: Wrench,
}

export async function ServicesPreview() {
  // This would be replaced with actual data fetching
  const services = await getServices(true) // Get featured services

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Services</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We offer a comprehensive range of construction services to meet all your building needs.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
          {services.map((service) => {
            // Get the icon component from the map, or default to Building2
            const IconComponent = service.icon && iconMap[service.icon] ? iconMap[service.icon] : Building2

            return (
              <Card key={service.id} className="transition-all hover:shadow-lg">
                <CardHeader>
                  <IconComponent className="h-10 w-10 text-yellow-500 mb-2" />
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link href={`/services/${service.slug}`} className="w-full">
                    <Button variant="outline" className="w-full">
                      Learn More
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            )
          })}
        </div>
        <div className="flex justify-center mt-8">
          <Link href="/services">
            <Button size="lg" className="bg-yellow-500 text-black hover:bg-yellow-400">
              View All Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

// Helper function to fetch services
async function getServices(featured = false) {
  // This would be replaced with actual data fetching from Supabase
  // For now, return mock data
  return [
    {
      id: 1,
      title: "Residential Construction",
      description: "Custom homes and renovations tailored to your lifestyle and preferences.",
      icon: "Building2",
      slug: "residential",
    },
    {
      id: 2,
      title: "Commercial Construction",
      description: "Office buildings, retail spaces, and industrial facilities built to specification.",
      icon: "Building2",
      slug: "commercial",
    },
    {
      id: 3,
      title: "Renovation & Remodeling",
      description: "Transform your existing space with our expert renovation services.",
      icon: "Hammer",
      slug: "renovation",
    },
    {
      id: 4,
      title: "Construction Management",
      description: "Professional oversight of your construction project from start to finish.",
      icon: "HardHat",
      slug: "management",
    },
    {
      id: 5,
      title: "Architectural Design",
      description: "Creative and functional designs that bring your vision to life.",
      icon: "Ruler",
      slug: "design",
    },
    {
      id: 6,
      title: "Equipment Rental",
      description: "High-quality construction equipment available for rent.",
      icon: "Truck",
      slug: "equipment",
    },
  ]
}

