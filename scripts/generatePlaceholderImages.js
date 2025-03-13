#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

// Configuration
const config = {
  // Base directory for images
  imageBaseDir: path.join(process.cwd(), 'public', 'images'),
  
  // Placeholder image service URL
  placeholderService: 'https://placehold.co',
  
  // Default image dimensions
  dimensions: {
    desktop: { width: 1920, height: 1080 },
    tablet: { width: 768, height: 432 },
    mobile: { width: 375, height: 211 },
  },
  
  // Categories to generate placeholders for
  categories: [
    {
      name: 'aircraft',
      subcategories: [
        { path: 'gulfstream-g650/exterior', count: 3 },
        { path: 'gulfstream-g650/interior', count: 3 },
        { path: 'gulfstream-g650/cabin', count: 2 },
        { path: 'gulfstream-g650/cockpit', count: 1 },
        { path: 'gulfstream-g650/features', count: 3 },
      ],
      responsive: true,
      text: 'Aircraft',
    },
    {
      name: 'destinations',
      subcategories: [
        { path: 'europe/united-kingdom/london/aerial', count: 2 },
        { path: 'europe/united-kingdom/london/landmarks', count: 3 },
        { path: 'europe/united-kingdom/london/airport', count: 2 },
        { path: 'europe/united-kingdom/london/lifestyle', count: 3 },
        { path: 'europe/france/paris/landmarks', count: 3 },
        { path: 'europe/france/paris/aerial', count: 2 },
        { path: 'europe/france/paris/lifestyle', count: 2 },
        { path: 'north-america/usa/new-york/aerial', count: 2 },
        { path: 'north-america/usa/new-york/landmarks', count: 3 },
        { path: 'north-america/usa/new-york/lifestyle', count: 2 },
      ],
      responsive: true,
      text: 'Destination',
    },
    {
      name: 'hero',
      subcategories: [
        { path: 'homepage', count: 1 },
        { path: 'aircraft', count: 1 },
        { path: 'destinations', count: 1 },
        { path: 'services', count: 1 },
        { path: 'seasonal/summer', count: 1 },
        { path: 'seasonal/winter', count: 1 },
      ],
      responsive: true,
      text: 'Hero',
    },
    {
      name: 'routes',
      subcategories: [
        { path: 'london-to-paris/map', count: 1 },
        { path: 'london-to-paris/featured', count: 1 },
      ],
      responsive: false,
      text: 'Route',
    },
    {
      name: 'services',
      subcategories: [
        { path: 'charter', count: 3 },
        { path: 'concierge', count: 3 },
        { path: 'experiences', count: 3 },
        { path: 'corporate', count: 2 },
      ],
      responsive: true,
      text: 'Service',
    },
    {
      name: 'team',
      subcategories: [
        { path: 'executives', count: 3 },
        { path: 'pilots', count: 2 },
        { path: 'crew', count: 2 },
        { path: 'office', count: 1 },
      ],
      responsive: false,
      text: 'Team',
    },
    {
      name: 'testimonials',
      subcategories: [
        { path: 'clients', count: 3 },
        { path: 'partners', count: 2 },
      ],
      responsive: false,
      text: 'Testimonial',
    },
  ],
  
  // Device types for responsive images
  deviceTypes: ['desktop', 'tablet', 'mobile'],
  
  // Background and text colors for placeholder images
  colors: [
    { bg: '1a2b3c', text: 'ffffff' }, // Dark blue with white text
    { bg: '3c1a2b', text: 'ffffff' }, // Dark purple with white text
    { bg: '2b3c1a', text: 'ffffff' }, // Dark green with white text
    { bg: '2b1a3c', text: 'ffffff' }, // Dark indigo with white text
    { bg: '3c2b1a', text: 'ffffff' }, // Dark brown with white text
  ],
};

// Function to download a file from a URL
function downloadFile(url, destination) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destination);
    
    https.get(url, (response) => {
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        resolve();
      });
      
      file.on('error', (err) => {
        fs.unlink(destination, () => {});
        reject(err);
      });
    }).on('error', (err) => {
      fs.unlink(destination, () => {});
      reject(err);
    });
  });
}

