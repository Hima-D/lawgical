/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.lawgical.tech',
  generateRobotsTxt: true, // optional
  sitemapSize: 5000,
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/secret-page'], // pages you don’t want in sitemap
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
};
