// Recursive, Collapsible DOM / Element Tree Panel

import { collapsedNodes, state } from '../core/state.js';
import { getNodeDisplayTag, getNodePreviewText, getTreeChildren } from '../core/utils.js';

export function createDomTree({
    domTreeContainer,
    treeCountBadge,
    btnExpandAll,
    btnCollapseAll,
    onSelectFrame,
    onSelectElement
}) {
    function render() {
        if (!domTreeContainer) return;
        domTreeContainer.innerHTML = '';

        let totalElements = 0;
        const frames = Array.from(document.querySelectorAll('.frame'));

        frames.forEach((frameNode, idx) => {
            const frameLabel = frameNode.dataset.label || `Frame ${idx + 1}`;
            const frameChildren = getTreeChildren(frameNode);
            const isFrameCollapsed = collapsedNodes.has(frameNode);

            const frameRow = document.createElement('div');
            frameRow.className = 'tree-node-row frame-node';
            if (frameNode === state.activeFrameNode && !state.selectedEl) {
                frameRow.classList.add('active');
            }

            const toggle = document.createElement('span');
            toggle.className = `tree-toggle${frameChildren.length === 0 ? ' leaf' : ''}`;
            toggle.textContent = isFrameCollapsed ? '▸' : '▾';
            toggle.addEventListener('click', (e) => {
                e.stopPropagation();
                if (collapsedNodes.has(frameNode)) collapsedNodes.delete(frameNode);
                else collapsedNodes.add(frameNode);
                render();
            });

            const tagSpan = document.createElement('span');
            tagSpan.className = 'tree-tag';
            tagSpan.textContent = frameLabel;

            const idSpan = document.createElement('span');
            idSpan.className = 'tree-preview';
            idSpan.textContent = `#${frameNode.id}`;

            frameRow.appendChild(toggle);
            frameRow.appendChild(tagSpan);
            frameRow.appendChild(idSpan);
            frameRow.addEventListener('click', () => onSelectFrame?.(frameNode));

            domTreeContainer.appendChild(frameRow);

            if (!isFrameCollapsed) {
                if (frameChildren.length === 0) {
                    const emptyHint = document.createElement('div');
                    emptyHint.className = 'tree-empty-hint';
                    emptyHint.textContent = 'Empty frame';
                    domTreeContainer.appendChild(emptyHint);
                } else {
                    const renderBranch = (node, depth) => {
                        totalElements++;
                        const children = getTreeChildren(node);
                        const isCollapsed = collapsedNodes.has(node);

                        const row = document.createElement('div');
                        row.className = 'tree-node-row';
                        row.style.paddingLeft = `${6 + depth * 14}px`;
                        if (node === state.selectedEl) {
                            row.classList.add('active');
                        }

                        const childToggle = document.createElement('span');
                        childToggle.className = `tree-toggle${children.length === 0 ? ' leaf' : ''}`;
                        childToggle.textContent = isCollapsed ? '▸' : '▾';
                        childToggle.addEventListener('click', (e) => {
                            e.stopPropagation();
                            if (collapsedNodes.has(node)) collapsedNodes.delete(node);
                            else collapsedNodes.add(node);
                            render();
                        });

                        const nodeTag = document.createElement('span');
                        nodeTag.className = 'tree-tag';
                        nodeTag.textContent = `<${getNodeDisplayTag(node)}>`;

                        const preview = document.createElement('span');
                        preview.className = 'tree-preview';
                        preview.textContent = getNodePreviewText(node);

                        row.appendChild(childToggle);
                        row.appendChild(nodeTag);
                        if (preview.textContent) row.appendChild(preview);

                        row.addEventListener('click', () => {
                            const ownerFrame = node.closest('.frame');
                            if (ownerFrame && ownerFrame !== state.activeFrameNode) {
                                state.activeFrameNode = ownerFrame;
                                document.querySelectorAll('.frame').forEach(f => {
                                    f.classList.toggle('active-frame-highlight', f === ownerFrame);
                                });
                            }
                            onSelectElement?.(node);
                        });

                        domTreeContainer.appendChild(row);

                        if (!isCollapsed && children.length > 0) {
                            children.forEach(child => renderBranch(child, depth + 1));
                        }
                    };

                    frameChildren.forEach(child => renderBranch(child, 1));
                }
            }
        });

        if (treeCountBadge) {
            treeCountBadge.textContent = String(totalElements);
        }
    }

    btnExpandAll?.addEventListener('click', () => {
        document.querySelectorAll('.frame, .frame *').forEach(node => collapsedNodes.delete(node));
        render();
    });

    btnCollapseAll?.addEventListener('click', () => {
        document.querySelectorAll('.frame, .frame *').forEach(node => {
            if (getTreeChildren(node).length > 0) collapsedNodes.add(node);
        });
        render();
    });

    return { render };
}
