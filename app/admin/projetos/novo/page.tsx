'use client';
import React, { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { ArrowLeft, ArrowLeftIcon, CirclePlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

import { useRouter } from 'next/navigation';
import { useAuth } from "@/context/AuthContext";
import { Loader } from 'lucide-react';
import { ProjectForm } from '@/components/admin/projectForm';

const newProject: React.FC = () => {
    const router = useRouter();
    const { user } = useAuth();

   /*  const projetos = [{
        id: 1,
        title: "Wise Advice",
        description: "Landing page desenvolvida em React TSX, com foco em apresentar os serviços contábeis exclusivos para médicos e clínicas, além de oferecer um meio de contato direto e profissional. Uma solução moderna e responsiva para estabelecer presença digital e facilitar o primeiro atendimento.",
        tags: ["React"],
        image: "/miniatura.png",
        link: "https://projeto-wise-advice.vercel.app/",
    }, {
        id: 2,
        title: "Task Management App",
        description: "A productivity application for managing tasks and projects with team collaboration features.",
        tags: ["Next.js", "TypeScript", "Prisma"],
        image: "/placeholder.svg?height=300&width=400",
        link: "#",
    },
    {
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
    }] */

    useEffect(() => {
        if (user === null) {
            // aguarde o carregamento antes de redirecionar
            const timer = setTimeout(() => router.push("/login"), 500);
            return () => clearTimeout(timer);
        }
    }, [user]);

    if (user === undefined || user === null) {
        return <div className='w-full h-screen flex justify-center items-center'><p>Carregando...</p><Loader className='animate-spin' /></div>
    } else {
        return (
            <div className="container h-full mx-auto py-10">
                <div className="flex items-center gap-2 mb-8">
                    <Button variant="outline" size="icon"  onClick={() => router.back()}>
                            <ArrowLeft className="h-4 w-4 text-black" />
                            <span className="sr-only">Voltar</span>
                    </Button>
                    <h1 className="text-3xl font-bold">Adicionar Novo Projeto</h1>
                </div>
                
                <ProjectForm />
            </div>
        );
    }
};

export default newProject;