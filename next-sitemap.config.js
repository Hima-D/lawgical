/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.lawgical.tech',
  generateRobotsTxt: true,
  sitemapSize: 5000,

  // Global defaults for all routes
  changefreq: 'daily',
  priority: 0.7,

  // Exclude unwanted routes
  exclude: [
    '/api/*', // exclude all API routes
    '/server-sitemap.xml', // if you're generating server-side sitemap
    '/404', 
    '/500'
  ],

  // Fine-tune how each path is transformed into sitemap entry
  transform: async (config, path) => {
    // Homepage gets highest priority
    if (path === '/') {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      };
    }

    // Blogs update less frequently
    if (path.startsWith('/blog')) {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.6,
        lastmod: new Date().toISOString(),
      };
    }

    // Legal resources (important for SEO)
    if (path.startsWith('/legal') || path.startsWith('/resources')) {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      };
    }

    // Default for all other pages
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    };
  },

  // Robots.txt setup
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/api', '/404', '/500'] },
    ],
    additionalSitemaps: [
      'https://www.lawgical.tech/sitemap.xml', // default sitemap
      'https://www.lawgical.tech/server-sitemap.xml', // server generated (if any)
    ],
  },
};
