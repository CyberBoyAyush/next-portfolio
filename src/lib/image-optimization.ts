const RESPONSIVE_WIDTHS = [480, 768, 1200];
const CLOUDFLARE_IMAGE_BASE = 'https://aysh.me/cdn-cgi/image';

export function isUploadThingUrl(src: string) {
  try {
    const hostname = new URL(src).hostname;
    return hostname === '1kf0b6y5pd.ufs.sh' || hostname.endsWith('.ufs.sh') || hostname === 'utfs.io';
  } catch {
    return false;
  }
}

export function isCloudinaryUrl(src: string) {
  try {
    return new URL(src).hostname === 'res.cloudinary.com';
  } catch {
    return false;
  }
}

export function getOptimizedImageSrc(src: string, width?: number, quality = 75) {
  if (isUploadThingUrl(src) || isCloudinaryUrl(src)) {
    const options = [`quality=${quality}`, 'format=auto'];
    if (width) options.unshift(`width=${width}`);
    return `${CLOUDFLARE_IMAGE_BASE}/${options.join(',')}/${src}`;
  }

  return src;
}

export function getResponsiveImageSrcSet(src: string, quality = 75) {
  if (!isUploadThingUrl(src) && !isCloudinaryUrl(src)) return undefined;

  return RESPONSIVE_WIDTHS.map((width) => `${getOptimizedImageSrc(src, width, quality)} ${width}w`).join(', ');
}
