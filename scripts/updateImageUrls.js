#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Configuration
const config = {
  // Directories to scan for image references
  scanDirs: ['app', 'components', 'styles'],
  
  // File extensions to scan
  fileExtensions: ['.tsx', '.ts', '.js', '.jsx', '.css', '.scss', '.md'],
  
  // Image base directory
  imageBaseDir: 'public/images',
  
  // Image URL prefix in code (how images are referenced in the code)
  imageUrlPrefix: '/images',
  
  // Default image dimensions for responsive images
  responsiveImageSizes: {
    desktop: 1920,
    tablet: 768,
    mobile: 375
  }
};

// Function to get all image files in the image directory
function getAllImages() {
  const images = {};
  
  // Image extensions to look for
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.svg', '.webp', '.gif'];
  
  // Find all image files
  imageExtensions.forEach(ext => {
    const files = glob.sync(`${config.imageBaseDir}/**/*${ext}`);
    
    files.forEach(file => {
      // Get relative path from public directory
      const relativePath = file.replace('public', '');
      
      // Create a normalized key (lowercase, no extension)
      const key = path.basename(file, path.extname(file)).toLowerCase();
      
      // Store in images object
      if (!images[key]) {
        images[key] = [];
      }
      
      images[key].push({
        path: relativePath,
        extension: path.extname(file),
        category: getCategoryFromPath(relativePath)
      });
    });
  });
  
  return images;
}

// Function to determine image category from path
function getCategoryFromPath(imagePath) {
  const parts = imagePath.split('/');
  
  // The category is typically the first directory after /images/
  if (parts.length > 2 && parts[1] === 'images') {
    return parts[2];
  }
  
  return 'unknown';
}

// Function to scan files for image references
function scanFilesForImageReferences() {
  const references = [];
  
  // Build glob pattern for files to scan
  const pattern = `{${config.scanDirs.join(',')}}/**/*{${config.fileExtensions.join(',')}}`;
  
  // Find all files matching the pattern
  const files = glob.sync(pattern);
  
  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    // Look for image references in the file
    const imgRegex = new RegExp(`(["'\\(])${config.imageUrlPrefix}/([^"'\\)]+)`, 'g');
    let match;
    
    while ((match = imgRegex.exec(content)) !== null) {
      references.push({
        file,
        imagePath: match[2],
        fullMatch: match[0],
        startPos: match.index,
        endPos: match.index + match[0].length
      });
    }
  });
  
  return references;
}

// Function to suggest updated image paths
function suggestUpdatedPaths(references, images) {
  const suggestions = [];
  
  references.forEach(ref => {
    // Extract the base name without extension
    const baseName = path.basename(ref.imagePath, path.extname(ref.imagePath)).toLowerCase();
    
    // Check if we have this image in our catalog
    if (images[baseName]) {
      const matchingImages = images[baseName];
      
      // If there's only one match, suggest it
      if (matchingImages.length === 1) {
        suggestions.push({
          reference: ref,
          suggestion: matchingImages[0].path,
          confidence: 'high'
        });
      } else {
        // Multiple matches - try to find the best one
        // First, check if the extension matches
        const originalExt = path.extname(ref.imagePath);
        const matchingExt = matchingImages.filter(img => img.extension === originalExt);
        
        if (matchingExt.length === 1) {
          suggestions.push({
            reference: ref,
            suggestion: matchingExt[0].path,
            confidence: 'high'
          });
        } else {
          // Try to match by category
          const category = getCategoryFromPath(ref.imagePath);
          const matchingCategory = matchingImages.filter(img => img.category === category);
          
          if (matchingCategory.length > 0) {
            suggestions.push({
              reference: ref,
              suggestion: matchingCategory[0].path,
              confidence: 'medium'
            });
          } else {
            // Just suggest the first one
            suggestions.push({
              reference: ref,
              suggestion: matchingImages[0].path,
              confidence: 'low'
            });
          }
        }
      }
    } else {
      // No match found
      suggestions.push({
        reference: ref,
        suggestion: null,
        confidence: 'none'
      });
    }
  });
  
  return suggestions;
}

// Function to update image references in files
function updateImageReferences(suggestions) {
  // Group suggestions by file
  const fileGroups = {};
  
  suggestions.forEach(suggestion => {
    if (!fileGroups[suggestion.reference.file]) {
      fileGroups[suggestion.reference.file] = [];
    }
    
    fileGroups[suggestion.reference.file].push(suggestion);
  });
  
  // Process each file
  Object.keys(fileGroups).forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Sort suggestions by position (descending) to avoid position shifts
    const fileSuggestions = fileGroups[file].sort((a, b) => 
      b.reference.startPos - a.reference.startPos
    );
    
    // Apply each suggestion
    fileSuggestions.forEach(suggestion => {
      if (suggestion.suggestion && suggestion.confidence !== 'none') {
        const newReference = suggestion.reference.fullMatch.replace(
          suggestion.reference.imagePath,
          suggestion.suggestion.substring(1) // Remove leading slash
        );
        
        content = content.substring(0, suggestion.reference.startPos) +
                 newReference +
                 content.substring(suggestion.reference.endPos);
      }
    });
    
    // Write updated content back to file
    fs.writeFileSync(file, content, 'utf8');
  });
}

