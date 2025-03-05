import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, PenSquare, Eye } from "lucide-react"
import { getProjects } from "@/app/actions/portfolio-actions"
import { DeleteProjectButton } from "./delete-project-button"

export default async function PortfolioAdminPage() {
  const projects = await getProjects()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Portfolio Projects</h1>
        <Link href="/admin/portfolio/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </Link>
      </div>

      {projects.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <p className="text-gray-500">No projects found</p>
            <Link href="/admin/portfolio/new" className="mt-4">
              <Button>Add your first project</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              <div className="relative h-[200px]">
                <Image
                  src={project.images?.[0] || "/placeholder.svg?height=400&width=600"}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
                {project.is_featured && <Badge className="absolute top-2 right-2">Featured</Badge>}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold line-clamp-1">{project.title}</h3>
                <p className="text-sm text-gray-500">
                  {project.category} • {project.year}
                </p>
                <p className="mt-2 line-clamp-2 text-gray-700">{project.description}</p>

                <div className="flex justify-end gap-2 mt-4">
                  <Link href={`/portfolio/${project.slug}`} target="_blank">
                    <Button variant="ghost" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                  </Link>
                  <Link href={`/admin/portfolio/edit/${project.id}`}>
                    <Button variant="outline" size="sm">
                      <PenSquare className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                  </Link>
                  <DeleteProjectButton id={project.id} />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

