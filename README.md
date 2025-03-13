# PJ Charter - Private Jet Charter Website

A Next.js-based website for PJ Charter, a premium private jet charter company. The website is built with Next.js 14, TypeScript, and Tailwind CSS, featuring server-side rendering and static site generation for optimal performance and SEO.

## Features

- **Multi-language Support**: Website content available in multiple languages
- **Dynamic Routing**: Programmatically generated pages for destinations, aircraft, services, and routes
- **SEO Optimized**: Comprehensive metadata, sitemaps, and structured content
- **Responsive Design**: Mobile-first approach ensuring compatibility across all devices
- **Server-Side Rendering**: Fast initial page loads and improved SEO
- **Static Site Generation**: Pre-rendered pages for optimal performance
- **CSV Data Processing**: Automated conversion of CSV data to JSON for page generation

## Project Structure

```
pjcharter/
├── app/                    # Next.js app directory
│   ├── api/                # API routes
│   ├── aircraft/           # Aircraft pages
│   ├── destinations/       # Destination pages
│   ├── routes/             # Route pages
│   ├── services/           # Service pages
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/             # Reusable UI components
│   ├── ImageComponent.tsx  # Responsive image component
│   └── ...                 # Other components
├── data/                   # Data files
│   ├── csv/                # Source CSV files
│   └── json/               # Generated JSON files
├── lib/                    # Utility functions and types
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Utility functions
│       ├── imageHelper.ts  # Image utility functions
│       └── ...             # Other utilities
├── public/                 # Static assets
│   ├── images/             # Image files (organized by category)
│   │   ├── aircraft/       # Aircraft images
│   │   ├── destinations/   # Destination images
│   │   ├── hero/           # Hero images
│   │   ├── icons/          # Icons and UI elements
│   │   ├── routes/         # Route images
│   │   ├── services/       # Service images
│   │   ├── team/           # Team images
│   │   └── testimonials/   # Testimonial images
│   ├── robots.txt          # Robots file for SEO
│   └── sitemap.xml         # Generated sitemap
├── scripts/                # Build and data processing scripts
│   ├── processData.js      # CSV to JSON conversion
│   ├── generateSitemap.js  # Sitemap generator
│   ├── generateImageFolders.js # Image folder structure generator
│   ├── generatePlaceholderImages.js # Placeholder image generator
│   └── updateImageUrls.js  # Image URL updater
├── styles/                 # Global styles
└── next.config.js          # Next.js configuration
```

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/pjcharter/website.git
   cd website
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Process the CSV data:
   ```bash
   npm run build:data
   # or
   yarn build:data
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Data Management

The website uses CSV files as the source of truth for all dynamic content. These files are located in the `data/csv` directory:

- `locations.csv`: Information about destinations
- `aircraft.csv`: Aircraft specifications and details
- `services.csv`: Service offerings and descriptions
- `routes.csv`: Route information between destinations

To update the website content:

1. Modify the CSV files in the `data/csv` directory
2. Run the data processing script:
   ```bash
   npm run build:data
   # or
   yarn build:data
   ```
3. The script will generate JSON files in the `data/json` directory, which are used by the website to render content

## Image Management

The website includes a comprehensive image management system to ensure consistency and maintainability across all visual assets.

### Image Directory Structure

Images are organized into categories in the `public/images` directory:

- `aircraft/`: Images of different aircraft types
- `destinations/`: Images of destinations organized by continent, country, and city
- `hero/`: Hero images for the homepage and section headers
- `icons/`: Icons and UI elements
- `routes/`: Images related to routes, including maps
- `services/`: Images related to services offered
- `team/`: Images of team members and company facilities
- `testimonials/`: Images related to client testimonials and partners

### Image Utilities

Several scripts and utilities are provided to manage images:

1. **Generate Image Folders**:
   ```bash
   node scripts/generateImageFolders.js
   ```
   Creates the folder structure for organizing images.

2. **Generate Placeholder Images**:
   ```bash
   node scripts/generatePlaceholderImages.js
   ```
   Creates placeholder images for development purposes.

3. **Update Image URLs**:
   ```bash
   node scripts/updateImageUrls.js
   ```
   Updates image references in the codebase to match the folder structure.

### Responsive Images

The website uses responsive images to ensure optimal performance across all devices. The `ImageComponent` component handles this automatically:

```tsx
import ImageComponent from '../components/ImageComponent';

// Basic usage
<ImageComponent 
  src="/images/hero/homepage/hero-main.jpg" 
  alt="Private Jet Charter" 
/>

// Mobile-specific image
<ImageComponent 
  src="/images/hero/homepage/hero-main.jpg" 
  alt="Private Jet Charter" 
  deviceType="mobile" 
/>
```

For more information about the image system, see the [Image Requirements](./public/images/image-requirements.md) document.

## Building for Production

To build the website for production:

```bash
npm run build
# or
yarn build
```

This command will:
1. Process the CSV data
2. Generate the sitemap
3. Build the Next.js application

The built application will be in the `.next` directory.

## Deployment

The website can be deployed to any hosting platform that supports Next.js applications, such as Vercel, Netlify, or a custom server.

### Deploying to Vercel

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import the project in Vercel
3. Configure the build settings:
   - Build Command: `npm run build`
   - Output Directory: `.next`
4. Deploy

## SEO Features

The website includes several features to optimize for search engines:

- **Dynamic Metadata**: Each page has unique, relevant metadata
- **Structured Data**: JSON-LD structured data for rich search results
- **Sitemaps**: Automatically generated sitemaps for all pages
- **Optimized Content**: Keyword-rich content with proper heading structure
- **Mobile Responsiveness**: Fully responsive design for all devices

## License

This project is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.

## Contact

For any inquiries, please contact [info@pjcharter.com](mailto:info@pjcharter.com).
