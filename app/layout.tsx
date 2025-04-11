import type React from "react"
import "@/app/globals.css"
import { Analytics } from "@vercel/analytics/react"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Portifolio - Cauê de Andrade",
  description: "",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className}`}> {/*   bg-gradient-to-l from-purple-950 to-black */}
        <div className=" bg-[url(/imgbg.png)]  bg-contain sm:bg-auto text-white" >

          {children}
        </div>
        <Analytics />
      </body>
    </html>
  )
}



import './globals.css'