// Function to ensure a directory exists
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Function to generate a placeholder image URL
function generatePlaceholderUrl(width, height, category, index, colorIndex) {
  const color = config.colors[colorIndex % config.colors.length];
  const text = `${category} ${index + 1}`;
  
  return `${config.placeholderService}/${width}x${height}/${color.bg}/${color.text}?text=${encodeURIComponent(text)}`;
}

// Function to generate placeholder images for a category
async function generatePlaceholdersForCategory(category, colorIndexStart = 0) {
  console.log(`Generating placeholders for ${category.name}...`);
  
  let colorIndex = colorIndexStart;
  
  for (const subcategory of category.subcategories) {
    const subcategoryPath = path.join(config.imageBaseDir, category.name, subcategory.path);
    ensureDirectoryExists(subcategoryPath);
    
    for (let i = 0; i < subcategory.count; i++) {
      const baseName = `${path.basename(subcategory.path)}-${i + 1}`;
      
      if (category.responsive) {
        // Generate responsive variants
        for (const deviceType of config.deviceTypes) {
          const dimensions = config.dimensions[deviceType];
          const fileName = `${baseName}-${deviceType}.jpg`;
          const filePath = path.join(subcategoryPath, fileName);
          
          const url = generatePlaceholderUrl(
            dimensions.width,
            dimensions.height,
            category.text,
            i,
            colorIndex
          );
          
          try {
            await downloadFile(url, filePath);
            console.log(`Created ${filePath}`);
          } catch (error) {
            console.error(`Error creating ${filePath}:`, error);
          }
        }
      } else {
        // Generate a single image
        const dimensions = config.dimensions.desktop;
        const fileName = `${baseName}.jpg`;
        const filePath = path.join(subcategoryPath, fileName);
        
        const url = generatePlaceholderUrl(
          dimensions.width,
          dimensions.height,
          category.text,
          i,
          colorIndex
        );
        
        try {
          await downloadFile(url, filePath);
          console.log(`Created ${filePath}`);
        } catch (error) {
          console.error(`Error creating ${filePath}:`, error);
        }
      }
      
      colorIndex++;
    }
  }
  
  return colorIndex;
}

// Function to generate SVG icons
function generateSvgIcons() {
  console.log('Generating SVG icons...');
  
  const iconCategories = [
    { path: 'ui', icons: ['arrow', 'hamburger', 'close', 'search', 'user'] },
    { path: 'amenities', icons: ['wifi', 'bar', 'bedroom', 'entertainment', 'shower'] },
    { path: 'services', icons: ['concierge', 'catering', 'transport', 'booking', 'vip'] },
    { path: 'social', icons: ['facebook', 'instagram', 'twitter', 'linkedin', 'youtube'] },
  ];
  
  for (const category of iconCategories) {
    const categoryPath = path.join(config.imageBaseDir, 'icons', category.path);
    ensureDirectoryExists(categoryPath);
    
    for (const iconName of category.icons) {
      const filePath = path.join(categoryPath, `${iconName}.svg`);
      
      // Simple SVG icon template
      const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="2" y="2" width="20" height="20" rx="5" />
  <text x="12" y="16" font-family="Arial" font-size="8" text-anchor="middle" fill="currentColor">${iconName}</text>
</svg>`;
      
      fs.writeFileSync(filePath, svgContent);
      console.log(`Created ${filePath}`);
    }
  }
}

// Main function
async function main() {
  console.log('Starting placeholder image generation...');
  
  // Check if the image directory exists
  if (!fs.existsSync(config.imageBaseDir)) {
    console.error(`Image directory ${config.imageBaseDir} does not exist.`);
    console.log('Please run scripts/generateImageFolders.js first.');
    process.exit(1);
  }
  
  // Generate placeholder images for each category
  let colorIndex = 0;
  for (const category of config.categories) {
    colorIndex = await generatePlaceholdersForCategory(category, colorIndex);
  }
  
  // Generate SVG icons
  generateSvgIcons();
  
  console.log('Placeholder image generation complete!');
}

// Run the main function
main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
