import { PortfolioForm } from "../../portfolio-form"
import { getProject } from "@/app/actions/portfolio-actions"
import { notFound } from "next/navigation"

interface PageProps {
  params: {
    id: string
  }
}

export default async function EditProjectPage({ params }: PageProps) {
  const project = await getProject(params.id)

  if (!project) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Edit Project</h1>
      <PortfolioForm project={project} isEditing={true} />
    </div>
  )
}

