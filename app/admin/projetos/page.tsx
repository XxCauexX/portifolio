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

import { ArrowLeftIcon, CirclePlusIcon, Trash2Icon, EyeIcon, PenIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAuth } from "@/context/AuthContext";
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { collection, getDocs, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/database/firebase';


/* snapshot.forEach(doc => {
    console.log(doc.id, doc.data());
}); */

const projects: React.FC = () => {
    const router = useRouter();
    const { user } = useAuth();
    const [projetosApi, setProjetosApi] = useState<Projeto[]>()

    type Projeto = {
        id?: string,
        title?: string,
        description?: string,
        tags?: [string],
        image?: string,
        link?: string
        dados?: {
            nome: string,
            description: string,
            tags: [string],
            image: string,
            link: string
        }
    }

    async function deleteProject(id: string, imageId: string) {
        const fileId = imageId;
        try {
            const resDeleteImage = await fetch('/api/imageKit/delete', {  /* app\api\imageKit\delete*/
                method: 'POST',
                body: JSON.stringify({ fileId }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(resDeleteImage);
            if (resDeleteImage.status === 200){
                const res = await deleteDoc(doc(db, 'projetos', id))
                alert(res);
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(() => {
        const getDate = async () => {
            let dados: {}[] = []
            const snapshot = await getDocs(collection(db, 'projetos'));

            snapshot.forEach(doc => {
                dados.push({
                    id: doc.id,
                    dados: doc.data()   
                })
                /* console.log(doc.id, doc.data()); */
            });

            await setProjetosApi(dados)
        }
        if (user === null) {
            // aguarde o carregamento antes de redirecionar
            const timer = setTimeout(() => router.push("/login"), 500);
            return () => clearTimeout(timer);
        }
        getDate()
    }, [user, projetosApi]);


    if (user === undefined || user === null) {
        return <div className='w-full h-screen flex justify-center items-center'><p>Carregando...</p><Loader className='animate-spin' /></div>
    } else {
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
                        projetosApi && projetosApi.length > 1 &&
                        <Link href={'/admin/projetos/novo'}>
                            <Button className=''><CirclePlusIcon /> Novo projeto</Button>
                        </Link>
                    }

                </div>
                <div className=' h-full p-1'>
                    {
                        projetosApi && projetosApi.length > 0 ? projetosApi?.map((projeto) =>
                            <Card key={projeto.id} className='bg-black m-4'>
                                <CardHeader>
                                    <CardTitle className='flex text-white'>
                                        {projeto?.dados?.nome}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className='text-white grid sm:grid-cols-5  gap-4 items-center justify-items-center'>
                                    <p className='col-span-2'>{projeto?.dados?.description}</p>
                                    <div className='col-span-2 w-3/3 h-[10rem] sm:h-[13rem] border border-purple-600 rounded-3xl shadow-lg shadow-purple-700 overflow-hidden'>
                                        <img src={projeto?.dados?.image || '/placeholder.svg'} alt="" className='w-full h-full object-cover transition-transform hover:scale-105 duration-300' />
                                    </div>
                                    <div className='col-span-2 sm:col-span-1 w-full flex justify-evenly'>
                                        <Link href={projeto?.dados?.link || '#'} target='_blank'>
                                            <Button className=''><EyeIcon /></Button>
                                        </Link>
                                        <Button className=''><PenIcon /> </Button>
                                        <Button className='' onClick={() => deleteProject(projeto.id)} ><Trash2Icon className='text-red-600' /> </Button>

                                    </div>
                                </CardContent>
                            </Card>
                        )
                            :
                            <div>
                                <h1 className='text-2xl'>Nenhum projeto encontrado</h1>
                            </div>
                    }
                </div>
            </div>
        );
    }
};

export default projects;