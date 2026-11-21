// Element & Frame Lifecycle (strictly guarded by the 116-element HTML allowlist)

import { HTML_ELEMENT_MAP } from '../catalog/html-elements.js';
import { state } from '../core/state.js';
import { refreshMetaVisual } from '../core/utils.js';

export function createNewElement(tag, x, y, onSelect) {
    const def = HTML_ELEMENT_MAP.get(tag);
    if (!def) {
        console.error(`Cannot create <${tag}>: element is not in the allowed HTML elements list.`);
        return null;
    }

    state.elementCounter++;
    const id = `el-${state.elementCounter}`;

    let el = null;

    if (def.renderMode === 'meta') {
        el = document.createElement('div');
        el.classList.add('ag-meta-element');
        el.dataset.renderMode = 'meta';
        el.dataset.metaAttrs = JSON.stringify(def.defaultAttrs || {});
        el.dataset.metaContent = def.defaultHTML || def.defaultText || '';
    } else if (def.renderMode === 'svg') {
        el = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        el.dataset.renderMode = 'svg';
        if (def.defaultHTML) el.innerHTML = def.defaultHTML;
    } else if (def.renderMode === 'math') {
        el = document.createElementNS('http://www.w3.org/1998/Math/MathML', 'math');
        el.dataset.renderMode = 'math';
        if (def.defaultHTML) el.innerHTML = def.defaultHTML;
    } else {
        el = document.createElement(def.tag);
        el.dataset.renderMode = 'real';
        if (def.defaultHTML) {
            el.innerHTML = def.defaultHTML;
        } else if (!def.void && def.defaultText !== undefined) {
            el.textContent = def.defaultText;
        }
    }

    el.id = id;
    el.classList.add('ag-element');
    el.dataset.tag = def.tag;

    if (def.renderMode !== 'meta' && def.defaultAttrs) {
        Object.entries(def.defaultAttrs).forEach(([attrName, attrVal]) => {
            el.setAttribute(attrName, attrVal);
        });
    }

    if (def.defaultStyle) {
        Object.entries(def.defaultStyle).forEach(([prop, val]) => {
            el.style[prop] = val;
        });
    }

    el.style.position = 'absolute';
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;

    if (def.defaultSize) {
        if (def.defaultSize.width && def.defaultSize.width !== 'auto') {
            el.style.width = `${def.defaultSize.width}px`;
        }
        if (def.defaultSize.height && def.defaultSize.height !== 'auto') {
            el.style.height = `${def.defaultSize.height}px`;
        }
    }

    el.style.userSelect = 'none';

    if (def.renderMode === 'meta') {
        refreshMetaVisual(el);
    }

    state.activeFrameNode.appendChild(el);
    state.elements.push(el);
    onSelect?.(el);
    return el;
}

export function deleteSelectedElement(onSelect) {
    const el = state.selectedEl;
    if (!el) return;

    el.remove();
    state.elements = state.elements.filter(e => e !== el);
    if (el.id) {
        const styleTag = document.getElementById(`style-${el.id}`);
        if (styleTag) styleTag.remove();
    }

    onSelect?.(null);
}

export function duplicateSelectedElement(onSelect) {
    const el = state.selectedEl;
    if (!el || !el.parentElement) return;

    const clone = el.cloneNode(true);
    state.elementCounter++;
    clone.id = `el-${state.elementCounter}`;

    if (clone.classList.contains('ag-element')) {
        clone.style.left = `${parseFloat(clone.style.left || 0) + 20}px`;
        clone.style.top = `${parseFloat(clone.style.top || 0) + 20}px`;
        state.elements.push(clone);
    }

    el.parentElement.appendChild(clone);

    if (clone.dataset && clone.dataset.customCss) {
        const styleTag = document.createElement('style');
        styleTag.id = `style-${clone.id}`;
        styleTag.innerHTML = `#${clone.id} { ${clone.dataset.customCss} }`;
        document.head.appendChild(styleTag);
    }

    onSelect?.(clone);
}

export function createNewFrame(wrapper) {
    state.frameCounter++;
    const newFrame = document.createElement('div');
    newFrame.className = 'frame';
    newFrame.id = `frame-${state.frameCounter}`;
    newFrame.dataset.id = newFrame.id;
    newFrame.dataset.label = `Frame ${state.frameCounter}`;

    newFrame.style.left = `${2100 + (state.frameCounter - 1) * 860}px`;
    newFrame.style.top = `2200px`;

    wrapper.appendChild(newFrame);
    return newFrame;
}
