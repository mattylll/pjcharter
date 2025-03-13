# PJ Charter Image Requirements

This document outlines the image requirements for the PJ Charter website. It provides guidelines for image acquisition, including recommended sizes, formats, and content suggestions for each section of the website.

## General Image Guidelines

### Image Formats
- **Photographs**: JPEG/JPG (80-90% quality)
- **Graphics with transparency**: PNG
- **Icons and UI elements**: SVG (preferred) or WebP
- **Consider WebP with JPEG fallbacks** for better performance

### Image Dimensions
- **Hero images**: 
  - Desktop: 1920px width
  - Tablet: 768px width
  - Mobile: 375px width
- **Thumbnails**: 300-400px width
- **Gallery images**: 800-1200px width
- **Icons**: 24px, 36px, 48px (or SVG)

### Image Optimization
- All images should be optimized for web use
- File size should be kept as small as possible without sacrificing quality
- Use appropriate compression techniques
- Consider using responsive images with srcset and sizes attributes

### Image Content Guidelines
- All images should be high-quality and professional
- Images should reflect the luxury and premium nature of private jet charter services
- Avoid stock photography clichés where possible
- Ensure diversity and inclusivity in people-focused images
- Obtain proper licenses for all stock photography

## Specific Image Requirements by Category

### 1. Aircraft Images

#### Required for Each Aircraft Type:
- **Exterior shots** (3-5 images):
  - Front view
  - Side view
  - Rear view
  - On runway/tarmac
  - In flight (if available)
  
- **Interior shots** (5-8 images):
  - Full cabin view
  - Seating areas
  - Tables/workspaces
  - Entertainment systems
  - Unique features
  
- **Cabin details** (3-5 images):
  - Seating close-ups showing materials and design
  - Cabin lighting
  - Window views
  
- **Cockpit** (1-2 images):
  - Pilot's perspective
  - Control panel
  
- **Special features** (as applicable):
  - Bedroom areas
  - Bar/galley
  - Bathroom facilities
  - Conference areas
  - Any unique amenities

#### Content Suggestions:
- Show aircraft in good lighting conditions
- Include some images with crew members (pilots/flight attendants)
- Capture the spaciousness and luxury of the cabin
- Highlight unique selling points of each aircraft type

### 2. Destination Images

#### Required for Each Destination:
- **Aerial views** (2-3 images):
  - City skyline
  - Notable geographic features
  - Airport approach (if visually interesting)
  
- **Landmarks** (3-5 images):
  - Famous buildings/monuments
  - Cultural sites
  - Natural attractions
  
- **Airport** (2-3 images):
  - Terminal (especially VIP/private areas)
  - Runway/tarmac with private jets
  - Arrival/departure areas
  
- **Lifestyle** (3-5 images):
  - Luxury dining
  - High-end shopping
  - Nightlife
  - Exclusive experiences
  - Seasonal activities

#### Content Suggestions:
- Focus on luxury aspects of each destination
- Include images that show the destination in its best light (weather, time of day)
- Consider seasonal variations for popular destinations
- Highlight exclusive or VIP experiences available at each location

### 3. Hero Images

#### Required Hero Images:
- **Homepage** (3 versions):
  - Desktop (1920px width)
  - Tablet (768px width)
  - Mobile (375px width)
  
- **Section headers** (each with desktop/mobile versions):
  - Aircraft
  - Destinations
  - Services
  - Routes
  
- **Seasonal campaigns** (as needed):
  - Summer
  - Winter
  - Special events/holidays

#### Content Suggestions:
- Homepage hero should feature a striking image of a luxury private jet
- Consider including people in some hero images to add human element
- Use dramatic lighting and composition
- Ensure text overlay areas have appropriate contrast for readability
- Create a consistent visual language across all hero images

### 4. Route Images

#### Required for Each Route:
- **Maps** (2 versions):
  - Static map showing route
  - Interactive SVG version (if applicable)
  
- **Featured image** (1 per route):
  - Compelling image representing the route
  - Could show aircraft in flight, departure/arrival cities, or lifestyle element

#### Content Suggestions:
- Maps should be clean, elegant, and on-brand
- Consider custom map styles that match the luxury positioning
- Featured images should evoke the journey experience

### 5. Service Images

#### Required for Each Service Category:
- **Charter services** (3-5 images):
  - Private charter
  - Group charter
  - Corporate travel
  
- **Concierge services** (3-5 images):
  - Ground transportation
  - Accommodation
  - VIP access
  
- **Experiences** (3-5 images):
  - Fine dining
  - Events
  - Exclusive activities
  
- **Corporate services** (2-3 images):
  - Business meetings
  - Corporate events

#### Content Suggestions:
- Focus on the customer experience
- Include images of staff providing services where appropriate
- Show the end-to-end journey, not just the flight
- Highlight the personalized nature of the services

### 6. Icons and UI Elements

#### Required Icon Sets:
- **UI icons** (SVG format):
  - Navigation elements
  - Action buttons
  - Form elements
  
- **Amenity icons** (SVG format):
  - Wi-Fi
  - Bar/catering
  - Bedroom
  - Entertainment
  - Other aircraft amenities
  
- **Service icons** (SVG format):
  - Concierge
  - Catering
  - Ground transportation
  - Other service categories
  
- **Social media icons** (SVG format):
  - Standard social platform icons

#### Content Suggestions:
- Maintain a consistent style across all icons
- Create both light and dark versions where needed
- Use simple, clean designs that scale well
- Consider animated versions for interactive elements

### 7. Team/Company Images

#### Required Team Images:
- **Executive team** (1 per person):
  - Professional headshots
  - Consistent style and background
  
- **Pilots/Crew** (group and individual):
  - In uniform
  - Professional setting
  
- **Office/Facilities** (3-5 images):
  - Headquarters exterior
  - Office interior
  - Customer service areas

#### Content Suggestions:
- Professional, approachable portraits
- Consistent lighting and style
- Show team members in appropriate settings
- Consider action shots of team members working

### 8. Testimonial/Partner Images

#### Required Images:
- **Client testimonials** (as available):
  - Professional headshots of clients (with permission)
  
- **Partner companies** (as applicable):
  - High-quality logo files
  - Partnership in action images

#### Content Suggestions:
- Obtain proper permissions for all client images
- Ensure partner logos are up-to-date and high resolution
- Consider lifestyle images that represent client experiences

## Image Acquisition Strategy

### Stock Photography Sources
- Premium stock photography sites (Shutterstock, Getty Images, Adobe Stock)
- Aviation-specific stock libraries
- Consider custom photography for key website elements

### Custom Photography
- Consider professional photoshoots for:
  - Aircraft interiors/exteriors
  - Team members
  - Unique service offerings
  - Key destinations

### Legal Considerations
- Ensure proper licensing for all images
- Obtain model releases for images featuring people
- Respect copyright and attribution requirements
- Document all image sources and licenses

## Implementation Notes

1. All images should be placed in the appropriate directory according to the established folder structure
2. Follow the naming conventions outlined in each directory's README file
3. Create responsive image sets where appropriate
4. Optimize all images before adding them to the repository
5. Update image references in the codebase using the `scripts/updateImageUrls.js` script

By following these guidelines, we can ensure a consistent, high-quality visual experience across the PJ Charter website that reflects the premium nature of the service.
