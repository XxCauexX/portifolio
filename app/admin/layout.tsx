import type React from "react"
import { Analytics } from "@vercel/analytics/react"
import { Inter } from "next/font/google"
import { AuthProvider } from "@/context/AuthContext";
import Link from "next/link";
import { House } from "lucide-react";
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
    <>
      <div className=" bg-[url(/imgbg.png)] bg-contain h-max sm:bg-auto text-white" >
        <div className='flex p-4 items-center text-base bg-black w-full '>
          <Link href={'/'}>
            <House />
          </Link>
          <h1 className='sm:text-2xl ml-2'>Painel de Administração</h1>
        </div>
        {children}
      </div>
      <Analytics />
    </>
  )
}