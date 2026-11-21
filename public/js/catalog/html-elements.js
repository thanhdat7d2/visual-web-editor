// Strict allowlist of HTML elements supported by the Visual Web Editor.
// Only elements defined in this catalog can be added to the canvas.

export const HTML_ELEMENT_CATALOG = [
    // =========================================================================
    // ROOT (12)
    // =========================================================================
    {
        tag: 'html',
        category: 'Root',
        subCategory: null,
        description: 'phần tử root',
        renderMode: 'meta',
        headElement: false,
        void: false,
        defaultAttrs: { lang: 'en' }
    },
    {
        tag: 'head',
        category: 'Root',
        subCategory: null,
        description: 'Contains machine-readable information (metadata) about the document, like its title, scripts, and style sheets.',
        renderMode: 'meta',
        headElement: false,
        void: false
    },
    {
        tag: 'body',
        category: 'Root',
        subCategory: null,
        description: 'Represents the content of an HTML document. There can be only one such element in a document. Sectioning root',
        renderMode: 'meta',
        headElement: false,
        void: false
    },
    {
        tag: 'base',
        category: 'Root',
        subCategory: null,
        description: 'Specifies the base URL to use for all relative URLs in a document. There can be only one such element in a document.',
        renderMode: 'meta',
        headElement: true,
        void: true,
        defaultAttrs: { href: '/' }
    },
    {
        tag: 'link',
        category: 'Root',
        subCategory: null,
        description: 'Specifies relationships between the current document and an external resource (e.g., CSS stylesheets or site icons).',
        renderMode: 'meta',
        headElement: true,
        void: true,
        defaultAttrs: { rel: 'stylesheet', href: 'styles.css' }
    },
    {
        tag: 'meta',
        category: 'Root',
        subCategory: null,
        description: 'Represents metadata that cannot be represented by other HTML meta-related elements. For SEO.',
        renderMode: 'meta',
        headElement: true,
        void: true,
        defaultAttrs: { name: 'description', content: 'Page description' }
    },
    {
        tag: 'style',
        category: 'Root',
        subCategory: null,
        description: 'Contains CSS.',
        renderMode: 'meta',
        headElement: true,
        void: false,
        defaultText: '/* Custom styles */'
    },
    {
        tag: 'noscript',
        category: 'Root',
        subCategory: null,
        description: 'Defines a section of HTML to be inserted if a script type on the page is unsupported or if scripting is turned off.',
        renderMode: 'meta',
        headElement: false,
        void: false,
        defaultText: 'JavaScript is disabled in your browser.'
    },
    {
        tag: 'script',
        category: 'Root',
        subCategory: null,
        description: 'Used to embed executable code or data, typically JavaScript, GLSL shaders, or JSON.',
        renderMode: 'meta',
        headElement: true,
        void: false,
        defaultText: '// Script code'
    },
    {
        tag: 'title',
        category: 'Root',
        subCategory: null,
        description: "Browser tab's name - text only.",
        renderMode: 'meta',
        headElement: true,
        void: false,
        defaultText: 'Document Title'
    },
    {
        tag: 'slot',
        category: 'Root',
        subCategory: null,
        description: 'Placeholder inside a web component that you can fill with your own markup.',
        renderMode: 'meta',
        headElement: false,
        void: false,
        defaultAttrs: { name: 'default' },
        defaultText: 'Slot content'
    },
    {
        tag: 'template',
        category: 'Root',
        subCategory: null,
        description: 'Holds HTML that is not rendered immediately when a page is loaded but may be instantiated during runtime via JavaScript.',
        renderMode: 'meta',
        headElement: false,
        void: false,
        defaultText: 'Template content'
    },

    // =========================================================================
    // SECTIONING (17)
    // =========================================================================
    {
        tag: 'address',
        category: 'Sectioning',
        subCategory: null,
        description: 'Indicates that the enclosed HTML provides contact information for a person, people, or an organization.',
        renderMode: 'real',
        void: false,
        defaultText: 'Contact: hello@example.com',
        defaultSize: { width: 220, height: 'auto' },
        defaultStyle: { color: '#111111', padding: '8px' }
    },
    {
        tag: 'article',
        category: 'Sectioning',
        subCategory: null,
        description: 'Represents a self-contained composition intended to be independently distributable or reusable.',
        renderMode: 'real',
        void: false,
        defaultText: 'Article',
        defaultSize: { width: 280, height: 160 },
        defaultStyle: { backgroundColor: '#f8f9fa', border: '1px solid #dee2e6', borderRadius: '6px', padding: '12px', color: '#111111' }
    },
    {
        tag: 'aside',
        category: 'Sectioning',
        subCategory: null,
        description: "Represents a portion of a document whose content is only indirectly related to the document's main content.",
        renderMode: 'real',
        void: false,
        defaultText: 'Aside',
        defaultSize: { width: 200, height: 220 },
        defaultStyle: { backgroundColor: '#f1f3f5', border: '1px dashed #adb5bd', padding: '12px', color: '#111111' }
    },
    {
        tag: 'footer',
        category: 'Sectioning',
        subCategory: null,
        description: 'Represents a footer for its nearest ancestor sectioning content or sectioning root element.',
        renderMode: 'real',
        void: false,
        defaultText: 'Footer',
        defaultSize: { width: 600, height: 80 },
        defaultStyle: { backgroundColor: '#e9ecef', padding: '16px', color: '#333333' }
    },
    {
        tag: 'header',
        category: 'Sectioning',
        subCategory: null,
        description: 'Represents introductory content, typically a group of introductory or navigational aids.',
        renderMode: 'real',
        void: false,
        defaultText: 'Header',
        defaultSize: { width: 600, height: 80 },
        defaultStyle: { backgroundColor: '#e9ecef', padding: '16px', color: '#111111' }
    },
    {
        tag: 'h1',
        category: 'Sectioning',
        subCategory: null,
        description: 'Level 1 section heading (highest section level).',
        renderMode: 'real',
        void: false,
        defaultText: 'Heading 1',
        defaultSize: { width: 'auto', height: 'auto' },
        defaultStyle: { color: '#111111', fontSize: '32px', fontWeight: '700' }
    },
    {
        tag: 'h2',
        category: 'Sectioning',
        subCategory: null,
        description: 'Level 2 section heading.',
        renderMode: 'real',
        void: false,
        defaultText: 'Heading 2',
        defaultSize: { width: 'auto', height: 'auto' },
        defaultStyle: { color: '#111111', fontSize: '24px', fontWeight: '700' }
    },
    {
        tag: 'h3',
        category: 'Sectioning',
        subCategory: null,
        description: 'Level 3 section heading.',
        renderMode: 'real',
        void: false,
        defaultText: 'Heading 3',
        defaultSize: { width: 'auto', height: 'auto' },
        defaultStyle: { color: '#111111', fontSize: '20px', fontWeight: '600' }
    },
    {
        tag: 'h4',
        category: 'Sectioning',
        subCategory: null,
        description: 'Level 4 section heading.',
        renderMode: 'real',
        void: false,
        defaultText: 'Heading 4',
        defaultSize: { width: 'auto', height: 'auto' },
        defaultStyle: { color: '#111111', fontSize: '18px', fontWeight: '600' }
    },
    {
        tag: 'h5',
        category: 'Sectioning',
        subCategory: null,
        description: 'Level 5 section heading.',
        renderMode: 'real',
        void: false,
        defaultText: 'Heading 5',
        defaultSize: { width: 'auto', height: 'auto' },
        defaultStyle: { color: '#111111', fontSize: '16px', fontWeight: '600' }
    },
    {
        tag: 'h6',
        category: 'Sectioning',
        subCategory: null,
        description: 'Level 6 section heading (lowest section level).',
        renderMode: 'real',
        void: false,
        defaultText: 'Heading 6',
        defaultSize: { width: 'auto', height: 'auto' },
        defaultStyle: { color: '#111111', fontSize: '14px', fontWeight: '600' }
    },
    {
        tag: 'hgroup',
        category: 'Sectioning',
        subCategory: null,
        description: 'Represents a heading grouped with secondary content such as subheadings or a tagline.',
        renderMode: 'real',
        void: false,
        defaultText: 'Heading Group',
        defaultSize: { width: 260, height: 'auto' },
        defaultStyle: { color: '#111111', padding: '8px', border: '1px dashed #ced4da' }
    },
    {
        tag: 'main',
        category: 'Sectioning',
        subCategory: null,
        description: 'Represents the dominant content of the body of a document.',
        renderMode: 'real',
        void: false,
        defaultText: 'Main Content',
        defaultSize: { width: 500, height: 300 },
        defaultStyle: { backgroundColor: '#f8f9fa', border: '1px dashed #adb5bd', padding: '16px', color: '#111111' }
    },
    {
        tag: 'nav',
        category: 'Sectioning',
        subCategory: null,
        description: 'Represents a section of a page whose purpose is to provide navigation links.',
        renderMode: 'real',
        void: false,
        defaultText: 'Navigation',
        defaultSize: { width: 400, height: 48 },
        defaultStyle: { backgroundColor: '#f1f3f5', border: '1px solid #dee2e6', padding: '12px', color: '#111111' }
    },
    {
        tag: 'section',
        category: 'Sectioning',
        subCategory: null,
        description: 'Represents a generic standalone section of a document.',
        renderMode: 'real',
        void: false,
        defaultText: 'Section',
        defaultSize: { width: 320, height: 180 },
        defaultStyle: { backgroundColor: '#f8f9fa', border: '1px solid #dee2e6', padding: '16px', color: '#111111' }
    },
    {
        tag: 'search',
        category: 'Sectioning',
        subCategory: null,
        description: 'Represents a part that contains form controls or other content related to performing a search or filtering operation.',
        renderMode: 'real',
        void: false,
        defaultText: 'Search Area',
        defaultSize: { width: 280, height: 56 },
        defaultStyle: { backgroundColor: '#f8f9fa', border: '1px solid #ced4da', borderRadius: '6px', padding: '12px', color: '#111111' }
    },
    {
        tag: 'div',
        category: 'Sectioning',
        subCategory: null,
        description: 'The generic container for flow content.',
        renderMode: 'real',
        void: false,
        defaultText: '',
        defaultSize: { width: 160, height: 120 },
        defaultStyle: { backgroundColor: '#e2e8f0', border: '1px solid #cbd5e1' }
    },

    // =========================================================================
    // ELEMENTS - Definition List (3)
    // =========================================================================
    {
        tag: 'dd',
        category: 'Elements',
        subCategory: 'Definition List',
        description: 'Provides the description, definition, or value for the preceding term (<dt>) in a description list (<dl>).',
        renderMode: 'real',
        void: false,
        defaultText: 'Definition description',
        defaultSize: { width: 200, height: 'auto' },
        defaultStyle: { color: '#333333', padding: '4px 8px' }
    },
    {
        tag: 'dl',
        category: 'Elements',
        subCategory: 'Definition List',
        description: 'Represents a description list enclosing groups of terms (<dt>) and descriptions (<dd>).',
        renderMode: 'real',
        void: false,
        defaultHTML: '<dt>Term</dt><dd>Description</dd>',
        defaultSize: { width: 220, height: 'auto' },
        defaultStyle: { color: '#111111', padding: '8px', border: '1px dashed #ced4da' }
    },
    {
        tag: 'dt',
        category: 'Elements',
        subCategory: 'Definition List',
        description: 'Specifies a term in a description or definition list (<dl>).',
        renderMode: 'real',
        void: false,
        defaultText: 'Definition Term',
        defaultSize: { width: 160, height: 'auto' },
        defaultStyle: { color: '#111111', fontWeight: '600', padding: '4px 8px' }
    },

    // =========================================================================
    // ELEMENTS - Figure (2)
    // =========================================================================
    {
        tag: 'figcaption',
        category: 'Elements',
        subCategory: 'Figure',
        description: 'Represents a caption or legend describing the rest of the contents of its parent <figure> element.',
        renderMode: 'real',
        void: false,
        defaultText: 'Figure caption',
        defaultSize: { width: 200, height: 'auto' },
        defaultStyle: { color: '#555555', fontSize: '13px', fontStyle: 'italic' }
    },
    {
        tag: 'figure',
        category: 'Elements',
        subCategory: 'Figure',
        description: 'Represents self-contained content, potentially with an optional <figcaption>.',
        renderMode: 'real',
        void: false,
        defaultText: 'Figure',
        defaultSize: { width: 240, height: 160 },
        defaultStyle: { backgroundColor: '#f8f9fa', border: '1px solid #dee2e6', padding: '12px', color: '#111111' }
    },

    // =========================================================================
    // ELEMENTS - Text (4)
    // =========================================================================
    {
        tag: 'hr',
        category: 'Elements',
        subCategory: 'Text',
        description: 'Represents a thematic break between paragraph-level elements.',
        renderMode: 'real',
        void: true,
        defaultSize: { width: 240, height: 2 },
        defaultStyle: { border: 'none', backgroundColor: '#adb5bd' }
    },
    {
        tag: 'p',
        category: 'Elements',
        subCategory: 'Text',
        description: 'Represents a paragraph.',
        renderMode: 'real',
        void: false,
        defaultText: 'Paragraph text goes here.',
        defaultSize: { width: 240, height: 'auto' },
        defaultStyle: { color: '#111111', fontSize: '15px', lineHeight: '1.5' }
    },
    {
        tag: 'blockquote',
        category: 'Elements',
        subCategory: 'Text',
        description: 'Indicates that the enclosed text is an extended quotation.',
        renderMode: 'real',
        void: false,
        defaultText: '“This is a blockquote.”',
        defaultSize: { width: 280, height: 'auto' },
        defaultStyle: { color: '#333333', borderLeft: '4px solid #0A84FF', paddingLeft: '12px', fontStyle: 'italic' }
    },
    {
        tag: 'pre',
        category: 'Elements',
        subCategory: 'Text',
        description: 'Represents preformatted text presented exactly as written in a monospaced font.',
        renderMode: 'real',
        void: false,
        defaultText: 'const hello = "world";\nconsole.log(hello);',
        defaultSize: { width: 260, height: 'auto' },
        defaultStyle: { color: '#111111', backgroundColor: '#f1f3f5', padding: '10px', borderRadius: '4px', fontFamily: 'Courier New', fontSize: '13px' }
    },

    // =========================================================================
    // ELEMENTS - List (4)
    // =========================================================================
    {
        tag: 'menu',
        category: 'Elements',
        subCategory: 'List',
        description: 'A semantic alternative to <ul> representing an unordered list of items.',
        renderMode: 'real',
        void: false,
        defaultHTML: '<li>Menu item 1</li><li>Menu item 2</li>',
        defaultSize: { width: 180, height: 'auto' },
        defaultStyle: { color: '#111111', paddingLeft: '20px' }
    },
    {
        tag: 'ol',
        category: 'Elements',
        subCategory: 'List',
        description: 'Represents an ordered list of items — typically rendered as a numbered list.',
        renderMode: 'real',
        void: false,
        defaultHTML: '<li>First item</li><li>Second item</li>',
        defaultSize: { width: 180, height: 'auto' },
        defaultStyle: { color: '#111111', paddingLeft: '22px' }
    },
    {
        tag: 'ul',
        category: 'Elements',
        subCategory: 'List',
        description: 'Represents an unordered list of items, typically rendered as a bulleted list.',
        renderMode: 'real',
        void: false,
        defaultHTML: '<li>List item 1</li><li>List item 2</li>',
        defaultSize: { width: 180, height: 'auto' },
        defaultStyle: { color: '#111111', paddingLeft: '22px' }
    },
    {
        tag: 'li',
        category: 'Elements',
        subCategory: 'List',
        description: 'Represents an item in a list (<ol>, <ul>, or <menu>).',
        renderMode: 'real',
        void: false,
        defaultText: 'List item',
        defaultSize: { width: 140, height: 'auto' },
        defaultStyle: { color: '#111111', listStylePosition: 'inside' }
    },

    // =========================================================================
    // ELEMENTS - Image (3)
    // =========================================================================
    {
        tag: 'img',
        category: 'Elements',
        subCategory: 'Image',
        description: 'Embeds an image into the document.',
        renderMode: 'real',
        void: true,
        defaultAttrs: {
            src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='140' viewBox='0 0 200 140'%3E%3Crect width='200' height='140' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%2364748b' font-family='sans-serif' font-size='14'%3EImage%3C/text%3E%3C/svg%3E",
            alt: 'Placeholder image'
        },
        defaultSize: { width: 200, height: 140 },
        defaultStyle: { objectFit: 'cover', display: 'block' }
    },
    {
        tag: 'map',
        category: 'Elements',
        subCategory: 'Image',
        description: 'Used with <area> elements to define an image map (a clickable link area).',
        renderMode: 'meta',
        headElement: false,
        void: false,
        defaultAttrs: { name: 'image-map' }
    },
    {
        tag: 'area',
        category: 'Elements',
        subCategory: 'Image',
        description: 'Defines a clickable geometric area inside an image map.',
        renderMode: 'meta',
        headElement: false,
        void: true,
        defaultAttrs: { shape: 'rect', coords: '0,0,100,100', href: '#', alt: 'Area' }
    },

    // =========================================================================
    // ELEMENTS - Audio & Video (3)
    // =========================================================================
    {
        tag: 'video',
        category: 'Elements',
        subCategory: 'Audio & Video',
        description: 'Embeds a media player which supports video playback into the document.',
        renderMode: 'real',
        void: false,
        defaultAttrs: { controls: '' },
        defaultSize: { width: 320, height: 180 },
        defaultStyle: { backgroundColor: '#111111' }
    },
    {
        tag: 'audio',
        category: 'Elements',
        subCategory: 'Audio & Video',
        description: 'Used to embed sound content in documents.',
        renderMode: 'real',
        void: false,
        defaultAttrs: { controls: '' },
        defaultSize: { width: 300, height: 54 }
    },
    {
        tag: 'track',
        category: 'Elements',
        subCategory: 'Audio & Video',
        description: 'Used as a child of <audio> or <video> to specify timed text tracks (e.g., subtitles).',
        renderMode: 'meta',
        headElement: false,
        void: true,
        defaultAttrs: { kind: 'subtitles', src: 'subtitles.vtt', srclang: 'en', label: 'English' }
    },

    // =========================================================================
    // ELEMENTS - Embedded Content (5)
    // =========================================================================
    {
        tag: 'embed',
        category: 'Elements',
        subCategory: 'Embedded Content',
        description: 'Embeds external content handled by the browser or an external application.',
        renderMode: 'real',
        void: true,
        defaultAttrs: { type: 'text/html', src: '' },
        defaultSize: { width: 240, height: 160 },
        defaultStyle: { backgroundColor: '#f1f3f5', border: '1px dashed #adb5bd' }
    },
    {
        tag: 'iframe',
        category: 'Elements',
        subCategory: 'Embedded Content',
        description: 'Represents a nested browsing context, embedding another document into the current one.',
        renderMode: 'real',
        void: false,
        defaultAttrs: { src: 'about:blank', title: 'Embedded Frame' },
        defaultSize: { width: 320, height: 200 },
        defaultStyle: { border: '1px solid #ced4da', backgroundColor: '#ffffff' }
    },
    {
        tag: 'object',
        category: 'Elements',
        subCategory: 'Embedded Content',
        description: 'Represents an external resource such as an image, nested browsing context, or plugin resource.',
        renderMode: 'real',
        void: false,
        defaultAttrs: { data: '', type: 'text/html' },
        defaultSize: { width: 240, height: 160 },
        defaultStyle: { backgroundColor: '#f1f3f5', border: '1px dashed #adb5bd' }
    },
    {
        tag: 'picture',
        category: 'Elements',
        subCategory: 'Embedded Content',
        description: 'Contains zero or more <source> elements and one <img> element for responsive images.',
        renderMode: 'real',
        void: false,
        defaultText: 'Picture',
        defaultSize: { width: 200, height: 140 },
        defaultStyle: { display: 'block', backgroundColor: '#e2e8f0', border: '1px dashed #94a3b8', padding: '8px', color: '#334155' }
    },
    {
        tag: 'source',
        category: 'Elements',
        subCategory: 'Embedded Content',
        description: 'Specifies multiple media resources for <picture>, <audio>, or <video>.',
        renderMode: 'meta',
        headElement: false,
        void: true,
        defaultAttrs: { src: '', type: 'video/mp4' }
    },

    // =========================================================================
    // ELEMENTS - Vector art (1)
    // =========================================================================
    {
        tag: 'svg',
        category: 'Elements',
        subCategory: 'Vector art',
        description: 'Container defining a new coordinate system and viewport for SVG vector graphics.',
        renderMode: 'svg',
        void: false,
        defaultAttrs: { viewBox: '0 0 100 100' },
        defaultHTML: '<rect x="10" y="10" width="80" height="80" rx="12" fill="#0A84FF" opacity="0.2" stroke="#0A84FF" stroke-width="3"/>',
        defaultSize: { width: 120, height: 120 }
    },

    // =========================================================================
    // ELEMENTS - MathML (1)
    // =========================================================================
    {
        tag: 'math',
        category: 'Elements',
        subCategory: 'MathML',
        description: 'The top-level element in MathML.',
        renderMode: 'math',
        void: false,
        defaultHTML: '<mi>E</mi><mo>=</mo><mi>m</mi><msup><mi>c</mi><mn>2</mn></msup>',
        defaultSize: { width: 'auto', height: 'auto' },
        defaultStyle: { color: '#111111', fontSize: '20px', padding: '6px' }
    },

    // =========================================================================
    // ELEMENTS - Graphics & Animation (1)
    // =========================================================================
    {
        tag: 'canvas',
        category: 'Elements',
        subCategory: 'Graphics & Animation',
        description: 'Container element to use with the Canvas 2D or WebGL API to draw graphics and animations.',
        renderMode: 'real',
        void: false,
        defaultAttrs: { width: '240', height: '160' },
        defaultSize: { width: 240, height: 160 },
        defaultStyle: { backgroundColor: '#f8fafc', border: '1px dashed #64748b' }
    },

    // =========================================================================
    // ELEMENTS - Table (10)
    // =========================================================================
    {
        tag: 'caption',
        category: 'Elements',
        subCategory: 'Table',
        description: 'Specifies the caption (or title) of a table.',
        renderMode: 'real',
        void: false,
        defaultText: 'Table Caption',
        defaultSize: { width: 160, height: 'auto' },
        defaultStyle: { color: '#111111', fontWeight: '600', padding: '4px' }
    },
    {
        tag: 'col',
        category: 'Elements',
        subCategory: 'Table',
        description: 'Defines one or more columns in a column group represented by its parent <colgroup> element.',
        renderMode: 'meta',
        headElement: false,
        void: true,
        defaultAttrs: { span: '1' }
    },
    {
        tag: 'colgroup',
        category: 'Elements',
        subCategory: 'Table',
        description: 'Defines a group of columns within a table.',
        renderMode: 'meta',
        headElement: false,
        void: false
    },
    {
        tag: 'table',
        category: 'Elements',
        subCategory: 'Table',
        description: 'Represents tabular data in rows and columns of cells.',
        renderMode: 'real',
        void: false,
        defaultHTML: '<thead><tr><th>Header 1</th><th>Header 2</th></tr></thead><tbody><tr><td>Cell 1</td><td>Cell 2</td></tr></tbody>',
        defaultSize: { width: 280, height: 'auto' },
        defaultStyle: { color: '#111111', borderCollapse: 'collapse', border: '1px solid #cbd5e1', backgroundColor: '#ffffff' }
    },
    {
        tag: 'tbody',
        category: 'Elements',
        subCategory: 'Table',
        description: "Encapsulates a set of table rows (<tr>) comprising the body of a table's main data.",
        renderMode: 'meta',
        headElement: false,
        void: false
    },
    {
        tag: 'td',
        category: 'Elements',
        subCategory: 'Table',
        description: 'Defines a cell of a table that contains data.',
        renderMode: 'real',
        void: false,
        defaultText: 'Table Cell',
        defaultSize: { width: 120, height: 36 },
        defaultStyle: { color: '#111111', border: '1px solid #cbd5e1', padding: '6px 10px', display: 'flex', alignItems: 'center' }
    },
    {
        tag: 'tfoot',
        category: 'Elements',
        subCategory: 'Table',
        description: 'Encapsulates a set of table rows (<tr>) comprising the foot of a table.',
        renderMode: 'meta',
        headElement: false,
        void: false
    },
    {
        tag: 'th',
        category: 'Elements',
        subCategory: 'Table',
        description: 'Defines a cell as the header of a group of table cells.',
        renderMode: 'real',
        void: false,
        defaultText: 'Header Cell',
        defaultSize: { width: 120, height: 36 },
        defaultStyle: { color: '#111111', fontWeight: '600', backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', padding: '6px 10px', display: 'flex', alignItems: 'center' }
    },
    {
        tag: 'thead',
        category: 'Elements',
        subCategory: 'Table',
        description: 'Encapsulates a set of table rows (<tr>) comprising the head of a table.',
        renderMode: 'meta',
        headElement: false,
        void: false
    },
    {
        tag: 'tr',
        category: 'Elements',
        subCategory: 'Table',
        description: 'Defines a row of cells in a table.',
        renderMode: 'real',
        void: false,
        defaultText: 'Table Row',
        defaultSize: { width: 240, height: 36 },
        defaultStyle: { color: '#111111', border: '1px dashed #94a3b8', padding: '6px 10px', display: 'flex', alignItems: 'center' }
    },

    // =========================================================================
    // ELEMENTS - Form (15)
    // =========================================================================
    {
        tag: 'button',
        category: 'Elements',
        subCategory: 'Form',
        description: 'An interactive element activated by a user to perform an action.',
        renderMode: 'real',
        void: false,
        defaultText: 'Button',
        defaultAttrs: { type: 'button' },
        defaultSize: { width: 120, height: 40 },
        defaultStyle: { backgroundColor: '#0A84FF', color: '#ffffff', border: 'none', borderRadius: '6px', padding: '8px 16px', cursor: 'pointer' }
    },
    {
        tag: 'datalist',
        category: 'Elements',
        subCategory: 'Form',
        description: 'Contains a set of <option> elements representing recommended options for other controls.',
        renderMode: 'meta',
        headElement: false,
        void: false,
        defaultHTML: '<option value="Option 1"></option><option value="Option 2"></option>'
    },
    {
        tag: 'fieldset',
        category: 'Elements',
        subCategory: 'Form',
        description: 'Groups several controls as well as labels (<label>) within a web form.',
        renderMode: 'real',
        void: false,
        defaultHTML: '<legend>Fieldset</legend>',
        defaultSize: { width: 260, height: 140 },
        defaultStyle: { color: '#111111', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '12px' }
    },
    {
        tag: 'form',
        category: 'Elements',
        subCategory: 'Form',
        description: 'Represents a document section containing interactive controls for submitting information.',
        renderMode: 'real',
        void: false,
        defaultText: 'Form Container',
        defaultSize: { width: 320, height: 220 },
        defaultStyle: { backgroundColor: '#f8fafc', border: '1px dashed #94a3b8', borderRadius: '6px', padding: '16px', color: '#334155' }
    },
    {
        tag: 'input',
        category: 'Elements',
        subCategory: 'Form',
        description: 'Creates interactive controls for web-based forms to accept data from the user.',
        renderMode: 'real',
        void: true,
        defaultAttrs: { type: 'text', placeholder: 'Type here...' },
        defaultSize: { width: 180, height: 34 },
        defaultStyle: { border: '1px solid #cbd5e1', borderRadius: '4px', padding: '4px 8px', color: '#111111', backgroundColor: '#ffffff' }
    },
    {
        tag: 'label',
        category: 'Elements',
        subCategory: 'Form',
        description: 'Represents a caption for an item in a user interface.',
        renderMode: 'real',
        void: false,
        defaultText: 'Label',
        defaultSize: { width: 'auto', height: 'auto' },
        defaultStyle: { color: '#111111', fontSize: '14px', fontWeight: '500' }
    },
    {
        tag: 'legend',
        category: 'Elements',
        subCategory: 'Form',
        description: 'Represents a caption for the content of its parent <fieldset>.',
        renderMode: 'real',
        void: false,
        defaultText: 'Legend',
        defaultSize: { width: 'auto', height: 'auto' },
        defaultStyle: { color: '#111111', fontSize: '14px', fontWeight: '600' }
    },
    {
        tag: 'meter',
        category: 'Elements',
        subCategory: 'Form',
        description: 'Represents either a scalar value within a known range or a fractional value.',
        renderMode: 'real',
        void: false,
        defaultAttrs: { value: '0.6', min: '0', max: '1' },
        defaultSize: { width: 160, height: 24 }
    },
    {
        tag: 'optgroup',
        category: 'Elements',
        subCategory: 'Form',
        description: 'Creates a grouping of options within a <select> element.',
        renderMode: 'meta',
        headElement: false,
        void: false,
        defaultAttrs: { label: 'Option Group' }
    },
    {
        tag: 'option',
        category: 'Elements',
        subCategory: 'Form',
        description: 'Defines an item contained in a <select>, <optgroup>, or <datalist> element.',
        renderMode: 'meta',
        headElement: false,
        void: false,
        defaultAttrs: { value: 'option-1' },
        defaultText: 'Option 1'
    },
    {
        tag: 'output',
        category: 'Elements',
        subCategory: 'Form',
        description: 'Container element into which a site or app can inject calculation results or user action outcomes.',
        renderMode: 'real',
        void: false,
        defaultText: 'Output: 0',
        defaultSize: { width: 'auto', height: 'auto' },
        defaultStyle: { color: '#111111', padding: '4px 8px', backgroundColor: '#f1f5f9', borderRadius: '4px' }
    },
    {
        tag: 'progress',
        category: 'Elements',
        subCategory: 'Form',
        description: 'Displays an indicator showing the completion progress of a task.',
        renderMode: 'real',
        void: false,
        defaultAttrs: { value: '60', max: '100' },
        defaultSize: { width: 180, height: 20 }
    },
    {
        tag: 'select',
        category: 'Elements',
        subCategory: 'Form',
        description: 'Represents a control that provides a menu of options.',
        renderMode: 'real',
        void: false,
        defaultHTML: '<option value="1">Option 1</option><option value="2">Option 2</option>',
        defaultSize: { width: 160, height: 34 },
        defaultStyle: { border: '1px solid #cbd5e1', borderRadius: '4px', padding: '4px 8px', color: '#111111', backgroundColor: '#ffffff' }
    },
    {
        tag: 'selectedcontent',
        category: 'Elements',
        subCategory: 'Form',
        description: 'Displays the content of the currently selected <option> inside a closed <select> element.',
        renderMode: 'meta',
        headElement: false,
        void: false
    },
    {
        tag: 'textarea',
        category: 'Elements',
        subCategory: 'Form',
        description: 'Represents a multi-line plain-text editing control.',
        renderMode: 'real',
        void: false,
        defaultAttrs: { placeholder: 'Enter text...' },
        defaultSize: { width: 220, height: 90 },
        defaultStyle: { border: '1px solid #cbd5e1', borderRadius: '4px', padding: '8px', color: '#111111', backgroundColor: '#ffffff', resize: 'none' }
    },

    // =========================================================================
    // ELEMENTS - Interactive UI objects (4)
    // =========================================================================
    {
        tag: 'details',
        category: 'Elements',
        subCategory: 'Interactive UI objects',
        description: 'Creates a disclosure widget in which information is visible only when toggled open.',
        renderMode: 'real',
        void: false,
        defaultAttrs: { open: '' },
        defaultHTML: '<summary>Details Summary</summary><p>Hidden details content.</p>',
        defaultSize: { width: 240, height: 'auto' },
        defaultStyle: { color: '#111111', backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '10px' }
    },
    {
        tag: 'dialog',
        category: 'Elements',
        subCategory: 'Interactive UI objects',
        description: 'Represents a dialog box or other interactive component such as an alert or modal.',
        renderMode: 'real',
        void: false,
        defaultAttrs: { open: '' },
        defaultText: 'Dialog content',
        defaultSize: { width: 260, height: 140 },
        defaultStyle: { color: '#111111', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }
    },
    {
        tag: 'geolocation',
        category: 'Elements',
        subCategory: 'Interactive UI objects',
        description: 'Creates an interactive control for the user to share their geolocation data with the page.',
        renderMode: 'real',
        void: false,
        defaultText: 'Share Geolocation',
        defaultSize: { width: 170, height: 38 },
        defaultStyle: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#eef2ff', color: '#1e3a8a', border: '1px solid #c7d2fe', borderRadius: '6px', padding: '6px 12px', fontSize: '13px' }
    },
    {
        tag: 'summary',
        category: 'Elements',
        subCategory: 'Interactive UI objects',
        description: 'Specifies a summary, caption, or legend for a <details> element disclosure box.',
        renderMode: 'real',
        void: false,
        defaultText: 'Summary',
        defaultSize: { width: 'auto', height: 'auto' },
        defaultStyle: { color: '#111111', fontWeight: '600' }
    },

    // =========================================================================
    // TEXT (31)
    // =========================================================================
    {
        tag: 'a',
        category: 'Text',
        subCategory: null,
        description: 'Together with its href attribute, creates a hyperlink to web pages, files, email addresses, or URLs.',
        renderMode: 'real',
        void: false,
        defaultText: 'Link text',
        defaultAttrs: { href: '#' },
        defaultSize: { width: 'auto', height: 'auto' },
        defaultStyle: { color: '#0A84FF', textDecoration: 'underline' }
    },
    {
        tag: 'abbr',
        category: 'Text',
        subCategory: null,
        description: 'Represents an abbreviation or acronym.',
        renderMode: 'real',
        void: false,
        defaultText: 'HTML',
        defaultAttrs: { title: 'HyperText Markup Language' },
        defaultSize: { width: 'auto', height: 'auto' },
        defaultStyle: { color: '#111111' }
    },
    {
        tag: 'b',
        category: 'Text',
        subCategory: null,
        description: "Draws the reader's attention to the element's contents without conveying extra importance.",
        renderMode: 'real',
        void: false,
        defaultText: 'Bold text',
        defaultSize: { width: 'auto', height: 'auto' },
        defaultStyle: { color: '#111111' }
    },
    {
        tag: 'bdi',
        category: 'Text',
        subCategory: null,
        description: "Tells the browser's bidirectional algorithm to isolate the text from surrounding text.",
        renderMode: 'real',
        void: false,
        defaultText: 'Isolated text',
        defaultSize: { width: 'auto', height: 'auto' },
        defaultStyle: { color: '#111111' }
    },
    {
        tag: 'bdo',
        category: 'Text',
        subCategory: null,
        description: 'Overrides the current directionality of text.',
        renderMode: 'real',
        void: false,
        defaultText: 'Reversed direction text',
        defaultAttrs: { dir: 'rtl' },
        defaultSize: { width: 'auto', height: 'auto' },
        defaultStyle: { color: '#111111' }
    },
    {
        tag: 'br',
        category: 'Text',
        subCategory: null,
        description: 'Produces a line break in text (carriage-return).',
        renderMode: 'meta',
        headElement: false,
        void: true
    },
    {
        tag: 'cite',
        category: 'Text',
        subCategory: null,
        description: 'Marks up the title of a creative work.',
        renderMode: 'real',
        void: false,
        defaultText: 'Creative Work Title',
        defaultSize: { width: 'auto', height: 'auto' },
        defaultStyle: { color: '#111111' }
    },
    {
        tag: 'code',
        category: 'Text',
        subCategory: null,
        description: 'Displays a short fragment of computer code in a monospace font.',
        renderMode: 'real',
        void: false,
        defaultText: 'inlineCode()',
        defaultSize: { width: 'auto', height: 'auto' },
        defaultStyle: { color: '#be123c', backgroundColor: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontFamily: 'Courier New', fontSize: '13px' }
    },
    {
        tag: 'data',
        category: 'Text',
        subCategory: null,
        description: 'Links a given piece of content with a machine-readable translation.',
        renderMode: 'real',
        void: false,
        defaultText: 'Product SKU',
        defaultAttrs: { value: '12345' },
        defaultSize: { width: 'auto', height: 'auto' },
        defaultStyle: { color: '#111111' }
    },
    {
        tag: 'dfn',
        category: 'Text',
        subCategory: null,
        description: 'Indicates the term being defined within the context of a definition phrase or sentence.',
        renderMode: 'real',
        void: false,
        defaultText: 'Defined term',
        defaultSize: { width: 'auto', height: 'auto' },
        defaultStyle: { color: '#111111' }
    },
    {
        tag: 'em',
        category: 'Text',
        subCategory: null,
        description: 'Marks text that has stress emphasis.',
        renderMode: 'real',
        void: false,
        defaultText: 'Emphasized text',
        defaultSize: { width: 'auto', height: 'auto' },
        defaultStyle: { color: '#111111' }
    },
    {
        tag: 'i',
        category: 'Text',
        subCategory: null,
        description: 'Represents a range of text set off from normal text (e.g., idiomatic or technical terms).',
        renderMode: 'real',
        void: false,
        defaultText: 'Italic text',
        defaultSize: { width: 'auto', height: 'auto' },
        defaultStyle: { color: '#111111' }
    },
    {
        tag: 'kbd',
        category: 'Text',
        subCategory: null,
        description: 'Represents textual user input from a keyboard, voice input, or other text entry device.',
        renderMode: 'real',
        void: false,
        defaultText: 'Ctrl + K',
        defaultSize: { width: 'auto', height: 'auto' },
        defaultStyle: { color: '#111111', backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '4px', padding: '2px 6px', fontFamily: 'Courier New', fontSize: '12px' }
    },
    {
        tag: 'mark',
        category: 'Text',
        subCategory: null,
        description: 'Represents text marked or highlighted for reference or notation purposes.',
        renderMode: 'real',
        void: false,
        defaultText: 'Highlighted text',
        defaultSize: { width: 'auto', height: 'auto' },
        defaultStyle: { color: '#111111', backgroundColor: '#fef08a', padding: '2px 4px' }
    },
    {
        tag: 'q',
        category: 'Text',
        subCategory: null,
        description: 'Indicates that the enclosed text is a short inline quotation.',
        renderMode: 'real',
        void: false,
        defaultText: 'Short inline quote',
        defaultSize: { width: 'auto', height: 'auto' },
        defaultStyle: { color: '#111111' }
    },
    {
        tag: 'rp',
        category: 'Text',
        subCategory: null,
        description: 'Provides fallback parentheses for browsers that do not support <ruby> annotations.',
        renderMode: 'meta',
        headElement: false,
        void: false,
        defaultText: '('
    },
    {
        tag: 'rt',
        category: 'Text',
        subCategory: null,
        description: 'Specifies the ruby text component of a <ruby> annotation.',
        renderMode: 'real',
        void: false,
        defaultText: 'ruby text',
        defaultSize: { width: 'auto', height: 'auto' },
        defaultStyle: { color: '#111111', fontSize: '12px' }
    },
    {
        tag: 'ruby',
        category: 'Text',
        subCategory: null,
        description: 'Represents small annotations rendered above, below, or next to base text.',
        renderMode: 'real',
        void: false,
        defaultHTML: '漢<rp>(</rp><rt>kan</rt><rp>)</rp>字<rp>(</rp><rt>ji</rt><rp>)</rp>',
        defaultSize: { width: 'auto', height: 'auto' },
        defaultStyle: { color: '#111111', fontSize: '18px' }
    },
    {
        tag: 's',
        category: 'Text',
        subCategory: null,
        description: 'Renders text with a strikethrough for content that is no longer relevant or accurate.',
        renderMode: 'real',
        void: false,
        defaultText: 'Strikethrough text',
        defaultSize: { width: 'auto', height: 'auto' },
        defaultStyle: { color: '#111111' }
    },
    {
        tag: 'samp',
        category: 'Text',
        subCategory: null,
        description: 'Encloses inline text representing sample or quoted output from a computer program.',
        renderMode: 'real',
        void: false,
        defaultText: 'Sample output',
        defaultSize: { width: 'auto', height: 'auto' },
        defaultStyle: { color: '#111111', fontFamily: 'Courier New', fontSize: '13px' }
    },
    {
        tag: 'small',
        category: 'Text',
        subCategory: null,
        description: 'Represents side-comments and small print, like copyright and legal text.',
        renderMode: 'real',
        void: false,
        defaultText: 'Small print text',
        defaultSize: { width: 'auto', height: 'auto' },
        defaultStyle: { color: '#475569' }
    },
    {
        tag: 'span',
        category: 'Text',
        subCategory: null,
        description: 'A generic inline container for phrasing content.',
        renderMode: 'real',
        void: false,
        defaultText: 'Inline span',
        defaultSize: { width: 'auto', height: 'auto' },
        defaultStyle: { color: '#111111' }
    },
    {
        tag: 'strong',
        category: 'Text',
        subCategory: null,
        description: 'Indicates that its contents have strong importance, seriousness, or urgency.',
        renderMode: 'real',
        void: false,
        defaultText: 'Strong text',
        defaultSize: { width: 'auto', height: 'auto' },
        defaultStyle: { color: '#111111' }
    },
    {
        tag: 'sub',
        category: 'Text',
        subCategory: null,
        description: 'Specifies inline text displayed as subscript.',
        renderMode: 'real',
        void: false,
        defaultText: 'subscript',
        defaultSize: { width: 'auto', height: 'auto' },
        defaultStyle: { color: '#111111' }
    },
    {
        tag: 'sup',
        category: 'Text',
        subCategory: null,
        description: 'Specifies inline text displayed as superscript.',
        renderMode: 'real',
        void: false,
        defaultText: 'superscript',
        defaultSize: { width: 'auto', height: 'auto' },
        defaultStyle: { color: '#111111' }
    },
    {
        tag: 'time',
        category: 'Text',
        subCategory: null,
        description: 'Represents a specific period in time with an optional machine-readable datetime attribute.',
        renderMode: 'real',
        void: false,
        defaultText: '2026-11-21',
        defaultAttrs: { datetime: '2026-11-21' },
        defaultSize: { width: 'auto', height: 'auto' },
        defaultStyle: { color: '#111111' }
    },
    {
        tag: 'u',
        category: 'Text',
        subCategory: null,
        description: 'Represents inline text with a non-textual annotation, rendered by default with a solid underline.',
        renderMode: 'real',
        void: false,
        defaultText: 'Underlined text',
        defaultSize: { width: 'auto', height: 'auto' },
        defaultStyle: { color: '#111111' }
    },
    {
        tag: 'var',
        category: 'Text',
        subCategory: null,
        description: 'Represents the name of a variable in a mathematical expression or programming context.',
        renderMode: 'real',
        void: false,
        defaultText: 'x',
        defaultSize: { width: 'auto', height: 'auto' },
        defaultStyle: { color: '#111111' }
    },
    {
        tag: 'wbr',
        category: 'Text',
        subCategory: null,
        description: 'Represents a word break opportunity.',
        renderMode: 'meta',
        headElement: false,
        void: true
    },
    {
        tag: 'del',
        category: 'Text',
        subCategory: null,
        description: 'Represents a range of text that has been deleted from a document.',
        renderMode: 'real',
        void: false,
        defaultText: 'Deleted text',
        defaultSize: { width: 'auto', height: 'auto' },
        defaultStyle: { color: '#dc2626' }
    },
    {
        tag: 'ins',
        category: 'Text',
        subCategory: null,
        description: 'Represents a range of text that has been added to a document.',
        renderMode: 'real',
        void: false,
        defaultText: 'Inserted text',
        defaultSize: { width: 'auto', height: 'auto' },
        defaultStyle: { color: '#16a34a' }
    }
];

export const HTML_ELEMENT_MAP = new Map(HTML_ELEMENT_CATALOG.map(item => [item.tag, item]));
export const HTML_ELEMENT_CATEGORIES = ['Root', 'Sectioning', 'Elements', 'Text'];


