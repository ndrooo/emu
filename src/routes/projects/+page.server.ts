import { db } from '$lib/server/db';
import { projects } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = async () => {
	return { projects: await db.select().from(projects).limit(10) };
};

export const actions = {
	default: async ({ request }) => {
		const projectName = (await request.formData()).get('projectName')!.toString()!;
		await db.insert(projects).values({ slug: projectName });
	}
};
