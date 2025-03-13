#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Base directory for images
const baseDir = path.join(process.cwd(), 'public', 'images');

// Function to create directory if it doesn't exist
function createDirIfNotExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
    return true;
  }
  return false;
}

// Function to create a README file in a directory
function createReadme(dirPath, content) {
  const readmePath = path.join(dirPath, 'README.md');
  if (!fs.existsSync(readmePath)) {
    fs.writeFileSync(readmePath, content);
    console.log(`Created README: ${readmePath}`);
  }
}

// Main function to create the folder structure
function createFolderStructure() {
  console.log('Creating image folder structure...');

  // Ensure base directory exists
  createDirIfNotExists(baseDir);

  // Create main README if it doesn't exist
  createReadme(
    baseDir,
    `# PJ Charter Image Directory

This directory contains all images used in the PJ Charter website. The images are organized into subdirectories based on their category and usage.

## Directory Structure

- \`aircraft/\`: Images of different aircraft types, including exterior, interior, cabin, cockpit, and features
- \`destinations/\`: Images of destinations organized by continent, country, and city
- \`hero/\`: Hero images for the homepage and section headers
- \`icons/\`: Icons and UI elements
- \`routes/\`: Images related to routes, including maps
- \`services/\`: Images related to services offered
- \`team/\`: Images of team members and company facilities
- \`testimonials/\`: Images related to client testimonials and partners

Please follow the naming conventions and organization structure when adding new images.
`
  );

  // 1. Aircraft Images
  const aircraftDir = path.join(baseDir, 'aircraft');
  createDirIfNotExists(aircraftDir);
  createReadme(
    aircraftDir,
    `# Aircraft Images

This directory contains images of different aircraft types available for charter.

## Structure

Each aircraft type has its own subdirectory with the following structure:

\`\`\`
[aircraft-type-slug]/
├── exterior/
│   ├── [aircraft-type-slug]-exterior-1.jpg
│   ├── [aircraft-type-slug]-exterior-2.jpg
│   └── ...
├── interior/
│   ├── [aircraft-type-slug]-interior-1.jpg
│   ├── [aircraft-type-slug]-interior-2.jpg
│   └── ...
├── cabin/
│   ├── [aircraft-type-slug]-cabin-1.jpg
│   └── ...
├── cockpit/
│   └── ...
└── features/
    ├── [aircraft-type-slug]-feature-bar.jpg
    ├── [aircraft-type-slug]-feature-bedroom.jpg
    └── ...
\`\`\`

## Naming Convention

- All lowercase
- Use hyphens instead of spaces or underscores
- Include descriptive keywords
- Follow pattern: \`[aircraft-type]-[category]-[descriptor].extension\`

Example: \`gulfstream-g650-exterior-front.jpg\`
`
  );

  // Create example aircraft type directory
  const exampleAircraftDir = path.join(aircraftDir, 'gulfstream-g650');
  createDirIfNotExists(path.join(exampleAircraftDir, 'exterior'));
  createDirIfNotExists(path.join(exampleAircraftDir, 'interior'));
  createDirIfNotExists(path.join(exampleAircraftDir, 'cabin'));
  createDirIfNotExists(path.join(exampleAircraftDir, 'cockpit'));
  createDirIfNotExists(path.join(exampleAircraftDir, 'features'));

  // 2. Destination Images
  const destinationsDir = path.join(baseDir, 'destinations');
  createDirIfNotExists(destinationsDir);
  createReadme(
    destinationsDir,
    `# Destination Images

This directory contains images of destinations organized by continent, country, and city.

## Structure

\`\`\`
[continent]/
├── [country]/
│   ├── [city-slug]/
│   │   ├── aerial/
│   │   │   ├── [city-slug]-aerial-1.jpg
│   │   │   └── ...
│   │   ├── landmarks/
│   │   │   ├── [city-slug]-landmark-[name].jpg
│   │   │   └── ...
│   │   ├── airport/
│   │   │   ├── [airport-code]-terminal.jpg
│   │   │   ├── [airport-code]-runway.jpg
│   │   │   └── ...
│   │   └── lifestyle/
│   │       ├── [city-slug]-lifestyle-dining.jpg
│   │       ├── [city-slug]-lifestyle-nightlife.jpg
│   │       └── ...
\`\`\`

## Naming Convention

- All lowercase
- Use hyphens instead of spaces or underscores
- Include descriptive keywords
- Follow pattern: \`[city-slug]-[category]-[descriptor].extension\`

Example: \`london-aerial-thames-sunset.jpg\`
`
  );

  // Create example destination directory
  const exampleDestDir = path.join(destinationsDir, 'europe', 'united-kingdom', 'london');
  createDirIfNotExists(path.join(exampleDestDir, 'aerial'));
  createDirIfNotExists(path.join(exampleDestDir, 'landmarks'));
  createDirIfNotExists(path.join(exampleDestDir, 'airport'));
  createDirIfNotExists(path.join(exampleDestDir, 'lifestyle'));

  // 3. Hero Images
  const heroDir = path.join(baseDir, 'hero');
  createDirIfNotExists(heroDir);
  createReadme(
    heroDir,
    `# Hero Images

This directory contains hero images for the homepage and section headers.

## Structure

\`\`\`
hero/
├── homepage/
│   ├── hero-main.jpg
│   ├── hero-mobile.jpg
│   └── hero-tablet.jpg
├── aircraft/
│   ├── hero-aircraft.jpg
│   └── hero-aircraft-mobile.jpg
├── destinations/
│   ├── hero-destinations.jpg
│   └── hero-destinations-mobile.jpg
├── services/
│   └── ...
└── seasonal/
    ├── summer/
    │   └── hero-summer.jpg
    ├── winter/
    │   └── hero-winter.jpg
    └── ...
\`\`\`

## Dimensions

- Desktop: 1920px width
- Tablet: 768px width
- Mobile: 375px width

## Naming Convention

- All lowercase
- Use hyphens instead of spaces or underscores
- Include device type for responsive variants
- Follow pattern: \`hero-[section]-[variant].extension\`

Example: \`hero-destinations-mobile.jpg\`
`
  );

  // Create hero subdirectories
  createDirIfNotExists(path.join(heroDir, 'homepage'));
  createDirIfNotExists(path.join(heroDir, 'aircraft'));
  createDirIfNotExists(path.join(heroDir, 'destinations'));
  createDirIfNotExists(path.join(heroDir, 'services'));
  createDirIfNotExists(path.join(heroDir, 'seasonal', 'summer'));
  createDirIfNotExists(path.join(heroDir, 'seasonal', 'winter'));

  // 4. Route Images
  const routesDir = path.join(baseDir, 'routes');
  createDirIfNotExists(routesDir);
  createReadme(
    routesDir,
    `# Route Images

This directory contains images related to routes, including maps.

## Structure

\`\`\`
[origin-destination-slug]/
├── map/
│   ├── [origin]-to-[destination]-map.jpg
│   └── [origin]-to-[destination]-map-interactive.svg
└── featured/
    └── [origin]-to-[destination]-featured.jpg
\`\`\`

## Naming Convention

- All lowercase
- Use hyphens instead of spaces or underscores
- Include descriptive keywords
- Follow pattern: \`[origin]-to-[destination]-[type].extension\`

Example: \`london-to-paris-map.jpg\`
`
  );

  // Create example route directory
  const exampleRouteDir = path.join(routesDir, 'london-to-paris');
  createDirIfNotExists(path.join(exampleRouteDir, 'map'));
  createDirIfNotExists(path.join(exampleRouteDir, 'featured'));

  // 5. Service Images
  const servicesDir = path.join(baseDir, 'services');
  createDirIfNotExists(servicesDir);
  createReadme(
    servicesDir,
    `# Service Images

This directory contains images related to services offered.

## Structure

\`\`\`
services/
├── charter/
│   ├── private-charter.jpg
│   ├── group-charter.jpg
│   └── ...
├── concierge/
│   ├── ground-transport.jpg
│   ├── accommodation.jpg
│   └── ...
├── experiences/
│   ├── dining.jpg
│   ├── events.jpg
│   └── ...
└── corporate/
    ├── business-travel.jpg
    └── ...
\`\`\`

## Naming Convention

- All lowercase
- Use hyphens instead of spaces or underscores
- Include descriptive keywords
- Follow pattern: \`[service-type]-[descriptor].extension\`

Example: \`private-charter-luxury.jpg\`
`
  );

  // Create service subdirectories
  createDirIfNotExists(path.join(servicesDir, 'charter'));
  createDirIfNotExists(path.join(servicesDir, 'concierge'));
  createDirIfNotExists(path.join(servicesDir, 'experiences'));
  createDirIfNotExists(path.join(servicesDir, 'corporate'));

  // 6. Icons and UI Elements
  const iconsDir = path.join(baseDir, 'icons');
  createDirIfNotExists(iconsDir);
  createReadme(
    iconsDir,
    `# Icons and UI Elements

This directory contains icons and UI elements used throughout the website.

## Structure

\`\`\`
icons/
├── ui/
│   ├── arrow.svg
│   ├── hamburger.svg
│   ├── close.svg
│   └── ...
├── amenities/
│   ├── wifi.svg
│   ├── bar.svg
│   ├── bedroom.svg
│   └── ...
├── services/
│   ├── concierge.svg
│   ├── catering.svg
│   └── ...
└── social/
    ├── facebook.svg
    ├── instagram.svg
    └── ...
\`\`\`

## Format

- SVG is preferred for all icons and UI elements
- PNG with transparency as fallback
- Use consistent sizes: 24px, 36px, 48px

## Naming Convention

- All lowercase
- Use hyphens instead of spaces or underscores
- Include category prefix
- Follow pattern: \`icon-[category]-[name]-[variant].extension\`

Example: \`icon-amenity-wifi-white.svg\`
`
  );

  // Create icon subdirectories
  createDirIfNotExists(path.join(iconsDir, 'ui'));
  createDirIfNotExists(path.join(iconsDir, 'amenities'));
  createDirIfNotExists(path.join(iconsDir, 'services'));
  createDirIfNotExists(path.join(iconsDir, 'social'));

  // 7. Team/About Images
  const teamDir = path.join(baseDir, 'team');
  createDirIfNotExists(teamDir);
  createReadme(
    teamDir,
    `# Team and Company Images

This directory contains images of team members and company facilities.

## Structure

\`\`\`
team/
├── executives/
│   ├── ceo.jpg
│   ├── coo.jpg
│   └── ...
├── pilots/
│   └── ...
├── crew/
│   └── ...
└── office/
    └── headquarters.jpg
\`\`\`

## Naming Convention

- All lowercase
- Use hyphens instead of spaces or underscores
- Include role or title
- Follow pattern: \`[role]-[name].extension\` or \`[location]-[descriptor].extension\`

Example: \`ceo-john-smith.jpg\` or \`headquarters-exterior.jpg\`
`
  );

  // Create team subdirectories
  createDirIfNotExists(path.join(teamDir, 'executives'));
  createDirIfNotExists(path.join(teamDir, 'pilots'));
  createDirIfNotExists(path.join(teamDir, 'crew'));
  createDirIfNotExists(path.join(teamDir, 'office'));

  // 8. Testimonials/Reviews
  const testimonialsDir = path.join(baseDir, 'testimonials');
  createDirIfNotExists(testimonialsDir);
  createReadme(
    testimonialsDir,
    `# Testimonial Images

This directory contains images related to client testimonials and partners.

## Structure

\`\`\`
testimonials/
├── clients/
│   ├── client1.jpg
│   ├── client2.jpg
│   └── ...
└── partners/
    └── ...
\`\`\`

## Naming Convention

- All lowercase
- Use hyphens instead of spaces or underscores
- Include category
- Follow pattern: \`[category]-[name].extension\`

Example: \`client-jane-doe.jpg\` or \`partner-company-name.jpg\`
`
  );

  // Create testimonial subdirectories
  createDirIfNotExists(path.join(testimonialsDir, 'clients'));
  createDirIfNotExists(path.join(testimonialsDir, 'partners'));

  console.log('Image folder structure created successfully!');
}

// Execute the main function
createFolderStructure();
