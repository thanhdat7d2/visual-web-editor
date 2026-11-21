// Pure helper utilities for geometry, color, metadata nodes, and DOM tree inspection

export function clamp(val, min, max) {
    return Math.min(max, Math.max(min, val));
}

export function isTypingInField() {
    const el = document.activeElement;
    if (!el) return false;
    const tag = el.tagName.toLowerCase();
    return tag === 'input' || tag === 'textarea' || tag === 'select' || el.isContentEditable;
}

export function rgb2hex(rgb) {
    if (!rgb || rgb === 'transparent' || rgb === 'rgba(0, 0, 0, 0)') return 'transparent';
    if (rgb.startsWith('#')) return rgb;
    const result =
        /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/i.exec(rgb) ||
        /^rgba\((\d+),\s*(\d+),\s*(\d+)/i.exec(rgb);
    return result
        ? '#' +
            ('0' + parseInt(result[1], 10).toString(16)).slice(-2) +
            ('0' + parseInt(result[2], 10).toString(16)).slice(-2) +
            ('0' + parseInt(result[3], 10).toString(16)).slice(-2)
        : rgb;
}

export function escapeAttr(val) {
    return String(val).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

export function getMetaAttrs(el) {
    try {
        return JSON.parse(el.dataset.metaAttrs || '{}');
    } catch {
        return {};
    }
}

export function setMetaAttrs(el, attrsObj) {
    el.dataset.metaAttrs = JSON.stringify(attrsObj);
    refreshMetaVisual(el);
}

export function refreshMetaVisual(el) {
    if (!el.dataset || el.dataset.renderMode !== 'meta') return;
    const tag = el.dataset.tag;
    const attrs = getMetaAttrs(el);
    const content = el.dataset.metaContent || '';

    const attrPreview = Object.entries(attrs)
        .slice(0, 2)
        .map(([k, v]) => (v === '' ? k : `${k}="${v}"`))
        .join(' ');
    const summary = attrPreview || content.slice(0, 28);

    el.innerHTML = `<span class="ag-meta-tag">&lt;${tag}&gt;</span>${summary ? '<span class="ag-meta-summary"></span>' : ''}`;
    if (summary) {
        el.querySelector('.ag-meta-summary').textContent = summary;
    }
}

export function getTreeChildren(node) {
    if (node.dataset && node.dataset.renderMode === 'meta') return [];
    return Array.from(node.children).filter(child => !child.classList.contains('moveable-control-box'));
}

export function getNodeDisplayTag(node) {
    if (node.dataset && node.dataset.tag) return node.dataset.tag;
    return node.tagName.toLowerCase();
}

export function getNodePreviewText(node) {
    if (node.dataset && node.dataset.renderMode === 'meta') {
        const attrs = getMetaAttrs(node);
        const firstAttr = Object.entries(attrs)[0];
        if (firstAttr) return `${firstAttr[0]}="${firstAttr[1]}"`;
        return (node.dataset.metaContent || '').trim().slice(0, 22);
    }
    let text = '';
    for (const child of node.childNodes) {
        if (child.nodeType === Node.TEXT_NODE) {
            text += child.textContent;
        }
    }
    text = text.trim();
    if (text) return `"${text.slice(0, 22)}${text.length > 22 ? '…' : ''}"`;
    if (node.id) return `#${node.id}`;
    return '';
}
