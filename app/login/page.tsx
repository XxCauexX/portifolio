'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import ParticlesSection from '@/components/ParticlesComponent/ParticlesComponent';


const LoginPage: React.FC = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();

    const { user } = useAuth();

    useEffect(() => {
        if (user !== null) {
            // aguarde o carregamento antes de redirecionar
            const timer = setTimeout(() => router.push("/admin"), 500);
            return () => clearTimeout(timer);
        }
    }, [user]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);
        try {
            await login(email, password);
            alert("Login realizado com sucesso!");
            router.push('/admin');
        } catch (error: any) {
            alert("Erro ao logar: " + error.message);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'white' }} className='bg-gradient-to-l from-purple-950 to-black'>
            <ParticlesSection style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 0 // garante que fique atrás dos outros elementos
            }} />
            <form
                onSubmit={handleSubmit}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    width: '300px',
                    padding: '20px',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
                className='bg-[url(/imgbg.png)] bg-contain  relative z-10'
            >
                <h2 style={{ textAlign: 'center' }}>Login</h2>
                <label htmlFor="email" style={{ marginBottom: '8px' }}>
                    Email:
                </label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                        padding: '10px',
                        marginBottom: '16px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        color: 'black'
                    }}
                    required
                />
                <label htmlFor="password" style={{ marginBottom: '8px' }}>
                    Password:
                </label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                        padding: '10px',
                        marginBottom: '16px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        color: 'black'
                    }}
                    required
                />
                <button
                    type="submit"
                    style={{
                        padding: '10px',
                        backgroundColor: 'black',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginPage;