import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, PenSquare, Eye } from "lucide-react"
import { getBlogPosts } from "@/app/actions/blog-actions"
import { format } from "date-fns"
import { DeletePostButton } from "./delete-post-button"

export default async function BlogAdminPage() {
  const posts = await getBlogPosts()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Blog Posts</h1>
        <Link href="/admin/blog/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Button>
        </Link>
      </div>

      {posts.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <p className="text-gray-500">No blog posts found</p>
            <Link href="/admin/blog/new" className="mt-4">
              <Button>Create your first post</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id}>
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold">{post.title}</h3>
                    <p className="text-sm text-gray-500">
                      {post.published_at
                        ? `Published on ${format(new Date(post.published_at), "MMMM d, yyyy")}`
                        : "Draft"}
                    </p>
                  </div>
                  <Badge variant={post.published_at ? "default" : "outline"}>
                    {post.published_at ? "Published" : "Draft"}
                  </Badge>
                </div>

                <p className="mt-2 line-clamp-2 text-gray-700">{post.excerpt}</p>

                <div className="flex flex-wrap gap-2 mt-2">
                  {post.tags &&
                    post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  <Link href={`/blog/${post.slug}`} target="_blank">
                    <Button variant="ghost" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                  </Link>
                  <Link href={`/admin/blog/edit/${post.id}`}>
                    <Button variant="outline" size="sm">
                      <PenSquare className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                  </Link>
                  <DeletePostButton id={post.id} />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

