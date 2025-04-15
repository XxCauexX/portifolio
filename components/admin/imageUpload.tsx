"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, X } from "lucide-react"
/* import { uploadImage } from "@/lib/actions" */
import { toast } from "@/hooks/use-toast"

interface ImageUploadProps {
  onUpload: (url: string) => void
  currentImage?: string
  label?: string
}

export function ImageUpload({ onUpload, currentImage, label = "Carregar imagem" }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(currentImage || null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Tipo de arquivo inválido",
        description: "Por favor, selecione uma imagem.",
        variant: "destructive",
      })
      return
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Arquivo muito grande",
        description: "O tamanho máximo permitido é 5MB.",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    try {
      // Create a preview
      const reader = new FileReader()
      reader.onload = (event) => {
        setPreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)

      // Upload the image
      const url = await uploadImage(file)
      onUpload(url)

      toast({
        title: "Imagem carregada",
        description: "A imagem foi carregada com sucesso.",
      })
    } catch (error) {
      toast({
        title: "Erro ao carregar imagem",
        description: "Ocorreu um erro ao carregar a imagem.",
        variant: "destructive",
      })
      console.error("Error uploading image:", error)
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemoveImage = () => {
    setPreview(null)
    onUpload("")
  }

  return (
    <div>
      {preview ? (
        <div className="relative group">
          <img
            src={preview || "/placeholder.svg"}
            alt="Preview"
            className="w-full max-h-60 object-contain rounded-md"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleRemoveImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <Card className="border-dashed border-2 p-6 text-center">
          <label className="cursor-pointer block">
            <div className="flex flex-col items-center justify-center gap-2">
              <Upload className="h-8 w-8 text-gray-400" />
              <span className="text-sm font-medium">{label}</span>
              <span className="text-xs text-gray-500">Arraste e solte ou clique para selecionar</span>
              <Button type="button" variant="outline" size="sm" disabled={isUploading}>
                {isUploading ? "Carregando..." : "Selecionar arquivo"}
              </Button>
            </div>
            <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} disabled={isUploading} />
          </label>
        </Card>
      )}
    </div>
  )
}
