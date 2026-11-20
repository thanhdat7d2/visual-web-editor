document.addEventListener("DOMContentLoaded", () => {
    // State
    const state = {
        currentTool: 'select',
        elements: [],
        selectedId: null,
        frameBgColor: '#ffffff',
        elementCounter: 0
    };

    // DOM Elements
    const wrapper = document.getElementById('canvas-wrapper');
    const container = document.getElementById('canvas-container');
    const activeFrame = document.getElementById('active-frame');
    const layersList = document.getElementById('layers-list');
    
    // Properties Panel DOM
    const propPanel = document.getElementById('properties-panel');
    const emptyPanel = document.getElementById('properties-empty');
    
    // Props inputs
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
    const inPlaceholder = document.getElementById('prop-placeholder');
    const inCustomCss = document.getElementById('prop-custom-css');

    const secText = document.getElementById('section-text');
    const secInput = document.getElementById('section-input');

    // Panzoom init (Canvas infinite panning)
    const panzoom = Panzoom(wrapper, {
        maxScale: 5,
        minScale: 0.1,
        // Start near center
        startScale: 1,
        startX: -2000,
        startY: -2200,
        excludeClass: 'frame' // MUST EXCLUDE FRAME TO STOP DRAG WRESTLING
    });
    
    // Zoom on wheel
    container.parentElement.addEventListener('wheel', panzoom.zoomWithWheel);
    
    // Moveable init (Drag, Resize, Rotate)
    const moveable = new Moveable(document.body, {
        target: null,
        draggable: true,
        resizable: true,
        rotatable: true,
        keepRatio: false,
        snappable: true,
        snapCenter: true,
        origin: false
    });

    let frameCounter = 1;
    let activeFrameNode = activeFrame;
    activeFrameNode.classList.add('frame'); // Ensure it has the class for panzoom exclude

    // Moveable events
    moveable.on("drag", ({ target, left, top }) => {
        target.style.left = `${left}px`;
        target.style.top = `${top}px`;
        updatePropsPanel();
    }).on("resize", ({ target, width, height, drag }) => {
        target.style.width = `${width}px`;
        target.style.height = `${height}px`;
        target.style.left = `${drag.left}px`;
        target.style.top = `${drag.top}px`;
        updatePropsPanel();
    }).on("rotate", ({ target, transform }) => {
        // preserve other transforms if needed, but we mostly just rotate
        target.style.transform = transform;
        updatePropsPanel();
    });

    moveable.on("dragEnd", updatePropsPanel);
    moveable.on("resizeEnd", updatePropsPanel);
    moveable.on("rotateEnd", updatePropsPanel);

    // --- Tools ---
    document.querySelectorAll('.tool-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.currentTool = btn.dataset.tool;
            
            if (state.currentTool === 'select') {
                panzoom.setOptions({ disablePan: false });
            } else {
                panzoom.setOptions({ disablePan: true });
            }
        });
    });

    // Handle clicking on Canvas to create element or deselect
    // We bind to wrapper so it works on any frame
    wrapper.addEventListener('pointerdown', (e) => {
        const target = e.target;
        
        // Find if they clicked in a frame
        const clickedFrame = target.closest('.frame');
        if (clickedFrame) {
            activeFrameNode = clickedFrame;
        }

        if (state.currentTool === 'select') {
            if (target === wrapper || target.classList.contains('frame')) {
                selectElement(null);
            } else if (target.classList.contains('ag-element')) {
                selectElement(target);
            }
            return;
        }

        if (!clickedFrame) return; // Only draw inside a frame!

        // Create new element based on tool inside activeFrameNode
        const rect = activeFrameNode.getBoundingClientRect();
        let scale = 1;
        try { scale = panzoom.getScale(); } catch(err){}
        const x = (e.clientX - rect.left) / scale;
        const y = (e.clientY - rect.top) / scale;

        createNewElement(state.currentTool, x, y);
        // Switch back to select
        document.querySelector('.tool-btn[data-tool="select"]').click();
    });

    // Handle New Frame creation
    document.getElementById('btn-add-frame').addEventListener('click', () => {
        frameCounter++;
        const newFrame = document.createElement('div');
        newFrame.className = 'frame';
        newFrame.id = `frame-${frameCounter}`;
        newFrame.dataset.id = newFrame.id;
        
        // Position relative to center
        newFrame.style.left = `calc(50vw + ${100 + (frameCounter-1) * 850}px)`; 
        newFrame.style.top = `50vh`;
        
        wrapper.appendChild(newFrame);
        activeFrameNode = newFrame;
        
        const li = document.createElement('li');
        li.className = 'layer-item';
        li.innerText = `Frame ${frameCounter}`;
        li.onclick = () => { activeFrameNode = newFrame; selectElement(null); };
        document.getElementById('frames-list').appendChild(li);
        
        // Move view slightly to the new frame
        try {
           const info = panzoom.getPan();
           panzoom.pan(info.x - 850, info.y);
        } catch(e){}
    });

    function createNewElement(type, x, y) {
        state.elementCounter++;
        const id = `el-${state.elementCounter}`;
        
        let el = null;
        let defaultW = 100;
        let defaultH = 100;

        switch(type) {
            case 'rect':
                el = document.createElement('div');
                el.style.backgroundColor = '#cccccc';
                break;
            case 'circle':
                el = document.createElement('div');
                el.style.backgroundColor = '#cccccc';
                el.style.borderRadius = '50%';
                break;
            case 'text':
                el = document.createElement('div');
                el.innerText = 'New Text';
                el.style.color = '#000000';
                el.style.fontFamily = 'Inter';
                defaultW = 'auto';
                defaultH = 'auto';
                break;
            case 'button':
                el = document.createElement('button');
                el.innerText = 'Button';
                el.style.backgroundColor = '#0A84FF';
                el.style.color = 'white';
                el.style.border = 'none';
                el.style.borderRadius = '6px';
                el.style.padding = '8px 16px';
                el.style.cursor = 'pointer';
                defaultW = 120;
                defaultH = 40;
                break;
            case 'input':
                el = document.createElement('input');
                el.type = 'text';
                el.placeholder = 'Type here...';
                el.style.border = '1px solid #ccc';
                el.style.borderRadius = '4px';
                el.style.padding = '4px 8px';
                defaultW = 150;
                defaultH = 32;
                break;
        }

        if(!el) return;

        el.id = id;
        el.className = 'ag-element';
        el.dataset.type = type;
        
        el.style.position = 'absolute';
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
        
        if (defaultW !== 'auto') el.style.width = `${defaultW}px`;
        if (defaultH !== 'auto') el.style.height = `${defaultH}px`;
        
        // Disable pointer events on children if any, so drag works on parent
        el.style.userSelect = 'none';

        activeFrameNode.appendChild(el);
        state.elements.push(el);
        updateLayersList();
        selectElement(el);
    }

    function selectElement(el) {
        if (!el) {
            state.selectedId = null;
            moveable.target = null;
            emptyPanel.style.display = 'block';
            propPanel.style.display = 'none';
            document.querySelectorAll('.layer-item').forEach(li => li.classList.remove('active'));
            return;
        }

        state.selectedId = el.id;
        moveable.target = el;
        
        // Show properties
        emptyPanel.style.display = 'none';
        propPanel.style.display = 'block';
        
        // Highlight in layers list
        document.querySelectorAll('.layer-item').forEach(li => {
            li.classList.toggle('active', li.dataset.id === el.id);
        });

        // Setup Panel UI context
        secText.style.display = (el.dataset.type === 'text' || el.dataset.type === 'button') ? 'block' : 'none';
        secInput.style.display = el.dataset.type === 'input' ? 'block' : 'none';

        updatePropsPanel();
    }

    function updateLayersList() {
        layersList.innerHTML = '';
        state.elements.forEach(el => {
            const li = document.createElement('li');
            li.className = 'layer-item';
            li.dataset.id = el.id;
            if(el.id === state.selectedId) li.classList.add('active');
            
            li.innerHTML = `
                <i class="icon-${el.dataset.type}"></i>
                <span>${el.dataset.type} ${el.id.replace('el-','')}</span>
            `;
            li.onclick = () => selectElement(el);
            layersList.appendChild(li);
        });
    }

    // --- Properties Panel Sync ---
    
    // Read from DOM to Input
    function updatePropsPanel() {
        const el = moveable.target;
        if(!el) return;

        const comp = window.getComputedStyle(el);
        
        inX.value = parseFloat(el.style.left || comp.left) || 0;
        inY.value = parseFloat(el.style.top || comp.top) || 0;
        inW.value = parseFloat(el.style.width || comp.width) || 0;
        inH.value = parseFloat(el.style.height || comp.height) || 0;
        
        // Extract basic rotation from matrix if present
        let rot = 0;
        if(el.style.transform && el.style.transform.includes('rotate')) {
            const match = el.style.transform.match(/rotate\(([^d]+)deg\)/);
            if(match) rot = parseFloat(match[1]);
        }
        inRot.value = rot;

        // Colors
        let bgHex = rgb2hex(comp.backgroundColor);
        if(bgHex === 'transparent') bgHex = '#000000'; // Default picker color
        inBg.value = bgHex;
        inBgText.value = bgHex;
        
        let textHex = rgb2hex(comp.color);
        inTextColor.value = textHex;
        inTextColorText.value = textHex;

        inRad.value = parseFloat(comp.borderRadius) || 0;
        inOp.value = Math.round((parseFloat(comp.opacity) || 1) * 100);

        inFontFam.value = comp.fontFamily.replace(/['"]/g, '').split(',')[0];
        inFontSize.value = parseFloat(comp.fontSize) || 16;
        inFontWeight.value = comp.fontWeight || 400;

        if (el.dataset.type === 'text' || el.dataset.type === 'button') {
            inInnerText.value = el.innerText || '';
        }
        if (el.dataset.type === 'input') {
            inPlaceholder.value = el.placeholder || '';
        }
        inCustomCss.value = el.dataset.customCss || '';
    }

    // Write from Input to DOM
    const handleInput = (input, updateFn) => {
        input.addEventListener('input', (e) => {
            const el = moveable.target;
            if(!el) return;
            updateFn(el, e.target.value);
            moveable.updateRect();
        });
    };

    handleInput(inX, (el, v) => el.style.left = `${v}px`);
    handleInput(inY, (el, v) => el.style.top = `${v}px`);
    handleInput(inW, (el, v) => el.style.width = `${v}px`);
    handleInput(inH, (el, v) => el.style.height = `${v}px`);
    handleInput(inRot, (el, v) => el.style.transform = `rotate(${v}deg)`);
    
    // Background color
    const updateBg = (el, v) => {
        el.style.backgroundColor = v;
        inBg.value = v;
        inBgText.value = v;
    };
    handleInput(inBg, updateBg);
    handleInput(inBgText, updateBg);

    // Text color
    const updateTextCol = (el, v) => {
        el.style.color = v;
        inTextColor.value = v;
        inTextColorText.value = v;
    };
    handleInput(inTextColor, updateTextCol);
    handleInput(inTextColorText, updateTextCol);

    handleInput(inRad, (el, v) => el.style.borderRadius = `${v}px`);
    handleInput(inOp, (el, v) => el.style.opacity = (v / 100).toString());
    
    handleInput(inFontFam, (el, v) => el.style.fontFamily = v);
    handleInput(inFontSize, (el, v) => el.style.fontSize = `${v}px`);
    handleInput(inFontWeight, (el, v) => el.style.fontWeight = v);
    
    handleInput(inInnerText, (el, v) => el.innerText = v);
    handleInput(inPlaceholder, (el, v) => el.placeholder = v);

    // Custom CSS Processing
    handleInput(inCustomCss, (el, v) => {
        el.dataset.customCss = v;
        // Apply inline immediately via generic hack, but better to save for export
        // For editor view, we inject a quick style block
        let styleTag = document.getElementById(`style-${el.id}`);
        if(!styleTag) {
            styleTag = document.createElement('style');
            styleTag.id = `style-${el.id}`;
            document.head.appendChild(styleTag);
        }
        styleTag.innerHTML = `#${el.id} { ${v} }`;
    });

    // --- Actions ---
    document.getElementById('btn-delete-el').addEventListener('click', () => {
        const el = moveable.target;
        if(!el) return;
        
        el.remove();
        state.elements = state.elements.filter(e => e.id !== el.id);
        const styleTag = document.getElementById(`style-${el.id}`);
        if(styleTag) styleTag.remove();
        
        selectElement(null);
        updateLayersList();
    });

    document.getElementById('btn-duplicate-el').addEventListener('click', () => {
        const el = moveable.target;
        if(!el) return;
        
        const clone = el.cloneNode(true);
        state.elementCounter++;
        clone.id = `el-${state.elementCounter}`;
        // offset a bit
        clone.style.left = `${parseFloat(clone.style.left || 0) + 20}px`;
        clone.style.top = `${parseFloat(clone.style.top || 0) + 20}px`;
        
        activeFrameNode.appendChild(clone);
        state.elements.push(clone);
        
        // clone custom css if any
        if (clone.dataset.customCss) {
             const styleTag = document.createElement('style');
             styleTag.id = `style-${clone.id}`;
             styleTag.innerHTML = `#${clone.id} { ${clone.dataset.customCss} }`;
             document.head.appendChild(styleTag);
        }

        updateLayersList();
        selectElement(clone);
    });

    // --- Save & Export ---
    document.getElementById('btn-save').addEventListener('click', async () => {
        // Deselect so moveable handles disappear from clone
        selectElement(null);
        
        // Grab custom CSS for all elements
        let globalCSS = `
            body { 
                font-family: 'Inter', sans-serif;
            }
        `;
        
        state.elements.forEach(el => {
            if(el.dataset.customCss) {
                globalCSS += `\n#${el.id} { ${el.dataset.customCss} }`;
            }
        });

        // Clean up DOM for export - Handle multiple frames
        const framesData = [];
        document.querySelectorAll('.frame').forEach((frameNode, i) => {
            const clone = frameNode.cloneNode(true);
            clone.querySelectorAll('.ag-element').forEach(cel => {
                cel.classList.remove('ag-element');
                delete cel.dataset.type;
                delete cel.dataset.customCss;
            });
            framesData.push({
                name: frameNode.id || `page-${i}`,
                backgroundColor: state.frameBgColor,
                html: clone.innerHTML
            });
        });

        const payload = {
            globalCSS: globalCSS,
            frames: framesData
        };

        try {
            const resp = await fetch('/api/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            
            if(resp.ok) {
                alert('Project exported successfully to /exports folder!');
            } else {
                alert('Failed to export.');
            }
        } catch(e) {
            console.error(e);
            alert('Error exporting project.');
        }
    });

    // Utility
    function rgb2hex(rgb) {
        if(!rgb) return '#000000';
        if(rgb.startsWith('#')) return rgb;
        const result = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/i.exec(rgb) || /^rgba\((\d+),\s*(\d+),\s*(\d+)/i.exec(rgb);
        return result ? "#" + 
            ("0" + parseInt(result[1], 10).toString(16)).slice(-2) +
            ("0" + parseInt(result[2], 10).toString(16)).slice(-2) +
            ("0" + parseInt(result[3], 10).toString(16)).slice(-2) : rgb;
    }
    
    // Initial Setup
    document.querySelector('.tool-btn[data-tool="select"]').click();
});
