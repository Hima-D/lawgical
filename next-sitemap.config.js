/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.lawgical.tech',
  generateRobotsTxt: true,   // still generate robots.txt
  sitemapSize: 50000,        // keep one main sitemap

  changefreq: 'daily',
  priority: 0.7,

  exclude: ['/api/*', '/404', '/500'],

  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    };
  },

  // ❌ override robotsTxt generation
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/api', '/404', '/500'] },
    ],
    additionalSitemaps: [
      'https://www.lawgical.tech/sitemap-0.xml', // hardcoded correct sitemap
    ],
  },
};
