import assert from 'node:assert/strict';
import test from 'node:test';

import {
    HTML_ELEMENT_CATALOG,
    HTML_ELEMENT_CATEGORIES,
    HTML_ELEMENT_MAP
} from '../public/js/catalog/html-elements.js';
import { clamp, escapeAttr, rgb2hex } from '../public/js/core/utils.js';

const EXPECTED_TAGS = [
    // Root (12)
    'html', 'head', 'body', 'base', 'link', 'meta', 'style', 'noscript', 'script', 'title', 'slot', 'template',
    // Sectioning (17)
    'address', 'article', 'aside', 'footer', 'header', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hgroup', 'main', 'nav', 'section', 'search', 'div',
    // Elements (56)
    'dd', 'dl', 'dt', 'figcaption', 'figure', 'hr', 'p', 'blockquote', 'pre', 'menu', 'ol', 'ul', 'li',
    'img', 'map', 'area', 'video', 'audio', 'track', 'embed', 'iframe', 'object', 'picture', 'source',
    'svg', 'math', 'canvas',
    'caption', 'col', 'colgroup', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr',
    'button', 'datalist', 'fieldset', 'form', 'input', 'label', 'legend', 'meter', 'optgroup', 'option', 'output', 'progress', 'select', 'selectedcontent', 'textarea',
    'details', 'dialog', 'geolocation', 'summary',
    // Text (31)
    'a', 'abbr', 'b', 'bdi', 'bdo', 'br', 'cite', 'code', 'data', 'dfn', 'em', 'i', 'kbd', 'mark', 'q', 'rp', 'rt', 'ruby',
    's', 'samp', 'small', 'span', 'strong', 'sub', 'sup', 'time', 'u', 'var', 'wbr', 'del', 'ins'
];

test('HTML element catalog contains the exact 116 allowed tags with no duplicates', () => {
    const actualTags = HTML_ELEMENT_CATALOG.map((item) => item.tag);
    assert.equal(actualTags.length, 116);
    assert.equal(HTML_ELEMENT_MAP.size, 116);
    assert.deepEqual(new Set(actualTags), new Set(EXPECTED_TAGS));
});

test('every catalog entry belongs to a valid category and has a description', () => {
    const validCategories = new Set(HTML_ELEMENT_CATEGORIES);
    for (const item of HTML_ELEMENT_CATALOG) {
        assert.ok(validCategories.has(item.category), `Invalid category for <${item.tag}>`);
        assert.ok(typeof item.description === 'string' && item.description.length > 0, `Missing description for <${item.tag}>`);
    }
});

test('core utility functions behave as expected', () => {
    assert.equal(clamp(10, 0, 5), 5);
    assert.equal(clamp(-3, 0, 5), 0);
    assert.equal(clamp(2.5, 0, 5), 2.5);

    assert.equal(rgb2hex('rgb(10, 132, 255)'), '#0a84ff');
    assert.equal(rgb2hex('rgba(0, 0, 0, 0)'), 'transparent');
    assert.equal(rgb2hex('#ffffff'), '#ffffff');

    assert.equal(escapeAttr('a & "b"'), 'a &amp; &quot;b&quot;');
});
