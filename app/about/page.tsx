import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Target, Award } from "lucide-react"

const teamMembers = [
  {
    name: "John Smith",
    position: "CEO & Founder",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "Sarah Johnson",
    position: "Chief Architect",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "Michael Brown",
    position: "Project Manager",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "Emily Davis",
    position: "Interior Designer",
    image: "/placeholder.svg?height=300&width=300",
  },
]

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-black text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">About Us</h1>
            <p className="max-w-[700px] text-gray-300 md:text-xl/relaxed">
              Learn about our company, our mission, and the team behind our success.
            </p>
          </div>
        </div>
      </section>

      {/* Company History */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter">Our Story</h2>
              <p className="text-gray-500 md:text-xl/relaxed">
                Founded in 2003, The Best Construction Service began as a small family business with a passion for
                quality craftsmanship and customer satisfaction. Over the years, we've grown into one of the region's
                most trusted construction companies, delivering exceptional results for residential and commercial
                clients alike.
              </p>
              <p className="text-gray-500 md:text-xl/relaxed">
                Our journey has been marked by a commitment to excellence, innovation, and integrity in every project we
                undertake. From humble beginnings to award-winning projects, our dedication to quality has remained
                unwavering.
              </p>
            </div>
            <div className="relative h-[400px] overflow-hidden rounded-xl">
              <Image src="/placeholder.svg?height=400&width=600" alt="Company history" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:gap-12">
            <Card className="bg-white">
              <CardContent className="p-6">
                <Target className="h-12 w-12 text-yellow-500 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Our Mission</h3>
                <p className="text-gray-500">
                  To deliver exceptional construction services that exceed client expectations, while maintaining the
                  highest standards of quality, safety, and integrity in every project we undertake.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardContent className="p-6">
                <Award className="h-12 w-12 text-yellow-500 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Our Vision</h3>
                <p className="text-gray-500">
                  To be the leading construction company in the region, recognized for our innovation, quality
                  craftsmanship, and commitment to building sustainable structures that stand the test of time.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Meet Our Team</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our experienced professionals are dedicated to bringing your vision to life.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-8">
            {teamMembers.map((member) => (
              <Card key={member.name} className="overflow-hidden">
                <div className="relative h-[300px]">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <CardContent className="p-4 text-center">
                  <h3 className="font-bold">{member.name}</h3>
                  <p className="text-gray-500">{member.position}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

