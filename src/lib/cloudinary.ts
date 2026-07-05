const CLOUD_NAME = import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME;

/**
 * Build a Cloudinary delivery URL for a single width. Always requests
 * f_auto,q_auto (best format/compression per browser) and a smart,
 * content-aware fill crop to the given aspect ratio — no manual
 * per-photo cropping needed.
 */
export function cloudinaryUrl(
  publicId: string,
  { width, ratio }: { width: number; ratio: string }
) {
  const ar = ratio.replace("/", ":");
  const transforms = `f_auto,q_auto,c_fill,g_auto,ar_${ar},w_${width}`;
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms}/${publicId}`;
}

/** A handful of widths for a responsive srcset — Cloudinary generates and edge-caches each on first request, nothing to pre-render. */
const SRCSET_WIDTHS = [480, 800, 1200, 1600, 2000];

export function cloudinarySrcSet(publicId: string, ratio: string) {
  return SRCSET_WIDTHS.map(
    (width) => `${cloudinaryUrl(publicId, { width, ratio })} ${width}w`
  ).join(", ");
}

export const isCloudinaryConfigured = Boolean(CLOUD_NAME);
