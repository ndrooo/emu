<script lang="ts">
	import type { EditorState, Element, Slot } from './types';
	import EmuBlock from './EmuBlock.svelte';
	import { tick } from 'svelte';

	let {
		element,
		editorState,
		parentSlot
	}: { element: Element; editorState: EditorState; parentSlot?: Slot } = $props();
	let contentElement = $derived(element.kind === 'content-element' ? element : null);
	let textElement = $derived(element.kind === 'text-element' ? element : null);

	let startMoving = () => {
		editorState.mode = 'moving';
		editorState.movingElement = element;
		editorState.movingElementParentSlot = parentSlot;
	};

	const removeMe = () => {
		let rmIndex = parentSlot?.content.indexOf(element);
		parentSlot?.content.splice(rmIndex!, 1);
	};

	let moveHere = (slot: Slot) => {
		if (
			editorState.mode !== 'moving' ||
			!editorState.movingElement ||
			!editorState.movingElementParentSlot
		) {
			return;
		}
		editorState.mode = 'normal';
		let parent = editorState.movingElementParentSlot;
		let rmIndex = parent?.content.indexOf(editorState.movingElement);
		parent?.content.splice(rmIndex!, 1);
		slot.content = [...slot.content, editorState.movingElement];
		editorState.movingElement = undefined;
		editorState.movingElementParentSlot = undefined;
	};

	let showAdd = $state(false);
	let addTag = $state('');
	let addInput: HTMLElement | undefined = $state(undefined);
	let addButton: HTMLElement | undefined = $state(undefined);

	let createNew = async (slot: Slot) => {
		slot.content = [
			...slot.content,
			{ kind: 'content-element', tag: addTag, slots: [{ content: [] }] }
		];
		showAdd = false;
		addTag = '';
		await tick();
		addButton!.focus();
	};

	let createText = (slot: Slot) => {
		slot.content = [...slot.content, { kind: 'text-element', text: '' }];
	};
</script>

{#if contentElement !== null}
	<emu-block>
		{contentElement.tag}
		{#if editorState.mode === 'normal' && parentSlot !== undefined}
			<button onclick={() => startMoving()}>Move</button>
			<button onclick={() => removeMe()}>Remove</button>
		{/if}
		{#each contentElement.slots as slot (slot.name)}
			{slot.name}
			{#each slot.content as child (child)}
				<EmuBlock element={child} {editorState} parentSlot={slot} />
			{/each}
			{#if editorState.mode === 'moving'}
				<button
					onclick={() => {
						moveHere(slot);
					}}>Move here</button
				>
			{/if}
			{#if editorState.mode === 'normal'}
				<form style:display={showAdd ? 'unset' : 'none'}>
					<label>Tag:</label>
					<input type="text" bind:value={addTag} bind:this={addInput} />
					<input type="submit" value="Create" onclick={() => createNew(slot)} />
				</form>
				<div style:display={showAdd ? 'none' : 'contents'}>
					<button
						bind:this={addButton}
						onclick={async () => {
							showAdd = true;
							await tick();
							addInput!.focus();
						}}>Add</button
					>
					<button onclick={() => createText(slot)}>Text</button>
				</div>
			{/if}
		{/each}
	</emu-block>
{:else if textElement !== null}
	<emu-block class="text">
		Text
		{#if editorState.mode === 'normal' && parentSlot !== undefined}
			<button onclick={() => startMoving()}>Move</button>
			<button onclick={() => removeMe()}>Remove</button>
		{/if}
		<br />
		<textarea bind:value={textElement.text}></textarea>
	</emu-block>
{/if}

<style>
	emu-block {
		background-color: lightblue;
		border: 2px solid black;
		display: block;
		margin-top: 1rem;
		margin-left: 1rem;
		margin-bottom: 0.5rem;
		max-width: 40ch;
	}

	emu-block.text {
		background-color: lightcoral;
	}
</style>
