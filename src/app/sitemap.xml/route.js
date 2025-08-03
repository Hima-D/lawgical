import { NextResponse } from 'next/server';
import services from '@/components/services';

// Function to slugify service titles
const slugify = (text) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

// Generate sitemap XML
export async function GET() {
  const baseUrl = 'https://lawgical.com';
  const currentDate = new Date().toISOString().split('T')[0]; // Current date: 2025-08-03

  // Static pages
  const staticPages = [
    {
      url: `${baseUrl}/`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/consultation`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/payment`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.6,
    },
  ];

  // Dynamic service pages
  const servicePages = services.map((service) => ({
    url: `${baseUrl}/services/${slugify(service.title)}`,
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: 0.6,
  }));

  // Combine all pages
  const allPages = [...staticPages, ...servicePages];

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

  // Return response with XML content type
  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
