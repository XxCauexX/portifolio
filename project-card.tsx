import { ExternalLink } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface Project {
  nome?: string,
  description?: string,
  tags?: [string],
  image?: string,
  link?: string
}

type Projeto = {
  id?: number,
  title?: string,
  description?: string,
  tags?: [string],
  image?: string,
  link?: string
  dados?: {
    nome: string,
    description: string,
    tags: [string],
    image: string,
    link: string
  }
}

interface ProjectCardProps {
  project?: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden bg-black text-white">
      <Link href={project.link || "#"} target="_blank" rel="noopener noreferrer">
        <div className="aspect-video relative overflow-hidden">
          <img
            src={project.image || "/placeholder.svg"}
            alt={project.nome}
            className="object-cover w-full h-full transition-transform hover:scale-105 duration-300"
          />
        </div>
      </Link>
      <CardHeader>
        <CardTitle>{project.nome}</CardTitle>
      </CardHeader>
      <CardContent className="">
        <p className="text-muted-foreground">{project.description}</p>
        <div className="flex flex-wrap gap-2 mt-4 text-black">
          {project.tags?.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full bg-black text-white" asChild>
          <Link href={project.link || "#"} className="flex items-center gap-2" target="_blank" rel="noopener noreferrer">
            Ver Projeto <ExternalLink className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

