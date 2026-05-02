import { forwardRef, type ImgHTMLAttributes } from 'react';
import { getOptimizedImageSrc, getResponsiveImageSrcSet } from '@/lib/image-optimization';

type AppImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  unoptimized?: boolean;
  quality?: number;
  sizes?: string;
  width?: number | `${number}`;
  height?: number | `${number}`;
};

const Image = forwardRef<HTMLImageElement, AppImageProps>(function Image({ fill, priority, loading, style, width, height, unoptimized, quality = 75, src, srcSet, ...props }, ref) {
  const numericWidth = typeof width === 'number' ? width : undefined;
  const optimizedSrc = unoptimized ? src : getOptimizedImageSrc(src, numericWidth, quality);
  const responsiveSrcSet = unoptimized ? srcSet : srcSet ?? getResponsiveImageSrcSet(src, quality);

  return (
    <img
      ref={ref}
      {...props}
      src={optimizedSrc}
      srcSet={responsiveSrcSet}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      loading={priority ? 'eager' : loading ?? 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      style={{
        ...style,
        ...(fill ? { position: 'absolute', inset: 0, width: '100%', height: '100%' } : null),
      }}
    />
  );
});

export default Image;
