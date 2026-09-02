import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const project = pgTable('project', {
	id: serial('id').primaryKey(),
	slug: text('title').unique().notNull(),
	created: timestamp().defaultNow()
});
