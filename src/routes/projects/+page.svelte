<script lang="ts">
	import { resolve } from '$app/paths';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<form method="post">
	<label>New project: <input type="text" name="projectName" /></label>
	<input type="submit" value="Create" />
</form>

<ul>
	{#each data.projects as project (project.id)}
		<li>
			<a href={resolve('/projects/[project]', { project: project.slug })}>{project.slug}</a>
		</li>
	{/each}
</ul>
