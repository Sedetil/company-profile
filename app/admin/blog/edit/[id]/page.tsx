import { BlogForm } from "../../blog-form"
import { getBlogPost } from "@/app/actions/blog-actions"
import { notFound } from "next/navigation"

interface PageProps {
  params: {
    id: string
  }
}

export default async function EditBlogPostPage({ params }: PageProps) {
  const blogPost = await getBlogPost(params.id)

  if (!blogPost) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Edit Blog Post</h1>
      <BlogForm blogPost={blogPost} isEditing={true} />
    </div>
  )
}

