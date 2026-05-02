import { forwardRef, type ImgHTMLAttributes } from 'react';

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

const Image = forwardRef<HTMLImageElement, AppImageProps>(function Image({ fill, priority, loading, style, width, height, unoptimized: _unoptimized, quality: _quality, ...props }, ref) {
  return (
    <img
      ref={ref}
      {...props}
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
