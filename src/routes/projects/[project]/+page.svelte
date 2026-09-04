<script lang="ts">
	import EmuEditor from '$lib/EmuEditor.svelte';
	import EmuRender from '$lib/EmuRender.svelte';
	import type { Element } from '$lib/types';

	const { data } = $props();
	
	var activePageName = $state('index');
	const activePage = $derived(data.project!.pages.find((page) => page.filename === activePageName));
	
	const root: Element = $state({
		kind: 'content-element',
		tag: 'body',
		slots: [
			{
				content: [
					{
						kind: 'content-element',
						tag: 'h1',
						slots: [
							{
								content: [{ text: 'Hello world', kind: 'text-element' }]
							}
						]
					},
					{
						kind: 'content-element',
						tag: 'p',
						slots: [
							{
								content: [{ text: "And here's some more", kind: 'text-element' }]
							}
						]
					}
				]
			}
		]
	});
</script>

<header>
	<h1>{data.project!.slug}</h1>
</header>

<main>
	<nav>
		<ul>
			{#each data.project!.pages as page (page.id)}
				<li>
					<button onclick={() => (activePageName = page.filename)}>{page.filename}</button>
				</li>
			{/each}
		</ul>
	</nav>

	{#if activePage}
    	<div>
    		<h2>{activePage?.filename} - {activePage?.id}</h2>
    		<EmuEditor {root} />
    	</div>
    
    	<div>
    		<EmuRender element={root} />
    	</div>
	{/if}
</main>

<style>
	main {
		display: flex;
		justify-content: space-around;

		> nav {
			max-width: 200px;
		}

		> * {
			flex-grow: 1;
		}
	}

	nav ul {
		padding: 0;
		margin: 0;
	}

	nav ul li {
		display: flex;
		list-style: none;
		padding: 0;
		margin: 0;
	}

	nav ul li button {
		background: none;
		border: none;
		text-align: start;
		display: block;
		padding: 0.5rem;
		flex-grow: 1;
	}
</style>
