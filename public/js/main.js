// Application Entry Point: wires Camera, Moveable, Palette, DOM Tree, Inspector & Exporter

import { createCamera } from './canvas/camera.js';
import {
    createNewElement,
    createNewFrame,
    deleteSelectedElement,
    duplicateSelectedElement
} from './canvas/elements.js';
import { state } from './core/state.js';
import { exportProject } from './io/exporter.js';
import { createDomTree } from './panels/dom-tree.js';
import { createInspector } from './panels/inspector.js';
import { createPalette } from './panels/palette.js';

document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.getElementById('canvas-wrapper');
    const container = document.getElementById('canvas-container');
    const activeFrame = document.getElementById('active-frame');

    state.activeFrameNode = activeFrame;
    state.activeFrameNode.classList.add('frame');

    // Moveable mounted inside canvas-wrapper so it transforms in lockstep with pan & zoom
    const moveable = new Moveable(wrapper, {
        target: null,
        draggable: true,
        resizable: true,
        rotatable: true,
        keepRatio: false,
        snappable: true,
        snapCenter: true,
        origin: false,
        zoom: 1
    });

    // Forward references wired once modules initialize
    let camera = null;
    let domTree = null;
    let inspector = null;
    let palette = null;

    function setActiveFrame(frameNode) {
        state.activeFrameNode = frameNode;
        document.querySelectorAll('.frame').forEach(f => {
            f.classList.toggle('active-frame-highlight', f === frameNode);
        });
        domTree?.render();
    }

    // 1. Camera (Space+Drag pan + smooth cursor-centered wheel zoom)
    camera = createCamera({
        container,
        wrapper,
        moveable,
        btnZoomIn: document.getElementById('btn-zoom-in'),
        btnZoomOut: document.getElementById('btn-zoom-out'),
        btnZoomReset: document.getElementById('btn-zoom-reset'),
        getActiveFrame: () => state.activeFrameNode,
        onEscape: () => palette?.setTool('select'),
        onSelectTool: () => palette?.setTool('select')
    });

    // 2. DOM Tree
    domTree = createDomTree({
        domTreeContainer: document.getElementById('dom-tree'),
        treeCountBadge: document.getElementById('tree-count-badge'),
        btnExpandAll: document.getElementById('btn-expand-all'),
        btnCollapseAll: document.getElementById('btn-collapse-all'),
        onSelectFrame: (frameNode) => {
            setActiveFrame(frameNode);
            inspector.selectElement(null);
            camera.centerOnFrame(frameNode, false);
        },
        onSelectElement: (node) => inspector.selectElement(node)
    });

    // 3. Properties Inspector
    inspector = createInspector({
        moveable,
        getCameraScale: () => camera.getScale(),
        onTreeChange: () => domTree.render()
    });

    // 4. HTML Elements Palette
    palette = createPalette({
        elementsPalette: document.getElementById('elements-palette'),
        elementSearch: document.getElementById('element-search'),
        elementCountBadge: document.getElementById('element-count-badge'),
        btnToolSelect: document.getElementById('btn-tool-select'),
        activeToolPill: document.getElementById('active-tool-pill'),
        activeToolTag: document.getElementById('active-tool-tag'),
        btnCancelTool: document.getElementById('btn-cancel-tool'),
        onQuickAdd: (tag) => {
            const offset = (state.elementCounter % 10) * 18;
            createNewElement(tag, 60 + offset, 60 + offset, (el) => inspector.selectElement(el));
        }
    });

    // Moveable transform handlers
    moveable
        .on('drag', ({ target, left, top }) => {
            target.style.left = `${left}px`;
            target.style.top = `${top}px`;
            inspector.updatePanel();
        })
        .on('resize', ({ target, width, height, drag }) => {
            target.style.width = `${width}px`;
            target.style.height = `${height}px`;
            target.style.left = `${drag.left}px`;
            target.style.top = `${drag.top}px`;
            inspector.updatePanel();
        })
        .on('rotate', ({ target, transform }) => {
            target.style.transform = transform;
            inspector.updatePanel();
        })
        .on('dragEnd', () => inspector.updatePanel())
        .on('resizeEnd', () => inspector.updatePanel())
        .on('rotateEnd', () => inspector.updatePanel());

    // Left sidebar tab switching
    document.querySelectorAll('.sidebar-tab').forEach(tabBtn => {
        tabBtn.addEventListener('click', () => {
            const targetTab = tabBtn.dataset.tab;
            document.querySelectorAll('.sidebar-tab').forEach(b => b.classList.toggle('active', b === tabBtn));
            document.querySelectorAll('.tab-content').forEach(panel => {
                panel.classList.toggle('active', panel.id === `tab-${targetTab}`);
            });
            if (targetTab === 'layers') domTree.render();
        });
    });

    // Canvas click / placement
    wrapper.addEventListener('pointerdown', (e) => {
        if (camera.isSpacePanning()) return;

        const target = e.target;
        if (target.closest('.moveable-control-box')) return;

        const clickedFrame = target.closest('.frame');
        if (clickedFrame && clickedFrame !== state.activeFrameNode) {
            setActiveFrame(clickedFrame);
        }

        if (state.currentTool === 'select') {
            const clickedEl = target.closest('.ag-element');
            if (clickedEl && clickedFrame) {
                if (['A', 'BUTTON', 'SUMMARY', 'INPUT', 'SELECT', 'TEXTAREA'].includes(target.tagName)) {
                    e.preventDefault();
                }
                inspector.selectElement(clickedEl);
            } else if (target === wrapper || target.classList.contains('frame')) {
                inspector.selectElement(null);
            }
            return;
        }

        if (!clickedFrame) return;

        const rect = state.activeFrameNode.getBoundingClientRect();
        const x = Math.round((e.clientX - rect.left) / camera.getScale());
        const y = Math.round((e.clientY - rect.top) / camera.getScale());

        createNewElement(state.currentTool, x, y, (el) => inspector.selectElement(el));
        palette.setTool('select');
    });

    wrapper.addEventListener('click', (e) => {
        if (e.target.closest('.ag-element')) e.preventDefault();
    });

    // Frame, Element & Export actions
    document.getElementById('btn-add-frame').addEventListener('click', () => {
        const newFrame = createNewFrame(wrapper);
        setActiveFrame(newFrame);
        camera.centerOnFrame(newFrame, false);
    });

    document.getElementById('btn-delete-el').addEventListener('click', () => {
        deleteSelectedElement((el) => inspector.selectElement(el));
    });

    document.getElementById('btn-duplicate-el').addEventListener('click', () => {
        duplicateSelectedElement((el) => inspector.selectElement(el));
    });

    document.getElementById('btn-save').addEventListener('click', () => {
        exportProject({ onBeforeExport: () => inspector.selectElement(null) });
    });

    // Initial render
    palette.render();
    setActiveFrame(state.activeFrameNode);
    palette.setTool('select');
    camera.centerOnFrame(state.activeFrameNode, true);
});
