import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getProjects } from "@/app/actions/portfolio-actions"

export default async function PortfolioPage() {
  const projects = await getProjects()

  // Get unique categories for tabs
  const categories = ["all"]
  projects.forEach((project) => {
    if (project.category && !categories.includes(project.category)) {
      categories.push(project.category)
    }
  })

  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-black text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Portfolio</h1>
            <p className="max-w-[700px] text-gray-300 md:text-xl/relaxed">
              Explore our completed projects and see the quality of our work firsthand.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Grid with Filtering */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          {projects.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-xl font-bold">No projects yet</h2>
              <p className="text-gray-500 mt-2">Check back soon to see our portfolio!</p>
            </div>
          ) : (
            <Tabs defaultValue="all" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList>
                  {categories.map((category) => (
                    <TabsTrigger key={category} value={category}>
                      {category === "all" ? "All Projects" : category.charAt(0).toUpperCase() + category.slice(1)}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <TabsContent value="all" className="mt-0">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </TabsContent>

              {categories
                .filter((c) => c !== "all")
                .map((category) => (
                  <TabsContent key={category} value={category} className="mt-0">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {projects
                        .filter((project) => project.category === category)
                        .map((project) => (
                          <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                  </TabsContent>
                ))}
            </Tabs>
          )}
        </div>
      </section>
    </main>
  )
}

function ProjectCard({ project }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-[250px]">
        <Image
          src={project.images?.[0] || "/placeholder.svg?height=400&width=600"}
          alt={project.title}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="font-medium">Client</p>
            <p className="text-gray-500">{project.client}</p>
          </div>
          <div>
            <p className="font-medium">Year</p>
            <p className="text-gray-500">{project.year}</p>
          </div>
          <div>
            <p className="font-medium">Location</p>
            <p className="text-gray-500">{project.location}</p>
          </div>
          <div>
            <p className="font-medium">Category</p>
            <p className="text-gray-500 capitalize">{project.category}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/portfolio/${project.slug}`} className="w-full">
          <Button variant="outline" className="w-full">
            View Project Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

