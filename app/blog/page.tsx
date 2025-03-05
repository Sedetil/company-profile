import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { getBlogPosts } from "@/app/actions/blog-actions"
import { format } from "date-fns"

// Extracting categories and tags from blog posts
function extractCategoriesAndTags(posts) {
  const categories = ["All Categories"]
  const tagsSet = new Set()

  posts.forEach((post) => {
    if (post.category && !categories.includes(post.category)) {
      categories.push(post.category)
    }

    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach((tag) => tagsSet.add(tag))
    }
  })

  const popularTags = Array.from(tagsSet).slice(0, 8) // Limit to 8 popular tags

  return { categories, popularTags }
}

export default async function BlogPage() {
  const blogPosts = await getBlogPosts()
  const { categories, popularTags } = extractCategoriesAndTags(blogPosts)

  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-black text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Blog</h1>
            <p className="max-w-[700px] text-gray-300 md:text-xl/relaxed">
              Insights, tips, and news from the construction industry.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
            {/* Main Content */}
            <div>
              {blogPosts.length === 0 ? (
                <div className="text-center py-12">
                  <h2 className="text-xl font-bold">No blog posts yet</h2>
                  <p className="text-gray-500 mt-2">Check back soon for new content!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {blogPosts.map((post) => (
                    <Card key={post.id} className="overflow-hidden">
                      <div className="relative h-[200px]">
                        <Image
                          src={post.image_url || "/placeholder.svg?height=400&width=600"}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardHeader>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                          <span>{format(new Date(post.published_at || post.created_at), "MMMM d, yyyy")}</span>
                          <span>•</span>
                          <span>{post.author}</span>
                        </div>
                        <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                        <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                      </CardHeader>
                      <CardFooter className="flex flex-col items-start gap-2">
                        <div className="flex flex-wrap gap-2">
                          {post.tags &&
                            post.tags.map((tag) => (
                              <Badge key={tag} variant="outline">
                                {tag}
                              </Badge>
                            ))}
                        </div>
                        <Link href={`/blog/${post.slug}`} className="w-full">
                          <Button variant="outline" className="w-full mt-2">
                            Read More
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Search */}
              <Card>
                <CardHeader>
                  <CardTitle>Search</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-2">
                    <Input placeholder="Search articles..." />
                    <Button>Search</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Categories */}
              <Card>
                <CardHeader>
                  <CardTitle>Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {categories.map((category) => (
                      <li key={category}>
                        <Link
                          href={`/blog/category/${category.toLowerCase().replace(/\s+/g, "-")}`}
                          className="text-gray-700 hover:text-yellow-500"
                        >
                          {category}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Popular Tags */}
              <Card>
                <CardHeader>
                  <CardTitle>Popular Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag) => (
                      <Link key={tag} href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}>
                        <Badge variant="secondary">{tag}</Badge>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Posts */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Posts</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {blogPosts.slice(0, 3).map((post) => (
                      <li key={post.id} className="flex gap-3">
                        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                          <Image
                            src={post.image_url || "/placeholder.svg?height=100&width=100"}
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <Link href={`/blog/${post.slug}`} className="font-medium hover:text-yellow-500 line-clamp-2">
                            {post.title}
                          </Link>
                          <p className="text-sm text-gray-500">
                            {format(new Date(post.published_at || post.created_at), "MMMM d, yyyy")}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

