// Project Serialization & Export to /api/save

import { HTML_ELEMENT_MAP } from '../catalog/html-elements.js';
import { state } from '../core/state.js';
import { escapeAttr, getMetaAttrs } from '../core/utils.js';

function serializeMetaElement(el, def) {
    const attrs = getMetaAttrs(el);
    const attrStr = Object.entries(attrs)
        .map(([k, v]) => (v === '' ? k : `${k}="${escapeAttr(v)}"`))
        .join(' ');
    const openTag = attrStr ? `<${def.tag} ${attrStr}>` : `<${def.tag}>`;
    if (def.void) return openTag;
    const content = el.dataset.metaContent || '';
    return `${openTag}${content}</${def.tag}>`;
}

export async function exportProject({ onBeforeExport }) {
    onBeforeExport?.();

    let globalCSS = `
        body {
            font-family: 'Inter', sans-serif;
        }
    `;

    document.querySelectorAll('.frame [data-custom-css]').forEach(el => {
        if (el.dataset.customCss && el.id) {
            globalCSS += `\n#${el.id} { ${el.dataset.customCss} }`;
        }
    });

    const framesData = [];
    document.querySelectorAll('.frame').forEach((frameNode, i) => {
        const headParts = [];
        const bodyParts = [];

        Array.from(frameNode.children).forEach(child => {
            if (!child.classList.contains('ag-element')) return;
            const tag = child.dataset.tag;
            const def = HTML_ELEMENT_MAP.get(tag);
            if (!def) return;

            if (child.dataset.renderMode === 'meta') {
                if (tag === 'html' || tag === 'head' || tag === 'body') return;
                const markup = serializeMetaElement(child, def);
                if (def.headElement) {
                    headParts.push(markup);
                } else {
                    bodyParts.push(markup);
                }
            } else {
                const clone = child.cloneNode(true);
                clone.classList.remove('ag-element');
                if (clone.classList.length === 0) clone.removeAttribute('class');
                delete clone.dataset.tag;
                delete clone.dataset.renderMode;
                delete clone.dataset.customCss;
                clone.style.removeProperty('user-select');
                bodyParts.push(clone.outerHTML);
            }
        });

        framesData.push({
            name: frameNode.id || `page-${i}`,
            backgroundColor: state.frameBgColor,
            headHtml: headParts.join('\n    '),
            html: bodyParts.join('\n    ')
        });
    });

    const payload = { globalCSS, frames: framesData };

    try {
        const resp = await fetch('/api/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (resp.ok) {
            alert('Project exported successfully to /exports folder!');
        } else {
            alert('Failed to export.');
        }
    } catch (e) {
        console.error(e);
        alert('Error exporting project.');
    }
}
