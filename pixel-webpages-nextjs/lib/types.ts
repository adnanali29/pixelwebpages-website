// TypeScript types for the application

export interface Project {
    id: string;
    name: string;
    url: string;
    description: string;
    color: string;
    image: string;
    category?: string;
    created_at?: string;
    updated_at?: string;
}

export interface Testimonial {
    id: string;
    name: string;
    role: string;
    rating: number;
    text: string;
    created_at?: string;
    updated_at?: string;
}

export interface TeamMember {
    id: string;
    name: string;
    role: string;
    quote: string;
    image: string;
    color: string;
    created_at?: string;
    updated_at?: string;
}

export interface Product {
    id: string;
    name: string;
    icon_name: string;
    color: string;
    short_desc: string;
    description: string;
    benefits: string[];
    explore_url: string;
    col_span?: boolean;
    created_at?: string;
    updated_at?: string;
}

export interface SubService {
    title: string;
    desc: string;
    points: string[];
}

export interface Service {
    id: string;
    title: string;
    color: string;
    text_color: string;
    description: string;
    sub_services: SubService[];
    created_at?: string;
    updated_at?: string;
}

export interface Blog {
    id: string;
    title: string;
    date: string;
    tag: string;
    color: string;
    image: string;
    content: string;
    created_at?: string;
    updated_at?: string;
}

export interface ContactSubmission {
    id: string;
    name: string;
    email: string;
    phone: string;
    description: string;
    submitted_at: string;
}

export interface AdminSettings {
    id: string;
    setting_key: string;
    setting_value: string;
    created_at?: string;
    updated_at?: string;
}
