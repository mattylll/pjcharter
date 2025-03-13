# PJ Charter Website - Image Requirements

This document outlines all the images needed for the PJ Charter website. All images should be placed in the appropriate subdirectories within the `public/images` directory.

## Directory Structure
```
public/
  └── images/
      ├── hero/           # Hero banner images
      ├── aircraft/       # Aircraft images
      ├── destinations/   # Destination images
      ├── services/       # Service-related images
      ├── team/           # Team member photos
      ├── routes/         # Route map visualizations
      └── icons/          # Icons and small UI elements
```

## Hero Images (1920x1080px)

These large banner images appear at the top of main pages:

1. **Homepage Hero** - `hero/home-hero.jpg`
   - Luxury private jet exterior/interior shot
   - Should convey luxury, exclusivity, and premium service

2. **Destinations Hero** - `hero/destinations-hero.jpg`
   - Scenic aerial view of a popular destination
   - Could show a recognizable city skyline from above

3. **Aircraft Hero** - `hero/aircraft-hero.jpg`
   - Premium aircraft fleet image
   - Multiple jets lined up or a dramatic shot of a flagship aircraft

4. **Services Hero** - `hero/services-hero.jpg`
   - Business travelers boarding or inside a private jet
   - Should convey luxury service and attention to detail

5. **Routes Hero** - `hero/routes-hero.jpg`
   - World map or flight path visualization
   - Could show connected global destinations with flight paths

## Aircraft Images (800x600px)

Based on our aircraft.json data, we need images for each aircraft:

### Light Jets
1. **Citation CJ4** - `aircraft/citation-cj4.jpg` and `aircraft/citation-cj4-interior.jpg`
2. **Phenom 300** - `aircraft/phenom-300.jpg` and `aircraft/phenom-300-interior.jpg`
3. **Learjet 75** - `aircraft/learjet-75.jpg` and `aircraft/learjet-75-interior.jpg`

### Midsize Jets
4. **Citation XLS+** - `aircraft/citation-xls-plus.jpg` and `aircraft/citation-xls-plus-interior.jpg`
5. **Gulfstream G150** - `aircraft/gulfstream-g150.jpg` and `aircraft/gulfstream-g150-interior.jpg`
6. **Hawker 900XP** - `aircraft/hawker-900xp.jpg` and `aircraft/hawker-900xp-interior.jpg`

### Heavy Jets
7. **Gulfstream G550** - `aircraft/gulfstream-g550.jpg` and `aircraft/gulfstream-g550-interior.jpg`
8. **Falcon 7X** - `aircraft/falcon-7x.jpg` and `aircraft/falcon-7x-interior.jpg`
9. **Bombardier Global 6000** - `aircraft/bombardier-global-6000.jpg` and `aircraft/bombardier-global-6000-interior.jpg`

### VIP Airliners
10. **Boeing BBJ** - `aircraft/boeing-bbj.jpg` and `aircraft/boeing-bbj-interior.jpg`
11. **Airbus ACJ320** - `aircraft/airbus-acj320.jpg` and `aircraft/airbus-acj320-interior.jpg`
12. **Embraer Lineage 1000E** - `aircraft/embraer-lineage-1000e.jpg` and `aircraft/embraer-lineage-1000e-interior.jpg`

## Destination Images (800x600px)

Based on our locations.json data, we need images for each destination:

### Europe
1. **London** - `destinations/london.jpg` - Iconic cityscape with landmarks like Big Ben/London Eye
2. **Paris** - `destinations/paris.jpg` - Eiffel Tower or Champs-Élysées view
3. **Geneva** - `destinations/geneva.jpg` - Lake Geneva with mountains in background
4. **Nice** - `destinations/nice.jpg` - French Riviera coastline
5. **Rome** - `destinations/rome.jpg` - Colosseum or Roman Forum
6. **Milan** - `destinations/milan.jpg` - Duomo di Milano or fashion district
7. **Madrid** - `destinations/madrid.jpg` - Plaza Mayor or Royal Palace
8. **Zurich** - `destinations/zurich.jpg` - City view with lake and Alps
9. **Moscow** - `destinations/moscow.jpg` - Red Square or St. Basil's Cathedral

### North America
10. **New York** - `destinations/new-york.jpg` - Manhattan skyline
11. **Miami** - `destinations/miami.jpg` - South Beach or aerial of Miami Beach
12. **Los Angeles** - `destinations/los-angeles.jpg` - Hollywood sign or Beverly Hills

### Asia
13. **Singapore** - `destinations/singapore.jpg` - Marina Bay Sands or city skyline
14. **Hong Kong** - `destinations/hong-kong.jpg` - Victoria Harbor skyline
15. **Tokyo** - `destinations/tokyo.jpg` - Tokyo skyline with Mt. Fuji or Shibuya Crossing

### Middle East
16. **Dubai** - `destinations/dubai.jpg` - Burj Khalifa or Palm Jumeirah aerial

