<script lang="ts">
	import EmuRender from './EmuRender.svelte';
	import type { Element } from './types';

	let { element }: { element: Element } = $props();
	let contentElement = $derived(element.kind === 'content-element' ? element : null);
	let textElement = $derived(element.kind === 'text-element' ? element : null);
</script>

{#if contentElement !== null}
	<svelte:element this={contentElement.tag}>
		{#each contentElement.slots as slot (slot.name)}
			{#each slot.content as child (child)}
				<EmuRender element={child} />
			{/each}
		{/each}
	</svelte:element>
{:else if textElement !== null}
    {textElement.text}
{/if}
