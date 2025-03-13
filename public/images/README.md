# PJ Charter Image System

This directory contains all images used in the PJ Charter website. The images are organized into a structured folder hierarchy to ensure consistency and maintainability.

## Directory Structure

The image system is organized into the following main categories:

- `aircraft/`: Images of different aircraft types
- `destinations/`: Images of destinations organized by continent, country, and city
- `hero/`: Hero images for the homepage and section headers
- `icons/`: Icons and UI elements
- `routes/`: Images related to routes, including maps
- `services/`: Images related to services offered
- `team/`: Images of team members and company facilities
- `testimonials/`: Images related to client testimonials and partners

Each category has its own specific structure and naming conventions. Please refer to the README.md file in each directory for detailed information.

## Image Requirements

For detailed information about image requirements, including formats, dimensions, and content guidelines, please refer to the [Image Requirements](./image-requirements.md) document.

## Using Images in the Website

### 1. ImageComponent

We've created a custom `ImageComponent` that wraps the Next.js Image component with additional functionality for responsive images. This component should be used for all images on the website.

```tsx
import ImageComponent from '../components/ImageComponent';

// Basic usage
<ImageComponent 
  src="/images/hero/homepage/hero-main.jpg" 
  alt="Private Jet Charter" 
/>

// Fill mode (parent must have position: relative)
<div className="relative h-[500px]">
  <ImageComponent 
    src="/images/destinations/europe/united-kingdom/london/aerial/london-aerial-1.jpg" 
    alt="London Aerial View" 
    fill 
  />
</div>

// Mobile-specific image
<ImageComponent 
  src="/images/hero/homepage/hero-main.jpg" 
  alt="Private Jet Charter" 
  deviceType="mobile" 
/>

// Non-responsive image (use exact path)
<ImageComponent 
  src="/images/icons/ui/arrow.svg" 
  alt="Arrow" 
  responsive={false} 
/>
```

### 2. Helper Functions

The `lib/utils/imageHelper.ts` file provides several helper functions for working with images:

- `getResponsiveImagePaths`: Get paths for different device sizes
- `getImageDimensions`: Get dimensions for different device types
- `buildSrcSet`: Build a srcSet string for responsive images
- `getImageSizes`: Get appropriate sizes attribute for responsive images

```tsx
import { getResponsiveImagePaths } from '../lib/utils/imageHelper';

// Get paths for different device sizes
const paths = getResponsiveImagePaths('/images/hero/homepage/hero-main.jpg');
// Result: { desktop: '...desktop.jpg', tablet: '...tablet.jpg', mobile: '...mobile.jpg' }
```

### 3. Updating Image URLs

If you need to update image URLs in the codebase (for example, after reorganizing the image directory), you can use the `scripts/updateImageUrls.js` script:

```bash
node scripts/updateImageUrls.js
```

This script will:
1. Scan the codebase for image references
2. Update those references to point to the correct paths in the folder structure
3. Generate a report of changes

### 4. Adding New Images

When adding new images to the website:

1. Place the images in the appropriate directory according to the established folder structure
2. Follow the naming conventions outlined in each directory's README file
3. Create responsive variants where appropriate (desktop, tablet, mobile)
4. Optimize all images before adding them to the repository
5. Update image references in the codebase using the `scripts/updateImageUrls.js` script if needed

## Responsive Images

For optimal performance and user experience, we use responsive images throughout the website. This means providing different image sizes for different device types:

- Desktop: 1920px width
- Tablet: 768px width
- Mobile: 375px width

When adding new images, especially for hero sections and important content areas, create variants for each device type using the following naming convention:

- Desktop: `image-name-desktop.jpg`
- Tablet: `image-name-tablet.jpg`
- Mobile: `image-name-mobile.jpg`

The `ImageComponent` will automatically select the appropriate image based on the device type.

## Image Optimization

All images should be optimized for web use to ensure fast loading times. Consider the following guidelines:

- Use appropriate formats: JPEG for photos, SVG for icons, PNG for graphics with transparency
- Compress images to reduce file size without sacrificing quality
- Consider using WebP format with JPEG fallbacks for better performance
- Use responsive images with srcset and sizes attributes

## Maintaining the Image System

To maintain the image system:

1. Always follow the established folder structure and naming conventions
2. Update the README files if you make changes to the structure
3. Use the provided tools and components for working with images
4. Regularly optimize and clean up unused images

By following these guidelines, we can ensure a consistent, high-quality visual experience across the PJ Charter website.
