// Searchable, Categorized HTML Elements Palette & Tool State

import {
    HTML_ELEMENT_CATALOG,
    HTML_ELEMENT_CATEGORIES,
    HTML_ELEMENT_MAP
} from '../catalog/html-elements.js';
import { state } from '../core/state.js';

export function createPalette({
    elementsPalette,
    elementSearch,
    elementCountBadge,
    btnToolSelect,
    activeToolPill,
    activeToolTag,
    btnCancelTool,
    onQuickAdd
}) {
    if (elementCountBadge) {
        elementCountBadge.textContent = String(HTML_ELEMENT_CATALOG.length);
    }

    function setTool(toolName) {
        if (toolName !== 'select' && !HTML_ELEMENT_MAP.has(toolName)) {
            console.warn(`Rejected unsupported HTML element: <${toolName}>`);
            return;
        }

        state.currentTool = toolName;
        const isSelect = toolName === 'select';

        btnToolSelect.classList.toggle('active', isSelect);
        activeToolPill.style.display = isSelect ? 'none' : 'flex';
        if (!isSelect) {
            activeToolTag.textContent = `<${toolName}>`;
        }

        document.querySelectorAll('.frame').forEach(f => {
            f.classList.toggle('placing-cursor', !isSelect);
        });

        elementsPalette.querySelectorAll('.el-chip').forEach(chip => {
            chip.classList.toggle('active', chip.dataset.tag === toolName);
        });
    }

    function createChip(item) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'el-chip';
        btn.dataset.tag = item.tag;
        btn.textContent = `<${item.tag}>`;
        btn.title = `${item.category}${item.subCategory ? ' / ' + item.subCategory : ''}\n${item.description}`;
        if (state.currentTool === item.tag) {
            btn.classList.add('active');
        }

        btn.addEventListener('click', () => {
            setTool(state.currentTool === item.tag ? 'select' : item.tag);
        });

        btn.addEventListener('dblclick', (e) => {
            e.preventDefault();
            onQuickAdd?.(item.tag);
            setTool('select');
        });

        return btn;
    }

    function render() {
        const query = state.searchQuery.trim().toLowerCase();
        const catFilter = state.activeCategory;

        const filtered = HTML_ELEMENT_CATALOG.filter(item => {
            if (catFilter !== 'All' && item.category !== catFilter) return false;
            if (!query) return true;
            return (
                item.tag.includes(query) ||
                item.description.toLowerCase().includes(query) ||
                (item.subCategory && item.subCategory.toLowerCase().includes(query))
            );
        });

        elementsPalette.innerHTML = '';

        if (filtered.length === 0) {
            elementsPalette.innerHTML = '<div class="palette-empty">No matching allowed HTML elements.</div>';
            return;
        }

        const categoriesToRender = catFilter === 'All' ? HTML_ELEMENT_CATEGORIES : [catFilter];

        categoriesToRender.forEach(cat => {
            const itemsInCat = filtered.filter(item => item.category === cat);
            if (itemsInCat.length === 0) return;

            const groupDiv = document.createElement('div');
            groupDiv.className = 'palette-group';

            const header = document.createElement('div');
            header.className = 'palette-group-title';
            header.innerHTML = `<span>${cat}</span><span class="palette-group-count">${itemsInCat.length}</span>`;
            groupDiv.appendChild(header);

            const hasSubCategories = itemsInCat.some(i => i.subCategory);
            if (hasSubCategories) {
                const subOrder = [];
                const subMap = new Map();
                itemsInCat.forEach(item => {
                    const key = item.subCategory || 'General';
                    if (!subMap.has(key)) {
                        subMap.set(key, []);
                        subOrder.push(key);
                    }
                    subMap.get(key).push(item);
                });

                subOrder.forEach(sub => {
                    const subDiv = document.createElement('div');
                    subDiv.className = 'palette-subgroup';
                    const subHeader = document.createElement('div');
                    subHeader.className = 'palette-subgroup-title';
                    subHeader.textContent = sub;
                    subDiv.appendChild(subHeader);

                    const grid = document.createElement('div');
                    grid.className = 'palette-grid';
                    subMap.get(sub).forEach(item => grid.appendChild(createChip(item)));
                    subDiv.appendChild(grid);
                    groupDiv.appendChild(subDiv);
                });
            } else {
                const grid = document.createElement('div');
                grid.className = 'palette-grid';
                itemsInCat.forEach(item => grid.appendChild(createChip(item)));
                groupDiv.appendChild(grid);
            }

            elementsPalette.appendChild(groupDiv);
        });
    }

    btnToolSelect.addEventListener('click', () => setTool('select'));
    btnCancelTool.addEventListener('click', () => setTool('select'));

    document.querySelectorAll('.cat-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            state.activeCategory = pill.dataset.category;
            document.querySelectorAll('.cat-pill').forEach(p => p.classList.toggle('active', p === pill));
            render();
        });
    });

    elementSearch.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        render();
    });

    return { render, setTool };
}
