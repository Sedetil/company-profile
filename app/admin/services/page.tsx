"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PenSquare, Trash2, Plus, Eye } from "lucide-react"
import { getServices } from "@/lib/api"

export default function ServicesAdminPage() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true)
      try {
        const data = await getServices()
        setServices(data)
      } catch (error) {
        console.error("Error fetching services:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Services</h1>
        <Link href="/admin/services/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Service
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
        </div>
      ) : services.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <p className="text-gray-500">No services found</p>
            <Link href="/admin/services/new" className="mt-4">
              <Button>Add your first service</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {services.map((service) => (
            <Card key={service.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.is_featured && "Featured Service"}</CardDescription>
                  </div>
                  {service.is_featured && <Badge>Featured</Badge>}
                </div>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-2 text-gray-500">{service.description}</p>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Link href={`/services/${service.slug}`} target="_blank">
                  <Button variant="ghost" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </Button>
                </Link>
                <Link href={`/admin/services/edit/${service.id}`}>
                  <Button variant="outline" size="sm">
                    <PenSquare className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </Link>
                <Button variant="destructive" size="sm">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

