'use client';

import { useState } from 'react';
import { addContactSubmission } from '@/lib/actions';
import { CheckCircle, Check } from '@/components/icons';

export default function ContactPage() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            // 1. Send to Formspree
            const formspreeResponse = await fetch('https://formspree.io/f/xvgeqoag', {
                method: 'POST',
                body: formData,
                headers: { Accept: 'application/json' },
            });

            // 2. Save to Neon (for Admin Panel)
            try {
                await addContactSubmission({
                    name: data.name as string,
                    email: data.email as string,
                    phone: data.number as string,
                    message: data.description as string
                });
            } catch (authError) {
                // Silently handle or handle with UI
            }

            if (formspreeResponse.ok) {
                setIsSubmitted(true);
                form.reset();
            } else {
                alert('Error submitting form. Please try again.');
            }
        } catch (err) {
            console.error(err);
            alert('Error submitting form. Please check your connection.');
        }
        setIsLoading(false);
    };

    return (
        <div className="pt-24 pb-12 px-4 max-w-5xl mx-auto min-h-screen">
            <div className="bg-[#facc15] rounded-[3rem] p-8 md:p-16 border-4 border-black shadow-[12px_12px_0px_0px_#fff]">
                <h1 className="text-4xl md:text-6xl font-black text-black mb-8 uppercase">
                    Let&apos;s Talk Business.
                </h1>

                {isSubmitted ? (
                    <div className="bg-[#f0fdf4] rounded-[2.5rem] p-8 text-center border-4 border-black py-16 animate-in fade-in zoom-in shadow-[15px_15px_0px_0px_rgba(0,0,0,0.1)]">
                        <div className="w-20 h-20 bg-[#22c55e] rounded-full flex items-center justify-center mx-auto mb-8 text-white shadow-lg shadow-green-200">
                            <Check size={40} strokeWidth={4} />
                        </div>
                        <h2 className="text-4xl font-black text-black mb-4">Message Sent!</h2>
                        <p className="text-xl text-zinc-600 mb-10 font-bold max-w-lg mx-auto">
                            We will reach out in 24-48 hours.
                        </p>
                        <button
                            onClick={() => setIsSubmitted(false)}
                            className="bg-black text-white font-bold py-4 px-10 rounded-xl hover:scale-105 transition-all border-2 border-transparent hover:border-black hover:bg-white hover:text-black shadow-lg"
                        >
                            Send Another Message
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input
                                name="name"
                                required
                                type="text"
                                placeholder="Name"
                                className="w-full bg-white border-4 border-black p-4 rounded-xl text-black font-bold placeholder:text-zinc-500 focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-all"
                            />
                            <input
                                name="email"
                                required
                                type="email"
                                placeholder="Email"
                                className="w-full bg-white border-4 border-black p-4 rounded-xl text-black font-bold placeholder:text-zinc-500 focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-all"
                            />
                        </div>
                        <input
                            name="number"
                            required
                            type="tel"
                            onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '')}
                            placeholder="Phone Number"
                            className="w-full bg-white border-4 border-black p-4 rounded-xl text-black font-bold placeholder:text-zinc-500 focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-all"
                        />
                        <textarea
                            name="description"
                            required
                            rows={4}
                            placeholder="Brief Description..."
                            className="w-full bg-white border-4 border-black p-4 rounded-xl text-black font-bold placeholder:text-zinc-500 focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-all"
                        />
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-black text-white font-black text-xl py-5 px-10 rounded-xl w-full hover:bg-white hover:text-black border-4 border-black transition-all active:scale-95 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-none hover:translate-y-1 disabled:opacity-50"
                        >
                            {isLoading ? 'SENDING...' : 'SEND MESSAGE'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
