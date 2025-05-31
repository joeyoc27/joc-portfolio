import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const product = defineCollection({
  // Load Markdown and MDX files in the `src/content/product/` directory.
  loader: glob({ base: "./src/content/product", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.string(),
    updatedDate: z.string().optional(),
    heroImage: z.string().optional(),
  }),
});

const marketing = defineCollection({
  loader: glob({ base: "./src/content/marketing", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.string(),
    updatedDate: z.string().optional(),
    heroImage: z.string().optional(),
  }),
});

export const collections = { product, marketing };
