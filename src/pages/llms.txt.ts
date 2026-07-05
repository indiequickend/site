import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

/* Generated at build time from the properties content collection,
   so a new property file shows up here automatically — unlike a
   static public/llms.txt, which would need editing by hand. */
export const GET: APIRoute = async ({ site }) => {
  const properties = (await getCollection("properties")).sort(
    (a, b) => a.data.order - b.data.order
  );

  const propertyLines = properties
    .map((p) => {
      const url = new URL(`/stays/${p.slug}`, site).toString();
      return `- [${p.data.name}](${url}): ${p.data.tagline}. ${p.data.village}, ${p.data.region}, ${p.data.elevationMeters.toLocaleString("en-IN")}m elevation. Signature view: ${p.data.signatureFeature}. ${p.data.rooms} rooms, sleeps up to ${p.data.sleeps}.`;
    })
    .join("\n");

  const body = `# Prime Peak Stays

> A small, growing homestay chain across the Himalaya. Every property is chosen for one view worth building a house around — never more than a handful of rooms, built from local stone and timber, run by people who live in the hills they're hosting you in.

Prime Peak Stays is not a hotel chain. Each stay sits in a different range, is scouted for its sightline before its plot, and is run at homestay scale (a handful of rooms, not a resort).

## Properties

${propertyLines}

## Pages

- [All stays](${new URL("/stays", site)}): Every current Prime Peak Stays property.
- [Home](${new URL("/", site)}): Brand overview and the principles that decide where the chain builds next.

## Contact

Enquiries: stays@primepeakstays.com
Phone: +91 89105 69649
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
