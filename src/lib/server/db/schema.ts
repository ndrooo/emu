import { defineRelations } from 'drizzle-orm';
import { json, pgTable, integer, text, timestamp } from 'drizzle-orm/pg-core';

export const projects = pgTable('projects', {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	slug: text().notNull(),
	created: timestamp().defaultNow()
});

export const pages = pgTable('pages', {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	filename: text().unique().notNull(),
	content: json().notNull(),
	project_id: integer()
});

export const elements = pgTable('elements', {});

export const relations = defineRelations({ projects, pages }, (r) => ({
	projects: {
		pages: r.many.pages()
	},
	pages: {
		projects: r.one.projects({
			from: r.pages.project_id,
			to: r.projects.id
		})
	}
}));

export const schema = { projects, pages };
