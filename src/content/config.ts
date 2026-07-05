import { defineCollection, z } from 'astro:content';

const properties = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    village: z.string(),
    region: z.string(),
    elevationMeters: z.number(),
    coordinates: z.string(),
    rooms: z.number(),
    sleeps: z.number(),
    pricePerPersonPerDay: z.number(),
    currency: z.string().default('INR'),
    signatureFeature: z.string(),
    signatureDescription: z.string(),
    /** Cloudinary public ID for the hero/signature shot. Falls back to a placehold.co placeholder until set. */
    heroImage: z.string().optional(),
    amenities: z.array(z.string()),
    howToReach: z.string(),
    gallery: z.array(
      z.object({
        caption: z.string(),
        /** Cloudinary public ID for this shot. Falls back to a placehold.co placeholder until set. */
        publicId: z.string().optional(),
      })
    ),
    order: z.number().default(0),
  }),
});

export const collections = { properties };
