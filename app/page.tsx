'use client';
import { useRouter } from "next/navigation";
import { Github, Mail, Linkedin } from "lucide-react"
import Link from "next/link"
import dynamic from 'next/dynamic';
import { Button } from "@/components/ui/button"
import ProjectCard from "../project-card"
import { useState, useEffect, useRef } from "react"
import ParticlesSection from "../components/ParticlesComponent/ParticlesComponent";

export default function Portfolio() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [numbersClicks, setNumbersClicks] = useState(0)
  const projects = [
    {
      id: 1,
      title: "Wise Advice",
      description: "Landing page desenvolvida em React TSX, com foco em apresentar os serviços contábeis exclusivos para médicos e clínicas, além de oferecer um meio de contato direto e profissional. Uma solução moderna e responsiva para estabelecer presença digital e facilitar o primeiro atendimento.",
      tags: ["React"],
      image: "/image.png",
      link: "https://projeto-wise-advice.vercel.app/",
    },
    {
      id: 2,
      title: "Cracha de apresentação",
      description: "Cracha de apresentação consumindo dados da api do GitHub",
      tags: ["HTML", "CSS", "JS"],
      image: "/crachaBanner.png",
      link: "https://projeto-cracha17-08-2022.vercel.app",
    },
    /* {
      id: 3,
      title: "Weather Dashboard",
      description: "Real-time weather information with interactive maps and forecasting.",
      tags: ["JavaScript", "API Integration", "Chart.js"],
      image: "/placeholder.svg?height=300&width=400",
      link: "#",
    },
    {
      id: 4,
      title: "Portfolio Website",
      description: "A responsive portfolio website showcasing projects and skills.",
      tags: ["HTML/CSS", "JavaScript", "Responsive Design"],
      image: "/placeholder.svg?height=300&width=400",
      link: "#",
    }, */
  ]

  useEffect(() => {
    if (numbersClicks > 5) {
      router.push(`/login`);
      setNumbersClicks(0)
    }
  }, [numbersClicks])

  return (
    <div className="flex min-h-screen flex-col ">
      <header className="sticky top-0 z-50  bg-background/95 backdrop-blur bg-black ">
        <div className="container flex h-16 items-center justify-between">
          <div className="font-bold text-xl">
            <Link href="/">Cauê de Andrde</Link>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#projects" className="text-sm font-medium hover:underline underline-offset-4">
              Projetos
            </Link>
            <Link href="#about" className="text-sm font-medium hover:underline underline-offset-4">
              Sobre mim
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:underline underline-offset-4">
              Contatos
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="mailto:caue.a.505@gmail.com">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 bg-cover bg-center">
        <div className="bg-[url(/imgbg.png)] bg-contain sm:bg-auto relative z-10">

          <section className="py-20 md:py-28">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">Redes de Computadores | Desenvolvedor</h1>
                <p className="max-w-[700px] text-purple-300 md:text-xl">
                  Estudante de Redes de Computadores na Fatec Osasco e desenvolvedor apaixonado por tecnologia
                </p>
                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <Button asChild>
                    <Link href="#projects">Projetos</Link>
                  </Button>
                  <Button variant="outline" className="text-black hover:bg-black hover:text-white" asChild>
                    <Link href="#contact">Entre em contato</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
          <svg
            className="w-full h-[100px] rotate-180"
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
          >
            <path fill="#3b0764" d="M0,0 C480,100 960,0 1440,100 L1440,0 L0,0 Z"></path>
          </svg>
        </div>
        <section id="projects" className="py-12  md:py-16 bg-gradient-to-b from-purple-950 to-black">
          <ParticlesSection style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 0 // garante que fique atrás dos outros elementos
          }} />
          <div className="container px-4 md:px-6 relative z-20">
            <div className="flex flex-col items-center gap-4 text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tighter">Projetos</h2>
              <p className="text-purple-300 md:text-lg">Alguns dos meus projetos.</p> {/*A  collection of my recent work and personal projects */}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>
        <section ref={sectionRef} id="about" className="py-12 md:py-16 bg-black ">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter mb-4">Sobre mim</h2>
                <p className="text-muted-foreground mb-4  ">
                  Sou um estudante de Redes de Computadores na Fatec Osasco e desenvolvedor apaixonado por tecnologia. Meu primeiro contato com programação foi durante o curso técnico em Desenvolvimento de Sistemas na Etec Uirapuru, onde desenvolvi projetos desafiadores, como um sistema de Reconhecimento Facial para controle de acesso e um estadiômetro com armazenamento em banco de dados, apresentado na USP.
                  Atualmente, trabalho na área de qualidade da Promaflex, onde estou desenvolvendo um sistema de gerenciamento da qualidade utilizando React TSX e Node.js, integrando tecnologia ao controle de processos. Além disso, tenho experiência prática com diversas linguagens, como JavaScript, Python, SQL e Java.
                  Gosto de resolver problemas, aprender coisas novas e colaborar com pessoas que compartilham o mesmo interesse por tecnologia. No meu tempo livre, participo de eventos e projetos voluntários, como o Maker Space IoT na Etec Uirapuru e o apoio à ONG HABITACITY.
                </p>
                <p className="text-muted-foreground mb-4 ">
                  Este portfólio é um espaço onde compartilho meus projetos e aprendizados. Fique à vontade para explorar e entrar em contato!
                </p>
                <div className="flex flex-wrap gap-2 mt-6">
                  {[
                    "JavaScript",
                    "TypeScript",
                    "Node.js",
                    "React",
                    "Next.js",
                    "Tailwind CSS",
                    "Python",
                    "MySQL",
                    "Git/GitHub",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex justify-center ">
                <div className="relative w-64 h-64 rounded-full overflow-hidden ">
                  <div className="absolute inset-0 rounded-full border-4 border-l-black border-background animate-spin z-0" style={{ animationDuration: '2000ms' }} />
                  <img
                    src="/perfil.jpeg"
                    alt="Profile"
                    className="object-cover"
                    width={256}
                    height={256}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="contact" className=" bg-[url(/imgbg.png)] relative z-10 bg-contain sm:bg-auto">
          <svg
            className="w-full h-[100px] p-0 "
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
          >
            <path fill="black" d="M0,0 C480,100 960,0 1440,100 L1440,0 L0,0 Z"></path>
          </svg>
          <div className="container px-4 md:px-6 py-12 md:py-16 ">
            <div className="flex flex-col items-center gap-4 text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tighter">Entre em contato</h2>
              <p className="text-purple-300 md:text-lg max-w-[700px]">

                Sinta-se à vontade para entrar em contato conosco se estiver procurando um desenvolvedor, tiver alguma dúvida ou apenas quiser se conectar.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-3xl">
                <a
                  href="caue.a.505@gmai.com"
                  className="flex flex-col items-center p-6 bg-muted rounded-lg hover:bg-white hover:text-red-800 bg-red-800 transition-colors"
                >
                  <Mail className="h-10 w-10 mb-4" />
                  <h3 className="text-lg font-medium">Email</h3>
                  <p className="text-sm">caue.a.505@gmai.com</p>
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center p-6 rounded-lg hover:bg-white hover:text-gray-800 bg-gray-800 transition-colors "
                >
                  <Github className="h-10 w-10 mb-4 " />
                  <h3 className="text-lg font-medium">GitHub</h3>
                  <p className="text-sm ">@XxCauexX</p>
                </a>
                <a
                  href="https://www.linkedin.com/in/cau%C3%AA-andrade-dantas-da-silva-74961b215/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center animate-pulse p-6 rounded-lg hover:bg-white hover:text-blue-800 bg-blue-800 transition-colors"
                >
                  <Linkedin className="h-10 w-10 mb-4" />
                  <h3 className="text-lg font-medium">LinkedIn</h3>
                  <p className="text-sm">Cauê de Andrade</p>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className=" py-4 md:py-6 bg-black relative z-10">
        <div className="container flex flex-col items-center justify-center gap-4 text-center" onClick={() => setNumbersClicks(numbersClicks + 1)}>
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Cauê de Andrade. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div >
  )
}

