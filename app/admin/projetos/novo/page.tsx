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

import { ArrowLeftIcon, CirclePlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const newProject: React.FC = () => {
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
    }]

    return (
        <div className='w-full h-screen '>
            adicionar projeto
        </div>
    );
};

export default newProject;