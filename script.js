/* Save as script.js beside index.html and styles.css.
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
            caption: 'Declaration of Independence — John Trumbull, 1819',
            credit: 'https://commons.wikimedia.org/wiki/File:Declaration_of_Independence_(1819),_by_John_Trumbull.jpg',
            position: '50% 50%',
            layout: 'wide',
            pan: -1
        },
        {
            src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ac/Abigail_Adams_by_Gilbert_Stuart.jpg/960px-Abigail_Adams_by_Gilbert_Stuart.jpg',
            caption: 'Abigail Smith Adams — Gilbert Stuart',
            credit: 'https://commons.wikimedia.org/wiki/File:Abigail_Adams_by_Gilbert_Stuart.jpg',
            position: '50% 20%',
            layout: 'portrait',
            pan: 1
        },
        {
            src: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Mercy_Otis_Warren.jpg',
            caption: 'Mercy Otis Warren — John Singleton Copley',
            credit: 'https://commons.wikimedia.org/wiki/File:Mercy_Otis_Warren.jpg',
            position: '50% 22%',
            layout: 'portrait',
            pan: -1
        }
    ];

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
            pauseButton.textContent = motionReduced() ? 'Motion paused' : pausedByUser ? 'Play slideshow' : 'Pause slideshow';
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
            caption.textContent = entry.caption || 'Image ' + (currentSlide + 1);
            caption.href = entry.credit || entry.src;
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
            motionButton.textContent = reduced ? 'Enable motion' : 'Reduce motion';
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

    readSettings();
    applyMotion();
    setupSlideshow();
    updateScroll();
})();