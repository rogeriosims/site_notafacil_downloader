import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
    schema: ({ image: imageHelper }) => z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        author: z.string().default('Tecnologia Corporativa'),
        image: imageHelper().optional(),
        tags: z.array(z.string()).optional(),
        draft: z.boolean().default(false),
        readingTime: z.string().optional(),
    }),
});

export const collections = { blog };
