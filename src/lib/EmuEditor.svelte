<script lang="ts">
	import type { Element, EditorState } from './types';
	import EmuBlock from './EmuBlock.svelte';

	let { root }: { root: Element } = $props();
	let editorState: EditorState = $state({ mode: 'normal' });
</script>

<button>Download</button>

<EmuBlock element={root} {editorState} />
