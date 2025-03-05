import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Hammer, Building2, Ruler, Truck, HardHat, PaintBucket, Shovel } from "lucide-react"

const services = [
  {
    title: "Residential Construction",
    description: "Custom homes and renovations tailored to your lifestyle and preferences.",
    icon: Building2,
    link: "/services/residential",
    features: ["Custom home building", "Home renovations", "Additions", "Basement finishing"],
  },
  {
    title: "Commercial Construction",
    description: "Office buildings, retail spaces, and industrial facilities built to specification.",
    icon: Building2,
    link: "/services/commercial",
    features: ["Office buildings", "Retail spaces", "Industrial facilities", "Tenant improvements"],
  },
  {
    title: "Renovation & Remodeling",
    description: "Transform your existing space with our expert renovation services.",
    icon: Hammer,
    link: "/services/renovation",
    features: ["Kitchen remodeling", "Bathroom renovations", "Whole house renovations", "Historic restorations"],
  },
  {
    title: "Construction Management",
    description: "Professional oversight of your construction project from start to finish.",
    icon: HardHat,
    link: "/services/management",
    features: ["Project planning", "Budget management", "Schedule coordination", "Quality control"],
  },
  {
    title: "Architectural Design",
    description: "Creative and functional designs that bring your vision to life.",
    icon: Ruler,
    link: "/services/design",
    features: ["Concept development", "3D modeling", "Blueprint creation", "Permit assistance"],
  },
  {
    title: "Equipment Rental",
    description: "High-quality construction equipment available for rent.",
    icon: Truck,
    link: "/services/equipment",
    features: ["Heavy machinery", "Power tools", "Scaffolding", "Temporary structures"],
  },
  {
    title: "Painting & Finishing",
    description: "Professional painting and finishing services for interior and exterior surfaces.",
    icon: PaintBucket,
    link: "/services/painting",
    features: ["Interior painting", "Exterior painting", "Specialty finishes", "Cabinet refinishing"],
  },
  {
    title: "Excavation & Site Work",
    description: "Site preparation, excavation, and grading services for construction projects.",
    icon: Shovel,
    link: "/services/excavation",
    features: ["Site clearing", "Foundation excavation", "Grading", "Drainage solutions"],
  },
]

export default function ServicesPage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-black text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Services</h1>
            <p className="max-w-[700px] text-gray-300 md:text-xl/relaxed">
              Comprehensive construction services tailored to meet your specific needs.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Card key={service.title} className="transition-all hover:shadow-lg">
                <CardHeader>
                  <service.icon className="h-10 w-10 text-yellow-500 mb-2" />
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-1">
                    {service.features.map((feature, index) => (
                      <li key={index} className="text-gray-500">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href={service.link} className="w-full">
                    <Button variant="outline" className="w-full">
                      Learn More
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 bg-yellow-500">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter text-black sm:text-4xl">Need a Custom Solution?</h2>
              <p className="max-w-[600px] text-black md:text-xl/relaxed">
                Contact us today to discuss your specific project requirements.
              </p>
            </div>
            <Link href="/contact">
              <Button size="lg" className="bg-black text-white hover:bg-gray-800">
                Request a Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

