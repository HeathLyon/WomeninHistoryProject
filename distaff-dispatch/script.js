/* The words live in content.txt / the connected Google Doc.
   This module inserts plain text only; it never treats edited text as HTML. */
(() => {
    'use strict';
    const DEFAULTS = {
  "site.title": "The Distaff Dispatch | Women of the Revolution",
  "site.description": "Dispatches from 1776 by the imagined correspondent Eleanor Hartwell, reporting on women, letters, liberty, and the making of a revolution.",
  "site.brand": "The Distaff Dispatch",
  "site.seal_left": "D",
  "site.seal_right": "D",
  "site.header_note": "An independent lady’s gazette · Est. 1776",
  "site.skip": "Skip to the dispatches",
  "site.nav_label": "Gazette sections",
  "site.main_label": "Dispatches from the Revolutionary era",
  "site.byline": "By Eleanor Hartwell, Correspondent",
  "site.powered": "Powered by Heath FPV",
  "site.updated_label": "Website text last edited",
  "site.updated": "21 October 2026",
  "site.instagram_label": "Instagram",
  "site.instagram_url": "",
  "ui.reduce_motion": "Reduce motion",
  "ui.enable_motion": "Enable motion",
  "ui.pause_slideshow": "Pause slideshow",
  "ui.play_slideshow": "Play slideshow",
  "ui.motion_paused": "Motion paused",
  "ui.previous_image": "Previous image",
  "ui.next_image": "Next image",
  "ui.slideshow_label": "Opening artwork slideshow",
  "hero.nav_label": "The latest issue",
  "hero.eyebrow": "Boston · June, 1776",
  "hero.issue": "Vol. I · No. I",
  "hero.title": "The Distaff",
  "hero.title_accent": "Dispatch.",
  "hero.description": "Whilst gentlemen debate the fate of these colonies, their wives, sisters, and neighbours are already shaping it. I take up my pen that their endeavours may not pass unremarked.",
  "hero.byline": "Kept by Eleanor Hartwell · A correspondent’s journal",
  "hero.next": "Read the latest dispatch",
  "hero.scroll": "Turn the page ↓",
  "hero.contents_label": "In this issue",
  "hero.editor_note": "A historical-fiction gazette: real women, researched events, and an imagined correspondent.",
  "slides.one.caption": "John Trumbull, Declaration of Independence, 1819 · Later artwork",
  "slides.one.credit": "https://commons.wikimedia.org/wiki/File:Declaration_of_Independence_(1819),_by_John_Trumbull.jpg",
  "slides.two.caption": "Abigail Adams, Gilbert Stuart, begun 1800 · Later portrait",
  "slides.two.credit": "https://commons.wikimedia.org/wiki/File:Abigail_Adams_by_Gilbert_Stuart.jpg",
  "slides.three.caption": "Mercy Otis Warren, John Singleton Copley, circa 1763",
  "slides.three.credit": "https://commons.wikimedia.org/wiki/File:Mercy_Otis_Warren.jpg",
  "abigail.nav_label": "Abigail Adams",
  "abigail.eyebrow": "Dispatch I · Letters & liberty",
  "abigail.category": "Abigail Adams · Braintree, Massachusetts",
  "abigail.title": "Remember",
  "abigail.title_accent": "the ladies.",
  "abigail.date": "Filed the 8th of June, 1776",
  "abigail.place": "Braintree",
  "abigail.body_one": "Mrs. Abigail Adams has put a most inconvenient question to the gentlemen who speak so readily of liberty. In a letter of the 31st of March to her husband, now serving in Congress, she urges that the making of new laws should not leave women subject to unchecked authority at home.",
  "abigail.body_two": "“Remember the Ladies,” she writes. I find those few words worthy of their own broadside. If a people would resist arbitrary power in a king, ought they not examine its exercise within the household also?",
  "abigail.more_label": "Read the correspondent’s reflection",
  "abigail.more": "Mrs. Adams asks for particular care in the laws that may follow an American separation from Britain. I would not pretend that her letter promises a place for women in Congress. Yet a question once committed to paper is not easily recalled: whose liberty shall this struggle secure?",
  "abigail.source_label": "Consult the letter · 31 March–5 April 1776",
  "abigail.source_url": "https://www.masshist.org/digitaladams/archive/doc?id=L17760331aa",
  "abigail.next": "A pen against the Crown",
  "abigail.image_alt": "Portrait of Abigail Adams seated in a dark dress and white cap, painted by Gilbert Stuart after the Revolution.",
  "abigail.caption": "Abigail Adams · Gilbert Stuart, begun 1800, delivered 1815. This later portrait accompanies a recreated report from 1776.",
  "abigail.footer": "Letters from Braintree",
  "mercy.nav_label": "Mercy Otis Warren",
  "mercy.eyebrow": "Dispatch II · The political stage",
  "mercy.category": "Mercy Otis Warren · Plymouth, Massachusetts",
  "mercy.title": "A sharper",
  "mercy.title_accent": "sort of weapon.",
  "mercy.date": "Filed the 10th of June, 1776",
  "mercy.place": "Plymouth",
  "mercy.body_one": "There are weapons in this quarrel which require neither powder nor shot. Mrs. Mercy Otis Warren employs ridicule. In The Group, printed in 1775, she turns the ambitions of the Crown’s adherents into a farce, inviting readers to judge the men who would govern them.",
  "mercy.body_two": "Her political writings have appeared without her name. Such concealment need not signify a timid mind. A woman may be denied a seat in the assembly and still place an argument before every gentleman who opens a newspaper.",
  "mercy.more_label": "Read the correspondent’s reflection",
  "mercy.more": "The Warrens’ home in Plymouth is connected with the Patriot cause, and Mrs. Warren corresponds with political friends, including the Adams family. I shall not mistake the drawing room for a legislature; nevertheless, opinions formed there may travel farther than their authors are permitted to go.",
  "mercy.source_label": "Read The Group · published 1775",
  "mercy.source_url": "https://www.gutenberg.org/ebooks/29224",
  "mercy.next": "A poet addresses the General",
  "mercy.image_alt": "Mercy Otis Warren in a blue-green silk dress, holding flowers, in John Singleton Copley’s portrait.",
  "mercy.caption": "Mercy Otis Warren · John Singleton Copley, circa 1763. Public-domain artwork.",
  "mercy.footer": "A dispatch from Plymouth",
  "phillis.nav_label": "Phillis Wheatley",
  "phillis.eyebrow": "Dispatch III · Poetry & freedom",
  "phillis.category": "Phillis Wheatley · Boston, Massachusetts",
  "phillis.title": "Let her verse",
  "phillis.title_accent": "be heard.",
  "phillis.date": "Filed the 12th of June, 1776",
  "phillis.place": "Boston",
  "phillis.body_one": "Miss Phillis Wheatley’s Poems on Various Subjects, Religious and Moral appeared in London in 1773. Carried from Africa into enslavement as a child, she has made a place in letters that many persons would have denied her before reading a single line.",
  "phillis.body_two": "Last October she addressed a poem to General Washington. His reply, dated the 28th of February, acknowledges her talent and thanks her for the verses. A cause so fond of the word liberty must surely consider the claims of those whom slavery has wronged.",
  "phillis.more_label": "Read the correspondent’s reflection",
  "phillis.more": "I offer no invented account of a meeting with the General. The surviving correspondence is sufficient testimony to this exchange. Nor shall praise for a poet excuse the bondage endured by others: the liberty of these colonies cannot be measured by fine phrases alone.",
  "phillis.source_label": "Read Washington’s reply · 28 February 1776",
  "phillis.source_url": "https://www.loc.gov/resource/mgw3h.001/?q=wheatley&sp=13&st=text",
  "phillis.next": "A woman beyond the public record",
  "phillis.image_alt": "An engraved frontispiece depicting Phillis Wheatley seated at a writing desk with a quill.",
  "phillis.caption": "Phillis Wheatley · Frontispiece to her 1773 Poems. An engraving traditionally associated with Scipio Moorhead; attribution is uncertain.",
  "phillis.footer": "Literary intelligence from Boston",
  "fiction.nav_label": "Ruth Whitcomb · Fiction",
  "fiction.eyebrow": "An imagined dispatch · Ordinary labours",
  "fiction.category": "Ruth Whitcomb · A fictional print-shop worker",
  "fiction.title": "The hands",
  "fiction.title_accent": "behind the news.",
  "fiction.date": "An imagined day in June, 1776",
  "fiction.place": "Boston",
  "fiction.body_one": "Before the first bundle of papers reaches the street, Ruth Whitcomb has counted sheets, sorted battered type, and cleared yesterday’s ink from the work-table. Her employer’s name will stand upon the imprint. Her own will scarcely be noticed beyond the shop door.",
  "fiction.body_two": "This morning she carries the finished sheets through a shower, protecting them beneath her cloak whilst the hem of her gown grows heavy with rain. The town shall have its arguments by breakfast. Ruth must wait until the deliveries are done.",
  "fiction.note": "Fictional person and episode. Ruth Whitcomb is invented to explore ordinary labour; this is not a recovered biography, quotation, or eyewitness account.",
  "fiction.next": "Meet your correspondent",
  "fiction.footer": "An original work of historical fiction",
  "fiction.broadside_label": "An imagined printer’s proof",
  "fiction.broadside_title": "Intelligence for the Ladies",
  "fiction.broadside_subtitle": "Boston · June, 1776",
  "fiction.broadside_body": "Let not the labour which brings these pages to your hands be forgotten when the great deeds of this age are set down.",
  "fiction.broadside_signature": "An observation by Eleanor Hartwell",
  "fiction.caption": "A newly composed typographic illustration for Ruth’s fictional story; not an eighteenth-century artifact.",
  "about.nav_label": "The correspondent",
  "about.eyebrow": "From the writing desk",
  "about.title": "Your humble",
  "about.title_accent": "correspondent.",
  "about.category": "Eleanor Hartwell · An imagined reporter",
  "about.body_one": "Good reader, I am Eleanor Hartwell, a Boston gentlewoman with more questions than patience for their neglect. I keep this small gazette to observe the part women take in our present troubles: by correspondence, by composition, and by the daily labour upon which public affairs depend.",
  "about.body_two": "I lay no claim to an impartial temper where arbitrary power is concerned. Yet an honest pen must distinguish a thing known from a thing imagined. Let the reader consult the papers gathered at the close of this issue.",
  "about.note": "Editorial note: Eleanor is fictional. All dispatches and filing dates are modern reconstructions written in a period-inspired voice. The three historical women and cited documents are real; no interviews are claimed.",
  "about.next": "Examine the sources",
  "about.seal": "E · H",
  "about.seal_caption": "Her pen, her account",
  "about.footer": "An independent lady’s gazette",
  "sources.nav_label": "Sources & editorial notes",
  "sources.eyebrow": "The evidence behind this issue",
  "sources.title": "Papers &",
  "sources.title_accent": "particulars.",
  "sources.intro": "Modern editorial apparatus for this historical-fiction gazette. The reports paraphrase the evidence below; the narrator’s opinions are newly written.",
  "sources.one.title": "Abigail Adams to John Adams, 31 March–5 April 1776 · Massachusetts Historical Society",
  "sources.one.url": "https://www.masshist.org/digitaladams/archive/doc?id=L17760331aa",
  "sources.two.title": "Mercy Otis Warren, The Group (1775) · Project Gutenberg transcription",
  "sources.two.url": "https://www.gutenberg.org/ebooks/29224",
  "sources.three.title": "Mercy Otis Warren’s political writing · Law Library of Congress",
  "sources.three.url": "https://blogs.loc.gov/law/2022/12/mercy-otis-warren-the-secret-muse-of-the-bill-of-rights/",
  "sources.four.title": "Phillis Wheatley’s 1773 volume and correspondence · Library of Congress",
  "sources.four.url": "https://www.loc.gov/item/today-in-history/september-01/",
  "sources.five.title": "George Washington to Phillis Wheatley, 28 February 1776 · Library of Congress",
  "sources.five.url": "https://www.loc.gov/resource/mgw3h.001/?q=wheatley&sp=13&st=text",
  "sources.six.title": "Phillis Wheatley · National Park Service biography",
  "sources.six.url": "https://www.nps.gov/people/phillis-wheatley.htm",
  "sources.credits_label": "Artwork credits & historical-fiction note",
  "sources.credits_note": "The opening artwork is illustrative. Trumbull’s Declaration scene and Stuart’s Abigail portrait postdate the 1776 setting. No later artwork is presented as a contemporary photograph or eyewitness image.",
  "sources.credit_one": "Declaration of Independence · John Trumbull, 1819 · Wikimedia Commons",
  "sources.credit_two": "Abigail Adams · Gilbert Stuart, begun 1800, delivered 1815 · Wikimedia Commons",
  "sources.credit_three": "Mercy Otis Warren · John Singleton Copley, circa 1763 · Wikimedia Commons",
  "sources.credit_four": "Phillis Wheatley, 1773 frontispiece · Wikimedia Commons / Library of Congress",
  "sources.credit_four_url": "https://commons.wikimedia.org/wiki/File:Phillis_Wheatley_frontispiece.jpg",
  "sources.fiction_note": "Eleanor Hartwell, Ruth Whitcomb, and Ruth’s episode are invented. The first-person commentary, report dates, and gazette are reconstructions for a modern presentation. Ruth’s story is not offered as evidence about a real woman.",
  "sources.next": "Return to the latest issue",
  "sources.seal": "D ✦ D",
  "sources.seal_caption": "The Distaff Dispatch",
  "sources.footer": "The end of this issue"
};
    const config = Object.assign({ publishedDocUrl: '', appsScriptUrl: '', refreshSeconds: 300 }, window.DISPATCH_CONFIG || {});
    let current = { ...DEFAULTS };
    let busy = false;
    let lastAttempt = 0;
    const refreshMs = Math.min(3600, Math.max(60, Number(config.refreshSeconds) || 300)) * 1000;

    function parse(text) {
        if (typeof text !== 'string' || text.length > 250000) throw new Error('Invalid or oversized text file.');
        const fields = Object.create(null);
        let key = null;
        let lines = [];
        function finish() {
            if (key === null) return;
            if (Object.hasOwn(fields, key)) throw new Error('Repeated label: ' + key);
            fields[key] = lines.join('\n').trim();
        }
        text.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n').replace(/\u00a0/g, ' ').split('\n').forEach(line => {
            const match = line.trim().match(/^\[\[([a-z0-9_.-]+)\]\]$/i);
            if (match) {
                finish();
                key = match[1].toLowerCase();
                lines = [];
            } else if (key !== null) lines.push(line);
        });
        finish();
        if (!fields['site.title'] || !fields['hero.title'] || !fields['hero.description']) {
            throw new Error('The text needs the site.title, hero.title, and hero.description labels and values.');
        }
        const unknown = Object.keys(fields).filter(name => !Object.hasOwn(DEFAULTS, name));
        const missing = Object.keys(DEFAULTS).filter(name => !Object.hasOwn(fields, name));
        if (unknown.length || missing.length) {
            console.warn('Dispatch text: check unchanged [[labels]].', { unknown, missing });
        }
        return fields;
    }

    function safeURL(value) {
        if (typeof value !== 'string' || !value.trim()) return '';
        try {
            const url = new URL(value, document.baseURI);
            if (url.protocol === 'https:' || url.protocol === 'http:') return url.href;
            if (location.protocol === 'file:' && url.protocol === 'file:' && !/^[a-z]+:/i.test(value)) return url.href;
        } catch (_) { /* An invalid link is disabled instead of executed. */ }
        return '';
    }

    function apply(fields) {
        const next = { ...DEFAULTS };
        Object.keys(DEFAULTS).forEach(key => {
            if (Object.hasOwn(fields, key) && typeof fields[key] === 'string') next[key] = fields[key];
        });
        current = next;
        document.querySelectorAll('[data-text]').forEach(element => {
            const value = current[element.dataset.text];
            if (typeof value === 'string' && element.textContent !== value) element.textContent = value;
        });
        document.querySelectorAll('[data-content-href]').forEach(element => {
            const value = safeURL(current[element.dataset.contentHref]);
            if (value) element.setAttribute('href', value);
            else element.removeAttribute('href');
        });
        [['[data-content-alt]', 'contentAlt', 'alt'],
         ['[data-content-aria]', 'contentAria', 'aria-label'],
         ['[data-content-meta]', 'contentMeta', 'content']].forEach(([selector, key, attribute]) => {
            document.querySelectorAll(selector).forEach(element => {
                const value = current[element.dataset[key]];
                if (typeof value === 'string') element.setAttribute(attribute, value);
            });
        });
        document.querySelectorAll('[data-content-show]').forEach(element => {
            element.hidden = !safeURL(current[element.dataset.contentShow]);
        });
        document.dispatchEvent(new CustomEvent('dispatch:content'));
    }

    function extractPublishedText(markup) {
        if (typeof markup !== 'string' || markup.length > 2000000) throw new Error('Invalid or oversized published document.');
        // Parse an inert document. Never insert Google's markup into the live page.
        const published = new DOMParser().parseFromString(markup, 'text/html');
        const content = published.getElementById('contents');
        if (!content) throw new Error('This response does not contain a published Google Doc.');
        const parts = [];
        const blocks = new Set(['P', 'DIV', 'LI', 'TR', 'TD', 'TH', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'PRE', 'BLOCKQUOTE']);
        const skip = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE']);
        function walk(node) {
            if (node.nodeType === 3) { parts.push(node.nodeValue || ''); return; }
            if (node.nodeType !== 1 || skip.has(node.tagName)) return;
            if (node.tagName === 'BR') { parts.push('\n'); return; }
            node.childNodes.forEach(walk);
            if (blocks.has(node.tagName)) parts.push('\n');
        }
        walk(content);
        return parts.join('').replace(/\u00a0/g, ' ').replace(/\r\n?/g, '\n');
    }

    window.DispatchContent = Object.freeze({
        get: key => current[key] ?? '',
        parse,
        apply,
        safeURL,
        extractPublishedText
    });

    function endpoint() {
        if (config.publishedDocUrl) {
            const url = new URL(config.publishedDocUrl);
            if (url.protocol !== 'https:' || url.hostname !== 'docs.google.com' ||
                !/^\/document\/d\/e\/[A-Za-z0-9_-]+\/pub\/?$/.test(url.pathname) || url.username || url.password) {
                throw new Error('publishedDocUrl must be the Google Docs Publish to web URL ending in /pub.');
            }
            url.hash = '';
            return { type: 'published', url };
        }
        if (!config.appsScriptUrl) return null;
        const url = new URL(config.appsScriptUrl);
        if (url.protocol !== 'https:' || url.hostname !== 'script.google.com' ||
            !/^\/macros\/s\/[a-zA-Z0-9_-]+\/exec$/.test(url.pathname) || url.username || url.password) {
            throw new Error('appsScriptUrl must be the Google Apps Script deployed web app URL ending in /exec.');
        }
        url.hash = '';
        return { type: 'apps-script', url };
    }

    async function requestPublishedDoc(url) {
        const response = await fetch(url.href, {
            mode: 'cors', credentials: 'omit', cache: 'no-store', signal: AbortSignal.timeout(20000)
        });
        if (!response.ok) throw new Error('Published Google Doc returned ' + response.status);
        return { ok: true, text: extractPublishedText(await response.text()) };
    }

    function requestFeed(url) {
        return new Promise((resolve, reject) => {
            const callback = '__distaffFeed_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2);
            const script = document.createElement('script');
            script.async = true;
            script.referrerPolicy = 'no-referrer';
            let settled = false;
            function finish(error, payload) {
                if (settled) return;
                settled = true;
                clearTimeout(timer);
                script.remove();
                // A late response after a timeout should be harmless.
                window[callback] = () => {};
                setTimeout(() => { delete window[callback]; }, 60000);
                if (error) reject(error); else resolve(payload);
            }
            window[callback] = payload => {
                if (!payload || payload.ok !== true || typeof payload.text !== 'string') {
                    finish(new Error(payload?.error || 'The Google Doc feed did not return text.'));
                } else finish(null, payload);
            };
            const timer = setTimeout(() => finish(new Error('The Google Doc feed timed out.')), 20000);
            script.onerror = () => finish(new Error('Could not load the Google Doc feed.'));
            const target = new URL(url.href);
            target.searchParams.set('callback', callback);
            target.searchParams.set('_', String(Date.now()));
            script.src = target.href;
            document.head.appendChild(script);
        });
    }

    async function init() {
        apply(DEFAULTS);
        if (location.protocol !== 'file:') {
            try {
                const response = await fetch('content.txt', { cache: 'no-store', signal: AbortSignal.timeout(8000) });
                if (!response.ok) throw new Error('content.txt returned ' + response.status);
                apply(parse(await response.text()));
            } catch (error) { console.warn('Using the built-in gazette text.', error.message); }
        }
        let feed;
        try { feed = endpoint(); }
        catch (error) { console.warn(error.message); return; }
        if (!feed) return;
        const cacheKey = 'distaff:feed:' + feed.url.origin + feed.url.pathname;
        try {
            const saved = localStorage.getItem(cacheKey);
            if (saved) apply(parse(saved));
        } catch (_) { /* Storage may be unavailable; built-in text remains usable. */ }
        async function refresh() {
            if (busy || document.hidden) return;
            busy = true;
            lastAttempt = Date.now();
            try {
                const payload = feed.type === 'published'
                    ? await requestPublishedDoc(feed.url)
                    : await requestFeed(feed.url);
                const fields = parse(payload.text);
                apply(fields);
                try { localStorage.setItem(cacheKey, payload.text); } catch (_) {}
            } catch (error) {
                console.warn('Google Docs update unavailable; keeping the last readable issue.', error.message);
            } finally { busy = false; }
        }
        refresh();
        setInterval(refresh, refreshMs);
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden && Date.now() - lastAttempt >= refreshMs) refresh();
        });
    }

    document.querySelectorAll('.portrait-frame img').forEach(img => {
        img.addEventListener('error', () => img.classList.add('is-broken'));
        img.addEventListener('load', () => img.classList.remove('is-broken'));
        if (img.complete && !img.naturalWidth) img.classList.add('is-broken');
    });
    init();
})();


