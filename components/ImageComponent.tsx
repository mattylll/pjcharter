import React from 'react';
import Image from 'next/image';
import { getResponsiveImagePaths, getImageDimensions, buildSrcSet, getImageSizes } from '@/lib/utils/imageHelper';

interface ImageComponentProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
  quality?: number;
  responsive?: boolean;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
  deviceType?: 'desktop' | 'tablet' | 'mobile';
}

/**
 * A responsive image component that wraps Next.js Image component
 * with additional functionality for the PJ Charter website
 */
const ImageComponent: React.FC<ImageComponentProps> = ({
  src,
  alt,
  className = '',
  priority = false,
  sizes,
  fill = false,
  quality = 80,
  responsive = true,
  objectFit = 'cover',
  objectPosition = 'center',
  deviceType = 'desktop',
}) => {
  // Get appropriate image path based on device type if responsive is true
  const imageSrc = responsive 
    ? getResponsiveImagePaths(src)[deviceType]
    : src;
  
  // Get dimensions based on device type
  const dimensions = getImageDimensions(deviceType);
  
  // Common props for both fill and non-fill modes
  const commonProps = {
    src: imageSrc,
    alt,
    className,
    priority,
    quality,
  };
  
  // If fill mode is enabled
  if (fill) {
    return (
      <div className={`relative w-full h-full ${className}`}>
        <Image
          {...commonProps}
          fill
          sizes={sizes || getImageSizes()}
          style={{
            objectFit,
            objectPosition,
          }}
        />
      </div>
    );
  }
  
  // Non-fill mode with explicit dimensions
  return (
    <Image
      {...commonProps}
      width={dimensions.width}
      height={dimensions.height}
      sizes={sizes || getImageSizes()}
      style={{
        maxWidth: '100%',
        height: 'auto',
        objectFit,
        objectPosition,
      }}
    />
  );
};

export default ImageComponent;

/**
 * Example usage:
 * 
 * // Basic usage with responsive images
 * <ImageComponent 
 *   src="/images/hero/homepage/hero-main.jpg" 
 *   alt="Private Jet Charter" 
 * />
 * 
 * // Fill mode (parent must have position: relative)
 * <div className="relative h-[500px]">
 *   <ImageComponent 
 *     src="/images/destinations/europe/united-kingdom/london/aerial/london-aerial-1.jpg" 
 *     alt="London Aerial View" 
 *     fill 
 *   />
 * </div>
 * 
 * // Mobile-specific image
 * <ImageComponent 
 *   src="/images/hero/homepage/hero-main.jpg" 
 *   alt="Private Jet Charter" 
 *   deviceType="mobile" 
 * />
 * 
 * // Non-responsive image (use exact path)
 * <ImageComponent 
 *   src="/images/icons/ui/arrow.svg" 
 *   alt="Arrow" 
 *   responsive={false} 
 * />
 */
