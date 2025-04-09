'use client';
import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { ArrowLeftIcon, CirclePlusIcon, Trash2Icon, EyeIcon, PenIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const projects: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);
        // Add your login logic here
    };

    const projetos = [{
        id: 1,
        title: "Wise Advice",
        description: "Landing page desenvolvida em React TSX, com foco em apresentar os serviços contábeis exclusivos para médicos e clínicas, além de oferecer um meio de contato direto e profissional. Uma solução moderna e responsiva para estabelecer presença digital e facilitar o primeiro atendimento.",
        tags: ["React"],
        image: "/image.png",
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
        title: "Weather Dashboard",
        description: "Real-time weather information with interactive maps and forecasting.",
        tags: ["JavaScript", "API Integration", "Chart.js"],
        image: "/placeholder.svg?height=300&width=400",
        link: "#",
    },
    {
        id: 5,
        title: "Weather Dashboard",
        description: "Real-time weather information with interactive maps and forecasting.",
        tags: ["JavaScript", "API Integration", "Chart.js"],
        image: "/placeholder.svg?height=300&width=400",
        link: "#",
    },
    {
        id: 6,
        title: "Weather Dashboard",
        description: "Real-time weather information with interactive maps and forecasting.",
        tags: ["JavaScript", "API Integration", "Chart.js"],
        image: "/placeholder.svg?height=300&width=400",
        link: "#",
    },
    {
        id: 7,
        title: "Weather Dashboard",
        description: "Real-time weather information with interactive maps and forecasting.",
        tags: ["JavaScript", "API Integration", "Chart.js"],
        image: "/placeholder.svg?height=300&width=400",
        link: "#",
    },
    {
        id: 8,
        title: "Weather Dashboard",
        description: "Real-time weather information with interactive maps and forecasting.",
        tags: ["JavaScript", "API Integration", "Chart.js"],
        image: "/placeholder.svg?height=300&width=400",
        link: "#",
    },
    {
        id: 9,
        title: "Portfolio Website",
        description: "A responsive portfolio website showcasing projects and skills.",
        tags: ["HTML/CSS", "JavaScript", "Responsive Design"],
        image: "/placeholder.svg?height=300&width=400",
        link: "#",
    }]

    return (
        <div className='w-full h-screen'>
            <div className='pt-4 grid grid-cols-2 justify-items-center items-center'>
                <div className='flex w-full justify-center items-center'>
                    <Link href={'/admin'} className='ml-4'>
                        <Button variant={'secondary'}><ArrowLeftIcon /></Button>
                    </Link>
                    <h1 className='invisible sm:visible sm:ml-4 sm:text-2xl'>Gerenciar Projetos</h1>
                </div>
                {
                    projetos.length > 1 &&
                    <Link href={'/admin/projetos/novo'}>
                        <Button className=''><CirclePlusIcon /> Novo projeto</Button>
                    </Link>
                }

            </div>
            <div className=''>
                {
                    projetos.length > 0 ? projetos.map((projeto) =>
                        <Card key={projeto.id} className='bg-black m-4'>
                            <CardHeader>
                                <CardTitle className='flex text-white'>
                                    {projeto.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className='text-white grid sm:grid-cols-5  gap-4 items-center justify-items-center'>
                                <p className='col-span-2'>{projeto.description}</p>
                                <div className='col-span-2 w-3/3 h-[10rem] sm:h-[13rem] border border-purple-600 rounded-3xl overflow-hidden'>
                                    <img src={projeto.image} alt="" className='w-full h-full object-cover transition-transform hover:scale-105 duration-300' />
                                </div>
                                <div className='col-span-2 sm:col-span-1 w-full flex justify-evenly'>
                                    <Button className=''><EyeIcon /></Button>
                                    <Button className=''><PenIcon /> </Button>
                                    <Button className=''><Trash2Icon className='text-red-600' /> </Button>

                                </div>
                            </CardContent>
                        </Card>
                    )
                        :
                        <div>
                            cade
                        </div>
                }
            </div>
        </div>
    );
};

export default projects;