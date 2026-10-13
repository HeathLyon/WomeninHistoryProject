/* Copy ALL of this file into script.js beside index.html and styles.css.
   This is plain JavaScript — no packages or build step needed.

   CUSTOMIZE:
   - Fonts, blur strength, five gradient colors, mouse trail and scroll timing:
     styles.css :root variables.
   - Per-slide effects: data-text-effect and data-image-effect in index.html.
   - Wheel/touch scrolling is native. Animation follows scroll position,
     reverses when scrolling up, and runs once per browser animation frame.
*/
(() => {
  'use strict';

  const scroller = document.querySelector('.presentation');
  if (!scroller) return;
  const panels = Array.from(scroller.querySelectorAll('.panel'));
  if (!panels.length) return;
  const links = Array.from(document.querySelectorAll('.section-nav a'));
  const motionButton = document.querySelector('.motion-toggle');
  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const root = document.documentElement;
  let userMotionPreference = null;
  let framePending = false;
  let currentIndex = -1;
  let settings;

  const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
  const smoothstep = value => value * value * (3 - 2 * value);

  // Read CSS timing controls on startup and resize, not every scroll event.
  function readSettings() {
    const css = getComputedStyle(root);
    const number = (name, fallback, min, max) => {
      const value = parseFloat(css.getPropertyValue(name));
      return clamp(Number.isFinite(value) ? value : fallback, min, max);
    };
    settings = {
      textEnterRange: number('--text-enter-range', .85, .1, 1),
      textExitRange: number('--text-exit-range', .9, .1, 1),
      textFadeStart: number('--text-fade-start', .4, 0, .9),
      textOutEnd: number('--text-out-end', .45, .1, 1),
      textInStart: number('--text-in-start', .45, 0, .9),
      imageDelay: number('--image-delay', .18, 0, .9),
      imageExitRange: number('--image-exit-range', .8, .1, 1),
      gradientScrollX: number('--gradient-scroll-x', 160, -600, 600),
      gradientScrollY: number('--gradient-scroll-y', 100, -600, 600),
      trailSize: number('--trail-size', 14, 4, 200),
      trailOpacity: number('--trail-opacity', .50, 0, 1),
      trailLifetime: number('--trail-lifetime', 500, 150, 5000),
      trailSpacing: number('--trail-spacing', 3, 2, 100),
      trailMaxPoints: Math.round(number('--trail-max-points', 64, 8, 64)),
      trailColors: ['purple', 'blue', 'cyan', 'magenta', 'amber'].map((name, index) =>
        css.getPropertyValue('--gradient-' + name).trim() || ['#6d2cbb', '#125db1', '#24b6c7', '#b43dca', '#bf7548'][index])
    };
  }

  function motionIsReduced() {
    return userMotionPreference === null ? reducedMotionQuery.matches : userMotionPreference;
  }

  function syncMotion() {
    const reduced = motionIsReduced();
    root.classList.toggle('js-motion', !reduced);
    root.classList.toggle('motion-reduced', reduced);
    if (motionButton) {
      motionButton.hidden = false;
      motionButton.setAttribute('aria-pressed', String(reduced));
      motionButton.textContent = reduced ? 'Enable motion' : 'Reduce motion';
    }
    scheduleUpdate();
    if (reduced) clearTrail();
  }

  function setCurrent(index) {
    if (index === currentIndex) return;
    currentIndex = index;
    links.forEach(link => {
      if (link.hash === '#' + panels[index].id) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }

  function update() {
    framePending = false;
    const viewport = scroller.getBoundingClientRect();
    const height = scroller.clientHeight;
    if (!height) return;
    const reduced = motionIsReduced();
    const scrollRange = Math.max(1, scroller.scrollHeight - height);
    const scrollProgress = clamp(scroller.scrollTop / scrollRange);
    root.style.setProperty('--bg-scroll-x', reduced ? '0px' : (scrollProgress * settings.gradientScrollX).toFixed(2) + 'px');
    root.style.setProperty('--bg-scroll-y', reduced ? '0px' : (-scrollProgress * settings.gradientScrollY).toFixed(2) + 'px');
    let nearestIndex = 0;
    let greatestVisibleHeight = -1;

    // Read all geometry before writing styles to avoid layout thrashing.
    const positions = panels.map(panel => panel.getBoundingClientRect());
    positions.forEach((rect, index) => {
      const top = rect.top - viewport.top;
      const visibleHeight = Math.max(0, Math.min(top + rect.height, height) - Math.max(top, 0));
      if (visibleHeight > greatestVisibleHeight) {
        greatestVisibleHeight = visibleHeight;
        nearestIndex = index;
      }
      if (reduced) return;

      const entering = clamp((height - top) / (height * settings.textEnterRange));
      // A tall slide stays fully visible until its last viewport of content.
      const exitOffset = Math.max(0, rect.height - height);
      const leaving = clamp((-top - exitOffset) / (height * settings.textExitRange));
      const textIn = smoothstep(clamp(((height - top) / height - settings.textInStart) / (1 - settings.textInStart)));
      const textOut = smoothstep(clamp((-top - exitOffset) / (height * settings.textOutEnd)));
      const textFade = clamp((leaving - settings.textFadeStart) / (1 - settings.textFadeStart));
      // Cancel the slide's vertical movement for BOTH incoming and outgoing
      // text. Pictures stay in normal page flow and move with the scroll.
      // After a slide finishes fading, it can leave the viewport normally.
      const textPin = clamp(-top, -height, Math.max(height, rect.height));
      const imageReveal = clamp((entering - settings.imageDelay) / (1 - settings.imageDelay));
      const imageLeave = clamp((-top - exitOffset) / (height * settings.imageExitRange));
      const style = panels[index].style;
      style.setProperty('--enter', entering.toFixed(4));
      style.setProperty('--leave', leaving.toFixed(4));
      style.setProperty('--text-in', textIn.toFixed(4));
      style.setProperty('--text-out', textOut.toFixed(4));
      style.setProperty('--text-opacity', (entering * (1 - textFade)).toFixed(4));
      style.setProperty('--text-pin-y', textPin.toFixed(2) + 'px');
      style.setProperty('--image-reveal', imageReveal.toFixed(4));
      style.setProperty('--image-leave', imageLeave.toFixed(4));
    });
    setCurrent(nearestIndex);
  }

  function scheduleUpdate() {
    if (framePending) return;
    framePending = true;
    requestAnimationFrame(update);
  }

  // All internal section links share one navigation path. pushState records
  // the hash without triggering the browser's separate anchor scrolling.
  function goTo(panel, recordHistory = true) {
    panel.scrollIntoView({ behavior: motionIsReduced() ? 'auto' : 'smooth', block: 'start' });
    if (recordHistory && location.hash !== '#' + panel.id) {
      try { history.pushState(null, '', '#' + panel.id); } catch (_) { /* file:// fallback */ }
    }
    scroller.focus({ preventScroll: true });
    scheduleUpdate();
  }

  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const panel = panels.find(item => '#' + item.id === link.hash);
    if (!panel) return; // Preserve the skip link's normal focus behavior.
    event.preventDefault();
    goTo(panel);
  });

  // Keyboard navigation when the presentation itself is focused. Tab and
  // keys used by links, buttons, and form fields keep their normal behavior.
  scroller.addEventListener('keydown', event => {
    if (event.target !== scroller || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return;
    const current = Math.max(0, currentIndex);
    let next;
    if (event.key === 'ArrowDown' || event.key === 'PageDown') next = Math.min(current + 1, panels.length - 1);
    if (event.key === 'ArrowUp' || event.key === 'PageUp') next = Math.max(current - 1, 0);
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = panels.length - 1;
    if (next === undefined) return;
    // Let the browser scroll through long slides before changing sections.
    const rect = panels[current].getBoundingClientRect();
    const viewport = scroller.getBoundingClientRect();
    if ((event.key === 'ArrowDown' || event.key === 'PageDown') && rect.bottom > viewport.bottom + 2) return;
    if ((event.key === 'ArrowUp' || event.key === 'PageUp') && rect.top < viewport.top - 2) return;
    event.preventDefault();
    goTo(panels[next]);
  });

  if (motionButton) motionButton.addEventListener('click', () => {
    userMotionPreference = !motionIsReduced();
    syncMotion();
  });

  // The light is painted behind the content and never captures clicks.
  // Mouse updates use their own frame so pointer movement does not recalculate
  // slide geometry. Each light fades using the browser's animation engine;
  // JavaScript stops doing pointer work as soon as the mouse stops moving.
  let pointerFramePending = false;
  const pointer = { x: 0, y: 0, active: false };
  const trailLayer = document.querySelector('.ambient-trail');
  // Disable the old broad spotlight even if an older stylesheet is cached.
  const oldSpotlight = document.querySelector('.ambient-spotlight');
  if (oldSpotlight) oldSpotlight.style.display = 'none';
  const trailPool = [];
  let trailPoolIndex = 0;
  let trailColorIndex = 0;
  let lastTrailPoint = null;
  let lastTrailTime = 0;

  function clearTrail() {
    trailPool.forEach(point => { if (point.animation) point.animation.cancel(); });
    lastTrailPoint = null;
  }
  function emitTrail(x, y) {
    if (!trailLayer || motionIsReduced()) return;
    const index = trailPoolIndex % settings.trailMaxPoints;
    let point = trailPool[index];
    if (!point) {
      const element = document.createElement('span');
      element.className = 'trail-glow';
      trailLayer.appendChild(element);
      point = { element, animation: null };
      trailPool[index] = point;
    }
    if (typeof point.element.animate !== 'function') return;
    if (point.animation) point.animation.cancel();
    const color = settings.trailColors[Math.floor(trailColorIndex / 3) % settings.trailColors.length];
    point.element.style.setProperty('--trail-color', color);
    point.element.style.width = settings.trailSize + 'px';
    point.element.style.height = settings.trailSize + 'px';
    point.element.style.transform = 'translate3d(' + x.toFixed(1) + 'px, ' + y.toFixed(1) + 'px, 0) translate(-50%, -50%)';
    point.animation = point.element.animate(
      [{ opacity: settings.trailOpacity }, { opacity: 0 }],
      { duration: settings.trailLifetime, easing: 'ease-out', fill: 'none' }
    );
    trailPoolIndex++;
    trailColorIndex++;
  }
  function stampTrail(now) {
    if (!pointer.active || motionIsReduced()) { lastTrailPoint = null; return; }
    if (!lastTrailPoint) {
      emitTrail(pointer.x, pointer.y);
    } else {
      const dx = pointer.x - lastTrailPoint.x;
      const dy = pointer.y - lastTrailPoint.y;
      const distance = Math.hypot(dx, dy);
      if (distance < settings.trailSpacing && now - lastTrailTime < 65) return;
      // Fill between mouse positions to create a continuous soft light trail.
      // Limit work for sudden jumps or a returning cursor.
      const steps = Math.min(32, Math.max(1, Math.ceil(distance / settings.trailSpacing)));
      for (let step = 1; step <= steps; step++) {
        const fraction = step / steps;
        emitTrail(lastTrailPoint.x + dx * fraction, lastTrailPoint.y + dy * fraction);
      }
    }
    lastTrailPoint = { x: pointer.x, y: pointer.y };
    lastTrailTime = now;
  }
  function paintPointer(now) {
    pointerFramePending = false;
    root.style.setProperty('--pointer-x', pointer.x.toFixed(1) + 'px');
    root.style.setProperty('--pointer-y', pointer.y.toFixed(1) + 'px');
    root.style.setProperty('--pointer-active', pointer.active ? '1' : '0');
    stampTrail(now);
  }
  function schedulePointer() {
    if (pointerFramePending) return;
    pointerFramePending = true;
    requestAnimationFrame(paintPointer);
  }
  document.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse') return;
    pointer.x = clamp(event.clientX, 0, window.innerWidth);
    pointer.y = clamp(event.clientY, 0, window.innerHeight);
    pointer.active = true;
    schedulePointer();
  }, { passive: true });
  const hidePointer = () => { pointer.active = false; lastTrailPoint = null; schedulePointer(); };
  root.addEventListener('pointerleave', hidePointer);
  window.addEventListener('blur', hidePointer);

  reducedMotionQuery.addEventListener('change', syncMotion);
  scroller.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', () => { readSettings(); clearTrail(); scheduleUpdate(); });
  const goToHash = () => {
    const panel = location.hash ? panels.find(item => '#' + item.id === location.hash) : panels[0];
    if (panel) goTo(panel, false);
  };
  window.addEventListener('popstate', goToHash);
  window.addEventListener('hashchange', goToHash);
  window.addEventListener('load', () => { goToHash(); scheduleUpdate(); });
  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(scheduleUpdate);
    panels.forEach(panel => observer.observe(panel));
  }
  if (document.fonts) document.fonts.ready.then(scheduleUpdate);

  readSettings();
  syncMotion();
  update();
})();