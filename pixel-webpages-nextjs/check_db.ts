import { sql } from './lib/db';

async function checkTables() {
    try {
        const tables = await sql`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        `;
        console.log('Tables in DB:', tables.map(t => t.table_name));
    } catch (error) {
        console.error('Error checking tables:', error);
    }
    process.exit(0);
}

checkTables();
