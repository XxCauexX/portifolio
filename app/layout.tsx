import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Portifolio - Cauê de Andrade",
  description: "Personal portfolio showcasing my projects and skills",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className}   bg-gradient-to-l from-purple-950 to-black text-white`}>{children}</body>
    </html>
  )
}



import './globals.css'