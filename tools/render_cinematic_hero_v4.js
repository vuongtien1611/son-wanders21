const fs = require('fs');
const path = require('path');
const http = require('http');
const { spawn } = require('child_process');
const puppeteer = require('C:/Users/Admin/Documents/sơn wanders/giao-dien/node_modules/puppeteer-core');
const ffmpegPath = require('C:/Users/Admin/Documents/sơn wanders/giao-dien/node_modules/@ffmpeg-installer/ffmpeg').path;
const ffprobePath = require('C:/Users/Admin/Documents/sơn wanders/giao-dien/node_modules/@ffprobe-installer/ffprobe').path;

const PROJECT_DIR = 'C:/Users/Admin/Documents/sơn wanders/giao-dien';
const IMAGES_DIR = path.join(PROJECT_DIR, 'website_download/images/video-banner');
// Use ASCII path for temp frames to avoid any FFmpeg Windows Unicode path quirks
const FRAMES_DIR = 'C:/Users/Admin/AppData/Local/Temp/wanders_frames_v4';
const SRC_VIDEO_DIR = path.join(PROJECT_DIR, 'src/assets/video');
const PROD_VIDEO_DIR = path.join(PROJECT_DIR, 'website_download/assets/video');

fs.mkdirSync(FRAMES_DIR, { recursive: true });
fs.mkdirSync(SRC_VIDEO_DIR, { recursive: true });
fs.mkdirSync(PROD_VIDEO_DIR, { recursive: true });

const SCENES = [
  {
    id: 'scene-01',
    name: 'WANDERS Clear Nano',
    file: 'ChatGPT Image Nov 13, 2026, 11_12_02 AM-5.png',
    camera: { type: 'zoom-in', startScale: 1.03, endScale: 1.09, panX: 0, panY: 0 },
    transition: 'paint-wipe-horizontal'
  },
  {
    id: 'scene-02',
    name: 'Bột bả nội thất',
    file: 'ChatGPT Image Nov 13, 2026, 11_11_57 AM-1.png',
    camera: { type: 'pan-left-to-right', startScale: 1.05, endScale: 1.05, startPanX: -0.025, endPanX: 0.025, panY: 0 },
    transition: 'paint-wipe-diagonal'
  },
  {
    id: 'scene-03',
    name: 'Bột bả ngoại thất',
    file: 'ChatGPT Image Nov 13, 2026, 11_11_58 AM-2.png',
    camera: { type: 'zoom-out', startScale: 1.09, endScale: 1.03, panX: 0, panY: 0 },
    transition: 'paint-wipe-horizontal'
  },
  {
    id: 'scene-04',
    name: 'Sơn chống thấm',
    file: 'ChatGPT Image Nov 13, 2026, 11_11_59 AM-3.png',
    camera: { type: 'push-in', startScale: 1.03, endScale: 1.10, panX: 0, startPanY: 0.015, endPanY: -0.015 },
    transition: 'paint-wipe-diagonal'
  },
  {
    id: 'scene-05',
    name: 'Sơn chống nóng',
    file: 'ChatGPT Image Nov 13, 2026, 11_12_01 AM-4.png',
    camera: { type: 'pan-right-to-left', startScale: 1.05, endScale: 1.05, startPanX: 0.025, endPanX: -0.025, panY: 0 },
    transition: 'paint-wipe-horizontal'
  },
  {
    id: 'scene-06',
    name: 'Sơn 2K',
    file: 'ChatGPT Image Nov 13, 2026, 11_12_03 AM-6.png',
    camera: { type: 'zoom-out', startScale: 1.09, endScale: 1.03, panX: 0, panY: 0 },
    transition: 'paint-wipe-loop'
  }
];

const TOTAL_FRAMES = 900;
const FPS = 30;
const FRAMES_PER_SCENE = 150; // 5.0s per scene
const TRANSITION_FRAMES = 24;  // 0.8s transition (frames 126 to 149 of each scene)

