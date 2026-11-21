// Smooth Camera Controller (Space + Drag Panning & Cursor-Centered Wheel Zoom)

import { clamp, isTypingInField } from '../core/utils.js';

const MIN_SCALE = 0.1;
const MAX_SCALE = 5;

export function createCamera({ container, wrapper, moveable, btnZoomIn, btnZoomOut, btnZoomReset, getActiveFrame, onEscape, onSelectTool }) {
    const cam = {
        x: 0,
        y: 0,
        scale: 1,
        targetX: 0,
        targetY: 0,
        targetScale: 1,
        rafId: null,
        lastTime: 0
    };

    let isSpaceDown = false;
    let isPanning = false;
    let panPointerId = null;
    let lastPanClientX = 0;
    let lastPanClientY = 0;

    function applyTransform() {
        wrapper.style.transform = `translate3d(${cam.x}px, ${cam.y}px, 0) scale(${cam.scale})`;

        const gridSize = 20 * cam.scale;
        container.style.backgroundSize = `${gridSize}px ${gridSize}px`;
        container.style.backgroundPosition = `${cam.x}px ${cam.y}px`;

        moveable.zoom = 1 / cam.scale;
        if (moveable.target) {
            moveable.updateRect();
        }

        if (btnZoomReset) {
            btnZoomReset.textContent = `${Math.round(cam.scale * 100)}%`;
        }
    }

    function step(now) {
        const dt = cam.lastTime ? Math.min((now - cam.lastTime) / 1000, 0.05) : 0.016;
        cam.lastTime = now;

        const alpha = 1 - Math.exp(-18 * dt);
        cam.x += (cam.targetX - cam.x) * alpha;
        cam.y += (cam.targetY - cam.y) * alpha;
        cam.scale += (cam.targetScale - cam.scale) * alpha;

        const done =
            Math.abs(cam.targetX - cam.x) < 0.05 &&
            Math.abs(cam.targetY - cam.y) < 0.05 &&
            Math.abs(cam.targetScale - cam.scale) < 0.0005;

        if (done) {
            cam.x = cam.targetX;
            cam.y = cam.targetY;
            cam.scale = cam.targetScale;
            applyTransform();
            cam.rafId = null;
            cam.lastTime = 0;
            return;
        }

        applyTransform();
        cam.rafId = requestAnimationFrame(step);
    }

    function startLoop() {
        if (!cam.rafId) {
            cam.lastTime = 0;
            cam.rafId = requestAnimationFrame(step);
        }
    }

    function centerOnFrame(frameNode, immediate = false) {
        if (!frameNode) return;
        const vw = container.clientWidth || 1000;
        const vh = container.clientHeight || 700;
        const fw = frameNode.offsetWidth || 800;
        const fh = frameNode.offsetHeight || 600;
        const fx = frameNode.offsetLeft;
        const fy = frameNode.offsetTop;

        const targetScale = 1;
        const targetX = (vw - fw * targetScale) / 2 - fx * targetScale;
        const targetY = (vh - fh * targetScale) / 2 - fy * targetScale;

        cam.targetScale = targetScale;
        cam.targetX = targetX;
        cam.targetY = targetY;

        if (immediate) {
            cam.scale = targetScale;
            cam.x = targetX;
            cam.y = targetY;
            applyTransform();
        } else {
            startLoop();
        }
    }

    function zoomAroundPoint(nextScale, screenX, screenY) {
        const clamped = clamp(nextScale, MIN_SCALE, MAX_SCALE);
        const worldX = (screenX - cam.targetX) / cam.targetScale;
        const worldY = (screenY - cam.targetY) / cam.targetScale;

        cam.targetScale = clamped;
        cam.targetX = screenX - worldX * clamped;
        cam.targetY = screenY - worldY * clamped;
        startLoop();
    }

    function endPanning() {
        if (!isPanning) return;
        isPanning = false;
        container.classList.remove('is-panning');
        if (panPointerId !== null) {
            try { container.releasePointerCapture(panPointerId); } catch {}
            panPointerId = null;
        }
    }

    function setSpacePanMode(active) {
        isSpaceDown = active;
        container.classList.toggle('space-panning', active);
        if (!active && isPanning) {
            endPanning();
        }
    }

    // Smooth wheel zoom toward cursor
    container.addEventListener('wheel', (e) => {
        e.preventDefault();
        const rect = container.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        let delta = e.deltaY;
        if (e.deltaMode === 1) delta *= 32;
        else if (e.deltaMode === 2) delta *= 400;

        const intensity = e.ctrlKey ? 0.008 : 0.0014;
        const factor = Math.exp(-delta * intensity);
        zoomAroundPoint(cam.targetScale * factor, mouseX, mouseY);
    }, { passive: false });

    // HUD buttons
    btnZoomIn?.addEventListener('click', () => {
        zoomAroundPoint(cam.targetScale * 1.25, container.clientWidth / 2, container.clientHeight / 2);
    });
    btnZoomOut?.addEventListener('click', () => {
        zoomAroundPoint(cam.targetScale / 1.25, container.clientWidth / 2, container.clientHeight / 2);
    });
    btnZoomReset?.addEventListener('click', () => {
        centerOnFrame(getActiveFrame(), false);
    });

    // Keyboard shortcuts + Space hold for pan
    window.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && !isTypingInField()) {
            e.preventDefault();
            if (!isSpaceDown) setSpacePanMode(true);
            return;
        }
        if (e.key === 'Escape') {
            onEscape?.();
        } else if (!isTypingInField() && (e.key === 'v' || e.key === 'V')) {
            onSelectTool?.();
        }
    });

    window.addEventListener('keyup', (e) => {
        if (e.code === 'Space') setSpacePanMode(false);
    });

    window.addEventListener('blur', () => {
        setSpacePanMode(false);
    });

    // Pointer panning (strictly only while Space is held)
    container.addEventListener('pointerdown', (e) => {
        if (!isSpaceDown || e.button !== 0) return;
        e.preventDefault();
        e.stopPropagation();
        isPanning = true;
        panPointerId = e.pointerId;
        lastPanClientX = e.clientX;
        lastPanClientY = e.clientY;
        container.classList.add('is-panning');
        try { container.setPointerCapture(e.pointerId); } catch {}
    });

    container.addEventListener('pointermove', (e) => {
        if (!isPanning) return;
        const dx = e.clientX - lastPanClientX;
        const dy = e.clientY - lastPanClientY;
        lastPanClientX = e.clientX;
        lastPanClientY = e.clientY;

        cam.targetX += dx;
        cam.targetY += dy;
        startLoop();
    });

    container.addEventListener('pointerup', endPanning);
    container.addEventListener('pointercancel', endPanning);

    return {
        getScale: () => cam.scale,
        isSpacePanning: () => isSpaceDown,
        centerOnFrame,
        zoomAroundPoint
    };
}
