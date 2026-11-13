/**
 * WANDERS CINEMATIC MOTION SYSTEM V2
 * Choreographed scroll reveals, image mask curtains, staggered grids,
 * GPU parallax & magnetic button feedback.
 */
(function () {
  'use strict';

  window.__wandersMotionBooted = true;

  var reducedMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var REVEAL_SELECTOR = [
    '.w-reveal',
    '.w-reveal-img',
    '.wm-eyebrow',
    '.wm-gold-rule',
    '.wm-heading',
    '.wm-desc',
    '.wm-card',
    '.wm-product-card',
    '.wm-img-frame',
    '.wm-explorer-group',
    '.wm-explorer-swatch',
    '.wm-step-item',
    '.w-about-philo-item',
    '.w-about-sol-row',
    '.w-about-value-item',
    'footer.w-footer',
  ].join(', ');

  function revealHero() {
    document.documentElement.classList.add('wi-hero-enter');
    var v = document.querySelector('.w-hero-video');
    if (v && v.paused) {
      try { v.play(); } catch (e) {}
    }
  }

  function initHeroSync() {
    var html = document.documentElement;
    var hasIntro =
      !!document.getElementById('wanders-intro') && html.classList.contains('wi-active');
    if (!hasIntro) {
      requestAnimationFrame(revealHero);
      return;
    }

    window.addEventListener('wanders:intro-wipe', revealHero, { once: true });
    window.addEventListener('wanders:intro-done', revealHero, { once: true });

    setTimeout(function () {
      if (!html.classList.contains('wi-active')) {
        revealHero();
      }
    }, 5300);
  }

  function initHeaderHeightSync() {
    var header = document.querySelector('header.w-header');
    if (!header) return;
    function sync() {
      var rect = header.getBoundingClientRect();
      var h = rect.height;
      if (h > 0) {
        document.documentElement.style.setProperty('--header-height', Math.round(h) + 'px');
      }
    }
    sync();
    window.addEventListener('resize', sync, { passive: true });
    if (typeof ResizeObserver !== 'undefined') {
      try {
        new ResizeObserver(sync).observe(header);
      } catch (e) {}
    }
  }

  function initStickyHeader() {
    var header = document.querySelector('header.w-header');
    if (!header) return;
    function update() {
      if (window.scrollY > 12) {
        header.classList.add('w-header--scrolled');
      } else {
        header.classList.remove('w-header--scrolled');
      }
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  function detectSectionCurtainColor(el) {
    var custom = el.getAttribute('data-wm-curtain');
    if (custom === 'forest') return '#073B2E';
    if (custom === 'white') return '#FFFFFF';
    if (custom === 'ivory') return '#F6F3EC';
    var sec = el.closest('section');
    if (!sec) return '#F6F3EC';
    if (sec.classList.contains('w-forest-story') || sec.classList.contains('w-cta-band')) {
      return '#073B2E';
    }
    if (sec.classList.contains('w-bg-white')) return '#FFFFFF';
    return '#F6F3EC';
  }

  function injectCurtainFrame(frameEl) {
    if (!frameEl || frameEl.closest('#wandersLightbox')) return;
    frameEl.classList.add('wm-img-frame');
    frameEl.style.setProperty('--wm-curtain-bg', detectSectionCurtainColor(frameEl));
    if (!frameEl.querySelector(':scope > .wm-curtain')) {
      var curtain = document.createElement('span');
      curtain.className = 'wm-curtain';
      curtain.setAttribute('aria-hidden', 'true');
      frameEl.appendChild(curtain);
    }
  }

  function stripParentRevealWrapper(el) {
    if (!el) return;
    el.classList.remove('w-reveal', 'w-reveal-delay-1', 'w-reveal-delay-2', 'w-reveal-delay-3');
  }

  function prepareMotionChoreography() {
    var main = document.querySelector('main');
    if (!main) return;

    var sections = Array.prototype.slice.call(main.querySelectorAll('section'));
    sections.forEach(function (sec) {
      if (sec.classList.contains('w-hero-section') || sec.classList.contains('color-hero-section') || sec.classList.contains('w-about-hero')) {
        if (sec.classList.contains('w-about-hero')) {
          requestAnimationFrame(function () { sec.classList.add('is-ready'); });
        }
        var heroBg = sec.querySelector('.absolute.inset-0 > span, .w-about-hero-bg > span');
        if (heroBg && !heroBg.hasAttribute('data-wm-parallax')) {
          heroBg.setAttribute('data-wm-parallax', '0.16');
        }
        return;
      }

      // Promote heading + eyebrow + lead description inside headers
      var headings = Array.prototype.slice.call(
        sec.querySelectorAll('h2.w-section-title, h2.w-subhero-title, h1.w-subhero-title, h2.w-about-h2')
      );
      headings.forEach(function (h) {
        if (h.closest('#wandersLightbox')) return;
        var revealWrap = h.closest('.w-reveal');
        if (revealWrap) stripParentRevealWrapper(revealWrap);

        h.classList.add('wm-heading');
        h.style.setProperty('--wm-delay', '50ms');

        var headerContainer = h.parentElement;
        if (headerContainer) {
          var eyebrow = headerContainer.querySelector('.w-eyebrow');
          if (eyebrow) {
            eyebrow.classList.add('wm-eyebrow');
            eyebrow.style.setProperty('--wm-delay', '0ms');
          }
          var goldRule = headerContainer.querySelector('.w-gold-rule');
          if (goldRule) {
            goldRule.classList.add('wm-gold-rule');
            goldRule.style.setProperty('--wm-delay', '150ms');
          }
          // Description paragraph in same column or sibling column of section header row
          var siblingDesc = null;
          if (headerContainer.parentElement) {
            siblingDesc = Array.prototype.find.call(
              headerContainer.parentElement.children,
              function (ch) {
                return ch !== headerContainer && ch.tagName === 'P';
              }
            );
            if (!siblingDesc) {
              var rightCol = Array.prototype.find.call(
                headerContainer.parentElement.children,
                function (ch) {
                  return ch !== headerContainer && ch.tagName === 'DIV' && ch.querySelector('p');
                }
              );
              if (rightCol && rightCol.closest('.flex')) {
                siblingDesc = rightCol.querySelector('p');
              }
            }
          }
          var innerDesc = h.nextElementSibling && h.nextElementSibling.tagName === 'P'
            ? h.nextElementSibling
            : (headerContainer.querySelector('h2 ~ p'));
          [siblingDesc, innerDesc].forEach(function (d) {
            if (d && !d.classList.contains('w-eyebrow')) {
              d.classList.add('wm-desc');
              d.style.setProperty('--wm-delay', '200ms');
            }
          });
        }
      });

      // Architectural cards (Paint Collections, Project Journal, Related projects)
      var archCards = Array.prototype.slice.call(sec.querySelectorAll('a.w-arch-card'));
      archCards.forEach(function (card) {
        var wrap = card.closest('.w-reveal');
        if (wrap) stripParentRevealWrapper(wrap);
        card.classList.add('wm-card');
      });

      // Project detail gallery buttons
      var galleryBtns = Array.prototype.slice.call(
        sec.querySelectorAll('[data-wanders-gallery] button[data-gallery-src]')
      );
      galleryBtns.forEach(function (btn) {
        var wrap = btn.closest('.w-reveal');
        if (wrap) stripParentRevealWrapper(wrap);
        btn.classList.add('wm-card');
      });

      // Product cards
      var productCards = Array.prototype.slice.call(sec.querySelectorAll('.sp-product-card'));
      productCards.forEach(function (pc) {
        var wrap = pc.closest('.w-reveal');
        if (wrap) stripParentRevealWrapper(wrap);
        pc.classList.add('wm-product-card');
      });

      // Color Explorer & Living with Colour photo frames -> Curtain reveal
      var expFrames = Array.prototype.slice.call(sec.querySelectorAll('.w-explorer-frame'));
      expFrames.forEach(function (frame) {
        var gridWrap = frame.closest('.w-reveal');
        if (gridWrap) stripParentRevealWrapper(gridWrap);
        var photoSlot = frame.querySelector(':scope > span:first-child');
        if (photoSlot) injectCurtainFrame(photoSlot);
      });

      // Explicit curtain frames & Brand Story / Gioi-thieu showcase photos
      var explicitFrames = Array.prototype.slice.call(
        sec.querySelectorAll('.wm-img-frame, figure .overflow-hidden, .w-forest-story .overflow-hidden')
      );
      explicitFrames.forEach(function (fr) {
        var outerWrap = fr.closest('.w-reveal');
        if (outerWrap && outerWrap.querySelectorAll('img').length <= 2) {
          stripParentRevealWrapper(outerWrap);
        }
        injectCurtainFrame(fr);
      });

      // Numbered list items, Philosophy rows, Solutions rows, Value pillars -> wm-step-item
      var stepItems = Array.prototype.slice.call(
        sec.querySelectorAll('ol > li, .w-about-philo-item, .w-about-sol-row, .w-about-value-item')
      );
      stepItems.forEach(function (item) {
        var wrap = item.closest('.w-reveal');
        if (wrap && wrap.querySelectorAll('h2').length === 0) {
          stripParentRevealWrapper(wrap);
        }
        item.classList.add('wm-step-item');
      });
    });

    // Color Explorer Group List + Initial Swatches
    var groupBtns = Array.prototype.slice.call(
      document.querySelectorAll('#explorerGroupList > button')
    );
    groupBtns.forEach(function (btn) {
      btn.classList.add('wm-explorer-group');
    });
    var swatchBtns = Array.prototype.slice.call(
      document.querySelectorAll('#explorerSwatchGrid > button')
    );
    swatchBtns.forEach(function (btn) {
      btn.classList.add('wm-explorer-swatch');
    });
  }

  function initScrollReveals() {
    var footer = document.querySelector('footer.w-footer');

    function collectTargets() {
      return Array.prototype.slice.call(document.querySelectorAll(REVEAL_SELECTOR));
    }

    var allEls = collectTargets();
    if (!allEls.length) return;

    if (reducedMotion) {
      document.documentElement.classList.remove('w-motion-ready');
      allEls.forEach(function (el) {
        el.classList.add('is-revealed');
      });
      return;
    }

    function isHiddenByFilter(el) {
      return el.offsetParent === null && getComputedStyle(el).position !== 'fixed';
    }

    function computeStepDelay(el, batchCounter) {
      if (el.style.getPropertyValue('--wm-delay')) return el.style.getPropertyValue('--wm-delay');
      if (el.classList.contains('wm-card')) return (Math.min(batchCounter, 7) * 130) + 'ms';
      if (el.classList.contains('wm-product-card')) return (Math.min(batchCounter, 7) * 100) + 'ms';
      if (el.classList.contains('wm-explorer-group')) return (Math.min(batchCounter, 5) * 90) + 'ms';
      if (el.classList.contains('wm-explorer-swatch')) return (140 + Math.min(batchCounter, 8) * 48) + 'ms';
      if (el.classList.contains('wm-step-item')) return (Math.min(batchCounter, 5) * 110) + 'ms';
      return '0ms';
    }

    function revealBatch(targets) {
      if (!targets.length) return;
      // Sort top-to-bottom, left-to-right for natural wave choreography
      targets.sort(function (a, b) {
        var ra = a.getBoundingClientRect();
        var rb = b.getBoundingClientRect();
        if (Math.abs(ra.top - rb.top) > 18) return ra.top - rb.top;
        return ra.left - rb.left;
      });

      var groupCounts = {};
      targets.forEach(function (el) {
        if (el.classList.contains('is-revealed')) return;
        var kind = el.classList.contains('wm-card')
          ? 'card'
          : el.classList.contains('wm-product-card')
            ? 'product'
            : el.classList.contains('wm-explorer-group')
              ? 'expGroup'
              : el.classList.contains('wm-explorer-swatch')
                ? 'expSwatch'
                : el.classList.contains('wm-step-item')
                  ? 'step'
                  : 'other';
        var idx = groupCounts[kind] || 0;
        groupCounts[kind] = idx + 1;

        var existingDelay = el.style.getPropertyValue('--wm-delay');
        if (!existingDelay) {
          el.style.setProperty('--wm-delay', computeStepDelay(el, idx));
        }
        el.classList.add('is-revealed');
      });
    }

    function checkVisible(initialPass) {
      var els = collectTargets();
      var vh = window.innerHeight || 900;
      var docH = document.documentElement.scrollHeight;
      var nearBottom = window.scrollY + vh >= docH - 60;
      var toReveal = [];

      els.forEach(function (el) {
        if (el.classList.contains('is-revealed')) return;
        if (isHiddenByFilter(el)) return;
        var rect = el.getBoundingClientRect();
        if (rect.width === 0 && rect.height === 0) return;

        // Above viewport (scrolled past) -> reveal immediately
        if (rect.bottom <= 40) {
          el.style.setProperty('--wm-delay', '0ms');
          toReveal.push(el);
          return;
        }

        if (initialPass) {
          // On initial page load at top, reveal only clearly visible elements above fold
          if (rect.top < vh * 0.88) {
            toReveal.push(el);
          }
          return;
        }

        var isLargeOrFooter =
          el === footer ||
          rect.height > vh * 0.55 ||
          el.classList.contains('wm-img-frame');
        var triggerY = nearBottom ? vh * 0.98 : (isLargeOrFooter ? vh * 0.90 : vh * 0.85);
        if (rect.top <= triggerY) {
          toReveal.push(el);
        }
      });

      revealBatch(toReveal);
    }

    var observer = null;
    if ('IntersectionObserver' in window) {
      var pendingIO = [];
      var ioScheduled = false;

      observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting && !entry.target.classList.contains('is-revealed')) {
              pendingIO.push(entry.target);
              observer.unobserve(entry.target);
            }
          });
          if (pendingIO.length && !ioScheduled) {
            ioScheduled = true;
            requestAnimationFrame(function () {
              ioScheduled = false;
              var batch = pendingIO.splice(0, pendingIO.length);
              revealBatch(batch);
            });
          }
        },
        { threshold: 0.14, rootMargin: '0px 0px -68px 0px' }
      );

      allEls.forEach(function (el) {
        if (el !== footer) observer.observe(el);
      });

      if (footer) {
        var footerIO = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                footer.classList.add('is-revealed');
                footerIO.disconnect();
              }
            });
          },
          { threshold: 0.04, rootMargin: '0px 0px -16px 0px' }
        );
        footerIO.observe(footer);
      }
    }

    var rafPending = false;
    window.addEventListener(
      'scroll',
      function () {
        if (rafPending) return;
        rafPending = true;
        requestAnimationFrame(function () {
          rafPending = false;
          checkVisible(false);
        });
      },
      { passive: true }
    );

    window.addEventListener('resize', function () { checkVisible(false); }, { passive: true });
    window.addEventListener('load', function () { checkVisible(true); });
    window.addEventListener('wanders:refresh-reveals', function () {
      requestAnimationFrame(function () { checkVisible(false); });
    });

    // Run initial reveal cleanly for above-the-fold items only
    requestAnimationFrame(function () {
      checkVisible(true);
    });
  }

  function initMagneticButtons() {
    if (reducedMotion) return;
    if (!window.matchMedia || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }

    var btns = Array.prototype.slice.call(document.querySelectorAll('.w-btn, .w-header-cta'));
    btns.forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var rect = btn.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        var relX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        var relY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        var mx = Math.max(-4.5, Math.min(4.5, relX * 4.5));
        var my = Math.max(-3.5, Math.min(3.5, relY * 3.5));
        btn.style.setProperty('--w-mag-x', mx.toFixed(2) + 'px');
        btn.style.setProperty('--w-mag-y', my.toFixed(2) + 'px');
      });

      btn.addEventListener('mouseleave', function () {
        btn.style.setProperty('--w-mag-x', '0px');
        btn.style.setProperty('--w-mag-y', '0px');
      });
    });
  }

  function initParallax() {
    if (reducedMotion) return;
    var cores = navigator.hardwareConcurrency || 4;
    if (cores <= 2) return;

    var layers = Array.prototype.slice.call(document.querySelectorAll('[data-wm-parallax]'));
    if (!layers.length) return;

    function updateParallax() {
      var vw = window.innerWidth || 1440;
      if (vw < 1024) {
        layers.forEach(function (el) { el.style.setProperty('--wm-py', '0px'); });
        return;
      }
      var vh = window.innerHeight || 900;
      layers.forEach(function (el) {
        var speed = parseFloat(el.getAttribute('data-wm-parallax')) || 0.14;
        var rect = el.getBoundingClientRect();
        if (rect.bottom < -120 || rect.top > vh + 120) return;
        var centerOffset = rect.top + rect.height * 0.5 - vh * 0.5;
        var shift = Math.max(-26, Math.min(26, -centerOffset * speed * 0.22));
        el.style.setProperty('--wm-py', shift.toFixed(2) + 'px');
      });
    }

    var rafPending = false;
    window.addEventListener(
      'scroll',
      function () {
        if (rafPending) return;
        rafPending = true;
        requestAnimationFrame(function () {
          rafPending = false;
          updateParallax();
        });
      },
      { passive: true }
    );
    window.addEventListener('resize', updateParallax, { passive: true });
    updateParallax();
  }

  function boot() {
    if (!reducedMotion) {
      document.documentElement.classList.add('w-motion-ready');
    } else {
      document.documentElement.classList.remove('w-motion-ready');
    }

    initHeaderHeightSync();
    initHeroSync();
    initStickyHeader();
    prepareMotionChoreography();
    initScrollReveals();
    initMagneticButtons();
    initParallax();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
