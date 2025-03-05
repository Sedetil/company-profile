import { Building, Users, Award, Clock } from "lucide-react"

const stats = [
  {
    value: "250+",
    label: "Projects Completed",
    icon: Building,
  },
  {
    value: "50+",
    label: "Expert Team Members",
    icon: Users,
  },
  {
    value: "15+",
    label: "Industry Awards",
    icon: Award,
  },
  {
    value: "20+",
    label: "Years of Experience",
    icon: Clock,
  },
]

export function StatsSection() {
  return (
    <section className="w-full py-12 md:py-24 bg-black text-white">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center justify-center text-center">
              <stat.icon className="h-8 w-8 text-yellow-500 mb-2" />
              <h3 className="text-3xl font-bold">{stat.value}</h3>
              <p className="text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

