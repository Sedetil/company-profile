import { BlogForm } from "../blog-form"

export default function NewBlogPostPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Create New Blog Post</h1>
      <BlogForm />
    </div>
  )
}

