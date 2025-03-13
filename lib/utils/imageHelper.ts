import { StaticImageData } from 'next/image';

/**
 * Helper function to get responsive image paths
 * @param basePath Base path of the image without extension
 * @param extension Image extension (e.g., '.jpg', '.png')
 * @returns Object with paths for different device sizes
 */
export function getResponsiveImagePaths(basePath: string, extension: string = '.jpg') {
  // If the path already includes a file extension, remove it
  const pathWithoutExt = basePath.replace(/\.[^/.]+$/, '');
  
  // Check if the path already includes device type suffixes
  if (pathWithoutExt.endsWith('-desktop') || 
      pathWithoutExt.endsWith('-tablet') || 
      pathWithoutExt.endsWith('-mobile')) {
    // The path already has device suffixes, so we'll use it directly
    const basePathWithoutDevice = pathWithoutExt.replace(/-(?:desktop|tablet|mobile)$/, '');
    
    return {
      desktop: `${basePathWithoutDevice}-desktop${extension}`,
      tablet: `${basePathWithoutDevice}-tablet${extension}`,
      mobile: `${basePathWithoutDevice}-mobile${extension}`,
    };
  }
  
  // Default case - add device type suffixes
  return {
    desktop: `${pathWithoutExt}-desktop${extension}`,
    tablet: `${pathWithoutExt}-tablet${extension}`,
    mobile: `${pathWithoutExt}-mobile${extension}`,
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
    .map(([device, path]) => `${path} ${dimensions[device as keyof typeof dimensions]}w`)
    .join(', ');
}

/**
 * Helper function to get appropriate sizes attribute for responsive images
 * @returns sizes attribute string
 */
export function getImageSizes() {
  return '(max-width: 375px) 375px, (max-width: 768px) 768px, 1920px';
}
