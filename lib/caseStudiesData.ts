export interface CaseStudy {
    id: string;
    slug: string;
    title: string;
    subtitle: string;
    client: string;
    industry: string;
    year: string;
    color: string;
    bgAccent: string;
    liveUrl: string;
    image: string;
    challenge: string;
    solution: string;
    metrics: {
        value: string;
        label: string;
        change?: string;
    }[];
    techStack: string[];
    features: string[];
    testimonial: {
        quote: string;
        author: string;
        role: string;
    };
    category: 'SaaS' | 'Health' | 'Non-Profit' | 'Entertainment' | 'E-Commerce' | 'Platform';
}

export const CASE_STUDIES: CaseStudy[] = [
    {
        id: '1',
        slug: 'addy-fitness',
        title: 'High-Performance Digital Transformation & Membership Engine',
        subtitle: 'Turning an offline gym into a digitally driven fitness powerhouse with Next.js and real-time class booking.',
        client: 'Addy Fitness',
        industry: 'Health & Fitness / E-Commerce',
        year: '2025',
        color: '#60a5fa',
        bgAccent: 'rgba(96, 165, 250, 0.15)',
        liveUrl: 'https://addyfitness.com/',
        image: 'https://i.ibb.co/kgBj0d0Z/5.png',
        challenge: 'Addy Fitness relied heavily on manual phone inquiries and walk-ins. Their previous website was slow, non-responsive, and failed to communicate their premium brand aesthetic, causing a 65% visitor bounce rate.',
        solution: 'We engineered a blazing fast Next.js platform with modern TailwindCSS styling, interactive schedule exploration, automated lead capture forms, and integrated WhatsApp & direct booking triggers.',
        metrics: [
            { value: '+185%', label: 'Online Sign-ups', change: 'Growth' },
            { value: '0.4s', label: 'LCP Load Speed', change: 'Ultra Fast' },
            { value: '2.4x', label: 'Avg Session Duration', change: 'Engagement' },
            { value: '100%', label: 'Mobile Responsive', change: 'Score' }
        ],
        techStack: ['Next.js 15', 'React 19', 'TailwindCSS 4', 'PostgreSQL', 'Vercel Edge', 'Framer Motion'],
        features: [
            'Dynamic Trainer Roster & Class Timetables',
            'High-converting 2-step member onboarding funnel',
            'Instant WhatsApp Lead Bot integration',
            'Ultra-optimized WebP asset pipelines'
        ],
        testimonial: {
            quote: 'Pixel WebPages delivered beyond our imagination. Our website now converts visitors into gym members seamlessly on autopilot.',
            author: 'Sarah Jenkins',
            role: 'CEO, Addy Fitness'
        },
        category: 'Health'
    },
    {
        id: '2',
        slug: 'sikhaid-ngo',
        title: 'Transparent Donation Ecosystem & Community Impact Portal',
        subtitle: 'Empowering a global humanitarian non-profit with transparent donor tracking, recurring campaigns, and interactive storytelling.',
        client: 'Sikhaid NGO',
        industry: 'Non-Profit & Philanthropy',
        year: '2025',
        color: '#4ade80',
        bgAccent: 'rgba(74, 222, 128, 0.15)',
        liveUrl: 'https://sikhaid.ngo/',
        image: 'https://i.ibb.co/xqtNbtmF/4.png',
        challenge: 'Donors lacked real-time visibility into how their contributions were utilized, causing donor fatigue and high payment gateway abandonment.',
        solution: 'Designed a clean, emotionally resonant digital interface with live fund allocation meters, instant tax-deductible receipt generation, and smooth global payment gateway options.',
        metrics: [
            { value: '+310%', label: 'Online Donations', change: 'Surge' },
            { value: '100k+', label: 'Beneficiaries', change: 'Impacted' },
            { value: '99.99%', label: 'Uptime Reliability', change: 'Flawless' },
            { value: '45s', label: 'Donation Speed', change: '1-Click' }
        ],
        techStack: ['Next.js', 'TypeScript', 'TailwindCSS', 'PostgreSQL', 'Stripe / Razorpay', 'Cloudflare'],
        features: [
            'Live Campaign Progress & Target Trackers',
            '1-Click Recurring Donation Switch',
            'Interactive Emergency Relief Bulletin',
            'Automated Donor Tax & Impact Reports'
        ],
        testimonial: {
            quote: 'Pixel WebPages helped us restart our donation drive with unprecedented transparency, trust, and speed.',
            author: 'Raunak Singhal',
            role: 'Director, Sikhaid NGO'
        },
        category: 'Non-Profit'
    },
    {
        id: '3',
        slug: 'badsha-magic',
        title: 'Immersive Interactive Experience & Ticket Booking Engine',
        subtitle: 'Bringing magic to the web with interactive soundscapes, custom motion dynamics, and VIP tour reservation engine.',
        client: 'Badsha Magic World',
        industry: 'Entertainment & Theatrical',
        year: '2025',
        color: '#f472b6',
        bgAccent: 'rgba(244, 114, 182, 0.15)',
        liveUrl: 'https://badasha-landing-page.vercel.app/',
        image: 'https://i.ibb.co/BKt0Wc74/1.png',
        challenge: 'Traditional performance portfolios are static and fail to convey the wonder, theatrical drama, and aura of a live world-class illusion show.',
        solution: 'We created a dark-mode interactive wonderland featuring micro-animations, magical cursor particles, video showreels, and an instant booking calendar.',
        metrics: [
            { value: '+400%', label: 'Direct Bookings', change: 'Increase' },
            { value: '95%', label: 'Admin Overhead', change: 'Reduced' },
            { value: '4.9/5', label: 'Fan Experience', change: 'Rating' },
            { value: '3.8x', label: 'Social Inbound', change: 'Multiplier' }
        ],
        techStack: ['Next.js', 'Web Audio API', 'TailwindCSS', 'Framer Motion', 'Vercel'],
        features: [
            'Dark neo-brutalist aesthetic with neon glow effects',
            'Interactive magic trick easter eggs for visitors',
            'VIP corporate event inquiry flow',
            'Embedded high-definition 4K video reels'
        ],
        testimonial: {
            quote: 'My booking calendar has never been busier. The portfolio site they built captures the mystery and excitement of my shows perfectly.',
            author: 'Badsha Magic',
            role: 'Magician & Illusionist'
        },
        category: 'Entertainment'
    },
    {
        id: '4',
        slug: 'querent-platform',
        title: 'AI-Enhanced Astrology & Modern Guidance Platform',
        subtitle: 'A minimalist, hyper-responsive consultation hub bridging ancient wisdom with algorithmic personalization.',
        client: 'Querent',
        industry: 'Consumer Tech & AI Platform',
        year: '2025',
        color: '#c084fc',
        bgAccent: 'rgba(192, 132, 252, 0.15)',
        liveUrl: 'https://www.querent.xyz/',
        image: 'https://i.ibb.co/YTPj0HN5/3.png',
        challenge: 'Bridging complex astronomical chart calculations with an intuitive, friendly, zero-jargon user interface that feels modern and trustworthy.',
        solution: 'Constructed an edge-computed personalized reading engine with dynamic SVG astral charts, sleek typography, and instant live session bookings.',
        metrics: [
            { value: '50k+', label: 'Daily Consultations', change: 'Volume' },
            { value: '<120ms', label: 'Real-time API Latency', change: 'Ultra-low' },
            { value: '78%', label: 'Repeat Retention', change: 'Loyalty' },
            { value: '4.8/5', label: 'User Satisfaction', change: 'Top Tier' }
        ],
        techStack: ['Next.js', 'React Server Components', 'Neon DB', 'TailwindCSS', 'WebSockets'],
        features: [
            'Instant Natal Chart Generator with custom SVG rendering',
            'Real-time Astrologer Chat & Scheduling',
            'Daily Personalized Horoscopes with push notifications',
            'Subscription billing with tiered membership perks'
        ],
        testimonial: {
            quote: 'The design is breathtaking and our users love how lightning fast every reading loads.',
            author: 'Aanya Verma',
            role: 'Product Lead, Querent'
        },
        category: 'Platform'
    },
    {
        id: '5',
        slug: 'roxford-health',
        title: 'Modern Medical Services Portal & Telehealth Engine',
        subtitle: 'Simplifying patient care journeys with zero-friction appointment booking and secure medical records.',
        client: 'Roxford Health',
        industry: 'Healthcare & MedTech',
        year: '2025',
        color: '#a3e635',
        bgAccent: 'rgba(163, 230, 53, 0.15)',
        liveUrl: 'https://master--roxfordhealthcaretest.netlify.app/',
        image: 'https://i.ibb.co/8gqbNzcb/2.png',
        challenge: 'Patients struggled with cluttered healthcare portals, long phone wait times, and confusing doctor appointment slots.',
        solution: 'Engineered a calming, accessible, high-contrast healthcare portal with instant doctor availability filters, SMS reminders, and telemedicine video links.',
        metrics: [
            { value: '60%', label: 'Faster Check-ins', change: 'Efficiency' },
            { value: '85%', label: 'Reduced No-Shows', change: 'Automated' },
            { value: '10k+', label: 'Appointments Booked', change: 'Scale' },
            { value: '100%', label: 'Privacy Compliance', change: 'HIPAA Standard' }
        ],
        techStack: ['Next.js', 'TailwindCSS', 'PostgreSQL', 'Twilio API', 'Netlify Edge'],
        features: [
            'Doctor Speciality & Location filter',
            'Instant Calendar sync (Google, Apple, Outlook)',
            'Emergency Care Hotline 1-tap dialer',
            'Digital Prescription & Lab Report Viewer'
        ],
        testimonial: {
            quote: 'Our medical services portal is now seamless. Patient bookings are smooth, and the backend is robust.',
            author: 'Rohan Das',
            role: 'Healthcare Operations Lead'
        },
        category: 'Health'
    },
    {
        id: '6',
        slug: 'pixel-inventory-crm',
        title: 'Enterprise Supply Chain & Multi-Channel Lead Engine',
        subtitle: 'Powering modern retail, logistics, and B2B sales teams with real-time stock sync and automated lead pipelines.',
        client: 'Pixel CRM & Inventory OS',
        industry: 'Enterprise SaaS / B2B Software',
        year: '2025',
        color: '#38bdf8',
        bgAccent: 'rgba(56, 189, 248, 0.15)',
        liveUrl: 'https://crm.pixelwebpages.com/',
        image: 'https://i.ibb.co/MDRZ7svJ/1.png',
        challenge: 'Small and medium enterprises were juggling messy spreadsheets, disconnected inventory systems, and losing 30% of sales leads.',
        solution: 'Built a centralized cloud operating system with Kanban deal boards, barcode scanner integration, and automated webhook triggers.',
        metrics: [
            { value: '10x', label: 'Faster Audits', change: 'Speed' },
            { value: '40+', label: 'Automated Integrations', change: 'Ecosystem' },
            { value: '+220%', label: 'Sales Productivity', change: 'Boost' },
            { value: '0', label: 'Missed Leads', change: 'Zero Leakage' }
        ],
        techStack: ['Next.js 15', 'PostgreSQL', 'Neon Serverless', 'TailwindCSS', 'Webhooks API'],
        features: [
            'Drag-and-Drop Kanban Deal Pipelines',
            'Multi-Warehouse Real-Time Stock Sync',
            'Custom Invoice and GST Billing Generator',
            'Automated Email & WhatsApp Triggers'
        ],
        testimonial: {
            quote: 'Pixel CRM transformed chaos into clarity. It is the nervous system that runs our entire multi-city distribution network.',
            author: 'Vikram Malhotra',
            role: 'COO, Apex Retailers'
        },
        category: 'SaaS'
    }
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
    return CASE_STUDIES.find(cs => cs.slug === slug || cs.id === slug);
}
