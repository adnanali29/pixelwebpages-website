// Navigation items
export const navItems = [
    { text: 'Home', href: '/' },
    { text: 'About Us', href: '/about' },
    { text: 'Product', href: '/products' },
    { text: 'Services', href: '/services' },
    { text: 'Blogs', href: '/blogs' },
    { text: 'Contact', href: '/contact' }
];

// Site metadata
export const siteConfig = {
    name: 'Pixel WebPages',
    description: 'We don\'t just build websites. We craft digital experiences that pop, snap, and engage. Your brand, reinvented.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://pixelwebpages.com',
    ogImage: 'https://i.ibb.co/zT2Cp3qt/Insta-Posts-4.png',
    links: {
        instagram: 'https://instagram.com/pixelwebpages',
        linkedin: 'https://linkedin.com/company/pixelwebpages',
        facebook: 'https://facebook.com/pixelwebpages'
    }
};
