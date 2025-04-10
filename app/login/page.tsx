'use client';
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
const user = { name: 'caue', password: '123456' };


const LoginPage: React.FC = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);
        if (password === user.password && email === user.name) {
            router.push('/admin');
            alert('Login successful!');
        } else {
            alert('Invalid password!');
        }
        // Add your login logic here
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'white' }} className=''>
            <form
                onSubmit={handleSubmit}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '300px',
                    padding: '20px',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
                className='  bg-gradient-to-l from-purple-950 to-black'
            >
                <h2 style={{ textAlign: 'center' }}>Login</h2>
                <label htmlFor="email" style={{ marginBottom: '8px' }}>
                    Email:
                </label>
                <input
                    type="text"
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