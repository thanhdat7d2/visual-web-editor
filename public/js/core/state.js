// Shared editor state and constants

export const INTERNAL_ATTRS = new Set(['id', 'class', 'style']);

export const state = {
    currentTool: 'select', // 'select' or an allowed HTML tag name
    activeCategory: 'All',
    searchQuery: '',
    elements: [],
    selectedEl: null,
    activeFrameNode: null,
    frameBgColor: '#ffffff',
    elementCounter: 0,
    frameCounter: 1
};

export const collapsedNodes = new WeakSet();
