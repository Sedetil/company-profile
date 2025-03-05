import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Calendar, User } from "lucide-react"
import { format } from "date-fns"
import { supabase } from "@/lib/supabase"

async function getBlogPostBySlug(slug: string) {
  const { data, error } = await supabase.from("blog_posts").select("*").eq("slug", slug).single()

  if (error) {
    console.error("Error fetching blog post:", error)
    return null
  }

  return data
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 bg-black text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <Link href="/blog">
              <Button variant="outline" className="mb-4 border-white text-white hover:bg-white/10">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{post.title}</h1>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-300">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.published_at || post.created_at}>
                  {format(new Date(post.published_at || post.created_at), "MMMM d, yyyy")}
                </time>
              </div>
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container px-4 md:px-6 py-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
          {/* Main Content */}
          <div>
            {/* Featured Image */}
            {post.image_url && (
              <div className="relative mb-6 h-[400px] overflow-hidden rounded-lg">
                <Image src={post.image_url || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
              </div>
            )}

            {/* Content */}
            <article className="prose max-w-none lg:prose-lg">
              <div className="whitespace-pre-wrap">{post.content}</div>
            </article>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-bold mb-2">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link key={tag} href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}>
                      <Badge variant="secondary">{tag}</Badge>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Related Posts (placeholder) */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">You might also like</h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {/* This would be populated with actual related posts */}
                <Card>
                  <CardHeader>
                    <CardTitle className="line-clamp-2">Placeholder for related post</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-3 text-gray-500">
                      This would be a related blog post based on similar tags or categories.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="line-clamp-2">Placeholder for related post</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-3 text-gray-500">
                      This would be a related blog post based on similar tags or categories.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Author Info */}
            <Card>
              <CardHeader>
                <CardTitle>About the Author</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center text-center">
                  <div className="h-24 w-24 rounded-full bg-gray-200 mb-4"></div>
                  <h3 className="font-bold">{post.author}</h3>
                  <p className="text-gray-500 mt-2">Construction expert with years of industry experience.</p>
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <Card className="bg-yellow-500">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-black mb-2">Need a consultation?</h3>
                <p className="text-black mb-4">Contact us today to discuss your construction needs.</p>
                <Link href="/contact">
                  <Button className="w-full bg-black text-white hover:bg-gray-800">Contact Us</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}

