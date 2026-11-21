// Right Sidebar Properties Inspector & HTML Attributes Editor

import { HTML_ELEMENT_MAP } from '../catalog/html-elements.js';
import { INTERNAL_ATTRS, state } from '../core/state.js';
import {
    getMetaAttrs,
    getNodeDisplayTag,
    refreshMetaVisual,
    rgb2hex,
    setMetaAttrs
} from '../core/utils.js';

export function createInspector({ moveable, getCameraScale, onTreeChange }) {
    const propPanel = document.getElementById('properties-panel');
    const emptyPanel = document.getElementById('properties-empty');
    const propElTag = document.getElementById('prop-el-tag');
    const propElCategory = document.getElementById('prop-el-category');
    const propElDesc = document.getElementById('prop-el-desc');

    const inX = document.getElementById('prop-x');
    const inY = document.getElementById('prop-y');
    const inW = document.getElementById('prop-w');
    const inH = document.getElementById('prop-h');
    const inRot = document.getElementById('prop-rotate');
    const inBg = document.getElementById('prop-bg-color');
    const inBgText = document.getElementById('prop-bg-color-text');
    const inRad = document.getElementById('prop-radius');
    const inOp = document.getElementById('prop-opacity');

    const inFontFam = document.getElementById('prop-font-family');
    const inTextColor = document.getElementById('prop-text-color');
    const inTextColorText = document.getElementById('prop-text-color-text');
    const inFontSize = document.getElementById('prop-font-size');
    const inFontWeight = document.getElementById('prop-font-weight');
    const inInnerText = document.getElementById('prop-inner-text');
    const inCustomCss = document.getElementById('prop-custom-css');

    const secText = document.getElementById('section-text');
    const attrsList = document.getElementById('attrs-list');
    const attrNewName = document.getElementById('attr-new-name');
    const attrNewValue = document.getElementById('attr-new-value');
    const btnAddAttr = document.getElementById('btn-add-attr');

    function getUserAttributes(el) {
        if (el.dataset && el.dataset.renderMode === 'meta') {
            return Object.entries(getMetaAttrs(el));
        }
        const result = [];
        for (const attr of Array.from(el.attributes)) {
            if (INTERNAL_ATTRS.has(attr.name) || attr.name.startsWith('data-')) continue;
            result.push([attr.name, attr.value]);
        }
        return result;
    }

    function setUserAttribute(el, name, value) {
        if (!name || INTERNAL_ATTRS.has(name) || name.startsWith('data-')) return;
        if (el.dataset && el.dataset.renderMode === 'meta') {
            const attrs = getMetaAttrs(el);
            attrs[name] = value;
            setMetaAttrs(el, attrs);
        } else {
            el.setAttribute(name, value);
        }
        onTreeChange?.();
    }

    function removeUserAttribute(el, name) {
        if (el.dataset && el.dataset.renderMode === 'meta') {
            const attrs = getMetaAttrs(el);
            delete attrs[name];
            setMetaAttrs(el, attrs);
        } else {
            el.removeAttribute(name);
        }
        onTreeChange?.();
    }

    function renderAttributes(el) {
        attrsList.innerHTML = '';
        getUserAttributes(el).forEach(([name, value]) => {
            const row = document.createElement('div');
            row.className = 'attr-row';

            const label = document.createElement('span');
            label.className = 'attr-name-label';
            label.textContent = name;
            label.title = name;

            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'full-input';
            input.value = value;
            input.addEventListener('input', (e) => {
                setUserAttribute(el, name, e.target.value);
                moveable.updateRect();
            });

            const delBtn = document.createElement('button');
            delBtn.type = 'button';
            delBtn.className = 'attr-del-btn';
            delBtn.innerHTML = '&times;';
            delBtn.title = `Remove ${name}`;
            delBtn.addEventListener('click', () => {
                removeUserAttribute(el, name);
                renderAttributes(el);
                moveable.updateRect();
            });

            row.appendChild(label);
            row.appendChild(input);
            row.appendChild(delBtn);
            attrsList.appendChild(row);
        });
    }

    function updatePanel() {
        const el = state.selectedEl;
        if (!el) return;

        const comp = window.getComputedStyle(el);

        inX.value = Math.round(parseFloat(el.style.left || comp.left) || 0);
        inY.value = Math.round(parseFloat(el.style.top || comp.top) || 0);
        inW.value = Math.round(parseFloat(el.style.width || comp.width) || 0);
        inH.value = Math.round(parseFloat(el.style.height || comp.height) || 0);

        let rot = 0;
        if (el.style.transform && el.style.transform.includes('rotate')) {
            const match = el.style.transform.match(/rotate\(([^d]+)deg\)/);
            if (match) rot = parseFloat(match[1]);
        }
        inRot.value = rot;

        const bgHex = rgb2hex(comp.backgroundColor);
        if (bgHex === 'transparent') {
            inBg.value = '#ffffff';
            inBgText.value = 'transparent';
        } else {
            inBg.value = bgHex;
            inBgText.value = bgHex;
        }

        let textHex = rgb2hex(comp.color);
        if (textHex === 'transparent') textHex = '#000000';
        inTextColor.value = textHex;
        inTextColorText.value = textHex;

        inRad.value = parseFloat(comp.borderRadius) || 0;
        inOp.value = Math.round((parseFloat(comp.opacity) || 1) * 100);

        inFontFam.value = comp.fontFamily.replace(/['"]/g, '').split(',')[0];
        inFontSize.value = parseFloat(comp.fontSize) || 16;
        inFontWeight.value = comp.fontWeight || 400;

        const tag = getNodeDisplayTag(el);
        const def = HTML_ELEMENT_MAP.get(tag);
        if (!def || !def.void) {
            if (el.dataset && el.dataset.renderMode === 'meta') {
                inInnerText.value = el.dataset.metaContent || '';
            } else if ((def && def.defaultHTML) || el.children.length > 0) {
                inInnerText.value = el.innerHTML || '';
            } else {
                inInnerText.value = el.textContent || '';
            }
        }

        inCustomCss.value = (el.dataset && el.dataset.customCss) || '';
    }

    function selectElement(el) {
        if (!el) {
            state.selectedEl = null;
            moveable.target = null;
            emptyPanel.style.display = 'block';
            propPanel.style.display = 'none';
            onTreeChange?.();
            return;
        }

        state.selectedEl = el;
        const isPositionedElement = el.classList.contains('ag-element');
        moveable.draggable = isPositionedElement;
        moveable.resizable = isPositionedElement;
        moveable.rotatable = isPositionedElement;
        moveable.target = el;
        moveable.zoom = 1 / (getCameraScale?.() || 1);
        moveable.updateRect();

        emptyPanel.style.display = 'none';
        propPanel.style.display = 'block';

        const tag = getNodeDisplayTag(el);
        const def = HTML_ELEMENT_MAP.get(tag);
        propElTag.textContent = `<${tag}>`;
        if (def) {
            propElCategory.textContent = def.subCategory ? `${def.category} / ${def.subCategory}` : def.category;
            propElDesc.textContent = def.description;
            secText.style.display = def.void ? 'none' : 'block';
        } else {
            propElCategory.textContent = 'Child Node';
            propElDesc.textContent = `Nested <${tag}> element inside the DOM tree.`;
            secText.style.display = 'block';
        }

        renderAttributes(el);
        updatePanel();
        onTreeChange?.();
    }

    // Bind inspector inputs
    const handleInput = (input, updateFn) => {
        input.addEventListener('input', (e) => {
            const el = state.selectedEl;
            if (!el) return;
            updateFn(el, e.target.value);
            moveable.updateRect();
        });
    };

    handleInput(inX, (el, v) => el.style.left = `${v}px`);
    handleInput(inY, (el, v) => el.style.top = `${v}px`);
    handleInput(inW, (el, v) => el.style.width = `${v}px`);
    handleInput(inH, (el, v) => el.style.height = `${v}px`);
    handleInput(inRot, (el, v) => el.style.transform = `rotate(${v}deg)`);

    const updateBg = (el, v) => {
        el.style.backgroundColor = v;
        if (v.startsWith('#') && v.length === 7) inBg.value = v;
        inBgText.value = v;
    };
    handleInput(inBg, updateBg);
    handleInput(inBgText, updateBg);

    const updateTextCol = (el, v) => {
        el.style.color = v;
        if (v.startsWith('#') && v.length === 7) inTextColor.value = v;
        inTextColorText.value = v;
    };
    handleInput(inTextColor, updateTextCol);
    handleInput(inTextColorText, updateTextCol);

    handleInput(inRad, (el, v) => el.style.borderRadius = `${v}px`);
    handleInput(inOp, (el, v) => el.style.opacity = (v / 100).toString());

    handleInput(inFontFam, (el, v) => el.style.fontFamily = v);
    handleInput(inFontSize, (el, v) => el.style.fontSize = `${v}px`);
    handleInput(inFontWeight, (el, v) => el.style.fontWeight = v);

    handleInput(inInnerText, (el, v) => {
        const tag = getNodeDisplayTag(el);
        const def = HTML_ELEMENT_MAP.get(tag);
        if (def && def.void) return;
        if (el.dataset && el.dataset.renderMode === 'meta') {
            el.dataset.metaContent = v;
            refreshMetaVisual(el);
        } else if ((def && def.defaultHTML) || el.children.length > 0) {
            el.innerHTML = v;
        } else {
            el.textContent = v;
        }
        onTreeChange?.();
    });

    handleInput(inCustomCss, (el, v) => {
        if (!el.id) {
            state.elementCounter++;
            el.id = `el-${state.elementCounter}`;
        }
        el.dataset.customCss = v;
        let styleTag = document.getElementById(`style-${el.id}`);
        if (!styleTag) {
            styleTag = document.createElement('style');
            styleTag.id = `style-${el.id}`;
            document.head.appendChild(styleTag);
        }
        styleTag.innerHTML = `#${el.id} { ${v} }`;
    });

    btnAddAttr.addEventListener('click', () => {
        const el = state.selectedEl;
        if (!el) return;
        const name = attrNewName.value.trim().toLowerCase();
        const val = attrNewValue.value;
        if (!name || !/^[a-z][a-z0-9:-]*$/.test(name) || INTERNAL_ATTRS.has(name) || name.startsWith('data-')) {
            return;
        }
        setUserAttribute(el, name, val);
        attrNewName.value = '';
        attrNewValue.value = '';
        renderAttributes(el);
        moveable.updateRect();
    });

    return { selectElement, updatePanel };
}
