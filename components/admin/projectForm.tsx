"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ImageUpload } from "@/components/admin/imageUpload"
/* import { createProject, updateProject } from "@/lib/actions" */
import { Loader2, Trash2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { collection, addDoc } from 'firebase/firestore';
import { db } from "@/lib/database/firebase"

const projectSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  slug: z.string().min(1, "A slug é obrigatória"),
  description: z.string().min(1, "A descrição é obrigatória"),
  content: z.string().min(1, "O conteúdo é obrigatório"),
  thumbnail: z.string().optional(),
  images: z.array(z.string()).optional(),
  technologies: z.string().optional(),
  link: z.string().url("URL inválida").optional().or(z.literal("")),
  github: z.string().url("URL inválida").optional().or(z.literal("")),
})

type ProjectFormValues = z.infer<typeof projectSchema>

interface ProjectFormProps {
  project?: {
    id: string
    title: string
    slug: string
    description: string
    content: string
    thumbnail?: string
    images?: string[]
    technologies?: string
    link?: string
    github?: string
  }
}



export function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [thumbnail, setThumbnail] = useState<string | undefined>(project?.thumbnail)
  const [projectImages, setProjectImages] = useState<string[]>(project?.images || [])

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: project?.title || "",
      slug: project?.slug || "",
      description: project?.description || "",
      content: project?.content || "",
      thumbnail: project?.thumbnail || "",
      images: project?.images || [],
      technologies: project?.technologies || "",
      link: project?.link || "",
      github: project?.github || "",
    },
  })

  const onSubmit = async (data: ProjectFormValues) => {
    setIsSubmitting(true)

    try {
      // Include the uploaded images in the form data
      data.thumbnail = thumbnail
      data.images = projectImages

      if (project) {
        // Update existing project
        
        toast({
          title: "Projeto atualizado",
          description: "O projeto foi atualizado com sucesso.",
        })
      } else {
        // Create new project
        await addDoc(collection(db, 'projetos'), {
            nome: data.title,
            slug: data.slug,
            description: data.description,
            conteudo: data.content,
            image: data?.thumbnail || '/placeholder.svg',
            link: data?.link || '#'
          });
        toast({
          title: "Projeto criado",
          description: "O projeto foi criado com sucesso.",
        })
      }

      router.push("/admin/projetos")
      router.refresh()
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao salvar o projeto.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleThumbnailUpload = (url: string) => {
    setThumbnail(url)
    form.setValue("thumbnail", url)
  }

  const handleImagesUpload = (url: string) => {
    const newImages = [...projectImages, url]
    setProjectImages(newImages)
    form.setValue("images", newImages)
  }

  const handleRemoveImage = (index: number) => {
    const newImages = [...projectImages]
    newImages.splice(index, 1)
    setProjectImages(newImages)
    form.setValue("images", newImages)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título</Label>
                  <Input id="title" {...form.register("title")} placeholder="Nome do projeto" />
                  {form.formState.errors.title && (
                    <p className="text-sm text-red-500">{form.formState.errors.title.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input id="slug" {...form.register("slug")} placeholder="slug-do-projeto" />
                  {form.formState.errors.slug && (
                    <p className="text-sm text-red-500">{form.formState.errors.slug.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  {...form.register("description")}
                  placeholder="Breve descrição do projeto"
                  rows={2}
                />
                {form.formState.errors.description && (
                  <p className="text-sm text-red-500">{form.formState.errors.description.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Conteúdo</Label>
                <Textarea
                  id="content"
                  {...form.register("content")}
                  placeholder="Conteúdo detalhado do projeto"
                  rows={6}
                />
                {form.formState.errors.content && (
                  <p className="text-sm text-red-500">{form.formState.errors.content.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="technologies">Tecnologias</Label>
                <Input
                  id="technologies"
                  {...form.register("technologies")}
                  placeholder="React, Node.js, TypeScript, etc."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="link">Link do Projeto</Label>
                  <Input id="link" type="url" {...form.register("link")} placeholder="https://exemplo.com" />
                  {form.formState.errors.link && (
                    <p className="text-sm text-red-500">{form.formState.errors.link.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="github">Link do GitHub</Label>
                  <Input
                    id="github"
                    type="url"
                    {...form.register("github")}
                    placeholder="https://github.com/usuario/projeto"
                  />
                  {form.formState.errors.github && (
                    <p className="text-sm text-red-500">{form.formState.errors.github.message}</p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <Label className="block mb-4">Imagem de Capa</Label>
                <ImageUpload
                  onUpload={handleThumbnailUpload}
                  currentImage={thumbnail}
                  label="Adicionar imagem de capa"
                />
              </div>

              <div>
                <Label className="block mb-4">Imagens do Projeto</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {projectImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Imagem ${index + 1}`}
                        className="w-full h-40 object-cover rounded-md"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <ImageUpload onUpload={handleImagesUpload} label="Adicionar imagem do projeto" />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.push("/admin/projects")}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {project ? "Atualizar Projeto" : "Criar Projeto"}
          </Button>
        </div>
      </div>
    </form>
  )
}
