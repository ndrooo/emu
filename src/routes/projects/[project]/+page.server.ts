import { db } from '$lib/server/db/index.js';

export async function load({ params }) {
	const project = await db.query.projects.findFirst({
		where: {
			slug: params.project
		},
		with: {
			pages: true
		}
	});
	return { project: project };
}
