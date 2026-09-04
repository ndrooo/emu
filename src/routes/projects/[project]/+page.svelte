<script lang="ts">
	import EmuEditor from '$lib/EmuEditor.svelte';
	import EmuRender from '$lib/EmuRender.svelte';
	import type { Element } from '$lib/types';

	let { data } = $props();

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

<h1>{data.project.name}</h1>

<EmuEditor {root} />

<EmuRender element={root} />
