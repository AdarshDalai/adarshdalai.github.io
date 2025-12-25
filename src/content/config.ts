import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		subtitle: z.string(),
		image: z.string(), // Image filename from assets folder (e.g., "project-one.jpg")
		techStack: z.array(z.string()).optional().default([]),
		githubUrl: z.string().optional(),
		liveUrl: z.string().optional(),
		featured: z.boolean().optional().default(false),
		order: z.number().optional().default(0), // For custom ordering
		draft: z.boolean().optional().default(false), // Set to true to hide
	}),
});

export const collections = {
	projects,
};