// Function to generate a report of changes
function generateReport(suggestions) {
  const report = {
    total: suggestions.length,
    updated: 0,
    notFound: 0,
    byConfidence: {
      high: 0,
      medium: 0,
      low: 0,
      none: 0
    },
    files: {}
  };
  
  suggestions.forEach(suggestion => {
    // Count by confidence
    report.byConfidence[suggestion.confidence]++;
    
    // Count updated vs not found
    if (suggestion.suggestion) {
      report.updated++;
    } else {
      report.notFound++;
    }
    
    // Group by file
    if (!report.files[suggestion.reference.file]) {
      report.files[suggestion.reference.file] = {
        total: 0,
        updated: 0,
        notFound: 0
      };
    }
    
    report.files[suggestion.reference.file].total++;
    
    if (suggestion.suggestion) {
      report.files[suggestion.reference.file].updated++;
    } else {
      report.files[suggestion.reference.file].notFound++;
    }
  });
  
  return report;
}

// Function to print the report
function printReport(report) {
  console.log('\n=== Image URL Update Report ===\n');
  console.log(`Total image references: ${report.total}`);
  console.log(`Updated: ${report.updated}`);
  console.log(`Not found: ${report.notFound}`);
  
  console.log('\nBy confidence:');
  console.log(`  High: ${report.byConfidence.high}`);
  console.log(`  Medium: ${report.byConfidence.medium}`);
  console.log(`  Low: ${report.byConfidence.low}`);
  console.log(`  None: ${report.byConfidence.none}`);
  
  console.log('\nBy file:');
  Object.keys(report.files).forEach(file => {
    const fileReport = report.files[file];
    console.log(`  ${file}: ${fileReport.updated}/${fileReport.total} updated`);
  });
  
  console.log('\nImage URL update complete!');
}

// Function to create a Next.js Image component helper
function createNextImageHelper() {
  const helperPath = 'lib/utils/imageHelper.ts';
  
  const helperContent = `import { StaticImageData } from 'next/image';

/**
 * Helper function to get responsive image paths
 * @param basePath Base path of the image without extension
 * @param extension Image extension (e.g., '.jpg', '.png')
 * @returns Object with paths for different device sizes
 */
export function getResponsiveImagePaths(basePath: string, extension: string = '.jpg') {
  const pathWithoutExt = basePath.replace(/\\.[^/.]+$/, '');
  
  return {
    desktop: \`\${pathWithoutExt}-desktop\${extension}\`,
    tablet: \`\${pathWithoutExt}-tablet\${extension}\`,
    mobile: \`\${pathWithoutExt}-mobile\${extension}\`,
  };
}

/**
 * Helper function to get image dimensions
 * @param deviceType Device type (desktop, tablet, mobile)
 * @returns Object with width and height
 */
export function getImageDimensions(deviceType: 'desktop' | 'tablet' | 'mobile') {
  const dimensions = {
    desktop: { width: 1920, height: 1080 },
    tablet: { width: 768, height: 432 },
    mobile: { width: 375, height: 211 },
  };
  
  return dimensions[deviceType];
}

/**
 * Helper function to build srcSet for responsive images
 * @param basePath Base path of the image without extension
 * @param extension Image extension (e.g., '.jpg', '.png')
 * @returns srcSet string for use in img tag
 */
export function buildSrcSet(basePath: string, extension: string = '.jpg') {
  const paths = getResponsiveImagePaths(basePath, extension);
  const dimensions = {
    desktop: 1920,
    tablet: 768,
    mobile: 375,
  };
  
  return Object.entries(paths)
    .map(([device, path]) => \`\${path} \${dimensions[device as keyof typeof dimensions]}w\`)
    .join(', ');
}

/**
 * Helper function to get appropriate sizes attribute for responsive images
 * @returns sizes attribute string
 */
export function getImageSizes() {
  return '(max-width: 375px) 375px, (max-width: 768px) 768px, 1920px';
}
`;

  // Create directory if it doesn't exist
  const dir = path.dirname(helperPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  // Write helper file
  fs.writeFileSync(helperPath, helperContent, 'utf8');
  console.log(`Created Next.js Image helper at ${helperPath}`);
}

// Main function
async function main() {
  console.log('Starting image URL update process...');
  
  // Check if glob is installed
  try {
    require.resolve('glob');
  } catch (e) {
    console.log('The "glob" package is required but not installed.');
    console.log('Installing glob package...');
    
    const { execSync } = require('child_process');
    execSync('npm install glob', { stdio: 'inherit' });
    
    console.log('glob package installed successfully.');
  }
  
  // Get all images
  console.log('Scanning image directory...');
  const images = getAllImages();
  console.log(`Found ${Object.keys(images).length} unique image names.`);
  
  // Scan files for image references
  console.log('Scanning files for image references...');
  const references = scanFilesForImageReferences();
  console.log(`Found ${references.length} image references in code.`);
  
  // Generate suggestions
  console.log('Generating path suggestions...');
  const suggestions = suggestUpdatedPaths(references, images);
  
  // Update references
  console.log('Updating image references...');
  updateImageReferences(suggestions);
  
  // Create Next.js Image helper
  console.log('Creating Next.js Image helper...');
  createNextImageHelper();
  
  // Generate and print report
  const report = generateReport(suggestions);
  printReport(report);
}

// Run the main function
main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
