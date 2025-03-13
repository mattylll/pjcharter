const fs = require('fs');
const path = require('path');
const { loadLocations, loadAircraft, loadServices, loadRoutes } = require('../lib/utils/dataLoader');

// Base URL of the website
const BASE_URL = 'https://pjcharter.com';

// Maximum URLs per sitemap file
const MAX_URLS_PER_SITEMAP = 5000;

/**
 * Generate sitemap XML content
 * @param {string[]} urls Array of URLs to include in the sitemap
 * @returns {string} XML content
 */
function generateSitemapXml(urls) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  urls.forEach(url => {
    xml += '  <url>\n';
    xml += `    <loc>${url}</loc>\n`;
    xml += '    <changefreq>weekly</changefreq>\n';
    xml += '    <priority>0.8</priority>\n';
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  return xml;
}

/**
 * Generate sitemap index XML content
 * @param {string[]} sitemapUrls Array of sitemap URLs
 * @returns {string} XML content
 */
function generateSitemapIndexXml(sitemapUrls) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  sitemapUrls.forEach(url => {
    xml += '  <sitemap>\n';
    xml += `    <loc>${url}</loc>\n`;
    xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
    xml += '  </sitemap>\n';
  });
  
  xml += '</sitemapindex>';
  return xml;
}

/**
 * Split URLs into chunks for multiple sitemaps
 * @param {string[]} urls Array of all URLs
 * @param {number} chunkSize Maximum URLs per sitemap
 * @returns {string[][]} Array of URL chunks
 */
function chunkUrls(urls, chunkSize) {
  const chunks = [];
  for (let i = 0; i < urls.length; i += chunkSize) {
    chunks.push(urls.slice(i, i + chunkSize));
  }
  return chunks;
}

/**
 * Write sitemap files to the public directory
 * @param {string[][]} urlChunks Chunks of URLs for each sitemap
 * @param {string} prefix Prefix for the sitemap filename
 */
async function writeSitemapFiles(urlChunks, prefix) {
  const sitemapUrls = [];
  
  // Create public directory if it doesn't exist
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    await fs.promises.mkdir(publicDir);
  }
  
  // Write each sitemap file
  for (let i = 0; i < urlChunks.length; i++) {
    const filename = urlChunks.length === 1 ? `${prefix}.xml` : `${prefix}${i + 1}.xml`;
    const filePath = path.join(publicDir, filename);
    const sitemapXml = generateSitemapXml(urlChunks[i]);
    
    await fs.promises.writeFile(filePath, sitemapXml);
    console.log(`✅ Generated ${filePath}`);
    
    sitemapUrls.push(`${BASE_URL}/${filename}`);
  }
  
  return sitemapUrls;
}

/**
 * Generate all sitemaps for the website
 */
async function generateSitemaps() {
  try {
    console.log('🔄 Generating sitemaps...');
    
    // Load data
    const locations = loadLocations();
    const aircraft = loadAircraft();
    const services = loadServices();
    const routes = loadRoutes();
    
    // Generate URLs for static pages
    const staticUrls = [
      `${BASE_URL}`,
      `${BASE_URL}/destinations`,
      `${BASE_URL}/aircraft`,
      `${BASE_URL}/services`,
      `${BASE_URL}/routes`,
      `${BASE_URL}/booking`,
      `${BASE_URL}/contact`,
      `${BASE_URL}/about`,
      `${BASE_URL}/blog`,
      `${BASE_URL}/testimonials`,
      `${BASE_URL}/faq`,
      `${BASE_URL}/privacy-policy`,
      `${BASE_URL}/terms-of-service`,
    ];
    
    // Generate URLs for dynamic pages
    const destinationUrls = locations.map(location => `${BASE_URL}/destinations/${location.id.toLowerCase()}`);
    const aircraftUrls = aircraft.map(aircraft => `${BASE_URL}/aircraft/${aircraft.id.toLowerCase()}`);
    const serviceUrls = services.map(service => `${BASE_URL}/services/${service.slug}`);
    const routeUrls = routes.map(route => `${BASE_URL}/routes/${route.id.toLowerCase()}`);
    
    // Group URLs by type
    const urlGroups = {
      static: staticUrls,
      destinations: destinationUrls,
      aircraft: aircraftUrls,
      services: serviceUrls,
      routes: routeUrls,
    };
    
    // Generate sitemap files for each group
    const sitemapUrls = [];
    
    for (const [groupName, urls] of Object.entries(urlGroups)) {
      const urlChunks = chunkUrls(urls, MAX_URLS_PER_SITEMAP);
      const groupSitemapUrls = await writeSitemapFiles(urlChunks, `sitemap-${groupName}`);
      sitemapUrls.push(...groupSitemapUrls);
    }
    
    // Generate sitemap index
    const indexPath = path.join(process.cwd(), 'public', 'sitemap.xml');
    const indexXml = generateSitemapIndexXml(sitemapUrls);
    
    await fs.promises.writeFile(indexPath, indexXml);
    console.log(`✅ Generated ${indexPath}`);
    
    console.log('✅ All sitemaps generated successfully!');
  } catch (error) {
    console.error('❌ Error generating sitemaps:', error);
    process.exit(1);
  }
}

// Run the sitemap generator
generateSitemaps();
