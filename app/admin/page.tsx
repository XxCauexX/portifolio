'use client';
import React, { useState } from 'react';

const admPainel: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);
        // Add your login logic here
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            
        </div>
    );
};

export default admPainel;