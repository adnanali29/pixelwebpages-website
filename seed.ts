import { neon } from '@neondatabase/serverless';

const dbUrl = process.env.DATABASE_URL || "postgresql://neondb_owner:npg_zOEtlm85nBdM@ep-restless-paper-ax1xqdxz-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require";
const sql = neon(dbUrl);

async function seed() {
  console.log('Seeding database...');

  // 1. Projects
  await sql`DELETE FROM projects`;
  const projects = [
    { id: '1', name: 'Addy Meals', url: 'https://www.addymeals.com/', description: 'Fit Food & Healthy Meal Prep Platform', color: 'bg-[#60a5fa]', image: 'https://i.ibb.co/cc1RgLLz/BEIGE-VERTICAL-LOGO-ALT.png', category: 'Health & Fitness' },
    { id: '2', name: 'Dee Pets', url: 'https://pethealth.deepetservices.com/', description: 'Veterinary & Pet Health Blood Test Services', color: 'bg-[#fb923c]', image: 'https://i.ibb.co/MDRZ7svJ/1.png', category: 'Healthcare' },
    { id: '3', name: 'Beluga Global Exports', url: 'https://www.belugaglobalexports.com/', description: 'Seafood Cold-Chain & Global Logistics', color: 'bg-[#f472b6]', image: 'https://i.ibb.co/kgBj0d0Z/5.png', category: 'Logistics' },
    { id: '4', name: 'Viberoot Essentials', url: 'https://www.viberootessentials.com/', description: 'Organic Beauty & Wellness Store', color: 'bg-[#c084fc]', image: 'https://i.ibb.co/YTPj0HN5/3.png', category: 'E-Commerce' },
    { id: '5', name: 'Addy Fitness', url: 'https://addyfitness.com/', description: 'Fitness & Training Hub', color: 'bg-[#60a5fa]', image: 'https://i.ibb.co/kgBj0d0Z/5.png', category: 'Health & Fitness' },
    { id: '6', name: 'Sikhaid NGO', url: 'https://sikhaid.ngo/', description: 'Non-Profit Organization', color: 'bg-[#4ade80]', image: 'https://i.ibb.co/xqtNbtmF/4.png', category: 'Non-Profit' },
    { id: '7', name: 'Badsha magic world', url: 'https://badasha-landing-page.vercel.app/', description: 'Brand Landing Page', color: 'bg-[#facc15]', image: 'https://i.ibb.co/BKt0Wc74/1.png', category: 'Entertainment' },
    { id: '8', name: 'Querent', url: 'https://www.querent.xyz/', description: 'Astrology & Guidance Platform', color: 'bg-[#d4b2ff]', image: 'https://i.ibb.co/YTPj0HN5/3.png', category: 'Platform' },
    { id: '9', name: 'Roxford Health', url: 'https://master--roxfordhealthcaretest.netlify.app/', description: 'Medical Services Portal', color: 'bg-[#a3e635]', image: 'https://i.ibb.co/8gqbNzcb/2.png', category: 'Healthcare' }
  ];
  for (const p of projects) {
    await sql`
      INSERT INTO projects (id, name, url, description, color, image, category)
      VALUES (${p.id}, ${p.name}, ${p.url}, ${p.description}, ${p.color}, ${p.image}, ${p.category})
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name, url = EXCLUDED.url, description = EXCLUDED.description,
        color = EXCLUDED.color, image = EXCLUDED.image, category = EXCLUDED.category;
    `;
  }
  console.log('Projects seeded');

  // 2. Testimonials
  await sql`DELETE FROM testimonials`;
  const testimonials = [
    { id: '1', name: 'Raunak Singhal', role: 'Sikhaid NGO', rating: 5, text: 'Pixel WebPages helped us restart our donation drive. The transparency and connectivity have increased.' },
    { id: '2', name: 'Badsha Magic', role: 'Magician & Performer', rating: 5, text: 'My booking calendar has never been busier. The portfolio site they built captures the mystery and excitement of my shows perfectly.' },
    { id: '3', name: 'Mahesh Kumar', role: 'Lead Architect', rating: 5, text: 'Clean lines, modern structure—they understood my architectural philosophy and translated it into a stunning website.' },
    { id: '4', name: 'Rohan Das', role: 'Healthcare Ops', rating: 5, text: 'Our medical services portal is now seamless. Patient bookings are smooth, and the backend is robust.' }
  ];
  for (const t of testimonials) {
    await sql`
      INSERT INTO testimonials (id, name, role, rating, text)
      VALUES (${t.id}, ${t.name}, ${t.role}, ${t.rating}, ${t.text})
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name, role = EXCLUDED.role, rating = EXCLUDED.rating, text = EXCLUDED.text;
    `;
  }
  console.log('Testimonials seeded');

  // 3. Team Members
  await sql`DELETE FROM team_members`;
  const team = [
    { id: '1', name: 'Adnan', role: 'Founder', quote: 'Observe to learn, execute to lead', image: 'https://i.ibb.co/fGFZVb43/PHOTO-2025-10-17-16-18-48.jpg', color: 'bg-[#131316]' },
    { id: '2', name: 'Ayush', role: 'Co-Founder', quote: 'Code to create, act to innovate', image: 'https://i.ibb.co/Fbf7fBzC/Ayush.jpg', color: 'bg-[#131316]' },
    { id: '3', name: 'Anup Ojha', role: 'Software Developer', quote: 'Anything can be solved or achieved, you just need the right person.', image: 'https://i.ibb.co/DPKntW6p/PHOTO-2026-04-29-12-50-01.jpg', color: 'bg-[#131316]' }
  ];
  for (const tm of team) {
    await sql`
      INSERT INTO team_members (id, name, role, quote, image, color)
      VALUES (${tm.id}, ${tm.name}, ${tm.role}, ${tm.quote}, ${tm.image}, ${tm.color})
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name, role = EXCLUDED.role, quote = EXCLUDED.quote, image = EXCLUDED.image, color = EXCLUDED.color;
    `;
  }
  console.log('Team members seeded');

  // 4. Products
  await sql`DELETE FROM products`;
  const products = [
    {
      id: 'crm',
      name: 'Pixel CRM',
      icon_name: 'users',
      color: 'blue',
      short_desc: 'Manage leads like a pro. The ultimate tool for modern sales teams.',
      description: 'Pixel CRM transforms chaos into clarity. It is not just a database; it is an intelligent engine that drives your sales process.',
      benefits: ['Visual Sales Pipeline: Drag-and-drop deals.', 'Automated Follow-ups: Never let a hot lead go cold.', 'Centralized Data: Emails, notes, and tasks.'],
      explore_url: 'https://crm.pixelwebpages.com/',
      col_span: false
    },
    {
      id: 'inventory',
      name: 'Inventory OS',
      icon_name: 'box',
      color: 'green',
      short_desc: 'Real-time tracking. Never run out of stock again.',
      description: 'Inventory OS acts as the nervous system of your supply chain. It provides real-time visibility into stock levels across multiple warehouses.',
      benefits: ['Real-Time Sync: Updates instantly.', 'Smart Alerts: Get notified before stockouts.', 'Detailed Analytics: Turnover rates.'],
      explore_url: 'https://inventory.pixelwebpages.com/',
      col_span: false
    },
    {
      id: 'event',
      name: 'Event Flow',
      icon_name: 'calendar',
      color: 'purple',
      short_desc: 'Seamless event organization. From ticketing to guest management.',
      description: 'Event Flow takes the stress out of event management by unifying every moving part into a single dashboard.',
      benefits: ['End-to-End Management.', 'Vendor Coordination.', 'Live Guest Tracking via QR.'],
      explore_url: '#',
      col_span: false
    },
    {
      id: 'finance',
      name: 'Finance Hub',
      icon_name: 'dollar',
      color: 'yellow',
      short_desc: 'Track expenses, invoices, and growth.',
      description: 'Finance Hub demystifies business accounting. It tracks income and expenses in real-time, automates invoice generation.',
      benefits: ['Automated Invoicing.', 'Expense Categorization.', 'Growth Visualization.'],
      explore_url: '#',
      col_span: false
    },
    {
      id: 'retail',
      name: 'Retail Pro',
      icon_name: 'shopping-cart',
      color: 'orange',
      short_desc: 'Next-gen Point of Sale (POS) system. Streamline sales, manage inventory.',
      description: 'Retail Pro redefines the in-store experience. It is a modern Point of Sale system that integrates seamlessly with your inventory and customer relationship tools.',
      benefits: ['Omnichannel Ready: Connects your physical store with online sales.', 'Customer Loyalty: Built-in rewards program to boost retention.', 'Staff Management: Track performance and shifts easily.'],
      explore_url: '#',
      col_span: true
    }
  ];
  for (const prod of products) {
    await sql`
      INSERT INTO products (id, name, icon_name, color, short_desc, description, benefits, explore_url, col_span)
      VALUES (${prod.id}, ${prod.name}, ${prod.icon_name}, ${prod.color}, ${prod.short_desc}, ${prod.description}, ${JSON.stringify(prod.benefits)}, ${prod.explore_url}, ${prod.col_span})
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name, icon_name = EXCLUDED.icon_name, color = EXCLUDED.color,
        short_desc = EXCLUDED.short_desc, description = EXCLUDED.description,
        benefits = EXCLUDED.benefits, explore_url = EXCLUDED.explore_url, col_span = EXCLUDED.col_span;
    `;
  }
  console.log('Products seeded');

  // 5. Services
  await sql`DELETE FROM services`;
  const services = [
    {
      id: 'web-dev',
      title: 'Web Dev & Payments',
      color: 'bg-[#bef264]',
      text_color: 'text-black',
      description: 'Custom sites & secure payments.',
      sub_services: [
        { title: 'E-Commerce Store', desc: 'Robust online stores with payment gateways.', points: ['Seamless Payment Integration', 'Inventory Management', 'Analytics'] },
        { title: 'Corporate Portfolio', desc: 'Professional branding sites for firms.', points: ['Company History', 'Team Showcases', 'Careers Portal'] },
        { title: 'Landing Pages', desc: 'High-conversion single-page sites.', points: ['A/B Testing', 'Fast Loading', 'Optimized CTAs'] },
        { title: 'Payment Integration', desc: 'Secure gateway setup.', points: ['Razorpay', 'Stripe', 'UPI'] },
        { title: 'SaaS Dashboard', desc: 'Complex web applications.', points: ['User Auth', 'Real-time Data', 'Billing'] },
        { title: 'CMS Blogs', desc: 'Content-heavy platforms.', points: ['SEO Optimized', 'Admin Panel', 'Multi-author'] },
        { title: 'Non-Profit/NGO', desc: 'Donation-focused websites.', points: ['Secure Donation Gateway', 'Event Management', 'Volunteer Signups'] },
        { title: 'Shopify Store', desc: 'Rapid retail setup.', points: ['Custom Theme Design', 'App Integrations', 'Dropshipping Ready'] },
        { title: 'WordPress Site', desc: 'Flexible content management.', points: ['Plugin Ecosystem', 'Easy-to-Edit Content', 'SEO Plugin Setup'] }
      ]
    },
    {
      id: 'ui-ux',
      title: 'UI/UX Designing',
      color: 'bg-[#c084fc]',
      text_color: 'text-black',
      description: 'User-centric interfaces.',
      sub_services: [
        { title: 'Mobile App Design', desc: 'iOS and Android interface design.', points: ['iOS & Android Guidelines', 'Gestures', 'Dark Mode'] },
        { title: 'Prototyping', desc: 'Interactive mockups.', points: ['Clickable Demos', 'User Testing', 'Micro-interactions'] },
        { title: 'Wireframing', desc: 'Low-fidelity structural blueprints.', points: ['User Journey', 'Info Architecture', 'Layouts'] },
        { title: 'Design Systems', desc: 'Comprehensive style guides.', points: ['Typography', 'Color Palettes', 'Components'] }
      ]
    },
    {
      id: 'trademark',
      title: 'Trademark Registration',
      color: 'bg-[#a855f7]',
      text_color: 'text-white',
      description: 'Protect your brand identity.',
      sub_services: [
        { title: 'Brand Protection', desc: 'Secure your brand name and logo.', points: ['Class Selection', 'Application Filing', 'Status Tracking'] },
        { title: 'Objection Handling', desc: 'Legal replies to registry objections.', points: ['Drafting Responses', 'Hearing Representation', 'Affidavits'] },
        { title: 'Copyright Filing', desc: 'Protect creative assets.', points: ['Software Code', 'Artistic Work', 'Literary Content'] },
        { title: 'Renewal Services', desc: 'Maintain valid trademark status.', points: ['Timely Alerts', 'Fee Processing', '10-Year Extension'] }
      ]
    },
    {
      id: 'gst-legal',
      title: 'GST & Legal',
      color: 'bg-[#94a3b8]',
      text_color: 'text-black',
      description: 'Compliance and business laws.',
      sub_services: [
        { title: 'Company Inc.', desc: 'Pvt Ltd, LLP, or OPC registration.', points: ['DSC & DIN', 'MoA & AoA', 'Certificate of Inc.'] },
        { title: 'GST Reg. & Filing', desc: 'New setup & monthly return filing.', points: ['New GSTIN', 'GSTR-1 & 3B', 'Input Tax Credit'] },
        { title: 'Legal Agreements', desc: 'Contracts, NDAs, and bonds.', points: ['Client Contracts', 'Vendor Agreements', 'Employment Bonds'] },
        { title: 'Audit Support', desc: 'Financial compliance and audits.', points: ['Bookkeeping', 'Tax Audit', 'Balance Sheet'] }
      ]
    },
    {
      id: 'logo-design',
      title: 'Logo Designing',
      color: 'bg-[#2dd4bf]',
      text_color: 'text-black',
      description: 'Brand identity & visuals.',
      sub_services: [
        { title: 'Brand Identity', desc: 'Complete visual language for your brand.', points: ['Visual Tone Voice', 'Color Psychology', 'Brand Guidelines'] },
        { title: 'Monograms', desc: 'Minimalist lettermark logos.', points: ['Initials Based', 'Geometric Design', 'Scalable Vector'] },
        { title: 'Wordmarks', desc: 'Typography-based logos.', points: ['Custom Fonts', 'Kerning', 'Distinctive Style'] },
        { title: 'Rebranding', desc: 'Modernizing existing brand assets.', points: ['Market Alignment', 'Modern Aesthetics', 'Asset Updates'] }
      ]
    },
    {
      id: 'performance-marketing',
      title: 'Performance Marketing',
      color: 'bg-[#f472b6]',
      text_color: 'text-black',
      description: 'Data-driven growth.',
      sub_services: [
        { title: 'SEO/SEM', desc: 'Search engine optimization & marketing.', points: ['Keyword Research', 'On-Page Optimization', 'Backlink Strategy'] },
        { title: 'Social Ads', desc: 'Targeted campaigns on IG, LinkedIn & FB.', points: ['Audience Targeting', 'A/B Testing', 'ROI Tracking'] },
        { title: 'Analytics', desc: 'Deep dive into user behavior.', points: ['Funnel Analysis', 'Heatmaps', 'Traffic Reports'] },
        { title: 'Content Strategy', desc: 'Engaging content for higher retention.', points: ['Blog Planning', 'Social Calendars', 'Engagement Metrics'] }
      ]
    },
    {
      id: 'app-dev',
      title: 'Application & Software',
      color: 'bg-[#60a5fa]',
      text_color: 'text-black',
      description: 'Mobile and desktop solutions.',
      sub_services: [
        { title: 'Native iOS/Android', desc: 'High-performance mobile apps.', points: ['Swift & Kotlin', 'Device Features', 'Store Approval'] },
        { title: 'Cross-Platform', desc: 'React Native or Flutter apps.', points: ['Single Codebase', 'Faster Delivery', 'Cost Effective'] },
        { title: 'Desktop Software', desc: 'Electron or native desktop apps.', points: ['Offline Capabilities', 'System Integration', 'Large Screen UX'] },
        { title: 'Internal Tools', desc: 'Custom operations software.', points: ['Automation', 'Data Entry', 'Admin Controls'] }
      ]
    },
    {
      id: 'cloud',
      title: 'Cloud Migration',
      color: 'bg-[#fb923c]',
      text_color: 'text-black',
      description: 'Scalable infrastructure.',
      sub_services: [
        { title: 'AWS/Azure Setup', desc: 'Secure, scalable environments.', points: ['Instances', 'Load Balancing', 'Security Groups'] },
        { title: 'Database Migration', desc: 'Moving legacy data systems.', points: ['Zero Downtime', 'Data Integrity', 'Schema Mapping'] },
        { title: 'Serverless Arch', desc: 'Cost-effective functions.', points: ['Pay-per-use', 'Auto-scaling', 'Event Driven'] }
      ]
    },
    {
      id: 'linkedin',
      title: 'LinkedIn Management',
      color: 'bg-[#2563eb]',
      text_color: 'text-white',
      description: 'Professional branding growth.',
      sub_services: [
        { title: 'Profile Optimization', desc: 'Revamping bios and headlines.', points: ['Headline Crafting', 'Skill Tagging', 'Banner Design'] },
        { title: 'Content Strategy', desc: 'Ghostwriting thought leadership.', points: ['Industry Insights', 'Storytelling', 'Consistent Posting'] },
        { title: 'Lead Generation', desc: 'Targeted outreach campaigns.', points: ['Connection Requests', 'Cold Messaging', 'Network Growth'] }
      ]
    },
    {
      id: 'graphics',
      title: 'Poster/Flyer Design',
      color: 'bg-[#e879f9]',
      text_color: 'text-black',
      description: 'Print and digital visual assets.',
      sub_services: [
        { title: 'Event Posters', desc: 'Eye-catching visuals.', points: ['High Resolution', 'Visual Hierarchy', 'Call To Action'] },
        { title: 'Business Flyers', desc: 'Informational handouts.', points: ['Compact Info', 'Distributable', 'QR Codes'] },
        { title: 'Print Management', desc: 'Technical details for printing.', points: ['CMYK Color Mode', 'Bleed & Trim Setup', 'Paper Selection'] }
      ]
    },
    {
      id: 'signage',
      title: 'Signage Designing',
      color: 'bg-[#facc15]',
      text_color: 'text-black',
      description: 'Large format outdoor advertising.',
      sub_services: [
        { title: 'Billboards', desc: 'Large-scale visuals.', points: ['High Impact', 'Simple Messaging', 'Distance Readability'] },
        { title: 'Storefronts', desc: 'Window decals and 3D lettering.', points: ['Vinyl Decals', 'Channel Letters', 'Lighting Effects'] },
        { title: 'Wayfinding', desc: 'Directional signage.', points: ['Clear Icons', 'Directory Maps', 'Accessibility'] }
      ]
    },
    {
      id: 'ppt',
      title: 'PPT Making',
      color: 'bg-[#f87171]',
      text_color: 'text-black',
      description: 'Professional decks.',
      sub_services: [
        { title: 'Investor Pitch', desc: 'Compelling narratives.', points: ['Financial Projections', 'Market Sizing', 'Problem/Solution'] },
        { title: 'Corporate Sales', desc: 'Standardized templates.', points: ['Product Specs', 'Case Studies', 'Pricing Tables'] },
        { title: 'Educational', desc: 'Clear, engaging slides.', points: ['Visual Aids', 'Summaries', 'Interactive Elements'] }
      ]
    },
    {
      id: 'sales-marketing',
      title: 'Sales & Marketing',
      color: 'bg-[#4ade80]',
      text_color: 'text-black',
      description: 'Accelerate revenue and growth.',
      sub_services: [
        { title: 'Sales Funnel', desc: 'Optimizing the customer journey.', points: ['Lead Magnet Design', 'Landing Page Ops', 'Conversion Tracking'] },
        { title: 'Marketing Plans', desc: 'Strategic roadmaps for growth.', points: ['Competitor Analysis', 'Channel Strategy', 'Budget Allocation'] },
        { title: 'Lead Nurturing', desc: 'Automated email sequences.', points: ['Drip Campaigns', 'CRM Integration', 'Customer Segmentation'] },
        { title: 'Market Research', desc: 'Data-driven insights.', points: ['Customer Surveys', 'Trend Analysis', 'SWOT Analysis'] }
      ]
    }
  ];
  for (const s of services) {
    await sql`
      INSERT INTO services (id, title, color, text_color, description, sub_services)
      VALUES (${s.id}, ${s.title}, ${s.color}, ${s.text_color}, ${s.description}, ${JSON.stringify(s.sub_services)})
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title, color = EXCLUDED.color, text_color = EXCLUDED.text_color,
        description = EXCLUDED.description, sub_services = EXCLUDED.sub_services;
    `;
  }
  console.log('Services seeded');

  // 6. Blogs
  await sql`DELETE FROM blogs`;
  const blogs = [
    {
      id: '1',
      title: 'Next.js vs React: High-Performance Websites',
      date: 'Dec 05, 2024',
      tag: 'Tech',
      color: 'bg-blue-400',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=600&auto=format&fit=crop',
      content: 'In the rapidly evolving landscape of modern web development, the choice between using a library like React and a framework like Next.js is a pivotal decision. Next.js offers built-in server-side rendering, routing, and optimization out of the box.'
    },
    {
      id: '2',
      title: 'Psychology of Color in UI Design',
      date: 'Dec 03, 2024',
      tag: 'UI/UX',
      color: 'bg-purple-400',
      image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=600&auto=format&fit=crop',
      content: 'Color is one of the most fundamental elements of design, yet it is often treated as a mere aesthetic choice. In reality, color is a powerful psychological tool that evokes emotion, guides focus, and influences conversion.'
    },
    {
      id: '3',
      title: 'Building Scalable SaaS Architectures',
      date: 'Oct 25, 2024',
      tag: 'Tech',
      color: 'bg-teal-400',
      image: 'https://images.unsplash.com/photo-1558494949-efc02570fbc9?q=80&w=600&auto=format&fit=crop',
      content: 'In the SaaS world, success can be your biggest problem if your systems cannot scale. Scalability is not an afterthought; it must be built into the database schema, caching layers, and serverless execution models.'
    }
  ];
  for (const b of blogs) {
    await sql`
      INSERT INTO blogs (id, title, date, tag, color, image, content)
      VALUES (${b.id}, ${b.title}, ${b.date}, ${b.tag}, ${b.color}, ${b.image}, ${b.content})
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title, date = EXCLUDED.date, tag = EXCLUDED.tag,
        color = EXCLUDED.color, image = EXCLUDED.image, content = EXCLUDED.content;
    `;
  }
  console.log('Blogs seeded');

  // 7. Admin Settings
  await sql`
    INSERT INTO admin_settings (key, setting_key, setting_value)
    VALUES ('admin_password', 'admin_password', '12345')
    ON CONFLICT (key) DO UPDATE SET 
      setting_key = EXCLUDED.setting_key,
      setting_value = EXCLUDED.setting_value;
  `;
  console.log('Admin settings seeded');

  console.log('All data seeded successfully!');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seeding error:', err);
  process.exit(1);
});
