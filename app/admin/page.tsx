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

import { FolderOpenIcon, CirclePlusIcon, FilePenLineIcon, SettingsIcon, House } from 'lucide-react';
import { Button } from '@/components/ui/button';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from "@/context/AuthContext";

import { Loader } from 'lucide-react';

const admPainel: React.FC = () => {
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
            <div className='flex flex-col items-center h-screen'>
                <div className='w-full h-full text-black grid grid-cols-1 gap-2 sm:grid-cols-3  items-center justify-items-center'>
                    <Card className='bg-black border-none shadow-2xl shadow-purple-700 group ' >
                        <CardHeader>
                            <CardTitle className='flex text-white'>
                                <FolderOpenIcon className='mr-4 group-hover:animate-bounce transition-all duration-300' />
                                <p>Projetos</p>
                            </CardTitle>
                            <CardDescription>Gerencie seus projetos de portifolio</CardDescription>
                        </CardHeader>
                        <CardContent>

                            <Link href='/admin/projetos'>
                                <Button className='w-80'>Ver todos os projetos</Button>
                            </Link>
                        </CardContent>
                        <CardFooter>
                            <Link href='/admin/projetos/novo'>
                                <Button className='w-80' variant={'outline'}> <CirclePlusIcon /> Adicionar novos projetos</Button>
                            </Link>
                        </CardFooter>
                    </Card>
                    <Card className='bg-black shadow-2xl border-none shadow-purple-700 group'>
                        <CardHeader>
                            <CardTitle className='flex text-white'>
                                <FilePenLineIcon className='mr-4 group-hover:animate-bounce transition-all duration-300' /> <p>Conteúdo</p>
                            </CardTitle>
                            <CardDescription>Edite o conteúdo do seu site</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button className='w-80'>Editar seção "Sobre"</Button>
                        </CardContent>
                        <CardFooter>
                            <Button className='w-80' variant={'outline'}>Editar informações de contatos</Button>
                        </CardFooter>
                    </Card>
                    <Card className='bg-black shadow-2xl border-none shadow-purple-700 group' >
                        <CardHeader>
                            <CardTitle className='flex text-white '>
                                <SettingsIcon className='mr-4 group-hover:animate-spin transition-all duration-300' /> <p>Configurações</p>
                            </CardTitle>
                            <CardDescription>Gerencie as configurações do site</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button className='w-80'>Configurações gerais</Button>
                        </CardContent>
                        <CardFooter>
                            <Button className='w-80' variant={'outline'}>Adicionar novos projetos</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        );
    }
};

export default admPainel;