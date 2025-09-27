import { NextResponse } from 'next/server';

// Sample services data (replace with actual import from '@/components/services')
const services = [
  { title: "Company Registration" },
  { title: "GST Registration" },
  { title: "Trademark Registration" },
  { title: "Legal Consultation" },
  { title: "POSH Compliance" },
  { title: "Contract Drafting" },
  { title: "Intellectual Property" },
  { title: "Tax Planning" },
  { title: "Labor Law" },
];

// Function to slugify service titles
const slugify = (text) => {
  if (!text || typeof text !== 'string') return '';
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

// Function to validate URLs
const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Generate sitemap XML
export async function GET() {
  const baseUrl = 'https://www.lawgical.tech';
  const currentDate = new Date().toISOString().split('T')[0]; // 2025-09-27

  // Static pages (aligned with LawgicalHomepage and ConsultationModal links)
  const staticPages = [
    {
      url: `${baseUrl}/`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 1.0, // Homepage is most important
    },
    {
      url: `${baseUrl}/service`, // Matches Link in LawgicalHomepage
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`, // From ConsultationModal
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/terms-of-service`, // From ConsultationModal
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/consultation`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blogs`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.6,
    },
  ];

  // Dynamic service pages
  const servicePages = services.map((service) => {
    const slug = slugify(service.title);
    return {
      url: `${baseUrl}/service/${slug}`, // Changed to /service/ to match LawgicalHomepage's Link
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.7,
    };
  });

  // Combine and validate pages
  const allPages = [...staticPages, ...servicePages].filter((page) => isValidUrl(page.url));

  // Generate XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages
    .map(
      (page) => `
    <url>
      <loc>${page.url}</loc>
      <lastmod>${page.lastmod}</lastmod>
      <changefreq>${page.changefreq}</changefreq>
      <priority>${page.priority}</priority>
    </url>`
    )
    .join('')}
</urlset>`;

  // Error handling for empty sitemap
  if (allPages.length === 0) {
    return new NextResponse('Error: No valid URLs found for sitemap', {
      status: 500,
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  // Return response with XML content type
  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate',
    },
  });
}
