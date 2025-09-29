import { NextResponse } from 'next/server';

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
  const currentDate = new Date().toISOString().split('T')[0]; // e.g., 2025-09-29

  // Static pages from provided XML
  const staticPages = [
    {
      url: `${baseUrl}/`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 1.0, // Higher priority for homepage
    },
    {
      url: `${baseUrl}/sitemap.xml`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/aboutus`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/appointments`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blogs`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/careers`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/chat`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/companies`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/consultation`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contract-law`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/documents`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/litigation`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/payment`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/pocso`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/posh`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/posh/register`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/service`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/signin`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/signup`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/team`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 0.7,
    },
  ];

  // Validate pages
  const allPages = staticPages.filter((page) => isValidUrl(page.url));

  // Generate XML with additional namespaces
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
>
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
