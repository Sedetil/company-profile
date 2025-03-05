import { supabase } from "./supabase"

// Services
export async function getServices(featured = false) {
  const query = supabase.from("services").select("*").order("id")

  if (featured) {
    query.eq("is_featured", true)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching services:", error)
    return []
  }

  return data
}

export async function getServiceBySlug(slug: string) {
  const { data, error } = await supabase.from("services").select("*").eq("slug", slug).single()

  if (error) {
    console.error("Error fetching service:", error)
    return null
  }

  return data
}

// Projects
export async function getProjects(featured = false, category?: string) {
  let query = supabase.from("projects").select("*").order("id")

  if (featured) {
    query = query.eq("is_featured", true)
  }

  if (category && category !== "all") {
    query = query.eq("category", category)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching projects:", error)
    return []
  }

  return data
}

export async function getProjectBySlug(slug: string) {
  const { data, error } = await supabase.from("projects").select("*").eq("slug", slug).single()

  if (error) {
    console.error("Error fetching project:", error)
    return null
  }

  return data
}

// Blog Posts
export async function getBlogPosts(limit?: number) {
  let query = supabase
    .from("blog_posts")
    .select("*")
    .order("published_at", { ascending: false })
    .not("published_at", "is", null)

  if (limit) {
    query = query.limit(limit)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching blog posts:", error)
    return []
  }

  return data
}

export async function getBlogPostBySlug(slug: string) {
  const { data, error } = await supabase.from("blog_posts").select("*").eq("slug", slug).single()

  if (error) {
    console.error("Error fetching blog post:", error)
    return null
  }

  return data
}

// Messages
export async function submitContactForm(formData: {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}) {
  const { data, error } = await supabase.from("messages").insert([formData])

  if (error) {
    console.error("Error submitting contact form:", error)
    throw new Error("Failed to submit contact form")
  }

  return data
}

// Pages
export async function getPageContent(slug: string) {
  const { data, error } = await supabase.from("pages").select("*").eq("slug", slug).single()

  if (error) {
    console.error(`Error fetching page content for ${slug}:`, error)
    return null
  }

  return data
}

// Admin functions
export async function getMessages(isRead?: boolean) {
  let query = supabase.from("messages").select("*").order("created_at", { ascending: false })

  if (isRead !== undefined) {
    query = query.eq("is_read", isRead)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching messages:", error)
    return []
  }

  return data
}

export async function markMessageAsRead(id: number, isRead = true) {
  const { data, error } = await supabase.from("messages").update({ is_read: isRead }).eq("id", id)

  if (error) {
    console.error("Error updating message:", error)
    throw new Error("Failed to update message")
  }

  return data
}

