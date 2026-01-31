import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Admin Panel - Pixel WebPages',
    description: 'Admin dashboard for managing Pixel WebPages content',
    robots: 'noindex, nofollow',
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
