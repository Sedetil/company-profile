"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"
import { createProject, updateProject } from "@/app/actions/portfolio-actions"

interface PortfolioFormProps {
  project?: any // This would be better typed
  isEditing?: boolean
}

export function PortfolioForm({ project, isEditing = false }: PortfolioFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formState, setFormState] = useState({
    title: "",
    slug: "",
    description: "",
    content: "",
    category: "",
    client: "",
    year: "",
    location: "",
    images: "",
    featured: false,
  })

  useEffect(() => {
    if (project && isEditing) {
      setFormState({
        title: project.title || "",
        slug: project.slug || "",
        description: project.description || "",
        content: project.content || "",
        category: project.category || "",
        client: project.client || "",
        year: project.year || "",
        location: project.location || "",
        images: project.images ? project.images.join(", ") : "",
        featured: !!project.is_featured,
      })
    }
  }, [project, isEditing])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormState((prev) => ({ ...prev, category: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormState((prev) => ({ ...prev, featured: checked }))
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
        if (key === "featured") {
          if (value) formData.append(key, "on")
        } else {
          formData.append(key, value.toString())
        }
      })

      if (isEditing && project?.id) {
        await updateProject(project.id.toString(), formData)
        toast({
          title: "Project updated",
          description: "The project has been updated successfully.",
        })
      } else {
        await createProject(formData)
        toast({
          title: "Project created",
          description: "The project has been created successfully.",
        })
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Error",
        description: "There was a problem saving the project. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Project" : "Create New Project"}</CardTitle>
        <CardDescription>
          Fill out the form below to {isEditing ? "update the" : "create a new"} project.
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
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formState.description}
              onChange={handleChange}
              required
            />
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
            <Label htmlFor="category">Category</Label>
            <Select value={formState.category} onValueChange={handleSelectChange} required>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="residential">Residential</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="renovation">Renovation</SelectItem>
                <SelectItem value="industrial">Industrial</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="client">Client</Label>
              <Input id="client" name="client" value={formState.client} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input id="year" name="year" value={formState.year} onChange={handleChange} required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" name="location" value={formState.location} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="images">Image URLs (comma separated)</Label>
            <Textarea
              id="images"
              name="images"
              value={formState.images}
              onChange={handleChange}
              placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="featured" checked={formState.featured} onCheckedChange={handleCheckboxChange} />
            <Label htmlFor="featured">Feature this project</Label>
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

