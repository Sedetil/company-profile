"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"
import { createBlogPost, updateBlogPost } from "@/app/actions/blog-actions"

interface BlogFormProps {
  blogPost?: any // This would be better typed
  isEditing?: boolean
}

export function BlogForm({ blogPost, isEditing = false }: BlogFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formState, setFormState] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    tags: "",
    image: "",
    author: "",
    published: false,
  })

  useEffect(() => {
    if (blogPost && isEditing) {
      setFormState({
        title: blogPost.title || "",
        slug: blogPost.slug || "",
        content: blogPost.content || "",
        excerpt: blogPost.excerpt || "",
        tags: blogPost.tags ? blogPost.tags.join(", ") : "",
        image: blogPost.image || "",
        author: blogPost.author || "",
        published: !!blogPost.published_at,
      })
    }
  }, [blogPost, isEditing])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormState((prev) => ({ ...prev, published: checked }))
  }

  const generateSlug = () => {
    if (formState.title) {
      const slug = formState.title
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-")

      setFormState((prev) => ({ ...prev, slug }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData()
      Object.entries(formState).forEach(([key, value]) => {
        if (key === "published") {
          if (value) formData.append(key, "on")
        } else {
          formData.append(key, value.toString())
        }
      })

      if (isEditing && blogPost?.id) {
        await updateBlogPost(blogPost.id.toString(), formData)
        toast({
          title: "Blog post updated",
          description: "The blog post has been updated successfully.",
        })
      } else {
        await createBlogPost(formData)
        toast({
          title: "Blog post created",
          description: "The blog post has been created successfully.",
        })
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Error",
        description: "There was a problem saving the blog post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Blog Post" : "Create New Blog Post"}</CardTitle>
        <CardDescription>
          Fill out the form below to {isEditing ? "update the" : "create a new"} blog post.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" value={formState.title} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <div className="flex gap-2">
              <Input id="slug" name="slug" value={formState.slug} onChange={handleChange} required />
              <Button type="button" variant="outline" onClick={generateSlug}>
                Generate
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea id="excerpt" name="excerpt" value={formState.excerpt} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              name="content"
              value={formState.content}
              onChange={handleChange}
              className="min-h-[200px]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input
              id="tags"
              name="tags"
              value={formState.tags}
              onChange={handleChange}
              placeholder="technology, design, innovation"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              name="image"
              value={formState.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="author">Author</Label>
            <Input id="author" name="author" value={formState.author} onChange={handleChange} required />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="published" checked={formState.published} onCheckedChange={handleCheckboxChange} />
            <Label htmlFor="published">Publish this post</Label>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : isEditing ? "Update" : "Create"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