### Oceania
17. **Sydney** - `destinations/sydney.jpg` - Opera House and Harbor Bridge
18. **Auckland** - `destinations/auckland.jpg` - Sky Tower or harbor view

### South America
19. **Rio de Janeiro** - `destinations/rio-de-janeiro.jpg` - Christ the Redeemer or Copacabana Beach

### Africa
20. **Cape Town** - `destinations/cape-town.jpg` - Table Mountain or coastal view

## Service Images (800x600px)

Based on our services.json data:

1. **Business Travel** - `services/business-travel.jpg`
   - Executives in a private jet cabin working or in a meeting

2. **Leisure Travel** - `services/leisure-travel.jpg`
   - Luxury vacation travel, passengers enjoying champagne or relaxing

3. **Group Charters** - `services/group-charters.jpg`
   - Larger group in spacious cabin, perhaps a corporate team

4. **Medical Transport** - `services/medical-transport.jpg`
   - Medical equipment in aircraft, professional medical staff

5. **Event Transport** - `services/event-transport.jpg`
   - Event-related travel, perhaps celebrities or sports teams boarding

6. **Roadshow Travel** - `services/roadshow-travel.jpg`
   - Executives with presentation materials or multi-city itinerary visualization

7. **Honeymoon Travel** - `services/honeymoon-travel.jpg`
   - Couple enjoying champagne or romantic setting in private jet

8. **Family Travel** - `services/family-travel.jpg`
   - Family with children comfortably seated in private jet

9. **Sports Team Travel** - `services/sports-team-travel.jpg`
   - Athletes or sports team boarding or inside aircraft

10. **Celebrity Travel** - `services/celebrity-travel.jpg`
    - Privacy-focused image showing VIP treatment or discreet boarding

## Route Images (800x600px)

For the top routes, we need map visualizations:

1. **London-New York** - `routes/london-new-york.jpg`
2. **London-Paris** - `routes/london-paris.jpg`
3. **New York-Miami** - `routes/new-york-miami.jpg`
4. **London-Dubai** - `routes/london-dubai.jpg`
5. **Paris-Nice** - `routes/paris-nice.jpg`
6. **New York-Los Angeles** - `routes/new-york-los-angeles.jpg`
7. **London-Geneva** - `routes/london-geneva.jpg`
8. **Singapore-Hong Kong** - `routes/singapore-hong-kong.jpg`
9. **Dubai-Moscow** - `routes/dubai-moscow.jpg`
10. **Sydney-Auckland** - `routes/sydney-auckland.jpg`

These should be map visualizations showing the route with a line connecting the two cities, potentially with aircraft icon.

## Additional Images

1. **About Us** - `team/about-team.jpg` - Team photo or office (800x600px)
2. **Contact Page** - `team/contact-office.jpg` - Office or customer service (800x600px)
3. **Testimonial Backgrounds** - `hero/testimonials-bg.jpg` - Subtle, professional background (1920x1080px)

## Icons and UI Elements

1. **Logo** - `icons/logo.svg` and `icons/logo-white.svg` (for dark backgrounds)
2. **Aircraft Category Icons**:
   - `icons/light-jet.svg`
   - `icons/midsize-jet.svg`
   - `icons/heavy-jet.svg`
   - `icons/vip-airliner.svg`
3. **Service Icons**:
   - `icons/business-travel.svg`
   - `icons/leisure-travel.svg`
   - `icons/group-charter.svg`
   - `icons/medical-transport.svg`
   - `icons/event-transport.svg`
   - `icons/roadshow.svg`
   - `icons/honeymoon.svg`
   - `icons/family-travel.svg`
   - `icons/sports-team.svg`
   - `icons/celebrity.svg`
4. **Social Media Icons**:
   - `icons/facebook.svg`
   - `icons/twitter.svg`
   - `icons/instagram.svg`
   - `icons/linkedin.svg`
5. **UI Icons**:
   - `icons/search.svg`
   - `icons/menu.svg`
   - `icons/close.svg`
   - `icons/arrow-right.svg`
   - `icons/arrow-left.svg`
   - `icons/phone.svg`
   - `icons/email.svg`
   - `icons/location.svg`
   - `icons/calendar.svg`
   - `icons/clock.svg`
   - `icons/user.svg`

## Image Specifications

- **Format**: 
  - JPG for photos (hero images, aircraft, destinations, services)
  - PNG for images requiring transparency
  - SVG for icons and logos
- **Resolution**: High resolution (at least 72dpi, preferably 150dpi for retina displays)
- **Aspect Ratio**: Maintain consistent aspect ratios within each category
- **Size**: Optimize file sizes for web (use compression tools like TinyPNG)
- **Quality**: Professional, high-quality images that reflect the luxury brand

## Implementation Notes

In the code, reference these images using the Next.js Image component:

```jsx
import Image from 'next/image';

<Image 
  src="/images/aircraft/citation-cj4.jpg" 
  alt="Citation CJ4 Private Jet" 
  width={800} 
  height={600} 
/>
```

For responsive images, you may want to provide multiple sizes and let Next.js handle the appropriate loading.