function runCommand(bin, args) {
  return new Promise((resolve, reject) => {
    console.log(`Executing: ${bin} ${args.join(' ')}`);
    const proc = spawn(bin, args, { stdio: 'inherit' });
    proc.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Process exited with code ${code}`));
    });
    proc.on('error', reject);
  });
}

async function main() {
  console.log('=== WANDERS CINEMATIC HERO VIDEO V4 RENDERER ===');
  console.log(`Resolution: 1920x1080 | FPS: ${FPS} | Duration: 30.0s | Total frames: ${TOTAL_FRAMES}`);

  // Clean temp frames directory
  for (const f of fs.readdirSync(FRAMES_DIR)) {
    try { fs.unlinkSync(path.join(FRAMES_DIR, f)); } catch (e) {}
  }

  // 1. Setup frame receiver & static asset server
  let savedCount = 0;
  let allFramesSavedPromiseResolve;
  const allFramesSavedPromise = new Promise((resolve) => {
    allFramesSavedPromiseResolve = resolve;
  });

  const frameServer = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    if (req.method === 'GET' && req.url === '/canvas') {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`<!DOCTYPE html><html><head><title>Renderer</title></head><body style="margin:0;background:#000;"></body></html>`);
      return;
    }

    if (req.method === 'GET' && req.url.startsWith('/img/')) {
      const imgName = decodeURIComponent(req.url.replace('/img/', ''));
      const imgPath = path.join(IMAGES_DIR, imgName);
      if (fs.existsSync(imgPath)) {
        res.writeHead(200, { 'Content-Type': 'image/png' });
        fs.createReadStream(imgPath).pipe(res);
      } else {
        res.writeHead(404);
        res.end('Not found');
      }
      return;
    }

    if (req.method === 'POST' && req.url.startsWith('/frame')) {
      const u = new URL(req.url, 'http://localhost:3091');
      const idx = u.searchParams.get('idx');
      const chunks = [];
      req.on('data', c => chunks.push(c));
      req.on('end', () => {
        const buf = Buffer.concat(chunks);
        const filename = `frame_${idx.padStart(4, '0')}.jpg`;
        fs.writeFileSync(path.join(FRAMES_DIR, filename), buf);
        savedCount++;
        if (savedCount % 100 === 0 || savedCount === TOTAL_FRAMES) {
          console.log(`Progress: saved ${savedCount}/${TOTAL_FRAMES} frames (${((savedCount / TOTAL_FRAMES) * 100).toFixed(1)}%)`);
        }
        res.writeHead(200);
        res.end('ok');
        if (savedCount === TOTAL_FRAMES) {
          allFramesSavedPromiseResolve();
        }
      });
      return;
    }

    res.writeHead(404);
    res.end();
  });

  await new Promise(r => frameServer.listen(3091, r));
  console.log('Frame receiver & asset server listening on port 3091');

  // 2. Launch Puppeteer to render deterministic frames
  const browser = await puppeteer.launch({
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--window-size=1920,1080']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto('http://localhost:3091/canvas', { waitUntil: 'domcontentloaded' });

    console.log('Preloading images and preparing canvas in Chrome...');
    await page.evaluate(async (scenes, totalFrames, fps, framesPerScene, transFrames) => {
      // Create offscreen canvas
      const canvas = document.createElement('canvas');
      canvas.width = 1920;
      canvas.height = 1080;
      const ctx = canvas.getContext('2d', { alpha: false });
      const W = 1920;
      const H = 1080;

      // Preload images
      const images = await Promise.all(
        scenes.map(s => new Promise((res, rej) => {
          const img = new Image();
          img.onload = () => res(img);
          img.onerror = () => rej(new Error('Failed to load ' + s.file));
          img.src = '/img/' + encodeURIComponent(s.file);
        }))
      );

      function easeInOutSine(x) {
        return -(Math.cos(Math.PI * x) - 1) / 2;
      }

      function easeInOutCubic(x) {
        return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
      }

      function drawKenBurns(img, scale, panX, panY, alpha = 1.0) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
        const drawW = W * scale;
        const drawH = H * scale;
        const offsetX = (W - drawW) / 2 + panX * W;
        const offsetY = (H - drawH) / 2 + panY * H;
        ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
        ctx.restore();
      }

      function drawVignette() {
        ctx.save();
        const grad = ctx.createRadialGradient(W / 2, H / 2, H * 0.40, W / 2, H / 2, W * 0.85);
        grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
        grad.addColorStop(1, 'rgba(4, 18, 14, 0.32)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);
        ctx.restore();
      }

      function getCameraTransform(scene, progress) {
        const cam = scene.camera;
        const t = easeInOutSine(progress);
        let scale = 1.05;
        let panX = 0;
        let panY = 0;

        if (cam.type === 'zoom-in') {
          scale = cam.startScale + (cam.endScale - cam.startScale) * t;
        } else if (cam.type === 'zoom-out') {
          scale = cam.startScale + (cam.endScale - cam.startScale) * t;
        } else if (cam.type === 'pan-left-to-right' || cam.type === 'pan-right-to-left') {
          scale = cam.startScale;
          panX = cam.startPanX + (cam.endPanX - cam.startPanX) * t;
        } else if (cam.type === 'push-in') {
          scale = cam.startScale + (cam.endScale - cam.startScale) * t;
          panY = cam.startPanY + (cam.endPanY - cam.startPanY) * t;
        }
        return { scale, panX, panY };
      }

      // Render each frame sequentially with await to avoid overloading HTTP queue
      for (let f = 0; f < totalFrames; f++) {
        const sceneIdx = Math.floor(f / framesPerScene);
        const nextSceneIdx = (sceneIdx + 1) % scenes.length;
        const localFrame = f % framesPerScene;
        const sceneProgress = localFrame / (framesPerScene - 1);

        const curScene = scenes[sceneIdx];
        const curImg = images[sceneIdx];
        const curCam = getCameraTransform(curScene, sceneProgress);

        // Fill background
        ctx.fillStyle = '#073B2E';
        ctx.fillRect(0, 0, W, H);

        // Draw current scene
        drawKenBurns(curImg, curCam.scale, curCam.panX, curCam.panY, 1.0);

        // Check if in transition window (last transFrames of the scene)
        const transStartFrame = framesPerScene - transFrames; // frame 126
        if (localFrame >= transStartFrame) {
          const transLocalProgress = (localFrame - transStartFrame) / transFrames;
          const transT = easeInOutCubic(transLocalProgress);
          const nextScene = scenes[nextSceneIdx];
          const nextImg = images[nextSceneIdx];
          const nextCam = getCameraTransform(nextScene, 0); // start of next scene
          const transType = curScene.transition;

          if (transType === 'paint-wipe-horizontal' || transType === 'paint-wipe-loop') {
            ctx.save();
            const wipeX = W * transT;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(wipeX, 0);
            ctx.bezierCurveTo(wipeX + 60, H * 0.35, wipeX - 50, H * 0.65, wipeX, H);
            ctx.lineTo(0, H);
            ctx.closePath();
            ctx.clip();

            drawKenBurns(nextImg, nextCam.scale, nextCam.panX, nextCam.panY, 1.0);

            // Paint border gold stroke
            ctx.strokeStyle = '#D6AD45';
            ctx.lineWidth = 5;
            ctx.shadowColor = '#073B2E';
            ctx.shadowBlur = 14;
            ctx.beginPath();
            ctx.moveTo(wipeX, 0);
            ctx.bezierCurveTo(wipeX + 60, H * 0.35, wipeX - 50, H * 0.65, wipeX, H);
            ctx.stroke();
            ctx.restore();
          } else if (transType === 'paint-wipe-diagonal') {
            ctx.save();
            const wipeProgress = transT * 1.5;
            ctx.beginPath();
            const x1 = W * wipeProgress;
            const x2 = W * (wipeProgress - 0.45);
            ctx.moveTo(0, 0);
            ctx.lineTo(x1, 0);
            ctx.lineTo(x2, H);
            ctx.lineTo(0, H);
            ctx.closePath();
            ctx.clip();

            drawKenBurns(nextImg, nextCam.scale, nextCam.panX, nextCam.panY, 1.0);

            ctx.strokeStyle = '#D6AD45';
            ctx.lineWidth = 6;
            ctx.shadowColor = '#073B2E';
            ctx.shadowBlur = 16;
            ctx.beginPath();
            ctx.moveTo(x1, 0);
            ctx.lineTo(x2, H);
            ctx.stroke();
            ctx.restore();
          } else {
            // Elegant crossfade
            drawKenBurns(nextImg, nextCam.scale, nextCam.panX, nextCam.panY, transT);
          }
        }

        drawVignette();

        // Convert canvas to JPEG blob and send to Node server
        const blob = await new Promise(r => canvas.toBlob(r, 'image/jpeg', 0.92));
        await fetch(`http://localhost:3091/frame?idx=${f}`, {
          method: 'POST',
          body: blob
        });
      }
    }, SCENES, TOTAL_FRAMES, FPS, FRAMES_PER_SCENE, TRANSITION_FRAMES);

    console.log('Browser render finished. Awaiting all frame disk flushes...');
    await allFramesSavedPromise;
    console.log(`All ${savedCount} frames verified flushed to disk!`);
  } finally {
    await browser.close();
    frameServer.close();
  }

  // Double check all 900 frame files exist on disk
  console.log('\n--- VERIFYING DISK FRAMES BEFORE ENCODING ---');
  let missing = 0;
  for (let i = 0; i < TOTAL_FRAMES; i++) {
    const fPath = path.join(FRAMES_DIR, `frame_${String(i).padStart(4, '0')}.jpg`);
    if (!fs.existsSync(fPath) || fs.statSync(fPath).size === 0) {
      console.error(`Missing or empty frame: ${fPath}`);
      missing++;
    }
  }
  if (missing > 0) {
    throw new Error(`Verification failed: ${missing} frames missing or empty.`);
  }
  console.log(`Disk check verified: 900/900 frames complete and valid.`);

  // 3. Compile MP4 with FFmpeg
  console.log('\n--- ENCODING MP4 (H.264 / AVC1) ---');
  const mp4Temp = path.join(FRAMES_DIR, 'wanders-hero-v4.mp4');
  await runCommand(ffmpegPath, [
    '-y',
    '-framerate', '30',
    '-i', path.join(FRAMES_DIR, 'frame_%04d.jpg'),
    '-c:v', 'libx264',
    '-preset', 'slow',
    '-crf', '19',
    '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart',
    mp4Temp
  ]);

  // 4. Compile WebM with FFmpeg
  console.log('\n--- ENCODING WEBM (VP9) ---');
  const webmTemp = path.join(FRAMES_DIR, 'wanders-hero-v4.webm');
  await runCommand(ffmpegPath, [
    '-y',
    '-framerate', '30',
    '-i', path.join(FRAMES_DIR, 'frame_%04d.jpg'),
    '-c:v', 'libvpx-vp9',
    '-b:v', '3200k',
    '-minrate', '1600k',
    '-maxrate', '4500k',
    '-crf', '22',
    '-pix_fmt', 'yuv420p',
    webmTemp
  ]);

  // 5. Generate Posters from Frame 30 (1.0s into Scene 01, clear shot of WANDERS Clear Nano)
  console.log('\n--- GENERATING POSTER IMAGES ---');
  const posterFrame = path.join(FRAMES_DIR, 'frame_0030.jpg');
  const posterJpgTemp = path.join(FRAMES_DIR, 'hero-poster-v4.jpg');
  const posterWebpTemp = path.join(FRAMES_DIR, 'hero-poster-v4.webp');

  await runCommand(ffmpegPath, ['-y', '-i', posterFrame, '-q:v', '2', posterJpgTemp]);
  await runCommand(ffmpegPath, ['-y', '-i', posterFrame, '-c:v', 'libwebp', '-quality', '90', posterWebpTemp]);

  // 6. Deploy files to src and website_download
  console.log('\n--- DEPLOYING ASSETS TO SRC AND PRODUCTION ---');
  const targets = [
    { src: mp4Temp, dsts: [path.join(SRC_VIDEO_DIR, 'wanders-hero.mp4'), path.join(PROD_VIDEO_DIR, 'wanders-hero.mp4')] },
    { src: webmTemp, dsts: [path.join(SRC_VIDEO_DIR, 'wanders-hero.webm'), path.join(PROD_VIDEO_DIR, 'wanders-hero.webm')] },
    { src: posterJpgTemp, dsts: [
      path.join(PROJECT_DIR, 'src/images/video-banner/hero-poster.jpg'),
      path.join(PROJECT_DIR, 'website_download/images/video-banner/hero-poster.jpg'),
      path.join(PROD_VIDEO_DIR, 'hero-poster.jpg')
    ]},
    { src: posterWebpTemp, dsts: [
      path.join(PROJECT_DIR, 'src/images/video-banner/hero-poster.webp'),
      path.join(PROJECT_DIR, 'website_download/images/video-banner/hero-poster.webp'),
      path.join(PROD_VIDEO_DIR, 'hero-poster.webp')
    ]}
  ];

  for (const t of targets) {
    const data = fs.readFileSync(t.src);
    for (const d of t.dsts) {
      fs.mkdirSync(path.dirname(d), { recursive: true });
      fs.writeFileSync(d, data);
      console.log(`Copied ${(data.length / (1024 * 1024)).toFixed(2)} MB to ${d}`);
    }
  }

  // 7. Update manifest.json
  const manifestV4 = {
    project: 'WANDERS Cinematic Hero Video Banner',
    version: '4.0.0',
    resolution: {
      width: 1920,
      height: 1080,
      aspectRatio: '16:9',
      fps: 30
    },
    totalDurationSeconds: 30.0,
    totalFrames: 900,
    transitionDurationSeconds: 0.8,
    scenes: SCENES.map((s, idx) => ({
      id: s.id,
      index: idx + 1,
      title: s.name,
      file: s.file,
      duration: 5.0,
      startSecond: idx * 5.0,
      endSecond: (idx + 1) * 5.0,
      frames: `${idx * 150} - ${(idx + 1) * 150 - 1}`,
      camera: s.camera,
      transition: s.transition
    }))
  };

  const manifestPath = path.join(PROJECT_DIR, 'website_download/images/video-banner/manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifestV4, null, 2));
  console.log(`Updated manifest.json at ${manifestPath}`);

  // Also save a copy in tools/
  const toolsScript = path.join(PROJECT_DIR, 'tools/render_cinematic_hero_v4.js');
  fs.copyFileSync(__filename, toolsScript);
  console.log(`Saved render script to ${toolsScript}`);

  console.log('\n=== WANDERS V4 RENDER COMPLETED SUCCESSFULLY ===');
}

main().catch(err => {
  console.error('Fatal render error:', err);
  process.exit(1);
});
