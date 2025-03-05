"use server"

import { revalidatePath } from "next/cache"
import { supabase } from "@/lib/supabase"
import { redirect } from "next/navigation"

export async function getProjects() {
  const { data, error } = await supabase.from("projects").select("*").order("id", { ascending: false })

  if (error) {
    console.error("Error fetching projects:", error)
    return []
  }

  return data
}

export async function getProject(id: string) {
  const { data, error } = await supabase.from("projects").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching project:", error)
    return null
  }

  return data
}

export async function createProject(formData: FormData) {
  const title = formData.get("title") as string
  const slug = formData.get("slug") as string
  const description = formData.get("description") as string
  const content = formData.get("content") as string
  const category = formData.get("category") as string
  const client = formData.get("client") as string
  const year = formData.get("year") as string
  const location = formData.get("location") as string
  const images = formData.get("images") as string
  const featured = formData.get("featured") === "on"

  // Convert images string to array
  const imagesArray = images ? images.split(",").map((image) => image.trim()) : []

  const { data, error } = await supabase
    .from("projects")
    .insert([
      {
        title,
        slug,
        description,
        content,
        category,
        client,
        year,
        location,
        images: imagesArray,
        is_featured: featured,
        created_at: new Date().toISOString(),
      },
    ])
    .select()

  if (error) {
    console.error("Error creating project:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/portfolio")
  revalidatePath("/admin/portfolio")
  redirect("/admin/portfolio")
}

export async function updateProject(id: string, formData: FormData) {
  const title = formData.get("title") as string
  const slug = formData.get("slug") as string
  const description = formData.get("description") as string
  const content = formData.get("content") as string
  const category = formData.get("category") as string
  const client = formData.get("client") as string
  const year = formData.get("year") as string
  const location = formData.get("location") as string
  const images = formData.get("images") as string
  const featured = formData.get("featured") === "on"

  // Convert images string to array
  const imagesArray = images ? images.split(",").map((image) => image.trim()) : []

  const { data, error } = await supabase
    .from("projects")
    .update({
      title,
      slug,
      description,
      content,
      category,
      client,
      year,
      location,
      images: imagesArray,
      is_featured: featured,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()

  if (error) {
    console.error("Error updating project:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/portfolio")
  revalidatePath(`/portfolio/${slug}`)
  revalidatePath("/admin/portfolio")
  redirect("/admin/portfolio")
}

export async function deleteProject(id: string) {
  const { error } = await supabase.from("projects").delete().eq("id", id)

  if (error) {
    console.error("Error deleting project:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/portfolio")
  revalidatePath("/admin/portfolio")
  return { success: true }
}

