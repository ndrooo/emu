export type ContentElement = {
	kind: 'content-element';
	tag: string;
	slots: Slot[];
	attrs?: Attribute[];
};

export type TextElement = {
	kind: 'text-element';
	text: string;
};

export type Element = ContentElement | TextElement;

export type Slot = {
	name?: string;
	content: Element[];
};

export type Attribute = {
	key: string;
	value: string;
};

export type EditorState = {
  mode: "normal" | "moving";
  movingElement?: Element;
  movingElementParentSlot?: Slot;
};
