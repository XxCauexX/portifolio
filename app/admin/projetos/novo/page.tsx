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