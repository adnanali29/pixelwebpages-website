'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAdminPassword } from '@/lib/actions';

export default function AdminLogin() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const adminPassword = await getAdminPassword();
            if (password === adminPassword) {
                sessionStorage.setItem('admin_authenticated', 'true');
                router.push('/admin/dashboard');
            } else {
                setError('Incorrect Password');
            }
        } catch (error) {
            setError('System error. Contact developer.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-black">
            <div className="bg-zinc-900 border-4 border-red-500 rounded-[2rem] w-full max-w-sm p-8 relative animate-in fade-in zoom-in duration-300 shadow-[0_0_50px_rgba(239,68,68,0.3)]">
                <h2 className="text-3xl font-black text-white mb-6 text-center uppercase tracking-widest">
                    Admin Access
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Password"
                            className="w-full bg-black border-2 border-zinc-700 rounded-xl p-4 text-white font-bold placeholder:text-zinc-600 focus:outline-none focus:border-red-500 transition-all text-center tracking-widest text-xl"
                            autoFocus
                            disabled={isLoading}
                        />
                    </div>
                    {error && (
                        <p className="text-red-500 text-sm font-bold text-center animate-pulse">
                            {error}
                        </p>
                    )}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-red-600 hover:bg-red-500 text-white font-black py-4 rounded-xl transition-colors active:scale-95 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] disabled:opacity-50"
                    >
                        {isLoading ? 'CHECKING...' : 'UNLOCK PANEL'}
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <a
                        href="/"
                        className="text-zinc-500 text-sm hover:text-white transition-colors"
                    >
                        ← Back to Website
                    </a>
                </div>
            </div>
        </div>
    );
}
