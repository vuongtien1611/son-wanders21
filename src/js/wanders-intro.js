/**
 * WANDERS CINEMATIC INTRO 9.0S ARCHITECTURE
 * Concept: WANDERS – THE POWER OF COLOR ("Sắc màu kiến tạo không gian sống")
 * Luxury Cinematic Timeline — 9.0s Duration with 3.8s Steady Brand Hold:
 *   Scene 01 – Paint Awakening:    0 – 1.5s  (Forest Green canvas, ambient light, accelerating emerald drop)
 *   Scene 02 – Paint Explosion:    1.2 – 2.5s (Viscous burst, radial paint particles, liquid ribbons)
 *   Scene 03 – WANDERS Reveal:     1.8 – 2.5s (Sequential 7-letter emergence W-A-N-D-E-R-S & stabilization)
 *   Scene 04 – Brand Presentation: 2.5 – 7.0s (Gold rule, tagline, brand subline & 3.8s complete steady hold)
 *   Scene 05 – Curtain Exit:       7.0 – 9.0s (Graceful brand fade, bottom charge, upward liquid veil wipe into Hero)
 */
(function () {
  'use strict';

  var SESSION_KEY = 'wanders_intro_seen';
  var ASSET_BASE = './images/introl/';

  // ---------------------------------------------------------------------------
  // TIMELINE CONFIGURATIONS (5.85S TIMELINE: 28% FASTER DROP + EXACT 2.0S BRAND HOLD)
  // ---------------------------------------------------------------------------
  var CONFIG_DESKTOP = {
    isMobile: false,
    totalDuration: 5850, // 5.85s total Intro duration
    hardSafetyTimeout: 8500,
    // Scene 01 – Paint Awakening: 0–0.8s (Fast natural gravitational drop, 29% faster)
    dropDuration: 780,
    impactTime: 800,
    // Scene 02 – Paint Explosion & Ribbons: 0.82–2.0s
    explosionTime: 820,
    explosionBurstTime: 960,
    explosionEndTime: 1950,
    ribbonsStartTime: 840,
    ribbonsEndTime: 1980,
    // Scene 03 – WANDERS Reveal (7 Letters): 1.35–2.0s
    logoRevealStart: 1350,
    logoRevealStep: 90, // W(1350), A(1440), N(1530), D(1620), E(1710), R(1800), S(1890) -> all 7 letters formed by 1980ms
    // Scene 04 – Brand Presentation & Exact 2.0s Steady Hold: 2.0–4.5s
    brandRevealTime: 2000, // Gold rule + Tagline + Slogan expand smoothly (2.0s - 2.45s)
    // EXACT 2.0s BRAND HOLD: 2.5s -> 4.5s (All text 100% visible and held)
    // Scene 05 – Transition & Curtain Exit: 4.5–5.85s
    logoFadeTime: 4500, // Brand stage fades smoothly (4.5s - 4.75s)
    chargeTime: 4620,   // Bottom energy charge surge
    wipeTime: 4720,     // Upward curtain sweep reveals Hero (4.72s - 5.82s)
    curtainTransitionMs: 1100,
    particleScale: 1.0,
    canvasDprCap: 1.75,
  };

  var CONFIG_MOBILE = {
    isMobile: true,
    totalDuration: 5850, // Unified 5.85s timeline with exact 2.0s hold
    hardSafetyTimeout: 8500,
    // Scene 01 – Paint Awakening: 0–0.82s (Fast gravitational drop, 28.7% faster)
    dropDuration: 800,
    impactTime: 820,
    // Scene 02 – Paint Explosion & Ribbons: 0.84–2.0s
    explosionTime: 840,
    explosionBurstTime: 980,
    explosionEndTime: 1980,
    ribbonsStartTime: 860,
    ribbonsEndTime: 2000,
    // Scene 03 – WANDERS Reveal (7 Letters): 1.38–2.0s
    logoRevealStart: 1380,
    logoRevealStep: 90, // W(1380), A(1470), N(1560), D(1650), E(1740), R(1830), S(1920)
    // Scene 04 – Brand Presentation & Exact 2.0s Steady Hold: 2.02–4.5s
    brandRevealTime: 2020,
    // EXACT 2.0s BRAND HOLD: 2.5s -> 4.5s
    // Scene 05 – Transition & Curtain Exit: 4.5–5.85s
    logoFadeTime: 4500,
    chargeTime: 4620,
    wipeTime: 4720,
    curtainTransitionMs: 1100,
    particleScale: 0.45, // 55% reduction on mobile for 60fps smoothness
    canvasDprCap: 1.5,
  };

  // Exact measured bounding-box glyph geometry inside PNGs (W uniformly scaled 1028/662 to match A-S cap-height)
  var LETTER_SPECS = [
    { ch: 'W', file: '01_W.png', cs: 1863.44, tx: 133.55, ty: 416.17, gw: 1597, gh: 1028 },
    { ch: 'A', file: '02_A.png', cs: 1200, tx: 222, ty: 86, gw: 754, gh: 1028 },
    { ch: 'N', file: '03_N.png', cs: 1200, tx: 186, ty: 86, gw: 826, gh: 1028 },
    { ch: 'D', file: '04_D.png', cs: 1200, tx: 150, ty: 86, gw: 898, gh: 1028 },
    { ch: 'E', file: '05_E.png', cs: 1200, tx: 210, ty: 86, gw: 778, gh: 1028 },
    { ch: 'R', file: '06_R.png', cs: 1200, tx: 214, ty: 86, gw: 772, gh: 1028 },
    { ch: 'S', file: '07_S.png', cs: 1200, tx: 140, ty: 86, gw: 918, gh: 1028 },
  ];

  var FX_FILES = [
    '01_paint_impact.png',
    '02_paint_explosion.png',
    '03_liquid_ribbons.png',
    'Emerald Waves with Golden Light.png',
  ];

  var COLORS = {
    forest: '#0F4C3A',
    deep: '#073B2E',
    emerald: '#1A7A5E',
    gold: '#D6AD45',
    ivory: '#FAF9F5',
    charcoal: '#2F383E',
  };

  function clamp(v, min, max) {
    return v < min ? min : v > max ? max : v;
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - clamp(t, 0, 1), 3);
  }

  function easeOutExpo(t) {
    t = clamp(t, 0, 1);
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  function easeInQuad(t) {
    t = clamp(t, 0, 1);
    return t * t;
  }

  function easeInOutCubic(t) {
    t = clamp(t, 0, 1);
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  // ---------------------------------------------------------------------------
  // 1. PaintParticles — Optimized Canvas Physics Engine
  // ---------------------------------------------------------------------------
  function PaintParticles(canvas, cfg) {
    this.canvas = canvas;
    this.cfg = cfg || CONFIG_DESKTOP;
    this.ctx = canvas.getContext('2d');
    this.isMobile = this.cfg.isMobile;
    this.dpr = Math.min(window.devicePixelRatio || 1, this.cfg.canvasDprCap);
    this.isLowPower =
      this.isMobile ||
      (typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 4);
    this.w = 0;
    this.h = 0;
    this.droplets = [];
    this.rings = [];
    this.impactFired = false;
    this.explosionBurstFired = false;
    this.letterBursts = {};
    this.canvasIdle = false;
    this.resize();
  }

  PaintParticles.prototype.resize = function () {
    if (!this.canvas) return;
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.canvas.width = Math.max(1, Math.floor(this.w * this.dpr));
    this.canvas.height = Math.max(1, Math.floor(this.h * this.dpr));
    if (this.ctx) {
      this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    }
  };

  PaintParticles.prototype.emitRadialBurst = function (cx, cy, count, speedScale, palette) {
    var scale = this.cfg.particleScale || (this.isLowPower ? 0.55 : 1);
    var total = Math.max(6, Math.round(count * scale));
    var effectiveSpeedScale = this.isMobile ? (speedScale * 0.60) : speedScale;
    var baseSpeed = Math.min(this.w, this.h) * effectiveSpeedScale;
    for (var i = 0; i < total; i++) {
      var angle = (Math.PI * 2 * i) / total + (Math.random() - 0.5) * 0.35;
      var spd = baseSpeed * (0.45 + Math.random() * 0.95);
      var maxLife = this.isMobile
        ? (1.45 + Math.random() * 0.35)
        : ((this.isLowPower ? 0.55 : 0.65) + Math.random() * 0.55);
      var drag = this.isMobile ? (0.958 + Math.random() * 0.018) : (0.92 + Math.random() * 0.04);
      var gravity = this.isMobile ? (85 + Math.random() * 45) : (220 + Math.random() * 140);
      this.droplets.push({
        x: cx + (Math.random() - 0.5) * 14,
        y: cy + (Math.random() - 0.5) * 14,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd,
        radius: 1.6 + Math.random() * (this.isMobile ? 3.0 : (this.isLowPower ? 3.5 : 5.2)),
        color: palette[i % palette.length],
        alpha: 0.95,
        drag: drag,
        gravity: gravity,
        life: 0,
        maxLife: maxLife,
      });
    }
  };

  PaintParticles.prototype.emitRing = function (cx, cy, maxR, color, lineWidth) {
    this.rings.push({
      x: cx,
      y: cy,
      r: 8,
      maxR: maxR,
      color: color,
      lineWidth: lineWidth,
      alpha: 0.9,
      life: 0,
      maxLife: this.isMobile ? 1.55 : 0.62,
    });
  };

  PaintParticles.prototype.triggerLetterSpark = function (idx, ratioX) {
    if (this.letterBursts[idx]) return;
    this.letterBursts[idx] = true;
    var cx = this.w * ratioX;
    var cy = this.h * 0.49;
    var count = this.isMobile ? 6 : 12;
    this.emitRadialBurst(cx, cy, count, 0.22, [COLORS.gold, COLORS.ivory, COLORS.emerald]);
  };

  PaintParticles.prototype.updateAndDraw = function (elapsedMs, dtSec) {
    var ctx = this.ctx;
    if (!ctx) return;
    var cfg = this.cfg;

    // During Scene 04 (Brand Hold), stop drawing once droplets dissipate to save battery & main thread
    var idleCutoff = cfg.brandRevealTime + 500;
    if (elapsedMs > idleCutoff && this.droplets.length === 0 && this.rings.length === 0) {
      if (!this.canvasIdle) {
        ctx.clearRect(0, 0, this.w, this.h);
        this.canvasIdle = true;
      }
      return;
    }
    this.canvasIdle = false;
    ctx.clearRect(0, 0, this.w, this.h);

    var cx = this.w * 0.5;
    var cy = this.h * 0.5;

    // Scene 01: Accelerating emerald drop
    if (elapsedMs < cfg.dropDuration + 10) {
      var dropT = clamp(elapsedMs / cfg.dropDuration, 0, 1);
      var accelT = easeInQuad(dropT);
      var dropY = lerp(-30, cy, accelT);
      var tailH = 18 + accelT * (this.isMobile ? 70 : 75);

      var grad = ctx.createLinearGradient(cx, dropY - tailH, cx, dropY + 14);
      grad.addColorStop(0, 'rgba(15, 76, 58, 0)');
      grad.addColorStop(0.55, 'rgba(26, 122, 94, 0.85)');
      grad.addColorStop(0.88, COLORS.ivory);
      grad.addColorStop(1, COLORS.gold);

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cx, dropY - tailH);
      ctx.quadraticCurveTo(cx + 12, dropY - 4, cx, dropY + 13);
      ctx.quadraticCurveTo(cx - 12, dropY - 4, cx, dropY - tailH);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();
    }

    // Impact trigger
    if (elapsedMs >= cfg.impactTime && !this.impactFired) {
      this.impactFired = true;
      var maxRad = Math.hypot(this.w, this.h) * (this.isMobile ? 0.36 : 0.42);
      this.emitRing(cx, cy, maxRad, COLORS.ivory, this.isMobile ? 2.4 : 3.2);
      this.emitRing(cx, cy, maxRad * 0.72, COLORS.gold, this.isMobile ? 1.6 : 2.0);
      var burstCount = this.isMobile ? 22 : 42;
      this.emitRadialBurst(cx, cy, burstCount, 0.92, [COLORS.ivory, COLORS.gold, COLORS.emerald, COLORS.forest]);
    }

    // Explosion secondary burst
    if (elapsedMs >= cfg.explosionBurstTime && !this.explosionBurstFired) {
      this.explosionBurstFired = true;
      var secCount = this.isMobile ? 16 : 34;
      this.emitRadialBurst(cx, cy, secCount, 1.12, [COLORS.gold, COLORS.ivory, COLORS.emerald]);
    }

    // Draw expanding shockwave rings
    for (var rIdx = this.rings.length - 1; rIdx >= 0; rIdx--) {
      var ring = this.rings[rIdx];
      ring.life += dtSec;
      var p = clamp(ring.life / ring.maxLife, 0, 1);
      ring.r = lerp(10, ring.maxR, this.isMobile ? easeOutCubic(p) : easeOutExpo(p));
      ring.alpha = (1 - p) * 0.78;
      if (p >= 1) {
        this.rings.splice(rIdx, 1);
        continue;
      }
      ctx.save();
      ctx.beginPath();
      ctx.arc(ring.x, ring.y, ring.r, 0, Math.PI * 2);
      ctx.strokeStyle = ring.color;
      ctx.globalAlpha = ring.alpha;
      ctx.lineWidth = Math.max(0.6, ring.lineWidth * (1 - p * 0.5));
      ctx.stroke();
      ctx.restore();
    }

    // Draw paint droplets with velocity stretching
    for (var i = this.droplets.length - 1; i >= 0; i--) {
      var d = this.droplets[i];
      d.life += dtSec;
      if (d.life >= d.maxLife) {
        this.droplets.splice(i, 1);
        continue;
      }
      d.vx *= d.drag;
      d.vy *= d.drag;
      d.vy += d.gravity * dtSec;
      d.x += d.vx * dtSec;
      d.y += d.vy * dtSec;

      var lifeRatio = d.life / d.maxLife;
      var spd = Math.hypot(d.vx, d.vy);
      var stretch = clamp(spd / 220, 1, this.isMobile ? 3.0 : 3.8);
      var angle = Math.atan2(d.vy, d.vx);

      ctx.save();
      ctx.translate(d.x, d.y);
      ctx.rotate(angle);
      ctx.scale(stretch, 1);
      ctx.beginPath();
      ctx.arc(0, 0, d.radius * (1 - lifeRatio * 0.35), 0, Math.PI * 2);
      ctx.fillStyle = d.color;
      ctx.globalAlpha = clamp((1 - lifeRatio) * d.alpha * 1.2, 0, 1);
      ctx.fill();
      ctx.restore();
    }
  };

  PaintParticles.prototype.destroy = function () {
    this.droplets = [];
    this.rings = [];
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.w, this.h);
    }
  };

  // ---------------------------------------------------------------------------
  // 2. LiquidRibbons — Viscous Multi-frequency Liquid Paint Stream
  // ---------------------------------------------------------------------------
  function LiquidRibbons(canvas, cfg) {
    this.canvas = canvas;
    this.cfg = cfg || CONFIG_DESKTOP;
    this.ctx = canvas.getContext('2d');
    this.isLowPower = this.cfg.isMobile || window.innerWidth < 768;
  }

  LiquidRibbons.prototype.draw = function (elapsedMs) {
    var cfg = this.cfg;
    if (elapsedMs < cfg.ribbonsStartTime || elapsedMs > cfg.ribbonsEndTime || !this.ctx) return;

    var ctx = this.ctx;
    var w = window.innerWidth;
    var h = window.innerHeight;
    var totalSpan = cfg.ribbonsEndTime - cfg.ribbonsStartTime;
    var progress = clamp((elapsedMs - cfg.ribbonsStartTime) / totalSpan, 0, 1);
    var fadeIn = easeOutCubic(clamp(progress / 0.18, 0, 1));
    var fadeOut = progress > 0.74 ? clamp(1 - (progress - 0.74) / 0.26, 0, 1) : 1;
    var alpha = fadeIn * fadeOut;
    if (alpha <= 0.01) return;

    var streams = [
      { color: COLORS.emerald, amp: h * (cfg.isMobile ? 0.11 : 0.14), freq: 1.8, phase: 0.2, width: w < 640 ? 8 : 18, yOff: -12 },
      { color: COLORS.ivory, amp: h * (cfg.isMobile ? 0.08 : 0.11), freq: 2.3, phase: 1.7, width: w < 640 ? 5 : 11, yOff: 6 },
      { color: COLORS.gold, amp: h * (cfg.isMobile ? 0.07 : 0.09), freq: 2.8, phase: 3.1, width: w < 640 ? 3.5 : 7, yOff: 0 },
    ];

    ctx.save();
    if (!this.isLowPower) {
      ctx.shadowBlur = 14;
      ctx.shadowColor = 'rgba(214, 173, 69, 0.35)';
    }

    var waveSpeed = cfg.isMobile ? 2.8 : 4.5;
    for (var s = 0; s < streams.length; s++) {
      var st = streams[s];
      var headX = lerp(-w * 0.12, w * 1.15, easeInOutCubic(progress));
      var tailX = Math.max(-w * 0.18, headX - w * 0.68);
      var steps = this.isLowPower ? 20 : 28;

      ctx.beginPath();
      for (var i = 0; i <= steps; i++) {
        var frac = i / steps;
        var x = lerp(tailX, headX, frac);
        var nx = x / w;
        var wave = Math.sin(nx * Math.PI * st.freq + progress * waveSpeed + st.phase) * st.amp * (1 - Math.abs(nx - 0.5) * 0.65);
        var y = h * 0.5 + st.yOff + wave;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      var grad = ctx.createLinearGradient(tailX, 0, headX, 0);
      grad.addColorStop(0, 'rgba(255,255,255,0)');
      grad.addColorStop(0.35, st.color);
      grad.addColorStop(0.85, st.color);
      grad.addColorStop(1, 'rgba(255,255,255,0)');

      ctx.strokeStyle = grad;
      ctx.lineWidth = st.width;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.globalAlpha = alpha * 0.85;
      ctx.stroke();
    }
    ctx.restore();
  };

  // ---------------------------------------------------------------------------
  // 3. PaintSplash — Multi-Layer Paint Image Choreography
  // ---------------------------------------------------------------------------
  function PaintSplash(layers, cfg) {
    this.cfg = cfg || CONFIG_DESKTOP;
    this.impact = layers.impact;
    this.explosion = layers.explosion;
    this.ribbons = layers.ribbons;
    this.kinetic = layers.kinetic;
    this.settled = false;
  }

  PaintSplash.prototype.update = function (t) {
    if (this.settled) return;
    var cfg = this.cfg;

    // Physical impact shock recoil
    if (this.kinetic) {
      var shockStart = cfg.impactTime;
      var shockSpan = cfg.isMobile ? 280 : 260;
      if (t >= shockStart && t < shockStart + shockSpan) {
        var k = 1 - (t - shockStart) / shockSpan;
        var sx = Math.sin(t * (cfg.isMobile ? 0.08 : 0.09)) * (cfg.isMobile ? 2.4 : 2.8) * k;
        var sy = Math.cos(t * (cfg.isMobile ? 0.10 : 0.11)) * (cfg.isMobile ? 2.4 : 2.8) * k;
        this.kinetic.style.transform = 'translate3d(' + sx.toFixed(2) + 'px,' + sy.toFixed(2) + 'px,0)';
      } else if (this.kinetic.style.transform !== 'none') {
        this.kinetic.style.transform = 'none';
      }
    }

    // Scene 01/02 Layer: 01_paint_impact.png
    if (this.impact) {
      var impStart = cfg.impactTime;
      var impDuration = cfg.isMobile ? 950 : 900;
      var impEnd = impStart + impDuration;
      if (t >= impStart && t <= impEnd) {
        var pImp = clamp((t - impStart) / impDuration, 0, 1);
        var bloomT = clamp(pImp / (cfg.isMobile ? 0.45 : 0.48), 0, 1);
        var rad1 = lerp(10, 135, easeOutCubic(bloomT));
        var fadeStartP = cfg.isMobile ? 0.50 : 0.52;
        var fade1 = pImp > fadeStartP ? clamp(1 - (pImp - fadeStartP) / (1 - fadeStartP), 0, 1) : easeOutExpo(bloomT);
        var sc1 = lerp(0.74, 1.08, easeOutCubic(pImp));
        this.impact.style.opacity = (fade1 * 0.92).toFixed(3);
        this.impact.style.clipPath = 'circle(' + rad1.toFixed(1) + '% at 50% 50%)';
        var imgEl1 = this.impact.querySelector('img');
        if (imgEl1) imgEl1.style.transform = 'scale(' + sc1.toFixed(4) + ')';
      } else {
        this.impact.style.opacity = '0';
      }
    }

    // Scene 02 Layer: 02_paint_explosion.png
    if (this.explosion) {
      var expStart = cfg.explosionTime;
      var expEnd = cfg.explosionEndTime;
      var expDuration = expEnd - expStart;
      if (t >= expStart && t <= expEnd) {
        var pExp = clamp((t - expStart) / expDuration, 0, 1);
        var growT = clamp(pExp / (cfg.isMobile ? 0.55 : 0.52), 0, 1);
        var rad2 = lerp(12, 140, easeOutCubic(growT));
        var fadeStart2P = cfg.isMobile ? 0.58 : 0.60;
        var fade2 = pExp > fadeStart2P ? clamp(1 - (pExp - fadeStart2P) / (1 - fadeStart2P), 0, 1) : easeOutCubic(growT);
        var sc2 = lerp(0.85, 1.14, easeOutCubic(pExp));
        var rot2 = lerp(-2.2, 1.2, pExp);
        this.explosion.style.opacity = (fade2 * 0.90).toFixed(3);
        this.explosion.style.clipPath = 'circle(' + rad2.toFixed(1) + '% at 50% 50%)';
        var imgEl2 = this.explosion.querySelector('img');
        if (imgEl2) {
          imgEl2.style.transform = 'scale(' + sc2.toFixed(4) + ') rotate(' + rot2.toFixed(2) + 'deg)';
        }
      } else {
        this.explosion.style.opacity = '0';
      }
    }

    // Scene 02-03 Layer: 03_liquid_ribbons.png
    if (this.ribbons) {
      var ribStart = cfg.ribbonsStartTime;
      var ribEnd = cfg.ribbonsEndTime;
      var ribDuration = ribEnd - ribStart;
      if (t >= ribStart && t <= ribEnd) {
        var pRib = clamp((t - ribStart) / ribDuration, 0, 1);
        var wipe = easeOutCubic(pRib);
        var fadeIn3 = clamp(pRib / 0.22, 0, 1);
        var fadeOut3 = pRib > 0.70 ? clamp(1 - (pRib - 0.70) / 0.30, 0, 1) : 1;
        var settleOpacity = fadeIn3 * fadeOut3;
        var sc3 = lerp(0.88, 1.06, pRib);
        this.ribbons.style.opacity = (settleOpacity * 0.88).toFixed(3);
        this.ribbons.style.clipPath = 'inset(0 ' + ((1 - wipe) * 100).toFixed(1) + '% 0 0)';
        var imgEl3 = this.ribbons.querySelector('img');
        if (imgEl3) imgEl3.style.transform = 'scale(' + sc3.toFixed(4) + ')';
      } else {
        this.ribbons.style.opacity = '0';
      }
    }

    // After ribbons & explosion end, ensure splash layers stay fully hidden so logo is crystal clear
    if (t > cfg.ribbonsEndTime + 50) {
      this.settled = true;
      if (this.impact) this.impact.style.opacity = '0';
      if (this.explosion) this.explosion.style.opacity = '0';
      if (this.ribbons) this.ribbons.style.opacity = '0';
    }
  };

  // ---------------------------------------------------------------------------
  // 4. LogoReveal — Precision 7-Letter Alignment & Sequential Emergence
  // ---------------------------------------------------------------------------
  function LogoReveal(rootEl, particles, cfg) {
    this.root = rootEl;
    this.particles = particles;
    this.cfg = cfg || CONFIG_DESKTOP;
    this.slots = Array.prototype.slice.call(rootEl.querySelectorAll('.wi-letter-slot'));
    this.revealed = {};
    this.logoSceneTriggered = false;
    this.revealStageTriggered = false;
  }

  LogoReveal.prototype.update = function (elapsedMs) {
    var cfg = this.cfg;
    // Scene 03/04: Logo scene background transition as letters begin forming
    if (elapsedMs >= cfg.logoRevealStart && !this.logoSceneTriggered) {
      this.logoSceneTriggered = true;
      this.root.classList.add('wi-intro--logo-scene');
    }

    // Scene 03: Sequential W-A-N-D-E-R-S emergence
    for (var i = 0; i < this.slots.length; i++) {
      var triggerTime = cfg.logoRevealStart + i * cfg.logoRevealStep;
      if (elapsedMs >= triggerTime && !this.revealed[i]) {
        this.revealed[i] = true;
        this.slots[i].classList.add('is-visible');
        if (this.particles) {
          var ratioX = 0.24 + (i / 6) * 0.52;
          this.particles.triggerLetterSpark(i, ratioX);
        }
      }
    }

    // Scene 04: Final Brand Reveal (Gold rule + Tagline emerge)
    if (elapsedMs >= cfg.brandRevealTime && !this.revealStageTriggered) {
      this.revealStageTriggered = true;
      this.root.classList.add('wi-intro--reveal');
    }
  };

  // ---------------------------------------------------------------------------
  // 5. PageTransition — Power Paint Veil Lift (Logo Fade -> Charge -> Vertical Wipe)
  // ---------------------------------------------------------------------------
  function PageTransition(rootEl, cfg) {
    this.root = rootEl;
    this.cfg = cfg || CONFIG_DESKTOP;
    this.logoFaded = false;
    this.charged = false;
    this.wiped = false;
  }

  PageTransition.prototype.update = function (elapsedMs) {
    var cfg = this.cfg;
    if (elapsedMs >= cfg.logoFadeTime && !this.logoFaded) {
      this.logoFaded = true;
      this.root.classList.add('wi-intro--logo-fade');
    }
    if (elapsedMs >= cfg.chargeTime && !this.charged) {
      this.charged = true;
      this.root.classList.add('wi-intro--charge');
    }
    if (elapsedMs >= cfg.wipeTime && !this.wiped) {
      this.wiped = true;
      this.root.classList.add('wi-intro--wipe', 'wi-intro--exit');
      document.documentElement.classList.add('wi-hero-enter');
      try {
        window.dispatchEvent(new CustomEvent('wanders:intro-wipe'));
      } catch (e) {}
    }
  };

  // ---------------------------------------------------------------------------
  // 6. Markup Builder
  // ---------------------------------------------------------------------------
  function buildMarkup(mount) {
    var lettersHtml = LETTER_SPECS.map(function (spec) {
      return (
        '<div class="wi-letter-slot" data-glyph="' + spec.ch + '" style="--cs:' + spec.cs + ';--tx:' + spec.tx + ';--ty:' + spec.ty + ';--gw:' + spec.gw + ';--gh:' + spec.gh + ';">' +
          '<img src="' + ASSET_BASE + spec.file + '" alt="' + spec.ch + '" decoding="async" draggable="false">' +
        '</div>'
      );
    }).join('');

    var waveSvg =
      '<div class="wi-curtain-wave" aria-hidden="true">' +
        '<svg class="wi-wave-bg" viewBox="0 0 1440 120" preserveAspectRatio="none">' +
          '<defs>' +
            '<linearGradient id="wiEmeraldRim" x1="0%" y1="0%" x2="100%" y2="0%">' +
              '<stop offset="0%" stop-color="#0F4C3A" />' +
              '<stop offset="35%" stop-color="#1E8E6A" />' +
              '<stop offset="68%" stop-color="#25A37B" />' +
              '<stop offset="100%" stop-color="#146B51" />' +
            '</linearGradient>' +
            '<linearGradient id="wiGoldEdge" x1="0%" y1="0%" x2="100%" y2="0%">' +
              '<stop offset="0%" stop-color="#C89B34" />' +
              '<stop offset="32%" stop-color="#F5DC8E" />' +
              '<stop offset="65%" stop-color="#D6AD45" />' +
              '<stop offset="100%" stop-color="#F0CF72" />' +
            '</linearGradient>' +
          '</defs>' +
          '<path d="M0,0 L1440,0 L1440,65 C1180,42 940,94 680,70 C420,45 220,94 0,66 Z" fill="url(#wiEmeraldRim)" />' +
          '<path d="M0,0 L1440,0 L1440,54 C1180,32 940,82 680,58 C420,34 220,82 0,54 Z" fill="#04241C" />' +
          '<path d="M0,66 C220,94 420,45 680,70 C940,94 1180,42 1440,65" fill="none" stroke="rgba(214,173,69,0.34)" stroke-width="9" stroke-linecap="round" />' +
          '<path d="M0,66 C220,94 420,45 680,70 C940,94 1180,42 1440,65" fill="none" stroke="url(#wiGoldEdge)" stroke-width="3.6" stroke-linecap="round" />' +
        '</svg>' +
        '<svg class="wi-wave-drops" viewBox="0 0 1200 110" preserveAspectRatio="xMidYMin meet">' +
          '<defs>' +
            '<radialGradient id="wiDropEmerald" cx="35%" cy="35%" r="65%">' +
              '<stop offset="0%" stop-color="#35CC9D" />' +
              '<stop offset="55%" stop-color="#198262" />' +
              '<stop offset="100%" stop-color="#0A3F30" />' +
            '</radialGradient>' +
            '<radialGradient id="wiDropGold" cx="35%" cy="35%" r="65%">' +
              '<stop offset="0%" stop-color="#FFF2C2" />' +
              '<stop offset="55%" stop-color="#D6AD45" />' +
              '<stop offset="100%" stop-color="#8C6718" />' +
            '</radialGradient>' +
          '</defs>' +
          '<g opacity="0.92">' +
            '<path d="M188,42 C190,49 193,54 193,58 A5.2,5.2 0 1,1 183,58 C183,54 186,49 188,42 Z" fill="url(#wiDropEmerald)" />' +
            '<circle cx="212" cy="64" r="2.2" fill="url(#wiDropGold)" opacity="0.88" />' +
            '<circle cx="386" cy="48" r="2.8" fill="url(#wiDropGold)" opacity="0.85" />' +
            '<path d="M596,46 C598.5,54 602,59 602,63.5 A6,6 0 1,1 590,63.5 C590,59 593.5,54 596,46 Z" fill="url(#wiDropEmerald)" />' +
            '<circle cx="614" cy="70" r="2.4" fill="url(#wiDropEmerald)" opacity="0.78" />' +
            '<circle cx="778" cy="58" r="2.1" fill="url(#wiDropGold)" opacity="0.9" />' +
            '<path d="M936,38 C938,44 940.5,48 940.5,51.5 A4.5,4.5 0 1,1 931.5,51.5 C931.5,48 934,44 936,38 Z" fill="url(#wiDropEmerald)" />' +
            '<circle cx="1028" cy="52" r="2.6" fill="url(#wiDropGold)" opacity="0.86" />' +
          '</g>' +
        '</svg>' +
      '</div>';

    mount.innerHTML =
      '<div class="wi-curtain" id="wiCurtain">' +
        '<div class="wi-curtain-bg"></div>' +
        '<div class="wi-brand-bg" id="wiBrandBg" aria-hidden="true">' +
          '<div class="wi-brand-bg-image"></div>' +
        '</div>' +
        '<div class="wi-kinetic-stage" id="wiKineticStage">' +
          '<div class="wi-layer" id="wiLayerImpact" style="z-index:2;"><img src="' + ASSET_BASE + '01_paint_impact.png" alt="" decoding="async" draggable="false"></div>' +
          '<div class="wi-layer" id="wiLayerExplosion" style="z-index:3;"><img src="' + ASSET_BASE + '02_paint_explosion.png" alt="" decoding="async" draggable="false"></div>' +
          '<div class="wi-layer" id="wiLayerRibbons" style="z-index:4;"><img src="' + ASSET_BASE + '03_liquid_ribbons.png" alt="" decoding="async" draggable="false"></div>' +
          '<div class="wi-vignette"></div>' +
          '<canvas class="wi-canvas" id="wiCanvas"></canvas>' +
        '</div>' +
        '<div class="wi-brand-stage">' +
          '<div class="wi-logo-row" aria-label="WANDERS">' +
            '<div class="wi-logo-glow"></div>' +
            lettersHtml +
            '<div class="wi-gold-sweep"></div>' +
          '</div>' +
          '<div class="wi-brand-meta">' +
            '<div class="wi-gold-rule"></div>' +
            '<p class="wi-tagline">SẮC MÀU THỊNH VƯỢNG</p>' +
            '<p class="wi-subline">Wanders · Sắc màu kiến tạo không gian sống</p>' +
          '</div>' +
        '</div>' +
        '<div class="wi-paint-charge" aria-hidden="true"></div>' +
        waveSvg +
      '</div>' +
      '<button type="button" id="wiSkipBtn" class="wi-skip-btn" aria-label="Bỏ qua Intro">Bỏ qua <span aria-hidden="true">→</span></button>' +
      '<div class="wi-progress-track" aria-hidden="true"><div class="wi-progress-fill" id="wiProgressFill"></div></div>';
  }

  function preloadAssets(maxWaitMs) {
    var files = FX_FILES.concat(LETTER_SPECS.map(function (s) { return s.file; }));
    var loaded = files.map(function (f) {
      return new Promise(function (resolve) {
        var img = new Image();
        img.src = ASSET_BASE + f;
        if (typeof img.decode === 'function') {
          img.decode().then(function () { resolve(true); }).catch(function () {
            if (img.complete) resolve(true);
            else {
              img.onload = function () { resolve(true); };
              img.onerror = function () { resolve(false); };
            }
          });
        } else {
          img.onload = function () { resolve(true); };
          img.onerror = function () { resolve(false); };
          if (img.complete) resolve(true);
        }
      });
    });
    var timeoutPromise = new Promise(function (resolve) {
      setTimeout(function () { resolve('timeout'); }, maxWaitMs);
    });
    return Promise.race([Promise.all(loaded), timeoutPromise]);
  }

  // ---------------------------------------------------------------------------
  // 8. IntroTimeline — Master Timeline Controller
  // ---------------------------------------------------------------------------
  function IntroTimeline(mount) {
    this.mount = mount;
    this.rafId = null;
    this.safetyTimer = null;
    this.finished = false;
    this.startTime = 0;
    this.lastFrameTime = 0;
    this.onResize = null;
    this.onKeyDown = null;

    var isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    this.cfg = isMobile ? CONFIG_MOBILE : CONFIG_DESKTOP;
  }

  IntroTimeline.prototype.finish = function (immediate) {
    if (this.finished) return;
    this.finished = true;

    try {
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch (e) {}

    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    if (this.safetyTimer) {
      clearTimeout(this.safetyTimer);
      this.safetyTimer = null;
    }
    if (this.onResize) window.removeEventListener('resize', this.onResize);
    if (this.onKeyDown) document.removeEventListener('keydown', this.onKeyDown);

    var self = this;
    function unmount() {
      document.documentElement.classList.remove('wi-active');
      document.documentElement.classList.add('wi-hero-enter');
      try {
        window.dispatchEvent(new CustomEvent('wanders:intro-done'));
      } catch (e) {}
      if (self.particles) self.particles.destroy();
      if (self.mount) {
        self.mount.style.display = 'none';
        self.mount.className = 'wi-overlay';
        self.mount.innerHTML = '';
      }
    }

    if (immediate || !this.mount) {
      unmount();
    } else {
      this.mount.classList.add('wi-intro--logo-fade', 'wi-intro--charge', 'wi-intro--wipe', 'wi-intro--exit');
      document.documentElement.classList.add('wi-hero-enter');
      try {
        window.dispatchEvent(new CustomEvent('wanders:intro-wipe'));
      } catch (e) {}
      setTimeout(unmount, self.cfg.curtainTransitionMs || 970);
    }
  };

  IntroTimeline.prototype.start = function () {
    var isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    this.cfg = isMobile ? CONFIG_MOBILE : CONFIG_DESKTOP;
    var self = this;
    var cfg = this.cfg;
    buildMarkup(this.mount);

    var canvas = document.getElementById('wiCanvas');
    var progressFill = document.getElementById('wiProgressFill');
    var skipBtn = document.getElementById('wiSkipBtn');

    this.particles = new PaintParticles(canvas, cfg);
    this.ribbonsFx = new LiquidRibbons(canvas, cfg);
    this.splash = new PaintSplash({
      kinetic: document.getElementById('wiKineticStage'),
      impact: document.getElementById('wiLayerImpact'),
      explosion: document.getElementById('wiLayerExplosion'),
      ribbons: document.getElementById('wiLayerRibbons'),
    }, cfg);
    this.logoReveal = new LogoReveal(this.mount, this.particles, cfg);
    this.transition = new PageTransition(this.mount, cfg);

    this.onResize = function () {
      if (self.particles) self.particles.resize();
    };
    window.addEventListener('resize', this.onResize, { passive: true });

    this.onKeyDown = function (e) {
      if (e.key === 'Escape') self.finish(false);
    };
    document.addEventListener('keydown', this.onKeyDown);

    if (skipBtn) {
      skipBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        self.finish(false);
      });
    }

    // Fail-safe guarantee
    this.safetyTimer = setTimeout(function () {
      self.finish(true);
    }, cfg.hardSafetyTimeout);

    // Preload & decode images then start timeline
    preloadAssets(1000).then(function () {
      if (self.finished) return;
      self.startTime = performance.now();
      self.lastFrameTime = self.startTime;

      function tick(now) {
        if (self.finished) return;
        var elapsed = now - self.startTime;
        window.__wi_elapsed = elapsed;
        var dtSec = clamp((now - self.lastFrameTime) / 1000, 0.001, 0.05);
        self.lastFrameTime = now;

        if (progressFill) {
          progressFill.style.width = clamp((elapsed / cfg.totalDuration) * 100, 0, 100).toFixed(1) + '%';
        }

        self.particles.updateAndDraw(elapsed, dtSec);
        self.ribbonsFx.draw(elapsed);
        self.splash.update(elapsed);
        self.logoReveal.update(elapsed);
        self.transition.update(elapsed);

        if (elapsed >= cfg.totalDuration) {
          self.finish(true);
          return;
        }
        self.rafId = requestAnimationFrame(tick);
      }

      self.rafId = requestAnimationFrame(tick);
    });
  };

  function shouldRunIntro() {
    var qs = window.location.search || '';
    if (qs.indexOf('intro=0') !== -1) {
      return false;
    }
    if (qs.indexOf('intro=1') !== -1) {
      return true;
    }
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return false;
    }
    return true;
  }

  var activeTimeline = null;

  function boot() {
    var mount = document.getElementById('wanders-intro');
    if (!mount) {
      document.documentElement.classList.remove('wi-active');
      return;
    }
    if (!shouldRunIntro()) {
      document.documentElement.classList.remove('wi-active');
      mount.style.display = 'none';
      return;
    }
    try {
      document.documentElement.classList.add('wi-active');
      activeTimeline = new IntroTimeline(mount);
      window.WandersIntro._timeline = activeTimeline;
      activeTimeline.start();
    } catch (err) {
      document.documentElement.classList.remove('wi-active');
      mount.style.display = 'none';
    }
  }

  window.WandersIntro = {
    replay: function () {
      try {
        sessionStorage.removeItem(SESSION_KEY);
      } catch (e) {}
      if (activeTimeline) activeTimeline.finish(true);
      var mount = document.getElementById('wanders-intro');
      if (mount) {
        mount.style.display = 'block';
        mount.style.clipPath = '';
        mount.style.opacity = '';
        mount.className = 'wi-overlay';
        document.documentElement.classList.add('wi-active');
        activeTimeline = new IntroTimeline(mount);
        activeTimeline.start();
      }
    },
    skip: function () {
      if (activeTimeline) activeTimeline.finish(false);
    },
  };
  window.WandersIntrol = window.WandersIntro;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
