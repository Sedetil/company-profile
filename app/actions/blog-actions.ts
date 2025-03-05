"use server"

import { revalidatePath } from "next/cache"
import { supabase } from "@/lib/supabase"
import { redirect } from "next/navigation"

export async function getBlogPosts() {
  const { data, error } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching blog posts:", error)
    return []
  }

  return data
}

export async function getBlogPost(id: string) {
  const { data, error } = await supabase.from("blog_posts").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching blog post:", error)
    return null
  }

  return data
}

export async function createBlogPost(formData: FormData) {
  const title = formData.get("title") as string
  const slug = formData.get("slug") as string
  const content = formData.get("content") as string
  const excerpt = formData.get("excerpt") as string
  const tags = formData.get("tags") as string
  const image = formData.get("image") as string
  const author = formData.get("author") as string
  const published = formData.get("published") === "on"

  // Convert tags string to array
  const tagsArray = tags ? tags.split(",").map((tag) => tag.trim()) : []

  const { data, error } = await supabase
    .from("blog_posts")
    .insert([
      {
        title,
        slug,
        content,
        excerpt,
        tags: tagsArray,
        image,
        author,
        published_at: published ? new Date().toISOString() : null,
        created_at: new Date().toISOString(),
      },
    ])
    .select()

  if (error) {
    console.error("Error creating blog post:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/blog")
  revalidatePath("/admin/blog")
  redirect("/admin/blog")
}

export async function updateBlogPost(id: string, formData: FormData) {
  const title = formData.get("title") as string
  const slug = formData.get("slug") as string
  const content = formData.get("content") as string
  const excerpt = formData.get("excerpt") as string
  const tags = formData.get("tags") as string
  const image = formData.get("image") as string
  const author = formData.get("author") as string
  const published = formData.get("published") === "on"

  // Convert tags string to array
  const tagsArray = tags ? tags.split(",").map((tag) => tag.trim()) : []

  const { data, error } = await supabase
    .from("blog_posts")
    .update({
      title,
      slug,
      content,
      excerpt,
      tags: tagsArray,
      image,
      author,
      published_at: published ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()

  if (error) {
    console.error("Error updating blog post:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/blog")
  revalidatePath(`/blog/${slug}`)
  revalidatePath("/admin/blog")
  redirect("/admin/blog")
}

export async function deleteBlogPost(id: string) {
  const { error } = await supabase.from("blog_posts").delete().eq("id", id)

  if (error) {
    console.error("Error deleting blog post:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/blog")
  revalidatePath("/admin/blog")
  return { success: true }
}

