'use server';

import { getSql } from './db';
import type {
    Project,
    Testimonial,
    TeamMember,
    Product,
    Service,
    Blog,
    ContactSubmission,
    AdminSettings
} from './types';

// Projects
export async function getProjects() {
    const data = await getSql()`SELECT * FROM projects ORDER BY created_at DESC`;
    return data as Project[];
}

// Testimonials
export async function getTestimonials() {
    try {
        const data = await getSql()`SELECT * FROM testimonials ORDER BY created_at DESC`;
        if (data && data.length > 0) {
            return data as Testimonial[];
        }
    } catch (error) {
        console.error('Error fetching testimonials:', error);
    }

    // Fallback professional testimonials if DB is empty
    return [
        {
            id: 'f1',
            name: 'Sarah Jenkins',
            role: 'CEO, Addy Fitness',
            rating: 5,
            text: 'Pixel Webpages transformed our online presence. Their attention to detail in the UI is unmatched. The project was delivered ahead of schedule and exceeded all expectations.'
        },
        {
            id: 'f2',
            name: 'Mike Chen',
            role: 'Marketing Director',
            rating: 5,
            text: 'The speed of the Next.js site they built for us is incredible. Our conversions have doubled since relaunch. Highly recommend for any business looking to scale.'
        },
        {
            id: 'f3',
            name: 'Emma Thompson',
            role: 'Founder, Flow-ai',
            rating: 5,
            text: 'The most professional agency I\'ve worked with. They really understand modern design and interactive user experiences. Truly a partner in our growth.'
        }
    ] as Testimonial[];
}

// Team Members
export async function getTeamMembers() {
    const data = await getSql()`SELECT * FROM team_members ORDER BY created_at ASC`;
    return data as TeamMember[];
}

// Products
export async function getProducts() {
    const data = await getSql()`SELECT * FROM products ORDER BY created_at ASC`;
    return data as Product[];
}

// Services
export async function getServices() {
    const data = await getSql()`SELECT * FROM services ORDER BY created_at ASC`;
    return data as Service[];
}

// Blogs
export async function getBlogs() {
    const data = await getSql()`SELECT * FROM blogs ORDER BY created_at DESC`;
    return data as Blog[];
}

// Submissions
export async function addContactSubmission(submission: Omit<ContactSubmission, 'id' | 'created_at'>) {
    const { name, email, phone, message } = submission;
    await getSql()`
        INSERT INTO contact_submissions (name, email, phone, message)
        VALUES (${name}, ${email}, ${phone}, ${message})
    `;
}

export async function addDemoRequest(request: { name: any; email: any; phone: any; product_name: any; message: any; }) {
    const { name, email, phone, product_name, message } = request;
    await getSql()`
        INSERT INTO demo_requests (name, email, phone, product_name, message)
        VALUES (${name}, ${email}, ${phone}, ${product_name}, ${message})
    `;
}

export async function addExploreLead(lead: { name: any; email: any; phone: any; product_name: any; message: any; }) {
    const { name, email, phone, product_name, message } = lead;
    await getSql()`
        INSERT INTO explore_leads (name, email, phone, product_name, message)
        VALUES (${name}, ${email}, ${phone}, ${product_name}, ${message})
    `;
}

// Admin Operations
export async function getAllData() {
    const sql = getSql();
    const [
        projects,
        testimonials,
        team_members,
        products,
        services,
        blogs,
        contact_submissions,
        demo_requests,
        explore_leads
    ] = await Promise.all([
        getProjects(),
        getTestimonials(),
        getTeamMembers(),
        getProducts(),
        getServices(),
        getBlogs(),
        sql`SELECT * FROM contact_submissions ORDER BY created_at DESC`,
        sql`SELECT * FROM demo_requests ORDER BY created_at DESC`,
        sql`SELECT * FROM explore_leads ORDER BY created_at DESC`
    ]);

    return {
        projects,
        testimonials,
        team_members,
        products,
        services,
        blogs,
        contact_submissions,
        demo_requests,
        explore_leads
    };
}

export async function updateRecord(table: string, id: string, data: any) {
    const keys = Object.keys(data).filter(k => k !== 'id' && k !== 'created_at' && k !== 'updated_at');
    if (keys.length === 0) return;

    const setClause = keys.map((key, i) => `${key} = $${i + 2}`).join(', ');
    const values = keys.map(key => data[key]);

    const query = `UPDATE ${table} SET ${setClause} WHERE id = $1`;
    const finalValues = values.map(v => (typeof v === 'object' && v !== null) ? JSON.stringify(v) : v);
    await (getSql() as any).query(query, [id, ...finalValues]);
}

export async function insertRecord(table: string, data: any) {
    const keys = Object.keys(data).filter(k => k !== 'id' && k !== 'created_at' && k !== 'updated_at');
    const cols = keys.join(', ');
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
    const values = keys.map(key => data[key]);

    const query = `INSERT INTO ${table} (${cols}) VALUES (${placeholders})`;
    const finalValues = values.map(v => (typeof v === 'object' && v !== null) ? JSON.stringify(v) : v);
    await (getSql() as any).query(query, finalValues);
}

export async function deleteRecord(table: string, id: string) {
    const query = `DELETE FROM ${table} WHERE id = $1`;
    await (getSql() as any).query(query, [id]);
}

// Admin Settings (Password)
export async function getAdminPassword() {
    const data = await getSql()`SELECT setting_value FROM admin_settings WHERE setting_key = 'admin_password'`;
    return data[0]?.setting_value || '12345';
}

export async function updateAdminPassword(newPassword: string) {
    await getSql()`
        UPDATE admin_settings
        SET setting_value = ${newPassword}
        WHERE setting_key = 'admin_password'
    `;
    return true;
}
