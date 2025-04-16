"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, X } from "lucide-react"
/* import { uploadImage } from "@/lib/actions" */
import { toast } from "@/hooks/use-toast"

import {
  upload,
  ImageKitUploadNetworkError,
  ImageKitServerError,
  ImageKitAbortError,
  ImageKitInvalidRequestError,
} from "@imagekit/next";

interface ImageUploadProps {
  onUpload: (url: string , id: string) => void
  title?: string,
  currentImage?: string
  label?: string
}

export function ImageUpload({ onUpload, title, currentImage, label = "Carregar imagem" }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(currentImage || null)
  const [idImage, setIdImage] = useState<any>()


  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const abortController = new AbortController();

  const authenticator = async () => {
    const res = await fetch("/api/imageKit/signature");
    if (!res.ok) throw new Error("Failed to get auth");
    const { token, signature, expire, publicKey } = await res.json();
    return { token, signature, expire, publicKey };
  };

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
      /* const url = await uploadImage(file) */

      const { token, signature, expire, publicKey } = await authenticator();

      const result = await upload({
        file,
        fileName: title ? `${title}Thumbnail` : `${new Date()}Thumbnail`,
        folder: '/projectsThumbnail',
        signature,
        token,
        expire,
        publicKey,
        useUniqueFileName: true,
        onProgress: (event) => {
          const percent = Math.round((event.loaded / event.total) * 100);
          setProgress(percent);
        },
        abortSignal: abortController.signal,
      });

      console.log("Upload concluído:", result);
      console.log("path:", result.url);
      setIdImage(result.fileId)
      onUpload(result?.url, idImage)

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
      if (error instanceof ImageKitAbortError) {
        setMessage("Upload cancelado.");
      } else if (error instanceof ImageKitUploadNetworkError) {
        setMessage("Erro de rede no upload.");
      } else if (error instanceof ImageKitServerError) {
        setMessage("Erro no servidor.");
      } else if (error instanceof ImageKitInvalidRequestError) {
        setMessage("Erro na requisição (parametros inválidos).");
      } else {
        setMessage("Erro inesperado.");
      }
      console.error("Erro no upload:", error);
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemoveImage = async () => {
    if (idImage && idImage != null) {
      const fileId = idImage
      const res = await fetch('/api/imageKit/delete', {  /* app\api\imageKit\delete*/
        method: 'POST',
        body: JSON.stringify({ fileId }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(res);
      if (res.status === 200) {
        setPreview(null)
        onUpload("","")
      } else {
        console.log("erro");

      }
    } else {
      console.log("erro ao tentar remover a imagem")
    }
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
          progresso: {progress > 0 && progress < 100 && <p>Progresso: {progress}%</p>}
        </div>
      ) : (
        <Card className="border-dashed border-2 p-6 text-center">
          <label className="cursor-pointer block">
            <div className="flex flex-col items-center justify-center gap-2">
              <Upload className="h-8 w-8 text-gray-400" />
              <span className="text-sm font-medium">{label}</span>
              <span className="text-xs text-gray-500">Arraste e solte ou clique para selecionar</span>
              {/* <Button type="button" variant="outline" size="sm" disabled={isUploading}>
                {isUploading ? "Carregando..." : "Selecionar arquivo"}
              </Button> */}
              <div className="border border-black rounded-md p-2">
                {isUploading ? "Carregando..." : "Selecionar arquivo"}
                <input type="file" accept="image/*" placeholder="olaa" className="hidden" onChange={handleFileChange} disabled={isUploading} />
              </div>
            </div>
          </label>
          progresso: {progress > 0 && progress < 100 && <p>Progresso: {progress}%</p>}
        </Card>
      )}
    </div>
  )
}
