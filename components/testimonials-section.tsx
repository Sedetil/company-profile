import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "The team delivered our office building project on time and within budget. Their attention to detail and quality workmanship exceeded our expectations.",
    author: "John Smith",
    company: "Smith Enterprises",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    quote:
      "We've worked with many construction companies, but none have matched the professionalism and expertise of this team. Highly recommended!",
    author: "Sarah Johnson",
    company: "Johnson Real Estate",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    quote:
      "Our home renovation was handled with care and precision. The team was responsive to our needs and delivered exceptional results.",
    author: "Michael Brown",
    company: "Homeowner",
    image: "/placeholder.svg?height=100&width=100",
  },
]

export function TestimonialsSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Our Clients Say</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Don't just take our word for it. Here's what our clients have to say about our services.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white">
              <CardContent className="pt-6">
                <Quote className="h-8 w-8 text-yellow-500 mb-4" />
                <p className="text-gray-700 italic">{testimonial.quote}</p>
              </CardContent>
              <CardFooter className="flex items-center gap-4 border-t px-6 py-4">
                <div className="rounded-full overflow-hidden w-12 h-12 bg-gray-200">
                  {/* Client image would go here */}
                </div>
                <div>
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.company}</p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