/* Original scroll, cursor-trail, and Ken Burns effects.
   Save as script.js beside index.html and styles.css.
   EDIT THE PLAYLIST BELOW to use your own images. You can add/remove entries.
   Local example: src: 'images/hero-01.jpg'
   Demo image URLs need an internet connection. Credit links go to the sources.
   Theme, hold time, zoom scale and picture transitions are CSS :root variables.
*/
(() => {
    'use strict';

    const IMAGE_PLAYLIST = [
        {
            src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f9/Declaration_of_Independence_%281819%29%2C_by_John_Trumbull.jpg/1280px-Declaration_of_Independence_%281819%29%2C_by_John_Trumbull.jpg',
            captionKey: 'slides.one.caption', creditKey: 'slides.one.credit',
            credit: 'https://commons.wikimedia.org/wiki/File:Declaration_of_Independence_(1819),_by_John_Trumbull.jpg',
            position: '50% 50%',
            layout: 'wide',
            pan: -1
        },
        {
            src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ac/Abigail_Adams_by_Gilbert_Stuart.jpg/960px-Abigail_Adams_by_Gilbert_Stuart.jpg',
            captionKey: 'slides.two.caption', creditKey: 'slides.two.credit',
            credit: 'https://commons.wikimedia.org/wiki/File:Abigail_Adams_by_Gilbert_Stuart.jpg',
            position: '50% 20%',
            layout: 'portrait',
            pan: 1
        },
        {
            src: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Mercy_Otis_Warren.jpg',
            captionKey: 'slides.three.caption', creditKey: 'slides.three.credit',
            credit: 'https://commons.wikimedia.org/wiki/File:Mercy_Otis_Warren.jpg',
            position: '50% 22%',
            layout: 'portrait',
            pan: -1
        }
    ];

    const text = key => window.DispatchContent.get(key);
    const root = document.documentElement;
    const scroller = document.querySelector('.presentation');
    if (!scroller) return;
    const panels = Array.from(scroller.querySelectorAll('.panel'));
    if (!panels.length) return;
    const navLinks = Array.from(document.querySelectorAll('.section-nav a'));
    const motionButton = document.querySelector('.motion-toggle');
    const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const hero = document.querySelector('.hero');
    const stage = document.querySelector('.hero-slides');
    const controls = document.querySelector('.slideshow-controls');
    const pauseButton = document.querySelector('.slide-pause');
    const previousButton = document.querySelector('.slide-prev');
    const nextButton = document.querySelector('.slide-next');
    const counter = document.querySelector('.slide-number');
    const caption = document.querySelector('.slide-credit');
    const trailLayer = document.querySelector('.cursor-trail');

    let settings;
    let motionOverride = null;
    let scrollFramePending = false;
    let activeChapter = -1;
    let heroVisible = true;
    let slideshowReady = false;
    let pausedByUser = false;
    let currentSlide = 0;
    let slideTimer = null;
    let slideDeadline = 0;
    let slideRemaining = 10000;
    const slideElements = [];
    const zoomAnimations = [];
    const trailPool = [];
    let trailIndex = 0;
    let pointerFramePending = false;
    let lastPoint = null;
    let lastPointTime = 0;
    const pointer = { x: 0, y: 0, active: false };

    const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
    const smooth = value => value * value * (3 - 2 * value);
    const motionReduced = () => motionOverride === null ? reducedQuery.matches : motionOverride;

    function readSettings() {
        const css = getComputedStyle(root);
        const number = (name, fallback, min, max) => {
            const parsed = parseFloat(css.getPropertyValue(name));
            return clamp(Number.isFinite(parsed) ? parsed : fallback, min, max);
        };
        const fade = number('--slideshow-fade', 1400, 0, 3000);
        settings = {
            hold: Math.max(number('--slideshow-hold', 10000, 3000, 60000), fade + 1000),
            fade,
            zoom: number('--ken-burns-scale', 1.14, 1, 1.4),
            imageIn: number('--image-enter-range', .9, .1, 1),
            imageOut: number('--image-exit-range', .85, .1, 1),
            textInStart: number('--text-in-start', .45, 0, .9),
            textOutEnd: number('--text-out-end', .45, .1, 1),
            cursorSize: number('--cursor-size', 14, 4, 100),
            cursorOpacity: number('--cursor-opacity', .28, 0, 1),
            cursorLifetime: number('--cursor-lifetime', 500, 150, 3000),
            cursorSpacing: number('--cursor-spacing', 3, 2, 50),
            cursorColors: ['--red', '--rose', '--navy'].map((name, index) =>
                css.getPropertyValue(name).trim() || ['#9c4258', '#d5a0ac', '#293b56'][index])
        };
    }

    // Scroll effects follow position and reverse naturally when scrolling up.
    // Text stays vertically stationary on desktop; mobile uses ordinary flow.
    function updateScroll() {
        scrollFramePending = false;
        const viewport = scroller.getBoundingClientRect();
        const height = scroller.clientHeight;
        if (!height) return;
        const geometry = panels.map(panel => panel.getBoundingClientRect());
        let nearest = 0;
        let mostVisible = -1;
        const reduced = motionReduced();

        geometry.forEach((rect, index) => {
            const top = rect.top - viewport.top;
            const visible = Math.max(0, Math.min(top + rect.height, height) - Math.max(0, top));
            if (visible > mostVisible) { nearest = index; mostVisible = visible; }
            if (panels[index] === hero) heroVisible = visible > height * .15;
            const copy = panels[index].querySelector('.panel-text');
            panels[index].classList.toggle('is-long-panel', Boolean(copy && copy.offsetHeight > height - 200));
            if (reduced) return;
            const exitOffset = Math.max(0, rect.height - height);
            const imageIn = smooth(clamp((height - top) / (height * settings.imageIn)));
            const imageOut = smooth(clamp((-top - exitOffset) / (height * settings.imageOut)));
            const textIn = smooth(clamp(((height - top) / height - settings.textInStart) / (1 - settings.textInStart)));
            const textOut = smooth(clamp((-top - exitOffset) / (height * settings.textOutEnd)));
            const style = panels[index].style;
            style.setProperty('--picture-in', imageIn.toFixed(4));
            style.setProperty('--picture-out', imageOut.toFixed(4));
            style.setProperty('--text-in', textIn.toFixed(4));
            style.setProperty('--text-out', textOut.toFixed(4));
            style.setProperty('--text-pin', clamp(-top, -height, Math.max(height, rect.height)).toFixed(2) + 'px');
        });

        if (nearest !== activeChapter) {
            activeChapter = nearest;
            navLinks.forEach(link => {
                if (link.hash === '#' + panels[nearest].id) link.setAttribute('aria-current', 'location');
                else link.removeAttribute('aria-current');
            });
            root.classList.toggle('on-hero', panels[nearest] === hero);
        }
        syncSlideshow();
    }

    function scheduleScroll() {
        if (scrollFramePending) return;
        scrollFramePending = true;
        requestAnimationFrame(updateScroll);
    }

    function goTo(panel, remember = true) {
        panel.scrollIntoView({ behavior: motionReduced() ? 'auto' : 'smooth', block: 'start' });
        if (remember && location.hash !== '#' + panel.id) {
            try { history.pushState(null, '', '#' + panel.id); } catch (_) { /* file:// fallback */ }
        }
        scroller.focus({ preventScroll: true });
        scheduleScroll();
    }

    document.addEventListener('click', event => {
        const link = event.target.closest('a[href^="#"]');
        if (!link || event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        const panel = panels.find(item => '#' + item.id === link.hash);
        if (!panel) return;
        event.preventDefault();
        goTo(panel);
    });

    function goToHash() {
        const panel = location.hash ? panels.find(item => '#' + item.id === location.hash) : panels[0];
        if (panel) goTo(panel, false);
    }

    // KEN BURNS PLAYLIST. Each active image receives a fresh, one-way slow zoom.
    // Pausing freezes both the zoom and the slide clock at their current points.
    function canPlay() {
        return slideshowReady && !pausedByUser && !motionReduced() && heroVisible && !document.hidden;
    }

    function stopSlideClock() {
        if (slideTimer === null) return;
        clearTimeout(slideTimer);
        slideTimer = null;
        slideRemaining = Math.max(0, slideDeadline - performance.now());
    }

    function startZoom(index) {
        const item = slideElements[index];
        if (!item) return;
        if (zoomAnimations[index]) zoomAnimations[index].cancel();
        zoomAnimations[index] = null;
        if (motionReduced() || typeof item.image.animate !== 'function') return;
        const direction = IMAGE_PLAYLIST[index].pan === 1 ? 1 : -1;
        const animation = item.image.animate(
            [
                { transform: 'scale(1) translate3d(0, 0, 0)' },
                { transform: 'scale(' + settings.zoom + ') translate3d(' + direction + '%, -.5%, 0)' }
            ],
            { duration: settings.hold + settings.fade, easing: 'linear', fill: 'forwards' }
        );
        zoomAnimations[index] = animation;
        if (!canPlay()) animation.pause();
    }

    function syncSlideshow() {
        if (!slideshowReady) return;
        const playing = canPlay();
        zoomAnimations.forEach((animation, index) => {
            if (!animation) return;
            if (playing && index === currentSlide && animation.playState !== 'finished') animation.play();
            else animation.pause();
        });
        if (!playing) stopSlideClock();
        else if (slideElements.length > 1 && slideTimer === null) {
            slideDeadline = performance.now() + slideRemaining;
            slideTimer = setTimeout(() => {
                slideTimer = null;
                showSlide(currentSlide + 1);
            }, slideRemaining);
        }
        if (pauseButton) {
            pauseButton.disabled = motionReduced();
            pauseButton.textContent = motionReduced() ? text('ui.motion_paused') : pausedByUser ? text('ui.play_slideshow') : text('ui.pause_slideshow');
            pauseButton.setAttribute('aria-pressed', String(pausedByUser || motionReduced()));
        }
    }

    function showSlide(requestedIndex) {
        if (!slideElements.length) return;
        stopSlideClock();
        currentSlide = (requestedIndex % slideElements.length + slideElements.length) % slideElements.length;
        slideElements.forEach((item, index) => item.slide.classList.toggle('is-current', index === currentSlide));
        const entry = IMAGE_PLAYLIST[currentSlide];
        if (counter) counter.textContent = String(currentSlide + 1).padStart(2, '0') + ' / ' + String(slideElements.length).padStart(2, '0');
        if (caption) {
            caption.removeAttribute('data-text');
            caption.removeAttribute('data-content-href');
            caption.textContent = text(entry.captionKey);
            const creditURL = window.DispatchContent.safeURL(text(entry.creditKey));
            if (creditURL) caption.href = creditURL; else caption.removeAttribute('href');
        }
        slideRemaining = settings.hold;
        startZoom(currentSlide);
        syncSlideshow();
    }

    function setupSlideshow() {
        if (!stage || !IMAGE_PLAYLIST.length) return;
        stage.replaceChildren();
        IMAGE_PLAYLIST.forEach((entry, index) => {
            const slide = document.createElement('div');
            slide.className = 'hero-slide' + (entry.layout === 'portrait' ? ' is-portrait' : '');
            const image = document.createElement('img');
            image.alt = '';
            image.decoding = 'async';
            image.style.objectPosition = entry.position || '50% 50%';
            if (index === 0) image.fetchPriority = 'high';
            image.addEventListener('error', () => { image.hidden = true; });
            image.src = entry.src;
            slide.appendChild(image);
            stage.appendChild(slide);
            slideElements.push({ slide, image });
        });
        slideshowReady = true;
        if (controls) controls.hidden = false;
        if (previousButton) previousButton.disabled = slideElements.length < 2;
        if (nextButton) nextButton.disabled = slideElements.length < 2;
        showSlide(0);
    }

    if (previousButton) previousButton.addEventListener('click', () => showSlide(currentSlide - 1));
    if (nextButton) nextButton.addEventListener('click', () => showSlide(currentSlide + 1));
    if (pauseButton) pauseButton.addEventListener('click', () => {
        pausedByUser = !pausedByUser;
        syncSlideshow();
    });
    document.addEventListener('visibilitychange', syncSlideshow);

    function applyMotion() {
        const reduced = motionReduced();
        root.classList.toggle('motion-on', !reduced);
        root.classList.toggle('motion-reduced', reduced);
        if (motionButton) {
            motionButton.hidden = false;
            motionButton.textContent = reduced ? text('ui.enable_motion') : text('ui.reduce_motion');
            motionButton.setAttribute('aria-pressed', String(reduced));
        }
        if (reduced) {
            clearTrail();
            zoomAnimations.forEach((animation, index) => {
                if (animation) animation.cancel();
                zoomAnimations[index] = null;
            });
        } else if (slideshowReady && !zoomAnimations[currentSlide]) startZoom(currentSlide);
        scheduleScroll();
        syncSlideshow();
    }
    if (motionButton) motionButton.addEventListener('click', () => {
        motionOverride = !motionReduced();
        applyMotion();
    });
    reducedQuery.addEventListener('change', applyMotion);

    // Small 14px trail, recolored to rose/red/navy. No separate wide spotlight.
    // A bounded pool of elements fades natively; no JavaScript idle loop.
    function clearTrail() {
        trailPool.forEach(point => { if (point.animation) point.animation.cancel(); });
        lastPoint = null;
    }
    function emitTrail(x, y) {
        if (!trailLayer || motionReduced()) return;
        const slot = trailIndex % 64;
        let point = trailPool[slot];
        if (!point) {
            const element = document.createElement('span');
            element.className = 'cursor-light';
            trailLayer.appendChild(element);
            point = { element, animation: null };
            trailPool[slot] = point;
        }
        if (typeof point.element.animate !== 'function') return;
        if (point.animation) point.animation.cancel();
        point.element.style.width = settings.cursorSize + 'px';
        point.element.style.height = settings.cursorSize + 'px';
        point.element.style.setProperty('--cursor-color', settings.cursorColors[Math.floor(trailIndex / 3) % settings.cursorColors.length]);
        point.element.style.transform = 'translate3d(' + x.toFixed(1) + 'px, ' + y.toFixed(1) + 'px, 0) translate(-50%, -50%)';
        point.animation = point.element.animate(
            [{ opacity: settings.cursorOpacity }, { opacity: 0 }],
            { duration: settings.cursorLifetime, easing: 'ease-out', fill: 'none' }
        );
        trailIndex++;
    }
    function paintPointer(now) {
        pointerFramePending = false;
        if (!pointer.active || motionReduced()) { lastPoint = null; return; }
        if (!lastPoint) emitTrail(pointer.x, pointer.y);
        else {
            const dx = pointer.x - lastPoint.x;
            const dy = pointer.y - lastPoint.y;
            const distance = Math.hypot(dx, dy);
            if (distance < settings.cursorSpacing && now - lastPointTime < 65) return;
            const steps = Math.min(32, Math.max(1, Math.ceil(distance / settings.cursorSpacing)));
            for (let step = 1; step <= steps; step++) {
                emitTrail(lastPoint.x + dx * step / steps, lastPoint.y + dy * step / steps);
            }
        }
        lastPoint = { x: pointer.x, y: pointer.y };
        lastPointTime = now;
    }
    document.addEventListener('pointermove', event => {
        if (event.pointerType !== 'mouse') return;
        pointer.x = clamp(event.clientX, 0, window.innerWidth);
        pointer.y = clamp(event.clientY, 0, window.innerHeight);
        pointer.active = true;
        if (!pointerFramePending) {
            pointerFramePending = true;
            requestAnimationFrame(paintPointer);
        }
    }, { passive: true });
    const hidePointer = () => { pointer.active = false; lastPoint = null; };
    root.addEventListener('pointerleave', hidePointer);
    window.addEventListener('blur', hidePointer);

    scroller.addEventListener('scroll', scheduleScroll, { passive: true });
    window.addEventListener('resize', () => { readSettings(); clearTrail(); scheduleScroll(); });
    window.addEventListener('popstate', goToHash);
    window.addEventListener('hashchange', goToHash);
    window.addEventListener('load', () => { goToHash(); scheduleScroll(); });
    if ('ResizeObserver' in window) {
        const observer = new ResizeObserver(scheduleScroll);
        panels.forEach(panel => observer.observe(panel));
    }
    if (document.fonts) document.fonts.ready.then(scheduleScroll);

    document.addEventListener('dispatch:content', () => {
        if (caption && IMAGE_PLAYLIST[currentSlide]) {
            const entry = IMAGE_PLAYLIST[currentSlide];
            caption.textContent = text(entry.captionKey);
            const creditURL = window.DispatchContent.safeURL(text(entry.creditKey));
            if (creditURL) caption.href = creditURL; else caption.removeAttribute('href');
        }
        applyMotion();
        scheduleScroll();
    });
    scroller.addEventListener('toggle', scheduleScroll, true);

    readSettings();
    applyMotion();
    setupSlideshow();
    updateScroll();
})();
