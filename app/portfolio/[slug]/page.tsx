import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft } from "lucide-react"
import { supabase } from "@/lib/supabase"

async function getProjectBySlug(slug: string) {
  const { data, error } = await supabase.from("projects").select("*").eq("slug", slug).single()

  if (error) {
    console.error("Error fetching project:", error)
    return null
  }

  return data
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug)

  if (!project) {
    notFound()
  }

  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 bg-black text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <Link href="/portfolio">
              <Button variant="outline" className="mb-4 border-white text-white hover:bg-white/10">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Portfolio
              </Button>
            </Link>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{project.title}</h1>
            <p className="max-w-[700px] text-gray-300 md:text-xl/relaxed">{project.description}</p>
          </div>
        </div>
      </section>

      <div className="container px-4 md:px-6 py-12">
        {/* Project Details */}
        <div className="grid gap-10 lg:grid-cols-[2fr_1fr] mb-12">
          {/* Main Content */}
          <div>
            {/* Featured Image */}
            {project.images && project.images.length > 0 && (
              <div className="relative h-[400px] overflow-hidden rounded-lg mb-6">
                <Image
                  src={project.images[0] || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Tabs for project details */}
            <Tabs defaultValue="overview">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="challenge">Challenge</TabsTrigger>
                <TabsTrigger value="solution">Solution</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-4">
                <div className="prose max-w-none lg:prose-lg">
                  <div className="whitespace-pre-wrap">{project.content}</div>
                </div>
              </TabsContent>
              <TabsContent value="challenge" className="mt-4">
                <div className="prose max-w-none lg:prose-lg">
                  <p>
                    Every construction project comes with its unique set of challenges. For this project, we had to
                    overcome various obstacles including site constraints, timeline pressures, and specific technical
                    requirements.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="solution" className="mt-4">
                <div className="prose max-w-none lg:prose-lg">
                  <p>
                    Our experienced team developed innovative solutions to address all challenges. Through careful
                    planning, expert execution, and regular communication with the client, we were able to deliver
                    exceptional results that exceeded expectations.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Project Info */}
          <div>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-lg mb-1">Client</h3>
                    <p>{project.client}</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Location</h3>
                    <p>{project.location}</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Year</h3>
                    <p>{project.year}</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Category</h3>
                    <p className="capitalize">{project.category}</p>
                  </div>
                  <div className="pt-4">
                    <Link href="/contact">
                      <Button className="w-full">Request Similar Project</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Project Gallery */}
        {project.images && project.images.length > 1 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Project Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.images.map((image, index) => (
                <div key={index} className="relative aspect-square overflow-hidden rounded-lg">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${project.title} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Projects (placeholder) */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Similar Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* This would be populated with actual related projects */}
            <Card>
              <CardContent className="p-0">
                <div className="relative h-[200px]">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Related project"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg">Similar Project 1</h3>
                  <p className="text-gray-500 mt-1">Another project in the {project.category} category.</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-0">
                <div className="relative h-[200px]">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Related project"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg">Similar Project 2</h3>
                  <p className="text-gray-500 mt-1">Another project in the {project.category} category.</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-0">
                <div className="relative h-[200px]">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Related project"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg">Similar Project 3</h3>
                  <p className="text-gray-500 mt-1">Another project in the {project.category} category.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}

